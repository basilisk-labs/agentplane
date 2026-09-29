import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { decideIndependentReviewApplication, taskKernel as k } from "@agentplaneorg/core/tasks";
import { afterEach, describe, expect, it, vi } from "vitest";

import { acceptKernelInspection } from "./kernel-inspection.js";

const directories: string[] = [];
const digest = (value: string) => k.kernelDigest(value);

afterEach(async () => {
  await Promise.all(directories.splice(0).map((directory) => rm(directory, { recursive: true })));
});

describe("LC-08 common independent-review application", () => {
  it("requests semantic rework only for a current independent rework verdict", () => {
    expect(
      decideIndependentReviewApplication({
        verdict: "rework",
        provenance_accepted: true,
        evidence_current: true,
      }),
    ).toMatchObject({ action: "rework", semantic_work_required: true });
    expect(
      decideIndependentReviewApplication({
        verdict: "blocked",
        provenance_accepted: true,
        evidence_current: true,
      }),
    ).toMatchObject({ action: "attention", semantic_work_required: false });
    expect(
      decideIndependentReviewApplication({
        verdict: "human_review",
        provenance_accepted: true,
        evidence_current: true,
      }),
    ).toMatchObject({ action: "attention", semantic_work_required: false });
  });

  it("never lets failed provenance or stale evidence satisfy completion", () => {
    expect(
      decideIndependentReviewApplication({
        verdict: "pass",
        provenance_accepted: false,
        evidence_current: true,
      }),
    ).toMatchObject({ action: "reject", completion_satisfied: false });
    expect(
      decideIndependentReviewApplication({
        verdict: "pass",
        provenance_accepted: true,
        evidence_current: false,
      }),
    ).toMatchObject({ action: "reject", completion_satisfied: false });
  });

  it("replays an already applied saved verdict without another mutation or model episode", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "agentplane-lc08-"));
    directories.push(directory);
    const binding = {
      phase: "inspection" as const,
      task_id: "task-lc08",
      repository_identity: digest("repository"),
      repository_fingerprint: digest("fingerprint"),
      plan_revision: 1,
      plan_digest: digest("plan"),
      work_item_id: "reviewed",
      attempt: 1,
      claim_id: digest("claim"),
      contract_digest: digest("contract"),
      authority_digest: digest("authority"),
      result_digest: digest("result"),
    };
    const semantic = {
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: digest("review-order"),
      canonical_binding: binding,
      status: "completed",
      summary: "Saved independent verdict.",
      findings: ["Current review already applied."],
      uncertainty: [],
      claimed_checks: [],
      review: {
        verdict: "pass",
        missing_tests: [],
        hidden_assumptions: [],
        residual_risks: [],
      },
    };
    const apply = vi.fn();
    const runtime = {
      adapter: {
        read: vi.fn().mockResolvedValue({
          kind: "canonical",
          record: {
            aggregate: {
              current_plan: { revision: 1, digest: binding.plan_digest },
              work_items: {
                reviewed: {
                  state: "COMPLETED",
                  result_digest: binding.result_digest,
                  attempt: 1,
                  claim_id: binding.claim_id,
                  definition: { contract_digest: binding.contract_digest },
                },
              },
            },
          },
        }),
      },
      native: {
        readContext: vi.fn().mockResolvedValue({
          repository_fingerprint: binding.repository_fingerprint,
        }),
      },
      authority: {
        resolve: vi.fn().mockResolvedValue({ authority: { digest: binding.authority_digest } }),
      },
      lifecycle: { apply },
    };

    await expect(
      acceptKernelInspection({} as never, runtime as never, directory, semantic as never),
    ).resolves.toBeUndefined();
    await expect(
      acceptKernelInspection({} as never, runtime as never, directory, semantic as never),
    ).resolves.toBeUndefined();
    expect(apply).not.toHaveBeenCalled();

    runtime.adapter.read.mockResolvedValueOnce({
      kind: "canonical",
      record: {
        aggregate: {
          current_plan: { revision: 1, digest: binding.plan_digest },
          work_items: {
            reviewed: {
              state: "COMPLETED",
              result_digest: digest("stale-result"),
              attempt: 1,
              claim_id: binding.claim_id,
              definition: { contract_digest: binding.contract_digest },
            },
          },
        },
      },
    });
    await expect(
      acceptKernelInspection({} as never, runtime as never, directory, semantic as never),
    ).rejects.toThrow(/stale/u);
    expect(apply).not.toHaveBeenCalled();
  });
});
