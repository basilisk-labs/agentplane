import path from "node:path";
import { lstat, mkdir, unlink } from "node:fs/promises";
import { syncDirectory } from "@agentplaneorg/core/fs";
import { parseTaskReadme, taskCentricDigest } from "@agentplaneorg/core/tasks";
import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";

export async function readPlanningBaseCandidate(
  root: string,
  file: string,
  identity: Record<string, unknown>,
) {
  const stat = await lstat(file, { bigint: true });
  if (!stat.isFile() || stat.isSymbolicLink() || stat.nlink !== 1n)
    throw new Error("Recovery candidate is not an unaliased regular file.");
  const raw = await readContainedStableTextNoFollow({
    repository_root: root,
    file_path: file,
    label: "Task recovery candidate",
    max_bytes: 32 * 1024 * 1024,
    expected_identity: stat,
  });
  const parsed = parseTaskReadme(raw);
  const extensions = parsed.frontmatter.extensions as Record<string, unknown> | undefined;
  const receipt = extensions?.task_planning_base_recovery as Record<string, unknown> | undefined;
  if (!receipt || typeof receipt !== "object" || Array.isArray(receipt))
    throw new Error("Unknown Task recovery candidate.");
  const { token, state, ...basis } = receipt;
  const expected = { ...identity, observed_head: basis.observed_head };
  if (
    parsed.frontmatter.id !== identity.task_id ||
    ![identity.from_sha, identity.target_sha].includes(basis.observed_head) ||
    state !== "applied" ||
    token !== taskCentricDigest(expected) ||
    taskCentricDigest(basis) !== taskCentricDigest(expected)
  ) {
    throw new Error(
      "Task recovery candidate does not match the current Task, plan and Git identities.",
    );
  }
  return { file, raw, digest: taskCentricDigest(raw), stat };
}

/** Preserve a verified orphan before removing its worktree copy, under the native Task lock. */
export async function archivePlanningBaseCandidate(opts: {
  root: string;
  commonDir: string;
  taskId: string;
  identity: Record<string, unknown>;
  candidate: Awaited<ReturnType<typeof readPlanningBaseCandidate>>;
}) {
  const current = await readPlanningBaseCandidate(opts.root, opts.candidate.file, opts.identity);
  if (
    current.digest !== opts.candidate.digest ||
    current.stat.dev !== opts.candidate.stat.dev ||
    current.stat.ino !== opts.candidate.stat.ino
  )
    throw new Error("Recovery candidate changed before archival.");
  let directory = opts.commonDir;
  for (const segment of ["agentplane", "planning-base-recovery", opts.taskId]) {
    directory = path.join(directory, segment);
    await mkdir(directory).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "EEXIST") throw error;
    });
    const stat = await lstat(directory);
    if (!stat.isDirectory() || stat.isSymbolicLink())
      throw new Error("Unsafe recovery archive directory.");
  }
  const archive = path.join(directory, `${current.digest.slice(7)}.md`);
  const previous = await readContainedStableTextNoFollow({
    repository_root: opts.commonDir,
    file_path: archive,
    label: "recovery archive",
    max_bytes: 32 * 1024 * 1024,
  }).catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") return null;
    throw error;
  });
  if (previous !== null && previous !== current.raw)
    throw new Error("Recovery archive digest collision.");
  await writeTextIfChanged(archive, current.raw, {
    containedRoot: opts.commonDir,
    label: "recovery archive",
  });
  const archived = await readContainedStableTextNoFollow({
    repository_root: opts.commonDir,
    file_path: archive,
    label: "recovery archive",
    max_bytes: 32 * 1024 * 1024,
  });
  const confirmed = await readPlanningBaseCandidate(opts.root, current.file, opts.identity);
  if (
    archived !== current.raw ||
    confirmed.digest !== current.digest ||
    confirmed.stat.dev !== current.stat.dev ||
    confirmed.stat.ino !== current.stat.ino
  )
    throw new Error("Recovery archival readback mismatch.");
  await unlink(current.file);
  await syncDirectory(path.dirname(current.file));
  return archive;
}
