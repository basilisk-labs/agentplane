---
id: "202604292023-GHNS95"
title: "Add prompt fragment parser contracts"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604292023-TV3J9J"
tags:
  - "code"
  - "prompt-assembly"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/runtime/prompt-fragments/*.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T20:24:50.990Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-29T20:24:41.429Z"
doc_updated_by: "ORCHESTRATOR"
description: "Introduce source-level prompt fragment contracts and parser/renderer utilities for markdown markers and structured agent-profile list items without migrating bundled prompt assets yet."
sections:
  Summary: |-
    Add prompt fragment parser contracts
    
    Introduce source-level prompt fragment contracts and parser/renderer utilities for markdown markers and structured agent-profile list items without migrating bundled prompt assets yet.
  Scope: |-
    - In scope: Introduce source-level prompt fragment contracts and parser/renderer utilities for markdown markers and structured agent-profile list items without migrating bundled prompt assets yet.
    - Out of scope: unrelated refactors not required for "Add prompt fragment parser contracts".
  Plan: |-
    1. Add prompt-fragment domain types and parser/renderer utilities for markdown and structured agent profile list values.
    2. Support backward-compatible plain string list items while exposing stable fragment ids where present.
    3. Add focused unit tests for marker parsing, duplicate ids, rendering without markers, and JSON fragment normalization.
    4. Run focused tests, typecheck, bootstrap, doctor, and diff hygiene.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runtime/prompt-fragments/*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add prompt fragment parser contracts

Introduce source-level prompt fragment contracts and parser/renderer utilities for markdown markers and structured agent-profile list items without migrating bundled prompt assets yet.

## Scope

- In scope: Introduce source-level prompt fragment contracts and parser/renderer utilities for markdown markers and structured agent-profile list items without migrating bundled prompt assets yet.
- Out of scope: unrelated refactors not required for "Add prompt fragment parser contracts".

## Plan

1. Add prompt-fragment domain types and parser/renderer utilities for markdown and structured agent profile list values.
2. Support backward-compatible plain string list items while exposing stable fragment ids where present.
3. Add focused unit tests for marker parsing, duplicate ids, rendering without markers, and JSON fragment normalization.
4. Run focused tests, typecheck, bootstrap, doctor, and diff hygiene.

## Verify Steps

1. Run `bun test packages/agentplane/src/runtime/prompt-fragments/*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
