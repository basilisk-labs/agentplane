import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { stableJson } from "./agent-efficiency-baseline.mjs";

const requireFromCore = createRequire(new URL("../../packages/core/package.json", import.meta.url));
const { parse: parseYaml } = requireFromCore("yaml");
const digest = (value) => `sha256:${createHash("sha256").update(value).digest("hex")}`;

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
