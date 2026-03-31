---
id: "202603301856-H78XDH"
title: "Make fast help consume the same graph without special routing drift"
result_summary: "integrate: squash task/202603301856-H78XDH/fast-help-uses-runtime-graph"
status: "DONE"
priority: "high"
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
  updated_at: "2026-03-31T08:34:34.399Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after R1.2: make fast help route through the same runtime graph without forcing project/config resolution."
verification:
  state: "ok"
  updated_at: "2026-03-31T08:39:51.220Z"
  updated_by: "CODER"
  note: "Fast help now routes through the runtime help registry; focused help/CLI suites stayed green and explicit help commands remain stable with trailing --help."
commit:
  hash: "2fa748925a041db881f57d6c4e4a4eb3bac73f66"
  message: "🧩 H78XDH integrate: squash task/202603301856-H78XDH/fast-help-uses-runtime-graph"
comments:
  -
    author: "CODER"
    body: "Start: route fast help through the runtime help registry so --help and help stop depending on a parallel command match definition."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301856-H78XDH/pr."
events:
  -
    type: "status"
    at: "2026-03-31T08:35:18.707Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: route fast help through the runtime help registry so --help and help stop depending on a parallel command match definition."
  -
    type: "verify"
    at: "2026-03-31T08:39:51.220Z"
    author: "CODER"
    state: "ok"
    note: "Fast help now routes through the runtime help registry; focused help/CLI suites stayed green and explicit help commands remain stable with trailing --help."
  -
    type: "status"
    at: "2026-03-31T08:41:42.853Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301856-H78XDH/pr."
doc_version: 3
doc_updated_at: "2026-03-31T08:41:42.857Z"
doc_updated_by: "INTEGRATOR"
description: "Implement Epic 1 / R1.3 from REFACTOR.md. `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition."
sections:
  Summary: |-
    Make fast help consume the same graph without special routing drift
    
    Implement Epic 1 / R1.3 from REFACTOR.md. `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.
  Scope: |-
    - In scope: Implement Epic 1 / R1.3 from REFACTOR.md. `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.
    - Out of scope: unrelated refactors not required for "Make fast help consume the same graph without special routing drift".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli.ts`, help handler plumbing to isolate the exact behavior gap for R1.3.
    2. Implement the smallest change set that satisfies the REFACTOR contract: `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli.ts`, help handler plumbing. Expected: the behavior described by R1.3 is observable and stable.
    2. Inspect the final diff for 202603301856-H78XDH. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli.ts`, help handler plumbing plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T08:39:51.220Z — VERIFY — ok
    
    By: CODER
    
    Note: Fast help now routes through the runtime help registry; focused help/CLI suites stayed green and explicit help commands remain stable with trailing --help.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T08:35:18.709Z, excerpt_hash=sha256:892d0ddddf23bb921198ac45152c64c5d93a63e07310666a4725d8bb1ee8cf91
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make fast help consume the same graph without special routing drift

Implement Epic 1 / R1.3 from REFACTOR.md. `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.

## Scope

- In scope: Implement Epic 1 / R1.3 from REFACTOR.md. `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.
- Out of scope: unrelated refactors not required for "Make fast help consume the same graph without special routing drift".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli.ts`, help handler plumbing to isolate the exact behavior gap for R1.3.
2. Implement the smallest change set that satisfies the REFACTOR contract: `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli.ts`, help handler plumbing. Expected: the behavior described by R1.3 is observable and stable.
2. Inspect the final diff for 202603301856-H78XDH. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli.ts`, help handler plumbing plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T08:39:51.220Z — VERIFY — ok

By: CODER

Note: Fast help now routes through the runtime help registry; focused help/CLI suites stayed green and explicit help commands remain stable with trailing --help.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T08:35:18.709Z, excerpt_hash=sha256:892d0ddddf23bb921198ac45152c64c5d93a63e07310666a4725d8bb1ee8cf91

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
