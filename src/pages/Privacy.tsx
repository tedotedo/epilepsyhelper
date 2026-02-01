import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  Eye,
  Server,
  Smartphone,
  Trash2,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  FileText,
} from 'lucide-react';

const Privacy = () => {
  const lastUpdated = 'February 1, 2026';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Privacy Policy</h1>
            <p className="text-sm text-warm-500">How we protect your data</p>
          </div>
        </div>
      </header>

      {/* Privacy Summary Card */}
      <div className="card bg-accent-50 border-accent-200 p-6">
        <h2 className="font-bold text-warm-900 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-accent-500" />
          Privacy at a Glance
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-warm-900">Your data stays on your device</p>
              <p className="text-sm text-warm-600">Nothing is sent to our servers</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-warm-900">No tracking or analytics</p>
              <p className="text-sm text-warm-600">We don't monitor how you use the app</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Server className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-warm-900">No account required</p>
              <p className="text-sm text-warm-600">Use the app without signing up</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Trash2 className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-warm-900">You control your data</p>
              <p className="text-sm text-warm-600">Export or delete anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Privacy Policy */}
      <div className="card p-6 space-y-6">
        <div>
          <p className="text-sm text-warm-500 mb-4">Last updated: {lastUpdated}</p>
          <p className="text-warm-700">
            EpilepsyHelper ("the App") is committed to protecting your privacy. This policy explains how we handle your information.
          </p>
        </div>

        {/* Section 1 */}
        <section>
          <h3 className="text-lg font-bold text-warm-900 mb-3 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary-500" />
            1. Data Storage
          </h3>
          <div className="text-warm-700 space-y-3">
            <p>
              <strong>All your data is stored locally on your device</strong> using your browser's localStorage feature. This means:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your seizure diary entries, care plan, contacts, and settings never leave your device</li>
              <li>We do not have access to your data</li>
              <li>Your data is not uploaded to any server</li>
              <li>Your data is not shared with any third parties</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <h3 className="text-lg font-bold text-warm-900 mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary-500" />
            2. What Data We Collect
          </h3>
          <div className="text-warm-700 space-y-3">
            <p>
              <strong>We do not collect any personal data.</strong> The App does not:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Require you to create an account</li>
              <li>Ask for your name, email, or any identifying information</li>
              <li>Use cookies for tracking</li>
              <li>Use analytics or tracking services</li>
              <li>Display advertisements</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h3 className="text-lg font-bold text-warm-900 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary-500" />
            3. How Your Data is Used
          </h3>
          <div className="text-warm-700 space-y-3">
            <p>
              The data you enter in the App (such as seizure records, care plan information, and contacts) is used solely to provide you with the App's features. Your data:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Is displayed within the App for your use</li>
              <li>Can be exported by you as a backup file</li>
              <li>Can be deleted by you at any time</li>
              <li>Is never processed, analysed, or accessed by us</li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section>
          <h3 className="text-lg font-bold text-warm-900 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary-500" />
            4. Data Security
          </h3>
          <div className="text-warm-700 space-y-3">
            <p>
              Since your data is stored locally on your device:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>It is protected by your device's security features</li>
              <li>We recommend using a screen lock on your device</li>
              <li>Clearing your browser data will delete your App data</li>
              <li>We recommend using the export feature to create regular backups</li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section>
          <h3 className="text-lg font-bold text-warm-900 mb-3 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-primary-500" />
            5. Your Rights
          </h3>
          <div className="text-warm-700 space-y-3">
            <p>
              You have full control over your data:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Access:</strong> All your data is visible within the App</li>
              <li><strong>Export:</strong> You can download all your data from the About page</li>
              <li><strong>Delete:</strong> You can delete all your data from the About page</li>
              <li><strong>Portability:</strong> Exported data is in a standard JSON format</li>
            </ul>
          </div>
        </section>

        {/* Section 6 */}
        <section>
          <h3 className="text-lg font-bold text-warm-900 mb-3 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary-500" />
            6. External Links
          </h3>
          <div className="text-warm-700 space-y-3">
            <p>
              The App contains links to external websites (such as epilepsy charities and NHS resources). These websites have their own privacy policies. We are not responsible for the privacy practices of external sites.
            </p>
          </div>
        </section>

        {/* Section 7 */}
        <section>
          <h3 className="text-lg font-bold text-warm-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-500" />
            7. Changes to This Policy
          </h3>
          <div className="text-warm-700 space-y-3">
            <p>
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. Continued use of the App after changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section>
          <h3 className="text-lg font-bold text-warm-900 mb-3">8. Contact Us</h3>
          <div className="text-warm-700">
            <p>
              If you have any questions about this privacy policy, please contact us at:{' '}
              <a href="mailto:privacy@epilepsyhelper.app" className="text-primary-600 hover:underline">
                privacy@epilepsyhelper.app
              </a>
            </p>
          </div>
        </section>
      </div>

      {/* Medical Disclaimer */}
      <div className="card bg-amber-50 border-amber-200 p-6">
        <h2 className="font-bold text-warm-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          Medical Disclaimer
        </h2>
        <div className="text-sm text-warm-700 space-y-3">
          <p>
            <strong>EpilepsyHelper is not a medical device</strong> and is intended for informational and organisational purposes only.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The App does not provide medical advice, diagnosis, or treatment</li>
            <li>Always consult qualified healthcare professionals for medical decisions</li>
            <li>Emergency medication doses shown are based on standard guidelines but must be confirmed with your prescribing clinician</li>
            <li>In any medical emergency, call 999 immediately</li>
            <li>The creators of this App accept no liability for decisions made based on information in the App</li>
          </ul>
          <p>
            The care plan feature generates templates to support communication with healthcare providers. These templates should be reviewed and approved by your healthcare team before use.
          </p>
        </div>
      </div>

      {/* Terms of Use Summary */}
      <div className="card p-6">
        <h2 className="font-bold text-warm-900 mb-3">Terms of Use</h2>
        <div className="text-sm text-warm-700 space-y-3">
          <p>By using EpilepsyHelper, you agree that:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You will use the App for personal, non-commercial purposes</li>
            <li>You understand this is not a medical device</li>
            <li>You will not rely solely on the App for medical decisions</li>
            <li>You are responsible for maintaining backups of your data</li>
            <li>The App is provided "as is" without warranties</li>
          </ul>
        </div>
      </div>

      {/* Back to About */}
      <div className="flex justify-center">
        <Link to="/about" className="btn-secondary inline-flex items-center gap-2">
          ← Back to About
        </Link>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-warm-500 py-4">
        <p>&copy; {new Date().getFullYear()} SUVIMA. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Privacy;
