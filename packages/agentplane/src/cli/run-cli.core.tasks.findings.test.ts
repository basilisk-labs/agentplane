import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { parseTaskReadme } from "@agentplaneorg/core/tasks";

import { createIncidentRegistrySkeleton } from "../runtime/incidents/index.js";
import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

describe("runCli task findings", () => {
  it("task findings add appends a task-local Findings block by default", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Append structured finding",
          "--description",
          "Need an ergonomic findings append path",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "workflow",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "findings",
        "add",
        taskId,
        "--observation",
        "GitHub transport retries were manual.",
        "--impact",
        "Operators repeated the same recovery loop.",
        "--resolution",
        "Use the new append command instead of editing the whole README.",
        "--updated-by",
        "CODER",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(path.join(root, ".agentplane", "tasks", taskId, "README.md"));
      expect(io.stderr).toContain("task findings add outcome=entry-appended section=Findings");
      expect(io.stderr).toContain(
        `task-local finding recorded for ${taskId}; incidents.md unchanged in the current checkout`,
      );
    } finally {
      io.restore();
    }

    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain("## Findings");
    expect(readme).toContain("- Observation: GitHub transport retries were manual.");
    expect(readme).toContain("  Impact: Operators repeated the same recovery loop.");
    expect(readme).toContain(
      "  Resolution: Use the new append command instead of editing the whole README.",
    );
    expect(readme).not.toContain("  Promotion: incident-candidate");
    expect(readme).not.toContain("  Fixability: external");
    expect(readme).toContain('doc_updated_by: "CODER"');
    expect(parseTaskReadme(readme).frontmatter.sections.Findings).toContain(
      "- Observation: GitHub transport retries were manual.",
    );
  });

  it("task findings add writes promotable metadata with explicit promotion flags", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Promote reusable incident",
          "--description",
          "Need structured findings metadata",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "workflow",
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
          "findings",
          "add",
          taskId,
          "--observation",
          "GraphQL close paths returned EOF.",
          "--impact",
          "Task cleanup required repeated operator retries.",
          "--resolution",
          "Switch close flows to REST-backed helpers.",
          "--promote",
          "--external",
          "--incident-scope",
          "GitHub PR cleanup",
          "--incident-tag",
          "github",
          "--incident-tag",
          "workflow",
          "--incident-match",
          "close",
          "--incident-match",
          "github",
          "--incident-advice",
          "Use REST-backed helpers when GraphQL is flaky.",
          "--incident-rule",
          "Cleanup flows MUST prefer REST-backed PR close helpers when GraphQL is flaky.",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "incidents",
        "collect",
        taskId,
        "--check",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        promotable: {
          fixability: string | null;
          state: string;
          advice: string | null;
          scope: string;
          tags: string[];
        }[];
      };
      expect(payload.promotable).toHaveLength(1);
      expect(payload.promotable[0]?.fixability).toBe("external");
      expect(payload.promotable[0]?.state).toBe("open");
      expect(payload.promotable[0]?.advice).toContain("REST-backed helpers");
      expect(payload.promotable[0]?.scope).toBe("GitHub PR cleanup");
      expect(payload.promotable[0]?.tags).toEqual(expect.arrayContaining(["github", "workflow"]));
    } finally {
      io.restore();
    }
  });

  it("task findings add supports --local-only for task-local observations that should not promote", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Keep observation local",
          "--description",
          "Need task-local findings without incidents promotion",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "workflow",
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
          "findings",
          "add",
          taskId,
          "--observation",
          "One follow-up remains local to this task.",
          "--impact",
          "No reusable incident policy should be created.",
          "--resolution",
          "Keep it in the task README only.",
          "--local-only",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stderr).toContain(
          `task-local finding recorded for ${taskId}; incidents.md unchanged`,
        );
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "incidents",
        "collect",
        taskId,
        "--check",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        promotable: unknown[];
        skipped: { reason: string }[];
      };
      expect(payload.promotable).toHaveLength(0);
      expect(payload.skipped).toHaveLength(1);
      expect(payload.skipped[0]?.reason).toBe("not_marked_external_or_promotable");
    } finally {
      io.restore();
    }
  });
});
