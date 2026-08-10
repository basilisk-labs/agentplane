import { execFile } from "node:child_process";
import { cp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import {
  createSupervisorExecutionEpisodeJournal,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

import {
  agentTransitionId,
  MAX_AGENT_ACTION_PACKET_BYTES,
} from "../commands/task/agent-action-packet.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../commands/shared/supervisor-execution-episode.js";
import { buildTaskRouteDecision } from "../commands/shared/route-decision.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import type { ExternalAgentExchange } from "../commands/task/external-agent-exchange.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);

type AgentPacket = {
  transition_id: string;
  state_fingerprint: string;
  action: { kind: string; instruction: string };
  authority: { role: string; mutation: string };
  exchange?: {
    directory: string;
    work_order_ref: string;
    result_path: string;
    resume_argv: string[];
  };
  recovery?: { reason: string; evidence_digest: string };
  stop: { reason: string };
};

function withoutTimestamps(value: string): string {
  return value.replaceAll(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/gu, "<timestamp>");
}

async function createTask(root: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Authoritative external branch transition",
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

describe("runCli task advance branch worktree", { timeout: 180_000 }, () => {
  it("advances once from the base checkout into one worktree-bound semantic episode", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const taskId = await createTask(root);
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
    await cp(
      path.join(process.cwd(), "packages", "agentplane", "assets", "policy"),
      path.join(root, ".agentplane", "policy"),
      { recursive: true, force: true },
    );
    await writeFile(
      path.join(root, ".gitignore"),
      [
        ".agentplane/bin/",
        ".agentplane/cache.sqlite-*",
        "agentplane-recipes",
        "node_modules",
        "packages/",
        "website/",
        "",
      ].join("\n"),
      "utf8",
    );
    await execFileAsync("git", ["add", ".agentplane", ".gitignore"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed authoritative advance task"], {
      cwd: root,
    });

    const initialReadme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    const callerCwd = process.cwd();
    const jsonPacket = await readAgentPacket(root, taskId);
    expect(process.cwd()).toBe(callerCwd);
    if (!jsonPacket.exchange) throw new Error("expected a worktree-bound semantic exchange");
    const workOrder = JSON.parse(
      await readFile(
        path.join(jsonPacket.exchange.directory, jsonPacket.exchange.work_order_ref),
        "utf8",
      ),
    ) as AgentWorkOrderV2;
    const taskWorktree = workOrder.state_fingerprint.worktree;
    const branchResult = await execFileAsync("git", ["branch", "--show-current"], {
      cwd: taskWorktree,
    });
    const headResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: taskWorktree,
    });
    const branch = branchResult.stdout.trim();
    const head = headResult.stdout.trim();
    const readmePath = path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md");
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const jsonReadme = await readFile(readmePath, "utf8");
    const jsonJournal = JSON.parse(await readFile(journalPath, "utf8")) as {
      operations: {
        status: string;
        precondition_fingerprint_digest: string;
        postcondition_fingerprint_digest: string | null;
      }[];
    };
    const worktreeStatus = await execFileAsync("git", ["status", "--porcelain=v1"], {
      cwd: taskWorktree,
    });
    expect(jsonPacket.transition_id, worktreeStatus.stdout).toBe(
      agentTransitionId("agent.branch_implementation", jsonPacket.state_fingerprint),
    );
    expect(jsonPacket).toMatchObject({
      action: { kind: "agent_episode" },
      authority: { role: "EXECUTOR", mutation: "scoped_write" },
      stop: { reason: "semantic_boundary" },
    });
    expect(branch).toMatch(new RegExp(`^task/${taskId}/`, "u"));
    expect(workOrder.state_fingerprint.git_head).toBe(head);
    expect(workOrder.authority.writable_roots).toEqual([taskWorktree]);
    const sourceManifestPaths = workOrder.required_inputs.flatMap((input) =>
      input.kind !== "knowledge_ref" && input.path ? [input.path] : [],
    );
    expect(sourceManifestPaths.length).toBeGreaterThan(0);
    for (const sourcePath of sourceManifestPaths) {
      if (sourcePath.startsWith("bundled:") || sourcePath.startsWith("runtime:")) {
        expect(sourcePath).toMatch(/^(?:bundled|runtime):[A-Za-z0-9_.:/-]+$/u);
        continue;
      }
      expect(path.isAbsolute(sourcePath)).toBe(false);
      const worktreeSource = path.resolve(taskWorktree, sourcePath);
      const callerSource = path.resolve(root, sourcePath);
      expect(worktreeSource.startsWith(`${taskWorktree}${path.sep}`)).toBe(true);
      expect(worktreeSource).not.toBe(callerSource);
      await expect(readFile(worktreeSource, "utf8")).resolves.toEqual(expect.any(String));
    }
    expect(jsonPacket.exchange.result_path).toBe(
      path.join(jsonPacket.exchange.directory, "result.json"),
    );
    expect(jsonPacket.exchange.resume_argv).toContain(jsonPacket.exchange.result_path);
    const persistedExchange = JSON.parse(
      await readFile(path.join(jsonPacket.exchange.directory, "exchange.json"), "utf8"),
    ) as ExternalAgentExchange;
    expect(persistedExchange.checkout).toBe(taskWorktree);
    const taskInput = workOrder.required_inputs.find((input) => input.kind === "task_document");
    expect(taskInput?.path).toBe(`.agentplane/tasks/${taskId}/README.md`);
    await expect(readFile(path.join(taskWorktree, taskInput!.path!), "utf8")).resolves.toContain(
      taskId,
    );
    expect(jsonReadme).toContain('status: "DOING"');
    expect(jsonJournal.operations).toEqual([
      expect.objectContaining({ status: "completed" }),
      expect.objectContaining({ status: "completed" }),
      expect.objectContaining({ status: "intent" }),
    ]);

    await execFileAsync("git", ["restore", `.agentplane/tasks/${taskId}/README.md`], {
      cwd: taskWorktree,
    });
    await rm(journalPath, { force: true });
    expect(await readFile(readmePath, "utf8")).toBe(initialReadme);

    let humanOutput = "";
    const humanIo = captureStdIO();
    try {
      expect(await runCli(["task", "advance", taskId, "--root", root]), humanIo.stderr).toBe(0);
      expect(humanIo.stdout).toContain("agent_episode");
      expect(humanIo.stdout).toContain("semantic_boundary");
      humanOutput = humanIo.stdout;
    } finally {
      humanIo.restore();
    }
    const humanReadme = await readFile(readmePath, "utf8");
    const humanJournal = JSON.parse(await readFile(journalPath, "utf8")) as typeof jsonJournal;
    expect(withoutTimestamps(humanReadme)).toBe(withoutTimestamps(jsonReadme));
    expect(humanJournal.operations.map(({ status }) => status)).toEqual(["completed", "intent"]);
    expect(humanJournal.operations[0]?.precondition_fingerprint_digest).toMatch(/^sha256:/u);
    expect(jsonJournal.operations[0]?.precondition_fingerprint_digest).toMatch(/^sha256:/u);
    expect(humanJournal.operations[0]?.postcondition_fingerprint_digest).toMatch(/^sha256:/u);
    expect(jsonJournal.operations[0]?.postcondition_fingerprint_digest).toMatch(/^sha256:/u);

    const beforeRenderOnly = await readFile(readmePath, "utf8");
    const journalBeforeRenderOnly = await readFile(journalPath, "utf8");
    const stablePacket = await readAgentPacket(root, taskId);
    expect(stablePacket.transition_id).toBe(
      agentTransitionId("agent.branch_implementation", stablePacket.state_fingerprint),
    );
    expect(stablePacket.transition_id).not.toBe(jsonPacket.transition_id);
    expect(stablePacket.action).toEqual(jsonPacket.action);
    expect(humanOutput).toContain(stablePacket.state_fingerprint);
    expect(await readFile(readmePath, "utf8")).toBe(beforeRenderOnly);
    expect(await readFile(journalPath, "utf8")).toBe(journalBeforeRenderOnly);

    await execFileAsync("git", ["restore", `.agentplane/tasks/${taskId}/README.md`], {
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
});
