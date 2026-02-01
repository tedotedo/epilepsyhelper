import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import {
  FileText,
  User,
  Pill,
  AlertTriangle,
  Phone,
  Users,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  Trash2,
  Download,
  Calculator,
  Info,
  Check,
  AlertCircle,
} from 'lucide-react';
import {
  CarePlan as CarePlanType,
  Medication,
  EmergencyMedication,
  Contact,
  TeamMember,
} from '../types/carePlan';

// Generate unique ID
const generateId = () => `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Default empty care plan
const getEmptyCarePlan = (): CarePlanType => ({
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
    whenToGiveMeds: [
      'Seizure lasts longer than 5 minutes',
      'Second seizure within 24 hours',
      'Seizure clusters (as defined by care team)',
    ],
    whenToCall999: [
      'Seizure lasts longer than 5 minutes after giving emergency medication',
      'Breathing difficulties during or after seizure',
      'Injury during seizure',
      'First ever seizure',
      'Seizure in water',
    ],
    specialInstructions: '',
  },
  emergencyContacts: [],
  healthcareTeam: [],
  version: '1.0',
  lastUpdated: new Date().toISOString(),
  createdAt: new Date().toISOString(),
});

// Accordion section types
type SectionId = 'personal' | 'medications' | 'emergency' | 'contacts' | 'team';

interface AccordionSectionProps {
  id: SectionId;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isComplete: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  accentColor?: string;
}

// Accordion Section Component
const AccordionSection = ({
  title,
  icon,
  isOpen,
  isComplete,
  onToggle,
  children,
  accentColor = 'primary',
}: AccordionSectionProps) => {
  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    primary: {
      bg: 'from-primary-500 to-primary-600',
      border: 'border-primary-200',
      text: 'text-primary-600',
    },
    accent: {
      bg: 'from-accent-500 to-accent-600',
      border: 'border-accent-200',
      text: 'text-accent-600',
    },
    emergency: {
      bg: 'from-emergency-500 to-emergency-600',
      border: 'border-emergency-200',
      text: 'text-emergency-600',
    },
    purple: {
      bg: 'from-purple-500 to-purple-600',
      border: 'border-purple-200',
      text: 'text-purple-600',
    },
  };

  const colors = colorClasses[accentColor] || colorClasses.primary;

  return (
    <div className={`card overflow-hidden ${isOpen ? colors.border : ''}`}>
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-warm-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-sm`}
          >
            {icon}
          </div>
          <span className="font-semibold text-warm-900">{title}</span>
          {isComplete && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">
              <Check className="w-3 h-3" />
              Complete
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-warm-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-warm-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-warm-100 animate-fade-in">{children}</div>
      )}
    </div>
  );
};

// NICE Guidelines Dosing Calculator Component
interface DosingCalculatorProps {
  weight: number;
  age: { years: number; months: number };
  onAddMedication: (med: EmergencyMedication) => void;
}

const DosingCalculator = ({ weight, age, onAddMedication }: DosingCalculatorProps) => {
  const [selectedMed, setSelectedMed] = useState<'buccolam' | 'diazepam' | 'epistatus' | ''>('');

  // Calculate doses based on NICE/BNF-C guidelines
  const calculateDoses = useMemo(() => {
    if (!weight || weight <= 0) return null;

    const ageInMonths = age.years * 12 + age.months;

    // Buccolam (Midazolam oromucosal) - NICE guidelines
    let buccolamDose = '';
    let buccolamInstructions = '';
    if (ageInMonths >= 3 && ageInMonths < 12) {
      buccolamDose = '2.5mg';
      buccolamInstructions = '2.5mg (yellow tube)';
    } else if (ageInMonths >= 12 && age.years < 5) {
      buccolamDose = '5mg';
      buccolamInstructions = '5mg (blue tube)';
    } else if (age.years >= 5 && age.years < 10) {
      buccolamDose = '7.5mg';
      buccolamInstructions = '7.5mg (purple tube)';
    } else if (age.years >= 10 && age.years < 18) {
      buccolamDose = '10mg';
      buccolamInstructions = '10mg (orange tube)';
    }

    // Rectal Diazepam - weight-based calculation
    // Standard: 0.5mg/kg, max 10mg for children, 20mg for adults
    const diazepamCalc = Math.min(weight * 0.5, age.years >= 12 ? 20 : 10);
    const diazepamDose = `${Math.round(diazepamCalc * 2) / 2}mg`; // Round to nearest 0.5mg

    // Epistatus (Nasal Midazolam) - similar to Buccolam age bands
    let epistatusDose = '';
    if (age.years >= 3 && age.years < 6) {
      epistatusDose = '2.5mg per nostril (5mg total)';
    } else if (age.years >= 6 && age.years < 12) {
      epistatusDose = '5mg per nostril (10mg total)';
    } else if (age.years >= 12) {
      epistatusDose = '5mg per nostril (10mg total)';
    }

    return {
      buccolam: { dose: buccolamDose, instructions: buccolamInstructions },
      diazepam: { dose: diazepamDose, instructions: `Rectal administration: ${diazepamDose}` },
      epistatus: { dose: epistatusDose, instructions: `Nasal spray: ${epistatusDose}` },
    };
  }, [weight, age]);

  const handleAddMedication = () => {
    if (!selectedMed || !calculateDoses) return;

    const medInfo = calculateDoses[selectedMed];
    const medNames: Record<string, string> = {
      buccolam: 'Buccolam (Midazolam)',
      diazepam: 'Rectal Diazepam',
      epistatus: 'Epistatus (Nasal Midazolam)',
    };
    const routes: Record<string, 'buccal' | 'rectal' | 'nasal'> = {
      buccolam: 'buccal',
      diazepam: 'rectal',
      epistatus: 'nasal',
    };

    const newMed: EmergencyMedication = {
      name: medNames[selectedMed],
      dose: medInfo.dose,
      route: routes[selectedMed],
      instructions: medInfo.instructions,
      whenToGive: ['As per emergency protocol'],
    };

    onAddMedication(newMed);
    setSelectedMed('');
  };

  if (!weight || weight <= 0) {
    return (
      <div className="p-4 bg-warm-50 rounded-xl border border-warm-200">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-warm-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-warm-600">
              Enter the child's weight in the Personal Information section to calculate emergency medication doses.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
        <div className="flex items-start gap-3">
          <Calculator className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-warm-900 mb-2">Dosing Calculator</h4>
            <p className="text-sm text-warm-600 mb-4">
              Based on NICE/BNF-C guidelines for weight: <strong>{weight}kg</strong>, age:{' '}
              <strong>
                {age.years}y {age.months}m
              </strong>
            </p>

            {calculateDoses && (
              <div className="space-y-3">
                {calculateDoses.buccolam.dose && (
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <span className="font-medium text-warm-800">Buccolam (Buccal Midazolam)</span>
                      <p className="text-sm text-warm-600">{calculateDoses.buccolam.instructions}</p>
                    </div>
                    <button
                      onClick={() => setSelectedMed('buccolam')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        selectedMed === 'buccolam'
                          ? 'bg-primary-500 text-white'
                          : 'bg-warm-100 text-warm-700 hover:bg-warm-200'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <span className="font-medium text-warm-800">Rectal Diazepam</span>
                    <p className="text-sm text-warm-600">{calculateDoses.diazepam.instructions}</p>
                  </div>
                  <button
                    onClick={() => setSelectedMed('diazepam')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedMed === 'diazepam'
                        ? 'bg-primary-500 text-white'
                        : 'bg-warm-100 text-warm-700 hover:bg-warm-200'
                    }`}
                  >
                    Select
                  </button>
                </div>

                {calculateDoses.epistatus.dose && (
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <span className="font-medium text-warm-800">Epistatus (Nasal Midazolam)</span>
                      <p className="text-sm text-warm-600">{calculateDoses.epistatus.instructions}</p>
                    </div>
                    <button
                      onClick={() => setSelectedMed('epistatus')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        selectedMed === 'epistatus'
                          ? 'bg-primary-500 text-white'
                          : 'bg-warm-100 text-warm-700 hover:bg-warm-200'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                )}
              </div>
            )}

            {selectedMed && (
              <button onClick={handleAddMedication} className="btn-primary w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add to Emergency Medications
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800">
            <strong>Important:</strong> These doses are calculated based on standard guidelines. Always confirm doses with your prescribing clinician. Individual circumstances may require different dosing.
          </p>
        </div>
      </div>
    </div>
  );
};

// Main CarePlan Component
const CarePlan = () => {
  // Persisted care plan data
  const [carePlan, setCarePlan] = useLocalStorage<CarePlanType>(
    'epilepsy-care-plan',
    getEmptyCarePlan()
  );

  // UI State
  const [openSection, setOpenSection] = useState<SectionId>('personal');
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({});
  const [newContact, setNewContact] = useState<Partial<Contact>>({});
  const [newTeamMember, setNewTeamMember] = useState<Partial<TeamMember>>({});
  const [showMedForm, setShowMedForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);

  // Calculate age from DOB
  const calculateAge = (dob: string) => {
    if (!dob) return { years: 0, months: 0 };
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    if (today.getDate() < birthDate.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }
    return { years: Math.max(0, years), months: Math.max(0, months) };
  };

  // Update care plan
  const updateCarePlan = (updates: Partial<CarePlanType>) => {
    setCarePlan((prev) => ({
      ...prev,
      ...updates,
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Handle DOB change - auto-calculate age
  const handleDobChange = (dob: string) => {
    const age = calculateAge(dob);
    updateCarePlan({ dateOfBirth: dob, age });
  };

  // Add daily medication
  const addDailyMedication = () => {
    if (!newMedication.name || !newMedication.dose) return;
    const med: Medication = {
      id: generateId(),
      name: newMedication.name,
      dose: newMedication.dose,
      frequency: newMedication.frequency || 'Once daily',
      timing: newMedication.timing,
      notes: newMedication.notes,
    };
    updateCarePlan({
      dailyMedications: [...carePlan.dailyMedications, med],
    });
    setNewMedication({});
    setShowMedForm(false);
  };

  // Remove daily medication
  const removeDailyMedication = (id: string) => {
    updateCarePlan({
      dailyMedications: carePlan.dailyMedications.filter((m) => m.id !== id),
    });
  };

  // Add emergency medication from calculator
  const addEmergencyMedication = (med: EmergencyMedication) => {
    updateCarePlan({
      emergencyMedications: [...carePlan.emergencyMedications, med],
    });
  };

  // Remove emergency medication
  const removeEmergencyMedication = (index: number) => {
    updateCarePlan({
      emergencyMedications: carePlan.emergencyMedications.filter((_, i) => i !== index),
    });
  };

  // Add contact
  const addContact = () => {
    if (!newContact.name || !newContact.phone) return;
    const contact: Contact = {
      id: generateId(),
      name: newContact.name,
      relationship: newContact.relationship || '',
      phone: newContact.phone,
      email: newContact.email,
      isPrimary: carePlan.emergencyContacts.length === 0,
    };
    updateCarePlan({
      emergencyContacts: [...carePlan.emergencyContacts, contact],
    });
    setNewContact({});
    setShowContactForm(false);
  };

  // Remove contact
  const removeContact = (id: string) => {
    updateCarePlan({
      emergencyContacts: carePlan.emergencyContacts.filter((c) => c.id !== id),
    });
  };

  // Add team member
  const addTeamMember = () => {
    if (!newTeamMember.name || !newTeamMember.role) return;
    const member: TeamMember = {
      id: generateId(),
      name: newTeamMember.name,
      role: newTeamMember.role,
      hospital: newTeamMember.hospital,
      department: newTeamMember.department,
      phone: newTeamMember.phone,
      email: newTeamMember.email,
      notes: newTeamMember.notes,
    };
    updateCarePlan({
      healthcareTeam: [...carePlan.healthcareTeam, member],
    });
    setNewTeamMember({});
    setShowTeamForm(false);
  };

  // Remove team member
  const removeTeamMember = (id: string) => {
    updateCarePlan({
      healthcareTeam: carePlan.healthcareTeam.filter((m) => m.id !== id),
    });
  };

  // Toggle section
  const toggleSection = (section: SectionId) => {
    setOpenSection(openSection === section ? section : section);
  };

  // Check section completion
  const isSectionComplete = (section: SectionId): boolean => {
    switch (section) {
      case 'personal':
        return !!(carePlan.childName && carePlan.dateOfBirth && carePlan.weight > 0);
      case 'medications':
        return carePlan.dailyMedications.length > 0 || carePlan.emergencyMedications.length > 0;
      case 'emergency':
        return carePlan.emergencyMedications.length > 0;
      case 'contacts':
        return carePlan.emergencyContacts.length > 0;
      case 'team':
        return carePlan.healthcareTeam.length > 0;
      default:
        return false;
    }
  };

  // Export to PDF
  const exportToPdf = () => {
    // Create printable content
    const printContent = document.createElement('div');
    printContent.innerHTML = generatePrintableHtml();

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Care Plan - ${carePlan.childName || 'EpilepsyHelper'}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
              h1 { color: #7c3aed; border-bottom: 2px solid #7c3aed; padding-bottom: 10px; }
              h2 { color: #44403c; margin-top: 24px; }
              h3 { color: #57534e; margin-top: 16px; }
              .section { margin-bottom: 24px; padding: 16px; border: 1px solid #e7e5e4; border-radius: 8px; }
              .emergency { background-color: #fef2f2; border-color: #fecaca; }
              .emergency h2 { color: #dc2626; }
              table { width: 100%; border-collapse: collapse; margin: 12px 0; }
              th, td { padding: 8px; text-align: left; border-bottom: 1px solid #e7e5e4; }
              th { background-color: #f5f5f4; }
              .disclaimer { margin-top: 32px; padding: 16px; background-color: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; font-size: 12px; }
              .footer { margin-top: 24px; font-size: 11px; color: #78716c; text-align: center; }
              @media print { body { padding: 0; } }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Generate printable HTML content
  const generatePrintableHtml = () => {
    const formatDate = (dateStr: string) => {
      if (!dateStr) return 'Not specified';
      return new Date(dateStr).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    };

    return `
      <h1>Emergency Care Plan</h1>
      <p>Generated: ${formatDate(new Date().toISOString())} | Version: ${carePlan.version}</p>

      <div class="section">
        <h2>Personal Information</h2>
        <table>
          <tr><th>Name</th><td>${carePlan.childName || 'Not specified'}</td></tr>
          <tr><th>Date of Birth</th><td>${formatDate(carePlan.dateOfBirth)}</td></tr>
          <tr><th>Age</th><td>${carePlan.age.years} years, ${carePlan.age.months} months</td></tr>
          <tr><th>Weight</th><td>${carePlan.weight ? `${carePlan.weight} kg` : 'Not specified'}</td></tr>
          ${carePlan.nhsNumber ? `<tr><th>NHS Number</th><td>${carePlan.nhsNumber}</td></tr>` : ''}
        </table>
      </div>

      <div class="section emergency">
        <h2>EMERGENCY PROTOCOL</h2>

        <h3>Emergency Medications</h3>
        ${
          carePlan.emergencyMedications.length > 0
            ? `<table>
            <tr><th>Medication</th><th>Dose</th><th>Route</th><th>Instructions</th></tr>
            ${carePlan.emergencyMedications
              .map(
                (med) =>
                  `<tr><td>${med.name}</td><td>${med.dose}</td><td>${med.route}</td><td>${med.instructions}</td></tr>`
              )
              .join('')}
          </table>`
            : '<p>No emergency medications specified</p>'
        }

        <h3>When to Give Emergency Medication</h3>
        <ul>
          ${carePlan.emergencyProtocol.whenToGiveMeds.map((item) => `<li>${item}</li>`).join('')}
        </ul>

        <h3>When to Call 999</h3>
        <ul>
          ${carePlan.emergencyProtocol.whenToCall999.map((item) => `<li>${item}</li>`).join('')}
        </ul>

        ${
          carePlan.emergencyProtocol.specialInstructions
            ? `<h3>Special Instructions</h3><p>${carePlan.emergencyProtocol.specialInstructions}</p>`
            : ''
        }
      </div>

      <div class="section">
        <h2>Daily Medications</h2>
        ${
          carePlan.dailyMedications.length > 0
            ? `<table>
            <tr><th>Medication</th><th>Dose</th><th>Frequency</th><th>Timing</th></tr>
            ${carePlan.dailyMedications
              .map(
                (med) =>
                  `<tr><td>${med.name}</td><td>${med.dose}</td><td>${med.frequency}</td><td>${med.timing || '-'}</td></tr>`
              )
              .join('')}
          </table>`
            : '<p>No daily medications specified</p>'
        }
      </div>

      <div class="section">
        <h2>Emergency Contacts</h2>
        ${
          carePlan.emergencyContacts.length > 0
            ? `<table>
            <tr><th>Name</th><th>Relationship</th><th>Phone</th><th>Email</th></tr>
            ${carePlan.emergencyContacts
              .map(
                (c) =>
                  `<tr><td>${c.name}${c.isPrimary ? ' (Primary)' : ''}</td><td>${c.relationship}</td><td>${c.phone}</td><td>${c.email || '-'}</td></tr>`
              )
              .join('')}
          </table>`
            : '<p>No emergency contacts specified</p>'
        }
      </div>

      <div class="section">
        <h2>Healthcare Team</h2>
        ${
          carePlan.healthcareTeam.length > 0
            ? `<table>
            <tr><th>Name</th><th>Role</th><th>Hospital/Dept</th><th>Contact</th></tr>
            ${carePlan.healthcareTeam
              .map(
                (m) =>
                  `<tr><td>${m.name}</td><td>${m.role}</td><td>${[m.hospital, m.department].filter(Boolean).join(' - ') || '-'}</td><td>${m.phone || m.email || '-'}</td></tr>`
              )
              .join('')}
          </table>`
            : '<p>No healthcare team specified</p>'
        }
      </div>

      <div class="disclaimer">
        <strong>MEDICAL DISCLAIMER</strong><br>
        This care plan is a template to support care and does not constitute medical advice. All medication doses should be confirmed with your prescribing clinician. Emergency medication should only be administered by trained individuals following proper protocols. In any emergency, call 999 if in doubt. This plan should be reviewed regularly with your healthcare team. Last updated: ${formatDate(carePlan.lastUpdated)}.
      </div>

      <div class="footer">
        Generated by EpilepsyHelper | epilepsyhelper.app | Part of the SUVIMA ecosystem
      </div>
    `;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Care Plan</h1>
              <p className="text-sm text-warm-500">Emergency protocols and care information</p>
            </div>
          </div>
          {carePlan.childName && (
            <button onClick={exportToPdf} className="btn-primary inline-flex items-center gap-2">
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          )}
        </div>
      </header>

      {/* Medical Disclaimer Banner */}
      <div className="card bg-amber-50 border-amber-200 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800 mb-1">Important Medical Disclaimer</h3>
            <p className="text-sm text-amber-700">
              This care plan is a template to support care and does not constitute medical advice. All medication doses should be confirmed with your prescribing clinician. Always follow guidance from your healthcare team.
            </p>
          </div>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-4">
        {/* Personal Information */}
        <AccordionSection
          id="personal"
          title="Personal Information"
          icon={<User className="w-5 h-5 text-white" />}
          isOpen={openSection === 'personal'}
          isComplete={isSectionComplete('personal')}
          onToggle={() => toggleSection('personal')}
          accentColor="primary"
        >
          <div className="pt-4 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">
                  Child's Name <span className="text-emergency-500">*</span>
                </label>
                <input
                  type="text"
                  value={carePlan.childName}
                  onChange={(e) => updateCarePlan({ childName: e.target.value })}
                  placeholder="Full name"
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">
                  Date of Birth <span className="text-emergency-500">*</span>
                </label>
                <input
                  type="date"
                  value={carePlan.dateOfBirth}
                  onChange={(e) => handleDobChange(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Age (calculated)</label>
                <input
                  type="text"
                  value={
                    carePlan.dateOfBirth
                      ? `${carePlan.age.years} years, ${carePlan.age.months} months`
                      : ''
                  }
                  readOnly
                  className="form-input bg-warm-100"
                />
              </div>
              <div>
                <label className="form-label">
                  Weight (kg) <span className="text-emergency-500">*</span>
                </label>
                <input
                  type="number"
                  value={carePlan.weight || ''}
                  onChange={(e) => updateCarePlan({ weight: parseFloat(e.target.value) || 0 })}
                  min="0"
                  step="0.1"
                  placeholder="Weight in kg"
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">NHS Number</label>
                <input
                  type="text"
                  value={carePlan.nhsNumber || ''}
                  onChange={(e) => updateCarePlan({ nhsNumber: e.target.value })}
                  placeholder="Optional"
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Diagnosis Date</label>
                <input
                  type="date"
                  value={carePlan.diagnosisDate || ''}
                  onChange={(e) => updateCarePlan({ diagnosisDate: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Seizure Frequency</label>
                <input
                  type="text"
                  value={carePlan.frequency}
                  onChange={(e) => updateCarePlan({ frequency: e.target.value })}
                  placeholder="e.g., 2-3 per month"
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </AccordionSection>

        {/* Medications */}
        <AccordionSection
          id="medications"
          title="Daily Medications"
          icon={<Pill className="w-5 h-5 text-white" />}
          isOpen={openSection === 'medications'}
          isComplete={isSectionComplete('medications')}
          onToggle={() => toggleSection('medications')}
          accentColor="accent"
        >
          <div className="pt-4 space-y-4">
            {/* Existing medications */}
            {carePlan.dailyMedications.length > 0 && (
              <div className="space-y-2">
                {carePlan.dailyMedications.map((med) => (
                  <div
                    key={med.id}
                    className="flex items-center justify-between p-3 bg-warm-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium text-warm-900">{med.name}</span>
                      <span className="text-warm-600 ml-2">
                        {med.dose} - {med.frequency}
                      </span>
                      {med.timing && (
                        <span className="text-warm-500 ml-2 text-sm">({med.timing})</span>
                      )}
                    </div>
                    <button
                      onClick={() => removeDailyMedication(med.id)}
                      className="p-1.5 rounded-lg hover:bg-warm-200 text-warm-500 hover:text-emergency-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add medication form */}
            {showMedForm ? (
              <div className="p-4 bg-warm-50 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-warm-900">Add Medication</h4>
                  <button
                    onClick={() => setShowMedForm(false)}
                    className="p-1 rounded hover:bg-warm-200"
                  >
                    <X className="w-5 h-5 text-warm-500" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Medication Name</label>
                    <input
                      type="text"
                      value={newMedication.name || ''}
                      onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                      placeholder="e.g., Sodium Valproate"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Dose</label>
                    <input
                      type="text"
                      value={newMedication.dose || ''}
                      onChange={(e) => setNewMedication({ ...newMedication, dose: e.target.value })}
                      placeholder="e.g., 200mg"
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Frequency</label>
                    <select
                      value={newMedication.frequency || ''}
                      onChange={(e) =>
                        setNewMedication({ ...newMedication, frequency: e.target.value })
                      }
                      className="form-input"
                    >
                      <option value="">Select frequency</option>
                      <option value="Once daily">Once daily</option>
                      <option value="Twice daily">Twice daily</option>
                      <option value="Three times daily">Three times daily</option>
                      <option value="Four times daily">Four times daily</option>
                      <option value="As needed">As needed</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Timing</label>
                    <input
                      type="text"
                      value={newMedication.timing || ''}
                      onChange={(e) =>
                        setNewMedication({ ...newMedication, timing: e.target.value })
                      }
                      placeholder="e.g., Morning and evening"
                      className="form-input"
                    />
                  </div>
                </div>
                <button onClick={addDailyMedication} className="btn-primary">
                  Add Medication
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowMedForm(true)}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Daily Medication
              </button>
            )}
          </div>
        </AccordionSection>

        {/* Emergency Protocol */}
        <AccordionSection
          id="emergency"
          title="Emergency Protocol"
          icon={<AlertTriangle className="w-5 h-5 text-white" />}
          isOpen={openSection === 'emergency'}
          isComplete={isSectionComplete('emergency')}
          onToggle={() => toggleSection('emergency')}
          accentColor="emergency"
        >
          <div className="pt-4 space-y-6">
            {/* Dosing Calculator */}
            <DosingCalculator
              weight={carePlan.weight}
              age={carePlan.age}
              onAddMedication={addEmergencyMedication}
            />

            {/* Emergency Medications List */}
            {carePlan.emergencyMedications.length > 0 && (
              <div>
                <h4 className="font-semibold text-warm-900 mb-3">Emergency Medications</h4>
                <div className="space-y-2">
                  {carePlan.emergencyMedications.map((med, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-emergency-50 rounded-lg border border-emergency-200"
                    >
                      <div>
                        <span className="font-medium text-warm-900">{med.name}</span>
                        <p className="text-sm text-warm-600">
                          {med.dose} via {med.route} route
                        </p>
                        <p className="text-xs text-warm-500">{med.instructions}</p>
                      </div>
                      <button
                        onClick={() => removeEmergencyMedication(index)}
                        className="p-1.5 rounded-lg hover:bg-emergency-100 text-warm-500 hover:text-emergency-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* When to Give Meds */}
            <div>
              <h4 className="font-semibold text-warm-900 mb-3">When to Give Emergency Medication</h4>
              <ul className="space-y-2">
                {carePlan.emergencyProtocol.whenToGiveMeds.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-warm-700">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* When to Call 999 */}
            <div>
              <h4 className="font-semibold text-emergency-600 mb-3">When to Call 999</h4>
              <ul className="space-y-2">
                {carePlan.emergencyProtocol.whenToCall999.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-warm-700">
                    <AlertCircle className="w-5 h-5 text-emergency-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="form-label">Special Instructions</label>
              <textarea
                value={carePlan.emergencyProtocol.specialInstructions || ''}
                onChange={(e) =>
                  updateCarePlan({
                    emergencyProtocol: {
                      ...carePlan.emergencyProtocol,
                      specialInstructions: e.target.value,
                    },
                  })
                }
                rows={3}
                placeholder="Any additional instructions specific to this child..."
                className="form-input resize-none"
              />
            </div>
          </div>
        </AccordionSection>

        {/* Emergency Contacts */}
        <AccordionSection
          id="contacts"
          title="Emergency Contacts"
          icon={<Phone className="w-5 h-5 text-white" />}
          isOpen={openSection === 'contacts'}
          isComplete={isSectionComplete('contacts')}
          onToggle={() => toggleSection('contacts')}
          accentColor="purple"
        >
          <div className="pt-4 space-y-4">
            {/* Existing contacts */}
            {carePlan.emergencyContacts.length > 0 && (
              <div className="space-y-2">
                {carePlan.emergencyContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-3 bg-warm-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium text-warm-900">{contact.name}</span>
                      {contact.isPrimary && (
                        <span className="ml-2 px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                          Primary
                        </span>
                      )}
                      <p className="text-sm text-warm-600">
                        {contact.relationship} • {contact.phone}
                      </p>
                    </div>
                    <button
                      onClick={() => removeContact(contact.id)}
                      className="p-1.5 rounded-lg hover:bg-warm-200 text-warm-500 hover:text-emergency-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add contact form */}
            {showContactForm ? (
              <div className="p-4 bg-warm-50 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-warm-900">Add Contact</h4>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="p-1 rounded hover:bg-warm-200"
                  >
                    <X className="w-5 h-5 text-warm-500" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      value={newContact.name || ''}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      placeholder="Contact name"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Relationship</label>
                    <input
                      type="text"
                      value={newContact.relationship || ''}
                      onChange={(e) =>
                        setNewContact({ ...newContact, relationship: e.target.value })
                      }
                      placeholder="e.g., Mother, Father, Grandparent"
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      value={newContact.phone || ''}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      placeholder="Phone number"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Email (optional)</label>
                    <input
                      type="email"
                      value={newContact.email || ''}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      placeholder="Email address"
                      className="form-input"
                    />
                  </div>
                </div>
                <button onClick={addContact} className="btn-primary">
                  Add Contact
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowContactForm(true)}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Emergency Contact
              </button>
            )}
          </div>
        </AccordionSection>

        {/* Healthcare Team */}
        <AccordionSection
          id="team"
          title="Healthcare Team"
          icon={<Users className="w-5 h-5 text-white" />}
          isOpen={openSection === 'team'}
          isComplete={isSectionComplete('team')}
          onToggle={() => toggleSection('team')}
          accentColor="accent"
        >
          <div className="pt-4 space-y-4">
            {/* Existing team members */}
            {carePlan.healthcareTeam.length > 0 && (
              <div className="space-y-2">
                {carePlan.healthcareTeam.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 bg-warm-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium text-warm-900">{member.name}</span>
                      <span className="text-warm-600 ml-2">({member.role})</span>
                      {member.hospital && (
                        <p className="text-sm text-warm-500">
                          {member.hospital}
                          {member.department && ` - ${member.department}`}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeTeamMember(member.id)}
                      className="p-1.5 rounded-lg hover:bg-warm-200 text-warm-500 hover:text-emergency-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add team member form */}
            {showTeamForm ? (
              <div className="p-4 bg-warm-50 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-warm-900">Add Team Member</h4>
                  <button
                    onClick={() => setShowTeamForm(false)}
                    className="p-1 rounded hover:bg-warm-200"
                  >
                    <X className="w-5 h-5 text-warm-500" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      value={newTeamMember.name || ''}
                      onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                      placeholder="e.g., Dr. Smith"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Role</label>
                    <select
                      value={newTeamMember.role || ''}
                      onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })}
                      className="form-input"
                    >
                      <option value="">Select role</option>
                      <option value="Paediatric Neurologist">Paediatric Neurologist</option>
                      <option value="Epilepsy Nurse Specialist">Epilepsy Nurse Specialist</option>
                      <option value="Paediatrician">Paediatrician</option>
                      <option value="GP">GP</option>
                      <option value="Pharmacist">Pharmacist</option>
                      <option value="Psychologist">Psychologist</option>
                      <option value="School Nurse">School Nurse</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Hospital</label>
                    <input
                      type="text"
                      value={newTeamMember.hospital || ''}
                      onChange={(e) =>
                        setNewTeamMember({ ...newTeamMember, hospital: e.target.value })
                      }
                      placeholder="Hospital name"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      value={newTeamMember.department || ''}
                      onChange={(e) =>
                        setNewTeamMember({ ...newTeamMember, department: e.target.value })
                      }
                      placeholder="e.g., Paediatric Neurology"
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      value={newTeamMember.phone || ''}
                      onChange={(e) =>
                        setNewTeamMember({ ...newTeamMember, phone: e.target.value })
                      }
                      placeholder="Contact number"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      value={newTeamMember.email || ''}
                      onChange={(e) =>
                        setNewTeamMember({ ...newTeamMember, email: e.target.value })
                      }
                      placeholder="Email address"
                      className="form-input"
                    />
                  </div>
                </div>
                <button onClick={addTeamMember} className="btn-primary">
                  Add Team Member
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowTeamForm(true)}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Team Member
              </button>
            )}
          </div>
        </AccordionSection>
      </div>

      {/* Last Updated Footer */}
      {carePlan.childName && (
        <div className="text-center text-sm text-warm-500">
          Last updated:{' '}
          {new Date(carePlan.lastUpdated).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      )}

      {/* Tips Card */}
      <div className="card bg-primary-50 border-primary-200 p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">💡</span>
          </div>
          <div>
            <h3 className="font-semibold text-warm-900 mb-1">Care Plan Tips</h3>
            <ul className="text-sm text-warm-700 space-y-1">
              <li>• Keep a printed copy of your care plan in your child's school bag</li>
              <li>• Review and update regularly, especially after clinic appointments</li>
              <li>• Share with all carers, including schools, clubs, and family members</li>
              <li>• Check weight regularly as emergency medication doses may need updating</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarePlan;
