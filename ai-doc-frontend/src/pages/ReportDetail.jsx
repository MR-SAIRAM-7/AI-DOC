import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { reportsAPI } from '../lib/api';
import ChatWindow from '../components/features/ChatWindow';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  ArrowLeft, 
  FileText, 
  MessageSquare, 
  Heart, 
  Lightbulb,
  Loader2,
  AlertCircle,
  Calendar,
  Globe
} from 'lucide-react';

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('explanation');

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await reportsAPI.getById(id);
      setReport(response.data.report);
    } catch (err) {
      console.error('Error fetching report:', err);
      setError('Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading report...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-2xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || 'Report not found'}</AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
          <Button onClick={() => navigate('/reports')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reports
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'explanation', label: 'AI Explanation', icon: Lightbulb },
    { id: 'health-tips', label: 'Health Tips', icon: Heart },
    { id: 'chat', label: 'Chat with AI Doctor', icon: MessageSquare },
    { id: 'original', label: 'Original Content', icon: FileText }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/reports')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {report.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(report.created_at).toLocaleDateString()}</span>
              </div>
              {report.translated_language && (
                <div className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span>Translated to {report.translated_language}</span>
                </div>
              )}
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                report.status === 'processed' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : report.status === 'processing'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {report.status}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {activeTab === 'explanation' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  AI Medical Explanation
                </CardTitle>
              </CardHeader>
              <CardContent>
                {report.explanation ? (
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                      {report.explanation}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">
                    No explanation available for this report.
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'health-tips' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Personalized Health Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                {report.health_tips ? (
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                      {report.health_tips}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">
                    No health tips available for this report.
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'chat' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Chat with AI Doctor
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ChatWindow reportId={report.id} />
              </CardContent>
            </Card>
          )}

          {activeTab === 'original' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Original Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                {report.original_content ? (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono">
                      {report.original_content}
                    </pre>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">
                    No original content available.
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Findings */}
          {report.key_findings && report.key_findings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Findings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {report.key_findings.map((finding, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mt-1">
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {finding}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Report Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Report Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  File Type
                </label>
                <p className="text-sm text-gray-900 dark:text-white uppercase">
                  {report.file_type}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Upload Date
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {new Date(report.created_at).toLocaleString()}
                </p>
              </div>
              {report.translated_language && (
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Translated Language
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {report.translated_language}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Medical Disclaimer */}
          <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">
                    Medical Disclaimer
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    This AI analysis is for informational purposes only and should not replace professional medical advice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;

