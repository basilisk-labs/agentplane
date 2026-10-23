import { createHash } from "node:crypto";
import { appendFileSync, readFileSync } from "node:fs";

import { evaluateGithubCiAggregate } from "../lib/github-ci-capabilities.mjs";

function parseJsonEnv(name) {
  const raw = process.env[name];
  if (!raw) throw new Error(`${name} is empty`);
  return JSON.parse(raw);
}

const planPath = process.env.AGENTPLANE_CI_PLAN_FILE;
if (!planPath) throw new Error("AGENTPLANE_CI_PLAN_FILE is empty");
const expectedDigest = process.env.AGENTPLANE_CI_PLAN_SHA256;
if (!/^[a-f0-9]{64}$/u.test(expectedDigest ?? "")) {
  throw new Error("AGENTPLANE_CI_PLAN_SHA256 is missing or malformed");
}
const planBytes = readFileSync(planPath);
if (createHash("sha256").update(planBytes).digest("hex") !== expectedDigest) {
  throw new Error("CI plan artifact digest mismatch");
}
const plan = JSON.parse(planBytes.toString("utf8"));
const needs = parseJsonEnv("AGENTPLANE_CI_RESULTS_JSON");
const jobResults = Object.fromEntries(
  Object.entries(needs).map(([job, value]) => [
    job,
    typeof value === "string" ? value : (value?.result ?? "missing"),
  ]),
);
const evaluation = evaluateGithubCiAggregate({ plan, jobResults });
const lines = [
  "## PR verification route",
  "",
  `- route: ${plan.route}`,
  `- reason: ${plan.route_reason}`,
  `- expected jobs: ${evaluation.expected_jobs.join(", ")}`,
  `- executing jobs including aggregate: ${plan.executing_jobs_count}`,
  `- changed files: ${plan.changed_files_count}`,
  "",
  "## Job results",
  "",
  ...Object.entries(jobResults).map(([job, result]) => `- ${job}: ${result}`),
];

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${lines.join("\n")}\n`);
}
process.stdout.write(`${JSON.stringify({ plan, job_results: jobResults, evaluation }, null, 2)}\n`);

if (!evaluation.ok) {
  throw new Error(`PR verification failed closed:\n${evaluation.findings.join("\n")}`);
}
