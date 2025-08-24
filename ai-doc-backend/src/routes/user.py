from flask import Blueprint, request, jsonify
from src.models.user import db, User
from src.utils.auth_middleware import token_required

user_bp = Blueprint('user', __name__)

@user_bp.route('/me', methods=['GET'])
@token_required
def get_profile():
    try:
        user = request.current_user
        return jsonify({
            'user': {
                'id': user.id,
                'email': user.email,
                'firstName': user.first_name,
                'lastName': user.last_name,
                'preferredLanguage': user.preferred_language,
                'createdAt': user.created_at.isoformat() if user.created_at else None
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@user_bp.route('/me', methods=['PUT'])
@token_required
def update_profile():
    try:
        data = request.get_json()
        user = request.current_user
        
        # Update allowed fields
        if 'firstName' in data:
            user.first_name = data['firstName']
        if 'lastName' in data:
            user.last_name = data['lastName']
        if 'preferredLanguage' in data:
            user.preferred_language = data['preferredLanguage']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'user': {
                'id': user.id,
                'email': user.email,
                'firstName': user.first_name,
                'lastName': user.last_name,
                'preferredLanguage': user.preferred_language,
                'createdAt': user.created_at.isoformat() if user.created_at else None
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@user_bp.route('/stats', methods=['GET'])
@token_required
def get_user_stats():
    try:
        from src.models.report import Report, ChatMessage
        
        user = request.current_user
        
        # Get user statistics
        total_reports = Report.query.filter_by(user_id=user.id).count()
        processed_reports = Report.query.filter_by(user_id=user.id, status='processed').count()
        total_messages = ChatMessage.query.filter_by(user_id=user.id).count()
        
        # Get recent activity (last 7 days)
        from datetime import datetime, timedelta
        week_ago = datetime.utcnow() - timedelta(days=7)
        recent_reports = Report.query.filter(
            Report.user_id == user.id,
            Report.created_at >= week_ago
        ).count()
        
        return jsonify({
            'stats': {
                'totalReports': total_reports,
                'processedReports': processed_reports,
                'totalMessages': total_messages,
                'recentReports': recent_reports
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

