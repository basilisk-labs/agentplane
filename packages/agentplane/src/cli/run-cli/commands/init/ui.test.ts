import { afterEach, describe, expect, it, vi } from "vitest";

import { stripAnsi } from "../../../shared/ansi.js";
import { renderInitSection, renderInitWelcome } from "./ui.js";

const originalIsTty = Object.getOwnPropertyDescriptor(process.stdout, "isTTY");

function setTty(enabled: boolean): void {
  Object.defineProperty(process.stdout, "isTTY", {
    value: enabled,
    configurable: true,
  });
}

describe("init ui", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.TERM;
    if (originalIsTty) {
      Object.defineProperty(process.stdout, "isTTY", originalIsTty);
    } else {
      delete (process.stdout as { isTTY?: boolean }).isTTY;
    }
  });

  it("keeps box alignment when ANSI colors are enabled", () => {
    setTty(true);
    process.env.TERM = "xterm-256color";

    const rendered = renderInitWelcome();
    const lines = rendered.trimEnd().split("\n");
    const header = lines.find((line) => stripAnsi(line).startsWith("◇  Interactive Setup "));
    const footer = lines.find((line) => stripAnsi(line).startsWith("├"));
    const body = lines.filter((line) => stripAnsi(line).startsWith("│  "));

    expect(header).toBeDefined();
    expect(footer).toBeDefined();
    expect(body.length).toBeGreaterThan(0);

    const headerLen = stripAnsi(header ?? "").length;
    const footerLen = stripAnsi(footer ?? "").length;
    expect(headerLen).toBe(footerLen);
    for (const line of body) {
      expect(stripAnsi(line).length).toBe(headerLen);
    }
  });

  it("renders init sections with the same themed rail styling", () => {
    setTty(true);
    process.env.TERM = "xterm-256color";

    const rendered = renderInitSection("Setup Profile", "Pick one of three setup profiles.");
    const lines = rendered.trimEnd().split("\n");

    expect(stripAnsi(lines[0] ?? "")).toMatch(/^◇ {2}Setup Profile ─+$/);
    expect(stripAnsi(lines[1] ?? "")).toBe("│  Pick one of three setup profiles.");
    expect(stripAnsi(lines[2] ?? "")).toBe("│");
  });
});
