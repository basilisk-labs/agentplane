import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";

import { runCli } from "./run-cli.js";
import * as prompts from "./prompts.js";
import {
  captureStdIO,
  cleanGitEnv,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
} from "@agentplane/testkit";

const originalStdinIsTty = Object.getOwnPropertyDescriptor(process.stdin, "isTTY");
const originalStdoutIsTty = Object.getOwnPropertyDescriptor(process.stdout, "isTTY");
const execFileAsync = promisify(execFile);

function setTty(enabled: boolean): void {
  Object.defineProperty(process.stdin, "isTTY", { value: enabled, configurable: true });
  Object.defineProperty(process.stdout, "isTTY", { value: enabled, configurable: true });
}

function restoreTty(): void {
  if (originalStdinIsTty) {
    Object.defineProperty(process.stdin, "isTTY", originalStdinIsTty);
  } else {
    delete (process.stdin as { isTTY?: boolean }).isTTY;
  }
  if (originalStdoutIsTty) {
    Object.defineProperty(process.stdout, "isTTY", originalStdoutIsTty);
  } else {
    delete (process.stdout as { isTTY?: boolean }).isTTY;
  }
}

async function initAgentplaneProject(root: string): Promise<void> {
  await configureGitUser(root);
  expect(await runCli(["init", "--yes", "--root", root])).toBe(0);
}

async function readContextManifest(root: string): Promise<string> {
  return await readFile(
    path.join(root, ".agentplane", "context", "agentplane.context.yaml"),
    "utf8",
  );
}

installRunCliIntegrationHarness();

describe("runCli context init interactive mode", () => {
  it(
    "defaults to maximum-assimilation without prompting in an interactive terminal",
    { timeout: 60_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await initAgentplaneProject(root);
      setTty(true);
      const prompt = vi.spyOn(prompts, "selectPrompt");

      const io = captureStdIO();
      try {
        const code = await runCli(["context", "init", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).not.toContain("Context init mode:");
        expect(prompt).not.toHaveBeenCalled();
      } finally {
        io.restore();
        prompt.mockRestore();
        restoreTty();
      }

      expect(await readContextManifest(root)).toContain("mode: maximum-assimilation");
    },
  );

  it(
    "respects explicit profile without prompting in an interactive terminal",
    { timeout: 60_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await initAgentplaneProject(root);
      setTty(true);
      const prompt = vi.spyOn(prompts, "selectPrompt");

      try {
        expect(await runCli(["context", "init", "--profile", "minimal", "--root", root])).toBe(0);
        expect(prompt).not.toHaveBeenCalled();
      } finally {
        prompt.mockRestore();
        restoreTty();
      }

      expect(await readContextManifest(root)).toContain("mode: minimal");
    },
  );

  it(
    "creates a context-layer commit in an initialized AgentPlane project",
    { timeout: 60_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await initAgentplaneProject(root);

      expect(await runCli(["context", "init", "--root", root])).toBe(0);

      const { stdout: subject } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      const { stdout: body } = await execFileAsync("git", ["log", "-1", "--pretty=%b"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      const { stdout: status } = await execFileAsync("git", ["status", "--short"], {
        cwd: root,
        env: cleanGitEnv(),
      });

      expect(subject.trim()).toBe("✅ CTX1NT task: initialize AgentPlane context");
      expect(body).toContain("Context-Bootstrap: true");
      expect(body).toContain("Context-Bootstrap-Task: 202601010101-CTX1NT");
      expect(status.trim()).toBe("");
    },
  );

  it(
    "uses the maximum-assimilation default without prompts outside an interactive terminal",
    { timeout: 60_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await initAgentplaneProject(root);
      setTty(false);
      const prompt = vi.spyOn(prompts, "selectPrompt");

      try {
        expect(await runCli(["context", "init", "--root", root])).toBe(0);
        expect(prompt).not.toHaveBeenCalled();
      } finally {
        prompt.mockRestore();
        restoreTty();
      }

      expect(await readContextManifest(root)).toContain("mode: maximum-assimilation");
    },
  );

  it(
    "requires force when switching an initialized context profile",
    { timeout: 60_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await initAgentplaneProject(root);

      expect(await runCli(["context", "init", "--profile", "adaptive", "--root", root])).toBe(0);

      const rejected = captureStdIO();
      try {
        const code = await runCli([
          "context",
          "init",
          "--profile",
          "maximum-assimilation",
          "--root",
          root,
        ]);
        expect(code).toBe(2);
        expect(rejected.stderr).toContain("already initialized with profile adaptive");
        expect(rejected.stderr).toContain("--force");
      } finally {
        rejected.restore();
      }
      expect(await readContextManifest(root)).toContain("mode: adaptive");

      expect(
        await runCli([
          "context",
          "init",
          "--profile",
          "maximum-assimilation",
          "--force",
          "--root",
          root,
        ]),
      ).toBe(0);
      expect(await readContextManifest(root)).toContain("mode: maximum-assimilation");
    },
  );
});
