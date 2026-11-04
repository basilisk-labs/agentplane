import path from "node:path";
import { createHash } from "node:crypto";
import { readdir } from "node:fs/promises";
import { z } from "zod";
import {
  gitProofEnv,
  gitProofIsAncestor,
  gitMergeBase,
  gitShowFile,
} from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import {
  digestSupervisorEpisodeValue,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import {
  readContainedStableTextNoFollow,
  captureContainedPathChainIdentity,
  assertContainedPathChainIdentityUnchanged,
} from "../../shared/contained-stable-file.js";
import { publishNewStableRegularFileNoFollow } from "../../shared/stable-file.js";
import type { CommandContext } from "../shared/task-backend.js";
import { resolveCommonGitDirectory } from "../../shared/env.js";
import { resolveSupervisorExecutionEpisodePath } from "../shared/supervisor-execution-journal.js";
import type { VerificationEvidenceReference } from "../shared/task-verification-input-types.js";
import { operationPayloadDigest } from "../shared/workflow-step-authority.js";
import type { ProviderUpdateBranchOperationParams } from "../shared/provider-update-branch-route.js";

const hash = (value: string) => `sha256:${createHash("sha256").update(value).digest("hex")}`;
const oid = z.string().regex(/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u);
const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const text = z.string().min(1);
const paramsSchema = z.strictObject({
  taskId: text,
  identity: z.strictObject({
    provider: z.enum(["github", "gitlab"]),
    hostname: text,
    remote: text,
    sourceProject: text,
    targetProject: text,
    sourceUrl: text,
    targetUrl: text,
  }),
  prNumber: z.number().int().positive(),
  branch: text,
  baseBranch: text,
  expectedHeadSha: oid,
  expectedBaseSha: oid,
  reconcileHeadSha: oid.optional(),
});
export { paramsSchema as providerUpdateBranchParamsSchema };
const proofSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("provider_update_verification_proof"),
  params: paramsSchema,
  operation_key: digest,
  authority_digest: digest,
  observed_head_sha: oid,
  completion: z.record(z.string(), z.unknown()),
  digest,
});
type Proof = z.infer<typeof proofSchema>;
type Journal = ReturnType<typeof validateSupervisorExecutionEpisodeJournal>;

async function control(gitRoot: string, taskId: string) {
  const root = await resolveCommonGitDirectory(gitRoot);
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: gitRoot,
    common_git_dir: root,
    task_id: taskId,
  });
  const read = (file: string) =>
    readContainedStableTextNoFollow({
      repository_root: root,
      file_path: file,
      label: "provider update verification evidence",
      max_bytes: 16 * 1024 * 1024,
    });
  return { root, journalPath, read };
}

function boundOperation(journal: Journal, proof: Omit<Proof, "digest">) {
  if (journal.task_id !== proof.params.taskId)
    throw new Error("Provider update proof task changed");
  const entry = journal.operations.find((item) => item.operation_key === proof.operation_key);
  const payloadDigest = operationPayloadDigest({
    id: "provider.pr.update_branch",
    type: "provider_update_branch",
    params: proof.params,
  });
  if (
    entry?.kind !== "cli_operation" ||
    entry.authority_ref !== "workflow-operation:provider.pr.update_branch" ||
    entry.authority_digest !== proof.authority_digest ||
    entry.precondition_fingerprint_digest !== proof.authority_digest ||
    entry.effect_ref !==
      `provider.pr.update_branch:${proof.params.taskId}:${proof.authority_digest}:${payloadDigest}`
  )
    throw new Error("Provider update proof does not match native operation authority");
  const completion = proof.completion;
  const boundHead =
    completion.kind === "provider_update_branch_effect_resolution"
      ? completion.verdict === "applied" &&
        completion.observed_head_sha === proof.observed_head_sha &&
        completion.original_base_sha === proof.params.expectedBaseSha &&
        oid.safeParse(completion.observed_base_sha).success
      : completion.status === "succeeded" &&
        completion.exit_code === 0 &&
        Array.isArray(completion.observed_postconditions) &&
        completion.observed_postconditions.includes(
          `provider_update_head:${proof.observed_head_sha}`,
        );
  if (
    !boundHead ||
    (entry.status === "completed" &&
      entry.result_digest !== digestSupervisorEpisodeValue(completion))
  )
    throw new Error("Provider update proof completion changed");
  return entry;
}

async function git(root: string, args: string[]): Promise<string> {
  const result = await execFileAsync("git", args, {
    cwd: root,
    env: gitProofEnv(),
    maxBuffer: 16 * 1024 * 1024,
  });
  return result.stdout;
}

async function proveMerge(root: string, proof: Omit<Proof, "digest">) {
  const p = proof.params;
  // The provider's update-branch contract creates the exact H/R merge. Reject arbitrary descendants.
  const commit = await git(root, ["rev-list", "--parents", "-n", "1", proof.observed_head_sha]);
  const parents = commit.trim().split(/\s+/u);
  if (
    parents.length !== 3 ||
    parents[0] !== proof.observed_head_sha ||
    parents[1] !== p.expectedHeadSha ||
    parents[2] !== p.expectedBaseSha ||
    !(await gitProofIsAncestor(root, p.expectedHeadSha, proof.observed_head_sha)) ||
    !(await gitProofIsAncestor(root, p.expectedBaseSha, proof.observed_head_sha))
  )
    throw new Error("Provider update proof lacks exact merge ancestry");
  // Recovery can observe a later main; this proves the original merge, not that later base's integration.
  if (
    proof.completion.kind === "provider_update_branch_effect_resolution" &&
    !(await gitProofIsAncestor(
      root,
      p.expectedBaseSha,
      proof.completion.observed_base_sha as string,
    ))
  )
    throw new Error("Recovery observed base is outside the original update ancestry");
}

/** Called only after native provider readback and safe local alignment. Completion is checked on read. */
export async function retainProviderUpdateVerificationProof(opts: {
  command: CommandContext;
  params: ProviderUpdateBranchOperationParams;
  authority_digest: string;
  observed_head_sha: string;
  completion: Record<string, unknown>;
}): Promise<Record<string, unknown>> {
  const p = paramsSchema.parse(opts.params);
  const c = await control(opts.command.resolvedProject.gitRoot, p.taskId);
  const journal = validateSupervisorExecutionEpisodeJournal(
    JSON.parse(await c.read(c.journalPath)),
  );
  const effectRef = `provider.pr.update_branch:${p.taskId}:${opts.authority_digest}:${operationPayloadDigest({ id: "provider.pr.update_branch", type: "provider_update_branch", params: p })}`;
  const entries = journal.operations.filter((item) => item.effect_ref === effectRef);
  if (entries.length !== 1) throw new Error("Provider update proof requires one native operation");
  const entry = entries[0]!;
  const payload = {
    schema_version: 1 as const,
    kind: "provider_update_verification_proof" as const,
    params: p,
    operation_key: entry.operation_key,
    authority_digest: opts.authority_digest,
    observed_head_sha: opts.observed_head_sha,
    completion: opts.completion,
  };
  const proof = proofSchema.parse({ ...payload, digest: digestSupervisorEpisodeValue(payload) });
  boundOperation(journal, proof);
  if (entry.status !== "intent" && entry.status !== "completed")
    throw new Error("Provider update operation failed");
  await proveMerge(opts.command.resolvedProject.gitRoot, proof);
  const target = path.join(
    path.dirname(c.journalPath),
    `provider-update-${entry.operation_key.slice(7)}.json`,
  );
  const chain = await captureContainedPathChainIdentity({
    repository_root: c.root,
    file_path: path.dirname(c.journalPath),
    label: "native update proof directory",
    path_policy: { target_kind: "file_or_directory", exact_case: true },
  });
  const bytes = `${JSON.stringify(proof)}\n`;
  if (
    !(await publishNewStableRegularFileNoFollow(target, bytes, "native update verification proof"))
  ) {
    const priorBytes = await c.read(target);
    if (priorBytes !== bytes) {
      const prior = proofSchema.safeParse(JSON.parse(priorBytes));
      if (!prior.success || opts.completion.kind !== "provider_update_branch_effect_resolution")
        throw new Error("Retained provider update proof slot changed");
      const {
        completion: retainedCompletion,
        digest: retainedDigest,
        ...retainedBinding
      } = prior.data;
      const { completion: _completion, digest: _digest, ...binding } = proof;
      if (
        retainedDigest !==
          digestSupervisorEpisodeValue({ ...retainedBinding, completion: retainedCompletion }) ||
        digestSupervisorEpisodeValue(retainedBinding) !== digestSupervisorEpisodeValue(binding)
      )
        throw new Error("Retained provider update proof slot changed");
      boundOperation(journal, prior.data);
      // An interrupted normal execution already published its exact result commitment.
      // Complete that same commitment after authenticated recovery, retaining the proof unchanged.
      await assertContainedPathChainIdentityUnchanged(chain, "native update proof directory");
      return retainedCompletion;
    }
  }
  // Directory timestamps change when publishing our file; validate directory identities, not contents.
  await assertContainedPathChainIdentityUnchanged(chain, "native update proof directory");
  return proof.completion;
}

export async function taskOriginHistoryPaths(
  gitRoot: string,
  from: string,
  head: string,
  canonicalBase = from,
) {
  const read = (args: string[]) => git(gitRoot, args);
  const range = `${from}..${head}`;
  const history = await read([
    "log",
    "--format=",
    "--name-only",
    "-z",
    "--full-history",
    "--no-merges",
    "--no-renames",
    range,
  ]);
  const paths = new Set(history.split("\0").filter(Boolean));
  const merges = await read(["rev-list", "--min-parents=2", range]);
  for (const merge of merges.trim().split("\n").filter(Boolean)) {
    const intersection = await gitMergeBase(gitRoot, canonicalBase, merge);
    // Compare each resolution to its immutable canonical intersection. A clean
    // base import can arrive through an intermediate Task parent. Every Task-side
    // commit and earlier merge remains in this union, so a later restoration of
    // canonical bytes cannot erase an earlier foreign edit or deletion.
    const changed = await read(["diff", "--name-only", "-z", "--no-renames", intersection, merge]);
    for (const file of changed.split("\0").filter(Boolean)) paths.add(file);
  }
  return [...paths];
}

/** Authenticate retained proofs once for ownership and validation-floor consumers. */
async function completedProofs(root: string, taskId: string, frozenBase?: string) {
  const c = await control(root, taskId);
  let journal: Journal;
  try {
    journal = validateSupervisorExecutionEpisodeJournal(JSON.parse(await c.read(c.journalPath)));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    const files = await readdir(path.dirname(c.journalPath)).catch(
      (readError: NodeJS.ErrnoException) => {
        if (readError.code === "ENOENT") return [];
        throw readError;
      },
    );
    if (files.some((name) => /^provider-update-[a-f0-9]{64}\.json$/u.test(name)))
      throw new Error("Retained provider update proof has no native journal");
    return [];
  }
  const files = await readdir(path.dirname(c.journalPath));
  const names = files.filter((name) => /^provider-update-[a-f0-9]{64}\.json$/u.test(name));
  const proofs: { proof: Proof; sequence: number; nativeGitLab?: boolean }[] = [];
  for (const name of names) {
    const parsed = proofSchema.parse(
      JSON.parse(await c.read(path.join(path.dirname(c.journalPath), name))),
    );
    const { digest: observedDigest, ...payload } = parsed;
    if (
      observedDigest !== digestSupervisorEpisodeValue(payload) ||
      name !== `provider-update-${parsed.operation_key.slice(7)}.json`
    )
      throw new Error("Provider update proof digest changed");
    const entry = boundOperation(journal, parsed);
    if (entry.status !== "completed" || !entry.result_digest) continue;
    const p = parsed.params;
    const fetchUrl = await git(root, ["remote", "get-url", "--all", "--", p.identity.remote]);
    const pushUrl = await git(root, [
      "remote",
      "get-url",
      "--push",
      "--all",
      "--",
      p.identity.remote,
    ]);
    if (fetchUrl.trim() !== p.identity.targetUrl || pushUrl.trim() !== p.identity.sourceUrl)
      throw new Error("Provider update proof publication identity changed");
    await proveMerge(root, parsed);
    if (
      frozenBase &&
      (!(await gitProofIsAncestor(root, frozenBase, p.expectedHeadSha)) ||
        !(await gitProofIsAncestor(root, frozenBase, p.expectedBaseSha)))
    )
      throw new Error("Provider update proof is outside frozen execution ancestry");
    proofs.push({ proof: parsed, sequence: entry.sequence });
  }
  for (const entry of journal.operations) {
    if (entry.status !== "completed") continue;
    const operation = entry.recovery?.operation_identity as
      { id?: unknown; params?: { identity?: { provider?: unknown } } } | undefined;
    const context = entry.recovery?.context as { kind?: unknown; task_id?: unknown } | undefined;
    if (context?.kind === "adopted_provider_effect") continue;
    if (
      operation?.params?.identity?.provider !== "gitlab" &&
      context?.kind !== "gitlab_provider_update_branch"
    )
      continue;
    if (operation?.id !== "provider.pr.update_branch")
      throw new Error("Completed GitLab update identity is unproven");
    const params = paramsSchema.parse(operation.params);
    const retained = proofs.find(({ proof }) => proof.operation_key === entry.operation_key);
    if (
      !retained ||
      digestSupervisorEpisodeValue(retained.proof.params) !== digestSupervisorEpisodeValue(params)
    )
      throw new Error("Completed GitLab update verification proof is missing or mismatched");
    retained.nativeGitLab = true;
  }
  return proofs.toSorted((a, b) => a.sequence - b.sequence);
}

/** A native GitLab update requires new validation even when its checked bytes are equivalent. */
export async function providerUpdateVerificationFloor(gitRoot: string, taskId: string) {
  let floor: string | null = null;
  for (const { proof, nativeGitLab } of await completedProofs(gitRoot, taskId)) {
    if (!nativeGitLab) continue;
    if (floor && !(await gitProofIsAncestor(gitRoot, floor, proof.params.expectedHeadSha)))
      throw new Error("Native GitLab validation floor lineage changed");
    floor = proof.observed_head_sha;
  }
  return floor;
}

/** Check both recorded targets and digest-bound native process observations, before input reuse. */
export async function verificationCoversProviderUpdateFloor(opts: {
  gitRoot: string;
  taskId: string;
  workflowDir: string;
  headSha?: string | null;
  evidenceRef?: string | null;
  implementationSha: unknown;
  targetSha?: string;
  references?: readonly VerificationEvidenceReference[];
  commands: readonly string[];
  approvedNoExecutableChecks?: boolean;
}): Promise<boolean> {
  const floor = await providerUpdateVerificationFloor(opts.gitRoot, opts.taskId);
  if (!floor) return true;
  const covers = async (value: unknown) =>
    oid.safeParse(value).success &&
    (await gitProofIsAncestor(opts.gitRoot, floor, value as string));
  const head = opts.headSha ?? (await git(opts.gitRoot, ["rev-parse", "HEAD"]));
  if (
    !(await covers(head.trim())) ||
    !(await covers(opts.implementationSha)) ||
    !(await covers(opts.targetSha))
  )
    return false;
  if (opts.commands.length === 0) return opts.approvedNoExecutableChecks === true;
  const prefix = `${opts.workflowDir.replaceAll("\\", "/").replace(/\/+$/u, "")}/${opts.taskId}/supervision/`;
  const read = async (relative: string) => {
    if (!relative.startsWith(prefix) || relative.split("/").includes(".."))
      throw new Error("Native verification evidence is outside the task");
    try {
      return await readContainedStableTextNoFollow({
        repository_root: opts.gitRoot,
        file_path: path.join(opts.gitRoot, relative),
        label: "native verification floor evidence",
        max_bytes: 16 * 1024 * 1024,
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      return gitShowFile(opts.gitRoot, opts.evidenceRef ?? opts.targetSha!, relative);
    }
  };
  const observed = new Set<string>();
  for (const reference of opts.references ?? []) {
    if (!reference.path.startsWith(prefix)) continue;
    const bytes = await read(reference.path);
    if (hash(bytes) !== reference.digest) return false;
    const artifact = z
      .object({
        kind: z.literal("direct_task_declared_checks"),
        task_id: z.literal(opts.taskId),
        status: z.literal("passed"),
        checks: z
          .array(
            z.object({
              command: text,
              exit_code: z.literal(0),
              observation: z.object({
                status: z.literal("retained"),
                manifest_path: text,
                digest,
              }),
            }),
          )
          .min(1),
      })
      .safeParse(JSON.parse(bytes));
    if (!artifact.success) continue;
    for (const check of artifact.data.checks) {
      // Absolute producer paths are projected into this checkout for snapshot consumers.
      const marker = `/${prefix}`;
      const name = check.observation.manifest_path.replaceAll("\\", "/");
      const absolute = path.posix.isAbsolute(name) || path.win32.isAbsolute(name);
      if (absolute && !name.includes(marker)) return false;
      const relative = absolute ? name.slice(name.lastIndexOf(marker) + 1) : name;
      if (!relative.startsWith(`${prefix}verification-runs/`)) return false;
      const manifestBytes = await read(relative);
      if (hash(manifestBytes) !== check.observation.digest) return false;
      const manifest = z
        .object({
          state: z.literal("passed"),
          result: z.object({ exit_code: z.literal(0) }),
          binding: z.object({
            kind: z.literal("declared_check"),
            command: text,
            command_text_truncated: z.literal(false),
            implementation: z.object({ head: oid }),
          }),
        })
        .parse(JSON.parse(manifestBytes));
      if (
        manifest.binding.command !== check.command ||
        !(await covers(manifest.binding.implementation.head))
      )
        return false;
      observed.add(check.command);
    }
  }
  return opts.commands.length > 0 && opts.commands.every((command) => observed.has(command));
}

/** Return only canonical imports backed by a completed native update and exact Git tree entries. */
export async function inheritedProviderUpdatePaths(opts: {
  command: CommandContext;
  task_id: string;
  frozen_base: string;
  evaluated_sha: string;
  changed_paths: readonly string[];
  workflow_dir: string;
  tasks_path: string;
}): Promise<string[]> {
  const root = opts.command.resolvedProject.gitRoot;
  const proofs = await completedProofs(root, opts.task_id, opts.frozen_base);
  let previous: Proof | undefined;
  let inherited = new Set<string>();
  // Cache whole observations per immutable commit/range. Large canonical imports
  // must not spawn several Git processes for every inherited artifact.
  const trees = new Map<string, Promise<Map<string, string>>>();
  const histories = new Map<string, Promise<Set<string>>>();
  const taskHistories = new Map<string, Promise<Set<string>>>();
  const entry = async (ref: string, file: string) => {
    if (!trees.has(ref))
      trees.set(
        ref,
        git(root, ["ls-tree", "-r", "-z", "--full-tree", ref]).then(
          (text) =>
            new Map(
              text
                .split("\0")
                .filter(Boolean)
                .map((row) => [row.slice(row.indexOf("\t") + 1), row]),
            ),
        ),
      );
    const tree = await trees.get(ref)!;
    return tree.get(file) ?? "";
  };
  // Raw history preserves pre-update ownership and canonical candidate discovery.
  // A later update proof cannot retroactively authenticate the origin of a prior local import.
  const history = (from: string, to: string) => {
    const range = `${from}..${to}`;
    if (!histories.has(range))
      histories.set(
        range,
        git(root, [
          "log",
          "--format=",
          "--name-only",
          "-z",
          "--full-history",
          "--diff-merges=separate",
          "--no-renames",
          range,
        ]).then((text) => new Set(text.split("\0").filter(Boolean))),
      );
    return histories.get(range)!;
  };
  const taskHistory = (from: string, to: string, canonicalBase: string) => {
    const key = `${from}..${to}:${canonicalBase}`;
    if (!taskHistories.has(key))
      taskHistories.set(
        key,
        taskOriginHistoryPaths(root, from, to, canonicalBase).then((paths) => new Set(paths)),
      );
    return taskHistories.get(key)!;
  };
  const untouched = async (from: string, to: string, canonicalBase: string, file: string) => {
    const paths = await taskHistory(from, to, canonicalBase);
    return !paths.has(file);
  };
  for (const { proof } of proofs) {
    if (!(await gitProofIsAncestor(root, proof.observed_head_sha, opts.evaluated_sha))) continue;
    if (
      previous &&
      (!(await gitProofIsAncestor(
        root,
        previous.params.expectedBaseSha,
        proof.params.expectedBaseSha,
      )) ||
        !(await gitProofIsAncestor(root, previous.observed_head_sha, proof.params.expectedHeadSha)))
    )
      throw new Error("Provider update lineage contains unqualified intervening edits");
    const headChanges = [...(await history(opts.frozen_base, proof.params.expectedHeadSha))];
    const owned = new Set(headChanges.filter((file) => !inherited.has(file)));
    const candidates = await history(opts.frozen_base, proof.params.expectedBaseSha);
    const previouslyInherited = inherited;
    inherited = new Set<string>();
    for (const file of candidates) {
      if (
        !owned.has(file) &&
        (!previous ||
          !previouslyInherited.has(file) ||
          (await untouched(
            previous.observed_head_sha,
            proof.params.expectedHeadSha,
            previous.params.expectedBaseSha,
            file,
          ))) &&
        (await entry(proof.observed_head_sha, file)) ===
          (await entry(proof.params.expectedBaseSha, file))
      )
        inherited.add(file);
    }
    previous = proof;
  }
  if (!previous) return [];
  const result: string[] = [];
  for (const file of opts.changed_paths) {
    if (
      inherited.has(file) &&
      (await untouched(
        previous.observed_head_sha,
        opts.evaluated_sha,
        previous.params.expectedBaseSha,
        file,
      )) &&
      (await entry(opts.evaluated_sha, file)) ===
        (await entry(previous.params.expectedBaseSha, file))
    )
      result.push(file);
  }
  return result;
}
