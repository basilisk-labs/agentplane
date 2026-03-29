---
id: "202603280331-Z3NTCT"
title: "Close superseded init setup-profile PR #6 after preset-model rewrite"
result_summary: "Closed stale init preset PR #6 as superseded."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
  - "github"
  - "cleanup"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-28T03:32:10.799Z"
  updated_by: "CODER"
  note: "Verified: gh pr view 6 confirms the stale init preset PR is now closed unmerged, and gh pr list shows only the still-live historical proposals #3, #4, #5, and #7 remaining open. Result: pass. Evidence: current main already carries a newer setup-profile contract, so closing #6 removed only an obsolete implementation branch."
commit:
  hash: "f8b3e66b0f8555b88ba0f38750cc881c6bf946ea"
  message: "✅ R98CCP close: Merged into main via PR #29. (202603271853-R98CCP) [code,runner,workflow]"
comments:
  -
    author: "CODER"
    body: "Start: prove that the old init preset PR is stale against the current setup-profile contract on main, then close only that hosted PR with an explicit superseded note while leaving still-live historical proposals untouched."
  -
    author: "CODER"
    body: "Verified: PR #6 was closed as stale after confirming that main already carries the newer init setup-profile contract."
events:
  -
    type: "status"
    at: "2026-03-28T03:31:30.745Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prove that the old init preset PR is stale against the current setup-profile contract on main, then close only that hosted PR with an explicit superseded note while leaving still-live historical proposals untouched."
  -
    type: "verify"
    at: "2026-03-28T03:32:10.799Z"
    author: "CODER"
    state: "ok"
    note: "Verified: gh pr view 6 confirms the stale init preset PR is now closed unmerged, and gh pr list shows only the still-live historical proposals #3, #4, #5, and #7 remaining open. Result: pass. Evidence: current main already carries a newer setup-profile contract, so closing #6 removed only an obsolete implementation branch."
  -
    type: "status"
    at: "2026-03-28T03:33:01.502Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #6 was closed as stale after confirming that main already carries the newer init setup-profile contract."
doc_version: 3
doc_updated_at: "2026-03-28T03:33:01.503Z"
doc_updated_by: "CODER"
description: "Close the stale hosted PR for the old setup-profile preset model now that init evolved past prod/dev-safe semantics and the supported setup-profile surface on main already covers the capability through a different preset contract."
sections:
  Summary: |-
    Close superseded init setup-profile PR #6 after preset-model rewrite
    
    Close the stale hosted PR for the old setup-profile preset model now that init evolved past prod/dev-safe semantics and the supported setup-profile surface on main already covers the capability through a different preset contract.
  Scope: |-
    - In scope: Close the stale hosted PR for the old setup-profile preset model now that init evolved past prod/dev-safe semantics and the supported setup-profile surface on main already covers the capability through a different preset contract.
    - Out of scope: unrelated refactors not required for "Close superseded init setup-profile PR #6 after preset-model rewrite".
  Plan: |-
    1. Compare PR #6 against current init/setup-profile surface on main and confirm that its prod/dev-safe preset model is obsolete because main now ships a different expanded preset contract.
    2. Close PR #6 on GitHub with an explicit superseded note pointing to the newer init preset model, without touching unrelated historical PRs.
    3. Verify that PR #6 is closed and that the remaining open historical PRs are only the still-live proposals #3, #4, #5, and #7.
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-28T03:32:10.799Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: gh pr view 6 confirms the stale init preset PR is now closed unmerged, and gh pr list shows only the still-live historical proposals #3, #4, #5, and #7 remaining open. Result: pass. Evidence: current main already carries a newer setup-profile contract, so closing #6 removed only an obsolete implementation branch.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-28T03:31:30.746Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Close superseded init setup-profile PR #6 after preset-model rewrite

Close the stale hosted PR for the old setup-profile preset model now that init evolved past prod/dev-safe semantics and the supported setup-profile surface on main already covers the capability through a different preset contract.

## Scope

- In scope: Close the stale hosted PR for the old setup-profile preset model now that init evolved past prod/dev-safe semantics and the supported setup-profile surface on main already covers the capability through a different preset contract.
- Out of scope: unrelated refactors not required for "Close superseded init setup-profile PR #6 after preset-model rewrite".

## Plan

1. Compare PR #6 against current init/setup-profile surface on main and confirm that its prod/dev-safe preset model is obsolete because main now ships a different expanded preset contract.
2. Close PR #6 on GitHub with an explicit superseded note pointing to the newer init preset model, without touching unrelated historical PRs.
3. Verify that PR #6 is closed and that the remaining open historical PRs are only the still-live proposals #3, #4, #5, and #7.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-28T03:32:10.799Z — VERIFY — ok

By: CODER

Note: Verified: gh pr view 6 confirms the stale init preset PR is now closed unmerged, and gh pr list shows only the still-live historical proposals #3, #4, #5, and #7 remaining open. Result: pass. Evidence: current main already carries a newer setup-profile contract, so closing #6 removed only an obsolete implementation branch.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-28T03:31:30.746Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
