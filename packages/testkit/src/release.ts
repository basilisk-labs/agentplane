import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
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
