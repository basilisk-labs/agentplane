import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter } from "../../cli/output.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { collectTaskIncidents } from "./shared.js";

type IncidentsCollectParsed = {
  taskId: string;
  check: boolean;
  json: boolean;
};

const output = createCliEmitter();

export const incidentsCollectSpec: CommandSpec<IncidentsCollectParsed> = {
  id: ["incidents", "collect"],
  group: "Policy",
  summary: "Promote reusable resolved external findings from a task into the incident registry.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "check",
      default: false,
      description:
        "Validate incident promotion inputs without writing `.agentplane/policy/incidents.md`.",
    },
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit machine-readable collection details.",
    },
  ],
  examples: [
    {
      cmd: "agentplane incidents collect 202604031416-HEJWTM",
      why: "Promote resolved external incident advice from task Findings into the shared registry.",
    },
    {
      cmd: "agentplane incidents collect 202604031416-HEJWTM --check --json",
      why: "Validate that reusable resolved external findings are complete before finish.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"] ?? ""),
    check: raw.opts.check === true,
    json: raw.opts.json === true,
  }),
};

export function makeRunIncidentsCollectHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: IncidentsCollectParsed): Promise<number> => {
    const commandContext =
      (await getCtx("incidents collect")) ??
      (await loadCommandContext({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null }));
    const result = await collectTaskIncidents({
      ctx: commandContext,
      taskId: p.taskId,
      write: !p.check,
    });
    if (p.json) {
      output.json({
        task_id: p.taskId,
        checked_only: p.check,
        candidates: result.plan.candidates.length,
        promotable: result.plan.promotable.map((item) => item.entry),
        duplicates: result.plan.duplicates.map((item) => item.entry.id),
        wrote: result.wrote,
        registry_path: result.registryPath,
      });
      return 0;
    }
    output.success(
      p.check ? "checked" : "collected",
      p.taskId,
      `candidates=${result.plan.candidates.length} promoted=${result.plan.promotable.length} duplicates=${result.plan.duplicates.length}`,
    );
    if (result.plan.promotable.length > 0 && !p.check) {
      output.info(`Incident registry updated: ${result.registryPath}`);
    }
    return 0;
  };
}
