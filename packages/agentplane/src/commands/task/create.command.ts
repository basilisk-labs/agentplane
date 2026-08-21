import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter } from "../../cli/output.js";
import { makeExecutionContext } from "../../runtime/execution-context.js";
import { gitRevParse } from "@agentplaneorg/core/git";
import {
  createTaskExecutionBaseIdentity,
  TASK_EXECUTION_CONTEXT_EXTENSION_KEY,
} from "@agentplaneorg/core/tasks";
import {
  resolveTaskExecutionContract,
  resolveTaskExecutionRoute,
} from "../../runtime/task-routing/index.js";
import { throwIfPolicyDecisionDenied } from "../shared/policy-deny.js";
import type { CommandContext } from "../shared/task-backend.js";

import { runTaskNewParsed, type TaskNewParsed } from "./new.js";

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
  blueprintRequest?: TaskNewParsed["blueprintRequest"];
  verify: string[];
  base?: string;
  allowDuplicate: boolean;
  json: boolean;
};

export type UserTaskIntent = Pick<
  TaskNewParsed,
  "taskKind" | "mutationScope" | "blueprintRequest" | "tags"
> & {
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
    parsed.blueprintRequest !== undefined ||
    parsed.tags.length > 0;
  if (hasStructuredIntent) {
    return {
      taskKind: parsed.taskKind,
      mutationScope: parsed.mutationScope,
      riskFlags: parsed.riskFlags,
      blueprintRequest: parsed.blueprintRequest,
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
      name: "blueprint-request",
      valueHint: "<id>",
      choices: [
        "analysis.light",
        "content.light",
        "docs.change",
        "code.direct",
        "code.branch_pr",
        "performance.benchmark",
        "quality.regression",
        "context.assimilation",
        "context.maximum_assimilation",
        "post_run.improvement_review",
        "release.strict",
        "ops.approval",
      ],
      description: "Explicit blueprint request supplied by the semantic caller.",
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
      cmd: 'agentplane task create "Fix the parser edge case" --task-kind code --mutation-scope code --blueprint-request code.direct --tag code',
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
      raw.opts["blueprint-request"],
      raw.opts.tag,
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
    blueprintRequest:
      typeof raw.opts["blueprint-request"] === "string"
        ? (raw.opts["blueprint-request"] as TaskNewParsed["blueprintRequest"])
        : undefined,
    verify: Array.isArray(raw.opts.verify) ? (raw.opts.verify as string[]) : [],
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
    const route = resolveTaskExecutionRoute({
      config: execution.config,
      requestedMode: parsed.route,
      task: {
        task_kind: intent.taskKind,
        mutation_scope: intent.mutationScope,
        risk_flags: intent.riskFlags,
        blueprint_request: intent.blueprintRequest,
      },
    });
    const executionContract = resolveTaskExecutionContract({
      config: execution.config,
      requestedMode: parsed.route,
      task: {
        task_kind: intent.taskKind,
        mutation_scope: intent.mutationScope,
        risk_flags: intent.riskFlags,
        blueprint_request: intent.blueprintRequest,
      },
    });
    const explicitBaseRef = parsed.base?.trim();
    const explicitBase = explicitBaseRef
      ? createTaskExecutionBaseIdentity({
          base_ref: explicitBaseRef,
          base_sha: await gitRevParse(execution.command.resolvedProject.gitRoot, [
            `${explicitBaseRef}^{commit}`,
          ]),
          source: "explicit",
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
        blueprintRequest: intent.blueprintRequest,
        route: parsed.route,
        ...(explicitBase
          ? {
              extensions: {
                [TASK_EXECUTION_CONTEXT_EXTENSION_KEY]: explicitBase,
              },
            }
          : {}),
        dependsOn: [],
        verify: parsed.verify,
        showBlueprint: false,
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
      blueprint_request: intent.blueprintRequest ?? null,
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
