import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import { captureStdIO, silenceStdIO } from "../testing/index.js";

let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

describe("runCli recipes scenario", () => {
  it("treats recipes scenario list as a removed public command", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "scenario", "list"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unknown recipes subcommand: scenario");
      expect(io.stderr).toContain("agentplane help recipes --compact");
    } finally {
      io.restore();
    }
  });

  it("removes recipes scenario references from public recipes help", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "recipes", "--compact"]);
      expect(code).toBe(0);
      expect(io.stdout).not.toContain("scenario");
      expect(io.stdout).toContain("recipes - Recipe management commands.");
      expect(io.stdout).toContain("agentplane recipes <subcommand> [options]");
    } finally {
      io.restore();
    }
  });
});
