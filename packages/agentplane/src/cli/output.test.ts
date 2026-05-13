import { afterEach, describe, expect, it } from "vitest";

import {
  backendNotSupportedMessage,
  createCliEmitter,
  emptyStateMessage,
  emitCommandResult,
  emitCommandResults,
  infoMessage,
  invalidFieldMessage,
  invalidPathMessage,
  invalidValueForFlag,
  invalidValueMessage,
  missingFileMessage,
  missingValueMessage,
  requiredFieldMessage,
  resolveCliPresentationMode,
  successMessage,
  usageMessage,
  warnMessage,
  workflowModeMessage,
} from "./output.js";

function createMemoryWriter(): { text: () => string; write: (chunk: string) => unknown } {
  let value = "";
  return {
    text: () => value,
    write: (chunk: string) => {
      value += chunk;
      return true;
    },
  };
}

describe("cli/output", () => {
  const envSnapshot = { ...process.env };

  afterEach(() => {
    for (const key of Object.keys(process.env)) {
      if (!(key in envSnapshot)) delete process.env[key];
    }
    for (const [key, value] of Object.entries(envSnapshot)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

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

  it("renders ap/agent-mode messages without human decoration", () => {
    process.env.AGENTPLANE_CLI_ALIAS = "ap";

    expect(resolveCliPresentationMode()).toBe("agent");
    expect(successMessage("saved", "file.txt", "ok")).toBe("saved file.txt (ok)");
    expect(infoMessage("note")).toBe("note");
    expect(warnMessage("careful")).toBe("warning: careful");

    const stdout = createMemoryWriter();
    const emitter = createCliEmitter({ stdout, stderr: createMemoryWriter() });
    emitter.report([
      { label: "task_id", value: "TASK-2" },
      { label: "status", value: "ready" },
    ]);
    expect(stdout.text()).toBe(["task_id: TASK-2", "status: ready"].join("\n") + "\n");
  });

  it("formats workflow mode messages", () => {
    expect(workflowModeMessage("direct", "branch_pr")).toBe(
      "Invalid workflow_mode: direct (expected branch_pr)",
    );
    expect(workflowModeMessage(undefined, "branch_pr")).toBe(
      "Invalid workflow_mode: unknown (expected branch_pr)",
    );
  });

  it("creates an emitter that routes text, JSON, JSON sections, warnings, and reports", () => {
    const stdout = createMemoryWriter();
    const stderr = createMemoryWriter();
    const emitter = createCliEmitter({ stdout, stderr });

    emitter.line("plain line");
    emitter.lines(["first", "second"]);
    emitter.json({ ok: true });
    emitter.jsonSection("validation", [{ ok: true }]);
    emitter.report(
      [
        { label: "task_id", value: "TASK-2" },
        { label: "status", value: "ready" },
      ],
      { header: infoMessage("task inspect: TASK-2") },
    );
    emitter.success("saved", "TASK-2");
    emitter.warn("careful");
    emitter.info("secondary", "stderr");

    expect(stdout.text()).toBe(
      [
        "plain line",
        "first",
        "second",
        "{",
        '  "ok": true',
        "}",
        "validation:",
        "  [",
        "    {",
        '      "ok": true',
        "    }",
        "  ]",
        "ℹ️ task inspect: TASK-2",
        "task_id: TASK-2",
        "status:  ready",
        "✅ saved TASK-2",
      ].join("\n") + "\n",
    );
    expect(stderr.text()).toBe(["⚠️ careful", "ℹ️ secondary"].join("\n") + "\n");
  });

  it("emits typed command results through the shared emitter contract", () => {
    const stdout = createMemoryWriter();
    const stderr = createMemoryWriter();
    const emitter = createCliEmitter({ stdout, stderr });

    emitCommandResults(emitter, [
      { kind: "line", text: "plain" },
      { kind: "success", action: "updated", target: "T-1" },
      { kind: "warn", message: "careful" },
    ]);
    emitCommandResult(emitter, {
      kind: "report",
      entries: [{ label: "task_id", value: "T-1" }],
      options: { header: "header" },
    });

    expect(stdout.text()).toBe(
      ["plain", "✅ updated T-1", "header", "task_id: T-1"].join("\n") + "\n",
    );
    expect(stderr.text()).toBe("⚠️ careful\n");
  });

  it("supports json logger mode for emitter events", () => {
    const stdout = createMemoryWriter();
    const emitter = createCliEmitter({ stdout, stderr: createMemoryWriter(), loggerMode: "json" });

    emitter.info("hello");
    const parsed = JSON.parse(stdout.text().trim()) as Record<string, unknown>;
    expect(parsed.kind).toBe("event");
    expect(parsed.level).toBe("info");
    expect(parsed.message).toBe("ℹ️ hello");
  });
});
