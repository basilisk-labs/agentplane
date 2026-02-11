/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/consistent-type-imports */
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
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  defaultConfig,
  extractTaskSuffix,
  readTask,
  renderTaskReadme,
  type ResolvedProject,
} from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import { BUNDLED_RECIPES_CATALOG } from "../recipes/bundled-recipes.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import * as taskBackend from "../backends/task-backend.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
  registerAgentplaneHome,
  silenceStdIO,
  stageGitignoreIfPresent,
  writeConfig,
  writeDefaultConfig,
} from "./run-cli.test-helpers.js";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

registerAgentplaneHome();
let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

function stubTaskBackend(overrides: Partial<taskBackend.TaskBackend>): taskBackend.TaskBackend {
  return {
    id: "local",
    listTasks: vi.fn().mockResolvedValue([]),
    getTask: vi.fn().mockResolvedValue(null),
    writeTask: vi.fn().mockImplementation(() => Promise.resolve()),
    ...overrides,
  };
}

describe("runCli", () => {
  it("prints help on --help", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["--help"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Usage:");
    } finally {
      io.restore();
    }
  });

  it("prints version on --version", async () => {
    const pkg = JSON.parse(
      readFileSync(path.join(process.cwd(), "packages/agentplane/package.json"), "utf8"),
    ) as { version?: string };
    const expectedVersion = pkg.version ?? "0.0.0";
    const io = captureStdIO();
    try {
      const code = await runCli(["--version"]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe(expectedVersion);
    } finally {
      io.restore();
    }
  });

  it("prints update notice when npm has a newer version", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const home = getAgentplaneHome();
    if (!home) throw new Error("agentplane home not set");
    const cachePath = resolveUpdateCheckCachePath(home);
    await rm(cachePath, { force: true });
    const io = captureStdIO();
    const originalFetch = globalThis.fetch;
    const originalNoUpdateCheck = process.env.AGENTPLANE_NO_UPDATE_CHECK;
    delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
    globalThis.fetch = vi.fn(() => Response.json({ version: "9.9.9" })) as unknown as typeof fetch;
    try {
      const code = await runCli(["--allow-network", "config", "show", "--root", root]);
      expect(code).toBe(0);
      expect(io.stderr).toContain("Update available");
      expect(io.stderr).toContain("npm i -g agentplane@latest");
    } finally {
      globalThis.fetch = originalFetch;
      if (originalNoUpdateCheck === undefined) {
        delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
      } else {
        process.env.AGENTPLANE_NO_UPDATE_CHECK = originalNoUpdateCheck;
      }
      io.restore();
    }
  });

  it("skips update check when require_network=true and no explicit approval is present", async () => {
    const root = await mkGitRepoRoot();
    const cfg = defaultConfig();
    cfg.agents ??= {
      approvals: { require_plan: true, require_network: true, require_verify: true },
    };
    cfg.agents.approvals.require_network = true;
    await writeConfig(root, cfg);

    const home = getAgentplaneHome();
    if (!home) throw new Error("agentplane home not set");
    const cachePath = resolveUpdateCheckCachePath(home);
    await rm(cachePath, { force: true });

    const io = captureStdIO();
    const originalFetch = globalThis.fetch;
    const originalNoUpdateCheck = process.env.AGENTPLANE_NO_UPDATE_CHECK;
    delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
    globalThis.fetch = vi.fn(() => {
      throw new Error("should not fetch");
    }) as unknown as typeof fetch;
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(0);
      expect(io.stderr).not.toContain("Update available");
      expect(globalThis.fetch).not.toHaveBeenCalled();
    } finally {
      globalThis.fetch = originalFetch;
      if (originalNoUpdateCheck === undefined) {
        delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
      } else {
        process.env.AGENTPLANE_NO_UPDATE_CHECK = originalNoUpdateCheck;
      }
      io.restore();
    }
  });

  it("allows update check when require_network=true and --allow-network is present", async () => {
    const root = await mkGitRepoRoot();
    const cfg = defaultConfig();
    cfg.agents ??= {
      approvals: { require_plan: true, require_network: true, require_verify: true },
    };
    cfg.agents.approvals.require_network = true;
    await writeConfig(root, cfg);

    const home = getAgentplaneHome();
    if (!home) throw new Error("agentplane home not set");
    const cachePath = resolveUpdateCheckCachePath(home);
    await rm(cachePath, { force: true });

    const io = captureStdIO();
    const originalFetch = globalThis.fetch;
    const originalNoUpdateCheck = process.env.AGENTPLANE_NO_UPDATE_CHECK;
    delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
    globalThis.fetch = vi.fn(() =>
      Response.json({ version: "9999.9999.9999" }),
    ) as unknown as typeof fetch;
    try {
      const code = await runCli(["--allow-network", "config", "show", "--root", root]);
      expect(code).toBe(0);
      expect(globalThis.fetch).toHaveBeenCalled();
      expect(io.stderr).toContain("Update available");
    } finally {
      globalThis.fetch = originalFetch;
      if (originalNoUpdateCheck === undefined) {
        delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
      } else {
        process.env.AGENTPLANE_NO_UPDATE_CHECK = originalNoUpdateCheck;
      }
      io.restore();
    }
  });

  it("uses fresh update cache without network", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const home = getAgentplaneHome();
    if (!home) throw new Error("agentplane home not set");
    const cachePath = resolveUpdateCheckCachePath(home);
    await mkdir(path.dirname(cachePath), { recursive: true });
    await writeFile(
      cachePath,
      JSON.stringify(
        {
          schema_version: 1,
          checked_at: new Date().toISOString(),
          latest_version: "9.9.9",
          etag: '"etag"',
          status: "ok",
        },
        null,
        2,
      ),
      "utf8",
    );
    const io = captureStdIO();
    const originalFetch = globalThis.fetch;
    const originalNoUpdateCheck = process.env.AGENTPLANE_NO_UPDATE_CHECK;
    delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
    globalThis.fetch = vi.fn(() => {
      throw new Error("should not fetch");
    }) as unknown as typeof fetch;
    try {
      const code = await runCli(["--allow-network", "config", "show", "--root", root]);
      expect(code).toBe(0);
      expect(io.stderr).toContain("Update available");
      expect(globalThis.fetch).not.toHaveBeenCalled();
    } finally {
      globalThis.fetch = originalFetch;
      if (originalNoUpdateCheck === undefined) {
        delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
      } else {
        process.env.AGENTPLANE_NO_UPDATE_CHECK = originalNoUpdateCheck;
      }
      io.restore();
    }
  });

  it("skips update check when --no-update-check is set", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(() => {
      throw new Error("should not fetch");
    }) as unknown as typeof fetch;
    try {
      const code = await runCli(["--no-update-check", "config", "show", "--root", root]);
      expect(code).toBe(0);
      expect(io.stderr).not.toContain("Update available");
      expect(globalThis.fetch).not.toHaveBeenCalled();
    } finally {
      globalThis.fetch = originalFetch;
      io.restore();
    }
  });

  it("skips update check when AGENTPLANE_NO_UPDATE_CHECK is truthy", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    const originalFetch = globalThis.fetch;
    const originalNoUpdateCheck = process.env.AGENTPLANE_NO_UPDATE_CHECK;
    process.env.AGENTPLANE_NO_UPDATE_CHECK = "yes";
    globalThis.fetch = vi.fn(() => {
      throw new Error("should not fetch");
    }) as unknown as typeof fetch;
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(0);
      expect(io.stderr).not.toContain("Update available");
      expect(globalThis.fetch).not.toHaveBeenCalled();
    } finally {
      globalThis.fetch = originalFetch;
      if (originalNoUpdateCheck === undefined) {
        delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
      } else {
        process.env.AGENTPLANE_NO_UPDATE_CHECK = originalNoUpdateCheck;
      }
      io.restore();
    }
  });

  it("does not warn on prerelease versions", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const home = getAgentplaneHome();
    if (!home) throw new Error("agentplane home not set");
    const cachePath = resolveUpdateCheckCachePath(home);
    await rm(cachePath, { force: true });
    const io = captureStdIO();
    const originalFetch = globalThis.fetch;
    const originalNoUpdateCheck = process.env.AGENTPLANE_NO_UPDATE_CHECK;
    delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
    globalThis.fetch = vi.fn(() =>
      Response.json({ version: "0.1.4-beta.1" }),
    ) as unknown as typeof fetch;
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(0);
      expect(io.stderr).not.toContain("Update available");
    } finally {
      globalThis.fetch = originalFetch;
      if (originalNoUpdateCheck === undefined) {
        delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
      } else {
        process.env.AGENTPLANE_NO_UPDATE_CHECK = originalNoUpdateCheck;
      }
      io.restore();
    }
  });

  it("handles not-modified update responses", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const home = getAgentplaneHome();
    if (!home) throw new Error("agentplane home not set");
    const cachePath = resolveUpdateCheckCachePath(home);
    await mkdir(path.dirname(cachePath), { recursive: true });
    await writeFile(
      cachePath,
      JSON.stringify(
        {
          schema_version: 1,
          checked_at: "2020-01-01T00:00:00Z",
          latest_version: "0.1.4",
          etag: '"etag"',
          status: "ok",
        },
        null,
        2,
      ),
      "utf8",
    );
    const io = captureStdIO();
    const originalFetch = globalThis.fetch;
    const originalNoUpdateCheck = process.env.AGENTPLANE_NO_UPDATE_CHECK;
    delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
    globalThis.fetch = vi.fn(() => new Response(null, { status: 304 })) as unknown as typeof fetch;
    try {
      const code = await runCli(["--allow-network", "config", "show", "--root", root]);
      expect(code).toBe(0);
      expect(io.stderr).not.toContain("Update available");
      expect(globalThis.fetch).toHaveBeenCalled();
    } finally {
      globalThis.fetch = originalFetch;
      if (originalNoUpdateCheck === undefined) {
        delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
      } else {
        process.env.AGENTPLANE_NO_UPDATE_CHECK = originalNoUpdateCheck;
      }
      io.restore();
    }
  });

  it("prints json error when --json-errors is set", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["--json-errors", "config", "set"]);
      expect(code).toBe(2);
      expect(io.stdout).toContain('"error"');
      expect(io.stdout).toContain('"code"');
    } finally {
      io.restore();
    }
  });

  it("returns usage error on unknown command", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["nope"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unknown command: nope");
      expect(io.stderr).toContain("Usage:");
    } finally {
      io.restore();
    }
  });

  it("returns usage error when --root is missing a value", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing value after --root (expected repository path)");
    } finally {
      io.restore();
    }
  });

  it("does not enable json error mode when --json is used globally", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["--json", "--root"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing value after --root (expected repository path)");
      expect(io.stdout.trim()).toBe("");
    } finally {
      io.restore();
    }
  });

  it("prints json error when --json-errors is set and --root is missing a value", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["--json-errors", "--root"]);
      expect(code).toBe(2);
      expect(io.stdout).toContain('"error"');
      expect(io.stdout).toContain('"code": "E_USAGE"');
      expect(io.stdout).toContain("Missing value after --root (expected repository path)");
      expect(io.stderr.trim()).toBe("");
    } finally {
      io.restore();
    }
  });

  it("returns usage error when config set is missing key/value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "set", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing required argument");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane config set");
      expect(io.stderr).toContain("agentplane help config set --compact");
    } finally {
      io.restore();
    }
  });

  it("maps non-git roots to E_GIT", async () => {
    const notGitRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-not-git-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", notGitRoot]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("maps invalid JSON config to E_VALIDATION", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{\n", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Invalid JSON:");
    } finally {
      io.restore();
    }
  });

  it("maps schema validation errors to E_VALIDATION", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig() as unknown as { schema_version: number };
    config.schema_version = 99;
    await writeConfig(root, config as ReturnType<typeof defaultConfig>);

    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("schema_version");
    } finally {
      io.restore();
    }
  });

  it("maps IO errors while reading config to E_IO", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    const configPath = path.join(root, ".agentplane", "config.json");
    await writeFile(configPath, '{\n  "schema_version": 1\n}\n', "utf8");
    await chmod(configPath, 0o000);

    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toMatch(/EACCES|permission denied/i);
    } finally {
      io.restore();
      await chmod(configPath, 0o600);
    }
  });

  it("config show prints default config when missing", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain('"schema_version": 1');
    } finally {
      io.restore();
    }
  });

  it("autoloads .env without overriding existing variables", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(
      path.join(root, ".env"),
      ["AGENTPLANE_REDMINE_URL=https://redmine.env", "AGENTPLANE_REDMINE_API_KEY=from-env"].join(
        "\n",
      ),
      "utf8",
    );
    const prevUrl = process.env.AGENTPLANE_REDMINE_URL;
    const prevKey = process.env.AGENTPLANE_REDMINE_API_KEY;
    delete process.env.AGENTPLANE_REDMINE_URL;
    process.env.AGENTPLANE_REDMINE_API_KEY = "preserve";

    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(0);
      expect(process.env.AGENTPLANE_REDMINE_URL).toBe("https://redmine.env");
      expect(process.env.AGENTPLANE_REDMINE_API_KEY).toBe("preserve");
    } finally {
      io.restore();
      if (prevUrl === undefined) delete process.env.AGENTPLANE_REDMINE_URL;
      else process.env.AGENTPLANE_REDMINE_URL = prevUrl;
      if (prevKey === undefined) delete process.env.AGENTPLANE_REDMINE_API_KEY;
      else process.env.AGENTPLANE_REDMINE_API_KEY = prevKey;
    }
  });

  it("config set writes .agentplane/config.json", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "set", "workflow_mode", "direct", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const configPath = path.join(root, ".agentplane", "config.json");
    const text = await readFile(configPath, "utf8");
    expect(text).toContain('"workflow_mode": "direct"');
  });
});
