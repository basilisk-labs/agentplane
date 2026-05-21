import { execFileSync } from "node:child_process";
import { appendFileSync, readFileSync } from "node:fs";

import { buildLocalCiExecutionPlan } from "../lib/local-ci-selection.mjs";

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
const executionPlan = buildLocalCiExecutionPlan({ mode: "fast", changedFiles });
const selector = executionPlan.selector;

appendOutput("route", executionPlan.route);
appendOutput("selector_kind", selector.kind);
appendOutput("bucket", selector.bucket ?? "");
appendOutput("buckets", Array.isArray(selector.buckets) ? selector.buckets.join(",") : "");
appendOutput(
  "needs_recipes_inventory",
  executionPlan.prerequisites?.recipesInventory === true ? "true" : "false",
);
appendOutput(
  "needs_workflow_lint",
  executionPlan.prerequisites?.workflowLint === true ? "true" : "false",
);
appendOutput("changed_files", executionPlan.changed_files.join("\n"));
appendOutput("changed_files_count", String(executionPlan.changed_files.length));

process.stdout.write(`${JSON.stringify(executionPlan, null, 2)}\n`);
