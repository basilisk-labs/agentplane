import path from "node:path";

import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type {
  TaskExecutionContract,
  TaskExecutionDeclaration,
  TaskExecutionRoute,
  TaskExecutionRouteMode,
  TaskExecutionRouteRequest,
  TaskExternalEffect,
  TaskRepositoryEffect,
  TaskVerificationObservation,
} from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";

type RouteTaskInput = Pick<
  TaskData,
  "task_kind" | "mutation_scope" | "risk_flags" | "blueprint_request"
>;

const ISOLATED_REPOSITORY_EFFECTS = new Set<TaskRepositoryEffect>([
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
]);
const ISOLATED_EXTERNAL_EFFECTS = new Set<TaskExternalEffect>([
  "external_write",
  "credentials",
  "publish",
  "deploy",
  "destructive_git",
]);
const ALL_REPOSITORY_EFFECTS = [
  "repository_write",
  "documentation",
  "source_code",
  "tests",
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
] as const satisfies readonly TaskRepositoryEffect[];
const ALL_EXTERNAL_EFFECTS = [
  "network_read",
  "external_write",
  "credentials",
  "publish",
  "deploy",
  "destructive_git",
] as const satisfies readonly TaskExternalEffect[];
const LEGACY_BRANCH_PR_RISK_FLAGS = new Set([
  "credentials",
  "deploy",
  "publish",
  "merge",
  "security",
  "external_system",
]);

function repositoryMode(config: AgentplaneConfig): TaskExecutionRouteMode {
  return config.workflow_mode === "branch_pr" ? "branch_pr" : "direct";
}

function uniqueSorted<T extends string>(values: readonly T[]): T[] {
  return [...new Set(values)].toSorted();
}

function normalizedScopeRoots(values: readonly string[]): string[] {
  const roots: string[] = [];
  for (const value of values) {
    const raw = value.trim().replaceAll("\\", "/");
    if (!raw || raw.startsWith("/") || /^(?:[A-Za-z]:|\\\\)/u.test(raw)) {
      throw new Error(`Execution declaration scope root must be repository-relative: ${value}`);
    }
    const root = path.posix.normalize(raw.replace(/^\.\//u, ""));
    if (root === ".." || root.startsWith("../")) {
      throw new Error(`Execution declaration scope root must be repository-relative: ${value}`);
    }
    roots.push(root);
  }
  return uniqueSorted(roots);
}

function legacyDeclaration(opts: {
  task: RouteTaskInput;
  requestedMode: TaskExecutionRouteRequest;
}): TaskExecutionDeclaration {
  const repositoryEffects: TaskRepositoryEffect[] = [];
  const externalEffects: TaskExternalEffect[] = [];
  if (opts.task.mutation_scope && opts.task.mutation_scope !== "none") {
    repositoryEffects.push("repository_write");
  }
  if (opts.task.mutation_scope === "docs") repositoryEffects.push("documentation");
  if (opts.task.mutation_scope === "code") repositoryEffects.push("source_code");
  if (opts.task.mutation_scope === "release") repositoryEffects.push("release_metadata");
  for (const risk of opts.task.risk_flags ?? []) {
    if (risk === "network") externalEffects.push("network_read");
    if (risk === "credentials") externalEffects.push("credentials");
    if (risk === "deploy") externalEffects.push("deploy");
    if (risk === "publish") externalEffects.push("publish");
    if (risk === "external_system") externalEffects.push("external_write");
    if (risk === "security") repositoryEffects.push("security_boundary");
    if (risk === "merge") repositoryEffects.push("release_metadata");
  }
  if (opts.task.blueprint_request === "release.strict") {
    repositoryEffects.push("release_metadata");
  }
  return {
    schema_version: 1,
    preferred_mode: opts.requestedMode === "branch_pr" ? "branch_pr" : "direct",
    scope_roots: [],
    repository_effects: uniqueSorted(repositoryEffects),
    external_effects: uniqueSorted(externalEffects),
    uncertainty: opts.task.mutation_scope === "unknown" ? "material" : "bounded",
    reversibility:
      externalEffects.some((effect) => effect !== "network_read") ||
      repositoryEffects.includes("release_metadata")
        ? "recovery_required"
        : "reversible",
    rationale: ["legacy structured task fields mapped to the execution contract"],
  };
}

function contractReasonCodes(opts: {
  declaration: TaskExecutionDeclaration;
  repository_mode: TaskExecutionRouteMode;
}): string[] {
  const reasons: string[] = [];
  if (opts.repository_mode === "branch_pr") reasons.push("repository_branch_pr_floor");
  if (opts.declaration.preferred_mode === "branch_pr") reasons.push("agent_preferred_branch_pr");
  const isolatedRepositoryEffects = opts.declaration.repository_effects.filter((effect) =>
    ISOLATED_REPOSITORY_EFFECTS.has(effect),
  );
  const isolatedExternalEffects = opts.declaration.external_effects.filter((effect) =>
    ISOLATED_EXTERNAL_EFFECTS.has(effect),
  );
  reasons.push(
    ...isolatedRepositoryEffects.map((effect) => `effect_${effect}`),
    ...isolatedExternalEffects.map((effect) => `effect_${effect}`),
  );
  if (opts.declaration.uncertainty === "material") reasons.push("material_uncertainty");
  if (opts.declaration.reversibility !== "reversible") {
    reasons.push(`reversibility_${opts.declaration.reversibility}`);
  }
  if (reasons.length === 0) reasons.push("agent_preferred_direct_compatible");
  return uniqueSorted(reasons);
}

function selectedModeForReasons(opts: {
  declaration: TaskExecutionDeclaration;
  repository_mode: TaskExecutionRouteMode;
  reason_codes: readonly string[];
}): TaskExecutionRouteMode {
  if (opts.repository_mode === "branch_pr" || opts.declaration.preferred_mode === "branch_pr") {
    return "branch_pr";
  }
  return opts.reason_codes.some(
    (reason) =>
      reason.startsWith("effect_") ||
      reason === "material_uncertainty" ||
      reason.startsWith("reversibility_"),
  )
    ? "branch_pr"
    : "direct";
}

function requiredEvidence(opts: {
  declaration: TaskExecutionDeclaration;
  selected_mode: TaskExecutionRouteMode;
  observed_effects?: readonly TaskRepositoryEffect[];
  observed_external_effects?: readonly TaskExternalEffect[];
  verification_results?: readonly TaskVerificationObservation[];
}): string[] {
  const repositoryEffects = uniqueSorted([
    ...opts.declaration.repository_effects,
    ...(opts.observed_effects ?? []),
  ]);
  return uniqueSorted([
    "task_outcome",
    ...repositoryEffects.map((effect) => `repository_effect:${effect}`),
    ...uniqueSorted([
      ...opts.declaration.external_effects,
      ...(opts.observed_external_effects ?? []),
    ]).map((effect) => `external_effect:${effect}`),
    ...(opts.verification_results ?? [])
      .filter((result) => result.result !== "pass")
      .map((result) => `verification_recovery:${result.id}`),
    ...(opts.selected_mode === "branch_pr" ? ["hosted_integration"] : []),
  ]);
}

function executionAuthority(
  declaration: TaskExecutionDeclaration,
): TaskExecutionContract["authority"] {
  const allowedRepositoryEffects = uniqueSorted(declaration.repository_effects);
  const allowedExternalEffects: TaskExternalEffect[] = declaration.external_effects.filter(
    (effect): effect is "network_read" => effect === "network_read",
  );
  return {
    writable_roots: [...declaration.scope_roots],
    allowed_repository_effects: allowedRepositoryEffects,
    forbidden_repository_effects: ALL_REPOSITORY_EFFECTS.filter(
      (effect) => !allowedRepositoryEffects.includes(effect),
    ),
    // A declared network read may be delegated only after the contract's safety gate is met.
    // High-risk effects remain forbidden even if the semantic agent declares them.
    allowed_external_effects: allowedExternalEffects,
    forbidden_external_effects: ALL_EXTERNAL_EFFECTS.filter(
      (effect) => !allowedExternalEffects.includes(effect),
    ),
  };
}

export function resolveTaskExecutionContract(opts: {
  config: AgentplaneConfig;
  task: RouteTaskInput;
  requestedMode?: TaskExecutionRouteRequest;
  declaration?: TaskExecutionDeclaration;
}): TaskExecutionContract {
  const repository_mode = repositoryMode(opts.config);
  const requestedMode = opts.requestedMode ?? "repository";
  const declaration = opts.declaration
    ? structuredClone(opts.declaration)
    : legacyDeclaration({ task: opts.task, requestedMode });
  const scopeRoots = normalizedScopeRoots(declaration.scope_roots);
  if (declaration.repository_effects.length > 0 && scopeRoots.length === 0 && opts.declaration) {
    throw new Error("Execution declaration with repository effects requires scope_roots.");
  }
  const preservesLegacyRepositoryRoute = !opts.declaration && requestedMode === "repository";
  const reason_codes = preservesLegacyRepositoryRoute
    ? ["repository_mode_selected"]
    : contractReasonCodes({ declaration, repository_mode });
  const selected_mode = preservesLegacyRepositoryRoute
    ? repository_mode
    : selectedModeForReasons({
        declaration,
        repository_mode,
        reason_codes,
      });
  const approval_effects = uniqueSorted(
    declaration.external_effects.filter(
      (effect) =>
        effect !== "network_read" || opts.config.agents?.approvals?.require_network === true,
    ),
  );
  return {
    schema_version: 1,
    source: opts.declaration ? "agent_declared" : "legacy_compatibility",
    declaration: {
      ...declaration,
      scope_roots: scopeRoots,
      repository_effects: uniqueSorted(declaration.repository_effects),
      external_effects: uniqueSorted(declaration.external_effects),
      rationale: uniqueSorted(declaration.rationale),
    },
    selected_mode,
    repository_mode,
    reason_codes,
    authority: executionAuthority({ ...declaration, scope_roots: scopeRoots }),
    safety: {
      requires_worktree: selected_mode === "branch_pr",
      requires_user_approval: approval_effects.length > 0,
      approval_effects,
    },
    verification: { required_evidence: requiredEvidence({ declaration, selected_mode }) },
    observed: {
      repository_effects: [],
      external_effects: [],
      changed_paths: [],
      changed_components: [],
      verification_results: [],
      authority_violations: [],
    },
  };
}

function routeFromContract(
  contract: TaskExecutionContract,
  requestedMode: TaskExecutionRouteRequest,
): TaskExecutionRoute {
  return {
    schema_version: 1,
    requested_mode: requestedMode,
    selected_mode: contract.selected_mode,
    repository_mode: contract.repository_mode,
    reason_codes: [...contract.reason_codes],
    frozen: true,
  };
}

function legacyAutoRouteReasons(task: RouteTaskInput): string[] {
  const reasons: string[] = [];
  if (task.blueprint_request === "code.branch_pr" || task.blueprint_request === "release.strict") {
    reasons.push("blueprint_requires_branch_pr");
  }
  if (
    task.task_kind === "release" ||
    task.task_kind === "ops" ||
    task.mutation_scope === "release" ||
    task.mutation_scope === "ops"
  ) {
    reasons.push("mutation_requires_isolation");
  }
  if (task.mutation_scope === "unknown") reasons.push("mutation_scope_unknown");
  for (const risk of task.risk_flags ?? []) {
    if (LEGACY_BRANCH_PR_RISK_FLAGS.has(risk)) reasons.push(`risk_${risk}`);
  }
  return uniqueSorted(reasons);
}

function resolveLegacyTaskExecutionRoute(opts: {
  config: AgentplaneConfig;
  task: RouteTaskInput;
  requestedMode: TaskExecutionRouteRequest;
}): TaskExecutionRoute {
  const repository_mode = repositoryMode(opts.config);
  const reasons: string[] = [];
  let selected_mode: TaskExecutionRouteMode;
  if (repository_mode === "branch_pr") {
    selected_mode = "branch_pr";
    reasons.push("repository_branch_pr_floor");
    if (opts.requestedMode === "direct") reasons.push("direct_request_overridden");
  } else if (opts.requestedMode === "repository") {
    selected_mode = "direct";
    reasons.push("repository_mode_selected");
  } else if (opts.requestedMode === "branch_pr") {
    selected_mode = "branch_pr";
    reasons.push("explicit_branch_pr");
  } else {
    const forcedReasons = legacyAutoRouteReasons(opts.task);
    selected_mode = forcedReasons.length > 0 ? "branch_pr" : "direct";
    reasons.push(
      ...(forcedReasons.length > 0
        ? [
            ...(opts.requestedMode === "direct" ? ["direct_request_overridden"] : []),
            ...forcedReasons,
          ]
        : [opts.requestedMode === "direct" ? "explicit_direct" : "automatic_safe_direct"]),
    );
  }
  return {
    schema_version: 1,
    requested_mode: opts.requestedMode,
    selected_mode,
    repository_mode,
    reason_codes: uniqueSorted(reasons),
    frozen: true,
  };
}

export function resolveTaskExecutionRoute(opts: {
  config: AgentplaneConfig;
  task: RouteTaskInput;
  requestedMode?: TaskExecutionRouteRequest;
  declaration?: TaskExecutionDeclaration;
}): TaskExecutionRoute {
  const requestedMode = opts.requestedMode ?? "repository";
  if (!opts.declaration) {
    return resolveLegacyTaskExecutionRoute({
      config: opts.config,
      task: opts.task,
      requestedMode,
    });
  }
  return routeFromContract(resolveTaskExecutionContract(opts), requestedMode);
}

function structuralEffectsForPath(pathValue: string): TaskRepositoryEffect[] {
  const normalized = pathValue.trim().replaceAll("\\", "/").replace(/^\.\//u, "");
  if (!normalized || normalized.startsWith("../") || normalized.startsWith("/")) return [];
  const effects: TaskRepositoryEffect[] = ["repository_write"];
  if (
    normalized.startsWith("docs/") ||
    normalized === "README.md" ||
    normalized.endsWith(".md") ||
    normalized.endsWith(".mdx")
  ) {
    effects.push("documentation");
  }
  if (
    /(?:^|\/)(?:test|tests|__tests__)(?:\/|$)/u.test(normalized) ||
    /\.(?:spec|test)\.[cm]?[jt]sx?$/u.test(normalized)
  ) {
    effects.push("tests");
  } else if (/\.[cm]?[jt]sx?$/u.test(normalized)) {
    effects.push("source_code");
  }
  if (
    normalized.startsWith(".github/workflows/") ||
    normalized === ".gitlab-ci.yml" ||
    normalized.startsWith(".circleci/")
  ) {
    effects.push("ci");
  }
  if (
    /(^|\/)(?:package\.json|bun\.lockb?|pnpm-lock\.yaml|yarn\.lock|package-lock\.json)$/u.test(
      normalized,
    )
  ) {
    effects.push("dependencies");
  }
  if (
    normalized.startsWith("schemas/") ||
    normalized.includes("/schemas/") ||
    normalized.startsWith("migrations/") ||
    normalized.includes("/migrations/") ||
    normalized.endsWith(".schema.json")
  ) {
    effects.push("schema");
  }
  if (
    normalized === "CHANGELOG.md" ||
    normalized.startsWith(".changeset/") ||
    normalized.startsWith("changesets/")
  ) {
    effects.push("release_metadata");
  }
  if (/^packages\/[^/]+\/src\/index\.[cm]?[jt]sx?$/u.test(normalized)) {
    effects.push("public_api");
  }
  return effects;
}

function componentForPath(pathValue: string): string {
  const normalized = pathValue.trim().replaceAll("\\", "/").replace(/^\.\//u, "");
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) return "repository";
  if (segments[0] === "packages" && segments[1]) return `packages/${segments[1]}`;
  if (segments[0] === "apps" && segments[1]) return `apps/${segments[1]}`;
  return segments[0] ?? "repository";
}

function verificationObservation(value: TaskVerificationObservation): TaskVerificationObservation {
  return { id: value.id.trim(), result: value.result };
}

export function reconcileTaskExecutionContract(opts: {
  contract: TaskExecutionContract;
  changed_paths: readonly string[];
  observed_external_effects?: readonly TaskExternalEffect[];
  verification_results?: readonly TaskVerificationObservation[];
  preserved_commit?: string;
}): { contract: TaskExecutionContract; escalated: boolean } {
  const changed_paths = uniqueSorted(
    opts.changed_paths
      .map((entry) => entry.trim().replaceAll("\\", "/"))
      .filter((entry) => entry && !entry.startsWith("../") && !entry.startsWith("/")),
  );
  const observedEffects = uniqueSorted([
    ...opts.contract.observed.repository_effects,
    ...changed_paths.flatMap((changedPath) => structuralEffectsForPath(changedPath)),
  ]);
  const observedExternalEffects = uniqueSorted([
    ...opts.contract.observed.external_effects,
    ...(opts.observed_external_effects ?? []),
  ]);
  const observedVerificationResults = [
    ...new Map(
      [
        ...opts.contract.observed.verification_results,
        ...(opts.verification_results ?? []).map((result) => verificationObservation(result)),
      ].map((result) => [result.id, result]),
    ).values(),
  ].toSorted((left, right) => left.id.localeCompare(right.id));
  const undeclaredRepositoryEffects = observedEffects.filter(
    (effect) => !opts.contract.authority.allowed_repository_effects.includes(effect),
  );
  const unauthorizedExternalEffects = observedExternalEffects.filter(
    (effect) => !opts.contract.authority.allowed_external_effects.includes(effect),
  );
  const failedVerificationResults = observedVerificationResults.filter(
    (result) => result.result !== "pass",
  );
  const authorityViolations = uniqueSorted([
    ...opts.contract.observed.authority_violations,
    ...undeclaredRepositoryEffects.map((effect) => `repository_effect:${effect}`),
    ...unauthorizedExternalEffects.map((effect) => `external_effect:${effect}`),
    ...failedVerificationResults.map((result) => `verification:${result.id}:${result.result}`),
  ]);
  const newlyIsolatedEffects = observedEffects.filter(
    (effect) =>
      ISOLATED_REPOSITORY_EFFECTS.has(effect) &&
      !opts.contract.declaration.repository_effects.includes(effect),
  );
  const escalated =
    opts.contract.selected_mode === "direct" &&
    (newlyIsolatedEffects.length > 0 || unauthorizedExternalEffects.length > 0);
  const selected_mode = escalated ? "branch_pr" : opts.contract.selected_mode;
  const escalationReasons = [
    ...newlyIsolatedEffects.map((effect) => `observed_effect_${effect}`),
    ...unauthorizedExternalEffects.map((effect) => `observed_external_effect_${effect}`),
  ];
  const reason_codes = uniqueSorted([...opts.contract.reason_codes, ...escalationReasons]);
  const contract: TaskExecutionContract = {
    ...opts.contract,
    selected_mode,
    reason_codes,
    safety: { ...opts.contract.safety, requires_worktree: selected_mode === "branch_pr" },
    verification: {
      required_evidence: requiredEvidence({
        declaration: opts.contract.declaration,
        selected_mode,
        observed_effects: observedEffects,
        observed_external_effects: observedExternalEffects,
        verification_results: observedVerificationResults,
      }),
    },
    observed: {
      repository_effects: observedEffects,
      external_effects: observedExternalEffects,
      changed_paths: uniqueSorted([...opts.contract.observed.changed_paths, ...changed_paths]),
      changed_components: uniqueSorted([
        ...opts.contract.observed.changed_components,
        ...changed_paths.map((changedPath) => componentForPath(changedPath)),
      ]),
      verification_results: observedVerificationResults,
      authority_violations: authorityViolations,
    },
    ...(escalated
      ? {
          escalation: {
            from: "direct" as const,
            to: "branch_pr" as const,
            reason_codes: uniqueSorted(escalationReasons),
            preserved_changed_paths: changed_paths,
            ...(opts.preserved_commit ? { preserved_commit: opts.preserved_commit } : {}),
          },
        }
      : opts.contract.escalation
        ? { escalation: structuredClone(opts.contract.escalation) }
        : {}),
  };
  return { contract, escalated };
}

export function resolveEffectiveTaskWorkflowMode(
  task: Pick<TaskData, "execution_route" | "execution_contract">,
  config: AgentplaneConfig,
): TaskExecutionRouteMode {
  const repoMode = repositoryMode(config);
  if (repoMode === "branch_pr") return "branch_pr";
  return task.execution_contract?.selected_mode ?? task.execution_route?.selected_mode ?? repoMode;
}

export function withEffectiveTaskWorkflowMode(
  ctx: CommandContext,
  task: Pick<TaskData, "execution_route" | "execution_contract">,
): CommandContext {
  const workflowMode = resolveEffectiveTaskWorkflowMode(task, ctx.config);
  if (workflowMode === ctx.config.workflow_mode) return ctx;
  return {
    ...ctx,
    config: {
      ...ctx.config,
      workflow_mode: workflowMode,
    },
  };
}
