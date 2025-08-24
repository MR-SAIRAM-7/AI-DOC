import requests
import json
from src.config import Config

class TranslationService:
    def __init__(self):
        self.google_api_key = Config.GOOGLE_TRANSLATE_API_KEY
        self.azure_key = Config.AZURE_TRANSLATOR_KEY
        self.azure_region = Config.AZURE_TRANSLATOR_REGION
        self.deepl_key = Config.DEEPL_API_KEY
    
    def translate_text(self, text, target_language, source_language='auto'):
        """
        Translate text using available translation services
        Priority: Google Translate -> Azure Translator -> DeepL
        """
        if not text or not text.strip():
            return text
        
        # Try Google Translate first
        if self.google_api_key:
            try:
                return self._translate_with_google(text, target_language, source_language)
            except Exception as e:
                print(f"Google Translate failed: {e}")
        
        # Try Azure Translator
        if self.azure_key and self.azure_region:
            try:
                return self._translate_with_azure(text, target_language, source_language)
            except Exception as e:
                print(f"Azure Translator failed: {e}")
        
        # Try DeepL
        if self.deepl_key:
            try:
                return self._translate_with_deepl(text, target_language, source_language)
            except Exception as e:
                print(f"DeepL failed: {e}")
        
        # If all services fail, return original text
        print("All translation services failed, returning original text")
        return text
    
    def _translate_with_google(self, text, target_language, source_language='auto'):
        """
        Translate using Google Cloud Translation API
        """
        url = f"https://translation.googleapis.com/language/translate/v2"
        
        # Map language codes for Google Translate
        google_lang_map = {
            'hi': 'hi',  # Hindi
            'ta': 'ta',  # Tamil
            'te': 'te',  # Telugu
            'bn': 'bn',  # Bengali
            'mr': 'mr',  # Marathi
            'gu': 'gu',  # Gujarati
            'kn': 'kn',  # Kannada
            'ml': 'ml',  # Malayalam
            'pa': 'pa',  # Punjabi
            'ur': 'ur',  # Urdu
            'or': 'or',  # Odia
            'as': 'as',  # Assamese
            'en': 'en',  # English
            'es': 'es',  # Spanish
            'fr': 'fr',  # French
            'de': 'de',  # German
            'it': 'it',  # Italian
            'pt': 'pt',  # Portuguese
            'ru': 'ru',  # Russian
            'ja': 'ja',  # Japanese
            'ko': 'ko',  # Korean
            'zh': 'zh',  # Chinese
            'ar': 'ar'   # Arabic
        }
        
        target_lang = google_lang_map.get(target_language, target_language)
        
        params = {
            'key': self.google_api_key,
            'q': text,
            'target': target_lang,
            'format': 'text'
        }
        
        if source_language != 'auto':
            source_lang = google_lang_map.get(source_language, source_language)
            params['source'] = source_lang
        
        response = requests.post(url, data=params)
        response.raise_for_status()
        
        result = response.json()
        return result['data']['translations'][0]['translatedText']
    
    def _translate_with_azure(self, text, target_language, source_language='auto'):
        """
        Translate using Azure Translator
        """
        url = "https://api.cognitive.microsofttranslator.com/translate"
        
        # Map language codes for Azure Translator
        azure_lang_map = {
            'hi': 'hi',  # Hindi
            'ta': 'ta',  # Tamil
            'te': 'te',  # Telugu
            'bn': 'bn',  # Bengali
            'mr': 'mr',  # Marathi
            'gu': 'gu',  # Gujarati
            'kn': 'kn',  # Kannada
            'ml': 'ml',  # Malayalam
            'pa': 'pa',  # Punjabi
            'ur': 'ur',  # Urdu
            'or': 'or',  # Odia
            'as': 'as',  # Assamese
            'en': 'en',  # English
            'es': 'es',  # Spanish
            'fr': 'fr',  # French
            'de': 'de',  # German
            'it': 'it',  # Italian
            'pt': 'pt',  # Portuguese
            'ru': 'ru',  # Russian
            'ja': 'ja',  # Japanese
            'ko': 'ko',  # Korean
            'zh': 'zh-Hans',  # Chinese Simplified
            'ar': 'ar'   # Arabic
        }
        
        target_lang = azure_lang_map.get(target_language, target_language)
        
        params = {
            'api-version': '3.0',
            'to': target_lang
        }
        
        if source_language != 'auto':
            source_lang = azure_lang_map.get(source_language, source_language)
            params['from'] = source_lang
        
        headers = {
            'Ocp-Apim-Subscription-Key': self.azure_key,
            'Ocp-Apim-Subscription-Region': self.azure_region,
            'Content-Type': 'application/json'
        }
        
        body = [{'text': text}]
        
        response = requests.post(url, params=params, headers=headers, json=body)
        response.raise_for_status()
        
        result = response.json()
        return result[0]['translations'][0]['text']
    
    def _translate_with_deepl(self, text, target_language, source_language='auto'):
        """
        Translate using DeepL API
        """
        url = "https://api-free.deepl.com/v2/translate"
        
        # Map language codes for DeepL
        deepl_lang_map = {
            'en': 'EN',
            'es': 'ES',
            'fr': 'FR',
            'de': 'DE',
            'it': 'IT',
            'pt': 'PT',
            'ru': 'RU',
            'ja': 'JA',
            'ko': 'KO',
            'zh': 'ZH',
            'ar': 'AR',
            'hi': 'HI'  # DeepL supports limited Indian languages
        }
        
        target_lang = deepl_lang_map.get(target_language)
        if not target_lang:
            raise Exception(f"DeepL doesn't support language: {target_language}")
        
        data = {
            'auth_key': self.deepl_key,
            'text': text,
            'target_lang': target_lang
        }
        
        if source_language != 'auto' and source_language in deepl_lang_map:
            data['source_lang'] = deepl_lang_map[source_language]
        
        response = requests.post(url, data=data)
        response.raise_for_status()
        
        result = response.json()
        return result['translations'][0]['text']
    
    def detect_language(self, text):
        """
        Detect the language of the given text
        """
        if self.google_api_key:
            try:
                return self._detect_language_google(text)
            except Exception as e:
                print(f"Google language detection failed: {e}")
        
        if self.azure_key and self.azure_region:
            try:
                return self._detect_language_azure(text)
            except Exception as e:
                print(f"Azure language detection failed: {e}")
        
        return 'en'  # Default to English
    
    def _detect_language_google(self, text):
        """
        Detect language using Google Cloud Translation API
        """
        url = f"https://translation.googleapis.com/language/translate/v2/detect"
        
        params = {
            'key': self.google_api_key,
            'q': text
        }
        
        response = requests.post(url, data=params)
        response.raise_for_status()
        
        result = response.json()
        return result['data']['detections'][0][0]['language']
    
    def _detect_language_azure(self, text):
        """
        Detect language using Azure Translator
        """
        url = "https://api.cognitive.microsofttranslator.com/detect"
        
        params = {
            'api-version': '3.0'
        }
        
        headers = {
            'Ocp-Apim-Subscription-Key': self.azure_key,
            'Ocp-Apim-Subscription-Region': self.azure_region,
            'Content-Type': 'application/json'
        }
        
        body = [{'text': text}]
        
        response = requests.post(url, params=params, headers=headers, json=body)
        response.raise_for_status()
        
        result = response.json()
        return result[0]['language']

