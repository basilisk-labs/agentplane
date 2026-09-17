import type {
  NativeEvidenceRequirement,
  NativeLifecycleObligation,
  NativeLifecycleObligationId,
  NativeSemanticCapabilityInput,
  NativeSemanticToolClass,
  NativeStopRule,
  NativeTaskObligationInput,
  NativeTaskObligations,
  NativeTaskProfile,
} from "./model.js";
import {
  COMPATIBILITY_PROFILE,
  CORE_STOP_RULES,
  evidenceRequirements,
  PROFILE_REQUIRED_PROMPT_BLOCKS,
  PROFILE_STOP_RULES,
  PROFILE_TASK_KINDS,
} from "./catalog.js";

const SECURITY_POLICY = ".agentplane/policy/security.must.md";
const CORE_DOD_POLICY = ".agentplane/policy/dod.core.md";

function uniqueSorted(values: readonly string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].toSorted();
}

function inferredTaskKind(input: NativeTaskObligationInput): string {
  if (input.task_kind?.trim()) return input.task_kind.trim();
  if (input.mutation_scope === "docs") return "docs";
  if (input.mutation_scope === "code") return "code";
  if (input.mutation_scope === "release") return "release";
  if (input.mutation_scope === "ops") return "ops";
  if (input.mutation_scope === "context") return "context";
  const effects = new Set(input.execution_contract?.declaration.repository_effects);
  if (effects.has("release_metadata")) return "release";
  if (effects.has("source_code") || effects.has("tests")) return "code";
  if (effects.has("documentation")) return "docs";
  return "analysis";
}

function baseProfile(taskKind: string): NativeTaskProfile {
  if (taskKind === "content") return "content";
  if (taskKind === "docs") return "docs";
  if (taskKind === "code") return "code";
  if (taskKind === "context") return "context";
  if (taskKind === "release") return "release";
  if (taskKind === "ops") return "ops";
  return "analysis";
}

function resolveProfile(input: NativeTaskObligationInput, taskKind: string): NativeTaskProfile {
  const preference = input.compatibility_preference?.trim();
  if (preference && Object.hasOwn(COMPATIBILITY_PROFILE, preference)) {
    return COMPATIBILITY_PROFILE[preference as keyof typeof COMPATIBILITY_PROFILE];
  }
  const risks = new Set(input.risk_flags);
  if (
    risks.has("credentials") ||
    risks.has("security") ||
    risks.has("external_system") ||
    risks.has("deploy")
  ) {
    return "ops";
  }
  if (risks.has("publish")) return "release";
  return baseProfile(taskKind);
}

function workflowPolicy(mode: "direct" | "branch_pr"): string {
  return `.agentplane/policy/workflow.${mode}.md`;
}

function repositoryMutation(input: NativeTaskObligationInput): boolean {
  return (
    (input.mutation_scope !== undefined &&
      input.mutation_scope !== null &&
      input.mutation_scope !== "none") ||
    (input.execution_contract?.declaration.repository_effects.length ?? 0) > 0
  );
}

function policyModules(opts: {
  input: NativeTaskObligationInput;
  profile: NativeTaskProfile;
}): string[] {
  const routePolicy = workflowPolicy(opts.input.selected_mode);
  if (
    (opts.profile === "analysis" || opts.profile === "content") &&
    !repositoryMutation(opts.input)
  ) {
    return [];
  }
  if (opts.profile === "docs") {
    return [SECURITY_POLICY, CORE_DOD_POLICY, ".agentplane/policy/dod.docs.md", routePolicy];
  }
  if (
    opts.profile === "code" ||
    opts.profile === "benchmark" ||
    opts.profile === "regression" ||
    opts.profile === "post_run_review"
  ) {
    return [SECURITY_POLICY, CORE_DOD_POLICY, ".agentplane/policy/dod.code.md", routePolicy];
  }
  if (opts.profile === "context" || opts.profile === "context_maximum") {
    return [SECURITY_POLICY, CORE_DOD_POLICY, ".agentplane/policy/context.must.md", routePolicy];
  }
  if (opts.profile === "release") {
    return [
      SECURITY_POLICY,
      CORE_DOD_POLICY,
      ".agentplane/policy/dod.code.md",
      routePolicy,
      ".agentplane/policy/workflow.release.md",
    ];
  }
  return [SECURITY_POLICY, CORE_DOD_POLICY, routePolicy];
}

function contractEvidence(input: NativeTaskObligationInput): NativeEvidenceRequirement[] {
  return (input.execution_contract?.verification.required_evidence ?? []).map((id) => ({
    id,
    kind: "execution_contract",
    required: true,
    description: id,
  }));
}

function stopRules(opts: {
  input: NativeTaskObligationInput;
  profile: NativeTaskProfile;
  taskKind: string;
}): NativeStopRule[] {
  const rules = [...CORE_STOP_RULES, ...(PROFILE_STOP_RULES[opts.profile] ?? [])];
  const preference = opts.input.compatibility_preference?.trim();
  if (preference && !Object.hasOwn(COMPATIBILITY_PROFILE, preference)) {
    rules.push({
      id: "unsupported_execution_preference",
      severity: "approval_required",
      reason: `Execution preference ${preference} requires explicit Recipe or manual migration.`,
    });
  }
  if (!PROFILE_TASK_KINDS[opts.profile].includes(opts.taskKind)) {
    rules.push({
      id: "task_kind_incompatible",
      severity: "approval_required",
      reason: `Execution profile ${opts.profile} is incompatible with task kind ${opts.taskKind}.`,
    });
  }
  if (preference === "code.direct" && opts.input.selected_mode === "branch_pr") {
    rules.push({
      id: "workflow_mode_incompatible",
      severity: "stop",
      reason: "The branch_pr repository floor overrides the direct compatibility preference.",
    });
  }
  for (const risk of opts.input.risk_flags ?? []) {
    if (risk !== "network" && risk !== "merge") continue;
    rules.push({
      id: `${risk}_risk`,
      severity: "warn",
      reason: `Task declares ${risk} risk; preserve explicit evidence for that step.`,
    });
  }
  return rules;
}

function stage(
  id: NativeLifecycleObligationId,
  owner: NativeLifecycleObligation["owner"],
  required: boolean,
  protectedStage: boolean,
): NativeLifecycleObligation {
  return { id, owner, required, protected: protectedStage };
}

function mandatoryStages(opts: {
  input: NativeTaskObligationInput;
  profile: NativeTaskProfile;
}): NativeLifecycleObligation[] {
  const approvalRequired =
    opts.profile === "code" ||
    opts.profile === "benchmark" ||
    opts.profile === "regression" ||
    opts.profile === "post_run_review" ||
    opts.profile === "release" ||
    opts.profile === "ops" ||
    opts.input.execution_contract?.safety.requires_user_approval === true;
  return [
    stage("planning", "task_plan", true, true),
    stage("user_approval", "authority_admission", approvalRequired, true),
    stage("implementation", "semantic_work_order", true, false),
    stage("independent_evaluation", "quality_review", true, true),
    stage("deterministic_verification", "verification_contract", true, true),
    stage("hosted_integration", "provider_gate", opts.input.selected_mode === "branch_pr", true),
    stage("effect_in_doubt_stop", "effect_recovery", true, true),
  ];
}

export function resolveNativeTaskObligations(
  input: NativeTaskObligationInput,
): NativeTaskObligations {
  const taskKind = inferredTaskKind(input);
  const profile = resolveProfile(input, taskKind);
  const modules = uniqueSorted(policyModules({ input, profile }));
  const profileBudget = input.execution_profile.context_budget;
  const requiredPromptBlocks = PROFILE_REQUIRED_PROMPT_BLOCKS[profile];
  const rules = stopRules({ input, profile, taskKind });
  if (modules.length > profileBudget.max_policy_modules) {
    rules.push({
      id: "required_policy_budget_exceeded",
      severity: "stop",
      reason:
        `Native policy requires ${modules.length} modules, but execution profile ` +
        `${input.execution_profile.profile} allows ${profileBudget.max_policy_modules}.`,
    });
  }
  if (requiredPromptBlocks > profileBudget.max_prompt_blocks) {
    rules.push({
      id: "required_prompt_budget_exceeded",
      severity: "stop",
      reason:
        `Native semantic context requires ${requiredPromptBlocks} prompt blocks, but execution ` +
        `profile ${input.execution_profile.profile} allows ${profileBudget.max_prompt_blocks}.`,
    });
  }
  const requirements = [
    ...evidenceRequirements(profile, input.selected_mode),
    ...contractEvidence(input),
  ];
  return {
    schema_version: 1,
    kind: "agentplane.native_task_obligations",
    source: "task_execution_contract",
    profile,
    task_kind: taskKind,
    route: {
      selected_mode: input.selected_mode,
      reason_codes: uniqueSorted(input.route_reason_codes ?? []),
    },
    policy_modules: modules,
    context_budget: {
      max_policy_modules: Math.min(Math.max(modules.length, 0), profileBudget.max_policy_modules),
      max_prompt_blocks: profileBudget.max_prompt_blocks,
      profile: input.execution_profile.profile,
      rationale:
        "The execution profile caps semantic context, and required native policy is never dropped to fit the cap.",
    },
    mandatory_stages: mandatoryStages({ input, profile }),
    evidence_requirements: [
      ...new Map(requirements.map((requirement) => [requirement.id, requirement])).values(),
    ],
    stop_rules: [...new Map(rules.map((rule) => [rule.id, rule])).values()],
  };
}

export function nativeTaskContextBudgetProblems(
  obligations: NativeTaskObligations,
  promptBlockCount: number,
): string[] {
  const policyModuleCount = obligations.policy_modules.filter(
    (modulePath) => modulePath.trim().length > 0,
  ).length;
  const budgetProblems = [
    ...(policyModuleCount > obligations.context_budget.max_policy_modules
      ? [
          `policy_modules=${policyModuleCount} ` +
            `max_policy_modules=${obligations.context_budget.max_policy_modules}`,
        ]
      : []),
    ...(promptBlockCount > obligations.context_budget.max_prompt_blocks
      ? [
          `prompt_blocks=${promptBlockCount} ` +
            `max_prompt_blocks=${obligations.context_budget.max_prompt_blocks}`,
        ]
      : []),
  ];
  const requiredBudgetStops = obligations.stop_rules
    .filter(
      (rule) =>
        rule.severity === "stop" &&
        (rule.id === "required_policy_budget_exceeded" ||
          rule.id === "required_prompt_budget_exceeded"),
    )
    .map((rule) => `${rule.id}: ${rule.reason}`);
  return [...budgetProblems, ...requiredBudgetStops];
}

export function resolveNativeSemanticToolClasses(
  input: NativeSemanticCapabilityInput,
): NativeSemanticToolClass[] {
  const classes: NativeSemanticToolClass[] = [
    "repository_read",
    "git_read",
    "run_checks",
    "report_result",
    "report_blocker",
  ];
  if (input.can_mutate) classes.push("workspace_write");
  if (input.has_knowledge) classes.push("knowledge_read");
  if (input.role === "EXECUTOR" || input.role === "EVALUATOR") {
    classes.push("knowledge_request");
  }
  return classes;
}
