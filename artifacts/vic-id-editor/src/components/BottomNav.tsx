import React from 'react';
import { Home, Car, CreditCard, User, IdCard } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export function BottomNav({ activeTab, onChangeTab }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'vehicles', label: 'Vehicles', icon: Car },
    { id: 'licence', label: 'Licence', icon: IdCard },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40 pb-safe max-w-[430px] mx-auto">
      <div className="flex justify-between items-center h-[60px] px-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className="flex-1 flex flex-col items-center justify-center h-full gap-1"
            >
              <Icon 
                className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
