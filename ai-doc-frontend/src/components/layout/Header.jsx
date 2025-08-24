import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { supportedLanguages } from '../../lib/i18n';
import { Button } from '../ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { 
  User, 
  LogOut, 
  Settings, 
  Globe,
  Stethoscope,
  Moon,
  Sun
} from 'lucide-react';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            AI-DOC
          </span>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <Select value={i18n.language} onValueChange={changeLanguage}>
            <SelectTrigger className="w-40">
              <Globe className="h-4 w-4 mr-2" />
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

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                    <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  {t('settings')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

