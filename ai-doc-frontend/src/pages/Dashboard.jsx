import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { reportsAPI } from '../lib/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import ReportCard from '../components/features/ReportCard';
import { 
  Upload, 
  FileText, 
  Globe, 
  MessageCircle,
  Plus,
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReports: 0,
    languagesUsed: 0,
    totalChats: 0,
    recentActivity: 0
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await reportsAPI.getAll();
      const reportsData = response.data || [];
      setReports(reportsData);
      
      // Calculate stats
      const languagesSet = new Set(reportsData.map(r => r.translatedLanguage).filter(Boolean));
      const totalChats = reportsData.reduce((sum, r) => sum + (r.chatHistory?.length || 0), 0);
      const recentActivity = reportsData.filter(r => {
        const reportDate = new Date(r.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return reportDate > weekAgo;
      }).length;

      setStats({
        totalReports: reportsData.length,
        languagesUsed: languagesSet.size,
        totalChats,
        recentActivity
      });
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewReport = (report) => {
    navigate(`/report/${report._id}`);
  };

  const handleChatWithReport = (report) => {
    navigate(`/chat/${report._id}`);
  };

  const handleDownloadReport = async (report) => {
    try {
      // Implementation for downloading report
      console.log('Downloading report:', report._id);
    } catch (error) {
      console.error('Failed to download report:', error);
    }
  };

  const handleDeleteReport = async (report) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        await reportsAPI.delete(report._id);
        await fetchReports(); // Refresh the list
      } catch (error) {
        console.error('Failed to delete report:', error);
      }
    }
  };

  const quickActions = [
    {
      title: 'Upload New Report',
      description: 'Upload and analyze a new medical report',
      icon: Upload,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
      href: '/upload'
    },
    {
      title: 'View All Reports',
      description: 'Browse your complete report history',
      icon: FileText,
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
      href: '/reports'
    },
    {
      title: 'Chat History',
      description: 'Review your conversations with AI Doctor',
      icon: MessageCircle,
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
      href: '/chat'
    }
  ];

  const statCards = [
    {
      title: 'Total Reports',
      value: stats.totalReports,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      title: 'Languages Used',
      value: stats.languagesUsed,
      icon: Globe,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900'
    },
    {
      title: 'Chat Messages',
      value: stats.totalChats,
      icon: MessageCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900'
    },
    {
      title: 'This Week',
      value: stats.recentActivity,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {t('dashboard.welcome')}, {user?.firstName}! 👋
        </h1>
        <p className="text-blue-100 mb-4">
          Your personal AI doctor is ready to help you understand your health reports
        </p>
        <Link to="/upload">
          <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            <Plus className="h-4 w-4 mr-2" />
            {t('dashboard.uploadNew')}
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-lg ${action.color} mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t('dashboard.recentReports')}
          </h2>
          {reports.length > 3 && (
            <Link to="/reports">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          )}
        </div>

        {reports.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('dashboard.noReports')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('dashboard.uploadFirst')}
              </p>
              <Link to="/upload">
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Your First Report
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.slice(0, 6).map((report) => (
              <ReportCard
                key={report._id}
                report={report}
                onView={handleViewReport}
                onChat={handleChatWithReport}
                onDownload={handleDownloadReport}
                onDelete={handleDeleteReport}
              />
            ))}
          </div>
        )}
      </div>

      {/* Health Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-green-600" />
            Daily Health Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Regular health checkups are essential for early detection of potential health issues. 
            Make sure to schedule annual physical exams and follow up on any concerning symptoms 
            with your healthcare provider.
          </p>
        </CardContent>
      </Card>

      {/* Medical Disclaimer */}
      <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                {t('disclaimer.title')}
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {t('disclaimer.text')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

