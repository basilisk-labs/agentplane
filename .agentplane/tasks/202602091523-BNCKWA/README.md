---
id: "202602091523-BNCKWA"
title: "upgrade: remove or harden tarball fallback"
result_summary: "Gated tarball fallback + reliable codeload URL"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602091523-1TY4G2"
tags:
  - "upgrade"
  - "safety"
  - "network"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T16:06:12.470Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass. Remote upgrade tarball fallback is now explicitly gated (--allow-tarball) and uses codeload URL when tag is available."
commit:
  hash: "f895a91905d5a4be8c6b3fa523fcc2a2e2d98756"
  message: "✅ BNCKWA upgrade: gate tarball fallback and prefer codeload"
comments:
  -
    author: "CODER"
    body: "Start: harden upgrade source resolution so default uses local npm-installed framework assets; if remote is used, require upgrade bundle manifest and avoid brittle GitHub API tarball_url fallback; add tests for redirects/timeouts and missing assets."
  -
    author: "CODER"
    body: "Verified: bun run lint and bun run test:full pass. GitHub remote upgrade now refuses missing upgrade assets unless --allow-tarball is set; tarball fallback prefers codeload URL using tag_name/--tag to avoid brittle api.github.com tarball_url behavior."
events:
  -
    type: "status"
    at: "2026-02-09T15:59:32.291Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: harden upgrade source resolution so default uses local npm-installed framework assets; if remote is used, require upgrade bundle manifest and avoid brittle GitHub API tarball_url fallback; add tests for redirects/timeouts and missing assets."
  -
    type: "verify"
    at: "2026-02-09T16:06:12.470Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass. Remote upgrade tarball fallback is now explicitly gated (--allow-tarball) and uses codeload URL when tag is available."
  -
    type: "status"
    at: "2026-02-09T16:06:12.630Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. GitHub remote upgrade now refuses missing upgrade assets unless --allow-tarball is set; tarball fallback prefers codeload URL using tag_name/--tag to avoid brittle api.github.com tarball_url behavior."
doc_version: 2
doc_updated_at: "2026-02-09T16:06:12.630Z"
doc_updated_by: "CODER"
description: "Make remote upgrade require proper release assets + checksum. If a tarball fallback is kept, require an embedded upgrade manifest proving it is an upgrade bundle."
id_source: "generated"
---
## Summary

Stop unsafe tarball_url fallback in upgrade. Remote upgrade should use explicit release assets with checksum; tarball fallback (if any) must validate an embedded manifest.

## Scope

packages/agentplane/src/commands/upgrade.ts and unit tests around release downloads.

## Plan

1) Inspect current upgrade source selection and GitHub release download logic.\n2) Make local (npm-installed) framework assets the default source; require explicit flags to use GitHub.\n3) If GitHub is used and release assets are missing, either (a) fail with actionable message, or (b) fallback to codeload tar.gz URL (not api.github.com tarball_url) but only if the archive contains framework.manifest.json under assets root.\n4) Add unit tests covering: missing assets behavior; fallback URL builder; redirect handling; manifest-required guard.\n5) Run bun run lint and bun run test:full.

## Risks

Users relying on tarball fallback will need to update their release process to publish upgrade assets.

## Verify Steps

- bun run lint\n- bun run test:full\n- (manual) node packages/agentplane/bin/agentplane.js upgrade --dry-run in a temp repo should not touch tasks/backends/config and should not require network by default

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T16:06:12.470Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass. Remote upgrade tarball fallback is now explicitly gated (--allow-tarball) and uses codeload URL when tag is available.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T15:59:32.666Z, excerpt_hash=sha256:ea54beb92c3678e26a949bf9433b4732b1df81ac0b7dda7c0affa5ab0e71deb6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit to restore fallback.
