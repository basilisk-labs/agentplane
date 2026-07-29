import { execFile as execFileCallback } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  startSupervisorExecutionEpisode,
  type SupervisorExecutionBudget,
} from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import { openSupervisorExecutionEpisode } from "../shared/supervisor-execution-episode.js";

import {
  CONTEXT_ASSIMILATION_OPERATION_IDS,
  runContextAssimilationSupervisor,
  type ContextAssimilationOperationId,
} from "./assimilation-supervisor.js";

const execFile = promisify(execFileCallback);
const FINGERPRINT = `sha256:${"a".repeat(64)}`;
const MECHANICAL_OPERATION_IDS = CONTEXT_ASSIMILATION_OPERATION_IDS.filter(
  (id) => id !== "semantic_result" && id !== "semantic_rework",
);
let roots: string[] = [];

afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(roots.map(async (root) => await rm(root, { recursive: true, force: true })));
  roots = [];
});

async function fixtureRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-context-supervisor-"));
  roots.push(root);
  await execFile("git", ["init", "--quiet"], { cwd: root });
  const taskId = "202607281900-SUPERV";
  await mkdir(path.join(root, ".agentplane/context/ingest-runs"), { recursive: true });
  await writeFile(
    path.join(root, ".agentplane/context/ingest-runs/run-supervisor.json"),
    `${JSON.stringify(
      {
        version: 1,
        run_id: "run-supervisor",
        created_at: "2026-07-28T00:00:00.000Z",
        updated_at: "2026-07-28T00:00:00.000Z",
        phase: "pack_written",
        request: {
          fingerprint: "sha256:request",
          mode: "sources",
          sources: ["context/raw/source.md"],
        },
        source_set: {
          full_inventory: [],
          manifest: { version: 1, sources: [], workspace_hash: "sha256:manifest" },
          manifest_fingerprint: "sha256:manifest",
          previous_manifest_fingerprint: "sha256:manifest",
          selected: [],
          selected_fingerprint: "sha256:selected",
        },
        task: { task_id: taskId, revision: 1, backend_id: "local", artifact_paths: [] },
      },
      null,
      2,
    )}\n`,
  );
  await mkdir(path.join(root, "context"), { recursive: true });
  await writeFile(
    path.join(root, "context/result.json"),
    `${JSON.stringify({
      schema_version: 2,
      kind: "context_extraction",
      task_id: taskId,
      reasoning: [{ label: "semantic", summary: "A CURATOR result." }],
      source_refs: [{ path: "context/raw/source.md", lines: "1-2" }],
      extracted_items: [
        {
          id: "entity.supervisor",
          kind: "graph_entity",
          summary: "A supervisor owns mechanical follow-up.",
          source_refs: [{ path: "context/raw/source.md", lines: "1-2" }],
          confidence: 0.9,
          status: "accepted",
          entity: { id: "entity.supervisor", kind: "concept", label: "Supervisor" },
        },
        {
          id: "coverage.source",
          kind: "coverage",
          summary: "Source coverage.",
          source_refs: [{ path: "context/raw/source.md", lines: "1-2" }],
          confidence: 0.9,
          status: "accepted",
          coverage: {
            source_path: "context/raw/source.md",
            status: "covered",
            reason: "Semantic result covers the selected source.",
            covered_item_ids: ["entity.supervisor"],
          },
        },
      ],
    })}\n`,
  );
  return root;
}

function task(
  state: NonNullable<TaskData["quality_review"]>["state"] | undefined = undefined,
): TaskData {
  return {
    id: "202607281900-SUPERV",
    title: "Context fixture",
    status: "DOING",
    priority: "med",
    owner: "CURATOR",
    revision: 1,
    description: "fixture",
    verify: [],
    ...(state
      ? {
          quality_review: {
            state,
            provenance: "evaluator_supplied",
            updated_at: "2026-07-28T00:00:00.000Z",
            updated_by: "EVALUATOR",
            note: "bounded feedback",
            evaluated_sha: null,
            blueprint_digest: null,
            evidence_refs: ["quality/report.json"],
            findings: ["Semantic reconciliation needs one correction."],
          },
        }
      : {}),
  } as TaskData;
}

function overriddenOperations(calls: string[], fail?: ContextAssimilationOperationId) {
  return Object.fromEntries(
    CONTEXT_ASSIMILATION_OPERATION_IDS.filter((id) => id !== "semantic_result").map((id) => [
      id,
      () => {
        calls.push(id);
        return id === fail ? Promise.reject(new Error(`${id}-failed`)) : Promise.resolve({ id });
      },
    ]),
  ) as Partial<Record<ContextAssimilationOperationId, () => Promise<unknown>>>;
}

function input(root: string) {
  return {
    command: { resolvedProject: { gitRoot: root } } as CommandContext,
    ctx: { cwd: root, rootOverride: root } as CommandCtx,
    extractionFile: "context/result.json",
    taskId: "202607281900-SUPERV",
  };
}

function fixedEpisodeState() {
  return Promise.resolve({ fingerprint: FINGERPRINT, task_revision: 1 });
}

function episodeBudget(
  overrides: Partial<SupervisorExecutionBudget> = {},
): SupervisorExecutionBudget {
  const maxEpisodes = overrides.max_episodes ?? 50;
  return {
    max_episodes: maxEpisodes,
    max_agent_runs: overrides.max_agent_runs ?? Math.min(50, maxEpisodes),
    max_input_tokens: 3_000_000,
    max_output_tokens: 1_000_000,
    max_total_tokens: 4_000_000,
    max_wall_time_ms: 4 * 60 * 60 * 1000,
    max_changed_files: 2000,
    max_diff_lines: null,
    max_no_progress_episodes: 3,
    ...overrides,
  };
}

async function changeSemanticResult(root: string, label: string): Promise<void> {
  const file = path.join(root, "context/result.json");
  const result = JSON.parse(await readFile(file, "utf8")) as {
    reasoning: { label: string; summary: string }[];
  };
  result.reasoning[0] = { label: "semantic", summary: `A CURATOR result: ${label}.` };
  await writeFile(file, `${JSON.stringify(result, null, 2)}\n`);
}

async function seedExhaustedBudget(
  root: string,
  opts: {
    budget: SupervisorExecutionBudget;
    firstUsage?: { total_tokens?: number };
    repeatedProgress?: boolean;
  },
): Promise<void> {
  const opened = await openSupervisorExecutionEpisode({
    git_root: root,
    task_id: "202607281900-SUPERV",
    task_revision: 1,
    state_fingerprint_digest: FINGERPRINT,
    budget: opts.budget,
    recover_intent: false,
  });
  const complete = (
    journal: Parameters<typeof startSupervisorExecutionEpisode>[0]["journal"],
    id: string,
  ) => {
    const started = startSupervisorExecutionEpisode({
      journal,
      role: "CURATOR",
      kind: "agent_episode",
      operation_identity: { semantic_result: id },
      precondition_fingerprint_digest: FINGERPRINT,
      authority_ref: "context-assimilation:semantic_result",
      authority_digest: FINGERPRINT,
      effect_ref: "semantic_result",
    });
    if (started.status !== "started") throw new Error("expected a seeded agent episode");
    return completeSupervisorExecutionEpisode({
      journal: started.journal,
      operation_key: started.operation_key,
      result: { id },
      usage: opts.firstUsage ?? {},
      progress: { semantic: "unchanged" },
    });
  };

  let journal = complete(opened.journal, "first");
  if (!opts.repeatedProgress) {
    await opened.store.write(journal);
    return;
  }
  journal = advanceSupervisorExecutionEpisodeState({
    journal,
    state_fingerprint_digest: FINGERPRINT,
    route_observation: { seeded: "first" },
  });
  journal = complete(journal, "second");
  await opened.store.write(journal);
}

describe("context assimilation supervisor", () => {
  it("rejects an invalid semantic result before any CLI-owned operation starts", async () => {
    const root = await fixtureRoot();
    await writeFile(path.join(root, "context/result.json"), '{"kind":"not-context-extraction"}\n');
    const calls: string[] = [];

    await expect(
      runContextAssimilationSupervisor(input(root), {
        operations: overriddenOperations(calls),
        getEpisodeState: fixedEpisodeState,
        loadTask: () => Promise.resolve(task()),
        runEvaluator: () => Promise.resolve(),
      }),
    ).rejects.toThrow(/context extraction SGR result/u);

    expect(calls).toEqual([]);
  });

  it("retries only the failed mechanical operation and preserves the CURATOR result", async () => {
    const root = await fixtureRoot();
    const calls: string[] = [];
    let currentTask = task();
    const firstOperations = overriddenOperations(calls, "wiki_lint");

    await expect(
      runContextAssimilationSupervisor(input(root), {
        operations: firstOperations,
        getEpisodeState: fixedEpisodeState,
        loadTask: () => Promise.resolve(currentTask),
        runEvaluator: () => {
          currentTask = task("pass");
          return Promise.resolve();
        },
      }),
    ).rejects.toThrow("wiki_lint-failed");

    const secondOperations = overriddenOperations(calls);
    const result = await runContextAssimilationSupervisor(input(root), {
      operations: secondOperations,
      getEpisodeState: fixedEpisodeState,
      loadTask: () => Promise.resolve(currentTask),
      runEvaluator: () => {
        currentTask = task("pass");
        return Promise.resolve();
      },
    });

    expect(result.status).toBe("finalized");
    expect(calls.filter((id) => id === "apply")).toHaveLength(1);
    expect(calls.filter((id) => id === "wiki_lint")).toHaveLength(2);
    expect(calls.filter((id) => id === "evaluator_request")).toHaveLength(1);
  });

  it.each(MECHANICAL_OPERATION_IDS)(
    "retries %s without replaying any completed mechanical operation",
    async (failedOperation) => {
      const root = await fixtureRoot();
      const calls: string[] = [];
      let currentTask = task();

      await expect(
        runContextAssimilationSupervisor(input(root), {
          operations: overriddenOperations(calls, failedOperation),
          getEpisodeState: fixedEpisodeState,
          loadTask: () => Promise.resolve(currentTask),
          runEvaluator: () => {
            currentTask = task("pass");
            return Promise.resolve();
          },
        }),
      ).rejects.toThrow(`${failedOperation}-failed`);

      const result = await runContextAssimilationSupervisor(input(root), {
        operations: overriddenOperations(calls),
        getEpisodeState: fixedEpisodeState,
        loadTask: () => Promise.resolve(currentTask),
        runEvaluator: () => {
          currentTask = task("pass");
          return Promise.resolve();
        },
      });

      expect(result.status).toBe("finalized");
      for (const operation of MECHANICAL_OPERATION_IDS) {
        expect(calls.filter((id) => id === operation)).toHaveLength(
          operation === failedOperation ? 2 : 1,
        );
      }
    },
  );

  it("confirms a durable completed phase after a crash without replaying that operation", async () => {
    const root = await fixtureRoot();
    const journalPath = path.join(root, ".agentplane/context/ingest-runs/run-supervisor.json");
    const run = JSON.parse(await readFile(journalPath, "utf8")) as { phase: string };
    run.phase = "wiki_linted";
    await writeFile(journalPath, `${JSON.stringify(run, null, 2)}\n`);
    const episode = await openSupervisorExecutionEpisode({
      git_root: root,
      task_id: "202607281900-SUPERV",
      task_revision: 1,
      state_fingerprint_digest: FINGERPRINT,
      recover_intent: false,
    });
    const pending = startSupervisorExecutionEpisode({
      journal: episode.journal,
      role: "EXECUTOR",
      kind: "cli_operation",
      operation_identity: { context_assimilation_operation: "wiki_lint" },
      precondition_fingerprint_digest: FINGERPRINT,
      authority_ref: "context-assimilation:wiki_lint",
      authority_digest: FINGERPRINT,
      effect_ref: "wiki_lint",
    });
    if (pending.status !== "started")
      throw new Error("expected a durable pending wiki_lint intent");
    await episode.store.write(pending.journal);

    const calls: string[] = [];
    let currentTask = task();
    const result = await runContextAssimilationSupervisor(input(root), {
      operations: overriddenOperations(calls),
      getEpisodeState: fixedEpisodeState,
      loadTask: () => Promise.resolve(currentTask),
      runEvaluator: () => {
        currentTask = task("pass");
        return Promise.resolve();
      },
    });

    expect(result.status).toBe("finalized");
    expect(calls).not.toContain("wiki_lint");
    expect(
      result.episode.operations.find((entry) => entry.effect_ref === "wiki_lint"),
    ).toMatchObject({
      status: "completed",
    });
  });

  it("turns evaluator rework into a bounded CURATOR work order without lifecycle commands", async () => {
    const root = await fixtureRoot();
    const calls: string[] = [];
    let currentTask = task();
    const result = await runContextAssimilationSupervisor(input(root), {
      operations: overriddenOperations(calls),
      getEpisodeState: fixedEpisodeState,
      loadTask: () => Promise.resolve(currentTask),
      runEvaluator: () => {
        currentTask = task("rework");
        return Promise.resolve();
      },
    });

    expect(result).toMatchObject({
      status: "awaiting_semantic_rework",
      phase: "semantic_rework_requested",
      rework_work_order: ".agentplane/tasks/202607281900-SUPERV/context-rework/001.json",
    });
    const workOrder = await readFile(path.join(root, result.rework_work_order ?? ""), "utf8");
    expect(workOrder).toContain('"kind": "context_semantic_rework"');
    expect(workOrder).not.toContain("agentplane context ");
    expect(workOrder).not.toContain("agentplane evaluator ");
    expect(calls).not.toContain("acr_generate");
    expect(calls).not.toContain("finalize");
  });

  it("shares one durable cursor across rework work orders and stops before a fourth cycle", async () => {
    const root = await fixtureRoot();
    await openSupervisorExecutionEpisode({
      git_root: root,
      task_id: "202607281900-SUPERV",
      task_revision: 1,
      state_fingerprint_digest: FINGERPRINT,
      budget: episodeBudget({ max_episodes: 29 }),
      recover_intent: false,
    });
    const calls: string[] = [];
    let currentTask = task("rework");
    let evaluatorCalls = 0;
    const dependencies = {
      operations: overriddenOperations(calls),
      getEpisodeState: fixedEpisodeState,
      loadTask: () => Promise.resolve(currentTask),
      runEvaluator: () => {
        evaluatorCalls += 1;
        currentTask = task("rework");
        return Promise.resolve();
      },
    };

    await changeSemanticResult(root, "first correction");
    const first = await runContextAssimilationSupervisor(input(root), dependencies);
    await changeSemanticResult(root, "second correction");
    const second = await runContextAssimilationSupervisor(input(root), dependencies);
    await changeSemanticResult(root, "third correction");

    await expect(runContextAssimilationSupervisor(input(root), dependencies)).rejects.toThrow(
      /budget_exhausted \(episodes\)/u,
    );
    expect(first).toMatchObject({
      status: "awaiting_semantic_rework",
      rework_work_order: ".agentplane/tasks/202607281900-SUPERV/context-rework/001.json",
    });
    expect(second).toMatchObject({
      status: "awaiting_semantic_rework",
      rework_work_order: ".agentplane/tasks/202607281900-SUPERV/context-rework/002.json",
    });
    expect(evaluatorCalls).toBe(2);
    expect(calls.filter((id) => id === "apply")).toHaveLength(2);

    const final = await openSupervisorExecutionEpisode({
      git_root: root,
      task_id: "202607281900-SUPERV",
      task_revision: 1,
      state_fingerprint_digest: FINGERPRINT,
      recover_intent: false,
    });
    expect(final.journal).toMatchObject({
      usage: { episodes: 29, agent_runs: 3 },
      status: "stopped",
      stop: { reason: "budget_exhausted", exhausted_dimensions: ["episodes"] },
    });
  });

  it.each([
    ["token", episodeBudget({ max_total_tokens: 1 }), { total_tokens: 1 }],
    ["no-progress", episodeBudget({ max_no_progress_episodes: 1 }), undefined],
  ] as const)(
    "refuses a new CURATOR cycle when the shared %s budget is exhausted",
    async (_label, budget, firstUsage) => {
      const root = await fixtureRoot();
      await seedExhaustedBudget(root, {
        budget,
        firstUsage,
        repeatedProgress: firstUsage === undefined,
      });
      const calls: string[] = [];
      let evaluatorCalls = 0;

      await expect(
        runContextAssimilationSupervisor(input(root), {
          operations: overriddenOperations(calls),
          getEpisodeState: fixedEpisodeState,
          loadTask: () => Promise.resolve(task()),
          runEvaluator: () => {
            evaluatorCalls += 1;
            return Promise.resolve();
          },
        }),
      ).rejects.toThrow(/budget_exhausted/u);
      expect(calls).toEqual([]);
      expect(evaluatorCalls).toBe(0);
    },
  );
});
