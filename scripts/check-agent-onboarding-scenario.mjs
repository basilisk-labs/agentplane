import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

const files = {
  docsIndex: path.join(ROOT, "docs", "index.mdx"),
  bootstrap: path.join(ROOT, "docs", "user", "agent-bootstrap.generated.mdx"),
  commands: path.join(ROOT, "docs", "user", "commands.mdx"),
  setup: path.join(ROOT, "docs", "user", "setup.mdx"),
  agents: path.join(ROOT, "docs", "user", "agents.mdx"),
  lifecycle: path.join(ROOT, "docs", "user", "task-lifecycle.mdx"),
  workflow: path.join(ROOT, "docs", "user", "workflow.mdx"),
  branching: path.join(ROOT, "docs", "user", "branching-and-pr-artifacts.mdx"),
  recovery: path.join(ROOT, "docs", "help", "legacy-upgrade-recovery.mdx"),
  troubleshooting: path.join(ROOT, "docs", "help", "troubleshooting.mdx"),
  sidebar: path.join(ROOT, "website", "sidebars.ts"),
  docusaurusConfig: path.join(ROOT, "website", "docusaurus.config.ts"),
};

function assertIncludes(haystack, needle, label) {
  if (!haystack.includes(needle)) {
    throw new Error(`${label} is missing required text: ${needle}`);
  }
}

function assertScenarioText(fileContents, fileKey, needle, scenario) {
  const haystack = fileContents[fileKey];
  if (!haystack) {
    throw new Error(`scenario ${scenario} references unknown file key: ${fileKey}`);
  }

  assertIncludes(haystack, needle, `${scenario} -> ${fileKey}`);
}

const onboardingScenarios = [
  {
    name: "legacy upgrade recovery",
    checks: [
      ["recovery", "## Shortest recovery path"],
      ["recovery", "agentplane upgrade --yes"],
      ["recovery", "agentplane upgrade --remote --yes"],
      ["setup", "1. **Clean managed state**"],
      ["setup", "2. **Partial upgrade state**"],
      ["setup", "3. **Manual drift state**"],
    ],
  },
  {
    name: "framework-checkout handoff",
    checks: [
      ["setup", "## Working inside the Agent Plane framework checkout"],
      ["setup", "agentplane runtime explain"],
      ["setup", "AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1"],
      ["commands", "## Runtime diagnostics"],
      ["commands", "repo-local binary automatically"],
      ["troubleshooting", "## linked dev binary refuses to run because build is stale"],
      ["troubleshooting", "## runtime source is unclear inside the framework checkout"],
      ["troubleshooting", "repo-local handoff"],
    ],
  },
  {
    name: "direct lifecycle",
    checks: [
      ["bootstrap", "## 2. Direct happy path"],
      [
        "bootstrap",
        "Treat `task verify-show` as the verification contract right before `verify` and `finish`.",
      ],
      ["bootstrap", "## 3. Fallbacks and recovery"],
      ["lifecycle", "## Minimal direct lifecycle"],
      ["lifecycle", "**Preferred close flow (single command)**"],
      ["workflow", "## Default direct path"],
      [
        "workflow",
        "The default happy path is `task start-ready -> task verify-show -> verify -> finish`.",
      ],
    ],
  },
  {
    name: "branch_pr flow",
    checks: [
      ["commands", "## Branching (branch_pr)"],
      ["commands", "agentplane integrate <task-id> --branch task/<task-id>/<slug> --run-verify"],
      ["workflow", "## branch_pr mode"],
      ["workflow", "- `agentplane work start ... --worktree` is required."],
      ["lifecycle", "## branch_pr mode"],
      ["lifecycle", "**Who closes the task:** INTEGRATOR on the base branch after merge."],
      ["branching", "### branch_pr"],
      ["branching", "Canonical task writes happen only on base branch."],
      ["branching", "INTEGRATOR performs verify, merge, and finish."],
      ["branching", "agentplane work start <task-id> --agent CODER --slug <slug> --worktree"],
    ],
  },
];

async function main() {
  const fileContents = Object.fromEntries(
    await Promise.all(
      Object.entries(files).map(async ([key, file]) => [key, await readFile(file, "utf8")]),
    ),
  );

  for (const heading of ["### Start", "### Work on a task", "### Upgrade & recover"]) {
    assertIncludes(fileContents.docsIndex, heading, "docs index");
  }

  assertIncludes(fileContents.setup, "### Managed ownership contract", "setup");
  assertIncludes(
    fileContents.setup,
    "do not treat `incidents.md` as part of the normal startup reading path for agents",
    "setup",
  );
  assertIncludes(
    fileContents.agents ?? "",
    "Agents should not read `incidents.md` during the normal startup path",
    "agents",
  );

  assertIncludes(fileContents.lifecycle, "**Exceptional/manual close paths**", "task lifecycle");
  assertIncludes(fileContents.lifecycle, "--no-close-commit", "task lifecycle");

  for (const label of ['label: "Start"', 'label: "Work on a task"', 'label: "Upgrade & recover"']) {
    assertIncludes(fileContents.sidebar, label, "sidebar");
  }

  for (const navLabel of [
    'label: "Start"',
    'label: "Work on a Task"',
    'label: "Upgrade & Recover"',
  ]) {
    assertIncludes(fileContents.docusaurusConfig, navLabel, "navbar");
  }

  for (const scenario of onboardingScenarios) {
    for (const [fileKey, needle] of scenario.checks) {
      assertScenarioText(fileContents, fileKey, needle, scenario.name);
    }
  }

  process.stdout.write("ok: agent onboarding scenario surfaces are aligned\n");
}

main().catch((error) => {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
