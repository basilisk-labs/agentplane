---
id: "202604131403-GZ659S"
title: "Skip Core CI for task-artifact-only hosted closure PRs"
result_summary: "Merged via PR #277."
status: "DONE"
priority: "high"
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
  updated_at: "2026-04-13T14:04:39.132Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-13T14:09:38.880Z"
  updated_by: "CODER"
  note: |-
    Command: sed -n '1,120p' .github/path-filters.yml && git diff -- .github/path-filters.yml packages/agentplane/src/commands/release/ci-workflow-contract.test.ts | Result: pass | Evidence: core filter still includes .agentplane/** but now excludes .agentplane/tasks/** only; diff stays limited to the path filter and its contract test. | Scope: verifies artifact-only hosted close PRs fall out of heavy Core CI without broadening the exclusion.
    Command: bunx vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/cli/check-github-protection-contract-script.test.ts | Result: pass | Evidence: 2 test files passed, 6 tests passed. | Scope: verifies CI/release contract coverage and GitHub protection expectations still hold.
    Command: bunx eslint packages/agentplane/src/commands/release/ci-workflow-contract.test.ts | Result: pass | Evidence: exited clean with no findings. | Scope: verifies the touched TypeScript contract test stays lint-clean.
    Command: git worktree list --porcelain && git branch -r --list 'origin/task/202604131329-KHYHBT*' 'origin/task-close/202604131329-KHYHBT*' | Result: pass | Evidence: obsolete KHYHBT task worktree removed locally and no matching remote hosted-close branches remain. | Scope: verifies the stale release-hardening cleanup tail for the already-merged hosted-close task.
commit:
  hash: "0d853ff39b9044e5bed68ba1d9fe8011c9df6a4c"
  message: "release: Skip Core CI for task-artifact-only hosted closure PRs (GZ659S) (#277)"
comments:
  -
    author: "CODER"
    body: "Start: narrow Core CI so task-artifact-only hosted closure PRs do not pay the full test and test-windows cost, then clean the obsolete local release-hardening branches/worktrees left behind by the hosted-close rollout."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #277 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-13T14:06:52.975Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: narrow Core CI so task-artifact-only hosted closure PRs do not pay the full test and test-windows cost, then clean the obsolete local release-hardening branches/worktrees left behind by the hosted-close rollout."
  -
    type: "verify"
    at: "2026-04-13T14:09:38.880Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: sed -n '1,120p' .github/path-filters.yml && git diff -- .github/path-filters.yml packages/agentplane/src/commands/release/ci-workflow-contract.test.ts | Result: pass | Evidence: core filter still includes .agentplane/** but now excludes .agentplane/tasks/** only; diff stays limited to the path filter and its contract test. | Scope: verifies artifact-only hosted close PRs fall out of heavy Core CI without broadening the exclusion.
      Command: bunx vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/cli/check-github-protection-contract-script.test.ts | Result: pass | Evidence: 2 test files passed, 6 tests passed. | Scope: verifies CI/release contract coverage and GitHub protection expectations still hold.
      Command: bunx eslint packages/agentplane/src/commands/release/ci-workflow-contract.test.ts | Result: pass | Evidence: exited clean with no findings. | Scope: verifies the touched TypeScript contract test stays lint-clean.
      Command: git worktree list --porcelain && git branch -r --list 'origin/task/202604131329-KHYHBT*' 'origin/task-close/202604131329-KHYHBT*' | Result: pass | Evidence: obsolete KHYHBT task worktree removed locally and no matching remote hosted-close branches remain. | Scope: verifies the stale release-hardening cleanup tail for the already-merged hosted-close task.
  -
    type: "status"
    at: "2026-04-13T14:27:00.640Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #277 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-13T14:27:00.645Z"
doc_updated_by: "INTEGRATOR"
description: "Closure PRs produced by hosted branch_pr closeout currently touch only tracked task artifacts, but Core CI still classifies .agentplane task changes as core and reruns the full test/test-windows gate. Exclude task-artifact-only close PRs from heavy Core CI while keeping protection contracts intact, then reconcile the local release-hardening worktrees/branches that are now obsolete after the hosted-close fix landed."
sections:
  Summary: |-
    Skip Core CI for task-artifact-only hosted closure PRs
    
    Closure PRs produced by hosted branch_pr closeout currently touch only tracked task artifacts, but Core CI still classifies .agentplane task changes as core and reruns the full test/test-windows gate. Exclude task-artifact-only close PRs from heavy Core CI while keeping protection contracts intact, then reconcile the local release-hardening worktrees/branches that are now obsolete after the hosted-close fix landed.
  Scope: |-
    - In scope: Closure PRs produced by hosted branch_pr closeout currently touch only tracked task artifacts, but Core CI still classifies .agentplane task changes as core and reruns the full test/test-windows gate. Exclude task-artifact-only close PRs from heavy Core CI while keeping protection contracts intact, then reconcile the local release-hardening worktrees/branches that are now obsolete after the hosted-close fix landed.
    - Out of scope: unrelated refactors not required for "Skip Core CI for task-artifact-only hosted closure PRs".
  Plan: |-
    1. Implement the change for "Skip Core CI for task-artifact-only hosted closure PRs".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Simulate or inspect a change set limited to `.agentplane/tasks/**` and the hosted close PR body contract. Expected: Core CI no longer treats that diff as a core change, so the heavy `test` and `test-windows` jobs are not required for artifact-only closure PRs.
    2. Run the focused workflow/path-filter regression checks for the touched CI contract files. Expected: they pass and still assert the required protection contract.
    3. Inspect local and remote release-hardening leftovers after the fix lands. Expected: obsolete KHYHBT task branches/worktrees are removed, and no open hosted-close PR tail remains.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-13T14:09:38.880Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: sed -n '1,120p' .github/path-filters.yml && git diff -- .github/path-filters.yml packages/agentplane/src/commands/release/ci-workflow-contract.test.ts | Result: pass | Evidence: core filter still includes .agentplane/** but now excludes .agentplane/tasks/** only; diff stays limited to the path filter and its contract test. | Scope: verifies artifact-only hosted close PRs fall out of heavy Core CI without broadening the exclusion.\nCommand: bunx vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/cli/check-github-protection-contract-script.test.ts | Result: pass | Evidence: 2 test files passed, 6 tests passed. | Scope: verifies CI/release contract coverage and GitHub protection expectations still hold.\nCommand: bunx eslint packages/agentplane/src/commands/release/ci-workflow-contract.test.ts | Result: pass | Evidence: exited clean with no findings. | Scope: verifies the touched TypeScript contract test stays lint-clean.\nCommand: git worktree list --porcelain && git branch -r --list 'origin/task/202604131329-KHYHBT*' 'origin/task-close/202604131329-KHYHBT*' | Result: pass | Evidence: obsolete KHYHBT task worktree removed locally and no matching remote hosted-close branches remain. | Scope: verifies the stale release-hardening cleanup tail for the already-merged hosted-close task.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T14:06:52.985Z, excerpt_hash=sha256:cbdb756adea18d3d2cd22faeffa56a7a242396dc3b1b04f597a17ea8d17c682a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Skip Core CI for task-artifact-only hosted closure PRs

Closure PRs produced by hosted branch_pr closeout currently touch only tracked task artifacts, but Core CI still classifies .agentplane task changes as core and reruns the full test/test-windows gate. Exclude task-artifact-only close PRs from heavy Core CI while keeping protection contracts intact, then reconcile the local release-hardening worktrees/branches that are now obsolete after the hosted-close fix landed.

## Scope

- In scope: Closure PRs produced by hosted branch_pr closeout currently touch only tracked task artifacts, but Core CI still classifies .agentplane task changes as core and reruns the full test/test-windows gate. Exclude task-artifact-only close PRs from heavy Core CI while keeping protection contracts intact, then reconcile the local release-hardening worktrees/branches that are now obsolete after the hosted-close fix landed.
- Out of scope: unrelated refactors not required for "Skip Core CI for task-artifact-only hosted closure PRs".

## Plan

1. Implement the change for "Skip Core CI for task-artifact-only hosted closure PRs".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Simulate or inspect a change set limited to `.agentplane/tasks/**` and the hosted close PR body contract. Expected: Core CI no longer treats that diff as a core change, so the heavy `test` and `test-windows` jobs are not required for artifact-only closure PRs.
2. Run the focused workflow/path-filter regression checks for the touched CI contract files. Expected: they pass and still assert the required protection contract.
3. Inspect local and remote release-hardening leftovers after the fix lands. Expected: obsolete KHYHBT task branches/worktrees are removed, and no open hosted-close PR tail remains.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-13T14:09:38.880Z — VERIFY — ok

By: CODER

Note: Command: sed -n '1,120p' .github/path-filters.yml && git diff -- .github/path-filters.yml packages/agentplane/src/commands/release/ci-workflow-contract.test.ts | Result: pass | Evidence: core filter still includes .agentplane/** but now excludes .agentplane/tasks/** only; diff stays limited to the path filter and its contract test. | Scope: verifies artifact-only hosted close PRs fall out of heavy Core CI without broadening the exclusion.\nCommand: bunx vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/cli/check-github-protection-contract-script.test.ts | Result: pass | Evidence: 2 test files passed, 6 tests passed. | Scope: verifies CI/release contract coverage and GitHub protection expectations still hold.\nCommand: bunx eslint packages/agentplane/src/commands/release/ci-workflow-contract.test.ts | Result: pass | Evidence: exited clean with no findings. | Scope: verifies the touched TypeScript contract test stays lint-clean.\nCommand: git worktree list --porcelain && git branch -r --list 'origin/task/202604131329-KHYHBT*' 'origin/task-close/202604131329-KHYHBT*' | Result: pass | Evidence: obsolete KHYHBT task worktree removed locally and no matching remote hosted-close branches remain. | Scope: verifies the stale release-hardening cleanup tail for the already-merged hosted-close task.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T14:06:52.985Z, excerpt_hash=sha256:cbdb756adea18d3d2cd22faeffa56a7a242396dc3b1b04f597a17ea8d17c682a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
