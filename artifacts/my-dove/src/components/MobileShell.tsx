import React from 'react';
import { TopNav } from './TopNav';
import { BottomNav } from './BottomNav';
import { motion } from 'framer-motion';

// Full shell with top nav + bottom nav (used by Home, Medicare, ATO, Centrelink, Inbox, Profile)
export function MobileShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#D8EEF2] flex justify-center w-full">
      <div className="w-full max-w-[430px] bg-[#F5F5F5] relative flex flex-col min-h-[100dvh] shadow-xl overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto mt-14 mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
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

// Minimal shell — no top nav, just bottom nav (used by Wallet and Services which have their own headers)
export function MinimalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#D8EEF2] flex justify-center w-full">
      <div className="w-full max-w-[430px] bg-[#F5F5F5] relative flex flex-col min-h-[100dvh] shadow-xl overflow-hidden">
        <main className="flex-1 overflow-y-auto mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
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
