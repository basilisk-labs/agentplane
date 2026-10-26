import { diffJsonPaths, hashJson, packageSurface } from "./compatibility-contract.mjs";

export function reviewedPackageVersion(candidate) {
  const version = Object.hasOwn(candidate, "incremental_package_delta_reviewed_version")
    ? candidate.incremental_package_delta_reviewed_version
    : candidate.release_version_delta?.to_version;
  if (typeof version !== "string" || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u.test(version)) {
    throw new Error("Invalid reviewed package version anchor");
  }
  return version;
}

export function normalizePackageVersions(manifests, version) {
  if (typeof version !== "string" || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u.test(version)) {
    throw new Error("Invalid reviewed package version");
  }
  const currentVersions = new Set(manifests.map((manifest) => manifest.version));
  if (currentVersions.size !== 1) throw new Error("Package versions do not have release parity");
  return manifests.map((manifest) => {
    const normalized = structuredClone(manifest);
    delete normalized.path;
    delete normalized.normalized_sha256;
    normalized.version = version;
    const internalDependencies =
      manifest.path === "packages/agentplane/package.json"
        ? ["@agentplaneorg/core", "@agentplaneorg/recipes"]
        : manifest.path === "packages/recipes/package.json"
          ? ["@agentplaneorg/core"]
          : [];
    for (const name of internalDependencies) {
      if (manifest.dependencies?.[name] !== manifest.version) {
        throw new Error(`${manifest.path}: unexpected internal dependency version for ${name}`);
      }
      normalized.dependencies[name] = version;
    }
    return packageSurface(manifest.path, normalized);
  });
}

export function reconstructHistoricalPackageSurface(currentSurface, delta, reviewedVersion) {
  if (delta?.section !== "package_manifests" || !Array.isArray(delta.historical_dependencies)) {
    throw new Error("Incremental package delta cannot reconstruct its historical surface");
  }
  const historical = structuredClone(currentSurface);
  const manifests = new Map(
    historical.package_manifests.map((manifest) => [manifest.path, manifest]),
  );
  const seen = new Set();
  for (const entry of delta.historical_dependencies) {
    const manifest = manifests.get(entry.manifest_path);
    if (
      !manifest ||
      seen.has(entry.manifest_path) ||
      typeof entry.name !== "string" ||
      !Object.hasOwn(manifest.dependencies ?? {}, entry.name) ||
      typeof entry.version !== "string" ||
      !entry.version ||
      manifest.dependencies[entry.name] === entry.version
    ) {
      throw new Error("Incremental package delta has invalid historical dependency evidence");
    }
    seen.add(entry.manifest_path);
    manifest.dependencies[entry.name] = entry.version;
  }
  if (seen.size !== manifests.size) {
    throw new Error("Incremental package delta has incomplete historical dependency evidence");
  }
  historical.package_manifests = historical.package_manifests.map((manifest) => {
    const normalized = structuredClone(manifest);
    delete normalized.path;
    delete normalized.normalized_sha256;
    return packageSurface(manifest.path, normalized);
  });
  const reviewedCurrent =
    reviewedVersion !== undefined
      ? normalizePackageVersions(currentSurface.package_manifests, reviewedVersion)
      : currentSurface.package_manifests;
  const reviewedHistorical =
    reviewedVersion !== undefined
      ? normalizePackageVersions(historical.package_manifests, reviewedVersion)
      : historical.package_manifests;
  if (
    hashJson(reviewedHistorical) !== delta.from_sha256 ||
    hashJson(reviewedCurrent) !== delta.to_sha256 ||
    hashJson(
      diffJsonPaths(
        historical.package_manifests,
        currentSurface.package_manifests,
        "$.package_manifests",
      ),
    ) !== hashJson(delta.allowed_json_paths)
  ) {
    throw new Error("Incremental package delta differs from its reviewed package section");
  }
  return historical;
}
