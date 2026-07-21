import React from 'react';
import { Home, Mail, Shield, User } from 'lucide-react';
import { Link, useLocation } from 'wouter';

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/inbox', label: 'Inbox', icon: Mail },
    { path: '/medicare', label: 'Services', icon: Shield },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-border flex justify-around items-center px-2 z-50 max-w-[430px] mx-auto pb-safe">
      {navItems.map((item) => {
        const isActive = location === item.path || (location.startsWith('/medicare') && item.path === '/medicare');
        const Icon = item.icon;
        
        return (
          <Link key={item.path} href={item.path} className="flex-1">
            <div 
              className={`flex flex-col items-center justify-center space-y-1 h-full cursor-pointer transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <Icon size={24} className={isActive ? 'stroke-[2.5px]' : 'stroke-2'} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
