import { lstat, mkdtemp, rm } from "node:fs/promises";
import path from "node:path";

import { gitEnv } from "@agentplaneorg/core/git";
import { runProcess } from "@agentplaneorg/core/process";

import { runWithIntegrationMutation } from "./integrate/internal/merge-mutation.js";
import { cmdCommit } from "../guard/impl/commit.js";
import type { CommandContext } from "../shared/task-backend.js";

const OBJECT_ID = /^[0-9a-f]{40}(?:[0-9a-f]{24})?$/u;

/** The caller validates the accepted semantic result and exact workspace before committing. */
export async function commitConflictResolutionSnapshot(opts: {
  command: CommandContext;
  cwd: string;
  task_id: string;
  result_digest: string;
  changed_paths: string[];
}): Promise<void> {
  if (!/^sha256:[0-9a-f]{64}$/u.test(opts.result_digest)) {
    throw new Error("Conflict snapshot requires a persisted result digest.");
  }
  const code = await cmdCommit({
    ctx: opts.command,
    cwd: opts.cwd,
    taskId: opts.task_id,
    message: `🚧 ${opts.task_id.split("-").at(-1)} task: apply external agent result\n\nAgentPlane-Result: ${opts.result_digest}`,
    close: false,
    allow: opts.changed_paths,
    autoAllow: false,
    allowTasks: true,
    allowBase: false,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: false,
    quiet: true,
    closeUnstageOthers: false,
    closeCheckOnly: false,
  });
  if (code !== 0) throw new Error(`Conflict snapshot commit exited ${code}.`);
}

export async function resolveConflictResolutionSnapshot(opts: {
  cwd: string;
  task_id: string;
  baseline: string;
  head: string;
  base: string;
  result_digest: string;
}): Promise<string> {
  const git = async (args: string[]) => {
    const result = await runProcess({ command: "git", args, cwd: opts.cwd, env: gitEnv() });
    return result.stdout.trim();
  };
  if (
    ![opts.baseline, opts.head, opts.base].every((ref) => OBJECT_ID.test(ref)) ||
    !/^sha256:[0-9a-f]{64}$/u.test(opts.result_digest)
  ) {
    throw new Error("Conflict snapshot requires exact bound result identity.");
  }
  const assertBinding = async (commit: string) => {
    const message = await git(["show", "-s", "--format=%B", commit]);
    const trailers = message.split("\n").filter((line) => line.startsWith("AgentPlane-Result:"));
    if (trailers.length !== 1 || trailers[0] !== `AgentPlane-Result: ${opts.result_digest}`) {
      throw new Error("Conflict snapshot does not match the bound result.");
    }
  };
  if (opts.head === opts.baseline) return opts.baseline;
  await assertBinding(opts.head);
  const parentOutput = await git(["show", "-s", "--format=%P", opts.head]);
  const parents = parentOutput.split(" ");
  const snapshot = parents.length === 2 && parents[1] === opts.base ? parents[0]! : opts.head;
  if (snapshot !== opts.baseline) {
    await assertBinding(snapshot);
    const subject = await git(["show", "-s", "--format=%s", snapshot]);
    if (subject !== `🚧 ${opts.task_id.split("-").at(-1)} task: apply external agent result`) {
      throw new Error("Conflict snapshot is not the supervisor implementation effect.");
    }
    const snapshotParents = await git(["show", "-s", "--format=%P", snapshot]);
    if (snapshotParents.split(" ").length !== 1) {
      throw new Error("Conflict snapshot is not a single implementation effect.");
    }
  }
  await git(["merge-base", "--is-ancestor", opts.baseline, snapshot]);
  return snapshot;
}

/**
 * The caller must validate the persisted semantic-result intent and live task/provider authority.
 * Git owns merge metadata. An interrupted application retains it for the same bound result.
 */
/** Verify immutable commit identity. The caller must independently qualify workspace changes. */
export async function assertConflictResolutionCommit(opts: {
  cwd: string;
  task_id: string;
  head: string;
  resolution_snapshot: string;
  base: string;
  tree: string;
  semantic_result_digest: string;
}): Promise<void> {
  if (
    ![opts.head, opts.resolution_snapshot, opts.base, opts.tree].every((ref) =>
      OBJECT_ID.test(ref),
    ) ||
    !/^sha256:[0-9a-f]{64}$/u.test(opts.semantic_result_digest)
  ) {
    throw new Error("Conflict commit proof requires exact bound object and result identities.");
  }
  const result = await runProcess({
    command: "git",
    cwd: opts.cwd,
    env: gitEnv(),
    args: ["show", "-s", "--format=%P%x00%T%x00%B", opts.head],
  });
  const [parents, tree, message] = result.stdout.split("\0");
  const trailers = message?.split("\n").filter((line) => line.startsWith("AgentPlane-Result:"));
  if (
    parents !== `${opts.resolution_snapshot} ${opts.base}` ||
    tree !== opts.tree ||
    message?.split("\n")[0] !==
      `🔀 ${opts.task_id.split("-").at(-1)} task: apply conflict resolution` ||
    trailers?.length !== 1 ||
    trailers[0] !== `AgentPlane-Result: ${opts.semantic_result_digest}`
  ) {
    throw new Error("Conflict application does not match the completed bound result.");
  }
}

export async function applyConflictResolution(opts: {
  cwd: string;
  task_id: string;
  task_branch: string;
  base_ref: string;
  task_head: string;
  resolution_snapshot: string;
  base: string;
  merge_base: string;
  allowed_path: (file: string) => boolean;
  semantic_result_digest: string;
  assert_authority: () => Promise<void>;
}): Promise<string> {
  if (!/^sha256:[0-9a-f]{64}$/u.test(opts.semantic_result_digest)) {
    throw new Error("Conflict application requires an exact semantic-result digest.");
  }
  return runWithIntegrationMutation({
    repoRoot: opts.cwd,
    command: "git conflict resolution",
    workflowMode: "branch_pr",
    taskId: opts.task_id,
    changedPaths: [],
    run: async () => {
      const git = async (args: string[], optional = false) => {
        const result = await runProcess({
          command: "git",
          args,
          cwd: opts.cwd,
          env: { ...gitEnv(), GIT_LITERAL_PATHSPECS: "1", AGENTPLANE_TASK_ID: opts.task_id },
          reject: false,
        });
        if (result.exitCode !== 0 && !(optional && result.exitCode === 1)) {
          throw new Error(result.stderr.trim() || "Conflict application Git operation failed.");
        }
        return result.stdout.trim();
      };
      await opts.assert_authority();
      const branch = await git(["symbolic-ref", "--short", "HEAD"]);
      const currentBase = await git(["rev-parse", "--verify", "--end-of-options", opts.base_ref]);
      if (branch !== opts.task_branch || branch === opts.base_ref || currentBase !== opts.base) {
        throw new Error("Conflict application branch or base identity changed.");
      }
      const prepared = await prepareConflictResolutionTree(opts);
      const subject = `🔀 ${opts.task_id.split("-").at(-1)} task: apply conflict resolution`;
      const trailer = `AgentPlane-Result: ${opts.semantic_result_digest}`;
      const head = await git(["rev-parse", "HEAD"]);
      const snapshot = await resolveConflictResolutionSnapshot({
        cwd: opts.cwd,
        task_id: opts.task_id,
        baseline: opts.task_head,
        head,
        base: opts.base,
        result_digest: opts.semantic_result_digest,
      });
      if (snapshot !== opts.resolution_snapshot) {
        throw new Error("Conflict application snapshot identity changed.");
      }
      const status = () => git(["status", "--porcelain", "--untracked-files=all"]);
      const assertCompleted = async () => {
        await assertConflictResolutionCommit({
          ...opts,
          head: await git(["rev-parse", "HEAD"]),
          tree: prepared.tree,
        });
        if ((await status()) !== "") {
          throw new Error("Conflict application does not match the completed bound result.");
        }
      };
      if (head !== opts.resolution_snapshot) {
        await assertCompleted();
        return head;
      }
      const mergeHead = await git(["rev-parse", "-q", "--verify", "MERGE_HEAD"], true);
      if (mergeHead) {
        const originalHead = await git(["rev-parse", "ORIG_HEAD"]);
        if (mergeHead !== opts.base || originalHead !== opts.resolution_snapshot) {
          throw new Error("Conflict application found foreign merge metadata.");
        }
      } else {
        const snapshotStatus = await status();
        if (snapshotStatus !== "")
          throw new Error(`Conflict application requires a clean snapshot: ${snapshotStatus}`);
        await assertConflictMaterializationState({
          cwd: opts.cwd,
          snapshot: opts.resolution_snapshot,
          resolved_tree: prepared.tree,
        });
        // Establish parents without selecting content. The precomputed, scope-checked tree below
        // contains the executor's resolution and automatic base-only changes.
        await git([
          "merge",
          "--no-commit",
          "--no-ff",
          "--strategy=ours",
          "--no-overwrite-ignore",
          opts.base,
        ]);
      }
      await opts.assert_authority();
      const boundState = await Promise.all([
        git(["rev-parse", "HEAD"]),
        git(["rev-parse", "--verify", "--end-of-options", opts.base_ref]),
        git(["rev-parse", "-q", "--verify", "MERGE_HEAD"], true),
        git(["symbolic-ref", "--short", "HEAD"]),
      ]);
      if (
        boundState[0] !== opts.resolution_snapshot ||
        boundState[1] !== opts.base ||
        boundState[2] !== opts.base ||
        boundState[3] !== opts.task_branch
      ) {
        throw new Error("Conflict application identity changed before materialization.");
      }
      await assertConflictMaterializationState({
        cwd: opts.cwd,
        snapshot: opts.resolution_snapshot,
        resolved_tree: prepared.tree,
      });
      await git(["read-tree", "--reset", "-u", prepared.tree]);
      if ((await git(["write-tree"])) !== prepared.tree) {
        throw new Error("Conflict application did not materialize the expected tree.");
      }
      await git(["commit", "--signoff", "-m", subject, "-m", trailer]);
      await assertCompleted();
      return git(["rev-parse", "HEAD"]);
    },
  });
}

/** Accept only the exact initial or resolved index and recoverable workspace content. */
export async function assertConflictMaterializationState(opts: {
  cwd: string;
  snapshot: string;
  resolved_tree: string;
}): Promise<void> {
  if (![opts.snapshot, opts.resolved_tree].every((value) => OBJECT_ID.test(value))) {
    throw new Error("Conflict materialization requires exact Git object IDs.");
  }
  const git = async (args: string[], index?: string) => {
    const result = await runProcess({
      command: "git",
      args,
      cwd: opts.cwd,
      env: { ...gitEnv(), GIT_LITERAL_PATHSPECS: "1", ...(index ? { GIT_INDEX_FILE: index } : {}) },
      reject: false,
    });
    if (result.exitCode !== 0) {
      throw new Error(`Conflict materialization state is unavailable: ${result.stderr.trim()}`);
    }
    return result.stdout;
  };
  const snapshotOutput = await git(["rev-parse", `${opts.snapshot}^{tree}`]);
  const snapshotTree = snapshotOutput.trim();
  const indexOutput = await git(["write-tree"]);
  const indexTree = indexOutput.trim();
  if (indexTree !== snapshotTree && indexTree !== opts.resolved_tree) {
    throw new Error("Conflict materialization found a foreign index.");
  }
  const directoryOutput = await git(["rev-parse", "--absolute-git-dir"]);
  const temporary = await mkdtemp(path.join(directoryOutput.trim(), "agentplane-conflict-state-"));
  const changedPaths = async (tree: string) => {
    const index = path.join(temporary, tree);
    await git(["read-tree", tree], index);
    const output = await git(
      ["diff", "--name-only", "--no-renames", "--no-ext-diff", "--no-textconv", "-z", "--"],
      index,
    );
    return new Set(output.split("\0").filter(Boolean));
  };
  try {
    const initialChanges = await changedPaths(snapshotTree);
    const resolvedChanges = await changedPaths(opts.resolved_tree);
    if ([...initialChanges].some((file) => resolvedChanges.has(file))) {
      throw new Error("Conflict materialization found foreign workspace content.");
    }
    const resolvedOutput = await git(["ls-tree", "-r", "--name-only", "-z", opts.resolved_tree]);
    const resolvedPaths = new Set(resolvedOutput.split("\0").filter(Boolean));
    for (const file of initialChanges) {
      if (resolvedPaths.has(file)) continue;
      const present = await lstat(path.join(opts.cwd, file)).then(
        () => true,
        (error: NodeJS.ErrnoException) => {
          if (error.code === "ENOENT" || error.code === "ENOTDIR") return false;
          throw error;
        },
      );
      if (present) {
        throw new Error("Conflict materialization would remove foreign workspace content.");
      }
    }
    const untrackedOutput = await git(["ls-files", "--others", "--exclude-standard", "-z"]);
    const untracked = untrackedOutput.split("\0").filter(Boolean);
    // Ignored files outside the materialized tree remain untouched. Check collisions without
    // scanning ignored dependency directories that the operation does not own.
    const addedOutput = await git([
      "diff",
      "--name-only",
      "--no-renames",
      "--diff-filter=A",
      "-z",
      snapshotTree,
      opts.resolved_tree,
      "--",
    ]);
    const addedPaths = addedOutput.split("\0").filter(Boolean);
    for (let offset = 0; offset < addedPaths.length; offset += 128) {
      const ignoredOutput = await git([
        "ls-files",
        "--others",
        "--ignored",
        "--exclude-standard",
        "-z",
        "--",
        ...addedPaths.slice(offset, offset + 128),
      ]);
      untracked.push(...ignoredOutput.split("\0").filter(Boolean));
    }
    if (untracked.some((file) => !resolvedPaths.has(file) || resolvedChanges.has(file))) {
      throw new Error("Conflict materialization found a foreign untracked file.");
    }
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}

/** Prepare Git objects in an isolated index. Do not change HEAD, the real index or workspace. */
export async function prepareConflictResolutionTree(opts: {
  cwd: string;
  task_head: string;
  resolution_snapshot: string;
  base: string;
  merge_base: string;
  allowed_path: (file: string) => boolean;
}): Promise<{
  tree: string;
  automatic_tree: string;
  conflict_paths: string[];
  conflict_stages: string[];
}> {
  const git = async (args: string[], index?: string, allowConflict = false) => {
    const result = await runProcess({
      command: "git",
      args,
      cwd: opts.cwd,
      env: { ...gitEnv(), GIT_LITERAL_PATHSPECS: "1", ...(index ? { GIT_INDEX_FILE: index } : {}) },
      reject: false,
    });
    if (result.exitCode !== 0 && !(allowConflict && result.exitCode === 1)) {
      throw new Error(
        `Conflict resolution preparation failed (git ${args[0]}, exit=${result.exitCode}): ` +
          (result.stderr.trim() || result.stdout.trim()),
      );
    }
    return result;
  };
  for (const ref of [opts.task_head, opts.resolution_snapshot, opts.base, opts.merge_base]) {
    if (!OBJECT_ID.test(ref))
      throw new Error("Conflict preparation requires exact Git object IDs.");
  }
  await git(["merge-base", "--is-ancestor", opts.task_head, opts.resolution_snapshot]);
  const baseResult = await git(["merge-base", "--all", opts.resolution_snapshot, opts.base]);
  const bases = baseResult.stdout.trim();
  if (bases !== opts.merge_base) throw new Error("Conflict merge-base identity changed.");
  const changedResult = await git([
    "diff",
    "--name-only",
    "--no-renames",
    "--no-ext-diff",
    "--no-textconv",
    "-z",
    opts.task_head,
    opts.resolution_snapshot,
    "--",
  ]);
  const changed = changedResult.stdout.split("\0").filter(Boolean);
  if (changed.some((file) => !opts.allowed_path(file))) {
    throw new Error("Conflict resolution snapshot escaped semantic authority.");
  }
  const merged = await git(
    ["merge-tree", "--write-tree", "--no-messages", "-z", opts.resolution_snapshot, opts.base],
    undefined,
    true,
  );
  const [automaticTree, ...stages] = merged.stdout.split("\0").filter(Boolean);
  const conflicts = new Set<string>();
  for (const entry of stages) {
    const match = /^(100644|100755|120000) ([0-9a-f]+) [123]\t([^\0]+)$/u.exec(entry);
    if (!match || !OBJECT_ID.test(match[2]!)) {
      throw new Error("Git did not return an exact supported conflict index stage.");
    }
    conflicts.add(match[3]!);
  }
  if (
    !automaticTree ||
    !OBJECT_ID.test(automaticTree) ||
    (merged.exitCode === 0 && conflicts.size > 0) ||
    (merged.exitCode === 1 && conflicts.size === 0)
  ) {
    throw new Error("Git did not return a complete conflict tree and path set.");
  }
  if ([...conflicts].some((file) => !opts.allowed_path(file))) {
    throw new Error("Conflict paths require authority outside the semantic scope.");
  }
  const directoryResult = await git(["rev-parse", "--absolute-git-dir"]);
  const gitDir = directoryResult.stdout.trim();
  const temporary = await mkdtemp(path.join(gitDir, "agentplane-conflict-index-"));
  const index = path.join(temporary, "index");
  try {
    await git(["read-tree", automaticTree], index);
    // A completed conflict episode resolves whole files, including an explicit unchanged-head choice.
    // Preserve automatic base-only changes. Overlay only scoped semantic edits and actual conflicts.
    for (const file of [...new Set([...changed, ...conflicts])].toSorted()) {
      const entryResult = await git(["ls-tree", "-z", opts.resolution_snapshot, "--", file]);
      const entry = entryResult.stdout;
      await git(["update-index", "--force-remove", "--", file], index);
      if (!entry) continue;
      const match = /^(100644|100755|120000) blob ([0-9a-f]+)\t([^\0]+)\0$/u.exec(entry);
      if (match?.[3] !== file || !OBJECT_ID.test(match[2]!)) {
        throw new Error("Conflict resolution requires an exact regular-file or symlink snapshot.");
      }
      await git(["update-index", "--add", "--cacheinfo", match[1]!, match[2]!, file], index);
    }
    const treeResult = await git(["write-tree"], index);
    const tree = treeResult.stdout.trim();
    await git(["diff", "--check", opts.base, tree, "--"], index);
    return {
      tree,
      automatic_tree: automaticTree,
      conflict_paths: [...conflicts].toSorted(),
      conflict_stages: stages.toSorted(),
    };
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
}
