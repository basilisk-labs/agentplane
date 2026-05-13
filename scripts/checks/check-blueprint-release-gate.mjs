import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const cliPath = path.join(repoRoot, "packages", "agentplane", "bin", "agentplane.js");

function fail(message) {
  throw new Error(`blueprint release gate failed: ${message}`);
}

function runCli(args) {
  const result = spawnSync(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  if (result.status !== 0) {
    fail(
      `agentplane ${args.join(" ")} exited ${result.status}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );
  }
  return `${result.stdout}${result.stderr}`;
}

function requireText(file, needle) {
  const fullPath = path.join(repoRoot, file);
  const text = readFileSync(fullPath, "utf8");
  if (!text.includes(needle)) {
    fail(`${file} does not contain ${JSON.stringify(needle)}`);
  }
}

const reportText = runCli(["blueprint", "report", "--json"]);
const report = JSON.parse(reportText);
if (report.schemaVersion !== 1 || typeof report.compatible !== "boolean") {
  fail("blueprint report JSON does not expose schemaVersion=1 and compatible boolean");
}

const doctorOutput = runCli(["doctor"]);
if (!doctorOutput.includes("Project blueprint compatibility")) {
  fail("doctor output does not include project blueprint compatibility");
}

requireText("packages/agentplane/src/runner/task-run-paths.ts", "blueprint-execution-plan.json");
requireText("packages/agentplane/src/runner/task-run-paths.ts", "blueprint-execution-state.json");
requireText(
  "packages/agentplane/src/commands/task/verify-record-execute.ts",
  "BlueprintSnapshotRef",
);
requireText("packages/agentplane/src/commands/acr/generate.ts", "agentplane.blueprint");
requireText("docs/developer/blueprints.mdx", "v0.5 Integration Contract");

process.stdout.write("blueprint release gate OK\n");
