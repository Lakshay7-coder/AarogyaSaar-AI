import {
  LayoutDashboard,
  MessageSquareHeart,
  FileText,
  Clock3,
  Users,
  Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  const patientLinks = [
    {
      to: "/patient/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard
    },
    {
      to: "/patient/case",
      label: "AI Case Taking",
      icon: MessageSquareHeart
    },
    {
      to: "/patient/documents",
      label: "Documents",
      icon: FileText
    },
    {
      to: "/patient/timeline",
      label: "Medical Timeline",
      icon: Clock3
    }
  ];

  const doctorLinks = [
    {
      to: "/doctor/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard
    },
    {
      to: "/doctor/cases",
      label: "Patient Cases",
      icon: Users
    }
  ];

  const links =
    user?.role === "doctor" ? doctorLinks : patientLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-label">
          WORKSPACE
        </div>

        <nav>
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <NavLink
          to="/"
          className="sidebar-link"
        >
          <Settings size={19} />
          <span>Help & Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;