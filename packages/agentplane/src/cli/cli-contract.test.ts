import { describe, expect, it } from "vitest";

import { ERROR_CODE_SUMMARIES } from "../shared/errors.js";
import { ERROR_TO_EXIT, EXIT_CODE_CONTRACT, ExitCode, exitCodeForError } from "./exit-codes.js";

describe("cli contract exit codes", () => {
  it("maps error codes to documented exit codes", () => {
    expect(ERROR_TO_EXIT).toEqual({
      E_USAGE: ExitCode.Usage,
      E_DEPRECATED_FLAG: ExitCode.Usage,
      E_VALIDATION: ExitCode.Validation,
      E_IO: ExitCode.Io,
      E_COMMIT_ALLOW_EMPTY: ExitCode.Usage,
      E_COMMIT_ALLOW_NO_MATCH: ExitCode.Usage,
      E_COMMIT_ALLOW_TASK_ARTIFACT_DENIED: ExitCode.Usage,
      E_PHASE_POLICY: ExitCode.Usage,
      E_GIT: ExitCode.Git,
      E_GIT_LOCKED: ExitCode.Git,
      E_GIT_PERMISSION: ExitCode.Git,
      E_GIT_RACE: ExitCode.Git,
      E_GIT_STAGE_FAILED: ExitCode.Git,
      E_BACKEND: ExitCode.Backend,
      E_NETWORK: ExitCode.Network,
      E_RUNTIME: ExitCode.Runtime,
      E_HANDOFF: ExitCode.Handoff,
      E_INTERNAL: ExitCode.Internal,
    });
    expect(exitCodeForError("E_USAGE")).toBe(ExitCode.Usage);
    expect(exitCodeForError("E_INTERNAL")).toBe(ExitCode.Internal);
  });

  it("publishes one exhaustive runtime metadata inventory", () => {
    expect(EXIT_CODE_CONTRACT).toEqual([
      { code: 0, name: "Success", meaning: "Command completed successfully." },
      {
        code: ExitCode.Internal,
        name: "Internal",
        meaning: "Unexpected or unclassified failure.",
      },
      {
        code: ExitCode.Usage,
        name: "Usage",
        meaning: "Invalid or incomplete command invocation.",
      },
      {
        code: ExitCode.Validation,
        name: "Validation",
        meaning: "Input, schema, or repository invariant validation failed.",
      },
      {
        code: ExitCode.Io,
        name: "IO",
        meaning: "Filesystem or other local IO operation failed.",
      },
      {
        code: ExitCode.Git,
        name: "Git",
        meaning: "Git operation or workflow guardrail failed.",
      },
      {
        code: ExitCode.Backend,
        name: "Backend",
        meaning: "Configured task backend failed.",
      },
      {
        code: ExitCode.Network,
        name: "Network",
        meaning: "Explicitly requested network operation failed.",
      },
      {
        code: ExitCode.Runtime,
        name: "Runtime",
        meaning: "Selected runtime or provider failed.",
      },
      {
        code: ExitCode.Handoff,
        name: "Handoff",
        meaning: "Task or agent handoff failed.",
      },
    ]);
    expect(Object.keys(ERROR_CODE_SUMMARIES)).toEqual(Object.keys(ERROR_TO_EXIT));
    expect([...new Set(Object.values(ERROR_TO_EXIT))].toSorted()).toEqual([
      ExitCode.Internal,
      ExitCode.Usage,
      ExitCode.Validation,
      ExitCode.Io,
      ExitCode.Git,
      ExitCode.Backend,
      ExitCode.Network,
      ExitCode.Runtime,
      ExitCode.Handoff,
    ]);
  });
});
