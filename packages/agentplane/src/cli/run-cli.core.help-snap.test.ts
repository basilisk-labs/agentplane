import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import { captureStdIO, silenceStdIO } from "./run-cli.test-helpers.js";

let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

describe("runCli help snapshots (cli2)", () => {
  it("help (registry) snapshot", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help"]);
      expect(code).toBe(0);
      expect(io.stdout).toMatchSnapshot();
    } finally {
      io.restore();
    }
  });

  it("help task new --compact snapshot", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "task", "new", "--compact"]);
      expect(code).toBe(0);
      expect(io.stdout).toMatchSnapshot();
    } finally {
      io.restore();
    }
  });

  it("help recipes install --compact snapshot", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "recipes", "install", "--compact"]);
      expect(code).toBe(0);
      expect(io.stdout).toMatchSnapshot();
    } finally {
      io.restore();
    }
  });

  it("help work start --json snapshot", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "work", "start", "--json"]);
      expect(code).toBe(0);
      const json = JSON.parse(io.stdout) as unknown;
      expect(json).toMatchSnapshot();
    } finally {
      io.restore();
    }
  });
});
