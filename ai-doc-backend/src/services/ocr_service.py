import os
import pytesseract
from PIL import Image
from pdf2image import convert_from_path
import tempfile
from src.config import Config

class OCRService:
    def __init__(self):
        # Set tesseract command path
        if Config.TESSERACT_CMD:
            pytesseract.pytesseract.tesseract_cmd = Config.TESSERACT_CMD
    
    def extract_text_from_file(self, file_path, file_type):
        """
        Extract text from various file types
        """
        try:
            if file_type.lower() == 'pdf':
                return self._extract_text_from_pdf(file_path)
            elif file_type.lower() in ['png', 'jpg', 'jpeg']:
                return self._extract_text_from_image(file_path)
            elif file_type.lower() == 'txt':
                return self._extract_text_from_txt(file_path)
            else:
                raise ValueError(f"Unsupported file type: {file_type}")
        except Exception as e:
            print(f"Error extracting text from {file_path}: {e}")
            return ""
    
    def _extract_text_from_image(self, image_path):
        """
        Extract text from image using OCR
        """
        try:
            # Open image
            image = Image.open(image_path)
            
            # Convert to RGB if necessary
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Extract text using Tesseract
            text = pytesseract.image_to_string(image, lang='eng')
            
            return text.strip()
        except Exception as e:
            print(f"Error in OCR for image {image_path}: {e}")
            return ""
    
    def _extract_text_from_pdf(self, pdf_path):
        """
        Extract text from PDF by converting to images and using OCR
        """
        try:
            # Convert PDF to images
            images = convert_from_path(pdf_path, dpi=300)
            
            extracted_text = ""
            
            for i, image in enumerate(images):
                # Save image to temporary file
                with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as temp_file:
                    image.save(temp_file.name, 'PNG')
                    
                    # Extract text from image
                    page_text = self._extract_text_from_image(temp_file.name)
                    extracted_text += f"\n--- Page {i+1} ---\n{page_text}\n"
                    
                    # Clean up temporary file
                    os.unlink(temp_file.name)
            
            return extracted_text.strip()
        except Exception as e:
            print(f"Error in PDF OCR for {pdf_path}: {e}")
            return ""
    
    def _extract_text_from_txt(self, txt_path):
        """
        Extract text from plain text file
        """
        try:
            with open(txt_path, 'r', encoding='utf-8') as file:
                return file.read().strip()
        except UnicodeDecodeError:
            # Try with different encoding
            try:
                with open(txt_path, 'r', encoding='latin-1') as file:
                    return file.read().strip()
            except Exception as e:
                print(f"Error reading text file {txt_path}: {e}")
                return ""
        except Exception as e:
            print(f"Error reading text file {txt_path}: {e}")
            return ""
    
    def preprocess_image_for_ocr(self, image_path):
        """
        Preprocess image to improve OCR accuracy
        """
        try:
            from PIL import ImageEnhance, ImageFilter
            
            # Open image
            image = Image.open(image_path)
            
            # Convert to grayscale
            image = image.convert('L')
            
            # Enhance contrast
            enhancer = ImageEnhance.Contrast(image)
            image = enhancer.enhance(2.0)
            
            # Enhance sharpness
            enhancer = ImageEnhance.Sharpness(image)
            image = enhancer.enhance(2.0)
            
            # Apply filter to reduce noise
            image = image.filter(ImageFilter.MedianFilter())
            
            # Save preprocessed image
            preprocessed_path = image_path.replace('.', '_preprocessed.')
            image.save(preprocessed_path)
            
            return preprocessed_path
        except Exception as e:
            print(f"Error preprocessing image {image_path}: {e}")
            return image_path  # Return original path if preprocessing fails
    
    def extract_text_with_confidence(self, image_path):
        """
        Extract text with confidence scores
        """
        try:
            image = Image.open(image_path)
            
            # Get detailed OCR data
            data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)
            
            # Filter out low confidence text
            confident_text = []
            for i in range(len(data['text'])):
                confidence = int(data['conf'][i])
                text = data['text'][i].strip()
                
                if confidence > 30 and text:  # Only include text with >30% confidence
                    confident_text.append(text)
            
            return ' '.join(confident_text)
        except Exception as e:
            print(f"Error in confident OCR for {image_path}: {e}")
            return self._extract_text_from_image(image_path)  # Fallback to regular OCR

