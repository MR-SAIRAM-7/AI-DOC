import os
import json
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from src.models.user import db
from src.models.report import Report
from src.utils.auth_middleware import token_required
from src.services.ocr_service import OCRService
from src.services.translation_service import TranslationService
from src.services.ai_service import AIService
from src.config import Config

reports_bp = Blueprint('reports', __name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS

@reports_bp.route('/upload', methods=['POST'])
@token_required
def upload_report():
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'File type not allowed'}), 400
        
        # Get additional parameters
        title = request.form.get('title', 'Medical Report')
        target_language = request.form.get('targetLanguage', request.current_user.preferred_language)
        
        # Secure filename and save file
        filename = secure_filename(file.filename)
        file_extension = filename.rsplit('.', 1)[1].lower()
        
        # Create unique filename
        import uuid
        unique_filename = f"{uuid.uuid4()}_{filename}"
        upload_path = os.path.join(Config.UPLOAD_FOLDER, unique_filename)
        
        # Ensure upload directory exists
        os.makedirs(os.path.dirname(upload_path), exist_ok=True)
        
        # Save file
        file.save(upload_path)
        
        # Create report record
        report = Report(
            user_id=request.current_user.id,
            title=title,
            file_type=file_extension,
            file_path=upload_path,
            status='processing'
        )
        
        db.session.add(report)
        db.session.commit()
        
        # Process file in background (for now, we'll do it synchronously)
        try:
            # Extract text from file
            ocr_service = OCRService()
            extracted_text = ocr_service.extract_text_from_file(upload_path, file_extension)
            
            if not extracted_text.strip():
                report.status = 'failed'
                db.session.commit()
                return jsonify({'error': 'Could not extract text from file'}), 400
            
            # Update report with extracted text
            report.original_content = extracted_text
            
            # Translate if needed
            translation_service = TranslationService()
            if target_language != 'en':
                translated_text = translation_service.translate_text(
                    extracted_text, target_language, 'auto'
                )
                report.translated_content = translated_text
                report.translated_language = target_language
            else:
                report.translated_content = extracted_text
                report.translated_language = 'en'
            
            # Generate AI explanation
            ai_service = AIService()
            content_for_analysis = report.translated_content or report.original_content
            
            explanation = ai_service.explain_medical_report(content_for_analysis, target_language)
            report.explanation = explanation
            
            # Generate health tips
            health_tips = ai_service.generate_health_tips(content_for_analysis, target_language)
            report.health_tips = health_tips
            
            # Extract key findings
            key_findings = ai_service.extract_key_findings(content_for_analysis)
            report.key_findings = json.dumps(key_findings)
            
            # Update status
            report.status = 'processed'
            db.session.commit()
            
            return jsonify({
                'message': 'Report uploaded and processed successfully',
                'report': report.to_dict()
            }), 201
            
        except Exception as processing_error:
            print(f"Processing error: {processing_error}")
            report.status = 'failed'
            db.session.commit()
            return jsonify({'error': 'Failed to process report'}), 500
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@reports_bp.route('/', methods=['GET'])
@token_required
def get_reports():
    try:
        reports = Report.query.filter_by(user_id=request.current_user.id)\
                             .order_by(Report.created_at.desc()).all()
        
        reports_data = []
        for report in reports:
            report_dict = report.to_dict()
            # Parse key findings if available
            if report.key_findings:
                try:
                    report_dict['key_findings'] = json.loads(report.key_findings)
                except:
                    report_dict['key_findings'] = []
            else:
                report_dict['key_findings'] = []
            
            reports_data.append(report_dict)
        
        return jsonify({'reports': reports_data}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@reports_bp.route('/<int:report_id>', methods=['GET'])
@token_required
def get_report(report_id):
    try:
        report = Report.query.filter_by(
            id=report_id, 
            user_id=request.current_user.id
        ).first()
        
        if not report:
            return jsonify({'error': 'Report not found'}), 404
        
        report_dict = report.to_dict()
        # Parse key findings if available
        if report.key_findings:
            try:
                report_dict['key_findings'] = json.loads(report.key_findings)
            except:
                report_dict['key_findings'] = []
        else:
            report_dict['key_findings'] = []
        
        return jsonify({'report': report_dict}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@reports_bp.route('/<int:report_id>', methods=['DELETE'])
@token_required
def delete_report(report_id):
    try:
        report = Report.query.filter_by(
            id=report_id, 
            user_id=request.current_user.id
        ).first()
        
        if not report:
            return jsonify({'error': 'Report not found'}), 404
        
        # Delete file if it exists
        if report.file_path and os.path.exists(report.file_path):
            try:
                os.remove(report.file_path)
            except:
                pass  # Continue even if file deletion fails
        
        # Delete report from database
        db.session.delete(report)
        db.session.commit()
        
        return jsonify({'message': 'Report deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@reports_bp.route('/<int:report_id>/reprocess', methods=['POST'])
@token_required
def reprocess_report(report_id):
    try:
        report = Report.query.filter_by(
            id=report_id, 
            user_id=request.current_user.id
        ).first()
        
        if not report:
            return jsonify({'error': 'Report not found'}), 404
        
        data = request.get_json()
        target_language = data.get('targetLanguage', request.current_user.preferred_language)
        
        # Update status
        report.status = 'processing'
        db.session.commit()
        
        try:
            # Re-translate if needed
            translation_service = TranslationService()
            if target_language != 'en' and report.original_content:
                translated_text = translation_service.translate_text(
                    report.original_content, target_language, 'auto'
                )
                report.translated_content = translated_text
                report.translated_language = target_language
            
            # Re-generate AI explanation
            ai_service = AIService()
            content_for_analysis = report.translated_content or report.original_content
            
            explanation = ai_service.explain_medical_report(content_for_analysis, target_language)
            report.explanation = explanation
            
            # Re-generate health tips
            health_tips = ai_service.generate_health_tips(content_for_analysis, target_language)
            report.health_tips = health_tips
            
            # Update status
            report.status = 'processed'
            db.session.commit()
            
            return jsonify({
                'message': 'Report reprocessed successfully',
                'report': report.to_dict()
            }), 200
            
        except Exception as processing_error:
            print(f"Reprocessing error: {processing_error}")
            report.status = 'failed'
            db.session.commit()
            return jsonify({'error': 'Failed to reprocess report'}), 500
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

