import { describe } from "vitest";
import { mkGitRepoRootWithCommit } from "@agentplane/testkit";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { taskKernel } from "@agentplaneorg/core/tasks";
import { makeKernelRecord } from "../adapters/task-backend/kernel-record.js";
import { resolveLogicalRepositoryIdentity } from "../commands/task/execution-authority-context.js";

import {
  captureStdIO,
  defaultConfig,
  expect,
  it,
  runCli,
  runCliSilent,
  seedTaskQueryFixture,
  useRunCliIntegrationHarness,
  writeConfig,
} from "@agentplane/testkit/cli-core-tasks-query";

useRunCliIntegrationHarness();

const taskId = "202608030102-T0KENS";
const tokenUsage = {
  schema_version: 1 as const,
  state: "partial" as const,
  input_tokens: 120,
  output_tokens: null,
  reasoning_tokens: null,
  total_tokens: 150,
  agent_runs: 2,
  observed_agent_runs: 1,
  source: "supervisor_journal" as const,
  observed_by: "agentplane" as const,
  journal_digest: `sha256:${"a".repeat(64)}`,
  unavailable_reason: "some_agent_runs_lack_provider_token_telemetry",
  updated_at: "2026-08-03T12:00:00.000Z",
};

async function captureCli(args: string[]): Promise<string> {
  const io = captureStdIO();
  try {
    expect(await runCli(args)).toBe(0);
    return io.stdout;
  } finally {
    io.restore();
  }
}

describe("runCli completed task token usage", () => {
  it("reads canonical state across commands without changing stored Task bytes", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    const repositoryIdentity = await resolveLogicalRepositoryIdentity({ git_root: root, task: {} });
    const aggregate: taskKernel.TaskAggregate = {
      schema_version: 1,
      id: taskId,
      revision: 1,
      state: "PLANNING",
      intent_digest: taskKernel.kernelDigest("intent"),
      current_plan: null,
      plan_history: [],
      work_items: {},
      final_validation: null,
      effects: [],
      mutation_receipts: {},
      controller_transfer: null,
      migration_receipts: [],
    };
    await seedTaskQueryFixture(root, [
      {
        id: taskId,
        title: "Canonical status",
        description: "Read-only canonical query",
        status: "DONE",
        priority: "med",
        owner: "CODER",
        depends_on: ["LEGACY-MISSING"],
        tags: ["workflow"],
        verify: [],
        extensions: {
          task_kernel: makeKernelRecord(
            repositoryIdentity as taskKernel.Sha256Digest,
            aggregate,
            [],
          ),
        },
      },
    ]);
    await writeConfig(root, config);
    const readme = path.join(root, config.paths.workflow_dir, taskId, "README.md");
    const before = await readFile(readme, "utf8");
    for (const command of ["status", "brief", "next-action"]) {
      const view: unknown = JSON.parse(
        await captureCli(["task", command, taskId, "--json", "--root", root]),
      );
      expect(view).toMatchObject({
        source: "task_kernel",
        record_kind: "canonical",
        task: { id: taskId, state: "PLANNING", status: "TODO" },
        ready: false,
        next_action: { reason_code: "kernel_plan_required", command: null },
      });
    }
    const active: unknown = JSON.parse(
      await captureCli(["task", "active", "--json", "--root", root]),
    );
    expect(active).toMatchObject({
      count: 1,
      items: [
        { task: { id: taskId, status: "PLANNING" }, next_action: { code: "kernel_plan_required" } },
      ],
    });
    expect(await readFile(readme, "utf8")).toBe(before);
  });
  it("keeps status, brief, and machine projections consistent", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await seedTaskQueryFixture(root, [
      {
        id: taskId,
        title: "Completed token projection",
        description: "Expose exact completed-task token usage on every query surface.",
        status: "DONE",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["workflow"],
        verify: [],
        token_usage: tokenUsage,
      },
    ]);
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const expectedSummary =
      "state=partial completeness=1/2 input=120 output=unavailable " +
      "reasoning=unavailable total=150 provenance=supervisor_journal/agentplane " +
      "reason=some_agent_runs_lack_provider_token_telemetry";

    const statusText = await captureCli(["task", "status", taskId, "--root", root]);
    expect(statusText).toContain(expectedSummary);

    const briefText = await captureCli(["task", "brief", taskId, "--root", root]);
    expect(briefText).toContain(expectedSummary);

    const statusJson = JSON.parse(
      await captureCli(["task", "status", taskId, "--json", "--root", root]),
    ) as { token_usage: typeof tokenUsage };
    expect(statusJson.token_usage).toEqual(tokenUsage);

    const briefJson = JSON.parse(
      await captureCli(["task", "brief", taskId, "--json", "--root", root]),
    ) as { task: { token_usage: typeof tokenUsage } };
    expect(briefJson.task.token_usage).toEqual(tokenUsage);
    expect(statusJson.token_usage).toEqual(briefJson.task.token_usage);
  });
});
