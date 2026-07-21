import { useLocalStorage } from './useLocalStorage';

export interface UserProfile {
  name: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  lastSignedIn?: string;
}

export interface MedicareMember {
  name: string;
  irn: string;
}

export interface MedicareCardData {
  number: string;
  expiry: string;
  members: MedicareMember[];
}

export interface HealthcareMember {
  name: string;
}

export interface HealthcareCardData {
  crn: string;
  validFrom: string;
  validTo: string;
  paymentType: string;
  members: HealthcareMember[];
}

const defaultProfile: UserProfile = {
  name: "James Andrew",
  dob: "15 March 1988",
  email: "james.andrew@email.com",
  phone: "0412 345 678",
  address: "42 Smith Street, Melbourne VIC 3000",
  lastSignedIn: "21 Jul 2026 at 4:50 am"
};

const defaultMedicare: MedicareCardData = {
  number: "2428 77142 1",
  expiry: "06/2026",
  members: [
    { name: "JAMES ANDREW", irn: "1" },
    { name: "JAMIE ANDREW", irn: "2" }
  ]
};

const defaultHealthcare: HealthcareCardData = {
  crn: "234 567 890 1A",
  validFrom: "01 Jan 2025",
  validTo: "31 Dec 2025",
  paymentType: "JSP",
  members: [
    { name: "JAMES ANDREW" },
    { name: "JAMIE ANDREW" }
  ]
};

export function useMedicareData() {
  const [profile, setProfile] = useLocalStorage<UserProfile>('mygov_profile', defaultProfile);
  const [medicareCard, setMedicareCard] = useLocalStorage<MedicareCardData>('mygov_medicare', defaultMedicare);
  const [healthcareCard, setHealthcareCard] = useLocalStorage<HealthcareCardData>('mygov_healthcare', defaultHealthcare);

  return {
    profile, setProfile,
    medicareCard, setMedicareCard,
    healthcareCard, setHealthcareCard
  };
}
