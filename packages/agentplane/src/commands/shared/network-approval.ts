import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import type { PolicyActionId } from "../../policy/taxonomy.js";
import { ensureActionApproved } from "./approval-requirements.js";

export async function ensureNetworkApproved(opts: {
  action?: PolicyActionId;
  config: AgentplaneConfig;
  yes: boolean;
  reason: string;
  interactive?: boolean;
}): Promise<void> {
  await ensureActionApproved({
    action: opts.action ?? "network_access",
    config: opts.config,
    yes: opts.yes,
    reason: opts.reason,
    interactive: opts.interactive,
  });
}
