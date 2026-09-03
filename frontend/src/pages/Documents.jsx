import { useEffect, useRef, useState } from "react";

import {
  UploadCloud,
  ArrowLeft,
  FileText,
  Sparkles
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import DocumentCard from "../components/patient/DocumentCard";

import { useCase } from "../context/CaseContext";

export function validateDocumentFile(file) {
  if (!file) return "Choose a document to upload.";
  if (file.size > 10 * 1024 * 1024) {
    return "Choose a file smaller than 10 MB.";
  }

  return "";
}

function Documents() {
  const navigate = useNavigate();
  const { caseData, updateCase } = useCase();

  const [uploading, setUploading] =
    useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);
  const uploadTimeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(uploadTimeoutRef.current);
  }, []);

  const handleUpload = (event) => {
    event?.stopPropagation();
    const file = event?.target?.files?.[0];

    const validationError = validateDocumentFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setUploadError("");
    setUploading(true);

    uploadTimeoutRef.current = setTimeout(() => {
      setUploading(false);

      updateCase((previous) => ({
        documents: [
          ...previous.documents,
          {
            id: Date.now(),
            name: file.name,
            type: file.type.split("/")[1]?.toUpperCase() || "FILE",
            status: "Processed"
          }
        ]
      }));
      event.target.value = "";
    }, 1400);
  };

  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main className="dashboard-main">
          <div className="page-heading">
            <div>
              <button
                className="back-button-inline"
                onClick={() =>
                  navigate("/patient/dashboard")
                }
              >
                <ArrowLeft size={17} />
                Dashboard
              </button>

              <span className="form-eyebrow">
                CASE DOCUMENTS
              </span>

              <h1>Your medical documents.</h1>

              <p>
                Upload previous reports and let
                AarogyaSaar organise relevant
                information.
              </p>
            </div>
          </div>

          <div
            className="upload-zone"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,image/jpeg,image/png"
              onChange={handleUpload}
              hidden
            />
            <div className="upload-icon">
              <UploadCloud size={26} />
            </div>

            <h3>
              {uploading
                ? "Processing document..."
                : "Upload a medical document"}
            </h3>

            <p>
              PDF, JPG or PNG · AI-assisted
              extraction
            </p>

            <button
              className="secondary-btn"
              type="button"
              disabled={uploading}
              onClick={(event) => {
                event.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Choose File
            </button>
            {uploadError && (
              <p className="form-error" role="alert">
                {uploadError}
              </p>
            )}
          </div>

          <div className="documents-header">
            <div>
              <span>YOUR FILES</span>
              <h2>
                {caseData.documents.length} documents
              </h2>
            </div>

            <div className="document-ai-note">
              <Sparkles size={16} />
              AI extraction enabled
            </div>
          </div>

          <div className="documents-list">
            {caseData.documents.map(
              (document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                />
              )
            )}
          </div>

          <div className="document-extraction-preview">
            <FileText size={22} />

            <div>
              <strong>
                What AarogyaSaar can extract
              </strong>

              <p>
                Test names, dates, measurements,
                previous diagnoses and other
                relevant information can be
                structured into the medical timeline.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Documents;