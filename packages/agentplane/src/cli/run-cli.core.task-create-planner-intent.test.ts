import { execFile } from "node:child_process";
import { cp, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { parseTaskReadme, renderTaskReadme } from "@agentplaneorg/core/tasks";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";

import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import type { TaskExecutionDeclaration } from "@agentplaneorg/core/tasks";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);

type AgentPacket = {
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  action: { kind: string; instruction: string };
  authority?: { network: string; required: boolean };
  exchange?: {
    directory: string;
    work_order_ref: string;
    result_ref: string;
  };
};

type ScenarioMetrics = {
  control_plane_commands: number;
  approval_boundaries: number;
  lifecycle_transitions: number;
  verification_time_ms: number;
  work_preserved: boolean;
  recovery_commands: number;
};

function scenarioMetrics(): ScenarioMetrics {
  return {
    control_plane_commands: 0,
    approval_boundaries: 0,
    lifecycle_transitions: 0,
    verification_time_ms: 0,
    work_preserved: false,
    recovery_commands: 0,
  };
}

function observeCommand(
  metrics: ScenarioMetrics | undefined,
  argv: readonly string[],
  payload?: Record<string, unknown>,
  elapsedMs = 0,
): void {
  if (!metrics) return;
  metrics.control_plane_commands += 1;
  if ((payload?.action as { kind?: string } | undefined)?.kind === "approval_required") {
    metrics.approval_boundaries += 1;
  }
  if (argv[0] === "verify") metrics.verification_time_ms += elapsedMs;
  if (argv.some((part) => ["reclaim", "reconcile", "repair"].includes(part))) {
    metrics.recovery_commands += 1;
  }
}

async function runJson(
  root: string,
  argv: string[],
  metrics?: ScenarioMetrics,
): Promise<Record<string, unknown>> {
  const io = captureStdIO();
  const startedAt = performance.now();
  try {
    const code = await runCli([...argv, "--root", root]);
    expect(code, io.stderr).toBe(0);
    const payload = JSON.parse(io.stdout) as Record<string, unknown>;
    observeCommand(metrics, argv, payload, performance.now() - startedAt);
    return payload;
  } finally {
    io.restore();
  }
}

async function runCommand(root: string, argv: string[], metrics: ScenarioMetrics): Promise<void> {
  const io = captureStdIO();
  const startedAt = performance.now();
  try {
    expect(await runCli([...argv, "--root", root]), io.stderr).toBe(0);
    observeCommand(metrics, argv, undefined, performance.now() - startedAt);
  } finally {
    io.restore();
  }
}

async function readLifecycleMetrics(
  root: string,
  taskId: string,
  metrics: ScenarioMetrics,
): Promise<Record<string, unknown>> {
  const parsed = parseTaskReadme(
    await readFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), "utf8"),
  ).frontmatter;
  metrics.lifecycle_transitions = Array.isArray(parsed.events) ? parsed.events.length : 0;
  return parsed;
}

async function writePlannerResult(opts: {
  packet: AgentPacket;
  summary: string;
  includeIntent: boolean;
  execution?: TaskExecutionDeclaration;
  review?: {
    verdict: "pass" | "rework" | "blocked" | "human_review";
    missing_tests: string[];
    hidden_assumptions: string[];
    residual_risks: string[];
  };
}): Promise<string> {
  const exchange = opts.packet.exchange;
  if (!exchange) throw new Error("expected external-agent exchange");
  const workOrder = JSON.parse(
    await readFile(path.join(exchange.directory, exchange.work_order_ref), "utf8"),
  ) as { work_order_id: string; role: string };
  const resultPath = path.join(exchange.directory, exchange.result_ref);
  await writeFile(
    resultPath,
    `${JSON.stringify(
      {
        schema_version: 1,
        kind: "agent_action_result",
        task_id: opts.packet.task_id,
        transition_id: opts.packet.transition_id,
        state_fingerprint: opts.packet.state_fingerprint,
        role: workOrder.role,
        result: {
          schema_version: 2,
          kind: "agent_semantic_result",
          work_order_id: workOrder.work_order_id,
          status: "completed",
          summary: opts.summary,
          findings: opts.review ? ["The frozen implementation satisfies the declared intent."] : [],
          uncertainty: [],
          ...(opts.review ? { review: opts.review } : {}),
          ...(opts.includeIntent
            ? {
                task_intent: {
                  task_kind: "code",
                  mutation_scope: "code",
                  risk_flags: [],
                  tags: ["cli", "parser"],
                  execution: opts.execution ?? {
                    schema_version: 1,
                    preferred_mode: "direct",
                    scope_roots: ["packages/agentplane/src/cli"],
                    repository_effects: ["repository_write", "source_code", "tests"],
                    external_effects: [],
                    uncertainty: "bounded",
                    reversibility: "reversible",
                    rationale: ["localized parser change with existing tests"],
                  },
                },
              }
            : {}),
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return resultPath;
}

describe("task create planner intent", { timeout: 60_000 }, () => {
  it("preserves a reusable envelope and re-resolves the route from typed intent", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const created = await runJson(root, [
      "task",
      "create",
      "Исправить разбор конфигурации CLI",
      "--description",
      "Пользовательский запрос не должен классифицироваться проверкой слов.",
      "--route",
      "auto",
      "--verify",
      "bun run test:critical",
      "--json",
    ]);
    const taskId = created.task_id as string;
    const issued = (await runJson(root, [
      "task",
      "advance",
      taskId,
      "--agent-json",
    ])) as AgentPacket;
    expect(issued.action.instruction).toContain("result.task_intent");
    const plan = "1. Inspect the parser. 2. Implement the fix. 3. Run the declared checks.";

    const incompletePath = await writePlannerResult({
      packet: issued,
      summary: plan,
      includeIntent: false,
    });
    const incompleteIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "advance",
        taskId,
        "--result",
        incompletePath,
        "--agent-json",
        "--root",
        root,
      ]);
      expect(code).not.toBe(0);
      expect(incompleteIo.stderr).toContain("must include task_intent");
    } finally {
      incompleteIo.restore();
    }
    if (!issued.exchange) throw new Error("expected external-agent exchange");
    expect(
      JSON.parse(await readFile(path.join(issued.exchange.directory, "exchange.json"), "utf8")),
    ).toMatchObject({ status: "issued", result_digest: null });

    const resultPath = await writePlannerResult({
      packet: issued,
      summary: plan,
      includeIntent: true,
    });
    const accepted = await runJson(root, [
      "task",
      "advance",
      taskId,
      "--result",
      resultPath,
      "--agent-json",
    ]);
    expect((accepted.action as { kind: string }).kind).toBe("approval_required");
    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain('task_kind: "code"');
    expect(readme).toContain('mutation_scope: "code"');
    expect(readme).toContain('requested_mode: "auto"');
    expect(readme).toContain("execution_contract:");
    expect(readme).toContain('preferred_mode: "direct"');
    expect(readme).not.toContain("mutation_scope_unknown");
    const brief = await runJson(root, ["task", "brief", taskId, "--json"]);
    expect((brief.blueprint as { blueprint_id: string }).blueprint_id).toBe("code.branch_pr");
  });

  it("keeps a localized product change direct even when its wording contains deployment terms", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    const metrics = scenarioMetrics();
    const created = await runJson(
      root,
      [
        "task",
        "create",
        "Add the deployment badge to the local preview card",
        "--description",
        "Implement the badge component and its unit test without external effects.",
        "--json",
      ],
      metrics,
    );
    const taskId = created.task_id as string;
    const issued = (await runJson(
      root,
      ["task", "advance", taskId, "--agent-json"],
      metrics,
    )) as AgentPacket;
    const resultPath = await writePlannerResult({
      packet: issued,
      summary: "Implement the preview badge and verify the component test.",
      includeIntent: true,
      execution: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["packages/app/src/components/preview-badge.tsx"],
        repository_effects: ["repository_write", "source_code", "tests"],
        external_effects: [],
        uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["localized UI change with no provider or deployment action"],
      },
    });

    await runJson(
      root,
      ["task", "advance", taskId, "--result", resultPath, "--agent-json"],
      metrics,
    );
    const brief = await runJson(root, ["task", "brief", taskId, "--json"], metrics);
    await readLifecycleMetrics(root, taskId, metrics);
    expect(brief.workflow).toMatchObject({ mode: "direct" });
    expect(brief.blueprint).toMatchObject({ blueprint_id: "code.direct" });
    expect(brief.task).toMatchObject({
      execution_contract: {
        source: "agent_declared",
        selected_mode: "direct",
        reason_codes: ["agent_preferred_direct_compatible"],
      },
    });
    expect(metrics).toMatchObject({
      control_plane_commands: 4,
      approval_boundaries: 1,
      verification_time_ms: 0,
      work_preserved: false,
      recovery_commands: 0,
    });
  });

  it("escalates a user product SDK and schema change before implementation", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    const metrics = scenarioMetrics();
    const created = await runJson(
      root,
      ["task", "create", "Expose a new SDK capability and persist its schema", "--json"],
      metrics,
    );
    const taskId = created.task_id as string;
    const issued = (await runJson(
      root,
      ["task", "advance", taskId, "--agent-json"],
      metrics,
    )) as AgentPacket;
    const resultPath = await writePlannerResult({
      packet: issued,
      summary: "Update the SDK surface, schema, compatibility tests, and migration evidence.",
      includeIntent: true,
      execution: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["packages/sdk", "schemas"],
        repository_effects: ["repository_write", "source_code", "tests", "public_api", "schema"],
        external_effects: [],
        uncertainty: "bounded",
        reversibility: "recovery_required",
        rationale: ["public contract and persisted schema change atomically"],
      },
    });

    await runJson(
      root,
      ["task", "advance", taskId, "--result", resultPath, "--agent-json"],
      metrics,
    );
    const brief = await runJson(root, ["task", "brief", taskId, "--json"], metrics);
    await readLifecycleMetrics(root, taskId, metrics);
    expect(brief.workflow).toMatchObject({ mode: "branch_pr" });
    expect(brief.task).toMatchObject({
      execution_contract: {
        selected_mode: "branch_pr",
        safety: { requires_worktree: true, requires_user_approval: false },
      },
    });
    const contract = (
      brief.task as { execution_contract: { verification: { required_evidence: string[] } } }
    ).execution_contract;
    expect(contract.verification.required_evidence).toEqual(
      expect.arrayContaining([
        "repository_effect:public_api",
        "repository_effect:schema",
        "hosted_integration",
      ]),
    );
    expect(metrics).toMatchObject({
      control_plane_commands: 4,
      approval_boundaries: 1,
      verification_time_ms: 0,
      work_preserved: false,
      recovery_commands: 0,
    });
  });

  it("preserves underestimated direct work during one deterministic branch_pr escalation", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    const metrics = scenarioMetrics();
    const created = await runJson(
      root,
      ["task", "create", "Add local package metadata used by the product", "--json"],
      metrics,
    );
    const taskId = created.task_id as string;
    const planning = (await runJson(
      root,
      ["task", "advance", taskId, "--agent-json"],
      metrics,
    )) as AgentPacket;
    const planningResult = await writePlannerResult({
      packet: planning,
      summary: "Add the local metadata file and run the focused parser check.",
      includeIntent: true,
      execution: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["package.json"],
        repository_effects: ["repository_write", "source_code"],
        external_effects: [],
        uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["expected to be a localized source edit"],
      },
    });
    await runJson(
      root,
      ["task", "advance", taskId, "--result", planningResult, "--agent-json"],
      metrics,
    );
    await runCommand(root, ["task", "plan", "approve", taskId, "--by", "USER"], metrics);
    await execFileAsync("git", ["add", "-A"], { cwd: root });
    await execFileAsync(
      "git",
      [
        "-c",
        "user.name=AgentPlane Test",
        "-c",
        "user.email=test@example.invalid",
        "commit",
        "-m",
        "test: seed underestimated execution task",
      ],
      { cwd: root },
    );
    const implementation = (await runJson(
      root,
      ["task", "advance", taskId, "--agent-json"],
      metrics,
    )) as AgentPacket;
    expect(implementation.action.kind).toBe("agent_episode");
    await writeFile(path.join(root, "package.json"), '{"name":"user-product"}\n', "utf8");
    const implementationResult = await writePlannerResult({
      packet: implementation,
      summary: "Added the requested local package metadata.",
      includeIntent: false,
    });
    await runJson(
      root,
      ["task", "advance", taskId, "--result", implementationResult, "--agent-json"],
      metrics,
    );
    const frontmatter = await readLifecycleMetrics(root, taskId, metrics);
    const contract = frontmatter.execution_contract as {
      selected_mode: string;
      observed: { changed_paths: string[] };
      escalation: { preserved_commit?: string };
    };
    metrics.work_preserved =
      Boolean(contract.escalation?.preserved_commit) &&
      contract.observed.changed_paths.includes("package.json");

    expect(contract.selected_mode).toBe("branch_pr");
    expect(contract.escalation.preserved_commit).toMatch(/^[0-9a-f]{40}$/u);
    expect(metrics).toMatchObject({
      control_plane_commands: 6,
      approval_boundaries: 1,
      verification_time_ms: 0,
      work_preserved: true,
      recovery_commands: 0,
    });
    expect(metrics.lifecycle_transitions).toBeGreaterThanOrEqual(2);
  }, 60_000);

  it("keeps declared deployment and destructive Git effects forbidden", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    const metrics = scenarioMetrics();
    const created = await runJson(
      root,
      ["task", "create", "Deploy the service and rewrite provider history", "--json"],
      metrics,
    );
    const taskId = created.task_id as string;
    const planning = (await runJson(
      root,
      ["task", "advance", taskId, "--agent-json"],
      metrics,
    )) as AgentPacket;
    const resultPath = await writePlannerResult({
      packet: planning,
      summary: "Prepare the local configuration, then request operator-owned external actions.",
      includeIntent: true,
      execution: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["infra"],
        repository_effects: ["repository_write"],
        external_effects: ["deploy", "destructive_git"],
        uncertainty: "bounded",
        reversibility: "irreversible",
        rationale: ["agent assessed the requested effects but cannot authorize them"],
      },
    });
    await runJson(
      root,
      ["task", "advance", taskId, "--result", resultPath, "--agent-json"],
      metrics,
    );
    const brief = await runJson(root, ["task", "brief", taskId, "--json"], metrics);
    const contract = (
      brief.task as {
        execution_contract: {
          selected_mode: string;
          authority: { allowed_external_effects: string[]; forbidden_external_effects: string[] };
          safety: { requires_user_approval: boolean; approval_effects: string[] };
        };
      }
    ).execution_contract;
    await readLifecycleMetrics(root, taskId, metrics);

    expect(contract).toMatchObject({
      selected_mode: "branch_pr",
      authority: { allowed_external_effects: [] },
      safety: {
        requires_user_approval: true,
        approval_effects: ["deploy", "destructive_git"],
      },
    });
    expect(contract.authority.forbidden_external_effects).toEqual(
      expect.arrayContaining(["deploy", "destructive_git", "publish", "credentials"]),
    );
    expect(metrics).toMatchObject({
      control_plane_commands: 4,
      approval_boundaries: 1,
      verification_time_ms: 0,
      work_preserved: false,
      recovery_commands: 0,
    });
  });

  it("issues network-read authority only after the configured user approval boundary", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "direct";
    config.agents.approvals.require_network = true;
    await writeConfig(root, config);
    const metrics = scenarioMetrics();
    const created = await runJson(
      root,
      ["task", "create", "Refresh public package metadata", "--json"],
      metrics,
    );
    const taskId = created.task_id as string;
    const planning = (await runJson(
      root,
      ["task", "advance", taskId, "--agent-json"],
      metrics,
    )) as AgentPacket;
    expect(planning.authority?.network).toBe("deny");
    const planningResult = await writePlannerResult({
      packet: planning,
      summary: "Read public metadata, update the local cache file, and run the focused check.",
      includeIntent: true,
      execution: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["metadata-cache.json"],
        repository_effects: ["repository_write"],
        external_effects: ["network_read"],
        uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["read-only provider access with one local cache update"],
      },
    });
    const approval = await runJson(
      root,
      ["task", "advance", taskId, "--result", planningResult, "--agent-json"],
      metrics,
    );
    expect((approval.action as { kind: string }).kind).toBe("approval_required");
    const contract = ((approval.task as Record<string, unknown> | undefined) ??
      (await runJson(root, ["task", "brief", taskId, "--json"]))) as Record<string, unknown>;
    const taskContract = ((contract.execution_contract as Record<string, unknown> | undefined) ??
      (contract.task as { execution_contract: Record<string, unknown> }).execution_contract) as {
      authority: { allowed_external_effects: string[]; forbidden_external_effects: string[] };
      safety: { requires_user_approval: boolean; approval_effects: string[] };
    };
    expect(taskContract).toMatchObject({
      authority: { allowed_external_effects: ["network_read"] },
      safety: { requires_user_approval: true, approval_effects: ["network_read"] },
    });
    expect(taskContract.authority.forbidden_external_effects).not.toContain("network_read");
    await runCommand(root, ["task", "plan", "approve", taskId, "--by", "USER"], metrics);
    await execFileAsync("git", ["add", "-A"], { cwd: root });
    await execFileAsync(
      "git",
      [
        "-c",
        "user.name=AgentPlane Test",
        "-c",
        "user.email=test@example.invalid",
        "commit",
        "-m",
        "test: seed approved network-read task",
      ],
      { cwd: root },
    );
    const executor = (await runJson(
      root,
      ["task", "advance", taskId, "--agent-json"],
      metrics,
    )) as AgentPacket;
    await readLifecycleMetrics(root, taskId, metrics);

    expect(executor.action.kind).toBe("agent_episode");
    expect(executor.authority).toMatchObject({ network: "allowed", required: false });
    expect(metrics).toMatchObject({
      control_plane_commands: 5,
      approval_boundaries: 1,
      verification_time_ms: 0,
      work_preserved: false,
      recovery_commands: 0,
    });
  }, 60_000);

  it("loads an existing contract without a migration command and completes direct work", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await cp(
      path.join(process.cwd(), ".agentplane", "policy"),
      path.join(root, ".agentplane", "policy"),
      { recursive: true },
    );
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    const metrics = scenarioMetrics();
    const created = await runJson(
      root,
      [
        "task",
        "create",
        "Add a customer-visible status label",
        "--verify",
        "git diff --check",
        "--json",
      ],
      metrics,
    );
    const taskId = created.task_id as string;
    const planning = (await runJson(
      root,
      ["task", "advance", taskId, "--agent-json"],
      metrics,
    )) as AgentPacket;
    const planningResult = await writePlannerResult({
      packet: planning,
      summary: "Add the status label and execute the declared focused check.",
      includeIntent: true,
      execution: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["status-label.txt"],
        repository_effects: ["repository_write"],
        external_effects: [],
        uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["localized customer-facing content"],
      },
    });
    await runJson(
      root,
      ["task", "advance", taskId, "--result", planningResult, "--agent-json"],
      metrics,
    );
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const existing = parseTaskReadme(await readFile(readmePath, "utf8"));
    const contract = existing.frontmatter.execution_contract as Record<string, unknown>;
    delete contract.authority;
    contract.observed = { repository_effects: [], changed_paths: [] };
    await writeFile(readmePath, renderTaskReadme(existing.frontmatter, existing.body), "utf8");
    await runCommand(root, ["task", "plan", "approve", taskId, "--by", "USER"], metrics);
    await execFileAsync("git", ["add", "-A"], { cwd: root });
    await execFileAsync(
      "git",
      [
        "-c",
        "user.name=AgentPlane Test",
        "-c",
        "user.email=test@example.invalid",
        "commit",
        "-m",
        "test: seed existing contract lifecycle",
      ],
      { cwd: root },
    );
    const implementation = (await runJson(
      root,
      ["task", "advance", taskId, "--agent-json"],
      metrics,
    )) as AgentPacket;
    await writeFile(path.join(root, "status-label.txt"), "Available\n", "utf8");
    const implementationResult = await writePlannerResult({
      packet: implementation,
      summary: "Added the customer-visible status label.",
      includeIntent: false,
    });
    const verificationStartedAt = performance.now();
    const evaluator = (await runJson(
      root,
      ["task", "advance", taskId, "--result", implementationResult, "--agent-json"],
      metrics,
    )) as AgentPacket;
    metrics.verification_time_ms += performance.now() - verificationStartedAt;
    expect(evaluator.action.kind).toBe("agent_episode");
    const evaluatorResult = await writePlannerResult({
      packet: evaluator,
      summary: "The status-label change and focused check satisfy the task.",
      includeIntent: false,
      review: {
        verdict: "pass",
        missing_tests: [],
        hidden_assumptions: [],
        residual_risks: [],
      },
    });
    const terminal = await runJson(
      root,
      ["task", "advance", taskId, "--result", evaluatorResult, "--agent-json"],
      metrics,
    );
    const finalFrontmatter = await readLifecycleMetrics(root, taskId, metrics);
    const finalContract = finalFrontmatter.execution_contract as {
      authority: { writable_roots: string[] };
      observed: { changed_paths: string[] };
    };
    metrics.work_preserved = finalContract.observed.changed_paths.includes("status-label.txt");

    expect((terminal.action as { kind: string }).kind).toBe("terminal");
    expect(finalFrontmatter.status).toBe("DONE");
    expect(finalContract.authority.writable_roots).toEqual(["status-label.txt"]);
    expect(metrics.control_plane_commands).toBe(7);
    expect(metrics.approval_boundaries).toBe(1);
    expect(metrics.lifecycle_transitions).toBeGreaterThanOrEqual(4);
    expect(metrics.verification_time_ms).toBeGreaterThan(0);
    expect(metrics.work_preserved).toBe(true);
    expect(metrics.recovery_commands).toBe(0);
  }, 60_000);
});
