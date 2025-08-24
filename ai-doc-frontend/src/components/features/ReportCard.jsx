import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  FileText, 
  Calendar, 
  Globe, 
  MessageCircle, 
  Download,
  Eye,
  Trash2
} from 'lucide-react';
import { cn } from '../../lib/utils';

const ReportCard = ({ 
  report, 
  onView, 
  onChat, 
  onDownload, 
  onDelete,
  className 
}) => {
  const { t } = useTranslation();

  const getFileTypeIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return '📄';
      case 'image':
        return '🖼️';
      case 'text':
        return '📝';
      default:
        return '📄';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">
              {getFileTypeIcon(report.fileType)}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">
                {report.title || 'Medical Report'}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(report.createdAt)}
                </span>
              </div>
            </div>
          </div>
          
          <Badge className={getStatusColor(report.status)}>
            {report.status || 'processed'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Report Summary */}
        {report.explanation && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {report.explanation.substring(0, 150)}...
          </p>
        )}

        {/* Language Info */}
        {report.translatedLanguage && (
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Translated to {report.translatedLanguage}
            </span>
          </div>
        )}

        {/* Key Findings */}
        {report.keyFindings && report.keyFindings.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Key Findings:
            </p>
            <div className="flex flex-wrap gap-1">
              {report.keyFindings.slice(0, 3).map((finding, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {finding}
                </Badge>
              ))}
              {report.keyFindings.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{report.keyFindings.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(report)}
              className="flex items-center space-x-1"
            >
              <Eye className="h-4 w-4" />
              <span>View</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChat(report)}
              className="flex items-center space-x-1"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat</span>
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDownload(report)}
              className="p-2"
            >
              <Download className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(report)}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat History Indicator */}
        {report.chatHistory && report.chatHistory.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <MessageCircle className="h-4 w-4" />
              <span>{report.chatHistory.length} messages in chat history</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportCard;

