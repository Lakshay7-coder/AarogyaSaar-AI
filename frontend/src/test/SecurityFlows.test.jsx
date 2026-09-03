import { render, screen, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ProtectedRoute } from "../App";
import { getDemoCaseForId } from "../pages/CaseDetails";
import { validateDocumentFile } from "../pages/Documents";
import { demoCase } from "../data/demoData";

describe("authorization, case routing, and uploads", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => cleanup());

  it("blocks a patient from doctor routes", () => {
    localStorage.setItem(
      "aarogya_user",
      JSON.stringify({ id: "patient-1", role: "patient", consentAt: "now" })
    );

    render(
      <MemoryRouter initialEntries={["/doctor"]}>
        <AuthProvider>
          <Routes>
            <Route
              path="/doctor"
              element={
                <ProtectedRoute roles={["doctor"]}>
                  <span>doctor content</span>
                </ProtectedRoute>
              }
            />
            <Route path="/patient/dashboard" element={<span>patient home</span>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.queryByText("doctor content")).not.toBeInTheDocument();
  });

  it("resolves the requested case instead of the default case", () => {
    const selectedCase = getDemoCaseForId(demoCase, "CASE-2026-002");

    expect(selectedCase.patient.name).toBe("Priya Verma");
    expect(selectedCase.id).toBe("CASE-2026-002");
    expect(getDemoCaseForId(demoCase, "unknown")).toBeNull();
  });

  it("rejects oversized documents before upload", () => {
    const file = new File(["report"], "report.pdf", {
      type: "application/pdf"
    });
    Object.defineProperty(file, "size", { value: 11 * 1024 * 1024 });

    expect(validateDocumentFile(file)).toContain("10 MB");
    expect(validateDocumentFile(null)).toContain("Choose");
  });
});
