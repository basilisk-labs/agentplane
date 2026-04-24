/* eslint-disable @typescript-eslint/no-unused-vars */
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { renderTaskReadme } from "@agentplaneorg/core/tasks";
import { afterEach, describe, expect, it, vi } from "vitest";

import { checkBranchPrDoneTaskOpenPrDrift } from "./doctor/branch-pr.js";
import { runDoctor } from "./doctor.run.js";

type TestWorkspace = {
  root: string;
};

const workspaces: string[] = [];
const execFileAsync = promisify(execFile);
const DOCTOR_HISTORICAL_ARCHIVE_TIMEOUT_MS = 60_000;
const DOCTOR_COMMAND_TIMEOUT_MS = 60_000;
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
  - "**"
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
  await execFileAsync("git", ["commit", "--no-verify", "-m", subject], { cwd: root });
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

describe(
  "doctor.command task docs and historical commits",
  { timeout: DOCTOR_HISTORICAL_ARCHIVE_TIMEOUT_MS },
  () => {
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

    it(
      "reports historical README v2 tasks as info when only DONE archive records remain",
      async () => {
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
      },
      DOCTOR_HISTORICAL_ARCHIVE_TIMEOUT_MS,
    );

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
              Verification:
                "<!-- BEGIN VERIFICATION RESULTS -->\n<!-- END VERIFICATION RESULTS -->",
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
          doc_updated_at: "2026-03-08T10:06:00.000Z",
          doc_updated_by: "CODER",
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

    it(
      "reports but does not fail when DONE task references an unknown historical commit hash",
      async () => {
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
      },
      DOCTOR_HISTORICAL_ARCHIVE_TIMEOUT_MS,
    );

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
  },
);
