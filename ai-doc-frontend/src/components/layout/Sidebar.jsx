import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { 
  LayoutDashboard, 
  FileText, 
  MessageCircle, 
  Upload,
  Activity
} from 'lucide-react';

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navigation = [
    {
      name: t('dashboard'),
      href: '/dashboard',
      icon: LayoutDashboard,
      current: location.pathname === '/dashboard',
    },
    {
      name: t('reports'),
      href: '/reports',
      icon: FileText,
      current: location.pathname === '/reports',
    },
    {
      name: 'Upload',
      href: '/upload',
      icon: Upload,
      current: location.pathname === '/upload',
    },
    {
      name: t('chat'),
      href: '/chat',
      icon: MessageCircle,
      current: location.pathname === '/chat',
    },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    item.current
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  <Icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      item.current
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Health Stats Widget */}
      <div className="mt-8 mx-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <div className="flex items-center">
          <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
          <span className="ml-2 text-sm font-medium text-green-800 dark:text-green-200">
            Health Status
          </span>
        </div>
        <p className="mt-2 text-xs text-green-600 dark:text-green-400">
          All systems monitoring your health data securely
        </p>
      </div>
    </div>
  );
};

export default Sidebar;

