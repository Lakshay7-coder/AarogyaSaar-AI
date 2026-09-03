import {
  ArrowUpRight,
  Clock3
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function CaseCard({ patient }) {
  const navigate = useNavigate();

  return (
    <div className="doctor-case-card">
      <div className="case-card-main">
        <div className="mini-avatar">
          {patient.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </div>

        <div>
          <h3>{patient.name}</h3>

          <p>
            {patient.age} years · {patient.gender}
          </p>
        </div>
      </div>

      <div className="case-complaint">
        <span>Primary complaint</span>
        <strong>{patient.complaint}</strong>
      </div>

      <div className="case-completeness">
        <span>Completeness</span>

        <div className="mini-progress">
          <div
            style={{
              width: `${patient.completeness}%`
            }}
          />
        </div>

        <strong>
          {patient.completeness}%
        </strong>
      </div>

      <div className="case-status">
        <span
          className={`status-pill ${patient.status
            .toLowerCase()
            .replaceAll(" ", "-")}`}
        >
          {patient.status}
        </span>

        <small>
          <Clock3 size={13} />
          {patient.time}
        </small>
      </div>

      <button
        className="open-case-btn"
        onClick={() =>
          navigate(`/doctor/cases/${patient.id}`)
        }
      >
        Open
        <ArrowUpRight size={16} />
      </button>
    </div>
  );
}

export default CaseCard;