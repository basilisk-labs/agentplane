import type { PromptModule } from "./model.js";

export type Gpt55PromptContractDiagnosticCode =
  | "gpt55_missing_outcome_contract"
  | "gpt55_absolute_rule_in_role_prompt"
  | "gpt55_missing_referenced_role";

export type Gpt55PromptContractDiagnostic = {
  severity: "warning" | "error";
  code: Gpt55PromptContractDiagnosticCode;
  message: string;
  module_address?: string;
  role_id?: string;
  evidence?: string;
};

const OUTCOME_CONTRACT_SECTIONS = [
  { label: "Goal", re: /(?:^|\n)\s*(?:#+\s*)?Goal\s*:/i },
  { label: "Success criteria", re: /(?:^|\n)\s*(?:#+\s*)?Success criteria\s*:/i },
  { label: "Constraints", re: /(?:^|\n)\s*(?:#+\s*)?Constraints\s*:/i },
  { label: "Stop rules", re: /(?:^|\n)\s*(?:#+\s*)?Stop rules\s*:/i },
  { label: "Output", re: /(?:^|\n)\s*(?:#+\s*)?Output\s*:/i },
] as const;

const ABSOLUTE_RULE_RE = /\b(ALWAYS|NEVER|MUST(?:\s+NOT)?)\b/g;
const REFERENCED_ROLE_RE =
  /\b(?:invoke|activate|handoff to|hand off to|route to|delegate to)\s+([A-Z][A-Z0-9_]{2,})\b/g;

function moduleText(module: PromptModule): string {
  if (typeof module.content === "string") return module.content;
  return JSON.stringify(module.content);
}

function roleIdFromSourceRef(sourceRef: string): string | null {
  const match = /(?:^|\/)agents\/([A-Z0-9_]+)\.json(?:#|$)/.exec(sourceRef);
  return match?.[1] ?? null;
}

function roleIdForModule(module: PromptModule): string | null {
  if (module.address.surface !== "agent_profile") return null;
  return roleIdFromSourceRef(module.provenance.source_ref) ?? null;
}

function collectKnownRoleIds(modules: PromptModule[]): Set<string> {
  const ids = new Set<string>();
  for (const module of modules) {
    const roleId = roleIdForModule(module);
    if (roleId) ids.add(roleId);
  }
  return ids;
}

function diagnoseOutcomeContract(modules: PromptModule[]): Gpt55PromptContractDiagnostic[] {
  const workflowByRole = new Map<string, { text: string; addresses: string[] }>();

  for (const module of modules) {
    const roleId = roleIdForModule(module);
    if (!roleId || module.address.slot !== "workflow") continue;
    const current = workflowByRole.get(roleId) ?? { text: "", addresses: [] };
    current.text = `${current.text}\n${moduleText(module)}`;
    current.addresses.push(module.address.value);
    workflowByRole.set(roleId, current);
  }

  const diagnostics: Gpt55PromptContractDiagnostic[] = [];
  for (const [roleId, workflow] of workflowByRole) {
    const missing = OUTCOME_CONTRACT_SECTIONS.filter((section) => !section.re.test(workflow.text));
    if (missing.length === 0) continue;
    diagnostics.push({
      severity: "warning",
      code: "gpt55_missing_outcome_contract",
      role_id: roleId,
      module_address: workflow.addresses[0],
      message:
        `${roleId} workflow does not yet expose the GPT-5.5 outcome-first contract sections: ` +
        `${missing.map((section) => section.label).join(", ")}.`,
    });
  }
  return diagnostics;
}

function diagnoseAbsoluteRules(modules: PromptModule[]): Gpt55PromptContractDiagnostic[] {
  const diagnostics: Gpt55PromptContractDiagnostic[] = [];
  for (const module of modules) {
    const roleId = roleIdForModule(module);
    if (!roleId || module.address.slot !== "workflow") continue;
    const text = moduleText(module);
    const matches = [...text.matchAll(ABSOLUTE_RULE_RE)].map((match) => match[1]);
    if (matches.length === 0) continue;
    diagnostics.push({
      severity: "warning",
      code: "gpt55_absolute_rule_in_role_prompt",
      role_id: roleId,
      module_address: module.address.value,
      evidence: matches.join(", "),
      message:
        `${roleId} workflow uses absolute rule language (${matches.join(", ")}). ` +
        "Keep MUST/NEVER/ALWAYS in gateway or policy modules unless the role line is a true invariant.",
    });
  }
  return diagnostics;
}

function diagnoseReferencedRoles(modules: PromptModule[]): Gpt55PromptContractDiagnostic[] {
  const knownRoleIds = collectKnownRoleIds(modules);
  const diagnostics: Gpt55PromptContractDiagnostic[] = [];

  for (const module of modules) {
    const roleId = roleIdForModule(module);
    if (!roleId) continue;
    const text = moduleText(module);
    for (const match of text.matchAll(REFERENCED_ROLE_RE)) {
      const referencedRole = match[1];
      if (!referencedRole || knownRoleIds.has(referencedRole)) continue;
      diagnostics.push({
        severity: "error",
        code: "gpt55_missing_referenced_role",
        role_id: roleId,
        module_address: module.address.value,
        evidence: referencedRole,
        message: `${roleId} references missing role ${referencedRole}.`,
      });
    }
  }

  return diagnostics;
}

export function diagnoseGpt55PromptContract(
  modules: PromptModule[],
): Gpt55PromptContractDiagnostic[] {
  return [
    ...diagnoseOutcomeContract(modules),
    ...diagnoseAbsoluteRules(modules),
    ...diagnoseReferencedRoles(modules),
  ];
}
