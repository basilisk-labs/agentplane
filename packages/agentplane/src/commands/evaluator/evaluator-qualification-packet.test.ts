import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { canonicalizeJson } from "@agentplaneorg/core/tasks";
import { mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { setTaskFieldsIntent } from "../shared/task-store.js";
import {
  assertQualificationEvidenceLineage,
  isQualificationTask,
} from "../task/qualification-packet.js";
import { resolveQualificationDependencyLeaves } from "../task/qualification-packet-dependencies.js";
import { readQualificationRf04CandidateMeasurement } from "../task/qualification-packet-rf04.js";
import { cmdVerifyParsed } from "../task/verify-record.js";

import {
  addTask,
  commitPath,
  execFileAsync,
  prepareTypedReview,
} from "./evaluator-test-helpers.js";

const CANDIDATE_EVIDENCE_PATH = "scripts/baselines/agent-efficiency-v0.7-beta1-candidate.json";

function canonicalSha256(value: unknown): `sha256:${string}` {
  return `sha256:${createHash("sha256")
    .update(JSON.stringify(canonicalizeJson(value)))
    .digest("hex")}`;
}

function candidateEvidenceDocument(opts?: {
  candidateRuntimeVersion?: string;
  candidateSubjectSha?: string;
}) {
  const baselineRuntimeVersion = "0.6.24/codex-0.146.0-alpha.3.1";
  const candidateRuntimeVersion = opts?.candidateRuntimeVersion ?? baselineRuntimeVersion;
  const profile = (runtimeVersion: string) => ({
    adapter_id: "codex-exec-jsonl-supervisor",
    cache_mode: "ephemeral-provider-default",
    model_id: "gpt-5.6-terra",
    provider_id: "openai-chatgpt",
    reasoning_effort: "low",
    runtime_id: "agentplane-anchor-cli-preparation/codex-cli-execution",
    runtime_version: runtimeVersion,
    sandbox_mode: "workspace-write-network-disabled",
  });
  const measurement = {
    schema_version: 1,
    kind: "agent_efficiency_candidate_measurement_v1",
    baseline: {
      source: "runtime_bridge",
      subject_sha: "a".repeat(40),
      runtime_profile: profile(baselineRuntimeVersion),
    },
    candidate: {
      subject_sha: opts?.candidateSubjectSha ?? "b".repeat(40),
      runtime_profile: profile(candidateRuntimeVersion),
      coverage: { replay_runs: 50, scenarios: 10 },
      actual_values: { provider_episodes: 55 },
    },
    runtime_comparison: {
      baseline: baselineRuntimeVersion,
      candidate: candidateRuntimeVersion,
      profile_match: true,
    },
    comparisons: [
      { id: "runtime.profile", verdict: "pass" },
      { id: "latency.harness_setup_latency_ms.mean_ms", verdict: "fail" },
    ],
    failure_ids: ["latency.harness_setup_latency_ms.mean_ms"],
    verdict: "fail",
  };
  return {
    schema_version: 1,
    kind: "agentplane.rf04.qualification_candidate_evidence",
    source: {
      task_id: "202607292104-W03KZ0",
      task_artifact_commit: "c".repeat(40),
      measurement_source_sha256: `sha256:${"d".repeat(64)}`,
      measurement_canonical_sha256: canonicalSha256(measurement),
    },
    measurement,
  };
}

async function writeCandidateEvidence(root: string, document = candidateEvidenceDocument()) {
  const filePath = path.join(root, CANDIDATE_EVIDENCE_PATH);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(document, null, 2)}\n`, "utf8");
  return filePath;
}

describe("evaluator qualification packet", () => {
  it("classifies the beta milestone taxonomy without promoting technical support tasks", () => {
    expect(
      isQualificationTask({
        tags: ["milestone-0-7-0-beta-1", "quality", "release-gate", "v0.7"],
      }),
    ).toBe(true);
    expect(isQualificationTask({ tags: ["code", "quality", "v0.7"] })).toBe(false);
  });

  it("resolves terminal dependency leaves and rejects missing nodes or cycles", async () => {
    const tasks = new Map<string, TaskData>([
      ["qualification", { id: "qualification", depends_on: ["aggregate"] } as TaskData],
      ["aggregate", { id: "aggregate", depends_on: ["leaf-a", "leaf-b"] } as TaskData],
      ["leaf-a", { id: "leaf-a", depends_on: [] } as TaskData],
      ["leaf-b", { id: "leaf-b", depends_on: [] } as TaskData],
    ]);
    const backend = { getTask: (taskId: string) => Promise.resolve(tasks.get(taskId) ?? null) };
    await expect(
      resolveQualificationDependencyLeaves({
        taskId: "qualification",
        loadTask: backend.getTask,
      }),
    ).resolves.toMatchObject({
      rootDependencyIds: ["aggregate"],
      terminalLeaves: [{ id: "leaf-a" }, { id: "leaf-b" }],
    });
    tasks.set("missing-root", { id: "missing-root", depends_on: ["missing"] } as TaskData);
    await expect(
      resolveQualificationDependencyLeaves({ taskId: "missing-root", loadTask: backend.getTask }),
    ).rejects.toThrow("Qualification dependency task missing is missing");
    tasks.set("leaf-b", { id: "leaf-b", depends_on: ["aggregate"] } as TaskData);
    await expect(
      resolveQualificationDependencyLeaves({
        taskId: "qualification",
        loadTask: backend.getTask,
      }),
    ).rejects.toThrow("Qualification dependency cycle detected");
  });

  it("requires sealed, matched-runtime RF-04 candidate evidence and preserves a failed verdict", async () => {
    const root = await mkGitRepoRoot();
    const evidencePath = await writeCandidateEvidence(root);
    await execFileAsync("git", ["add", "--", CANDIDATE_EVIDENCE_PATH], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: add RF-04 candidate evidence"], {
      cwd: root,
    });
    const { stdout: validShaOutput } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const validSha = validShaOutput.trim();
    await expect(
      readQualificationRf04CandidateMeasurement({ gitRoot: root, reviewedSha: validSha }),
    ).resolves.toMatchObject({
      coverage: { replay_runs: 50, scenarios: 10, provider_episodes: 55 },
      verdict: "fail",
      failure_ids: ["latency.harness_setup_latency_ms.mean_ms"],
      qualification_decision: "do_not_publish",
    });

    await writeCandidateEvidence(
      root,
      candidateEvidenceDocument({ candidateRuntimeVersion: "0.6.24/codex-0.146.0-alpha.3.2" }),
    );
    await execFileAsync("git", ["add", "--", CANDIDATE_EVIDENCE_PATH], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: cross-runtime RF-04 evidence"], {
      cwd: root,
    });
    const { stdout: crossRuntimeShaOutput } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    await expect(
      readQualificationRf04CandidateMeasurement({
        gitRoot: root,
        reviewedSha: crossRuntimeShaOutput.trim(),
      }),
    ).rejects.toThrow("requires an exact matched runtime profile");

    await writeCandidateEvidence(
      root,
      candidateEvidenceDocument({ candidateSubjectSha: "invalid" }),
    );
    await execFileAsync("git", ["add", "--", CANDIDATE_EVIDENCE_PATH], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: invalid RF-04 candidate SHA"], {
      cwd: root,
    });
    const { stdout: invalidShaOutput } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    await expect(
      readQualificationRf04CandidateMeasurement({
        gitRoot: root,
        reviewedSha: invalidShaOutput.trim(),
      }),
    ).rejects.toThrow("invalid candidate.subject_sha");

    await rm(evidencePath);
    await expect(
      readQualificationRf04CandidateMeasurement({ gitRoot: root, reviewedSha: validSha }),
    ).rejects.toThrow("no such file or directory");
  });

  it("makes non-qualification explicit in frozen evaluator checks", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202607291149-AB13";
    await addTask(root, taskId);
    await commitPath(
      root,
      "src/support.ts",
      "export const support = true;\n",
      "feat: support task",
    );
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    await cmdVerifyParsed({
      ctx,
      cwd: root,
      rootOverride: root,
      taskId,
      state: "ok",
      by: "TESTER",
      note: "Support-task checks passed.",
      details:
        "Command: bun run test:fast\nResult: pass\nEvidence: targeted suite\nScope: support task",
      quiet: true,
    });
    await execFileAsync("git", ["add", "--", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seal support verification"], {
      cwd: root,
    });

    const { prepared } = await prepareTypedReview(root, taskId);
    const observedEvidence = prepared.work_order.evidence.find(
      (entry) => entry.kind === "observed_checks",
    );
    expect(observedEvidence).toBeDefined();
    const observed = JSON.parse(
      await readFile(path.join(root, observedEvidence?.path ?? ""), "utf8"),
    ) as Record<string, unknown>;
    expect(observed.qualification_packet).toEqual({
      state: "not_required",
      reason: "not a milestone qualification task",
    });
  });

  it("prepares a SHA-bound qualification packet before evaluator review", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await mkdir(path.join(root, ".agentplane/policy"), { recursive: true });
    await Promise.all(
      ["dod.code.md", "dod.core.md", "security.must.md", "workflow.direct.md"].map(
        async (name) => await writeFile(path.join(root, ".agentplane/policy", name), "# policy\n"),
      ),
    );
    const taskId = "202607290900-AB12";
    const aggregateId = "202607290901-AG01";
    const leafId = "202607290901-CD34";
    const incompleteLeafId = "202607290901-EF56";
    const leafEvaluatedSha = await commitPath(
      root,
      "src/leaf-evaluation.ts",
      "export const leafEvaluation = true;\n",
      "test: leaf evaluator target",
    );
    await addTask(root, taskId);
    await addTask(root, aggregateId);
    await addTask(root, leafId);
    await addTask(root, incompleteLeafId);
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const qualityReportPath = `.agentplane/tasks/${leafId}/quality/pass/quality-report.json`;
    await applyTaskMutation({
      ctx,
      taskId: leafId,
      build: (current) => ({
        intents: setTaskFieldsIntent({
          status: "DONE",
          verification: {
            state: "ok",
            updated_at: "2026-07-29T09:00:00.000Z",
            updated_by: "TESTER",
            note: "Leaf verification passed.",
            attempts: 0,
          },
          quality_review: {
            state: "pass",
            provenance: "evaluator_supplied",
            updated_at: "2026-07-29T09:01:00.000Z",
            updated_by: "EVALUATOR",
            note: "Leaf evaluator passed.",
            evaluated_sha: leafEvaluatedSha,
            blueprint_digest: null,
            evidence_refs: [qualityReportPath],
            findings: [],
          },
          tags: current.tags,
        }),
      }),
    });
    await applyTaskMutation({
      ctx,
      taskId,
      build: () => ({
        intents: setTaskFieldsIntent({
          depends_on: [aggregateId],
          tags: ["quality", "release-gate", "milestone-0-7-0-beta-1"],
          verify: ["bun run ci:contract"],
        }),
      }),
    });
    await applyTaskMutation({
      ctx,
      taskId: aggregateId,
      build: () => ({ intents: setTaskFieldsIntent({ depends_on: [leafId] }) }),
    });
    await mkdir(path.join(root, path.dirname(qualityReportPath)), { recursive: true });
    await writeFile(
      path.join(root, qualityReportPath),
      `${JSON.stringify(
        { task_id: leafId, verdict: "pass", evaluated_sha: leafEvaluatedSha },
        null,
        2,
      )}\n`,
      "utf8",
    );
    await mkdir(path.join(root, `.agentplane/tasks/${leafId}/pr`), { recursive: true });
    await writeFile(
      path.join(root, `.agentplane/tasks/${leafId}/pr/meta.json`),
      `${JSON.stringify(
        {
          task_id: leafId,
          pr_number: 17,
          verify: { status: "pass" },
          pre_merge_closure: { state: "closed_before_merge" },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    await execFileAsync("git", ["add", "--", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore: close qualification leaf"], {
      cwd: root,
    });
    await mkdir(path.join(root, "scripts/baselines"), { recursive: true });
    await writeFile(
      path.join(root, "scripts/baselines/agent-efficiency-pre-v0.7-main.json"),
      `${JSON.stringify(
        {
          scenario_count: 10,
          comparison_policy: { structural_cost_max_growth_ratio: 0.1 },
          structural_projection_sha256: "sha256:main",
          structural_projection: { scenarios: [{ metrics: { measured: { value: 1 } } }] },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    await writeFile(
      path.join(root, "scripts/baselines/agent-efficiency-pre-v0.7-replay.json"),
      `${JSON.stringify(
        {
          coverage: { replay_runs: { actual: 50, required: 50 } },
          structural_projection_sha256: "sha256:replay",
          diagnostics_sha256: "sha256:diagnostics",
          golden_outcome_comparison: {
            verdict: "baseline",
            golden_match_count: 350,
            golden_mismatch_count: 0,
            resolved_run_outcome_cells: 350,
          },
          structural_projection: {
            scenarios: [
              {
                id: "direct",
                resolved_outcomes: {
                  verified_success: {
                    golden_expected: true,
                    true_count: 5,
                    false_count: 0,
                    golden_match_count: 5,
                    golden_mismatch_count: 0,
                  },
                  rework_required: {
                    golden_expected: false,
                    true_count: 0,
                    false_count: 5,
                    golden_match_count: 5,
                    golden_mismatch_count: 0,
                  },
                  scope_violation: {
                    golden_expected: false,
                    true_count: 0,
                    false_count: 5,
                    golden_match_count: 5,
                    golden_mismatch_count: 0,
                  },
                },
                token_usage_by_role: {
                  CODER: {
                    input_tokens: { count: 5, mean: 100 },
                    output_tokens: { count: 5, mean: 10 },
                    reasoning_tokens: { count: 5, mean: 20 },
                  },
                },
              },
            ],
          },
          diagnostics: {
            scenarios: [
              { id: "direct", latency_ms: { preparation_latency_ms: { count: 5, mean: 30 } } },
            ],
          },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    await mkdir(path.join(root, "scripts/bench"), { recursive: true });
    await writeFile(
      path.join(root, "scripts/bench/capture-agent-efficiency-replay.mjs"),
      [
        'import { readFileSync, writeFileSync } from "node:fs";',
        'import path from "node:path";',
        'const output = process.argv.at(process.argv.indexOf("--output") + 1);',
        'if (!output) throw new Error("missing --output");',
        'const baselinePath = path.join(process.cwd(), "scripts/baselines/agent-efficiency-pre-v0.7-replay.json");',
        'const rebuild = { ...JSON.parse(readFileSync(baselinePath, "utf8")), capture: "current-run" };',
        'writeFileSync(output, `${JSON.stringify(rebuild, null, 2)}\\n`, "utf8");',
      ].join("\n"),
      "utf8",
    );
    await execFileAsync(
      "git",
      ["add", "--", "scripts/baselines", "scripts/bench/capture-agent-efficiency-replay.mjs"],
      { cwd: root },
    );
    await execFileAsync("git", ["commit", "-m", "test: prepare qualification baseline"], {
      cwd: root,
    });
    await applyTaskMutation({
      ctx,
      taskId: aggregateId,
      build: () => ({ intents: setTaskFieldsIntent({ depends_on: [leafId, incompleteLeafId] }) }),
    });
    await execFileAsync("git", ["add", "--", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: add incomplete qualification leaf"], {
      cwd: root,
    });
    await expect(
      cmdVerifyParsed({
        ctx,
        cwd: root,
        rootOverride: root,
        taskId,
        state: "ok",
        by: "TESTER",
        note: "Qualification checks passed on the reviewed SHA.",
        details:
          "Command: bun run ci:contract\nResult: pass\nEvidence: RF-04 replay rebuilt from 50 runs.\nScope: qualification contract",
        quiet: true,
      }),
    ).rejects.toThrow(`Qualification dependency leaf ${incompleteLeafId} is not DONE`);
    const incompleteReadmePath = path.join(root, `.agentplane/tasks/${incompleteLeafId}/README.md`);
    const incompleteReadme = await readFile(incompleteReadmePath, "utf8");
    await applyTaskMutation({
      ctx,
      taskId: incompleteLeafId,
      build: (current) => ({
        intents: setTaskFieldsIntent({
          status: "DONE",
          verification: {
            state: "ok",
            updated_at: "2026-07-29T09:02:00.000Z",
            updated_by: "TESTER",
            note: "Current-only dependency override.",
            attempts: 0,
          },
          tags: current.tags,
        }),
      }),
    });
    await expect(
      cmdVerifyParsed({
        ctx,
        cwd: root,
        rootOverride: root,
        taskId,
        state: "ok",
        by: "TESTER",
        note: "Qualification checks passed on the reviewed SHA.",
        details:
          "Command: bun run ci:contract\nResult: pass\nEvidence: RF-04 replay rebuilt from 50 runs.\nScope: qualification contract",
        quiet: true,
      }),
    ).rejects.toThrow(
      `Qualification dependency task ${incompleteLeafId} document must match the exact blob at the reviewed implementation SHA`,
    );
    await writeFile(incompleteReadmePath, incompleteReadme, "utf8");
    await applyTaskMutation({
      ctx,
      taskId: aggregateId,
      build: () => ({ intents: setTaskFieldsIntent({ depends_on: [leafId] }) }),
    });
    await execFileAsync("git", ["add", "--", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: restore qualification leaves"], {
      cwd: root,
    });
    await applyTaskMutation({
      ctx,
      taskId: leafId,
      build: (current) => ({
        intents: setTaskFieldsIntent({
          quality_review: {
            ...current.quality_review!,
            evaluated_sha: "b".repeat(40),
          },
        }),
      }),
    });
    await execFileAsync("git", ["add", "--", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: stale leaf evaluator state"], { cwd: root });
    await expect(
      cmdVerifyParsed({
        ctx,
        cwd: root,
        rootOverride: root,
        taskId,
        state: "ok",
        by: "TESTER",
        note: "Qualification checks passed on the reviewed SHA.",
        details:
          "Command: bun run ci:contract\nResult: pass\nEvidence: RF-04 replay rebuilt from 50 runs.\nScope: qualification contract",
        quiet: true,
      }),
    ).rejects.toThrow("bound to its current evaluator reviewed SHA");
    await applyTaskMutation({
      ctx,
      taskId: leafId,
      build: (current) => ({
        intents: setTaskFieldsIntent({
          quality_review: {
            ...current.quality_review!,
            evaluated_sha: leafEvaluatedSha,
          },
        }),
      }),
    });
    await execFileAsync("git", ["add", "--", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: restore leaf evaluator state"], {
      cwd: root,
    });
    await writeCandidateEvidence(root);
    await execFileAsync("git", ["add", "--", CANDIDATE_EVIDENCE_PATH], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: pin RF-04 candidate evidence"], {
      cwd: root,
    });
    const reviewedSha = await commitPath(
      root,
      "src/qualified.ts",
      "export const qualified = true;\n",
      "feat: reviewed qualification target",
    );
    const leafReadmePath = path.join(root, `.agentplane/tasks/${leafId}/README.md`);
    for (const artifactPath of [
      leafReadmePath,
      path.join(root, `.agentplane/tasks/${leafId}/pr/meta.json`),
      path.join(root, qualityReportPath),
    ]) {
      const artifact = await readFile(artifactPath, "utf8");
      await writeFile(artifactPath, `${artifact}\npost-review drift\n`, "utf8");
      await expect(
        cmdVerifyParsed({
          ctx,
          cwd: root,
          rootOverride: root,
          taskId,
          state: "ok",
          by: "TESTER",
          note: "Qualification checks passed on the reviewed SHA.",
          details:
            "Command: bun run ci:contract\nResult: pass\nEvidence: RF-04 replay rebuilt from 50 runs.\nScope: qualification contract",
          quiet: true,
        }),
      ).rejects.toThrow("must match the exact blob at the reviewed implementation SHA");
      await writeFile(artifactPath, artifact, "utf8");
    }
    await cmdVerifyParsed({
      ctx,
      cwd: root,
      rootOverride: root,
      taskId,
      state: "ok",
      by: "TESTER",
      note: "Qualification checks passed on the reviewed SHA.",
      details:
        "Command: bun run ci:contract\nResult: pass\nEvidence: RF-04 replay rebuilt from 50 runs.\nScope: qualification contract",
      quiet: true,
    });

    await expect(prepareTypedReview(root, taskId)).rejects.toThrow(
      "requires current HEAD to contain the exact qualification packet",
    );
    await execFileAsync(
      "git",
      [
        "add",
        "--",
        ".agentplane",
        "scripts/baselines",
        "scripts/bench/capture-agent-efficiency-replay.mjs",
      ],
      { cwd: root },
    );
    await execFileAsync("git", ["commit", "-m", "chore: seal qualification evidence"], {
      cwd: root,
    });
    const { stdout: evidenceCommitOutput } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const evidenceCommit = evidenceCommitOutput.trim();

    const { prepared } = await prepareTypedReview(root, taskId);
    const packetEvidence = prepared.work_order.evidence.find(
      (entry) => entry.kind === "qualification_packet",
    );
    expect(prepared.work_order.evaluated_sha).toBe(evidenceCommit);
    expect(packetEvidence).toBeDefined();
    const packetPath = path.join(root, packetEvidence?.path ?? "");
    const packetRaw = await readFile(packetPath, "utf8");
    const packet = JSON.parse(packetRaw) as Record<string, unknown>;
    expect(packet).toMatchObject({
      task_id: taskId,
      implementation_sha: reviewedSha,
      dependency_closure: {
        root_dependency_ids: [aggregateId],
        terminal_leaf_ids: [leafId],
        leaves: [
          {
            task_id: leafId,
            status: "DONE",
            verification: { state: "ok" },
            evaluator: { state: "pass" },
            hosted_close: { pr_number: 17, pre_merge_closure: "closed_before_merge" },
          },
        ],
      },
      rf04: {
        replay_comparison: {
          status: "exact_frozen_rebuild",
          baseline: { coverage: { replay_runs: { actual: 50, required: 50 } } },
          current_rebuild: {
            path: `.agentplane/tasks/${taskId}/evidence/rf04-current-rebuild.v1.json`,
            coverage: { replay_runs: { actual: 50, required: 50 } },
          },
        },
      },
    });
    const replayComparison = (packet.rf04 as { replay_comparison: Record<string, unknown> })
      .replay_comparison;
    expect(replayComparison.current_rebuild).toEqual(
      expect.objectContaining({
        path: `.agentplane/tasks/${taskId}/evidence/rf04-current-rebuild.v1.json`,
      }),
    );
    expect((replayComparison.current_rebuild as { sha256: string }).sha256).not.toBe(
      (replayComparison.baseline as { sha256: string }).sha256,
    );
    expect(packetEvidence?.path).toContain(
      `/tasks/${taskId}/evidence/qualification-packet.v1.json`,
    );
    const { stdout: divergentCommitOutput } = await execFileAsync(
      "git",
      ["commit-tree", `${evidenceCommit}^{tree}`, "-m", "test: divergent qualification evidence"],
      { cwd: root },
    );
    const divergentCommit = divergentCommitOutput.trim();
    await expect(
      assertQualificationEvidenceLineage({
        gitRoot: root,
        implementationSha: reviewedSha,
        evidenceCommit: divergentCommit,
        evidenceRoot: `.agentplane/tasks/${taskId}`,
      }),
    ).rejects.toThrow("must descend from the packet's verified implementation SHA");
    await writeFile(
      path.join(root, "src/unverified-after-review.ts"),
      "export const unsafe = true;\n",
      "utf8",
    );
    await execFileAsync("git", ["add", "--", "src/unverified-after-review.ts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: unverified implementation drift"], {
      cwd: root,
    });
    await expect(prepareTypedReview(root, taskId)).rejects.toThrow(
      "may contain only current-task evidence after the packet's verified implementation SHA",
    );
    await execFileAsync("git", ["reset", "--hard", evidenceCommit], { cwd: root });
    await writeFile(
      packetPath,
      `${JSON.stringify({ ...packet, implementation_sha: "a".repeat(40) }, null, 2)}\n`,
      "utf8",
    );
    await expect(prepareTypedReview(root, taskId)).rejects.toThrow(
      "Qualification review requires a current SHA-bound qualification packet",
    );
    await writeFile(packetPath, packetRaw, "utf8");
    await writeFile(
      leafReadmePath,
      `${await readFile(leafReadmePath, "utf8")}\n<!-- post-seal drift -->\n`,
      "utf8",
    );
    await execFileAsync("git", ["add", "--", `.agentplane/tasks/${leafId}/README.md`], {
      cwd: root,
    });
    await execFileAsync("git", ["commit", "-m", "test: drift qualification leaf"], {
      cwd: root,
    });
    await expect(prepareTypedReview(root, taskId)).rejects.toThrow(
      "may contain only current-task evidence after the packet's verified implementation SHA",
    );
  });
});
