import { readFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  mkGitRepoRoot,
  registerAgentplaneHome,
  silenceStdIO,
  writeDefaultConfig,
} from "@agentplane/testkit";

registerAgentplaneHome();

let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

async function createTask(root: string, title: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      title,
      "--description",
      `${title} description`,
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    return io.stdout.trim();
  } finally {
    io.restore();
  }
}

async function readTaskReadme(root: string, taskId: string): Promise<string> {
  return await readFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), "utf8");
}

describe("verify flag matrix", () => {
  it.each([
    {
      name: "plain ok verify",
      args: ["--ok", "--note", "Plain verification passed."],
      output: "state=ok",
      contains: ["VERIFY — ok", "Note: Plain verification passed."],
      notContains: ["finding=", "Observation:", "Promotion: incident-candidate"],
    },
    {
      name: "local-only structured finding",
      args: [
        "--ok",
        "--note",
        "Local-only verification passed.",
        "--observation",
        "One local follow-up remains.",
        "--impact",
        "Only this task needs the note.",
        "--resolution",
        "Keep it in Findings without incident promotion.",
        "--local-only",
      ],
      output: "finding=task-local",
      contains: [
        "Observation: One local follow-up remains.",
        "Impact: Only this task needs the note.",
        "Resolution: Keep it in Findings without incident promotion.",
      ],
      notContains: ["Promotion: incident-candidate", "Fixability: external"],
    },
    {
      name: "external incident candidate with metadata",
      args: [
        "--rework",
        "--note",
        "Needs external retry hardening.",
        "--observation",
        "Hosted API retries were manual.",
        "--impact",
        "Operators repeated the same recovery steps.",
        "--resolution",
        "Document and automate the retry path.",
        "--promote",
        "--external",
        "--incident-scope",
        "Hosted PR reconciliation",
        "--incident-tag",
        "github",
        "--incident-tag",
        "workflow",
        "--incident-match",
        "EOF",
        "--incident-advice",
        "Retry through REST polling before marking blocked.",
        "--incident-rule",
        "Apply this when hosted PR checks return transient EOF.",
      ],
      output: "finding=incident-candidate",
      contains: [
        "VERIFY — needs_rework",
        "Promotion: incident-candidate",
        "Fixability: external",
        "IncidentScope: Hosted PR reconciliation",
        "IncidentTags: github, workflow",
        "IncidentMatch: EOF",
        "IncidentAdvice: Retry through REST polling before marking blocked.",
        "IncidentRule: Apply this when hosted PR checks return transient EOF.",
      ],
      notContains: ["finding=task-local"],
    },
    {
      name: "repo-fixable incident candidate",
      args: [
        "--ok",
        "--note",
        "Repo-fixable behavior is covered.",
        "--observation",
        "A local CLI parser bug caused confusion.",
        "--impact",
        "Users retried with incompatible flags.",
        "--resolution",
        "Reject the incompatible flag pair.",
        "--repo-fixable",
      ],
      output: "finding=incident-candidate",
      contains: ["Promotion: incident-candidate", "Fixability: repo-fixable"],
      notContains: ["Fixability: external"],
    },
  ])("$name", async ({ args, contains, notContains, output }) => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = await createTask(root, `Verify matrix ${output}`);

    const io = captureStdIO();
    try {
      const code = await runCli(["verify", taskId, "--by", "REVIEWER", ...args, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(output);
    } finally {
      io.restore();
    }

    const readme = await readTaskReadme(root, taskId);
    for (const expected of contains) expect(readme).toContain(expected);
    for (const unexpected of notContains) {
      expect(`${output}\n${readme}`).not.toContain(unexpected);
    }
  });

  it.each([
    {
      label: "partial structured finding",
      args: [
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Partial finding should fail.",
        "--observation",
        "Only observation is present.",
      ],
      message:
        "Provide --observation, --impact, and --resolution together when appending a structured finding.",
    },
    {
      label: "incident tag without structured finding",
      args: [
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Metadata-only finding should fail.",
        "--incident-tag",
        "workflow",
      ],
      message:
        "Provide --observation, --impact, and --resolution together when appending a structured finding.",
    },
    {
      label: "local-only repo-fixable conflict",
      args: [
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Conflict should fail.",
        "--observation",
        "Conflicting finding flags.",
        "--impact",
        "Semantics would be ambiguous.",
        "--resolution",
        "Reject the conflicting flags.",
        "--local-only",
        "--repo-fixable",
      ],
      message: "--local-only cannot be combined with --promote, --external, or --repo-fixable.",
    },
  ])("rejects $label", async ({ args, message }) => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = await createTask(root, "Verify invalid matrix");

    const io = captureStdIO();
    try {
      const code = await runCli(["verify", taskId, ...args, "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain(message);
    } finally {
      io.restore();
    }
  });
});
