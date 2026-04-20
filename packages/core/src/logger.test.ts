import { describe, expect, it } from "vitest";

import { createLogger, resolveLoggerMode } from "./logger.js";

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

describe("logger", () => {
  it("defaults to text mode unless AGENTPLANE_LOG=json", () => {
    expect(resolveLoggerMode({})).toBe("text");
    expect(resolveLoggerMode({ AGENTPLANE_LOG: "json" })).toBe("json");
  });

  it("writes text entries in text mode", () => {
    const stdout = createMemoryWriter();
    const logger = createLogger({ mode: "text", stdout, stderr: stdout });
    logger.write({ kind: "line", text: "plain" });
    logger.write({ kind: "event", level: "info", message: "info" });
    expect(stdout.text()).toBe("plain\ninfo\n");
  });

  it("writes ndjson entries in json mode", () => {
    const stdout = createMemoryWriter();
    const logger = createLogger({ mode: "json", stdout, stderr: stdout });
    logger.write({ kind: "event", level: "success", message: "done", action: "done" });
    const parsed = JSON.parse(stdout.text().trim()) as Record<string, unknown>;
    expect(parsed.kind).toBe("event");
    expect(parsed.level).toBe("success");
    expect(parsed.message).toBe("done");
    expect(parsed.action).toBe("done");
  });

  it("writes trace entries as structured ndjson events", () => {
    const stderr = createMemoryWriter();
    const logger = createLogger({ mode: "json", stdout: stderr, stderr });
    logger.write({
      kind: "trace",
      component: "backend-ops",
      event: "command_context_loaded",
      stream: "stderr",
      details: { backend: "local" },
    });
    const parsed = JSON.parse(stderr.text().trim()) as Record<string, unknown>;
    expect(parsed.component).toBe("backend-ops");
    expect(parsed.event).toBe("command_context_loaded");
    expect(parsed.details).toEqual({ backend: "local" });
  });
});
