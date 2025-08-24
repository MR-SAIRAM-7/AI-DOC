import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { 
  Upload, 
  FileText, 
  Image, 
  X, 
  CheckCircle,
  AlertCircle 
} from 'lucide-react';
import { cn } from '../../lib/utils';

const FileUpload = ({ onUpload, className }) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', null

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      setUploadStatus('error');
      return;
    }

    // Add accepted files
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));

    setFiles(prev => [...prev, ...newFiles]);
    setUploadStatus(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/plain': ['.txt'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    setUploadStatus(null);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', files[0].file);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const result = await onUpload(formData);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (result.success) {
        setUploadStatus('success');
        setTimeout(() => {
          setFiles([]);
          setUploadProgress(0);
          setUploadStatus(null);
        }, 2000);
      } else {
        setUploadStatus('error');
      }
    } catch (error) {
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type === 'application/pdf') return FileText;
    return FileText;
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardContent className="p-6">
        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
            isDragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
            uploading && 'pointer-events-none opacity-50'
          )}
        >
          <input {...getInputProps()} />
          
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {isDragActive
              ? 'Drop your file here'
              : t('upload.dragDrop')
            }
          </p>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('upload.supportedFormats')}
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            {files.map((fileObj) => {
              const Icon = getFileIcon(fileObj.file);
              return (
                <div
                  key={fileObj.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {fileObj.preview ? (
                      <img
                        src={fileObj.preview}
                        alt="Preview"
                        className="h-10 w-10 object-cover rounded"
                      />
                    ) : (
                      <Icon className="h-10 w-10 text-gray-400" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {fileObj.file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  
                  {!uploading && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(fileObj.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('upload.processing')}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {uploadProgress}%
              </span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}

        {/* Status Messages */}
        {uploadStatus === 'success' && (
          <div className="mt-4 flex items-center text-green-600 dark:text-green-400">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">{t('upload.success')}</span>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="mt-4 flex items-center text-red-600 dark:text-red-400">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Upload failed. Please try again.</span>
          </div>
        )}

        {/* Upload Button */}
        {files.length > 0 && !uploading && uploadStatus !== 'success' && (
          <div className="mt-6">
            <Button 
              onClick={handleUpload}
              className="w-full"
              disabled={uploading}
            >
              Upload Report
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;

