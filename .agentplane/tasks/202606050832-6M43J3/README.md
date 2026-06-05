---
id: "202606050832-6M43J3"
title: "Recognize legacy pre-merge closure markers after rebase merge"
result_summary: "Fixed legacy pre-merge marker no-op handling and pr_number persistence for hosted-close."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hosted-close"
  - "release-blocker"
verify:
  - "agentplane task verify-show 202606050832-6M43J3"
  - "bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000"
  - "node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts"
  - "bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check"
  - "bun run --filter=agentplane typecheck"
  - "bun run --filter=agentplane build"
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T08:32:52.529Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-05T11:00:28.018Z"
  updated_by: "DEUS"
  note: "Hosted publish confirmed for v0.6.18."
quality_review:
  state: "pass"
  updated_at: "2026-06-05T10:35:21.108Z"
  updated_by: "EVALUATOR"
  note: "Hosted-close legacy pre-merge marker handling now requires PR binding or temporal verification binding, and finish persists nested pr_number for future markers."
  evaluated_sha: "a99194e1c5bd5c532e3860bff1b6cedcc29cf343"
  blueprint_digest: "e1fece02f1e52c0c915c66701593703f93f22ece518cb7b35e1348f7737b6cb0"
  evidence_refs:
    - ".agentplane/tasks/202606050832-6M43J3/README.md"
    - ".agentplane/tasks/202606050832-6M43J3/quality/20260605-103521108-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606050832-6M43J3/quality/20260605-103521108-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606050832-6M43J3/quality/20260605-103521108-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606050832-6M43J3/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/task/hosted-close.command.test.ts"
  findings:
    - "Pass: no-PR legacy marker bypass is constrained by branch, DONE state, nonempty task commit, and recorded_at >= last_verified_at; explicit top-level or nested PR mismatches still reject."
commit:
  hash: "1a2bb0088b431e08d67e720845c2d84ab8c839f8"
  message: "✅ 6M43J3 task: record review fix verification"
comments:
  -
    author: "CODER"
    body: "Start: fixing hosted-close legacy pre-merge markers without pr_number and persisting pr_number in new pre-merge closure markers. Release remains blocked until this task lands and hosted-close is green."
  -
    author: "CODER"
    body: "Verified: hosted-close legacy pre-merge markers now require an explicit PR binding or a post-verification temporal binding; new pre-merge markers persist pr_number; focused tests, lint, formatting, typecheck, build, hosted checks, and evaluator review passed."
events:
  -
    type: "status"
    at: "2026-06-05T08:33:23.505Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing hosted-close legacy pre-merge markers without pr_number and persisting pr_number in new pre-merge closure markers. Release remains blocked until this task lands and hosted-close is green."
  -
    type: "verify"
    at: "2026-06-05T08:38:37.687Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane task verify-show 202606050832-6M43J3 | Result: pass | Evidence: blueprint code.branch_pr, snapshot current, code_pr evidence required. Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000 | Result: pass | Evidence: 2 files, 9 tests passed. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts | Result: pass | Evidence: no output. Command: bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check | Result: pass | Evidence: All matched files use Prettier code style. Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: exited 0. Command: bun run --filter=agentplane build | Result: pass | Evidence: dist/cli.js and release manifest generated."
  -
    type: "verify"
    at: "2026-06-05T08:39:34.301Z"
    author: "CODER"
    state: "ok"
    note: "Verified on implementation commit bd3b3bcbd. Command: agentplane task verify-show 202606050832-6M43J3 | Result: pass | Evidence: blueprint code.branch_pr, snapshot current. Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000 | Result: pass | Evidence: 2 files, 9 tests passed. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts | Result: pass | Evidence: no output. Command: bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check | Result: pass | Evidence: All matched files use Prettier code style. Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: exited 0. Command: bun run --filter=agentplane build | Result: pass | Evidence: dist/cli.js and release manifest generated."
  -
    type: "verify"
    at: "2026-06-05T08:47:22.128Z"
    author: "CODER"
    state: "ok"
    note: "Verified on review-fix commit a99194e1c. Command: agentplane task verify-show 202606050832-6M43J3 | Result: pass | Evidence: blueprint code.branch_pr, snapshot current. Command: bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000 | Result: pass | Evidence: 2 files, 10 tests passed including stale legacy marker rejection. Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts | Result: pass | Evidence: no output. Command: bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check | Result: pass | Evidence: All matched files use Prettier code style. Command: bun run --filter=agentplane typecheck | Result: pass | Evidence: exited 0. Command: bun run --filter=agentplane build | Result: pass | Evidence: dist/cli.js and release manifest generated."
  -
    type: "status"
    at: "2026-06-05T10:40:03.046Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: hosted-close legacy pre-merge markers now require an explicit PR binding or a post-verification temporal binding; new pre-merge markers persist pr_number; focused tests, lint, formatting, typecheck, build, hosted checks, and evaluator review passed."
doc_version: 3
doc_updated_at: "2026-06-05T11:00:28.018Z"
doc_updated_by: "DEUS"
description: "Hosted-close must no-op for DONE tasks whose pre_merge_closure marker was written before PR numbers were persisted and whose basis commit was the pre-finish branch head, not task.commit.hash. Also make finish pre-merge closure persist pr_number when PR metadata already knows it, so future hosted-close decisions are direct."
sections:
  Summary: |-
    Recognize legacy pre-merge closure markers after rebase merge

    Hosted-close must no-op for DONE tasks whose pre_merge_closure marker was written before PR numbers were persisted and whose basis commit was the pre-finish branch head, not task.commit.hash. Also make finish pre-merge closure persist pr_number when PR metadata already knows it, so future hosted-close decisions are direct.
  Scope: |-
    - In scope: Hosted-close must no-op for DONE tasks whose pre_merge_closure marker was written before PR numbers were persisted and whose basis commit was the pre-finish branch head, not task.commit.hash. Also make finish pre-merge closure persist pr_number when PR metadata already knows it, so future hosted-close decisions are direct.
    - Out of scope: unrelated refactors not required for "Recognize legacy pre-merge closure markers after rebase merge".
  Plan: "Fix remaining hosted-close pre-merge marker semantics. Scope: hosted-close command, finish pre-merge marker writer, and focused tests. Steps: (1) update hosted-close so legacy pre_merge_closure markers without pr_number can no-op when the DONE task, meta.branch, marker.branch, and merged PR source branch all match, even when marker.basis_commit is the pre-finish branch head instead of task.commit.hash; keep explicit mismatched pr_number rejection; (2) update finish pre-merge marker writing to preserve meta.pr_number when available; (3) add focused regression tests for legacy no-pr marker with distinct task commit and marker basis, mismatched PR rejection, and marker pr_number persistence; (4) run verify-show, focused vitest, Prettier check, eslint, typecheck/build, hosted PR checks; (5) finish with pre-merge closure and integrate before release."
  Verify Steps: |-
    1. Run `agentplane task verify-show 202606050832-6M43J3`. Expected: blueprint is `quality.regression`, snapshot is current, and required evidence matches code regression scope.
    2. Run `bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000`. Expected: legacy no-PR pre-merge marker, explicit PR mismatch rejection, and marker pr_number persistence tests pass.
    3. Run `node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts`. Expected: lint passes on touched files.
    4. Run `bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check`. Expected: formatting passes.
    5. Run `bun run --filter=agentplane typecheck` and `bun run --filter=agentplane build`. Expected: TypeScript and package build pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - State: ok
    - Note: Hosted publish confirmed for v0.6.18.
    - Details:
      - release_sha: 05bb8f04ed687ff3bdff9f8befdb0ab36c2ba25c
      - version: 0.6.18
      - tag: v0.6.18
      - @agentplaneorg/core: published_in_run
      - @agentplaneorg/recipes: published_in_run
      - agentplane: published_in_run
      - npm_smoke: pass
      - github_release: created
      - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.18
      - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/27010820357
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  implementation_commit:
    hash: "a99194e1c5bd5c532e3860bff1b6cedcc29cf343"
    message: "🔒 6M43J3 hosted-close: bind legacy marker to verification time"
id_source: "generated"
---
## Summary

Recognize legacy pre-merge closure markers after rebase merge

Hosted-close must no-op for DONE tasks whose pre_merge_closure marker was written before PR numbers were persisted and whose basis commit was the pre-finish branch head, not task.commit.hash. Also make finish pre-merge closure persist pr_number when PR metadata already knows it, so future hosted-close decisions are direct.

## Scope

- In scope: Hosted-close must no-op for DONE tasks whose pre_merge_closure marker was written before PR numbers were persisted and whose basis commit was the pre-finish branch head, not task.commit.hash. Also make finish pre-merge closure persist pr_number when PR metadata already knows it, so future hosted-close decisions are direct.
- Out of scope: unrelated refactors not required for "Recognize legacy pre-merge closure markers after rebase merge".

## Plan

Fix remaining hosted-close pre-merge marker semantics. Scope: hosted-close command, finish pre-merge marker writer, and focused tests. Steps: (1) update hosted-close so legacy pre_merge_closure markers without pr_number can no-op when the DONE task, meta.branch, marker.branch, and merged PR source branch all match, even when marker.basis_commit is the pre-finish branch head instead of task.commit.hash; keep explicit mismatched pr_number rejection; (2) update finish pre-merge marker writing to preserve meta.pr_number when available; (3) add focused regression tests for legacy no-pr marker with distinct task commit and marker basis, mismatched PR rejection, and marker pr_number persistence; (4) run verify-show, focused vitest, Prettier check, eslint, typecheck/build, hosted PR checks; (5) finish with pre-merge closure and integrate before release.

## Verify Steps

1. Run `agentplane task verify-show 202606050832-6M43J3`. Expected: blueprint is `quality.regression`, snapshot is current, and required evidence matches code regression scope.
2. Run `bunx vitest run packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000`. Expected: legacy no-PR pre-merge marker, explicit PR mismatch rejection, and marker pr_number persistence tests pass.
3. Run `node node_modules/eslint/bin/eslint.js packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts`. Expected: lint passes on touched files.
4. Run `bunx prettier packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/commands/task/finish-execute-close.ts packages/agentplane/src/commands/shared/pr-meta/pre-merge-closure.ts --check`. Expected: formatting passes.
5. Run `bun run --filter=agentplane typecheck` and `bun run --filter=agentplane build`. Expected: TypeScript and package build pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- State: ok
- Note: Hosted publish confirmed for v0.6.18.
- Details:
  - release_sha: 05bb8f04ed687ff3bdff9f8befdb0ab36c2ba25c
  - version: 0.6.18
  - tag: v0.6.18
  - @agentplaneorg/core: published_in_run
  - @agentplaneorg/recipes: published_in_run
  - agentplane: published_in_run
  - npm_smoke: pass
  - github_release: created
  - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.18
  - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/27010820357
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings