---
id: "202608262034-QVVB66"
title: "Initialize blueprint test projects as real Git repositories for release CI"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "release-blocker"
  - "test-fixture"
  - "v0.7.8"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-26T20:45:55.317Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:469f305e3965104a4b9f4e30f72e793f7b92c7a93b9ddec7bdfab681c7867a1e"
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
    - "effect_external_write"
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
      - "repository_write"
      - "tests"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "source_code"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The branch_pr route requires hosted PR publication and integration effects after local implementation and verification."
      - "The permanent fix is confined to the stale test fixture that blocks the required 0.7.8 release gate."
    repository_effects:
      - "repository_write"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "repository_write"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:917ba28bcdcbc6ef21bdce2cfca9af8ab3cd4d27f6ff9bace94ee55e42d20005"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "tests"
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
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "85d4f4dc814843404e5e4078426bd0945f46cb29"
  message: "🚧 QVVB66 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 85d4f4dc8148. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-26T20:46:09.599Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-26T20:47:36.615Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 85d4f4dc8148. CLI accepted one state-bound external-agent semantic result."
    commit: "85d4f4dc814843404e5e4078426bd0945f46cb29"
doc_version: 3
doc_updated_at: "2026-08-26T20:47:36.615Z"
doc_updated_by: "SUPERVISOR"
description: "Release blocker for 0.7.8. Symptom: required release:prepublish fails in run-cli.core.blueprint.test.ts because task new returns E_IO exit 4. Violated invariant: release fixtures exercising task creation must be valid Git repositories. Root cause: mkProject() creates an empty .git directory while the canonical task-create path now runs git worktree list --porcelain. Recovery: keep the 0.7.8 release Task blocked and clean. Permanent fix: initialize the fixture with git init using the existing test Git helper or an equivalent isolated command. Regression: both blueprint snapshot and drift tests pass in a clean exact-main checkout and the focused suite remains green."
sections:
  Summary: |-
    Initialize blueprint test projects as real Git repositories for release CI

    Release blocker for 0.7.8. Symptom: required release:prepublish fails in run-cli.core.blueprint.test.ts because task new returns E_IO exit 4. Violated invariant: release fixtures exercising task creation must be valid Git repositories. Root cause: mkProject() creates an empty .git directory while the canonical task-create path now runs git worktree list --porcelain. Recovery: keep the 0.7.8 release Task blocked and clean. Permanent fix: initialize the fixture with git init using the existing test Git helper or an equivalent isolated command. Regression: both blueprint snapshot and drift tests pass in a clean exact-main checkout and the focused suite remains green.
  Scope: |-
    - In scope: Release blocker for 0.7.8. Symptom: required release:prepublish fails in run-cli.core.blueprint.test.ts because task new returns E_IO exit 4. Violated invariant: release fixtures exercising task creation must be valid Git repositories. Root cause: mkProject() creates an empty .git directory while the canonical task-create path now runs git worktree list --porcelain. Recovery: keep the 0.7.8 release Task blocked and clean. Permanent fix: initialize the fixture with git init using the existing test Git helper or an equivalent isolated command. Regression: both blueprint snapshot and drift tests pass in a clean exact-main checkout and the focused suite remains green.
    - Out of scope: unrelated refactors not required for "Initialize blueprint test projects as real Git repositories for release CI".
  Plan: "Repair the release-blocking blueprint test fixture by initializing each temporary project as a real Git repository, while preserving the existing blueprint snapshot and drift assertions and changing no production runtime code."
  Verify Steps: |-
    PLANNER fallback scaffold for "Initialize blueprint test projects as real Git repositories for release CI". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Initialize blueprint test projects as real Git repositories for release CI". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  agentplane.execution_grant:
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:469f305e3965104a4b9f4e30f72e793f7b92c7a93b9ddec7bdfab681c7867a1e"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:4e0d8635bf8f254260ae36c8ffc5ae169ccd9b66c23f454461bfb40b30180921"
    digest: "sha256:d39a760f75e9271b16b88aab872664b7b5b113360fb6fd609360c571d3c9d982"
    grant_id: "57b19952-98ac-495c-89dc-b5afd19b6af4"
    issued_at: "2026-08-26T20:45:55.317Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:ede89956fa13a720090aa8c5af2d5b47f6d1f3f6c63387d9dcccd6292e8f924a"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:c17de352f95698523be644b6e7e11ed934a59d7f9491aff92426d1386c53aabd"
    status: "active"
    task_id: "202608262034-QVVB66"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-26T20:45:55.317Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:488af2d295d43ab4e862ba6fa38b4c153f1039cce8095570697b1141310e72d9"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-08-26T20:43:34.987Z"
      digest: "sha256:488af2d295d43ab4e862ba6fa38b4c153f1039cce8095570697b1141310e72d9"
      proposal:
        assumptions:
          - "The existing test environment provides git on PATH, as required by the production task-create path and the release gates."
        planning_baseline:
          captured_at: "2026-08-26T20:42:11.869Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:950978c5e79ab5fe87c25cd7c3b9ea543d1e92c64fd93eac0b4f9283b4c358f8"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608241434-129F8R/README.md"
            - ".agentplane/tasks/202608241434-EH8E74/README.md"
            - ".agentplane/tasks/202608241434-KCC9K4/README.md"
            - ".agentplane/tasks/202608241434-QQNDGT/README.md"
            - ".agentplane/tasks/202608241434-SFPD91/README.md"
            - ".agentplane/tasks/202608241434-TA84WK/README.md"
            - ".agentplane/tasks/202608241434-WVYA5T/README.md"
            - ".agentplane/tasks/202608241435-40YZCE/README.md"
            - ".agentplane/tasks/202608241435-73DA89/README.md"
            - ".agentplane/tasks/202608241435-D001ET/README.md"
            - ".agentplane/tasks/202608241435-HTV4K2/README.md"
            - ".agentplane/tasks/202608241435-NDR0BX/README.md"
            - ".agentplane/tasks/202608241435-RJXGHQ/README.md"
            - ".agentplane/tasks/202608241435-W3DG6V/README.md"
            - ".agentplane/tasks/202608241435-YSW0E0/README.md"
            - ".agentplane/tasks/202608241436-2G9DA8/README.md"
            - ".agentplane/tasks/202608241436-63W678/README.md"
            - ".agentplane/tasks/202608241436-8PJKJP/README.md"
            - ".agentplane/tasks/202608241436-99B067/README.md"
            - ".agentplane/tasks/202608241436-A87Y59/README.md"
            - ".agentplane/tasks/202608241436-DHPR5E/README.md"
            - ".agentplane/tasks/202608241436-H60MCY/README.md"
            - ".agentplane/tasks/202608241436-TX6TRF/README.md"
            - ".agentplane/tasks/202608241436-W6A113/README.md"
            - ".agentplane/tasks/202608241437-5YZ0N8/README.md"
            - ".agentplane/tasks/202608241437-H5418M/README.md"
            - ".agentplane/tasks/202608241437-SH3CDX/README.md"
            - ".agentplane/tasks/202608241437-V8BA7Q/README.md"
            - ".agentplane/tasks/202608241437-XY3950/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608251038-42AC0D/README.md"
            - ".agentplane/tasks/202608251053-QAZ236/README.md"
            - ".agentplane/tasks/202608251706-V287W1/README.md"
            - ".agentplane/tasks/202608251735-ZJ7YZE/README.md"
            - ".agentplane/tasks/202608252233-JR4T47/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608262032-MAJQ5E/README.md"
            - ".agentplane/tasks/202608262034-QVVB66/README.md"
            - ".agentplane/tasks/202608262038-A53KD8/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "c5626485f2bb9097d3cb6f34ef32f26cdd95c940"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608262034-QVVB66"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
              id: "check-blueprint-suite"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
          criteria:
            -
              check_ids:
                - "check-blueprint-suite"
              description: "mkProject initializes a valid isolated Git repository before task new executes, without changing production runtime behavior."
              id: "criterion-real-git-fixture"
              required: true
            -
              check_ids:
                - "check-blueprint-suite"
              description: "Both blueprint snapshot and blueprint drift tests pass on the exact implementation."
              id: "criterion-blueprint-regressions"
              required: true
          evidence_fingerprint: "sha256:161bed23bfb708d922ffd54d116c2545401bc1bb05a276ca6df72a0ea7c0e56d"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-blueprint-suite"
                  description: "mkProject initializes a valid isolated Git repository before task new executes, without changing production runtime behavior."
                  id: "criterion-real-git-fixture"
                  required: true
                -
                  check_ids:
                    - "check-blueprint-suite"
                  description: "Both blueprint snapshot and blueprint drift tests pass on the exact implementation."
                  id: "criterion-blueprint-regressions"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 131072
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
                symbol_hints:
                  - "mkProject"
              depends_on: []
              expected_outputs:
                - "real-git-blueprint-fixture"
                - "passing-blueprint-snapshot-and-drift-regression"
              id: "repair-blueprint-git-fixture"
              objective: "Replace the empty .git directory fixture with a real isolated Git repository initialization and preserve the existing blueprint snapshot and drift behavior."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
                    id: "check-blueprint-suite"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "check-blueprint-suite"
                    description: "mkProject initializes a valid isolated Git repository before task new executes, without changing production runtime behavior."
                    id: "criterion-real-git-fixture"
                    required: true
                  -
                    check_ids:
                      - "check-blueprint-suite"
                    description: "Both blueprint snapshot and blueprint drift tests pass on the exact implementation."
                    id: "criterion-blueprint-regressions"
                    required: true
                evidence_fingerprint: "sha256:161bed23bfb708d922ffd54d116c2545401bc1bb05a276ca6df72a0ea7c0e56d"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608262034-QVVB66"
    event_cursor: 0
    final_validation: null
    id: "202608262034-QVVB66"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bunx vitest run packages/agentplane/src/cli/run-cli.core.blueprint.test.ts"
          id: "legacy-1"
          required: true
      captured_at: "2026-08-26T20:34:17.386Z"
      constraints: []
      request: |-
        Initialize blueprint test projects as real Git repositories for release CI

        Release blocker for 0.7.8. Symptom: required release:prepublish fails in run-cli.core.blueprint.test.ts because task new returns E_IO exit 4. Violated invariant: release fixtures exercising task creation must be valid Git repositories. Root cause: mkProject() creates an empty .git directory while the canonical task-create path now runs git worktree list --porcelain. Recovery: keep the 0.7.8 release Task blocked and clean. Permanent fix: initialize the fixture with git init using the existing test Git helper or an equivalent isolated command. Regression: both blueprint snapshot and drift tests pass in a clean exact-main checkout and the focused suite remains green.
      task_id: "202608262034-QVVB66"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-26T20:45:55.317Z"
    work_items:
      repair-blueprint-git-fixture:
        attempt: 0
        claim_id: null
        id: "repair-blueprint-git-fixture"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  implementation_commit:
    hash: "85d4f4dc814843404e5e4078426bd0945f46cb29"
  task_execution_context:
    base_ref: "main"
    base_sha: "c5626485f2bb9097d3cb6f34ef32f26cdd95c940"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "c5626485f2bb9097d3cb6f34ef32f26cdd95c940"
    version: 1
id_source: "generated"
---
## Summary

Initialize blueprint test projects as real Git repositories for release CI

Release blocker for 0.7.8. Symptom: required release:prepublish fails in run-cli.core.blueprint.test.ts because task new returns E_IO exit 4. Violated invariant: release fixtures exercising task creation must be valid Git repositories. Root cause: mkProject() creates an empty .git directory while the canonical task-create path now runs git worktree list --porcelain. Recovery: keep the 0.7.8 release Task blocked and clean. Permanent fix: initialize the fixture with git init using the existing test Git helper or an equivalent isolated command. Regression: both blueprint snapshot and drift tests pass in a clean exact-main checkout and the focused suite remains green.

## Scope

- In scope: Release blocker for 0.7.8. Symptom: required release:prepublish fails in run-cli.core.blueprint.test.ts because task new returns E_IO exit 4. Violated invariant: release fixtures exercising task creation must be valid Git repositories. Root cause: mkProject() creates an empty .git directory while the canonical task-create path now runs git worktree list --porcelain. Recovery: keep the 0.7.8 release Task blocked and clean. Permanent fix: initialize the fixture with git init using the existing test Git helper or an equivalent isolated command. Regression: both blueprint snapshot and drift tests pass in a clean exact-main checkout and the focused suite remains green.
- Out of scope: unrelated refactors not required for "Initialize blueprint test projects as real Git repositories for release CI".

## Plan

Repair the release-blocking blueprint test fixture by initializing each temporary project as a real Git repository, while preserving the existing blueprint snapshot and drift assertions and changing no production runtime code.

## Verify Steps

PLANNER fallback scaffold for "Initialize blueprint test projects as real Git repositories for release CI". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Initialize blueprint test projects as real Git repositories for release CI". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
