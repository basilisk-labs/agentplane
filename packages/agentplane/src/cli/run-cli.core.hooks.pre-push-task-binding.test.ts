import { execFile, execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  writeDefaultConfig,
} from "@agentplane/testkit";

import { runCli } from "./run-cli.js";

const PRE_PUSH_HOOK_SCRIPT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../../scripts/run-pre-push-hook.mjs",
);

async function writeFastHookPackage(root: string): Promise<void> {
  await writeFile(
    path.join(root, "package.json"),
    JSON.stringify(
      {
        name: "hook-test",
        private: true,
        scripts: {
          "format:check": 'node -e "process.exit(0)"',
          "ci:local:fast": 'node -e "process.exit(0)"',
        },
      },
      null,
      2,
    ),
    "utf8",
  );
}

function head(root: string): string {
  return execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    encoding: "utf8",
  }).trim();
}

function runPrePush(
  root: string,
  baseSha: string,
  headSha: string,
): {
  failure: (Error & { stderr?: string | Buffer; stdout?: string | Buffer }) | null;
  stdout: string;
} {
  try {
    const stdout = execFileSync("node", [PRE_PUSH_HOOK_SCRIPT], {
      cwd: root,
      encoding: "utf8",
      input: `refs/heads/main ${headSha} refs/heads/main ${baseSha}\n`,
      stdio: ["pipe", "pipe", "pipe"],
    });
    return { failure: null, stdout };
  } catch (error) {
    return {
      failure: error as Error & { stderr?: string | Buffer; stdout?: string | Buffer },
      stdout: String((error as { stdout?: string | Buffer }).stdout ?? ""),
    };
  }
}

describe("pre-push task binding audit", () => {
  it("dispatches the real script from hooks run pre-push", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify(
        {
          name: "hook-test",
          private: true,
          scripts: {
            "format:check": "node scripts/format-check.mjs",
            "ci:local:fast": "node scripts/ci-fast.mjs",
            "ci:local:full": "node scripts/ci-fast.mjs",
          },
        },
        null,
        2,
      ),
      "utf8",
    );
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "scripts", "format-check.mjs"), "process.exit(1);\n", "utf8");
    await writeFile(path.join(root, "scripts", "ci-fast.mjs"), "process.exit(0);\n", "utf8");
    await writeFile(path.join(root, "src", "example.ts"), "export const example = 1;\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "package.json", "scripts", "src/example.ts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test fixture"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-push", "--root", root]);
      expect(code).toBe(1);
    } finally {
      io.restore();
    }
  });

  it("reports polluted local git config before release payload checks", async () => {
    const root = await mkGitRepoRoot();
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["config", "--local", "core.bare", "true"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const env = { ...process.env, AGENTPLANE_HOOKS_RELEASE: "1" };
    let failure: (Error & { stderr?: string | Buffer; stdout?: string | Buffer }) | null = null;
    try {
      execFileSync("node", [PRE_PUSH_HOOK_SCRIPT], {
        cwd: root,
        env,
        input: "",
        stdio: "pipe",
      });
    } catch (error) {
      failure = error as Error & { stderr?: string | Buffer; stdout?: string | Buffer };
    }

    expect(failure).not.toBeNull();
    expect(String(failure?.stdout ?? "")).toContain("Running pre-push checks in release mode.");
    expect(String(failure?.stderr ?? "")).toContain(
      "pre-push blocked: release checks cannot run because local git config has core.bare=true.",
    );
    expect(String(failure?.stderr ?? "")).toContain(
      "This indicates repository config pollution, not a release payload failure.",
    );
    expect(String(failure?.stdout ?? "")).not.toContain("== Format (check) ==");
  });

  it("blocks outgoing mutating commits without task binding", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    await writeDefaultConfig(root);
    await writeFastHookPackage(root);
    await commitAll(root, "chore: base");
    const baseSha = head(root);

    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "export const value = 1;\n", "utf8");
    await commitAll(root, "✨ code: connect managed API");
    const result = runPrePush(root, baseSha, head(root));

    expect(result.failure).not.toBeNull();
    expect(String(result.failure?.stderr ?? "")).toContain(
      "pre-push blocked: mutating commits require a valid task id",
    );
    expect(String(result.failure?.stderr ?? "")).toContain("src/app.ts");
  });

  it("includes merge commits in mutating commit audits", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    await writeDefaultConfig(root);
    await writeFastHookPackage(root);
    await mkdir(path.join(root, ".agentplane", "tasks", "202601010101-ABCDEF"), {
      recursive: true,
    });
    await writeFile(
      path.join(root, ".agentplane", "tasks", "202601010101-ABCDEF", "README.md"),
      "task\n",
      "utf8",
    );
    await commitAll(root, "chore: base");
    const baseSha = head(root);

    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", "feature"], { cwd: root });
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "export const value = 1;\n", "utf8");
    await commitAll(root, "✨ ABCDEF code: connect managed API");
    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", "feature", "-m", "Merge feature branch"], {
      cwd: root,
    });
    const result = runPrePush(root, baseSha, head(root));

    expect(result.failure).not.toBeNull();
    expect(String(result.failure?.stderr ?? "")).toContain("Merge feature branch");
    expect(String(result.failure?.stderr ?? "")).toContain("src/app.ts");
  });

  it("accepts emergency hotfix commits with backfill evidence", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    await writeDefaultConfig(root);
    await writeFastHookPackage(root);
    await commitAll(root, "chore: base");
    const baseSha = head(root);

    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "export const value = 1;\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });
    await execFileAsync(
      "git",
      [
        "commit",
        "-m",
        [
          "🚑 hotfix: restore managed API",
          "",
          "Emergency-Hotfix: true",
          "Backfill-Task: 202601010101-ABCDEF",
          "Backfill-Evidence: incident ticket and rollback note recorded",
        ].join("\n"),
      ],
      { cwd: root },
    );
    const result = runPrePush(root, baseSha, head(root));

    expect(result.failure).toBeNull();
    expect(result.stdout).toContain("Running pre-push checks in standard mode.");
  });
});
