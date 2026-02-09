---
id: "202602091733-TF2HXV"
title: "Release v0.2.4"
result_summary: "Published v0.2.4 (npm + GitHub release with upgrade assets)."
status: "DONE"
priority: "high"
owner: "INTEGRATOR"
depends_on: []
tags:
  - "release"
  - "npm"
  - "github"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T17:50:39.769Z"
  updated_by: "TESTER"
  note: "Verified: bun run test:full and bun run release:check pass; v0.2.4 tag pushed; GitHub release includes agentplane-upgrade.tar.gz + .sha256; npm shows agentplane@0.2.4 and @agentplaneorg/core@0.2.4."
commit:
  hash: "6c37d99d015364d33675400d647287b95b2b3eb6"
  message: "✅ TF2HXV ci: publish upgrade bundle assets"
comments:
  -
    author: "INTEGRATOR"
    body: "Start: Cut v0.2.4 release (version bump, tag, npm publish, GitHub release assets)."
  -
    author: "INTEGRATOR"
    body: "Verified: bun run test:full and bun run release:check pass; v0.2.4 tag pushed; GitHub release contains agentplane-upgrade.tar.gz + .sha256; npm shows agentplane@0.2.4 and @agentplaneorg/core@0.2.4."
events:
  -
    type: "status"
    at: "2026-02-09T17:34:03.817Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Cut v0.2.4 release (version bump, tag, npm publish, GitHub release assets)."
  -
    type: "verify"
    at: "2026-02-09T17:50:39.769Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run test:full and bun run release:check pass; v0.2.4 tag pushed; GitHub release includes agentplane-upgrade.tar.gz + .sha256; npm shows agentplane@0.2.4 and @agentplaneorg/core@0.2.4."
  -
    type: "status"
    at: "2026-02-09T17:50:51.361Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run test:full and bun run release:check pass; v0.2.4 tag pushed; GitHub release contains agentplane-upgrade.tar.gz + .sha256; npm shows agentplane@0.2.4 and @agentplaneorg/core@0.2.4."
doc_version: 2
doc_updated_at: "2026-02-09T17:50:51.361Z"
doc_updated_by: "INTEGRATOR"
description: "Publish npm packages (@agentplaneorg/core and agentplane) and create GitHub release v0.2.4 with upgrade bundle assets."
id_source: "generated"
---
## Summary

Cut v0.2.4: bump versions, publish @agentplaneorg/core and agentplane to npm, and create a GitHub release with upgrade bundle assets.

## Scope

In scope: version bumps in packages/core and packages/agentplane, changelog/release notes (minimal), npm publish, git tag v0.2.4, GitHub release with upgrade assets. Out of scope: feature work.

## Plan

1) Ensure main is clean and tests pass.
2) Bump versions to 0.2.4: packages/core, packages/agentplane; update agentplane dependency on @agentplaneorg/core.
3) Build and run release:check.
4) Commit version bump.
5) Tag v0.2.4 and push commits+tag.
6) npm publish @agentplaneorg/core then agentplane.
7) Build upgrade bundle asset from packages/agentplane/assets and upload to GitHub release as agentplane-upgrade.tar.gz + sha256.
8) Smoke: npm view versions and gh release assets list.

## Risks

Risk: missing npm/gh credentials or 2FA. Risk: publishing wrong artifact contents. Mitigation: run release:check, use clean working tree, and verify GitHub assets names match upgrade defaults.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T17:50:39.769Z — VERIFY — ok

By: TESTER

Note: Verified: bun run test:full and bun run release:check pass; v0.2.4 tag pushed; GitHub release includes agentplane-upgrade.tar.gz + .sha256; npm shows agentplane@0.2.4 and @agentplaneorg/core@0.2.4.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T17:34:03.817Z, excerpt_hash=sha256:0b24d0bf5aaf5c896e864ef6b755fe80b1af895a6808ede2466ae0a44df2a7f3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

If publish fails before any remote push: revert commit locally. If tag pushed but publish fails: delete tag remotely and locally, bump version again. If npm publish partially succeeded: publish the remaining package with matching version or cut v0.2.5.

## Context

Users rely on GitHub release assets (agentplane-upgrade.tar.gz + sha256) for remote upgrades; npm publishes deliver the CLI and local assets.

## Verify Steps

- bun run lint
- bun run test:full
- bun run release:check
