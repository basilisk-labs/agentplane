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

import {
  defaultConfig,
  extractTaskSuffix,
  readTask,
  renderTaskReadme,
  type ResolvedProject,
} from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import { BUNDLED_RECIPES_CATALOG } from "../recipes/bundled-recipes.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import * as taskBackend from "../backends/task-backend.js";
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
} from "./run-cli.test-helpers.js";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

describe("runCli", () => {
  it("task doc set updates a task README section and bumps metadata", async () => {
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
      const code2 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--text",
        "Hello",
        "--updated-by",
        "DOCS",
        "--root",
        root,
      ]);
      expect(code2).toBe(0);
      expect(io2.stdout).toContain(path.join(root, ".agentplane", "tasks", id, "README.md"));
      expect(io2.stderr).toContain("task doc set outcome=section-updated section=Summary");
    } finally {
      io2.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("## Summary");
    expect(readme).toContain("Hello");
    expect(readme).toContain('doc_updated_by: "DOCS"');
  });

  it("task scaffold writes and enforces overwrite", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202602011330-SCAF01";

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "scaffold", taskId, "--force", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("wrote");
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("doc_version: 3");
    expect(readme).toContain("## Verify Steps");
    expect(readme).toContain("<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->");
    expect(readme).toContain("1. <Action>. Expected: <observable result>.");
    expect(readme).toContain("## Verification");
    expect(readme).toContain("## Findings");
    expect(readme).toContain("<!-- BEGIN VERIFICATION RESULTS -->");
    expect(readme).toContain("<!-- END VERIFICATION RESULTS -->");
    expect(readme.indexOf("## Verify Steps")).toBeLessThan(readme.indexOf("## Verification"));

    const ioOverwrite = captureStdIO();
    try {
      const code = await runCli(["task", "scaffold", taskId, "--root", root]);
      expect(code).toBe(2);
      expect(ioOverwrite.stderr).toContain("File already exists");
    } finally {
      ioOverwrite.restore();
    }

    const ioForce = captureStdIO();
    try {
      const code = await runCli(["task", "scaffold", taskId, "--overwrite", "--root", root]);
      expect(code).toBe(0);
    } finally {
      ioForce.restore();
    }
  });

  it("task scaffold supports quiet and title", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202602011330-SCAF02";
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "scaffold",
        taskId,
        "--title",
        "Custom title",
        "--force",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toBe("");
      expect(io.stderr).toBe("");
    } finally {
      io.restore();
    }

    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("Custom title");
  });

  it("task scaffold rejects missing title values and unknown flags", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202602011330-SCAF03";
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "scaffold", taskId, "--title"], msg: "Missing value after --title" },
      { args: ["task", "scaffold", taskId, "--nope", "x"], msg: "Unknown option: --nope." },
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

  it("task derive sets depends_on and task list shows wait deps until spike is DONE", async () => {
    const root = await writeAndConfigureRoot();

    const ioSpike = captureStdIO();
    let spikeId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Spike task",
        "--description",
        "Exploration",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "spike",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      spikeId = ioSpike.stdout.trim();
      expect(spikeId).toContain("-");
    } finally {
      ioSpike.restore();
    }

    const ioDerive = captureStdIO();
    let derivedId = "";
    try {
      const code = await runCli([
        "task",
        "derive",
        spikeId,
        "--title",
        "Implementation task",
        "--description",
        "Build the thing",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      derivedId = ioDerive.stdout.trim();
      expect(derivedId).toContain("-");
    } finally {
      ioDerive.restore();
    }

    const ioShow = captureStdIO();
    try {
      const code = await runCli(["task", "show", derivedId, "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(ioShow.stdout) as { depends_on?: string[] };
      expect(parsed.depends_on ?? []).toContain(spikeId);
    } finally {
      ioShow.restore();
    }

    const ioList = captureStdIO();
    try {
      const code = await runCli(["task", "list", "--root", root]);
      expect(code).toBe(0);
      expect(ioList.stdout).toContain(`deps=wait:${spikeId}`);
    } finally {
      ioList.restore();
    }
  });

  it("task normalize and migrate support quiet/force flags", async () => {
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
              doc_version: 2,
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

    const migrated = await readTask({
      cwd: root,
      rootOverride: root,
      taskId: "202602011330-MGR01",
    });
    expect(migrated?.id).toBe("202602011330-MGR01");
  }, 15_000);

  it("task normalize and migrate reject unknown flags and missing source values", async () => {
    const root = await writeAndConfigureRoot();

    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "normalize", "--nope"], msg: "Unknown option: --nope." },
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

  it("task doc set appends required sections when missing", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202601300000-ABCD";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\nOnly summary",
    );
    await writeFile(path.join(taskDir, "README.md"), readme, "utf8");

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
        "Updated",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const updated = await readFile(path.join(taskDir, "README.md"), "utf8");
    expect(updated).toContain("## Summary");
    expect(updated).toContain("Updated");
    expect(updated).toContain("## Scope");
    expect(updated).toContain("## Plan");
    expect(updated).toContain("## Verification");
  });

  it("task doc set dedupes repeated section headings", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202601300002-ABCD";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\n## Scope\n\n## Verification\n\n## Rollback Plan\n",
    );
    const duplicated = `${readme}\n## Summary\n\nOld summary\n\n## Scope\n\nOld scope\n`;
    await writeFile(path.join(taskDir, "README.md"), duplicated, "utf8");

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
        "Updated summary",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const updated = await readFile(path.join(taskDir, "README.md"), "utf8");
    expect((updated.match(/^## Summary$/gm) ?? []).length).toBe(1);
    expect((updated.match(/^## Scope$/gm) ?? []).length).toBe(1);
    expect(updated).toContain("Updated summary");
  });

  it("task doc set splits concatenated section headings", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202601300002-ABCD";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\n## Scope\n\n## Verification\n\n## Rollback Plan\n",
    );
    const duplicated = `${readme}\n## Summary## Summary\n\nOld summary\n\n## Scope\n\nOld scope\n`;
    await writeFile(path.join(taskDir, "README.md"), duplicated, "utf8");

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
        "Updated summary",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const updated = await readFile(path.join(taskDir, "README.md"), "utf8");
    expect(updated).not.toContain("## Summary## Summary");
    expect((updated.match(/^## Summary$/gm) ?? []).length).toBe(1);
    expect((updated.match(/^## Scope$/gm) ?? []).length).toBe(1);
    expect(updated).toContain("Updated summary");
  });

  it("task doc set treats multi-section text as a full doc update", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202601300001-ABCD";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\n## Scope\n\n## Verification\n\n## Rollback Plan\n",
    );
    await writeFile(path.join(taskDir, "README.md"), readme, "utf8");

    const fullDoc = [
      "## Summary",
      "",
      "Filled summary.",
      "",
      "## Scope",
      "",
      "Filled scope.",
      "",
      "## Verification",
      "",
      "Filled verification.",
      "",
      "## Rollback Plan",
      "",
      "Filled rollback.",
    ].join("\n");

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
        fullDoc,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stderr).toContain("task doc set outcome=full-doc-updated section=Summary");
    } finally {
      io.restore();
    }

    const updated = await readFile(path.join(taskDir, "README.md"), "utf8");
    const summaryCount = (updated.match(/^## Summary$/gm) ?? []).length;
    const scopeCount = (updated.match(/^## Scope$/gm) ?? []).length;
    const verificationCount = (updated.match(/^## Verification$/gm) ?? []).length;
    expect(summaryCount).toBe(1);
    expect(scopeCount).toBe(1);
    expect(verificationCount).toBe(1);
    expect(updated).toContain("Filled summary.");
    expect(updated).toContain("Filled scope.");
  });

  it("task doc set supports an explicit --full-doc update path", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202601300002-ABCD";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\nOld summary.\n",
    );
    await writeFile(path.join(taskDir, "README.md"), readme, "utf8");

    const fullDoc = [
      "## Summary",
      "",
      "Explicit full doc summary.",
      "",
      "## Scope",
      "",
      "Explicit full doc scope.",
      "",
      "## Verification",
      "",
      "Explicit full doc verification.",
      "",
      "## Rollback Plan",
      "",
      "Explicit full doc rollback.",
    ].join("\n");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        taskId,
        "--full-doc",
        "--text",
        fullDoc,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stderr).toContain("task doc set outcome=full-doc-updated section=<full-doc>");
    } finally {
      io.restore();
    }

    const updated = await readFile(path.join(taskDir, "README.md"), "utf8");
    expect(updated).toContain("Explicit full doc summary.");
    expect(updated).toContain("Explicit full doc scope.");
    expect(updated).toContain("Explicit full doc rollback.");
  });

  it("task doc set reports a stable no-change outcome when content is unchanged", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202601300003-ABCD";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\nUnchanged summary\n",
    );
    const readmePath = path.join(taskDir, "README.md");
    await writeFile(readmePath, readme, "utf8");

    const ioSeed = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Summary",
        "--text",
        "Unchanged summary",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(ioSeed.stderr).toContain("task doc set outcome=section-updated section=Summary");
    } finally {
      ioSeed.restore();
    }

    const before = await readFile(readmePath, "utf8");

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
        "Unchanged summary",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stderr).toContain("task doc set outcome=no-change section=Summary");
    } finally {
      io.restore();
    }

    const after = await readFile(readmePath, "utf8");
    expect(after).toBe(before);
  });

  it("task doc set fails when backend lacks doc support", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202601300000-BCDE";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\nDoc",
    );
    await writeFile(path.join(taskDir, "README.md"), readme, "utf8");

    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const loadResult = {
      backend: stubTaskBackend({ id: "fake" }),
      backendId: "fake",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

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
        "Hello",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Backend does not support task docs");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("task doc set validates usage and maps unknown doc sections", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    try {
      const code1 = await runCli(["task", "doc", "set", "X", "--root", root]);
      expect(code1).toBe(2);
      expect(io1.stderr).toContain("Missing required option: --section (or pass --full-doc)");
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    let id = "";
    try {
      const code2 = await runCli([
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
      expect(code2).toBe(0);
      id = io2.stdout.trim();
    } finally {
      io2.restore();
    }

    const io3 = captureStdIO();
    try {
      const code3 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Nope",
        "--text",
        "x",
        "--root",
        root,
      ]);
      expect(code3).toBe(2);
      expect(io3.stderr).toContain("Unknown doc section");
    } finally {
      io3.restore();
    }

    const io4 = captureStdIO();
    try {
      const code4 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--root",
        root,
      ]);
      expect(code4).toBe(2);
      expect(io4.stderr).toContain("Exactly one of --text or --file is required.");
    } finally {
      io4.restore();
    }

    const io5 = captureStdIO();
    try {
      const code5 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--full-doc",
        "--text",
        "x",
        "--root",
        root,
      ]);
      expect(code5).toBe(2);
      expect(io5.stderr).toContain("Use either --section or --full-doc");
    } finally {
      io5.restore();
    }
  });

  it("task doc set rejects missing flag values and unknown flags", async () => {
    const root = await mkGitRepoRoot();

    let id = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Doc set flags",
        "--description",
        "Flag validation coverage",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io1 = captureStdIO();
    try {
      const code1 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--text",
        "x",
        "--updated-by",
        "--root",
        root,
      ]);
      expect(code1).toBe(2);
      expect(io1.stderr).toContain("Missing value after --updated-by");
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--text",
        "x",
        "--nope",
        "y",
        "--root",
        root,
      ]);
      expect(code2).toBe(2);
      expect(io2.stderr).toContain("Unknown option: --nope.");
    } finally {
      io2.restore();
    }
  });

  it("task doc set rejects empty --updated-by", async () => {
    const root = await mkGitRepoRoot();

    let id = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Doc set updated-by",
        "--description",
        "Updated-by validation",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--text",
        "x",
        "--updated-by",
        "   ",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("--updated-by must be non-empty");
    } finally {
      io.restore();
    }
  });

  it("task doc set rejects unexpected arguments", async () => {
    const root = await mkGitRepoRoot();

    let id = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Doc set unexpected arg",
        "--description",
        "Unexpected arg validation",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        id,
        "oops",
        "--section",
        "Summary",
        "--text",
        "x",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unexpected argument: oops");
    } finally {
      io.restore();
    }
  });

  it("task doc set maps missing task/file to E_IO", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    try {
      const code1 = await runCli([
        "task",
        "doc",
        "set",
        "202601010101-ABCDEF",
        "--section",
        "Summary",
        "--text",
        "x",
        "--root",
        root,
      ]);
      expect(code1).toBe(4);
      expect(io1.stderr).toMatch(/ENOENT|no such file/i);
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli([
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
      expect(code2).toBe(0);
    } finally {
      io2.restore();
    }

    const id = io2.stdout.trim();

    const io3 = captureStdIO();
    try {
      const code3 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Findings",
        "--file",
        path.join(root, "does-not-exist.txt"),
        "--root",
        root,
      ]);
      expect(code3).toBe(4);
      expect(io3.stderr).toMatch(/ENOENT|no such file/i);
    } finally {
      io3.restore();
    }
  });
});

async function writeAndConfigureRoot(): Promise<string> {
  const root = await mkGitRepoRoot();
  await writeDefaultConfig(root);
  return root;
}
