import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { access, cp, mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterAll, beforeAll } from "vitest";

import { defaultConfig } from "@agentplane/core";

const execFileAsync = promisify(execFile);

let agentplaneHome: string | null = null;
const originalAgentplaneHome = process.env.AGENTPLANE_HOME;
const recipeArchiveCache = new Map<
  string,
  { archivePath: string; manifest: Record<string, unknown> }
>();
let gitTemplateRoot: string | null = null;
let gitTemplatePromise: Promise<string> | null = null;

async function ensureGitTemplateRoot(): Promise<string> {
  if (gitTemplateRoot) return gitTemplateRoot;
  gitTemplatePromise ??= (async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-git-template-"));
    await execFileAsync("git", ["init", "-q"], { cwd: root });
    return root;
  })();
  gitTemplateRoot = await gitTemplatePromise;
  return gitTemplateRoot;
}

async function copyDirContents(src: string, dest: string): Promise<void> {
  const entries = await readdir(src, { withFileTypes: true });
  await Promise.all(
    entries.map((entry) =>
      cp(path.join(src, entry.name), path.join(dest, entry.name), { recursive: true }),
    ),
  );
}

export function registerAgentplaneHome(): void {
  beforeAll(async () => {
    agentplaneHome = await mkdtemp(path.join(os.tmpdir(), "agentplane-home-"));
    process.env.AGENTPLANE_HOME = agentplaneHome;
  });

  afterAll(async () => {
    if (agentplaneHome) {
      await rm(agentplaneHome, { recursive: true, force: true });
    }
    if (originalAgentplaneHome === undefined) {
      delete process.env.AGENTPLANE_HOME;
    } else {
      process.env.AGENTPLANE_HOME = originalAgentplaneHome;
    }
  });
}

export function getAgentplaneHome(): string | null {
  return agentplaneHome;
}

export function captureStdIO() {
  let stdout = "";
  let stderr = "";

  const origStdoutWrite = process.stdout.write.bind(process.stdout);
  const origStderrWrite = process.stderr.write.bind(process.stderr);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (process.stdout.write as any) = (chunk: unknown) => {
    stdout += String(chunk);
    return true;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (process.stderr.write as any) = (chunk: unknown) => {
    stderr += String(chunk);
    return true;
  };

  return {
    get stdout() {
      return stdout;
    },
    get stderr() {
      return stderr;
    },
    restore() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stdout.write as any) = origStdoutWrite;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stderr.write as any) = origStderrWrite;
    },
  };
}

export async function mkGitRepoRoot(): Promise<string> {
  const template = await ensureGitTemplateRoot();
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
  await copyDirContents(template, root);
  return root;
}

export async function mkTempDir(): Promise<string> {
  return await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
}

export async function writeDefaultConfig(root: string): Promise<void> {
  const agentplaneDir = path.join(root, ".agentplane");
  await mkdir(agentplaneDir, { recursive: true });
  const configPath = path.join(agentplaneDir, "config.json");
  await writeFile(configPath, JSON.stringify(defaultConfig(), null, 2), "utf8");
}

export async function writeConfig(
  root: string,
  config: ReturnType<typeof defaultConfig>,
): Promise<void> {
  const agentplaneDir = path.join(root, ".agentplane");
  await mkdir(agentplaneDir, { recursive: true });
  const configPath = path.join(agentplaneDir, "config.json");
  await writeFile(configPath, JSON.stringify(config, null, 2), "utf8");
}

export async function resetAgentplaneHomeRecipes(): Promise<void> {
  if (!agentplaneHome) return;
  await rm(path.join(agentplaneHome, "recipes"), { recursive: true, force: true });
  await rm(path.join(agentplaneHome, "recipes.json"), { force: true });
  await rm(path.join(agentplaneHome, "recipes-index.json"), { force: true });
}

export async function createRecipeArchive(opts?: {
  id?: string;
  version?: string;
  name?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  format?: "tar" | "zip";
  wrapDir?: boolean;
}): Promise<{ archivePath: string; manifest: Record<string, unknown> }> {
  const normalizedTags = opts?.tags ? [...opts.tags].toSorted() : undefined;
  const cacheKey = JSON.stringify({
    id: opts?.id ?? "viewer",
    version: opts?.version ?? "1.2.3",
    name: opts?.name ?? "Viewer",
    summary: opts?.summary ?? "Preview task artifacts",
    description: opts?.description ?? "Provides a local viewer for task artifacts.",
    tags: normalizedTags,
    format: opts?.format ?? "tar",
    wrapDir: opts?.wrapDir ?? false,
  });
  const cached = recipeArchiveCache.get(cacheKey);
  if (cached) return cached;

  const baseDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipe-"));
  const recipeDir = path.join(baseDir, opts?.wrapDir ? "bundle" : "recipe");
  await mkdir(recipeDir, { recursive: true });
  const manifest: Record<string, unknown> = {
    schema_version: "1",
    id: opts?.id ?? "viewer",
    version: opts?.version ?? "1.2.3",
    name: opts?.name ?? "Viewer",
    summary: opts?.summary ?? "Preview task artifacts",
    description: opts?.description ?? "Provides a local viewer for task artifacts.",
    agents: [{ id: "RECIPE_AGENT", summary: "Recipe agent", file: "agents/recipe.json" }],
    tools: [
      { id: "RECIPE_TOOL", summary: "Recipe tool", runtime: "bash", entrypoint: "tools/run.sh" },
    ],
    scenarios: [{ id: "RECIPE_SCENARIO", summary: "Recipe scenario" }],
  };
  if (normalizedTags) {
    manifest.tags = normalizedTags;
  }
  await writeFile(path.join(recipeDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  const agentsDir = path.join(recipeDir, "agents");
  await mkdir(agentsDir, { recursive: true });
  await writeFile(
    path.join(agentsDir, "recipe.json"),
    JSON.stringify(
      {
        id: "RECIPE_AGENT",
        role: "Recipe agent",
        description: "Example agent installed from a recipe.",
      },
      null,
      2,
    ),
    "utf8",
  );
  const toolsDir = path.join(recipeDir, "tools");
  await mkdir(toolsDir, { recursive: true });
  await writeFile(
    path.join(toolsDir, "run.sh"),
    [
      "#!/usr/bin/env bash",
      "set -euo pipefail",
      'echo "ok" > "$AGENTPLANE_RUN_DIR/artifact.txt"',
    ].join("\n"),
    "utf8",
  );
  const scenariosDir = path.join(recipeDir, "scenarios");
  await mkdir(scenariosDir, { recursive: true });
  await writeFile(
    path.join(scenariosDir, "recipe-scenario.json"),
    JSON.stringify(
      {
        schema_version: "1",
        id: "RECIPE_SCENARIO",
        summary: "Recipe scenario",
        goal: "Preview installed tasks.",
        inputs: [{ name: "task_id", type: "string" }],
        outputs: [{ name: "report", type: "html" }],
        steps: [{ tool: "RECIPE_TOOL" }],
      },
      null,
      2,
    ),
    "utf8",
  );
  const format = opts?.format ?? "tar";
  const archivePath =
    format === "zip" ? path.join(baseDir, "recipe.zip") : path.join(baseDir, "recipe.tar.gz");
  if (format === "zip") {
    await (opts?.wrapDir
      ? execFileAsync("zip", ["-qr", archivePath, path.basename(recipeDir)], { cwd: baseDir })
      : execFileAsync("zip", ["-qr", archivePath, "."], { cwd: recipeDir }));
  } else {
    await (opts?.wrapDir
      ? execFileAsync("tar", ["-czf", archivePath, "-C", baseDir, path.basename(recipeDir)])
      : execFileAsync("tar", ["-czf", archivePath, "-C", recipeDir, "."]));
  }
  const payload = { archivePath, manifest };
  recipeArchiveCache.set(cacheKey, payload);
  return payload;
}

export async function createRecipeArchiveWithManifest(opts: {
  manifest: Record<string, unknown>;
  files?: Record<string, string>;
  format?: "tar" | "zip";
  wrapDir?: boolean;
}): Promise<string> {
  const baseDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipe-bad-"));
  const recipeDir = path.join(baseDir, opts.wrapDir ? "bundle" : "recipe");
  await mkdir(recipeDir, { recursive: true });
  await writeFile(path.join(recipeDir, "manifest.json"), JSON.stringify(opts.manifest, null, 2));
  if (opts.files) {
    for (const [relPath, content] of Object.entries(opts.files)) {
      const fullPath = path.join(recipeDir, relPath);
      await mkdir(path.dirname(fullPath), { recursive: true });
      await writeFile(fullPath, content, "utf8");
    }
  }
  const format = opts.format ?? "tar";
  const archivePath =
    format === "zip" ? path.join(baseDir, "recipe.zip") : path.join(baseDir, "recipe.tar.gz");
  if (format === "zip") {
    await (opts.wrapDir
      ? execFileAsync("zip", ["-qr", archivePath, path.basename(recipeDir)], { cwd: baseDir })
      : execFileAsync("zip", ["-qr", archivePath, "."], { cwd: recipeDir }));
  } else {
    await (opts.wrapDir
      ? execFileAsync("tar", ["-czf", archivePath, "-C", baseDir, path.basename(recipeDir)])
      : execFileAsync("tar", ["-czf", archivePath, "-C", recipeDir, "."]));
  }
  return archivePath;
}

export async function createUpgradeBundle(files: Record<string, string>): Promise<{
  bundlePath: string;
  checksumPath: string;
}> {
  const baseDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-upgrade-bundle-"));
  const bundleDir = path.join(baseDir, "bundle");
  await mkdir(bundleDir, { recursive: true });
  for (const [relPath, content] of Object.entries(files)) {
    const fullPath = path.join(bundleDir, relPath);
    await mkdir(path.dirname(fullPath), { recursive: true });
    await writeFile(fullPath, content, "utf8");
  }
  const bundlePath = path.join(baseDir, "agentplane-upgrade.tar.gz");
  await execFileAsync("tar", ["-czf", bundlePath, "-C", bundleDir, "."]);
  const checksum = createHash("sha256")
    .update(await readFile(bundlePath))
    .digest("hex");
  const checksumPath = `${bundlePath}.sha256`;
  await writeFile(checksumPath, `${checksum}  agentplane-upgrade.tar.gz\n`, "utf8");
  return { bundlePath, checksumPath };
}

export async function mkGitRepoRootWithBranch(branch: string): Promise<string> {
  const root = await mkGitRepoRoot();
  await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
  return root;
}

export async function configureGitUser(root: string): Promise<void> {
  await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Test User"], { cwd: root });
}

export function cleanGitEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env };
  delete env.GIT_DIR;
  delete env.GIT_WORK_TREE;
  delete env.GIT_COMMON_DIR;
  delete env.GIT_INDEX_FILE;
  delete env.GIT_OBJECT_DIRECTORY;
  delete env.GIT_ALTERNATE_OBJECT_DIRECTORIES;
  return env;
}

export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function gitBranchExists(root: string, branch: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["show-ref", "--verify", "--quiet", `refs/heads/${branch}`], {
      cwd: root,
      env: cleanGitEnv(),
    });
    return true;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1) return false;
    throw err;
  }
}

export async function commitAll(root: string, message: string): Promise<void> {
  await execFileAsync("git", ["add", "."], { cwd: root });
  await execFileAsync("git", ["commit", "-m", message], { cwd: root });
}

export async function stageGitignoreIfPresent(root: string): Promise<void> {
  const gitignorePath = path.join(root, ".gitignore");
  if (!(await pathExists(gitignorePath))) return;
  await execFileAsync("git", ["add", ".gitignore"], { cwd: root });
}
