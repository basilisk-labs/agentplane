import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  buildStateFingerprint,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  digestSupervisorEpisodeValue,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import { mkGitRepoRoot } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { createSupervisorEpisodeStore } from "../shared/supervisor-execution-episode.js";
import {
  finalizeCompletedExternalAgentExchange,
  type assertExternalAgentSupervisorIntent,
} from "./external-agent-exchange-authority.js";
import type {
  ExternalAgentExchange,
  ExternalAgentExchangePaths,
} from "./external-agent-exchange.js";

describe("external agent supervisor replay", () => {
  it("consumes an accepted result after task application completed but exchange persistence did not", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202609220001-REPLAY";
    const component = {
      state: "present",
      source: "external_agent_supervisor_test",
      value: { taskId },
    } as const;
    const fingerprint = buildStateFingerprint({
      task_id: taskId,
      task_revision: 3,
      git_head: "a".repeat(40),
      worktree: root,
      components: {
        task: component,
        git: component,
        backend_projection: component,
        policy: component,
        blueprint: component,
        knowledge: component,
        provider: component,
        authority: component,
      },
    });
    const operationIdentity = {
      id: "external_agent.implementation",
      type: "external_agent",
      params: { taskId },
      preconditionFingerprint: fingerprint,
      authorityRef: "external-agent:test",
      idempotencyKey: "external-agent:test",
      expectedPostconditions: [],
      triggersGitHooks: false,
    } as const;
    const created = createSupervisorExecutionEpisodeJournal({
      task_id: taskId,
      task_revision: 3,
      state_fingerprint_digest: fingerprint.digest,
      budget: {
        max_episodes: 5,
        max_agent_runs: 5,
        max_input_tokens: null,
        max_output_tokens: null,
        max_total_tokens: null,
        max_wall_time_ms: 60_000,
        max_changed_files: 20,
        max_diff_lines: null,
        max_no_progress_episodes: 3,
      },
    });
    const started = startSupervisorExecutionEpisode({
      journal: created,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: operationIdentity,
      precondition_fingerprint_digest: fingerprint.digest,
      authority_ref: operationIdentity.authorityRef,
      authority_digest: fingerprint.digest,
      effect_ref: operationIdentity.idempotencyKey,
    });
    if (started.status !== "started") throw new Error("expected started operation");
    const resultDigest = `sha256:${"b".repeat(64)}`;
    const workOrderId = `sha256:${"c".repeat(64)}`;
    const semanticStatus = "completed";
    const postcondition = { digest: fingerprint.digest };
    const completed = completeSupervisorExecutionEpisode({
      journal: started.journal,
      operation_key: started.operation_key,
      result: {
        work_order_id: workOrderId,
        semantic_status: semanticStatus,
        result_digest: resultDigest,
      },
      progress: postcondition,
    });
    const journalPath = path.join(root, ".git", "replay-journal.json");
    const store = createSupervisorEpisodeStore(journalPath);
    await store.write(completed);
    const directory = path.join(root, ".agentplane", "exchange");
    const paths: ExternalAgentExchangePaths = {
      directory,
      exchange: path.join(directory, "exchange.json"),
      work_order: path.join(directory, "work-order.json"),
      result_schema: path.join(directory, "result-schema.json"),
      semantic_result_schema: path.join(directory, "semantic-result-schema.json"),
      result: path.join(directory, "result.json"),
    };
    const exchange = {
      schema_version: 1,
      kind: "external_agent_exchange",
      status: "accepted",
      task_id: taskId,
      result_digest: resultDigest,
    } as ExternalAgentExchange;
    const intent = {
      state: "completed_pending_exchange",
      journal: completed,
      operation: completed.operations.at(-1)!,
    } as ReturnType<typeof assertExternalAgentSupervisorIntent>;

    await expect(
      finalizeCompletedExternalAgentExchange({
        intent,
        store,
        exchange,
        paths,
        postcondition,
        postcondition_fingerprint: fingerprint.digest,
        route_step_id: "next-step",
        work_order_id: workOrderId,
        semantic_status: semanticStatus,
        result_digest: resultDigest,
      }),
    ).resolves.toBe(true);

    const persistedExchange = JSON.parse(await readFile(paths.exchange, "utf8")) as {
      status: string;
    };
    expect(persistedExchange.status).toBe("consumed");
    expect(completed.operations.at(-1)?.result_digest).toBe(
      digestSupervisorEpisodeValue({
        work_order_id: workOrderId,
        semantic_status: semanticStatus,
        result_digest: resultDigest,
      }),
    );
  });
});
