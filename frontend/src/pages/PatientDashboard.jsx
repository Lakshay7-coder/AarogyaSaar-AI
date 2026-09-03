import {
  Mic,
  ArrowRight,
  Clock3,
  FileText,
  Sparkles,
  ShieldAlert
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import PatientCard from "../components/patient/PatientCard";
import CompletenessMeter from "../components/ai/CompletenessMeter";
import { useCase } from "../context/CaseContext";
import { useAuth } from "../context/AuthContext";

function PatientDashboard() {
  const navigate = useNavigate();
  const { caseData } = useCase();
  const { user } = useAuth();

  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main className="dashboard-main">
          <div className="page-heading">
            <div>
              <span className="form-eyebrow">
                PATIENT WORKSPACE
              </span>

              <h1>
                Good morning,{" "}
                {user?.name?.split(" ")[0] || "Amit"}.
              </h1>

              <p>
                Your healthcare story, organised
                intelligently.
              </p>
            </div>

            <button
              className="hero-primary"
              onClick={() =>
                navigate("/patient/case")
              }
            >
              <Mic size={18} />
              Continue Case
            </button>
          </div>

          <PatientCard
            patient={caseData.patient}
          />

          <div className="dashboard-grid">
            <div className="dashboard-card case-overview-card">
              <div className="card-heading">
                <div>
                  <span>ACTIVE CASE</span>
                  <h2>AI Case Taking</h2>
                </div>

                <div className="active-dot">
                  <span />
                  In progress
                </div>
              </div>

              <p className="case-description">
                AarogyaSaar is building a structured
                picture of your symptoms from your
                own words.
              </p>

              <CompletenessMeter
                value={caseData.completeness}
              />

              <button
                className="card-action"
                onClick={() =>
                  navigate("/patient/case")
                }
              >
                Continue AI Interview
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="dashboard-card">
              <div className="card-heading">
                <div>
                  <span>CASE INSIGHTS</span>
                  <h2>What we've captured</h2>
                </div>

                <Sparkles size={19} />
              </div>

              <div className="insight-stat">
                <strong>
                  {caseData.symptoms.length}
                </strong>

                <span>
                  symptoms identified
                </span>
              </div>

              <div className="insight-stat">
                <strong>
                  {caseData.documents.length}
                </strong>

                <span>
                  documents processed
                </span>
              </div>

              <div className="insight-stat warning">
                <strong>
                  {caseData.redFlags.length}
                </strong>

                <span>
                  item requires doctor review
                </span>
              </div>
            </div>
          </div>

          <div className="dashboard-grid bottom-grid">
            <div className="dashboard-card">
              <div className="card-heading">
                <div>
                  <span>MEDICAL JOURNEY</span>
                  <h2>Recent activity</h2>
                </div>

                <Clock3 size={19} />
              </div>

              <div className="activity-list">
                {caseData.timeline
                  .slice(-3)
                  .reverse()
                  .map((item, index) => (
                    <div
                      className="activity-item"
                      key={index}
                    >
                      <div className="activity-dot" />

                      <div>
                        <strong>
                          {item.title}
                        </strong>

                        <p>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="dashboard-card quick-actions">
              <div className="card-heading">
                <div>
                  <span>QUICK ACCESS</span>
                  <h2>Your case</h2>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate("/patient/documents")
                }
              >
                <FileText size={18} />
                Documents
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() =>
                  navigate("/patient/timeline")
                }
              >
                <Clock3 size={18} />
                Medical Timeline
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() =>
                  navigate("/patient/case")
                }
              >
                <ShieldAlert size={18} />
                Case Intelligence
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PatientDashboard;