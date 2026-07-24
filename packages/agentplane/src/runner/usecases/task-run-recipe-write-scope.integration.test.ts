import { readFile } from "node:fs/promises";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { writeRunnerExecutable } from "@agentplane/testkit/runner";
import { afterEach, describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import { runCli } from "../../cli/run-cli.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import type { RunnerRecipeContext, RunnerTarget } from "../types.js";
import { executeTaskRunnerExecution, prepareTaskRunnerExecution } from "./task-run.js";

installRunCliIntegrationHarness();

const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
});

async function createDoingCodeTask(root: string, title: string): Promise<string> {
  const io = captureStdIO();
  let taskId = "";
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      title,
      "--description",
      title,
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    taskId = io.stdout.trim();
  } finally {
    io.restore();
  }

  await runCliSilent([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    `Exercise recipe write scope: ${title}.`,
    "--updated-by",
    "ORCHESTRATOR",
    "--root",
    root,
  ]);
  await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = await ctx.taskBackend.getTask(taskId);
  expect(task).toBeTruthy();
  await ctx.taskBackend.writeTask({
    ...task!,
    id: taskId,
    title,
    description: title,
    status: "DOING",
    priority: task?.priority ?? "med",
    owner: "CODER",
    depends_on: task?.depends_on ?? [],
    tags: ["code", "recipes"],
    verify: task?.verify ?? [],
    task_kind: "code" satisfies NonNullable<TaskData["task_kind"]>,
    mutation_scope: "code" satisfies NonNullable<TaskData["mutation_scope"]>,
    blueprint_request: "code.direct" satisfies NonNullable<TaskData["blueprint_request"]>,
  });
  return taskId;
}

async function configureCustomRunner(root: string, scriptLines: string[]): Promise<void> {
  const config = defaultConfig();
  config.runner.default_adapter = "custom";
  config.runner.custom = {
    command: ["custom-runner"],
    env: {
      TEST_REPOSITORY_ROOT: root,
    },
  };
  await writeConfig(root, config);
  await writeRunnerExecutable(root, "custom-runner", scriptLines);
  process.env.PATH = `${path.join(root, "bin")}${path.delimiter}${process.env.PATH ?? ""}`;
}

function recipeExecution(taskId: string): {
  recipe: RunnerRecipeContext;
  target: RunnerTarget;
} {
  return {
    recipe: {
      recipe_id: "write-scope-fixture",
      scenario_id: "REPORT_ONLY",
      run_profile: {
        mode: "analysis",
        sandbox: "workspace-write",
        writes_artifacts_to: ["reports/"],
      },
      scenario: {
        id: "REPORT_ONLY",
        summary: "Write only the declared report.",
        goal: "Produce a report without changing implementation paths.",
      },
    },
    target: {
      kind: "recipe_scenario",
      recipe_id: "write-scope-fixture",
      scenario_id: "REPORT_ONLY",
      task_id: taskId,
    },
  };
}

describe("recipe task-run actual write scope integration", () => {
  it("carries recipe artifact roots through preparation, policy, and adapter env", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "cat >/dev/null", "exit 0"]);
    const taskId = await createDoingCodeTask(root, "Prepare recipe report scope");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const { recipe, target } = recipeExecution(taskId);

    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "dry_run",
      run_id: "run-recipe-report-scope",
      recipe,
      target,
    });

    expect(prepared.bundle.target).toEqual(target);
    expect(prepared.bundle.execution.write_scope).toMatchObject({
      mutation_scope: "code",
      writable_roots: ["reports"],
    });
    expect(prepared.bundle.execution.policy_decision).toMatchObject({
      adapter_id: "custom",
      requested: {
        sandbox: "workspace-write",
        writes_artifacts_to: ["reports/"],
      },
      fields: {
        writes_artifacts_to: {
          requested: ["reports/"],
          status: "advisory",
          capability_level: "advisory",
          channel: "env",
        },
      },
    });
    expect(prepared.invocation.env).toMatchObject({
      AGENTPLANE_RUNNER_TARGET: "recipe_scenario",
      AGENTPLANE_RECIPE_ID: "write-scope-fixture",
      AGENTPLANE_SCENARIO_ID: "REPORT_ONLY",
      AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO: JSON.stringify(["reports"]),
    });
    expect(JSON.parse(prepared.invocation.env.AGENTPLANE_RECIPE_RUN_PROFILE ?? "{}")).toMatchObject(
      {
        sandbox: "workspace-write",
        writes_artifacts_to: ["reports"],
      },
    );
    expect(await readFile(prepared.invocation.bootstrap_path!, "utf8")).toContain(
      '- writable_roots: ["reports"]',
    );
  });

  it("rejects an actual custom-runner write outside the recipe artifact root", async () => {
    const root = await mkGitRepoRoot();
    const runId = "run-recipe-out-of-scope-write";
    await configureCustomRunner(root, [
      "#!/bin/sh",
      "set -eu",
      "cat >/dev/null",
      'mkdir -p "$TEST_REPOSITORY_ROOT/src"',
      'printf "%s\\n" "outside recipe scope" > "$TEST_REPOSITORY_ROOT/src/out.txt"',
      String.raw`printf '%s\n' '{"schema_version":1,"summary":"custom runner completed"}' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
      "exit 0",
    ]);
    const taskId = await createDoingCodeTask(root, "Reject recipe scope escape");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const { recipe, target } = recipeExecution(taskId);

    const executed = await executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
      recipe,
      target,
    });

    expect(await readFile(path.join(root, "src", "out.txt"), "utf8")).toBe(
      "outside recipe scope\n",
    );
    expect(executed.bundle.execution.write_scope?.writable_roots).toEqual(["reports"]);
    expect(executed.invocation.env.AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO).toBe(
      JSON.stringify(["reports"]),
    );
    expect(executed.result).toMatchObject({
      status: "failed",
      exit_code: 0,
      execution_receipt: {
        verification_state: "rejected",
        observed_by: "agentplane",
      },
    });

    const receipt = JSON.parse(await readFile(executed.invocation.receipt_path, "utf8")) as {
      scope_evaluation?: {
        state?: string;
        writable_roots?: string[];
        violations?: { path?: string; kind?: string }[];
      };
      checks?: { id?: string; required?: boolean; status?: string }[];
      success_policy?: { outcome?: string };
    };
    expect(receipt.scope_evaluation).toMatchObject({
      state: "rejected",
      writable_roots: ["reports"],
    });
    expect(receipt.scope_evaluation?.violations).toEqual(
      expect.arrayContaining([{ path: "src/out.txt", kind: "out_of_scope" }]),
    );
    expect(receipt.checks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "runner.scope.within_authority",
          required: true,
          status: "failed",
        }),
      ]),
    );
    expect(receipt.success_policy?.outcome).toBe("rejected");
  });
});
