import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type * as TaskBackendModule from "../shared/task-backend.js";

const execFileAsync = promisify(execFile);
const mocks = vi.hoisted(() => ({
  command: null as unknown,
  load: vi.fn(),
}));

vi.mock("../shared/task-backend.js", async (importOriginal) => ({
  ...(await importOriginal<typeof TaskBackendModule>()),
  loadCommandContext: mocks.load,
  resolveCommandGitCommonDir: (command: {
    resolvedProject: { gitRoot: string };
    commonGitDir?: string;
  }) => Promise.resolve(command.commonGitDir ?? path.join(command.resolvedProject.gitRoot, ".git")),
}));

import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import { KERNEL_OPERATIONAL_PROJECTION } from "./kernel-operational-projection.js";
import {
  recoverCanonicalControllerSuspensions,
  resolveCanonicalControllerCommand,
  transferCanonicalControllerToBase,
  withCanonicalControllerSuspendedForOperation,
} from "./kernel-controller-handoff.js";

const roots: string[] = [];

async function git(root: string, args: string[]) {
  return await execFileAsync("git", args, { cwd: root });
}

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-kernel-handoff-"));
  roots.push(root);
  await git(root, ["init", "-q"]);
  await git(root, ["config", "user.name", "AgentPlane Test"]);
  await git(root, ["config", "user.email", "agentplane@example.test"]);
  const relative = ".agentplane/tasks/T-1/README.md";
  await mkdir(path.dirname(path.join(root, relative)), { recursive: true });
  await writeFile(path.join(root, relative), "committed\n");
  await git(root, ["add", relative]);
  await git(root, ["commit", "-qm", "seed"]);
  await writeFile(path.join(root, relative), "pending canonical controller state\n");
  const command = {
    resolvedProject: { gitRoot: root },
    config: { paths: { tasks_path: ".agentplane/tasks" } },
    taskBackend: {
      getTask: vi.fn().mockResolvedValue({
        id: "T-1",
        extensions: { [TASK_KERNEL_EXTENSION]: { kind: "canonical_task" } },
      }),
    },
  } as never;
  mocks.command = command;
  return { root, relative, command };
}

describe("canonical controller checkout handoff", () => {
  beforeEach(() => {
    mocks.command = null;
    mocks.load.mockReset();
    mocks.load.mockImplementation(() => Promise.resolve(mocks.command));
  });

  afterEach(async () => {
    await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
  });

  it("temporarily exposes the exact clean queued head and restores Kernel state", async () => {
    const f = await fixture();
    const requestDigest = k.kernelDigest("integration-run-next");
    let observed = "";

    await withCanonicalControllerSuspendedForOperation({
      command: f.command,
      decision: { workspace: { taskWorktreePath: f.root } } as never,
      task_id: "T-1",
      request_digest: requestDigest,
      operation_idempotency_key: "integration.run_next:T-1:one",
      run: async () => {
        observed = await readFile(path.join(f.root, f.relative), "utf8");
        const status = await git(f.root, ["status", "--porcelain"]);
        expect(status.stdout).toBe("");
        return 0;
      },
    });

    expect(observed).toBe("committed\n");
    await expect(readFile(path.join(f.root, f.relative), "utf8")).resolves.toBe(
      "pending canonical controller state\n",
    );

    await writeFile(path.join(f.root, f.relative), "committed\n");
    await recoverCanonicalControllerSuspensions({
      command: f.command,
      task_id: "T-1",
    });
    await expect(readFile(path.join(f.root, f.relative), "utf8")).resolves.toBe(
      "pending canonical controller state\n",
    );
  });

  it("rejects unrelated dirty work instead of hiding it from integration", async () => {
    const f = await fixture();
    await writeFile(path.join(f.root, "unrelated.txt"), "do not hide\n");

    await expect(
      withCanonicalControllerSuspendedForOperation({
        command: f.command,
        decision: { workspace: { taskWorktreePath: f.root } } as never,
        task_id: "T-1",
        request_digest: k.kernelDigest("integration-run-next"),
        operation_idempotency_key: "integration.run_next:T-1:one",
        run: () => Promise.resolve(0),
      }),
    ).rejects.toThrow(/permits only/iu);
  });

  it("can suspend the transferred controller on the base checkout for exact cleanup", async () => {
    const f = await fixture();
    let observed = "";

    await withCanonicalControllerSuspendedForOperation({
      command: f.command,
      decision: { workspace: { taskWorktreePath: null } } as never,
      task_id: "T-1",
      request_digest: k.kernelDigest("cleanup"),
      operation_idempotency_key: "task.worktree.cleanup:T-1:one",
      controller_checkout: f.root,
      run: async () => {
        observed = await readFile(path.join(f.root, f.relative), "utf8");
        const status = await git(f.root, ["status", "--porcelain"]);
        expect(status.stdout).toBe("");
        return 0;
      },
    });

    expect(observed).toBe("committed\n");
    await expect(readFile(path.join(f.root, f.relative), "utf8")).resolves.toBe(
      "pending canonical controller state\n",
    );
  });

  it("records the controller transfer before CAS-copying the exact Kernel record to base", async () => {
    const f = await fixture();
    const sourceRoot = path.join(f.root, "task-worktree");
    const commonGitDir = path.join(f.root, ".git");
    const authority = { digest: k.kernelDigest("authority") };
    const projectionContents = {
      schema_version: 1 as const,
      source: "task_kernel" as const,
      work_order_id: k.kernelDigest("order"),
      implementation_commit: "a".repeat(40),
      implementation_tree: "b".repeat(40),
      verification_evidence_digest: k.kernelDigest("verification"),
      review_identity_digest: k.kernelDigest("review"),
      evidence_refs: ["quality-report.json"],
      findings: ["reviewed"],
      projected_at: "2026-09-18T00:00:00.000Z",
    };
    const projection = {
      ...projectionContents,
      digest: k.kernelDigest(projectionContents),
    };
    const record = (aggregate: Record<string, unknown>) => {
      const contents = {
        schema_version: 1 as const,
        kind: "canonical_task" as const,
        repository_identity: k.kernelDigest("repository"),
        aggregate,
        events: [],
      };
      return { ...contents, digest: k.kernelDigest(contents) };
    };
    const source = {
      resolvedProject: { gitRoot: sourceRoot },
      commonGitDir,
    } as never;
    type ControllerTask = {
      id: string;
      revision: number;
      status?: string;
      extensions: Record<string, unknown>;
    };
    const mergedRecord = record({ controller_transfer: null });
    const mergedTask: ControllerTask = {
      id: "T-1",
      revision: 7,
      extensions: {
        [TASK_KERNEL_EXTENSION]: mergedRecord,
        "provider-owned": { retained: true },
      },
    };
    let targetTask = mergedTask;
    const writeTask = vi.fn((next: ControllerTask) => {
      targetTask = next;
      return Promise.resolve();
    });
    const target = {
      ...f.command,
      commonGitDir,
      taskBackend: {
        getTask: vi.fn(() => Promise.resolve(targetTask)),
        writeTask,
      },
    } as never;
    mocks.load.mockResolvedValue(target);
    const before = record({ authority_lineage: [{ authority }], controller_transfer: null });
    const transferred = record({
      authority_lineage: [{ authority }],
      controller_transfer: { to_controller: `checkout:${path.resolve(f.root)}` },
    });
    const apply = vi.fn().mockResolvedValue({ kind: "committed" });
    const runtime = {
      adapter: {
        read: vi
          .fn()
          .mockResolvedValueOnce({ kind: "canonical", record: before })
          .mockResolvedValueOnce({
            kind: "canonical",
            record: transferred,
            task: {
              id: "T-1",
              revision: 9,
              status: "DOING",
              extensions: { [KERNEL_OPERATIONAL_PROJECTION]: projection },
            },
          }),
      },
      lifecycle: { apply },
      input: vi.fn().mockResolvedValue({ kind: "record_controller_transfer" }),
    } as never;

    await expect(
      transferCanonicalControllerToBase({
        command: source,
        runtime,
        task_id: "T-1",
        base_checkout: f.root,
      }),
    ).resolves.toBe(target);

    expect(apply).toHaveBeenCalledOnce();
    expect(writeTask).toHaveBeenCalledOnce();
    const written = writeTask.mock.calls[0]![0];
    expect(written.revision).toBe(8);
    expect(written.extensions[TASK_KERNEL_EXTENSION]).toEqual(transferred);
    expect(written.extensions[KERNEL_OPERATIONAL_PROJECTION]).toEqual(projection);
    expect(written.extensions["provider-owned"]).toEqual({ retained: true });

    // A crash after the source receipt but before the destination CAS is recovered on routing.
    targetTask = mergedTask;
    const sourceWithTask = {
      ...source,
      taskBackend: {
        getTask: vi.fn(() =>
          Promise.resolve({
            id: "T-1",
            revision: 9,
            status: "DOING",
            extensions: {
              [TASK_KERNEL_EXTENSION]: transferred,
              [KERNEL_OPERATIONAL_PROJECTION]: projection,
            },
          }),
        ),
      },
    } as never;
    await expect(
      resolveCanonicalControllerCommand({ command: sourceWithTask, task_id: "T-1" }),
    ).resolves.toBe(target);
    expect(targetTask.extensions[TASK_KERNEL_EXTENSION]).toEqual(transferred);
    expect(writeTask).toHaveBeenCalledTimes(2);
  });
});
