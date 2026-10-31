import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { taskKernel } from "@agentplaneorg/core/tasks";
import { execFileSync } from "node:child_process";
import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, expect, it, vi } from "vitest";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import { fakeGithubProviderSource } from "./task-advance-effect-recovery.testkit.js";
import { runJson } from "./task-create-planner-intent.testkit.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
installRunCliIntegrationHarness();
const roots: string[] = [];
afterEach(async () => {
  for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true });
});
it("public workflow recovery cannot grant a retry to a nonterminal canonical task", async () => {
  const root = await mkGitRepoRootWithBranch("main");
  roots.push(root);
  execFileSync("git", ["commit", "--allow-empty", "-m", "fixture baseline"], { cwd: root });
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  const created = await runJson(root, [
    "task",
    "create",
    "Retry boundary fixture",
    "--description",
    "Exercise public terminal retry admission",
    "--task-kind",
    "code",
    "--mutation-scope",
    "code",
    "--scope-root",
    "result.txt",
    "--repository-effect",
    "source_code",
    "--verify",
    "node --version",
    "--json",
  ]);
  const id = String(created.task_id);
  const command = await loadCommandContext({ cwd: root, rootOverride: root });
  const before = await command.taskBackend.getTask(id);
  const head = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" });
  const input = path.join(root, ".git/retry.json");
  await writeFile(
    input,
    JSON.stringify({ schema_version: 1, kind: "verification_retry_request", task_id: id }),
  );
  const original = await readFile(input, "utf8");
  for (const remote of [[], ["--remote"]]) {
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "advance",
        id,
        "--workflow-recovery",
        input,
        ...remote,
        "--agent-json",
        "--root",
        root,
      ]);
      expect(code).not.toBe(0);
      expect(io.stderr).toContain(remote.length > 0 ? "already completed Task" : "--remote");
    } finally {
      io.restore();
    }
  }
  expect(await command.taskBackend.getTask(id)).toEqual(before);
  expect(await readFile(input, "utf8")).toBe(original);
  expect(execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" })).toBe(head);
});

// This fixture seeds a valid historical terminal record in an isolated repository.
// The retry itself must use the public CLI and the real backend/verifier without doubles.
it("public retry preserves a completed Kernel and executes fresh native checks without a legacy plan", async () => {
  const { taskKernel: k } = await import("@agentplaneorg/core/tasks");
  const {
    createSupervisorExecutionEpisodeJournal,
    startSupervisorExecutionEpisode,
    completeSupervisorExecutionEpisode,
  } = await import("@agentplaneorg/core/schemas");
  const { resolveSupervisorExecutionEpisodePath, createSupervisorEpisodeStore } =
    await import("../commands/shared/supervisor-execution-episode.js");
  const { resolveImplementationVerificationTask } =
    await import("../commands/task/external-agent-implementation-recovery.js");
  const { verificationRetryContractIdentity } =
    await import("../commands/task/verification-retry-source-proof.js");
  const { mkdir } = await import("node:fs/promises");
  const root = await mkGitRepoRootWithBranch("main");
  roots.push(root);
  const git = (args: string[]) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
  git(["commit", "--allow-empty", "-m", "fixture base"]);
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  const { ensureRuntimeGitignore, ensureRuntimeSqliteGitignore } =
    await import("../runtime/shared/runtime-gitignore.js");
  await writeFile(path.join(root, ".gitignore"), ".agentplane/cache/\n");
  await ensureRuntimeGitignore({ gitRoot: root });
  await ensureRuntimeSqliteGitignore({ gitRoot: root });
  await mkdir(path.join(root, ".agentplane/policy"), { recursive: true });
  for (const name of ["dod.code.md", "dod.core.md", "security.must.md", "workflow.branch_pr.md"]) {
    await writeFile(
      path.join(root, ".agentplane/policy", name),
      "# Fixture policy\nPreserve task authority and require independent review.\n",
    );
  }
  const baseIo = captureStdIO();
  try {
    expect(await runCli(["branch", "base", "set", "main", "--root", root]), baseIo.stderr).toBe(0);
  } finally {
    baseIo.restore();
  }
  git(["add", "."]);
  git(["commit", "-m", "fixture policy before frozen task intake"]);
  const created = await runJson(root, [
    "task",
    "create",
    "Terminal retry fixture",
    "--description",
    "Qualify public retry persistence with immutable historical evidence",
    "--task-kind",
    "code",
    "--mutation-scope",
    "code",
    "--scope-root",
    "check.mjs",
    "--scope-root",
    "package.json",
    "--repository-effect",
    "source_code",
    "--verify",
    "npm run test",
    "--json",
  ]);
  const taskId = String(created.task_id);
  const planning = await runJson(root, ["task", "advance", taskId, "--agent-json"]);
  const exchange = planning.exchange as { directory: string; result_path: string };
  const order = JSON.parse(
    await readFile(path.join(exchange.directory, "work-order.json"), "utf8"),
  ) as AgentWorkOrderV2;
  await writeFile(
    exchange.result_path,
    JSON.stringify({
      work_order_id: order.work_order_id,
      status: "completed",
      summary: "Fixture plan",
      findings: [],
      uncertainty: [],
      canonical_plan: {
        work_items: [
          {
            id: "build",
            depends_on: [],
            required_inputs: [],
            expected_outputs: ["source"],
            execution_requirements: {
              scope_roots: ["check.mjs", "package.json"],
              repository_effects: ["source_code"],
              external_effects: [],
              capabilities: ["repository_write"],
              resources: [],
            },
            optional: false,
            contract: {
              objective: "Check fixture",
              acceptance_criteria: ["Native check executes"],
              verification_commands: ["npm run test"],
              role: "EXECUTOR",
            },
          },
        ],
      },
    }),
  );
  await runJson(root, [
    "task",
    "advance",
    taskId,
    "--result",
    exchange.result_path,
    "--agent-json",
  ]);
  await runJson(root, [
    "task",
    "plan",
    "approve",
    taskId,
    "--by",
    "USER",
    "--note",
    "isolated fixture approval",
  ]);
  let command = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = (await command.taskBackend.getTask(taskId))!;
  const prior = task.extensions!.task_kernel as {
    repository_identity: taskKernel.Sha256Digest;
    aggregate: taskKernel.TaskAggregate;
    events: readonly taskKernel.DomainEvent[];
    documents?: Record<string, unknown>;
  };
  const plan = prior.aggregate.current_plan!;
  const identity = k.kernelDigest("isolated historical implementation");
  const validation = {
    status: "PASSED" as const,
    identity: {
      implementation_identity: identity,
      check_id: "fixture",
      command_digest: k.kernelDigest("npm run test"),
      toolchain_digest: k.kernelDigest("fixture toolchain"),
      environment_digest: k.kernelDigest("fixture environment"),
    },
    evidence_digests: [k.kernelDigest("fixture historical evidence")],
    observed_at: new Date().toISOString(),
  };
  const definition = plan.work_items[0]!;
  // Seed historical fixture data; the public CLI below validates it through the real adapter.
  const terminalContents = {
    schema_version: 1 as const,
    kind: "canonical_task" as const,
    repository_identity: prior.repository_identity,
    aggregate: {
      ...prior.aggregate,
      revision: prior.aggregate.revision + 1,
      state: "COMPLETED" as const,
      work_items: {
        build: {
          definition,
          state: "COMPLETED" as const,
          revision: 1,
          attempt: 1,
          claim_id: "fixture-claim",
          result_digest: identity,
          output_manifests: [
            {
              id: "source",
              kind: "source",
              digest: identity,
              task_id: taskId,
              plan_revision: plan.revision,
              work_item_id: "build",
              attempt: 1,
              repository_fingerprint: k.kernelDigest("fixture repository"),
            },
          ],
          validation,
        },
      },
      final_validation: validation,
    },
    events: prior.events,
    ...(prior.documents ? { documents: prior.documents } : {}),
  };
  const terminal = { ...terminalContents, digest: k.kernelDigest(terminalContents) };
  await command.taskBackend.writeTask(
    {
      ...task,
      status: "DONE",
      revision: terminal.aggregate.revision,
      verification: {
        state: "needs_rework",
        updated_at: new Date().toISOString(),
        updated_by: "SUPERVISOR",
        note: "fixture prior failure",
      },
      extensions: { ...task.extensions, task_kernel: terminal },
    },
    { expectedRevision: task.revision },
  );
  const prefix = `.agentplane/tasks/${taskId}`;
  await mkdir(path.join(root, prefix, "supervision"), { recursive: true });
  await mkdir(path.join(root, prefix, "quality"), { recursive: true });
  const failedRelative = `${prefix}/supervision/declared-checks.json`;
  const failed = {
    schema_version: 1,
    kind: "direct_task_declared_checks",
    task_id: taskId,
    status: "failed",
    checks: [{ command: "npm run test", exit_code: 1 }],
  };
  await writeFile(path.join(root, failedRelative), JSON.stringify(failed));
  await writeFile(path.join(root, prefix, "quality/old-eval.json"), '{"fixture":"old EVAL"}');
  await writeFile(
    path.join(root, "package.json"),
    JSON.stringify({ scripts: { test: "node check.mjs" } }),
  );
  await writeFile(
    path.join(root, "check.mjs"),
    "import{appendFileSync}from'node:fs';appendFileSync('.git/retry-executions','1');",
  );
  git(["switch", "-c", `task/${taskId}/retry-fixture`]);
  git(["add", "."]);
  git(["commit", "-m", "fixture terminal source and old receipts"]);
  const implementationHead = git(["rev-parse", "HEAD"]);
  command = await loadCommandContext({ cwd: root, rootOverride: root });
  const { projectKernelOperationalEvidence } =
    await import("../commands/task/kernel-operational-projection.js");
  // Seed the historical projection with its native producer. This fixture does not certify a past evaluator.
  await projectKernelOperationalEvidence({
    command,
    task_id: taskId,
    repository_evidence: {
      schema_version: 1,
      kind: "canonical_repository_evidence",
      task_id: taskId,
      work_item_id: "build",
      task_revision: terminal.aggregate.revision,
      work_order_id: k.kernelDigest("historical fixture inspection"),
      checkout: root,
      branch: `task/${taskId}/retry-fixture`,
      base_commit: git(["rev-parse", `${implementationHead}^`]),
      implementation_commit: implementationHead,
      implementation_tree: git(["rev-parse", `${implementationHead}^{tree}`]),
      changed_paths: ["check.mjs", "package.json"],
      evaluator_target: implementationHead,
      digest: k.kernelDigest("historical fixture repository evidence"),
      implementation_evidence: {
        artifact_path: "fixture",
        implementation_commit: implementationHead,
        changed_paths: ["check.mjs", "package.json"],
      },
    },
    verification_evidence_digest: identity,
    review_identity_digest: identity,
    evidence_refs: [`${prefix}/quality/old-eval.json`],
    findings: ["historical fixture"],
    projected_at: new Date().toISOString(),
  });
  const historical = (await command.taskBackend.getTask(taskId))!;
  await command.taskBackend.writeTask(
    {
      ...historical,
      revision: historical.revision! + 1,
      verification: {
        state: "needs_rework",
        updated_at: new Date().toISOString(),
        updated_by: "SUPERVISOR",
        note: "isolated current native failure",
      },
    },
    { expectedRevision: historical.revision },
  );
  git(["add", "--", `${prefix}/README.md`]);
  git(["commit", "-m", "fixture current failed validation projection"]);
  const head = git(["rev-parse", "HEAD"]);
  command = await loadCommandContext({ cwd: root, rootOverride: root });
  const current = (await command.taskBackend.getTask(taskId))!;
  expect(current.extensions?.task_kernel).toEqual(terminal);
  const verification = await resolveImplementationVerificationTask({
    command,
    checkout: root,
    task: current,
    workflow: "branch_pr",
  });
  const sourceSha = verification.snapshot.evaluated_sha!;
  expect(sourceSha).toBe(head);
  expect(verification.task.verify).toEqual(["npm run test"]);
  expect(
    verification.snapshot.changed_paths
      .filter((name) => !verification.snapshot.inherited_paths.includes(name))
      .toSorted(),
  ).toEqual(["check.mjs", "package.json"]);
  expect(verification.task.execution_contract?.authority.writable_roots.toSorted()).toEqual([
    "check.mjs",
    "package.json",
  ]);
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: root,
    task_id: taskId,
  });
  const createdJournal = createSupervisorExecutionEpisodeJournal({
    task_id: taskId,
    task_revision: current.revision!,
    state_fingerprint_digest: identity,
    budget: {
      max_episodes: 10,
      max_agent_runs: null,
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
    journal: createdJournal,
    role: "EXECUTOR",
    kind: "cli_operation",
    operation_identity: { direct_task_operation: "task_verify" },
    precondition_fingerprint_digest: identity,
    authority_ref: "direct-task-supervisor:task_verify",
    authority_digest: identity,
    effect_ref: "task_verify",
  });
  if (started.status !== "started") throw new Error("fixture journal admission failed");
  const journal = completeSupervisorExecutionEpisode({
    journal: started.journal,
    operation_key: started.operation_key,
    result: {
      direct_task_operation: "task_verify",
      result: { verification: "needs_rework", declared_checks: failedRelative },
    },
  });
  await createSupervisorEpisodeStore(journalPath).write(journal);
  const request = {
    schema_version: 1,
    kind: "verification_retry_request",
    task_id: taskId,
    repository_identity: terminal.repository_identity,
    kernel_digest: terminal.digest,
    source_sha: sourceSha,
    head_sha: head,
    check_contract_digest: verificationRetryContractIdentity(verification.task),
    failed_operation_key: started.operation_key,
    failed_checks_digest: k.kernelDigest(failed),
  };
  const inputPath = path.join(root, ".git/retry-request.json");
  await writeFile(inputPath, JSON.stringify(request));
  const before = await Promise.all([
    readFile(journalPath, "utf8"),
    readFile(path.join(root, failedRelative), "utf8"),
    readFile(path.join(root, prefix, "quality/old-eval.json"), "utf8"),
  ]);
  const { captureExternalTaskArtifacts } =
    await import("../commands/task/external-agent-task-artifact-baseline.js");
  const nativePr = await import("../commands/task/verify-record-pr-artifacts.js");
  const syncSpy = vi.spyOn(nativePr, "syncRecordedVerificationArtifacts");
  const prBefore = Object.fromEntries(
    Object.entries(await captureExternalTaskArtifacts(root, taskId)).filter(
      ([name]) => name === "pr" || name.startsWith("pr/"),
    ),
  );
  const result = await runJson(root, [
    "task",
    "advance",
    taskId,
    "--workflow-recovery",
    inputPath,
    "--remote",
    "--agent-json",
  ]);
  expect(result.result).toMatchObject({ status: "passed", fresh_evaluator_required: true });
  command = await loadCommandContext({ cwd: root, rootOverride: root });
  const after = (await command.taskBackend.getTask(taskId))!;
  expect(after.extensions?.task_kernel).toEqual(terminal);
  expect(after.extensions?.["agentplane.task_centric"]).toBeUndefined();
  expect(after.verification?.state).toBe("ok");
  expect(
    await Promise.all([
      readFile(journalPath, "utf8"),
      readFile(path.join(root, failedRelative), "utf8"),
      readFile(path.join(root, prefix, "quality/old-eval.json"), "utf8"),
    ]),
  ).toEqual(before);
  expect(await readFile(path.join(root, ".git/retry-executions"), "utf8")).toBe("1");
  const replay = await runJson(root, [
    "task",
    "advance",
    taskId,
    "--workflow-recovery",
    inputPath,
    "--remote",
    "--agent-json",
  ]);
  expect(replay.replay).toBe(true);
  expect(await readFile(path.join(root, ".git/retry-executions"), "utf8")).toBe("1");
  expect(syncSpy).not.toHaveBeenCalled();
  const prAfter = Object.fromEntries(
    Object.entries(await captureExternalTaskArtifacts(root, taskId)).filter(
      ([name]) => name === "pr" || name.startsWith("pr/"),
    ),
  );
  expect(prAfter).toEqual(prBefore);
  syncSpy.mockRestore();
  git(["remote", "add", "origin", "https://github.com/example/repo.git"]);
  const fakeProvider = path.join(root, ".git/retry-provider.mjs");
  const repo = {
    full_name: "example/repo",
    clone_url: "https://github.com/example/repo.git",
    html_url: "https://github.com/example/repo",
  };
  await writeFile(
    fakeProvider,
    fakeGithubProviderSource({
      number: 4626,
      state: "open",
      merged: false,
      mergeable: true,
      mergeable_state: "clean",
      draft: false,
      html_url: "https://github.com/example/repo/pull/4626",
      head: { ref: `task/${taskId}/retry-fixture`, sha: head, repo },
      base: { ref: "main", sha: git(["rev-parse", "main"]), repo },
    }),
  );
  const previousBin = process.env.AGENTPLANE_GH_BIN;
  const previousArgs = process.env.AGENTPLANE_GH_ARGS;
  let evaluating: Record<string, unknown>;
  try {
    process.env.AGENTPLANE_GH_BIN = process.execPath;
    process.env.AGENTPLANE_GH_ARGS = JSON.stringify([fakeProvider]);
    evaluating = await runJson(root, ["task", "advance", taskId, "--remote", "--agent-json"]);
    if ((evaluating.action as { kind: string }).kind !== "agent_episode") {
      const { buildTaskRouteDecision } = await import("../commands/shared/route-decision.js");
      const context = await loadCommandContext({ cwd: root, rootOverride: root });
      const decision = await buildTaskRouteDecision({
        ctx: context,
        cwd: root,
        rootOverride: root,
        taskId,
        includeRemote: true,
        freshHead: true,
      });
      expect(
        evaluating.action,
        JSON.stringify({ action: evaluating.action, step: decision.workflowStep }),
      ).toMatchObject({ kind: "agent_episode" });
    }
  } finally {
    if (previousBin === undefined) delete process.env.AGENTPLANE_GH_BIN;
    else process.env.AGENTPLANE_GH_BIN = previousBin;
    if (previousArgs === undefined) delete process.env.AGENTPLANE_GH_ARGS;
    else process.env.AGENTPLANE_GH_ARGS = previousArgs;
  }
  expect(evaluating.action, JSON.stringify(evaluating.action)).toMatchObject({
    kind: "agent_episode",
  });
  const evaluationExchange = evaluating.exchange as { directory: string };
  const evaluationOrder = JSON.parse(
    await readFile(path.join(evaluationExchange.directory, "work-order.json"), "utf8"),
  ) as AgentWorkOrderV2;
  expect(evaluationOrder.role).toBe("EVALUATOR");
  expect(evaluationOrder.state_fingerprint.git_head).toBe(git(["rev-parse", "HEAD"]));
  expect(git(["diff", "--name-only", sourceSha, "HEAD", "--", "check.mjs", "package.json"])).toBe(
    "",
  );
  const frozenRef = evaluationOrder.required_inputs.find(
    (input: { id: string }) => input.id === "evaluator-work-order",
  );
  expect(frozenRef).toBeDefined();
  const frozenBytes = await readFile(path.resolve(root, frozenRef!.path), "utf8");
  const { externalAgentExchangeDigest } =
    await import("../commands/task/external-agent-exchange.js");
  expect(externalAgentExchangeDigest(frozenBytes)).toBe(frozenRef!.digest);
  const frozenEvaluation = JSON.parse(frozenBytes) as {
    evaluated_sha: string;
    review_identity: { implementation_sha: string };
  };
  expect(frozenEvaluation.evaluated_sha).toBe(sourceSha);
  expect(frozenEvaluation.review_identity.implementation_sha).toBe(sourceSha);
});
