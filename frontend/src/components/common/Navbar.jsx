import { HeartPulse, Globe2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, setTheme, themes } = useTheme();

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
        <label className="theme-control">
          <span>Theme</span>
          <select
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
            aria-label="Choose interface theme"
          >
            {themes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <button className="language-btn" type="button">
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