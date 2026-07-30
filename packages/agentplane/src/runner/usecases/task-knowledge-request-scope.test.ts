import { describe, expect, it } from "vitest";

import { canonicalKnowledgeKind } from "./task-knowledge-request-scope.js";

describe("canonicalKnowledgeKind", () => {
  it.each([
    ["context/wiki/architecture.md", "wiki"],
    ["context/raw/AGENTS.md", "source"],
    [".agentplane/context/derived/facts/facts.jsonl#fact=fact:runtime:contract", "fact"],
    [".agentplane/context/derived/graph/entities.jsonl#entity=entity:runtime", "entity"],
    [".agentplane/context/derived/graph/edges.jsonl#edge=edge:runtime", "edge"],
  ] as const)("classifies %s as %s", (ref, expected) => {
    expect(canonicalKnowledgeKind(ref)).toBe(expected);
  });

  it("rejects malformed and unsupported canonical refs", () => {
    expect(canonicalKnowledgeKind(" context/wiki/architecture.md")).toBeNull();
    expect(canonicalKnowledgeKind("context/raw/AGENTS.md#entity=entity:runtime")).toBeNull();
  });
});
