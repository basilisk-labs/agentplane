---
id: "202608112213-NWJCBW"
title: "Replace mutable setup and execution profiles with one canonical policy"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "config"
  - "ux"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-11T22:14:03.773Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-11T23:19:46.526Z"
  updated_by: "TESTER"
  note: "PASS for implementation 2b5503e94. Focused behavior, CLI lifecycle, build, generated artifacts, formatting, type and lint contracts passed; overloaded-suite concurrency failures passed in isolated reruns."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "2b5503e9435e355bd282f7f98dff6a61baa2e69e"
  message: "🚧 NWJCBW task: standardize execution policy"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: one canonical standard policy now governs profile-derived runtime behavior; legacy aliases migrate with explicit warnings and cannot weaken or strengthen the process."
events:
  -
    type: "status"
    at: "2026-08-11T22:15:13.616Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-11T23:15:29.858Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: one canonical standard policy now governs profile-derived runtime behavior; legacy aliases migrate with explicit warnings and cannot weaken or strengthen the process."
    commit: "2b5503e9435e355bd282f7f98dff6a61baa2e69e"
  -
    type: "verify"
    at: "2026-08-11T23:19:46.526Z"
    author: "TESTER"
    state: "ok"
    note: "PASS for implementation 2b5503e94. Focused behavior, CLI lifecycle, build, generated artifacts, formatting, type and lint contracts passed; overloaded-suite concurrency failures passed in isolated reruns."
doc_version: 3
doc_updated_at: "2026-08-11T23:19:47.966Z"
doc_updated_by: "CODER"
description: "Remove profile-driven process variants from init, config, and runtime. New and upgraded projects must resolve to one fixed execution policy while legacy profile inputs migrate compatibly without changing workflow, runner, integrations, or explicit project approvals. Preserve task flexibility by making lifecycle and safety invariants fixed instead of imposing arbitrary autonomy tiers."
sections:
  Summary: |-
    Replace mutable setup and execution profiles with one canonical policy

    Remove profile-driven process variants from init, config, and runtime. New and upgraded projects must resolve to one fixed execution policy while legacy profile inputs migrate compatibly without changing workflow, runner, integrations, or explicit project approvals. Preserve task flexibility by making lifecycle and safety invariants fixed instead of imposing arbitrary autonomy tiers.
  Scope: |-
    - In scope: Remove profile-driven process variants from init, config, and runtime. New and upgraded projects must resolve to one fixed execution policy while legacy profile inputs migrate compatibly without changing workflow, runner, integrations, or explicit project approvals. Preserve task flexibility by making lifecycle and safety invariants fixed instead of imposing arbitrary autonomy tiers.
    - Out of scope: unrelated refactors not required for "Replace mutable setup and execution profiles with one canonical policy".
  Plan: |-
    1. Define one canonical execution policy in core configuration. Preserve a legacy-input compatibility boundary for conservative, balanced, aggressive, light, normal, full-harness, and historical aliases, but normalize all of them to the same runtime behavior.
    2. Remove profile selection from interactive init and public command help. Keep workflow, runner, hooks, integrations, and explicit approvals as independent project settings; make deprecated profile flags deterministic compatibility aliases with a visible migration notice.
    3. Replace profile-dependent runtime branches with the canonical policy, keeping lifecycle and safety invariants fixed and removing arbitrary autonomy tier behavior.
    4. Make config readback and writes canonical so users cannot switch process behavior through profile values; retain lossless unrelated WORKFLOW fields.
    5. Update generated schemas, public documentation, fixtures, and tests. Cover fresh init, legacy config load, deprecated CLI input, config mutation rejection/no-op behavior, and runtime equivalence.
    6. Verify focused core/config, init/config CLI, runtime execution-context, prompt projection, schema generation, formatting, and type/lint checks. Record any intentionally retained compatibility surface and residual risk.
  Verify Steps: |-
    1. Run focused core configuration and runtime profile tests. Expected: fresh defaults and every legacy profile input resolve to the same canonical execution policy, with no profile-specific approvals, trace, timeout, or budget behavior.
    2. Run focused init and config CLI tests. Expected: interactive init exposes no setup or execution profile choice; deprecated profile flags are accepted only for compatibility and cannot select weaker or stricter process behavior; independent workflow, runner, hooks, integrations, and explicit approvals remain configurable.
    3. Regenerate and validate published config and CLI schema/docs artifacts. Expected: current public surfaces document one canonical policy, legacy inputs are marked compatibility-only, and generated artifacts match runtime sources.
    4. Run formatting, type checking, lint, and the relevant AgentPlane test shard. Expected: all pass with no unintended tracked or unreviewed untracked changes in the task checkout.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-11T23:19:46.526Z — VERIFY — ok

    By: TESTER

    Note: PASS for implementation 2b5503e94. Focused behavior, CLI lifecycle, build, generated artifacts, formatting, type and lint contracts passed; overloaded-suite concurrency failures passed in isolated reruns.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:1729a9a771942d9da42f2a6d1ee52a4a4172d3cb503a0913402e59118d69b9ba, input_digest=sha256:0906bba12136376503ae52bf72d620d82db6d1c56416469731b7bba3bd3a4365

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane --project core <17 relevant files>
    Result: pass
    Evidence: 17 test files passed; 217 tests passed
    Scope: canonical core config, config IO, init prompts, approvals, harness, execution runtime, prompt/protocol projection, workflow force approval, and state fingerprints

    Command: bunx vitest --config vitest.workspace.ts run --project cli-core <7 relevant files>
    Result: pass
    Evidence: 7 test files passed; 123 tests passed
    Scope: fresh init, legacy setup/execution aliases and warnings, config mutation rejection, lifecycle start/finish, and profile command compatibility

    Command: bun run --filter=agentplane build && bun run typecheck && bun run lint:core && bun run format:changed && bun run schemas:check && bun run docs:cli:check
    Result: pass
    Evidence: AgentPlane bundle built; typecheck, full core lint, formatting, schemas, and generated CLI reference checks completed successfully
    Scope: compile-time contracts, repository lint policy, generated public schemas, and CLI documentation freshness

    Command: isolated reruns of evaluator-execute.command, task-run-active-claim-concurrency, task-run-effect-resolution, and task-run-lifecycle-replay-security
    Result: pass
    Evidence: 4 test files passed; 36 tests passed
    Scope: concurrent provider start, active-claim serialization, effect retirement, and replay security after monolithic-suite resource timeouts

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112213-NWJCBW-replace-mutable-setup-and-execution-profiles-wit/.agentplane/tasks/202608112213-NWJCBW/blueprint/resolved-snapshot.json
    - old_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
    - current_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608112213-NWJCBW

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608112213-NWJCBW
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "Implementation finding: task creation omitted explicit structured intent and defaulted this code change to the ops.approval blueprint; task 202608112232-3NC7Y4 will replace that guessing boundary with an agent-declared, deterministically enforced execution contract. Verification finding: the monolithic test:fast run completed 4,027 passing tests but oversubscribed concurrent process tests, producing seven isolated timeout/race failures; all seven passed when rerun in their owning files (36/36). The five remaining failures were obsolete force/profile expectations and now pass with the fixed standard-policy contract (74/74). This is retained as input to the final check-efficiency task."
extensions:
  workflow_route_baseline:
    start_head_sha: "206b349e8dd08051f695d68f8558db94b2e23cb5"
    version: 1
id_source: "generated"
---
## Summary

Replace mutable setup and execution profiles with one canonical policy

Remove profile-driven process variants from init, config, and runtime. New and upgraded projects must resolve to one fixed execution policy while legacy profile inputs migrate compatibly without changing workflow, runner, integrations, or explicit project approvals. Preserve task flexibility by making lifecycle and safety invariants fixed instead of imposing arbitrary autonomy tiers.

## Scope

- In scope: Remove profile-driven process variants from init, config, and runtime. New and upgraded projects must resolve to one fixed execution policy while legacy profile inputs migrate compatibly without changing workflow, runner, integrations, or explicit project approvals. Preserve task flexibility by making lifecycle and safety invariants fixed instead of imposing arbitrary autonomy tiers.
- Out of scope: unrelated refactors not required for "Replace mutable setup and execution profiles with one canonical policy".

## Plan

1. Define one canonical execution policy in core configuration. Preserve a legacy-input compatibility boundary for conservative, balanced, aggressive, light, normal, full-harness, and historical aliases, but normalize all of them to the same runtime behavior.
2. Remove profile selection from interactive init and public command help. Keep workflow, runner, hooks, integrations, and explicit approvals as independent project settings; make deprecated profile flags deterministic compatibility aliases with a visible migration notice.
3. Replace profile-dependent runtime branches with the canonical policy, keeping lifecycle and safety invariants fixed and removing arbitrary autonomy tier behavior.
4. Make config readback and writes canonical so users cannot switch process behavior through profile values; retain lossless unrelated WORKFLOW fields.
5. Update generated schemas, public documentation, fixtures, and tests. Cover fresh init, legacy config load, deprecated CLI input, config mutation rejection/no-op behavior, and runtime equivalence.
6. Verify focused core/config, init/config CLI, runtime execution-context, prompt projection, schema generation, formatting, and type/lint checks. Record any intentionally retained compatibility surface and residual risk.

## Verify Steps

1. Run focused core configuration and runtime profile tests. Expected: fresh defaults and every legacy profile input resolve to the same canonical execution policy, with no profile-specific approvals, trace, timeout, or budget behavior.
2. Run focused init and config CLI tests. Expected: interactive init exposes no setup or execution profile choice; deprecated profile flags are accepted only for compatibility and cannot select weaker or stricter process behavior; independent workflow, runner, hooks, integrations, and explicit approvals remain configurable.
3. Regenerate and validate published config and CLI schema/docs artifacts. Expected: current public surfaces document one canonical policy, legacy inputs are marked compatibility-only, and generated artifacts match runtime sources.
4. Run formatting, type checking, lint, and the relevant AgentPlane test shard. Expected: all pass with no unintended tracked or unreviewed untracked changes in the task checkout.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-11T23:19:46.526Z — VERIFY — ok

By: TESTER

Note: PASS for implementation 2b5503e94. Focused behavior, CLI lifecycle, build, generated artifacts, formatting, type and lint contracts passed; overloaded-suite concurrency failures passed in isolated reruns.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:1729a9a771942d9da42f2a6d1ee52a4a4172d3cb503a0913402e59118d69b9ba, input_digest=sha256:0906bba12136376503ae52bf72d620d82db6d1c56416469731b7bba3bd3a4365

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane --project core <17 relevant files>
Result: pass
Evidence: 17 test files passed; 217 tests passed
Scope: canonical core config, config IO, init prompts, approvals, harness, execution runtime, prompt/protocol projection, workflow force approval, and state fingerprints

Command: bunx vitest --config vitest.workspace.ts run --project cli-core <7 relevant files>
Result: pass
Evidence: 7 test files passed; 123 tests passed
Scope: fresh init, legacy setup/execution aliases and warnings, config mutation rejection, lifecycle start/finish, and profile command compatibility

Command: bun run --filter=agentplane build && bun run typecheck && bun run lint:core && bun run format:changed && bun run schemas:check && bun run docs:cli:check
Result: pass
Evidence: AgentPlane bundle built; typecheck, full core lint, formatting, schemas, and generated CLI reference checks completed successfully
Scope: compile-time contracts, repository lint policy, generated public schemas, and CLI documentation freshness

Command: isolated reruns of evaluator-execute.command, task-run-active-claim-concurrency, task-run-effect-resolution, and task-run-lifecycle-replay-security
Result: pass
Evidence: 4 test files passed; 36 tests passed
Scope: concurrent provider start, active-claim serialization, effect retirement, and replay security after monolithic-suite resource timeouts

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112213-NWJCBW-replace-mutable-setup-and-execution-profiles-wit/.agentplane/tasks/202608112213-NWJCBW/blueprint/resolved-snapshot.json
- old_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
- current_digest: 8021fcfd6ce08a59a1fc26ec9d9c35e27ad50897ba07d24683133e44dea53c61
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608112213-NWJCBW

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608112213-NWJCBW
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

Implementation finding: task creation omitted explicit structured intent and defaulted this code change to the ops.approval blueprint; task 202608112232-3NC7Y4 will replace that guessing boundary with an agent-declared, deterministically enforced execution contract. Verification finding: the monolithic test:fast run completed 4,027 passing tests but oversubscribed concurrent process tests, producing seven isolated timeout/race failures; all seven passed when rerun in their owning files (36/36). The five remaining failures were obsolete force/profile expectations and now pass with the fixed standard-policy contract (74/74). This is retained as input to the final check-efficiency task.
