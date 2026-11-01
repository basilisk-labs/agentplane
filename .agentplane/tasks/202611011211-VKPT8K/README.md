---
id: "202611011211-VKPT8K"
title: "Publish exact native quarantine artifacts without resuming historical Tasks"
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
  updated_at: "2026-11-01T12:18:26.030Z"
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
doc_updated_at: "2026-11-01T12:12:20.442Z"
doc_updated_by: "CODER"
description: "Implement the explicitly USER-approved seven-file native quarantine publication admission. Reuse one shared read-only proof classifier in canonical dirty-baseline adoption and branch PR foreign-task ownership. Require approved exact per-foreignTask directory scope and security-boundary/repository-write authority. Bind source bytes to the exact Git comparison base, logical repository/backend identity, genuine native revision-split mapping, exact quarantineAfterimage and exact content-addressed raw source backup. Admit only README and that backup. Refuse arbitrary broad scope, forged or altered marker/body/backup, wrong base/source/repository, extra/deleted/renamed/linked/missing/unstable foreign artifacts and unproven history. Preserve existing Task/batch/import/cleanup rules. Historical Tasks stay BLOCKED; never run old WorkItems or assign DONE/PASS/CANCELLED or classify unknown effects. Verify actual byte/Git/coordinator/publication integration and negative cases, full mandatory CI and independent EVALUATOR, protected canonical PR/merge and current CLI qualification before actual Factory publication. Preserve all existing branches, worktrees, archives, runtime data, credentials and guards. No new public CLI/schema/dependencies or runtime effects."
sections:
  Summary: |-
    Publish exact native quarantine artifacts without resuming historical Tasks

    Implement the explicitly USER-approved seven-file native quarantine publication admission. Reuse one shared read-only proof classifier in canonical dirty-baseline adoption and branch PR foreign-task ownership. Require approved exact per-foreignTask directory scope and security-boundary/repository-write authority. Bind source bytes to the exact Git comparison base, logical repository/backend identity, genuine native revision-split mapping, exact quarantineAfterimage and exact content-addressed raw source backup. Admit only README and that backup. Refuse arbitrary broad scope, forged or altered marker/body/backup, wrong base/source/repository, extra/deleted/renamed/linked/missing/unstable foreign artifacts and unproven history. Preserve existing Task/batch/import/cleanup rules. Historical Tasks stay BLOCKED; never run old WorkItems or assign DONE/PASS/CANCELLED or classify unknown effects. Verify actual byte/Git/coordinator/publication integration and negative cases, full mandatory CI and independent EVALUATOR, protected canonical PR/merge and current CLI qualification before actual Factory publication. Preserve all existing branches, worktrees, archives, runtime data, credentials and guards. No new public CLI/schema/dependencies or runtime effects.
  Scope: |-
    - In scope: Implement the explicitly USER-approved seven-file native quarantine publication admission. Reuse one shared read-only proof classifier in canonical dirty-baseline adoption and branch PR foreign-task ownership. Require approved exact per-foreignTask directory scope and security-boundary/repository-write authority. Bind source bytes to the exact Git comparison base, logical repository/backend identity, genuine native revision-split mapping, exact quarantineAfterimage and exact content-addressed raw source backup. Admit only README and that backup. Refuse arbitrary broad scope, forged or altered marker/body/backup, wrong base/source/repository, extra/deleted/renamed/linked/missing/unstable foreign artifacts and unproven history. Preserve existing Task/batch/import/cleanup rules. Historical Tasks stay BLOCKED; never run old WorkItems or assign DONE/PASS/CANCELLED or classify unknown effects. Verify actual byte/Git/coordinator/publication integration and negative cases, full mandatory CI and independent EVALUATOR, protected canonical PR/merge and current CLI qualification before actual Factory publication. Preserve all existing branches, worktrees, archives, runtime data, credentials and guards. No new public CLI/schema/dependencies or runtime effects.
    - Out of scope: unrelated refactors not required for "Publish exact native quarantine artifacts without resuming historical Tasks".
  Plan: "1. Execute approved WorkItem native-quarantine-artifact-publication."
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
    base_sha: "83408fc11bb53298034ecca47b23ff1f28d054dd"
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
            digest: "sha256:e190f073bef6fd2bc208fe1ee170d277baceefa15693ecb4f9f58bd165c920f8"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:5db81e73cfc30a84dd9691b527d55a189065f179b2fd35bb9209adfe45b0a66a"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:c860bcef9aa171f312ee439de5ae185ee09c86b57084416f4654c1d816d1483d"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
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
            task_id: "202611011211-VKPT8K"
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
            digest: "sha256:d2e26432e182546dcad83ef2d7dc601c09d2683054586584debe976b98039bbe"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:5db81e73cfc30a84dd9691b527d55a189065f179b2fd35bb9209adfe45b0a66a"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c860bcef9aa171f312ee439de5ae185ee09c86b57084416f4654c1d816d1483d"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:e190f073bef6fd2bc208fe1ee170d277baceefa15693ecb4f9f58bd165c920f8"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62"
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
            task_id: "202611011211-VKPT8K"
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
            evidence_digest: "sha256:4a4dcf8bda64b44597c06419976345f14809148bd546996276d3e33dcbbc04a9"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:c860bcef9aa171f312ee439de5ae185ee09c86b57084416f4654c1d816d1483d"
        digest: "sha256:5db81e73cfc30a84dd9691b527d55a189065f179b2fd35bb9209adfe45b0a66a"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:9d51fb53d4b9379ae22acd31f5162186dcf6b8cbece3d0de3630973a1d1182df"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
            expected_outputs:
              - "native-quarantine-publication-source"
              - "native-quarantine-publication-coverage"
            id: "native-quarantine-artifact-publication"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202611011211-VKPT8K"
      intent_digest: "sha256:998e4f6b692c3c0c740726474960326f2fad56ebc1dc4fbaa0fd256575a515a7"
      migration_receipts: []
      mutation_receipts:
        capture:202611011211-VKPT8K:
          after_revision: 1
          aggregate_digest: "sha256:bad1f35a175c550a9d14c60bdbd5970b5569bfa57e6a82231a143c1f8c4c6097"
          before_revision: 0
          command_digest: "sha256:6c476412f48b6faa3a5dd7f31a456022e88488325eec9a779c98a1fa569999ce"
          effect_ids: []
          event_digests:
            - "sha256:32bbecb2653afd7cbaea6278febcd18b904cb91f2886b5912583e340caff39a7"
          mutation_id: "capture:202611011211-VKPT8K"
        kernel_work_item_claim_required:sha256:1f7be30635ee3415ae6145c836976895046e84331a065b89565269dc236266e7:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:
          after_revision: 5
          aggregate_digest: "sha256:1fe64624cf7a782107ca40633a3f16c14402bc1e4ee247a7e7efffe5b549fa99"
          before_revision: 4
          command_digest: "sha256:47f3fb29abcb89eac9ce27425c9ff66e08df853b3bca7f62682d115806975e76"
          effect_ids: []
          event_digests:
            - "sha256:3adb0068c74fb6d1515e9938d5e8521607025aaf021b1e1c3d5dab26677968bc"
          mutation_id: "kernel_work_item_claim_required:sha256:1f7be30635ee3415ae6145c836976895046e84331a065b89565269dc236266e7:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        kernel_work_item_execution_required:sha256:4ab7532f20f0cfa7a94b9eaf6b959a5b73df2f8e6660f50cdca7f0e53c86de7c:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62:
          after_revision: 7
          aggregate_digest: "sha256:4377eab85bed6f390759526c38063c8fae9ff6d79172082868ce2eb0b76668f9"
          before_revision: 6
          command_digest: "sha256:30cf2b443ff8372f75a2c766d07911fcfa993a6c198518229cecca4323ab06da"
          effect_ids: []
          event_digests:
            - "sha256:25dd4d6f25d770359febedd3489debd6f449d5fa640cde61466c0aab226083fd"
          mutation_id: "kernel_work_item_execution_required:sha256:4ab7532f20f0cfa7a94b9eaf6b959a5b73df2f8e6660f50cdca7f0e53c86de7c:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62"
        kernel_work_item_materialization_required:sha256:e2f178a86f1fab76fe59a798ab734c2d3f1e283753f4916ffedea8a4d0998afd:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:
          after_revision: 4
          aggregate_digest: "sha256:00c771d97077081b5508972f42be837d06750dc7bc7232796882bdd67d1be361"
          before_revision: 3
          command_digest: "sha256:9ee3e907a267cc9ef35d8df2bd8bec3c177ae2b294cf874c96a670efd83fd05d"
          effect_ids: []
          event_digests:
            - "sha256:c2e4a9eba4a74ebb24a7e12e5f92d211d4d231a6c0d8671780429b9a22ff113a"
          mutation_id: "kernel_work_item_materialization_required:sha256:e2f178a86f1fab76fe59a798ab734c2d3f1e283753f4916ffedea8a4d0998afd:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        result:sha256:ced3d89c2112e1959e87e63cb71d258f1648b2c95849bbe6070befc8994b1ee6:
          after_revision: 2
          aggregate_digest: "sha256:fcd19b4f1cacd8657a69b33d002ad6744d41e54610e1007f4f90cde25bbefc60"
          before_revision: 1
          command_digest: "sha256:9a9f840f5d83b2f82c70f136f7db629e71541a5adb7d866eb7a36f6c72e94a6b"
          effect_ids: []
          event_digests:
            - "sha256:771cf9831d7691dc56c2174ebbe637fb23eec4c71b7d2cf1494da9f66fce0a0a"
          mutation_id: "result:sha256:ced3d89c2112e1959e87e63cb71d258f1648b2c95849bbe6070befc8994b1ee6"
        sha256:417833e50f85951113796e92bd248cec2137ddc541ff1bcc0a2d546f81d4879b:
          after_revision: 3
          aggregate_digest: "sha256:4b7aedb4c073597ffcddb8ada39812f361f50c5759664dbf33d0db07bb8d7f69"
          before_revision: 2
          command_digest: "sha256:650f6a2530570e9f8d86a94dc99c915c0cd691b5bb4a89017566995c8f787325"
          effect_ids: []
          event_digests:
            - "sha256:f05f5570b9bcb69e8e32205514d0a647fb9269878542af3d8dd723e92cb8ebe1"
          mutation_id: "sha256:417833e50f85951113796e92bd248cec2137ddc541ff1bcc0a2d546f81d4879b"
        sha256:c38e56f926975bfd106355f0b36a6246174c226e670b26a975bcf907513bc6e6:
          after_revision: 6
          aggregate_digest: "sha256:7dd900468b5d33c547f28001307f726920e47829072a147f2e4603e8e0cfd127"
          before_revision: 5
          command_digest: "sha256:4e99888be69bdd062c66613d24ebfed2c1efb631a2c5632a15b494757d31e694"
          effect_ids: []
          event_digests:
            - "sha256:03ad3d8d52738710fe14e933694a9695227b87e31dd8cb6b1cae02f77d7c37fb"
          mutation_id: "sha256:c38e56f926975bfd106355f0b36a6246174c226e670b26a975bcf907513bc6e6"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        native-quarantine-artifact-publication:
          attempt: 1
          claim_id: "sha256:781fc4f1f64c8273f61eaedcc7b0bbd7aee6f53f19be268ee17fa70e5775be66"
          definition:
            contract_digest: "sha256:9d51fb53d4b9379ae22acd31f5162186dcf6b8cbece3d0de3630973a1d1182df"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
            expected_outputs:
              - "native-quarantine-publication-source"
              - "native-quarantine-publication-coverage"
            id: "native-quarantine-artifact-publication"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:cce9e32c48fe3af9d0e400daf33fff38f4a85aab0f24c512d4f29c194c002968"
    documents:
      contracts:
        sha256:9d51fb53d4b9379ae22acd31f5162186dcf6b8cbece3d0de3630973a1d1182df:
          acceptance_criteria:
            - "Reuse one shared read-only native quarantine artifact proof in canonical baseline adoption and branch task-artifact ownership. Keep normal own-Task, verified batch, canonical import and scoped volatile cleanup behavior unchanged."
            - "Admit only an approved operator Task with exact individual foreign Task directory roots and repository_write/security_boundary authority. Cross-check the issued WorkOrder for baseline adoption. Broad workflow/Task roots, unapproved or expired authority, foreign repository, unapproved Plan and missing native identity confer no admission."
            - "For each admitted foreign Task, bind the original README raw bytes to the exact Git base. Recompute native revision-split preview and mapping; authenticate marker repository/backend/task/source/mapping/output identities, exact quarantineAfterimage, BLOCKED outer status and exact content-addressed raw source backup. Preserve all historical WorkItems, genuine results and diagnostics inside the original bytes. Do not assign historical DONE/PASS/CANCELLED or execute historical work."
            - "Admit only that foreign README and expected backup. Refuse extras, deletion/rename, wrong or absent base source, changed or forged marker/body/backup/repo identity, unsafe symlink/hardlink/directory paths and source changes during read/stage/publication. Use existing stable contained read and native quarantine primitives. Do not create a generic foreign-artifact or dirty-baseline waiver."
            - "Canonical baseline adoption must include exact already dirty native quarantine outputs under approved foreign Task directory roots, even though those protected paths were excluded from normal source observation. Every adopted path must pass the same proof and current WorkOrder scope. Retain existing dirty-baseline/commit-intent/error/unknown-effect checks."
            - "Verify real Git and byte fixtures plus coordinator and PR guard integration. Preserve existing assertions and cover positive proof, exact scope, custom Task directories, wrong base/repository/source/mapping/marker/backup, additional files, history/deletion/rename, symlinks/hardlinks and retained beforeimages. Verify refusal leaves inputs unchanged."
            - "Complete both declared native mandatory commands and independent EVALUATOR. Publish through protected canonical PR/merge and qualify current main CLI before actual Factory publication. Source WorkItem has no Factory, host, credential, guard, external-write or destructive-Git authority. Preserve all old branches/worktrees/backups and genuine failures."
          objective: "Admit publication only for exact native BLOCKED quarantine afterimages and raw backups under explicitly approved per-Task scope and exact Git base. Preserve all other ownership and execution guards."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
            - "bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
      intent:
        context: "Implement the explicitly USER-approved seven-file native quarantine publication admission. Reuse one shared read-only proof classifier in canonical dirty-baseline adoption and branch PR foreign-task ownership. Require approved exact per-foreignTask directory scope and security-boundary/repository-write authority. Bind source bytes to the exact Git comparison base, logical repository/backend identity, genuine native revision-split mapping, exact quarantineAfterimage and exact content-addressed raw source backup. Admit only README and that backup. Refuse arbitrary broad scope, forged or altered marker/body/backup, wrong base/source/repository, extra/deleted/renamed/linked/missing/unstable foreign artifacts and unproven history. Preserve existing Task/batch/import/cleanup rules. Historical Tasks stay BLOCKED; never run old WorkItems or assign DONE/PASS/CANCELLED or classify unknown effects. Verify actual byte/Git/coordinator/publication integration and negative cases, full mandatory CI and independent EVALUATOR, protected canonical PR/merge and current CLI qualification before actual Factory publication. Preserve all existing branches, worktrees, archives, runtime data, credentials and guards. No new public CLI/schema/dependencies or runtime effects."
        objective: "Publish exact native quarantine artifacts without resuming historical Tasks"
    events:
      -
        command_digest: "sha256:6c476412f48b6faa3a5dd7f31a456022e88488325eec9a779c98a1fa569999ce"
        id: "capture:202611011211-VKPT8K:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202611011211-VKPT8K"
        occurred_at: "2026-11-01T12:12:20.327Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202611011211-VKPT8K"
        task_revision: 1
      -
        command_digest: "sha256:9a9f840f5d83b2f82c70f136f7db629e71541a5adb7d866eb7a36f6c72e94a6b"
        id: "result:sha256:ced3d89c2112e1959e87e63cb71d258f1648b2c95849bbe6070befc8994b1ee6:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:ced3d89c2112e1959e87e63cb71d258f1648b2c95849bbe6070befc8994b1ee6"
        occurred_at: "2026-11-01T12:16:28.918Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202611011211-VKPT8K"
        task_revision: 2
      -
        command_digest: "sha256:650f6a2530570e9f8d86a94dc99c915c0cd691b5bb4a89017566995c8f787325"
        id: "sha256:417833e50f85951113796e92bd248cec2137ddc541ff1bcc0a2d546f81d4879b:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:417833e50f85951113796e92bd248cec2137ddc541ff1bcc0a2d546f81d4879b"
        occurred_at: "2026-11-01T12:18:20.513Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202611011211-VKPT8K"
        task_revision: 3
      -
        command_digest: "sha256:9ee3e907a267cc9ef35d8df2bd8bec3c177ae2b294cf874c96a670efd83fd05d"
        id: "kernel_work_item_materialization_required:sha256:e2f178a86f1fab76fe59a798ab734c2d3f1e283753f4916ffedea8a4d0998afd:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:e2f178a86f1fab76fe59a798ab734c2d3f1e283753f4916ffedea8a4d0998afd:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        occurred_at: "2026-11-01T12:18:48.984Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202611011211-VKPT8K"
        task_revision: 4
      -
        command_digest: "sha256:47f3fb29abcb89eac9ce27425c9ff66e08df853b3bca7f62682d115806975e76"
        id: "kernel_work_item_claim_required:sha256:1f7be30635ee3415ae6145c836976895046e84331a065b89565269dc236266e7:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:1f7be30635ee3415ae6145c836976895046e84331a065b89565269dc236266e7:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        occurred_at: "2026-11-01T12:19:50.975Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202611011211-VKPT8K"
        task_revision: 5
      -
        command_digest: "sha256:4e99888be69bdd062c66613d24ebfed2c1efb631a2c5632a15b494757d31e694"
        id: "sha256:c38e56f926975bfd106355f0b36a6246174c226e670b26a975bcf907513bc6e6:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:c38e56f926975bfd106355f0b36a6246174c226e670b26a975bcf907513bc6e6"
        occurred_at: "2026-11-01T12:23:04.165Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202611011211-VKPT8K"
        task_revision: 6
      -
        command_digest: "sha256:30cf2b443ff8372f75a2c766d07911fcfa993a6c198518229cecca4323ab06da"
        id: "kernel_work_item_execution_required:sha256:4ab7532f20f0cfa7a94b9eaf6b959a5b73df2f8e6660f50cdca7f0e53c86de7c:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4ab7532f20f0cfa7a94b9eaf6b959a5b73df2f8e6660f50cdca7f0e53c86de7c:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62"
        occurred_at: "2026-11-01T12:24:26.268Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202611011211-VKPT8K"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Publish exact native quarantine artifacts without resuming historical Tasks

Implement the explicitly USER-approved seven-file native quarantine publication admission. Reuse one shared read-only proof classifier in canonical dirty-baseline adoption and branch PR foreign-task ownership. Require approved exact per-foreignTask directory scope and security-boundary/repository-write authority. Bind source bytes to the exact Git comparison base, logical repository/backend identity, genuine native revision-split mapping, exact quarantineAfterimage and exact content-addressed raw source backup. Admit only README and that backup. Refuse arbitrary broad scope, forged or altered marker/body/backup, wrong base/source/repository, extra/deleted/renamed/linked/missing/unstable foreign artifacts and unproven history. Preserve existing Task/batch/import/cleanup rules. Historical Tasks stay BLOCKED; never run old WorkItems or assign DONE/PASS/CANCELLED or classify unknown effects. Verify actual byte/Git/coordinator/publication integration and negative cases, full mandatory CI and independent EVALUATOR, protected canonical PR/merge and current CLI qualification before actual Factory publication. Preserve all existing branches, worktrees, archives, runtime data, credentials and guards. No new public CLI/schema/dependencies or runtime effects.

## Scope

- In scope: Implement the explicitly USER-approved seven-file native quarantine publication admission. Reuse one shared read-only proof classifier in canonical dirty-baseline adoption and branch PR foreign-task ownership. Require approved exact per-foreignTask directory scope and security-boundary/repository-write authority. Bind source bytes to the exact Git comparison base, logical repository/backend identity, genuine native revision-split mapping, exact quarantineAfterimage and exact content-addressed raw source backup. Admit only README and that backup. Refuse arbitrary broad scope, forged or altered marker/body/backup, wrong base/source/repository, extra/deleted/renamed/linked/missing/unstable foreign artifacts and unproven history. Preserve existing Task/batch/import/cleanup rules. Historical Tasks stay BLOCKED; never run old WorkItems or assign DONE/PASS/CANCELLED or classify unknown effects. Verify actual byte/Git/coordinator/publication integration and negative cases, full mandatory CI and independent EVALUATOR, protected canonical PR/merge and current CLI qualification before actual Factory publication. Preserve all existing branches, worktrees, archives, runtime data, credentials and guards. No new public CLI/schema/dependencies or runtime effects.
- Out of scope: unrelated refactors not required for "Publish exact native quarantine artifacts without resuming historical Tasks".

## Plan

1. Execute approved WorkItem native-quarantine-artifact-publication.

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
