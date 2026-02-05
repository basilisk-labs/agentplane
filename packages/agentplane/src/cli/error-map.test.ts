import { describe, expect, it } from "vitest";

import { mapBackendError, mapCoreError } from "./error-map.js";
import { CliError } from "../errors.js";
import { BackendError } from "../task-backend.js";

describe("core error mapping", () => {
  it("maps git repository errors to E_GIT", () => {
    const mapped = mapCoreError(new Error("Not a git repository"), { cmd: "x" });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped.code).toBe("E_GIT");
  });

  it("maps syntax errors to E_VALIDATION", () => {
    const mapped = mapCoreError(new SyntaxError("Unexpected token"), { cmd: "x" });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped.code).toBe("E_VALIDATION");
  });

  it("maps other errors to E_IO", () => {
    const mapped = mapCoreError(new Error("boom"), { cmd: "x" });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped.code).toBe("E_IO");
  });

  it("passes backend errors through", () => {
    const mapped = mapBackendError(new BackendError("nope", "E_BACKEND"), { cmd: "x" });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped.code).toBe("E_BACKEND");
  });
});
