import React from 'react';
import { Lock, Delete } from 'lucide-react';
import { motion } from 'framer-motion';

interface PinScreenProps {
  expectedPin: string;
  onUnlock: () => void;
}

export function PinScreen({ expectedPin, onUnlock }: PinScreenProps) {
  const [pin, setPin] = React.useState('');
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handlePress = (digit: string) => {
    if (error) {
      setError(false);
      setPin('');
      setErrorMessage('');
    }
    if (pin.length < 6) {
      const newPin = pin + digit;
      setPin(newPin);
      
      if (newPin.length === 6) {
        if (newPin === expectedPin) {
          setTimeout(onUnlock, 200);
        } else {
          setError(true);
          setErrorMessage('Incorrect PIN');
          setTimeout(() => {
            setPin('');
            setError(false);
            setErrorMessage('');
          }, 800);
        }
      }
    }
  };

  const handleBackspace = () => {
    if (error) {
      setError(false);
      setPin('');
      setErrorMessage('');
    } else {
      setPin(p => p.slice(0, -1));
    }
  };

  const handleForgot = () => {
    alert("Please contact VicRoads");
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center pt-24 px-6 overflow-hidden">
      <div className="flex flex-col items-center w-full max-w-[320px]">
        <Lock className="w-16 h-16 text-success mb-6" strokeWidth={1.5} />
        
        <h1 className="text-xl font-semibold text-primary mb-12">
          Please enter your existing PIN code
        </h1>
        
        <div className={`flex gap-4 mb-8 h-8 items-center ${error ? 'shake' : ''}`}>
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full transition-colors duration-200 ${
                i < pin.length ? 'bg-primary' : 'border-2 border-border'
              }`} 
            />
          ))}
        </div>
        
        <div className="h-6 mb-8 text-destructive text-sm font-medium">
          {errorMessage}
        </div>

        <div className="grid grid-cols-3 w-full gap-y-4 gap-x-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handlePress(num.toString())}
              className="h-20 flex items-center justify-center text-[32px] font-medium text-primary active:bg-gray-100 rounded-2xl transition-colors select-none"
            >
              {num}
            </button>
          ))}
          
          <button
            onClick={handleForgot}
            className="h-20 flex items-center justify-center text-sm font-semibold text-primary active:bg-gray-100 rounded-2xl transition-colors select-none"
          >
            Forgot?
          </button>
          
          <button
            onClick={() => handlePress('0')}
            className="h-20 flex items-center justify-center text-[32px] font-medium text-primary active:bg-gray-100 rounded-2xl transition-colors select-none"
          >
            0
          </button>
          
          <button
            onClick={handleBackspace}
            className="h-20 flex items-center justify-center text-primary active:bg-gray-100 rounded-2xl transition-colors select-none"
          >
            <Delete className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
