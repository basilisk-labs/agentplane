---
id: "202605010645-5H9FJ5"
title: "AP-15: Factor CI contract and release extras"
result_summary: "Merged via PR #686."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605010645-YZ5WV4"
tags:
  - "code"
verify:
  - "bun run workflows:lint && bun run ci:local:fast"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T12:23:23.868Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T12:36:21.782Z"
  updated_by: "CODER"
  note: "Verified CI script lane factoring and release contract guard."
commit:
  hash: "ef2ff9a92ce98ea766cfebf1995070e3e6f3ed1e"
  message: "Merge pull request #686 from basilisk-labs/task/202605010645-5H9FJ5/ci-contract-release-extras"
comments:
  -
    author: "CODER"
    body: "Start: refactoring package CI and release scripts into explicit contract, test, and release-extra lanes while preserving existing workflow behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #686 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T12:23:40.638Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: refactoring package CI and release scripts into explicit contract, test, and release-extra lanes while preserving existing workflow behavior."
  -
    type: "verify"
    at: "2026-05-01T12:36:21.782Z"
    author: "CODER"
    state: "ok"
    note: "Verified CI script lane factoring and release contract guard."
  -
    type: "status"
    at: "2026-05-01T12:39:51.472Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #686 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T12:39:51.478Z"
doc_updated_by: "INTEGRATOR"
description: "Split package CI scripts into shared contract, test, and release-extra lanes to reduce ci/release duplication."
sections:
  Summary: |-
    AP-15: Factor CI contract and release extras
    
    Split package CI scripts into shared contract, test, and release-extra lanes to reduce ci/release duplication.
  Scope: |-
    - In scope: Split package CI scripts into shared contract, test, and release-extra lanes to reduce ci/release duplication.
    - Out of scope: unrelated refactors not required for "AP-15: Factor CI contract and release extras".
  Plan: |-
    1. Inspect the existing package CI/release scripts and workflow command-contract checks to identify shared contract, test, and release-extra lanes without changing workflow semantics.
    2. Refactor package.json scripts so ci, release:ci-check, and release prepublish wrappers delegate through ci:contract, ci:test, and ci:release-extras instead of repeating the same command segments.
    3. Update generated script documentation and any command-contract expectations that read package scripts.
    4. Verify workflows:lint, ci:local:fast, docs:scripts:check, formatting/diff checks, typecheck/lint where touched, framework bootstrap, doctor, and policy routing.
  Verify Steps: |-
    1. Run `bun run workflows:lint && bun run ci:local:fast`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T12:36:21.782Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified CI script lane factoring and release contract guard.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T12:23:40.638Z, excerpt_hash=sha256:138583c95bfd04a8263d7170ea8e12ed12d5b3431d62beef09f10141467b5da3
    
    Details:
    
    Commands passed:
    - node packages/agentplane/bin/agentplane.js task verify-show 202605010645-5H9FJ5
    - bun run docs:scripts:check
    - bun run workflows:lint
    - bunx vitest run packages/agentplane/src/commands/release/release-ci-contract.test.ts
    - bunx prettier --check package.json packages/agentplane/src/commands/release/release-ci-contract.test.ts scripts/README.md .agentplane/tasks/202605010645-5H9FJ5/README.md
    - git diff --check
    - bun run typecheck
    - bun run lint:core
    - bun run framework:dev:bootstrap
    - bunx vitest run packages/agentplane/src/cli/repo-local-handoff.test.ts
    - bun run ci:local:fast
    - node packages/agentplane/bin/agentplane.js doctor
    - node .agentplane/policy/check-routing.mjs
    
    Note: the first ci:local:fast attempt failed before bootstrap because the worktree node_modules symlink resolved @agentplaneorg/core from the base checkout. framework:dev:bootstrap installed the worktree-local dependency layout; the focused repo-local-handoff test and the full ci:local:fast rerun then passed.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

AP-15: Factor CI contract and release extras

Split package CI scripts into shared contract, test, and release-extra lanes to reduce ci/release duplication.

## Scope

- In scope: Split package CI scripts into shared contract, test, and release-extra lanes to reduce ci/release duplication.
- Out of scope: unrelated refactors not required for "AP-15: Factor CI contract and release extras".

## Plan

1. Inspect the existing package CI/release scripts and workflow command-contract checks to identify shared contract, test, and release-extra lanes without changing workflow semantics.
2. Refactor package.json scripts so ci, release:ci-check, and release prepublish wrappers delegate through ci:contract, ci:test, and ci:release-extras instead of repeating the same command segments.
3. Update generated script documentation and any command-contract expectations that read package scripts.
4. Verify workflows:lint, ci:local:fast, docs:scripts:check, formatting/diff checks, typecheck/lint where touched, framework bootstrap, doctor, and policy routing.

## Verify Steps

1. Run `bun run workflows:lint && bun run ci:local:fast`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T12:36:21.782Z — VERIFY — ok

By: CODER

Note: Verified CI script lane factoring and release contract guard.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T12:23:40.638Z, excerpt_hash=sha256:138583c95bfd04a8263d7170ea8e12ed12d5b3431d62beef09f10141467b5da3

Details:

Commands passed:
- node packages/agentplane/bin/agentplane.js task verify-show 202605010645-5H9FJ5
- bun run docs:scripts:check
- bun run workflows:lint
- bunx vitest run packages/agentplane/src/commands/release/release-ci-contract.test.ts
- bunx prettier --check package.json packages/agentplane/src/commands/release/release-ci-contract.test.ts scripts/README.md .agentplane/tasks/202605010645-5H9FJ5/README.md
- git diff --check
- bun run typecheck
- bun run lint:core
- bun run framework:dev:bootstrap
- bunx vitest run packages/agentplane/src/cli/repo-local-handoff.test.ts
- bun run ci:local:fast
- node packages/agentplane/bin/agentplane.js doctor
- node .agentplane/policy/check-routing.mjs

Note: the first ci:local:fast attempt failed before bootstrap because the worktree node_modules symlink resolved @agentplaneorg/core from the base checkout. framework:dev:bootstrap installed the worktree-local dependency layout; the focused repo-local-handoff test and the full ci:local:fast rerun then passed.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
