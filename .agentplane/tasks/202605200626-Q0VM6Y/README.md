---
id: "202605200626-Q0VM6Y"
title: "Add source-shaped topology gate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T06:26:59.298Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-20T06:30:54.822Z"
  updated_by: "EVALUATOR"
  note: "Quality gate passed for source-shaped topology scope."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-20T06:30:54.822Z"
  updated_by: "EVALUATOR"
  note: "Quality gate passed for source-shaped topology scope."
  evaluated_sha: "ceb72f644170918092daad358831a7125a51cf03"
  blueprint_digest: "fdfe5d806a22dae410fb1f9dd01cca466b7cbd3aa4fdf39e5772f0c4d8e63a8b"
  evidence_refs:
    - ".agentplane/tasks/202605200626-Q0VM6Y/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200626-Q0VM6Y-source-shaped-topology-gate/.agentplane/tasks/202605200626-Q0VM6Y/blueprint/resolved-snapshot.json"
  findings:
    - "Reviewed changed contract surfaces: maximum-assimilation init guidance, context ingestion task prompt/extension gates, built-in blueprint required evidence and stop rules, user docs, and focused tests. The topology requirement is now represented as prompt guidance, task extension gates, blueprint evidence, blueprint stop rules, and docs. Residual risk: no runtime parser enforces topology artifact contents yet; current enforcement is workflow contract plus test-covered generated guidance."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement source-shaped topology gate in maximum-assimilation context prompts, blueprint evidence, docs, and focused tests from the dedicated branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-20T06:27:11.693Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement source-shaped topology gate in maximum-assimilation context prompts, blueprint evidence, docs, and focused tests from the dedicated branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-20T06:30:45.719Z"
    author: "CODER"
    state: "ok"
    note: "Implemented source-shaped topology gate and passed focused validation."
  -
    type: "verify"
    at: "2026-05-20T06:30:54.822Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality gate passed for source-shaped topology scope."
doc_version: 3
doc_updated_at: "2026-05-20T06:30:54.839Z"
doc_updated_by: "CODER"
description: "Make maximum-assimilation context tasks record and verify a source-shaped topology decision before narrative wiki synthesis; includes docs updates."
sections:
  Summary: |-
    Add source-shaped topology gate

    Make maximum-assimilation context tasks record and verify a source-shaped topology decision before narrative wiki synthesis; includes docs updates.
  Scope: |-
    - In scope: Make maximum-assimilation context tasks record and verify a source-shaped topology decision before narrative wiki synthesis; includes docs updates.
    - Out of scope: unrelated refactors not required for "Add source-shaped topology gate".
  Plan: |-
    1. Update maximum-assimilation prompt/readme guidance so topology is explicitly recorded before synthesis, including source shape classification, page-family evidence, granularity, canonical labels, and ambiguity handling.
    2. Update context.maximum_assimilation blueprint evidence and stop rules so topology decisions become a verifiable gate rather than prompt-only guidance.
    3. Update public local-context docs to explain the topology decision artifact and verification expectations.
    4. Add or update focused tests for generated maximum-assimilation guidance/blueprint validation.
    5. Verify with focused context tests, routing check, task verify-show, and relevant docs/code checks.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-20T06:30:45.719Z — VERIFY — ok

    By: CODER

    Note: Implemented source-shaped topology gate and passed focused validation.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T06:27:11.693Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    Command: bun test packages/agentplane/src/commands/context/release-readiness.test.ts; Result: pass; Evidence: 22 pass, 0 fail. Scope: maximum-assimilation generated init/ingest guidance and context release guards.
    Command: bun test packages/agentplane/src/blueprints/validate.test.ts; Result: pass; Evidence: 23 pass, 0 fail. Scope: built-in blueprint validation and maximum-assimilation evidence/stop-rule contract.
    Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier style. Scope: 6 changed files.
    Command: bunx eslint packages/agentplane/src/blueprints/builtins.ts packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/commands/context/init.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/context/ingest-task.ts; Result: pass; Evidence: no lint output. Scope: touched TypeScript files.
    Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing contract.
    Command: ap doctor; Result: pass; Evidence: doctor OK with errors=0 warnings=0. Scope: repository health after watched runtime bootstrap.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200626-Q0VM6Y-source-shaped-topology-gate/.agentplane/tasks/202605200626-Q0VM6Y/blueprint/resolved-snapshot.json
    - old_digest: fdfe5d806a22dae410fb1f9dd01cca466b7cbd3aa4fdf39e5772f0c4d8e63a8b
    - current_digest: fdfe5d806a22dae410fb1f9dd01cca466b7cbd3aa4fdf39e5772f0c4d8e63a8b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605200626-Q0VM6Y

    ### 2026-05-20T06:30:54.822Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality gate passed for source-shaped topology scope.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T06:30:45.736Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    Reviewed changed contract surfaces: maximum-assimilation init guidance, context ingestion task prompt/extension gates, built-in blueprint required evidence and stop rules, user docs, and focused tests. The topology requirement is now represented as prompt guidance, task extension gates, blueprint evidence, blueprint stop rules, and docs. Residual risk: no runtime parser enforces topology artifact contents yet; current enforcement is workflow contract plus test-covered generated guidance.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200626-Q0VM6Y-source-shaped-topology-gate/.agentplane/tasks/202605200626-Q0VM6Y/blueprint/resolved-snapshot.json
    - old_digest: fdfe5d806a22dae410fb1f9dd01cca466b7cbd3aa4fdf39e5772f0c4d8e63a8b
    - current_digest: fdfe5d806a22dae410fb1f9dd01cca466b7cbd3aa4fdf39e5772f0c4d8e63a8b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605200626-Q0VM6Y

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add source-shaped topology gate

Make maximum-assimilation context tasks record and verify a source-shaped topology decision before narrative wiki synthesis; includes docs updates.

## Scope

- In scope: Make maximum-assimilation context tasks record and verify a source-shaped topology decision before narrative wiki synthesis; includes docs updates.
- Out of scope: unrelated refactors not required for "Add source-shaped topology gate".

## Plan

1. Update maximum-assimilation prompt/readme guidance so topology is explicitly recorded before synthesis, including source shape classification, page-family evidence, granularity, canonical labels, and ambiguity handling.
2. Update context.maximum_assimilation blueprint evidence and stop rules so topology decisions become a verifiable gate rather than prompt-only guidance.
3. Update public local-context docs to explain the topology decision artifact and verification expectations.
4. Add or update focused tests for generated maximum-assimilation guidance/blueprint validation.
5. Verify with focused context tests, routing check, task verify-show, and relevant docs/code checks.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-20T06:30:45.719Z — VERIFY — ok

By: CODER

Note: Implemented source-shaped topology gate and passed focused validation.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T06:27:11.693Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

Command: bun test packages/agentplane/src/commands/context/release-readiness.test.ts; Result: pass; Evidence: 22 pass, 0 fail. Scope: maximum-assimilation generated init/ingest guidance and context release guards.
Command: bun test packages/agentplane/src/blueprints/validate.test.ts; Result: pass; Evidence: 23 pass, 0 fail. Scope: built-in blueprint validation and maximum-assimilation evidence/stop-rule contract.
Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier style. Scope: 6 changed files.
Command: bunx eslint packages/agentplane/src/blueprints/builtins.ts packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/commands/context/init.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/context/ingest-task.ts; Result: pass; Evidence: no lint output. Scope: touched TypeScript files.
Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing contract.
Command: ap doctor; Result: pass; Evidence: doctor OK with errors=0 warnings=0. Scope: repository health after watched runtime bootstrap.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200626-Q0VM6Y-source-shaped-topology-gate/.agentplane/tasks/202605200626-Q0VM6Y/blueprint/resolved-snapshot.json
- old_digest: fdfe5d806a22dae410fb1f9dd01cca466b7cbd3aa4fdf39e5772f0c4d8e63a8b
- current_digest: fdfe5d806a22dae410fb1f9dd01cca466b7cbd3aa4fdf39e5772f0c4d8e63a8b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605200626-Q0VM6Y

### 2026-05-20T06:30:54.822Z — VERIFY — ok

By: EVALUATOR

Note: Quality gate passed for source-shaped topology scope.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-20T06:30:45.736Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

Reviewed changed contract surfaces: maximum-assimilation init guidance, context ingestion task prompt/extension gates, built-in blueprint required evidence and stop rules, user docs, and focused tests. The topology requirement is now represented as prompt guidance, task extension gates, blueprint evidence, blueprint stop rules, and docs. Residual risk: no runtime parser enforces topology artifact contents yet; current enforcement is workflow contract plus test-covered generated guidance.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605200626-Q0VM6Y-source-shaped-topology-gate/.agentplane/tasks/202605200626-Q0VM6Y/blueprint/resolved-snapshot.json
- old_digest: fdfe5d806a22dae410fb1f9dd01cca466b7cbd3aa4fdf39e5772f0c4d8e63a8b
- current_digest: fdfe5d806a22dae410fb1f9dd01cca466b7cbd3aa4fdf39e5772f0c4d8e63a8b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605200626-Q0VM6Y

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
