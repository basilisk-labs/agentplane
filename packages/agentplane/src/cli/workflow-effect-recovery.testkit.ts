import path from "node:path";
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

export async function exerciseIntegrationEffectRecovery(scenario: string): Promise<void> {
  const root = await mkGitRepoRootWithCommit();
  await writeConfig(root, defaultConfig());
  const command = await loadCommandContext({ cwd: root, rootOverride: null });
  const taskId = "202609060001-RECOVER";
  const headResult = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  const head = headResult.stdout.trim();
  const baseResult = await execFileAsync("git", ["branch", "--show-current"], { cwd: root });
  const base = baseResult.stdout.trim();
  const branch = "task/recovery";
  await execFileAsync("git", ["branch", branch], { cwd: root });
  const fingerprint = `sha256:${"a".repeat(64)}`;
  const currentFingerprint = `sha256:${"b".repeat(64)}`;
  const identity = {
    branch,
    head_sha: head,
    base,
    base_sha: head,
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
    baseSha: head,
    headSha: head,
    headRef: branch,
  };
  const entry = {
    task_id: taskId,
    branch,
    head_sha: head,
    base,
    base_sha: head,
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
  const decide = () => {
    calls++;
    if (scenario === "route_race" && calls === 3)
      return Promise.resolve({
        ...decision,
        workflowStep: {
          ...decision.workflowStep,
          preconditionFingerprint: { digest: fingerprint },
        },
      } as TaskRouteDecision);
    return Promise.resolve(decision);
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
    authorityRef,
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
    ...(scenario === "snapshot" || scenario === "snapshot_mismatch"
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
              baseSha: head,
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
  await writeFile(inputPath, JSON.stringify(resolution));
  const observed = vi
    .spyOn(integrationProvider, "observeExistingChangeRequestByNumber")
    .mockImplementation(async () => {
      if (scenario === "provider_unavailable") return { state: "unavailable", reason: "offline" };
      if (scenario === "cas_race")
        await store.write(
          recoverSupervisorExecutionEpisodeJournal({
            journal,
            state_fingerprint_digest: fingerprint,
          }),
        );
      return { state: "found", pr };
    });
  const run = async () =>
    await reconcileIntegrationEffect({ command, task_id: taskId, input_path: inputPath, decide });
  const successful = ["legacy", "snapshot", "stopped", "applied"].includes(scenario);
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
      expect(await run()).toMatchObject({ verdict: resolution.verdict, replay: false });
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
    observed.mockRestore();
  }
}
