---
id: "202606121018-5PS44M"
title: "Add typed loop step contracts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202606081918-CKV5VD"
tags:
  - "code"
  - "contracts"
  - "loops"
  - "schema"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run --filter=agentplane build"
  - "bun run --filter=agentplane test -- packages/agentplane/src/loops"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T10:22:34.428Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-12T10:47:19.552Z"
  updated_by: "CODER"
  note: "Typed loop step contracts implemented on agentplane-loops. Verified with focused loop tests, package build, schema/example checks, project loop validation, and policy routing."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement typed loop step contracts on agentplane-loops as the branch-local trunk for the loops version; main remains untouched. Force override is intentional because the user explicitly requested continuing v0.2 before the v0.1 release-candidate dependency is complete."
events:
  -
    type: "status"
    at: "2026-06-12T10:35:57.794Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement typed loop step contracts on agentplane-loops as the branch-local trunk for the loops version; main remains untouched. Force override is intentional because the user explicitly requested continuing v0.2 before the v0.1 release-candidate dependency is complete."
  -
    type: "verify"
    at: "2026-06-12T10:47:19.552Z"
    author: "CODER"
    state: "ok"
    note: "Typed loop step contracts implemented on agentplane-loops. Verified with focused loop tests, package build, schema/example checks, project loop validation, and policy routing."
doc_version: 3
doc_updated_at: "2026-06-12T10:47:23.459Z"
doc_updated_by: "CODER"
description: "Add explicit typed input/output contracts for LoopSpec steps so loop execution can validate step boundaries before score-aware runtime behavior is introduced."
sections:
  Summary: |-
    Add typed loop step contracts

    Add explicit typed input/output contracts for LoopSpec steps so loop execution can validate step boundaries before score-aware runtime behavior is introduced.
  Scope: |-
    - In scope: Add explicit typed input/output contracts for LoopSpec steps so loop execution can validate step boundaries before score-aware runtime behavior is introduced.
    - Out of scope: unrelated refactors not required for "Add typed loop step contracts".
  Plan: |-
    1. Extend LoopStep/LoopSpec model types with explicit step contract fields for declared inputs, outputs, optional schema refs, and required artifact refs.
    2. Update JSON schema and spec examples so contract fields are validated but remain backward-compatible for v0.1 loop specs.
    3. Add validation failures for malformed contract declarations without requiring every existing built-in step to define a full contract immediately.
    4. Update built-in loop specs with representative contracts on high-value steps such as prompt.render, check.run, evaluator.run, and decision.route.
    5. Keep runtime behavior unchanged except for validation/readback surfaces.
  Verify Steps: |-
    1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops`. Expected: loop model, schema validation, and catalog tests cover contract fields and backward compatibility.
    2. Run `bun run --filter=agentplane build`. Expected: TypeScript types compile with contract fields exposed through public loop modules.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing still passes after schema/model changes.
    4. Inspect `schemas/loop-spec.schema.json` and `packages/spec/examples/loop-spec.json`. Expected: contract fields are documented by example without making current v0.1 specs invalid.
    5. Run `agentplane loop validate --project` from a fixture/project-local context if project loop fixtures exist; otherwise record the absence as a finding. Expected: invalid contracts fail clearly and valid legacy specs still pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-12T10:47:19.552Z — VERIFY — ok

    By: CODER

    Note: Typed loop step contracts implemented on agentplane-loops. Verified with focused loop tests, package build, schema/example checks, project loop validation, and policy routing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T10:35:57.794Z, excerpt_hash=sha256:5aef7d28d52aa9861b971efb3facce6d5106b8b7ea493c617977d1eb5ab66950

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121018-5PS44M/blueprint/resolved-snapshot.json
    - old_digest: f104cf26af6e0c07e48fe7688895af89730bf26523ea3e771b72972a60551011
    - current_digest: f104cf26af6e0c07e48fe7688895af89730bf26523ea3e771b72972a60551011
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606121018-5PS44M

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606121018-5PS44M --agent CODER --slug add-typed-loop-step-contracts --worktree
    - diagnostic_command: agentplane work resume 202606121018-5PS44M
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
    - Observation: Added backward-compatible LoopStep contract fields plus validation for malformed contract entries and duplicates.
      Impact: Loop specs can now declare typed step inputs, outputs, artifact refs, and schema refs without breaking legacy v0.1 specs.
      Resolution: Kept runtime behavior unchanged; contracts are validation/readback metadata for later evidence and score-aware loop tasks.
id_source: "generated"
---
## Summary

Add typed loop step contracts

Add explicit typed input/output contracts for LoopSpec steps so loop execution can validate step boundaries before score-aware runtime behavior is introduced.

## Scope

- In scope: Add explicit typed input/output contracts for LoopSpec steps so loop execution can validate step boundaries before score-aware runtime behavior is introduced.
- Out of scope: unrelated refactors not required for "Add typed loop step contracts".

## Plan

1. Extend LoopStep/LoopSpec model types with explicit step contract fields for declared inputs, outputs, optional schema refs, and required artifact refs.
2. Update JSON schema and spec examples so contract fields are validated but remain backward-compatible for v0.1 loop specs.
3. Add validation failures for malformed contract declarations without requiring every existing built-in step to define a full contract immediately.
4. Update built-in loop specs with representative contracts on high-value steps such as prompt.render, check.run, evaluator.run, and decision.route.
5. Keep runtime behavior unchanged except for validation/readback surfaces.

## Verify Steps

1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops`. Expected: loop model, schema validation, and catalog tests cover contract fields and backward compatibility.
2. Run `bun run --filter=agentplane build`. Expected: TypeScript types compile with contract fields exposed through public loop modules.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing still passes after schema/model changes.
4. Inspect `schemas/loop-spec.schema.json` and `packages/spec/examples/loop-spec.json`. Expected: contract fields are documented by example without making current v0.1 specs invalid.
5. Run `agentplane loop validate --project` from a fixture/project-local context if project loop fixtures exist; otherwise record the absence as a finding. Expected: invalid contracts fail clearly and valid legacy specs still pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-12T10:47:19.552Z — VERIFY — ok

By: CODER

Note: Typed loop step contracts implemented on agentplane-loops. Verified with focused loop tests, package build, schema/example checks, project loop validation, and policy routing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T10:35:57.794Z, excerpt_hash=sha256:5aef7d28d52aa9861b971efb3facce6d5106b8b7ea493c617977d1eb5ab66950

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121018-5PS44M/blueprint/resolved-snapshot.json
- old_digest: f104cf26af6e0c07e48fe7688895af89730bf26523ea3e771b72972a60551011
- current_digest: f104cf26af6e0c07e48fe7688895af89730bf26523ea3e771b72972a60551011
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606121018-5PS44M

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606121018-5PS44M --agent CODER --slug add-typed-loop-step-contracts --worktree
- diagnostic_command: agentplane work resume 202606121018-5PS44M
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

- Observation: Added backward-compatible LoopStep contract fields plus validation for malformed contract entries and duplicates.
  Impact: Loop specs can now declare typed step inputs, outputs, artifact refs, and schema refs without breaking legacy v0.1 specs.
  Resolution: Kept runtime behavior unchanged; contracts are validation/readback metadata for later evidence and score-aware loop tasks.
