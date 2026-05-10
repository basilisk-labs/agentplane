import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { CliError } from "../../../shared/errors.js";

const mocks = vi.hoisted(() => ({
  resolveProject: vi.fn(),
  statusChangedPaths: vi.fn(),
  gitRevParse: vi.fn(),
  gitCurrentBranch: vi.fn(),
  loadCommandContext: vi.fn(),
}));

let repoRoot: string;
let defaultGitDir: string;

vi.mock("@agentplaneorg/core/project", () => ({
  resolveProject: mocks.resolveProject,
}));
vi.mock("@agentplaneorg/core/git", () => ({
  gitCurrentBranch: mocks.gitCurrentBranch,
  gitRevParse: mocks.gitRevParse,
  GitContext: class {
    constructor(opts: { gitRoot: string }) {
      void opts.gitRoot;
    }
    statusChangedPaths = mocks.statusChangedPaths;
  },
}));
vi.mock("../../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
}));

describe("guard/impl/allow", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    repoRoot = await mkdtemp(path.join(tmpdir(), "agentplane-repo-"));
    defaultGitDir = path.join(repoRoot, ".git", "worktrees", "task-worktree");
    mocks.gitRevParse.mockResolvedValue(defaultGitDir);
    mocks.gitCurrentBranch.mockResolvedValue("task/202601010101-ABCDEF/example");
  });

  afterEach(async () => {
    await rm(repoRoot, { recursive: true, force: true });
  });

  it("suggestAllowPrefixes returns sorted unique prefixes", async () => {
    const { suggestAllowPrefixes } = await import("./allow.js");
    const out = suggestAllowPrefixes([
      "src/a.ts",
      "README.md",
      "src/b.ts",
      "docs/r.md",
      "./docs/x.md",
      "src//nested/z.ts",
    ]);
    expect(out).toEqual(["docs", "README.md", "src", "src/nested"]);
  });

  it("gitStatusChangedPaths resolves project and delegates to GitContext", async () => {
    const { gitStatusChangedPaths } = await import("./allow.js");
    mocks.resolveProject.mockResolvedValue({
      gitRoot: "/repo",
      agentplaneDir: "/repo/.agentplane",
    });
    mocks.statusChangedPaths.mockResolvedValue(["src/app.ts"]);
    const out = await gitStatusChangedPaths({ cwd: "/repo/sub", rootOverride: "/repo" });
    expect(out).toEqual(["src/app.ts"]);
    expect(mocks.resolveProject).toHaveBeenCalledTimes(1);
  });

  it("ensureGitClean fails for staged and unstaged tracked changes", async () => {
    const { ensureGitClean } = await import("./allow.js");
    const ctxStaged = {
      git: {
        statusStagedPaths: vi.fn().mockResolvedValue(["file.txt"]),
        statusUnstagedTrackedPaths: vi.fn().mockResolvedValue([]),
      },
    };
    await expect(
      ensureGitClean({ ctx: ctxStaged as never, cwd: "/repo" }),
    ).rejects.toMatchObject<CliError>({
      code: "E_GIT",
      message: "Working tree has staged changes",
    });

    const ctxUnstaged = {
      git: {
        statusStagedPaths: vi.fn().mockResolvedValue([]),
        statusUnstagedTrackedPaths: vi.fn().mockResolvedValue(["file.txt"]),
      },
    };
    await expect(
      ensureGitClean({ ctx: ctxUnstaged as never, cwd: "/repo" }),
    ).rejects.toMatchObject<CliError>({
      code: "E_GIT",
      message: "Working tree has unstaged changes",
    });
  });

  it("ensureGitClean loads context when ctx is absent", async () => {
    const { ensureGitClean } = await import("./allow.js");
    mocks.loadCommandContext.mockResolvedValue({
      git: {
        statusStagedPaths: vi.fn().mockResolvedValue([]),
        statusUnstagedTrackedPaths: vi.fn().mockResolvedValue([]),
      },
    });
    await expect(ensureGitClean({ cwd: "/repo" })).resolves.toBeUndefined();
    expect(mocks.loadCommandContext).toHaveBeenCalledTimes(1);
  });

  it("stageAllowlist enforces no-change/no-match branches and stages matched files", async () => {
    const { stageAllowlist } = await import("./allow.js");
    const ctx = {
      git: {
        statusChangedPaths: vi.fn().mockResolvedValue([]),
        stage: vi.fn(),
      },
    };
    const ctxEmptyAllow = {
      git: {
        statusChangedPaths: vi.fn().mockResolvedValue(["src/a.ts"]),
        stage: vi.fn(),
      },
    };
    await expect(
      stageAllowlist({
        ctx: ctxEmptyAllow as never,
        allow: [],
        allowTasks: false,
        tasksPath: ".agentplane/tasks.json",
        workflowDir: ".agentplane/tasks",
        taskId: "202601010101-ABCDEF",
      }),
    ).rejects.toMatchObject<CliError>({
      code: "E_COMMIT_ALLOW_EMPTY",
      message: "Provide at least one allowed prefix",
      context: {
        remediation:
          "Review changed paths and pass the narrowest --commit-allow prefix, or make a code change before retrying.",
      },
    });
    await expect(
      stageAllowlist({
        ctx: ctxEmptyAllow as never,
        allow: ["."],
        allowTasks: false,
        tasksPath: ".agentplane/tasks.json",
        workflowDir: ".agentplane/tasks",
        taskId: "202601010101-ABCDEF",
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });
    await expect(
      stageAllowlist({
        ctx: ctxEmptyAllow as never,
        allow: ["."],
        allowTasks: false,
        tasksPath: ".agentplane/tasks.json",
        workflowDir: ".agentplane/tasks",
        taskId: "202601010101-ABCDEF",
      }),
    ).rejects.toThrow("Repo-wide allowlist");

    await expect(
      stageAllowlist({
        ctx: ctx as never,
        allow: ["src"],
        allowTasks: false,
        tasksPath: ".agentplane/tasks.json",
        workflowDir: ".agentplane/tasks",
        taskId: "202601010101-ABCDEF",
      }),
    ).rejects.toMatchObject<CliError>({
      code: "E_COMMIT_ALLOW_EMPTY",
      message: "No changes to stage (working tree clean)",
      context: {
        remediation:
          "Review changed paths and pass the narrowest --commit-allow prefix, or make a code change before retrying.",
      },
    });

    const ctxNoMatch = {
      git: {
        statusChangedPaths: vi.fn().mockResolvedValue([".agentplane/tasks.json"]),
        stage: vi.fn(),
      },
    };
    await expect(
      stageAllowlist({
        ctx: ctxNoMatch as never,
        allow: [".agentplane/tasks.json"],
        allowTasks: false,
        tasksPath: ".agentplane/tasks.json",
        workflowDir: ".agentplane/tasks",
        taskId: "202601010101-ABCDEF",
      }),
    ).rejects.toMatchObject<CliError>({
      code: "E_COMMIT_ALLOW_TASK_ARTIFACT_DENIED",
      context: {
        denied_paths: [".agentplane/tasks.json"],
        remediation:
          "Retry with the task-artifact allow flag for the active task, or split unrelated task artifacts into their own lifecycle commit.",
      },
    });
    await expect(
      stageAllowlist({
        ctx: ctxNoMatch as never,
        allow: [".agentplane/tasks.json"],
        allowTasks: false,
        tasksPath: ".agentplane/tasks.json",
        workflowDir: ".agentplane/tasks",
        taskId: "202601010101-ABCDEF",
      }),
    ).rejects.toThrow("No changes matched allowed prefixes");

    const ctxOk = {
      resolvedProject: {
        gitRoot: repoRoot,
      },
      config: {
        workflow_mode: "branch_pr",
      },
      git: {
        statusChangedPaths: vi.fn().mockResolvedValue(["src/a.ts", "src/b.ts", "docs/readme.md"]),
        stage: vi.fn().mockResolvedValue(),
      },
    };
    const staged = await stageAllowlist({
      ctx: ctxOk as never,
      allow: ["src", "./src", "src/a.ts", "src//"],
      allowTasks: false,
      tasksPath: ".agentplane/tasks.json",
      workflowDir: ".agentplane/tasks",
      taskId: "202601010101-ABCDEF",
    });
    expect(staged).toEqual(["src/a.ts", "src/b.ts"]);
    expect(ctxOk.git.stage).toHaveBeenCalledWith(["src/a.ts", "src/b.ts"]);
  });

  it("stageAllowlist auto-admits only the active task artifact prefixes when allowTasks=true", async () => {
    const { stageAllowlist } = await import("./allow.js");
    const ctx = {
      resolvedProject: {
        gitRoot: repoRoot,
      },
      config: {
        workflow_mode: "branch_pr",
      },
      git: {
        statusChangedPaths: vi
          .fn()
          .mockResolvedValue([
            ".agentplane/tasks/202601010101-ABCDEF/evidence.txt",
            ".agentplane/tasks/202601010101-OTHER01/evidence.txt",
            "src/app.ts",
          ]),
        stage: vi.fn().mockResolvedValue(),
      },
    };

    const staged = await stageAllowlist({
      ctx: ctx as never,
      allow: ["src"],
      allowTasks: true,
      tasksPath: ".agentplane/tasks.json",
      workflowDir: ".agentplane/tasks",
      taskId: "202601010101-ABCDEF",
    });

    expect(staged).toEqual([".agentplane/tasks/202601010101-ABCDEF/evidence.txt", "src/app.ts"]);
    expect(ctx.git.stage).toHaveBeenCalledWith([
      ".agentplane/tasks/202601010101-ABCDEF/evidence.txt",
      "src/app.ts",
    ]);
  });

  it("stageAllowlist can admit task-only changes when allowTaskOnly=true", async () => {
    const { stageAllowlist } = await import("./allow.js");
    const ctx = {
      resolvedProject: {
        gitRoot: repoRoot,
      },
      config: {
        workflow_mode: "branch_pr",
      },
      git: {
        statusChangedPaths: vi
          .fn()
          .mockResolvedValue([".agentplane/tasks/202601010101-ABCDEF/README.md"]),
        stage: vi.fn().mockResolvedValue(),
      },
    };

    const staged = await stageAllowlist({
      ctx: ctx as never,
      allow: [],
      allowTasks: true,
      allowTaskOnly: true,
      tasksPath: ".agentplane/tasks.json",
      workflowDir: ".agentplane/tasks",
      taskId: "202601010101-ABCDEF",
    });

    expect(staged).toEqual([".agentplane/tasks/202601010101-ABCDEF/README.md"]);
    expect(ctx.git.stage).toHaveBeenCalledWith([".agentplane/tasks/202601010101-ABCDEF/README.md"]);
  });

  it("stageAllowlist can admit CI-only changes when allowCI=true", async () => {
    const { stageAllowlist } = await import("./allow.js");
    const ctx = {
      resolvedProject: {
        gitRoot: repoRoot,
      },
      config: {
        workflow_mode: "branch_pr",
      },
      git: {
        statusChangedPaths: vi
          .fn()
          .mockResolvedValue([".github/workflows/publish.yml", "src/app.ts"]),
        stage: vi.fn().mockResolvedValue(),
      },
    };

    const staged = await stageAllowlist({
      ctx: ctx as never,
      allow: [],
      allowTasks: false,
      allowCI: true,
      tasksPath: ".agentplane/tasks.json",
      workflowDir: ".agentplane/tasks",
      taskId: "202601010101-ABCDEF",
    });

    expect(staged).toEqual([".github/workflows/publish.yml"]);
    expect(ctx.git.stage).toHaveBeenCalledWith([".github/workflows/publish.yml"]);
  });

  it("stageAllowlist includes Git mutation kind metadata in staging diagnostics", async () => {
    const { stageAllowlist } = await import("./allow.js");
    const ctx = {
      git: {
        statusChangedPaths: vi.fn().mockResolvedValue(["docs/readme.md"]),
        stage: vi.fn(),
      },
    };

    let err: unknown;
    try {
      await stageAllowlist({
        ctx: ctx as never,
        allow: ["src"],
        allowTasks: false,
        tasksPath: ".agentplane/tasks.json",
        workflowDir: ".agentplane/tasks",
        taskId: "202601010101-ABCDEF",
        mutationKind: "lifecycle_commit",
      });
    } catch (caught) {
      err = caught;
    }

    expect(err).toMatchObject<CliError>({
      code: "E_COMMIT_ALLOW_NO_MATCH",
      context: {
        command: "stage-allowlist",
        mutation_kind: "lifecycle_commit",
        task_id: "202601010101-ABCDEF",
        allow_prefixes: ["src"],
        changed_paths: ["docs/readme.md"],
        remediation:
          "Run agentplane guard suggest-allow, then retry with a prefix that covers the intended changed paths.",
      },
    });
    expect(ctx.git.stage).not.toHaveBeenCalled();
  });

  it("stageAllowlist includes worktree git context when staging fails", async () => {
    const { stageAllowlist } = await import("./allow.js");
    const ctx = {
      resolvedProject: {
        gitRoot: repoRoot,
      },
      config: {
        workflow_mode: "branch_pr",
      },
      git: {
        statusChangedPaths: vi.fn().mockResolvedValue(["src/app.ts"]),
        stage: vi.fn().mockRejectedValue(new Error("index lock denied")),
      },
    };

    await expect(
      stageAllowlist({
        ctx: ctx as never,
        allow: ["src"],
        allowTasks: false,
        tasksPath: ".agentplane/tasks.json",
        workflowDir: ".agentplane/tasks",
        taskId: "202601010101-ABCDEF",
        mutationKind: "implementation_commit",
      }),
    ).rejects.toMatchObject<CliError>({
      code: "E_GIT_RACE",
      message: "Failed to stage allowed paths: index lock denied",
      context: {
        command: "git add",
        cwd: repoRoot,
        git_repo_root: repoRoot,
        git_dir: defaultGitDir,
        git_branch: "task/202601010101-ABCDEF/example",
        workflow_mode: "branch_pr",
        mutation_kind: "implementation_commit",
        task_id: "202601010101-ABCDEF",
        allow_prefixes: ["src"],
        changed_paths: ["src/app.ts"],
        staged_paths: ["src/app.ts"],
        remediation:
          "Inspect the reported git context, fix the index state or permissions, then retry the same command.",
      },
    });
  });

  it("stageAllowlist classifies Git permission and generic stage failures", async () => {
    const { stageAllowlist } = await import("./allow.js");
    const baseCtx = {
      resolvedProject: {
        gitRoot: repoRoot,
      },
      config: {
        workflow_mode: "branch_pr",
      },
    };
    const stage = async (message: string): Promise<unknown> => {
      try {
        await stageAllowlist({
          ctx: {
            ...baseCtx,
            git: {
              statusChangedPaths: vi.fn().mockResolvedValue(["src/app.ts"]),
              stage: vi.fn().mockRejectedValue(new Error(message)),
            },
          } as never,
          allow: ["src"],
          allowTasks: false,
          tasksPath: ".agentplane/tasks.json",
          workflowDir: ".agentplane/tasks",
          taskId: "202601010101-ABCDEF",
          mutationKind: "implementation_commit",
        });
      } catch (err) {
        return err;
      }
      throw new Error("expected stageAllowlist to reject");
    };

    await expect(stage("fatal: Operation not permitted")).resolves.toMatchObject<CliError>({
      code: "E_GIT_PERMISSION",
      context: {
        remediation:
          "Inspect the reported git context, fix the index state or permissions, then retry the same command.",
      },
    });
    await expect(stage("fatal: unknown git add failure")).resolves.toMatchObject<CliError>({
      code: "E_GIT_STAGE_FAILED",
      context: {
        remediation:
          "Inspect the reported git context, fix the index state or permissions, then retry the same command.",
      },
    });
  });

  it("stageAllowlist reports E_GIT_LOCKED before git add when index.lock exists", async () => {
    const { stageAllowlist } = await import("./allow.js");
    const gitDir = await mkdtemp(path.join(tmpdir(), "agentplane-gitdir-"));
    await writeFile(path.join(gitDir, "index.lock"), "");
    mocks.gitRevParse.mockResolvedValue(gitDir);
    const ctx = {
      resolvedProject: {
        gitRoot: repoRoot,
      },
      config: {
        workflow_mode: "branch_pr",
      },
      git: {
        statusChangedPaths: vi.fn().mockResolvedValue(["src/app.ts"]),
        stage: vi.fn(),
      },
    };

    try {
      await expect(
        stageAllowlist({
          ctx: ctx as never,
          allow: ["src"],
          allowTasks: false,
          tasksPath: ".agentplane/tasks.json",
          workflowDir: ".agentplane/tasks",
          taskId: "202601010101-ABCDEF",
          mutationKind: "implementation_commit",
        }),
      ).rejects.toMatchObject<CliError>({
        code: "E_GIT_LOCKED",
        message: `Git index is locked; refusing to stage allowed paths: ${path.join(
          gitDir,
          "index.lock",
        )}`,
        context: {
          command: "git add",
          cwd: repoRoot,
          git_repo_root: repoRoot,
          git_dir: gitDir,
          git_branch: "task/202601010101-ABCDEF/example",
          workflow_mode: "branch_pr",
          mutation_kind: "implementation_commit",
          task_id: "202601010101-ABCDEF",
          allow_prefixes: ["src"],
          changed_paths: ["src/app.ts"],
          staged_paths: ["src/app.ts"],
          git_index_lock_path: path.join(gitDir, "index.lock"),
        },
      });
      expect(ctx.git.stage).not.toHaveBeenCalled();
    } finally {
      await rm(gitDir, { recursive: true, force: true });
    }
  });
});
