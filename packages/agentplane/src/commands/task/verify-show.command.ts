import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { backendNotSupportedMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { resolveNativeTaskIdentity } from "../shared/native-task-identity.js";

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
    const nativeIdentity = resolveNativeTaskIdentity(task);
    if (!nativeIdentity) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Task ${task.id} has no canonical Task Kernel identity. Run: agentplane task kernel-migrate ${task.id}`,
      });
    }
    process.stdout.write("\nNative verification identity\n");
    process.stdout.write(`plan_revision: ${nativeIdentity.plan.revision}\n`);
    process.stdout.write(`plan_digest: ${nativeIdentity.plan.digest}\n`);
    process.stdout.write(`policy_digest: ${nativeIdentity.policy.digest}\n`);
    process.stdout.write(`capability_digest: ${nativeIdentity.capability.digest}\n`);
    process.stdout.write(`checks_digest: ${nativeIdentity.checks.digest}\n`);
    process.stdout.write(
      `required_checks: ${nativeIdentity.checks.required_check_ids.join(", ") || "none"}\n`,
    );
    return exitCode;
  };
}
