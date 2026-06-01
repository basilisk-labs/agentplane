---
id: "202606010805-1H64FF"
title: "Close commits must include all task artifacts"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-01T08:16:08.262Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-01T08:22:02.358Z"
  updated_by: "CODER"
  note: "Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts => pass, 12 tests; Command: bun vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts => pass, 5 tests; Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts => pass, 13 tests; Command: bun run docs:cli:check => pass; Command: node .agentplane/policy/check-routing.mjs => policy routing OK; Command: git diff --check => pass; Command: git status --short --untracked-files=all => only intentional task implementation and task evidence changes remain."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-01T08:22:50.903Z"
  updated_by: "EVALUATOR"
  note: "Close commit regression fixed: deterministic close staging now includes active task-local artifacts, and CLI/help wording no longer claims README-only behavior."
  evaluated_sha: "5e6a96489ea336c749a60c5faf53b7ab0c0cb1da"
  blueprint_digest: "a7888ca1aacbc0f7564dd2b53435b003bd648a9dfb9697fa8950bdbadd2ea095"
  evidence_refs:
    - ".agentplane/tasks/202606010805-1H64FF/README.md"
    - ".agentplane/tasks/202606010805-1H64FF/quality/20260601-082250903-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606010805-1H64FF/quality/20260601-082250903-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606010805-1H64FF/quality/20260601-082250903-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606010805-1H64FF/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts"
    - "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts"
    - "packages/agentplane/src/commands/guard/impl/commit-stage.ts"
  findings:
    - "Regression coverage includes non-README task artifacts in both unit close staging and CLI wrapper close commit output."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved closeout artifact regression fix with focused lifecycle coverage and no scope expansion beyond deterministic task artifact commits."
events:
  -
    type: "status"
    at: "2026-06-01T08:16:22.409Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved closeout artifact regression fix with focused lifecycle coverage and no scope expansion beyond deterministic task artifact commits."
  -
    type: "verify"
    at: "2026-06-01T08:22:02.358Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts => pass, 12 tests; Command: bun vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts => pass, 5 tests; Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts => pass, 13 tests; Command: bun run docs:cli:check => pass; Command: node .agentplane/policy/check-routing.mjs => policy routing OK; Command: git diff --check => pass; Command: git status --short --untracked-files=all => only intentional task implementation and task evidence changes remain."
doc_version: 3
doc_updated_at: "2026-06-01T08:22:02.372Z"
doc_updated_by: "CODER"
description: "Regression fix: when task artifacts are generated or left untracked during recovery/closeout, deterministic close commits must include the active task artifact scope or block before marking closure complete."
sections:
  Summary: |-
    Close commits must include all task artifacts

    Regression fix: when task artifacts are generated or left untracked during recovery/closeout, deterministic close commits must include the active task artifact scope or block before marking closure complete.
  Scope: |-
    - In scope: Regression fix: when task artifacts are generated or left untracked during recovery/closeout, deterministic close commits must include the active task artifact scope or block before marking closure complete.
    - Out of scope: unrelated refactors not required for "Close commits must include all task artifacts".
  Plan: |-
    1. Reproduce the recovery closeout gap with a regression test: task-local non-README artifacts must not remain uncommitted after close/finish close-tail.
    2. Update deterministic close commit behavior so close commits stage the full active task artifact scope where allowed, not only README.md, or fail before closure state is recorded.
    3. Refresh command/help wording if it still says close commits stage only README.md.
    4. Verify with the focused lifecycle/guard tests, routing validation, and final git status --short --untracked-files=all.
  Verify Steps: |-
    1. Run: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts. Expected: close commit unit coverage passes, including staging non-README active task artifacts.
    2. Run: bun vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts. Expected: CLI wrapper close commit includes task-local evidence files.
    3. Run: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts. Expected: branch_pr close-tail lifecycle remains green.
    4. Run: bun run docs:cli:check. Expected: generated CLI reference is fresh after wording changes.
    5. Run: node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
    6. Run: git status --short --untracked-files=all. Expected: only intentional task-scoped changes remain before commit/PR handoff.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-01T08:22:02.358Z — VERIFY — ok

    By: CODER

    Note: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts => pass, 12 tests; Command: bun vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts => pass, 5 tests; Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts => pass, 13 tests; Command: bun run docs:cli:check => pass; Command: node .agentplane/policy/check-routing.mjs => policy routing OK; Command: git diff --check => pass; Command: git status --short --untracked-files=all => only intentional task implementation and task evidence changes remain.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T08:21:24.511Z, excerpt_hash=sha256:320c3cef8e900ee8394adfe9e1ab3d9d2dfdd0d3ce33226b3d6529f4b0177289

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010805-1H64FF-close-commits-must-include-all-task-artifacts/.agentplane/tasks/202606010805-1H64FF/blueprint/resolved-snapshot.json
    - old_digest: a7888ca1aacbc0f7564dd2b53435b003bd648a9dfb9697fa8950bdbadd2ea095
    - current_digest: a7888ca1aacbc0f7564dd2b53435b003bd648a9dfb9697fa8950bdbadd2ea095
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606010805-1H64FF

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Close commits must include all task artifacts

Regression fix: when task artifacts are generated or left untracked during recovery/closeout, deterministic close commits must include the active task artifact scope or block before marking closure complete.

## Scope

- In scope: Regression fix: when task artifacts are generated or left untracked during recovery/closeout, deterministic close commits must include the active task artifact scope or block before marking closure complete.
- Out of scope: unrelated refactors not required for "Close commits must include all task artifacts".

## Plan

1. Reproduce the recovery closeout gap with a regression test: task-local non-README artifacts must not remain uncommitted after close/finish close-tail.
2. Update deterministic close commit behavior so close commits stage the full active task artifact scope where allowed, not only README.md, or fail before closure state is recorded.
3. Refresh command/help wording if it still says close commits stage only README.md.
4. Verify with the focused lifecycle/guard tests, routing validation, and final git status --short --untracked-files=all.

## Verify Steps

1. Run: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts. Expected: close commit unit coverage passes, including staging non-README active task artifacts.
2. Run: bun vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts. Expected: CLI wrapper close commit includes task-local evidence files.
3. Run: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts. Expected: branch_pr close-tail lifecycle remains green.
4. Run: bun run docs:cli:check. Expected: generated CLI reference is fresh after wording changes.
5. Run: node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
6. Run: git status --short --untracked-files=all. Expected: only intentional task-scoped changes remain before commit/PR handoff.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-01T08:22:02.358Z — VERIFY — ok

By: CODER

Note: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/guard/impl/commands.commit-close.unit.test.ts => pass, 12 tests; Command: bun vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts => pass, 5 tests; Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts => pass, 13 tests; Command: bun run docs:cli:check => pass; Command: node .agentplane/policy/check-routing.mjs => policy routing OK; Command: git diff --check => pass; Command: git status --short --untracked-files=all => only intentional task implementation and task evidence changes remain.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T08:21:24.511Z, excerpt_hash=sha256:320c3cef8e900ee8394adfe9e1ab3d9d2dfdd0d3ce33226b3d6529f4b0177289

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010805-1H64FF-close-commits-must-include-all-task-artifacts/.agentplane/tasks/202606010805-1H64FF/blueprint/resolved-snapshot.json
- old_digest: a7888ca1aacbc0f7564dd2b53435b003bd648a9dfb9697fa8950bdbadd2ea095
- current_digest: a7888ca1aacbc0f7564dd2b53435b003bd648a9dfb9697fa8950bdbadd2ea095
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606010805-1H64FF

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
