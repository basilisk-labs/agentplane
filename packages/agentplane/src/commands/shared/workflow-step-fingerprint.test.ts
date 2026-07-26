import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import {
  buildStateFingerprint,
  evaluateStateFingerprintPrecondition,
  type StateFingerprintComponentInput,
} from "@agentplaneorg/core/schemas";
import {
  defaultConfig,
  expect,
  it,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";

import type { TaskData } from "../../backends/task-backend.js";
import type { BlueprintResolvedSnapshotArtifact } from "../../blueprints/index.js";
import { buildTaskBlueprintResolvedSnapshot } from "../blueprint/snapshot-artifact.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { CommandContext } from "./task-backend.js";
import { projectWorkflowOperationArgv } from "./workflow-operation-projection.js";
import {
  captureWorkflowStepFingerprint,
  withBootstrapWorkflowFingerprint,
  WORKFLOW_STATE_FINGERPRINT_POLICY,
  type WorkflowRouteStateInput,
} from "./workflow-step-fingerprint.js";
import { reduceRouteState } from "./workflow-step-reducer.js";

const execFileAsync = promisify(execFile);
const TASK_ID = "202607250100-LIVEFP";
const BRANCH = `task/${TASK_ID}/live-fingerprint`;

function digest(text: string): string {
  return `sha256:${createHash("sha256").update(text).digest("hex")}`;
}

function componentDigest(input: StateFingerprintComponentInput): string {
  return buildStateFingerprint({
    task_id: TASK_ID,
    task_revision: 1,
    git_head: null,
    worktree: "/component-digest",
    components: {
      task: input,
      git: input,
      backend_projection: input,
      policy: input,
      blueprint: input,
      knowledge: input,
      provider: input,
      authority: input,
    },
  }).components.task.digest;
}

async function writeObservedFiles(
  root: string,
  config: ReturnType<typeof defaultConfig>,
  label: string,
): Promise<{
  blueprint: string;
  blueprintAlternate: string;
  snapshot: BlueprintResolvedSnapshotArtifact;
  knowledge: string;
  backend: string;
}> {
  const snapshot = await buildTaskBlueprintResolvedSnapshot({
    ctx: commandContext(root, config),
    task: task(),
  });
  const blueprintPretty = `${JSON.stringify(snapshot, null, 2)}\n`;
  const blueprintCompact = `${JSON.stringify(snapshot)}\n`;
  const blueprint = label === "base" ? blueprintCompact : blueprintPretty;
  const knowledge = `${JSON.stringify({ source: label })}\n`;
  const backend = `${JSON.stringify({ source: label })}\n`;
  const files = new Map<string, string>([
    [
      path.join(config.paths.workflow_dir, TASK_ID, "blueprint", "resolved-snapshot.json"),
      blueprint,
    ],
    [".agentplane/context/manifest.lock.json", knowledge],
    [config.tasks_backend.config_path, backend],
    [".agentplane/tasks.json", `${JSON.stringify({ tasks: [] })}\n`],
    ["AGENTS.md", `# ${label} gateway\n`],
    [".agentplane/WORKFLOW.md", `workflow: ${label}\n`],
    [".agentplane/policy/security.must.md", `# ${label} security\n`],
    [".agentplane/policy/dod.core.md", `# ${label} core dod\n`],
    [
      `.agentplane/policy/workflow.${config.workflow_mode}.md`,
      `# ${label} ${config.workflow_mode} workflow\n`,
    ],
    [".agentplane/policy/dod.code.md", `# ${label} code dod\n`],
  ]);
  for (const [relativePath, content] of files) {
    const absolutePath = path.join(root, relativePath);
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, content, "utf8");
  }
  return {
    blueprint,
    blueprintAlternate: label === "base" ? blueprintPretty : blueprintCompact,
    snapshot,
    knowledge,
    backend,
  };
}

function task(overrides: Partial<TaskData> = {}): TaskData {
  return {
    id: TASK_ID,
    title: "Live fingerprint task",
    description: "Observe the authoritative task worktree.",
    status: "DOING",
    priority: "high",
    owner: "CODER",
    revision: 3,
    depends_on: [],
    tags: ["code"],
    verify: ["bun test"],
    plan_approval: {
      state: "approved",
      approved_by: "ORCHESTRATOR",
      approved_at: "2026-07-25T00:00:00.000Z",
    },
    verification: { state: "pending" },
    ...overrides,
  };
}

function resume(worktree: string): TaskResumeContext {
  return {
    task_id: TASK_ID,
    task_status: "DOING",
    branch: BRANCH,
    base_branch: "main",
    head_sha: null,
    workspace_root: worktree,
    pr_branch: BRANCH,
    latest_handoff: null,
    runner: {
      run_id: null,
      status: null,
      heartbeat_at: null,
      state_path: null,
      trace_path: null,
      next_action: "run",
      next_command: `agentplane task run ${TASK_ID}`,
      resume_command: `agentplane task run ${TASK_ID}`,
      retry_command: null,
    },
  };
}

function prFlow(): PrFlowStatusReport {
  return {
    task: { id: TASK_ID, status: "DOING", verification: "pending" },
    branch: { name: BRANCH, headSha: null, metaHeadSha: null },
    pr: { provider: "github", state: "not_found", source: "metadata" },
    closeTail: { state: "not_applicable", reason: "implementation PR is not merged" },
    hostedChecks: { checked: false, reason: "not requested" },
    reviewThreads: { checked: false, reason: "not requested" },
    queue: { present: false },
    handoff: { present: false },
    nextAction: "",
  };
}

function routeState(taskWorktree: string, taskData = task()): WorkflowRouteStateInput {
  return {
    task: taskData,
    resume: resume(taskWorktree),
    workflowMode: "branch_pr",
    prFlow: prFlow(),
    cleanupProbe: { state: "not_requested" },
    blockers: [{ code: "remote_pr_missing", summary: "remote PR is missing" }],
    batchOwnership: { role: "none" },
    taskWorktree: {
      state: "clean",
      branch: BRANCH,
      worktreePath: taskWorktree,
      changedPaths: [],
    },
  };
}

function commandContext(root: string, config: ReturnType<typeof defaultConfig>): CommandContext {
  return {
    backendId: "local",
    backendConfigPath: path.join(root, config.tasks_backend.config_path),
    config,
    resolvedProject: { gitRoot: root },
    taskBackend: {
      capabilities: {
        canonical_source: "local",
      },
      statePath: path.join(root, ".agentplane/tasks.json"),
    },
  } as unknown as CommandContext;
}

async function capture(opts: {
  ctx: CommandContext;
  root: string;
  worktree: string;
  state?: WorkflowRouteStateInput;
}) {
  const state = opts.state ?? routeState(opts.worktree);
  const step = reduceRouteState(withBootstrapWorkflowFingerprint(state));
  expect(step).toMatchObject({
    kind: "approval",
    request: { type: "side_effect", operationId: "pr.open" },
    authoritativeCheckout: "task_worktree",
  });
  return captureWorkflowStepFingerprint({
    ctx: opts.ctx,
    state,
    step,
    paths: {
      baseCheckoutPath: opts.root,
      taskWorktreePath: opts.worktree,
      currentCheckoutPath: opts.root,
    },
  });
}

function changedComponents(
  expected: Awaited<ReturnType<typeof capture>>,
  current: Awaited<ReturnType<typeof capture>>,
): string[] {
  return evaluateStateFingerprintPrecondition({
    expected,
    current,
    policy: WORKFLOW_STATE_FINGERPRINT_POLICY,
  }).changed_components.map((component) => component.component);
}

it("captures every live route component from the authoritative task worktree", async () => {
  const root = await mkGitRepoRootWithBranch("main");
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  const base = await writeObservedFiles(root, config, "base");
  await execFileAsync("git", ["add", "-A"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "test: seed base fingerprint state"], {
    cwd: root,
  });
  const worktree = `${root}-live-fingerprint-worktree`;
  await execFileAsync("git", ["worktree", "add", "-b", BRANCH, worktree], { cwd: root });
  const taskWorktree = await writeObservedFiles(worktree, config, "task-worktree");
  const ctx = commandContext(root, config);

  const fingerprint = await capture({ ctx, root, worktree });
  expect(fingerprint.worktree).toBe(worktree);
  expect(fingerprint.components.blueprint).toMatchObject({
    state: "present",
    digest: componentDigest({
      state: "present",
      source: "workflow_route_blueprint",
      value: {
        path: path.join(config.paths.workflow_dir, TASK_ID, "blueprint", "resolved-snapshot.json"),
        source: "persisted_snapshot",
        blueprintId: taskWorktree.snapshot.selectedBlueprint.id,
        snapshotDigest: taskWorktree.snapshot.digest,
        policyModules: taskWorktree.snapshot.policyModules,
        fileSha256: digest(taskWorktree.blueprint),
      },
    }),
  });
  expect(fingerprint.components.blueprint.digest).not.toBe(
    componentDigest({
      state: "present",
      source: "workflow_route_blueprint",
      value: {
        path: path.join(config.paths.workflow_dir, TASK_ID, "blueprint", "resolved-snapshot.json"),
        source: "persisted_snapshot",
        blueprintId: base.snapshot.selectedBlueprint.id,
        snapshotDigest: base.snapshot.digest,
        policyModules: base.snapshot.policyModules,
        fileSha256: digest(base.blueprint),
      },
    }),
  );
  expect(fingerprint.components.knowledge).toMatchObject({
    state: "present",
    digest: componentDigest({
      state: "present",
      source: "context_manifest_lock",
      value: {
        path: ".agentplane/context/manifest.lock.json",
        initialized: true,
        sha256: digest(taskWorktree.knowledge),
      },
    }),
  });
  expect(fingerprint.components.backend_projection).toMatchObject({
    state: "present",
    digest: componentDigest({
      state: "present",
      source: "task_backend_runtime",
      value: {
        backend_id: "local",
        backend_config_path: config.tasks_backend.config_path,
        backend_config: { state: "present", sha256: digest(taskWorktree.backend) },
        backend_state_path: ".agentplane/tasks.json",
        backend_state: {
          state: "present",
          path: ".agentplane/tasks.json",
          sha256: digest(`${JSON.stringify({ tasks: [] })}\n`),
        },
        capabilities: { canonical_source: "local" },
        projection_revision: null,
        projection_freshness: null,
        remote_projection: null,
      },
    }),
  });
  expect(fingerprint.components.policy).toMatchObject({
    state: "present",
  });
  expect(fingerprint.components.provider).toMatchObject({
    state: "unavailable",
    reason_code: "provider_metadata_only",
  });
  expect(fingerprint.components.git).toMatchObject({
    state: "present",
  });

  const blueprintPath = path.join(
    worktree,
    config.paths.workflow_dir,
    TASK_ID,
    "blueprint",
    "resolved-snapshot.json",
  );
  const knowledgePath = path.join(worktree, ".agentplane/context/manifest.lock.json");
  const policyPath = path.join(worktree, "AGENTS.md");
  const backendPath = path.join(worktree, config.tasks_backend.config_path);

  await rm(blueprintPath);
  const preStartState = routeState(worktree, task({ status: "TODO" }));
  const preStartStep = reduceRouteState(withBootstrapWorkflowFingerprint(preStartState));
  expect(preStartStep).toMatchObject({
    kind: "cli_operation",
    operation: { id: "task.branch.start" },
  });
  const preStartFingerprint = await captureWorkflowStepFingerprint({
    ctx,
    state: preStartState,
    step: preStartStep,
    paths: {
      baseCheckoutPath: root,
      taskWorktreePath: worktree,
      currentCheckoutPath: root,
    },
  });
  expect(preStartFingerprint.components.blueprint).toMatchObject({
    state: "present",
    digest: componentDigest({
      state: "present",
      source: "workflow_route_blueprint",
      value: {
        path: path.join(config.paths.workflow_dir, TASK_ID, "blueprint", "resolved-snapshot.json"),
        source: "live_resolution",
        blueprintId: taskWorktree.snapshot.selectedBlueprint.id,
        snapshotDigest: taskWorktree.snapshot.digest,
        policyModules: taskWorktree.snapshot.policyModules,
      },
    }),
  });
  expect(
    evaluateStateFingerprintPrecondition({
      expected: preStartFingerprint,
      current: preStartFingerprint,
      policy: WORKFLOW_STATE_FINGERPRINT_POLICY,
    }),
  ).toMatchObject({
    status: "fresh_with_bounded_uncertainty",
    unavailable_required_components: [],
  });
  await writeFile(blueprintPath, taskWorktree.blueprint, "utf8");

  const modeMismatchState = { ...routeState(worktree), workflowMode: "direct" };
  const modeMismatchStep = reduceRouteState(withBootstrapWorkflowFingerprint(modeMismatchState));
  const modeMismatch = await captureWorkflowStepFingerprint({
    ctx,
    state: modeMismatchState,
    step: modeMismatchStep,
    paths: {
      baseCheckoutPath: root,
      taskWorktreePath: worktree,
      currentCheckoutPath: root,
    },
  });
  expect(modeMismatch.components.blueprint).toMatchObject({
    state: "unavailable",
    reason_code: "workflow_mode_mismatch",
  });

  const initial = fingerprint;
  await writeFile(blueprintPath, taskWorktree.blueprintAlternate, "utf8");
  const changedBlueprint = await capture({ ctx, root, worktree });
  expect(changedComponents(initial, changedBlueprint)).toEqual(["blueprint"]);

  const directConfig = structuredClone(config);
  directConfig.workflow_mode = "direct";
  const directSnapshot = await buildTaskBlueprintResolvedSnapshot({
    ctx: commandContext(worktree, directConfig),
    task: task(),
  });
  await writeFile(blueprintPath, `${JSON.stringify(directSnapshot, null, 2)}\n`, "utf8");
  const persistedModeMismatch = await capture({ ctx, root, worktree });
  expect(persistedModeMismatch.components.blueprint).toMatchObject({
    state: "unavailable",
    reason_code: "workflow_mode_mismatch",
  });
  await writeFile(blueprintPath, taskWorktree.blueprintAlternate, "utf8");

  await writeFile(policyPath, "# changed policy\n", "utf8");
  const changedPolicy = await capture({ ctx, root, worktree });
  expect(changedComponents(changedBlueprint, changedPolicy)).toEqual(["policy"]);

  const requiredPolicyPath = path.join(worktree, ".agentplane/policy/dod.code.md");
  await rm(requiredPolicyPath);
  const missingPolicy = await capture({ ctx, root, worktree });
  expect(missingPolicy.components.policy).toMatchObject({
    state: "unavailable",
    reason_code: "policy_module_missing",
  });
  const missingPolicyPrecondition = evaluateStateFingerprintPrecondition({
    expected: missingPolicy,
    current: missingPolicy,
    policy: WORKFLOW_STATE_FINGERPRINT_POLICY,
  });
  expect(missingPolicyPrecondition.status).toBe("blocked");
  expect(missingPolicyPrecondition.unavailable_required_components).toContain("policy");
  await writeFile(requiredPolicyPath, "# task-worktree code dod\n", "utf8");
  const restoredPolicy = await capture({ ctx, root, worktree });
  expect(changedComponents(changedPolicy, restoredPolicy)).toEqual([]);

  await writeFile(backendPath, '{"source":"changed-backend"}\n', "utf8");
  const changedBackend = await capture({ ctx, root, worktree });
  expect(changedComponents(restoredPolicy, changedBackend)).toEqual(["backend_projection"]);

  await writeFile(knowledgePath, '{"source":"changed-knowledge"}\n', "utf8");
  const changedKnowledge = await capture({ ctx, root, worktree });
  expect(changedComponents(changedBackend, changedKnowledge)).toEqual(["knowledge"]);

  await writeFile(path.join(worktree, "implementation.txt"), "changed implementation\n", "utf8");
  const changedGit = await capture({ ctx, root, worktree });
  expect(changedComponents(changedKnowledge, changedGit)).toEqual(["git"]);

  const changedTask = await capture({
    ctx,
    root,
    worktree,
    state: routeState(worktree, task({ priority: "med" })),
  });
  expect(changedComponents(changedGit, changedTask)).toEqual(["task"]);

  const localHeadBefore = routeState(worktree);
  localHeadBefore.prFlow = {
    ...prFlow(),
    branch: { name: BRANCH, headSha: "before-local-head", metaHeadSha: "before-meta-head" },
  };
  const localHeadAfter = routeState(worktree);
  localHeadAfter.prFlow = {
    ...prFlow(),
    branch: { name: BRANCH, headSha: "after-local-head", metaHeadSha: "after-meta-head" },
  };
  const providerBefore = await capture({ ctx, root, worktree, state: localHeadBefore });
  const providerAfter = await capture({ ctx, root, worktree, state: localHeadAfter });
  expect(changedComponents(providerBefore, providerAfter)).toEqual([]);

  const conditionalPolicyState = routeState(worktree);
  conditionalPolicyState.taskWorktree = {
    ...conditionalPolicyState.taskWorktree!,
    changedPaths: [
      "AGENTS.md",
      ".agentplane/policy/incidents.md",
      ".agentplane/.upgrade/state.json",
    ],
  };
  const missingConditionalPolicy = await capture({
    ctx,
    root,
    worktree,
    state: conditionalPolicyState,
  });
  expect(missingConditionalPolicy.components.policy).toMatchObject({
    state: "unavailable",
    reason_code: "policy_module_missing",
  });
  for (const relativePath of [
    ".agentplane/policy/dod.docs.md",
    ".agentplane/policy/governance.md",
    ".agentplane/policy/incidents.md",
    ".agentplane/policy/workflow.upgrade.md",
  ]) {
    const absolutePath = path.join(worktree, relativePath);
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, `# ${relativePath}\n`, "utf8");
  }
  const completeConditionalPolicy = await capture({
    ctx,
    root,
    worktree,
    state: conditionalPolicyState,
  });
  expect(completeConditionalPolicy.components.policy).toMatchObject({ state: "present" });

  await rm(knowledgePath);
  await rm(path.join(worktree, ".agentplane/context/agentplane.context.yaml"), { force: true });
  const uninitialized = await capture({ ctx, root, worktree });
  expect(uninitialized.components.knowledge).toMatchObject({
    state: "present",
    digest: componentDigest({
      state: "present",
      source: "context_manifest_lock",
      value: {
        path: ".agentplane/context/manifest.lock.json",
        initialized: false,
        sha256: null,
      },
    }),
  });
  expect(
    evaluateStateFingerprintPrecondition({
      expected: uninitialized,
      current: await capture({ ctx, root, worktree }),
      policy: WORKFLOW_STATE_FINGERPRINT_POLICY,
    }),
  ).toMatchObject({
    status: "fresh_with_bounded_uncertainty",
    unavailable_required_components: [],
  });

  const outside = `${root}-outside-blueprint.json`;
  await writeFile(outside, '{"outside":true}\n', "utf8");
  await rm(blueprintPath);
  const missingBlueprint = await capture({ ctx, root, worktree });
  expect(missingBlueprint.components.blueprint).toMatchObject({
    state: "unavailable",
    reason_code: "blueprint_snapshot_missing_after_start",
  });
  await symlink(outside, blueprintPath);
  const escaped = await capture({ ctx, root, worktree });
  expect(escaped.components.blueprint).toMatchObject({
    state: "unavailable",
    reason_code: "blueprint_snapshot_observation_unavailable",
  });
  const escapedPrecondition = evaluateStateFingerprintPrecondition({
    expected: escaped,
    current: escaped,
    policy: WORKFLOW_STATE_FINGERPRINT_POLICY,
  });
  expect(escapedPrecondition.status).toBe("blocked");
  expect(escapedPrecondition.unavailable_required_components).toContain("blueprint");
});

it("keeps path-conditioned policy modules selected after task changes are committed", async () => {
  const root = await mkGitRepoRootWithBranch("main");
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  await writeObservedFiles(root, config, "base");
  for (const relativePath of [
    ".agentplane/policy/dod.docs.md",
    ".agentplane/policy/governance.md",
    ".agentplane/policy/incidents.md",
    ".agentplane/policy/workflow.upgrade.md",
  ]) {
    const absolutePath = path.join(root, relativePath);
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, `# base ${relativePath}\n`, "utf8");
  }
  await execFileAsync("git", ["add", "-A"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "test: seed conditional policy state"], {
    cwd: root,
  });

  const worktree = `${root}-committed-policy-worktree`;
  await execFileAsync("git", ["worktree", "add", "-b", BRANCH, worktree], { cwd: root });
  await writeObservedFiles(worktree, config, "task-worktree");
  await writeFile(path.join(worktree, "AGENTS.md"), "# changed gateway\n", "utf8");
  await writeFile(
    path.join(worktree, ".agentplane/policy/incidents.md"),
    "# changed incidents\n",
    "utf8",
  );
  await mkdir(path.join(worktree, ".agentplane/.upgrade"), { recursive: true });
  await writeFile(path.join(worktree, ".agentplane/.upgrade/state.json"), "{}\n", "utf8");
  await execFileAsync("git", ["add", "-A"], { cwd: worktree });
  await execFileAsync("git", ["commit", "-m", "test: commit path-conditioned changes"], {
    cwd: worktree,
  });

  const ctx = commandContext(root, config);
  const committed = await capture({ ctx, root, worktree });
  expect(committed.components.policy).toMatchObject({ state: "present" });

  await rm(path.join(worktree, ".agentplane/policy/governance.md"));
  const missingCommittedConditional = await capture({ ctx, root, worktree });
  expect(missingCommittedConditional.components.policy).toMatchObject({
    state: "unavailable",
    reason_code: "policy_module_missing",
  });
});

it("uses the persisted direct-task baseline across multiple clean commits", async () => {
  const root = await mkGitRepoRootWithBranch("main");
  const config = defaultConfig();
  config.workflow_mode = "direct";
  await writeConfig(root, config);
  await writeObservedFiles(root, config, "direct");
  for (const relativePath of [
    ".agentplane/policy/dod.docs.md",
    ".agentplane/policy/governance.md",
    ".agentplane/policy/workflow.upgrade.md",
  ]) {
    const absolutePath = path.join(root, relativePath);
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, `# ${relativePath}\n`, "utf8");
  }
  await execFileAsync("git", ["add", "-A"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "test: seed direct policy baseline"], { cwd: root });
  const baselineResult = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  const baseline = baselineResult.stdout.trim();

  await writeFile(path.join(root, "AGENTS.md"), "# changed direct gateway\n", "utf8");
  await mkdir(path.join(root, ".agentplane/.upgrade"), { recursive: true });
  await writeFile(path.join(root, ".agentplane/.upgrade/state.json"), "{}\n", "utf8");
  await execFileAsync("git", ["add", "-A"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "test: commit direct policy changes"], { cwd: root });
  await writeFile(path.join(root, "implementation.txt"), "second task commit\n", "utf8");
  await execFileAsync("git", ["add", "-A"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "test: commit direct implementation"], { cwd: root });
  const headResult = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  const head = headResult.stdout.trim();

  const state: WorkflowRouteStateInput = {
    ...routeState(root),
    task: task({
      extensions: {
        workflow_route_baseline: { version: 1, start_head_sha: baseline },
      },
    }),
    workflowMode: "direct",
    prFlow: null,
    blockers: [],
    taskWorktree: undefined,
    resume: {
      ...resume(root),
      branch: "main",
      base_branch: "main",
      head_sha: head,
      pr_branch: null,
    },
  };
  const step = reduceRouteState(withBootstrapWorkflowFingerprint(state));
  const ctx = commandContext(root, config);
  const complete = await captureWorkflowStepFingerprint({
    ctx,
    state,
    step,
    paths: { baseCheckoutPath: root, currentCheckoutPath: root },
  });
  expect(complete.components.policy).toMatchObject({ state: "present" });

  await rm(path.join(root, ".agentplane/policy/governance.md"));
  const missing = await captureWorkflowStepFingerprint({
    ctx,
    state,
    step,
    paths: { baseCheckoutPath: root, currentCheckoutPath: root },
  });
  expect(missing.components.policy).toMatchObject({
    state: "unavailable",
    reason_code: "policy_module_missing",
  });
});

it("binds runner operation params to the live fingerprint and idempotency key", async () => {
  const root = await mkGitRepoRootWithBranch("main");
  const config = defaultConfig();
  config.workflow_mode = "direct";
  await writeConfig(root, config);
  await writeObservedFiles(root, config, "direct");
  await execFileAsync("git", ["add", "-A"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "test: seed direct runner fingerprint"], {
    cwd: root,
  });
  const startHeadResult = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  const startHeadSha = startHeadResult.stdout.trim();
  const ctx = commandContext(root, config);

  async function observedRunner(runId: string) {
    const state: WorkflowRouteStateInput = {
      ...routeState(root),
      task: task({
        extensions: {
          workflow_route_baseline: { version: 1, start_head_sha: startHeadSha },
        },
      }),
      workflowMode: "direct",
      prFlow: null,
      blockers: [{ code: "runner_alive", summary: "runner is active" }],
      taskWorktree: undefined,
      resume: {
        ...resume(root),
        branch: "main",
        base_branch: "main",
        pr_branch: null,
        runner: {
          ...resume(root).runner,
          run_id: runId,
          status: "running",
          next_action: "wait",
          next_command: `agentplane task run status ${TASK_ID} --run-id ${runId}`,
        },
      },
    };
    const draft = reduceRouteState(withBootstrapWorkflowFingerprint(state));
    expect(draft).toMatchObject({
      kind: "cli_operation",
      operation: { id: "runner.follow", params: { mode: "status", runId } },
    });
    const fingerprint = await captureWorkflowStepFingerprint({
      ctx,
      state,
      step: draft,
      paths: {
        baseCheckoutPath: root,
        currentCheckoutPath: root,
      },
    });
    const step = reduceRouteState({ ...state, preconditionFingerprint: fingerprint });
    if (step.kind !== "cli_operation") throw new Error("expected runner CLI operation");
    return { fingerprint, step };
  }

  const first = await observedRunner("run-1");
  const second = await observedRunner("run-2");

  expect(changedComponents(first.fingerprint, second.fingerprint)).toEqual(["authority"]);
  expect(first.step.operation.idempotencyKey).not.toBe(second.step.operation.idempotencyKey);
  expect(first.step.operation.params).toMatchObject({ mode: "status", runId: "run-1" });
  expect(second.step.operation.params).toMatchObject({ mode: "status", runId: "run-2" });
  expect(projectWorkflowOperationArgv(first.step.operation)).toContain("run-1");
  expect(projectWorkflowOperationArgv(second.step.operation)).toContain("run-2");
});
