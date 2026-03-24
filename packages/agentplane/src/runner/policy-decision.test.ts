import { describe, expect, it } from "vitest";

import { buildRunnerPolicyDecision } from "./policy-decision.js";

describe("buildRunnerPolicyDecision", () => {
  it("marks supported native fields as enforced and unsupported/advisory fields distinctly", () => {
    const decision = buildRunnerPolicyDecision({
      adapter_id: "codex",
      capabilities: {
        adapter_id: "codex",
        fields: {
          mode: {
            level: "advisory",
            channel: "env",
          },
          sandbox: {
            level: "native",
            channel: "argv",
            supported_values: ["read-only", "workspace-write"],
          },
        },
      },
      recipe: {
        recipe_id: "viewer",
        scenario_id: "SCENARIO",
        run_profile: {
          mode: "analysis",
          sandbox: "read-only",
          writes_artifacts_to: ["reports"],
        },
      },
    });

    expect(decision.requested).toEqual({
      mode: "analysis",
      sandbox: "read-only",
      writes_artifacts_to: ["reports"],
    });
    expect(decision.effective).toEqual({
      sandbox: "read-only",
    });
    expect(decision.fields.mode).toMatchObject({
      requested: "analysis",
      status: "advisory",
      capability_level: "advisory",
      channel: "env",
    });
    expect(decision.fields.sandbox).toMatchObject({
      requested: "read-only",
      effective: "read-only",
      status: "enforced",
      capability_level: "native",
      channel: "argv",
    });
    expect(decision.fields.writes_artifacts_to).toMatchObject({
      requested: ["reports"],
      status: "unsupported",
      capability_level: "unsupported",
      channel: "none",
    });
    expect(decision.refusal_reason).toBeNull();
  });

  it("marks wrapper-enforced sandbox fields as enforced when the adapter advertises wrapper support", () => {
    const decision = buildRunnerPolicyDecision({
      adapter_id: "custom",
      capabilities: {
        adapter_id: "custom",
        fields: {
          sandbox: {
            level: "wrapper",
            channel: "argv",
            supported_values: ["workspace-write"],
          },
        },
      },
      recipe: {
        recipe_id: "viewer",
        scenario_id: "SCENARIO",
        run_profile: {
          sandbox: "workspace-write",
        },
      },
    });

    expect(decision.requested).toEqual({
      sandbox: "workspace-write",
    });
    expect(decision.effective).toEqual({
      sandbox: "workspace-write",
    });
    expect(decision.fields.sandbox).toMatchObject({
      requested: "workspace-write",
      effective: "workspace-write",
      status: "enforced",
      capability_level: "wrapper",
      channel: "argv",
    });
  });
});
