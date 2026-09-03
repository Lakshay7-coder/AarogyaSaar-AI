import {
  Users,
  Clock3,
  ShieldAlert,
  CheckCircle2,
  Sparkles
} from "lucide-react";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import StatCard from "../components/doctor/StatCard";
import CaseCard from "../components/doctor/CaseCard";

import { demoPatients } from "../data/demoData";

function DoctorDashboard() {
  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main className="doctor-main">
          <div className="doctor-heading">
            <div>
              <span className="form-eyebrow">
                CLINICAL COMMAND CENTER
              </span>

              <h1>
                Good morning, Dr. Mehta.
              </h1>

              <p>
                Review AI-assisted patient cases
                and focus on clinical decisions.
              </p>
            </div>

            <div className="doctor-ai-status">
              <div>
                <Sparkles size={16} />
              </div>

              <span>
                AI systems operational
              </span>
            </div>
          </div>

          <div className="stats-grid">
            <StatCard
              icon={<Users size={20} />}
              label="Active Cases"
              value="24"
              trend="+4 today"
            />

            <StatCard
              icon={<Clock3 size={20} />}
              label="Awaiting Review"
              value="08"
              trend="Needs attention"
            />

            <StatCard
              icon={<ShieldAlert size={20} />}
              label="Red Flags"
              value="03"
              trend="Priority cases"
              danger
            />

            <StatCard
              icon={<CheckCircle2 size={20} />}
              label="Verified Today"
              value="16"
              trend="+12% this week"
            />
          </div>

          <div className="doctor-content-grid">
            <section className="doctor-cases-panel">
              <div className="section-heading">
                <div>
                  <span>PRIORITY QUEUE</span>
                  <h2>Patient cases</h2>
                </div>

                <button>
                  View all
                </button>
              </div>

              <div className="doctor-case-list">
                {demoPatients.map(
                  (patient) => (
                    <CaseCard
                      key={patient.id}
                      patient={patient}
                    />
                  )
                )}
              </div>
            </section>

            <aside className="doctor-side-panel">
              <div className="doctor-ai-card">
                <div className="ai-card-orb">
                  <Sparkles size={20} />
                </div>

                <span>
                  AAROGYASAAR AI
                </span>

                <h3>
                  Documentation,
                  intelligently assisted.
                </h3>

                <p>
                  AI structures patient narratives,
                  identifies missing information and
                  prepares summaries for your review.
                </p>

                <div className="ai-capability">
                  <span>✓</span>
                  Natural language understanding
                </div>

                <div className="ai-capability">
                  <span>✓</span>
                  Adaptive questioning
                </div>

                <div className="ai-capability">
                  <span>✓</span>
                  Red-flag support
                </div>

                <div className="ai-capability">
                  <span>✓</span>
                  Clinical summary
                </div>
              </div>

              <div className="doctor-principle-card">
                <ShieldAlert size={20} />

                <div>
                  <strong>
                    Human-in-the-loop
                  </strong>

                  <p>
                    AI recommendations never replace
                    professional clinical judgement.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DoctorDashboard;