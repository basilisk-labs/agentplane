import { describe, expect, it, vi } from "vitest";

import { defaultConfig } from "@agentplaneorg/core";

import * as prompts from "../../cli/prompts.js";
import { CliError } from "../../shared/errors.js";
import { ensureNetworkApproved } from "./network-approval.js";

describe("ensureNetworkApproved", () => {
  it("rejects in non-interactive mode without --yes when require_network=true", async () => {
    const config = defaultConfig();
    const promise = ensureNetworkApproved({
      config,
      yes: false,
      interactive: false,
      reason: "test",
    });
    await expect(promise).rejects.toBeInstanceOf(CliError);
    await expect(promise).rejects.toMatchObject({ code: "E_VALIDATION", exitCode: 3 });
  });

  it("prompts in interactive mode when require_network=true and --yes is not provided", async () => {
    const config = defaultConfig();
    const spy = vi.spyOn(prompts, "promptYesNo").mockResolvedValue(true);
    try {
      await ensureNetworkApproved({
        config,
        yes: false,
        interactive: true,
        reason: "test",
      });
      expect(spy).toHaveBeenCalled();
    } finally {
      spy.mockRestore();
    }
  });

  it("accepts when --yes is provided", async () => {
    const config = defaultConfig();
    const spy = vi.spyOn(prompts, "promptYesNo").mockResolvedValue(true);
    try {
      await ensureNetworkApproved({
        config,
        yes: true,
        interactive: true,
        reason: "test",
      });
      expect(spy).not.toHaveBeenCalled();
    } finally {
      spy.mockRestore();
    }
  });
});
