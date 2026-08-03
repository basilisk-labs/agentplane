import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

export function createQualificationCommandRunner(defaultCwd) {
  return (command, args, options = {}) =>
    execFileSync(command, args, {
      cwd: options.cwd ?? defaultCwd,
      encoding: "utf8",
      env: {
        ...process.env,
        AGENTPLANE_NO_UPDATE_CHECK: "1",
        ...(options.env ?? {}),
      },
      maxBuffer: 128 * 1024 * 1024,
      stdio: options.stdio ?? ["ignore", "pipe", "pipe"],
    });
}

function installedCli(prefix) {
  return path.join(prefix, "node_modules", "agentplane", "bin", "agentplane.js");
}

export function installPublishedAgentplane({ run, prefix, cacheDirectory, version }) {
  run("npm", ["install", "--ignore-scripts", "--no-audit", "--no-fund", `agentplane@${version}`], {
    cwd: prefix,
    env: { NPM_CONFIG_CACHE: cacheDirectory },
  });
  return installedCli(prefix);
}

function packWorkspacePackage({ run, packageDirectory, packDirectory, cacheDirectory }) {
  const output = run("npm", ["pack", "--json", "--pack-destination", packDirectory], {
    cwd: packageDirectory,
    env: { NPM_CONFIG_CACHE: cacheDirectory },
  });
  const match = /(^|\n)(\[\s*\{[\s\S]*\]\s*)$/u.exec(output);
  if (!match) throw new Error(`npm pack did not return JSON for ${packageDirectory}`);
  const entry = JSON.parse(match[2])[0];
  const tarballPath = path.join(packDirectory, entry.filename);
  return {
    name: entry.name,
    path: tarballPath,
    sha256: `sha256:${createHash("sha256").update(readFileSync(tarballPath)).digest("hex")}`,
    version: entry.version,
  };
}

export function installPackedWorkspace({
  run,
  prefix,
  packDirectory,
  cacheDirectory,
  repoRoot,
  packageNames,
}) {
  const packages = packageNames.map((name) =>
    packWorkspacePackage({
      run,
      packageDirectory: path.join(repoRoot, "packages", name),
      packDirectory,
      cacheDirectory,
    }),
  );
  run(
    "npm",
    [
      "install",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
      ...packages.map((item) => item.path),
    ],
    { cwd: prefix, env: { NPM_CONFIG_CACHE: cacheDirectory } },
  );
  return { cli: installedCli(prefix), packages };
}
