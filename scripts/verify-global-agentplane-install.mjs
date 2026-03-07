import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, realpathSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

function fail(message) {
  throw new Error(message);
}

function parseArgs(argv) {
  const args = {
    repoRoot: process.cwd(),
    npmRoot: null,
    expectedHead: null,
    showHelp: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--repo-root") {
      args.repoRoot = path.resolve(argv[index + 1] ?? "");
      index += 1;
      continue;
    }
    if (arg === "--npm-root") {
      args.npmRoot = path.resolve(argv[index + 1] ?? "");
      index += 1;
      continue;
    }
    if (arg === "--expected-head") {
      args.expectedHead = (argv[index + 1] ?? "").trim() || null;
      index += 1;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      args.showHelp = true;
      continue;
    }
    fail(`unknown argument: ${arg}`);
  }

  return args;
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function getNpmRoot(repoRoot, override) {
  if (override) return override;
  return execFileSync("npm", ["root", "-g"], { cwd: repoRoot, encoding: "utf8" }).trim();
}

function getRepoHead(repoRoot, expectedHead) {
  if (expectedHead) return expectedHead;
  return execFileSync("git", ["rev-parse", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).trim();
}

function verifyLocalBuildManifest({ packageName, installDir, expectedPackageDir, expectedHead }) {
  const manifestPath = path.join(installDir, "dist", ".build-manifest.json");
  if (!existsSync(manifestPath)) {
    fail(`${packageName} is missing dist/.build-manifest.json at ${manifestPath}`);
  }

  const manifest = readJson(manifestPath);
  if (manifest.git_head !== expectedHead) {
    fail(
      `${packageName} git_head mismatch: expected ${expectedHead}, got ${String(manifest.git_head ?? "")}`,
    );
  }

  const normalizedExpected = path.resolve(expectedPackageDir);
  const normalizedActual = path.resolve(String(manifest.package_dir ?? ""));
  if (normalizedActual !== normalizedExpected) {
    fail(
      `${packageName} was not built from this checkout: expected package_dir ${normalizedExpected}, got ${normalizedActual}`,
    );
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.showHelp) {
    process.stdout.write(
      [
        "Usage: node scripts/verify-global-agentplane-install.mjs [options]",
        "",
        "Verifies that the global agentplane install resolves both agentplane and",
        "@agentplaneorg/core from the current repository checkout rather than",
        "from published registry artifacts.",
        "",
        "Options:",
        "  --repo-root <path>       Repository root (default: cwd)",
        "  --npm-root <path>        Override `npm root -g` output",
        "  --expected-head <hash>   Override git HEAD detection",
      ].join("\n"),
    );
    return;
  }

  const repoRoot = path.resolve(args.repoRoot);
  const npmRoot = getNpmRoot(repoRoot, args.npmRoot);
  const repoHead = getRepoHead(repoRoot, args.expectedHead);

  const localAgentplaneDir = path.join(repoRoot, "packages", "agentplane");
  const localCoreDir = path.join(repoRoot, "packages", "core");
  const globalAgentplaneDir = path.join(npmRoot, "agentplane");
  const globalAgentplanePkgPath = path.join(globalAgentplaneDir, "package.json");

  if (!existsSync(globalAgentplanePkgPath)) {
    fail(`global agentplane install not found at ${globalAgentplanePkgPath}`);
  }

  const requireFromAgentplane = createRequire(globalAgentplanePkgPath);
  const resolvedCorePkgPath = requireFromAgentplane.resolve("@agentplaneorg/core/package.json");
  const resolvedCoreDir = path.dirname(resolvedCorePkgPath);

  verifyLocalBuildManifest({
    packageName: "agentplane",
    installDir: globalAgentplaneDir,
    expectedPackageDir: localAgentplaneDir,
    expectedHead: repoHead,
  });
  verifyLocalBuildManifest({
    packageName: "@agentplaneorg/core",
    installDir: resolvedCoreDir,
    expectedPackageDir: localCoreDir,
    expectedHead: repoHead,
  });

  const agentplanePkg = readJson(globalAgentplanePkgPath);
  const resolvedCorePkg = readJson(resolvedCorePkgPath);
  const localAgentplanePkg = readJson(path.join(localAgentplaneDir, "package.json"));
  const localCorePkg = readJson(path.join(localCoreDir, "package.json"));

  if (agentplanePkg.version !== localAgentplanePkg.version) {
    fail(
      `global agentplane version mismatch: expected ${localAgentplanePkg.version}, got ${agentplanePkg.version}`,
    );
  }
  if (resolvedCorePkg.version !== localCorePkg.version) {
    fail(
      `resolved @agentplaneorg/core version mismatch: expected ${localCorePkg.version}, got ${resolvedCorePkg.version}`,
    );
  }

  process.stdout.write(
    [
      "verified global framework install",
      `repo_head: ${repoHead}`,
      `agentplane_install_dir: ${realpathSync(globalAgentplaneDir)}`,
      `core_runtime_dir: ${realpathSync(resolvedCoreDir)}`,
      `agentplane_source: ${localAgentplaneDir}`,
      `core_source: ${localCoreDir}`,
    ].join("\n") + "\n",
  );
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`error: ${message}\n`);
  process.exitCode = 1;
}
