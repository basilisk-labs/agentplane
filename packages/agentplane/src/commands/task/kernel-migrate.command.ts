import path from "node:path";
import { taskKernel } from "@agentplaneorg/core/tasks";
import { validateAgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { LocalTaskByteStore } from "../../backends/task-backend/local-task-byte-store.js";
import {
  KernelMigration,
  kernelMigrationProofSchema,
} from "../../adapters/task-backend/kernel-migration.js";
import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { CliError } from "../../shared/errors.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { backendUsesLocalTaskStore, type CommandContext } from "../shared/task-backend.js";
import {
  auditHistoricalBlueprintSnapshot,
  projectHistoricalBlueprintAudit,
} from "../blueprint/historical-audit.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { inspectKernelMigrationAdmission } from "./kernel-migration-admission.js";
import { kernelExchangeDirectory } from "./kernel-exchange.js";
import {
  applyLifecycleOwnerMigration,
  inspectLifecycleOwnerMigration,
  parseLifecycleOwnerMigrationReceipt,
  rollbackLifecycleOwnerMigration,
  type LifecycleOwnerMigrationFreshBinding,
} from "./migration-apply.js";

type Parsed = {
  taskId: string;
  apply: boolean;
  sourceDigest?: string;
  rollback?: string;
  assessment?: string;
  yes: boolean;
};

export function completedLifecycleMigrationApplyResult(opts: {
  expected_source_digest: taskKernel.Sha256Digest;
  output_bytes_digest: taskKernel.Sha256Digest;
  receipt: NonNullable<ReturnType<typeof parseLifecycleOwnerMigrationReceipt>>;
}) {
  return opts.receipt.source_digest === opts.expected_source_digest
    ? {
        kind: "already_applied" as const,
        receipt: opts.receipt,
        output_bytes_digest: opts.output_bytes_digest,
      }
    : { kind: "refused" as const, reason: "state_changed_after_migration" };
}

export const taskKernelMigrateSpec: CommandSpec<Parsed> = {
  id: ["task", "kernel-migrate"],
  group: "Task",
  summary:
    "Inspect or explicitly migrate one legacy Task with an exact backup and guarded rollback.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "apply",
      default: false,
      description: "Apply one canary after comparing the dry-run source digest.",
    },
    {
      kind: "string",
      name: "source-digest",
      valueHint: "<sha256:digest>",
      description: "Exact source digest from the dry run. Required with --apply.",
    },
    {
      kind: "string",
      name: "rollback",
      valueHint: "<proof.json>",
      description:
        "Restore exact source bytes using the emitted migration proof inside this repository.",
    },
    {
      kind: "string",
      name: "assessment",
      valueHint: "<migration-assessment.json>",
      description: "Use a semantic assessment admitted through its immutable canonical exchange.",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Confirm the explicitly requested migration or rollback.",
    },
  ],
  examples: [
    {
      cmd: "agentplane task kernel-migrate 202608300000-MGR001",
      why: "Classify the exact source without writing.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    apply: raw.opts.apply === true,
    sourceDigest:
      typeof raw.opts["source-digest"] === "string" ? raw.opts["source-digest"] : undefined,
    rollback: typeof raw.opts.rollback === "string" ? raw.opts.rollback : undefined,
    assessment: typeof raw.opts.assessment === "string" ? raw.opts.assessment : undefined,
    yes: raw.opts.yes === true,
  }),
};

export async function runKernelMigration(ctx: CommandContext, opts: Parsed): Promise<number> {
  const backendRoot = (ctx.taskBackend as { root?: unknown }).root;
  if (!backendUsesLocalTaskStore(ctx) || typeof backendRoot !== "string")
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Kernel migration requires a canonical local byte store. This backend has no proven byte CAS and backup capability.",
    });
  if (opts.apply && opts.rollback)
    throw new CliError({ code: "E_USAGE", message: "Select either --apply or --rollback." });
  if (opts.assessment && !opts.apply)
    throw new CliError({
      code: "E_USAGE",
      message: "--assessment is valid only with --apply.",
    });
  if (opts.apply && !/^sha256:[a-f0-9]{64}$/u.test(opts.sourceDigest ?? ""))
    throw new CliError({
      code: "E_USAGE",
      message: "--apply requires the exact --source-digest from the dry run.",
    });
  const root = ctx.resolvedProject.gitRoot;
  const identity = (await resolveLogicalRepositoryIdentity({
    git_root: root,
    task: {},
  })) as taskKernel.Sha256Digest;
  const store = new LocalTaskByteStore({ root: backendRoot });
  const migration = new KernelMigration(store, identity);
  const withHistoricalBlueprint = async <T extends object>(result: T) => {
    const audit = projectHistoricalBlueprintAudit(
      await auditHistoricalBlueprintSnapshot({
        repository_root: root,
        workflow_dir: ctx.config.paths.workflow_dir,
        task_id: opts.taskId,
      }),
    );
    return audit.kind === "missing" ? result : { ...result, historical_blueprint: audit };
  };
  if (opts.apply || opts.rollback)
    await ensureActionApproved({
      action: "force_action",
      config: ctx.config,
      yes: opts.yes,
      reason: "explicit canonical Task migration",
    });
  const journalPath = async () =>
    resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: opts.taskId,
    }).catch(async () =>
      resolveSupervisorExecutionEpisodePath({
        git_root: root,
        common_git_dir: path.join(root, ".git"),
        task_id: opts.taskId,
      }),
    );
  const mutateUnderAdmissionFence = async <T>(operation: () => Promise<T>): Promise<T> => {
    const resolvedJournalPath = await journalPath();
    const lease = await tryAcquireSupervisorExecutionLease({
      journal_path: resolvedJournalPath,
    });
    if (!lease) {
      throw new CliError({
        code: "E_PHASE_POLICY",
        message: "Kernel migration is blocked by an active supervisor execution lease.",
        context: { reason_code: "supervisor_execution_active", task_id: opts.taskId },
      });
    }
    try {
      const admission = inspectKernelMigrationAdmission(
        await createSupervisorEpisodeStore(resolvedJournalPath).read(),
      );
      if (!admission.admitted) {
        throw new CliError({
          code: "E_PHASE_POLICY",
          message: `Kernel migration is blocked: ${admission.detail}`,
          context: { reason_code: admission.reason, task_id: opts.taskId },
        });
      }
      return await operation();
    } finally {
      await lease.release();
    }
  };
  if (opts.rollback) {
    const raw: unknown = JSON.parse(
      await readContainedStableTextNoFollow({
        repository_root: root,
        file_path: path.resolve(root, opts.rollback),
        label: "migration rollback proof",
        max_bytes: 1024 * 1024,
      }),
    );
    const rawObject =
      typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : null;
    const lifecycleReceipt = parseLifecycleOwnerMigrationReceipt(rawObject?.receipt);
    const lifecycleOutputDigest = rawObject?.output_bytes_digest;
    if (
      lifecycleReceipt &&
      typeof lifecycleOutputDigest === "string" &&
      /^sha256:[a-f0-9]{64}$/u.test(lifecycleOutputDigest)
    ) {
      if (lifecycleReceipt.task_id !== opts.taskId)
        throw new CliError({
          code: "E_VALIDATION",
          message: "Rollback receipt belongs to a different Task.",
        });
      const result = await mutateUnderAdmissionFence(async () =>
        rollbackLifecycleOwnerMigration({
          store,
          repository_identity: identity,
          receipt: lifecycleReceipt,
          expected_output_digest: lifecycleOutputDigest as taskKernel.Sha256Digest,
        }),
      );
      process.stdout.write(`${JSON.stringify(await withHistoricalBlueprint(result), null, 2)}\n`);
      return result.kind === "refused" ? 1 : 0;
    }
    // Accept the entire legacy emitted result or its proof member.
    const proof = kernelMigrationProofSchema.parse(
      rawObject && "proof" in rawObject ? rawObject.proof : raw,
    );
    if (proof.receipt.task_id !== opts.taskId)
      throw new CliError({
        code: "E_VALIDATION",
        message: "Rollback proof belongs to a different Task.",
      });
    const result = await mutateUnderAdmissionFence(async () => migration.rollback(proof));
    process.stdout.write(`${JSON.stringify(await withHistoricalBlueprint(result), null, 2)}\n`);
    return result.kind === "refused" ? 1 : 0;
  }
  if (opts.apply) {
    const inspected = await inspectLifecycleOwnerMigration({
      store,
      repository_identity: identity,
      task_id: opts.taskId,
    });
    if (inspected.kind === "applied") {
      const result = completedLifecycleMigrationApplyResult({
        expected_source_digest: opts.sourceDigest as taskKernel.Sha256Digest,
        receipt: inspected.receipt,
        output_bytes_digest: inspected.current.digest,
      });
      process.stdout.write(`${JSON.stringify(await withHistoricalBlueprint(result), null, 2)}\n`);
      return result.kind === "refused" ? 1 : 0;
    }
    if (inspected.kind !== "ready") {
      const result = {
        kind: "refused" as const,
        reason: inspected.kind === "missing" ? "missing" : "source_invalid",
      };
      process.stdout.write(`${JSON.stringify(await withHistoricalBlueprint(result), null, 2)}\n`);
      return 1;
    }
    const policyDigest = taskKernel.kernelDigest(ctx.config);
    const authorityDigest = taskKernel.kernelDigest({
      kind: "explicit_operator_lifecycle_owner_migration",
      task_id: opts.taskId,
      repository_identity: identity,
      source_digest: inspected.preview.source_digest,
    });
    const observeBinding = async (): Promise<LifecycleOwnerMigrationFreshBinding> => {
      const current = await store.read(opts.taskId);
      if (!current) throw new Error("migration_source_missing");
      return {
        repository_identity: identity,
        state_fingerprint_digest: taskKernel.kernelDigest({
          task_id: opts.taskId,
          revision: current.revision,
          digest: current.digest,
          repository_identity: identity,
          policy_digest: policyDigest,
          authority_digest: authorityDigest,
        }),
        policy_digest: policyDigest,
        authority_digest: authorityDigest,
      };
    };
    const binding = await observeBinding();
    let semanticAssessment;
    if (opts.assessment) {
      const assessmentPath = path.resolve(root, opts.assessment);
      if (path.basename(assessmentPath) !== "migration-assessment.json")
        throw new CliError({
          code: "E_VALIDATION",
          message: "Migration assessment must be the canonical migration-assessment.json artifact.",
        });
      const directory = path.dirname(assessmentPath);
      const assessment: unknown = JSON.parse(
        await readStableRegularTextNoFollow(assessmentPath, "canonical migration assessment", {
          max_bytes: 4 * 1024 * 1024,
        }),
      );
      const workOrder = validateAgentWorkOrderV2(
        JSON.parse(
          await readStableRegularTextNoFollow(
            path.join(directory, "work-order.json"),
            "canonical migration assessment work order",
          ),
        ),
      );
      const expectedDirectory = await kernelExchangeDirectory(
        ctx,
        opts.taskId,
        workOrder.work_order_id,
      );
      if (directory !== expectedDirectory)
        throw new CliError({
          code: "E_VALIDATION",
          message: "Migration assessment is not inside its immutable canonical exchange.",
        });
      const owner = JSON.parse(
        await readStableRegularTextNoFollow(
          path.join(directory, "transport-owner.json"),
          "canonical migration assessment owner",
        ),
      ) as Record<string, unknown>;
      if (
        owner.work_order_id !== workOrder.work_order_id ||
        (owner.result_format !== undefined && owner.result_format !== "semantic_payload_v1")
      )
        throw new CliError({
          code: "E_VALIDATION",
          message: "Migration assessment exchange owner does not match its issued WorkOrder.",
        });
      const result: unknown = JSON.parse(
        await readStableRegularTextNoFollow(
          path.join(directory, "result.json"),
          "canonical migration assessment result",
          { max_bytes: 4 * 1024 * 1024 },
        ),
      );
      const compact =
        typeof result === "object" &&
        result !== null &&
        !Array.isArray(result) &&
        !("kind" in result);
      semanticAssessment = {
        binding: {
          ...binding,
          task_id: inspected.preview.task_id,
          source_digest: inspected.preview.source_digest,
          mapping_version: inspected.preview.mapping_version,
          mapping_digest: taskKernel.kernelDigest(inspected.preview.mapping),
        },
        assessment,
        exchange: {
          owner: {
            task_id: opts.taskId,
            work_order_id: workOrder.work_order_id,
            role: workOrder.role,
          },
          work_order: workOrder,
          result,
          ...(compact ? { format: "semantic_payload_v1" as const } : {}),
        },
      };
    }
    const result = await applyLifecycleOwnerMigration({
      store,
      repository_identity: identity,
      journal_path: await journalPath(),
      request: {
        task_id: opts.taskId,
        source_digest: opts.sourceDigest as taskKernel.Sha256Digest,
        mapping_version: inspected.preview.mapping_version,
        mapping_digest: taskKernel.kernelDigest(inspected.preview.mapping),
        binding,
        ...(semanticAssessment ? { semantic_assessment: semanticAssessment } : {}),
      },
      observe_binding: observeBinding,
    });
    process.stdout.write(`${JSON.stringify(await withHistoricalBlueprint(result), null, 2)}\n`);
    return result.kind === "refused" || result.kind === "quarantined" ? 1 : 0;
  }
  const report = await migration.dryRun(opts.taskId);
  process.stdout.write(`${JSON.stringify(await withHistoricalBlueprint(report), null, 2)}\n`);
  return ["quarantined", "missing"].includes(report.classification) ? 1 : 0;
}

export function makeRunTaskKernelMigrateHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_ctx: CommandCtx, parsed: Parsed): Promise<number> =>
    runKernelMigration(await getCtx("task kernel-migrate"), parsed);
}
