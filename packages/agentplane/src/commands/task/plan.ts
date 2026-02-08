import { readFile } from "node:fs/promises";
import path from "node:path";

import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core";

import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import { backendNotSupportedMessage } from "../../cli/output.js";
import type { PlanApprovalState, TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";

import {
  extractDocSection,
  isVerifyStepsFilled,
  nowIso,
  requiresVerify,
  toStringArray,
} from "./shared.js";

type PlanBackend = CommandContext["taskBackend"] & {
  getTaskDoc: NonNullable<CommandContext["taskBackend"]["getTaskDoc"]>;
  writeTask: NonNullable<CommandContext["taskBackend"]["writeTask"]>;
};

async function loadPlanTask(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<{
  ctx: CommandContext;
  backend: PlanBackend;
  task: TaskData;
  useStore: boolean;
  store: ReturnType<typeof getTaskStore> | null;
}> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const backend = ctx.taskBackend;
  const useStore = backendIsLocalFileBackend(ctx);
  const store = useStore ? getTaskStore(ctx) : null;
  const task = useStore
    ? await store!.get(opts.taskId)
    : await loadTaskFromContext({ ctx, taskId: opts.taskId });
  if (!backend.getTaskDoc || !backend.writeTask) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: backendNotSupportedMessage("task docs"),
    });
  }
  return { ctx, backend: backend as PlanBackend, task, useStore, store };
}

export async function cmdTaskPlanSet(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  text?: string;
  file?: string;
  updatedBy?: string;
}): Promise<number> {
  try {
    const { ctx, backend, task, useStore, store } = await loadPlanTask({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const config = ctx.config;
    const resolved = ctx.resolvedProject;

    const hasText = typeof opts.text === "string";
    const hasFile = typeof opts.file === "string";
    if (hasText === hasFile) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Provide exactly one of --text or --file.",
      });
    }

    let updatedBy: string | undefined;
    if (typeof opts.updatedBy === "string") {
      const trimmed = opts.updatedBy.trim();
      if (!trimmed) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Invalid value for --updated-by: empty.",
        });
      }
      updatedBy = trimmed;
    }

    let text = opts.text ?? "";
    if (hasFile) {
      try {
        text = await readFile(path.resolve(opts.cwd, opts.file ?? ""), "utf8");
      } catch (err) {
        throw mapCoreError(err, { command: "task plan set", filePath: opts.file ?? "" });
      }
    }

    const existingDoc = useStore
      ? String(task.doc ?? "")
      : (typeof task.doc === "string" ? task.doc : "") || (await backend.getTaskDoc(task.id));
    const baseDoc = ensureDocSections(existingDoc ?? "", config.tasks.doc.required_sections);
    const nextDoc = ensureDocSections(
      setMarkdownSection(baseDoc, "Plan", text),
      config.tasks.doc.required_sections,
    );

    const nextTask: TaskData = {
      ...task,
      doc: nextDoc,
      plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
      ...(updatedBy ? { doc_updated_by: updatedBy } : {}),
    };
    await (useStore ? store!.update(opts.taskId, () => nextTask) : backend.writeTask(nextTask));

    const readmePath = path.join(resolved.gitRoot, config.paths.workflow_dir, task.id, "README.md");
    process.stdout.write(`${readmePath}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task plan set", root: opts.rootOverride ?? null });
  }
}

export async function cmdTaskPlanApprove(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  by: string;
  note?: string;
}): Promise<number> {
  try {
    const { ctx, backend, task, useStore, store } = await loadPlanTask({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const config = ctx.config;

    const by = String(opts.by ?? "").trim();
    if (!by) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Invalid value for --by: empty.",
      });
    }
    const note = typeof opts.note === "string" ? opts.note.trim() : "";

    const existingDoc = useStore
      ? String(task.doc ?? "")
      : (typeof task.doc === "string" ? task.doc : "") || (await backend.getTaskDoc(task.id));
    const baseDoc = ensureDocSections(existingDoc ?? "", config.tasks.doc.required_sections);
    const plan = extractDocSection(baseDoc, "Plan");
    if (!plan || plan.trim().length === 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `${task.id}: cannot approve plan: ## Plan section is missing or empty`,
      });
    }

    const enforceVerifySteps = config.tasks.verify.enforce_on_plan_approve !== false;
    if (enforceVerifySteps) {
      const tags = toStringArray(task.tags);
      const requireStepsTags =
        config.tasks.verify.require_steps_for_tags ?? config.tasks.verify.required_tags;
      const spikeTag = (config.tasks.verify.spike_tag ?? "spike").trim().toLowerCase();
      const verifyRequired = requiresVerify(tags, requireStepsTags);
      const isSpike = tags.some((tag) => tag.trim().toLowerCase() === spikeTag);
      if (verifyRequired || isSpike) {
        const verifySteps = extractDocSection(baseDoc, "Verify Steps");
        if (!isVerifyStepsFilled(verifySteps)) {
          throw new CliError({
            exitCode: 3,
            code: "E_VALIDATION",
            message:
              `${task.id}: cannot approve plan: ## Verify Steps section is missing/empty/unfilled ` +
              "(fill it before approving plan)",
          });
        }
      }
      if (isSpike) {
        const notes = extractDocSection(baseDoc, "Notes");
        if (!notes || notes.trim().length === 0) {
          throw new CliError({
            exitCode: 3,
            code: "E_VALIDATION",
            message:
              `${task.id}: cannot approve plan for spike: ## Notes section is missing or empty ` +
              "(include Findings/Decision/Next Steps)",
          });
        }
      }
    }

    const nextTask: TaskData = {
      ...task,
      plan_approval: {
        state: "approved" as PlanApprovalState,
        updated_at: nowIso(),
        updated_by: by,
        note: note || null,
      },
    };
    await (useStore ? store!.update(opts.taskId, () => nextTask) : backend.writeTask(nextTask));
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task plan approve", root: opts.rootOverride ?? null });
  }
}

export async function cmdTaskPlanReject(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  by: string;
  note: string;
}): Promise<number> {
  try {
    const { ctx, backend, task, useStore, store } = await loadPlanTask({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const config = ctx.config;

    const by = String(opts.by ?? "").trim();
    if (!by) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Invalid value for --by: empty.",
      });
    }
    const note = String(opts.note ?? "").trim();
    if (!note) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Invalid value for --note: empty.",
      });
    }

    const existingDoc = useStore
      ? String(task.doc ?? "")
      : (typeof task.doc === "string" ? task.doc : "") || (await backend.getTaskDoc(task.id));
    const baseDoc = ensureDocSections(existingDoc ?? "", config.tasks.doc.required_sections);
    const plan = extractDocSection(baseDoc, "Plan");
    if (!plan || plan.trim().length === 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `${task.id}: cannot reject plan: ## Plan section is missing or empty`,
      });
    }

    const nextTask: TaskData = {
      ...task,
      plan_approval: {
        state: "rejected" as PlanApprovalState,
        updated_at: nowIso(),
        updated_by: by,
        note: note || null,
      },
    };
    await (useStore ? store!.update(opts.taskId, () => nextTask) : backend.writeTask(nextTask));
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task plan reject", root: opts.rootOverride ?? null });
  }
}
