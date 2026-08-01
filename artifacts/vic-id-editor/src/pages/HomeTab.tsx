import React, { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { ChevronRight, Edit2 } from 'lucide-react';

interface HomeTabProps {
  onNavigate: (tab: string) => void;
}

export function HomeTab({ onNavigate }: HomeTabProps) {
  const { profile, setProfile } = useProfile();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(profile.firstName);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleSaveName = () => {
    if (editName.trim()) {
      setProfile({
        firstName: editName.trim(),
        fullName: `${editName.trim().toUpperCase()} A CITIZEN`
      });
    }
    setIsEditingName(false);
  };

  const demeritPercentage = (profile.demeritPoints / profile.demeritThreshold) * 100;
  const demeritColor = demeritPercentage >= 100 
    ? 'bg-destructive' 
    : demeritPercentage >= 50 
      ? 'bg-amber-500' 
      : 'bg-success';

  return (
    <div className="flex flex-col min-h-screen pb-[80px] bg-background">
      {/* Header Band */}
      <div className="bg-primary h-[160px] relative px-4 pt-6">
        <div className="absolute top-6 right-4 w-9 h-9">
          {/* Spinner Ring */}
          <div className="w-full h-full rounded-full bg-[conic-gradient(#34A853_0%,_transparent_100%)] animate-[spin_2s_linear_infinite] flex items-center justify-center">
            <div className="w-7 h-7 bg-white rounded-full" />
          </div>
        </div>
      </div>

      <div className="px-4 -mt-16 relative z-10 flex flex-col gap-4">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full shrink-0 bg-primary text-white flex items-center justify-center font-bold text-xl overflow-hidden shadow-inner">
            {profile.photoUrl ? (
              <img src={profile.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              getInitials(profile.fullName)
            )}
          </div>
          <div className="flex-1 min-w-0">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="border-b border-primary w-full outline-none font-bold uppercase text-primary text-lg pb-1"
                  autoFocus
                  onBlur={handleSaveName}
                  onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                />
              </div>
            ) : (
              <div className="font-bold text-primary text-lg truncate uppercase">
                {profile.fullName}
              </div>
            )}
            <div className="text-xs text-muted-foreground mt-1">
              Refreshed: {profile.refreshedAt}
            </div>
          </div>
          <button 
            onClick={() => setIsEditingName(true)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>

        {/* My Licence Button */}
        <button 
          onClick={() => onNavigate('licence')}
          className="w-full bg-primary text-white font-semibold rounded-xl py-4 shadow-sm active:opacity-90 transition-opacity"
        >
          My licence
        </button>

        {/* Demerit Points */}
        <button 
          onClick={() => onNavigate('licence')}
          className="bg-white rounded-xl shadow-sm border border-border p-4 w-full text-left active:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-primary">Demerit points</span>
            <span className="font-bold text-primary">
              {profile.demeritPoints} of {profile.demeritThreshold}
            </span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${demeritColor} transition-all duration-500`} 
              style={{ width: `${Math.min(demeritPercentage, 100)}%` }}
            />
          </div>
        </button>

        {/* Vehicles Row */}
        <button 
          onClick={() => onNavigate('vehicles')}
          className="bg-white rounded-xl shadow-sm border border-border p-4 w-full flex items-center justify-between active:bg-gray-50 transition-colors"
        >
          <span className="font-semibold text-primary">My registered vehicles</span>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
