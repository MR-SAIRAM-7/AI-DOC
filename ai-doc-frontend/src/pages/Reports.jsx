import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { reportsAPI } from '../lib/api';
import { Link } from 'react-router-dom';
import ReportCard from '../components/features/ReportCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { FileText, Upload, AlertCircle, Loader2 } from 'lucide-react';

const Reports = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await reportsAPI.getAll();
      setReports(response.data.reports || []);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (reportId) => {
    try {
      await reportsAPI.delete(reportId);
      setReports(reports.filter(report => report.id !== reportId));
    } catch (err) {
      console.error('Error deleting report:', err);
      setError('Failed to delete report');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading your reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('reports.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage your medical reports
          </p>
        </div>
        <Link to="/upload">
          <Button className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Upload New Report</span>
          </Button>
        </Link>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Reports Grid */}
      {reports.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onDelete={handleDeleteReport}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="text-center py-12">
          <CardContent>
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
            <CardTitle className="mb-2">No reports yet</CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Upload your first medical report to get started with AI-powered analysis and explanations.
            </p>
            <Link to="/upload">
              <Button className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Upload Your First Report</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Stats Summary */}
      {reports.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {reports.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Processed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {reports.filter(r => r.status === 'processed').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {reports.filter(r => r.status === 'processing').length}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Reports;

