import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { resolveProject } from "@agentplaneorg/core/project";

import type { RoleProfileGuide } from "../../../command-guide.js";
import { fileExists } from "../../../fs-utils.js";
import { CliError } from "../../../../shared/errors.js";

export type AgentProfile = {
  id?: string;
  role?: string;
  description?: string;
  inputs?: unknown;
  outputs?: unknown;
  permissions?: unknown;
  workflow?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toAgentProfileStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (isRecord(item) && typeof item.text === "string") return item.text.trim();
      return "";
    })
    .filter(Boolean);
}

export function parseAgentProfileJson(filePath: string, text: string): AgentProfile {
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

export function normalizeRoleId(roleRaw: string): string {
  return roleRaw.trim().toUpperCase();
}

export async function listAgentProfileIds(opts: {
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
    const entries = entriesRaw.filter((name) => name.endsWith(".json")).toSorted();
    const ids = entries.map((name) => name.replace(/\.json$/i, ""));
    return { agentplaneDir: resolved.agentplaneDir, ids };
  } catch {
    // Best-effort: role should not fail if we're not in an agentplane project.
    return null;
  }
}

export async function readAgentProfile(opts: {
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
  for (const candidate of candidates) {
    const exact = listing.ids.find((id) => id === candidate);
    if (exact) {
      foundId = exact;
      break;
    }
    const ci = idsLower.get(candidate.toLowerCase());
    if (ci) {
      foundId = ci;
      break;
    }
  }
  if (!foundId) return null;

  const filename = `${foundId}.json`;
  const filePath = path.join(listing.agentplaneDir, "agents", filename);
  const profile = parseAgentProfileJson(filePath, await readFile(filePath, "utf8"));
  return { agentplaneDir: listing.agentplaneDir, filename, profile };
}

export function toRoleProfileGuide(opts: {
  filename: string;
  roleId: string;
  profile: AgentProfile;
}): RoleProfileGuide {
  const id = (typeof opts.profile.id === "string" ? opts.profile.id : "").trim() || opts.roleId;
  const role = (typeof opts.profile.role === "string" ? opts.profile.role : "").trim();
  const description = (
    typeof opts.profile.description === "string" ? opts.profile.description : ""
  ).trim();

  const inputs = toAgentProfileStringList(opts.profile.inputs);
  const outputs = toAgentProfileStringList(opts.profile.outputs);
  const permissions = toAgentProfileStringList(opts.profile.permissions);
  const workflow = toAgentProfileStringList(opts.profile.workflow);

  return {
    filename: opts.filename,
    id,
    role,
    description,
    inputs,
    outputs,
    permissions,
    workflow,
  };
}
