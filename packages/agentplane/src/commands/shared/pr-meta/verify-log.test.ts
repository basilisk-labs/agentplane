import { describe, expect, it } from "vitest";

import { verificationChildEnv } from "./verify-log.js";

describe("verification child environment", () => {
  it("removes repository dotenv values and AgentPlane runtime handoff state", () => {
    const source: NodeJS.ProcessEnv = {
      SAFE_PARENT_VALUE: "preserved",
      AGENTPLANE_CLOUD_ENDPOINT: "https://cloud.example",
      AGENTPLANE_CLOUD_PROJECT_ID: "project-1",
      GITHUB_TOKEN: "dotenv-token",
      AGENTPLANE_DOTENV_LOADED_KEYS:
        "AGENTPLANE_CLOUD_ENDPOINT, AGENTPLANE_CLOUD_PROJECT_ID,GITHUB_TOKEN",
      AGENTPLANE_AGENT_MODE: "1",
      AGENTPLANE_RUNTIME_ACTIVE_BIN: "/repo/packages/agentplane/bin/agentplane.js",
    };

    expect(verificationChildEnv(source)).toEqual({ SAFE_PARENT_VALUE: "preserved" });
    expect(source).toHaveProperty("AGENTPLANE_CLOUD_ENDPOINT");
    expect(source).toHaveProperty("AGENTPLANE_DOTENV_LOADED_KEYS");
  });

  it("preserves explicit parent configuration that was not loaded from dotenv", () => {
    const source: NodeJS.ProcessEnv = {
      AGENTPLANE_CLOUD_ENDPOINT: "https://explicit-parent.example",
      GITHUB_TOKEN: "explicit-parent-token",
    };

    expect(verificationChildEnv(source)).toEqual(source);
  });
});
