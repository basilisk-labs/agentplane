import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { isDirectRun } from "../lib/script-runtime.mjs";

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

function probeNodeScript(relativePath, args = []) {
  const result = spawnSync(process.execPath, [path.join(repoRoot, relativePath), ...args], {
    cwd: repoRoot,
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
  const canonicalFlow = [
    'agentplane task create "Inspect Agentplane artifacts',
    "agentplane task advance <task-id> --agent-json",
    "agentplane task run <task-id>",
  ];
  const positions = canonicalFlow.map((command) => readme.indexOf(command));
  if (positions.includes(-1)) {
    failures.push("README omits the canonical task create / task advance / task run flow");
  } else if (!(positions[0] < positions[1] && positions[1] < positions[2])) {
    failures.push("README presents the canonical supervisor flow out of order");
  }
}

function checkCompatibilityShortcuts(failures) {
  const begin = probeCli(["task", "begin", "--help"]);
  if (begin.status === 0) {
    if (!/Compatibility shortcut/iu.test(begin.stdout)) {
      failures.push("task begin is not explicitly labeled as a compatibility shortcut");
    }
    if (!/stop at semantic planning or approval/iu.test(begin.stdout)) {
      failures.push("task begin does not expose its semantic planning stop");
    }
  } else {
    failures.push("task begin compatibility help is not executable");
  }

  const complete = probeCli(["task", "complete", "--help"]);
  if (complete.status === 0) {
    if (!/already verified, independently reviewed task/iu.test(complete.stdout)) {
      failures.push("task complete does not require prior verification and independent review");
    }
    if (
      !/Unsafe compatibility override for a missing observed runner receipt/iu.test(complete.stdout)
    ) {
      failures.push("task complete does not expose the observed-receipt safety boundary");
    }
    if (!/requires --yes/iu.test(complete.stdout)) {
      failures.push("task complete unsafe override is not guarded by explicit confirmation");
    }
  } else {
    failures.push("task complete compatibility help is not executable");
  }
}

function checkManagedFrontend(failures) {
  const result = probeCli(["task", "run", "--help"]);
  if (result.status !== 0) failures.push("managed task run frontend is not publicly executable");
}

function checkCanonicalHelp(failures) {
  const result = probeCli(["help", "--json"]);
  if (result.status !== 0) {
    failures.push("canonical help registry is not executable");
    return;
  }
  try {
    const ids = JSON.parse(result.stdout).map((entry) => entry.id.join(" "));
    if (ids.length > 12)
      failures.push(`canonical help exposes ${ids.length} commands; maximum is 12`);
    for (const required of ["task create", "task advance", "task run", "context search"]) {
      if (!ids.includes(required)) failures.push(`canonical help omits ${required}`);
    }
    if (ids.includes("task begin") || ids.includes("task complete")) {
      failures.push("canonical help exposes compatibility begin/complete shortcuts");
    }
  } catch (error) {
    failures.push(
      `canonical help is not valid JSON: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export function assertCompactAgentPacket(packetText) {
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
    assertCompactAgentPacket(packet);
    const parsedPacket = JSON.parse(packet);
    assert.equal(parsedPacket.transition_id.length > 0, true, "planning transition is required");
    assert.equal(
      parsedPacket.action.kind,
      "agent_episode",
      "new tasks must stop for semantic planning",
    );
    assert.equal(
      parsedPacket.authority.role,
      "PLANNER",
      "planning packet must delegate to PLANNER",
    );
    assert.equal(
      parsedPacket.authority.mutation,
      "read_only",
      "planning packet cannot mutate lifecycle state",
    );

    const prematureApproval = probeCli(
      ["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR"],
      tempRoot,
    );
    assert.notEqual(
      prematureApproval.status,
      0,
      "generated planning placeholder must not be approvable",
    );
    assert.match(prematureApproval.stderr, /semantic plan|planning placeholder/iu);

    const managedBoundary = probeCli(["task", "run", taskId, "--json"], tempRoot);
    assert.equal(
      managedBoundary.status,
      0,
      "managed run must return the planning boundary without failure",
    );
    const managed = JSON.parse(managedBoundary.stdout);
    assert.equal(
      managed.route.step_id,
      "agent.planning",
      "run and advance must share planning state",
    );
    assert.equal(managed.stop.code, "semantic_input_required", "run must type the planning stop");
    assert.equal(
      managed.metrics.provider_episodes,
      0,
      "planning stop must not launch an implementation provider",
    );
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  } finally {
    rmSync(tempRoot, { recursive: true, force: true });
  }
}

function checkMaintenanceContract(failures) {
  const legacy = probeCli(["doctor", "legacy", "--json"]);
  if (legacy.status === 0) {
    try {
      const report = JSON.parse(legacy.stdout);
      assert.equal(report.schema_version, 1, "doctor legacy schema_version must be 1");
      assert.equal(report.kind, "agentplane.doctor.legacy", "doctor legacy kind must be stable");
      assert.ok(Array.isArray(report.adapters) && report.adapters.length > 0);
      for (const adapter of report.adapters) {
        assert.equal(typeof adapter.introduced_in, "string");
        assert.ok(adapter.deprecated_in === null || typeof adapter.deprecated_in === "string");
        assert.ok(
          typeof adapter.remove_in === "string" ||
            (adapter.remove_in === null && typeof adapter.removal_blocker === "string"),
        );
        assert.equal(typeof adapter.migration_command, "string");
        assert.equal(typeof adapter.usage_probe?.kind, "string");
      }
    } catch (error) {
      failures.push(
        `doctor legacy contract is invalid: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  } else {
    failures.push("doctor legacy --json is not executable");
  }

  for (const [label, script] of [
    ["TypeScript 7 toolchain", "scripts/checks/check-typescript-toolchain.mjs"],
    ["Knip package budget", "scripts/checks/check-knip-baseline.mjs"],
  ]) {
    const result = probeNodeScript(script);
    if (result.status !== 0) {
      failures.push(
        `${label} check failed: ${(result.stderr || result.stdout).trim() || `exit=${result.status ?? 1}`}`,
      );
    }
  }
}

function main() {
  const failures = [];
  checkOnboarding(failures);
  checkCompatibilityShortcuts(failures);
  checkCanonicalHelp(failures);
  checkManagedFrontend(failures);
  checkExternalFrontend(failures);
  checkMaintenanceContract(failures);
  if (failures.length > 0) {
    throw new Error(
      ["v0.7.1 product contract is release-blocking:", ...failures.map((item) => `- ${item}`)].join(
        "\n",
      ),
    );
  }
  process.stdout.write(
    "v0.7.1 product contract OK (canonical supervisor UX, guarded compatibility, compact packet, legacy inventory, TS7, and zero-unused CLI)\n",
  );
}

if (isDirectRun(import.meta.url)) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
