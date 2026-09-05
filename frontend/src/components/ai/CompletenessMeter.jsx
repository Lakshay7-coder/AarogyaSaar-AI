function CompletenessMeter({
  value = 0
}) {
  return (
    <div className="completeness">
      <div className="completeness-header">
        <span>Case completeness</span>
        <strong>{value}%</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${value}%` }}
        />
      </div>

      <p>
        AI has enough information to prepare
        a preliminary case summary.
      </p>
    </div>
  );
}

export default CompletenessMeter;