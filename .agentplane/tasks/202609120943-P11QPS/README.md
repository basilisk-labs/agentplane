---
id: "202609120943-P11QPS"
title: "Create the AgentPlane 0.7.9 and 0.7.10 architecture improvement roadmap"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
task_kind: "docs"
mutation_scope: "docs"
verify:
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-12T09:58:49.406Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:2fdbdb599aaf3822cc490aa79da481aaa08c285a6e820f5600923a52186afeb5"
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
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "repository_write"
    forbidden_external_effects:
      - "network_read"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "docs/internal/v0.7.9-v0.7.10-architecture-roadmap.md"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A pull request keeps the roadmap reviewable without changing runtime behavior."
      - "The requested artifact is one new internal architecture roadmap document."
    repository_effects:
      - "documentation"
      - "repository_write"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "docs/internal/v0.7.9-v0.7.10-architecture-roadmap.md"
  observed:
    authority_violations: []
    changed_components:
      - "docs"
    changed_paths:
      - "docs/internal/v0.7.9-v0.7.10-architecture-roadmap.md"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
    verification_results: []
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "docs/internal/v0.7.9-v0.7.10-architecture-roadmap.md"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:f32ac2081a48d9707c4d23f9e2c374325aedecbd7b8fd0e591ddfa125b65691b"
      escalation_reasons: []
      execution_groups:
        - "docs-schema"
        - "core"
      observed:
        changed_components:
          - "docs"
        changed_files:
          - "docs/internal/v0.7.9-v0.7.10-architecture-roadmap.md"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "task_outcome"
commit:
  hash: "9801378b67064bbcf70222607e32d7ba7d773bd8"
  message: "🚧 P11QPS task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 9801378b6706. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-12T10:00:36.409Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-12T10:10:12.453Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 9801378b6706. CLI accepted one state-bound external-agent semantic result."
    commit: "9801378b67064bbcf70222607e32d7ba7d773bd8"
doc_version: 3
doc_updated_at: "2026-09-12T10:10:12.453Z"
doc_updated_by: "SUPERVISOR"
description: "Recheck the three supplied architecture proposals against current main and write a standalone English roadmap document. Split implementation into atomic GitHub PR groups and assign each group to AgentPlane 0.7.9 or 0.7.10."
sections:
  Summary: |-
    Create the AgentPlane 0.7.9 and 0.7.10 architecture improvement roadmap

    Recheck the three supplied architecture proposals against current main and write a standalone English roadmap document. Split implementation into atomic GitHub PR groups and assign each group to AgentPlane 0.7.9 or 0.7.10.
  Scope: |-
    - In scope: Recheck the three supplied architecture proposals against current main and write a standalone English roadmap document. Split implementation into atomic GitHub PR groups and assign each group to AgentPlane 0.7.9 or 0.7.10.
    - Out of scope: unrelated refactors not required for "Create the AgentPlane 0.7.9 and 0.7.10 architecture improvement roadmap".
  Plan: "Plan one standalone, source-grounded roadmap document for the 0.7.9 stabilization release and the 0.7.10 architecture release."
  Verify Steps: |-
    1. Run `bunx prettier --check docs/internal/v0.7.9-v0.7.10-architecture-roadmap.md`. Expected: the roadmap document is formatted.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing passes.
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
    approval_evidence_digest: "sha256:2fdbdb599aaf3822cc490aa79da481aaa08c285a6e820f5600923a52186afeb5"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:c16041dd9831e70f058eeaeeb9714afed884dbcb938e6734a0ee0f781506a2bf"
    digest: "sha256:b33e01b85f2b6ab581f0424b091c959fa5e25d4540ee17666af4b2be57fa1432"
    grant_id: "52336ba8-8270-4f31-81ca-27976228fc9a"
    issued_at: "2026-09-12T09:58:49.406Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:0e28625532c49798d7c4f252ff3557a4b177fab955fd4cfc81dbc22a263b6e7f"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:cb7685d3adca039a80ab47777b617bbe0f2f4eb9f1783679bd96c9955a6470a7"
    status: "active"
    task_id: "202609120943-P11QPS"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-12T09:58:49.406Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:c04a3fd013c722ee840ae8588d230787fb244c40e180a5c82dd9b01c6f699ed5"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-12T09:46:53.878Z"
      digest: "sha256:c04a3fd013c722ee840ae8588d230787fb244c40e180a5c82dd9b01c6f699ed5"
      proposal:
        assumptions:
          - "The 0.7.10 release may introduce versioned contracts and explicit migration while remaining within the stabilized 0.7 product line."
          - "The source documents are design inputs and do not override repository policy or current implementation evidence."
        planning_baseline:
          captured_at: "2026-09-12T09:44:02.611Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:eee81ba7d2868c4326e71cd533e31895f430e945793d6be95b084425e56c5624"
          dirty_paths:
            - ".agentplane/tasks/202609111341-FK9C2T/README.md"
            - ".agentplane/tasks/202609111341-SED9K5/README.md"
            - ".agentplane/tasks/202609111502-4XSWZQ/README.md"
            - ".agentplane/tasks/202609120943-P11QPS/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "50b1810dda648be0c0762b47e885c6ad0b2d42af"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609120943-P11QPS"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx prettier --check docs/internal/v0.7.9-v0.7.10-architecture-roadmap.md"
              id: "format-check"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "node .agentplane/policy/check-routing.mjs"
              id: "routing-check"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
          criteria:
            -
              check_ids:
                - "format-check"
              description: "The document assigns only compatible stabilization, parity, observability, and preparation work to 0.7.9. It assigns new lifecycle semantics, Scenario V2, Blueprint migration, and subsystem removal to 0.7.10."
              id: "release-boundary"
              required: true
            -
              check_ids:
                - "format-check"
              description: "Every roadmap group represents one GitHub pull request and contains bounded atomic tasks, dependencies, acceptance criteria, and a release assignment."
              id: "atomic-pr-groups"
              required: true
            -
              check_ids:
                - "format-check"
              description: "The document distinguishes implemented behavior from proposals and records current-main evidence and unresolved companion-artifact limitations."
              id: "current-source-grounding"
              required: true
            -
              check_ids:
                - "format-check"
                - "routing-check"
              description: "The new Markdown document is formatted and the repository policy routing check passes."
              id: "repository-conformance"
              required: true
          evidence_fingerprint: "sha256:eee81ba7d2868c4326e71cd533e31895f430e945793d6be95b084425e56c5624"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "format-check"
                  description: "The document assigns only compatible stabilization, parity, observability, and preparation work to 0.7.9. It assigns new lifecycle semantics, Scenario V2, Blueprint migration, and subsystem removal to 0.7.10."
                  id: "release-boundary"
                  required: true
                -
                  check_ids:
                    - "format-check"
                  description: "Every roadmap group represents one GitHub pull request and contains bounded atomic tasks, dependencies, acceptance criteria, and a release assignment."
                  id: "atomic-pr-groups"
                  required: true
                -
                  check_ids:
                    - "format-check"
                  description: "The document distinguishes implemented behavior from proposals and records current-main evidence and unresolved companion-artifact limitations."
                  id: "current-source-grounding"
                  required: true
                -
                  check_ids:
                    - "format-check"
                    - "routing-check"
                  description: "The new Markdown document is formatted and the repository policy routing check passes."
                  id: "repository-conformance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 240000
                optional_sources:
                  - "docs/internal/v0.7-agent-efficiency-baseline.md"
                  - "docs/developer/verification-contract.mdx"
                  - "docs/developer/task-execution-authority.mdx"
                required_sources:
                  - "docs/internal/v0.7-refactor-plan.md"
                  - "docs/developer/architecture.mdx"
                  - "docs/developer/blueprints.mdx"
                  - "docs/developer/recipes-spec.mdx"
                  - "packages/recipes/src/scenario-contracts.ts"
                  - "packages/core/src/tasks/kernel-semantic.ts"
                  - "packages/agentplane/src/commands/task/kernel-inspection.ts"
                  - "packages/agentplane/src/commands/task/create.command.ts"
                  - "packages/agentplane/src/commands/task/run.command.ts"
                symbol_hints:
                  - "ScenarioDefinition"
                  - "kernelWorkContractSchema"
                  - "acceptKernelInspection"
                  - "TASK_KERNEL_EXTENSION"
              depends_on: []
              expected_outputs:
                - "verified-versioned-architecture-roadmap"
              id: "write-versioned-architecture-roadmap"
              objective: "Recheck the supplied architecture proposals against current main. Write one standalone English roadmap document. Separate the work into 0.7.9 stabilization and 0.7.10 architecture delivery. Define one atomic GitHub pull request per roadmap group. Include dependencies, acceptance criteria, migration gates, and explicit non-goals. Run the declared deterministic checks."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/internal/v0.7.9-v0.7.10-architecture-roadmap.md"
              risk: "low"
              scope_roots:
                - "docs/internal/v0.7.9-v0.7.10-architecture-roadmap.md"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx prettier --check docs/internal/v0.7.9-v0.7.10-architecture-roadmap.md"
                    id: "format-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "node .agentplane/policy/check-routing.mjs"
                    id: "routing-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "format-check"
                    description: "The document assigns only compatible stabilization, parity, observability, and preparation work to 0.7.9. It assigns new lifecycle semantics, Scenario V2, Blueprint migration, and subsystem removal to 0.7.10."
                    id: "release-boundary"
                    required: true
                  -
                    check_ids:
                      - "format-check"
                    description: "Every roadmap group represents one GitHub pull request and contains bounded atomic tasks, dependencies, acceptance criteria, and a release assignment."
                    id: "atomic-pr-groups"
                    required: true
                  -
                    check_ids:
                      - "format-check"
                    description: "The document distinguishes implemented behavior from proposals and records current-main evidence and unresolved companion-artifact limitations."
                    id: "current-source-grounding"
                    required: true
                  -
                    check_ids:
                      - "format-check"
                      - "routing-check"
                    description: "The new Markdown document is formatted and the repository policy routing check passes."
                    id: "repository-conformance"
                    required: true
                evidence_fingerprint: "sha256:eee81ba7d2868c4326e71cd533e31895f430e945793d6be95b084425e56c5624"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609120943-P11QPS"
    event_cursor: 5
    final_validation: null
    id: "202609120943-P11QPS"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "node .agentplane/policy/check-routing.mjs"
          id: "legacy-1"
          required: true
      captured_at: "2026-09-12T09:43:53.147Z"
      constraints: []
      request: |-
        Create the AgentPlane 0.7.9 and 0.7.10 architecture improvement roadmap

        Recheck the three supplied architecture proposals against current main and write a standalone English roadmap document. Split implementation into atomic GitHub PR groups and assign each group to AgentPlane 0.7.9 or 0.7.10.
      task_id: "202609120943-P11QPS"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 7
    schema_version: 1
    updated_at: "2026-09-12T10:10:12.453Z"
    work_items:
      write-versioned-architecture-roadmap:
        attempt: 0
        claim_id: null
        id: "write-versioned-architecture-roadmap"
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
      compatibility:sha256:4d26893f3cb2c6f90090af471ef0b9072bbd79a354bcf6a8141d109b5994ec60:
        aggregate_digest: "sha256:feece7bc0ecc2a4cf4b733eddff8feecfb0d8e46852b96f8407bac113f7a104a"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T10:10:12.453Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_a4d319f55737b27adcd1e677"
          mutation_id: "compatibility:sha256:4d26893f3cb2c6f90090af471ef0b9072bbd79a354bcf6a8141d109b5994ec60"
          plan_digest: "sha256:c04a3fd013c722ee840ae8588d230787fb244c40e180a5c82dd9b01c6f699ed5"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609120943-P11QPS"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4d26893f3cb2c6f90090af471ef0b9072bbd79a354bcf6a8141d109b5994ec60"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609120943-P11QPS"
      compatibility:sha256:5cf4a113e37185dc1c1dc1f10c538425a9e2108eff7114d36bc497ba3b96d444:
        aggregate_digest: "sha256:bd5993941dee6cb6479db2afda719ffa46c46f7bb3394423660871c7c70fca44"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T09:57:35.758Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_f7c2b0b99a056e8321363ed0"
          mutation_id: "compatibility:sha256:5cf4a113e37185dc1c1dc1f10c538425a9e2108eff7114d36bc497ba3b96d444"
          plan_digest: "sha256:c04a3fd013c722ee840ae8588d230787fb244c40e180a5c82dd9b01c6f699ed5"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609120943-P11QPS"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:5cf4a113e37185dc1c1dc1f10c538425a9e2108eff7114d36bc497ba3b96d444"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609120943-P11QPS"
      compatibility:sha256:944a4be4b98f901498d5de07542660495c34dfe4f08de4dd8c2df948f5eccfdc:
        aggregate_digest: "sha256:4e32e4956ac35e242bca23f582971ba8e634eb3280e80affc1578ce0ca6b2125"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T09:57:35.761Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_e5f2f29e565e6d79a9f7150b"
          mutation_id: "compatibility:sha256:944a4be4b98f901498d5de07542660495c34dfe4f08de4dd8c2df948f5eccfdc"
          plan_digest: "sha256:c04a3fd013c722ee840ae8588d230787fb244c40e180a5c82dd9b01c6f699ed5"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609120943-P11QPS"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:944a4be4b98f901498d5de07542660495c34dfe4f08de4dd8c2df948f5eccfdc"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609120943-P11QPS"
      compatibility:sha256:da39a148e8940879c5025bfc28782d847f01d5348c26dd79c1446b1d438064ca:
        aggregate_digest: "sha256:0e2b0dafaa613125b8920f263a52c81d30fe1534c63c077d86942de0ecd0bab7"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T10:00:36.409Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_672a32fb751f9796c77e142b"
          mutation_id: "compatibility:sha256:da39a148e8940879c5025bfc28782d847f01d5348c26dd79c1446b1d438064ca"
          plan_digest: "sha256:c04a3fd013c722ee840ae8588d230787fb244c40e180a5c82dd9b01c6f699ed5"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609120943-P11QPS"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:da39a148e8940879c5025bfc28782d847f01d5348c26dd79c1446b1d438064ca"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609120943-P11QPS"
      compatibility:sha256:e7a2d51c6ba106f8c23479d4dae67f3fdb541a1e6f67a85f7f3546ecf03a4a67:
        aggregate_digest: "sha256:9bd6db3037c40f7946ab5b9910637e137209cab4f1ca7d8017d1df107976d976"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T10:10:12.453Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4c40bdeb07f41e7dfaee35e4"
          mutation_id: "compatibility:sha256:e7a2d51c6ba106f8c23479d4dae67f3fdb541a1e6f67a85f7f3546ecf03a4a67"
          plan_digest: "sha256:c04a3fd013c722ee840ae8588d230787fb244c40e180a5c82dd9b01c6f699ed5"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609120943-P11QPS"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e7a2d51c6ba106f8c23479d4dae67f3fdb541a1e6f67a85f7f3546ecf03a4a67"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609120943-P11QPS"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "9801378b67064bbcf70222607e32d7ba7d773bd8"
  task_execution_context:
    base_ref: "main"
    base_sha: "50b1810dda648be0c0762b47e885c6ad0b2d42af"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "50b1810dda648be0c0762b47e885c6ad0b2d42af"
    version: 1
id_source: "generated"
---
## Summary

Create the AgentPlane 0.7.9 and 0.7.10 architecture improvement roadmap

Recheck the three supplied architecture proposals against current main and write a standalone English roadmap document. Split implementation into atomic GitHub PR groups and assign each group to AgentPlane 0.7.9 or 0.7.10.

## Scope

- In scope: Recheck the three supplied architecture proposals against current main and write a standalone English roadmap document. Split implementation into atomic GitHub PR groups and assign each group to AgentPlane 0.7.9 or 0.7.10.
- Out of scope: unrelated refactors not required for "Create the AgentPlane 0.7.9 and 0.7.10 architecture improvement roadmap".

## Plan

Plan one standalone, source-grounded roadmap document for the 0.7.9 stabilization release and the 0.7.10 architecture release.

## Verify Steps

1. Run `bunx prettier --check docs/internal/v0.7.9-v0.7.10-architecture-roadmap.md`. Expected: the roadmap document is formatted.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
