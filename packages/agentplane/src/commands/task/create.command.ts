import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter } from "../../cli/output.js";
import { makeExecutionContext } from "../../runtime/execution-context.js";
import { resolveTaskExecutionRoute } from "../../runtime/task-routing/index.js";
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
  verify: string[];
  allowDuplicate: boolean;
  json: boolean;
};

export type InferredTaskIntent = Pick<
  TaskNewParsed,
  "taskKind" | "mutationScope" | "riskFlags" | "blueprintRequest" | "tags"
> & {
  inference_code: string;
  confirmation_required?: boolean;
};

const RELEASE_TERMS = ["release", "publish", "version bump", "npm", "релиз", "опубликов", "верси"];
const OPS_TERMS = [
  "deploy",
  "production",
  "infrastructure",
  "server",
  "kubernetes",
  "docker",
  "деплой",
  "продакш",
  "инфраструктур",
  "сервер",
];
const SECURITY_TERMS = [
  "security",
  "credential",
  "secret",
  "authentication",
  "authorization",
  "безопасност",
  "секрет",
  "аутентификац",
  "авторизац",
];
const CONTEXT_TERMS = [
  "context layer",
  "context pack",
  "knowledge base",
  "контекст",
  "база знаний",
];
const DOCS_TERMS = [
  "documentation",
  "readme",
  "docs",
  "guide",
  "документац",
  "руководств",
  "инструкц",
];
const PERFORMANCE_TERMS = [
  "performance",
  "benchmark",
  "latency",
  "optimize",
  "производительн",
  "бенчмарк",
  "задержк",
  "оптимиз",
];
const QUALITY_TERMS = [
  "regression",
  "test coverage",
  "quality gate",
  "регрес",
  "покрытие тест",
  "качество",
];
const ANALYSIS_TERMS = [
  "analyze",
  "analysis",
  "audit",
  "review",
  "research",
  "сравни",
  "анализ",
  "аудит",
  "ревью",
  "исслед",
];
const COMPLEX_CHANGE_TERMS = [
  "refactor",
  "migration",
  "architecture",
  "redesign",
  "breaking",
  "across packages",
  "multi-module",
  "framework",
  "рефактор",
  "миграц",
  "архитект",
  "переработ",
  "нескольк",
  "фреймворк",
];
const CODE_CHANGE_WORDS = new Set([
  "fix",
  "fixes",
  "fixed",
  "fixing",
  "implement",
  "implements",
  "implemented",
  "implementing",
  "add",
  "adds",
  "added",
  "adding",
  "update",
  "updates",
  "updated",
  "updating",
  "change",
  "changes",
  "changed",
  "changing",
  "remove",
  "removes",
  "removed",
  "removing",
  "bug",
  "bugs",
  "build",
  "builds",
  "built",
  "building",
  "create",
  "creates",
  "created",
  "creating",
]);
const CODE_CHANGE_STEMS = ["исправ", "почин", "добав", "реализ", "измен", "удал", "баг"];

function containsAny(value: string, terms: readonly string[]): boolean {
  return terms.some((term) => value.includes(term));
}

function containsCodeChangeIntent(value: string): boolean {
  const englishWords = value.match(/[a-z]+/gu) ?? [];
  return (
    englishWords.some((word) => CODE_CHANGE_WORDS.has(word)) ||
    containsAny(value, CODE_CHANGE_STEMS)
  );
}

export function inferUserTaskIntent(outcome: string, description?: string): InferredTaskIntent {
  const text = `${outcome}\n${description ?? ""}`.toLocaleLowerCase();

  if (containsAny(text, RELEASE_TERMS)) {
    return {
      taskKind: "release",
      mutationScope: "release",
      riskFlags: ["publish"],
      blueprintRequest: "release.strict",
      tags: ["release"],
      inference_code: "release_intent",
    };
  }
  if (containsAny(text, OPS_TERMS)) {
    return {
      taskKind: "ops",
      mutationScope: "ops",
      riskFlags: ["deploy", "external_system"],
      blueprintRequest: "ops.approval",
      tags: ["ops"],
      inference_code: "operations_intent",
    };
  }
  if (containsAny(text, SECURITY_TERMS)) {
    return {
      taskKind: "code",
      mutationScope: "code",
      riskFlags: ["security"],
      blueprintRequest: "code.branch_pr",
      tags: ["code", "security"],
      inference_code: "security_sensitive_change",
    };
  }
  if (containsAny(text, CONTEXT_TERMS)) {
    return {
      taskKind: "context",
      mutationScope: "context",
      riskFlags: [],
      blueprintRequest: "context.assimilation",
      tags: ["context"],
      inference_code: "context_intent",
    };
  }
  if (containsAny(text, DOCS_TERMS)) {
    return {
      taskKind: "docs",
      mutationScope: "docs",
      riskFlags: [],
      blueprintRequest: "docs.change",
      tags: ["docs"],
      inference_code: "documentation_change",
    };
  }
  if (containsAny(text, PERFORMANCE_TERMS)) {
    return {
      taskKind: "code",
      mutationScope: "code",
      riskFlags: [],
      blueprintRequest: "performance.benchmark",
      tags: ["code", "performance"],
      inference_code: "performance_change",
    };
  }
  if (containsAny(text, QUALITY_TERMS)) {
    return {
      taskKind: "code",
      mutationScope: "code",
      riskFlags: [],
      blueprintRequest: "quality.regression",
      tags: ["code", "test"],
      inference_code: "quality_change",
    };
  }
  if (containsAny(text, ANALYSIS_TERMS)) {
    return {
      taskKind: "analysis",
      mutationScope: "none",
      riskFlags: [],
      blueprintRequest: "analysis.light",
      tags: ["analysis"],
      inference_code: "analysis_only",
    };
  }
  if (containsAny(text, COMPLEX_CHANGE_TERMS)) {
    return {
      taskKind: "code",
      mutationScope: "code",
      riskFlags: [],
      blueprintRequest: "code.branch_pr",
      tags: ["code"],
      inference_code: "complex_code_change",
    };
  }
  if (containsCodeChangeIntent(text)) {
    return {
      taskKind: "code",
      mutationScope: "code",
      riskFlags: [],
      blueprintRequest: "code.direct",
      tags: ["code"],
      inference_code: "bounded_code_change",
    };
  }
  return {
    mutationScope: "unknown",
    riskFlags: [],
    tags: ["intake"],
    inference_code: "unknown_intent",
    confirmation_required: true,
  };
}

export const taskCreateSpec: CommandSpec<TaskCreateParsed> = {
  id: ["task", "create"],
  group: "Task",
  summary: "Create a task from a natural-language outcome and explain its execution route.",
  description:
    "Infers conservative structured intent, stores an explainable automatic route, and stops at the semantic planning boundary.",
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
      name: "verify",
      valueHint: "<command>",
      repeatable: true,
      description: "Repeatable. Seed an explicit verification command.",
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
      cmd: 'agentplane task create "Fix the parser edge case"',
      why: "Create a bounded task with automatic route selection.",
    },
    {
      cmd: 'agentplane task create "Publish the next patch release" --json',
      why: "Create a high-risk task and return its branch_pr decision as JSON.",
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
  },
  parse: (raw) => ({
    outcome: String(raw.args.outcome),
    description:
      typeof raw.opts.description === "string" ? String(raw.opts.description) : undefined,
    owner: typeof raw.opts.owner === "string" ? String(raw.opts.owner) : "CODER",
    priority: (raw.opts.priority ?? "med") as TaskCreateParsed["priority"],
    route: (raw.opts.route ?? "auto") as UserTaskRoute,
    verify: Array.isArray(raw.opts.verify) ? (raw.opts.verify as string[]) : [],
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
    const intent = inferUserTaskIntent(outcome, description);
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
        dependsOn: [],
        verify: parsed.verify,
        showBlueprint: false,
        allowDuplicate: parsed.allowDuplicate,
      },
    });
    const nextCommand = `agentplane task advance ${created.task_id} --agent-json`;
    const payload = {
      task_id: created.task_id,
      status: "semantic_input_required" as const,
      inferred_intent: {
        code: intent.inference_code,
        task_kind: intent.taskKind ?? null,
        mutation_scope: intent.mutationScope,
        risk_flags: intent.riskFlags,
        blueprint_request: intent.blueprintRequest ?? null,
        tags: intent.tags,
        confirmation_required: intent.confirmation_required === true,
      },
      execution_route: route,
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
              `${intent.inference_code} kind=${intent.taskKind ?? "unknown"} ` +
              `mutation=${intent.mutationScope}`,
          },
          {
            label: "intent_confirmation",
            value: intent.confirmation_required === true ? "required" : "not_required",
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
