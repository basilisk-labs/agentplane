---
id: "202603311331-Q9B3R2"
title: "N0.4 Add one lightweight hotspot report script"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "benchmark"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T13:51:45.660Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T14:31:12.281Z"
  updated_by: "CODER"
  note: "Added hotspot-report script and fixture test; verified with node scripts/hotspot-report.mjs, bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts, and bunx eslint scripts/hotspot-report.mjs packages/agentplane/src/cli/hotspot-report-script.test.ts."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add one repeatable hotspot report script that counts direct stdio writes, backend-type branches, and oversized runtime modules so refactor progress can be measured without hand auditing the tree."
events:
  -
    type: "status"
    at: "2026-03-31T13:52:33.822Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add one repeatable hotspot report script that counts direct stdio writes, backend-type branches, and oversized runtime modules so refactor progress can be measured without hand auditing the tree."
  -
    type: "verify"
    at: "2026-03-31T14:31:12.281Z"
    author: "CODER"
    state: "ok"
    note: "Added hotspot-report script and fixture test; verified with node scripts/hotspot-report.mjs, bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts, and bunx eslint scripts/hotspot-report.mjs packages/agentplane/src/cli/hotspot-report-script.test.ts."
doc_version: 3
doc_updated_at: "2026-03-31T14:31:12.284Z"
doc_updated_by: "CODER"
description: "Implement N0.4 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: one repeatable script reports current counts for direct stdio writes, backend-type branches, and oversized runtime modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N0.4 Add one lightweight hotspot report script
    
    Implement N0.4 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: one repeatable script reports current counts for direct stdio writes, backend-type branches, and oversized runtime modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N0.4 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: one repeatable script reports current counts for direct stdio writes, backend-type branches, and oversized runtime modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N0.4 Add one lightweight hotspot report script".
  Plan: |-
    1. Audit `scripts/` or existing diagnostics harness and isolate the narrowest change set that satisfies N0.4.
    2. Implement add one lightweight hotspot report script with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `scripts/` or existing diagnostics harness. Expected: the behavior targeted by N0.4 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-Q9B3R2. Expected: scope stays anchored to `scripts/` or existing diagnostics harness plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: one repeatable script reports current counts for direct stdio writes, backend-type branches, and oversized runtime modules.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T14:31:12.281Z — VERIFY — ok
    
    By: CODER
    
    Note: Added hotspot-report script and fixture test; verified with node scripts/hotspot-report.mjs, bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts, and bunx eslint scripts/hotspot-report.mjs packages/agentplane/src/cli/hotspot-report-script.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T13:52:33.823Z, excerpt_hash=sha256:86051a2e6e82282e58caa1f183c2dc867ab71cb430942c035b9002bd1fbccd8f
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N0.4 Add one lightweight hotspot report script

Implement N0.4 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: one repeatable script reports current counts for direct stdio writes, backend-type branches, and oversized runtime modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N0.4 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: one repeatable script reports current counts for direct stdio writes, backend-type branches, and oversized runtime modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N0.4 Add one lightweight hotspot report script".

## Plan

1. Audit `scripts/` or existing diagnostics harness and isolate the narrowest change set that satisfies N0.4.
2. Implement add one lightweight hotspot report script with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `scripts/` or existing diagnostics harness. Expected: the behavior targeted by N0.4 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-Q9B3R2. Expected: scope stays anchored to `scripts/` or existing diagnostics harness plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: one repeatable script reports current counts for direct stdio writes, backend-type branches, and oversized runtime modules.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T14:31:12.281Z — VERIFY — ok

By: CODER

Note: Added hotspot-report script and fixture test; verified with node scripts/hotspot-report.mjs, bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts, and bunx eslint scripts/hotspot-report.mjs packages/agentplane/src/cli/hotspot-report-script.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T13:52:33.823Z, excerpt_hash=sha256:86051a2e6e82282e58caa1f183c2dc867ab71cb430942c035b9002bd1fbccd8f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
