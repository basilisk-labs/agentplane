import { beforeEach, describe, expect, it, vi } from "vitest";
import { kernelPlanProposalSchema, taskKernel as k } from "@agentplaneorg/core/tasks";
import type * as VerificationModule from "./direct-task-verification.js";

const mocks = vi.hoisted(() => ({
  resolve: vi.fn(),
  checks:
    vi.fn<
      (opts: Parameters<typeof VerificationModule.runDirectTaskVerification>[0]) => Promise<unknown>
    >(),
  project: vi.fn<(opts: { details?: string; verificationSnapshot?: unknown }) => Promise<number>>(),
  write: vi.fn(),
  repositoryEvidence: vi.fn(),
  target: vi.fn(),
  status: vi.fn(),
  recover: vi.fn(),
}));
vi.mock("./kernel-operational-projection-recovery.js", () => ({
  recoverKernelOperationalProjection: mocks.recover,
}));
vi.mock("./external-agent-implementation-recovery.js", () => ({
  resolveImplementationVerificationTask: mocks.resolve,
}));
vi.mock("./direct-task-verification.js", async (original) => ({
  ...(await original<typeof VerificationModule>()),
  runDirectTaskVerification: mocks.checks,
}));
vi.mock("./verify-record.js", () => ({ cmdVerifyParsed: mocks.project }));
vi.mock("./kernel-exchange.js", () => ({
  kernelExchangeDirectory: vi.fn(() => Promise.resolve("/repo/exchange")),
  writeKernelArtifact: mocks.write,
}));
vi.mock("./kernel-repository-coordinator.js", () => ({
  listKernelRepositoryEvidence: mocks.repositoryEvidence,
}));
vi.mock("../shared/quality-review-target.js", () => ({
  resolveQualityReviewTargetSha: mocks.target,
}));
vi.mock("./direct-task-finalization.js", () => ({
  readDirectRepositoryStatus: mocks.status,
}));
import {
  canonicalFinalValidationTask,
  finalValidationIdentityMatches,
  restoreKernelFinalValidation,
  runKernelFinalValidation,
} from "./kernel-final-validation.js";

const evaluatorTarget = "a".repeat(40);
const storedIdentity = "sha256:" + "a".repeat(64);
const changedFingerprint = "sha256:" + "b".repeat(64);

describe("canonical final-validation identity recovery", () => {
  it("restores validation across managed task artifacts for the same evaluator target", () => {
    expect(
      finalValidationIdentityMatches({
        stored_identity: storedIdentity,
        repository_fingerprint: changedFingerprint,
        previous_evaluator_target: evaluatorTarget,
        resolved_evaluator_target: evaluatorTarget,
        status_lines: [
          " M .agentplane/tasks/T-1/README.md",
          "?? .agentplane/tasks/T-1/quality/report.json",
        ],
        task_artifact_prefix: ".agentplane/tasks/T-1/",
      }),
    ).toBe(true);
  });

  it.each([
    {
      name: "evaluator target changed",
      previousTarget: evaluatorTarget,
      target: "c".repeat(40),
      lines: [" M .agentplane/tasks/T-1/README.md"],
    },
    {
      name: "previous evaluator target is unavailable",
      previousTarget: null,
      target: evaluatorTarget,
      lines: [" M .agentplane/tasks/T-1/README.md"],
    },
    {
      name: "source is dirty",
      previousTarget: evaluatorTarget,
      target: evaluatorTarget,
      lines: [" M packages/agentplane/src/commands/task/kernel-advance.ts"],
    },
  ])("rejects recovery when $name", ({ previousTarget, target, lines }) => {
    expect(
      finalValidationIdentityMatches({
        stored_identity: storedIdentity,
        repository_fingerprint: changedFingerprint,
        previous_evaluator_target: previousTarget,
        resolved_evaluator_target: target,
        status_lines: lines,
        task_artifact_prefix: ".agentplane/tasks/T-1/",
      }),
    ).toBe(false);
  });
});

describe("canonical final-validation command ownership", () => {
  it("removes legacy operational verification commands without mutating the task", () => {
    const task = {
      id: "T-1",
      verify: ["legacy stale command"],
      description: "Canonical task projection",
    };

    expect(canonicalFinalValidationTask(task)).toEqual({
      ...task,
      verify: [],
    });
    expect(task.verify).toEqual(["legacy stale command"]);
  });
});

function fixture() {
  const contractDigest: string = k.kernelDigest("work-item-contract");
  const task = {
    id: "T-1",
    verify: ["legacy command"],
    execution_route: { repository_mode: "branch_pr" },
    execution_contract: { verification: { contract: { selected_checks: ["task_outcome"] } } },
  };
  const resolvedTask = {
    ...task,
    execution_contract: {
      verification: { contract: { selected_checks: ["task_outcome", "full_regression"] } },
    },
  };
  const snapshot = { execution_contract: resolvedTask.execution_contract };
  mocks.resolve.mockResolvedValue({ task: resolvedTask, snapshot });
  mocks.checks.mockImplementation(({ task: checkedTask }) =>
    Promise.resolve({
      status: "passed",
      reason: null,
      artifact_path: "native-checks.json",
      checks: [
        {
          command: "bun run ci:local:full",
          check_ids: checkedTask.execution_contract?.verification.contract?.selected_checks ?? [],
          exit_code: 0,
          runtime: null,
        },
      ],
    }),
  );
  const record = {
    digest: k.kernelDigest("record"),
    aggregate: {
      id: task.id,
      revision: 12,
      current_plan: {
        state: "APPROVED",
        digest: k.kernelDigest("plan"),
        work_items: [
          {
            id: "fix",
            contract_digest: contractDigest,
            optional: false,
            depends_on: [],
            required_inputs: [],
            expected_outputs: ["fix-evidence"],
            execution_requirements: {
              scope_roots: ["src"],
              repository_effects: ["source_code", "tests"],
              external_effects: [],
              capabilities: ["repository_write"],
              resources: [],
            },
          },
        ],
      },
      work_items: { fix: { state: "COMPLETED", result_digest: k.kernelDigest("result") } },
      final_validation: null,
    },
    documents: {
      contracts: {
        [contractDigest]: {
          objective: "Repair source",
          acceptance_criteria: ["Regression passes"],
          role: "EXECUTOR",
          verification_commands: ["bun run ci:local:full"],
        },
      },
    },
  };
  const command = {
    resolvedProject: { gitRoot: "/repo" },
    taskBackend: { getTask: vi.fn(() => Promise.resolve(task)) },
    config: { paths: { workflow_dir: ".agentplane/tasks" } },
  };
  const apply = vi.fn(() => Promise.resolve({ kind: "committed", record }));
  const runtime = {
    native: {
      readContext: vi.fn(() =>
        Promise.resolve({
          repository_fingerprint: storedIdentity,
          occurred_at: "2026-09-27T00:00:00Z",
        }),
      ),
    },
    authority: {
      resolve: vi.fn(() =>
        Promise.resolve({
          authority: {
            repository_fingerprint: storedIdentity,
            digest: k.kernelDigest("authority"),
          },
        }),
      ),
    },
    adapter: { read: vi.fn(() => Promise.resolve({ kind: "canonical", record })) },
    observe: vi.fn(() => Promise.resolve({ fingerprint: storedIdentity })),
    input: vi.fn((payload: { kind: string; validation: k.ValidationRecord }) =>
      Promise.resolve({
        command: { ...payload, expected_task_revision: record.aggregate.revision },
      }),
    ),
    lifecycle: { apply },
  };
  const run = () => runKernelFinalValidation(command as never, runtime as never, record as never);
  return { command, record, runtime, task, resolvedTask, snapshot, run, apply };
}

describe("canonical final Verification Contract projection", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.recover.mockResolvedValue({ kind: "unchanged" });
    mocks.repositoryEvidence.mockResolvedValue([{ implementation_commit: evaluatorTarget }]);
    mocks.target.mockResolvedValue(evaluatorTarget);
    mocks.status.mockResolvedValue({ lines: [] });
    mocks.project.mockResolvedValue(0);
  });

  it.each(["failed", "unsupported"] as const)(
    "retains %s final evidence and emits a bounded recovery route",
    async (status) => {
      const f = fixture();
      mocks.checks.mockResolvedValue({
        status,
        reason: "check stopped",
        checks: [],
        artifact_path: "checks.json",
      });
      const result = await f.run();
      expect(result).toMatchObject({
        stop: {
          kind: "human_required",
          failure_class: status === "failed" ? "code_regression" : "infrastructure",
          recovery: {
            cwd: "/repo",
            retry_argv: ["agentplane", "task", "advance", "T-1", "--agent-json"],
          },
        },
      });
      expect(f.runtime.input.mock.calls[0]?.[0].validation.status).toBe(
        status === "failed" ? "FAILED" : "BLOCKED",
      );
      expect(f.runtime.input.mock.calls[0]?.[0].validation.evidence_digests).toHaveLength(1);
      expect(f.apply).toHaveBeenCalledOnce();
      expect(mocks.project).not.toHaveBeenCalled();
      const corrective: unknown = mocks.write.mock.calls.find(
        (call) => call[1] === "corrective-plan.json",
      )?.[2];
      if (status === "failed") {
        const proposal = kernelPlanProposalSchema.parse(corrective);
        expect(proposal.work_items).toHaveLength(2);
        expect(proposal.work_items[0]!.contract).toEqual(
          Object.values(f.record.documents.contracts)[0],
        );
        expect(proposal.work_items[1]).toMatchObject({
          depends_on: ["fix"],
          optional: false,
          execution_requirements: { scope_roots: ["src"], external_effects: [] },
          contract: { role: "EXECUTOR", verification_commands: ["bun run ci:local:full"] },
        });
        expect(result).toMatchObject({
          stop: {
            recovery: {
              required_role: "USER",
              approval_argv: [
                "agentplane",
                "task",
                "plan",
                "set",
                "T-1",
                "--file",
                "/repo/exchange/corrective-plan.json",
                "--scope-expansion-approved-by",
                "USER",
              ],
            },
          },
        });
      } else expect(corrective).toBeUndefined();
    },
  );

  it("does not run or persist final checks when projection recovery needs re-evaluation", async () => {
    const f = fixture();
    const action = {
      kind: "human_required",
      reason: "canonical_operational_projection_recovery_required",
    };
    mocks.recover.mockResolvedValue({ kind: "stop", action });
    expect(await f.run()).toEqual({ stop: action });
    expect(mocks.checks).not.toHaveBeenCalled();
    expect(mocks.project).not.toHaveBeenCalled();
    expect(f.apply).not.toHaveBeenCalled();
  });

  it("runs native final checks for report-only completion without inventing an implementation commit", async () => {
    const f = fixture();
    mocks.repositoryEvidence.mockResolvedValue([]);
    mocks.recover.mockResolvedValue({ kind: "report_only" });
    await f.run();
    expect(mocks.resolve).not.toHaveBeenCalled();
    expect(mocks.checks).toHaveBeenCalledOnce();
    expect(mocks.project).not.toHaveBeenCalled();
    expect(f.apply).toHaveBeenCalledOnce();
  });

  it("records native strengthened checks before projecting the same contract", async () => {
    const f = fixture();
    await f.run();
    expect(mocks.resolve).toHaveBeenCalledOnce();
    expect(mocks.checks.mock.calls[0]?.[0].task).toEqual({ ...f.resolvedTask, verify: [] });
    expect(mocks.project.mock.calls[0]?.[0].verificationSnapshot).toBe(f.snapshot);
    expect(mocks.project.mock.calls[0]?.[0].details).toContain(
      "Check: full_regression\nCommand: bun run ci:local:full",
    );
    expect(f.apply.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.project.mock.invocationCallOrder[0]!,
    );
    expect(f.runtime.input.mock.calls[0]?.[0].validation.identity.check_id).toBe(
      "canonical-final-contracts-v2",
    );
    expect(f.task.execution_contract.verification.contract.selected_checks).toEqual([
      "task_outcome",
    ]);
  });

  it.each(["throw", "exit"] as const)(
    "retains native success after projection %s so fresh recovery does not execute checks again",
    async (failure) => {
      const f = fixture();
      if (failure === "throw") mocks.project.mockRejectedValueOnce(new Error("projection failed"));
      else mocks.project.mockResolvedValueOnce(3);
      await expect(f.run()).rejects.toThrow();
      expect(f.apply).toHaveBeenCalledOnce();
      const validation = f.runtime.input.mock.calls[0]![0].validation;
      const persisted = {
        ...f.record,
        aggregate: { ...f.record.aggregate, final_validation: validation },
      };
      const restored = await restoreKernelFinalValidation(
        f.command as never,
        persisted as never,
        storedIdentity,
      );
      expect(restored).toMatchObject({ evidence_digest: validation.evidence_digests[0] });
      // The restored controller route retries projection, not runKernelFinalValidation.
      await expect(mocks.project({ verificationSnapshot: f.snapshot })).resolves.toBe(0);
      expect(mocks.checks).toHaveBeenCalledOnce();
    },
  );

  it("never projects when native validation persistence is rejected", async () => {
    const f = fixture();
    f.apply.mockRejectedValueOnce(new Error("CAS rejected"));
    await expect(f.run()).rejects.toThrow("CAS rejected");
    expect(mocks.project).not.toHaveBeenCalled();
  });

  it("does not relabel a narrow command as full regression", async () => {
    const f = fixture();
    mocks.checks.mockResolvedValue({
      status: "passed",
      reason: null,
      artifact_path: "native-checks.json",
      checks: [{ command: "bun test src/unit.test.ts", check_ids: ["task_outcome"], exit_code: 0 }],
    });
    mocks.project.mockImplementation(({ details }) => {
      expect(details).not.toContain("Check: full_regression");
      return Promise.reject(new Error("missing full_regression"));
    });
    await expect(f.run()).rejects.toThrow("full_regression");
    expect(f.apply).not.toHaveBeenCalled();
  });

  it("rejects legacy final records that may precede a failed projection", async () => {
    const f = fixture();
    const record = {
      ...f.record,
      aggregate: {
        ...f.record.aggregate,
        final_validation: {
          status: "PASSED",
          identity: { check_id: "canonical-final-contracts" },
          evidence_digests: [k.kernelDigest("old-evidence")],
        },
      },
    };
    await expect(
      restoreKernelFinalValidation(f.command as never, record as never, storedIdentity),
    ).resolves.toBeNull();
  });
});
