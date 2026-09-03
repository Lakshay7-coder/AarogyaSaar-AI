import {
  CircleCheck,
  Sparkles,
  AlertTriangle,
  UserRound
} from "lucide-react";

function PatientTimeline({ events = [] }) {
  const getIcon = (type) => {
    if (type === "ai") return <Sparkles size={16} />;
    if (type === "warning")
      return <AlertTriangle size={16} />;

    if (type === "registration")
      return <UserRound size={16} />;

    return <CircleCheck size={16} />;
  };

  return (
    <div className="timeline">
      {events.map((event, index) => (
        <div
          className="timeline-item"
          key={`${event.title}-${index}`}
        >
          <div
            className={`timeline-icon ${event.type}`}
          >
            {getIcon(event.type)}
          </div>

          <div className="timeline-content">
            <span>{event.date}</span>
            <h4>{event.title}</h4>
            <p>{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PatientTimeline;