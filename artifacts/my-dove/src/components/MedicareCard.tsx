import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { MedicareCardData } from '../hooks/useMedicareData';
import { useQRToken } from '../hooks/useQRToken';

interface Props {
  data: MedicareCardData;
}

function maskNumber(num: string): string {
  // e.g. "2428 77142 1" → "**** **142 1"
  const parts = num.split(' ');
  if (parts.length === 3) {
    const masked0 = '****';
    const mid = parts[1];
    const masked1 = mid.length > 3 ? '**' + mid.slice(-3) : mid;
    return `${masked0} ${masked1} ${parts[2]}`;
  }
  return num;
}

// Circular countdown ring
function CountdownRing({ secondsLeft, lifetime }: { secondsLeft: number; lifetime: number }) {
  const r = 16;
  const circ = 2 * Math.PI * r;
  const progress = secondsLeft / lifetime;
  const offset = circ * (1 - progress);
  const isLow = secondsLeft <= 15;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-10 h-10">
        <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
          <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
          <circle
            cx="20" cy="20" r={r}
            fill="none"
            stroke={isLow ? '#FF6B6B' : 'rgba(255,255,255,0.9)'}
            strokeWidth="3"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold ${isLow ? 'text-[#FF6B6B]' : 'text-white'}`}>
          {secondsLeft}s
        </span>
      </div>
      <span className="text-[9px] text-white/70 mt-0.5 uppercase tracking-wider">Expires</span>
    </div>
  );
}

export function MedicareCard({ data }: Props) {
  const seed = `medicare:${data.number}:${data.members[0]?.name ?? ''}`;
  const { qrValue, secondsLeft, lifetime } = useQRToken(seed);
  const masked = maskNumber(data.number);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-lg select-none"
      style={{ backgroundColor: '#6BBF6E' }}
      data-testid="medicare-card"
    >
      {/* Subtle repeating pattern */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 text-white text-[11px] font-bold leading-4 tracking-[6px] break-all"
          style={{ wordBreak: 'break-all', letterSpacing: '8px', lineHeight: '18px' }}
        >
          {'PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP'}
        </div>
      </div>

      {/* Card header */}
      <div className="relative z-10 flex justify-between items-start px-5 pt-4 pb-2">
        <span className="text-[#1A2E1A] font-semibold text-[15px]">Medicare card</span>
        <div className="bg-[#1A6B2A] px-2.5 py-0.5 rounded">
          <span className="text-[#FFD700] font-bold italic text-[13px] tracking-wide">medicare</span>
        </div>
      </div>

      {/* Masked number */}
      <div className="relative z-10 px-5 py-3">
        <span className="text-[#1A2E1A] font-bold text-2xl tracking-widest font-mono">{masked}</span>
      </div>

      {/* QR code + countdown row */}
      <div className="relative z-10 mx-4 mb-4 mt-1 bg-[#1A6B2A]/80 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
        <div className="bg-white rounded-lg p-1.5 shadow">
          <QRCodeSVG
            value={qrValue}
            size={72}
            level="M"
            bgColor="#ffffff"
            fgColor="#1A2E1A"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center space-y-1">
          <p className="text-white font-semibold text-[11px] leading-tight">Scan to verify</p>
          <p className="text-white/70 text-[10px] leading-tight">Refreshes automatically</p>
          <p className="text-white/60 text-[9px] font-mono mt-1 tracking-wide">{data.number}</p>
        </div>
        <CountdownRing secondsLeft={secondsLeft} lifetime={lifetime} />
      </div>
    </div>
  );
}
