import React from 'react';
import { Home, CreditCard, Mail, Grid2X2 } from 'lucide-react';
import { Link, useLocation } from 'wouter';

const navItems = [
  { path: '/dashboard', label: 'Home', icon: Home },
  { path: '/wallet', label: 'Wallet', icon: CreditCard },
  { path: '/inbox', label: 'Inbox', icon: Mail },
  { path: '/services', label: 'Services', icon: Grid2X2 },
];

export function BottomNav() {
  const [location] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center px-2 z-50 max-w-[430px] mx-auto">
      {navItems.map((item) => {
        const isActive =
          location === item.path ||
          (item.path === '/wallet' && location.startsWith('/wallet')) ||
          (item.path === '/services' && location.startsWith('/services'));
        const Icon = item.icon;

        return (
          <Link key={item.path} href={item.path} className="flex-1">
            <div
              className={`flex flex-col items-center justify-center space-y-0.5 h-full cursor-pointer transition-colors ${
                isActive ? 'text-[#1A1A1A]' : 'text-gray-400'
              }`}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              {isActive ? (
                <div className="bg-[#F0D0F0] rounded-full px-4 py-1 flex flex-col items-center">
                  <Icon size={22} strokeWidth={2.5} />
                </div>
              ) : (
                <Icon size={22} strokeWidth={1.8} />
              )}
              <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
