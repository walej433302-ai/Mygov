import React from 'react';
import { TopNav } from './TopNav';
import { BottomNav } from './BottomNav';
import { motion } from 'framer-motion';

export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#E8EDF2] flex justify-center w-full">
      <div className="w-full max-w-[430px] bg-background relative flex flex-col min-h-[100dvh] shadow-xl overflow-hidden">
        <TopNav />
        
        <main className="flex-1 overflow-y-auto mt-14 mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
