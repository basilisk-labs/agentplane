import { mkdir, mkdtemp, readFile, readdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

export async function writePackageJson(
  root: string,
  relDir: string,
  data: Record<string, unknown>,
): Promise<void> {
  const dir = path.join(root, relDir);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "package.json"), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function writeReleaseNotes(
  root: string,
  version: string,
  body = "# Notes\n",
): Promise<void> {
  const releasesDir = path.join(root, "docs", "releases");
  await mkdir(releasesDir, { recursive: true });
  await writeFile(path.join(releasesDir, `v${version}.md`), body, "utf8");
}

export async function withDryRunReleaseMode<T>(work: () => Promise<T>): Promise<T> {
  const originalDryRun = process.env.AGENTPLANE_RELEASE_DRY_RUN;
  process.env.AGENTPLANE_RELEASE_DRY_RUN = "1";
  try {
    return await work();
  } finally {
    if (originalDryRun === undefined) {
      delete process.env.AGENTPLANE_RELEASE_DRY_RUN;
    } else {
      process.env.AGENTPLANE_RELEASE_DRY_RUN = originalDryRun;
    }
  }
}

export async function listReleasePlanRuns(root: string): Promise<string[]> {
  const dir = path.join(root, ".agentplane", ".release", "plan");
  const runNames = await readdir(dir);
  return runNames
    .map((s) => s.trim())
    .filter(Boolean)
    .toSorted();
}

export async function writeWorkflowMode(root: string, mode: "direct" | "branch_pr"): Promise<void> {
  const configPath = path.join(root, ".agentplane", "config.json");
  const raw = JSON.parse(await readFile(configPath, "utf8")) as Record<string, unknown>;
  raw.workflow_mode = mode;
  await writeFile(configPath, `${JSON.stringify(raw, null, 2)}\n`, "utf8");
}

export async function writeReleasePushScripts(opts: {
  root: string;
  prepublishBody?: string;
  prepublishFastBody?: string;
  prepublishHeavyBody?: string;
  registryBody: string;
}): Promise<void> {
  const heavyBody = opts.prepublishHeavyBody ?? opts.prepublishBody ?? "";
  const fastBody =
    opts.prepublishFastBody ??
    `${String.raw`process.stdout.write('release prepublish fast ok\n');`}\n`;
  await mkdir(path.join(opts.root, "scripts"), { recursive: true });
  await writeFile(
    path.join(opts.root, "package.json"),
    `${JSON.stringify(
      {
        name: "release-test-root",
        private: true,
        scripts: {
          "release:prepublish:fast": "node scripts/prepublish-fast.mjs",
          "release:prepublish:heavy": "node scripts/prepublish-heavy.mjs",
          "release:prepublish":
            "node scripts/prepublish-fast.mjs && node scripts/prepublish-heavy.mjs",
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  await writeFile(path.join(opts.root, "scripts", "prepublish-fast.mjs"), fastBody, "utf8");
  await writeFile(path.join(opts.root, "scripts", "prepublish-heavy.mjs"), heavyBody, "utf8");
  await writeFile(
    path.join(opts.root, "scripts", "check-npm-version-availability.mjs"),
    opts.registryBody,
    "utf8",
  );
}

export async function seedReleaseWorkspace(
  root: string,
  opts: {
    coreVersion?: string;
    cliVersion?: string;
    recipesVersion?: string;
    dependencyVersion?: string;
    recipesDependencyVersion?: string;
    extraDependencies?: Record<string, string>;
    extraWorkspacePackages?: {
      relDir: string;
      name: string;
      version?: string;
      private?: boolean;
    }[];
    writeNotes?: boolean;
    notesVersion?: string;
    notesBody?: string;
  } = {},
): Promise<void> {
  const coreVersion = opts.coreVersion ?? "1.2.3";
  const cliVersion = opts.cliVersion ?? coreVersion;
  const recipesVersion = opts.recipesVersion ?? cliVersion;
  const dependencyVersion = opts.dependencyVersion ?? coreVersion;
  const recipesDependencyVersion = opts.recipesDependencyVersion ?? recipesVersion;
  const dependencies: Record<string, string> = {
    "@agentplaneorg/core": dependencyVersion,
    "@agentplaneorg/recipes": recipesDependencyVersion,
  };
  if (opts.extraDependencies) {
    Object.assign(dependencies, opts.extraDependencies);
  }
  await writePackageJson(root, "packages/core", {
    name: "@agentplaneorg/core",
    version: coreVersion,
  });
  await writePackageJson(root, "packages/agentplane", {
    name: "agentplane",
    version: cliVersion,
    dependencies,
  });
  await writePackageJson(root, "packages/recipes", {
    name: "@agentplaneorg/recipes",
    version: recipesVersion,
  });
  await mkdir(path.join(root, "packages", "recipes", "src"), { recursive: true });
  await writeFile(
    path.join(root, "packages", "recipes", "src", "index.ts"),
    `export const RECIPES_VERSION = "${recipesVersion}";\n`,
    "utf8",
  );
  for (const pkg of opts.extraWorkspacePackages ?? []) {
    await writePackageJson(root, pkg.relDir, {
      name: pkg.name,
      version: pkg.version ?? "0.0.0",
      ...(pkg.private === true ? { private: true } : {}),
    });
  }
  if (opts.writeNotes) {
    await writeReleaseNotes(root, opts.notesVersion ?? cliVersion, opts.notesBody);
  }
}

export async function initReleaseWorkspace(
  opts: {
    prefix?: string;
    coreVersion?: string;
    cliVersion?: string;
    recipesVersion?: string;
    dependencyVersion?: string;
    recipesDependencyVersion?: string;
    extraDependencies?: Record<string, string>;
    extraWorkspacePackages?: {
      relDir: string;
      name: string;
      version?: string;
      private?: boolean;
    }[];
    writeNotes?: boolean;
    notesVersion?: string;
    notesBody?: string;
  } = {},
): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), opts.prefix ?? "agentplane-release-"));
  await seedReleaseWorkspace(root, opts);
  return root;
}
