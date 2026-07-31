---
id: "202607311554-99FMGV"
title: "Allow fast-forward publication before conflict rework"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "conflict-rework"
  - "routing"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run test:critical"
  - "bun run typecheck && bun run format:check && node .agentplane/policy/check-routing.mjs"
  - "bunx vitest run packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T15:54:57.816Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-31T16:24:31.821Z"
  updated_by: "TESTER"
  note: "PASS: structured verification for semantic SHA 5912dc86cc255d9401d0d96d534e23cd3250b0a4."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-31T16:25:56.161Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "5912dc86cc255d9401d0d96d534e23cd3250b0a4"
  blueprint_digest: "0b116101eda2537a3384040ba26116ad6b2b6d0b6bde04285c01b036ffd29b7f"
  evidence_refs:
    - ".agentplane/tasks/202607311554-99FMGV/quality/20260731-162456548-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607311554-99FMGV/quality/20260731-162456548-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607311554-99FMGV/quality/20260731-162456548-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607311554-99FMGV/quality/20260731-162456548-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607311554-99FMGV/quality/20260731-162456548-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607311554-99FMGV/README.md"
    - ".agentplane/tasks/202607311554-99FMGV/quality/20260731-162456548-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607311554-99FMGV/quality/20260731-162456548-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607311554-99FMGV/verification/20260731162431821-aa6efa3315fd2c51.json"
    - ".agentplane/tasks/202607311554-99FMGV/quality/20260731-162456548-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The frozen diff and structured verification record consistently cover guarded fast-forward publication, fail-closed negative cases, and the post-publication CODER handoff; no contract divergence was identified."
commit:
  hash: "2bd765be7322e2bcf393da221f0c8e1a0d07a045"
  message: "🔍 99FMGV task: Record evaluator pass"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation recorded: guarded publication now requires a clean strict descendant and preserves CODER semantic conflict rework after provider alignment."
  -
    author: "CODER"
    body: "Implementation updated: explicit divergent and unrelated-history regression cases plus bounded integration-test timeout."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-31T15:55:47.815Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-31T16:15:48.580Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation recorded: guarded publication now requires a clean strict descendant and preserves CODER semantic conflict rework after provider alignment."
  -
    type: "verify"
    at: "2026-07-31T16:16:14.973Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: semantic SHA a2c70c4504b3d3729e0cc0767e64b796d9d951ba; focused route/publication matrix 21/21, conflict units 38/38, legacy/recovery 22/22, critical CLI 12/12 chunks, typecheck, format, routing, and real CT2725 route projection passed."
  -
    type: "status"
    at: "2026-07-31T16:21:51.662Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation updated: explicit divergent and unrelated-history regression cases plus bounded integration-test timeout."
  -
    type: "verify"
    at: "2026-07-31T16:24:31.821Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: structured verification for semantic SHA 5912dc86cc255d9401d0d96d534e23cd3250b0a4."
  -
    type: "status"
    at: "2026-07-31T16:27:05.274Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-31T16:27:05.275Z"
doc_updated_by: "CODER"
description: "When an OPEN protected-base PR reports conflicts but the local task branch is a clean descendant of the provider head, route the task through guarded PR head publication before preparing the conflict packet. Preserve fail-closed behavior for divergent or unrelated heads, unknown mergeability, dirty worktrees, and semantic conflict resolution."
sections:
  Summary: |-
    Allow fast-forward publication before conflict rework

    When an OPEN protected-base PR reports conflicts but the local task branch is a clean descendant of the provider head, route the task through guarded PR head publication before preparing the conflict packet. Preserve fail-closed behavior for divergent or unrelated heads, unknown mergeability, dirty worktrees, and semantic conflict resolution.
  Scope: |-
    - In scope: When an OPEN protected-base PR reports conflicts but the local task branch is a clean descendant of the provider head, route the task through guarded PR head publication before preparing the conflict packet. Preserve fail-closed behavior for divergent or unrelated heads, unknown mergeability, dirty worktrees, and semantic conflict resolution.
    - Out of scope: unrelated refactors not required for "Allow fast-forward publication before conflict rework".
  Plan: "1. Reproduce the provider-conflict/local-descendant route deadlock. 2. Add an explicit ancestry proof that selects guarded PR head publication only for a clean fast-forward local head. 3. Keep divergent, unknown, and dirty cases terminal and leave semantic conflict resolution to CODER after publication. 4. Add route and command-level regression coverage, run critical/static gates, independent evaluation, and protected-PR integration. 5. Resume CT2725 through the repaired route."
  Verify Steps: |-
    1. Reproduce an OPEN protected-base PR whose provider reports conflicts while the clean local task branch is a strict descendant of the provider head. Expected: next-action selects guarded PR head publication before conflict-packet preparation; no rebase, merge, force-push, or hunk selection occurs.
    2. Cover divergent, unrelated, dirty-worktree, unknown-mergeability, and provider-branch-mismatch cases. Expected: each remains fail-closed and cannot receive publication authority through this route.
    3. Publish the descendant head in the fixture and refresh provider truth. Expected: the provider/local identity matches, the bounded conflict packet can be prepared, and semantic resolution still routes to CODER with fresh verification required afterward.
    4. Run `bunx vitest run packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts`. Expected: route and publication regressions pass.
    5. Run `bun run test:critical`, `bun run typecheck`, `bun run format:check`, `node .agentplane/policy/check-routing.mjs`, and review the final diff. Expected: all gates pass and changes remain bounded to conflict/publication routing plus focused tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-31T16:16:14.973Z — VERIFY — ok

    By: TESTER

    Note: PASS: semantic SHA a2c70c4504b3d3729e0cc0767e64b796d9d951ba; focused route/publication matrix 21/21, conflict units 38/38, legacy/recovery 22/22, critical CLI 12/12 chunks, typecheck, format, routing, and real CT2725 route projection passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T16:15:48.580Z, excerpt_hash=sha256:c1fbf1ebd599a5379cf93aa75fd17b0e1cba6aebd0ef736022215ce82b4fe0a5

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311554-99FMGV-allow-fast-forward-publication-before-conflict-r/.agentplane/tasks/202607311554-99FMGV/blueprint/resolved-snapshot.json
    - old_digest: 0b116101eda2537a3384040ba26116ad6b2b6d0b6bde04285c01b036ffd29b7f
    - current_digest: 0b116101eda2537a3384040ba26116ad6b2b6d0b6bde04285c01b036ffd29b7f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311554-99FMGV

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607311554-99FMGV
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-31T16:24:31.821Z — VERIFY — ok

    By: TESTER

    Note: PASS: structured verification for semantic SHA 5912dc86cc255d9401d0d96d534e23cd3250b0a4.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T16:21:51.662Z, excerpt_hash=sha256:c1fbf1ebd599a5379cf93aa75fd17b0e1cba6aebd0ef736022215ce82b4fe0a5

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts
    Result: pass
    Evidence: 3 files passed; 21 tests passed; 40.66 seconds
    Scope: guarded publication selection, provider alignment to CODER packet, authority flow, legacy adoption, and branch publication safety

    Command: bun test packages/agentplane/src/commands/pr/conflict-rework.test.ts
    Result: pass
    Evidence: 30 tests passed; 84 assertions; divergent and unrelated histories are separate named cases
    Scope: conflict preparation positive and fail-closed matrix including clean descendant, divergent, unrelated, dirty, branch mismatch, unknown mergeability, verified DOING, and base ancestry

    Command: bun test packages/agentplane/src/commands/pr/conflict-rework.legacy-base.test.ts packages/agentplane/src/commands/pr/conflict-rework-recovery.test.ts
    Result: pass
    Evidence: 2 files passed; 22 tests passed; 63 assertions
    Scope: legacy protected-base topology, adoption binding, diverged-head recovery, and no unintended publication

    Command: bun run test:critical
    Result: pass
    Evidence: 12 of 12 critical CLI chunks passed; 76 tests passed at semantic SHA 5912dc86cc255d9401d0d96d534e23cd3250b0a4
    Scope: agent efficiency, exit codes, git edges, protected paths, scope leaks, symlink roots, and trust-boundary ratchets

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build completed with exit code 0
    Scope: all workspace TypeScript projects

    Command: bun run format:check && node .agentplane/policy/check-routing.mjs && git diff --check
    Result: pass
    Evidence: Prettier matched all files; policy routing OK; diff whitespace check clean
    Scope: repository formatting, policy graph, and final patch hygiene

    Command: node packages/agentplane/bin/agentplane.js task next-action 202607311338-CT2725 --remote --json --root control-checkout
    Result: pass
    Evidence: real CT2725 projected approval.pr.head.publish with provider c1a783b40e9d6c622e583e5e1dfebb8f23f088bb and clean local ff68dc96afa7b5e086440d332bd50b3b5623232e
    Scope: live provider conflict deadlock reproduction and guarded fast-forward route selection

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311554-99FMGV-allow-fast-forward-publication-before-conflict-r/.agentplane/tasks/202607311554-99FMGV/blueprint/resolved-snapshot.json
    - old_digest: 0b116101eda2537a3384040ba26116ad6b2b6d0b6bde04285c01b036ffd29b7f
    - current_digest: 0b116101eda2537a3384040ba26116ad6b2b6d0b6bde04285c01b036ffd29b7f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311554-99FMGV

    DecisionContextRef:
    - operator_action: stop
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
  Findings: |-
    - Observation: The prior route stopped on provider/local head mismatch. The repaired route selected approval.pr.head.publish for CT2725 with provider c1a783b40e9d6c622e583e5e1dfebb8f23f088bb and clean local ff68dc96afa7b5e086440d332bd50b3b5623232e.
      Impact: A clean strict descendant can now be published without CLI semantic conflict resolution; divergent, dirty, unknown, and branch-mismatch states remain fail-closed.
      Resolution: Verified guarded ancestry, current verified open-PR rework eligibility, provider-base ancestry, CODER handoff after alignment, and no rebase/merge/force-push/hunk-selection contract.

    - Observation: The blocked evaluation correctly identified missing structured check details and ambiguous negative-case labeling.
      Impact: Without structured details, the evaluator could not freeze deterministic verification evidence despite green checks.
      Resolution: Recorded all commands, pass results, concrete evidence counts, scopes, distinct divergent/unrelated tests, and live CT2725 route proof.
extensions:
  implementation_commit:
    hash: "5912dc86cc255d9401d0d96d534e23cd3250b0a4"
    message: "🧪 99FMGV code: Distinguish divergent and unrelated heads"
  workflow_route_baseline:
    start_head_sha: "3a42f9534b567fb4e86387bbbf6b2984a753bf6f"
    version: 1
id_source: "generated"
---
## Summary

Allow fast-forward publication before conflict rework

When an OPEN protected-base PR reports conflicts but the local task branch is a clean descendant of the provider head, route the task through guarded PR head publication before preparing the conflict packet. Preserve fail-closed behavior for divergent or unrelated heads, unknown mergeability, dirty worktrees, and semantic conflict resolution.

## Scope

- In scope: When an OPEN protected-base PR reports conflicts but the local task branch is a clean descendant of the provider head, route the task through guarded PR head publication before preparing the conflict packet. Preserve fail-closed behavior for divergent or unrelated heads, unknown mergeability, dirty worktrees, and semantic conflict resolution.
- Out of scope: unrelated refactors not required for "Allow fast-forward publication before conflict rework".

## Plan

1. Reproduce the provider-conflict/local-descendant route deadlock. 2. Add an explicit ancestry proof that selects guarded PR head publication only for a clean fast-forward local head. 3. Keep divergent, unknown, and dirty cases terminal and leave semantic conflict resolution to CODER after publication. 4. Add route and command-level regression coverage, run critical/static gates, independent evaluation, and protected-PR integration. 5. Resume CT2725 through the repaired route.

## Verify Steps

1. Reproduce an OPEN protected-base PR whose provider reports conflicts while the clean local task branch is a strict descendant of the provider head. Expected: next-action selects guarded PR head publication before conflict-packet preparation; no rebase, merge, force-push, or hunk selection occurs.
2. Cover divergent, unrelated, dirty-worktree, unknown-mergeability, and provider-branch-mismatch cases. Expected: each remains fail-closed and cannot receive publication authority through this route.
3. Publish the descendant head in the fixture and refresh provider truth. Expected: the provider/local identity matches, the bounded conflict packet can be prepared, and semantic resolution still routes to CODER with fresh verification required afterward.
4. Run `bunx vitest run packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts`. Expected: route and publication regressions pass.
5. Run `bun run test:critical`, `bun run typecheck`, `bun run format:check`, `node .agentplane/policy/check-routing.mjs`, and review the final diff. Expected: all gates pass and changes remain bounded to conflict/publication routing plus focused tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-31T16:16:14.973Z — VERIFY — ok

By: TESTER

Note: PASS: semantic SHA a2c70c4504b3d3729e0cc0767e64b796d9d951ba; focused route/publication matrix 21/21, conflict units 38/38, legacy/recovery 22/22, critical CLI 12/12 chunks, typecheck, format, routing, and real CT2725 route projection passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T16:15:48.580Z, excerpt_hash=sha256:c1fbf1ebd599a5379cf93aa75fd17b0e1cba6aebd0ef736022215ce82b4fe0a5

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311554-99FMGV-allow-fast-forward-publication-before-conflict-r/.agentplane/tasks/202607311554-99FMGV/blueprint/resolved-snapshot.json
- old_digest: 0b116101eda2537a3384040ba26116ad6b2b6d0b6bde04285c01b036ffd29b7f
- current_digest: 0b116101eda2537a3384040ba26116ad6b2b6d0b6bde04285c01b036ffd29b7f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311554-99FMGV

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607311554-99FMGV
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-31T16:24:31.821Z — VERIFY — ok

By: TESTER

Note: PASS: structured verification for semantic SHA 5912dc86cc255d9401d0d96d534e23cd3250b0a4.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T16:21:51.662Z, excerpt_hash=sha256:c1fbf1ebd599a5379cf93aa75fd17b0e1cba6aebd0ef736022215ce82b4fe0a5

Details:

Command: bunx vitest run packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts
Result: pass
Evidence: 3 files passed; 21 tests passed; 40.66 seconds
Scope: guarded publication selection, provider alignment to CODER packet, authority flow, legacy adoption, and branch publication safety

Command: bun test packages/agentplane/src/commands/pr/conflict-rework.test.ts
Result: pass
Evidence: 30 tests passed; 84 assertions; divergent and unrelated histories are separate named cases
Scope: conflict preparation positive and fail-closed matrix including clean descendant, divergent, unrelated, dirty, branch mismatch, unknown mergeability, verified DOING, and base ancestry

Command: bun test packages/agentplane/src/commands/pr/conflict-rework.legacy-base.test.ts packages/agentplane/src/commands/pr/conflict-rework-recovery.test.ts
Result: pass
Evidence: 2 files passed; 22 tests passed; 63 assertions
Scope: legacy protected-base topology, adoption binding, diverged-head recovery, and no unintended publication

Command: bun run test:critical
Result: pass
Evidence: 12 of 12 critical CLI chunks passed; 76 tests passed at semantic SHA 5912dc86cc255d9401d0d96d534e23cd3250b0a4
Scope: agent efficiency, exit codes, git edges, protected paths, scope leaks, symlink roots, and trust-boundary ratchets

Command: bun run typecheck
Result: pass
Evidence: TypeScript build completed with exit code 0
Scope: all workspace TypeScript projects

Command: bun run format:check && node .agentplane/policy/check-routing.mjs && git diff --check
Result: pass
Evidence: Prettier matched all files; policy routing OK; diff whitespace check clean
Scope: repository formatting, policy graph, and final patch hygiene

Command: node packages/agentplane/bin/agentplane.js task next-action 202607311338-CT2725 --remote --json --root control-checkout
Result: pass
Evidence: real CT2725 projected approval.pr.head.publish with provider c1a783b40e9d6c622e583e5e1dfebb8f23f088bb and clean local ff68dc96afa7b5e086440d332bd50b3b5623232e
Scope: live provider conflict deadlock reproduction and guarded fast-forward route selection

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311554-99FMGV-allow-fast-forward-publication-before-conflict-r/.agentplane/tasks/202607311554-99FMGV/blueprint/resolved-snapshot.json
- old_digest: 0b116101eda2537a3384040ba26116ad6b2b6d0b6bde04285c01b036ffd29b7f
- current_digest: 0b116101eda2537a3384040ba26116ad6b2b6d0b6bde04285c01b036ffd29b7f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311554-99FMGV

DecisionContextRef:
- operator_action: stop
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

- Observation: The prior route stopped on provider/local head mismatch. The repaired route selected approval.pr.head.publish for CT2725 with provider c1a783b40e9d6c622e583e5e1dfebb8f23f088bb and clean local ff68dc96afa7b5e086440d332bd50b3b5623232e.
  Impact: A clean strict descendant can now be published without CLI semantic conflict resolution; divergent, dirty, unknown, and branch-mismatch states remain fail-closed.
  Resolution: Verified guarded ancestry, current verified open-PR rework eligibility, provider-base ancestry, CODER handoff after alignment, and no rebase/merge/force-push/hunk-selection contract.

- Observation: The blocked evaluation correctly identified missing structured check details and ambiguous negative-case labeling.
  Impact: Without structured details, the evaluator could not freeze deterministic verification evidence despite green checks.
  Resolution: Recorded all commands, pass results, concrete evidence counts, scopes, distinct divergent/unrelated tests, and live CT2725 route proof.
