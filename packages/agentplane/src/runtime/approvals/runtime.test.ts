import { describe, expect, it, vi } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import * as prompts from "../../cli/prompts.js";
import { CliError } from "../../shared/errors.js";

import { ApprovalRuntime, resolveEffectiveApprovalSettings } from "./runtime.js";

describe("runtime/approvals", () => {
  it("resolves effective approvals and applies conservative escalation", () => {
    const config = defaultConfig();
    config.agents.approvals.require_network = false;
    config.agents.approvals.require_force = false;
    config.execution.profile = "conservative";

    expect(resolveEffectiveApprovalSettings(config)).toMatchObject({
      require_plan: true,
      require_network: true,
      require_verify: true,
      require_force: true,
    });
  });

  it("classifies network-gated actions through the shared policy runtime", () => {
    const config = defaultConfig();
    const runtime = new ApprovalRuntime({ config });

    expect(runtime.resolve({ action: "recipe_install" })).toMatchObject({
      action: {
        id: "recipe_install",
        family: "recipe",
        approval: "network_access",
      },
      required: true,
      source: "config",
    });
  });

  it("marks config and dangerous fs actions as builtin approval surfaces without forcing prompts yet", () => {
    const config = defaultConfig();
    const runtime = new ApprovalRuntime({ config });

    expect(runtime.resolve({ action: "config_write" })).toMatchObject({
      required: false,
      source: "builtin",
      action: { approval: "config_write" },
    });
    expect(runtime.resolve({ action: "dangerous_fs" })).toMatchObject({
      required: false,
      source: "builtin",
      action: { approval: "dangerous_fs" },
    });
  });

  it("throws in non-interactive mode when a required approval is missing", async () => {
    const config = defaultConfig();
    const runtime = new ApprovalRuntime({ config });

    await expect(
      runtime.ensure({
        action: "backend_sync",
        yes: false,
        interactive: false,
        reason: "sync",
      }),
    ).rejects.toBeInstanceOf(CliError);
  });

  it("prompts in interactive mode for required approvals", async () => {
    const config = defaultConfig();
    const runtime = new ApprovalRuntime({ config });
    const spy = vi.spyOn(prompts, "confirmPrompt").mockResolvedValue(true);
    try {
      await runtime.ensure({
        action: "release_apply",
        yes: false,
        interactive: true,
        reason: "publish release",
      });
      expect(spy).toHaveBeenCalledTimes(1);
    } finally {
      spy.mockRestore();
    }
  });
});
