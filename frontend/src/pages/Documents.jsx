import { useState } from "react";

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

function Documents() {
  const navigate = useNavigate();
  const { caseData, updateCase } = useCase();

  const [uploading, setUploading] =
    useState(false);

  const handleUpload = () => {
    setUploading(true);

    setTimeout(() => {
      setUploading(false);

      updateCase({
        documents: [
          ...caseData.documents,
          {
            id: Date.now(),
            name: "Medical_Report.pdf",
            type: "PDF",
            status: "Processed"
          }
        ]
      });
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
            onClick={handleUpload}
          >
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

            <button className="secondary-btn">
              Choose File
            </button>
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