---
id: "202609300631-62B02X"
title: "Implement semantic workflow selection and shared feature deliveries from ADR 0018"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "git diff --check"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
    - "effect_public_api"
    - "effect_schema"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    allowed_resources: []
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "docs"
      - "packages/agentplane/src"
      - "packages/core/schemas"
      - "packages/core/src"
      - "packages/spec/schemas"
      - "packages/testkit/src"
      - "schemas"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "docs"
      - "packages/agentplane/src"
      - "packages/core/schemas"
      - "packages/core/src"
      - "packages/spec/schemas"
      - "packages/testkit/src"
      - "schemas"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
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
          - "docs"
          - "packages/agentplane/src"
          - "packages/core/schemas"
          - "packages/core/src"
          - "packages/spec/schemas"
          - "packages/testkit/src"
          - "schemas"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "schema"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:4c85830f9499094a12ae4a449200b5f21c3d35514d934653cd21617f3d80abba"
      escalation_reasons:
        - "central_component:packages/core/schemas"
        - "central_component:packages/core/src"
        - "effect_public_api"
        - "effect_schema"
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
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-30T06:32:00.934Z"
doc_updated_by: "CODER"
description: "Implementation backlog for ADR 0018 and docs/developer/feature-deliveries.mdx. Fifteen atomic WorkItems DLV-01 through DLV-15 define enforced dependencies, bounded scopes, outputs, acceptance criteria and focused verification. Capture this supplied Plan only; do not start implementation or treat backlog creation as plan approval. Documentation task: 202609300615-DE9AE6. No release, deployment or provider mutation is authorized."
sections:
  Summary: |-
    Implement semantic workflow selection and shared feature deliveries from ADR 0018

    Implementation backlog for ADR 0018 and docs/developer/feature-deliveries.mdx. Fifteen atomic WorkItems DLV-01 through DLV-15 define enforced dependencies, bounded scopes, outputs, acceptance criteria and focused verification. Capture this supplied Plan only; do not start implementation or treat backlog creation as plan approval. Documentation task: 202609300615-DE9AE6. No release, deployment or provider mutation is authorized.
  Scope: |-
    - In scope: Implementation backlog for ADR 0018 and docs/developer/feature-deliveries.mdx. Fifteen atomic WorkItems DLV-01 through DLV-15 define enforced dependencies, bounded scopes, outputs, acceptance criteria and focused verification. Capture this supplied Plan only; do not start implementation or treat backlog creation as plan approval. Documentation task: 202609300615-DE9AE6. No release, deployment or provider mutation is authorized.
    - Out of scope: unrelated refactors not required for "Implement semantic workflow selection and shared feature deliveries from ADR 0018".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  task_execution_context:
    base_ref: "main"
    base_sha: "1053fee6f16c70a25154d54d4664ccfe609b5082"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      controller_transfer: null
      current_plan: null
      effects: []
      final_validation: null
      id: "202609300631-62B02X"
      intent_digest: "sha256:92e671bd3de583617335fc87c6c0fd6226f397e23011bb7e2f45f8415393e1b4"
      migration_receipts: []
      mutation_receipts:
        capture:202609300631-62B02X:
          after_revision: 1
          aggregate_digest: "sha256:446e2e64097fe8435d126d15f3ce6d3477ff44d6e857014d29e106f4847e2d66"
          before_revision: 0
          command_digest: "sha256:cf9faf752c09b9ab914129335c4ff7f69d52a90f42cab97f518668a2d08fbea1"
          effect_ids: []
          event_digests:
            - "sha256:108bd2f4c8ffae5e26b5e92078f2e4f0c8f3507ecd7fd241c4b27955f84315ee"
          mutation_id: "capture:202609300631-62B02X"
      plan_history: []
      revision: 1
      schema_version: 1
      state: "PLANNING"
      work_items: {}
    digest: "sha256:8c69811be38ed3d9718eae2013a994ea301b50245771e02fcd7ed546b715fda4"
    documents:
      contracts: {}
      intent:
        context: "Implementation backlog for ADR 0018 and docs/developer/feature-deliveries.mdx. Fifteen atomic WorkItems DLV-01 through DLV-15 define enforced dependencies, bounded scopes, outputs, acceptance criteria and focused verification. Capture this supplied Plan only; do not start implementation or treat backlog creation as plan approval. Documentation task: 202609300615-DE9AE6. No release, deployment or provider mutation is authorized."
        objective: "Implement semantic workflow selection and shared feature deliveries from ADR 0018"
        plan_input_digest: "sha256:bc250daa624549b1c2f876b7872f45640ca19006b9644da0165b769ca9e2088e"
      plan_inputs:
        sha256:bc250daa624549b1c2f876b7872f45640ca19006b9644da0165b769ca9e2088e:
          assumptions:
            - "Accepted target design is ADR 0018; runtime implementation has not started."
            - "Use the existing Task Kernel and coordinator; preserve ADR 0015 isolation and ADR 0016 serialized integration."
            - "Focused test paths in this plan are implementation deliverables, not tests claimed to exist today."
            - "No provider mutation, release, deployment or repository policy change is authorized by this backlog."
          planning_baseline:
            captured_at: "2026-09-30T06:31:54.212Z"
            config_digest: "sha256:7fbc5be9556f654e5105f21a9b0158a86656d1ee65604b462de404a3c360446f"
            context_digest: "sha256:31131ebe3ef84fb37e5ff585dd2908c163e444275ac709d7794684d9ba582365"
            digest: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
            dirty_paths: []
            git:
              kind: "commit"
              ref: null
              sha: "1053fee6f16c70a25154d54d4664ccfe609b5082"
            policy_digest: null
            schema_version: 1
            task_history_cursor: null
          schema_version: 1
          task_id: "202609300631-62B02X"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "review"
                kind: "semantic"
                required: true
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "diff-check"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "review"
                description: "The work item meets its bounded acceptance criteria and preserves existing unrelated lifecycle behavior."
                id: "bounded-result"
                required: true
            evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-01-tests"
                      - "review"
                    description: "Add versioned path-neutral Delivery identity, membership, route decision, candidate, state and receipt contracts using the existing schema source of truth."
                    id: "dlv-01-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-01-tests"
                      - "review"
                    description: "Pure transitions enforce OPEN, READY, INTEGRATING, INTEGRATED and RETIRED invariants without a second Task state machine."
                    id: "dlv-01-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-01-tests"
                      - "review"
                    description: "Reject invalid transitions and duplicate member identity; round-trip fixtures and deterministic replay pass."
                    id: "dlv-01-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on: []
                expected_outputs:
                  - "dlv-01-result"
                id: "DLV-01"
                objective: "Define the Delivery domain contract. Add versioned path-neutral Delivery identity, membership, route decision, candidate, state and receipt contracts using the existing schema source of truth. Pure transitions enforce OPEN, READY, INTEGRATING, INTEGRATED and RETIRED invariants without a second Task state machine. Reject invalid transitions and duplicate member identity; round-trip fixtures and deterministic replay pass. Add the focused regression suite at packages/core/src/tasks/delivery-contract.test.ts."
                optional: false
                priority: 99
                required_inputs: []
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/core/schemas"
                  - "packages/spec/schemas"
                  - "schemas"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project core packages/core/src/tasks/delivery-contract.test.ts"
                      id: "dlv-01-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-01-tests"
                        - "review"
                      description: "Add versioned path-neutral Delivery identity, membership, route decision, candidate, state and receipt contracts using the existing schema source of truth."
                      id: "dlv-01-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-01-tests"
                        - "review"
                      description: "Pure transitions enforce OPEN, READY, INTEGRATING, INTEGRATED and RETIRED invariants without a second Task state machine."
                      id: "dlv-01-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-01-tests"
                        - "review"
                      description: "Reject invalid transitions and duplicate member identity; round-trip fixtures and deterministic replay pass."
                      id: "dlv-01-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-02-tests"
                      - "review"
                    description: "Persist Delivery revisions and task bindings through existing backend transaction boundaries."
                    id: "dlv-02-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-02-tests"
                      - "review"
                    description: "Enforce unique active task membership and branch/workspace ownership with compare-and-swap."
                    id: "dlv-02-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-02-tests"
                      - "review"
                    description: "Concurrent bind attempts have one winner; retry and crash after persistence return the same receipt."
                    id: "dlv-02-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on:
                  - "DLV-01"
                expected_outputs:
                  - "dlv-02-result"
                id: "DLV-02"
                objective: "Persist delivery ownership atomically. Persist Delivery revisions and task bindings through existing backend transaction boundaries. Enforce unique active task membership and branch/workspace ownership with compare-and-swap. Concurrent bind attempts have one winner; retry and crash after persistence return the same receipt. Add the focused regression suite at packages/agentplane/src/commands/task/delivery-store.test.ts."
                optional: false
                priority: 98
                required_inputs:
                  - "dlv-01-result"
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/commands/task/delivery-store.test.ts"
                      id: "dlv-02-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-02-tests"
                        - "review"
                      description: "Persist Delivery revisions and task bindings through existing backend transaction boundaries."
                      id: "dlv-02-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-02-tests"
                        - "review"
                      description: "Enforce unique active task membership and branch/workspace ownership with compare-and-swap."
                      id: "dlv-02-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-02-tests"
                        - "review"
                      description: "Concurrent bind attempts have one winner; retry and crash after persistence return the same receipt."
                      id: "dlv-02-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-03-tests"
                      - "review"
                    description: "Accept mode preference, new/existing membership intent, explicit delivery ID, effects, uncertainty, reversibility and rationale."
                    id: "dlv-03-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-03-tests"
                      - "review"
                    description: "Keep the semantic proposal distinct from authority and from the final CLI route."
                    id: "dlv-03-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-03-tests"
                      - "review"
                    description: "Reject malformed proposals and unauthorized effects; retain compatible existing planner payloads through explicit version handling."
                    id: "dlv-03-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on:
                  - "DLV-01"
                expected_outputs:
                  - "dlv-03-result"
                id: "DLV-03"
                objective: "Admit semantic delivery proposals from planning. Accept mode preference, new/existing membership intent, explicit delivery ID, effects, uncertainty, reversibility and rationale. Keep the semantic proposal distinct from authority and from the final CLI route. Reject malformed proposals and unauthorized effects; retain compatible existing planner payloads through explicit version handling. Add the focused regression suite at packages/agentplane/src/commands/task/delivery-proposal.test.ts."
                optional: false
                priority: 97
                required_inputs:
                  - "dlv-01-result"
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/core/src/runner"
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/task"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/commands/task/delivery-proposal.test.ts"
                      id: "dlv-03-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-03-tests"
                        - "review"
                      description: "Accept mode preference, new/existing membership intent, explicit delivery ID, effects, uncertainty, reversibility and rationale."
                      id: "dlv-03-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-03-tests"
                        - "review"
                      description: "Keep the semantic proposal distinct from authority and from the final CLI route."
                      id: "dlv-03-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-03-tests"
                        - "review"
                      description: "Reject malformed proposals and unauthorized effects; retain compatible existing planner payloads through explicit version handling."
                      id: "dlv-03-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-04-tests"
                      - "review"
                    description: "Resolve explicit compatible membership before new allocation, then enforce repository floors and risk requirements."
                    id: "dlv-04-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-04-tests"
                      - "review"
                    description: "Persist proposal digest, policy version, selected delivery/mode, reasons and base identity before implementation."
                    id: "dlv-04-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-04-tests"
                      - "review"
                    description: "Table tests cover safe direct, forced PR, existing feature, invalid membership, unknown scope and deterministic retry; task size alone cannot lower a gate."
                    id: "dlv-04-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on:
                  - "DLV-02"
                  - "DLV-03"
                expected_outputs:
                  - "dlv-04-result"
                id: "DLV-04"
                objective: "Resolve and freeze policy-compatible delivery routes. Resolve explicit compatible membership before new allocation, then enforce repository floors and risk requirements. Persist proposal digest, policy version, selected delivery/mode, reasons and base identity before implementation. Table tests cover safe direct, forced PR, existing feature, invalid membership, unknown scope and deterministic retry; task size alone cannot lower a gate. Add the focused regression suite at packages/agentplane/src/runtime/task-routing/delivery-route.test.ts."
                optional: false
                priority: 96
                required_inputs:
                  - "dlv-02-result"
                  - "dlv-03-result"
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/runtime/task-routing"
                  - "packages/agentplane/src/commands/task"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/runtime/task-routing/delivery-route.test.ts"
                      id: "dlv-04-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-04-tests"
                        - "review"
                      description: "Resolve explicit compatible membership before new allocation, then enforce repository floors and risk requirements."
                      id: "dlv-04-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-04-tests"
                        - "review"
                      description: "Persist proposal digest, policy version, selected delivery/mode, reasons and base identity before implementation."
                      id: "dlv-04-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-04-tests"
                        - "review"
                      description: "Table tests cover safe direct, forced PR, existing feature, invalid membership, unknown scope and deterministic retry; task size alone cannot lower a gate."
                      id: "dlv-04-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-05-tests"
                      - "review"
                    description: "Create or join an OPEN delivery through typed commands; validate existing branch ownership and preserve its commits."
                    id: "dlv-05-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-05-tests"
                      - "review"
                    description: "Bind independent Tasks before execution; record immutable intake base and distinct delivery start head."
                    id: "dlv-05-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-05-tests"
                      - "review"
                    description: "Duplicate requests return the existing binding; incompatible targets and conflicting owners fail without creating another branch."
                    id: "dlv-05-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on:
                  - "DLV-02"
                  - "DLV-04"
                expected_outputs:
                  - "dlv-05-result"
                id: "DLV-05"
                objective: "Bind tasks and adopt explicitly selected feature branches. Create or join an OPEN delivery through typed commands; validate existing branch ownership and preserve its commits. Bind independent Tasks before execution; record immutable intake base and distinct delivery start head. Duplicate requests return the existing binding; incompatible targets and conflicting owners fail without creating another branch. Add the focused regression suite at packages/agentplane/src/commands/task/delivery-binding.test.ts."
                optional: false
                priority: 95
                required_inputs:
                  - "dlv-02-result"
                  - "dlv-04-result"
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/commands/task/delivery-binding.test.ts"
                      id: "dlv-05-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-05-tests"
                        - "review"
                      description: "Create or join an OPEN delivery through typed commands; validate existing branch ownership and preserve its commits."
                      id: "dlv-05-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-05-tests"
                        - "review"
                      description: "Bind independent Tasks before execution; record immutable intake base and distinct delivery start head."
                      id: "dlv-05-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-05-tests"
                        - "review"
                      description: "Duplicate requests return the existing binding; incompatible targets and conflicting owners fail without creating another branch."
                      id: "dlv-05-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-06-tests"
                      - "review"
                    description: "Allocate one worktree per shared delivery and resolve TODO membership before task-local worktree preparation."
                    id: "dlv-06-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-06-tests"
                      - "review"
                    description: "Lease acquisition binds task attempt, expected head and fencing token; concurrent and stale writers cannot mutate the checkout."
                    id: "dlv-06-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-06-tests"
                      - "review"
                    description: "Restart, changed title and repository relocation recover the recorded branch and workspace without duplicate allocation."
                    id: "dlv-06-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on:
                  - "DLV-05"
                expected_outputs:
                  - "dlv-06-result"
                id: "DLV-06"
                objective: "Reuse delivery workspaces under fenced writer leases. Allocate one worktree per shared delivery and resolve TODO membership before task-local worktree preparation. Lease acquisition binds task attempt, expected head and fencing token; concurrent and stale writers cannot mutate the checkout. Restart, changed title and repository relocation recover the recorded branch and workspace without duplicate allocation. Add the focused regression suite at packages/agentplane/src/commands/task/delivery-workspace.test.ts."
                optional: false
                priority: 94
                required_inputs:
                  - "dlv-05-result"
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/core/src/git"
                  - "packages/agentplane/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/commands/task/delivery-workspace.test.ts"
                      id: "dlv-06-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-06-tests"
                        - "review"
                      description: "Allocate one worktree per shared delivery and resolve TODO membership before task-local worktree preparation."
                      id: "dlv-06-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-06-tests"
                        - "review"
                      description: "Lease acquisition binds task attempt, expected head and fencing token; concurrent and stale writers cannot mutate the checkout."
                      id: "dlv-06-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-06-tests"
                        - "review"
                      description: "Restart, changed title and repository relocation recover the recorded branch and workspace without duplicate allocation."
                      id: "dlv-06-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-07-tests"
                      - "review"
                    description: "Execute A then B in one delivery; B begins at the accepted A head with its own Plan and execution grant."
                    id: "dlv-07-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-07-tests"
                      - "review"
                    description: "Require accepted result, persisted evidence and accounted-for clean state before writer handoff; failed or dirty A blocks B."
                    id: "dlv-07-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-07-tests"
                      - "review"
                    description: "Completing a member neither merges nor cleans the delivery; adding C to OPEN reuses the same workspace."
                    id: "dlv-07-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on:
                  - "DLV-06"
                expected_outputs:
                  - "dlv-07-result"
                id: "DLV-07"
                objective: "Execute independent member tasks sequentially. Execute A then B in one delivery; B begins at the accepted A head with its own Plan and execution grant. Require accepted result, persisted evidence and accounted-for clean state before writer handoff; failed or dirty A blocks B. Completing a member neither merges nor cleans the delivery; adding C to OPEN reuses the same workspace. Add the focused regression suite at packages/agentplane/src/commands/task/delivery-sequential.test.ts."
                optional: false
                priority: 93
                required_inputs:
                  - "dlv-06-result"
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/runner"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/commands/task/delivery-sequential.test.ts"
                      id: "dlv-07-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-07-tests"
                        - "review"
                      description: "Execute A then B in one delivery; B begins at the accepted A head with its own Plan and execution grant."
                      id: "dlv-07-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-07-tests"
                        - "review"
                      description: "Require accepted result, persisted evidence and accounted-for clean state before writer handoff; failed or dirty A blocks B."
                      id: "dlv-07-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-07-tests"
                        - "review"
                      description: "Completing a member neither merges nor cleans the delivery; adding C to OPEN reuses the same workspace."
                      id: "dlv-07-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-08-tests"
                      - "review"
                    description: "Bind each member validation to its input/output heads, content, plan and check-input digests."
                    id: "dlv-08-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-08-tests"
                      - "review"
                    description: "Preserve historical member validation while invalidating combined evidence affected by subsequent work or base updates."
                    id: "dlv-08-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-08-tests"
                      - "review"
                    description: "Expose validated-task versus integrated-delivery facts separately; service-only artifacts cannot cause unbounded verification loops."
                    id: "dlv-08-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on:
                  - "DLV-07"
                expected_outputs:
                  - "dlv-08-result"
                id: "DLV-08"
                objective: "Track member evidence and aggregate candidate validity. Bind each member validation to its input/output heads, content, plan and check-input digests. Preserve historical member validation while invalidating combined evidence affected by subsequent work or base updates. Expose validated-task versus integrated-delivery facts separately; service-only artifacts cannot cause unbounded verification loops. Add the focused regression suite at packages/agentplane/src/commands/task/delivery-verification.test.ts."
                optional: false
                priority: 92
                required_inputs:
                  - "dlv-07-result"
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/commands/task/delivery-verification.test.ts"
                      id: "dlv-08-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-08-tests"
                        - "review"
                      description: "Bind each member validation to its input/output heads, content, plan and check-input digests."
                      id: "dlv-08-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-08-tests"
                        - "review"
                      description: "Preserve historical member validation while invalidating combined evidence affected by subsequent work or base updates."
                      id: "dlv-08-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-08-tests"
                        - "review"
                      description: "Expose validated-task versus integrated-delivery facts separately; service-only artifacts cannot cause unbounded verification loops."
                      id: "dlv-08-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-09-tests"
                      - "review"
                    description: "READY requires all required members validated, no writer, clean accounted-for workspace and aggregate checks."
                    id: "dlv-09-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-09-tests"
                      - "review"
                    description: "Freeze membership, candidate SHA, target SHA and policy/evidence digests in one readiness receipt."
                    id: "dlv-09-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-09-tests"
                      - "review"
                    description: "Adding a member or changing candidate/base invalidates the receipt; integration under the old receipt is rejected."
                    id: "dlv-09-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on:
                  - "DLV-08"
                expected_outputs:
                  - "dlv-09-result"
                id: "DLV-09"
                objective: "Freeze delivery readiness and reopen on candidate changes. READY requires all required members validated, no writer, clean accounted-for workspace and aggregate checks. Freeze membership, candidate SHA, target SHA and policy/evidence digests in one readiness receipt. Adding a member or changing candidate/base invalidates the receipt; integration under the old receipt is rejected. Add the focused regression suite at packages/agentplane/src/commands/task/delivery-readiness.test.ts."
                optional: false
                priority: 91
                required_inputs:
                  - "dlv-08-result"
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/task"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/commands/task/delivery-readiness.test.ts"
                      id: "dlv-09-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-09-tests"
                        - "review"
                      description: "READY requires all required members validated, no writer, clean accounted-for workspace and aggregate checks."
                      id: "dlv-09-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-09-tests"
                        - "review"
                      description: "Freeze membership, candidate SHA, target SHA and policy/evidence digests in one readiness receipt."
                      id: "dlv-09-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-09-tests"
                        - "review"
                      description: "Adding a member or changing candidate/base invalidates the receipt; integration under the old receipt is rejected."
                      id: "dlv-09-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-10-tests"
                      - "review"
                    description: "Use one serialized reservation per delivery; direct uses the existing queue and branch_pr uses the provider as sole merge authority."
                    id: "dlv-10-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-10-tests"
                      - "review"
                    description: "Guard provider merge with exact candidate identity, reconcile its receipt and synchronize the local target; never fall back to local merge."
                    id: "dlv-10-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-10-tests"
                      - "review"
                    description: "Head/base movement, unavailable provider, and a crash after successful merge preserve recoverable state; retries cannot duplicate the merge."
                    id: "dlv-10-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on:
                  - "DLV-09"
                expected_outputs:
                  - "dlv-10-result"
                id: "DLV-10"
                objective: "Integrate each delivery exactly once through its gate. Use one serialized reservation per delivery; direct uses the existing queue and branch_pr uses the provider as sole merge authority. Guard provider merge with exact candidate identity, reconcile its receipt and synchronize the local target; never fall back to local merge. Head/base movement, unavailable provider, and a crash after successful merge preserve recoverable state; retries cannot duplicate the merge. Add the focused regression suite at packages/agentplane/src/commands/task/delivery-integration.test.ts."
                optional: false
                priority: 90
                required_inputs:
                  - "dlv-09-result"
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/commands/task/delivery-integration.test.ts"
                      id: "dlv-10-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-10-tests"
                        - "review"
                      description: "Use one serialized reservation per delivery; direct uses the existing queue and branch_pr uses the provider as sole merge authority."
                      id: "dlv-10-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-10-tests"
                        - "review"
                      description: "Guard provider merge with exact candidate identity, reconcile its receipt and synchronize the local target; never fall back to local merge."
                      id: "dlv-10-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-10-tests"
                        - "review"
                      description: "Head/base movement, unavailable provider, and a crash after successful merge preserve recoverable state; retries cannot duplicate the merge."
                      id: "dlv-10-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-11-tests"
                      - "review"
                    description: "Strengthening direct to PR preserves implementation and evidence, records a new decision, and requires any additional authority."
                    id: "dlv-11-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-11-tests"
                      - "review"
                    description: "Moving or splitting membership is explicit; outstanding effects are reconciled using stable operation IDs."
                    id: "dlv-11-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-11-tests"
                      - "review"
                    description: "Only delivery retirement may clean the workspace; active leases, open features, dirty files and unpublished unique commits prevent deletion."
                    id: "dlv-11-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on:
                  - "DLV-07"
                  - "DLV-10"
                expected_outputs:
                  - "dlv-11-result"
                id: "DLV-11"
                objective: "Recover escalations and retire deliveries conservatively. Strengthening direct to PR preserves implementation and evidence, records a new decision, and requires any additional authority. Moving or splitting membership is explicit; outstanding effects are reconciled using stable operation IDs. Only delivery retirement may clean the workspace; active leases, open features, dirty files and unpublished unique commits prevent deletion. Add the focused regression suite at packages/agentplane/src/commands/task/delivery-recovery.test.ts."
                optional: false
                priority: 89
                required_inputs:
                  - "dlv-07-result"
                  - "dlv-10-result"
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/commands/task/delivery-recovery.test.ts"
                      id: "dlv-11-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-11-tests"
                        - "review"
                      description: "Strengthening direct to PR preserves implementation and evidence, records a new decision, and requires any additional authority."
                      id: "dlv-11-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-11-tests"
                        - "review"
                      description: "Moving or splitting membership is explicit; outstanding effects are reconciled using stable operation IDs."
                      id: "dlv-11-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-11-tests"
                        - "review"
                      description: "Only delivery retirement may clean the workspace; active leases, open features, dirty files and unpublished unique commits prevent deletion."
                      id: "dlv-11-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-12-tests"
                      - "review"
                    description: "Import a single-task branch as one member and a coherent umbrella as one shared delivery without Git or provider effects."
                    id: "dlv-12-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-12-tests"
                      - "review"
                    description: "Ambiguous branches, conflicting task bindings or inconsistent PR/base identities produce typed repair output and no partial migration."
                    id: "dlv-12-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-12-tests"
                      - "review"
                    description: "Migration records old/new digests and is idempotent; rollback disables new admissions while retaining active state and unresolved receipts."
                    id: "dlv-12-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on:
                  - "DLV-05"
                  - "DLV-11"
                expected_outputs:
                  - "dlv-12-result"
                id: "DLV-12"
                objective: "Migrate legacy task and umbrella ownership. Import a single-task branch as one member and a coherent umbrella as one shared delivery without Git or provider effects. Ambiguous branches, conflicting task bindings or inconsistent PR/base identities produce typed repair output and no partial migration. Migration records old/new digests and is idempotent; rollback disables new admissions while retaining active state and unresolved receipts. Add the focused regression suite at packages/agentplane/src/commands/task/delivery-migration.test.ts."
                optional: false
                priority: 88
                required_inputs:
                  - "dlv-05-result"
                  - "dlv-11-result"
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/commands/task/delivery-migration.test.ts"
                      id: "dlv-12-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-12-tests"
                        - "review"
                      description: "Import a single-task branch as one member and a coherent umbrella as one shared delivery without Git or provider effects."
                      id: "dlv-12-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-12-tests"
                        - "review"
                      description: "Ambiguous branches, conflicting task bindings or inconsistent PR/base identities produce typed repair output and no partial migration."
                      id: "dlv-12-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-12-tests"
                        - "review"
                      description: "Migration records old/new digests and is idempotent; rollback disables new admissions while retaining active state and unresolved receipts."
                      id: "dlv-12-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-13-tests"
                      - "review"
                    description: "Expose supported create/join/ready/recover actions through existing operator and supervisor boundaries; generate CLI reference from actual commands."
                    id: "dlv-13-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-13-tests"
                      - "review"
                    description: "Compact status includes task, delivery, route reason, branch, worktree, target, writer, validation, PR and next action."
                    id: "dlv-13-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-13-tests"
                      - "review"
                    description: "User scenarios cover small direct work, one-task PR and incremental feature tasks; no runtime internals appear in the normal user flow."
                    id: "dlv-13-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on:
                  - "DLV-04"
                  - "DLV-07"
                  - "DLV-09"
                  - "DLV-11"
                  - "DLV-12"
                expected_outputs:
                  - "dlv-13-result"
                id: "DLV-13"
                objective: "Expose delivery selection and progress in CLI and docs. Expose supported create/join/ready/recover actions through existing operator and supervisor boundaries; generate CLI reference from actual commands. Compact status includes task, delivery, route reason, branch, worktree, target, writer, validation, PR and next action. User scenarios cover small direct work, one-task PR and incremental feature tasks; no runtime internals appear in the normal user flow. Add the focused regression suite at packages/agentplane/src/commands/task/delivery-cli.test.ts."
                optional: false
                priority: 87
                required_inputs:
                  - "dlv-04-result"
                  - "dlv-07-result"
                  - "dlv-09-result"
                  - "dlv-11-result"
                  - "dlv-12-result"
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src"
                  - "docs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/commands/task/delivery-cli.test.ts"
                      id: "dlv-13-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-13-tests"
                        - "review"
                      description: "Expose supported create/join/ready/recover actions through existing operator and supervisor boundaries; generate CLI reference from actual commands."
                      id: "dlv-13-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-13-tests"
                        - "review"
                      description: "Compact status includes task, delivery, route reason, branch, worktree, target, writer, validation, PR and next action."
                      id: "dlv-13-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-13-tests"
                        - "review"
                      description: "User scenarios cover small direct work, one-task PR and incremental feature tasks; no runtime internals appear in the normal user flow."
                      id: "dlv-13-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-14-tests"
                      - "review"
                    description: "A real local Git fixture runs independent A, B and C through one branch/worktree/PR identity and one integration with isolated provider fixtures."
                    id: "dlv-14-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-14-tests"
                      - "review"
                    description: "Qualify concurrent writer rejection, new TODO membership, restart, relocation, escalation, stale head, dirty handoff, unavailable provider and interrupted merge."
                    id: "dlv-14-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-14-tests"
                      - "review"
                    description: "Record before/after allocation, service-commit, check, provider-call, model-turn and elapsed-time measurements; block rollout on invariant failures."
                    id: "dlv-14-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on:
                  - "DLV-10"
                  - "DLV-11"
                  - "DLV-12"
                  - "DLV-13"
                expected_outputs:
                  - "dlv-14-result"
                id: "DLV-14"
                objective: "Qualify the complete feature delivery lifecycle. A real local Git fixture runs independent A, B and C through one branch/worktree/PR identity and one integration with isolated provider fixtures. Qualify concurrent writer rejection, new TODO membership, restart, relocation, escalation, stale head, dirty handoff, unavailable provider and interrupted merge. Record before/after allocation, service-commit, check, provider-call, model-turn and elapsed-time measurements; block rollout on invariant failures. Add the focused regression suite at packages/agentplane/src/cli/run-cli.core.delivery-lifecycle.test.ts."
                optional: false
                priority: 86
                required_inputs:
                  - "dlv-10-result"
                  - "dlv-11-result"
                  - "dlv-12-result"
                  - "dlv-13-result"
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src"
                  - "packages/testkit/src"
                  - "docs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/cli/run-cli.core.delivery-lifecycle.test.ts"
                      id: "dlv-14-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-14-tests"
                        - "review"
                      description: "A real local Git fixture runs independent A, B and C through one branch/worktree/PR identity and one integration with isolated provider fixtures."
                      id: "dlv-14-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-14-tests"
                        - "review"
                      description: "Qualify concurrent writer rejection, new TODO membership, restart, relocation, escalation, stale head, dirty handoff, unavailable provider and interrupted merge."
                      id: "dlv-14-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-14-tests"
                        - "review"
                      description: "Record before/after allocation, service-commit, check, provider-call, model-turn and elapsed-time measurements; block rollout on invariant failures."
                      id: "dlv-14-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "dlv-15-tests"
                      - "review"
                    description: "Use the qualified baseline to select one bounded redundant artifact-commit path for coalescing."
                    id: "dlv-15-criterion-1"
                    required: true
                  -
                    check_ids:
                      - "dlv-15-tests"
                      - "review"
                    description: "Preserve durable receipts, exact verification inputs, provider head consistency and interruption recovery; do not squash user implementation history."
                    id: "dlv-15-criterion-2"
                    required: true
                  -
                    check_ids:
                      - "dlv-15-tests"
                      - "review"
                    description: "The same lifecycle fixture has fewer service commits without added checks or lost evidence; document measured results and retain existing behavior when coalescing is unsafe."
                    id: "dlv-15-criterion-3"
                    required: true
                capabilities:
                  - "repository_write"
                context:
                  max_bytes: 50000
                  optional_sources: []
                  required_sources:
                    - "docs/adr/0018-feature-deliveries-and-semantic-routing.md"
                    - "docs/developer/feature-deliveries.mdx"
                    - "docs/developer/feature-delivery-roadmap.mdx"
                  symbol_hints: []
                depends_on:
                  - "DLV-14"
                expected_outputs:
                  - "dlv-15-result"
                id: "DLV-15"
                objective: "Coalesce redundant delivery service commits. Use the qualified baseline to select one bounded redundant artifact-commit path for coalescing. Preserve durable receipts, exact verification inputs, provider head consistency and interruption recovery; do not squash user implementation history. The same lifecycle fixture has fewer service commits without added checks or lost evidence; document measured results and retain existing behavior when coalescing is unsafe. Add the focused regression suite at packages/agentplane/src/commands/task/delivery-artifact-coalescing.test.ts."
                optional: false
                priority: 85
                required_inputs:
                  - "dlv-14-result"
                resource_claims: []
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src"
                  - "docs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane packages/agentplane/src/commands/task/delivery-artifact-coalescing.test.ts"
                      id: "dlv-15-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "review"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "dlv-15-tests"
                        - "review"
                      description: "Use the qualified baseline to select one bounded redundant artifact-commit path for coalescing."
                      id: "dlv-15-criterion-1"
                      required: true
                    -
                      check_ids:
                        - "dlv-15-tests"
                        - "review"
                      description: "Preserve durable receipts, exact verification inputs, provider head consistency and interruption recovery; do not squash user implementation history."
                      id: "dlv-15-criterion-2"
                      required: true
                    -
                      check_ids:
                        - "dlv-15-tests"
                        - "review"
                      description: "The same lifecycle fixture has fewer service commits without added checks or lost evidence; document measured results and retain existing behavior when coalescing is unsafe."
                      id: "dlv-15-criterion-3"
                      required: true
                  evidence_fingerprint: "sha256:626a25d5d70fecda16307fcd67898ce2e755967899f4846e0ed420bfa7370e01"
                  schema_version: 1
    events:
      -
        command_digest: "sha256:cf9faf752c09b9ab914129335c4ff7f69d52a90f42cab97f518668a2d08fbea1"
        id: "capture:202609300631-62B02X:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609300631-62B02X"
        occurred_at: "2026-09-30T06:32:00.857Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609300631-62B02X"
        task_revision: 1
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Implement semantic workflow selection and shared feature deliveries from ADR 0018

Implementation backlog for ADR 0018 and docs/developer/feature-deliveries.mdx. Fifteen atomic WorkItems DLV-01 through DLV-15 define enforced dependencies, bounded scopes, outputs, acceptance criteria and focused verification. Capture this supplied Plan only; do not start implementation or treat backlog creation as plan approval. Documentation task: 202609300615-DE9AE6. No release, deployment or provider mutation is authorized.

## Scope

- In scope: Implementation backlog for ADR 0018 and docs/developer/feature-deliveries.mdx. Fifteen atomic WorkItems DLV-01 through DLV-15 define enforced dependencies, bounded scopes, outputs, acceptance criteria and focused verification. Capture this supplied Plan only; do not start implementation or treat backlog creation as plan approval. Documentation task: 202609300615-DE9AE6. No release, deployment or provider mutation is authorized.
- Out of scope: unrelated refactors not required for "Implement semantic workflow selection and shared feature deliveries from ADR 0018".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
