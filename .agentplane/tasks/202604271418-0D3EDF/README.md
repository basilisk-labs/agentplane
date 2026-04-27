---
id: "202604271418-0D3EDF"
title: "Preserve branch_pr merge history by default"
result_summary: "Merged via PR #539."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T14:18:22.842Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-27T14:28:57.713Z"
  updated_by: "CODER"
  note: "Default branch_pr integrate now preserves branch history with merge commits; squash remains explicit opt-in."
commit:
  hash: "0e0bcbdabf3f79be6a7603013640bffba55db480"
  message: "Merge pull request #539 from basilisk-labs/task/202604271418-0D3EDF/preserve-merge-history"
comments:
  -
    author: "CODER"
    body: "Start: change branch_pr merge defaults and guidance so task branch history is preserved by default, while squash remains an explicit opt-in strategy."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #539 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-27T14:18:58.710Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: change branch_pr merge defaults and guidance so task branch history is preserved by default, while squash remains an explicit opt-in strategy."
  -
    type: "verify"
    at: "2026-04-27T14:28:57.713Z"
    author: "CODER"
    state: "ok"
    note: "Default branch_pr integrate now preserves branch history with merge commits; squash remains explicit opt-in."
  -
    type: "status"
    at: "2026-04-27T14:34:02.519Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #539 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-27T14:34:02.523Z"
doc_updated_by: "INTEGRATOR"
description: "Change branch_pr integrate policy, CLI defaults, and prompt/help text so merge commits preserve task branch history by default, while squash remains an explicit opt-in strategy. Update tests and docs/policy references accordingly."
sections:
  Summary: |-
    Preserve branch_pr merge history by default
    
    Change branch_pr integrate policy, CLI defaults, and prompt/help text so merge commits preserve task branch history by default, while squash remains an explicit opt-in strategy. Update tests and docs/policy references accordingly.
  Scope: |-
    - In scope: Change branch_pr integrate policy, CLI defaults, and prompt/help text so merge commits preserve task branch history by default, while squash remains an explicit opt-in strategy. Update tests and docs/policy references accordingly.
    - Out of scope: unrelated refactors not required for "Preserve branch_pr merge history by default".
  Plan: "1. Locate current merge-strategy defaults and prompt/policy references that make squash the branch_pr default. 2. Change the branch_pr default to preserve branch history with a merge commit while keeping --merge-strategy squash as explicit opt-in. 3. Update command help, policy modules, generated prompt/source text, and docs references so they describe preserve-history as default and squash as compact-history opt-in. 4. Add or update focused tests covering default strategy selection and rendered guidance. 5. Verify with targeted tests, typecheck, policy routing, and relevant docs/help checks."
  Verify Steps: |-
    1. Run focused integrate/PR-flow tests covering merge strategy defaults. Expected: default branch_pr integrate uses merge-preserving strategy and explicit squash remains supported.
    2. Run tests or snapshots covering command help/policy prompt text touched by this task. Expected: guidance no longer recommends squash as the default branch_pr route.
    3. Run `bun run typecheck`. Expected: it succeeds.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
    5. Run Prettier/ESLint on touched source and policy/doc files. Expected: both succeed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-27T14:28:57.713Z — VERIFY — ok
    
    By: CODER
    
    Note: Default branch_pr integrate now preserves branch history with merge commits; squash remains explicit opt-in.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T14:18:58.717Z, excerpt_hash=sha256:0ab8df6ce74f0cca722a24ed2ac8c1ea2faacd477b85751dac52e884b2688625
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "No task-local findings."
id_source: "generated"
---
## Summary

Preserve branch_pr merge history by default

Change branch_pr integrate policy, CLI defaults, and prompt/help text so merge commits preserve task branch history by default, while squash remains an explicit opt-in strategy. Update tests and docs/policy references accordingly.

## Scope

- In scope: Change branch_pr integrate policy, CLI defaults, and prompt/help text so merge commits preserve task branch history by default, while squash remains an explicit opt-in strategy. Update tests and docs/policy references accordingly.
- Out of scope: unrelated refactors not required for "Preserve branch_pr merge history by default".

## Plan

1. Locate current merge-strategy defaults and prompt/policy references that make squash the branch_pr default. 2. Change the branch_pr default to preserve branch history with a merge commit while keeping --merge-strategy squash as explicit opt-in. 3. Update command help, policy modules, generated prompt/source text, and docs references so they describe preserve-history as default and squash as compact-history opt-in. 4. Add or update focused tests covering default strategy selection and rendered guidance. 5. Verify with targeted tests, typecheck, policy routing, and relevant docs/help checks.

## Verify Steps

1. Run focused integrate/PR-flow tests covering merge strategy defaults. Expected: default branch_pr integrate uses merge-preserving strategy and explicit squash remains supported.
2. Run tests or snapshots covering command help/policy prompt text touched by this task. Expected: guidance no longer recommends squash as the default branch_pr route.
3. Run `bun run typecheck`. Expected: it succeeds.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
5. Run Prettier/ESLint on touched source and policy/doc files. Expected: both succeed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-27T14:28:57.713Z — VERIFY — ok

By: CODER

Note: Default branch_pr integrate now preserves branch history with merge commits; squash remains explicit opt-in.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T14:18:58.717Z, excerpt_hash=sha256:0ab8df6ce74f0cca722a24ed2ac8c1ea2faacd477b85751dac52e884b2688625

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

No task-local findings.
