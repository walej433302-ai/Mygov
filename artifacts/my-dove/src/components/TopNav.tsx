import React from 'react';
import { Bell, Menu, User } from 'lucide-react';
import { Link } from 'wouter';

export function TopNav() {
  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-primary flex items-center justify-between px-4 z-50 max-w-[430px] mx-auto shadow-sm">
      <div className="flex items-center space-x-3">
        <Link href="/dashboard">
          <div className="flex flex-col items-start cursor-pointer group">
            <span className="text-white font-bold text-xl leading-none tracking-tight">myGov</span>
          </div>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <Link href="/inbox">
          <div className="relative text-white cursor-pointer hover:text-white/80 transition-colors" data-testid="top-nav-bell">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 bg-destructive text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-primary">
              3
            </span>
          </div>
        </Link>
        
        <Link href="/profile">
          <div className="w-7 h-7 bg-white text-primary rounded-full flex items-center justify-center text-sm font-bold cursor-pointer" data-testid="top-nav-profile">
            AJ
          </div>
        </Link>

        <button className="text-white hover:text-white/80 transition-colors" data-testid="top-nav-menu">
          <Menu size={24} />
        </button>
      </div>
    </div>
  );
}
