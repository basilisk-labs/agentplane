import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import { captureStdIO, silenceStdIO } from "./run-cli.test-helpers.js";
import { buildRegistry } from "./run-cli/registry.run.js";
import { COMMANDS } from "./run-cli/command-catalog.js";

type HelpJson = {
  id: string[];
  options: { name: string; short?: string; hidden?: boolean }[];
};

function keyId(id: string[]): string {
  return id.join(" ");
}

function registryCommandIdsSorted(registry: {
  list(): readonly { spec: { id: string[] } }[];
}): string[] {
  const ids = new Set(registry.list().map((e) => e.spec.id.join(" ")));
  return [...ids].toSorted();
}

function commandCatalogIdsSorted(): string[] {
  return [...new Set(COMMANDS.map((e) => e.spec.id.join(" ")))].toSorted();
}

const rejectDuringRegistryConstruction =
  (name: string) =>
  (_cmd: string): Promise<never> =>
    Promise.reject(new Error(`${name} should not be called during registry construction`));

let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

describe("cli2 help contract", () => {
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

  it("help --json returns a stable, internally consistent registry", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "--json"]);
      expect(code).toBe(0);
      const list = JSON.parse(io.stdout) as HelpJson[];

      // Unique command ids.
      const ids = list.map((s) => keyId(s.id));
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);

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

  it("run registry covers the command catalog id set", () => {
    const runRegistry = buildRegistry({
      getCtx: rejectDuringRegistryConstruction("getCtx"),
      getResolvedProject: rejectDuringRegistryConstruction("getResolvedProject"),
      getLoadedConfig: rejectDuringRegistryConstruction("getLoadedConfig"),
    });

    // buildRegistry registers helpSpec in addition to COMMANDS.
    const runIds = registryCommandIdsSorted(runRegistry);
    const runIdsWithoutHelp = runIds.filter((id) => id !== "help");
    expect(runIdsWithoutHelp).toEqual(commandCatalogIdsSorted());
    expect(runIds).toContain("help");
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
