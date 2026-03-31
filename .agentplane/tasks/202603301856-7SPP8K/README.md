---
id: "202603301856-7SPP8K"
title: "Delete obsolete routing helpers and update tests/docs"
result_summary: "integrate: squash task/202603301856-7SPP8K/delete-obsolete-routing-helpers"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603301856-R676R2"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T09:00:53.222Z"
  updated_by: "ORCHESTRATOR"
  note: "Approve R1.5 cleanup of obsolete routing helpers and stale split-era docs/tests after R1.2-R1.4 landing."
verification:
  state: "ok"
  updated_at: "2026-03-31T09:10:07.902Z"
  updated_by: "CODER"
  note: "Focused vitest slice passed for help/docs contract cleanup; eslint passed on touched TS files; generated CLI reference and top-level help snapshot refreshed."
commit:
  hash: "61c1a5df8b7ab069c8fd157b6689e0303e924784"
  message: "🧩 7SPP8K integrate: squash task/202603301856-7SPP8K/delete-obsolete-routing-helpers"
comments:
  -
    author: "CODER"
    body: "Start: remove stale split-era routing references from help/docs/tests without changing public command behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301856-7SPP8K/pr."
events:
  -
    type: "status"
    at: "2026-03-31T09:02:10.942Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove stale split-era routing references from help/docs/tests without changing public command behavior."
  -
    type: "verify"
    at: "2026-03-31T09:10:07.902Z"
    author: "CODER"
    state: "ok"
    note: "Focused vitest slice passed for help/docs contract cleanup; eslint passed on touched TS files; generated CLI reference and top-level help snapshot refreshed."
  -
    type: "status"
    at: "2026-03-31T09:14:32.276Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301856-7SPP8K/pr."
doc_version: 3
doc_updated_at: "2026-03-31T09:14:32.281Z"
doc_updated_by: "INTEGRATOR"
description: "Implement Epic 1 / R1.5 from REFACTOR.md. old duplicated matcher paths are removed and the safety-net tests still pass unchanged."
sections:
  Summary: |-
    Delete obsolete routing helpers and update tests/docs
    
    Implement Epic 1 / R1.5 from REFACTOR.md. old duplicated matcher paths are removed and the safety-net tests still pass unchanged.
  Scope: |-
    - In scope: Implement Epic 1 / R1.5 from REFACTOR.md. old duplicated matcher paths are removed and the safety-net tests still pass unchanged.
    - Out of scope: unrelated refactors not required for "Delete obsolete routing helpers and update tests/docs".
  Plan: |-
    1. Audit the current implementation and tests around affected CLI modules and any developer docs that still describe the old split to isolate the exact behavior gap for R1.5.
    2. Implement the smallest change set that satisfies the REFACTOR contract: old duplicated matcher paths are removed and the safety-net tests still pass unchanged.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering affected CLI modules and any developer docs that still describe the old split. Expected: the behavior described by R1.5 is observable and stable.
    2. Inspect the final diff for 202603301856-7SPP8K. Expected: scope stays limited to affected CLI modules and any developer docs that still describe the old split plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: old duplicated matcher paths are removed and the safety-net tests still pass unchanged.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T09:10:07.902Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused vitest slice passed for help/docs contract cleanup; eslint passed on touched TS files; generated CLI reference and top-level help snapshot refreshed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T09:02:10.944Z, excerpt_hash=sha256:4fa33ec9442bca313f2f444521e296f0313f7c3e402e347030a0c1ecf89ba236
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Delete obsolete routing helpers and update tests/docs

Implement Epic 1 / R1.5 from REFACTOR.md. old duplicated matcher paths are removed and the safety-net tests still pass unchanged.

## Scope

- In scope: Implement Epic 1 / R1.5 from REFACTOR.md. old duplicated matcher paths are removed and the safety-net tests still pass unchanged.
- Out of scope: unrelated refactors not required for "Delete obsolete routing helpers and update tests/docs".

## Plan

1. Audit the current implementation and tests around affected CLI modules and any developer docs that still describe the old split to isolate the exact behavior gap for R1.5.
2. Implement the smallest change set that satisfies the REFACTOR contract: old duplicated matcher paths are removed and the safety-net tests still pass unchanged.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering affected CLI modules and any developer docs that still describe the old split. Expected: the behavior described by R1.5 is observable and stable.
2. Inspect the final diff for 202603301856-7SPP8K. Expected: scope stays limited to affected CLI modules and any developer docs that still describe the old split plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: old duplicated matcher paths are removed and the safety-net tests still pass unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T09:10:07.902Z — VERIFY — ok

By: CODER

Note: Focused vitest slice passed for help/docs contract cleanup; eslint passed on touched TS files; generated CLI reference and top-level help snapshot refreshed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T09:02:10.944Z, excerpt_hash=sha256:4fa33ec9442bca313f2f444521e296f0313f7c3e402e347030a0c1ecf89ba236

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
