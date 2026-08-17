import { constants } from "node:fs";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { isRecord } from "../../shared/guards.js";
import { resolveAgentplaneBinPath } from "../../shared/package-paths.js";

export function hermesEnvSnapshot() {
  return {
    task_id: process.env.HERMES_KANBAN_TASK ?? null,
    board: process.env.HERMES_KANBAN_BOARD ?? null,
    db: process.env.HERMES_KANBAN_DB ?? null,
    run_id: process.env.HERMES_KANBAN_RUN_ID ?? null,
    workspace: process.env.HERMES_KANBAN_WORKSPACE ?? null,
    claim_lock_present: Boolean(process.env.HERMES_KANBAN_CLAIM_LOCK),
  };
}

export const HERMES_PLUGIN_PROTOCOL = "agentplane.hermes.plugin.v2" as const;

function normalizedPathList(value: string | undefined): string[] {
  return (value ?? "")
    .split(path.delimiter)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function hermesPluginContractSnapshot() {
  const protocol = process.env.AGENTPLANE_HERMES_PLUGIN_PROTOCOL?.trim() || null;
  const allowedRoots = normalizedPathList(process.env.AGENTPLANE_HERMES_ALLOWED_ROOTS);
  return {
    required_protocol: HERMES_PLUGIN_PROTOCOL,
    protocol,
    protocol_valid: protocol === HERMES_PLUGIN_PROTOCOL,
    native_worker_lane_api: process.env.AGENTPLANE_HERMES_NATIVE_WORKER_LANE_API?.trim() === "1",
    allowed_roots: allowedRoots,
    allowed_roots_fail_closed: allowedRoots.length > 0,
  };
}

export async function inspectCommandAvailability(command: string) {
  const candidates = command.includes(path.sep)
    ? [path.resolve(command)]
    : normalizedPathList(process.env.PATH).map((entry) => path.join(entry, command));
  for (const candidate of candidates) {
    try {
      await access(candidate, constants.X_OK);
      return { available: true, resolved_path: candidate };
    } catch {
      // Continue through PATH without executing an untrusted binary.
    }
  }
  return { available: false, resolved_path: null };
}

export async function loadLaneRegistry() {
  const rawRegistryPath = process.env.AGENTPLANE_HERMES_LANE_REGISTRY?.trim();
  const registryPath = rawRegistryPath && rawRegistryPath.length > 0 ? rawRegistryPath : null;
  if (!registryPath) {
    return {
      path: null,
      loaded: false,
      error: null,
      agentplane_lanes: [] as unknown[],
    };
  }
  try {
    const parsed = JSON.parse(await readFile(registryPath, "utf8")) as unknown;
    const lanes = isRecord(parsed) ? parsed.lanes : null;
    const agentplaneLanes = Array.isArray(lanes)
      ? lanes.filter((lane) => isRecord(lane) && lane.kind === "agentplane")
      : [];
    return {
      path: registryPath,
      loaded: true,
      error: null,
      agentplane_lanes: agentplaneLanes,
    };
  } catch (err) {
    return {
      path: registryPath,
      loaded: false,
      error: err instanceof Error ? err.message : String(err),
      agentplane_lanes: [] as unknown[],
    };
  }
}

export function currentAgentplaneCommand(): { command: string; argsPrefix: string[] } {
  const rawAgentplaneBin = process.env.AGENTPLANE_BIN?.trim();
  const command =
    rawAgentplaneBin && rawAgentplaneBin.length > 0 ? rawAgentplaneBin : resolveAgentplaneBinPath();
  const rawArgsPrefix = process.env.AGENTPLANE_BIN_ARGS?.trim();
  if (!rawArgsPrefix) return { command, argsPrefix: [] };
  try {
    const parsed = JSON.parse(rawArgsPrefix) as unknown;
    const argsPrefix = Array.isArray(parsed)
      ? parsed.map((entry) => String(entry ?? "").trim()).filter(Boolean)
      : [];
    return { command, argsPrefix };
  } catch {
    return { command, argsPrefix: [] };
  }
}
