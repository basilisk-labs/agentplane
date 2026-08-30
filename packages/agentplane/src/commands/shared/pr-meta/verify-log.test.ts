import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it, vi } from "vitest";

import { runShellCommand, verificationChildEnv } from "./verify-log.js";

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

    const { PATH: runtimePath, ...clean } = verificationChildEnv(source);
    expect(clean).toEqual({ SAFE_PARENT_VALUE: "preserved" });
    expect(runtimePath).toBeTruthy();
    expect(source).toHaveProperty("AGENTPLANE_CLOUD_ENDPOINT");
    expect(source).toHaveProperty("AGENTPLANE_DOTENV_LOADED_KEYS");
  });

  it("preserves explicit parent configuration that was not loaded from dotenv", () => {
    const source: NodeJS.ProcessEnv = {
      AGENTPLANE_CLOUD_ENDPOINT: "https://explicit-parent.example",
      GITHUB_TOKEN: "explicit-parent-token",
    };

    const { PATH: runtimePath, ...clean } = verificationChildEnv(source);
    expect(clean).toEqual(source);
    expect(runtimePath).toBeTruthy();
    expect(source).not.toHaveProperty("PATH");
  });

  it("isolates dotenv values in the declared verification subprocess", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-verify-env-"));
    vi.stubEnv("AGENTPLANE_VERIFY_TEST_DOTENV", "repository-only");
    vi.stubEnv("AGENTPLANE_VERIFY_TEST_PARENT", "explicit-parent");
    vi.stubEnv("AGENTPLANE_RUNTIME_HANDOFF_FROM", "verification-parent");
    vi.stubEnv(
      "AGENTPLANE_DOTENV_LOADED_KEYS",
      `${process.env.AGENTPLANE_DOTENV_LOADED_KEYS ?? ""},AGENTPLANE_VERIFY_TEST_DOTENV`,
    );
    try {
      await writeFile(
        path.join(root, "probe.cjs"),
        "process.stdout.write(JSON.stringify({dotenv:process.env.AGENTPLANE_VERIFY_TEST_DOTENV,parent:process.env.AGENTPLANE_VERIFY_TEST_PARENT,dotenvMarker:process.env.AGENTPLANE_DOTENV_LOADED_KEYS,handoff:process.env.AGENTPLANE_RUNTIME_HANDOFF_FROM}));",
      );
      const result = await runShellCommand("node probe.cjs", root);
      expect(result.code).toBe(0);
      expect(JSON.parse(result.output)).toEqual({ parent: "explicit-parent" });
      expect(process.env.AGENTPLANE_VERIFY_TEST_DOTENV).toBe("repository-only");
      expect(process.env.AGENTPLANE_RUNTIME_HANDOFF_FROM).toBe("verification-parent");
    } finally {
      vi.unstubAllEnvs();
      await rm(root, { recursive: true, force: true });
    }
  });
});
