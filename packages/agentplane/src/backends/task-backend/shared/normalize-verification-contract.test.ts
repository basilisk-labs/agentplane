import { computeVerificationContractKernel } from "@agentplaneorg/core/tasks";
import { describe, expect, it } from "vitest";

import { normalizeVerificationContract } from "./normalize-verification-contract.js";

describe("normalize verification contract", () => {
  it("preserves the v2 digest without persisting the kernel-only kind field", () => {
    const computed = computeVerificationContractKernel({
      changedFiles: ["packages/app/src/feature.ts"],
      declaredRepositoryEffects: ["source_code"],
      declaredComponents: ["packages/app"],
      evidenceRequirements: ["task_outcome"],
      selectorKind: "targeted",
      selectorReason: "colocated_test",
      selectorExecutionMode: "fast",
      selectorBucket: "task",
      selectorLintTargets: ["packages/app/src/feature.ts"],
      selectedTestFiles: ["packages/app/src/feature.test.ts"],
    });

    const normalized = normalizeVerificationContract(computed);
    expect(normalized).not.toBeNull();
    expect(normalized).not.toHaveProperty("kind");
    expect(normalized).toMatchObject({ schema_version: 2, digest: computed.digest });
    expect(normalizeVerificationContract(normalized)).toEqual(normalized);
  });
});
