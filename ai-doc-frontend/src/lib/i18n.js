import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Supported languages with their native names
export const supportedLanguages = {
  // English
  en: { name: 'English', nativeName: 'English' },
  
  // Indian Languages
  hi: { name: 'Hindi', nativeName: 'हिन्दी' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்' },
  te: { name: 'Telugu', nativeName: 'తెలుగు' },
  bn: { name: 'Bengali', nativeName: 'বাংলা' },
  mr: { name: 'Marathi', nativeName: 'मराठी' },
  gu: { name: 'Gujarati', nativeName: 'ગુજરાતી' },
  kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  ml: { name: 'Malayalam', nativeName: 'മലയാളം' },
  pa: { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  ur: { name: 'Urdu', nativeName: 'اردو' },
  or: { name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  as: { name: 'Assamese', nativeName: 'অসমীয়া' },
  
  // Foreign Languages
  es: { name: 'Spanish', nativeName: 'Español' },
  fr: { name: 'French', nativeName: 'Français' },
  de: { name: 'German', nativeName: 'Deutsch' },
  it: { name: 'Italian', nativeName: 'Italiano' },
  pt: { name: 'Portuguese', nativeName: 'Português' },
  ru: { name: 'Russian', nativeName: 'Русский' },
  ja: { name: 'Japanese', nativeName: '日本語' },
  ko: { name: 'Korean', nativeName: '한국어' },
  zh: { name: 'Chinese', nativeName: '中文' },
  ar: { name: 'Arabic', nativeName: 'العربية' },
};

const resources = {
  en: {
    translation: {
      // Navigation
      "dashboard": "Dashboard",
      "reports": "Reports",
      "chat": "Chat",
      "settings": "Settings",
      "logout": "Logout",
      
      // Landing Page
      "hero.title": "Your Personal AI Doctor",
      "hero.subtitle": "Understanding Your Health in Your Language",
      "hero.description": "Upload medical reports, get instant translations and explanations in simple terms, and chat with our AI doctor for personalized health guidance.",
      "hero.cta": "Get Started Free",
      
      // Features
      "features.upload.title": "Upload Reports",
      "features.upload.description": "Upload PDFs, images, or text from lab results, doctor's notes, or medical scans",
      "features.translate.title": "Instant Translation",
      "features.translate.description": "Automatically translate medical reports into your preferred language",
      "features.explain.title": "Simple Explanations",
      "features.explain.description": "Get complex medical jargon explained in easy-to-understand terms",
      "features.chat.title": "AI Doctor Chat",
      "features.chat.description": "Ask follow-up questions and get personalized health advice",
      
      // Authentication
      "auth.login": "Login",
      "auth.register": "Register",
      "auth.email": "Email",
      "auth.password": "Password",
      "auth.confirmPassword": "Confirm Password",
      "auth.firstName": "First Name",
      "auth.lastName": "Last Name",
      "auth.preferredLanguage": "Preferred Language",
      "auth.loginButton": "Sign In",
      "auth.registerButton": "Create Account",
      "auth.switchToRegister": "Don't have an account? Register",
      "auth.switchToLogin": "Already have an account? Login",
      
      // Dashboard
      "dashboard.welcome": "Welcome back",
      "dashboard.uploadNew": "Upload New Report",
      "dashboard.recentReports": "Recent Reports",
      "dashboard.noReports": "No reports uploaded yet",
      "dashboard.uploadFirst": "Upload your first medical report to get started",
      
      // Upload
      "upload.title": "Upload Medical Report",
      "upload.dragDrop": "Drag and drop your medical report here, or click to browse",
      "upload.supportedFormats": "Supported formats: PDF, JPG, PNG, TXT",
      "upload.selectLanguage": "Select target language",
      "upload.processing": "Processing your report...",
      "upload.success": "Report uploaded successfully!",
      
      // Report Detail
      "report.original": "Original Content",
      "report.translated": "Translated Content",
      "report.explanation": "Medical Explanation",
      "report.tips": "Health Tips",
      "report.chat": "Chat with AI Doctor",
      
      // Chat
      "chat.placeholder": "Ask me anything about your medical report...",
      "chat.send": "Send",
      "chat.typing": "AI Doctor is typing...",
      
      // Common
      "loading": "Loading...",
      "error": "Error",
      "success": "Success",
      "cancel": "Cancel",
      "save": "Save",
      "delete": "Delete",
      "download": "Download",
      "share": "Share",
      
      // Disclaimers
      "disclaimer.title": "Important Medical Disclaimer",
      "disclaimer.text": "This AI tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical concerns."
    }
  },
  hi: {
    translation: {
      "dashboard": "डैशबोर्ड",
      "reports": "रिपोर्ट्स",
      "chat": "चैट",
      "settings": "सेटिंग्स",
      "logout": "लॉगआउट",
      "hero.title": "आपका व्यक्तिगत AI डॉक्टर",
      "hero.subtitle": "आपकी भाषा में आपके स्वास्थ्य को समझना",
      "hero.description": "मेडिकल रिपोर्ट अपलोड करें, तुरंत अनुवाद और सरल शब्दों में स्पष्टीकरण प्राप्त करें, और व्यक्तिगत स्वास्थ्य मार्गदर्शन के लिए हमारे AI डॉक्टर से चैट करें।",
      "hero.cta": "मुफ्त में शुरू करें"
    }
  },
  es: {
    translation: {
      "dashboard": "Panel",
      "reports": "Informes",
      "chat": "Chat",
      "settings": "Configuración",
      "logout": "Cerrar Sesión",
      "hero.title": "Tu Doctor Personal con IA",
      "hero.subtitle": "Entendiendo Tu Salud en Tu Idioma",
      "hero.description": "Sube informes médicos, obtén traducciones instantáneas y explicaciones en términos simples, y chatea con nuestro doctor IA para orientación personalizada de salud.",
      "hero.cta": "Comenzar Gratis"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;

