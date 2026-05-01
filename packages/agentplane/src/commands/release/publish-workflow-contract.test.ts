import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

const PUBLISH_WORKFLOW_PATH = path.resolve(process.cwd(), ".github/workflows/publish.yml");

describe("publish workflow contract", () => {
  it("uses workflow_run from Core CI and downloads the exact detected release-ready artifact by run id", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("workflow_run:");
    expect(workflow).toContain("- Core CI");
    expect(workflow).toContain("github.event.workflow_run.conclusion == 'success'");
    expect(workflow).toContain(
      "release_ready_artifact_name: ${{ steps.source.outputs.release_ready_artifact_name }}",
    );
    expect(workflow).toContain("actions/download-artifact@v8");
    expect(workflow).toContain("RELEASE_READY_ARTIFACT_NAME=");
    expect(workflow).toContain('echo "release_ready_artifact_name=${RELEASE_READY_ARTIFACT_NAME}"');
    expect(workflow).toContain("name: ${{ needs.detect.outputs.release_ready_artifact_name }}");
    expect(workflow).toContain("run-id: ${{ needs.detect.outputs.release_ready_run_id }}");
    expect(workflow).toContain("name: Checkout current workflow runtime");
    expect(workflow).toContain("path: .agentplane/.release/runtime");
    expect(workflow).toContain('RUNTIME_SCRIPT="scripts/resolve-release-ready-source.mjs"');
    expect(workflow).toContain(
      'RUNTIME_SCRIPT=".agentplane/.release/runtime/scripts/resolve-release-ready-source.mjs"',
    );
    expect(workflow).toContain('node "${RUNTIME_SCRIPT}" \\');
    expect(workflow).toContain("node scripts/manifest.mjs publish-result");
    expect(workflow).toContain("name: publish-result");
    expect(workflow).toContain("path: .agentplane/.release/publish/publish-result.json");
    expect(workflow).toContain("Generate release distribution assets");
    expect(workflow).toContain("node scripts/generate-release-distribution.mjs");
    expect(workflow).toContain(".agentplane/.release/publish/distribution/release-distribution.json");
    expect(workflow).toContain(".agentplane/.release/publish/distribution/install.sh");
    expect(workflow).toContain(".agentplane/.release/publish/distribution/install.ps1");
    expect(workflow).toContain(".agentplane/.release/publish/distribution/SHA256SUMS");
    expect(workflow).toContain("if: always()");
    expect(workflow).toContain("pull-requests: write");
    expect(workflow).toContain("Prepare release task evidence");
    expect(workflow).toContain("bun scripts/release-task-evidence.mjs prepare");
    expect(workflow).toContain(".agentplane/.release/publish/release-task-evidence.json");
    expect(workflow).toContain("Check for existing release evidence PR");
    expect(workflow).toContain("Apply release task evidence on a follow-up branch");
    expect(workflow).toContain("bun scripts/release-task-evidence.mjs apply");
    expect(workflow).toContain("Open or recover release evidence PR");
    expect(workflow).toContain("Enable auto-merge for release evidence PR");
  });

  it("checks out recursive submodules before validating the exact-ref publish payload", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("fetch-depth: 0");
    expect(workflow).toContain("submodules: recursive");
    expect(workflow).toContain("NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN || '' }}");
    expect(workflow).toContain("NPM_TOKEN: ${{ secrets.NPM_TOKEN || '' }}");
    expect(workflow).toContain("name: Write npm auth config");
    expect(workflow).toContain('if [ -n "${NODE_AUTH_TOKEN:-}" ]; then');
    expect(workflow).toContain(
      'printf "//registry.npmjs.org/:_authToken=%s\\n" "${NODE_AUTH_TOKEN}"',
    );
    expect(workflow).toContain("Validate exact-ref publish payload");
    expect(workflow).toContain("run: bun run release:check");
    expect(workflow).toContain("recipes_published: ${{ steps.detect.outputs.recipes_published }}");
    expect(workflow).toContain("Publish @agentplaneorg/recipes");
    expect(workflow).toContain("working-directory: packages/recipes");
    expect(workflow).toContain(
      '--recipes-prepublished "${{ needs.detect.outputs.recipes_published }}"',
    );
    expect(workflow).toContain('--recipes-outcome "${{ steps.publish_recipes.outcome }}"');
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
    expect(workflow).toContain("node scripts/resolve-canonical-release-sha.mjs --json");
    expect(workflow).toContain(
      'echo "No canonical release candidate resolved from $(git rev-parse HEAD)." >&2',
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

  it("resolves a canonical release commit for workflow_dispatch ref publishes before picking a release-ready sha", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("fetch-depth: 0");
    expect(workflow).toContain('elif [ "${{ github.event_name }}" = "workflow_dispatch" ]; then');
    expect(workflow).toContain(".agentplane/.release/ready/canonical.json");
    expect(workflow).toContain(
      "SHA=\"$(node -e \"const fs=require('node:fs'); const payload=JSON.parse(fs.readFileSync('.agentplane/.release/ready/canonical.json','utf8')); process.stdout.write(String(payload.sha || ''));\")\"",
    );
  });
});
