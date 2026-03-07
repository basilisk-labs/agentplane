import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

const files = {
  docsIndex: path.join(ROOT, "docs", "index.mdx"),
  setup: path.join(ROOT, "docs", "user", "setup.mdx"),
  lifecycle: path.join(ROOT, "docs", "user", "task-lifecycle.mdx"),
  recovery: path.join(ROOT, "docs", "help", "legacy-upgrade-recovery.mdx"),
  sidebar: path.join(ROOT, "website", "sidebars.ts"),
  docusaurusConfig: path.join(ROOT, "website", "docusaurus.config.ts"),
};

function assertIncludes(haystack, needle, label) {
  if (!haystack.includes(needle)) {
    throw new Error(`${label} is missing required text: ${needle}`);
  }
}

async function main() {
  const [docsIndex, setup, lifecycle, recovery, sidebar, docusaurusConfig] = await Promise.all(
    Object.values(files).map((file) => readFile(file, "utf8")),
  );

  for (const heading of ["### Start", "### Work on a task", "### Upgrade & recover"]) {
    assertIncludes(docsIndex, heading, "docs index");
  }

  assertIncludes(setup, "### Managed ownership contract", "setup");
  assertIncludes(setup, "1. **Clean managed state**", "setup");
  assertIncludes(setup, "2. **Partial upgrade state**", "setup");
  assertIncludes(setup, "3. **Manual drift state**", "setup");
  assertIncludes(setup, ".agentplane/policy/incidents.md", "setup");

  assertIncludes(lifecycle, "**Preferred close flow (single command)**", "task lifecycle");
  assertIncludes(lifecycle, "**Exceptional/manual close paths**", "task lifecycle");
  assertIncludes(lifecycle, "--no-close-commit", "task lifecycle");

  assertIncludes(recovery, "## Shortest recovery path", "legacy recovery");
  assertIncludes(recovery, "## Managed ownership contract", "legacy recovery");
  assertIncludes(recovery, "agentplane upgrade --remote --yes", "legacy recovery");

  for (const label of [
    'label: "◈ Start"',
    'label: "◉ Work on a task"',
    'label: "◌ Upgrade & recover"',
  ]) {
    assertIncludes(sidebar, label, "sidebar");
  }

  for (const navLabel of [
    'label: "Start"',
    'label: "Work on a Task"',
    'label: "Upgrade & Recover"',
  ]) {
    assertIncludes(docusaurusConfig, navLabel, "navbar");
  }

  process.stdout.write("ok: agent onboarding scenario surfaces are aligned\n");
}

main().catch((error) => {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
