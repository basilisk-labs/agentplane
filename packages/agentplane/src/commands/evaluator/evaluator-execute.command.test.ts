import { execFile } from "node:child_process";
import { chmod, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import {
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  recoverSupervisorExecutionEpisodeJournal,
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
  const source = [
    "#!/usr/bin/env node",
    "const fs = require('node:fs');",
    "let prompt = '';",
    "process.stdin.setEncoding('utf8');",
    "process.stdin.on('data', (chunk) => { prompt += chunk; });",
    "process.stdin.on('end', () => {",
    "  const workOrderMatch = prompt.match(/^- work_order: (.+)$/m);",
    "  if (!workOrderMatch) process.exit(1);",
    "  const workOrder = JSON.parse(fs.readFileSync(workOrderMatch[1], 'utf8'));",
    "  const evidence = workOrder.evidence.find((entry) => entry.kind === 'actual_diff');",
    "  if (!evidence) process.exit(1);",
    "  const result = { schema_version: 1, kind: 'evaluator_result', evaluator_id: 'recovery-context', verdict: 'pass', findings: [{ id: 'fixture-pass', severity: 'low', summary: 'Fixture verifies the persisted EVALUATOR result path.', broken_invariant: 'Pass reviews require one evidence-backed finding.', evidence_refs: [{ path: evidence.path }] }], missing_tests: [], hidden_assumptions: [] };",
    "  process.stdout.write(JSON.stringify({ type: 'session.started' }) + '\\n');",
    "  process.stdout.write(JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: JSON.stringify(result) } }) + '\\n');",
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

async function runWithFakeCodex(
  root: string,
  taskId: string,
  fakeBin: string,
  executeArgs: string[] = [],
) {
  const previous = process.env.PATH;
  process.env.PATH = `${fakeBin}${path.delimiter}${previous ?? ""}`;
  try {
    const io = captureStdIO();
    try {
      const code = await runCli([
        "evaluator",
        "execute",
        taskId,
        ...executeArgs,
        "--json",
        "--root",
        root,
      ]);
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

  it("starts a new evaluator episode after a completed stale-state stop", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE05";
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
    const readyBeforeStateChange = validateSupervisorExecutionEpisodeJournal(await store.read());
    expect(readyBeforeStateChange).toMatchObject({
      status: "running",
      stop: null,
      cursor: { phase: "ready", operation_key: null },
      usage: { episodes: 1, agent_runs: 1 },
    });

    const docIo = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "doc",
          "set",
          taskId,
          "--section",
          "Findings",
          "--text",
          "Task state changed after the first evaluator episode.",
          "--updated-by",
          "CODER",
          "--root",
          root,
        ]),
      ).toBe(0);
    } finally {
      docIo.restore();
    }

    // task doc set changes the routed fingerprint but does not create a
    // stopped journal. A successful retry must therefore take the
    // stale-state branch returned by this command's own start attempt.
    expect(validateSupervisorExecutionEpisodeJournal(await store.read())).toEqual(
      readyBeforeStateChange,
    );

    const repeated = await runWithFakeCodex(root, taskId, fakeBin);

    expect(repeated.code, repeated.stderr).toBe(0);
    expect(JSON.parse(repeated.stdout)).toMatchObject({
      verdict: "pass",
      supervisor_episode: {
        status: "running",
        cursor: { phase: "ready", operation_key: null },
        usage: { episodes: 2, agent_runs: 2, total_tokens: 300 },
      },
    });
    expect(validateSupervisorExecutionEpisodeJournal(await store.read())).toMatchObject({
      status: "running",
      usage: { episodes: 2, agent_runs: 2, total_tokens: 300 },
      operations: [
        { role: "EVALUATOR", kind: "evaluator_episode", status: "completed" },
        { role: "EVALUATOR", kind: "evaluator_episode", status: "completed" },
      ],
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

  it("records a known read-only provider failure without reopening its intent", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607280000-EE04";
    await addTask(root, taskId);
    await commitTarget(root);
    const fakeBin = await installFakeCodex(root);
    await replaceCodexWithFailure(fakeBin);

    const failed = await runWithFakeCodex(root, taskId, fakeBin);
    expect(failed.code).toBe(8);
    expect(failed.stderr).toContain(
      "Codex evaluator provider failed before returning a typed result",
    );
    expect(failed.stderr).toContain("classification=nonzero_exit exit_code=99 signal=none");

    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    const recorded = validateSupervisorExecutionEpisodeJournal(await store.read());
    expect(recorded).toMatchObject({
      status: "stopped",
      stop: { reason: "operation_failed" },
      cursor: { phase: "stopped" },
      usage: { episodes: 1, agent_runs: 1 },
      operations: [{ role: "EVALUATOR", kind: "evaluator_episode", status: "failed" }],
    });
    expect(JSON.stringify(recorded)).not.toContain("provider diagnostics");

    const retry = await runWithFakeCodex(root, taskId, fakeBin);
    expect(retry.code).toBe(8);
    const afterRetry = validateSupervisorExecutionEpisodeJournal(await store.read());
    expect(afterRetry.usage).toMatchObject({ episodes: 1, agent_runs: 1 });

    await installFakeCodex(root);
    const replacement = await runWithFakeCodex(root, taskId, fakeBin, ["--replacement"]);
    expect(replacement.code, replacement.stderr).toBe(0);
    expect(JSON.parse(replacement.stdout)).toMatchObject({
      verdict: "pass",
      supervisor_episode: {
        status: "running",
        cursor: { phase: "ready", operation_key: null },
        usage: { episodes: 2, agent_runs: 2, total_tokens: 150 },
      },
    });
    const replaced = validateSupervisorExecutionEpisodeJournal(await store.read());
    expect(replaced.operations[0]).toEqual(recorded.operations[0]);
    expect(replaced).toMatchObject({
      operations: [
        { status: "failed" },
        {
          role: "EVALUATOR",
          kind: "evaluator_episode",
          status: "completed",
          replacement_of_operation_key: recorded.operations[0]?.operation_key,
        },
      ],
    });

    const interrupted = startSupervisorExecutionEpisode({
      journal: createSupervisorExecutionEpisodeJournal({
        task_id: taskId,
        task_revision: replaced.task_revision,
        state_fingerprint_digest: replaced.state_fingerprint_digest,
        budget: replaced.budget,
      }),
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { fixture: "interrupted" },
      precondition_fingerprint_digest: replaced.state_fingerprint_digest,
    });
    if (interrupted.status !== "started") throw new Error("expected interrupted evaluator intent");
    await store.write(
      recoverSupervisorExecutionEpisodeJournal({
        journal: interrupted.journal,
        state_fingerprint_digest: replaced.state_fingerprint_digest,
      }),
    );
    const effectInDoubtReplacement = await runWithFakeCodex(root, taskId, fakeBin, [
      "--replacement",
    ]);
    expect(effectInDoubtReplacement.code).toBe(2);
    expect(effectInDoubtReplacement.stderr).toContain(
      "requires a terminal operation_failed journal",
    );

    const budgetLimited = createSupervisorExecutionEpisodeJournal({
      task_id: taskId,
      task_revision: replaced.task_revision,
      state_fingerprint_digest: replaced.state_fingerprint_digest,
      budget: { ...replaced.budget, max_episodes: 1, max_agent_runs: 1 },
    });
    const exhaustedIntent = startSupervisorExecutionEpisode({
      journal: budgetLimited,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { fixture: "budget-limited" },
      precondition_fingerprint_digest: replaced.state_fingerprint_digest,
    });
    if (exhaustedIntent.status !== "started") throw new Error("expected budget-limited intent");
    await store.write(
      completeSupervisorExecutionEpisode({
        journal: exhaustedIntent.journal,
        operation_key: exhaustedIntent.operation_key,
        result: { fixture: "provider-failed" },
        failed: true,
      }),
    );
    const exhaustedReplacement = await runWithFakeCodex(root, taskId, fakeBin, ["--replacement"]);
    expect(exhaustedReplacement.code).toBe(2);
    expect(exhaustedReplacement.stderr).toContain("requires a terminal operation_failed journal");
  });
});
