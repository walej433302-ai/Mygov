import React, { useState } from 'react';
import { MobileShell } from '../components/MobileShell';
import { Search, Filter, Inbox as InboxIcon } from 'lucide-react';
import { Link } from 'wouter';

export default function Inbox() {
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Medicare', 'ATO', 'Centrelink'];

  const messages = [
    {
      id: 1,
      sender: 'ATO',
      subject: 'Notice of Assessment 2024',
      preview: 'Your Notice of Assessment for the financial year ending 30 June 2024 is ready to view. This contains important information about your tax return outcome.',
      date: 'Today',
      unread: true,
      color: 'bg-[#E07B00]'
    },
    {
      id: 2,
      sender: 'Medicare',
      subject: 'Medicare Claim Benefit Paid',
      preview: 'Your recent claim has been processed and benefits of $41.40 paid to your nominated bank account ending in 345.',
      date: '2 days ago',
      unread: false,
      color: 'bg-[#00A651]'
    },
    {
      id: 3,
      sender: 'myGov',
      subject: 'New sign in detected',
      preview: 'Your myGov account was signed in from a new device in Melbourne, VIC. If this was you, no action is needed.',
      date: '5 Oct',
      unread: false,
      color: 'bg-[#1B4F8A]'
    },
    {
      id: 4,
      sender: 'Centrelink',
      subject: 'Your payment summary',
      preview: 'Your payment summary for the last fortnight is now available. Please review to ensure your details are correct.',
      date: '28 Sep',
      unread: false,
      color: 'bg-[#F26522]'
    },
    {
      id: 5,
      sender: 'ATO',
      subject: 'PAYG Payment Summary available',
      preview: 'Your employer has finalised your income statement for the 2023-24 financial year. It is now marked as "Tax ready".',
      date: '15 Jul',
      unread: false,
      color: 'bg-[#E07B00]'
    }
  ];

  const filteredMessages = filter === 'All' 
    ? messages 
    : messages.filter(m => m.sender === filter);

  return (
    <MobileShell>
      <div className="bg-gray-50 min-h-full">
        {/* Header */}
        <div className="bg-white px-4 py-5 border-b border-border sticky top-0 z-10 shadow-sm">
          <h1 className="text-2xl font-bold text-[#1A1A1A] mb-4">Inbox</h1>
          
          <div className="relative mb-4">
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full bg-gray-100 border-none rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
            />
            <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
          </div>

          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  filter === f 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-muted-foreground hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Message List */}
        <div className="divide-y divide-border bg-white">
          {filteredMessages.length > 0 ? (
            filteredMessages.map(msg => (
              <div 
                key={msg.id} 
                className={`p-4 flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors ${msg.unread ? 'bg-blue-50/30' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full ${msg.color} flex items-center justify-center text-white shrink-0 mt-1`}>
                  <span className="font-bold text-xs">
                    {msg.sender === 'myGov' ? 'mG' : msg.sender.substring(0, 3).toUpperCase()}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-xs font-bold uppercase tracking-wide ${msg.unread ? 'text-[#1A1A1A]' : 'text-muted-foreground'}`}>
                      {msg.sender}
                    </span>
                    <span className={`text-[11px] whitespace-nowrap ml-2 ${msg.unread ? 'font-bold text-primary' : 'text-muted-foreground'}`}>
                      {msg.date}
                    </span>
                  </div>
                  
                  <h3 className={`text-sm mb-1 truncate ${msg.unread ? 'font-bold text-[#1A1A1A]' : 'font-semibold text-gray-800'}`}>
                    {msg.subject}
                  </h3>
                  
                  <p className={`text-xs line-clamp-2 ${msg.unread ? 'text-gray-700 font-medium' : 'text-muted-foreground'}`}>
                    {msg.preview}
                  </p>
                </div>

                {msg.unread && (
                  <div className="w-2.5 h-2.5 bg-primary rounded-full shrink-0 mt-3" />
                )}
              </div>
            ))
          ) : (
            <div className="py-16 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <InboxIcon size={32} />
              </div>
              <h3 className="font-bold text-[#1A1A1A] mb-1">No messages</h3>
              <p className="text-sm text-muted-foreground">You don't have any messages from {filter}.</p>
            </div>
          )}
        </div>
      </div>
    </MobileShell>
  );
}
