import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { defineScript, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const SCRIPT_NAME = "check-task-state.mjs";
const ACTIVE_STATUSES = new Set(["TODO", "DOING", "BLOCKED"]);
const RELEASE_BLOCKING_OBSERVATION_SEVERITIES = new Set(["medium", "high", "critical"]);

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function normalizePath(filePath) {
  return filePath.replaceAll(path.sep, "/");
}

function parseFrontMatter(text) {
  if (!text.startsWith("---\n")) return {};
  const end = text.indexOf("\n---", 4);
  if (end === -1) return {};
  const raw = text.slice(4, end);
  const out = {};
  for (const line of raw.split(/\r?\n/u)) {
    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/u.exec(line);
    if (!match) continue;
    const value = match[2]?.trim() ?? "";
    out[match[1]] = value.replaceAll(/^["']|["']$/gu, "");
  }
  return out;
}

function listTaskDirs(tasksRoot) {
  if (!existsSync(tasksRoot)) return [];
  return readdirSync(tasksRoot)
    .filter((entry) => {
      const fullPath = path.join(tasksRoot, entry);
      return statSync(fullPath).isDirectory() && existsSync(path.join(fullPath, "README.md"));
    })
    .toSorted((a, b) => a.localeCompare(b));
}

function readObservationLines(filePath) {
  if (!existsSync(filePath)) return { observations: [], errors: [] };
  const observations = [];
  const errors = [];
  const text = readFileSync(filePath, "utf8");
  for (const [index, line] of text.replaceAll("\r\n", "\n").split("\n").entries()) {
    const raw = line.trim();
    if (!raw) continue;
    try {
      observations.push(JSON.parse(raw));
    } catch (error) {
      errors.push(`line ${index + 1}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return { observations, errors };
}

function isReleaseBlockingObservation(value) {
  if (!value || typeof value !== "object") return false;
  if (value.status !== "open") return false;
  if (!RELEASE_BLOCKING_OBSERVATION_SEVERITIES.has(String(value.severity ?? ""))) return false;
  const action =
    value.recommended_action && typeof value.recommended_action === "object"
      ? String(value.recommended_action.type ?? "none")
      : "none";
  return action !== "none";
}

function parseMinorPatch(version) {
  const match = /^0\.3\.(\d+)$/u.exec(version);
  return match ? Number.parseInt(match[1], 10) : null;
}

export function checkTaskState(repoRoot, opts = {}) {
  const packageJson = readJson(path.join(repoRoot, "packages", "agentplane", "package.json"));
  const currentPatch = parseMinorPatch(String(packageJson.version));
  const tasksRoot = path.join(repoRoot, ".agentplane", "tasks");
  const taskIds = listTaskDirs(tasksRoot);
  const seen = new Set();
  const failures = [];

  for (const taskId of taskIds) {
    if (seen.has(taskId)) {
      failures.push(`duplicate task id: ${taskId}`);
      continue;
    }
    seen.add(taskId);

    const readmePath = path.join(tasksRoot, taskId, "README.md");
    const relReadmePath = normalizePath(path.relative(repoRoot, readmePath));
    let frontMatter;
    try {
      frontMatter = parseFrontMatter(readFileSync(readmePath, "utf8"));
    } catch (error) {
      failures.push(
        `${relReadmePath}: unreadable task file (${error instanceof Error ? error.message : String(error)})`,
      );
      continue;
    }
    const status = String(frontMatter.status ?? "").trim();
    const title = String(frontMatter.title ?? "").trim();

    if (!status) {
      failures.push(`${relReadmePath}: missing status`);
      continue;
    }
    if (opts.releaseReady === true && status === "DOING") {
      failures.push(
        `${relReadmePath}: DOING task blocks release readiness; finish, close, or explicitly move it out of the release scope before candidate/publish.`,
      );
    }
    if (opts.releaseReady === true) {
      const observationsPath = path.join(tasksRoot, taskId, "observations.jsonl");
      const relObservationsPath = normalizePath(path.relative(repoRoot, observationsPath));
      const { observations, errors } = readObservationLines(observationsPath);
      for (const error of errors) {
        failures.push(
          `${relObservationsPath}: invalid observation blocks release readiness (${error})`,
        );
      }
      for (const observation of observations) {
        if (!isReleaseBlockingObservation(observation)) continue;
        const id = String(observation.id ?? "unknown");
        const action =
          observation.recommended_action && typeof observation.recommended_action === "object"
            ? String(observation.recommended_action.type ?? "unknown")
            : "unknown";
        failures.push(
          `${relObservationsPath}: open ${observation.severity} observation ${id} requires ${action} triage before release readiness.`,
        );
      }
    }

    if (currentPatch !== null && ACTIVE_STATUSES.has(status)) {
      const staleMatches = [...title.matchAll(/\bv0\.3\.(\d+)\b/gu)]
        .map((match) => Number.parseInt(match[1] ?? "", 10))
        .filter((patch) => Number.isSafeInteger(patch))
        .filter((patch) => patch < currentPatch);
      if (staleMatches.length > 0) {
        failures.push(`${relReadmePath}: active stale release task references ${title}`);
      }
    }

    const deps = String(frontMatter.depends_on ?? "").trim();
    if (deps && deps !== "[]" && deps !== "none") {
      for (const dep of deps.matchAll(/[0-9]{12}-[A-Z0-9]{6}/gu)) {
        if (!seen.has(dep[0]) && !existsSync(path.join(tasksRoot, dep[0], "README.md"))) {
          failures.push(`${relReadmePath}: missing dependency ${dep[0]}`);
        }
      }
    }
  }

  if (failures.length > 0) {
    throw new Error(["task state check failed.", ...failures].join("\n"));
  }
  process.stdout.write(`task state OK (tasks=${taskIds.length})\n`);
}

const main = defineScript({
  name: SCRIPT_NAME,
  async run({ argv }) {
    const { flags } = parseScriptArgs(argv, { booleanFlags: ["release-ready"] });
    checkTaskState(process.cwd(), { releaseReady: flags["release-ready"] === true });
  },
});

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  runScriptMain(main);
}
