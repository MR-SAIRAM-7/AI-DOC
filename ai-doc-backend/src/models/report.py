from datetime import datetime
from src.models.user import db

class Report(db.Model):
    __tablename__ = 'reports'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    file_type = db.Column(db.String(10), nullable=False)  # pdf, image, text
    file_path = db.Column(db.String(500), nullable=True)
    original_content = db.Column(db.Text, nullable=True)
    translated_content = db.Column(db.Text, nullable=True)
    translated_language = db.Column(db.String(10), nullable=True)
    explanation = db.Column(db.Text, nullable=True)
    health_tips = db.Column(db.Text, nullable=True)
    key_findings = db.Column(db.Text, nullable=True)  # JSON string of findings
    status = db.Column(db.String(20), default='processing')  # processing, processed, failed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship with user
    user = db.relationship('User', backref=db.backref('reports', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'file_type': self.file_type,
            'file_path': self.file_path,
            'original_content': self.original_content,
            'translated_content': self.translated_content,
            'translated_language': self.translated_language,
            'explanation': self.explanation,
            'health_tips': self.health_tips,
            'key_findings': self.key_findings,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class ChatMessage(db.Model):
    __tablename__ = 'chat_messages'
    
    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.Integer, db.ForeignKey('reports.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    sender = db.Column(db.String(10), nullable=False)  # 'user' or 'ai'
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    report = db.relationship('Report', backref=db.backref('chat_messages', lazy=True))
    user = db.relationship('User', backref=db.backref('chat_messages', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'report_id': self.report_id,
            'user_id': self.user_id,
            'sender': self.sender,
            'message': self.message,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }

