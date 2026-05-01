import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const FREEZE_V03_PATH = "FREEZE.v0.3.md";
const RECIPES_RUNTIME_VERSION_PATH = "packages/recipes/src/index.ts";
const V03_VERSION_RE = /^0\.3\.\d+(?:[-+][0-9A-Za-z.-]+)?$/u;
const RECIPES_VERSION_EXPORT_RE = /export\s+const\s+RECIPES_VERSION\s*=\s*["']([^"']+)["']\s*;/u;

async function readPackageJson(rootDir, relPath) {
  const absPath = path.join(rootDir, relPath);
  const raw = JSON.parse(await readFile(absPath, "utf8"));
  return { absPath, raw };
}

async function readOptionalText(rootDir, relPath) {
  try {
    return await readFile(path.join(rootDir, relPath), "utf8");
  } catch (error) {
    const code = error && typeof error === "object" ? error.code : undefined;
    if (code === "ENOENT") return null;
    throw error;
  }
}

async function readRecipesRuntimeVersion(rootDir) {
  const text = await readOptionalText(rootDir, RECIPES_RUNTIME_VERSION_PATH);
  if (text === null) {
    return {
      relPath: RECIPES_RUNTIME_VERSION_PATH,
      exists: false,
      version: null,
    };
  }

  const match = RECIPES_VERSION_EXPORT_RE.exec(text);
  return {
    relPath: RECIPES_RUNTIME_VERSION_PATH,
    exists: true,
    version: typeof match?.[1] === "string" ? match[1].trim() : null,
  };
}

async function readWorkspacePrivatePackageNames(rootDir) {
  const names = new Set();
  const packagesDir = path.join(rootDir, "packages");
  let entries = [];
  try {
    entries = await readdir(packagesDir, { withFileTypes: true });
  } catch (error) {
    const code = error && typeof error === "object" ? error.code : undefined;
    if (code === "ENOENT") return names;
    throw error;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const manifestPath = path.join(packagesDir, entry.name, "package.json");
    try {
      const raw = JSON.parse(await readFile(manifestPath, "utf8"));
      const name = typeof raw.name === "string" ? raw.name.trim() : "";
      if (raw.private === true && name) names.add(name);
    } catch (error) {
      const code = error && typeof error === "object" ? error.code : undefined;
      if (code === "ENOENT") continue;
      throw error;
    }
  }
  return names;
}

async function readPackageWorkspaceDependencies(rootDir) {
  const packagesDir = path.join(rootDir, "packages");
  let entries = [];
  try {
    entries = await readdir(packagesDir, { withFileTypes: true });
  } catch (error) {
    const code = error && typeof error === "object" ? error.code : undefined;
    if (code === "ENOENT") return [];
    throw error;
  }

  const dependencies = [];
  const sections = ["dependencies", "optionalDependencies", "peerDependencies"];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const relPath = `packages/${entry.name}/package.json`;
    let raw;
    try {
      ({ raw } = await readPackageJson(rootDir, relPath));
    } catch (error) {
      const code = error && typeof error === "object" ? error.code : undefined;
      if (code === "ENOENT") continue;
      throw error;
    }

    const packageName = typeof raw.name === "string" ? raw.name.trim() : relPath;
    for (const section of sections) {
      const deps = raw?.[section];
      if (!deps || typeof deps !== "object") continue;
      for (const [name, spec] of Object.entries(deps)) {
        if (!name.startsWith("@agentplaneorg/") && name !== "@agentplane/testkit") continue;
        dependencies.push({
          relPath,
          packageName,
          section,
          name,
          spec: typeof spec === "string" ? spec.trim() : String(spec),
        });
      }
    }
  }

  return dependencies;
}

function collectUnsupportedDependencyErrors(raw, privateWorkspacePackageNames) {
  const errors = [];
  const sections = ["dependencies", "optionalDependencies", "peerDependencies"];

  for (const section of sections) {
    const deps = raw?.[section];
    if (!deps || typeof deps !== "object") continue;
    for (const [name, spec] of Object.entries(deps)) {
      const normalized = typeof spec === "string" ? spec.trim() : "";
      if (normalized.startsWith("workspace:")) {
        errors.push(
          `packages/agentplane ${section} contains unsupported workspace protocol for ${name}=${normalized}.`,
        );
      }
      if (privateWorkspacePackageNames.has(name)) {
        errors.push(
          `packages/agentplane ${section} references private workspace package ${name}; publishable packages must not depend on private workspace packages.`,
        );
      }
    }
  }

  return errors;
}

function readVersion(raw, absPath) {
  const version = typeof raw.version === "string" ? raw.version.trim() : "";
  if (!version) {
    throw new Error(`Missing package.json version: ${absPath}`);
  }
  return version;
}

export async function readReleaseParityState(rootDir) {
  const [
    { absPath: corePath, raw: corePkg },
    { absPath: agentplanePath, raw: agentplanePkg },
    { absPath: recipesPath, raw: recipesPkg },
  ] = await Promise.all([
    readPackageJson(rootDir, "packages/core/package.json"),
    readPackageJson(rootDir, "packages/agentplane/package.json"),
    readPackageJson(rootDir, "packages/recipes/package.json"),
  ]);
  const privateWorkspacePackageNames = await readWorkspacePrivatePackageNames(rootDir);
  const packageWorkspaceDependencies = await readPackageWorkspaceDependencies(rootDir);
  const freezeV03Text = await readOptionalText(rootDir, FREEZE_V03_PATH);
  const recipesRuntimeVersion = await readRecipesRuntimeVersion(rootDir);

  const coreVersion = readVersion(corePkg, corePath);
  const agentplaneVersion = readVersion(agentplanePkg, agentplanePath);
  const recipesVersion = readVersion(recipesPkg, recipesPath);
  const coreDependency = agentplanePkg.dependencies?.["@agentplaneorg/core"] ?? null;
  const recipesDependency = agentplanePkg.dependencies?.["@agentplaneorg/recipes"] ?? null;
  const publishDependencyErrors = collectUnsupportedDependencyErrors(
    agentplanePkg,
    privateWorkspacePackageNames,
  );

  return {
    coreVersion,
    agentplaneVersion,
    recipesVersion,
    coreDependency,
    recipesDependency,
    recipesRuntimeVersion,
    packageWorkspaceDependencies,
    publishDependencyErrors,
    freezeV03: {
      relPath: FREEZE_V03_PATH,
      text: freezeV03Text,
    },
  };
}

export function collectReleaseParityErrors(state, opts = {}) {
  const requiredVersion =
    typeof opts.requiredVersion === "string" && opts.requiredVersion.trim()
      ? opts.requiredVersion.trim()
      : null;

  const errors = [];
  if (state.coreVersion !== state.agentplaneVersion) {
    errors.push(
      `Package versions must match. packages/core=${state.coreVersion} packages/agentplane=${state.agentplaneVersion}.`,
    );
  }
  if (state.recipesVersion !== state.agentplaneVersion) {
    errors.push(
      `Package versions must match. packages/recipes=${state.recipesVersion} packages/agentplane=${state.agentplaneVersion}.`,
    );
  }
  const recipesRuntimeVersion = state.recipesRuntimeVersion ?? {
    relPath: RECIPES_RUNTIME_VERSION_PATH,
    exists: false,
    version: null,
  };
  if (recipesRuntimeVersion.exists && recipesRuntimeVersion.version === null) {
    errors.push(
      `${recipesRuntimeVersion.relPath} must export RECIPES_VERSION as a string literal.`,
    );
  }
  if (
    recipesRuntimeVersion.exists &&
    recipesRuntimeVersion.version !== null &&
    recipesRuntimeVersion.version !== state.recipesVersion
  ) {
    errors.push(
      `${recipesRuntimeVersion.relPath} RECIPES_VERSION=${recipesRuntimeVersion.version} does not match packages/recipes version ${state.recipesVersion}.`,
    );
  }

  const expectedCoreDependency = requiredVersion ?? state.coreVersion;
  if (state.coreDependency !== expectedCoreDependency) {
    errors.push(
      `packages/agentplane dependency @agentplaneorg/core=${String(
        state.coreDependency,
      )} does not match required version ${expectedCoreDependency}.`,
    );
  }
  const expectedRecipesDependency = requiredVersion ?? state.recipesVersion;
  if (state.recipesDependency !== expectedRecipesDependency) {
    errors.push(
      `packages/agentplane dependency @agentplaneorg/recipes=${String(
        state.recipesDependency,
      )} does not match required version ${expectedRecipesDependency}.`,
    );
  }

  if (requiredVersion !== null) {
    if (state.coreVersion !== requiredVersion) {
      errors.push(
        `packages/core version ${state.coreVersion} does not match required version ${requiredVersion}.`,
      );
    }
    if (state.agentplaneVersion !== requiredVersion) {
      errors.push(
        `packages/agentplane version ${state.agentplaneVersion} does not match required version ${requiredVersion}.`,
      );
    }
    if (state.recipesVersion !== requiredVersion) {
      errors.push(
        `packages/recipes version ${state.recipesVersion} does not match required version ${requiredVersion}.`,
      );
    }
  }

  for (const error of state.publishDependencyErrors ?? []) {
    errors.push(error);
  }

  const freezeV03 = state.freezeV03 ?? { relPath: FREEZE_V03_PATH, text: null };
  const isV03Version = V03_VERSION_RE.test(state.agentplaneVersion);
  if (isV03Version && freezeV03.text === null) {
    errors.push(
      `${freezeV03.relPath} is required while packages/agentplane version ${state.agentplaneVersion} is in the frozen 0.3.x line.`,
    );
  }
  if (!isV03Version && freezeV03.text !== null) {
    errors.push(
      `${freezeV03.relPath} exists but packages/agentplane version ${state.agentplaneVersion} is outside the frozen 0.3.x line; retire or replace the freeze artifact as part of the next surface ADR.`,
    );
  }
  if (
    isV03Version &&
    freezeV03.text !== null &&
    !freezeV03.text.includes(`agentplane@${state.agentplaneVersion}`)
  ) {
    errors.push(
      `${freezeV03.relPath} must reference current package version agentplane@${state.agentplaneVersion}.`,
    );
  }

  for (const dep of state.packageWorkspaceDependencies ?? []) {
    if (dep.packageName === "agentplane") continue;
    if (dep.spec !== state.agentplaneVersion) {
      errors.push(
        `${dep.relPath} ${dep.section} ${dep.name}=${dep.spec} does not match workspace version ${state.agentplaneVersion}.`,
      );
    }
  }

  return errors;
}

export async function assertReleaseParity(rootDir, opts = {}) {
  const state = await readReleaseParityState(rootDir);
  const errors = collectReleaseParityErrors(state, opts);
  if (errors.length > 0) {
    throw new Error(`Release version parity check failed:\n- ${errors.join("\n- ")}`);
  }
  return state;
}
