---
id: "202608181315-3NYFYK"
title: "Harden task isolation, provider truth, autonomous authority, recovery, and release AgentPlane 0.7.7"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
  - "patch"
  - "correctness"
  - "authority"
  - "provider-truth"
  - "worktree-isolation"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "network"
  - "credentials"
  - "deploy"
  - "publish"
  - "merge"
  - "security"
  - "external_system"
blueprint_request: "release.strict"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-18T13:16:31.678Z"
  updated_by: "USER"
  note: "User explicitly approved adding the audited defects to the shared fix pool, implementing them, reconciling relevant local changes, cleaning obsolete state, and publishing the next patch release."
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
    - "effect_credentials"
    - "effect_dependencies"
    - "effect_deploy"
    - "effect_destructive_git"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
    - "material_requirements_uncertainty"
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
      - "security_boundary"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects: []
    writable_roots:
      - ".agentplane/WORKFLOW.md"
      - ".github/workflows"
      - "bun.lock"
      - "docs"
      - "package.json"
      - "packages/agentplane"
      - "packages/core"
      - "packages/recipes"
      - "packages/spec"
      - "packages/testkit"
      - "schemas"
      - "scripts"
  declaration:
    external_effects:
      - "credentials"
      - "deploy"
      - "destructive_git"
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "material"
    preferred_mode: "branch_pr"
    rationale:
      - "Provider truth, trusted authority provenance, and branch isolation are security boundaries and must fail closed."
      - "Publishing 0.7.7 and updating public distribution surfaces are externally visible and cannot be rolled back as ordinary repository edits."
      - "The requested outcome includes source, schema, CI, release metadata, hosted merge, package publication, and local cleanup."
    repository_effects:
      - "ci"
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "material"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - ".agentplane/WORKFLOW.md"
      - ".github/workflows"
      - "bun.lock"
      - "docs"
      - "package.json"
      - "packages/agentplane"
      - "packages/core"
      - "packages/recipes"
      - "packages/spec"
      - "packages/testkit"
      - "schemas"
      - "scripts"
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
    - "effect_credentials"
    - "effect_dependencies"
    - "effect_deploy"
    - "effect_destructive_git"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
    - "material_requirements_uncertainty"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "credentials"
      - "deploy"
      - "destructive_git"
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
          - ".agentplane/WORKFLOW.md"
          - ".github/workflows"
          - "bun.lock"
          - "docs"
          - "package.json"
          - "packages/agentplane"
          - "packages/core"
          - "packages/recipes"
          - "packages/spec"
          - "packages/testkit"
          - "schemas"
          - "scripts"
        evidence_requirements:
          - "external_effect:credentials"
          - "external_effect:deploy"
          - "external_effect:destructive_git"
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
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "requirements_resolution"
          - "task_outcome"
        external_effects:
          - "credentials"
          - "deploy"
          - "destructive_git"
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
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "material"
          requirements_uncertainty: "material"
          reversibility: "recovery_required"
      digest: "sha256:7fb6a22f9f1d8506511af54e687fc77918796e219426d6d8fc3ffce83092d0a0"
      escalation_reasons:
        - "central_component:.github/workflows"
        - "central_component:bun.lock"
        - "central_component:package.json"
        - "effect_ci"
        - "effect_dependencies"
        - "effect_public_api"
        - "effect_release_metadata"
        - "effect_schema"
        - "effect_security_boundary"
        - "external_effect_requires_real_e2e"
        - "material_implementation_uncertainty"
        - "material_requirements_uncertainty"
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
        - "requirements_resolution"
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
      - "external_effect:credentials"
      - "external_effect:deploy"
      - "external_effect:destructive_git"
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
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "requirements_resolution"
      - "task_outcome"
commit:
  hash: "5ca79bafc8217c6ec8e8e782fa0d5f42d2e386a7"
  message: "🐛 3NYFYK task: harden autonomous release lifecycle"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-18T13:16:41.558Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-18T13:48:28.280Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    commit: "5ca79bafc8217c6ec8e8e782fa0d5f42d2e386a7"
doc_version: 3
doc_updated_at: "2026-08-18T13:48:28.280Z"
doc_updated_by: "CODER"
description: "Deliver the complete 0.7.7 patch pool: prevent task branches from inheriting diverged or contaminated local base history; block foreign-task commits and artifacts before PR publication; make provider truth authoritative for MERGED/DONE/cleanup and detect local/provider contradictions in doctor and release gates; preserve fully autonomous mode=all including integration.enqueue while loading authority only from a trusted base/operator-owned policy source; make task lookup and read/write/grant route contexts canonical across old worktrees; allow PLANNER to refine structured execution contracts and route evaluator-required scope widening through a controlled approval boundary; incorporate only still-relevant local changes, discard duplicates already present upstream, integrate the verified patch/beta release automation, run focused/full/installed-package/hosted checks, publish 0.7.7, and verify all public release surfaces plus opening 0.7.8-beta.1."
sections:
  Summary: |-
    Harden task isolation, provider truth, autonomous authority, recovery, and release AgentPlane 0.7.7

    Deliver the complete 0.7.7 patch pool: prevent task branches from inheriting diverged or contaminated local base history; block foreign-task commits and artifacts before PR publication; make provider truth authoritative for MERGED/DONE/cleanup and detect local/provider contradictions in doctor and release gates; preserve fully autonomous mode=all including integration.enqueue while loading authority only from a trusted base/operator-owned policy source; make task lookup and read/write/grant route contexts canonical across old worktrees; allow PLANNER to refine structured execution contracts and route evaluator-required scope widening through a controlled approval boundary; incorporate only still-relevant local changes, discard duplicates already present upstream, integrate the verified patch/beta release automation, run focused/full/installed-package/hosted checks, publish 0.7.7, and verify all public release surfaces plus opening 0.7.8-beta.1.
  Scope: |-
    - In scope: Deliver the complete 0.7.7 patch pool: prevent task branches from inheriting diverged or contaminated local base history; block foreign-task commits and artifacts before PR publication; make provider truth authoritative for MERGED/DONE/cleanup and detect local/provider contradictions in doctor and release gates; preserve fully autonomous mode=all including integration.enqueue while loading authority only from a trusted base/operator-owned policy source; make task lookup and read/write/grant route contexts canonical across old worktrees; allow PLANNER to refine structured execution contracts and route evaluator-required scope widening through a controlled approval boundary; incorporate only still-relevant local changes, discard duplicates already present upstream, integrate the verified patch/beta release automation, run focused/full/installed-package/hosted checks, publish 0.7.7, and verify all public release surfaces plus opening 0.7.8-beta.1.
    - Out of scope: unrelated refactors not required for "Harden task isolation, provider truth, autonomous authority, recovery, and release AgentPlane 0.7.7".
  Plan: "Plan the 0.7.7 patch as a release-blocking correctness program: first restore branch and provider invariants, then harden trusted autonomous authority and task routing, reconcile the verified release-cycle work, qualify the exact candidate, publish it, verify every public surface, and clean only state proven redundant or recoverable."
  Verify Steps: |-
    PLANNER fallback scaffold for "Harden task isolation, provider truth, autonomous authority, recovery, and release AgentPlane 0.7.7". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Harden task isolation, provider truth, autonomous authority, recovery, and release AgentPlane 0.7.7". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "f4fc869fd5ffbafb58c7e33c9f75ac762f3a242f"
    version: 1
id_source: "generated"
---
## Summary

Harden task isolation, provider truth, autonomous authority, recovery, and release AgentPlane 0.7.7

Deliver the complete 0.7.7 patch pool: prevent task branches from inheriting diverged or contaminated local base history; block foreign-task commits and artifacts before PR publication; make provider truth authoritative for MERGED/DONE/cleanup and detect local/provider contradictions in doctor and release gates; preserve fully autonomous mode=all including integration.enqueue while loading authority only from a trusted base/operator-owned policy source; make task lookup and read/write/grant route contexts canonical across old worktrees; allow PLANNER to refine structured execution contracts and route evaluator-required scope widening through a controlled approval boundary; incorporate only still-relevant local changes, discard duplicates already present upstream, integrate the verified patch/beta release automation, run focused/full/installed-package/hosted checks, publish 0.7.7, and verify all public release surfaces plus opening 0.7.8-beta.1.

## Scope

- In scope: Deliver the complete 0.7.7 patch pool: prevent task branches from inheriting diverged or contaminated local base history; block foreign-task commits and artifacts before PR publication; make provider truth authoritative for MERGED/DONE/cleanup and detect local/provider contradictions in doctor and release gates; preserve fully autonomous mode=all including integration.enqueue while loading authority only from a trusted base/operator-owned policy source; make task lookup and read/write/grant route contexts canonical across old worktrees; allow PLANNER to refine structured execution contracts and route evaluator-required scope widening through a controlled approval boundary; incorporate only still-relevant local changes, discard duplicates already present upstream, integrate the verified patch/beta release automation, run focused/full/installed-package/hosted checks, publish 0.7.7, and verify all public release surfaces plus opening 0.7.8-beta.1.
- Out of scope: unrelated refactors not required for "Harden task isolation, provider truth, autonomous authority, recovery, and release AgentPlane 0.7.7".

## Plan

Plan the 0.7.7 patch as a release-blocking correctness program: first restore branch and provider invariants, then harden trusted autonomous authority and task routing, reconcile the verified release-cycle work, qualify the exact candidate, publish it, verify every public surface, and clean only state proven redundant or recoverable.

## Verify Steps

PLANNER fallback scaffold for "Harden task isolation, provider truth, autonomous authority, recovery, and release AgentPlane 0.7.7". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Harden task isolation, provider truth, autonomous authority, recovery, and release AgentPlane 0.7.7". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
