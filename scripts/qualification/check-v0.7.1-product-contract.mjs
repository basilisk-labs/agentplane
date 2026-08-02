import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const cliPath = path.join(repoRoot, "packages", "agentplane", "bin", "agentplane.js");
const MAX_AGENT_PACKET_BYTES = 2048;

function run(command, args, cwd) {
  return execFileSync(command, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, AGENTPLANE_NO_UPDATE_CHECK: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function probeCli(args, cwd = repoRoot) {
  const result = spawnSync(process.execPath, [cliPath, ...args], {
    cwd,
    encoding: "utf8",
    env: { ...process.env, AGENTPLANE_NO_UPDATE_CHECK: "1" },
  });
  return {
    status: result.status,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function checkOnboarding(failures) {
  const readme = read("README.md");
  const taskCommand = read("packages/agentplane/src/commands/task/task.command.ts");
  const commandGuide = read("packages/agentplane/src/cli/command-guide.ts");
  if (/agentplane task begin/u.test(readme) || /agentplane task complete/u.test(readme)) {
    failures.push("README still presents task begin/task complete as the normal first-task route");
  }
  if (/Default guided path: task begin -> task verify-show -> task complete/u.test(taskCommand)) {
    failures.push("task help still declares begin/verify-show/complete as the default guided path");
  }
  if (/normal first task, prefer `agentplane task begin/u.test(commandGuide)) {
    failures.push("quickstart still recommends the semantic task begin shortcut");
  }
}

function checkManagedFrontend(failures) {
  const result = probeCli(["task", "run", "--help"]);
  if (result.status !== 0) failures.push("managed task run frontend is not publicly executable");
}

function assertCompactPacket(packetText) {
  const bytes = Buffer.byteLength(packetText, "utf8");
  assert.ok(bytes <= MAX_AGENT_PACKET_BYTES, `agent packet is ${bytes} bytes; maximum is 2048`);
  const packet = JSON.parse(packetText);
  assert.equal(packet.schema_version, 1, "agent packet schema_version must be 1");
  assert.equal(typeof packet.task_id, "string", "agent packet task_id is required");
  assert.equal(
    typeof packet.state_fingerprint,
    "string",
    "agent packet state_fingerprint is required",
  );
  assert.ok(packet.action && typeof packet.action === "object", "agent packet action is required");
  assert.equal(typeof packet.action.kind, "string", "agent packet action.kind is required");
  assert.equal(
    typeof packet.action.instruction,
    "string",
    "agent packet action.instruction is required",
  );
  for (const aliases of [
    ["action", "next", "next_action"],
    ["state_fingerprint", "fingerprint", "state_digest"],
    ["task_id", "taskId", "id"],
  ]) {
    const present = aliases.filter((field) => Object.hasOwn(packet, field));
    assert.ok(present.length <= 1, `agent packet duplicates one field as ${present.join(", ")}`);
  }
  const serialized = JSON.stringify(packet);
  assert.doesNotMatch(
    serialized,
    /(?:\bgit\s|\bgh\s|worktree|pr open|\bverify\b|\bfinish\b|\bintegrate\b|\bcleanup\b)/iu,
    "normal external-agent packet leaks formal lifecycle choreography",
  );
}

function checkExternalFrontend(failures) {
  const help = probeCli(["task", "advance", "--help"]);
  if (help.status !== 0) {
    failures.push("task advance is not registered as the external-agent supervisor frontend");
    return;
  }
  if (!help.stdout.includes("--agent-json")) {
    failures.push("task advance help omits the compact --agent-json contract");
    return;
  }

  const tempRoot = mkdtempSync(path.join(os.tmpdir(), "agentplane-v071-product-contract-"));
  try {
    run("git", ["init", "-q", "-b", "main"], tempRoot);
    run("git", ["config", "user.name", "AgentPlane Qualification"], tempRoot);
    run("git", ["config", "user.email", "qualification@example.com"], tempRoot);
    writeFileSync(path.join(tempRoot, "README.md"), "# Qualification fixture\n", "utf8");
    run("git", ["add", "README.md"], tempRoot);
    run("git", ["commit", "-m", "seed"], tempRoot);
    run(
      process.execPath,
      [
        cliPath,
        "init",
        "--yes",
        "--setup-profile",
        "light",
        "--workflow",
        "branch_pr",
        "--backend",
        "local",
        "--hooks",
        "false",
        "--require-plan-approval",
        "true",
      ],
      tempRoot,
    );
    const taskId = run(
      process.execPath,
      [
        cliPath,
        "task",
        "new",
        "--title",
        "Compact protocol fixture",
        "--description",
        "Prepare the smallest sufficient context for an executor",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "qualification",
      ],
      tempRoot,
    ).trim();
    const packet = run(
      process.execPath,
      [cliPath, "task", "advance", taskId, "--agent-json"],
      tempRoot,
    ).trim();
    assertCompactPacket(packet);
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
}

function main() {
  const failures = [];
  checkOnboarding(failures);
  checkManagedFrontend(failures);
  checkExternalFrontend(failures);
  if (failures.length > 0) {
    throw new Error(
      ["v0.7.1 product contract is release-blocking:", ...failures.map((item) => `- ${item}`)].join(
        "\n",
      ),
    );
  }
  process.stdout.write(
    "v0.7.1 product contract OK (managed run + compact external advance; normal packet <=2048 bytes)\n",
  );
}

try {
  main();
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
