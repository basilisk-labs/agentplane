---
id: "202606121018-WQSARQ"
title: "Persist loop per-step evidence and prompt identity"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202606121018-5PS44M"
tags:
  - "code"
  - "evidence"
  - "loops"
  - "prompts"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run --filter=agentplane build"
  - "bun run --filter=agentplane test -- packages/agentplane/src/loops packages/agentplane/src/commands/loop"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T10:22:40.138Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-12T11:05:53.114Z"
  updated_by: "CODER"
  note: "Per-step dry-run evidence and prompt identity implemented on agentplane-loops. Verified with focused loop tests, package build, format check, policy routing, and a real dry-run smoke for tdd.fix."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement per-step loop evidence and prompt identity on agentplane-loops as the branch-local trunk. Force override is intentional because the standard branch_pr route still targets main while this loops version uses agentplane-loops as the base."
events:
  -
    type: "status"
    at: "2026-06-12T10:58:59.079Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement per-step loop evidence and prompt identity on agentplane-loops as the branch-local trunk. Force override is intentional because the standard branch_pr route still targets main while this loops version uses agentplane-loops as the base."
  -
    type: "verify"
    at: "2026-06-12T11:05:53.114Z"
    author: "CODER"
    state: "ok"
    note: "Per-step dry-run evidence and prompt identity implemented on agentplane-loops. Verified with focused loop tests, package build, format check, policy routing, and a real dry-run smoke for tdd.fix."
doc_version: 3
doc_updated_at: "2026-06-12T11:05:54.952Z"
doc_updated_by: "CODER"
description: "Extend loop dry-run/run artifacts with per-step input/output refs and promptModule identity so later metrics and prompt improvement can audit what each loop step prepared or executed."
sections:
  Summary: |-
    Persist loop per-step evidence and prompt identity

    Extend loop dry-run/run artifacts with per-step input/output refs and promptModule identity so later metrics and prompt improvement can audit what each loop step prepared or executed.
  Scope: |-
    - In scope: Extend loop dry-run/run artifacts with per-step input/output refs and promptModule identity so later metrics and prompt improvement can audit what each loop step prepared or executed.
    - Out of scope: unrelated refactors not required for "Persist loop per-step evidence and prompt identity".
  Plan: |-
    1. Extend LoopRun artifact layout with iterations/<n>/steps/<step-id>/input.json and output.json or ref files for prepared/executed steps.
    2. Persist promptModule identity for prompt-rendered steps: module id, version/source path when known, rendered prompt hash, and loop spec sha.
    3. Emit step.prepared/step.skipped events in events.jsonl with stable refs to step artifacts.
    4. Keep dry-run behavior non-executing: artifacts may contain placeholders/refs but must not call external agent adapters.
    5. Add tests that assert deterministic artifact paths, valid JSON, and task-local-only mutation.
  Verify Steps: |-
    1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops packages/agentplane/src/commands/loop`. Expected: dry-run artifacts include per-step input/output refs and prompt identity where promptModule is present.
    2. Run `bun run --filter=agentplane build`. Expected: artifact record types compile and remain exported through the loop modules that need them.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy still passes.
    4. Run a representative `agentplane loop run <task-id> --loop tdd.fix --dry-run --json` against a fixture or disposable local task. Expected: generated files stay under `.agentplane/tasks/<task-id>/runs/<run-id>` and include no non-dry-run execution side effects.
    5. Inspect `events.jsonl`. Expected: step events point to existing artifact refs and do not rely on free-form prose only.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-12T11:05:53.114Z — VERIFY — ok

    By: CODER

    Note: Per-step dry-run evidence and prompt identity implemented on agentplane-loops. Verified with focused loop tests, package build, format check, policy routing, and a real dry-run smoke for tdd.fix.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T10:58:59.079Z, excerpt_hash=sha256:9292222a1ba3814f8ab8703818958df6b67daea5d7f3633050b4acc3a0a578d5

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121018-WQSARQ/blueprint/resolved-snapshot.json
    - old_digest: b457313e22122ea931c9aa445183e246d02e560cdf78ae128ddf53616151fe29
    - current_digest: b457313e22122ea931c9aa445183e246d02e560cdf78ae128ddf53616151fe29
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606121018-WQSARQ

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606121018-WQSARQ --agent CODER --slug persist-loop-per-step-evidence-and-prompt-identi --worktree
    - diagnostic_command: agentplane work resume 202606121018-WQSARQ
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: worktree_projection_drift

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Dry-run LoopRun artifacts now include per-step input/output JSON refs plus step.prepared events and promptModule identity where applicable.
      Impact: Later metric and score-aware decision tasks can inspect step boundaries without relying on free-form logs or executing external agents.
      Resolution: Kept execution dry-run-only; step outputs explicitly record skippedExecution=true and task-local artifact paths.
id_source: "generated"
---
## Summary

Persist loop per-step evidence and prompt identity

Extend loop dry-run/run artifacts with per-step input/output refs and promptModule identity so later metrics and prompt improvement can audit what each loop step prepared or executed.

## Scope

- In scope: Extend loop dry-run/run artifacts with per-step input/output refs and promptModule identity so later metrics and prompt improvement can audit what each loop step prepared or executed.
- Out of scope: unrelated refactors not required for "Persist loop per-step evidence and prompt identity".

## Plan

1. Extend LoopRun artifact layout with iterations/<n>/steps/<step-id>/input.json and output.json or ref files for prepared/executed steps.
2. Persist promptModule identity for prompt-rendered steps: module id, version/source path when known, rendered prompt hash, and loop spec sha.
3. Emit step.prepared/step.skipped events in events.jsonl with stable refs to step artifacts.
4. Keep dry-run behavior non-executing: artifacts may contain placeholders/refs but must not call external agent adapters.
5. Add tests that assert deterministic artifact paths, valid JSON, and task-local-only mutation.

## Verify Steps

1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops packages/agentplane/src/commands/loop`. Expected: dry-run artifacts include per-step input/output refs and prompt identity where promptModule is present.
2. Run `bun run --filter=agentplane build`. Expected: artifact record types compile and remain exported through the loop modules that need them.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy still passes.
4. Run a representative `agentplane loop run <task-id> --loop tdd.fix --dry-run --json` against a fixture or disposable local task. Expected: generated files stay under `.agentplane/tasks/<task-id>/runs/<run-id>` and include no non-dry-run execution side effects.
5. Inspect `events.jsonl`. Expected: step events point to existing artifact refs and do not rely on free-form prose only.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-12T11:05:53.114Z — VERIFY — ok

By: CODER

Note: Per-step dry-run evidence and prompt identity implemented on agentplane-loops. Verified with focused loop tests, package build, format check, policy routing, and a real dry-run smoke for tdd.fix.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T10:58:59.079Z, excerpt_hash=sha256:9292222a1ba3814f8ab8703818958df6b67daea5d7f3633050b4acc3a0a578d5

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121018-WQSARQ/blueprint/resolved-snapshot.json
- old_digest: b457313e22122ea931c9aa445183e246d02e560cdf78ae128ddf53616151fe29
- current_digest: b457313e22122ea931c9aa445183e246d02e560cdf78ae128ddf53616151fe29
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606121018-WQSARQ

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606121018-WQSARQ --agent CODER --slug persist-loop-per-step-evidence-and-prompt-identi --worktree
- diagnostic_command: agentplane work resume 202606121018-WQSARQ
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: worktree_projection_drift

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Dry-run LoopRun artifacts now include per-step input/output JSON refs plus step.prepared events and promptModule identity where applicable.
  Impact: Later metric and score-aware decision tasks can inspect step boundaries without relying on free-form logs or executing external agents.
  Resolution: Kept execution dry-run-only; step outputs explicitly record skippedExecution=true and task-local artifact paths.
