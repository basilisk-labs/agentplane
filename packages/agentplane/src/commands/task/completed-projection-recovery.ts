import path from "node:path";
import { readFile } from "node:fs/promises";
import { z } from "zod";
import { gitProofEnv, gitRevParse, gitShowFile } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { parseTaskReadme, taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  completeSupervisorExecutionEpisode,
  digestSupervisorEpisodeValue,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { LocalBackend } from "../../backends/task-backend.js";
import { prepareTaskReadmeWrite } from "../shared/task-store/readme.js";
import { LocalTaskByteStore } from "../../backends/task-backend/local-task-byte-store.js";
import { readKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import {
  completedScopeBytesDigest as bytesDigest,
  completedScopeProofDirectory,
  decodeCompletedScopeTask,
  readCompletedScopePrivateFile,
  writeCompletedScopeFile,
} from "../../adapters/task-backend/completed-scope-admission.js";
import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { CliError } from "../../shared/errors.js";
import { resolveCommonGitDirectory } from "../../shared/env.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { authenticateCompletedScopeSource } from "../shared/completed-repair-scope-source.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { projectObservedTaskExecutionContract } from "./task-execution-contract-observation.js";
import {
  externalAgentIssueDigest,
  externalAgentResultDigest,
  readExternalAgentExchange,
  readExternalAgentWorkOrder,
  validateExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";

const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const commit = z.string().regex(/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u);
const requestSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("completed_scope_projection_recovery"),
  task_id: z.string().regex(/^[a-zA-Z0-9_-]+$/u),
  repository_root: z.string().min(1),
  repository_identity: digest,
  config_digest: digest,
  head_sha: commit,
  baseline_sha: commit,
  current_readme_digest: digest,
  baseline_readme_digest: digest,
  kernel_digest: digest,
  journal_digest: digest,
  work_order_id: z.string().min(1),
  result_digest: digest,
  by: z.literal("USER"),
  note: z.string().min(1),
});

function refuse(reason: string): never {
  throw new CliError({
    code: "E_VALIDATION",
    message: `Completed projection recovery refused: ${reason}.`,
  });
}

type Intent = {
  request: z.infer<typeof requestSchema>;
  before_raw: string;
  after_raw: string;
  implementation_evidence_raw: string;
};

/** Recover only the exact interrupted legacy observation. This function cannot execute a Task. */
export async function recoverCompletedProjection(opts: {
  command: CommandContext;
  task_id: string;
  input_path: string;
}) {
  let value: unknown;
  try {
    // Classify with the existing workflow input contract. Apply the new
    // bounded no-follow proof only after this recovery kind is selected.
    value = JSON.parse(await readFile(opts.input_path, "utf8"));
  } catch {
    // An unreadable or unclassified input still belongs to the existing workflow dispatcher.
    return null;
  }
  if (
    !value ||
    typeof value !== "object" ||
    !("kind" in value) ||
    value.kind !== "completed_scope_projection_recovery"
  )
    return null;
  const raw = await readStableRegularTextNoFollow(opts.input_path, "projection recovery request", {
    max_bytes: 64 * 1024,
  });
  try {
    value = JSON.parse(raw);
  } catch {
    return refuse("invalid stable request JSON");
  }
  const request = requestSchema.parse(value);
  const root = opts.command.resolvedProject.gitRoot;
  if (
    request.task_id !== opts.task_id ||
    request.repository_root !== root ||
    opts.command.backendId !== "local" ||
    k.kernelDigest(opts.command.config) !== request.config_digest
  )
    refuse("operator request identity");
  const command = await loadCommandContext({ cwd: root });
  if (k.kernelDigest(command.config) !== request.config_digest) refuse("current configuration");
  const common = await resolveCommonGitDirectory(root);
  const workflow = command.config.paths.workflow_dir;
  if (
    command.backendId !== "local" ||
    !(command.taskBackend instanceof LocalBackend) ||
    path.resolve(command.taskBackend.root) !== path.resolve(root, workflow) ||
    command.taskBackend.historyRoot
  )
    refuse("native local Task store identity");
  if (
    path.isAbsolute(workflow) ||
    path.win32.isAbsolute(workflow) ||
    workflow.replaceAll("\\", "/").split("/").includes("..")
  )
    refuse("workflow containment");
  const reader = { git_root: root, common_git_dir: common, workflow_dir: workflow };
  const relative = `${workflow.replaceAll("\\", "/")}/${request.task_id}/README.md`;
  const readme = path.resolve(root, relative);
  const sourceStore = new LocalTaskByteStore({ root: path.resolve(root, workflow) });
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: root,
    common_git_dir: common,
    task_id: request.task_id,
  });
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journalPath });
  if (!lease) refuse("supervisor lease is busy");
  try {
    const mainRaw = await readCompletedScopePrivateFile(common, journalPath);
    if (bytesDigest(mainRaw) !== request.journal_digest) refuse("supervisor journal changed");
    const main = validateSupervisorExecutionEpisodeJournal(JSON.parse(mainRaw));
    const op = main.operations.at(-1);
    if (
      main.task_id !== request.task_id ||
      main.status !== "running" ||
      main.cursor.phase !== "intent_recorded" ||
      op?.status !== "intent" ||
      op.kind !== "agent_episode" ||
      op.role !== "EXECUTOR" ||
      !op.work_order_ref ||
      main.cursor.operation_key !== op.operation_key
    )
      refuse("unproven interrupted episode");
    const orderPath = op.work_order_ref;
    const exchangeDir = path.dirname(orderPath);
    const prefix = path.join(common, "agentplane/external-agent", request.task_id) + path.sep;
    if (!exchangeDir.startsWith(prefix)) refuse("exchange containment");
    const orderRaw = await readCompletedScopePrivateFile(common, orderPath);
    const exchangeRaw = await readCompletedScopePrivateFile(
      common,
      path.join(exchangeDir, "exchange.json"),
    );
    const exchange = await readExternalAgentExchange(path.join(exchangeDir, "exchange.json"));
    const order = await readExternalAgentWorkOrder(orderPath);
    if (
      exchange?.status !== "result_received" ||
      exchange.purpose !== "implementation_rework" ||
      exchange.role !== "EXECUTOR" ||
      exchange.checkout !== root ||
      exchange.task_id !== request.task_id ||
      exchange.work_order_id !== request.work_order_id ||
      order.work_order_id !== request.work_order_id ||
      exchange.work_order_ref !== orderPath ||
      order.task.work_item_id ||
      exchange.baseline.head !== request.baseline_sha ||
      exchange.baseline.changed_paths.length > 0 ||
      exchange.result?.result.status !== "completed" ||
      exchange.result_digest !== request.result_digest ||
      externalAgentResultDigest(exchange.result) !== request.result_digest ||
      op.effect_ref !==
        `external-agent-issue:${externalAgentIssueDigest({ exchange, work_order: order })}` ||
      op.precondition_fingerprint_digest !== exchange.state_fingerprint
    )
      refuse("native issue and received result binding");
    validateExternalAgentResultEnvelope({ raw: exchange.result, exchange, work_order: order });
    const resultPath = path.resolve(exchangeDir, exchange.result_ref);
    if (path.dirname(resultPath) !== exchangeDir) refuse("issued result containment");
    const head = await gitRevParse(root, ["HEAD"]);
    const git = async (args: string[]) => {
      const result = await execFileAsync("git", args, {
        cwd: root,
        env: gitProofEnv(),
        maxBuffer: 16 * 1024 * 1024,
      });
      return result.stdout.trimEnd();
    };
    const branch = await git(["branch", "--show-current"]);
    if (
      head !== request.head_sha ||
      (await git(["rev-list", "--parents", "-n", "1", "HEAD"])) !==
        `${head} ${request.baseline_sha}` ||
      !branch.startsWith(`${command.config.branch.task_prefix}/${request.task_id}/`)
    )
      refuse("dedicated source head and parent");
    const baselineRaw = await gitShowFile(root, request.baseline_sha, relative);
    if (
      baselineRaw !== (await gitShowFile(root, head, relative)) ||
      bytesDigest(baselineRaw) !== request.baseline_readme_digest ||
      exchange.baseline.task_artifacts?.["README.md"]?.split(":").at(-1) !==
        request.baseline_readme_digest.slice(7)
    )
      refuse("issued unchanged Task beforeimage");
    const baseline = decodeCompletedScopeTask(baselineRaw, readme, request.task_id);
    const identity = await resolveLogicalRepositoryIdentity({ git_root: root, task: baseline });
    if (
      identity !== request.repository_identity ||
      !baseline.execution_contract ||
      !Object.hasOwn(baseline.extensions ?? {}, "agentplane.completed_scope_admissions")
    )
      refuse("completed scope identity");
    await authenticateCompletedScopeSource(reader, baseline, {
      git_root: root,
      common_git_dir: common,
      repository_identity: identity,
      readme_path: readme,
      raw: baselineRaw,
    });
    const kernel = readKernelRecord(baseline, identity as k.Sha256Digest);
    if (
      kernel.kind !== "canonical" ||
      kernel.record.aggregate.state !== "COMPLETED" ||
      kernel.record.digest !== request.kernel_digest ||
      order.task.revision !== baseline.revision
    )
      refuse("unchanged terminal Kernel");
    const changed = await git(["diff", "--name-only", request.baseline_sha, head]);
    const changedPaths = changed.split("\n").filter(Boolean);
    const artifactPrefix = `${workflow.replaceAll("\\", "/")}/${request.task_id}/`;
    const roots = order.authority.writable_roots.map((entry) =>
      path.isAbsolute(entry) ? entry : path.resolve(root, entry),
    );
    if (
      !changedPaths.some((entry) => !entry.startsWith(artifactPrefix)) ||
      changedPaths.some(
        (entry) =>
          !entry.startsWith(artifactPrefix) &&
          !roots.some(
            (scope) =>
              path.resolve(root, entry) === scope ||
              path.resolve(root, entry).startsWith(scope + path.sep),
          ),
      )
    )
      refuse("implementation scope");
    const status = await git(["status", "--short", "--untracked-files=all"]);
    const allowed = new Set([
      relative,
      `${artifactPrefix}supervision/implementation-evidence.json`,
    ]);
    if (
      status
        .split("\n")
        .filter(Boolean)
        .some((line) => !line.startsWith(" M") || !allowed.has(line.slice(3)))
    )
      refuse("source or index is dirty");
    const readEvidence = () =>
      readContainedStableTextNoFollow({
        repository_root: root,
        file_path: path.join(root, artifactPrefix, "supervision/implementation-evidence.json"),
        label: "retained native implementation evidence",
        max_bytes: 16 * 1024 * 1024,
      });
    const evidenceRaw = await readEvidence();
    const projectionInput = {
      task: baseline,
      workflow_dir: workflow,
      changed_paths: changedPaths,
      preserved_commit: head,
    };
    const corrected = projectObservedTaskExecutionContract(projectionInput).nextTask;
    const initialVerification = resolveTaskExecutionContract({
      config: command.config,
      task: baseline,
      requestedMode: baseline.execution_contract.selected_mode,
      declaration: baseline.execution_contract.declaration,
    }).verification;
    const legacy = projectObservedTaskExecutionContract({
      ...projectionInput,
      task: {
        ...baseline,
        execution_contract: { ...baseline.execution_contract, verification: initialVerification },
      },
    }).nextTask;
    if (!corrected?.execution_contract || !legacy?.execution_contract)
      refuse("missing observation projection");
    const comparable = (task: typeof baseline) => {
      const copy = structuredClone(task);
      if (copy.execution_contract)
        delete (copy.execution_contract as { verification?: unknown }).verification;
      return copy;
    };
    if (k.kernelDigest(comparable(corrected)) !== k.kernelDigest(comparable(legacy)))
      refuse("correction changes non-verification state");
    const baselineEntry = {
      task: baseline,
      readmePath: readme,
      mtimeMs: 0,
      parsed: parseTaskReadme(baselineRaw),
      rawText: baselineRaw,
    };
    const legacyStored = prepareTaskReadmeWrite({ entry: baselineEntry, next: legacy }).task;
    const correctedStored = prepareTaskReadmeWrite({ entry: baselineEntry, next: corrected }).task;
    const key = k.kernelDigest(request);
    const directory = completedScopeProofDirectory(common, request.task_id, key);
    const intentFile = path.join(directory, "projection-recovery-intent.json");
    let intent: Intent | null = null;
    try {
      intent = JSON.parse(await readCompletedScopePrivateFile(common, intentFile)) as Intent;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
    const observed = await sourceStore.read(request.task_id);
    if (!observed) refuse("current source is missing");
    if (!intent) {
      if (observed.digest !== request.current_readme_digest) refuse("current source digest");
      const current = decodeCompletedScopeTask(observed.text, readme, request.task_id);
      const normalized = {
        ...current,
        doc_updated_at: legacyStored.doc_updated_at,
      };
      if (
        current.revision !== (baseline.revision ?? 0) + 1 ||
        !Number.isFinite(Date.parse(current.doc_updated_at ?? "")) ||
        k.kernelDigest(normalized) !== k.kernelDigest(legacyStored)
      )
        refuse("current source is not the exact interrupted legacy projection");
      intent = {
        request,
        before_raw: observed.text,
        implementation_evidence_raw: evidenceRaw,
        after_raw: prepareTaskReadmeWrite({
          entry: {
            task: current,
            readmePath: readme,
            mtimeMs: 0,
            parsed: parseTaskReadme(observed.text),
            rawText: observed.text,
          },
          next: { ...current, execution_contract: corrected.execution_contract },
        }).text,
      };
      await writeCompletedScopeFile(common, intentFile, intent);
    }
    if (
      k.kernelDigest(intent.request) !== key ||
      bytesDigest(intent.before_raw) !== request.current_readme_digest ||
      intent.implementation_evidence_raw !== evidenceRaw
    )
      refuse("retained repair intent identity");
    const before = decodeCompletedScopeTask(intent.before_raw, readme, request.task_id);
    const prepared = decodeCompletedScopeTask(intent.after_raw, readme, request.task_id);
    if (
      prepared.revision !== (before.revision ?? 0) + 1 ||
      k.kernelDigest({
        ...prepared,
        revision: correctedStored.revision,
        doc_updated_at: correctedStored.doc_updated_at,
      }) !== k.kernelDigest(correctedStored)
    )
      refuse("retained repair afterimage");
    const audit = createSupervisorEpisodeStore(
      path.join(directory, "projection-recovery-journal.json"),
    );
    let journal = await audit.read();
    if (!journal) {
      const started = startSupervisorExecutionEpisode({
        journal: createSupervisorExecutionEpisodeJournal({
          task_id: request.task_id,
          task_revision: before.revision ?? null,
          state_fingerprint_digest: request.current_readme_digest,
          budget: main.budget,
        }),
        role: "EXECUTOR",
        kind: "side_effect",
        operation_identity: {
          kind: request.kind,
          request_digest: key,
          intent_digest: k.kernelDigest(intent),
        },
        recovery_context: { schema_version: 1, kind: request.kind, request_digest: key },
        precondition_fingerprint_digest: request.current_readme_digest,
        authority_ref: "USER:completed-projection-recovery",
        authority_digest: key,
        effect_ref: `completed-projection-recovery:${key}`,
      });
      if (started.status !== "started" || !(await audit.compareAndSwap(null, started.journal)))
        refuse("repair intent CAS");
      journal = started.journal;
    }
    const recorded = validateSupervisorExecutionEpisodeJournal(journal);
    const action = recorded.operations.at(-1);
    if (
      recorded.operations.length !== 1 ||
      action?.effect_ref !== `completed-projection-recovery:${key}` ||
      k.kernelDigest(action.recovery?.operation_identity) !==
        k.kernelDigest({
          kind: request.kind,
          request_digest: key,
          intent_digest: k.kernelDigest(intent),
        })
    )
      refuse("repair journal identity");
    const assertPins = async () => {
      const fresh = await loadCommandContext({ cwd: root });
      if (
        fresh.backendId !== "local" ||
        !(fresh.taskBackend instanceof LocalBackend) ||
        path.resolve(fresh.taskBackend.root) !== path.resolve(root, workflow) ||
        fresh.taskBackend.historyRoot ||
        (await readEvidence()) !== evidenceRaw ||
        (await gitRevParse(root, ["HEAD"])) !== head ||
        (await readCompletedScopePrivateFile(common, journalPath)) !== mainRaw ||
        (await readCompletedScopePrivateFile(common, path.join(exchangeDir, "exchange.json"))) !==
          exchangeRaw ||
        k.kernelDigest(fresh.config) !== request.config_digest ||
        (await readCompletedScopePrivateFile(common, orderPath)) !== orderRaw ||
        (await git(["status", "--short", "--untracked-files=all"])) !== status
      )
        refuse("repair fence inputs changed");
    };
    await assertPins();
    if (observed.text === intent.before_raw) {
      if (
        action.status !== "intent" ||
        !(await sourceStore.compareAndSwap(observed, intent.after_raw))
      )
        refuse("source CAS");
    } else if (observed.text !== intent.after_raw) refuse("unknown interrupted repair afterimage");
    const after = await sourceStore.read(request.task_id);
    if (after?.text !== intent.after_raw) refuse("independent repair readback");
    const actual = decodeCompletedScopeTask(after.text, readme, request.task_id);
    await authenticateCompletedScopeSource(reader, actual, {
      git_root: root,
      common_git_dir: common,
      repository_identity: identity,
      readme_path: readme,
      raw: after.text,
    });
    await assertPins();
    const result = {
      kind: request.kind,
      request_digest: key,
      raw_digest: after.digest,
      kernel_digest: request.kernel_digest,
      revision: after.revision,
    };
    await writeCompletedScopeFile(
      common,
      path.join(directory, "projection-recovery-result.json"),
      result,
    );
    if (action.status === "intent") {
      const completed = completeSupervisorExecutionEpisode({
        journal: recorded,
        operation_key: action.operation_key,
        result,
      });
      if (!(await audit.compareAndSwap(recorded.digest, completed)))
        refuse("repair completion CAS");
    } else if (
      action.status !== "completed" ||
      action.result_digest !== digestSupervisorEpisodeValue(result) ||
      action.postcondition_fingerprint_digest !== null
    )
      refuse("repair completion identity");
    return {
      schema_version: 1,
      task_id: request.task_id,
      status: "projection_recovered",
      evidence: directory,
      kernel_unchanged: true,
      original_journal_unchanged: true,
      resume_argv: [
        "agentplane",
        "task",
        "advance",
        request.task_id,
        "--result",
        resultPath,
        "--agent-json",
        "--remote",
      ],
    };
  } finally {
    await lease.release();
  }
}
