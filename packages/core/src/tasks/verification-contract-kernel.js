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

function checksForEvidenceRequirement(requirement) {
  if (requirement === "task_outcome") return ["task_outcome"];
  if (requirement === "hosted_integration") return ["hosted_integration"];
  if (requirement === "requirements_resolution") return ["requirements_resolution"];
  if (requirement === "implementation_risk_validation") return ["full_regression"];
  if (requirement.startsWith("verification_recovery:")) return ["recovery_validation"];
  if (requirement.startsWith("external_effect:")) return ["real_e2e"];
  if (requirement === "repository_effect:documentation") return ["docs_contract"];
  if (requirement === "repository_effect:repository_write") return ["task_outcome"];
  if (
    requirement === "repository_effect:source_code" ||
    requirement === "repository_effect:tests"
  ) {
    return ["affected_unit_integration", "critical_paths"];
  }
  if (requirement.startsWith("repository_effect:")) return ["full_regression"];
  return [`evidence:${requirement}`];
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

function computeVerificationContract(
  {
    phase = "task",
    changedFiles = [],
    declaredRepositoryEffects = [],
    declaredExternalEffects = [],
    observedRepositoryEffects = [],
    observedExternalEffects = [],
    changedComponents = [],
    declaredComponents = [],
    requirementsUncertainty = "bounded",
    implementationUncertainty = "bounded",
    reversibility = "reversible",
    evidenceRequirements = ["task_outcome"],
    selectorKind = "semantic",
    selectorReason = "execution_declaration",
    selectorExecutionMode = "semantic",
    selectorBucket = null,
    selectorBuckets = [],
    selectorLintTargets = [],
    selectorVitestPool = "forks",
    selectorRunCliDocsCheck = false,
    selectedTestFiles = [],
    unknownPaths,
  } = {},
  schemaVersion = 2,
) {
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
  const declaredComponentList = uniqueSorted(declaredComponents);
  const evidenceRequirementList = uniqueSorted(evidenceRequirements);
  const centralPaths = files.filter((filePath) => isCentralVerificationPath(filePath));
  const centralDeclaredComponents = declaredComponentList.filter((component) =>
    isCentralVerificationPath(component),
  );
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
  const riskRequiresFullRegression =
    requirementsUncertainty === "material" ||
    implementationUncertainty === "material" ||
    reversibility !== "reversible";
  const requiresFullRegression =
    phaseFloor ||
    selectorExecutionMode === "full" ||
    selectorKind === "full-fast" ||
    centralPaths.length > 0 ||
    centralDeclaredComponents.length > 0 ||
    unmappedPaths.length > 0 ||
    fullEffects.length > 0 ||
    riskRequiresFullRegression;
  const requiresRealE2e =
    phase === "release" ||
    effectiveExternal.some((effect) => REAL_E2E_EXTERNAL_EFFECTS.has(effect)) ||
    reversibility !== "reversible";
  const selectedChecks = uniqueSorted([
    "task_outcome",
    ...evidenceRequirementList.flatMap((requirement) => checksForEvidenceRequirement(requirement)),
    ...(effectiveRepository.includes("documentation") ? ["docs_contract"] : []),
    ...(effectiveRepository.some((effect) => effect === "source_code" || effect === "tests")
      ? ["affected_unit_integration", "critical_paths"]
      : []),
    ...(requiresFullRegression ? ["full_regression"] : []),
    ...(requiresRealE2e ? ["real_e2e"] : []),
  ]);
  const executionGroupSet = new Set([
    "core",
    ...(selectedChecks.includes("docs_contract") || requiresFullRegression ? ["docs-schema"] : []),
    ...(selectedChecks.some((check) => check === "real_e2e" || check === "recovery_validation") ||
    requiresFullRegression
      ? ["runtime"]
      : []),
    ...(selectedChecks.includes("critical_paths") || requiresFullRegression ? ["cli"] : []),
  ]);
  const executionGroups = ["docs-schema", "core", "runtime", "cli"].filter((group) =>
    executionGroupSet.has(group),
  );
  const observed = {
    repository_effects: observedRepository,
    external_effects: observedExternal,
    changed_components: uniqueSorted([
      ...changedComponents,
      ...files.map((filePath) => componentForVerificationPath(filePath)),
    ]),
    changed_files: files,
  };
  const policyFloor = {
    pr_full_regression: true,
    unknown_or_central_full_regression: true,
    monotonic_strengthening: true,
  };
  const escalationReasons = uniqueSorted([
    ...(phaseFloor ? [`phase_${phase}_full_regression`] : []),
    ...(selectorExecutionMode === "full" ? ["execution_mode_full"] : []),
    ...(selectorKind === "full-fast" ? [`selector_${selectorReason}`] : []),
    ...centralPaths.map((filePath) => `central_path:${filePath}`),
    ...(schemaVersion === 2
      ? centralDeclaredComponents.map((component) => `central_component:${component}`)
      : []),
    ...unmappedPaths.map((filePath) => `unknown_path:${filePath}`),
    ...fullEffects.map((effect) => `effect_${effect}`),
    ...(schemaVersion === 2 && requirementsUncertainty === "material"
      ? ["material_requirements_uncertainty"]
      : []),
    ...(schemaVersion === 2 && implementationUncertainty === "material"
      ? ["material_implementation_uncertainty"]
      : []),
    ...(schemaVersion === 2 && reversibility !== "reversible"
      ? [`reversibility_${reversibility}`]
      : []),
    ...(requiresRealE2e ? ["external_effect_requires_real_e2e"] : []),
  ]);
  const body =
    schemaVersion === 1
      ? {
          schema_version: 1,
          kind: "verification_contract",
          source: "execution_contract",
          phase,
          declared: {
            repository_effects: declaredRepository,
            external_effects: declaredExternal,
          },
          observed,
          policy_floor: policyFloor,
          selector: {
            kind: selectorKind,
            reason: selectorReason,
            selected_test_files: uniqueSorted(selectedTestFiles),
          },
          selected_checks: selectedChecks,
          escalation_reasons: escalationReasons,
          requires_full_regression: requiresFullRegression,
          requires_real_e2e: requiresRealE2e,
        }
      : {
          schema_version: 2,
          kind: "verification_contract",
          source: "execution_contract",
          phase,
          declared: {
            repository_effects: declaredRepository,
            external_effects: declaredExternal,
            components: declaredComponentList,
            risk: {
              requirements_uncertainty: requirementsUncertainty,
              implementation_uncertainty: implementationUncertainty,
              reversibility,
            },
            evidence_requirements: evidenceRequirementList,
          },
          observed,
          policy_floor: policyFloor,
          selector: {
            kind: selectorKind,
            reason: selectorReason,
            execution_mode: selectorExecutionMode,
            bucket: selectorBucket,
            buckets: uniqueSorted(selectorBuckets),
            lint_targets: uniqueSorted(selectorLintTargets),
            vitest_pool: selectorVitestPool,
            run_cli_docs_check: selectorRunCliDocsCheck,
            selected_test_files: uniqueSorted(selectedTestFiles),
          },
          selected_checks: selectedChecks,
          execution_groups: executionGroups,
          escalation_reasons: escalationReasons,
          requires_full_regression: requiresFullRegression,
          requires_real_e2e: requiresRealE2e,
        };
  return {
    ...body,
    digest: `sha256:${createHash("sha256").update(JSON.stringify(body)).digest("hex")}`,
  };
}

export function computeVerificationContractKernel(input = {}) {
  return computeVerificationContract(input, 2);
}

export function computeLegacyVerificationContractKernel(input = {}) {
  return computeVerificationContract(input, 1);
}
