import { applyExecutionToApprovals, type AgentplaneConfig } from "@agentplaneorg/core";

import { promptYesNo } from "../../cli/prompts.js";
import { CliError } from "../../shared/errors.js";

export type ApprovalAction =
  | "network_access"
  | "force_action"
  | "policy_write"
  | "config_write"
  | "dangerous_fs"
  | "git_push";

export type ApprovalRequirement = {
  required: boolean;
  reason: string;
};

export function getApprovalRequirements(opts: {
  config: AgentplaneConfig;
  action: ApprovalAction;
}): ApprovalRequirement {
  const effectiveApprovals = applyExecutionToApprovals({
    execution: opts.config.execution,
    approvals: {
      require_plan: opts.config.agents?.approvals.require_plan === true,
      require_network: opts.config.agents?.approvals.require_network === true,
      require_verify: opts.config.agents?.approvals.require_verify === true,
      require_force: opts.config.agents?.approvals.require_force === true,
    },
  });

  switch (opts.action) {
    case "network_access": {
      const required = effectiveApprovals.require_network === true;
      return {
        required,
        reason: "Network access requires explicit approval",
      };
    }
    case "force_action": {
      return {
        required: effectiveApprovals.require_force === true,
        reason: "Force action requires explicit approval",
      };
    }
    case "policy_write": {
      return { required: false, reason: "Policy writes require explicit approval" };
    }
    case "config_write": {
      return { required: false, reason: "Config writes require explicit approval" };
    }
    case "dangerous_fs": {
      return { required: false, reason: "Potentially dangerous file operations require approval" };
    }
    case "git_push": {
      return { required: false, reason: "Git push requires explicit approval" };
    }
    default: {
      const exhaustive: never = opts.action;
      return exhaustive;
    }
  }
}

export async function ensureActionApproved(opts: {
  action: ApprovalAction;
  config: AgentplaneConfig;
  yes: boolean;
  reason: string;
  interactive?: boolean;
}): Promise<void> {
  const req = getApprovalRequirements({ config: opts.config, action: opts.action });
  if (!req.required) return;
  if (opts.yes) return;

  const interactive = opts.interactive ?? Boolean(process.stdin.isTTY);
  if (!interactive) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `${req.reason} (pass --yes): ${opts.reason}`,
    });
  }

  const approved = await promptYesNo(`Allow ${opts.action}? ${opts.reason}`, false);
  if (!approved) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `${req.reason} denied: ${opts.reason}`,
    });
  }
}
