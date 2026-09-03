import { useState } from "react";
import {
  ArrowLeft,
  Activity,
  Mail,
  LockKeyhole,
  UserRound
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] =
    useState("patient");

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    login({
      name:
        role === "doctor"
          ? "Dr. Ananya Mehta"
          : "Amit Sharma",
      email: form.email,
      role
    });

    if (role === "doctor") {
      navigate("/doctor/dashboard");
    } else {
      navigate("/patient/dashboard");
    }
  };

  return (
    <div className="auth-page">
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={17} />
        Back
      </button>

      <div className="auth-layout">
        <div className="auth-brand-panel">
          <div className="auth-brand">
            <div className="brand-icon">
              <Activity size={22} />
            </div>

            <strong>
              AarogyaSaar <span>AI</span>
            </strong>
          </div>

          <div className="auth-panel-content">
            <span>INTELLIGENT HEALTHCARE</span>

            <h1>
              Your story deserves
              <br />
              to be understood.
            </h1>

            <p>
              AI-assisted history taking that
              captures the patient's voice and
              turns it into meaningful clinical
              information.
            </p>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="auth-form-container">
            <span className="form-eyebrow">
              WELCOME BACK
            </span>

            <h2>Sign in to AarogyaSaar</h2>

            <p className="form-description">
              Choose your workspace to continue.
            </p>

            <div className="role-switch">
              <button
                className={
                  role === "patient"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setRole("patient")
                }
                type="button"
              >
                <UserRound size={17} />
                Patient
              </button>

              <button
                className={
                  role === "doctor"
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setRole("doctor")
                }
                type="button"
              >
                <Activity size={17} />
                Doctor
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                Email address

                <div className="input-wrapper">
                  <Mail size={18} />

                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={form.email}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        email:
                          event.target.value
                      })
                    }
                  />
                </div>
              </label>

              <label>
                Password

                <div className="input-wrapper">
                  <LockKeyhole size={18} />

                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={form.password}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        password:
                          event.target.value
                      })
                    }
                  />
                </div>
              </label>

              <Button type="submit">
                Continue
              </Button>
            </form>

            <p className="auth-footer">
              Don't have an account?{" "}
              <button
                onClick={() =>
                  navigate("/register")
                }
              >
                Create one
              </button>
            </p>

            <div className="demo-login">
              <strong>Prototype mode</strong>
              <span>
                Any valid email/password can be
                used for the SIH demonstration.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;