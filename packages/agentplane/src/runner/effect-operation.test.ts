import { execFile as execFileCallback } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import os from "node:os";
import path from "node:path";

import { buildStateFingerprint, type StateFingerprintPolicy } from "@agentplaneorg/core/schemas";
import { afterEach, describe, expect, it } from "vitest";

import {
  advanceRunnerEffectJournal,
  prepareRunnerEffectOperation,
  resolveRunnerEffectOperationPaths,
  startRunnerEffectOperation,
} from "./effect-operation.js";
import { ensureStableRunnerArtifactDirectoryChain } from "./run-directory-boundary.js";
import type {
  RunnerContextBundle,
  RunnerInvocation,
  RunnerStateFingerprintRecord,
} from "./types.js";

const tempRoots: string[] = [];
const execFileAsync = promisify(execFileCallback);

afterEach(async () => {
  await Promise.all(
    tempRoots.splice(0).map(async (root) => await rm(root, { recursive: true, force: true })),
  );
});

const FINGERPRINT_POLICY: StateFingerprintPolicy = {
  required_components: [],
  provider: { required: false, unavailable: "allow_if_unchanged" },
};

function stateFingerprint(taskId: string, revision = 1): RunnerStateFingerprintRecord {
  const fingerprint = buildStateFingerprint({
    task_id: taskId,
    task_revision: revision,
    git_head: "0123456789abcdef0123456789abcdef01234567",
    worktree: "/workspace",
    components: {
      task: { state: "present", source: "test", value: { revision } },
      git: { state: "present", source: "test", value: { head: "01234567" } },
      backend_projection: { state: "present", source: "test", value: { revision } },
      policy: { state: "present", source: "test", value: { version: 1 } },
      blueprint: { state: "present", source: "test", value: { id: "code.branch_pr" } },
      knowledge: { state: "present", source: "test", value: { refs: [] } },
      provider: { state: "present", source: "test", value: { state: "local" } },
      authority: { state: "present", source: "test", value: { scope: "task" } },
    },
  });
  return {
    schema_version: 1,
    kind: "runner_state_fingerprint_record",
    outcome: "prepared",
    precondition_fingerprint: fingerprint,
    precondition_policy: FINGERPRINT_POLICY,
    state_before: null,
    state_after: null,
    precondition: null,
    effect_applied: null,
    post_state_reason_code: null,
  };
}

function bundle(taskId: string): RunnerContextBundle {
  return {
    target: { kind: "task", task_id: taskId },
    task: { task_id: taskId },
  } as RunnerContextBundle;
}

function invocation(root: string, taskId: string, runId: string): RunnerInvocation {
  const runDir = path.join(root, "agentplane", "runner", "tasks", taskId, "runs", runId);
  return {
    adapter_id: "custom",
    run_id: runId,
    work_order_id: "work-order-effect-operation",
    repository_root: root,
    artifact_root: root,
    run_dir: runDir,
    bundle_path: path.join(runDir, "bundle.json"),
    state_path: path.join(runDir, "run-state.json"),
    events_path: path.join(runDir, "events.jsonl"),
    result_path: path.join(runDir, "result.json"),
    receipt_path: path.join(runDir, "execution-receipt.json"),
    trace_path: path.join(runDir, "agent-trace.jsonl"),
    stderr_path: path.join(runDir, "stderr.log"),
    trace_policy: {
      mode: "off",
      max_tail_bytes: 0,
      capture_stderr: false,
    },
    timeout_policy: {
      wall_clock_ms: 0,
      idle_ms: 0,
      terminate_grace_ms: 0,
    },
    argv: ["custom-runner", "--task", taskId],
    env: {},
    dry_run: false,
  };
}

async function prepareRunDirectory(input: RunnerInvocation): Promise<void> {
  await mkdir(input.run_dir, { recursive: true, mode: 0o700 });
}

async function waitForBarrier(root: string, expected: number): Promise<void> {
  for (let attempt = 0; attempt < 400; attempt += 1) {
    const entries = await readdir(root);
    if (entries.filter((entry) => entry.startsWith("ready-")).length === expected) return;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error("Independent runner effect processes did not reach the synchronization barrier.");
}

describe("runner effect operation journal", () => {
  it("accepts independent creation of one shared operation directory chain", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-effect-directory-race-"));
    tempRoots.push(root);
    const operationDirectory = path.join(
      root,
      "agentplane",
      "runner",
      "tasks",
      "202607270705-EFFECT",
      "effect-operations",
      "shared-operation",
    );

    await Promise.all(
      Array.from(
        { length: 3 },
        async () => await ensureStableRunnerArtifactDirectoryChain(root, operationDirectory),
      ),
    );

    expect(await readdir(path.dirname(operationDirectory))).toContain("shared-operation");
  });

  it("elects one concurrent start winner and refuses every later spawn", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-effect-race-"));
    tempRoots.push(root);
    const taskId = "202607270700-EFFECT";
    const first = invocation(root, taskId, "run-first");
    const second = invocation(root, taskId, "run-second");
    const fingerprint = stateFingerprint(taskId);
    await Promise.all([prepareRunDirectory(first), prepareRunDirectory(second)]);

    const results = await Promise.allSettled([
      startRunnerEffectOperation({
        bundle: bundle(taskId),
        invocation: first,
        state_fingerprint: fingerprint,
      }),
      startRunnerEffectOperation({
        bundle: bundle(taskId),
        invocation: second,
        state_fingerprint: fingerprint,
      }),
    ]);
    const winner = results.find(
      (
        result,
      ): result is PromiseFulfilledResult<Awaited<ReturnType<typeof startRunnerEffectOperation>>> =>
        result.status === "fulfilled",
    );
    expect(winner).toBeDefined();
    expect(results.filter((result) => result.status === "fulfilled")).toHaveLength(1);
    expect(winner?.value.journal.phase).toBe("started");
    await expect(
      startRunnerEffectOperation({
        bundle: bundle(taskId),
        invocation: first,
        state_fingerprint: fingerprint,
      }),
    ).rejects.toMatchObject({ context: { reason: "runner_effect_operation_not_spawnable" } });
  });

  it("elects one adapter spawn across independent supervisor processes", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-effect-process-race-"));
    tempRoots.push(root);
    const taskId = "202607270706-EFFECT";
    const barrier = path.join(root, "barrier");
    const workerPath = path.join(root, "effect-worker.mjs");
    await mkdir(barrier, { recursive: true });
    const effectModuleUrl = new URL("effect-operation.ts", import.meta.url).href;
    const fingerprintModuleUrl = new URL(
      "../../../core/src/runner/state-fingerprint.ts",
      import.meta.url,
    ).href;
    await writeFile(
      workerPath,
      `import { access, mkdir, writeFile } from "node:fs/promises";\n` +
        `import path from "node:path";\n` +
        `import { startRunnerEffectOperation } from ${JSON.stringify(effectModuleUrl)};\n` +
        `import { buildStateFingerprint } from ${JSON.stringify(fingerprintModuleUrl)};\n` +
        `const [root, taskId, runId, barrier] = process.argv.slice(2);\n` +
        `const runDir = path.join(root, "agentplane", "runner", "tasks", taskId, "runs", runId);\n` +
        `await mkdir(runDir, { recursive: true, mode: 0o700 });\n` +
        `await writeFile(path.join(barrier, "ready-" + runId), "\\n");\n` +
        `for (let attempt = 0; attempt < 400; attempt += 1) { try { await access(path.join(barrier, "go")); break; } catch { await new Promise((resolve) => setTimeout(resolve, 10)); } }\n` +
        `const fingerprint = buildStateFingerprint({ task_id: taskId, task_revision: 1, git_head: "0123456789abcdef0123456789abcdef01234567", worktree: "/workspace", components: { task: { state: "present", source: "test", value: { revision: 1 } }, git: { state: "present", source: "test", value: { head: "01234567" } }, backend_projection: { state: "present", source: "test", value: { revision: 1 } }, policy: { state: "present", source: "test", value: { version: 1 } }, blueprint: { state: "present", source: "test", value: { id: "code.branch_pr" } }, knowledge: { state: "present", source: "test", value: { refs: [] } }, provider: { state: "present", source: "test", value: { state: "local" } }, authority: { state: "present", source: "test", value: { scope: "task" } } } });\n` +
        `const state = { schema_version: 1, kind: "runner_state_fingerprint_record", outcome: "prepared", precondition_fingerprint: fingerprint, precondition_policy: { required_components: [], provider: { required: false, unavailable: "allow_if_unchanged" } }, state_before: null, state_after: null, precondition: null, effect_applied: null, post_state_reason_code: null };\n` +
        `const invocation = { adapter_id: "custom", run_id: runId, work_order_id: "work-order-effect-operation", repository_root: root, artifact_root: root, run_dir: runDir, bundle_path: path.join(runDir, "bundle.json"), state_path: path.join(runDir, "run-state.json"), events_path: path.join(runDir, "events.jsonl"), result_path: path.join(runDir, "result.json"), receipt_path: path.join(runDir, "execution-receipt.json"), trace_path: path.join(runDir, "agent-trace.jsonl"), stderr_path: path.join(runDir, "stderr.log"), trace_policy: { mode: "off", max_tail_bytes: 0, capture_stderr: false }, timeout_policy: { wall_clock_ms: 0, idle_ms: 0, terminate_grace_ms: 0 }, argv: ["custom-runner", "--task", taskId], env: {}, dry_run: false };\n` +
        `try { const started = await startRunnerEffectOperation({ bundle: { target: { kind: "task", task_id: taskId }, task: { task_id: taskId } }, invocation, state_fingerprint: state }); await writeFile(path.join(barrier, "adapter-spawns.jsonl"), JSON.stringify({ runId, operation_key: started.operation.operation_key }) + "\\n", { flag: "a" }); console.log(JSON.stringify({ status: "winner", operation_key: started.operation.operation_key })); } catch (error) { console.log(JSON.stringify({ status: "loser", reason: error instanceof Error ? error.message : String(error) })); }\n`,
      "utf8",
    );
    const first = execFileAsync("bun", [workerPath, root, taskId, "run-first", barrier], {
      cwd: root,
      encoding: "utf8",
    });
    const second = execFileAsync("bun", [workerPath, root, taskId, "run-second", barrier], {
      cwd: root,
      encoding: "utf8",
    });
    await waitForBarrier(barrier, 2);
    await writeFile(path.join(barrier, "go"), "\n");
    const [firstResult, secondResult] = await Promise.all([first, second]);
    const outcomes = [firstResult.stdout, secondResult.stdout].map(
      (output) =>
        JSON.parse(output.trim()) as { status: string; operation_key?: string; reason?: string },
    );
    const outcomeSummary = JSON.stringify(outcomes);
    expect(
      outcomes.filter((outcome) => outcome.status === "winner"),
      outcomeSummary,
    ).toHaveLength(1);
    expect(
      outcomes.filter((outcome) => outcome.status === "loser"),
      outcomeSummary,
    ).toHaveLength(1);
    const spawnLog = await readFile(path.join(barrier, "adapter-spawns.jsonl"), "utf8");
    const spawns = spawnLog
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as { operation_key: string });
    expect(spawns).toHaveLength(1);
    expect(spawns[0]?.operation_key).toBe(
      outcomes.find((outcome) => outcome.status === "winner")?.operation_key,
    );
  });

  it("reuses only an effect-bearing replay source and marks legacy or prepared sources fresh", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-effect-replay-"));
    tempRoots.push(root);
    const taskId = "202607270701-EFFECT";
    const source = invocation(root, taskId, "run-source");
    const replay = invocation(root, taskId, "run-replay");
    const fingerprint = stateFingerprint(taskId);
    await Promise.all([prepareRunDirectory(source), prepareRunDirectory(replay)]);

    const preparedSource = await prepareRunnerEffectOperation({
      bundle: bundle(taskId),
      invocation: source,
      state_fingerprint: fingerprint,
    });
    const preparedReplay = await prepareRunnerEffectOperation({
      bundle: bundle(taskId),
      invocation: replay,
      state_fingerprint: stateFingerprint(taskId, 2),
      source_run_id: source.run_id,
    });
    expect(preparedReplay.operation.operation_key).not.toBe(preparedSource.operation.operation_key);
    expect(preparedReplay.operation.origin_run_id).toBe(replay.run_id);
    expect(preparedReplay.operation.replay_source).toEqual({
      source_run_id: source.run_id,
      destination_run_id: replay.run_id,
      disposition: "prepared_fresh",
    });

    const startedSource = await startRunnerEffectOperation({
      bundle: bundle(taskId),
      invocation: source,
      state_fingerprint: fingerprint,
    });
    const effectReplay = invocation(root, taskId, "run-effect-replay");
    await prepareRunDirectory(effectReplay);
    const effectReplayPrepared = await prepareRunnerEffectOperation({
      bundle: bundle(taskId),
      invocation: effectReplay,
      state_fingerprint: stateFingerprint(taskId, 3),
      source_run_id: source.run_id,
    });
    expect(effectReplayPrepared.operation.operation_key).toBe(
      startedSource.operation.operation_key,
    );
    expect(effectReplayPrepared.operation.origin_run_id).toBe(source.run_id);

    const legacyReplay = invocation(root, taskId, "run-legacy-replay");
    await prepareRunDirectory(legacyReplay);
    const legacy = await prepareRunnerEffectOperation({
      bundle: bundle(taskId),
      invocation: legacyReplay,
      state_fingerprint: fingerprint,
      source_run_id: "run-legacy-source",
    });
    expect(legacy.operation.replay_source).toEqual({
      source_run_id: "run-legacy-source",
      destination_run_id: legacyReplay.run_id,
      disposition: "legacy_fresh",
    });
    expect(legacy.operation.operation_key).not.toBe(preparedSource.operation.operation_key);
  });

  it("rejects a tampered operation reference before an adapter can be started", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-effect-tamper-"));
    tempRoots.push(root);
    const taskId = "202607270702-EFFECT";
    const input = invocation(root, taskId, "run-tamper");
    const fingerprint = stateFingerprint(taskId);
    await prepareRunDirectory(input);
    const prepared = await prepareRunnerEffectOperation({
      bundle: bundle(taskId),
      invocation: input,
      state_fingerprint: fingerprint,
    });
    const paths = resolveRunnerEffectOperationPaths({
      run_dir: input.run_dir,
      operation_key: prepared.operation.operation_key,
    });
    const reference = JSON.parse(await readFile(paths.run_ref_path, "utf8")) as Record<
      string,
      unknown
    >;
    await writeFile(
      paths.run_ref_path,
      `${JSON.stringify({ ...reference, digest: prepared.operation.digest })}\n`,
    );

    await expect(
      startRunnerEffectOperation({
        bundle: bundle(taskId),
        invocation: input,
        state_fingerprint: fingerprint,
      }),
    ).rejects.toThrow("Runner effect operation reference");
  });

  it.each([
    {
      label: "operation authority digest",
      target: "operation" as const,
      mutate: (value: Record<string, unknown>) => ({
        ...value,
        authority_digest: "sha256:0000000000000000000000000000000000000000000000000000000000000000",
      }),
    },
    {
      label: "journal claim generation",
      target: "journal" as const,
      mutate: (value: Record<string, unknown>) => ({
        ...value,
        claim_generation: "sha256:0000000000000000000000000000000000000000000000000000000000000000",
      }),
    },
    {
      label: "feature marker claim generation",
      target: "reference" as const,
      mutate: (value: Record<string, unknown>) => ({
        ...value,
        claim_generation: "sha256:0000000000000000000000000000000000000000000000000000000000000000",
      }),
    },
  ])("rejects tampered $label before creating a start claim", async ({ target, mutate }) => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-effect-tamper-field-"));
    tempRoots.push(root);
    const taskId = "202607270705-EFFECT";
    const input = invocation(root, taskId, `run-${target}`);
    await prepareRunDirectory(input);
    const prepared = await prepareRunnerEffectOperation({
      bundle: bundle(taskId),
      invocation: input,
      state_fingerprint: stateFingerprint(taskId),
    });
    const paths = resolveRunnerEffectOperationPaths({
      run_dir: input.run_dir,
      operation_key: prepared.operation.operation_key,
    });
    const targetPath =
      target === "operation"
        ? paths.operation_path
        : target === "journal"
          ? paths.journal_path
          : paths.run_ref_path;
    const original = JSON.parse(await readFile(targetPath, "utf8")) as Record<string, unknown>;
    await writeFile(targetPath, `${JSON.stringify(mutate(original))}\n`, "utf8");

    await expect(
      startRunnerEffectOperation({
        bundle: bundle(taskId),
        invocation: input,
        state_fingerprint: stateFingerprint(taskId),
      }),
    ).rejects.toThrow();
    await expect(readFile(paths.claim_path, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("distinguishes supervisor single-spawn from a native forwarded provider key", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-effect-provider-key-"));
    tempRoots.push(root);
    const taskId = "202607270704-EFFECT";
    const unsupported = invocation(root, taskId, "run-supervisor-only");
    const forwarded = invocation(root, taskId, "run-provider-key");
    await Promise.all([prepareRunDirectory(unsupported), prepareRunDirectory(forwarded)]);

    const supervisorOnly = await prepareRunnerEffectOperation({
      bundle: bundle(taskId),
      invocation: unsupported,
      state_fingerprint: stateFingerprint(taskId),
    });
    expect(supervisorOnly.operation.enforcement).toBe("supervisor_single_spawn");
    expect(unsupported.env.AGENTPLANE_RUNNER_EFFECT_IDEMPOTENCY_KEY).toBeUndefined();

    const providerForwardingBundle = bundle(taskId);
    providerForwardingBundle.execution = {
      adapter_capabilities: {
        adapter_id: "custom",
        fields: {
          effect_idempotency_key: {
            level: "native",
            channel: "env",
            note: "Test adapter forwards the exact key to its provider request.",
          },
        },
      },
    } as RunnerContextBundle["execution"];
    const providerForwarded = await prepareRunnerEffectOperation({
      bundle: providerForwardingBundle,
      invocation: forwarded,
      state_fingerprint: stateFingerprint(taskId),
    });
    expect(providerForwarded.operation.enforcement).toBe("provider_key_forwarded");
    expect(forwarded.env.AGENTPLANE_RUNNER_EFFECT_IDEMPOTENCY_KEY).toBe(
      providerForwarded.operation.idempotency_key,
    );
    expect(providerForwarded.reference.enforcement).toBe("provider_key_forwarded");
  });

  it("records a forward-only terminal journal phase", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-effect-terminal-"));
    tempRoots.push(root);
    const taskId = "202607270703-EFFECT";
    const input = invocation(root, taskId, "run-terminal");
    await prepareRunDirectory(input);
    const started = await startRunnerEffectOperation({
      bundle: bundle(taskId),
      invocation: input,
      state_fingerprint: stateFingerprint(taskId),
    });
    const accepted = await advanceRunnerEffectJournal({
      session: started,
      phase: "accepted",
      evidence: { code: "test_post_state_observed" },
    });
    expect(accepted.phase).toBe("accepted");
    await expect(
      advanceRunnerEffectJournal({
        session: started,
        phase: "effect_unknown",
        evidence: { code: "test_downgrade" },
      }),
    ).rejects.toMatchObject({ context: { reason: "runner_effect_journal_downgrade" } });
  });
});
