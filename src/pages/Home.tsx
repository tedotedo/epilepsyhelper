import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import {
  Calendar,
  FileText,
  AlertCircle,
  Users,
  BookOpen,
  Stethoscope,
  Heart,
} from 'lucide-react';

type UserRole = 'parent-carer' | 'young-person' | 'professional' | null;

const Home = () => {
  const [role, setRole] = useLocalStorage<UserRole>('epilepsy-app-role', null);

  const quickActions = [
    {
      title: 'Log Seizure',
      description: 'Record a seizure event',
      icon: Calendar,
      path: '/seizure-diary',
      color: 'from-primary-500 to-primary-600',
    },
    {
      title: 'Care Plan',
      description: 'View or update care plan',
      icon: FileText,
      path: '/care-plan',
      color: 'from-accent-500 to-accent-600',
    },
    {
      title: 'Emergency Info',
      description: 'Quick reference guide',
      icon: AlertCircle,
      path: '/emergency',
      color: 'from-emergency-500 to-emergency-600',
    },
    {
      title: 'Care Team',
      description: 'Contact information',
      icon: Users,
      path: '/care-team',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const resources = [
    {
      title: 'Educational Resources',
      description: 'Learn about epilepsy',
      icon: BookOpen,
      path: '/resources',
    },
    {
      title: 'Procedure Prep',
      description: 'Prepare for EEG, MRI & more',
      icon: Stethoscope,
      path: '/procedures',
    },
  ];

  // If no role selected, show role selector
  if (!role) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="max-w-4xl w-full space-y-8 animate-fade-in">
          {/* Welcome Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-2xl shadow-primary-500/30">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-warm-900">
              Welcome to EpilepsyHelper
            </h1>
            <p className="text-lg text-warm-600 max-w-2xl mx-auto">
              Your companion for managing epilepsy with confidence. Track seizures, create care plans, and access helpful resources.
            </p>
          </div>

          {/* Role Selection */}
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => setRole('parent-carer')}
              className="card card-hover p-8 text-center space-y-4 group"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center group-hover:from-primary-500 group-hover:to-primary-600 transition-all duration-300">
                <Users className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-warm-900 mb-2">
                  Parent / Carer
                </h3>
                <p className="text-sm text-warm-600">
                  I'm caring for someone with epilepsy
                </p>
              </div>
            </button>

            <button
              onClick={() => setRole('young-person')}
              className="card card-hover p-8 text-center space-y-4 group"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center group-hover:from-accent-500 group-hover:to-accent-600 transition-all duration-300">
                <Heart className="w-8 h-8 text-accent-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-warm-900 mb-2">
                  Young Person
                </h3>
                <p className="text-sm text-warm-600">
                  I have epilepsy and want to manage it myself
                </p>
              </div>
            </button>

            <button
              onClick={() => setRole('professional')}
              className="card card-hover p-8 text-center space-y-4 group"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center group-hover:from-purple-500 group-hover:to-purple-600 transition-all duration-300">
                <Stethoscope className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-warm-900 mb-2">
                  Healthcare Professional
                </h3>
                <p className="text-sm text-warm-600">
                  I'm supporting patients with epilepsy
                </p>
              </div>
            </button>
          </div>

          {/* Info Box */}
          <div className="card bg-primary-50 border-primary-200 p-6 text-center">
            <p className="text-sm text-warm-700">
              <strong>Privacy First:</strong> All your data stays on your device.
              No accounts needed. You can change your role anytime in settings.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-warm-900">
              Welcome back
            </h1>
            <p className="text-warm-600 mt-1">
              {role === 'parent-carer' && 'Managing care with confidence'}
              {role === 'young-person' && 'Taking control of your health'}
              {role === 'professional' && 'Supporting patients effectively'}
            </p>
          </div>
          <button
            onClick={() => setRole(null)}
            className="btn-secondary text-sm"
          >
            Change Role
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-warm-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className="card card-hover p-6 space-y-3 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-warm-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-xs text-warm-600">{action.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Resources Section */}
      <div>
        <h2 className="text-xl font-bold text-warm-900 mb-4">
          Learning & Support
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Link
                key={resource.path}
                to={resource.path}
                className="card card-hover p-6 flex items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-warm-100 to-warm-200 flex items-center justify-center group-hover:from-primary-100 group-hover:to-primary-200 transition-all duration-200">
                  <Icon className="w-7 h-7 text-warm-600 group-hover:text-primary-600 transition-colors duration-200" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-warm-900 mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-warm-600">{resource.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* SUVIMA Link */}
      <div className="card bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <BookOpen className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-warm-900 mb-1">
              Want to learn more about epilepsy?
            </h3>
            <p className="text-sm text-warm-700 mb-3">
              Visit SUVIMA for comprehensive, age-appropriate educational resources about epilepsy and other conditions.
            </p>
            <a
              href="https://suvima.org/epilepsy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
            >
              Explore SUVIMA
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Tip of the Day */}
      <div className="card bg-accent-50 border-accent-200 p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">💡</span>
          </div>
          <div>
            <h3 className="font-semibold text-warm-900 mb-1">Tip of the Day</h3>
            <p className="text-sm text-warm-700">
              Keep your seizure diary up to date – patterns you track today can help your care team make better decisions tomorrow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
