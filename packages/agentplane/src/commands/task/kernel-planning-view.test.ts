import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { installRunCliIntegrationHarness, runCliSilent } from "@agentplane/testkit";
import { runJson } from "../../cli/task-create-planner-intent.testkit.js";
import { createSuppliedCliTask, readSuppliedCliOrder } from "../../cli/supplied-plan.testkit.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { generateAcr } from "../acr/generate.js";
import {
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  completeSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import { resolveSupervisorExecutionEpisodePath } from "../shared/supervisor-execution-episode.js";

installRunCliIntegrationHarness();

describe("planning status evidence", { timeout: 120_000 }, () => {
  it("reports recorded managed failures without inferring external attempts", async () => {
    const f = await createSuppliedCliTask({ missing: true });
    const digest = `sha256:${"a".repeat(64)}`;
    const journal = createSupervisorExecutionEpisodeJournal({
      task_id: f.id,
      task_revision: 1,
      state_fingerprint_digest: digest,
      budget: {
        max_episodes: 10,
        max_agent_runs: 10,
        max_input_tokens: null,
        max_output_tokens: null,
        max_total_tokens: null,
        max_wall_time_ms: null,
        max_changed_files: null,
        max_diff_lines: null,
        max_no_progress_episodes: null,
      },
    });
    const started = startSupervisorExecutionEpisode({
      journal,
      role: "PLANNER",
      kind: "agent_episode",
      operation_identity: { planner: "fixture" },
      precondition_fingerprint_digest: digest,
    });
    if (started.status !== "started") throw new Error("Fixture did not start");
    const failed = completeSupervisorExecutionEpisode({
      journal: started.journal,
      operation_key: started.operation_key,
      result: { error: "fixture failure" },
      failed: true,
    });
    const file = await resolveSupervisorExecutionEpisodePath({ git_root: f.root, task_id: f.id });
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, JSON.stringify(failed));
    const show = await runJson(f.root, ["task", "show", f.id]);
    expect(show.planning).toMatchObject({
      outcome: "failed",
      managed_attempts: 1,
      managed_failed_attempts: 1,
      external_attempts: null,
      total_attempts: null,
      journal_digest: failed.digest,
    });
  });

  it("reports not_required, not passed, in Task and ACR without canonical writes", async () => {
    const f = await createSuppliedCliTask();
    await runJson(f.root, ["task", "advance", f.id, "--agent-json"]);
    expect(
      await runCliSilent(["task", "plan", "approve", f.id, "--by", "USER", "--root", f.root]),
    ).toBe(0);
    const command = await loadCommandContext({ cwd: f.root });
    const before = await command.taskBackend.getTask(f.id);
    const readme = path.join(f.root, command.config.paths.workflow_dir, f.id, "README.md");
    const bytes = await readFile(readme, "utf8");
    const show = await runJson(f.root, ["task", "show", f.id]);
    expect(show.planning).toMatchObject({
      requirement: "not_required",
      outcome: "not_required",
      plan_origin: "caller_supplied",
      issued_work_orders: [],
      received_results: [],
      failed_results: [],
      accepted_results: [],
      managed_attempts: null,
      external_attempts: null,
      total_attempts: null,
    });
    for (let index = 0; index < 2; index++) {
      const status = await runJson(f.root, ["task", "status", f.id, "--json"]);
      const explain = await runJson(f.root, ["task", "next-action", f.id, "--explain", "--json"]);
      expect(status.planning).toEqual(show.planning);
      expect(explain.planning).toEqual(show.planning);
    }
    const acr = await generateAcr({
      ctx: command,
      cwd: f.root,
      taskId: f.id,
      workCommit: "HEAD",
      baseCommit: "HEAD",
    });
    expect(acr.record.extensions?.["agentplane.planning"]).toEqual(show.planning);
    expect(await command.taskBackend.getTask(f.id)).toEqual(before);
    expect(await readFile(readme, "utf8")).toBe(bytes);
  });

  it("retains failed submissions after a later successful planner result", async () => {
    const f = await createSuppliedCliTask({ missing: true });
    const missing = await runJson(f.root, ["task", "show", f.id]);
    expect(missing.planning).toMatchObject({
      requirement: "required",
      outcome: "missing",
      plan_origin: "missing",
    });
    const packet = await runJson(f.root, ["task", "advance", f.id, "--agent-json"]);
    const { order, exchange } = await readSuppliedCliOrder(packet);
    await writeFile(
      exchange.result_path,
      JSON.stringify({
        work_order_id: order.work_order_id,
        status: "blocked",
        summary: "Need a report audience",
        findings: [],
        uncertainty: [],
        blocker: { summary: "Need a report audience" },
      }),
    );
    await runJson(f.root, [
      "task",
      "advance",
      f.id,
      "--result",
      exchange.result_path,
      "--agent-json",
    ]);
    const failed = await runJson(f.root, ["task", "show", f.id]);
    expect(failed.planning).toMatchObject({
      requirement: "required",
      outcome: "failed",
      issued_work_orders: [order.work_order_id],
      total_attempts: null,
    });
    await runJson(f.root, [
      "task",
      "advance",
      f.id,
      "--result",
      exchange.result_path,
      "--agent-json",
    ]);
    const repeated = await runJson(f.root, ["task", "show", f.id]);
    expect(repeated.planning).toEqual(failed.planning);
    await writeFile(
      exchange.result_path,
      JSON.stringify({
        work_order_id: order.work_order_id,
        status: "completed",
        summary: "Resolved report plan",
        findings: [],
        uncertainty: [],
        canonical_plan: {
          work_items: [
            {
              id: "report",
              depends_on: [],
              required_inputs: [],
              expected_outputs: ["report"],
              optional: false,
              execution_requirements: {
                scope_roots: ["result.txt"],
                repository_effects: ["source_code"],
                external_effects: [],
                capabilities: [],
                resources: [],
              },
              contract: {
                role: "EXECUTOR",
                objective: "Write the report",
                acceptance_criteria: ["Report exists"],
                verification_commands: [],
              },
            },
          ],
        },
      }),
    );
    await runJson(f.root, [
      "task",
      "advance",
      f.id,
      "--result",
      exchange.result_path,
      "--agent-json",
    ]);
    const successful = await runJson(f.root, ["task", "show", f.id]);
    expect(successful.planning).toMatchObject({
      requirement: "required",
      outcome: "passed",
      plan_origin: "planner",
    });
    const history = successful.planning as {
      failed_results: string[];
      accepted_results: string[];
      received_results: string[];
    };
    expect(history.failed_results).toHaveLength(1);
    expect(history.accepted_results).toHaveLength(1);
    expect(history.received_results).toHaveLength(2);
    expect(
      await runCliSilent([
        "task",
        "plan",
        "reject",
        f.id,
        "--by",
        "USER",
        "--note",
        "Revise the report scope",
        "--root",
        f.root,
      ]),
    ).toBe(0);
    const rejected = await runJson(f.root, ["task", "show", f.id]);
    expect(rejected.planning).toMatchObject({
      requirement: "required",
      outcome: "failed",
      plan_origin: "planner",
      evidence_freshness: "historical",
      current_accepted_results: [],
      accepted_results: history.accepted_results,
      failed_results: history.failed_results,
    });
  });
});
