import { createHash } from "node:crypto";

const FULL_REGRESSION_REPOSITORY_EFFECTS = new Set([
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
]);
const REAL_E2E_EXTERNAL_EFFECTS = new Set(["external_write", "credentials", "publish", "deploy"]);
const CENTRAL_PATH_PATTERNS = [
  /^package\.json$/u,
  /^bun\.lock$/u,
  /^schemas\//u,
  /^\.github\//u,
  /^scripts\/(?:checks|lib|workflow|release)\//u,
  /^packages\/core\//u,
  /^packages\/agentplane\/src\/(?:cli|commands\/shared|runtime\/task-routing)\//u,
];

function uniqueSorted(values) {
  return [...new Set(values.map((value) => String(value).trim()).filter(Boolean))].toSorted();
}

function normalizedPath(pathValue) {
  const normalized = String(pathValue).trim().replaceAll("\\", "/").replace(/^\.\//u, "");
  return !normalized || normalized.startsWith("../") || normalized.startsWith("/")
    ? ""
    : normalized;
}

export function repositoryEffectsForPath(pathValue) {
  const normalized = normalizedPath(pathValue);
  if (!normalized) return [];
  const effects = ["repository_write"];
  if (
    normalized.startsWith("docs/") ||
    normalized.startsWith("website/") ||
    normalized.startsWith(".agentplane/policy/") ||
    normalized === "README.md" ||
    normalized.endsWith(".md") ||
    normalized.endsWith(".mdx")
  ) {
    effects.push("documentation");
  }
  if (
    /(?:^|\/)(?:test|tests|__tests__)(?:\/|$)/u.test(normalized) ||
    /\.(?:spec|test)\.[cm]?[jt]sx?$/u.test(normalized)
  ) {
    effects.push("tests");
  } else if (
    /\.(?:[cm]?[jt]sx?|rs|go|py|java|kt|swift|rb|php|css|scss|html|sql)$/u.test(normalized)
  ) {
    effects.push("source_code");
  }
  if (
    normalized.startsWith(".github/workflows/") ||
    normalized === ".gitlab-ci.yml" ||
    normalized.startsWith(".circleci/")
  ) {
    effects.push("ci");
  }
  if (
    /(^|\/)(?:package\.json|bun\.lockb?|pnpm-lock\.yaml|yarn\.lock|package-lock\.json)$/u.test(
      normalized,
    )
  ) {
    effects.push("dependencies");
  }
  if (
    normalized.startsWith("schemas/") ||
    normalized.includes("/schemas/") ||
    normalized.startsWith("migrations/") ||
    normalized.includes("/migrations/") ||
    normalized.endsWith(".schema.json")
  ) {
    effects.push("schema");
  }
  if (
    normalized === "CHANGELOG.md" ||
    normalized.startsWith(".changeset/") ||
    normalized.startsWith("changesets/") ||
    normalized.startsWith("docs/releases/")
  ) {
    effects.push("release_metadata");
  }
  if (/^packages\/[^/]+\/src\/index\.[cm]?[jt]sx?$/u.test(normalized)) {
    effects.push("public_api");
  }
  return uniqueSorted(effects);
}

export function componentForVerificationPath(pathValue) {
  const normalized = normalizedPath(pathValue);
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) return "repository";
  if (segments[0] === "packages" && segments[1]) return `packages/${segments[1]}`;
  if (segments[0] === "apps" && segments[1]) return `apps/${segments[1]}`;
  return segments[0] ?? "repository";
}

export function isCentralVerificationPath(pathValue) {
  const normalized = normalizedPath(pathValue);
  return Boolean(normalized) && CENTRAL_PATH_PATTERNS.some((pattern) => pattern.test(normalized));
}

export function computeVerificationContractKernel({
  phase = "task",
  changedFiles = [],
  declaredRepositoryEffects = [],
  declaredExternalEffects = [],
  observedRepositoryEffects = [],
  observedExternalEffects = [],
  changedComponents = [],
  selectorKind = "semantic",
  selectorReason = "execution_declaration",
  selectedTestFiles = [],
  unknownPaths,
} = {}) {
  const files = uniqueSorted(changedFiles);
  const declaredRepository = uniqueSorted(declaredRepositoryEffects);
  const declaredExternal = uniqueSorted(declaredExternalEffects);
  const observedRepository = uniqueSorted([
    ...observedRepositoryEffects,
    ...files.flatMap((filePath) => repositoryEffectsForPath(filePath)),
  ]);
  const observedExternal = uniqueSorted(observedExternalEffects);
  const effectiveRepository = uniqueSorted([...declaredRepository, ...observedRepository]);
  const effectiveExternal = uniqueSorted([...declaredExternal, ...observedExternal]);
  const centralPaths = files.filter((filePath) => isCentralVerificationPath(filePath));
  const unmappedPaths = uniqueSorted(
    unknownPaths ??
      files.filter((filePath) => {
        const effects = repositoryEffectsForPath(filePath);
        return effects.length === 1 && effects[0] === "repository_write";
      }),
  );
  const phaseFloor = phase === "pr" || phase === "release";
  const fullEffects = effectiveRepository.filter((effect) =>
    FULL_REGRESSION_REPOSITORY_EFFECTS.has(effect),
  );
  const requiresFullRegression =
    phaseFloor ||
    selectorKind === "full-fast" ||
    centralPaths.length > 0 ||
    unmappedPaths.length > 0 ||
    fullEffects.length > 0;
  const requiresRealE2e =
    phase === "release" ||
    effectiveExternal.some((effect) => REAL_E2E_EXTERNAL_EFFECTS.has(effect));
  const selectedChecks = uniqueSorted([
    "task_outcome",
    ...(effectiveRepository.includes("documentation") ? ["docs_contract"] : []),
    ...(effectiveRepository.some((effect) => effect === "source_code" || effect === "tests")
      ? ["affected_unit_integration", "critical_paths"]
      : []),
    ...(requiresFullRegression ? ["full_regression"] : []),
    ...(requiresRealE2e ? ["real_e2e"] : []),
  ]);
  const body = {
    schema_version: 1,
    kind: "verification_contract",
    source: "execution_contract",
    phase,
    declared: {
      repository_effects: declaredRepository,
      external_effects: declaredExternal,
    },
    observed: {
      repository_effects: observedRepository,
      external_effects: observedExternal,
      changed_components: uniqueSorted([
        ...changedComponents,
        ...files.map((filePath) => componentForVerificationPath(filePath)),
      ]),
      changed_files: files,
    },
    policy_floor: {
      pr_full_regression: true,
      unknown_or_central_full_regression: true,
      monotonic_strengthening: true,
    },
    selector: {
      kind: selectorKind,
      reason: selectorReason,
      selected_test_files: uniqueSorted(selectedTestFiles),
    },
    selected_checks: selectedChecks,
    escalation_reasons: uniqueSorted([
      ...(phaseFloor ? [`phase_${phase}_full_regression`] : []),
      ...(selectorKind === "full-fast" ? [`selector_${selectorReason}`] : []),
      ...centralPaths.map((filePath) => `central_path:${filePath}`),
      ...unmappedPaths.map((filePath) => `unknown_path:${filePath}`),
      ...fullEffects.map((effect) => `effect_${effect}`),
      ...(requiresRealE2e ? ["external_effect_requires_real_e2e"] : []),
    ]),
    requires_full_regression: requiresFullRegression,
    requires_real_e2e: requiresRealE2e,
  };
  return {
    ...body,
    digest: `sha256:${createHash("sha256").update(JSON.stringify(body)).digest("hex")}`,
  };
}
