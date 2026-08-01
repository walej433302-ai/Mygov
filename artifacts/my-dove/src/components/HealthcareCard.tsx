import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { HealthcareCardData } from '../hooks/useMedicareData';
import { useQRToken } from '../hooks/useQRToken';

interface Props {
  data: HealthcareCardData;
  showQR?: boolean;
}

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
          <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="3" />
          <circle
            cx="20" cy="20" r={r}
            fill="none"
            stroke={isLow ? '#C0392B' : '#1A6B2A'}
            strokeWidth="3"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold ${isLow ? 'text-[#C0392B]' : 'text-[#1A6B2A]'}`}>
          {secondsLeft}s
        </span>
      </div>
      <span className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-wider">Expires</span>
    </div>
  );
}

export function HealthcareCard({ data, showQR = false }: Props) {
  const seed = `healthcare:${data.crn}:${data.members[0]?.name ?? ''}`;
  const { qrValue, secondsLeft, lifetime } = useQRToken(seed);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-lg select-none border border-gray-100"
      data-testid="healthcare-card"
    >
      {/* Dark green header */}
      <div className="bg-[#1A6B2A] px-5 pt-4 pb-3">
        <p className="text-white font-bold text-[17px]">Health Care Card</p>
      </div>

      {/* Light yellow body */}
      <div className="bg-[#FEFCE8] px-5 py-4">
        {/* Payment type */}
        <p className="text-[#1A1A1A] text-sm font-medium mb-3">{data.paymentType || 'JSP'}</p>

        {/* Members */}
        <div className="space-y-0.5 mb-3">
          {data.members.map((m, i) => (
            <p key={i} className="text-[#1A1A1A] text-sm font-semibold uppercase tracking-wide">{m.name}</p>
          ))}
        </div>

        {/* CRN */}
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider w-10">CRN</span>
          <span className="text-sm font-bold text-[#1A1A1A] tracking-wider font-mono">{data.crn}</span>
        </div>

        {/* Valid dates */}
        <div className="flex justify-between items-center text-[11px] text-gray-500 mb-3">
          <span>
            <span className="font-bold uppercase tracking-wider mr-1">Valid From</span>
            <span className="text-[#1A1A1A] font-semibold">{data.validFrom}</span>
          </span>
          <span>
            <span className="font-bold uppercase tracking-wider mr-1">To</span>
            <span className="text-[#1A1A1A] font-semibold">{data.validTo}</span>
          </span>
        </div>
      </div>

      {/* QR code row — visible after first tap */}
      {showQR && (
        <div className="bg-[#E8F5E9] border-t border-[#C8E6C9] px-4 py-3 flex items-center justify-between gap-3">
          <div className="bg-white rounded-lg p-1.5 shadow-sm border border-gray-100">
            <QRCodeSVG
              value={qrValue}
              size={72}
              level="M"
              bgColor="#ffffff"
              fgColor="#1A6B2A"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-1">
            <p className="text-[#1A6B2A] font-semibold text-[11px] leading-tight">Scan to verify</p>
            <p className="text-gray-400 text-[10px] leading-tight">Refreshes automatically</p>
            <p className="text-gray-400 text-[9px] font-mono mt-1 tracking-wide">{data.crn}</p>
          </div>
          <CountdownRing secondsLeft={secondsLeft} lifetime={lifetime} />
        </div>
      )}
    </div>
  );
}
