---
name: agentplane-release-and-packaging-operator
description: Use when preparing, validating, publishing, or recovering an Agentplane release, especially package build ordering, version parity, npm publication, public install smoke tests, hosted publish evidence, or release CI failures.
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
node scripts/check-npm-version-availability.mjs <version>
npm view @agentplaneorg/core@<version> version
npm view @agentplaneorg/recipes@<version> version
npm view agentplane@<version> version
```

Expected invariant: core, recipes, CLI package versions, and CLI dependencies on core/recipes all agree with the release version.

## Build Ordering

Build workspace packages in dependency order. Do not build `agentplane` before generated/dist surfaces it imports exist.

Preferred order:

```bash
bun run --filter=@agentplaneorg/core build
bun run --filter=@agentplane/testkit build
bun run --filter=@agentplaneorg/recipes build
bun run --filter=agentplane build
```

If CI fails with missing `../../../testkit/dist/*.js` or missing exports from `src/testing/index.ts`, the likely cause is that `@agentplane/testkit` was not built before `agentplane`.

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
- Hosted publish failed after merge: inspect workflow logs with `gh run view`, classify package outcomes, and record recovery evidence before closing.

## Verification Contract

Minimum evidence for a release task:

- `bun run release:parity`
- package build order check
- npm visibility checks for all release packages
- hosted workflow URL or explicit local-only reason
- clean install smoke for externally visible releases

Do not close a release task with only local tests if publication or installation was part of scope.
