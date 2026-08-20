import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { canonicalizeJson } from "@agentplaneorg/core/tasks";
import { mkGitRepoRootWithBranch } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import { resolveLegacyVerificationInputIdentity } from "./task-verification-input.js";
import { assessLocalVerificationRecords } from "./task-verification-records.js";

const execFileAsync = promisify(execFile);
const TASK_ID = "T-V2";
const RECORDED_AT = "2026-08-10T00:00:00.000Z";
const VERIFY_STEPS = "Run focused verification. Expected: pass.";
const DETAILS =
  "Command: bun test\nResult: pass\nEvidence: focused tests passed\nScope: v2 receipt";

function sha256(value: string): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
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

function task(verifySteps = VERIFY_STEPS): TaskData {
  return {
    id: TASK_ID,
    title: "Verification v2",
    description: "Verification v2",
    status: "DOING",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: ["code"],
    verify: ["bun test"],
    verification: {
      state: "ok",
      attempts: 0,
      updated_at: RECORDED_AT,
      updated_by: "TESTER",
      note: "Verified content-addressed input.",
    },
    sections: { "Verify Steps": verifySteps },
  };
}

async function writeRecord(
  root: string,
  implementationSha: string,
  details = DETAILS,
  environment?: Parameters<typeof resolveLegacyVerificationInputIdentity>[0]["environment"],
): Promise<string> {
  const verificationInput = await resolveLegacyVerificationInputIdentity({
    gitRoot: root,
    workflowDir: ".agentplane/tasks",
    taskIds: [TASK_ID],
    targetSha: implementationSha,
    verifySteps: VERIFY_STEPS,
    workflowMode: "branch_pr",
    baseRef: "main",
    environment: environment ?? {
      platform: process.platform,
      architecture: process.arch,
      node_major: process.versions.node.split(".")[0] ?? process.versions.node,
      bun_major: process.versions.bun?.split(".")[0] ?? null,
    },
    verificationDetails: details,
  });
  if (!verificationInput) throw new Error("expected verification input");
  const record = {
    schema_version: 2,
    kind: "task_verification_record",
    task_id: TASK_ID,
    recorded_at: RECORDED_AT,
    verification_command: `agentplane verify ${TASK_ID} --ok --by TESTER`,
    result: "ok",
    verifier: "TESTER",
    note: "Verified content-addressed input.",
    details,
    implementation_sha: implementationSha,
    scope: VERIFY_STEPS,
    scope_digest: sha256(VERIFY_STEPS),
    input: verificationInput,
  };
  const recordPath = path.join(root, ".agentplane", "tasks", TASK_ID, "verification", "v2.json");
  await mkdir(path.dirname(recordPath), { recursive: true });
  await writeFile(
    recordPath,
    `${JSON.stringify({
      ...record,
      digest: sha256(JSON.stringify(canonicalizeJson(record))),
    })}\n`,
    "utf8",
  );
  return recordPath;
}

async function assess(root: string, currentTask: TaskData, evaluatedSha: string) {
  return await assessLocalVerificationRecords({
    taskRoot: path.join(root, ".agentplane", "tasks", TASK_ID),
    task: currentTask,
    evaluatedSha,
    targetContext: {
      gitRoot: root,
      workflowDir: ".agentplane/tasks",
      taskIds: [TASK_ID],
      workflowMode: "branch_pr",
      baseRef: "main",
    },
  });
}

describe("content-addressed verification records", () => {
  it("reports current, reusable lifecycle drift, and real implementation invalidation", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await commitPath(root, "package.json", '{"name":"verification-v2"}\n', "seed context");
    await execFileAsync("git", ["checkout", "-b", "task/verification-v2"], { cwd: root });
    const implementationSha = await commitPath(
      root,
      "src/feature.ts",
      "export const feature = true;\n",
      "implement feature",
    );
    await writeRecord(root, implementationSha);

    await expect(assess(root, task(), implementationSha)).resolves.toMatchObject({
      accepted: true,
      reason: "verification_current",
    });

    const lifecycleSha = await commitPath(
      root,
      `.agentplane/tasks/${TASK_ID}/README.md`,
      "lifecycle-only change\n",
      "record lifecycle",
    );
    await expect(assess(root, task(), lifecycleSha)).resolves.toMatchObject({
      accepted: true,
      reason: "verification_reused_equivalent_input",
    });

    const changedSha = await commitPath(
      root,
      "src/feature.ts",
      "export const feature = false;\n",
      "change implementation",
    );
    await expect(assess(root, task(), changedSha)).resolves.toMatchObject({
      accepted: false,
      reason: "verification_implementation_changed",
    });
  });

  it("reports Verify Steps drift without rerunning Git heuristics", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await commitPath(root, "package.json", '{"name":"verification-v2"}\n', "seed context");
    await execFileAsync("git", ["checkout", "-b", "task/verification-v2"], { cwd: root });
    const implementationSha = await commitPath(
      root,
      "src/feature.ts",
      "export const feature = true;\n",
      "implement feature",
    );
    await writeRecord(root, implementationSha);

    await expect(
      assess(root, task("Run focused verification and lint. Expected: pass."), implementationSha),
    ).resolves.toMatchObject({
      accepted: false,
      reason: "verification_steps_changed",
    });
  });

  it("keeps verification current when a different CLI runtime inspects the route", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await commitPath(root, "package.json", '{"name":"verification-v2"}\n', "seed context");
    await execFileAsync("git", ["checkout", "-b", "task/verification-v2"], { cwd: root });
    const implementationSha = await commitPath(
      root,
      "src/feature.ts",
      "export const feature = true;\n",
      "implement feature",
    );
    await writeRecord(root, implementationSha, DETAILS, {
      platform: process.platform,
      architecture: process.arch,
      node_major: "999",
      bun_major: "9",
    });

    await expect(assess(root, task(), implementationSha)).resolves.toMatchObject({
      accepted: true,
      reason: "verification_current",
    });

    const lifecycleSha = await commitPath(
      root,
      `.agentplane/tasks/${TASK_ID}/README.md`,
      "lifecycle-only change after verification\n",
      "record lifecycle after verification",
    );
    await expect(assess(root, task(), lifecycleSha)).resolves.toMatchObject({
      accepted: true,
      reason: "verification_reused_equivalent_input",
    });
  });

  it("reports missing structured check details separately from task metadata drift", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await commitPath(root, "package.json", '{"name":"verification-v2"}\n', "seed context");
    await execFileAsync("git", ["checkout", "-b", "task/verification-v2"], { cwd: root });
    const implementationSha = await commitPath(
      root,
      "src/feature.ts",
      "export const feature = true;\n",
      "implement feature",
    );
    await writeRecord(root, implementationSha, "Verification passed without structured details.");

    await expect(assess(root, task(), implementationSha)).resolves.toMatchObject({
      accepted: false,
      reason: "verification_details_missing",
    });
  });

  it("rejects a record after its referenced mutable evidence is replaced", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await commitPath(root, "package.json", '{"name":"verification-v2"}\n', "seed context");
    await execFileAsync("git", ["checkout", "-b", "task/verification-v2"], { cwd: root });
    const implementationSha = await commitPath(
      root,
      "src/feature.ts",
      "export const feature = true;\n",
      "implement feature",
    );
    const evidencePath = ".agentplane/cache/runtime-evidence.json";
    await mkdir(path.dirname(path.join(root, evidencePath)), { recursive: true });
    await writeFile(path.join(root, evidencePath), '{"result":"pass"}\n', "utf8");
    const details = [
      "Command: bun test",
      "Result: pass",
      `Evidence: ${evidencePath}#summary`,
      "Scope: mutable runtime evidence",
    ].join("\n");
    await writeRecord(root, implementationSha, details);

    await expect(assess(root, task(), implementationSha)).resolves.toMatchObject({
      accepted: true,
      reason: "verification_current",
    });
    await writeFile(path.join(root, evidencePath), '{"result":"replacement"}\n', "utf8");
    await expect(assess(root, task(), implementationSha)).resolves.toMatchObject({
      accepted: false,
      reason: "verification_evidence_changed",
    });
  });
});
