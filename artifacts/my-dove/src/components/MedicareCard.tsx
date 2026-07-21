import React from 'react';
import { MedicareCardData } from '../hooks/useMedicareData';

interface Props {
  data: MedicareCardData;
}

export function MedicareCard({ data }: Props) {
  return (
    <div 
      className="relative w-full aspect-[1.58] rounded-[10px] p-5 shadow-md flex flex-col justify-between overflow-hidden text-white"
      style={{ backgroundColor: '#00A651' }}
      data-testid="medicare-card"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 25 0, 50 20 T 100 20" fill="none" stroke="white" strokeWidth="2" />
              <path d="M0 40 Q 25 20, 50 40 T 100 40" fill="none" stroke="white" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave)" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start z-10">
        <div className="font-bold text-2xl tracking-tight">Medicare</div>
      </div>

      {/* Members */}
      <div className="z-10 mt-4 mb-2 flex-1 flex flex-col justify-center">
        {data.members.map((member, index) => (
          <div key={index} className="flex justify-between items-center text-sm font-semibold mb-1 uppercase tracking-wide">
            <span>{member.name}</span>
            <span>{member.irn}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-white/40 w-full mb-3 z-10" />

      {/* Footer */}
      <div className="flex justify-between items-end z-10 text-sm font-semibold tracking-wider">
        <div className="text-lg tracking-[0.15em] font-mono">{data.number}</div>
        <div className="text-xs flex flex-col items-end">
          <span className="text-[10px] font-normal uppercase mb-0.5">Valid to</span>
          <span>{data.expiry}</span>
        </div>
      </div>
    </div>
  );
}
