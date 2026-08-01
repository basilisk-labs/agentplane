import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { readTask } from "@agentplaneorg/core/tasks";
import { captureStdIO, mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it, vi } from "vitest";

import { parseCommandArgv } from "../../cli/spec/parse.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { setTaskFieldsIntent } from "../shared/task-store.js";
import { cmdVerifyParsed } from "../task/verify-record.js";

import {
  makeRunEvaluatorRunHandler,
  runEvaluatorCommand,
  runEvaluatorRun,
} from "./evaluator.command.js";
import {
  renderActualDiff,
  resolveEvaluatorDiffBase,
  type PreparedEvaluatorReview,
} from "./evaluator-review-usecase.js";
import { applyEvaluatorSgrReview } from "./evaluator-review-apply.js";
import { evaluatorRunSpec } from "./evaluator.spec.js";
import {
  addTask,
  commitPath,
  execFileAsync,
  prepareTypedReview,
} from "./evaluator-test-helpers.js";

async function readEvaluatedSha(
  root: string,
  taskId: string,
  expectedReports = 1,
): Promise<string | null> {
  const { stdout } = await execFileAsync(
    "find",
    [`.agentplane/tasks/${taskId}/quality`, "-name", "quality-report.json", "-print"],
    { cwd: root },
  );
  const reportPaths = stdout.trim().split("\n").toSorted();
  expect(reportPaths).toHaveLength(expectedReports);
  const report = JSON.parse(await readFile(path.join(root, reportPaths.at(-1) ?? ""), "utf8")) as {
    evaluated_sha: string | null;
  };
  return report.evaluated_sha;
}

async function setPrimaryBatchOwnership(
  root: string,
  primaryTaskId: string,
  includedTaskIds: string[],
): Promise<void> {
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  await applyTaskMutation({
    ctx,
    taskId: primaryTaskId,
    build: (current) => ({
      intents: setTaskFieldsIntent({
        extensions: {
          ...current.extensions,
          branch_pr_batch: {
            role: "primary",
            primary_task_id: primaryTaskId,
            included_task_ids: includedTaskIds,
          },
        },
      }),
    }),
  });
}

function typedEvaluatorResult(
  prepared: PreparedEvaluatorReview,
  overrides: Record<string, unknown> = {},
) {
  const diff = prepared.work_order.evidence.find((entry) => entry.kind === "actual_diff");
  if (!diff) throw new Error("Missing frozen actual-diff evidence.");
  return {
    schema_version: 1,
    kind: "evaluator_result",
    evaluator_id: prepared.work_order.evaluator.id,
    verdict: "pass",
    findings: [
      {
        id: "finding-1",
        severity: "low",
        summary: "The frozen implementation evidence satisfies the declared review contract.",
        broken_invariant: "none",
        evidence_refs: [{ path: diff.path }],
      },
    ],
    missing_tests: [],
    hidden_assumptions: [],
    ...overrides,
  };
}

describe("evaluator run command", () => {
  it("returns a typed no-record result without using stdout as a data channel", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EVNR";
    await addTask(root, taskId);
    await commitPath(root, "src/review-target.txt", "review target", "feat: review target");
    const command = await loadCommandContext({ cwd: root, rootOverride: root });
    const io = captureStdIO();

    try {
      const result = await runEvaluatorCommand(
        { cwd: root, rootOverride: root },
        {
          taskId,
          evaluator: "recovery-context",
          provenance: "evaluator_supplied",
          verdict: "pass",
          summary: "Prepared review context without recording a semantic verdict.",
          findings: ["The typed preparation result is available without recording a review."],
          evidenceRefs: [],
          missingTests: [],
          hiddenAssumptions: [],
          residualRisks: [],
          json: true,
          record: false,
        },
        { getCommandContext: () => Promise.resolve(command) },
      );

      expect(result).toMatchObject({
        provenance: "evaluator_supplied",
        verdict: "pass",
        recorded: false,
      });
      expect(result.work_order).toMatch(/work-order\.json$/u);
      expect(result.prompt).toMatch(/evaluator-prompt\.md$/u);
      expect(io.stdout).toBe("");
      expect(io.stderr).toBe("");

      const getCommandContext = vi.fn(() => Promise.resolve(command));
      const handler = makeRunEvaluatorRunHandler({
        getCommandContext,
      });
      await handler(
        { cwd: root, rootOverride: root },
        {
          taskId,
          evaluator: "recovery-context",
          provenance: "evaluator_supplied",
          verdict: "pass",
          summary: "Prepared review context without recording a semantic verdict.",
          findings: ["The typed preparation result is available without recording a review."],
          evidenceRefs: [],
          missingTests: [],
          hiddenAssumptions: [],
          residualRisks: [],
          json: true,
          record: false,
        },
      );
      expect(getCommandContext).toHaveBeenCalledOnce();
    } finally {
      io.restore();
    }
  });

  it("parses structured review evidence and findings as repeatable fields", () => {
    const { parsed } = parseCommandArgv(evaluatorRunSpec, [
      "T-1",
      "--provenance",
      "human_supplied",
      "--verdict",
      "pass",
      "--summary",
      "Reviewed diff and verification evidence.",
      "--finding",
      "No unresolved implementation findings after diff review.",
      "--finding",
      "Verification evidence covers the declared task contract.",
      "--evidence",
      ".agentplane/tasks/T-1/README.md",
      "--evidence",
      "bun test focused-suite",
      "--missing-test",
      "No additional missing tests found.",
      "--hidden-assumption",
      "Hosted checks must be read from current PR head.",
      "--residual-risk",
      "No residual runtime risk beyond normal CI coverage.",
      "--json",
    ]);

    expect(parsed).toMatchObject({
      taskId: "T-1",
      evaluator: "recovery-context",
      verdict: "pass",
      provenance: "human_supplied",
      summary: "Reviewed diff and verification evidence.",
      findings: [
        "No unresolved implementation findings after diff review.",
        "Verification evidence covers the declared task contract.",
      ],
      evidenceRefs: [".agentplane/tasks/T-1/README.md", "bun test focused-suite"],
      missingTests: ["No additional missing tests found."],
      hiddenAssumptions: ["Hosted checks must be read from current PR head."],
      residualRisks: ["No residual runtime risk beyond normal CI coverage."],
      json: true,
      record: true,
    });
  });

  it("requires an explicit verdict", () => {
    expect(() =>
      parseCommandArgv(evaluatorRunSpec, ["T-1", "--provenance", "human_supplied"]),
    ).toThrow(/Provide --verdict/);
  });

  it("requires explicit provenance instead of attributing an omitted origin to a human", () => {
    expect(() => parseCommandArgv(evaluatorRunSpec, ["T-1", "--verdict", "human_review"])).toThrow(
      /Provide --provenance/,
    );
  });

  it("requires an actionable finding for rework verdicts", async () => {
    await expect(
      runEvaluatorRun(
        { cwd: process.cwd(), rootOverride: undefined },
        {
          taskId: "T-1",
          evaluator: "recovery-context",
          provenance: "evaluator_supplied",
          verdict: "rework",
          summary: "Implementation rework is required.",
          findings: [],
          evidenceRefs: ["src/review-target.txt"],
          missingTests: [],
          hiddenAssumptions: [],
          residualRisks: [],
          json: false,
          record: true,
        },
      ),
    ).rejects.toThrow("EVALUATOR rework requires at least one --finding.");
  });

  it("keeps the evaluator compatibility facade tolerant of a legacy input without reworkContext", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV15";
    await addTask(root, taskId);
    await commitPath(root, "src/review-target.txt", "review target", "feat: review target");

    await runEvaluatorRun(
      { cwd: root, rootOverride: undefined },
      {
        taskId,
        evaluator: "recovery-context",
        provenance: "evaluator_supplied",
        verdict: "pass",
        summary: "The evaluator reviewed the committed target.",
        findings: ["The evaluator compatibility facade preserved the supplied review."],
        evidenceRefs: ["src/review-target.txt"],
        missingTests: [],
        hiddenAssumptions: [],
        residualRisks: [],
        json: false,
        record: true,
      },
    );

    const stored = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(stored.frontmatter.quality_review).toMatchObject({
      provenance: "evaluator_supplied",
      state: "pass",
    });
  });

  it("preserves supplied review values with explicit human provenance", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV00";
    await addTask(root, taskId);
    await commitPath(root, "src/review-target.txt", "review target", "feat: review target");

    const summary = "A human reviewed the acceptance criteria and implementation evidence.";
    const findings = [
      "The supplied verdict reflects a human semantic decision.",
      "The supplied evidence covers the committed review target.",
    ];
    await runEvaluatorRun(
      { cwd: root, rootOverride: undefined },
      {
        taskId,
        evaluator: "recovery-context",
        provenance: "human_supplied",
        verdict: "pass",
        summary,
        findings,
        evidenceRefs: ["src/review-target.txt"],
        missingTests: [],
        hiddenAssumptions: [],
        residualRisks: [],
        json: false,
        record: true,
      },
    );

    const { stdout } = await execFileAsync(
      "find",
      [`.agentplane/tasks/${taskId}/quality`, "-name", "quality-report.json", "-print"],
      { cwd: root },
    );
    const reportPath = stdout.trim();
    const report = JSON.parse(await readFile(path.join(root, reportPath), "utf8")) as Record<
      string,
      unknown
    >;
    expect(report).toMatchObject({
      provenance: "human_supplied",
      verdict: "pass",
      summary,
      findings,
    });

    const stored = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(stored.frontmatter.quality_review).toMatchObject({
      provenance: "human_supplied",
      state: "pass",
      updated_by: "HUMAN",
      note: summary,
      findings,
    });
    expect(
      await readFile(path.join(root, `.agentplane/tasks/${taskId}/README.md`), "utf8"),
    ).toContain('provenance: "human_supplied"');
  });

  it("records current task metadata layered over implementation as evaluated_sha", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV01";
    await addTask(root, taskId);
    const implementationSha = await commitPath(
      root,
      "src/feature.txt",
      "implementation",
      "feat: add feature",
    );
    const metadataSha = await commitPath(
      root,
      `.agentplane/tasks/${taskId}/manual-note.md`,
      "task artifact",
      "chore: task artifact",
    );

    await runEvaluatorRun(
      { cwd: root, rootOverride: undefined },
      {
        taskId,
        evaluator: "recovery-context",
        provenance: "human_supplied",
        verdict: "pass",
        summary: "Quality gate passed",
        findings: ["Implementation evidence was reviewed."],
        evidenceRefs: ["src/feature.txt"],
        missingTests: [],
        hiddenAssumptions: [],
        residualRisks: [],
        json: false,
        record: true,
      },
    );

    expect(metadataSha).not.toBe(implementationSha);
    expect(await readEvaluatedSha(root, taskId)).toBe(metadataSha);
  });

  it("anchors a task-artifact-only work unit before unrelated workflow history", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV02";
    await addTask(root, taskId);
    await commitPath(root, "src/older-feature.txt", "older implementation", "feat: older work");
    await commitPath(
      root,
      ".agentplane/tasks/202605240900-OTHER/manual-note.md",
      "unrelated task artifact",
      "chore: unrelated task artifact",
    );
    const metadataSha = await commitPath(
      root,
      `.agentplane/tasks/${taskId}/manual-note.md`,
      "current metadata work unit",
      "docs: record metadata-only work unit",
    );

    await runEvaluatorRun(
      { cwd: root, rootOverride: undefined },
      {
        taskId,
        evaluator: "recovery-context",
        provenance: "human_supplied",
        verdict: "pass",
        summary: "Metadata work unit reviewed",
        findings: ["Current task metadata is the auditable review target."],
        evidenceRefs: [`.agentplane/tasks/${taskId}/manual-note.md`],
        missingTests: [],
        hiddenAssumptions: [],
        residualRisks: [],
        json: false,
        record: true,
      },
    );

    expect(await readEvaluatedSha(root, taskId)).toBe(metadataSha);
  });

  it("keeps evaluator reruns anchored across committed review and PR artifacts", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV04";
    await addTask(root, taskId);
    await commitPath(root, "src/older-feature.txt", "older implementation", "feat: older work");
    await commitPath(
      root,
      ".agentplane/tasks/202605240900-OTHER/manual-note.md",
      "unrelated task artifact",
      "chore: unrelated task artifact",
    );
    const metadataSha = await commitPath(
      root,
      `.agentplane/tasks/${taskId}/manual-note.md`,
      "current metadata work unit",
      "docs: record metadata-only work unit",
    );

    const runReview = async (summary: string): Promise<void> => {
      await runEvaluatorRun(
        { cwd: root, rootOverride: undefined },
        {
          taskId,
          evaluator: "recovery-context",
          provenance: "human_supplied",
          verdict: "pass",
          summary,
          findings: ["Current task metadata is the auditable review target."],
          evidenceRefs: [`.agentplane/tasks/${taskId}/manual-note.md`],
          missingTests: [],
          hiddenAssumptions: [],
          residualRisks: [],
          json: false,
          record: true,
        },
      );
    };

    await runReview("Initial metadata review");
    expect(await readEvaluatedSha(root, taskId)).toBe(metadataSha);
    await execFileAsync("git", ["add", "--", `.agentplane/tasks/${taskId}`], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: record evaluator artifacts"], {
      cwd: root,
    });
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/pr/meta.json`,
      "{}\n",
      "test: refresh PR metadata",
    );

    await runReview("Repeated metadata review");

    expect(await readEvaluatedSha(root, taskId, 2)).toBe(metadataSha);
  });

  it("anchors an included-task metadata work unit for a primary batch review", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV05";
    const includedTaskId = "202605240900-EV06";
    await addTask(root, taskId);
    await addTask(root, includedTaskId);
    await setPrimaryBatchOwnership(root, taskId, [includedTaskId]);
    const metadataSha = await commitPath(
      root,
      `.agentplane/tasks/${includedTaskId}/manual-note.md`,
      "included metadata work unit",
      "docs: record included metadata-only work unit",
    );

    await runEvaluatorRun(
      { cwd: root, rootOverride: undefined },
      {
        taskId,
        evaluator: "recovery-context",
        provenance: "human_supplied",
        verdict: "pass",
        summary: "Included metadata work unit reviewed",
        findings: ["The included task metadata is part of the primary batch review target."],
        evidenceRefs: [`.agentplane/tasks/${includedTaskId}/manual-note.md`],
        missingTests: [],
        hiddenAssumptions: [],
        residualRisks: [],
        json: false,
        record: true,
      },
    );

    expect(await readEvaluatedSha(root, taskId)).toBe(metadataSha);
  });

  it("keeps a primary batch review anchored across included-task derived artifacts", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV07";
    const includedTaskId = "202605240900-EV08";
    await addTask(root, taskId);
    await addTask(root, includedTaskId);
    await setPrimaryBatchOwnership(root, taskId, [includedTaskId]);
    const metadataSha = await commitPath(
      root,
      `.agentplane/tasks/${includedTaskId}/manual-note.md`,
      "included metadata work unit",
      "docs: record included metadata-only work unit",
    );

    const runReview = async (summary: string): Promise<void> => {
      await runEvaluatorRun(
        { cwd: root, rootOverride: undefined },
        {
          taskId,
          evaluator: "recovery-context",
          provenance: "human_supplied",
          verdict: "pass",
          summary,
          findings: ["The included task metadata is part of the primary batch review target."],
          evidenceRefs: [`.agentplane/tasks/${includedTaskId}/manual-note.md`],
          missingTests: [],
          hiddenAssumptions: [],
          residualRisks: [],
          json: false,
          record: true,
        },
      );
    };

    await runReview("Initial primary batch review");
    expect(await readEvaluatedSha(root, taskId)).toBe(metadataSha);
    await commitPath(
      root,
      `.agentplane/tasks/${includedTaskId}/quality/report.json`,
      "{}\n",
      "test: record included quality artifact",
    );
    await commitPath(
      root,
      `.agentplane/tasks/${includedTaskId}/pr/meta.json`,
      "{}\n",
      "test: refresh included PR metadata",
    );

    await runReview("Repeated primary batch review");

    expect(await readEvaluatedSha(root, taskId, 2)).toBe(metadataSha);
  });

  it("does not anchor an unrelated task artifact when the current task has no committed work", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV03";
    await addTask(root, taskId);
    await commitPath(root, "src/older-feature.txt", "older implementation", "feat: older work");
    await commitPath(
      root,
      ".agentplane/tasks/202605240900-OTHER/manual-note.md",
      "unrelated task artifact",
      "chore: unrelated task artifact",
    );

    await runEvaluatorRun(
      { cwd: root, rootOverride: undefined },
      {
        taskId,
        evaluator: "recovery-context",
        provenance: "human_supplied",
        verdict: "pass",
        summary: "No current committed work unit",
        findings: ["Unrelated workflow history is not a valid review target."],
        evidenceRefs: [`.agentplane/tasks/${taskId}/README.md`],
        missingTests: [],
        hiddenAssumptions: [],
        residualRisks: [],
        json: false,
        record: true,
      },
    );

    expect(await readEvaluatedSha(root, taskId)).toBeNull();
  });

  it("prepares a frozen read-only work order and applies only the matching typed evaluator result", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV12";
    await addTask(root, taskId);
    const implementationSha = await commitPath(
      root,
      "src/evaluated.ts",
      "export const evaluated = true;\n",
      "feat: evaluator target",
    );

    const { command, task, prepared } = await prepareTypedReview(root, taskId);
    expect(prepared.work_order).toMatchObject({
      task: { id: taskId, revision: task.revision },
      evaluated_sha: implementationSha,
      authority: { sandbox: "read-only", writable_roots: [], external_side_effects: [] },
      result_contract: "sgr.evaluator_result.v1",
    });
    expect(prepared.work_order.evidence.map((entry) => entry.kind)).toEqual(
      expect.arrayContaining(["task_document", "actual_diff", "observed_checks", "blueprint"]),
    );
    const prompt = await readFile(prepared.prompt_path, "utf8");
    expect(prompt).toContain("# AgentPlane EVALUATOR episode");
    expect(prompt).toContain("sgr.evaluator_result.v1");
    expect(prompt).toContain("caller, not the read-only evaluator, persists it");
    expect(prompt).toContain(`result_output: ${path.relative(root, prepared.result_path)}`);

    const applied = await applyEvaluatorSgrReview({
      ctx: command,
      task,
      workOrderPath: prepared.work_order_path,
      result: typedEvaluatorResult(prepared),
    });

    expect(applied.report_path).toContain(`.agentplane/tasks/${taskId}/quality/`);
    const stored = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(stored.frontmatter.quality_review).toMatchObject({
      state: "pass",
      provenance: "evaluator_supplied",
      updated_by: "EVALUATOR",
      evaluated_sha: implementationSha,
    });
  });

  it("freezes CLI-owned direct implementation evidence with the observed checks", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV17";
    await addTask(root, taskId);
    const implementationSha = await commitPath(
      root,
      "src/direct-evidence.ts",
      "export const directEvidence = true;\n",
      "feat: direct evidence",
    );
    const evidencePath = path.join(
      root,
      `.agentplane/tasks/${taskId}/supervision/implementation-evidence.json`,
    );
    await mkdir(path.dirname(evidencePath), { recursive: true });
    await writeFile(
      evidencePath,
      `${JSON.stringify({
        schema_version: 1,
        kind: "direct_task_implementation_evidence",
        task_id: taskId,
        implementation_commit: implementationSha,
        checks: [{ id: "final-repository-status", result: "pass" }],
      })}\n`,
      "utf8",
    );

    const { prepared } = await prepareTypedReview(root, taskId);
    const observedChecksPath = prepared.work_order.evidence.find(
      (entry) => entry.kind === "observed_checks",
    )?.path;
    expect(observedChecksPath).toBeTruthy();
    const observedChecks = JSON.parse(
      await readFile(path.join(root, observedChecksPath ?? ""), "utf8"),
    ) as { direct_supervision: Record<string, unknown> | null };
    expect(observedChecks.direct_supervision).toMatchObject({
      task_id: taskId,
      implementation_commit: implementationSha,
      checks: [{ id: "final-repository-status", result: "pass" }],
    });
  });

  it("freezes the complete branch delta from the merge base through the evaluated SHA", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const baseSha = await commitPath(
      root,
      "src/rename-before.ts",
      "export const renamed = true;\n",
      "chore: establish base",
    );
    const taskId = "202605240900-EV15";
    await addTask(root, taskId);
    await commitPath(
      root,
      `.agentplane/tasks/${taskId}/quality/previous-evaluator-diff.patch`,
      "stale evaluator patch that must not recurse into the next evaluator diff\n",
      "test: persist prior evaluator evidence",
    );
    const prDir = path.join(root, `.agentplane/tasks/${taskId}/pr`);
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      `${JSON.stringify({
        schema_version: 1,
        task_id: taskId,
        branch: `task/${taskId}/fixture`,
        created_at: "2026-01-01T00:00:00.000Z",
        updated_at: "2026-01-01T00:00:00.000Z",
        status: "OPEN",
        verify: { status: "skipped" },
        base: baseSha,
      })}\n`,
      "utf8",
    );
    await commitPath(root, "src/first-change.ts", "export const first = true;\n", "feat: first");
    await commitPath(root, "src/second-change.ts", "export const second = true;\n", "feat: second");
    const binaryPath = path.join(root, "fixtures", "payload.bin");
    await mkdir(path.dirname(binaryPath), { recursive: true });
    await writeFile(binaryPath, Buffer.from([0x00, 0xff, 0x2a, 0x7f]));
    await execFileAsync("git", ["add", "--", "fixtures/payload.bin"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: add binary fixture"], { cwd: root });
    await execFileAsync("git", ["mv", "src/rename-before.ts", "src/rename-after.ts"], {
      cwd: root,
    });
    await execFileAsync("git", ["commit", "-m", "test: rename fixture"], { cwd: root });
    const { stdout: evaluatedOutput } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const evaluatedSha = evaluatedOutput.trim();

    const { prepared } = await prepareTypedReview(root, taskId);
    const actualDiff = prepared.work_order.evidence.find((entry) => entry.kind === "actual_diff");
    if (!actualDiff) throw new Error("Missing frozen actual-diff evidence.");

    expect(prepared.work_order).toMatchObject({
      evaluated_sha: evaluatedSha,
      diff_base_sha: baseSha,
    });
    const frozenDiff = await readFile(path.join(root, actualDiff.path), "utf8");
    expect(frozenDiff).toContain("src/first-change.ts");
    expect(frozenDiff).toContain("src/second-change.ts");
    expect(frozenDiff).toContain("GIT binary patch");
    expect(frozenDiff).toContain("rename from src/rename-before.ts");
    expect(frozenDiff).toContain("rename to src/rename-after.ts");
    expect(frozenDiff).not.toContain("stale evaluator patch that must not recurse");
  });

  it("keeps no-work-unit evidence empty and fails closed when its configured base is missing", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await commitPath(root, "README.md", "base\n", "chore: establish base");
    const evaluatedSha = await commitPath(
      root,
      "src/evaluated.ts",
      "export const evaluated = true;\n",
      "feat: evaluated",
    );

    await expect(renderActualDiff(root, null, null)).resolves.toBe(
      "No committed task work unit is available for semantic evaluation.\n",
    );
    await expect(
      resolveEvaluatorDiffBase({
        gitRoot: root,
        evaluatedSha,
        baseRef: "refs/heads/does-not-exist",
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it("rejects an unresolved branch_pr base even when the evaluated commit is the repository root", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const rootSha = await commitPath(root, "README.md", "root\n", "chore: root commit");

    await expect(
      resolveEvaluatorDiffBase({
        gitRoot: root,
        evaluatedSha: rootSha,
        baseRef: null,
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
    await expect(
      resolveEvaluatorDiffBase({
        gitRoot: root,
        evaluatedSha: rootSha,
        baseRef: null,
        allowSingleCommitFallback: true,
      }),
    ).resolves.toBeNull();
  });

  it("freezes the durable verification record created through the supported verification path", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV16";
    await addTask(root, taskId);
    await commitPath(root, "src/evaluated.ts", "export const evaluated = true;\n", "feat: target");
    const command = await loadCommandContext({ cwd: root, rootOverride: root });
    await cmdVerifyParsed({
      ctx: command,
      cwd: root,
      rootOverride: root,
      taskId,
      state: "ok",
      by: "TESTER",
      note: "Focused evaluator checks passed.",
      details:
        "Command: bunx vitest run evaluator-run.command.test.ts\nResult: pass\nEvidence: 1 test file passed\nScope: evaluator evidence",
      quiet: true,
    });
    const verificationDir = path.join(root, `.agentplane/tasks/${taskId}/verification`);
    const [supportedRecordName] = await readdir(verificationDir);
    if (!supportedRecordName) throw new Error("Missing supported verification record.");
    const supportedRecord = JSON.parse(
      await readFile(path.join(verificationDir, supportedRecordName), "utf8"),
    ) as Record<string, unknown>;
    await writeFile(
      path.join(root, `.agentplane/tasks/${taskId}/verification/orphaned-after-transition.json`),
      `${JSON.stringify({
        schema_version: 1,
        kind: "task_verification_record",
        task_id: taskId,
        recorded_at: "2026-01-01T00:00:00.000Z",
        result: "ok",
        verifier: "INTERRUPTED",
        note: "The task transition did not persist.",
      })}\n`,
      "utf8",
    );
    await writeFile(
      path.join(root, `.agentplane/tasks/${taskId}/verification/incomplete-current-record.json`),
      `${JSON.stringify({
        ...supportedRecord,
        details:
          "Command: bunx vitest run evaluator-run.command.test.ts\nResult: pass\nScope: evaluator evidence",
      })}\n`,
      "utf8",
    );
    await writeFile(
      path.join(root, `.agentplane/tasks/${taskId}/verification/stale-implementation-record.json`),
      `${JSON.stringify({ ...supportedRecord, implementation_sha: "stale-implementation" })}\n`,
      "utf8",
    );
    await writeFile(
      path.join(root, `.agentplane/tasks/${taskId}/verification/stale-scope-record.json`),
      `${JSON.stringify({ ...supportedRecord, scope_digest: "sha256:stale-scope" })}\n`,
      "utf8",
    );
    await writeFile(
      path.join(root, `.agentplane/tasks/${taskId}/verification/copied-from-other-task.json`),
      `${JSON.stringify({ ...supportedRecord, task_id: "202605240900-OTHER" })}\n`,
      "utf8",
    );
    await writeFile(
      path.join(root, `.agentplane/tasks/${taskId}/verification/tampered-details-record.json`),
      `${JSON.stringify({
        ...supportedRecord,
        details: String(supportedRecord.details).replace("1 test file", "2 test files"),
      })}\n`,
      "utf8",
    );
    await writeFile(
      path.join(root, `.agentplane/tasks/${taskId}/verification/unsupported-schema-record.json`),
      `${JSON.stringify({ ...supportedRecord, schema_version: 2 })}\n`,
      "utf8",
    );

    const { prepared } = await prepareTypedReview(root, taskId);
    const verificationEvidence = prepared.work_order.evidence.filter(
      (entry) => entry.kind === "verification_log",
    );
    expect(verificationEvidence).toHaveLength(1);
    const [currentVerificationEvidence] = verificationEvidence;
    if (!currentVerificationEvidence) throw new Error("Missing frozen verification evidence.");
    const record = JSON.parse(
      await readFile(path.join(root, currentVerificationEvidence.path), "utf8"),
    ) as Record<string, unknown>;

    expect(currentVerificationEvidence.path).toMatch(
      new RegExp(`^\\.agentplane/tasks/${taskId}/verification/.+\\.json$`, "u"),
    );
    expect(currentVerificationEvidence.path).not.toContain("orphaned-after-transition.json");
    expect(currentVerificationEvidence.path).not.toContain("incomplete-current-record.json");
    expect(currentVerificationEvidence.path).not.toContain("stale-implementation-record.json");
    expect(currentVerificationEvidence.path).not.toContain("stale-scope-record.json");
    expect(currentVerificationEvidence.path).not.toContain("copied-from-other-task.json");
    expect(currentVerificationEvidence.path).not.toContain("tampered-details-record.json");
    expect(currentVerificationEvidence.path).not.toContain("unsupported-schema-record.json");
    expect(record).toMatchObject({
      kind: "task_verification_record",
      task_id: taskId,
      result: "ok",
      verifier: "TESTER",
    });
    expect(typeof record.implementation_sha).toBe("string");
    expect(record.scope_digest).toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(record.digest).toMatch(/^sha256:[a-f0-9]{64}$/u);
  });

  it("rejects stale evaluator work orders after the evaluated SHA advances", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV13";
    await addTask(root, taskId);
    await commitPath(
      root,
      "src/evaluated.ts",
      "export const version = 1;\n",
      "feat: initial target",
    );
    const { command, task, prepared } = await prepareTypedReview(root, taskId);
    await commitPath(root, "src/evaluated.ts", "export const version = 2;\n", "feat: newer target");

    await expect(
      applyEvaluatorSgrReview({
        ctx: command,
        task,
        workOrderPath: prepared.work_order_path,
        result: typedEvaluatorResult(prepared),
      }),
    ).rejects.toThrow("evaluated SHA changed");
  });

  it("rejects unfrozen evidence and mutation-shaped evaluator results before task state changes", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV14";
    await addTask(root, taskId);
    await commitPath(root, "src/evaluated.ts", "export const target = true;\n", "feat: target");
    const { command, task, prepared } = await prepareTypedReview(root, taskId);

    const unfrozen = typedEvaluatorResult(prepared, {
      findings: [
        {
          id: "unfrozen",
          severity: "high",
          summary: "Unfrozen evidence must not be accepted.",
          broken_invariant: "frozen evidence only",
          evidence_refs: [{ path: "src/not-frozen.ts" }],
        },
      ],
    });
    await expect(
      applyEvaluatorSgrReview({
        ctx: command,
        task,
        workOrderPath: prepared.work_order_path,
        result: unfrozen,
      }),
    ).rejects.toThrow("outside the frozen work order");

    await expect(
      applyEvaluatorSgrReview({
        ctx: command,
        task,
        workOrderPath: prepared.work_order_path,
        result: { ...typedEvaluatorResult(prepared), patch: "src/evaluated.ts" },
      }),
    ).rejects.toThrow("forbidden fields");

    const stored = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(stored.frontmatter.quality_review).toBeUndefined();
  });
});
