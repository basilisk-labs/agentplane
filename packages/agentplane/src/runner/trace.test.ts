import { describe, expect, it } from "vitest";

import { RUNNER_TRACE_SCHEMA_VERSION } from "./types.js";
import { createRunnerTraceEvent, serializeRunnerTraceEvent } from "./trace.js";

describe("createRunnerTraceEvent", () => {
  it("normalizes JSON-object lines into typed json events", () => {
    const event = createRunnerTraceEvent({
      ts: "2026-03-24T09:00:00.000Z",
      seq: 7,
      stream: "stdout",
      adapter_id: "codex",
      raw: '{"type":"item.completed","ok":true}\n',
    });

    expect(event).toEqual({
      schema_version: RUNNER_TRACE_SCHEMA_VERSION,
      ts: "2026-03-24T09:00:00.000Z",
      seq: 7,
      stream: "stdout",
      adapter_id: "codex",
      kind: "json_event",
      raw: '{"type":"item.completed","ok":true}',
      parsed: {
        type: "item.completed",
        ok: true,
      },
    });
  });

  it("preserves plain-text lines as text events", () => {
    const event = createRunnerTraceEvent({
      ts: "2026-03-24T09:00:01.000Z",
      seq: 8,
      stream: "stderr",
      adapter_id: "custom",
      raw: "plain stderr text\r\n",
    });

    expect(event).toEqual({
      schema_version: RUNNER_TRACE_SCHEMA_VERSION,
      ts: "2026-03-24T09:00:01.000Z",
      seq: 8,
      stream: "stderr",
      adapter_id: "custom",
      kind: "text",
      raw: "plain stderr text",
    });
  });

  it("serializes trace events as newline-delimited JSON records", () => {
    const record = serializeRunnerTraceEvent(
      createRunnerTraceEvent({
        ts: "2026-03-24T09:00:02.000Z",
        seq: 9,
        stream: "stdout",
        adapter_id: "codex",
        raw: "not-json",
      }),
    );

    expect(record.endsWith("\n")).toBe(true);
    expect(JSON.parse(record)).toMatchObject({
      schema_version: RUNNER_TRACE_SCHEMA_VERSION,
      seq: 9,
      stream: "stdout",
      adapter_id: "codex",
      kind: "text",
      raw: "not-json",
    });
  });
});
