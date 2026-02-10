import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, realpath, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export type RunCliResult = {
  code: number;
  stdout: string;
  stderr: string;
};

type ExecFileResult = { stdout: string; stderr: string };
type ExecFileError = NodeJS.ErrnoException & { stdout?: unknown; stderr?: unknown; code?: unknown };

function renderExecField(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (Buffer.isBuffer(v)) return v.toString("utf8");
  try {
    return JSON.stringify(v);
  } catch {
    return "[unserializable]";
  }
}

export async function makeTempDir(prefix = "agentplane-critical-"): Promise<string> {
  return await mkdtemp(path.join(os.tmpdir(), prefix));
}

export async function ensureDir(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true });
}

export async function writeText(filePath: string, content: string): Promise<void> {
  await ensureDir(path.dirname(filePath));
  await writeFile(filePath, content, "utf8");
}

export async function readText(filePath: string): Promise<string> {
  return await readFile(filePath, "utf8");
}

export async function real(p: string): Promise<string> {
  return await realpath(p);
}

export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function listDirRecursive(root: string): Promise<string[]> {
  const out: string[] = [];
  async function walk(dir: string): Promise<void> {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(dir, entry.name);
      const rel = path.relative(root, abs);
      out.push(rel);
      if (entry.isDirectory()) await walk(abs);
    }
  }
  if (await pathExists(root)) await walk(root);
  return out.toSorted((a, b) => a.localeCompare(b));
}

export async function gitInit(repoRoot: string, branch = "main"): Promise<void> {
  await ensureDir(repoRoot);
  // Use real git, but avoid reading developer global/system configs.
  await execFileAsync("git", ["init", "-q", "-b", branch], {
    cwd: repoRoot,
    env: cleanGitEnv(),
  }).catch(async () => {
    // Older git: init without -b, then create branch.
    await execFileAsync("git", ["init", "-q"], { cwd: repoRoot, env: cleanGitEnv() });
    await execFileAsync("git", ["checkout", "-q", "-b", branch], {
      cwd: repoRoot,
      env: cleanGitEnv(),
    });
  });

  // Repo-local identity to avoid relying on global git config.
  await execFileAsync("git", ["config", "user.email", "agentplane-test@example.com"], {
    cwd: repoRoot,
    env: cleanGitEnv(),
  });
  await execFileAsync("git", ["config", "user.name", "Agentplane Test"], {
    cwd: repoRoot,
    env: cleanGitEnv(),
  });
}

export async function gitCommitAll(repoRoot: string, message: string): Promise<void> {
  await execFileAsync("git", ["add", "-A"], { cwd: repoRoot, env: cleanGitEnv() });
  await execFileAsync("git", ["commit", "-m", message], { cwd: repoRoot, env: cleanGitEnv() });
}

export async function gitHead(repoRoot: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: repoRoot,
    env: cleanGitEnv(),
  });
  return String(stdout).trim();
}

export async function runCli(
  args: string[],
  opts: { cwd: string; extraEnv?: Record<string, string> },
): Promise<RunCliResult> {
  // Run as a separate process using bun to execute the TS runner.
  const runnerPath = path.join(
    process.cwd(),
    "packages",
    "agentplane",
    "src",
    "cli",
    "critical",
    "cli-runner.ts",
  );

  const isolatedHome = await makeTempDir("agentplane-critical-home-");
  const isolatedAgentplaneHome = await makeTempDir("agentplane-critical-ap-home-");

  const env: NodeJS.ProcessEnv = {
    ...process.env,
    ...cleanGitEnv(),
    HOME: isolatedHome,
    XDG_CONFIG_HOME: path.join(isolatedHome, ".config"),
    AGENTPLANE_HOME: isolatedAgentplaneHome,
    AGENTPLANE_NO_UPDATE_CHECK: "1",
    ...opts.extraEnv,
  };

  // execFileAsync throws on non-zero exit. Normalize into a stable `{code,stdout,stderr}` shape.
  let code = 0;
  let stdout = "";
  let stderr = "";
  try {
    const ok = (await execFileAsync("bun", [runnerPath, ...args], {
      cwd: opts.cwd,
      env,
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    })) as ExecFileResult;
    stdout = String(ok.stdout ?? "");
    stderr = String(ok.stderr ?? "");
  } catch (err: unknown) {
    const e = err as ExecFileError;
    stdout = renderExecField(e.stdout);
    stderr = renderExecField(e.stderr);
    code = typeof e.code === "number" ? e.code : 1;
  }

  return { code, stdout, stderr };
}

export function expectCliError(result: RunCliResult, code: number, errCode: string): void {
  if (result.code !== code) {
    throw new Error(
      `Expected exit code ${code} but got ${result.code}\n` +
        `stdout:\n${result.stdout}\n` +
        `stderr:\n${result.stderr}\n`,
    );
  }
  if (!result.stderr.includes(`error [${errCode}]`)) {
    throw new Error(
      `Expected stderr to include error [${errCode}]\n` +
        `stdout:\n${result.stdout}\n` +
        `stderr:\n${result.stderr}\n`,
    );
  }
}

export function cleanGitEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env };
  // Prevent git from inheriting caller-specific repository bindings.
  delete env.GIT_DIR;
  delete env.GIT_WORK_TREE;
  delete env.GIT_COMMON_DIR;
  delete env.GIT_INDEX_FILE;
  delete env.GIT_OBJECT_DIRECTORY;
  delete env.GIT_ALTERNATE_OBJECT_DIRECTORIES;

  // Disable global/system configs to avoid developer machine drift.
  env.GIT_CONFIG_GLOBAL = "/dev/null";
  env.GIT_CONFIG_SYSTEM = "/dev/null";
  env.GIT_TERMINAL_PROMPT = "0";

  // Provide identity for commits when commands rely on it.
  env.GIT_AUTHOR_NAME = env.GIT_AUTHOR_NAME ?? "Agentplane Test";
  env.GIT_AUTHOR_EMAIL = env.GIT_AUTHOR_EMAIL ?? "agentplane-test@example.com";
  env.GIT_COMMITTER_NAME = env.GIT_COMMITTER_NAME ?? "Agentplane Test";
  env.GIT_COMMITTER_EMAIL = env.GIT_COMMITTER_EMAIL ?? "agentplane-test@example.com";
  return env;
}
