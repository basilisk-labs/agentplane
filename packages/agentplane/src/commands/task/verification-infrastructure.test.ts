import { mkdtemp, readFile, rm, symlink } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, expect, it, vi } from "vitest";
import * as finalization from "./direct-task-finalization.js";
import * as backend from "../shared/task-backend.js";
import {
  prepareInfrastructureVerification,
  prepareInfrastructureVerificationForCheckout,
  isInfrastructureVerification,
} from "./verification-infrastructure.js";
import { runDirectTaskVerification } from "./direct-task-verification.js";

const roots: string[] = [];
afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-verification-retry-"));
  roots.push(root);
  vi.spyOn(backend, "resolveCommandGitCommonDir").mockResolvedValue(root);
  const command = {
    resolvedProject: { gitRoot: root },
    config: { paths: { workflow_dir: ".agentplane/tasks" } },
  } as never;
  const options = {
    command,
    task_id: "T-RETRY",
    implementation_commit: "a".repeat(40),
    identity: { source: "a", commands: ["bun test"] },
    source_dirty: () => Promise.resolve(false),
  };
  const run = async (failure: boolean) =>
    runDirectTaskVerification({
      command,
      task: { verify: ["bun test"] },
      task_id: options.task_id,
      cwd: root,
      retain_infrastructure_failure: await prepareInfrastructureVerification(options),
      run_process: vi.fn().mockImplementation(() => {
        if (failure) throw Object.assign(new Error("disk full"), { code: "ENOSPC" });
        return Promise.resolve({ exitCode: 0, stdout: "1 pass", stderr: "" });
      }),
    });
  return { root, options, run };
}

it("retains a failed check outside the workspace and retries without a semantic result or source edit", async () => {
  const { root, run } = await fixture();
  const failed = await run(true);
  expect(isInfrastructureVerification(failed)).toBe(true);
  expect(failed.artifact_path).toContain("verification-retries/T-RETRY");
  const original = await readFile(failed.artifact_path, "utf8");
  await expect(
    readFile(path.join(root, ".agentplane/tasks/T-RETRY/supervision/declared-checks.json")),
  ).rejects.toMatchObject({ code: "ENOENT" });
  const retried = await run(false);
  expect(retried.status).toBe("passed");
  expect(await readFile(failed.artifact_path, "utf8")).toBe(original);
});

it("bounds infrastructure attempts and rejects changed source or contract", async () => {
  const { options, run } = await fixture();
  await run(true);
  await expect(
    prepareInfrastructureVerification({ ...options, source_dirty: () => Promise.resolve(true) }),
  ).rejects.toThrow("unchanged source");
  await expect(
    prepareInfrastructureVerification({ ...options, identity: { commands: ["bun run check"] } }),
  ).rejects.toThrow("unchanged verification contract");
  await run(true);
  await run(true);
  await expect(run(false)).rejects.toThrow("budget exhausted");
});

it("does not classify assertion text or an unknown failed check as infrastructure", async () => {
  const { root, options } = await fixture();
  const result = await runDirectTaskVerification({
    command: options.command,
    task: { verify: ["bun test"] },
    task_id: options.task_id,
    cwd: root,
    retain_infrastructure_failure: await prepareInfrastructureVerification(options),
    run_process: vi.fn().mockResolvedValue({
      exitCode: 1,
      stdout: "assertion: ENOSPC",
      stderr: "No space left on device",
    }),
  });
  expect(result.status).toBe("failed");
  expect(isInfrastructureVerification(result)).toBe(false);
  expect(result.artifact_path).toContain("supervision/declared-checks.json");
});

it("rejects a symlinked retry receipt", async () => {
  const { options, run, root } = await fixture();
  const first = await run(true);
  await rm(first.artifact_path);
  await symlink(path.join(root, "missing"), first.artifact_path);
  await expect(prepareInfrastructureVerification(options)).rejects.toThrow();
});

it("isolates work-item retries from task verification and contains arbitrary WorkItem ids", async () => {
  const { options, run, root } = await fixture();
  const { artifact_path: taskArtifact, ...failed } = await run(true);
  const retain = await prepareInfrastructureVerification({
    ...options,
    verification_scope: "../feature with spaces",
  });
  const workItemArtifact = await retain(failed);
  expect(workItemArtifact).not.toBe(taskArtifact);
  expect(path.relative(root, workItemArtifact).startsWith("..")).toBe(false);
  expect(path.basename(path.dirname(workItemArtifact))).toMatch(/^work-item-[a-f0-9]{64}$/u);
});

it.each([
  "R  .agentplane/tasks/T-RETRY/README.md -> source.ts",
  ' M ".agentplane/tasks/T-RETRY/README.md"',
  "?? .agentplane/tasks/T-RETRY/unexpected-source.ts",
])("refuses source retry for ambiguous or unmanaged status %s", async (line) => {
  const { options, run, root } = await fixture();
  await run(true);
  vi.spyOn(finalization, "readDirectTaskHead").mockResolvedValue(options.implementation_commit);
  vi.spyOn(finalization, "readDirectRepositoryStatus").mockResolvedValue({
    lines: [line],
  } as never);
  await expect(
    prepareInfrastructureVerificationForCheckout({ ...options, checkout: root }),
  ).rejects.toThrow("unchanged source");
});

it("permits only recognized task metadata drift during infrastructure recovery", async () => {
  const { options, run, root } = await fixture();
  await run(true);
  vi.spyOn(finalization, "readDirectTaskHead").mockResolvedValue(options.implementation_commit);
  vi.spyOn(finalization, "readDirectRepositoryStatus").mockResolvedValue({
    lines: [" M .agentplane/tasks/T-RETRY/README.md", "?? .agentplane/tasks/T-RETRY/pr/meta.json"],
  } as never);
  await expect(
    prepareInfrastructureVerificationForCheckout({ ...options, checkout: root }),
  ).resolves.toBeTypeOf("function");
});
