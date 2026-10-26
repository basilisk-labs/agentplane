import { beforeEach, describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

const mocks = vi.hoisted(() => ({
  runtime: vi.fn(),
  retained: vi.fn(),
  repositoryEvidence: vi.fn(),
  changeRequest: vi.fn(),
  hostedChecks: vi.fn(),
  verifyReceipt: vi.fn(),
  writeArtifact: vi.fn(),
}));
vi.mock("./kernel-runtime-context.js", () => ({
  createKernelRuntime: mocks.runtime,
  requireKernelCommit: (value: unknown) => value,
}));
vi.mock("./kernel-final-timing-exception-evidence.js", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  retainedFinalValidationFailure: mocks.retained,
}));
vi.mock("./kernel-repository-coordinator.js", () => ({
  listKernelRepositoryEvidence: mocks.repositoryEvidence,
}));
vi.mock("../pr/internal/change-request-provider.js", () => ({
  observeExistingChangeRequestByNumber: mocks.changeRequest,
}));
vi.mock("../pr/hosted-checks.js", () => ({ resolveHostedChecksStatus: mocks.hostedChecks }));
vi.mock("../../adapters/authority/user-approval-receipt.js", () => ({
  verifyUserApprovalReceipt: mocks.verifyReceipt,
}));
vi.mock("./kernel-exchange.js", () => ({
  kernelExchangeDirectory: vi.fn().mockResolvedValue("/retained/exchange"),
  writeKernelArtifact: mocks.writeArtifact,
}));

import { acceptKernelFinalTimingException } from "./kernel-final-timing-exception.js";

const digest = (value: string) => k.kernelDigest(value);
const taskId = "T-1";
const branch = "task/T-1/work";
const head = "a".repeat(40);
const commandText = "bun run ci:local:full";
const fingerprint = digest("repository");
const planDigest = digest("plan");

function setup(trustedIssuers: unknown[] = []) {
  const evidence = {
    binding: {
      commands: [commandText],
      plan_digest: planDigest,
      repository_fingerprint: fingerprint,
    },
    checks: {
      status: "failed",
      artifact_path: "/retained/checks.json",
      reason: null,
      checks: [
        {
          command: commandText,
          script: "ci:local:full",
          check_ids: ["full"],
          exit_code: 1,
          duration_ms: 1_463_240,
          stdout_tail: "suite budget exceeded: duration=1463.240s budget=1440s",
          stderr_tail: "",
        },
      ],
    },
  };
  const failureDigest = k.kernelDigest(evidence);
  const validation = {
    status: "FAILED",
    identity: {
      implementation_identity: fingerprint,
      command_digest: digest("commands"),
      environment_digest: digest("environment"),
    },
    evidence_digests: [failureDigest],
  };
  const record = {
    digest: digest("record"),
    aggregate: {
      id: taskId,
      revision: 12,
      state: "FINAL_VALIDATION",
      current_plan: { state: "APPROVED", revision: 1, digest: planDigest },
      final_validation: validation,
      final_timing_exception: null,
    },
  };
  const report = {
    schema_version: 1,
    kind: "user_attested_final_timing_outcome",
    task_id: taskId,
    plan_digest: planDigest,
    failure_evidence_digest: failureDigest,
    failed_check_id: commandText,
    implementation_identity: fingerprint,
    command_digest: validation.identity.command_digest,
    budget_ms: 1_440_000,
    duration_ms: 1_463_240,
    functional: { total: 5239, passed: 5236, failed: 0, skipped: 3, incomplete: 0 },
    required_hosted_checks: ["unit", "lint"],
  };
  const adapter = {
    read: vi.fn().mockResolvedValue({ kind: "canonical", record }),
    execute: vi.fn().mockResolvedValue({ kind: "committed" }),
  };
  mocks.runtime.mockResolvedValue({
    adapter,
    native: {
      readContext: vi.fn().mockResolvedValue({
        repository_fingerprint: fingerprint,
        occurred_at: "2026-10-24T00:00:00.000Z",
        approval_receipts: { trusted_issuers: trustedIssuers },
      }),
    },
    observe: vi.fn().mockResolvedValue({ fingerprint }),
    input: vi.fn().mockResolvedValue({ command: { expected_task_revision: 12 }, actor: {} }),
  });
  mocks.retained.mockResolvedValue(evidence);
  mocks.repositoryEvidence.mockResolvedValue([{ implementation_commit: head }]);
  mocks.changeRequest.mockResolvedValue({
    state: "found",
    pr: {
      provider: "gitlab",
      status: "MERGED",
      headSha: head,
      headRef: branch,
      prNumber: 42,
    },
  });
  mocks.hostedChecks.mockResolvedValue({
    checked: true,
    total: 2,
    pending: 0,
    failing: 0,
    passing: 2,
    missingRequired: [],
    rows: [
      { name: "unit", state: "SUCCESS" },
      { name: "lint", state: "SUCCESS" },
    ],
  });
  const options = {
    task_id: taskId,
    state_digest: record.digest,
    failure_evidence_digest: failureDigest,
    failed_command: commandText,
    max_overage_ms: 30_000,
    change_number: 42,
    branch,
    head_sha: head,
    outcome_report: Buffer.from(JSON.stringify(report)).toString("base64url"),
  };
  return { adapter, options };
}

describe("signed canonical final timing exception", () => {
  beforeEach(() => vi.clearAllMocks());

  it("prints the exact approval request without mutating when no receipt is supplied", async () => {
    const { adapter, options } = setup();
    const result = await acceptKernelFinalTimingException(
      { resolvedProject: { gitRoot: "/repo" } } as never,
      options,
    );
    expect(result).toMatchObject({
      approval_request: {
        approvalType: "final_timing_exception",
        taskId,
        operationId: "task.final-validation.accept-timing",
      },
    });
    expect(result).toHaveProperty(
      "approval_request_digest",
      k.kernelDigest(result.approval_request),
    );
    expect(mocks.hostedChecks).toHaveBeenCalledWith(
      expect.objectContaining({ requiredChecks: ["unit", "lint"] }),
    );
    expect(mocks.verifyReceipt).not.toHaveBeenCalled();
    expect(adapter.execute).not.toHaveBeenCalled();
    expect(mocks.writeArtifact).not.toHaveBeenCalled();
  });

  it("requires exact read-only request and explicit USER reason for the default manual route", async () => {
    const { adapter, options } = setup();
    const context = { resolvedProject: { gitRoot: "/repo" } } as never;
    const preview = await acceptKernelFinalTimingException(context, options);
    await expect(
      acceptKernelFinalTimingException(context, {
        ...options,
        by: "USER",
        note: "Accept measured 23.240 second overage",
        approval_request_digest: digest("wrong"),
      }),
    ).rejects.toThrow("exact request digest");
    expect(adapter.execute).not.toHaveBeenCalled();
    const result = await acceptKernelFinalTimingException(context, {
      ...options,
      by: "USER",
      note: "Accept measured 23.240 second overage",
      approval_request_digest: preview.approval_request_digest,
    });
    expect(result).toMatchObject({
      exception: {
        approval_mode: "manual_operator",
        approval_actor_id: "USER",
        hosted_required_checks: ["unit", "lint"],
      },
    });
    expect(adapter.execute.mock.calls[0]?.[0]).toMatchObject({ actor: { id: "USER" } });
    expect(mocks.verifyReceipt).not.toHaveBeenCalled();
    expect(mocks.writeArtifact.mock.calls[0]?.[2]).toMatchObject({
      manual_operator_decision: { note: "Accept measured 23.240 second overage" },
    });
  });

  it("requires a signed receipt when a trusted issuer is configured", async () => {
    const { adapter, options } = setup([{}]);
    const context = { resolvedProject: { gitRoot: "/repo" } } as never;
    const preview = await acceptKernelFinalTimingException(context, options);
    await expect(
      acceptKernelFinalTimingException(context, {
        ...options,
        by: "USER",
        note: "Accept bounded overage",
        approval_request_digest: preview.approval_request_digest,
      }),
    ).rejects.toThrow("requires a signed USER receipt");
    expect(adapter.execute).not.toHaveBeenCalled();
  });

  it("rejects an invalid receipt and persists only a verified USER actor", async () => {
    const { adapter, options } = setup();
    mocks.verifyReceipt.mockImplementationOnce(() => {
      throw new Error("signature is invalid");
    });
    await expect(
      acceptKernelFinalTimingException({ resolvedProject: { gitRoot: "/repo" } } as never, {
        ...options,
        approval_receipt: "forged",
      }),
    ).rejects.toThrow("signature is invalid");
    expect(adapter.execute).not.toHaveBeenCalled();
    mocks.verifyReceipt.mockReturnValue({
      actor: "USER:owner@trusted-issuer",
      digest: digest("signed-receipt"),
    });
    await acceptKernelFinalTimingException({ resolvedProject: { gitRoot: "/repo" } } as never, {
      ...options,
      approval_receipt: "signed",
    });
    expect(adapter.execute.mock.calls[0]?.[0]).toMatchObject({
      actor: { kind: "USER", id: "USER:owner@trusted-issuer" },
    });
  });
});
