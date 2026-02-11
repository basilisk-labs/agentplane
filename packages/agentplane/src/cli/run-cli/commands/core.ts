import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { resolveProject } from "@agentplaneorg/core";

import { fileExists } from "../../fs-utils.js";
import { CliError } from "../../../shared/errors.js";
import { dedupeStrings } from "../../../shared/strings.js";
import { usageError } from "../../spec/errors.js";
import type { CommandHandler, CommandSpec } from "../../spec/spec.js";
import { listRoles, renderQuickstart, renderRole } from "../../command-guide.js";
import type { RunDeps } from "../command-catalog.js";
import { toStringList } from "../../spec/parse-utils.js";
import { wrapCommand } from "./wrap-command.js";

type QuickstartParsed = Record<string, never>;

export const quickstartSpec: CommandSpec<QuickstartParsed> = {
  id: ["quickstart"],
  group: "Core",
  summary: "Print CLI quickstart and command cheat sheet.",
  options: [],
  examples: [{ cmd: "agentplane quickstart", why: "Show quickstart." }],
  parse: () => ({}),
};

async function cmdQuickstart(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  return wrapCommand({ command: "quickstart", rootOverride: opts.rootOverride }, () => {
    process.stdout.write(`${renderQuickstart()}\n`);
    return 0;
  });
}

export const runQuickstart: CommandHandler<QuickstartParsed> = (ctx) => {
  return cmdQuickstart({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });
};

type RoleParsed = { role: string };

export const roleSpec: CommandSpec<RoleParsed> = {
  id: ["role"],
  group: "Core",
  summary: "Show role-specific workflow guidance.",
  args: [{ name: "role", required: true, valueHint: "<role>" }],
  examples: [{ cmd: "agentplane role ORCHESTRATOR", why: "Show ORCHESTRATOR guide." }],
  parse: (raw) => ({ role: String(raw.args.role ?? "") }),
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
  const raw = JSON.parse(await readFile(filePath, "utf8")) as AgentProfile;
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
    process.stdout.write(`${block}\n`);
    return 0;
  });
}

export const runRole: CommandHandler<RoleParsed> = (ctx, p) => {
  return cmdRole({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, role: p.role });
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

      const rows: [string, string, string][] = [];
      const seen = new Set<string>();
      const duplicates: string[] = [];
      for (const entry of entries) {
        const filePath = path.join(agentsDir, entry);
        const raw = JSON.parse(await readFile(filePath, "utf8")) as Record<string, unknown>;
        const rawId = typeof raw.id === "string" ? raw.id : "";
        const rawRole = typeof raw.role === "string" ? raw.role : "";
        const agentId = rawId.trim() || "<missing-id>";
        const role = rawRole.trim() || "-";
        if (seen.has(agentId)) {
          duplicates.push(agentId);
        } else {
          seen.add(agentId);
        }
        rows.push([agentId, role, entry]);
      }

      const widthId = Math.max(...rows.map((row) => row[0].length), "ID".length);
      const widthFile = Math.max(...rows.map((row) => row[2].length), "FILE".length);
      process.stdout.write(`${"ID".padEnd(widthId)}  ${"FILE".padEnd(widthFile)}  ROLE\n`);
      process.stdout.write(`${"-".repeat(widthId)}  ${"-".repeat(widthFile)}  ----\n`);
      for (const [agentId, role, filename] of rows) {
        process.stdout.write(
          `${agentId.padEnd(widthId)}  ${filename.padEnd(widthFile)}  ${role}\n`,
        );
      }

      if (duplicates.length > 0) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Duplicate agent ids: ${dedupeStrings(duplicates).toSorted().join(", ")}`,
        });
      }
      return 0;
    });
}
