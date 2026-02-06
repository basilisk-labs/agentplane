import type { AgentplaneConfig } from "@agentplaneorg/core";

import { promptYesNo } from "../../cli/prompts.js";
import { CliError } from "../../shared/errors.js";

export async function ensureNetworkApproved(opts: {
  config: AgentplaneConfig;
  yes: boolean;
  reason: string;
  interactive?: boolean;
}): Promise<void> {
  const requireNetwork = opts.config.agents?.approvals.require_network === true;
  if (!requireNetwork) return;
  if (opts.yes) return;

  const interactive = opts.interactive ?? Boolean(process.stdin.isTTY);
  if (!interactive) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Network access requires explicit approval (pass --yes): ${opts.reason}`,
    });
  }

  const approved = await promptYesNo(`Allow network access? ${opts.reason}`, false);
  if (!approved) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Network access denied: ${opts.reason}`,
    });
  }
}
