import { readFile } from "node:fs/promises";
import path from "node:path";

import { defineCheck, parseScriptArgs, runScriptMain } from "./lib/script-runtime.mjs";

const DEFAULT_INCIDENTS_PATH = ".agentplane/policy/incidents.md";

function parseArgs(argv) {
  const { flags } = parseScriptArgs(argv, { valueFlags: ["path"] });
  return { path: String(flags.path ?? DEFAULT_INCIDENTS_PATH).trim() || DEFAULT_INCIDENTS_PATH };
}

export function listIncidentEntries(text) {
  return text
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- id:"));
}

function incidentId(entry) {
  const match = /\bid:\s*([^|]+)/u.exec(entry);
  return match?.[1]?.trim() || "(missing id)";
}

const main = defineCheck({
  name: "check-release-incidents",
  parseArgs,
  async check({ cwd, options }) {
    const incidentsPath = path.resolve(cwd, options.path);
    const text = await readFile(incidentsPath, "utf8");
    const entries = listIncidentEntries(text);

    if (entries.length > 0) {
      const ids = entries.map((entry) => `  - ${incidentId(entry)}`).join("\n");
      throw new Error(
        [
          `release incident gate failed: ${path.relative(cwd, incidentsPath)} contains ${entries.length} active incident entr${entries.length === 1 ? "y" : "ies"}.`,
          "Every release must be preceded by a dedicated incident review/fix task.",
          "Archive or resolve applicable incidents, preserve final evidence, then clean incidents.md before release planning, prepublish, or publish can continue.",
          "Active entries:",
          ids,
        ].join("\n"),
      );
    }

    process.stdout.write("Release incident gate passed: incidents.md has no active entries.\n");
  },
});

runScriptMain(main);
