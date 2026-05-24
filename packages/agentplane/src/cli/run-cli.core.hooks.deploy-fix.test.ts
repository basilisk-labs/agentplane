import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "@agentplane/testkit";

import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

async function stageMutatingFile(root: string): Promise<string> {
  await writeDefaultConfig(root);
  await mkdir(path.join(root, "src"), { recursive: true });
  await writeFile(path.join(root, "src", "app.ts"), "export const value = 1;\n", "utf8");
  await promisify(execFile)("git", ["add", "src/app.ts"], { cwd: root });
  return path.join(root, "COMMIT_EDITMSG");
}

describe("runCli hooks deploy-fix evidence", () => {
  it("accepts deploy-fix evidence without task binding", async () => {
    const root = await mkGitRepoRoot();
    const messagePath = await stageMutatingFile(root);
    await writeFile(
      messagePath,
      [
        "🚑 deploy-fix: refresh production cache marker",
        "",
        "Deploy-Fix: true",
        "Deploy-Fix-Evidence: live cache-buster probe recorded",
        "",
      ].join("\n"),
      "utf8",
    );
    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      expect(await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root])).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });

  it("rejects deploy-fix subjects without evidence", async () => {
    const root = await mkGitRepoRoot();
    const messagePath = await stageMutatingFile(root);
    await writeFile(messagePath, "🚑 deploy-fix: refresh production cache marker\n", "utf8");
    const prev = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;

    const io = captureStdIO();
    try {
      expect(await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root])).toBe(5);
      expect(io.stderr).toContain("Mutating staged paths require an active AgentPlane task");
      expect(io.stderr).toContain("Deploy-Fix-Evidence");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = prev;
    }
  });
});
