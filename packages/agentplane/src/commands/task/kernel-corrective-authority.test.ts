import { beforeEach, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { CommandContext } from "../shared/task-backend.js";

const mocks = vi.hoisted(() => ({
  runtime: vi.fn(),
  read: vi.fn(),
  context: vi.fn(),
  plan: vi.fn(),
  file: vi.fn(),
}));
vi.mock("./kernel-runtime-context.js", () => ({ createKernelRuntime: mocks.runtime }));
vi.mock("./kernel-plan.js", () => ({ setCanonicalPlan: mocks.plan }));
vi.mock("node:fs/promises", () => ({ readFile: mocks.file }));
import { tryApplyBoundedFinalCorrection } from "./kernel-corrective-authority.js";

const command = {} as CommandContext;
const stop = {
  reason: "canonical_final_checks_failed",
  recovery: { corrective_plan: "/retained/proposal.json" },
} as Parameters<typeof tryApplyBoundedFinalCorrection>[2];
const policy = ["policy-v1"];

beforeEach(() => {
  vi.resetAllMocks();
  mocks.runtime.mockResolvedValue({
    adapter: { read: mocks.read },
    native: { readContext: mocks.context },
  });
  mocks.context.mockResolvedValue({
    occurred_at: "2026-10-10T10:00:00Z",
    ceiling: { policy_digests: policy },
  });
  mocks.read.mockResolvedValue({
    kind: "canonical",
    task: {},
    record: {
      aggregate: {
        current_plan: { digest: "plan" },
        corrective_authority: [
          {
            digest: "grant",
            revoked_at: null,
            uses: [],
            max_attempts: 2,
            issued_at: "2026-10-10T09:00:00Z",
            expires_at: "2026-10-10T11:00:00Z",
            initial_plan_digest: "plan",
            verification_contract_digest: k.kernelDigest(null),
            policy_digest: k.kernelDigest(policy),
          },
        ],
      },
    },
  });
  mocks.file.mockResolvedValue(
    JSON.stringify({
      work_items: [
        {
          id: "correction",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["evidence"],
          optional: false,
          execution_requirements: {
            scope_roots: ["src"],
            repository_effects: [],
            external_effects: [],
            capabilities: [],
            resources: [],
          },
          contract: {
            objective: "Correct source",
            acceptance_criteria: ["Check passes"],
            verification_commands: ["node test.js"],
            role: "EXECUTOR",
          },
        },
      ],
    }),
  );
});

it("keeps the original operator boundary when policy changed before admission", async () => {
  mocks.context.mockResolvedValue({
    occurred_at: "2026-10-10T10:00:00Z",
    ceiling: { policy_digests: ["policy-v2"] },
  });
  expect(await tryApplyBoundedFinalCorrection(command, "TASK", stop)).toBe(false);
  expect(mocks.plan).not.toHaveBeenCalled();
  expect(mocks.file).not.toHaveBeenCalled();
});

it("keeps the operator boundary for a concurrently inapplicable grant", async () => {
  mocks.plan.mockRejectedValue(
    Object.assign(new Error("Grant changed"), {
      result: {
        kind: "rejected",
        code: "AUTHORITY_SCOPE_EXCEEDED",
        facts: ["corrective_grant_not_applicable"],
      },
    }),
  );
  expect(await tryApplyBoundedFinalCorrection(command, "TASK", stop)).toBe(false);
  expect(mocks.plan).toHaveBeenCalledOnce();
});

it("does not hide unexpected admission failures", async () => {
  const error = new Error("Storage unavailable");
  mocks.plan.mockRejectedValue(error);
  await expect(tryApplyBoundedFinalCorrection(command, "TASK", stop)).rejects.toBe(error);
});
