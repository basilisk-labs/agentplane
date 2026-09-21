import { execFile } from "node:child_process";
import { appendFile, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/release/check-task-registry-ready.mjs");
const temps: string[] = [];

async function makeRepo(
  tasks: {
    id: string;
    status: string;
    title?: string;
    taskKind?: string;
    tags?: string[];
    mergedPr?: boolean;
    dependsOn?: string[];
  }[],
) {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-task-registry-ready-"));
  temps.push(root);
  for (const task of tasks) {
    const dir = path.join(root, ".agentplane", "tasks", task.id);
    await mkdir(dir, { recursive: true });
    await writeFile(
      path.join(dir, "README.md"),
      [
        "---",
        `id: ${task.id}`,
        `title: ${task.title ?? "Test task"}`,
        `status: ${task.status}`,
        ...(task.taskKind ? [`task_kind: ${task.taskKind}`] : []),
        task.dependsOn?.length
          ? ["depends_on:", ...task.dependsOn.map((dependency) => `  - "${dependency}"`)].join("\n")
          : "depends_on: []",
        "tags:",
        ...(task.tags ?? [task.title?.startsWith("Release AgentPlane") ? "release" : "code"]).map(
          (tag) => `  - "${tag}"`,
        ),
        "---",
        "",
      ].join("\n"),
      "utf8",
    );
    if (task.mergedPr) {
      const prDir = path.join(dir, "pr");
      await mkdir(prDir, { recursive: true });
      await writeFile(
        path.join(prDir, "meta.json"),
        `${JSON.stringify(
          {
            schema_version: 1,
            task_id: task.id,
            status: "MERGED",
            pr_number: 4050,
            merge_commit: "abcdef1234567890abcdef1234567890abcdef12",
          },
          null,
          2,
        )}\n`,
        "utf8",
      );
    }
  }
  await mkdir(path.join(root, "packages", "agentplane"), { recursive: true });
  await writeFile(
    path.join(root, "packages", "agentplane", "package.json"),
    `${JSON.stringify({ name: "agentplane", version: "0.6.3" }, null, 2)}\n`,
    "utf8",
  );
  return root;
}

async function writeReleasePlan(
  root: string,
  plan: {
    rootTaskId: string;
    requiredTaskIds: string[];
    optionalTaskIds?: string[];
  },
) {
  const planDir = path.join(root, "docs", "internal");
  await mkdir(planDir, { recursive: true });
  await writeFile(
    path.join(planDir, "v0.7-release-task-closure.json"),
    `${JSON.stringify(
      {
        schema_version: 1,
        release: "0.7.0",
        root_task_id: plan.rootTaskId,
        required_task_ids: plan.requiredTaskIds,
        optional_tasks: (plan.optionalTaskIds ?? []).map((taskId) => ({
          task_id: taskId,
          reason: "Optional prerelease qualification.",
        })),
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
}

async function runRegistryCheck(root: string, args: string[] = []) {
  return execFileAsync("node", [SCRIPT_PATH, ...args], { cwd: root }).then(
    () => ({ ok: true as const, stderr: "" }),
    (error: unknown) => {
      const stderr =
        typeof error === "object" &&
        error !== null &&
        "stderr" in error &&
        typeof (error as { stderr?: unknown }).stderr === "string"
          ? (error as { stderr: string }).stderr
          : "";
      return { ok: false as const, stderr };
    },
  );
}

async function initializeGitRepository(root: string) {
  await execFileAsync("git", ["init", "-b", "main"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "AgentPlane Tests"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "tests@agentplane.invalid"], { cwd: root });
  await execFileAsync("git", ["add", "."], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "test fixture"], { cwd: root });
  const result = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  return String(result.stdout).trim();
}

async function writeCurrentImplementationEvidence(root: string, taskId: string, commit: string) {
  const evidenceDir = path.join(root, ".agentplane", "tasks", taskId, "supervision");
  await mkdir(evidenceDir, { recursive: true });
  await writeFile(
    path.join(evidenceDir, "implementation-evidence.json"),
    `${JSON.stringify(
      {
        schema_version: 1,
        kind: "direct_task_implementation_evidence",
        task_id: taskId,
        execution_base_commit: commit,
        implementation_commit: commit,
        checks: [
          { id: "committed-diff-check", result: "pass", stdout: [] },
          { id: "staged-diff-check", result: "pass", stdout: [] },
          {
            id: "commit-paths",
            result: "pass",
            stdout: ["M\\tscripts/release/check-task-registry-ready.mjs"],
          },
          { id: "final-repository-status", result: "pass", stdout: [] },
        ],
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
}

async function writeReleaseScopeManifest(root: string, exclusions: Record<string, unknown>[]) {
  const manifestDir = path.join(root, "scripts", "release");
  await mkdir(manifestDir, { recursive: true });
  await writeFile(
    path.join(manifestDir, "release-scope-exclusions.json"),
    `${JSON.stringify({ schema_version: 1, exclusions }, null, 2)}\n`,
    "utf8",
  );
}

afterEach(async () => {
  while (temps.length > 0) {
    const dir = temps.pop();
    if (dir) await rm(dir, { recursive: true, force: true });
  }
});

describe("check-task-registry-ready script", () => {
  it("passes when no local task is DOING", async () => {
    const root = await makeRepo([{ id: "202605190001-ABC123", status: "DONE" }]);

    await expect(execFileAsync("node", [SCRIPT_PATH], { cwd: root })).resolves.toBeDefined();
  });

  it("fails with remediation when a local task is DOING", async () => {
    const root = await makeRepo([{ id: "202605190001-ABC123", status: "DOING" }]);

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("DOING task blocks release readiness");
    expect(result.stderr).toContain(
      "finish, close, or explicitly move it out of the release scope",
    );
  });

  it("fails with explicit remediation when a branch_pr task is merged pending close", async () => {
    const root = await makeRepo([{ id: "202605190001-ABC123", status: "DOING", mergedPr: true }]);

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("MERGED_PENDING_CLOSE task blocks release readiness");
    expect(result.stderr).toContain("wait for hosted close to record DONE");
    expect(result.stderr).not.toContain("DOING task blocks release readiness");
  });

  it("allows the current version release task only when explicitly requested", async () => {
    const root = await makeRepo([
      { id: "202605190001-ABC123", status: "DOING", title: "Release AgentPlane v0.6.3" },
    ]);

    await expect(
      execFileAsync("node", [SCRIPT_PATH, "--allow-active-release-task"], { cwd: root }),
    ).resolves.toBeDefined();
  });

  it("allows canonical release metadata without requiring the legacy title", async () => {
    const root = await makeRepo([
      {
        id: "202605190001-ABC123",
        status: "DOING",
        title: "Publish and verify AgentPlane 0.6.3",
        taskKind: "release",
        tags: ["release", "v0.6.3"],
      },
    ]);

    await expect(
      execFileAsync("node", [SCRIPT_PATH, "--allow-active-release-task"], { cwd: root }),
    ).resolves.toBeDefined();
  });

  it("rejects canonical release metadata for another version", async () => {
    const root = await makeRepo([
      {
        id: "202605190001-ABC123",
        status: "DOING",
        title: "Publish and verify AgentPlane 0.6.2",
        taskKind: "release",
        tags: ["release", "v0.6.2"],
      },
    ]);

    const result = await runRegistryCheck(root, ["--allow-active-release-task"]);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("DOING task blocks release readiness");
  });

  it("does not allow unrelated DOING tasks that merely mention the release version", async () => {
    const root = await makeRepo([
      { id: "202605190001-ABC123", status: "DOING", title: "Fix release notes for v0.6.3" },
    ]);

    const result = await execFileAsync("node", [SCRIPT_PATH, "--allow-active-release-task"], {
      cwd: root,
    }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("DOING task blocks release readiness");
  });

  it("allows only the current Git-proven release-readiness implementation task", async () => {
    const taskId = "202605190001-SELF01";
    const root = await makeRepo([
      {
        id: taskId,
        status: "DOING",
        taskKind: "code",
        tags: ["release-readiness"],
      },
    ]);
    const commit = await initializeGitRepository(root);
    await execFileAsync("git", ["branch", "-m", `task/${taskId}/release-readiness`], { cwd: root });
    await writeCurrentImplementationEvidence(root, taskId, commit);

    await expect(
      execFileAsync("node", [SCRIPT_PATH, "--allow-active-release-task"], { cwd: root }),
    ).resolves.toBeDefined();
    const withoutExplicitAllowance = await runRegistryCheck(root);
    expect(withoutExplicitAllowance.ok).toBe(false);
    expect(withoutExplicitAllowance.stderr).toContain("DOING task blocks release readiness");
  });

  it("rejects stale implementation evidence for the current release-readiness task", async () => {
    const taskId = "202605190001-SELF02";
    const root = await makeRepo([
      {
        id: taskId,
        status: "DOING",
        taskKind: "code",
        tags: ["release-readiness"],
      },
    ]);
    const commit = await initializeGitRepository(root);
    await execFileAsync("git", ["branch", "-m", `task/${taskId}/release-readiness`], { cwd: root });
    await writeCurrentImplementationEvidence(
      root,
      taskId,
      "ffffffffffffffffffffffffffffffffffffffff",
    );

    const result = await runRegistryCheck(root, ["--allow-active-release-task"]);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("DOING task blocks release readiness");
    expect(commit).toMatch(/^[0-9a-f]{40}$/u);
  });

  it("still blocks open release observations on the allowed active release task", async () => {
    const root = await makeRepo([
      { id: "202605190001-ABC123", status: "DOING", title: "Release AgentPlane v0.6.3" },
    ]);
    await appendFile(
      path.join(root, ".agentplane", "tasks", "202605190001-ABC123", "observations.jsonl"),
      `${JSON.stringify({
        schema_version: "0.1",
        id: "obs-release-risk",
        task_id: "202605190001-ABC123",
        severity: "high",
        summary: "Release blocker",
        recommended_action: { type: "none" },
        status: "open",
      })}\n`,
      "utf8",
    );

    const result = await execFileAsync("node", [SCRIPT_PATH, "--allow-active-release-task"], {
      cwd: root,
    }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("obs-release-risk requires severity triage");
  });

  it("fails release readiness on open medium actionable observations", async () => {
    const root = await makeRepo([{ id: "202605190001-ABC123", status: "DONE" }]);
    await appendFile(
      path.join(root, ".agentplane", "tasks", "202605190001-ABC123", "observations.jsonl"),
      `${JSON.stringify({
        schema_version: "0.1",
        id: "obs-release-gate",
        task_id: "202605190001-ABC123",
        created_at: "2026-05-20T00:00:00.000Z",
        author: "AGENT",
        phase: "verification",
        kind: "issue_candidate",
        severity: "medium",
        summary: "Release should not hide actionable task observations.",
        recommended_action: { type: "github_issue", title: "Triage before release" },
        status: "open",
      })}\n`,
      "utf8",
    );

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("obs-release-gate requires github_issue triage");
  });

  it("blocks open high observations even with action none", async () => {
    const root = await makeRepo([{ id: "202605190001-ABC123", status: "DONE" }]);
    await appendFile(
      path.join(root, ".agentplane", "tasks", "202605190001-ABC123", "observations.jsonl"),
      `${JSON.stringify({
        schema_version: "0.1",
        id: "obs-severe-risk",
        task_id: "202605190001-ABC123",
        created_at: "2026-05-20T00:00:00.000Z",
        author: "AGENT",
        phase: "verification",
        kind: "risk",
        severity: "high",
        summary: "Severe open risk must block release even before action routing is known.",
        recommended_action: { type: "none" },
        status: "open",
      })}\n`,
      "utf8",
    );

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root }).then(
      () => ({ ok: true as const, stderr: "" }),
      (error: unknown) => {
        const stderr =
          typeof error === "object" &&
          error !== null &&
          "stderr" in error &&
          typeof (error as { stderr?: unknown }).stderr === "string"
            ? (error as { stderr: string }).stderr
            : "";
        return { ok: false as const, stderr };
      },
    );

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("obs-severe-risk requires severity triage");
  });

  it("allows open medium observations with action none", async () => {
    const root = await makeRepo([{ id: "202605190001-ABC123", status: "DONE" }]);
    await appendFile(
      path.join(root, ".agentplane", "tasks", "202605190001-ABC123", "observations.jsonl"),
      `${JSON.stringify({
        schema_version: "0.1",
        id: "obs-release-note",
        task_id: "202605190001-ABC123",
        created_at: "2026-05-20T00:00:00.000Z",
        author: "AGENT",
        phase: "verification",
        kind: "decision",
        severity: "medium",
        summary: "No downstream action required.",
        recommended_action: { type: "none" },
        status: "open",
      })}\n`,
      "utf8",
    );

    await expect(execFileAsync("node", [SCRIPT_PATH], { cwd: root })).resolves.toBeDefined();
  });

  it("accepts and reports Git-proven published, merged, and superseded projections", async () => {
    const publishedTaskId = "202605190001-PUB001";
    const mergedTaskId = "202605190002-MRG001";
    const supersededTaskId = "202605190003-OLD001";
    const replacementTaskId = "202605190004-NEW001";
    const root = await makeRepo([
      {
        id: publishedTaskId,
        status: "DOING",
        taskKind: "release",
        tags: ["release", "v0.6.2"],
      },
      { id: mergedTaskId, status: "DOING" },
      { id: supersededTaskId, status: "DOING" },
      { id: replacementTaskId, status: "DONE" },
    ]);
    const commit = await initializeGitRepository(root);
    await execFileAsync("git", ["tag", "v0.6.2", commit], { cwd: root });
    await writeReleaseScopeManifest(root, [
      {
        task_id: publishedTaskId,
        evidence_kind: "published_tag",
        reason: "The historical release is published from the tagged commit.",
        git_ref: commit,
        tag: "v0.6.2",
      },
      {
        task_id: mergedTaskId,
        evidence_kind: "merged_commit",
        reason: "The implementation is present on the release ancestry.",
        git_ref: commit,
      },
      {
        task_id: supersededTaskId,
        evidence_kind: "superseded_by_task",
        reason: "The completed replacement contains the canonical implementation.",
        git_ref: commit,
        replacement_task_id: replacementTaskId,
      },
    ]);

    const result = await execFileAsync("node", [SCRIPT_PATH], { cwd: root });

    expect(result.stdout).toContain("release_scope_exclusions=3");
    expect(result.stdout).toContain(`${publishedTaskId} (published_tag at ${commit})`);
    expect(result.stdout).toContain(`${mergedTaskId} (merged_commit at ${commit})`);
    expect(result.stdout).toContain(`${supersededTaskId} (superseded_by_task at ${commit})`);
  });

  it("fails closed for malformed exclusion fields", async () => {
    const taskId = "202605190001-BAD001";
    const root = await makeRepo([{ id: taskId, status: "DOING" }]);
    const commit = await initializeGitRepository(root);
    await writeReleaseScopeManifest(root, [
      {
        task_id: taskId,
        evidence_kind: "merged_commit",
        reason: "Malformed evidence must not be accepted.",
        git_ref: commit,
        bypass: true,
      },
    ]);

    const result = await runRegistryCheck(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("has unknown fields: bypass");
  });

  it("fails closed for missing Git evidence", async () => {
    const taskId = "202605190001-MISS01";
    const root = await makeRepo([{ id: taskId, status: "DOING" }]);
    await initializeGitRepository(root);
    await writeReleaseScopeManifest(root, [
      {
        task_id: taskId,
        evidence_kind: "merged_commit",
        reason: "Missing evidence must not be accepted.",
        git_ref: "ffffffffffffffffffffffffffffffffffffffff",
      },
    ]);

    const result = await runRegistryCheck(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("git_ref does not resolve");
  });

  it("fails closed for a commit outside the release ancestry", async () => {
    const taskId = "202605190001-SIDE01";
    const root = await makeRepo([{ id: taskId, status: "DOING" }]);
    await initializeGitRepository(root);
    const treeResult = await execFileAsync("git", ["rev-parse", "HEAD^{tree}"], { cwd: root });
    const tree = String(treeResult.stdout).trim();
    const unrelatedCommitResult = await execFileAsync(
      "git",
      ["commit-tree", tree, "-m", "unrelated evidence"],
      { cwd: root },
    );
    const unrelatedCommit = String(unrelatedCommitResult.stdout).trim();
    await writeReleaseScopeManifest(root, [
      {
        task_id: taskId,
        evidence_kind: "merged_commit",
        reason: "Unrelated evidence must not be accepted.",
        git_ref: unrelatedCommit,
      },
    ]);

    const result = await runRegistryCheck(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("is not an ancestor of HEAD");
  });

  it("fails closed for an unknown excluded task", async () => {
    const root = await makeRepo([{ id: "202605190001-KNOWN1", status: "DONE" }]);
    const commit = await initializeGitRepository(root);
    await writeReleaseScopeManifest(root, [
      {
        task_id: "202605190002-UNKN01",
        evidence_kind: "merged_commit",
        reason: "Unknown task evidence must not be accepted.",
        git_ref: commit,
      },
    ]);

    const result = await runRegistryCheck(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("references unknown task 202605190002-UNKN01");
  });

  it("fails closed when a superseding task is not DONE", async () => {
    const taskId = "202605190001-OLD001";
    const replacementTaskId = "202605190002-NEW001";
    const root = await makeRepo([
      { id: taskId, status: "DOING" },
      { id: replacementTaskId, status: "DOING" },
    ]);
    const commit = await initializeGitRepository(root);
    await writeReleaseScopeManifest(root, [
      {
        task_id: taskId,
        evidence_kind: "superseded_by_task",
        reason: "An incomplete replacement must not be accepted.",
        git_ref: commit,
        replacement_task_id: replacementTaskId,
      },
    ]);

    const result = await runRegistryCheck(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain(`replacement task ${replacementTaskId} is not DONE at HEAD`);
  });

  it("accepts a fully classified release closure and a disconnected declared optional task", async () => {
    const rootTaskId = "202605190001-ROOT01";
    const gateTaskId = "202605190002-GATE01";
    const rf02TaskId = "202605190003-RF0200";
    const rf20TaskId = "202605190004-RF2000";
    const optionalTaskId = "202605190005-OPT001";
    const root = await makeRepo([
      { id: rootTaskId, status: "TODO", dependsOn: [gateTaskId] },
      { id: gateTaskId, status: "DONE", dependsOn: [rf02TaskId, rf20TaskId] },
      { id: rf02TaskId, status: "DONE" },
      { id: rf20TaskId, status: "DONE" },
      { id: optionalTaskId, status: "DONE" },
    ]);
    await writeReleasePlan(root, {
      rootTaskId,
      requiredTaskIds: [gateTaskId, rf02TaskId, rf20TaskId],
      optionalTaskIds: [optionalTaskId],
    });

    await expect(execFileAsync("node", [SCRIPT_PATH], { cwd: root })).resolves.toBeDefined();
  });

  it("fails closed when the v0.7 roadmap exists without its release closure contract", async () => {
    const root = await makeRepo([{ id: "202605190001-ROOT01", status: "DONE" }]);
    const planDir = path.join(root, "docs", "internal");
    await mkdir(planDir, { recursive: true });
    await writeFile(path.join(planDir, "v0.7-refactor-plan.md"), "# AgentPlane 0.7 plan\n", "utf8");

    const result = await runRegistryCheck(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("release plan is missing");
  });

  it("names RF-02 and RF-20 when their release dependency edges are removed", async () => {
    const rootTaskId = "202605190001-ROOT01";
    const gateTaskId = "202605190002-GATE01";
    const rf02TaskId = "202605190003-RF0200";
    const rf20TaskId = "202605190004-RF2000";
    const root = await makeRepo([
      { id: rootTaskId, status: "TODO", dependsOn: [gateTaskId] },
      { id: gateTaskId, status: "DONE" },
      { id: rf02TaskId, status: "DONE" },
      { id: rf20TaskId, status: "DONE" },
    ]);
    await writeReleasePlan(root, {
      rootTaskId,
      requiredTaskIds: [gateTaskId, rf02TaskId, rf20TaskId],
    });

    const result = await runRegistryCheck(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain(`required task ${rf02TaskId} is not an ancestor`);
    expect(result.stderr).toContain(`required task ${rf20TaskId} is not an ancestor`);
  });

  it("reports release cycles and unknown dependencies with exact task ids", async () => {
    const rootTaskId = "202605190001-ROOT01";
    const gateTaskId = "202605190002-GATE01";
    const cycleTaskId = "202605190003-CYCLE1";
    const unknownTaskId = "202605190099-MISS01";
    const root = await makeRepo([
      { id: rootTaskId, status: "TODO", dependsOn: [gateTaskId] },
      { id: gateTaskId, status: "DONE", dependsOn: [cycleTaskId, unknownTaskId] },
      { id: cycleTaskId, status: "DONE", dependsOn: [gateTaskId] },
    ]);
    await writeReleasePlan(root, {
      rootTaskId,
      requiredTaskIds: [gateTaskId, cycleTaskId],
    });

    const result = await runRegistryCheck(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain(
      `release dependency cycle: ${gateTaskId} -> ${cycleTaskId} -> ${gateTaskId}`,
    );
    expect(result.stderr).toContain(`unknown dependency ${gateTaskId} -> ${unknownTaskId}`);
  });

  it("rejects an optional task that the release root requires in practice", async () => {
    const rootTaskId = "202605190001-ROOT01";
    const optionalTaskId = "202605190002-OPT001";
    const root = await makeRepo([
      { id: rootTaskId, status: "TODO", dependsOn: [optionalTaskId] },
      { id: optionalTaskId, status: "DONE" },
    ]);
    await writeReleasePlan(root, {
      rootTaskId,
      requiredTaskIds: [],
      optionalTaskIds: [optionalTaskId],
    });

    const result = await runRegistryCheck(root);

    expect(result.ok).toBe(false);
    expect(result.stderr).toContain(`optional task ${optionalTaskId} is required by release root`);
  });
});
