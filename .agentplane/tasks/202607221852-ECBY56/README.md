---
id: "202607221852-ECBY56"
title: "Expose phase-scoped run tool APIs"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on:
  - "202607310028-7KFTPH"
tags:
  - "authority"
  - "milestone-rc1"
  - "refactor"
  - "rf-23"
  - "runner"
  - "tools"
  - "v0.7"
  - "wave-authority"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run guards:check"
  - "bun run schemas:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T10:00:26.508Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-31T10:52:31.897Z"
  updated_by: "TESTER"
  note: "PASS: 92 focused tests cover all declared tools, typed denials, adapter limitations, hidden-help operation, audit linkage, and terminal revocation; guards, schemas, typecheck, and all 12 critical suites pass. One native Codex episode additionally proved supervisor acceptance of report_blocker, canonical result preservation, audit creation, token revocation, and broker cleanup."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-31T10:55:42.916Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 3 typed finding(s)."
  evaluated_sha: "da76a705009eb5c14b583c3fbf53c716dbead232"
  blueprint_digest: "06994c210493995daa176c6a0f33f623bbcad61117c9e8e81528f638b680b20d"
  evidence_refs:
    - ".agentplane/tasks/202607221852-ECBY56/quality/20260731-105542612-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221852-ECBY56/quality/20260731-105542612-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221852-ECBY56/quality/20260731-105542612-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221852-ECBY56/quality/20260731-105542612-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221852-ECBY56/quality/20260731-105542612-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221852-ECBY56/README.md"
    - ".agentplane/tasks/202607221852-ECBY56/quality/20260731-105542612-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221852-ECBY56/quality/20260731-105542612-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221852-ECBY56/quality/20260731-105542612-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The current HEAD contains no implementation delta beyond the reviewed signed phase-tool API; its additional commit records the implementation hash and CODER lifecycle evidence."
    - "The reviewed implementation binds authority to run, work order, task, state fingerprint, phase, role, tool set, and expiry, and keeps lifecycle operations outside the executor token."
    - "Native Codex evidence confirms accepted supervisor dispatch, durable audit, terminal revocation, canonical result preservation, and broker cleanup."
commit:
  hash: "da76a705009eb5c14b583c3fbf53c716dbead232"
  message: "🚧 ECBY56 task: Record implementation evidence"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented signed phase-scoped run tool APIs with a supervisor-owned broker, typed capability limits, terminal revocation, compatibility ratchet, and focused coverage."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-31T10:00:55.408Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-31T10:42:56.625Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented signed phase-scoped run tool APIs with a supervisor-owned broker, typed capability limits, terminal revocation, compatibility ratchet, and focused coverage."
  -
    type: "verify"
    at: "2026-07-31T10:52:31.897Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: 92 focused tests cover all declared tools, typed denials, adapter limitations, hidden-help operation, audit linkage, and terminal revocation; guards, schemas, typecheck, and all 12 critical suites pass. One native Codex episode additionally proved supervisor acceptance of report_blocker, canonical result preservation, audit creation, token revocation, and broker cleanup."
  -
    type: "status"
    at: "2026-07-31T10:56:33.606Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-31T10:56:33.607Z"
doc_updated_by: "CODER"
description: "RF-23: provide run-bound report_result, report_blocker, request_knowledge, and read-only knowledge tools while keeping lifecycle operations exclusively under supervisor authority."
sections:
  Summary: |-
    Expose phase-scoped run tool APIs

    RF-23: provide run-bound report_result, report_blocker, request_knowledge, and read-only knowledge tools while keeping lifecycle operations exclusively under supervisor authority.
  Scope: |-
    - In scope: phase/run token, tool schema and capability map, result/blocker/knowledge APIs, role-specific repository tool allowlists, typed denial, adapter capability negotiation, audit, expiry/revocation, and global-help non-reliance.
    - Out of scope: treating tool visibility as the only security boundary.
  Plan: |-
    1. Define run-bound identity, phase, role, fingerprint, capability, expiry, and authority claims.
    2. Expose only the approved semantic/reporting/knowledge operations for each phase.
    3. Validate every call server-side and route lifecycle operations to the supervisor only.
    4. Report adapter enforcement gaps truthfully.
    5. Add token tamper, expiry, cross-run, wrong-role, denied-lifecycle, and capability-downgrade tests.
  Verify Steps: |-
    1. Invoke each allowed tool with a valid phase token. Expected: typed response, receipt/audit linkage, and no lifecycle authority leak.
    2. Call lifecycle or wrong-role tools, or tamper/expire/reuse a token. Expected: typed denial before effects.
    3. Use an adapter lacking a requested tool/enforcement feature. Expected: capability map and work order state the limitation.
    4. Hide global CLI help from the episode. Expected: the supported run API remains complete and secure.
    5. Run schema/tool/guard/type tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-31T10:52:31.897Z — VERIFY — ok

    By: TESTER

    Note: PASS: 92 focused tests cover all declared tools, typed denials, adapter limitations, hidden-help operation, audit linkage, and terminal revocation; guards, schemas, typecheck, and all 12 critical suites pass. One native Codex episode additionally proved supervisor acceptance of report_blocker, canonical result preservation, audit creation, token revocation, and broker cleanup.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T10:42:56.625Z, excerpt_hash=sha256:66196a24934ea27f66efd7730a221a2a063ad918f4764a2a6991570b9d96824e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-ECBY56-expose-phase-scoped-run-tool-apis/.agentplane/tasks/202607221852-ECBY56/blueprint/resolved-snapshot.json
    - old_digest: 06994c210493995daa176c6a0f33f623bbcad61117c9e8e81528f638b680b20d
    - current_digest: 06994c210493995daa176c6a0f33f623bbcad61117c9e8e81528f638b680b20d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-ECBY56

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221852-ECBY56
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
    - Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
    - Re-run equivalence, recall, lifecycle, and type checks.
  Findings: |-
    - Observation: The outer direct-supervisor episode reported runner_receipt_unobserved even though the runner completed successfully and persisted a valid execution receipt.
      Impact: This may produce a false stopped outcome in the higher-level direct task supervision path, but it did not prevent or invalidate the RF-23 phase-tool call, audit, result, revocation, or cleanup.
      Resolution: Keep RF-23 verification passing and track the receipt-observation race as a separate follow-up; no provider retry was used.
      Promotion: incident-candidate
      Fixability: repo-fixable
      IncidentScope: runner direct supervision
      IncidentTags: runner, receipt
extensions:
  workflow_route_baseline:
    start_head_sha: "402709cb633549245a4231d902813a473e6c4103"
    version: 1
id_source: "generated"
---
## Summary

Expose phase-scoped run tool APIs

RF-23: provide run-bound report_result, report_blocker, request_knowledge, and read-only knowledge tools while keeping lifecycle operations exclusively under supervisor authority.

## Scope

- In scope: phase/run token, tool schema and capability map, result/blocker/knowledge APIs, role-specific repository tool allowlists, typed denial, adapter capability negotiation, audit, expiry/revocation, and global-help non-reliance.
- Out of scope: treating tool visibility as the only security boundary.

## Plan

1. Define run-bound identity, phase, role, fingerprint, capability, expiry, and authority claims.
2. Expose only the approved semantic/reporting/knowledge operations for each phase.
3. Validate every call server-side and route lifecycle operations to the supervisor only.
4. Report adapter enforcement gaps truthfully.
5. Add token tamper, expiry, cross-run, wrong-role, denied-lifecycle, and capability-downgrade tests.

## Verify Steps

1. Invoke each allowed tool with a valid phase token. Expected: typed response, receipt/audit linkage, and no lifecycle authority leak.
2. Call lifecycle or wrong-role tools, or tamper/expire/reuse a token. Expected: typed denial before effects.
3. Use an adapter lacking a requested tool/enforcement feature. Expected: capability map and work order state the limitation.
4. Hide global CLI help from the episode. Expected: the supported run API remains complete and secure.
5. Run schema/tool/guard/type tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-31T10:52:31.897Z — VERIFY — ok

By: TESTER

Note: PASS: 92 focused tests cover all declared tools, typed denials, adapter limitations, hidden-help operation, audit linkage, and terminal revocation; guards, schemas, typecheck, and all 12 critical suites pass. One native Codex episode additionally proved supervisor acceptance of report_blocker, canonical result preservation, audit creation, token revocation, and broker cleanup.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T10:42:56.625Z, excerpt_hash=sha256:66196a24934ea27f66efd7730a221a2a063ad918f4764a2a6991570b9d96824e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-ECBY56-expose-phase-scoped-run-tool-apis/.agentplane/tasks/202607221852-ECBY56/blueprint/resolved-snapshot.json
- old_digest: 06994c210493995daa176c6a0f33f623bbcad61117c9e8e81528f638b680b20d
- current_digest: 06994c210493995daa176c6a0f33f623bbcad61117c9e8e81528f638b680b20d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-ECBY56

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221852-ECBY56
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
- Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
- Re-run equivalence, recall, lifecycle, and type checks.

## Findings

- Observation: The outer direct-supervisor episode reported runner_receipt_unobserved even though the runner completed successfully and persisted a valid execution receipt.
  Impact: This may produce a false stopped outcome in the higher-level direct task supervision path, but it did not prevent or invalidate the RF-23 phase-tool call, audit, result, revocation, or cleanup.
  Resolution: Keep RF-23 verification passing and track the receipt-observation race as a separate follow-up; no provider retry was used.
  Promotion: incident-candidate
  Fixability: repo-fixable
  IncidentScope: runner direct supervision
  IncidentTags: runner, receipt
