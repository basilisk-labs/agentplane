import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import { captureStdIO } from "./run-cli.test-helpers.js";

const GROUP_USAGE_CASES = [
  {
    label: "workflow",
    args: ["workflow"],
    message: "Missing workflow subcommand.",
    help: "agentplane help workflow --compact",
  },
  {
    label: "runtime",
    args: ["runtime"],
    message: "Missing subcommand.",
    help: "agentplane help runtime --compact",
  },
  {
    label: "release",
    args: ["release"],
    message: "Missing subcommand.",
    help: "agentplane help release --compact",
  },
  {
    label: "backend",
    args: ["backend"],
    message: "Missing subcommand.",
    help: "agentplane help backend --compact",
  },
  {
    label: "branch base",
    args: ["branch", "base"],
    message: "Missing subcommand.",
    help: "agentplane help branch base --compact",
  },
  {
    label: "cleanup",
    args: ["cleanup"],
    message: "Missing subcommand.",
    help: "agentplane help cleanup --compact",
  },
  {
    label: "codex",
    args: ["codex"],
    message: "Missing Codex subcommand.",
    help: "agentplane help codex --compact",
  },
  {
    label: "codex plugin",
    args: ["codex", "plugin"],
    message: "Missing Codex plugin subcommand.",
    help: "agentplane help codex plugin --compact",
  },
  {
    label: "task verify",
    args: ["task", "verify"],
    message: "Missing subcommand.",
    help: "agentplane help task verify --compact",
  },
  {
    label: "task handoff",
    args: ["task", "handoff"],
    message: "Missing subcommand.",
    help: "agentplane help task handoff --compact",
  },
] as const;

describe("runCli group root usage", () => {
  for (const entry of GROUP_USAGE_CASES) {
    it(`renders derived usage help for ${entry.label}`, async () => {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.message);
        expect(io.stderr).toContain(entry.help);
        expect(io.stderr).not.toContain(`Unknown command: ${entry.args.join(" ")}`);
      } finally {
        io.restore();
      }
    });
  }
});
