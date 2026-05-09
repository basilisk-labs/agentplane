/* eslint-disable @typescript-eslint/no-unused-vars */
import { chmod, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
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

function captureStderr(): { output: () => string; restore: () => void } {
  const chunks: string[] = [];
  const spy = vi.spyOn(process.stderr, "write").mockImplementation(((chunk: unknown) => {
    chunks.push(String(chunk));
    return true;
  }) as typeof process.stderr.write);
  return {
    output: () => chunks.join(""),
    restore: () => spy.mockRestore(),
  };
}

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

function workflowWithExpectedCliVersion(version: string): string {
  return VALID_WORKFLOW.replace(
    "owners:\n",
    `framework:\n  source: "https://github.com/basilisk-labs/agentplane"\n  last_update: null\n  cli:\n    expected_version: "${version}"\nowners:\n`,
  );
}

async function mkWorkspace(): Promise<TestWorkspace> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-doctor-"));
  workspaces.push(root);
  await mkdir(path.join(root, ".git"));
  await mkdir(path.join(root, ".agentplane", "agents"), { recursive: true });
  await mkdir(path.join(root, ".agentplane", "workflows"), { recursive: true });
  await writeFile(path.join(root, "AGENTS.md"), "# AGENTS\n", "utf8");
  await writeFile(
    path.join(root, ".agentplane", "config.json"),
    '{\n  "schema_version": 1,\n  "workflow_mode": "direct",\n  "agents": {\n    "approvals": {\n      "require_plan": false,\n      "require_verify": false,\n      "require_network": true\n    }\n  }\n}\n',
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

function currentManagedShimText(installedRunnerPath: string): string {
  return [
    "#!/usr/bin/env sh",
    "# agentplane-hook-shim (do not edit)",
    "set -e",
    `INSTALL_BIN='${installedRunnerPath}'`,
    'if command -v node >/dev/null 2>&1 && [ -f "$INSTALL_BIN" ]; then',
    '  exec node "$INSTALL_BIN" "$@"',
    "fi",
    'ENV_BIN="${AGENTPLANE_HOOK_RUNNER:-}"',
    'if [ -n "$ENV_BIN" ] && command -v node >/dev/null 2>&1 && [ -f "$ENV_BIN" ]; then',
    '  exec node "$ENV_BIN" "$@"',
    "fi",
    'if [ -n "${AGENTPLANE_HOOK_ALLOW_GLOBAL+x}" ] && [ "${AGENTPLANE_HOOK_ALLOW_GLOBAL}" != "1" ]; then',
    '  echo "agentplane shim: local runner not found; AGENTPLANE_HOOK_ALLOW_GLOBAL=1 to opt-in global runner." >&2',
    "  exit 127",
    "fi",
    'if [ "${AGENTPLANE_HOOK_ALLOW_GLOBAL:-}" = "1" ] && command -v agentplane >/dev/null 2>&1; then',
    '  exec agentplane "$@"',
    "fi",
    "",
  ].join("\n");
}

async function writeManagedHookSurface(
  root: string,
  opts: {
    hooks?: string[];
    packageJson?: string | null;
    runnerExists?: boolean;
    shimText?: string;
  } = {},
): Promise<{ runnerPath: string }> {
  const hooks = opts.hooks ?? ["pre-push"];
  const hooksDir = path.join(root, ".git", "hooks");
  const shimPath = path.join(root, ".agentplane", "bin", "agentplane");
  const runnerPath = path.join(root, ".agentplane", "runtime", "bin", "agentplane.js");
  await mkdir(hooksDir, { recursive: true });
  await mkdir(path.dirname(shimPath), { recursive: true });
  if (opts.runnerExists !== false) {
    await mkdir(path.dirname(runnerPath), { recursive: true });
    await writeFile(runnerPath, "#!/usr/bin/env node\nprocess.exit(0);\n", "utf8");
    await chmod(runnerPath, 0o755);
  }
  for (const hook of hooks) {
    const hookPath = path.join(hooksDir, hook);
    await writeFile(
      hookPath,
      [
        "#!/usr/bin/env sh",
        "# agentplane-hook (do not edit)",
        'exec "$PWD/.agentplane/bin/agentplane" hooks run "$@"',
        "",
      ].join("\n"),
      "utf8",
    );
    await chmod(hookPath, 0o755);
  }
  await writeFile(shimPath, opts.shimText ?? currentManagedShimText(runnerPath), "utf8");
  await chmod(shimPath, 0o755);
  if (opts.packageJson !== undefined && opts.packageJson !== null) {
    await writeFile(path.join(root, "package.json"), opts.packageJson, "utf8");
  }
  return { runnerPath };
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
  "doctor.command runtime version and policy diagnostics",
  { timeout: DOCTOR_COMMAND_TIMEOUT_MS },
  () => {
    it("summarizes repeated unknown historical hashes instead of printing one warning per task", async () => {
      const ws = await mkWorkspace();
      await gitInitWithCommit(ws.root, "feat: initial");
      const stderr = captureStderr();
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
        const output = stderr.output();
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
        stderr.restore();
      }
    });

    it(
      "summarizes repeated close-commit misuse in historical DONE tasks",
      async () => {
        const ws = await mkWorkspace();
        const closeHashA = await gitInitWithCommit(ws.root, "✅ ABC123 close: done");
        const closeHashB = await gitInitWithCommit(ws.root, "✅ XYZ999 close: merged");
        const stderr = captureStderr();
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
          const output = stderr.output();
          expect(output).toContain(
            "[INFO] Historical task archive contains 3 DONE tasks with historical close-commit references that were classified as non-actionable archive records across 2 distinct commit hashes.",
          );
          expect(output).toContain("202602111820-AAA111, 202602111821-BBB222");
          expect(output).toContain("subject: ✅ ABC123 close: done");
          expect(output).not.toContain(
            "DONE task implementation commit points to a close commit: 202602111820-AAA111",
          );
        } finally {
          stderr.restore();
        }
      },
      DOCTOR_HISTORICAL_ARCHIVE_TIMEOUT_MS,
    );

    it("downgrades legacy backfill historical hashes to info", async () => {
      const ws = await mkWorkspace();
      await gitInitWithCommit(ws.root, "feat: initial");
      const stderr = captureStderr();
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
        const output = stderr.output();
        expect(output).toContain("[INFO] DONE task references unknown historical commit hash");
        expect(output).not.toContain("[WARN] DONE task references unknown historical commit hash");
      } finally {
        stderr.restore();
      }
    });

    it("downgrades no-op close-commit references to info", async () => {
      const ws = await mkWorkspace();
      const closeHash = await gitInitWithCommit(ws.root, "✅ ABC123 close: done");
      const stderr = captureStderr();
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
        const output = stderr.output();
        expect(output).toContain(
          "[INFO] DONE task implementation commit resolves to a historical close commit reference: 202602111824-ABC123",
        );
        expect(output).not.toContain(
          "[WARN] DONE task implementation commit points to a close commit: 202602111824-ABC123",
        );
      } finally {
        stderr.restore();
      }
    });

    it("downgrades legacy close: record task doc references to info", async () => {
      const ws = await mkWorkspace();
      const closeHash = await gitInitWithCommit(ws.root, "✅ ABC123 close: record task doc");
      const stderr = captureStderr();
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
        const output = stderr.output();
        expect(output).toContain(
          "[INFO] DONE task implementation commit resolves to a historical close commit reference: 202602111825-ABC123",
        );
        expect(output).not.toContain(
          "[WARN] DONE task implementation commit points to a close commit: 202602111825-ABC123",
        );
      } finally {
        stderr.restore();
      }
    });

    it("warns when DONE task README archives exist on disk but are missing from the git index", async () => {
      const ws = await mkWorkspace();
      await gitInitWithCommit(ws.root, "feat: initial");
      const stderr = captureStderr();
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
        const output = stderr.output();
        expect(output).toContain(
          "[WARN] State: DONE task archive README files exist on disk but are missing from the git index",
        );
        expect(output).toContain(taskId);
        expect(output).toContain(`git add .agentplane/tasks/${taskId}/README.md`);
      } finally {
        stderr.restore();
      }
    });

    it("warns when the active CLI is older than the repository expectation", async () => {
      const ws = await mkWorkspace();
      const stderr = captureStderr();
      await writeFile(
        path.join(ws.root, ".agentplane", "WORKFLOW.md"),
        workflowWithExpectedCliVersion("9.9.9"),
        "utf8",
      );

      try {
        const rc = await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
        expect(rc).toBe(0);
        const output = stderr.output();
        expect(output).toContain("expects agentplane 9.9.9");
        expect(output).toContain("Run: npm i -g agentplane@9.9.9");
        expect(output).toContain("Then verify: agentplane runtime explain");
      } finally {
        stderr.restore();
      }
    });

    it("does not emit version-match findings when the active CLI already satisfies the repository expectation", async () => {
      const ws = await mkWorkspace();
      const stderr = captureStderr();
      await writeFile(
        path.join(ws.root, ".agentplane", "WORKFLOW.md"),
        workflowWithExpectedCliVersion(currentCliVersion),
        "utf8",
      );

      try {
        const rc = await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
        expect(rc).toBe(0);
        const output = stderr.output();
        expect(output).not.toContain("[WARN]");
        expect(output).not.toContain("[ERROR]");
        expect(output).not.toContain("Repository expected agentplane CLI");
      } finally {
        stderr.restore();
      }
    });

    it("warns when the generated prompt graph is stale", async () => {
      const ws = await mkWorkspace();
      await mkdir(path.join(ws.root, ".agentplane", "generated"), { recursive: true });
      await writeFile(
        path.join(ws.root, ".agentplane", "generated", "prompt-graph.json"),
        JSON.stringify(
          {
            schema_version: 1,
            nodes: [],
            diagnostics: [],
            validators: [],
            bindings: [],
            ok: true,
          },
          null,
          2,
        ),
        "utf8",
      );
      const stderr = captureStderr();

      try {
        const rc = await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
        expect(rc).toBe(0);
        const output = stderr.output();
        expect(output).toContain(
          "generated prompt graph is stale relative to current recipe inputs",
        );
        expect(output).toContain(".agentplane/generated/prompt-graph.json");
        expect(output).toContain("agentplane recipes explain-active");
      } finally {
        stderr.restore();
      }
    });

    it("fails when the managed policy tree is incomplete for the active gateway", async () => {
      const ws = await mkWorkspace();
      await rm(path.join(ws.root, ".agentplane", "policy", "workflow.upgrade.md"), { force: true });
      const stderr = captureStderr();
      try {
        const rc = await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
        expect(rc).toBe(1);
        expect(stderr.output()).toContain("State: framework-managed policy tree is incomplete");
        expect(stderr.output()).toContain("Next action: agentplane upgrade --yes");
        expect(stderr.output()).toContain("docs/help/legacy-upgrade-recovery.mdx");
      } finally {
        stderr.restore();
      }
    });

    it("keeps doctor quiet for a current managed hook shim with an available installed runner", async () => {
      const ws = await mkWorkspace();
      await gitInitWithCommit(ws.root, "feat: initial");
      await writeManagedHookSurface(ws.root);
      const stderr = captureStderr();
      try {
        const rc = await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
        expect(rc).toBe(0);
        const output = stderr.output();
        expect(output).not.toContain("managed AgentPlane hook shim");
        expect(output).not.toContain("managed git hooks are installed");
      } finally {
        stderr.restore();
      }
    });

    it("warns when a managed hook shim points to a missing installed runner", async () => {
      const ws = await mkWorkspace();
      await gitInitWithCommit(ws.root, "feat: initial");
      const missingRunner = path.join(ws.root, ".agentplane", "runtime", "missing.js");
      await writeManagedHookSurface(ws.root, {
        runnerExists: false,
        shimText: currentManagedShimText(missingRunner),
      });
      const stderr = captureStderr();
      try {
        const rc = await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
        expect(rc).toBe(0);
        const output = stderr.output();
        expect(output).toContain(
          "managed AgentPlane hook shim points to a missing installed runner",
        );
        expect(output).toContain("Next action: agentplane hooks install");
        expect(output).toContain(`Embedded runner: ${missingRunner}`);
      } finally {
        stderr.restore();
      }
    });

    it("warns when a managed hook shim was generated by a stale fallback format", async () => {
      const ws = await mkWorkspace();
      await gitInitWithCommit(ws.root, "feat: initial");
      await writeManagedHookSurface(ws.root, {
        shimText: [
          "#!/usr/bin/env sh",
          "# agentplane-hook-shim (do not edit)",
          'exec agentplane "$@"',
          "",
        ].join("\n"),
      });
      const stderr = captureStderr();
      try {
        const rc = await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
        expect(rc).toBe(0);
        const output = stderr.output();
        expect(output).toContain(
          "managed AgentPlane hook shim uses a stale format without an installed runner fallback",
        );
        expect(output).toContain(
          "managed AgentPlane hook shim is missing current fallback branches",
        );
      } finally {
        stderr.restore();
      }
    });

    it("reports installed clean-project fallback behavior when local pre-push scripts are absent", async () => {
      const ws = await mkWorkspace();
      await gitInitWithCommit(ws.root, "feat: initial");
      await writeManagedHookSurface(ws.root, { packageJson: '{\n  "scripts": {}\n}\n' });
      const stderr = captureStderr();
      try {
        const rc = await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
        expect(rc).toBe(0);
        const output = stderr.output();
        expect(output).toContain(
          "managed pre-push hook will use installed clean-project fallback checks",
        );
        expect(output).toContain("Missing repository script: scripts/run-pre-push-hook.mjs");
      } finally {
        stderr.restore();
      }
    });

    it("reports unmanaged hooks without suggesting silent overwrite", async () => {
      const ws = await mkWorkspace();
      await gitInitWithCommit(ws.root, "feat: initial");
      const hooksDir = path.join(ws.root, ".git", "hooks");
      await mkdir(hooksDir, { recursive: true });
      await writeFile(
        path.join(hooksDir, "pre-commit"),
        "#!/usr/bin/env sh\necho custom\n",
        "utf8",
      );
      const stderr = captureStderr();
      try {
        const rc = await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
        expect(rc).toBe(0);
        const output = stderr.output();
        expect(output).toContain(
          "unmanaged git hooks are present and will not be overwritten by AgentPlane",
        );
        expect(output).toContain("Unmanaged hooks: pre-commit");
      } finally {
        stderr.restore();
      }
    });

    it("prints runtime info when doctor runs inside a framework checkout", async () => {
      const ws = await mkWorkspace();
      const framework = await addFrameworkCheckout(ws.root);
      const stderr = captureStderr();
      const prevActiveBin = process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;
      process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = framework.repoBin;
      try {
        const rc = await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
        expect(rc).toBe(0);
        const output = stderr.output();
        expect(output).toContain("Runtime mode: repo-local");
        expect(output).toContain(`Active binary: ${framework.repoBin}`);
        expect(output).toContain(`Framework repo root: ${ws.root}`);
        expect(output).toContain(`Framework core root: ${framework.coreRoot}`);
      } finally {
        if (prevActiveBin === undefined) delete process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;
        else process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = prevActiveBin;
        stderr.restore();
      }
    });

    it("warns when the global binary is forced inside a framework checkout", async () => {
      const ws = await mkWorkspace();
      await addFrameworkCheckout(ws.root);
      const stderr = captureStderr();
      const prevActiveBin = process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;
      const prevForce = process.env.AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK;
      process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = path.join(
        os.tmpdir(),
        "agentplane-global-bin.js",
      );
      process.env.AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK = "1";
      try {
        const rc = await runDoctor(
          { cwd: ws.root, rootOverride: null } as unknown as Parameters<typeof runDoctor>[0],
          { fix: false, dev: false },
        );
        expect(rc).toBe(0);
        const output = stderr.output();
        expect(output).toContain("Framework checkout is forcing the global installed binary");
        expect(output).toContain("Unset it unless that override is intentional");
        expect(output).toContain("Runtime mode: global-forced-in-framework");
      } finally {
        if (prevActiveBin === undefined) delete process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;
        else process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = prevActiveBin;
        if (prevForce === undefined) delete process.env.AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK;
        else process.env.AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK = prevForce;
        stderr.restore();
      }
    });
  },
);
