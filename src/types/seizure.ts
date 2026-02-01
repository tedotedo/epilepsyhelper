export type SeizureType =
  | 'focal-aware'
  | 'focal-impaired'
  | 'absence'
  | 'myoclonic'
  | 'tonic-clonic'
  | 'atonic'
  | 'tonic'
  | 'clonic'
  | 'other';

export interface SeizureEntry {
  id: string;
  date: string; // ISO date
  time: string; // HH:MM
  duration: number; // minutes
  seizureType: SeizureType;
  description: string;
  triggers?: string[];
  location?: string;
  witnesses?: string[];
  emergencyMedGiven?: boolean;
  emergencyMedType?: string;
  emergencyMedDose?: string;
  recoveryTime?: number; // minutes
  ambulanceCalled?: boolean;
  hospitalVisit?: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeizureDiaryData {
  entries: SeizureEntry[];
}

export const SEIZURE_TYPE_LABELS: Record<SeizureType, string> = {
  'focal-aware': 'Focal Aware (Simple Partial)',
  'focal-impaired': 'Focal Impaired Awareness (Complex Partial)',
  'absence': 'Absence',
  'myoclonic': 'Myoclonic',
  'tonic-clonic': 'Tonic-Clonic (Grand Mal)',
  'atonic': 'Atonic (Drop Attack)',
  'tonic': 'Tonic',
  'clonic': 'Clonic',
  'other': 'Other',
};
