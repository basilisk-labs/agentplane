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
  decodeEscapedTaskTextNewlines,
  ensureAgentFilledRequiredDocSections,
  extractDocSection,
  extractTaskObservationSection,
  isVerifyStepsFilled,
  nowIso,
  normalizeTaskDocVersion,
  taskObservationSectionName,
  requiresVerifyStepsByPrimary,
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

function normalizeForComparison(text: string): string {
  return text.replaceAll("\r\n", "\n").trim();
}

function buildPlanDocUpdate(opts: {
  currentDocRaw: string;
  text: string;
  requiredSections: string[];
}): {
  currentPlan: string;
  nextPlan: string;
  planChanged: boolean;
  docChanged: boolean;
  nextDoc: string;
} {
  const baseDoc = ensureDocSections(opts.currentDocRaw ?? "", opts.requiredSections);
  const currentPlan = extractDocSection(baseDoc, "Plan") ?? "";
  const planChanged = normalizeForComparison(currentPlan) !== normalizeForComparison(opts.text);
  const nextDoc = ensureDocSections(
    setMarkdownSection(baseDoc, "Plan", opts.text),
    opts.requiredSections,
  );
  return {
    currentPlan,
    nextPlan: extractDocSection(nextDoc, "Plan") ?? "",
    planChanged,
    docChanged: nextDoc !== baseDoc,
    nextDoc,
  };
}

function assertPlanSectionPresent(taskId: string, doc: string, action: "approve" | "reject"): void {
  const plan = extractDocSection(doc, "Plan");
  if (!plan || plan.trim().length === 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `${taskId}: cannot ${action} plan: ## Plan section is missing or empty`,
    });
  }
}

function assertPlanCanBeApproved(opts: {
  task: TaskData;
  config: CommandContext["config"];
  doc: string;
}): void {
  assertPlanSectionPresent(opts.task.id, opts.doc, "approve");
  ensureAgentFilledRequiredDocSections({
    task: opts.task,
    config: opts.config,
    doc: opts.doc,
    action: "approve plan",
  });

  const enforceVerifySteps = opts.config.tasks.verify.enforce_on_plan_approve !== false;
  if (!enforceVerifySteps) return;

  const tags = toStringArray(opts.task.tags);
  const spikeTag = (opts.config.tasks.verify.spike_tag ?? "spike").trim().toLowerCase();
  const verifyRequired = requiresVerifyStepsByPrimary(tags, opts.config);
  const isSpike = tags.some((tag) => tag.trim().toLowerCase() === spikeTag);
  if (verifyRequired || isSpike) {
    const verifySteps = extractDocSection(opts.doc, "Verify Steps");
    if (!isVerifyStepsFilled(verifySteps)) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message:
          `${opts.task.id}: cannot approve plan: ## Verify Steps section is missing/empty/unfilled ` +
          "(fill it before approving plan)",
      });
    }
  }
  if (!isSpike) return;

  const observationSection = taskObservationSectionName(
    normalizeTaskDocVersion(opts.task.doc_version),
  );
  const observation = extractTaskObservationSection(
    opts.doc,
    normalizeTaskDocVersion(opts.task.doc_version),
  );
  if (!observation || observation.trim().length === 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `${opts.task.id}: cannot approve plan for spike: ## ${observationSection} section is missing or empty ` +
        "(include Findings/Decision/Next Steps)",
    });
  }
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

    const readmePath = path.join(resolved.gitRoot, config.paths.workflow_dir, task.id, "README.md");
    if (useStore) {
      let expectedCurrentPlan: string | undefined;
      await store!.patch(opts.taskId, (current) => {
        const { currentPlan, nextPlan, planChanged, docChanged } = buildPlanDocUpdate({
          currentDocRaw: String(current.doc ?? ""),
          text,
          requiredSections: config.tasks.doc.required_sections,
        });
        if (!planChanged && !docChanged && !updatedBy) return null;
        if (!docChanged) {
          return {
            ...(planChanged
              ? {
                  task: {
                    plan_approval: {
                      state: "pending",
                      updated_at: null,
                      updated_by: null,
                      note: null,
                    },
                  },
                }
              : {}),
            ...(updatedBy ? { docMeta: { touch: true, updatedBy } } : {}),
          };
        }
        expectedCurrentPlan ??= currentPlan;
        return {
          doc: {
            kind: "set-section",
            section: "Plan",
            text: nextPlan,
            requiredSections: config.tasks.doc.required_sections,
            expectedCurrentText: expectedCurrentPlan,
          },
          ...(planChanged
            ? {
                task: {
                  plan_approval: {
                    state: "pending",
                    updated_at: null,
                    updated_by: null,
                    note: null,
                  },
                },
              }
            : {}),
          ...(updatedBy ? { docMeta: { updatedBy } } : {}),
        };
      });
    } else {
      const existingDoc =
        (typeof task.doc === "string" ? task.doc : "") || (await backend.getTaskDoc(task.id));
      const { planChanged, docChanged, nextDoc } = buildPlanDocUpdate({
        currentDocRaw: existingDoc,
        text,
        requiredSections: config.tasks.doc.required_sections,
      });
      if (!planChanged && !docChanged && !updatedBy) {
        process.stdout.write(`${readmePath}\n`);
        return 0;
      }
      const nextTask: TaskData = {
        ...task,
        doc: nextDoc,
        ...(planChanged
          ? { plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null } }
          : {}),
        ...(updatedBy ? { doc_updated_by: updatedBy } : {}),
      };
      await backend.writeTask(nextTask);
    }

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
    assertPlanCanBeApproved({ task, config, doc: baseDoc });

    const approvedAt = nowIso();
    await (useStore
      ? store!.patch(opts.taskId, (current) => {
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
        })
      : backend.writeTask({
          ...task,
          plan_approval: {
            state: "approved" as PlanApprovalState,
            updated_at: approvedAt,
            updated_by: by,
            note: note || null,
          },
        }));
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
    assertPlanSectionPresent(task.id, baseDoc, "reject");

    const rejectedAt = nowIso();
    await (useStore
      ? store!.patch(opts.taskId, (current) => {
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
        })
      : backend.writeTask({
          ...task,
          plan_approval: {
            state: "rejected" as PlanApprovalState,
            updated_at: rejectedAt,
            updated_by: by,
            note: note || null,
          },
        }));
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task plan reject", root: opts.rootOverride ?? null });
  }
}
