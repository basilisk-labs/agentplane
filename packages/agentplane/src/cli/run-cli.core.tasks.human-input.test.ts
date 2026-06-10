import { readTask } from "@agentplaneorg/core/tasks";
import { describe, expect, it } from "vitest";

import { captureStdIO, installRunCliIntegrationHarness, mkGitRepoRoot } from "@agentplane/testkit";

import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

type HumanInputTestExtensions = {
  "agentplane.human_input"?: {
    openQuestion?: { question?: string; previousStatus?: string } | null;
    history?: { answer?: string }[];
  };
};

describe("runCli task human input", { timeout: 300_000 }, () => {
  it("task ask and answer manage a task-scoped user-input blocker", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Needs user input",
          "--description",
          "Exercise human input blockers",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "code",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "ask",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Which endpoint should this use?",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("question-opened");
      } finally {
        io.restore();
      }
    }

    const blocked = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(blocked.frontmatter.status).toBe("BLOCKED");
    const blockedExtensions = blocked.frontmatter.extensions as
      | HumanInputTestExtensions
      | undefined;
    const blockerState = blockedExtensions?.["agentplane.human_input"];
    expect(blockerState?.openQuestion?.question).toBe("Which endpoint should this use?");
    expect(blockerState?.openQuestion?.previousStatus).toBe("TODO");

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "answer",
          taskId,
          "--by",
          "USER",
          "--body",
          "Use the existing internal API.",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("question-answered");
      } finally {
        io.restore();
      }
    }

    const answered = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(answered.frontmatter.status).toBe("TODO");
    const answeredExtensions = answered.frontmatter.extensions as
      | HumanInputTestExtensions
      | undefined;
    const answeredState = answeredExtensions?.["agentplane.human_input"];
    expect(answeredState?.openQuestion).toBeNull();
    expect(answeredState?.history?.at(-1)?.answer).toBe("Use the existing internal API.");
    expect(answered.frontmatter.comments?.at(-1)?.body).toContain("Use the existing internal API.");
  });
});
