---
id: "202608032250-WDRW1E"
title: "Stabilize supervisor latency p95 qualification sampling"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "qualification"
  - "v0.7.1"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T22:51:02.812Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-03T22:56:31.111Z"
  updated_by: "REVIEWER"
  note: "Focused contracts, static checks, policy checks, and exact-commit supervisor latency evidence pass with unchanged regression budgets."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-03T22:56:30.442Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "6a7485ce21995a1114899d406946b4ebcb65f69b"
  blueprint_digest: "e90054ca2323f28a9c48691a3968c31561ad6d5b45df941747961758f2205c6d"
  evidence_refs:
    - ".agentplane/tasks/202608032250-WDRW1E/quality/20260803-225629896-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608032250-WDRW1E/quality/20260803-225629896-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608032250-WDRW1E/quality/objects/sha256/bda993901fde4d00ddafcaa0f764e7647f176960146f35593b88571853ef4eda.md"
    - ".agentplane/tasks/202608032250-WDRW1E/quality/20260803-225629896-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608032250-WDRW1E/quality/20260803-225629896-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608032250-WDRW1E/quality/20260803-225629896-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608032250-WDRW1E/README.md"
    - ".agentplane/tasks/202608032250-WDRW1E/quality/objects/sha256/6a1a52e67c03572d455ab8a7c0f772fb700cb38290c80e2cfab3cc21fc6a55c3.patch"
    - ".agentplane/tasks/202608032250-WDRW1E/quality/objects/sha256/9b859b02483015ccc016fa00987f0bfc0bc9176fd1d782214e6aa75b2a126808.json"
    - ".agentplane/tasks/202608032250-WDRW1E/quality/objects/sha256/dac599932dfda8b9224d90f8ee0259627888182a4aaa2c473246d171d0c5b7ae.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "No blocking issue: the 10 percent median and p95 thresholds are unchanged, while both public supervisor frontends now require 20 cold and 30 warm observations."
commit:
  hash: "6a7485ce21995a1114899d406946b4ebcb65f69b"
  message: "🧪 WDRW1E task: stabilize supervisor latency sampling"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-03T22:51:22.964Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-03T22:53:02.905Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
  -
    type: "verify"
    at: "2026-08-03T22:56:31.111Z"
    author: "REVIEWER"
    state: "ok"
    note: "Focused contracts, static checks, policy checks, and exact-commit supervisor latency evidence pass with unchanged regression budgets."
doc_version: 3
doc_updated_at: "2026-08-03T22:56:32.238Z"
doc_updated_by: "CODER"
description: "Increase the mandatory cold supervisor latency sample from 10 to 20 while preserving the existing 10 percent regression budget, so release qualification uses a meaningful p95 estimate instead of treating one maximum outlier as p95."
sections:
  Summary: |-
    Stabilize supervisor latency p95 qualification sampling

    Increase the mandatory cold supervisor latency sample from 10 to 20 while preserving the existing 10 percent regression budget, so release qualification uses a meaningful p95 estimate instead of treating one maximum outlier as p95.
  Scope: |-
    - In scope: Increase the mandatory cold supervisor latency sample from 10 to 20 while preserving the existing 10 percent regression budget, so release qualification uses a meaningful p95 estimate instead of treating one maximum outlier as p95.
    - Out of scope: unrelated refactors not required for "Stabilize supervisor latency p95 qualification sampling".
  Plan: "1. Raise the supervisor cold-run minimum and default from 10 to 20 without changing the existing 10 percent median or p95 regression budget. 2. Update qualification contract tests so 20 cold and 30 warm samples are required for both managed-run and external-advance frontends, including explicit rejection of the former 10-sample shape. 3. Run focused qualification tests, type checking, linting, formatting, the supervisor benchmark, and hosted PR verification before integration."
  Verify Steps: |-
    1. Run the focused release qualification contract tests. Expected: reports with 20 cold and 30 warm samples for both public frontends validate; a report with only 10 cold samples is rejected.
    2. Run TypeScript type checking, ESLint, and Prettier checks for the touched qualification files. Expected: all pass without unrelated changes.
    3. Run the supervisor latency benchmark against the exact task commit. Expected: both managed-run and external-advance cold and warm surfaces satisfy the unchanged 10 percent median and p95 budgets with the new 20/30 sample contract.
    4. Complete independent evaluator review and hosted PR verification. Expected: no blocking findings and all required checks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-03T22:56:31.111Z — VERIFY — ok

    By: REVIEWER

    Note: Focused contracts, static checks, policy checks, and exact-commit supervisor latency evidence pass with unchanged regression budgets.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T22:53:02.905Z, excerpt_hash=sha256:083a50ba9a0fe6bb72254d980cf12f5ddbc27880b7e6124f1dfa4c86beca88f0

    Details:

    Command: node --test scripts/qualification/release-qualification.test.mjs
    Result: pass (19/19)
    Evidence: contract accepts 20 cold and 30 warm samples and rejects 10 cold samples
    Scope: release qualification contract

    Command: bun run typecheck; bunx eslint <touched files>; bunx prettier --check <touched files>
    Result: pass
    Evidence: no type, lint, or format findings
    Scope: touched qualification files and repository TypeScript build

    Command: node scripts/qualification/measure-v0.7.1-supervisor-latency.mjs --subject 9aa94fdec57505e39ae2f3f7333305911f260ff2 --out .agentplane/tasks/202608032250-WDRW1E/evidence/supervisor-latency-9aa94fdec.json
    Result: pass
    Evidence: 20 cold and 30 warm samples per side for external_advance and managed_run_preparation; failure_ids=[]; unchanged 10 percent median and p95 ceiling
    Scope: exact clean implementation commit against published 0.6.26

    Command: ap doctor; node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: doctor errors=0; routing policy OK; historical warnings are outside task scope
    Scope: repository policy and workspace health

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032250-WDRW1E-stabilize-supervisor-latency-p95-qualification-s/.agentplane/tasks/202608032250-WDRW1E/blueprint/resolved-snapshot.json
    - old_digest: e90054ca2323f28a9c48691a3968c31561ad6d5b45df941747961758f2205c6d
    - current_digest: e90054ca2323f28a9c48691a3968c31561ad6d5b45df941747961758f2205c6d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608032250-WDRW1E

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "0b15f5b7ad169169dec9c46ba02d4e59307d8553"
    version: 1
id_source: "generated"
---
## Summary

Stabilize supervisor latency p95 qualification sampling

Increase the mandatory cold supervisor latency sample from 10 to 20 while preserving the existing 10 percent regression budget, so release qualification uses a meaningful p95 estimate instead of treating one maximum outlier as p95.

## Scope

- In scope: Increase the mandatory cold supervisor latency sample from 10 to 20 while preserving the existing 10 percent regression budget, so release qualification uses a meaningful p95 estimate instead of treating one maximum outlier as p95.
- Out of scope: unrelated refactors not required for "Stabilize supervisor latency p95 qualification sampling".

## Plan

1. Raise the supervisor cold-run minimum and default from 10 to 20 without changing the existing 10 percent median or p95 regression budget. 2. Update qualification contract tests so 20 cold and 30 warm samples are required for both managed-run and external-advance frontends, including explicit rejection of the former 10-sample shape. 3. Run focused qualification tests, type checking, linting, formatting, the supervisor benchmark, and hosted PR verification before integration.

## Verify Steps

1. Run the focused release qualification contract tests. Expected: reports with 20 cold and 30 warm samples for both public frontends validate; a report with only 10 cold samples is rejected.
2. Run TypeScript type checking, ESLint, and Prettier checks for the touched qualification files. Expected: all pass without unrelated changes.
3. Run the supervisor latency benchmark against the exact task commit. Expected: both managed-run and external-advance cold and warm surfaces satisfy the unchanged 10 percent median and p95 budgets with the new 20/30 sample contract.
4. Complete independent evaluator review and hosted PR verification. Expected: no blocking findings and all required checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-03T22:56:31.111Z — VERIFY — ok

By: REVIEWER

Note: Focused contracts, static checks, policy checks, and exact-commit supervisor latency evidence pass with unchanged regression budgets.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T22:53:02.905Z, excerpt_hash=sha256:083a50ba9a0fe6bb72254d980cf12f5ddbc27880b7e6124f1dfa4c86beca88f0

Details:

Command: node --test scripts/qualification/release-qualification.test.mjs
Result: pass (19/19)
Evidence: contract accepts 20 cold and 30 warm samples and rejects 10 cold samples
Scope: release qualification contract

Command: bun run typecheck; bunx eslint <touched files>; bunx prettier --check <touched files>
Result: pass
Evidence: no type, lint, or format findings
Scope: touched qualification files and repository TypeScript build

Command: node scripts/qualification/measure-v0.7.1-supervisor-latency.mjs --subject 9aa94fdec57505e39ae2f3f7333305911f260ff2 --out .agentplane/tasks/202608032250-WDRW1E/evidence/supervisor-latency-9aa94fdec.json
Result: pass
Evidence: 20 cold and 30 warm samples per side for external_advance and managed_run_preparation; failure_ids=[]; unchanged 10 percent median and p95 ceiling
Scope: exact clean implementation commit against published 0.6.26

Command: ap doctor; node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: doctor errors=0; routing policy OK; historical warnings are outside task scope
Scope: repository policy and workspace health

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032250-WDRW1E-stabilize-supervisor-latency-p95-qualification-s/.agentplane/tasks/202608032250-WDRW1E/blueprint/resolved-snapshot.json
- old_digest: e90054ca2323f28a9c48691a3968c31561ad6d5b45df941747961758f2205c6d
- current_digest: e90054ca2323f28a9c48691a3968c31561ad6d5b45df941747961758f2205c6d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608032250-WDRW1E

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
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
