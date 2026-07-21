import React from 'react';
import { MobileShell } from '../components/MobileShell';
import { useMedicareData } from '../hooks/useMedicareData';
import { Link } from 'wouter';
import { Plus, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const { profile } = useMedicareData();

  const services = [
    { 
      id: 'medicare', 
      name: 'Medicare', 
      color: 'bg-[#00A651]', 
      path: '/medicare',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
          <path d="M12 2v20M2 12h20" strokeLinecap="round" />
        </svg>
      )
    },
    { 
      id: 'ato', 
      name: 'Australian Taxation Office', 
      color: 'bg-[#E07B00]', 
      path: '/ato',
      icon: <span className="font-bold text-lg leading-none">ATO</span>
    },
    { 
      id: 'centrelink', 
      name: 'Centrelink', 
      color: 'bg-[#F26522]', 
      path: '/centrelink',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12M6 12h12" strokeLinecap="round" />
        </svg>
      )
    },
    { 
      id: 'health', 
      name: 'My Health Record', 
      color: 'bg-[#89447B]', 
      path: '/medicare', // links to same area for mockup
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  return (
    <MobileShell>
      <div className="p-4 pb-8 space-y-6">
        
        {/* Welcome */}
        <section>
          <h1 className="text-2xl font-bold text-foreground">Welcome back,</h1>
          <h2 className="text-xl font-medium text-muted-foreground">{profile.name}</h2>
          
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle2 className="text-primary mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-sm">Account security level: Standard</h3>
              <p className="text-xs text-muted-foreground mt-1">Your account is secure. Add passkeys for stronger security.</p>
            </div>
          </div>
        </section>

        {/* Linked Services */}
        <section>
          <div className="flex justify-between items-end mb-3">
            <h2 className="font-bold text-lg">Linked services</h2>
            <span className="text-sm text-primary font-semibold cursor-pointer">Manage</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {services.map(service => (
              <Link key={service.id} href={service.path}>
                <div 
                  className="bg-white border border-border rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center text-center group h-32 justify-center"
                  data-testid={`service-card-${service.id}`}
                >
                  <div className={`w-12 h-12 rounded-full ${service.color} text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    {service.icon}
                  </div>
                  <span className="font-semibold text-[13px] leading-tight text-[#1A1A1A]">{service.name}</span>
                </div>
              </Link>
            ))}
          </div>

          <button className="w-full mt-4 border-2 border-dashed border-border rounded-xl p-4 flex items-center justify-center text-primary font-semibold hover:bg-gray-50 transition-colors">
            <Plus size={20} className="mr-2" />
            Link another service
          </button>
        </section>

        {/* Recent Activity */}
        <section className="pt-2">
          <h2 className="font-bold text-lg mb-3">Latest messages</h2>
          <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
            
            <Link href="/inbox">
              <div className="p-4 border-b border-border hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-[#E07B00] uppercase tracking-wide">ATO</span>
                  <span className="text-xs text-muted-foreground">Today</span>
                </div>
                <h3 className="font-semibold text-sm text-[#1A1A1A]">Notice of Assessment 2024</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">Your Notice of Assessment for the financial year ending 30 June 2024 is ready.</p>
              </div>
            </Link>

            <Link href="/inbox">
              <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-[#00A651] uppercase tracking-wide">Medicare</span>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
                <h3 className="font-semibold text-sm text-[#1A1A1A]">Medicare Claim Benefit Paid</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">Your recent claim has been processed and benefits paid to your nominated account.</p>
              </div>
            </Link>

            <div className="bg-gray-50 p-3 text-center border-t border-border">
              <Link href="/inbox" className="text-sm font-semibold text-primary flex items-center justify-center">
                View all messages <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </MobileShell>
  );
}
