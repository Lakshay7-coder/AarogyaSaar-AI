import {
  FileText,
  CheckCircle2,
  MoreVertical
} from "lucide-react";

function DocumentCard({ document }) {
  return (
    <div className="document-card">
      <div className="document-icon">
        <FileText size={23} />
      </div>

      <div className="document-info">
        <strong>{document.name}</strong>
        <span>
          {document.type} · AI processed
        </span>
      </div>

      <div className="document-status">
        <CheckCircle2 size={16} />
        {document.status}
      </div>

      <button className="icon-button">
        <MoreVertical size={18} />
      </button>
    </div>
  );
}

export default DocumentCard;