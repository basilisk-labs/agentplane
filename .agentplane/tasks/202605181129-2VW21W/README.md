---
id: "202605181129-2VW21W"
title: "Require evaluator quality gate after verification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
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
doc_version: 3
doc_updated_at: "2026-05-18T11:39:30.362Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
