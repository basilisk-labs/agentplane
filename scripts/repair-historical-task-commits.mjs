import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const TASKS_JSON = path.join(ROOT, ".agentplane", "tasks.json");
const TASKS_DIR = path.join(ROOT, ".agentplane", "tasks");

function usage() {
  process.stdout.write(`Usage: node scripts/repair-historical-task-commits.mjs [--apply]

Find DONE tasks whose recorded implementation commit hash is unreachable in the current git history,
but whose commit message matches exactly one reachable git subject. In --apply mode, rewrite those
task READMEs to the reachable hash. Without --apply, print the repair plan only.
`);
}

function parseArgs(argv) {
  const args = new Set(argv.slice(2));
  if (args.has("--help") || args.has("-h")) return { help: true, apply: false };
  return { help: false, apply: args.has("--apply") };
}

function reachableSubject(hash) {
  try {
    return execFileSync("git", ["show", "-s", "--format=%s", hash], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function buildSubjectMap() {
  const raw = execFileSync("git", ["log", "--all", "--format=%H%x09%s"], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const map = new Map();
  for (const line of raw.split("\n")) {
    if (!line) continue;
    const [hash, subject] = line.split("\t");
    if (!map.has(subject)) map.set(subject, []);
    map.get(subject).push(hash);
  }
  return map;
}

function readmePath(taskId) {
  return path.join(TASKS_DIR, taskId, "README.md");
}

async function rewriteHash(readmeFile, oldHash, newHash) {
  const raw = await fs.readFile(readmeFile, "utf8");
  const oldLine = `  hash: "${oldHash}"`;
  const newLine = `  hash: "${newHash}"`;
  if (!raw.includes(oldLine)) {
    throw new Error(`commit hash line not found in ${path.relative(ROOT, readmeFile)}: ${oldHash}`);
  }
  await fs.writeFile(readmeFile, raw.replace(oldLine, newLine), "utf8");
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    usage();
    return;
  }

  const snapshot = JSON.parse(await fs.readFile(TASKS_JSON, "utf8"));
  const tasks = Array.isArray(snapshot.tasks) ? snapshot.tasks : [];
  const subjectMap = buildSubjectMap();
  const repairs = [];

  for (const task of tasks) {
    if (String(task?.status).toUpperCase() !== "DONE") continue;
    const hash = typeof task?.commit?.hash === "string" ? task.commit.hash.trim() : "";
    const message = typeof task?.commit?.message === "string" ? task.commit.message : "";
    if (!hash || !message || message === "Legacy completion (backfill)") continue;
    if (reachableSubject(hash)) continue;
    const matches = subjectMap.get(message) ?? [];
    if (matches.length !== 1) continue;
    repairs.push({
      id: task.id,
      oldHash: hash,
      newHash: matches[0],
      message,
      readmeFile: readmePath(task.id),
    });
  }

  if (repairs.length === 0) {
    process.stdout.write("No deterministic historical commit remaps found.\n");
    return;
  }

  process.stdout.write(
    `${args.apply ? "Applying" : "Planned"} ${repairs.length} deterministic historical commit remap(s):\n`,
  );
  for (const repair of repairs) {
    process.stdout.write(
      `- ${repair.id}: ${repair.oldHash} -> ${repair.newHash} :: ${repair.message}\n`,
    );
  }

  if (!args.apply) return;

  for (const repair of repairs) {
    await rewriteHash(repair.readmeFile, repair.oldHash, repair.newHash);
  }
}

main().catch((error) => {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
