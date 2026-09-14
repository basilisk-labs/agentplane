import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";
import { parse as parseYaml } from "yaml";

const PUBLISH_WORKFLOW_PATH = path.resolve(process.cwd(), ".github/workflows/publish.yml");
const DISTRIBUTION_MODULE_WORKFLOW_PATH = path.resolve(
  process.cwd(),
  ".github/workflows/publish-distribution-module.yml",
);

type WorkflowJob = {
  "runs-on": string;
  needs: string | string[];
  if: string;
  steps: {
    name?: string;
    uses?: string;
    run?: string;
    env?: Record<string, string>;
    with?: Record<string, string | boolean>;
  }[];
};
type PublishWorkflow = { jobs: { distribution: WorkflowJob; publish: WorkflowJob } };

function step(job: WorkflowJob, name: string) {
  return job.steps.find((entry) => entry.name === name);
}

describe("publish workflow contract", () => {
  it.each(["false", "true"])(
    "uses current setup tooling and passes tag repair only for %s",
    async (repair) => {
      const workflow = parseYaml(
        await readFile(PUBLISH_WORKFLOW_PATH, "utf8"),
      ) as PublishWorkflow & {
        on: {
          workflow_dispatch: { inputs: { repair_setup_tag: { type: string; default: boolean } } };
        };
      };
      expect(workflow.on.workflow_dispatch.inputs.repair_setup_tag).toMatchObject({
        type: "boolean",
        default: false,
      });
      const publish = workflow.jobs.publish;
      const checkout = step(publish, "Checkout current setup publication runtime");
      expect(checkout).toMatchObject({
        uses: "actions/checkout@v6",
        with: {
          ref: "${{ github.workflow_sha }}",
          path: ".agentplane/.release/runtime",
          "persist-credentials": false,
        },
      });
      const render = step(publish, "Render setup-agentplane action");
      expect(render?.run).toContain(
        "node .agentplane/.release/runtime/scripts/render-setup-agentplane-action.mjs",
      );
      expect(publish.steps.indexOf(checkout!)).toBeLessThan(publish.steps.indexOf(render!));
      const publication = step(publish, "Publish setup-agentplane PR");
      expect(publication?.env?.REPAIR_SETUP_TAG).toBe(
        "${{ github.event.inputs.repair_setup_tag || 'false' }}",
      );
      if (!publication?.run) throw new Error("Missing setup publication command");
      const script = publication.run.replaceAll(/\$\{\{[^}]+\}\}/gu, "fixture");
      const stdout = execFileSync("bash", ["-c", `node() { printf '%s\\n' "$@"; }\n${script}`], {
        env: { ...process.env, REPAIR_SETUP_TAG: repair },
        encoding: "utf8",
      });
      const argv = stdout.trim().split("\n");
      expect(argv[0]).toBe(
        ".agentplane/.release/runtime/scripts/publish-external-distribution.mjs",
      );
      expect(argv.includes("--repair-existing-setup-tag")).toBe(repair === "true");
    },
  );

  it("builds signed historical assets on macOS and publishes the same run artifact", async () => {
    const workflow = parseYaml(await readFile(PUBLISH_WORKFLOW_PATH, "utf8")) as PublishWorkflow;
    const distribution = workflow.jobs.distribution;
    const publish = workflow.jobs.publish;
    expect(distribution["runs-on"]).toBe("macos-latest");
    expect(distribution.needs).toBe("detect");
    expect(distribution.if).toBe(publish.if);
    expect(publish.needs).toEqual(["detect", "distribution"]);
    expect(distribution.steps[0]?.with?.ref).toBe("main");
    expect(distribution.steps[0]?.with?.["persist-credentials"]).toBe(false);
    const runtime = step(distribution, "Checkout current packaging runtime");
    expect(runtime?.with?.ref).toBe("${{ github.workflow_sha }}");
    expect(runtime?.with?.["persist-credentials"]).toBe(false);
    const bun = distribution.steps.find((entry) => entry.uses?.startsWith("oven-sh/setup-bun@"));
    expect(bun?.uses).toMatch(/^oven-sh\/setup-bun@[0-9a-f]{40}$/u);
    expect(bun?.with?.["no-cache"]).toBe(true);
    const node = distribution.steps.find((entry) => entry.uses?.startsWith("actions/setup-node@"));
    expect(node?.with?.["package-manager-cache"]).toBe(false);
    const build = step(distribution, "Generate release distribution assets");
    expect(build?.run).toContain(
      ".agentplane/.release/runtime/scripts/generate-release-distribution.mjs",
    );
    expect(step(publish, "Generate release distribution assets")).toBeUndefined();
    const smoke = step(distribution, "Verify signed macOS release assets")?.run;
    expect(smoke).toContain("for arch in arm64 x64");
    expect(smoke).toContain("codesign --verify --strict");
    expect(smoke).toContain("process.arch");
    expect(smoke).not.toContain("--skip-cli-commands");
    const upload = step(distribution, "Upload signed release distribution assets");
    const download = step(publish, "Download signed release distribution assets");
    expect(upload?.with?.name).toBe(download?.with?.name);
    expect(download?.with?.["run-id"]).toBeUndefined();
    expect(upload?.with?.["if-no-files-found"]).toBe("error");
  });

  it.skipIf(process.platform === "win32").each(["ancestor", "unmerged", "invalid"])(
    "only builds release commits from main history (%s)",
    async (scenario) => {
      const workflow = parseYaml(await readFile(PUBLISH_WORKFLOW_PATH, "utf8")) as PublishWorkflow;
      const script = step(
        workflow.jobs.distribution,
        "Select qualified release source from main history",
      )?.run;
      if (!script) throw new Error("Release source ancestry check is missing");
      const root = await mkdtemp(path.join(tmpdir(), "agentplane-release-ancestry-"));
      try {
        const git = (...args: string[]) =>
          execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: "pipe" }).trim();
        git("init", "--initial-branch=main");
        git("config", "user.name", "Release fixture");
        git("config", "user.email", "release-fixture@example.invalid");
        git("-c", "commit.gpgsign=false", "commit", "--allow-empty", "-m", "release source");
        const release = git("rev-parse", "HEAD");
        git("-c", "commit.gpgsign=false", "commit", "--allow-empty", "-m", "main successor");
        const main = git("rev-parse", "HEAD");
        git("update-ref", "refs/remotes/origin/main", main);
        git("checkout", "-b", "unmerged", release);
        git("-c", "commit.gpgsign=false", "commit", "--allow-empty", "-m", "untrusted side branch");
        const unmerged = git("rev-parse", "HEAD");
        git("checkout", "main");
        const sha = scenario === "ancestor" ? release : scenario === "unmerged" ? unmerged : "main";
        const run = () =>
          execFileSync("bash", ["-c", script], {
            cwd: root,
            env: { ...process.env, RELEASE_SHA: sha },
            stdio: "pipe",
          });
        if (scenario === "ancestor") {
          expect(run).not.toThrow();
          expect(git("rev-parse", "HEAD")).toBe(release);
        } else {
          expect(run).toThrow();
          expect(git("rev-parse", "HEAD")).toBe(main);
        }
      } finally {
        await rm(root, { recursive: true, force: true });
      }
    },
  );

  it
    .skipIf(process.platform === "win32")
    .each(["valid", "sha", "version", "tag", "bytes", "checksums", "tarball"])(
    "validates distribution identity and transferred bytes (%s)",
    async (scenario) => {
      const workflow = parseYaml(await readFile(PUBLISH_WORKFLOW_PATH, "utf8")) as PublishWorkflow;
      const script = step(workflow.jobs.publish, "Validate signed distribution artifact")?.run;
      if (!script) throw new Error("Distribution validation step is missing");
      const root = await mkdtemp(path.join(tmpdir(), "agentplane-distribution-handoff-"));
      const dist = path.join(root, ".agentplane/.release/publish/distribution");
      try {
        await mkdir(dist, { recursive: true });
        const digest = (value: string) => createHash("sha256").update(value).digest("hex");
        const assets = [];
        for (let index = 0; index < 8; index += 1) {
          const name = index === 0 ? "agentplane-upgrade.tar.gz" : `asset-${index}`;
          await writeFile(path.join(dist, name), "payload");
          assets.push({ name, sha256: digest("payload") });
        }
        const identity = { sha: "abc123", version: "1.2.3", tag: "v1.2.3" };
        const bun = JSON.stringify({ ...identity, assets: assets.slice(3) });
        const sums = assets.map((asset) => `${asset.sha256}  ${asset.name}\n`).join("");
        await writeFile(path.join(dist, "bun-assets.json"), bun);
        await writeFile(path.join(dist, "SHA256SUMS"), sums);
        await writeFile(
          path.join(dist, "agentplane-upgrade.tar.gz.sha256"),
          `${assets[0]!.sha256}  agentplane-upgrade.tar.gz\n`,
        );
        await mkdir(path.join(dist, ".npm-pack"));
        await writeFile(path.join(dist, ".npm-pack/agentplane-1.2.3.tgz"), "payload");
        const manifest = {
          ...identity,
          packages: { agentplane: { npmTarballSha256: digest("payload") } },
          releaseAssets: [
            ...assets,
            { name: "bun-assets.json", sha256: digest(bun) },
            { name: "SHA256SUMS", sha256: digest(sums) },
          ],
        };
        if (scenario === "sha" || scenario === "version" || scenario === "tag")
          manifest[scenario] = "wrong";
        if (scenario === "tarball")
          await writeFile(path.join(dist, ".npm-pack/agentplane-1.2.3.tgz"), "corrupt");
        if (scenario === "bytes") await writeFile(path.join(dist, "asset-1"), "corrupt");
        if (scenario === "checksums")
          await writeFile(
            path.join(dist, "agentplane-upgrade.tar.gz.sha256"),
            `${"0".repeat(64)}  agentplane-upgrade.tar.gz\n`,
          );
        await writeFile(path.join(dist, "release-distribution.json"), JSON.stringify(manifest));
        const run = () =>
          execFileSync(
            "bash",
            [
              "-c",
              `if ! command -v sha256sum >/dev/null; then sha256sum() { shasum -a 256 "$@"; }; fi\n${script}`,
            ],
            {
              cwd: root,
              env: {
                ...process.env,
                EXPECTED_SHA: identity.sha,
                EXPECTED_VERSION: identity.version,
                EXPECTED_TAG: identity.tag,
              },
              stdio: "pipe",
            },
          );
        if (scenario === "valid") expect(run).not.toThrow();
        else expect(run).toThrow();
      } finally {
        await rm(root, { recursive: true, force: true });
      }
    },
  );

  // The publish job executes this Bash step on Linux.
  it.skipIf(process.platform === "win32").each([
    ["workflow_dispatch", true, true, [true, true, true], true],
    ["workflow_dispatch", true, true, [false, false, false], true],
    ["workflow_dispatch", true, true, [true, false, true], true],
    ["workflow_run", true, true, [true, true, true], false],
    ["workflow_run", true, true, [true, false, true], true],
    ["workflow_dispatch", false, true, [true, true, true], false],
    ["workflow_dispatch", false, true, [false, false, false], false],
    ["workflow_dispatch", true, false, [true, true, true], false],
  ] as const)(
    "detects %s recovery (ready=%s, stable=%s, packages=%j) as %s",
    async (event, ready, stable, published, expected) => {
      const workflow = parseYaml(await readFile(PUBLISH_WORKFLOW_PATH, "utf8")) as {
        jobs: { detect: { steps: { id?: string; run?: string }[] } };
      };
      const script = workflow.jobs.detect.steps.find((step) => step.id === "detect")?.run;
      if (!script) throw new Error("Publish target detection step is missing");
      const rendered = script
        .replaceAll("${{ steps.channel.outputs.stable }}", String(stable))
        .replaceAll("${{ steps.source.outputs.release_ready_ok }}", String(ready))
        .replaceAll("${{ steps.source.outputs.sha }}", "a".repeat(40))
        .replaceAll("${{ github.event_name }}", event);
      const stubs = String.raw`
        node() { printf '%s\n' "$RELEASE_TEST_VERSION"; }
        git() { printf '%s\n' aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa; }
        npm() {
          case "$2" in
            @agentplaneorg/core@*) test "$RELEASE_TEST_CORE" = true ;;
            @agentplaneorg/recipes@*) test "$RELEASE_TEST_RECIPES" = true ;;
            agentplane@*) test "$RELEASE_TEST_CLI" = true ;;
            *) return 99 ;;
          esac
        }
      `;
      const root = await mkdtemp(path.join(tmpdir(), "agentplane-publish-detect-"));
      const outputPath = path.join(root, "github-output");
      try {
        execFileSync("bash", ["-c", `${stubs}\n${rendered}`], {
          cwd: process.cwd(),
          encoding: "utf8",
          env: {
            ...process.env,
            GITHUB_OUTPUT: outputPath,
            RELEASE_TEST_VERSION: stable ? "0.7.8" : "0.7.8-beta.1",
            RELEASE_TEST_CORE: String(published[0]),
            RELEASE_TEST_RECIPES: String(published[1]),
            RELEASE_TEST_CLI: String(published[2]),
          },
        });
        const output = await readFile(outputPath, "utf8");
        const outputs: Record<string, string | undefined> = {};
        for (const line of output.split("\n")) {
          const [key, value] = line.split("=", 2);
          if (key) outputs[key] = value;
        }
        expect(outputs.should_publish).toBe(String(expected));
        if (stable) {
          expect(outputs.core_published).toBe(String(published[0]));
          expect(outputs.recipes_published).toBe(String(published[1]));
          expect(outputs.cli_published).toBe(String(published[2]));
        }
      } finally {
        await rm(root, { recursive: true, force: true });
      }
    },
  );

  it("names the primary workflow as a full release publisher", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("name: Publish release");
  });

  it("runs the stable-version guard before publishing packages with npm tag latest", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain(
      'node scripts/check-release-version.mjs --tag "${{ needs.detect.outputs.tag }}" --stable-only',
    );
    expect(workflow).toContain("npm publish --provenance --access public --tag latest");
    expect(workflow.indexOf("node scripts/check-release-version.mjs")).toBeLessThan(
      workflow.indexOf("npm publish --provenance --access public --tag latest"),
    );
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
    expect(workflow).toContain("sha: ${{ steps.detect.outputs.sha }}");
    expect(workflow).not.toContain("sha: ${{ steps.source.outputs.sha }}");
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
    expect(workflow).toContain(
      "node .agentplane/.release/runtime/scripts/generate-release-distribution.mjs",
    );
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
    expect(workflow).toContain(
      "node .agentplane/.release/runtime/scripts/render-setup-agentplane-action.mjs",
    );
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
    expect(workflow).toContain("checks: write");
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
    expect(workflow).toContain("node scripts/release/open-next-development-version.mjs");
    expect(workflow).toContain('--published-version "${PUBLISHED_VERSION}"');
    expect(workflow).toContain("next-development-version.json");
    expect(workflow).toContain(".agentplane/config.json");
    expect(workflow).toContain("scripts/baselines/v0.7-compatibility-candidate.json");
    expect(workflow).toContain("release evidence follow-up branch is dirty before mutation");
    expect(workflow).toContain("next development version mutation left unstaged tracked files");
    expect(workflow).toContain("record publish evidence and open");
    expect(workflow).toContain("Validate release evidence branch contract");
    expect(workflow).toContain("bun run format:check");
    expect(workflow).toContain("bun run bench:compatibility:candidate:check");
    expect(workflow).toContain("release evidence branch contract checks mutated tracked files");
    expect(workflow).toContain("Open or recover release evidence PR");
    expect(workflow).toContain("Verify and merge exact release evidence SHA");
    expect(workflow).toContain("node scripts/workflow/verify-release-evidence-pr.mjs");
    expect(workflow.indexOf("Create GitHub Release")).toBeLessThan(
      workflow.indexOf("Publish Homebrew tap PR"),
    );
    expect(workflow.indexOf("Publish setup-agentplane PR")).toBeLessThan(
      workflow.indexOf("Upload release-distribution artifact"),
    );
    for (const stepName of [
      "Check for existing release evidence PR",
      "Apply release task evidence on a follow-up branch",
      "Validate release evidence branch contract",
      "Push release evidence branch",
      "Open or recover release evidence PR",
      "Verify and merge exact release evidence SHA",
    ]) {
      const stepIndex = workflow.indexOf(`- name: ${stepName}`);
      expect(stepIndex).toBeGreaterThanOrEqual(0);
      const nextStepIndex = workflow.indexOf("\n      - name:", stepIndex + 1);
      const stepBlock = workflow.slice(
        stepIndex,
        nextStepIndex === -1 ? workflow.length : nextStepIndex,
      );
      expect(stepBlock).not.toContain("continue-on-error: true");
      if (
        [
          "Check for existing release evidence PR",
          "Open or recover release evidence PR",
          "Verify and merge exact release evidence SHA",
        ].includes(stepName)
      ) {
        expect(stepBlock).toContain("GH_TOKEN: ${{ github.token }}");
      }
    }
    expect(workflow.indexOf("Validate release evidence branch contract")).toBeLessThan(
      workflow.indexOf("Push release evidence branch"),
    );
    expect(workflow.indexOf("Validate release evidence branch contract")).toBeLessThan(
      workflow.indexOf("Open or recover release evidence PR"),
    );
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
    expect(workflow).toContain(
      "if: steps.channel.outputs.stable == 'true' && steps.source.outputs.release_ready_ok == 'true'",
    );
    expect(workflow).toContain("node scripts/release/check-task-registry-ready.mjs");
    expect(workflow).toContain("--allow-active-release-task");
    expect(workflow.indexOf("Resolve release-ready source")).toBeLessThan(
      workflow.indexOf("Release task registry (check)"),
    );
  });

  it("skips stable-only gates for a prerelease before registry, notes, or npm lookups", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    const channelIndex = workflow.indexOf("- name: Classify release channel");
    const sourceIndex = workflow.indexOf("- name: Resolve release-ready source");
    const registryIndex = workflow.indexOf("- name: Release task registry (check)");
    const detectIndex = workflow.indexOf("- name: Detect publish target");
    const prereleaseExitIndex = workflow.indexOf(
      'if [ "${{ steps.channel.outputs.stable }}" != "true" ]; then',
      detectIndex,
    );
    const notesIndex = workflow.indexOf('NOTES="docs/releases/${TAG}.md"', detectIndex);
    const npmLookupIndex = workflow.indexOf(
      'npm view "@agentplaneorg/core@${VERSION}"',
      detectIndex,
    );

    expect(channelIndex).toBeGreaterThanOrEqual(0);
    expect(channelIndex).toBeLessThan(sourceIndex);
    expect(channelIndex).toBeLessThan(registryIndex);
    expect(workflow).toContain("if: steps.channel.outputs.stable == 'true'");
    expect(workflow).toContain(
      "if: steps.channel.outputs.stable == 'true' && steps.source.outputs.release_ready_ok == 'true'",
    );
    expect(prereleaseExitIndex).toBeGreaterThan(detectIndex);
    expect(prereleaseExitIndex).toBeLessThan(notesIndex);
    expect(prereleaseExitIndex).toBeLessThan(npmLookupIndex);
    expect(workflow).toContain('echo "should_publish=false"');
    expect(workflow).toContain('echo "stable release detection skipped for prerelease $VERSION"');
  });

  it("validates the exact evidence SHA through native pull_request checks before merge", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("source.err");
    expect(workflow).toContain("cat .agentplane/.release/ready/source.err");
    expect(workflow).toContain("Verify and merge exact release evidence SHA");
    expect(workflow).toContain("node scripts/workflow/verify-release-evidence-pr.mjs");
    expect(workflow).toContain("--workflow ci.yml");
    expect(workflow).toContain('--sha "$closure_sha"');
    expect(workflow).toContain('--pr-url "$pr_url"');
    expect(workflow).toContain('--repo "$REPO"');
    expect(workflow).toContain("release-evidence-closeout.json");
    expect(workflow).not.toContain("name=PR verification");
    expect(workflow).not.toContain("admin");
    expect(workflow.indexOf("Open or recover release evidence PR")).toBeLessThan(
      workflow.indexOf("Verify and merge exact release evidence SHA"),
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
