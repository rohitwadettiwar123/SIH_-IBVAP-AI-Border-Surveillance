import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Layout from "./components/Layout";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import CommandCenter from "./pages/CommandCenter";
import LiveSurveillance from "./pages/LiveSurveillance";
import ThreatIntelligence from "./pages/ThreatIntelligence";
import Incidents from "./pages/Incidents";
import EvidenceVault from "./pages/EvidenceVault";
import CameraNetwork from "./pages/CameraNetwork";
import Analytics from "./pages/Analytics";
import VirtualZones from "./pages/VirtualZones";
import BorderMap from "./pages/BorderMap";
import SystemHealth from "./pages/SystemHealth";
import Settings from "./pages/Settings";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: "#020817" }}>
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border border-cyan-500 mx-auto flex items-center justify-center animate-pulse-cyan" style={{ background: "rgba(34,211,238,0.05)" }}>
            <span className="text-cyan-400 font-mono text-sm font-bold">IB</span>
          </div>
          <div className="font-mono text-xs text-cyan-600 tracking-widest animate-pulse-cyan">INITIALIZING IBVAP...</div>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected dashboard routes */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<CommandCenter />} />
        <Route path="/surveillance" element={<LiveSurveillance />} />
        <Route path="/threat-intelligence" element={<ThreatIntelligence />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/evidence" element={<EvidenceVault />} />
        <Route path="/cameras" element={<CameraNetwork />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/zones" element={<VirtualZones />} />
        <Route path="/map" element={<BorderMap />} />
        <Route path="/health" element={<SystemHealth />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
