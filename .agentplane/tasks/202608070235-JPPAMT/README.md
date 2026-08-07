---
id: "202608070235-JPPAMT"
title: "Restore the release lint baseline"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
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
  updated_at: "2026-08-07T02:44:36.609Z"
  updated_by: "TESTER"
  note: |-
    Fresh deterministic evidence on implementation SHA 17dc364080b8c5763eb478ea5b0a328168ba2518.

    Command: git show main:website/scripts/generate-social-images.mjs | bunx eslint --stdin --stdin-filename website/scripts/generate-social-images.mjs
    Result: pass
    Evidence: original main content reproducibly exits 1 with unicorn/prefer-string-replace-all at line 207
    Scope: original failure reproduction

    Command: bunx eslint website/scripts/generate-social-images.mjs
    Result: pass
    Evidence: fixed file exits 0 with no findings
    Scope: focused regression check

    Command: bun run lint
    Result: pass
    Evidence: core and website ESLint completed with exit code 0
    Scope: full local repository lint gate

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

    Command: gh pr checks 4796
    Result: pass
    Evidence: PR verification, docs, CodeQL, Analyze actions, and Analyze javascript-typescript passed on head 8345e2aeda332dd80572b9e0f63cbb83e14e5b23
    Scope: complete hosted route selected for the docs/website-only diff
  attempts: 0
quality_review:
  state: "blocked"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-07T02:40:02.236Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned blocked with 1 typed finding(s)."
  evaluated_sha: "17dc364080b8c5763eb478ea5b0a328168ba2518"
  blueprint_digest: "e6918be9c187948088eeee72c070745720938b0e5e20a11ccdb3664f8e226b94"
  evidence_refs:
    - ".agentplane/tasks/202608070235-JPPAMT/quality/20260807-023915888-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608070235-JPPAMT/quality/20260807-023915888-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608070235-JPPAMT/quality/objects/sha256/07eb1f7cb432ff0c44fdb01456cb771e8e74741e456f38a52965ca5dd0db09c3.md"
    - ".agentplane/tasks/202608070235-JPPAMT/quality/20260807-023915888-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608070235-JPPAMT/quality/20260807-023915888-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608070235-JPPAMT/quality/20260807-023915888-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608070235-JPPAMT/quality/20260807-023915888-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608070235-JPPAMT/README.md"
    - ".agentplane/tasks/202608070235-JPPAMT/quality/objects/sha256/5960a8fbcb44bc1d723d3ce9c45afa821070d8411ad1e7ee82aab1fd542dc71b.patch"
    - ".agentplane/tasks/202608070235-JPPAMT/quality/objects/sha256/29f2d60b41048616c55464c7a5c83e24caf60cc8d37140b663f363a29e11a826.json"
    - ".agentplane/tasks/202608070235-JPPAMT/quality/objects/sha256/6550cb314bb3505b1c1debd688f03f5a0264a0f87a8c8a1bc32551a713a9d955.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The frozen packet records asserted pass summaries but contains no deterministic check results, runner history, runtime evidence, original failure reproduction, or hosted full-gate evidence."
  recovery_reason: "deterministic_evidence_gap"
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
  -
    type: "verify"
    at: "2026-08-07T02:44:36.609Z"
    author: "TESTER"
    state: "ok"
    note: |-
      Fresh deterministic evidence on implementation SHA 17dc364080b8c5763eb478ea5b0a328168ba2518.

      Command: git show main:website/scripts/generate-social-images.mjs | bunx eslint --stdin --stdin-filename website/scripts/generate-social-images.mjs
      Result: pass
      Evidence: original main content reproducibly exits 1 with unicorn/prefer-string-replace-all at line 207
      Scope: original failure reproduction

      Command: bunx eslint website/scripts/generate-social-images.mjs
      Result: pass
      Evidence: fixed file exits 0 with no findings
      Scope: focused regression check

      Command: bun run lint
      Result: pass
      Evidence: core and website ESLint completed with exit code 0
      Scope: full local repository lint gate

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

      Command: gh pr checks 4796
      Result: pass
      Evidence: PR verification, docs, CodeQL, Analyze actions, and Analyze javascript-typescript passed on head 8345e2aeda332dd80572b9e0f63cbb83e14e5b23
      Scope: complete hosted route selected for the docs/website-only diff
doc_version: 3
doc_updated_at: "2026-08-07T02:44:37.824Z"
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

    ### 2026-08-07T02:44:36.609Z — VERIFY — ok

    By: TESTER

    Note: Fresh deterministic evidence on implementation SHA 17dc364080b8c5763eb478ea5b0a328168ba2518.

    Command: git show main:website/scripts/generate-social-images.mjs | bunx eslint --stdin --stdin-filename website/scripts/generate-social-images.mjs
    Result: pass
    Evidence: original main content reproducibly exits 1 with unicorn/prefer-string-replace-all at line 207
    Scope: original failure reproduction

    Command: bunx eslint website/scripts/generate-social-images.mjs
    Result: pass
    Evidence: fixed file exits 0 with no findings
    Scope: focused regression check

    Command: bun run lint
    Result: pass
    Evidence: core and website ESLint completed with exit code 0
    Scope: full local repository lint gate

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

    Command: gh pr checks 4796
    Result: pass
    Evidence: PR verification, docs, CodeQL, Analyze actions, and Analyze javascript-typescript passed on head 8345e2aeda332dd80572b9e0f63cbb83e14e5b23
    Scope: complete hosted route selected for the docs/website-only diff
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T02:38:47.983Z, excerpt_hash=sha256:7f173c5cc5fd73e72050c28a776005e92d52c750e6b14d54ef63dfbdbe07e11c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608070235-JPPAMT-restore-the-release-lint-baseline/.agentplane/tasks/202608070235-JPPAMT/blueprint/resolved-snapshot.json
    - old_digest: e6918be9c187948088eeee72c070745720938b0e5e20a11ccdb3664f8e226b94
    - current_digest: e6918be9c187948088eeee72c070745720938b0e5e20a11ccdb3664f8e226b94
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608070235-JPPAMT

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608070235-JPPAMT
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

### 2026-08-07T02:44:36.609Z — VERIFY — ok

By: TESTER

Note: Fresh deterministic evidence on implementation SHA 17dc364080b8c5763eb478ea5b0a328168ba2518.

Command: git show main:website/scripts/generate-social-images.mjs | bunx eslint --stdin --stdin-filename website/scripts/generate-social-images.mjs
Result: pass
Evidence: original main content reproducibly exits 1 with unicorn/prefer-string-replace-all at line 207
Scope: original failure reproduction

Command: bunx eslint website/scripts/generate-social-images.mjs
Result: pass
Evidence: fixed file exits 0 with no findings
Scope: focused regression check

Command: bun run lint
Result: pass
Evidence: core and website ESLint completed with exit code 0
Scope: full local repository lint gate

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

Command: gh pr checks 4796
Result: pass
Evidence: PR verification, docs, CodeQL, Analyze actions, and Analyze javascript-typescript passed on head 8345e2aeda332dd80572b9e0f63cbb83e14e5b23
Scope: complete hosted route selected for the docs/website-only diff
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T02:38:47.983Z, excerpt_hash=sha256:7f173c5cc5fd73e72050c28a776005e92d52c750e6b14d54ef63dfbdbe07e11c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608070235-JPPAMT-restore-the-release-lint-baseline/.agentplane/tasks/202608070235-JPPAMT/blueprint/resolved-snapshot.json
- old_digest: e6918be9c187948088eeee72c070745720938b0e5e20a11ccdb3664f8e226b94
- current_digest: e6918be9c187948088eeee72c070745720938b0e5e20a11ccdb3664f8e226b94
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608070235-JPPAMT

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608070235-JPPAMT
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
