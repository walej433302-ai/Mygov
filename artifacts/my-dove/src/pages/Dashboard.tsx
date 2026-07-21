import React, { useRef } from 'react';
import { MobileShell } from '../components/MobileShell';
import { useMedicareData } from '../hooks/useMedicareData';
import { Link } from 'wouter';
import { Shield, ChevronRight, MoreHorizontal, Settings } from 'lucide-react';

// Small card thumbnail for the wallet carousel
function WalletCardHealthcare({ paymentType, members }: { paymentType: string; members: { name: string }[] }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md w-[230px] flex-shrink-0">
      <div className="bg-[#1A6B2A] px-4 pt-3 pb-2">
        <p className="text-white font-bold text-[15px]">Health Care Card</p>
      </div>
      <div className="bg-[#FEFCE8] px-4 pt-3 pb-4 min-h-[80px] flex flex-col justify-between">
        <div />
        <p className="text-[#1A1A1A] text-sm font-medium">{paymentType || 'JSP'}</p>
      </div>
    </div>
  );
}

function WalletCardMedicare({ number }: { number: string }) {
  // Mask the number
  const parts = number.split(' ');
  let masked = number;
  if (parts.length === 3) {
    const mid = parts[1];
    masked = `**** **${mid.slice(-3)} ${parts[2]}`;
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-md w-[230px] flex-shrink-0 bg-[#6BBF6E]">
      <div className="px-4 pt-3 pb-2 flex justify-between items-center">
        <span className="text-[#1A2E1A] font-semibold text-[14px]">Medicare card</span>
        <div className="bg-[#1A6B2A] px-2 py-0.5 rounded">
          <span className="text-[#FFD700] font-bold italic text-[11px]">medicare</span>
        </div>
      </div>
      <div className="px-4 pt-2 pb-5">
        <span className="text-[#1A2E1A] font-bold text-lg tracking-widest font-mono">{masked}</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { profile, medicareCard, healthcareCard } = useMedicareData();
  const scrollRef = useRef<HTMLDivElement>(null);

  const firstName = profile.name.split(' ')[0];

  return (
    <MobileShell>
      <div className="bg-white min-h-full">
        {/* Greeting */}
        <div className="px-5 pt-5 pb-3 bg-white">
          <h1 className="text-[26px] font-bold text-[#1A1A1A]">Hi, {profile.name}</h1>
          {profile.lastSignedIn && (
            <div className="text-sm text-gray-500 mt-0.5 leading-snug">
              <span>Last signed into the app:</span>
              <br />
              <span>{profile.lastSignedIn}</span>
            </div>
          )}
        </div>

        {/* Wallet section */}
        <div className="px-5 py-3 bg-white">
          <div className="bg-white rounded-2xl border border-gray-150 shadow-sm p-4">
            <h2 className="font-bold text-lg text-[#1A1A1A] mb-3">Wallet</h2>

            {/* Horizontal scrollable card carousel */}
            <div
              ref={scrollRef}
              className="flex space-x-3 overflow-x-auto pb-2 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`.no-scroll::-webkit-scrollbar { display: none; }`}</style>
              <Link href="/wallet" className="snap-start">
                <WalletCardHealthcare
                  paymentType={healthcareCard.paymentType || 'JSP'}
                  members={healthcareCard.members}
                />
              </Link>
              <Link href="/wallet" className="snap-start">
                <WalletCardMedicare number={medicareCard.number} />
              </Link>
            </div>
          </div>
        </div>

        {/* Alerts section */}
        <div className="px-5 py-3 bg-white">
          <div className="bg-white rounded-2xl border border-gray-150 shadow-sm p-4">
            <h2 className="font-bold text-lg text-[#1A1A1A] mb-3">Alerts</h2>

            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <Link href="/inbox">
                <div className="flex items-center px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <Shield size={20} className="text-primary mr-3 flex-shrink-0" strokeWidth={1.8} />
                  <div className="flex-1">
                    <p className="text-[14px] text-[#1A1A1A] leading-snug">New details from your<br />Digital ID</p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MoreHorizontal size={18} />
                    <ChevronRight size={18} />
                  </div>
                </div>
              </Link>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden mt-2">
              <Link href="/inbox">
                <div className="flex items-center px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <Shield size={20} className="text-[#1A6B2A] mr-3 flex-shrink-0" strokeWidth={1.8} />
                  <div className="flex-1">
                    <p className="text-[14px] text-[#1A1A1A] leading-snug">Medicare claim paid<br /><span className="text-gray-400 text-xs">$41.40 benefit received</span></p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MoreHorizontal size={18} />
                    <ChevronRight size={18} />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Manage home button */}
        <div className="px-5 py-4 flex justify-center">
          <button className="flex items-center space-x-2 border border-gray-300 rounded-full px-5 py-2.5 text-sm text-[#1A1A1A] font-medium bg-white hover:bg-gray-50 transition-colors shadow-sm">
            <Settings size={16} strokeWidth={1.8} />
            <span>Manage home</span>
          </button>
        </div>

        <div className="h-4" />
      </div>
    </MobileShell>
  );
}
