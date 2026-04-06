---
id: "202604061916-0KMS28"
title: "Reconcile stale open PR #65 against current main state"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T19:16:50.939Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T19:22:07.912Z"
  updated_by: "CODER"
  note: "Command: npm pack --json --silent ./packages/agentplane; Result: pass; Evidence: packed agentplane@0.3.10 successfully with no workspace dependency leak. Scope: confirms current main already ships the fixed release manifest. Command: gh api repos/basilisk-labs/agentplane/pulls/65 --jq '.state + \" \" + .head.ref' and git fetch --prune origin && git branch -r --list 'origin/task/202604021603-CK5W52/*'; Result: pass; Evidence: PR #65 is closed and the stale remote task branch no longer exists. Scope: confirms legacy PR cleanup landed on GitHub without changing main. Command: git rev-list --left-right --count origin/main...origin/task/202604021603-CK5W52/fix-npm-install-release and git status --short --untracked-files=no && git rev-list --left-right --count origin/main...main; Result: pass; Evidence: stale branch diverged 69/7 from main while local main remained 0/0 and clean. Scope: confirms cleanup was required and current base checkout stayed synced."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-06T19:22:07.912Z"
    author: "CODER"
    state: "ok"
    note: "Command: npm pack --json --silent ./packages/agentplane; Result: pass; Evidence: packed agentplane@0.3.10 successfully with no workspace dependency leak. Scope: confirms current main already ships the fixed release manifest. Command: gh api repos/basilisk-labs/agentplane/pulls/65 --jq '.state + \" \" + .head.ref' and git fetch --prune origin && git branch -r --list 'origin/task/202604021603-CK5W52/*'; Result: pass; Evidence: PR #65 is closed and the stale remote task branch no longer exists. Scope: confirms legacy PR cleanup landed on GitHub without changing main. Command: git rev-list --left-right --count origin/main...origin/task/202604021603-CK5W52/fix-npm-install-release and git status --short --untracked-files=no && git rev-list --left-right --count origin/main...main; Result: pass; Evidence: stale branch diverged 69/7 from main while local main remained 0/0 and clean. Scope: confirms cleanup was required and current base checkout stayed synced."
doc_version: 3
doc_updated_at: "2026-04-06T19:22:07.918Z"
doc_updated_by: "CODER"
description: "Confirm whether the legacy release PR is already superseded by main, then close the stale GitHub PR and remove its stale remote branch/artifacts without changing shipped behavior."
sections:
  Summary: |-
    Reconcile stale open PR #65 against current main state
    
    Confirm whether the legacy release PR is already superseded by main, then close the stale GitHub PR and remove its stale remote branch/artifacts without changing shipped behavior.
  Scope: |-
    - In scope: Confirm whether the legacy release PR is already superseded by main, then close the stale GitHub PR and remove its stale remote branch/artifacts without changing shipped behavior.
    - Out of scope: unrelated refactors not required for "Reconcile stale open PR #65 against current main state".
  Plan: "1. Prove whether PR #65 is superseded by current main using task state, branch ancestry, and current packaging checks. 2. If superseded, close the PR and remove its stale remote task branch. 3. Record the reconciliation in task artifacts and verify that main/origin/task state stay clean."
  Verify Steps: |-
    1. Check the current shipped release packaging state on `main` (`packages/agentplane/package.json`, release parity guard, and `npm pack`). Expected: current main already ships the post-v0.3.8 packaging fix and packs successfully.
    2. Check task state, branch ancestry, and PR metadata for `CK5W52` / `#65`. Expected: the task is already `DONE`, while the remote PR branch is stale and diverged rather than a missing merge candidate.
    3. Close GitHub PR `#65`, delete its stale remote task branch, and re-check repo/task state. Expected: the PR is closed, the remote branch no longer exists, and local `main` remains clean and synced.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T19:22:07.912Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: npm pack --json --silent ./packages/agentplane; Result: pass; Evidence: packed agentplane@0.3.10 successfully with no workspace dependency leak. Scope: confirms current main already ships the fixed release manifest. Command: gh api repos/basilisk-labs/agentplane/pulls/65 --jq '.state + " " + .head.ref' and git fetch --prune origin && git branch -r --list 'origin/task/202604021603-CK5W52/*'; Result: pass; Evidence: PR #65 is closed and the stale remote task branch no longer exists. Scope: confirms legacy PR cleanup landed on GitHub without changing main. Command: git rev-list --left-right --count origin/main...origin/task/202604021603-CK5W52/fix-npm-install-release and git status --short --untracked-files=no && git rev-list --left-right --count origin/main...main; Result: pass; Evidence: stale branch diverged 69/7 from main while local main remained 0/0 and clean. Scope: confirms cleanup was required and current base checkout stayed synced.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:20:30.112Z, excerpt_hash=sha256:1ec749279fe040019045095c8650080cc23db513de66d8166e7bef6719608660
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Fact: task `202604021603-CK5W52` was already `DONE`, but GitHub PR `#65` and its remote task branch were still open.
    - Fact: the stale PR branch diverged heavily from `main` (`69 7` left-right count), so the correct action was cleanup, not merge.
    - Inference: current workflow diagnostics do not surface `DONE` tasks whose GitHub PRs remain open and stale; this is a separate workflow defect that should be fixed in code.
id_source: "generated"
---
## Summary

Reconcile stale open PR #65 against current main state

Confirm whether the legacy release PR is already superseded by main, then close the stale GitHub PR and remove its stale remote branch/artifacts without changing shipped behavior.

## Scope

- In scope: Confirm whether the legacy release PR is already superseded by main, then close the stale GitHub PR and remove its stale remote branch/artifacts without changing shipped behavior.
- Out of scope: unrelated refactors not required for "Reconcile stale open PR #65 against current main state".

## Plan

1. Prove whether PR #65 is superseded by current main using task state, branch ancestry, and current packaging checks. 2. If superseded, close the PR and remove its stale remote task branch. 3. Record the reconciliation in task artifacts and verify that main/origin/task state stay clean.

## Verify Steps

1. Check the current shipped release packaging state on `main` (`packages/agentplane/package.json`, release parity guard, and `npm pack`). Expected: current main already ships the post-v0.3.8 packaging fix and packs successfully.
2. Check task state, branch ancestry, and PR metadata for `CK5W52` / `#65`. Expected: the task is already `DONE`, while the remote PR branch is stale and diverged rather than a missing merge candidate.
3. Close GitHub PR `#65`, delete its stale remote task branch, and re-check repo/task state. Expected: the PR is closed, the remote branch no longer exists, and local `main` remains clean and synced.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T19:22:07.912Z — VERIFY — ok

By: CODER

Note: Command: npm pack --json --silent ./packages/agentplane; Result: pass; Evidence: packed agentplane@0.3.10 successfully with no workspace dependency leak. Scope: confirms current main already ships the fixed release manifest. Command: gh api repos/basilisk-labs/agentplane/pulls/65 --jq '.state + " " + .head.ref' and git fetch --prune origin && git branch -r --list 'origin/task/202604021603-CK5W52/*'; Result: pass; Evidence: PR #65 is closed and the stale remote task branch no longer exists. Scope: confirms legacy PR cleanup landed on GitHub without changing main. Command: git rev-list --left-right --count origin/main...origin/task/202604021603-CK5W52/fix-npm-install-release and git status --short --untracked-files=no && git rev-list --left-right --count origin/main...main; Result: pass; Evidence: stale branch diverged 69/7 from main while local main remained 0/0 and clean. Scope: confirms cleanup was required and current base checkout stayed synced.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:20:30.112Z, excerpt_hash=sha256:1ec749279fe040019045095c8650080cc23db513de66d8166e7bef6719608660

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Fact: task `202604021603-CK5W52` was already `DONE`, but GitHub PR `#65` and its remote task branch were still open.
- Fact: the stale PR branch diverged heavily from `main` (`69 7` left-right count), so the correct action was cleanup, not merge.
- Inference: current workflow diagnostics do not surface `DONE` tasks whose GitHub PRs remain open and stale; this is a separate workflow defect that should be fixed in code.
