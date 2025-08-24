import openai
from src.config import Config

class AIService:
    def __init__(self):
        openai.api_key = Config.OPENAI_API_KEY
        self.client = openai.OpenAI(api_key=Config.OPENAI_API_KEY)
    
    def explain_medical_report(self, content, language='en'):
        """
        Explain medical report content in simple terms
        """
        language_names = {
            'en': 'English',
            'hi': 'Hindi',
            'ta': 'Tamil',
            'te': 'Telugu',
            'bn': 'Bengali',
            'mr': 'Marathi',
            'gu': 'Gujarati',
            'kn': 'Kannada',
            'ml': 'Malayalam',
            'pa': 'Punjabi',
            'ur': 'Urdu',
            'or': 'Odia',
            'as': 'Assamese',
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'ja': 'Japanese',
            'ko': 'Korean',
            'zh': 'Chinese',
            'ar': 'Arabic'
        }
        
        lang_name = language_names.get(language, 'English')
        
        prompt = f"""
        You are an experienced medical doctor and health educator. Please analyze the following medical report and provide a clear, simple explanation in {lang_name}.

        Medical Report Content:
        {content}

        Please provide:
        1. A summary of what this report shows
        2. Explanation of any medical terms in simple language
        3. What the findings mean for the patient's health
        4. Any areas of concern or normal findings
        5. General recommendations (while emphasizing the need to consult with healthcare providers)

        Important: 
        - Use simple, non-technical language that a patient can understand
        - Be empathetic and reassuring while being accurate
        - Always emphasize that this is for informational purposes only
        - Recommend consulting with healthcare providers for medical decisions
        - Respond in {lang_name} language
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a compassionate medical doctor who explains medical reports in simple, understandable terms."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1500,
                temperature=0.3
            )
            
            return response.choices[0].message.content
        except Exception as e:
            print(f"Error in explain_medical_report: {e}")
            return f"I apologize, but I'm unable to analyze this report at the moment. Please try again later or consult with your healthcare provider."
    
    def generate_health_tips(self, content, language='en'):
        """
        Generate personalized health tips based on the medical report
        """
        language_names = {
            'en': 'English',
            'hi': 'Hindi',
            'ta': 'Tamil',
            'te': 'Telugu',
            'bn': 'Bengali',
            'mr': 'Marathi',
            'gu': 'Gujarati',
            'kn': 'Kannada',
            'ml': 'Malayalam',
            'pa': 'Punjabi',
            'ur': 'Urdu',
            'or': 'Odia',
            'as': 'Assamese',
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'ja': 'Japanese',
            'ko': 'Korean',
            'zh': 'Chinese',
            'ar': 'Arabic'
        }
        
        lang_name = language_names.get(language, 'English')
        
        prompt = f"""
        Based on the following medical report, provide personalized health tips and lifestyle recommendations in {lang_name}.

        Medical Report Content:
        {content}

        Please provide:
        1. Dietary recommendations based on the findings
        2. Exercise and lifestyle suggestions
        3. Preventive measures
        4. When to seek medical attention
        5. General wellness tips

        Important:
        - Keep recommendations practical and achievable
        - Be encouraging and positive
        - Emphasize the importance of following up with healthcare providers
        - Respond in {lang_name} language
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a health and wellness expert providing practical, evidence-based health tips."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1000,
                temperature=0.4
            )
            
            return response.choices[0].message.content
        except Exception as e:
            print(f"Error in generate_health_tips: {e}")
            return f"I'm unable to generate health tips at the moment. Please consult with your healthcare provider for personalized advice."
    
    def chat_with_ai_doctor(self, message, report_content, chat_history=None, language='en'):
        """
        Chat with AI doctor about the medical report
        """
        language_names = {
            'en': 'English',
            'hi': 'Hindi',
            'ta': 'Tamil',
            'te': 'Telugu',
            'bn': 'Bengali',
            'mr': 'Marathi',
            'gu': 'Gujarati',
            'kn': 'Kannada',
            'ml': 'Malayalam',
            'pa': 'Punjabi',
            'ur': 'Urdu',
            'or': 'Odia',
            'as': 'Assamese',
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'ja': 'Japanese',
            'ko': 'Korean',
            'zh': 'Chinese',
            'ar': 'Arabic'
        }
        
        lang_name = language_names.get(language, 'English')
        
        system_prompt = f"""
        You are a compassionate AI doctor assistant. You have access to the patient's medical report and can answer questions about it.
        
        Medical Report Content:
        {report_content}
        
        Guidelines:
        - Be empathetic and understanding
        - Provide clear, simple explanations
        - Always emphasize that this is for informational purposes only
        - Recommend consulting with healthcare providers for medical decisions
        - Respond in {lang_name} language
        - If asked about something not in the report, acknowledge the limitation
        """
        
        messages = [
            {"role": "system", "content": system_prompt}
        ]
        
        # Add chat history if available
        if chat_history:
            for chat in chat_history[-10:]:  # Last 10 messages for context
                role = "user" if chat['sender'] == 'user' else "assistant"
                messages.append({"role": role, "content": chat['message']})
        
        # Add current message
        messages.append({"role": "user", "content": message})
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=messages,
                max_tokens=800,
                temperature=0.3
            )
            
            return response.choices[0].message.content
        except Exception as e:
            print(f"Error in chat_with_ai_doctor: {e}")
            return f"I apologize, but I'm experiencing technical difficulties. Please try again later or consult with your healthcare provider."
    
    def extract_key_findings(self, content):
        """
        Extract key medical findings from the report
        """
        prompt = f"""
        Analyze the following medical report and extract the key findings. Return them as a simple list of important points.

        Medical Report Content:
        {content}

        Please extract:
        - Key test results
        - Abnormal findings
        - Normal findings
        - Diagnoses mentioned
        - Recommendations

        Return as a simple list, one finding per line.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a medical data extraction specialist."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.2
            )
            
            findings = response.choices[0].message.content.strip().split('\n')
            return [finding.strip('- ').strip() for finding in findings if finding.strip()]
        except Exception as e:
            print(f"Error in extract_key_findings: {e}")
            return []

