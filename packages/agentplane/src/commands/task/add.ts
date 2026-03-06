import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { dedupeStrings, normalizeTaskStatus, nowIso } from "./shared.js";
import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core";

function defaultTaskDoc(opts: {
  requiredSections: string[];
  title: string;
  description: string;
}): string {
  const baseDoc = ensureDocSections("", opts.requiredSections);
  const summary = `${opts.title}\n\n${opts.description}`;
  const scope = [
    `- In scope: ${opts.description}.`,
    `- Out of scope: unrelated refactors not required for "${opts.title}".`,
  ].join("\n");
  const plan = [
    `1. Implement the change for "${opts.title}".`,
    "2. Run required checks and capture verification evidence.",
    "3. Finalize task notes and finish with traceable commit metadata.",
  ].join("\n");
  const risks = [
    "- Risk: hidden regressions in touched paths.",
    "- Mitigation: run required checks before finish and record evidence.",
  ].join("\n");
  const rollback = [
    "- Revert task-related commit(s).",
    "- Re-run required checks to confirm rollback safety.",
  ].join("\n");

  const withSummary = setMarkdownSection(baseDoc, "Summary", summary);
  const withScope = setMarkdownSection(withSummary, "Scope", scope);
  const withPlan = setMarkdownSection(withScope, "Plan", plan);
  const withRisks = setMarkdownSection(withPlan, "Risks", risks);
  return setMarkdownSection(withRisks, "Rollback Plan", rollback);
}

export async function cmdTaskAdd(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskIds: string[];
  title: string;
  description: string;
  status: string;
  priority: string;
  owner: string;
  tags: string[];
  dependsOn: string[];
  verify: string[];
  commentAuthor: string | null;
  commentBody: string | null;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const status = normalizeTaskStatus(opts.status);
    const existing = await ctx.taskBackend.listTasks();
    const existingIds = new Set(existing.map((task) => task.id));
    for (const taskId of opts.taskIds) {
      if (existingIds.has(taskId)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Task already exists: ${taskId}`,
        });
      }
    }

    const tags = dedupeStrings(opts.tags);
    const dependsOn = dedupeStrings(opts.dependsOn);
    const verify = dedupeStrings(opts.verify);
    const docUpdatedBy = (opts.commentAuthor ?? "").trim() || opts.owner;

    const tasks: TaskData[] = opts.taskIds.map((taskId) => ({
      id: taskId,
      title: opts.title,
      description: opts.description,
      status,
      priority: opts.priority,
      owner: opts.owner,
      tags,
      depends_on: dependsOn,
      verify,
      comments:
        opts.commentAuthor && opts.commentBody
          ? [{ author: opts.commentAuthor, body: opts.commentBody }]
          : [],
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: docUpdatedBy,
      id_source: "explicit",
      doc: defaultTaskDoc({
        requiredSections: ctx.config.tasks.doc.required_sections,
        title: opts.title,
        description: opts.description,
      }),
    }));
    if (ctx.taskBackend.writeTasks) {
      await ctx.taskBackend.writeTasks(tasks);
    } else {
      for (const task of tasks) {
        await ctx.taskBackend.writeTask(task);
      }
    }
    for (const task of tasks) {
      process.stdout.write(`${task.id}\n`);
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task add", root: opts.rootOverride ?? null });
  }
}
