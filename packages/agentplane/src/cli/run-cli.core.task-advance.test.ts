import { execFile } from "node:child_process";
import { mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import {
  createSupervisorExecutionEpisodeJournal,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

import {
  agentTransitionId,
  MAX_AGENT_ACTION_PACKET_BYTES,
} from "../commands/task/agent-action-packet.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../commands/shared/supervisor-execution-episode.js";
import { buildTaskRouteDecision } from "../commands/shared/route-decision.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);

function withoutTimestamps(value: string): string {
  return value.replaceAll(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/gu, "<timestamp>");
}

type AgentPacket = {
  schema_version: number;
  task_id: string;
  transition_id: string;
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
  recovery?: { reason: string; evidence_digest: string };
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
      transition_id: agentTransitionId("approval.plan"),
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

  it("matches the managed direct-run preview fingerprint and preserves task evidence", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    const taskId = await createTask(root, "Managed and external direct parity");
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Compare the managed and external supervisor entry from one persisted task state.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const packet = await readAgentPacket(root, taskId);
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const taskBeforeManagedPreview = await readFile(readmePath, "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "run", taskId, "--dry-run", "--json", "--root", root]);
      expect(code, io.stderr).toBe(0);
      const managed = JSON.parse(io.stdout) as {
        bundle_path: string;
        lifecycle_result: { lifecycle: { state_fingerprint: { digest: string } } };
      };
      const bundle = JSON.parse(await readFile(managed.bundle_path, "utf8")) as {
        route_decision: { workflowStep: { id: string } };
        work_order: { state_fingerprint: { digest: string } };
      };
      expect(bundle.work_order.state_fingerprint.digest).toBe(packet.state_fingerprint);
      expect(agentTransitionId(bundle.route_decision.workflowStep.id)).toBe(packet.transition_id);
      expect(await readFile(readmePath, "utf8")).toBe(taskBeforeManagedPreview);
    } finally {
      io.restore();
    }
  });

  it("executes one authoritative branch transition once and keeps rendering side-effect free", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const taskId = await createTask(root, "Authoritative external branch transition");
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Enter the authoritative task worktree through the shared supervisor.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed authoritative advance task"], {
      cwd: root,
    });

    const branch = `task/${taskId}/advance-parity`;
    const taskWorktree = path.join(root, ".agentplane", "worktrees", `${taskId}-advance-parity`);
    await mkdir(path.dirname(taskWorktree), { recursive: true });
    await execFileAsync("git", ["worktree", "add", "-b", branch, taskWorktree], { cwd: root });
    const readmePath = path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md");
    const initialReadme = await readFile(readmePath, "utf8");
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const authorityRoute = await readRoute(taskWorktree, taskId);
    const authorityRequest = authorityRoute.workflow_step.request;
    if (authorityRequest?.type === "side_effect") {
      await runCliSilent([
        "task",
        "authority",
        "grant",
        taskId,
        "--operation",
        authorityRequest.operationId,
        "--operation-digest",
        authorityRequest.operationDigest,
        "--state-fingerprint",
        authorityRequest.stateFingerprintDigest,
        "--state-scope-digest",
        authorityRequest.stateScopeDigest,
        "--by",
        "USER",
        "--root",
        taskWorktree,
      ]);
    }
    const jsonPacket = await readAgentPacket(taskWorktree, taskId);
    const jsonReadme = await readFile(readmePath, "utf8");
    const jsonJournal = JSON.parse(await readFile(journalPath, "utf8")) as {
      operations: {
        status: string;
        precondition_fingerprint_digest: string;
        postcondition_fingerprint_digest: string | null;
      }[];
    };
    expect(jsonPacket).toMatchObject({
      transition_id: agentTransitionId("approval.pr.open"),
      action: { kind: "approval_required" },
      stop: { reason: "authority_boundary" },
    });
    expect(jsonReadme).toContain('status: "DOING"');
    expect(jsonJournal.operations).toHaveLength(1);
    expect(jsonJournal.operations[0]).toMatchObject({ status: "completed" });

    await execFileAsync("git", ["restore", ".agentplane/tasks/" + taskId + "/README.md"], {
      cwd: taskWorktree,
    });
    await rm(journalPath, { force: true });
    expect(await readFile(readmePath, "utf8")).toBe(initialReadme);

    let humanOutput = "";
    const humanIo = captureStdIO();
    try {
      expect(
        await runCli(["task", "advance", taskId, "--root", taskWorktree]),
        humanIo.stderr,
      ).toBe(0);
      expect(humanIo.stdout).toContain("action");
      expect(humanIo.stdout).toContain("approval_required");
      expect(humanIo.stdout).toContain("authority_boundary");
      humanOutput = humanIo.stdout;
    } finally {
      humanIo.restore();
    }
    const humanReadme = await readFile(readmePath, "utf8");
    const humanJournal = JSON.parse(await readFile(journalPath, "utf8")) as typeof jsonJournal;
    expect(withoutTimestamps(humanReadme)).toBe(withoutTimestamps(jsonReadme));
    expect(humanJournal.operations.map(({ status }) => status)).toEqual(
      jsonJournal.operations.map(({ status }) => status),
    );
    expect(humanJournal.operations[0]?.precondition_fingerprint_digest).toMatch(/^sha256:/u);
    expect(jsonJournal.operations[0]?.precondition_fingerprint_digest).toMatch(/^sha256:/u);
    expect(humanJournal.operations[0]?.postcondition_fingerprint_digest).toMatch(/^sha256:/u);
    expect(jsonJournal.operations[0]?.postcondition_fingerprint_digest).toMatch(/^sha256:/u);

    const beforeRenderOnly = await readFile(readmePath, "utf8");
    const journalBeforeRenderOnly = await readFile(journalPath, "utf8");
    const stablePacket = await readAgentPacket(taskWorktree, taskId);
    expect(stablePacket.transition_id).toBe(jsonPacket.transition_id);
    expect(stablePacket.action).toEqual(jsonPacket.action);
    expect(humanOutput).toContain(stablePacket.state_fingerprint);
    expect(await readFile(readmePath, "utf8")).toBe(beforeRenderOnly);
    expect(await readFile(journalPath, "utf8")).toBe(journalBeforeRenderOnly);

    await execFileAsync("git", ["restore", ".agentplane/tasks/" + taskId + "/README.md"], {
      cwd: taskWorktree,
    });
    await rm(journalPath, { force: true });
    const recoveryContext = await loadCommandContext({
      cwd: taskWorktree,
      rootOverride: taskWorktree,
    });
    const recoveryDecision = await buildTaskRouteDecision({
      ctx: recoveryContext,
      cwd: taskWorktree,
      rootOverride: taskWorktree,
      taskId,
      includeRemote: false,
    });
    if (recoveryDecision.workflowStep.kind !== "cli_operation") {
      throw new Error("expected an authoritative deterministic transition recovery fixture");
    }
    const initialJournal = createSupervisorExecutionEpisodeJournal({
      task_id: taskId,
      task_revision: null,
      state_fingerprint_digest: recoveryDecision.workflowStep.preconditionFingerprint.digest,
      budget: {
        max_episodes: 50,
        max_agent_runs: 50,
        max_input_tokens: 3_000_000,
        max_output_tokens: 1_000_000,
        max_total_tokens: 4_000_000,
        max_wall_time_ms: 14_400_000,
        max_changed_files: 2000,
        max_diff_lines: null,
        max_no_progress_episodes: 3,
      },
    });
    const startedJournal = startSupervisorExecutionEpisode({
      journal: initialJournal,
      role: "EXECUTOR",
      kind: "cli_operation",
      operation_identity: recoveryDecision.workflowStep.operation,
      precondition_fingerprint_digest: recoveryDecision.workflowStep.preconditionFingerprint.digest,
    });
    if (startedJournal.status !== "started") throw new Error("expected started recovery fixture");
    const effectInDoubt = recoverSupervisorExecutionEpisodeJournal({
      journal: startedJournal.journal,
      state_fingerprint_digest: recoveryDecision.workflowStep.preconditionFingerprint.digest,
    });
    await createSupervisorEpisodeStore(journalPath).write(effectInDoubt);
    const recoveryReadme = await readFile(readmePath, "utf8");
    const recoveryPacket = await readAgentPacket(taskWorktree, taskId);
    expect(recoveryPacket).toMatchObject({
      transition_id: agentTransitionId(recoveryDecision.workflowStep.id),
      state_fingerprint: recoveryDecision.workflowStep.preconditionFingerprint.digest,
      action: { kind: "framework_transition" },
      recovery: { reason: "effect_in_doubt", evidence_digest: effectInDoubt.digest },
      stop: { reason: "control_plane_boundary" },
    });
    expect(await readFile(readmePath, "utf8")).toBe(recoveryReadme);
    const persistedRecovery = JSON.parse(await readFile(journalPath, "utf8")) as {
      digest: string;
      operations: unknown[];
    };
    expect(persistedRecovery.digest).toBe(effectInDoubt.digest);
    expect(persistedRecovery.operations).toHaveLength(1);
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
