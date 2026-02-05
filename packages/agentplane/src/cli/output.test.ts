import { describe, expect, it } from "vitest";

import {
  backendNotSupportedMessage,
  emptyStateMessage,
  infoMessage,
  invalidFieldMessage,
  invalidPathMessage,
  invalidValueForFlag,
  invalidValueMessage,
  missingFileMessage,
  missingValueMessage,
  requiredFieldMessage,
  successMessage,
  usageMessage,
  warnMessage,
  workflowModeMessage,
} from "./output.js";

describe("cli/output", () => {
  it("formats success and info messages", () => {
    expect(successMessage("done")).toBe("✅ done");
    expect(successMessage("saved", "file.txt")).toBe("✅ saved file.txt");
    expect(successMessage("saved", "file.txt", "ok")).toBe("✅ saved file.txt (ok)");
    expect(infoMessage("note")).toBe("ℹ️ note");
    expect(warnMessage("careful")).toBe("⚠️ careful");
  });

  it("formats usage and backend messages", () => {
    expect(usageMessage("usage")).toBe("usage");
    expect(usageMessage("usage", "example")).toBe("usage\nExample: example");
    expect(backendNotSupportedMessage("sync")).toBe("Backend does not support sync");
  });

  it("formats validation messages", () => {
    expect(missingValueMessage("--flag")).toBe(
      "Missing value for --flag (expected value after flag)",
    );
    expect(invalidValueMessage("label", "x", "y")).toBe("Invalid label: x (expected y)");
    expect(invalidValueForFlag("--flag", "x", "y")).toBe(
      "Invalid value for --flag: x (expected y)",
    );
    expect(requiredFieldMessage("field")).toBe("Missing required field: field");
    expect(requiredFieldMessage("field", "src")).toBe("Missing required field: field (src)");
    expect(invalidFieldMessage("field", "string")).toBe("Invalid field field: expected string");
    expect(invalidFieldMessage("field", "string", "src")).toBe(
      "Invalid field field: expected string (src)",
    );
    expect(invalidPathMessage("path", "bad")).toBe("Invalid path: bad");
    expect(invalidPathMessage("path", "bad", "src")).toBe("Invalid path: bad (src)");
    expect(missingFileMessage("file.txt")).toBe("Missing file.txt");
    expect(missingFileMessage("file.txt", "root")).toBe("Missing file.txt at root");
    expect(emptyStateMessage("tasks")).toBe("No tasks found.");
    expect(emptyStateMessage("tasks", "Create one.")).toBe("No tasks found. Create one.");
  });

  it("formats workflow mode messages", () => {
    expect(workflowModeMessage("direct", "branch_pr")).toBe(
      "Invalid workflow_mode: direct (expected branch_pr)",
    );
    expect(workflowModeMessage(undefined, "branch_pr")).toBe(
      "Invalid workflow_mode: unknown (expected branch_pr)",
    );
  });
});
