import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter } from "../../cli/output.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { collectTaskIncidents, renderIncidentCollectionPlanOutcome } from "./shared.js";

type IncidentsCollectParsed = {
  taskId: string;
  check: boolean;
  json: boolean;
};

const output = createCliEmitter();

export const incidentsCollectSpec: CommandSpec<IncidentsCollectParsed> = {
  id: ["incidents", "collect"],
  group: "Policy",
  summary: "Validate and promote CURATOR-style reusable incident findings into the registry.",
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
        skipped: result.plan.skipped,
        promotable: result.plan.promotable.map((item) => item.entry),
        duplicates: result.plan.duplicates.map((item) => item.entry.id),
        wrote: result.wrote,
        registry_path: result.registryPath,
        registry_paths: result.registryPaths,
      });
      return 0;
    }
    output.success(
      p.check ? "checked" : "collected",
      p.taskId,
      `candidates=${result.plan.candidates.length} skipped=${result.plan.skipped.length} promoted=${result.plan.promotable.length} duplicates=${result.plan.duplicates.length}`,
    );
    output.info(
      renderIncidentCollectionPlanOutcome(result.plan, {
        wrote: result.wrote,
        context: "collect",
        promotedIds: result.plan.promotable.map((item) => item.entry.id),
        registryPaths: result.registryPaths,
      }),
    );
    return 0;
  };
}
