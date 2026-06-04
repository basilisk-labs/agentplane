import type { RunnerContextBundle, RunnerInvocation } from "../types.js";

type EvaluatorSkepticismLevel = NonNullable<
  RunnerContextBundle["execution"]["evaluator_skepticism_level"]
>;

function compactGoalText(value: string): string {
  return value.replaceAll(/\s+/g, " ").trim();
}

function truncateGoalText(value: string, maxLength = 320): string {
  const compact = compactGoalText(value);
  if (compact.length <= maxLength) return compact;
  return `${compact.slice(0, maxLength - 3).trimEnd()}...`;
}

function renderCodexGoalLine(bundle: RunnerContextBundle, targetLabel: string): string | null {
  if (bundle.execution.adapter_id !== "codex") return null;
  const taskTitle = compactGoalText(bundle.task?.data.title ?? "");
  const recipeGoal =
    typeof bundle.recipe?.scenario?.goal === "string"
      ? compactGoalText(bundle.recipe.scenario.goal)
      : "";
  const recipeSummary =
    typeof bundle.recipe?.scenario?.summary === "string"
      ? compactGoalText(bundle.recipe.scenario.summary)
      : "";
  const objective = taskTitle || recipeGoal || recipeSummary || targetLabel;
  return `/goal ${truncateGoalText(`Execute AgentPlane ${targetLabel}: ${objective}`)}`;
}

function renderEvaluatorSkepticismLines(level: EvaluatorSkepticismLevel): string[] {
  const common = [
    "Evaluator skepticism contract:",
    `- evaluator_skepticism_level: ${level}`,
    "- During evaluator or audit review, reconstruct the intended contract from the task, plan, Verify Steps, route decision, diff, and evidence; do not rely on the implementer's summary.",
    "- Treat passing technical checks as evidence, not proof. Look for broken invariants, missing negative cases, stale route assumptions, and untested concurrency or lifecycle edges.",
    "- If the run is evaluator-only, do not fix issues. Return findings, missing tests, hidden assumptions, residual risks, and a concrete rework packet for the parent runner.",
  ];
  if (level === "standard") {
    return [
      ...common,
      "- Standard review: focus on explicit scope, declared verification, and obvious missing evidence.",
    ];
  }
  if (level === "strict") {
    return [
      ...common,
      "- Strict review: actively search for counterexamples, happy-path-only tests, stale task/blueprint evidence, and category mismatches between requested behavior and implementation.",
      "- Use rework when correctness depends on an assumption the implementation did not prove.",
    ];
  }
  return [
    ...common,
    "- Paranoid review: assume the implementation is incomplete until each critical claim is backed by direct code, test, runtime, or task-artifact evidence.",
    "- Prefer rework over pass for ambiguous ownership, unverified negative cases, broad diffs without targeted evidence, or lifecycle state that could be stale.",
  ];
}

function runnerDecisionContext(routeDecision: {
  oracle?: { nextCommand?: string | null; phase?: string };
  executionPacket?: { actionKind?: string; safeToMutate?: boolean; returnControlWhen?: string };
  nextAction?: { code?: string };
}): {
  runnerIsRequired: boolean;
  runnerIsAllowedNow: boolean;
  localWorkAllowedIfRunnerFails: boolean;
  runnerFailureMeans: string;
  returnControlWhen: string;
} {
  const command = routeDecision.oracle?.nextCommand ?? "";
  const runnerIsAllowedNow =
    routeDecision.executionPacket?.actionKind === "local_command" &&
    routeDecision.executionPacket.safeToMutate === true &&
    /\b(agentplane|ap)\s+task\s+run\b/.test(command);
  const runnerIsRequired =
    runnerIsAllowedNow ||
    routeDecision.nextAction?.code === "wait_runner" ||
    routeDecision.oracle?.phase === "runner_wait";
  return {
    runnerIsRequired,
    runnerIsAllowedNow,
    localWorkAllowedIfRunnerFails:
      runnerIsRequired === false && routeDecision.executionPacket?.safeToMutate === true,
    runnerFailureMeans: runnerIsRequired
      ? "runner failure is run evidence; inspect artifacts before marking task verification"
      : "not a runner route; do not introduce task run unless bundle explicitly delegates it",
    returnControlWhen:
      routeDecision.executionPacket?.returnControlWhen ??
      "after this run completes; recompute task next-action",
  };
}

export function renderTaskRunnerBootstrap(
  bundle: RunnerContextBundle,
  invocation?: RunnerInvocation,
): string {
  const targetLabel =
    bundle.target.kind === "task"
      ? `task ${bundle.target.task_id}`
      : `recipe scenario ${bundle.target.recipe_id}:${bundle.target.scenario_id}`;
  const codexGoalLine = renderCodexGoalLine(bundle, targetLabel);
  const stopRules = bundle.blueprint?.stopReasons ?? [];
  const playbook = bundle.playbook?.selected_playbook;
  const verifierChecks = bundle.playbook?.final_verifier.checks ?? [];
  const evaluatorSkepticismLevel =
    bundle.execution.evaluator_skepticism_level ?? ("standard" satisfies EvaluatorSkepticismLevel);
  const routeDecision = bundle.route_decision as
    | {
        oracle?: {
          phase?: string;
          authoritativeCheckout?: string;
          authoritativeCheckoutPath?: string | null;
          mutationPathHint?: string | null;
          blocker?: { code?: string; summary?: string } | null;
          nextCommand?: string | null;
        };
        executionPacket?: {
          actionKind?: string;
          evidenceMissing?: string[];
          exactArgv?: string[] | null;
          humanProviderAction?: string | null;
          mustNot?: string[];
          mustRunFrom?: string | null;
          recommendedRole?: string;
          requiresProviderAction?: boolean;
          returnControlWhen?: string;
          safeToMutate?: boolean;
          staleStateCheck?: string;
          verificationCandidate?: string | null;
        };
        nextAction?: { code?: string; command?: string | null; summary?: string };
        workspace?: { checkoutRole?: string };
        approval?: { effectiveMutationApprovalRequired?: boolean };
      }
    | undefined;
  const runnerContext = routeDecision ? runnerDecisionContext(routeDecision) : null;
  return [
    ...(codexGoalLine ? [codexGoalLine, ""] : []),
    "# agentplane runner bootstrap",
    "",
    "This invocation is already inside an approved runner execution.",
    "- Do not run repository startup commands such as `agentplane config show`, `agentplane quickstart`, `agentplane task list`, `git status`, or `git rev-parse` unless the bundle explicitly requires them as task work.",
    "- Do not create, approve, start, verify, finish, block, or rerun tasks unless the bundle explicitly requires task metadata edits.",
    "- Keep lifecycle authority with the parent AgentPlane workflow; do not open PRs, merge, release, push publication artifacts, or clean worktrees unless the bundle explicitly delegates that action.",
    "- Do not recursively invoke runner entrypoints such as `agentplane task run` or `agentplane recipes scenario execute` from inside this run.",
    "- Assume sibling runners may be executing concurrently. Keep writes inside the task scope, avoid broad refactors or shared policy edits, and report possible write conflicts in the result manifest instead of resolving them speculatively.",
    "- Open bundle.json immediately, execute the requested work directly, and stop when the requested outcome is satisfied.",
    "",
    `- target: ${targetLabel}`,
    `- adapter: ${bundle.execution.adapter_id}`,
    `- mode: ${bundle.execution.mode}`,
    `- run_id: ${bundle.execution.run_id}`,
    `- bundle_path: ${bundle.execution.artifact_paths.bundle_path}`,
    `- result_path: ${bundle.execution.artifact_paths.result_path}`,
    `- bootstrap_path: ${bundle.execution.artifact_paths.bootstrap_path}`,
    ...(routeDecision
      ? [
          `- checkout_role: ${routeDecision.workspace?.checkoutRole ?? "unknown"}`,
          `- route_phase: ${routeDecision.oracle?.phase ?? "unknown"}`,
          `- route_authoritative_checkout: ${
            routeDecision.oracle?.authoritativeCheckout ??
            routeDecision.workspace?.checkoutRole ??
            "unknown"
          }`,
          `- route_authoritative_checkout_path: ${
            routeDecision.oracle?.authoritativeCheckoutPath ?? "unknown"
          }`,
          `- route_mutation_path_hint: ${routeDecision.oracle?.mutationPathHint ?? "none"}`,
          `- route_next_action: ${routeDecision.nextAction?.code ?? "unknown"}`,
          `- route_next_command: ${
            routeDecision.oracle?.nextCommand ?? routeDecision.nextAction?.command ?? "none"
          }`,
          `- route_primary_blocker: ${
            routeDecision.oracle?.blocker
              ? `${routeDecision.oracle.blocker.code ?? "unknown"}: ${
                  routeDecision.oracle.blocker.summary ?? "blocked"
                }`
              : "none"
          }`,
          `- effective_mutation_approval: ${String(
            routeDecision.approval?.effectiveMutationApprovalRequired ?? true,
          )}`,
          `- route_action_kind: ${routeDecision.executionPacket?.actionKind ?? "unknown"}`,
          `- route_safe_to_mutate: ${String(routeDecision.executionPacket?.safeToMutate ?? false)}`,
          `- route_recommended_role: ${
            routeDecision.executionPacket?.recommendedRole ?? "unknown"
          }`,
          `- route_must_run_from: ${
            routeDecision.executionPacket?.mustRunFrom ??
            routeDecision.oracle?.authoritativeCheckoutPath ??
            "unknown"
          }`,
          `- route_exact_argv: ${routeDecision.executionPacket?.exactArgv?.join(" ") ?? "none"}`,
          `- route_return_control_when: ${
            routeDecision.executionPacket?.returnControlWhen ??
            "after this run completes; recompute task next-action"
          }`,
          `- route_stale_state_check: ${
            routeDecision.executionPacket?.staleStateCheck ??
            "agentplane task next-action <task-id> --explain"
          }`,
          `- route_requires_provider_action: ${String(
            routeDecision.executionPacket?.requiresProviderAction ?? false,
          )}`,
          `- route_human_provider_action: ${
            routeDecision.executionPacket?.humanProviderAction ?? "none"
          }`,
          `- route_evidence_missing: ${
            routeDecision.executionPacket?.evidenceMissing?.join(", ") ?? "none"
          }`,
          `- route_verification_candidate: ${
            routeDecision.executionPacket?.verificationCandidate ?? "none"
          }`,
          `- runner_is_required: ${String(runnerContext?.runnerIsRequired ?? false)}`,
          `- runner_is_allowed_now: ${String(runnerContext?.runnerIsAllowedNow ?? false)}`,
          `- local_work_allowed_if_runner_fails: ${String(
            runnerContext?.localWorkAllowedIfRunnerFails ?? false,
          )}`,
          `- runner_failure_means: ${runnerContext?.runnerFailureMeans ?? "unknown"}`,
        ]
      : []),
    "",
    "Use bundle.json as the complete runner input. Do not reconstruct prompts or route decisions from CLI argv.",
    "Follow route_decision in bundle.json unless local state has changed; if it may be stale, run `agentplane task next-action <task-id> --explain` before mutating.",
    "Route oracle contract: follow route_exact_argv when present, run it from route_must_run_from, treat route_primary_blocker as the current stop reason, and use route_phase instead of manually reconstructing branch/worktree/PR state.",
    "For file-edit tools that do not accept cwd/workdir, use absolute paths under route_mutation_path_hint when route_safe_to_mutate is true; otherwise stop before mutating files.",
    "Return control according to route_return_control_when. Do not continue to a second route step until route_stale_state_check has been recomputed.",
    "Runner rail contract: only think about runner execution when runner_is_required or runner_is_allowed_now is true; otherwise treat runner failures from earlier attempts as diagnostic evidence, not as the current route.",
    "When reading bundle.json directly, use camelCase JSON paths: route_decision.oracle.nextCommand, route_decision.oracle.authoritativeCheckout, route_decision.oracle.authoritativeCheckoutPath, route_decision.oracle.mutationPathHint, route_decision.oracle.blocker, and route_decision.oracle.phase.",
    ...(routeDecision?.executionPacket?.mustNot?.length
      ? [
          "Route must-not rules:",
          ...routeDecision.executionPacket.mustNot.map((rule) => `- ${rule}`),
        ]
      : []),
    "If the requested work cannot be completed without widening lifecycle authority or touching likely sibling-owned files, stop and write a blocked result manifest with the conflict, affected paths, and recommended parent action.",
    "",
    ...renderEvaluatorSkepticismLines(evaluatorSkepticismLevel),
    ...(stopRules.length > 0
      ? [
          "",
          "Blueprint stop rules:",
          ...stopRules.map((rule) => `- ${rule.severity}: ${rule.reason} (${rule.id})`),
        ]
      : []),
    ...(bundle.playbook
      ? [
          "",
          "Execution playbook contract:",
          `- blueprint_result: ${bundle.playbook.execution_blueprint.id}`,
          `- selected_playbook: ${playbook?.id ?? "none"}`,
          `- runtime: ${bundle.playbook.runtime_capabilities.runtime_id}`,
          "- final verifier blocks success when required state is missing.",
          ...(verifierChecks.length > 0
            ? [
                "Required final state:",
                ...verifierChecks.map((check) => `- ${check.id}: ${check.description}`),
              ]
            : []),
        ]
      : []),
    "Execute-mode runs must write a valid JSON result manifest to result_path before exiting.",
    "Minimal manifest example:",
    '{"schema_version":1,"status":"success","summary":"Completed.","capabilities_used":["runner.exec"]}',
    "",
    "Prepared invocation:",
    "",
    invocation
      ? `- argv: ${invocation.argv.join(" ")}`
      : "- argv: <not prepared; preflight refused>",
  ].join("\n");
}
