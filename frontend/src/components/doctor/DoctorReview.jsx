import { useState } from "react";
import {
  CheckCircle2,
  Edit3,
  Save
} from "lucide-react";

function DoctorReview({ summary }) {
  const [editing, setEditing] =
    useState(false);

  const [text, setText] =
    useState(summary);

  return (
    <div className="doctor-review">
      <div className="review-header">
        <div>
          <span>AI GENERATED</span>
          <h3>Clinical Summary</h3>
        </div>

        <button
          className="secondary-btn"
          onClick={() =>
            setEditing((value) => !value)
          }
        >
          {editing ? (
            <>
              <Save size={16} />
              Save
            </>
          ) : (
            <>
              <Edit3 size={16} />
              Edit
            </>
          )}
        </button>
      </div>

      {editing ? (
        <textarea
          className="summary-editor"
          value={text}
          onChange={(event) =>
            setText(event.target.value)
          }
        />
      ) : (
        <p className="clinical-summary">
          {text}
        </p>
      )}

      <div className="verification-box">
        <CheckCircle2 size={19} />

        <div>
          <strong>
            Doctor verification required
          </strong>

          <p>
            AI assists with documentation.
            The final clinical decision remains
            with the healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorReview;