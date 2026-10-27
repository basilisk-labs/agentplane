import { chmod, mkdtemp, readFile, writeFile } from "node:fs/promises";
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

  it("reports an unavailable historical commit as INFO", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-doctor-archive-"));
    await gitInitWithCommit(root, "current commit", "Current body");
    const missingHash = "a".repeat(40);
    const ctx = {
      memo: {},
      taskBackend: {
        listTasks: () =>
          Promise.resolve([
            { id: "202602111827-ABC123", status: "DONE", commit: { hash: missingHash } },
          ]),
      },
    } as unknown as CommandContext;

    await expect(checkDoneTaskCommitInvariants(root, { ctx })).resolves.toEqual([
      `[INFO] DONE task references unknown historical commit hash: 202602111827-ABC123 -> ${missingHash}`,
    ]);
  });

  it.skipIf(process.platform === "win32")(
    "disables lazy fetch and all Git transports for archive lookups",
    async () => {
      const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-doctor-promisor-"));
      const gitPath = path.join(root, "git");
      const invocationPath = path.join(root, "invoked.txt");
      const fetchPath = path.join(root, "fetch-attempted.txt");
      await writeFile(
        gitPath,
        [
          "#!/bin/sh",
          'printf "invoked" > "$DOCTOR_GIT_INVOCATION"',
          'if [ "$GIT_NO_LAZY_FETCH" != "1" ] || [ "$GIT_TERMINAL_PROMPT" != "0" ] || [ -n "$GIT_ALLOW_PROTOCOL" ]; then',
          '  printf "fetch permitted" > "$DOCTOR_GIT_FETCH_ATTEMPT"',
          "fi",
          "exit 0",
          "",
        ].join("\n"),
      );
      await chmod(gitPath, 0o755);
      const previousPath = process.env.PATH;
      process.env.PATH = `${root}${path.delimiter}${previousPath ?? ""}`;
      process.env.DOCTOR_GIT_INVOCATION = invocationPath;
      process.env.DOCTOR_GIT_FETCH_ATTEMPT = fetchPath;
      try {
        const ctx = {
          memo: {},
          taskBackend: {
            listTasks: () =>
              Promise.resolve([
                {
                  id: "202602111828-ABC123",
                  status: "DONE",
                  commit: { hash: "b".repeat(40) },
                },
              ]),
          },
        } as unknown as CommandContext;
        const findings = await checkDoneTaskCommitInvariants(root, { ctx });
        expect(findings).toEqual([
          expect.stringContaining("[INFO] DONE task references unknown historical commit hash"),
        ]);
        expect(await readFile(invocationPath, "utf8")).toBe("invoked");
        await expect(readFile(fetchPath, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
      } finally {
        if (previousPath === undefined) delete process.env.PATH;
        else process.env.PATH = previousPath;
        delete process.env.DOCTOR_GIT_INVOCATION;
        delete process.env.DOCTOR_GIT_FETCH_ATTEMPT;
      }
    },
  );
});
