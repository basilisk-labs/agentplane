import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";

import { runTaskNewParsed, type TaskNewParsed } from "./new.js";
import { cmdTaskPlanApprove, cmdTaskPlanSet } from "./plan.js";
import { cmdTaskStartReady } from "./start-ready.js";

const output = createCliEmitter();

export type TaskBeginParsed = {
  title: string;
  description?: string;
  owner: string;
  priority: "low" | "normal" | "med" | "high";
  tags: string[];
  plan?: string;
  verify: string[];
  taskKind?: TaskNewParsed["taskKind"];
  mutationScope?: TaskNewParsed["mutationScope"];
  blueprintRequest?: TaskNewParsed["blueprintRequest"];
  json: boolean;
};

export const taskBeginSpec: CommandSpec<TaskBeginParsed> = {
  id: ["task", "begin"],
  group: "Task",
  summary: "Create, plan, approve, and start or route a task through the normal lifecycle.",
  args: [{ name: "title", required: true, valueHint: "<title>" }],
  options: [
    {
      kind: "string",
      name: "description",
      valueHint: "<text>",
      description: "Task description. Defaults to the title.",
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
      name: "tag",
      valueHint: "<tag>",
      repeatable: true,
      description: "Repeatable. Adds a tag. Defaults to code.",
    },
    {
      kind: "string",
      name: "plan",
      valueHint: "<text>",
      description: String.raw`Plan text. Defaults to a minimal generated plan; escaped newlines (\n) are supported by task plan set.`,
    },
    {
      kind: "string",
      name: "verify",
      valueHint: "<command>",
      repeatable: true,
      description: "Repeatable. Verification commands/checks to seed on the task.",
    },
    {
      kind: "string",
      name: "task-kind",
      valueHint: "<analysis|content|docs|code|release|ops|context>",
      choices: ["analysis", "content", "docs", "code", "release", "ops", "context"],
      description: "Structured blueprint task-kind intent.",
    },
    {
      kind: "string",
      name: "mutation-scope",
      valueHint: "<none|docs|code|release|ops|context|unknown>",
      choices: ["none", "docs", "code", "release", "ops", "context", "unknown"],
      description: "Structured mutation scope used by blueprint resolution.",
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
      description: "Explicit blueprint request stored on the task.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable JSON." },
  ],
  examples: [
    {
      cmd: 'agentplane task begin "Fix parser edge case" --tag code --verify "bun run test:fast"',
      why: "Create the task, seed a minimal plan, approve it, then start or print the branch_pr worktree route.",
    },
  ],
  validateRaw: (raw) => {
    const title = typeof raw.args.title === "string" ? raw.args.title.trim() : "";
    if (!title) {
      throw usageError({ spec: taskBeginSpec, message: "Invalid value for title: empty." });
    }
    const owner = typeof raw.opts.owner === "string" ? raw.opts.owner.trim() : "CODER";
    if (!owner) {
      throw usageError({ spec: taskBeginSpec, message: "Invalid value for --owner: empty." });
    }
  },
  parse: (raw) => ({
    title: String(raw.args.title),
    description:
      typeof raw.opts.description === "string" ? String(raw.opts.description) : undefined,
    owner: typeof raw.opts.owner === "string" ? String(raw.opts.owner) : "CODER",
    priority: (raw.opts.priority ?? "med") as TaskBeginParsed["priority"],
    tags: Array.isArray(raw.opts.tag) ? (raw.opts.tag as string[]) : ["code"],
    plan: typeof raw.opts.plan === "string" ? String(raw.opts.plan) : undefined,
    verify: Array.isArray(raw.opts.verify) ? (raw.opts.verify as string[]) : [],
    taskKind: raw.opts["task-kind"] as TaskBeginParsed["taskKind"],
    mutationScope: raw.opts["mutation-scope"] as TaskBeginParsed["mutationScope"],
    blueprintRequest: raw.opts["blueprint-request"] as TaskBeginParsed["blueprintRequest"],
    json: raw.opts.json === true,
  }),
};

function defaultPlan(title: string): string {
  return [
    `1. Clarify the smallest safe implementation scope for: ${title}.`,
    "2. Make the scoped change using existing project conventions.",
    "3. Run the task Verify Steps and record the result before finishing.",
  ].join("\n");
}

async function captureStdout(fn: () => Promise<number>): Promise<{ code: number; stdout: string }> {
  const originalWrite = process.stdout.write.bind(process.stdout);
  let stdout = "";
  process.stdout.write = ((chunk: unknown, ...args: unknown[]) => {
    stdout += typeof chunk === "string" ? chunk : Buffer.isBuffer(chunk) ? chunk.toString() : "";
    void originalWrite;
    void args;
    return true;
  }) as typeof process.stdout.write;
  try {
    const code = await fn();
    return { code, stdout };
  } finally {
    process.stdout.write = originalWrite as typeof process.stdout.write;
  }
}

function extractTaskId(stdout: string): string {
  const match = /\b\d{12}-[A-Z0-9]{6}\b/.exec(stdout);
  if (!match) {
    throw usageError({
      spec: taskBeginSpec,
      message: "task begin could not determine the task id created by task new.",
    });
  }
  return match[0];
}

export function makeRunTaskBeginHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
): CommandHandler<TaskBeginParsed> {
  return async (ctx: CommandCtx, p: TaskBeginParsed): Promise<number> => {
    const command = await getCtx("task begin");
    const workflowMode = command.config.workflow_mode;
    const trimmedDescription = p.description?.trim();
    const description =
      typeof trimmedDescription === "string" && trimmedDescription.length > 0
        ? trimmedDescription
        : p.title.trim();
    const tags = p.tags.length > 0 ? p.tags : ["code"];
    const created = await captureStdout(() =>
      runTaskNewParsed({
        ctx: command,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride,
        parsed: {
          title: p.title,
          description,
          owner: p.owner,
          priority: p.priority,
          tags,
          taskKind: p.taskKind,
          mutationScope: p.mutationScope,
          riskFlags: [],
          blueprintRequest: p.blueprintRequest,
          dependsOn: [],
          verify: p.verify,
          showBlueprint: false,
          allowDuplicate: false,
        },
      }),
    );
    if (created.code !== 0) return created.code;
    const taskId = extractTaskId(created.stdout);
    await captureStdout(() =>
      cmdTaskPlanSet({
        ctx: command,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride,
        taskId,
        text: p.plan ?? defaultPlan(p.title),
        updatedBy: "ORCHESTRATOR",
      }),
    );
    await cmdTaskPlanApprove({
      ctx: command,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId,
      by: "ORCHESTRATOR",
    });

    let status: "started" | "routed" = "routed";
    let nextCommand = `agentplane work start ${taskId} --agent ${p.owner} --slug <slug> --worktree`;
    if (workflowMode === "direct") {
      await cmdTaskStartReady({
        ctx: command,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride,
        taskId,
        author: p.owner,
        body: `Start: ${p.title}. Guided shortcut created the task, approved the plan, and entered execution.`,
        force: false,
        yes: false,
        quiet: true,
      });
      status = "started";
      nextCommand = `agentplane task verify-show ${taskId}`;
    }

    const payload = {
      task_id: taskId,
      status,
      workflow_mode: workflowMode,
      next_command: nextCommand,
    };
    if (p.json) {
      output.json(payload);
    } else {
      output.report(
        [
          { label: "task", value: taskId },
          { label: "status", value: status },
          { label: "workflow_mode", value: workflowMode },
          { label: "next", value: nextCommand },
        ],
        { header: "task begin" },
      );
    }
    return 0;
  };
}
