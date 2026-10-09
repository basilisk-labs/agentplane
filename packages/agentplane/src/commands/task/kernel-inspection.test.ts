import { beforeEach, describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

const mocks = vi.hoisted(() => ({
  read: vi.fn(),
  validation: vi.fn(),
  issue: vi.fn(),
}));
vi.mock("../../shared/stable-file.js", () => ({
  readStableRegularTextNoFollow: mocks.read,
}));
vi.mock("./kernel-exchange.js", () => ({
  kernelExchangeDirectory: () => Promise.resolve("/exchange/implementation"),
  issueKernelExchange: mocks.issue,
}));
vi.mock("./kernel-inspection-validation.js", async (original) => ({
  ...(await original<typeof import("./kernel-inspection-validation.js")>()),
  resolveInspectionRepositoryEvidence: () => Promise.resolve(null),
  runKernelNativeValidation: mocks.validation,
}));
vi.mock("../../runner/context/recipe-role-context.js", () => ({
  projectKernelRecipeRoleContext: () => Promise.resolve(null),
  RECIPE_ROLE_CONTEXT_LABEL: "Recipe context",
}));
vi.mock("../recipes/impl/v1-conversion.js", () => ({
  recipeV1ConversionSourceInput: () => Promise.resolve(null),
}));
vi.mock("./kernel-work-order.js", () => ({
  buildKernelStateFingerprint: () => Promise.resolve({ digest: "fixture-fingerprint" }),
}));
vi.mock("@agentplaneorg/core/schemas", async (original) => ({
  ...(await original<typeof import("@agentplaneorg/core/schemas")>()),
  // This suite isolates exchange identity. Schema contracts have separate coverage.
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA: { parse: (order: unknown) => order },
}));

import { issueKernelInspection } from "./kernel-inspection.js";

describe("evaluator exchange identity", () => {
  beforeEach(() => vi.resetAllMocks());

  it("retains immutable exchanges when native validation evidence changes", async () => {
    const implementation = { status: "completed", summary: "Implementation result" };
    const contract = {
      objective: "Inspect the implementation",
      acceptance_criteria: ["Behavior is correct"],
      verification_commands: ["bun run typecheck"],
    };
    const contractDigest = k.kernelDigest(contract);
    const record = {
      aggregate: {
        id: "202610090000-REVIEW",
        revision: 7,
        current_plan: { state: "APPROVED", revision: 1, digest: k.kernelDigest("plan") },
        work_items: {
          build: {
            state: "INSPECTING",
            claim_id: k.kernelDigest("claim"),
            attempt: 1,
            result_digest: k.kernelDigest(implementation),
            definition: { contract_digest: contractDigest },
            output_manifests: [],
          },
        },
        mutation_receipts: { [`result:${k.kernelDigest("implementation")}`]: {} },
      },
      documents: { contracts: { [contractDigest]: contract } },
    };
    const runtime = {
      authority: {
        resolve: () =>
          Promise.resolve({
            authority: { digest: k.kernelDigest("authority"), expires_at: null },
            context: {
              repository_identity: k.kernelDigest("repo"),
              repository_fingerprint: k.kernelDigest("content"),
              actor: { transport: "host" },
            },
          }),
      },
    };
    mocks.read.mockResolvedValue(JSON.stringify(implementation));
    const evidence = (environment: string) => ({
      input: { environment },
      input_digest: k.kernelDigest(environment),
      checks: { status: "passed", checks: [], reason: null },
    });
    const observed = (environment: string) => ({
      kind: "observed",
      path: `/exchange/implementation/native-validation-${environment}.json`,
      evidence: evidence(environment),
    });
    mocks.validation
      .mockResolvedValueOnce(observed("first"))
      .mockResolvedValueOnce(observed("first"))
      .mockResolvedValueOnce(observed("second"));
    const retained = new Map<string, AgentWorkOrderV2>();
    mocks.issue.mockImplementation((_command, order: AgentWorkOrderV2) => {
      const prior = retained.get(order.work_order_id);
      if (prior) expect(order).toEqual(prior);
      else retained.set(order.work_order_id, structuredClone(order));
      return order;
    });
    const issue = () =>
      issueKernelInspection(
        { resolvedProject: { gitRoot: "/repo" } } as never,
        runtime as never,
        record as never,
        "build",
      );
    const first = (await issue()) as AgentWorkOrderV2;
    expect(await issue()).toEqual(first);
    const second = (await issue()) as AgentWorkOrderV2;
    expect(second.work_order_id).not.toBe(first.work_order_id);
    expect(second.canonical_binding).toEqual(first.canonical_binding);
    expect(second.required_inputs.find((input) => input.id === "native-validation")?.digest).toBe(
      k.kernelDigest(evidence("second")),
    );
    expect(retained.size).toBe(2);
    expect(retained.get(first.work_order_id)).toEqual(first);
  });
});
