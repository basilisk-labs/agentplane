import { afterEach, describe, expect, it } from "vitest";

import { resolveAgentModeArgv } from "./agent-mode.js";

const envSnapshot = { ...process.env };

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in envSnapshot)) delete process.env[key];
  }
  for (const [key, value] of Object.entries(envSnapshot)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe("agent-mode argv resolution", () => {
  it("preserves explicit equals-form options when expanding next shorthand", () => {
    process.env.AGENTPLANE_CLI_ALIAS = "ap";

    expect(resolveAgentModeArgv(["next", "--limit=3"]).argv).toEqual([
      "task",
      "next",
      "--limit=3",
      "--quiet",
    ]);
  });
});
