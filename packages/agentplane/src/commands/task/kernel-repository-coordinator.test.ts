import { beforeEach, describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

const mocks = vi.hoisted(() => ({
  runProcess: vi.fn(),
  readStable: vi.fn(),
  writeStable: vi.fn(),
  mkdir: vi.fn(),
  cmdCommit: vi.fn(),
  loadTask: vi.fn(),
  prepareEvidence: vi.fn(),
  readStatus: vi.fn(),
  readHead: vi.fn(),
}));

vi.mock("@agentplaneorg/core/process", () => ({ runProcess: mocks.runProcess }));
vi.mock("../../shared/stable-file.js", () => ({
  readStableRegularTextNoFollow: mocks.readStable,
  writeNewStableRegularFileNoFollow: mocks.writeStable,
}));
vi.mock("node:fs/promises", () => ({ mkdir: mocks.mkdir }));
vi.mock("../guard/impl/commit.js", () => ({ cmdCommit: mocks.cmdCommit }));
vi.mock("../shared/task-backend.js", () => ({ loadTaskFromContext: mocks.loadTask }));
vi.mock("./direct-task-supervisor-implementation.js", () => ({
  prepareDirectImplementationEvidence: mocks.prepareEvidence,
}));
vi.mock("./direct-task-finalization.js", () => ({
  readDirectRepositoryStatus: mocks.readStatus,
  readDirectTaskHead: mocks.readHead,
}));

import {
  captureKernelRepositoryBaseline,
  commitCanonicalImplementation,
} from "./kernel-repository-coordinator.js";

const taskId = "202609170000-KERNEL";
const workOrderId = `sha256:${"a".repeat(64)}`;
const workOrder = {
  task: { id: taskId },
  work_order_id: workOrderId,
  authority: { writable_roots: ["/repo/src"] },
} as never;
const command = {
  resolvedProject: { gitRoot: "/repo" },
  config: {
    branch: { task_prefix: "task/" },
    paths: { workflow_dir: ".agentplane/tasks" },
  },
} as never;

describe("canonical repository coordinator", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.loadTask.mockResolvedValue({
      execution_route: { repository_mode: "branch_pr" },
    });
    mocks.readHead.mockResolvedValue("base-sha");
    mocks.readStatus.mockResolvedValue({
      command: "git status --short --untracked-files=all",
      lines: [],
    });
    mocks.runProcess.mockImplementation(({ args }: { args: string[] }) =>
      Promise.resolve({
        exitCode: 0,
        stdout: args[0] === "branch" ? `task/${taskId}/canonical\n` : "tree-sha\n",
        stderr: "",
      }),
    );
  });

  it("rejects branch_pr semantic work outside its dedicated task branch", async () => {
    mocks.runProcess.mockImplementation(({ args }: { args: string[] }) =>
      Promise.resolve({
        exitCode: 0,
        stdout: args[0] === "branch" ? "main\n" : "tree-sha\n",
        stderr: "",
      }),
    );

    await expect(captureKernelRepositoryBaseline(command, workOrder)).rejects.toThrow(
      "dedicated task worktree",
    );
  });

  it("commits only the observed scoped delta and freezes commit, tree, and evaluator identity", async () => {
    const baseline = {
      schema_version: 1,
      kind: "canonical_repository_baseline",
      task_id: taskId,
      work_order_id: workOrderId,
      checkout: "/repo",
      branch: `task/${taskId}/canonical`,
      head: "base-sha",
      tree: "base-tree",
      status: {
        command: "git status --short --untracked-files=all",
        lines: [`?? .agentplane/tasks/${taskId}/existing.json`],
      },
    };
    mocks.readStable.mockImplementation((target: string) =>
      target.endsWith("repository-baseline.json")
        ? Promise.resolve(JSON.stringify(baseline))
        : Promise.reject(Object.assign(new Error("missing"), { code: "ENOENT" })),
    );
    mocks.readHead.mockResolvedValueOnce("base-sha").mockResolvedValueOnce("implementation-sha");
    mocks.readStatus.mockResolvedValue({
      command: "git status --short --untracked-files=all",
      lines: [
        `?? .agentplane/tasks/${taskId}/existing.json`,
        `?? .agentplane/tasks/${taskId}/exchange.json`,
        " M src/change.ts",
      ],
    });
    mocks.cmdCommit.mockResolvedValue(0);
    mocks.prepareEvidence.mockResolvedValue({
      status: "ready",
      evidence: {
        artifact_path: `.agentplane/tasks/${taskId}/supervision/implementation-evidence.json`,
        implementation_commit: "implementation-sha",
        changed_paths: ["src/change.ts"],
      },
    });

    const result = await commitCanonicalImplementation({
      command,
      directory: "/exchange",
      work_order: workOrder,
      changed_paths: ["src/change.ts"],
    });

    expect(mocks.cmdCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId,
        allow: ["src/change.ts"],
        allowTasks: true,
        requireClean: false,
      }),
    );
    expect(result).toMatchObject({
      base_commit: "base-sha",
      implementation_commit: "implementation-sha",
      implementation_tree: "tree-sha",
      evaluator_target: "implementation-sha",
      changed_paths: ["src/change.ts"],
    });
    expect(result.digest).toMatch(/^sha256:[a-f0-9]{64}$/u);
  });

  it("reconciles a dispatched canonical commit after a crash without committing twice", async () => {
    const baseline = {
      schema_version: 1,
      kind: "canonical_repository_baseline",
      task_id: taskId,
      work_item_id: "work-item",
      task_revision: 4,
      work_order_id: workOrderId,
      checkout: "/repo",
      branch: `task/${taskId}/canonical`,
      head: "base-sha",
      tree: "base-tree",
      status: { command: "git status --short --untracked-files=all", lines: [] },
    };
    const intentContents = {
      schema_version: 1,
      kind: "canonical_repository_commit_intent",
      task_id: taskId,
      work_order_id: workOrderId,
      base_commit: "base-sha",
      changed_paths: ["src/change.ts"],
    } as const;
    const intent = { ...intentContents, digest: k.kernelDigest(intentContents) };
    mocks.readStable.mockImplementation((target: string) => {
      if (target.endsWith("repository-baseline.json"))
        return Promise.resolve(JSON.stringify(baseline));
      if (target.endsWith("repository-commit-intent.json"))
        return Promise.resolve(JSON.stringify(intent));
      return Promise.reject(Object.assign(new Error("missing"), { code: "ENOENT" }));
    });
    mocks.readHead.mockResolvedValue("implementation-sha");
    mocks.runProcess.mockImplementation(({ args }: { args: string[] }) => {
      const stdout =
        args[0] === "branch"
          ? `task/${taskId}/canonical\n`
          : args[0] === "diff"
            ? `src/change.ts\n.agentplane/tasks/${taskId}/README.md\n`
            : args[1]?.endsWith("^")
              ? "base-sha\n"
              : "tree-sha\n";
      return Promise.resolve({ exitCode: 0, stdout, stderr: "" });
    });
    mocks.prepareEvidence.mockResolvedValue({
      status: "ready",
      evidence: {
        artifact_path: `.agentplane/tasks/${taskId}/supervision/implementation-evidence.json`,
        implementation_commit: "implementation-sha",
        changed_paths: ["src/change.ts", `.agentplane/tasks/${taskId}/README.md`],
      },
    });

    const result = await commitCanonicalImplementation({
      command,
      directory: "/exchange",
      work_order: {
        task: { id: taskId, work_item_id: "work-item", revision: 4 },
        work_order_id: workOrderId,
        authority: { writable_roots: ["/repo/src"] },
      } as never,
      changed_paths: ["src/change.ts"],
    });

    expect(mocks.cmdCommit).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      implementation_commit: "implementation-sha",
      changed_paths: ["src/change.ts"],
    });
  });

  it("fails closed when the live delta differs from the Kernel observation", async () => {
    const baseline = {
      schema_version: 1,
      kind: "canonical_repository_baseline",
      task_id: taskId,
      work_order_id: workOrderId,
      checkout: "/repo",
      branch: `task/${taskId}/canonical`,
      head: "base-sha",
      tree: "base-tree",
      status: { command: "git status --short --untracked-files=all", lines: [] },
    };
    mocks.readStable.mockImplementation((target: string) =>
      target.endsWith("repository-baseline.json")
        ? Promise.resolve(JSON.stringify(baseline))
        : Promise.reject(Object.assign(new Error("missing"), { code: "ENOENT" })),
    );
    mocks.readStatus.mockResolvedValue({
      command: "git status --short --untracked-files=all",
      lines: [" M src/foreign.ts"],
    });

    await expect(
      commitCanonicalImplementation({
        command,
        directory: "/exchange",
        work_order: workOrder,
        changed_paths: ["src/change.ts"],
      }),
    ).rejects.toThrow("differs from its observation");
    expect(mocks.cmdCommit).not.toHaveBeenCalled();
  });
});
