import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { readTask } from "@agentplaneorg/core/tasks";
import { mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { parseCommandArgv } from "../../cli/spec/parse.js";
import { cmdTaskAdd } from "../workflow.js";

import { runEvaluatorRun } from "./evaluator.command.js";
import { evaluatorRunSpec } from "./evaluator.spec.js";

const execFileAsync = promisify(execFile);

async function addTask(root: string, taskId: string): Promise<void> {
  await cmdTaskAdd({
    cwd: root,
    taskIds: [taskId],
    title: "Task",
    description: "Desc",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    tags: ["nodejs"],
    dependsOn: [],
    verify: [],
    commentAuthor: null,
    commentBody: null,
  });
}

async function commitPath(
  root: string,
  relPath: string,
  content: string,
  message: string,
): Promise<string> {
  const target = path.join(root, relPath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
  await execFileAsync("git", ["add", "--", relPath], { cwd: root });
  await execFileAsync("git", ["commit", "-m", message], { cwd: root });
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  return stdout.trim();
}

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

describe("evaluator run command", () => {
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

  it("records the last non-task-artifact commit as evaluated_sha", async () => {
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
    await commitPath(
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

    expect(await readEvaluatedSha(root, taskId)).toBe(implementationSha);
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
});
