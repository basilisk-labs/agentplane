import type { CommandCtx, CommandSpec } from "../cli2/spec.js";
import { usageError } from "../cli2/errors.js";
import type { CommandContext } from "./shared/task-backend.js";
import { cmdIntegrate } from "./pr/index.js";

export type IntegrateParsed = {
  taskId: string;
  branch: string | null;
  base: string | null;
  mergeStrategy: "squash" | "merge" | "rebase";
  runVerify: boolean;
  dryRun: boolean;
  quiet: boolean;
};

export const integrateSpec: CommandSpec<IntegrateParsed> = {
  id: ["integrate"],
  group: "PR",
  summary: "Integrate a task branch into the base branch (branch_pr workflow).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    { kind: "string", name: "branch", valueHint: "<name>", description: "Branch name override." },
    { kind: "string", name: "base", valueHint: "<name>", description: "Base branch override." },
    {
      kind: "string",
      name: "merge-strategy",
      valueHint: "<squash|merge|rebase>",
      choices: ["squash", "merge", "rebase"],
      default: "squash",
      description: "Merge strategy (default: squash).",
    },
    { kind: "boolean", name: "run-verify", default: false, description: "Run verify commands." },
    { kind: "boolean", name: "dry-run", default: false, description: "Do not modify git state." },
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [
    { cmd: "agentplane integrate 202602030608-F1Q8AB --run-verify", why: "Integrate with verify." },
  ],
  validateRaw: (raw) => {
    const base = typeof raw.opts.base === "string" ? raw.opts.base.trim() : "";
    if (raw.opts.base !== undefined && !base) {
      throw usageError({ spec: integrateSpec, message: "Invalid value for --base: empty." });
    }
    const branch = typeof raw.opts.branch === "string" ? raw.opts.branch.trim() : "";
    if (raw.opts.branch !== undefined && !branch) {
      throw usageError({ spec: integrateSpec, message: "Invalid value for --branch: empty." });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    branch: typeof raw.opts.branch === "string" ? raw.opts.branch : null,
    base: typeof raw.opts.base === "string" ? raw.opts.base : null,
    mergeStrategy: (raw.opts["merge-strategy"] ?? "squash") as IntegrateParsed["mergeStrategy"],
    runVerify: raw.opts["run-verify"] === true,
    dryRun: raw.opts["dry-run"] === true,
    quiet: raw.opts.quiet === true,
  }),
};

export function makeRunIntegrateHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: IntegrateParsed): Promise<number> => {
    return await cmdIntegrate({
      ctx: await getCtx("integrate"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      branch: p.branch ?? undefined,
      base: p.base ?? undefined,
      mergeStrategy: p.mergeStrategy,
      runVerify: p.runVerify,
      dryRun: p.dryRun,
      quiet: p.quiet,
    });
  };
}
