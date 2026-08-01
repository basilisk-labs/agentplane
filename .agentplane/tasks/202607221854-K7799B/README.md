---
id: "202607221854-K7799B"
title: "Close all AgentPlane 0.7 architecture guard violations"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202607221846-9XC1H0"
  - "202607221848-VC4VVS"
  - "202607221850-9C9WBP"
  - "202607221850-DRWR0V"
  - "202607221852-71SCSW"
  - "202607221854-87892M"
  - "202607221854-PGPR3J"
  - "202607221854-SDPFN0"
tags:
  - "architecture"
  - "guard"
  - "milestone-rc2"
  - "quality"
  - "refactor"
  - "rf-27"
  - "v0.7"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run arch:check"
  - "bun run ci:contract"
  - "bun run guards:check"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T18:06:44.653Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T18:25:54.518Z"
  updated_by: "TESTER"
  note: "Verified commit 41212b7a1a8b: reproduced the pre-fix ap doctor --dev E_INTERNAL/ENOENT on missing src/usecases; post-fix doctor --dev passes. Focused layering regressions: 4/4 pass. Compatibility matrix (run-repository v1, evaluator legacy facade, integration queue legacy reader): 46/46 pass. Full gates: ci:contract pass; typecheck pass; guards/trust ratchet pass with 0 reviewed violations; arch check pass with 0 dependency violations; critical CLI 12/12 chunks pass. Flake classification: none; one expected stale-dist gate required framework bootstrap after source mutation and then passed."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-01T18:27:10.687Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 2 typed finding(s)."
  evaluated_sha: "41212b7a1a8b7127e773a587b652701298477648"
  blueprint_digest: "e9c3504d1f354ef743f0544f58c59c7926529573d244f755a901af02057bb02f"
  evidence_refs:
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-182626460-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-182626460-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-182626460-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-182626460-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-182626460-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-182626460-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607221854-K7799B/README.md"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-182626460-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-182626460-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-182626460-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The tightened use-case import guard still permits direct operating-system access through node:os or os, so it cannot enforce the declared zero-violation boundary for direct OS imports."
    - "The frozen verification evidence contains only a combined narrative assertion: it has no per-command records, runner history, runtime evidence, exact key output, or coverage scope for the declared gates."
commit:
  hash: "41212b7a1a8b7127e773a587b652701298477648"
  message: "🧱 K7799B architecture: harden source layering guard"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: centralize source-layer checks, make the incremental clean-usecase root optional for doctor, and reject literal OS/Git/network imports including re-exports, dynamic imports, and require calls."
events:
  -
    type: "status"
    at: "2026-08-01T18:07:23.121Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T18:23:37.736Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: centralize source-layer checks, make the incremental clean-usecase root optional for doctor, and reject literal OS/Git/network imports including re-exports, dynamic imports, and require calls."
  -
    type: "verify"
    at: "2026-08-01T18:25:54.518Z"
    author: "TESTER"
    state: "ok"
    note: "Verified commit 41212b7a1a8b: reproduced the pre-fix ap doctor --dev E_INTERNAL/ENOENT on missing src/usecases; post-fix doctor --dev passes. Focused layering regressions: 4/4 pass. Compatibility matrix (run-repository v1, evaluator legacy facade, integration queue legacy reader): 46/46 pass. Full gates: ci:contract pass; typecheck pass; guards/trust ratchet pass with 0 reviewed violations; arch check pass with 0 dependency violations; critical CLI 12/12 chunks pass. Flake classification: none; one expected stale-dist gate required framework bootstrap after source mutation and then passed."
doc_version: 3
doc_updated_at: "2026-08-01T18:25:55.275Z"
doc_updated_by: "CODER"
description: "RF-27b: reduce the trust/architecture baseline to zero for automatic verdicts, agent-owned observations, untyped durable boundaries, shell orchestration, duplicate task views, undeclared capabilities, and direct OS/Git/network imports in migrated use cases."
sections:
  Summary: |-
    Close all AgentPlane 0.7 architecture guard violations

    RF-27b: reduce the trust/architecture baseline to zero for automatic verdicts, agent-owned observations, untyped durable boundaries, shell orchestration, duplicate task views, undeclared capabilities, and direct OS/Git/network imports in migrated use cases.
  Scope: |-
    - In scope: eliminate every v0.7 ratchet baseline entry, tighten dependency rules, ensure new use cases use ports, remove compatibility code whose window ends at 0.7, and document any intentionally retained public v1 reader separately from violations.
    - Out of scope: hiding unresolved violations by broad exclusions or resetting the baseline upward.
  Plan: |-
    1. Re-run every architecture/trust rule and assign each remaining violation to its owning migrated slice.
    2. Remove violations or replace them with explicit versioned compatibility adapters that satisfy the rule.
    3. Tighten dependency/import rules for new use cases and command sessions.
    4. Reduce the machine baseline to zero and prohibit recreation.
    5. Run full architecture, contract, lifecycle, schema, and type gates.
  Verify Steps: |-
    1. Run the trust-boundary checker and architecture guards. Expected: zero baseline violations and zero suppressions added for v0.7 paths.
    2. Search production for automatic verdicts, agent-writable observed fields, internal shell orchestration, unsafe durable casts, duplicate TaskData projections, and undeclared direct OS/Git/network imports. Expected: none remain.
    3. Exercise supported compatibility readers. Expected: they are versioned, tested adapters and cannot violate authority/provenance.
    4. Run guards, arch check, contract CI, lifecycle invariants, schemas, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T18:25:54.518Z — VERIFY — ok

    By: TESTER

    Note: Verified commit 41212b7a1a8b: reproduced the pre-fix ap doctor --dev E_INTERNAL/ENOENT on missing src/usecases; post-fix doctor --dev passes. Focused layering regressions: 4/4 pass. Compatibility matrix (run-repository v1, evaluator legacy facade, integration queue legacy reader): 46/46 pass. Full gates: ci:contract pass; typecheck pass; guards/trust ratchet pass with 0 reviewed violations; arch check pass with 0 dependency violations; critical CLI 12/12 chunks pass. Flake classification: none; one expected stale-dist gate required framework bootstrap after source mutation and then passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T18:23:37.736Z, excerpt_hash=sha256:b77dc4d1c865ee15604ef604ab4ac950cd1d06c9fcf6b52a8b1314cac0710858

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-K7799B-close-all-agentplane-0-7-architecture-guard-viol/.agentplane/tasks/202607221854-K7799B/blueprint/resolved-snapshot.json
    - old_digest: e9c3504d1f354ef743f0544f58c59c7926529573d244f755a901af02057bb02f
    - current_digest: e9c3504d1f354ef743f0544f58c59c7926529573d244f755a901af02057bb02f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221854-K7799B

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221854-K7799B
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the guard-closing changes together with any dependent contract removal.
    - Never restore the violation baseline without explicit scope re-approval and a named follow-up owner.
    - Re-run the full architecture and contract lane.
  Findings: |-
    - Observation: The doctor and architecture tests had duplicated scanners; doctor treated the incremental clean-usecase directory as mandatory and crashed when it was absent.
      Impact: A green architecture test did not guarantee that the operator-facing dev doctor could execute, and the duplicated import lists could drift.
      Resolution: Use the doctor scanner as the single contract, accept an absent optional clean-usecase root, expand literal OS/Git/network detection, and cover static imports, re-exports, dynamic imports, require calls, and direct CLI adapter imports.
extensions:
  workflow_route_baseline:
    start_head_sha: "365bd520baed0eac843fe41eb5df7bd2a505c4ca"
    version: 1
id_source: "generated"
---
## Summary

Close all AgentPlane 0.7 architecture guard violations

RF-27b: reduce the trust/architecture baseline to zero for automatic verdicts, agent-owned observations, untyped durable boundaries, shell orchestration, duplicate task views, undeclared capabilities, and direct OS/Git/network imports in migrated use cases.

## Scope

- In scope: eliminate every v0.7 ratchet baseline entry, tighten dependency rules, ensure new use cases use ports, remove compatibility code whose window ends at 0.7, and document any intentionally retained public v1 reader separately from violations.
- Out of scope: hiding unresolved violations by broad exclusions or resetting the baseline upward.

## Plan

1. Re-run every architecture/trust rule and assign each remaining violation to its owning migrated slice.
2. Remove violations or replace them with explicit versioned compatibility adapters that satisfy the rule.
3. Tighten dependency/import rules for new use cases and command sessions.
4. Reduce the machine baseline to zero and prohibit recreation.
5. Run full architecture, contract, lifecycle, schema, and type gates.

## Verify Steps

1. Run the trust-boundary checker and architecture guards. Expected: zero baseline violations and zero suppressions added for v0.7 paths.
2. Search production for automatic verdicts, agent-writable observed fields, internal shell orchestration, unsafe durable casts, duplicate TaskData projections, and undeclared direct OS/Git/network imports. Expected: none remain.
3. Exercise supported compatibility readers. Expected: they are versioned, tested adapters and cannot violate authority/provenance.
4. Run guards, arch check, contract CI, lifecycle invariants, schemas, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T18:25:54.518Z — VERIFY — ok

By: TESTER

Note: Verified commit 41212b7a1a8b: reproduced the pre-fix ap doctor --dev E_INTERNAL/ENOENT on missing src/usecases; post-fix doctor --dev passes. Focused layering regressions: 4/4 pass. Compatibility matrix (run-repository v1, evaluator legacy facade, integration queue legacy reader): 46/46 pass. Full gates: ci:contract pass; typecheck pass; guards/trust ratchet pass with 0 reviewed violations; arch check pass with 0 dependency violations; critical CLI 12/12 chunks pass. Flake classification: none; one expected stale-dist gate required framework bootstrap after source mutation and then passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T18:23:37.736Z, excerpt_hash=sha256:b77dc4d1c865ee15604ef604ab4ac950cd1d06c9fcf6b52a8b1314cac0710858

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-K7799B-close-all-agentplane-0-7-architecture-guard-viol/.agentplane/tasks/202607221854-K7799B/blueprint/resolved-snapshot.json
- old_digest: e9c3504d1f354ef743f0544f58c59c7926529573d244f755a901af02057bb02f
- current_digest: e9c3504d1f354ef743f0544f58c59c7926529573d244f755a901af02057bb02f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-K7799B

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221854-K7799B
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the guard-closing changes together with any dependent contract removal.
- Never restore the violation baseline without explicit scope re-approval and a named follow-up owner.
- Re-run the full architecture and contract lane.

## Findings

- Observation: The doctor and architecture tests had duplicated scanners; doctor treated the incremental clean-usecase directory as mandatory and crashed when it was absent.
  Impact: A green architecture test did not guarantee that the operator-facing dev doctor could execute, and the duplicated import lists could drift.
  Resolution: Use the doctor scanner as the single contract, accept an absent optional clean-usecase root, expand literal OS/Git/network detection, and cover static imports, re-exports, dynamic imports, require calls, and direct CLI adapter imports.
