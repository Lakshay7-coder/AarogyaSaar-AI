import { Sparkles } from "lucide-react";

function AIInsight({
  title = "AI Insight",
  children
}) {
  return (
    <div className="ai-insight">
      <div className="ai-insight-icon">
        <Sparkles size={17} />
      </div>

      <div>
        <div className="ai-insight-title">
          {title}
        </div>

        <p>{children}</p>
      </div>
    </div>
  );
}

export default AIInsight;