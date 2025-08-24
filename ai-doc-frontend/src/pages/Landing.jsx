import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  Upload, 
  Globe, 
  MessageCircle, 
  Shield,
  CheckCircle,
  Stethoscope,
  ArrowRight,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Upload,
      title: t('features.upload.title'),
      description: t('features.upload.description'),
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
    },
    {
      icon: Globe,
      title: t('features.translate.title'),
      description: t('features.translate.description'),
      color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
    },
    {
      icon: MessageCircle,
      title: t('features.explain.title'),
      description: t('features.explain.description'),
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
    },
    {
      icon: MessageCircle,
      title: t('features.chat.title'),
      description: t('features.chat.description'),
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Upload Your Report',
      description: 'Upload your medical report in PDF, image, or text format'
    },
    {
      step: '02',
      title: 'AI Analysis',
      description: 'Our AI analyzes and translates your report into your preferred language'
    },
    {
      step: '03',
      title: 'Get Explanations',
      description: 'Receive simple explanations of medical terms and findings'
    },
    {
      step: '04',
      title: 'Chat with AI Doctor',
      description: 'Ask questions and get personalized health guidance'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      text: 'Finally understood my blood test results in Hindi. The AI doctor explained everything so clearly!',
      rating: 5
    },
    {
      name: 'Carlos Rodriguez',
      location: 'Madrid, Spain',
      text: 'Incredible tool! Got my X-ray report translated and explained in Spanish within minutes.',
      rating: 5
    },
    {
      name: 'Dr. Rajesh Kumar',
      location: 'Delhi, India',
      text: 'As a doctor, I recommend this to my patients who need reports in their native language.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              AI-DOC
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                <Button size="lg" className="text-lg px-8 py-3">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Better Health Understanding
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our AI-powered platform makes medical reports accessible and understandable in your native language
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Simple steps to understand your health reports
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Trusted by thousands of users worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <Shield className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Health Data is Secure
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We use enterprise-grade encryption and comply with healthcare privacy standards
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                HIPAA Compliant
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                End-to-End Encryption
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                No Data Sharing
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                GDPR Compliant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Understand Your Health Better?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of users who trust AI-DOC for their medical report analysis
          </p>
          <Link to={isAuthenticated ? "/dashboard" : "/register"}>
            <Button size="lg" className="text-lg px-8 py-3">
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">AI-DOC</span>
              </div>
              <p className="text-gray-400">
                Making healthcare accessible through AI-powered medical report analysis and translation.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
                <li>API</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI-DOC. All rights reserved.</p>
            <p className="mt-2 text-sm">
              {t('disclaimer.text')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

