import React from 'react';
import { HealthcareCardData } from '../hooks/useMedicareData';

interface Props {
  data: HealthcareCardData;
}

export function HealthcareCard({ data }: Props) {
  return (
    <div 
      className="relative w-full aspect-[1.58] rounded-[10px] shadow-md border border-[#D0D7DE] overflow-hidden flex flex-col bg-[#F4F9F4]"
      data-testid="healthcare-card"
    >
      {/* Header */}
      <div className="bg-[#1B4F8A] text-white p-3 flex flex-col">
        <div className="flex justify-between items-start">
          <div className="text-[10px] uppercase tracking-wider font-semibold">Australian Government</div>
        </div>
        <div className="text-[12px] mt-0.5">Services Australia</div>
        <div className="font-bold text-lg mt-1 text-[#F4F9F4]">Health Care Card</div>
      </div>

      {/* Accent line */}
      <div className="h-1 bg-[#F26522] w-full" />

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col text-[#1A1A1A]">
        {/* Members */}
        <div className="flex-1 flex flex-col justify-start space-y-1">
          {data.members.map((member, index) => (
            <div key={index} className="text-sm font-bold uppercase tracking-wide">
              {member.name}
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="flex flex-col space-y-1 mt-2">
          <div className="flex items-center">
            <span className="text-xs w-10 text-muted-foreground uppercase font-bold">CRN</span>
            <span className="text-base font-bold tracking-wider">{data.crn}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <div>
              <span className="text-muted-foreground uppercase font-bold mr-2">Valid From</span>
              <span className="font-semibold">{data.validFrom}</span>
            </div>
            <div>
              <span className="text-muted-foreground uppercase font-bold mr-2">To</span>
              <span className="font-semibold">{data.validTo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
