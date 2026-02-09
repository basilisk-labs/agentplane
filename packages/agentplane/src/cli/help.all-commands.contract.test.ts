import { describe, expect, it } from "vitest";

import { COMMANDS } from "./run-cli/command-catalog.js";
import { captureStdIO, registerAgentplaneHome } from "./run-cli.test-helpers.js";
import { runCli } from "./run-cli.js";
import { renderUsageLines } from "./spec/help-render.js";

registerAgentplaneHome();

function hasPlaceholder(text: string): boolean {
  const needles = ["undefined", "null", "<undefined>", "<null>"];
  return needles.some((n) => text.includes(n));
}

describe("help output contract (all commands)", () => {
  it("renders compact help for every registered command", async () => {
    for (const entry of COMMANDS) {
      const io = captureStdIO();
      try {
        const code = await runCli(["help", ...entry.spec.id, "--compact"]);
        expect(code).toBe(0);

        const out = io.stdout;
        expect(out).toContain("Usage:");
        expect(out).toContain(`agentplane ${entry.spec.id.join(" ")}`);
        expect(hasPlaceholder(out)).toBe(false);
      } finally {
        io.restore();
      }
    }
  });

  it("includes required string options in usage lines", () => {
    for (const entry of COMMANDS) {
      const required = (entry.spec.options ?? []).filter(
        (o) => o.kind === "string" && o.required === true && !o.hidden,
      );
      if (required.length === 0) continue;

      const usage = renderUsageLines(entry.spec).join("\n");
      for (const opt of required) {
        // Required options are rendered as `--name <hint>` in usage.
        expect(usage).toContain(`--${opt.name}`);
      }
    }
  });
});
