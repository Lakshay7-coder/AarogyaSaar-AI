import { UserRound } from "lucide-react";

function PatientCard({ patient }) {
  return (
    <div className="patient-card">
      <div className="patient-avatar">
        <UserRound size={24} />
      </div>

      <div className="patient-card-info">
        <span>Patient</span>

        <h3>{patient.name}</h3>

        <p>
          {patient.age} years · {patient.gender}
        </p>
      </div>

      <div className="patient-id">
        <span>Case ID</span>
        <strong>CASE-2026-001</strong>
      </div>
    </div>
  );
}

export default PatientCard;