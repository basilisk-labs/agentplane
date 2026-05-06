import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import {
  explainResolvedBlueprint,
  formatBlueprintExplain,
  resolveBlueprint,
} from "../../blueprints/index.js";
import { backendNotSupportedMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { checkTaskBlueprintSnapshotDrift } from "../blueprint/snapshot-artifact.js";
import { blueprintResolveInputFromTask } from "../blueprint/task-input.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

import { cmdTaskDocShow } from "./doc.js";
import { assertVerifyStepsFilled, extractDocSection, isVerifyStepsFilled } from "./shared.js";

export type TaskVerifyShowParsed = {
  taskId: string;
  quiet: boolean;
};

export const taskVerifyShowSpec: CommandSpec<TaskVerifyShowParsed> = {
  id: ["task", "verify-show"],
  group: "Task",
  summary:
    'Print the task Verify Steps acceptance contract (alias for task doc show --section "Verify Steps").',
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "quiet",
      default: false,
      description: "Suppress errors when the section is missing.",
    },
  ],
  examples: [
    { cmd: "agentplane task verify-show 202602030608-F1Q8AB", why: "Print Verify Steps." },
    {
      cmd: "agentplane task verify-show 202602030608-F1Q8AB --quiet",
      why: "Print Verify Steps without erroring when missing.",
    },
  ],
  notes: [
    "`## Verify Steps` is the ex-ante acceptance contract for the verifier.",
    "Verification results are recorded later in `## Verification` via `agentplane verify ...`.",
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    quiet: raw.opts.quiet === true,
  }),
};

export function makeRunTaskVerifyShowHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskVerifyShowParsed): Promise<number> => {
    const commandCtx = await getCtx("task verify-show");
    const backend = commandCtx.taskBackend;
    if (!backend.getTaskDoc) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: backendNotSupportedMessage("task docs"),
      });
    }
    const task = await loadTaskFromContext({ ctx: commandCtx, taskId: p.taskId });
    const doc =
      typeof task.doc === "string" ? task.doc : ((await backend.getTaskDoc(p.taskId)) ?? "");
    const verifySteps = extractDocSection(doc, "Verify Steps");
    if (!p.quiet) {
      assertVerifyStepsFilled({
        taskId: p.taskId,
        sectionText: verifySteps,
        action: "show Verify Steps",
        guidance: "fill it before verification",
      });
    } else if (!isVerifyStepsFilled(verifySteps)) {
      return 0;
    }

    const exitCode = await cmdTaskDocShow({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      section: "Verify Steps",
      quiet: p.quiet,
    });
    const input = blueprintResolveInputFromTask({ task, config: commandCtx.config });
    const resolved = resolveBlueprint({ input });
    const output = explainResolvedBlueprint({ resolved, workflowMode: input.workflowMode });
    process.stdout.write(`\nBlueprint expected evidence\n${formatBlueprintExplain(output)}`);
    const snapshot = await checkTaskBlueprintSnapshotDrift({ ctx: commandCtx, task });
    process.stdout.write("Blueprint snapshot evidence\n");
    process.stdout.write(`snapshot_state: ${snapshot.state}\n`);
    process.stdout.write(`snapshot_path: ${snapshot.path}\n`);
    process.stdout.write(`snapshot_digest: ${snapshot.previous.digest ?? "none"}\n`);
    process.stdout.write(`snapshot_current_digest: ${snapshot.current.digest}\n`);
    process.stdout.write(
      `snapshot_route_changed: ${
        snapshot.routeChanged === null ? "unknown" : snapshot.routeChanged ? "yes" : "no"
      }\n`,
    );
    process.stdout.write(
      `snapshot_required_evidence: ${output.requiredEvidence.map((item) => item.id).join(", ") || "none"}\n`,
    );
    process.stdout.write(`snapshot_safe_command: ${snapshot.safeCommand}\n`);
    return exitCode;
  };
}
