import { Loader2 } from "lucide-react";

function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = ""
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`btn btn-${variant} ${className}`}
    >
      {loading && <Loader2 size={17} className="spin" />}
      {children}
    </button>
  );
}

export default Button;