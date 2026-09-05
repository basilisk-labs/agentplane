import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  EXECUTION_GRANT_EXTENSION_KEY,
  TASK_CENTRIC_EXTENSION_KEY,
  TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY,
  approveTaskPlan,
  createExecutionGrant,
  createPlanProposal,
  materializeApprovedWorkItems,
  projectTaskLifecycleToLegacyStatus,
  ensureDocSections,
  taskDocToSectionMap,
  type PlanApprovalEvidenceKind,
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";

import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import type { PlanApprovalState, TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import {
  applyTaskMutation,
  assertTaskMutationPolicy,
  withTaskMutationStorage,
} from "../shared/task-mutation.js";
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
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { TaskCentricBackendAdapter } from "../../adapters/task-backend/task-centric-backend-adapter.js";
import { assertCanonicalPlanCanBeApproved } from "./plan-approval-guard.js";
import { projectTaskCentricCompatibilityMutation } from "../../adapters/task-backend/task-centric-backend-projection.js";

function projectApprovedTask(current: TaskData, next: TaskData): TaskData {
  const aggregate = taskCentricAggregateFromExtensions(next.extensions);
  if (!aggregate?.current_plan) return next;
  const previous = taskCentricAggregateFromExtensions(current.extensions);
  const revision = current.revision ?? previous?.revision;
  if (revision === undefined || previous?.revision !== revision) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Plan approval requires synchronized task revisions.",
    });
  }
  return projectTaskCentricCompatibilityMutation({
    current,
    next: {
      ...next,
      status: projectTaskLifecycleToLegacyStatus(aggregate.lifecycle),
      extensions: withTaskCentricAggregate(next.extensions, {
        ...aggregate,
        revision,
      }),
    },
  });
}

export type TaskPlanSetResult = {
  taskId: string;
  readmePath: string;
};

type PlanningTaskFields = Pick<
  TaskData,
  | "task_kind"
  | "mutation_scope"
  | "risk_flags"
  | "blueprint_request"
  | "tags"
  | "execution_route"
  | "execution_contract"
  | "extensions"
>;

function planningTaskFieldsChanged(
  current: TaskData,
  fields: Partial<PlanningTaskFields> | undefined,
): boolean {
  if (!fields) return false;
  return Object.entries(fields).some(
    ([key, value]) =>
      JSON.stringify(current[key as keyof PlanningTaskFields]) !== JSON.stringify(value),
  );
}

export async function setTaskPlan(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  text?: string;
  file?: string;
  updatedBy?: string;
  taskFields?: Partial<PlanningTaskFields>;
}): Promise<TaskPlanSetResult> {
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
      policyAction: "task_plan_set",
      phase: "plan",
      build: async (current) => {
        const currentDocRaw =
          (typeof current.doc === "string" ? current.doc : "") ||
          (await backend.getTaskDoc(current.id));
        const { currentPlan, nextPlan, planChanged, docChanged } = buildPlanDocUpdate({
          currentDocRaw,
          text,
          requiredSections: config.tasks.doc.required_sections,
        });
        const taskFieldsChanged = planningTaskFieldsChanged(current, opts.taskFields);
        const executionScopeChanged =
          opts.taskFields?.execution_contract !== undefined &&
          JSON.stringify(current.execution_contract) !==
            JSON.stringify(opts.taskFields.execution_contract);
        const approvalInvalidated = planChanged || executionScopeChanged;
        if (!planChanged && !docChanged && !updatedBy && !taskFieldsChanged) return null;
        const suppliedExtensions = opts.taskFields?.extensions;
        const extensions = approvalInvalidated
          ? (() => {
              const next = { ...(current.extensions ?? {}), ...(suppliedExtensions ?? {}) };
              delete next[EXECUTION_GRANT_EXTENSION_KEY];
              if (suppliedExtensions?.[TASK_CENTRIC_EXTENSION_KEY]) {
                delete next[TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY];
              } else {
                next[TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY] = {
                  schema_version: 1,
                  reason_code: planChanged ? "plan_changed" : "execution_contract_changed",
                };
              }
              return next;
            })()
          : suppliedExtensions;
        const taskFields = {
          ...(opts.taskFields ?? {}),
          ...(extensions ? { extensions } : {}),
          ...(approvalInvalidated
            ? {
                plan_approval: {
                  state: "pending" as const,
                  updated_at: null,
                  updated_by: null,
                  note: null,
                },
                ...(extensions ? { extensions } : {}),
              }
            : {}),
        };
        if (!docChanged) {
          return {
            intents: [
              ...(approvalInvalidated || taskFieldsChanged
                ? [setTaskFieldsIntent(taskFields)]
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
            ...(approvalInvalidated || taskFieldsChanged ? [setTaskFieldsIntent(taskFields)] : []),
            ...(updatedBy ? [touchTaskDocMetaIntent({ updatedBy })] : []),
          ],
          writeOptions: {
            expectedCurrentText: currentPlan,
            expectedSection: "Plan",
          },
        };
      },
    });

    return { taskId: opts.taskId, readmePath };
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task plan set", root: opts.rootOverride ?? null });
  }
}

export async function cmdTaskPlanSet(opts: Parameters<typeof setTaskPlan>[0]): Promise<number> {
  const result = await setTaskPlan(opts);
  process.stdout.write(`${result.readmePath}\n`);
  return 0;
}

export async function cmdTaskPlanApprove(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  by: string;
  note?: string;
  expectedTaskRevision?: number;
  expectedPlanDigest?: string;
  approvalEvidence?: {
    kind: PlanApprovalEvidenceKind;
    digest?: string | null;
  };
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
    const repositoryIdentityFor = async (task: Pick<TaskData, "extensions">) =>
      await resolveLogicalRepositoryIdentity({
        git_root: ctx.resolvedProject.gitRoot,
        task,
      });
    await withTaskMutationStorage({
      ctx,
      local: async (store) => {
        const task = await store.get(opts.taskId);
        const repositoryIdentity = await repositoryIdentityFor(task);
        await store.patch(
          opts.taskId,
          (current) => {
            assertTaskMutationPolicy({
              ctx,
              taskId: opts.taskId,
              task: current,
              action: "task_plan_approve",
              phase: "plan",
            });
            const currentDoc = ensureDocSections(
              String(current.doc ?? ""),
              config.tasks.doc.required_sections,
            );
            assertPlanCanBeApproved({ task: current, config, doc: currentDoc });
            const plan = taskDocToSectionMap(currentDoc).Plan ?? "";
            const proposal = createPlanProposal({
              task_id: current.id,
              task_revision: current.revision ?? 1,
              plan,
              execution_contract: current.execution_contract,
              repository_identity: repositoryIdentity,
            });
            const grant = createExecutionGrant({
              proposal,
              execution_contract: current.execution_contract,
              actor: by,
              approval_kind: opts.approvalEvidence?.kind ?? "manual_operator",
              approval_evidence_digest: opts.approvalEvidence?.digest ?? null,
              issued_at: approvedAt,
            });
            const taskCentric = taskCentricAggregateFromExtensions(current.extensions);
            assertCanonicalPlanCanBeApproved(taskCentric, current.extensions);
            if (
              opts.expectedPlanDigest !== undefined &&
              taskCentric?.current_plan?.digest !== opts.expectedPlanDigest
            ) {
              throw new CliError({
                code: "E_VALIDATION",
                message: "Canonical task plan digest changed before approval.",
              });
            }
            const taskCentricExtensions = taskCentric?.current_plan
              ? withTaskCentricAggregate(
                  current.extensions,
                  materializeApprovedWorkItems({
                    task: taskCentric,
                    plan: approveTaskPlan({
                      plan: taskCentric.current_plan,
                      expected_digest: taskCentric.current_plan.digest,
                      actor: by,
                      approved_at: approvedAt,
                      policy_facts: [opts.approvalEvidence?.kind ?? "manual_operator"],
                    }),
                    now: approvedAt,
                  }),
                )
              : current.extensions;
            return {
              task: projectApprovedTask(current, {
                ...current,
                plan_approval: {
                  state: "approved" as PlanApprovalState,
                  updated_at: approvedAt,
                  updated_by: by,
                  note: note || null,
                },
                extensions: {
                  ...(taskCentricExtensions ?? {}),
                  [EXECUTION_GRANT_EXTENSION_KEY]: grant,
                },
              }),
            };
          },
          opts.expectedTaskRevision === undefined
            ? undefined
            : { expectedRevision: opts.expectedTaskRevision },
        );
      },
      remote: async () => {
        const task = await loadTaskFromContext({ ctx, taskId: opts.taskId });
        assertTaskMutationPolicy({
          ctx,
          taskId: opts.taskId,
          task,
          action: "task_plan_approve",
          phase: "plan",
        });
        const existingDoc =
          (typeof task.doc === "string" ? task.doc : "") || (await backend.getTaskDoc(task.id));
        const baseDoc = ensureDocSections(existingDoc ?? "", config.tasks.doc.required_sections);
        assertPlanCanBeApproved({ task, config, doc: baseDoc });
        const proposal = createPlanProposal({
          task_id: task.id,
          task_revision: task.revision ?? 1,
          plan: taskDocToSectionMap(baseDoc).Plan ?? "",
          execution_contract: task.execution_contract,
          repository_identity: await repositoryIdentityFor(task),
        });
        const grant = createExecutionGrant({
          proposal,
          execution_contract: task.execution_contract,
          actor: by,
          approval_kind: opts.approvalEvidence?.kind ?? "manual_operator",
          approval_evidence_digest: opts.approvalEvidence?.digest ?? null,
          issued_at: approvedAt,
        });
        const taskCentric = taskCentricAggregateFromExtensions(task.extensions);
        assertCanonicalPlanCanBeApproved(taskCentric, task.extensions);
        if (
          opts.expectedPlanDigest !== undefined &&
          taskCentric?.current_plan?.digest !== opts.expectedPlanDigest
        ) {
          throw new CliError({
            code: "E_VALIDATION",
            message: "Canonical task plan digest changed before approval.",
          });
        }
        const taskCentricExtensions = taskCentric?.current_plan
          ? withTaskCentricAggregate(
              task.extensions,
              materializeApprovedWorkItems({
                task: taskCentric,
                plan: approveTaskPlan({
                  plan: taskCentric.current_plan,
                  expected_digest: taskCentric.current_plan.digest,
                  actor: by,
                  approved_at: approvedAt,
                  policy_facts: [opts.approvalEvidence?.kind ?? "manual_operator"],
                }),
                now: approvedAt,
              }),
            )
          : task.extensions;
        await backend.writeTask(
          projectApprovedTask(task, {
            ...task,
            plan_approval: {
              state: "approved" as PlanApprovalState,
              updated_at: approvedAt,
              updated_by: by,
              note: note || null,
            },
            extensions: {
              ...(taskCentricExtensions ?? {}),
              [EXECUTION_GRANT_EXTENSION_KEY]: grant,
            },
          }),
          opts.expectedTaskRevision === undefined
            ? undefined
            : { expectedRevision: opts.expectedTaskRevision },
        );
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
    const task = await loadTaskFromContext({ ctx, taskId: opts.taskId });
    const taskCentric = taskCentricAggregateFromExtensions(task.extensions);
    if (taskCentric?.current_plan) {
      assertTaskMutationPolicy({
        ctx,
        taskId: opts.taskId,
        task,
        action: "task_plan_reject",
        phase: "plan",
      });
      const existingDoc =
        (typeof task.doc === "string" ? task.doc : "") || (await backend.getTaskDoc(task.id));
      const baseDoc = ensureDocSections(existingDoc ?? "", config.tasks.doc.required_sections);
      assertPlanSectionPresent(task.id, baseDoc, "reject");
      const idempotencyKey = `plan-reject-${taskCentricDigest({
        task_id: task.id,
        plan_revision: taskCentric.current_plan.revision,
        plan_digest: taskCentric.current_plan.digest,
        by,
        note,
      }).slice(7, 39)}`;
      await new TaskCentricBackendAdapter({
        backend,
        observeRepository: () => Promise.reject(new Error("Repository observation not required.")),
      }).rejectPlan({
        task_id: task.id,
        expected_revision: task.revision ?? taskCentric.revision,
        plan_revision: taskCentric.current_plan.revision,
        plan_digest: taskCentric.current_plan.digest,
        actor_id: by,
        note,
        rejected_at: rejectedAt,
        idempotency_key: idempotencyKey,
      });
      return 0;
    }
    await withTaskMutationStorage({
      ctx,
      local: async (store) => {
        await store.get(opts.taskId);
        await store.patch(opts.taskId, (current) => {
          assertTaskMutationPolicy({
            ctx,
            taskId: opts.taskId,
            task: current,
            action: "task_plan_reject",
            phase: "plan",
          });
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
              extensions: (() => {
                const next = { ...(current.extensions ?? {}) };
                delete next[EXECUTION_GRANT_EXTENSION_KEY];
                return next;
              })(),
            },
          };
        });
      },
      remote: async () => {
        const task = await loadTaskFromContext({ ctx, taskId: opts.taskId });
        assertTaskMutationPolicy({
          ctx,
          taskId: opts.taskId,
          task,
          action: "task_plan_reject",
          phase: "plan",
        });
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
          extensions: (() => {
            const next = { ...(task.extensions ?? {}) };
            delete next[EXECUTION_GRANT_EXTENSION_KEY];
            return next;
          })(),
        });
      },
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task plan reject", root: opts.rootOverride ?? null });
  }
}
