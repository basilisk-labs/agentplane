import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const requireFromCore = createRequire(new URL("../../packages/core/package.json", import.meta.url));
const { parse: parseYaml } = requireFromCore("yaml");

const MANAGED_DIRECTORIES = [
  "blueprint/",
  "evidence/",
  "pr/",
  "quality/",
  "supervision/",
  "verification/",
];
const IGNORED_README_FIELDS = [
  "revision",
  "result_summary",
  "status",
  "verification",
  "quality_review",
  "token_usage",
  "commit",
  "comments",
  "events",
  "doc_updated_at",
  "doc_updated_by",
  "execution_contract",
];
const VERIFICATION_RESULTS =
  /<!-- BEGIN VERIFICATION RESULTS -->[\s\S]*?<!-- END VERIFICATION RESULTS -->/gu;

function git(args, cwd) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function taskPath(value) {
  const match = /^\.agentplane\/tasks\/([^/]+)\/(.+)$/u.exec(value);
  return match ? { taskId: match[1], relativePath: match[2] } : null;
}

function splitFrontmatter(markdown) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/u.exec(markdown);
  if (!match) return null;
  const frontmatter = parseYaml(match[1]);
  if (!frontmatter || typeof frontmatter !== "object" || Array.isArray(frontmatter)) return null;
  return { frontmatter, body: markdown.slice(match[0].length) };
}

function stripSection(markdown, heading) {
  const escaped = heading.replaceAll(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  return markdown.replace(new RegExp(`(^|\\n)## ${escaped}\\n[\\s\\S]*?(?=\\n## |$)`, "u"), "");
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map((item) => canonicalize(item));
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .toSorted(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => [key, canonicalize(item)]),
  );
}

function comparableReadme(markdown) {
  try {
    const parsed = splitFrontmatter(markdown);
    if (!parsed) return null;
    const frontmatter = structuredClone(parsed.frontmatter);
    for (const field of IGNORED_README_FIELDS) Reflect.deleteProperty(frontmatter, field);
    if (frontmatter.extensions && typeof frontmatter.extensions === "object") {
      const extensions = { ...frontmatter.extensions };
      Reflect.deleteProperty(extensions, "agentplane.side_effect_authority");
      Reflect.deleteProperty(extensions, "workflow_route_baseline");
      if (Object.keys(extensions).length === 0) Reflect.deleteProperty(frontmatter, "extensions");
      else frontmatter.extensions = extensions;
    }
    if (frontmatter.sections && typeof frontmatter.sections === "object") {
      frontmatter.sections = Object.fromEntries(
        Object.entries(frontmatter.sections).map(([key, value]) => [
          key,
          key === "Findings" || key === "Notes"
            ? ""
            : key === "Verification" && typeof value === "string"
              ? value.replaceAll(VERIFICATION_RESULTS, "")
              : value,
        ]),
      );
    }
    const body = stripSection(
      stripSection(
        stripSection(parsed.body.replaceAll(VERIFICATION_RESULTS, ""), "Findings"),
        "Notes",
      ),
      "Token Usage",
    );
    return JSON.stringify(canonicalize({ frontmatter, body }));
  } catch {
    return null;
  }
}

function stringSetContainsAll(after, before) {
  if (!Array.isArray(before) || !Array.isArray(after)) return false;
  const values = new Set(after.filter((value) => typeof value === "string"));
  return before.every((value) => typeof value === "string" && values.has(value));
}

function verificationResultsContainAll(after, before) {
  if (!Array.isArray(before) || !Array.isArray(after)) return false;
  const identities = new Set(after.map((value) => JSON.stringify(canonicalize(value))));
  return before.every((value) => identities.has(JSON.stringify(canonicalize(value))));
}

function sameCanonical(left, right) {
  return JSON.stringify(canonicalize(left)) === JSON.stringify(canonicalize(right));
}

function executionContractStrengthened(before, after) {
  if (!before || !after || typeof before !== "object" || typeof after !== "object") return false;
  for (const field of [
    "schema_version",
    "source",
    "declaration",
    "selected_mode",
    "repository_mode",
    "authority",
    "safety",
  ]) {
    if (!sameCanonical(before[field], after[field])) return false;
  }
  if (!stringSetContainsAll(after.reason_codes, before.reason_codes)) return false;
  for (const field of [
    "repository_effects",
    "external_effects",
    "changed_paths",
    "changed_components",
    "authority_violations",
  ]) {
    if (!stringSetContainsAll(after.observed?.[field], before.observed?.[field])) return false;
  }
  if (
    !verificationResultsContainAll(
      after.observed?.verification_results,
      before.observed?.verification_results,
    )
  ) {
    return false;
  }
  if (
    !stringSetContainsAll(
      after.verification?.required_evidence,
      before.verification?.required_evidence,
    )
  ) {
    return false;
  }
  const beforeContract = before.verification?.contract;
  const afterContract = after.verification?.contract;
  if (!beforeContract || !afterContract) return false;
  for (const field of ["schema_version", "kind", "source", "phase", "policy_floor", "selector"]) {
    if (!sameCanonical(beforeContract[field], afterContract[field])) return false;
  }
  for (const field of [
    "repository_effects",
    "external_effects",
    "components",
    "evidence_requirements",
  ]) {
    if (!stringSetContainsAll(afterContract.declared?.[field], beforeContract.declared?.[field])) {
      return false;
    }
  }
  if (!sameCanonical(beforeContract.declared?.risk, afterContract.declared?.risk)) return false;
  for (const field of [
    "repository_effects",
    "external_effects",
    "changed_components",
    "changed_files",
  ]) {
    if (!stringSetContainsAll(afterContract.observed?.[field], beforeContract.observed?.[field])) {
      return false;
    }
  }
  for (const field of ["selected_checks", "execution_groups", "escalation_reasons"]) {
    if (!stringSetContainsAll(afterContract[field], beforeContract[field])) return false;
  }
  if (beforeContract.requires_full_regression && !afterContract.requires_full_regression)
    return false;
  if (beforeContract.requires_real_e2e && !afterContract.requires_real_e2e) return false;
  return /^sha256:[0-9a-f]{64}$/u.test(String(afterContract.digest ?? ""));
}

function readmeLifecycleAdvance(beforeMarkdown, afterMarkdown, parentSha) {
  const before = splitFrontmatter(beforeMarkdown);
  const after = splitFrontmatter(afterMarkdown);
  if (!before || !after || comparableReadme(beforeMarkdown) !== comparableReadme(afterMarkdown)) {
    return false;
  }
  if (
    !executionContractStrengthened(
      before.frontmatter.execution_contract,
      after.frontmatter.execution_contract,
    )
  ) {
    return false;
  }
  return (
    after.frontmatter.commit?.hash === parentSha &&
    after.frontmatter.verification?.state === "ok" &&
    after.frontmatter.quality_review?.state === "pass" &&
    after.frontmatter.quality_review?.evaluated_sha === parentSha
  );
}

function readBlob(cwd, revision, filePath) {
  try {
    return execFileSync("git", ["show", `${revision}:${filePath}`], {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch {
    return null;
  }
}

function readBlobBuffer(cwd, revision, filePath) {
  try {
    return execFileSync("git", ["show", `${revision}:${filePath}`], {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch {
    return null;
  }
}

function blobObject(cwd, revision, filePath) {
  try {
    return git(["rev-parse", `${revision}:${filePath}`], cwd);
  } catch {
    return null;
  }
}

function validBoundJsonArtifact({ cwd, currentSha, taskId, relativePath, filePath, parentSha }) {
  const objectMatch = /^quality\/objects\/sha256\/([0-9a-f]{64})\.[^/]+$/u.exec(relativePath);
  if (objectMatch) {
    const contents = readBlobBuffer(cwd, currentSha, filePath);
    return contents && createHash("sha256").update(contents).digest("hex") === objectMatch[1]
      ? null
      : "invalid_content_addressed_object";
  }
  if (!relativePath.endsWith(".json")) return null;
  const contents = readBlob(cwd, currentSha, filePath);
  if (contents === null) return "missing_managed_artifact";
  let artifact;
  try {
    artifact = JSON.parse(contents);
  } catch {
    return "malformed_managed_artifact";
  }
  if (relativePath.startsWith("verification/")) {
    return artifact.task_id === taskId &&
      artifact.result === "ok" &&
      artifact.implementation_sha === parentSha &&
      /^sha256:[0-9a-f]{64}$/u.test(String(artifact.input?.digest ?? ""))
      ? null
      : "invalid_verification_evidence";
  }
  if (/^quality\/[^/]+\/evaluator-work-order\.json$/u.test(relativePath)) {
    return artifact.task?.id === taskId && artifact.evaluated_sha === parentSha
      ? null
      : "invalid_evaluator_work_order";
  }
  if (/^quality\/[^/]+\/quality-report\.json$/u.test(relativePath)) {
    return artifact.task_id === taskId &&
      artifact.evaluated_sha === parentSha &&
      artifact.verdict === "pass"
      ? null
      : "invalid_quality_report";
  }
  if (/^quality\/[^/]+\/evaluator-result\.json$/u.test(relativePath)) {
    return artifact.verdict === "pass" ? null : "invalid_evaluator_result";
  }
  if (relativePath === "pr/meta.json") {
    return artifact.task_id === taskId &&
      artifact.pre_merge_closure?.basis_commit === parentSha &&
      artifact.pre_merge_closure?.state === "closed_before_merge"
      ? null
      : "invalid_pr_metadata";
  }
  return null;
}

export function evaluateLifecycleArtifactReuse({
  cwd = process.cwd(),
  parentSha,
  currentSha,
} = {}) {
  if (!/^[0-9a-f]{40}$/u.test(parentSha ?? "") || !/^[0-9a-f]{40}$/u.test(currentSha ?? "")) {
    return { eligible: false, reason: "invalid_revision", changed_files: [] };
  }
  const changedFiles = git(["diff", "--name-only", parentSha, currentSha], cwd)
    .split("\n")
    .filter(Boolean);
  if (changedFiles.length === 0) {
    return { eligible: false, reason: "empty_diff", changed_files: [] };
  }

  let lifecycleTaskId = null;
  let readmeCount = 0;
  for (const filePath of changedFiles) {
    const parsedPath = taskPath(filePath);
    if (!parsedPath) {
      return { eligible: false, reason: "non_task_artifact", changed_files: changedFiles };
    }
    lifecycleTaskId ??= parsedPath.taskId;
    if (parsedPath.taskId !== lifecycleTaskId) {
      return { eligible: false, reason: "multiple_task_artifacts", changed_files: changedFiles };
    }
    if (parsedPath.relativePath === "README.md") {
      readmeCount += 1;
      const before = readBlob(cwd, parentSha, filePath);
      const after = readBlob(cwd, currentSha, filePath);
      if (before === null || after === null || !readmeLifecycleAdvance(before, after, parentSha)) {
        return { eligible: false, reason: "semantic_readme_drift", changed_files: changedFiles };
      }
      continue;
    }
    if (MANAGED_DIRECTORIES.some((directory) => parsedPath.relativePath.startsWith(directory))) {
      const invalidReason = validBoundJsonArtifact({
        cwd,
        currentSha,
        taskId: parsedPath.taskId,
        relativePath: parsedPath.relativePath,
        filePath,
        parentSha,
      });
      if (invalidReason) {
        return {
          eligible: false,
          reason: invalidReason,
          changed_files: changedFiles,
        };
      }
      continue;
    }
    if (blobObject(cwd, parentSha, filePath) !== blobObject(cwd, currentSha, filePath)) {
      return { eligible: false, reason: "unmanaged_task_artifact", changed_files: changedFiles };
    }
  }

  if (readmeCount !== 1) {
    return { eligible: false, reason: "missing_task_readme", changed_files: changedFiles };
  }

  return {
    schema_version: 1,
    kind: "lifecycle_artifact_reuse_eligibility",
    eligible: true,
    reason: "semantic_lifecycle_drift_only",
    parent_sha: parentSha,
    current_sha: currentSha,
    changed_files: changedFiles,
    comparison_digest: `sha256:${createHash("sha256")
      .update(JSON.stringify({ parentSha, currentSha, changedFiles }))
      .digest("hex")}`,
  };
}
