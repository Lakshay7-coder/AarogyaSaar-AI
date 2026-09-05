import { LayoutDashboard, MessageCircleHeart, FileText, Clock3, ClipboardCheck } from "lucide-react";
import { NavLink } from "react-router-dom";
import { getRememberedCaseId } from "../../context/CaseContext";

export default function Sidebar({ doctor = false }) {
  const id = getRememberedCaseId();
  const patientLinks = [
    { to: "/patient/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: id ? `/case/${id}` : "/patient/dashboard", label: "AI History", icon: MessageCircleHeart },
    { to: id ? `/case/${id}/documents` : "/patient/dashboard", label: "Documents", icon: FileText },
    { to: id ? `/case/${id}/timeline` : "/patient/dashboard", label: "Medical Timeline", icon: Clock3 },
    { to: id ? `/case/${id}/summary` : "/patient/dashboard", label: "Clinical Summary", icon: ClipboardCheck }
  ];
  const doctorLinks = [
    { to: "/doctor", label: "Dashboard", icon: LayoutDashboard },
    { to: "/doctor/cases", label: "Patient Cases", icon: ClipboardCheck }
  ];
  return <aside className="sidebar"><div><div className="sidebar-title">{doctor ? "Doctor Workspace" : "Patient Workspace"}</div><nav>{(doctor?doctorLinks:patientLinks).map(({to,label,icon:Icon})=><NavLink key={label} to={to} className={({isActive})=>isActive?"side-link active":"side-link"}><Icon size={19}/><span>{label}</span></NavLink>)}</nav></div><div className="sidebar-ai"><div className="ai-pulse">✦</div><strong>AI Assistant</strong><p>Your case intelligence engine is active.</p><div className="mini-status"><span/>Processing ready</div></div></aside>;
}
