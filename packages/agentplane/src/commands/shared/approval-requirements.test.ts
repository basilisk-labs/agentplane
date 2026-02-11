import { describe, expect, it, vi } from "vitest";

import { defaultConfig } from "@agentplaneorg/core";

import * as prompts from "../../cli/prompts.js";
import { CliError } from "../../shared/errors.js";
import { ensureActionApproved, getApprovalRequirements } from "./approval-requirements.js";

describe("approval requirements", () => {
  it("requires approval for network access when require_network=true", () => {
    const config = defaultConfig();
    const req = getApprovalRequirements({ config, action: "network_access" });
    expect(req.required).toBe(true);
  });

  it("does not require force approval by default", () => {
    const config = defaultConfig();
    const req = getApprovalRequirements({ config, action: "force_action" });
    expect(req.required).toBe(false);
  });

  it("conservative profile escalates network and force approvals", () => {
    const config = defaultConfig();
    config.execution.profile = "conservative";
    config.agents.approvals.require_network = false;
    const networkReq = getApprovalRequirements({ config, action: "network_access" });
    const forceReq = getApprovalRequirements({ config, action: "force_action" });
    expect(networkReq.required).toBe(true);
    expect(forceReq.required).toBe(true);
  });

  it("throws in non-interactive mode when action requires approval and --yes is missing", async () => {
    const config = defaultConfig();
    await expect(
      ensureActionApproved({
        action: "network_access",
        config,
        yes: false,
        interactive: false,
        reason: "test",
      }),
    ).rejects.toBeInstanceOf(CliError);
  });

  it("prompts in interactive mode for required actions", async () => {
    const config = defaultConfig();
    const spy = vi.spyOn(prompts, "promptYesNo").mockResolvedValue(true);
    try {
      await ensureActionApproved({
        action: "network_access",
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
