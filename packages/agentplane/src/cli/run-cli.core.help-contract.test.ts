import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { runCli } from "./run-cli.js";
import { captureStdIO, silenceStdIO } from "@agentplane/testkit";
import { COMMANDS } from "./run-cli/command-catalog.js";
import { helpSpec } from "./spec/help.js";

type HelpJson = {
  id: string[];
  options: { name: string; short?: string; hidden?: boolean }[];
};

function keyId(id: string[]): string {
  return id.join(" ");
}

function expectedHelpIdsSorted(): string[] {
  return [
    ...new Set([helpSpec.id.join(" "), ...COMMANDS.map((e) => e.spec.id.join(" "))]),
  ].toSorted();
}

let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

describe("cli help contract", () => {
  it("top-level --help matches help output", async () => {
    const helpIo = captureStdIO();
    let helpStdout = "";
    try {
      const code = await runCli(["help"]);
      expect(code).toBe(0);
      helpStdout = helpIo.stdout;
    } finally {
      helpIo.restore();
    }

    const flagIo = captureStdIO();
    try {
      const code = await runCli(["--help"]);
      expect(code).toBe(0);
      expect(flagIo.stdout).toBe(helpStdout);
    } finally {
      flagIo.restore();
    }
  });

  it("explicit help commands stay stable when trailing --help is also present", async () => {
    const helpIo = captureStdIO();
    let helpStdout = "";
    try {
      const code = await runCli(["help", "task"]);
      expect(code).toBe(0);
      helpStdout = helpIo.stdout;
    } finally {
      helpIo.restore();
    }

    const aliasIo = captureStdIO();
    try {
      const code = await runCli(["help", "task", "--help"]);
      expect(code).toBe(0);
      expect(aliasIo.stdout).toBe(helpStdout);
    } finally {
      aliasIo.restore();
    }
  });

  it("blueprint explain help lists context as a synthetic kind", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "blueprint", "explain", "--compact"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("--kind <analysis|content|docs|code|release|ops|context>");
    } finally {
      io.restore();
    }
  });

  it("blueprint explain accepts context as a synthetic kind", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli([
        "blueprint",
        "explain",
        "--kind",
        "context",
        "--workflow-mode",
        "branch_pr",
        "--blueprint",
        "context.assimilation",
        "--json",
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        blueprintId: string;
        stopReasons: string[];
      };
      expect(payload.blueprintId).toBe("context.assimilation");
      expect(payload.stopReasons).toEqual([]);
    } finally {
      io.restore();
    }
  });

  it("help --json returns a stable, internally consistent registry", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "--json"]);
      expect(code).toBe(0);
      const list = JSON.parse(io.stdout) as HelpJson[];
      const ids = list.map((spec) => keyId(spec.id));

      // Unique command ids.
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
      expect(ids).toEqual(
        expect.arrayContaining([
          "codex",
          "codex plugin",
          "codex plugin install",
          "help",
          "task",
          "task list",
          "task search",
          "task next",
          "task plan",
          "task doc",
          "work start",
        ]),
      );

      // Unique option names/shorts within a command.
      for (const spec of list) {
        const seenName = new Set<string>();
        const seenShort = new Set<string>();
        for (const opt of spec.options ?? []) {
          const name = String(opt.name);
          expect(seenName.has(name)).toBe(false);
          seenName.add(name);
          if (opt.short) {
            const s = String(opt.short);
            expect(seenShort.has(s)).toBe(false);
            seenShort.add(s);
          }
        }
      }
    } finally {
      io.restore();
    }
  });

  it("help --json covers the canonical command catalog id set", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "--json", "--all"]);
      expect(code).toBe(0);
      const list = JSON.parse(io.stdout) as HelpJson[];
      const ids = [...new Set(list.map((spec) => keyId(spec.id)))].toSorted();
      expect(ids).toEqual(expectedHelpIdsSorted());
    } finally {
      io.restore();
    }
  });

  it("normal project help hides framework-maintainer commands by default", async () => {
    const outsideRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-help-outside-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["--root", outsideRoot, "help"]);
      expect(code).toBe(0);
      expect(io.stdout).not.toContain("release  Prepare a release");
      expect(io.stdout).not.toContain("Framework Dev:");
      expect(io.stdout).toContain("task  Task lifecycle and task-store commands.");
      expect(io.stdout).toContain("work start  Prepare the workspace for a task");
    } finally {
      io.restore();
    }
  });

  it("normal project help rejects explicit framework-maintainer command help", async () => {
    const outsideRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-help-outside-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["--root", outsideRoot, "help", "release"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unknown command: release.");
    } finally {
      io.restore();
    }
  });

  it("normal project dispatch rejects framework-maintainer commands", async () => {
    const outsideRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-help-outside-"));
    const previousCwd = process.cwd();
    const io = captureStdIO();
    try {
      process.chdir(outsideRoot);
      const code = await runCli(["release"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain(
        "Framework dev command is only available inside the AgentPlane framework checkout.",
      );
    } finally {
      process.chdir(previousCwd);
      io.restore();
    }
  });

  it("framework checkout help exposes framework-dev commands in a dedicated group", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Framework Dev:");
      expect(io.stdout).toContain("release  Prepare a release");
      expect(io.stdout).toContain("docs cli  Generate an MDX CLI reference");
    } finally {
      io.restore();
    }
  });

  it("task --help routes to task namespace help", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "--help"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("task - Task lifecycle and task-store commands.");
      expect(io.stdout).toContain("agentplane task <subcommand> [args] [options]");
      expect(io.stdout).toContain("agentplane task plan set <task-id> --text");
      expect(io.stdout).not.toContain("Unknown command: task");
    } finally {
      io.restore();
    }
  });

  it("task plan --help routes to task plan namespace help", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "plan", "--help"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("task plan - Task plan commands (set/approve/reject).");
      expect(io.stdout).toContain("agentplane task plan <set|approve|reject> [args] [options]");
      expect(io.stdout).toContain("agentplane task plan set <task-id> --text");
      expect(io.stdout).not.toContain("Unknown command: task plan");
    } finally {
      io.restore();
    }
  });

  it("unknown commands surface close-match suggestions", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["taks"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unknown command: taks. Did you mean: task?");
      expect(io.stderr).toContain("agentplane help help --compact");
    } finally {
      io.restore();
    }
  });
});
