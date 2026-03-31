---
id: "202603301856-R676R2"
title: "Preserve lazy handler loading while removing duplicated registry bootstrap work"
result_summary: "integrate: squash task/202603301856-R676R2/share-runtime-registry-bootstrap"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202603301856-D7EHN2"
  - "202603301856-H78XDH"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T08:45:13.411Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after R1.3: share one per-invocation runtime registry while keeping handler loads lazy and help project-free."
verification:
  state: "ok"
  updated_at: "2026-03-31T08:54:40.111Z"
  updated_by: "CODER"
  note: "Fast help now renders from a lightweight spec view (COMMANDS + helpSpec) instead of bootstrapping the runtime registry; focused help/contracts stayed green and --help still skipped .env loading."
commit:
  hash: "ea28aebb530892fb2c4e7e8170a27dfbedd853c9"
  message: "🧩 R676R2 integrate: squash task/202603301856-R676R2/share-runtime-registry-bootstrap"
comments:
  -
    author: "CODER"
    body: "Start: share one runtime registry bootstrap per invocation while keeping handler loads lazy and help free of project/config resolution."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301856-R676R2/pr."
events:
  -
    type: "status"
    at: "2026-03-31T08:46:05.748Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: share one runtime registry bootstrap per invocation while keeping handler loads lazy and help free of project/config resolution."
  -
    type: "verify"
    at: "2026-03-31T08:49:05.829Z"
    author: "CODER"
    state: "ok"
    note: "runCli now shares one runtime registry bootstrap per invocation; focused CLI/help suites passed and fast help still avoided .env loading on --help."
  -
    type: "verify"
    at: "2026-03-31T08:54:40.111Z"
    author: "CODER"
    state: "ok"
    note: "Fast help now renders from a lightweight spec view (COMMANDS + helpSpec) instead of bootstrapping the runtime registry; focused help/contracts stayed green and --help still skipped .env loading."
  -
    type: "status"
    at: "2026-03-31T08:56:49.683Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301856-R676R2/pr."
doc_version: 3
doc_updated_at: "2026-03-31T08:56:49.688Z"
doc_updated_by: "INTEGRATOR"
description: "Implement Epic 1 / R1.4 from REFACTOR.md. handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice."
sections:
  Summary: |-
    Preserve lazy handler loading while removing duplicated registry bootstrap work
    
    Implement Epic 1 / R1.4 from REFACTOR.md. handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.
  Scope: |-
    - In scope: Implement Epic 1 / R1.4 from REFACTOR.md. handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.
    - Out of scope: unrelated refactors not required for "Preserve lazy handler loading while removing duplicated registry bootstrap work".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/registry.run.ts` to isolate the exact behavior gap for R1.4.
    2. Implement the smallest change set that satisfies the REFACTOR contract: handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/registry.run.ts`. Expected: the behavior described by R1.4 is observable and stable.
    2. Inspect the final diff for 202603301856-R676R2. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/registry.run.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T08:49:05.829Z — VERIFY — ok
    
    By: CODER
    
    Note: runCli now shares one runtime registry bootstrap per invocation; focused CLI/help suites passed and fast help still avoided .env loading on --help.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T08:46:05.751Z, excerpt_hash=sha256:79377157fb6cf7713493821bd66e7aca030312e8c1ec1538ced28a38d22fbeb0
    
    ### 2026-03-31T08:54:40.111Z — VERIFY — ok
    
    By: CODER
    
    Note: Fast help now renders from a lightweight spec view (COMMANDS + helpSpec) instead of bootstrapping the runtime registry; focused help/contracts stayed green and --help still skipped .env loading.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T08:49:05.833Z, excerpt_hash=sha256:79377157fb6cf7713493821bd66e7aca030312e8c1ec1538ced28a38d22fbeb0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Preserve lazy handler loading while removing duplicated registry bootstrap work

Implement Epic 1 / R1.4 from REFACTOR.md. handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.

## Scope

- In scope: Implement Epic 1 / R1.4 from REFACTOR.md. handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.
- Out of scope: unrelated refactors not required for "Preserve lazy handler loading while removing duplicated registry bootstrap work".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/registry.run.ts` to isolate the exact behavior gap for R1.4.
2. Implement the smallest change set that satisfies the REFACTOR contract: handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/registry.run.ts`. Expected: the behavior described by R1.4 is observable and stable.
2. Inspect the final diff for 202603301856-R676R2. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/registry.run.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T08:49:05.829Z — VERIFY — ok

By: CODER

Note: runCli now shares one runtime registry bootstrap per invocation; focused CLI/help suites passed and fast help still avoided .env loading on --help.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T08:46:05.751Z, excerpt_hash=sha256:79377157fb6cf7713493821bd66e7aca030312e8c1ec1538ced28a38d22fbeb0

### 2026-03-31T08:54:40.111Z — VERIFY — ok

By: CODER

Note: Fast help now renders from a lightweight spec view (COMMANDS + helpSpec) instead of bootstrapping the runtime registry; focused help/contracts stayed green and --help still skipped .env loading.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T08:49:05.833Z, excerpt_hash=sha256:79377157fb6cf7713493821bd66e7aca030312e8c1ec1538ced28a38d22fbeb0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
