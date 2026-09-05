function StatCard({
  icon,
  label,
  value,
  trend,
  danger = false
}) {
  return (
    <div
      className={`stat-card ${
        danger ? "danger" : ""
      }`}
    >
      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-content">
        <span>{label}</span>
        <strong>{value}</strong>

        {trend && (
          <small>{trend}</small>
        )}
      </div>
    </div>
  );
}

export default StatCard;