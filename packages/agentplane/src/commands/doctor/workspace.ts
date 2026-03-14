import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { parseTaskReadme, renderTaskDocFromSections } from "@agentplaneorg/core";

import type { TaskData } from "../../backends/task-backend.js";
import { renderDiagnosticFinding } from "../../shared/diagnostics.js";
import { resolvePolicyGatewayForRepo } from "../../shared/policy-gateway.js";
import { GitContext } from "../shared/git-context.js";
import { listTaskProjection, type CommandContext } from "../shared/task-backend.js";

type TaskDocSnapshot = {
  id?: unknown;
  status?: unknown;
  doc_version?: unknown;
};

async function pathExists(absPath: string): Promise<boolean> {
  try {
    await fs.access(absPath);
    return true;
  } catch {
    return false;
  }
}

async function isDirectory(absPath: string): Promise<boolean> {
  try {
    const st = await fs.stat(absPath);
    return st.isDirectory();
  } catch {
    return false;
  }
}

async function listMissingManagedPolicyFiles(repoRoot: string): Promise<string[]> {
  const manifestPath = fileURLToPath(
    new URL("../../../assets/framework.manifest.json", import.meta.url),
  );
  let parsed: { files?: { path?: unknown; required?: unknown }[] } = {};
  try {
    parsed = JSON.parse(await fs.readFile(manifestPath, "utf8")) as {
      files?: { path?: unknown; required?: unknown }[];
    };
  } catch {
    return [];
  }
  const relPaths = Array.isArray(parsed.files)
    ? parsed.files
        .filter((entry) => entry?.required === true && typeof entry.path === "string")
        .map((entry) => String(entry.path).replaceAll("\\", "/").trim())
        .filter((relPath) => relPath.startsWith(".agentplane/policy/"))
    : [];
  const missing: string[] = [];
  for (const relPath of relPaths) {
    if (!(await pathExists(path.join(repoRoot, relPath)))) {
      missing.push(relPath);
    }
  }
  return missing.toSorted();
}

function taskDataToSnapshot(task: TaskData): TaskDocSnapshot {
  return {
    id: task.id,
    status: task.status,
    doc_version: task.doc_version,
  };
}

async function readTaskDocSnapshotsFromTasksJson(repoRoot: string): Promise<TaskDocSnapshot[]> {
  const tasksPath = path.join(repoRoot, ".agentplane", "tasks.json");
  let raw = "";
  try {
    raw = await fs.readFile(tasksPath, "utf8");
  } catch {
    return [];
  }

  let parsed: { tasks?: unknown };
  try {
    parsed = JSON.parse(raw) as { tasks?: unknown };
  } catch {
    return [];
  }

  return Array.isArray(parsed.tasks) ? (parsed.tasks as TaskDocSnapshot[]) : [];
}

async function readTaskDocSnapshotsFromProjection(
  ctx?: CommandContext,
): Promise<TaskDocSnapshot[] | null> {
  if (!ctx) return null;
  try {
    const tasks = await listTaskProjection(ctx);
    if (tasks === null) return null;
    return tasks.map((task) => taskDataToSnapshot(task));
  } catch {
    return null;
  }
}

export function buildTaskReadmeMigrationFindings(tasks: TaskDocSnapshot[]): string[] {
  if (tasks.length === 0) return [];

  const legacy = tasks.filter((task) => task.doc_version !== 3);
  if (legacy.length === 0) return [];

  const legacyActive = legacy.filter((task) => {
    const status = typeof task.status === "string" ? task.status.trim().toUpperCase() : "";
    return status !== "DONE";
  });
  const v3Count = tasks.length - legacy.length;
  const exampleIds = legacy
    .map((task) => (typeof task.id === "string" ? task.id : ""))
    .filter(Boolean)
    .slice(0, 5)
    .join(", ");
  const hasMixedVersions = v3Count > 0;

  if (legacyActive.length > 0) {
    return [
      renderDiagnosticFinding({
        severity: "WARN",
        state: hasMixedVersions
          ? "task README migration is incomplete (active v2/v3 mixed state)"
          : "task README format is still on legacy v2",
        likelyCause:
          "the workspace still contains active task READMEs that were never migrated to the README v3 contract",
        nextAction: {
          command: "agentplane task migrate-doc --all",
          reason: "upgrade all task READMEs to doc_version=3 before continuing active work",
        },
        details: [
          `Legacy tasks: ${legacy.length}; active legacy tasks: ${legacyActive.length}; README v3 tasks: ${v3Count}`,
          exampleIds ? `Examples: ${exampleIds}` : "Examples unavailable in tasks snapshot.",
        ],
      }),
    ];
  }

  return [
    renderDiagnosticFinding({
      severity: "INFO",
      state: hasMixedVersions
        ? "historical task archive still mixes README v2 and v3"
        : "historical task archive still uses README v2",
      likelyCause:
        "older DONE tasks were never backfilled to README v3 after the task-document contract changed",
      nextAction: {
        command: "agentplane task migrate-doc --all",
        reason: "normalize archived task READMEs to the README v3 contract when convenient",
      },
      details: [
        `Legacy tasks: ${legacy.length}; active legacy tasks: 0; README v3 tasks: ${v3Count}`,
        exampleIds ? `Examples: ${exampleIds}` : "Examples unavailable in tasks snapshot.",
      ],
    }),
  ];
}

export async function checkTaskReadmeMigrationState(
  repoRoot: string,
  ctx?: CommandContext,
): Promise<string[]> {
  const projectionTasks = await readTaskDocSnapshotsFromProjection(ctx);
  const tasks =
    projectionTasks && projectionTasks.length > 0
      ? projectionTasks
      : await readTaskDocSnapshotsFromTasksJson(repoRoot);
  return buildTaskReadmeMigrationFindings(tasks);
}

async function readUntrackedPaths(repoRoot: string, ctx?: CommandContext): Promise<Set<string>> {
  try {
    const git = ctx?.git ?? new GitContext({ gitRoot: repoRoot });
    return new Set(await git.statusUntrackedPaths());
  } catch {
    return new Set();
  }
}

async function checkDoneTaskReadmeArchiveDrift(
  repoRoot: string,
  ctx?: CommandContext,
): Promise<string[]> {
  const projectionTasks = await readTaskDocSnapshotsFromProjection(ctx);
  const tasks =
    projectionTasks && projectionTasks.length > 0
      ? projectionTasks
      : await readTaskDocSnapshotsFromTasksJson(repoRoot);
  if (tasks.length === 0) return [];

  const workflowDir = (ctx?.config.paths.workflow_dir ?? ".agentplane/tasks").replaceAll("\\", "/");
  const untracked = await readUntrackedPaths(repoRoot, ctx);
  if (untracked.size === 0) return [];

  const affected = tasks
    .filter((task) => {
      const status = typeof task.status === "string" ? task.status.trim().toUpperCase() : "";
      const taskId = typeof task.id === "string" ? task.id.trim() : "";
      if (status !== "DONE" || !taskId) return false;
      return untracked.has(`${workflowDir}/${taskId}/README.md`);
    })
    .map((task) => String(task.id))
    .toSorted();
  if (affected.length === 0) return [];

  const examples = affected.slice(0, 5).join(", ");
  const stagedCommand = `git add ${affected
    .map((taskId) => `${workflowDir}/${taskId}/README.md`)
    .join(" ")}`;
  return [
    renderDiagnosticFinding({
      severity: "WARN",
      state: "DONE task archive README files exist on disk but are missing from the git index",
      likelyCause:
        "task metadata reached DONE state, but the human-readable task README archive never landed in a tracked close commit",
      nextAction: {
        command: stagedCommand,
        reason: "stage the missing archived task README files and commit them before continuing",
      },
      details: [
        `Affected DONE tasks: ${affected.length}`,
        examples ? `Examples: ${examples}` : "Examples unavailable.",
      ],
    }),
  ];
}

function normalizeTaskBodyForComparison(text: string): string {
  return text.replaceAll("\r\n", "\n").trim();
}

function normalizeCanonicalSections(value: unknown): Record<string, string> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const sections: Record<string, string> = {};
  for (const [key, entry] of Object.entries(value)) {
    const title = key.trim();
    if (!title || typeof entry !== "string") continue;
    sections[title] = entry;
  }
  return Object.keys(sections).length > 0 ? sections : null;
}

async function checkTaskProjectionDrift(repoRoot: string, ctx?: CommandContext): Promise<string[]> {
  const workflowDir = path.join(repoRoot, ctx?.config.paths.workflow_dir ?? ".agentplane/tasks");
  let entries;
  try {
    entries = await fs.readdir(workflowDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const drifted: { id: string; status: string }[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const readmePath = path.join(workflowDir, entry.name, "README.md");
    let text = "";
    try {
      text = await fs.readFile(readmePath, "utf8");
    } catch {
      continue;
    }

    let parsed;
    try {
      parsed = parseTaskReadme(text);
    } catch {
      continue;
    }

    const sections = normalizeCanonicalSections(parsed.frontmatter.sections);
    if (!sections) continue;

    const renderedBody = renderTaskDocFromSections(sections);
    if (
      normalizeTaskBodyForComparison(parsed.body) === normalizeTaskBodyForComparison(renderedBody)
    ) {
      continue;
    }

    const taskId =
      typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim()
        ? parsed.frontmatter.id.trim()
        : entry.name;
    const status =
      typeof parsed.frontmatter.status === "string" && parsed.frontmatter.status.trim()
        ? parsed.frontmatter.status.trim().toUpperCase()
        : "UNKNOWN";
    drifted.push({ id: taskId, status });
  }

  if (drifted.length === 0) return [];

  const activeCount = drifted.filter((task) => task.status !== "DONE").length;
  const examples = drifted
    .slice(0, 5)
    .map((task) => `${task.id}[${task.status}]`)
    .join(", ");
  return [
    renderDiagnosticFinding({
      severity: "WARN",
      state: "task README projection drift detected",
      likelyCause: "canonical frontmatter.sections no longer match the rendered task body on disk",
      nextAction: {
        command: "agentplane task normalize",
        reason: "re-render task README bodies from canonical one-file task state",
      },
      details: [
        `Drifted task READMEs: ${drifted.length}; active drifted tasks: ${activeCount}`,
        examples ? `Examples: ${examples}` : "Examples unavailable.",
      ],
    }),
  ];
}

function checkBackendReadiness(ctx?: CommandContext): string[] {
  if (ctx?.backendId !== "redmine") return [];

  const { supports_task_revisions, supports_revision_guarded_writes } =
    ctx.taskBackend.capabilities;

  if (
    supports_task_revisions === supports_revision_guarded_writes &&
    supports_task_revisions === true
  ) {
    return [];
  }

  if (supports_task_revisions === false && supports_revision_guarded_writes === false) {
    return [
      renderDiagnosticFinding({
        severity: "WARN",
        state:
          "Redmine backend is running in partial compatibility mode without canonical_state support",
        likelyCause:
          "AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE is not configured, so Redmine cannot round-trip the full canonical task state or guard writes by remote revision",
        nextAction: {
          command: "agentplane backend inspect redmine --yes",
          reason:
            "inspect visible Redmine custom fields first, then wire AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE to the correct field id",
        },
        details: [
          `Backend config: ${ctx.backendConfigPath}`,
          "Current capability flags: supports_task_revisions=false; supports_revision_guarded_writes=false",
          "Legacy doc field syncing can still work, but the backend remains partial-compatibility only.",
        ],
      }),
    ];
  }

  return [
    renderDiagnosticFinding({
      severity: "WARN",
      state: "Redmine backend capability contract is internally inconsistent",
      likelyCause:
        "backend capability flags diverged, so doctor cannot rely on a single revision-guard readiness state",
      nextAction: {
        command: "inspect Redmine backend capability wiring and rerun agentplane doctor",
        reason: "restore a coherent readiness contract before relying on guarded remote writes",
      },
      details: [
        `Backend config: ${ctx.backendConfigPath}`,
        `Current capability flags: supports_task_revisions=${String(supports_task_revisions)}; supports_revision_guarded_writes=${String(supports_revision_guarded_writes)}`,
      ],
    }),
  ];
}

export async function checkWorkspace(
  repoRoot: string,
  opts?: { ctx?: CommandContext },
): Promise<string[]> {
  const problems: string[] = [];
  const requiredFiles = [path.join(repoRoot, ".agentplane", "config.json")];
  for (const filePath of requiredFiles) {
    if (!(await pathExists(filePath))) {
      problems.push(`Missing required file: ${path.relative(repoRoot, filePath)}`);
    }
  }
  const gateway = await resolvePolicyGatewayForRepo({
    gitRoot: repoRoot,
    fallbackFlavor: "codex",
  });
  if (!(await pathExists(gateway.absPath))) {
    problems.push("Missing required policy gateway file: AGENTS.md or CLAUDE.md");
  }
  if (await pathExists(gateway.absPath)) {
    const missingManagedPolicy = await listMissingManagedPolicyFiles(repoRoot);
    if (missingManagedPolicy.length > 0) {
      const listed = missingManagedPolicy.slice(0, 8).join(", ");
      const more =
        missingManagedPolicy.length > 8 ? ` (+${missingManagedPolicy.length - 8} more)` : "";
      problems.push(
        renderDiagnosticFinding({
          severity: "ERROR",
          state: "framework-managed policy tree is incomplete",
          likelyCause:
            "the active AGENTS.md/CLAUDE.md gateway expects required policy files that are not installed in this workspace",
          nextAction: {
            command: "agentplane upgrade --yes",
            reason: "reinstall the managed policy tree from the currently active framework bundle",
          },
          details: [
            `Missing required files: ${listed}${more}`,
            "If the installed CLI is older than the gateway, update or reinstall agentplane first and then rerun `agentplane upgrade --yes` (or `agentplane upgrade --remote --yes`).",
            "Recovery guide: docs/help/legacy-upgrade-recovery.mdx",
          ],
        }),
      );
    }
  }

  const agentsDir = path.join(repoRoot, ".agentplane", "agents");
  if (!(await isDirectory(agentsDir))) {
    problems.push("Missing required directory: .agentplane/agents");
    return problems;
  }

  const entries = await fs.readdir(agentsDir);
  const hasJson = entries.some((name) => name.endsWith(".json"));
  if (!hasJson) {
    problems.push("No agent profiles found in .agentplane/agents (*.json expected).");
  }
  problems.push(
    ...checkBackendReadiness(opts?.ctx),
    ...(await checkTaskReadmeMigrationState(repoRoot, opts?.ctx)),
    ...(await checkDoneTaskReadmeArchiveDrift(repoRoot, opts?.ctx)),
    ...(await checkTaskProjectionDrift(repoRoot, opts?.ctx)),
  );
  return problems;
}
