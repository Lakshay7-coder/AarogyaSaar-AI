import { AlertTriangle, ShieldAlert } from "lucide-react";

function RedFlagAlert({
  title = "Potential Red Flag",
  message,
  severity = "High"
}) {
  return (
    <div className="red-flag-alert">
      <div className="red-flag-icon">
        <ShieldAlert size={22} />
      </div>

      <div className="red-flag-content">
        <div className="red-flag-top">
          <strong>{title}</strong>

          <span className="severity-badge">
            {severity}
          </span>
        </div>

        <p>{message}</p>

        <div className="red-flag-note">
          <AlertTriangle size={14} />
          Decision support only. Doctor review required.
        </div>
      </div>
    </div>
  );
}

export default RedFlagAlert;