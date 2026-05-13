/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe } from "vitest";

import {
  CYRILLIC_RE,
  RUSSIAN_LAST_MESSAGE,
  RUSSIAN_TRACE_LINE,
  TASKS_QUERY_CLI_TIMEOUT_MS,
  VERIFY_STEPS_PLACEHOLDER,
  captureStdIO,
  chmod,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  defaultConfig,
  evolveRunnerRunState,
  execFile,
  expect,
  expectAgentJsonEnvelope,
  extractTaskSuffix,
  filterAgentsByWorkflow,
  formatRunShowArtifacts,
  formatRunShowMetrics,
  formatRunShowTarget,
  formatRunnerCapabilitySummaryLines,
  formatRunnerPolicyFieldSummaryLines,
  getAgentplaneHome,
  gitBranchExists,
  infoMessage,
  it,
  loadAgentTemplates,
  loadAgentsTemplate,
  loadCommandContext,
  loadTaskFromContext,
  mkdir,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  mkdtemp,
  os,
  parseAgentJsonEnvelope,
  path,
  pathExists,
  prepareTaskRunnerExecution,
  processSupervision,
  promisify,
  prompts,
  readFile,
  readFileSync,
  readTask,
  realpath,
  readdir,
  renderExpectedRunShowText,
  renderExpectedRunCancelText,
  renderExpectedRunResumeText,
  renderExpectedRunRetryText,
  renderTaskDocFromSections,
  resolveUpdateCheckCachePath,
  rm,
  runCli,
  runCliSilent,
  seedTaskQueryFixture,
  splitOutputLines,
  stageGitignoreIfPresent,
  stubTaskBackend,
  taskDocToSectionMap,
  useRunCliIntegrationHarness,
  vi,
  waitForRunnerState,
  writeConfig,
  writeDefaultConfig,
  writeFile,
  writeRunnerRunState,
  type ResolvedProject,
  type RunShowPayload,
  type taskBackend,
} from "@agentplane/testkit/cli-core-tasks-query";

useRunCliIntegrationHarness();

describe(
  "runCli task next search doc show and list queries",
  { timeout: TASKS_QUERY_CLI_TIMEOUT_MS },
  () => {
    it("task next shows ready tasks only", async () => {
      const root = await mkGitRepoRoot();
      let taskA = "";
      let taskB = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Ready task",
            "--description",
            "No deps",
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
          taskA = io.stdout.trim();
        } finally {
          io.restore();
        }
      }
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Blocked task",
            "--description",
            "Depends on A",
            "--priority",
            "med",
            "--owner",
            "CODER",
            "--tag",
            "docs",
            "--depends-on",
            taskA,
            "--root",
            root,
          ]);
          expect(code).toBe(0);
          taskB = io.stdout.trim();
        } finally {
          io.restore();
        }
      }
      const io = captureStdIO();
      try {
        const code = await runCli(["task", "next", "--root", root]);
        expect(code).toBe(0);
        const lines = splitOutputLines(io.stdout);
        expect(lines).toHaveLength(2);
        expect(lines[0]).toContain(taskA);
        expect(lines[0]).not.toContain(taskB);
        expect(lines[1]).toBe("Ready: 1 / 2");
      } finally {
        io.restore();
      }
    });

    it("task next exact readiness output stays stable", async () => {
      const root = await mkGitRepoRoot();
      const readyTaskId = "202603010100-AAAAAA";
      const blockedTaskId = "202603010101-BBBBBB";
      await seedTaskQueryFixture(root, [
        {
          id: blockedTaskId,
          title: "Beta blocked",
          description: "Depends on alpha",
          status: "TODO",
          priority: "med",
          owner: "CODER",
          depends_on: [readyTaskId],
          tags: ["docs"],
          verify: [],
        },
        {
          id: readyTaskId,
          title: "Alpha ready",
          description: "Ready now",
          status: "TODO",
          priority: "med",
          owner: "CODER",
          depends_on: [],
          tags: ["docs"],
          verify: [],
        },
      ]);

      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "next",
          "--status",
          "TODO",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toBe(
          `${readyTaskId} [TODO] Alpha ready (owner=CODER, prio=med, deps=none, tags=docs)\n` +
            "Ready: 1 / 2\n",
        );
        expect(io.stderr).toBe("");
      } finally {
        io.restore();
      }
    });

    it("task next supports limit and quiet flags", async () => {
      const root = await mkGitRepoRoot();
      const taskIds: string[] = [];
      for (const title of ["Ready task one", "Ready task two"]) {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            title,
            "--description",
            "Limit test",
            "--owner",
            "CODER",
            "--tag",
            "docs",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
          taskIds.push(io.stdout.trim());
        } finally {
          io.restore();
        }
      }

      const io = captureStdIO();
      try {
        const code = await runCli(["task", "next", "--limit", "1", "--quiet", "--root", root]);
        expect(code).toBe(0);
        const lines = splitOutputLines(io.stdout);
        expect(lines).toHaveLength(1);
        expect(lines[0]).toEqual(expect.stringContaining("[TODO]"));
        const matchedIds = taskIds.filter((id) => lines[0]?.includes(id));
        expect(matchedIds).toHaveLength(1);
        expect(io.stdout).not.toContain("Ready:");
      } finally {
        io.restore();
      }
    });

    it("task next applies status, owner, and tag filters", async () => {
      const root = await mkGitRepoRoot();
      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Filtered next",
            "--description",
            "Filter me",
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

      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "next",
          "--status",
          "todo",
          "--owner",
          "coder",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain(taskId);
        expect(io.stdout).toContain("Ready: 1 / 1");
      } finally {
        io.restore();
      }
    });

    it("task next rejects invalid limit values", async () => {
      const root = await mkGitRepoRoot();
      const cases: { args: string[]; msg: string }[] = [
        { args: ["task", "next", "--limit"], msg: "Missing value after --limit" },
        {
          args: ["task", "next", "--limit", "nope"],
          msg: "Invalid value for --limit: nope (expected integer)",
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

    it("task search finds matching tasks", async () => {
      const root = await mkGitRepoRoot();
      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Searchable task",
            "--description",
            "Find me",
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
      const io = captureStdIO();
      try {
        const code = await runCli(["task", "search", "searchable", "--root", root]);
        expect(code).toBe(0);
        const lines = splitOutputLines(io.stdout);
        expect(lines).toHaveLength(1);
        expect(lines[0]).toContain(taskId);
        expect(lines[0]).toContain("Searchable task");
      } finally {
        io.restore();
      }
    });

    it("task search exact filtered limit output stays stable", async () => {
      const root = await mkGitRepoRoot();
      const firstTaskId = "202603010200-AAAAAA";
      const secondTaskId = "202603010201-BBBBBB";
      await seedTaskQueryFixture(root, [
        {
          id: secondTaskId,
          title: "Searchable beta",
          description: "Second searchable task",
          status: "TODO",
          priority: "med",
          owner: "CODER",
          depends_on: [],
          tags: ["docs"],
          verify: [],
        },
        {
          id: firstTaskId,
          title: "Searchable alpha",
          description: "First searchable task",
          status: "TODO",
          priority: "med",
          owner: "CODER",
          depends_on: [],
          tags: ["docs"],
          verify: [],
        },
      ]);

      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "search",
          "Searchable",
          "--limit",
          "1",
          "--status",
          "TODO",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toBe(
          `${firstTaskId} [TODO] Searchable alpha (owner=CODER, prio=med, deps=none, tags=docs)\n`,
        );
        expect(io.stderr).toBe("");
      } finally {
        io.restore();
      }
    });

    it("task search supports regex and limit filters", async () => {
      const root = await mkGitRepoRoot();
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Regex task",
            "--description",
            "Searchable content",
            "--owner",
            "CODER",
            "--tag",
            "docs",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
        } finally {
          io.restore();
        }
      }

      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "search",
          "Regex.*",
          "--regex",
          "--limit",
          "1",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        const lines = splitOutputLines(io.stdout);
        expect(lines).toHaveLength(1);
        expect(lines[0]).toContain("Regex task");
      } finally {
        io.restore();
      }
    });

    it("task search applies status, owner, and tag filters", async () => {
      const root = await mkGitRepoRoot();
      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Filtered search",
            "--description",
            "Search scope",
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

      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "search",
          "Filtered",
          "--status",
          "todo",
          "--owner",
          "coder",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain(taskId);
        expect(io.stdout).toContain("Filtered search");
      } finally {
        io.restore();
      }
    });

    it("task search rejects empty queries and invalid limits", async () => {
      const root = await mkGitRepoRoot();
      const cases: { args: string[]; msg: string }[] = [
        { args: ["task", "search", "  "], msg: "Missing query (expected non-empty text)" },
        { args: ["task", "search", "query", "--limit"], msg: "Missing value after --limit" },
        {
          args: ["task", "search", "query", "--limit", "nope"],
          msg: "Invalid value for --limit: nope (expected integer)",
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

    it("task search rejects invalid regex", async () => {
      const root = await mkGitRepoRoot();
      const io = captureStdIO();
      try {
        const code = await runCli(["task", "search", "(", "--regex", "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Invalid regex");
      } finally {
        io.restore();
      }
    });

    it("task doc show prints section content", async () => {
      const root = await mkGitRepoRoot();
      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Doc task",
            "--description",
            "Has doc",
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
            "doc",
            "set",
            taskId,
            "--section",
            "Summary",
            "--text",
            "Doc section text",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
        } finally {
          io.restore();
        }
      }
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "doc",
          "show",
          taskId,
          "--section",
          "Summary",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("Doc section text");
      } finally {
        io.restore();
      }
    });

    it("task verify-show prints Verify Steps", async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Verify show",
            "--description",
            "Has verify steps",
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
            "doc",
            "set",
            taskId,
            "--section",
            "Verify Steps",
            "--text",
            "Verifier instructions",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
        } finally {
          io.restore();
        }
      }

      const io = captureStdIO();
      try {
        const refreshCode = await runCli(["blueprint", "snapshot", taskId, "--root", root]);
        expect(refreshCode).toBe(0);
        const code = await runCli(["task", "verify-show", taskId, "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("Verifier instructions");
        expect(io.stdout).toContain("Blueprint snapshot evidence");
        expect(io.stdout).toContain("snapshot_state: current");
        expect(io.stdout).toContain(
          `snapshot_safe_command: agentplane blueprint snapshot ${taskId}`,
        );
      } finally {
        io.restore();
      }
    });

    it("task verify-show rejects placeholder Verify Steps unless quiet", async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Verify show placeholder",
            "--description",
            "Has scaffolded verify steps",
            "--owner",
            "CODER",
            "--tag",
            "workflow",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
          taskId = io.stdout.trim();
        } finally {
          io.restore();
        }
      }

      const commandCtx = await loadCommandContext({ cwd: root, rootOverride: root });
      const task = await commandCtx.taskBackend.getTask(taskId);
      expect(task).toBeTruthy();
      const sections = taskDocToSectionMap(task?.doc ?? "");
      sections["Verify Steps"] = VERIFY_STEPS_PLACEHOLDER;
      const doc = renderTaskDocFromSections(sections);
      await commandCtx.taskBackend.writeTask({
        ...task!,
        doc,
        sections: taskDocToSectionMap(doc),
      });

      {
        const io = captureStdIO();
        try {
          const code = await runCli(["task", "verify-show", taskId, "--root", root]);
          expect(code).toBe(3);
          expect(io.stderr).toContain("cannot show Verify Steps");
          expect(io.stderr).toContain("Verify Steps");
        } finally {
          io.restore();
        }
      }

      {
        const io = captureStdIO();
        try {
          const code = await runCli(["task", "verify-show", taskId, "--quiet", "--root", root]);
          expect(code).toBe(0);
          expect(io.stdout).toBe("");
          expect(io.stderr).toBe("");
        } finally {
          io.restore();
        }
      }
    });

    it("task doc show supports quiet when section is missing", async () => {
      const root = await mkGitRepoRoot();
      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Doc show quiet",
            "--description",
            "Missing section",
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

      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "doc",
          "show",
          taskId,
          "--section",
          "Findings",
          "--quiet",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    });

    it("task doc show rejects missing values and unknown flags", async () => {
      const root = await mkGitRepoRoot();
      const taskId = "202602011330-DOC01";
      const cases: { args: string[]; msg: string }[] = [
        {
          args: ["task", "doc", "show", taskId, "--section"],
          msg: "Missing value after --section",
        },
        { args: ["task", "doc", "show", taskId, "--nope"], msg: "Unknown option: --nope." },
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

    it("task comment and set-status update task metadata", async () => {
      const root = await mkGitRepoRoot();
      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Status task",
            "--description",
            "Tracks status",
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
            "comment",
            taskId,
            "--author",
            "CODER",
            "--body",
            "Comment body",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
        } finally {
          io.restore();
        }
      }

      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "set-status",
            taskId,
            "DOING",
            "--author",
            "CODER",
            "--body",
            "Status update body",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
        } finally {
          io.restore();
        }
      }

      const task = await readTask({ cwd: root, rootOverride: root, taskId });
      expect(task.frontmatter.status).toBe("DOING");
      expect(task.frontmatter.comments.length).toBeGreaterThan(0);
    });

    it("task show prints task frontmatter json", async () => {
      const root = await mkGitRepoRoot();

      const io1 = captureStdIO();
      let id = "";
      try {
        const code1 = await runCli([
          "task",
          "new",
          "--title",
          "My task",
          "--description",
          "Why it matters",
          "--owner",
          "CODER",
          "--tag",
          "nodejs",
          "--root",
          root,
        ]);
        expect(code1).toBe(0);
        id = io1.stdout.trim();
      } finally {
        io1.restore();
      }

      const io2 = captureStdIO();
      try {
        const code2 = await runCli(["task", "show", id, "--root", root]);
        expect(code2).toBe(0);
        expect(io2.stdout).toContain(`"id": "${id}"`);
        expect(io2.stdout).toContain('"origin"');
        expect(io2.stdout).toContain('"system": "manual"');
        expect(io2.stdout).toContain('"status": "TODO"');
        expect(io2.stdout).toContain('"blueprint"');
        expect(io2.stdout).toContain('"blueprint_id": "analysis.light"');
        expect(io2.stdout).toContain('"route"');
      } finally {
        io2.restore();
      }
    });

    it("task list prints tasks", async () => {
      const root = await mkGitRepoRoot();
      const ids: string[] = [];
      for (const title of ["Alpha task", "Beta task"]) {
        const io1 = captureStdIO();
        try {
          const code1 = await runCli([
            "task",
            "new",
            "--title",
            title,
            "--description",
            "Why it matters",
            "--owner",
            "CODER",
            "--tag",
            "nodejs",
            "--root",
            root,
          ]);
          expect(code1).toBe(0);
          ids.push(io1.stdout.trim());
        } finally {
          io1.restore();
        }
      }

      const io2 = captureStdIO();
      try {
        const code2 = await runCli(["task", "list", "--root", root]);
        expect(code2).toBe(0);
        const lines = splitOutputLines(io2.stdout);
        expect(lines).toHaveLength(3);
        expect(lines[0] ?? "").toContain("[TODO]");
        expect(lines[1] ?? "").toContain("[TODO]");
        expect(lines[2]).toBe("Total: 2 (TODO=2)");
        expect(io2.stdout).toContain(ids[0] ?? "");
        expect(io2.stdout).toContain(ids[1] ?? "");
        expect(io2.stdout).toContain("Alpha task");
        expect(io2.stdout).toContain("Beta task");
      } finally {
        io2.restore();
      }
    });

    it("task list exact filtered quiet output stays stable", async () => {
      const root = await mkGitRepoRoot();
      const firstTaskId = "202603010300-AAAAAA";
      const secondTaskId = "202603010301-BBBBBB";
      await seedTaskQueryFixture(root, [
        {
          id: secondTaskId,
          title: "Beta blocked",
          description: "Waits on alpha",
          status: "TODO",
          priority: "med",
          owner: "CODER",
          depends_on: [firstTaskId],
          tags: ["docs"],
          verify: [],
        },
        {
          id: firstTaskId,
          title: "Alpha ready",
          description: "Ready task",
          status: "TODO",
          priority: "med",
          owner: "CODER",
          depends_on: [],
          tags: ["docs"],
          verify: [],
        },
      ]);

      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "list",
          "--status",
          "TODO",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--quiet",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toBe(
          `${firstTaskId} [TODO] Alpha ready (owner=CODER, prio=med, deps=none, tags=docs, blueprint=docs.change)\n` +
            `${secondTaskId} [TODO] Beta blocked (owner=CODER, prio=med, deps=wait:${firstTaskId}, tags=docs, blueprint=docs.change)\n`,
        );
        expect(io.stderr).toBe("");
      } finally {
        io.restore();
      }
    });

    it("task list is empty when no tasks exist", async () => {
      const root = await mkGitRepoRoot();
      const io = captureStdIO();
      try {
        const code = await runCli(["task", "list", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("Total: 0");
      } finally {
        io.restore();
      }
    });

    it("task list supports filters and quiet mode", async () => {
      const root = await mkGitRepoRoot();
      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Filter task",
            "--description",
            "Tagged task",
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

      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "list",
          "--status",
          "todo",
          "--owner",
          "coder",
          "--tag",
          "docs",
          "--quiet",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        const lines = splitOutputLines(io.stdout);
        expect(lines).toHaveLength(1);
        expect(lines[0]).toContain(taskId);
        expect(lines[0]).toContain("Filter task");
        expect(io.stdout).not.toContain("Total:");
      } finally {
        io.restore();
      }
    });

    it("task list, search, and next wrap text output in agent_json_v1 envelopes when --output json is set", async () => {
      const root = await mkGitRepoRoot();
      const taskIds: string[] = [];
      for (const title of ["Json list one", "Json list two"]) {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            title,
            "--description",
            "Json output contract",
            "--owner",
            "CODER",
            "--tag",
            "docs",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
          taskIds.push(io.stdout.trim());
        } finally {
          io.restore();
        }
      }

      const listIo = captureStdIO();
      try {
        const code = await runCli(["--output", "json", "task", "list", "--root", root]);
        expect(code).toBe(0);
        const payload = parseAgentJsonEnvelope(listIo.stdout);
        expectAgentJsonEnvelope(payload, { command: "task list", ok: true, exitCode: 0 });
        expect(payload.stdout).toContain("Total: 2 (TODO=2)");
        expect(payload.stdout).toContain(taskIds[0] ?? "");
        expect(payload.stdout).toContain(taskIds[1] ?? "");
        expect(payload.stderr).toBe("");
      } finally {
        listIo.restore();
      }

      const searchIo = captureStdIO();
      try {
        const code = await runCli(["--output", "json", "task", "search", "json", "--root", root]);
        expect(code).toBe(0);
        const payload = parseAgentJsonEnvelope(searchIo.stdout);
        expectAgentJsonEnvelope(payload, { command: "task search", ok: true, exitCode: 0 });
        expect(payload.stdout).toContain("Json list one");
        expect(payload.stdout).toContain("Json list two");
        expect(payload.stderr).toBe("");
      } finally {
        searchIo.restore();
      }

      const nextIo = captureStdIO();
      try {
        const code = await runCli([
          "--output",
          "json",
          "task",
          "next",
          "--limit",
          "1",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        const payload = parseAgentJsonEnvelope(nextIo.stdout);
        expectAgentJsonEnvelope(payload, { command: "task next", ok: true, exitCode: 0 });
        expect(payload.stdout).toContain("Ready: 1 / 2");
        expect(payload.stderr).toBe("");
      } finally {
        nextIo.restore();
      }
    });

    it("task list rejects missing filter values and unknown flags", async () => {
      const root = await mkGitRepoRoot();
      const cases: { args: string[]; msg: string }[] = [
        { args: ["task", "list", "--status"], msg: "Missing value after --status" },
        { args: ["task", "list", "--owner"], msg: "Missing value after --owner" },
        { args: ["task", "list", "--tag"], msg: "Missing value after --tag" },
        { args: ["task", "list", "--nope"], msg: "Unknown option: --nope" },
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
  },
);
