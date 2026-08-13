import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync } from "node:fs";

import { buildGithubCiCapabilityPlan } from "../lib/github-ci-capabilities.mjs";
import { evaluateLifecycleArtifactReuse } from "../lib/lifecycle-artifact-reuse.mjs";
import { readTaskVerificationEffects } from "../lib/task-verification-contracts.mjs";

function runGit(args) {
  return execFileSync("git", args, {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function readEventPayload() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (!eventPath) return {};
  return JSON.parse(readFileSync(eventPath, "utf8"));
}

function isZeroSha(value) {
  return /^0+$/u.test(String(value ?? ""));
}

function listChangedFiles() {
  const eventName = process.env.GITHUB_EVENT_NAME ?? "";
  const event = readEventPayload();

  if (eventName === "pull_request" && event.pull_request) {
    const baseSha = event.pull_request.base?.sha;
    const headSha = event.pull_request.head?.sha ?? process.env.GITHUB_SHA;
    if (!baseSha || !headSha) return [];
    return runGit(["diff", "--name-only", baseSha, headSha]).split("\n").filter(Boolean);
  }

  if (eventName === "push") {
    const before = event.before;
    const after = event.after ?? process.env.GITHUB_SHA;
    if (!before || !after || isZeroSha(before)) return [];
    return runGit(["diff", "--name-only", before, after]).split("\n").filter(Boolean);
  }

  return [];
}

function appendOutput(name, value) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (!outputPath) {
    process.stdout.write(`${name}=${value}\n`);
    return;
  }
  const delimiter = `EOF_${name}_${Date.now()}`;
  const payload = `${name}<<${delimiter}\n${value}\n${delimiter}\n`;
  appendFileSync(outputPath, payload);
}

const changedFiles = listChangedFiles();
const event = readEventPayload();
const eventName = process.env.GITHUB_EVENT_NAME ?? "";
const exactShaRecovery =
  eventName === "workflow_dispatch" &&
  Boolean(process.env.AGENTPLANE_RELEASE_RECOVERY_SHA || event.inputs?.sha);
const pullRequestHead = event.pull_request?.head?.sha ?? "";
const headParent =
  eventName === "pull_request" && pullRequestHead
    ? runGit(["rev-parse", `${pullRequestHead}^`])
    : "";
const lifecycleReuse =
  headParent && pullRequestHead
    ? evaluateLifecycleArtifactReuse({ parentSha: headParent, currentSha: pullRequestHead })
    : { eligible: false };
async function hasSuccessfulParentVerification(parentSha) {
  const token = String(process.env.GITHUB_TOKEN ?? "").trim();
  const repository = String(process.env.GITHUB_REPOSITORY ?? "").trim();
  const apiUrl = String(process.env.GITHUB_API_URL ?? "https://api.github.com").replace(/\/$/u, "");
  if (!token || !repository || !/^[0-9a-f]{40}$/u.test(parentSha)) return false;
  const response = await fetch(`${apiUrl}/repos/${repository}/commits/${parentSha}/check-runs`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!response.ok) return false;
  const payload = await response.json();
  return Array.isArray(payload.check_runs)
    ? payload.check_runs.some(
        (check) => check?.name === "PR verification" && check?.conclusion === "success",
      )
    : false;
}
const canReuseVerifiedParent =
  lifecycleReuse.eligible === true && (await hasSuccessfulParentVerification(headParent));
const headRef = process.env.GITHUB_HEAD_REF ?? event.pull_request?.head?.ref ?? "";
const taskIdFromHead = /^task\/([^/]+)\//u.exec(headRef)?.[1] ?? null;
const semanticEffects = readTaskVerificationEffects([
  ...changedFiles,
  ...(taskIdFromHead ? [`.agentplane/tasks/${taskIdFromHead}/README.md`] : []),
]);
const plan = buildGithubCiCapabilityPlan({
  changedFiles,
  eventName,
  headRef,
  ref: process.env.GITHUB_REF ?? "",
  exactShaRecovery,
  lifecycleOnlyHead: canReuseVerifiedParent,
  reuseSha: headParent,
  semanticEffects,
});
const capabilities = plan.capabilities;

appendOutput("core", capabilities.core ? "true" : "false");
appendOutput("route", plan.route);
appendOutput("selector_kind", plan.selector_kind);
appendOutput("bucket", plan.bucket);
appendOutput("buckets", plan.buckets.join(","));
appendOutput(
  "needs_recipes_inventory",
  plan.local_execution_plan.prerequisites?.recipesInventory === true ? "true" : "false",
);
appendOutput(
  "needs_workflow_lint",
  plan.local_execution_plan.prerequisites?.workflowLint === true ? "true" : "false",
);
for (const [name, enabled] of Object.entries(capabilities)) {
  appendOutput(name, enabled ? "true" : "false");
}
appendOutput(
  "package_runtime",
  capabilities.package_runtime_core || capabilities.package_runtime_recipes ? "true" : "false",
);
appendOutput(
  "security",
  capabilities.dependency_review || capabilities.codeql_javascript || capabilities.codeql_actions
    ? "true"
    : "false",
);
appendOutput("codeql_languages", plan.codeql_languages.join(","));
appendOutput("release_ready", plan.release_ready ? "true" : "false");
appendOutput("exact_sha_recovery", plan.exact_sha_recovery ? "true" : "false");
appendOutput("lifecycle_only_head", plan.lifecycle_only_head ? "true" : "false");
appendOutput("reuse_sha", plan.reuse_sha);
appendOutput("changed_files", plan.changed_files.join("\n"));
appendOutput("changed_files_count", String(plan.changed_files_count));
appendOutput("expected_jobs", plan.expected_jobs.join(","));
appendOutput("executing_jobs_count", String(plan.executing_jobs_count));
appendOutput("verification_contract_digest", plan.verification_contract.digest);
appendOutput("requires_real_e2e", plan.verification_contract.requires_real_e2e ? "true" : "false");
const aggregatePlan = { ...plan };
delete aggregatePlan.local_execution_plan;
appendOutput("plan_json", JSON.stringify(aggregatePlan));

process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
