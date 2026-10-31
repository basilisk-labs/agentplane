---
id: "202610311347-7CPDQV"
title: "Qualify bounded native recovery with frozen branch_pr routing"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on:
  - "202610310121-21Y197"
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run test:project agentplane --run packages/agentplane/src/commands/task/completed-projection-recovery.test.ts packages/agentplane/src/runtime/task-routing/resolve.test.ts packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts packages/agentplane/src/commands/task/scope-extend.command.test.ts packages/agentplane/src/commands/task/migration-quarantine.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts packages/agentplane/src/cli/legacy-cli-regressions.test.ts"
  - "bun run docs:cli:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-10-31T13:48:32.324Z"
  updated_by: "USER"
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
    - "effect_publish"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    allowed_resources: []
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "docs/user/cli-reference.generated.mdx"
      - "docs/user/task-lifecycle.mdx"
      - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
      - "packages/agentplane/src/commands/task/advance.command.ts"
      - "packages/agentplane/src/commands/task/advance.spec.ts"
      - "packages/agentplane/src/commands/task/completed-fixture-verification.testkit.ts"
      - "packages/agentplane/src/commands/task/completed-projection-recovery.test.ts"
      - "packages/agentplane/src/commands/task/completed-projection-recovery.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
      - "packages/agentplane/src/commands/task/kernel-migrate.command.ts"
      - "packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
      - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
      - "packages/agentplane/src/commands/task/migration-apply.ts"
      - "packages/agentplane/src/commands/task/migration-quarantine.test.ts"
      - "packages/agentplane/src/commands/task/migration-quarantine.ts"
      - "packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts"
      - "packages/agentplane/src/commands/task/task-execution-contract-observation.ts"
      - "packages/agentplane/src/runtime/task-routing/resolve.ts"
      - "packages/agentplane/src/runtime/task-routing/verification.ts"
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "docs/user/cli-reference.generated.mdx"
      - "docs/user/task-lifecycle.mdx"
      - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
      - "packages/agentplane/src/commands/task/advance.command.ts"
      - "packages/agentplane/src/commands/task/advance.spec.ts"
      - "packages/agentplane/src/commands/task/completed-fixture-verification.testkit.ts"
      - "packages/agentplane/src/commands/task/completed-projection-recovery.test.ts"
      - "packages/agentplane/src/commands/task/completed-projection-recovery.ts"
      - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
      - "packages/agentplane/src/commands/task/kernel-migrate.command.ts"
      - "packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
      - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
      - "packages/agentplane/src/commands/task/migration-apply.ts"
      - "packages/agentplane/src/commands/task/migration-quarantine.test.ts"
      - "packages/agentplane/src/commands/task/migration-quarantine.ts"
      - "packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts"
      - "packages/agentplane/src/commands/task/task-execution-contract-observation.ts"
      - "packages/agentplane/src/runtime/task-routing/resolve.ts"
      - "packages/agentplane/src/runtime/task-routing/verification.ts"
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
    - "effect_publish"
    - "effect_security_boundary"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "docs/user/cli-reference.generated.mdx"
          - "docs/user/task-lifecycle.mdx"
          - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
          - "packages/agentplane/src/commands/task/advance.command.ts"
          - "packages/agentplane/src/commands/task/advance.spec.ts"
          - "packages/agentplane/src/commands/task/completed-fixture-verification.testkit.ts"
          - "packages/agentplane/src/commands/task/completed-projection-recovery.test.ts"
          - "packages/agentplane/src/commands/task/completed-projection-recovery.ts"
          - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
          - "packages/agentplane/src/commands/task/kernel-migrate.command.ts"
          - "packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
          - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
          - "packages/agentplane/src/commands/task/migration-apply.ts"
          - "packages/agentplane/src/commands/task/migration-quarantine.test.ts"
          - "packages/agentplane/src/commands/task/migration-quarantine.ts"
          - "packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts"
          - "packages/agentplane/src/commands/task/task-execution-contract-observation.ts"
          - "packages/agentplane/src/runtime/task-routing/resolve.ts"
          - "packages/agentplane/src/runtime/task-routing/verification.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:989a32632656849fcc5284369150e7c39a665d8407917c8345b006c92a075867"
      escalation_reasons:
        - "central_component:packages/agentplane/src/runtime/task-routing/resolve.ts"
        - "central_component:packages/agentplane/src/runtime/task-routing/verification.ts"
        - "effect_public_api"
        - "effect_security_boundary"
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
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Blocked: Standard intake scans cannot authenticate an unrelated archived Task. This explicit new intent awaits exact native migration to Kernel planning. No implementation or verification has run. The earlier incomplete intake 202610311338-RWNBCR remains blocked and retained."
events: []
doc_version: 3
doc_updated_at: "2026-10-31T13:47:46.489Z"
doc_updated_by: "ORCHESTRATOR"
description: "Completed-scope observations can replace inherited verification coverage and leave an interrupted metadata projection unreadable. A legacy README and embedded aggregate revision split also prevents Factory Doctor and protected integration. Preserve inherited verification contracts, add exact source-bound recovery for the interrupted completed-scope projection, and extend existing kernel-migrate apply with guarded revision-split quarantine and byte-exact rollback. Preserve Kernel completion, original history, evidence, data, credentials and runtime guards. Confine source changes to the nineteen declared roots. Qualify public Node workflows, drift and interruption refusals, replay, retained-source diagnostics and rollback with full native CI and a fresh EVALUATOR before protected canonical PR and merge. Operational repair of original VPB, the ten Factory Tasks and sb remains a separate operator step after publication. Preserve all existing worktrees, branches, archives and unrelated user changes; no cleanup or host effects belong to this source Task."
sections:
  Summary: "Completed-scope observations can replace inherited verification coverage and leave an interrupted metadata projection unreadable. A legacy README and embedded aggregate revision split also prevents Factory Doctor and protected integration. Preserve inherited verification contracts, add exact source-bound recovery for the interrupted completed-scope projection, and extend existing kernel-migrate apply with guarded revision-split quarantine and byte-exact rollback. Preserve Kernel completion, original history, evidence, data, credentials and runtime guards. Confine source changes to the nineteen declared roots. Qualify public Node workflows, drift and interruption refusals, replay, retained-source diagnostics and rollback with full native CI and a fresh EVALUATOR before protected canonical PR and merge. Operational repair of original VPB, the ten Factory Tasks and sb remains a separate operator step after publication. Preserve all existing worktrees, branches, archives and unrelated user changes; no cleanup or host effects belong to this source Task."
  Scope: "Only the nineteen declared source paths. Operational repair of original Tasks, runtime state, credentials and deployment remains separate after publication."
  Plan: "1. Execute approved WorkItem preserve-verification-floor-and-qualify-bounded-native-recovery."
  Verify Steps: |-
    - bun run ci:local:full
    - bun run test:project agentplane --run packages/agentplane/src/commands/task/completed-projection-recovery.test.ts packages/agentplane/src/runtime/task-routing/resolve.test.ts packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts packages/agentplane/src/commands/task/scope-extend.command.test.ts packages/agentplane/src/commands/task/migration-quarantine.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts packages/agentplane/src/cli/legacy-cli-regressions.test.ts
    - bun run docs:cli:check
    - node .agentplane/policy/check-routing.mjs
  Verification: "Pending native checks, fresh EVALUATOR and protected publication. No PASS evidence is supplied by this intake."
  Rollback Plan: "Preserve source, original Task records, protected journals and runtime state. Revert published source through canonical review if necessary. The new native migration retains exact intake backup and guarded CAS rollback."
  Findings: |-
    The user authorized temporary canonical CLI5610a273 for this new Task only. Standard task new is blocked by unrelated archived source authentication. The supported single-record import and exact migration route was qualified in a private fixture. This intake grants no approval or execution result.

    The corrected intake declares the frozen branch_pr route in addition to its native-resolved execution contract. The earlier incomplete intake 202610311338-RWNBCR remains BLOCKED. No source code was changed there.
extensions:
  task_execution_context:
    base_ref: "main"
    base_sha: "6f9a7aff02f8bea3823594154e23f251a56bc58f"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:bc284514f1d4e920575ec7933103430a0ee916c34a972b492a8083af3a1b06ac"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:10f3a97288ec8e8d49da1a994a3571dc76b49b7a61015fd0e12a38b2f1f365f5"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:fb7867959ca81df9b6d4aa1418895115719579744fca2fdd71353de6e5041e98"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:abbcf0db7e13d8a93493a0d542478e1a9f0698c481877b8862aa6c68acf24638"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "docs/user/cli-reference.generated.mdx"
              - "docs/user/task-lifecycle.mdx"
              - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/advance.spec.ts"
              - "packages/agentplane/src/commands/task/completed-fixture-verification.testkit.ts"
              - "packages/agentplane/src/commands/task/completed-projection-recovery.test.ts"
              - "packages/agentplane/src/commands/task/completed-projection-recovery.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-migrate.command.ts"
              - "packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
              - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/migration-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/migration-quarantine.ts"
              - "packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts"
              - "packages/agentplane/src/commands/task/task-execution-contract-observation.ts"
              - "packages/agentplane/src/runtime/task-routing/resolve.ts"
              - "packages/agentplane/src/runtime/task-routing/verification.ts"
            task_id: "202610311347-7CPDQV"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:2b45a58e8020dd2460d7a7b3be140ca8511faca90d95ba76b9c88079b13a2c48"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:10f3a97288ec8e8d49da1a994a3571dc76b49b7a61015fd0e12a38b2f1f365f5"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:fb7867959ca81df9b6d4aa1418895115719579744fca2fdd71353de6e5041e98"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:bc284514f1d4e920575ec7933103430a0ee916c34a972b492a8083af3a1b06ac"
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:6d420c32ab5af7b6c6c186aab3b08fff3954c7d4f89e486c7de1032ed65032aa"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "docs/user/cli-reference.generated.mdx"
              - "docs/user/task-lifecycle.mdx"
              - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/advance.spec.ts"
              - "packages/agentplane/src/commands/task/completed-fixture-verification.testkit.ts"
              - "packages/agentplane/src/commands/task/completed-projection-recovery.test.ts"
              - "packages/agentplane/src/commands/task/completed-projection-recovery.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-migrate.command.ts"
              - "packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
              - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/migration-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/migration-quarantine.ts"
              - "packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts"
              - "packages/agentplane/src/commands/task/task-execution-contract-observation.ts"
              - "packages/agentplane/src/runtime/task-routing/resolve.ts"
              - "packages/agentplane/src/runtime/task-routing/verification.ts"
            task_id: "202610311347-7CPDQV"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:9324270d6ec6d9b99cba2cdf213fd6c9c514fcb7a4cd7bbbad484347f70c547e"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:abbcf0db7e13d8a93493a0d542478e1a9f0698c481877b8862aa6c68acf24638"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:bce7e0ee3a00252938c37d808f378e8c62abde7062424520265c7e7f25dd168c"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:10f3a97288ec8e8d49da1a994a3571dc76b49b7a61015fd0e12a38b2f1f365f5"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:fb7867959ca81df9b6d4aa1418895115719579744fca2fdd71353de6e5041e98"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:2b45a58e8020dd2460d7a7b3be140ca8511faca90d95ba76b9c88079b13a2c48"
            repository_effects:
              - "documentation"
              - "public_api"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:3799eed0c23168f6ae8d36230d77f312f884e6f37ec710986f19f05c491c8513"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "docs/user/cli-reference.generated.mdx"
              - "docs/user/task-lifecycle.mdx"
              - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/advance.spec.ts"
              - "packages/agentplane/src/commands/task/completed-fixture-verification.testkit.ts"
              - "packages/agentplane/src/commands/task/completed-projection-recovery.test.ts"
              - "packages/agentplane/src/commands/task/completed-projection-recovery.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-migrate.command.ts"
              - "packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
              - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/migration-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/migration-quarantine.ts"
              - "packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts"
              - "packages/agentplane/src/commands/task/task-execution-contract-observation.ts"
              - "packages/agentplane/src/runtime/task-routing/resolve.ts"
              - "packages/agentplane/src/runtime/task-routing/verification.ts"
            task_id: "202610311347-7CPDQV"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "docs/user/cli-reference.generated.mdx"
              - "docs/user/task-lifecycle.mdx"
              - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/advance.spec.ts"
              - "packages/agentplane/src/commands/task/completed-fixture-verification.testkit.ts"
              - "packages/agentplane/src/commands/task/completed-projection-recovery.test.ts"
              - "packages/agentplane/src/commands/task/completed-projection-recovery.ts"
              - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
              - "packages/agentplane/src/commands/task/kernel-migrate.command.ts"
              - "packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
              - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/migration-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/migration-quarantine.ts"
              - "packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts"
              - "packages/agentplane/src/commands/task/task-execution-contract-observation.ts"
              - "packages/agentplane/src/runtime/task-routing/resolve.ts"
              - "packages/agentplane/src/runtime/task-routing/verification.ts"
            evidence_digest: "sha256:6677cbb70cba5560e5a589221dc783b95dd50a046e8ed99a610cd17c06a377f5"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:6d420c32ab5af7b6c6c186aab3b08fff3954c7d4f89e486c7de1032ed65032aa"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:fb7867959ca81df9b6d4aa1418895115719579744fca2fdd71353de6e5041e98"
        digest: "sha256:10f3a97288ec8e8d49da1a994a3571dc76b49b7a61015fd0e12a38b2f1f365f5"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:cc122b58b41ad7932417918fcf48a4b4b7b2f7c17dbd350f5b94d17300d97be2"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects:
                - "network_read"
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
                - "public_api"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/runtime/task-routing/resolve.ts"
                - "packages/agentplane/src/runtime/task-routing/verification.ts"
                - "packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts"
                - "packages/agentplane/src/commands/task/completed-projection-recovery.ts"
                - "packages/agentplane/src/commands/task/completed-projection-recovery.test.ts"
                - "packages/agentplane/src/commands/task/advance.command.ts"
                - "packages/agentplane/src/commands/task/advance.spec.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
                - "packages/agentplane/src/commands/task/completed-fixture-verification.testkit.ts"
                - "docs/user/task-lifecycle.mdx"
                - "docs/user/cli-reference.generated.mdx"
                - "packages/agentplane/src/commands/task/task-execution-contract-observation.ts"
                - "packages/agentplane/src/commands/task/migration-apply.ts"
                - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
                - "packages/agentplane/src/commands/task/migration-quarantine.ts"
                - "packages/agentplane/src/commands/task/migration-quarantine.test.ts"
                - "packages/agentplane/src/commands/task/kernel-migrate.command.ts"
                - "packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
                - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
            expected_outputs:
              - "verification-floor-qualification-report"
            id: "preserve-verification-floor-and-qualify-bounded-native-recovery"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610311347-7CPDQV"
      intent_digest: "sha256:323678c6f945842f1f3d28a8e9a4253096c4f6ce8813d43e862b1aea8d01c069"
      migration_receipts: []
      mutation_receipts:
        kernel_work_item_claim_required:sha256:ca568d347eed5c786aed879b3516ece5e41489f3e1681a50a58bcc4ab4e95a86:sha256:abbcf0db7e13d8a93493a0d542478e1a9f0698c481877b8862aa6c68acf24638:
          after_revision: 5
          aggregate_digest: "sha256:9dd8843fa11883d233d1bcf9cfbdeeaa3881d7de7f62c1c68e2659265429fc81"
          before_revision: 4
          command_digest: "sha256:01634699c47234ae19b6e32a8b0e406ef30b63c50c3adbeba528173ca7878f5d"
          effect_ids: []
          event_digests:
            - "sha256:17783ead7186b00a2280e6d5ea97affe420eccaa9d1a2483b81d9cad0698cca3"
          mutation_id: "kernel_work_item_claim_required:sha256:ca568d347eed5c786aed879b3516ece5e41489f3e1681a50a58bcc4ab4e95a86:sha256:abbcf0db7e13d8a93493a0d542478e1a9f0698c481877b8862aa6c68acf24638"
        kernel_work_item_execution_required:sha256:0d398bda13130d436ccdf6acfa8a1cdfcfa43571e1ca4a0d2722e2d295efdeec:sha256:6d420c32ab5af7b6c6c186aab3b08fff3954c7d4f89e486c7de1032ed65032aa:
          after_revision: 7
          aggregate_digest: "sha256:67dea274a20639b50dabb619684aedad76c35f1f87143bda5095a3cb719cee16"
          before_revision: 6
          command_digest: "sha256:2d6652a987cc0d105a407c42135b1326b8a81f9bd972de2203327199aa21afc0"
          effect_ids: []
          event_digests:
            - "sha256:ef26968c5d5d0be8b47d2d7d73b0ddff0f1a39499513fb37bd0864e7dfacd543"
          mutation_id: "kernel_work_item_execution_required:sha256:0d398bda13130d436ccdf6acfa8a1cdfcfa43571e1ca4a0d2722e2d295efdeec:sha256:6d420c32ab5af7b6c6c186aab3b08fff3954c7d4f89e486c7de1032ed65032aa"
        kernel_work_item_execution_required:sha256:52335b6be977eed931ecb401ad70059fe3c8242598671963fc7dbf36e78f926b:sha256:3799eed0c23168f6ae8d36230d77f312f884e6f37ec710986f19f05c491c8513:
          after_revision: 14
          aggregate_digest: "sha256:af9d3c26f8f043d665f078438a8017f8c2f84f4ae454c1e1b290458f6244374d"
          before_revision: 13
          command_digest: "sha256:dca5377fc5e7faf15edaf3d6498aa215613e5a0f9c6d894d4b71ac3a8deaf9da"
          effect_ids: []
          event_digests:
            - "sha256:8cebc59c2307c34bfc6db42c82d4d5394f93ca1493ccf2073a3c729c31ec0cfb"
          mutation_id: "kernel_work_item_execution_required:sha256:52335b6be977eed931ecb401ad70059fe3c8242598671963fc7dbf36e78f926b:sha256:3799eed0c23168f6ae8d36230d77f312f884e6f37ec710986f19f05c491c8513"
        kernel_work_item_inspection_required:sha256:aeed723192c7fd8544286bc0cf6ff915ebd14f7856b9dc48206125b0d7a52b1b:sha256:3799eed0c23168f6ae8d36230d77f312f884e6f37ec710986f19f05c491c8513:
          after_revision: 10
          aggregate_digest: "sha256:3283b47abe0013aada8c31ba7a945273b89d8ab559bafa22b1f772fd142682c1"
          before_revision: 9
          command_digest: "sha256:21c2a9f42af758cd22dc557facfe4958623fb2b12992c2ab3f0d7484639350a0"
          effect_ids: []
          event_digests:
            - "sha256:259abfffdf60393e993810797e4da24e460be40d68157f78c5688d91cae19f21"
          mutation_id: "kernel_work_item_inspection_required:sha256:aeed723192c7fd8544286bc0cf6ff915ebd14f7856b9dc48206125b0d7a52b1b:sha256:3799eed0c23168f6ae8d36230d77f312f884e6f37ec710986f19f05c491c8513"
        kernel_work_item_materialization_required:sha256:9c92d92d7612f66bcce28fbecc11423268679aa451449d36206b71d0bab8ea19:sha256:abbcf0db7e13d8a93493a0d542478e1a9f0698c481877b8862aa6c68acf24638:
          after_revision: 4
          aggregate_digest: "sha256:1ffcd5bb1926b28c4e676cfc1263965a51abc5d6dfb01b57c855c2a9824a3d1c"
          before_revision: 3
          command_digest: "sha256:4fc24b8aea832411e73f8086bfc35bf01c2588d2c2a70ee9e4492efcef17c6fa"
          effect_ids: []
          event_digests:
            - "sha256:98e0b65742ea9a5a21c14b9bb3385cbda872ef375fe45187e77b8454ee053cd9"
          mutation_id: "kernel_work_item_materialization_required:sha256:9c92d92d7612f66bcce28fbecc11423268679aa451449d36206b71d0bab8ea19:sha256:abbcf0db7e13d8a93493a0d542478e1a9f0698c481877b8862aa6c68acf24638"
        kernel_work_item_rework_claim_required:sha256:1a20b558c0d19856de3efcdad6aa4e24d58f3f4b8d19360d700a3c9152f7d038:sha256:3799eed0c23168f6ae8d36230d77f312f884e6f37ec710986f19f05c491c8513:
          after_revision: 13
          aggregate_digest: "sha256:c47e79ce11b473718d78d77db735479101638cbec26ed4550190bc86ee4b135d"
          before_revision: 12
          command_digest: "sha256:3155ab5a3a984e54e5bde314e4aabb75a7f5f5a7b7c1e031cc12467d582260f0"
          effect_ids: []
          event_digests:
            - "sha256:79246619ddeec677e971f5b6fb4e569a63a95e67f278beb8b7a9e75b6c6db3ee"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:1a20b558c0d19856de3efcdad6aa4e24d58f3f4b8d19360d700a3c9152f7d038:sha256:3799eed0c23168f6ae8d36230d77f312f884e6f37ec710986f19f05c491c8513"
        result:sha256:dead2be5b79b729adf2a453220edcfd0c5409dcb07463bc9a0c1062561a73834:
          after_revision: 9
          aggregate_digest: "sha256:18fcd833ed24f57fa32f8c7e835d459cfeadd08aaf0d0a9e5b8d1608aac0cadb"
          before_revision: 8
          command_digest: "sha256:3d5d8a03ed73b68795748c3b0de1640ddb7a03fcde82a2a2ab7d13014628f360"
          effect_ids: []
          event_digests:
            - "sha256:e723b68d40725d140a1817c374084c68fa3c272f1152a7349b5c48c2cc825802"
          mutation_id: "result:sha256:dead2be5b79b729adf2a453220edcfd0c5409dcb07463bc9a0c1062561a73834"
        result:sha256:e3fcbae6fa6abe3eae8f9f0b851d5380686034facf27f0fd612769f7513f0262:
          after_revision: 2
          aggregate_digest: "sha256:4788520d9945d03bbd6153de7decfbff18ec25a645fcd82bd0b8db41cb6c34b9"
          before_revision: 1
          command_digest: "sha256:38abdf39321ffd069216d1f6b8270d416d5328d5e3512a141cc7310531b9414d"
          effect_ids: []
          event_digests:
            - "sha256:ae2cb0fa0146659394a05c6180439a4cacfa0d4adadb07bb4f0664883b649b8f"
          mutation_id: "result:sha256:e3fcbae6fa6abe3eae8f9f0b851d5380686034facf27f0fd612769f7513f0262"
        sha256:2a2da517fb0017f4232bd0d9693d4a6975ecd11274c3f07995fdf64ec982c444:
          after_revision: 8
          aggregate_digest: "sha256:418170880a2823b40018e5f14690740df6c40b0231ac805b6bb6037f80db7c77"
          before_revision: 7
          command_digest: "sha256:428472557ef8a1e6da9b8b064f9b5b4ea1ae0697ee0ac3876fc9a8138386338d"
          effect_ids: []
          event_digests:
            - "sha256:f0526865d34f58e41ae1566e5a04438be8f0c81ca9f16fead46590dfd52aa6f2"
          mutation_id: "sha256:2a2da517fb0017f4232bd0d9693d4a6975ecd11274c3f07995fdf64ec982c444"
        sha256:abd4992f127c29f29e401352a1dae22994bca604ee12abff0f53fa29847194e7:
          after_revision: 6
          aggregate_digest: "sha256:49dbbf3111c6f92e879e1b0ae52943287c87062255db135c0dae689a08b872bf"
          before_revision: 5
          command_digest: "sha256:6206d2491a585d903e531c8fad9df50a1d2237413994d40758434dc11a01a451"
          effect_ids: []
          event_digests:
            - "sha256:7aab884a7adb0a11b66f471dd65244e2d53aca9baa66a8ebd5f903a47f5cf63d"
          mutation_id: "sha256:abd4992f127c29f29e401352a1dae22994bca604ee12abff0f53fa29847194e7"
        sha256:f310b0fa7c8eb05fc0d068075df21de302f1aabdb055f8ca78972b230872b2cb:
          after_revision: 3
          aggregate_digest: "sha256:da763b9b5453fad91b171b7f63ff793cbfe5fd0f3b2f99689866dad2d9b08279"
          before_revision: 2
          command_digest: "sha256:512550d6db1e185181fc68aea7b82294587b45d20f9739dc3f8b1645055e10b8"
          effect_ids: []
          event_digests:
            - "sha256:cf7b54ecea577110c4f63a58157fa02a1a5dc45b2a8af5d28126f330c04dc7df"
          mutation_id: "sha256:f310b0fa7c8eb05fc0d068075df21de302f1aabdb055f8ca78972b230872b2cb"
        validation-resolution:sha256:2e1486979daf6d10280adbb342d4fbdeec19254aeb8b1a2209154a5f7a593dfe:
          after_revision: 12
          aggregate_digest: "sha256:cc91d414ce49cf4afc7bef51c38ab4ebd6d8868b0f9c49538bf8818cd89d9334"
          before_revision: 11
          command_digest: "sha256:58e1c5334ab7f48bac149efb351655150c95a18ab47b7216ce0ed740c639d8a5"
          effect_ids: []
          event_digests:
            - "sha256:b1b0ff5370717a1df513facd18d91edd27d1fffa13d775d3dc63ef9853643a72"
          mutation_id: "validation-resolution:sha256:2e1486979daf6d10280adbb342d4fbdeec19254aeb8b1a2209154a5f7a593dfe"
        validation:sha256:5d29710c0ad0cb2c570e4ae58aefd5a96bda42f64504ee4908cb8d770aac58b8:
          after_revision: 11
          aggregate_digest: "sha256:251d023caeb9dff333cbeca36068ff5212dd8adae3eb869003d8d16b631b213a"
          before_revision: 10
          command_digest: "sha256:1cfb82afdeec26dfea74cbcd994467e2d6c13314490858966311537399457426"
          effect_ids: []
          event_digests:
            - "sha256:96b8ae9cf980bd47f842929a0eabcecf372bd7dba624424362e798db521d1631"
          mutation_id: "validation:sha256:5d29710c0ad0cb2c570e4ae58aefd5a96bda42f64504ee4908cb8d770aac58b8"
      plan_history: []
      revision: 14
      schema_version: 1
      state: "ACTIVE"
      work_items:
        preserve-verification-floor-and-qualify-bounded-native-recovery:
          attempt: 2
          claim_id: "sha256:9d01f9494b220b6d64e69b7846899e4d8a1c6056892083e629403cfcaee28d09"
          definition:
            contract_digest: "sha256:cc122b58b41ad7932417918fcf48a4b4b7b2f7c17dbd350f5b94d17300d97be2"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects:
                - "network_read"
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
                - "public_api"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/runtime/task-routing/resolve.ts"
                - "packages/agentplane/src/runtime/task-routing/verification.ts"
                - "packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts"
                - "packages/agentplane/src/commands/task/completed-projection-recovery.ts"
                - "packages/agentplane/src/commands/task/completed-projection-recovery.test.ts"
                - "packages/agentplane/src/commands/task/advance.command.ts"
                - "packages/agentplane/src/commands/task/advance.spec.ts"
                - "packages/agentplane/src/commands/task/kernel-completed-external-rework.testkit.ts"
                - "packages/agentplane/src/commands/task/completed-fixture-verification.testkit.ts"
                - "docs/user/task-lifecycle.mdx"
                - "docs/user/cli-reference.generated.mdx"
                - "packages/agentplane/src/commands/task/task-execution-contract-observation.ts"
                - "packages/agentplane/src/commands/task/migration-apply.ts"
                - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
                - "packages/agentplane/src/commands/task/migration-quarantine.ts"
                - "packages/agentplane/src/commands/task/migration-quarantine.test.ts"
                - "packages/agentplane/src/commands/task/kernel-migrate.command.ts"
                - "packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
                - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
            expected_outputs:
              - "verification-floor-qualification-report"
            id: "preserve-verification-floor-and-qualify-bounded-native-recovery"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 9
          state: "EXECUTING"
          validation: null
    digest: "sha256:ae1fc2fc80adc8572281258ba6db790858601ebf324b61a576e003edcba1b1f1"
    documents:
      contracts:
        sha256:cc122b58b41ad7932417918fcf48a4b4b7b2f7c17dbd350f5b94d17300d97be2:
          acceptance_criteria:
            - "Only the nineteen declared paths change. Retain original VPB, MRJ, cancelled Tasks, all failed evidence, worktrees and branches. No operational Task, host, credentials, data or runtime guards change during this source Task."
            - "Later source observations retain inherited verification coverage, declared evidence obligations and selector settings without granting write authority or changing owned observations. Current owner verification replacement keeps its established transient-result behavior and independent failure observations. A no-change observation authenticates its exact captured TaskStore metadata before returning it to native consumers."
            - "The public Node workflow recovery accepts only an exact native completed-scope source, unchanged issued EXECUTOR result and journal, dedicated source commit and configured local store. It verifies the earlier TaskStore projection, retains before/after bytes and uses one CAS under the existing lease with an independent readback. The returned original result resumes through fresh native checks to an EVALUATOR episode in the behavioral fixture. The early dispatcher preserves the existing integration/provider recovery input contract, including large evidence and symlinked legacy inputs. Only the selected new projection kind is subject to its bounded stable no-follow proof."
            - "No Kernel reopening, PASS fabrication, Task execution, provider effects or historical journal rewrite. Stale pins, unrelated edits, unknown afterimages, changed configuration and competing writers are refused. A real source CAS interruption resumes without another write."
            - "The existing public kernel-migrate interface must support revision-split quarantine through its existing explicit --apply --source-digest <exact-dry-run-digest> --yes operator action. Do not add a new CLI option or relax the compatibility contract. The reviewed apply must retain the blocked source rather than migrate it or invent its correct afterimage. Only an unmigrated legacy record with the sole task.revision/source_revision_mismatch blocker is eligible. Allow only legacy WorkItem states PLANNED, READY or REWORK_READY with null claim IDs. Reject active supervisor leases or intents, all legacy runtime leases or pending effects, identity mismatch, canonical Kernel records, unknown blockers and drift. Pending unexecuted work is retained in the exact source backup. The result remains BLOCKED and cannot issue work. Existing migrate/apply behavior remains unchanged for other blocker classes and non-split sources. Preserve the non-success quarantine exit status and distinguish persisted quarantine from successful migration."
            - "Retain one exact checked source backup, a digest-validated native quarantine marker and emitted output proof. Independently verify the source CAS readback. Replay must not write again. A public guarded rollback under the existing execution fence must restore byte-exact original source only while the exact emitted output remains current. Changed projection, proof, repository, backup or competing writers must refuse rollback. Test success, replay, interruption/readback, failure cases and a real public Node quarantine/doctor/execution-refusal/rollback workflow. Original ten Factory sources remain untouched during this source Task; apply the qualified published capability later as a separate approved operator action. Doctor must continue to report the retained quarantined condition with the original blocker and execution prohibition. Invalid markers or missing/mismatched source backups remain errors; quarantine is never a blanket diagnostic suppression. Reconstruct and authenticate the exact native quarantine afterimage from its retained source and marker before replay, migration, rollback or Doctor acceptance; an otherwise valid marker must not legitimize edited outer Task metadata or body."
            - "Fresh full native CI, focused behavior, build, generated help/docs and routing checks qualify the implementation for independent EVALUATOR. Final native repository checks must pass before protected canonical GitHub PR/merge. Original VPB operational recovery remains a separate explicitly authorized operator action after publication."
          objective: "Preserve inherited verification coverage and stable policy floor during subsequent owned implementation observations. Qualify a strictly source-bound native operator recovery for the exact interrupted completed-scope metadata projection. Preserve Kernel, original history, task ownership, native checks and all data. Extend the existing lifecycle-owner migration with explicitly requested, source-bound quarantine for a quiescent legacy revision split and exact guarded rollback. Preserve the source and diagnostic history without claiming completion or successful validation."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
            - "bun run test:project agentplane --run packages/agentplane/src/commands/task/completed-projection-recovery.test.ts packages/agentplane/src/runtime/task-routing/resolve.test.ts packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts packages/agentplane/src/commands/task/scope-extend.command.test.ts packages/agentplane/src/commands/task/migration-quarantine.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts packages/agentplane/src/cli/legacy-cli-regressions.test.ts"
            - "bun run docs:cli:check"
            - "node .agentplane/policy/check-routing.mjs"
      intent:
        context: "Retained lifecycle-owner migration source."
        objective: "Qualify bounded native recovery with frozen branch_pr routing\n\nCompleted-scope observations can replace inherited verification coverage and leave an interrupted metadata projection unreadable. A legacy README and embedded aggregate revision split also prevents Factory Doctor and protected integration. Preserve inherited verification contracts, add exact source-bound recovery for the interrupted completed-scope projection, and extend existing kernel-migrate apply with guarded revision-split quarantine and byte-exact rollback. Preserve Kernel completion, original history, evidence, data, credentials and runtime guards. Confine source changes to the nineteen declared roots. Qualify public Node workflows, drift and interruption refusals, replay, retained-source diagnostics and rollback with full native CI and a fresh EVALUATOR before protected canonical PR and merge. Operational repair of original VPB, the ten Factory Tasks and sb remains a separate operator step after publication. Preserve all existing worktrees, branches, archives and unrelated user changes; no cleanup or host effects belong to this source Task."
    events:
      -
        command_digest: "sha256:38abdf39321ffd069216d1f6b8270d416d5328d5e3512a141cc7310531b9414d"
        id: "result:sha256:e3fcbae6fa6abe3eae8f9f0b851d5380686034facf27f0fd612769f7513f0262:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:e3fcbae6fa6abe3eae8f9f0b851d5380686034facf27f0fd612769f7513f0262"
        occurred_at: "2026-10-31T13:48:24.421Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610311347-7CPDQV"
        task_revision: 2
      -
        command_digest: "sha256:512550d6db1e185181fc68aea7b82294587b45d20f9739dc3f8b1645055e10b8"
        id: "sha256:f310b0fa7c8eb05fc0d068075df21de302f1aabdb055f8ca78972b230872b2cb:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:f310b0fa7c8eb05fc0d068075df21de302f1aabdb055f8ca78972b230872b2cb"
        occurred_at: "2026-10-31T13:48:30.963Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610311347-7CPDQV"
        task_revision: 3
      -
        command_digest: "sha256:4fc24b8aea832411e73f8086bfc35bf01c2588d2c2a70ee9e4492efcef17c6fa"
        id: "kernel_work_item_materialization_required:sha256:9c92d92d7612f66bcce28fbecc11423268679aa451449d36206b71d0bab8ea19:sha256:abbcf0db7e13d8a93493a0d542478e1a9f0698c481877b8862aa6c68acf24638:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:9c92d92d7612f66bcce28fbecc11423268679aa451449d36206b71d0bab8ea19:sha256:abbcf0db7e13d8a93493a0d542478e1a9f0698c481877b8862aa6c68acf24638"
        occurred_at: "2026-10-31T13:48:37.887Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610311347-7CPDQV"
        task_revision: 4
      -
        command_digest: "sha256:01634699c47234ae19b6e32a8b0e406ef30b63c50c3adbeba528173ca7878f5d"
        id: "kernel_work_item_claim_required:sha256:ca568d347eed5c786aed879b3516ece5e41489f3e1681a50a58bcc4ab4e95a86:sha256:abbcf0db7e13d8a93493a0d542478e1a9f0698c481877b8862aa6c68acf24638:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ca568d347eed5c786aed879b3516ece5e41489f3e1681a50a58bcc4ab4e95a86:sha256:abbcf0db7e13d8a93493a0d542478e1a9f0698c481877b8862aa6c68acf24638"
        occurred_at: "2026-10-31T13:48:43.257Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610311347-7CPDQV"
        task_revision: 5
      -
        command_digest: "sha256:6206d2491a585d903e531c8fad9df50a1d2237413994d40758434dc11a01a451"
        id: "sha256:abd4992f127c29f29e401352a1dae22994bca604ee12abff0f53fa29847194e7:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:abd4992f127c29f29e401352a1dae22994bca604ee12abff0f53fa29847194e7"
        occurred_at: "2026-10-31T13:49:26.051Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202610311347-7CPDQV"
        task_revision: 6
      -
        command_digest: "sha256:2d6652a987cc0d105a407c42135b1326b8a81f9bd972de2203327199aa21afc0"
        id: "kernel_work_item_execution_required:sha256:0d398bda13130d436ccdf6acfa8a1cdfcfa43571e1ca4a0d2722e2d295efdeec:sha256:6d420c32ab5af7b6c6c186aab3b08fff3954c7d4f89e486c7de1032ed65032aa:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:0d398bda13130d436ccdf6acfa8a1cdfcfa43571e1ca4a0d2722e2d295efdeec:sha256:6d420c32ab5af7b6c6c186aab3b08fff3954c7d4f89e486c7de1032ed65032aa"
        occurred_at: "2026-10-31T13:49:28.265Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610311347-7CPDQV"
        task_revision: 7
      -
        command_digest: "sha256:428472557ef8a1e6da9b8b064f9b5b4ea1ae0697ee0ac3876fc9a8138386338d"
        id: "sha256:2a2da517fb0017f4232bd0d9693d4a6975ecd11274c3f07995fdf64ec982c444:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2a2da517fb0017f4232bd0d9693d4a6975ecd11274c3f07995fdf64ec982c444"
        occurred_at: "2026-10-31T13:55:49.562Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202610311347-7CPDQV"
        task_revision: 8
      -
        command_digest: "sha256:3d5d8a03ed73b68795748c3b0de1640ddb7a03fcde82a2a2ab7d13014628f360"
        id: "result:sha256:dead2be5b79b729adf2a453220edcfd0c5409dcb07463bc9a0c1062561a73834:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:dead2be5b79b729adf2a453220edcfd0c5409dcb07463bc9a0c1062561a73834"
        occurred_at: "2026-10-31T13:55:51.730Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202610311347-7CPDQV"
        task_revision: 9
      -
        command_digest: "sha256:21c2a9f42af758cd22dc557facfe4958623fb2b12992c2ab3f0d7484639350a0"
        id: "kernel_work_item_inspection_required:sha256:aeed723192c7fd8544286bc0cf6ff915ebd14f7856b9dc48206125b0d7a52b1b:sha256:3799eed0c23168f6ae8d36230d77f312f884e6f37ec710986f19f05c491c8513:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:aeed723192c7fd8544286bc0cf6ff915ebd14f7856b9dc48206125b0d7a52b1b:sha256:3799eed0c23168f6ae8d36230d77f312f884e6f37ec710986f19f05c491c8513"
        occurred_at: "2026-10-31T13:55:53.474Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610311347-7CPDQV"
        task_revision: 10
      -
        command_digest: "sha256:1cfb82afdeec26dfea74cbcd994467e2d6c13314490858966311537399457426"
        id: "validation:sha256:5d29710c0ad0cb2c570e4ae58aefd5a96bda42f64504ee4908cb8d770aac58b8:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:5d29710c0ad0cb2c570e4ae58aefd5a96bda42f64504ee4908cb8d770aac58b8"
        occurred_at: "2026-10-31T14:28:03.098Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202610311347-7CPDQV"
        task_revision: 11
      -
        command_digest: "sha256:58e1c5334ab7f48bac149efb351655150c95a18ab47b7216ce0ed740c639d8a5"
        id: "validation-resolution:sha256:2e1486979daf6d10280adbb342d4fbdeec19254aeb8b1a2209154a5f7a593dfe:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:2e1486979daf6d10280adbb342d4fbdeec19254aeb8b1a2209154a5f7a593dfe"
        occurred_at: "2026-10-31T14:28:04.168Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610311347-7CPDQV"
        task_revision: 12
      -
        command_digest: "sha256:3155ab5a3a984e54e5bde314e4aabb75a7f5f5a7b7c1e031cc12467d582260f0"
        id: "kernel_work_item_rework_claim_required:sha256:1a20b558c0d19856de3efcdad6aa4e24d58f3f4b8d19360d700a3c9152f7d038:sha256:3799eed0c23168f6ae8d36230d77f312f884e6f37ec710986f19f05c491c8513:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:1a20b558c0d19856de3efcdad6aa4e24d58f3f4b8d19360d700a3c9152f7d038:sha256:3799eed0c23168f6ae8d36230d77f312f884e6f37ec710986f19f05c491c8513"
        occurred_at: "2026-10-31T14:28:06.200Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610311347-7CPDQV"
        task_revision: 13
      -
        command_digest: "sha256:dca5377fc5e7faf15edaf3d6498aa215613e5a0f9c6d894d4b71ac3a8deaf9da"
        id: "kernel_work_item_execution_required:sha256:52335b6be977eed931ecb401ad70059fe3c8242598671963fc7dbf36e78f926b:sha256:3799eed0c23168f6ae8d36230d77f312f884e6f37ec710986f19f05c491c8513:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:52335b6be977eed931ecb401ad70059fe3c8242598671963fc7dbf36e78f926b:sha256:3799eed0c23168f6ae8d36230d77f312f884e6f37ec710986f19f05c491c8513"
        occurred_at: "2026-10-31T14:28:07.760Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610311347-7CPDQV"
        task_revision: 14
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  task_kernel_lifecycle_migration:
    authority_digest: "sha256:4cf7f5b22ff45570fe1c6e16fd5a5f6792d25b885bb004ad92e5205c460923ac"
    backend_identity: "local-task-readme-v1"
    backup_digest: "sha256:466de5be945a4adacc40d3bc4005e49aedfdaff8635681ca74cf8e4cfc40ce59"
    backup_location: "202610311347-7CPDQV/migration-466de5be945a4adacc40d3bc4005e49aedfdaff8635681ca74cf8e4cfc40ce59.source"
    canonical_digest: "sha256:e7b1c9e9835d759ee6c7d84e4eecb94b83a96fed0956434fd37f3b29f42c9f4f"
    disposition: "kernel_task"
    mapping_digest: "sha256:fc7ddecc9eedcfa07d14fd80c589a5e9f01bfa9fec7d088601c13a0ce7b34e19"
    mapping_receipt:
      blockers: []
      field_mappings:
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "runtime.checkpoints"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "runtime.events"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "runtime.leases"
          target: "migration.source_evidence"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "runtime.mutation_receipts"
          target: "task.mutation_receipts"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "runtime.pending_effects"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "runtime.retry_budgets"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.body"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.comments.0.author"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.comments.0.body"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.depends_on.0"
          target: "migration.source_evidence"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "source.frontmatter.description"
          target: "documents.intent"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.doc_updated_at"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.doc_updated_by"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.doc_version"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.allowed_capabilities.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.allowed_external_effects.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.allowed_repository_effects.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.allowed_repository_effects.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.allowed_repository_effects.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.allowed_repository_effects.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.allowed_repository_effects.4"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.allowed_repository_effects.5"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.allowed_resources"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.forbidden_external_effects.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.forbidden_external_effects.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.forbidden_external_effects.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.forbidden_external_effects.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.forbidden_external_effects.4"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.forbidden_repository_effects.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.forbidden_repository_effects.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.forbidden_repository_effects.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.forbidden_repository_effects.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.10"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.11"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.12"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.13"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.14"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.15"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.16"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.17"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.18"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.4"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.5"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.6"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.7"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.8"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.authority.writable_roots.9"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.external_effects.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.external_effects.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.implementation_uncertainty"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.preferred_mode"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.rationale.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.repository_effects.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.repository_effects.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.repository_effects.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.repository_effects.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.repository_effects.4"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.repository_effects.5"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.requirements_uncertainty"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.reversibility"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.schema_version"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.10"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.11"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.12"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.13"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.14"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.15"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.16"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.17"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.18"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.4"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.5"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.6"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.7"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.8"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.declaration.scope_roots.9"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.observed.authority_violations"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.observed.changed_components"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.observed.changed_paths"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.observed.external_effects"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.observed.repository_effects"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.observed.verification_results"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.reason_codes.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.reason_codes.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.reason_codes.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.reason_codes.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.reason_codes.4"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.reason_codes.5"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.repository_mode"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.safety.approval_effects.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.safety.requires_user_approval"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.safety.requires_worktree"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.schema_version"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.selected_mode"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.source"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.10"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.11"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.12"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.13"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.14"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.15"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.16"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.17"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.18"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.4"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.5"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.6"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.7"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.8"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.components.9"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.evidence_requirements.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.evidence_requirements.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.evidence_requirements.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.evidence_requirements.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.evidence_requirements.4"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.evidence_requirements.5"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.evidence_requirements.6"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.evidence_requirements.7"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.evidence_requirements.8"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.evidence_requirements.9"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.external_effects.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.external_effects.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.repository_effects.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.repository_effects.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.repository_effects.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.repository_effects.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.repository_effects.4"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.repository_effects.5"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.risk.implementation_uncertainty"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.risk.requirements_uncertainty"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.declared.risk.reversibility"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.digest"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.escalation_reasons.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.escalation_reasons.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.escalation_reasons.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.escalation_reasons.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.escalation_reasons.4"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.escalation_reasons.5"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.execution_groups.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.execution_groups.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.execution_groups.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.execution_groups.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.observed.changed_components"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.observed.changed_files"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.observed.external_effects"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.observed.repository_effects"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.phase"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.policy_floor.monotonic_strengthening"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.policy_floor.pr_full_regression"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.policy_floor.unknown_or_central_full_regression"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.requires_full_regression"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.requires_real_e2e"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.schema_version"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selected_checks.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selected_checks.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selected_checks.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selected_checks.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selected_checks.4"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selected_checks.5"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selected_checks.6"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selector.bucket"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selector.buckets"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selector.execution_mode"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selector.kind"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selector.lint_targets"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selector.reason"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selector.run_cli_docs_check"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selector.selected_test_files"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.selector.vitest_pool"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.contract.source"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.required_evidence.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.required_evidence.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.required_evidence.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.required_evidence.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.required_evidence.4"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.required_evidence.5"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.required_evidence.6"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.required_evidence.7"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.required_evidence.8"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_contract.verification.required_evidence.9"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_route.frozen"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_route.reason_codes.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_route.reason_codes.1"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_route.reason_codes.2"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_route.reason_codes.3"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_route.reason_codes.4"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_route.reason_codes.5"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_route.repository_mode"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_route.requested_mode"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_route.schema_version"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.execution_route.selected_mode"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.extensions.task_execution_context.base_ref"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.extensions.task_execution_context.base_sha"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.extensions.task_execution_context.repository_identity"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.extensions.task_execution_context.schema_version"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.extensions.task_execution_context.source"
          target: "migration.source_evidence"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "source.frontmatter.id"
          target: "task.id"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.id_source"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.mutation_scope"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.origin.system"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.owner"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.plan_approval.note"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.plan_approval.state"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.plan_approval.updated_at"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.plan_approval.updated_by"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.priority"
          target: "migration.source_evidence"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "source.frontmatter.revision"
          target: "task.revision"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.risk_flags.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.sections.Findings"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.sections.Plan"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.sections.Rollback Plan"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.sections.Scope"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.sections.Summary"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.sections.Verification"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.sections.Verify Steps"
          target: "migration.source_evidence"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "source.frontmatter.status"
          target: "task.state"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.tags.0"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.task_kind"
          target: "migration.source_evidence"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "source.frontmatter.title"
          target: "documents.intent"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.verification.attempts"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.verification.note"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.verification.state"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.verification.updated_at"
          target: "migration.source_evidence"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "source.frontmatter.verification.updated_by"
          target: "migration.source_evidence"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "source.frontmatter.verify.0"
          target: "documents.intent.acceptance_criteria"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "source.frontmatter.verify.1"
          target: "documents.intent.acceptance_criteria"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "source.frontmatter.verify.2"
          target: "documents.intent.acceptance_criteria"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "source.frontmatter.verify.3"
          target: "documents.intent.acceptance_criteria"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.current_plan"
          target: "task.current_plan"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "task.event_cursor"
          target: "migration.source_evidence"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.final_validation"
          target: "task.final_validation"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.id"
          target: "task.id"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.0.check_ids"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.0.description"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.0.id"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.0.required"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.1.check_ids"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.1.description"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.1.id"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.1.required"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.2.check_ids"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.2.description"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.2.id"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.2.required"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.3.check_ids"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.3.description"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.3.id"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.acceptance_criteria.3.required"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.captured_at"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.constraints"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.request"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.intent.task_id"
          target: "documents.intent + task.intent_digest"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.lifecycle"
          target: "task.state"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "task.plan_amendments"
          target: "migration.source_evidence"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.plan_history"
          target: "task.plan_history"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.revision"
          target: "task.revision"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.schema_version"
          target: "task.schema_version"
        -
          disposition: "retained_evidence"
          reason_code: null
          source_path: "task.updated_at"
          target: "migration.source_evidence"
        -
          disposition: "kernel_owner"
          reason_code: null
          source_path: "task.work_items"
          target: "task.work_items"
      mapping_version: "task-kernel-lifecycle-owner-v1"
      pending:
        checkpoint_refs: []
        checkpoint_revisions: []
        effect_operation_ids: []
        lease_ids: []
        work_item_ids: []
      retained:
        authority_lease_digests: []
        mutation_receipt_digests: []
        output_manifest_digests: []
        plan_digest: null
        validation_digests: []
      semantic_assessment_fields: []
      source_runtime_digest: "sha256:d087ce6d7c49bb44c078928b5c50d6aea2a560c827e34a795e26151a2275c014"
      source_task_digest: "sha256:a659908d5cf135a430f09fb600545184125c51b9a730fd42c8e76eccf8dacb45"
    migration_version: "task-kernel-lifecycle-owner-v1"
    output_revision: 2
    policy_digest: "sha256:fb0899fd737956619eda625f6e329de0eaeb7222183d670368943aa36abd7bad"
    projection_digest: "sha256:1897e50561800509885578a76037d1a4f2b61b00e7757e4ecae9254ac5943149"
    receipt_digest: "sha256:fe8d55f7533d8220f8c46f093c7b38ce4416009d6497d892f4106b5be16e23a8"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    semantic_assessment: null
    semantic_assessment_digest: null
    source_digest: "sha256:466de5be945a4adacc40d3bc4005e49aedfdaff8635681ca74cf8e4cfc40ce59"
    source_revision: 1
    state_fingerprint_digest: "sha256:3d3996bdf05b7a1928be0ad2f164ba3ef650e40cc7d502c30f64637b0ac40f28"
    task_id: "202610311347-7CPDQV"
id_source: "explicit"
---
## Summary

Completed-scope observations can replace inherited verification coverage and leave an interrupted metadata projection unreadable. A legacy README and embedded aggregate revision split also prevents Factory Doctor and protected integration. Preserve inherited verification contracts, add exact source-bound recovery for the interrupted completed-scope projection, and extend existing kernel-migrate apply with guarded revision-split quarantine and byte-exact rollback. Preserve Kernel completion, original history, evidence, data, credentials and runtime guards. Confine source changes to the nineteen declared roots. Qualify public Node workflows, drift and interruption refusals, replay, retained-source diagnostics and rollback with full native CI and a fresh EVALUATOR before protected canonical PR and merge. Operational repair of original VPB, the ten Factory Tasks and sb remains a separate operator step after publication. Preserve all existing worktrees, branches, archives and unrelated user changes; no cleanup or host effects belong to this source Task.

## Scope

Only the nineteen declared source paths. Operational repair of original Tasks, runtime state, credentials and deployment remains separate after publication.

## Plan

1. Execute approved WorkItem preserve-verification-floor-and-qualify-bounded-native-recovery.

## Verify Steps

- bun run ci:local:full
- bun run test:project agentplane --run packages/agentplane/src/commands/task/completed-projection-recovery.test.ts packages/agentplane/src/runtime/task-routing/resolve.test.ts packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts packages/agentplane/src/commands/task/verify-record.inherited-provider-base.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/task/external-agent-workflow-recovery.test.ts packages/agentplane/src/commands/task/scope-extend.command.test.ts packages/agentplane/src/commands/task/migration-quarantine.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts packages/agentplane/src/commands/task/roadmap-integration-parity.test.ts packages/agentplane/src/cli/legacy-cli-regressions.test.ts
- bun run docs:cli:check
- node .agentplane/policy/check-routing.mjs

## Verification

Pending native checks, fresh EVALUATOR and protected publication. No PASS evidence is supplied by this intake.

## Rollback Plan

Preserve source, original Task records, protected journals and runtime state. Revert published source through canonical review if necessary. The new native migration retains exact intake backup and guarded CAS rollback.

## Findings

The user authorized temporary canonical CLI5610a273 for this new Task only. Standard task new is blocked by unrelated archived source authentication. The supported single-record import and exact migration route was qualified in a private fixture. This intake grants no approval or execution result.

The corrected intake declares the frozen branch_pr route in addition to its native-resolved execution contract. The earlier incomplete intake 202610311338-RWNBCR remains BLOCKED. No source code was changed there.
