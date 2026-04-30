import { mkdir, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import { createIncidentRegistrySkeleton } from "../runtime/incidents/index.js";
import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();
const INCIDENTS_CLI_TIMEOUT_MS = 120_000;

const compactRegistryHeader = [
  "# Policy Incidents Log",
  "- Append-only. Required fields: `id`, `date`, `scope`, `failure`, `rule`, `evidence`, `enforcement`, `state`; optional: `tags`, `match`, `advice`, `source_task`, `fixability`.",
].join("\n");

function makeCompactOpenEntry(index: number): string {
  const seq = String(index).padStart(2, "0");
  return `- id: INC-20260407-${seq} | date: 2026-04-07 | scope: incident budget entry ${index} | tags: workflow, incidents, budget | match: incidents, budget, entry-${index} | failure: incident budget entry ${index} consumed registry space | advice: compact incident budget entry ${index} before promoting more incidents | rule: Incident budget entry ${index} MUST stay compact enough for the policy budget. | evidence: task TASK-${index} | enforcement: manual | fixability: external | state: open`;
}

describe("runCli incidents", { timeout: INCIDENTS_CLI_TIMEOUT_MS }, () => {
  it("incidents collect validates structured external candidates and emits json", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
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

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "verify",
          taskId,
          "--ok",
          "--by",
          "CODER",
          "--note",
          "Verified: finish-time incident promotion path is ready for closeout.",
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

  it("verify can append promotable findings and local-only findings stay skipped in incidents collect", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );

    let promotableTaskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Verify appends promotable finding",
          "--description",
          "Exercise verify to incidents collect flow",
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
        promotableTaskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "verify",
          promotableTaskId,
          "--ok",
          "--by",
          "REVIEWER",
          "--note",
          "Looks good",
          "--observation",
          "Manual recovery was still required.",
          "--impact",
          "Operators had to remember a second command to preserve findings.",
          "--resolution",
          "Append incident-ready findings during verify.",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("finding=incident-candidate");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "incidents",
          "collect",
          promotableTaskId,
          "--check",
          "--json",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        const payload = JSON.parse(io.stdout) as {
          task_id: string;
          promotable: { observation: string; fixability: string | null; state: string }[];
          skipped: unknown[];
        };
        expect(payload.task_id).toBe(promotableTaskId);
        expect(payload.promotable).toHaveLength(1);
        expect(payload.promotable[0]?.fixability).toBe("external");
        expect(payload.promotable[0]?.state).toBe("open");
        expect(payload.skipped).toHaveLength(0);
      } finally {
        io.restore();
      }
    }

    let localOnlyTaskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Verify appends local-only finding",
          "--description",
          "Keep finding task-local",
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
        localOnlyTaskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "verify",
          localOnlyTaskId,
          "--ok",
          "--by",
          "REVIEWER",
          "--note",
          "Looks good",
          "--observation",
          "The issue is already local to this task.",
          "--impact",
          "No registry promotion is needed.",
          "--resolution",
          "Keep this finding task-local.",
          "--local-only",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("finding=task-local");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "incidents",
          "collect",
          localOnlyTaskId,
          "--check",
          "--json",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        const payload = JSON.parse(io.stdout) as {
          task_id: string;
          promotable: unknown[];
          skipped: { observation: string; reason: string }[];
        };
        expect(payload.task_id).toBe(localOnlyTaskId);
        expect(payload.promotable).toHaveLength(0);
        expect(payload.skipped).toHaveLength(1);
        expect(payload.skipped[0]?.reason).toBe("not_marked_external_or_promotable");
      } finally {
        io.restore();
      }
    }
  });

  it("verify can append repo-fixable findings and incidents collect promotes them", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
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
          "Verify appends repo-fixable finding",
          "--description",
          "Exercise verify to incidents collect flow for repo-fixable findings",
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
          "verify",
          taskId,
          "--ok",
          "--by",
          "REVIEWER",
          "--note",
          "Looks good",
          "--repo-fixable",
          "--observation",
          "The remaining workflow drift can be fixed in repository code.",
          "--impact",
          "We need a reusable reminder in incidents.md.",
          "--resolution",
          "Add the incident note from the verify flow.",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("finding=incident-candidate");
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
        promotable: { fixability: string | null; state: string; advice: string | null }[];
      };
      expect(payload.promotable).toHaveLength(1);
      expect(payload.promotable[0]?.fixability).toBe("repo-fixable");
      expect(payload.promotable[0]?.state).toBe("open");
      expect(payload.promotable[0]?.advice).toContain("incident note");
    } finally {
      io.restore();
    }
  });

  it("verify --collect-incidents updates incidents.md immediately while default verify stays record-only", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );

    let defaultTaskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Default verify stays record only",
          "--description",
          "Verify without collect-incidents must not touch incidents registry",
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
        defaultTaskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "verify",
          defaultTaskId,
          "--ok",
          "--by",
          "REVIEWER",
          "--note",
          "Looks good",
          "--observation",
          "Default verify still records reusable drift findings.",
          "--impact",
          "Operators should not get incidents side effects unless they opt in.",
          "--resolution",
          "Require an explicit collect-incidents flag.",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain(
          "incident registry unchanged (1 promotable external finding stayed task-local in the current task worktree; run verify --collect-incidents, agentplane incidents collect <task-id>, or finish on the base branch to update incidents.md)",
        );
      } finally {
        io.restore();
      }
    }

    {
      const incidentsFile = await readFile(
        path.join(root, ".agentplane", "policy", "incidents.md"),
        "utf8",
      );
      expect(incidentsFile).not.toContain("Default verify still records reusable drift findings.");
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "incidents",
          "collect",
          defaultTaskId,
          "--check",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain(
          "incident registry unchanged (1 promotable external finding validated; rerun without --check to update incidents.md)",
        );
      } finally {
        io.restore();
      }
    }

    let collectTaskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Verify can collect incidents explicitly",
          "--description",
          "Verify with collect-incidents should update incidents.md immediately",
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
        collectTaskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "verify",
          collectTaskId,
          "--ok",
          "--by",
          "REVIEWER",
          "--note",
          "Looks good",
          "--collect-incidents",
          "--observation",
          "Verify can now update incidents.md on workflow drift.",
          "--impact",
          "Operators no longer need a second collect command for reusable findings.",
          "--resolution",
          "Run incident collection explicitly from verify when requested.",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("incident registry updated (1 promoted)");
        expect(io.stdout).toContain("ids=INC-");
        expect(io.stdout).toContain("files=.agentplane/policy/incidents.md");
      } finally {
        io.restore();
      }
    }

    {
      const incidentsFile = await readFile(
        path.join(root, ".agentplane", "policy", "incidents.md"),
        "utf8",
      );
      expect(incidentsFile).toContain("Verify can now update incidents.md on workflow drift.");
    }
  });

  it("incidents collect success output names promoted ids and registry files", async () => {
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
          "Collect incidents reports exact write targets",
          "--description",
          "Collect should name the promoted ids and registry files.",
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
          "doc",
          "set",
          taskId,
          "--section",
          "Findings",
          "--text",
          [
            "- Observation: operators still could not see which incident id was promoted.",
            "  Impact: they had to open incidents.md manually after every collect run.",
            "  Resolution: include promoted ids and registry files directly in the success output.",
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

    {
      const io = captureStdIO();
      try {
        const code = await runCli(["incidents", "collect", taskId, "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("incident registry updated (1 promoted)");
        expect(io.stdout).toContain("ids=INC-");
        expect(io.stdout).toContain("files=.agentplane/policy/incidents.md");
      } finally {
        io.restore();
      }
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

  it("incidents collect reports skipped structured findings that are not marked external or promotable", async () => {
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
          "Report skipped structured findings",
          "--description",
          "Differentiate skipped findings from empty incident input",
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
          "doc",
          "set",
          taskId,
          "--section",
          "Findings",
          "--text",
          [
            "- Observation: transient GitHub transport failures forced manual retries.",
            "  Impact: operators had to repeat the same reconcile loop.",
            "  Resolution: move the flaky path onto resilient polling.",
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
        candidates: number;
        skipped: { observation: string; reason: string }[];
        promotable: unknown[];
      };
      expect(payload.task_id).toBe(taskId);
      expect(payload.checked_only).toBe(true);
      expect(payload.candidates).toBe(0);
      expect(payload.skipped).toHaveLength(1);
      expect(payload.skipped[0]?.reason).toBe("not_marked_external_or_promotable");
      expect(payload.promotable).toHaveLength(0);
    } finally {
      io.restore();
    }
  });

  it("incidents collect explains when Findings has plain text but no structured incident blocks", async () => {
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
          "Explain plain findings incident no-op",
          "--description",
          "Differentiate plain Findings text from structured incident blocks",
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
          "doc",
          "set",
          taskId,
          "--section",
          "Findings",
          "--text",
          "Operators noted that incidents.md stayed unchanged after finish, but no structured incident block was recorded.",
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
      const code = await runCli(["incidents", "collect", taskId, "--check", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("plain Findings text stays task-local");
      expect(io.stdout).toContain("does not update incidents.md");
      expect(io.stdout).toContain("Observation/Impact/Resolution");
    } finally {
      io.restore();
    }
  });

  it("finish can append and promote a structured finding during closeout", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await commitAll(root, "seed");
    const headSha = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      encoding: "utf8",
    }).trim();
    {
      const io = captureStdIO();
      try {
        const code = await runCli(["branch", "base", "set", "main", "--root", root]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Promote finish-time incident finding",
          "--description",
          "Capture a reusable workflow finding during finish",
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
          "doc",
          "set",
          taskId,
          "--section",
          "Verify Steps",
          "--text",
          "1. Run the finish-time incident promotion closeout flow.",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "start-ready",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: reproduce finish-time incident promotion.",
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
        "finish",
        taskId,
        "--author",
        "INTEGRATOR",
        "--body",
        "Verified: finish appended and promoted the closeout finding.",
        "--result",
        "finish finding promoted",
        "--commit",
        headSha,
        "--observation",
        "Closeout repeatedly surfaced a reusable workflow failure only after implementation was complete.",
        "--impact",
        "incidents.md stayed behind real operator experience until someone ran a second manual command.",
        "--resolution",
        "Allow finish to append and promote the finding in one deterministic flow.",
        "--incident-scope",
        "finish closeout incident capture",
        "--no-close-commit",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("incident registry updated (1 promoted)");
      expect(io.stdout).toContain("ids=INC-");
      expect(io.stdout).toContain("files=.agentplane/policy/incidents.md");
      expect(io.stdout).toContain("finished");
    } finally {
      io.restore();
    }

    const incidentsText = await readFile(path.join(root, ".agentplane", "policy", "incidents.md"));
    const taskReadme = await readFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"));
    expect(String(incidentsText)).toContain("scope: finish closeout incident capture");
    expect(String(incidentsText)).toContain(`source_task: ${taskId}`);
    expect(String(taskReadme)).toContain("Promotion: incident-candidate");
    expect(String(taskReadme)).toContain(
      "Resolution: Allow finish to append and promote the finding",
    );
  });

  it("incidents collect refuses writes that would push the registry over the policy line budget", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      [
        compactRegistryHeader,
        ...Array.from({ length: 99 }, (_unused, index) => makeCompactOpenEntry(index + 1)),
      ].join("\n") + "\n",
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
          "Reject over-budget incident promotion",
          "--description",
          "Validate that incidents collect fails before writing an oversized registry",
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
          "doc",
          "set",
          taskId,
          "--section",
          "Findings",
          "--text",
          [
            "- Observation: another incident promotion would overflow the policy file budget.",
            "  Impact: check-routing would fail after the write.",
            "  Resolution: validate the candidate registry size before writing.",
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

    const incidentsPath = path.join(root, ".agentplane", "policy", "incidents.md");
    const before = await readFile(incidentsPath, "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["incidents", "collect", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("would exceed policy budget");
      expect(await readFile(incidentsPath, "utf8")).toBe(before);
    } finally {
      io.restore();
    }
  });
});
