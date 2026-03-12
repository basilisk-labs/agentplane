---
id: "202603121125-34CVX8"
title: "Patch stabilization: sync ledger and prose docs to current runtime"
status: "DOING"
priority: "med"
owner: "DOCS"
depends_on:
  - "202603121125-EA1BPW"
  - "202603121125-SNMAT3"
  - "202603121125-RZ4HDW"
tags:
  - "docs"
  - "cli"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T11:54:28.928Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after the code-side patch set stabilized; the remaining gap is narrative drift between shipped CLI behavior and the developer/user docs."
verification:
  state: "ok"
  updated_at: "2026-03-12T11:57:32.142Z"
  updated_by: "DOCS"
  note: "Verified ledger and prose docs against current patch behavior."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: refresh the bug ledger and remaining prose docs so they describe the shipped patch behavior, the current remaining gaps, and the now-narrowed fast-CI and commit diagnostics story accurately."
events:
  -
    type: "status"
    at: "2026-03-12T11:54:30.707Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: refresh the bug ledger and remaining prose docs so they describe the shipped patch behavior, the current remaining gaps, and the now-narrowed fast-CI and commit diagnostics story accurately."
  -
    type: "verify"
    at: "2026-03-12T11:57:32.142Z"
    author: "DOCS"
    state: "ok"
    note: "Verified ledger and prose docs against current patch behavior."
doc_version: 3
doc_updated_at: "2026-03-12T11:57:32.143Z"
doc_updated_by: "DOCS"
description: "Refresh the developer bug ledger and remaining release-facing prose docs so they match the actual CLI behavior shipped after the latest stabilization fixes."
id_source: "generated"
---
## Summary

Patch stabilization: sync ledger and prose docs to current runtime

Refresh the developer bug ledger and remaining release-facing prose docs so they match the actual CLI behavior shipped after the latest stabilization fixes.

## Scope

- In scope: Refresh the developer bug ledger and remaining release-facing prose docs so they match the actual CLI behavior shipped after the latest stabilization fixes.
- Out of scope: unrelated refactors not required for "Patch stabilization: sync ledger and prose docs to current runtime".

## Plan

1. Compare the developer bug ledger and remaining prose docs against the latest CLI behavior and shipped stabilization fixes.
2. Update stale narrative claims, remaining-gap lists, and recovery guidance so they match the current runtime.
3. Re-run docs and help regression checks after edits.

## Verify Steps

- Bug ledger and prose docs no longer claim already-fixed gaps as open.
- Any remaining open issues are evidence-backed and scoped to current code.
- Docs or help regression checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T11:57:32.142Z — VERIFY — ok

By: DOCS

Note: Verified ledger and prose docs against current patch behavior.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T11:54:30.707Z, excerpt_hash=sha256:cf6354e42353fec09fdafbc6d241f6f4d4b14cdd31b10247aedc2400b817af7b

Details:

Checks:
- bun x vitest run packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --hookTimeout 60000 --testTimeout 60000
- ./node_modules/.bin/prettier --check docs/developer/cli-bug-ledger-v0-3-x.mdx docs/help/troubleshooting-by-symptom.mdx docs/user/commands.mdx

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
