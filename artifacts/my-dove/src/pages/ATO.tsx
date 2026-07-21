import React from 'react';
import { MobileShell } from '../components/MobileShell';
import { ChevronLeft, FileText, ChevronRight, Calculator, PieChart, Briefcase } from 'lucide-react';
import { Link } from 'wouter';

export default function ATO() {
  return (
    <MobileShell>
      <div className="bg-white min-h-full">
        {/* Header Section */}
        <div className="bg-[#1B4F8A] text-white p-4 pb-6">
          <Link href="/dashboard" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold">
            <ChevronLeft size={18} className="mr-1" /> Back
          </Link>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#E07B00] flex items-center justify-center font-bold text-sm">
              ATO
            </div>
            <h1 className="text-2xl font-bold">Australian Taxation Office</h1>
          </div>
        </div>

        <div className="p-4 space-y-4 -mt-4">
          
          {/* Main Status Card */}
          <div className="bg-white rounded-xl shadow-md border border-border p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#E07B00]" />
            <h2 className="font-bold text-lg mb-1">2024–25 Tax Return</h2>
            <div className="flex items-center mt-2 mb-4">
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                Not yet lodged
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              You can lodge your tax return for the financial year ending 30 June 2025 from 1 July 2025.
            </p>
            <button className="w-full bg-[#E07B00] text-white font-semibold py-3 rounded-lg flex items-center justify-center shadow-sm opacity-50 cursor-not-allowed">
              <FileText size={18} className="mr-2" />
              Lodge Return (Unavailable)
            </button>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="bg-white border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:bg-gray-50 cursor-pointer transition-colors">
              <Briefcase className="text-[#1B4F8A] mb-2" size={24} />
              <span className="text-sm font-semibold">Employment<br/>Income</span>
            </div>
            <div className="bg-white border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:bg-gray-50 cursor-pointer transition-colors">
              <Calculator className="text-[#1B4F8A] mb-2" size={24} />
              <span className="text-sm font-semibold">Deductions<br/>Tracker</span>
            </div>
            <div className="bg-white border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:bg-gray-50 cursor-pointer transition-colors col-span-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <PieChart className="text-[#1B4F8A] mr-3" size={24} />
                  <div className="text-left">
                    <span className="text-sm font-semibold block">Superannuation</span>
                    <span className="text-xs text-muted-foreground">View balances and details</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Lodgement History */}
          <h3 className="font-bold text-lg mt-6 mb-3 px-1">Lodgement History</h3>
          <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            {[
              { year: '2023–24', status: 'Processed', amount: '$1,240.50', type: 'Refund', date: '15 Aug 2024' },
              { year: '2022–23', status: 'Processed', amount: '$850.00', type: 'Refund', date: '22 Jul 2023' },
              { year: '2021–22', status: 'Processed', amount: '$120.00', type: 'Bill', date: '05 Sep 2022' }
            ].map((item, i) => (
              <div key={i} className="p-4 border-b border-border last:border-0 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                <div>
                  <div className="font-semibold text-sm mb-1">{item.year} Tax Return</div>
                  <div className="text-xs text-muted-foreground">Lodged: {item.date}</div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-sm ${item.type === 'Refund' ? 'text-green-700' : 'text-red-600'}`}>
                    {item.amount} {item.type}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground mt-1 tracking-wider">{item.status}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </MobileShell>
  );
}
