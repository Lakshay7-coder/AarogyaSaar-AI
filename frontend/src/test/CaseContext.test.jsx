import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { CaseProvider, useCase } from "../context/CaseContext";

function CaseProbe() {
  const { login } = useAuth();
  const { caseData, addSymptom } = useCase();

  return (
    <div>
      <output data-testid="owner">{caseData.patient.name}</output>
      <output data-testid="symptoms">{caseData.symptoms.length}</output>
      <button onClick={() => login({ id: "patient-a", name: "Patient A", role: "patient" })}>A</button>
      <button onClick={() => login({ id: "patient-b", name: "Patient B", role: "patient" })}>B</button>
      <button onClick={() => addSymptom({ name: "New symptom" })}>add</button>
    </div>
  );
}

describe("case isolation", () => {
  beforeEach(() => localStorage.clear());

  it("keeps case changes isolated by authenticated user", () => {
    render(
      <AuthProvider>
        <CaseProvider>
          <CaseProbe />
        </CaseProvider>
      </AuthProvider>
    );

    act(() => fireEvent.click(screen.getByText("A")));
    expect(screen.getByTestId("owner")).toHaveTextContent("Patient A");
    act(() => fireEvent.click(screen.getByText("add")));
    expect(screen.getByTestId("symptoms")).toHaveTextContent("3");

    act(() => fireEvent.click(screen.getByText("B")));
    expect(screen.getByTestId("owner")).toHaveTextContent("Patient B");
    expect(screen.getByTestId("symptoms")).toHaveTextContent("2");

    act(() => fireEvent.click(screen.getByText("A")));
    expect(screen.getByTestId("symptoms")).toHaveTextContent("3");
  });
});
