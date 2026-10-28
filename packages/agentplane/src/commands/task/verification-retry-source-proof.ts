import {
  gitCurrentBranch,
  gitProofEnv,
  gitDiffNames,
  gitIsAncestor,
  gitRevParse,
  gitShowFile,
} from "@agentplaneorg/core/git";
import { parseTaskReadme, taskCentricDigest } from "@agentplaneorg/core/tasks";
import path from "node:path";
import { runProcess } from "@agentplaneorg/core/process";
import {
  validateTaskReadmeFrontmatter,
  withTaskReadmeFrontmatterDefaults,
} from "@agentplaneorg/core/schemas";
import type { TaskRecord } from "@agentplaneorg/core/tasks";
import { taskRecordToData } from "../../backends/task-backend/shared.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { readPrHandoffNotes } from "../pr/internal/note-store.js";
import {
  renderGithubPrBody,
  renderPrReviewDocument,
  renderPrAutoSummary,
} from "../pr/internal/review-template.js";
import {
  buildVerifiedPrMeta,
  parsePrMeta,
  resolvePrBatchIncludedTaskIds,
} from "../shared/pr-meta.js";
import { digestPrDiffstatText } from "../pr/internal/freshness.js";
import { isRecord } from "../../shared/guards.js";
import type { TaskData } from "../../backends/task-backend.js";
import { readDirectRepositoryStatus } from "./direct-task-finalization.js";
import { taskReadmesPreserveRecoveryContract } from "./external-agent-implementation-recovery.js";
import { isManagedTaskArtifact } from "../shared/quality-review-target.js";

async function gitRegularFile(
  checkout: string,
  ref: string,
  name: string,
  optional = false,
): Promise<string | null> {
  const observed = await runProcess({
    command: "git",
    args: ["ls-tree", "-z", ref, "--", name],
    cwd: checkout,
    env: gitProofEnv(),
    reject: false,
  });
  if (observed.exitCode !== 0)
    throw new Error("Verification retry cannot observe the Git artifact identity.");
  if (!observed.stdout && optional) return null;
  if (
    !/^(100644|100755) blob [a-f0-9]{40,64}\t/u.test(observed.stdout) ||
    !observed.stdout.endsWith(`\t${name}\0`)
  )
    throw new Error("Verification retry requires a regular Git artifact.");
  return await gitShowFile(checkout, ref, name);
}

/** Pin the approved command and scope inputs, excluding mutable check observations. */
export function verificationRetryContractIdentity(task: TaskData): string {
  return taskCentricDigest({
    verify: task.verify ?? [],
    task_kind: task.task_kind,
    mutation_scope: task.mutation_scope,
    execution_route: task.execution_route,
    declaration: task.execution_contract?.declaration,
    authority: task.execution_contract?.authority,
    verification: task.execution_contract?.verification.contract,
  });
}

/** Reproduce the native verification projection instead of trusting a metadata path. */
async function auditedPrVerificationProjection(opts: {
  checkout: string;
  taskId: string;
  prefix: string;
  head: string;
  before: string;
  after: string;
}) {
  parsePrMeta(opts.before, opts.taskId);
  parsePrMeta(opts.after, opts.taskId);
  const before: unknown = JSON.parse(opts.before);
  const after: unknown = JSON.parse(opts.after);
  if (!isRecord(before) || !isRecord(after)) return false;
  const readmeText = await gitRegularFile(opts.checkout, opts.head, `${opts.prefix}README.md`);
  const diffstat = await gitRegularFile(opts.checkout, opts.head, `${opts.prefix}pr/diffstat.txt`);
  if (!readmeText || diffstat === null) return false;
  const verification = parseTaskReadme(readmeText).frontmatter.verification;
  if (
    !isRecord(verification) ||
    !["ok", "needs_rework"].includes(String(verification.state)) ||
    typeof verification.updated_at !== "string"
  )
    return false;
  const updated = Date.parse(String(after.updated_at));
  const previous = Date.parse(String(before.updated_at));
  if (
    !Number.isFinite(updated) ||
    !Number.isFinite(previous) ||
    updated < previous ||
    updated > Date.now() ||
    after.last_verified_at !== verification.updated_at ||
    after.diffstat_sha256 !== digestPrDiffstatText(diffstat)
  )
    return false;
  const branch = await gitCurrentBranch(opts.checkout);
  const projected = buildVerifiedPrMeta({
    meta: { ...before, branch, updated_at: after.updated_at } as Parameters<
      typeof buildVerifiedPrMeta
    >[0]["meta"],
    at: verification.updated_at,
    state: verification.state === "ok" ? "pass" : "fail",
  });
  return taskCentricDigest(projected) === taskCentricDigest(after);
}

async function auditedPrDocument(opts: {
  checkout: string;
  taskId: string;
  prefix: string;
  head: string;
  name: string;
  after: string;
}) {
  const readme = await gitRegularFile(opts.checkout, opts.head, `${opts.prefix}README.md`);
  const metaText = await gitRegularFile(opts.checkout, opts.head, `${opts.prefix}pr/meta.json`);
  const rawDiff = await gitRegularFile(opts.checkout, opts.head, `${opts.prefix}pr/diffstat.txt`);
  if (!readme || !metaText || rawDiff === null) return false;
  const parsed = parseTaskReadme(readme);
  const frontmatter = validateTaskReadmeFrontmatter(
    withTaskReadmeFrontmatterDefaults(parsed.frontmatter),
  );
  const task = taskRecordToData({
    id: opts.taskId,
    frontmatter: frontmatter as unknown as TaskRecord["frontmatter"],
    body: parsed.body,
    readmePath: path.join(opts.checkout, opts.prefix, "README.md"),
  });
  const meta = parsePrMeta(metaText, opts.taskId);
  const diffstat = rawDiff.endsWith("\n") ? rawDiff.slice(0, -1) : rawDiff;
  if (meta.diffstat_sha256 !== digestPrDiffstatText(rawDiff)) return false;
  const notesPath = path.join(opts.checkout, opts.prefix, "pr/notes.jsonl");
  const committedNotes = await gitRegularFile(
    opts.checkout,
    opts.head,
    `${opts.prefix}pr/notes.jsonl`,
    true,
  );
  let liveNotes: string | null;
  try {
    liveNotes = await readStableRegularTextNoFollow(notesPath, "retry native notes");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    liveNotes = null;
  }
  if (committedNotes !== liveNotes) return false;
  const handoffNotes = await readPrHandoffNotes(notesPath);
  const branch = await gitCurrentBranch(opts.checkout);
  const autoSummary = renderPrAutoSummary({ updatedAt: meta.updated_at, branch, diffstat });
  const common = {
    task,
    relatedTaskIds: resolvePrBatchIncludedTaskIds(meta),
    handoffNotes,
    autoSummary,
  };
  const rendered =
    opts.name === "pr/review.md"
      ? renderPrReviewDocument({ ...common, createdAt: meta.created_at, branch })
      : renderGithubPrBody(common);
  return rendered === opts.after;
}

/** Only the current task's managed metadata may descend from the selected source. */
export async function observeVerificationRetrySource(opts: {
  checkout: string;
  task_id: string;
  workflow_dir: string;
  source_sha: string;
  expected_head: string;
  failed_checks_digest?: string;
  allowed_new_paths?: readonly string[];
  allowed_modified_paths?: readonly string[];
}) {
  const sha = /^[a-f0-9]{40}(?:[a-f0-9]{24})?$/u;
  if (!sha.test(opts.source_sha) || !sha.test(opts.expected_head))
    throw new Error("Verification retry requires exact source and head identities.");
  const head = await gitRevParse(opts.checkout, ["HEAD"]);
  if (head !== opts.expected_head || !(await gitIsAncestor(opts.checkout, opts.source_sha, head)))
    throw new Error("Verification retry source ancestry changed.");
  const prefix = `${opts.workflow_dir.replaceAll("\\", "/").replace(/\/+$/u, "")}/${opts.task_id}/`;
  const changed = await gitDiffNames(opts.checkout, opts.source_sha, head, { range: "two-dot" });
  if (
    changed.some(
      (name) => !name.startsWith(prefix) || !isManagedTaskArtifact(name.slice(prefix.length)),
    )
  )
    throw new Error("Verification retry descendant contains non-managed source changes.");
  for (const name of changed) {
    if (/[\r\n\0]/u.test(name)) throw new Error("Unsafe verification retry artifact name.");
    await gitRegularFile(opts.checkout, head, name);
    const before = await gitRegularFile(opts.checkout, opts.source_sha, name, true);
    if (before === null) continue;
    const relative = name.slice(prefix.length);
    if (relative === "README.md") {
      const after = await gitRegularFile(opts.checkout, head, name);
      if (!after || !taskReadmesPreserveRecoveryContract(before, after, opts.source_sha))
        throw new Error("Verification retry metadata changed the task contract.");
    } else if (relative === "pr/meta.json") {
      const after = await gitRegularFile(opts.checkout, head, name);
      if (
        !after ||
        !(await auditedPrVerificationProjection({
          checkout: opts.checkout,
          taskId: opts.task_id,
          prefix,
          head,
          before,
          after,
        }))
      )
        throw new Error("Verification retry PR metadata is not an audited native projection.");
    } else if (["pr/github-body.md", "pr/review.md"].includes(relative)) {
      const after = await gitRegularFile(opts.checkout, head, name);
      if (
        !after ||
        !(await auditedPrDocument({
          checkout: opts.checkout,
          taskId: opts.task_id,
          prefix,
          head,
          name: relative,
          after,
        }))
      )
        throw new Error("Verification retry document is not an audited native projection.");
    } else if (relative === "supervision/declared-checks.json" && opts.failed_checks_digest) {
      const after = await gitRegularFile(opts.checkout, head, name);
      if (!after || taskCentricDigest(JSON.parse(after)) !== opts.failed_checks_digest)
        throw new Error("Retained failed verification projection changed.");
    } else {
      throw new Error("Verification retry would accept rewritten historical evidence.");
    }
  }
  const status = await readDirectRepositoryStatus(opts.checkout);
  if (
    !status ||
    status.lines.some((line) => {
      const name = line.slice(3);
      // Do not reinterpret renames, quoted paths, ignored source or arbitrary task metadata.
      return !(
        (line.startsWith("??") &&
          (opts.allowed_new_paths ?? []).some(
            (allowed) => name === allowed || name.startsWith(`${allowed}/`),
          )) ||
        (line.startsWith(" M") && (opts.allowed_modified_paths ?? []).includes(name))
      );
    })
  )
    throw new Error("Verification retry requires a clean source and index.");
  if ((await gitRevParse(opts.checkout, ["HEAD"])) !== head)
    throw new Error("Verification retry head changed during observation.");
  return {
    kind: "adopted_source_for_verification" as const,
    source_sha: opts.source_sha,
    head_sha: head,
    metadata_paths: changed.toSorted(),
    digest: taskCentricDigest({
      source_sha: opts.source_sha,
      head_sha: head,
      metadata_paths: changed.toSorted(),
    }),
  };
}
