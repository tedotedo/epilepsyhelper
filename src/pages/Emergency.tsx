import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import {
  AlertTriangle,
  Phone,
  Clock,
  Pill,
  User,
  Heart,
  AlertCircle,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { CarePlan } from '../types/carePlan';

// Default empty care plan for when none exists
const getEmptyCarePlan = (): CarePlan => ({
  childName: '',
  dateOfBirth: '',
  age: { years: 0, months: 0 },
  weight: 0,
  nhsNumber: '',
  diagnosisDate: '',
  seizureTypes: [],
  frequency: '',
  triggers: [],
  auraSymptoms: [],
  dailyMedications: [],
  emergencyMedications: [],
  emergencyProtocol: {
    whenToGiveMeds: [],
    whenToCall999: [],
    specialInstructions: '',
  },
  emergencyContacts: [],
  healthcareTeam: [],
  version: '1.0',
  lastUpdated: new Date().toISOString(),
  createdAt: new Date().toISOString(),
});

const Emergency = () => {
  // Get care plan data for emergency reference
  const [carePlan] = useLocalStorage<CarePlan>('epilepsy-care-plan', getEmptyCarePlan());

  const hasCarePlan = carePlan.childName && carePlan.emergencyMedications.length > 0;
  const primaryContact = carePlan.emergencyContacts.find((c) => c.isPrimary) || carePlan.emergencyContacts[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emergency-500 to-emergency-600 flex items-center justify-center shadow-lg animate-pulse-subtle">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">
              Emergency Reference
            </h1>
            <p className="text-sm text-warm-500">Quick access during a seizure</p>
          </div>
        </div>
      </header>

      {/* 999 Call Banner - Always Visible */}
      <div className="card bg-emergency-500 border-emergency-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
              <Phone className="w-8 h-8" />
            </div>
            <div>
              <p className="text-emergency-100 text-sm font-medium">Emergency Services</p>
              <p className="text-4xl font-bold">999</p>
            </div>
          </div>
          <a
            href="tel:999"
            className="px-6 py-3 bg-white text-emergency-600 font-bold rounded-xl hover:bg-emergency-50 transition-colors shadow-lg"
          >
            Call Now
          </a>
        </div>
      </div>

      {/* Quick Timer Reminder */}
      <div className="card bg-amber-50 border-amber-200 p-4">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-amber-600" />
          <div>
            <p className="font-semibold text-warm-900">Start timing the seizure</p>
            <p className="text-sm text-warm-600">Note the time the seizure started</p>
          </div>
        </div>
      </div>

      {hasCarePlan ? (
        <>
          {/* Patient Info Card */}
          <div className="card p-4 bg-primary-50 border-primary-200">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-primary-600" />
              <div>
                <p className="font-bold text-warm-900 text-lg">{carePlan.childName}</p>
                <p className="text-sm text-warm-600">
                  Age: {carePlan.age.years}y {carePlan.age.months}m • Weight: {carePlan.weight}kg
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Medications - Large & Clear */}
          <div className="card border-2 border-emergency-300 overflow-hidden">
            <div className="bg-emergency-500 text-white p-4">
              <div className="flex items-center gap-3">
                <Pill className="w-6 h-6" />
                <h2 className="text-xl font-bold">Emergency Medication</h2>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {carePlan.emergencyMedications.map((med, index) => (
                <div
                  key={index}
                  className="p-4 bg-emergency-50 rounded-xl border border-emergency-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-2xl font-bold text-emergency-700">{med.dose}</p>
                      <p className="text-lg font-semibold text-warm-900">{med.name}</p>
                      <p className="text-warm-600 capitalize">Route: {med.route}</p>
                    </div>
                    <span className="px-3 py-1 bg-emergency-200 text-emergency-800 text-sm font-bold rounded-full">
                      #{index + 1}
                    </span>
                  </div>
                  {med.instructions && (
                    <p className="mt-3 text-sm text-warm-700 bg-white p-3 rounded-lg">
                      {med.instructions}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* When to Give Medication */}
          {carePlan.emergencyProtocol.whenToGiveMeds.length > 0 && (
            <div className="card p-4">
              <h3 className="font-bold text-warm-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                Give Emergency Medication When:
              </h3>
              <ul className="space-y-2">
                {carePlan.emergencyProtocol.whenToGiveMeds.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-warm-700">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* When to Call 999 */}
          {carePlan.emergencyProtocol.whenToCall999.length > 0 && (
            <div className="card p-4 bg-emergency-50 border-emergency-200">
              <h3 className="font-bold text-emergency-700 mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call 999 When:
              </h3>
              <ul className="space-y-2">
                {carePlan.emergencyProtocol.whenToCall999.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-warm-700">
                    <AlertTriangle className="w-5 h-5 text-emergency-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Special Instructions */}
          {carePlan.emergencyProtocol.specialInstructions && (
            <div className="card p-4 bg-purple-50 border-purple-200">
              <h3 className="font-bold text-warm-900 mb-2">Special Instructions</h3>
              <p className="text-warm-700">{carePlan.emergencyProtocol.specialInstructions}</p>
            </div>
          )}

          {/* Primary Emergency Contact */}
          {primaryContact && (
            <div className="card p-4">
              <h3 className="font-bold text-warm-900 mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary-500" />
                Emergency Contact
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-warm-900">{primaryContact.name}</p>
                  <p className="text-sm text-warm-600">{primaryContact.relationship}</p>
                  <p className="text-lg font-medium text-primary-600">{primaryContact.phone}</p>
                </div>
                <a
                  href={`tel:${primaryContact.phone}`}
                  className="px-4 py-2 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
                >
                  Call
                </a>
              </div>
            </div>
          )}

          {/* Link to Full Care Plan */}
          <Link
            to="/care-plan"
            className="card p-4 flex items-center justify-between hover:bg-warm-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-accent-500" />
              <span className="font-medium text-warm-700">View Full Care Plan</span>
            </div>
            <ChevronRight className="w-5 h-5 text-warm-400" />
          </Link>
        </>
      ) : (
        /* No Care Plan Setup */
        <div className="space-y-6">
          {/* Generic Seizure First Aid */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-warm-900 mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-emergency-500" />
              Seizure First Aid
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </span>
                <div>
                  <p className="font-semibold text-warm-900">Stay Calm & Time It</p>
                  <p className="text-sm text-warm-600">Note when the seizure started</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </span>
                <div>
                  <p className="font-semibold text-warm-900">Keep Them Safe</p>
                  <p className="text-sm text-warm-600">
                    Move harmful objects away, cushion their head
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </span>
                <div>
                  <p className="font-semibold text-warm-900">Don't Restrain</p>
                  <p className="text-sm text-warm-600">
                    Never hold them down or put anything in their mouth
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </span>
                <div>
                  <p className="font-semibold text-warm-900">Recovery Position</p>
                  <p className="text-sm text-warm-600">
                    Once the seizure stops, gently roll them onto their side
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold flex-shrink-0">
                  5
                </span>
                <div>
                  <p className="font-semibold text-warm-900">Stay With Them</p>
                  <p className="text-sm text-warm-600">
                    Reassure them as they recover, they may be confused
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* When to Call 999 - Generic */}
          <div className="card p-6 bg-emergency-50 border-emergency-200">
            <h2 className="text-xl font-bold text-emergency-700 mb-4 flex items-center gap-2">
              <Phone className="w-6 h-6" />
              Call 999 If:
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-warm-700">
                <AlertTriangle className="w-5 h-5 text-emergency-500 flex-shrink-0 mt-0.5" />
                Seizure lasts longer than 5 minutes
              </li>
              <li className="flex items-start gap-2 text-warm-700">
                <AlertTriangle className="w-5 h-5 text-emergency-500 flex-shrink-0 mt-0.5" />
                It's their first seizure
              </li>
              <li className="flex items-start gap-2 text-warm-700">
                <AlertTriangle className="w-5 h-5 text-emergency-500 flex-shrink-0 mt-0.5" />
                They don't regain consciousness
              </li>
              <li className="flex items-start gap-2 text-warm-700">
                <AlertTriangle className="w-5 h-5 text-emergency-500 flex-shrink-0 mt-0.5" />
                They have breathing difficulties
              </li>
              <li className="flex items-start gap-2 text-warm-700">
                <AlertTriangle className="w-5 h-5 text-emergency-500 flex-shrink-0 mt-0.5" />
                They're injured during the seizure
              </li>
              <li className="flex items-start gap-2 text-warm-700">
                <AlertTriangle className="w-5 h-5 text-emergency-500 flex-shrink-0 mt-0.5" />
                The seizure happens in water
              </li>
              <li className="flex items-start gap-2 text-warm-700">
                <AlertTriangle className="w-5 h-5 text-emergency-500 flex-shrink-0 mt-0.5" />
                You're unsure or worried
              </li>
            </ul>
          </div>

          {/* Setup Care Plan CTA */}
          <div className="card bg-accent-50 border-accent-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-500 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-warm-900 mb-2">
                  Set Up Your Personal Care Plan
                </h3>
                <p className="text-sm text-warm-700 mb-4">
                  Create a personalized emergency care plan with your specific medications, doses, and protocols for quick access during emergencies.
                </p>
                <Link to="/care-plan" className="btn-primary inline-flex items-center gap-2">
                  Create Care Plan
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Reminder */}
      <div className="text-center text-sm text-warm-500 py-4">
        <p>If in doubt, always call 999</p>
      </div>
    </div>
  );
};

export default Emergency;
