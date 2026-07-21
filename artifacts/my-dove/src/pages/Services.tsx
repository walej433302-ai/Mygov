import React from 'react';
import { MinimalShell } from '../components/MobileShell';
import { Link } from 'wouter';
import { ArrowUpRight, ChevronDown, Pencil, Plus } from 'lucide-react';

const linkedServices = [
  { id: 'ato', name: 'Australian Taxation Office', linked: '23 Jan 2025', path: '/ato', expand: false },
  { id: 'centrelink', name: 'Centrelink', linked: '8 Oct 2025', path: '/centrelink', expand: false },
  { id: 'housingvic', name: 'HousingVic Online Services', linked: '21 Dec 2025', path: null, expand: false },
  { id: 'medicare', name: 'Medicare', linked: '23 Jan 2026', path: '/medicare', expand: true },
  { id: 'redress', name: 'National Redress Scheme', linked: '19 Oct 2025', path: null, expand: false },
];

export default function Services() {
  return (
    <MinimalShell>
      {/* Teal header */}
      <div className="bg-[#3EC6D4] px-4 pt-4 pb-5">
        <div className="flex justify-end items-center space-x-4 mb-3">
          <button className="w-8 h-8 flex items-center justify-center" data-testid="services-edit">
            <Pencil size={19} color="#1A1A1A" strokeWidth={1.8} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center" data-testid="services-add">
            <Plus size={22} color="#1A1A1A" strokeWidth={1.8} />
          </button>
        </div>
        <h1 className="text-[28px] font-bold text-[#1A1A1A]">Services</h1>
      </div>

      {/* Content */}
      <div className="bg-white min-h-full">
        {/* Forms and Applications row */}
        <div className="border-b border-gray-200">
          <button className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors" data-testid="forms-applications">
            <span className="text-[15px] text-[#1A1A1A] font-medium">Forms and Applications</span>
            <ArrowUpRight size={18} color="#1A1A1A" strokeWidth={1.8} />
          </button>
        </div>

        {/* Linked services */}
        <div className="pt-5 px-5 pb-2">
          <p className="text-sm text-gray-500 mb-3">Linked services</p>
        </div>

        <div className="bg-white border-t border-gray-200">
          {linkedServices.map((svc, i) => {
            const content = (
              <div
                className={`flex items-center justify-between px-5 py-4 ${i < linkedServices.length - 1 ? 'border-b border-gray-200' : ''} hover:bg-gray-50 transition-colors cursor-pointer`}
                data-testid={`service-${svc.id}`}
              >
                <div>
                  <p className="text-[15px] text-[#1A1A1A] font-medium leading-snug">{svc.name}</p>
                  <p className="text-[12px] text-gray-400 mt-0.5">Linked {svc.linked}</p>
                </div>
                {svc.expand
                  ? <ChevronDown size={18} color="#1A1A1A" strokeWidth={1.8} />
                  : <ArrowUpRight size={18} color="#1A1A1A" strokeWidth={1.8} />
                }
              </div>
            );

            if (svc.path) {
              return <Link key={svc.id} href={svc.path}>{content}</Link>;
            }
            return <div key={svc.id}>{content}</div>;
          })}
        </div>
      </div>
    </MinimalShell>
  );
}
