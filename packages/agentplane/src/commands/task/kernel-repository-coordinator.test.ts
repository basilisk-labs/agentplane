import { beforeEach, describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

if (typeof vi.hoisted !== "function") {
  Object.defineProperty(vi, "hoisted", { value: <T>(factory: () => T): T => factory() });
}

const mocks = vi.hoisted(() => ({
  runProcess: vi.fn(),
  readStable: vi.fn(),
  writeStable: vi.fn(),
  mkdir: vi.fn(),
  cmdCommit: vi.fn(),
  loadTask: vi.fn(),
  prepareEvidence: vi.fn(),
  materializeCloseTail: vi.fn(),
  readStatus: vi.fn(),
  readHead: vi.fn(),
  stage: vi.fn(),
  stagedPaths: vi.fn(),
  hookReady: vi.fn(),
}));

vi.mock("@agentplaneorg/core/process", () => ({ runProcess: mocks.runProcess }));
vi.mock("../../shared/stable-file.js", () => ({
  readStableRegularTextNoFollow: mocks.readStable,
  writeNewStableRegularFileNoFollow: mocks.writeStable,
}));
vi.mock("node:fs/promises", () => ({ mkdir: mocks.mkdir }));
vi.mock("../shared/hook-shim-template.js", () => ({ assertHookRunnerReady: mocks.hookReady }));
vi.mock("../guard/impl/commit.js", () => ({ cmdCommit: mocks.cmdCommit }));
vi.mock("../shared/task-backend.js", () => ({ loadTaskFromContext: mocks.loadTask }));
vi.mock("./direct-task-supervisor-implementation.js", () => ({
  prepareDirectImplementationEvidence: mocks.prepareEvidence,
}));
vi.mock("./direct-task-finalization.js", () => ({
  readDirectRepositoryStatus: mocks.readStatus,
  readDirectTaskHead: mocks.readHead,
}));
vi.mock("./finish-close.js", () => ({
  materializeBranchPrCloseTail: mocks.materializeCloseTail,
}));

import {
  captureKernelRepositoryBaseline,
  commitCanonicalImplementation,
  commitCanonicalTerminalTaskArtifacts,
} from "./kernel-repository-coordinator.js";

const taskId = "202609170000-KERNEL";
const workOrderId = `sha256:${"a".repeat(64)}`;
const workOrder = {
  task: { id: taskId },
  work_order_id: workOrderId,
  authority: { writable_roots: ["/repo/src"] },
} as never;
const invalidateStatus = vi.fn();
const command = {
  resolvedProject: { gitRoot: "/repo" },
  git: { invalidateStatus, stage: mocks.stage, statusStagedPaths: mocks.stagedPaths },
  config: {
    branch: { task_prefix: "task", task_close_prefix: "task-close" },
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
    mocks.materializeCloseTail.mockResolvedValue(`task-close/${taskId}/base-sha`);
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

  it("rejects an unavailable hook runner before staging or committing", async () => {
    const baseline = {
      schema_version: 1,
      kind: "canonical_repository_baseline",
      task_id: taskId,
      work_order_id: workOrderId,
      checkout: "/repo",
      branch: `task/${taskId}/canonical`,
      head: "base-sha",
      tree: "base-tree",
      status: { command: "git status", lines: [] },
    };
    mocks.readStable.mockImplementation((target: string) =>
      target.endsWith("repository-baseline.json")
        ? Promise.resolve(JSON.stringify(baseline))
        : Promise.reject(Object.assign(new Error("missing"), { code: "ENOENT" })),
    );
    mocks.readStatus.mockResolvedValue({ command: "git status", lines: [" M src/change.ts"] });
    mocks.hookReady.mockRejectedValue(new Error("hook_runner_unavailable"));
    await expect(
      commitCanonicalImplementation({
        command,
        directory: "/exchange",
        work_order: workOrder,
        changed_paths: ["src/change.ts"],
      }),
    ).rejects.toThrow("hook_runner_unavailable");
    expect(mocks.hookReady).toHaveBeenCalledWith("/repo");
    expect(mocks.stage).not.toHaveBeenCalled();
    expect(mocks.cmdCommit).not.toHaveBeenCalled();
  });

  it.each([
    [".agentplane/policy/local.md", ["security_boundary"], true, false],
    [".agentplane/config.json", ["security_boundary"], false, true],
    [".agentplane/policy/local.md", ["documentation"], false, false],
  ])(
    "derives protected commit flags for %s from approved effects %j",
    async (file, effects, allowPolicy, allowConfig) => {
      const baseline = {
        schema_version: 1,
        kind: "canonical_repository_baseline",
        task_id: taskId,
        work_order_id: workOrderId,
        checkout: "/repo",
        branch: `task/${taskId}/canonical`,
        head: "base-sha",
        tree: "base-tree",
        status: { command: "git status", lines: [] },
      };
      mocks.readStable.mockImplementation((target: string) =>
        target.endsWith("repository-baseline.json")
          ? Promise.resolve(JSON.stringify(baseline))
          : Promise.reject(Object.assign(new Error("missing"), { code: "ENOENT" })),
      );
      mocks.readStatus.mockResolvedValue({ command: "git status", lines: [` M ${file}`] });
      mocks.stagedPaths.mockResolvedValue([file]);
      mocks.cmdCommit.mockRejectedValue(new Error("hook rejected"));
      const order = {
        task: { id: taskId },
        work_order_id: workOrderId,
        authority: { writable_roots: [`/repo/${file}`] },
      } as never;
      // Retry must derive the same allowances; a rejected hook is not an authority grant.
      for (let attempt = 0; attempt < 2; attempt++) {
        await expect(
          commitCanonicalImplementation({
            command,
            directory: "/exchange",
            work_order: order,
            changed_paths: [file],
            repository_effects: effects,
          }),
        ).rejects.toThrow("hook rejected");
      }
      expect(mocks.cmdCommit).toHaveBeenCalledTimes(2);
      expect(mocks.cmdCommit).toHaveBeenLastCalledWith(
        expect.objectContaining({ allowPolicy, allowConfig, allow: [file] }),
      );
      if (allowPolicy || allowConfig) {
        mocks.stagedPaths.mockResolvedValue([file, ".agentplane/policy/unrelated.md"]);
        await expect(
          commitCanonicalImplementation({
            command,
            directory: "/exchange",
            work_order: order,
            changed_paths: [file],
            repository_effects: effects,
          }),
        ).rejects.toThrow("unrelated staged paths");
        expect(mocks.cmdCommit).toHaveBeenCalledTimes(2);
      }
    },
  );

  it.each([false, true])(
    "commits the accumulated observed delta, including a reissued dirty baseline (%s)",
    async (reissued) => {
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
          lines: [
            `?? .agentplane/tasks/${taskId}/existing.json`,
            " M src/prior.ts",
            ...(reissued ? [" M src/change.ts"] : []),
          ],
        },
      };
      mocks.readStable.mockImplementation((target: string) =>
        target.endsWith("repository-baseline.json")
          ? Promise.resolve(JSON.stringify(baseline))
          : Promise.reject(Object.assign(new Error("missing"), { code: "ENOENT" })),
      );
      mocks.readHead.mockResolvedValueOnce("base-sha").mockResolvedValueOnce("implementation-sha");
      mocks.readStatus
        .mockResolvedValueOnce({
          command: "git status --short --untracked-files=all",
          lines: [
            `?? .agentplane/tasks/${taskId}/existing.json`,
            `?? .agentplane/tasks/${taskId}/exchange.json`,
            " M src/prior.ts",
            " M src/change.ts",
          ],
        })
        .mockResolvedValue({
          command: "git status --short --untracked-files=all",
          lines: [`?? .agentplane/tasks/${taskId}/exchange.json`],
        });
      mocks.cmdCommit.mockResolvedValue(0);
      mocks.prepareEvidence.mockResolvedValue({
        status: "ready",
        evidence: {
          artifact_path: `.agentplane/tasks/${taskId}/supervision/implementation-evidence.json`,
          implementation_commit: "implementation-sha",
          changed_paths: ["src/change.ts", "src/prior.ts"],
        },
      });

      const result = await commitCanonicalImplementation({
        command,
        directory: "/exchange",
        work_order: workOrder,
        changed_paths: ["src/change.ts", "src/prior.ts"],
      });

      expect(mocks.cmdCommit).toHaveBeenCalledWith(
        expect.objectContaining({
          taskId,
          allow: ["src/change.ts", "src/prior.ts"],
          allowTasks: true,
          requireClean: false,
        }),
      );
      expect(mocks.stage).toHaveBeenCalledWith(["src/change.ts", "src/prior.ts"]);
      expect(mocks.stage.mock.invocationCallOrder[0]).toBeLessThan(
        mocks.cmdCommit.mock.invocationCallOrder[0]!,
      );
      expect(result).toMatchObject({
        base_commit: "base-sha",
        implementation_commit: "implementation-sha",
        implementation_tree: "tree-sha",
        evaluator_target: "implementation-sha",
        changed_paths: ["src/change.ts", "src/prior.ts"],
      });
      expect(result.digest).toMatch(/^sha256:[a-f0-9]{64}$/u);
    },
  );

  it.each(["retry", "unrelated", "missing", "no-intent", "wrong-base"])(
    "handles dirty baseline staging after a rejected hook (%s)",
    async (scenario) => {
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
          command: "git status",
          lines: [" M src/change.ts", "?? src/new.ts", " M user.txt"],
        },
      };
      let storedIntent: string | null = null;
      mocks.readStable.mockImplementation((target: string) => {
        if (target.endsWith("repository-baseline.json"))
          return Promise.resolve(JSON.stringify(baseline));
        if (target.endsWith("repository-commit-intent.json") && storedIntent)
          return Promise.resolve(storedIntent);
        return Promise.reject(Object.assign(new Error("missing"), { code: "ENOENT" }));
      });
      mocks.writeStable.mockImplementation((target: string, contents: string) => {
        if (target.endsWith("repository-commit-intent.json")) storedIntent = contents;
        return Promise.resolve();
      });
      mocks.readStatus.mockResolvedValue(baseline.status);
      mocks.cmdCommit.mockRejectedValueOnce(new Error("hook rejected")).mockResolvedValue(0);
      const options = {
        command,
        directory: "/exchange",
        work_order: workOrder,
        changed_paths: ["src/change.ts", "src/new.ts"],
      };
      await expect(commitCanonicalImplementation(options)).rejects.toThrow("hook rejected");
      expect(mocks.stage).toHaveBeenCalledWith(options.changed_paths);
      if (scenario === "no-intent") storedIntent = null;
      if (scenario === "wrong-base") {
        const contents = {
          schema_version: 1,
          kind: "canonical_repository_commit_intent",
          task_id: taskId,
          work_order_id: workOrderId,
          base_commit: "other-base",
          changed_paths: options.changed_paths,
        };
        storedIntent = JSON.stringify({ ...contents, digest: k.kernelDigest(contents) });
      }
      mocks.readStatus.mockResolvedValue({
        command: "git status",
        lines: [
          ...(scenario === "missing" ? [] : ["M  src/change.ts"]),
          "A  src/new.ts",
          scenario === "unrelated" ? "M  user.txt" : " M user.txt",
        ],
      });
      if (scenario !== "retry") {
        await expect(commitCanonicalImplementation(options)).rejects.toThrow(
          scenario === "wrong-base" ? "commit intent identity changed" : "dirty baseline",
        );
        expect(mocks.cmdCommit).toHaveBeenCalledTimes(1);
        return;
      }
      mocks.readHead.mockResolvedValueOnce("base-sha").mockResolvedValue("implementation-sha");
      mocks.readStatus
        .mockResolvedValueOnce({
          command: "git status",
          lines: ["M  src/change.ts", "A  src/new.ts", " M user.txt"],
        })
        .mockResolvedValue({ command: "git status", lines: [" M user.txt"] });
      mocks.prepareEvidence.mockResolvedValue({
        status: "ready",
        evidence: {
          implementation_commit: "implementation-sha",
          changed_paths: options.changed_paths,
        },
      });
      await expect(commitCanonicalImplementation(options)).resolves.toMatchObject({
        implementation_commit: "implementation-sha",
        changed_paths: options.changed_paths,
      });
      expect(mocks.cmdCommit).toHaveBeenCalledTimes(2);
      expect(mocks.stage).toHaveBeenLastCalledWith(options.changed_paths);
    },
  );

  it("commits an authorized followup after a partial commit dispatch", async () => {
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
      status: {
        command: "git status --short --untracked-files=all",
        lines: [" M src/change.ts"],
      },
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
    mocks.readHead
      .mockResolvedValueOnce("implementation-sha")
      .mockResolvedValueOnce("implementation-sha")
      .mockResolvedValue("followup-sha");
    mocks.readStatus.mockResolvedValue({
      command: "git status --short --untracked-files=all",
      lines: [" M src/prior.ts"],
    });
    mocks.cmdCommit.mockResolvedValue(0);
    mocks.runProcess.mockImplementation(({ args }: { args: string[] }) => {
      const stdout =
        args[0] === "branch"
          ? `task/${taskId}/canonical\n`
          : args[0] === "rev-parse" && args[1] === "implementation-sha^"
            ? "base-sha\n"
            : args[0] === "rev-parse" && args[1] === "followup-sha^"
              ? "implementation-sha\n"
              : args[0] === "diff" && args[4] === "implementation-sha..implementation-sha"
                ? ""
                : args[0] === "diff" && args[4] === "implementation-sha..followup-sha"
                  ? "src/prior.ts\n"
                  : args[0] === "diff"
                    ? `src/change.ts\n.agentplane/tasks/${taskId}/README.md\n`
                    : "tree-sha\n";
      return Promise.resolve({ exitCode: 0, stdout, stderr: "" });
    });
    mocks.prepareEvidence.mockResolvedValue({
      status: "ready",
      evidence: {
        artifact_path: `.agentplane/tasks/${taskId}/supervision/implementation-evidence.json`,
        implementation_commit: "followup-sha",
        changed_paths: ["src/change.ts", "src/prior.ts", `.agentplane/tasks/${taskId}/README.md`],
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
      changed_paths: ["src/change.ts", "src/prior.ts"],
    });

    expect(mocks.cmdCommit).toHaveBeenCalledWith(
      expect.objectContaining({ allow: ["src/prior.ts"] }),
    );
    expect(result).toMatchObject({
      implementation_commit: "followup-sha",
      changed_paths: ["src/change.ts", "src/prior.ts"],
    });
    expect(mocks.runProcess).toHaveBeenCalledWith(
      expect.objectContaining({
        args: [
          "diff",
          "--no-renames",
          "--name-only",
          "--diff-filter=ACDMRTUXB",
          "implementation-sha..followup-sha",
        ],
      }),
    );
  });

  it("adopts an exact writable baseline file after an approved scope expansion", async () => {
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
      status: {
        command: "git status --short --untracked-files=all",
        lines: [" M bun.lock", " M src/unrelated.ts"],
      },
    };
    mocks.readStable.mockImplementation((target: string) =>
      target.endsWith("repository-baseline.json")
        ? Promise.resolve(JSON.stringify(baseline))
        : Promise.reject(Object.assign(new Error("missing"), { code: "ENOENT" })),
    );
    mocks.readHead.mockResolvedValueOnce("base-sha").mockResolvedValueOnce("implementation-sha");
    mocks.readStatus
      .mockResolvedValueOnce({
        command: "git status --short --untracked-files=all",
        lines: [" M bun.lock", " M src/change.ts", " M src/unrelated.ts"],
      })
      .mockResolvedValue({
        command: "git status --short --untracked-files=all",
        lines: [" M src/unrelated.ts"],
      });
    mocks.cmdCommit.mockResolvedValue(0);
    mocks.prepareEvidence.mockResolvedValue({
      status: "ready",
      evidence: {
        artifact_path: `.agentplane/tasks/${taskId}/supervision/implementation-evidence.json`,
        implementation_commit: "implementation-sha",
        changed_paths: ["bun.lock", "src/change.ts"],
      },
    });

    await commitCanonicalImplementation({
      command,
      directory: "/exchange",
      work_order: {
        task: { id: taskId, work_item_id: "work-item", revision: 4 },
        work_order_id: workOrderId,
        authority: { writable_roots: ["/repo/bun.lock", "/repo/src"] },
      } as never,
      changed_paths: ["src/change.ts"],
    });

    expect(mocks.cmdCommit).toHaveBeenCalledWith(
      expect.objectContaining({ allow: ["bun.lock", "src/change.ts"] }),
    );
    expect(mocks.cmdCommit).toHaveBeenCalledTimes(1);
  });

  it("replays a persisted followup after an intervening task-artifact commit", async () => {
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
    const primaryContents = {
      schema_version: 1,
      kind: "canonical_repository_commit_intent",
      task_id: taskId,
      work_order_id: workOrderId,
      base_commit: "base-sha",
      changed_paths: ["src/change.ts"],
    } as const;
    const followupContents = {
      schema_version: 1,
      kind: "canonical_repository_followup_commit_intent",
      task_id: taskId,
      work_order_id: workOrderId,
      base_commit: "implementation-sha",
      changed_paths: ["src/prior.ts"],
    } as const;
    const primary = { ...primaryContents, digest: k.kernelDigest(primaryContents) };
    const followup = { ...followupContents, digest: k.kernelDigest(followupContents) };
    mocks.readStable.mockImplementation((target: string) => {
      if (target.endsWith("repository-baseline.json"))
        return Promise.resolve(JSON.stringify(baseline));
      if (target.endsWith("repository-followup-commit-intent.json"))
        return Promise.resolve(JSON.stringify(followup));
      if (target.endsWith("repository-commit-intent.json"))
        return Promise.resolve(JSON.stringify(primary));
      return Promise.reject(Object.assign(new Error("missing"), { code: "ENOENT" }));
    });
    mocks.readHead
      .mockResolvedValueOnce("task-artifact-sha")
      .mockResolvedValueOnce("task-artifact-sha")
      .mockResolvedValue("followup-sha");
    mocks.readStatus.mockResolvedValue({
      command: "git status --short --untracked-files=all",
      lines: [" M src/prior.ts"],
    });
    mocks.cmdCommit.mockResolvedValue(0);
    mocks.runProcess.mockImplementation(({ args }: { args: string[] }) => {
      const range = args[4];
      const stdout =
        args[0] === "branch"
          ? `task/${taskId}/canonical\n`
          : args[0] === "merge-base"
            ? ""
            : range === "base-sha..implementation-sha"
              ? `src/change.ts\n.agentplane/tasks/${taskId}/README.md\n`
              : range === "implementation-sha..task-artifact-sha"
                ? `.agentplane/tasks/${taskId}/pr/meta.json\n`
                : range === "implementation-sha..followup-sha"
                  ? `src/prior.ts\n.agentplane/tasks/${taskId}/pr/meta.json\n`
                  : "tree-sha\n";
      return Promise.resolve({ exitCode: 0, stdout, stderr: "" });
    });
    mocks.prepareEvidence.mockResolvedValue({
      status: "ready",
      evidence: {
        artifact_path: `.agentplane/tasks/${taskId}/supervision/implementation-evidence.json`,
        implementation_commit: "followup-sha",
        changed_paths: ["src/change.ts", "src/prior.ts"],
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
      changed_paths: ["src/change.ts", "src/prior.ts"],
    });

    expect(mocks.cmdCommit).toHaveBeenCalledTimes(1);
    expect(mocks.cmdCommit).toHaveBeenCalledWith(
      expect.objectContaining({ allow: ["src/prior.ts"] }),
    );
    expect(result).toMatchObject({
      implementation_commit: "followup-sha",
      changed_paths: ["src/change.ts", "src/prior.ts"],
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
      lines: [" M src/foreign.ts", " M src/change.ts"],
    });

    await expect(
      commitCanonicalImplementation({
        command,
        directory: "/exchange",
        work_order: workOrder,
        changed_paths: ["src/change.ts"],
      }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: { unobserved_paths: ["src/foreign.ts"] },
    });
    expect(mocks.cmdCommit).not.toHaveBeenCalled();
  });

  it("commits terminal task artifacts without staging an unrelated direct baseline", async () => {
    mocks.readStatus
      .mockResolvedValueOnce({
        command: "git status --short --untracked-files=all",
        lines: [
          ` M .agentplane/tasks/${taskId}/README.md`,
          `?? .agentplane/tasks/${taskId}/quality/result.json`,
          " M src/user-change.ts",
        ],
      })
      .mockResolvedValueOnce({
        command: "git status --short --untracked-files=all",
        lines: [" M src/user-change.ts"],
      });
    mocks.cmdCommit.mockResolvedValue(0);

    await expect(commitCanonicalTerminalTaskArtifacts(command, taskId)).resolves.toBe(true);

    expect(mocks.cmdCommit).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId,
        allow: [],
        allowTasks: true,
        requireClean: false,
      }),
    );
    expect(invalidateStatus).toHaveBeenCalledTimes(2);
  });

  it("materializes terminal task artifacts on a close branch when running from main", async () => {
    mocks.runProcess.mockImplementation(({ args }: { args: string[] }) =>
      Promise.resolve({
        exitCode: 0,
        stdout: args[0] === "branch" ? "main\n" : "tree-sha\n",
        stderr: "",
      }),
    );
    mocks.readStatus
      .mockResolvedValueOnce({
        command: "git status --short --untracked-files=all",
        lines: [` M .agentplane/tasks/${taskId}/README.md`, " M src/user-change.ts"],
      })
      .mockResolvedValueOnce({
        command: "git status --short --untracked-files=all",
        lines: [" M src/user-change.ts"],
      });

    await expect(commitCanonicalTerminalTaskArtifacts(command, taskId)).resolves.toBe(true);

    expect(mocks.materializeCloseTail).toHaveBeenCalledWith(
      expect.objectContaining({
        ctx: command,
        taskId,
        closeUnstageOthers: true,
      }),
    );
    expect(mocks.cmdCommit).not.toHaveBeenCalled();
  });

  it("does not create a terminal artifact commit when the task subtree is clean", async () => {
    mocks.readStatus.mockResolvedValue({
      command: "git status --short --untracked-files=all",
      lines: [" M src/user-change.ts"],
    });

    await expect(commitCanonicalTerminalTaskArtifacts(command, taskId)).resolves.toBe(false);

    expect(mocks.cmdCommit).not.toHaveBeenCalled();
  });
});
