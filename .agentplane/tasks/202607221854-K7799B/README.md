---
id: "202607221854-K7799B"
title: "Close all AgentPlane 0.7 architecture guard violations"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 22
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
  updated_at: "2026-08-01T18:35:15.026Z"
  updated_by: "TESTER"
  note: "Fresh verification for implementation SHA 48e131c52b3b. Per-command Command/Result/Evidence/Scope records are stored in Findings. Focused layering: 5/5 pass; doctor --dev: errors=0/OK; trust ratchet: 0; architecture violations: 0; typecheck: pass; compatibility readers: 42/42 pass; ci:contract: pass including schemas and 8 lifecycle invariants. Flake classification: none; no test retries."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-01T18:36:07.279Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "48e131c52b3bf71d733a5fcd7ee9991efffe6d73"
  blueprint_digest: "e9c3504d1f354ef743f0544f58c59c7926529573d244f755a901af02057bb02f"
  evidence_refs:
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-183529213-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-183529213-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-183529213-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-183529213-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-183529213-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221854-K7799B/README.md"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-183529213-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-183529213-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221854-K7799B/quality/20260801-183529213-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The prior deterministic-evidence gap is resolved: current verification targets evaluated SHA 48e131c52b3bf71d733a5fcd7ee9991efffe6d73 and covers the focused negative cases, architecture/trust gates, compatibility readers, schemas, lifecycle invariants, and type checking."
commit:
  hash: "48e131c52b3bf71d733a5fcd7ee9991efffe6d73"
  message: "🧱 K7799B architecture: cover OS imports and rework evidence"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: centralize source-layer checks, make the incremental clean-usecase root optional for doctor, and reject literal OS/Git/network imports including re-exports, dynamic imports, and require calls."
  -
    author: "CODER"
    body: "Implementation rework committed: reject node:os/os and add equivalent ports-root coverage for static imports, re-exports, dynamic imports, and require calls."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
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
  -
    type: "status"
    at: "2026-08-01T18:29:09.006Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework committed: reject node:os/os and add equivalent ports-root coverage for static imports, re-exports, dynamic imports, and require calls."
  -
    type: "verify"
    at: "2026-08-01T18:35:15.026Z"
    author: "TESTER"
    state: "ok"
    note: "Fresh verification for implementation SHA 48e131c52b3b. Per-command Command/Result/Evidence/Scope records are stored in Findings. Focused layering: 5/5 pass; doctor --dev: errors=0/OK; trust ratchet: 0; architecture violations: 0; typecheck: pass; compatibility readers: 42/42 pass; ci:contract: pass including schemas and 8 lifecycle invariants. Flake classification: none; no test retries."
  -
    type: "status"
    at: "2026-08-01T18:36:50.671Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-01T18:36:50.672Z"
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

    ### 2026-08-01T18:35:15.026Z — VERIFY — ok

    By: TESTER

    Note: Fresh verification for implementation SHA 48e131c52b3b. Per-command Command/Result/Evidence/Scope records are stored in Findings. Focused layering: 5/5 pass; doctor --dev: errors=0/OK; trust ratchet: 0; architecture violations: 0; typecheck: pass; compatibility readers: 42/42 pass; ci:contract: pass including schemas and 8 lifecycle invariants. Flake classification: none; no test retries.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T18:35:04.566Z, excerpt_hash=sha256:b77dc4d1c865ee15604ef604ab4ac950cd1d06c9fcf6b52a8b1314cac0710858

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

    - Observation: Command: bunx --no-install vitest --config vitest.workspace.ts run packages/agentplane/src/commands/doctor/layering.test.ts packages/agentplane/src/architecture/layering.imports.test.ts --reporter=dot. Result: pass. Evidence: 2 files passed; 5 tests passed; includes missing usecases root, OS/Git/network forms in usecases and ports, and direct CLI adapter imports.
      Impact: Scope: focused positive and negative regression surface for the shared doctor/architecture layering scanner at implementation SHA 48e131c52b3b.
      Resolution: Accepted as focused regression evidence; no flake or retry observed.

    - Observation: Command: ap doctor --dev. Result: pass. Evidence: source layering completed; errors=0; doctor OK. Four unrelated existing archive/state warnings remained non-blocking.
      Impact: Scope: operator-facing monorepo dev doctor, including the previously crashing absent clean-usecase directory path.
      Resolution: Accepted as reproduction-to-fix evidence for the original E_INTERNAL/ENOENT failure.

    - Observation: Command: bun run guards:check. Result: pass. Evidence: shared guards OK; trust-boundary ratchet OK with 0 reviewed violations.
      Impact: Scope: automatic semantic verdicts, agent-writable observed fields, implicit danger sandbox, untyped durable boundaries, rendered command orchestration, and duplicate runner task representations.
      Resolution: Accepted as zero active trust-baseline evidence with no suppression or baseline increase.

    - Observation: Command: bun run arch:check. Result: pass. Evidence: known dependency violations count=0/max=0; dependency-cruiser reported no violations for every package and command-family graph.
      Impact: Scope: circularity, command-catalog cycles, resolution, core/recipes layering, and runtime-to-testkit boundaries across the repository.
      Resolution: Accepted as full architecture dependency-matrix evidence.

    - Observation: Command: bun run typecheck. Result: pass. Evidence: run-typescript-build.mjs exited 0 using the configured native TypeScript 7 typecheck lane.
      Impact: Scope: workspace TypeScript contracts affected by the shared scanner and its tests.
      Resolution: Accepted as compile-time contract evidence.

    - Observation: Command: bunx --no-install vitest --config vitest.workspace.ts run packages/agentplane/src/runner/run-repository-compat.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts --pool=forks --maxWorkers=4 --testTimeout=60000 --hookTimeout=60000 --reporter=dot. Result: pass. Evidence: 3 files passed; 42 tests passed.
      Impact: Scope: versioned runner repository compatibility, evaluator legacy facade, and integration-queue legacy reader authority/provenance behavior.
      Resolution: Accepted as supported compatibility-reader matrix evidence.

    - Observation: Command: bun run ci:contract. Result: pass. Evidence: schemas OK; lifecycle invariant check OK with 8 invariants; policy/agents/docs/release parity, guards, lint, architecture, clone, Knip, and coverage threshold checks passed.
      Impact: Scope: repository-wide contract gate, including the task's required schema and lifecycle surfaces plus downstream static compatibility.
      Resolution: Accepted as full-gate evidence; no flake or retry observed on the evaluated implementation.

    - Observation: The prior verification record targeted SHA 41212b7a1a8b and could not verify the OS-import rework commit.
      Impact: Semantic quality review was correctly blocked because deterministic evidence was stale for SHA 48e131c52b3b.
      Resolution: Re-ran every declared gate and focused/compatibility matrices against the current implementation, then recorded exact command-level evidence in task Findings.
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

### 2026-08-01T18:35:15.026Z — VERIFY — ok

By: TESTER

Note: Fresh verification for implementation SHA 48e131c52b3b. Per-command Command/Result/Evidence/Scope records are stored in Findings. Focused layering: 5/5 pass; doctor --dev: errors=0/OK; trust ratchet: 0; architecture violations: 0; typecheck: pass; compatibility readers: 42/42 pass; ci:contract: pass including schemas and 8 lifecycle invariants. Flake classification: none; no test retries.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T18:35:04.566Z, excerpt_hash=sha256:b77dc4d1c865ee15604ef604ab4ac950cd1d06c9fcf6b52a8b1314cac0710858

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

- Observation: Command: bunx --no-install vitest --config vitest.workspace.ts run packages/agentplane/src/commands/doctor/layering.test.ts packages/agentplane/src/architecture/layering.imports.test.ts --reporter=dot. Result: pass. Evidence: 2 files passed; 5 tests passed; includes missing usecases root, OS/Git/network forms in usecases and ports, and direct CLI adapter imports.
  Impact: Scope: focused positive and negative regression surface for the shared doctor/architecture layering scanner at implementation SHA 48e131c52b3b.
  Resolution: Accepted as focused regression evidence; no flake or retry observed.

- Observation: Command: ap doctor --dev. Result: pass. Evidence: source layering completed; errors=0; doctor OK. Four unrelated existing archive/state warnings remained non-blocking.
  Impact: Scope: operator-facing monorepo dev doctor, including the previously crashing absent clean-usecase directory path.
  Resolution: Accepted as reproduction-to-fix evidence for the original E_INTERNAL/ENOENT failure.

- Observation: Command: bun run guards:check. Result: pass. Evidence: shared guards OK; trust-boundary ratchet OK with 0 reviewed violations.
  Impact: Scope: automatic semantic verdicts, agent-writable observed fields, implicit danger sandbox, untyped durable boundaries, rendered command orchestration, and duplicate runner task representations.
  Resolution: Accepted as zero active trust-baseline evidence with no suppression or baseline increase.

- Observation: Command: bun run arch:check. Result: pass. Evidence: known dependency violations count=0/max=0; dependency-cruiser reported no violations for every package and command-family graph.
  Impact: Scope: circularity, command-catalog cycles, resolution, core/recipes layering, and runtime-to-testkit boundaries across the repository.
  Resolution: Accepted as full architecture dependency-matrix evidence.

- Observation: Command: bun run typecheck. Result: pass. Evidence: run-typescript-build.mjs exited 0 using the configured native TypeScript 7 typecheck lane.
  Impact: Scope: workspace TypeScript contracts affected by the shared scanner and its tests.
  Resolution: Accepted as compile-time contract evidence.

- Observation: Command: bunx --no-install vitest --config vitest.workspace.ts run packages/agentplane/src/runner/run-repository-compat.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts --pool=forks --maxWorkers=4 --testTimeout=60000 --hookTimeout=60000 --reporter=dot. Result: pass. Evidence: 3 files passed; 42 tests passed.
  Impact: Scope: versioned runner repository compatibility, evaluator legacy facade, and integration-queue legacy reader authority/provenance behavior.
  Resolution: Accepted as supported compatibility-reader matrix evidence.

- Observation: Command: bun run ci:contract. Result: pass. Evidence: schemas OK; lifecycle invariant check OK with 8 invariants; policy/agents/docs/release parity, guards, lint, architecture, clone, Knip, and coverage threshold checks passed.
  Impact: Scope: repository-wide contract gate, including the task's required schema and lifecycle surfaces plus downstream static compatibility.
  Resolution: Accepted as full-gate evidence; no flake or retry observed on the evaluated implementation.

- Observation: The prior verification record targeted SHA 41212b7a1a8b and could not verify the OS-import rework commit.
  Impact: Semantic quality review was correctly blocked because deterministic evidence was stale for SHA 48e131c52b3b.
  Resolution: Re-ran every declared gate and focused/compatibility matrices against the current implementation, then recorded exact command-level evidence in task Findings.
