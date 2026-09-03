import {
  Search,
  Filter
} from "lucide-react";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import CaseCard from "../components/doctor/CaseCard";

import { demoPatients } from "../data/demoData";

function PatientCases() {
  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-body">
        <Sidebar />

        <main className="doctor-main">
          <div className="doctor-heading">
            <div>
              <span className="form-eyebrow">
                PATIENT MANAGEMENT
              </span>

              <h1>Patient cases</h1>

              <p>
                Review structured patient
                information prepared by AarogyaSaar.
              </p>
            </div>
          </div>

          <div className="case-filters">
            <div className="search-box">
              <Search size={18} />

              <input
                placeholder="Search patient or case ID..."
              />
            </div>

            <button className="filter-button">
              <Filter size={17} />
              Filter
            </button>
          </div>

          <div className="doctor-case-list">
            {demoPatients.map(
              (patient) => (
                <CaseCard
                  key={patient.id}
                  patient={patient}
                />
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default PatientCases;