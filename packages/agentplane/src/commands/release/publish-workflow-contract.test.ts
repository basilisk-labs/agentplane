import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

const PUBLISH_WORKFLOW_PATH = path.resolve(process.cwd(), ".github/workflows/publish.yml");

describe("publish workflow contract", () => {
  it("uses workflow_run from Core CI and downloads the release-ready artifact by run id", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("workflow_run:");
    expect(workflow).toContain("- Core CI");
    expect(workflow).toContain("github.event.workflow_run.conclusion == 'success'");
    expect(workflow).toContain("actions/download-artifact@v4");
    expect(workflow).toContain("name: release-ready");
    expect(workflow).toContain("run-id: ${{ needs.detect.outputs.release_ready_run_id }}");
    expect(workflow).toContain("node scripts/resolve-release-ready-source.mjs");
    expect(workflow).toContain("node scripts/write-publish-result-manifest.mjs");
    expect(workflow).toContain("name: publish-result");
    expect(workflow).toContain("path: .agentplane/.release/publish/publish-result.json");
    expect(workflow).toContain("if: always()");
  });

  it("prefers an explicit workflow_dispatch sha over a mutable ref", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("workflow_dispatch:");
    expect(workflow).toContain("sha:");
    expect(workflow).toContain(
      'description: "Exact Git commit SHA to publish or recover from (preferred over ref)"',
    );
    expect(workflow).toContain('if [ -n "${{ github.event.inputs.sha }}" ]; then');
    expect(workflow).toContain('echo "ref=${{ github.event.inputs.sha }}" >> "$GITHUB_OUTPUT"');
    expect(workflow).toContain(
      'description: "Git ref to evaluate only when sha is omitted (default: main)"',
    );
  });

  it("serializes publish runs by release identity instead of branch ref", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("concurrency:");
    expect(workflow).toContain("github.event.workflow_run.head_sha");
    expect(workflow).toContain("github.event.inputs.sha");
    expect(workflow).toContain("cancel-in-progress: false");
    expect(workflow).not.toContain("${{ github.workflow }}-${{ github.ref }}");
  });
});
