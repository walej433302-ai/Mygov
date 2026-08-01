import React from 'react';
import { ChevronRight } from 'lucide-react';

export function VehiclesTab() {
  const menuItems = [
    "My registered vehicles",
    "Manage registration renewal",
    "Change your garage address",
    "Apprentice registration discount",
    "Unregistered vehicle permits",
    "My vehicle reports"
  ];

  const handleRowClick = () => {
    alert("Feature coming soon");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-[80px]">
      {/* Header */}
      <div className="bg-primary text-white pt-12 pb-4 px-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center">Vehicles</h1>
      </div>

      <div className="p-4 mt-2">
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item}
              onClick={handleRowClick}
              className={`w-full flex items-center justify-between p-4 bg-white active:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <span className="text-primary font-medium">{item}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
