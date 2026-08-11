import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync } from "node:fs";

import { buildGithubCiCapabilityPlan } from "../lib/github-ci-capabilities.mjs";

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
    const headSha = process.env.GITHUB_SHA ?? event.pull_request.head?.sha;
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
const plan = buildGithubCiCapabilityPlan({
  changedFiles,
  eventName,
  headRef: process.env.GITHUB_HEAD_REF ?? event.pull_request?.head?.ref ?? "",
  ref: process.env.GITHUB_REF ?? "",
  exactShaRecovery,
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
appendOutput("changed_files", plan.changed_files.join("\n"));
appendOutput("changed_files_count", String(plan.changed_files_count));
appendOutput("expected_jobs", plan.expected_jobs.join(","));
appendOutput("executing_jobs_count", String(plan.executing_jobs_count));
const aggregatePlan = { ...plan };
delete aggregatePlan.local_execution_plan;
appendOutput("plan_json", JSON.stringify(aggregatePlan));

process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
