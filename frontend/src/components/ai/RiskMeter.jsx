function RiskMeter({ score = 0 }) {
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));
  const label = safeScore >= 70 ? "Needs review" : safeScore >= 40 ? "Moderate" : "Low";
  return (
    <div className="risk-meter">
      <div className="risk-meter-top"><span>Risk indicator</span><strong>{safeScore}%</strong></div>
      <div className="progress-track"><div className="progress-fill" style={{ width: `${safeScore}%` }} /></div>
      <small>{label} · Decision support only</small>
    </div>
  );
}
export default RiskMeter;
