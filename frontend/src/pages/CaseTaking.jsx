import { useState } from "react";

import {
  Mic,
  MicOff,
  Send,
  Languages,
  Sparkles,
  ArrowLeft,
  Volume2
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

import AIOrb from "../components/ai/AIOrb";
import Waveform from "../components/ai/Waveform";
import SymptomChip from "../components/ai/SymptomChip";
import AIInsight from "../components/ai/AIInsight";
import RedFlagAlert from "../components/ai/RedFlagAlert";
import CompletenessMeter from "../components/ai/CompletenessMeter";

import CaseProgress from "../components/patient/CaseProgress";

import { useCase } from "../context/CaseContext";

function CaseTaking() {
  const navigate = useNavigate();

  const { caseData, updateCase, addSymptom } =
    useCase();

  const [listening, setListening] =
    useState(false);

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text:
        "Hello Amit. I'm Aarogya AI. I'll ask a few questions to understand your health concern. You can type or speak naturally."
    },
    {
      role: "ai",
      text:
        "What problem brought you here today?"
    }
  ]);

  const startListening = () => {
    setListening(true);

    setTimeout(() => {
      setListening(false);

      const voiceText =
        "मुझे पाँच दिन से पेट में दर्द हो रहा है और खाना खाने के बाद दर्द बढ़ जाता है।";

      setInput(voiceText);
    }, 2200);
  };

  const sendResponse = () => {
    if (!input.trim()) return;

    setMessages((previous) => [
      ...previous,
      {
        role: "patient",
        text: input
      },
      {
        role: "ai",
        text:
          "Thank you. I understood that the pain has been present for about five days and becomes worse after meals. Have you experienced vomiting, fever, or unusual weakness?"
      }
    ]);

    if (
      input
        .toLowerCase()
        .includes("pain")
    ) {
      addSymptom({
        name: "Abdominal Pain",
        severity: "Moderate",
        duration: "5 days"
      });
    }

    updateCase((previous) => ({
      completeness: Math.min(
        previous.completeness + 4,
        100
      )
    }));

    setInput("");
  };

  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main className="case-taking-main">
          <div className="case-topbar">
            <button
              className="back-button-inline"
              onClick={() =>
                navigate("/patient/dashboard")
              }
            >
              <ArrowLeft size={17} />
              Dashboard
            </button>

            <div className="language-control">
              <Languages size={17} />

              <select defaultValue="English">
                <option>English</option>
                <option>हिन्दी</option>
                <option>বাংলা</option>
                <option>मराठी</option>
                <option>தமிழ்</option>
                <option>తెలుగు</option>
              </select>
            </div>
          </div>

          <CaseProgress current={3} />

          <div className="case-taking-layout">
            <section className="conversation-panel">
              <div className="conversation-header">
                <div>
                  <span>AI CASE TAKING</span>

                  <h1>
                    Tell me what you're feeling.
                  </h1>
                </div>

                <div className="secure-label">
                  <span />
                  Private session
                </div>
              </div>

              <div className="ai-conversation">
                {messages.map(
                  (message, index) => (
                    <div
                      className={`conversation-message ${message.role}`}
                      key={index}
                    >
                      {message.role === "ai" && (
                        <div className="message-ai-icon">
                          <Sparkles size={15} />
                        </div>
                      )}

                      <div className="message-bubble">
                        {message.text}

                        {message.role === "ai" &&
                          index ===
                            messages.length - 1 && (
                            <button className="listen-message">
                              <Volume2 size={14} />
                              Listen
                            </button>
                          )}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="voice-zone">
                <AIOrb
                  listening={listening}
                  size="medium"
                />

                <Waveform active={listening} />

                <p>
                  {listening
                    ? "I'm listening..."
                    : "Speak naturally or type your response"}
                </p>

                <button
                  className={`voice-button ${
                    listening ? "recording" : ""
                  }`}
                  onClick={startListening}
                >
                  {listening ? (
                    <MicOff size={22} />
                  ) : (
                    <Mic size={22} />
                  )}
                </button>
              </div>

              <div className="response-input">
                <textarea
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  placeholder="Type your response..."
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey
                    ) {
                      event.preventDefault();
                      sendResponse();
                    }
                  }}
                />

                <button
                  onClick={sendResponse}
                  disabled={!input.trim()}
                >
                  <Send size={18} />
                </button>
              </div>
            </section>

            <aside className="case-intelligence">
              <div className="intelligence-header">
                <div className="ai-mini-icon">
                  <Sparkles size={16} />
                </div>

                <div>
                  <span>LIVE INTELLIGENCE</span>
                  <h3>Case understanding</h3>
                </div>
              </div>

              <CompletenessMeter
                value={caseData.completeness}
              />

              <div className="intelligence-section">
                <div className="section-label">
                  SYMPTOMS IDENTIFIED
                </div>

                <div className="symptoms-list">
                  {caseData.symptoms.map(
                    (symptom, index) => (
                      <SymptomChip
                        key={index}
                        {...symptom}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="intelligence-section">
                <div className="section-label">
                  EXTRACTED INFORMATION
                </div>

                <div className="extracted-list">
                  {caseData.extractedInformation.map(
                    (item, index) => (
                      <div key={index}>
                        <span>✓</span>
                        {item}
                      </div>
                    )
                  )}
                </div>
              </div>

              <AIInsight>
                The next question is selected
                dynamically based on information
                already captured from your response.
              </AIInsight>

              {caseData.redFlags.length > 0 && (
                <RedFlagAlert
                  title={
                    caseData.redFlags[0].title
                  }
                  severity={
                    caseData.redFlags[0].severity
                  }
                  message={
                    caseData.redFlags[0].message
                  }
                />
              )}
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CaseTaking;