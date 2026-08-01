import { useState, useEffect, useCallback } from 'react';

export interface Profile {
  fullName: string;
  firstName: string;
  dateOfBirth: string;
  gender: string;
  height: string;
  eyeColour: string;
  placeOfBirth: string;
  address: string;
  suburb: string;
  licenceNumber: string;
  licenceType: string;
  licenceClass: string;
  licenceStatus: string;
  proficiency: string;
  issueDate: string;
  p1EndDate: string;
  expiry: string;
  cardNumber: string;
  conditions: string;
  photoUrl: string;
  signatureUrl: string;
  refreshedAt: string;
  pin: string;
  demeritPoints: number;
  demeritThreshold: number;
}

const DEFAULT_PROFILE: Profile = {
  fullName: "JOHN A CITIZEN",
  firstName: "John",
  dateOfBirth: "06 Dec 1989",
  gender: "M",
  height: "180cm",
  eyeColour: "Brown",
  placeOfBirth: "VICTORIA",
  address: "ADDRESS LINE 1",
  suburb: "MELBOURNE, VIC 3000",
  licenceNumber: "123456783",
  licenceType: "Car",
  licenceClass: "C",
  licenceStatus: "Current",
  proficiency: "P1",
  issueDate: "3 Jan 2025",
  p1EndDate: "2 Jan 2026",
  expiry: "20 May 2025",
  cardNumber: "P1234567",
  conditions: "NONE",
  photoUrl: "",
  signatureUrl: "",
  refreshedAt: "25 May 2023 9:00am",
  pin: "000000",
  demeritPoints: 0,
  demeritThreshold: 5
};

const STORAGE_KEY = "myvicroads_profile_v3";

export function useProfile() {
  const [profile, setProfileState] = useState<Profile>(DEFAULT_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfileState(JSON.parse(stored));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
      }
    } catch (e) {
      console.error("Failed to load profile", e);
    }
    setIsLoaded(true);
  }, []);

  const setProfile = useCallback((newProfile: Partial<Profile>) => {
    setProfileState((current) => {
      const updated = { ...current, ...newProfile };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { profile, setProfile, isLoaded };
}
