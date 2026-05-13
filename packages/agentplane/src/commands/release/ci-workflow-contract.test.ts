import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

const CI_WORKFLOW_PATH = path.resolve(process.cwd(), ".github/workflows/ci.yml");
const PREPUBLISH_WORKFLOW_PATH = path.resolve(process.cwd(), ".github/workflows/prepublish.yml");
const PATH_FILTERS_PATH = path.resolve(process.cwd(), ".github/path-filters.yml");

describe("Core CI workflow contract", () => {
  it("keeps the release-ready manifest job wired to the green release-relevant gates", async () => {
    const workflow = await readFile(CI_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("workflow_dispatch:");
    expect(workflow).toContain(
      'description: "Exact Git commit SHA to validate for release recovery (preferred over ref)"',
    );
    expect(workflow).toContain('default: "main"');
    expect(workflow).toContain("AGENTPLANE_CI_REF:");
    expect(workflow).toContain("AGENTPLANE_RELEASE_RECOVERY_SHA:");
    expect(workflow).toContain("ref: ${{ env.AGENTPLANE_CI_REF }}");
    expect(workflow).toContain("needs.changes.outputs.core == 'true' &&");
    expect(workflow).toContain(
      "!(github.event_name == 'workflow_dispatch' && github.event.inputs.sha != '')",
    );
    expect(workflow).toContain("recovery-validate:");
    expect(workflow).toContain(
      "if: github.event_name == 'workflow_dispatch' && github.event.inputs.sha != ''",
    );
    expect(workflow).toContain("Release parity (check)");
    expect(workflow).toContain("Release incidents (check)");
    expect(workflow).toContain("Build packages (dist + manifests)");
    expect(workflow).toContain("release-ready:");
    expect(workflow).toContain("name: Release-ready manifest");
    expect(workflow).toContain("needs:");
    expect(workflow).toContain("- changes");
    expect(workflow).toContain("- test");
    expect(workflow).toContain("- test-windows");
    expect(workflow).toContain("- recovery-validate");
    expect(workflow).toContain("Resolve release-ready target");
    expect(workflow).toContain("github.event_name == 'workflow_dispatch' &&");
    expect(workflow).toContain("github.event.inputs.sha != '' &&");
    expect(workflow).toContain("needs.recovery-validate.result == 'success'");
    expect(workflow).toContain(
      "!(github.event_name == 'workflow_dispatch' && github.event.inputs.sha != '') &&",
    );
    expect(workflow).toContain("github.event_name == 'pull_request' ||");
    expect(workflow).toContain("github.event_name == 'push' &&");
    expect(workflow).toContain("github.ref == 'refs/heads/main'");
    expect(workflow).toContain("needs.changes.outputs.core == 'true' &&");
    expect(workflow).toContain("needs.test.result == 'success' &&");
    expect(workflow).toContain("needs.test-windows.result == 'success'");
    expect(workflow).toContain("needs.changes.outputs.core != 'true'");
    expect(workflow).toContain("node scripts/manifest.mjs release-ready");
    expect(workflow).toContain("[ -f scripts/check-release-incidents.mjs ]");
    expect(workflow).toContain("node scripts/check-release-incidents.mjs");
    expect(workflow).toContain("target ref predates scripts/check-release-incidents.mjs");
    expect(workflow).toContain("--out .agentplane/.release/ready/release-ready.json");
    expect(workflow).toContain('--sha "${{ steps.target.outputs.sha }}"');
    expect(workflow).toContain('--ref "${AGENTPLANE_CI_REF}"');
    expect(workflow).toContain("--check-registry");
    expect(workflow).toContain("if: steps.manifest.outputs.ready == 'true'");
    expect(workflow).toContain("actions/upload-artifact@v7");
    expect(workflow).toContain("name: release-ready");
    expect(workflow).toContain("path: .agentplane/.release/ready/release-ready.json");
    expect(workflow).toContain("name: release-ready-${{ steps.target.outputs.sha }}");
  });

  it("runs core PR checks for mixed code/docs diffs while excluding task-artifact-only diffs", async () => {
    const ciWorkflow = await readFile(CI_WORKFLOW_PATH, "utf8");
    const prepublishWorkflow = await readFile(PREPUBLISH_WORKFLOW_PATH, "utf8");
    const filters = await readFile(PATH_FILTERS_PATH, "utf8");

    expect(ciWorkflow).toContain("filters: .github/path-filters.yml");
    expect(ciWorkflow).toContain("predicate-quantifier: some");
    expect(prepublishWorkflow).toContain("filters: .github/path-filters.yml");
    expect(prepublishWorkflow).toContain("predicate-quantifier: every");
    expect(filters).toContain(".agentplane/**");
    expect(filters).toContain("!.agentplane/tasks/**");
    expect(filters).toContain(".github/workflows/**");
    expect(filters).toContain(".github/path-filters.yml");
  });

  it("still emits a release-ready manifest on push main when heavy gates were skipped", async () => {
    const workflow = await readFile(CI_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain(
      "(\n              needs.changes.outputs.core == 'true' &&\n              needs.test.result == 'success' &&\n              needs.test-windows.result == 'success'\n            ) ||\n            needs.changes.outputs.core != 'true'",
    );
  });
});
