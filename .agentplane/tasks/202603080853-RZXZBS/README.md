---
id: "202603080853-RZXZBS"
title: "Sync generated CLI reference after fast-gate refactors"
result_summary: "Regenerated and prettified docs/user/cli-reference.generated.mdx to restore CLI docs freshness for broad pre-push verification."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T08:53:34.905Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T08:54:58.064Z"
  updated_by: "TESTER"
  note: "Verified: docs/user/cli-reference.generated.mdx was regenerated and prettified, and docs:cli:check now passes against the current CLI specs."
commit:
  hash: "72681fb730e1529d6a347ba43979e920eff5eb87"
  message: "📝 RZXZBS docs: refresh generated CLI reference"
comments:
  -
    author: "CODER"
    body: "Start: refreshing the generated CLI reference so broad-fallback pre-push passes after the latest CLI and CI refactors."
  -
    author: "CODER"
    body: "Verified: the generated CLI reference now matches the current CLI help output and broad-fallback docs:cli:check passes again."
events:
  -
    type: "status"
    at: "2026-03-08T08:53:35.235Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: refreshing the generated CLI reference so broad-fallback pre-push passes after the latest CLI and CI refactors."
  -
    type: "verify"
    at: "2026-03-08T08:54:58.064Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: docs/user/cli-reference.generated.mdx was regenerated and prettified, and docs:cli:check now passes against the current CLI specs."
  -
    type: "status"
    at: "2026-03-08T08:55:11.461Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the generated CLI reference now matches the current CLI help output and broad-fallback docs:cli:check passes again."
doc_version: 2
doc_updated_at: "2026-03-08T08:55:11.461Z"
doc_updated_by: "CODER"
description: "Refresh docs/user/cli-reference.generated.mdx so broad fallback pre-push passes after the recent CI and doctor fast-bucket changes."
id_source: "generated"
---
## Summary

Sync generated CLI reference after fast-gate refactors

Refresh docs/user/cli-reference.generated.mdx so broad fallback pre-push passes after the recent CI and doctor fast-bucket changes.

## Scope

- In scope: Refresh docs/user/cli-reference.generated.mdx so broad fallback pre-push passes after the recent CI and doctor fast-bucket changes..
- Out of scope: unrelated refactors not required for "Sync generated CLI reference after fast-gate refactors".

## Plan

1. Regenerate docs/user/cli-reference.generated.mdx from the current CLI specs.
2. Verify that docs:cli:check passes and that no unrelated generated artifacts drift.
3. Commit the refreshed generated reference, finish the task, and retry pushing main.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `docs`

### Checks
- `node packages/agentplane/dist/cli.js docs cli --out docs/user/cli-reference.generated.mdx`
- `node scripts/check-cli-reference-fresh.mjs`
- `git diff -- docs/user/cli-reference.generated.mdx`

### Evidence / Commands
- Record that the regenerated file matches current CLI help output and leaves no extra drift.

### Pass criteria
- Generated CLI reference is refreshed and docs:cli:check passes.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T08:54:58.064Z — VERIFY — ok

By: TESTER

Note: Verified: docs/user/cli-reference.generated.mdx was regenerated and prettified, and docs:cli:check now passes against the current CLI specs.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T08:53:35.235Z, excerpt_hash=sha256:bfcaf3ad18f41602a749c065cd6ff444dd621a88789574c7b5cce7fe80f45d40

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
