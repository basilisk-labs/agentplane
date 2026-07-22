import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { isAllowedTarballPath, packageTarballPolicyContract } from "./package-tarball-policy.mjs";

export const COMPATIBILITY_CONTRACT_SCHEMA_VERSION = 2;
export const COMPATIBILITY_BASELINE_ID = "agentplane.compatibility.v0.6.24";
export const PUBLISHED_TAG = "v0.6.24";
export const PUBLISHED_TAG_SHA = "30f62b82dff28909dcb3ccc2ace2bf3e356203bb";
export const TASK_PARENT_MAIN_SHA = "1a702e160ba9f0efe7067f2a22fc008defc89ffb";

const EXIT_CODES_PATH = "packages/agentplane/src/cli/exit-codes.ts";
const SHARED_ERRORS_PATH = "packages/agentplane/src/shared/errors.ts";
const OUTPUT_MODE_PATH = "packages/agentplane/src/cli/run-cli/globals.ts";
const WORKFLOW_SCHEMA_PATH = "schemas/workflow.schema.json";
const TARBALL_POLICY_PATH = "scripts/lib/package-tarball-policy.mjs";
const TARBALL_RELEASE_CHECK_PATH = "scripts/release/check-package-tarball.mjs";

const CONTEXT_CONTRACT_PATHS = [
  "packages/agentplane/src/runtime/sgr/context-extraction-contract.ts",
  "packages/agentplane/src/runtime/sgr/context-extraction-payloads.ts",
  "packages/agentplane/src/runtime/sgr/contract-types.ts",
  "packages/agentplane/src/context/ingest-task-pack.ts",
];

const STRING_SET_MANIFEST_FIELDS = new Set([
  "bundledDependencies",
  "bundleDependencies",
  "cpu",
  "files",
  "os",
  "sideEffects",
]);

function compareStrings(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

export const PUBLISHED_PACKAGES = [
  {
    dir: "agentplane",
    name: "agentplane",
    spec: "agentplane@0.6.24",
    version: "0.6.24",
    entry_count: 53,
    integrity:
      "sha512-/GNRILlghn9tvoBDQO+ZyNFKzQw8WWvJzDVLYIzx92Jr0wz7zY6PpQR/QXZmmjZwiHgysSalOQDIuB7ZqHnZcQ==",
    shasum: "56a5148f90dc139ec9f7bb750118ed5c61414f37",
  },
  {
    dir: "core",
    name: "@agentplaneorg/core",
    spec: "@agentplaneorg/core@0.6.24",
    version: "0.6.24",
    entry_count: 88,
    integrity:
      "sha512-CON9l9E1LjlZrmvSG2jFrI4HmH6OWEYzNFlkj3KU8ZxbYfRr0AvUazZ/xef7FN/57kG7QO4kML13mpvTCN41ew==",
    shasum: "c06c2bf2ca01404ed8f215544bef83e757355b85",
  },
  {
    dir: "recipes",
    name: "@agentplaneorg/recipes",
    spec: "@agentplaneorg/recipes@0.6.24",
    version: "0.6.24",
    entry_count: 21,
    integrity:
      "sha512-knEFLwIFeh00UmdccAPEAtJbTnJp8TJtF7eQUl6Mz0H7NHQVH+at/ui8pprKKDiTbHi2G/7HV8Mrgd/V3WAUiA==",
    shasum: "5bf1969659275332b5549ce9297902b034988fde",
  },
];

const PACKAGE_MANIFEST_PATHS = PUBLISHED_PACKAGES.map((pkg) => `packages/${pkg.dir}/package.json`);

function normalizeGitPath(value) {
  return value.replaceAll("\\", "/").replace(/^\.\//u, "");
}

export function canonicalizeJson(value) {
  if (Array.isArray(value)) return value.map((entry) => canonicalizeJson(entry));
  if (value !== null && typeof value === "object") {
    const output = {};
    for (const key of Object.keys(value).toSorted(compareStrings)) {
      const normalized = canonicalizeJson(value[key]);
      if (normalized !== undefined) output[key] = normalized;
    }
    return output;
  }
  return value;
}

function preserveJsonObjectOrder(value) {
  if (Array.isArray(value)) return value.map((entry) => preserveJsonObjectOrder(entry));
  if (value !== null && typeof value === "object") {
    return Object.entries(value).map(([key, entry]) => [key, preserveJsonObjectOrder(entry)]);
  }
  return value;
}

export function canonicalJson(value) {
  return JSON.stringify(canonicalizeJson(value));
}

export function sha256Text(value) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function hashJson(value) {
  return sha256Text(canonicalJson(value));
}

function normalizeText(value) {
  return value.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
}

function readJsonText(text, sourceLabel) {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(
      `Failed to parse JSON from ${sourceLabel}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

function gitRaw(repoRoot, args) {
  return execFileSync("git", args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function git(repoRoot, args) {
  return gitRaw(repoRoot, args).trimEnd();
}

export function createWorktreeSource(repoRoot) {
  const resolvedRoot = path.resolve(repoRoot);
  return {
    kind: "worktree",
    label: "working_tree",
    repoRoot: resolvedRoot,
    sourceRoot: resolvedRoot,
    readText(relativePath) {
      return readFileSync(path.join(resolvedRoot, relativePath), "utf8");
    },
    listFiles(relativeDir) {
      const normalizedDir = normalizeGitPath(relativeDir).replaceAll(/\/+$/gu, "");
      const output = git(resolvedRoot, [
        "ls-files",
        "--cached",
        "--others",
        "--exclude-standard",
        "--",
        normalizedDir,
      ]);
      return output
        .split("\n")
        .map((entry) => entry.trim())
        .filter(Boolean)
        .filter((entry) => existsSync(path.join(resolvedRoot, entry)))
        .toSorted(compareStrings);
    },
  };
}

export function createGitSource(repoRoot, ref) {
  const resolvedRoot = path.resolve(repoRoot);
  const commitSha = git(resolvedRoot, ["rev-parse", `${ref}^{commit}`]);
  return {
    kind: "git",
    label: ref,
    repoRoot: resolvedRoot,
    commitSha,
    readText(relativePath) {
      return gitRaw(resolvedRoot, ["show", `${commitSha}:${normalizeGitPath(relativePath)}`]);
    },
    listFiles(relativeDir) {
      const normalizedDir = normalizeGitPath(relativeDir).replaceAll(/\/+$/gu, "");
      const output = git(resolvedRoot, [
        "ls-tree",
        "-r",
        "--name-only",
        commitSha,
        "--",
        normalizedDir,
      ]);
      return output
        .split("\n")
        .map((entry) => entry.trim())
        .filter(Boolean)
        .toSorted(compareStrings);
    },
  };
}

export function gitReferenceAvailable(repoRoot, ref) {
  try {
    git(path.resolve(repoRoot), ["rev-parse", "--verify", `${ref}^{commit}`]);
    return true;
  } catch {
    return false;
  }
}

export function assertGitRefMatchesSha(repoRoot, ref, expectedSha) {
  const actualSha = git(path.resolve(repoRoot), ["rev-parse", `${ref}^{commit}`]);
  if (actualSha !== expectedSha) {
    throw new Error(`${ref} resolves to ${actualSha}; expected ${expectedSha}`);
  }
  return actualSha;
}

export function collectGitProvenance(repoRoot, ref, role) {
  const resolvedRoot = path.resolve(repoRoot);
  const commitSha = git(resolvedRoot, ["rev-parse", `${ref}^{commit}`]);
  const objectType = git(resolvedRoot, ["cat-file", "-t", ref]);
  const treeSha = git(resolvedRoot, ["rev-parse", `${commitSha}^{tree}`]);
  const commitTimestamp = git(resolvedRoot, ["show", "-s", "--format=%cI", commitSha]);
  const commitSubject = git(resolvedRoot, ["show", "-s", "--format=%s", commitSha]);
  return {
    role,
    ref,
    ref_kind: ref.startsWith("v") && objectType === "commit" ? "lightweight_tag" : objectType,
    commit_sha: commitSha,
    tree_sha: treeSha,
    commit_timestamp: commitTimestamp,
    commit_subject: commitSubject,
  };
}

function extractBracedInitializer(text, marker) {
  const markerIndex = text.indexOf(marker);
  if (markerIndex === -1) throw new Error(`Missing source marker: ${marker}`);
  const equalsIndex = text.indexOf("=", markerIndex + marker.length);
  const startIndex = text.indexOf("{", equalsIndex + 1);
  if (equalsIndex === -1 || startIndex === -1) {
    throw new Error(`Missing object initializer after marker: ${marker}`);
  }
  let depth = 0;
  for (let index = startIndex; index < text.length; index += 1) {
    const char = text[index];
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return text.slice(startIndex + 1, index);
    }
  }
  throw new Error(`Unclosed object initializer after marker: ${marker}`);
}

function parseNumericMapping(text, marker) {
  const body = extractBracedInitializer(text, marker);
  const mapping = {};
  for (const match of body.matchAll(/^\s*(E_[A-Z0-9_]+):\s*(\d+),?\s*$/gmu)) {
    mapping[match[1]] = Number(match[2]);
  }
  if (Object.keys(mapping).length === 0) {
    throw new Error(`No numeric mappings found after marker: ${marker}`);
  }
  return mapping;
}

function parseErrorCodes(text) {
  const match = /export type ErrorCode\s*=([\s\S]*?);/u.exec(text);
  if (!match) throw new Error("Unable to locate ErrorCode union");
  return [...match[1].matchAll(/"(E_[A-Z0-9_]+)"/gu)]
    .map((entry) => entry[1])
    .toSorted(compareStrings);
}

function parseExitCodeEnum(text) {
  const match = /export enum ExitCode\s*\{([\s\S]*?)\n\}/u.exec(text);
  if (!match) throw new Error("Unable to locate ExitCode enum");
  const output = {};
  for (const entry of match[1].matchAll(/^\s*([A-Za-z][A-Za-z0-9_]*)\s*=\s*(\d+),?\s*$/gmu)) {
    output[entry[1]] = Number(entry[2]);
  }
  return output;
}

function parseErrorToExit(text, defaults) {
  const body = extractBracedInitializer(text, "export const ERROR_TO_EXIT");
  const output = {};
  for (const entry of body.matchAll(
    /^\s*(E_[A-Z0-9_]+):\s*DEFAULT_ERROR_EXIT_CODES\.(E_[A-Z0-9_]+),?\s*$/gmu,
  )) {
    const sourceCode = entry[2];
    if (!Object.hasOwn(defaults, sourceCode)) {
      throw new Error(`ERROR_TO_EXIT references unknown default: ${sourceCode}`);
    }
    output[entry[1]] = defaults[sourceCode];
  }
  if (Object.keys(output).length === 0) throw new Error("Unable to parse ERROR_TO_EXIT mapping");
  return output;
}

const CLI_TOPOLOGY_RUNNER = String.raw`
import { createRequire, registerHooks } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const sourceRoot = process.env.AGENTPLANE_COMPAT_SOURCE_ROOT;
if (!sourceRoot) throw new Error("AGENTPLANE_COMPAT_SOURCE_ROOT is required");

function workspaceModulePath(specifier) {
  if (specifier === "@agentplaneorg/core") return "packages/core/src/index.ts";
  if (specifier.startsWith("@agentplaneorg/core/")) {
    const subpath = specifier.slice("@agentplaneorg/core/".length);
    return subpath === "logger"
      ? "packages/core/src/logger.ts"
      : "packages/core/src/" + subpath + "/index.ts";
  }
  if (specifier === "@agentplaneorg/recipes") return "packages/recipes/src/index.ts";
  return null;
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    const workspacePath = workspaceModulePath(specifier);
    if (workspacePath) {
      return {
        url: pathToFileURL(path.join(sourceRoot, workspacePath)).href,
        shortCircuit: true,
      };
    }
    if (
      context.parentURL?.startsWith("file:") &&
      (specifier.startsWith("./") || specifier.startsWith("../")) &&
      specifier.endsWith(".js")
    ) {
      const candidate = new URL(specifier.slice(0, -3) + ".ts", context.parentURL);
      if (existsSync(candidate)) return { url: candidate.href, shortCircuit: true };
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith(".ts")) {
      const source = readFileSync(new URL(url), "utf8");
      const output = ts.transpileModule(source, {
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2022,
          verbatimModuleSyntax: true,
        },
      }).outputText;
      return { format: "module", source: output, shortCircuit: true };
    }
    return nextLoad(url, context);
  },
});

const catalogUrl = pathToFileURL(
  path.join(sourceRoot, "packages/agentplane/src/cli/run-cli/command-catalog.ts"),
).href;
const helpUrl = pathToFileURL(
  path.join(sourceRoot, "packages/agentplane/src/cli/spec/help.ts"),
).href;
const renderUrl = pathToFileURL(
  path.join(sourceRoot, "packages/agentplane/src/cli/spec/help-render.ts"),
).href;
const [{ COMMANDS }, { helpSpec }, { renderCommandHelpJson }] = await Promise.all([
  import(catalogUrl),
  import(helpUrl),
  import(renderUrl),
]);
const entries = [
  {
    spec: helpSpec,
    surface: "user",
    needs: "none",
    dispatch: { project: false, loadedConfig: false, taskContext: false },
  },
  ...COMMANDS,
];
function projectDefined(source, fields) {
  return Object.fromEntries(
    fields
      .filter((field) => Object.hasOwn(source, field) && source[field] !== undefined)
      .map((field) => [field, source[field]]),
  );
}
const commands = entries
  .map((entry) => {
    const help = renderCommandHelpJson(entry.spec);
    return {
      id: help.id,
      visibility: entry.surface,
      group: help.group ?? null,
      args: help.args.map((arg) => ({
        name: arg.name,
        required: Boolean(arg.required),
        variadic: Boolean(arg.variadic),
        valueHint: arg.valueHint ?? null,
      })),
      options: help.options.map((option) => ({
        name: option.name,
        kind: option.kind,
        valueHint: option.valueHint ?? null,
        ...projectDefined(option, ["required", "default", "choices", "repeatable"]),
      })),
    };
  })
  .toSorted((left, right) => {
    const leftId = left.id.join(" ");
    const rightId = right.id.join(" ");
    return leftId < rightId ? -1 : leftId > rightId ? 1 : 0;
  });
process.stdout.write(JSON.stringify(commands));
`;

function linkDependencyTree(sourceRoot, repoRoot) {
  for (const relativePath of [
    "node_modules",
    "packages/agentplane/node_modules",
    "packages/core/node_modules",
    "packages/recipes/node_modules",
  ]) {
    const target = path.join(repoRoot, relativePath);
    const link = path.join(sourceRoot, relativePath);
    if (!existsSync(target) || existsSync(link)) continue;
    mkdirSync(path.dirname(link), { recursive: true });
    symlinkSync(target, link, "dir");
  }
}

function materializeGitSource(source) {
  const sourceRoot = mkdtempSync(path.join(os.tmpdir(), "agentplane-compat-source-"));
  const archive = execFileSync(
    "git",
    [
      "archive",
      "--format=tar",
      source.commitSha,
      "--",
      "packages/agentplane/src",
      "packages/agentplane/bin",
      "packages/agentplane/package.json",
      "packages/core/src",
      "packages/core/package.json",
      "packages/recipes/src",
      "packages/recipes/package.json",
    ],
    { cwd: source.repoRoot, maxBuffer: 256 * 1024 * 1024 },
  );
  execFileSync("tar", ["-xf", "-", "-C", sourceRoot], {
    input: archive,
    maxBuffer: 256 * 1024 * 1024,
  });
  linkDependencyTree(sourceRoot, source.repoRoot);
  return sourceRoot;
}

export function collectCliTopology(source) {
  const temporary = source.kind === "git";
  const sourceRoot = temporary ? materializeGitSource(source) : source.sourceRoot;
  try {
    const output = execFileSync(
      process.execPath,
      ["--input-type=module", "--eval", CLI_TOPOLOGY_RUNNER],
      {
        cwd: source.repoRoot,
        encoding: "utf8",
        env: { ...process.env, AGENTPLANE_COMPAT_SOURCE_ROOT: sourceRoot },
        maxBuffer: 64 * 1024 * 1024,
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    const commands = readJsonText(output, `${source.label} CLI topology`);
    if (!Array.isArray(commands) || commands.length === 0) {
      throw new Error(`${source.label}: CLI topology is empty`);
    }
    const commandIds = commands.map((command) => command.id.join(" "));
    if (new Set(commandIds).size !== commandIds.length) {
      throw new Error(`${source.label}: CLI topology contains duplicate command ids`);
    }
    const surfaceCounts = {};
    for (const command of commands) {
      const visibility = String(command.visibility ?? "unknown");
      surfaceCounts[visibility] = (surfaceCounts[visibility] ?? 0) + 1;
    }
    return {
      source: "source_command_catalog_rendered_as_help_json_all_structural",
      projection:
        "id, visibility, group, args(name, required, variadic, valueHint), and options(name, kind, valueHint, required/default/choices/repeatable when present); prose excluded",
      command_count: commands.length,
      positional_count: commands.reduce(
        (count, command) => count + (Array.isArray(command.args) ? command.args.length : 0),
        0,
      ),
      option_count: commands.reduce(
        (count, command) => count + (Array.isArray(command.options) ? command.options.length : 0),
        0,
      ),
      visibility_counts: canonicalizeJson(surfaceCounts),
      normalized_sha256: hashJson(commands),
      commands,
    };
  } finally {
    if (temporary) rmSync(sourceRoot, { recursive: true, force: true });
  }
}

function collectExitErrorContract(source) {
  const exitCodesText = normalizeText(source.readText(EXIT_CODES_PATH));
  const sharedErrorsText = normalizeText(source.readText(SHARED_ERRORS_PATH));
  const errorCodes = parseErrorCodes(sharedErrorsText);
  const defaultErrorExitCodes = parseNumericMapping(
    sharedErrorsText,
    "export const DEFAULT_ERROR_EXIT_CODES",
  );
  const errorToExit = parseErrorToExit(exitCodesText, defaultErrorExitCodes);
  const mappedCodes = Object.keys(errorToExit).toSorted(compareStrings);
  if (canonicalJson(errorCodes) !== canonicalJson(mappedCodes)) {
    throw new Error("ErrorCode union and ERROR_TO_EXIT keys diverge");
  }
  const normalized = {
    error_codes: errorCodes,
    exit_code_enum: parseExitCodeEnum(exitCodesText),
    default_error_exit_codes: defaultErrorExitCodes,
    error_to_exit: errorToExit,
  };
  return {
    source_paths: [EXIT_CODES_PATH, SHARED_ERRORS_PATH],
    normalized_sha256: hashJson(normalized),
    ...normalized,
  };
}

function extractTopLevelSourceBlock(text, marker) {
  const normalized = normalizeText(text);
  const start = normalized.indexOf(marker);
  if (start === -1) throw new Error(`Missing source marker: ${marker}`);
  const tail = normalized.slice(start);
  const end = /^\}/mu.exec(tail);
  if (!end) throw new Error(`Missing top-level block end after marker: ${marker}`);
  return tail.slice(0, end.index + 1);
}

function collectMachineOutputContract(source) {
  const errorsText = source.readText(SHARED_ERRORS_PATH);
  const outputModeText = source.readText(OUTPUT_MODE_PATH);
  const errorSource = extractTopLevelSourceBlock(errorsText, "export function formatJsonError");
  const successSource = extractTopLevelSourceBlock(
    outputModeText,
    "export async function runWithOutputMode",
  );
  const normalized = {
    scope:
      "Global agent_json_v1 success wrapper and global CliError JSON envelope only; command-specific data payloads are not frozen here.",
    success_envelope: {
      schema_version: 1,
      mode: "agent_json_v1",
      required_fields: ["schema_version", "mode", "command", "ok", "exit_code", "stdout", "stderr"],
      optional_fields: ["data"],
      field_casing: "snake_case",
      data_rule: "present only when captured stdout parses as JSON",
    },
    error_envelope: {
      root_field: "error",
      required_fields: ["code", "message"],
      optional_fields: [
        "context",
        "state",
        "likely_cause",
        "hint",
        "remediation",
        "next_action",
        "reason_decode",
      ],
      remediation_fields: ["code", "why", "fix", "safe_command", "stop_condition"],
      field_casing: "snake_case_except_nested_next_action_compatibility_payload",
    },
    source_contracts: [
      {
        path: OUTPUT_MODE_PATH,
        marker: "runWithOutputMode",
        normalized_sha256: sha256Text(successSource),
      },
      {
        path: SHARED_ERRORS_PATH,
        marker: "formatJsonError",
        normalized_sha256: sha256Text(errorSource),
      },
    ],
  };
  return { normalized_sha256: hashJson(normalized), ...normalized };
}

function collectAgentFacingContextContracts(source) {
  const contracts = CONTEXT_CONTRACT_PATHS.map((relativePath) => {
    const normalized = normalizeText(source.readText(relativePath));
    return {
      path: relativePath,
      scope: relativePath.endsWith("ingest-task-pack.ts")
        ? "Generated context task-pack file set, required artifacts, and executor-facing instructions."
        : "Context extraction SGR types, payload requirements, and canonical examples.",
      normalized_bytes: Buffer.byteLength(normalized, "utf8"),
      normalized_sha256: sha256Text(normalized),
    };
  });
  return {
    source_contract_kind: "normalized_exact_agent_facing_source_contracts",
    normalized_sha256: hashJson(contracts),
    contracts,
  };
}

function collectWorkflowSchema(source) {
  const raw = readJsonText(source.readText(WORKFLOW_SCHEMA_PATH), WORKFLOW_SCHEMA_PATH);
  const canonical = canonicalJson(raw);
  return {
    path: WORKFLOW_SCHEMA_PATH,
    normalized_sha256: sha256Text(canonical),
    normalized_bytes: Buffer.byteLength(canonical, "utf8"),
    schema_uri: typeof raw.$schema === "string" ? raw.$schema : null,
    schema_id: typeof raw.$id === "string" ? raw.$id : null,
    title: typeof raw.title === "string" ? raw.title : null,
    type: typeof raw.type === "string" ? raw.type : null,
    required: Array.isArray(raw.required) ? normalizeStringSet(raw.required) : [],
    property_names:
      raw.properties && typeof raw.properties === "object"
        ? Object.keys(raw.properties).toSorted(compareStrings)
        : [],
    definition_names:
      raw.$defs && typeof raw.$defs === "object"
        ? Object.keys(raw.$defs).toSorted(compareStrings)
        : [],
  };
}

function normalizeStringSet(value) {
  if (!Array.isArray(value)) return value ?? null;
  return [...new Set(value.map(String))].toSorted(compareStrings);
}

export function packageSurface(manifestPath, manifest) {
  const fields = [
    "name",
    "version",
    "type",
    "types",
    "main",
    "module",
    "license",
    "sideEffects",
    "engines",
    "bin",
    "files",
    "exports",
    "dependencies",
    "peerDependencies",
    "peerDependenciesMeta",
    "optionalDependencies",
    "bundledDependencies",
    "bundleDependencies",
    "publishConfig",
    "os",
    "cpu",
  ];
  const normalized = Object.fromEntries(
    fields.map((field) => [
      field,
      field === "exports"
        ? preserveJsonObjectOrder(manifest[field] ?? null)
        : STRING_SET_MANIFEST_FIELDS.has(field)
          ? normalizeStringSet(manifest[field])
          : (manifest[field] ?? null),
    ]),
  );
  return {
    path: manifestPath,
    normalized_sha256: hashJson(normalized),
    ...normalized,
  };
}

function collectPackageManifests(source) {
  return PACKAGE_MANIFEST_PATHS.map((manifestPath) => {
    const manifest = readJsonText(source.readText(manifestPath), manifestPath);
    return packageSurface(manifestPath, manifest);
  });
}

function collectTarballPolicy(source) {
  const policy = packageTarballPolicyContract();
  const packages = PUBLISHED_PACKAGES.map((pkg) => {
    const prefix = `packages/${pkg.dir}/`;
    const files = source
      .listFiles(`packages/${pkg.dir}`)
      .filter((filePath) => filePath.startsWith(prefix))
      .map((filePath) => filePath.slice(prefix.length))
      .filter((relativePath) => isAllowedTarballPath(relativePath, pkg.name))
      .toSorted(compareStrings);
    return {
      name: pkg.name,
      package_dir: `packages/${pkg.dir}`,
      source_file_count: files.length,
      source_files_sha256: hashJson(files),
      source_files: files,
    };
  });
  return {
    policy_path: TARBALL_POLICY_PATH,
    release_check_path: TARBALL_RELEASE_CHECK_PATH,
    policy_contract_kind: "shared_semantic_package_tarball_policy_v1",
    policy_sha256: hashJson(policy),
    policy,
    normalized_policy_scope:
      "Shared semantic release policy plus policy-eligible package path inventory. Published npm inventory remains the authoritative packed-file evidence.",
    source_inventory_kind: "git_tracked_and_nonignored_untracked_policy_eligible",
    source_inventory_sha256: hashJson(packages),
    packages,
  };
}

export function collectCompatibilitySurface(source) {
  return {
    schema_version: COMPATIBILITY_CONTRACT_SCHEMA_VERSION,
    cli_topology: collectCliTopology(source),
    exit_error_contract: collectExitErrorContract(source),
    machine_output_contract: collectMachineOutputContract(source),
    workflow_schema: collectWorkflowSchema(source),
    agent_facing_context_contracts: collectAgentFacingContextContracts(source),
    package_manifests: collectPackageManifests(source),
    tarball_policy: collectTarballPolicy(source),
  };
}

export function surfaceSectionDigests(surface) {
  return Object.fromEntries(
    Object.entries(surface)
      .filter(([key]) => key !== "schema_version")
      .map(([key, value]) => [key, hashJson(value)]),
  );
}

export function compatibilitySurfaceDigest(sectionDigests) {
  return hashJson({
    schema_version: COMPATIBILITY_CONTRACT_SCHEMA_VERSION,
    section_digests: sectionDigests,
  });
}

export function reconstructCompatibilitySurface(sections, sectionDigests) {
  const surface = { schema_version: COMPATIBILITY_CONTRACT_SCHEMA_VERSION };
  for (const [name, digest] of Object.entries(sectionDigests ?? {})) {
    const section = sections?.[digest];
    if (section === undefined) {
      throw new Error(`Compatibility section ${name} is missing for digest ${digest}`);
    }
    if (hashJson(section) !== digest) {
      throw new Error(`Compatibility section ${name} digest mismatch: ${digest}`);
    }
    surface[name] = section;
  }
  return surface;
}

export function changedSurfaceSections(left, right) {
  const leftDigests = surfaceSectionDigests(left);
  const rightDigests = surfaceSectionDigests(right);
  return [...new Set([...Object.keys(leftDigests), ...Object.keys(rightDigests)])]
    .filter((key) => leftDigests[key] !== rightDigests[key])
    .toSorted(compareStrings);
}

export function normalizeNpmPackResult(raw, expectedName = null) {
  const entry = Array.isArray(raw) ? raw[0] : raw;
  if (!entry || typeof entry !== "object") throw new Error("npm pack result is missing");
  const name = String(entry.name ?? "");
  if (expectedName && name !== expectedName) {
    throw new Error(`npm pack returned ${name || "unknown"}; expected ${expectedName}`);
  }
  const files = Array.isArray(entry.files)
    ? entry.files
        .map((item) => String(item?.path ?? "").trim())
        .filter(Boolean)
        .toSorted(compareStrings)
    : [];
  return {
    name,
    version: String(entry.version ?? ""),
    integrity: String(entry.integrity ?? ""),
    shasum: String(entry.shasum ?? ""),
    entry_count: Number(entry.entryCount ?? files.length),
    files_sha256: hashJson(files),
    files,
  };
}

export function capturePublishedNpmInventory(repoRoot) {
  const cacheDir = path.join(path.resolve(repoRoot), ".agentplane", ".npm-cache");
  return PUBLISHED_PACKAGES.map((pkg) => {
    const output = execFileSync("npm", ["pack", "--dry-run", "--json", pkg.spec], {
      cwd: repoRoot,
      encoding: "utf8",
      env: { ...process.env, NPM_CONFIG_CACHE: cacheDir },
      stdio: ["ignore", "pipe", "pipe"],
    });
    const normalized = normalizeNpmPackResult(
      readJsonText(output, `npm pack ${pkg.spec}`),
      pkg.name,
    );
    for (const field of ["version", "entry_count", "integrity", "shasum"]) {
      if (normalized[field] !== pkg[field]) {
        throw new Error(
          `${pkg.spec}: immutable published ${field} drift; expected ${pkg[field]}, received ${normalized[field]}`,
        );
      }
    }
    return normalized;
  });
}

export function diffJsonPaths(expected, actual, prefix = "$", output = []) {
  if (Object.is(expected, actual)) return output;
  if (Array.isArray(expected) && Array.isArray(actual)) {
    const length = Math.max(expected.length, actual.length);
    for (let index = 0; index < length; index += 1) {
      diffJsonPaths(expected[index], actual[index], `${prefix}[${index}]`, output);
      if (output.length >= 50) return output;
    }
    return output;
  }
  if (
    expected !== null &&
    actual !== null &&
    typeof expected === "object" &&
    typeof actual === "object" &&
    !Array.isArray(expected) &&
    !Array.isArray(actual)
  ) {
    const keys = [...new Set([...Object.keys(expected), ...Object.keys(actual)])].toSorted(
      compareStrings,
    );
    for (const key of keys) {
      diffJsonPaths(expected[key], actual[key], `${prefix}.${key}`, output);
      if (output.length >= 50) return output;
    }
    return output;
  }
  output.push(prefix);
  return output;
}
