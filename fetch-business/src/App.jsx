import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout'
import ClaimLayout from './components/ClaimLayout'
import Home from './pages/Home'
import ClaimAgent from './pages/ClaimAgent'
import Profile from './pages/Profile'
import BusinessInfo from './pages/BusinessInfo'
import SocialsLibrary from './pages/SocialsLibrary'
import Workflows from './pages/Workflows'
import AgentMessages from './pages/AgentMessages'
import Orders from './pages/Orders'
import Integrations from './pages/Integrations'
import TrustGovernance from './pages/TrustGovernance'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/workbench/profile" element={<Profile />} />
          <Route path="/workbench/business-info" element={<BusinessInfo />} />
          <Route path="/workbench/workflows/library" element={<SocialsLibrary />} />
          <Route path="/workbench/workflows" element={<Workflows />} />
          <Route path="/workbench/chats" element={<AgentMessages />} />
          <Route path="/workbench/orders" element={<Orders />} />
          <Route path="/workbench/trust" element={<TrustGovernance />} />
          <Route path="/workbench/integrations" element={<Integrations />} />
        </Route>
        <Route element={<ClaimLayout />}>
          <Route path="/claim" element={<ClaimAgent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
