import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import { confirmPrompt } from "../../cli/prompts.js";
import { PolicyEngine } from "../../policy/engine.js";
import { CliError } from "../../shared/errors.js";

import type {
  ApprovalRequest,
  ApprovalRequirement,
  ApprovalRuntimeOptions,
  ApprovalResolveOptions,
  EffectiveApprovalSettings,
} from "./model.js";

export function resolveEffectiveApprovalSettings(
  config: AgentplaneConfig,
): EffectiveApprovalSettings {
  const approvals = config.agents?.approvals as
    | {
        require_plan: boolean;
        require_network: boolean;
        require_verify: boolean;
        require_force?: boolean;
      }
    | undefined;
  const base: EffectiveApprovalSettings = {
    require_plan: approvals?.require_plan === true,
    require_network: approvals?.require_network === true,
    require_verify: approvals?.require_verify === true,
    require_force: approvals?.require_force === true,
  };
  if (config.execution.profile === "conservative") {
    return {
      ...base,
      require_network: true,
      require_force: true,
    };
  }
  return base;
}

function resolveRequirement(opts: {
  config: AgentplaneConfig;
  action: ApprovalResolveOptions["action"];
  taskId?: string;
  policy: PolicyEngine;
}): ApprovalRequirement {
  const approvals = resolveEffectiveApprovalSettings(opts.config);
  const decision = opts.policy.evaluate({
    action: opts.action,
    config: opts.config,
    taskId: opts.taskId ?? "",
    git: { stagedPaths: [] },
  });
  const classification = decision.action;
  const configuredNetwork = opts.config.agents?.approvals?.require_network === true;
  const configuredForce = opts.config.agents?.approvals?.require_force === true;
  const conservativeProfile = opts.config.execution.profile === "conservative";

  switch (classification.approval) {
    case "network_access": {
      return {
        action: classification,
        approvals,
        required: approvals.require_network === true,
        source: approvals.require_network
          ? configuredNetwork
            ? "config"
            : conservativeProfile
              ? "execution_profile"
              : "none"
          : "none",
        reason: "Network access requires explicit approval",
      };
    }
    case "force_action": {
      return {
        action: classification,
        approvals,
        required: approvals.require_force === true,
        source: approvals.require_force
          ? configuredForce
            ? "config"
            : conservativeProfile
              ? "execution_profile"
              : "none"
          : "none",
        reason: "Force action requires explicit approval",
      };
    }
    case "policy_write": {
      return {
        action: classification,
        approvals,
        required: false,
        source: "builtin",
        reason: "Policy writes require explicit approval",
      };
    }
    case "config_write": {
      return {
        action: classification,
        approvals,
        required: false,
        source: "builtin",
        reason: "Config writes require explicit approval",
      };
    }
    case "dangerous_fs": {
      return {
        action: classification,
        approvals,
        required: false,
        source: "builtin",
        reason: "Potentially dangerous file operations require approval",
      };
    }
    case "git_push": {
      return {
        action: classification,
        approvals,
        required: false,
        source: "builtin",
        reason: "Git push requires explicit approval",
      };
    }
    default: {
      return {
        action: classification,
        approvals,
        required: false,
        source: "none",
        reason: `${classification.summary} does not require an approval gate`,
      };
    }
  }
}

export class ApprovalRuntime {
  private readonly config: AgentplaneConfig;
  private readonly policy: PolicyEngine;

  constructor(opts: ApprovalRuntimeOptions) {
    this.config = opts.config;
    this.policy = opts.policy ?? new PolicyEngine();
  }

  resolve(opts: ApprovalResolveOptions): ApprovalRequirement {
    return resolveRequirement({
      config: this.config,
      action: opts.action,
      taskId: opts.taskId,
      policy: this.policy,
    });
  }

  async ensure(opts: ApprovalRequest): Promise<ApprovalRequirement> {
    const requirement = this.resolve({
      action: opts.action,
      taskId: opts.taskId,
    });
    if (!requirement.required || opts.yes) return requirement;

    const interactive = opts.interactive ?? Boolean(process.stdin.isTTY);
    if (!interactive) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `${requirement.reason} (pass --yes): ${opts.reason}`,
      });
    }

    const approved = await confirmPrompt(`Allow ${opts.action}? ${opts.reason}`, false);
    if (!approved) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `${requirement.reason} denied: ${opts.reason}`,
      });
    }
    return requirement;
  }
}

export function createApprovalRuntime(opts: ApprovalRuntimeOptions): ApprovalRuntime {
  return new ApprovalRuntime(opts);
}
