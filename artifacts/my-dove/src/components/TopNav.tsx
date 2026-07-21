import React from 'react';
import { User } from 'lucide-react';
import { Link } from 'wouter';

// The two-triangle "fast forward" myGov logo
function MyGovLogo() {
  return (
    <div className="flex items-center space-x-2">
      <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="0,0 12,11 0,22" fill="#1A1A1A" />
        <polygon points="14,0 26,11 14,22" fill="#1A1A1A" />
      </svg>
      <span className="text-[#1A1A1A] font-bold text-xl tracking-tight">myGov</span>
    </div>
  );
}

export function TopNav() {
  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-[#3EC6D4] flex items-center justify-between px-4 z-50 max-w-[430px] mx-auto">
      <Link href="/dashboard">
        <div className="cursor-pointer">
          <MyGovLogo />
        </div>
      </Link>

      <Link href="/profile">
        <div
          className="w-9 h-9 rounded-full border-2 border-[#1A1A1A]/20 flex items-center justify-center cursor-pointer bg-[#3EC6D4] hover:bg-[#36B8C6] transition-colors"
          data-testid="top-nav-profile"
        >
          <User size={20} color="#1A1A1A" strokeWidth={1.8} />
        </div>
      </Link>
    </div>
  );
}

// Reusable standalone logo for Login page
export function MyGovLogoStandalone() {
  return <MyGovLogo />;
}
