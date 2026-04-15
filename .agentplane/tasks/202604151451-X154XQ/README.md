---
id: "202604151451-X154XQ"
title: "Fix publish workflow exact-sha identity for release recovery"
result_summary: "Merged via PR #309."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-15T14:52:45.065Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T14:54:29.059Z"
  updated_by: "CODER"
  note: "Verified: publish workflow_dispatch now keeps an explicit input sha when resolving release-ready source; publish-workflow-contract.test.ts passes locally."
commit:
  hash: "5c4dd82cba16fa3872a6b1aef82d4c0b7e82e9ee"
  message: "🚧 X154XQ task: fix publish workflow exact-sha identity (#309)"
comments:
  -
    author: "CODER"
    body: "Start: fix publish workflow_dispatch exact-SHA identity, then rerun publish recovery for d95b2762f78815b60407a62f2227136c85cae5ee."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #309 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-15T14:52:53.099Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix publish workflow_dispatch exact-SHA identity, then rerun publish recovery for d95b2762f78815b60407a62f2227136c85cae5ee."
  -
    type: "verify"
    at: "2026-04-15T14:54:29.059Z"
    author: "CODER"
    state: "ok"
    note: "Verified: publish workflow_dispatch now keeps an explicit input sha when resolving release-ready source; publish-workflow-contract.test.ts passes locally."
  -
    type: "status"
    at: "2026-04-15T14:59:43.293Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #309 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-15T14:59:43.299Z"
doc_updated_by: "INTEGRATOR"
description: "Keep workflow_dispatch publish recovery bound to the requested exact SHA instead of mutable main HEAD, then verify by publishing v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee."
sections:
  Summary: |-
    Fix publish workflow exact-sha identity for release recovery
    
    Keep workflow_dispatch publish recovery bound to the requested exact SHA instead of mutable main HEAD, then verify by publishing v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.
  Scope: |-
    - In scope: Keep workflow_dispatch publish recovery bound to the requested exact SHA instead of mutable main HEAD, then verify by publishing v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.
    - Out of scope: unrelated refactors not required for "Fix publish workflow exact-sha identity for release recovery".
  Plan: |-
    1. Fix publish workflow_dispatch exact-SHA identity in publish.yml and extend the publish workflow contract test.
    2. Land the fix through the protected-main PR + hosted-close path.
    3. Re-run publish recovery for d95b2762f78815b60407a62f2227136c85cae5ee and verify tag/npm state for 0.3.11.
  Verify Steps: |-
    1. Review the requested outcome for "Fix publish workflow exact-sha identity for release recovery". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T14:54:29.059Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: publish workflow_dispatch now keeps an explicit input sha when resolving release-ready source; publish-workflow-contract.test.ts passes locally.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T14:52:53.110Z, excerpt_hash=sha256:73c723f49eee6c69729789d1c09a95d001c67668eb0b8bf31989b3ba320a481d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix publish workflow exact-sha identity for release recovery

Keep workflow_dispatch publish recovery bound to the requested exact SHA instead of mutable main HEAD, then verify by publishing v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.

## Scope

- In scope: Keep workflow_dispatch publish recovery bound to the requested exact SHA instead of mutable main HEAD, then verify by publishing v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.
- Out of scope: unrelated refactors not required for "Fix publish workflow exact-sha identity for release recovery".

## Plan

1. Fix publish workflow_dispatch exact-SHA identity in publish.yml and extend the publish workflow contract test.
2. Land the fix through the protected-main PR + hosted-close path.
3. Re-run publish recovery for d95b2762f78815b60407a62f2227136c85cae5ee and verify tag/npm state for 0.3.11.

## Verify Steps

1. Review the requested outcome for "Fix publish workflow exact-sha identity for release recovery". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T14:54:29.059Z — VERIFY — ok

By: CODER

Note: Verified: publish workflow_dispatch now keeps an explicit input sha when resolving release-ready source; publish-workflow-contract.test.ts passes locally.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T14:52:53.110Z, excerpt_hash=sha256:73c723f49eee6c69729789d1c09a95d001c67668eb0b8bf31989b3ba320a481d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
