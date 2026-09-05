import {
  Brain,
  Sparkles
} from "lucide-react";

const AdaptiveQuestion = ({
  question,
  extracted = []
}) => {

  return (
    <section className="adaptive-panel">

      <div className="adaptive-header">

        <div className="ai-icon">
          <Sparkles size={18} />
        </div>

        <div>
          <span>
            AAROGYASAAR AI
          </span>

          <h3>
            Case Intelligence
          </h3>
        </div>

      </div>

      {extracted.length > 0 && (

        <div className="extracted-section">

          <span>
            AI EXTRACTED
          </span>

          <div className="extracted-tags">

            {extracted.map(
              (item, index) => (

                <span key={index}>
                  ✓ {item.name}
                </span>
              )
            )}

          </div>

        </div>
      )}

      <div className="next-question">

        <Brain size={20} />

        <div>

          <span>
            NEXT QUESTION
          </span>

          <p>
            {question ||
              "Tell me more about your symptoms."}
          </p>

        </div>

      </div>

    </section>
  );
};

export default AdaptiveQuestion;