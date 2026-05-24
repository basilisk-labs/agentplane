---
id: "202605232011-MAW1PK"
title: "Implement executable evaluator quality review"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "evaluator"
verify:
  - "bun run framework:dev:bootstrap"
  - "bun test packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T20:11:56.831Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T20:48:30.212Z"
  updated_by: "CODER"
  note: "Implemented executable evaluator run command, stricter quality-review gate, docs, and focused tests. Checks passed: format:changed, focused bun tests, typecheck, docs:cli:check, policy routing, framework bootstrap/help."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-24T06:51:24.621Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR review: prompt surfaces now direct agents to evaluator run and structured quality reports, not formal verify notes."
  evaluated_sha: "deb4439ae218ebb1d492879da6d34d5ebf0feea4"
  blueprint_digest: "4bd1a0ab295307905c1f5ceafa36fb1c6bb7fb22e6cf505bb55244db31b28114"
  evidence_refs:
    - ".agentplane/tasks/202605232011-MAW1PK/README.md"
    - ".agentplane/tasks/202605232011-MAW1PK/quality/20260524-065124621-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605232011-MAW1PK/quality/20260524-065124621-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605232011-MAW1PK/quality/20260524-065124621-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605232011-MAW1PK/blueprint/resolved-snapshot.json"
    - "packages/agentplane/assets/agents/EVALUATOR.json"
    - ".agentplane/agents/EVALUATOR.json"
    - "packages/agentplane/assets/evaluators/recovery-context.md"
    - ".agentplane/evaluators/recovery-context.md"
    - "packages/agentplane/src/workflow-lifecycle/contract.ts"
    - "packages/agentplane/src/blueprints/builtins.ts"
    - "packages/agentplane/src/context/ingest-task.ts"
    - "packages/agentplane/assets/AGENTS.md"
    - "commit: deb4439ae"
    - "check: bun run agents:check"
    - "check: node .agentplane/policy/check-routing.mjs"
    - "check: bun test packages/agentplane/src/workflow-lifecycle/contract.test.ts packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts"
    - "check: bun run format:changed"
    - "check: bun run typecheck"
    - "check: bun run framework:dev:bootstrap"
  findings:
    - "EVALUATOR agent profile and recovery-context evaluator prompt now require structured evaluator run output with findings, evidence refs, missing tests, hidden assumptions, residual risks, and quality-report.json evidence."
    - "Workflow lifecycle contract, gateway command blocks, context ingest prompt, and context maximum-assimilation blueprint now advertise agentplane evaluator run as the quality gate command."
    - "Targeted lifecycle/blueprint/evaluator tests, agents:check, format:changed, typecheck, policy routing, and framework bootstrap passed after the prompt-surface update."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing executable evaluator review reporting and stricter quality-review enforcement in the dedicated branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-23T20:12:52.607Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing executable evaluator review reporting and stricter quality-review enforcement in the dedicated branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-23T20:48:30.212Z"
    author: "CODER"
    state: "ok"
    note: "Implemented executable evaluator run command, stricter quality-review gate, docs, and focused tests. Checks passed: format:changed, focused bun tests, typecheck, docs:cli:check, policy routing, framework bootstrap/help."
doc_version: 3
doc_updated_at: "2026-05-23T20:49:41.928Z"
doc_updated_by: "CODER"
description: "Implement executable evaluator quality review"
sections:
  Summary: |-
    Implement executable evaluator quality review

    Implement executable evaluator quality review
  Scope: |-
    - In scope: Implement executable evaluator quality review.
    - Out of scope: unrelated refactors not required for "Implement executable evaluator quality review".
  Plan: |-
    1. Add an executable evaluator review command that writes prompt, report, and opinion artifacts under the task directory.
    2. Make task closure gates require a structured EVALUATOR quality report and non-empty pass findings instead of accepting bare pass notes.
    3. Update command catalog, generated CLI docs, user docs, and focused tests for the new review contract.
    4. Verify the command surface, quality gate behavior, docs freshness, policy routing, typecheck, and framework bootstrap.
  Verify Steps: |-
    1. Run `bun run format:changed`. Expected: touched files are formatted.
    2. Run `bun test packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts`. Expected: evaluator run parsing and quality gate validation pass.
    3. Run `bun run typecheck`. Expected: TypeScript project build passes.
    4. Run `ap help evaluator run`. Expected: help lists the new executable evaluator review command and repeatable review fields; framework bootstrap succeeds if runtime is stale.
    5. Run `bun run docs:cli:check`. Expected: generated CLI reference is fresh.
    6. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing passes.
    7. Run `ap evaluator run 202605232011-MAW1PK --verdict pass --summary "..." --finding "..." --evidence <path-or-check> --json`. Expected: task quality_review is recorded by EVALUATOR with quality-report, prompt, and opinion artifact paths.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T20:48:30.212Z — VERIFY — ok

    By: CODER

    Note: Implemented executable evaluator run command, stricter quality-review gate, docs, and focused tests. Checks passed: format:changed, focused bun tests, typecheck, docs:cli:check, policy routing, framework bootstrap/help.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T20:34:27.087Z, excerpt_hash=sha256:421054015862ce20f4c4e9f9e393e2087509bab883631363e6dd6ab5b1b94163

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605232011-MAW1PK-evaluator-quality-review/.agentplane/tasks/202605232011-MAW1PK/blueprint/resolved-snapshot.json
    - old_digest: 2a5ea3d6ff30a612b8851bd7232b29e5c478a66f618a719a2778aa58152bcc78
    - current_digest: 2a5ea3d6ff30a612b8851bd7232b29e5c478a66f618a719a2778aa58152bcc78
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605232011-MAW1PK

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Implement executable evaluator quality review

Implement executable evaluator quality review

## Scope

- In scope: Implement executable evaluator quality review.
- Out of scope: unrelated refactors not required for "Implement executable evaluator quality review".

## Plan

1. Add an executable evaluator review command that writes prompt, report, and opinion artifacts under the task directory.
2. Make task closure gates require a structured EVALUATOR quality report and non-empty pass findings instead of accepting bare pass notes.
3. Update command catalog, generated CLI docs, user docs, and focused tests for the new review contract.
4. Verify the command surface, quality gate behavior, docs freshness, policy routing, typecheck, and framework bootstrap.

## Verify Steps

1. Run `bun run format:changed`. Expected: touched files are formatted.
2. Run `bun test packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts`. Expected: evaluator run parsing and quality gate validation pass.
3. Run `bun run typecheck`. Expected: TypeScript project build passes.
4. Run `ap help evaluator run`. Expected: help lists the new executable evaluator review command and repeatable review fields; framework bootstrap succeeds if runtime is stale.
5. Run `bun run docs:cli:check`. Expected: generated CLI reference is fresh.
6. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing passes.
7. Run `ap evaluator run 202605232011-MAW1PK --verdict pass --summary "..." --finding "..." --evidence <path-or-check> --json`. Expected: task quality_review is recorded by EVALUATOR with quality-report, prompt, and opinion artifact paths.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T20:48:30.212Z — VERIFY — ok

By: CODER

Note: Implemented executable evaluator run command, stricter quality-review gate, docs, and focused tests. Checks passed: format:changed, focused bun tests, typecheck, docs:cli:check, policy routing, framework bootstrap/help.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T20:34:27.087Z, excerpt_hash=sha256:421054015862ce20f4c4e9f9e393e2087509bab883631363e6dd6ab5b1b94163

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605232011-MAW1PK-evaluator-quality-review/.agentplane/tasks/202605232011-MAW1PK/blueprint/resolved-snapshot.json
- old_digest: 2a5ea3d6ff30a612b8851bd7232b29e5c478a66f618a719a2778aa58152bcc78
- current_digest: 2a5ea3d6ff30a612b8851bd7232b29e5c478a66f618a719a2778aa58152bcc78
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605232011-MAW1PK

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
