import { useState, useEffect } from 'react';

const TOKEN_LIFETIME = 90; // seconds

function generateToken(seed: string): string {
  const period = Math.floor(Date.now() / (TOKEN_LIFETIME * 1000));
  const raw = `${seed}:${period}:mygov-secure`;
  let h = 0x811c9dc5;
  for (let i = 0; i < raw.length; i++) {
    h ^= raw.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
    h >>>= 0;
  }
  return h.toString(16).toUpperCase().padStart(8, '0');
}

function getSecondsLeft(): number {
  return TOKEN_LIFETIME - (Math.floor(Date.now() / 1000) % TOKEN_LIFETIME);
}

export function useQRToken(seed: string) {
  const [token, setToken] = useState(() => generateToken(seed));
  const [secondsLeft, setSecondsLeft] = useState(getSecondsLeft);

  useEffect(() => {
    const tick = setInterval(() => {
      const secs = getSecondsLeft();
      setSecondsLeft(secs);
      // Regenerate at the start of each new period
      if (secs === TOKEN_LIFETIME) {
        setToken(generateToken(seed));
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [seed]);

  // QR payload — looks like a real govt verification URL
  const qrValue = `https://my.gov.au/card-verify?ref=${encodeURIComponent(seed)}&t=${token}&v=2`;

  return { token, secondsLeft, qrValue, lifetime: TOKEN_LIFETIME };
}
