import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter } from "../../cli/output.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { CliError } from "../../shared/errors.js";

import { cmdFinish } from "./finish-command.js";
import { cmdVerifyParsed } from "./verify-record.js";
import { existingCommitInfo } from "./finish-shared.js";
import { readCommitInfo } from "./shared.js";

const output = createCliEmitter();

export type TaskCompleteParsed = {
  taskId: string;
  result: string;
  commit?: string;
  by: string;
  author: string;
  note?: string;
  body?: string;
  force: boolean;
  yes: boolean;
  json: boolean;
};

export const taskCompleteSpec: CommandSpec<TaskCompleteParsed> = {
  id: ["task", "complete"],
  group: "Task",
  summary: "Record OK verification and finish a direct task, or print the branch_pr close route.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "result",
      valueHint: "<text>",
      required: true,
      description: "One-line result summary.",
    },
    {
      kind: "string",
      name: "commit",
      valueHint: "<hash>",
      description: "Implementation commit hash to record when finish is allowed.",
    },
    {
      kind: "string",
      name: "by",
      valueHint: "<id>",
      default: "CODER",
      description: "Verifier id.",
    },
    {
      kind: "string",
      name: "author",
      valueHint: "<id>",
      default: "CODER",
      description: "Finish author id for direct-mode finish.",
    },
    {
      kind: "string",
      name: "note",
      valueHint: "<text>",
      description: "Verification note. Defaults to the result.",
    },
    {
      kind: "string",
      name: "body",
      valueHint: "<text>",
      description: "Finish body. Defaults to Verified: <result>.",
    },
    { kind: "boolean", name: "force", default: false, description: "Forward --force to finish." },
    { kind: "boolean", name: "yes", default: false, description: "Auto-approve force gates." },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable JSON." },
  ],
  examples: [
    {
      cmd: 'agentplane task complete 202602030608-F1Q8AB --result "Parser edge case fixed" --commit abcdef1',
      why: "Record verification and finish when the current workflow route allows it.",
    },
  ],
  validateRaw: (raw) => {
    const taskId = typeof raw.args["task-id"] === "string" ? raw.args["task-id"].trim() : "";
    if (!taskId) {
      throw usageError({ spec: taskCompleteSpec, message: "Invalid value for task-id: empty." });
    }
    const result = typeof raw.opts.result === "string" ? raw.opts.result.trim() : "";
    if (!result) {
      throw usageError({ spec: taskCompleteSpec, message: "Invalid value for --result: empty." });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    result: String(raw.opts.result),
    commit: typeof raw.opts.commit === "string" ? String(raw.opts.commit) : undefined,
    by: typeof raw.opts.by === "string" ? String(raw.opts.by) : "CODER",
    author: typeof raw.opts.author === "string" ? String(raw.opts.author) : "CODER",
    note: typeof raw.opts.note === "string" ? String(raw.opts.note) : undefined,
    body: typeof raw.opts.body === "string" ? String(raw.opts.body) : undefined,
    force: raw.opts.force === true,
    yes: raw.opts.yes === true,
    json: raw.opts.json === true,
  }),
};

export function makeRunTaskCompleteHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
): CommandHandler<TaskCompleteParsed> {
  return async (ctx: CommandCtx, p: TaskCompleteParsed): Promise<number> => {
    const command = await getCtx("task complete");
    const workflowMode = command.config.workflow_mode;
    if (workflowMode !== "branch_pr") {
      await assertDirectFinishCommitReady({ ctx: command, taskId: p.taskId, commit: p.commit });
    }

    await cmdVerifyParsed({
      ctx: command,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      state: "ok",
      by: p.by,
      note: p.note ?? p.result,
      quiet: true,
    });

    if (workflowMode === "branch_pr") {
      const nextCommand = `agentplane pr open ${p.taskId} --branch task/${p.taskId}/<slug> --author ${p.by}`;
      const payload = {
        task_id: p.taskId,
        status: "verified",
        workflow_mode: workflowMode,
        next_command: nextCommand,
      };
      if (p.json) {
        output.json(payload);
      } else {
        output.report(
          [
            { label: "task", value: p.taskId },
            { label: "status", value: "verified" },
            { label: "workflow_mode", value: workflowMode },
            { label: "next", value: nextCommand },
          ],
          { header: "task complete" },
        );
      }
      return 0;
    }

    await cmdFinish({
      ctx: command,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskIds: [p.taskId],
      author: p.author,
      body:
        p.body ??
        `Verified: ${p.result}. Guided shortcut recorded verification and is closing the direct task with traceable commit metadata.`,
      result: p.result,
      commit: p.commit,
      breaking: false,
      force: p.force,
      yes: p.yes,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: true,
      commitRequireClean: false,
      statusCommit: false,
      statusCommitAllow: [],
      statusCommitAutoAllow: false,
      statusCommitRequireClean: false,
      confirmStatusCommit: false,
      quiet: true,
    });
    const payload = { task_id: p.taskId, status: "finished", workflow_mode: workflowMode };
    if (p.json) {
      output.json(payload);
    } else {
      output.report(
        [
          { label: "task", value: p.taskId },
          { label: "status", value: "finished" },
          { label: "workflow_mode", value: workflowMode },
        ],
        { header: "task complete" },
      );
    }
    return 0;
  };
}

async function assertDirectFinishCommitReady(opts: {
  ctx: CommandContext;
  taskId: string;
  commit?: string;
}): Promise<void> {
  if (typeof opts.commit === "string" && opts.commit.trim()) {
    await readCommitInfo(opts.ctx.resolvedProject.gitRoot, opts.commit);
    return;
  }

  const task = await loadTaskFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  if (existingCommitInfo(task)) return;

  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: [
      "task complete requires --commit <hash> or existing task commit metadata before recording verification.",
      `task_missing_commit=${opts.taskId}`,
      "Fix:",
      "  1) Select the implementation commit explicitly: git log --oneline --decorate -n 10",
      '  2) Re-run: agentplane task complete <task-id> --result "..." --commit <hash>',
    ].join("\n"),
  });
}
