import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
      expect(ids).toEqual([
        "help",
        "init",
        "quickstart",
        "doctor",
        "task",
        "task active",
        "task advance",
        "task new",
        "task brief",
        "task run",
        "context search",
      ]);
      expect(ids.length).toBeLessThanOrEqual(12);

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
      expect(io.stdout).toContain("task  Supervisor-first task commands.");
      expect(io.stdout).toContain("task advance  Return one compact external-agent action");
      expect(io.stdout).toContain("task run  Supervise a direct or branch_pr task");
    } finally {
      io.restore();
    }
  });

  it("renders explicit help for advanced context commands without requiring --all", async () => {
    const outsideRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-help-outside-"));
    const migrateIo = captureStdIO();
    try {
      const migrateCode = await runCli([
        "--root",
        outsideRoot,
        "help",
        "context",
        "migrate",
        "--compact",
      ]);
      expect(migrateCode).toBe(0);
      expect(migrateIo.stdout).toContain("context migrate - Migrate an existing context workspace");
      expect(migrateIo.stdout).toContain("agentplane context migrate <maximum-assimilation-v2>");
    } finally {
      migrateIo.restore();
    }

    const extractionIo = captureStdIO();
    try {
      const extractionCode = await runCli([
        "--root",
        outsideRoot,
        "help",
        "context",
        "extraction",
        "apply",
        "--compact",
      ]);
      expect(extractionCode).toBe(0);
      expect(extractionIo.stdout).toContain("context extraction apply - Apply a validated");
      expect(extractionIo.stdout).toContain("agentplane context extraction apply <sgr-json>");
    } finally {
      extractionIo.restore();
    }
  });

  it("keeps compatibility inventory and repair out of default help but directly discoverable", async () => {
    const doctorIo = captureStdIO();
    try {
      const code = await runCli(["help", "doctor", "legacy", "--compact"]);
      expect(code).toBe(0);
      expect(doctorIo.stdout).toContain("doctor legacy - Inspect compatibility adapters");
      expect(doctorIo.stdout).toContain("agentplane doctor legacy [options]");
      expect(doctorIo.stdout).toContain("--json");
    } finally {
      doctorIo.restore();
    }

    const repairIo = captureStdIO();
    try {
      const code = await runCli(["help", "repair", "adopt-legacy-conflict", "--compact"]);
      expect(code).toBe(0);
      expect(repairIo.stdout).toContain("repair adopt-legacy-conflict - Record a verified legacy");
      expect(repairIo.stdout).toContain("--expect-adoption-token");
    } finally {
      repairIo.restore();
    }

    const oldAliasIo = captureStdIO();
    try {
      const code = await runCli([
        "help",
        "integrate",
        "queue",
        "adopt-legacy-protected-conflict",
        "--compact",
      ]);
      expect(code).toBe(2);
      expect(oldAliasIo.stderr).toContain("Unknown command");
    } finally {
      oldAliasIo.restore();
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
    const io = captureStdIO();
    const cwdSpy = vi.spyOn(process, "cwd").mockReturnValue(outsideRoot);
    try {
      const code = await runCli(["release"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain(
        "Framework dev command is only available inside the AgentPlane framework checkout.",
      );
    } finally {
      cwdSpy.mockRestore();
      io.restore();
    }
  });

  it("framework checkout keeps framework-dev commands behind --all", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help"]);
      expect(code).toBe(0);
      expect(io.stdout).not.toContain("Framework Dev:");
      expect(io.stdout).not.toContain("release  Prepare a release");
    } finally {
      io.restore();
    }
    const allIo = captureStdIO();
    try {
      const code = await runCli(["help", "--all"]);
      expect(code).toBe(0);
      expect(allIo.stdout).toContain("Framework Dev:");
      expect(allIo.stdout).toContain("release  Prepare a release");
      expect(allIo.stdout).toContain("docs cli  Generate an MDX CLI reference");
    } finally {
      allIo.restore();
    }
  });

  it("task --help routes to task namespace help", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "--help"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("task - Supervisor-first task commands.");
      expect(io.stdout).toContain("agentplane task advance <task-id> --agent-json [options]");
      expect(io.stdout).toContain("agentplane help --all");
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
