#!/usr/bin/env node
/**
 * spec-to-tasks/tools/run-spec.js
 *
 * Local runner that turns a spec into a task batch and plan JSON.
 *
 * Contract:
 * - RECIPE_INPUTS_PATH: path to inputs.json (required)
 * - RECIPE_SCENARIO_ID: from-spec (optional)
 * - RECIPE_RUN_ID: run identifier (optional)
 */
const fs = require("fs");
const path = require("path");

function die(msg) {
  console.error(msg);
  process.exit(2);
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function nowIso() {
  return new Date().toISOString();
}

function slugify(value) {
  if (!value) return "spec";
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || "spec";
}

function listFromText(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter((item) => item.length > 0);
  }
  return String(value)
    .split("\n")
    .map((line) => line.replace(/^\s*[-*+]\s+/, "").trim())
    .filter((line) => line.length > 0);
}

function parseSpecSections(specText) {
  const lines = String(specText || "").split("\n");
  const sections = [];
  let current = null;
  for (const line of lines) {
    const match = line.match(/^##\s+(.+)/);
    if (match) {
      if (current) sections.push(current);
      current = { title: match[1].trim(), lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }
  if (current) sections.push(current);
  return sections;
}

function buildStepsFromSection(section) {
  const bullets = section.lines
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-") || line.startsWith("*"))
    .map((line) => line.replace(/^[-*]\s+/, ""))
    .filter((line) => line.length > 0);
  if (bullets.length) return bullets.slice(0, 6);
  return [
    `Implement requirements for ${section.title}.`,
    `Validate behavior for ${section.title}.`
  ];
}

function buildTasks(inputs, specText) {
  const tasks = [];
  const granularity = inputs.task_granularity || "normal";
  const allowlist = Array.isArray(inputs.repo_paths_allowlist)
    ? inputs.repo_paths_allowlist
    : ["docs/**", "src/**", ".agent-plane/**", ".github/**"];
  const filesHint = `TBD (stay within allowlist: ${allowlist.join(", ")})`;

  const sections = parseSpecSections(specText);
  for (const section of sections) {
    tasks.push({
      title: `Implement ${section.title}`,
      goal: `Deliver spec section: ${section.title}.`,
      scope: "Implementation and validation.",
      steps: buildStepsFromSection(section),
      verification: [`Spec section validated: ${section.title}.`],
      files_touched: filesHint,
      risk: "Section may require additional dependencies or context.",
      owner: "CODER"
    });
  }

  const criteria = listFromText(inputs.acceptance_criteria);
  if (criteria.length && granularity !== "coarse") {
    for (const item of criteria) {
      tasks.push({
        title: `Acceptance criteria: ${item}`,
        goal: "Satisfy an acceptance criteria item.",
        scope: "Targeted implementation and validation.",
        steps: [
          `Implement behavior for: ${item}.`,
          "Add validation or tests for this behavior."
        ],
        verification: [`Acceptance criteria satisfied: ${item}.`],
        files_touched: filesHint,
        risk: "Criteria not fully implemented or validated.",
        owner: "CODER"
      });
    }
  }

  if (!tasks.length) {
    tasks.push(
      {
        title: "Define implementation plan",
        goal: "Translate the spec into concrete steps.",
        scope: "Planning and decomposition.",
        steps: [
          "Review the spec text.",
          "List deliverables and dependencies.",
          "Identify open questions."
        ],
        verification: ["Plan reviewed by stakeholders."],
        files_touched: filesHint,
        risk: "Spec lacks enough detail for decomposition.",
        owner: "PLANNER"
      },
      {
        title: "Implement core requirements",
        goal: "Deliver the main workflows in the spec.",
        scope: "Core implementation.",
        steps: [
          "Implement primary flows.",
          "Handle critical errors.",
          "Add logging where needed."
        ],
        verification: ["Core workflows pass acceptance criteria."],
        files_touched: filesHint,
        risk: "Unclear requirements or missing dependencies.",
        owner: "CODER"
      }
    );
  }

  const batchSize = Number(inputs.task_batch_size) || 8;
  return tasks.slice(0, Math.max(1, batchSize));
}

function renderTasksDraft(specSlug, tasks, batchSize) {
  let md = `# Spec tasks draft: ${specSlug}\n\n`;
  md += "> This file is ready to be transferred into agent-plane via agentctl.\n\n";
  md += `## Batch 1 (max ${batchSize})\n\n`;

  tasks.forEach((task, index) => {
    md += `### ${index + 1}) ${task.title}\n`;
    md += `- Goal: ${task.goal}\n`;
    md += `- Scope: ${task.scope}\n`;
    md += "- Steps:\n";
    task.steps.forEach((step) => {
      md += `  - ${step}\n`;
    });
    md += "- Verification:\n";
    task.verification.forEach((item) => {
      md += `  - ${item}\n`;
    });
    md += `- Files touched: ${task.files_touched}\n`;
    md += `- Risks: ${task.risk}\n`;
    md += `- Owner agent: ${task.owner}\n\n`;
  });

  return md;
}

function buildPendingActions(inputs, specText) {
  const pending = [];
  if (!String(inputs.spec_slug || "").trim()) pending.push("Provide spec_slug.");
  if (!String(inputs.spec_title || "").trim()) pending.push("Provide spec_title.");
  if (!String(specText || "").trim()) pending.push("Provide spec_text.");
  return pending;
}

const inputsPath = process.env.RECIPE_INPUTS_PATH;
if (!inputsPath) die("Missing RECIPE_INPUTS_PATH");

const scenarioId = (process.env.RECIPE_SCENARIO_ID || "from-spec").trim();
const runId = (process.env.RECIPE_RUN_ID || `run-${Date.now()}`).trim();

const rawInputs = readJson(inputsPath);
const specText = rawInputs.spec_text || "";
const specSlug = slugify(rawInputs.spec_slug || rawInputs.spec_title || "spec");
const specTitle = rawInputs.spec_title || rawInputs.spec_slug || "Spec";

const inputs = {
  ...rawInputs,
  spec_slug: specSlug,
  spec_title: specTitle
};

const runsDir = inputs.runs_dir || ".agent-plane/.runs";
const artifactsDir = path.join(runsDir, runId, "artifacts");
ensureDir(artifactsDir);

const planPath = path.join(artifactsDir, `${specSlug}.plan.json`);
const tasksDraftPath = path.join(artifactsDir, `${specSlug}.tasks.draft.md`);

const tasks = buildTasks(inputs, specText);
const pendingActions = buildPendingActions(inputs, specText);
const batchSize = Number(inputs.task_batch_size) || tasks.length;

const plan = {
  schema: "spec-plan@1",
  generated_at: nowIso(),
  run_id: runId,
  scenario_id: scenarioId,
  spec: {
    slug: specSlug,
    title: specTitle
  },
  inputs,
  tasks,
  pending_actions: pendingActions,
  tasks_draft_path: tasksDraftPath
};

fs.writeFileSync(planPath, JSON.stringify(plan, null, 2), "utf8");
fs.writeFileSync(tasksDraftPath, renderTasksDraft(specSlug, tasks, batchSize), "utf8");

console.log("OK");
console.log(JSON.stringify({
  run_id: runId,
  scenario_id: scenarioId,
  artifacts: {
    plan: planPath,
    tasks_draft: tasksDraftPath
  }
}, null, 2));
