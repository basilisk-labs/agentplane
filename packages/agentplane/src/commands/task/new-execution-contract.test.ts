import { describe, expect, it } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import { runCli } from "../../cli/run-cli.js";
import { defaultConfig } from "../../cli/core-imports.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { canonicalPlanContractViolations } from "./kernel-plan-authority.js";
import { runTaskNewParsed } from "./new.js";
import { resolveExplicitExecutionContract } from "./execution-contract-intake.js";

installRunCliIntegrationHarness();

function plan(overrides: Partial<k.ExecutionRequirements> = {}): k.PlanRecord {
  const workItems = [
    {
      id: "fix",
      depends_on: [],
      required_inputs: [],
      expected_outputs: ["fix"],
      execution_requirements: {
        scope_roots: ["src/parser.ts", "tests/parser.test.ts"],
        repository_effects: ["repository_write", "source_code", "tests"],
        external_effects: [],
        capabilities: ["repository_write"],
        resources: [],
        ...overrides,
      },
      optional: false,
    },
  ];
  return {
    revision: 1,
    digest: k.kernelDigest({ revision: 1, work_items: workItems }),
    state: "PROPOSED",
    approval_actor_id: null,
    approval_evidence_digest: null,
    work_items: workItems,
  };
}

async function createFromCli(extra: string[] = []) {
  const root = await mkGitRepoRootWithBranch("main");
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  const io = captureStdIO();
  let taskId: string;
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Bounded source test repair",
      "--description",
      "Admit a bounded source and regression test plan.",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--task-kind",
      "code",
      "--mutation-scope",
      "code",
      "--verify",
      "node --version",
      ...extra,
      "--root",
      root,
    ]);
    expect(code, io.stderr).toBe(0);
    taskId = io.stdout.trim();
  } finally {
    io.restore();
  }
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = await ctx.taskBackend.getTask(taskId);
  expect(task).not.toBeNull();
  return task!;
}

describe("task new structured execution authority", { timeout: 180_000 }, () => {
  it("admits a bounded source-and-test plan with the default structured code envelope", async () => {
    const task = await createFromCli();
    expect(task.execution_contract?.declaration.scope_roots).toEqual(["."]);
    expect(task.execution_contract?.source).toBe("agent_declared");
    expect(canonicalPlanContractViolations(task, plan())).toEqual([]);
    expect(
      canonicalPlanContractViolations(task, plan({ external_effects: ["publish"] })),
    ).toContain("external_effects");
    expect(task.execution_route?.selected_mode).toBe(task.execution_contract?.selected_mode);
  });

  it("preserves explicit roots and resources while rejecting undeclared authority", async () => {
    const task = await createFromCli([
      "--scope-root",
      "src",
      "--scope-root",
      "tests",
      "--repository-effect",
      "tests",
      "--capability",
      "repository_write",
      "--resource",
      "parser-lock",
    ]);
    expect(task.execution_contract?.declaration.scope_roots).toEqual(["src", "tests"]);
    expect(canonicalPlanContractViolations(task, plan({ resources: ["parser-lock"] }))).toEqual([]);
    expect(
      canonicalPlanContractViolations(task, plan({ scope_roots: ["outside/file.ts"] })),
    ).toContain("scope_roots");
    expect(
      canonicalPlanContractViolations(task, plan({ repository_effects: ["schema"] })),
    ).toContain("repository_effects");
    expect(
      canonicalPlanContractViolations(task, plan({ capabilities: ["provider_write"] })),
    ).toContain("capabilities");
    expect(canonicalPlanContractViolations(task, plan({ resources: ["another-lock"] }))).toContain(
      "resources",
    );
  });

  it("preserves programmatically supplied execution contracts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    await writeConfig(root, config);
    const executionContract = resolveExplicitExecutionContract({
      config,
      intent: { taskKind: "code", mutationScope: "code", riskFlags: [] },
      parsed: { route: "auto", verify: [], scopeRoots: ["narrow"], repositoryEffects: ["tests"] },
    });
    const created = await runTaskNewParsed({
      cwd: root,
      rootOverride: root,
      printTaskId: false,
      parsed: {
        title: "Preserve supplied authority",
        description: "Do not derive a wider contract.",
        owner: "CODER",
        priority: "med",
        tags: ["code"],
        taskKind: "code",
        mutationScope: "code",
        dependsOn: [],
        verify: [],
        allowDuplicate: false,
        scopeRoots: ["."],
        executionContract,
      },
    });
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const task = await ctx.taskBackend.getTask(created.task_id);
    expect(task?.execution_contract).toEqual(executionContract);
  });
});
