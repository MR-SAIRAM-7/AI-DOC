from flask import Blueprint, request, jsonify
from src.utils.auth_middleware import token_required
from src.services.ai_service import AIService
from src.services.translation_service import TranslationService

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/translate', methods=['POST'])
@token_required
def translate_text():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('text'):
            return jsonify({'error': 'Text is required'}), 400
        
        text = data.get('text')
        target_language = data.get('targetLanguage', 'en')
        source_language = data.get('sourceLanguage', 'auto')
        
        # Initialize translation service
        translation_service = TranslationService()
        
        # Translate text
        translated_text = translation_service.translate_text(
            text, target_language, source_language
        )
        
        # Detect source language if auto
        detected_language = None
        if source_language == 'auto':
            detected_language = translation_service.detect_language(text)
        
        return jsonify({
            'originalText': text,
            'translatedText': translated_text,
            'sourceLanguage': detected_language or source_language,
            'targetLanguage': target_language
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/explain', methods=['POST'])
@token_required
def explain_medical_content():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('content'):
            return jsonify({'error': 'Content is required'}), 400
        
        content = data.get('content')
        language = data.get('language', request.current_user.preferred_language)
        
        # Initialize AI service
        ai_service = AIService()
        
        # Generate explanation
        explanation = ai_service.explain_medical_report(content, language)
        
        return jsonify({
            'content': content,
            'explanation': explanation,
            'language': language
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/health-tips', methods=['POST'])
@token_required
def generate_health_tips():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('content'):
            return jsonify({'error': 'Content is required'}), 400
        
        content = data.get('content')
        language = data.get('language', request.current_user.preferred_language)
        
        # Initialize AI service
        ai_service = AIService()
        
        # Generate health tips
        health_tips = ai_service.generate_health_tips(content, language)
        
        return jsonify({
            'content': content,
            'healthTips': health_tips,
            'language': language
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/key-findings', methods=['POST'])
@token_required
def extract_key_findings():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('content'):
            return jsonify({'error': 'Content is required'}), 400
        
        content = data.get('content')
        
        # Initialize AI service
        ai_service = AIService()
        
        # Extract key findings
        key_findings = ai_service.extract_key_findings(content)
        
        return jsonify({
            'content': content,
            'keyFindings': key_findings
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/analyze', methods=['POST'])
@token_required
def analyze_medical_report():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('content'):
            return jsonify({'error': 'Content is required'}), 400
        
        content = data.get('content')
        language = data.get('language', request.current_user.preferred_language)
        
        # Initialize services
        ai_service = AIService()
        translation_service = TranslationService()
        
        # Translate content if needed
        translated_content = content
        if language != 'en':
            translated_content = translation_service.translate_text(
                content, language, 'auto'
            )
        
        # Generate all AI analyses
        explanation = ai_service.explain_medical_report(translated_content, language)
        health_tips = ai_service.generate_health_tips(translated_content, language)
        key_findings = ai_service.extract_key_findings(translated_content)
        
        return jsonify({
            'originalContent': content,
            'translatedContent': translated_content if language != 'en' else None,
            'explanation': explanation,
            'healthTips': health_tips,
            'keyFindings': key_findings,
            'language': language
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/supported-languages', methods=['GET'])
def get_supported_languages():
    try:
        from src.config import Config
        
        return jsonify({
            'supportedLanguages': Config.SUPPORTED_LANGUAGES
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

