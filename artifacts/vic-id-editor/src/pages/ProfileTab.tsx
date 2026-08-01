import React from 'react';
import { useProfile } from '../hooks/useProfile';
import { Settings, ChevronRight, LogOut } from 'lucide-react';

export function ProfileTab({ onSignOut, onChangePin }: { onSignOut: () => void, onChangePin: () => void }) {
  const { profile } = useProfile();

  return (
    <div className="flex flex-col min-h-screen bg-background pb-[80px]">
      <div className="bg-primary text-white pt-12 pb-4 px-4 shadow-sm sticky top-0 z-10 flex justify-between items-center">
        <div className="w-6" /> {/* Spacer */}
        <h1 className="text-xl font-bold">Profile</h1>
        <button className="p-1 active:opacity-70">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-6">
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase mb-2 px-2">Personal Information</h2>
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="text-xs text-muted-foreground mb-1">Full Name</div>
              <div className="font-medium text-primary">{profile.fullName}</div>
            </div>
            <div className="p-4 border-b border-border">
              <div className="text-xs text-muted-foreground mb-1">Date of Birth</div>
              <div className="font-medium text-primary">{profile.dateOfBirth}</div>
            </div>
            <div className="p-4">
              <div className="text-xs text-muted-foreground mb-1">Residential Address</div>
              <div className="font-medium text-primary">{profile.address}, {profile.suburb}</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase mb-2 px-2">Account Settings</h2>
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <button 
              onClick={onChangePin}
              className="w-full flex items-center justify-between p-4 border-b border-border active:bg-gray-50 transition-colors text-primary font-medium"
            >
              Change PIN
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button 
              onClick={onSignOut}
              className="w-full flex items-center justify-between p-4 active:bg-gray-50 transition-colors text-destructive font-medium"
            >
              Sign out
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
