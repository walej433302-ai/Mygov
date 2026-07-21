import React from 'react';
import { MobileShell } from '../components/MobileShell';
import { ChevronLeft, Calendar, DollarSign, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Centrelink() {
  return (
    <MobileShell>
      <div className="bg-white min-h-full">
        {/* Header Section */}
        <div className="bg-[#1B4F8A] text-white p-4 pb-6">
          <Link href="/dashboard" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold">
            <ChevronLeft size={18} className="mr-1" /> Back
          </Link>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#F26522] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-6 h-6">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v12M6 12h12" strokeLinecap="round" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Centrelink</h1>
          </div>
        </div>

        <div className="p-4 space-y-4 -mt-4">
          
          {/* Main Status Card */}
          <div className="bg-white rounded-xl shadow-md border border-border p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#F26522]" />
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-bold text-lg">JobSeeker Payment</h2>
              <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                Active
              </span>
            </div>
            
            <div className="my-4 py-4 border-y border-gray-100 flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Next Payment</div>
                <div className="font-bold text-2xl text-[#1A1A1A]">$749.20</div>
                <div className="text-sm font-medium text-[#1B4F8A] mt-1 flex items-center">
                  <Calendar size={14} className="mr-1" /> Thursday, 24 Oct
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200 flex items-start mb-4">
              <FileText size={18} className="text-amber-600 mr-2 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-amber-800 text-sm">Action required</span>
                <p className="text-amber-700 text-xs mt-1">You need to report your income by Wednesday, 23 Oct to receive this payment.</p>
              </div>
            </div>

            <button className="w-full bg-[#F26522] text-white font-bold py-3 rounded-lg flex items-center justify-center shadow-sm hover:bg-[#D95511] transition-colors">
              Report income
            </button>
          </div>

          {/* Quick Links */}
          <h3 className="font-bold text-lg mt-6 mb-3 px-1">Services</h3>
          <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            {[
              { icon: DollarSign, label: 'Payment history', desc: 'View past payments and deductions' },
              { icon: FileText, label: 'Request a document', desc: 'Income statements and centrelink letters' },
              { icon: Calendar, label: 'Appointments', desc: 'Manage your upcoming phone or office appointments' }
            ].map((item, i) => (
              <div key={i} className="p-4 border-b border-border last:border-0 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#F26522] mr-3">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </MobileShell>
  );
}
