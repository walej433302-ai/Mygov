import React, { useState, useRef, useCallback } from 'react';
import { MobileShell } from '../components/MobileShell';
import { MedicareCard } from '../components/MedicareCard';
import { HealthcareCard } from '../components/HealthcareCard';
import { EditMedicareModal } from '../components/EditMedicareModal';
import { EditHealthcareModal } from '../components/EditHealthcareModal';
import { useMedicareData } from '../hooks/useMedicareData';
import { ChevronLeft, FileText, Clock, ShieldCheck, Download } from 'lucide-react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export default function Medicare() {
  const { medicareCard, setMedicareCard, healthcareCard, setHealthcareCard } = useMedicareData();
  const [activeTab, setActiveTab] = useState<'medicare' | 'health' | 'claims' | 'history'>('medicare');
  const [isEditingMedicare, setIsEditingMedicare] = useState(false);
  const [isEditingHealthcare, setIsEditingHealthcare] = useState(false);
  const medicareTabCount = useRef(0);
  const medicareTabTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const healthcareTabCount = useRef(0);
  const healthcareTabTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMedicareCardTap = useCallback(() => {
    medicareTabCount.current += 1;
    if (medicareTabTimer.current) clearTimeout(medicareTabTimer.current);
    if (medicareTabCount.current >= 5) {
      medicareTabCount.current = 0;
      setIsEditingMedicare(true);
    } else {
      medicareTabTimer.current = setTimeout(() => {
        medicareTabCount.current = 0;
      }, 1500);
    }
  }, []);

  const handleHealthcareCardTap = useCallback(() => {
    healthcareTabCount.current += 1;
    if (healthcareTabTimer.current) clearTimeout(healthcareTabTimer.current);
    if (healthcareTabCount.current >= 5) {
      healthcareTabCount.current = 0;
      setIsEditingHealthcare(true);
    } else {
      healthcareTabTimer.current = setTimeout(() => {
        healthcareTabCount.current = 0;
      }, 1500);
    }
  }, []);

  const tabs = [
    { id: 'medicare', label: 'Medicare Card' },
    { id: 'health', label: 'Concession' },
    { id: 'claims', label: 'Claims' },
    { id: 'history', label: 'History' }
  ] as const;

  return (
    <MobileShell>
      <div className="bg-white min-h-full">
        {/* Header Section */}
        <div className="bg-primary text-white p-4 pb-0">
          <Link href="/dashboard" className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-semibold">
            <ChevronLeft size={18} className="mr-1" /> Back
          </Link>
          <h1 className="text-2xl font-bold mb-4">Medicare</h1>
          
          {/* Status Banner */}
          <div className="bg-[#1E8A3C] rounded-lg p-3 flex items-center mb-6 shadow-sm border border-white/20">
            <ShieldCheck size={20} className="mr-3 shrink-0" />
            <div>
              <div className="font-semibold text-sm">Account Linked</div>
              <div className="text-xs text-white/80">Your Medicare details are synced</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 overflow-x-auto no-scrollbar pb-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id 
                    ? 'border-white text-white' 
                    : 'border-transparent text-white/60 hover:text-white/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 bg-gray-50 min-h-[calc(100vh-200px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              
              {/* TAB: MEDICARE */}
              {activeTab === 'medicare' && (
                <div className="space-y-4">
                  <div onClick={handleMedicareCardTap} className="cursor-pointer select-none" data-testid="medicare-card-tappable">
                    <MedicareCard data={medicareCard} />
                  </div>

                  {isEditingMedicare && (
                    <EditMedicareModal 
                      data={medicareCard} 
                      onSave={(data) => {
                        setMedicareCard(data);
                        setIsEditingMedicare(false);
                      }} 
                      onCancel={() => setIsEditingMedicare(false)} 
                    />
                  )}

                  <div className="bg-white rounded-lg border border-border p-4 mt-6">
                    <h3 className="font-bold text-sm mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-md border border-gray-100 hover:bg-gray-100">
                        <FileText size={20} className="text-primary mb-2" />
                        <span className="text-xs font-semibold">Make a claim</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-md border border-gray-100 hover:bg-gray-100">
                        <Download size={20} className="text-primary mb-2" />
                        <span className="text-xs font-semibold text-center">Get tax statement</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: HEALTHCARE CONCESSION */}
              {activeTab === 'health' && (
                <div className="space-y-4">
                  <div onClick={handleHealthcareCardTap} className="cursor-pointer select-none" data-testid="healthcare-card-tappable">
                    <HealthcareCard data={healthcareCard} />
                  </div>

                  {isEditingHealthcare && (
                    <EditHealthcareModal 
                      data={healthcareCard} 
                      onSave={(data) => {
                        setHealthcareCard(data);
                        setIsEditingHealthcare(false);
                      }} 
                      onCancel={() => setIsEditingHealthcare(false)} 
                    />
                  )}
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm flex items-start mt-4">
                    <Clock size={18} className="text-amber-600 mr-2 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-semibold text-amber-800">Renewal due soon</span>
                      <p className="text-amber-700 text-xs mt-1">This card expires in less than 6 months. Check your eligibility to renew.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: CLAIMS */}
              {activeTab === 'claims' && (
                <div className="space-y-3">
                  <h2 className="font-bold text-lg mb-4">Recent Claims</h2>
                  
                  {[
                    { id: '1', date: '12 Oct 2024', provider: 'City Medical Centre', item: '23', amount: '$41.40', status: 'Paid', color: 'bg-green-100 text-green-800' },
                    { id: '2', date: '05 Oct 2024', provider: 'Smith Street Dental', item: '012', amount: '$75.00', status: 'Processing', color: 'bg-amber-100 text-amber-800' },
                    { id: '3', date: '28 Sep 2024', provider: 'City Medical Centre', item: '36', amount: '$79.70', status: 'Paid', color: 'bg-green-100 text-green-800' },
                    { id: '4', date: '15 Aug 2024', provider: 'Specialist Radiology', item: '104', amount: '$120.00', status: 'Paid', color: 'bg-green-100 text-green-800' },
                  ].map(claim => (
                    <div key={claim.id} className="bg-white p-4 rounded-lg border border-border shadow-sm flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold text-sm">{claim.provider}</div>
                        <div className="text-xs font-medium text-muted-foreground">{claim.date}</div>
                      </div>
                      <div className="flex justify-between items-end mt-1">
                        <div className="text-xs space-y-1">
                          <div><span className="text-muted-foreground">Item:</span> {claim.item}</div>
                          <div><span className="text-muted-foreground">Benefit:</span> <span className="font-semibold">{claim.amount}</span></div>
                        </div>
                        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${claim.color}`}>
                          {claim.status}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full mt-4 py-3 bg-white border border-border rounded-lg text-sm font-semibold text-primary shadow-sm">
                    View older claims
                  </button>
                </div>
              )}

              {/* TAB: HISTORY */}
              {activeTab === 'history' && (
                <div className="bg-white rounded-lg border border-border p-4">
                  <h2 className="font-bold text-lg mb-6">Account History</h2>
                  
                  <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-4">
                    {[
                      { date: '01 Jan 2025', title: 'Healthcare Card issued', desc: 'New concession card added to account' },
                      { date: '15 Nov 2024', title: 'Bank details updated', desc: 'Benefits will be paid to BSB ending in 345' },
                      { date: '10 Jun 2024', title: 'Medicare Card renewed', desc: 'New physical card sent in mail' },
                      { date: '15 Mar 2023', title: 'Family member added', desc: 'Jamie Johnson added to Medicare card' },
                    ].map((event, i) => (
                      <div key={i} className="relative pl-6">
                        <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7.5px] top-1.5 ring-4 ring-white" />
                        <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">{event.date}</div>
                        <div className="font-semibold text-sm mb-0.5">{event.title}</div>
                        <div className="text-xs text-muted-foreground">{event.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MobileShell>
  );
}
