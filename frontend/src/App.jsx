import {
  BrowserRouter,
  Navigate,
  Routes,
  Route
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CaseProvider } from "./context/CaseContext";
import { ThemeProvider } from "./context/ThemeContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Consent from "./pages/Consent";
import PatientDashboard from "./pages/PatientDashboard";
import CaseTaking from "./pages/CaseTaking";
import Documents from "./pages/Documents";
import Timeline from "./pages/Timeline";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientCases from "./pages/PatientCases";
import CaseDetails from "./pages/CaseDetails";
import { useAuth } from "./context/AuthContext";

export function ProtectedRoute({ roles, requireConsent = false, children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (requireConsent && !user.consentAt) {
    return <Navigate to="/consent" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return (
      <Navigate
        to={
          user.role === "doctor"
            ? "/doctor/dashboard"
            : "/patient/dashboard"
        }
        replace
      />
    );
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CaseProvider>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/consent" element={<ProtectedRoute roles={["patient"]}><Consent /></ProtectedRoute>} />

            <Route path="/patient/dashboard" element={<ProtectedRoute roles={["patient"]} requireConsent><PatientDashboard /></ProtectedRoute>} />

            <Route path="/patient/case" element={<ProtectedRoute roles={["patient"]} requireConsent><CaseTaking /></ProtectedRoute>} />

            <Route path="/patient/documents" element={<ProtectedRoute roles={["patient"]} requireConsent><Documents /></ProtectedRoute>} />

            <Route path="/patient/timeline" element={<ProtectedRoute roles={["patient"]} requireConsent><Timeline /></ProtectedRoute>} />

            <Route path="/doctor/dashboard" element={<ProtectedRoute roles={["doctor"]}><DoctorDashboard /></ProtectedRoute>} />

            <Route path="/doctor/cases" element={<ProtectedRoute roles={["doctor"]}><PatientCases /></ProtectedRoute>} />

            <Route path="/doctor/cases/:id" element={<ProtectedRoute roles={["doctor"]}><CaseDetails /></ProtectedRoute>} />
          </Routes>
          </CaseProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;