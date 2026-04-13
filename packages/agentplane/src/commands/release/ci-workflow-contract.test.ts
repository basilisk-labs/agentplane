import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

const CI_WORKFLOW_PATH = path.resolve(process.cwd(), ".github/workflows/ci.yml");
const PREPUBLISH_WORKFLOW_PATH = path.resolve(process.cwd(), ".github/workflows/prepublish.yml");
const PATH_FILTERS_PATH = path.resolve(process.cwd(), ".github/path-filters.yml");

describe("Core CI workflow contract", () => {
  it("keeps the release-ready manifest job wired to the green release-relevant gates", async () => {
    const workflow = await readFile(CI_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("release-ready:");
    expect(workflow).toContain("name: Release-ready manifest");
    expect(workflow).toContain("needs:");
    expect(workflow).toContain("- changes");
    expect(workflow).toContain("- test");
    expect(workflow).toContain("- test-windows");
    expect(workflow).toContain(
      "if: github.event_name == 'push' && github.ref == 'refs/heads/main' && needs.changes.outputs.core == 'true'",
    );
    expect(workflow).toContain("node scripts/write-release-ready-manifest.mjs");
    expect(workflow).toContain("--out .agentplane/.release/ready/release-ready.json");
    expect(workflow).toContain('--sha "${GITHUB_SHA}"');
    expect(workflow).toContain("--check-registry");
    expect(workflow).toContain("if: steps.manifest.outputs.ready == 'true'");
    expect(workflow).toContain("actions/upload-artifact@v4");
    expect(workflow).toContain("name: release-ready");
    expect(workflow).toContain("path: .agentplane/.release/ready/release-ready.json");
  });

  it("keeps task-artifact-only diffs out of the heavy core gate", async () => {
    const ciWorkflow = await readFile(CI_WORKFLOW_PATH, "utf8");
    const prepublishWorkflow = await readFile(PREPUBLISH_WORKFLOW_PATH, "utf8");
    const filters = await readFile(PATH_FILTERS_PATH, "utf8");

    expect(ciWorkflow).toContain("filters: .github/path-filters.yml");
    expect(ciWorkflow).toContain("predicate-quantifier: every");
    expect(prepublishWorkflow).toContain("filters: .github/path-filters.yml");
    expect(prepublishWorkflow).toContain("predicate-quantifier: every");
    expect(filters).toContain(".agentplane/**");
    expect(filters).toContain("!.agentplane/tasks/**");
    expect(filters).toContain(".github/workflows/**");
    expect(filters).toContain(".github/path-filters.yml");
  });
});
