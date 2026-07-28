import { existsSync } from "node:fs";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";

import { evaluateStateFingerprintPrecondition } from "@agentplaneorg/core/schemas";
import { afterEach, describe, expect, it, vi } from "vitest";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { advanceRunnerEffectJournal, startRunnerEffectOperation } from "../effect-operation.js";
import { evolveRunnerRunState, writeRunnerRunState } from "../artifacts.js";
import { RunnerRunRepository } from "../run-repository.js";
import * as stableFile from "../stable-file.js";
import { readTaskRunnerActiveClaim } from "./task-run-active-claim.js";
import {
  configureCustomRunner,
  createDoingTask,
  mkGitRepoRoot,
  staleClaim,
  writeActiveClaim,
} from "./task-run-active-claim.testkit.js";
import { prepareTaskRunnerExecution } from "./task-run.js";
import {
  acceptLegacyTaskRunnerEffect,
  resolveTaskRunnerEffect,
} from "./task-run-effect-resolution.js";
import { resumeTaskRunnerEffectExecution } from "./task-run-lifecycle.js";
import { recordFailedExternalRunnerAnchor } from "./task-run-lifecycle.testkit.js";

const roots: string[] = [];

afterEach(async () => {
  await Promise.all(
    roots.splice(0).map(async (root) => await rm(root, { recursive: true, force: true })),
  );
});

async function uncertainEffectFixture() {
  const root = await mkGitRepoRoot("agentplane-effect-resolution-");
  roots.push(root);
  const adapterMarker = path.join(root, "adapter-invoked");
  await configureCustomRunner({
    root,
    script_lines: ["#!/bin/sh", `touch ${JSON.stringify(adapterMarker)}`, "exit 0"],
  });
  const taskId = await createDoingTask(root, "resolve uncertain effect");
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  const prepared = await prepareTaskRunnerExecution({
    ctx,
    cwd: root,
    rootOverride: root,
    task_id: taskId,
    mode: "execute",
    run_id: "run-effect-resolution",
  });
  const stateFingerprint = prepared.state.state_fingerprint;
  const preconditionFingerprint = prepared.precondition_fingerprint;
  const preconditionPolicy = prepared.precondition_policy;
  if (!stateFingerprint || !preconditionFingerprint || !preconditionPolicy) {
    throw new Error("Fixture did not create state-fingerprint authority.");
  }
  const started = await startRunnerEffectOperation({
    bundle: prepared.bundle,
    invocation: prepared.invocation,
    state_fingerprint: stateFingerprint,
  });
  await advanceRunnerEffectJournal({
    session: started,
    phase: "effect_unknown",
    evidence: { code: "fixture_uncertain_effect", digest: null },
  });
  const at = "2026-07-27T01:00:00.000Z";
  await writeRunnerRunState({
    state_path: prepared.invocation.state_path,
    state: evolveRunnerRunState({
      state: prepared.state,
      status: "failed",
      updated_at: at,
      result: {
        status: "failed",
        exit_code: 1,
        started_at: at,
        ended_at: at,
        stderr_summary: "simulated transport loss after durable provider start",
      },
      effect_operation: started.reference,
      state_fingerprint: {
        ...stateFingerprint,
        outcome: "effect_unknown",
        precondition_fingerprint: preconditionFingerprint,
        precondition_policy: preconditionPolicy,
        state_before: preconditionFingerprint,
        state_after: null,
        precondition: evaluateStateFingerprintPrecondition({
          expected: preconditionFingerprint,
          current: preconditionFingerprint,
          policy: preconditionPolicy,
        }),
        effect_applied: null,
        post_state_reason_code: null,
      },
    }),
  });
  const claim = staleClaim({
    task_id: taskId,
    run_id: prepared.invocation.run_id,
    generation: "effect-resolution-generation",
  });
  await writeActiveClaim(root, claim);
  return { root, adapterMarker, taskId, ctx, prepared, started, claim };
}

function resolutionInput(fixture: Awaited<ReturnType<typeof uncertainEffectFixture>>) {
  return {
    ctx: fixture.ctx,
    task_id: fixture.taskId,
    run_id: fixture.prepared.invocation.run_id,
    verdict: "applied" as const,
    actor: "operator-1",
    observed_at: "2026-07-27T01:01:00.000Z",
    authority_ref: fixture.started.operation.authority_ref,
    authority_digest: fixture.started.operation.authority_digest,
    precondition_fingerprint_digest: fixture.started.operation.precondition_fingerprint_digest,
    precondition_policy_digest: fixture.started.operation.precondition_policy_digest,
    evidence_ref: "ticket:effect-1",
    evidence_text: "provider audit confirms the effect completed",
    active_claim_generation: fixture.claim.generation,
  };
}

describe("task runner effect resolution", () => {
  it("attaches an operator verdict before exactly-once stale claim retirement without invoking adapter", async () => {
    const fixture = await uncertainEffectFixture();
    const result = await resolveTaskRunnerEffect(resolutionInput(fixture));

    expect(result).toMatchObject({
      verdict: "applied",
      claim_retirement: "retired",
      resolution: { active_claim_generation: fixture.claim.generation },
    });
    expect(existsSync(fixture.adapterMarker)).toBe(false);
    expect(
      await readTaskRunnerActiveClaim({
        git_root: fixture.root,
        workflow_dir: fixture.ctx.config.paths.workflow_dir,
        task_id: fixture.taskId,
        run_id: fixture.prepared.invocation.run_id,
      }),
    ).toBeNull();
    const repository = await RunnerRunRepository.openExistingTaskRun({
      git_root: fixture.root,
      workflow_dir: fixture.ctx.config.paths.workflow_dir,
      task_id: fixture.taskId,
      run_id: fixture.prepared.invocation.run_id,
      storage: "supervisor",
    });
    const state = await repository.readState();
    expect(state?.effect_resolution).toMatchObject({
      verdict: "applied",
      operation_key: fixture.started.operation.operation_key,
    });
    const events = await readFile(repository.paths.events_path, "utf8");
    expect(events.match(/runner_effect_resolved/g)).toHaveLength(1);
  });

  it("converges identical retries and rejects an opposing verdict without an adapter call", async () => {
    const fixture = await uncertainEffectFixture();
    const input = resolutionInput(fixture);
    const first = await resolveTaskRunnerEffect(input);
    const second = await resolveTaskRunnerEffect(input);
    expect(second.resolution.digest).toBe(first.resolution.digest);
    await expect(
      resolveTaskRunnerEffect({ ...input, verdict: "not_applied" }),
    ).rejects.toMatchObject({
      context: { reason: "runner_effect_resolution_intent_conflict" },
    });
    expect(existsSync(fixture.adapterMarker)).toBe(false);
  });

  it("serializes concurrent identical and opposing verdicts without adapter execution", async () => {
    const identicalFixture = await uncertainEffectFixture();
    const identicalInput = resolutionInput(identicalFixture);
    const identical = await Promise.all([
      resolveTaskRunnerEffect(identicalInput),
      resolveTaskRunnerEffect(identicalInput),
    ]);
    expect(identical[0].resolution.digest).toBe(identical[1].resolution.digest);
    const identicalRepository = await RunnerRunRepository.openExistingTaskRun({
      git_root: identicalFixture.root,
      workflow_dir: identicalFixture.ctx.config.paths.workflow_dir,
      task_id: identicalFixture.taskId,
      run_id: identicalFixture.prepared.invocation.run_id,
      storage: "supervisor",
    });
    const identicalEvents = await readFile(identicalRepository.paths.events_path, "utf8");
    expect(identicalEvents.match(/runner_effect_resolved/g)).toHaveLength(1);
    expect(existsSync(identicalFixture.adapterMarker)).toBe(false);

    const opposingFixture = await uncertainEffectFixture();
    const opposingInput = resolutionInput(opposingFixture);
    const opposing = await Promise.allSettled([
      resolveTaskRunnerEffect(opposingInput),
      resolveTaskRunnerEffect({ ...opposingInput, verdict: "not_applied" }),
    ]);
    expect(opposing.filter((result) => result.status === "fulfilled")).toHaveLength(1);
    const rejected = opposing.find((result) => result.status === "rejected");
    expect(rejected?.status).toBe("rejected");
    if (rejected?.status !== "rejected") {
      throw new Error("Expected the opposing resolution to reject.");
    }
    const reason: unknown = rejected.reason;
    expect(reason).toBeInstanceOf(CliError);
    if (!(reason instanceof CliError)) {
      throw new Error("Expected a CliError for the opposing resolution.");
    }
    expect(reason.context?.reason).toBe("runner_effect_resolution_intent_conflict");
    expect(existsSync(opposingFixture.adapterMarker)).toBe(false);
  });

  it("retries an unstable active-claim observation while a concurrent resolution retires it", async () => {
    const fixture = await uncertainEffectFixture();
    const originalRead = stableFile.readStableRegularTextNoFollow;
    let collisionInjected = false;
    let retirementWaitReads = 0;
    const readSpy = vi
      .spyOn(stableFile, "readStableRegularTextNoFollow")
      .mockImplementation(async (...args) => {
        const isRetirementWaitRead =
          args[1] === "runner active claim" &&
          new Error().stack?.includes("waitForConcurrentResolutionRetirement");
        if (isRetirementWaitRead) {
          retirementWaitReads += 1;
          if (!collisionInjected) {
            collisionInjected = true;
            throw new Error(`runner active claim changed while it was being read: ${args[0]}`);
          }
        }
        return await originalRead(...args);
      });

    try {
      const input = resolutionInput(fixture);
      const resolutions = await Promise.all([
        resolveTaskRunnerEffect(input),
        resolveTaskRunnerEffect(input),
      ]);

      expect(resolutions[0].resolution.digest).toBe(resolutions[1].resolution.digest);
      expect(collisionInjected).toBe(true);
      expect(retirementWaitReads).toBeGreaterThanOrEqual(2);
    } finally {
      readSpy.mockRestore();
    }
  });

  it("rejects authority mismatch before creating an intent", async () => {
    const fixture = await uncertainEffectFixture();
    await expect(
      resolveTaskRunnerEffect({
        ...resolutionInput(fixture),
        authority_digest: "sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
      }),
    ).rejects.toMatchObject({
      context: { reason: "runner_effect_resolution_authority_or_fingerprint_mismatch" },
    });
    expect(existsSync(fixture.adapterMarker)).toBe(false);
  });

  it("rejects stale claim generations and evidence-free verdicts before writing resolution intent", async () => {
    const fixture = await uncertainEffectFixture();
    await expect(
      resolveTaskRunnerEffect({
        ...resolutionInput(fixture),
        active_claim_generation: "stale-generation",
      }),
    ).rejects.toMatchObject({
      context: { reason: "runner_effect_resolution_active_claim_generation_mismatch" },
    });
    await expect(
      resolveTaskRunnerEffect({ ...resolutionInput(fixture), evidence_text: "   " }),
    ).rejects.toMatchObject({
      context: { reason: "runner_effect_resolution_evidence_required" },
    });
    expect(existsSync(fixture.adapterMarker)).toBe(false);
  });

  it("permits only a dedicated resume-effect command after not_applied with a fresh operation key", async () => {
    const fixture = await uncertainEffectFixture();
    const resolved = await resolveTaskRunnerEffect({
      ...resolutionInput(fixture),
      verdict: "not_applied",
    });
    await recordFailedExternalRunnerAnchor({
      ctx: fixture.ctx,
      taskId: fixture.taskId,
      prepared: fixture.prepared,
      updatedAt: "2026-07-27T01:02:00.000Z",
    });
    const resumed = await resumeTaskRunnerEffectExecution({
      ctx: fixture.ctx,
      cwd: fixture.root,
      rootOverride: fixture.root,
      task_id: fixture.taskId,
      run_id: fixture.prepared.invocation.run_id,
      new_run_id: "run-effect-resolution-fresh",
    });
    const destination = await RunnerRunRepository.openExistingTaskRun({
      git_root: fixture.root,
      workflow_dir: fixture.ctx.config.paths.workflow_dir,
      task_id: fixture.taskId,
      run_id: resumed.invocation.run_id,
      storage: "supervisor",
    });
    const state = await destination.readState();
    expect(resolved.verdict).toBe("not_applied");
    expect(state?.effect_operation?.operation_key).not.toBe(
      fixture.started.operation.operation_key,
    );
    expect(existsSync(fixture.adapterMarker)).toBe(true);
  });

  it("requires explicit legacy acknowledgement and retains uncertainty when pre-effect authority is absent", async () => {
    const fixture = await uncertainEffectFixture();
    const repository = await RunnerRunRepository.openExistingTaskRun({
      git_root: fixture.root,
      workflow_dir: fixture.ctx.config.paths.workflow_dir,
      task_id: fixture.taskId,
      run_id: fixture.prepared.invocation.run_id,
      storage: "supervisor",
    });
    const state = await repository.readState();
    if (!state) throw new Error("Missing fixture state.");
    const { effect_operation: _effectOperation, ...legacyState } = state;
    await repository.writeState(legacyState);
    const accepted = await acceptLegacyTaskRunnerEffect({
      ctx: fixture.ctx,
      task_id: fixture.taskId,
      run_id: fixture.prepared.invocation.run_id,
      actor: "operator-legacy",
      observed_at: "2026-07-27T01:03:00.000Z",
      evidence_ref: "ticket:legacy-effect",
      evidence_text: "legacy evidence without a pre-effect operation",
    });
    expect(accepted).toMatchObject({
      active_claim_retained: true,
      next_safe_action: "manual_inspection_required",
    });
    expect(
      await readTaskRunnerActiveClaim({
        git_root: fixture.root,
        workflow_dir: fixture.ctx.config.paths.workflow_dir,
        task_id: fixture.taskId,
        run_id: fixture.prepared.invocation.run_id,
      }),
    ).toMatchObject({ generation: fixture.claim.generation });
    expect(existsSync(fixture.adapterMarker)).toBe(false);
  });
});
