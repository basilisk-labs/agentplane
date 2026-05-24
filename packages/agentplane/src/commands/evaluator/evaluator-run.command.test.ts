import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
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

describe("evaluator run command", () => {
  it("parses structured review evidence and findings as repeatable fields", () => {
    const { parsed } = parseCommandArgv(evaluatorRunSpec, [
      "T-1",
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
    expect(() => parseCommandArgv(evaluatorRunSpec, ["T-1"])).toThrow(/Provide --verdict/);
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

    const { stdout: findStdout } = await execFileAsync(
      "find",
      [`.agentplane/tasks/${taskId}/quality`, "-name", "quality-report.json", "-print"],
      { cwd: root },
    );
    const reportPaths = findStdout.trim().split("\n");
    expect(reportPaths).toHaveLength(1);
    const report = JSON.parse(await readFile(path.join(root, reportPaths[0] ?? ""), "utf8")) as {
      evaluated_sha: string | null;
    };
    expect(report.evaluated_sha).toBe(implementationSha);
  });
});
