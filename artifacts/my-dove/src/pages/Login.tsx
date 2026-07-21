import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { User, Lock, HelpCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setLocation('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col max-w-[430px] mx-auto bg-white shadow-xl relative">
      {/* Header */}
      <div className="bg-[#F0F4F8] border-b border-border py-4 px-6 flex justify-between items-center">
        <div className="font-bold text-2xl text-primary tracking-tight">myGov</div>
        <div className="text-xs text-muted-foreground flex items-center">
          English
          <ChevronRight size={14} className="ml-1" />
        </div>
      </div>

      <div className="flex-1 px-6 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8">Sign in to myGov</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#1A1A1A]" htmlFor="username">
                Username or email
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border-2 border-border rounded-md pl-10 pr-4 py-3 text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                  data-testid="input-username"
                />
                <User className="absolute left-3 top-3.5 text-muted-foreground" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#1A1A1A]" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-border rounded-md pl-10 pr-4 py-3 text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                  data-testid="input-password"
                />
                <Lock className="absolute left-3 top-3.5 text-muted-foreground" size={20} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white font-bold text-lg rounded-md py-3.5 mt-2 hover:bg-primary/90 transition-colors flex justify-center items-center disabled:opacity-70"
              data-testid="button-signin"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <a href="#" className="block text-primary font-semibold text-sm hover:underline">Forgot password</a>
            <a href="#" className="block text-primary font-semibold text-sm hover:underline">Forgot username</a>
          </div>

          <div className="mt-12 pt-8 border-t border-border space-y-6">
            <div>
              <h2 className="font-bold text-xl mb-2">Don't have a myGov account?</h2>
              <button className="w-full border-2 border-primary text-primary font-bold text-lg rounded-md py-3 hover:bg-gray-50 transition-colors">
                Create a myGov account
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-[#F0F4F8] p-6 text-sm flex justify-center space-x-6 text-muted-foreground border-t border-border">
        <span className="flex items-center cursor-pointer hover:text-primary"><HelpCircle size={16} className="mr-1.5" /> Help</span>
        <span className="cursor-pointer hover:text-primary">Contact us</span>
      </div>
    </div>
  );
}
