from flask import Blueprint, request, jsonify
from src.models.user import db
from src.models.report import Report, ChatMessage
from src.utils.auth_middleware import token_required
from src.services.ai_service import AIService

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/message', methods=['POST'])
@token_required
def send_message():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('message'):
            return jsonify({'error': 'Message is required'}), 400
        
        report_id = data.get('reportId')
        message = data.get('message')
        language = data.get('language', request.current_user.preferred_language)
        
        # Get report if specified
        report = None
        if report_id:
            report = Report.query.filter_by(
                id=report_id, 
                user_id=request.current_user.id
            ).first()
            
            if not report:
                return jsonify({'error': 'Report not found'}), 404
        
        # Save user message
        user_message = ChatMessage(
            report_id=report_id,
            user_id=request.current_user.id,
            sender='user',
            message=message
        )
        db.session.add(user_message)
        
        # Get chat history for context
        chat_history = []
        if report_id:
            recent_messages = ChatMessage.query.filter_by(
                report_id=report_id,
                user_id=request.current_user.id
            ).order_by(ChatMessage.timestamp.desc()).limit(10).all()
            
            chat_history = [
                {
                    'sender': msg.sender,
                    'message': msg.message,
                    'timestamp': msg.timestamp.isoformat()
                }
                for msg in reversed(recent_messages)
            ]
        
        # Generate AI response
        ai_service = AIService()
        
        if report:
            # Chat about specific report
            report_content = report.translated_content or report.original_content
            ai_response = ai_service.chat_with_ai_doctor(
                message, 
                report_content, 
                chat_history, 
                language
            )
        else:
            # General health chat
            ai_response = ai_service.chat_with_ai_doctor(
                message, 
                "No specific medical report provided. Provide general health guidance.", 
                chat_history, 
                language
            )
        
        # Save AI response
        ai_message = ChatMessage(
            report_id=report_id,
            user_id=request.current_user.id,
            sender='ai',
            message=ai_response
        )
        db.session.add(ai_message)
        db.session.commit()
        
        return jsonify({
            'message': 'Message sent successfully',
            'userMessage': user_message.to_dict(),
            'aiResponse': ai_message.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/history/<int:report_id>', methods=['GET'])
@token_required
def get_chat_history(report_id):
    try:
        # Verify report belongs to user
        report = Report.query.filter_by(
            id=report_id, 
            user_id=request.current_user.id
        ).first()
        
        if not report:
            return jsonify({'error': 'Report not found'}), 404
        
        # Get chat messages
        messages = ChatMessage.query.filter_by(
            report_id=report_id,
            user_id=request.current_user.id
        ).order_by(ChatMessage.timestamp.asc()).all()
        
        messages_data = [message.to_dict() for message in messages]
        
        return jsonify({
            'messages': messages_data,
            'report': report.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/history', methods=['GET'])
@token_required
def get_all_chat_history():
    try:
        # Get all chat messages for user
        messages = ChatMessage.query.filter_by(
            user_id=request.current_user.id
        ).order_by(ChatMessage.timestamp.desc()).all()
        
        # Group by report
        chat_by_report = {}
        for message in messages:
            report_id = message.report_id or 'general'
            if report_id not in chat_by_report:
                chat_by_report[report_id] = []
            chat_by_report[report_id].append(message.to_dict())
        
        return jsonify({'chatHistory': chat_by_report}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/clear/<int:report_id>', methods=['DELETE'])
@token_required
def clear_chat_history(report_id):
    try:
        # Verify report belongs to user
        report = Report.query.filter_by(
            id=report_id, 
            user_id=request.current_user.id
        ).first()
        
        if not report:
            return jsonify({'error': 'Report not found'}), 404
        
        # Delete all chat messages for this report
        ChatMessage.query.filter_by(
            report_id=report_id,
            user_id=request.current_user.id
        ).delete()
        
        db.session.commit()
        
        return jsonify({'message': 'Chat history cleared successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@chat_bp.route('/message/<int:message_id>', methods=['DELETE'])
@token_required
def delete_message(message_id):
    try:
        # Find message
        message = ChatMessage.query.filter_by(
            id=message_id,
            user_id=request.current_user.id
        ).first()
        
        if not message:
            return jsonify({'error': 'Message not found'}), 404
        
        # Delete message
        db.session.delete(message)
        db.session.commit()
        
        return jsonify({'message': 'Message deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

