import { appendFileSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

export const LIFECYCLE_CONTROL_EVENT_KIND = "agentplane.lifecycle_control_command";

function assertEvent(event, index) {
  if (!event || typeof event !== "object" || Array.isArray(event)) {
    throw new TypeError(`lifecycle control event ${index} must be an object`);
  }
  if (event.kind !== LIFECYCLE_CONTROL_EVENT_KIND) {
    throw new Error(`lifecycle control event ${index} has unsupported kind ${String(event.kind)}`);
  }
  if (typeof event.command !== "string" || event.command.trim() === "") {
    throw new Error(`lifecycle control event ${index} must name its command`);
  }
  if (typeof event.observed_at !== "string" || Number.isNaN(Date.parse(event.observed_at))) {
    throw new TypeError(`lifecycle control event ${index} must have an ISO observed_at timestamp`);
  }
  return event;
}

export function recordLifecycleControlCommand(eventLogPath, event) {
  if (!eventLogPath) return null;
  const normalized = assertEvent(
    {
      schema_version: 1,
      kind: LIFECYCLE_CONTROL_EVENT_KIND,
      observed_at: new Date().toISOString(),
      pid: process.pid,
      ...event,
    },
    1,
  );
  mkdirSync(path.dirname(path.resolve(eventLogPath)), { recursive: true });
  appendFileSync(eventLogPath, `${JSON.stringify(normalized)}\n`, "utf8");
  return normalized;
}

export function readLifecycleControlEvents(eventLogPath) {
  if (!eventLogPath) return [];
  const source = readFileSync(eventLogPath, "utf8");
  return source
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line, index) => {
      try {
        return assertEvent(JSON.parse(line), index + 1);
      } catch (error) {
        throw new Error(`invalid lifecycle control event log line ${index + 1}: ${error.message}`);
      }
    });
}

export function evaluateLifecycleControlBudget(events, maximum = 3) {
  const observed = events.map((event, index) => assertEvent(event, index + 1));
  const threshold = Math.max(0, Math.trunc(maximum));
  return {
    schema_version: 1,
    kind: "agentplane.lifecycle_control_budget",
    provenance: "observed_command_events",
    call_count: observed.length,
    maximum: threshold,
    commands: observed.map((event) => event.command),
    ok: observed.length <= threshold,
  };
}
