---
id: "202610260157-ZDEE0D"
title: "Recover an approved plan when a required declared check cannot execute"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "verification"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-10-26T01:58:55.909Z"
  updated_by: "agentplane:kernel-controller"
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
    - "effect_security_boundary"
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
      - "repository_write"
      - "security_boundary"
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
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_security_boundary"
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
          - "packages/agentplane/src/commands/task"
          - "packages/core/src/tasks"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:6bea736418779b87fd6d2e6611a97e67ecb25473e5addbd3af9eb9831ea471ed"
      escalation_reasons:
        - "central_component:packages/core/src/tasks"
        - "effect_security_boundary"
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
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-26T01:57:30.855Z"
doc_updated_by: "CODER"
description: "Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters."
sections:
  Summary: |-
    Recover an approved plan when a required declared check cannot execute

    Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters.
  Scope: |-
    - In scope: Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters.
    - Out of scope: unrelated refactors not required for "Recover an approved plan when a required declared check cannot execute".
  Plan: "1. Execute approved WorkItem recover-nonexecutable-required-check."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
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
    base_sha: "cdc68137f324840b306f26b78e7c5dc9587b51e6"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:210a90f65fa26477906250effb48edc674fffb2d37e315ca9fd27792a735e3d6"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e3cf96165c32d1143c4778fd71b2be826a8a0367790358f71e9c926938e747eb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202610260157-ZDEE0D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
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
            digest: "sha256:338cb70c5303d5b310950ccd7ff6f03f4dc369a94aae93e1d8ea764af4330054"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e3cf96165c32d1143c4778fd71b2be826a8a0367790358f71e9c926938e747eb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:210a90f65fa26477906250effb48edc674fffb2d37e315ca9fd27792a735e3d6"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202610260157-ZDEE0D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/plan-set.command.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
            evidence_digest: "sha256:a2ed7ed02af58a001a49cfc2f4d1d51947350dbe0088aa4cda3e19f7d07897fd"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
        digest: "sha256:e3cf96165c32d1143c4778fd71b2be826a8a0367790358f71e9c926938e747eb"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:e92abf9bc2108a26ceceae37ca16a7de484208da36dbe8b1e2d533f7263c2fce"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "proof-bound-check-replacement"
              - "retained-failure-and-rerun"
              - "negative-recovery-tests"
            id: "recover-nonexecutable-required-check"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610260157-ZDEE0D"
      intent_digest: "sha256:0ba74aae27a9559d0728b44ed2c463c332c417af9febbaee8fd656a12508101a"
      migration_receipts: []
      mutation_receipts:
        capture:202610260157-ZDEE0D:
          after_revision: 1
          aggregate_digest: "sha256:719b1550753da0920d99e1b58cce82860df7936f3e1a893df695e67fbccd7292"
          before_revision: 0
          command_digest: "sha256:500355ac118938f57c6495b6048b7a6548c1b18d9b4535e5f6bbd137782d115b"
          effect_ids: []
          event_digests:
            - "sha256:a455ebca0344421a476fac7b5b33f06850e1e810c4a450976a28757cc5cea011"
          mutation_id: "capture:202610260157-ZDEE0D"
        kernel_work_item_claim_required:sha256:ced6a448111ee84d94571f8bbe45864df62f733df5e108c445f684bfec4df793:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 5
          aggregate_digest: "sha256:eefd6d2eadaac5a7791ddeb01e1369d5a095bfb0afe51fcf6d5b58f7a41b8306"
          before_revision: 4
          command_digest: "sha256:9cef2d974f592e3d386358acdea59d2d862fb03be87b4e9a2a29ebe10331f0f7"
          effect_ids: []
          event_digests:
            - "sha256:10db915233dcd1907a899d57c7ed08018e594a9b0ddb5e2d62a21189a20bb746"
          mutation_id: "kernel_work_item_claim_required:sha256:ced6a448111ee84d94571f8bbe45864df62f733df5e108c445f684bfec4df793:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_execution_required:sha256:4bfb865f6e762760fed8908ad2f1151ac2ade4ce0a037bceefece21377da57f1:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 6
          aggregate_digest: "sha256:9804148a061addded49be02bda88bc5d0ff28440c1919f92ebba4d2c13352df9"
          before_revision: 5
          command_digest: "sha256:1d019c9f4efcf31ee5777e9c1d9f17f56e3eab77e8894c22003e0c25d747b357"
          effect_ids: []
          event_digests:
            - "sha256:cc796d8919ca6999eb2a10c910e607972b693320c54fbe7770548b769cd0d767"
          mutation_id: "kernel_work_item_execution_required:sha256:4bfb865f6e762760fed8908ad2f1151ac2ade4ce0a037bceefece21377da57f1:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_execution_required:sha256:73d8506d324ba4b8c7a5bf5270b92e5df336b20ee804dda0beb2cbef37cbc384:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:
          after_revision: 13
          aggregate_digest: "sha256:149de7329b22408a62e06d7fc92410c80692b7d0b599876665e7343d1eba377a"
          before_revision: 12
          command_digest: "sha256:83601970a07248715ac0f4eb3fbf48dcc9d39d86e86dafb52cf8989f3c4217ff"
          effect_ids: []
          event_digests:
            - "sha256:7ba97f49b0ddf8f0f81ca0b9bf76f2a4b2cca021bc8a0c184dc9dd23c4a33587"
          mutation_id: "kernel_work_item_execution_required:sha256:73d8506d324ba4b8c7a5bf5270b92e5df336b20ee804dda0beb2cbef37cbc384:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        kernel_work_item_inspection_required:sha256:8c001fc46a04dd49077fc301af021b7b472ebf36c587cc51841c76ca27c4caeb:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:
          after_revision: 9
          aggregate_digest: "sha256:fa6903fcbbd30d0a2fbe86f2343dc579e74e5cf8401032a47d581c054975fa1a"
          before_revision: 8
          command_digest: "sha256:3c5f7bb5e810e64065f3e2f0f422a64588b37e3a47ca7d19c8dff8c7da7b0f08"
          effect_ids: []
          event_digests:
            - "sha256:4c7299ab52cfedc1624a9bd9fb1b8c9d0b0d9553b8e76f512104da3178eeb1ae"
          mutation_id: "kernel_work_item_inspection_required:sha256:8c001fc46a04dd49077fc301af021b7b472ebf36c587cc51841c76ca27c4caeb:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        kernel_work_item_materialization_required:sha256:39725a9be52555b75bf6e2813c38e96f6b2c502a773a36dffa8bf3d03e296728:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 4
          aggregate_digest: "sha256:755c479fa8f5344619b39f65be2e5f03b67ba4cd306d74e050069363abf7d7b0"
          before_revision: 3
          command_digest: "sha256:58d50b36deb6af2c3ca3815e37cb0eada2b2d4a115592edf5f4e7f45dd61a0c3"
          effect_ids: []
          event_digests:
            - "sha256:d17b50039daa05e59734750cbd0a5898a961200ab44da9304bfccf19dca56d89"
          mutation_id: "kernel_work_item_materialization_required:sha256:39725a9be52555b75bf6e2813c38e96f6b2c502a773a36dffa8bf3d03e296728:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_rework_claim_required:sha256:ae25c2f63973da270d949f340de9c04abab9a77de0768c92a387258c7ed2a20e:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:
          after_revision: 12
          aggregate_digest: "sha256:ebefdcee68c313b5f059ffc13ef6caded9ed915085871d949e9cb140cb7263f4"
          before_revision: 11
          command_digest: "sha256:5ab198389f24236bb3d7b1a58b1b6936e7b28a08f49b0e72fc1de24e91878f10"
          effect_ids: []
          event_digests:
            - "sha256:472d7e86903fca8c07a78764151a5ffb201ba0557f84b3b35c30bfabb237b44b"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:ae25c2f63973da270d949f340de9c04abab9a77de0768c92a387258c7ed2a20e:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        result:sha256:8e8a97ec72ac8c62380aed88857e6074ebad93443a33c206b8cbff4ba90a17af:
          after_revision: 2
          aggregate_digest: "sha256:10856582d725975c9411dab57c9548dce0fd3d3d448871bc7ad33d2ddf869fe8"
          before_revision: 1
          command_digest: "sha256:b578c75f9dc2f97f3700f637516c477afe67667e325c18ad59738bcc49c07331"
          effect_ids: []
          event_digests:
            - "sha256:a46dd5f64c2ccb8f316fcf3b6d9c5b6cd659fad1c7f615479d7ffa99ac1a2c2d"
          mutation_id: "result:sha256:8e8a97ec72ac8c62380aed88857e6074ebad93443a33c206b8cbff4ba90a17af"
        result:sha256:fe676a7b8f652075690cb3d440cc996cb9cefe4835c70d941be4d8ee7902f387:
          after_revision: 8
          aggregate_digest: "sha256:18272b90f55009a019739c3c935a5883fc98c9bb4601ca26d9fefdab7b410d6c"
          before_revision: 7
          command_digest: "sha256:33077b327eb1eb38138d804a18ac385a4bb404769eb029853991cd416030cfea"
          effect_ids: []
          event_digests:
            - "sha256:9f5e3451f598b6f255bc0b0d1961d37268954867dba6dd540630f10749155d06"
          mutation_id: "result:sha256:fe676a7b8f652075690cb3d440cc996cb9cefe4835c70d941be4d8ee7902f387"
        sha256:31a673b3565e0e2b9b3d111f5e16660b68a1bab47eac3ab1e4459742e8011b31:
          after_revision: 3
          aggregate_digest: "sha256:c6852dd4ef1437c9819b3eb764a76670978a810f9f4e814a7d98d103a89742e3"
          before_revision: 2
          command_digest: "sha256:48587b8b0ed6b3d2f70d2e5e92200fb604dcfff3e34bd4d82384cfc83f664de5"
          effect_ids: []
          event_digests:
            - "sha256:0852850b15021d8bb7ddc8b63cc9186110467457121672cb3f9a7f6d695b3603"
          mutation_id: "sha256:31a673b3565e0e2b9b3d111f5e16660b68a1bab47eac3ab1e4459742e8011b31"
        sha256:b3264106e5949cd5f7ccc7615d00d2c195ba71cb38b3afd8d0a43037696a4a54:
          after_revision: 7
          aggregate_digest: "sha256:bf353ae187240c43e9bca5e48d70a9fd3e4e16fd9e7a118547d2cf2dca2ac5c5"
          before_revision: 6
          command_digest: "sha256:18d47e27b16ae746fdeba40e73c3df3d219d06551dabf5b7bf2813e5f15590e0"
          effect_ids: []
          event_digests:
            - "sha256:e24fac44cafa49791917fc3a7e80642eb4d63e0590dda51db43e33847ca06b40"
          mutation_id: "sha256:b3264106e5949cd5f7ccc7615d00d2c195ba71cb38b3afd8d0a43037696a4a54"
        validation-resolution:sha256:b658d433e800b58979cca1c376d5c9bce8d76e0215f673e3bb274994ff9295e4:
          after_revision: 11
          aggregate_digest: "sha256:381d52fe1dfe0a6f6e47287fb82acddce98b284120ad4cea07901264690361b8"
          before_revision: 10
          command_digest: "sha256:64a4f5b01a63f29504826375e7cebec091e00038d304e4ec6b1cb2f6c2123f03"
          effect_ids: []
          event_digests:
            - "sha256:7134ad30640c4a579688037759349c29537838ed9559ce4c722930b0cde5a060"
          mutation_id: "validation-resolution:sha256:b658d433e800b58979cca1c376d5c9bce8d76e0215f673e3bb274994ff9295e4"
        validation:sha256:9043790485f852e3fce491a07c3aad3716ab4e8fec3322230d9525f5736feafd:
          after_revision: 10
          aggregate_digest: "sha256:1796a103bae37297ac3a851554c27461085be1a29f3778a3a821334ba8d82981"
          before_revision: 9
          command_digest: "sha256:af584b3b13c775cf674fc24b8e612b1cd73744ee448c2a28d250a7159a9e1fb3"
          effect_ids: []
          event_digests:
            - "sha256:eaae4dadb0bf98cf788ea0adb8075383475e1505b7f1a0ac1b969fcf16ccc62d"
          mutation_id: "validation:sha256:9043790485f852e3fce491a07c3aad3716ab4e8fec3322230d9525f5736feafd"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "ACTIVE"
      work_items:
        recover-nonexecutable-required-check:
          attempt: 2
          claim_id: "sha256:43603b68b603cae383bec45f2c2451eb0410c47ccfd5fed65c30da879885df98"
          definition:
            contract_digest: "sha256:e92abf9bc2108a26ceceae37ca16a7de484208da36dbe8b1e2d533f7263c2fce"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "proof-bound-check-replacement"
              - "retained-failure-and-rerun"
              - "negative-recovery-tests"
            id: "recover-nonexecutable-required-check"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 9
          state: "EXECUTING"
          validation: null
    digest: "sha256:f4ffe18dae086ad89c3970baa67fda4b9ba1efacec44c3ef2b01b8c48e5d1520"
    documents:
      contracts:
        sha256:e92abf9bc2108a26ceceae37ca16a7de484208da36dbe8b1e2d533f7263c2fce:
          acceptance_criteria:
            - "Admit a correction only for an exact prior native declared-check failure whose command could not execute; bind original Plan digest, WorkItem, command, failure evidence, and a USER operator decision to the replacement."
            - "Keep scope, outputs, acceptance criteria, all other checks, and execution authority unchanged; reject missing or mismatched proof, unrelated changes, replay, and attempts to replace an executable failed test."
            - "Preserve the original FAILED validation and old Plan in history; corrected Plan requires a new WorkItem attempt and native execution of the replacement command before success."
            - "Use a generic mechanism with no version-specific or Factory-specific behavior."
          objective: "Allow an operator to correct exactly one proven non-executable required check in an approved canonical Plan and rerun it without waiving failed verification."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/agentplane/src/commands/task/kernel-plan-supplied-approval.test.ts --pool=forks --maxWorkers 2"
      intent:
        context: "Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters."
        objective: "Recover an approved plan when a required declared check cannot execute"
    events:
      -
        command_digest: "sha256:500355ac118938f57c6495b6048b7a6548c1b18d9b4535e5f6bbd137782d115b"
        id: "capture:202610260157-ZDEE0D:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610260157-ZDEE0D"
        occurred_at: "2026-10-26T01:57:30.730Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610260157-ZDEE0D"
        task_revision: 1
      -
        command_digest: "sha256:b578c75f9dc2f97f3700f637516c477afe67667e325c18ad59738bcc49c07331"
        id: "result:sha256:8e8a97ec72ac8c62380aed88857e6074ebad93443a33c206b8cbff4ba90a17af:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:8e8a97ec72ac8c62380aed88857e6074ebad93443a33c206b8cbff4ba90a17af"
        occurred_at: "2026-10-26T01:58:19.403Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610260157-ZDEE0D"
        task_revision: 2
      -
        command_digest: "sha256:48587b8b0ed6b3d2f70d2e5e92200fb604dcfff3e34bd4d82384cfc83f664de5"
        id: "sha256:31a673b3565e0e2b9b3d111f5e16660b68a1bab47eac3ab1e4459742e8011b31:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:31a673b3565e0e2b9b3d111f5e16660b68a1bab47eac3ab1e4459742e8011b31"
        occurred_at: "2026-10-26T01:58:41.853Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610260157-ZDEE0D"
        task_revision: 3
      -
        command_digest: "sha256:58d50b36deb6af2c3ca3815e37cb0eada2b2d4a115592edf5f4e7f45dd61a0c3"
        id: "kernel_work_item_materialization_required:sha256:39725a9be52555b75bf6e2813c38e96f6b2c502a773a36dffa8bf3d03e296728:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:39725a9be52555b75bf6e2813c38e96f6b2c502a773a36dffa8bf3d03e296728:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-26T01:59:04.850Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610260157-ZDEE0D"
        task_revision: 4
      -
        command_digest: "sha256:9cef2d974f592e3d386358acdea59d2d862fb03be87b4e9a2a29ebe10331f0f7"
        id: "kernel_work_item_claim_required:sha256:ced6a448111ee84d94571f8bbe45864df62f733df5e108c445f684bfec4df793:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ced6a448111ee84d94571f8bbe45864df62f733df5e108c445f684bfec4df793:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-26T01:59:31.464Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610260157-ZDEE0D"
        task_revision: 5
      -
        command_digest: "sha256:1d019c9f4efcf31ee5777e9c1d9f17f56e3eab77e8894c22003e0c25d747b357"
        id: "kernel_work_item_execution_required:sha256:4bfb865f6e762760fed8908ad2f1151ac2ade4ce0a037bceefece21377da57f1:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4bfb865f6e762760fed8908ad2f1151ac2ade4ce0a037bceefece21377da57f1:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-26T02:00:11.177Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610260157-ZDEE0D"
        task_revision: 6
      -
        command_digest: "sha256:18d47e27b16ae746fdeba40e73c3df3d219d06551dabf5b7bf2813e5f15590e0"
        id: "sha256:b3264106e5949cd5f7ccc7615d00d2c195ba71cb38b3afd8d0a43037696a4a54:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b3264106e5949cd5f7ccc7615d00d2c195ba71cb38b3afd8d0a43037696a4a54"
        occurred_at: "2026-10-26T02:38:22.523Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610260157-ZDEE0D"
        task_revision: 7
      -
        command_digest: "sha256:33077b327eb1eb38138d804a18ac385a4bb404769eb029853991cd416030cfea"
        id: "result:sha256:fe676a7b8f652075690cb3d440cc996cb9cefe4835c70d941be4d8ee7902f387:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:fe676a7b8f652075690cb3d440cc996cb9cefe4835c70d941be4d8ee7902f387"
        occurred_at: "2026-10-26T02:38:40.206Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610260157-ZDEE0D"
        task_revision: 8
      -
        command_digest: "sha256:3c5f7bb5e810e64065f3e2f0f422a64588b37e3a47ca7d19c8dff8c7da7b0f08"
        id: "kernel_work_item_inspection_required:sha256:8c001fc46a04dd49077fc301af021b7b472ebf36c587cc51841c76ca27c4caeb:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:8c001fc46a04dd49077fc301af021b7b472ebf36c587cc51841c76ca27c4caeb:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        occurred_at: "2026-10-26T02:38:52.745Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610260157-ZDEE0D"
        task_revision: 9
      -
        command_digest: "sha256:af584b3b13c775cf674fc24b8e612b1cd73744ee448c2a28d250a7159a9e1fb3"
        id: "validation:sha256:9043790485f852e3fce491a07c3aad3716ab4e8fec3322230d9525f5736feafd:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:9043790485f852e3fce491a07c3aad3716ab4e8fec3322230d9525f5736feafd"
        occurred_at: "2026-10-26T02:41:17.447Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610260157-ZDEE0D"
        task_revision: 10
      -
        command_digest: "sha256:64a4f5b01a63f29504826375e7cebec091e00038d304e4ec6b1cb2f6c2123f03"
        id: "validation-resolution:sha256:b658d433e800b58979cca1c376d5c9bce8d76e0215f673e3bb274994ff9295e4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:b658d433e800b58979cca1c376d5c9bce8d76e0215f673e3bb274994ff9295e4"
        occurred_at: "2026-10-26T02:41:25.540Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610260157-ZDEE0D"
        task_revision: 11
      -
        command_digest: "sha256:5ab198389f24236bb3d7b1a58b1b6936e7b28a08f49b0e72fc1de24e91878f10"
        id: "kernel_work_item_rework_claim_required:sha256:ae25c2f63973da270d949f340de9c04abab9a77de0768c92a387258c7ed2a20e:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:ae25c2f63973da270d949f340de9c04abab9a77de0768c92a387258c7ed2a20e:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        occurred_at: "2026-10-26T02:41:41.457Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610260157-ZDEE0D"
        task_revision: 12
      -
        command_digest: "sha256:83601970a07248715ac0f4eb3fbf48dcc9d39d86e86dafb52cf8989f3c4217ff"
        id: "kernel_work_item_execution_required:sha256:73d8506d324ba4b8c7a5bf5270b92e5df336b20ee804dda0beb2cbef37cbc384:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:73d8506d324ba4b8c7a5bf5270b92e5df336b20ee804dda0beb2cbef37cbc384:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        occurred_at: "2026-10-26T02:41:52.488Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610260157-ZDEE0D"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Recover an approved plan when a required declared check cannot execute

Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters.

## Scope

- In scope: Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters.
- Out of scope: unrelated refactors not required for "Recover an approved plan when a required declared check cannot execute".

## Plan

1. Execute approved WorkItem recover-nonexecutable-required-check.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
