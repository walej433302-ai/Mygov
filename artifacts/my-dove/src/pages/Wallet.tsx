import React from 'react';
import { MinimalShell } from '../components/MobileShell';
import { MedicareCard } from '../components/MedicareCard';
import { HealthcareCard } from '../components/HealthcareCard';
import { EditMedicareModal } from '../components/EditMedicareModal';
import { EditHealthcareModal } from '../components/EditHealthcareModal';
import { useMedicareData } from '../hooks/useMedicareData';
import { MoreHorizontal, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useCallback } from 'react';

export default function Wallet() {
  const { medicareCard, setMedicareCard, healthcareCard, setHealthcareCard } = useMedicareData();
  const [editingMedicare, setEditingMedicare] = useState(false);
  const [editingHealthcare, setEditingHealthcare] = useState(false);

  // 5-tap to edit
  const medTapCount = useRef(0);
  const medTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hcTapCount = useRef(0);
  const hcTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMedicareTap = useCallback(() => {
    medTapCount.current += 1;
    if (medTapTimer.current) clearTimeout(medTapTimer.current);
    if (medTapCount.current >= 5) {
      medTapCount.current = 0;
      setEditingMedicare(true);
    } else {
      medTapTimer.current = setTimeout(() => { medTapCount.current = 0; }, 1500);
    }
  }, []);

  const handleHealthcareTap = useCallback(() => {
    hcTapCount.current += 1;
    if (hcTapTimer.current) clearTimeout(hcTapTimer.current);
    if (hcTapCount.current >= 5) {
      hcTapCount.current = 0;
      setEditingHealthcare(true);
    } else {
      hcTapTimer.current = setTimeout(() => { hcTapCount.current = 0; }, 1500);
    }
  }, []);

  return (
    <MinimalShell>
      {/* Teal header */}
      <div className="bg-[#3EC6D4] px-4 pt-4 pb-5">
        <div className="flex justify-end items-center space-x-4 mb-3">
          <button className="w-8 h-8 rounded-full bg-[#3EC6D4] hover:bg-[#36B8C6] flex items-center justify-center transition-colors" data-testid="wallet-menu">
            <MoreHorizontal size={20} color="#1A1A1A" strokeWidth={1.8} />
          </button>
          <button className="w-8 h-8 rounded-full bg-[#3EC6D4] hover:bg-[#36B8C6] flex items-center justify-center transition-colors" data-testid="wallet-add">
            <Plus size={22} color="#1A1A1A" strokeWidth={1.8} />
          </button>
        </div>
        <h1 className="text-[28px] font-bold text-[#1A1A1A]">Wallet</h1>
      </div>

      {/* Cards list */}
      <div className="bg-[#F5F5F5] min-h-full px-4 pt-4 pb-6 space-y-4">

        {/* Healthcare Card */}
        <div
          onClick={handleHealthcareTap}
          className="cursor-pointer select-none"
          data-testid="wallet-healthcare-tappable"
        >
          <HealthcareCard data={healthcareCard} />
        </div>
        <AnimatePresence>
          {editingHealthcare && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <EditHealthcareModal
                data={healthcareCard}
                onSave={(d) => { setHealthcareCard(d); setEditingHealthcare(false); }}
                onCancel={() => setEditingHealthcare(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Medicare Card */}
        <div
          onClick={handleMedicareTap}
          className="cursor-pointer select-none"
          data-testid="wallet-medicare-tappable"
        >
          <MedicareCard data={medicareCard} />
        </div>
        <AnimatePresence>
          {editingMedicare && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <EditMedicareModal
                data={medicareCard}
                onSave={(d) => { setMedicareCard(d); setEditingMedicare(false); }}
                onCancel={() => setEditingMedicare(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </MinimalShell>
  );
}
