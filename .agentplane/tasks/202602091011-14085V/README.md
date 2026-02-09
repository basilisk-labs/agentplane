---
id: "202602091011-14085V"
title: "Release v0.2.2"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
depends_on: []
tags:
  - "release"
  - "cli"
  - "npm"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T10:12:59.089Z"
  updated_by: "INTEGRATOR"
  note: "node scripts/check-release-notes.mjs --tag v0.2.2; node scripts/check-release-version.mjs --tag v0.2.2; bun run test:full"
commit: null
comments:
  -
    author: "INTEGRATOR"
    body: "Start: Prepare and publish v0.2.2 (versions, release notes, tag) after validating release check scripts and tests are green."
events:
  -
    type: "status"
    at: "2026-02-09T10:11:30.980Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Prepare and publish v0.2.2 (versions, release notes, tag) after validating release check scripts and tests are green."
  -
    type: "verify"
    at: "2026-02-09T10:12:59.089Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "node scripts/check-release-notes.mjs --tag v0.2.2; node scripts/check-release-version.mjs --tag v0.2.2; bun run test:full"
doc_version: 2
doc_updated_at: "2026-02-09T10:12:59.091Z"
doc_updated_by: "INTEGRATOR"
description: "Cut patch release v0.2.2 containing upgrade tarball_url fallback when release assets are missing."
id_source: "generated"
---
## Summary

Publish v0.2.2 to npm (and tag the repo) with the upgrade tarball_url fallback fix.

## Scope

In scope:\n- docs/releases/v0.2.2.md\n- packages/core/package.json\n- packages/agentplane/package.json\n\nOut of scope:\n- Any breaking CLI changes.

## Plan


## Risks

- Version skew between packages: mitigated by check-release-version script.\n- Missing/invalid release notes: mitigated by check-release-notes script.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T10:12:59.089Z — VERIFY — ok

By: INTEGRATOR

Note: node scripts/check-release-notes.mjs --tag v0.2.2; node scripts/check-release-version.mjs --tag v0.2.2; bun run test:full

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T10:11:47.569Z, excerpt_hash=sha256:6b80d53977c18ccfbc28cc87d758afcd7f252030f1b84babc1aa545ddefddfd1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Delete the local tag v0.2.2 (and remote tag if pushed), revert the release commit(s), and re-cut the patch release.

## Verify Steps

Commands:\n- node scripts/check-release-notes.mjs --tag v0.2.2\n- node scripts/check-release-version.mjs --tag v0.2.2\n- bun run test:full\n\nPass criteria:\n- All commands succeed.
