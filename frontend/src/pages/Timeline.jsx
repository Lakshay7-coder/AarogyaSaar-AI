import {
  ArrowLeft,
  Clock3,
  Sparkles
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import PatientTimeline from "../components/patient/PatientTimeline";

import { useCase } from "../context/CaseContext";

function Timeline() {
  const navigate = useNavigate();
  const { caseData } = useCase();

  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main className="dashboard-main">
          <div className="page-heading">
            <div>
              <button
                className="back-button-inline"
                onClick={() =>
                  navigate("/patient/dashboard")
                }
              >
                <ArrowLeft size={17} />
                Dashboard
              </button>

              <span className="form-eyebrow">
                MEDICAL TIMELINE
              </span>

              <h1>
                Your health journey,
                <br />
                <span>organised.</span>
              </h1>

              <p>
                AarogyaSaar brings information from
                conversations, documents and case
                events into one timeline.
              </p>
            </div>
          </div>

          <div className="timeline-layout">
            <div className="timeline-card">
              <div className="card-heading">
                <div>
                  <span>CASE HISTORY</span>
                  <h2>Medical journey</h2>
                </div>

                <Clock3 size={20} />
              </div>

              <PatientTimeline
                events={caseData.timeline}
              />
            </div>

            <div className="timeline-summary-card">
              <div className="timeline-ai-icon">
                <Sparkles size={20} />
              </div>

              <span>AI TIMELINE INTELLIGENCE</span>

              <h2>
                Your information,
                connected.
              </h2>

              <p>
                AarogyaSaar can connect events from
                your conversation and uploaded
                documents to create a clearer
                chronological picture for your doctor.
              </p>

              <div className="timeline-stat">
                <strong>
                  {caseData.timeline.length}
                </strong>

                <span>case events</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Timeline;