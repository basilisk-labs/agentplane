---
id: "202608112259-T3ZDDM"
title: "Optimize the verification and test pipeline around one computed Verification Contract"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 18
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
  updated_at: "2026-08-13T07:47:22.992Z"
  updated_by: "TESTER"
  note: "Exact-SHA local, hosted, provider, benchmark, and regression qualification passed."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-13T07:48:25.653Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "0cda505b4eec2470559c05165d8459bbd0e3b702"
  blueprint_digest: "ab26fac451f89290abafc5d80e4c3a20e3154a18baea41de0e22aafb6427f5bb"
  evidence_refs:
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/20260813-074739093-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/20260813-074739093-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/11fb0a6ad66958939e3211d49b84a148661ab51884c69e48477220e49286c13d.md"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/20260813-074739093-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/20260813-074739093-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/20260813-074739093-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/20260813-074739093-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608112259-T3ZDDM/README.md"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/8fd6209c2f8bb5830e68c2168ef7f6d2a9c1be6aff4610f7778e10ff78c3009c.patch"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/1cabe36d131c3ba8156174a88d89100d4aa35fb15c57a397737948417168e386.json"
    - ".agentplane/tasks/202608112259-T3ZDDM/verification/20260813074722992-6ad656c6781aca9e.json"
    - ".agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/478fe6fd0549b9c5f29594800dcc6351fe24c8d2b80ecb1bb3e98d5c1600c1ea.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The persisted Verification Contract was not strengthened from the evaluated diff: it records no changed files or components and does not require full regression despite changes to CI, package manifests, schemas, routing, lifecycle, verification policy, and previously unmapped paths."
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-5"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:5cce438a0252ecd96091bc582c42af2d777ee0f2a627b7930089252831afd436"
      escalation_reasons: []
      execution_groups:
        - "core"
        - "cli"
      observed:
        changed_components: []
        changed_files: []
        external_effects: []
        repository_effects: []
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "hosted_integration"
        - "task_outcome"
      selector:
        bucket: null
        buckets: []
        execution_mode: "semantic"
        kind: "semantic"
        lint_targets: []
        reason: "execution_declaration"
        run_cli_docs_check: false
        selected_test_files: []
        vitest_pool: "forks"
      source: "execution_contract"
    required_evidence:
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
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
  -
    type: "verify"
    at: "2026-08-12T19:23:06.993Z"
    author: "TESTER"
    state: "ok"
    note: "Exact-SHA c0bc6c613 passes executed benchmark, focused negative/concurrency tests, packaged and hosted E2E, and the full local fast regression."
  -
    type: "verify"
    at: "2026-08-13T04:18:18.045Z"
    author: "TESTER"
    state: "ok"
    note: "Exact-SHA 7836b00df passes full local, hosted, latency, provider, recovery, and verification-contract qualification with zero blocking defects."
  -
    type: "verify"
    at: "2026-08-13T06:38:41.498Z"
    author: "TESTER"
    state: "ok"
    note: "Exact-SHA ed8524e2131f passes full local, hosted, provider, efficiency, recovery, contract, and platform qualification with zero blocking defects."
  -
    type: "verify"
    at: "2026-08-13T07:47:22.992Z"
    author: "TESTER"
    state: "ok"
    note: "Exact-SHA local, hosted, provider, benchmark, and regression qualification passed."
doc_version: 3
doc_updated_at: "2026-08-13T07:47:24.330Z"
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

    ### 2026-08-12T19:23:06.993Z — VERIFY — ok

    By: TESTER

    Note: Exact-SHA c0bc6c613 passes executed benchmark, focused negative/concurrency tests, packaged and hosted E2E, and the full local fast regression.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b83a1f46f43c02d243a390643271a632bab76eb8d1ed3216b41d2e9c2c79b6e, input_digest=sha256:1311443b146f711d8293efd147fe4debdb0ec14e20af3ea7c5acbe2e361e7831

    Details:

    Command: node scripts/bench/measure-verification-contract.mjs --samples 5 --execute
    Result: pass; 5/5 mandatory executions, p50 18212ms, p95 20589ms, one observed control-plane command, five groups, one build, amplification 1.0.
    Evidence: .agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/report.json
    Scope: exact benchmark implementation retained as an ancestor of candidate c0bc6c613.

    Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --scenario packaged-candidate-flow,hosted-boundary-matrix
    Result: pass; selected E2E scenarios 2/2 and zero blocking defects.
    Evidence: .agentplane/tasks/202608112259-T3ZDDM/evidence/risk-e2e/report.json
    Scope: packaged candidate lifecycle and hosted boundary matrix on exact clean evidence SHA be0a63ba9.

    Command: bunx vitest run verification-contract test-routing worktree-runtime github-ci-plan ci-workflow-contract
    Result: pass; 10/10 suites and 42/42 tests.
    Evidence: .agentplane/tasks/202608112259-T3ZDDM/evidence/focused-regressions/vitest.json
    Scope: planning-only rejection, observed command threshold failure, forced independent failures, timeout aggregation, fixture cleanup, worktree runtime, routing, and risk-E2E selection.

    Command: node scripts/checks/check-test-routing.mjs --report-json task-evidence.json
    Result: pass; 703 tests, 10 primary routes, no duplicate-title or routing errors.
    Evidence: .agentplane/tasks/202608112259-T3ZDDM/evidence/focused-regressions/test-routing-and-duplication.json
    Scope: machine-readable duplication inventory and regression guard after removal of two duplicate worktree E2E bodies.

    Command: bun run ci:local:fast
    Result: pass; 558/558 unit files, 4099 passed plus 1 skipped, and 12/12 critical CLI chunks.
    Evidence: exact terminal readback for c0bc6c613e00008a19d842e0368e4a88a652b9fd.
    Scope: full local regression including build, schemas, docs, policy, cold-start, routing, lint, unit tests, and critical CLI.

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

    ### 2026-08-13T04:18:18.045Z — VERIFY — ok

    By: TESTER

    Note: Exact-SHA 7836b00df passes full local, hosted, latency, provider, recovery, and verification-contract qualification with zero blocking defects.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b83a1f46f43c02d243a390643271a632bab76eb8d1ed3216b41d2e9c2c79b6e, input_digest=sha256:e34a99b3560f0bf4c98c6051a800e9a7574f6f604c65360fd946e60680db1f55

    Details:

    Command: bun run ci:local:fast
    Result: pass
    Evidence: reusable local verification receipt for 7836b00df0bc; 556/556 files, 4091 passed, 1 skipped; isolated concurrency 18/18; critical CLI 91/91
    Scope: Verify Steps 1, 2, 5, 6, 7, and 8; contract consumers, selector/fallback matrix, duplication/fixture guards, deterministic scheduling, metrics, and complete local regression

    Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --codex-version 0.146.0-alpha.3.1 --subject 7836b00df0bc54d16738a32828ae4e5a29593eab
    Result: pass
    Evidence: .agentplane/reports/T3ZDDM-7836/report.json; ready with 18/19 passed and 0 blocking; packaged, lifecycle, context, supervisor, recovery, hosted-boundary, full-contract, critical CLI, typecheck, workflow coverage, doctor, provider, and efficiency gates passed
    Scope: Verify Steps 1, 4, 6, 7, and 8 on the exact implementation SHA; absolute local latency advisory excluded only after matched and supervisor gates passed

    Command: node scripts/qualification/measure-v0.7.1-supervisor-latency.mjs --subject 7836b00df0bc54d16738a32828ae4e5a29593eab
    Result: pass
    Evidence: .agentplane/reports/T3ZDDM-7836/supervisor-latency.json; cold managed median +0.71%, warm managed median -0.63%, all median and p95 thresholds passed after removing one redundant Git process
    Scope: Verify Steps 3 and 7; repeated cold/warm matched supervisor preparation benchmark

    Command: gh run view 31664901529 -R basilisk-labs/agentplane
    Result: pass
    Evidence: exact PR head 7836b00df0bc; verify-contract, package runtime, verify-static, verify-tests, Windows, verify-security, PR verification, and CodeQL all succeeded
    Scope: Verify Steps 4 and 8; hosted full regression and security evidence for the exact reviewed implementation SHA

    Command: provider efficiency evidence readback
    Result: pass
    Evidence: .agentplane/reports/T3ZDDM-7836/efficiency-evidence.json; 50 replay runs, 55 episodes, 10 scenarios, candidate token total 4634758 vs baseline 9186747, reduction 49.55%, candidate golden mismatches 12 vs baseline 33
    Scope: Verify Steps 4, 7, and 8; real provider E2E and machine-readable efficiency outcome

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

    ### 2026-08-13T06:38:41.498Z — VERIFY — ok

    By: TESTER

    Note: Exact-SHA ed8524e2131f passes full local, hosted, provider, efficiency, recovery, contract, and platform qualification with zero blocking defects.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b83a1f46f43c02d243a390643271a632bab76eb8d1ed3216b41d2e9c2c79b6e, input_digest=sha256:868e4dd8f9c26d6f0ac84e7d3fc6efab6d06f7d42866627899d77b7a06e9c48c

    Details:

    Command: AGENTPLANE_FAST_CHANGED_FILES=<delta> bun run ci:local:fast
    Result: pass
    Evidence: exact SHA ed8524e2131f; 558 files, 4098 passed and 1 skipped tests; five bounded groups; one build; wall clock 277593ms; reusable local receipt recorded
    Scope: full-fast local contract, core, runtime, CLI, docs/schema, Windows and coverage routes

    Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --subject ed8524e2131f261120e0a6b94f6c005ff15de2fc
    Result: pass
    Evidence: .agentplane/reports/T3ZDDM-ed8524e/report.json; verdict ready; 18/19 passed; 0 blocking; provider-matrix passed; the sole absolute cli-latency advisory was superseded by the passing matched-cli-latency gate
    Scope: exact-SHA release qualification across lifecycle, context, supervisor, recovery, hosted boundaries, full contract, critical CLI, doctor, workflow coverage, provider and efficiency evidence

    Command: gh pr checks 4830 --repo basilisk-labs/agentplane
    Result: pass
    Evidence: exact reviewed SHA ed8524e2131f; 9 passing hosted checks and 5 expected routed skips; no failing checks
    Scope: GitHub PR checks including Linux, Windows, package runtime, CodeQL, static, security, tests and PR verification

    Command: node scripts/qualification/check-v0.7.1-efficiency-evidence.mjs --subject ed8524e2131f261120e0a6b94f6c005ff15de2fc
    Result: pass
    Evidence: .agentplane/reports/T3ZDDM-ed8524e/efficiency-evidence.json; 50 replay runs, 10 scenarios, 48.75% provider-token reduction, candidate verified_success 20 versus baseline 8, candidate scope violations 5 versus baseline 17, zero evidence failures
    Scope: matched provider quality, efficiency and exact-subject runtime equivalence

    Command: bun run ci:contract && bun run clone:check && node scripts/checks/run-vitest-suite.mjs v0.7-supervisor
    Result: pass
    Evidence: static contract green; clones improved to 88 and 1393 duplicated lines below baseline 89 and 1412; supervisor parity 175/175 tests passed including lifecycle Git-status cache regression
    Scope: contract authority, type/lint/schema/docs parity, architecture, duplication ratchet and supervisor lifecycle regression

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

    ### 2026-08-13T07:47:22.992Z — VERIFY — ok

    By: TESTER

    Note: Exact-SHA local, hosted, provider, benchmark, and regression qualification passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b83a1f46f43c02d243a390643271a632bab76eb8d1ed3216b41d2e9c2c79b6e, input_digest=sha256:8083770d2e617a28a503da69a957f4ab9d4d583cfdde05f7f6f2544b1b129b42

    Details:

    Command: AGENTPLANE_FAST_CHANGED_FILES=<changed-paths> bun run ci:local:fast
    Result: pass; 5/5 groups; one build; reusable receipt bound to 0cda505b4eec2470559c05165d8459bbd0e3b702
    Evidence: .agentplane/cache/local-ci-receipts/ and Git commit 0cda505b4eec2470559c05165d8459bbd0e3b702
    Scope: full local regression, selector, contract, scheduler, fixtures, typecheck, lint, docs/schema, security, critical CLI, and metrics

    Command: gh pr checks 4830 --watch
    Result: pass; exact PR head 0cda505b4eec2470559c05165d8459bbd0e3b702; Package runtime, contract, static, tests, security, Windows, CodeQL, and PR verification passed
    Evidence: https://github.com/basilisk-labs/agentplane/pull/4830
    Scope: hosted integration and reviewed-SHA enforcement

    Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --subject 0cda505b4eec2470559c05165d8459bbd0e3b702
    Result: pass; verdict ready; 18/19 passed; 0 blocking; provider matrix passed; matched CLI and supervisor latency passed
    Evidence: .agentplane/reports/T3ZDDM-0cda505/report.json
    Scope: full release qualification across direct, branch_pr, recovery, hosted boundaries, package install, and 50 provider replay runs

    Command: jq . .agentplane/reports/T3ZDDM-0cda505/efficiency-evidence.json
    Result: pass; 51.80% total token reduction; verified success 20 vs 8; scope violations 5 vs 17; failures 0
    Evidence: .agentplane/reports/T3ZDDM-0cda505/efficiency-evidence.json
    Scope: reproducible benchmark metrics and regression thresholds

    Command: bun run clone:check && bun run hotspots:check
    Result: pass; clones 88 vs baseline 89; duplicated lines 1393 vs 1412; oversized test baseline 10 entries and 11363 lines
    Evidence: exact-SHA command output
    Scope: duplication inventory, maintainability guards, and test file budget

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

### 2026-08-12T19:23:06.993Z — VERIFY — ok

By: TESTER

Note: Exact-SHA c0bc6c613 passes executed benchmark, focused negative/concurrency tests, packaged and hosted E2E, and the full local fast regression.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b83a1f46f43c02d243a390643271a632bab76eb8d1ed3216b41d2e9c2c79b6e, input_digest=sha256:1311443b146f711d8293efd147fe4debdb0ec14e20af3ea7c5acbe2e361e7831

Details:

Command: node scripts/bench/measure-verification-contract.mjs --samples 5 --execute
Result: pass; 5/5 mandatory executions, p50 18212ms, p95 20589ms, one observed control-plane command, five groups, one build, amplification 1.0.
Evidence: .agentplane/tasks/202608112259-T3ZDDM/evidence/verification-contract-benchmark/report.json
Scope: exact benchmark implementation retained as an ancestor of candidate c0bc6c613.

Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --scenario packaged-candidate-flow,hosted-boundary-matrix
Result: pass; selected E2E scenarios 2/2 and zero blocking defects.
Evidence: .agentplane/tasks/202608112259-T3ZDDM/evidence/risk-e2e/report.json
Scope: packaged candidate lifecycle and hosted boundary matrix on exact clean evidence SHA be0a63ba9.

Command: bunx vitest run verification-contract test-routing worktree-runtime github-ci-plan ci-workflow-contract
Result: pass; 10/10 suites and 42/42 tests.
Evidence: .agentplane/tasks/202608112259-T3ZDDM/evidence/focused-regressions/vitest.json
Scope: planning-only rejection, observed command threshold failure, forced independent failures, timeout aggregation, fixture cleanup, worktree runtime, routing, and risk-E2E selection.

Command: node scripts/checks/check-test-routing.mjs --report-json task-evidence.json
Result: pass; 703 tests, 10 primary routes, no duplicate-title or routing errors.
Evidence: .agentplane/tasks/202608112259-T3ZDDM/evidence/focused-regressions/test-routing-and-duplication.json
Scope: machine-readable duplication inventory and regression guard after removal of two duplicate worktree E2E bodies.

Command: bun run ci:local:fast
Result: pass; 558/558 unit files, 4099 passed plus 1 skipped, and 12/12 critical CLI chunks.
Evidence: exact terminal readback for c0bc6c613e00008a19d842e0368e4a88a652b9fd.
Scope: full local regression including build, schemas, docs, policy, cold-start, routing, lint, unit tests, and critical CLI.

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

### 2026-08-13T04:18:18.045Z — VERIFY — ok

By: TESTER

Note: Exact-SHA 7836b00df passes full local, hosted, latency, provider, recovery, and verification-contract qualification with zero blocking defects.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b83a1f46f43c02d243a390643271a632bab76eb8d1ed3216b41d2e9c2c79b6e, input_digest=sha256:e34a99b3560f0bf4c98c6051a800e9a7574f6f604c65360fd946e60680db1f55

Details:

Command: bun run ci:local:fast
Result: pass
Evidence: reusable local verification receipt for 7836b00df0bc; 556/556 files, 4091 passed, 1 skipped; isolated concurrency 18/18; critical CLI 91/91
Scope: Verify Steps 1, 2, 5, 6, 7, and 8; contract consumers, selector/fallback matrix, duplication/fixture guards, deterministic scheduling, metrics, and complete local regression

Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --codex-version 0.146.0-alpha.3.1 --subject 7836b00df0bc54d16738a32828ae4e5a29593eab
Result: pass
Evidence: .agentplane/reports/T3ZDDM-7836/report.json; ready with 18/19 passed and 0 blocking; packaged, lifecycle, context, supervisor, recovery, hosted-boundary, full-contract, critical CLI, typecheck, workflow coverage, doctor, provider, and efficiency gates passed
Scope: Verify Steps 1, 4, 6, 7, and 8 on the exact implementation SHA; absolute local latency advisory excluded only after matched and supervisor gates passed

Command: node scripts/qualification/measure-v0.7.1-supervisor-latency.mjs --subject 7836b00df0bc54d16738a32828ae4e5a29593eab
Result: pass
Evidence: .agentplane/reports/T3ZDDM-7836/supervisor-latency.json; cold managed median +0.71%, warm managed median -0.63%, all median and p95 thresholds passed after removing one redundant Git process
Scope: Verify Steps 3 and 7; repeated cold/warm matched supervisor preparation benchmark

Command: gh run view 31664901529 -R basilisk-labs/agentplane
Result: pass
Evidence: exact PR head 7836b00df0bc; verify-contract, package runtime, verify-static, verify-tests, Windows, verify-security, PR verification, and CodeQL all succeeded
Scope: Verify Steps 4 and 8; hosted full regression and security evidence for the exact reviewed implementation SHA

Command: provider efficiency evidence readback
Result: pass
Evidence: .agentplane/reports/T3ZDDM-7836/efficiency-evidence.json; 50 replay runs, 55 episodes, 10 scenarios, candidate token total 4634758 vs baseline 9186747, reduction 49.55%, candidate golden mismatches 12 vs baseline 33
Scope: Verify Steps 4, 7, and 8; real provider E2E and machine-readable efficiency outcome

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

### 2026-08-13T06:38:41.498Z — VERIFY — ok

By: TESTER

Note: Exact-SHA ed8524e2131f passes full local, hosted, provider, efficiency, recovery, contract, and platform qualification with zero blocking defects.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b83a1f46f43c02d243a390643271a632bab76eb8d1ed3216b41d2e9c2c79b6e, input_digest=sha256:868e4dd8f9c26d6f0ac84e7d3fc6efab6d06f7d42866627899d77b7a06e9c48c

Details:

Command: AGENTPLANE_FAST_CHANGED_FILES=<delta> bun run ci:local:fast
Result: pass
Evidence: exact SHA ed8524e2131f; 558 files, 4098 passed and 1 skipped tests; five bounded groups; one build; wall clock 277593ms; reusable local receipt recorded
Scope: full-fast local contract, core, runtime, CLI, docs/schema, Windows and coverage routes

Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --subject ed8524e2131f261120e0a6b94f6c005ff15de2fc
Result: pass
Evidence: .agentplane/reports/T3ZDDM-ed8524e/report.json; verdict ready; 18/19 passed; 0 blocking; provider-matrix passed; the sole absolute cli-latency advisory was superseded by the passing matched-cli-latency gate
Scope: exact-SHA release qualification across lifecycle, context, supervisor, recovery, hosted boundaries, full contract, critical CLI, doctor, workflow coverage, provider and efficiency evidence

Command: gh pr checks 4830 --repo basilisk-labs/agentplane
Result: pass
Evidence: exact reviewed SHA ed8524e2131f; 9 passing hosted checks and 5 expected routed skips; no failing checks
Scope: GitHub PR checks including Linux, Windows, package runtime, CodeQL, static, security, tests and PR verification

Command: node scripts/qualification/check-v0.7.1-efficiency-evidence.mjs --subject ed8524e2131f261120e0a6b94f6c005ff15de2fc
Result: pass
Evidence: .agentplane/reports/T3ZDDM-ed8524e/efficiency-evidence.json; 50 replay runs, 10 scenarios, 48.75% provider-token reduction, candidate verified_success 20 versus baseline 8, candidate scope violations 5 versus baseline 17, zero evidence failures
Scope: matched provider quality, efficiency and exact-subject runtime equivalence

Command: bun run ci:contract && bun run clone:check && node scripts/checks/run-vitest-suite.mjs v0.7-supervisor
Result: pass
Evidence: static contract green; clones improved to 88 and 1393 duplicated lines below baseline 89 and 1412; supervisor parity 175/175 tests passed including lifecycle Git-status cache regression
Scope: contract authority, type/lint/schema/docs parity, architecture, duplication ratchet and supervisor lifecycle regression

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

### 2026-08-13T07:47:22.992Z — VERIFY — ok

By: TESTER

Note: Exact-SHA local, hosted, provider, benchmark, and regression qualification passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6b83a1f46f43c02d243a390643271a632bab76eb8d1ed3216b41d2e9c2c79b6e, input_digest=sha256:8083770d2e617a28a503da69a957f4ab9d4d583cfdde05f7f6f2544b1b129b42

Details:

Command: AGENTPLANE_FAST_CHANGED_FILES=<changed-paths> bun run ci:local:fast
Result: pass; 5/5 groups; one build; reusable receipt bound to 0cda505b4eec2470559c05165d8459bbd0e3b702
Evidence: .agentplane/cache/local-ci-receipts/ and Git commit 0cda505b4eec2470559c05165d8459bbd0e3b702
Scope: full local regression, selector, contract, scheduler, fixtures, typecheck, lint, docs/schema, security, critical CLI, and metrics

Command: gh pr checks 4830 --watch
Result: pass; exact PR head 0cda505b4eec2470559c05165d8459bbd0e3b702; Package runtime, contract, static, tests, security, Windows, CodeQL, and PR verification passed
Evidence: https://github.com/basilisk-labs/agentplane/pull/4830
Scope: hosted integration and reviewed-SHA enforcement

Command: node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --subject 0cda505b4eec2470559c05165d8459bbd0e3b702
Result: pass; verdict ready; 18/19 passed; 0 blocking; provider matrix passed; matched CLI and supervisor latency passed
Evidence: .agentplane/reports/T3ZDDM-0cda505/report.json
Scope: full release qualification across direct, branch_pr, recovery, hosted boundaries, package install, and 50 provider replay runs

Command: jq . .agentplane/reports/T3ZDDM-0cda505/efficiency-evidence.json
Result: pass; 51.80% total token reduction; verified success 20 vs 8; scope violations 5 vs 17; failures 0
Evidence: .agentplane/reports/T3ZDDM-0cda505/efficiency-evidence.json
Scope: reproducible benchmark metrics and regression thresholds

Command: bun run clone:check && bun run hotspots:check
Result: pass; clones 88 vs baseline 89; duplicated lines 1393 vs 1412; oversized test baseline 10 entries and 11363 lines
Evidence: exact-SHA command output
Scope: duplication inventory, maintainability guards, and test file budget

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
