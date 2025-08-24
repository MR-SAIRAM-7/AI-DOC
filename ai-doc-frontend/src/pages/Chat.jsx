import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChatWindow from '../components/features/ChatWindow';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { MessageSquare, Bot, Heart, Shield } from 'lucide-react';

const Chat = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
          <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Chat with AI Doctor
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Get instant answers to your health questions from our AI-powered medical assistant.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Chat Window */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <ChatWindow />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Doctor Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                  <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Instant Responses
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get immediate answers to your health questions 24/7
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                  <Heart className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Personalized Advice
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive tailored health recommendations based on your reports
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                  <MessageSquare className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Multi-language Support
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Chat in your preferred language for better understanding
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sample Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sample Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    "What do my blood test results mean?"
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    "Are there any concerning findings in my report?"
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    "What lifestyle changes should I consider?"
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    "When should I follow up with my doctor?"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Notice */}
          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">
                    Privacy Protected
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Your conversations are encrypted and never shared with third parties.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Disclaimer */}
          <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">
                    Medical Disclaimer
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    This AI assistant provides general information only. Always consult healthcare professionals for medical decisions.
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

export default Chat;

