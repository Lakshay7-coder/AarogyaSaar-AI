import { useEffect, useState } from "react";
import { ArrowLeft, Activity, Mail, LockKeyhole, UserRound } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

function Login() {
  const navigate = useNavigate(); const [params] = useSearchParams(); const { login, loading: authLoading } = useAuth();
  const [role, setRole] = useState(params.get("role") === "doctor" ? "doctor" : "patient");
  const [form, setForm] = useState({ email: "", password: "" }); const [error, setError] = useState("");
  useEffect(() => { const requested = params.get("role"); if (requested === "doctor" || requested === "patient") setRole(requested); }, [params]);
  const submit = async (e) => { e.preventDefault(); setError(""); try { const user = await login(form.email, form.password); if (user.role !== role) throw new Error(`This account is registered as ${user.role}, not ${role}.`); navigate(role === "doctor" ? "/doctor" : "/patient/dashboard"); } catch (err) { setError(err.response?.data?.message || err.message || "Login failed."); } };
  return <div className="auth-page"><button className="back-button" onClick={() => navigate("/")}><ArrowLeft size={17}/>Back</button><div className="auth-layout">
    <div className="auth-brand-panel"><div className="auth-brand"><div className="brand-icon"><Activity size={22}/></div><strong>AarogyaSaar <span>AI</span></strong></div><div className="auth-panel-content"><span>INTELLIGENT HEALTHCARE</span><h1>Your story deserves<br/>to be understood.</h1><p>AI-assisted history taking that captures the patient's voice and turns it into meaningful clinical information.</p></div></div>
    <div className="auth-form-panel"><div className="auth-form-container"><span className="form-eyebrow">WELCOME BACK</span><h2>Sign in to AarogyaSaar</h2><p className="form-description">Choose your workspace to continue.</p>
      <div className="role-switch"><button type="button" className={role === "patient" ? "selected" : ""} onClick={() => setRole("patient")}><UserRound size={17}/>Patient</button><button type="button" className={role === "doctor" ? "selected" : ""} onClick={() => setRole("doctor")}><Activity size={17}/>Doctor</button></div>
      <form onSubmit={submit}><label>Email address<div className="input-wrapper"><Mail size={18}/><input type="email" required value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} placeholder="you@example.com"/></div></label><label>Password<div className="input-wrapper"><LockKeyhole size={18}/><input type="password" required value={form.password} onChange={(e) => setForm({...form,password:e.target.value})} placeholder="Your password"/></div></label>{error && <div className="form-error">{error}</div>}<Button type="submit" loading={authLoading}>Continue</Button></form>
      <p className="auth-footer">Don't have an account? <button onClick={() => navigate(role === "doctor" ? "/register?role=doctor" : "/register")}>Create one</button></p>
      <div className="demo-login"><strong>Prototype note</strong><span>Create an account first. Doctor accounts must have the doctor role.</span></div>
    </div></div></div></div>;
}
export default Login;
