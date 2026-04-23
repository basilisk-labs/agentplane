---
id: "202604231744-MD4XTG"
title: "Decompose migrate-doc runtime hotspot"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T17:44:57.942Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split migrate-doc into smaller helpers, keep the command surface stable, and re-run the migrate-doc focused verification after the extraction."
events:
  -
    type: "status"
    at: "2026-04-23T17:44:58.401Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split migrate-doc into smaller helpers, keep the command surface stable, and re-run the migrate-doc focused verification after the extraction."
doc_version: 3
doc_updated_at: "2026-04-23T17:44:58.409Z"
doc_updated_by: "CODER"
description: "Split packages/agentplane/src/commands/task/migrate-doc.ts into smaller focused helpers while preserving migrate-doc behavior and existing task migration coverage."
sections:
  Summary: |-
    Decompose migrate-doc runtime hotspot
    
    Split packages/agentplane/src/commands/task/migrate-doc.ts into smaller focused helpers while preserving migrate-doc behavior and existing task migration coverage.
  Scope: |-
    - In scope: Split packages/agentplane/src/commands/task/migrate-doc.ts into smaller focused helpers while preserving migrate-doc behavior and existing task migration coverage.
    - Out of scope: unrelated refactors not required for "Decompose migrate-doc runtime hotspot".
  Plan: "Map the major responsibilities inside packages/agentplane/src/commands/task/migrate-doc.ts, extract the pure migration helpers into focused sibling modules, keep the command entrypoint thin, and re-verify migrate-doc coverage plus task-oriented CLI behavior."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Decompose migrate-doc runtime hotspot

Split packages/agentplane/src/commands/task/migrate-doc.ts into smaller focused helpers while preserving migrate-doc behavior and existing task migration coverage.

## Scope

- In scope: Split packages/agentplane/src/commands/task/migrate-doc.ts into smaller focused helpers while preserving migrate-doc behavior and existing task migration coverage.
- Out of scope: unrelated refactors not required for "Decompose migrate-doc runtime hotspot".

## Plan

Map the major responsibilities inside packages/agentplane/src/commands/task/migrate-doc.ts, extract the pure migration helpers into focused sibling modules, keep the command entrypoint thin, and re-verify migrate-doc coverage plus task-oriented CLI behavior.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
