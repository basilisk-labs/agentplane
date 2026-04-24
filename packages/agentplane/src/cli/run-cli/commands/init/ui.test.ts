import { describe, expect, it, vi } from "vitest";

import {
  introLogo,
  outroError,
  outroSuccess,
  previewInstall,
  renderInitPreview,
  section,
} from "./ui.js";

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

describe("init ui", () => {
  it("renders aligned preview rows with deterministic value labels", () => {
    expect(
      renderInitPreview([
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

  it("emits success and error outros", () => {
    const clack = clackMock();

    outroSuccess(clack, "/repo");
    outroError(clack, new Error("failed to write config"));

    expect(clack.outro).toHaveBeenCalledWith("AgentPlane initialized in /repo.");
    expect(clack.log.error).toHaveBeenCalledWith("failed to write config");
    expect(clack.outro).toHaveBeenCalledWith("AgentPlane init did not complete.");
  });
});
