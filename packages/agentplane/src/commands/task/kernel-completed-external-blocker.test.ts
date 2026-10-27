import { describe, expect, it } from "vitest";
import { canonicalBlockerReadmeProjection } from "./kernel-completed-external-blocker.js";

const baseline = `---
revision: 62
comments:
  - author: CODER
    body: Completed implementation
doc_updated_at: "2026-10-26T16:44:00.527Z"
doc_updated_by: CODER
token_usage:
  agent_runs: 3
  cached_input_observed_agent_runs: 0
  cached_input_tokens: null
extensions:
  existing: retained
---
Task body
`;
const pending = { status: "pending", request_digest: "sha256:exact" };
const current = `---
revision: 63
comments:
  - author: CODER
    body: Completed implementation
  - author: SUPERVISOR
    body: Exact blocker
doc_updated_at: "2026-10-26T16:49:20.174Z"
doc_updated_by: SUPERVISOR
token_usage:
  agent_runs: 3
extensions:
  existing: retained
  agentplane.scope_extension_request:
    status: pending
    request_digest: "sha256:exact"
---
Task body
`;

describe("canonical blocker README projection", () => {
  it("accepts the task writer's timestamp and omitted legacy token defaults", () => {
    expect(
      canonicalBlockerReadmeProjection({ baseline, current, body: "Exact blocker", pending }),
    ).toBe(true);
  });

  it.each([
    ["task body", current.replace("Task body", "Altered body")],
    ["token usage", current.replace("agent_runs: 3", "agent_runs: 4")],
    ["writer identity", current.replace("doc_updated_by: SUPERVISOR", "doc_updated_by: UNKNOWN")],
    ["request", current.replace("sha256:exact", "sha256:changed")],
  ])("rejects unrelated %s drift", (_name, changed) => {
    expect(() =>
      canonicalBlockerReadmeProjection({
        baseline,
        current: changed,
        body: "Exact blocker",
        pending,
      }),
    ).toThrow();
  });
});
