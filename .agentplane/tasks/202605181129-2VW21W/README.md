---
id: "202605181129-2VW21W"
title: "Require evaluator quality gate after verification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/pr/internal/batch-validation.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T11:29:38.890Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T11:42:47.378Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed for commit c1b49d671."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-18T11:42:47.378Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed for commit c1b49d671."
  evaluated_sha: "c1b49d671316b7bf2ba01727da292f6dcd9cd242"
  blueprint_digest: "7f0be44d6f556d881fcf3f692b694b3214e9f09b08cea9ed757632a9ca8285d5"
  evidence_refs:
    - ".agentplane/tasks/202605181129-2VW21W/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181129-2VW21W-evaluator-quality-gate/.agentplane/tasks/202605181129-2VW21W/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the EVALUATOR quality gate contract in the dedicated branch_pr worktree with scoped blueprint, task schema, and lifecycle checks."
events:
  -
    type: "status"
    at: "2026-05-18T11:30:12.517Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the EVALUATOR quality gate contract in the dedicated branch_pr worktree with scoped blueprint, task schema, and lifecycle checks."
  -
    type: "verify"
    at: "2026-05-18T11:42:43.276Z"
    author: "CODER"
    state: "ok"
    note: "Focused checks passed after adding evaluator quality gate enforcement."
  -
    type: "verify"
    at: "2026-05-18T11:42:47.378Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed for commit c1b49d671."
doc_version: 3
doc_updated_at: "2026-05-18T11:42:47.408Z"
doc_updated_by: "CODER"
description: "Make every task lifecycle require an independent EVALUATOR quality review after verification before integration or finish."
sections:
  Summary: |-
    Require evaluator quality gate after verification

    Make every task lifecycle require an independent EVALUATOR quality review after verification before integration or finish.
  Scope: |-
    - In scope: Make every task lifecycle require an independent EVALUATOR quality review after verification before integration or finish.
    - Out of scope: unrelated refactors not required for "Require evaluator quality gate after verification".
  Plan: "1. Add a first-class quality_gate blueprint node owned by EVALUATOR after verify_record and before finish/integrate paths. 2. Persist quality_review on task records/frontmatter with verdict, reviewer, evaluated SHA, blueprint digest, evidence refs, findings, and note. 3. Add lifecycle enforcement so integrate/finish reject tasks without a fresh EVALUATOR pass while preserving existing verify/rework behavior. 4. Add focused tests for blueprint validation and bypass prevention; run routing validation."
  Verify Steps: "1. Run TypeScript compile for agentplane: bunx tsc -p packages/agentplane/tsconfig.json --noEmit. 2. Run focused tests: bunx vitest run packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/blueprints/validate.test.ts. 3. Validate generated schemas: bun run schemas:check. 4. Validate policy routing: node .agentplane/policy/check-routing.mjs."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T11:42:43.276Z — VERIFY — ok

    By: CODER

    Note: Focused checks passed after adding evaluator quality gate enforcement.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T11:39:30.362Z, excerpt_hash=sha256:82795483e32a401833284eecabb8852115704ce9e357f634ca0d39486bc827a3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181129-2VW21W-evaluator-quality-gate/.agentplane/tasks/202605181129-2VW21W/blueprint/resolved-snapshot.json
    - old_digest: 7f0be44d6f556d881fcf3f692b694b3214e9f09b08cea9ed757632a9ca8285d5
    - current_digest: 7f0be44d6f556d881fcf3f692b694b3214e9f09b08cea9ed757632a9ca8285d5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181129-2VW21W

    ### 2026-05-18T11:42:47.378Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed for commit c1b49d671.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T11:42:43.306Z, excerpt_hash=sha256:82795483e32a401833284eecabb8852115704ce9e357f634ca0d39486bc827a3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181129-2VW21W-evaluator-quality-gate/.agentplane/tasks/202605181129-2VW21W/blueprint/resolved-snapshot.json
    - old_digest: 7f0be44d6f556d881fcf3f692b694b3214e9f09b08cea9ed757632a9ca8285d5
    - current_digest: 7f0be44d6f556d881fcf3f692b694b3214e9f09b08cea9ed757632a9ca8285d5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181129-2VW21W

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: tsc, focused vitest, schema check, and policy routing passed
      Impact: task has implementation evidence before evaluator gate
      Resolution: ready for EVALUATOR quality review

    - Observation: quality gate checks passed: task has current blueprint snapshot, focused tests passed, schemas and routing passed
      Impact: finish/integrate may proceed only while evaluated SHA and blueprint digest remain current
      Resolution: quality_review recorded as pass
id_source: "generated"
---
## Summary

Require evaluator quality gate after verification

Make every task lifecycle require an independent EVALUATOR quality review after verification before integration or finish.

## Scope

- In scope: Make every task lifecycle require an independent EVALUATOR quality review after verification before integration or finish.
- Out of scope: unrelated refactors not required for "Require evaluator quality gate after verification".

## Plan

1. Add a first-class quality_gate blueprint node owned by EVALUATOR after verify_record and before finish/integrate paths. 2. Persist quality_review on task records/frontmatter with verdict, reviewer, evaluated SHA, blueprint digest, evidence refs, findings, and note. 3. Add lifecycle enforcement so integrate/finish reject tasks without a fresh EVALUATOR pass while preserving existing verify/rework behavior. 4. Add focused tests for blueprint validation and bypass prevention; run routing validation.

## Verify Steps

1. Run TypeScript compile for agentplane: bunx tsc -p packages/agentplane/tsconfig.json --noEmit. 2. Run focused tests: bunx vitest run packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/blueprints/validate.test.ts. 3. Validate generated schemas: bun run schemas:check. 4. Validate policy routing: node .agentplane/policy/check-routing.mjs.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T11:42:43.276Z — VERIFY — ok

By: CODER

Note: Focused checks passed after adding evaluator quality gate enforcement.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T11:39:30.362Z, excerpt_hash=sha256:82795483e32a401833284eecabb8852115704ce9e357f634ca0d39486bc827a3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181129-2VW21W-evaluator-quality-gate/.agentplane/tasks/202605181129-2VW21W/blueprint/resolved-snapshot.json
- old_digest: 7f0be44d6f556d881fcf3f692b694b3214e9f09b08cea9ed757632a9ca8285d5
- current_digest: 7f0be44d6f556d881fcf3f692b694b3214e9f09b08cea9ed757632a9ca8285d5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181129-2VW21W

### 2026-05-18T11:42:47.378Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed for commit c1b49d671.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T11:42:43.306Z, excerpt_hash=sha256:82795483e32a401833284eecabb8852115704ce9e357f634ca0d39486bc827a3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181129-2VW21W-evaluator-quality-gate/.agentplane/tasks/202605181129-2VW21W/blueprint/resolved-snapshot.json
- old_digest: 7f0be44d6f556d881fcf3f692b694b3214e9f09b08cea9ed757632a9ca8285d5
- current_digest: 7f0be44d6f556d881fcf3f692b694b3214e9f09b08cea9ed757632a9ca8285d5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181129-2VW21W

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: tsc, focused vitest, schema check, and policy routing passed
  Impact: task has implementation evidence before evaluator gate
  Resolution: ready for EVALUATOR quality review

- Observation: quality gate checks passed: task has current blueprint snapshot, focused tests passed, schemas and routing passed
  Impact: finish/integrate may proceed only while evaluated SHA and blueprint digest remain current
  Resolution: quality_review recorded as pass
