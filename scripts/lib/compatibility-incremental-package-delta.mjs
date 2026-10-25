import {
  diffJsonPaths,
  hashJson,
  packageSurface,
  surfaceSectionDigests,
} from "./compatibility-contract.mjs";

export function reconstructHistoricalPackageSurface(currentSurface, delta) {
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
  if (
    surfaceSectionDigests(historical).package_manifests !== delta.from_sha256 ||
    surfaceSectionDigests(currentSurface).package_manifests !== delta.to_sha256 ||
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
