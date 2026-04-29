import { describe, expect, it } from "vitest";

import { normalizePromptFragmentList } from "./index.js";

describe("prompt JSON text fragments", () => {
  it("normalizes structured agent-profile list items as declared fragments", () => {
    const fragments = normalizePromptFragmentList(
      [
        {
          id: "agent.coder.workflow.diff.minimal",
          text: "Keep diffs minimal, task-scoped, and easy to review.",
          mutability: "replaceable",
        },
      ],
      {
        id_prefix: "agent.coder.workflow",
        slot: "workflow",
        source_ref: "packages/agentplane/assets/agents/CODER.json",
      },
    );

    expect(fragments).toEqual([
      {
        id: "agent.coder.workflow.diff.minimal",
        id_source: "declared",
        slot: "workflow",
        text: "Keep diffs minimal, task-scoped, and easy to review.",
        mutability: "replaceable",
        source: {
          kind: "json_object",
          source_ref: "packages/agentplane/assets/agents/CODER.json",
          index: 0,
        },
      },
    ]);
  });

  it("keeps legacy string arrays as generated compatibility fragments", () => {
    const fragments = normalizePromptFragmentList(
      [
        "Keep diffs minimal, task-scoped, and easy to review.",
        {
          id: "agent.coder.workflow.verify.evidence",
          text: "Run declared checks and record evidence.",
          mutability: "append_only",
        },
      ],
      {
        id_prefix: "agent.coder.workflow",
        slot: "workflow",
        source_ref: "packages/agentplane/assets/agents/CODER.json",
      },
    );

    expect(fragments.map((fragment) => fragment.id)).toEqual([
      "agent.coder.workflow.compat.1",
      "agent.coder.workflow.verify.evidence",
    ]);
    expect(fragments[0]).toMatchObject({
      id_source: "generated",
      mutability: "replaceable",
      source: {
        kind: "json_string_compat",
        index: 0,
      },
    });
  });

  it("rejects duplicate declared or generated ids", () => {
    expect(() =>
      normalizePromptFragmentList(
        [
          {
            id: "agent.coder.workflow.diff.minimal",
            text: "One.",
          },
          {
            id: "agent.coder.workflow.diff.minimal",
            text: "Two.",
          },
        ],
        {
          id_prefix: "agent.coder.workflow",
          slot: "workflow",
        },
      ),
    ).toThrow('Duplicate prompt fragment id "agent.coder.workflow.diff.minimal"');
  });
});
