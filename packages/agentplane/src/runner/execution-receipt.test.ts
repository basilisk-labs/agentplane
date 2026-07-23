import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  EXECUTION_RECEIPT_PROVENANCE,
  EXECUTION_RECEIPT_V1_VALID_FIXTURE,
  type ExecutionReceipt,
} from "@agentplaneorg/core/schemas";
import { afterEach, describe, expect, it } from "vitest";

import { writeExecutionReceipt } from "./execution-receipt.js";

const tempRoots: string[] = [];

afterEach(async () => {
  await Promise.all(tempRoots.splice(0).map(async (root) => await rm(root, { recursive: true })));
});

describe("runner execution receipt persistence", () => {
  it("persists unverified without collapsing it into rejected", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-execution-receipt-"));
    tempRoots.push(root);
    const receipt = structuredClone(EXECUTION_RECEIPT_V1_VALID_FIXTURE) as ExecutionReceipt;
    receipt.git = {
      provenance: EXECUTION_RECEIPT_PROVENANCE,
      state: "unavailable",
      before: null,
      after: null,
      delta: null,
      excluded_paths: [],
    };
    receipt.collection = {
      provenance: EXECUTION_RECEIPT_PROVENANCE,
      status: "partial",
      errors: ["Git observation was unavailable."],
    };
    receipt.success_policy = {
      provenance: EXECUTION_RECEIPT_PROVENANCE,
      outcome: "unverified",
      reasons: ["Git observation is unavailable."],
    };

    const reference = await writeExecutionReceipt({
      receipt_path: path.join(root, "execution-receipt.json"),
      reference_path: "runs/run-1/execution-receipt.json",
      receipt,
    });

    expect(reference).toMatchObject({
      path: "runs/run-1/execution-receipt.json",
      verification_state: "unverified",
      observed_by: "agentplane",
    });
    expect(reference.sha256).toMatch(/^sha256:[0-9a-f]{64}$/u);
  });
});
