import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter } from "../../cli/output.js";
import { makeExecutionContext } from "../../runtime/execution-context.js";
import { gitRevParse } from "@agentplaneorg/core/git";
import {
  createTaskExecutionBaseIdentity,
  TASK_EXECUTION_CONTEXT_EXTENSION_KEY,
  type TaskExecutionContract,
  type TaskExecutionDeclaration,
  type TaskExternalEffect,
  type TaskRepositoryEffect,
} from "@agentplaneorg/core/tasks";
import {
  resolveTaskExecutionContract,
  resolveTaskExecutionRoute,
} from "../../runtime/task-routing/index.js";
import { throwIfPolicyDecisionDenied } from "../shared/policy-deny.js";
import type { CommandContext } from "../shared/task-backend.js";

import { runTaskNewParsed, type TaskNewParsed } from "./new.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";

const output = createCliEmitter();

type UserTaskRoute = Exclude<NonNullable<TaskNewParsed["route"]>, "repository">;

export type TaskCreateParsed = {
  outcome: string;
  description?: string;
  owner: string;
  priority: TaskNewParsed["priority"];
  route: UserTaskRoute;
  tags: string[];
  taskKind?: TaskNewParsed["taskKind"];
  mutationScope?: TaskNewParsed["mutationScope"];
  riskFlags: NonNullable<TaskNewParsed["riskFlags"]>;
  verify: string[];
  scopeRoots: string[];
  repositoryEffects: TaskRepositoryEffect[];
  externalEffects: TaskExternalEffect[];
  capabilities: string[];
  resources: string[];
  base?: string;
  allowDuplicate: boolean;
  json: boolean;
};

export type UserTaskIntent = Pick<TaskNewParsed, "taskKind" | "mutationScope" | "tags"> & {
  riskFlags: NonNullable<TaskNewParsed["riskFlags"]>;
  source: "explicit" | "pending_planner";
  code: "explicit_structured_intent" | "semantic_intake_pending";
  confirmation_required: boolean;
};

export function resolveUserTaskIntent(parsed: TaskCreateParsed): UserTaskIntent {
  const hasStructuredIntent =
    parsed.taskKind !== undefined ||
    parsed.mutationScope !== undefined ||
    parsed.riskFlags.length > 0 ||
    parsed.tags.length > 0;
  if (hasStructuredIntent) {
    return {
      taskKind: parsed.taskKind,
      mutationScope: parsed.mutationScope,
      riskFlags: parsed.riskFlags,
      tags: parsed.tags.length > 0 ? parsed.tags : ["intake"],
      source: "explicit",
      code: "explicit_structured_intent",
      confirmation_required: false,
    };
  }
  return {
    mutationScope: "unknown",
    riskFlags: [],
    tags: ["intake"],
    source: "pending_planner",
    code: "semantic_intake_pending",
    confirmation_required: true,
  };
}

function unique<T extends string>(values: readonly T[]): T[] {
  return [...new Set(values)].toSorted();
}

export function resolveExplicitExecutionContract(opts: {
  parsed: TaskCreateParsed;
  config: Parameters<typeof resolveTaskExecutionContract>[0]["config"];
  intent: UserTaskIntent;
}): TaskExecutionContract {
  const repositoryEffects: TaskRepositoryEffect[] = [...opts.parsed.repositoryEffects];
  if (opts.intent.mutationScope && opts.intent.mutationScope !== "none")
    repositoryEffects.push("repository_write");
  if (opts.intent.mutationScope === "docs") repositoryEffects.push("documentation");
  if (opts.intent.mutationScope === "code") repositoryEffects.push("source_code");
  if (opts.intent.mutationScope === "release") repositoryEffects.push("release_metadata");
  if (opts.parsed.verify.length > 0) repositoryEffects.push("tests");
  const externalEffects: TaskExternalEffect[] = [...opts.parsed.externalEffects];
  for (const risk of opts.intent.riskFlags) {
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
        ? unique(opts.parsed.scopeRoots.length > 0 ? opts.parsed.scopeRoots : ["."])
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
    ...opts.parsed.capabilities,
    ...(repositoryEffects.length > 0 ? ["repository_write"] : []),
  ]);
  contract.authority.allowed_resources = unique(opts.parsed.resources);
  return contract;
}

export const taskCreateSpec: CommandSpec<TaskCreateParsed> = {
  id: ["task", "create"],
  group: "Task",
  summary: "Create a task from an outcome and explicit semantic intent.",
  description:
    "Validates caller-supplied structured intent. Without it, creates a neutral PLANNER intake boundary without classifying title words.",
  args: [{ name: "outcome", required: true, valueHint: "<outcome>" }],
  options: [
    {
      kind: "string",
      name: "description",
      valueHint: "<text>",
      description: "Additional task context. Defaults to the requested outcome.",
    },
    {
      kind: "string",
      name: "owner",
      valueHint: "<id>",
      default: "CODER",
      description: "Task owner id.",
    },
    {
      kind: "string",
      name: "priority",
      valueHint: "<low|normal|med|high>",
      choices: ["low", "normal", "med", "high"],
      default: "med",
      description: "Task priority.",
    },
    {
      kind: "string",
      name: "route",
      valueHint: "<auto|direct|branch_pr>",
      choices: ["auto", "direct", "branch_pr"],
      default: "auto",
      description: "Execution-route request. auto is conservative and explainable.",
    },
    {
      kind: "string",
      name: "task-kind",
      valueHint: "<analysis|content|docs|code|release|ops|context>",
      choices: ["analysis", "content", "docs", "code", "release", "ops", "context"],
      description: "Structured task kind supplied by the semantic caller.",
    },
    {
      kind: "string",
      name: "mutation-scope",
      valueHint: "<none|docs|code|release|ops|context|unknown>",
      choices: ["none", "docs", "code", "release", "ops", "context", "unknown"],
      description: "Structured mutation scope supplied by the semantic caller.",
    },
    {
      kind: "string",
      name: "risk",
      valueHint: "<risk>",
      choices: [
        "network",
        "credentials",
        "deploy",
        "publish",
        "merge",
        "security",
        "external_system",
      ],
      repeatable: true,
      description: "Repeatable structured risk flag supplied by the semantic caller.",
    },
    {
      kind: "string",
      name: "tag",
      valueHint: "<tag>",
      repeatable: true,
      description: "Repeatable semantic tag supplied by the caller.",
    },
    {
      kind: "string",
      name: "verify",
      valueHint: "<command>",
      repeatable: true,
      description: "Repeatable. Seed an explicit verification command.",
    },
    {
      kind: "string",
      name: "scope-root",
      valueHint: "<repository-relative-path>",
      repeatable: true,
      description: "Repeatable writable root admitted by the execution contract.",
    },
    {
      kind: "string",
      name: "repository-effect",
      valueHint: "<effect>",
      choices: [
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
      ],
      repeatable: true,
      description: "Repeatable repository effect admitted by the execution contract.",
    },
    {
      kind: "string",
      name: "external-effect",
      valueHint: "<effect>",
      choices: [
        "network_read",
        "external_write",
        "credentials",
        "publish",
        "deploy",
        "destructive_git",
      ],
      repeatable: true,
      description: "Repeatable external effect declared at intake.",
    },
    {
      kind: "string",
      name: "capability",
      valueHint: "<capability>",
      repeatable: true,
      description: "Repeatable semantic capability admitted by the execution contract.",
    },
    {
      kind: "string",
      name: "resource",
      valueHint: "<resource>",
      repeatable: true,
      description: "Repeatable resource claim admitted by the execution contract.",
    },
    {
      kind: "string",
      name: "base",
      valueHint: "<branch-or-ref>",
      description:
        "Freeze this task on an explicit development base. Defaults to the current checkout.",
    },
    {
      kind: "boolean",
      name: "allow-duplicate",
      default: false,
      description: "Allow an exact duplicate of an open task.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    {
      cmd: 'agentplane task create "Fix the parser edge case" --task-kind code --mutation-scope code --tag code',
      why: "Create a task with explicit structured semantic intent.",
    },
    {
      cmd: 'agentplane task create "Describe the outcome" --json',
      why: "Create a neutral intake task for PLANNER classification.",
    },
  ],
  validateRaw: (raw) => {
    const outcome = typeof raw.args.outcome === "string" ? raw.args.outcome.trim() : "";
    if (!outcome) {
      throw usageError({ spec: taskCreateSpec, message: "Invalid value for outcome: empty." });
    }
    const owner = typeof raw.opts.owner === "string" ? raw.opts.owner.trim() : "CODER";
    if (!owner) {
      throw usageError({ spec: taskCreateSpec, message: "Invalid value for --owner: empty." });
    }
    if (typeof raw.opts.base === "string" && !raw.opts.base.trim()) {
      throw usageError({ spec: taskCreateSpec, message: "Invalid value for --base: empty." });
    }
    const hasAnyStructuredIntent = [
      raw.opts["task-kind"],
      raw.opts["mutation-scope"],
      raw.opts.risk,
      raw.opts.tag,
      raw.opts["scope-root"],
      raw.opts["repository-effect"],
      raw.opts["external-effect"],
      raw.opts.capability,
      raw.opts.resource,
    ].some((value) => value !== undefined && (!Array.isArray(value) || value.length > 0));
    if (
      hasAnyStructuredIntent &&
      (typeof raw.opts["task-kind"] !== "string" || typeof raw.opts["mutation-scope"] !== "string")
    ) {
      throw usageError({
        spec: taskCreateSpec,
        message:
          "Structured task intent requires both --task-kind and --mutation-scope; otherwise omit all semantic options and let PLANNER classify the intake.",
      });
    }
  },
  parse: (raw) => ({
    outcome: String(raw.args.outcome),
    description:
      typeof raw.opts.description === "string" ? String(raw.opts.description) : undefined,
    owner: typeof raw.opts.owner === "string" ? String(raw.opts.owner) : "CODER",
    priority: (raw.opts.priority ?? "med") as TaskCreateParsed["priority"],
    route: (raw.opts.route ?? "auto") as UserTaskRoute,
    tags: Array.isArray(raw.opts.tag) ? (raw.opts.tag as string[]) : [],
    taskKind:
      typeof raw.opts["task-kind"] === "string"
        ? (raw.opts["task-kind"] as TaskNewParsed["taskKind"])
        : undefined,
    mutationScope:
      typeof raw.opts["mutation-scope"] === "string"
        ? (raw.opts["mutation-scope"] as TaskNewParsed["mutationScope"])
        : undefined,
    riskFlags: Array.isArray(raw.opts.risk)
      ? (raw.opts.risk as NonNullable<TaskNewParsed["riskFlags"]>)
      : [],
    verify: Array.isArray(raw.opts.verify) ? (raw.opts.verify as string[]) : [],
    scopeRoots: Array.isArray(raw.opts["scope-root"]) ? (raw.opts["scope-root"] as string[]) : [],
    repositoryEffects: Array.isArray(raw.opts["repository-effect"])
      ? (raw.opts["repository-effect"] as TaskRepositoryEffect[])
      : [],
    externalEffects: Array.isArray(raw.opts["external-effect"])
      ? (raw.opts["external-effect"] as TaskExternalEffect[])
      : [],
    capabilities: Array.isArray(raw.opts.capability) ? (raw.opts.capability as string[]) : [],
    resources: Array.isArray(raw.opts.resource) ? (raw.opts.resource as string[]) : [],
    base: typeof raw.opts.base === "string" ? raw.opts.base.trim() : undefined,
    allowDuplicate: raw.opts["allow-duplicate"] === true,
    json: raw.opts.json === true,
  }),
};

export function makeRunTaskCreateHandler(
  getCtx: (commandForErrorContext: string) => Promise<CommandContext>,
): CommandHandler<TaskCreateParsed> {
  return async (ctx: CommandCtx, parsed: TaskCreateParsed): Promise<number> => {
    const command = await getCtx("task create");
    const execution = await makeExecutionContext(command);
    throwIfPolicyDecisionDenied(
      execution.policy.evaluate({
        action: "task_new",
        phase: "plan",
        config: execution.config,
        taskId: "",
        git: { stagedPaths: [] },
      }),
    );

    const outcome = parsed.outcome.trim();
    const descriptionOverride = parsed.description?.trim();
    const description = descriptionOverride?.length ? descriptionOverride : outcome;
    const intent = resolveUserTaskIntent(parsed);
    const executionContract = resolveExplicitExecutionContract({
      parsed,
      config: execution.config,
      intent,
    });
    const route = resolveTaskExecutionRoute({
      config: execution.config,
      requestedMode: parsed.route,
      task: {
        task_kind: intent.taskKind,
        mutation_scope: intent.mutationScope,
        risk_flags: intent.riskFlags,
      },
      declaration: executionContract.declaration,
    });
    const explicitBaseRef = parsed.base?.trim();
    const repositoryIdentity = await resolveLogicalRepositoryIdentity({
      git_root: execution.command.resolvedProject.gitRoot,
      task: {},
    });
    const explicitBase = explicitBaseRef
      ? createTaskExecutionBaseIdentity({
          base_ref: explicitBaseRef,
          base_sha: await gitRevParse(execution.command.resolvedProject.gitRoot, [
            `${explicitBaseRef}^{commit}`,
          ]),
          source: "explicit",
          repository_identity: repositoryIdentity,
        })
      : null;
    const created = await runTaskNewParsed({
      ctx: execution.command,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      printTaskId: false,
      parsed: {
        title: outcome,
        description,
        owner: parsed.owner,
        priority: parsed.priority,
        tags: intent.tags,
        taskKind: intent.taskKind,
        mutationScope: intent.mutationScope,
        riskFlags: intent.riskFlags,
        route: parsed.route,
        executionContract,
        ...(explicitBase
          ? {
              extensions: {
                [TASK_EXECUTION_CONTEXT_EXTENSION_KEY]: explicitBase,
              },
            }
          : {}),
        dependsOn: [],
        verify: parsed.verify,
        allowDuplicate: parsed.allowDuplicate,
      },
    });
    const nextCommand = `agentplane task advance ${created.task_id} --agent-json`;
    const semanticIntent = {
      source: intent.source,
      code: intent.code,
      task_kind: intent.taskKind ?? null,
      mutation_scope: intent.mutationScope,
      risk_flags: intent.riskFlags,
      tags: intent.tags,
      confirmation_required: intent.confirmation_required,
    };
    const payload = {
      task_id: created.task_id,
      status: "semantic_input_required" as const,
      semantic_intent: semanticIntent,
      /** @deprecated Compatibility alias for pre-0.7.6 JSON consumers. */
      inferred_intent: semanticIntent,
      execution_route: route,
      execution_contract: executionContract,
      required_role: "PLANNER" as const,
      next_command: nextCommand,
    };

    if (parsed.json) {
      output.json(payload);
    } else {
      output.report(
        [
          { label: "task", value: created.task_id },
          { label: "status", value: payload.status },
          {
            label: "intent",
            value:
              `${intent.code} source=${intent.source} kind=${intent.taskKind ?? "unknown"} ` +
              `mutation=${intent.mutationScope}`,
          },
          {
            label: "intent_confirmation",
            value: intent.confirmation_required ? "required" : "not_required",
          },
          {
            label: "route",
            value:
              `requested=${route.requested_mode} selected=${route.selected_mode} ` +
              `repository=${route.repository_mode}`,
          },
          { label: "route_reasons", value: route.reason_codes.join(", ") },
          { label: "required_role", value: payload.required_role },
          { label: "next", value: nextCommand },
        ],
        { header: "task create" },
      );
    }
    return 0;
  };
}
