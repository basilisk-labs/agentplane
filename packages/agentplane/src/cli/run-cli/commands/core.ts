import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { loadConfig, resolveProject, type AgentplaneConfig } from "@agentplaneorg/core";

import { loadTaskBackend } from "../../../backends/task-backend.js";
import { GitContext } from "../../../commands/shared/git-context.js";
import { gitCurrentBranch } from "../../../commands/shared/git-ops.js";
import { fileExists } from "../../fs-utils.js";
import { CliError } from "../../../shared/errors.js";
import { dedupeStrings } from "../../../shared/strings.js";
import { usageError } from "../../spec/errors.js";
import type { CommandHandler, CommandSpec } from "../../spec/spec.js";
import { listRoles, renderQuickstart, renderRole } from "../../command-guide.js";
import type { RunDeps } from "../command-catalog.js";
import { toStringList } from "../../spec/parse-utils.js";
import { wrapCommand } from "./wrap-command.js";

type QuickstartParsed = { json: boolean };

export const quickstartSpec: CommandSpec<QuickstartParsed> = {
  id: ["quickstart"],
  group: "Core",
  summary: "Print CLI quickstart and command cheat sheet.",
  options: [
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit compact machine-readable output for agent runtimes.",
    },
  ],
  examples: [{ cmd: "agentplane quickstart", why: "Show quickstart." }],
  parse: (raw) => ({ json: raw.opts.json === true }),
};

async function cmdQuickstart(opts: {
  cwd: string;
  rootOverride?: string;
  json: boolean;
}): Promise<number> {
  return wrapCommand({ command: "quickstart", rootOverride: opts.rootOverride }, () => {
    const text = renderQuickstart();
    if (opts.json) {
      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      const payload = {
        source_of_truth: {
          workflow_policy: "AGENTS.md",
          cli_syntax: "quickstart/role output",
        },
        lines,
      };
      process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
      return 0;
    }
    process.stdout.write(`${text}\n`);
    return 0;
  });
}

export const runQuickstart: CommandHandler<QuickstartParsed> = (ctx, p) => {
  return cmdQuickstart({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, json: p.json });
};

type PreflightParsed = { json: boolean };

type NextAction = { command: string; reason: string };

type Probe = { ok: boolean; error?: string };

type PreflightReport = {
  project_detected: boolean;
  config_loaded: Probe;
  quickstart_loaded: Probe;
  task_list_loaded: Probe & { count?: number };
  working_tree_clean_tracked: Probe & { value?: boolean };
  current_branch: Probe & { value?: string };
  workflow_mode: "direct" | "branch_pr" | "unknown";
  approvals: {
    require_plan: boolean | "unknown";
    require_verify: boolean | "unknown";
    require_network: boolean | "unknown";
  };
  outside_repo_needed: false;
  next_actions: NextAction[];
};

function compactError(err: unknown): string {
  if (err instanceof Error) {
    const first = (err.message ?? "").split("\n", 1)[0] ?? "";
    return first.trim() || err.name;
  }
  return String(err);
}

function probeYesNo(probe: Probe): string {
  return probe.ok ? "yes" : "no";
}

function probeValueOrUnknown(probe: { ok: boolean; value?: string | boolean }): string {
  return probe.ok && probe.value !== undefined ? String(probe.value) : "unknown";
}

function inferWorkflowMode(config: AgentplaneConfig | null): "direct" | "branch_pr" | "unknown" {
  if (!config) return "unknown";
  return config.workflow_mode === "direct" || config.workflow_mode === "branch_pr"
    ? config.workflow_mode
    : "unknown";
}

function inferApprovals(config: AgentplaneConfig | null): PreflightReport["approvals"] {
  if (!config) {
    return {
      require_plan: "unknown",
      require_verify: "unknown",
      require_network: "unknown",
    };
  }
  const approvals = config.agents?.approvals;
  if (!approvals) {
    return {
      require_plan: "unknown",
      require_verify: "unknown",
      require_network: "unknown",
    };
  }
  return {
    require_plan: approvals.require_plan,
    require_verify: approvals.require_verify,
    require_network: approvals.require_network,
  };
}

async function buildPreflightReport(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<PreflightReport> {
  const nextActions: NextAction[] = [];
  const quickstartText = renderQuickstart();
  const quickstartLoaded: Probe = {
    ok: quickstartText.trim().length > 0,
    error:
      quickstartText.trim().length > 0 ? undefined : "quickstart renderer returned empty output",
  };

  let resolved: {
    gitRoot: string;
    agentplaneDir: string;
  } | null = null;
  try {
    resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  } catch (err) {
    nextActions.push({
      command: "agentplane init",
      reason: `project not resolved (${compactError(err)})`,
    });
  }

  let config: AgentplaneConfig | null = null;
  let configLoaded: Probe = { ok: false, error: "project not resolved" };
  if (resolved) {
    try {
      const loaded = await loadConfig(resolved.agentplaneDir);
      config = loaded.config;
      configLoaded = { ok: true };
    } catch (err) {
      const message = compactError(err);
      configLoaded = { ok: false, error: message };
      nextActions.push({
        command: "agentplane config show",
        reason: `config failed validation (${message})`,
      });
    }
  }

  let taskListLoaded: PreflightReport["task_list_loaded"] = {
    ok: false,
    error: "project not resolved",
  };
  if (resolved) {
    try {
      const loaded = await loadTaskBackend({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      const tasks = await loaded.backend.listTasks();
      taskListLoaded = { ok: true, count: tasks.length };
    } catch (err) {
      const message = compactError(err);
      taskListLoaded = { ok: false, error: message };
      nextActions.push({
        command: "agentplane task list",
        reason: `task backend unavailable (${message})`,
      });
    }
  }

  let workingTree: PreflightReport["working_tree_clean_tracked"] = {
    ok: false,
    error: "project not resolved",
  };
  let branch: PreflightReport["current_branch"] = {
    ok: false,
    error: "project not resolved",
  };
  if (resolved) {
    try {
      const git = new GitContext({ gitRoot: resolved.gitRoot });
      const [staged, unstagedTracked] = await Promise.all([
        git.statusStagedPaths(),
        git.statusUnstagedTrackedPaths(),
      ]);
      workingTree = { ok: true, value: staged.length === 0 && unstagedTracked.length === 0 };
      if (!workingTree.value) {
        nextActions.push({
          command: "git status --short --untracked-files=no",
          reason: "tracked changes detected",
        });
      }
    } catch (err) {
      const message = compactError(err);
      workingTree = { ok: false, error: message };
      nextActions.push({
        command: "git status --short --untracked-files=no",
        reason: `cannot inspect git status (${message})`,
      });
    }

    try {
      const current = await gitCurrentBranch(resolved.gitRoot);
      branch = { ok: true, value: current };
    } catch (err) {
      branch = { ok: false, error: compactError(err) };
    }
  }

  return {
    project_detected: resolved !== null,
    config_loaded: configLoaded,
    quickstart_loaded: quickstartLoaded,
    task_list_loaded: taskListLoaded,
    working_tree_clean_tracked: workingTree,
    current_branch: branch,
    workflow_mode: inferWorkflowMode(config),
    approvals: inferApprovals(config),
    outside_repo_needed: false,
    next_actions: nextActions,
  };
}

export const preflightSpec: CommandSpec<PreflightParsed> = {
  id: ["preflight"],
  group: "Core",
  summary: "Run aggregated preflight checks and print a deterministic readiness report.",
  options: [
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit machine-readable JSON report.",
    },
  ],
  examples: [
    { cmd: "agentplane preflight --json", why: "Produce one-shot agent-readable preflight." },
  ],
  parse: (raw) => ({ json: raw.opts.json === true }),
};

async function cmdPreflight(opts: {
  cwd: string;
  rootOverride?: string;
  json: boolean;
}): Promise<number> {
  return wrapCommand({ command: "preflight", rootOverride: opts.rootOverride }, async () => {
    const report = await buildPreflightReport({ cwd: opts.cwd, rootOverride: opts.rootOverride });
    if (opts.json) {
      process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
      return 0;
    }
    process.stdout.write("Preflight Summary\n");
    process.stdout.write(`- project detected: ${report.project_detected ? "yes" : "no"}\n`);
    process.stdout.write(`- config loaded: ${probeYesNo(report.config_loaded)}\n`);
    process.stdout.write(`- quickstart loaded: ${probeYesNo(report.quickstart_loaded)}\n`);
    process.stdout.write(`- task list loaded: ${probeYesNo(report.task_list_loaded)}\n`);
    process.stdout.write(
      `- working tree clean (tracked-only): ${probeValueOrUnknown(report.working_tree_clean_tracked)}\n`,
    );
    process.stdout.write(`- current git branch: ${probeValueOrUnknown(report.current_branch)}\n`);
    process.stdout.write(`- workflow_mode: ${report.workflow_mode}\n`);
    process.stdout.write("- approval gates:\n");
    process.stdout.write(`  - require_plan: ${String(report.approvals.require_plan)}\n`);
    process.stdout.write(`  - require_verify: ${String(report.approvals.require_verify)}\n`);
    process.stdout.write(`  - require_network: ${String(report.approvals.require_network)}\n`);
    process.stdout.write("- outside-repo: not needed\n");
    if (report.next_actions.length > 0) {
      process.stdout.write("Next actions:\n");
      for (const action of report.next_actions) {
        process.stdout.write(`- ${action.command}: ${action.reason}\n`);
      }
    }
    return 0;
  });
}

export const runPreflight: CommandHandler<PreflightParsed> = (ctx, p) => {
  return cmdPreflight({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, json: p.json });
};

type RoleParsed = { role: string; json: boolean };

export const roleSpec: CommandSpec<RoleParsed> = {
  id: ["role"],
  group: "Core",
  summary: "Show role-specific workflow guidance.",
  args: [{ name: "role", required: true, valueHint: "<role>" }],
  options: [
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit compact machine-readable role payload.",
    },
  ],
  examples: [{ cmd: "agentplane role ORCHESTRATOR", why: "Show ORCHESTRATOR guide." }],
  parse: (raw) => ({ role: String(raw.args.role ?? ""), json: raw.opts.json === true }),
};

type AgentProfile = {
  id?: string;
  role?: string;
  description?: string;
  inputs?: unknown;
  outputs?: unknown;
  permissions?: unknown;
  workflow?: unknown;
};

function parseAgentProfileJson(filePath: string, text: string): AgentProfile {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text) as unknown;
  } catch {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Invalid agent profile JSON: ${filePath} (malformed JSON)`,
    });
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Invalid agent profile JSON: ${filePath} (expected object)`,
    });
  }
  return parsed as AgentProfile;
}

function normalizeRoleId(roleRaw: string): string {
  return roleRaw.trim().toUpperCase();
}

async function listAgentProfileIds(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<{ agentplaneDir: string; ids: string[] } | null> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const agentsDir = path.join(resolved.agentplaneDir, "agents");
    if (!(await fileExists(agentsDir))) return null;
    const entriesRaw = await readdir(agentsDir);
    const entries = entriesRaw.filter((n) => n.endsWith(".json")).toSorted();
    const ids = entries.map((n) => n.replace(/\.json$/i, ""));
    return { agentplaneDir: resolved.agentplaneDir, ids };
  } catch {
    // Best-effort: role should not fail if we're not in an agentplane project.
    return null;
  }
}

async function readAgentProfile(opts: {
  cwd: string;
  rootOverride?: string;
  roleId: string;
}): Promise<{ agentplaneDir: string; filename: string; profile: AgentProfile } | null> {
  const listing = await listAgentProfileIds({ cwd: opts.cwd, rootOverride: opts.rootOverride });
  if (!listing) return null;

  const roleId = normalizeRoleId(opts.roleId);
  const candidates = [roleId, opts.roleId.trim()].filter(Boolean);
  const idsLower = new Map<string, string>();
  for (const id of listing.ids) idsLower.set(id.toLowerCase(), id);

  let foundId: string | null = null;
  for (const c of candidates) {
    const exact = listing.ids.find((id) => id === c);
    if (exact) {
      foundId = exact;
      break;
    }
    const ci = idsLower.get(c.toLowerCase());
    if (ci) {
      foundId = ci;
      break;
    }
  }
  if (!foundId) return null;

  const filename = `${foundId}.json`;
  const filePath = path.join(listing.agentplaneDir, "agents", filename);
  const raw = parseAgentProfileJson(filePath, await readFile(filePath, "utf8"));
  return { agentplaneDir: listing.agentplaneDir, filename, profile: raw };
}

function renderAgentProfileBlock(opts: {
  filename: string;
  roleId: string;
  profile: AgentProfile;
}): string {
  const id = (typeof opts.profile.id === "string" ? opts.profile.id : "").trim() || opts.roleId;
  const role = (typeof opts.profile.role === "string" ? opts.profile.role : "").trim();
  const description = (
    typeof opts.profile.description === "string" ? opts.profile.description : ""
  ).trim();

  const inputs = toStringList(opts.profile.inputs);
  const outputs = toStringList(opts.profile.outputs);
  const permissions = toStringList(opts.profile.permissions);
  const workflow = toStringList(opts.profile.workflow);

  const lines: string[] = [
    `### ${id}`,
    ...(role ? [`Role: ${role}`] : []),
    ...(description ? [`Description: ${description}`] : []),
    ...(inputs.length > 0 ? ["", "Inputs:", ...inputs.map((s) => `- ${s}`)] : []),
    ...(outputs.length > 0 ? ["", "Outputs:", ...outputs.map((s) => `- ${s}`)] : []),
    ...(permissions.length > 0 ? ["", "Permissions:", ...permissions.map((s) => `- ${s}`)] : []),
    ...(workflow.length > 0 ? ["", "Workflow:", ...workflow.map((s) => `- ${s}`)] : []),
    "",
    `Source: .agentplane/agents/${opts.filename} (lower priority; see AGENTS.md)`,
  ];
  return lines.join("\n").trimEnd();
}

async function cmdRole(opts: {
  cwd: string;
  rootOverride?: string;
  role: string;
  json: boolean;
}): Promise<number> {
  return wrapCommand({ command: "role", rootOverride: opts.rootOverride }, async () => {
    const roleRaw = opts.role.trim();
    if (!roleRaw) {
      throw usageError({
        spec: roleSpec,
        command: "role",
        message: "Missing required argument: role",
      });
    }

    const normalizedRole = normalizeRoleId(roleRaw);
    const guide = renderRole(normalizedRole);
    const agentProfile = await readAgentProfile({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      roleId: normalizedRole,
    });

    if (!guide && !agentProfile) {
      const builtin = listRoles();
      const agentIds = await listAgentProfileIds({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
      });
      const discovered = agentIds ? agentIds.ids : [];
      const availableList = dedupeStrings([...builtin, ...discovered]).toSorted();
      const available =
        availableList.length > 0 ? `\nAvailable roles: ${availableList.join(", ")}` : "";
      throw usageError({
        spec: roleSpec,
        command: "role",
        message: `Unknown role: ${roleRaw}.${available}`,
      });
    }

    if (guide) {
      if (opts.json) {
        const payload: Record<string, unknown> = {
          role: normalizedRole,
          builtin_guide: guide
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0),
        };
        if (agentProfile) {
          payload.agent_profile = {
            filename: agentProfile.filename,
            profile: agentProfile.profile,
          };
        }
        process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
        return 0;
      }
      process.stdout.write(`${guide}\n`);
      if (agentProfile) {
        const block = renderAgentProfileBlock({
          filename: agentProfile.filename,
          roleId: normalizedRole,
          profile: agentProfile.profile,
        });
        process.stdout.write(`\n## Agent profile\n\n${block}\n`);
      }
      return 0;
    }

    if (!agentProfile) {
      // Defensive: this should be unreachable due to the earlier guard.
      throw usageError({
        spec: roleSpec,
        command: "role",
        message: `Unknown role: ${roleRaw}.`,
      });
    }

    const block = renderAgentProfileBlock({
      filename: agentProfile.filename,
      roleId: normalizedRole,
      profile: agentProfile.profile,
    });
    if (opts.json) {
      process.stdout.write(
        `${JSON.stringify(
          {
            role: normalizedRole,
            agent_profile: {
              filename: agentProfile.filename,
              profile: agentProfile.profile,
            },
          },
          null,
          2,
        )}\n`,
      );
      return 0;
    }
    process.stdout.write(`${block}\n`);
    return 0;
  });
}

export const runRole: CommandHandler<RoleParsed> = (ctx, p) => {
  return cmdRole({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, role: p.role, json: p.json });
};

type AgentsParsed = Record<string, never>;

export const agentsSpec: CommandSpec<AgentsParsed> = {
  id: ["agents"],
  group: "Core",
  summary: "List agent definitions under .agentplane/agents.",
  examples: [{ cmd: "agentplane agents", why: "Print available agent ids and roles." }],
  parse: () => ({}),
};

export function makeRunAgentsHandler(deps: RunDeps): CommandHandler<AgentsParsed> {
  return async (ctx) =>
    wrapCommand({ command: "agents", rootOverride: ctx.rootOverride }, async () => {
      const resolved = await deps.getResolvedProject("agents");
      const agentsDir = path.join(resolved.agentplaneDir, "agents");
      if (!(await fileExists(agentsDir))) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Agents directory not found: ${agentsDir} (run \`agentplane init\`)`,
        });
      }
      const entriesRaw = await readdir(agentsDir);
      const entries = entriesRaw.filter((name) => name.endsWith(".json")).toSorted();
      if (entries.length === 0) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `No agent definitions found under ${agentsDir} (expected *.json)`,
        });
      }

      const rows: { canonicalId: string; role: string; filename: string; rawId: string }[] = [];
      const seen = new Set<string>();
      const duplicates: string[] = [];
      const mismatches: { filename: string; canonicalId: string; rawId: string }[] = [];
      for (const entry of entries) {
        const canonicalId = entry.replace(/\.json$/i, "");
        const filePath = path.join(agentsDir, entry);
        const raw = parseAgentProfileJson(filePath, await readFile(filePath, "utf8"));
        const rawId = typeof raw.id === "string" ? raw.id : "";
        const rawRole = typeof raw.role === "string" ? raw.role : "";
        const normalizedRawId = rawId.trim();
        const role = rawRole.trim() || "-";
        if (seen.has(canonicalId)) {
          duplicates.push(canonicalId);
        } else {
          seen.add(canonicalId);
        }
        if (normalizedRawId.length > 0 && normalizedRawId !== canonicalId) {
          mismatches.push({ filename: entry, canonicalId, rawId: normalizedRawId });
        }
        rows.push({ canonicalId, role, filename: entry, rawId: normalizedRawId });
      }

      const showRawIdColumn = mismatches.length > 0;
      const widthId = Math.max(...rows.map((row) => row.canonicalId.length), "ID".length);
      const widthFile = Math.max(...rows.map((row) => row.filename.length), "FILE".length);
      if (showRawIdColumn) {
        const widthRawId = Math.max(...rows.map((row) => row.rawId.length), "RAW_ID".length);
        process.stdout.write(
          `${"ID".padEnd(widthId)}  ${"FILE".padEnd(widthFile)}  ${"RAW_ID".padEnd(widthRawId)}  ROLE\n`,
        );
        process.stdout.write(
          `${"-".repeat(widthId)}  ${"-".repeat(widthFile)}  ${"-".repeat(widthRawId)}  ----\n`,
        );
        for (const row of rows) {
          process.stdout.write(
            `${row.canonicalId.padEnd(widthId)}  ${row.filename.padEnd(widthFile)}  ${row.rawId.padEnd(widthRawId)}  ${row.role}\n`,
          );
        }
      } else {
        process.stdout.write(`${"ID".padEnd(widthId)}  ${"FILE".padEnd(widthFile)}  ROLE\n`);
        process.stdout.write(`${"-".repeat(widthId)}  ${"-".repeat(widthFile)}  ----\n`);
        for (const row of rows) {
          process.stdout.write(
            `${row.canonicalId.padEnd(widthId)}  ${row.filename.padEnd(widthFile)}  ${row.role}\n`,
          );
        }
      }

      if (duplicates.length > 0) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Duplicate canonical agent ids: ${dedupeStrings(duplicates).toSorted().join(", ")}`,
        });
      }
      if (mismatches.length > 0) {
        const details = mismatches
          .map((m) => `${m.filename}: raw id "${m.rawId}" != canonical "${m.canonicalId}"`)
          .join("; ");
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Agent profile id mismatch: ${details}`,
        });
      }
      return 0;
    });
}
