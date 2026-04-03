import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core";

import { createIncidentRegistrySkeleton } from "../runtime/incidents/index.js";
import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeConfig,
} from "./run-cli.test-helpers.js";

installRunCliIntegrationHarness();

describe("runCli incidents", () => {
  it("incidents collect validates structured external candidates and emits json", async () => {
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
          "Capture external registry advice",
          "--description",
          "Prepare incident-candidate data",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "release",
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
          "doc",
          "set",
          taskId,
          "--section",
          "Findings",
          "--text",
          [
            "- Observation: external release recovery instructions drifted outside the repository fix.",
            "  Impact: operators repeated the same manual recovery mistakes.",
            "  Resolution: keep one reusable recovery note in the incident registry.",
            "  Fixability: external",
          ].join("\n"),
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
        task_id: string;
        checked_only: boolean;
        promotable: { fixability: string | null; state: string; advice: string | null }[];
      };
      expect(payload.task_id).toBe(taskId);
      expect(payload.checked_only).toBe(true);
      expect(payload.promotable).toHaveLength(1);
      expect(payload.promotable[0].fixability).toBe("external");
      expect(payload.promotable[0].state).toBe("open");
      expect(payload.promotable[0].advice).toContain("reusable recovery note");
    } finally {
      io.restore();
    }
  });

  it("incidents advise resolves matches for ad hoc scope and tags", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      [
        createIncidentRegistrySkeleton().trimEnd(),
        "",
        "- id: INC-20260403-01",
        "  date: 2026-04-03",
        "  scope: release recovery manual steps",
        "  tags: release, operations",
        "  match: release, recovery, manual",
        "  failure: operators repeated the same manual recovery mistakes",
        "  advice: review the recorded release recovery steps before rerunning manual remediation",
        "  rule: Release recovery MUST review the recorded manual recovery steps before rerunning remediation.",
        "  evidence: task 202604031416-HEJWTM",
        "  enforcement: manual",
        "  source_task: 202604031416-HEJWTM",
        "  fixability: external",
        "  state: open",
        "",
      ].join("\n"),
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli([
        "incidents",
        "advise",
        "--scope",
        "manual release recovery is failing again",
        "--tag",
        "release",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        matches: { entry: { id: string } }[];
      };
      expect(payload.matches).toHaveLength(1);
      expect(payload.matches[0].entry.id).toBe("INC-20260403-01");
    } finally {
      io.restore();
    }

    const incidentsFile = await readFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      "utf8",
    );
    expect(incidentsFile).toContain("INC-20260403-01");
  });
});
