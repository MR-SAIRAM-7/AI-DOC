import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const ChatWindow = ({ reportId, onSendMessage, messages = [], isLoading = false }) => {
  const { t } = useTranslation();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage.trim();
    setInputMessage('');
    setIsTyping(true);

    try {
      await onSendMessage({
        reportId,
        message,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "What does this report mean?",
    "Are there any concerning findings?",
    "What should I do next?",
    "Can you explain the medical terms?",
    "What lifestyle changes do you recommend?"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span>{t('chat')} - AI Doctor</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Hello! I'm your AI doctor. I've analyzed your medical report and I'm here to help you understand it better.
              </p>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quick questions you can ask:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {quickQuestions.slice(0, 3).map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start space-x-3',
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className={cn(
                  message.sender === 'user' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-green-100 text-green-600'
                )}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>

              <div
                className={cn(
                  'max-w-[80%] rounded-lg px-4 py-2',
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <p className={cn(
                  'text-xs mt-1 opacity-70',
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                )}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {(isTyping || isLoading) && (
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-green-100 text-green-600">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t('chat.typing')}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions (when no messages) */}
        {messages.length === 0 && (
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2">
              {quickQuestions.slice(3).map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs text-gray-600 dark:text-gray-400"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={t('chat.placeholder')}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={!inputMessage.trim() || isLoading}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatWindow;

