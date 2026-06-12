---
id: "202606121205-QEGFTJ"
title: "Smoke test loop dry-run on simple task"
status: "DOING"
priority: "med"
owner: "TESTER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "evaluation"
  - "loops"
  - "smoke"
task_kind: "analysis"
mutation_scope: "none"
verify:
  - "ap loop plan <task-id> --title 'Fix failing unit test' --tag code --tag test --json"
  - "ap loop run <task-id> --loop tdd.fix --dry-run --json"
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T12:06:19.781Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-12T12:08:19.517Z"
  updated_by: "TESTER"
  note: "Smoke-test loop dry-run completed on agentplane-loops. Verified loop selection, forced tdd.fix dry-run, auto-selected loop.improve dry-run, generated run artifacts, score-aware decision records, and routing check."
  attempts: 0
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: smoke-test loop dry-run on agentplane-loops using a synthetic code/test repair intent; no main mutation or external agent execution is in scope."
events:
  -
    type: "status"
    at: "2026-06-12T12:06:28.864Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: smoke-test loop dry-run on agentplane-loops using a synthetic code/test repair intent; no main mutation or external agent execution is in scope."
  -
    type: "verify"
    at: "2026-06-12T12:08:19.517Z"
    author: "TESTER"
    state: "ok"
    note: "Smoke-test loop dry-run completed on agentplane-loops. Verified loop selection, forced tdd.fix dry-run, auto-selected loop.improve dry-run, generated run artifacts, score-aware decision records, and routing check."
doc_version: 3
doc_updated_at: "2026-06-12T12:08:19.735Z"
doc_updated_by: "TESTER"
description: "Run a harmless loop dry-run against a simple synthetic repair task and report the produced loop artifacts, scores, and decision record."
sections:
  Summary: "Smoke-test the current loop implementation on a harmless synthetic repair task. The goal is to inspect live loop behavior: loop selection, dry-run artifacts, step evidence, metric aggregation, and decision output."
  Scope: "In scope: run loop planning and dry-run execution for the built-in tdd.fix loop; inspect generated files under this task's runs directory; summarize facts, inferences, gaps, and next integration steps. Out of scope: code changes, external agent execution, network publication, main branch mutation."
  Plan: |-
    1. Use loop planning with a simple code/test repair intent to confirm selection behavior.
    2. Execute a dry-run of the built-in tdd.fix loop for this task without invoking external agents.
    3. Inspect generated LoopRun artifacts, events, per-step inputs/outputs, prompt identities, metrics, failed contracts, and decision next-step reason.
    4. Record verification and report current capabilities, limits, and integration recommendations.
  Verify Steps: |-
    1. Run ap loop plan 202606121205-QEGFTJ with code/test tags and confirm tdd.fix is selected or explain why not.
    2. Run ap loop run 202606121205-QEGFTJ --loop tdd.fix --dry-run --json and confirm it writes loop-run.json, events.jsonl, iterations/001/decision.json, and per-step input/output artifacts.
    3. Inspect the run artifacts and report loop id/version, step count, prompt identity presence, score aggregation, missing required metrics, failed contracts, and stop/next-step reason.
    4. Run routing/status checks and confirm repository branch and final git status.
  Verification: |-
    Executed on branch agentplane-loops.

    Commands and outcomes:
    - ap loop list --json: passed; built-in loop catalog includes 8 loops.
    - ap loop plan 202606121205-QEGFTJ --title 'Fix failing unit test' --tag code --tag test --json: passed; selected loop.improve because existing task metadata is analysis/evaluation/loops/smoke; tdd.fix was rejected for no tag, task kind, or blueprint match.
    - ap loop run 202606121205-QEGFTJ --loop tdd.fix --dry-run --json: passed; created run loop-2026-06-12T12-06-51-715Z-3d66e238 with 6 prepared step artifacts and status human_review.
    - ap loop run 202606121205-QEGFTJ --dry-run --json: passed; auto-selected loop.improve and created run loop-2026-06-12T12-06-59-295Z-36dd68af with 5 prepared step artifacts and status human_review.
    - node .agentplane/policy/check-routing.mjs: passed with 'policy routing OK'.

    Artifact facts:
    - tdd.fix decision: request_human_review; missingRequired=[verification_score]; failedContracts=[verification_score]; progressEvidence=[dry_run_step_artifacts_prepared]; nextStepReason=dry_run_requires_human_review_before_external_agent_execution.
    - loop.improve decision: request_human_review; no declared metric scores; progressEvidence=[dry_run_step_artifacts_prepared].
    - Both runs wrote loop-run.json, state.json, events.jsonl, iterations/001/decision.json, and per-step input/output JSON files.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-12T12:08:19.517Z — VERIFY — ok

    By: TESTER

    Note: Smoke-test loop dry-run completed on agentplane-loops. Verified loop selection, forced tdd.fix dry-run, auto-selected loop.improve dry-run, generated run artifacts, score-aware decision records, and routing check.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T12:08:12.380Z, excerpt_hash=sha256:3e3262e8f21a3389b5063fa05de2e301a28eae252dff30abecc0d952e2ceaf47

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121205-QEGFTJ/blueprint/resolved-snapshot.json
    - old_digest: 83b1aa2b38cf8ce7c6fdb557d363420eaa79cac8ccfeb751203354bc2b84f381
    - current_digest: 83b1aa2b38cf8ce7c6fdb557d363420eaa79cac8ccfeb751203354bc2b84f381
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606121205-QEGFTJ

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606121205-QEGFTJ --agent TESTER --slug smoke-test-loop-dry-run-on-simple-task --worktree
    - diagnostic_command: agentplane work resume 202606121205-QEGFTJ
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: worktree_projection_drift

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove the smoke-test task record and generated run artifacts if the test needs to be discarded. No implementation code or main branch state is modified by this task."
  Findings: |-
    - Observation: Dry-run step outputs are prepared placeholders, not executed agent/check/evaluator results; renderedPromptSha remains null.
      Impact: The current loop system proves orchestration/evidence contracts, but not closed-loop repair effectiveness.
      Resolution: Next integration step should connect real execution signals into metrics and fill rendered prompt hashes after prompt rendering.

    - Observation: Loop selection uses persisted task metadata when a task id is supplied; the extra --title and --tag inputs did not override the analysis/evaluation smoke task.
      Impact: A smoke-test analysis task auto-selects loop.improve, not tdd.fix, so demonstrations of implementation loops need either a code task or an explicit --loop override.
      Resolution: For evaluation fixtures, create scenario-specific task records or synthetic-input mode that does not mix task-id metadata with override flags.
id_source: "generated"
---
## Summary

Smoke-test the current loop implementation on a harmless synthetic repair task. The goal is to inspect live loop behavior: loop selection, dry-run artifacts, step evidence, metric aggregation, and decision output.

## Scope

In scope: run loop planning and dry-run execution for the built-in tdd.fix loop; inspect generated files under this task's runs directory; summarize facts, inferences, gaps, and next integration steps. Out of scope: code changes, external agent execution, network publication, main branch mutation.

## Plan

1. Use loop planning with a simple code/test repair intent to confirm selection behavior.
2. Execute a dry-run of the built-in tdd.fix loop for this task without invoking external agents.
3. Inspect generated LoopRun artifacts, events, per-step inputs/outputs, prompt identities, metrics, failed contracts, and decision next-step reason.
4. Record verification and report current capabilities, limits, and integration recommendations.

## Verify Steps

1. Run ap loop plan 202606121205-QEGFTJ with code/test tags and confirm tdd.fix is selected or explain why not.
2. Run ap loop run 202606121205-QEGFTJ --loop tdd.fix --dry-run --json and confirm it writes loop-run.json, events.jsonl, iterations/001/decision.json, and per-step input/output artifacts.
3. Inspect the run artifacts and report loop id/version, step count, prompt identity presence, score aggregation, missing required metrics, failed contracts, and stop/next-step reason.
4. Run routing/status checks and confirm repository branch and final git status.

## Verification

Executed on branch agentplane-loops.

Commands and outcomes:
- ap loop list --json: passed; built-in loop catalog includes 8 loops.
- ap loop plan 202606121205-QEGFTJ --title 'Fix failing unit test' --tag code --tag test --json: passed; selected loop.improve because existing task metadata is analysis/evaluation/loops/smoke; tdd.fix was rejected for no tag, task kind, or blueprint match.
- ap loop run 202606121205-QEGFTJ --loop tdd.fix --dry-run --json: passed; created run loop-2026-06-12T12-06-51-715Z-3d66e238 with 6 prepared step artifacts and status human_review.
- ap loop run 202606121205-QEGFTJ --dry-run --json: passed; auto-selected loop.improve and created run loop-2026-06-12T12-06-59-295Z-36dd68af with 5 prepared step artifacts and status human_review.
- node .agentplane/policy/check-routing.mjs: passed with 'policy routing OK'.

Artifact facts:
- tdd.fix decision: request_human_review; missingRequired=[verification_score]; failedContracts=[verification_score]; progressEvidence=[dry_run_step_artifacts_prepared]; nextStepReason=dry_run_requires_human_review_before_external_agent_execution.
- loop.improve decision: request_human_review; no declared metric scores; progressEvidence=[dry_run_step_artifacts_prepared].
- Both runs wrote loop-run.json, state.json, events.jsonl, iterations/001/decision.json, and per-step input/output JSON files.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-12T12:08:19.517Z — VERIFY — ok

By: TESTER

Note: Smoke-test loop dry-run completed on agentplane-loops. Verified loop selection, forced tdd.fix dry-run, auto-selected loop.improve dry-run, generated run artifacts, score-aware decision records, and routing check.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T12:08:12.380Z, excerpt_hash=sha256:3e3262e8f21a3389b5063fa05de2e301a28eae252dff30abecc0d952e2ceaf47

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121205-QEGFTJ/blueprint/resolved-snapshot.json
- old_digest: 83b1aa2b38cf8ce7c6fdb557d363420eaa79cac8ccfeb751203354bc2b84f381
- current_digest: 83b1aa2b38cf8ce7c6fdb557d363420eaa79cac8ccfeb751203354bc2b84f381
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606121205-QEGFTJ

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606121205-QEGFTJ --agent TESTER --slug smoke-test-loop-dry-run-on-simple-task --worktree
- diagnostic_command: agentplane work resume 202606121205-QEGFTJ
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: worktree_projection_drift

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove the smoke-test task record and generated run artifacts if the test needs to be discarded. No implementation code or main branch state is modified by this task.

## Findings

- Observation: Dry-run step outputs are prepared placeholders, not executed agent/check/evaluator results; renderedPromptSha remains null.
  Impact: The current loop system proves orchestration/evidence contracts, but not closed-loop repair effectiveness.
  Resolution: Next integration step should connect real execution signals into metrics and fill rendered prompt hashes after prompt rendering.

- Observation: Loop selection uses persisted task metadata when a task id is supplied; the extra --title and --tag inputs did not override the analysis/evaluation smoke task.
  Impact: A smoke-test analysis task auto-selects loop.improve, not tdd.fix, so demonstrations of implementation loops need either a code task or an explicit --loop override.
  Resolution: For evaluation fixtures, create scenario-specific task records or synthetic-input mode that does not mix task-id metadata with override flags.
