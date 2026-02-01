import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../hooks';
import {
  Users,
  Plus,
  X,
  Trash2,
  Phone,
  Mail,
  Building,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Stethoscope,
  Edit3,
} from 'lucide-react';
import { CarePlan, TeamMember, Contact } from '../types/carePlan';

// Generate unique ID
const generateId = () => `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Default empty care plan
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

// Healthcare roles with icons
const HEALTHCARE_ROLES = [
  'Paediatric Neurologist',
  'Epilepsy Nurse Specialist',
  'Paediatrician',
  'GP',
  'Pharmacist',
  'Psychologist',
  'School Nurse',
  'Dietitian',
  'Physiotherapist',
  'Speech Therapist',
  'Other',
];

const CareTeam = () => {
  // Share data with Care Plan
  const [carePlan, setCarePlan] = useLocalStorage<CarePlan>('epilepsy-care-plan', getEmptyCarePlan());

  // UI State
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState<Partial<TeamMember>>({});
  const [newContact, setNewContact] = useState<Partial<Contact>>({});
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [expandedContact, setExpandedContact] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<string | null>(null);

  // Update care plan
  const updateCarePlan = (updates: Partial<CarePlan>) => {
    setCarePlan((prev) => ({
      ...prev,
      ...updates,
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Add team member
  const addTeamMember = () => {
    if (!newTeamMember.name || !newTeamMember.role) return;

    if (editingMember) {
      // Update existing
      updateCarePlan({
        healthcareTeam: carePlan.healthcareTeam.map((m) =>
          m.id === editingMember
            ? { ...m, ...newTeamMember }
            : m
        ),
      });
      setEditingMember(null);
    } else {
      // Add new
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
    }
    setNewTeamMember({});
    setShowTeamForm(false);
  };

  // Edit team member
  const editTeamMember = (member: TeamMember) => {
    setNewTeamMember(member);
    setEditingMember(member.id);
    setShowTeamForm(true);
  };

  // Remove team member
  const removeTeamMember = (id: string) => {
    updateCarePlan({
      healthcareTeam: carePlan.healthcareTeam.filter((m) => m.id !== id),
    });
  };

  // Add contact
  const addContact = () => {
    if (!newContact.name || !newContact.phone) return;

    if (editingContact) {
      // Update existing
      updateCarePlan({
        emergencyContacts: carePlan.emergencyContacts.map((c) =>
          c.id === editingContact
            ? { ...c, ...newContact }
            : c
        ),
      });
      setEditingContact(null);
    } else {
      // Add new
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
    }
    setNewContact({});
    setShowContactForm(false);
  };

  // Edit contact
  const editContact = (contact: Contact) => {
    setNewContact(contact);
    setEditingContact(contact.id);
    setShowContactForm(true);
  };

  // Remove contact
  const removeContact = (id: string) => {
    updateCarePlan({
      emergencyContacts: carePlan.emergencyContacts.filter((c) => c.id !== id),
    });
  };

  // Set primary contact
  const setPrimaryContact = (id: string) => {
    updateCarePlan({
      emergencyContacts: carePlan.emergencyContacts.map((c) => ({
        ...c,
        isPrimary: c.id === id,
      })),
    });
  };

  // Cancel form
  const cancelTeamForm = () => {
    setShowTeamForm(false);
    setNewTeamMember({});
    setEditingMember(null);
  };

  const cancelContactForm = () => {
    setShowContactForm(false);
    setNewContact({});
    setEditingContact(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Care Team</h1>
            <p className="text-sm text-warm-500">Healthcare professionals & emergency contacts</p>
          </div>
        </div>
      </header>

      {/* Healthcare Team Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-warm-900 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-accent-500" />
            Healthcare Team
          </h2>
          {!showTeamForm && (
            <button
              onClick={() => setShowTeamForm(true)}
              className="btn-secondary inline-flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>

        {/* Add/Edit Team Member Form */}
        {showTeamForm && (
          <div className="card p-4 space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-warm-900">
                {editingMember ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              <button onClick={cancelTeamForm} className="p-1 rounded hover:bg-warm-100">
                <X className="w-5 h-5 text-warm-500" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Name <span className="text-emergency-500">*</span></label>
                <input
                  type="text"
                  value={newTeamMember.name || ''}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                  placeholder="e.g., Dr. Smith"
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Role <span className="text-emergency-500">*</span></label>
                <select
                  value={newTeamMember.role || ''}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })}
                  className="form-input"
                >
                  <option value="">Select role</option>
                  {HEALTHCARE_ROLES.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Hospital / Organisation</label>
                <input
                  type="text"
                  value={newTeamMember.hospital || ''}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, hospital: e.target.value })}
                  placeholder="Hospital name"
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Department</label>
                <input
                  type="text"
                  value={newTeamMember.department || ''}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, department: e.target.value })}
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
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, phone: e.target.value })}
                  placeholder="Contact number"
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={newTeamMember.email || ''}
                  onChange={(e) => setNewTeamMember({ ...newTeamMember, email: e.target.value })}
                  placeholder="Email address"
                  className="form-input"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Notes</label>
              <textarea
                value={newTeamMember.notes || ''}
                onChange={(e) => setNewTeamMember({ ...newTeamMember, notes: e.target.value })}
                placeholder="Any additional notes..."
                rows={2}
                className="form-input resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={addTeamMember} className="btn-primary">
                {editingMember ? 'Update' : 'Add'} Team Member
              </button>
              <button onClick={cancelTeamForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Team Members List */}
        {carePlan.healthcareTeam.length === 0 ? (
          <div className="card p-8 text-center">
            <Stethoscope className="w-12 h-12 mx-auto text-warm-300 mb-3" />
            <p className="text-warm-600 mb-4">No healthcare team members added yet</p>
            {!showTeamForm && (
              <button
                onClick={() => setShowTeamForm(true)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Team Member
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {carePlan.healthcareTeam.map((member) => (
              <div key={member.id} className="card overflow-hidden">
                <div
                  className="p-4 cursor-pointer hover:bg-warm-50 transition-colors"
                  onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-accent-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-warm-900">{member.name}</p>
                        <p className="text-sm text-warm-600">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      )}
                      {expandedMember === member.id ? (
                        <ChevronUp className="w-5 h-5 text-warm-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-warm-400" />
                      )}
                    </div>
                  </div>
                </div>
                {expandedMember === member.id && (
                  <div className="px-4 pb-4 border-t border-warm-100 animate-fade-in">
                    <div className="pt-3 space-y-2">
                      {member.hospital && (
                        <div className="flex items-center gap-2 text-sm text-warm-600">
                          <Building className="w-4 h-4" />
                          {member.hospital}
                          {member.department && ` - ${member.department}`}
                        </div>
                      )}
                      {member.phone && (
                        <div className="flex items-center gap-2 text-sm text-warm-600">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${member.phone}`} className="text-primary-600 hover:underline">
                            {member.phone}
                          </a>
                        </div>
                      )}
                      {member.email && (
                        <div className="flex items-center gap-2 text-sm text-warm-600">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${member.email}`} className="text-primary-600 hover:underline">
                            {member.email}
                          </a>
                        </div>
                      )}
                      {member.notes && (
                        <p className="text-sm text-warm-600 bg-warm-50 p-2 rounded-lg mt-2">
                          {member.notes}
                        </p>
                      )}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => editTeamMember(member)}
                          className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => removeTeamMember(member.id)}
                          className="text-sm text-emergency-600 hover:text-emergency-700 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Emergency Contacts Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-warm-900 flex items-center gap-2">
            <Phone className="w-5 h-5 text-emergency-500" />
            Emergency Contacts
          </h2>
          {!showContactForm && (
            <button
              onClick={() => setShowContactForm(true)}
              className="btn-secondary inline-flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>

        {/* Add/Edit Contact Form */}
        {showContactForm && (
          <div className="card p-4 space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-warm-900">
                {editingContact ? 'Edit Contact' : 'Add Emergency Contact'}
              </h3>
              <button onClick={cancelContactForm} className="p-1 rounded hover:bg-warm-100">
                <X className="w-5 h-5 text-warm-500" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Name <span className="text-emergency-500">*</span></label>
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
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  placeholder="e.g., Mother, Father, Grandparent"
                  className="form-input"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Phone <span className="text-emergency-500">*</span></label>
                <input
                  type="tel"
                  value={newContact.phone || ''}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="Phone number"
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={newContact.email || ''}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  placeholder="Email address (optional)"
                  className="form-input"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={addContact} className="btn-primary">
                {editingContact ? 'Update' : 'Add'} Contact
              </button>
              <button onClick={cancelContactForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Contacts List */}
        {carePlan.emergencyContacts.length === 0 ? (
          <div className="card p-8 text-center">
            <UserPlus className="w-12 h-12 mx-auto text-warm-300 mb-3" />
            <p className="text-warm-600 mb-4">No emergency contacts added yet</p>
            {!showContactForm && (
              <button
                onClick={() => setShowContactForm(true)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Emergency Contact
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {carePlan.emergencyContacts.map((contact) => (
              <div key={contact.id} className="card overflow-hidden">
                <div
                  className="p-4 cursor-pointer hover:bg-warm-50 transition-colors"
                  onClick={() => setExpandedContact(expandedContact === contact.id ? null : contact.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        contact.isPrimary ? 'bg-primary-100' : 'bg-warm-100'
                      }`}>
                        <Phone className={`w-5 h-5 ${
                          contact.isPrimary ? 'text-primary-600' : 'text-warm-500'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-warm-900">{contact.name}</p>
                          {contact.isPrimary && (
                            <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                              Primary
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-warm-600">{contact.relationship}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${contact.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3 py-1.5 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
                      >
                        Call
                      </a>
                      {expandedContact === contact.id ? (
                        <ChevronUp className="w-5 h-5 text-warm-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-warm-400" />
                      )}
                    </div>
                  </div>
                </div>
                {expandedContact === contact.id && (
                  <div className="px-4 pb-4 border-t border-warm-100 animate-fade-in">
                    <div className="pt-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-warm-600">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${contact.phone}`} className="text-primary-600 hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                      {contact.email && (
                        <div className="flex items-center gap-2 text-sm text-warm-600">
                          <Mail className="w-4 h-4" />
                          <a href={`mailto:${contact.email}`} className="text-primary-600 hover:underline">
                            {contact.email}
                          </a>
                        </div>
                      )}
                      <div className="flex gap-2 pt-2 flex-wrap">
                        {!contact.isPrimary && (
                          <button
                            onClick={() => setPrimaryContact(contact.id)}
                            className="text-sm text-accent-600 hover:text-accent-700 flex items-center gap-1"
                          >
                            Set as Primary
                          </button>
                        )}
                        <button
                          onClick={() => editContact(contact)}
                          className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => removeContact(contact.id)}
                          className="text-sm text-emergency-600 hover:text-emergency-700 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Tips Card */}
      <div className="card bg-primary-50 border-primary-200 p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">💡</span>
          </div>
          <div>
            <h3 className="font-semibold text-warm-900 mb-1">Tips</h3>
            <ul className="text-sm text-warm-700 space-y-1">
              <li>• Keep contact details up to date, especially after clinic appointments</li>
              <li>• Add your Epilepsy Nurse Specialist - they're often your first point of contact</li>
              <li>• Include school nurse or childcare contacts if relevant</li>
              <li>• Your primary emergency contact will appear first in emergencies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareTeam;
