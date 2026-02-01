export interface Medication {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  timing?: string;
  notes?: string;
}

export interface EmergencyMedication {
  name: string;
  dose: string;
  route: 'buccal' | 'rectal' | 'nasal' | 'other';
  instructions: string;
  whenToGive: string[];
}

export interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  hospital?: string;
  department?: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export interface CarePlan {
  // Personal Information
  childName: string;
  dateOfBirth: string;
  age: { years: number; months: number };
  weight: number; // kg
  nhsNumber?: string;

  // Seizure Information
  diagnosisDate?: string;
  seizureTypes: string[];
  frequency: string;
  triggers: string[];
  auraSymptoms?: string[];

  // Medication
  dailyMedications: Medication[];
  emergencyMedications: EmergencyMedication[];

  // Emergency Protocol
  emergencyProtocol: {
    whenToGiveMeds: string[];
    whenToCall999: string[];
    specialInstructions?: string;
  };

  // Contacts
  emergencyContacts: Contact[];

  // Healthcare Team
  healthcareTeam: TeamMember[];

  // Metadata
  version: string;
  lastUpdated: string;
  createdAt: string;
}

export interface EmergencyProtocolCalculation {
  childAge: { years: number; months: number };
  weight: number;
  buccolamDose?: string;
  rectalDiazepamDose?: string;
  nasalMidazolamDose?: string;
}
