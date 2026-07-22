import { readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { format, resolveConfig } from "prettier";

import {
  COMPATIBILITY_BASELINE_ID,
  COMPATIBILITY_CONTRACT_SCHEMA_VERSION,
  PUBLISHED_TAG,
  PUBLISHED_TAG_SHA,
  TASK_PARENT_MAIN_SHA,
  assertGitRefMatchesSha,
  canonicalizeJson,
  capturePublishedNpmInventory,
  changedSurfaceSections,
  compatibilitySurfaceDigest,
  collectCompatibilitySurface,
  collectGitProvenance,
  createGitSource,
  surfaceSectionDigests,
} from "../lib/compatibility-contract.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const baselinePath = path.join(
  repoRoot,
  "scripts",
  "baselines",
  "v0.6.24-compatibility-contract.json",
);

function parseArgs(argv) {
  const options = {
    includePublishedNpm: false,
    registryCapturedOn: null,
    writeBaseline: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--include-published-npm") {
      options.includePublishedNpm = true;
      continue;
    }
    if (arg === "--registry-captured-on") {
      const value = argv[index + 1];
      if (!value) throw new Error("Missing value after --registry-captured-on");
      options.registryCapturedOn = value;
      index += 1;
      continue;
    }
    if (arg === "--write-baseline") {
      options.writeBaseline = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  if (
    options.includePublishedNpm &&
    !/^\d{4}-\d{2}-\d{2}$/u.test(options.registryCapturedOn ?? "")
  ) {
    throw new Error("--include-published-npm requires --registry-captured-on YYYY-MM-DD");
  }
  return options;
}

function helpText() {
  return [
    "Usage: node scripts/bench/capture-compatibility-contract.mjs [options]",
    "",
    "Capture the frozen v0.6.24 compatibility contract from local Git objects.",
    "",
    "Options:",
    "  --include-published-npm       Fetch npm pack inventories for the one-time baseline refresh.",
    "  --registry-captured-on <date> Required deterministic YYYY-MM-DD provenance for npm capture.",
    "  --write-baseline              Atomically replace the committed baseline with reviewed output.",
    "  --help                        Show this help.",
    "",
    "Without --include-published-npm, the committed immutable npm registry evidence is preserved.",
    "The committed CI check never contacts npm or any other network service.",
  ].join("\n");
}

function addSurfaceSections(store, surface) {
  const sectionDigests = surfaceSectionDigests(surface);
  for (const [name, digest] of Object.entries(sectionDigests)) {
    store[digest] ??= surface[name];
  }
  return sectionDigests;
}

function loadFrozenPublishedRegistry() {
  let baseline;
  try {
    baseline = JSON.parse(readFileSync(baselinePath, "utf8"));
  } catch (error) {
    throw new Error(
      `Unable to preserve frozen npm registry evidence from ${baselinePath}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  const registry = baseline?.published_registry;
  if (
    registry?.source !== "npm_registry" ||
    registry?.version !== "0.6.24" ||
    !Array.isArray(registry?.packages)
  ) {
    throw new Error(
      "Committed published_registry is missing or invalid; use --include-published-npm with an explicit capture date to refresh it.",
    );
  }
  return canonicalizeJson(registry);
}

function buildBaseline(options) {
  const publishedSource = createGitSource(repoRoot, PUBLISHED_TAG_SHA);
  const exactMainSource = createGitSource(repoRoot, TASK_PARENT_MAIN_SHA);
  const publishedSurface = collectCompatibilitySurface(publishedSource);
  const exactMainSurface = collectCompatibilitySurface(exactMainSource);
  const sections = {};
  const publishedSectionDigests = addSurfaceSections(sections, publishedSurface);
  const exactMainSectionDigests = addSurfaceSections(sections, exactMainSurface);
  const publishedSurfaceSha = compatibilitySurfaceDigest(publishedSectionDigests);
  const exactMainSurfaceSha = compatibilitySurfaceDigest(exactMainSectionDigests);
  const changedSections = changedSurfaceSections(publishedSurface, exactMainSurface);

  assertGitRefMatchesSha(repoRoot, PUBLISHED_TAG, PUBLISHED_TAG_SHA);
  const published = collectGitProvenance(repoRoot, PUBLISHED_TAG, "published_tag");
  const exactMain = collectGitProvenance(repoRoot, TASK_PARENT_MAIN_SHA, "task_parent_main");

  return canonicalizeJson({
    schema_version: COMPATIBILITY_CONTRACT_SCHEMA_VERSION,
    baseline_id: COMPATIBILITY_BASELINE_ID,
    contract_version: "0.6.24",
    references: {
      published_tag: {
        ...published,
        section_digests: publishedSectionDigests,
        surface_sha256: publishedSurfaceSha,
      },
      exact_main: {
        ...exactMain,
        section_digests: exactMainSectionDigests,
        surface_sha256: exactMainSurfaceSha,
      },
    },
    sections,
    preexisting_drift: {
      commit_sha_changed: published.commit_sha !== exactMain.commit_sha,
      surface_changed: publishedSurfaceSha !== exactMainSurfaceSha,
      changed_sections: changedSections,
      published_surface_sha256: publishedSurfaceSha,
      exact_main_surface_sha256: exactMainSurfaceSha,
    },
    ratchet: {
      reference: "exact_main",
      comparison: "normalized_surface_exact",
      surface_sha256: exactMainSurfaceSha,
      source_evidence_policy:
        "Raw implementation movement is reviewable; normalized public surfaces must remain exact.",
    },
    published_registry: options.includePublishedNpm
      ? {
          source: "npm_registry",
          version: "0.6.24",
          captured_on: options.registryCapturedOn,
          network_used_for_capture: true,
          network_required_for_ci_check: false,
          packages: capturePublishedNpmInventory(repoRoot),
        }
      : loadFrozenPublishedRegistry(),
  });
}

try {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(`${helpText()}\n`);
  } else {
    const baseline = buildBaseline(options);
    const prettierConfig = (await resolveConfig(baselinePath)) ?? {};
    const text = await format(JSON.stringify(baseline), {
      ...prettierConfig,
      filepath: baselinePath,
    });
    if (options.writeBaseline) {
      const temporaryPath = `${baselinePath}.tmp`;
      writeFileSync(temporaryPath, text, "utf8");
      renameSync(temporaryPath, baselinePath);
      process.stdout.write(`wrote ${path.relative(repoRoot, baselinePath)}\n`);
    } else {
      process.stdout.write(text);
    }
  }
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
