---
id: "202604092339-NFXA6G"
title: "Allow deterministic finish close commits under stale-dist task-artifact policy"
result_summary: "integrate: squash task/202604092339-NFXA6G/stale-dist-close-commit"
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
  updated_at: "2026-04-09T23:39:59.083Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T23:52:31.332Z"
  updated_by: "CODER"
  note: "Verified: targeted guard unit tests and eslint passed for deterministic stale-dist close commit behavior."
commit:
  hash: "8b3e7bb7edf348d07fdafb0249d60886bbb67cd5"
  message: "🧩 NFXA6G integrate: workflow: Allow deterministic finish close commits under stale-dist task-artifa..."
comments:
  -
    author: "CODER"
    body: "Start: make deterministic close commits complete under the same stale-dist allowance already granted to finish task-artifact closeout."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604092339-NFXA6G/pr."
events:
  -
    type: "status"
    at: "2026-04-09T23:39:59.551Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make deterministic close commits complete under the same stale-dist allowance already granted to finish task-artifact closeout."
  -
    type: "verify"
    at: "2026-04-09T23:52:31.332Z"
    author: "CODER"
    state: "ok"
    note: "Verified: targeted guard unit tests and eslint passed for deterministic stale-dist close commit behavior."
  -
    type: "status"
    at: "2026-04-10T00:11:49.369Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604092339-NFXA6G/pr."
doc_version: 3
doc_updated_at: "2026-04-10T00:11:49.371Z"
doc_updated_by: "INTEGRATOR"
description: "When finish --close-commit is already allowed under stale-dist for task-artifact closeout, the internal deterministic git commit must not re-fail on the stale-dist hook for the same task-only payload."
sections:
  Summary: |-
    Allow deterministic finish close commits under stale-dist task-artifact policy
    
    When finish --close-commit is already allowed under stale-dist for task-artifact closeout, the internal deterministic git commit must not re-fail on the stale-dist hook for the same task-only payload.
  Scope: |-
    - In scope: When finish --close-commit is already allowed under stale-dist for task-artifact closeout, the internal deterministic git commit must not re-fail on the stale-dist hook for the same task-only payload.
    - Out of scope: unrelated refactors not required for "Allow deterministic finish close commits under stale-dist task-artifact policy".
  Plan: "1. Reproduce finish --close-commit after stale-dist-allowed finish on base and isolate why the inner git commit still trips stale-dist enforcement. 2. Adjust the close-commit path or hook contract so task-artifact-only deterministic close commits can complete under the same stale-dist allowance. 3. Add regression coverage for the failing closeout path and verify with targeted tests."
  Verify Steps: |-
    1. In a framework checkout with stale dist caused by watched runtime source edits, run finish --close-commit for a task-artifact-only base closeout. Expected: the deterministic close commit completes instead of failing inside the hook.
    2. Run a normal code commit under the same stale checkout. Expected: strict stale-dist enforcement still blocks the unrelated code commit path.
    3. Run the targeted automated regression tests. Expected: the closeout path stays green and the strict path still fails where required.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T23:52:31.332Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: targeted guard unit tests and eslint passed for deterministic stale-dist close commit behavior.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:39:59.557Z, excerpt_hash=sha256:0f1d0b21956e353c7a133df30f0ff64b213125c84631870096874825c4bda633
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Allow deterministic finish close commits under stale-dist task-artifact policy

When finish --close-commit is already allowed under stale-dist for task-artifact closeout, the internal deterministic git commit must not re-fail on the stale-dist hook for the same task-only payload.

## Scope

- In scope: When finish --close-commit is already allowed under stale-dist for task-artifact closeout, the internal deterministic git commit must not re-fail on the stale-dist hook for the same task-only payload.
- Out of scope: unrelated refactors not required for "Allow deterministic finish close commits under stale-dist task-artifact policy".

## Plan

1. Reproduce finish --close-commit after stale-dist-allowed finish on base and isolate why the inner git commit still trips stale-dist enforcement. 2. Adjust the close-commit path or hook contract so task-artifact-only deterministic close commits can complete under the same stale-dist allowance. 3. Add regression coverage for the failing closeout path and verify with targeted tests.

## Verify Steps

1. In a framework checkout with stale dist caused by watched runtime source edits, run finish --close-commit for a task-artifact-only base closeout. Expected: the deterministic close commit completes instead of failing inside the hook.
2. Run a normal code commit under the same stale checkout. Expected: strict stale-dist enforcement still blocks the unrelated code commit path.
3. Run the targeted automated regression tests. Expected: the closeout path stays green and the strict path still fails where required.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T23:52:31.332Z — VERIFY — ok

By: CODER

Note: Verified: targeted guard unit tests and eslint passed for deterministic stale-dist close commit behavior.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:39:59.557Z, excerpt_hash=sha256:0f1d0b21956e353c7a133df30f0ff64b213125c84631870096874825c4bda633

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
