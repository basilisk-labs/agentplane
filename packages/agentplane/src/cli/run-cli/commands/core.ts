import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { resolveProject } from "@agentplaneorg/core";

import { mapCoreError } from "../../error-map.js";
import { fileExists } from "../../fs-utils.js";
import { CliError } from "../../../shared/errors.js";
import { dedupeStrings } from "../../../shared/strings.js";
import { usageError } from "../../../cli2/errors.js";
import type { CommandHandler, CommandSpec } from "../../../cli2/spec.js";
import { listRoles, renderQuickstart, renderRole } from "../../command-guide.js";

type QuickstartParsed = Record<string, never>;

export const quickstartSpec: CommandSpec<QuickstartParsed> = {
  id: ["quickstart"],
  group: "Core",
  summary: "Print CLI quickstart and command cheat sheet.",
  options: [],
  examples: [{ cmd: "agentplane quickstart", why: "Show quickstart." }],
  parse: () => ({}),
};

function cmdQuickstart(opts: { cwd: string; rootOverride?: string }): number {
  try {
    process.stdout.write(`${renderQuickstart()}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "quickstart", root: opts.rootOverride ?? null });
  }
}

export const runQuickstart: CommandHandler<QuickstartParsed> = (ctx) => {
  cmdQuickstart({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });
  return Promise.resolve(0);
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

function cmdRole(opts: { cwd: string; rootOverride?: string; role: string }): number {
  try {
    const roleRaw = opts.role.trim();
    if (!roleRaw) {
      throw usageError({
        spec: roleSpec,
        command: "role",
        message: "Missing required argument: role",
      });
    }
    const guide = renderRole(roleRaw);
    if (!guide) {
      const roles = listRoles();
      const available = roles.length > 0 ? `\nAvailable roles: ${roles.join(", ")}` : "";
      throw usageError({
        spec: roleSpec,
        command: "role",
        message: `Unknown role: ${roleRaw}.${available}`,
      });
    }
    process.stdout.write(`${guide}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "role", root: opts.rootOverride ?? null });
  }
}

export const runRole: CommandHandler<RoleParsed> = (ctx, p) => {
  cmdRole({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, role: p.role });
  return Promise.resolve(0);
};

type AgentsParsed = Record<string, never>;

export const agentsSpec: CommandSpec<AgentsParsed> = {
  id: ["agents"],
  group: "Core",
  summary: "List agent definitions under .agentplane/agents.",
  examples: [{ cmd: "agentplane agents", why: "Print available agent ids and roles." }],
  parse: () => ({}),
};

async function cmdAgents(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
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
      process.stdout.write(`${agentId.padEnd(widthId)}  ${filename.padEnd(widthFile)}  ${role}\n`);
    }

    if (duplicates.length > 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Duplicate agent ids: ${dedupeStrings(duplicates).toSorted().join(", ")}`,
      });
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "agents", root: opts.rootOverride ?? null });
  }
}

export const runAgents: CommandHandler<AgentsParsed> = (ctx) =>
  cmdAgents({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });
