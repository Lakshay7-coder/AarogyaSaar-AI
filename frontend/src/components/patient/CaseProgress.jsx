const steps = [
  "Registration",
  "Consent",
  "AI Interview",
  "Documents",
  "Review"
];

function CaseProgress({ current = 3 }) {
  return (
    <div className="case-progress">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        return (
          <div
            className={`case-step ${
              stepNumber <= current
                ? "completed"
                : ""
            }`}
            key={step}
          >
            <div className="step-circle">
              {stepNumber}
            </div>

            <span>{step}</span>

            {index < steps.length - 1 && (
              <div className="step-line" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CaseProgress;