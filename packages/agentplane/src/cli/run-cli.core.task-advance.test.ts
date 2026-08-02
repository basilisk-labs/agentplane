import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

import { MAX_AGENT_ACTION_PACKET_BYTES } from "../commands/task/agent-action-packet.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

type AgentPacket = {
  schema_version: number;
  task_id: string;
  state_fingerprint: string;
  action: { kind: string; instruction: string };
  authority: {
    role: string;
    mutation: string;
    network: string;
    required: boolean;
    reference: string | null;
  };
  context_refs: { kind: string; ref: string; digest?: string }[];
  stop: { reason: string; resume: string };
};

async function createTask(root: string, title: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      title,
      "--description",
      "Exercise the compact external-agent protocol.",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--verify",
      "bun run test:critical",
      "--root",
      root,
    ]);
    expect(code, io.stderr).toBe(0);
    return io.stdout.trim();
  } finally {
    io.restore();
  }
}

async function readAgentPacket(root: string, taskId: string): Promise<AgentPacket> {
  const io = captureStdIO();
  try {
    const code = await runCli(["task", "advance", taskId, "--agent-json", "--root", root]);
    expect(code, io.stderr).toBe(0);
    expect(Buffer.byteLength(io.stdout.trim(), "utf8")).toBeLessThanOrEqual(
      MAX_AGENT_ACTION_PACKET_BYTES,
    );
    return JSON.parse(io.stdout) as AgentPacket;
  } finally {
    io.restore();
  }
}

async function readRouteFingerprint(root: string, taskId: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
    expect(code, io.stderr).toBe(0);
    const payload = JSON.parse(io.stdout) as {
      workflow_step: { preconditionFingerprint: { digest: string } };
    };
    return payload.workflow_step.preconditionFingerprint.digest;
  } finally {
    io.restore();
  }
}

async function readRoute(
  root: string,
  taskId: string,
): Promise<{
  workflow_step: {
    kind: string;
    preconditionFingerprint: { digest: string };
    request?: {
      type: string;
      operationId: string;
      operationDigest: string;
      stateFingerprintDigest: string;
      stateScopeDigest: string;
    };
  };
  route_oracle: { phase: string; authoritativeCheckout: string };
}> {
  const io = captureStdIO();
  try {
    const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
    expect(code, io.stderr).toBe(0);
    return JSON.parse(io.stdout) as {
      workflow_step: {
        kind: string;
        preconditionFingerprint: { digest: string };
        request?: {
          type: string;
          operationId: string;
          operationDigest: string;
          stateFingerprintDigest: string;
          stateScopeDigest: string;
        };
      };
      route_oracle: { phase: string; authoritativeCheckout: string };
    };
  } finally {
    io.restore();
  }
}

describe("runCli task advance", { timeout: 180_000 }, () => {
  it("returns one compact approval action without changing repository state", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root, "Compact approval packet");
    const execFileAsync = promisify(execFile);
    const before = await execFileAsync("git", ["status", "--porcelain=v1"], { cwd: root });
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const taskBefore = await readFile(readmePath, "utf8");

    const first = await readAgentPacket(root, taskId);
    const second = await readAgentPacket(root, taskId);
    const after = await execFileAsync("git", ["status", "--porcelain=v1"], { cwd: root });
    const taskAfter = await readFile(readmePath, "utf8");

    expect(first).toEqual(second);
    expect(first).toMatchObject({
      schema_version: 1,
      task_id: taskId,
      action: { kind: "approval_required" },
      stop: { reason: "authority_boundary", resume: "request_fresh_packet" },
    });
    expect(first.state_fingerprint).toBe(await readRouteFingerprint(root, taskId));
    expect(first.context_refs.length).toBeGreaterThan(0);
    expect(JSON.stringify(first)).not.toMatch(
      /(?:\bgit\s|\bgh\s|worktree|pr open|\bverify\b|\bfinish\b|\bintegrate\b|\bcleanup\b)/iu,
    );
    expect(after.stdout).toBe(before.stdout);
    expect(taskAfter).toBe(taskBefore);
  });

  it("projects the direct runner boundary as the same semantic agent episode", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    const taskId = await createTask(root, "Direct semantic packet");
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Implement the scoped change and report evidence.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    const packet = await readAgentPacket(root, taskId);
    expect(packet.action.kind).toBe("agent_episode");
    expect(packet.stop).toEqual({
      reason: "semantic_boundary",
      resume: "request_fresh_packet",
    });
    expect(packet.authority).toMatchObject({ role: "EXECUTOR", network: "deny" });
    expect(packet.state_fingerprint).toBe(await readRouteFingerprint(root, taskId));
    const taskReadme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(taskReadme).toContain('status: "DOING"');
    expect(taskReadme).toContain("Start: continue direct-mode task in current checkout.");
  });

  it("fails closed when a branch control-plane path is not authoritative", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root, "Branch semantic packet");
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Implement the scoped branch change and report evidence.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    const packet = await readAgentPacket(root, taskId);
    const route = await readRoute(root, taskId);
    expect(packet.action.kind).toBe("framework_transition");
    expect(packet.stop.reason).toBe("control_plane_boundary");
    expect(packet.authority.required).toBe(false);
    expect(packet.state_fingerprint).toBe(route.workflow_step.preconditionFingerprint.digest);
    expect(route.workflow_step.kind).toBe("cli_operation");
  });
});
