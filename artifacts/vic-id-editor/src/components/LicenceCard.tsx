import React from 'react';
import { Profile } from '../hooks/useProfile';

export function LicenceCard({ profile }: { profile: Profile }) {
  return (
    <div className="w-full bg-primary rounded-xl overflow-hidden shadow-lg relative" style={{ aspectRatio: '1.58/1' }}>
      {/* Background pattern placeholder if needed */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_100%)] pointer-events-none" />
      
      {/* Top Header */}
      <div className="flex justify-between items-start px-4 pt-4 pb-2 z-10 relative">
        <div className="text-[#FFC107] font-bold text-sm tracking-widest">VICTORIA</div>
        <div className="text-white font-bold text-xs tracking-wider opacity-90">DRIVER LICENCE</div>
      </div>

      {/* Main Content Area */}
      <div className="flex px-4 gap-4 h-[55%] z-10 relative">
        {/* Left Column (Photo & Signature) */}
        <div className="w-[35%] flex flex-col gap-2">
          <div className="flex-1 bg-gray-300 rounded overflow-hidden shadow-inner border border-white/20">
            {profile.photoUrl ? (
              <img src={profile.photoUrl} alt="Photo" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-400 flex items-center justify-center">
                <span className="text-white/50 text-[10px]">NO PHOTO</span>
              </div>
            )}
          </div>
          <div className="h-8 bg-gray-100 rounded flex items-center justify-center px-1 border border-white/20">
            {profile.signatureUrl ? (
              <img src={profile.signatureUrl} alt="Signature" className="h-full object-contain mix-blend-multiply" />
            ) : (
              <div className="w-full h-1 bg-black/20 rounded-full" />
            )}
          </div>
        </div>

        {/* Right Column (Details) */}
        <div className="flex-1 flex flex-col justify-between text-white pb-1">
          <div className="leading-tight">
            <div className="font-bold text-sm uppercase">{profile.fullName}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] leading-tight mt-1">
            <div className="col-span-2 flex justify-between">
              <span className="opacity-70">DOB</span>
              <span className="font-semibold">{profile.dateOfBirth}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="opacity-70">Sex</span>
              <span className="font-semibold">{profile.gender}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Class</span>
              <span className="font-semibold">{profile.licenceClass}</span>
            </div>

            <div className="col-span-2 flex justify-between">
              <span className="opacity-70">Licence No.</span>
              <span className="font-semibold tracking-wide">{profile.licenceNumber}</span>
            </div>
            
            <div className="col-span-2 flex justify-between">
              <span className="opacity-70">Card No.</span>
              <span className="font-semibold">{profile.cardNumber}</span>
            </div>
            
            <div className="col-span-2 flex justify-between">
              <span className="opacity-70">Expiry</span>
              <span className="font-semibold text-[#FFC107]">{profile.expiry}</span>
            </div>

            <div className="col-span-2 flex justify-between">
              <span className="opacity-70">Conditions</span>
              <span className="font-semibold truncate max-w-[100px] text-right">{profile.conditions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Overlay */}
      <div className="absolute right-4 bottom-[22%] flex flex-col gap-1 z-20">
        <div className={`px-2 py-0.5 rounded text-[9px] font-bold text-center w-16 ${
          profile.licenceStatus.toLowerCase() === 'current' ? 'bg-success text-white' : 'bg-red-500 text-white'
        }`}>
          {profile.licenceStatus.toUpperCase()}
        </div>
        
        {profile.proficiency !== 'Full' && (
          <div className={`px-2 py-0.5 rounded text-[9px] font-bold text-center w-16 ${
            profile.proficiency === 'P1' ? 'bg-red-500 text-white' : 
            profile.proficiency === 'P2' ? 'bg-green-600 text-white' : 
            'bg-yellow-400 text-black'
          }`}>
            {profile.proficiency}
          </div>
        )}
      </div>

      {/* Bottom Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-[18%] bg-black/20 flex flex-col justify-center px-4 z-10">
        <div className="flex justify-between text-[8px] text-white/90 font-medium">
          <div>{profile.address}, {profile.suburb}</div>
          <div>Issued: {profile.issueDate}</div>
        </div>
      </div>
    </div>
  );
}
