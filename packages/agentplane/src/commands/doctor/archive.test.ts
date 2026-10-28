import { chmod, mkdtemp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

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

  it("reads local commits without fetching a missing promised commit", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-doctor-partial-"));
    const source = path.join(root, "source");
    const origin = path.join(root, "origin.git");
    const checkout = path.join(root, "partial");
    const probe = path.join(root, "lazy-fetch-probe");
    await mkdir(source);
    const missingHash = await gitInitWithCommit(source, "Implement feature", "Original work");
    await writeFile(path.join(source, "close.txt"), "close\n");
    await execFileAsync("git", ["add", "close.txt"], { cwd: source });
    await execFileAsync(
      "git",
      ["commit", "--no-verify", "-m", "✅ ABC123 close: complete feature"],
      {
        cwd: source,
      },
    );
    const { stdout: closeHashText } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: source,
    });
    const closeHash = closeHashText.trim();
    await execFileAsync("git", ["init", "--bare", "-q", origin], { cwd: root });
    await execFileAsync("git", ["config", "uploadpack.allowFilter", "true"], { cwd: origin });
    await execFileAsync("git", ["symbolic-ref", "HEAD", "refs/heads/main"], { cwd: origin });
    await execFileAsync("git", ["remote", "add", "origin", origin], { cwd: source });
    await execFileAsync("git", ["push", "origin", "HEAD:refs/heads/main"], { cwd: source });
    const clone = async (target: string) =>
      execFileAsync(
        "git",
        [
          "clone",
          "--quiet",
          "--no-checkout",
          "--depth=1",
          "--filter=blob:none",
          pathToFileURL(origin).href,
          target,
        ],
        { cwd: root, timeout: 15_000 },
      );
    await clone(checkout);
    await clone(probe);
    const promisorConfig = await execFileAsync(
      "git",
      ["config", "--get", "remote.origin.promisor"],
      {
        cwd: checkout,
      },
    );
    expect(promisorConfig.stdout.trim()).toBe("true");
    const noFetchEnv = {
      ...process.env,
      GIT_NO_LAZY_FETCH: "1",
      GIT_TERMINAL_PROMPT: "0",
      GIT_ALLOW_PROTOCOL: "",
    };
    await expect(
      execFileAsync("git", ["cat-file", "-e", `${missingHash}^{commit}`], {
        cwd: checkout,
        env: noFetchEnv,
      }),
    ).rejects.toThrow();
    // Prove this fixture is actually lazy-fetchable through its local file remote.
    const lazy = await execFileAsync("git", ["show", "-s", "--format=%H", missingHash], {
      cwd: probe,
      env: { ...process.env, GIT_ALLOW_PROTOCOL: "file", GIT_TERMINAL_PROMPT: "0" },
      timeout: 15_000,
    });
    expect(lazy.stdout.trim()).toBe(missingHash);

    const objectPacks = path.join(checkout, ".git", "objects", "pack");
    const before = await readdir(objectPacks);
    const trace = path.join(root, "lookup-trace.jsonl");
    const previousTrace = process.env.GIT_TRACE2_EVENT;
    process.env.GIT_TRACE2_EVENT = trace;
    try {
      const ctx = {
        memo: {},
        taskBackend: {
          listTasks: () =>
            Promise.resolve([
              { id: "202602111830-OLD999", status: "DONE", commit: { hash: missingHash } },
              { id: "202602111831-ABC123", status: "DONE", commit: { hash: closeHash } },
            ]),
        },
      } as unknown as CommandContext;
      const findings = await checkDoneTaskCommitInvariants(checkout, { ctx });
      expect(findings).toEqual(
        expect.arrayContaining([
          expect.stringContaining(
            `unknown historical commit hash: 202602111830-OLD999 -> ${missingHash}`,
          ),
          expect.stringContaining(
            `implementation commit points to a close commit: 202602111831-ABC123 -> ${closeHash}`,
          ),
        ]),
      );
    } finally {
      if (previousTrace === undefined) delete process.env.GIT_TRACE2_EVENT;
      else process.env.GIT_TRACE2_EVENT = previousTrace;
    }
    expect(await readdir(objectPacks)).toEqual(before);
    await expect(
      execFileAsync("git", ["cat-file", "-e", `${missingHash}^{commit}`], {
        cwd: checkout,
        env: noFetchEnv,
      }),
    ).rejects.toThrow();
    const traceContent = await readFile(trace, "utf8");
    const events = traceContent
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as { event?: string; argv?: string[] });
    expect(
      events.some((event) => event.event === "child_start" && event.argv?.includes("fetch")),
    ).toBe(false);
  });
});
