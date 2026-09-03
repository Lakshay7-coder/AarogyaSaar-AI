import { describe, expect, it } from "vitest";
import axios from "axios";
import {
  createRequestController,
  getApiErrorMessage,
  isRequestCancelled
} from "../services/api";

describe("API reliability helpers", () => {
  it("creates abort controllers for cancellable requests", () => {
    const controller = createRequestController();
    expect(controller).toBeInstanceOf(AbortController);
    expect(controller.signal.aborted).toBe(false);
    controller.abort();
    expect(controller.signal.aborted).toBe(true);
  });

  it("recognizes cancelled requests and exposes safe error messages", () => {
    expect(isRequestCancelled({ code: "ERR_CANCELED" })).toBe(true);
    expect(getApiErrorMessage({ userMessage: "Service unavailable" })).toBe(
      "Service unavailable"
    );
    expect(getApiErrorMessage(new Error("private details"))).toContain(
      "Something went wrong"
    );
    expect(axios.isCancel(axios.CancelToken.source().token)).toBe(false);
  });
});
