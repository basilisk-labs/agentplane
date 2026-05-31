import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import { describe, expect, it } from "vitest";

import { checkDoneTaskCommitInvariants } from "./archive.js";
import type { CommandContext } from "../shared/task-backend.js";

async function gitInitWithCommit(root: string, subject: string, body: string): Promise<string> {
  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Archive Test"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "archive@example.com"], { cwd: root });
  await writeFile(path.join(root, "file.txt"), `${subject}\n`, "utf8");
  await execFileAsync("git", ["add", "file.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "--no-verify", "-m", subject, "-m", body], { cwd: root });
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  return stdout.trim();
}

describe("doctor archive commit invariants", () => {
  it("detects structured human-readable close commits from the task backend", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-doctor-archive-"));
    const closeHash = await gitInitWithCommit(
      root,
      "context: add v0.6 release readiness checks",
      [
        "Summary:",
        "- Added and verified the local and hosted v0.6 context readiness flow.",
        "",
        "Refs:",
        "- Source PR: #3612",
        "- Merge PR: #3613",
        "- Agentplane task: ABC123",
        "- Agentplane run: 202605130501-ABC123",
      ].join("\n"),
    );
    const ctx = {
      memo: {},
      taskBackend: {
        listTasks: () =>
          Promise.resolve([
            {
              id: "202602111826-ABC123",
              status: "DONE",
              commit: { hash: closeHash },
            },
          ]),
      },
    } as unknown as CommandContext;

    await expect(checkDoneTaskCommitInvariants(root, { ctx })).resolves.toEqual([
      expect.stringContaining(
        "DONE task implementation commit points to a close commit: 202602111826-ABC123",
      ),
    ]);
  });
});
