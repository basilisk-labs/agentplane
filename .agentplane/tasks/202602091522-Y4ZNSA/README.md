---
id: "202602091522-Y4ZNSA"
title: "upgrade: ignore baseline/state artifacts in git"
result_summary: "Upgrade baseline/state ignored by git"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "upgrade"
  - "docs"
  - "quality"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T16:28:02.109Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass. .gitignore now excludes upgrade state dirs (.agentplane/.upgrade and legacy .agentplane/upgrade) to avoid baseline/state noise in commits."
commit:
  hash: "ff1bfe123537f185a8a5fe016101399d5710f14a"
  message: "✅ Y4ZNSA upgrade: ignore .agentplane upgrade state"
comments:
  -
    author: "DOCS"
    body: "Start: prevent upgrade baseline/state artifacts from leaking into commits by ignoring .agentplane/.upgrade/** (and legacy .agentplane/upgrade/** if present)."
  -
    author: "DOCS"
    body: "Verified: bun run lint and bun run test:full pass. Added .gitignore entries for .agentplane/.upgrade and legacy .agentplane/upgrade to prevent upgrade baselines/state from leaking into commits."
events:
  -
    type: "status"
    at: "2026-02-09T16:26:49.034Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: prevent upgrade baseline/state artifacts from leaking into commits by ignoring .agentplane/.upgrade/** (and legacy .agentplane/upgrade/** if present)."
  -
    type: "verify"
    at: "2026-02-09T16:28:02.109Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass. .gitignore now excludes upgrade state dirs (.agentplane/.upgrade and legacy .agentplane/upgrade) to avoid baseline/state noise in commits."
  -
    type: "status"
    at: "2026-02-09T16:28:02.330Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. Added .gitignore entries for .agentplane/.upgrade and legacy .agentplane/upgrade to prevent upgrade baselines/state from leaking into commits."
doc_version: 2
doc_updated_at: "2026-02-09T16:28:02.330Z"
doc_updated_by: "DOCS"
description: "Ensure upgrade state (baseline, lock, reports) is not accidentally tracked or committed by adding .agentplane/.upgrade/** to .gitignore and aligning any docs/tests."
id_source: "generated"
---
## Summary

Prevent upgrade baseline/state artifacts from showing up in PRs by ignoring .agentplane/.upgrade/** in git.

## Scope

.gitignore and any related docs/tests that mention upgrade state locations.

## Plan

1) Inspect current .gitignore.\n2) Add ignore entries for upgrade state/baseline dirs (.agentplane/.upgrade/** and legacy .agentplane/upgrade/**).\n3) Ensure ignores do not hide user-owned tracked files (only upgrade state).\n4) Run bun run lint and bun run test:full (sanity).

## Risks

Low risk; only affects git ignore behavior.

## Verify Steps

- bun run lint\n- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T16:28:02.109Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass. .gitignore now excludes upgrade state dirs (.agentplane/.upgrade and legacy .agentplane/upgrade) to avoid baseline/state noise in commits.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T16:26:49.349Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert .gitignore changes.
