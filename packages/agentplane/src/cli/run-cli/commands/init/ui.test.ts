import { afterEach, describe, expect, it, vi } from "vitest";

import { renderInitWelcome } from "./ui.js";

function stripAnsi(text: string): string {
  let out = "";
  for (let i = 0; i < text.length; i += 1) {
    const ch = text.codePointAt(i);
    if (ch === 27 && text[i + 1] === "[") {
      i += 2;
      while (i < text.length && text[i] !== "m") i += 1;
      continue;
    }
    out += text[i] ?? "";
  }
  return out;
}

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
    const top = lines.find((line) => stripAnsi(line).startsWith("┌"));
    const bottom = lines.find((line) => stripAnsi(line).startsWith("└"));
    const body = lines.filter((line) => stripAnsi(line).startsWith("│ "));

    expect(top).toBeDefined();
    expect(bottom).toBeDefined();
    expect(body.length).toBeGreaterThan(0);

    const topLen = stripAnsi(top ?? "").length;
    const bottomLen = stripAnsi(bottom ?? "").length;
    expect(topLen).toBe(bottomLen);
    for (const line of body) {
      expect(stripAnsi(line).length).toBe(topLen);
    }
  });
});
