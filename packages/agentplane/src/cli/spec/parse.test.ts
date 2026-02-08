import { describe, expect, it } from "vitest";

import { CliError } from "../../shared/errors.js";

import type { CommandSpec } from "./spec.js";
import { parseCommandArgv } from "./parse.js";

const baseSpec: CommandSpec<{ foo?: string; tag?: string[]; quiet?: boolean; mode?: string }> = {
  id: ["x"],
  group: "Test",
  summary: "test",
  options: [
    {
      kind: "string",
      name: "foo",
      valueHint: "<text>",
      description: "foo",
    },
    {
      kind: "string",
      name: "tag",
      valueHint: "<tag>",
      repeatable: true,
      minCount: 2,
      description: "tag",
    },
    {
      kind: "boolean",
      name: "quiet",
      description: "quiet",
      default: false,
    },
    {
      kind: "string",
      name: "mode",
      valueHint: "<a|b>",
      choices: ["a", "b"],
      description: "mode",
    },
    {
      kind: "string",
      name: "msg",
      short: "m",
      valueHint: "<text>",
      description: "message",
    },
  ],
  parse: (raw) => ({
    foo: raw.opts.foo as string | undefined,
    tag: raw.opts.tag as string[] | undefined,
    quiet: raw.opts.quiet as boolean | undefined,
    mode: raw.opts.mode as string | undefined,
  }),
};

describe("cli2 parseCommandArgv", () => {
  it("fails on missing value", () => {
    expect(() => parseCommandArgv(baseSpec, ["--foo"])).toThrowError(CliError);
    try {
      parseCommandArgv(baseSpec, ["--foo"]);
    } catch (e) {
      const err = e as CliError;
      expect(err.code).toBe("E_USAGE");
      expect(err.message).toContain("Missing value");
    }
  });

  it("suggests close matches for unknown options", () => {
    try {
      parseCommandArgv(baseSpec, ["--fooo", "x"]);
      throw new Error("expected");
    } catch (e) {
      const err = e as CliError;
      expect(err.code).toBe("E_USAGE");
      expect(err.message).toContain("Unknown option: --fooo");
      expect(err.message).toContain("Did you mean --foo");
    }
  });

  it("supports repeatable + minCount", () => {
    expect(() => parseCommandArgv(baseSpec, ["--tag", "a"])).toThrowError(CliError);
    const out = parseCommandArgv(baseSpec, ["--tag", "a", "--tag", "b"]);
    expect(out.parsed.tag).toEqual(["a", "b"]);
  });

  it("supports --flag=value", () => {
    const out = parseCommandArgv(baseSpec, ["--foo=hello", "--tag", "a", "--tag", "b"]);
    expect(out.parsed.foo).toBe("hello");
  });

  it("fails on choices mismatch", () => {
    try {
      parseCommandArgv(baseSpec, ["--mode", "c", "--tag", "a", "--tag", "b"]);
      throw new Error("expected");
    } catch (e) {
      const err = e as CliError;
      expect(err.code).toBe("E_USAGE");
      expect(err.message).toContain("expected one of");
    }
  });

  it("supports short string option -m", () => {
    const out = parseCommandArgv(baseSpec, ["-m", "hi", "--tag", "a", "--tag", "b"]);
    expect(out.raw.opts.msg).toBe("hi");
  });
});
