import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { stableJson } from "./agent-efficiency-baseline.mjs";

const requireFromCore = createRequire(new URL("../../packages/core/package.json", import.meta.url));
const { parse: parseYaml } = requireFromCore("yaml");
const digest = (value) => `sha256:${createHash("sha256").update(value).digest("hex")}`;

const TASK_COST_ROLES = Object.freeze(["PLANNER", "CURATOR", "EXECUTOR", "EVALUATOR"]);
const TASK_COST_STATES = Object.freeze(["observed", "partial", "unavailable", "unallocatable"]);
const TASK_COST_USAGE_FIELDS = Object.freeze([
  "input_tokens",
  "output_tokens",
  "total_tokens",
  "cached_input_tokens",
  "visible_output_tokens",
  "reasoning_tokens",
  "prepared_context_bytes",
]);
const TASK_TIMESTAMP_FIELDS = Object.freeze(["doc_updated_at", "updated_at"]);

function emptyTaskCostCoverage() {
  return {
    dispatched: 0,
    observed: 0,
    partial: 0,
    unavailable: 0,
    unallocatable: 0,
    failed: 0,
  };
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function taskCostAttribution(operation, usage) {
  if (operation.usage_attribution !== undefined) {
    const attribution = operation.usage_attribution;
    if (
      !attribution ||
      !TASK_COST_STATES.includes(attribution.state) ||
      !(
        attribution.reason === null ||
        (typeof attribution.reason === "string" && attribution.reason.trim().length > 0)
      )
    ) {
      throw new Error("Supervisor journal operation has invalid usage attribution.");
    }
    return attribution;
  }
  const observedFields = [usage.input_tokens, usage.output_tokens, usage.total_tokens].filter(
    (value) => Number.isSafeInteger(value),
  ).length;
  if (observedFields === 3) return { state: "observed", reason: null };
  if (observedFields > 0)
    return { state: "partial", reason: "legacy_partial_provider_token_telemetry" };
  return { state: "unavailable", reason: "legacy_provider_token_telemetry_unavailable" };
}

/**
 * Derive a read-only task cost diagnostic from one latest supervisor journal.
 * Token values remain labelled observed subtotals unless all dispatches are observed.
 */
export function rollupTaskCostFromSupervisorJournal(journal) {
  if (
    !journal ||
    journal.kind !== "supervisor_execution_episode" ||
    typeof journal.task_id !== "string" ||
    journal.task_id.trim().length === 0 ||
    !Array.isArray(journal.operations)
  ) {
    throw new Error("Task cost rollup requires a supervisor execution episode journal.");
  }
  const coverage = emptyTaskCostCoverage();
  const byRole = Object.fromEntries(TASK_COST_ROLES.map((role) => [role, emptyTaskCostCoverage()]));
  const attempts = [];
  const roleAttempts = Object.fromEntries(TASK_COST_ROLES.map((role) => [role, 0]));
  const observedSubtotal = { input_tokens: 0, output_tokens: 0, total_tokens: 0 };
  let cachedInputSubtotal = 0;
  let cachedInputObservedAttempts = 0;
  let reasoningOutputSubtotal = 0;
  let reasoningOutputObservedAttempts = 0;
  const operationKeys = new Set();
  const providerRuns = new Set();

  for (const operation of journal.operations) {
    if (operation.kind !== "agent_episode" && operation.kind !== "evaluator_episode") continue;
    if (typeof operation.operation_key !== "string" || operationKeys.has(operation.operation_key)) {
      throw new Error("Task cost rollup requires unique supervisor operation identities.");
    }
    operationKeys.add(operation.operation_key);
    if (!TASK_COST_ROLES.includes(operation.role)) {
      throw new Error("Supervisor journal operation has an invalid semantic role.");
    }
    if (operation.provider_usage) {
      const providerRun = `${operation.provider_usage.provider}\0${operation.provider_usage.run_id}`;
      if (providerRuns.has(providerRun)) {
        throw new Error("Task cost rollup found a provider observation bound more than once.");
      }
      providerRuns.add(providerRun);
    }
    const usage = operation.usage ?? {};
    if (
      !isRecord(usage) ||
      Object.keys(usage).some((key) => !TASK_COST_USAGE_FIELDS.includes(key)) ||
      Object.values(usage).some((value) => !Number.isSafeInteger(value) || value < 0)
    ) {
      throw new Error("Supervisor journal operation has invalid normalized usage.");
    }
    const attribution = taskCostAttribution(operation, usage);
    const completeTokens =
      Number.isSafeInteger(usage.input_tokens) &&
      Number.isSafeInteger(usage.output_tokens) &&
      Number.isSafeInteger(usage.total_tokens);
    if (attribution.state === "observed" && !completeTokens) {
      throw new Error("Observed task cost attribution requires complete token telemetry.");
    }

    const roleCoverage = byRole[operation.role];
    roleAttempts[operation.role] += 1;
    coverage.dispatched += 1;
    roleCoverage.dispatched += 1;
    coverage[attribution.state] += 1;
    roleCoverage[attribution.state] += 1;
    if (operation.status === "failed") {
      coverage.failed += 1;
      roleCoverage.failed += 1;
    }
    attempts.push({
      attempt: roleAttempts[operation.role],
      sequence: operation.sequence,
      episode: operation.episode,
      role: operation.role,
      status: operation.status,
      attribution: attribution.state,
      reason: attribution.reason,
    });
    observedSubtotal.input_tokens += usage.input_tokens ?? 0;
    observedSubtotal.output_tokens += usage.output_tokens ?? 0;
    observedSubtotal.total_tokens += usage.total_tokens ?? 0;
    if (usage.cached_input_tokens !== undefined) {
      cachedInputSubtotal += usage.cached_input_tokens;
      cachedInputObservedAttempts += 1;
    }
    if (usage.reasoning_tokens !== undefined) {
      reasoningOutputSubtotal += usage.reasoning_tokens;
      reasoningOutputObservedAttempts += 1;
    }
  }

  const complete = coverage.dispatched > 0 && coverage.observed === coverage.dispatched;
  const hasObservedTokens = coverage.observed + coverage.partial > 0;
  return {
    schema_version: 1,
    kind: "supervisor_task_cost_rollup",
    task_id: journal.task_id,
    coverage: { ...coverage, by_role: byRole, attempts },
    tokens: {
      state: complete ? "observed" : hasObservedTokens ? "partial" : "unavailable",
      complete,
      observed_subtotal: observedSubtotal,
      cached_input_subset: {
        observed_subtotal: cachedInputSubtotal,
        observed_attempts: cachedInputObservedAttempts,
        complete: complete && cachedInputObservedAttempts === coverage.dispatched,
      },
      reasoning_output_subset: {
        observed_subtotal: reasoningOutputSubtotal,
        observed_attempts: reasoningOutputObservedAttempts,
        complete: complete && reasoningOutputObservedAttempts === coverage.dispatched,
      },
    },
  };
}

function gitText(repoRoot, args) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function resolveCommit(repoRoot, revision, label) {
  try {
    return gitText(repoRoot, ["rev-parse", "--verify", `${revision}^{commit}`]).trim();
  } catch {
    throw new Error(`${label} must resolve to a Git commit.`);
  }
}

function treeBlobEntries(repoRoot, commit) {
  return gitText(repoRoot, ["ls-tree", "-rlz", commit])
    .split("\0")
    .filter(Boolean)
    .flatMap((row) => {
      const match = /^(\d+) (\w+) ([a-f0-9]+)\s+(\d+|-)\t([\s\S]+)$/u.exec(row);
      return match?.[2] === "blob"
        ? [{ object: match[3], bytes: Number(match[4]), path: match[5] }]
        : [];
    });
}

function readCommitPath(repoRoot, commit, filePath) {
  try {
    return gitText(repoRoot, ["show", `${commit}:${filePath}`]);
  } catch {
    return null;
  }
}

function withoutTaskProjectionTimestamps(value) {
  if (value === null) return null;
  const timestampField = TASK_TIMESTAMP_FIELDS.join("|");
  return value.replaceAll(
    new RegExp(`^(\\s*(?:${timestampField}):\\s*).+$`, "gmu"),
    "$1<TIMESTAMP>",
  );
}

function classifyMarginalCommit(repoRoot, sha) {
  const files = gitText(repoRoot, [
    "diff-tree",
    "--root",
    "--no-commit-id",
    "--name-only",
    "-r",
    "-z",
    sha,
  ])
    .split("\0")
    .filter(Boolean);
  let parent = null;
  try {
    parent = gitText(repoRoot, ["rev-parse", `${sha}^1`]).trim();
  } catch {
    // A root commit cannot be timestamp-only because every path is newly introduced.
  }
  const timestampOnly =
    parent !== null &&
    files.length > 0 &&
    files.every((filePath) => {
      if (!/^\.agentplane\/tasks\/[^/]+\/README\.md$/u.test(filePath)) return false;
      const before = readCommitPath(repoRoot, parent, filePath);
      const after = readCommitPath(repoRoot, sha, filePath);
      return (
        before !== null &&
        after !== null &&
        before !== after &&
        withoutTaskProjectionTimestamps(before) === withoutTaskProjectionTimestamps(after)
      );
    });
  const empty = files.length === 0;
  return {
    sha,
    paths: files,
    service_only:
      files.length > 0 && files.every((filePath) => filePath.startsWith(".agentplane/")),
    empty,
    timestamp_only: timestampOnly,
    meaningful: !empty && !timestampOnly,
  };
}

function observedCounter(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${label} must be an observed non-negative integer.`);
  }
  return value;
}

/**
 * Measure the committed marginal repository cost for one newly introduced task.
 * Checkout path bytes and unique stored blob bytes are intentionally separate.
 */
export function measureTaskMarginalCost({
  repoRoot,
  beforeRevision,
  afterRevision = "HEAD",
  taskId,
  observed = {},
}) {
  if (typeof taskId !== "string" || !/^[A-Za-z0-9][A-Za-z0-9_-]*$/u.test(taskId)) {
    throw new Error("taskId must be one path-safe task identifier.");
  }
  const before = resolveCommit(repoRoot, beforeRevision, "beforeRevision");
  const after = resolveCommit(repoRoot, afterRevision, "afterRevision");
  try {
    gitText(repoRoot, ["merge-base", "--is-ancestor", before, after]);
  } catch {
    throw new Error("beforeRevision must be an ancestor of afterRevision.");
  }

  const beforeEntries = treeBlobEntries(repoRoot, before);
  const afterEntries = treeBlobEntries(repoRoot, after);
  const taskPrefix = `.agentplane/tasks/${taskId}/`;
  if (beforeEntries.some((entry) => entry.path.startsWith(taskPrefix))) {
    throw new Error("Marginal task measurement requires a task absent from the before revision.");
  }
  const taskEntries = afterEntries.filter((entry) => entry.path.startsWith(taskPrefix));
  if (taskEntries.length === 0) {
    throw new Error("Marginal task measurement requires task artifacts in the after revision.");
  }

  const beforeObjects = new Set(beforeEntries.map((entry) => entry.object));
  const taskObjects = new Map();
  for (const entry of taskEntries) {
    const current = taskObjects.get(entry.object) ?? { bytes: entry.bytes, paths: [] };
    current.paths.push(entry.path);
    taskObjects.set(entry.object, current);
  }
  const newObjects = [...taskObjects.entries()].filter(([object]) => !beforeObjects.has(object));
  const reusedObjects = [...taskObjects.entries()].filter(([object]) => beforeObjects.has(object));
  const commits = gitText(repoRoot, ["rev-list", "--reverse", `${before}..${after}`])
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((sha) => classifyMarginalCommit(repoRoot, sha));
  const taskPathBytes = taskEntries.reduce((sum, entry) => sum + entry.bytes, 0);
  const uniqueTaskBlobBytes = [...taskObjects.values()].reduce(
    (sum, entry) => sum + entry.bytes,
    0,
  );
  const duplicatePaths = [...taskObjects.values()].reduce(
    (sum, entry) => sum + Math.max(0, entry.paths.length - 1),
    0,
  );

  const measurement = {
    schema_version: 1,
    kind: "agentplane.task_marginal_cost",
    source: { before_commit: before, after_commit: after, task_id: taskId },
    task_paths: {
      count: taskEntries.length,
      bytes: taskPathBytes,
      duplicate_paths: duplicatePaths,
      duplicate_bytes: taskPathBytes - uniqueTaskBlobBytes,
      paths: taskEntries.map(({ bytes, object, path: filePath }) => ({
        path: filePath,
        blob: object,
        bytes,
      })),
    },
    git_blobs: {
      referenced_unique_count: taskObjects.size,
      referenced_unique_bytes: uniqueTaskBlobBytes,
      new_unique_count: newObjects.length,
      new_unique_bytes: newObjects.reduce((sum, [, entry]) => sum + entry.bytes, 0),
      reused_unique_count: reusedObjects.length,
      reused_unique_bytes: reusedObjects.reduce((sum, [, entry]) => sum + entry.bytes, 0),
    },
    commits: {
      total: commits.length,
      service_only: commits.filter((commit) => commit.service_only).length,
      meaningful: commits.filter((commit) => commit.meaningful).length,
      empty: commits.filter((commit) => commit.empty).length,
      timestamp_only: commits.filter((commit) => commit.timestamp_only).length,
      entries: commits,
    },
    operations: {
      filesystem_writes: observedCounter(observed.filesystem_writes ?? 0, "filesystem_writes"),
      tool_calls: observedCounter(observed.tool_calls ?? 0, "tool_calls"),
      control_plane_calls: observedCounter(
        observed.control_plane_calls ?? 0,
        "control_plane_calls",
      ),
    },
  };
  return { ...measurement, digest: digest(stableJson(measurement)) };
}

// Git objects bind this sample to an immutable tree. Working files and runtime journals
// can change concurrently and are deliberately not substituted for committed evidence.
export function measureRepositoryEfficiency({
  repoRoot,
  revision = "HEAD",
  sampleSize = 150,
  commitLimit = 200,
}) {
  for (const value of [sampleSize, commitLimit]) {
    if (!Number.isSafeInteger(value) || value <= 0)
      throw new Error("Sample limits must be positive integers.");
  }
  const git = (args) =>
    execFileSync("git", args, {
      cwd: repoRoot,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
    });
  const source = git(["rev-parse", "--verify", `${revision}^{commit}`]).trim();
  const tree = git(["ls-tree", "-rlz", source]);
  const entries = tree
    .split("\0")
    .filter(Boolean)
    .flatMap((row) => {
      const match = /^(\d+) (\w+) ([a-f0-9]+)\s+(\d+|-)\t([\s\S]+)$/u.exec(row);
      return match?.[2] === "blob"
        ? [{ object: match[3], bytes: Number(match[4]), path: match[5] }]
        : [];
    });
  const taskEntries = entries.filter((entry) => entry.path.startsWith(".agentplane/tasks/"));
  const readmes = taskEntries
    .filter((entry) => /^\.agentplane\/tasks\/[^/]+\/README\.md$/u.test(entry.path))
    .toSorted((a, b) => b.path.localeCompare(a.path))
    .slice(0, sampleSize);
  const commitIds = git(["rev-list", "--no-merges", `--max-count=${commitLimit}`, source])
    .trim()
    .split("\n")
    .filter(Boolean);
  const commits = commitIds.map((sha) => {
    const files = git(["diff-tree", "--root", "--no-commit-id", "--name-only", "-r", "-z", sha])
      .split("\0")
      .filter(Boolean);
    return {
      sha,
      service_only: files.length > 0 && files.every((file) => file.startsWith(".agentplane/")),
      task_ids: [
        ...new Set(
          files.flatMap((file) => /^\.agentplane\/tasks\/([^/]+)\//u.exec(file)?.[1] ?? []),
        ),
      ].toSorted(),
    };
  });
  const objects = new Map();
  for (const entry of taskEntries) {
    const existing = objects.get(entry.object) ?? { bytes: entry.bytes, count: 0 };
    existing.count += 1;
    objects.set(entry.object, existing);
  }
  const tasks = readmes.map((entry) => {
    const markdown = git(["cat-file", "blob", entry.object]);
    const match = /^---\r?\n([\s\S]*?)\r?\n---/u.exec(markdown);
    if (!match) throw new Error(`Missing frontmatter: ${entry.path}`);
    const task = parseYaml(match[1]);
    const artifacts = taskEntries.filter((artifact) =>
      artifact.path.startsWith(entry.path.slice(0, -"README.md".length)),
    );
    const usage = task.token_usage ?? null;
    return {
      task_id: task.id,
      readme_path: entry.path,
      readme_object: entry.object,
      readme_bytes: entry.bytes,
      frontmatter_bytes: Buffer.byteLength(match[0], "utf8"),
      usage,
      usage_source: usage === null ? "not_recorded" : "committed_task_projection",
      episodes: null,
      no_progress_semantic_repeats: null,
      prepared_context_bytes: null,
      delivered_context_bytes: null,
      model_read_context_bytes: null,
      work_items: null,
      roles: null,
      artifact_count: artifacts.length,
      artifact_bytes: artifacts.reduce((sum, artifact) => sum + artifact.bytes, 0),
      service_commits_in_window: commits.filter(
        (commit) => commit.service_only && commit.task_ids.includes(task.id),
      ).length,
    };
  });
  const observed = tasks.filter((task) => task.usage !== null);
  const sumUsage = (field) => {
    const values = observed
      .map((task) => task.usage[field])
      .filter((value) => typeof value === "number");
    return {
      value: values.length === 0 ? null : values.reduce((sum, value) => sum + value, 0),
      tasks_observed: values.length,
    };
  };
  const measurement = {
    schema_version: 1,
    kind: "agent_efficiency_repository_snapshot",
    source: {
      commit: source,
      tree: git(["rev-parse", `${source}^{tree}`]).trim(),
      tree_listing_digest: digest(tree),
    },
    runtime: {
      node: process.version,
      platform: process.platform,
      arch: process.arch,
      measurement_code_digest: digest(readFileSync(new URL(import.meta.url))),
      cli_package_object: git(["rev-parse", `${source}:packages/agentplane/package.json`]).trim(),
    },
    method: {
      task_selection: `Newest ${sampleSize} task IDs in committed tree, descending lexicographic path order`,
      commit_selection: `Last ${commitLimit} non-merge commits reachable from source`,
      service_commit_definition:
        "All changed paths are under .agentplane; classification does not imply a removable checkpoint",
      artifact_selection:
        "All committed blobs under .agentplane/tasks; bytes are uncompressed Git blob sizes",
      duplicate_definition:
        "Identical Git blob object IDs across task artifact paths; no content migration",
      exclusions: [
        "working tree changes",
        "untracked artifacts",
        "submodule contents",
        "merge commits",
        "private operational journals",
        "paid provider capture",
      ],
      limitations: [
        "Usage is the committed supervisor projection, not a new provider capture",
        "Prepared, delivered and model-read context are distinct and unavailable in historical projections",
        "Historical WorkItem, role, episode and semantic-repeat attribution is unavailable",
        "Service commit counts per task overlap for commits touching multiple tasks",
        "Token totals sum observed fields only; coverage is reported separately",
      ],
    },
    totals: {
      sampled_tasks: tasks.length,
      tasks_with_usage: observed.length,
      usage_states: Object.fromEntries(
        ["observed", "partial", "unavailable", "not_recorded"].map((state) => [
          state,
          tasks.filter((task) => (task.usage?.state ?? "not_recorded") === state).length,
        ]),
      ),
      input_tokens: sumUsage("input_tokens"),
      output_tokens: sumUsage("output_tokens"),
      cached_input_tokens: sumUsage("cached_input_tokens"),
      reasoning_tokens: sumUsage("reasoning_tokens"),
      agent_runs: sumUsage("agent_runs"),
      observed_agent_runs: sumUsage("observed_agent_runs"),
      service_commits: commits.filter((commit) => commit.service_only).length,
      sampled_commits: commits.length,
      artifact_count: taskEntries.length,
      artifact_bytes: taskEntries.reduce((sum, entry) => sum + entry.bytes, 0),
      duplicate_paths: [...objects.values()].reduce((sum, entry) => sum + entry.count - 1, 0),
      duplicate_bytes: [...objects.values()].reduce(
        (sum, entry) => sum + (entry.count - 1) * entry.bytes,
        0,
      ),
    },
    commits,
    tasks,
  };
  return { ...measurement, digest: digest(stableJson(measurement)) };
}
