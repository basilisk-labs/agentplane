---
id: "202604211312-K17WRN"
title: "Resolve remaining facade retention policy"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211312-2P1FPQ"
tags:
  - "architecture"
  - "cleanup"
  - "code"
verify:
  - "bun run docs:cli:check"
  - "bun run knip:check"
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:12:54.002Z"
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
doc_updated_at: "2026-04-21T13:12:52.776Z"
doc_updated_by: "PLANNER"
description: "Decide and implement removal or deprecation for non-trivial facades such as release apply.pipeline and hosted-close command wrappers."
sections:
  Summary: |-
    Resolve remaining facade retention policy
    
    Decide and implement removal or deprecation for non-trivial facades such as release apply.pipeline and hosted-close command wrappers.
  Scope: |-
    - In scope: Decide and implement removal or deprecation for non-trivial facades such as release apply.pipeline and hosted-close command wrappers.
    - Out of scope: unrelated refactors not required for "Resolve remaining facade retention policy".
  Plan: "Scope: handle facades that are not one-line shims. Steps: 1. For each remaining facade, classify as public CLI surface, internal adapter, or removable compatibility file. 2. Remove internal-only facades after import migration. 3. Add @deprecated comments or docs for retained compatibility files. 4. Verify CLI reference does not drift unexpectedly. Acceptance: no ambiguous shim remains; each retained facade has a reason."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Resolve remaining facade retention policy

Decide and implement removal or deprecation for non-trivial facades such as release apply.pipeline and hosted-close command wrappers.

## Scope

- In scope: Decide and implement removal or deprecation for non-trivial facades such as release apply.pipeline and hosted-close command wrappers.
- Out of scope: unrelated refactors not required for "Resolve remaining facade retention policy".

## Plan

Scope: handle facades that are not one-line shims. Steps: 1. For each remaining facade, classify as public CLI surface, internal adapter, or removable compatibility file. 2. Remove internal-only facades after import migration. 3. Add @deprecated comments or docs for retained compatibility files. 4. Verify CLI reference does not drift unexpectedly. Acceptance: no ambiguous shim remains; each retained facade has a reason.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
