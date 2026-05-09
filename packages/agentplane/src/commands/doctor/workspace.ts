import fs from "node:fs/promises";
import path from "node:path";

import { renderDiagnosticFinding } from "../shared/diagnostics.js";
import { resolvePolicyGatewayForRepo } from "../../shared/policy-gateway.js";
import type { CommandContext } from "../shared/task-backend.js";
import { resolveAgentplaneAssetPath } from "../../shared/package-paths.js";
import { checkManagedHookShimReadiness } from "./hook-readiness.js";
import {
  checkDoneTaskReadmeArchiveDrift,
  checkTaskProjectionDrift,
  checkTaskReadmeMigrationState,
} from "./workspace-task-state.js";

export {
  buildTaskReadmeMigrationFindings,
  checkTaskReadmeMigrationState,
} from "./workspace-task-state.js";

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
  const manifestPath = resolveAgentplaneAssetPath("framework.manifest.json");
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

async function checkBackendReadiness(ctx?: CommandContext): Promise<string[]> {
  if (ctx?.backendId === "cloud") {
    return await checkCloudBackendReadiness(ctx);
  }
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

async function checkCloudBackendReadiness(ctx: CommandContext): Promise<string[]> {
  if (!ctx.taskBackend.inspectConfiguration) return [];

  let result: Awaited<ReturnType<NonNullable<typeof ctx.taskBackend.inspectConfiguration>>>;
  try {
    result = await ctx.taskBackend.inspectConfiguration();
  } catch {
    return [];
  }

  const findings: string[] = [];
  for (const override of result.connection?.envOverrides ?? []) {
    if (override.key !== "AGENTPLANE_CLOUD_PROJECT_ID") continue;
    findings.push(
      renderDiagnosticFinding({
        severity: "WARN",
        state: "cloud backend project id is overridden by local environment",
        likelyCause:
          "AGENTPLANE_CLOUD_PROJECT_ID in the environment or .env shadows backend.json, so task projection freshness is checked against the effective project id",
        nextAction: {
          command: "agentplane backend inspect cloud --yes",
          reason: "confirm the configured and effective project ids before mutating task state",
        },
        details: [
          `Configured project: ${override.configured ?? "unset"}`,
          `Effective project: ${override.effective}`,
          `Backend config: ${ctx.backendConfigPath}`,
        ],
      }),
    );
  }

  const syncState = result.connection?.syncState ?? null;
  if (syncState?.degraded === true) {
    findings.push(
      renderDiagnosticFinding({
        severity: "WARN",
        state: "cloud backend sync state is degraded",
        likelyCause:
          "the cloud service reports degraded sync workers or rate limiting, so local projection freshness can expire and block task lifecycle mutations",
        nextAction: {
          command: "agentplane backend sync cloud --direction pull --conflict=diff",
          reason: "refresh the projection and check for open conflicts before mutating tasks",
        },
        details: [
          `reason=${syncState.reason ?? "unknown"}`,
          `failed_jobs=${syncState.failedJobs ?? "unknown"}`,
          `open_conflicts=${syncState.openConflicts}`,
        ],
      }),
    );
  }
  return findings;
}

export async function checkWorkspace(
  repoRoot: string,
  opts?: { ctx?: CommandContext; deep?: boolean },
): Promise<string[]> {
  const problems: string[] = [];
  const requiredFiles = [path.join(repoRoot, ".agentplane", "WORKFLOW.md")];
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
    ...(await checkBackendReadiness(opts?.ctx)),
    ...(await checkManagedHookShimReadiness(repoRoot)),
    ...(await checkTaskReadmeMigrationState(repoRoot, opts?.ctx)),
    ...(await checkDoneTaskReadmeArchiveDrift(repoRoot, opts?.ctx)),
    ...(opts?.deep ? await checkTaskProjectionDrift(repoRoot, opts?.ctx) : []),
  );
  return problems;
}
