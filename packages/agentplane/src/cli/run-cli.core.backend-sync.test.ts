/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";

import {
  defaultConfig,
  extractTaskSuffix,
  readTask,
  renderTaskReadme,
  type ResolvedProject,
} from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import { BUNDLED_RECIPES_CATALOG } from "../recipes/bundled-recipes.js";
import { getVersion } from "../meta/version.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
  loadPolicyTemplates,
} from "../agents/agents-template.js";
import { renderPolicyGatewayTemplateText } from "../shared/policy-gateway.js";
import * as taskBackend from "../backends/task-backend.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
} from "./run-cli.test-helpers.js";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

function normalizeSlashes(value: string): string {
  return value.replaceAll("\\", "/");
}

installRunCliIntegrationHarness();

describe("runCli", () => {
  it("backend rejects unknown subcommands", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["backend", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane backend sync");
    } finally {
      io.restore();
    }
  });

  it("backend sync routes to configured backend", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli([
        "backend",
        "sync",
        "local",
        "--direction",
        "pull",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Backend does not support sync()");
    } finally {
      io.restore();
    }
  });

  it("backend sync rejects invalid flags", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const cases: { args: string[] }[] = [
      {
        args: ["backend", "sync", "--direction", "sideways"],
      },
      { args: ["backend", "sync", "--conflict", "nope"] },
      { args: ["backend", "sync", "one", "two"] },
      { args: ["backend", "sync", "--wat"] },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Usage:");
        expect(io.stderr).toContain("agentplane backend sync");
      } finally {
        io.restore();
      }
    }
  });

  it("backend migrate-canonical-state routes to configured backend", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const migrateCanonicalState = vi.fn().mockResolvedValue({
      scanned: 2,
      migrated: ["202603140729-W4D9ZT", "202603140730-R37DPX"],
      skippedStructured: [],
      skippedNoDoc: [],
      failed: [],
    });
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({ id: "redmine", migrateCanonicalState }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "backend",
        "migrate-canonical-state",
        "redmine",
        "--yes",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(migrateCanonicalState).toHaveBeenCalledTimes(1);
      expect(io.stdout).toContain("backend migrate-canonical-state");
      expect(io.stdout).toContain("migrated=2");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("backend migrate-canonical-state requires --yes in non-tty mode when require_network=true and backend is non-local", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const migrateCanonicalState = vi.fn().mockResolvedValue({
      scanned: 0,
      migrated: [],
      skippedStructured: [],
      skippedNoDoc: [],
      failed: [],
    });
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({ id: "redmine", migrateCanonicalState }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli(["backend", "migrate-canonical-state", "redmine", "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("--yes");
      expect(migrateCanonicalState).not.toHaveBeenCalled();
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("backend inspect routes to configured backend", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const inspectConfiguration = vi.fn().mockResolvedValue({
      backendId: "redmine",
      visibleCustomFields: [
        { id: 1, name: "task_id", nonEmptyCount: 5 },
        { id: 2, name: "doc", nonEmptyCount: 5 },
      ],
      canonicalState: {
        configuredFieldId: null,
        visibleFieldId: null,
      },
      configuredFieldNameDrift: [{ key: "doc", configuredId: 2, visibleName: "verify" }],
    });
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({ id: "redmine", inspectConfiguration }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli(["backend", "inspect", "redmine", "--yes", "--root", root]);
      expect(code).toBe(0);
      expect(inspectConfiguration).toHaveBeenCalledTimes(1);
      expect(io.stdout).toContain("backend inspect");
      expect(io.stdout).toContain("canonical_state configured=unset visible=absent");
      expect(io.stdout).toContain("drift key=doc configured-id=2");
      expect(io.stdout).toContain('field id=1 name="task_id" non-empty=5');
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("backend inspect requires --yes in non-tty mode when require_network=true and backend is non-local", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const inspectConfiguration = vi.fn().mockResolvedValue({
      backendId: "redmine",
      visibleCustomFields: [],
      canonicalState: {
        configuredFieldId: null,
        visibleFieldId: null,
      },
      configuredFieldNameDrift: [],
    });
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({ id: "redmine", inspectConfiguration }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli(["backend", "inspect", "redmine", "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("--yes");
      expect(inspectConfiguration).not.toHaveBeenCalled();
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("backend sync forwards flags to the backend", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const sync = vi.fn().mockImplementation(() => Promise.resolve());
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({ id: "redmine", sync }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "backend",
        "sync",
        "redmine",
        "--direction",
        "push",
        "--conflict",
        "prefer-local",
        "--yes",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(sync).toHaveBeenCalledWith({
        direction: "push",
        conflict: "prefer-local",
        quiet: false,
        confirm: true,
      });
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("backend sync requires --yes in non-tty mode when require_network=true and backend is non-local", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const sync = vi.fn().mockImplementation(() => Promise.resolve());
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({ id: "redmine", sync }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "backend",
        "sync",
        "redmine",
        "--direction",
        "push",
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("--yes");
      expect(sync).not.toHaveBeenCalled();
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("sync routes to configured backend", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["sync", "--direction", "pull", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Backend does not support sync()");
    } finally {
      io.restore();
    }
  });

  it("sync rejects invalid flags", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const cases: { args: string[]; msg: string }[] = [
      { args: ["sync", "--direction", "sideways"], msg: "Usage:" },
      { args: ["sync", "--conflict", "nope"], msg: "Usage:" },
      { args: ["sync", "one", "two"], msg: "Usage:" },
      { args: ["sync", "--wat"], msg: "Usage:" },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
        expect(io.stderr).toContain("agentplane sync");
        expect(io.stderr).toContain("agentplane help sync --compact");
      } finally {
        io.restore();
      }
    }
  });

  it("sync forwards flags to the backend", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const sync = vi.fn().mockImplementation(() => Promise.resolve());
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({ id: "redmine", sync }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "sync",
        "redmine",
        "--direction",
        "push",
        "--conflict",
        "prefer-local",
        "--yes",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(sync).toHaveBeenCalledWith({
        direction: "push",
        conflict: "prefer-local",
        quiet: false,
        confirm: true,
      });
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("sync requires --yes in non-tty mode when require_network=true and backend is non-local", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const sync = vi.fn().mockImplementation(() => Promise.resolve());
    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({ id: "redmine", sync }),
      backendId: "redmine",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli(["sync", "redmine", "--direction", "push", "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("--yes");
      expect(sync).not.toHaveBeenCalled();
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });
});
