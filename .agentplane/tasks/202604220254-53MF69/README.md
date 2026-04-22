---
id: "202604220254-53MF69"
title: "Remove broad PR action barrel imports from CLI loaders"
result_summary: "PR command handlers no longer import through the broad PR action barrel; integrate catalog metadata is split into a pure spec module; the dead PR barrel was removed and related legacy facade exports were narrowed."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604220254-7TACEE"
tags:
  - "cli"
  - "perf"
  - "pr"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:58:55.330Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T04:01:47.379Z"
  updated_by: "CODER"
  note: "Verified PR barrel cleanup. Evidence: PR/workflow focused Vitest set passed (12 files, 93 tests); typecheck passed; arch:baseline + arch:deps passed with 6 known no-circular ignored; knip:check passed (total=545/563); bench:cli:cold:check passed; git diff --check passed; ci:local:fast passed with 233 fast files / 1357 passed / 2 skipped and critical E2E 5 files / 13 passed."
commit:
  hash: "6c79ea3c0a2666c5cf006c2265dce383f169d17e"
  message: "♻️ 53MF69 pr: remove action barrel imports"
comments:
  -
    author: "CODER"
    body: "Start: remove broad PR action barrel imports from CLI loaders, preserving PR command registration and workflow behavior."
  -
    author: "CODER"
    body: "Verified: PR command registration and integrate paths pass focused checks, arch, knip, cold path, and fast CI."
events:
  -
    type: "status"
    at: "2026-04-22T03:51:39.160Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove broad PR action barrel imports from CLI loaders, preserving PR command registration and workflow behavior."
  -
    type: "verify"
    at: "2026-04-22T04:01:47.379Z"
    author: "CODER"
    state: "ok"
    note: "Verified PR barrel cleanup. Evidence: PR/workflow focused Vitest set passed (12 files, 93 tests); typecheck passed; arch:baseline + arch:deps passed with 6 known no-circular ignored; knip:check passed (total=545/563); bench:cli:cold:check passed; git diff --check passed; ci:local:fast passed with 233 fast files / 1357 passed / 2 skipped and critical E2E 5 files / 13 passed."
  -
    type: "status"
    at: "2026-04-22T04:02:05.083Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR command registration and integrate paths pass focused checks, arch, knip, cold path, and fast CI."
doc_version: 3
doc_updated_at: "2026-04-22T04:02:05.084Z"
doc_updated_by: "CODER"
description: "Ensure PR command group specs/loaders do not import the full PR action barrel during catalog construction."
sections:
  Summary: "Narrow PR CLI imports so command discovery does not eagerly load all PR action implementations."
  Scope: "PR command catalog/loaders and direct tests. No PR workflow semantics change."
  Plan: |-
    1. Identify PR command imports that flow through action barrels.
    2. Replace them with per-action spec/handler imports.
    3. Add or adjust assertions that command registration remains unchanged.
    4. Confirm cold-path import footprint improves or does not regress.
  Verify Steps: "Run PR command tests, cold-path check, arch checks, fast CI."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T04:01:47.379Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified PR barrel cleanup. Evidence: PR/workflow focused Vitest set passed (12 files, 93 tests); typecheck passed; arch:baseline + arch:deps passed with 6 known no-circular ignored; knip:check passed (total=545/563); bench:cli:cold:check passed; git diff --check passed; ci:local:fast passed with 233 fast files / 1357 passed / 2 skipped and critical E2E 5 files / 13 passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T03:51:39.198Z, excerpt_hash=sha256:a0aba3fdae9b0fe36f38e1b1ad0466a7f5558fea7d79fe5c89eb6f547dbf8dfa
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert PR loader import changes to the previous barrel-based wiring."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Narrow PR CLI imports so command discovery does not eagerly load all PR action implementations.

## Scope

PR command catalog/loaders and direct tests. No PR workflow semantics change.

## Plan

1. Identify PR command imports that flow through action barrels.
2. Replace them with per-action spec/handler imports.
3. Add or adjust assertions that command registration remains unchanged.
4. Confirm cold-path import footprint improves or does not regress.

## Verify Steps

Run PR command tests, cold-path check, arch checks, fast CI.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T04:01:47.379Z — VERIFY — ok

By: CODER

Note: Verified PR barrel cleanup. Evidence: PR/workflow focused Vitest set passed (12 files, 93 tests); typecheck passed; arch:baseline + arch:deps passed with 6 known no-circular ignored; knip:check passed (total=545/563); bench:cli:cold:check passed; git diff --check passed; ci:local:fast passed with 233 fast files / 1357 passed / 2 skipped and critical E2E 5 files / 13 passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T03:51:39.198Z, excerpt_hash=sha256:a0aba3fdae9b0fe36f38e1b1ad0466a7f5558fea7d79fe5c89eb6f547dbf8dfa

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert PR loader import changes to the previous barrel-based wiring.

## Findings

None yet.
