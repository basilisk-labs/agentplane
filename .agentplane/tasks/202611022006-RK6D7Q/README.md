---
id: "202611022006-RK6D7Q"
title: "Preserve quarantine proof across commit recovery"
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
  updated_at: "2026-11-02T20:07:27.303Z"
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
doc_updated_at: "2026-11-02T20:06:48.471Z"
doc_updated_by: "CODER"
description: "Complete the already approved exact seven-file native quarantine publication for sb. Port only source files from implementation92392374a299acca735c2331bc63d9bae4c84866, preserve PR6969 and all historical Task/evidence, and fix reviewed post-commit recovery bypass PRRT_kwDORCLmJM6y1t5j. No old Task execution or DONE/PASS assignment; data, credentials and runtime guards remain preserved."
sections:
  Summary: |-
    Preserve quarantine proof across commit recovery

    Complete the already approved exact seven-file native quarantine publication for sb. Port only source files from implementation92392374a299acca735c2331bc63d9bae4c84866, preserve PR6969 and all historical Task/evidence, and fix reviewed post-commit recovery bypass PRRT_kwDORCLmJM6y1t5j. No old Task execution or DONE/PASS assignment; data, credentials and runtime guards remain preserved.
  Scope: |-
    - In scope: Complete the already approved exact seven-file native quarantine publication for sb. Port only source files from implementation92392374a299acca735c2331bc63d9bae4c84866, preserve PR6969 and all historical Task/evidence, and fix reviewed post-commit recovery bypass PRRT_kwDORCLmJM6y1t5j. No old Task execution or DONE/PASS assignment; data, credentials and runtime guards remain preserved.
    - Out of scope: unrelated refactors not required for "Preserve quarantine proof across commit recovery".
  Plan: "1. Execute approved WorkItem quarantine-commit-recovery-proof."
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
            digest: "sha256:6fa55c20e60abcec683a8c0a95a865cd03c1c7c1a2b5759cc91cc0b89ab0bd4d"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:8f7b4c207b0051251f7cba76917d3d621cc4e7a03046f6c9cbfed84ccf90238b"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:6611090a39bbdaea14dae9c3752e6cef05ef27338b2702102ff4982689ac2488"
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
            task_id: "202611022006-RK6D7Q"
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
            digest: "sha256:88bf3512d000e0da0463664f480920efca3d9dc47ac2620e131b1bd9012ae2ef"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:8f7b4c207b0051251f7cba76917d3d621cc4e7a03046f6c9cbfed84ccf90238b"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6611090a39bbdaea14dae9c3752e6cef05ef27338b2702102ff4982689ac2488"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:6fa55c20e60abcec683a8c0a95a865cd03c1c7c1a2b5759cc91cc0b89ab0bd4d"
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
            task_id: "202611022006-RK6D7Q"
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
            evidence_digest: "sha256:2cf72186557c92f71561650c585cc4309aa26e75096d4f8ab2f87904aa22e7e3"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:6611090a39bbdaea14dae9c3752e6cef05ef27338b2702102ff4982689ac2488"
        digest: "sha256:8f7b4c207b0051251f7cba76917d3d621cc4e7a03046f6c9cbfed84ccf90238b"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:bef543541e8ded666d08cade6df870e04d039ee3596c6717f2289895ab0d674a"
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
              - "committed-proof-recovery-evidence"
            id: "quarantine-commit-recovery-proof"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202611022006-RK6D7Q"
      intent_digest: "sha256:31aca3bd72c2b4c729a230d316a72854f99642b046cc86caacd48983fb808e54"
      migration_receipts: []
      mutation_receipts:
        capture:202611022006-RK6D7Q:
          after_revision: 1
          aggregate_digest: "sha256:5ea836d8d9e91d058b939dd48d384a8cd71886e8d4ed99abe18fb4897d403db3"
          before_revision: 0
          command_digest: "sha256:8a9a84985f06cf8a6802761982f912c94a21d85b5a6ad8cda0f4c6057bc0cd65"
          effect_ids: []
          event_digests:
            - "sha256:5b94d46ee88b7474c36098288fb96d3c7340433907dba2c5c80a2e0ef8c38e12"
          mutation_id: "capture:202611022006-RK6D7Q"
        kernel_work_item_claim_required:sha256:44e16f289d00284590ef1989400e3e59ad1e17783e0aba48d6f445863a9a2f24:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5:
          after_revision: 5
          aggregate_digest: "sha256:7d78293414d9ccccdd1965d2e7b016494d184cc6be66c5ed62461ee038a61058"
          before_revision: 4
          command_digest: "sha256:1204d5f253cd771404f32f2bf71fc0c60ee7d2f02608e974b24ed8932b3f4e8a"
          effect_ids: []
          event_digests:
            - "sha256:c27a25750e366ec9b284196e5dc7560aa5af0d7a67d747ea3908775f6d8159fd"
          mutation_id: "kernel_work_item_claim_required:sha256:44e16f289d00284590ef1989400e3e59ad1e17783e0aba48d6f445863a9a2f24:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
        kernel_work_item_execution_required:sha256:a146fe49eedd4c75e1b398ca6b905f650619f5e82f843c030fbf1c18358a0bbf:sha256:7e0420167bc7542c18647e7767ef25cd78de8960cf1e0814ecbe259e851b3423:
          after_revision: 7
          aggregate_digest: "sha256:f64b9eb753bc5d8459c049b1f34bb05f1965219a7e585d09caed0c3d1115fbec"
          before_revision: 6
          command_digest: "sha256:93bd50c825a887d57cd8d3d44dc70a28aa9c514e54e7a8410807ae2c3b70af63"
          effect_ids: []
          event_digests:
            - "sha256:ff2d24f0075b2ca7841e343c08afaeea696999efd6f9a9ff10f8cbe5c7b33ba8"
          mutation_id: "kernel_work_item_execution_required:sha256:a146fe49eedd4c75e1b398ca6b905f650619f5e82f843c030fbf1c18358a0bbf:sha256:7e0420167bc7542c18647e7767ef25cd78de8960cf1e0814ecbe259e851b3423"
        kernel_work_item_materialization_required:sha256:c747a09a7baab2ce4bcd2e47e6f29011e38f3f26949413e3a2fc425ec88f9473:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5:
          after_revision: 4
          aggregate_digest: "sha256:0d37a256c949053e954736dd5a2a53218959c486d67648fc6b45591abb3b07a4"
          before_revision: 3
          command_digest: "sha256:d1250fdb5cf644a8e03709a0cc11593cad24ee81277c1dec1693a5ddccba4c2f"
          effect_ids: []
          event_digests:
            - "sha256:0c5dd958a5d4a44f248b8467820580e57c70766058299d99935616ec829ddb22"
          mutation_id: "kernel_work_item_materialization_required:sha256:c747a09a7baab2ce4bcd2e47e6f29011e38f3f26949413e3a2fc425ec88f9473:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
        plan:sha256:8f7b4c207b0051251f7cba76917d3d621cc4e7a03046f6c9cbfed84ccf90238b:
          after_revision: 2
          aggregate_digest: "sha256:575635062d50b0db70d5619329c005719041f4fe59cb147e59d7ab95d7429eaa"
          before_revision: 1
          command_digest: "sha256:3e4fd332bde7f7e620fe8fb65eb43774ffaea1fa0edef9a90b306247bd55d5d8"
          effect_ids: []
          event_digests:
            - "sha256:4994efaf90cde7926e9b37a56a53b8344f3b392bb20f71bde5bba570e815b6fe"
          mutation_id: "plan:sha256:8f7b4c207b0051251f7cba76917d3d621cc4e7a03046f6c9cbfed84ccf90238b"
        sha256:98c6e152b4b94cbd1318d9b6cbd95df325f57c1bfbcdc0ff2198d4f905e4c947:
          after_revision: 3
          aggregate_digest: "sha256:fbdeb060d23888716c03b48e3d252c7d807ce9d2e961e87114632f3c146f88e4"
          before_revision: 2
          command_digest: "sha256:d13d7fd356e4b5ad68668c9f7e94d6054abf79d090b7574f8310c2c5287e55a2"
          effect_ids: []
          event_digests:
            - "sha256:39ce7f725506b739ef03e02f174312fbe66196164437d3966269fbb452de15ec"
          mutation_id: "sha256:98c6e152b4b94cbd1318d9b6cbd95df325f57c1bfbcdc0ff2198d4f905e4c947"
        sha256:e9440ea4d9c7cca2f44457fe747b032f1655879dcf4efeba0cf6e590466d4189:
          after_revision: 6
          aggregate_digest: "sha256:1e6a3ad0a2b2f6ec1f4c4bc6f3f90e05b7d097f65920f25578a21d2fe313b996"
          before_revision: 5
          command_digest: "sha256:4272d278537d1a9652eab05ffc45b3c9227de3f670b0a638eef331a00ba12c75"
          effect_ids: []
          event_digests:
            - "sha256:f69058ce8ca45126ad7df8dd15782ead72dc0ea61787910f01bb824573fefd55"
          mutation_id: "sha256:e9440ea4d9c7cca2f44457fe747b032f1655879dcf4efeba0cf6e590466d4189"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        quarantine-commit-recovery-proof:
          attempt: 1
          claim_id: "sha256:587e5d4f30e7447adf1d869139cc4dda5c2ba3f096353625151eff952bee1de0"
          definition:
            contract_digest: "sha256:bef543541e8ded666d08cade6df870e04d039ee3596c6717f2289895ab0d674a"
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
              - "committed-proof-recovery-evidence"
            id: "quarantine-commit-recovery-proof"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:9f33f7c08fe60ec45585ce3a3bcdd567fdc7802a60b14d93804672d0e54d3903"
    documents:
      contracts:
        sha256:bef543541e8ded666d08cade6df870e04d039ee3596c6717f2289895ab0d674a:
          acceptance_criteria:
            - "Port exactly the approved seven source paths from immutable implementation92392374a299acca735c2331bc63d9bae4c84866, never old Task artifacts or rewritten history."
            - "Reproduce the current bug: a successful commit hook changes and stages a backup or afterimage; first invocation rejects post-commit proof, and retry incorrectly accepts the invalid committed pair. Test both default and configured workflow directories."
            - "For committed recovery, exact native proof remains mandatory even if current live bytes no longer authenticate. Invalid committed backup or afterimage must fail on every invocation, retain the exact commit intent and head, and never produce implementation evidence."
            - "Valid interrupted successful commits reconcile without a duplicate commit; valid rejected-hook retries and all existing authority/scope/base/raw-byte/ownership/rollback/staging/publish guards remain enforced. Preserve unrelated user data."
            - "Run unchanged declared full local CI and focused five-file regressions through native EXEC and independent EVAL/final validation, then canonical PR/CI/review/merge."
          objective: "Complete the approved exact seven-file native quarantine artifact admission, including both hook-failure retry paths. Import only immutable implementation92392374 source files, reproduce reviewed post-commit artifact tampering and recovery bypass PRRT_kwDORCLmJM6y1t5j, then make the quarantine proof requirement survive commit recovery without weakening live or committed byte checks."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
            - "bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
      intent:
        context: "Complete the already approved exact seven-file native quarantine publication for sb. Port only source files from implementation92392374a299acca735c2331bc63d9bae4c84866, preserve PR6969 and all historical Task/evidence, and fix reviewed post-commit recovery bypass PRRT_kwDORCLmJM6y1t5j. No old Task execution or DONE/PASS assignment; data, credentials and runtime guards remain preserved."
        objective: "Preserve quarantine proof across commit recovery"
    events:
      -
        command_digest: "sha256:8a9a84985f06cf8a6802761982f912c94a21d85b5a6ad8cda0f4c6057bc0cd65"
        id: "capture:202611022006-RK6D7Q:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202611022006-RK6D7Q"
        occurred_at: "2026-11-02T20:06:48.443Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202611022006-RK6D7Q"
        task_revision: 1
      -
        command_digest: "sha256:3e4fd332bde7f7e620fe8fb65eb43774ffaea1fa0edef9a90b306247bd55d5d8"
        id: "plan:sha256:8f7b4c207b0051251f7cba76917d3d621cc4e7a03046f6c9cbfed84ccf90238b:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:8f7b4c207b0051251f7cba76917d3d621cc4e7a03046f6c9cbfed84ccf90238b"
        occurred_at: "2026-11-02T20:07:21.918Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202611022006-RK6D7Q"
        task_revision: 2
      -
        command_digest: "sha256:d13d7fd356e4b5ad68668c9f7e94d6054abf79d090b7574f8310c2c5287e55a2"
        id: "sha256:98c6e152b4b94cbd1318d9b6cbd95df325f57c1bfbcdc0ff2198d4f905e4c947:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:98c6e152b4b94cbd1318d9b6cbd95df325f57c1bfbcdc0ff2198d4f905e4c947"
        occurred_at: "2026-11-02T20:07:25.972Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202611022006-RK6D7Q"
        task_revision: 3
      -
        command_digest: "sha256:d1250fdb5cf644a8e03709a0cc11593cad24ee81277c1dec1693a5ddccba4c2f"
        id: "kernel_work_item_materialization_required:sha256:c747a09a7baab2ce4bcd2e47e6f29011e38f3f26949413e3a2fc425ec88f9473:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:c747a09a7baab2ce4bcd2e47e6f29011e38f3f26949413e3a2fc425ec88f9473:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
        occurred_at: "2026-11-02T20:07:31.723Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202611022006-RK6D7Q"
        task_revision: 4
      -
        command_digest: "sha256:1204d5f253cd771404f32f2bf71fc0c60ee7d2f02608e974b24ed8932b3f4e8a"
        id: "kernel_work_item_claim_required:sha256:44e16f289d00284590ef1989400e3e59ad1e17783e0aba48d6f445863a9a2f24:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:44e16f289d00284590ef1989400e3e59ad1e17783e0aba48d6f445863a9a2f24:sha256:e5f713833b339acaf754422aa797496a667fea3a6e81f0e62abbc43e9572f1f5"
        occurred_at: "2026-11-02T20:07:37.513Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202611022006-RK6D7Q"
        task_revision: 5
      -
        command_digest: "sha256:4272d278537d1a9652eab05ffc45b3c9227de3f670b0a638eef331a00ba12c75"
        id: "sha256:e9440ea4d9c7cca2f44457fe747b032f1655879dcf4efeba0cf6e590466d4189:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:e9440ea4d9c7cca2f44457fe747b032f1655879dcf4efeba0cf6e590466d4189"
        occurred_at: "2026-11-02T20:08:58.328Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202611022006-RK6D7Q"
        task_revision: 6
      -
        command_digest: "sha256:93bd50c825a887d57cd8d3d44dc70a28aa9c514e54e7a8410807ae2c3b70af63"
        id: "kernel_work_item_execution_required:sha256:a146fe49eedd4c75e1b398ca6b905f650619f5e82f843c030fbf1c18358a0bbf:sha256:7e0420167bc7542c18647e7767ef25cd78de8960cf1e0814ecbe259e851b3423:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:a146fe49eedd4c75e1b398ca6b905f650619f5e82f843c030fbf1c18358a0bbf:sha256:7e0420167bc7542c18647e7767ef25cd78de8960cf1e0814ecbe259e851b3423"
        occurred_at: "2026-11-02T20:09:00.980Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202611022006-RK6D7Q"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Preserve quarantine proof across commit recovery

Complete the already approved exact seven-file native quarantine publication for sb. Port only source files from implementation92392374a299acca735c2331bc63d9bae4c84866, preserve PR6969 and all historical Task/evidence, and fix reviewed post-commit recovery bypass PRRT_kwDORCLmJM6y1t5j. No old Task execution or DONE/PASS assignment; data, credentials and runtime guards remain preserved.

## Scope

- In scope: Complete the already approved exact seven-file native quarantine publication for sb. Port only source files from implementation92392374a299acca735c2331bc63d9bae4c84866, preserve PR6969 and all historical Task/evidence, and fix reviewed post-commit recovery bypass PRRT_kwDORCLmJM6y1t5j. No old Task execution or DONE/PASS assignment; data, credentials and runtime guards remain preserved.
- Out of scope: unrelated refactors not required for "Preserve quarantine proof across commit recovery".

## Plan

1. Execute approved WorkItem quarantine-commit-recovery-proof.

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
