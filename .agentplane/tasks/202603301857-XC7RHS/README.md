---
id: "202603301857-XC7RHS"
title: "Split pre-dispatch metadata needs from full loaded config"
result_summary: "integrate: squash task/202603301857-XC7RHS/split-dispatch-metadata-boundary"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603301856-D7EHN2"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T12:21:59.962Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T12:31:12.489Z"
  updated_by: "CODER"
  note: "Dispatch metadata split verified for config boundary classification."
commit:
  hash: "d398efd79910b62e85f0c97ee944fcade1d82af2"
  message: "🧩 XC7RHS integrate: squash task/202603301857-XC7RHS/split-dispatch-metadata-boundary"
comments:
  -
    author: "CODER"
    body: "Start: split dispatch metadata from loaded-config needs so CLI bootstrap can classify config-free commands before any full config boundary is crossed."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-XC7RHS/pr."
events:
  -
    type: "status"
    at: "2026-03-31T12:25:27.487Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split dispatch metadata from loaded-config needs so CLI bootstrap can classify config-free commands before any full config boundary is crossed."
  -
    type: "verify"
    at: "2026-03-31T12:31:12.489Z"
    author: "CODER"
    state: "ok"
    note: "Dispatch metadata split verified for config boundary classification."
  -
    type: "status"
    at: "2026-03-31T12:32:44.044Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-XC7RHS/pr."
doc_version: 3
doc_updated_at: "2026-03-31T12:32:44.046Z"
doc_updated_by: "INTEGRATOR"
description: "Implement Epic 4 / R4.1 from REFACTOR.md. command dispatch can decide what it needs before forcing full config load on unrelated paths."
sections:
  Summary: |-
    Split pre-dispatch metadata needs from full loaded config
    
    Implement Epic 4 / R4.1 from REFACTOR.md. command dispatch can decide what it needs before forcing full config load on unrelated paths.
  Scope: |-
    - In scope: Implement Epic 4 / R4.1 from REFACTOR.md. command dispatch can decide what it needs before forcing full config load on unrelated paths.
    - Out of scope: unrelated refactors not required for "Split pre-dispatch metadata needs from full loaded config".
  Plan: |-
    1. Audit the current implementation and tests around CLI bootstrap and config-loading boundary to isolate the exact behavior gap for R4.1.
    2. Implement the smallest change set that satisfies the REFACTOR contract: command dispatch can decide what it needs before forcing full config load on unrelated paths.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering CLI bootstrap and config-loading boundary. Expected: the behavior described by R4.1 is observable and stable.
    2. Inspect the final diff for 202603301857-XC7RHS. Expected: scope stays limited to CLI bootstrap and config-loading boundary plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: command dispatch can decide what it needs before forcing full config load on unrelated paths.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T12:31:12.489Z — VERIFY — ok
    
    By: CODER
    
    Note: Dispatch metadata split verified for config boundary classification.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:25:27.489Z, excerpt_hash=sha256:aa4abb032eeed650a2df5606243a3fb8f784b314b60b74254828dcfa2bbaa70c
    
    Details:
    
    Command: bunx eslint packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli/command-catalog/shared.ts packages/agentplane/src/cli/run-cli/command-catalog/core.ts packages/agentplane/src/cli/run-cli/command-catalog/project.ts packages/agentplane/src/cli/run-cli/command-catalog/lifecycle.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts
    Result: pass
    Evidence: exited 0 with no diagnostics.
    Scope: touched CLI bootstrap and command-catalog files.
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts packages/agentplane/src/cli/run-cli.core.test.ts
    Result: pass
    Evidence: 3 files passed, 46 tests passed.
    Scope: dispatch metadata graph, boot fast paths, and integration coverage for ide sync config boundary.
    
    Command: bun run --filter=agentplane build
    Result: pass
    Evidence: agentplane build exited 0.
    Scope: full package build after dispatch metadata refactor.
    
    Command: git diff --stat
    Result: pass
    Evidence: scope stayed limited to CLI bootstrap/catalog files, one integration test, and task documentation.
    Scope: final diff review for XC7RHS.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split pre-dispatch metadata needs from full loaded config

Implement Epic 4 / R4.1 from REFACTOR.md. command dispatch can decide what it needs before forcing full config load on unrelated paths.

## Scope

- In scope: Implement Epic 4 / R4.1 from REFACTOR.md. command dispatch can decide what it needs before forcing full config load on unrelated paths.
- Out of scope: unrelated refactors not required for "Split pre-dispatch metadata needs from full loaded config".

## Plan

1. Audit the current implementation and tests around CLI bootstrap and config-loading boundary to isolate the exact behavior gap for R4.1.
2. Implement the smallest change set that satisfies the REFACTOR contract: command dispatch can decide what it needs before forcing full config load on unrelated paths.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering CLI bootstrap and config-loading boundary. Expected: the behavior described by R4.1 is observable and stable.
2. Inspect the final diff for 202603301857-XC7RHS. Expected: scope stays limited to CLI bootstrap and config-loading boundary plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: command dispatch can decide what it needs before forcing full config load on unrelated paths.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T12:31:12.489Z — VERIFY — ok

By: CODER

Note: Dispatch metadata split verified for config boundary classification.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:25:27.489Z, excerpt_hash=sha256:aa4abb032eeed650a2df5606243a3fb8f784b314b60b74254828dcfa2bbaa70c

Details:

Command: bunx eslint packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli/command-catalog/shared.ts packages/agentplane/src/cli/run-cli/command-catalog/core.ts packages/agentplane/src/cli/run-cli/command-catalog/project.ts packages/agentplane/src/cli/run-cli/command-catalog/lifecycle.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts
Result: pass
Evidence: exited 0 with no diagnostics.
Scope: touched CLI bootstrap and command-catalog files.

Command: bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts packages/agentplane/src/cli/run-cli.core.test.ts
Result: pass
Evidence: 3 files passed, 46 tests passed.
Scope: dispatch metadata graph, boot fast paths, and integration coverage for ide sync config boundary.

Command: bun run --filter=agentplane build
Result: pass
Evidence: agentplane build exited 0.
Scope: full package build after dispatch metadata refactor.

Command: git diff --stat
Result: pass
Evidence: scope stayed limited to CLI bootstrap/catalog files, one integration test, and task documentation.
Scope: final diff review for XC7RHS.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
