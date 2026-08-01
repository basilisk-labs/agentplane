---
id: "202607221854-PGPR3J"
title: "Complete typed use-case and CLI rendering boundaries"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on:
  - "202607221854-SDPFN0"
tags:
  - "cli"
  - "milestone-rc2"
  - "refactor"
  - "rendering"
  - "rf-25"
  - "use-case"
  - "v0.7"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run guards:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T14:08:41.502Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T14:31:15.761Z"
  updated_by: "TESTER"
  note: "PASS: dependency closure, zero active rendered-command orchestration, centralized human/plain/JSON/error rendering, full 3204-test suite, critical tests, TypeScript 7 typecheck, guards, and ci:contract verified for 90711c8f4951."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-01T14:32:30.194Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "90711c8f495105820d163e5e3893ed7fea86635f"
  blueprint_digest: "f80f465b9c99dee8744aad9e55278a694b3ab888d1be7ac199fd56e7e27900ca"
  evidence_refs:
    - ".agentplane/tasks/202607221854-PGPR3J/quality/20260801-143147871-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221854-PGPR3J/quality/20260801-143147871-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221854-PGPR3J/quality/20260801-143147871-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221854-PGPR3J/quality/20260801-143147871-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221854-PGPR3J/quality/20260801-143147871-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221854-PGPR3J/README.md"
    - ".agentplane/tasks/202607221854-PGPR3J/quality/20260801-143147871-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221854-PGPR3J/quality/20260801-143147871-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221854-PGPR3J/verification/20260801143115761-169d083576c5b228.json"
    - ".agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json"
    - ".agentplane/tasks/202607221854-PGPR3J/quality/20260801-143147871-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Выступаю как эксперт по программной архитектуре, лауреат премии Рунета."
commit:
  hash: "90711c8f495105820d163e5e3893ed7fea86635f"
  message: "♻️ PGPR3J task: close typed rendering boundary"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation recorded: removed the obsolete unreferenced shell lifecycle adapter, reduced the trust-boundary ratchet to zero active reviewed violations, aligned the harness test matrix, and verified ci:contract, TypeScript 7 typecheck, critical tests, and the full AgentPlane suite (476 files / 3204 tests)."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-01T14:09:09.394Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T14:26:26.542Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation recorded: removed the obsolete unreferenced shell lifecycle adapter, reduced the trust-boundary ratchet to zero active reviewed violations, aligned the harness test matrix, and verified ci:contract, TypeScript 7 typecheck, critical tests, and the full AgentPlane suite (476 files / 3204 tests)."
  -
    type: "verify"
    at: "2026-08-01T14:31:15.761Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: dependency closure, zero active rendered-command orchestration, centralized human/plain/JSON/error rendering, full 3204-test suite, critical tests, TypeScript 7 typecheck, guards, and ci:contract verified for 90711c8f4951."
  -
    type: "status"
    at: "2026-08-01T14:33:31.951Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-01T14:33:31.952Z"
doc_updated_by: "CODER"
description: "RF-25e fan-in: integrate the typed-result/rendering work proven by every command-family slice, remove remaining internal subprocess/stdout orchestration, and validate centralized output/error/exit compatibility."
sections:
  Summary: |-
    Complete typed use-case and CLI rendering boundaries

    Integrate the typed-result and renderer contracts from all command-family vertical slices, remove the last internal subprocess/stdout orchestration paths, and validate centralized human/plain/JSON/error compatibility.
  Scope: |-
    - In scope: integrate typed result/error and renderer contracts from all five command-family slices, resolve only shared renderer/casing/exit conflicts, remove remaining internal AgentPlane subprocess or stdout parsing, and run repository-wide compatibility snapshots.
    - Out of scope: performing family-specific use-case migrations inside this fan-in task.
  Plan: |-
    1. Confirm CommandSession fan-in and all five vertical slices are DONE.
    2. Integrate shared result/error unions, casing transforms, renderers, and exit mappings.
    3. Remove the final internal subprocess/stdout parsing paths and ratchet them in architecture guards.
    4. Run repository-wide human/plain/JSON/error compatibility snapshots.
    5. Treat any remaining family-local migration as rework for its owning slice.
  Verify Steps: |-
    1. Resolve dependency closure. Expected: all five vertical slices and CommandSession fan-in are DONE.
    2. Trace every supervisor/internal operation. Expected: no AgentPlane subprocess, rendered shell command, or stdout parse remains.
    3. Render representative results/errors through human, plain, and JSON modes. Expected: centralized casing, guidance, remediation, exit, and compatibility snapshots pass.
    4. Run critical tests, guards, contract CI, typecheck, and a repository search for forbidden orchestration.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T14:31:15.761Z — VERIFY — ok

    By: TESTER

    Note: PASS: dependency closure, zero active rendered-command orchestration, centralized human/plain/JSON/error rendering, full 3204-test suite, critical tests, TypeScript 7 typecheck, guards, and ci:contract verified for 90711c8f4951.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T14:26:26.542Z, excerpt_hash=sha256:77cfcf11f829a633f13604df2c747791dcb4f5439f40870d56ef33fb44a78622

    Details:

    Command: node dependency-closure assertion over the six exact task documents
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json (sha256:53023f656c7f64a8ef8a9d7299693abbc9754289d85bb19a4b3242f78a09f1dc)
    Scope: All five RF-25 vertical slices and the CommandSession fan-in are DONE with verification.state=ok and quality_review.state=pass.

    Command: node scripts/checks/check-trust-boundary-ratchet.mjs --report
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
    Scope: The collector returned an empty array; no active AgentPlane subprocess, rendered shell-command orchestration, stdout protocol parse, or other reviewed trust-boundary violation remains.

    Command: bunx vitest run packages/agentplane/src/cli/output.test.ts packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/commands/provider-ops-results.test.ts packages/agentplane/src/commands/context/context-results.unit.test.ts packages/agentplane/src/commands/task/run-render.test.ts
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
    Scope: 5 files and 36 tests cover centralized human/plain/JSON output, error mapping, guidance, remediation, typed command-family results, and task-run rendering.

    Command: bun run --filter=agentplane test
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
    Scope: Full AgentPlane suite passed after the implementation commit with 476 files and 3204 tests.

    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
    Scope: All 12 critical CLI chunks and 77 tests passed, including exit and trust-boundary compatibility.

    Command: bun run ci:contract
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
    Scope: Full deterministic repository contract passed, including formatting, docs integrity, schemas, compatibility, efficiency, lifecycle, toolchain, guards, lint, architecture, Knip, and coverage gates.

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
    Scope: Workspace TypeScript build passed with the configured TypeScript 7.0.2 typecheck toolchain.

    Command: bun run guards:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
    Scope: Shared guards passed and the trust-boundary ratchet reported 0 reviewed violations.

    Command: git diff --exit-code HEAD -- packages scripts docs
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
    Scope: No uncommitted semantic or documentation drift exists after implementation SHA 90711c8f4951.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-PGPR3J-complete-typed-use-case-and-cli-rendering-bounda/.agentplane/tasks/202607221854-PGPR3J/blueprint/resolved-snapshot.json
    - old_digest: f80f465b9c99dee8744aad9e55278a694b3ab888d1be7ac199fd56e7e27900ca
    - current_digest: f80f465b9c99dee8744aad9e55278a694b3ab888d1be7ac199fd56e7e27900ca
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221854-PGPR3J

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221854-PGPR3J
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the cross-family renderer integration while preserving independently merged typed use cases.
    - Restore only centralized compatibility renderers, never internal subprocess/stdout parsing.
    - Re-run family and repository-wide snapshots before retry.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "89409146383825b0e6df835d2fa414eb0c60e0d1"
    version: 1
id_source: "generated"
---
## Summary

Complete typed use-case and CLI rendering boundaries

Integrate the typed-result and renderer contracts from all command-family vertical slices, remove the last internal subprocess/stdout orchestration paths, and validate centralized human/plain/JSON/error compatibility.

## Scope

- In scope: integrate typed result/error and renderer contracts from all five command-family slices, resolve only shared renderer/casing/exit conflicts, remove remaining internal AgentPlane subprocess or stdout parsing, and run repository-wide compatibility snapshots.
- Out of scope: performing family-specific use-case migrations inside this fan-in task.

## Plan

1. Confirm CommandSession fan-in and all five vertical slices are DONE.
2. Integrate shared result/error unions, casing transforms, renderers, and exit mappings.
3. Remove the final internal subprocess/stdout parsing paths and ratchet them in architecture guards.
4. Run repository-wide human/plain/JSON/error compatibility snapshots.
5. Treat any remaining family-local migration as rework for its owning slice.

## Verify Steps

1. Resolve dependency closure. Expected: all five vertical slices and CommandSession fan-in are DONE.
2. Trace every supervisor/internal operation. Expected: no AgentPlane subprocess, rendered shell command, or stdout parse remains.
3. Render representative results/errors through human, plain, and JSON modes. Expected: centralized casing, guidance, remediation, exit, and compatibility snapshots pass.
4. Run critical tests, guards, contract CI, typecheck, and a repository search for forbidden orchestration.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T14:31:15.761Z — VERIFY — ok

By: TESTER

Note: PASS: dependency closure, zero active rendered-command orchestration, centralized human/plain/JSON/error rendering, full 3204-test suite, critical tests, TypeScript 7 typecheck, guards, and ci:contract verified for 90711c8f4951.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T14:26:26.542Z, excerpt_hash=sha256:77cfcf11f829a633f13604df2c747791dcb4f5439f40870d56ef33fb44a78622

Details:

Command: node dependency-closure assertion over the six exact task documents
Result: pass
Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json (sha256:53023f656c7f64a8ef8a9d7299693abbc9754289d85bb19a4b3242f78a09f1dc)
Scope: All five RF-25 vertical slices and the CommandSession fan-in are DONE with verification.state=ok and quality_review.state=pass.

Command: node scripts/checks/check-trust-boundary-ratchet.mjs --report
Result: pass
Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
Scope: The collector returned an empty array; no active AgentPlane subprocess, rendered shell-command orchestration, stdout protocol parse, or other reviewed trust-boundary violation remains.

Command: bunx vitest run packages/agentplane/src/cli/output.test.ts packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/commands/provider-ops-results.test.ts packages/agentplane/src/commands/context/context-results.unit.test.ts packages/agentplane/src/commands/task/run-render.test.ts
Result: pass
Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
Scope: 5 files and 36 tests cover centralized human/plain/JSON output, error mapping, guidance, remediation, typed command-family results, and task-run rendering.

Command: bun run --filter=agentplane test
Result: pass
Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
Scope: Full AgentPlane suite passed after the implementation commit with 476 files and 3204 tests.

Command: bun run test:critical
Result: pass
Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
Scope: All 12 critical CLI chunks and 77 tests passed, including exit and trust-boundary compatibility.

Command: bun run ci:contract
Result: pass
Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
Scope: Full deterministic repository contract passed, including formatting, docs integrity, schemas, compatibility, efficiency, lifecycle, toolchain, guards, lint, architecture, Knip, and coverage gates.

Command: bun run typecheck
Result: pass
Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
Scope: Workspace TypeScript build passed with the configured TypeScript 7.0.2 typecheck toolchain.

Command: bun run guards:check
Result: pass
Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
Scope: Shared guards passed and the trust-boundary ratchet reported 0 reviewed violations.

Command: git diff --exit-code HEAD -- packages scripts docs
Result: pass
Evidence: .agentplane/cache/verification/202607221854-PGPR3J-90711c8f4951-checks.json
Scope: No uncommitted semantic or documentation drift exists after implementation SHA 90711c8f4951.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-PGPR3J-complete-typed-use-case-and-cli-rendering-bounda/.agentplane/tasks/202607221854-PGPR3J/blueprint/resolved-snapshot.json
- old_digest: f80f465b9c99dee8744aad9e55278a694b3ab888d1be7ac199fd56e7e27900ca
- current_digest: f80f465b9c99dee8744aad9e55278a694b3ab888d1be7ac199fd56e7e27900ca
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-PGPR3J

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221854-PGPR3J
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the cross-family renderer integration while preserving independently merged typed use cases.
- Restore only centralized compatibility renderers, never internal subprocess/stdout parsing.
- Re-run family and repository-wide snapshots before retry.

## Findings
