import { describe, expect, it } from "vitest";

import { mapBackendError, mapCoreError } from "./error-map.js";
import { ExitCode } from "./exit-codes.js";
import {
  BackendCliError,
  CliError,
  GitError,
  IoError,
  NetworkError,
  ValidationError,
} from "../shared/errors.js";
import { BackendError } from "../backends/task-backend.js";

describe("core error mapping", () => {
  it("maps git repository errors to E_GIT", () => {
    const mapped = mapCoreError(new Error("Not a git repository"), { cmd: "x" });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped).toBeInstanceOf(GitError);
    expect(mapped.code).toBe("E_GIT");
    expect(mapped.exitCode).toBe(ExitCode.Git);
  });

  it("maps detached HEAD branch-resolution errors to E_GIT", () => {
    const mapped = mapCoreError(new Error("Detached HEAD: failed to resolve current branch"), {
      cmd: "x",
    });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped).toBeInstanceOf(GitError);
    expect(mapped.code).toBe("E_GIT");
    expect(mapped.exitCode).toBe(ExitCode.Git);
  });

  it("maps syntax errors to E_VALIDATION", () => {
    const mapped = mapCoreError(new SyntaxError("Unexpected token"), { cmd: "x" });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped).toBeInstanceOf(ValidationError);
    expect(mapped.code).toBe("E_VALIDATION");
    expect(mapped.exitCode).toBe(ExitCode.Validation);
  });

  it("maps other errors to E_IO", () => {
    const mapped = mapCoreError(new Error("boom"), { cmd: "x" });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped).toBeInstanceOf(IoError);
    expect(mapped.code).toBe("E_IO");
    expect(mapped.exitCode).toBe(ExitCode.Io);
  });

  it("passes backend errors through", () => {
    const mapped = mapBackendError(new BackendError("nope", "E_BACKEND"), { cmd: "x" });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped).toBeInstanceOf(BackendCliError);
    expect(mapped.code).toBe("E_BACKEND");
    expect(mapped.exitCode).toBe(ExitCode.Backend);
  });

  it("maps backend network errors to NetworkError", () => {
    const mapped = mapBackendError(new BackendError("offline", "E_NETWORK"), { cmd: "x" });
    expect(mapped).toBeInstanceOf(CliError);
    expect(mapped).toBeInstanceOf(NetworkError);
    expect(mapped.code).toBe("E_NETWORK");
    expect(mapped.exitCode).toBe(ExitCode.Network);
  });
});
