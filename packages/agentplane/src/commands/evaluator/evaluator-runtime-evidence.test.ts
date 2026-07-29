import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { loadEvaluatorCatalog } from "../../evaluators/catalog.js";
import { loadCommandContext, loadTaskFromContext } from "../shared/task-backend.js";
import { cmdVerifyParsed } from "../task/verify-record.js";
import { cmdTaskAdd } from "../workflow.js";
import { prepareEvaluatorReview } from "./evaluator-review-usecase.js";

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

async function commitPath(root: string, relPath: string): Promise<void> {
  const target = path.join(root, relPath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, "export const evaluated = true;\n", "utf8");
  await execFileAsync("git", ["add", "--", relPath], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "feat: target"], { cwd: root });
}

async function commitTaskArtifacts(root: string, taskId: string, message: string): Promise<string> {
  await execFileAsync("git", ["add", "--", `.agentplane/tasks/${taskId}`], { cwd: root });
  await execFileAsync("git", ["commit", "-m", message], { cwd: root });
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  return stdout.trim();
}

describe("evaluator runtime evidence", () => {
  it("freezes verified local runtime evidence without widening EVALUATOR file access", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV17";
    const liveTaskId = "202605240901-LIVE01";
    await addTask(root, taskId);
    await commitPath(root, "src/evaluated.ts");
    const implementationEvidence = `.agentplane/cache/live-proof/.agentplane/tasks/${liveTaskId}/supervision/implementation-evidence.json`;
    const supervisorJournal = `.agentplane/cache/live-proof/.git/agentplane/supervisor/episodes/${liveTaskId}/journal.json`;
    await mkdir(path.dirname(path.join(root, implementationEvidence)), { recursive: true });
    await writeFile(
      path.join(root, implementationEvidence),
      `${JSON.stringify({
        schema_version: 1,
        kind: "direct_task_implementation_evidence",
        task_id: liveTaskId,
        implementation_commit: "live-proof-commit",
      })}\n`,
      "utf8",
    );
    await mkdir(path.dirname(path.join(root, supervisorJournal)), { recursive: true });
    await writeFile(
      path.join(root, supervisorJournal),
      `${JSON.stringify({
        task_id: liveTaskId,
        status: "running",
        cursor: { phase: "ready", operation_key: null },
        usage: { episodes: 2, agent_runs: 2 },
        digest: `sha256:${"a".repeat(64)}`,
      })}\n`,
      "utf8",
    );
    const command = await loadCommandContext({ cwd: root, rootOverride: root });
    await cmdVerifyParsed({
      ctx: command,
      cwd: root,
      rootOverride: root,
      taskId,
      state: "ok",
      by: "TESTER",
      note: "Finalized direct golden path passed.",
      details: [
        `Command: node packages/agentplane/bin/agentplane.js task run ${liveTaskId} --json`,
        "Result: pass",
        `Evidence: ${implementationEvidence} | ${supervisorJournal}`,
        "Scope: finalized direct golden path with CLI-owned verification and evaluation.",
      ].join("\n"),
      quiet: true,
    });
    const task = await loadTaskFromContext({ ctx: command, taskId });
    const evaluator = (
      await loadEvaluatorCatalog({ projectRoot: root, includeBuiltin: true })
    ).find((entry) => entry.id === "recovery-context");
    if (!evaluator) throw new Error("Missing recovery-context evaluator fixture.");
    const prepared = await prepareEvaluatorReview({
      ctx: command,
      task,
      evaluator,
      provenance: "evaluator_supplied",
    });
    const runtimeEvidence = prepared.work_order.evidence
      .filter((entry) => entry.kind === "runtime_evidence")
      .map((entry) => entry.path);
    expect(runtimeEvidence).toEqual([implementationEvidence, supervisorJournal].toSorted());
    const observedEvidence = prepared.work_order.evidence.find(
      (entry) => entry.kind === "observed_checks",
    );
    if (!observedEvidence) throw new Error("Missing observed checks evidence.");
    const observed = JSON.parse(
      await readFile(path.join(root, observedEvidence.path), "utf8"),
    ) as Record<string, unknown>;
    expect(observed.runtime_evidence).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: implementationEvidence }),
        expect.objectContaining({ path: supervisorJournal }),
      ]),
    );
    expect(observed.direct_supervision).toMatchObject({
      task_id: liveTaskId,
      source: "verified_runtime_evidence",
      source_path: implementationEvidence,
    });
    expect(observed.runner_history).toEqual([
      expect.objectContaining({
        task_id: liveTaskId,
        source: "verified_runtime_evidence",
        path: supervisorJournal,
      }),
    ]);
  });

  it("keeps evidence frozen when verification follows lifecycle-only task artifacts", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV18";
    const liveTaskId = "202605240901-LIVE02";
    await addTask(root, taskId);
    await commitPath(root, "src/evaluated.ts");
    const { stdout: sourceShaOutput } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const sourceSha = sourceShaOutput.trim();
    const lifecycleArtifact = path.join(
      root,
      `.agentplane/tasks/${taskId}/quality/prior/quality-report.json`,
    );
    await mkdir(path.dirname(lifecycleArtifact), { recursive: true });
    await writeFile(lifecycleArtifact, "{}\n", "utf8");
    await commitTaskArtifacts(root, taskId, "chore: record prior evaluator artifacts");

    const implementationEvidence = `.agentplane/cache/lifecycle-proof/.agentplane/tasks/${liveTaskId}/supervision/implementation-evidence.json`;
    const supervisorJournal = `.agentplane/cache/lifecycle-proof/.git/agentplane/supervisor/episodes/${liveTaskId}/journal.json`;
    await mkdir(path.dirname(path.join(root, implementationEvidence)), { recursive: true });
    await writeFile(
      path.join(root, implementationEvidence),
      `${JSON.stringify({
        schema_version: 1,
        kind: "direct_task_implementation_evidence",
        task_id: liveTaskId,
        implementation_commit: "live-proof-commit",
      })}\n`,
      "utf8",
    );
    await mkdir(path.dirname(path.join(root, supervisorJournal)), { recursive: true });
    await writeFile(
      path.join(root, supervisorJournal),
      `${JSON.stringify({
        task_id: liveTaskId,
        status: "running",
        cursor: { phase: "ready", operation_key: null },
        usage: { episodes: 2, agent_runs: 2 },
        digest: `sha256:${"b".repeat(64)}`,
      })}\n`,
      "utf8",
    );

    const command = await loadCommandContext({ cwd: root, rootOverride: root });
    await cmdVerifyParsed({
      ctx: command,
      cwd: root,
      rootOverride: root,
      taskId,
      state: "ok",
      by: "TESTER",
      note: "Lifecycle descendant verification passed.",
      details: [
        `Command: node packages/agentplane/bin/agentplane.js task run ${liveTaskId} --json`,
        "Result: pass",
        `Evidence: ${implementationEvidence} | ${supervisorJournal}`,
        "Scope: finalized direct golden path with CLI-owned verification and evaluation.",
      ].join("\n"),
      quiet: true,
    });
    await commitTaskArtifacts(root, taskId, "test: record lifecycle descendant verification");

    const task = await loadTaskFromContext({ ctx: command, taskId });
    const evaluator = (
      await loadEvaluatorCatalog({ projectRoot: root, includeBuiltin: true })
    ).find((entry) => entry.id === "recovery-context");
    if (!evaluator) throw new Error("Missing recovery-context evaluator fixture.");
    const prepared = await prepareEvaluatorReview({
      ctx: command,
      task: {
        ...task,
        quality_review: {
          state: "pass",
          provenance: "evaluator_supplied",
          updated_at: "2026-05-24T09:00:00.000Z",
          updated_by: "EVALUATOR",
          note: "Reviewed implementation passed.",
          evaluated_sha: sourceSha,
          blueprint_digest: "fixture-blueprint",
          evidence_refs: [],
          findings: ["Reviewed implementation."],
        },
      },
      evaluator,
      provenance: "evaluator_supplied",
    });
    const observedEvidence = prepared.work_order.evidence.find(
      (entry) => entry.kind === "observed_checks",
    );
    if (!observedEvidence) throw new Error("Missing observed checks evidence.");
    const observed = JSON.parse(
      await readFile(path.join(root, observedEvidence.path), "utf8"),
    ) as Record<string, unknown>;
    expect(observed.verification_records).toEqual([
      expect.objectContaining({ path: expect.any(String) }),
    ]);
    expect(observed.runtime_evidence).toEqual(
      expect.arrayContaining([expect.objectContaining({ path: implementationEvidence })]),
    );
  });
});
