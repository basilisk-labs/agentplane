import { execFile } from "node:child_process";
import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";
import { createIncidentRegistrySkeleton } from "../runtime/incidents/index.js";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  cleanGitEnv,
  installRunCliIntegrationHarness,
  runCliSilent,
  writeConfig,
  writeAndConfigureRoot,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);
const NORMALIZE_MIGRATE_INTEGRATION_TIMEOUT_MS = 300_000;
const NORMALIZE_MIGRATE_SHORT_TIMEOUT_MS = 120_000;
const PROMOTABLE_FINDING = [
  "- Observation: hosted reconcile left a shipped task missing incident promotion.",
  "  Impact: reusable recovery knowledge stayed task-local and operators repeated the same cleanup steps.",
  "  Resolution: promote incidents during reconcile whenever a DONE task already carries structured external Findings.",
  "  Fixability: external",
].join("\n");

describe("runCli", { timeout: NORMALIZE_MIGRATE_INTEGRATION_TIMEOUT_MS }, () => {
  it(
    "task normalize and migrate support quiet/force flags",
    async () => {
      const root = await writeAndConfigureRoot();
      const taskId = "202602011330-NRM01";

      const addCode = await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Normalize task",
        "--description",
        "Normalize test",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(addCode).toBe(0);

      const ioNormalize = captureStdIO();
      try {
        const code = await runCli(["task", "normalize", "--quiet", "--force", "--root", root]);
        expect(code).toBe(0);
        expect(ioNormalize.stdout).toBe("");
      } finally {
        ioNormalize.restore();
      }

      const exportPath = path.join(root, "tasks-export.json");
      await writeFile(
        exportPath,
        JSON.stringify(
          {
            tasks: [
              {
                id: "202602011330-MGR01",
                title: "Migrated task",
                description: "Migrate test",
                status: "TODO",
                priority: "med",
                owner: "CODER",
                depends_on: [],
                tags: ["nodejs"],
                verify: [],
                comments: [],
                doc_version: 3,
                doc_updated_at: new Date().toISOString(),
                doc_updated_by: "agentplane",
              },
            ],
          },
          null,
          2,
        ),
        "utf8",
      );

      const ioMigrate = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "migrate",
          "--source",
          path.relative(root, exportPath),
          "--quiet",
          "--force",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(ioMigrate.stdout).toBe("");
      } finally {
        ioMigrate.restore();
      }

      const ioShow = captureStdIO();
      try {
        const code = await runCli(["task", "show", "202602011330-MGR01", "--root", root]);
        expect(code).toBe(0);
        const migrated = JSON.parse(ioShow.stdout) as { id?: string };
        expect(migrated.id).toBe("202602011330-MGR01");
      } finally {
        ioShow.restore();
      }
    },
    NORMALIZE_MIGRATE_SHORT_TIMEOUT_MS,
  );

  it("task normalize and migrate reject unknown flags and missing source values", async () => {
    const root = await writeAndConfigureRoot();

    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "normalize", "--nope"], msg: "Unknown option: --nope." },
      {
        args: ["task", "normalize", "--task-id", "202602011330-NRM01"],
        msg: "--task-id requires --sync-hosted-merges and/or --sync-branch-pr-state.",
      },
      { args: ["task", "migrate", "--source"], msg: "Missing value after --source" },
      { args: ["task", "migrate", "--nope"], msg: "Unknown option: --nope." },
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

  it(
    "task normalize --sync-hosted-merges reconciles stale branch_pr task state from hosted PR data",
    async () => {
      const root = await writeAndConfigureRoot();
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      const taskId = "202603271330-SYNC01";
      const addCode = await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Hosted merge sync task",
        "--description",
        "Sync stale local branch_pr task state",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(addCode).toBe(0);

      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      await mkdir(prDir, { recursive: true });
      await writeFile(
        path.join(prDir, "meta.json"),
        JSON.stringify(
          {
            schema_version: 1,
            task_id: taskId,
            branch: `task/${taskId}/sync-hosted`,
            created_at: "2026-03-27T17:24:00.000Z",
            updated_at: "2026-03-27T17:24:00.000Z",
            last_verified_sha: null,
            last_verified_at: null,
            verify: { status: "skipped" },
          },
          null,
          2,
        ),
        "utf8",
      );

      const fakeBin = path.join(os.tmpdir(), `agentplane-gh-${Date.now()}`);
      await mkdir(fakeBin, { recursive: true });
      const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
      const ghScript =
        process.platform === "win32"
          ? '@echo off\r\necho [{"number":23,"title":"Hosted merge sync task (#23)","mergedAt":"2026-03-27T17:40:00.000Z","baseRefName":"main","headRefName":"task/202603271330-SYNC01/sync-hosted","headRefOid":"abcdef1234567890abcdef1234567890abcdef12","mergeCommit":{"oid":"1234567890abcdef1234567890abcdef12345678"}}]\r\n'
          : '#!/bin/sh\nprintf \'%s\n\' \'[{"number":23,"title":"Hosted merge sync task (#23)","mergedAt":"2026-03-27T17:40:00.000Z","baseRefName":"main","headRefName":"task/202603271330-SYNC01/sync-hosted","headRefOid":"abcdef1234567890abcdef1234567890abcdef12","mergeCommit":{"oid":"1234567890abcdef1234567890abcdef12345678"}}]\'\n';
      await writeFile(ghPath, ghScript, "utf8");
      if (process.platform !== "win32") {
        await chmod(ghPath, 0o755);
      }

      const originalPath = process.env.PATH;
      const originalGhToken = process.env.GH_TOKEN;
      const originalGitDir = process.env.GIT_DIR;
      const originalGitWorkTree = process.env.GIT_WORK_TREE;
      process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
      process.env.GH_TOKEN = "token-from-parent-env";
      process.env.GIT_DIR = "/tmp/leaked.git";
      process.env.GIT_WORK_TREE = "/tmp/leaked-tree";
      try {
        const code = await runCli(["task", "normalize", "--sync-hosted-merges", "--root", root]);
        expect(code).toBe(0);
      } finally {
        process.env.PATH = originalPath;
        if (originalGhToken === undefined) delete process.env.GH_TOKEN;
        else process.env.GH_TOKEN = originalGhToken;
        if (originalGitDir === undefined) delete process.env.GIT_DIR;
        else process.env.GIT_DIR = originalGitDir;
        if (originalGitWorkTree === undefined) delete process.env.GIT_WORK_TREE;
        else process.env.GIT_WORK_TREE = originalGitWorkTree;
      }

      const ioShow = captureStdIO();
      try {
        const code = await runCli(["task", "show", taskId, "--root", root]);
        expect(code).toBe(0);
        const task = JSON.parse(ioShow.stdout) as {
          status?: string;
          result_summary?: string;
          commit?: { hash?: string } | null;
        };
        expect(task.status).toBe("DONE");
        expect(task.result_summary).toBe("Merged via PR #23.");
        expect(task.commit?.hash).toBe("1234567890abcdef1234567890abcdef12345678");
      } finally {
        ioShow.restore();
      }

      const metaRaw = await readFile(path.join(prDir, "meta.json"), "utf8");
      expect(metaRaw).toContain('"status": "MERGED"');
      expect(metaRaw).toContain('"merge_commit": "1234567890abcdef1234567890abcdef12345678"');

      const io = captureStdIO();
      try {
        const code = await runCli(["task", "list", "--status", "DONE", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain(taskId);
      } finally {
        io.restore();
      }
    },
    NORMALIZE_MIGRATE_INTEGRATION_TIMEOUT_MS,
  );

  it(
    "task normalize ignores GitHub auth tokens loaded only from repo dotenv",
    async () => {
      const root = await writeAndConfigureRoot();
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      const taskId = "202603271330-SYNC02";
      const addCode = await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Hosted merge sync task via dotenv auth",
        "--description",
        "Sync stale local branch_pr task state while repo dotenv carries a stale GitHub token",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(addCode).toBe(0);

      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      await mkdir(prDir, { recursive: true });
      await writeFile(
        path.join(prDir, "meta.json"),
        JSON.stringify(
          {
            schema_version: 1,
            task_id: taskId,
            branch: `task/${taskId}/sync-hosted`,
            created_at: "2026-03-27T17:24:00.000Z",
            updated_at: "2026-03-27T17:24:00.000Z",
            last_verified_sha: null,
            last_verified_at: null,
            verify: { status: "skipped" },
          },
          null,
          2,
        ),
        "utf8",
      );
      await writeFile(path.join(root, ".env"), "GITHUB_TOKEN=repo-dotenv-token\n", "utf8");

      const fakeBin = path.join(os.tmpdir(), `agentplane-gh-dotenv-${Date.now()}`);
      await mkdir(fakeBin, { recursive: true });
      const envLog = path.join(fakeBin, "gh-env.log");
      const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
      const ghScript =
        process.platform === "win32"
          ? `@echo off\r\n>> "%AGENTPLANE_GH_ENV_LOG%" echo GITHUB_TOKEN=%GITHUB_TOKEN%\r\necho [{"number":24,"title":"Hosted merge sync task (#24)","mergedAt":"2026-03-27T17:40:00.000Z","baseRefName":"main","headRefName":"task/${taskId}/sync-hosted","headRefOid":"abcdef1234567890abcdef1234567890abcdef12","mergeCommit":{"oid":"1234567890abcdef1234567890abcdef12345679"}}]\r\n`
          : [
              "#!/bin/sh",
              'printf \'GITHUB_TOKEN=%s\\n\' "${GITHUB_TOKEN-}" >> "$AGENTPLANE_GH_ENV_LOG"',
              String.raw`printf '%s\n' '[{"number":24,"title":"Hosted merge sync task (#24)","mergedAt":"2026-03-27T17:40:00.000Z","baseRefName":"main","headRefName":"task/${taskId}/sync-hosted","headRefOid":"abcdef1234567890abcdef1234567890abcdef12","mergeCommit":{"oid":"1234567890abcdef1234567890abcdef12345679"}}]'`,
              "",
            ].join("\n");
      await writeFile(ghPath, ghScript, "utf8");
      if (process.platform !== "win32") {
        await chmod(ghPath, 0o755);
      }

      const originalPath = process.env.PATH;
      const originalGithubToken = process.env.GITHUB_TOKEN;
      process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
      delete process.env.GITHUB_TOKEN;
      process.env.AGENTPLANE_GH_ENV_LOG = envLog;
      try {
        const code = await runCli(["task", "normalize", "--sync-hosted-merges", "--root", root]);
        expect(code).toBe(0);
      } finally {
        process.env.PATH = originalPath;
        if (originalGithubToken === undefined) delete process.env.GITHUB_TOKEN;
        else process.env.GITHUB_TOKEN = originalGithubToken;
        delete process.env.AGENTPLANE_GH_ENV_LOG;
      }

      const envLogRaw = await readFile(envLog, "utf8");
      expect(envLogRaw).toContain("GITHUB_TOKEN=");
      expect(envLogRaw).not.toContain("repo-dotenv-token");

      const ioShow = captureStdIO();
      try {
        const code = await runCli(["task", "show", taskId, "--root", root]);
        expect(code).toBe(0);
        const task = JSON.parse(ioShow.stdout) as {
          status?: string;
          result_summary?: string;
          commit?: { hash?: string } | null;
        };
        expect(task.status).toBe("DONE");
        expect(task.result_summary).toBe("Merged via PR #24.");
        expect(task.commit?.hash).toBe("1234567890abcdef1234567890abcdef12345679");
      } finally {
        ioShow.restore();
      }
    },
    NORMALIZE_MIGRATE_SHORT_TIMEOUT_MS,
  );

  it(
    "task normalize --sync-hosted-merges reconciles from local merged pr/meta without gh",
    async () => {
      const root = await writeAndConfigureRoot();
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      const taskId = "202604061815-SYNC03";
      const addCode = await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Local merged pr meta sync task",
        "--description",
        "Sync branch_pr task state from local merged pr metadata",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(addCode).toBe(0);

      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      await mkdir(prDir, { recursive: true });
      await writeFile(
        path.join(prDir, "meta.json"),
        JSON.stringify(
          {
            schema_version: 1,
            task_id: taskId,
            branch: `task/${taskId}/sync-hosted`,
            base: "main",
            created_at: "2026-04-06T18:15:00.000Z",
            updated_at: "2026-04-06T18:20:00.000Z",
            status: "MERGED",
            merged_at: "2026-04-06T18:19:00.000Z",
            merge_commit: "fedcba0987654321fedcba0987654321fedcba09",
            head_sha: "abcdef1234567890abcdef1234567890abcdef12",
            last_verified_sha: "fedcba0987654321fedcba0987654321fedcba09",
            last_verified_at: "2026-04-06T18:18:00.000Z",
            verify: { status: "pass" },
          },
          null,
          2,
        ),
        "utf8",
      );

      const fakeBin = path.join(os.tmpdir(), `agentplane-gh-fail-${Date.now()}`);
      await mkdir(fakeBin, { recursive: true });
      const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
      const ghScript =
        process.platform === "win32"
          ? "@echo off\r\necho unexpected gh fallback >&2\r\nexit /b 97\r\n"
          : "#!/bin/sh\necho unexpected gh fallback >&2\nexit 97\n";
      await writeFile(ghPath, ghScript, "utf8");
      if (process.platform !== "win32") {
        await chmod(ghPath, 0o755);
      }

      const originalPath = process.env.PATH;
      process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
      try {
        const code = await runCli(["task", "normalize", "--sync-hosted-merges", "--root", root]);
        expect(code).toBe(0);
      } finally {
        process.env.PATH = originalPath;
      }

      const ioShow = captureStdIO();
      try {
        const code = await runCli(["task", "show", taskId, "--root", root]);
        expect(code).toBe(0);
        const task = JSON.parse(ioShow.stdout) as {
          status?: string;
          result_summary?: string;
          commit?: { hash?: string } | null;
        };
        expect(task.status).toBe("DONE");
        expect(task.result_summary).toBe("Merged and reconciled from local PR metadata.");
        expect(task.commit?.hash).toBe("fedcba0987654321fedcba0987654321fedcba09");
      } finally {
        ioShow.restore();
      }
    },
    NORMALIZE_MIGRATE_SHORT_TIMEOUT_MS,
  );

  it(
    "task normalize --sync-hosted-merges promotes incidents for reconciled tasks",
    async () => {
      const root = await writeAndConfigureRoot();
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
      await writeFile(
        path.join(root, ".agentplane", "policy", "incidents.md"),
        createIncidentRegistrySkeleton(),
        "utf8",
      );
      await mkdir(path.join(root, "packages", "agentplane", "assets", "policy"), {
        recursive: true,
      });
      await writeFile(
        path.join(root, "packages", "agentplane", "assets", "policy", "incidents.md"),
        createIncidentRegistrySkeleton(),
        "utf8",
      );

      const taskId = "202604072118-SYNC08";
      const addCode = await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Hosted merge sync incident promotion",
        "--description",
        "Normalize should promote incidents while reconciling merged PR metadata",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(addCode).toBe(0);
      await runCliSilent([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Findings",
        "--text",
        PROMOTABLE_FINDING,
        "--root",
        root,
      ]);

      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      await mkdir(prDir, { recursive: true });
      await writeFile(
        path.join(prDir, "meta.json"),
        JSON.stringify(
          {
            schema_version: 1,
            task_id: taskId,
            branch: `task/${taskId}/sync-hosted-incident`,
            base: "main",
            created_at: "2026-04-07T21:18:00.000Z",
            updated_at: "2026-04-07T21:18:00.000Z",
            status: "MERGED",
            merged_at: "2026-04-07T21:18:00.000Z",
            merge_commit: "1111111111111111111111111111111111111111",
            head_sha: "2222222222222222222222222222222222222222",
            last_verified_sha: "1111111111111111111111111111111111111111",
            last_verified_at: "2026-04-07T21:17:00.000Z",
            verify: { status: "pass" },
          },
          null,
          2,
        ),
        "utf8",
      );

      const io = captureStdIO();
      try {
        const code = await runCli(["task", "normalize", "--sync-hosted-merges", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("promoted_incidents=1");
      } finally {
        io.restore();
      }

      const incidents = await readFile(
        path.join(root, ".agentplane", "policy", "incidents.md"),
        "utf8",
      );
      expect(incidents).toContain(`source_task: ${taskId}`);
      expect(incidents).toContain("fixability: external");
      const mirrored = await readFile(
        path.join(root, "packages", "agentplane", "assets", "policy", "incidents.md"),
        "utf8",
      );
      expect(mirrored).toContain(`source_task: ${taskId}`);
    },
    NORMALIZE_MIGRATE_SHORT_TIMEOUT_MS,
  );

  it(
    "task normalize --sync-hosted-merges keeps incidents unchanged when there are no promotable findings",
    async () => {
      const root = await writeAndConfigureRoot();
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
      const registryText = createIncidentRegistrySkeleton();
      await writeFile(
        path.join(root, ".agentplane", "policy", "incidents.md"),
        registryText,
        "utf8",
      );

      const taskId = "202604072118-SYNC09";
      const addCode = await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Hosted merge sync without incidents",
        "--description",
        "Normalize should leave incidents unchanged when no findings exist",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(addCode).toBe(0);

      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      await mkdir(prDir, { recursive: true });
      await writeFile(
        path.join(prDir, "meta.json"),
        JSON.stringify(
          {
            schema_version: 1,
            task_id: taskId,
            branch: `task/${taskId}/sync-hosted-no-incidents`,
            base: "main",
            created_at: "2026-04-07T21:18:00.000Z",
            updated_at: "2026-04-07T21:18:00.000Z",
            status: "MERGED",
            merged_at: "2026-04-07T21:18:00.000Z",
            merge_commit: "3333333333333333333333333333333333333333",
            head_sha: "4444444444444444444444444444444444444444",
            last_verified_sha: "3333333333333333333333333333333333333333",
            last_verified_at: "2026-04-07T21:17:00.000Z",
            verify: { status: "pass" },
          },
          null,
          2,
        ),
        "utf8",
      );

      const io = captureStdIO();
      try {
        const code = await runCli(["task", "normalize", "--sync-hosted-merges", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("promoted_incidents=0");
      } finally {
        io.restore();
      }

      const incidents = await readFile(
        path.join(root, ".agentplane", "policy", "incidents.md"),
        "utf8",
      );
      expect(incidents).toBe(registryText);
    },
    NORMALIZE_MIGRATE_SHORT_TIMEOUT_MS,
  );

  it(
    "task normalize --sync-hosted-merges scopes reconcile to selected task ids",
    async () => {
      const root = await writeAndConfigureRoot();
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      const selectedTaskId = "202604071853-SYNC04";
      const unselectedTaskId = "202604071853-SYNC05";
      for (const taskId of [selectedTaskId, unselectedTaskId]) {
        const addCode = await runCliSilent([
          "task",
          "add",
          taskId,
          "--title",
          `${taskId} normalize target`,
          "--description",
          "Normalize reconcile target",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "workflow",
          "--root",
          root,
        ]);
        expect(addCode).toBe(0);
      }

      const selectedPrDir = path.join(root, ".agentplane", "tasks", selectedTaskId, "pr");
      await mkdir(selectedPrDir, { recursive: true });
      await writeFile(
        path.join(selectedPrDir, "meta.json"),
        JSON.stringify(
          {
            schema_version: 1,
            task_id: selectedTaskId,
            branch: `task/${selectedTaskId}/selected`,
            base: "main",
            created_at: "2026-04-07T18:53:00.000Z",
            updated_at: "2026-04-07T18:54:00.000Z",
            status: "MERGED",
            merged_at: "2026-04-07T18:54:00.000Z",
            merge_commit: "1111111111111111111111111111111111111111",
            head_sha: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            last_verified_sha: "1111111111111111111111111111111111111111",
            last_verified_at: "2026-04-07T18:53:30.000Z",
            verify: { status: "pass" },
          },
          null,
          2,
        ),
        "utf8",
      );

      const unselectedPrDir = path.join(root, ".agentplane", "tasks", unselectedTaskId, "pr");
      await mkdir(unselectedPrDir, { recursive: true });
      await writeFile(
        path.join(unselectedPrDir, "meta.json"),
        JSON.stringify(
          {
            schema_version: 1,
            task_id: unselectedTaskId,
            branch: `task/${unselectedTaskId}/unselected`,
            base: "main",
            created_at: "2026-04-07T18:53:00.000Z",
            updated_at: "2026-04-07T18:53:00.000Z",
            last_verified_sha: null,
            last_verified_at: null,
            verify: { status: "skipped" },
          },
          null,
          2,
        ),
        "utf8",
      );

      const fakeBin = path.join(os.tmpdir(), `agentplane-gh-targeted-fail-${Date.now()}`);
      await mkdir(fakeBin, { recursive: true });
      const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
      const ghScript =
        process.platform === "win32"
          ? "@echo off\r\necho gh should not be called for unselected tasks >&2\r\nexit /b 97\r\n"
          : "#!/bin/sh\necho gh should not be called for unselected tasks >&2\nexit 97\n";
      await writeFile(ghPath, ghScript, "utf8");
      if (process.platform !== "win32") {
        await chmod(ghPath, 0o755);
      }

      const originalPath = process.env.PATH;
      process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
      try {
        const code = await runCli([
          "task",
          "normalize",
          "--sync-hosted-merges",
          "--task-id",
          selectedTaskId,
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        process.env.PATH = originalPath;
      }

      const ioSelected = captureStdIO();
      try {
        const code = await runCli(["task", "show", selectedTaskId, "--root", root]);
        expect(code).toBe(0);
        const task = JSON.parse(ioSelected.stdout) as {
          status?: string;
          result_summary?: string;
        };
        expect(task.status).toBe("DONE");
        expect(task.result_summary).toBe("Merged and reconciled from local PR metadata.");
      } finally {
        ioSelected.restore();
      }

      const ioUnselected = captureStdIO();
      try {
        const code = await runCli(["task", "show", unselectedTaskId, "--root", root]);
        expect(code).toBe(0);
        const task = JSON.parse(ioUnselected.stdout) as {
          status?: string;
          result_summary?: string | null;
        };
        expect(task.status).toBe("TODO");
        expect(task.result_summary ?? null).toBeNull();
      } finally {
        ioUnselected.restore();
      }
    },
    NORMALIZE_MIGRATE_SHORT_TIMEOUT_MS,
  );

  it(
    "task normalize --sync-branch-pr-state reconciles verified branch_pr tasks already shipped on base",
    async () => {
      const root = await writeAndConfigureRoot();
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
      await writeFile(
        path.join(root, ".agentplane", "policy", "incidents.md"),
        createIncidentRegistrySkeleton(),
        "utf8",
      );

      await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root, env: cleanGitEnv() });
      await writeFile(path.join(root, "feature.txt"), "shipped payload\n", "utf8");
      await execFileAsync("git", ["add", "feature.txt", ".agentplane/config.json"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["commit", "--no-verify", "-m", "feat: shipped payload"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      const shippedHash = stdout.trim();

      const taskId = "202604050900-SYNC02";
      const addCode = await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Local branch_pr sync task",
        "--description",
        "Sync locally shipped branch_pr task state",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(addCode).toBe(0);
      await runCliSilent([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Findings",
        "--text",
        PROMOTABLE_FINDING,
        "--root",
        root,
      ]);

      await runCliSilent([
        "task",
        "set-status",
        taskId,
        "DOING",
        "--commit",
        shippedHash,
        "--root",
        root,
      ]);
      await runCliSilent([
        "verify",
        taskId,
        "--ok",
        "--by",
        "CODER",
        "--note",
        "verified shipped state",
        "--quiet",
        "--root",
        root,
      ]);

      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      await mkdir(prDir, { recursive: true });
      await writeFile(
        path.join(prDir, "meta.json"),
        JSON.stringify(
          {
            schema_version: 1,
            task_id: taskId,
            branch: `task/${taskId}/sync-local`,
            base: "main",
            created_at: "2026-04-05T09:00:00.000Z",
            updated_at: "2026-04-05T09:00:00.000Z",
            last_verified_sha: null,
            last_verified_at: null,
            verify: { status: "skipped" },
          },
          null,
          2,
        ),
        "utf8",
      );

      const ioNormalize = captureStdIO();
      try {
        const code = await runCli(["task", "normalize", "--sync-branch-pr-state", "--root", root]);
        expect(code).toBe(0);
        expect(ioNormalize.stdout).toContain("promoted_incidents=1");
      } finally {
        ioNormalize.restore();
      }

      const ioShow = captureStdIO();
      try {
        const showCode = await runCli(["task", "show", taskId, "--root", root]);
        expect(showCode).toBe(0);
        const task = JSON.parse(ioShow.stdout) as {
          status?: string;
          result_summary?: string;
          commit?: { hash?: string } | null;
        };
        expect(task.status).toBe("DONE");
        expect(task.result_summary).toBe(
          "Shipped on main and reconciled from local branch_pr state.",
        );
        expect(task.commit?.hash).toBe(shippedHash);
      } finally {
        ioShow.restore();
      }

      const syncedMeta = JSON.parse(
        await readFile(path.join(prDir, "meta.json"), "utf8"),
      ) as Record<string, unknown>;
      expect(syncedMeta.status).toBe("MERGED");
      expect(syncedMeta.base).toBe("main");
      expect(syncedMeta.merge_commit).toBe(shippedHash);

      const incidents = await readFile(
        path.join(root, ".agentplane", "policy", "incidents.md"),
        "utf8",
      );
      expect(incidents).toContain(`source_task: ${taskId}`);
      expect(incidents).toContain("fixability: external");
    },
    NORMALIZE_MIGRATE_SHORT_TIMEOUT_MS,
  );

  it(
    "task normalize --sync-branch-pr-state reconciles DONE branch_pr tasks with OPEN PR artifacts already shipped on base",
    async () => {
      const root = await writeAndConfigureRoot();
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root, env: cleanGitEnv() });
      await writeFile(path.join(root, "feature.txt"), "shipped payload\n", "utf8");
      await execFileAsync("git", ["add", "feature.txt", ".agentplane/config.json"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["commit", "--no-verify", "-m", "feat: shipped payload"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      const shippedHash = stdout.trim();

      const taskId = "202604050900-SYNC03";
      const addCode = await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Done local branch_pr reconcile task",
        "--description",
        "Sync done local branch_pr task state",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(addCode).toBe(0);
      await runCliSilent([
        "task",
        "set-status",
        taskId,
        "DOING",
        "--commit",
        shippedHash,
        "--root",
        root,
      ]);
      await runCliSilent([
        "verify",
        taskId,
        "--ok",
        "--by",
        "CODER",
        "--note",
        "verified shipped state",
        "--quiet",
        "--root",
        root,
      ]);

      const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
      const readmeText = await readFile(readmePath, "utf8");
      await writeFile(readmePath, readmeText.replace('status: "DOING"', 'status: "DONE"'), "utf8");

      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      await mkdir(prDir, { recursive: true });
      await writeFile(
        path.join(prDir, "meta.json"),
        JSON.stringify(
          {
            schema_version: 1,
            task_id: taskId,
            branch: `task/${taskId}/sync-local-done`,
            base: "main",
            created_at: "2026-04-05T09:00:00.000Z",
            updated_at: "2026-04-05T09:00:00.000Z",
            status: "OPEN",
            head_sha: "branch-head-sha",
            last_verified_sha: shippedHash,
            last_verified_at: "2026-04-05T09:10:00.000Z",
            verify: { status: "pass" },
          },
          null,
          2,
        ),
        "utf8",
      );

      const ioNormalize = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "normalize",
          "--sync-branch-pr-state",
          "--task-id",
          taskId,
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(ioNormalize.stdout).toContain("synced_branch_pr_state=1");
      } finally {
        ioNormalize.restore();
      }

      const ioShow = captureStdIO();
      try {
        const showCode = await runCli(["task", "show", taskId, "--root", root]);
        expect(showCode).toBe(0);
        const task = JSON.parse(ioShow.stdout) as {
          status?: string;
          commit?: { hash?: string } | null;
        };
        expect(task.status).toBe("DONE");
        expect(task.commit?.hash).toBe(shippedHash);
      } finally {
        ioShow.restore();
      }

      const syncedMeta = JSON.parse(
        await readFile(path.join(prDir, "meta.json"), "utf8"),
      ) as Record<string, unknown>;
      expect(syncedMeta.status).toBe("MERGED");
      expect(syncedMeta.base).toBe("main");
      expect(syncedMeta.merge_commit).toBe(shippedHash);
      expect(syncedMeta.head_sha).toBe("branch-head-sha");
    },
    NORMALIZE_MIGRATE_SHORT_TIMEOUT_MS,
  );

  it(
    "task normalize --sync-branch-pr-state scopes reconcile to selected task ids",
    async () => {
      const root = await writeAndConfigureRoot();
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root, env: cleanGitEnv() });
      await writeFile(path.join(root, "feature.txt"), "targeted shipped payload\n", "utf8");
      await execFileAsync("git", ["add", "feature.txt", ".agentplane/config.json"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await execFileAsync(
        "git",
        ["commit", "--no-verify", "-m", "feat: targeted shipped payload"],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );
      const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      const shippedHash = stdout.trim();

      const selectedTaskId = "202604071853-SYNC06";
      const unselectedTaskId = "202604071853-SYNC07";
      for (const taskId of [selectedTaskId, unselectedTaskId]) {
        const addCode = await runCliSilent([
          "task",
          "add",
          taskId,
          "--title",
          `${taskId} local sync target`,
          "--description",
          "Sync locally shipped branch_pr task state",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "workflow",
          "--root",
          root,
        ]);
        expect(addCode).toBe(0);
        await runCliSilent([
          "task",
          "set-status",
          taskId,
          "DOING",
          "--commit",
          shippedHash,
          "--root",
          root,
        ]);
        await runCliSilent([
          "verify",
          taskId,
          "--ok",
          "--by",
          "CODER",
          "--note",
          "verified shipped state",
          "--quiet",
          "--root",
          root,
        ]);
        const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
        await mkdir(prDir, { recursive: true });
        await writeFile(
          path.join(prDir, "meta.json"),
          JSON.stringify(
            {
              schema_version: 1,
              task_id: taskId,
              branch: `task/${taskId}/sync-local`,
              base: "main",
              created_at: "2026-04-07T18:53:00.000Z",
              updated_at: "2026-04-07T18:53:00.000Z",
              last_verified_sha: null,
              last_verified_at: null,
              verify: { status: "skipped" },
            },
            null,
            2,
          ),
          "utf8",
        );
      }

      const code = await runCli([
        "task",
        "normalize",
        "--sync-branch-pr-state",
        "--task-id",
        selectedTaskId,
        "--root",
        root,
      ]);
      expect(code).toBe(0);

      const ioSelected = captureStdIO();
      try {
        const showCode = await runCli(["task", "show", selectedTaskId, "--root", root]);
        expect(showCode).toBe(0);
        const task = JSON.parse(ioSelected.stdout) as { status?: string };
        expect(task.status).toBe("DONE");
      } finally {
        ioSelected.restore();
      }

      const ioUnselected = captureStdIO();
      try {
        const showCode = await runCli(["task", "show", unselectedTaskId, "--root", root]);
        expect(showCode).toBe(0);
        const task = JSON.parse(ioUnselected.stdout) as { status?: string };
        expect(task.status).toBe("DOING");
      } finally {
        ioUnselected.restore();
      }
    },
    NORMALIZE_MIGRATE_INTEGRATION_TIMEOUT_MS,
  );
});
