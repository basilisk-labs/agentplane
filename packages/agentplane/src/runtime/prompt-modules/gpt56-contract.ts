import type { PromptModule } from "./model.js";
import {
  diagnoseGpt55PromptContract,
  type Gpt55PromptContractDiagnostic,
  type Gpt55PromptContractDiagnosticCode,
} from "./gpt55-contract.js";

type Gpt56PromptContractDiagnosticCode =
  | "gpt56_missing_outcome_contract"
  | "gpt56_absolute_rule_in_role_prompt"
  | "gpt56_missing_referenced_role"
  | "gpt56_repeated_gateway_contract";

type Gpt56PromptContractDiagnostic = Omit<Gpt55PromptContractDiagnostic, "code"> & {
  code: Gpt56PromptContractDiagnosticCode;
};

const GPT56_CODE_BY_GPT55_CODE: Record<
  Gpt55PromptContractDiagnosticCode,
  Gpt56PromptContractDiagnosticCode
> = {
  gpt55_missing_outcome_contract: "gpt56_missing_outcome_contract",
  gpt55_absolute_rule_in_role_prompt: "gpt56_absolute_rule_in_role_prompt",
  gpt55_missing_referenced_role: "gpt56_missing_referenced_role",
};

const REPEATED_GATEWAY_CONTRACT_RE =
  /use loaded gateway and policy modules as binding constraints/i;

function moduleText(module: PromptModule): string {
  if (typeof module.content === "string") return module.content;
  return JSON.stringify(module.content);
}

function roleIdForModule(module: PromptModule): string | null {
  if (module.address.surface !== "agent_profile") return null;
  const match = /(?:^|\/)agents\/([A-Z0-9_]+)\.json(?:#|$)/.exec(module.provenance.source_ref);
  return match?.[1] ?? null;
}

function diagnoseRepeatedGatewayContract(modules: PromptModule[]): Gpt56PromptContractDiagnostic[] {
  const diagnostics: Gpt56PromptContractDiagnostic[] = [];
  for (const module of modules) {
    const roleId = roleIdForModule(module);
    if (
      !roleId ||
      module.address.slot !== "workflow" ||
      !REPEATED_GATEWAY_CONTRACT_RE.test(moduleText(module))
    ) {
      continue;
    }
    diagnostics.push({
      severity: "warning",
      code: "gpt56_repeated_gateway_contract",
      role_id: roleId,
      module_address: module.address.value,
      evidence: "use loaded gateway and policy modules as binding constraints",
      message:
        `${roleId} repeats the shared gateway contract in its role prompt. ` +
        "Keep shared autonomy, routing, and policy rules in the gateway and retain only role-specific constraints here.",
    });
  }
  return diagnostics;
}

export function diagnoseGpt56PromptContract(
  modules: PromptModule[],
): Gpt56PromptContractDiagnostic[] {
  const migratedDiagnostics = diagnoseGpt55PromptContract(modules).map(
    (diagnostic): Gpt56PromptContractDiagnostic => ({
      ...diagnostic,
      code: GPT56_CODE_BY_GPT55_CODE[diagnostic.code],
      message: diagnostic.message.replaceAll("GPT-5.5", "GPT-5.6"),
    }),
  );

  return [...migratedDiagnostics, ...diagnoseRepeatedGatewayContract(modules)];
}
