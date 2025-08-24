import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { supportedLanguages } from '../lib/i18n';
import { reportsAPI } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/features/FileUpload';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Upload as UploadIcon, Globe, CheckCircle, AlertCircle } from 'lucide-react';

const Upload = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [targetLanguage, setTargetLanguage] = useState(user?.preferredLanguage || 'en');
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', null
  const [uploadMessage, setUploadMessage] = useState('');

  const handleUpload = async (formData) => {
    try {
      // Add target language to form data
      formData.append('targetLanguage', targetLanguage);
      formData.append('title', 'Medical Report');

      const response = await reportsAPI.upload(formData);
      
      if (response.data) {
        setUploadStatus('success');
        setUploadMessage('Report uploaded and processed successfully!');
        
        // Redirect to report detail after 2 seconds
        setTimeout(() => {
          navigate(`/report/${response.data.report.id}`);
        }, 2000);
        
        return { success: true };
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setUploadMessage(error.response?.data?.error || 'Failed to upload report');
      return { success: false };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
          <UploadIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('upload.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Upload your medical report and get instant translation and AI-powered explanations in your preferred language.
        </p>
      </div>

      {/* Upload Status */}
      {uploadStatus && (
        <Alert variant={uploadStatus === 'success' ? 'default' : 'destructive'}>
          {uploadStatus === 'success' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>{uploadMessage}</AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-2">
          <FileUpload 
            onUpload={handleUpload}
            className="h-full"
          />
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-6">
          {/* Language Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                {t('upload.selectLanguage')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {Object.entries(supportedLanguages).map(([code, lang]) => (
                    <SelectItem key={code} value={code}>
                      <span className="flex items-center space-x-2">
                        <span>{lang.nativeName}</span>
                        <span className="text-xs text-gray-500">({lang.name})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Your report will be translated and explained in this language.
              </p>
            </CardContent>
          </Card>

          {/* Processing Info */}
          <Card>
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mt-1">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Text Extraction</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    We'll extract text from your document using OCR technology
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full mt-1">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Translation</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Content will be translated to your selected language
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 dark:bg-purple-900 p-1 rounded-full mt-1">
                  <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">AI Analysis</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Our AI doctor will explain the findings in simple terms
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-orange-100 dark:bg-orange-900 p-1 rounded-full mt-1">
                  <div className="w-2 h-2 bg-orange-600 dark:bg-orange-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Health Tips</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Receive personalized health recommendations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                    Your Data is Secure
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    All uploads are encrypted and processed securely. We never share your medical information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">
                {t('disclaimer.title')}
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                {t('disclaimer.text')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;

