---
id: "202608131730-BHEAQT"
title: "Qualify and publish AgentPlane 0.7.6"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202608122156-EZZZYH"
tags:
  - "qualification"
  - "release"
  - "v0.7.6"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "merge"
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-13T17:31:20.267Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by the user as the final 0.7.6 qualification and publication stage after all planned fixes and verification optimization."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
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
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "source_code"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:79da8035bf52329036024f1e06334a89bdf755a99c6c03b972fb393eafba023d"
      escalation_reasons:
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
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
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "task_outcome"
commit: null
comments:
  -
    author: "INTEGRATOR"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-13T17:32:00.043Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-13T17:32:00.043Z"
doc_updated_by: "INTEGRATOR"
description: "Publish the 0.7.6 patch only after EZZZYH is merged and closed. Freeze the exact protected-main release scope; generate the patch plan and English release notes from actual changes since v0.7.5; run the complete 20-scenario provider-enabled release qualification on the exact clean candidate; run canonical release prepublish gates; prepare a branch_pr release candidate without creating a tag; require exact-SHA hosted checks and no unresolved reviews; integrate through the protected main lane; dispatch GitHub-only publication for the exact merged release SHA; verify release-ready and publish-result artifacts, tag, GitHub Release, and all three public npm packages; then clean the release worktree and report efficiency and residual lifecycle debt."
sections:
  Summary: |-
    Qualify and publish AgentPlane 0.7.6

    Publish the 0.7.6 patch only after EZZZYH is merged and closed. Freeze the exact protected-main release scope; generate the patch plan and English release notes from actual changes since v0.7.5; run the complete 20-scenario provider-enabled release qualification on the exact clean candidate; run canonical release prepublish gates; prepare a branch_pr release candidate without creating a tag; require exact-SHA hosted checks and no unresolved reviews; integrate through the protected main lane; dispatch GitHub-only publication for the exact merged release SHA; verify release-ready and publish-result artifacts, tag, GitHub Release, and all three public npm packages; then clean the release worktree and report efficiency and residual lifecycle debt.
  Scope: |-
    - In scope: Publish the 0.7.6 patch only after EZZZYH is merged and closed. Freeze the exact protected-main release scope; generate the patch plan and English release notes from actual changes since v0.7.5; run the complete 20-scenario provider-enabled release qualification on the exact clean candidate; run canonical release prepublish gates; prepare a branch_pr release candidate without creating a tag; require exact-SHA hosted checks and no unresolved reviews; integrate through the protected main lane; dispatch GitHub-only publication for the exact merged release SHA; verify release-ready and publish-result artifacts, tag, GitHub Release, and all three public npm packages; then clean the release worktree and report efficiency and residual lifecycle debt.
    - Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane 0.7.6".
  Plan: "1. Confirm the merged EZZZYH hosted-close and a clean tracked protected-main baseline; require current public version 0.7.5 and no active release incident. 2. Create the dedicated branch_pr release worktree, freeze the canonical patch plan at exactly 0.7.6 from the current main SHA, and author English release notes that cover the actual v0.7.5..candidate change inventory. 3. Run the complete provider-enabled 20-scenario release qualification on the exact clean pre-version candidate using the reviewed Codex runtime; require ready disposition, zero blocking defects, and preserve the measured verification-efficiency evidence. 4. Prepare the 0.7.6 release candidate so all public package versions, internal dependency pins, repository expected CLI, generated artifacts, and release notes advance together without creating or pushing a tag. 5. Run release parity and the canonical release:prepublish gate on the exact release candidate SHA; record the full check composition and stop on any failure or unexpected dirty state. 6. Push the candidate branch, open the release PR, require resolved review threads and stable required hosted checks on its exact head, then integrate through the AgentPlane queue and wait for hosted close. 7. From the exact merged main release SHA, require a successful release-ready artifact, dispatch the GitHub-only Publish release workflow for 0.7.6, and require successful publish-result, tag, GitHub Release, and registry identity for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes. 8. Finalize AgentPlane task truth, clean the merged release worktree and branch through AgentPlane, verify local main equals origin/main with no unintended tracked changes, and report qualification, efficiency, publication, and residual lifecycle debt."
  Verify Steps: |-
    1. Inspect main and provider state. Expected: PR #4831 is merged, Task Hosted Close 31725715564 succeeded, EZZZYH is DONE, the integration queue is empty, tracked main is clean, all public packages are 0.7.5, and no active incident blocks release planning.
    2. Run the canonical patch release plan. Expected: target version is exactly 0.7.6, base SHA equals the protected main release base, changes inventory covers every commit since v0.7.5, and docs/releases/v0.7.6.md satisfies the release-note coverage contract.
    3. Execute node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --codex-version 0.146.0-alpha.3.1 --subject <exact-clean-candidate-sha>. Expected: all 20 scenarios execute, provider matrix and packaged-mixed-scope-lifecycle pass, release disposition is ready with zero blocking defects, and exact-SHA report plus efficiency metrics are retained.
    4. Prepare the branch_pr release candidate. Expected: agentplane, @agentplaneorg/core, and @agentplaneorg/recipes versions and both CLI internal dependency pins are 0.7.6; repository expected CLI and generated release surfaces agree; no tag is created before protected-main merge.
    5. Run bun run release:parity and bun run release:prepublish on the exact candidate SHA. Expected: both exit zero; install, migration, workflow, critical CLI, significant coverage, schema/docs, and package/runtime gates remain present; no temporary or unintended tracked artifacts remain.
    6. Inspect the release PR and hosted checks. Expected: no unresolved review thread, PR head equals the verified candidate SHA, every required hosted check including PR verification passes stably, and AgentPlane integration records the exact merge SHA plus hosted-close evidence.
    7. Inspect Core CI release-ready for the exact merged main SHA, dispatch Publish release with version 0.7.6 and that SHA, and inspect its artifact. Expected: release-ready and publish-result identities match exact SHA/version/tag, workflow concludes success, tag and GitHub Release v0.7.6 exist, and the release is latest.
    8. Run node scripts/release/check-published-packages.mjs --version 0.7.6 and independent npm/GitHub readback. Expected: agentplane, @agentplaneorg/core, and @agentplaneorg/recipes resolve to 0.7.6 with expected dependency pins; final main equals origin/main, the release task is DONE, its worktree/branch are cleaned, and git status contains no unintended tracked changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Before publication, close the release PR and revert only the candidate commit through a new task; do not create or push v0.7.6. After tag, GitHub Release, or npm publication, immutable registries make rollback unsafe: stop, preserve evidence, and prepare a forward-fix 0.7.7 task instead of rewriting tags, releases, or package versions."
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "bc0afaea7a7be909fc93374a195c73da3f697d85"
    version: 1
id_source: "generated"
---
## Summary

Qualify and publish AgentPlane 0.7.6

Publish the 0.7.6 patch only after EZZZYH is merged and closed. Freeze the exact protected-main release scope; generate the patch plan and English release notes from actual changes since v0.7.5; run the complete 20-scenario provider-enabled release qualification on the exact clean candidate; run canonical release prepublish gates; prepare a branch_pr release candidate without creating a tag; require exact-SHA hosted checks and no unresolved reviews; integrate through the protected main lane; dispatch GitHub-only publication for the exact merged release SHA; verify release-ready and publish-result artifacts, tag, GitHub Release, and all three public npm packages; then clean the release worktree and report efficiency and residual lifecycle debt.

## Scope

- In scope: Publish the 0.7.6 patch only after EZZZYH is merged and closed. Freeze the exact protected-main release scope; generate the patch plan and English release notes from actual changes since v0.7.5; run the complete 20-scenario provider-enabled release qualification on the exact clean candidate; run canonical release prepublish gates; prepare a branch_pr release candidate without creating a tag; require exact-SHA hosted checks and no unresolved reviews; integrate through the protected main lane; dispatch GitHub-only publication for the exact merged release SHA; verify release-ready and publish-result artifacts, tag, GitHub Release, and all three public npm packages; then clean the release worktree and report efficiency and residual lifecycle debt.
- Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane 0.7.6".

## Plan

1. Confirm the merged EZZZYH hosted-close and a clean tracked protected-main baseline; require current public version 0.7.5 and no active release incident. 2. Create the dedicated branch_pr release worktree, freeze the canonical patch plan at exactly 0.7.6 from the current main SHA, and author English release notes that cover the actual v0.7.5..candidate change inventory. 3. Run the complete provider-enabled 20-scenario release qualification on the exact clean pre-version candidate using the reviewed Codex runtime; require ready disposition, zero blocking defects, and preserve the measured verification-efficiency evidence. 4. Prepare the 0.7.6 release candidate so all public package versions, internal dependency pins, repository expected CLI, generated artifacts, and release notes advance together without creating or pushing a tag. 5. Run release parity and the canonical release:prepublish gate on the exact release candidate SHA; record the full check composition and stop on any failure or unexpected dirty state. 6. Push the candidate branch, open the release PR, require resolved review threads and stable required hosted checks on its exact head, then integrate through the AgentPlane queue and wait for hosted close. 7. From the exact merged main release SHA, require a successful release-ready artifact, dispatch the GitHub-only Publish release workflow for 0.7.6, and require successful publish-result, tag, GitHub Release, and registry identity for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes. 8. Finalize AgentPlane task truth, clean the merged release worktree and branch through AgentPlane, verify local main equals origin/main with no unintended tracked changes, and report qualification, efficiency, publication, and residual lifecycle debt.

## Verify Steps

1. Inspect main and provider state. Expected: PR #4831 is merged, Task Hosted Close 31725715564 succeeded, EZZZYH is DONE, the integration queue is empty, tracked main is clean, all public packages are 0.7.5, and no active incident blocks release planning.
2. Run the canonical patch release plan. Expected: target version is exactly 0.7.6, base SHA equals the protected main release base, changes inventory covers every commit since v0.7.5, and docs/releases/v0.7.6.md satisfies the release-note coverage contract.
3. Execute node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --codex-version 0.146.0-alpha.3.1 --subject <exact-clean-candidate-sha>. Expected: all 20 scenarios execute, provider matrix and packaged-mixed-scope-lifecycle pass, release disposition is ready with zero blocking defects, and exact-SHA report plus efficiency metrics are retained.
4. Prepare the branch_pr release candidate. Expected: agentplane, @agentplaneorg/core, and @agentplaneorg/recipes versions and both CLI internal dependency pins are 0.7.6; repository expected CLI and generated release surfaces agree; no tag is created before protected-main merge.
5. Run bun run release:parity and bun run release:prepublish on the exact candidate SHA. Expected: both exit zero; install, migration, workflow, critical CLI, significant coverage, schema/docs, and package/runtime gates remain present; no temporary or unintended tracked artifacts remain.
6. Inspect the release PR and hosted checks. Expected: no unresolved review thread, PR head equals the verified candidate SHA, every required hosted check including PR verification passes stably, and AgentPlane integration records the exact merge SHA plus hosted-close evidence.
7. Inspect Core CI release-ready for the exact merged main SHA, dispatch Publish release with version 0.7.6 and that SHA, and inspect its artifact. Expected: release-ready and publish-result identities match exact SHA/version/tag, workflow concludes success, tag and GitHub Release v0.7.6 exist, and the release is latest.
8. Run node scripts/release/check-published-packages.mjs --version 0.7.6 and independent npm/GitHub readback. Expected: agentplane, @agentplaneorg/core, and @agentplaneorg/recipes resolve to 0.7.6 with expected dependency pins; final main equals origin/main, the release task is DONE, its worktree/branch are cleaned, and git status contains no unintended tracked changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Before publication, close the release PR and revert only the candidate commit through a new task; do not create or push v0.7.6. After tag, GitHub Release, or npm publication, immutable registries make rollback unsafe: stop, preserve evidence, and prepare a forward-fix 0.7.7 task instead of rewriting tags, releases, or package versions.

## Findings
