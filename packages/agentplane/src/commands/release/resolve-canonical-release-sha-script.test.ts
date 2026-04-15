import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/resolve-canonical-release-sha.mjs");

const roots: string[] = [];

function readErrorStdout(error: unknown) {
  if (error && typeof error === "object" && "stdout" in error && typeof error.stdout === "string") {
    return error.stdout;
  }
  return "";
}

async function git(cwd: string, args: string[]) {
  await execFileAsync("git", args, {
    cwd,
    env: process.env,
    maxBuffer: 20 * 1024 * 1024,
  });
}

async function writeJson(root: string, relPath: string, payload: unknown) {
  const filePath = path.join(root, relPath);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

async function commitWorkspace(
  root: string,
  message: string,
  opts: { version: string; writeNotes?: boolean; extraFile?: { path: string; content: string } },
) {
  await writeJson(root, "packages/core/package.json", {
    name: "@agentplaneorg/core",
    version: opts.version,
  });
  await writeJson(root, "packages/agentplane/package.json", {
    name: "agentplane",
    version: opts.version,
    dependencies: {
      "@agentplaneorg/core": opts.version,
    },
  });
  if (opts.writeNotes) {
    const notesPath = path.join(root, "docs", "releases", `v${opts.version}.md`);
    await mkdir(path.dirname(notesPath), { recursive: true });
    await writeFile(notesPath, `# v${opts.version}\n`, "utf8");
  }
  if (opts.extraFile) {
    const extraPath = path.join(root, opts.extraFile.path);
    await mkdir(path.dirname(extraPath), { recursive: true });
    await writeFile(extraPath, opts.extraFile.content, "utf8");
  }
  await git(root, ["add", "."]);
  await git(root, ["commit", "-m", message]);
  const result = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  return String(result.stdout ?? "").trim();
}

afterEach(async () => {
  while (roots.length > 0) {
    const root = roots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("resolve-canonical-release-sha script", () => {
  it("selects the first-parent commit that introduced the current release-ready version", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-canonical-release-sha-"));
    roots.push(root);

    await git(root, ["init", "-b", "main"]);
    await git(root, ["config", "user.name", "agentplane-test"]);
    await git(root, ["config", "user.email", "agentplane-test@example.com"]);

    await commitWorkspace(root, "baseline v0.3.11", { version: "0.3.11", writeNotes: true });
    const releaseSha = await commitWorkspace(root, "release v0.3.12", {
      version: "0.3.12",
      writeNotes: true,
    });
    await commitWorkspace(root, "closure noise", {
      version: "0.3.12",
      writeNotes: true,
      extraFile: {
        path: ".agentplane/tasks/202604151818-5M1MXG/README.md",
        content: "closure metadata\n",
      },
    });
    await commitWorkspace(root, "recovery noise", {
      version: "0.3.12",
      writeNotes: true,
      extraFile: {
        path: ".agentplane/tasks/202604151818-5M1MXG/pr/meta.json",
        content: "{}\n",
      },
    });

    const result = await execFileAsync("node", [SCRIPT_PATH, "--json"], { cwd: root });
    const payload = JSON.parse(String(result.stdout ?? "")) as {
      ok: boolean;
      sha: string | null;
      version: string;
      tag: string;
    };

    expect(payload.ok).toBe(true);
    expect(payload.sha).toBe(releaseSha);
    expect(payload.version).toBe("0.3.12");
    expect(payload.tag).toBe("v0.3.12");
  });

  it("fails when the current ref is not release-ready", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-canonical-release-sha-"));
    roots.push(root);

    await git(root, ["init", "-b", "main"]);
    await git(root, ["config", "user.name", "agentplane-test"]);
    await git(root, ["config", "user.email", "agentplane-test@example.com"]);

    await commitWorkspace(root, "version bump without notes", {
      version: "0.3.12",
      writeNotes: false,
    });

    let stdout = "";
    try {
      await execFileAsync("node", [SCRIPT_PATH, "--json"], { cwd: root });
    } catch (error) {
      stdout = readErrorStdout(error);
    }
    const payload = JSON.parse(stdout) as {
      ok: boolean;
      message: string;
      nextAction: string;
    };

    expect(payload.ok).toBe(false);
    expect(payload.message).toContain("not release-ready");
    expect(payload.nextAction).toContain("version parity and release notes");
  });
});
