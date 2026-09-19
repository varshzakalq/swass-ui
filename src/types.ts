export type LanguageCode = 'hi' | 'en' | 'ta' | 'te' | 'bn' | 'mr';

export interface PatientProfile {
  name: string;
  age: number;
  gender: string;
  abhaId: string;
  abhaAddress: string;
  mobile: string;
  photoUrl?: string;
  status: 'active' | 'pending';
  district: string;
  state: string;
}

export interface HealthRecord {
  id: string;
  title: string;
  titleKey: string;
  type: 'lab' | 'prescription' | 'scan' | 'ayush';
  icon: string;
  date: string;
  facility: string;
  doctor: string;
  status: 'normal' | 'high' | 'attention' | 'active';
  statusText: string;
  simpleExplanation: string;
  fhirType: 'Observation' | 'Condition' | 'DiagnosticReport' | 'MedicationStatement';
  loincCode?: string;
  value?: string;
  unit?: string;
  downloadUrl?: string;
  previewImage?: string;
}

export interface AyushRemedy {
  id: string;
  title: string;
  system: 'Ayurveda' | 'Yoga' | 'Unani' | 'Siddha' | 'Homeopathy';
  icon: string;
  herbName: string;
  benefits: string;
  howToUse: string;
  simpleDosage: string;
}

export interface DoctorConsentRequest {
  id: string;
  requesterName: string;
  hiuType: string;
  purpose: string;
  dateRange: string;
  recordsRequested: string;
  status: 'pending' | 'approved' | 'sent' | 'denied';
  requestDate: string;
}

export interface PatientSummary {
  id: string;
  name: string;
  abhaId: string;
  age: number;
  gender: string;
  flag: string;
  flagLevel: 'normal' | 'high' | 'critical';
  records: string[];
  lastVisit: string;
  observations: {
    name: string;
    code: string;
    value: string;
    interpretation: 'N' | 'H' | 'HH' | 'L';
    date: string;
  }[];
}
