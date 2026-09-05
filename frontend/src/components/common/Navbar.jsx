import { HeartPulse, Globe2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div
        className="brand"
        onClick={() => navigate("/")}
      >
        <div className="brand-icon">
          <HeartPulse size={21} />
        </div>

        <div>
          <strong>AarogyaSaar</strong>
          <span>AI</span>
        </div>
      </div>

      <div className="nav-actions">
        <button className="language-btn">
          <Globe2 size={17} />
          English
        </button>

        {user && (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;