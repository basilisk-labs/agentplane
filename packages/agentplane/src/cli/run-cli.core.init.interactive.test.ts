import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { loadConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  mkTempDir,
  pathExists,
} from "@agentplane/testkit";
import {
  baseRecipeEntry,
  baseRecipeManifest,
  scenarioDescriptor,
} from "@agentplane/testkit/recipes";

const mocks = vi.hoisted(() => ({
  cancelMock: vi.fn(),
  confirmMock: vi.fn(),
  introMock: vi.fn(),
  isCancelMock: vi.fn(() => false),
  logErrorMock: vi.fn(),
  logStepMock: vi.fn(),
  noteMock: vi.fn(),
  outroMock: vi.fn(),
  selectMock: vi.fn(),
  spinnerMessageMock: vi.fn(),
  spinnerStartMock: vi.fn(),
  spinnerStopMock: vi.fn(),
  textMock: vi.fn(),
}));

vi.mock("@clack/prompts", () => ({
  cancel: mocks.cancelMock,
  confirm: mocks.confirmMock,
  intro: mocks.introMock,
  isCancel: mocks.isCancelMock,
  log: {
    error: mocks.logErrorMock,
    step: mocks.logStepMock,
  },
  note: mocks.noteMock,
  outro: mocks.outroMock,
  select: mocks.selectMock,
  spinner: () => ({
    message: mocks.spinnerMessageMock,
    start: mocks.spinnerStartMock,
    stop: mocks.spinnerStopMock,
  }),
  text: mocks.textMock,
}));

const originalStdinIsTty = Object.getOwnPropertyDescriptor(process.stdin, "isTTY");
const originalStdoutIsTty = Object.getOwnPropertyDescriptor(process.stdout, "isTTY");
const originalPromptMode = process.env.AGENTPLANE_PROMPTS;

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

function restoreEnv(): void {
  if (originalPromptMode === undefined) {
    delete process.env.AGENTPLANE_PROMPTS;
  } else {
    process.env.AGENTPLANE_PROMPTS = originalPromptMode;
  }
}

function resetClackMocks(): void {
  mocks.cancelMock.mockReset();
  mocks.confirmMock.mockReset();
  mocks.confirmMock.mockResolvedValue(true);
  mocks.introMock.mockReset();
  mocks.isCancelMock.mockReset();
  mocks.isCancelMock.mockReturnValue(false);
  mocks.logErrorMock.mockReset();
  mocks.logStepMock.mockReset();
  mocks.noteMock.mockReset();
  mocks.outroMock.mockReset();
  mocks.selectMock.mockReset();
  mocks.spinnerMessageMock.mockReset();
  mocks.spinnerStartMock.mockReset();
  mocks.spinnerStopMock.mockReset();
  mocks.textMock.mockReset();
}

async function writeLegacyRecipeCache(): Promise<void> {
  const scenario = {
    ...scenarioDescriptor(),
    name: undefined,
    use_when: undefined,
    required_inputs: undefined,
    outputs: undefined,
    agents_involved: undefined,
    run_profile: undefined,
    file: undefined,
  };
  const manifest = baseRecipeManifest({ scenarios: [scenario] });
  await writeFile(
    path.join(process.env.AGENTPLANE_HOME ?? "", "recipes.json"),
    JSON.stringify(
      {
        schema_version: 1,
        updated_at: "2026-04-22T00:00:00.000Z",
        recipes: [baseRecipeEntry({ manifest })],
      },
      null,
      2,
    ),
    "utf8",
  );
}

async function writeInvalidRecipeCacheWithoutPromptSurfaces(): Promise<void> {
  await writeFile(
    path.join(process.env.AGENTPLANE_HOME ?? "", "recipes.json"),
    JSON.stringify(
      {
        schema_version: 1,
        updated_at: "2026-04-22T00:00:00.000Z",
        recipes: [
          {
            id: "metadata-only",
            version: "0.9.0",
            source: "local",
            installed_at: "2026-04-22T00:00:00.000Z",
            tags: ["docs"],
            manifest: {
              schema_version: "1",
              kind: "project_overlay",
              id: "metadata-only",
              version: "0.9.0",
              name: "Metadata Only",
              summary: "Metadata-only cached recipe",
              agents: [
                {
                  id: "viewer",
                  display_name: "Viewer",
                  role: "viewer",
                  summary: "Preview tasks",
                  file: "agents/viewer.md",
                },
              ],
            },
          },
        ],
      },
      null,
      2,
    ),
    "utf8",
  );
}

installRunCliIntegrationHarness();

describe("runCli interactive init UI", () => {
  beforeEach(() => {
    setTty(true);
    restoreEnv();
    delete process.env.AGENTPLANE_PROMPTS;
    resetClackMocks();
  });

  afterEach(() => {
    restoreTty();
    restoreEnv();
  });

  it("runs the preview, confirm, and apply path on the default interactive route", async () => {
    const root = await mkTempDir();
    mocks.selectMock
      .mockResolvedValueOnce("quick")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("direct");
    mocks.confirmMock.mockResolvedValueOnce(true);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--root", root]);

      expect(code, io.stderr).toBe(0);
      expect(io.stdout).toContain(".agentplane");
    } finally {
      io.restore();
    }

    expect(mocks.introMock).toHaveBeenCalledWith("AgentPlane init");
    expect(mocks.selectMock).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Workflow mode", initialValue: "direct" }),
    );
    expect(mocks.noteMock).toHaveBeenCalledWith(expect.any(String), "Install preview");
    expect(mocks.noteMock).toHaveBeenCalledWith(
      expect.stringContaining("no Git remote or CI configuration was detected"),
      "Install preview",
    );
    expect(mocks.confirmMock).toHaveBeenCalledWith({
      message: "Apply this init plan?",
      initialValue: true,
    });
    expect(mocks.spinnerStartMock).toHaveBeenCalledWith("Writing init config");
    expect(mocks.spinnerStopMock).toHaveBeenCalledWith("Created install commit");
    expect(mocks.noteMock).toHaveBeenCalledWith(
      expect.stringContaining("First task"),
      "Install preview",
    );
    expect(mocks.outroMock).toHaveBeenCalledWith(
      `AgentPlane initialized in ${root}.\nNext: agentplane task create "Describe the outcome you want"`,
    );

    const { config } = await loadConfig(path.join(root, ".agentplane"));
    expect(config.workflow_mode).toBe("direct");
    expect((config.tasks_backend as { config_path?: string } | undefined)?.config_path).toBe(
      ".agentplane/backends/local/backend.json",
    );
    await expect(pathExists(path.join(root, "AGENTS.md"))).resolves.toBe(true);
    await expect(pathExists(path.join(root, ".agentplane", "WORKFLOW.md"))).resolves.toBe(true);
    await expect(pathExists(path.join(root, ".agentplane", "config.json"))).resolves.toBe(false);
  });

  it("derives the quick workflow default from repository CI facts and explains the decision", async () => {
    const root = await mkTempDir();
    await mkdir(path.join(root, ".github", "workflows"), { recursive: true });
    await writeFile(path.join(root, ".github", "workflows", "ci.yml"), "name: CI\n", "utf8");
    mocks.selectMock
      .mockResolvedValueOnce("quick")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("branch_pr");
    mocks.confirmMock.mockResolvedValueOnce(true);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--root", root]);
      expect(code, io.stderr).toBe(0);
    } finally {
      io.restore();
    }

    expect(mocks.selectMock).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Workflow mode", initialValue: "branch_pr" }),
    );
    expect(mocks.noteMock).toHaveBeenCalledWith(
      expect.stringContaining("detected GitHub Actions CI"),
      "Install preview",
    );
    const { config } = await loadConfig(path.join(root, ".agentplane"));
    expect(config.workflow_mode).toBe("branch_pr");
  });

  it("respects explicit init flags on the default interactive route", async () => {
    const root = await mkTempDir();
    mocks.confirmMock.mockResolvedValueOnce(true);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "init",
        "--quick",
        "--tool",
        "codex",
        "--setup-profile",
        "light",
        "--policy-gateway",
        "codex",
        "--ide",
        "codex",
        "--backend",
        "local",
        "--workflow",
        "direct",
        "--require-network-approval",
        "true",
        "--root",
        root,
      ]);

      expect(code).toBe(0);
      expect(io.stdout).toContain(".agentplane");
    } finally {
      io.restore();
    }

    expect(mocks.introMock).toHaveBeenCalledWith("AgentPlane init");
    expect(mocks.confirmMock).toHaveBeenCalledTimes(1);
    expect(mocks.selectMock).not.toHaveBeenCalled();
    await expect(pathExists(path.join(root, ".agentplane", "WORKFLOW.md"))).resolves.toBe(true);
    await expect(pathExists(path.join(root, ".agentplane", "config.json"))).resolves.toBe(false);
  });

  it("surfaces legacy profile warnings on the detailed interactive route", async () => {
    const root = await mkTempDir();

    const io = captureStdIO();
    try {
      const code = await runCli([
        "init",
        "--advanced",
        "--tool",
        "codex",
        "--setup-profile",
        "light",
        "--policy-gateway",
        "codex",
        "--ide",
        "none",
        "--workflow",
        "direct",
        "--direct-close-dirty-policy",
        "allow-other-task-readmes",
        "--backend",
        "local",
        "--hooks",
        "no",
        "--require-plan-approval",
        "yes",
        "--require-network-approval",
        "yes",
        "--require-verify-approval",
        "yes",
        "--feedback-github-issues",
        "no",
        "--feedback-anonymous-cloud",
        "no",
        "--execution-profile",
        "aggressive",
        "--evaluator-skepticism",
        "standard",
        "--strict-unsafe-confirm",
        "true",
        "--recipes",
        "none",
        "--blueprints",
        "none",
        "--root",
        root,
      ]);

      expect(code).toBe(0);
      expect(mocks.noteMock).toHaveBeenCalledWith(
        expect.stringContaining('Setup profile "light" is a compatibility alias'),
        "Install preview",
      );
      expect(mocks.noteMock).toHaveBeenCalledWith(
        expect.stringContaining('Execution profile "aggressive" is a compatibility alias'),
        "Install preview",
      );
      expect(mocks.noteMock).toHaveBeenCalledWith(
        expect.stringContaining("--strict-unsafe-confirm is a compatibility option"),
        "Install preview",
      );
    } finally {
      io.restore();
    }
  });

  it("uses init for the default TTY interactive route", async () => {
    const root = await mkTempDir();
    mocks.selectMock
      .mockResolvedValueOnce("quick")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("direct");
    mocks.confirmMock.mockResolvedValueOnce(true);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--root", root]);

      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    expect(mocks.introMock).toHaveBeenCalledWith("AgentPlane init");
    expect(mocks.confirmMock).toHaveBeenCalledWith({
      message: "Apply this init plan?",
      initialValue: true,
    });
  });

  it("completes the default TTY dialog with a legacy cached recipe manifest", async () => {
    const root = await mkTempDir();
    await writeLegacyRecipeCache();
    mocks.selectMock
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("direct")
      .mockResolvedValueOnce("allow-other-task-readmes")
      .mockResolvedValueOnce("local")
      .mockResolvedValueOnce("standard");
    mocks.confirmMock
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    mocks.textMock.mockResolvedValueOnce("none");

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--advanced", "--root", root]);

      expect(code).toBe(0);
      expect(io.stdout).toContain(".agentplane");
    } finally {
      io.restore();
    }

    expect(mocks.introMock).toHaveBeenCalledWith("AgentPlane init");
    expect(mocks.noteMock).toHaveBeenCalledWith(expect.stringContaining("agent/plane"));
    expect(mocks.logStepMock).toHaveBeenCalledWith("Advanced setup");
    expect(mocks.selectMock).toHaveBeenCalledTimes(7);
    expect(mocks.textMock).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Materialize cached recipes" }),
    );
    expect(mocks.confirmMock).toHaveBeenCalledWith({
      message: "Apply this init plan?",
      initialValue: true,
    });
    expect(mocks.outroMock).toHaveBeenCalledWith(
      `AgentPlane initialized in ${root}.\nNext: agentplane task create "Describe the outcome you want"`,
    );
    await expect(pathExists(path.join(root, ".agentplane", "WORKFLOW.md"))).resolves.toBe(true);
    const migrated = JSON.parse(
      await readFile(path.join(process.env.AGENTPLANE_HOME ?? "", "recipes.json"), "utf8"),
    ) as {
      recipes: [{ manifest: { scenarios: [{ file: string; use_when: string[] }] } }];
    };
    expect(migrated.recipes[0]?.manifest.scenarios[0]?.file).toBe("scenarios/RECIPE_SCENARIO.json");
    expect(migrated.recipes[0]?.manifest.scenarios[0]?.use_when).toEqual(["Recipe scenario"]);
  });

  it("does not crash when cached recipe text validation receives undefined before submit", async () => {
    const root = await mkTempDir();
    await writeLegacyRecipeCache();
    mocks.selectMock
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("direct")
      .mockResolvedValueOnce("allow-other-task-readmes")
      .mockResolvedValueOnce("local")
      .mockResolvedValueOnce("standard");
    mocks.confirmMock
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    mocks.textMock.mockImplementationOnce(
      (opts?: { validate?: (value: string) => string | void }) => {
        expect(() => opts?.validate?.(undefined as never)).not.toThrow();
        return "none";
      },
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--advanced", "--root", root]);

      expect(code).toBe(0);
      expect(io.stderr).not.toContain("Cannot read properties of undefined");
    } finally {
      io.restore();
    }

    expect(mocks.outroMock).toHaveBeenCalledWith(
      `AgentPlane initialized in ${root}.\nNext: agentplane task create "Describe the outcome you want"`,
    );
    await expect(pathExists(path.join(root, ".agentplane", "WORKFLOW.md"))).resolves.toBe(true);
    await expect(pathExists(path.join(root, ".agentplane", "config.json"))).resolves.toBe(false);
  });

  it("completes the default TTY dialog when cached manifests without prompts or scenarios are pruned", async () => {
    const root = await mkTempDir();
    await writeInvalidRecipeCacheWithoutPromptSurfaces();
    mocks.selectMock
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("direct")
      .mockResolvedValueOnce("allow-other-task-readmes")
      .mockResolvedValueOnce("local")
      .mockResolvedValueOnce("standard");
    mocks.confirmMock
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--advanced", "--root", root]);

      expect(code).toBe(0);
      expect(io.stderr).not.toContain("Invalid field manifest: expected prompts or scenarios");
    } finally {
      io.restore();
    }

    expect(mocks.introMock).toHaveBeenCalledWith("AgentPlane init");
    expect(mocks.textMock).not.toHaveBeenCalled();
    expect(mocks.outroMock).toHaveBeenCalledWith(
      `AgentPlane initialized in ${root}.\nNext: agentplane task create "Describe the outcome you want"`,
    );
    await expect(pathExists(path.join(root, ".agentplane", "WORKFLOW.md"))).resolves.toBe(true);
    await expect(pathExists(path.join(root, ".agentplane", "config.json"))).resolves.toBe(false);
    const migrated = JSON.parse(
      await readFile(path.join(process.env.AGENTPLANE_HOME ?? "", "recipes.json"), "utf8"),
    ) as { recipes: unknown[] };
    expect(migrated.recipes).toEqual([]);
  });

  it("surfaces hook conflicts before the default TTY dialog applies init", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".git", "hooks"), { recursive: true });
    await writeFile(path.join(root, ".git", "hooks", "commit-msg"), "custom", "utf8");
    mocks.selectMock
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("direct")
      .mockResolvedValueOnce("allow-other-task-readmes")
      .mockResolvedValueOnce("local")
      .mockResolvedValueOnce("standard")
      .mockResolvedValueOnce("cancel");
    mocks.confirmMock
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--advanced", "--hooks", "yes", "--root", root]);

      expect(code).toBe(2);
      expect(io.stderr).toContain("Init cancelled during conflict resolution.");
    } finally {
      io.restore();
    }

    expect(mocks.noteMock).toHaveBeenCalledWith(
      expect.stringContaining(".git/hooks/commit-msg"),
      "Init conflicts detected",
    );
    await expect(pathExists(path.join(root, ".agentplane", "WORKFLOW.md"))).resolves.toBe(false);
    await expect(pathExists(path.join(root, ".agentplane", "config.json"))).resolves.toBe(false);
  });

  it("cancels before writes when setup depth selection is aborted", async () => {
    const root = await mkTempDir();
    const cancelSymbol = Symbol("cancel");
    mocks.selectMock.mockResolvedValueOnce(cancelSymbol);
    mocks.isCancelMock.mockImplementation((value: unknown) => value === cancelSymbol);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--root", root]);

      expect(code).toBe(2);
      expect(io.stderr).toContain("Setup depth selection cancelled.");
    } finally {
      io.restore();
    }

    expect(mocks.cancelMock).toHaveBeenCalledWith("Setup depth selection cancelled.");
    await expect(pathExists(path.join(root, ".git"))).resolves.toBe(false);
    await expect(pathExists(path.join(root, ".agentplane"))).resolves.toBe(false);
  });

  it("rejects removed interactive init compatibility flags", async () => {
    const root = await mkTempDir();

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--experimental-ui", "--root", root]);

      expect(code).toBe(2);
      expect(io.stderr).toContain("Unknown option: --experimental-ui");
    } finally {
      io.restore();
    }
  });

  it("keeps unified non-interactive init for non-TTY and --yes", async () => {
    const root = await mkTempDir();
    setTty(false);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--root", root]);

      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    expect(mocks.introMock).not.toHaveBeenCalled();
    expect(mocks.confirmMock).not.toHaveBeenCalled();
  });

  it("treats explicit ci mode as non-interactive even in a TTY", async () => {
    const root = await mkTempDir();

    const io = captureStdIO();
    try {
      const code = await runCli([
        "init",
        "--init-mode",
        "ci",
        "--root",
        root,
        "--gitignore-agents",
      ]);

      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    expect(mocks.introMock).not.toHaveBeenCalled();
    expect(mocks.selectMock).not.toHaveBeenCalled();
    expect(mocks.confirmMock).not.toHaveBeenCalled();
  });

  it("keeps unified non-interactive init when plain prompt mode is requested for non-interactive init", async () => {
    const root = await mkTempDir();
    process.env.AGENTPLANE_PROMPTS = "plain";
    setTty(false);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--yes", "--root", root]);

      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    expect(mocks.introMock).not.toHaveBeenCalled();
    expect(mocks.confirmMock).not.toHaveBeenCalled();
  });
});
