import type * as StableFileModule from "../../shared/stable-file.js";
import type * as TaskBackendModule from "../shared/task-backend.js";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  AGENT_WORK_ORDER_V2_VALID_FIXTURE,
  AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
} from "@agentplaneorg/core/schemas";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { CommandContext } from "../shared/task-backend.js";

const files = vi.hoisted(() => new Map<string, string>());
vi.mock("../../shared/stable-file.js", async (original) => ({
  ...(await original<typeof StableFileModule>()),
  readStableRegularTextNoFollow: (file: string) => {
    const value = files.get(file);
    if (value === undefined)
      throw Object.assign(new Error(`Missing fixture ${file}`), { code: "ENOENT" });
    return Promise.resolve(value);
  },
}));
vi.mock("../shared/task-backend.js", async (original) => ({
  ...(await original<typeof TaskBackendModule>()),
  resolveCommandGitCommonDir: () => Promise.resolve("/repo/.git"),
}));
import { listKernelRepositoryEvidence } from "./kernel-repository-coordinator.js";

function fixture(repository: boolean) {
  const taskId = "202610100000-CURRENT";
  const implementationId = k.kernelDigest("historical implementation");
  const reviewId = k.kernelDigest("current inspection");
  const resultDigest = k.kernelDigest("current accepted result");
  const binding = {
    task_id: taskId,
    repository_identity: k.kernelDigest("repo"),
    repository_fingerprint: k.kernelDigest("current head"),
    plan_revision: 1,
    plan_digest: k.kernelDigest("original plan"),
    phase: "inspection" as const,
    work_item_id: "build",
    attempt: 2,
    claim_id: "claim-2",
    contract_digest: k.kernelDigest("contract"),
    result_digest: resultDigest,
    authority_digest: k.kernelDigest("authority"),
  };
  const contents = {
    schema_version: 1,
    kind: "canonical_repository_evidence",
    task_id: taskId,
    work_item_id: "build",
    task_revision: 5,
    work_order_id: implementationId,
    checkout: "/repo",
    branch: "task/current",
    base_commit: "a".repeat(40),
    implementation_commit: "b".repeat(40),
    implementation_tree: "c".repeat(40),
    changed_paths: ["source.ts"],
    evaluator_target: "b".repeat(40),
    implementation_evidence: {},
  };
  const candidate = { ...contents, digest: k.kernelDigest(contents) };
  const nativeInput = {
    task_id: taskId,
    work_item_id: "build",
    result_digest: resultDigest,
    repository_fingerprint: binding.repository_fingerprint,
    repository_evidence_digest: repository ? candidate.digest : null,
  };
  const native = {
    input: nativeInput,
    input_digest: k.kernelDigest(nativeInput),
    checks: { status: "passed" },
    repository_evidence: repository ? candidate : null,
  };
  const root = path.join("/repo/.git", "agentplane", "kernel", "exchanges", taskId);
  const nativePath = path.join(
    root,
    k.kernelDigest("current implementation").slice(7),
    `native-validation-${k.kernelDigest(nativeInput).slice(7)}.json`,
  );
  const review = {
    ...AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
    work_order_id: reviewId,
    canonical_binding: binding,
    review: { verdict: "pass", missing_tests: [], hidden_assumptions: [], residual_risks: [] },
  };
  const order = {
    ...structuredClone(AGENT_WORK_ORDER_V2_VALID_FIXTURE),
    work_order_id: reviewId,
    role: "EVALUATOR",
    authority: {
      ...AGENT_WORK_ORDER_V2_VALID_FIXTURE.authority,
      mutation_scope: "none",
      writable_roots: [],
    },
    state_fingerprint: { ...AGENT_WORK_ORDER_V2_VALID_FIXTURE.state_fingerprint, task_id: taskId },
    canonical_binding: binding,
    task: { ...AGENT_WORK_ORDER_V2_VALID_FIXTURE.task, id: taskId, work_item_id: "build" },
    context_intent: {
      purpose: "Inspect current evidence",
      required_knowledge_ref_digests: [],
      require_prepared_evidence: false,
    },
    knowledge_refs: [],
    prepared_evidence: [],
    required_inputs: [
      {
        id: "native-validation",
        kind: "source_artifact",
        description: "Current native validation",
        path: nativePath,
        digest: k.kernelDigest(native),
        required: true,
      },
    ],
  };
  const { digest: _fingerprintDigest, ...fingerprintContents } = order.state_fingerprint;
  order.state_fingerprint.digest = k.kernelDigest(fingerprintContents);
  const directory = path.join(root, reviewId.slice(7));
  files.set(path.join(directory, "inspection-result.json"), JSON.stringify(review));
  files.set(path.join(directory, "work-order.json"), JSON.stringify(order));
  files.set(nativePath, JSON.stringify(native));
  const repositoryPath = path.join(root, implementationId.slice(7), "repository-evidence.json");
  files.set(repositoryPath, JSON.stringify(candidate));
  const record = {
    aggregate: {
      id: taskId,
      current_plan: { revision: 2, digest: k.kernelDigest("later refinement") },
      mutation_receipts: { [`result:${implementationId}`]: {}, [`validation:${reviewId}`]: {} },
      work_items: {
        build: {
          definition: { id: "build", contract_digest: binding.contract_digest },
          state: "COMPLETED",
          attempt: 2,
          claim_id: "claim-2",
          result_digest: resultDigest,
          validation: {
            status: "PASSED",
            identity: { implementation_identity: resultDigest },
            evidence_digests: [k.kernelDigest(native), k.kernelDigest(review)],
          },
        },
      },
    },
  } as unknown as KernelRecord;
  return { record, candidate, nativePath, repositoryPath, directory };
}
const command = {} as CommandContext;
beforeEach(() => files.clear());
describe("accepted implementation repository evidence", () => {
  it("does not resurrect an old commit when current accepted native evidence is null", async () => {
    const f = fixture(false);
    const retained = files.get(f.repositoryPath);
    expect(await listKernelRepositoryEvidence(command, f.record)).toEqual([]);
    expect(files.get(f.repositoryPath)).toBe(retained);
  });
  it("retains explicitly validated same-HEAD provenance across a later plan refinement", async () => {
    const f = fixture(true);
    expect(await listKernelRepositoryEvidence(command, f.record)).toEqual([f.candidate]);
  });
  it("never substitutes an old passing receipt for the current failed validation", async () => {
    const f = fixture(true);
    f.record.aggregate.work_items.build!.validation!.status = "FAILED";
    expect(await listKernelRepositoryEvidence(command, f.record)).toEqual([]);
  });
  it("skips native-check-only receipts but rejects malformed retained inspections", async () => {
    const f = fixture(false);
    const prior = k.kernelDigest("failed native checks");
    Object.assign(f.record.aggregate.mutation_receipts, { [`validation:${prior}`]: {} });
    expect(await listKernelRepositoryEvidence(command, f.record)).toEqual([]);
    const priorPath = path.join(
      path.dirname(f.directory),
      prior.slice(7),
      "inspection-result.json",
    );
    files.set(priorPath, "not-json");
    await expect(listKernelRepositoryEvidence(command, f.record)).rejects.toThrow();
  });
  it.each(["native", "repository", "work-order"])("rejects tampered %s evidence", async (kind) => {
    const f = fixture(true);
    const file =
      kind === "native"
        ? f.nativePath
        : kind === "repository"
          ? f.repositoryPath
          : path.join(f.directory, "work-order.json");
    const value = JSON.parse(files.get(file)!) as {
      repository_evidence: { implementation_commit: string };
      evaluator_target: string;
      canonical_binding: { result_digest: string };
    };
    if (kind === "native") value.repository_evidence.implementation_commit = "d".repeat(40);
    else if (kind === "repository") value.evaluator_target = "d".repeat(40);
    else value.canonical_binding.result_digest = k.kernelDigest("other result");
    files.set(file, JSON.stringify(value));
    await expect(listKernelRepositoryEvidence(command, f.record)).rejects.toThrow();
  });
});
