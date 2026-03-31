import { describe, expect, it } from "vitest";

import {
  throwGroupCommandUsage,
  directSubcommandNames,
  directSubcommandNamesFromIds,
  loadDirectSubcommandNames,
} from "./group-command.js";
import type { CommandId, CommandSpec } from "./spec/spec.js";

const rootSpec: CommandSpec<{ cmd: string[] }> = {
  id: ["demo"],
  group: "Test",
  summary: "Demo group command.",
  synopsis: ["agentplane demo <subcommand> [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: (raw) => ({ cmd: (raw.args.cmd ?? []) as string[] }),
};

const childSpecs: readonly CommandSpec<unknown>[] = [
  { id: ["demo", "beta"], group: "Test", summary: "beta" },
  { id: ["demo", "alpha"], group: "Test", summary: "alpha" },
  { id: ["demo", "alpha", "deep"], group: "Test", summary: "deep" },
  { id: ["demo"], group: "Test", summary: "root" },
] as const;

const childIds: readonly CommandId[] = childSpecs.map((spec) => spec.id);

describe("group-command helper", () => {
  it("derives direct subcommands uniquely and in sorted order", () => {
    expect(directSubcommandNames(["demo"], childSpecs)).toEqual(["alpha", "beta"]);
  });

  it("derives direct subcommands from command ids without leaking grandchildren", () => {
    expect(directSubcommandNamesFromIds(["demo"], childIds)).toEqual(["alpha", "beta"]);
  });

  it("loads direct subcommands from the canonical command graph lazily", async () => {
    await expect(loadDirectSubcommandNames(["task", "plan"])).resolves.toEqual([
      "approve",
      "reject",
      "set",
    ]);
  });

  it("renders usage errors with suggestions for unknown subcommands", () => {
    expect(() =>
      throwGroupCommandUsage({
        spec: rootSpec,
        cmd: ["alpah"],
        subcommands: directSubcommandNames(["demo"], childSpecs),
        command: "demo",
      }),
    ).toThrow(/Did you mean: alpha\?/u);
  });
});
