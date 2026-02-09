---
id: "202602090956-HEVSEM"
title: "upgrade: fallback to tarball_url when release assets missing"
result_summary: "Upgrade no longer fails when release assets are missing"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "upgrade"
  - "bug"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T10:06:21.860Z"
  updated_by: "CODER"
  note: "bun run lint; bun run test:full; bun run coverage"
commit:
  hash: "d9e9b8614979fef309e8680e70d00dcb9d3329fd"
  message: "✅ HEVSEM upgrade: tarball_url fallback for missing release assets"
comments:
  -
    author: "CODER"
    body: "Start: Implement upgrade fallback to GitHub release tarball_url when upgrade assets are missing; add tests; ship patch release."
  -
    author: "CODER"
    body: "Verified: bun run lint, bun run test:full, bun run coverage; upgrade now falls back to GitHub release tarball_url when upgrade assets are missing and applies only AGENTS.md/.agentplane/*."
events:
  -
    type: "status"
    at: "2026-02-09T09:57:07.766Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement upgrade fallback to GitHub release tarball_url when upgrade assets are missing; add tests; ship patch release."
  -
    type: "verify"
    at: "2026-02-09T10:06:21.860Z"
    author: "CODER"
    state: "ok"
    note: "bun run lint; bun run test:full; bun run coverage"
  -
    type: "status"
    at: "2026-02-09T10:08:32.782Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint, bun run test:full, bun run coverage; upgrade now falls back to GitHub release tarball_url when upgrade assets are missing and applies only AGENTS.md/.agentplane/*."
doc_version: 2
doc_updated_at: "2026-02-09T10:08:32.782Z"
doc_updated_by: "CODER"
description: "Fix agentplane upgrade failing on npm-installed CLI when GitHub releases do not include agentplane-upgrade.tar.gz assets. Add fallback to release tarball_url with a warning (no checksum), keep existing asset+checksum path when available, and add tests."
id_source: "generated"
---
## Summary


## Scope

In scope:\n- packages/agentplane/src/commands/upgrade.ts\n- packages/agentplane/src/commands/upgrade.release-assets.unit.test.ts\n\nOut of scope:\n- Publishing new GitHub release assets (we support tarball fallback instead).\n- Changing default network approval policy.

## Plan

1. Implement tarball_url fallback when expected release assets are missing.\n2. When using tarball_url fallback, ignore non-upgrade paths and only apply AGENTS.md + .agentplane/* allowlist.\n3. Add unit tests for release download resolution (assets vs tarball).\n4. Run lint + full test suite + coverage.\n5. Ship patch release (bump versions + release notes + tag).

## Risks

- Tarball_url mode skips checksum verification: mitigated by applying a strict allowlist (AGENTS.md, .agentplane/*) and refusing .git paths.\n- Behavior change could mask malformed bundles: mitigated by failing if no applicable files are found.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T10:06:21.860Z — VERIFY — ok

By: CODER

Note: bun run lint; bun run test:full; bun run coverage

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T10:02:36.023Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the commit for 202602090956-HEVSEM.\n- Cut a new patch release.\n- Users can still upgrade by providing --bundle/--checksum pointing at a known-good upgrade bundle.
