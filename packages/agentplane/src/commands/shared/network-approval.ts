import type { AgentplaneConfig } from "@agentplaneorg/core";

import { ensureActionApproved } from "./approval-requirements.js";

export async function ensureNetworkApproved(opts: {
  config: AgentplaneConfig;
  yes: boolean;
  reason: string;
  interactive?: boolean;
}): Promise<void> {
  await ensureActionApproved({
    action: "network_access",
    config: opts.config,
    yes: opts.yes,
    reason: opts.reason,
    interactive: opts.interactive,
  });
}
