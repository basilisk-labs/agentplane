import { readFile } from "node:fs/promises";
import path from "node:path";
import { defineScript, runScriptMain } from "../lib/script-runtime.mjs";

const ROOT = process.cwd();

const files = {
  docsIndex: path.join(ROOT, "docs", "index.mdx"),
  quickstart: path.join(ROOT, "docs", "start", "quickstart.mdx"),
  bootstrap: path.join(ROOT, "docs", "user", "agent-bootstrap.generated.mdx"),
  commands: path.join(ROOT, "docs", "user", "commands.mdx"),
  setup: path.join(ROOT, "docs", "user", "setup.mdx"),
  developerHarness: path.join(ROOT, "docs", "developer", "harness-dev.mdx"),
  agents: path.join(ROOT, "docs", "user", "agents.mdx"),
  lifecycle: path.join(ROOT, "docs", "user", "task-lifecycle.mdx"),
  workflow: path.join(ROOT, "docs", "user", "workflow.mdx"),
  workflowGuides: path.join(ROOT, "docs", "workflow-guides", "index.mdx"),
  recovery: path.join(ROOT, "docs", "help", "legacy-upgrade-recovery.mdx"),
  troubleshooting: path.join(ROOT, "docs", "help", "troubleshooting.mdx"),
  llmsFull: path.join(ROOT, "website", "static", "llms-full.txt"),
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

function assertTextOrder(haystack, needles, label) {
  let cursor = -1;
  for (const needle of needles) {
    const next = haystack.indexOf(needle, cursor + 1);
    if (next < 0) {
      throw new Error(`${label} is missing ordered text: ${needle}`);
    }
    cursor = next;
  }
}

const onboardingScenarios = [
  {
    name: "user-first supervised task",
    checks: [
      ["quickstart", "## Create the first task"],
      ["quickstart", 'agentplane task create "Fix the parser edge case" --json'],
      ["quickstart", "agentplane task run <task-id> --dry-run --json"],
      ["quickstart", "The JSON response includes `execution_preview`."],
      ["quickstart", "agentplane task advance <task-id> --agent-json"],
    ],
  },
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
    name: "framework-checkout handoff hidden from public user docs",
    checks: [
      ["developerHarness", "## Framework checkout handoff"],
      ["developerHarness", "agentplane runtime explain"],
      ["developerHarness", "bun run framework:dev:bootstrap"],
      ["developerHarness", "AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1"],
      ["developerHarness", "repo-local handoff"],
    ],
  },
  {
    name: "direct lifecycle",
    checks: [
      ["bootstrap", "## 2. Agent context"],
      ["bootstrap", "agentplane task advance <task-id> --agent-json"],
      ["bootstrap", "## 3. Direct happy path"],
      ["bootstrap", "`semantic_input_required`"],
      ["bootstrap", "agentplane task run <task-id>"],
      ["bootstrap", "## 4. Verification and incident reuse"],
      ["bootstrap", "## 5. Fallbacks and recovery"],
      ["lifecycle", "## Managed-runner route"],
      ["lifecycle", "## First complete workflow"],
      ["workflow", "## First managed workflow"],
      ["workflow", "agentplane task advance \"$TASK_ID\" --agent-json"],
      ["workflow", "`semantic_input_required`"],
      ["workflow", "agentplane task run <task-id>"],
    ],
  },
  {
    name: "branch_pr flow",
    checks: [
      ["commands", "## Branching (branch_pr)"],
      ["workflow", "## branch_pr mode"],
      ["workflow", "Agentplane creates or selects the task worktree"],
      ["lifecycle", "### `branch_pr`"],
      ["lifecycle", "The external caller does not change cwd or derive branch names."],
    ],
  },
];

const main = defineScript({
  name: "check-agent-onboarding-scenario",
  async run() {
    const fileContents = Object.fromEntries(
      await Promise.all(
        Object.entries(files).map(async ([key, file]) => [key, await readFile(file, "utf8")]),
      ),
    );

    for (const heading of [
      "## Choose your path",
      "## Documentation layers",
      "## Core references",
    ]) {
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

    assertIncludes(fileContents.lifecycle, "## Diagnostics and recovery", "task lifecycle");
    assertIncludes(
      fileContents.lifecycle,
      "agentplane task advance <task-id> --agent-json",
      "task lifecycle",
    );
    for (const forbidden of [
      "agentplane task start-ready",
      "agentplane work start",
      "agentplane pr open",
      "agentplane verify",
      "agentplane finish",
      "agentplane integrate",
      "git commit",
    ]) {
      if (fileContents.lifecycle.includes(forbidden)) {
        throw new Error(`task lifecycle exposes process choreography: ${forbidden}`);
      }
    }

    for (const label of [
      'label: "Start"',
      'label: "Context"',
      'label: "Core concepts"',
      'label: "Workflow guides"',
      'label: "Reference"',
    ]) {
      assertIncludes(fileContents.sidebar, label, "sidebar");
    }

    for (const retiredToolPage of [
      '"workflow-guides/claude-code"',
      '"workflow-guides/codex"',
      '"workflow-guides/cursor"',
      '"workflow-guides/aider"',
    ]) {
      if (fileContents.sidebar.includes(retiredToolPage)) {
        throw new Error(`sidebar must not expose retired tool-specific page: ${retiredToolPage}`);
      }
    }

    assertIncludes(
      fileContents.docsIndex,
      "Hand work to any coding agent",
      "docs index agent-agnostic workflow path",
    );
    assertIncludes(
      fileContents.workflowGuides,
      "Agentplane is agent-agnostic and LLM-agnostic",
      "unified workflow guide",
    );
    assertIncludes(
      fileContents.workflowGuides,
      "The agent writes code, uses the CLI, follows `AGENTS.md`, and records verification.",
      "unified workflow guide",
    );

    for (const navLabel of ['label: "Docs"', 'label: "Examples"', 'label: "Quickstart"']) {
      assertIncludes(fileContents.docusaurusConfig, navLabel, "navbar");
    }

    for (const scenario of onboardingScenarios) {
      for (const [fileKey, needle] of scenario.checks) {
        assertScenarioText(fileContents, fileKey, needle, scenario.name);
      }
    }

    for (const [fileKey, label] of [
      ["bootstrap", "generated bootstrap"],
      ["lifecycle", "task lifecycle"],
      ["workflow", "workflow guide"],
      ["llmsFull", "LLM documentation corpus"],
    ]) {
      const contents = fileContents[fileKey];
      assertIncludes(contents, "semantic_input_required", label);
      if (contents.includes("`task run` resolves the same planning episode")) {
        throw new Error(`${label} contains the stale managed-planning claim`);
      }
    }

    assertTextOrder(
      fileContents.bootstrap,
      [
        "## 3. Direct happy path",
        "agentplane task advance <task-id> --agent-json",
        "agentplane task run <task-id>",
        "semantic_input_required",
      ],
      "generated bootstrap planning boundary",
    );
    assertTextOrder(
      fileContents.lifecycle,
      [
        "## First complete workflow",
        'agentplane task advance "$TASK_ID" --agent-json',
        "`task run` for an eligible configured managed-runner episode",
        "semantic_input_required",
      ],
      "task lifecycle planning boundary",
    );
    for (const [fileKey, label] of [
      ["workflow", "workflow guide"],
      ["llmsFull", "LLM documentation corpus"],
    ]) {
      assertTextOrder(
        fileContents[fileKey],
        [
          "## First managed workflow",
          'agentplane task advance "$TASK_ID" --agent-json',
          'agentplane task run "$TASK_ID"',
          "semantic_input_required",
        ],
        `${label} planning boundary`,
      );
    }

    process.stdout.write("ok: agent onboarding scenario surfaces are aligned\n");
  },
});

runScriptMain(main);
