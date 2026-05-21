import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import ToastContainer from './components/Toast'
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
import IntegrationDetail from './pages/IntegrationDetail'
import Asi1Demo from './pages/Asi1Demo'

export default function App() {
  return (
    <AppProvider>
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
          <Route path="/workbench/integrations" element={<Integrations />} />
          <Route path="/workbench/integrations/:slug" element={<IntegrationDetail />} />
        </Route>
        <Route element={<ClaimLayout />}>
          <Route path="/claim" element={<ClaimAgent />} />
        </Route>
        <Route path="/demo/asi1" element={<Asi1Demo />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AppProvider>
  )
}
