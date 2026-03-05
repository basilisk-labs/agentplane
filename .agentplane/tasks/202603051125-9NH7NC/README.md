---
id: "202603051125-9NH7NC"
title: "Add reason_code and reconcile checks for mutating commands"
result_summary: "Reconcile guard added for key mutations with reason_code diagnostics"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-05T11:32:01.705Z"
  updated_by: "CODER"
  note: "Reconcile guard and reason_code wiring validated"
commit:
  hash: "e1b8a2e4e1f0d320a3d856e8354674eb62e9d1ec"
  message: "🚧 9NH7NC code: add reconcile guard and reason codes"
comments:
  -
    author: "CODER"
    body: "Start: implement reconcile-before-mutation guard and standardized reason_code wiring for finish/verify/guard commit paths with regression tests."
  -
    author: "CODER"
    body: "Verified: reconcile-before-mutation checks now run on key mutation paths, strict task-scan drift is surfaced with standardized reason_code values, and guard/finish/verify flows provide deterministic operator guidance for remediation."
events:
  -
    type: "status"
    at: "2026-03-05T11:25:25.696Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement reconcile-before-mutation guard and standardized reason_code wiring for finish/verify/guard commit paths with regression tests."
  -
    type: "verify"
    at: "2026-03-05T11:32:01.705Z"
    author: "CODER"
    state: "ok"
    note: "Reconcile guard and reason_code wiring validated"
  -
    type: "status"
    at: "2026-03-05T11:32:01.728Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: reconcile-before-mutation checks now run on key mutation paths, strict task-scan drift is surfaced with standardized reason_code values, and guard/finish/verify flows provide deterministic operator guidance for remediation."
doc_version: 2
doc_updated_at: "2026-03-05T11:32:01.728Z"
doc_updated_by: "CODER"
description: "Introduce standardized reason_code for reconcile guard failures and enforce reconcile-before-mutation checks in key mutating command paths."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-05T11:32:01.705Z — VERIFY — ok

By: CODER

Note: Reconcile guard and reason_code wiring validated

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-05T11:25:25.699Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

Details:

Implemented ensureReconciledBeforeMutation and wired it into finish, verify, commit, and guard commit. Added reason_code-aware guidance in CLI error mapping. Validation: bun run test:fast -- packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts; bun run lint:core; bun run typecheck.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
