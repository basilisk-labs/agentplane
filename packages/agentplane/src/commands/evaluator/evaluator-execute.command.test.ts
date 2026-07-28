import { execFile } from "node:child_process";
import { chmod, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import {
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { readTask } from "@agentplaneorg/core/tasks";
import { captureStdIO, mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { runCli } from "../../cli/run-cli.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
import { cmdTaskAdd } from "../workflow.js";

const execFileAsync = promisify(execFile);

async function addTask(root: string, taskId: string): Promise<void> {
  await cmdTaskAdd({
    cwd: root,
    taskIds: [taskId],
    title: "Evaluator supervisor integration",
    description: "Exercise one persisted EVALUATOR episode.",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    tags: ["nodejs"],
    dependsOn: [],
    verify: [],
    commentAuthor: null,
    commentBody: null,
  });
}

async function commitTarget(root: string): Promise<void> {
  await mkdir(path.join(root, "src"), { recursive: true });
  await writeFile(
    path.join(root, "src", "evaluated.ts"),
    "export const reviewed = true;\n",
    "utf8",
  );
  await execFileAsync("git", ["add", "--", "src/evaluated.ts"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "feat: evaluator execute fixture"], { cwd: root });
}

async function installFakeCodex(root: string): Promise<string> {
  const bin = path.join(root, "fake-bin");
  await mkdir(bin, { recursive: true });
  const result = JSON.stringify({
    schema_version: 1,
    kind: "evaluator_result",
    evaluator_id: "recovery-context",
    verdict: "pass",
    findings: [],
    missing_tests: [],
    hidden_assumptions: [],
  });
  const source = [
    "#!/usr/bin/env node",
    "process.stdin.resume();",
    "process.stdin.on('end', () => {",
    "  process.stdout.write(JSON.stringify({ type: 'session.started' }) + '\\n');",
    `  process.stdout.write(JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: ${JSON.stringify(result)} } }) + '\\n');`,
    "  process.stdout.write(JSON.stringify({ type: 'turn.completed', usage: { input_tokens: 100, output_tokens: 30, reasoning_output_tokens: 20 } }) + '\\n');",
    "});",
    "",
  ].join("\n");
  const command = path.join(bin, "codex");
  await writeFile(command, source, "utf8");
  await chmod(command, 0o755);
  return bin;
}

async function replaceCodexWithFailure(fakeBin: string): Promise<void> {
  await writeFile(path.join(fakeBin, "codex"), "#!/bin/sh\nexit 99\n", "utf8");
  await chmod(path.join(fakeBin, "codex"), 0o755);
}

async function runWithFakeCodex(root: string, taskId: string, fakeBin: string) {
  const previous = process.env.PATH;
  process.env.PATH = `${fakeBin}${path.delimiter}${previous ?? ""}`;
  try {
    const io = captureStdIO();
    try {
      const code = await runCli(["evaluator", "execute", taskId, "--json", "--root", root]);
      return { code, stdout: io.stdout, stderr: io.stderr };
    } finally {
      io.restore();
    }
  } finally {
    if (previous === undefined) delete process.env.PATH;
    else process.env.PATH = previous;
  }
}

describe("evaluator execute supervisor episode", () => {
  it("persists one bounded EVALUATOR episode and applies its durable result", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE01";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);

    const execution = await runWithFakeCodex(root, taskId, fakeBin);

    expect(execution.code).toBe(0);
    expect(execution.stderr).toBe("");
    const payload = JSON.parse(execution.stdout) as {
      verdict: string;
      supervisor_episode: {
        status: string;
        cursor: { phase: string };
        usage: { episodes: number; agent_runs: number; total_tokens: number };
      };
    };
    expect(payload).toMatchObject({
      verdict: "pass",
      supervisor_episode: {
        status: "running",
        cursor: { phase: "ready" },
        usage: { episodes: 1, agent_runs: 1, total_tokens: 150 },
      },
    });
    const stored = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(stored.frontmatter.quality_review).toMatchObject({
      state: "pass",
      updated_by: "EVALUATOR",
    });
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const journal = await createSupervisorEpisodeStore(journalPath).read();
    expect(journal).toMatchObject({
      status: "running",
      cursor: { phase: "ready", operation_key: null },
      usage: { episodes: 1, agent_runs: 1, total_tokens: 150 },
      operations: [{ role: "EVALUATOR", kind: "evaluator_episode", status: "completed" }],
    });
    expect(JSON.stringify(journal)).not.toContain("evaluator_result");
  });

  it("resumes a completed evaluator outcome without launching Codex again", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE02";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);
    const initial = await runWithFakeCodex(root, taskId, fakeBin);
    expect(initial.code).toBe(0);

    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const advanced = validateSupervisorExecutionEpisodeJournal(await store.read());
    const operation = advanced.operations.at(-1);
    if (!operation?.work_order_ref) throw new Error("missing evaluator work order reference");
    const created = createSupervisorExecutionEpisodeJournal({
      task_id: taskId,
      task_revision: advanced.task_revision,
      state_fingerprint_digest: operation.precondition_fingerprint_digest,
      budget: advanced.budget,
    });
    const started = startSupervisorExecutionEpisode({
      journal: created,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { resume: operation.work_order_ref },
      precondition_fingerprint_digest: operation.precondition_fingerprint_digest,
      authority_ref: operation.authority_ref,
      authority_digest: operation.authority_digest,
      work_order_ref: operation.work_order_ref,
      effect_ref: operation.effect_ref,
    });
    if (started.status !== "started") throw new Error("expected evaluator fixture intent");
    await store.write(
      completeSupervisorExecutionEpisode({
        journal: started.journal,
        operation_key: started.operation_key,
        result: { persisted: true },
        usage: { input_tokens: 100, output_tokens: 50, total_tokens: 150 },
      }),
    );
    await replaceCodexWithFailure(fakeBin);

    const resumed = await runWithFakeCodex(root, taskId, fakeBin);

    expect(resumed.code).toBe(0);
    expect(JSON.parse(resumed.stdout)).toMatchObject({
      verdict: "pass",
      supervisor_episode: { cursor: { phase: "ready" }, usage: { total_tokens: 150 } },
    });
  });

  it("completes an evaluator intent from its durable outcome without launching Codex again", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE03";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);
    const initial = await runWithFakeCodex(root, taskId, fakeBin);
    expect(initial.code).toBe(0);

    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const advanced = validateSupervisorExecutionEpisodeJournal(await store.read());
    const operation = advanced.operations.at(-1);
    if (!operation?.work_order_ref) throw new Error("missing evaluator work order reference");
    const created = createSupervisorExecutionEpisodeJournal({
      task_id: taskId,
      task_revision: advanced.task_revision,
      state_fingerprint_digest: operation.precondition_fingerprint_digest,
      budget: advanced.budget,
    });
    const started = startSupervisorExecutionEpisode({
      journal: created,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { resume: operation.work_order_ref },
      precondition_fingerprint_digest: operation.precondition_fingerprint_digest,
      authority_ref: operation.authority_ref,
      authority_digest: operation.authority_digest,
      work_order_ref: operation.work_order_ref,
      effect_ref: operation.effect_ref,
    });
    if (started.status !== "started") throw new Error("expected evaluator fixture intent");
    await store.write(started.journal);
    await replaceCodexWithFailure(fakeBin);

    const resumed = await runWithFakeCodex(root, taskId, fakeBin);

    expect(resumed.code).toBe(0);
    expect(JSON.parse(resumed.stdout)).toMatchObject({
      verdict: "pass",
      supervisor_episode: { cursor: { phase: "ready" }, usage: { total_tokens: 150 } },
    });
  });
});
