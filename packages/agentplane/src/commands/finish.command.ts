import type { CommandCtx, CommandSpec } from "../cli/spec/spec.js";
import { usageError } from "../cli/spec/errors.js";
import { toStringList } from "../cli/spec/parse-utils.js";
import type { CommandContext } from "./shared/task-backend.js";

import { cmdFinish } from "./task/finish.js";

export type FinishParsed = {
  taskIds: string[];
  author: string;
  body: string;
  result?: string;
  risk?: "low" | "med" | "high";
  breaking: boolean;
  commit?: string;
  force: boolean;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  statusCommit: boolean;
  statusCommitEmoji?: string;
  statusCommitAllow: string[];
  statusCommitAutoAllow: boolean;
  statusCommitRequireClean: boolean;
  confirmStatusCommit: boolean;
  quiet: boolean;
};

export const finishSpec: CommandSpec<FinishParsed> = {
  id: ["finish"],
  group: "Lifecycle",
  summary: "Mark task(s) as DONE and record a structured Verified comment.",
  args: [
    {
      name: "task-id",
      required: true,
      variadic: true,
      valueHint: "<task-id>",
      description: "One or more existing task ids.",
    },
  ],
  options: [
    {
      kind: "string",
      name: "author",
      valueHint: "<id>",
      required: true,
      description: "Comment author id (e.g. INTEGRATOR).",
    },
    {
      kind: "string",
      name: "body",
      valueHint: "<text>",
      required: true,
      description: "Structured comment body (must match the configured Verified: prefix).",
    },
    {
      kind: "string",
      name: "result",
      valueHint: "<one-line>",
      description:
        "One-line result summary stored in task metadata (required for non-spike tasks when finishing a single task).",
    },
    {
      kind: "string",
      name: "risk",
      valueHint: "<low|med|high>",
      choices: ["low", "med", "high"],
      description: "Optional. Risk level stored in task metadata.",
    },
    {
      kind: "boolean",
      name: "breaking",
      default: false,
      description: "Optional. Mark the change as breaking in task metadata.",
    },
    {
      kind: "string",
      name: "commit",
      valueHint: "<hash>",
      description: "Commit hash to record on the task (optional).",
    },
    { kind: "boolean", name: "force", default: false, description: "Force finish despite gates." },
    {
      kind: "boolean",
      name: "commit-from-comment",
      default: false,
      description: "Create a commit using the comment body (requires exactly one task id).",
    },
    {
      kind: "string",
      name: "commit-emoji",
      valueHint: "<emoji>",
      description: "Override the commit emoji (used with --commit-from-comment).",
    },
    {
      kind: "string",
      name: "commit-allow",
      valueHint: "<path-prefix>",
      repeatable: true,
      description:
        "Repeatable. Allowlist path prefixes to stage for the commit (used with --commit-from-comment).",
    },
    {
      kind: "boolean",
      name: "commit-auto-allow",
      default: false,
      description:
        "Auto-allow inferred allowlist paths if none are provided (used with --commit-from-comment).",
    },
    {
      kind: "boolean",
      name: "commit-allow-tasks",
      default: true,
      hidden: true,
      description: "Deprecated. Tasks are always allowed for status commits.",
      deprecated: "no-op",
    },
    {
      kind: "boolean",
      name: "commit-require-clean",
      default: false,
      description: "Require a clean working tree for the commit (used with --commit-from-comment).",
    },
    {
      kind: "boolean",
      name: "status-commit",
      default: false,
      description: "Create a separate status commit (requires exactly one task id).",
    },
    {
      kind: "string",
      name: "status-commit-emoji",
      valueHint: "<emoji>",
      description: "Override the status commit emoji (used with --status-commit).",
    },
    {
      kind: "string",
      name: "status-commit-allow",
      valueHint: "<path-prefix>",
      repeatable: true,
      description:
        "Repeatable. Allowlist path prefixes to stage for the status commit (used with --status-commit).",
    },
    {
      kind: "boolean",
      name: "status-commit-auto-allow",
      default: false,
      description:
        "Auto-allow inferred allowlist paths if none are provided (used with --status-commit).",
    },
    {
      kind: "boolean",
      name: "status-commit-require-clean",
      default: false,
      description:
        "Require a clean working tree for the status commit (used with --status-commit).",
    },
    {
      kind: "boolean",
      name: "confirm-status-commit",
      default: false,
      description:
        "Confirm status commit creation when status_commit_policy=confirm (used with --commit-from-comment or --status-commit).",
    },
    { kind: "boolean", name: "quiet", default: false, description: "Suppress output." },
  ],
  examples: [
    {
      cmd: 'agentplane finish 202602030608-F1Q8AB --author INTEGRATOR --body "Verified: all checks passed" --commit abcdef123456',
      why: "Finish a task and record commit metadata.",
    },
    {
      cmd: 'agentplane finish 202602030608-F1Q8AB --author INTEGRATOR --body "Verified: all checks passed" --commit-from-comment --commit-allow packages/agentplane/src',
      why: "Finish and create a commit from the comment (single-task only).",
    },
  ],
  validateRaw: (raw) => {
    const ids = raw.args["task-id"];
    const taskIds = Array.isArray(ids) ? ids : [];
    const commitFromComment = raw.opts["commit-from-comment"] === true;
    const statusCommit = raw.opts["status-commit"] === true;
    if ((commitFromComment || statusCommit) && taskIds.length !== 1) {
      throw usageError({
        spec: finishSpec,
        command: "finish",
        message: "--commit-from-comment/--status-commit requires exactly one task id",
      });
    }
    const hasMeta =
      typeof raw.opts.result === "string" ||
      typeof raw.opts.risk === "string" ||
      raw.opts.breaking === true;
    if (hasMeta && taskIds.length !== 1) {
      throw usageError({
        spec: finishSpec,
        command: "finish",
        message: "--result/--risk/--breaking requires exactly one task id",
      });
    }
  },
  parse: (raw) => ({
    taskIds: Array.isArray(raw.args["task-id"])
      ? raw.args["task-id"].filter((x): x is string => typeof x === "string")
      : [],
    author: raw.opts.author as string,
    body: raw.opts.body as string,
    result: raw.opts.result as string | undefined,
    risk: raw.opts.risk as FinishParsed["risk"],
    breaking: raw.opts.breaking === true,
    commit: raw.opts.commit as string | undefined,
    force: raw.opts.force === true,
    commitFromComment: raw.opts["commit-from-comment"] === true,
    commitEmoji: raw.opts["commit-emoji"] as string | undefined,
    commitAllow: toStringList(raw.opts["commit-allow"]),
    commitAutoAllow: raw.opts["commit-auto-allow"] === true,
    commitAllowTasks: raw.opts["commit-allow-tasks"] !== false,
    commitRequireClean: raw.opts["commit-require-clean"] === true,
    statusCommit: raw.opts["status-commit"] === true,
    statusCommitEmoji: raw.opts["status-commit-emoji"] as string | undefined,
    statusCommitAllow: toStringList(raw.opts["status-commit-allow"]),
    statusCommitAutoAllow: raw.opts["status-commit-auto-allow"] === true,
    statusCommitRequireClean: raw.opts["status-commit-require-clean"] === true,
    confirmStatusCommit: raw.opts["confirm-status-commit"] === true,
    quiet: raw.opts.quiet === true,
  }),
};

export function makeRunFinishHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: FinishParsed): Promise<number> => {
    if (p.taskIds.length === 0) {
      throw usageError({
        spec: finishSpec,
        command: "finish",
        message: "Missing required argument: task-id",
      });
    }
    return await cmdFinish({
      ctx: await getCtx("finish"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskIds: p.taskIds,
      author: p.author,
      body: p.body,
      result: p.result,
      risk: p.risk,
      breaking: p.breaking,
      commit: p.commit,
      force: p.force,
      commitFromComment: p.commitFromComment,
      commitEmoji: p.commitEmoji,
      commitAllow: p.commitAllow,
      commitAutoAllow: p.commitAutoAllow,
      commitAllowTasks: p.commitAllowTasks,
      commitRequireClean: p.commitRequireClean,
      statusCommit: p.statusCommit,
      statusCommitEmoji: p.statusCommitEmoji,
      statusCommitAllow: p.statusCommitAllow,
      statusCommitAutoAllow: p.statusCommitAutoAllow,
      statusCommitRequireClean: p.statusCommitRequireClean,
      confirmStatusCommit: p.confirmStatusCommit,
      quiet: p.quiet,
    });
  };
}
