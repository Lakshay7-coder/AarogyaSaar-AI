import { useState } from "react";
import { ArrowLeft, UserRound, Phone, CalendarDays, Mail, LockKeyhole, ArrowRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate(); const [params] = useSearchParams();
  const role = params.get("role") === "doctor" ? "doctor" : "patient";
  const { register, loading: authLoading } = useAuth();
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", age: "", gender: "Male", phone: "", email: "", password: "" });
  const update = (key) => (e) => setForm((v) => ({ ...v, [key]: e.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault(); setError("");
    try {
      await register({ name: form.name, email: form.email, password: form.password, role, preferredLanguage: "en" });
      if (role === "patient") { localStorage.setItem("aarogyasaar_pending_patient", JSON.stringify({ age: Number(form.age), gender: form.gender, phone: form.phone })); navigate("/consent"); } else { navigate("/doctor"); }
    } catch (err) { setError(err.response?.data?.message || "Registration failed. Please try again."); }
  };

  return <div className="registration-page">
    <button className="back-button" onClick={() => navigate("/")}><ArrowLeft size={17}/>Back</button>
    <div className="registration-container">
      <div className="registration-header"><div className="hero-badge">STEP 1 · {role === "doctor" ? "DOCTOR REGISTRATION" : "PATIENT REGISTRATION"}</div><h1>Let's begin with<br/><span>you.</span></h1><p>Tell us a few basic details before AarogyaSaar begins understanding your health story.</p></div>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>Full name<div className="input-wrapper"><UserRound size={18}/><input required value={form.name} onChange={update("name")} placeholder="Amit Sharma"/></div></label>
          <label>Age<div className="input-wrapper"><CalendarDays size={18}/><input required type="number" min="1" max="120" value={form.age} onChange={update("age")} placeholder="35"/></div></label>
          <label>Gender<select value={form.gender} onChange={update("gender")}><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option></select></label>
          <label>Mobile number<div className="input-wrapper"><Phone size={18}/><input required type="tel" value={form.phone} onChange={update("phone")} placeholder="+91 98XXXXXXXX"/></div></label>
          <label>Email address<div className="input-wrapper"><Mail size={18}/><input required type="email" value={form.email} onChange={update("email")} placeholder="you@example.com"/></div></label>
          <label>Password<div className="input-wrapper"><LockKeyhole size={18}/><input required minLength="6" type="password" value={form.password} onChange={update("password")} placeholder="Minimum 6 characters"/></div></label>
        </div>
        {error && <div className="form-error">{error}</div>}
        <div className="registration-note">Your information is used only to create your healthcare case.</div>
        <button className="hero-primary full-width" disabled={authLoading}>{authLoading ? "Creating account…" : <>Continue to Consent <ArrowRight size={18}/></>}</button>
      </form>
    </div>
  </div>;
}
export default Register;
