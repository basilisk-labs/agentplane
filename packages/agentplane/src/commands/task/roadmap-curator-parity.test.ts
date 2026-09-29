import path from "node:path";

import {
  buildAgentSemanticResultV2ValidFixtures,
  buildAgentWorkOrderV2ValidFixture,
  validateAgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import { kernelPlanProposalSchema, taskKernel as k } from "@agentplaneorg/core/tasks";
import { describe, expect, it, vi } from "vitest";

import { semanticRole } from "../../runner/usecases/semantic-role.js";
import { admitSemanticResult } from "../shared/semantic-result-admission.js";
import { continueKernelSemanticStopAuthority } from "./kernel-semantic-result.js";
import { buildKernelAgentWorkOrder, resumeKernelWorkOrder } from "./kernel-work-order.js";

const digest = (value: string) => k.kernelDigest(value);

function curatorFixture() {
  const contract = {
    objective: "Prepare bounded repository context.",
    acceptance_criteria: ["Write only the granted context output."],
    verification_commands: [],
    role: "CURATOR" as const,
  };
  const contractDigest = digest(contract);
  const planDigest = digest("curator-plan");
  const repositoryFingerprint = digest("repository-before-curation");
  const authority = {
    digest: digest("curator-authority"),
    scope_roots: ["context/wiki"],
    expires_at: null,
  };
  const record = {
    digest: digest("curator-record"),
    aggregate: {
      id: "task-curator",
      revision: 7,
      intent_digest: digest("intent"),
      current_plan: { revision: 1, digest: planDigest, state: "APPROVED" },
      authority_lineage: [{ authority }],
      work_items: {
        curate: {
          state: "EXECUTING",
          attempt: 1,
          claim_id: "claim-curator-1",
          definition: {
            id: "curate",
            depends_on: [],
            required_inputs: [],
            expected_outputs: ["prepared-context"],
            optional: false,
            contract_digest: contractDigest,
            execution_requirements: {
              scope_roots: ["context/wiki"],
              repository_effects: ["source_code"],
              external_effects: [],
              capabilities: ["repository_write"],
              resources: [],
            },
          },
          output_manifests: [],
        },
      },
    },
    documents: {
      intent: { objective: "Prepare context.", context: "Use the bounded task sources." },
      contracts: Object.fromEntries([[contractDigest, contract]]),
    },
  };
  const implementation = resumeKernelWorkOrder({
    record: record as never,
    work_item_id: "curate",
    authority: authority as never,
    repository_fingerprint: repositoryFingerprint,
  });
  if (!implementation) throw new Error("CURATOR fixture did not produce a WorkOrder");
  return { authority, contract, implementation, planDigest, record, repositoryFingerprint };
}

describe("LC-06 CURATOR parity", () => {
  it("issues CURATOR through the canonical Kernel contract with bounded context authority", async () => {
    const fixture = curatorFixture();
    expect(
      kernelPlanProposalSchema.parse({
        work_items: [
          {
            id: "curate",
            depends_on: [],
            required_inputs: [],
            expected_outputs: ["prepared-context"],
            execution_requirements: {
              scope_roots: ["context/wiki"],
              repository_effects: ["source_code"],
              external_effects: [],
              capabilities: ["repository_write"],
              resources: [],
            },
            optional: false,
            contract: fixture.contract,
          },
        ],
      }).work_items[0]?.contract.role,
    ).toBe("CURATOR");

    const root = process.cwd();
    const order = await buildKernelAgentWorkOrder({
      command: {
        backendId: "local",
        resolvedProject: { gitRoot: root },
        config: {
          paths: { workflow_dir: ".agentplane/tasks", tasks_path: ".agentplane/tasks.json" },
        },
      } as never,
      record: fixture.record as never,
      context: {
        repository_identity: digest("repository-identity"),
        repository_fingerprint: fixture.repositoryFingerprint,
        ceiling: {
          policy_digests: [],
          capabilities: ["repository_write"],
          repository_effects: ["source_code"],
          external_effects: [],
        },
      } as never,
      implementation: fixture.implementation,
    });

    expect(order).toMatchObject({
      role: "CURATOR",
      authority: {
        mutation_scope: "context",
        writable_roots: [path.join(root, "context/wiki")],
        external_side_effects: [],
      },
    });
    const result = {
      ...buildAgentSemanticResultV2ValidFixtures(order.work_order_id).completed,
      canonical_binding: order.canonical_binding,
      canonical_outputs: [
        { id: "prepared-context", kind: "knowledge_proposal", digest: digest("context") },
      ],
    };
    expect(
      admitSemanticResult({
        owner: { task_id: order.task.id, work_order_id: order.work_order_id, role: "CURATOR" },
        work_order: order,
        result,
      }).result,
    ).toMatchObject({ status: "completed", canonical_outputs: result.canonical_outputs });
  });

  it("accepts CURATOR continuation only inside the granted context scope", async () => {
    const fixture = curatorFixture();
    const continuation = vi.fn();
    const continueAuthority = vi.fn().mockResolvedValue({ kind: "committed" });
    const runtime = {
      adapter: {
        read: vi.fn().mockResolvedValue({ kind: "canonical", record: fixture.record }),
      },
      lifecycle: { resultFingerprintMatches: vi.fn().mockReturnValue(true) },
      observe: vi.fn().mockResolvedValue({ fingerprint: digest("repository-after-curation") }),
      native: { observeContinuation: continuation },
      authority: { continue: continueAuthority },
    };
    continuation.mockResolvedValueOnce({
      kind: "repository_implementation",
      changed_paths: ["context/wiki/prepared.md"],
    });
    await expect(
      continueKernelSemanticStopAuthority({
        runtime: runtime as never,
        task_id: "task-curator",
        binding: fixture.implementation.binding,
      }),
    ).resolves.toBeUndefined();

    continuation.mockResolvedValueOnce({
      kind: "repository_implementation",
      changed_paths: ["src/outside.ts"],
    });
    await expect(
      continueKernelSemanticStopAuthority({
        runtime: runtime as never,
        task_id: "task-curator",
        binding: fixture.implementation.binding,
      }),
    ).rejects.toThrow(/outside its WorkItem scope/u);
  });

  it("keeps aliases explicit and rejects required knowledge prepared for another role", () => {
    expect(semanticRole("CURATOR")).toBe("CURATOR");
    expect(semanticRole("coder")).toBe("EXECUTOR");
    expect(semanticRole("tester")).toBe("EXECUTOR");
    expect(semanticRole(undefined)).toBeUndefined();

    const order = buildAgentWorkOrderV2ValidFixture();
    const required = order.knowledge_refs[0];
    if (!required) throw new Error("Fixture requires one KnowledgeRef");
    order.role = "EXECUTOR";
    order.context_intent.required_knowledge_ref_digests = [required.digest];
    order.prepared_evidence = order.prepared_evidence.map((prepared) => ({
      ...prepared,
      role: "CURATOR",
    }));
    expect(() => validateAgentWorkOrderV2(order)).toThrow(/for the work-order role/u);
  });
});
