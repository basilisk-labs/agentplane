import { WORKFLOW_OPERATION_REGISTRY } from "../shared/workflow-step.js";
import { operationPayloadDigest } from "../shared/workflow-step-authority.js";
import { executeBranchWorkflowOperation } from "./branch-task-supervisor-operations.js";
import { prFlow as priorPrFlow } from "../shared/workflow-step.testkit.js";
import { createHash } from "node:crypto";
import {
  runDirectTaskVerification,
  renderDirectTaskVerificationDetails,
} from "./direct-task-verification.js";
import { resolveImplementationVerificationTask } from "./external-agent-implementation-recovery.js";
import { cmdVerifyParsed } from "./verify-record.js";
import {
  providerUpdateRecoveryFixture,
  acceptValidationFloorReview,
  validationFloorGates,
  taskId,
  branch,
  originalHead,
  observedHead,
  budget,
  type GlabRecoveryCall,
} from "./provider-update-effect-recovery.testkit.js";
import { writeFile, readFile, rm, mkdir, readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createSupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";
import { commitAll, writeConfig } from "@agentplane/testkit";
import { makeTaskBackendDouble } from "@agentplane/testkit/task";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { taskKernel as k } from "@agentplaneorg/core/tasks";

import { createSupervisorEpisodeStore } from "../shared/supervisor-execution-episode.js";
import type * as CoreFs from "@agentplaneorg/core/fs";
import type * as NativeLease from "../shared/supervisor-execution-lease.js";
import type * as UpdateProof from "../pr/provider-update-verification-proof.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskData } from "../../backends/task-backend.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { buildOpenedPrMeta, buildObservedChangeRequestMeta } from "../shared/pr-meta.js";
import { KernelBackendAdapter } from "../../adapters/task-backend/kernel-backend-adapter.js";
import { kernelReplayJourney } from "../../adapters/task-backend/kernel-replay-journey.test-fixtures.js";
import { ensureRuntimeGitignore } from "../../runtime/shared/runtime-gitignore.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { resolveExplicitExecutionContract } from "./execution-contract-intake.js";

const mocks = vi.hoisted(() => ({
  atomicWrite: vi.fn<typeof CoreFs.atomicWriteFile>(),
  acquire: vi.fn<typeof NativeLease.tryAcquireSupervisorExecutionLease>(),
  retainProof: vi
    .fn<typeof UpdateProof.retainProviderUpdateVerificationProof>()
    .mockImplementation(
      (opts: Parameters<typeof UpdateProof.retainProviderUpdateVerificationProof>[0]) =>
        Promise.resolve(opts.completion),
    ),
  observe: vi.fn(),
  compare: vi.fn(),
  glab: vi.fn<(call: GlabRecoveryCall) => unknown>(),
  local: vi.fn(),
  authority: vi.fn(),
  flow: vi.fn<() => Promise<PrFlowStatusReport>>(),
}));
vi.mock("@agentplaneorg/core/fs", async (original) => {
  const actual = await original<typeof CoreFs>();
  mocks.atomicWrite.mockImplementation(actual.atomicWriteFile);
  return { ...actual, atomicWriteFile: mocks.atomicWrite };
});
vi.mock("../shared/supervisor-execution-lease.js", async (original) => {
  const actual = await original<typeof NativeLease>();
  mocks.acquire.mockImplementation(actual.tryAcquireSupervisorExecutionLease);
  return { ...actual, tryAcquireSupervisorExecutionLease: mocks.acquire };
});
vi.mock("../pr/provider-update-verification-proof.js", async (original) => ({
  ...(await original<typeof UpdateProof>()),
  retainProviderUpdateVerificationProof: mocks.retainProof,
}));
vi.mock("../pr/internal/change-request-provider.js", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  observeExistingChangeRequestByNumber: mocks.observe,
}));
vi.mock("../pr/internal/gh-api.js", () => ({ runGhApiJson: mocks.compare }));
vi.mock("../pr/internal/glab-api.js", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  runGlabApiJson: mocks.glab,
}));
vi.mock("../pr/provider-update-branch-local.js", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  validateProviderUpdateLocalState: mocks.local,
}));
vi.mock("../shared/side-effect-authority-store.js", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  loadSideEffectAuthorityState: mocks.authority,
}));
vi.mock("../pr/flow-status.js", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  resolvePrFlowStatus: mocks.flow,
}));

type Fixture = Awaited<ReturnType<typeof fixture>>;
const ownedRoots: string[] = [];

const git = (root: string, ...args: string[]) =>
  execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
const passingGates = { verification: true, review: true };
const updateRef = "workflow-operation:provider.pr.update_branch";
const fixture = providerUpdateRecoveryFixture.bind(null, {
  canonicalRouteTask,
  mocks,
  ownedRoots,
});

async function resetNativeMocks() {
  vi.clearAllMocks();
  const core = await vi.importActual<typeof CoreFs>("@agentplaneorg/core/fs");
  const lease = await vi.importActual<typeof NativeLease>(
    "../shared/supervisor-execution-lease.js",
  );
  mocks.atomicWrite.mockReset().mockImplementation(core.atomicWriteFile);
  mocks.acquire.mockReset().mockImplementation(lease.tryAcquireSupervisorExecutionLease);
  mocks.retainProof.mockImplementation(
    (opts: Parameters<typeof UpdateProof.retainProviderUpdateVerificationProof>[0]) =>
      Promise.resolve(opts.completion),
  );
}

describe.each([
  ...[false, true].flatMap((emptyBase) =>
    [false, true].map((normal) => ({
      emptyBase,
      normal,
      provider: "gitlab" as const,
      adopted: false,
    })),
  ),
  { emptyBase: true, normal: true, provider: "github" as const, adopted: false },
  { emptyBase: true, normal: true, provider: "gitlab" as const, adopted: true },
])(
  "native validation floor: $provider empty=$emptyBase normal=$normal adopted=$adopted",
  ({ emptyBase, normal, provider, adopted }) => {
    let f: Fixture;
    let prior: Awaited<ReturnType<typeof verifyValidationFloor>>;
    let priorHead: string;
    let proofRuntime: typeof UpdateProof;
    beforeAll(async () => {
      await resetNativeMocks();
      proofRuntime = await vi.importActual<typeof UpdateProof>(
        "../pr/provider-update-verification-proof.js",
      );
      mocks.retainProof.mockImplementation(proofRuntime.retainProviderUpdateVerificationProof);
      f = await fixture(updateRef, true, false, provider, false, true, {
        full: true,
        emptyBase,
        normal,
        adopted,
        beforeUpdate: async (root) => {
          const command = await loadCommandContext({ cwd: root, rootOverride: null });
          const task = (await command.taskBackend.getTask(taskId))!;
          const head = git(root, "rev-parse", "HEAD");
          await command.taskBackend.writeTask({
            ...task,
            commit: { hash: head, message: "Actual own source" },
          });
          expect((await command.taskBackend.getTask(taskId))!.commit?.hash).toBe(head);
          mocks.flow.mockImplementation(() => {
            const current = git(root, "rev-parse", "HEAD");
            const report = priorPrFlow("OPEN");
            if (report.pr.state !== "OPEN") throw new Error("Expected prior OPEN fixture");
            return Promise.resolve({
              ...report,
              task: { id: taskId, status: "DONE", verification: "ok" },
              branch: { name: branch, headSha: current, metaHeadSha: head },
              pr: {
                ...report.pr,
                prNumber: 42,
                prUrl: "https://github.com/example/repo/pull/42",
                headSha: current,
              },
              publication: {
                state: "aligned",
                localHeadSha: current,
                hostedHeadSha: current,
                upstreamRef: `origin/${branch}`,
                upstreamHeadSha: current,
              },
            });
          });
          prior = await verifyValidationFloor(root);
          await acceptValidationFloorReview(root);
          priorHead = git(root, "rev-parse", "HEAD");
        },
      });
    });
    it("retires only the freshness of prior accepted native records", async () => {
      expect(await validationFloorGates(f.root, false, priorHead)).toMatchObject(passingGates);
      const M = f.input.observed_head_sha;
      expect(git(f.root, "rev-parse", "main")).toBe(f.input.original_base_sha);
      if (normal) await f.completeNormally();
      else
        expect(await f.invoke()).toMatchObject({
          verdict: "applied",
          next_step: "agent.verification",
        });
      if (provider === "github" || adopted) {
        expect(await proofRuntime.providerUpdateVerificationFloor(f.root, taskId)).toBeNull();
        expect(await validationFloorGates(f.root)).toMatchObject(passingGates);
        return;
      }
      expect(await proofRuntime.providerUpdateVerificationFloor(f.root, taskId)).toBe(M);
      for (const snapshotOnly of [false, true])
        expect(await validationFloorGates(f.root, snapshotOnly)).toMatchObject({
          verification: false,
          review: false,
          evaluated: M,
        });
      const needsVerification = await f.decide();
      expect(needsVerification.workflowStep.id).toBe("agent.verification");
    });
    if (provider === "gitlab" && !adopted) {
      it("requires EVALUATOR after a fresh full execution at M", async () => {
        const M = f.input.observed_head_sha;
        const fresh = await verifyValidationFloor(f.root);
        expect(fresh.observation.manifest_path).not.toBe(prior!.observation.manifest_path);
        expect(await readFile(prior!.observation.manifest_path!, "utf8")).toBe(prior!.bytes);
        expect(await validationFloorGates(f.root)).toMatchObject({
          verification: true,
          review: false,
          evaluated: M,
        });
        const needsReview = await f.decide();
        expect(needsReview.workflowStep.id).toBe("agent.quality_review");
      });
      it("records a fresh independent EVALUATOR verdict at M", async () => {
        const M = f.input.observed_head_sha;
        await acceptValidationFloorReview(f.root);
        publishFixtureArtifacts(f.root);
        expect(await validationFloorGates(f.root)).toMatchObject({ ...passingGates, evaluated: M });
      });
      it("preserves native closure and integration authority gates", async () => {
        const close = await f.decide();
        expect(close.workflowStep.id).toBe("approval.task.pre_merge_close");
        if (
          close.workflowStep.kind !== "approval" ||
          close.workflowStep.request.type !== "side_effect"
        )
          throw new Error("Expected explicit fixture closure intent");
        const intent = close.workflowStep.request.operation;
        if (intent.id !== "task.pre_merge_close")
          throw new Error("Expected native pre-merge closure");
        const operation = {
          ...intent,
          ...WORKFLOW_OPERATION_REGISTRY[intent.id],
          preconditionFingerprint: close.workflowStep.preconditionFingerprint,
          authorityRef: close.workflowStep.request.authorityRef,
          idempotencyKey: `${intent.id}:${taskId}:${close.workflowStep.preconditionFingerprint.digest}:${operationPayloadDigest(intent)}`,
        };
        const closed = await executeBranchWorkflowOperation({ decision: close, operation });
        expect(closed.exit_code).toBe(0);
        publishFixtureArtifacts(f.root);
        const afterClose = await f.decide();
        const eligible = afterClose.workflowStep;
        expect(
          eligible.kind === "approval" && eligible.request.type === "side_effect"
            ? eligible.request.operationId
            : eligible.id,
        ).toBe("integration.enqueue");
      });
    }
    afterAll(async () => {
      vi.restoreAllMocks();
      await Promise.all(
        ownedRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
      );
    });
  },
);

describe("interrupted provider update recovery", () => {
  beforeEach(resetNativeMocks);
  afterEach(async () => {
    vi.restoreAllMocks();
    await Promise.all(
      ownedRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
    );
  });

  it("refuses same-digest tampering before the final GitLab recovery CAS", async () => {
    const f = await fixture(updateRef, true, false, "gitlab");
    let changed = "";
    mocks.retainProof.mockImplementationOnce(async (opts) => {
      const before = JSON.parse(await readFile(f.journalPath, "utf8")) as { task_revision: number };
      changed = JSON.stringify({ ...before, task_revision: before.task_revision + 1 });
      await writeFile(f.journalPath, changed);
      return opts.completion;
    });
    await expect(f.invoke()).rejects.toThrow();
    expect(await readFile(f.journalPath, "utf8")).toBe(changed);
    expect(changed).not.toBe("");
  });

  it.each([false, true])(
    "reconciles GitLab completion publication acknowledgment, applied=%s",
    async (applied) => {
      const f = await fixture(updateRef, true, false, "gitlab");
      const before = await readFile(f.journalPath, "utf8");
      const core = await vi.importActual<typeof CoreFs>("@agentplaneorg/core/fs");
      let injected = false;
      mocks.atomicWrite.mockImplementation(async (...args) => {
        if (args[0] === f.journalPath) {
          injected = true;
          if (applied) await core.atomicWriteFile(...args);
          throw new Error("recovery completion acknowledgment lost");
        }
        await core.atomicWriteFile(...args);
      });
      if (applied) {
        await expect(f.invoke()).resolves.toMatchObject({ verdict: "applied" });
        const stored = await createSupervisorEpisodeStore(f.journalPath).read();
        expect(stored).toMatchObject({
          cursor: { phase: "ready" },
          operations: [{ status: "completed" }],
        });
        await expect(f.invoke()).rejects.toThrow(
          "exact stopped provider operation is absent or changed",
        );
      } else {
        await expect(f.invoke()).rejects.toThrow("recovery completion acknowledgment lost");
        expect(await readFile(f.journalPath, "utf8")).toBe(before);
      }
      expect(injected).toBe(true);
      expect(mocks.glab.mock.calls.every(([call]) => !call.method || call.method === "GET")).toBe(
        true,
      );
    },
  );

  it.each([false, true])(
    "lease cleanup cannot replace the GitLab recovery outcome, failed=%s",
    async (failed) => {
      const f = await fixture(updateRef, true, false, "gitlab");
      const before = await readFile(f.journalPath, "utf8");
      const actual = await vi.importActual<typeof NativeLease>(
        "../shared/supervisor-execution-lease.js",
      );
      mocks.acquire.mockImplementationOnce(async (opts) => {
        const lease = await actual.tryAcquireSupervisorExecutionLease(opts);
        if (!lease) throw new Error("Fixture lease unavailable");
        return {
          release: async () => {
            await lease.release();
            throw new Error("recovery lease cleanup failed");
          },
        };
      });
      if (failed) mocks.retainProof.mockRejectedValueOnce(new Error("primary recovery failure"));
      await expect(f.invoke()).rejects.toThrow(
        failed ? "primary recovery failure" : "recovery lease cleanup failed",
      );
      if (failed) expect(await readFile(f.journalPath, "utf8")).toBe(before);
      else {
        const stored = await createSupervisorEpisodeStore(f.journalPath).read();
        expect(stored).toMatchObject({
          cursor: { phase: "ready" },
          operations: [{ status: "completed" }],
        });
      }
      const available = await actual.tryAcquireSupervisorExecutionLease({
        journal_path: f.journalPath,
      });
      expect(available).not.toBeNull();
      await available!.release();
    },
  );

  it("settles the exact applied intent once without another provider PUT or changing hosted truth", async () => {
    const f = await fixture();
    await expect(f.invoke()).resolves.toMatchObject({
      verdict: "applied",
      observed_head_sha: observedHead,
      next_step: "agent.implementation_rework",
    });
    const stored = await createSupervisorEpisodeStore(f.journalPath).read();
    expect(stored).toMatchObject({
      status: "running",
      cursor: { phase: "ready" },
      operations: [{ status: "completed" }],
    });
    expect(mocks.compare).toHaveBeenCalledTimes(3);
    const compareCalls = mocks.compare.mock.calls as unknown[][];
    expect(
      compareCalls.every((call) => {
        const args = call[1];
        return Array.isArray(args) && !(args as unknown[]).includes("-X");
      }),
    ).toBe(true);
    await expect(f.invoke()).rejects.toThrow(
      "exact stopped provider operation is absent or changed",
    );
  });

  it.each([
    [false, false],
    [false, true],
    [true, false],
    [true, true],
  ])(
    "recovers real GitLab proof without replay, later main=%s, local head behind=%s",
    async (advanced, unaligned) => {
      const f = await fixture(updateRef, true, advanced, "gitlab", unaligned);
      const actual = await vi.importActual<typeof UpdateProof>(
        "../pr/provider-update-verification-proof.js",
      );
      mocks.retainProof.mockImplementation(actual.retainProviderUpdateVerificationProof);
      await expect(f.invoke()).resolves.toMatchObject({
        verdict: "applied",
        observed_head_sha: f.input.observed_head_sha,
      });
      expect(
        execFileSync("git", ["rev-parse", "HEAD"], { cwd: f.root, encoding: "utf8" }).trim(),
      ).toBe(f.input.observed_head_sha);
      expect(await createSupervisorEpisodeStore(f.journalPath).read()).toMatchObject({
        status: "running",
        cursor: { phase: "ready" },
        operations: [{ status: "completed" }],
      });
      const inherited = await actual.inheritedProviderUpdatePaths({
        command: f.command,
        task_id: taskId,
        frozen_base: execFileSync(
          "git",
          ["merge-base", f.params.expectedHeadSha, f.params.expectedBaseSha],
          { cwd: f.root, encoding: "utf8" },
        ).trim(),
        evaluated_sha: f.input.observed_head_sha,
        changed_paths: ["foreign.ts", "next-canonical.ts"],
        workflow_dir: ".agentplane/tasks",
        tasks_path: ".agentplane/tasks.json",
      });
      expect(inherited).toEqual(["foreign.ts"]);
      expect(mocks.compare).not.toHaveBeenCalled();
      expect(mocks.glab.mock.calls.every(([call]) => !call.method || call.method === "GET")).toBe(
        true,
      );
      await expect(f.invoke()).rejects.toThrow(
        "exact stopped provider operation is absent or changed",
      );
    },
  );

  it("leaves GitLab unknown on an invalid exact merge proof or missing original USER authority", async () => {
    for (const reason of ["parents", "authority"] as const) {
      const f = await fixture(updateRef, true, true, "gitlab", true);
      if (reason === "authority")
        mocks.authority.mockResolvedValue({ state: { grants: [], audit: [] } });
      else {
        const observe = mocks.glab.getMockImplementation()!;
        mocks.glab.mockImplementation((call) =>
          call.endpoint.includes("/repository/commits/")
            ? Promise.resolve({
                id: f.input.observed_head_sha,
                parent_ids: [f.input.original_base_sha, f.input.original_head_sha],
              })
            : observe(call),
        );
      }
      await expect(f.invoke()).rejects.toThrow();
      expect(await createSupervisorEpisodeStore(f.journalPath).read()).toMatchObject({
        status: "stopped",
        operations: [{ status: "intent" }],
      });
      expect(
        execFileSync("git", ["rev-parse", "HEAD"], { cwd: f.root, encoding: "utf8" }).trim(),
      ).toBe(f.input.original_head_sha);
    }
  });

  it.each([false, true])(
    "recovers across a real route-authority transition, later main=%s",
    async (advanced) => {
      const f = await fixture(updateRef, true, advanced, "gitlab", true, true);
      const before = await f.decide();
      expect(before.workspace.prBranch, JSON.stringify(before.workspace)).toBe(branch);
      expect(before.workspace.taskWorktreePath, JSON.stringify(before.workspace)).toBe(f.root);
      expect(before.workflowStep.preconditionFingerprint.digest).toBe(
        f.input.current_state_fingerprint,
      );
      const operation =
        before.workflowStep.kind === "cli_operation"
          ? before.workflowStep.operation
          : before.workflowStep.kind === "approval" &&
              before.workflowStep.request.type === "side_effect"
            ? before.workflowStep.request.operation
            : null;
      expect(operation).toMatchObject({
        id: "provider.pr.update_branch",
        params: {
          expectedHeadSha: f.input.original_head_sha,
          expectedBaseSha: f.currentBase,
          reconcileHeadSha: f.input.observed_head_sha,
        },
      });
      const taskBefore = await f.command.taskBackend.getTask(taskId);
      const kernelBefore = JSON.stringify(taskBefore?.extensions?.task_kernel);
      const frozenBefore = JSON.stringify(taskBefore?.extensions?.task_execution_context);
      const actual = await vi.importActual<typeof UpdateProof>(
        "../pr/provider-update-verification-proof.js",
      );
      mocks.retainProof.mockImplementation(actual.retainProviderUpdateVerificationProof);
      await expect(f.invoke()).resolves.toMatchObject({
        verdict: "applied",
        observed_head_sha: f.input.observed_head_sha,
      });
      const after = await f.decide();
      expect(after.workflowStep.preconditionFingerprint.components.authority.digest).not.toBe(
        before.workflowStep.preconditionFingerprint.components.authority.digest,
      );
      expect(await createSupervisorEpisodeStore(f.journalPath).read()).toMatchObject({
        status: "running",
        operations: [{ operation_key: f.input.operation_key, status: "completed" }],
      });
      const taskAfter = await f.command.taskBackend.getTask(taskId);
      expect(JSON.stringify(taskAfter?.extensions?.task_kernel)).toBe(kernelBefore);
      expect(JSON.stringify(taskAfter?.extensions?.task_execution_context)).toBe(frozenBefore);
      expect(mocks.glab.mock.calls.every(([call]) => !call.method || call.method === "GET")).toBe(
        true,
      );
    },
  );

  it.each(["policy", "retained authority"] as const)(
    "rejects concurrent %s drift across the real recovery route transition",
    async (control) => {
      const f = await fixture(updateRef, true, false, "gitlab", true, true);
      const flow = mocks.flow.getMockImplementation()!;
      let injected = false;
      mocks.flow.mockImplementation(async () => {
        const head = execFileSync("git", ["rev-parse", "HEAD"], {
          cwd: f.root,
          encoding: "utf8",
        }).trim();
        if (!injected && head === f.input.observed_head_sha) {
          injected = true;
          if (control === "policy")
            await writeFile(
              path.join(f.root, ".agentplane/policy/security.must.md"),
              "# Concurrent policy change\nFresh approval is required.\n",
            );
          else f.grant.digest = `sha256:${"1".repeat(64)}`;
        }
        return await flow();
      });
      await expect(f.invoke()).rejects.toThrow(
        control === "policy"
          ? "route changed during provider proof"
          : "retained USER authority changed",
      );
      expect(injected).toBe(true);
      expect(mocks.retainProof).not.toHaveBeenCalled();
      expect(await createSupervisorEpisodeStore(f.journalPath).read()).toMatchObject({
        status: "stopped",
        stop: { reason: "effect_in_doubt" },
        operations: [{ operation_key: f.input.operation_key, status: "intent" }],
      });
    },
  );

  it("refreshes stale base tracking when GitLab HEAD is already aligned", async () => {
    const f = await fixture(updateRef, true, true, "gitlab", false);
    execFileSync("git", ["update-ref", "refs/remotes/origin/main", f.input.original_base_sha], {
      cwd: f.root,
    });
    await expect(f.invoke()).resolves.toMatchObject({ verdict: "applied" });
    expect(
      execFileSync("git", ["rev-parse", "origin/main"], {
        cwd: f.root,
        encoding: "utf8",
      }).trim(),
    ).toBe(f.currentBase);
    expect(await createSupervisorEpisodeStore(f.journalPath).read()).toMatchObject({
      operations: [{ status: "completed" }],
    });
    const retained = mocks.retainProof.mock.calls.at(-1)?.[0];
    expect(retained?.completion.original_base_sha).toBe(f.input.original_base_sha);
  });

  it.each(["revoked extension", "changed store source"] as const)(
    "rejects %s during final GitLab authority readback",
    async (drift) => {
      const f = await fixture(updateRef, true, false, "gitlab", true);
      if (drift === "revoked extension") {
        const originalTask: TaskData = {
          id: taskId,
          title: "Retained legacy authority",
          description: "Read fresh fallback authority",
          status: "DONE",
          priority: "high",
          owner: "CODER",
          depends_on: [],
          tags: [],
          verify: [],
          extensions: { "agentplane.side_effect_authority": f.authorityState },
        };
        const freshTask: TaskData = {
          ...originalTask,
          extensions: { "agentplane.side_effect_authority": { grants: [], audit: [] } },
        };
        vi.spyOn(f.command.taskBackend, "getTask")
          .mockResolvedValueOnce(originalTask)
          .mockResolvedValue(freshTask);
        mocks.authority.mockImplementation(({ task }: { task: TaskData }) =>
          Promise.resolve({
            source: "task_extension",
            state: task === originalTask ? f.authorityState : { grants: [], audit: [] },
          }),
        );
      } else {
        mocks.authority
          .mockResolvedValueOnce({ source: "git_common_dir", state: f.authorityState })
          .mockResolvedValue({ source: "task_extension", state: f.authorityState });
      }
      await expect(f.invoke()).rejects.toThrow("retained USER authority changed");
      expect(mocks.retainProof).not.toHaveBeenCalled();
      expect(await createSupervisorEpisodeStore(f.journalPath).read()).toMatchObject({
        status: "stopped",
        operations: [{ status: "intent" }],
      });
    },
  );

  it.each([
    ["wrong operation", { effect_ref: "provider.pr.update_branch:forged" }],
    ["wrong task", { task_id: "other-task" }],
    ["wrong published head", { observed_head_sha: "e".repeat(40) }],
    ["wrong original base", { original_base_sha: "f".repeat(40) }],
  ])("rejects %s before journal completion", async (_label, delta) => {
    const f = await fixture();
    await expect(f.invoke(delta)).rejects.toThrow();
    expect(await createSupervisorEpisodeStore(f.journalPath).read()).toMatchObject({
      status: "stopped",
      operations: [{ status: "intent" }],
    });
  });

  it("rejects missing USER grant, provider mismatch, ancestry failure, and dirty local state", async () => {
    const scenarios = [
      () => mocks.authority.mockResolvedValue({ state: { grants: [], audit: [] } }),
      () =>
        mocks.observe.mockResolvedValue({
          state: "found",
          pr: { status: "OPEN", headSha: "e".repeat(40) },
        }),
      () => mocks.compare.mockResolvedValue({ status: "diverged" }),
      () => mocks.local.mockResolvedValue("dirty checkout"),
    ];
    for (const arrange of scenarios) {
      vi.clearAllMocks();
      const f: Fixture = await fixture();
      arrange();
      await expect(f.invoke()).rejects.toThrow();
      expect(await createSupervisorEpisodeStore(f.journalPath).read()).toMatchObject({
        status: "stopped",
      });
    }
  });

  it("rejects competing payload grants and mismatched historical audit bindings", async () => {
    const f = await fixture();
    const state = f.authorityState;
    mocks.authority.mockResolvedValue({
      state: { ...state, grants: [f.grant, { ...f.grant, id: "authority-other" }] },
    });
    await expect(f.invoke()).rejects.toThrow("matching retained USER authority");
    mocks.authority.mockResolvedValue({
      state: {
        ...state,
        audit: [{ ...state.audit[0], stateFingerprintDigest: `sha256:${"f".repeat(64)}` }],
      },
    });
    await expect(f.invoke()).rejects.toThrow("matching retained USER authority");
  });

  it("rejects an unrelated hosted descendant with the same old base", async () => {
    const f = await fixture();
    mocks.compare.mockImplementation((_root: string, args: string[]) => {
      if (args[0]!.includes("/git/commits/"))
        return Promise.resolve({
          sha: observedHead,
          parents: [{ sha: originalHead }, { sha: "f".repeat(40) }],
        });
      const [older] = args[0]!.split("/compare/")[1]!.split("...");
      return Promise.resolve({
        status: "ahead",
        base_commit: { sha: older },
        merge_base_commit: { sha: older },
      });
    });
    await expect(f.invoke()).rejects.toThrow("exact original-head/base merge commit");
  });

  it("rejects operator evidence with a mismatched digest", async () => {
    const f = await fixture();
    await expect(
      f.invoke({
        evidence: [
          { ref: "hosted-pr-observation", content: "forged", digest: f.input.evidence[0]!.digest },
        ],
      }),
    ).rejects.toThrow("operator evidence content digest mismatch");
  });

  it("leaves unrelated mutating intents stopped", async () => {
    const f = await fixture("workflow-operation:pr.open");
    await expect(f.invoke()).rejects.toThrow(
      "exact stopped provider operation is absent or changed",
    );
    expect(await createSupervisorEpisodeStore(f.journalPath).read()).toMatchObject({
      status: "stopped",
      operations: [{ status: "intent" }],
    });
  });

  it("rejects a concurrent journal change at compare-and-swap", async () => {
    const f = await fixture();
    mocks.local.mockImplementation(async () => {
      const concurrent = createSupervisorExecutionEpisodeJournal({
        task_id: taskId,
        task_revision: 2,
        state_fingerprint_digest: `sha256:${"9".repeat(64)}`,
        budget,
      });
      await createSupervisorEpisodeStore(f.journalPath).write(concurrent);
      return null;
    });
    await expect(f.invoke()).rejects.toThrow("supervisor journal changed during recovery");
  });
  it.each([
    [false, false],
    [true, false],
    [false, true],
    [true, true],
  ])(
    "publishes usable native proof during real-Git recovery, provisional=%s, advanced base=%s",
    async (provisional, advanceBase) => {
      const f = await fixture(updateRef, true, advanceBase);
      const actual = await vi.importActual<typeof UpdateProof>(
        "../pr/provider-update-verification-proof.js",
      );
      mocks.retainProof.mockImplementation(actual.retainProviderUpdateVerificationProof);
      if (provisional)
        await actual.retainProviderUpdateVerificationProof({
          command: f.command,
          params: f.params,
          authority_digest: f.input.precondition_fingerprint_digest,
          observed_head_sha: f.input.observed_head_sha,
          completion: {
            status: "succeeded",
            observed_postconditions: [`provider_update_head:${f.input.observed_head_sha}`],
            exit_code: 0,
          },
        });
      const evidence = {
        command: f.command,
        task_id: taskId,
        frozen_base: git(f.root, "merge-base", f.params.expectedHeadSha, f.params.expectedBaseSha),
        evaluated_sha: f.input.observed_head_sha,
        changed_paths: ["foreign.ts", "next-canonical.ts"],
        workflow_dir: ".agentplane/tasks",
        tasks_path: ".agentplane/tasks.json",
      };
      const before = await actual.inheritedProviderUpdatePaths(evidence);
      expect(before).toEqual([]);
      await f.invoke();
      const inherited = await actual.inheritedProviderUpdatePaths(evidence);
      expect(inherited).toEqual(["foreign.ts"]);
      if (advanceBase)
        expect(() =>
          execFileSync(
            "git",
            ["merge-base", "--is-ancestor", f.currentBase, f.input.observed_head_sha],
            {
              cwd: f.root,
              stdio: "ignore",
            },
          ),
        ).toThrow();
      expect(mocks.compare.mock.calls.every((call) => !(call[1] as string[]).includes("-X"))).toBe(
        true,
      );
    },
  );
});

async function canonicalRouteTask(root: string, full = false) {
  git(root, "config", "user.name", "Fixture");
  git(root, "config", "user.email", "fixture@example.test");
  git(root, "config", "agentplane.baseBranch", "main");
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  config.agents.approvals.require_plan = false;
  await writeConfig(root, config);
  await mkdir(path.join(root, ".agentplane/policy"), { recursive: true });
  for (const name of ["dod.code.md", "dod.core.md", "security.must.md", "workflow.branch_pr.md"])
    await writeFile(path.join(root, ".agentplane/policy", name), "# Preserve native authority\n");
  await writeFile(
    path.join(root, ".gitignore"),
    ".agentplane/context/\n.agentplane/cache/\n.agentplane/cache.sqlite*\n",
  );
  await ensureRuntimeGitignore({ gitRoot: root });
  if (full) {
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify({ private: true, scripts: { "ci:local:full": "node check.cjs" } }),
    );
    await writeFile(
      path.join(root, "check.cjs"),
      "const fs=require('node:fs'),assert=require('node:assert/strict');assert.equal(fs.readFileSync('own.ts','utf8'),'task');if(fs.existsSync('foreign.ts'))assert.equal(fs.readFileSync('foreign.ts','utf8'),'canonical');console.log(require('node:child_process').execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim());",
    );
  }
  await commitAll(root, "seed route policy");
  const base = git(root, "rev-parse", "HEAD");
  const journey = kernelReplayJourney("direct");
  const repositoryIdentity = (await resolveLogicalRepositoryIdentity({
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
    writeTask: (task) => {
      saved = task;
      return Promise.resolve();
    },
  });
  const adapter = new KernelBackendAdapter(backend, repositoryIdentity);
  for (const [index, step] of journey.steps.entries()) {
    const input = structuredClone(step.input);
    input.command.task_id = taskId;
    if (input.command.kind === "accept_work_item_result")
      for (const output of input.command.output_manifests) output.task_id = taskId;
    input.authority = {
      ...input.authority!,
      task_id: taskId,
      repository_identity: repositoryIdentity,
    };
    const result =
      index === 0
        ? await adapter.create({ ...journey.task, id: taskId }, input)
        : await adapter.execute(input);
    expect(result.kind, `${step.label}: ${JSON.stringify(result)}`).toBe("committed");
  }
  const task = saved! as TaskData;
  const commands = [full ? "bun run ci:local:full" : "git diff --check"];
  task.execution_contract = resolveExplicitExecutionContract({
    config,
    parsed: {
      route: "branch_pr",
      verify: commands,
      scopeRoots: ["own.ts"],
      repositoryEffects: ["source_code"],
    },
    intent: { taskKind: "code", mutationScope: "code" },
  });
  task.execution_route = {
    requested_mode: "branch_pr",
    selected_mode: "branch_pr",
    repository_mode: "branch_pr",
    schema_version: 1,
    reason_codes: ["explicit_branch_pr"],
    frozen: true,
  };
  task.verify = commands;
  if (full) task.quality_review = undefined;
  task.task_kind = "code";
  task.mutation_scope = "code";
  task.extensions = {
    ...task.extensions,
    task_execution_context: {
      schema_version: 1,
      base_ref: "main",
      base_sha: base,
      repository_identity: repositoryIdentity,
    },
    implementation_commit: { hash: base },
  };
  task.doc =
    "## Summary\nRecover the original provider intent.\n\n## Scope\nPreserve native controls and verify own.ts.\n\n## Plan\nPreserve controls.\n\n## Verify Steps\n- git diff --check\n\n## Rollback Plan\nRetain all original history and restore source through reviewed work.\n";
  const command = await loadCommandContext({ cwd: root, rootOverride: null });
  await command.taskBackend.writeTask(task);
  const prDirectory = path.join(root, ".agentplane/tasks", taskId, "pr");
  await mkdir(prDirectory, { recursive: true });
  const meta = buildOpenedPrMeta({
    taskId,
    branch,
    base: "main",
    at: "2026-08-30T00:00:00.000Z",
    previousMeta: null,
  });
  await writeFile(
    path.join(prDirectory, "meta.json"),
    JSON.stringify(
      full
        ? buildObservedChangeRequestMeta({
            meta,
            observed: {
              prNumber: 42,
              prUrl: "https://github.com/example/repo/pull/42",
              status: "OPEN",
              base: "main",
              headSha: base,
              mergedAt: null,
              mergeCommit: null,
            },
            at: "2026-08-30T00:00:00.000Z",
          })
        : meta,
    ),
  );
  await commitAll(root, "completed canonical route fixture task");
  return command;
}

/** Execute and retain a new native full-command observation, rather than fabricating a record. */
async function verifyValidationFloor(root: string) {
  const command = await loadCommandContext({ cwd: root, rootOverride: null });
  const task = (await command.taskBackend.getTask(taskId))!;
  const resolved = await resolveImplementationVerificationTask({
    command,
    checkout: root,
    task,
    workflow: "branch_pr",
  });
  const result = await runDirectTaskVerification({
    command,
    cwd: root,
    task_id: taskId,
    task: resolved.task,
    additional_commands: [{ command: `node check.cjs probe${root}`, check_ids: ["task_outcome"] }],
  });
  expect(result.checks.some((check) => check.command.includes("<repo>"))).toBe(true);
  expect(result.status, JSON.stringify(result)).toBe("passed");
  const full = result.checks.find((check) => check.command === "bun run ci:local:full");
  expect(Boolean(full)).toBe(true);
  const observation = full!.observation!;
  expect(observation.status).toBe("retained");
  const bytes = await readFile(observation.manifest_path!, "utf8");
  const manifest = JSON.parse(bytes) as { binding: { implementation: { head: string } } };
  expect(digestBytes(bytes)).toBe(observation.digest);
  const head = git(root, "rev-parse", "HEAD");
  expect(manifest.binding.implementation.head).toBe(head);
  expect(full!.stdout_tail).toContain(head);
  expect(
    await cmdVerifyParsed({
      ctx: command,
      cwd: root,
      taskId,
      state: "ok",
      by: "SUPERVISOR",
      note: "Actual full-command verification at current HEAD.",
      details: renderDirectTaskVerificationDetails({
        task: resolved.task,
        taskId,
        workflow: "branch_pr",
        result,
      }),
      verificationSnapshot: resolved.snapshot,
      projectionPolicy: "task-only",
      allowCanonicalProjection: true,
      localOnly: true,
      quiet: true,
    }),
  ).toBe(0);
  await commitAll(root, "retain actual full verification");
  publishFixtureArtifacts(root);
  const directory = path.join(root, ".agentplane/tasks", taskId, "verification");
  const names = await readdir(directory);
  const records = await Promise.all(
    names.map(
      async (name) =>
        JSON.parse(await readFile(path.join(directory, name), "utf8")) as {
          input?: { schema_version?: number };
        },
    ),
  );
  expect(records.some((record) => record.input?.schema_version === 5)).toBe(true);
  return { observation, bytes, head, records };
}

const digestBytes = (value: string) => `sha256:${createHash("sha256").update(value).digest("hex")}`;

function publishFixtureArtifacts(root: string) {
  if (path.isAbsolute(git(root, "remote", "get-url", "origin")))
    git(root, "push", "origin", `HEAD:${branch}`);
}
