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
});
