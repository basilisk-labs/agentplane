import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync, rmSync, copyFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const checker = fileURLToPath(new URL("check-package-node-runtime.mjs", import.meta.url));
const version = "99.88.77-unpublished";

function fixture(
  t,
  {
    coreVersion = version,
    coreName = "@agentplaneorg/core",
    coreEngine = ">=20",
    paired = true,
    badExport = false,
  } = {},
) {
  const root = mkdtempSync(path.join(os.tmpdir(), "paired-runtime-test-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const recipes = {
    name: "@agentplaneorg/recipes",
    version,
    type: "module",
    engines: { node: ">=20" },
    exports: { ".": "./index.js", "./package.json": "./package.json" },
    scripts: {
      preinstall: "node -e 'process.exit(97)'",
      postinstall: "node -e 'process.exit(98)'",
    },
    ...(paired ? { dependencies: { "@agentplaneorg/core": version } } : {}),
  };
  const core = {
    name: coreName,
    version: coreVersion,
    type: "module",
    engines: { node: coreEngine },
    exports: { ".": "./index.js", "./package.json": "./package.json" },
    scripts: { install: "node -e 'process.exit(99)'" },
  };
  for (const [name, manifest, source] of [
    ["core", core, `export const candidate = ${JSON.stringify(coreVersion)};`],
    [
      "recipes",
      recipes,
      badExport
        ? "throw new Error('public import rejected');"
        : `${paired ? `import { candidate } from '@agentplaneorg/core'; if(candidate !== ${JSON.stringify(version)}) throw new Error('wrong core');` : ""} export const RECIPES_VERSION = ${JSON.stringify(version)}; export const normalizeRecipeId = value => value.trim();`,
    ],
  ]) {
    const packageRoot = path.join(root, "sources", name, "package");
    mkdirSync(packageRoot, { recursive: true });
    writeFileSync(path.join(packageRoot, "package.json"), JSON.stringify(manifest));
    writeFileSync(path.join(packageRoot, "index.js"), source);
    const tarballDir = path.join(root, "tarballs", name);
    mkdirSync(tarballDir, { recursive: true });
    execFileSync(
      "tar",
      ["-czf", path.join(tarballDir, `${name}.tgz`), "-C", path.dirname(packageRoot), "package"],
      { timeout: 30_000 },
    );
    mkdirSync(path.join(root, "packages", name), { recursive: true });
    writeFileSync(path.join(root, "packages", name, "package.json"), JSON.stringify(manifest));
  }
  return {
    root,
    recipesDir: path.join(root, "tarballs/recipes"),
    coreDir: path.join(root, "tarballs/core"),
  };
}

function run(f, paired = true) {
  const result = spawnSync(
    process.execPath,
    [
      checker,
      "--package-dir",
      "packages/recipes",
      "--tarball-dir",
      f.recipesDir,
      ...(paired ? ["--core-tarball-dir", f.coreDir] : []),
    ],
    {
      cwd: f.root,
      encoding: "utf8",
      timeout: 45_000,
      env: {
        ...process.env,
        npm_config_offline: "true",
        npm_config_registry: "http://127.0.0.1:1",
        npm_config_fetch_retries: "0",
      },
    },
  );
  assert.equal(result.error, undefined);
  return { status: result.status, output: result.stdout + result.stderr };
}

test(
  "installs unpublished matching artifacts offline and imports recipes against local core with scripts disabled",
  { timeout: 60_000 },
  (t) => {
    const result = run(fixture(t));
    assert.equal(result.status, 0, result.output);
    assert.match(result.output, /package Node runtime smoke OK/);
  },
);

test("retains dependency-free standalone recipes qualification", { timeout: 60_000 }, (t) => {
  const result = run(fixture(t, { paired: false }), false);
  assert.equal(result.status, 0, result.output);
});

for (const [label, options, expected] of [
  [
    "mismatched version",
    { coreVersion: "99.88.76-unpublished" },
    /local core version must exactly match/,
  ],
  ["wrong package identity", { coreName: "wrong-core" }, /@agentplaneorg\/core/],
  ["strict core engine", { coreEngine: ">=999.0.0" }, /EBADENGINE|Unsupported engine/],
  ["public import failure", { badExport: true }, /public import rejected/],
]) {
  test(`rejects ${label}`, { timeout: 60_000 }, (t) => {
    const result = run(fixture(t, options));
    assert.notEqual(result.status, 0, result.output);
    assert.match(result.output, expected);
  });
}

for (const ambiguous of [false, true]) {
  test(
    `rejects ${ambiguous ? "ambiguous" : "missing"} supplied core artifact`,
    { timeout: 60_000 },
    (t) => {
      const f = fixture(t);
      const tarball = path.join(f.coreDir, "core.tgz");
      if (ambiguous) copyFileSync(tarball, path.join(f.coreDir, "extra.tgz"));
      else rmSync(tarball);
      const result = run(f);
      assert.notEqual(result.status, 0);
      assert.match(result.output, /exactly one .tgz artifact/);
    },
  );
}
