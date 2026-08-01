---
id: "202608010758-DF63K4"
title: "Refresh generated script inventory after TypeScript 7 adoption"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "generated"
  - "post-merge"
  - "toolchain"
  - "typescript7"
  - "v0.7"
verify:
  - "bun run docs:scripts:check"
  - "bun run typescript:toolchain:check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T07:59:23.870Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-01T07:59:55.958Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-01T08:01:21.371Z"
doc_updated_by: "DOCS"
description: "Repair the post-merge TypeScript 7 documentation drift by regenerating scripts/README.md from package.json without changing scripts, runtime behavior, or the adopted TS7/TS6 toolchain contract."
sections:
  Summary: |-
    Refresh generated script inventory after TypeScript 7 adoption

    Repair the post-merge TypeScript 7 documentation drift by regenerating scripts/README.md from package.json without changing scripts, runtime behavior, or the adopted TS7/TS6 toolchain contract.
  Scope: |-
    - In scope: Repair the post-merge TypeScript 7 documentation drift by regenerating scripts/README.md from package.json without changing scripts, runtime behavior, or the adopted TS7/TS6 toolchain contract.
    - Out of scope: unrelated refactors not required for "Refresh generated script inventory after TypeScript 7 adoption".
  Plan: |-
    1. Regenerate scripts/README.md from the current package.json script registry.
    2. Confirm the diff contains only the missing TypeScript toolchain command, the corresponding ci:contract expansion, and deterministic table formatting.
    3. Run the generated-doc freshness check and the TypeScript toolchain contract check.
    4. Record the hosted CI failure as the triggering evidence and preserve all unrelated implementation state.
  Verify Steps: |-
    1. Run `bun run docs:scripts:generate` and inspect the diff. Expected: only the current `ci:contract` command, the `typescript:toolchain:check` inventory row, its generated grouping note, and deterministic table-width formatting change.
    2. Run `bun run docs:scripts:check`. Expected: the generated script inventory is current.
    3. Run `bun run typescript:toolchain:check`. Expected: TypeScript 7 remains the typecheck compiler, TypeScript 6 remains the compiler-API surface, and runtime packages do not depend on `@typescript/native`.
    4. Run `git diff --check` and inspect final status. Expected: no unrelated tracked file changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Hosted Core CI for PR #4719 failed in verify-routed because scripts/README.md did not include the TypeScript toolchain check added by completed task DRYTNK.
      Impact: Every evaluator-path PR fails the targeted fast route before its scoped tests, blocking WWQP4B integration and all downstream 0.7 work.
      Resolution: Regenerate the canonical script inventory in this dedicated post-merge task and keep the diff limited to generated output.
extensions:
  workflow_route_baseline:
    start_head_sha: "56bb919419e198f3ecfd1a074358e6ead81deaa7"
    version: 1
id_source: "generated"
---
## Summary

Refresh generated script inventory after TypeScript 7 adoption

Repair the post-merge TypeScript 7 documentation drift by regenerating scripts/README.md from package.json without changing scripts, runtime behavior, or the adopted TS7/TS6 toolchain contract.

## Scope

- In scope: Repair the post-merge TypeScript 7 documentation drift by regenerating scripts/README.md from package.json without changing scripts, runtime behavior, or the adopted TS7/TS6 toolchain contract.
- Out of scope: unrelated refactors not required for "Refresh generated script inventory after TypeScript 7 adoption".

## Plan

1. Regenerate scripts/README.md from the current package.json script registry.
2. Confirm the diff contains only the missing TypeScript toolchain command, the corresponding ci:contract expansion, and deterministic table formatting.
3. Run the generated-doc freshness check and the TypeScript toolchain contract check.
4. Record the hosted CI failure as the triggering evidence and preserve all unrelated implementation state.

## Verify Steps

1. Run `bun run docs:scripts:generate` and inspect the diff. Expected: only the current `ci:contract` command, the `typescript:toolchain:check` inventory row, its generated grouping note, and deterministic table-width formatting change.
2. Run `bun run docs:scripts:check`. Expected: the generated script inventory is current.
3. Run `bun run typescript:toolchain:check`. Expected: TypeScript 7 remains the typecheck compiler, TypeScript 6 remains the compiler-API surface, and runtime packages do not depend on `@typescript/native`.
4. Run `git diff --check` and inspect final status. Expected: no unrelated tracked file changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Hosted Core CI for PR #4719 failed in verify-routed because scripts/README.md did not include the TypeScript toolchain check added by completed task DRYTNK.
  Impact: Every evaluator-path PR fails the targeted fast route before its scoped tests, blocking WWQP4B integration and all downstream 0.7 work.
  Resolution: Regenerate the canonical script inventory in this dedicated post-merge task and keep the diff limited to generated output.
