import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Consent from "../pages/Consent";
import { MemoryRouter } from "react-router-dom";

function AuthProbe() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <output>{user?.name || "signed out"}</output>
      <button onClick={() => login({ id: "user-1", name: "Test User", role: "patient", phone: "secret" })}>
        login
      </button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

describe("authentication and consent", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => cleanup());

  it("recovers from malformed persisted user data", () => {
    localStorage.setItem("aarogya_user", "{bad json");
    render(<AuthProvider><AuthProbe /></AuthProvider>);

    expect(screen.getByText("signed out")).toBeInTheDocument();
    expect(localStorage.getItem("aarogya_user")).toBeNull();
  });

  it("removes the token and does not persist medical profile fields", () => {
    localStorage.setItem("aarogya_token", "token");
    render(<AuthProvider><AuthProbe /></AuthProvider>);
    fireEvent.click(screen.getByText("login"));

    const savedUser = JSON.parse(localStorage.getItem("aarogya_user"));
    expect(savedUser.phone).toBeUndefined();

    fireEvent.click(screen.getByText("logout"));
    expect(localStorage.getItem("aarogya_token")).toBeNull();
  });

  it("does not allow consent to continue until accepted", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AuthProbe />
          <Consent />
        </AuthProvider>
      </MemoryRouter>
    );

    const continueButton = screen.getByRole("button", { name: /understand/i });
    expect(continueButton).toBeDisabled();
    fireEvent.click(screen.getByRole("checkbox"));
    expect(continueButton).toBeEnabled();
  });
});
