---
id: "202608070235-JPPAMT"
title: "Restore the release lint baseline"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-07T02:35:31.306Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-07T02:38:47.071Z"
  updated_by: "TESTER"
  note: |-
    Release lint baseline restored with a behavior-preserving String.replaceAll migration.

    Command: bunx eslint website/scripts/generate-social-images.mjs
    Result: pass
    Evidence: targeted ESLint completed with exit code 0
    Scope: social image generator lint regression

    Command: bun run lint
    Result: pass
    Evidence: core and website ESLint completed with exit code 0
    Scope: complete repository lint surface

    Command: bun run docs:social:check
    Result: pass
    Evidence: checked 226 documentation social images
    Scope: generated social preview parity

    Command: bun run format:check
    Result: pass
    Evidence: all matched files use Prettier code style
    Scope: repository formatting

    Command: bun run typecheck
    Result: pass
    Evidence: repository TypeScript build completed with exit code 0
    Scope: TypeScript contracts
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: restore the main lint gate with the minimal behavior-preserving social-image normalization change."
events:
  -
    type: "status"
    at: "2026-08-07T02:35:47.688Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: restore the main lint gate with the minimal behavior-preserving social-image normalization change."
  -
    type: "verify"
    at: "2026-08-07T02:38:47.071Z"
    author: "TESTER"
    state: "ok"
    note: |-
      Release lint baseline restored with a behavior-preserving String.replaceAll migration.

      Command: bunx eslint website/scripts/generate-social-images.mjs
      Result: pass
      Evidence: targeted ESLint completed with exit code 0
      Scope: social image generator lint regression

      Command: bun run lint
      Result: pass
      Evidence: core and website ESLint completed with exit code 0
      Scope: complete repository lint surface

      Command: bun run docs:social:check
      Result: pass
      Evidence: checked 226 documentation social images
      Scope: generated social preview parity

      Command: bun run format:check
      Result: pass
      Evidence: all matched files use Prettier code style
      Scope: repository formatting

      Command: bun run typecheck
      Result: pass
      Evidence: repository TypeScript build completed with exit code 0
      Scope: TypeScript contracts
doc_version: 3
doc_updated_at: "2026-08-07T02:38:47.983Z"
doc_updated_by: "CODER"
description: "Replace the obsolete global-regex String.replace call in the social image generator so the current main branch and every 0.7.5 PR pass the repository lint gate."
sections:
  Summary: |-
    Restore the release lint baseline

    Replace the obsolete global-regex String.replace call in the social image generator so the current main branch and every 0.7.5 PR pass the repository lint gate.
  Scope: |-
    - In scope: Replace the obsolete global-regex String.replace call in the social image generator so the current main branch and every 0.7.5 PR pass the repository lint gate.
    - Out of scope: unrelated refactors not required for "Restore the release lint baseline".
  Plan: |-
    1. Confirm the lint failure on current main and identify the minimal behavior-preserving API change.
    2. Replace the global-regex String.replace call with String.replaceAll in the social-image title normalization.
    3. Run targeted website lint, full repository lint, the social-image generator check, formatting, and typecheck.
    4. Publish and merge the focused branch before refreshing dependent 0.7.5 PRs.
  Verify Steps: |-
    1. Run `bunx eslint website/scripts/generate-social-images.mjs`. Expected: the current lint violation is gone.
    2. Run `bun run lint`. Expected: core and website lint both pass.
    3. Run `bun run docs:social:check` and `bun run format:check`. Expected: generated social assets remain current and formatting is unchanged.
    4. Run `bun run typecheck`. Expected: repository TypeScript contracts remain valid.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-07T02:38:47.071Z — VERIFY — ok

    By: TESTER

    Note: Release lint baseline restored with a behavior-preserving String.replaceAll migration.

    Command: bunx eslint website/scripts/generate-social-images.mjs
    Result: pass
    Evidence: targeted ESLint completed with exit code 0
    Scope: social image generator lint regression

    Command: bun run lint
    Result: pass
    Evidence: core and website ESLint completed with exit code 0
    Scope: complete repository lint surface

    Command: bun run docs:social:check
    Result: pass
    Evidence: checked 226 documentation social images
    Scope: generated social preview parity

    Command: bun run format:check
    Result: pass
    Evidence: all matched files use Prettier code style
    Scope: repository formatting

    Command: bun run typecheck
    Result: pass
    Evidence: repository TypeScript build completed with exit code 0
    Scope: TypeScript contracts
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T02:37:41.880Z, excerpt_hash=sha256:7f173c5cc5fd73e72050c28a776005e92d52c750e6b14d54ef63dfbdbe07e11c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608070235-JPPAMT-restore-the-release-lint-baseline/.agentplane/tasks/202608070235-JPPAMT/blueprint/resolved-snapshot.json
    - old_digest: e6918be9c187948088eeee72c070745720938b0e5e20a11ccdb3664f8e226b94
    - current_digest: e6918be9c187948088eeee72c070745720938b0e5e20a11ccdb3664f8e226b94
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608070235-JPPAMT

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "6cfac13ebadf25ac28ce0485e3b86712d147b736"
    version: 1
id_source: "generated"
---
## Summary

Restore the release lint baseline

Replace the obsolete global-regex String.replace call in the social image generator so the current main branch and every 0.7.5 PR pass the repository lint gate.

## Scope

- In scope: Replace the obsolete global-regex String.replace call in the social image generator so the current main branch and every 0.7.5 PR pass the repository lint gate.
- Out of scope: unrelated refactors not required for "Restore the release lint baseline".

## Plan

1. Confirm the lint failure on current main and identify the minimal behavior-preserving API change.
2. Replace the global-regex String.replace call with String.replaceAll in the social-image title normalization.
3. Run targeted website lint, full repository lint, the social-image generator check, formatting, and typecheck.
4. Publish and merge the focused branch before refreshing dependent 0.7.5 PRs.

## Verify Steps

1. Run `bunx eslint website/scripts/generate-social-images.mjs`. Expected: the current lint violation is gone.
2. Run `bun run lint`. Expected: core and website lint both pass.
3. Run `bun run docs:social:check` and `bun run format:check`. Expected: generated social assets remain current and formatting is unchanged.
4. Run `bun run typecheck`. Expected: repository TypeScript contracts remain valid.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-07T02:38:47.071Z — VERIFY — ok

By: TESTER

Note: Release lint baseline restored with a behavior-preserving String.replaceAll migration.

Command: bunx eslint website/scripts/generate-social-images.mjs
Result: pass
Evidence: targeted ESLint completed with exit code 0
Scope: social image generator lint regression

Command: bun run lint
Result: pass
Evidence: core and website ESLint completed with exit code 0
Scope: complete repository lint surface

Command: bun run docs:social:check
Result: pass
Evidence: checked 226 documentation social images
Scope: generated social preview parity

Command: bun run format:check
Result: pass
Evidence: all matched files use Prettier code style
Scope: repository formatting

Command: bun run typecheck
Result: pass
Evidence: repository TypeScript build completed with exit code 0
Scope: TypeScript contracts
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T02:37:41.880Z, excerpt_hash=sha256:7f173c5cc5fd73e72050c28a776005e92d52c750e6b14d54ef63dfbdbe07e11c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608070235-JPPAMT-restore-the-release-lint-baseline/.agentplane/tasks/202608070235-JPPAMT/blueprint/resolved-snapshot.json
- old_digest: e6918be9c187948088eeee72c070745720938b0e5e20a11ccdb3664f8e226b94
- current_digest: e6918be9c187948088eeee72c070745720938b0e5e20a11ccdb3664f8e226b94
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608070235-JPPAMT

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
