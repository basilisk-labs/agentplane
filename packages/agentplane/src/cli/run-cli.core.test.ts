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
import { defaultConfig, extractTaskSuffix, type ResolvedProject } from "./core-imports.js";
import { readTask, renderTaskReadme } from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
import { runWithOutputMode } from "./run-cli/globals.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import type * as taskBackend from "../backends/task-backend.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  expectAgentJsonEnvelope,
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
  parseAgentJsonEnvelope,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
} from "@agentplane/testkit";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

async function withApAgentMode<T>(fn: () => Promise<T>): Promise<T> {
  const previousAlias = process.env.AGENTPLANE_CLI_ALIAS;
  const previousAgentMode = process.env.AGENTPLANE_AGENT_MODE;
  const previousPrompts = process.env.AGENTPLANE_PROMPTS;
  const previousNoUpdateCheck = process.env.AGENTPLANE_NO_UPDATE_CHECK;
  try {
    process.env.AGENTPLANE_CLI_ALIAS = "ap";
    process.env.AGENTPLANE_AGENT_MODE = "1";
    return await fn();
  } finally {
    if (previousAlias === undefined) delete process.env.AGENTPLANE_CLI_ALIAS;
    else process.env.AGENTPLANE_CLI_ALIAS = previousAlias;
    if (previousAgentMode === undefined) delete process.env.AGENTPLANE_AGENT_MODE;
    else process.env.AGENTPLANE_AGENT_MODE = previousAgentMode;
    if (previousPrompts === undefined) delete process.env.AGENTPLANE_PROMPTS;
    else process.env.AGENTPLANE_PROMPTS = previousPrompts;
    if (previousNoUpdateCheck === undefined) delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
    else process.env.AGENTPLANE_NO_UPDATE_CHECK = previousNoUpdateCheck;
  }
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

  it("renders the same task help for help task and task --help", async () => {
    const helpIo = captureStdIO();
    let helpText = "";
    try {
      const code = await runCli(["help", "task"]);
      expect(code).toBe(0);
      helpText = helpIo.stdout;
    } finally {
      helpIo.restore();
    }

    const taskIo = captureStdIO();
    try {
      const code = await runCli(["task", "--help"]);
      expect(code).toBe(0);
      expect(taskIo.stdout.trim()).toBe(helpText.trim());
      expect(taskIo.stdout).toContain("task - Task lifecycle and task-store commands.");
      expect(taskIo.stdout).toContain("agentplane task <subcommand> [args] [options]");
      expect(taskIo.stdout).toContain("agentplane task plan set <task-id> --text");
    } finally {
      taskIo.restore();
    }
  });

  it("prints command help when --help is trailing after positional args/options", async () => {
    const cases: { argv: string[]; usage: string }[] = [
      { argv: ["sync", "redmine", "--help"], usage: "agentplane sync [<id>] [options]" },
      {
        argv: ["backend", "sync", "redmine", "--help"],
        usage: "agentplane backend sync <id> [options]",
      },
      {
        argv: ["sync", "--direction", "pull", "--help"],
        usage: "agentplane sync [<id>] [options]",
      },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli(entry.argv);
        expect(code).toBe(0);
        expect(io.stdout).toContain(entry.usage);
      } finally {
        io.restore();
      }
    }
  });

  it("wraps trailing help in an agent_json_v1 envelope when --output json is set", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["--output", "json", "task", "--help"]);
      expect(code).toBe(0);
      const payload = parseAgentJsonEnvelope(io.stdout);
      expectAgentJsonEnvelope(payload, {
        command: "help",
        ok: true,
        exitCode: 0,
        hasData: false,
      });
      expect(payload.stdout).toContain("task - Task lifecycle and task-store commands.");
      expect(payload.stdout).toContain("Usage:");
      expect(payload.stderr).toBe("");
    } finally {
      io.restore();
    }
  });

  it("preserves help output mode flags for trailing --help", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["sync", "redmine", "--help", "--compact"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Usage:");
      expect(io.stdout).not.toContain("Examples:");
    } finally {
      io.restore();
    }
  });

  it("rejects unsupported trailing tokens after --help", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["sync", "redmine", "--help", "--bogus"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unsupported flag(s) after --help");
      expect(io.stderr).toContain("agentplane help help --compact");
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

  it("uses compact help by default in experimental ap agent mode", async () => {
    await withApAgentMode(async () => {
      const io = captureStdIO();
      try {
        const code = await runCli(["help", "task"]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("Usage:");
        expect(io.stdout).toContain("agentplane task <subcommand> [args] [options]");
        expect(io.stdout).not.toContain("Examples:");
      } finally {
        io.restore();
      }
    });
  });

  it("expands experimental ap task shorthands before command matching", async () => {
    await withApAgentMode(async () => {
      const io = captureStdIO();
      try {
        const code = await runCli(["next", "--help"]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("agentplane task next [options]");
        expect(io.stdout).not.toContain("Examples:");
      } finally {
        io.restore();
      }
    });
  });

  it("keeps ap init non-interactive and emits structured errors by default", async () => {
    await withApAgentMode(async () => {
      const root = await mkTempDir();
      const io = captureStdIO();
      try {
        const code = await runCli(["init", "--root", root]);
        expect(code).toBe(2);
        expect(io.stdout).toContain('"code": "E_USAGE"');
        expect(io.stdout).toContain("Non-interactive init requires");
        expect(process.env.AGENTPLANE_PROMPTS).toBe("plain");
        expect(process.env.AGENTPLANE_NO_UPDATE_CHECK).toBe("1");
      } finally {
        io.restore();
      }
    });
  });

  it("keeps command-scoped --version options distinct from the global version flag", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["acr", "schema", "--version", "0.1"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain('"$id": "https://agentplane.org/schemas/acr-v0.1.schema.json"');
      expect(io.stdout).toContain('"version"');
    } finally {
      io.restore();
    }
  });

  it("does not load .env for group/root commands that do not require project context", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const marker = "AGENTPLANE_TEST_SKIP_DOTENV";
    delete process.env[marker];
    await writeFile(path.join(root, ".env"), `${marker}=from-dotenv\n`, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(process.env[marker]).toBeUndefined();
    } finally {
      delete process.env[marker];
      io.restore();
    }
  });

  it("does not load .env for fast help paths that only need registry metadata", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const marker = "AGENTPLANE_TEST_SKIP_DOTENV_FOR_HELP";
    delete process.env[marker];
    await writeFile(path.join(root, ".env"), `${marker}=from-dotenv\n`, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "--help", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("agentplane task <subcommand> [args] [options]");
      expect(process.env[marker]).toBeUndefined();
    } finally {
      delete process.env[marker];
      io.restore();
    }
  });

  it("does not load .env for ide sync when dispatch only needs project metadata", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, "AGENTS.md"), "# Agents\n\nRules go here.\n", "utf8");
    await mkdir(path.join(root, ".agentplane", "agents"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "agents", "CODER.json"),
      JSON.stringify(
        {
          id: "CODER",
          role: "Implement approved task scope with the smallest coherent diff.",
          description: "Task-scoped implementation role.",
        },
        null,
        2,
      ) + "\n",
      "utf8",
    );
    const marker = "AGENTPLANE_TEST_SKIP_DOTENV_FOR_IDE_SYNC";
    delete process.env[marker];
    await writeFile(path.join(root, ".env"), `${marker}=from-dotenv\n`, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["ide", "sync", "--ide", "cursor", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(".cursor/rules/agentplane.mdc");
      expect(process.env[marker]).toBeUndefined();
    } finally {
      delete process.env[marker];
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

  it("skips update check in conservative profile even when require_network=false", async () => {
    const root = await mkGitRepoRoot();
    const cfg = defaultConfig();
    cfg.execution.profile = "conservative";
    cfg.agents.approvals.require_network = false;
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
      expect(globalThis.fetch).not.toHaveBeenCalled();
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

  it("allows conservative update check when --allow-network is provided", async () => {
    const root = await mkGitRepoRoot();
    const cfg = defaultConfig();
    cfg.execution.profile = "conservative";
    cfg.agents.approvals.require_network = false;
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
      expect(JSON.parse(io.stdout)).toEqual({
        error: {
          code: "E_USAGE",
          message:
            "Missing required argument: key\n\nUsage:\n  agentplane config set <key> <value>",
          context: {
            command: "config set",
          },
          hint: "See `agentplane help config set --compact` for usage.",
          next_action: {
            command: "agentplane help config set --compact",
            reason: "inspect required arguments and flags",
            reasonCode: "usage_help",
          },
          reason_decode: {
            code: "usage_help",
            category: "usage",
            summary: "command invocation is incomplete or invalid",
            action: "open command help and fix required args/flags",
          },
        },
      });
      expect(io.stderr).toBe("");
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
      expect(io.stderr).toContain("next_action: agentplane help");
      expect(io.stderr).toContain(
        "reason_code: usage_help [usage] command invocation is incomplete or invalid",
      );
    } finally {
      io.restore();
    }
  });

  it("does not load .env for unknown commands before usage guidance", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const marker = "AGENTPLANE_TEST_SKIP_DOTENV_FOR_UNKNOWN";
    delete process.env[marker];
    await writeFile(path.join(root, ".env"), `${marker}=from-dotenv\n`, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unknown command: nope");
      expect(process.env[marker]).toBeUndefined();
    } finally {
      delete process.env[marker];
      io.restore();
    }
  });

  it("renders task namespace help instead of treating task as an unknown command", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "task"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("task - Task lifecycle and task-store commands.");
      expect(io.stdout).toContain("agentplane task <subcommand> [args] [options]");
      expect(io.stdout).toContain("agentplane task plan set <task-id> --text");
      expect(io.stdout).toContain("agentplane finish ...");
    } finally {
      io.restore();
    }
  });

  it("returns usage help for task root command", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["task"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing subcommand.");
      expect(io.stderr).toContain("agentplane help task --compact");
      expect(io.stderr).not.toContain("Unknown command: task");
    } finally {
      io.restore();
    }
  });

  it("returns usage help for task plan namespace", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "plan"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing subcommand.");
      expect(io.stderr).toContain("agentplane help task plan --compact");
      expect(io.stderr).not.toContain("Unknown command: task plan");
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
      expect(io.stdout).toContain('"reasonCode": "usage_help"');
      expect(io.stderr.trim()).toBe("");
    } finally {
      io.restore();
    }
  });

  it("prints JSON success envelope when --output json is set", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["--output", "json", "config", "show", "--root", root]);
      expect(code).toBe(0);
      const payload = parseAgentJsonEnvelope(io.stdout);
      expectAgentJsonEnvelope(payload, {
        command: "config show",
        ok: true,
        exitCode: 0,
        hasData: true,
      });
      expect(payload.stderr).toBe("");
      expect(typeof (payload.data as { workflow_mode?: unknown } | undefined)?.workflow_mode).toBe(
        "string",
      );
      expect(payload.stdout).toBe(JSON.stringify(payload.data, null, 2));
      expect(JSON.parse(payload.stdout ?? "")).toEqual(payload.data);
      expect(io.stdout).toBe(`${JSON.stringify(payload, null, 2)}\n`);
      expect(io.stderr).toBe("");
    } finally {
      io.restore();
    }
  });

  it("runWithOutputMode captures raw stdout/stderr inside the agent_json_v1 envelope", async () => {
    const io = captureStdIO();
    try {
      const code = await runWithOutputMode({
        mode: "json",
        command: "demo command",
        run: () => {
          process.stdout.write('{"hello":"world"}\n');
          process.stderr.write("warn line\n");
          return Promise.resolve(7);
        },
      });
      expect(code).toBe(7);
      const payload = parseAgentJsonEnvelope(io.stdout);
      expectAgentJsonEnvelope(payload, {
        command: "demo command",
        ok: false,
        exitCode: 7,
        hasData: true,
      });
      expect(payload).toEqual({
        schema_version: 1,
        mode: "agent_json_v1",
        command: "demo command",
        ok: false,
        exit_code: 7,
        stdout: '{"hello":"world"}',
        stderr: "warn line",
        data: {
          hello: "world",
        },
      });
      expect(io.stderr).toBe("");
    } finally {
      io.restore();
    }
  });

  it("runWithOutputMode keeps stdout/stderr pass-through behavior outside the structured collector", async () => {
    const io = captureStdIO();
    try {
      const code = await runWithOutputMode({
        mode: "json",
        command: "passthrough demo",
        run: () => {
          process.stdout.write("inside stdout\n");
          process.stderr.write("inside stderr\n");
          return Promise.resolve(0);
        },
      });
      expect(code).toBe(0);

      process.stdout.write("outside stdout\n");
      process.stderr.write("outside stderr\n");

      const outsideStdout = "outside stdout\n";
      const outsideStdoutIndex = io.stdout.indexOf(outsideStdout);
      const hasOutsideStdout = outsideStdoutIndex !== -1;
      const payloadText = hasOutsideStdout
        ? io.stdout.slice(0, outsideStdoutIndex).trimEnd()
        : io.stdout;
      const payload = JSON.parse(payloadText) as {
        stdout?: string;
        stderr?: string;
      };
      expect(payload.stdout).toBe("inside stdout");
      expect(payload.stderr).toBe("inside stderr");
      expect(io.stdout.slice(outsideStdoutIndex)).toBe(outsideStdout);
      expect(io.stderr).toBe("outside stderr\n");
    } finally {
      io.restore();
    }
  });

  it("uses AGENTPLANE_OUTPUT=json as global output mode", async () => {
    const original = process.env.AGENTPLANE_OUTPUT;
    process.env.AGENTPLANE_OUTPUT = "json";
    const io = captureStdIO();
    try {
      const code = await runCli(["help"]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        mode?: string;
        command?: string;
        ok?: boolean;
      };
      expect(payload.mode).toBe("agent_json_v1");
      expect(payload.command).toBe("help");
      expect(payload.ok).toBe(true);
    } finally {
      if (original === undefined) {
        delete process.env.AGENTPLANE_OUTPUT;
      } else {
        process.env.AGENTPLANE_OUTPUT = original;
      }
      io.restore();
    }
  });

  it("prints JSON errors automatically when --output json is set", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["--output", "json", "config", "set"]);
      expect(code).toBe(2);
      expect(JSON.parse(io.stdout)).toEqual({
        error: {
          code: "E_USAGE",
          message:
            "Missing required argument: key\n\nUsage:\n  agentplane config set <key> <value>",
          context: {
            command: "config set",
          },
          hint: "See `agentplane help config set --compact` for usage.",
          next_action: {
            command: "agentplane help config set --compact",
            reason: "inspect required arguments and flags",
            reasonCode: "usage_help",
          },
          reason_decode: {
            code: "usage_help",
            category: "usage",
            summary: "command invocation is incomplete or invalid",
            action: "open command help and fix required args/flags",
          },
        },
      });
      expect(io.stdout).not.toContain('"mode": "agent_json_v1"');
      expect(io.stderr).toBe("");
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
      expect(io.stderr).toContain("Validation error:");
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
      expect(io.stdout).toBe(`${JSON.stringify(defaultConfig(), null, 2)}\n`);
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

  it("config set syncs workflow artifacts when workflow_mode changes", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane", "agents"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "agents", "ORCHESTRATOR.json"), "{}\n", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "set", "workflow_mode", "branch_pr", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const workflowPath = path.join(root, ".agentplane", "WORKFLOW.md");
    const text = await readFile(workflowPath, "utf8");
    expect(text).toContain("mode: branch_pr");
    const workflowText = await readFile(path.join(root, ".agentplane", "WORKFLOW.md"), "utf8");
    const lastKnownGoodText = await readFile(
      path.join(root, ".agentplane", "workflows", "last-known-good.md"),
      "utf8",
    );
    expect(workflowText).toContain('mode: "branch_pr"');
    expect(lastKnownGoodText).toContain('mode: "branch_pr"');
  });
});
