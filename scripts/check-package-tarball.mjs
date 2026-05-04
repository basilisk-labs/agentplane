import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { defineScript, runScriptMain } from "./lib/script-runtime.mjs";

const SCRIPT_NAME = "check-package-tarball.mjs";
const PACKAGES = [
  { dir: "core", name: "@agentplaneorg/core" },
  { dir: "recipes", name: "@agentplaneorg/recipes" },
  { dir: "agentplane", name: "agentplane" },
];

function runNpmPack(packageDir, outDir) {
  const cacheDir = path.resolve(process.cwd(), ".agentplane", ".npm-cache");
  mkdirSync(cacheDir, { recursive: true });
  const stdout = execFileSync("npm", ["pack", "--json", "--pack-destination", outDir], {
    cwd: packageDir,
    encoding: "utf8",
    env: { ...process.env, NPM_CONFIG_CACHE: cacheDir },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const jsonMatch = /(^|\n)(\[\s*\{[\s\S]*\]\s*)$/u.exec(stdout);
  if (!jsonMatch) {
    throw new Error(`npm pack did not emit JSON inventory for ${packageDir}`);
  }
  const parsed = JSON.parse(jsonMatch[2]);
  const first = Array.isArray(parsed) ? parsed[0] : parsed;
  if (!first || !Array.isArray(first.files)) {
    throw new Error(`npm pack did not return file inventory for ${packageDir}`);
  }
  return {
    filename: path.join(outDir, String(first.filename ?? "")),
    files: first.files
      .map((entry) => String(entry.path ?? ""))
      .filter(Boolean)
      .toSorted(),
  };
}

function isDenied(pathInPackage) {
  if (pathInPackage.startsWith(".agentplane/")) return true;
  if (pathInPackage.startsWith("src/")) return true;
  if (pathInPackage.startsWith("docs/")) return true;
  if (pathInPackage.startsWith("scripts/")) return true;
  if (pathInPackage.startsWith("website/")) return true;
  if (pathInPackage.includes("/__snapshots__/")) return true;
  if (/\.(?:test|spec)\.(?:ts|tsx|js|mjs|cjs)$/u.test(pathInPackage)) return true;
  if (/\.(?:log|jsonl|tsbuildinfo|map)$/u.test(pathInPackage)) return true;
  return false;
}

function isAllowedAgentplane(pathInPackage) {
  if (["package.json", "README.md", "LICENSE"].includes(pathInPackage)) return true;
  if (pathInPackage.startsWith("assets/")) return true;
  if (
    [
      "bin/ap.js",
      "bin/agentplane.js",
      "bin/dist-guard.js",
      "bin/framework-dev-contract.js",
      "bin/runtime-context.js",
      "bin/runtime-watch.js",
      "bin/stale-dist-policy.js",
      "dist/.build-manifest.json",
      "dist/cli.d.ts",
      "dist/cli.js",
    ].includes(pathInPackage)
  ) {
    return true;
  }
  return false;
}

function isAllowedLibrary(pathInPackage, packageName) {
  if (["package.json", "README.md", "LICENSE"].includes(pathInPackage)) return true;
  if (packageName === "@agentplaneorg/core" && pathInPackage.startsWith("schemas/")) return true;
  if (pathInPackage === "dist/.build-manifest.json") return true;
  if (/^dist\/.+\.(?:js|d\.ts)$/u.test(pathInPackage)) return true;
  return false;
}

function assertSanitizedManifest(tarballPath, packageName, packageVersion) {
  const raw = execFileSync("tar", ["-xOf", tarballPath, "package/dist/.build-manifest.json"], {
    encoding: "utf8",
  });
  const manifest = JSON.parse(raw);
  const forbidden = ["package_dir", "generated_at", "watched_runtime_files"];
  const presentForbidden = forbidden.filter((key) =>
    Object.prototype.hasOwnProperty.call(manifest, key),
  );
  if (presentForbidden.length > 0) {
    throw new Error(`${packageName} package manifest leaks fields: ${presentForbidden.join(", ")}`);
  }
  if (manifest.manifest_kind !== "package") {
    throw new Error(`${packageName} package manifest must have manifest_kind=package`);
  }
  if (manifest.package_name !== packageName || manifest.package_version !== packageVersion) {
    throw new Error(`${packageName} package manifest does not match package identity`);
  }
}

function formatList(items) {
  return items.length === 0 ? "  - none" : items.map((item) => `  - ${item}`).join("\n");
}

function checkPackage(pkg, outDir) {
  const packageRoot = path.resolve(process.cwd(), "packages", pkg.dir);
  const packageJson = JSON.parse(readFileSync(path.join(packageRoot, "package.json"), "utf8"));
  const packed = runNpmPack(packageRoot, outDir);
  const files = packed.files;
  const denied = files.filter((file) => isDenied(file));
  const unexpected = files.filter((file) =>
    pkg.name === "agentplane" ? !isAllowedAgentplane(file) : !isAllowedLibrary(file, pkg.name),
  );
  const required = ["package.json", "README.md", "LICENSE", "dist/.build-manifest.json"];
  const missing = required.filter((file) => !files.includes(file));

  if (files.includes("dist/.build-manifest.json")) {
    assertSanitizedManifest(packed.filename, pkg.name, String(packageJson.version));
  }

  const failures = [];
  if (denied.length > 0) failures.push(`denied files:\n${formatList(denied)}`);
  if (unexpected.length > 0) failures.push(`unexpected files:\n${formatList(unexpected)}`);
  if (missing.length > 0) failures.push(`missing required files:\n${formatList(missing)}`);
  if (failures.length > 0) {
    throw new Error([`${pkg.name} tarball policy failed.`, ...failures].join("\n"));
  }
  return { name: pkg.name, files: files.length };
}

const main = defineScript({
  name: SCRIPT_NAME,
  async run() {
    const outDir = mkdtempSync(path.join(os.tmpdir(), "agentplane-pack-check-"));
    try {
      const results = PACKAGES.map((pkg) => checkPackage(pkg, outDir));
      process.stdout.write(
        `package tarball policy OK (${results.map((result) => `${result.name}=${result.files}`).join(", ")})\n`,
      );
    } finally {
      rmSync(outDir, { recursive: true, force: true });
    }
  },
});

runScriptMain(main);
