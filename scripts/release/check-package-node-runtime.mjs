import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const SUPPORTED_PACKAGES = new Set(["packages/core", "packages/recipes"]);

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["package-dir", "tarball-dir"],
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  if (!flags["package-dir"] || !flags["tarball-dir"]) {
    throw new Error("--package-dir and --tarball-dir are required");
  }
  if (!SUPPORTED_PACKAGES.has(flags["package-dir"])) {
    throw new Error(`unsupported package directory: ${flags["package-dir"]}`);
  }
  return {
    packageDir: flags["package-dir"],
    tarballDir: path.resolve(flags["tarball-dir"]),
  };
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function minimumNodeVersion(engine) {
  const match = /^>=\s*(\d+)(?:\.(\d+))?(?:\.(\d+))?$/u.exec(engine);
  if (!match) throw new Error(`unsupported Node engine contract: ${engine}`);
  return match.slice(1, 4).map((value) => Number.parseInt(value ?? "0", 10));
}

function compareVersions(left, right) {
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return 0;
}

function importTarget(value) {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return typeof value.import === "string"
    ? value.import
    : typeof value.default === "string"
      ? value.default
      : null;
}

async function importPublicExports(packageRoot, manifest) {
  const imported = new Map();
  for (const [subpath, value] of Object.entries(manifest.exports ?? {})) {
    if (subpath === "./package.json") continue;
    const target = importTarget(value);
    assert.ok(target, `${manifest.name} ${subpath} omits an importable ESM target`);
    const modulePath = path.resolve(packageRoot, target);
    const namespace = await import(pathToFileURL(modulePath).href);
    assert.ok(Object.keys(namespace).length > 0, `${manifest.name} ${subpath} exports nothing`);
    imported.set(subpath, namespace);
  }
  assert.ok(imported.has("."), `${manifest.name} package root export is missing`);
  return imported;
}

function exercisePublicApi(name, rootModule) {
  if (name === "@agentplaneorg/core") {
    assert.equal(typeof rootModule.defaultConfig, "function");
    assert.equal(typeof rootModule.renderExecutionReceiptSchemaJson, "function");
    const config = rootModule.defaultConfig();
    assert.ok(
      config.workflow_mode === "direct" || config.workflow_mode === "branch_pr",
      "core defaultConfig returned an unsupported workflow mode",
    );
    const executionReceiptSchema = JSON.parse(rootModule.renderExecutionReceiptSchemaJson());
    assert.equal(
      executionReceiptSchema.$id,
      "https://agentplane.org/schemas/execution-receipt.schema.json",
    );
    assert.equal(executionReceiptSchema.oneOf?.length, 2);
    return;
  }

  assert.equal(name, "@agentplaneorg/recipes");
  assert.equal(typeof rootModule.normalizeRecipeId, "function");
  assert.equal(rootModule.normalizeRecipeId("  node-runtime-smoke  "), "node-runtime-smoke");
  assert.equal(typeof rootModule.RECIPES_VERSION, "string");
  assert.ok(rootModule.RECIPES_VERSION.length > 0, "recipes version is empty");
}

const main = defineCheck({
  name: "check-package-node-runtime.mjs",
  parseArgs,
  async check({ cwd, options, stdout }) {
    const sourceManifest = readJson(path.resolve(cwd, options.packageDir, "package.json"));
    const engine = sourceManifest.engines?.node;
    assert.equal(typeof engine, "string", `${sourceManifest.name} does not declare engines.node`);

    const runtimeVersion = process.versions.node
      .split(".")
      .map((value) => Number.parseInt(value, 10));
    assert.ok(
      compareVersions(runtimeVersion, minimumNodeVersion(engine)) >= 0,
      `Node ${process.versions.node} does not satisfy ${sourceManifest.name} engines.node=${engine}`,
    );

    const tarballs = readdirSync(options.tarballDir)
      .filter((entry) => entry.endsWith(".tgz"))
      .toSorted();
    assert.equal(tarballs.length, 1, "tarball directory must contain exactly one .tgz artifact");
    const tarballPath = path.join(options.tarballDir, tarballs[0]);
    const installRoot = mkdtempSync(path.join(os.tmpdir(), "agentplane-node-runtime-"));

    try {
      writeFileSync(
        path.join(installRoot, "package.json"),
        `${JSON.stringify({ name: "agentplane-node-runtime-smoke", private: true }, null, 2)}\n`,
        "utf8",
      );
      const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
      execFileSync(
        npmCommand,
        ["install", "--ignore-scripts", "--engine-strict", "--no-audit", "--no-fund", tarballPath],
        {
          cwd: installRoot,
          encoding: "utf8",
          env: {
            ...process.env,
            NPM_CONFIG_CACHE: path.join(installRoot, "npm-cache"),
          },
          stdio: ["ignore", "pipe", "pipe"],
        },
      );

      const packageRoot = path.join(
        installRoot,
        "node_modules",
        ...String(sourceManifest.name).split("/"),
      );
      const installedManifest = readJson(path.join(packageRoot, "package.json"));
      assert.equal(installedManifest.name, sourceManifest.name);
      assert.equal(installedManifest.version, sourceManifest.version);
      assert.equal(installedManifest.engines?.node, engine);

      const publicExports = await importPublicExports(packageRoot, installedManifest);
      exercisePublicApi(installedManifest.name, publicExports.get("."));
      stdout.write(
        `package Node runtime smoke OK (${installedManifest.name}@${installedManifest.version}; ` +
          `node=${process.versions.node}; exports=${publicExports.size})\n`,
      );
    } finally {
      rmSync(installRoot, { recursive: true, force: true });
    }
  },
});

runScriptMain(main);
