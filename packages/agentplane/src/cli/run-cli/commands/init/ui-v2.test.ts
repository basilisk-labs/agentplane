import { describe, expect, it, vi } from "vitest";

import {
  introLogo,
  outroError,
  outroSuccess,
  previewConflicts,
  previewInstall,
  renderInitV2ConflictPreview,
  renderInitV2Preview,
  section,
} from "./ui-v2.js";

function clackMock() {
  return {
    log: {
      step: vi.fn(),
      error: vi.fn(),
    },
    note: vi.fn(),
    outro: vi.fn(),
  };
}

describe("init ui v2", () => {
  it("renders aligned preview rows with deterministic value labels", () => {
    expect(
      renderInitV2Preview([
        { label: "workflow", value: "direct" },
        { label: "hooks", value: true },
        { label: "recipes", value: "" },
      ]),
    ).toBe(["workflow  direct", "hooks     yes", "recipes   (none)"].join("\n"));
  });

  it("emits a Clack section and optional note", () => {
    const clack = clackMock();

    section(clack, "Setup Profile", "Pick a profile.");

    expect(clack.log.step).toHaveBeenCalledWith("Setup Profile");
    expect(clack.note).toHaveBeenCalledWith("Pick a profile.");
  });

  it("emits the ASCII logo through a Clack note", () => {
    const clack = clackMock();

    introLogo(clack);

    expect(clack.note).toHaveBeenCalledWith(expect.stringContaining("░█▀█░█▀▀░█▀▀"));
    expect(clack.note).toHaveBeenCalledWith(expect.stringContaining("agent/plane"));
  });

  it("emits preview output through Clack note", () => {
    const clack = clackMock();

    previewInstall(clack, [
      { label: "backend", value: "local" },
      { label: "network approval", value: false },
    ]);

    expect(clack.note).toHaveBeenCalledWith(
      ["backend           local", "network approval  no"].join("\n"),
      "Install preview",
    );
  });

  it("renders and previews conflicts as relative paths", () => {
    const clack = clackMock();
    const conflicts = [
      "/repo/.agentplane/config.json",
      "/repo/.agentplane/backends/local/backend.json",
    ];

    expect(renderInitV2ConflictPreview("/repo", conflicts)).toBe(
      ["- .agentplane/config.json", "- .agentplane/backends/local/backend.json"].join("\n"),
    );

    previewConflicts(clack, { gitRoot: "/repo", conflicts });

    expect(clack.note).toHaveBeenCalledWith(
      ["- .agentplane/config.json", "- .agentplane/backends/local/backend.json"].join("\n"),
      "Init conflicts detected",
    );
  });

  it("emits success and error outros", () => {
    const clack = clackMock();

    outroSuccess(clack, "/repo");
    outroError(clack, new Error("failed to write config"));

    expect(clack.outro).toHaveBeenCalledWith("AgentPlane initialized in /repo.");
    expect(clack.log.error).toHaveBeenCalledWith("failed to write config");
    expect(clack.outro).toHaveBeenCalledWith("AgentPlane init did not complete.");
  });
});
