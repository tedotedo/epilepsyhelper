import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Home,
  Calendar,
  FileText,
  Users,
  AlertCircle,
  BookOpen,
  Stethoscope,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const AppShell = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/seizure-diary', icon: Calendar, label: 'Seizure Diary' },
    { path: '/care-plan', icon: FileText, label: 'Care Plan' },
    { path: '/care-team', icon: Users, label: 'Care Team' },
    { path: '/emergency', icon: AlertCircle, label: 'Emergency' },
    { path: '/resources', icon: BookOpen, label: 'Resources' },
    { path: '/procedures', icon: Stethoscope, label: 'Procedures' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-warm-200">
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Logo/Header */}
          <div className="p-6 border-b border-warm-200">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">E</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-warm-900">EpilepsyHelper</h1>
                <p className="text-xs text-warm-500">Supporting families</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    active
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-warm-600 hover:bg-warm-50 hover:text-warm-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-warm-200">
            <div className="text-xs text-warm-500 space-y-1">
              <Link
                to="/about"
                className="block hover:text-primary-600 transition-colors"
              >
                About EpilepsyHelper
              </Link>
              <Link
                to="/privacy"
                className="block hover:text-primary-600 transition-colors"
              >
                Privacy & Disclaimer
              </Link>
              <p className="mt-2">
                Part of the{' '}
                <a
                  href="https://suvima.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700"
                >
                  SUVIMA
                </a>{' '}
                family
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-8">
        <div className="max-w-5xl mx-auto px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-warm-200 z-40 md:hidden">
        <div className="grid grid-cols-5 gap-1 p-2">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              isActive('/') ? 'text-primary-600' : 'text-warm-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>

          <Link
            to="/seizure-diary"
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              isActive('/seizure-diary') ? 'text-primary-600' : 'text-warm-600'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Diary</span>
          </Link>

          <Link
            to="/care-plan"
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              isActive('/care-plan') ? 'text-primary-600' : 'text-warm-600'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">Plan</span>
          </Link>

          <Link
            to="/care-team"
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              isActive('/care-team') ? 'text-primary-600' : 'text-warm-600'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Team</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg text-warm-600"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
            <span className="text-xs">More</span>
          </button>
        </div>

        {/* Mobile More Menu */}
        {mobileMenuOpen && (
          <div className="absolute bottom-full left-0 right-0 bg-white border-t border-warm-200 shadow-2xl">
            <div className="p-4 space-y-2">
              <Link
                to="/emergency"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-warm-50 transition-colors"
              >
                <AlertCircle className="w-5 h-5 text-emergency-600" />
                <span className="font-medium">Emergency Info</span>
              </Link>
              <Link
                to="/resources"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-warm-50 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span>Resources</span>
              </Link>
              <Link
                to="/procedures"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-warm-50 transition-colors"
              >
                <Stethoscope className="w-5 h-5" />
                <span>Procedures</span>
              </Link>
              <div className="pt-2 border-t border-warm-200">
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-warm-600 hover:text-primary-600"
                >
                  About
                </Link>
                <Link
                  to="/privacy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-warm-600 hover:text-primary-600"
                >
                  Privacy & Disclaimer
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default AppShell;
