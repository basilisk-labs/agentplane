import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import { runCli } from "./run-cli.js";
import * as prompts from "./prompts.js";
import {
  captureStdIO,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
} from "@agentplane/testkit";

const originalStdinIsTty = Object.getOwnPropertyDescriptor(process.stdin, "isTTY");
const originalStdoutIsTty = Object.getOwnPropertyDescriptor(process.stdout, "isTTY");

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
  it("prompts for a user-facing mode in an interactive terminal", { timeout: 60_000 }, async () => {
    const root = await mkGitRepoRoot();
    await initAgentplaneProject(root);
    setTty(true);
    const prompt = vi.spyOn(prompts, "selectPrompt").mockResolvedValueOnce("maximum-assimilation");

    const io = captureStdIO();
    try {
      const code = await runCli(["context", "init", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Context init mode:");
      expect(io.stdout).toContain("minimal = smallest workspace scaffold");
      expect(prompt).toHaveBeenCalledWith(
        "Select context mode",
        ["minimal", "adaptive", "maximum-assimilation"],
        "adaptive",
      );
    } finally {
      io.restore();
      prompt.mockRestore();
      restoreTty();
    }

    expect(await readContextManifest(root)).toContain("mode: maximum-assimilation");
  });

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
    "keeps the adaptive default without prompts outside an interactive terminal",
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

      expect(await readContextManifest(root)).toContain("mode: adaptive");
    },
  );
});
