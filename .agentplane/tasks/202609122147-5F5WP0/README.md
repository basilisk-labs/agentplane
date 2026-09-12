---
id: "202609122147-5F5WP0"
title: "Make AgentPlane-managed GitLab MRs remove source branches"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "gitlab"
  - "branch-cleanup"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
  - "publish"
  - "merge"
  - "external_system"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-12T21:52:27.159Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:37fe89ffb0e72678f2e060b423ab154ea68947e2165e389322e495c7cbce6f1c"
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
    - "effect_publish"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Completion requires a hosted pull request and merge as explicitly requested by the user."
      - "The repository enforces branch_pr for source changes."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
      - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_publish"
    - "repository_branch_pr_floor"
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
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:bca135e5f844463a36f9f8274f62458cdb697a49aa9dffbcaa1664884ce7cdd5"
      escalation_reasons:
        - "external_effect_requires_real_e2e"
      execution_groups:
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
          - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: false
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "13160b3a8f6a7dd6817a65cdf476b7386583aca7"
  message: "🚧 5F5WP0 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 13160b3a8f6a. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-12T21:52:47.618Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-12T21:57:06.826Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 13160b3a8f6a. CLI accepted one state-bound external-agent semantic result."
    commit: "13160b3a8f6a7dd6817a65cdf476b7386583aca7"
doc_version: 3
doc_updated_at: "2026-09-12T21:57:06.826Z"
doc_updated_by: "SUPERVISOR"
description: "Make AgentPlane-managed GitLab MRs remove source branches"
sections:
  Summary: |-
    Make AgentPlane-managed GitLab MRs remove source branches

    Make AgentPlane-managed GitLab MRs remove source branches
  Scope: |-
    - In scope: Make AgentPlane-managed GitLab MRs remove source branches.
    - Out of scope: unrelated refactors not required for "Make AgentPlane-managed GitLab MRs remove source branches".
  Plan: "Plan a bounded GitLab MR synchronization fix so AgentPlane requests source-branch deletion on create and reconciles existing open MRs on update, with focused tests and full hosted integration."
  Verify Steps: |-
    PLANNER fallback scaffold for "Make AgentPlane-managed GitLab MRs remove source branches". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Make AgentPlane-managed GitLab MRs remove source branches". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    approval_evidence_digest: "sha256:37fe89ffb0e72678f2e060b423ab154ea68947e2165e389322e495c7cbce6f1c"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:b9eaeac7033be10bb721789bdbe6a23886f2121be12204242ea45581891815c0"
    digest: "sha256:da54fe287461717a7e72399c499c95569239ad3784566c30e7b73be48efef803"
    grant_id: "7889437b-7f0e-44a4-9341-67e082f02058"
    issued_at: "2026-09-12T21:52:27.159Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:6128a9e678348313967135b370e89f5626d17f98d7f7105d8160c4331ae5a69a"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:e8260956bd87211c982480bc6f462b32f217dd11573c630f5175ab1402316d5c"
    status: "active"
    task_id: "202609122147-5F5WP0"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-12T21:52:27.159Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:a5787118704719d11d2c8e2c212ae6ea6c2ee76015e896bae3a13c69d6165d3b"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-12T21:51:54.430Z"
      digest: "sha256:a5787118704719d11d2c8e2c212ae6ea6c2ee76015e896bae3a13c69d6165d3b"
      proposal:
        assumptions:
          - "GitLab honors remove_source_branch on MR create and update through its API."
        planning_baseline:
          captured_at: "2026-09-12T21:47:48.343Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:89da613591286d6f05da7ddf9f9ddd8498b507bb26a6f91e2f92bd555f9c842a"
          dirty_paths:
            - ".agentplane/tasks/202609122147-5F5WP0/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "58048a4e1ff97030d3fa86447c739397f0e0936b"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609122147-5F5WP0"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run ci:local"
              id: "local-ci"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              id: "hosted-integration"
              kind: "provider"
              required: true
          criteria:
            -
              check_ids:
                - "local-ci"
              description: "Full local CI passes after focused checks."
              id: "local-regression"
              required: true
            -
              check_ids:
                - "hosted-integration"
              description: "Hosted checks pass and the pull request is merged."
              id: "hosted-merge"
              required: true
          evidence_fingerprint: "sha256:aa578cd0d328d5d862cd8b24de389a94ebbe492eb35a2f7cef0343360112e5ba"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused-tests"
                  description: "GitLab MR creation requests remove_source_branch=true for fork and same-project MRs."
                  id: "create-default"
                  required: true
                -
                  check_ids:
                    - "focused-tests"
                  description: "GitLab MR update requests remove_source_branch=true to reconcile older open MRs."
                  id: "update-reconcile"
                  required: true
                -
                  check_ids:
                    - "typecheck"
                  description: "The source change passes repository TypeScript checks."
                  id: "typed"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources:
                  - "packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.ts"
                required_sources:
                  - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
                  - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
                symbol_hints:
                  - "tryCreateGitLabMr"
                  - "tryUpdateGitLabMr"
                  - "withJsonPayload"
              depends_on: []
              expected_outputs:
                - "Updated GitLab MR payload behavior"
                - "Regression tests for create and update payloads"
              id: "gitlab-remove-source-branch"
              objective: "Add remove_source_branch=true to GitLab MR create and update payloads and cover both fork and same-project behavior with exact payload assertions."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
                - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts packages/agentplane/src/commands/pr/integrate/internal/gitlab-mr-merge.test.ts"
                    id: "focused-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "focused-tests"
                    description: "Focused tests verify create payloads for fork and same-project MRs."
                    id: "create-default"
                    required: true
                  -
                    check_ids:
                      - "focused-tests"
                    description: "Focused tests verify the update reconciliation payload."
                    id: "update-reconcile"
                    required: true
                  -
                    check_ids:
                      - "typecheck"
                    description: "TypeScript build passes."
                    id: "typed"
                    required: true
                evidence_fingerprint: "sha256:20fcbdd6730a748562cc59ac2fa51c563f7a2b9e2525410f727a6033709459f5"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609122147-5F5WP0"
    event_cursor: 4
    final_validation: null
    id: "202609122147-5F5WP0"
    intent:
      acceptance_criteria: []
      captured_at: "2026-09-12T21:47:41.237Z"
      constraints: []
      request: |-
        Make AgentPlane-managed GitLab MRs remove source branches

        Make AgentPlane-managed GitLab MRs remove source branches
      task_id: "202609122147-5F5WP0"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 6
    schema_version: 1
    updated_at: "2026-09-12T21:57:06.826Z"
    work_items:
      gitlab-remove-source-branch:
        attempt: 0
        claim_id: null
        id: "gitlab-remove-source-branch"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events: []
    leases: []
    mutation_receipts:
      compatibility:sha256:2a86a1a96a4eeb0ab65523090734a34fba72ab2429c1af3a86fc6a7604109896:
        aggregate_digest: "sha256:8f83df5580bf0468da95d62e7c9989df2d1d856b81f6b6b2a43827a259f1732e"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T21:57:06.826Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_bdb33199a00aabae8a6556ac"
          mutation_id: "compatibility:sha256:2a86a1a96a4eeb0ab65523090734a34fba72ab2429c1af3a86fc6a7604109896"
          plan_digest: "sha256:a5787118704719d11d2c8e2c212ae6ea6c2ee76015e896bae3a13c69d6165d3b"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609122147-5F5WP0"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2a86a1a96a4eeb0ab65523090734a34fba72ab2429c1af3a86fc6a7604109896"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609122147-5F5WP0"
      compatibility:sha256:323c1029b73fc441a3bc93c34a9dd34564b8c9c0eaecfe3b664ad9e63310e03f:
        aggregate_digest: "sha256:53f1cbf054d47dc382b788802dd3ea314f6154218b8c51fec24eddd965f3a9ab"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T21:51:54.550Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_d2f29a461a8790c42cc11b05"
          mutation_id: "compatibility:sha256:323c1029b73fc441a3bc93c34a9dd34564b8c9c0eaecfe3b664ad9e63310e03f"
          plan_digest: "sha256:a5787118704719d11d2c8e2c212ae6ea6c2ee76015e896bae3a13c69d6165d3b"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609122147-5F5WP0"
          task_revision: 2
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:323c1029b73fc441a3bc93c34a9dd34564b8c9c0eaecfe3b664ad9e63310e03f"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609122147-5F5WP0"
      compatibility:sha256:3aee2fae046ab4ce018ae11908212ebe93709d1a88d7fc8217ef4915ac75184a:
        aggregate_digest: "sha256:1e7a0b2ae05ea9808f857f30e5a190a5b355cee3b230a93570570f0440fc7374"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T21:57:06.826Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_41ebb376ac719dacfb6ba2ef"
          mutation_id: "compatibility:sha256:3aee2fae046ab4ce018ae11908212ebe93709d1a88d7fc8217ef4915ac75184a"
          plan_digest: "sha256:a5787118704719d11d2c8e2c212ae6ea6c2ee76015e896bae3a13c69d6165d3b"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609122147-5F5WP0"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3aee2fae046ab4ce018ae11908212ebe93709d1a88d7fc8217ef4915ac75184a"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609122147-5F5WP0"
      compatibility:sha256:bff552d7f1e47b343adc98cca07bb6457daaccb47a97b82d3bf0ceebeaf75787:
        aggregate_digest: "sha256:e374b715d0cd841ef5c5db520eded433afa4822e7d132c02cb37348ee5e00007"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T21:52:47.618Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_82613dc3003b7a876f1d7298"
          mutation_id: "compatibility:sha256:bff552d7f1e47b343adc98cca07bb6457daaccb47a97b82d3bf0ceebeaf75787"
          plan_digest: "sha256:a5787118704719d11d2c8e2c212ae6ea6c2ee76015e896bae3a13c69d6165d3b"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609122147-5F5WP0"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:bff552d7f1e47b343adc98cca07bb6457daaccb47a97b82d3bf0ceebeaf75787"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609122147-5F5WP0"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "13160b3a8f6a7dd6817a65cdf476b7386583aca7"
  task_execution_context:
    base_ref: "main"
    base_sha: "58048a4e1ff97030d3fa86447c739397f0e0936b"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "58048a4e1ff97030d3fa86447c739397f0e0936b"
    version: 1
id_source: "generated"
---
## Summary

Make AgentPlane-managed GitLab MRs remove source branches

Make AgentPlane-managed GitLab MRs remove source branches

## Scope

- In scope: Make AgentPlane-managed GitLab MRs remove source branches.
- Out of scope: unrelated refactors not required for "Make AgentPlane-managed GitLab MRs remove source branches".

## Plan

Plan a bounded GitLab MR synchronization fix so AgentPlane requests source-branch deletion on create and reconciles existing open MRs on update, with focused tests and full hosted integration.

## Verify Steps

PLANNER fallback scaffold for "Make AgentPlane-managed GitLab MRs remove source branches". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Make AgentPlane-managed GitLab MRs remove source branches". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
