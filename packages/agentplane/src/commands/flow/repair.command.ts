import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";

export type FlowRepairParsed = {
  taskId: string;
  dryRun: boolean;
  json: boolean;
};

export const flowRepairSpec: CommandSpec<FlowRepairParsed> = {
  id: ["flow", "repair"],
  group: "Workflow",
  summary: "Print a dry-run repair plan for task workflow drift.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "dry-run",
      default: true,
      description: "Print planned repairs without mutating. Currently required.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    {
      cmd: "agentplane flow repair 202602030608-F1Q8AB --dry-run",
      why: "Classify workflow drift and print safe next commands.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    dryRun: raw.opts["dry-run"] !== false,
    json: raw.opts.json === true,
  }),
};

export function makeRunFlowRepairHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: FlowRepairParsed): Promise<number> => {
    if (!parsed.dryRun) {
      throw usageError({
        spec: flowRepairSpec,
        message: "flow repair only supports --dry-run in this release.",
        command: "flow repair",
      });
    }
    const decision = await buildTaskRouteDecision({
      ctx: await getCtx("flow repair"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      taskId: parsed.taskId,
    });
    const output = createCliEmitter();
    if (parsed.json) {
      output.json({
        task: decision.task,
        blockers: decision.blockers,
        repair_plan: decision.repairPlan,
        next_action: decision.nextAction,
      });
      return 0;
    }
    output.report(
      [
        { label: "dry_run", value: true },
        { label: "task", value: `${decision.task.id} ${decision.task.status}` },
        ...decision.blockers.map((blocker) => ({
          label: "blocker",
          value: `${blocker.code}: ${blocker.summary}`,
        })),
        ...decision.repairPlan.map((step) => ({
          label: step.mutates ? "would_run" : "inspect",
          value: step.command ?? `${step.code}: ${step.summary}`,
        })),
      ],
      { header: infoMessage(`flow repair: ${parsed.taskId}`) },
    );
    return 0;
  };
}
