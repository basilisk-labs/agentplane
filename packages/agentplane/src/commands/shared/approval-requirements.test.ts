import { describe, expect, it, vi } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import * as prompts from "../../cli/prompts.js";
import { CliError } from "../../shared/errors.js";
import { ensureActionApproved, getApprovalRequirements } from "./approval-requirements.js";

describe("approval requirements", () => {
  it("requires approval for network access when require_network=true", () => {
    const config = defaultConfig();
    const req = getApprovalRequirements({ config, action: "recipe_install" });
    expect(req.required).toBe(true);
    expect(req.action).toMatchObject({
      id: "recipe_install",
      family: "recipe",
      approval: "network_access",
    });
  });

  it("does not require force approval by default", () => {
    const config = defaultConfig();
    const req = getApprovalRequirements({ config, action: "force_action" });
    expect(req.required).toBe(false);
    expect(req.action).toMatchObject({
      id: "force_action",
      destructive: true,
    });
  });

  it("conservative profile escalates network and force approvals", () => {
    const config = defaultConfig();
    config.execution.profile = "conservative";
    config.agents.approvals.require_network = false;
    const networkReq = getApprovalRequirements({ config, action: "backend_sync" });
    const forceReq = getApprovalRequirements({ config, action: "force_action" });
    expect(networkReq.required).toBe(true);
    expect(forceReq.required).toBe(true);
  });

  it("throws in non-interactive mode when action requires approval and --yes is missing", async () => {
    const config = defaultConfig();
    await expect(
      ensureActionApproved({
        action: "release_apply",
        config,
        yes: false,
        interactive: false,
        reason: "test",
      }),
    ).rejects.toBeInstanceOf(CliError);
  });

  it("prompts in interactive mode for required actions", async () => {
    const config = defaultConfig();
    const spy = vi.spyOn(prompts, "confirmPrompt").mockResolvedValue(true);
    try {
      await ensureActionApproved({
        action: "recipe_list_remote",
        config,
        yes: false,
        interactive: true,
        reason: "test",
      });
      expect(spy).toHaveBeenCalledTimes(1);
    } finally {
      spy.mockRestore();
    }
  });
});
