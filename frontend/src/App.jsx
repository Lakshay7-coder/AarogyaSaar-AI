import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CaseProvider } from "./context/CaseContext";

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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CaseProvider>
          <Routes>
            <Route path="/" element={<Landing />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/consent" element={<Consent />} />

            <Route
              path="/patient/dashboard"
              element={<PatientDashboard />}
            />

            <Route path="/patient/case" element={<CaseTaking />} />

            <Route
              path="/patient/documents"
              element={<Documents />}
            />

            <Route
              path="/patient/timeline"
              element={<Timeline />}
            />

            <Route
              path="/doctor/dashboard"
              element={<DoctorDashboard />}
            />

            <Route
              path="/doctor/cases"
              element={<PatientCases />}
            />

            <Route
              path="/doctor/cases/:id"
              element={<CaseDetails />}
            />
          </Routes>
        </CaseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;