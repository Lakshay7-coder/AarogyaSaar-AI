import {
  Search,
  Filter
} from "lucide-react";
import { useMemo, useState } from "react";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import CaseCard from "../components/doctor/CaseCard";

import { demoPatients } from "../data/demoData";

function PatientCases() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return demoPatients.filter((patient) => {
      const matchesSearch =
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.complaint.toLowerCase().includes(query);
      const matchesFilter =
        filter === "All" || patient.priority === filter;

      return matchesSearch && matchesFilter;
    });
  }, [filter, search]);

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
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search patient cases"
              />
            </div>

            <label className="filter-select">
              <Filter size={17} />
              <span className="sr-only">Filter by priority</span>
              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                aria-label="Filter cases by priority"
              >
                <option>All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>
          </div>

          <div className="doctor-case-list">
            {filteredPatients.map(
              (patient) => (
                <CaseCard
                  key={patient.id}
                  patient={patient}
                />
              )
            )}
            {!filteredPatients.length && (
              <div className="empty-state">
                <strong>No matching cases</strong>
                <p>Try a different patient, case ID, or priority.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default PatientCases;