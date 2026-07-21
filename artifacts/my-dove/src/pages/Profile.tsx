import React, { useState } from 'react';
import { MobileShell } from '../components/MobileShell';
import { useMedicareData } from '../hooks/useMedicareData';
import { User, Settings, Shield, Bell, LogOut, ChevronRight, Edit2 } from 'lucide-react';
import { Link, useLocation } from 'wouter';

export default function Profile() {
  const { profile, setProfile } = useMedicareData();
  const [, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    setLocation('/');
  };

  return (
    <MobileShell>
      <div className="bg-gray-50 min-h-full pb-6">
        {/* Header Profile Summary */}
        <div className="bg-primary text-white p-6 pt-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary text-3xl font-bold mb-3 shadow-lg border-4 border-white/20">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-white/80 text-sm mt-1">{profile.email}</p>
        </div>

        <div className="p-4 space-y-6">
          
          {/* Personal Details */}
          <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center bg-gray-50/50">
              <h2 className="font-bold flex items-center text-[#1A1A1A]">
                <User size={18} className="mr-2 text-primary" /> Personal details
              </h2>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-primary text-sm font-semibold flex items-center"
                >
                  <Edit2 size={14} className="mr-1" /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(false)} className="text-muted-foreground text-sm font-semibold">Cancel</button>
                  <button onClick={handleSave} className="text-primary text-sm font-semibold">Save</button>
                </div>
              )}
            </div>
            
            <div className="p-4 space-y-4">
              {isEditing ? (
                // Edit Mode
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Full Name</label>
                    <input 
                      value={editForm.name} 
                      onChange={e => setEditForm({...editForm, name: e.target.value})}
                      className="w-full border border-border rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Date of Birth</label>
                    <input 
                      value={editForm.dob} 
                      onChange={e => setEditForm({...editForm, dob: e.target.value})}
                      className="w-full border border-border rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Email</label>
                    <input 
                      value={editForm.email} 
                      onChange={e => setEditForm({...editForm, email: e.target.value})}
                      className="w-full border border-border rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Mobile</label>
                    <input 
                      value={editForm.phone} 
                      onChange={e => setEditForm({...editForm, phone: e.target.value})}
                      className="w-full border border-border rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground mb-1 block">Address</label>
                    <textarea 
                      value={editForm.address} 
                      onChange={e => setEditForm({...editForm, address: e.target.value})}
                      className="w-full border border-border rounded p-2 text-sm focus:ring-1 focus:ring-primary outline-none"
                      rows={2}
                    />
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-bold uppercase text-muted-foreground mb-0.5">Date of Birth</div>
                    <div className="text-sm font-medium">{profile.dob}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-muted-foreground mb-0.5">Mobile</div>
                    <div className="text-sm font-medium">{profile.phone}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase text-muted-foreground mb-0.5">Residential Address</div>
                    <div className="text-sm font-medium leading-snug max-w-[250px]">{profile.address}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Settings Options */}
          <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            {[
              { icon: Shield, label: 'Account security', desc: 'Password, passkeys and connected devices' },
              { icon: Settings, label: 'Account settings', desc: 'Language, accessibility and sign-in options' },
              { icon: Bell, label: 'Notifications', desc: 'Manage how and when we contact you' }
            ].map((item, i) => (
              <div key={i} className="p-4 border-b border-border last:border-0 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-primary mr-3">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </div>
            ))}
          </div>

          {/* Sign Out Button */}
          <button 
            onClick={handleLogout}
            className="w-full bg-white border border-red-200 text-red-600 font-bold py-3.5 rounded-xl flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            Sign out of myGov
          </button>
          
          <div className="text-center text-xs text-muted-foreground mt-4">
            Version 2.4.1 (Build 8421)
          </div>

        </div>
      </div>
    </MobileShell>
  );
}
