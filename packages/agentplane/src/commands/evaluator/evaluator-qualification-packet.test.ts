import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { loadCommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { setTaskFieldsIntent } from "../shared/task-store.js";
import { isQualificationTask } from "../task/qualification-packet.js";
import { cmdVerifyParsed } from "../task/verify-record.js";

import {
  addTask,
  commitPath,
  execFileAsync,
  prepareTypedReview,
} from "./evaluator-test-helpers.js";

describe("evaluator qualification packet", () => {
  it("classifies the beta milestone taxonomy without promoting technical support tasks", () => {
    expect(
      isQualificationTask({
        tags: ["milestone-0-7-0-beta-1", "quality", "release-gate", "v0.7"],
      }),
    ).toBe(true);
    expect(isQualificationTask({ tags: ["code", "quality", "v0.7"] })).toBe(false);
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
    const leafId = "202607290901-CD34";
    await addTask(root, taskId);
    await addTask(root, leafId);
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
            evaluated_sha: null,
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
          depends_on: [leafId],
          tags: ["quality", "release-gate", "milestone-0-7-0-beta-1"],
          verify: ["bun run ci:contract"],
        }),
      }),
    });
    await mkdir(path.join(root, path.dirname(qualityReportPath)), { recursive: true });
    await writeFile(
      path.join(root, qualityReportPath),
      `${JSON.stringify({ task_id: leafId, verdict: "pass" }, null, 2)}\n`,
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
    await execFileAsync("git", ["add", "--", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore: close qualification leaf"], {
      cwd: root,
    });
    const reviewedSha = await commitPath(
      root,
      "src/qualified.ts",
      "export const qualified = true;\n",
      "feat: reviewed qualification target",
    );

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
    await execFileAsync("git", ["add", "--", `.agentplane/tasks/${taskId}`, "scripts/baselines"], {
      cwd: root,
    });
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
    const packet = JSON.parse(
      await readFile(path.join(root, packetEvidence?.path ?? ""), "utf8"),
    ) as Record<string, unknown>;
    expect(packet).toMatchObject({
      task_id: taskId,
      implementation_sha: reviewedSha,
      dependency_closure: {
        declared_leaf_ids: [leafId],
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
          current_rebuild: { coverage: { replay_runs: { actual: 50, required: 50 } } },
        },
      },
    });
    expect(packetEvidence?.path).toContain(
      `/tasks/${taskId}/evidence/qualification-packet.v1.json`,
    );
    const leafReadmePath = path.join(root, `.agentplane/tasks/${leafId}/README.md`);
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
      "does not match the sealed packet",
    );
    await writeFile(
      path.join(root, packetEvidence?.path ?? ""),
      `${JSON.stringify({ ...packet, implementation_sha: "a".repeat(40) }, null, 2)}\n`,
      "utf8",
    );
    await expect(prepareTypedReview(root, taskId)).rejects.toThrow(
      "Qualification review requires a current SHA-bound qualification packet",
    );
  });
});
