import {
  ShieldCheck,
  Lock,
  BrainCircuit,
  ArrowRight
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Consent() {
  const navigate = useNavigate();

  return (
    <div className="consent-page">
      <div className="consent-container">
        <div className="consent-icon">
          <ShieldCheck size={32} />
        </div>

        <span className="form-eyebrow">
          STEP 2 · INFORMED CONSENT
        </span>

        <h1>
          Your health story,
          <br />
          <span>your control.</span>
        </h1>

        <p className="consent-intro">
          AarogyaSaar AI will ask questions about
          your current health concerns and organise
          your responses for doctor review.
        </p>

        <div className="consent-points">
          <div>
            <BrainCircuit size={20} />

            <div>
              <strong>
                AI-assisted conversation
              </strong>

              <p>
                AI helps ask relevant follow-up
                questions based on your responses.
              </p>
            </div>
          </div>

          <div>
            <Lock size={20} />

            <div>
              <strong>
                Your information stays protected
              </strong>

              <p>
                Your case information is handled as
                healthcare data and shared for
                clinical review.
              </p>
            </div>
          </div>

          <div>
            <ShieldCheck size={20} />

            <div>
              <strong>
                Doctor remains the final authority
              </strong>

              <p>
                AI does not replace diagnosis or
                professional clinical judgement.
              </p>
            </div>
          </div>
        </div>

        <label className="consent-checkbox">
          <input type="checkbox" id="consent" />

          <span>
            I understand and consent to AI-assisted
            case taking and processing of my
            responses for healthcare purposes.
          </span>
        </label>

        <button
          className="hero-primary full-width"
          onClick={() =>
            navigate("/patient/dashboard")
          }
        >
          I Understand & Continue
          <ArrowRight size={18} />
        </button>

        <button
          className="text-button"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Consent;