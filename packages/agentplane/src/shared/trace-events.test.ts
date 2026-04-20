import { describe, expect, it, vi } from "vitest";

import { emitTraceEvent, isTraceEnabled } from "./trace-events.js";

describe("trace events", () => {
  it("recognizes explicit trace opt-in values", () => {
    expect(isTraceEnabled({})).toBe(false);
    expect(isTraceEnabled({ AGENTPLANE_TRACE: "0" })).toBe(false);
    expect(isTraceEnabled({ AGENTPLANE_TRACE: "1" })).toBe(true);
    expect(isTraceEnabled({ AGENTPLANE_TRACE: "true" })).toBe(true);
    expect(isTraceEnabled({ AGENTPLANE_TRACE: "yes" })).toBe(true);
    expect(isTraceEnabled({ AGENTPLANE_TRACE: "on" })).toBe(true);
  });

  it("stays silent unless AGENTPLANE_TRACE is enabled", () => {
    const logger = { write: vi.fn() };
    emitTraceEvent(
      { component: "backend-ops", event: "command_context_loaded" },
      { env: {}, logger },
    );
    expect(logger.write).not.toHaveBeenCalled();
  });

  it("emits structured trace records through the logger when enabled", () => {
    const logger = { write: vi.fn() };
    emitTraceEvent(
      {
        component: "backend-ops",
        event: "command_context_loaded",
        details: { backend: "local" },
      },
      { env: { AGENTPLANE_TRACE: "1" }, logger },
    );
    expect(logger.write).toHaveBeenCalledWith({
      kind: "trace",
      stream: "stderr",
      component: "backend-ops",
      event: "command_context_loaded",
      details: { backend: "local" },
    });
  });
});
