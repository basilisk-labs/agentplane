---
name: agentplane-release-and-packaging-operator
description: Use when preparing, validating, publishing, auditing, or recovering an Agentplane release, especially package build ordering, version parity, npm/GitHub/GHCR/external distribution publication, public install smoke tests, hosted publish evidence, or release CI failures.
---

# Agentplane Release And Packaging Operator

## Use This Skill When

- A task mentions release, publish, npm, provenance, package version parity, release-ready, or install smoke.
- CI fails in package build or release gates.
- A public install fails because a workspace package is missing, private, stale, or unpublished.
- A release partially completed and you must decide whether to roll forward or stop.

## Core Rule

Treat release work as a state machine, not a linear script. Before mutating, identify the current state of git tags, package versions, generated manifests, hosted workflows, and npm visibility.

## Required Preflight

1. Run the normal Agentplane preflight and load release policy when release/version/publish files are in scope.
2. Inspect the release task README and `agentplane task verify-show <task-id>`.
3. Check working tree cleanliness with `git status --short --untracked-files=no`.
4. Inspect recent release incidents:
   - `agentplane incidents advise --tag release --tag recipes --tag workflow --scope "<release scope>"`
5. Confirm which packages are release participants:
   - `@agentplaneorg/core`
   - `@agentplaneorg/recipes`
   - `agentplane`

## Version And Public Package Checks

Use these before publishing and during recovery:

```bash
bun run release:parity
bun run release:state
node scripts/check-npm-version-availability.mjs <version>
npm view @agentplaneorg/core@<version> version
npm view @agentplaneorg/recipes@<version> version
npm view agentplane@<version> version
```

Expected invariant: core, recipes, CLI package versions, and CLI dependencies on core/recipes all agree with the release version.

## Script Entry Points

Use the repo-local wrappers before composing ad hoc release command sequences:

```bash
bun run release:state
bun run release:next-action -- --check-registry
bun run release:version:bump -- --bump patch
bun run release:version:bump -- --version <version> --write
bun run release:candidate:prepare
bun run release:evidence:collect -- --version <version>
```

- `release:state` is the read-only release dashboard.
- `release:next-action` chooses the next safe action from local state and optional registry checks.
- `release:version:bump` is dry-run by default; use `--write` only inside an approved release task.
- `release:candidate:prepare` is dry-run by default; use `--write`, and `--push --yes` only after release approval.
- `release:evidence:collect` gathers post-publish npm, git tag, GitHub Release, and audit evidence into `.agentplane/.release/evidence/`.

## Build Ordering

Build workspace packages in dependency order. Build `agentplane` before `@agentplane/testkit`, because testkit imports agentplane's generated declaration surfaces.

Preferred order:

```bash
bun run --filter=@agentplaneorg/core build
bun run --filter=agentplane build
bun run --filter=@agentplane/testkit build
bun run --filter=@agentplaneorg/recipes build
```

If CI fails with `TS6305` for `packages/agentplane/dist/*.d.ts` while building `@agentplane/testkit`, the likely cause is that `agentplane` was not built before `@agentplane/testkit`.

## Publish Flow

1. Run release planning and generated release notes checks.
2. Run fast release gates first; run heavy gates before publishing.
3. Apply the release only after parity and generated freshness checks pass.
4. Publish each public package with provenance and `access=public`.
5. Record hosted workflow URLs and package visibility evidence in the release task.
6. Run a clean install smoke outside the repository:

```bash
tmpdir="$(mktemp -d)"
npm_config_prefix="$tmpdir/prefix" npm install -g agentplane@<version>
"$tmpdir/prefix/bin/agentplane" runtime explain
```

## Recovery Matrix

- Tag absent, npm absent: fix locally, rerun prepublish, then apply/publish.
- Tag present, npm absent: verify tag commit is correct, fix publish blocker without moving tag unless explicitly approved.
- Some packages published, one missing: publish the missing package from the same release commit if its version is not consumed with different contents.
- npm package private or invisible: fix package access/publish workflow, verify with `npm view`, then run install smoke.
- Hosted publish failed after merge: inspect workflow logs with `gh run view`, classify package and distribution outcomes, and record recovery evidence before closing.

## Platform Publication Matrix

Treat release publication as complete only when the canonical `publish-result.json` proves every required channel.

Required channels:

- npm packages: `@agentplaneorg/core`, `@agentplaneorg/recipes`, and `agentplane`.
- GitHub Release: tag, release body, installer assets, `SHA256SUMS`, and `release-distribution.json`.
- GHCR: version, release, and `latest` image tags from the exact release payload.
- Homebrew tap: target repository default branch contains the rendered formula for the exact version.
- Scoop bucket: target repository default branch contains the rendered manifest for the exact version.
- `setup-agentplane`: target repository default branch contains the rendered action bundle and the matching `vX.Y.Z` tag exists.

Handoff states that are not completion:

- `pr_opened`
- `skipped_missing_credentials`
- missing module result JSON
- rendered artifacts uploaded only as workflow artifacts
- `setup-agentplane` unchanged without matching tag proof

## Post-Publish Audit

Before closing a release task, download or locate the `publish-result` artifact from the `Publish release` workflow and run:

```bash
bun run release:postpublish:audit -- --publish-result <path-to-publish-result.json>
```

Expected result: the command exits 0 and reports no failures.

If it fails:

- Do not close the release task as published.
- Use `bun run release:recover -- --check-github` to classify the release SHA state.
- Use `Publish distribution module` for focused recovery:

```bash
gh workflow run publish-distribution-module.yml \
  -f tag=vX.Y.Z \
  -f sha=<release-sha> \
  -f module=homebrew
```

Use `module=scoop`, `module=setup-agentplane`, `module=ghcr`, `module=github-release`, `module=external`, or `module=all` as needed.

## Verification Contract

Minimum evidence for a release task:

- `bun run release:parity`
- package build order check
- npm visibility checks for all release packages
- hosted workflow URL or explicit local-only reason
- `publish-result.json` from `Publish release`
- `bun run release:postpublish:audit -- --publish-result <path-to-publish-result.json>`
- GitHub Release asset evidence for `release-distribution.json` and `SHA256SUMS`
- GHCR publication evidence
- Homebrew, Scoop, and `setup-agentplane` evidence, or explicit recovery task IDs when incomplete
- clean install smoke for externally visible releases

Do not close a release task with only local tests if publication or installation was part of scope.
