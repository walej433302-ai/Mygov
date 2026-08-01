import React, { useState } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useProfile } from './hooks/useProfile';
import { PinScreen } from './pages/PinScreen';
import { HomeTab } from './pages/HomeTab';
import { VehiclesTab } from './pages/VehiclesTab';
import { LicenceTab } from './pages/LicenceTab';
import { PaymentsTab } from './pages/PaymentsTab';
import { ProfileTab } from './pages/ProfileTab';
import { BottomNav } from './components/BottomNav';

function AppContent() {
  const { profile, isLoaded } = useProfile();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  if (!isLoaded) {
    return null; // Don't flash UI before localStorage is read
  }

  // The main app layout wrapper
  const renderTab = () => {
    switch (activeTab) {
      case 'home': return <HomeTab onNavigate={setActiveTab} />;
      case 'vehicles': return <VehiclesTab />;
      case 'licence': return <LicenceTab />;
      case 'payments': return <PaymentsTab />;
      case 'profile': return <ProfileTab onSignOut={() => setIsUnlocked(false)} onChangePin={() => setActiveTab('licence')} />;
      default: return <HomeTab onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="relative w-full max-w-[430px] mx-auto min-h-[100dvh] bg-background shadow-2xl overflow-hidden">
      {!isUnlocked && (
        <PinScreen 
          expectedPin={profile.pin} 
          onUnlock={() => setIsUnlocked(true)} 
        />
      )}
      
      {/* We keep the tabs rendered beneath so there's no layout jump when unlocked */}
      <div className={`transition-opacity duration-300 ${!isUnlocked ? 'opacity-0 pointer-events-none h-0 overflow-hidden' : 'opacity-100 min-h-screen'}`}>
        {renderTab()}
        <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
      </div>
    </div>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      {/* 
        This is a single-page pseudo-app using internal state for tabs, 
        mirroring exactly the brief "purely frontend... 5-tab bottom navigation" 
      */}
      <div className="min-h-screen w-full flex justify-center bg-zinc-900 md:py-8">
        <AppContent />
      </div>
    </WouterRouter>
  );
}

export default App;
