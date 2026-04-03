import { describe, expect, it } from "vitest";

import { resolveBehavior, stripBehaviorValue } from "./index.js";

describe("resolveBehavior", () => {
  it("enforces the formal precedence order harness > extension > user > builtin", () => {
    const resolved = resolveBehavior({
      key: "runner.policy_gateway",
      candidates: [
        {
          layer: "builtin",
          source: "bundled:policy-gateway:AGENTS.md",
          value: "builtin",
        },
        {
          layer: "user",
          source: ".agentplane/agents/CODER.json",
          value: "user",
        },
        {
          layer: "extension",
          source: "recipe:viewer:agent:RECIPE_AGENT",
          value: "extension",
        },
        {
          layer: "harness",
          source: "AGENTS.md",
          value: "harness",
        },
      ],
    });

    expect(resolved.value).toBe("harness");
    expect(resolved.winner).toMatchObject({
      layer: "harness",
      source: "AGENTS.md",
      selected: true,
    });
    expect(resolved.conflicts.map((entry) => entry.layer)).toEqual([
      "extension",
      "user",
      "builtin",
    ]);
  });

  it("uses explicit order within the same layer and preserves traceability", () => {
    const resolved = resolveBehavior({
      key: "recipe.agent.RECIPE_AGENT",
      candidates: [
        {
          layer: "extension",
          source: "recipe:viewer:agent:RECIPE_AGENT:fallback",
          order: 10,
          value: "fallback",
          metadata: { kind: "fallback" },
        },
        {
          layer: "extension",
          source: ".agentplane/recipes/viewer/agents/recipe.json",
          order: 0,
          value: "file",
          metadata: { kind: "file" },
        },
      ],
    });

    expect(resolved.value).toBe("file");
    expect(stripBehaviorValue(resolved)).toEqual({
      key: "recipe.agent.RECIPE_AGENT",
      winner: {
        layer: "extension",
        source: ".agentplane/recipes/viewer/agents/recipe.json",
        order: 0,
        selected: true,
        metadata: { kind: "file" },
      },
      conflicts: [
        {
          layer: "extension",
          source: "recipe:viewer:agent:RECIPE_AGENT:fallback",
          order: 10,
          selected: false,
          metadata: { kind: "fallback" },
        },
      ],
      trace: [
        {
          layer: "extension",
          source: ".agentplane/recipes/viewer/agents/recipe.json",
          order: 0,
          selected: true,
          metadata: { kind: "file" },
        },
        {
          layer: "extension",
          source: "recipe:viewer:agent:RECIPE_AGENT:fallback",
          order: 10,
          selected: false,
          metadata: { kind: "fallback" },
        },
      ],
    });
  });

  it("fails fast when callers try to resolve an empty candidate set", () => {
    expect(() =>
      resolveBehavior({
        key: "runner.owner_profile",
        candidates: [],
      }),
    ).toThrow("Behavior resolution requires at least one candidate");
  });
});
