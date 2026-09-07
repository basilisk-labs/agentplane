/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import { defaultConfig, extractTaskSuffix, type ResolvedProject } from "./core-imports.js";
import {
  createLegacyTaskAggregate,
  taskCentricAggregateFromExtensions,
  withTaskCentricAggregate,
  readTask,
  renderTaskReadme,
} from "@agentplaneorg/core/tasks";
import { createIncidentRegistrySkeleton } from "../runtime/incidents/index.js";

import { runCli } from "./run-cli.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import type * as taskBackend from "../backends/task-backend.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
} from "@agentplane/testkit";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();
const TASKS_CLI_TIMEOUT_MS = 300_000;

describe("runCli", { timeout: TASKS_CLI_TIMEOUT_MS }, () => {
  it("task update supports replace flags", async () => {
    const root = await mkGitRepoRoot();
    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Replace flags",
        "--description",
        "Replace tags/depends/verify",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--depends-on",
        "202601010101-ABCDEF",
        "--verify",
        "bun run lint",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioNew.stdout.trim();
    } finally {
      ioNew.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "update",
        taskId,
        "--replace-tags",
        "--allow-primary-change",
        "--tag",
        "code",
        "--replace-depends-on",
        "--depends-on",
        "202601020202-BCDEFG",
        "--replace-verify",
        "--verify",
        "bun run test",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.tags).toEqual(["code"]);
    expect(task.frontmatter.depends_on).toEqual(["202601020202-BCDEFG"]);
    expect(task.frontmatter.verify).toEqual(["bun run test"]);
  });

  it.each([7, 10])(
    "replace-verify preserves canonical revision coherence at revision %s",
    async (revision) => {
      const root = await mkGitRepoRoot();
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "new",
            "--title",
            "Replace canonical verification",
            "--description",
            "Verify revision coherence",
            "--owner",
            "CODER",
            "--tag",
            "code",
            "--verify",
            "bun run lint",
            "--root",
            root,
          ]),
        ).toBe(0);
        const taskId = io.stdout.trim();
        const before = await readTask({ cwd: root, rootOverride: root, taskId });
        const aggregate = createLegacyTaskAggregate({
          id: taskId,
          revision,
          title: before.frontmatter.title,
          description: "Verify revision coherence",
          status: "TODO",
          acceptance_criteria: ["Revisions remain coherent"],
          captured_at: "2026-09-07T00:00:00.000Z",
          updated_at: "2026-09-07T00:00:00.000Z",
        });
        await writeFile(
          before.readmePath,
          renderTaskReadme(
            {
              ...before.frontmatter,
              revision,
              extensions: withTaskCentricAggregate(before.frontmatter.extensions, aggregate),
            },
            before.body,
          ),
        );
        expect(
          await runCli([
            "task",
            "update",
            taskId,
            "--replace-verify",
            "--verify",
            "bun run test",
            "--root",
            root,
          ]),
        ).toBe(0);
        const after = await readTask({ cwd: root, rootOverride: root, taskId });
        const projected = taskCentricAggregateFromExtensions(after.frontmatter.extensions)!;
        expect(after.frontmatter.verify).toEqual(["bun run test"]);
        expect(after.frontmatter.revision).toBe(revision + 1);
        expect(projected.revision).toBe(after.frontmatter.revision);
        expect(projected.current_plan).toEqual(aggregate.current_plan);
        expect(projected.work_items).toEqual(aggregate.work_items);
      } finally {
        io.restore();
      }
    },
  );

  it("task update allows code primary without verify commands", async () => {
    const root = await mkGitRepoRoot();
    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify required",
        "--description",
        "Ensure verify required",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioNew.stdout.trim();
    } finally {
      ioNew.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "update",
        taskId,
        "--replace-tags",
        "--allow-primary-change",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.tags).toEqual(["code"]);
    expect(task.frontmatter.verify).toEqual([]);
  });

  it("task update rejects missing and unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; msg: string }[] = [
      {
        args: ["task", "update", "202601010101-ABCDEF", "--title"],
        msg: "Missing value after --title",
      },
      {
        args: ["task", "update", "202601010101-ABCDEF", "--wat", "x"],
        msg: "Unknown option: --wat.",
      },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });

  it("task scrub replaces values across tasks", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Scrub task",
          "--description",
          "hello world",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "scrub",
          "--find",
          "hello",
          "--replace",
          "hi",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.description).toContain("hi");
  });

  it("task scrub supports dry-run and quiet", async () => {
    const root = await mkGitRepoRoot();
    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Scrub dry-run",
        "--description",
        "dry-run value",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioNew.stdout.trim();
    } finally {
      ioNew.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "scrub",
        "--find",
        "dry-run",
        "--replace",
        "ignored",
        "--dry-run",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.description).toContain("dry-run value");
  });

  it("task scrub rejects missing find/replace values and unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "scrub"], msg: "Missing required option: --find" },
      { args: ["task", "scrub", "--find"], msg: "Missing value after --find" },
      { args: ["task", "scrub", "--replace"], msg: "Missing value after --replace" },
      { args: ["task", "scrub", "--nope", "x"], msg: "Unknown option: --nope." },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });
});
