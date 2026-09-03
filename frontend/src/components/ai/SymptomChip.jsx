import { Check } from "lucide-react";

function SymptomChip({
  name,
  severity,
  duration
}) {
  return (
    <div className="symptom-chip">
      <div className="symptom-check">
        <Check size={13} />
      </div>

      <div className="symptom-info">
        <strong>{name}</strong>

        <span>
          {severity} · {duration}
        </span>
      </div>
    </div>
  );
}

export default SymptomChip;