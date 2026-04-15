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
    expect(workflow).toContain("name: Checkout current workflow runtime");
    expect(workflow).toContain("path: .agentplane/.release/runtime");
    expect(workflow).toContain('RUNTIME_SCRIPT="scripts/resolve-release-ready-source.mjs"');
    expect(workflow).toContain(
      'RUNTIME_SCRIPT=".agentplane/.release/runtime/scripts/resolve-release-ready-source.mjs"',
    );
    expect(workflow).toContain('node "${RUNTIME_SCRIPT}" \\');
    expect(workflow).toContain("node scripts/write-publish-result-manifest.mjs");
    expect(workflow).toContain("name: publish-result");
    expect(workflow).toContain("path: .agentplane/.release/publish/publish-result.json");
    expect(workflow).toContain("if: always()");
  });

  it("checks out recursive submodules before validating the exact-ref publish payload", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("fetch-depth: 0");
    expect(workflow).toContain("submodules: recursive");
    expect(workflow).toContain("Validate exact-ref publish payload");
    expect(workflow).toContain("run: bun run release:check");
    expect(workflow).not.toContain("Run exact-ref release prepublish gate");
    expect(workflow).not.toContain("run: bun run release:prepublish");
    expect(workflow).not.toContain("name: Build release packages");
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
      'if [ "${{ github.event_name }}" = "workflow_dispatch" ] && [ -n "${{ github.event.inputs.sha }}" ]; then',
    );
    expect(workflow).toContain('SHA="${{ github.event.inputs.sha }}"');
    expect(workflow).toContain("git rev-list --first-parent --max-count=64 HEAD");
    expect(workflow).toContain(
      'echo "No reachable release-ready candidate found from $(git rev-parse HEAD)." >&2',
    );
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

  it("walks first-parent history for workflow_dispatch ref publishes before picking a release-ready sha", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("fetch-depth: 0");
    expect(workflow).toContain('elif [ "${{ github.event_name }}" = "workflow_dispatch" ]; then');
    expect(workflow).toContain("FOUND=false");
    expect(workflow).toContain("while IFS= read -r candidate; do");
    expect(workflow).toContain('SHA="${candidate}"');
    expect(workflow).toContain("done < <(git rev-list --first-parent --max-count=64 HEAD)");
  });
});
