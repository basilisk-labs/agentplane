import type * as KernelExchangeModule from "./kernel-exchange.js";
import type * as StableFileModule from "../../shared/stable-file.js";
import type * as TaskBackendModule from "../shared/task-backend.js";
import path from "node:path";
import os from "node:os";
import { mkdtemp, rm } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { taskRecordToData } from "../../backends/task-backend/shared/record.js";
import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import { validationRecord } from "./kernel-inspection-validation.js";
import { recoverKernelOperationalProjection } from "./kernel-operational-projection-recovery.js";
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
vi.mock("./kernel-exchange.js", async (original) => ({
  ...(await original<typeof KernelExchangeModule>()),
  writeKernelArtifact: (directory: string, name: string, value: unknown) => {
    files.set(path.join(directory, name), JSON.stringify(value));
    return Promise.resolve();
  },
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
  return { record, candidate, nativePath, repositoryPath, directory, binding, review, order };
}
const command = {} as CommandContext;
beforeEach(() => files.clear());
describe("accepted implementation repository evidence", () => {
  it("restores whitespace findings once and then lets final-validation recovery progress", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "projection-readback-"));
    const git = (args: string[]) => promisify(execFile)("git", args, { cwd: root });
    try {
      await git(["init", "-q", "-b", "main"]);
      await git([
        "-c",
        "user.name=Fixture",
        "-c",
        "user.email=fixture@example.invalid",
        "-c",
        "core.hooksPath=/dev/null",
        "commit",
        "-q",
        "--allow-empty",
        "-m",
        "Fixture implementation",
      ]);
      const headResult = await git(["rev-parse", "HEAD"]);
      const head = headResult.stdout.trim();
      const f = fixture(true);
      Object.assign(f.candidate, {
        checkout: root,
        implementation_commit: head,
        evaluator_target: head,
      });
      const { digest: _oldRepositoryDigest, ...repositoryContents } = f.candidate;
      f.candidate.digest = k.kernelDigest(repositoryContents);
      files.set(f.repositoryPath, JSON.stringify(f.candidate));
      const { result_digest: _oldResult, ...implementationBinding } = f.binding;
      const implementation = {
        ...AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
        work_order_id: f.candidate.work_order_id,
        canonical_binding: { ...implementationBinding, phase: "implementation" },
        canonical_outputs: [
          { id: "source-report", kind: "report", digest: k.kernelDigest("source report") },
        ],
      };
      f.binding.result_digest = k.kernelDigest(implementation);
      f.review.canonical_binding = f.binding;
      f.review.findings = ["Preserve this accepted finding.\n", " \tSecond accepted finding.\r\n"];
      const originalReview = JSON.stringify(f.review);
      const originalReviewDigest = k.kernelDigest(f.review);
      const implementationDirectory = path.dirname(f.repositoryPath);
      const native = {
        input: {
          task_id: f.binding.task_id,
          work_item_id: "build",
          result_digest: f.binding.result_digest,
          repository_fingerprint: f.binding.repository_fingerprint,
          repository_evidence_digest: f.candidate.digest,
          verification: { runtimes: [] },
        },
        input_digest: "",
        checks: { status: "passed", checks: [] },
        repository_evidence: f.candidate,
      };
      native.input_digest = k.kernelDigest(native.input);
      const nativePath = path.join(
        implementationDirectory,
        `native-validation-${native.input_digest.slice(7)}.json`,
      );
      f.order.required_inputs = [
        {
          id: "implementation-result",
          kind: "source_artifact",
          description: "Accepted implementation",
          path: path.join(implementationDirectory, "received-result.json"),
          digest: f.binding.result_digest,
          required: true,
        },
        {
          id: "native-validation",
          kind: "source_artifact",
          description: "Current native checks",
          path: nativePath,
          digest: k.kernelDigest(native),
          required: true,
        },
      ];
      const observedAt = "2026-10-10T00:00:00.000Z";
      const validation = validationRecord({
        binding: f.binding,
        contractCommands: [],
        native: native as never,
        reviewDigest: originalReviewDigest,
        status: "PASSED",
        observedAt,
      });
      Object.assign(f.record.aggregate, {
        state: "ACTIVE",
        revision: 6,
        current_plan: { revision: f.binding.plan_revision, digest: f.binding.plan_digest },
      });
      Object.assign(f.record.aggregate.work_items.build!, {
        result_digest: f.binding.result_digest,
        validation,
      });
      Object.assign(f.record, {
        documents: {
          contracts: { [String(f.binding.contract_digest)]: { verification_commands: [] } },
        },
      });
      files.set(
        path.join(implementationDirectory, "received-result.json"),
        JSON.stringify(implementation),
      );
      files.set(nativePath, JSON.stringify(native));
      files.set(path.join(f.directory, "work-order.json"), JSON.stringify(f.order));
      files.set(path.join(f.directory, "inspection-result.json"), originalReview);
      files.set(
        path.join(f.directory, "validation.json"),
        JSON.stringify({
          status: "PASSED",
          task_id: f.binding.task_id,
          work_item_id: "build",
          attempt: f.binding.attempt,
          contract_digest: f.binding.contract_digest,
          repository_fingerprint: f.binding.repository_fingerprint,
          result_digest: f.binding.result_digest,
          review_digest: originalReviewDigest,
          native_evidence_digest: k.kernelDigest(native),
          repository_evidence: f.candidate,
          checks: native.checks,
        }),
      );
      const readTask = (frontmatter: unknown) =>
        taskRecordToData({ id: f.binding.task_id, frontmatter, body: "" } as never);
      let task = readTask({
        id: f.binding.task_id,
        revision: 6,
        status: "DOING",
        execution_route: {
          schema_version: 1,
          repository_mode: "branch_pr",
          selected_mode: "branch_pr",
          requested_mode: "branch_pr",
          frozen: true,
          reason_codes: ["repository_branch_pr_floor"],
        },
        extensions: { [TASK_KERNEL_EXTENSION]: f.record },
      });
      const writeTask = vi.fn((written: unknown) => {
        task = readTask(written);
        return Promise.resolve();
      });
      const context = {
        resolvedProject: { gitRoot: root },
        config: { paths: { workflow_dir: ".agentplane/tasks" } },
        taskBackend: { getTask: () => Promise.resolve(task), writeTask },
      } as unknown as CommandContext;
      const originalRecord = k.kernelDigest(f.record);
      expect(
        await recoverKernelOperationalProjection(
          context,
          f.record,
          task,
          "kernel_final_validation_required",
        ),
      ).toEqual({ kind: "restored" });
      expect(writeTask).toHaveBeenCalledOnce();
      const rawProjection = task.extensions!["agentplane.kernel_operational_projection"] as {
        findings: string[];
        review_identity_digest: string;
      };
      const projectionDigest = k.kernelDigest(rawProjection);
      expect(rawProjection.findings).toEqual(f.review.findings);
      expect(task.quality_review?.findings).toEqual(f.review.findings.map((value) => value.trim()));
      expect(rawProjection.review_identity_digest).toBe(originalReviewDigest);
      expect(
        await recoverKernelOperationalProjection(
          context,
          f.record,
          task,
          "kernel_final_validation_required",
        ),
      ).toEqual({ kind: "unchanged" });
      expect(writeTask).toHaveBeenCalledOnce();
      for (const [field, badValue] of [
        ["work_order_id", undefined],
        ["evidence_refs", ["evidence", 42]],
      ] as const) {
        const malformed = structuredClone(
          task.extensions!["agentplane.kernel_operational_projection"],
        ) as Record<string, unknown>;
        if (badValue === undefined) delete malformed[field];
        else malformed[field] = badValue;
        delete malformed.digest;
        malformed.digest = k.kernelDigest(malformed);
        task.extensions!["agentplane.kernel_operational_projection"] = malformed;
        const writesBefore = writeTask.mock.calls.length;
        expect(
          await recoverKernelOperationalProjection(
            context,
            f.record,
            task,
            "kernel_final_validation_required",
          ),
        ).toEqual({ kind: "restored" });
        expect(writeTask).toHaveBeenCalledTimes(writesBefore + 1);
        expect(
          await recoverKernelOperationalProjection(
            context,
            f.record,
            task,
            "kernel_final_validation_required",
          ),
        ).toEqual({ kind: "unchanged" });
      }
      expect(k.kernelDigest(task.extensions!["agentplane.kernel_operational_projection"])).toBe(
        projectionDigest,
      );
      expect(files.get(path.join(f.directory, "inspection-result.json"))).toBe(originalReview);
      expect(k.kernelDigest(f.record)).toBe(originalRecord);
      const qualityReport = JSON.parse(
        files.get(path.join(f.directory, "quality-report.json"))!,
      ) as { findings: string[] };
      expect(qualityReport.findings).toEqual(f.review.findings);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
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
