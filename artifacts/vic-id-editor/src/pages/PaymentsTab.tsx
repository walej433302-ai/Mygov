import React from 'react';
import { CreditCard } from 'lucide-react';

export function PaymentsTab() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-[80px]">
      <div className="bg-primary text-white pt-12 pb-4 px-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center">Payments</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-6 mt-12">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-border">
          <CreditCard className="w-10 h-10 text-muted-foreground" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-primary">No payment methods saved</h2>
          <p className="text-sm text-muted-foreground px-4">
            Add a payment method to make paying for renewals and fees faster and easier.
          </p>
        </div>

        <button 
          onClick={() => alert("Feature coming soon")}
          className="w-full max-w-[280px] border-2 border-primary text-primary font-bold py-3 px-6 rounded-xl active:bg-gray-50 transition-colors mt-4"
        >
          + Add payment method
        </button>
      </div>
    </div>
  );
}
