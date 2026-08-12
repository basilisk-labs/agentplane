---
id: "202608112259-T3ZDDM"
title: "Optimize the verification and test pipeline around one computed Verification Contract"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202608112232-3NC7Y4"
  - "202608120643-75ZFHW"
tags:
  - "architecture"
  - "performance"
  - "test"
  - "verification"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-11T23:01:09.445Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-12T18:06:53.436Z"
  updated_by: "TESTER"
  note: "Verification Contract optimization passed exact-SHA local, hosted, benchmark, compatibility, documentation, platform, and failure-isolation qualification."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-12T18:16:56.212Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 3 typed finding(s)."
  evaluated_sha: "8a0288974653616f3566215003061bed67ded47d"
  blueprint_digest: "ab26fac451f89290abafc5d80e4c3a20e3154a18baea41de0e22aafb6427f5bb"
  evidence_refs:
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/20260812-181554147-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/20260812-181554147-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/90d962e274ac1745754c95c1c106aeecfcdfd2e3d68afc08170ed1851c0ca0e9.md"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/20260812-181554147-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/20260812-181554147-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/20260812-181554147-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/20260812-181554147-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608112259-T3ZDDM/README.md"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/fa6040f58e26cbb69e73de62e8024819f9b43fa80ff04de4f4fd57c8ae2fe29c.patch"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/ee5e04dbea9400fc0db15f83ef13f29b6ecfb775d67d8104dc98cf6289f6ae1a.json"
    - ".agentplane/tasks/202608112259-T3ZDDM/verification/20260812180653436-1da08017f7d9e5b4.json"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/478fe6fd0549b9c5f29594800dcc6351fe24c8d2b80ecb1bb3e98d5c1600c1ea.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The recorded performance qualification uses the planning-only benchmark, so it does not measure mandatory local verification."
    - "Lifecycle/control-plane command count is asserted as a constant rather than reproducibly collected."
    - "Frozen verification evidence does not provide traceable artifacts for several claimed mandatory checks."
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "b4fd43e41c910ff8b978fb72060efac4991eb72f"
  message: "⚡ T3ZDDM verification: optimize contract pipeline"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed at b4fd43e41: one deterministic Verification Contract now governs local and hosted selection; exact verification reuse, bounded parallel scheduling, worktree dependency isolation, benchmark guards, schemas, tests, and documentation are included."
events:
  -
    type: "status"
    at: "2026-08-12T08:35:41.546Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-12T15:45:16.486Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed at b4fd43e41: one deterministic Verification Contract now governs local and hosted selection; exact verification reuse, bounded parallel scheduling, worktree dependency isolation, benchmark guards, schemas, tests, and documentation are included."
    commit: "b4fd43e41c910ff8b978fb72060efac4991eb72f"
  -
    type: "verify"
    at: "2026-08-12T18:06:53.436Z"
    author: "TESTER"
    state: "ok"
    note: "Verification Contract optimization passed exact-SHA local, hosted, benchmark, compatibility, documentation, platform, and failure-isolation qualification."
doc_version: 3
doc_updated_at: "2026-08-12T18:07:03.304Z"
doc_updated_by: "CODER"
description: "Implement a versioned Verification Contract computed once from the semantic task assessment introduced by 202608112232-3NC7Y4 and strengthened monotonically by deterministic observed effects. Make that contract the single authority for local, PR, release, evaluator, finish, and recovery verification. Add change-aware test selection so local development runs only affected unit/integration suites plus mandatory critical-path checks; run the full CLI regression on PR; run real E2E on PR and release according to risk and observed effects. Add a conservative fallback that selects full regression whenever central components, shared contracts, routing, lifecycle, verification policy, schemas, package/lockfiles, CI, or unknown/unmapped effects are touched. The LLM may propose semantic scope and explain results but must not remove, downgrade, or bypass mandatory checks selected by deterministic policy. Audit duplicate behavioral coverage and move assertions to the cheapest sufficient level, retaining higher-level tests only for observable cross-boundary contracts. Profile fixture creation and process startup; replace repeated mutable setup with reusable immutable fixtures and cheap isolated repository copies where hermeticity is preserved. Execute independent core, runtime, CLI, and docs/schema groups in parallel with deterministic aggregation, failure reporting, and cancellation semantics. Instrument and report verification amplification, wall-clock verification time, test duplication, and the number of AgentPlane lifecycle/control-plane commands. Define small direct work as localized, reversible, non-central, with no external effects; on pinned reference hardware target mandatory local verification at no more than 60 seconds p50 and 120 seconds p95, no more than three lifecycle/control-plane commands, and no local full CLI regression unless the deterministic fallback triggers. Establish a reproducible before/after benchmark, document metric definitions and residual risk, and prove that speedups do not weaken required evidence."
sections:
  Summary: |-
    Optimize the verification and test pipeline around one computed Verification Contract

    Implement a versioned Verification Contract computed once from the semantic task assessment introduced by 202608112232-3NC7Y4 and strengthened monotonically by deterministic observed effects. Make that contract the single authority for local, PR, release, evaluator, finish, and recovery verification. Add change-aware test selection so local development runs only affected unit/integration suites plus mandatory critical-path checks; run the full CLI regression on PR; run real E2E on PR and release according to risk and observed effects. Add a conservative fallback that selects full regression whenever central components, shared contracts, routing, lifecycle, verification policy, schemas, package/lockfiles, CI, or unknown/unmapped effects are touched. The LLM may propose semantic scope and explain results but must not remove, downgrade, or bypass mandatory checks selected by deterministic policy. Audit duplicate behavioral coverage and move assertions to the cheapest sufficient level, retaining higher-level tests only for observable cross-boundary contracts. Profile fixture creation and process startup; replace repeated mutable setup with reusable immutable fixtures and cheap isolated repository copies where hermeticity is preserved. Execute independent core, runtime, CLI, and docs/schema groups in parallel with deterministic aggregation, failure reporting, and cancellation semantics. Instrument and report verification amplification, wall-clock verification time, test duplication, and the number of AgentPlane lifecycle/control-plane commands. Define small direct work as localized, reversible, non-central, with no external effects; on pinned reference hardware target mandatory local verification at no more than 60 seconds p50 and 120 seconds p95, no more than three lifecycle/control-plane commands, and no local full CLI regression unless the deterministic fallback triggers. Establish a reproducible before/after benchmark, document metric definitions and residual risk, and prove that speedups do not weaken required evidence.
  Scope: |-
    - In scope: Implement a versioned Verification Contract computed once from the semantic task assessment introduced by 202608112232-3NC7Y4 and strengthened monotonically by deterministic observed effects. Make that contract the single authority for local, PR, release, evaluator, finish, and recovery verification. Add change-aware test selection so local development runs only affected unit/integration suites plus mandatory critical-path checks; run the full CLI regression on PR; run real E2E on PR and release according to risk and observed effects. Add a conservative fallback that selects full regression whenever central components, shared contracts, routing, lifecycle, verification policy, schemas, package/lockfiles, CI, or unknown/unmapped effects are touched. The LLM may propose semantic scope and explain results but must not remove, downgrade, or bypass mandatory checks selected by deterministic policy. Audit duplicate behavioral coverage and move assertions to the cheapest sufficient level, retaining higher-level tests only for observable cross-boundary contracts. Profile fixture creation and process startup; replace repeated mutable setup with reusable immutable fixtures and cheap isolated repository copies where hermeticity is preserved. Execute independent core, runtime, CLI, and docs/schema groups in parallel with deterministic aggregation, failure reporting, and cancellation semantics. Instrument and report verification amplification, wall-clock verification time, test duplication, and the number of AgentPlane lifecycle/control-plane commands. Define small direct work as localized, reversible, non-central, with no external effects; on pinned reference hardware target mandatory local verification at no more than 60 seconds p50 and 120 seconds p95, no more than three lifecycle/control-plane commands, and no local full CLI regression unless the deterministic fallback triggers. Establish a reproducible before/after benchmark, document metric definitions and residual risk, and prove that speedups do not weaken required evidence.
    - Out of scope: unrelated refactors not required for "Optimize the verification and test pipeline around one computed Verification Contract".
  Plan: |-
    1. Define the versioned Verification Contract and metric semantics. Consume the semantic task assessment from 202608112232-3NC7Y4, record declared components/effects/risk, deterministic observed effects, selected checks, escalation reasons, execution phase, evidence requirements, and immutable policy floors. Define verification amplification, wall-clock verification time, duplicate coverage, and lifecycle/control-plane command count with reproducible collection rules.
    2. Implement deterministic change/effect mapping from changed paths, dependency edges, manifests/lockfiles, schemas, migrations, CI, lifecycle/routing/verification policy, public contracts, and external effects to affected unit/integration groups plus mandatory critical-path checks. Unknown mappings and central components must conservatively select full regression. LLM output may enrich semantic scope or rationale but cannot delete, downgrade, waive, or bypass policy-selected checks.
    3. Make the Verification Contract authoritative across local verification, PR planning, hosted checks, release qualification, evaluator, finish, and recovery. Requirements may strengthen monotonically when observed effects exceed the declaration; all readback must explain selected checks and fallback reasons.
    4. Split execution policy by phase: local runs affected unit/integration suites plus critical paths; every PR runs the full CLI regression; real E2E runs on PR and/or release when the contract risk/effects require it. Preserve exact-SHA evidence and deterministic aggregation.
    5. Inventory overlapping core/runtime/CLI/E2E assertions, identify duplicate observable behaviors, and move each assertion to the cheapest sufficient level. Retain higher-level coverage only for process, filesystem, CLI, integration, or other cross-boundary contracts that lower levels cannot prove. Add a duplication report and guard against regression.
    6. Profile fixture construction, repository setup/copy, dependency installation, and process startup. Replace repeated mutable setup with reusable immutable fixtures, copy-on-write or otherwise cheap isolated repository copies, and pooled startup only where hermeticity, cleanup, and failure isolation remain proven.
    7. Run independent core, runtime, CLI, and docs/schema groups concurrently. Make scheduling bounded and deterministic; aggregate all required evidence, preserve useful failure output, and define cancellation/cleanup behavior without hiding secondary failures.
    8. Add benchmark fixtures for small direct, central-component, broad branch_pr, schema/CI, and risk-triggered E2E cases. Record before/after distributions on pinned reference hardware. For localized reversible non-central direct work with no external effects, require local verification <=60 seconds p50 and <=120 seconds p95, <=3 lifecycle/control-plane commands, and no local full CLI regression unless deterministic fallback activates.
    9. Update CLI explain/readback, schemas, CI routing, developer/user documentation, and compatibility paths. Cover false-negative mapping, undeclared observed effects, attempted LLM weakening, central-component fallback, parallel failure aggregation, fixture isolation, and metric reproducibility.
    10. Verify focused contract/selector/scheduler/fixture tests, full CLI regression on the task PR, risk-selected real E2E, type/lint/schema/docs checks, and the reproducible benchmark. Record residual risks and demonstrate that the optimized path preserves or strengthens required evidence.
  Verify Steps: |-
    1. Validate the versioned Verification Contract schema and every consumer. Expected: local, PR, release, evaluator, finish, and recovery read the same contract; deterministic observed effects can only add requirements; an LLM-supplied assessment or explanation cannot remove, waive, downgrade, or bypass a mandatory check.
    2. Run the selector matrix for localized code, cross-package dependencies, lifecycle/routing/verification policy, schemas/migrations, manifests/lockfiles, CI/public contracts, external effects, and unknown paths. Expected: ordinary local work selects only affected unit/integration groups plus critical paths; every central or unmapped case deterministically falls back to full regression with an explainable reason.
    3. Run the pinned small-direct benchmark before and after the change across enough repeated samples to report p50 and p95. Expected: localized reversible non-central work with no external effects completes mandatory local verification in <=60 seconds p50 and <=120 seconds p95, uses <=3 AgentPlane lifecycle/control-plane commands, and does not run the full CLI regression unless fallback is triggered.
    4. Exercise hosted phase routing on a PR and a risk-bearing PR/release fixture. Expected: every PR runs the complete CLI regression on the exact reviewed SHA; real E2E is required on PR and/or release by contract risk/effects; missing hosted evidence blocks completion.
    5. Produce the test-duplication inventory and fixture/startup profile. Expected: duplicated assertions are removed or justified at the cheapest sufficient level; immutable reusable fixtures and cheap isolated repo copies measurably reduce setup/startup cost while hermeticity, cleanup, and failure isolation tests pass.
    6. Run core, runtime, CLI, and docs/schema groups with forced independent failures. Expected: independent groups execute concurrently, aggregation is deterministic, required evidence from every group is retained, cancellation/cleanup semantics are bounded, and no secondary required failure is hidden.
    7. Validate metric output and regression guards. Expected: verification amplification, wall-clock time, test duplication, and lifecycle/control-plane command count have documented reproducible definitions, machine-readable results, a baseline/comparison/verdict, and thresholds that fail when the optimized path regresses.
    8. Run focused selector/contract/scheduler/fixture tests, full CLI regression, risk-selected real E2E, typecheck, lint, schema/docs parity, and benchmark quality checks. Expected: all required checks pass and the final evidence shows the speedup did not weaken observable behavior or safety coverage.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-12T18:06:53.436Z — VERIFY — ok

    By: TESTER

    Note: Verification Contract optimization passed exact-SHA local, hosted, benchmark, compatibility, documentation, platform, and failure-isolation qualification.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b83a1f46f43c02d243a390643271a632bab76eb8d1ed3216b41d2e9c2c79b6e, input_digest=sha256:41b46de5aac1ee0dedd8de799b90eb4259f2607c04adffa3ba31cfba40fca7f9

    Details:

    Command: bun run ci:local:fast
    Result: pass; full local contract lane completed with 558 test files, 4093 passed tests and 1 intentional skip, plus all 12 critical CLI chunks
    Evidence: reusable local verification receipt for semantic implementation 2fa6ae2267fecf9ce1c5f32570c54bf5acf0094f; subsequent focused deltas passed 27 contract/workflow tests, 9 cold-baseline tests, lint, architecture, knip, full docs-site build, and compatibility candidate freshness
    Scope: complete Verification Contract implementation plus focused clean-checkout CI deltas

    Command: gh run view 31625147542 -R basilisk-labs/agentplane
    Result: pass; aggregate PR verification succeeded on exact reviewed SHA 8a0288974653616f3566215003061bed67ded47d
    Evidence: https://github.com/basilisk-labs/agentplane/actions/runs/31625147542; Linux and Windows, full unit and critical CLI, schema/parity, package runtime, CodeQL/dependency review, docs site, workflow contract, compatibility freshness, architecture, and unused-code gates all succeeded
    Scope: exact hosted PR head and all mandatory PR verification capabilities

    Command: bun run bench:verification:check
    Result: pass; five optimized samples [19127,19057,19122,16201,15751] ms produced p50 19.057s and p95 19.127s against baseline p50 367.28s and p95 639.98s
    Evidence: 19.27x p50 and 33.46x p95 speedup, below 60s/120s thresholds, with deterministic contract selection and fail-closed fallbacks covered by automated tests
    Scope: small localized development path and verification amplification regression guard

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112259-T3ZDDM-optimize-the-verification-and-test-pipeline-arou/.agentplane/tasks/202608112259-T3ZDDM/blueprint/resolved-snapshot.json
    - old_digest: ab26fac451f89290abafc5d80e4c3a20e3154a18baea41de0e22aafb6427f5bb
    - current_digest: ab26fac451f89290abafc5d80e4c3a20e3154a18baea41de0e22aafb6427f5bb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608112259-T3ZDDM

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608112259-T3ZDDM
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
    start_head_sha: "e4ec4520ded988c60db3261714e68b5e22ac4e1f"
    version: 1
id_source: "generated"
---
## Summary

Optimize the verification and test pipeline around one computed Verification Contract

Implement a versioned Verification Contract computed once from the semantic task assessment introduced by 202608112232-3NC7Y4 and strengthened monotonically by deterministic observed effects. Make that contract the single authority for local, PR, release, evaluator, finish, and recovery verification. Add change-aware test selection so local development runs only affected unit/integration suites plus mandatory critical-path checks; run the full CLI regression on PR; run real E2E on PR and release according to risk and observed effects. Add a conservative fallback that selects full regression whenever central components, shared contracts, routing, lifecycle, verification policy, schemas, package/lockfiles, CI, or unknown/unmapped effects are touched. The LLM may propose semantic scope and explain results but must not remove, downgrade, or bypass mandatory checks selected by deterministic policy. Audit duplicate behavioral coverage and move assertions to the cheapest sufficient level, retaining higher-level tests only for observable cross-boundary contracts. Profile fixture creation and process startup; replace repeated mutable setup with reusable immutable fixtures and cheap isolated repository copies where hermeticity is preserved. Execute independent core, runtime, CLI, and docs/schema groups in parallel with deterministic aggregation, failure reporting, and cancellation semantics. Instrument and report verification amplification, wall-clock verification time, test duplication, and the number of AgentPlane lifecycle/control-plane commands. Define small direct work as localized, reversible, non-central, with no external effects; on pinned reference hardware target mandatory local verification at no more than 60 seconds p50 and 120 seconds p95, no more than three lifecycle/control-plane commands, and no local full CLI regression unless the deterministic fallback triggers. Establish a reproducible before/after benchmark, document metric definitions and residual risk, and prove that speedups do not weaken required evidence.

## Scope

- In scope: Implement a versioned Verification Contract computed once from the semantic task assessment introduced by 202608112232-3NC7Y4 and strengthened monotonically by deterministic observed effects. Make that contract the single authority for local, PR, release, evaluator, finish, and recovery verification. Add change-aware test selection so local development runs only affected unit/integration suites plus mandatory critical-path checks; run the full CLI regression on PR; run real E2E on PR and release according to risk and observed effects. Add a conservative fallback that selects full regression whenever central components, shared contracts, routing, lifecycle, verification policy, schemas, package/lockfiles, CI, or unknown/unmapped effects are touched. The LLM may propose semantic scope and explain results but must not remove, downgrade, or bypass mandatory checks selected by deterministic policy. Audit duplicate behavioral coverage and move assertions to the cheapest sufficient level, retaining higher-level tests only for observable cross-boundary contracts. Profile fixture creation and process startup; replace repeated mutable setup with reusable immutable fixtures and cheap isolated repository copies where hermeticity is preserved. Execute independent core, runtime, CLI, and docs/schema groups in parallel with deterministic aggregation, failure reporting, and cancellation semantics. Instrument and report verification amplification, wall-clock verification time, test duplication, and the number of AgentPlane lifecycle/control-plane commands. Define small direct work as localized, reversible, non-central, with no external effects; on pinned reference hardware target mandatory local verification at no more than 60 seconds p50 and 120 seconds p95, no more than three lifecycle/control-plane commands, and no local full CLI regression unless the deterministic fallback triggers. Establish a reproducible before/after benchmark, document metric definitions and residual risk, and prove that speedups do not weaken required evidence.
- Out of scope: unrelated refactors not required for "Optimize the verification and test pipeline around one computed Verification Contract".

## Plan

1. Define the versioned Verification Contract and metric semantics. Consume the semantic task assessment from 202608112232-3NC7Y4, record declared components/effects/risk, deterministic observed effects, selected checks, escalation reasons, execution phase, evidence requirements, and immutable policy floors. Define verification amplification, wall-clock verification time, duplicate coverage, and lifecycle/control-plane command count with reproducible collection rules.
2. Implement deterministic change/effect mapping from changed paths, dependency edges, manifests/lockfiles, schemas, migrations, CI, lifecycle/routing/verification policy, public contracts, and external effects to affected unit/integration groups plus mandatory critical-path checks. Unknown mappings and central components must conservatively select full regression. LLM output may enrich semantic scope or rationale but cannot delete, downgrade, waive, or bypass policy-selected checks.
3. Make the Verification Contract authoritative across local verification, PR planning, hosted checks, release qualification, evaluator, finish, and recovery. Requirements may strengthen monotonically when observed effects exceed the declaration; all readback must explain selected checks and fallback reasons.
4. Split execution policy by phase: local runs affected unit/integration suites plus critical paths; every PR runs the full CLI regression; real E2E runs on PR and/or release when the contract risk/effects require it. Preserve exact-SHA evidence and deterministic aggregation.
5. Inventory overlapping core/runtime/CLI/E2E assertions, identify duplicate observable behaviors, and move each assertion to the cheapest sufficient level. Retain higher-level coverage only for process, filesystem, CLI, integration, or other cross-boundary contracts that lower levels cannot prove. Add a duplication report and guard against regression.
6. Profile fixture construction, repository setup/copy, dependency installation, and process startup. Replace repeated mutable setup with reusable immutable fixtures, copy-on-write or otherwise cheap isolated repository copies, and pooled startup only where hermeticity, cleanup, and failure isolation remain proven.
7. Run independent core, runtime, CLI, and docs/schema groups concurrently. Make scheduling bounded and deterministic; aggregate all required evidence, preserve useful failure output, and define cancellation/cleanup behavior without hiding secondary failures.
8. Add benchmark fixtures for small direct, central-component, broad branch_pr, schema/CI, and risk-triggered E2E cases. Record before/after distributions on pinned reference hardware. For localized reversible non-central direct work with no external effects, require local verification <=60 seconds p50 and <=120 seconds p95, <=3 lifecycle/control-plane commands, and no local full CLI regression unless deterministic fallback activates.
9. Update CLI explain/readback, schemas, CI routing, developer/user documentation, and compatibility paths. Cover false-negative mapping, undeclared observed effects, attempted LLM weakening, central-component fallback, parallel failure aggregation, fixture isolation, and metric reproducibility.
10. Verify focused contract/selector/scheduler/fixture tests, full CLI regression on the task PR, risk-selected real E2E, type/lint/schema/docs checks, and the reproducible benchmark. Record residual risks and demonstrate that the optimized path preserves or strengthens required evidence.

## Verify Steps

1. Validate the versioned Verification Contract schema and every consumer. Expected: local, PR, release, evaluator, finish, and recovery read the same contract; deterministic observed effects can only add requirements; an LLM-supplied assessment or explanation cannot remove, waive, downgrade, or bypass a mandatory check.
2. Run the selector matrix for localized code, cross-package dependencies, lifecycle/routing/verification policy, schemas/migrations, manifests/lockfiles, CI/public contracts, external effects, and unknown paths. Expected: ordinary local work selects only affected unit/integration groups plus critical paths; every central or unmapped case deterministically falls back to full regression with an explainable reason.
3. Run the pinned small-direct benchmark before and after the change across enough repeated samples to report p50 and p95. Expected: localized reversible non-central work with no external effects completes mandatory local verification in <=60 seconds p50 and <=120 seconds p95, uses <=3 AgentPlane lifecycle/control-plane commands, and does not run the full CLI regression unless fallback is triggered.
4. Exercise hosted phase routing on a PR and a risk-bearing PR/release fixture. Expected: every PR runs the complete CLI regression on the exact reviewed SHA; real E2E is required on PR and/or release by contract risk/effects; missing hosted evidence blocks completion.
5. Produce the test-duplication inventory and fixture/startup profile. Expected: duplicated assertions are removed or justified at the cheapest sufficient level; immutable reusable fixtures and cheap isolated repo copies measurably reduce setup/startup cost while hermeticity, cleanup, and failure isolation tests pass.
6. Run core, runtime, CLI, and docs/schema groups with forced independent failures. Expected: independent groups execute concurrently, aggregation is deterministic, required evidence from every group is retained, cancellation/cleanup semantics are bounded, and no secondary required failure is hidden.
7. Validate metric output and regression guards. Expected: verification amplification, wall-clock time, test duplication, and lifecycle/control-plane command count have documented reproducible definitions, machine-readable results, a baseline/comparison/verdict, and thresholds that fail when the optimized path regresses.
8. Run focused selector/contract/scheduler/fixture tests, full CLI regression, risk-selected real E2E, typecheck, lint, schema/docs parity, and benchmark quality checks. Expected: all required checks pass and the final evidence shows the speedup did not weaken observable behavior or safety coverage.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-12T18:06:53.436Z — VERIFY — ok

By: TESTER

Note: Verification Contract optimization passed exact-SHA local, hosted, benchmark, compatibility, documentation, platform, and failure-isolation qualification.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b83a1f46f43c02d243a390643271a632bab76eb8d1ed3216b41d2e9c2c79b6e, input_digest=sha256:41b46de5aac1ee0dedd8de799b90eb4259f2607c04adffa3ba31cfba40fca7f9

Details:

Command: bun run ci:local:fast
Result: pass; full local contract lane completed with 558 test files, 4093 passed tests and 1 intentional skip, plus all 12 critical CLI chunks
Evidence: reusable local verification receipt for semantic implementation 2fa6ae2267fecf9ce1c5f32570c54bf5acf0094f; subsequent focused deltas passed 27 contract/workflow tests, 9 cold-baseline tests, lint, architecture, knip, full docs-site build, and compatibility candidate freshness
Scope: complete Verification Contract implementation plus focused clean-checkout CI deltas

Command: gh run view 31625147542 -R basilisk-labs/agentplane
Result: pass; aggregate PR verification succeeded on exact reviewed SHA 8a0288974653616f3566215003061bed67ded47d
Evidence: https://github.com/basilisk-labs/agentplane/actions/runs/31625147542; Linux and Windows, full unit and critical CLI, schema/parity, package runtime, CodeQL/dependency review, docs site, workflow contract, compatibility freshness, architecture, and unused-code gates all succeeded
Scope: exact hosted PR head and all mandatory PR verification capabilities

Command: bun run bench:verification:check
Result: pass; five optimized samples [19127,19057,19122,16201,15751] ms produced p50 19.057s and p95 19.127s against baseline p50 367.28s and p95 639.98s
Evidence: 19.27x p50 and 33.46x p95 speedup, below 60s/120s thresholds, with deterministic contract selection and fail-closed fallbacks covered by automated tests
Scope: small localized development path and verification amplification regression guard

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608112259-T3ZDDM-optimize-the-verification-and-test-pipeline-arou/.agentplane/tasks/202608112259-T3ZDDM/blueprint/resolved-snapshot.json
- old_digest: ab26fac451f89290abafc5d80e4c3a20e3154a18baea41de0e22aafb6427f5bb
- current_digest: ab26fac451f89290abafc5d80e4c3a20e3154a18baea41de0e22aafb6427f5bb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608112259-T3ZDDM

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608112259-T3ZDDM
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
