import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import { captureStdIO, silenceStdIO } from "./run-cli.test-helpers.js";
import { buildHelpFastRegistry } from "./run-cli/registry.help.js";
import { buildRegistry } from "./run-cli/registry.run.js";
import type { CommandContext } from "../commands/shared/task-backend.js";

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

  it("help registry and run registry expose the same command id set", () => {
    const helpRegistry = buildHelpFastRegistry();
    const runRegistry = buildRegistry(
      (_cmd: string): Promise<CommandContext> =>
        Promise.reject(new Error("getCtx should not be called during registry construction")),
    );

    expect(registryCommandIdsSorted(helpRegistry)).toEqual(registryCommandIdsSorted(runRegistry));
  });
});
