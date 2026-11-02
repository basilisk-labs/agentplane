---
id: "202611021850-PPSWB1"
title: "Publish retry-safe exact native quarantine artifacts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "publish"
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-11-02T18:50:33.119Z"
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
    - "effect_publish"
    - "effect_release_metadata"
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
      - "release_metadata"
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
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
    writable_roots:
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
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
          - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
          - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
          - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
          - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:ffc3b70d94ea114a513cb66dd742a954302e8caeabce05fe0a1fdb7b7fe7fefa"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
        - "effect_release_metadata"
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
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-11-02T18:50:09.090Z"
doc_updated_by: "CODER"
description: "Complete the user-approved exact seven-file quarantine publication for sb. Port immutable approved source89f99678 and fix verified review PRRT_kwDORCLmJM6yyPJy. Preserve old completed Task, PR6968, data, credentials and guards. No historical Task execution or DONE/PASS assignment."
sections:
  Summary: |-
    Publish retry-safe exact native quarantine artifacts

    Complete the user-approved exact seven-file quarantine publication for sb. Port immutable approved source89f99678 and fix verified review PRRT_kwDORCLmJM6yyPJy. Preserve old completed Task, PR6968, data, credentials and guards. No historical Task execution or DONE/PASS assignment.
  Scope: |-
    - In scope: Complete the user-approved exact seven-file quarantine publication for sb. Port immutable approved source89f99678 and fix verified review PRRT_kwDORCLmJM6yyPJy. Preserve old completed Task, PR6968, data, credentials and guards. No historical Task execution or DONE/PASS assignment.
    - Out of scope: unrelated refactors not required for "Publish retry-safe exact native quarantine artifacts".
  Plan: "1. Execute approved WorkItem retry-safe-native-quarantine-publication."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    base_sha: "fd98a4b4f1c85e82f7c8a35f7297d5985c41f7ba"
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
            digest: "sha256:4f27b06e741af16f59721a118b4fb3a4eb7e410f648158e7172eef178d7e92cc"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:5db9ac57ca20ca13de886ad97448a0724edbefb56fa21cea8372d18d6f0619d2"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:ce5d8c14a927743783cf3c2eae2016e346f60902d6778e42090025eed4cc7fef"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            task_id: "202611021850-PPSWB1"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
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
            digest: "sha256:362f9c80d7c1d830ccca8ebe4618bd1169820bb548ad7fc95c8ca8aab70a9edf"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:5db9ac57ca20ca13de886ad97448a0724edbefb56fa21cea8372d18d6f0619d2"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:ce5d8c14a927743783cf3c2eae2016e346f60902d6778e42090025eed4cc7fef"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:4f27b06e741af16f59721a118b4fb3a4eb7e410f648158e7172eef178d7e92cc"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7e0420167bc7542c18647e7767ef25cd78de8960cf1e0814ecbe259e851b3423"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            task_id: "202611021850-PPSWB1"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:054c02b2d558bb27863d78938a8a0556a78eb706333f72390acbd3caf285b648"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:ce5d8c14a927743783cf3c2eae2016e346f60902d6778e42090025eed4cc7fef"
        digest: "sha256:5db9ac57ca20ca13de886ad97448a0724edbefb56fa21cea8372d18d6f0619d2"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:999d7e8c7f4e497f14b8fcb3d21729463a6bfb93827446c54af0a18f8e5068bb"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "release_metadata"
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            expected_outputs:
              - "exact-seven-source"
              - "retry-safety-evidence"
            id: "retry-safe-native-quarantine-publication"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202611021850-PPSWB1"
      intent_digest: "sha256:b92abb35d43139b568be6648337051bd52ff02b7a3afbf18a1c3c647777996a8"
      migration_receipts: []
      mutation_receipts:
        capture:202611021850-PPSWB1:
          after_revision: 1
          aggregate_digest: "sha256:6cd215eda82c70b34630068a58457d38b443d9fb6ba2d8657652897f84de373b"
          before_revision: 0
          command_digest: "sha256:740a904d9e9960e558eeb57c6c0091f1eea85865ea443a3972c212c8b944970b"
          effect_ids: []
          event_digests:
            - "sha256:80480ca3e49b3a8cadc196aa59d1b61cc413f806f2829b03eb89abda9eab4ea8"
          mutation_id: "capture:202611021850-PPSWB1"
        kernel_work_item_claim_required:sha256:80527dded95defff1fdc66b1aaa273591a5ff02ae8dd2a9008e5abfcee7c9393:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5:
          after_revision: 5
          aggregate_digest: "sha256:1eb6031acf4a23eed68791cc8af6d4a11957bcc589bda460c32227d142e91692"
          before_revision: 4
          command_digest: "sha256:e54ef70d05b9e8b01f64b85af995b30e3acb8a6200be434db55f73042d462c86"
          effect_ids: []
          event_digests:
            - "sha256:e45c7e91fa88adfe9a95b5b00fa974fbb1ac3972f67543275608e747020be825"
          mutation_id: "kernel_work_item_claim_required:sha256:80527dded95defff1fdc66b1aaa273591a5ff02ae8dd2a9008e5abfcee7c9393:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
        kernel_work_item_execution_required:sha256:af0ea2db068e1f364a3b1af601fc99798a5b9c71c9e6a53e3e9e9eb4a46fcb54:sha256:7e0420167bc7542c18647e7767ef25cd78de8960cf1e0814ecbe259e851b3423:
          after_revision: 7
          aggregate_digest: "sha256:a93351b95d0046cbd0027106f465b77ac342e78e6f9c10f5f91656a18249e1ee"
          before_revision: 6
          command_digest: "sha256:c6b6ed585708b4ce89b8d8cdc3ef1f99ad769c6706757bf70c74c5c39b37a615"
          effect_ids: []
          event_digests:
            - "sha256:3d0479619aacfb4e45d0bedcac5311adcf926899ed6ccec3e4e1d341d3abaa8f"
          mutation_id: "kernel_work_item_execution_required:sha256:af0ea2db068e1f364a3b1af601fc99798a5b9c71c9e6a53e3e9e9eb4a46fcb54:sha256:7e0420167bc7542c18647e7767ef25cd78de8960cf1e0814ecbe259e851b3423"
        kernel_work_item_materialization_required:sha256:f651be07b8f1af258c958bb46f45fbd06213c320550f3488fde4aa530398aacf:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5:
          after_revision: 4
          aggregate_digest: "sha256:4e4ed6cb755560bfe8340aaf64eb309057102164b2e2273d43d6ae0080979fcd"
          before_revision: 3
          command_digest: "sha256:3857e5226dec442a0f42b3c9349cb878ce844112dfc20cee69ffc69613453cff"
          effect_ids: []
          event_digests:
            - "sha256:ef5b82d3055175794bed33f975d74f16e44bb7d8406590048c190e784e83b8d3"
          mutation_id: "kernel_work_item_materialization_required:sha256:f651be07b8f1af258c958bb46f45fbd06213c320550f3488fde4aa530398aacf:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
        plan:sha256:5db9ac57ca20ca13de886ad97448a0724edbefb56fa21cea8372d18d6f0619d2:
          after_revision: 2
          aggregate_digest: "sha256:c2242791c1d6a789c8366ef3b3ae7fa5f1ad71b6532ca433a198822bbce7792e"
          before_revision: 1
          command_digest: "sha256:09f3d8c339b99815cc68c66493c8057103679b35829bdfb267544719d74a8dd1"
          effect_ids: []
          event_digests:
            - "sha256:4c0a7f874459b8aedb6723b58fe2a2492a0f9c734e26fd82ab876aa75ec2c025"
          mutation_id: "plan:sha256:5db9ac57ca20ca13de886ad97448a0724edbefb56fa21cea8372d18d6f0619d2"
        sha256:925cebc517564fe73c43363dfdb88db2d25f45db7a92d10048725bd92d3a77d6:
          after_revision: 6
          aggregate_digest: "sha256:60c6701de56d59848a2b44f2a14fb0e6ec635d38fe8575dd1bda71695d572207"
          before_revision: 5
          command_digest: "sha256:a68729513ec4da07e3c2f1fb0b6901903da80a4fee58b7cc372f6f03b58bb7b5"
          effect_ids: []
          event_digests:
            - "sha256:e6cb0ff13e5223f5aad1d8523e7f20c571df33954aa798b013e9ed49cbc7f578"
          mutation_id: "sha256:925cebc517564fe73c43363dfdb88db2d25f45db7a92d10048725bd92d3a77d6"
        sha256:d23d22fad44c0b4fe254fc5ea85ce46b41b39f2f11ccde5fd340982abf0e707f:
          after_revision: 3
          aggregate_digest: "sha256:26fb6c6842127a7218ade6eea0a94af5fdfa2ed6a9284454bb1197f0cb3c2b4a"
          before_revision: 2
          command_digest: "sha256:a2ba2757075ae254bc6fd95dbc5305156e98136af01f7b2b5f344574dc37e9d5"
          effect_ids: []
          event_digests:
            - "sha256:203c4e553080666bd4b17b4936c00d749e1a211f703f878bf256aeba467c6f86"
          mutation_id: "sha256:d23d22fad44c0b4fe254fc5ea85ce46b41b39f2f11ccde5fd340982abf0e707f"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        retry-safe-native-quarantine-publication:
          attempt: 1
          claim_id: "sha256:0fe4c68dd84e0bb15f85b5ef04dc5f7fa2f5f11a164602771dbea83c64cd5a9f"
          definition:
            contract_digest: "sha256:999d7e8c7f4e497f14b8fcb3d21729463a6bfb93827446c54af0a18f8e5068bb"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "release_metadata"
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            expected_outputs:
              - "exact-seven-source"
              - "retry-safety-evidence"
            id: "retry-safe-native-quarantine-publication"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:07bf04378178ea0952b26820125a01d1a099975bb443d9a10a0a3b8d084fc091"
    documents:
      contracts:
        sha256:999d7e8c7f4e497f14b8fcb3d21729463a6bfb93827446c54af0a18f8e5068bb:
          acceptance_criteria:
            - "Import exactly the approved seven source files from commit89f99678a10a9bf7f5f4dc370d334b108da15049 without importing prior Task artifacts or rewriting original history."
            - "After a commit hook rejects a native adopted quarantine pair with changed_paths empty, a retry succeeds only for the same persisted intent and freshly authenticated exact bytes. Changed bytes, unapproved paths and unrelated staged edits still fail closed."
            - "Retain all native quarantine proof, approved scope, Git base, raw backup, configured workflow_dir, owner and rollback guards. Run the unchanged full local CI and focused regression commands and provide evidence for independent native EVALUATOR review."
          objective: "Publish the approved exact native quarantine artifact admission from immutable89f99678a10a9bf7f5f4dc370d334b108da15049 with the reviewed staged-hook retry regression fixed. Port only the seven approved source paths, never foreign Task metadata. Reproduce review PRRT_kwDORCLmJM6yyPJy before fixing retained-intent admission using a fresh exact native quarantine proof."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
            - "bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
      intent:
        context: "Complete the user-approved exact seven-file quarantine publication for sb. Port immutable approved source89f99678 and fix verified review PRRT_kwDORCLmJM6yyPJy. Preserve old completed Task, PR6968, data, credentials and guards. No historical Task execution or DONE/PASS assignment."
        objective: "Publish retry-safe exact native quarantine artifacts"
    events:
      -
        command_digest: "sha256:740a904d9e9960e558eeb57c6c0091f1eea85865ea443a3972c212c8b944970b"
        id: "capture:202611021850-PPSWB1:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202611021850-PPSWB1"
        occurred_at: "2026-11-02T18:50:09.068Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202611021850-PPSWB1"
        task_revision: 1
      -
        command_digest: "sha256:09f3d8c339b99815cc68c66493c8057103679b35829bdfb267544719d74a8dd1"
        id: "plan:sha256:5db9ac57ca20ca13de886ad97448a0724edbefb56fa21cea8372d18d6f0619d2:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:5db9ac57ca20ca13de886ad97448a0724edbefb56fa21cea8372d18d6f0619d2"
        occurred_at: "2026-11-02T18:50:27.469Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202611021850-PPSWB1"
        task_revision: 2
      -
        command_digest: "sha256:a2ba2757075ae254bc6fd95dbc5305156e98136af01f7b2b5f344574dc37e9d5"
        id: "sha256:d23d22fad44c0b4fe254fc5ea85ce46b41b39f2f11ccde5fd340982abf0e707f:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:d23d22fad44c0b4fe254fc5ea85ce46b41b39f2f11ccde5fd340982abf0e707f"
        occurred_at: "2026-11-02T18:50:31.695Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202611021850-PPSWB1"
        task_revision: 3
      -
        command_digest: "sha256:3857e5226dec442a0f42b3c9349cb878ce844112dfc20cee69ffc69613453cff"
        id: "kernel_work_item_materialization_required:sha256:f651be07b8f1af258c958bb46f45fbd06213c320550f3488fde4aa530398aacf:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:f651be07b8f1af258c958bb46f45fbd06213c320550f3488fde4aa530398aacf:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
        occurred_at: "2026-11-02T18:50:38.490Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202611021850-PPSWB1"
        task_revision: 4
      -
        command_digest: "sha256:e54ef70d05b9e8b01f64b85af995b30e3acb8a6200be434db55f73042d462c86"
        id: "kernel_work_item_claim_required:sha256:80527dded95defff1fdc66b1aaa273591a5ff02ae8dd2a9008e5abfcee7c9393:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:80527dded95defff1fdc66b1aaa273591a5ff02ae8dd2a9008e5abfcee7c9393:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
        occurred_at: "2026-11-02T18:50:45.573Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202611021850-PPSWB1"
        task_revision: 5
      -
        command_digest: "sha256:a68729513ec4da07e3c2f1fb0b6901903da80a4fee58b7cc372f6f03b58bb7b5"
        id: "sha256:925cebc517564fe73c43363dfdb88db2d25f45db7a92d10048725bd92d3a77d6:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:925cebc517564fe73c43363dfdb88db2d25f45db7a92d10048725bd92d3a77d6"
        occurred_at: "2026-11-02T18:51:32.357Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202611021850-PPSWB1"
        task_revision: 6
      -
        command_digest: "sha256:c6b6ed585708b4ce89b8d8cdc3ef1f99ad769c6706757bf70c74c5c39b37a615"
        id: "kernel_work_item_execution_required:sha256:af0ea2db068e1f364a3b1af601fc99798a5b9c71c9e6a53e3e9e9eb4a46fcb54:sha256:7e0420167bc7542c18647e7767ef25cd78de8960cf1e0814ecbe259e851b3423:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:af0ea2db068e1f364a3b1af601fc99798a5b9c71c9e6a53e3e9e9eb4a46fcb54:sha256:7e0420167bc7542c18647e7767ef25cd78de8960cf1e0814ecbe259e851b3423"
        occurred_at: "2026-11-02T18:51:35.446Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202611021850-PPSWB1"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Publish retry-safe exact native quarantine artifacts

Complete the user-approved exact seven-file quarantine publication for sb. Port immutable approved source89f99678 and fix verified review PRRT_kwDORCLmJM6yyPJy. Preserve old completed Task, PR6968, data, credentials and guards. No historical Task execution or DONE/PASS assignment.

## Scope

- In scope: Complete the user-approved exact seven-file quarantine publication for sb. Port immutable approved source89f99678 and fix verified review PRRT_kwDORCLmJM6yyPJy. Preserve old completed Task, PR6968, data, credentials and guards. No historical Task execution or DONE/PASS assignment.
- Out of scope: unrelated refactors not required for "Publish retry-safe exact native quarantine artifacts".

## Plan

1. Execute approved WorkItem retry-safe-native-quarantine-publication.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
