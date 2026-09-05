
import {
  ArrowRight,
  Mic,
  Languages,
  ShieldCheck,
  Sparkles,
  Activity,
  BrainCircuit
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import AIOrb from "../components/ai/AIOrb";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="landing-nav">
        <div
          className="brand"
          onClick={() => navigate("/")}
        >
          <div className="brand-icon">
            <Activity size={21} />
          </div>

          <div>
            <strong>AarogyaSaar</strong>
            <span>AI</span>
          </div>
        </div>

        <div className="landing-nav-actions">
          <button
            className="nav-link"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="nav-primary"
            onClick={() => navigate("/register")}
          >
            Start a Case
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      <main className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={15} />
            AI-assisted clinical case taking
          </div>

          <h1>
            From patient's
            <br />
            <span>story</span> to doctor's
            <br />
            summary.
          </h1>

          <p className="hero-description">
            AarogyaSaar AI transforms natural patient
            conversations into structured clinical
            information — helping doctors understand
            the complete story faster.
          </p>

          <div className="hero-actions">
            <button
              className="hero-primary"
              onClick={() => navigate("/register")}
            >
              Start Patient Case
              <ArrowRight size={18} />
            </button>

            <button
              className="hero-secondary"
              onClick={() =>
                navigate("/login?role=doctor")
              }
            >
              Doctor Login
            </button>
          </div>

          <div className="hero-features">
            <div>
              <Mic size={17} />
              <span>Voice enabled</span>
            </div>

            <div>
              <Languages size={17} />
              <span>Multilingual</span>
            </div>

            <div>
              <BrainCircuit size={17} />
              <span>AI assisted</span>
            </div>

            <div>
              <ShieldCheck size={17} />
              <span>Doctor verified</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-glow" />

          <AIOrb />

          <div className="floating-card floating-card-one">
            <span>LIVE EXTRACTION</span>

            <strong>
              Abdominal Pain
            </strong>

            <small>
              Duration · 5 days
            </small>
          </div>

          <div className="floating-card floating-card-two">
            <div className="floating-status">
              <span />
              AI listening
            </div>

            <div className="tiny-wave">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>

          <div className="floating-card floating-card-three">
            <span>CASE COMPLETENESS</span>

            <strong>84%</strong>

            <div className="mini-progress">
              <div style={{ width: "84%" }} />
            </div>
          </div>
        </div>
      </main>

      <section className="landing-trust">
        <span>
          Designed for patient-first healthcare workflows
        </span>

        <div>
          Human-in-the-loop
          <span>•</span>
          Privacy-aware
          <span>•</span>
          Clinical decision support
        </div>
      </section>
    </div>
  );
}

export default Landing;