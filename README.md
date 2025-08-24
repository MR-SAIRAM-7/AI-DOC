# AI-DOC - Your Personal AI Doctor

A comprehensive AI-powered medical report analysis application that translates medical reports into multiple languages and provides simple explanations through an AI doctor interface.

## 🌟 Features

- **Multi-language Support**: 20+ languages including all major Indian regional languages
- **OCR Text Extraction**: Extract text from PDFs, images, and documents
- **AI-Powered Analysis**: Get medical reports explained in simple terms
- **Real-time Translation**: Instant translation to your preferred language
- **Interactive AI Doctor**: Chat with AI for personalized health guidance
- **Secure & Private**: Enterprise-grade encryption and privacy protection
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Technology Stack

### Frontend
- **React.js** - Modern UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React i18next** - Internationalization
- **Lucide React** - Beautiful icons

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - Database ORM
- **JWT** - Authentication
- **OpenAI API** - AI-powered analysis
- **Tesseract OCR** - Text extraction
- **Multiple Translation APIs** - Google Translate, Azure Translator, DeepL
- **Flask-CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Python 3.11+
- Node.js 18+
- npm or pnpm
- Tesseract OCR
- Poppler (for PDF processing)

## 🛠️ Installation

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd ai-doc-backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install system dependencies**
   ```bash
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install tesseract-ocr poppler-utils
   
   # macOS
   brew install tesseract poppler
   
   # Windows
   # Download and install Tesseract from: https://github.com/UB-Mannheim/tesseract/wiki
   # Download and install Poppler from: https://blog.alivate.com.au/poppler-windows/
   ```

5. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your API keys (see API Keys section below)
   ```

6. **Run the backend**
   ```bash
   python src/main.py
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ai-doc-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   pnpm build
   ```

## 🔑 API Keys Required

You need to obtain the following API keys and add them to your `.env` file:

### Required APIs

1. **OpenAI API Key** (Required)
   - Sign up at: https://platform.openai.com/
   - Get API key from: https://platform.openai.com/api-keys
   - Add to `.env`: `OPENAI_API_KEY=your_openai_api_key_here`

### Translation APIs (Choose at least one)

2. **Google Cloud Translation API** (Recommended)
   - Sign up at: https://cloud.google.com/
   - Enable Translation API
   - Create service account and download JSON key
   - Add to `.env`: 
     ```
     GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key_here
     GOOGLE_CLOUD_PROJECT_ID=your_project_id_here
     ```

3. **Azure Translator** (Alternative)
   - Sign up at: https://azure.microsoft.com/
   - Create Translator resource
   - Add to `.env`:
     ```
     AZURE_TRANSLATOR_KEY=your_azure_translator_key_here
     AZURE_TRANSLATOR_REGION=your_azure_region_here
     ```

4. **DeepL API** (Alternative)
   - Sign up at: https://www.deepl.com/pro-api
   - Add to `.env`: `DEEPL_API_KEY=your_deepl_api_key_here`

### Complete .env File Example

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Translation API Configuration (choose one or more)
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key_here
GOOGLE_CLOUD_PROJECT_ID=your_project_id_here

# Alternative Translation APIs
# AZURE_TRANSLATOR_KEY=your_azure_translator_key_here
# AZURE_TRANSLATOR_REGION=your_azure_region_here
# DEEPL_API_KEY=your_deepl_api_key_here

# Database Configuration
DATABASE_URL=sqlite:///database/app.db

# JWT Configuration
JWT_SECRET_KEY=your_super_secret_jwt_key_here_change_this_in_production

# Flask Configuration
FLASK_ENV=development
SECRET_KEY=your_flask_secret_key_here_change_this_in_production

# File Upload Configuration
MAX_FILE_SIZE=10485760  # 10MB in bytes
UPLOAD_FOLDER=uploads

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# OCR Configuration
TESSERACT_CMD=/usr/bin/tesseract  # Path to tesseract executable
```

## 🌍 Supported Languages

The application supports 20+ languages including:

### Indian Regional Languages
- Hindi (हिन्दी)
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Bengali (বাংলা)
- Marathi (मराठी)
- Gujarati (ગુજરાતી)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)
- Punjabi (ਪੰਜਾਬੀ)
- Urdu (اردو)
- Odia (ଓଡ଼ିଆ)
- Assamese (অসমীয়া)

### International Languages
- English
- Spanish (Español)
- French (Français)
- German (Deutsch)
- Italian (Italiano)
- Portuguese (Português)
- Russian (Русский)
- Japanese (日本語)
- Korean (한국어)
- Chinese (中文)
- Arabic (العربية)

## 📱 Usage

1. **Register/Login**: Create an account or login to existing account
2. **Upload Report**: Upload your medical report (PDF, image, or text)
3. **Select Language**: Choose your preferred language for translation
4. **Get Analysis**: Receive AI-powered explanation in simple terms
5. **Chat with AI Doctor**: Ask follow-up questions about your report
6. **View Health Tips**: Get personalized health recommendations

## 🔒 Security & Privacy

- All data is encrypted in transit and at rest
- JWT-based authentication
- No medical data is shared with third parties
- HIPAA and GDPR compliant design
- Secure file upload with validation
- Rate limiting and input sanitization

## 🏗️ Architecture

```
ai-doc-application/
├── ai-doc-frontend/          # React.js frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and API client
│   │   └── ...
│   └── ...
├── ai-doc-backend/          # Flask backend
│   ├── src/
│   │   ├── models/          # Database models
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helper functions
│   │   └── main.py          # Application entry point
│   └── ...
└── README.md
```

## 🚀 Deployment

### Production Deployment

1. **Build Frontend**
   ```bash
   cd ai-doc-frontend
   npm run build
   cp -r dist/* ../ai-doc-backend/src/static/
   ```

2. **Configure Production Environment**
   ```bash
   # Update .env with production values
   FLASK_ENV=production
   # Use production database URL
   # Use strong secret keys
   ```

3. **Deploy Backend**
   ```bash
   cd ai-doc-backend
   # Use production WSGI server like Gunicorn
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 src.main:app
   ```

### Docker Deployment (Optional)

Create `Dockerfile` for containerized deployment:

```dockerfile
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy and install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Run application
CMD ["python", "src/main.py"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Medical Disclaimer

This application is for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/ai-doc/issues) page
2. Create a new issue with detailed description
3. Contact support at: support@ai-doc.com

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- Google Cloud for Translation services
- Tesseract OCR for text extraction
- React and Flask communities for excellent frameworks
- All contributors and users of this application

---

**Made with ❤️ for better healthcare accessibility**

#   A I - D O C  
 