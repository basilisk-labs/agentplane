import {
  authorizeCompletedNativeReviewPreparation,
  authorizeCompletedNativeReviewResult,
  hasAuthenticatedCompletedNativeReview,
} from "./kernel-completed-native-review.js";
import type { ExternalAgentExchange } from "./external-agent-exchange.js";
import {
  prepareAgentWorkOrder,
  requirePreparedAgentWorkOrder,
} from "../../runner/usecases/agent-work-order.js";
import {
  issueExternalAgentExchange,
  acceptExternalAgentResult,
} from "./external-agent-supervisor.js";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { expect } from "vitest";
import {
  commitAll,
  configureGitUser,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import { makeTaskBackendDouble } from "@agentplane/testkit/task";
import { defaultConfig } from "@agentplaneorg/core/config";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { TaskData, TaskBackend } from "../../backends/task-backend.js";
import {
  amendedScopeIntake,
  scopeIntakeDigest,
} from "../../adapters/task-backend/kernel-scope-intake.js";
import type { KernelDocuments } from "../../adapters/task-backend/kernel-documents.js";
import type { KernelCommandInput } from "../../adapters/task-backend/kernel-backend-adapter.js";
import { observeKernelRepository } from "../../runner/observation/kernel-repository.js";
import { KernelBackendAdapter } from "../../adapters/task-backend/kernel-backend-adapter.js";
import { kernelReplayJourney } from "../../adapters/task-backend/kernel-replay-journey.test-fixtures.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { resolveExplicitExecutionContract } from "./execution-contract-intake.js";
import { buildOpenedPrMeta, buildObservedChangeRequestMeta } from "../shared/pr-meta/builders.js";
import { cmdVerifyParsed } from "./verify-record.js";
import { projectKernelOperationalEvidence } from "./kernel-operational-projection.js";

export function git(root: string, ...args: string[]) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}
/** Build genuine reducer/adapter history before completion; never patch a terminal record. */
async function completeWithHistoricalScope(
  root: string,
  backend: TaskBackend,
  identity: k.Sha256Digest,
  journey: ReturnType<typeof kernelReplayJourney>,
  contract: NonNullable<TaskData["execution_contract"]>,
) {
  const intent = { objective: "Completed intake", context: "Prior scope fixture" };
  const workContract = {
    objective: "Change source",
    acceptance_criteria: ["Source behavior is checked"],
    verification_commands: ["git diff --check"],
    role: "EXECUTOR" as const,
  };
  const workDigest = k.kernelDigest(workContract);
  const claim = k.kernelDigest("historical fixture claim");
  let documents: KernelDocuments = { intent, contracts: {} };
  const first = structuredClone(journey.steps[0]!.input);
  const { config } = await loadCommandContext({ cwd: root, rootOverride: null });
  const observation = await observeKernelRepository({
    repository_root: root,
    repository_identity: identity,
    operational_paths: [
      config.paths.workflow_dir,
      config.paths.tasks_path,
      config.paths.worktrees_dir,
    ],
  });
  first.repository_fingerprint = observation.fingerprint;
  const policy = k.kernelDigest({
    config,
    files: observation.files.filter(
      (file) => file.path === "AGENTS.md" || file.path.startsWith(".agentplane/policy/"),
    ),
  });
  const seed = first.authority!;
  let authority: k.ExecutionAuthority = {
    ...seed,
    repository_identity: identity,
    repository_fingerprint: observation.fingerprint,
    policy_digests: [policy],
    scope_roots: ["source.txt"],
    repository_effects: contract.authority.allowed_repository_effects,
    external_effects: contract.authority.allowed_external_effects,
    capabilities: ["repository_write"],
    provenance: { ...seed.provenance, actor_id: "USER", parent_authority_digest: null },
  };
  authority = { ...authority, digest: k.authorityDigest(authority) };
  let expectedRequest: k.ProspectiveScopeRequest | null = null;
  const adapter = new KernelBackendAdapter(backend, identity, (request) =>
    Promise.resolve(expect(request).toEqual(expectedRequest)),
  );
  let revision = 0;
  const execute = async (
    command: k.TaskCommand,
    mutation: string,
    grant: k.ExecutionAuthority | null = authority,
  ) => {
    const input: KernelCommandInput = {
      ...first,
      command: {
        ...command,
        expected_task_revision: revision,
        expected_state_fingerprint: first.repository_fingerprint,
      },
      authority: grant,
      actor: { id: "USER", kind: "USER", transport: "manual", capabilities: ["repository_write"] },
      mutation_id: mutation,
    };
    const result =
      revision === 0
        ? await adapter.create({ ...journey.task, execution_contract: contract }, input, documents)
        : await adapter.execute(input, documents);
    expect(result.kind, JSON.stringify(result)).toBe("committed");
    if (result.kind !== "committed") throw new Error("Historical fixture command rejected");
    revision = result.record.aggregate.revision;
    return result.record;
  };
  const command = (value: object) =>
    ({
      task_id: journey.task.id,
      expected_task_revision: revision,
      expected_state_fingerprint: first.repository_fingerprint,
      ...value,
    }) as k.TaskCommand;
  const planned = journey.steps[1]!.input.command;
  if (planned.kind !== "propose_plan") throw new Error("Missing fixture Plan");
  const original = planned.plan.work_items[0]!;
  const definition = {
    ...original,
    contract_digest: workDigest,
    execution_requirements: { ...original.execution_requirements, scope_roots: ["source.txt"] },
  };
  let plan: k.PlanRecord = {
    ...planned.plan,
    work_items: [definition],
    digest: k.kernelDigest({ revision: 1, work_items: [definition] }),
  };
  for (const [index, step] of journey.steps.slice(0, 6).entries()) {
    const next = structuredClone(step.input.command);
    if (next.kind === "capture_intent") next.intent_digest = k.kernelDigest(intent);
    if (next.kind === "propose_plan") {
      next.plan = plan;
      documents = { ...documents, contracts: { [workDigest]: workContract } };
    }
    if (index >= 2) {
      authority = { ...authority, plan_revision: 1, plan_digest: plan.digest };
      authority = { ...authority, digest: k.authorityDigest(authority) };
    }
    if (next.kind === "approve_plan") {
      next.plan_digest = plan.digest;
      next.authority_mode = "manual_operator";
      next.approval_evidence_digest = authority.provenance.evidence_digest;
    }
    if (next.kind === "materialize_work_items") next.plan_digest = plan.digest;
    if (next.kind === "transition_work_item") next.claim_id = claim;
    await execute(next, next.kind === "propose_plan" ? `plan:${plan.digest}` : step.label);
  }
  const order = k.kernelDigest("historical native scope order");
  const blocked = await execute(
    command({
      kind: "transition_work_item",
      work_item_id: "build",
      action: "block",
      claim_id: claim,
    }),
    `semantic-stop:${order}`,
  );
  const before = await backend.getTask(journey.task.id);
  if (!before) throw new Error("Missing historical fixture Task");
  const projected = amendedScopeIntake(before, ["prior.txt"], []);
  const request: k.ProspectiveScopeRequest = {
    task_id: journey.task.id,
    record_digest: blocked.digest,
    task_revision: revision,
    plan_revision: 1,
    plan_digest: plan.digest,
    work_item_id: "build",
    attempt: 1,
    claim_id: claim,
    contract_digest: workDigest,
    work_order_id: order,
    result_authentication: "native_stop_receipt",
    result_digest: k.kernelDigest("historical blocked result"),
    stop_receipt_digest: k.kernelDigest(
      blocked.aggregate.mutation_receipts[`semantic-stop:${order}`],
    ),
    parent_authority_digest: authority.digest,
    repository_fingerprint: first.repository_fingerprint,
    intake_before_digest: scopeIntakeDigest(before.execution_contract),
    intake_after_digest: scopeIntakeDigest(projected),
    scope_roots: ["prior.txt"],
    repository_effects: [],
  };
  expectedRequest = request;
  const child = {
    ...authority,
    scope_roots: ["prior.txt", "source.txt"],
    provenance: { ...authority.provenance, parent_authority_digest: authority.digest },
  };
  const grant: k.CanonicalAuthorityRecord = {
    authority: { ...child, digest: k.authorityDigest(child) },
    approval_mode: "manual_operator",
    observation: {
      kind: "prospective_scope_request",
      evidence_digest: k.prospectiveScopeApprovalEvidence(request, "USER"),
      previous_fingerprint: authority.repository_fingerprint,
      changed_paths: [],
      request_digest: k.kernelDigest(request),
      scope_request: request,
    },
  };
  await execute(
    command({ kind: "approve_scope_request", record: grant }),
    `scope-request:${k.kernelDigest(request)}`,
    null,
  );
  authority = grant.authority;
  const replacement = {
    ...definition,
    execution_requirements: {
      ...definition.execution_requirements,
      scope_roots: grant.authority.scope_roots,
    },
  };
  plan = {
    ...plan,
    revision: 2,
    work_items: [replacement],
    digest: k.kernelDigest({ revision: 2, work_items: [replacement] }),
  };
  await execute(command({ kind: "propose_plan", plan }), `plan:${plan.digest}`);
  authority = {
    ...authority,
    plan_revision: 2,
    plan_digest: plan.digest,
    provenance: {
      ...authority.provenance,
      parent_authority_digest: null,
      evidence_digest: k.kernelDigest("fresh fixture USER approval"),
    },
  };
  authority = { ...authority, digest: k.authorityDigest(authority) };
  await execute(
    command({
      kind: "approve_plan",
      plan_revision: 2,
      plan_digest: plan.digest,
      authority_mode: "manual_operator",
      approval_evidence_digest: authority.provenance.evidence_digest,
    }),
    "approval-2",
  );
  for (const action of ["claim", "begin"] as const)
    await execute(
      command({ kind: "transition_work_item", work_item_id: "build", action, claim_id: claim }),
      `${action}-2`,
    );
  for (const step of journey.steps.slice(6)) {
    const next = structuredClone(step.input.command);
    if (next.kind === "transition_work_item") next.claim_id = claim;
    if (next.kind === "accept_work_item_result") {
      next.plan_revision = 2;
      next.plan_digest = plan.digest;
      next.output_manifests = next.output_manifests.map((output) => ({
        ...output,
        plan_revision: 2,
        attempt: 2,
        repository_fingerprint: observation.fingerprint,
      }));
    }
    if (next.kind === "record_final_validation")
      next.validation = {
        ...next.validation,
        identity: { ...next.validation.identity, implementation_identity: observation.fingerprint },
      };
    await execute(next, step.label);
  }
}
export async function fixture(
  repositoryMode: "direct" | "branch_pr" = "branch_pr",
  securityCi = false,
  leaveReviewDirty = false,
  historicalScope = false,
) {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  const config = defaultConfig();
  config.workflow_mode = repositoryMode;
  config.agents.approvals.require_plan = false;
  await writeConfig(root, config);
  await mkdir(path.join(root, ".agentplane/policy"), { recursive: true });
  for (const name of ["dod.code.md", "dod.core.md", "security.must.md", "workflow.branch_pr.md"]) {
    await writeFile(
      path.join(root, ".agentplane/policy", name),
      "# Fixture policy\nPreserve task authority and require independent review.\n",
    );
  }
  await writeFile(
    path.join(root, ".gitignore"),
    ".agentplane/context/\n.agentplane/cache/\n.agentplane/cache.sqlite\n.agentplane/cache.sqlite-wal\n.agentplane/cache.sqlite-shm\n",
  );
  await writeFile(path.join(root, "source.txt"), "before\n");
  await writeFile(
    path.join(root, "package.json"),
    JSON.stringify({ private: true, scripts: { test: "node check.mjs" } }),
  );
  await writeFile(
    path.join(root, "check.mjs"),
    "import assert from 'node:assert/strict'; import fs from 'node:fs'; assert.equal(fs.readFileSync('source.txt','utf8'),'after\\n');\n",
  );
  await commitAll(root, "seed");
  const base = git(root, "rev-parse", "HEAD");
  const journey = kernelReplayJourney("direct");
  const id = journey.task.id;
  git(root, "config", "agentplane.baseBranch", "main");
  git(root, "checkout", "-b", `task/${id}/repair`);
  const identity = (await resolveLogicalRepositoryIdentity({
    git_root: root,
    task: {},
  })) as k.Sha256Digest;
  let saved: TaskData | null = null;
  const backend = makeTaskBackendDouble({
    capabilities: {
      ...makeTaskBackendDouble().capabilities,
      canonical_source: "remote",
      atomic_task_record: true,
    },
    getTask: () => Promise.resolve(saved),
    writeTask: (next) => {
      saved = next;
      return Promise.resolve();
    },
  });
  const intake = resolveExplicitExecutionContract({
    config,
    parsed: {
      route: "branch_pr",
      verify: ["git diff --check"],
      scopeRoots: securityCi ? ["source.txt", ".github"] : ["source.txt"],
      repositoryEffects: securityCi ? ["source_code", "ci"] : ["source_code"],
    },
    intent: { taskKind: "code", mutationScope: "code" },
  });
  if (historicalScope) {
    intake.observed.verification_results.push({ id: "fixture-native-check", result: "pass" });
    await completeWithHistoricalScope(root, backend, identity, journey, intake);
  } else {
    const adapter = new KernelBackendAdapter(backend, identity);
    for (const [index, step] of journey.steps.entries()) {
      const input = structuredClone(step.input);
      input.authority = { ...input.authority!, repository_identity: identity };
      const result =
        index === 0 ? await adapter.create(journey.task, input) : await adapter.execute(input);
      expect(result.kind, JSON.stringify(result)).toBe("committed");
    }
  }
  const task = saved! as TaskData;
  if (!historicalScope) task.execution_contract = intake;
  task.execution_route = {
    requested_mode: "branch_pr",
    selected_mode: "branch_pr",
    repository_mode: repositoryMode,
    schema_version: 1,
    reason_codes: ["explicit_branch_pr"],
    frozen: true,
  };
  task.verify = ["git diff --check"];
  task.task_kind = "code";
  if (securityCi) task.risk_flags = ["security", "merge", "network"];
  task.mutation_scope = "code";
  task.extensions = {
    ...task.extensions,
    task_execution_context: {
      schema_version: 1,
      base_ref: "main",
      base_sha: base,
      repository_identity: identity,
    },
    implementation_commit: { hash: base },
  };
  task.plan_approval = {
    state: "approved",
    updated_at: "2026-10-06T00:00:00.000Z",
    updated_by: "USER",
    note: "Fixture approved",
  };
  task.verification = {
    state: "ok",
    updated_at: "2026-10-06T00:00:00.000Z",
    updated_by: "SUPERVISOR",
    note: "Previous implementation checked",
  };
  task.quality_review = {
    state: "rework",
    provenance: "evaluator_supplied",
    updated_at: "2026-10-06T01:00:00.000Z",
    updated_by: "EVALUATOR",
    note: "Repair source",
    evaluated_sha: base,
    evidence_refs: [`.agentplane/tasks/${id}/quality/review/quality-report.json`],
    findings: ["Repair source"],
  };
  let command = await loadCommandContext({ cwd: root, rootOverride: null });
  task.doc =
    "## Summary\nRepair source.\n\n## Scope\nRepair the approved source.txt and explicitly admitted helper paths.\n\n## Rollback Plan\nRetain the fixture checkout and restore source only through reviewed work.\n\n## Plan\nRepair the approved source.\n\n## Verify Steps\n- git diff --check\n\n## Verification\nPrevious checks passed.\n";
  await command.taskBackend.writeTask(task);
  const prDir = path.join(root, ".agentplane", "tasks", id, "pr");
  await mkdir(prDir, { recursive: true });
  const at = "2026-10-06T00:00:00.000Z";
  const meta = buildObservedChangeRequestMeta({
    meta: buildOpenedPrMeta({
      taskId: id,
      branch: git(root, "branch", "--show-current"),
      base: "main",
      at,
      previousMeta: null,
    }),
    observed: {
      prNumber: 12,
      prUrl: "https://github.com/owner/project/pull/12",
      status: "OPEN",
      base: "main",
      headSha: base,
      mergedAt: null,
      mergeCommit: null,
    },
    at,
  });
  await writeFile(path.join(prDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
  await commitAll(root, "task fixture");
  const implementation = git(root, "rev-parse", "HEAD");
  if (leaveReviewDirty) {
    // Model the native operational projection already present in completed tasks.
    // The dirty independent REWORK review below must survive metadata persistence.
    const repository = {
      schema_version: 1 as const,
      kind: "canonical_repository_evidence" as const,
      task_id: id,
      work_item_id: "implementation",
      task_revision: task.revision ?? 0,
      work_order_id: k.kernelDigest("fixture implementation order"),
      checkout: root,
      branch: git(root, "branch", "--show-current"),
      base_commit: base,
      implementation_commit: implementation,
      implementation_tree: git(root, "rev-parse", "HEAD^{tree}"),
      changed_paths: [] as string[],
      evaluator_target: implementation,
      implementation_evidence: {
        artifact_path: ".agentplane/tasks/fixture/implementation.json",
        implementation_commit: implementation,
        changed_paths: [] as string[],
      },
    };
    await projectKernelOperationalEvidence({
      command,
      task_id: id,
      repository_evidence: { ...repository, digest: k.kernelDigest(repository) },
      verification_evidence_digest: k.kernelDigest("fixture verification"),
      review_identity_digest: k.kernelDigest("fixture passing review"),
      evidence_refs: [],
      findings: ["Previous implementation passed"],
      projected_at: at,
    });
  }
  const current = (await command.taskBackend.getTask(id))!;
  await command.taskBackend.writeTask({
    ...current,
    commit: { hash: implementation, message: "Fixture implementation" },
    quality_review: leaveReviewDirty
      ? undefined
      : { ...task.quality_review!, evaluated_sha: implementation },
  });
  if (leaveReviewDirty) {
    await commitAll(root, "prepare independent native review");
    await recordFixtureVerification(root, id);
    await commitAll(root, "record actual verification before native review");
    command = await loadCommandContext({ cwd: root, rootOverride: null });
    const prepared = requirePreparedAgentWorkOrder(
      await prepareAgentWorkOrder({
        command_ctx: command,
        cwd: root,
        task_id: id,
        include_remote: true,
      }),
    );
    expect(prepared.work_order.role, JSON.stringify(prepared.route_decision.workflowStep)).toBe(
      "EVALUATOR",
    );
    const issued = await issueExternalAgentExchange({
      ctx: { cwd: root },
      command,
      decision: prepared.route_decision,
      work_order: prepared.work_order,
      replace_failed_operation: false,
    });
    if (!issued) throw new Error("Expected native independent review fixture");
    await writeFile(
      issued.paths.result,
      JSON.stringify({
        work_order_id: issued.work_order.work_order_id,
        status: "completed",
        summary: "Repair source",
        findings: ["Repair source"],
        uncertainty: [],
        review: {
          verdict: "rework",
          missing_tests: [],
          hidden_assumptions: [],
          residual_risks: [],
          recovery_context: "Repair source",
        },
      }),
    );
    await acceptExternalAgentResult({
      ctx: { cwd: root },
      command,
      task_id: id,
      result_path: issued.paths.result,
      include_remote: true,
    });
    await recordFixtureVerification(root, id);
  } else await commitAll(root, "record review");
  const persisted = (await command.taskBackend.getTask(id))!;
  return { root, id, kernel: persisted.extensions?.task_kernel };
}

export async function recordFixtureVerification(root: string, id: string): Promise<void> {
  git(root, "diff", "--check");
  expect(
    await cmdVerifyParsed({
      ctx: await loadCommandContext({ cwd: root, rootOverride: null }),
      cwd: root,
      rootOverride: undefined,
      taskId: id,
      state: "ok",
      by: "SUPERVISOR",
      note: "Native fixture verification passed.",
      details: ["affected_unit_integration", "critical_paths", "task_outcome"]
        .map(
          (check) =>
            `Check: ${check}\nCommand: git diff --check\nResult: pass\nEvidence: actual fixture Git check passed\nScope: task implementation`,
        )
        .join("\n\n"),
      quiet: true,
      allowCanonicalProjection: true,
    }),
  ).toBe(0);
}

export async function expectMergedBaseReviewBindings(
  root: string,
  taskId: string,
  reviewCommand: Parameters<typeof hasAuthenticatedCompletedNativeReview>[0],
  reviewOrder: Parameters<typeof authorizeCompletedNativeReviewPreparation>[2],
  exchangeDirectory: string,
): Promise<void> {
  const accepted = (await reviewCommand.taskBackend.getTask(taskId))!;
  expect(await hasAuthenticatedCompletedNativeReview(reviewCommand, accepted)).toBe(true);
  // Native review consumption already persists its accepted task artifacts.
  expect(git(root, "status", "--porcelain")).toBe("");
  const mergedBase = path.join(root, "merged-base");
  git(root, "worktree", "add", mergedBase, "main");
  git(mergedBase, "merge", "--ff-only", git(root, "rev-parse", "HEAD"));
  const baseCommand = await loadCommandContext({ cwd: mergedBase, rootOverride: null });
  const mergedTask = (await baseCommand.taskBackend.getTask(taskId))!;
  expect(await hasAuthenticatedCompletedNativeReview(baseCommand, mergedTask)).toBe(true);
  await expect(
    authorizeCompletedNativeReviewPreparation(baseCommand, mergedTask, reviewOrder),
  ).rejects.toThrow();
  const exchangePath = path.join(exchangeDirectory, "exchange.json");
  const retainedExchange = JSON.parse(
    await readFile(exchangePath, "utf8"),
  ) as ExternalAgentExchange;
  await expect(
    authorizeCompletedNativeReviewResult(
      baseCommand,
      mergedTask,
      retainedExchange,
      retainedExchange.result!.result,
    ),
  ).rejects.toThrow("exchange binding");
  const changed = structuredClone(mergedTask);
  changed.quality_review!.note = "unproven historical PASS";
  await expect(hasAuthenticatedCompletedNativeReview(baseCommand, changed)).rejects.toThrow(
    "projection binding",
  );
  git(root, "worktree", "remove", mergedBase);
}
