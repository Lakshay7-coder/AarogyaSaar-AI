import { Sparkles } from "lucide-react";

function AIOrb({
  listening = false,
  processing = false,
  size = "large"
}) {
  return (
    <div
      className={`ai-orb-wrapper ${size} ${
        listening ? "listening" : ""
      } ${processing ? "processing" : ""}`}
    >
      <div className="ai-orb-ring ring-one" />
      <div className="ai-orb-ring ring-two" />

      <div className="ai-orb">
        <Sparkles size={28} />
      </div>

      <div className="ai-orb-label">
        {listening
          ? "Listening..."
          : processing
          ? "Understanding..."
          : "Aarogya AI"}
      </div>
    </div>
  );
}

export default AIOrb;