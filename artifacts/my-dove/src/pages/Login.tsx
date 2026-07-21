import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Lock, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function MyGovLogo() {
  return (
    <div className="flex items-center space-x-2">
      <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
        <polygon points="0,0 11,10 0,20" fill="#1A1A1A" />
        <polygon points="13,0 24,10 13,20" fill="#1A1A1A" />
      </svg>
      <span className="text-[#1A1A1A] font-bold text-xl tracking-tight">myGov</span>
    </div>
  );
}

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setLocation('/dashboard'), 600);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col max-w-[430px] mx-auto bg-white shadow-xl relative">
      {/* Teal top bar */}
      <div className="bg-[#3EC6D4] py-3.5 px-5 flex justify-between items-center">
        <MyGovLogo />
        <div className="text-xs text-[#1A1A1A]/70 font-medium flex items-center">
          English
          <svg className="ml-1" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 5l2 2 2-2" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="flex-1 px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-8">Sign in to myGov</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#1A1A1A]" htmlFor="username">
                Username or email
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-[#3EC6D4] focus:ring-2 focus:ring-[#3EC6D4]/20 transition-colors"
                required
                data-testid="input-username"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#1A1A1A]" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg pl-4 pr-10 py-3 text-base focus:outline-none focus:border-[#3EC6D4] focus:ring-2 focus:ring-[#3EC6D4]/20 transition-colors"
                  required
                  data-testid="input-password"
                />
                <Lock className="absolute right-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1B4F8A] text-white font-bold text-base rounded-lg py-3.5 mt-1 hover:bg-[#1B4F8A]/90 transition-colors flex justify-center items-center disabled:opacity-70"
              data-testid="button-signin"
            >
              {isLoading
                ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <a href="#" className="block text-[#1B4F8A] font-semibold text-sm hover:underline">Forgot password</a>
            <a href="#" className="block text-[#1B4F8A] font-semibold text-sm hover:underline">Forgot username</a>
          </div>

          <div className="mt-10 pt-7 border-t border-gray-200 space-y-4">
            <h2 className="font-bold text-xl">Don't have a myGov account?</h2>
            <button className="w-full border-2 border-[#1B4F8A] text-[#1B4F8A] font-bold text-base rounded-lg py-3 hover:bg-blue-50 transition-colors">
              Create a myGov account
            </button>
          </div>
        </motion.div>
      </div>

      <div className="bg-gray-50 p-5 text-sm flex justify-center space-x-6 text-gray-500 border-t border-gray-200">
        <span className="flex items-center cursor-pointer hover:text-[#1B4F8A]">
          <HelpCircle size={15} className="mr-1.5" /> Help
        </span>
        <span className="cursor-pointer hover:text-[#1B4F8A]">Contact us</span>
      </div>
    </div>
  );
}
