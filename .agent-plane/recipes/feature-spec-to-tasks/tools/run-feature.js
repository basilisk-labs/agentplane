#!/usr/bin/env node
/**
 * feature-spec-to-tasks/tools/run-feature.js
 *
 * Local runner that turns a top-level task into a detailed roadmap and task draft.
 *
 * Contract:
 * - RECIPE_INPUTS_PATH: path to inputs.json (required)
 * - RECIPE_SCENARIO_ID: from-text | from-issue | refactor-existing (optional)
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
  if (!value) return "roadmap";
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64) || "roadmap";
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

function firstNonEmpty(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && String(value).trim()) {
      return value;
    }
  }
  return "";
}

function formatBulletList(items, fallback) {
  if (!items.length) return `- ${fallback}`;
  return items.map((item) => `- ${item}`).join("\n");
}

function resolveInputs(raw) {
  const inputs = { ...raw };
  if (!inputs.roadmap_slug) inputs.roadmap_slug = inputs.feature_slug;
  if (!inputs.roadmap_title) inputs.roadmap_title = inputs.feature_title;
  if (!inputs.task_description) inputs.task_description = inputs.feature_description;
  if (!inputs.task_description) inputs.task_description = inputs.issue_body;
  return inputs;
}

function buildPendingActions(inputs, scenarioId) {
  const pending = [];
  if (!String(inputs.roadmap_title || "").trim()) pending.push("Provide roadmap_title.");
  if (!String(inputs.roadmap_slug || "").trim()) pending.push("Provide roadmap_slug.");
  if (scenarioId === "from-text" && !String(inputs.task_description || "").trim()) {
    pending.push("Provide task_description for the top-level task.");
  }
  if (scenarioId === "from-issue") {
    if (!String(inputs.issue_url || "").trim()) pending.push("Provide issue_url.");
    if (!String(inputs.issue_body || "").trim()) pending.push("Provide issue_body.");
  }
  if (scenarioId === "refactor-existing") {
    if (!Array.isArray(inputs.existing_paths) || inputs.existing_paths.length === 0) {
      pending.push("Provide existing_paths (files or directories)." );
    }
    if (!String(inputs.pain_points || "").trim()) pending.push("Provide pain_points.");
  }
  return pending;
}

function buildFilesHint(inputs) {
  if (Array.isArray(inputs.existing_paths) && inputs.existing_paths.length > 0) {
    return inputs.existing_paths.join(", ");
  }
  const allowlist = Array.isArray(inputs.repo_paths_allowlist)
    ? inputs.repo_paths_allowlist
    : ["docs/**", "src/**", ".agent-plane/**", ".github/**"];
  return `TBD (stay within allowlist: ${allowlist.join(", ")})`;
}

function buildTasks(inputs) {
  const granularity = inputs.task_granularity || "normal";
  const filesHint = buildFilesHint(inputs);
  const tasks = [];

  if (granularity === "coarse") {
    tasks.push(
      {
        title: "Align scope and success criteria",
        goal: "Confirm scope, constraints, and success metrics with stakeholders.",
        scope: "Requirements alignment and roadmap outline.",
        steps: [
          "Review task description and constraints.",
          "Confirm acceptance criteria and metrics.",
          "List open questions and dependencies."
        ],
        verification: ["Stakeholder sign-off on scope and success criteria."],
        files_touched: filesHint,
        risk: "Misalignment if requirements are ambiguous.",
        owner: "PLANNER"
      },
      {
        title: "Implement core delivery plan",
        goal: "Deliver the core workflow for the task.",
        scope: "Core implementation and integration.",
        steps: [
          "Design the core workflow and interfaces.",
          "Implement the primary path.",
          "Handle critical errors and edge cases."
        ],
        verification: ["Primary workflow passes acceptance criteria."],
        files_touched: filesHint,
        risk: "Scope creep or missing edge cases.",
        owner: "CODER"
      },
      {
        title: "Validate, document, and roll out",
        goal: "Ensure quality, documentation, and rollout readiness.",
        scope: "Testing, docs, and rollout plan.",
        steps: [
          "Add tests and quality checks.",
          "Update documentation and release notes.",
          "Define rollback plan and monitoring."
        ],
        verification: ["Test suite passes and rollout checklist is complete."],
        files_touched: filesHint,
        risk: "Incomplete validation or missing rollback plan.",
        owner: "TESTER"
      }
    );
  } else {
    tasks.push(
      {
        title: "Align scope and success criteria",
        goal: "Confirm scope, constraints, and success metrics with stakeholders.",
        scope: "Requirements alignment and roadmap outline.",
        steps: [
          "Review task description and constraints.",
          "Confirm acceptance criteria and metrics.",
          "List open questions and dependencies."
        ],
        verification: ["Stakeholder sign-off on scope and success criteria."],
        files_touched: filesHint,
        risk: "Misalignment if requirements are ambiguous.",
        owner: "PLANNER"
      },
      {
        title: "Define architecture and interfaces",
        goal: "Design the technical approach and interfaces needed for delivery.",
        scope: "Architecture, data flows, and API contracts.",
        steps: [
          "Draft architecture notes and sequence of changes.",
          "Identify interface changes and dependencies.",
          "Document risks and mitigation."
        ],
        verification: ["Architecture notes reviewed and approved."],
        files_touched: filesHint,
        risk: "Hidden dependencies or incompatible interfaces.",
        owner: "CODER"
      },
      {
        title: "Implement core workflow",
        goal: "Deliver the primary workflow and integrations.",
        scope: "Core implementation and integration points.",
        steps: [
          "Implement the primary path.",
          "Handle critical error cases.",
          "Add logging for key steps."
        ],
        verification: ["Primary workflow meets acceptance criteria."],
        files_touched: filesHint,
        risk: "Core path incomplete or unstable.",
        owner: "CODER"
      },
      {
        title: "Add tests and validation",
        goal: "Ensure quality and prevent regressions.",
        scope: "Unit, integration, and regression tests.",
        steps: [
          "Add or update unit tests.",
          "Add integration or end-to-end coverage.",
          "Validate edge cases and failures."
        ],
        verification: ["Test suite passes and key edge cases are covered."],
        files_touched: filesHint,
        risk: "Insufficient coverage for high-risk areas.",
        owner: "TESTER"
      },
      {
        title: "Prepare rollout and docs",
        goal: "Make the change operationally ready.",
        scope: "Release notes, docs, and rollout checklist.",
        steps: [
          "Update documentation and onboarding notes.",
          "Define rollout and monitoring steps.",
          "Document rollback plan."
        ],
        verification: ["Rollout checklist is complete and reviewed."],
        files_touched: filesHint,
        risk: "Operational gaps during rollout.",
        owner: "DOCS"
      }
    );

    if (granularity === "fine") {
      tasks.push(
        {
          title: "Add instrumentation and monitoring",
          goal: "Ensure observability for the new workflow.",
          scope: "Metrics, logs, and alerts.",
          steps: [
            "Define key metrics and logs.",
            "Add dashboards or alert thresholds.",
            "Document monitoring ownership."
          ],
          verification: ["Metrics and alerts are visible in monitoring."],
          files_touched: filesHint,
          risk: "Limited visibility into production behavior.",
          owner: "CODER"
        },
        {
          title: "Risk review and rollback rehearsal",
          goal: "Validate failure modes and rollback readiness.",
          scope: "Risk assessment and rollback steps.",
          steps: [
            "Review highest risks and mitigations.",
            "Confirm rollback steps with owners.",
            "Document escalation paths."
          ],
          verification: ["Rollback plan reviewed and approved."],
          files_touched: filesHint,
          risk: "Rollback plan incomplete or untested.",
          owner: "REVIEWER"
        }
      );
    }
  }

  const criteria = listFromText(inputs.acceptance_criteria);
  if (criteria.length && granularity !== "coarse") {
    for (const item of criteria) {
      tasks.push({
        title: `Implement acceptance criteria: ${item}`,
        goal: "Satisfy a specific acceptance criteria item.",
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

  const batchSize = Number(inputs.task_batch_size) || 8;
  return tasks.slice(0, Math.max(1, batchSize));
}

function buildMilestones(inputs, tasks) {
  const dependencies = listFromText(inputs.dependencies);
  const constraints = listFromText(inputs.constraints);
  const criteria = listFromText(inputs.acceptance_criteria);

  const base = [
    {
      id: "alignment",
      title: "Alignment and discovery",
      goals: ["Confirm scope, constraints, and success metrics."],
      deliverables: ["Approved scope and success criteria."],
      tasks: tasks.slice(0, 1).map((task) => task.title),
      verification: ["Stakeholder approval documented."],
      dependencies
    },
    {
      id: "design",
      title: "Design and planning",
      goals: ["Define architecture, dependencies, and sequencing."],
      deliverables: ["Architecture notes and dependency map."],
      tasks: tasks.slice(1, 2).map((task) => task.title),
      verification: ["Architecture reviewed."],
      dependencies
    },
    {
      id: "build",
      title: "Build and integration",
      goals: ["Deliver core workflow and integrations."],
      deliverables: ["Core workflow implemented."],
      tasks: tasks.slice(2, 3).map((task) => task.title),
      verification: criteria.length ? criteria : ["Core workflow passes acceptance criteria."],
      dependencies
    },
    {
      id: "validate",
      title: "Validation and hardening",
      goals: ["Prove quality and handle edge cases."],
      deliverables: ["Tests and validation complete."],
      tasks: tasks.slice(3, 4).map((task) => task.title),
      verification: ["Test suite green."],
      dependencies
    },
    {
      id: "release",
      title: "Release and follow-up",
      goals: ["Prepare rollout and monitoring."],
      deliverables: ["Rollout checklist and docs."],
      tasks: tasks.slice(4, 5).map((task) => task.title),
      verification: ["Rollout plan approved."],
      dependencies
    }
  ];

  const count = Number(inputs.milestone_count) || base.length;
  if (count <= 0) return base;

  if (count < base.length) {
    const merged = base.slice();
    while (merged.length > count) {
      const last = merged.pop();
      const prev = merged[merged.length - 1];
      prev.goals = prev.goals.concat(last.goals);
      prev.deliverables = prev.deliverables.concat(last.deliverables);
      prev.tasks = prev.tasks.concat(last.tasks);
      prev.verification = prev.verification.concat(last.verification);
    }
    return merged;
  }

  if (count > base.length) {
    const extended = base.slice();
    for (let i = base.length + 1; i <= count; i += 1) {
      extended.push({
        id: `iteration-${i}`,
        title: `Iteration ${i}`,
        goals: ["Incremental improvements and follow-ups."],
        deliverables: ["Follow-up enhancements."],
        tasks: [],
        verification: ["Follow-up checklist complete."],
        dependencies
      });
    }
    return extended;
  }

  return base;
}

function renderRoadmapMarkdown(inputs, scenarioId, tasks, milestones, pendingActions) {
  const constraints = listFromText(inputs.constraints);
  const nonGoals = listFromText(inputs.non_goals);
  const criteria = listFromText(inputs.acceptance_criteria);
  const metrics = listFromText(inputs.success_metrics);
  const stakeholders = listFromText(inputs.stakeholders);
  const dependencies = listFromText(inputs.dependencies);

  const summary = firstNonEmpty(inputs.task_description, inputs.issue_body, inputs.pain_points, "TBD");

  let md = `# ${inputs.roadmap_title}\n\n`;
  md += `Generated: ${nowIso()}\n\n`;
  md += `Scenario: ${scenarioId}\n\n`;
  md += "## Task summary\n";
  md += `${summary}\n\n`;
  md += "## Scope\n";
  md += `- Target scope: ${inputs.target_scope || "MVP"}\n`;
  md += `- Risk level: ${inputs.risk_level || "medium"}\n\n`;
  md += "## Constraints\n";
  md += `${formatBulletList(constraints, "None provided.")}\n\n`;
  md += "## Non-goals\n";
  md += `${formatBulletList(nonGoals, "None provided.")}\n\n`;
  md += "## Acceptance criteria\n";
  md += `${formatBulletList(criteria, "None provided.")}\n\n`;
  md += "## Success metrics\n";
  md += `${formatBulletList(metrics, "None provided.")}\n\n`;
  md += "## Stakeholders\n";
  md += `${formatBulletList(stakeholders, "None provided.")}\n\n`;
  md += "## Dependencies\n";
  md += `${formatBulletList(dependencies, "None provided.")}\n\n`;
  md += "## Milestones\n";
  milestones.forEach((milestone, index) => {
    md += `\n### M${index + 1}: ${milestone.title}\n`;
    md += "**Goals**\n";
    md += `${formatBulletList(milestone.goals || [], "TBD")}\n\n`;
    md += "**Deliverables**\n";
    md += `${formatBulletList(milestone.deliverables || [], "TBD")}\n\n`;
    md += "**Tasks**\n";
    md += `${formatBulletList(milestone.tasks || [], "TBD")}\n\n`;
    md += "**Verification**\n";
    md += `${formatBulletList(milestone.verification || [], "TBD")}\n\n`;
    md += "**Dependencies**\n";
    md += `${formatBulletList(milestone.dependencies || [], "None")}`;
    md += "\n";
  });

  md += "\n## Task batch draft\n";
  tasks.forEach((task, index) => {
    md += `\n- ${index + 1}. ${task.title}`;
  });
  md += "\n\n";

  if (pendingActions.length) {
    md += "## Pending Actions\n";
    md += pendingActions.map((item) => `- ${item}`).join("\n");
    md += "\n";
  }

  return md;
}

function renderTasksDraft(inputs, tasks) {
  const batchSize = Number(inputs.task_batch_size) || tasks.length;
  let md = `# Roadmap tasks draft: ${inputs.roadmap_slug}\n\n`;
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

const inputsPath = process.env.RECIPE_INPUTS_PATH;
if (!inputsPath) die("Missing RECIPE_INPUTS_PATH");

const scenarioId = (process.env.RECIPE_SCENARIO_ID || "from-text").trim();
const runId = (process.env.RECIPE_RUN_ID || `run-${Date.now()}`).trim();

const rawInputs = readJson(inputsPath);
const inputs = resolveInputs(rawInputs);
const roadmapSlug = slugify(inputs.roadmap_slug || inputs.roadmap_title || "roadmap");
const roadmapTitle = inputs.roadmap_title || inputs.roadmap_slug || "Roadmap";

inputs.roadmap_slug = roadmapSlug;
inputs.roadmap_title = roadmapTitle;

const outDir = inputs.output_dir || "docs/roadmaps";
const runsDir = inputs.runs_dir || ".agent-plane/.runs";
const artifactsDir = path.join(runsDir, runId, "artifacts");
ensureDir(artifactsDir);
ensureDir(outDir);

const roadmapPath = path.join(outDir, `${roadmapSlug}.roadmap.md`);
const planPath = path.join(artifactsDir, `${roadmapSlug}.plan.json`);
const tasksDraftPath = path.join(artifactsDir, `${roadmapSlug}.tasks.draft.md`);
const migrationPath = path.join(artifactsDir, `${roadmapSlug}.migration.md`);

const pendingActions = buildPendingActions(inputs, scenarioId);
const tasks = buildTasks(inputs);
const milestones = buildMilestones(inputs, tasks);

const roadmap = renderRoadmapMarkdown(inputs, scenarioId, tasks, milestones, pendingActions);
fs.writeFileSync(roadmapPath, roadmap, "utf8");

const plan = {
  schema: "roadmap-plan@1",
  generated_at: nowIso(),
  run_id: runId,
  scenario_id: scenarioId,
  roadmap: {
    slug: roadmapSlug,
    title: roadmapTitle,
    target_scope: inputs.target_scope || "MVP",
    risk_level: inputs.risk_level || "medium"
  },
  inputs,
  milestones,
  tasks,
  pending_actions: pendingActions,
  tasks_draft_path: tasksDraftPath,
  roadmap_path: roadmapPath
};

fs.writeFileSync(planPath, JSON.stringify(plan, null, 2), "utf8");
fs.writeFileSync(tasksDraftPath, renderTasksDraft(inputs, tasks), "utf8");

if (scenarioId === "refactor-existing") {
  const existingPaths = Array.isArray(inputs.existing_paths) ? inputs.existing_paths : [];
  const migration =
    `# Migration plan: ${roadmapSlug}\n\n` +
    `Generated: ${nowIso()}\n\n` +
    "## Current state\n" +
    `${formatBulletList(existingPaths, "TBD")}\n\n` +
    "## Pain points\n" +
    `${firstNonEmpty(inputs.pain_points, "TBD")}\n\n` +
    "## Target state\n" +
    "- TBD\n\n" +
    "## Steps\n" +
    "1) TBD\n\n" +
    "## Rollback\n" +
    "- TBD\n";
  fs.writeFileSync(migrationPath, migration, "utf8");
}

console.log("OK");
console.log(JSON.stringify({
  run_id: runId,
  scenario_id: scenarioId,
  artifacts: {
    roadmap: roadmapPath,
    plan: planPath,
    tasks_draft: tasksDraftPath,
    migration: scenarioId === "refactor-existing" ? migrationPath : null
  }
}, null, 2));
