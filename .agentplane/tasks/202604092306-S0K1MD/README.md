---
id: "202604092306-S0K1MD"
title: "Allow finish to warn-and-run under stale-dist for task artifact closeout"
result_summary: "Merged via PR #240."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T23:07:18.696Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T23:17:51.232Z"
  updated_by: "CODER"
  note: "Verified current HEAD after formatting commit: stale-dist policy now allows finish as task-artifact closeout; stale-dist policy and readonly tests plus eslint passed."
commit:
  hash: "94a5167f2e07471a566a0f65cda3cf9ea29668e0"
  message: "workflow: Allow finish to warn-and-run under stale-dist for task artifact closeout (S0K1MD) (#240)"
comments:
  -
    author: "CODER"
    body: "Start: treat finish as a task-artifact mutation in the stale-dist policy so base-side closeout no longer requires a manual bootstrap after merged code changes."
  -
    author: "INTEGRATOR"
    body: "Verified: merged via PR #240 after hosted checks passed; closeout metadata reconciled on base."
events:
  -
    type: "status"
    at: "2026-04-09T23:07:43.377Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: treat finish as a task-artifact mutation in the stale-dist policy so base-side closeout no longer requires a manual bootstrap after merged code changes."
  -
    type: "verify"
    at: "2026-04-09T23:16:32.334Z"
    author: "CODER"
    state: "ok"
    note: "Verified: stale-dist policy now allows finish as task-artifact closeout; stale-dist policy and readonly tests plus eslint passed."
  -
    type: "verify"
    at: "2026-04-09T23:17:02.384Z"
    author: "CODER"
    state: "ok"
    note: "Verified current HEAD after task commit: stale-dist policy now allows finish as task-artifact closeout; stale-dist policy and readonly tests plus eslint passed."
  -
    type: "verify"
    at: "2026-04-09T23:17:51.232Z"
    author: "CODER"
    state: "ok"
    note: "Verified current HEAD after formatting commit: stale-dist policy now allows finish as task-artifact closeout; stale-dist policy and readonly tests plus eslint passed."
  -
    type: "status"
    at: "2026-04-09T23:33:23.277Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: merged via PR #240 after hosted checks passed; closeout metadata reconciled on base."
doc_version: 3
doc_updated_at: "2026-04-09T23:33:23.277Z"
doc_updated_by: "INTEGRATOR"
description: "Treat finish as a task-artifact mutation in the stale-dist policy so base-side closeout can proceed after merged code changes without a mandatory manual framework bootstrap."
sections:
  Summary: |-
    Allow finish to warn-and-run under stale-dist for task artifact closeout
    
    Treat finish as a task-artifact mutation in the stale-dist policy so base-side closeout can proceed after merged code changes without a mandatory manual framework bootstrap.
  Scope: |-
    - In scope: Treat finish as a task-artifact mutation in the stale-dist policy so base-side closeout can proceed after merged code changes without a mandatory manual framework bootstrap.
    - Out of scope: unrelated refactors not required for "Allow finish to warn-and-run under stale-dist for task artifact closeout".
  Plan: |-
    1. Implement the change for "Allow finish to warn-and-run under stale-dist for task artifact closeout".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. In a framework checkout with stale dist caused by source changes, run agentplane finish for a task-artifact closeout path. Expected: the command warns and runs instead of hard-failing on stale dist.
    2. Run a command that still belongs to strict stale-dist mode under the same stale checkout. Expected: the command still refuses to run.
    3. Re-run finish after the policy change in tests. Expected: finish behavior is covered by a regression test and does not require a manual bootstrap.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T23:16:32.334Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: stale-dist policy now allows finish as task-artifact closeout; stale-dist policy and readonly tests plus eslint passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:07:43.384Z, excerpt_hash=sha256:88443e2dbe18823e58d0351fcbcd96e060435129faad6d9a0fa593c56c334cbd
    
    ### 2026-04-09T23:17:02.384Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified current HEAD after task commit: stale-dist policy now allows finish as task-artifact closeout; stale-dist policy and readonly tests plus eslint passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:16:32.335Z, excerpt_hash=sha256:88443e2dbe18823e58d0351fcbcd96e060435129faad6d9a0fa593c56c334cbd
    
    ### 2026-04-09T23:17:51.232Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified current HEAD after formatting commit: stale-dist policy now allows finish as task-artifact closeout; stale-dist policy and readonly tests plus eslint passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:17:02.387Z, excerpt_hash=sha256:88443e2dbe18823e58d0351fcbcd96e060435129faad6d9a0fa593c56c334cbd
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Allow finish to warn-and-run under stale-dist for task artifact closeout

Treat finish as a task-artifact mutation in the stale-dist policy so base-side closeout can proceed after merged code changes without a mandatory manual framework bootstrap.

## Scope

- In scope: Treat finish as a task-artifact mutation in the stale-dist policy so base-side closeout can proceed after merged code changes without a mandatory manual framework bootstrap.
- Out of scope: unrelated refactors not required for "Allow finish to warn-and-run under stale-dist for task artifact closeout".

## Plan

1. Implement the change for "Allow finish to warn-and-run under stale-dist for task artifact closeout".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. In a framework checkout with stale dist caused by source changes, run agentplane finish for a task-artifact closeout path. Expected: the command warns and runs instead of hard-failing on stale dist.
2. Run a command that still belongs to strict stale-dist mode under the same stale checkout. Expected: the command still refuses to run.
3. Re-run finish after the policy change in tests. Expected: finish behavior is covered by a regression test and does not require a manual bootstrap.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T23:16:32.334Z — VERIFY — ok

By: CODER

Note: Verified: stale-dist policy now allows finish as task-artifact closeout; stale-dist policy and readonly tests plus eslint passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:07:43.384Z, excerpt_hash=sha256:88443e2dbe18823e58d0351fcbcd96e060435129faad6d9a0fa593c56c334cbd

### 2026-04-09T23:17:02.384Z — VERIFY — ok

By: CODER

Note: Verified current HEAD after task commit: stale-dist policy now allows finish as task-artifact closeout; stale-dist policy and readonly tests plus eslint passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:16:32.335Z, excerpt_hash=sha256:88443e2dbe18823e58d0351fcbcd96e060435129faad6d9a0fa593c56c334cbd

### 2026-04-09T23:17:51.232Z — VERIFY — ok

By: CODER

Note: Verified current HEAD after formatting commit: stale-dist policy now allows finish as task-artifact closeout; stale-dist policy and readonly tests plus eslint passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:17:02.387Z, excerpt_hash=sha256:88443e2dbe18823e58d0351fcbcd96e060435129faad6d9a0fa593c56c334cbd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
