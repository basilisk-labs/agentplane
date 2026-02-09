---
id: "202602091430-XNNPBJ"
title: "Release v0.3.0"
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
  updated_at: "2026-02-09T14:32:43.120Z"
  updated_by: "INTEGRATOR"
  note: "node scripts/check-release-notes.mjs --tag v0.3.0; node scripts/check-release-version.mjs --tag v0.3.0; bun run test:full"
commit: null
comments:
  -
    author: "INTEGRATOR"
    body: "Start: Prepare and publish v0.3.0 (versions, release notes, tag) for the safe upgrade redesign."
events:
  -
    type: "status"
    at: "2026-02-09T14:30:41.229Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Prepare and publish v0.3.0 (versions, release notes, tag) for the safe upgrade redesign."
  -
    type: "verify"
    at: "2026-02-09T14:32:43.120Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "node scripts/check-release-notes.mjs --tag v0.3.0; node scripts/check-release-version.mjs --tag v0.3.0; bun run test:full"
doc_version: 2
doc_updated_at: "2026-02-09T14:32:43.124Z"
doc_updated_by: "INTEGRATOR"
description: "Cut release v0.3.0: safe manifest-based upgrade with local-source default, .agentplane/.upgrade state/lock/baseline, and safety tests."
id_source: "generated"
---
## Summary

Publish v0.3.0 to npm (and tag the repo) with the safe upgrade redesign.

## Scope


## Plan

1. Add release notes for v0.3.0.\n2. Bump package versions to 0.3.0.\n3. Run release note/version check scripts.\n4. Run bun run test:full.\n5. Commit and tag v0.3.0; push main + tag.

## Risks

- Breaking behavior change: agentplane upgrade now defaults to local framework assets and requires --remote for GitHub.\n- Release version skew: mitigated by check-release-version script.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T14:32:43.120Z — VERIFY — ok

By: INTEGRATOR

Note: node scripts/check-release-notes.mjs --tag v0.3.0; node scripts/check-release-version.mjs --tag v0.3.0; bun run test:full

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T14:30:58.951Z, excerpt_hash=sha256:missing

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Delete the local tag v0.3.0 (and remote tag if pushed), revert the release commit(s), and re-cut the release.
