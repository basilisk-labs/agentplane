import { readFile } from "node:fs/promises";
import path from "node:path";

async function readPackageJson(rootDir, relPath) {
  const absPath = path.join(rootDir, relPath);
  const raw = JSON.parse(await readFile(absPath, "utf8"));
  return { absPath, raw };
}

function readVersion(raw, absPath) {
  const version = typeof raw.version === "string" ? raw.version.trim() : "";
  if (!version) {
    throw new Error(`Missing package.json version: ${absPath}`);
  }
  return version;
}

export async function readReleaseParityState(rootDir) {
  const [{ absPath: corePath, raw: corePkg }, { absPath: agentplanePath, raw: agentplanePkg }] =
    await Promise.all([
      readPackageJson(rootDir, "packages/core/package.json"),
      readPackageJson(rootDir, "packages/agentplane/package.json"),
    ]);

  const coreVersion = readVersion(corePkg, corePath);
  const agentplaneVersion = readVersion(agentplanePkg, agentplanePath);
  const coreDependency = agentplanePkg.dependencies?.["@agentplaneorg/core"] ?? null;

  return {
    coreVersion,
    agentplaneVersion,
    coreDependency,
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

  const expectedCoreDependency = requiredVersion ?? state.coreVersion;
  if (state.coreDependency !== expectedCoreDependency) {
    errors.push(
      `packages/agentplane dependency @agentplaneorg/core=${String(
        state.coreDependency,
      )} does not match required version ${expectedCoreDependency}.`,
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
