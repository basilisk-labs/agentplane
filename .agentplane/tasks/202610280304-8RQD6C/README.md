---
id: "202610280304-8RQD6C"
title: "Recognize worktree preparation in failed-check lineage"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "release-0.7.13"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
verify:
  - "bun run ci:local:full"
  - "bun run typecheck"
  - "bunx vitest run packages/core/src/tasks/task-kernel/required-check-correction.test.ts --config vitest.workspace.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-28T03:06:27.400Z"
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
    - "effect_external_write"
    - "effect_release_metadata"
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
      - "security_boundary"
    writable_roots:
      - "packages/core/src/tasks/task-kernel/kernel.ts"
      - "packages/core/src/tasks/task-kernel/required-check-correction.test.ts"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/core/src/tasks/task-kernel/kernel.ts"
      - "packages/core/src/tasks/task-kernel/required-check-correction.test.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_release_metadata"
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
          - "packages/core/src/tasks/task-kernel/kernel.ts"
          - "packages/core/src/tasks/task-kernel/required-check-correction.test.ts"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:257b4eead5fded5de663cce1bbd41f7a555222864b62f4814bb126f6d3c3b312"
      escalation_reasons:
        - "central_component:packages/core/src/tasks/task-kernel/kernel.ts"
        - "central_component:packages/core/src/tasks/task-kernel/required-check-correction.test.ts"
        - "effect_release_metadata"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-28T03:04:21.507Z"
doc_updated_by: "CODER"
description: "A native required-check correction must validate an issued WorkOrder whose authority lineage includes an exact worktree_preparation continuation, without weakening receipt, parent, fingerprint, revision, or repository identity proof."
sections:
  Summary: |-
    Recognize worktree preparation in failed-check lineage

    A native required-check correction must validate an issued WorkOrder whose authority lineage includes an exact worktree_preparation continuation, without weakening receipt, parent, fingerprint, revision, or repository identity proof.
  Scope: |-
    - In scope: A native required-check correction must validate an issued WorkOrder whose authority lineage includes an exact worktree_preparation continuation, without weakening receipt, parent, fingerprint, revision, or repository identity proof.
    - Out of scope: unrelated refactors not required for "Recognize worktree preparation in failed-check lineage".
  Plan: "1. Execute approved WorkItem worktree-preparation-lineage."
  Verify Steps: |-
    PLANNER fallback scaffold for "Recognize worktree preparation in failed-check lineage". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Recognize worktree preparation in failed-check lineage". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  task_execution_context:
    base_ref: "main"
    base_sha: "9c1ad3fe68b6ce490e72ace285dcea2d316d0364"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
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
            digest: "sha256:b6fb3ef7c2ce6b0a84a734fb384edac3f17621179f8b4461881659e2ad6296ad"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:8798d6e47d7939c2c40bdeda75311ccfa2102d3a8abdfb3c17300e6e6bbc2c01"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:bf8cbe197ac398846f9bee06d05c74c7b469054818db1d6f47f9ce67fd2afaa2"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:391773f3c0ed9da35f7dcda5ca47d2eb7d37a1c5b7f2f49598c6faaeb9bf9b8a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/required-check-correction.test.ts"
            task_id: "202610280304-8RQD6C"
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
            digest: "sha256:bad668a37c86fbe775031ce171793fbe34cf924f4362f0db94b65408eadff683"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:8798d6e47d7939c2c40bdeda75311ccfa2102d3a8abdfb3c17300e6e6bbc2c01"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:bf8cbe197ac398846f9bee06d05c74c7b469054818db1d6f47f9ce67fd2afaa2"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:b6fb3ef7c2ce6b0a84a734fb384edac3f17621179f8b4461881659e2ad6296ad"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/required-check-correction.test.ts"
            task_id: "202610280304-8RQD6C"
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
            evidence_digest: "sha256:176f54c1aa0654abcc6fe4848774800f867e01fdfc839e20916752fe188f1cab"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:391773f3c0ed9da35f7dcda5ca47d2eb7d37a1c5b7f2f49598c6faaeb9bf9b8a"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:c5cbf3581221c33b2a728d5cf953ea77211a90f18c16e495adaa5d78c2cca793"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:8798d6e47d7939c2c40bdeda75311ccfa2102d3a8abdfb3c17300e6e6bbc2c01"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:bf8cbe197ac398846f9bee06d05c74c7b469054818db1d6f47f9ce67fd2afaa2"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:bad668a37c86fbe775031ce171793fbe34cf924f4362f0db94b65408eadff683"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:1cdb08997ba23ad9515ace90b20cbf69c4247d09a221cb13c471518171c27470"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/required-check-correction.test.ts"
            task_id: "202610280304-8RQD6C"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/required-check-correction.test.ts"
            evidence_digest: "sha256:8f5a8c2426162facd4d682c3304d94f209f47fd089ac7632b616d8edb6d55b59"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:bf8cbe197ac398846f9bee06d05c74c7b469054818db1d6f47f9ce67fd2afaa2"
        digest: "sha256:8798d6e47d7939c2c40bdeda75311ccfa2102d3a8abdfb3c17300e6e6bbc2c01"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:29dd4892a6635955bf1a53e4f18bc000f522857730690605e54d1df7bc758bbd"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/required-check-correction.test.ts"
            expected_outputs:
              - "lineage-guard"
              - "lineage-regressions"
            id: "worktree-preparation-lineage"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610280304-8RQD6C"
      intent_digest: "sha256:73bc9da6d0514453b9dafbf12b204d1b770f828411c7dcf38778dadb2f97b528"
      migration_receipts: []
      mutation_receipts:
        capture:202610280304-8RQD6C:
          after_revision: 1
          aggregate_digest: "sha256:85a1a9884794fe80e2553f1438f0c713296c70cc76888572d79bec253fe9cd5b"
          before_revision: 0
          command_digest: "sha256:c8177cad1655f52d0fd91fd3fe458fb8f1e07d51cf6c294e34ca5f3159b37332"
          effect_ids: []
          event_digests:
            - "sha256:12089dbba417445997fea35fcf2f0ad90577bd8c1dbdc02010d5f67fd729824e"
          mutation_id: "capture:202610280304-8RQD6C"
        kernel_work_item_claim_required:sha256:af0a2a068f765219be40db8e42524933b60ce63fa88c2958d4ab3daeaf5364dd:sha256:391773f3c0ed9da35f7dcda5ca47d2eb7d37a1c5b7f2f49598c6faaeb9bf9b8a:
          after_revision: 5
          aggregate_digest: "sha256:bab05b4ed6ce8b6057c57f0170c6360730461bbd5181e85ddbbf4a51e408663c"
          before_revision: 4
          command_digest: "sha256:280453e27d99091eaa337fd578b852d5dc5a5af2bb9d907a2cf9ef3d2c1e6969"
          effect_ids: []
          event_digests:
            - "sha256:1e1a0421cac9a1082aba5429a11dfe99a7b57dcb5054470a6beaf3a1d9741e74"
          mutation_id: "kernel_work_item_claim_required:sha256:af0a2a068f765219be40db8e42524933b60ce63fa88c2958d4ab3daeaf5364dd:sha256:391773f3c0ed9da35f7dcda5ca47d2eb7d37a1c5b7f2f49598c6faaeb9bf9b8a"
        kernel_work_item_execution_required:sha256:fcd55b8dc215bb854866097bab6fa6086bc930736192867f27727d0c2319e544:sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c:
          after_revision: 7
          aggregate_digest: "sha256:eeac46b227cccc1a7efb55845bb67f565bd1ca2669971ce0dec24c7bf9c7157a"
          before_revision: 6
          command_digest: "sha256:b3ad13fec04af5fa3995d54e5f611551e4a3298c20f494e40a55e1b9a6910cca"
          effect_ids: []
          event_digests:
            - "sha256:6662bc961e42a30403f37aed413f26c9ff34a180ed9e6f6e0d23605d4b80edd4"
          mutation_id: "kernel_work_item_execution_required:sha256:fcd55b8dc215bb854866097bab6fa6086bc930736192867f27727d0c2319e544:sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c"
        kernel_work_item_materialization_required:sha256:68ec35f7b7074690064753253f363250191023b3bb181673e83970542a2a5a23:sha256:391773f3c0ed9da35f7dcda5ca47d2eb7d37a1c5b7f2f49598c6faaeb9bf9b8a:
          after_revision: 4
          aggregate_digest: "sha256:5c7248a9ae6fe4e286c45defedcefe6fe644b80f1bd22d3ce6c90556abca9461"
          before_revision: 3
          command_digest: "sha256:d349e637499933676259fa3b027ee41eed08be4e571102fce4ec848bba178135"
          effect_ids: []
          event_digests:
            - "sha256:184b2f3e74e779b13f96541954858e2ed05d53d8bf141bbbf3d9ad58849c2e58"
          mutation_id: "kernel_work_item_materialization_required:sha256:68ec35f7b7074690064753253f363250191023b3bb181673e83970542a2a5a23:sha256:391773f3c0ed9da35f7dcda5ca47d2eb7d37a1c5b7f2f49598c6faaeb9bf9b8a"
        result:sha256:85f3f7ddb21d18cdcd1e17b46069718e376198212180b8d422d635489140964d:
          after_revision: 2
          aggregate_digest: "sha256:649a9121d49b3386322d93325fcd132003f7768973f66fe8ec9927da1407158b"
          before_revision: 1
          command_digest: "sha256:16d028af7e516767289af6e30b8586c62517305c4b6829b85d6ef8f8c5bfb1a8"
          effect_ids: []
          event_digests:
            - "sha256:cbf2ea6e58e843bf900a58e5bc5e2483a6f8c2e86ba8fc0963a1722d62f2f284"
          mutation_id: "result:sha256:85f3f7ddb21d18cdcd1e17b46069718e376198212180b8d422d635489140964d"
        sha256:5a1ed116443a67b036146ef1f4eed872e31bf2065ddf0c297994b3e03fd8abc8:
          after_revision: 8
          aggregate_digest: "sha256:c0e65fe427cef56a29664ba5d01b9ef40640bae86e7da4b819e4e47605de996d"
          before_revision: 7
          command_digest: "sha256:7c3b85af327f5d872b341e741c72a556e348088af24141195af5248c968be5d5"
          effect_ids: []
          event_digests:
            - "sha256:5f8f155a66e7a5f547c4c55c6a82be5eb4d301a213dc4d2d67ddc766654d3993"
          mutation_id: "sha256:5a1ed116443a67b036146ef1f4eed872e31bf2065ddf0c297994b3e03fd8abc8"
        sha256:90db813af59f686f4089d5dc10c09d361e45d4ea5c517289008e2b27d29cae0f:
          after_revision: 6
          aggregate_digest: "sha256:c93d85935fa8acb5ac09bb5b662fd320e9491d0cc2374526b7089c05650dce8c"
          before_revision: 5
          command_digest: "sha256:b87a4b5b2a5afc420217e1cf862d441cafa9759c5c49e0f32a3de3262d943da4"
          effect_ids: []
          event_digests:
            - "sha256:8aad058af9c6135f30b3429d973b6618f60bd20dd8862b7f42da367ae1f9695c"
          mutation_id: "sha256:90db813af59f686f4089d5dc10c09d361e45d4ea5c517289008e2b27d29cae0f"
        sha256:c288fe42b2c6aa0a45e20855eda2a86d3f3bbe588da5235c6b3be5734884ce71:
          after_revision: 3
          aggregate_digest: "sha256:4606f832aceab4a1ecade9f521b2e5bd158159a0e16a4340c603e15e1554e724"
          before_revision: 2
          command_digest: "sha256:a0ceb6fa043c462ae3836b854451b4786f06ab8309f3e9ac9eb1bed456699bdf"
          effect_ids: []
          event_digests:
            - "sha256:bc911f59189631240f1fd9353c8310d959080ae0ee64011bc9717bc0d548616e"
          mutation_id: "sha256:c288fe42b2c6aa0a45e20855eda2a86d3f3bbe588da5235c6b3be5734884ce71"
      plan_history: []
      revision: 8
      schema_version: 1
      state: "ACTIVE"
      work_items:
        worktree-preparation-lineage:
          attempt: 1
          claim_id: "sha256:0e85bb9ee435bfd0a2b8d57a1c2d3e2d0dd83d2271bbf95cee99f4cd7fd35c2d"
          definition:
            contract_digest: "sha256:29dd4892a6635955bf1a53e4f18bc000f522857730690605e54d1df7bc758bbd"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/core/src/tasks/task-kernel/kernel.ts"
                - "packages/core/src/tasks/task-kernel/required-check-correction.test.ts"
            expected_outputs:
              - "lineage-guard"
              - "lineage-regressions"
            id: "worktree-preparation-lineage"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:3b6e35d2a410bed3eee960f49c709ad391ca171c1e59de90b651be32730b09cf"
    documents:
      contracts:
        sha256:29dd4892a6635955bf1a53e4f18bc000f522857730690605e54d1df7bc758bbd:
          acceptance_criteria:
            - "An exact worktree_preparation continuation with retained command receipt and matching parent/fingerprint/revision/repository identity permits correction of one native-proven unlaunchable required check."
            - "Missing or forged continuation receipt, changed parent or fingerprint, wrong repository identity, and unrelated observation kinds are rejected."
            - "Existing repository_implementation continuation and failed executable check denial remain unchanged."
          objective: "Admit a retained worktree_preparation authority continuation as a valid origin and successor for exact native required-check correction, while preserving all other lineage proof conditions."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/core/src/tasks/task-kernel/required-check-correction.test.ts --config vitest.workspace.ts"
            - "bun run typecheck"
            - "bun run ci:local:full"
      intent:
        context: "A native required-check correction must validate an issued WorkOrder whose authority lineage includes an exact worktree_preparation continuation, without weakening receipt, parent, fingerprint, revision, or repository identity proof."
        objective: "Recognize worktree preparation in failed-check lineage"
    events:
      -
        command_digest: "sha256:c8177cad1655f52d0fd91fd3fe458fb8f1e07d51cf6c294e34ca5f3159b37332"
        id: "capture:202610280304-8RQD6C:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610280304-8RQD6C"
        occurred_at: "2026-10-28T03:04:21.460Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610280304-8RQD6C"
        task_revision: 1
      -
        command_digest: "sha256:16d028af7e516767289af6e30b8586c62517305c4b6829b85d6ef8f8c5bfb1a8"
        id: "result:sha256:85f3f7ddb21d18cdcd1e17b46069718e376198212180b8d422d635489140964d:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:85f3f7ddb21d18cdcd1e17b46069718e376198212180b8d422d635489140964d"
        occurred_at: "2026-10-28T03:05:39.314Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610280304-8RQD6C"
        task_revision: 2
      -
        command_digest: "sha256:a0ceb6fa043c462ae3836b854451b4786f06ab8309f3e9ac9eb1bed456699bdf"
        id: "sha256:c288fe42b2c6aa0a45e20855eda2a86d3f3bbe588da5235c6b3be5734884ce71:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:c288fe42b2c6aa0a45e20855eda2a86d3f3bbe588da5235c6b3be5734884ce71"
        occurred_at: "2026-10-28T03:06:23.726Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610280304-8RQD6C"
        task_revision: 3
      -
        command_digest: "sha256:d349e637499933676259fa3b027ee41eed08be4e571102fce4ec848bba178135"
        id: "kernel_work_item_materialization_required:sha256:68ec35f7b7074690064753253f363250191023b3bb181673e83970542a2a5a23:sha256:391773f3c0ed9da35f7dcda5ca47d2eb7d37a1c5b7f2f49598c6faaeb9bf9b8a:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:68ec35f7b7074690064753253f363250191023b3bb181673e83970542a2a5a23:sha256:391773f3c0ed9da35f7dcda5ca47d2eb7d37a1c5b7f2f49598c6faaeb9bf9b8a"
        occurred_at: "2026-10-28T03:06:44.348Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610280304-8RQD6C"
        task_revision: 4
      -
        command_digest: "sha256:280453e27d99091eaa337fd578b852d5dc5a5af2bb9d907a2cf9ef3d2c1e6969"
        id: "kernel_work_item_claim_required:sha256:af0a2a068f765219be40db8e42524933b60ce63fa88c2958d4ab3daeaf5364dd:sha256:391773f3c0ed9da35f7dcda5ca47d2eb7d37a1c5b7f2f49598c6faaeb9bf9b8a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:af0a2a068f765219be40db8e42524933b60ce63fa88c2958d4ab3daeaf5364dd:sha256:391773f3c0ed9da35f7dcda5ca47d2eb7d37a1c5b7f2f49598c6faaeb9bf9b8a"
        occurred_at: "2026-10-28T03:06:57.796Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610280304-8RQD6C"
        task_revision: 5
      -
        command_digest: "sha256:b87a4b5b2a5afc420217e1cf862d441cafa9759c5c49e0f32a3de3262d943da4"
        id: "sha256:90db813af59f686f4089d5dc10c09d361e45d4ea5c517289008e2b27d29cae0f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:90db813af59f686f4089d5dc10c09d361e45d4ea5c517289008e2b27d29cae0f"
        occurred_at: "2026-10-28T03:07:45.698Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202610280304-8RQD6C"
        task_revision: 6
      -
        command_digest: "sha256:b3ad13fec04af5fa3995d54e5f611551e4a3298c20f494e40a55e1b9a6910cca"
        id: "kernel_work_item_execution_required:sha256:fcd55b8dc215bb854866097bab6fa6086bc930736192867f27727d0c2319e544:sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:fcd55b8dc215bb854866097bab6fa6086bc930736192867f27727d0c2319e544:sha256:f78f5814ababdb128363149196b4b1256e1d80378eda0ae8500240bb26c99f6c"
        occurred_at: "2026-10-28T03:08:02.955Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610280304-8RQD6C"
        task_revision: 7
      -
        command_digest: "sha256:7c3b85af327f5d872b341e741c72a556e348088af24141195af5248c968be5d5"
        id: "sha256:5a1ed116443a67b036146ef1f4eed872e31bf2065ddf0c297994b3e03fd8abc8:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:5a1ed116443a67b036146ef1f4eed872e31bf2065ddf0c297994b3e03fd8abc8"
        occurred_at: "2026-10-28T03:57:50.427Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202610280304-8RQD6C"
        task_revision: 8
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Recognize worktree preparation in failed-check lineage

A native required-check correction must validate an issued WorkOrder whose authority lineage includes an exact worktree_preparation continuation, without weakening receipt, parent, fingerprint, revision, or repository identity proof.

## Scope

- In scope: A native required-check correction must validate an issued WorkOrder whose authority lineage includes an exact worktree_preparation continuation, without weakening receipt, parent, fingerprint, revision, or repository identity proof.
- Out of scope: unrelated refactors not required for "Recognize worktree preparation in failed-check lineage".

## Plan

1. Execute approved WorkItem worktree-preparation-lineage.

## Verify Steps

PLANNER fallback scaffold for "Recognize worktree preparation in failed-check lineage". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Recognize worktree preparation in failed-check lineage". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
