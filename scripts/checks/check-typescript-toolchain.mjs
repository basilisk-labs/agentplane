import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const require = createRequire(import.meta.url);
const expectedNativeVersion = "7.0.2";
const expectedApiVersion = "6.0.3";

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

function runVersion(packageName) {
  const packageJson = require.resolve(`${packageName}/package.json`, { paths: [root] });
  const entrypoint = path.join(path.dirname(packageJson), "bin", "tsc");
  const result = spawnSync(process.execPath, [entrypoint, "--version"], {
    cwd: root,
    encoding: "utf8",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      `${packageName} version probe failed: ${result.stderr.trim() || `exit=${result.status ?? 1}`}`,
    );
  }
  return result.stdout.trim().replace(/^Version\s+/u, "");
}

function runWrapperVersion(packageName) {
  const env = { ...process.env };
  if (packageName === undefined) delete env.AGENTPLANE_TYPESCRIPT_PACKAGE;
  else env.AGENTPLANE_TYPESCRIPT_PACKAGE = packageName;

  const result = spawnSync(
    process.execPath,
    [path.join(root, "scripts/checks/run-typescript-build.mjs"), "--version"],
    { cwd: root, encoding: "utf8", env },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(
      `TypeScript wrapper version probe failed: ${result.stderr.trim() || `exit=${result.status ?? 1}`}`,
    );
  }
  return result.stdout.trim().replace(/^Version\s+/u, "");
}

const rootPackage = readJson("package.json");
if (rootPackage.devDependencies["@typescript/native"] !== "npm:typescript@7.0.2") {
  throw new Error("@typescript/native must stay pinned to npm:typescript@7.0.2.");
}
if (rootPackage.devDependencies.typescript !== expectedApiVersion) {
  throw new Error(`typescript must stay pinned to ${expectedApiVersion}.`);
}

const nativeVersion = runVersion("@typescript/native");
const apiVersion = runVersion("typescript");
if (nativeVersion !== expectedNativeVersion) {
  throw new Error(
    `Native typecheck compiler drift: expected ${expectedNativeVersion}, got ${nativeVersion}.`,
  );
}
if (apiVersion !== expectedApiVersion) {
  throw new Error(
    `Compiler API compatibility drift: expected ${expectedApiVersion}, got ${apiVersion}.`,
  );
}
if (runWrapperVersion() !== expectedNativeVersion) {
  throw new Error("The canonical TypeScript wrapper no longer defaults to TypeScript 7.");
}
if (runWrapperVersion("typescript") !== expectedApiVersion) {
  throw new Error(
    "AGENTPLANE_TYPESCRIPT_PACKAGE=typescript no longer selects the rollback compiler.",
  );
}

const typescriptApi = require("typescript");
if (typescriptApi.version !== expectedApiVersion) {
  throw new Error(
    `require("typescript") must resolve the ${expectedApiVersion} compiler API, got ${typescriptApi.version}.`,
  );
}

const parserPackage = require.resolve("@typescript-eslint/parser/package.json", { paths: [root] });
const parserRequire = createRequire(parserPackage);
const parserTypescriptVersion = parserRequire("typescript").version;
if (parserTypescriptVersion !== expectedApiVersion) {
  throw new Error(
    `typescript-eslint must resolve TypeScript ${expectedApiVersion}, got ${parserTypescriptVersion}.`,
  );
}

const docusaurusPackage = require.resolve("@docusaurus/tsconfig/package.json", {
  paths: [path.join(root, "website")],
});
const docusaurusConfig = JSON.parse(
  readFileSync(path.join(path.dirname(docusaurusPackage), "tsconfig.json"), "utf8"),
);
const bridgeConfig = readJson("website/tsconfig.docusaurus.json");
const expectedBridgeOptions = { ...docusaurusConfig.compilerOptions };
delete expectedBridgeOptions.baseUrl;
if (JSON.stringify(bridgeConfig.compilerOptions) !== JSON.stringify(expectedBridgeOptions)) {
  throw new Error(
    "website/tsconfig.docusaurus.json must mirror the pinned Docusaurus config except for removed baseUrl.",
  );
}

const depcruiseConfig = readJson("tsconfig.depcruise.json");
const expectedDepcruiseOptions = {
  module: "NodeNext",
  moduleResolution: "NodeNext",
  target: "ES2022",
  types: ["node"],
};
if (
  JSON.stringify(depcruiseConfig) !== JSON.stringify({ compilerOptions: expectedDepcruiseOptions })
) {
  throw new Error(
    "tsconfig.depcruise.json must stay isolated from compiler project references and path aliases.",
  );
}
const depcruiseRuntimeConfig = readFileSync(path.join(root, "depcruise.config.cjs"), "utf8");
if (!depcruiseRuntimeConfig.includes('fileName: "tsconfig.depcruise.json"')) {
  throw new Error("dependency-cruiser must use the isolated TypeScript 6 config.");
}
const depcruiseRunner = readFileSync(
  path.join(root, "scripts/checks/run-depcruise-arch.mjs"),
  "utf8",
);
if (!depcruiseRunner.includes("register-typescript-6-resolution.mjs")) {
  throw new Error("dependency-cruiser must preload deterministic TypeScript 6 resolution.");
}

const workspaces = [
  "packages/core/package.json",
  "packages/recipes/package.json",
  "packages/agentplane/package.json",
  "packages/testkit/package.json",
  "website/package.json",
];
for (const workspace of workspaces) {
  const typecheck = readJson(workspace).scripts?.typecheck ?? "";
  if (!typecheck.includes("run-typescript-build.mjs")) {
    throw new Error(`${workspace} bypasses the canonical TypeScript wrapper.`);
  }
}

for (const packagePath of workspaces.slice(0, 4)) {
  const pkg = readJson(packagePath);
  if (pkg.dependencies?.["@typescript/native"] || pkg.peerDependencies?.["@typescript/native"]) {
    throw new Error(`${packagePath} leaks @typescript/native into a runtime dependency surface.`);
  }
}

console.log(
  `typescript toolchain ok (typecheck=${nativeVersion}, compiler_api=${apiVersion}, typescript_eslint=${parserTypescriptVersion})`,
);
