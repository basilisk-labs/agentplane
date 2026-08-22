---
id: "202608212244-6XZAYD"
title: "Implement the task-centric refactoring roadmap v2 and publish the next patch release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "architecture"
  - "task-centric"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "network"
  - "publish"
  - "merge"
  - "external_system"
blueprint_request: "release.strict"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-21T22:50:06.303Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "User confirmed exact plan digest in Codex task; host_user_decision=sha256:f5d9083511651b29dd00284b298bcaf85d49e76762063fbd26008ffa0d2aae09"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_dependencies"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "material_implementation_uncertainty"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "ci"
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "security_boundary"
    writable_roots:
      - ".agentplane/policy"
      - ".github"
      - "AGENTS.md"
      - "CLAUDE.md"
      - "README.md"
      - "ROADMAP.md"
      - "agentplane-recipes"
      - "bun.lock"
      - "depcruise.config.cjs"
      - "eslint.config.cjs"
      - "integrations"
      - "package.json"
      - "packages"
      - "schemas"
      - "skills"
      - "tsconfig.depcruise.json"
      - "vitest.config.ts"
      - "vitest.workspace.ts"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "material"
    preferred_mode: "branch_pr"
    rationale:
      - "Protected main and publication require branch_pr integration, hosted checks, provider writes, and registry publication."
      - "The roadmap changes the central task lifecycle, public CLI and schemas, tests, generated assets, architecture rules, and release metadata."
      - "The user explicitly approved the complete roadmap and patch release; new approval is reserved for material scope, security, acceptance, or version drift."
    repository_effects:
      - "ci"
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - ".agentplane/policy"
      - ".github"
      - "AGENTS.md"
      - "CLAUDE.md"
      - "README.md"
      - "ROADMAP.md"
      - "agentplane-recipes"
      - "bun.lock"
      - "depcruise.config.cjs"
      - "eslint.config.cjs"
      - "integrations"
      - "package.json"
      - "packages"
      - "schemas"
      - "skills"
      - "tsconfig.depcruise.json"
      - "vitest.config.ts"
      - "vitest.workspace.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_dependencies"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "material_implementation_uncertainty"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - ".agentplane/policy"
          - ".github"
          - "AGENTS.md"
          - "CLAUDE.md"
          - "README.md"
          - "ROADMAP.md"
          - "agentplane-recipes"
          - "bun.lock"
          - "depcruise.config.cjs"
          - "eslint.config.cjs"
          - "integrations"
          - "package.json"
          - "packages"
          - "schemas"
          - "skills"
          - "tsconfig.depcruise.json"
          - "vitest.config.ts"
          - "vitest.workspace.ts"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "implementation_risk_validation"
          - "repository_effect:ci"
          - "repository_effect:dependencies"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "ci"
          - "dependencies"
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "schema"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "material"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:19cf4c4d00eccc68cf2ac4a349d53bc2a693134e89dd9d5abbbcf39a6d9b1478"
      escalation_reasons:
        - "central_component:bun.lock"
        - "central_component:package.json"
        - "effect_ci"
        - "effect_dependencies"
        - "effect_public_api"
        - "effect_release_metadata"
        - "effect_schema"
        - "external_effect_requires_real_e2e"
        - "material_implementation_uncertainty"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
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
      requires_full_regression: true
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "docs_contract"
        - "full_regression"
        - "hosted_integration"
        - "real_e2e"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "implementation_risk_validation"
      - "repository_effect:ci"
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-21T22:50:54.907Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-21T22:50:54.907Z"
doc_updated_by: "CODER"
description: "Implement the complete roadmap from /Users/densmirnov/Downloads/agentplane-task-centric-refactoring-roadmap-v2.md: RF2-001 through RF2-058, including the exact release acceptance scenario. Preserve the roadmap acceptance criteria, use one traceable AgentPlane Task, and publish the next patch release only after release qualification and exact-SHA hosted verification. The user's /goal request explicitly approves implementation, merge, publish, and required network/provider actions within this scope."
sections:
  Summary: |-
    Implement the task-centric refactoring roadmap v2 and publish the next patch release

    Implement the complete roadmap from /Users/densmirnov/Downloads/agentplane-task-centric-refactoring-roadmap-v2.md: RF2-001 through RF2-058, including the exact release acceptance scenario. Preserve the roadmap acceptance criteria, use one traceable AgentPlane Task, and publish the next patch release only after release qualification and exact-SHA hosted verification. The user's /goal request explicitly approves implementation, merge, publish, and required network/provider actions within this scope.
  Scope: |-
    - In scope: Implement the complete roadmap from /Users/densmirnov/Downloads/agentplane-task-centric-refactoring-roadmap-v2.md: RF2-001 through RF2-058, including the exact release acceptance scenario. Preserve the roadmap acceptance criteria, use one traceable AgentPlane Task, and publish the next patch release only after release qualification and exact-SHA hosted verification. The user's /goal request explicitly approves implementation, merge, publish, and required network/provider actions within this scope.
    - Out of scope: unrelated refactors not required for "Implement the task-centric refactoring roadmap v2 and publish the next patch release".
  Plan: |-
    1. Establish a live baseline: map RF2-001 through RF2-058 to current symbols, tests, schemas, and already-shipped behavior; record only genuine gaps and preserve compatible WorkOrder, SemanticResult, receipt, hook, journal, provider, and workspace mechanisms.
    2. Complete Phase 0 characterization for outcome dispositions, direct/branch/external/managed golden paths, lifecycle invariants, crash reconciliation, and the fresh-repository gateway.
    3. Complete the correctness floor RF2-006 through RF2-011: exhaustive outcome disposition, validated Git base identity without zero-SHA fallback, strict state parsing with explicit migration, transition-owned verification rework, typed context retrieval failures, and one explicit task-run dispatch path.
    4. Add the task-centric domain model RF2-012 through RF2-019 in pure Core modules: immutable TaskIntent and RepositorySnapshot, root Task lifecycle, digest-bound TaskPlanRevision approval, internal WorkItemGraph, atomic DomainEvent and TransitionReceipt, legacy projections, write boundaries, and ReconciliationSnapshot facts.
    5. Add pure services RF2-020 through RF2-028: graph validation/readiness, deterministic scheduling and claims, actor-neutral semantic request/result, canonical validation, typed failures/recovery/decisions, one shared plan-change classifier, lifecycle engine, and root completion evaluation.
    6. Introduce ports and adapters RF2-029 through RF2-035: CAS TaskRepositoryPort, Git/Workspace/ContentActor/Validation/Provider/Artifact/Context ports, one application loop for direct and branch_pr strategies, and baseline-bound ExecutionLease authority.
    7. Strengthen intake, planning, approval, and context RF2-036 through RF2-044: stable machine gateway, thin AGENTS/CLAUDE gateway, current PlanningContextBuilder, structured TaskPlanProposal, deterministic validation, exact digest approval, atomic internal WorkItem materialization, per-item context refresh, and typed output manifests/retrieval receipts.
    8. Implement autonomous execution RF2-045 through RF2-049: one task-centric loop for pull, managed, and manual actors; bounded execute/diagnose/repair/review episodes; local plan adaptation; material replan boundaries; and typed human decision tickets.
    9. Complete recovery and orchestration RF2-050 through RF2-054: durable checkpoints, centralized retry/idempotency budgets, resource claims, worktree/merge-queue integration, and a release-blocking fresh-repository architectural E2E gate.
    10. Complete migration and deletion RF2-055 through RF2-058: canonical ExecutionContract, removal of project/role-centric ownership assumptions after adapters are proven, live-index/archive separation, dependency-boundary enforcement, and thin handlers.
    11. Validate incrementally with targeted unit, property, integration, architecture, schema, generated-asset, and CLI checks; then run the full regression, release prepublish gate, and the literal 20-step release acceptance scenario including deterministic rework, crash resume, exact plan revision approval, material replan, final completion, and absence of any Project record.
    12. Let AgentPlane integrate through the protected branch_pr route. After exact-head hosted checks pass, prepare and publish the next patch release, then verify the Git tag, GitHub release, package registry versions and dist-tags, installed CLI behavior, exact release SHA, post-release main state, and clean tracked/untracked state. Stop for a new approval only if scope roots, security boundary, version/tag, release target, or acceptance criteria materially change.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:f5d9083511651b29dd00284b298bcaf85d49e76762063fbd26008ffa0d2aae09"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:63e9ade4d678abb831b23ce8518ebc4352bd028d10dea9ce2e6542c0a015ad17"
    digest: "sha256:b30f7aecb94416a52b3fef777d5b8ce8f1d2fffbdb38501f8be4f84fcd430a0d"
    grant_id: "eb6c8501-f1ce-4ef6-a76b-7dea690000da"
    issued_at: "2026-08-21T22:50:06.303Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:e6d075d6dd4138358cfddafd290a2350f40d977f23a38811d402348343849b13"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:6cfff1cbeea391464fb74ad5762a771f9c6aa60b72a09e7741d3ea236d5c818b"
    status: "active"
    task_id: "202608212244-6XZAYD"
  task_execution_context:
    base_ref: "main"
    base_sha: "134c95fd629d5ebcf0e17196ccb4b44f60c993fd"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "134c95fd629d5ebcf0e17196ccb4b44f60c993fd"
    version: 1
id_source: "generated"
---
## Summary

Implement the task-centric refactoring roadmap v2 and publish the next patch release

Implement the complete roadmap from /Users/densmirnov/Downloads/agentplane-task-centric-refactoring-roadmap-v2.md: RF2-001 through RF2-058, including the exact release acceptance scenario. Preserve the roadmap acceptance criteria, use one traceable AgentPlane Task, and publish the next patch release only after release qualification and exact-SHA hosted verification. The user's /goal request explicitly approves implementation, merge, publish, and required network/provider actions within this scope.

## Scope

- In scope: Implement the complete roadmap from /Users/densmirnov/Downloads/agentplane-task-centric-refactoring-roadmap-v2.md: RF2-001 through RF2-058, including the exact release acceptance scenario. Preserve the roadmap acceptance criteria, use one traceable AgentPlane Task, and publish the next patch release only after release qualification and exact-SHA hosted verification. The user's /goal request explicitly approves implementation, merge, publish, and required network/provider actions within this scope.
- Out of scope: unrelated refactors not required for "Implement the task-centric refactoring roadmap v2 and publish the next patch release".

## Plan

1. Establish a live baseline: map RF2-001 through RF2-058 to current symbols, tests, schemas, and already-shipped behavior; record only genuine gaps and preserve compatible WorkOrder, SemanticResult, receipt, hook, journal, provider, and workspace mechanisms.
2. Complete Phase 0 characterization for outcome dispositions, direct/branch/external/managed golden paths, lifecycle invariants, crash reconciliation, and the fresh-repository gateway.
3. Complete the correctness floor RF2-006 through RF2-011: exhaustive outcome disposition, validated Git base identity without zero-SHA fallback, strict state parsing with explicit migration, transition-owned verification rework, typed context retrieval failures, and one explicit task-run dispatch path.
4. Add the task-centric domain model RF2-012 through RF2-019 in pure Core modules: immutable TaskIntent and RepositorySnapshot, root Task lifecycle, digest-bound TaskPlanRevision approval, internal WorkItemGraph, atomic DomainEvent and TransitionReceipt, legacy projections, write boundaries, and ReconciliationSnapshot facts.
5. Add pure services RF2-020 through RF2-028: graph validation/readiness, deterministic scheduling and claims, actor-neutral semantic request/result, canonical validation, typed failures/recovery/decisions, one shared plan-change classifier, lifecycle engine, and root completion evaluation.
6. Introduce ports and adapters RF2-029 through RF2-035: CAS TaskRepositoryPort, Git/Workspace/ContentActor/Validation/Provider/Artifact/Context ports, one application loop for direct and branch_pr strategies, and baseline-bound ExecutionLease authority.
7. Strengthen intake, planning, approval, and context RF2-036 through RF2-044: stable machine gateway, thin AGENTS/CLAUDE gateway, current PlanningContextBuilder, structured TaskPlanProposal, deterministic validation, exact digest approval, atomic internal WorkItem materialization, per-item context refresh, and typed output manifests/retrieval receipts.
8. Implement autonomous execution RF2-045 through RF2-049: one task-centric loop for pull, managed, and manual actors; bounded execute/diagnose/repair/review episodes; local plan adaptation; material replan boundaries; and typed human decision tickets.
9. Complete recovery and orchestration RF2-050 through RF2-054: durable checkpoints, centralized retry/idempotency budgets, resource claims, worktree/merge-queue integration, and a release-blocking fresh-repository architectural E2E gate.
10. Complete migration and deletion RF2-055 through RF2-058: canonical ExecutionContract, removal of project/role-centric ownership assumptions after adapters are proven, live-index/archive separation, dependency-boundary enforcement, and thin handlers.
11. Validate incrementally with targeted unit, property, integration, architecture, schema, generated-asset, and CLI checks; then run the full regression, release prepublish gate, and the literal 20-step release acceptance scenario including deterministic rework, crash resume, exact plan revision approval, material replan, final completion, and absence of any Project record.
12. Let AgentPlane integrate through the protected branch_pr route. After exact-head hosted checks pass, prepare and publish the next patch release, then verify the Git tag, GitHub release, package registry versions and dist-tags, installed CLI behavior, exact release SHA, post-release main state, and clean tracked/untracked state. Stop for a new approval only if scope roots, security boundary, version/tag, release target, or acceptance criteria materially change.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
