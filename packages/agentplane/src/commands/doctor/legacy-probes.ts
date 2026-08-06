import { execFile } from "node:child_process";
import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { gitRevParse } from "@agentplaneorg/core/git";
import { parseTaskReadme } from "@agentplaneorg/core/tasks";
import { parse as parseYaml } from "yaml";

import type {
  CompatibilityRetirementAdapter,
  CompatibilityRetirementManifest,
  LegacyUsageProbeKind,
} from "./legacy-manifest.js";

type LegacyUsageStatus = "used" | "unused" | "unknown" | "blocked";

type LegacyAdapterUsage = CompatibilityRetirementAdapter & {
  status: LegacyUsageStatus;
  evidence: string[];
};

export type LegacyDoctorReport = {
  schema_version: 1;
  kind: "agentplane.doctor.legacy";
  manifest_schema_version: 2;
  summary: Record<LegacyUsageStatus | "total", number>;
  retirement_summary: Record<CompatibilityRetirementAdapter["retirement_policy"]["kind"], number>;
  adapters: LegacyAdapterUsage[];
};

type ProbeResult = Pick<LegacyAdapterUsage, "status" | "evidence">;

const EVIDENCE_LIMIT = 5;
const execFileAsync = promisify(execFile);

function errnoCode(error: unknown): string {
  return typeof error === "object" && error !== null && "code" in error
    ? String((error as NodeJS.ErrnoException).code)
    : "UNKNOWN";
}

function blocked(label: string, error: unknown): ProbeResult {
  return {
    status: "blocked",
    evidence: [
      `${label}: ${errnoCode(error)} ${error instanceof Error ? error.message : String(error)}`,
    ],
  };
}

async function pathKind(
  absolutePath: string,
): Promise<"absent" | "file" | "directory" | "blocked"> {
  try {
    const entry = await lstat(absolutePath);
    if (entry.isSymbolicLink()) return "blocked";
    if (entry.isFile()) return "file";
    if (entry.isDirectory()) return "directory";
    return "blocked";
  } catch (error) {
    if (errnoCode(error) === "ENOENT") return "absent";
    throw error;
  }
}

async function sortedDirectoryNames(absolutePath: string): Promise<string[]> {
  const entries = await readdir(absolutePath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && !entry.isSymbolicLink())
    .map((entry) => entry.name)
    .toSorted();
}

async function readRegularText(absolutePath: string): Promise<string> {
  if ((await pathKind(absolutePath)) !== "file") {
    throw new Error(`refusing non-regular file ${absolutePath}`);
  }
  return await readFile(absolutePath, "utf8");
}

async function commonGitDir(repoRoot: string): Promise<string> {
  const raw = await gitRevParse(repoRoot, ["--git-common-dir"]);
  return path.resolve(repoRoot, raw);
}

function frontMatter(text: string): Record<string, unknown> {
  const normalized = text.replaceAll("\r\n", "\n");
  if (!normalized.startsWith("---\n")) throw new Error("missing YAML front matter");
  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) throw new Error("unterminated YAML front matter");
  const parsed = parseYaml(normalized.slice(4, end)) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new Error("YAML front matter is not an object");
  }
  return parsed as Record<string, unknown>;
}

async function probeLegacyConfig(repoRoot: string): Promise<ProbeResult> {
  const relative = ".agentplane/config.json";
  try {
    const kind = await pathKind(path.join(repoRoot, relative));
    if (kind === "absent") return { status: "unused", evidence: [`absent:${relative}`] };
    if (kind !== "file") return { status: "blocked", evidence: [`unsafe_path:${relative}`] };
    return { status: "used", evidence: [`present:${relative}`] };
  } catch (error) {
    return blocked(relative, error);
  }
}

async function probeWorkflowV1(repoRoot: string): Promise<ProbeResult> {
  const relative = ".agentplane/WORKFLOW.md";
  try {
    const absolute = path.join(repoRoot, relative);
    if ((await pathKind(absolute)) === "absent") {
      return { status: "unknown", evidence: [`absent:${relative}`] };
    }
    const version = frontMatter(await readRegularText(absolute)).version;
    if (version === 1) return { status: "used", evidence: [`${relative}:version=1`] };
    if (version === 2) return { status: "unused", evidence: [`${relative}:version=2`] };
    return { status: "blocked", evidence: [`${relative}:unsupported_version=${String(version)}`] };
  } catch (error) {
    return blocked(relative, error);
  }
}

async function probeTaskReadmes(repoRoot: string): Promise<ProbeResult> {
  const tasksRoot = path.join(repoRoot, ".agentplane", "tasks");
  try {
    const kind = await pathKind(tasksRoot);
    if (kind === "absent") return { status: "unused", evidence: ["tasks_directory_absent"] };
    if (kind !== "directory") return { status: "blocked", evidence: ["tasks_directory_unsafe"] };
    const legacy: string[] = [];
    let scanned = 0;
    for (const taskId of await sortedDirectoryNames(tasksRoot)) {
      const readmePath = path.join(tasksRoot, taskId, "README.md");
      if ((await pathKind(readmePath)) === "absent") continue;
      const parsed = parseTaskReadme(await readRegularText(readmePath));
      scanned += 1;
      if (parsed.frontmatter.doc_version !== 3 && legacy.length < EVIDENCE_LIMIT) {
        legacy.push(taskId);
      }
    }
    return legacy.length > 0
      ? { status: "used", evidence: [`legacy_tasks:${legacy.join(",")}`, `scanned:${scanned}`] }
      : { status: "unused", evidence: [`legacy_tasks:0`, `scanned:${scanned}`] };
  } catch (error) {
    return blocked("task_readme_scan", error);
  }
}

async function probeTaskLocalRunnerStorage(repoRoot: string): Promise<ProbeResult> {
  const tasksRoot = path.join(repoRoot, ".agentplane", "tasks");
  try {
    if ((await pathKind(tasksRoot)) === "absent") {
      return { status: "unused", evidence: ["task_local_runs:0"] };
    }
    const examples: string[] = [];
    let count = 0;
    for (const taskId of await sortedDirectoryNames(tasksRoot)) {
      const runsRoot = path.join(tasksRoot, taskId, "runs");
      const kind = await pathKind(runsRoot);
      if (kind === "blocked" || kind === "file") {
        return { status: "blocked", evidence: [`unsafe_path:.agentplane/tasks/${taskId}/runs`] };
      }
      if (kind !== "directory") continue;
      const runs = await sortedDirectoryNames(runsRoot);
      count += runs.length;
      for (const runId of runs) {
        if (examples.length < EVIDENCE_LIMIT) examples.push(`${taskId}/${runId}`);
      }
    }
    return count > 0
      ? { status: "used", evidence: [`task_local_runs:${count}`, `examples:${examples.join(",")}`] }
      : { status: "unused", evidence: ["task_local_runs:0"] };
  } catch (error) {
    return blocked("task_local_runner_scan", error);
  }
}

async function probeSupervisorEpisodeV0(repoRoot: string): Promise<ProbeResult> {
  try {
    const episodesRoot = path.join(
      await commonGitDir(repoRoot),
      "agentplane",
      "supervisor",
      "episodes",
    );
    if ((await pathKind(episodesRoot)) === "absent") {
      return { status: "unused", evidence: ["legacy_episode_v0:0"] };
    }
    const examples: string[] = [];
    let scanned = 0;
    for (const taskId of await sortedDirectoryNames(episodesRoot)) {
      const journalPath = path.join(episodesRoot, taskId, "journal.json");
      if ((await pathKind(journalPath)) === "absent") continue;
      const journal = JSON.parse(await readRegularText(journalPath)) as {
        schema_version?: unknown;
      };
      scanned += 1;
      if (journal.schema_version === 0 && examples.length < EVIDENCE_LIMIT) examples.push(taskId);
    }
    return examples.length > 0
      ? {
          status: "used",
          evidence: [`legacy_episode_v0:${examples.join(",")}`, `scanned:${scanned}`],
        }
      : { status: "unused", evidence: ["legacy_episode_v0:0", `scanned:${scanned}`] };
  } catch (error) {
    return blocked("supervisor_episode_scan", error);
  }
}

async function collectResultFiles(runsRoot: string): Promise<string[]> {
  if ((await pathKind(runsRoot)) !== "directory") return [];
  const files: string[] = [];
  for (const runId of await sortedDirectoryNames(runsRoot)) {
    const resultPath = path.join(runsRoot, runId, "result.json");
    if ((await pathKind(resultPath)) === "file") files.push(resultPath);
  }
  return files;
}

async function probeRunnerResultManifestV1(repoRoot: string): Promise<ProbeResult> {
  try {
    const candidates: string[] = [];
    const taskRoot = path.join(repoRoot, ".agentplane", "tasks");
    if ((await pathKind(taskRoot)) === "directory") {
      for (const taskId of await sortedDirectoryNames(taskRoot)) {
        candidates.push(...(await collectResultFiles(path.join(taskRoot, taskId, "runs"))));
      }
    }
    const supervisorRoot = path.join(await commonGitDir(repoRoot), "agentplane", "runner", "tasks");
    if ((await pathKind(supervisorRoot)) === "directory") {
      for (const taskId of await sortedDirectoryNames(supervisorRoot)) {
        candidates.push(...(await collectResultFiles(path.join(supervisorRoot, taskId, "runs"))));
      }
    }
    const legacy: string[] = [];
    for (const resultPath of candidates.toSorted()) {
      const result = JSON.parse(await readRegularText(resultPath)) as { schema_version?: unknown };
      if (result.schema_version === 1 && legacy.length < EVIDENCE_LIMIT) {
        legacy.push(path.relative(repoRoot, resultPath).replaceAll(path.sep, "/"));
      }
    }
    return legacy.length > 0
      ? {
          status: "used",
          evidence: [`legacy_result_v1:${legacy.join(",")}`, `scanned:${candidates.length}`],
        }
      : { status: "unused", evidence: ["legacy_result_v1:0", `scanned:${candidates.length}`] };
  } catch (error) {
    return blocked("runner_result_manifest_scan", error);
  }
}

async function probeLegacyProtectedConflictQueue(repoRoot: string): Promise<ProbeResult> {
  const relative = ".agentplane/cache/integration-queue.json";
  try {
    const absolute = path.join(repoRoot, relative);
    if ((await pathKind(absolute)) === "absent") {
      return { status: "unused", evidence: ["legacy_conflict_adoptions:0"] };
    }
    const queue = JSON.parse(await readRegularText(absolute)) as { entries?: unknown };
    if (!Array.isArray(queue.entries)) {
      return { status: "blocked", evidence: [`${relative}:entries_not_array`] };
    }
    const taskIds = queue.entries
      .filter(
        (entry): entry is { task_id?: unknown; legacy_protected_conflict_adoption: unknown } =>
          typeof entry === "object" &&
          entry !== null &&
          "legacy_protected_conflict_adoption" in entry,
      )
      .map((entry) => (typeof entry.task_id === "string" ? entry.task_id : "unknown"))
      .toSorted();
    return taskIds.length > 0
      ? { status: "used", evidence: [`legacy_conflict_adoptions:${taskIds.join(",")}`] }
      : { status: "unused", evidence: ["legacy_conflict_adoptions:0"] };
  } catch (error) {
    return blocked(relative, error);
  }
}

async function probeLegacyContextWorkspace(repoRoot: string): Promise<ProbeResult> {
  try {
    const wikiRoot = path.join(repoRoot, "context", "wiki");
    const topology = path.join(
      repoRoot,
      ".agentplane",
      "context",
      "derived",
      "wiki",
      "topology.plan.json",
    );
    const wikiKind = await pathKind(wikiRoot);
    if (wikiKind === "absent") return { status: "unused", evidence: ["legacy_context_absent"] };
    if (wikiKind !== "directory") return { status: "blocked", evidence: ["context/wiki:unsafe"] };
    const topologyKind = await pathKind(topology);
    if (topologyKind === "absent") {
      return {
        status: "used",
        evidence: ["context/wiki:present", "maximum_assimilation_v2:absent"],
      };
    }
    if (topologyKind !== "file") {
      return { status: "blocked", evidence: ["topology.plan.json:unsafe"] };
    }
    return { status: "unused", evidence: ["maximum_assimilation_v2:present"] };
  } catch (error) {
    return blocked("context_workspace_scan", error);
  }
}

async function probeGitReplacementRefs(repoRoot: string): Promise<ProbeResult> {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["for-each-ref", "--format=%(refname)", "refs/replace"],
      { cwd: repoRoot },
    );
    const refs = stdout
      .split("\n")
      .map((value) => value.trim())
      .filter(Boolean)
      .toSorted();
    return refs.length > 0
      ? { status: "used", evidence: [`replacement_refs:${refs.join(",")}`] }
      : { status: "unused", evidence: ["replacement_refs:0"] };
  } catch (error) {
    return blocked("git_replacement_refs", error);
  }
}

async function runProbe(kind: LegacyUsageProbeKind, repoRoot: string): Promise<ProbeResult> {
  switch (kind) {
    case "legacy_config_json": {
      return await probeLegacyConfig(repoRoot);
    }
    case "workflow_contract_v1": {
      return await probeWorkflowV1(repoRoot);
    }
    case "task_readme_pre_v3": {
      return await probeTaskReadmes(repoRoot);
    }
    case "task_local_runner_storage": {
      return await probeTaskLocalRunnerStorage(repoRoot);
    }
    case "supervisor_episode_v0": {
      return await probeSupervisorEpisodeV0(repoRoot);
    }
    case "runner_result_manifest_v1": {
      return await probeRunnerResultManifestV1(repoRoot);
    }
    case "legacy_protected_conflict_queue": {
      return await probeLegacyProtectedConflictQueue(repoRoot);
    }
    case "context_workspace_legacy": {
      return await probeLegacyContextWorkspace(repoRoot);
    }
    case "git_replacement_refs": {
      return await probeGitReplacementRefs(repoRoot);
    }
    case "runtime_input_unobservable": {
      return {
        status: "unknown",
        evidence: ["usage_is_not_persisted_in_workspace_state"],
      };
    }
  }
}

export async function inspectLegacyCompatibilityUsage(opts: {
  repoRoot: string;
  manifest: CompatibilityRetirementManifest;
}): Promise<LegacyDoctorReport> {
  const adapters: LegacyAdapterUsage[] = [];
  for (const adapter of opts.manifest.adapters) {
    adapters.push({ ...adapter, ...(await runProbe(adapter.usage_probe.kind, opts.repoRoot)) });
  }
  const summary: LegacyDoctorReport["summary"] = {
    total: adapters.length,
    used: 0,
    unused: 0,
    unknown: 0,
    blocked: 0,
  };
  for (const adapter of adapters) summary[adapter.status] += 1;
  const retirement_summary: LegacyDoctorReport["retirement_summary"] = {
    scheduled_removal: 0,
    support_window: 0,
    zero_usage_window: 0,
    archive_conversion: 0,
    permanent_historical_reader: 0,
  };
  for (const adapter of adapters) retirement_summary[adapter.retirement_policy.kind] += 1;
  return {
    schema_version: 1,
    kind: "agentplane.doctor.legacy",
    manifest_schema_version: opts.manifest.schema_version,
    summary,
    retirement_summary,
    adapters,
  };
}
