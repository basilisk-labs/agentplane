import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { parseTaskReadme } from "@agentplaneorg/core/tasks";
import {
  captureStdIO,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
} from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

type AgentPacket = {
  task_id: string;
  action: { kind: string };
  authority?: { role?: string };
  operator_action?: {
    kind?: string;
    host_user_decision?: {
      request?: { task_id?: string; plan_digest?: string; decision?: string };
    };
  };
};

async function runCommand(root: string, argv: readonly string[]): Promise<string> {
  const io = captureStdIO();
  try {
    expect(await runCli([...argv, "--root", root]), io.stderr).toBe(0);
    return io.stdout;
  } finally {
    io.restore();
  }
}

async function runJson(root: string, argv: readonly string[]): Promise<AgentPacket> {
  return JSON.parse(await runCommand(root, argv)) as AgentPacket;
}

describe("maximum-assimilation task-centric compatibility", { timeout: 180_000 }, () => {
  it("preserves the context contract while entering the task-centric planning route", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    await runCommand(root, [
      "init",
      "--workflow",
      "direct",
      "--require-network-approval",
      "true",
      "--yes",
    ]);
    await runCommand(root, ["context", "init", "--profile", "maximum-assimilation"]);

    const sourcePath = path.join(root, "context", "raw", "compatibility.md");
    await mkdir(path.dirname(sourcePath), { recursive: true });
    await writeFile(
      sourcePath,
      "# Compatibility source\n\nMaximum assimilation must retain this source with line-addressed provenance.\n",
      "utf8",
    );

    const ingestOutput = await runCommand(root, ["context", "ingest", "--changed"]);
    const taskId = /context ingestion task created: ([A-Z0-9-]+)/u.exec(ingestOutput)?.[1];
    expect(taskId, ingestOutput).toBeTruthy();
    if (!taskId) throw new Error("Context ingest did not report the created Task ID.");

    const taskRoot = path.join(root, ".agentplane", "tasks", taskId);
    const taskDocument = parseTaskReadme(await readFile(path.join(taskRoot, "README.md"), "utf8"));
    const extensions = taskDocument.frontmatter.extensions as Record<string, unknown>;
    const context = extensions["agentplane.context"] as {
      mode?: string;
      blueprint?: { id?: string };
      prompt_modules?: Array<{ address?: { value?: string }; content?: string }>;
      allowed_outputs?: string[];
    };

    expect(taskDocument.frontmatter.blueprint_request).toBe("context.maximum_assimilation");
    expect(context).toMatchObject({
      mode: "maximum_assimilation",
      blueprint: { id: "context.maximum_assimilation" },
    });
    expect(context.prompt_modules?.[0]).toMatchObject({
      address: { value: "framework/template/generated.artifact/context_assimilation/v2" },
    });
    expect(context.prompt_modules?.[0]?.content).toContain("source-shaped topology decision");
    expect(context.allowed_outputs).toEqual(
      expect.arrayContaining([
        ".agentplane/tasks/${taskId}/semantic-results/**",
        ".agentplane/tasks/${taskId}/context-rework/**",
      ]),
    );
    for (const artifact of [
      "task-creation.json",
      "context-pack.md",
      "source-set.lock.json",
      "source-spans.skeleton.jsonl",
      "canonical-snapshot.json",
      "canonical-entity-catalog.json",
      "canonical-reconciliation-candidates.json",
      "extraction-contract.json",
      "expected-artifacts.json",
    ]) {
      await expect(readFile(path.join(taskRoot, artifact), "utf8"), artifact).resolves.not.toBe("");
    }

    const planning = await runJson(root, ["task", "advance", taskId, "--agent-json"]);
    expect(planning).toMatchObject({
      task_id: taskId,
      action: { kind: "approval_required" },
      operator_action: {
        kind: "approve_plan",
        host_user_decision: {
          request: {
            task_id: taskId,
            plan_digest: expect.stringMatching(/^sha256:[0-9a-f]{64}$/u),
            decision: "approved",
          },
        },
      },
    });
  });
});
