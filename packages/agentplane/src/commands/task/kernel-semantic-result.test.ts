import { describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

import { continueKernelSemanticStopAuthority } from "./kernel-semantic-result.js";

const digest = (value: string) => k.kernelDigest(value);

function fixture(changedPaths: string[]) {
  const repositoryBefore = digest("repository-before");
  const planDigest = digest("plan");
  const contractDigest = digest("contract");
  const binding = {
    task_id: "task-1",
    plan_revision: 2,
    plan_digest: planDigest,
    work_item_id: "build",
    contract_digest: contractDigest,
    attempt: 3,
    claim_id: "claim-3",
    repository_fingerprint: repositoryBefore,
  };
  const parent = { repository_fingerprint: repositoryBefore };
  const record = {
    aggregate: {
      current_plan: { state: "APPROVED", revision: 2, digest: planDigest },
      authority_lineage: [{ authority: parent }],
      work_items: {
        build: {
          state: "EXECUTING",
          attempt: 3,
          claim_id: "claim-3",
          definition: {
            contract_digest: contractDigest,
            execution_requirements: { scope_roots: ["src"] },
          },
        },
      },
    },
  };
  const continuation = vi.fn().mockResolvedValue({
    kind: "repository_implementation",
    changed_paths: changedPaths,
  });
  const continueAuthority = vi.fn().mockResolvedValue({ kind: "committed" });
  const runtime = {
    adapter: { read: vi.fn().mockResolvedValue({ kind: "canonical", record }) },
    lifecycle: { resultFingerprintMatches: vi.fn().mockReturnValue(true) },
    observe: vi.fn().mockResolvedValue({ fingerprint: digest("repository-after") }),
    native: { observeContinuation: continuation },
    authority: { continue: continueAuthority },
  };
  return { binding, continuation, continueAuthority, parent, runtime };
}

describe("canonical semantic result recovery", () => {
  it("continues in-scope repository authority before blocking an implementation episode", async () => {
    const f = fixture(["src/feature.ts"]);

    await continueKernelSemanticStopAuthority({
      runtime: f.runtime as never,
      task_id: "task-1",
      binding: f.binding as never,
    });

    expect(f.continuation).toHaveBeenCalledWith("task-1", f.parent);
    expect(f.continueAuthority).toHaveBeenCalledWith("task-1");
  });

  it("rejects an out-of-scope repository continuation before blocking", async () => {
    const f = fixture(["docs/outside.md"]);

    await expect(
      continueKernelSemanticStopAuthority({
        runtime: f.runtime as never,
        task_id: "task-1",
        binding: f.binding as never,
      }),
    ).rejects.toThrow("outside its WorkItem scope");
    expect(f.continueAuthority).not.toHaveBeenCalled();
  });
});
