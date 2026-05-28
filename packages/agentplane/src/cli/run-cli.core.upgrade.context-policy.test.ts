import { execFile } from "node:child_process";
import { readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  pathExists,
} from "@agentplane/testkit";
import { withContextPolicyGatewayText } from "../shared/policy-gateway.js";

const WORKFLOW_RUNTIME_ARTIFACTS_TIMEOUT_MS = os.platform() === "win32" ? 120_000 : 60_000;

installRunCliIntegrationHarness();

describe("runCli upgrade context policy", () => {
  it(
    "removes context policy references for workspaces without context layer",
    { timeout: WORKFLOW_RUNTIME_ARTIFACTS_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRoot();
      await configureGitUser(root);

      let io = captureStdIO();
      try {
        expect(await runCli(["init", "--yes", "--root", root])).toBe(0);
      } finally {
        io.restore();
      }

      const gatewayPath = path.join(root, "AGENTS.md");
      const gatewayText = await readFile(gatewayPath, "utf8");
      await writeFile(gatewayPath, withContextPolicyGatewayText(gatewayText), "utf8");
      await rm(path.join(root, ".agentplane", "policy", "context.must.md"), { force: true });
      await commitAll(root, "fixture: stale context gateway without context layer");

      io = captureStdIO();
      try {
        expect(await runCli(["upgrade", "--yes", "--root", root])).toBe(0);
      } finally {
        io.restore();
      }

      const upgradedGateway = await readFile(gatewayPath, "utf8");
      expect(upgradedGateway).not.toContain("@.agentplane/policy/context.must.md");
      await expect(
        pathExists(path.join(root, ".agentplane", "policy", "context.must.md")),
      ).resolves.toBe(false);
      await expectRoutingCheck(root);
    },
  );

  it(
    "installs context policy only for initialized context workspaces",
    { timeout: WORKFLOW_RUNTIME_ARTIFACTS_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRoot();
      await configureGitUser(root);

      let io = captureStdIO();
      try {
        expect(await runCli(["init", "--yes", "--root", root])).toBe(0);
        expect(await runCli(["context", "init", "--root", root])).toBe(0);
      } finally {
        io.restore();
      }

      const contextPolicyPath = path.join(root, ".agentplane", "policy", "context.must.md");
      await rm(contextPolicyPath, { force: true });
      await commitAll(root, "fixture: missing context policy in initialized context workspace");

      io = captureStdIO();
      try {
        expect(await runCli(["upgrade", "--yes", "--root", root])).toBe(0);
      } finally {
        io.restore();
      }

      const gatewayText = await readFile(path.join(root, "AGENTS.md"), "utf8");
      const contextPolicyText = await readFile(contextPolicyPath, "utf8");
      expect(gatewayText).toContain("@.agentplane/policy/context.must.md");
      expect(contextPolicyText).toContain("ap context search");
      expect(contextPolicyText).not.toContain("ap:fragment");
      await expectRoutingCheck(root);
    },
  );
});

async function expectRoutingCheck(root: string): Promise<void> {
  const execFileAsync = promisify(execFile);
  const { stdout } = await execFileAsync("node", [".agentplane/policy/check-routing.mjs"], {
    cwd: root,
    env: cleanGitEnv(),
  });
  expect(String(stdout ?? "")).toContain("policy routing OK");
}
