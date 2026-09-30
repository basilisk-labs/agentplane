import type {
  TaskExecutionContract,
  TaskExecutionDeclaration,
  TaskExecutionRouteRequest,
  TaskExternalEffect,
  TaskRepositoryEffect,
} from "@agentplaneorg/core/tasks";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import type { TaskData } from "../../backends/task-backend/shared/types.js";

export type ExecutionContractInputs = {
  scopeRoots?: string[];
  repositoryEffects?: TaskRepositoryEffect[];
  externalEffects?: TaskExternalEffect[];
  capabilities?: string[];
  resources?: string[];
};

type StructuredIntake = ExecutionContractInputs & {
  route?: TaskExecutionRouteRequest;
  verify: string[];
};

type StructuredIntent = {
  taskKind?: TaskData["task_kind"];
  mutationScope?: TaskData["mutation_scope"];
  riskFlags?: NonNullable<TaskData["risk_flags"]>;
};

function unique<T extends string>(values: readonly T[]): T[] {
  return [...new Set(values)].toSorted();
}

export function resolveExplicitExecutionContract(opts: {
  parsed: StructuredIntake;
  config: Parameters<typeof resolveTaskExecutionContract>[0]["config"];
  intent: StructuredIntent;
}): TaskExecutionContract {
  const repositoryEffects: TaskRepositoryEffect[] = [...(opts.parsed.repositoryEffects ?? [])];
  if (opts.intent.mutationScope && opts.intent.mutationScope !== "none")
    repositoryEffects.push("repository_write");
  if (opts.intent.mutationScope === "docs") repositoryEffects.push("documentation");
  if (opts.intent.mutationScope === "code") repositoryEffects.push("source_code");
  if (opts.intent.mutationScope === "release") repositoryEffects.push("release_metadata");
  if (opts.parsed.verify.length > 0) repositoryEffects.push("tests");
  const externalEffects: TaskExternalEffect[] = [...(opts.parsed.externalEffects ?? [])];
  for (const risk of opts.intent.riskFlags ?? []) {
    if (risk === "network") externalEffects.push("network_read");
    if (risk === "credentials") externalEffects.push("credentials");
    if (risk === "deploy") externalEffects.push("deploy");
    if (risk === "publish") externalEffects.push("publish");
    if (risk === "external_system") externalEffects.push("external_write");
    if (risk === "security") repositoryEffects.push("security_boundary");
    if (risk === "merge") repositoryEffects.push("release_metadata");
  }
  const hasRecoveryRisk =
    externalEffects.some((effect) => effect !== "network_read") ||
    repositoryEffects.includes("release_metadata");
  const declaration: TaskExecutionDeclaration = {
    schema_version: 2,
    preferred_mode: opts.parsed.route === "branch_pr" ? "branch_pr" : "direct",
    scope_roots:
      repositoryEffects.length > 0
        ? unique(
            opts.parsed.scopeRoots && opts.parsed.scopeRoots.length > 0
              ? opts.parsed.scopeRoots
              : ["."],
          )
        : [],
    repository_effects: unique(repositoryEffects),
    external_effects: unique(externalEffects),
    requirements_uncertainty: opts.intent.mutationScope === "unknown" ? "material" : "bounded",
    implementation_uncertainty: "bounded",
    reversibility: hasRecoveryRisk ? "recovery_required" : "reversible",
    rationale: ["explicit structured task intake"],
  };
  const contract = resolveTaskExecutionContract({
    config: opts.config,
    requestedMode: opts.parsed.route,
    task: {
      task_kind: opts.intent.taskKind,
      mutation_scope: opts.intent.mutationScope,
      risk_flags: opts.intent.riskFlags,
    },
    declaration,
  });
  contract.authority.allowed_capabilities = unique([
    ...(opts.parsed.capabilities ?? []),
    ...(repositoryEffects.length > 0 ? ["repository_write"] : []),
  ]);
  contract.authority.allowed_resources = unique(opts.parsed.resources ?? []);
  return contract;
}
