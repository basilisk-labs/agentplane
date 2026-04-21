import { readFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkTempDir,
  pathExists,
} from "../testing/index.js";

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

installRunCliIntegrationHarness();

describe("runCli init v2", () => {
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

  it("runs the experimental preview, confirm, and apply path behind --experimental-ui", async () => {
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

  it("routes to init v2 from AGENTPLANE_INIT_UI=v2", async () => {
    const root = await mkTempDir();
    process.env.AGENTPLANE_INIT_UI = "v2";
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
