import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { gzipSync } from "node:zlib";

const execFileAsync = promisify(execFile);

const recipeArchiveCache = new Map<
  string,
  { archivePath: string; baseDir: string; manifest: Record<string, unknown> }
>();

export async function resetRecipeArchiveCache(): Promise<void> {
  const cachedRoots = [...new Set([...recipeArchiveCache.values()].map((entry) => entry.baseDir))];
  recipeArchiveCache.clear();
  await Promise.all(cachedRoots.map((root) => rm(root, { recursive: true, force: true })));
}

export async function createRecipeArchive(opts?: {
  id?: string;
  version?: string;
  name?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  scenarioTags?: string[];
  blueprintExtensions?: Record<string, unknown>[];
  format?: "tar" | "zip";
  wrapDir?: boolean;
}): Promise<{ archivePath: string; manifest: Record<string, unknown> }> {
  const normalizedTags = opts?.tags ? [...opts.tags].toSorted() : undefined;
  const normalizedScenarioTags = opts?.scenarioTags ? [...opts.scenarioTags].toSorted() : undefined;
  const blueprintExtensions = opts?.blueprintExtensions ? [...opts.blueprintExtensions] : undefined;
  const cacheKey = JSON.stringify({
    id: opts?.id ?? "viewer",
    version: opts?.version ?? "1.2.3",
    name: opts?.name ?? "Viewer",
    summary: opts?.summary ?? "Preview task artifacts",
    description: opts?.description ?? "Provides a local viewer for task artifacts.",
    tags: normalizedTags,
    scenarioTags: normalizedScenarioTags,
    blueprintExtensions,
    format: opts?.format ?? "tar",
    wrapDir: opts?.wrapDir ?? false,
  });
  const cached = recipeArchiveCache.get(cacheKey);
  if (cached) return { archivePath: cached.archivePath, manifest: cached.manifest };

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
    compatibility: {
      min_agentplane_version: "0.3.5",
      manifest_api_version: "1",
      scenario_api_version: "1",
      runtime_api_version: "1",
      platforms: ["darwin", "linux"],
      repo_types: ["generic"],
    },
    skills: [
      {
        id: "RECIPE_SKILL",
        summary: "Recipe analysis skill",
        file: "skills/analysis.md",
      },
    ],
    agents: [
      {
        id: "RECIPE_AGENT",
        display_name: "Recipe Agent",
        role: "executor",
        summary: "Recipe agent",
        skills: ["RECIPE_SKILL"],
        tools: ["RECIPE_TOOL"],
        file: "agents/recipe.md",
      },
    ],
    tools: [
      { id: "RECIPE_TOOL", summary: "Recipe tool", runtime: "node", entrypoint: "tools/run.js" },
    ],
    scenarios: [
      {
        id: "RECIPE_SCENARIO",
        name: "Recipe Scenario",
        summary: "Recipe scenario",
        use_when: ["Task artifacts need local preview"],
        required_inputs: ["task_id"],
        outputs: ["report"],
        permissions: ["filesystem-write"],
        artifacts: ["artifact.txt"],
        agents_involved: ["RECIPE_AGENT"],
        skills_used: ["RECIPE_SKILL"],
        tools_used: ["RECIPE_TOOL"],
        run_profile: {
          mode: "analysis",
          sandbox: "workspace-write",
          writes_artifacts_to: ["logs/", "reports/"],
        },
        file: "scenarios/recipe-scenario.json",
      },
    ],
  };
  if (normalizedTags) {
    manifest.tags = normalizedTags;
  }
  if (blueprintExtensions) {
    manifest.blueprint_extensions = blueprintExtensions;
  }
  await writeFile(path.join(recipeDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  const agentsDir = path.join(recipeDir, "agents");
  await mkdir(agentsDir, { recursive: true });
  await writeFile(
    path.join(agentsDir, "recipe.md"),
    [
      "# Recipe Agent",
      "",
      "Role: executor",
      "",
      "Instructions:",
      "- Use recipe local policy.",
      "- Materialize the declared scenario artifacts.",
    ].join("\n"),
    "utf8",
  );
  const skillsDir = path.join(recipeDir, "skills");
  await mkdir(skillsDir, { recursive: true });
  await writeFile(
    path.join(skillsDir, "analysis.md"),
    [
      "# Recipe Skill",
      "",
      "- Inspect the generated bundle before acting.",
      "- Keep recipe-owned artifacts inside the declared output paths.",
    ].join("\n"),
    "utf8",
  );
  const toolsDir = path.join(recipeDir, "tools");
  await mkdir(toolsDir, { recursive: true });
  await writeFile(
    path.join(toolsDir, "run.js"),
    [
      'const fs = require("node:fs");',
      'fs.writeFileSync(process.env.AGENTPLANE_RUN_DIR + "/artifact.txt", "ok");',
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
        task_template: {
          title: "Recipe scenario task",
          description: "Materialize a task from the recipe scenario.",
          owner: "CODER",
          priority: "med",
          tags: normalizedScenarioTags ?? ["code", "recipes"],
          verify: ["bunx vitest run packages/agentplane/src/commands/recipes.scenario.test.ts"],
          doc: {
            summary: "Recipe-backed task execution.",
            scope: "Run the scenario without task materialization heuristics.",
            plan: "1. Materialize the task. 2. Execute the shared runner.",
            verify_steps: "1. Run scenario execution tests.",
            rollback_plan: "Revert the generated task and runner artifacts.",
          },
        },
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
  const payload = { archivePath, baseDir, manifest };
  recipeArchiveCache.set(cacheKey, payload);
  return { archivePath: payload.archivePath, manifest: payload.manifest };
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
    skills: [
      {
        id: "RECIPE_SKILL",
        summary: "Recipe skill",
        file: "skills/recipe.md",
      },
    ],
    agents: [
      {
        id: "RECIPE_AGENT",
        display_name: "Recipe Agent",
        role: "executor",
        summary: "Recipe agent",
        skills: ["RECIPE_SKILL"],
        tools: ["RECIPE_TOOL"],
        file: "agents/recipe.md",
      },
    ],
    tools: [
      { id: "RECIPE_TOOL", summary: "Recipe tool", runtime: "bash", entrypoint: "tools/run.sh" },
    ],
    scenarios: [
      {
        id: "RECIPE_SCENARIO",
        name: "Recipe Scenario",
        summary: "Recipe scenario",
        use_when: ["Unsafe validation fixture"],
        required_inputs: [],
        outputs: [],
        permissions: [],
        artifacts: [],
        agents_involved: ["RECIPE_AGENT"],
        skills_used: ["RECIPE_SKILL"],
        tools_used: ["RECIPE_TOOL"],
        run_profile: { mode: "analysis" },
        file: "scenarios/recipe-scenario.json",
      },
    ],
  };
  await writeFile(path.join(recipeDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  const agentsDir = path.join(recipeDir, "agents");
  await mkdir(agentsDir, { recursive: true });
  await writeFile(
    path.join(agentsDir, "recipe.md"),
    "# Recipe Agent\n\nFollow the unsafe archive validation path.\n",
    "utf8",
  );
  const skillsDir = path.join(recipeDir, "skills");
  await mkdir(skillsDir, { recursive: true });
  await writeFile(
    path.join(skillsDir, "recipe.md"),
    "# Recipe Skill\n\nInspect archive contents before materialization.\n",
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
      {
        schema_version: "1",
        id: "RECIPE_SCENARIO",
        summary: "Recipe scenario",
        goal: "Exercise unsafe archive validation.",
        task_template: {
          title: "Unsafe archive task",
          description: "Validate unsafe archive handling.",
          owner: "CODER",
        },
        inputs: [],
        outputs: [],
        steps: [{ tool: "RECIPE_TOOL" }],
      },
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
  writeTarOctal(buf, 100, 8, 0o644);
  writeTarOctal(buf, 108, 8, 0);
  writeTarOctal(buf, 116, 8, 0);
  writeTarOctal(buf, 124, 12, opts.size);
  writeTarOctal(buf, 136, 12, opts.mtime);
  buf.fill(0x20, 148, 156);
  writeTarString(buf, 156, 1, opts.typeflag);
  writeTarString(buf, 257, 6, "ustar");
  writeTarString(buf, 263, 2, "00");

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
  const raw = Math.max(0, sum).toString(8).padStart(6, "0");
  writeTarString(buf, 148, 8, `${raw}\0 `);
}

export async function createUpgradeBundle(files: Record<string, string>): Promise<{
  bundlePath: string;
  checksumPath: string;
}> {
  const manifestUrl = new URL(
    "../../../agentplane/assets/framework.manifest.json",
    import.meta.url,
  );
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
    const mapped = relPath.startsWith(".agentplane/agents/")
      ? relPath.replace(/^\.agentplane\/agents\//, "agents/")
      : relPath;
    normalizedFiles[mapped] = content;
  }

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
