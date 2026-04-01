import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { dedupeStrings } from "../../../../shared/strings.js";
import { CliError } from "../../../../shared/errors.js";
import { createCliEmitter } from "../../../output.js";
import type { CommandHandler, CommandSpec } from "../../../spec/spec.js";
import { fileExists } from "../../../fs-utils.js";
import type { RunDeps } from "../../command-catalog.js";

import { parseAgentProfileJson } from "./agent-profiles.js";
import { wrapCommand } from "../wrap-command.js";

const output = createCliEmitter();

type AgentsParsed = Record<string, never>;

export const agentsSpec: CommandSpec<AgentsParsed> = {
  id: ["agents"],
  group: "Core",
  summary: "List agent definitions under .agentplane/agents.",
  examples: [{ cmd: "agentplane agents", why: "Print available agent ids and roles." }],
  parse: () => ({}),
};

function formatAgentsTableLines(
  rows: { canonicalId: string; role: string; filename: string; rawId: string }[],
  showRawIdColumn: boolean,
): string[] {
  const widthId = Math.max(...rows.map((row) => row.canonicalId.length), "ID".length);
  const widthFile = Math.max(...rows.map((row) => row.filename.length), "FILE".length);
  if (showRawIdColumn) {
    const widthRawId = Math.max(...rows.map((row) => row.rawId.length), "RAW_ID".length);
    return [
      `${"ID".padEnd(widthId)}  ${"FILE".padEnd(widthFile)}  ${"RAW_ID".padEnd(widthRawId)}  ROLE`,
      `${"-".repeat(widthId)}  ${"-".repeat(widthFile)}  ${"-".repeat(widthRawId)}  ----`,
      ...rows.map(
        (row) =>
          `${row.canonicalId.padEnd(widthId)}  ${row.filename.padEnd(widthFile)}  ${row.rawId.padEnd(widthRawId)}  ${row.role}`,
      ),
    ];
  }
  return [
    `${"ID".padEnd(widthId)}  ${"FILE".padEnd(widthFile)}  ROLE`,
    `${"-".repeat(widthId)}  ${"-".repeat(widthFile)}  ----`,
    ...rows.map(
      (row) => `${row.canonicalId.padEnd(widthId)}  ${row.filename.padEnd(widthFile)}  ${row.role}`,
    ),
  ];
}

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

      output.lines(formatAgentsTableLines(rows, mismatches.length > 0));

      if (duplicates.length > 0) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Duplicate canonical agent ids: ${dedupeStrings(duplicates).toSorted().join(", ")}`,
        });
      }
      if (mismatches.length > 0) {
        const details = mismatches
          .map(
            (mismatch) =>
              `${mismatch.filename}: raw id "${mismatch.rawId}" != canonical "${mismatch.canonicalId}"`,
          )
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
