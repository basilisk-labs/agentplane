---
id: "202605141957-FB780T"
title: "Fix remote-check wait helper timeout contract (issue #3760)"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T19:57:20.323Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T20:01:46.438Z"
  updated_by: "CODER"
  note: "Re-verified after replacing fallback Verify Steps with task-specific checks; all previously run focused code/docs/workflow checks remain passing."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing issue #3760 by aligning workflow:wait-remote-checks timeout/timing CLI contract with docs and focused verification in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-05-14T19:57:37.037Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing issue #3760 by aligning workflow:wait-remote-checks timeout/timing CLI contract with docs and focused verification in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-05-14T20:00:43.102Z"
    author: "CODER"
    state: "ok"
    note: "Implemented issue #3760: workflow:wait-remote-checks now accepts --timeout-ms, help documents timing controls, docs no longer describe the helper as raw gh delegation, and focused checks passed."
  -
    type: "verify"
    at: "2026-05-14T20:01:46.438Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified after replacing fallback Verify Steps with task-specific checks; all previously run focused code/docs/workflow checks remain passing."
doc_version: 3
doc_updated_at: "2026-05-14T20:01:46.465Z"
doc_updated_by: "CODER"
description: "Align workflow:wait-remote-checks CLI contract with branch_pr policy/docs so timeout guidance is explicit and tested. GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3760"
sections:
  Summary: |-
    Fix remote-check wait helper timeout contract (issue #3760)

    Align workflow:wait-remote-checks CLI contract with branch_pr policy/docs so timeout guidance is explicit and tested. GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3760
  Scope: |-
    - In scope: Align workflow:wait-remote-checks CLI contract with branch_pr policy/docs so timeout guidance is explicit and tested. GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3760.
    - Out of scope: unrelated refactors not required for "Fix remote-check wait helper timeout contract (issue #3760)".
  Plan: |-
    Scope:
    1. Link GitHub issue #3760 and the AgentPlane task as the traceability pair.
    2. Update workflow:wait-remote-checks so its supported timeout/timing contract is explicit and machine-covered.
    3. Align user docs/policy-adjacent guidance so --timeout-ms is not misapplied from integrate queue waiting to remote-check waiting.
    4. Verify with focused tests/help output checks plus required routing/doctor checks.
    5. Publish through branch_pr PR, wait for hosted checks, merge, and finish/close through the protected-base route.

    Implementation approach:
    - Prefer adding a supported --timeout-ms alias to the helper if it maps cleanly to existing interval/max-attempt polling; otherwise document env controls and reject --timeout-ms intentionally.
    - Keep changes scoped to scripts/workflow/wait-remote-pr-checks.mjs, focused tests/docs, and task/PR artifacts.

    Verification:
    - agentplane task verify-show 202605141957-FB780T
    - focused test for wait-remote-pr-checks argument parsing/help behavior
    - bun run workflow:wait-remote-checks -- --help
    - node .agentplane/policy/check-routing.mjs
    - agentplane doctor
  Verify Steps: |-
    1. Run `bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts`. Expected: focused wait-remote-pr-checks tests pass, including --timeout-ms coverage.
    2. Run `bun run workflow:wait-remote-checks -- --help`. Expected: help lists --timeout-ms and AGENTPLANE_REMOTE_CHECK_* timing controls.
    3. Run formatting, docs, workflow, lint, policy routing, and doctor checks for changed scope. Expected: all pass, with only unrelated pre-existing doctor warnings if present.
    4. Publish the branch_pr PR, wait for hosted required checks, merge through GitHub, then finish/close the task with the implementation commit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T20:00:43.102Z — VERIFY — ok

    By: CODER

    Note: Implemented issue #3760: workflow:wait-remote-checks now accepts --timeout-ms, help documents timing controls, docs no longer describe the helper as raw gh delegation, and focused checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T19:57:37.037Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141957-FB780T-remote-check-timeout-contract/.agentplane/tasks/202605141957-FB780T/blueprint/resolved-snapshot.json
    - old_digest: c866fede321f158d320f481427dd68025bfac8a660a617bd78d7660be107c6aa
    - current_digest: c866fede321f158d320f481427dd68025bfac8a660a617bd78d7660be107c6aa
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141957-FB780T

    ### 2026-05-14T20:01:46.438Z — VERIFY — ok

    By: CODER

    Note: Re-verified after replacing fallback Verify Steps with task-specific checks; all previously run focused code/docs/workflow checks remain passing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T20:01:32.440Z, excerpt_hash=sha256:1a3cc6df4a1da3d0c7311c05090340b5d9caf607483a6fa32d129409d59ec919

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141957-FB780T-remote-check-timeout-contract/.agentplane/tasks/202605141957-FB780T/blueprint/resolved-snapshot.json
    - old_digest: c866fede321f158d320f481427dd68025bfac8a660a617bd78d7660be107c6aa
    - current_digest: c866fede321f158d320f481427dd68025bfac8a660a617bd78d7660be107c6aa
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141957-FB780T

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts
    Result: pass
    Evidence: 1 file passed, 17 tests passed, including accepts --timeout-ms as an idle poll budget derived from the poll interval.
    Scope: wait-remote-pr-checks parser/help/polling behavior.

    Command: bun run workflow:wait-remote-checks -- --help
    Result: pass
    Evidence: help lists --timeout-ms and AGENTPLANE_REMOTE_CHECK_* timing environment.
    Scope: CLI helper user-facing contract.

    Command: ./node_modules/.bin/prettier --check scripts/workflow/wait-remote-pr-checks.mjs packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts docs/user/commands.mdx docs/user/branching-and-pr-artifacts.mdx
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: changed files.

    Command: bun run docs:ia:check
    Result: pass
    Evidence: docs IA, sidebar coverage, and current path references are aligned.
    Scope: docs changes.

    Command: bun run workflows:command-check
    Result: pass
    Evidence: workflow and command guidance contract OK; workflow lifecycle parity OK; critical Vitest route OK.
    Scope: workflow command guidance.

    Command: ./node_modules/.bin/eslint scripts/workflow/wait-remote-pr-checks.mjs packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts
    Result: pass
    Evidence: no lint output.
    Scope: changed script and test.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy routing contract.

    Command: agentplane doctor
    Result: pass
    Evidence: doctor (OK); unrelated pre-existing branch_pr task artifact warnings remain.
    Scope: repository workflow/runtime health.
      Impact: Remote-check waiting now supports the timeout-style operator contract that agents may carry over from branch_pr queue guidance.
      Resolution: Added --timeout-ms parsing and help text; converted timeout to idle poll attempts using the configured poll interval; updated docs and focused tests.

    - Observation: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts
    Result: pass
    Evidence: 1 file passed, 17 tests passed.
    Scope: wait-remote-pr-checks parser/help/polling behavior.

    Command: bun run workflow:wait-remote-checks -- --help
    Result: pass
    Evidence: help lists --timeout-ms and AGENTPLANE_REMOTE_CHECK_* timing environment.
    Scope: CLI helper contract.

    Command: ./node_modules/.bin/prettier --check scripts/workflow/wait-remote-pr-checks.mjs packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts docs/user/commands.mdx docs/user/branching-and-pr-artifacts.mdx
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: changed files.

    Command: bun run docs:ia:check
    Result: pass
    Evidence: docs IA, sidebar coverage, and current path references are aligned.
    Scope: docs changes.

    Command: bun run workflows:command-check
    Result: pass
    Evidence: workflow and command guidance contract OK; workflow lifecycle parity OK; critical Vitest route OK.
    Scope: workflow command guidance.

    Command: ./node_modules/.bin/eslint scripts/workflow/wait-remote-pr-checks.mjs packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts
    Result: pass
    Evidence: no lint output.
    Scope: changed script/test.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy routing.

    Command: agentplane doctor
    Result: pass
    Evidence: doctor (OK); unrelated pre-existing branch_pr artifact warnings remain.
    Scope: workflow/runtime health.
      Impact: Task-specific Verify Steps now match the executed checks and issue #3760 acceptance criteria.
      Resolution: Replaced fallback Verify Steps and recorded verification against the updated task document.
id_source: "generated"
---
## Summary

Fix remote-check wait helper timeout contract (issue #3760)

Align workflow:wait-remote-checks CLI contract with branch_pr policy/docs so timeout guidance is explicit and tested. GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3760

## Scope

- In scope: Align workflow:wait-remote-checks CLI contract with branch_pr policy/docs so timeout guidance is explicit and tested. GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3760.
- Out of scope: unrelated refactors not required for "Fix remote-check wait helper timeout contract (issue #3760)".

## Plan

Scope:
1. Link GitHub issue #3760 and the AgentPlane task as the traceability pair.
2. Update workflow:wait-remote-checks so its supported timeout/timing contract is explicit and machine-covered.
3. Align user docs/policy-adjacent guidance so --timeout-ms is not misapplied from integrate queue waiting to remote-check waiting.
4. Verify with focused tests/help output checks plus required routing/doctor checks.
5. Publish through branch_pr PR, wait for hosted checks, merge, and finish/close through the protected-base route.

Implementation approach:
- Prefer adding a supported --timeout-ms alias to the helper if it maps cleanly to existing interval/max-attempt polling; otherwise document env controls and reject --timeout-ms intentionally.
- Keep changes scoped to scripts/workflow/wait-remote-pr-checks.mjs, focused tests/docs, and task/PR artifacts.

Verification:
- agentplane task verify-show 202605141957-FB780T
- focused test for wait-remote-pr-checks argument parsing/help behavior
- bun run workflow:wait-remote-checks -- --help
- node .agentplane/policy/check-routing.mjs
- agentplane doctor

## Verify Steps

1. Run `bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts`. Expected: focused wait-remote-pr-checks tests pass, including --timeout-ms coverage.
2. Run `bun run workflow:wait-remote-checks -- --help`. Expected: help lists --timeout-ms and AGENTPLANE_REMOTE_CHECK_* timing controls.
3. Run formatting, docs, workflow, lint, policy routing, and doctor checks for changed scope. Expected: all pass, with only unrelated pre-existing doctor warnings if present.
4. Publish the branch_pr PR, wait for hosted required checks, merge through GitHub, then finish/close the task with the implementation commit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T20:00:43.102Z — VERIFY — ok

By: CODER

Note: Implemented issue #3760: workflow:wait-remote-checks now accepts --timeout-ms, help documents timing controls, docs no longer describe the helper as raw gh delegation, and focused checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T19:57:37.037Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141957-FB780T-remote-check-timeout-contract/.agentplane/tasks/202605141957-FB780T/blueprint/resolved-snapshot.json
- old_digest: c866fede321f158d320f481427dd68025bfac8a660a617bd78d7660be107c6aa
- current_digest: c866fede321f158d320f481427dd68025bfac8a660a617bd78d7660be107c6aa
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141957-FB780T

### 2026-05-14T20:01:46.438Z — VERIFY — ok

By: CODER

Note: Re-verified after replacing fallback Verify Steps with task-specific checks; all previously run focused code/docs/workflow checks remain passing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T20:01:32.440Z, excerpt_hash=sha256:1a3cc6df4a1da3d0c7311c05090340b5d9caf607483a6fa32d129409d59ec919

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141957-FB780T-remote-check-timeout-contract/.agentplane/tasks/202605141957-FB780T/blueprint/resolved-snapshot.json
- old_digest: c866fede321f158d320f481427dd68025bfac8a660a617bd78d7660be107c6aa
- current_digest: c866fede321f158d320f481427dd68025bfac8a660a617bd78d7660be107c6aa
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141957-FB780T

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts
Result: pass
Evidence: 1 file passed, 17 tests passed, including accepts --timeout-ms as an idle poll budget derived from the poll interval.
Scope: wait-remote-pr-checks parser/help/polling behavior.

Command: bun run workflow:wait-remote-checks -- --help
Result: pass
Evidence: help lists --timeout-ms and AGENTPLANE_REMOTE_CHECK_* timing environment.
Scope: CLI helper user-facing contract.

Command: ./node_modules/.bin/prettier --check scripts/workflow/wait-remote-pr-checks.mjs packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts docs/user/commands.mdx docs/user/branching-and-pr-artifacts.mdx
Result: pass
Evidence: All matched files use Prettier code style.
Scope: changed files.

Command: bun run docs:ia:check
Result: pass
Evidence: docs IA, sidebar coverage, and current path references are aligned.
Scope: docs changes.

Command: bun run workflows:command-check
Result: pass
Evidence: workflow and command guidance contract OK; workflow lifecycle parity OK; critical Vitest route OK.
Scope: workflow command guidance.

Command: ./node_modules/.bin/eslint scripts/workflow/wait-remote-pr-checks.mjs packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts
Result: pass
Evidence: no lint output.
Scope: changed script and test.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy routing contract.

Command: agentplane doctor
Result: pass
Evidence: doctor (OK); unrelated pre-existing branch_pr task artifact warnings remain.
Scope: repository workflow/runtime health.
  Impact: Remote-check waiting now supports the timeout-style operator contract that agents may carry over from branch_pr queue guidance.
  Resolution: Added --timeout-ms parsing and help text; converted timeout to idle poll attempts using the configured poll interval; updated docs and focused tests.

- Observation: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts
Result: pass
Evidence: 1 file passed, 17 tests passed.
Scope: wait-remote-pr-checks parser/help/polling behavior.

Command: bun run workflow:wait-remote-checks -- --help
Result: pass
Evidence: help lists --timeout-ms and AGENTPLANE_REMOTE_CHECK_* timing environment.
Scope: CLI helper contract.

Command: ./node_modules/.bin/prettier --check scripts/workflow/wait-remote-pr-checks.mjs packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts docs/user/commands.mdx docs/user/branching-and-pr-artifacts.mdx
Result: pass
Evidence: All matched files use Prettier code style.
Scope: changed files.

Command: bun run docs:ia:check
Result: pass
Evidence: docs IA, sidebar coverage, and current path references are aligned.
Scope: docs changes.

Command: bun run workflows:command-check
Result: pass
Evidence: workflow and command guidance contract OK; workflow lifecycle parity OK; critical Vitest route OK.
Scope: workflow command guidance.

Command: ./node_modules/.bin/eslint scripts/workflow/wait-remote-pr-checks.mjs packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts
Result: pass
Evidence: no lint output.
Scope: changed script/test.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy routing.

Command: agentplane doctor
Result: pass
Evidence: doctor (OK); unrelated pre-existing branch_pr artifact warnings remain.
Scope: workflow/runtime health.
  Impact: Task-specific Verify Steps now match the executed checks and issue #3760 acceptance criteria.
  Resolution: Replaced fallback Verify Steps and recorded verification against the updated task document.
