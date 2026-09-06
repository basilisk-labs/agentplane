import path from "node:path";
import * as supervisorStore from "../commands/shared/supervisor-execution-episode.js";
import { buildTaskRouteDecision } from "../commands/shared/route-decision.js";
import {
  captureRecoveryCli,
  prepareNativeIntegrationRecovery,
  withFakeConflictGh,
  fakeGithubProviderSource,
} from "./task-advance-effect-recovery.testkit.js";
import { readFile, writeFile } from "node:fs/promises";
import { execFileAsync } from "@agentplaneorg/core/process";
import { mkGitRepoRootWithCommit, writeConfig } from "@agentplane/testkit";
import { expect, vi } from "vitest";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import {
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  recoverSupervisorExecutionEpisodeJournal,
  digestSupervisorEpisodeValue,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../commands/shared/supervisor-execution-episode.js";
import {
  reconcileIntegrationEffect,
  requireIntegrationEffectResolution,
  type WorkflowEffectResolution,
} from "../commands/task/external-agent-workflow-recovery.js";
import {
  writeIntegrationQueue,
  withIntegrationQueueMutex,
} from "../commands/pr/integrate/queue-state.js";
import * as integrationProvider from "../commands/pr/internal/change-request-provider.js";
import type { TaskRouteDecision } from "../commands/shared/route-decision-types.js";
import { defaultConfig } from "./core-imports.js";

export async function exerciseIntegrationEffectRecovery(
  scenario: string,
  native?: Awaited<ReturnType<typeof prepareNativeIntegrationRecovery>>,
): Promise<void> {
  const root = native?.root ?? (await mkGitRepoRootWithCommit());
  if (!native) await writeConfig(root, defaultConfig());
  const checkout = native?.worktree ?? root;
  const command = await loadCommandContext({ cwd: checkout, rootOverride: null });
  const taskId = native?.taskId ?? "202609060001-RECOVER";
  const headResult = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: checkout });
  const head = headResult.stdout.trim();
  const baseHeadResult = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  const baseHead = baseHeadResult.stdout.trim();
  const baseResult = await execFileAsync("git", ["branch", "--show-current"], { cwd: root });
  const base = baseResult.stdout.trim();
  const branch = native?.branch ?? "task/recovery";
  if (!native) await execFileAsync("git", ["branch", branch], { cwd: root });
  const fingerprint = `sha256:${"a".repeat(64)}`;
  const currentFingerprint = `sha256:${"b".repeat(64)}`;
  const identity = {
    branch,
    head_sha: head,
    base,
    base_sha: baseHead,
    pr_number: 4626,
    pr_url: "https://github.com/example/repo/pull/4626",
    provider: {
      provider: "github" as const,
      hostname: "github.com",
      remote: "origin",
      sourceProject: "example/repo",
      targetProject: "example/repo",
      sourceUrl: "https://github.com/example/repo.git",
      targetUrl: "https://github.com/example/repo.git",
    },
  };
  const pr = {
    provider: "github" as const,
    identity: identity.provider,
    prNumber: 4626,
    prUrl: identity.pr_url,
    status: "OPEN" as "OPEN" | "MERGED",
    mergedAt: null as string | null,
    mergeCommit: null as string | null,
    base,
    baseSha: baseHead,
    headSha: head,
    headRef: branch,
  };
  const entry = {
    task_id: taskId,
    branch,
    head_sha: head,
    base,
    base_sha: baseHead,
    pr_number: 4626,
    pr_url: identity.pr_url,
    changed_paths: [],
    priority: 1,
    enqueued_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-02T00:00:00Z",
    status: "queued" as "queued" | "done" | "claimed",
    reason: "Worker stopped before merge",
  };
  let decision = {
    task: { id: taskId },
    workspace: { baseCheckoutPath: root },
    workflowStep: {
      kind: "agent_episode",
      episode: { purpose: "implementation_rework" },
      preconditionFingerprint: { digest: currentFingerprint },
    },
  } as TaskRouteDecision;
  let calls = 0;
  const decide = async () => {
    if (native)
      return await buildTaskRouteDecision({
        ctx: await loadCommandContext({ cwd: checkout, rootOverride: null }),
        cwd: checkout,
        rootOverride: null,
        includeRemote: true,
        freshHead: true,
        taskId,
      });
    calls++;
    if (scenario === "route_race" && calls === 3)
      return {
        ...decision,
        workflowStep: {
          ...decision.workflowStep,
          preconditionFingerprint: { digest: fingerprint },
        },
      } as TaskRouteDecision;
    return decision;
  };
  const effectRef = `integration.run_next:${taskId}:${fingerprint}:${"c".repeat(64)}`;
  const authorityRef = "workflow-operation:integration.run_next";
  const created = createSupervisorExecutionEpisodeJournal({
    task_id: taskId,
    task_revision: 1,
    state_fingerprint_digest: fingerprint,
    budget: {
      max_episodes: 50,
      max_agent_runs: 50,
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
      max_wall_time_ms: null,
      max_changed_files: null,
      max_diff_lines: null,
      max_no_progress_episodes: null,
    },
    now: "2026-01-01T00:00:00Z",
  });
  const typedOperation = {
    id: "integration.run_next",
    type: "integration_run_next",
    params: { taskId },
    preconditionFingerprint: { digest: fingerprint },
    authorityRef: `route:${taskId}:${fingerprint}`,
    idempotencyKey: effectRef,
  };
  const started = startSupervisorExecutionEpisode({
    journal: created,
    role: "EXECUTOR",
    kind: "cli_operation",
    operation_identity: typedOperation,
    precondition_fingerprint_digest: fingerprint,
    authority_ref: authorityRef,
    authority_digest: fingerprint,
    effect_ref: effectRef,
    now: "2026-01-01T00:00:00Z",
    ...(["snapshot", "snapshot_mismatch", "native_snapshot"].includes(scenario)
      ? {
          recovery_context: {
            schema_version: 1,
            kind: "integration_run_next",
            task_id: taskId,
            repository_root: root,
            queue: {
              present: true,
              branch: scenario === "snapshot_mismatch" ? "foreign" : branch,
              base,
              headSha: head,
              baseSha: baseHead,
              prNumber: 4626,
            },
            provider: { state: "found", pr },
          },
        }
      : {}),
  });
  if (started.status !== "started") throw new Error("Integration fixture did not start.");
  const journal =
    scenario === "stopped"
      ? recoverSupervisorExecutionEpisodeJournal({
          journal: started.journal,
          state_fingerprint_digest: fingerprint,
        })
      : started.journal;
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: root,
    task_id: taskId,
  });
  const store = createSupervisorEpisodeStore(journalPath);
  await store.write(journal);
  const resolution: WorkflowEffectResolution = {
    schema_version: 1,
    kind: "integration_effect_resolution",
    task_id: taskId,
    repository_root: root,
    journal_digest: journal.digest,
    operation_key: started.operation_key,
    precondition_fingerprint_digest: fingerprint,
    authority_ref: authorityRef,
    authority_digest: fingerprint,
    effect_ref: effectRef,
    current_state_fingerprint: currentFingerprint,
    identity,
    verdict: "not_applied",
    operator: {
      kind: "operator_decision",
      actor: "USER",
      decision_ref: "host:operator:decision-1",
      observed_at: "2026-01-02T00:00:00Z",
    },
    evidence: [
      {
        ref: "operator:worker-outcome",
        content: "The operator observed the worker fail before invoking merge.\n",
        digest: digestSupervisorEpisodeValue(
          "The operator observed the worker fail before invoking merge.\n",
        ),
      },
    ],
  };
  switch (scenario) {
    case "missing_evidence": {
      resolution.evidence = [];
      break;
    }
    case "agent_verdict": {
      resolution.operator.actor = "EXECUTOR";
      break;
    }
    case "digest": {
      resolution.evidence[0]!.content = "altered";
      break;
    }
    case "task": {
      resolution.task_id = "foreign";
      break;
    }
    case "journal": {
      resolution.journal_digest = currentFingerprint;
      break;
    }
    case "operation": {
      resolution.operation_key = currentFingerprint;
      break;
    }
    case "authority": {
      resolution.authority_digest = currentFingerprint;
      break;
    }
    case "route": {
      resolution.current_state_fingerprint = fingerprint;
      break;
    }
    case "provider_head": {
      pr.headSha = "c".repeat(40);
      break;
    }
    case "provider_base": {
      pr.baseSha = "c".repeat(40);
      break;
    }
    case "provider_pr": {
      pr.prNumber++;
      break;
    }
    case "provider_identity": {
      pr.identity = { ...pr.identity, targetProject: "foreign/repo" };
      break;
    }
    case "queue": {
      entry.branch = "foreign";
      break;
    }
    case "active_claim": {
      Object.assign(entry, {
        status: "claimed",
        claimed_by: "other",
        claimed_at: "2026-01-02T00:00:00Z",
        lease_expires_at: "2099-01-01T00:00:00Z",
      });
      break;
    }
    case "wrong_route": {
      decision = {
        ...decision,
        workflowStep: { ...decision.workflowStep, kind: "terminal" },
      } as TaskRouteDecision;
      break;
    }
    case "contradictory_merge": {
      pr.status = "MERGED";
      pr.mergeCommit = head;
      break;
    }
    case "applied": {
      resolution.verdict = "applied";
      pr.status = "MERGED";
      pr.mergeCommit = head;
      pr.mergedAt = "2026-01-02T00:00:00Z";
      entry.status = "done";
      break;
    }
  }
  await writeIntegrationQueue(root, { schema_version: 1, entries: [entry] });
  const inputPath = path.join(root, "operator-resolution.json");
  if (native) {
    const route = await decide();
    expect(route.workspace.baseCheckoutPath, JSON.stringify(route.workspace)).toBe(root);
    expect(route.workflowStep, JSON.stringify(route.workflowStep)).toMatchObject({
      kind: "agent_episode",
      episode: { purpose: "implementation_rework" },
    });
    resolution.current_state_fingerprint = route.workflowStep.preconditionFingerprint.digest;
  }
  await writeFile(inputPath, JSON.stringify(resolution));
  const observed = native
    ? null
    : vi
        .spyOn(integrationProvider, "observeExistingChangeRequestByNumber")
        .mockImplementation(async () => {
          if (scenario === "provider_unavailable")
            return { state: "unavailable", reason: "offline" };
          if (scenario === "cas_race")
            await store.write(
              recoverSupervisorExecutionEpisodeJournal({
                journal,
                state_fingerprint_digest: fingerprint,
              }),
            );
          return { state: "found", pr };
        });
  const run = async () => {
    if (!native)
      return await reconcileIntegrationEffect({
        command,
        task_id: taskId,
        input_path: inputPath,
        decide,
      });
    const result = await captureRecoveryCli([
      "task",
      "advance",
      taskId,
      "--workflow-recovery",
      inputPath,
      "--remote",
      "--agent-json",
      "--root",
      checkout,
    ]);
    if (result.code !== 0) throw new Error(result.stderr);
    return JSON.parse(result.stdout) as { verdict: string; replay: boolean };
  };
  const successful = !!native || ["legacy", "snapshot", "stopped", "applied"].includes(scenario);
  try {
    expect(() => requireIntegrationEffectResolution({ journal, decision })).toThrow(
      "unresolved integration intent",
    );
    if (scenario === "live_supervisor") {
      const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journalPath });
      if (!lease) throw new Error("fixture lease unavailable");
      try {
        await expect(run()).rejects.toThrow("another supervisor");
      } finally {
        await lease.release();
      }
    } else if (scenario === "live_queue") {
      await withIntegrationQueueMutex(root, async () => {
        await expect(run()).rejects.toThrow("mutex is already held");
      });
    } else if (successful) {
      if (native) {
        const missingRemote = await captureRecoveryCli([
          "task",
          "advance",
          taskId,
          "--workflow-recovery",
          inputPath,
          "--agent-json",
          "--root",
          checkout,
        ]);
        expect(missingRemote.code).not.toBe(0);
        expect(missingRemote.stderr).toContain("requires --remote");
        await writeFile(
          inputPath,
          JSON.stringify({ ...resolution, current_state_fingerprint: fingerprint }),
        );
        try {
          await expect(run()).rejects.toThrow("current task route changed");
        } finally {
          await writeFile(inputPath, JSON.stringify(resolution));
        }
        expect(await store.read()).toEqual(journal);
        const unresolved = await captureRecoveryCli([
          "task",
          "advance",
          taskId,
          "--remote",
          "--agent-json",
          "--root",
          checkout,
        ]);
        expect(unresolved.code).not.toBe(0);
        expect(unresolved.stderr).toContain("unresolved integration intent");
        expect(await store.read()).toEqual(journal);
      }
      if (scenario === "native_before_cas" || scenario === "native_after_cas") {
        const createStore = supervisorStore.createSupervisorEpisodeStore;
        const interruption = vi
          .spyOn(supervisorStore, "createSupervisorEpisodeStore")
          .mockImplementation((...args) => {
            const real = createStore(...args);
            return {
              ...real,
              compareAndSwap: async (...casArgs) => {
                if (scenario === "native_after_cas") await real.compareAndSwap(...casArgs);
                throw new Error("injected recovery CAS interruption");
              },
            };
          });
        try {
          await expect(run()).rejects.toThrow("injected recovery CAS interruption");
        } finally {
          interruption.mockRestore();
        }
        if (scenario === "native_before_cas") expect(await store.read()).toEqual(journal);
      }
      expect(await run()).toMatchObject({
        verdict: resolution.verdict,
        replay: scenario === "native_after_cas",
      });
      const completed = validateSupervisorExecutionEpisodeJournal(await store.read());
      expect(completed.operations).toHaveLength(1);
      expect(completed.operations[0]).toMatchObject({
        operation_key: started.operation_key,
        status: scenario === "applied" ? "completed" : "failed",
      });
      expect(completed.cursor.phase).toBe(scenario === "applied" ? "completed" : "ready");
      if (scenario !== "applied") {
        expect(completed.cursor).toMatchObject({
          replacement_of_operation_key: started.operation_key,
        });
        if (native) {
          const issued = await captureRecoveryCli([
            "task",
            "advance",
            taskId,
            "--remote",
            "--agent-json",
            "--root",
            checkout,
          ]);
          expect(issued.code, issued.stderr).toBe(0);
          expect(JSON.parse(issued.stdout)).toMatchObject({ action: { kind: "agent_episode" } });
          const successor = validateSupervisorExecutionEpisodeJournal(await store.read());
          expect(successor.operations).toHaveLength(2);
          expect(successor.operations[1]).toMatchObject({
            kind: "agent_episode",
            replacement_of_operation_key: started.operation_key,
          });
          expect(successor.operations[1]!.operation_key).not.toBe(started.operation_key);
          const repeated = await captureRecoveryCli([
            "task",
            "advance",
            taskId,
            "--remote",
            "--agent-json",
            "--root",
            checkout,
          ]);
          expect(repeated.code, repeated.stderr).toBe(0);
          expect(JSON.parse(repeated.stdout)).toEqual(JSON.parse(issued.stdout));
          expect(await store.read()).toEqual(successor);
        } else {
          const next = startSupervisorExecutionEpisode({
            journal: completed,
            role: "EXECUTOR",
            kind: "agent_episode",
            operation_identity: { purpose: "implementation_rework" },
            precondition_fingerprint_digest: currentFingerprint,
            authority_ref: "external-agent:rework",
            authority_digest: currentFingerprint,
            replacement_of_operation_key: started.operation_key,
          });
          if (next.status !== "started") throw new Error("Replacement did not start");
          expect(next.operation_key).not.toBe(started.operation_key);
          await store.write(next.journal);
        }
      }
      const beforeReplay = await readFile(journalPath, "utf8");
      expect(await run()).toMatchObject({ replay: true });
      expect(await readFile(journalPath, "utf8")).toBe(beforeReplay);
    } else {
      const expectedErrors: Record<string, string> = {
        missing_evidence: "invalid operator input",
        agent_verdict: "invalid operator input",
        digest: "evidence content digest",
        task: "another task",
        journal: "journal changed",
        operation: "original operation is absent",
        authority: "original operation authority",
        route: "current task route changed",
        provider_head: "provider identity changed",
        provider_base: "contradicts provider",
        provider_pr: "provider identity changed",
        provider_identity: "provider identity changed",
        queue: "queue identity changed",
        active_claim: "active owner",
        wrong_route: "semantic implementation rework",
        contradictory_merge: "contradicts provider",
        provider_unavailable: "fresh provider evidence",
        route_race: "route or queue changed",
        cas_race: "journal changed before recovery",
        snapshot_mismatch: "contradicts the durable original snapshot",
      };
      await expect(run()).rejects.toThrow(expectedErrors[scenario]);
    }
    if (!successful && scenario !== "cas_race") expect(await store.read()).toEqual(journal);
  } finally {
    observed?.mockRestore();
  }
}

export async function exerciseNativeIntegrationEffectRecovery(scenario: string): Promise<void> {
  const native = await prepareNativeIntegrationRecovery();
  const baseResult = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: native.root });
  const head = baseResult.stdout.trim();
  const taskResult = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: native.worktree });
  const taskHead = taskResult.stdout.trim();
  const detail = {
    number: 4626,
    state: "open",
    head: { sha: taskHead, ref: native.branch },
    base: { sha: head, ref: "main" },
    html_url: "https://github.com/example/repo/pull/4626",
    mergeable: true,
    mergeable_state: "clean",
    merged: false,
    merged_at: null,
    merge_commit_sha: null,
  };
  await withFakeConflictGh(
    native.root,
    fakeGithubProviderSource(detail),
    async () => await exerciseIntegrationEffectRecovery(scenario, native),
  );
}

export const nativeIntegrationRecoveryScenarios = [
  "native",
  "native_snapshot",
  "native_before_cas",
  "native_after_cas",
];
