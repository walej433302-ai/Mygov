import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Medicare from './pages/Medicare';
import Wallet from './pages/Wallet';
import Services from './pages/Services';
import ATO from './pages/ATO';
import Centrelink from './pages/Centrelink';
import Inbox from './pages/Inbox';
import Profile from './pages/Profile';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/services" component={Services} />
      <Route path="/medicare" component={Medicare} />
      <Route path="/ato" component={ATO} />
      <Route path="/centrelink" component={Centrelink} />
      <Route path="/inbox" component={Inbox} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
