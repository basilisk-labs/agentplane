import { createHash } from "node:crypto";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
  mergeTaskDoc,
  parseTaskReadme,
  renderTaskReadme,
  taskCentricDigest,
} from "@agentplaneorg/core/tasks";
import {
  digestSupervisorEpisodeValue,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { CliError } from "../../shared/errors.js";
import { readKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../../shared/stable-file.js";
import {
  resolveCommandGitCommonDir,
  loadCommandContext,
  taskDataToFrontmatter,
} from "../shared/task-backend.js";
import {
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { captureExternalTaskArtifacts } from "./external-agent-task-artifact-baseline.js";
import { resolveImplementationVerificationTask } from "./external-agent-implementation-recovery.js";
import {
  blockingWorkItemCommands,
  runDirectTaskVerification,
  renderDirectTaskVerificationDetails,
} from "./direct-task-verification.js";
import {
  observeVerificationRetrySource,
  verificationRetryContractIdentity,
} from "./verification-retry-source-proof.js";
import { prepareVerificationRetryArtifact } from "./direct-task-verification-observation.js";
import { cmdVerifyParsed } from "./verify-record.js";
import type { reconcileIntegrationEffect } from "./external-agent-workflow-recovery.js";

const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const sha = z.string().regex(/^[a-f0-9]{40}(?:[a-f0-9]{24})?$/u);
const requestSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("verification_retry_request"),
  task_id: z.string().regex(/^[A-Za-z0-9_-]+$/u),
  repository_identity: digest,
  kernel_digest: digest,
  source_sha: sha,
  head_sha: sha,
  check_contract_digest: digest,
  failed_operation_key: digest,
  failed_checks_digest: digest,
});
function refuse(message: string): never {
  throw new CliError({ code: "E_VALIDATION", message: `Verification retry: ${message}` });
}
async function readJson(file: string) {
  return JSON.parse(
    await readStableRegularTextNoFollow(file, "verification retry evidence"),
  ) as unknown;
}
async function optionalJson(file: string): Promise<unknown> {
  try {
    return await readJson(file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

/** One controller-owned attempt; this path never reopens or rewrites the terminal Kernel. */
export async function reconcileVerificationRetry(
  opts: Parameters<typeof reconcileIntegrationEffect>[0],
) {
  const parsed = requestSchema.safeParse(await readJson(opts.input_path));
  if (!parsed.success) refuse("invalid typed request.");
  const request = parsed.data;
  const kernel = opts.canonical_record;
  if (
    kernel?.aggregate.state !== "COMPLETED" ||
    request.task_id !== opts.task_id ||
    kernel.aggregate.id !== opts.task_id ||
    request.kernel_digest !== kernel.digest ||
    request.repository_identity !== kernel.repository_identity ||
    kernel.aggregate.current_plan?.state !== "APPROVED"
  )
    refuse("the exact approved terminal Kernel is unavailable or changed.");
  const route = await opts.decide();
  const checkout = route.workspace.taskWorktreePath;
  if (route.task.id !== opts.task_id || route.workflowMode !== "branch_pr" || !checkout)
    refuse("the authoritative branch task checkout is unavailable.");
  const command = await loadCommandContext({ cwd: checkout, rootOverride: null });
  const task = await command.taskBackend.getTask(opts.task_id);
  const read = readKernelRecord(task, kernel.repository_identity);
  if (!task || read.kind !== "canonical" || read.record.digest !== kernel.digest)
    refuse("the controller and owner task records disagree.");
  const common = await resolveCommandGitCommonDir(command);
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: checkout,
    common_git_dir: common,
    task_id: opts.task_id,
  });
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journalPath });
  if (!lease) refuse("another supervisor owns the verification window.");
  try {
    const originalJournalText = await readStableRegularTextNoFollow(
      journalPath,
      "original supervisor journal",
    );
    const journal = validateSupervisorExecutionEpisodeJournal(JSON.parse(originalJournalText));
    const failure = journal.operations.findLast((entry) => entry.effect_ref === "task_verify");
    const workflow = command.config.paths.workflow_dir;
    const failedRelative = path.join(workflow, opts.task_id, "supervision", "declared-checks.json");
    const expectedFailure = {
      direct_task_operation: "task_verify",
      result: { verification: "needs_rework", declared_checks: failedRelative },
    };
    if (
      journal.task_id !== opts.task_id ||
      failure?.operation_key !== request.failed_operation_key ||
      failure.authority_ref !== "direct-task-supervisor:task_verify" ||
      failure.status !== "completed" ||
      failure.result_digest !== digestSupervisorEpisodeValue(expectedFailure)
    )
      refuse("the exact retained supervisor-owned failed validation is unproven.");
    const failedChecks = await readJson(path.join(checkout, failedRelative));
    const checksSchema = z.object({
      kind: z.literal("direct_task_declared_checks"),
      task_id: z.literal(opts.task_id),
      status: z.literal("failed"),
      checks: z.array(z.object({ exit_code: z.number().nullable() })).min(1),
    });
    if (
      !checksSchema.safeParse(failedChecks).success ||
      taskCentricDigest(failedChecks) !== request.failed_checks_digest
    )
      refuse("the retained failed check receipt is unavailable or changed.");
    const verification = await resolveImplementationVerificationTask({
      command,
      checkout,
      task,
      workflow: "branch_pr",
    });
    if (
      verification.snapshot.evaluated_sha !== request.source_sha ||
      verificationRetryContractIdentity(verification.task) !== request.check_contract_digest
    )
      refuse("source or approved check contract changed.");
    const definitions = kernel.aggregate.current_plan.work_items.filter((item) => !item.optional);
    const requiredCommands = definitions.flatMap(
      (item) =>
        (item.contract_digest
          ? kernel.documents?.contracts[item.contract_digest]?.verification_commands
          : undefined) ?? [],
    );
    const roots = definitions.flatMap((item) => item.execution_requirements.scope_roots);
    const permittedPath = (name: string) =>
      roots.some((root) => root === "." || name === root || name.startsWith(`${root}/`));
    if (
      requiredCommands.length === 0 ||
      (verification.task.verify ?? []).length === 0 ||
      verification.task.verify?.some((command) => !requiredCommands.includes(command)) ||
      verification.snapshot.changed_paths
        .filter((name) => !verification.snapshot.inherited_paths.includes(name))
        .some((name) => !permittedPath(name)) ||
      verification.task.execution_contract?.authority.writable_roots.some(
        (root) => !permittedPath(root),
      )
    )
      refuse("commands or scope exceed the immutable approved WorkItem contracts.");
    const key = taskCentricDigest({
      kernel: kernel.digest,
      failure: request.failed_operation_key,
    }).slice(7);
    const directory = path.join(
      common,
      "agentplane",
      "terminal-verification-retries",
      opts.task_id,
      key,
    );
    const intentPath = path.join(directory, "intent.json");
    const preparedPath = path.join(directory, "prepared.json");
    const resultPath = path.join(directory, "result.json");
    const requestDigest = taskCentricDigest(request);
    const sourceOptions = {
      checkout,
      task_id: opts.task_id,
      workflow_dir: workflow,
      source_sha: request.source_sha,
      expected_head: request.head_sha,
      failed_checks_digest: request.failed_checks_digest,
    };
    const prefix = path.join(workflow, opts.task_id);
    const newPaths = [
      path.join(prefix, "supervision", "verification-runs"),
      path.join(prefix, "supervision", "verification-retries", key),
      path.join(prefix, "verification"),
    ];
    const modifiedPaths = [path.join(prefix, "README.md")];
    const finishPrepared = async (raw: unknown) => {
      const envelope = z
        .object({
          payload: z
            .object({
              request_digest: z.literal(requestDigest),
              task: z.unknown(),
              artifacts: z.record(z.string(), z.string()),
              checks: z
                .object({ status: z.literal("passed"), artifact_path: z.string() })
                .passthrough(),
              original_review: digest,
              original_journal: digest,
            })
            .passthrough(),
          digest,
        })
        .safeParse(raw);
      if (!envelope.success || taskCentricDigest(envelope.data.payload) !== envelope.data.digest)
        refuse("prepared afterimage is invalid.");
      const prepared = envelope.data.payload;
      const observed = await command.taskBackend.getTask(opts.task_id);
      const observedKernel = readKernelRecord(observed, kernel.repository_identity);
      if (
        !observed ||
        taskCentricDigest(observed) !== taskCentricDigest(prepared.task) ||
        observedKernel.kind !== "canonical" ||
        observedKernel.record.digest !== kernel.digest ||
        taskCentricDigest(observed.quality_review ?? null) !== prepared.original_review ||
        taskCentricDigest(await readJson(journalPath)) !== prepared.original_journal
      )
        refuse("the prepared native afterimage is not durably observed; do not rerun checks.");
      await observeVerificationRetrySource({
        ...sourceOptions,
        allowed_new_paths: newPaths,
        allowed_modified_paths: modifiedPaths,
      });
      const artifacts = await captureExternalTaskArtifacts(checkout, opts.task_id);
      if (taskCentricDigest(artifacts) !== taskCentricDigest(prepared.artifacts))
        refuse("the prepared verification artifact afterimage changed.");
      if (!observed.verification?.updated_at || observed.verification.state !== "ok")
        refuse("the prepared native verification is not successful.");
      const finalTask = await command.taskBackend.getTask(opts.task_id);
      if (taskCentricDigest(finalTask) !== taskCentricDigest(prepared.task))
        refuse("native Task afterimage changed.");
      const outcome = {
        kind: "terminal_verification_retry_result",
        status: "passed",
        request_digest: requestDigest,
        adopted_source_for_verification: {
          source_sha: request.source_sha,
          head_sha: request.head_sha,
        },
        checks: prepared.checks,
        task_digest: taskCentricDigest(finalTask),
        artifacts,
        original_review: prepared.original_review,
        original_journal: prepared.original_journal,
        fresh_evaluator_required: true,
      };
      await writeNewStableRegularFileNoFollow(
        resultPath,
        `${JSON.stringify({ payload: outcome, digest: taskCentricDigest(outcome) }, null, 2)}\n`,
        "verification retry receipt",
      );
      return outcome;
    };
    const intent = await optionalJson(intentPath);
    if (intent !== null) {
      if (!z.object({ request_digest: z.literal(requestDigest) }).safeParse(intent).success)
        refuse("a different request already owns this one-shot retry.");
      const outcome = await optionalJson(resultPath);
      if (outcome === null) {
        const prepared = await optionalJson(preparedPath);
        if (prepared === null)
          refuse("the retained attempt has no final receipt; reconcile it without replay.");
        return {
          task_id: opts.task_id,
          replay: true,
          receipt: resultPath,
          result: await finishPrepared(prepared),
        };
      }
      const retained = z
        .object({
          payload: z
            .object({
              request_digest: z.literal(requestDigest),
              status: z.enum(["passed", "failed"]),
              artifacts: z.record(z.string(), z.string()),
              task_digest: digest,
              original_review: digest,
              original_journal: digest,
            })
            .passthrough(),
          digest,
        })
        .safeParse(outcome);
      if (!retained.success || taskCentricDigest(retained.data.payload) !== retained.data.digest)
        refuse("the retained retry receipt changed.");
      const payload = retained.data.payload;
      await observeVerificationRetrySource({
        ...sourceOptions,
        allowed_new_paths: newPaths,
        allowed_modified_paths: modifiedPaths,
      });
      const current = await command.taskBackend.getTask(opts.task_id);
      if (
        taskCentricDigest(current) !== payload.task_digest ||
        taskCentricDigest(current?.quality_review ?? null) !== payload.original_review ||
        taskCentricDigest(await readJson(journalPath)) !== payload.original_journal ||
        taskCentricDigest(await captureExternalTaskArtifacts(checkout, opts.task_id)) !==
          taskCentricDigest(payload.artifacts)
      )
        refuse("the completed retry afterimage changed.");
      return { task_id: opts.task_id, replay: true, receipt: resultPath, result: payload };
    }
    if (task.verification?.state !== "needs_rework")
      refuse("the currently retained validation is not failed.");
    const source = await observeVerificationRetrySource(sourceOptions);
    await prepareVerificationRetryArtifact(command, opts.task_id, key);
    const protectedArtifacts = await captureExternalTaskArtifacts(checkout, opts.task_id);
    const originalJournal = taskCentricDigest(journal);
    const originalReview = taskCentricDigest(task.quality_review ?? null);
    await mkdir(directory, { recursive: true, mode: 0o700 });
    await writeNewStableRegularFileNoFollow(
      intentPath,
      `${JSON.stringify({ kind: "terminal_verification_retry_intent", request_digest: requestDigest, request, source, protected_artifacts: protectedArtifacts, original_review: originalReview, original_journal: originalJournal, original_journal_receipt: originalJournalText, created_at: new Date().toISOString() }, null, 2)}\n`,
      "verification retry intent",
    );
    const assertUnchanged = async () => {
      await observeVerificationRetrySource({ ...sourceOptions, allowed_new_paths: newPaths });
      const current = await command.taskBackend.getTask(opts.task_id);
      const currentKernel = readKernelRecord(current, kernel.repository_identity);
      if (
        !current ||
        currentKernel.kind !== "canonical" ||
        currentKernel.record.digest !== kernel.digest ||
        taskCentricDigest(current.quality_review ?? null) !== originalReview ||
        taskCentricDigest(await readJson(journalPath)) !== originalJournal
      )
        refuse("protected Kernel, review or failed journal changed.");
      const currentVerification = await resolveImplementationVerificationTask({
        command,
        checkout,
        task: current,
        workflow: "branch_pr",
      });
      if (
        currentVerification.snapshot.evaluated_sha !== request.source_sha ||
        verificationRetryContractIdentity(currentVerification.task) !==
          request.check_contract_digest
      )
        refuse("source or check contract drifted during retry.");
      return current;
    };
    await assertUnchanged();
    const checks = await runDirectTaskVerification({
      command,
      cwd: checkout,
      task: verification.task,
      task_id: opts.task_id,
      retry_artifact_key: key,
      additional_commands: blockingWorkItemCommands({
        checks: requiredCommands.map((command, index) => ({
          id: `terminal-${String(index)}`,
          command,
          required: true,
        })),
        criteria: [],
      }),
    });
    await observeVerificationRetrySource({
      ...sourceOptions,
      allowed_new_paths: [
        path.join(workflow, opts.task_id, "supervision", "verification-runs"),
        path.join(workflow, opts.task_id, "supervision", "verification-retries", key),
      ],
    });
    await assertUnchanged();
    const afterChecks = await captureExternalTaskArtifacts(checkout, opts.task_id);
    for (const [name, value] of Object.entries(protectedArtifacts))
      if (afterChecks[name] !== value) refuse(`historical artifact changed: ${name}`);
    if (checks.status !== "passed") {
      const outcome = {
        kind: "terminal_verification_retry_result",
        status: "failed",
        request_digest: requestDigest,
        checks,
        artifacts: afterChecks,
        task_digest: taskCentricDigest(await command.taskBackend.getTask(opts.task_id)),
        original_review: originalReview,
        original_journal: originalJournal,
      };
      await writeNewStableRegularFileNoFollow(
        resultPath,
        `${JSON.stringify({ payload: outcome, digest: taskCentricDigest(outcome) }, null, 2)}\n`,
        "verification retry receipt",
      );
      return { task_id: opts.task_id, replay: false, receipt: resultPath, result: outcome };
    }
    const exitCode = await cmdVerifyParsed({
      ctx: command,
      cwd: checkout,
      taskId: opts.task_id,
      state: "ok",
      by: "SUPERVISOR",
      note: "Verified: admitted terminal retry executed all mandatory checks; fresh EVALUATOR review is required.",
      details: renderDirectTaskVerificationDetails({
        task: verification.task,
        taskId: opts.task_id,
        workflow: "branch_pr",
        result: checks,
      }),
      verificationSnapshot: verification.snapshot,
      beforePersist: async ({ current, next }) => {
        await assertUnchanged();
        if (taskCentricDigest(current) !== taskCentricDigest(task))
          refuse("Task changed before prepared persistence.");
        const nextKernel = readKernelRecord(next, kernel.repository_identity);
        if (
          nextKernel.kind !== "canonical" ||
          nextKernel.record.digest !== kernel.digest ||
          taskCentricDigest(next.quality_review ?? null) !== originalReview ||
          next.verification?.state !== "ok"
        )
          refuse("prepared verification changes protected native identity.");
        const artifacts = await captureExternalTaskArtifacts(checkout, opts.task_id);
        for (const [name, value] of Object.entries(protectedArtifacts))
          if (artifacts[name] !== value)
            refuse(`protected evidence changed before persistence: ${name}`);
        const readme = parseTaskReadme(
          await readStableRegularTextNoFollow(
            path.join(checkout, prefix, "README.md"),
            "retry Task projection",
          ),
        );
        const rendered = renderTaskReadme(
          { ...readme.frontmatter, ...taskDataToFrontmatter(next) },
          mergeTaskDoc(readme.body, next.doc ?? ""),
        );
        const bytes = rendered.endsWith("\n") ? rendered : `${rendered}\n`;
        const mode = artifacts["README.md"]?.split(":")[1];
        if (!mode) refuse("the prepared Task README is unavailable.");
        artifacts["README.md"] = `file:${mode}:${createHash("sha256").update(bytes).digest("hex")}`;
        const prepared = {
          request_digest: requestDigest,
          task: next,
          artifacts,
          checks,
          original_review: originalReview,
          original_journal: originalJournal,
        };
        await writeNewStableRegularFileNoFollow(
          preparedPath,
          `${JSON.stringify({ payload: prepared, digest: taskCentricDigest(prepared) }, null, 2)}\n`,
          "prepared verification retry afterimage",
        );
      },
      allowCanonicalProjection: true,
      projectionPolicy: "task-only",
      quiet: true,
    });
    if (exitCode !== 0) refuse("native verification persistence failed.");
    return {
      task_id: opts.task_id,
      replay: false,
      receipt: resultPath,
      result: await finishPrepared(await readJson(preparedPath)),
    };
  } finally {
    await lease.release();
  }
}
