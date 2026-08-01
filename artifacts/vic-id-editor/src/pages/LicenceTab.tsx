import React, { useState } from 'react';
import { useProfile, Profile } from '../hooks/useProfile';
import { ChevronRight } from 'lucide-react';
import { LicenceCard } from '../components/LicenceCard';

export function LicenceTab() {
  const { profile, setProfile } = useProfile();
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [pinData, setPinData] = useState({ current: '', new: '', confirm: '' });

  const handleUpdate = (key: keyof Profile, value: string | number) => {
    setProfile({ [key]: value });
  };

  const handlePinSave = () => {
    if (pinData.current !== profile.pin) {
      alert("Current PIN is incorrect");
      return;
    }
    if (pinData.new !== pinData.confirm) {
      alert("New PINs do not match");
      return;
    }
    if (pinData.new.length !== 6) {
      alert("PIN must be 6 digits");
      return;
    }
    setProfile({ pin: pinData.new });
    setIsChangingPin(false);
    setPinData({ current: '', new: '', confirm: '' });
    alert("PIN changed successfully");
  };

  const quickActions = [
    "Manage licence renewal",
    "Order driver history report",
    "Update address on licence",
    "Replace licence"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-[80px]">
      <div className="bg-primary text-white pt-12 pb-4 px-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center">Licence</h1>
      </div>

      <div className="p-4 flex flex-col gap-6">
        <LicenceCard profile={profile} />

        <div className="bg-white rounded-xl border border-border overflow-hidden">
          {quickActions.map((action, i) => (
            <button
              key={action}
              onClick={() => alert("Feature coming soon")}
              className={`w-full flex items-center justify-between p-4 bg-white active:bg-gray-50 transition-colors ${
                i !== quickActions.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <span className="text-primary font-medium">{action}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-4 py-2 bg-gray-50 border-b border-border text-xs font-semibold text-muted-foreground uppercase">
            Licence Details (Editable)
          </div>
          
          <EditRow label="Full Name" value={profile.fullName} onChange={v => handleUpdate('fullName', v.toUpperCase())} />
          <EditRow label="Date of Birth" value={profile.dateOfBirth} onChange={v => handleUpdate('dateOfBirth', v)} />
          <EditSelect 
            label="Gender" 
            value={profile.gender} 
            options={["M", "F", "X"]} 
            onChange={v => handleUpdate('gender', v)} 
          />
          <EditRow label="Height" value={profile.height} onChange={v => handleUpdate('height', v)} />
          <EditRow label="Eye Colour" value={profile.eyeColour} onChange={v => handleUpdate('eyeColour', v)} />
          <EditRow label="Place of Birth" value={profile.placeOfBirth} onChange={v => handleUpdate('placeOfBirth', v)} />
          <EditRow label="Address" value={profile.address} onChange={v => handleUpdate('address', v.toUpperCase())} />
          <EditRow label="Suburb" value={profile.suburb} onChange={v => handleUpdate('suburb', v.toUpperCase())} />
          <EditRow label="Licence Number" value={profile.licenceNumber} onChange={v => handleUpdate('licenceNumber', v)} />
          <EditRow label="Licence Class" value={profile.licenceClass} onChange={v => handleUpdate('licenceClass', v.toUpperCase())} />
          <EditSelect 
            label="Licence Status" 
            value={profile.licenceStatus} 
            options={["Current", "Suspended", "Cancelled", "Expired"]} 
            onChange={v => handleUpdate('licenceStatus', v)} 
          />
          <EditSelect 
            label="Proficiency" 
            value={profile.proficiency} 
            options={["Full", "P1", "P2", "L"]} 
            onChange={v => handleUpdate('proficiency', v)} 
          />
          <EditRow label="Issue Date" value={profile.issueDate} onChange={v => handleUpdate('issueDate', v)} />
          <EditRow label="Expiry" value={profile.expiry} onChange={v => handleUpdate('expiry', v)} />
          <EditRow label="Card Number" value={profile.cardNumber} onChange={v => handleUpdate('cardNumber', v)} />
          <EditRow label="Conditions" value={profile.conditions} onChange={v => handleUpdate('conditions', v.toUpperCase())} />
          
          <EditRow type="number" label="Demerit Points" value={profile.demeritPoints.toString()} onChange={v => handleUpdate('demeritPoints', parseInt(v) || 0)} />
          <EditRow type="number" label="Demerit Threshold" value={profile.demeritThreshold.toString()} onChange={v => handleUpdate('demeritThreshold', parseInt(v) || 0)} />
          
          <EditRow label="Photo URL" value={profile.photoUrl} onChange={v => handleUpdate('photoUrl', v)} placeholder="https://..." />
          <EditRow label="Signature URL" value={profile.signatureUrl} onChange={v => handleUpdate('signatureUrl', v)} placeholder="https://..." />

          <button
            onClick={() => setIsChangingPin(true)}
            className="w-full flex items-center justify-between p-4 bg-white active:bg-gray-50 transition-colors text-primary font-medium"
          >
            Change PIN
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {isChangingPin && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <h2 className="text-xl font-bold text-primary mb-4">Change PIN</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Current PIN</label>
                <input 
                  type="password" 
                  maxLength={6}
                  value={pinData.current}
                  onChange={e => setPinData({...pinData, current: e.target.value.replace(/\D/g,'')})}
                  className="w-full border-b border-primary p-2 mt-1 focus:outline-none" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">New PIN (6 digits)</label>
                <input 
                  type="password" 
                  maxLength={6}
                  value={pinData.new}
                  onChange={e => setPinData({...pinData, new: e.target.value.replace(/\D/g,'')})}
                  className="w-full border-b border-primary p-2 mt-1 focus:outline-none" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Confirm New PIN</label>
                <input 
                  type="password" 
                  maxLength={6}
                  value={pinData.confirm}
                  onChange={e => setPinData({...pinData, confirm: e.target.value.replace(/\D/g,'')})}
                  className="w-full border-b border-primary p-2 mt-1 focus:outline-none" 
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  onClick={() => setIsChangingPin(false)}
                  className="px-4 py-2 font-medium text-muted-foreground active:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePinSave}
                  className="px-4 py-2 bg-primary text-white font-medium rounded-lg active:opacity-90"
                >
                  Save PIN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EditRow({ label, value, onChange, placeholder = "", type = "text" }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string, type?: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localVal, setLocalVal] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    if (localVal !== value) {
      onChange(localVal);
    }
  };

  return (
    <div className="flex flex-col border-b border-border p-4 bg-white">
      <span className="text-xs text-muted-foreground mb-1">{label}</span>
      {isEditing ? (
        <input
          type={type}
          autoFocus
          value={localVal}
          onChange={e => setLocalVal(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={e => e.key === 'Enter' && handleBlur()}
          placeholder={placeholder}
          className="w-full text-primary font-medium focus:outline-none border-b border-primary pb-1"
        />
      ) : (
        <div 
          onClick={() => setIsEditing(true)}
          className="w-full text-primary font-medium min-h-[24px] cursor-text"
        >
          {value || <span className="text-gray-300 italic">Tap to edit</span>}
        </div>
      )}
    </div>
  );
}

function EditSelect({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col border-b border-border p-4 bg-white">
      <span className="text-xs text-muted-foreground mb-1">{label}</span>
      <select 
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full text-primary font-medium focus:outline-none bg-transparent appearance-none cursor-pointer"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}
