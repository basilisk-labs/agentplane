import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { access, cp, mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { gzipSync } from "node:zlib";
import { afterAll, afterEach, beforeAll } from "vitest";

import { defaultConfig } from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";

const execFileAsync = promisify(execFile);

let agentplaneHome: string | null = null;
const testRoots = new Set<string>();
const originalAgentplaneHome = process.env.AGENTPLANE_HOME;
const originalNoUpdateCheck = process.env.AGENTPLANE_NO_UPDATE_CHECK;
const originalGitAuthorName = process.env.GIT_AUTHOR_NAME;
const originalGitAuthorEmail = process.env.GIT_AUTHOR_EMAIL;
const originalGitCommitterName = process.env.GIT_COMMITTER_NAME;
const originalGitCommitterEmail = process.env.GIT_COMMITTER_EMAIL;
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);
let stdioSilenceDepth = 0;
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
    // Tests must not rely on global git config. Configure author identity locally
    // so any helper that creates commits works in CI.
    await execFileAsync("git", ["config", "user.email", "agentplane-test@example.com"], {
      cwd: root,
    });
    await execFileAsync("git", ["config", "user.name", "agentplane-test"], { cwd: root });
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
    process.env.AGENTPLANE_NO_UPDATE_CHECK = "1";
    // Keep tests hermetic: never rely on global git config for commit authorship.
    process.env.GIT_AUTHOR_NAME ??= "agentplane-test";
    process.env.GIT_AUTHOR_EMAIL ??= "agentplane-test@example.com";
    process.env.GIT_COMMITTER_NAME ??= "agentplane-test";
    process.env.GIT_COMMITTER_EMAIL ??= "agentplane-test@example.com";
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
    if (originalNoUpdateCheck === undefined) {
      delete process.env.AGENTPLANE_NO_UPDATE_CHECK;
    } else {
      process.env.AGENTPLANE_NO_UPDATE_CHECK = originalNoUpdateCheck;
    }
    if (originalGitAuthorName === undefined) delete process.env.GIT_AUTHOR_NAME;
    else process.env.GIT_AUTHOR_NAME = originalGitAuthorName;
    if (originalGitAuthorEmail === undefined) delete process.env.GIT_AUTHOR_EMAIL;
    else process.env.GIT_AUTHOR_EMAIL = originalGitAuthorEmail;
    if (originalGitCommitterName === undefined) delete process.env.GIT_COMMITTER_NAME;
    else process.env.GIT_COMMITTER_NAME = originalGitCommitterName;
    if (originalGitCommitterEmail === undefined) delete process.env.GIT_COMMITTER_EMAIL;
    else process.env.GIT_COMMITTER_EMAIL = originalGitCommitterEmail;
  });

  afterEach(async () => {
    const roots = [...testRoots];
    testRoots.clear();
    await Promise.all(
      roots.map(async (root) => {
        await rm(path.join(root, ".agentplane", ".upgrade"), { recursive: true, force: true });
        await rm(path.join(root, ".agentplane", ".release"), { recursive: true, force: true });
      }),
    );
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

export function silenceStdIO(): () => void {
  if (stdioSilenceDepth === 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.stdout.write as any) = () => true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.stderr.write as any) = () => true;
  }
  stdioSilenceDepth += 1;
  return () => {
    stdioSilenceDepth -= 1;
    if (stdioSilenceDepth <= 0) {
      stdioSilenceDepth = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stdout.write as any) = originalStdoutWrite;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stderr.write as any) = originalStderrWrite;
    }
  };
}

export async function runCliSilent(args: string[]): Promise<number> {
  const io = captureStdIO();
  try {
    return await runCli(args);
  } finally {
    io.restore();
  }
}

export async function mkGitRepoRoot(): Promise<string> {
  const template = await ensureGitTemplateRoot();
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
  await copyDirContents(template, root);
  testRoots.add(root);
  return root;
}

export async function mkTempDir(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
  testRoots.add(root);
  return root;
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

export async function createUnsafeRecipeArchive(opts: {
  format: "tar" | "zip";
  entryPath?: string;
}): Promise<string> {
  const baseDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipe-unsafe-"));
  const recipeDir = path.join(baseDir, "recipe");
  await mkdir(recipeDir, { recursive: true });
  const manifest: Record<string, unknown> = {
    schema_version: "1",
    id: "unsafe",
    version: "0.0.1",
    name: "Unsafe",
    summary: "Unsafe recipe",
    description: "Used for archive validation tests.",
    agents: [{ id: "RECIPE_AGENT", summary: "Recipe agent", file: "agents/recipe.json" }],
    tools: [
      { id: "RECIPE_TOOL", summary: "Recipe tool", runtime: "bash", entrypoint: "tools/run.sh" },
    ],
    scenarios: [{ id: "RECIPE_SCENARIO", summary: "Recipe scenario" }],
  };
  await writeFile(path.join(recipeDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  const agentsDir = path.join(recipeDir, "agents");
  await mkdir(agentsDir, { recursive: true });
  await writeFile(
    path.join(agentsDir, "recipe.json"),
    JSON.stringify({ id: "RECIPE_AGENT", role: "Recipe agent" }, null, 2),
    "utf8",
  );
  const toolsDir = path.join(recipeDir, "tools");
  await mkdir(toolsDir, { recursive: true });
  await writeFile(path.join(toolsDir, "run.sh"), "#!/usr/bin/env bash\n", "utf8");
  const scenariosDir = path.join(recipeDir, "scenarios");
  await mkdir(scenariosDir, { recursive: true });
  await writeFile(
    path.join(scenariosDir, "recipe-scenario.json"),
    JSON.stringify(
      { schema_version: "1", id: "RECIPE_SCENARIO", summary: "Recipe scenario" },
      null,
      2,
    ),
    "utf8",
  );
  const entryPath = opts.entryPath ?? "../evil.txt";
  await writeFile(path.join(baseDir, "evil.txt"), "evil", "utf8");
  const archivePath =
    opts.format === "zip" ? path.join(baseDir, "unsafe.zip") : path.join(baseDir, "unsafe.tar.gz");
  if (opts.format === "zip") {
    await execFileAsync("zip", ["-qr", archivePath, ".", entryPath], { cwd: recipeDir });
    return archivePath;
  }

  // Build a deterministic tar.gz containing a traversal entry, without relying on system tar behavior.
  // This keeps the archive validation tests stable across GNU tar / bsdtar.
  const tar = buildTar([
    {
      name: "./manifest.json",
      data: Buffer.from(JSON.stringify(manifest, null, 2) + "\n", "utf8"),
    },
    { name: entryPath, data: Buffer.from("evil\n", "utf8") },
  ]);
  const gz = gzipSync(tar);
  await writeFile(archivePath, gz);
  return archivePath;
}

function buildTar(entries: { name: string; data: Buffer }[]): Buffer {
  const out: Buffer[] = [];
  for (const ent of entries) {
    const header = tarHeader({
      name: ent.name,
      size: ent.data.length,
      mtime: 0,
      typeflag: "0",
    });
    out.push(header, ent.data, zeroPadTo512(ent.data.length));
  }
  // Two empty blocks mark end-of-archive.
  out.push(Buffer.alloc(1024, 0));
  return Buffer.concat(out);
}

function zeroPadTo512(n: number): Buffer {
  const rem = n % 512;
  if (rem === 0) return Buffer.alloc(0);
  return Buffer.alloc(512 - rem, 0);
}

function tarHeader(opts: { name: string; size: number; mtime: number; typeflag: string }): Buffer {
  const buf = Buffer.alloc(512, 0);
  writeTarString(buf, 0, 100, opts.name);
  writeTarOctal(buf, 100, 8, 0o644); // mode
  writeTarOctal(buf, 108, 8, 0); // uid
  writeTarOctal(buf, 116, 8, 0); // gid
  writeTarOctal(buf, 124, 12, opts.size);
  writeTarOctal(buf, 136, 12, opts.mtime);

  // checksum field must be treated as spaces for calculation
  buf.fill(0x20, 148, 156);
  writeTarString(buf, 156, 1, opts.typeflag);
  writeTarString(buf, 257, 6, "ustar"); // magic
  writeTarString(buf, 263, 2, "00"); // version

  const sum = buf.reduce((acc, b) => acc + b, 0);
  writeTarChecksum(buf, sum);
  return buf;
}

function writeTarString(buf: Buffer, offset: number, length: number, value: string): void {
  const b = Buffer.from(value, "utf8");
  b.copy(buf, offset, 0, Math.min(length, b.length));
}

function writeTarOctal(buf: Buffer, offset: number, length: number, value: number): void {
  const raw = Math.max(0, value).toString(8);
  const padded = raw.padStart(length - 1, "0") + "\0";
  writeTarString(buf, offset, length, padded);
}

function writeTarChecksum(buf: Buffer, sum: number): void {
  // 6 digits, NUL, space (common convention).
  const raw = Math.max(0, sum).toString(8).padStart(6, "0");
  writeTarString(buf, 148, 8, `${raw}\0 `);
}

export async function createUpgradeBundle(files: Record<string, string>): Promise<{
  bundlePath: string;
  checksumPath: string;
}> {
  const manifestUrl = new URL("../../assets/framework.manifest.json", import.meta.url);
  const manifestText =
    typeof files["framework.manifest.json"] === "string"
      ? files["framework.manifest.json"]
      : await readFile(fileURLToPath(manifestUrl), "utf8");
  const manifest = JSON.parse(manifestText) as {
    schema_version?: number;
    files?: { path?: string; source_path?: string; type?: string; required?: boolean }[];
  };

  const normalizedFiles: Record<string, string> = {};
  for (const [relPath, content] of Object.entries(files)) {
    // Tests historically authored bundles using workspace-destination paths. Upgrade now reads
    // upstream files via manifest source_path (package assets layout).
    const mapped = relPath.startsWith(".agentplane/agents/")
      ? relPath.replace(/^\.agentplane\/agents\//, "agents/")
      : relPath;
    normalizedFiles[mapped] = content;
  }

  // Ensure the bundle always carries its manifest at the root.
  normalizedFiles["framework.manifest.json"] ??= manifestText;

  if (manifest.schema_version === 1 && Array.isArray(manifest.files)) {
    for (const entry of manifest.files) {
      if (!entry?.required) continue;
      const sourceRel = (entry.source_path ?? entry.path ?? "").trim();
      if (!sourceRel) continue;
      if (normalizedFiles[sourceRel] !== undefined) continue;

      if (entry.type === "json") normalizedFiles[sourceRel] = "{}\n";
      else if (sourceRel.endsWith(".md")) normalizedFiles[sourceRel] = "# AGENTS\n";
      else normalizedFiles[sourceRel] = "\n";
    }
  }

  const baseDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-upgrade-bundle-"));
  const bundleDir = path.join(baseDir, "bundle");
  await mkdir(bundleDir, { recursive: true });
  for (const [relPath, content] of Object.entries(normalizedFiles)) {
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
