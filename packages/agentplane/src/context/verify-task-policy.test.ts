import { describe, expect, it } from "vitest";

import { isTaskPathMatch, readAllowed } from "./verify-task-policy.js";

describe("context verify-task policy", () => {
  it("allows maximum-assimilation derived roots required by structural validators", () => {
    const taskId = "202605191451-CTXMAX";
    const allowed = readAllowed({ mode: "maximum_assimilation" }, taskId);

    expect(
      isTaskPathMatch(".agentplane/context/derived/claims/decisions.jsonl", allowed, taskId),
    ).toBe(true);
    expect(
      isTaskPathMatch(
        ".agentplane/context/derived/ontology/entity-resolution.jsonl",
        allowed,
        taskId,
      ),
    ).toBe(true);
    expect(
      isTaskPathMatch(".agentplane/context/derived/sources/source-spans.jsonl", allowed, taskId),
    ).toBe(true);
    expect(
      isTaskPathMatch(".agentplane/context/derived/wiki/topology.plan.json", allowed, taskId),
    ).toBe(true);
  });
});
