---
id: "202603091054-V2X1QB"
title: "Repair Docusaurus theme type errors blocking v0.3.5 release"
result_summary: "Docs CI blocker is fixed locally; the release line can now be republished from a clean commit."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T10:55:01.600Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T10:57:48.432Z"
  updated_by: "CODER"
  note: "Patched the custom docs sidebar theme to remove the unnecessary wrapper component, added @docusaurus/theme-common as a direct website dependency, and passed bun run docs:site:typecheck plus bun run docs:site:check."
commit:
  hash: "c2d2d9661c1b5af26a6fd6e890f79684851f2c80"
  message: "🐛 V2X1QB website: fix Docusaurus theme typecheck"
comments:
  -
    author: "CODER"
    body: "Start: repairing the custom Docusaurus theme type imports that broke Docs CI on the v0.3.5 release commit, then resuming the blocked release publication once the docs gate is green again."
  -
    author: "CODER"
    body: "Verified: restored the Docusaurus docs-shell typecheck on the blocked v0.3.5 release line and confirmed the full docs site check passes after syncing the website dependency graph."
events:
  -
    type: "status"
    at: "2026-03-09T10:55:01.825Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repairing the custom Docusaurus theme type imports that broke Docs CI on the v0.3.5 release commit, then resuming the blocked release publication once the docs gate is green again."
  -
    type: "verify"
    at: "2026-03-09T10:57:48.432Z"
    author: "CODER"
    state: "ok"
    note: "Patched the custom docs sidebar theme to remove the unnecessary wrapper component, added @docusaurus/theme-common as a direct website dependency, and passed bun run docs:site:typecheck plus bun run docs:site:check."
  -
    type: "status"
    at: "2026-03-09T10:57:48.726Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: restored the Docusaurus docs-shell typecheck on the blocked v0.3.5 release line and confirmed the full docs site check passes after syncing the website dependency graph."
doc_version: 3
doc_updated_at: "2026-03-09T10:57:48.726Z"
doc_updated_by: "CODER"
description: "Fix the custom docs theme components so Docs CI typecheck passes on the v0.3.5 release commit, then resume the blocked release flow."
id_source: "generated"
---
## Summary

- Problem: Docs CI fails on the v0.3.5 release commit because custom Docusaurus theme files import types from a module path that is not available in the website typecheck environment.
- Target outcome: Restore a clean website typecheck on the release line so the blocked v0.3.5 publish flow can complete without docs regressions.
- Constraint: Keep the fix minimal and release-focused; do not redesign the docs shell.

## Scope

### In scope
- Identify the exact theme type/import mismatch in website/src/theme/**.
- Apply the smallest code change that restores docs typecheck in CI.
- Re-run the failing docs checks and resume the blocked release flow.

### Out of scope
- Visual redesign of the docs shell.
- Broader Docusaurus theme refactors unrelated to the failing typecheck.
- New release-scope features.

## Plan

1. Inspect the failing custom theme files and the available Docusaurus type exports in the installed website dependencies.
2. Patch the theme components to use a type-safe import/signature that passes website typecheck in CI.
3. Re-run the failing docs checks, then resume release publication and verify the external release state.

## Verify Steps

1. Run `bun run docs:site:typecheck`. Expected: the website TypeScript check passes with no missing-module or missing-props errors.
2. Run `bun run docs:site:check`. Expected: the docs site validation suite stays green after the type fix.
3. Resume the blocked release flow and verify `npm view agentplane version` and `npm view @agentplaneorg/core version`. Expected: both resolve to `0.3.5`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T10:57:48.432Z — VERIFY — ok

By: CODER

Note: Patched the custom docs sidebar theme to remove the unnecessary wrapper component, added @docusaurus/theme-common as a direct website dependency, and passed bun run docs:site:typecheck plus bun run docs:site:check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T10:55:01.825Z, excerpt_hash=sha256:703604cc0ff357ef40a7a521eef5604b2fffbab147d1889e32ec46ee5070ad00

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the targeted theme import/signature fix if it causes broader docs regressions.
2. Re-run docs checks to confirm the rollback restores the previous local baseline.

## Findings

- None yet.
