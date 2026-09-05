import {
  AlertTriangle,
  ShieldAlert
} from "lucide-react";

const RedFlagCard = ({
  flags = []
}) => {

  if (!flags.length) {
    return (
      <div className="red-flag-safe">
        <ShieldAlert size={20} />

        <div>
          <strong>
            No potential red flags detected
          </strong>

          <span>
            Continue completing the case.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="red-flag-list">

      {flags.map(
        (flag, index) => (

          <div
            className={`red-flag-card ${flag.severity?.toLowerCase()}`}
            key={index}
          >

            <AlertTriangle size={22} />

            <div>

              <strong>
                {flag.title}
              </strong>

              <p>
                {flag.description}
              </p>

              <span>
                Severity:{" "}
                {flag.severity}
              </span>

            </div>

          </div>
        )
      )}

    </div>
  );
};

export default RedFlagCard;