import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import {
  Heart,
  Info,
  Download,
  Upload,
  Trash2,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Globe,
  Mail,
  Shield,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

// Storage keys used by the app
const STORAGE_KEYS = [
  'epilepsy-app-role',
  'epilepsy-seizure-diary',
  'epilepsy-care-plan',
  'epilepsy-last-backup',
];

const About = () => {
  const [lastBackup, setLastBackup] = useLocalStorage<string | null>('epilepsy-last-backup', null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Export all data as JSON
  const handleExport = () => {
    const data: Record<string, unknown> = {};

    // Collect all stored data
    STORAGE_KEYS.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      }
    });

    const exportData = {
      exportDate: new Date().toISOString(),
      appVersion: '1.0.0',
      data,
    };

    // Create and download file
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `epilepsyhelper-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Update last backup date
    setLastBackup(new Date().toISOString());
  };

  // Import data from JSON file
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importData = JSON.parse(content);

        // Validate structure
        if (!importData.data || typeof importData.data !== 'object') {
          throw new Error('Invalid backup file format');
        }

        // Restore data
        Object.entries(importData.data).forEach(([key, value]) => {
          if (STORAGE_KEYS.includes(key)) {
            localStorage.setItem(key, JSON.stringify(value));
          }
        });

        setImportStatus('success');
        setImportMessage('Data restored successfully! Refresh the page to see your data.');

        // Clear status after 5 seconds
        setTimeout(() => {
          setImportStatus('idle');
          setImportMessage('');
        }, 5000);
      } catch (error) {
        setImportStatus('error');
        setImportMessage('Failed to restore data. Please check the file is a valid EpilepsyHelper backup.');

        setTimeout(() => {
          setImportStatus('idle');
          setImportMessage('');
        }, 5000);
      }
    };
    reader.readAsText(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Delete all data
  const handleDeleteAll = () => {
    STORAGE_KEYS.forEach((key) => {
      localStorage.removeItem(key);
    });
    setShowDeleteConfirm(false);
    window.location.reload();
  };

  // Format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">About</h1>
            <p className="text-sm text-warm-500">App info & data management</p>
          </div>
        </div>
      </header>

      {/* App Info Card */}
      <div className="card p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-warm-900">EpilepsyHelper</h2>
            <p className="text-warm-500">Version 1.0.0</p>
          </div>
        </div>
        <p className="text-warm-700 mb-4">
          EpilepsyHelper is a free tool designed to help families manage epilepsy. Track seizures, create care plans, and access helpful resources - all stored privately on your device.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
            Privacy First
          </span>
          <span className="px-3 py-1 bg-accent-100 text-accent-700 text-sm font-medium rounded-full">
            No Account Needed
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
            Works Offline
          </span>
        </div>
      </div>

      {/* SUVIMA Connection */}
      <div className="card bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-warm-900 mb-1">Part of the SUVIMA Family</h3>
            <p className="text-sm text-warm-700 mb-3">
              EpilepsyHelper is part of SUVIMA (Supporting Understanding Via Information for Medical Awareness) - a collection of tools helping families understand and manage health conditions.
            </p>
            <a
              href="https://suvima.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              <Globe className="w-4 h-4" />
              Visit SUVIMA.org
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Data Management Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-warm-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary-500" />
          Data Management
        </h2>

        {/* Backup/Export */}
        <div className="card p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-warm-900 flex items-center gap-2">
                <Download className="w-5 h-5 text-accent-500" />
                Backup Your Data
              </h3>
              <p className="text-sm text-warm-600 mt-1">
                Download all your data as a file to keep safe or transfer to another device.
              </p>
              {lastBackup && (
                <p className="text-xs text-warm-500 mt-2">
                  Last backup: {formatDate(lastBackup)}
                </p>
              )}
            </div>
            <button onClick={handleExport} className="btn-primary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Import/Restore */}
        <div className="card p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-warm-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary-500" />
                Restore From Backup
              </h3>
              <p className="text-sm text-warm-600 mt-1">
                Restore your data from a previously exported backup file.
              </p>
            </div>
            <label className="btn-secondary flex items-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4" />
              Import
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>

          {/* Import Status Messages */}
          {importStatus === 'success' && (
            <div className="mt-3 p-3 bg-accent-50 border border-accent-200 rounded-lg flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-accent-700">{importMessage}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm text-accent-600 hover:text-accent-700 font-medium flex items-center gap-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh Now
                </button>
              </div>
            </div>
          )}
          {importStatus === 'error' && (
            <div className="mt-3 p-3 bg-emergency-50 border border-emergency-200 rounded-lg flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-emergency-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-emergency-700">{importMessage}</p>
            </div>
          )}
        </div>

        {/* Delete All Data */}
        <div className="card p-4 border-emergency-200">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-warm-900 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-emergency-500" />
                Delete All Data
              </h3>
              <p className="text-sm text-warm-600 mt-1">
                Permanently delete all your data from this device. This cannot be undone.
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 border border-emergency-300 text-emergency-600 rounded-xl hover:bg-emergency-50 transition-colors"
            >
              Delete
            </button>
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="mt-4 p-4 bg-emergency-50 border border-emergency-200 rounded-xl">
              <p className="text-sm text-emergency-700 mb-3">
                <strong>Are you sure?</strong> This will permanently delete all your seizure diary entries, care plan, contacts, and settings. This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAll}
                  className="px-4 py-2 bg-emergency-500 text-white rounded-lg hover:bg-emergency-600 transition-colors"
                >
                  Yes, Delete Everything
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-white border border-warm-200 text-warm-700 rounded-lg hover:bg-warm-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Privacy & Legal Links */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/privacy"
            className="flex-1 p-3 bg-warm-50 rounded-xl hover:bg-warm-100 transition-colors flex items-center gap-3"
          >
            <Shield className="w-5 h-5 text-primary-500" />
            <div>
              <p className="font-medium text-warm-900">Privacy Policy</p>
              <p className="text-xs text-warm-500">How we protect your data</p>
            </div>
          </Link>
          <a
            href="mailto:feedback@epilepsyhelper.app"
            className="flex-1 p-3 bg-warm-50 rounded-xl hover:bg-warm-100 transition-colors flex items-center gap-3"
          >
            <Mail className="w-5 h-5 text-accent-500" />
            <div>
              <p className="font-medium text-warm-900">Send Feedback</p>
              <p className="text-xs text-warm-500">Help us improve</p>
            </div>
          </a>
        </div>
      </div>

      {/* Credits */}
      <div className="card p-6 bg-warm-50">
        <h3 className="font-semibold text-warm-900 mb-3">Created By</h3>
        <p className="text-sm text-warm-700 mb-4">
          EpilepsyHelper was created by healthcare professionals to support families affected by epilepsy.
        </p>
        <div className="text-sm text-warm-600 space-y-1">
          <p><strong>Dr. Odet Mark Aszkenasy</strong></p>
          <p><strong>Dr. Ramesh Kumar</strong></p>
        </div>
        <p className="text-xs text-warm-500 mt-4">
          Made with care in the United Kingdom
        </p>
      </div>

      {/* Medical Disclaimer */}
      <div className="card bg-amber-50 border-amber-200 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold mb-1">Medical Disclaimer</p>
            <p>
              EpilepsyHelper is designed to support epilepsy management but does not provide medical advice. Always consult your healthcare team for medical decisions. In an emergency, call 999.
            </p>
          </div>
        </div>
      </div>

      {/* Version & Copyright */}
      <div className="text-center text-sm text-warm-500 py-4">
        <p>EpilepsyHelper v1.0.0</p>
        <p className="mt-1">&copy; {new Date().getFullYear()} SUVIMA. All rights reserved.</p>
      </div>
    </div>
  );
};

export default About;
