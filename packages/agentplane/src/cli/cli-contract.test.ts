import { describe, expect, it } from "vitest";

import { ERROR_TO_EXIT, ExitCode, exitCodeForError } from "./exit-codes.js";

describe("cli contract exit codes", () => {
  it("maps error codes to documented exit codes", () => {
    expect(ERROR_TO_EXIT).toEqual({
      E_USAGE: ExitCode.Usage,
      E_DEPRECATED_FLAG: ExitCode.Usage,
      E_VALIDATION: ExitCode.Validation,
      E_IO: ExitCode.Io,
      E_GIT: ExitCode.Git,
      E_GIT_LOCKED: ExitCode.Git,
      E_BACKEND: ExitCode.Backend,
      E_NETWORK: ExitCode.Network,
      E_RUNTIME: ExitCode.Runtime,
      E_HANDOFF: ExitCode.Handoff,
      E_INTERNAL: ExitCode.Internal,
    });
    expect(exitCodeForError("E_USAGE")).toBe(ExitCode.Usage);
    expect(exitCodeForError("E_INTERNAL")).toBe(ExitCode.Internal);
  });
});
