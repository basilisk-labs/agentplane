export const PACKAGE_TARBALL_IDENTITIES = Object.freeze([
  Object.freeze({ dir: "core", name: "@agentplaneorg/core" }),
  Object.freeze({ dir: "recipes", name: "@agentplaneorg/recipes" }),
  Object.freeze({ dir: "agentplane", name: "agentplane" }),
]);

export const REQUIRED_TARBALL_FILES = Object.freeze([
  "package.json",
  "README.md",
  "LICENSE",
  "dist/.build-manifest.json",
]);

const DENIED_PREFIXES = Object.freeze([".agentplane/", "src/", "docs/", "scripts/", "website/"]);
const DENIED_SEGMENTS = Object.freeze(["/__snapshots__/"]);
const DENIED_FILE_PATTERNS = Object.freeze([
  /\.(?:test|spec)\.(?:ts|tsx|js|mjs|cjs)$/u,
  /\.(?:log|jsonl|tsbuildinfo|map)$/u,
]);
const AGENTPLANE_EXACT_FILES = Object.freeze([
  "package.json",
  "README.md",
  "LICENSE",
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
]);
const LIBRARY_EXACT_FILES = Object.freeze([
  "package.json",
  "README.md",
  "LICENSE",
  "dist/.build-manifest.json",
]);
const LIBRARY_DIST_PATTERN = /^dist\/.+\.(?:js|d\.ts)$/u;

export function isDeniedTarballPath(pathInPackage) {
  if (DENIED_PREFIXES.some((prefix) => pathInPackage.startsWith(prefix))) return true;
  if (DENIED_SEGMENTS.some((segment) => pathInPackage.includes(segment))) return true;
  return DENIED_FILE_PATTERNS.some((pattern) => pattern.test(pathInPackage));
}

export function isAllowedTarballPath(pathInPackage, packageName) {
  if (packageName === "agentplane") {
    return pathInPackage.startsWith("assets/") || AGENTPLANE_EXACT_FILES.includes(pathInPackage);
  }
  if (LIBRARY_EXACT_FILES.includes(pathInPackage)) return true;
  if (packageName === "@agentplaneorg/core" && pathInPackage.startsWith("schemas/")) return true;
  return LIBRARY_DIST_PATTERN.test(pathInPackage);
}

export function packageTarballPolicyContract() {
  return {
    schema_version: 1,
    package_identities: PACKAGE_TARBALL_IDENTITIES.map((entry) => ({ ...entry })).toSorted(
      (left, right) => left.name.localeCompare(right.name) || left.dir.localeCompare(right.dir),
    ),
    required_files: REQUIRED_TARBALL_FILES.toSorted(),
    denied: {
      prefixes: DENIED_PREFIXES.toSorted(),
      segments: DENIED_SEGMENTS.toSorted(),
      file_patterns: DENIED_FILE_PATTERNS.map((pattern) => pattern.source).toSorted(),
    },
    allowed: {
      agentplane_exact_files: AGENTPLANE_EXACT_FILES.toSorted(),
      agentplane_prefixes: ["assets/"],
      library_exact_files: LIBRARY_EXACT_FILES.toSorted(),
      core_prefixes: ["schemas/"],
      library_dist_pattern: LIBRARY_DIST_PATTERN.source,
    },
  };
}
