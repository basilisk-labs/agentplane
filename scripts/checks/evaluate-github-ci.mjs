import { appendFileSync } from "node:fs";

import { evaluateGithubCiAggregate } from "../lib/github-ci-capabilities.mjs";

function parseJsonEnv(name) {
  const raw = process.env[name];
  if (!raw) throw new Error(`${name} is empty`);
  return JSON.parse(raw);
}

const plan = parseJsonEnv("AGENTPLANE_CI_PLAN_JSON");
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
