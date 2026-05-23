import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

const PUBLISH_WORKFLOW_PATH = path.resolve(process.cwd(), ".github/workflows/publish.yml");
const DISTRIBUTION_MODULE_WORKFLOW_PATH = path.resolve(
  process.cwd(),
  ".github/workflows/publish-distribution-module.yml",
);

describe("publish workflow contract", () => {
  it("names the primary workflow as a full release publisher", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("name: Publish release");
  });

  it("uses workflow_run from Core CI and downloads the exact detected release-ready artifact by run id", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("workflow_run:");
    expect(workflow).toContain("- Core CI");
    expect(workflow).toContain("github.event.workflow_run.conclusion == 'success'");
    expect(workflow).toContain(
      "if: github.event_name == 'workflow_dispatch' && needs.detect.outputs.should_publish == 'true'",
    );
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
    expect(workflow).toContain("Release incidents (check)");
    expect(workflow).toContain("[ -f scripts/check-release-incidents.mjs ]");
    expect(workflow).toContain("node scripts/check-release-incidents.mjs");
    expect(workflow).toContain(
      "node .agentplane/.release/runtime/scripts/check-release-incidents.mjs",
    );
    expect(workflow).toContain('RUNTIME_SCRIPT="scripts/resolve-release-ready-source.mjs"');
    expect(workflow).toContain(
      'RUNTIME_SCRIPT=".agentplane/.release/runtime/scripts/resolve-release-ready-source.mjs"',
    );
    expect(workflow).toContain('node "${RUNTIME_SCRIPT}" \\');
    expect(workflow).toContain("node scripts/manifest.mjs publish-result");
    expect(workflow).toContain("name: publish-result");
    expect(workflow).toContain("path: .agentplane/.release/publish/publish-result.json");
    expect(workflow).toContain("Fail incomplete publish-result");
    expect(workflow).toContain("if (!payload.success)");
    expect(workflow).toContain("Generate release distribution assets");
    expect(workflow).toContain("node scripts/generate-release-distribution.mjs");
    expect(workflow).toContain("Smoke Bun release assets");
    expect(workflow).toContain("scripts/smoke-bun-compiled-cli.mjs");
    expect(workflow).toContain('--expected-version "${VERSION}"');
    expect(workflow).toContain('if [[ "${artifact}" != *"-linux-x64.tar.gz" ]]; then');
    expect(workflow).toContain("args+=(--skip-cli-commands)");
    expect(workflow).toContain("Render Homebrew tap formula");
    expect(workflow).toContain("node scripts/render-homebrew-formula.mjs");
    expect(workflow).toContain("Render Scoop bucket manifest");
    expect(workflow).toContain("node scripts/render-scoop-manifest.mjs");
    expect(workflow).toContain("Render setup-agentplane action");
    expect(workflow).toContain("node scripts/render-setup-agentplane-action.mjs");
    expect(workflow).toContain("Publish Homebrew tap PR");
    expect(workflow).toContain("continue-on-error: true");
    expect(workflow).toContain("Publish Scoop bucket PR");
    expect(workflow).toContain("Publish setup-agentplane PR");
    expect(workflow).toContain("node scripts/publish-external-distribution.mjs");
    expect(workflow).toContain("HOMEBREW_TAP_TOKEN: ${{ secrets.HOMEBREW_TAP_TOKEN || '' }}");
    expect(workflow).toContain("SCOOP_BUCKET_TOKEN: ${{ secrets.SCOOP_BUCKET_TOKEN || '' }}");
    expect(workflow).toContain(
      "SETUP_AGENTPLANE_TOKEN: ${{ secrets.SETUP_AGENTPLANE_TOKEN || '' }}",
    );
    expect(workflow).toContain("--repo basilisk-labs/homebrew-tap");
    expect(workflow).toContain("--repo basilisk-labs/scoop-bucket");
    expect(workflow).toContain("--repo basilisk-labs/setup-agentplane");
    expect(workflow).toContain("--copy Formula/agentplane.rb:Formula/agentplane.rb");
    expect(workflow).toContain("--copy agentplane.json:bucket/agentplane.json");
    expect(workflow).toContain("--copy action.yml:action.yml");
    expect(workflow).toContain("--copy README.md:README.md");
    expect(workflow).toContain(
      "--out .agentplane/.release/publish/homebrew/homebrew-publish-result.json",
    );
    expect(workflow).toContain(
      "--out .agentplane/.release/publish/scoop/scoop-publish-result.json",
    );
    expect(workflow).toContain(
      "--out .agentplane/.release/publish/setup-agentplane/setup-agentplane-publish-result.json",
    );
    expect(workflow).toContain("Publish GHCR image");
    expect(workflow).toContain("id: publish_ghcr");
    expect(workflow).toContain("node scripts/render-ghcr-image-metadata.mjs");
    expect(workflow).toContain("docker login ghcr.io");
    expect(workflow).toContain("docker build \\");
    expect(workflow).toContain('--build-arg "AGENTPLANE_TARBALL_FILE=${AGENTPLANE_TARBALL_FILE}"');
    expect(workflow).toContain('docker push "${GHCR_VERSION_TAG}"');
    expect(workflow).toContain(
      ".agentplane/.release/publish/distribution/release-distribution.json",
    );
    expect(workflow).toContain(
      ".agentplane/.release/publish/distribution/agentplane-bun-v${{ needs.detect.outputs.version }}-darwin-arm64.tar.gz",
    );
    expect(workflow).toContain(
      ".agentplane/.release/publish/distribution/agentplane-bun-v${{ needs.detect.outputs.version }}-darwin-x64.tar.gz",
    );
    expect(workflow).toContain(
      ".agentplane/.release/publish/distribution/agentplane-bun-v${{ needs.detect.outputs.version }}-linux-arm64.tar.gz",
    );
    expect(workflow).toContain(
      ".agentplane/.release/publish/distribution/agentplane-bun-v${{ needs.detect.outputs.version }}-linux-x64.tar.gz",
    );
    expect(workflow).toContain(
      ".agentplane/.release/publish/distribution/agentplane-bun-v${{ needs.detect.outputs.version }}-win32-x64.zip",
    );
    expect(workflow).not.toContain(
      ".agentplane/.release/publish/distribution/standalone-assets.json",
    );
    expect(workflow).toContain(".agentplane/.release/publish/distribution/bun-assets.json");
    expect(workflow).toContain(".agentplane/.release/publish/distribution/install.sh");
    expect(workflow).toContain(".agentplane/.release/publish/distribution/install.ps1");
    expect(workflow).toContain(".agentplane/.release/publish/distribution/SHA256SUMS");
    expect(workflow).toContain("name: Upload release-distribution artifact");
    expect(workflow).toContain("name: release-distribution");
    expect(workflow).toContain("name: homebrew-module");
    expect(workflow).toContain("path: .agentplane/.release/publish/homebrew/");
    expect(workflow).toContain("name: scoop-module");
    expect(workflow).toContain("path: .agentplane/.release/publish/scoop/");
    expect(workflow).toContain("name: ghcr-module");
    expect(workflow).toContain("path: .agentplane/.release/publish/ghcr/");
    expect(workflow).toContain("name: setup-agentplane-module");
    expect(workflow).toContain("path: .agentplane/.release/publish/setup-agentplane/");
    expect(workflow).toContain(
      "--distribution-manifest .agentplane/.release/publish/distribution/release-distribution.json",
    );
    expect(workflow).toContain('--ghcr-outcome "${{ steps.publish_ghcr.outcome }}"');
    expect(workflow).toContain("if: always()");
    expect(workflow).toContain("actions: write");
    expect(workflow).toContain("pull-requests: write");
    expect(workflow).toContain("Prepare release task evidence");
    expect(workflow).toContain(
      "::warning::release task evidence prepare failed; publish-result remains the authoritative publication outcome",
    );
    expect(workflow).toContain("bun scripts/release-task-evidence.mjs prepare");
    expect(workflow).toContain(".agentplane/.release/publish/release-task-evidence.json");
    expect(workflow).toContain("Check for existing release evidence PR");
    expect(workflow).toContain("Apply release task evidence on a follow-up branch");
    expect(workflow).toContain("bun scripts/release-task-evidence.mjs apply");
    expect(workflow).toContain("Open or recover release evidence PR");
    expect(workflow).toContain("Enable auto-merge for release evidence PR");
    expect(workflow.indexOf("Create GitHub Release")).toBeLessThan(
      workflow.indexOf("Publish Homebrew tap PR"),
    );
    expect(workflow.indexOf("Publish setup-agentplane PR")).toBeLessThan(
      workflow.indexOf("Upload release-distribution artifact"),
    );
    for (const stepName of [
      "Prepare release task evidence",
      "Check for existing release evidence PR",
      "Apply release task evidence on a follow-up branch",
      "Push release evidence branch",
      "Dispatch Core CI for release evidence branch",
      "Open or recover release evidence PR",
      "Enable auto-merge for release evidence PR",
    ]) {
      const stepIndex = workflow.indexOf(`- name: ${stepName}`);
      expect(stepIndex).toBeGreaterThanOrEqual(0);
      const nextStepIndex = workflow.indexOf("\n      - name:", stepIndex + 1);
      const stepBlock = workflow.slice(
        stepIndex,
        nextStepIndex === -1 ? workflow.length : nextStepIndex,
      );
      expect(stepBlock).toContain("continue-on-error: true");
      if (
        [
          "Check for existing release evidence PR",
          "Dispatch Core CI for release evidence branch",
          "Open or recover release evidence PR",
          "Enable auto-merge for release evidence PR",
        ].includes(stepName)
      ) {
        expect(stepBlock).toContain("GH_TOKEN: ${{ github.token }}");
      }
    }
  });

  it("checks out base revision and initializes required submodules for publish", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("fetch-depth: 0");
    expect(workflow).toContain("submodules: false");
    expect(workflow).toContain("Initialize required publish-relevant submodules");
    expect(workflow).toContain("NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN || '' }}");
    expect(workflow).toContain("NPM_TOKEN: ${{ secrets.NPM_TOKEN || '' }}");
    expect(workflow).toContain("packages: write");
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
    expect(workflow).toContain("--wait");
    expect(workflow).toContain("--timeout-ms 900000");
    expect(workflow).toContain("--poll-interval-ms 15000");
    expect(workflow).toContain("node scripts/resolve-canonical-release-sha.mjs --json");
    expect(workflow).toContain(
      'echo "No canonical release candidate resolved from $(git rev-parse HEAD)." >&2',
    );
    expect(workflow).toContain(
      'description: "Git ref to evaluate only when sha is omitted (default: main)"',
    );
  });

  it("checks local task registry only after a release-ready source exists", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("Release task registry (check)");
    expect(workflow).toContain("if: steps.source.outputs.release_ready_ok == 'true'");
    expect(workflow).toContain("node scripts/release/check-task-registry-ready.mjs");
    expect(workflow).toContain("--allow-active-release-task");
    expect(workflow.indexOf("Resolve release-ready source")).toBeLessThan(
      workflow.indexOf("Release task registry (check)"),
    );
  });

  it("prints resolver diagnostics and dispatches branch CI for release evidence PRs", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("source.err");
    expect(workflow).toContain("cat .agentplane/.release/ready/source.err");
    expect(workflow).toContain("Dispatch Core CI for release evidence branch");
    expect(workflow).toContain(
      'gh workflow run ci.yml --ref "${{ steps.release_evidence.outputs.closure_branch }}"',
    );
    expect(workflow).toContain('gh pr checks "$pr_url" --watch --interval 15');
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

  it("adds an exact-SHA distribution module recovery workflow without npm publication", async () => {
    const workflow = await readFile(DISTRIBUTION_MODULE_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("name: Publish distribution module");
    expect(workflow).toContain("workflow_dispatch:");
    expect(workflow).toContain("tag:");
    expect(workflow).toContain("sha:");
    expect(workflow).toContain("module:");
    expect(workflow).toContain("ref: ${{ github.event.inputs.sha }}");
    expect(workflow).toContain("name: Checkout current workflow runtime");
    expect(workflow).toContain("path: .agentplane/.release/runtime");
    expect(workflow).toContain("node scripts/generate-release-distribution.mjs");
    expect(workflow).toContain("name: Download release-owned distribution manifest");
    expect(workflow).toContain('gh release download "$RELEASE_TAG"');
    expect(workflow).toContain("--pattern release-distribution.json");
    expect(workflow).toContain("release manifest sha mismatch");
    expect(workflow).toContain('RUNTIME_SCRIPTS=".agentplane/.release/runtime/scripts"');
    expect(workflow).toContain('node "${RUNTIME_SCRIPTS}/render-homebrew-formula.mjs"');
    expect(workflow).toContain('node "${RUNTIME_SCRIPTS}/render-scoop-manifest.mjs"');
    expect(workflow).toContain('node "${RUNTIME_SCRIPTS}/render-setup-agentplane-action.mjs"');
    expect(workflow).toContain(
      "node .agentplane/.release/runtime/scripts/publish-external-distribution.mjs",
    );
    expect(workflow).toContain("Publish GitHub Release assets");
    expect(workflow).toContain("Publish GHCR image");
    expect(workflow).toContain("Publish Homebrew tap PR");
    expect(workflow).toContain("Publish Scoop bucket PR");
    expect(workflow).toContain("Publish setup-agentplane PR");
    expect(workflow).toContain("distribution-module-${{ github.event.inputs.module }}");
    expect(workflow).toContain("Fail incomplete external distribution module");
    expect(workflow).toContain('["published", "unchanged"].includes(payload.status)');
    expect(workflow).not.toContain("npm publish");
    expect(workflow).not.toContain("Write npm auth config");
  });
});
