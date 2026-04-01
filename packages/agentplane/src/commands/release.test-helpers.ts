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
    dependencyVersion?: string;
    writeNotes?: boolean;
    notesVersion?: string;
    notesBody?: string;
  } = {},
): Promise<void> {
  const coreVersion = opts.coreVersion ?? "1.2.3";
  const cliVersion = opts.cliVersion ?? coreVersion;
  const dependencyVersion = opts.dependencyVersion ?? coreVersion;
  await writePackageJson(root, "packages/core", {
    name: "@agentplaneorg/core",
    version: coreVersion,
  });
  await writePackageJson(root, "packages/agentplane", {
    name: "agentplane",
    version: cliVersion,
    dependencies: {
      "@agentplaneorg/core": dependencyVersion,
    },
  });
  if (opts.writeNotes) {
    await writeReleaseNotes(root, opts.notesVersion ?? cliVersion, opts.notesBody);
  }
}

export async function initReleaseWorkspace(
  opts: {
    prefix?: string;
    coreVersion?: string;
    cliVersion?: string;
    dependencyVersion?: string;
    writeNotes?: boolean;
    notesVersion?: string;
    notesBody?: string;
  } = {},
): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), opts.prefix ?? "agentplane-release-"));
  await seedReleaseWorkspace(root, opts);
  return root;
}
