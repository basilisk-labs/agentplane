import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CliReportEntry } from "../../cli/output.js";

import { loadCommandContext } from "../shared/task-backend.js";
import { readTaskHandoffLatestRequired, resolveTaskHandoffPaths } from "../shared/task-handoff.js";

export type TaskHandoffShowParsed = {
  taskId: string;
  json: boolean;
};

export const taskHandoffShowSpec: CommandSpec<TaskHandoffShowParsed> = {
  id: ["task", "handoff", "show"],
  group: "Task",
  summary: "Show the latest persisted task handoff snapshot.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit machine-readable handoff JSON.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    json: raw.opts.json === true,
  }),
};

const emitter = createCliEmitter();

export const runTaskHandoffShow = async (ctx: CommandCtx, parsed: TaskHandoffShowParsed) => {
  const commandCtx = await loadCommandContext({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
  });
  const paths = resolveTaskHandoffPaths({
    git_root: commandCtx.resolvedProject.gitRoot,
    workflow_dir: commandCtx.config.paths.workflow_dir,
    task_id: parsed.taskId,
  });
  const handoff = await readTaskHandoffLatestRequired({
    task_id: parsed.taskId,
    paths,
  });
  if (parsed.json) {
    emitter.json(handoff);
    return 0;
  }
  const entries: CliReportEntry[] = [
    { label: "from", value: handoff.from_role },
    { label: "to", value: handoff.to_role ?? "unassigned" },
    { label: "created_at", value: handoff.created_at },
    { label: "reason", value: handoff.reason },
  ];
  if (handoff.branch) entries.push({ label: "branch", value: handoff.branch });
  if (handoff.base_branch) entries.push({ label: "base_branch", value: handoff.base_branch });
  if (handoff.head_sha) entries.push({ label: "head_sha", value: handoff.head_sha });
  if (handoff.pr_branch) entries.push({ label: "pr_branch", value: handoff.pr_branch });
  if (handoff.route?.kind) entries.push({ label: "route_kind", value: handoff.route.kind });
  if (handoff.route?.status) entries.push({ label: "route_status", value: handoff.route.status });
  if (handoff.route?.local_mutation) {
    entries.push({ label: "route_local_mutation", value: handoff.route.local_mutation });
  }
  if (handoff.route?.finalize_via) {
    entries.push({ label: "route_finalize_via", value: handoff.route.finalize_via });
  }
  if (typeof handoff.route?.pr_number === "number") {
    entries.push({ label: "route_pr_number", value: String(handoff.route.pr_number) });
  }
  if (handoff.route?.pr_url) entries.push({ label: "route_pr_url", value: handoff.route.pr_url });
  if (handoff.route?.handoff_show_command) {
    entries.push({
      label: "route_handoff_show_command",
      value: handoff.route.handoff_show_command,
    });
  }
  if (handoff.route?.base_pull_command) {
    entries.push({ label: "route_base_pull_command", value: handoff.route.base_pull_command });
  }
  for (const action of handoff.next_actions ?? []) {
    entries.push({ label: "next_action", value: action });
  }
  for (const risk of handoff.risks ?? []) {
    entries.push({ label: "risk", value: risk });
  }
  for (const question of handoff.open_questions ?? []) {
    entries.push({ label: "open_question", value: question });
  }
  for (const evidence of handoff.evidence_paths ?? []) {
    entries.push({ label: "evidence_path", value: evidence });
  }
  emitter.report(entries, {
    header: infoMessage(`task handoff show: ${parsed.taskId}`),
  });
  return 0;
};
