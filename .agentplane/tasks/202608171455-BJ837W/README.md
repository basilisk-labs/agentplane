---
id: "202608171455-BJ837W"
title: "Automate next patch beta version after release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "automation"
  - "prerelease"
  - "release"
  - "versioning"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "publish"
blueprint_request: "release.strict"
verify:
  - "bun run ci:contract"
  - "bun run package:install-smoke"
  - "bun run release:parity"
  - "bun test packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/release-task-evidence-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/check-release-parity-script.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-17T15:46:45.525Z"
  updated_by: "ORCHESTRATOR"
  note: null
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
    - "effect_public_api"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "ci"
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "schema"
      - "security_boundary"
    writable_roots:
      - ".agentplane/WORKFLOW.md"
      - ".github/workflows/publish.yml"
      - "bun.lock"
      - "docs/developer/release-and-publishing.mdx"
      - "docs/reference/generated-reference.mdx"
      - "packages/agentplane/package.json"
      - "packages/agentplane/src/commands/release"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/recipes/src/index.ts"
      - "packages/spec/examples/acr.json"
      - "packages/testkit/package.json"
      - "scripts/lib"
      - "scripts/release"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Implementation changes repository code and workflow definitions only; it does not publish, push, merge, or access external providers during the semantic episode."
      - "The change alters public release planning semantics and protected-main post-publish automation, so branch_pr isolation and full regression are required."
      - "The current 0.7.6 to 0.7.7-beta.1 transition is part of the same version-lifecycle contract and provides an executable repository-state acceptance case."
    repository_effects:
      - "ci"
      - "dependencies"
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - ".agentplane/WORKFLOW.md"
      - ".github/workflows/publish.yml"
      - "bun.lock"
      - "docs/developer/release-and-publishing.mdx"
      - "docs/reference/generated-reference.mdx"
      - "packages/agentplane/package.json"
      - "packages/agentplane/src/commands/release"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/recipes/src/index.ts"
      - "packages/spec/examples/acr.json"
      - "packages/testkit/package.json"
      - "scripts/lib"
      - "scripts/release"
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
    - "effect_public_api"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - ".agentplane/WORKFLOW.md"
          - ".github/workflows/publish.yml"
          - "bun.lock"
          - "docs/developer/release-and-publishing.mdx"
          - "docs/reference/generated-reference.mdx"
          - "packages/agentplane/package.json"
          - "packages/agentplane/src/commands/release"
          - "packages/core/package.json"
          - "packages/recipes/package.json"
          - "packages/recipes/src/index.ts"
          - "packages/spec/examples/acr.json"
          - "packages/testkit/package.json"
          - "scripts/lib"
          - "scripts/release"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:dependencies"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "dependencies"
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:77d9a54f25a6320f71b18c148b3ee5b6edf778c1690df47e1a7b1eab323e5289"
      escalation_reasons:
        - "central_component:.github/workflows/publish.yml"
        - "central_component:bun.lock"
        - "central_component:packages/core/package.json"
        - "effect_ci"
        - "effect_dependencies"
        - "effect_public_api"
        - "effect_release_metadata"
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
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "docs_contract"
        - "full_regression"
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
      - "repository_effect:ci"
      - "repository_effect:dependencies"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "ea3b7ac45a49d7119c405e8312754c69c12b8c75"
  message: "✨ BJ837W task: automate next patch beta version"
comments:
  -
    author: "CODER"
    body: "Start: recover the approved next patch beta automation implementation and complete verification."
  -
    author: "CODER"
    body: "Implementation committed after recovery; required local verification passed."
  -
    author: "EVALUATOR"
    body: "Local verification evidence: focused release suites 44 passed, 0 failed; release:parity passed at 0.7.7-beta.1; package:install-smoke passed with 8 migration scenarios; ci:contract passed including compatibility, schemas, docs, ESLint, architecture, clone, knip, and coverage; hosted_integration remains pending until provider publication."
events:
  -
    type: "status"
    at: "2026-08-17T15:50:15.929Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: recover the approved next patch beta automation implementation and complete verification."
  -
    type: "status"
    at: "2026-08-17T15:57:57.735Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed after recovery; required local verification passed."
    commit: "ea3b7ac45a49d7119c405e8312754c69c12b8c75"
  -
    type: "comment"
    at: "2026-08-17T15:58:36.443Z"
    author: "EVALUATOR"
    body: "Local verification evidence: focused release suites 44 passed, 0 failed; release:parity passed at 0.7.7-beta.1; package:install-smoke passed with 8 migration scenarios; ci:contract passed including compatibility, schemas, docs, ESLint, architecture, clone, knip, and coverage; hosted_integration remains pending until provider publication."
doc_version: 3
doc_updated_at: "2026-08-17T15:58:36.443Z"
doc_updated_by: "EVALUATOR"
description: "After a successful stable AgentPlane publish and hosted-evidence follow-up, atomically advance all semantic version surfaces to the next patch prerelease (for example 0.7.6 to 0.7.7-beta.1), keep the operation idempotent, teach release planning to finalize that prerelease as 0.7.7 instead of proposing 0.7.8, update generated and lockfile surfaces, add focused and packaged-install regression coverage, document the lifecycle, and perform the one-time current-main transition to 0.7.7-beta.1 without rewriting historical version references."
sections:
  Summary: |-
    Automate next patch beta version after release

    After a successful stable AgentPlane publish and hosted-evidence follow-up, atomically advance all semantic version surfaces to the next patch prerelease (for example 0.7.6 to 0.7.7-beta.1), keep the operation idempotent, teach release planning to finalize that prerelease as 0.7.7 instead of proposing 0.7.8, update generated and lockfile surfaces, add focused and packaged-install regression coverage, document the lifecycle, and perform the one-time current-main transition to 0.7.7-beta.1 without rewriting historical version references.
  Scope: |-
    - In scope: After a successful stable AgentPlane publish and hosted-evidence follow-up, atomically advance all semantic version surfaces to the next patch prerelease (for example 0.7.6 to 0.7.7-beta.1), keep the operation idempotent, teach release planning to finalize that prerelease as 0.7.7 instead of proposing 0.7.8, update generated and lockfile surfaces, add focused and packaged-install regression coverage, document the lifecycle, and perform the one-time current-main transition to 0.7.7-beta.1 without rewriting historical version references.
    - Out of scope: unrelated refactors not required for "Automate next patch beta version after release".
  Plan: "Implement an idempotent post-publish development-version transition: a successful stable X.Y.Z publish follow-up advances every semantic version surface to X.Y.(Z+1)-beta.1, while release planning on that prerelease finalizes X.Y.(Z+1) instead of skipping to the following patch. Reuse one manifest-backed mutation contract, update generated docs and lockfiles, preserve historical version references, and bootstrap current main from 0.7.6 to 0.7.7-beta.1."
  Verify Steps: |-
    PLANNER fallback scaffold for "Automate next patch beta version after release". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Automate next patch beta version after release". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    start_head_sha: "89f760183da24c5a768dfe97e6c4c2fb67bd1478"
    version: 1
id_source: "generated"
---
## Summary

Automate next patch beta version after release

After a successful stable AgentPlane publish and hosted-evidence follow-up, atomically advance all semantic version surfaces to the next patch prerelease (for example 0.7.6 to 0.7.7-beta.1), keep the operation idempotent, teach release planning to finalize that prerelease as 0.7.7 instead of proposing 0.7.8, update generated and lockfile surfaces, add focused and packaged-install regression coverage, document the lifecycle, and perform the one-time current-main transition to 0.7.7-beta.1 without rewriting historical version references.

## Scope

- In scope: After a successful stable AgentPlane publish and hosted-evidence follow-up, atomically advance all semantic version surfaces to the next patch prerelease (for example 0.7.6 to 0.7.7-beta.1), keep the operation idempotent, teach release planning to finalize that prerelease as 0.7.7 instead of proposing 0.7.8, update generated and lockfile surfaces, add focused and packaged-install regression coverage, document the lifecycle, and perform the one-time current-main transition to 0.7.7-beta.1 without rewriting historical version references.
- Out of scope: unrelated refactors not required for "Automate next patch beta version after release".

## Plan

Implement an idempotent post-publish development-version transition: a successful stable X.Y.Z publish follow-up advances every semantic version surface to X.Y.(Z+1)-beta.1, while release planning on that prerelease finalizes X.Y.(Z+1) instead of skipping to the following patch. Reuse one manifest-backed mutation contract, update generated docs and lockfiles, preserve historical version references, and bootstrap current main from 0.7.6 to 0.7.7-beta.1.

## Verify Steps

PLANNER fallback scaffold for "Automate next patch beta version after release". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Automate next patch beta version after release". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
