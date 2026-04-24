import type { PolicyGatewayFlavor } from "../../../../../shared/policy-gateway.js";
import type { InitFlags, InitDefaults } from "../model.js";
import { INIT_DEFAULTS } from "../presets.js";

import { selectStepValue } from "./prompt-utils.js";
import type { InitPromptClack, PolicyGatewayStepAnswers } from "./contracts.js";

const policyGatewayOptions: { value: PolicyGatewayFlavor; label: string; hint: string }[] = [
  { value: "codex", label: "Codex", hint: "Install AGENTS.md." },
  { value: "claude", label: "Claude", hint: "Install CLAUDE.md." },
];

export async function promptPolicyGatewayStep(opts: {
  clack: InitPromptClack;
  flags: Pick<InitFlags, "policyGateway">;
  defaults?: Pick<InitDefaults, "policyGateway">;
}): Promise<PolicyGatewayStepAnswers> {
  const defaults = opts.defaults ?? INIT_DEFAULTS;
  const policyGateway =
    opts.flags.policyGateway ??
    (await selectStepValue(opts.clack, {
      message: "Policy gateway",
      options: policyGatewayOptions,
      initialValue: defaults.policyGateway,
      cancelMessage: "Policy gateway selection cancelled.",
    }));

  return { policyGateway };
}
