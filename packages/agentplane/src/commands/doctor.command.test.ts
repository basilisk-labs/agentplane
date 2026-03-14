import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { renderTaskReadme } from "@agentplaneorg/core";
import { afterEach, describe, expect, it, vi } from "vitest";

import { runDoctor } from "./doctor.command.js";

type TestWorkspace = {
  root: string;
};

const workspaces: string[] = [];
const execFileAsync = promisify(execFile);
const REDMINE_ENV_KEYS = [
  "AGENTPLANE_REDMINE_URL",
  "AGENTPLANE_REDMINE_API_KEY",
  "AGENTPLANE_REDMINE_PROJECT_ID",
  "AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID",
  "AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE",
] as const;

function readCurrentCliVersion(): string {
  const packageJsonPath = fileURLToPath(new URL("../../package.json", import.meta.url));
  const parsed = JSON.parse(readFileSync(packageJsonPath, "utf8")) as unknown;
  if (
    parsed &&
    typeof parsed === "object" &&
    "version" in parsed &&
    typeof parsed.version === "string" &&
    parsed.version.trim().length > 0
  ) {
    return parsed.version;
  }
  return "0.0.0";
}

const currentCliVersion = readCurrentCliVersion();

const VALID_WORKFLOW = `---
version: 1
mode: direct
owners:
  orchestrator: CODER
approvals:
  require_plan: false
  require_verify: false
  require_network: true
retry_policy:
  normal_exit_continuation: true
  abnormal_backoff: exponential
  max_attempts: 5
timeouts:
  stall_seconds: 900
in_scope_paths:
  - packages/**
---

## Prompt Template
Repository: {{ runtime.repo_name }}
Workflow mode: {{ workflow.mode }}

## Checks
- preflight
- verify
- finish

## Fallback
last_known_good: .agentplane/workflows/last-known-good.md
`;

async function mkWorkspace(): Promise<TestWorkspace> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-doctor-"));
  workspaces.push(root);
  await mkdir(path.join(root, ".git"));
  await mkdir(path.join(root, ".agentplane", "agents"), { recursive: true });
  await mkdir(path.join(root, ".agentplane", "workflows"), { recursive: true });
  await writeFile(path.join(root, "AGENTS.md"), "# AGENTS\n", "utf8");
  await writeFile(
    path.join(root, ".agentplane", "config.json"),
    '{\n  "version": 1,\n  "workflow_mode": "direct",\n  "agents": {\n    "approvals": {\n      "require_plan": false,\n      "require_verify": false,\n      "require_network": true\n    }\n  }\n}\n',
    "utf8",
  );
  await writeFile(
    path.join(root, ".agentplane", "agents", "CODER.json"),
    '{\n  "role": "coder"\n}\n',
    "utf8",
  );
  const manifestPath = fileURLToPath(
    new URL("../../assets/framework.manifest.json", import.meta.url),
  );
  const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as {
    files?: { path?: string; required?: boolean }[];
  };
  for (const entry of manifest.files ?? []) {
    const relPath = typeof entry.path === "string" ? entry.path.replaceAll("\\", "/") : "";
    if (!entry.required || !relPath.startsWith(".agentplane/policy/")) continue;
    const absPath = path.join(root, relPath);
    await mkdir(path.dirname(absPath), { recursive: true });
    await writeFile(
      absPath,
      relPath.endsWith(".mjs") ? "export {};\n" : `# ${path.basename(relPath)}\n`,
      "utf8",
    );
  }
  await writeFile(path.join(root, ".agentplane", "WORKFLOW.md"), VALID_WORKFLOW, "utf8");
  await writeFile(
    path.join(root, ".agentplane", "workflows", "last-known-good.md"),
    VALID_WORKFLOW,
    "utf8",
  );
  return { root };
}

async function configureRedmineBackend(
  root: string,
  opts?: { canonicalStateFieldId?: string | null },
): Promise<void> {
  await mkdir(path.join(root, ".agentplane", "backends", "redmine"), { recursive: true });
  await writeFile(
    path.join(root, ".agentplane", "config.json"),
    JSON.stringify(
      {
        version: 1,
        workflow_mode: "direct",
        agents: {
          approvals: {
            require_plan: false,
            require_verify: false,
            require_network: true,
          },
        },
        tasks_backend: {
          config_path: ".agentplane/backends/redmine/backend.json",
        },
      },
      null,
      2,
    ),
    "utf8",
  );
  await writeFile(
    path.join(root, ".agentplane", "backends", "redmine", "backend.json"),
    JSON.stringify(
      {
        id: "redmine",
        version: 1,
        settings: {
          owner_agent: "CODER",
        },
      },
      null,
      2,
    ),
    "utf8",
  );

  const envLines = [
    "AGENTPLANE_REDMINE_URL=https://redmine.example.test",
    "AGENTPLANE_REDMINE_API_KEY=test-key",
    "AGENTPLANE_REDMINE_PROJECT_ID=test-project",
    "AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID=1",
    ...(opts?.canonicalStateFieldId
      ? [`AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE=${opts.canonicalStateFieldId}`]
      : []),
  ];
  await writeFile(path.join(root, ".env"), `${envLines.join("\n")}\n`, "utf8");
}

async function withIsolatedRedmineEnv<T>(fn: () => Promise<T>): Promise<T> {
  const previous = new Map<string, string | undefined>();
  for (const key of REDMINE_ENV_KEYS) {
    previous.set(key, process.env[key]);
    delete process.env[key];
  }
  try {
    return await fn();
  } finally {
    for (const key of REDMINE_ENV_KEYS) {
      const value = previous.get(key);
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

async function gitInitWithCommit(root: string, subject: string): Promise<string> {
  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Doctor Test"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "doctor@example.com"], { cwd: root });
  await writeFile(path.join(root, "file.txt"), `${subject}\n`, "utf8");
  await execFileAsync("git", ["add", "file.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", subject], { cwd: root });
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  return stdout.trim();
}

async function addFrameworkCheckout(root: string): Promise<{
  repoBin: string;
  coreRoot: string;
}> {
  const packageRoot = path.join(root, "packages", "agentplane");
  const repoBin = path.join(packageRoot, "bin", "agentplane.js");
  const coreRoot = path.join(root, "packages", "core");
  await mkdir(path.join(packageRoot, "bin"), { recursive: true });
  await mkdir(path.join(packageRoot, "src"), { recursive: true });
  await mkdir(coreRoot, { recursive: true });
  await writeFile(repoBin, "#!/usr/bin/env node\n", "utf8");
  await writeFile(path.join(packageRoot, "src", "cli.ts"), "export const cli = true;\n", "utf8");
  await writeFile(
    path.join(packageRoot, "package.json"),
    '{\n  "name": "agentplane",\n  "version": "0.3.2"\n}\n',
    "utf8",
  );
  await writeFile(
    path.join(coreRoot, "package.json"),
    '{\n  "name": "@agentplaneorg/core",\n  "version": "0.3.2"\n}\n',
    "utf8",
  );
  return { repoBin, coreRoot };
}

afterEach(async () => {
  while (workspaces.length > 0) {
    const root = workspaces.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("doctor.command", () => {
  it("passes default checks for a normal initialized workspace without monorepo src folders", async () => {
    const ws = await mkWorkspace();
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rc).toBe(0);
  });

  it("fails default checks when both policy gateway files are missing", async () => {
    const ws = await mkWorkspace();
    await rm(path.join(ws.root, "AGENTS.md"), { force: true });
    await rm(path.join(ws.root, "CLAUDE.md"), { force: true });
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rc).toBe(1);
  });

  it("passes default checks when only CLAUDE.md exists", async () => {
    const ws = await mkWorkspace();
    await writeFile(path.join(ws.root, "CLAUDE.md"), "# CLAUDE\n", "utf8");
    await rm(path.join(ws.root, "AGENTS.md"), { force: true });
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rc).toBe(0);
  });

  it("supports workflow kill-switch for emergency rollback", async () => {
    const ws = await mkWorkspace();
    await rm(path.join(ws.root, ".agentplane", "WORKFLOW.md"), { force: true });
    const prev = process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT;
    process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT = "off";
    try {
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
    } finally {
      if (prev === undefined) delete process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT;
      else process.env.AGENTPLANE_WORKFLOW_ENFORCEMENT = prev;
    }
  });

  it("does not fail when workflow has warning-only policy mismatch", async () => {
    const ws = await mkWorkspace();
    const warningOnlyWorkflow = VALID_WORKFLOW.replace("require_plan: false", "require_plan: true");
    await writeFile(path.join(ws.root, ".agentplane", "WORKFLOW.md"), warningOnlyWorkflow, "utf8");
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rc).toBe(0);
  });

  it("warns when a Redmine backend is configured without canonical_state readiness", async () => {
    const ws = await mkWorkspace();
    await configureRedmineBackend(ws.root);
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    try {
      const rc = await withIsolatedRedmineEnv(async () => {
        return await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
      });
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).toContain("Redmine backend is running in partial compatibility mode");
      expect(output).toContain("agentplane backend inspect redmine --yes");
      expect(output).toContain("supports_task_revisions=false");
    } finally {
      stderr.mockRestore();
    }
  });

  it("stays quiet on Redmine readiness when canonical_state support is configured", async () => {
    const ws = await mkWorkspace();
    await configureRedmineBackend(ws.root, { canonicalStateFieldId: "9" });
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    try {
      const rc = await withIsolatedRedmineEnv(async () => {
        return await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
      });
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).not.toContain("Redmine backend is running in partial compatibility mode");
    } finally {
      stderr.mockRestore();
    }
  });

  it("fails dev checks when monorepo source tree is unavailable", async () => {
    const ws = await mkWorkspace();
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: true },
    );
    expect(rc).toBe(1);
  });

  it("fails when DONE task misses implementation commit hash", async () => {
    const ws = await mkWorkspace();
    await gitInitWithCommit(ws.root, "feat: initial");
    await writeFile(
      path.join(ws.root, ".agentplane", "tasks.json"),
      JSON.stringify(
        {
          tasks: [
            { id: "202602111800-ABC123", status: "DONE", commit: null },
            { id: "202602111801-DEF456", status: "TODO" },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );
    const rc = await runDoctor(
      { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
      { fix: false, dev: false },
    );
    expect(rc).toBe(1);
  });

  it("warns when active tasks still use legacy README v2 format", async () => {
    const ws = await mkWorkspace();
    const commitHash = await gitInitWithCommit(ws.root, "feat: baseline");
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    await writeFile(
      path.join(ws.root, ".agentplane", "tasks.json"),
      JSON.stringify(
        {
          tasks: [
            { id: "202603081006-LEGACY1", status: "TODO", doc_version: 2 },
            {
              id: "202603081006-CURRENT1",
              status: "DONE",
              doc_version: 3,
              commit: { hash: commitHash },
            },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );

    try {
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).toContain("active v2/v3 mixed state");
      expect(output).toContain("agentplane task migrate-doc --all");
      expect(output).toContain("202603081006-LEGACY1");
    } finally {
      stderr.mockRestore();
    }
  });

  it("reports historical README v2 tasks as info when only DONE archive records remain", async () => {
    const ws = await mkWorkspace();
    const commitHash = await gitInitWithCommit(ws.root, "feat: baseline");
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    await writeFile(
      path.join(ws.root, ".agentplane", "tasks.json"),
      JSON.stringify(
        {
          tasks: [
            {
              id: "202603081006-LEGACY2",
              status: "DONE",
              doc_version: 2,
              commit: { hash: commitHash },
            },
            {
              id: "202603081006-CURRENT2",
              status: "DONE",
              doc_version: 3,
              commit: { hash: commitHash },
            },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );

    try {
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).toContain("historical task archive still mixes README v2 and v3");
      expect(output).toContain("agentplane task migrate-doc --all");
      expect(output).toContain("202603081006-LEGACY2");
    } finally {
      stderr.mockRestore();
    }
  });

  it("warns when task README bodies drift from canonical frontmatter sections", async () => {
    const ws = await mkWorkspace();
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    try {
      const taskId = "202603140040-DRIFT1";
      const taskDir = path.join(ws.root, ".agentplane", "tasks", taskId);
      await mkdir(taskDir, { recursive: true });
      const canonicalReadme = renderTaskReadme(
        {
          id: taskId,
          title: "Projection drift",
          description: "Doctor should report drift",
          status: "TODO",
          priority: "med",
          owner: "CODER",
          depends_on: [],
          tags: ["code"],
          verify: [],
          plan_approval: { state: "approved", updated_at: null, updated_by: null, note: null },
          verification: { state: "pending", updated_at: null, updated_by: null, note: null },
          comments: [],
          events: [],
          revision: 1,
          doc_version: 3,
          doc_updated_at: "2026-03-14T00:00:00.000Z",
          doc_updated_by: "CODER",
          sections: {
            Summary: "Canonical summary",
            Scope: "- In scope: detect drift.",
            Plan: "1. Run doctor.",
            "Verify Steps":
              "1. Run agentplane doctor. Expected: warning mentions projection drift.",
            Verification: "<!-- BEGIN VERIFICATION RESULTS -->\n<!-- END VERIFICATION RESULTS -->",
            "Rollback Plan": "- Revert.",
            Findings: "",
          },
        },
        "",
      );
      await writeFile(
        path.join(taskDir, "README.md"),
        canonicalReadme.replace(/\n## Summary[\s\S]*$/u, "\n## Summary\n\nstale body\n"),
        "utf8",
      );

      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).toContain("task README projection drift detected");
      expect(output).toContain("agentplane task normalize");
      expect(output).toContain(taskId);
    } finally {
      stderr.mockRestore();
    }
  });

  it("prefers live task projection over a stale exported snapshot for README migration checks", async () => {
    const ws = await mkWorkspace();
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    await mkdir(path.join(ws.root, ".agentplane", "tasks", "202603081006-PRJ3"), {
      recursive: true,
    });
    const readme = renderTaskReadme(
      {
        id: "202603081006-PRJ3",
        title: "Projection task",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["backend"],
        verify: [],
        plan_approval: { state: "approved", updated_at: null, updated_by: null, note: null },
        verification: { state: "pending", updated_at: null, updated_by: null, note: null },
        commit: null,
        comments: [],
        events: [],
        doc_version: 3,
        doc_updated_at: null,
        doc_updated_by: null,
        description: "Projection-backed task",
        id_source: "generated",
      },
      "\n## Summary\n\nProjection-backed task.\n",
    );
    await writeFile(
      path.join(ws.root, ".agentplane", "tasks", "202603081006-PRJ3", "README.md"),
      readme,
      "utf8",
    );
    await writeFile(
      path.join(ws.root, ".agentplane", "tasks.json"),
      JSON.stringify(
        {
          tasks: [{ id: "202603081006-LEGACY-SNAPSHOT", status: "TODO", doc_version: 2 }],
        },
        null,
        2,
      ),
      "utf8",
    );

    try {
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).not.toContain("legacy README v2");
      expect(output).not.toContain("active v2/v3 mixed state");
      expect(output).not.toContain("202603081006-LEGACY-SNAPSHOT");
    } finally {
      stderr.mockRestore();
    }
  });

  it("reports but does not fail when DONE task references an unknown historical commit hash", async () => {
    const ws = await mkWorkspace();
    await gitInitWithCommit(ws.root, "feat: initial");
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    await writeFile(
      path.join(ws.root, ".agentplane", "tasks.json"),
      JSON.stringify(
        {
          tasks: [
            {
              id: "202602111801-DEF456",
              status: "DONE",
              commit: { hash: "13721c623fd186abbaee48456aa242f7e4561119" },
            },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );
    try {
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      expect(stderr.mock.calls.flat().join("\n")).toContain(
        "[INFO] DONE task references unknown historical commit hash: 202602111801-DEF456 -> 13721c623fd186abbaee48456aa242f7e4561119",
      );
    } finally {
      stderr.mockRestore();
    }
  });

  it("skips older archive-only historical commit anomalies by default", async () => {
    const ws = await mkWorkspace();
    const goodHash = await gitInitWithCommit(ws.root, "feat: initial");
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    const tasks = [
      {
        id: "202602111750-OLD111",
        status: "DONE",
        commit: { hash: "13721c623fd186abbaee48456aa242f7e4561119" },
      },
      ...Array.from({ length: 205 }, (_, index) => ({
        id: `2026021118${String(index).padStart(2, "0")}-R${String(index).padStart(5, "0")}`,
        status: "DONE",
        commit: { hash: goodHash },
      })),
    ];
    try {
      await writeFile(
        path.join(ws.root, ".agentplane", "tasks.json"),
        JSON.stringify({ tasks }),
        "utf8",
      );
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      expect(stderr.mock.calls.flat().join("\n")).not.toContain("unknown historical commit hash");
    } finally {
      stderr.mockRestore();
    }
  });

  it("surfaces older historical archive anomalies when archive-full is enabled", async () => {
    const ws = await mkWorkspace();
    const goodHash = await gitInitWithCommit(ws.root, "feat: initial");
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    const tasks = [
      {
        id: "202602111750-OLD111",
        status: "DONE",
        commit: { hash: "13721c623fd186abbaee48456aa242f7e4561119" },
      },
      ...Array.from({ length: 205 }, (_, index) => ({
        id: `2026021118${String(index).padStart(2, "0")}-R${String(index).padStart(5, "0")}`,
        status: "DONE",
        commit: { hash: goodHash },
      })),
    ];
    try {
      await writeFile(
        path.join(ws.root, ".agentplane", "tasks.json"),
        JSON.stringify({ tasks }),
        "utf8",
      );
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false, archiveFull: true },
      );
      expect(rc).toBe(0);
      expect(stderr.mock.calls.flat().join("\n")).toContain("unknown historical commit hash");
      expect(stderr.mock.calls.flat().join("\n")).toContain("202602111750-OLD111");
    } finally {
      stderr.mockRestore();
    }
  });

  it("warns but does not fail when DONE task commit points to a close commit subject", async () => {
    const ws = await mkWorkspace();
    const closeHash = await gitInitWithCommit(ws.root, "✅ ABC123 close: done");
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    await writeFile(
      path.join(ws.root, ".agentplane", "tasks.json"),
      JSON.stringify(
        {
          tasks: [{ id: "202602111802-ABC123", status: "DONE", commit: { hash: closeHash } }],
        },
        null,
        2,
      ),
      "utf8",
    );
    try {
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      expect(stderr.mock.calls.flat().join("\n")).toContain(
        "[WARN] DONE task implementation commit points to a close commit: 202602111802-ABC123",
      );
    } finally {
      stderr.mockRestore();
    }
  });

  it("summarizes repeated unknown historical hashes instead of printing one warning per task", async () => {
    const ws = await mkWorkspace();
    await gitInitWithCommit(ws.root, "feat: initial");
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    try {
      await writeFile(
        path.join(ws.root, ".agentplane", "tasks.json"),
        JSON.stringify(
          {
            tasks: [
              {
                id: "202602111810-AAA111",
                status: "DONE",
                commit: { hash: "13721c623fd186abbaee48456aa242f7e4561119" },
              },
              {
                id: "202602111811-BBB222",
                status: "DONE",
                commit: { hash: "13721c623fd186abbaee48456aa242f7e4561119" },
              },
              {
                id: "202602111812-CCC333",
                status: "DONE",
                commit: { hash: "463a8853f38d3b9f3ebd9f6a191f3f7c81db0aa7" },
              },
            ],
          },
          null,
          2,
        ),
        "utf8",
      );
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).toContain(
        "[INFO] Historical task archive contains 3 DONE tasks with unknown implementation commit hashes across 2 distinct commit hashes.",
      );
      expect(output).toContain(
        "13721c623fd186abbaee48456aa242f7e4561119 (2 tasks: 202602111810-AAA111, 202602111811-BBB222)",
      );
      expect(output).not.toContain(
        "DONE task references unknown historical commit hash: 202602111810-AAA111",
      );
    } finally {
      stderr.mockRestore();
    }
  });

  it("summarizes repeated close-commit misuse in historical DONE tasks", async () => {
    const ws = await mkWorkspace();
    const closeHashA = await gitInitWithCommit(ws.root, "✅ ABC123 close: done");
    const closeHashB = await gitInitWithCommit(ws.root, "✅ XYZ999 close: merged");
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    try {
      await writeFile(
        path.join(ws.root, ".agentplane", "tasks.json"),
        JSON.stringify(
          {
            tasks: [
              { id: "202602111820-AAA111", status: "DONE", commit: { hash: closeHashA } },
              { id: "202602111821-BBB222", status: "DONE", commit: { hash: closeHashA } },
              { id: "202602111822-CCC333", status: "DONE", commit: { hash: closeHashB } },
            ],
          },
          null,
          2,
        ),
        "utf8",
      );
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).toContain(
        "[INFO] Historical task archive contains 3 DONE tasks with historical close-commit references that were classified as non-actionable archive records across 2 distinct commit hashes.",
      );
      expect(output).toContain("202602111820-AAA111, 202602111821-BBB222");
      expect(output).toContain("subject: ✅ ABC123 close: done");
      expect(output).not.toContain(
        "DONE task implementation commit points to a close commit: 202602111820-AAA111",
      );
    } finally {
      stderr.mockRestore();
    }
  });

  it("downgrades legacy backfill historical hashes to info", async () => {
    const ws = await mkWorkspace();
    await gitInitWithCommit(ws.root, "feat: initial");
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    try {
      await writeFile(
        path.join(ws.root, ".agentplane", "tasks.json"),
        JSON.stringify(
          {
            tasks: [
              {
                id: "202602111813-DDD444",
                status: "DONE",
                commit: {
                  hash: "463a8853f38d3b9f3ebd9f6a191f3f7c81db0aa7",
                  message: "Legacy completion (backfill)",
                },
              },
            ],
          },
          null,
          2,
        ),
        "utf8",
      );
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).toContain("[INFO] DONE task references unknown historical commit hash");
      expect(output).not.toContain("[WARN] DONE task references unknown historical commit hash");
    } finally {
      stderr.mockRestore();
    }
  });

  it("downgrades no-op close-commit references to info", async () => {
    const ws = await mkWorkspace();
    const closeHash = await gitInitWithCommit(ws.root, "✅ ABC123 close: done");
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    try {
      await writeFile(
        path.join(ws.root, ".agentplane", "tasks.json"),
        JSON.stringify(
          {
            tasks: [
              {
                id: "202602111824-ABC123",
                status: "DONE",
                result_summary: "No-op: already implemented",
                verification: { note: "No-op: already implemented" },
                commit: { hash: closeHash, message: "✅ ABC123 close: done" },
              },
            ],
          },
          null,
          2,
        ),
        "utf8",
      );
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).toContain(
        "[INFO] DONE task implementation commit resolves to a historical close commit reference: 202602111824-ABC123",
      );
      expect(output).not.toContain(
        "[WARN] DONE task implementation commit points to a close commit: 202602111824-ABC123",
      );
    } finally {
      stderr.mockRestore();
    }
  });

  it("downgrades legacy close: record task doc references to info", async () => {
    const ws = await mkWorkspace();
    const closeHash = await gitInitWithCommit(ws.root, "✅ ABC123 close: record task doc");
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    try {
      await writeFile(
        path.join(ws.root, ".agentplane", "tasks.json"),
        JSON.stringify(
          {
            tasks: [
              {
                id: "202602111825-ABC123",
                status: "DONE",
                commit: { hash: closeHash, message: "✅ ABC123 close: record task doc" },
                comments: [
                  {
                    author: "ORCHESTRATOR",
                    body: "verified: implementation landed earlier; close commit only recorded task doc metadata.",
                  },
                ],
              },
            ],
          },
          null,
          2,
        ),
        "utf8",
      );
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).toContain(
        "[INFO] DONE task implementation commit resolves to a historical close commit reference: 202602111825-ABC123",
      );
      expect(output).not.toContain(
        "[WARN] DONE task implementation commit points to a close commit: 202602111825-ABC123",
      );
    } finally {
      stderr.mockRestore();
    }
  });

  it("warns when DONE task README archives exist on disk but are missing from the git index", async () => {
    const ws = await mkWorkspace();
    await gitInitWithCommit(ws.root, "feat: initial");
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    try {
      const taskId = "202603081538-0YPG92";
      const taskDir = path.join(ws.root, ".agentplane", "tasks", taskId);
      await mkdir(taskDir, { recursive: true });
      await writeFile(
        path.join(taskDir, "README.md"),
        `${renderTaskReadme(
          {
            id: taskId,
            title: "Backfilled task",
            status: "DONE",
            priority: "high",
            owner: "DOCS",
            depends_on: [],
            tags: ["docs"],
            verify: [],
            plan_approval: { state: "approved", updated_at: null, updated_by: null, note: null },
            verification: { state: "ok", updated_at: null, updated_by: null, note: null },
            commit: {
              hash: "abcdef1234567890abcdef1234567890abcdef12",
              message: "📝 T-1 docs: backfilled task archive",
            },
            comments: [],
            events: [],
            doc_version: 3,
            doc_updated_at: "2026-03-09T00:00:00.000Z",
            doc_updated_by: "DOCS",
            description: "Backfilled task",
            id_source: "generated",
          },
          [
            "## Summary",
            "Backfilled task",
            "",
            "## Scope",
            "- In scope: reproduce archive drift warning.",
            "- Out of scope: unrelated changes.",
            "",
            "## Plan",
            "1. Reproduce warning.",
            "",
            "## Verify Steps",
            "1. Run agentplane doctor. Expected: warning references the missing archived README path.",
            "",
            "## Verification",
            "<!-- BEGIN VERIFICATION RESULTS -->",
            "<!-- END VERIFICATION RESULTS -->",
            "",
            "## Rollback Plan",
            "- Revert.",
            "",
            "## Findings",
          ].join("\n"),
        )}\n`,
        "utf8",
      );
      await writeFile(
        path.join(ws.root, ".agentplane", "tasks.json"),
        JSON.stringify(
          {
            tasks: [
              {
                id: taskId,
                status: "DONE",
                doc_version: 3,
                commit: { hash: "abcdef1234567890abcdef1234567890abcdef12" },
              },
            ],
          },
          null,
          2,
        ),
        "utf8",
      );
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).toContain(
        "[WARN] State: DONE task archive README files exist on disk but are missing from the git index",
      );
      expect(output).toContain(taskId);
      expect(output).toContain(`git add .agentplane/tasks/${taskId}/README.md`);
    } finally {
      stderr.mockRestore();
    }
  });

  it("warns when the active CLI is older than the repository expectation", async () => {
    const ws = await mkWorkspace();
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    await writeFile(
      path.join(ws.root, ".agentplane", "config.json"),
      JSON.stringify(
        {
          schema_version: 1,
          workflow_mode: "direct",
          framework: {
            source: "https://github.com/basilisk-labs/agentplane",
            last_update: null,
            cli: { expected_version: "9.9.9" },
          },
          agents: {
            approvals: { require_plan: false, require_verify: false, require_network: true },
          },
        },
        null,
        2,
      ),
      "utf8",
    );

    try {
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).toContain("expects agentplane 9.9.9");
      expect(output).toContain("Run: npm i -g agentplane@9.9.9");
      expect(output).toContain("Then verify: agentplane runtime explain");
    } finally {
      stderr.mockRestore();
    }
  });

  it("does not emit version-match findings when the active CLI already satisfies the repository expectation", async () => {
    const ws = await mkWorkspace();
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    await writeFile(
      path.join(ws.root, ".agentplane", "config.json"),
      JSON.stringify(
        {
          schema_version: 1,
          workflow_mode: "direct",
          framework: {
            source: "https://github.com/basilisk-labs/agentplane",
            last_update: null,
            cli: { expected_version: currentCliVersion },
          },
          agents: {
            approvals: { require_plan: false, require_verify: false, require_network: true },
          },
        },
        null,
        2,
      ),
      "utf8",
    );

    try {
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).not.toContain("doctor findings:");
      expect(output).not.toContain("Repository expected agentplane CLI");
    } finally {
      stderr.mockRestore();
    }
  });

  it("fails when the managed policy tree is incomplete for the active gateway", async () => {
    const ws = await mkWorkspace();
    await rm(path.join(ws.root, ".agentplane", "policy", "workflow.upgrade.md"), { force: true });
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    try {
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(1);
      expect(stderr.mock.calls.flat().join("\n")).toContain(
        "State: framework-managed policy tree is incomplete",
      );
      expect(stderr.mock.calls.flat().join("\n")).toContain(
        "Next action: agentplane upgrade --yes",
      );
      expect(stderr.mock.calls.flat().join("\n")).toContain(
        "docs/help/legacy-upgrade-recovery.mdx",
      );
    } finally {
      stderr.mockRestore();
    }
  });

  it("prints runtime info when doctor runs inside a framework checkout", async () => {
    const ws = await mkWorkspace();
    const framework = await addFrameworkCheckout(ws.root);
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    const prevActiveBin = process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;
    process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = framework.repoBin;
    try {
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).toContain("Runtime mode: repo-local");
      expect(output).toContain(`Active binary: ${framework.repoBin}`);
      expect(output).toContain(`Framework repo root: ${ws.root}`);
      expect(output).toContain(`Framework core root: ${framework.coreRoot}`);
    } finally {
      if (prevActiveBin === undefined) delete process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;
      else process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = prevActiveBin;
      stderr.mockRestore();
    }
  });

  it("warns when the global binary is forced inside a framework checkout", async () => {
    const ws = await mkWorkspace();
    await addFrameworkCheckout(ws.root);
    const stderr = vi.spyOn(console, "error").mockImplementation(() => {
      /* muted for assertion */
    });
    const prevActiveBin = process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;
    const prevForce = process.env.AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK;
    process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = path.join(os.tmpdir(), "agentplane-global-bin.js");
    process.env.AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK = "1";
    try {
      const rc = await runDoctor(
        { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
        { fix: false, dev: false },
      );
      expect(rc).toBe(0);
      const output = stderr.mock.calls.flat().join("\n");
      expect(output).toContain("Framework checkout is forcing the global installed binary");
      expect(output).toContain("Unset it unless that override is intentional");
      expect(output).toContain("Runtime mode: global-forced-in-framework");
    } finally {
      if (prevActiveBin === undefined) delete process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;
      else process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = prevActiveBin;
      if (prevForce === undefined) delete process.env.AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK;
      else process.env.AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK = prevForce;
      stderr.mockRestore();
    }
  });
});
