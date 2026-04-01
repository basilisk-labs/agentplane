---
id: "202603301857-M5MBBB"
title: "Derive direct subcommand names from the canonical command graph"
result_summary: "integrate: squash task/202603301857-M5MBBB/derived-child-names-from-command-graph"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603301856-HVS36K"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T10:13:07.601Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T10:17:17.010Z"
  updated_by: "CODER"
  note: "Focused group-command and command-graph tests plus eslint passed after moving direct child-name derivation onto command ids and canonical graph helpers."
commit:
  hash: "ab3390d555f6786a82f828db475a9085a0c6d27d"
  message: "🧩 M5MBBB integrate: squash task/202603301857-M5MBBB/derived-child-names-from-command-graph"
comments:
  -
    author: "CODER"
    body: "Start: derive reusable direct-child-name lookup from canonical command ids and graph helpers without migrating all group command entry modules yet."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-M5MBBB/pr."
events:
  -
    type: "status"
    at: "2026-03-31T10:13:54.682Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: derive reusable direct-child-name lookup from canonical command ids and graph helpers without migrating all group command entry modules yet."
  -
    type: "verify"
    at: "2026-03-31T10:17:17.010Z"
    author: "CODER"
    state: "ok"
    note: "Focused group-command and command-graph tests plus eslint passed after moving direct child-name derivation onto command ids and canonical graph helpers."
  -
    type: "status"
    at: "2026-03-31T10:19:25.423Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-M5MBBB/pr."
doc_version: 3
doc_updated_at: "2026-03-31T10:19:25.428Z"
doc_updated_by: "INTEGRATOR"
description: "Implement Epic 5 / R5.1 from REFACTOR.md. child command discovery is computed from command ids instead of manually listed arrays."
sections:
  Summary: |-
    Derive direct subcommand names from the canonical command graph
    
    Implement Epic 5 / R5.1 from REFACTOR.md. child command discovery is computed from command ids instead of manually listed arrays.
  Scope: |-
    - In scope: Implement Epic 5 / R5.1 from REFACTOR.md. child command discovery is computed from command ids instead of manually listed arrays.
    - Out of scope: unrelated refactors not required for "Derive direct subcommand names from the canonical command graph".
  Plan: |-
    1. Audit the current implementation and tests around group command helpers and command graph helpers to isolate the exact behavior gap for R5.1.
    2. Implement the smallest change set that satisfies the REFACTOR contract: child command discovery is computed from command ids instead of manually listed arrays.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering group command helpers and command graph helpers. Expected: the behavior described by R5.1 is observable and stable.
    2. Inspect the final diff for 202603301857-M5MBBB. Expected: scope stays limited to group command helpers and command graph helpers plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: child command discovery is computed from command ids instead of manually listed arrays.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T10:17:17.010Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused group-command and command-graph tests plus eslint passed after moving direct child-name derivation onto command ids and canonical graph helpers.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T10:13:54.684Z, excerpt_hash=sha256:19c14f311d406bf385b831c42ca2a7fe965625eeee50d83aece5196bbb8c420c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Derive direct subcommand names from the canonical command graph

Implement Epic 5 / R5.1 from REFACTOR.md. child command discovery is computed from command ids instead of manually listed arrays.

## Scope

- In scope: Implement Epic 5 / R5.1 from REFACTOR.md. child command discovery is computed from command ids instead of manually listed arrays.
- Out of scope: unrelated refactors not required for "Derive direct subcommand names from the canonical command graph".

## Plan

1. Audit the current implementation and tests around group command helpers and command graph helpers to isolate the exact behavior gap for R5.1.
2. Implement the smallest change set that satisfies the REFACTOR contract: child command discovery is computed from command ids instead of manually listed arrays.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering group command helpers and command graph helpers. Expected: the behavior described by R5.1 is observable and stable.
2. Inspect the final diff for 202603301857-M5MBBB. Expected: scope stays limited to group command helpers and command graph helpers plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: child command discovery is computed from command ids instead of manually listed arrays.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T10:17:17.010Z — VERIFY — ok

By: CODER

Note: Focused group-command and command-graph tests plus eslint passed after moving direct child-name derivation onto command ids and canonical graph helpers.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T10:13:54.684Z, excerpt_hash=sha256:19c14f311d406bf385b831c42ca2a7fe965625eeee50d83aece5196bbb8c420c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
