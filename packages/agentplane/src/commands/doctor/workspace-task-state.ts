import fs from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";

import { GitContext } from "@agentplaneorg/core/git";
import {
  type taskKernel,
  normalizeTaskStatus,
  parseTaskReadme,
  renderTaskDocFromSections,
  taskCentricAggregateFromExtensions,
} from "@agentplaneorg/core/tasks";

import { LocalBackend, type TaskSummary } from "../../backends/task-backend.js";
import { renderDiagnosticFinding } from "../shared/diagnostics.js";
import { listTaskProjection, type CommandContext } from "../shared/task-backend.js";

import { LocalTaskByteStore } from "../../backends/task-backend/local-task-byte-store.js";
import { inspectLifecycleOwnerMigration } from "../task/migration-apply.js";
import {
  LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION,
  quarantineMarker,
} from "../task/migration-apply-conversion.js";
import { resolveLogicalRepositoryIdentity } from "../task/execution-authority-context.js";

export type TaskDocSnapshot = {
  id?: unknown;
  status?: unknown;
  doc_version?: unknown;
  revision?: unknown;
  plan_approval?: unknown;
  extensions?: Readonly<Record<string, unknown>>;
};

function taskDataToSnapshot(task: TaskSummary): TaskDocSnapshot {
  return {
    id: task.id,
    status: task.status,
    doc_version: task.doc_version,
    revision: task.revision,
    plan_approval: task.plan_approval,
    extensions: task.extensions,
  };
}

async function readTaskDocSnapshotsFromProjection(
  ctx?: CommandContext,
): Promise<TaskDocSnapshot[]> {
  if (!ctx) return [];
  try {
    const tasks = await listTaskProjection(ctx);
    if (tasks === null) return [];
    return tasks.map((task) => taskDataToSnapshot(task));
  } catch {
    return [];
  }
}

async function readTaskDocSnapshotsFromReadmes(
  repoRoot: string,
  ctx?: CommandContext,
): Promise<TaskDocSnapshot[]> {
  const workflowDir = path.join(repoRoot, ctx?.config.paths.workflow_dir ?? ".agentplane/tasks");
  let entries: Dirent[];
  try {
    entries = await fs.readdir(workflowDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const tasks: TaskDocSnapshot[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    try {
      const text = await fs.readFile(path.join(workflowDir, entry.name, "README.md"), "utf8");
      const parsed = parseTaskReadme(text);
      tasks.push(parsed.frontmatter as TaskDocSnapshot);
    } catch {
      continue;
    }
  }
  return tasks;
}

function buildTaskReadmeMigrationFindings(tasks: TaskDocSnapshot[]): string[] {
  if (tasks.length === 0) return [];

  const legacy = tasks.filter((task) => task.doc_version !== 3);
  if (legacy.length === 0) return [];

  const legacyActive = legacy.filter((task) => {
    const status = normalizeTaskStatus(task.status);
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
    projectionTasks.length > 0
      ? projectionTasks
      : await readTaskDocSnapshotsFromReadmes(repoRoot, ctx);
  return buildTaskReadmeMigrationFindings(tasks);
}

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function buildTaskCentricProjectionIntegrityFindings(
  tasks: readonly TaskDocSnapshot[],
): string[] {
  const findings: string[] = [];
  for (const task of tasks) {
    const taskId = typeof task.id === "string" ? task.id : "unknown-task";
    const readmeRevision = Number.isInteger(task.revision) ? Number(task.revision) : null;
    if (Object.hasOwn(task.extensions ?? {}, LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION)) {
      const marker = quarantineMarker(
        task.extensions?.[LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION],
      );
      const valid =
        marker?.task_id === taskId &&
        marker.output_revision === task.revision &&
        normalizeTaskStatus(task.status) === "BLOCKED" &&
        !Object.hasOwn(task.extensions ?? {}, "task_kernel") &&
        !Object.hasOwn(task.extensions ?? {}, "agentplane.task_centric") &&
        !Object.hasOwn(task.extensions ?? {}, "agentplane.task_centric_runtime");
      findings.push(
        renderDiagnosticFinding({
          severity: valid ? "WARN" : "ERROR",
          state: `${valid ? "retained" : "invalid"} lifecycle migration quarantine for ${taskId}`,
          likelyCause: valid
            ? marker.reason
            : "the quarantine marker or blocked projection is invalid",
          details: valid
            ? [
                `Task: ${taskId}`,
                `Retained source: ${marker.source_digest}`,
                `Backup: ${marker.backup_location}`,
                "New work is prohibited. Retained blockers require evidence-specific recovery.",
              ]
            : [`Task: ${taskId}`],
          nextAction: {
            command: `agentplane task kernel-migrate ${taskId}`,
            reason: "inspect the retained source and native quarantine proof",
          },
        }),
      );
      if (valid) continue;
    }

    let aggregate;
    try {
      aggregate = taskCentricAggregateFromExtensions(task.extensions);
    } catch (error) {
      findings.push(
        renderDiagnosticFinding({
          severity: "ERROR",
          state: `task-centric projection is malformed for ${taskId}`,
          likelyCause: error instanceof Error ? error.message : String(error),
          details: [`Task: ${taskId}`],
        }),
      );
      continue;
    }
    if (!aggregate || readmeRevision === null) continue;
    const readmePlanStateValue = record(task.plan_approval)?.state;
    const readmePlanState =
      typeof readmePlanStateValue === "string" ? readmePlanStateValue : "pending";
    const aggregatePlanState = aggregate.current_plan?.approval.state ?? "missing";
    if (readmePlanState === "rejected" && aggregatePlanState !== "rejected") {
      findings.push(
        renderDiagnosticFinding({
          severity: "WARN",
          state: `task-centric plan projection mismatch for ${taskId}`,
          likelyCause:
            "the task README and canonical aggregate did not commit the same plan mutation",
          nextAction: {
            command:
              `agentplane task plan recover-rejection ${taskId} ` +
              `--expected-readme-revision ${readmeRevision} ` +
              `--expected-aggregate-revision ${aggregate.revision} ` +
              `--rejected-plan-digest ${aggregate.current_plan?.digest ?? "<sha256>"} ` +
              "--expected-state-fingerprint <sha256> --by USER --note <reason>",
            reason:
              "use the guarded receipt-backed recovery only after confirming the rejected README state",
          },
          details: [
            `Task: ${taskId}`,
            `README revision/state: ${readmeRevision}/${readmePlanState}`,
            `Aggregate revision/state: ${aggregate.revision}/${aggregatePlanState}`,
          ],
        }),
      );
      continue;
    }
    if (readmeRevision === aggregate.revision) continue;
    const completedArchive =
      normalizeTaskStatus(task.status) === "DONE" && aggregate.lifecycle === "COMPLETED";
    findings.push(
      renderDiagnosticFinding({
        severity: completedArchive ? "WARN" : "ERROR",
        state: completedArchive
          ? `archived task-centric revision split for ${taskId}`
          : `task-centric revision split blocks ${taskId}`,
        likelyCause: completedArchive
          ? "the completed task archive retains different README and aggregate revisions; its historical afterimage must be reviewed before reuse"
          : "the task README and embedded aggregate have different revisions; the correct afterimage is not established",
        nextAction: {
          command: `agentplane task show ${taskId}`,
          reason:
            "inspect retained plan, verification, implementation, and mutation receipts; use only an evidence-specific recovery",
        },
        details: [
          `Task: ${taskId}`,
          `README revision/state: ${readmeRevision}/${readmePlanState}`,
          `Aggregate revision/state: ${aggregate.revision}/${aggregatePlanState}`,
          completedArchive
            ? "This completed archive is diagnostic history; do not normalize its revisions without evidence."
            : "Ordinary transitions must not normalize this split or run start-ready.",
        ],
      }),
    );
  }
  return findings;
}

export async function checkTaskCentricProjectionIntegrityState(
  repoRoot: string,
  ctx?: CommandContext,
): Promise<string[]> {
  const projectionTasks = await readTaskDocSnapshotsFromProjection(ctx);
  const tasks =
    projectionTasks.length > 0
      ? projectionTasks
      : await readTaskDocSnapshotsFromReadmes(repoRoot, ctx);
  const findings = buildTaskCentricProjectionIntegrityFindings(tasks);
  const quarantined = tasks.filter((task) =>
    Object.hasOwn(task.extensions ?? {}, LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION),
  );
  if (quarantined.length === 0) return findings;
  const backendRoot = (ctx?.taskBackend as { root?: unknown } | undefined)?.root;
  const store = new LocalTaskByteStore({
    root:
      typeof backendRoot === "string"
        ? backendRoot
        : path.join(repoRoot, ctx?.config.paths.workflow_dir ?? ".agentplane/tasks"),
  });
  const historyRoot = ctx?.taskBackend instanceof LocalBackend ? ctx.taskBackend.historyRoot : null;
  const historyStore = historyRoot ? new LocalTaskByteStore({ root: historyRoot }) : null;
  const identity = await resolveLogicalRepositoryIdentity({ git_root: repoRoot, task: {} });
  for (const task of quarantined) {
    let verified = false;
    try {
      // Match current-first backend ownership. A bad local source must not fall back to history.
      const taskId = String(task.id);
      const selectedStore =
        historyStore && (await store.read(taskId)) === null ? historyStore : store;
      const inspected = await inspectLifecycleOwnerMigration({
        store: selectedStore,
        repository_identity: identity as taskKernel.Sha256Digest,
        task_id: taskId,
      });
      verified = inspected.kind === "ready" && inspected.quarantine !== null;
      if (selectedStore === historyStore && (await store.read(taskId)) !== null) verified = false;
    } catch {
      /* A missing or changed backup cannot be accepted as retained evidence. */
    }
    if (!verified)
      findings.push(
        renderDiagnosticFinding({
          severity: "ERROR",
          state: `lifecycle migration quarantine source proof failed for ${String(task.id)}`,
          likelyCause:
            "the retained source, exact afterimage, repository identity or backup does not match",
          details: [
            `Task: ${String(task.id)}`,
            "Execution remains prohibited. Restore valid evidence before any transition.",
          ],
        }),
      );
  }
  return findings;
}

async function readUntrackedPaths(repoRoot: string, ctx?: CommandContext): Promise<Set<string>> {
  try {
    const git = ctx?.git ?? new GitContext({ gitRoot: repoRoot });
    return new Set(await git.statusUntrackedPaths());
  } catch {
    return new Set();
  }
}

export async function checkDoneTaskReadmeArchiveDrift(
  repoRoot: string,
  ctx?: CommandContext,
): Promise<string[]> {
  const projectionTasks = await readTaskDocSnapshotsFromProjection(ctx);
  const tasks =
    projectionTasks.length > 0
      ? projectionTasks
      : await readTaskDocSnapshotsFromReadmes(repoRoot, ctx);
  if (tasks.length === 0) return [];

  const workflowDir = (ctx?.config.paths.workflow_dir ?? ".agentplane/tasks").replaceAll("\\", "/");
  const untracked = await readUntrackedPaths(repoRoot, ctx);
  if (untracked.size === 0) return [];

  const affected = tasks
    .filter((task) => {
      const status = normalizeTaskStatus(task.status);
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

export async function checkTaskProjectionDrift(
  repoRoot: string,
  ctx?: CommandContext,
): Promise<string[]> {
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
    const status = normalizeTaskStatus(parsed.frontmatter.status);
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
