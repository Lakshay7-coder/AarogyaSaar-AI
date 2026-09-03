import { useState } from "react";
import {
  ArrowLeft,
  UserRound,
  Phone,
  CalendarDays,
  ArrowRight
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    login({
      name: form.name,
      email: `${form.name
        .toLowerCase()
        .replaceAll(" ", ".")}@demo.com`,
      role: "patient"
    });

    navigate("/consent");
  };

  return (
    <div className="registration-page">
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={17} />
        Back
      </button>

      <div className="registration-container">
        <div className="registration-header">
          <div className="hero-badge">
            STEP 1 · PATIENT REGISTRATION
          </div>

          <h1>
            Let's begin with
            <br />
            <span>you.</span>
          </h1>

          <p>
            Tell us a few basic details before
            AarogyaSaar begins understanding your
            health story.
          </p>
        </div>

        <form
          className="registration-form"
          onSubmit={handleSubmit}
        >
          <div className="form-grid">
            <label>
              Full name

              <div className="input-wrapper">
                <UserRound size={18} />

                <input
                  required
                  placeholder="Amit Sharma"
                  value={form.name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      name: event.target.value
                    })
                  }
                />
              </div>
            </label>

            <label>
              Age

              <div className="input-wrapper">
                <CalendarDays size={18} />

                <input
                  required
                  type="number"
                  min="1"
                  max="120"
                  placeholder="35"
                  value={form.age}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      age: event.target.value
                    })
                  }
                />
              </div>
            </label>

            <label>
              Gender

              <select
                value={form.gender}
                onChange={(event) =>
                  setForm({
                    ...form,
                    gender: event.target.value
                  })
                }
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </label>

            <label>
              Mobile number

              <div className="input-wrapper">
                <Phone size={18} />

                <input
                  required
                  type="tel"
                  placeholder="+91 98XXXXXXXX"
                  value={form.phone}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      phone: event.target.value
                    })
                  }
                />
              </div>
            </label>
          </div>

          <div className="registration-note">
            Your information is used only to create
            your healthcare case.
          </div>

          <button
            className="hero-primary full-width"
            type="submit"
          >
            Continue to Consent
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;