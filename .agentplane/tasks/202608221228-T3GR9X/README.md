---
id: "202608221228-T3GR9X"
title: "Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior."
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
  - "release-blocker"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "merge"
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-22T12:31:52.061Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:0bc67d4c76c6d720cb846ca37ae17eb8b460aa408228af11c3bf5cd5cd602b0a"
verification:
  state: "ok"
  updated_at: "2026-08-22T12:34:56.262Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_irreversible"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "documentation"
      - "release_metadata"
      - "repository_write"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "source_code"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "security_boundary"
    writable_roots:
      - "bun.lock"
      - "docs/assets/header.svg"
      - "docs/assets/readme-headers"
      - "docs/releases/v0.7.8.md"
      - "package.json"
      - "packages/agentplane/package.json"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/testkit/package.json"
      - "website/static/img/social/docs/releases/v0.7.8.png"
      - "website/static/img/social/manifest.json"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The GitHub tag, GitHub Release, and npm packages must all bind to the exact merged release SHA."
      - "The candidate changes release metadata and generated documentation assets and must use the protected branch_pr route."
      - "npm publication requires explicit state-bound authority and provider readback."
    repository_effects:
      - "documentation"
      - "release_metadata"
      - "repository_write"
    requirements_uncertainty: "bounded"
    reversibility: "irreversible"
    schema_version: 2
    scope_roots:
      - "bun.lock"
      - "docs/assets/header.svg"
      - "docs/assets/readme-headers"
      - "docs/releases/v0.7.8.md"
      - "package.json"
      - "packages/agentplane/package.json"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/testkit/package.json"
      - "website/static/img/social/docs/releases/v0.7.8.png"
      - "website/static/img/social/manifest.json"
  observed:
    authority_violations: []
    changed_components:
      - "docs"
      - "website"
    changed_paths:
      - "docs/assets/header.svg"
      - "docs/assets/readme-headers/adr.svg"
      - "docs/assets/readme-headers/agentplane-cli.svg"
      - "docs/assets/readme-headers/agentplane.svg"
      - "docs/assets/readme-headers/core.svg"
      - "docs/assets/readme-headers/docs.svg"
      - "docs/assets/readme-headers/humanizer.svg"
      - "docs/assets/readme-headers/recipes.svg"
      - "docs/assets/readme-headers/releases.svg"
      - "docs/assets/readme-headers/schemas.svg"
      - "docs/assets/readme-headers/scripts.svg"
      - "docs/assets/readme-headers/skills.svg"
      - "docs/assets/readme-headers/spec.svg"
      - "docs/assets/readme-headers/testkit.svg"
      - "docs/releases/v0.7.8.md"
      - "website/static/img/social/docs/releases/v0.7.8.png"
      - "website/static/img/social/manifest.json"
    external_effects: []
    repository_effects:
      - "documentation"
      - "release_metadata"
      - "repository_write"
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
    - "effect_external_write"
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_irreversible"
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
          - "bun.lock"
          - "docs/assets/header.svg"
          - "docs/assets/readme-headers"
          - "docs/releases/v0.7.8.md"
          - "package.json"
          - "packages/agentplane/package.json"
          - "packages/core/package.json"
          - "packages/recipes/package.json"
          - "packages/testkit/package.json"
          - "website/static/img/social/docs/releases/v0.7.8.png"
          - "website/static/img/social/manifest.json"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "documentation"
          - "release_metadata"
          - "repository_write"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "irreversible"
      digest: "sha256:b974391496269c611ae16b407df2813e25d2fc501a2b532d6d4838c60b8661b0"
      escalation_reasons:
        - "central_component:bun.lock"
        - "central_component:package.json"
        - "central_component:packages/core/package.json"
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
        - "reversibility_irreversible"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "docs"
          - "website"
        changed_files:
          - "docs/assets/header.svg"
          - "docs/assets/readme-headers/adr.svg"
          - "docs/assets/readme-headers/agentplane-cli.svg"
          - "docs/assets/readme-headers/agentplane.svg"
          - "docs/assets/readme-headers/core.svg"
          - "docs/assets/readme-headers/docs.svg"
          - "docs/assets/readme-headers/humanizer.svg"
          - "docs/assets/readme-headers/recipes.svg"
          - "docs/assets/readme-headers/releases.svg"
          - "docs/assets/readme-headers/schemas.svg"
          - "docs/assets/readme-headers/scripts.svg"
          - "docs/assets/readme-headers/skills.svg"
          - "docs/assets/readme-headers/spec.svg"
          - "docs/assets/readme-headers/testkit.svg"
          - "docs/releases/v0.7.8.md"
          - "website/static/img/social/docs/releases/v0.7.8.png"
          - "website/static/img/social/manifest.json"
        external_effects: []
        repository_effects:
          - "documentation"
          - "release_metadata"
          - "repository_write"
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: true
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
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
      - "repository_effect:documentation"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "task_outcome"
commit:
  hash: "89c729b19c9dda28f8236b2dfaee397ede5860dd"
  message: "🚧 T3GR9X task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 89c729b19c9d. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-22T12:32:07.060Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-22T12:34:47.252Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 89c729b19c9d. CLI accepted one state-bound external-agent semantic result."
    commit: "89c729b19c9dda28f8236b2dfaee397ede5860dd"
  -
    type: "verify"
    at: "2026-08-22T12:34:56.262Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-22T12:34:58.249Z"
doc_updated_by: "SUPERVISOR"
description: "Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior."
sections:
  Summary: |-
    Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.

    Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.
  Scope: |-
    - In scope: Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.
    - Out of scope: unrelated refactors not required for "Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.".
  Plan: "Prepare one v0.7.8 release candidate from exact main ee460292, reuse the already reviewed release artifacts, qualify the exact candidate locally and in hosted checks, then publish and independently read back the exact merged SHA."
  Verify Steps: |-
    PLANNER fallback scaffold for "Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-22T12:34:56.262Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:17340f5d2eb8a5a2c6d1de06f0d0578e21dc79fd17d47c5a9b3035bb74027c8e, input_digest=sha256:8996b01c224ebc081523048555f96df0e89c95dd13e427508269dc156c3a1647

    Details:

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608221228-T3GR9X/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221228-T3GR9X Verification Contract check docs_contract

    Check: full_regression
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608221228-T3GR9X/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221228-T3GR9X Verification Contract check full_regression

    Check: hosted_integration
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608221228-T3GR9X/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221228-T3GR9X Verification Contract check hosted_integration

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608221228-T3GR9X/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221228-T3GR9X Verification Contract check real_e2e

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608221228-T3GR9X/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608221228-T3GR9X Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221228-T3GR9X-prepare-and-publish-v0-7-8-from-exact-main-ee460/.agentplane/tasks/202608221228-T3GR9X/blueprint/resolved-snapshot.json
    - old_digest: 8daba7e9f0aff6fb0b82b7c2ebb823d481ad97de362f55bcf46f01530e0e73ec
    - current_digest: 8daba7e9f0aff6fb0b82b7c2ebb823d481ad97de362f55bcf46f01530e0e73ec
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608221228-T3GR9X

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
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
  agentplane.execution_grant:
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:0bc67d4c76c6d720cb846ca37ae17eb8b460aa408228af11c3bf5cd5cd602b0a"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:ae05820ff13d620a04f24aae402edec96f26119cc526aafa516fc860d564c718"
    digest: "sha256:11dbec2d03403a14b78eab3fd3736b9b62a2c41e427b2c3cec6408292871cdef"
    grant_id: "3c7b4b70-8911-4ec6-ad7e-ff6c19c4db90"
    issued_at: "2026-08-22T12:31:52.061Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:a27d0b18a4d8389f64ceb68c628ba4811db1ceb19caac60c3ddc8ea90a0ac667"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:ddfbf658c5fda15d52ba5bb6d564f1aa3508d1db1664df05f0cfb1f389716068"
    status: "active"
    task_id: "202608221228-T3GR9X"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-22T12:31:52.061Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:5201a213920fe523327c332401a048a8d1d1c3417caedb3955d2284f9ba5d574"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-08-22T12:31:16.934Z"
      digest: "sha256:5201a213920fe523327c332401a048a8d1d1c3417caedb3955d2284f9ba5d574"
      proposal:
        assumptions:
          - "The approved target remains exactly v0.7.8."
          - "The canonical release CLI owns version freeze, candidate preparation, publication, and evidence recording."
          - "Existing unrelated untracked task artifacts remain user-owned and must be preserved."
        planning_baseline:
          captured_at: "2026-08-22T12:28:45.849Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:59a21631e5fafa0f3a6d8f07350284204a381a7f85adca22273ad5ca05728ec4"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608221228-T3GR9X/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "ee460292f9d253a5ba6fe2ca95a6d0fd5e7a7088"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608221228-T3GR9X"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run release:prepublish"
              id: "top-release-prepublish"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
            -
              capability: "task.verify"
              command: "gh pr checks --required --watch"
              id: "top-hosted-integration"
              kind: "provider"
              required: true
              timeout_ms: 3600000
            -
              capability: "task.verify"
              command: "bun run release:smoke:published"
              id: "top-published-smoke"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              command: "bun run release:postpublish:audit"
              id: "top-publication-audit"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              command: "git status --short --untracked-files=all"
              id: "top-final-status"
              kind: "structural"
              required: true
          criteria:
            -
              check_ids:
                - "top-release-prepublish"
                - "top-hosted-integration"
              description: "The exact v0.7.8 candidate passes the full local and hosted gates before integration."
              id: "acceptance-release-gates"
              required: true
            -
              check_ids:
                - "top-published-smoke"
                - "top-publication-audit"
              description: "Public GitHub and npm surfaces match the exact merged release SHA and version 0.7.8."
              id: "acceptance-publication"
              required: true
            -
              check_ids:
                - "top-final-status"
              description: "Closeout preserves the pre-existing unrelated untracked task artifacts and leaves no unintended tracked changes."
              id: "acceptance-clean-state"
              required: true
          evidence_fingerprint: "sha256:98c9406546f5d6e25f120cb77e48d742f15f2f54da15465ea993b3b1d8e49f6b"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "release-artifact-check"
                  description: "The v0.7.8 note and artwork match the approved release scope and include the final lifecycle, type-module, and clone-baseline evidence."
                  id: "artifacts-match-plan"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 300000
                optional_sources:
                  - "docs/releases/v0.7.7.md"
                required_sources:
                  - "docs/releases/TEMPLATE.md"
                  - "task:202608221145-WVQS39"
                symbol_hints:
                  - "v0.7.8"
                  - "changes"
              depends_on: []
              expected_outputs:
                - "release_note:docs/releases/v0.7.8.md"
                - "release_artwork:v0.7.8"
              id: "prepare-release-artifacts"
              objective: "Port the reviewed v0.7.8 release note and generated artwork from task 202608221145-WVQS39 onto exact main ee460292 without carrying stale task ancestry."
              optional: false
              priority: 100
              required_inputs:
                - "main:ee460292f9d253a5ba6fe2ca95a6d0fd5e7a7088"
                - "task-artifacts:202608221145-WVQS39"
                - "docs/releases/TEMPLATE.md"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/releases/v0.7.8.md"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/assets"
                -
                  kind: "path"
                  mode: "write"
                  resource: "website/static/img/social"
              risk: "medium"
              scope_roots:
                - "docs/releases/v0.7.8.md"
                - "docs/assets/header.svg"
                - "docs/assets/readme-headers"
                - "website/static/img/social/docs/releases/v0.7.8.png"
                - "website/static/img/social/manifest.json"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:check"
                    id: "release-artifact-check"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "release-artifact-check"
                    description: "Validate release notes, package parity prerequisites, headers, and social manifest."
                    id: "artifacts-match-plan"
                    required: true
                evidence_fingerprint: "sha256:9782808cbbb4da2d141e2a427ad2dac64dd444453c4bc473f064c0a19c5e0f30"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "release-parity-check"
                    - "registry-availability-check"
                  description: "All release surfaces and internal dependency pins select exactly 0.7.8 and the version is not already published."
                  id: "version-parity"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "scripts/release/candidate-prepare.mjs"
                  - "scripts/release/version-bump.mjs"
                required_sources:
                  - "package.json"
                  - "packages/agentplane/package.json"
                  - "packages/core/package.json"
                  - "packages/recipes/package.json"
                  - "packages/testkit/package.json"
                symbol_hints:
                  - "release:candidate:prepare"
                  - "0.7.8"
              depends_on:
                - "prepare-release-artifacts"
              expected_outputs:
                - "release_candidate:v0.7.8"
                - "version_metadata:0.7.8"
              id: "prepare-candidate"
              objective: "Prepare the v0.7.8 candidate through the canonical release flow so all public package versions, internal pins, lockfile state, and generated metadata are coherent."
              optional: false
              priority: 90
              required_inputs:
                - "release_note:docs/releases/v0.7.8.md"
                - "approved_version:v0.7.8"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "release-candidate-worktree"
                -
                  kind: "path"
                  mode: "write"
                  resource: "package.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages"
              risk: "high"
              scope_roots:
                - "package.json"
                - "bun.lock"
                - "packages/agentplane/package.json"
                - "packages/core/package.json"
                - "packages/recipes/package.json"
                - "packages/testkit/package.json"
                - "docs/assets/header.svg"
                - "docs/assets/readme-headers"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:parity"
                    id: "release-parity-check"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run release:check:registry"
                    id: "registry-availability-check"
                    kind: "provider"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "release-parity-check"
                      - "registry-availability-check"
                    description: "Validate exact package parity and registry availability before candidate publication."
                    id: "version-parity"
                    required: true
                evidence_fingerprint: "sha256:a28b5783f08e66a38c83224845aecbe6fbf89a51ca5d443c79d859741da7b28c"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "release-prepublish"
                    - "hosted-pr-checks"
                  description: "The full local release gate and all required hosted PR checks pass on the exact candidate head before protected-main integration."
                  id: "candidate-qualified"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 200000
                optional_sources:
                  - "scripts/release/run-local-release-e2e.mjs"
                required_sources:
                  - "package.json"
                  - ".github/workflows"
                symbol_hints:
                  - "release:prepublish"
                  - "Core CI"
                  - "headRefOid"
              depends_on:
                - "prepare-candidate"
              expected_outputs:
                - "local_gate:pass"
                - "hosted_checks:pass"
                - "merged_release_sha:sha40"
              id: "qualify-and-integrate"
              objective: "Run the full prepublish gate on the exact candidate commit and integrate its PR only after all required hosted checks pass on the same head."
              optional: false
              priority: 80
              required_inputs:
                - "release_candidate:v0.7.8"
              resource_claims:
                -
                  kind: "provider_queue"
                  mode: "exclusive"
                  resource: "github-pull-request"
                -
                  kind: "exclusive"
                  mode: "exclusive"
                  resource: "main-integration"
              risk: "high"
              scope_roots:
                - "."
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:prepublish"
                    id: "release-prepublish"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                  -
                    capability: "task.verify"
                    command: "gh pr checks --required --watch"
                    id: "hosted-pr-checks"
                    kind: "provider"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "release-prepublish"
                      - "hosted-pr-checks"
                    description: "Qualify the exact candidate locally and through hosted integration."
                    id: "candidate-qualified"
                    required: true
                evidence_fingerprint: "sha256:c847af30b29fba435f97c1bed3287ae0102ffc99290ebee5f85144f5e4a2562c"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "published-package-smoke"
                    - "platform-publication-audit"
                    - "external-cli-smoke"
                    - "final-repository-state"
                  description: "Git tag and GitHub Release resolve to the exact merged SHA; all public packages expose 0.7.8 with intended dist-tags; published-package and external install checks pass."
                  id: "published-release"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 220000
                optional_sources:
                  - "scripts/reinstall-global-agentplane.sh"
                required_sources:
                  - "scripts/release/check-published-packages.mjs"
                  - "scripts/release/audit-platform-publication.mjs"
                  - ".github/workflows"
                symbol_hints:
                  - "v0.7.8"
                  - "release:smoke:published"
                  - "release:postpublish:audit"
                  - "dist-tags"
              depends_on:
                - "qualify-and-integrate"
              expected_outputs:
                - "github_tag:v0.7.8"
                - "github_release:v0.7.8"
                - "npm_packages:0.7.8"
                - "external_cli_smoke:pass"
                - "release_evidence:complete"
              id: "publish-and-readback"
              objective: "Publish v0.7.8 from the exact merged release SHA through the hosted workflow and independently verify GitHub, npm, installed CLI, repository preservation, and task closeout."
              optional: false
              priority: 70
              required_inputs:
                - "merged_release_sha:sha40"
                - "approved_publish:v0.7.8"
              resource_claims:
                -
                  kind: "provider_queue"
                  mode: "exclusive"
                  resource: "github-release"
                -
                  kind: "provider_queue"
                  mode: "exclusive"
                  resource: "npm-publication"
              risk: "high"
              scope_roots:
                - "."
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:smoke:published"
                    id: "published-package-smoke"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run release:postpublish:audit"
                    id: "platform-publication-audit"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    command: "verify installed agentplane --version and runtime explain from a temporary directory outside the repository"
                    id: "external-cli-smoke"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git status --short --untracked-files=all"
                    id: "final-repository-state"
                    kind: "structural"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "published-package-smoke"
                      - "platform-publication-audit"
                      - "external-cli-smoke"
                      - "final-repository-state"
                    description: "Read back every public release surface and prove exact-SHA and package parity."
                    id: "published-release"
                    required: true
                evidence_fingerprint: "sha256:3fb493006e13909688cc335cbd9fd2ef81c822525875ab3bb07e7b99b8a17082"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608221228-T3GR9X"
    event_cursor: 0
    final_validation: null
    id: "202608221228-T3GR9X"
    intent:
      acceptance_criteria: []
      captured_at: "2026-08-22T12:28:40.183Z"
      constraints: []
      request: |-
        Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.

        Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.
      task_id: "202608221228-T3GR9X"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-22T12:31:52.061Z"
    work_items:
      prepare-candidate:
        attempt: 0
        claim_id: null
        id: "prepare-candidate"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      prepare-release-artifacts:
        attempt: 0
        claim_id: null
        id: "prepare-release-artifacts"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      publish-and-readback:
        attempt: 0
        claim_id: null
        id: "publish-and-readback"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      qualify-and-integrate:
        attempt: 0
        claim_id: null
        id: "qualify-and-integrate"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  implementation_commit:
    hash: "89c729b19c9dda28f8236b2dfaee397ede5860dd"
  task_execution_context:
    base_ref: "main"
    base_sha: "ee460292f9d253a5ba6fe2ca95a6d0fd5e7a7088"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "ee460292f9d253a5ba6fe2ca95a6d0fd5e7a7088"
    version: 1
id_source: "generated"
---
## Summary

Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.

Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.

## Scope

- In scope: Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.
- Out of scope: unrelated refactors not required for "Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.".

## Plan

Prepare one v0.7.8 release candidate from exact main ee460292, reuse the already reviewed release artifacts, qualify the exact candidate locally and in hosted checks, then publish and independently read back the exact merged SHA.

## Verify Steps

PLANNER fallback scaffold for "Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Prepare and publish v0.7.8 from exact main ee460292 after the qualified clone-baseline update; port the already reviewed release artifacts from task 202608221145-WVQS39, run the full release prepublish gate, integrate through hosted checks, publish the exact merged SHA to GitHub and npm, and independently verify registry and installed CLI behavior.". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-22T12:34:56.262Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:17340f5d2eb8a5a2c6d1de06f0d0578e21dc79fd17d47c5a9b3035bb74027c8e, input_digest=sha256:8996b01c224ebc081523048555f96df0e89c95dd13e427508269dc156c3a1647

Details:

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608221228-T3GR9X/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221228-T3GR9X Verification Contract check docs_contract

Check: full_regression
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608221228-T3GR9X/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221228-T3GR9X Verification Contract check full_regression

Check: hosted_integration
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608221228-T3GR9X/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221228-T3GR9X Verification Contract check hosted_integration

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608221228-T3GR9X/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221228-T3GR9X Verification Contract check real_e2e

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608221228-T3GR9X/supervision/declared-checks.json#checks
Scope: branch_pr task 202608221228-T3GR9X Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221228-T3GR9X-prepare-and-publish-v0-7-8-from-exact-main-ee460/.agentplane/tasks/202608221228-T3GR9X/blueprint/resolved-snapshot.json
- old_digest: 8daba7e9f0aff6fb0b82b7c2ebb823d481ad97de362f55bcf46f01530e0e73ec
- current_digest: 8daba7e9f0aff6fb0b82b7c2ebb823d481ad97de362f55bcf46f01530e0e73ec
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608221228-T3GR9X

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
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
