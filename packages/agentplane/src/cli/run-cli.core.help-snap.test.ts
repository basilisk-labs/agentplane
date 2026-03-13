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

  it("help task --compact snapshot", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "task", "--compact"]);
      expect(code).toBe(0);
      expect(io.stdout).toMatchSnapshot();
    } finally {
      io.restore();
    }
  });

  it("help task plan --compact snapshot", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "task", "plan", "--compact"]);
      expect(code).toBe(0);
      expect(io.stdout).toMatchSnapshot();
    } finally {
      io.restore();
    }
  });

  it("help task doc set --compact snapshot", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "task", "doc", "set", "--compact"]);
      expect(code).toBe(0);
      expect(io.stdout).toMatchSnapshot();
    } finally {
      io.restore();
    }
  });

  it("help commit --compact reflects active-task allow-tasks semantics", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "commit", "--compact"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(
        "Create a git commit after validating policy and allowlist; if the index is empty, stage matching allowlist paths first.",
      );
      expect(io.stdout).toContain(
        "Allow the tasks export snapshot plus artifacts under the active task subtree; standalone path scope.",
      );
      expect(io.stdout).toContain("Allow CI workflow edits; standalone path scope.");
      expect(io.stdout).toContain(
        "Allow base branch edits; branch override only, not a path allowlist.",
      );
      expect(io.stdout).not.toContain(
        "Allow task workflow artifacts (tasks/ and .agentplane/tasks/).",
      );
    } finally {
      io.restore();
    }
  });

  it("help guard commit --compact reflects active-task allow-tasks semantics", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "guard", "commit", "--compact"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(
        "Allow the tasks export snapshot plus artifacts under the active task subtree; standalone path scope.",
      );
      expect(io.stdout).toContain("Allow CI workflow edits; standalone path scope.");
      expect(io.stdout).toContain(
        "Allow base branch edits; branch override only, not a path allowlist.",
      );
      expect(io.stdout).not.toContain(
        "Allow task workflow artifacts (tasks/ and .agentplane/tasks/).",
      );
    } finally {
      io.restore();
    }
  });

  it("help commit shows Notes for standalone protected path scopes", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "commit"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Notes:");
      expect(io.stdout).toContain(
        "Protected path-scoped overrides can stand alone without a duplicate explicit prefix",
      );
      expect(io.stdout).toContain(
        "Top-level `agentplane commit` can auto-stage those protected path scopes when the git index starts empty.",
      );
      expect(io.stdout).toContain(
        "`--allow-base` is different: it only overrides base-branch protection and never selects file paths by itself.",
      );
    } finally {
      io.restore();
    }
  });

  it("help guard commit shows Notes for staged-only protected path scopes", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["help", "guard", "commit"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Notes:");
      expect(io.stdout).toContain(
        "Protected path-scoped overrides can stand alone without a duplicate explicit prefix",
      );
      expect(io.stdout).toContain(
        "`agentplane guard commit` remains staged-only: it validates the current index and never auto-stages files for you.",
      );
      expect(io.stdout).toContain(
        "`--allow-base` is different: it only overrides base-branch protection and never selects file paths by itself.",
      );
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
