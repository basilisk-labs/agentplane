import { execFile } from "node:child_process";
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { parseTaskReadme, renderTaskReadme } from "@agentplaneorg/core/tasks";

import {
  installRunCliIntegrationHarness,
  mkGitRepoRootWithCommit,
  mkTempDir,
  writeConfig,
} from "@agentplane/testkit";

import { defaultConfig } from "./core-imports.js";
import {
  findTaskWorktree,
  describePacketEvidence,
  LOCALIZED_DIRECT_REFERENCE,
  readLifecycleMetrics,
  runCommand,
  runJson,
  scenarioMetrics,
  writeFrameworkHarnessGitignore,
  writePlannerResult,
  type AgentPacket,
} from "./task-create-planner-intent.testkit.js";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);

describe("task create planner intent", { timeout: 60_000 }, () => {
  it("keeps a localized product change direct", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeFrameworkHarnessGitignore(root);
    await cp(
      path.join(process.cwd(), ".agentplane", "policy"),
      path.join(root, ".agentplane", "policy"),
      { recursive: true },
    );
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    await execFileAsync("git", ["add", "-A"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed localized direct task"], {
      cwd: root,
    });
    const metrics = scenarioMetrics();
    const created = await runJson(
      root,
      [
        "task",
        "create",
        "Add the status badge to the local preview card",
        "--description",
        "Implement the badge component and its unit test without external effects.",
        "--verify",
        "git diff --check",
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
        schema_version: 2,
        preferred_mode: "direct",
        scope_roots: ["packages/app/src/components/preview-badge.tsx"],
        repository_effects: ["repository_write", "source_code", "tests"],
        external_effects: [],
        requirements_uncertainty: "bounded",
        implementation_uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["localized UI change with no provider or deployment action"],
      },
    });

    const approval = (await runJson(
      root,
      ["task", "advance", taskId, "--result", resultPath, "--agent-json"],
      metrics,
    )) as {
      operator_action: {
        host_user_decision: { request: Record<string, unknown> };
      };
    };
    const hostDecision = Buffer.from(
      JSON.stringify({
        schema_version: 1,
        ...approval.operator_action.host_user_decision.request,
        host_id: "codex",
        conversation_id: "one-confirmation-e2e",
        message_id: "user-approval-1",
        decided_at: "2026-08-21T10:00:00.000Z",
      }),
      "utf8",
    ).toString("base64url");
    await runCommand(
      root,
      ["task", "plan", "approve", taskId, "--host-user-decision", hostDecision],
      metrics,
    );
    let implementationCheckout = root;
    let implementation = (await runJson(
      root,
      ["task", "advance", taskId, "--agent-json"],
      metrics,
    )) as AgentPacket;
    if (implementation.action.kind === "framework_transition") {
      implementationCheckout = await findTaskWorktree(root, taskId);
      implementation = (await runJson(
        implementationCheckout,
        ["task", "advance", taskId, "--agent-json"],
        metrics,
      )) as AgentPacket;
    }
    if (implementation.exchange) {
      const initialExchange = JSON.parse(
        await readFile(path.join(implementation.exchange.directory, "exchange.json"), "utf8"),
      ) as { purpose: string };
      if (initialExchange.purpose === "task_worktree_resolution") {
        const resolutionResult = await writePlannerResult({
          packet: implementation,
          summary: "Persist the deterministic task-worktree state before implementation.",
          includeIntent: false,
        });
        implementation = (await runJson(
          implementationCheckout,
          ["task", "advance", taskId, "--result", resolutionResult, "--agent-json"],
          metrics,
        )) as AgentPacket;
      }
    }
    expect(implementation.action.kind, JSON.stringify(implementation, null, 2)).toBe(
      "agent_episode",
    );
    expect(implementation.authority?.role).toBe("EXECUTOR");
    await mkdir(path.join(root, "packages", "app", "src", "components"), { recursive: true });
    await writeFile(
      path.join(root, "packages", "app", "src", "components", "preview-badge.tsx"),
      "export const previewBadge = 'available';\n",
      "utf8",
    );
    const implementationResult = await writePlannerResult({
      packet: implementation,
      summary: "Implemented the localized preview badge.",
      includeIntent: false,
    });
    const verificationStartedAt = performance.now();
    const evaluator = (await runJson(
      root,
      ["task", "advance", taskId, "--result", implementationResult, "--agent-json"],
      metrics,
    )) as AgentPacket;
    metrics.verification_time_ms += performance.now() - verificationStartedAt;
    expect(evaluator.action.kind, JSON.stringify(evaluator, null, 2)).toBe("agent_episode");
    expect(evaluator.authority?.role, await describePacketEvidence(evaluator)).toBe("EVALUATOR");
    const evaluatorResult = await writePlannerResult({
      packet: evaluator,
      summary: "The localized badge and focused verification satisfy the task.",
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
      selected_mode: string;
      reason_codes: string[];
      observed: { changed_paths: string[]; verification_results: unknown[] };
    };
    metrics.work_preserved = finalContract.observed.changed_paths.includes(
      "packages/app/src/components/preview-badge.tsx",
    );

    expect((terminal.action as { kind: string }).kind).toBe("terminal");
    expect(finalFrontmatter.status).toBe("DONE");
    expect(finalContract).toMatchObject({
      selected_mode: "direct",
      reason_codes: ["agent_preferred_direct_compatible"],
    });
    expect(metrics).toMatchObject({
      control_plane_commands: LOCALIZED_DIRECT_REFERENCE.control_plane_commands,
      approval_boundaries: LOCALIZED_DIRECT_REFERENCE.approval_boundaries,
      work_preserved: true,
      recovery_commands: 0,
    });
    expect(metrics.lifecycle_transitions).toBe(LOCALIZED_DIRECT_REFERENCE.lifecycle_transitions);
    expect(metrics.verification_time_ms).toBeGreaterThan(0);
    expect(finalContract.observed.verification_results.length).toBeGreaterThan(0);
  }, 60_000);

  it("respects an agent-selected branch_pr route for broad multi-component work", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeFrameworkHarnessGitignore(root);
    await cp(
      path.join(process.cwd(), ".agentplane", "policy"),
      path.join(root, ".agentplane", "policy"),
      { recursive: true },
    );
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    await runCommand(root, ["branch", "base", "set", "main"], scenarioMetrics());
    await execFileAsync("git", ["add", "-A"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed broad branch task"], { cwd: root });
    const metrics = scenarioMetrics();
    const created = await runJson(
      root,
      [
        "task",
        "create",
        "Add one customer capability across the SDK and application",
        "--verify",
        "git diff --check",
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
      summary: "Update the SDK client, application integration, and focused tests.",
      includeIntent: true,
      execution: {
        schema_version: 1,
        preferred_mode: "branch_pr",
        scope_roots: ["packages/sdk/src/client.ts", "packages/app/src/integration.ts", "tests/sdk"],
        repository_effects: ["repository_write", "source_code", "tests"],
        external_effects: [],
        uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["broad coordinated product change is easier to review in an isolated branch"],
      },
    });

    await runJson(
      root,
      ["task", "advance", taskId, "--result", resultPath, "--agent-json"],
      metrics,
    );
    const accepted = await runJson(root, ["task", "brief", taskId, "--json"], metrics);
    expect(accepted.workflow).toMatchObject({ mode: "branch_pr" });
    expect(accepted.task).toMatchObject({
      execution_contract: {
        selected_mode: "branch_pr",
        reason_codes: ["agent_preferred_branch_pr"],
        safety: { requires_worktree: true, requires_user_approval: false },
      },
    });
    const contract = (
      accepted.task as { execution_contract: { verification: { required_evidence: string[] } } }
    ).execution_contract;
    expect(contract.verification.required_evidence).toEqual(
      expect.arrayContaining([
        "repository_effect:source_code",
        "repository_effect:tests",
        "hosted_integration",
      ]),
    );
    await runCommand(root, ["task", "plan", "approve", taskId, "--by", "USER"], metrics);
    let implementationCheckout = root;
    let implementation = (await runJson(
      root,
      ["task", "advance", taskId, "--agent-json"],
      metrics,
    )) as AgentPacket;
    if (implementation.action.kind === "framework_transition") {
      implementationCheckout = await findTaskWorktree(root, taskId);
      implementation = (await runJson(
        implementationCheckout,
        ["task", "advance", taskId, "--agent-json"],
        metrics,
      )) as AgentPacket;
    }
    expect(implementation.action.kind, JSON.stringify(implementation, null, 2)).toBe(
      "agent_episode",
    );
    expect(implementation.authority?.role).toBe("EXECUTOR");
    if (!implementation.exchange) throw new Error("expected branch implementation exchange");
    const workOrder = JSON.parse(
      await readFile(
        path.join(implementation.exchange.directory, implementation.exchange.work_order_ref),
        "utf8",
      ),
    ) as { state_fingerprint: { worktree: string } };
    const checkout = workOrder.state_fingerprint.worktree;
    const publishRemote = await mkTempDir();
    await execFileAsync("git", ["init", "--bare", "--quiet", publishRemote], { cwd: checkout });
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: checkout,
    });
    await execFileAsync("git", ["remote", "set-url", "--push", "origin", publishRemote], {
      cwd: checkout,
    });
    const branchResult = await execFileAsync("git", ["branch", "--show-current"], {
      cwd: checkout,
    });
    const branch = branchResult.stdout.trim();
    const fakeGh = path.join(root, ".git", "fake-gh.mjs");
    const fakeGhState = path.join(root, ".git", "fake-gh-pr-created");
    await writeFile(
      fakeGh,
      [
        'import { existsSync, writeFileSync } from "node:fs";',
        'import { execFileSync } from "node:child_process";',
        "const args = process.argv.slice(2);",
        'if (args[0] !== "api") process.exit(90);',
        'const endpoint = args[1] ?? "";',
        'const [route, query = ""] = endpoint.split("?", 2);',
        "const params = new URLSearchParams(query);",
        'let method = "GET";',
        'for (let i = 2; i < args.length; i += 1) { if (args[i] === "-X" && typeof args[i + 1] === "string") method = String(args[i + 1]).toUpperCase(); }',
        `const statePath = ${JSON.stringify(fakeGhState)};`,
        `const expectedHead = ${JSON.stringify(`example:${branch}`)};`,
        'const sha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();',
        `const pr = { number: 321, html_url: "https://github.com/example/repo/pull/321", state: "open", merged_at: null, merge_commit_sha: null, head: { ref: ${JSON.stringify(branch)}, sha }, base: { ref: "main", sha: "provider-base-sha" } };`,
        'if (endpoint === "graphql") { console.log(JSON.stringify({ data: { repository: { pullRequest: { reviewThreads: { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } } } } } })); process.exit(0); }',
        'if (route === "repos/example/repo/pulls" && method === "POST") {',
        '  writeFileSync(statePath, "created\\n", "utf8");',
        "  console.log(JSON.stringify(pr));",
        "  process.exit(0);",
        "}",
        'if (route === "repos/example/repo/pulls" && method === "GET" && params.get("head") === expectedHead) { console.log(JSON.stringify(existsSync(statePath) ? [pr] : [])); process.exit(0); }',
        'if (route === "repos/example/repo/pulls/321") { console.log(JSON.stringify(pr)); process.exit(0); }',
        'if (route === "repos/example/repo/pulls/321/reviews") { console.log("[]"); process.exit(0); }',
        'if (route === "repos/example/repo/pulls/321/requested_reviewers") { console.log(JSON.stringify({ users: [], teams: [] })); process.exit(0); }',
        'if (route.endsWith("/check-runs")) { console.log(JSON.stringify({ total_count: 0, check_runs: [] })); process.exit(0); }',
        'if (route.endsWith("/statuses")) { console.log("[]"); process.exit(0); }',
        'console.log("[]");',
      ].join("\n"),
      "utf8",
    );
    process.env.AGENTPLANE_GH_BIN = process.execPath;
    process.env.AGENTPLANE_GH_ARGS = JSON.stringify([fakeGh]);
    const exchangeState = JSON.parse(
      await readFile(path.join(implementation.exchange.directory, "exchange.json"), "utf8"),
    ) as { purpose: string; baseline: { changed_paths: string[] } };
    expect(exchangeState.purpose).toBe("implementation");
    const currentStatus = await execFileAsync(
      "git",
      ["status", "--short", "--untracked-files=all"],
      { cwd: checkout },
    );
    expect(
      exchangeState.baseline.changed_paths,
      `baseline=${JSON.stringify(exchangeState.baseline.changed_paths)} current=${JSON.stringify(currentStatus.stdout.split("\n").filter(Boolean))}`,
    ).toEqual(currentStatus.stdout.split("\n").filter(Boolean));
    await mkdir(path.join(checkout, "packages", "sdk", "src"), { recursive: true });
    await mkdir(path.join(checkout, "packages", "app", "src"), { recursive: true });
    await mkdir(path.join(checkout, "tests", "sdk"), { recursive: true });
    await writeFile(
      path.join(checkout, "packages", "sdk", "src", "client.ts"),
      "export const customerCapability = true;\n",
      "utf8",
    );
    await writeFile(
      path.join(checkout, "packages", "app", "src", "integration.ts"),
      "export const sdkIntegration = 'enabled';\n",
      "utf8",
    );
    await writeFile(
      path.join(checkout, "tests", "sdk", "capability.test.ts"),
      "export const customerCapabilityIsCovered = true;\n",
      "utf8",
    );
    const implementationResult = await writePlannerResult({
      packet: implementation,
      summary: "Implemented the capability across the declared SDK, application, and test roots.",
      includeIntent: false,
    });
    const statusBeforeReturn = await execFileAsync(
      "git",
      ["status", "--short", "--untracked-files=all"],
      { cwd: checkout },
    );
    const newStatusLines = statusBeforeReturn.stdout
      .split("\n")
      .filter(Boolean)
      .filter((line) => !exchangeState.baseline.changed_paths.includes(line));
    expect(newStatusLines).toEqual([
      "?? packages/app/src/integration.ts",
      "?? packages/sdk/src/client.ts",
      "?? tests/sdk/capability.test.ts",
    ]);
    const verificationStartedAt = performance.now();
    let evaluator = (await runJson(
      root,
      ["task", "advance", taskId, "--result", implementationResult, "--agent-json"],
      metrics,
    )) as AgentPacket;
    metrics.verification_time_ms += performance.now() - verificationStartedAt;
    if (evaluator.action.kind === "approval_required") {
      expect(evaluator.operator_action).toMatchObject({
        kind: "grant_side_effect_authority",
        cwd: checkout,
      });
      if (!evaluator.operator_action?.argv) throw new Error("expected exact authority argv");
      const authorityArgv = evaluator.operator_action.argv.slice(1);
      const receiptIndex = authorityArgv.indexOf("--approval-receipt");
      if (receiptIndex !== -1) authorityArgv.splice(receiptIndex, 2, "--by", "USER");
      await runCommand(evaluator.operator_action.cwd ?? checkout, authorityArgv, metrics);
      evaluator = (await runJson(
        checkout,
        ["task", "advance", taskId, "--agent-json"],
        metrics,
      )) as AgentPacket;
    }
    const evaluatorRoute =
      evaluator.action.kind === "framework_transition"
        ? await runJson(checkout, ["task", "next-action", taskId, "--explain", "--json"])
        : null;
    expect(
      evaluator.action.kind,
      JSON.stringify({ packet: evaluator, route: evaluatorRoute }, null, 2),
    ).toBe("agent_episode");
    expect(evaluator.authority?.role, await describePacketEvidence(evaluator)).toBe("EVALUATOR");
    const evaluatorResult = await writePlannerResult({
      packet: evaluator,
      summary: "The broad implementation matches its declared scope and verification evidence.",
      includeIntent: false,
      review: {
        verdict: "pass",
        missing_tests: [],
        hidden_assumptions: [],
        residual_risks: [],
      },
    });
    const boundary = await runJson(
      checkout,
      ["task", "advance", taskId, "--result", evaluatorResult, "--agent-json"],
      metrics,
    );
    const finalFrontmatter = await readLifecycleMetrics(checkout, taskId, metrics);
    const finalContract = finalFrontmatter.execution_contract as {
      observed: { changed_paths: string[]; verification_results: unknown[] };
    };
    metrics.work_preserved = [
      "packages/sdk/src/client.ts",
      "packages/app/src/integration.ts",
      "tests/sdk/capability.test.ts",
    ].every((changedPath) => finalContract.observed.changed_paths.includes(changedPath));
    const boundaryRoute = await runJson(checkout, [
      "task",
      "next-action",
      taskId,
      "--explain",
      "--json",
    ]);

    expect(
      (boundary.action as { kind: string }).kind,
      JSON.stringify({ boundary, boundaryRoute }, null, 2),
    ).toBe("framework_transition");
    expect((boundary as AgentPacket).operator_action).toBeUndefined();
    expect(boundaryRoute).toMatchObject({
      workflow_step: { id: "route.remote.refresh", kind: "cli_operation" },
      execution_packet: { safe_to_mutate: false },
    });
    expect(finalFrontmatter.verification).toMatchObject({ state: "ok" });
    expect(finalFrontmatter.quality_review).toMatchObject({ state: "pass" });
    expect(metrics).toMatchObject({
      control_plane_commands: 8,
      approval_boundaries: 1,
      work_preserved: true,
      recovery_commands: 0,
    });
    expect(metrics.lifecycle_transitions).toBe(4);
    expect(metrics.verification_time_ms).toBeGreaterThan(0);
    expect(finalContract.observed.verification_results.length).toBeGreaterThan(0);
    expect(metrics.control_plane_commands).toBeGreaterThan(
      LOCALIZED_DIRECT_REFERENCE.control_plane_commands,
    );
  }, 120_000);

  it("ignores misleading product language when the declared work is local documentation", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeFrameworkHarnessGitignore(root);
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    const metrics = scenarioMetrics();
    const created = await runJson(
      root,
      [
        "task",
        "create",
        "Document the production server release and deployment vocabulary",
        "--description",
        "Edit one local glossary page without provider or publishing effects.",
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
      summary: "Update the local glossary and run its documentation check.",
      includeIntent: true,
      execution: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["docs/glossary.mdx"],
        repository_effects: ["repository_write", "documentation"],
        external_effects: [],
        uncertainty: "bounded",
        reversibility: "reversible",
        rationale: ["words in the request do not imply external effects"],
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
    expect(brief.task).toMatchObject({
      execution_contract: {
        selected_mode: "direct",
        reason_codes: ["agent_preferred_direct_compatible"],
        authority: { allowed_external_effects: [] },
      },
    });
    expect(metrics).toMatchObject({
      control_plane_commands: 4,
      approval_boundaries: 1,
      verification_time_ms: 0,
      work_preserved: false,
      recovery_commands: 0,
    });
    expect(metrics.lifecycle_transitions).toBe(0);
  });

  it("preserves underestimated direct work during one deterministic branch_pr escalation", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeFrameworkHarnessGitignore(root);
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
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
    const metrics = scenarioMetrics();
    const created = await runJson(
      root,
      [
        "task",
        "create",
        "Add local package metadata used by the product",
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
    expect(metrics.lifecycle_transitions).toBe(3);
  }, 60_000);

  it("keeps declared deployment and destructive Git effects forbidden", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeFrameworkHarnessGitignore(root);
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
    expect(metrics.lifecycle_transitions).toBe(0);
  });

  it("issues network-read authority only after the configured user approval boundary", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeFrameworkHarnessGitignore(root);
    const config = defaultConfig();
    config.workflow_mode = "direct";
    config.agents.approvals.require_network = true;
    await writeConfig(root, config);
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
    expect(metrics.lifecycle_transitions).toBe(1);
  }, 60_000);

  it("loads an existing contract without a migration command and completes direct work", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeFrameworkHarnessGitignore(root);
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify({
        private: true,
        scripts: {
          "ci:local:full": `node -e "require('node:assert/strict').equal(require('node:fs').readFileSync('status-label.txt', 'utf8'), 'Available\\n')"`,
        },
      }),
      "utf8",
    );
    await cp(
      path.join(process.cwd(), ".agentplane", "policy"),
      path.join(root, ".agentplane", "policy"),
      { recursive: true },
    );
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
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
    expect(evaluator.authority?.role, await describePacketEvidence(evaluator)).toBe("EVALUATOR");
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
    expect(metrics.lifecycle_transitions).toBe(4);
    expect(metrics.verification_time_ms).toBeGreaterThan(0);
    expect(metrics.work_preserved).toBe(true);
    expect(metrics.recovery_commands).toBe(0);
  }, 60_000);
});
