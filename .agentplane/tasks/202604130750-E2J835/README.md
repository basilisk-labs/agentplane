---
id: "202604130750-E2J835"
title: "Make release apply branch_pr-aware for protected-main publish"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-13T07:54:05.957Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-13T12:50:25.535Z"
  updated_by: "CODER"
  note: "- Fixed the hosted Significant File Coverage regression by updating commit-wrapper coverage expectations for the artifact follow-up commit produced by agentplane commit. - Verified with: bunx vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts -t \"commit wrapper lets --allow-tasks cover a non-README active task artifact without a duplicate explicit prefix\" --hookTimeout 60000 --testTimeout 60000 - Verified with: bun run test:significant-coverage"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement branch_pr-safe release apply behavior for non-base branches, keep final publish deferred to main automation after merge, and validate the new candidate push/reporting path with focused release tests."
events:
  -
    type: "status"
    at: "2026-04-13T07:55:31.247Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement branch_pr-safe release apply behavior for non-base branches, keep final publish deferred to main automation after merge, and validate the new candidate push/reporting path with focused release tests."
  -
    type: "verify"
    at: "2026-04-13T08:07:19.262Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts. Result: pass. Evidence: 12/12 tests passed, including new branch_pr candidate regressions that skip local tag creation and push only HEAD on task branches. Scope: release apply routing/reporting/tests for protected-main publication."
  -
    type: "verify"
    at: "2026-04-13T08:11:41.771Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts. Result: pass on commit 209c5644f91c107a503f5c5e69b4410651dfa592. Evidence: 12/12 tests passed, including branch_pr candidate regressions that skip local tag creation and push only HEAD on task branches. Scope: committed release apply routing/reporting/tests for protected-main publication."
  -
    type: "verify"
    at: "2026-04-13T11:49:30.087Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000; bun run format:check | Result: pass | Evidence: release/apply.test.ts passed 12/12, including branch_pr candidate routing and candidate push cases; Prettier reported all matched files use code style | Scope: packages/agentplane/src/commands/release/apply.command.ts, apply.reporting.ts, apply.types.ts, apply.test.ts"
  -
    type: "verify"
    at: "2026-04-13T12:07:16.764Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000; bunx prettier --check packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts .agentplane/tasks/202604130750-E2J835/README.md .agentplane/tasks/202604130750-E2J835/pr/diffstat.txt .agentplane/tasks/202604130750-E2J835/pr/github-body.md .agentplane/tasks/202604130750-E2J835/pr/meta.json .agentplane/tasks/202604130750-E2J835/pr/review.md; bun run framework:dev:bootstrap; agentplane pr update 202604130750-E2J835 | Result: pass | Evidence: 63/63 tests passed; targeted prettier check passed; repo-local runtime rebuilt cleanly; E2J835 pr artifacts regenerated without merged-stack refs from 7SRWEX/RRD2AC/M4MN2S/S42Z30 | Scope: packages/agentplane/src/commands/pr/internal/sync.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts, .agentplane/tasks/202604130750-E2J835/**"
  -
    type: "verify"
    at: "2026-04-13T12:26:41.407Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000 Result: pass Evidence: 130/130 tests passed; local-ci selector routes PR-only remote diff to targeted/pr; hooks pre-push now streams live stage output; release/apply branch_pr coverage remains green. Scope: packages/agentplane/src/commands/pr/internal/sync.ts, scripts/lib/local-ci-selection.mjs, packages/agentplane/src/commands/hooks/index.ts, related tests, and branch_pr release friction around diffstat routing and status visibility. Command: node --input-type=module ... selectFastCiPlan(origin/task/... .. HEAD) Result: pass Evidence: plan.kind=targeted, bucket=pr, reason=pr_paths_only for PR-only remote diff even with .agentplane/tasks artifacts present. Scope: verifies next PR-only patch-release path no longer escalates to full-fast because of neutral task artifacts. Command: agentplane hooks run pre-push --root . Result: pass_with_expected_behavior_change Evidence: hook prints live stages (e.g. \"Running pre-push checks in standard mode\", \"== Format (check) ==\"); on dirty worktree it blocks explicitly instead of appearing hung. Scope: verifies operator visibility for future release/push flows; dirty-tree refusal itself is expected before commit."
  -
    type: "verify"
    at: "2026-04-13T12:39:17.722Z"
    author: "CODER"
    state: "ok"
    note: "- Fixed repo-local hook shim precedence so fresh worktrees prefer local packages/agentplane/bin/agentplane.js before AGENTPLANE_HOOK_RUNNER. - Ensured framework bootstrap always materializes the managed .agentplane/bin/agentplane shim and work start seeds the same shim into fresh worktrees. - Verified with: bunx vitest run packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000"
  -
    type: "verify"
    at: "2026-04-13T12:50:25.535Z"
    author: "CODER"
    state: "ok"
    note: "- Fixed the hosted Significant File Coverage regression by updating commit-wrapper coverage expectations for the artifact follow-up commit produced by agentplane commit. - Verified with: bunx vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts -t \"commit wrapper lets --allow-tasks cover a non-README active task artifact without a duplicate explicit prefix\" --hookTimeout 60000 --testTimeout 60000 - Verified with: bun run test:significant-coverage"
doc_version: 3
doc_updated_at: "2026-04-13T12:50:25.569Z"
doc_updated_by: "CODER"
description: "When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge."
sections:
  Summary: |-
    Make release apply branch_pr-aware for protected-main publish
    
    When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.
  Scope: |-
    - In scope: When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.
    - Out of scope: unrelated refactors not required for "Make release apply branch_pr-aware for protected-main publish".
  Plan: "Release hardening plan: make release apply --push branch_pr-aware on non-base branches by pushing only the current task branch as a release candidate, skipping local tag creation/push, and emitting explicit reporting that final publication is deferred to the main-driven publish workflow after merge. Verify with targeted release apply tests and task branch lifecycle checks."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-13T08:07:19.262Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts. Result: pass. Evidence: 12/12 tests passed, including new branch_pr candidate regressions that skip local tag creation and push only HEAD on task branches. Scope: release apply routing/reporting/tests for protected-main publication.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T07:55:31.266Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-04-13T08:11:41.771Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts. Result: pass on commit 209c5644f91c107a503f5c5e69b4410651dfa592. Evidence: 12/12 tests passed, including branch_pr candidate regressions that skip local tag creation and push only HEAD on task branches. Scope: committed release apply routing/reporting/tests for protected-main publication.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T08:07:19.268Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-04-13T11:49:30.087Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000; bun run format:check | Result: pass | Evidence: release/apply.test.ts passed 12/12, including branch_pr candidate routing and candidate push cases; Prettier reported all matched files use code style | Scope: packages/agentplane/src/commands/release/apply.command.ts, apply.reporting.ts, apply.types.ts, apply.test.ts
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T08:11:41.825Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-04-13T12:07:16.764Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000; bunx prettier --check packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts .agentplane/tasks/202604130750-E2J835/README.md .agentplane/tasks/202604130750-E2J835/pr/diffstat.txt .agentplane/tasks/202604130750-E2J835/pr/github-body.md .agentplane/tasks/202604130750-E2J835/pr/meta.json .agentplane/tasks/202604130750-E2J835/pr/review.md; bun run framework:dev:bootstrap; agentplane pr update 202604130750-E2J835 | Result: pass | Evidence: 63/63 tests passed; targeted prettier check passed; repo-local runtime rebuilt cleanly; E2J835 pr artifacts regenerated without merged-stack refs from 7SRWEX/RRD2AC/M4MN2S/S42Z30 | Scope: packages/agentplane/src/commands/pr/internal/sync.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts, .agentplane/tasks/202604130750-E2J835/**
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T11:49:30.099Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-04-13T12:26:41.407Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000 Result: pass Evidence: 130/130 tests passed; local-ci selector routes PR-only remote diff to targeted/pr; hooks pre-push now streams live stage output; release/apply branch_pr coverage remains green. Scope: packages/agentplane/src/commands/pr/internal/sync.ts, scripts/lib/local-ci-selection.mjs, packages/agentplane/src/commands/hooks/index.ts, related tests, and branch_pr release friction around diffstat routing and status visibility. Command: node --input-type=module ... selectFastCiPlan(origin/task/... .. HEAD) Result: pass Evidence: plan.kind=targeted, bucket=pr, reason=pr_paths_only for PR-only remote diff even with .agentplane/tasks artifacts present. Scope: verifies next PR-only patch-release path no longer escalates to full-fast because of neutral task artifacts. Command: agentplane hooks run pre-push --root . Result: pass_with_expected_behavior_change Evidence: hook prints live stages (e.g. "Running pre-push checks in standard mode", "== Format (check) =="); on dirty worktree it blocks explicitly instead of appearing hung. Scope: verifies operator visibility for future release/push flows; dirty-tree refusal itself is expected before commit.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T12:07:16.769Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-04-13T12:39:17.722Z — VERIFY — ok
    
    By: CODER
    
    Note: - Fixed repo-local hook shim precedence so fresh worktrees prefer local packages/agentplane/bin/agentplane.js before AGENTPLANE_HOOK_RUNNER. - Ensured framework bootstrap always materializes the managed .agentplane/bin/agentplane shim and work start seeds the same shim into fresh worktrees. - Verified with: bunx vitest run packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T12:26:41.424Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-04-13T12:50:25.535Z — VERIFY — ok
    
    By: CODER
    
    Note: - Fixed the hosted Significant File Coverage regression by updating commit-wrapper coverage expectations for the artifact follow-up commit produced by agentplane commit. - Verified with: bunx vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts -t "commit wrapper lets --allow-tasks cover a non-README active task artifact without a duplicate explicit prefix" --hookTimeout 60000 --testTimeout 60000 - Verified with: bun run test:significant-coverage
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T12:39:17.732Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- Observed during verification: when `work start` was invoked from a manually created base worktree through the supported global-binary override, the nested task worktree still needed a local `bun install --frozen-lockfile` before repo-local test execution. This bootstrap gap is separate from the release-apply routing fix and should be handled as follow-up workflow hardening."
id_source: "generated"
---
## Summary

Make release apply branch_pr-aware for protected-main publish

When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.

## Scope

- In scope: When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.
- Out of scope: unrelated refactors not required for "Make release apply branch_pr-aware for protected-main publish".

## Plan

Release hardening plan: make release apply --push branch_pr-aware on non-base branches by pushing only the current task branch as a release candidate, skipping local tag creation/push, and emitting explicit reporting that final publication is deferred to the main-driven publish workflow after merge. Verify with targeted release apply tests and task branch lifecycle checks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-13T08:07:19.262Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts. Result: pass. Evidence: 12/12 tests passed, including new branch_pr candidate regressions that skip local tag creation and push only HEAD on task branches. Scope: release apply routing/reporting/tests for protected-main publication.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T07:55:31.266Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-04-13T08:11:41.771Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts. Result: pass on commit 209c5644f91c107a503f5c5e69b4410651dfa592. Evidence: 12/12 tests passed, including branch_pr candidate regressions that skip local tag creation and push only HEAD on task branches. Scope: committed release apply routing/reporting/tests for protected-main publication.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T08:07:19.268Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-04-13T11:49:30.087Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000; bun run format:check | Result: pass | Evidence: release/apply.test.ts passed 12/12, including branch_pr candidate routing and candidate push cases; Prettier reported all matched files use code style | Scope: packages/agentplane/src/commands/release/apply.command.ts, apply.reporting.ts, apply.types.ts, apply.test.ts

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T08:11:41.825Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-04-13T12:07:16.764Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000; bunx prettier --check packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts .agentplane/tasks/202604130750-E2J835/README.md .agentplane/tasks/202604130750-E2J835/pr/diffstat.txt .agentplane/tasks/202604130750-E2J835/pr/github-body.md .agentplane/tasks/202604130750-E2J835/pr/meta.json .agentplane/tasks/202604130750-E2J835/pr/review.md; bun run framework:dev:bootstrap; agentplane pr update 202604130750-E2J835 | Result: pass | Evidence: 63/63 tests passed; targeted prettier check passed; repo-local runtime rebuilt cleanly; E2J835 pr artifacts regenerated without merged-stack refs from 7SRWEX/RRD2AC/M4MN2S/S42Z30 | Scope: packages/agentplane/src/commands/pr/internal/sync.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts, .agentplane/tasks/202604130750-E2J835/**

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T11:49:30.099Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-04-13T12:26:41.407Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000 Result: pass Evidence: 130/130 tests passed; local-ci selector routes PR-only remote diff to targeted/pr; hooks pre-push now streams live stage output; release/apply branch_pr coverage remains green. Scope: packages/agentplane/src/commands/pr/internal/sync.ts, scripts/lib/local-ci-selection.mjs, packages/agentplane/src/commands/hooks/index.ts, related tests, and branch_pr release friction around diffstat routing and status visibility. Command: node --input-type=module ... selectFastCiPlan(origin/task/... .. HEAD) Result: pass Evidence: plan.kind=targeted, bucket=pr, reason=pr_paths_only for PR-only remote diff even with .agentplane/tasks artifacts present. Scope: verifies next PR-only patch-release path no longer escalates to full-fast because of neutral task artifacts. Command: agentplane hooks run pre-push --root . Result: pass_with_expected_behavior_change Evidence: hook prints live stages (e.g. "Running pre-push checks in standard mode", "== Format (check) =="); on dirty worktree it blocks explicitly instead of appearing hung. Scope: verifies operator visibility for future release/push flows; dirty-tree refusal itself is expected before commit.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T12:07:16.769Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-04-13T12:39:17.722Z — VERIFY — ok

By: CODER

Note: - Fixed repo-local hook shim precedence so fresh worktrees prefer local packages/agentplane/bin/agentplane.js before AGENTPLANE_HOOK_RUNNER. - Ensured framework bootstrap always materializes the managed .agentplane/bin/agentplane shim and work start seeds the same shim into fresh worktrees. - Verified with: bunx vitest run packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T12:26:41.424Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-04-13T12:50:25.535Z — VERIFY — ok

By: CODER

Note: - Fixed the hosted Significant File Coverage regression by updating commit-wrapper coverage expectations for the artifact follow-up commit produced by agentplane commit. - Verified with: bunx vitest run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts -t "commit wrapper lets --allow-tasks cover a non-README active task artifact without a duplicate explicit prefix" --hookTimeout 60000 --testTimeout 60000 - Verified with: bun run test:significant-coverage

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T12:39:17.732Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observed during verification: when `work start` was invoked from a manually created base worktree through the supported global-binary override, the nested task worktree still needed a local `bun install --frozen-lockfile` before repo-local test execution. This bootstrap gap is separate from the release-apply routing fix and should be handled as follow-up workflow hardening.
