import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
const originalInitUi = process.env.AGENTPLANE_INIT_UI;
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
  if (originalInitUi === undefined) {
    delete process.env.AGENTPLANE_INIT_UI;
  } else {
    process.env.AGENTPLANE_INIT_UI = originalInitUi;
  }
  if (originalPromptMode === undefined) {
    delete process.env.AGENTPLANE_PROMPTS;
  } else {
    process.env.AGENTPLANE_PROMPTS = originalPromptMode;
  }
}

function resetClackMocks(): void {
  mocks.cancelMock.mockReset();
  mocks.confirmMock.mockReset();
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
    delete process.env.AGENTPLANE_INIT_UI;
    delete process.env.AGENTPLANE_PROMPTS;
    resetClackMocks();
  });

  afterEach(() => {
    restoreTty();
    restoreEnv();
  });

  it("runs the preview, confirm, and apply path behind --interactive-ui", async () => {
    const root = await mkTempDir();
    mocks.selectMock
      .mockResolvedValueOnce("light")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("local");
    mocks.confirmMock.mockResolvedValueOnce(true);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--interactive-ui", "--root", root]);

      expect(code).toBe(0);
      expect(io.stdout).toContain(".agentplane");
    } finally {
      io.restore();
    }

    expect(mocks.introMock).toHaveBeenCalledWith("AgentPlane init");
    expect(mocks.noteMock).toHaveBeenCalledWith(expect.any(String), "Install preview");
    expect(mocks.confirmMock).toHaveBeenCalledWith({
      message: "Apply this init plan?",
      initialValue: true,
    });
    expect(mocks.spinnerStartMock).toHaveBeenCalledWith("Writing init config");
    expect(mocks.spinnerStopMock).toHaveBeenCalledWith("Created install commit");
    expect(mocks.outroMock).toHaveBeenCalledWith(`AgentPlane initialized in ${root}.`);

    const configText = await readFile(path.join(root, ".agentplane", "config.json"), "utf8");
    expect(configText).toContain('"workflow_mode": "direct"');
    expect(configText).toContain(
      '"config_path": "'.concat(".agentplane/backends/local/backend.json", '"'),
    );
    await expect(pathExists(path.join(root, "AGENTS.md"))).resolves.toBe(true);
    await expect(pathExists(path.join(root, ".agentplane", "WORKFLOW.md"))).resolves.toBe(true);
  });

  it("routes to interactive init UI from AGENTPLANE_INIT_UI=interactive", async () => {
    const root = await mkTempDir();
    process.env.AGENTPLANE_INIT_UI = "interactive";
    mocks.selectMock
      .mockResolvedValueOnce("light")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("local");
    mocks.confirmMock.mockResolvedValueOnce(true);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "init",
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
    await expect(pathExists(path.join(root, ".agentplane", "config.json"))).resolves.toBe(true);
  });

  it("uses init v2 for the default TTY interactive route", async () => {
    const root = await mkTempDir();
    mocks.selectMock
      .mockResolvedValueOnce("light")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("local");
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
      .mockResolvedValueOnce("full-harness")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("direct")
      .mockResolvedValueOnce("allow_other_task_readmes")
      .mockResolvedValueOnce("local")
      .mockResolvedValueOnce("aggressive");
    mocks.confirmMock
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    mocks.textMock.mockResolvedValueOnce("none");

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--root", root]);

      expect(code).toBe(0);
      expect(io.stdout).toContain(".agentplane");
    } finally {
      io.restore();
    }

    expect(mocks.introMock).toHaveBeenCalledWith("AgentPlane init");
    expect(mocks.noteMock).toHaveBeenCalledWith(expect.stringContaining("agent/plane"));
    expect(mocks.logStepMock).toHaveBeenCalledWith("Setup");
    expect(mocks.selectMock).toHaveBeenCalledTimes(7);
    expect(mocks.textMock).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Materialize cached recipes" }),
    );
    expect(mocks.confirmMock).toHaveBeenCalledWith({
      message: "Apply this init plan?",
      initialValue: true,
    });
    expect(mocks.outroMock).toHaveBeenCalledWith(`AgentPlane initialized in ${root}.`);
    await expect(pathExists(path.join(root, ".agentplane", "config.json"))).resolves.toBe(true);
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
      .mockResolvedValueOnce("full-harness")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("direct")
      .mockResolvedValueOnce("allow_other_task_readmes")
      .mockResolvedValueOnce("local")
      .mockResolvedValueOnce("aggressive");
    mocks.confirmMock
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    mocks.textMock.mockImplementationOnce(async (opts?: { validate?: (value: string) => string | void }) => {
      expect(() => opts?.validate?.(undefined as never)).not.toThrow();
      return "none";
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--root", root]);

      expect(code).toBe(0);
      expect(io.stderr).not.toContain("Cannot read properties of undefined");
    } finally {
      io.restore();
    }

    expect(mocks.outroMock).toHaveBeenCalledWith(`AgentPlane initialized in ${root}.`);
    await expect(pathExists(path.join(root, ".agentplane", "config.json"))).resolves.toBe(true);
  });

  it("completes the default TTY dialog when cached manifests without prompts or scenarios are pruned", async () => {
    const root = await mkTempDir();
    await writeInvalidRecipeCacheWithoutPromptSurfaces();
    mocks.selectMock
      .mockResolvedValueOnce("full-harness")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("direct")
      .mockResolvedValueOnce("allow_other_task_readmes")
      .mockResolvedValueOnce("local")
      .mockResolvedValueOnce("aggressive");
    mocks.confirmMock
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--root", root]);

      expect(code).toBe(0);
      expect(io.stderr).not.toContain("Invalid field manifest: expected prompts or scenarios");
    } finally {
      io.restore();
    }

    expect(mocks.introMock).toHaveBeenCalledWith("AgentPlane init");
    expect(mocks.textMock).not.toHaveBeenCalled();
    expect(mocks.outroMock).toHaveBeenCalledWith(`AgentPlane initialized in ${root}.`);
    await expect(pathExists(path.join(root, ".agentplane", "config.json"))).resolves.toBe(true);
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
      .mockResolvedValueOnce("full-harness")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("direct")
      .mockResolvedValueOnce("allow_other_task_readmes")
      .mockResolvedValueOnce("local")
      .mockResolvedValueOnce("aggressive")
      .mockResolvedValueOnce("cancel");
    mocks.confirmMock.mockResolvedValueOnce(false).mockResolvedValueOnce(false);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--interactive-ui", "--hooks", "yes", "--root", root]);

      expect(code).toBe(2);
      expect(io.stderr).toContain("Init cancelled during conflict resolution.");
    } finally {
      io.restore();
    }

    expect(mocks.noteMock).toHaveBeenCalledWith(
      expect.stringContaining(".git/hooks/commit-msg"),
      "Init conflicts detected",
    );
    await expect(pathExists(path.join(root, ".agentplane", "config.json"))).resolves.toBe(false);
  });

  it("keeps --experimental-ui as a compatibility alias", async () => {
    const root = await mkTempDir();
    mocks.selectMock
      .mockResolvedValueOnce("light")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("codex")
      .mockResolvedValueOnce("local");
    mocks.confirmMock.mockResolvedValueOnce(true);

    const io = captureStdIO();
    try {
      const code = await runCli(["init", "--experimental-ui", "--root", root]);

      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    expect(mocks.introMock).toHaveBeenCalledWith("AgentPlane init");
  });

  it("keeps legacy init for non-TTY and --yes", async () => {
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

  it("keeps legacy init when plain prompt mode is requested for non-interactive init", async () => {
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
