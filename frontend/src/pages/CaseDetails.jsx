import {
  ArrowLeft,
  ShieldAlert,
  FileText,
  Clock3,
  Sparkles,
  CheckCircle2
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

import PatientCard from "../components/patient/PatientCard";
import PatientTimeline from "../components/patient/PatientTimeline";
import SymptomChip from "../components/ai/SymptomChip";
import RedFlagAlert from "../components/ai/RedFlagAlert";
import DoctorReview from "../components/doctor/DoctorReview";

import { useCase } from "../context/CaseContext";

function CaseDetails() {
  const navigate = useNavigate();
  const { caseData, updateCase } = useCase();

  const verifyCase = () => {
    updateCase({
      status: "Verified"
    });

    alert("Case verified successfully.");
  };

  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main className="case-details-main">
          <div className="case-details-top">
            <button
              className="back-button-inline"
              onClick={() =>
                navigate("/doctor/dashboard")
              }
            >
              <ArrowLeft size={17} />
              Back to cases
            </button>

            <div className="case-id-label">
              {caseData.id}
            </div>
          </div>

          <div className="case-details-heading">
            <div>
              <span className="form-eyebrow">
                PATIENT CASE
              </span>

              <h1>
                {caseData.patient.name}
              </h1>

              <p>
                AI-assisted case prepared for
                clinical review.
              </p>
            </div>

            <div className="verification-status">
              <span className="status-dot" />

              {caseData.status}
            </div>
          </div>

          <PatientCard
            patient={caseData.patient}
          />

          <div className="doctor-case-layout">
            <div className="case-main-column">
              <section className="clinical-section">
                <div className="clinical-section-header">
                  <div>
                    <span>AI EXTRACTED</span>
                    <h2>Presenting symptoms</h2>
                  </div>

                  <Sparkles size={18} />
                </div>

                <div className="symptoms-grid">
                  {caseData.symptoms.map(
                    (symptom, index) => (
                      <SymptomChip
                        key={index}
                        {...symptom}
                      />
                    )
                  )}
                </div>
              </section>

              {caseData.redFlags.map(
                (flag, index) => (
                  <RedFlagAlert
                    key={index}
                    title={flag.title}
                    severity={flag.severity}
                    message={flag.message}
                  />
                )
              )}

              <DoctorReview
                summary={caseData.summary}
              />

              <section className="clinical-section">
                <div className="clinical-section-header">
                  <div>
                    <span>CASE HISTORY</span>
                    <h2>Medical timeline</h2>
                  </div>

                  <Clock3 size={18} />
                </div>

                <PatientTimeline
                  events={caseData.timeline}
                />
              </section>

              <section className="clinical-section">
                <div className="clinical-section-header">
                  <div>
                    <span>DOCUMENTS</span>
                    <h2>Uploaded records</h2>
                  </div>

                  <FileText size={18} />
                </div>

                <div className="doctor-documents">
                  {caseData.documents.map(
                    (document) => (
                      <div
                        className="doctor-document"
                        key={document.id}
                      >
                        <FileText size={19} />

                        <div>
                          <strong>
                            {document.name}
                          </strong>

                          <span>
                            AI processed ·{" "}
                            {document.type}
                          </span>
                        </div>

                        <CheckCircle2 size={17} />
                      </div>
                    )
                  )}
                </div>
              </section>

              <button
                className="verify-case-button"
                onClick={verifyCase}
              >
                <CheckCircle2 size={19} />
                Verify Case
              </button>
            </div>

            <aside className="case-side-column">
              <div className="clinical-ai-panel">
                <div className="ai-card-orb">
                  <Sparkles size={19} />
                </div>

                <span>AI CASE INTELLIGENCE</span>

                <h3>
                  Why this case needs attention
                </h3>

                <p>
                  Persistent abdominal pain was
                  detected during the conversational
                  history.
                </p>

                <div className="ai-panel-divider" />

                <div className="ai-panel-stat">
                  <strong>84%</strong>
                  <span>
                    Information completeness
                  </span>
                </div>

                <div className="ai-panel-stat">
                  <strong>2</strong>
                  <span>
                    Symptoms extracted
                  </span>
                </div>

                <div className="ai-panel-stat warning">
                  <strong>1</strong>
                  <span>
                    Red flag requiring review
                  </span>
                </div>
              </div>

              <div className="doctor-note">
                <ShieldAlert size={18} />

                <p>
                  AI output is an assistive summary,
                  not a diagnosis. Verify all
                  information before clinical use.
                </p>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CaseDetails;