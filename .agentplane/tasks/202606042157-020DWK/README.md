---
id: "202606042157-020DWK"
title: "Reduce agent cognitive load and publish next patch"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "cli"
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-04T21:57:46.974Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-04T22:02:08.859Z"
  updated_by: "CODER"
  note: "Verified: route packet refactor keeps hybrid PR update on CODER rail, surfaces evidence_missing in text output, and preserves PR check diagnostics."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing approved CLI context refactor and patch release preparation from the dedicated branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-06-04T21:58:09.964Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing approved CLI context refactor and patch release preparation from the dedicated branch_pr worktree."
  -
    type: "verify"
    at: "2026-06-04T22:02:08.859Z"
    author: "CODER"
    state: "ok"
    note: "Verified: route packet refactor keeps hybrid PR update on CODER rail, surfaces evidence_missing in text output, and preserves PR check diagnostics."
doc_version: 3
doc_updated_at: "2026-06-04T22:02:08.956Z"
doc_updated_by: "CODER"
description: "Refactor current CLI context surfaces so agents receive direct next-step guidance, verify route/brief/diagnostic output, then prepare and publish the next patch release."
sections:
  Summary: |-
    Reduce agent cognitive load and publish next patch

    Refactor current CLI context surfaces so agents receive direct next-step guidance, verify route/brief/diagnostic output, then prepare and publish the next patch release.
  Scope: |-
    - In scope: Refactor current CLI context surfaces so agents receive direct next-step guidance, verify route/brief/diagnostic output, then prepare and publish the next patch release.
    - Out of scope: unrelated refactors not required for "Reduce agent cognitive load and publish next patch".
  Plan: |-
    Scope: reduce agent cognitive load in CLI context surfaces and ship the next patch release.

    Plan:
    1. Audit current agent-facing CLI surfaces: quickstart, role output, task brief, task next-action, PR/check diagnostics, runner handoff context, and release next-action.
    2. Identify remaining ambiguity where output lacks one exact next command, source-of-truth labels, stop rules, or recovery guidance.
    3. Refactor the narrow shared CLI/context code paths to make next-step packets more direct while preserving branch_pr lifecycle semantics.
    4. Add focused tests that assert direct command guidance, no stale-route ambiguity, and clear release/PR handoff context.
    5. Verify with task verify-show, focused tests, typecheck/build/policy routing, and selected end-to-end CLI readbacks.
    6. Open and merge the branch_pr task PR, then generate the patch release candidate, merge it, dispatch publish, and verify GitHub/npm/tag release truth.
  Verify Steps: |-
    1. Run focused route packet tests. Expected: hybrid verify_or_update_pr routes keep recommended_role=CODER, verification_candidate=agentplane pr check <task-id>, and PR freshness guidance remains non-repeatable.
    2. Build the agentplane CLI package. Expected: TypeScript declarations and bundled CLI dist are regenerated without build errors.
    3. Run live task next-action and task brief readbacks for this task. Expected: text output includes recommended_role=CODER, diagnostic_command=agentplane pr check <task-id>, evidence_missing=verification_record, exact_argv, return_control_when, and stale_state_check.
    4. Run routing policy and relevant static checks. Expected: no policy or type regressions in touched CLI route surfaces.
    5. Complete branch_pr PR merge and release workflow. Expected: next patch tag, GitHub release, and npm package version are externally verified.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-04T22:02:08.859Z — VERIFY — ok

    By: CODER

    Note: Verified: route packet refactor keeps hybrid PR update on CODER rail, surfaces evidence_missing in text output, and preserves PR check diagnostics.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T22:01:35.830Z, excerpt_hash=sha256:3604b996298f04d51f02a4b990aff27a901545ed0b678b6ba54ccc0a6d16e5bd

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042157-020DWK-reduce-agent-cognitive-load-and-publish-next-pat/.agentplane/tasks/202606042157-020DWK/blueprint/resolved-snapshot.json
    - old_digest: 7db1b6be80078bbe5d85a8782e00954e42f74591a72616ad1a7db755f05bb18c
    - current_digest: 7db1b6be80078bbe5d85a8782e00954e42f74591a72616ad1a7db755f05bb18c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606042157-020DWK

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606042157-020DWK
    - diagnostic_command: agentplane pr check 202606042157-020DWK
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - runner_required: false
    - runner_failure_means: not_runner_route
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest run packages/agentplane/src/commands/shared/route-oracle.test.ts packages/agentplane/src/commands/shared/route-guidance.test.ts. Result: pass. Evidence: 2 files, 7 tests passed. Scope: route execution packet and operator guidance.\nCommand: npm run build in packages/agentplane. Result: pass. Evidence: tsc -b --force and tsup bundle success. Scope: CLI declarations and dist.\nCommand: npm run typecheck in packages/agentplane. Result: pass. Evidence: tsc -b completed. Scope: agentplane TypeScript.\nCommand: ap task next-action 202606042157-020DWK --explain and ap task brief 202606042157-020DWK. Result: pass. Evidence: text output includes recommended_role=CODER, diagnostic_command=agentplane pr check 202606042157-020DWK, evidence_missing=verification_record, exact_argv, return_control_when, and stale_state_check. Scope: live CLI route readback.\nCommand: node .agentplane/policy/check-routing.mjs and git diff --check. Result: pass. Evidence: policy routing OK and no whitespace errors. Scope: policy routing and diff hygiene.
      Impact: Agents no longer need to infer that verify_or_update_pr is still a CODER-owned PR artifact step, and missing verification evidence is visible in the plain-text route packet.
      Resolution: Special-cased hybrid PR artifact routes before generic verify role inference, changed the hybrid verification candidate to pr check, and rendered evidence_missing in task brief and next-action output.
extensions:
  branch_pr_batch:
    base: "main"
    branch: "task/202606042157-020DWK/reduce-agent-cognitive-load-and-publish-next-pat"
    included_task_ids:
      - "202606042204-NX58GD"
      - "202606042214-GEJ627"
    primary_task_id: "202606042157-020DWK"
    role: "primary"
    updated_at: "2026-06-04T22:17:13.237Z"
id_source: "generated"
---
## Summary

Reduce agent cognitive load and publish next patch

Refactor current CLI context surfaces so agents receive direct next-step guidance, verify route/brief/diagnostic output, then prepare and publish the next patch release.

## Scope

- In scope: Refactor current CLI context surfaces so agents receive direct next-step guidance, verify route/brief/diagnostic output, then prepare and publish the next patch release.
- Out of scope: unrelated refactors not required for "Reduce agent cognitive load and publish next patch".

## Plan

Scope: reduce agent cognitive load in CLI context surfaces and ship the next patch release.

Plan:
1. Audit current agent-facing CLI surfaces: quickstart, role output, task brief, task next-action, PR/check diagnostics, runner handoff context, and release next-action.
2. Identify remaining ambiguity where output lacks one exact next command, source-of-truth labels, stop rules, or recovery guidance.
3. Refactor the narrow shared CLI/context code paths to make next-step packets more direct while preserving branch_pr lifecycle semantics.
4. Add focused tests that assert direct command guidance, no stale-route ambiguity, and clear release/PR handoff context.
5. Verify with task verify-show, focused tests, typecheck/build/policy routing, and selected end-to-end CLI readbacks.
6. Open and merge the branch_pr task PR, then generate the patch release candidate, merge it, dispatch publish, and verify GitHub/npm/tag release truth.

## Verify Steps

1. Run focused route packet tests. Expected: hybrid verify_or_update_pr routes keep recommended_role=CODER, verification_candidate=agentplane pr check <task-id>, and PR freshness guidance remains non-repeatable.
2. Build the agentplane CLI package. Expected: TypeScript declarations and bundled CLI dist are regenerated without build errors.
3. Run live task next-action and task brief readbacks for this task. Expected: text output includes recommended_role=CODER, diagnostic_command=agentplane pr check <task-id>, evidence_missing=verification_record, exact_argv, return_control_when, and stale_state_check.
4. Run routing policy and relevant static checks. Expected: no policy or type regressions in touched CLI route surfaces.
5. Complete branch_pr PR merge and release workflow. Expected: next patch tag, GitHub release, and npm package version are externally verified.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-04T22:02:08.859Z — VERIFY — ok

By: CODER

Note: Verified: route packet refactor keeps hybrid PR update on CODER rail, surfaces evidence_missing in text output, and preserves PR check diagnostics.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T22:01:35.830Z, excerpt_hash=sha256:3604b996298f04d51f02a4b990aff27a901545ed0b678b6ba54ccc0a6d16e5bd

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042157-020DWK-reduce-agent-cognitive-load-and-publish-next-pat/.agentplane/tasks/202606042157-020DWK/blueprint/resolved-snapshot.json
- old_digest: 7db1b6be80078bbe5d85a8782e00954e42f74591a72616ad1a7db755f05bb18c
- current_digest: 7db1b6be80078bbe5d85a8782e00954e42f74591a72616ad1a7db755f05bb18c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606042157-020DWK

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606042157-020DWK
- diagnostic_command: agentplane pr check 202606042157-020DWK
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- runner_required: false
- runner_failure_means: not_runner_route
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bunx vitest run packages/agentplane/src/commands/shared/route-oracle.test.ts packages/agentplane/src/commands/shared/route-guidance.test.ts. Result: pass. Evidence: 2 files, 7 tests passed. Scope: route execution packet and operator guidance.\nCommand: npm run build in packages/agentplane. Result: pass. Evidence: tsc -b --force and tsup bundle success. Scope: CLI declarations and dist.\nCommand: npm run typecheck in packages/agentplane. Result: pass. Evidence: tsc -b completed. Scope: agentplane TypeScript.\nCommand: ap task next-action 202606042157-020DWK --explain and ap task brief 202606042157-020DWK. Result: pass. Evidence: text output includes recommended_role=CODER, diagnostic_command=agentplane pr check 202606042157-020DWK, evidence_missing=verification_record, exact_argv, return_control_when, and stale_state_check. Scope: live CLI route readback.\nCommand: node .agentplane/policy/check-routing.mjs and git diff --check. Result: pass. Evidence: policy routing OK and no whitespace errors. Scope: policy routing and diff hygiene.
  Impact: Agents no longer need to infer that verify_or_update_pr is still a CODER-owned PR artifact step, and missing verification evidence is visible in the plain-text route packet.
  Resolution: Special-cased hybrid PR artifact routes before generic verify role inference, changed the hybrid verification candidate to pr check, and rendered evidence_missing in task brief and next-action output.
