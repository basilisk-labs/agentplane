---
id: "202605060829-WRTQP0"
title: "Enforce task-bound mutating commits"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hooks"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T08:29:43.535Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T09:10:04.034Z"
  updated_by: "CODER"
  note: "Implemented task-bound mutation gates for pre-commit, commit-msg, and pre-push. Verification passed: focused vitest suite (release-smoke, pre-push task binding, pre-commit, runtime shim, policy evaluate, commit-policy), bun run typecheck, targeted eslint, bun run format:check, bun run hotspots:check, git diff --check, node .agentplane/policy/check-routing.mjs, and bun run framework:dev:bootstrap. Release-smoke failure was stale runtime before bootstrap; it passed after rebuilding."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement task-bound hook enforcement for mutating paths, preserving docs-only task flow, lifecycle close commits, and explicit emergency backfill handling."
events:
  -
    type: "status"
    at: "2026-05-06T08:29:58.718Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement task-bound hook enforcement for mutating paths, preserving docs-only task flow, lifecycle close commits, and explicit emergency backfill handling."
  -
    type: "verify"
    at: "2026-05-06T08:38:18.335Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/core/src/commit/commit-policy.test.ts; Result: pass; Evidence: 5 files passed, 75 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed successfully. Command: bunx eslint on touched TS files; Result: pass; Evidence: no lint output after fixes. Command: bunx prettier --check touched hook files; Result: pass; Evidence: all matched files use Prettier style. Command: git diff --check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime built and verified. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass with one unrelated branch_pr normalization warning for WCPBCX."
  -
    type: "verify"
    at: "2026-05-06T08:52:57.622Z"
    author: "CODER"
    state: "ok"
    note: "Review follow-up checks: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/core/src/commit/commit-policy.test.ts passed with 5 files and 77 tests. bun run typecheck passed. Prettier check on touched hook files passed. ESLint on touched hook files passed. git diff --check passed. Review fixes cover detached HEAD with AGENTPLANE_TASK_ID and merge commits in pre-push mutation audits."
  -
    type: "verify"
    at: "2026-05-06T08:56:59.458Z"
    author: "CODER"
    state: "ok"
    note: "Review follow-up final checks: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts passed with 3 files and 38 tests. bun run hotspots:check passed after moving new pre-push binding tests out of the oversized hook-run file. Prior focused 77-test hook/policy suite and typecheck passed before the split; behavior unchanged except test placement."
  -
    type: "verify"
    at: "2026-05-06T09:10:04.034Z"
    author: "CODER"
    state: "ok"
    note: "Implemented task-bound mutation gates for pre-commit, commit-msg, and pre-push. Verification passed: focused vitest suite (release-smoke, pre-push task binding, pre-commit, runtime shim, policy evaluate, commit-policy), bun run typecheck, targeted eslint, bun run format:check, bun run hotspots:check, git diff --check, node .agentplane/policy/check-routing.mjs, and bun run framework:dev:bootstrap. Release-smoke failure was stale runtime before bootstrap; it passed after rebuilding."
doc_version: 3
doc_updated_at: "2026-05-06T09:10:04.039Z"
doc_updated_by: "CODER"
description: "Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence."
sections:
  Summary: |-
    Enforce task-bound mutating commits
    
    Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence.
  Scope: |-
    - In scope: Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence.
    - Out of scope: unrelated refactors not required for "Enforce task-bound mutating commits".
  Plan: "Plan: (1) Add a shared hook path classifier that separates docs-only, task artifacts, protected/policy/config/hook/ci, and mutating implementation paths. (2) Teach pre-commit to require an active task from AGENTPLANE_TASK_ID or task branch for staged mutating paths, while allowing docs-only only for docs/content-style task intent. (3) Teach commit-msg/pre-push to reject mutating commits without a valid task id unless they use an explicit emergency hotfix marker with required backfill evidence. (4) Preserve lifecycle automation paths for task-close/branch_pr close commits. (5) Cover the behavior with focused hook policy tests and run policy/doctor checks."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T08:38:18.335Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/core/src/commit/commit-policy.test.ts; Result: pass; Evidence: 5 files passed, 75 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed successfully. Command: bunx eslint on touched TS files; Result: pass; Evidence: no lint output after fixes. Command: bunx prettier --check touched hook files; Result: pass; Evidence: all matched files use Prettier style. Command: git diff --check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime built and verified. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass with one unrelated branch_pr normalization warning for WCPBCX.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T08:29:58.718Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-05-06T08:52:57.622Z — VERIFY — ok
    
    By: CODER
    
    Note: Review follow-up checks: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/core/src/commit/commit-policy.test.ts passed with 5 files and 77 tests. bun run typecheck passed. Prettier check on touched hook files passed. ESLint on touched hook files passed. git diff --check passed. Review fixes cover detached HEAD with AGENTPLANE_TASK_ID and merge commits in pre-push mutation audits.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T08:38:18.341Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-05-06T08:56:59.458Z — VERIFY — ok
    
    By: CODER
    
    Note: Review follow-up final checks: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts passed with 3 files and 38 tests. bun run hotspots:check passed after moving new pre-push binding tests out of the oversized hook-run file. Prior focused 77-test hook/policy suite and typecheck passed before the split; behavior unchanged except test placement.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T08:52:57.626Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-05-06T09:10:04.034Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented task-bound mutation gates for pre-commit, commit-msg, and pre-push. Verification passed: focused vitest suite (release-smoke, pre-push task binding, pre-commit, runtime shim, policy evaluate, commit-policy), bun run typecheck, targeted eslint, bun run format:check, bun run hotspots:check, git diff --check, node .agentplane/policy/check-routing.mjs, and bun run framework:dev:bootstrap. Release-smoke failure was stale runtime before bootstrap; it passed after rebuilding.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T08:56:59.463Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Direct mutating commits without active task/task id are now blocked locally; outgoing mutating commits are audited in pre-push; docs-only changes remain eligible for docs/content tasks; emergency commits require explicit Backfill-Task and Backfill-Evidence trailers.
      Impact: Commit gate now enforces task traceability across normal local commits and push attempts, including the GitHub-created direct-commit gap that local pre-commit alone cannot cover.
      Resolution: Managed upgrade commits use AGENTPLANE_ALLOW_UPGRADE during local commit and still require upgrade evidence in pre-push.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Enforce task-bound mutating commits

Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence.

## Scope

- In scope: Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence.
- Out of scope: unrelated refactors not required for "Enforce task-bound mutating commits".

## Plan

Plan: (1) Add a shared hook path classifier that separates docs-only, task artifacts, protected/policy/config/hook/ci, and mutating implementation paths. (2) Teach pre-commit to require an active task from AGENTPLANE_TASK_ID or task branch for staged mutating paths, while allowing docs-only only for docs/content-style task intent. (3) Teach commit-msg/pre-push to reject mutating commits without a valid task id unless they use an explicit emergency hotfix marker with required backfill evidence. (4) Preserve lifecycle automation paths for task-close/branch_pr close commits. (5) Cover the behavior with focused hook policy tests and run policy/doctor checks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-06T08:38:18.335Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/core/src/commit/commit-policy.test.ts; Result: pass; Evidence: 5 files passed, 75 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed successfully. Command: bunx eslint on touched TS files; Result: pass; Evidence: no lint output after fixes. Command: bunx prettier --check touched hook files; Result: pass; Evidence: all matched files use Prettier style. Command: git diff --check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime built and verified. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass with one unrelated branch_pr normalization warning for WCPBCX.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T08:29:58.718Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-05-06T08:52:57.622Z — VERIFY — ok

By: CODER

Note: Review follow-up checks: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/core/src/commit/commit-policy.test.ts passed with 5 files and 77 tests. bun run typecheck passed. Prettier check on touched hook files passed. ESLint on touched hook files passed. git diff --check passed. Review fixes cover detached HEAD with AGENTPLANE_TASK_ID and merge commits in pre-push mutation audits.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T08:38:18.341Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-05-06T08:56:59.458Z — VERIFY — ok

By: CODER

Note: Review follow-up final checks: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts passed with 3 files and 38 tests. bun run hotspots:check passed after moving new pre-push binding tests out of the oversized hook-run file. Prior focused 77-test hook/policy suite and typecheck passed before the split; behavior unchanged except test placement.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T08:52:57.626Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-05-06T09:10:04.034Z — VERIFY — ok

By: CODER

Note: Implemented task-bound mutation gates for pre-commit, commit-msg, and pre-push. Verification passed: focused vitest suite (release-smoke, pre-push task binding, pre-commit, runtime shim, policy evaluate, commit-policy), bun run typecheck, targeted eslint, bun run format:check, bun run hotspots:check, git diff --check, node .agentplane/policy/check-routing.mjs, and bun run framework:dev:bootstrap. Release-smoke failure was stale runtime before bootstrap; it passed after rebuilding.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T08:56:59.463Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Direct mutating commits without active task/task id are now blocked locally; outgoing mutating commits are audited in pre-push; docs-only changes remain eligible for docs/content tasks; emergency commits require explicit Backfill-Task and Backfill-Evidence trailers.
  Impact: Commit gate now enforces task traceability across normal local commits and push attempts, including the GitHub-created direct-commit gap that local pre-commit alone cannot cover.
  Resolution: Managed upgrade commits use AGENTPLANE_ALLOW_UPGRADE during local commit and still require upgrade evidence in pre-push.
  Promotion: incident-candidate
  Fixability: external
