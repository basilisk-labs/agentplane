import { readFile } from "node:fs/promises";
import path from "node:path";
import { ensureDocSections } from "@agentplaneorg/core/tasks";

import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import type { PlanApprovalState } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { applyTaskMutation, withTaskMutationStorage } from "../shared/task-mutation.js";
import {
  setTaskFieldsIntent,
  setTaskSectionIntent,
  touchTaskDocMetaIntent,
} from "../shared/task-store.js";

import {
  assertPlanCanBeApproved,
  assertPlanSectionPresent,
  buildPlanDocUpdate,
  loadPlanBackend,
} from "./plan-shared.js";
import { decodeEscapedTaskTextNewlines, nowIso } from "./shared.js";

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
    const { ctx, backend } = await loadPlanBackend({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
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
    if (hasText) {
      text = decodeEscapedTaskTextNewlines(text);
    }
    if (hasFile) {
      try {
        text = await readFile(path.resolve(opts.cwd, opts.file ?? ""), "utf8");
      } catch (err) {
        throw mapCoreError(err, { command: "task plan set", filePath: opts.file ?? "" });
      }
    }

    const readmePath = path.join(
      resolved.gitRoot,
      config.paths.workflow_dir,
      opts.taskId,
      "README.md",
    );
    await applyTaskMutation({
      ctx,
      taskId: opts.taskId,
      build: async (current) => {
        const currentDocRaw =
          (typeof current.doc === "string" ? current.doc : "") ||
          (await backend.getTaskDoc(current.id));
        const { currentPlan, nextPlan, planChanged, docChanged } = buildPlanDocUpdate({
          currentDocRaw,
          text,
          requiredSections: config.tasks.doc.required_sections,
        });
        if (!planChanged && !docChanged && !updatedBy) return null;
        if (!docChanged) {
          return {
            intents: [
              ...(planChanged
                ? [
                    setTaskFieldsIntent({
                      plan_approval: {
                        state: "pending",
                        updated_at: null,
                        updated_by: null,
                        note: null,
                      },
                    }),
                  ]
                : []),
              ...(updatedBy ? [touchTaskDocMetaIntent({ updatedBy })] : []),
            ],
          };
        }
        return {
          intents: [
            setTaskSectionIntent({
              section: "Plan",
              text: nextPlan,
              requiredSections: config.tasks.doc.required_sections,
              expectedCurrentText: currentPlan,
            }),
            ...(planChanged
              ? [
                  setTaskFieldsIntent({
                    plan_approval: {
                      state: "pending",
                      updated_at: null,
                      updated_by: null,
                      note: null,
                    },
                  }),
                ]
              : []),
            ...(updatedBy ? [touchTaskDocMetaIntent({ updatedBy })] : []),
          ],
          writeOptions: {
            expectedCurrentText: currentPlan,
            expectedSection: "Plan",
          },
        };
      },
    });

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
    const { ctx, backend } = await loadPlanBackend({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
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

    const approvedAt = nowIso();
    await withTaskMutationStorage({
      ctx,
      local: async (store) => {
        await store.get(opts.taskId);
        await store.patch(opts.taskId, (current) => {
          const currentDoc = ensureDocSections(
            String(current.doc ?? ""),
            config.tasks.doc.required_sections,
          );
          assertPlanCanBeApproved({ task: current, config, doc: currentDoc });
          return {
            task: {
              plan_approval: {
                state: "approved" as PlanApprovalState,
                updated_at: approvedAt,
                updated_by: by,
                note: note || null,
              },
            },
          };
        });
      },
      remote: async () => {
        const task = await loadTaskFromContext({ ctx, taskId: opts.taskId });
        const existingDoc =
          (typeof task.doc === "string" ? task.doc : "") || (await backend.getTaskDoc(task.id));
        const baseDoc = ensureDocSections(existingDoc ?? "", config.tasks.doc.required_sections);
        assertPlanCanBeApproved({ task, config, doc: baseDoc });
        await backend.writeTask({
          ...task,
          plan_approval: {
            state: "approved" as PlanApprovalState,
            updated_at: approvedAt,
            updated_by: by,
            note: note || null,
          },
        });
      },
    });
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
    const { ctx, backend } = await loadPlanBackend({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
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

    const rejectedAt = nowIso();
    await withTaskMutationStorage({
      ctx,
      local: async (store) => {
        await store.get(opts.taskId);
        await store.patch(opts.taskId, (current) => {
          const currentDoc = ensureDocSections(
            String(current.doc ?? ""),
            config.tasks.doc.required_sections,
          );
          assertPlanSectionPresent(current.id, currentDoc, "reject");
          return {
            task: {
              plan_approval: {
                state: "rejected" as PlanApprovalState,
                updated_at: rejectedAt,
                updated_by: by,
                note: note || null,
              },
            },
          };
        });
      },
      remote: async () => {
        const task = await loadTaskFromContext({ ctx, taskId: opts.taskId });
        const existingDoc =
          (typeof task.doc === "string" ? task.doc : "") || (await backend.getTaskDoc(task.id));
        const baseDoc = ensureDocSections(existingDoc ?? "", config.tasks.doc.required_sections);
        assertPlanSectionPresent(task.id, baseDoc, "reject");
        await backend.writeTask({
          ...task,
          plan_approval: {
            state: "rejected" as PlanApprovalState,
            updated_at: rejectedAt,
            updated_by: by,
            note: note || null,
          },
        });
      },
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task plan reject", root: opts.rootOverride ?? null });
  }
}
