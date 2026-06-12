import { execFile, execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { mkGitRepoRoot, pathExists } from "@agentplane/testkit";

const PRE_PUSH_HOOK_SCRIPT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../../scripts/run-pre-push-hook.mjs",
);

describe("pre-push full-fast guard", () => {
  it("blocks unknown multi-branch push scopes before running local checks", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify(
        {
          name: "hook-test",
          private: true,
          scripts: {
            "format:check": "node scripts/format-check.mjs",
            "ci:local:fast": "node scripts/ci-fast.mjs",
          },
        },
        null,
        2,
      ),
      "utf8",
    );
    await writeFile(
      path.join(root, "scripts", "format-check.mjs"),
      'import { writeFileSync } from "node:fs";\nwriteFileSync("format-ran.txt", "yes");\n',
      "utf8",
    );
    await writeFile(
      path.join(root, "scripts", "ci-fast.mjs"),
      'import { writeFileSync } from "node:fs";\nwriteFileSync("ci-ran.txt", "yes");\n',
      "utf8",
    );

    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "package.json", "scripts"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed hook scripts"], { cwd: root });
    const remoteSha = readFileSync(path.join(root, ".git", "refs", "heads", "main"), "utf8").trim();

    await writeFile(path.join(root, "README.md"), "# hook test\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "docs: update readme"], { cwd: root });
    const localSha = readFileSync(path.join(root, ".git", "refs", "heads", "main"), "utf8").trim();

    let failure: (Error & { stderr?: string | Buffer; stdout?: string | Buffer }) | null = null;
    try {
      execFileSync("node", [PRE_PUSH_HOOK_SCRIPT], {
        cwd: root,
        input: [
          `refs/heads/main ${localSha} refs/heads/main ${remoteSha}`,
          `refs/heads/other ${localSha} refs/heads/other ${remoteSha}`,
          "",
        ].join("\n"),
        stdio: "pipe",
      });
    } catch (error) {
      failure = error as Error & { stderr?: string | Buffer; stdout?: string | Buffer };
    }

    expect(failure).not.toBeNull();
    expect(String(failure?.stderr ?? "")).toContain(
      "pre-push blocked: changed-file scope could not be bounded for this push.",
    );
    expect(String(failure?.stderr ?? "")).toContain("bun run ci:local:fast");
    await expect(pathExists(path.join(root, "format-ran.txt"))).resolves.toBe(false);
    await expect(pathExists(path.join(root, "ci-ran.txt"))).resolves.toBe(false);
  });

  it("fails fast when changed files require full-fast local CI", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane", "tasks", "202601010101-ABCDEF"), {
      recursive: true,
    });
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "tasks", "202601010101-ABCDEF", "README.md"),
      "# Task\n",
      "utf8",
    );
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify(
        {
          name: "hook-test",
          private: true,
          scripts: {
            "format:check": "node scripts/format-check.mjs",
            "ci:local:fast": "node scripts/ci-fast.mjs",
          },
        },
        null,
        2,
      ),
      "utf8",
    );
    await writeFile(
      path.join(root, "scripts", "format-check.mjs"),
      'import { writeFileSync } from "node:fs";\nwriteFileSync("format-ran.txt", "yes");\n',
      "utf8",
    );
    await writeFile(
      path.join(root, "scripts", "ci-fast.mjs"),
      'import { writeFileSync } from "node:fs";\nwriteFileSync("ci-ran.txt", "yes");\n',
      "utf8",
    );

    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".agentplane", "package.json", "scripts"], {
      cwd: root,
    });
    await execFileAsync("git", ["commit", "-m", "seed hook scripts"], { cwd: root });
    const remoteSha = readFileSync(path.join(root, ".git", "refs", "heads", "main"), "utf8").trim();

    const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8")) as {
      description?: string;
    };
    pkg.description = "broad change";
    await writeFile(path.join(root, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
    await execFileAsync("git", ["add", "package.json"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "✨ ABCDEF hooks: change package metadata"], {
      cwd: root,
    });
    const localSha = readFileSync(path.join(root, ".git", "refs", "heads", "main"), "utf8").trim();

    let failure: (Error & { stderr?: string | Buffer; stdout?: string | Buffer }) | null = null;
    try {
      execFileSync("node", [PRE_PUSH_HOOK_SCRIPT], {
        cwd: root,
        input: `refs/heads/main ${localSha} refs/heads/main ${remoteSha}\n`,
        stdio: "pipe",
      });
    } catch (error) {
      failure = error as Error & { stderr?: string | Buffer; stdout?: string | Buffer };
    }

    expect(failure).not.toBeNull();
    expect(String(failure?.stderr ?? "")).toContain(
      "pre-push blocked: changed files require the full-fast local CI lane",
    );
    expect(String(failure?.stderr ?? "")).toContain("selector=full-fast");
    expect(String(failure?.stderr ?? "")).toContain("bun run ci:local:fast");
    await expect(pathExists(path.join(root, "format-ran.txt"))).resolves.toBe(false);
    await expect(pathExists(path.join(root, "ci-ran.txt"))).resolves.toBe(false);
  });
});
