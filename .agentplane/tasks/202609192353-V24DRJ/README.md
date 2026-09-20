---
id: "202609192353-V24DRJ"
title: "Fix canonical final-validation recovery loops before 0.7.10 release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "controller-recovery"
  - "release-0.7.10"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
  - "publish"
verify:
  - "bun run ci:local:full"
  - "bun test packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/evaluator/evaluator-review-apply.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts"
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
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots: []
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
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:898fd0140354628320c3c9df71c2bbb224ffa7ee9ed7f1f382def29db1bb77c4"
      escalation_reasons:
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
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-19T23:53:03.711Z"
doc_updated_by: "CODER"
description: "Productize two defects observed while integrating PR #5976: managed task/review artifact commits must not invalidate an otherwise unchanged verified implementation identity, and evaluator compatibility recording must project canonical task state without a runtime-only patch. Add focused regression coverage for the exact FINAL_VALIDATION -> evaluator -> pre-merge closure path. Preserve fail-closed source/tree/authority checks. This is release-blocking for 0.7.10."
sections:
  Summary: |-
    Fix canonical final-validation recovery loops before 0.7.10 release

    Productize two defects observed while integrating PR #5976: managed task/review artifact commits must not invalidate an otherwise unchanged verified implementation identity, and evaluator compatibility recording must project canonical task state without a runtime-only patch. Add focused regression coverage for the exact FINAL_VALIDATION -> evaluator -> pre-merge closure path. Preserve fail-closed source/tree/authority checks. This is release-blocking for 0.7.10.
  Scope: |-
    - In scope: Productize two defects observed while integrating PR #5976: managed task/review artifact commits must not invalidate an otherwise unchanged verified implementation identity, and evaluator compatibility recording must project canonical task state without a runtime-only patch. Add focused regression coverage for the exact FINAL_VALIDATION -> evaluator -> pre-merge closure path. Preserve fail-closed source/tree/authority checks. This is release-blocking for 0.7.10.
    - Out of scope: unrelated refactors not required for "Fix canonical final-validation recovery loops before 0.7.10 release".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix canonical final-validation recovery loops before 0.7.10 release". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix canonical final-validation recovery loops before 0.7.10 release". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "b701a2e48016f1a56304d090d5ac87c59fbfe581"
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
              - "git_read"
              - "report_result"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ccec31711d3a5db6db02ad4a662d34a3a5b38a8585cee9419946be910730acbd"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:672ad6c0f8fdbcd9c428b6fda92612e87831883c8f3fcdd3a86fff4068fcaf88"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:e681cf4eb1ef9b2f3d2d3177c6d842abeff86bd9e8f70c806d121dc129beccd3"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d15366d50b299af7a44e43cd65e1df9c8bc353eceb8c6932e2e10ab4fc689cbd"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/task"
            task_id: "202609192353-V24DRJ"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun test packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "report_result"
              - "repository_read"
              - "repository_write"
              - "run_tests"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:bd1c3cd1d7a43eb44b0ec3c1f7bb54349cb6a18094f6354c2822e6400d3f69bc"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:672ad6c0f8fdbcd9c428b6fda92612e87831883c8f3fcdd3a86fff4068fcaf88"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:e681cf4eb1ef9b2f3d2d3177c6d842abeff86bd9e8f70c806d121dc129beccd3"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:ccec31711d3a5db6db02ad4a662d34a3a5b38a8585cee9419946be910730acbd"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ec44a8fc593d63b04e7e3522c1991e2ef4a485a0832d94a2bff3138ca51aeea9"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/evaluator"
              - "packages/agentplane/src/commands/task"
            task_id: "202609192353-V24DRJ"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun test packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.test.ts"
              - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
            evidence_digest: "sha256:6540e95f0aa1195ec23b92e5a6f1f184da6875cd5b64a109e8383613483e46be"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:d15366d50b299af7a44e43cd65e1df9c8bc353eceb8c6932e2e10ab4fc689cbd"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:e681cf4eb1ef9b2f3d2d3177c6d842abeff86bd9e8f70c806d121dc129beccd3"
        digest: "sha256:672ad6c0f8fdbcd9c428b6fda92612e87831883c8f3fcdd3a86fff4068fcaf88"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:51d89ac495acba81756022eb71c65d6cd23805a80f6d502c3359ae3fb6baccee"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "run_tests"
                - "report_result"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/evaluator"
            expected_outputs:
              - "final-validation-managed-artifact-recovery"
              - "canonical-evaluator-projection"
              - "recovery-regression-tests"
            id: "controller-recovery-fix"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609192353-V24DRJ"
      intent_digest: "sha256:bbbcd53ed81f33a9c80622f0b74b6cf51bb6b6a18f12a5c512cafcd2c9410ec5"
      migration_receipts: []
      mutation_receipts:
        capture:202609192353-V24DRJ:
          after_revision: 1
          aggregate_digest: "sha256:e4f952ca096630c4c8ffbcfcd3b2cedfa390e1db38804c5a8bb7174e4a32d492"
          before_revision: 0
          command_digest: "sha256:c1bbbd1eb778e10b16b30125498bbcf0ec855f935aa783f13a0e8ead5a225d72"
          effect_ids: []
          event_digests:
            - "sha256:19f38a6cc736c75c1e9f08d29f0a705e5823c0455fa91c817fbe52b84e7a7a10"
          mutation_id: "capture:202609192353-V24DRJ"
        kernel_work_item_claim_required:sha256:33f2728c7d4ea3db04dc5c537e077dedd100b7fddce8afd526c3573ee6530c22:sha256:d15366d50b299af7a44e43cd65e1df9c8bc353eceb8c6932e2e10ab4fc689cbd:
          after_revision: 5
          aggregate_digest: "sha256:25a049706988dc12dbab92ee7ab20abe95157181802b5d5b16d9a66b3baf67b9"
          before_revision: 4
          command_digest: "sha256:016df346f3aac8f9b441a49afc2f7aad4e42df461cc0387a8afe943c2d2d4c77"
          effect_ids: []
          event_digests:
            - "sha256:5d0b9d48b11fac5507cebe5634ba846e5670ded3ff98e7103a1eced241f5eaf6"
          mutation_id: "kernel_work_item_claim_required:sha256:33f2728c7d4ea3db04dc5c537e077dedd100b7fddce8afd526c3573ee6530c22:sha256:d15366d50b299af7a44e43cd65e1df9c8bc353eceb8c6932e2e10ab4fc689cbd"
        kernel_work_item_execution_required:sha256:72527de3bde5ad45ea82759bd5684b5066c8742d1bf15d308a3c3c658072f034:sha256:d15366d50b299af7a44e43cd65e1df9c8bc353eceb8c6932e2e10ab4fc689cbd:
          after_revision: 6
          aggregate_digest: "sha256:54fde8050ad0b7f7671c259013812d0f9869d6503fd5a4eb0112cfd10a2677a3"
          before_revision: 5
          command_digest: "sha256:e7a8e090d49d3e81da00db6db353c24fcf2ed101a5d293ac611e632f53dedae0"
          effect_ids: []
          event_digests:
            - "sha256:1ed716ab53365ea61a2d4fb65e3e6b9efe805dcbdc17bbf760b1d7af5448e308"
          mutation_id: "kernel_work_item_execution_required:sha256:72527de3bde5ad45ea82759bd5684b5066c8742d1bf15d308a3c3c658072f034:sha256:d15366d50b299af7a44e43cd65e1df9c8bc353eceb8c6932e2e10ab4fc689cbd"
        kernel_work_item_materialization_required:sha256:183ce8e0aeb0a6bbad773a99896d792af41ac2a881498a2bb12a501e4d8a6af5:sha256:d15366d50b299af7a44e43cd65e1df9c8bc353eceb8c6932e2e10ab4fc689cbd:
          after_revision: 4
          aggregate_digest: "sha256:a879bed0d60f48197e6757cd904bddf0fe8a040e23ce8bb80829265e1a4c13f8"
          before_revision: 3
          command_digest: "sha256:31e40008b062d5f1b509d969b0d0e09c7bcec8699f9c997980a397ff2427d1bf"
          effect_ids: []
          event_digests:
            - "sha256:50717d54033e37fe6dfc73363cecaac0b4d0820ca25faee1741eaa88fae75ba5"
          mutation_id: "kernel_work_item_materialization_required:sha256:183ce8e0aeb0a6bbad773a99896d792af41ac2a881498a2bb12a501e4d8a6af5:sha256:d15366d50b299af7a44e43cd65e1df9c8bc353eceb8c6932e2e10ab4fc689cbd"
        result:sha256:4be1c6eb5da5a8deb996022327be458bbc97712347b23869c9052a9907a0cdae:
          after_revision: 2
          aggregate_digest: "sha256:f4a0e420c1a9374180ab3ee9d6043edf3631b3ed138fd29555fc83f0e78b2e78"
          before_revision: 1
          command_digest: "sha256:ef91bc7fbc8f583a3ab1baab4b14d1482d487f315eed6961550559820f7a7fee"
          effect_ids: []
          event_digests:
            - "sha256:83bc8ae6bfbbc1bb3aa476d2513941aa104de83b2b83542357673aec76c48a18"
          mutation_id: "result:sha256:4be1c6eb5da5a8deb996022327be458bbc97712347b23869c9052a9907a0cdae"
        sha256:29f00e57e98bfaed3c77e7de76cf24d091a8f7995a3d3945601f0cb16de3f38a:
          after_revision: 3
          aggregate_digest: "sha256:0a337fa51022706f1828fae070e298ffedc521dacc76982627056d1d593edc35"
          before_revision: 2
          command_digest: "sha256:4b583e6f63aa061f7e09d27368f5ca48bd0f815e781fd879725aabebb52abe9a"
          effect_ids: []
          event_digests:
            - "sha256:d4d9c143ff33fdb708806ec5afb20d4ee8f7d118aa167c82068a012c77cf51b6"
          mutation_id: "sha256:29f00e57e98bfaed3c77e7de76cf24d091a8f7995a3d3945601f0cb16de3f38a"
        sha256:960511a57a52bd433121df30dbd897c6bd1f53b933e9676f1c0c8a748cbefc72:
          after_revision: 7
          aggregate_digest: "sha256:00269f4326f3bfd9ba5530ae19383e526924c88c22973ddf5e33eb4624c341ea"
          before_revision: 6
          command_digest: "sha256:b3214bcbf9df2e26dc51f2bb43dc8bbe598780ac00183b32731d8213f43d990e"
          effect_ids: []
          event_digests:
            - "sha256:36b74920653e99e199afb7c80e0e0a1b32ebd904871b4be7fc470c4b3a50c8be"
          mutation_id: "sha256:960511a57a52bd433121df30dbd897c6bd1f53b933e9676f1c0c8a748cbefc72"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        controller-recovery-fix:
          attempt: 1
          claim_id: "sha256:ac6b22733423e4dd5dabf24486daade3879ea000d6eee59c72e844a8a1500375"
          definition:
            contract_digest: "sha256:51d89ac495acba81756022eb71c65d6cd23805a80f6d502c3359ae3fb6baccee"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "run_tests"
                - "report_result"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/evaluator"
            expected_outputs:
              - "final-validation-managed-artifact-recovery"
              - "canonical-evaluator-projection"
              - "recovery-regression-tests"
            id: "controller-recovery-fix"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:8f431affaa62e063cb636888cff25a5beed3f029969a30d32fa97f4e42909e53"
    documents:
      contracts:
        sha256:51d89ac495acba81756022eb71c65d6cd23805a80f6d502c3359ae3fb6baccee:
          acceptance_criteria:
            - "The exact FINAL_VALIDATION -> managed completion artifact -> evaluator review -> pre-merge closure sequence completes without a commit-identity loop."
            - "Unmanaged source, tree, authority, or unrelated commit drift remains fail-closed."
            - "Evaluator review recording updates the canonical projection through the supported mutation contract."
            - "Focused regression tests distinguish accepted managed artifact rewrites from rejected implementation drift."
            - "No temporary environment bypass or installed-runtime-only patch is added to release source."
          objective: "Make canonical final validation tolerate only proven managed task/review artifact commits after a verified implementation, and make evaluator compatibility recording project canonical task state without runtime patches."
          role: "EXECUTOR"
          verification_commands:
            - "bun test packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
            - "bun run ci:local:full"
      intent:
        context: "Productize two defects observed while integrating PR #5976: managed task/review artifact commits must not invalidate an otherwise unchanged verified implementation identity, and evaluator compatibility recording must project canonical task state without a runtime-only patch. Add focused regression coverage for the exact FINAL_VALIDATION -> evaluator -> pre-merge closure path. Preserve fail-closed source/tree/authority checks. This is release-blocking for 0.7.10."
        objective: "Fix canonical final-validation recovery loops before 0.7.10 release"
    events:
      -
        command_digest: "sha256:c1bbbd1eb778e10b16b30125498bbcf0ec855f935aa783f13a0e8ead5a225d72"
        id: "capture:202609192353-V24DRJ:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609192353-V24DRJ"
        occurred_at: "2026-09-19T23:53:03.673Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609192353-V24DRJ"
        task_revision: 1
      -
        command_digest: "sha256:ef91bc7fbc8f583a3ab1baab4b14d1482d487f315eed6961550559820f7a7fee"
        id: "result:sha256:4be1c6eb5da5a8deb996022327be458bbc97712347b23869c9052a9907a0cdae:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:4be1c6eb5da5a8deb996022327be458bbc97712347b23869c9052a9907a0cdae"
        occurred_at: "2026-09-19T23:54:22.527Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609192353-V24DRJ"
        task_revision: 2
      -
        command_digest: "sha256:4b583e6f63aa061f7e09d27368f5ca48bd0f815e781fd879725aabebb52abe9a"
        id: "sha256:29f00e57e98bfaed3c77e7de76cf24d091a8f7995a3d3945601f0cb16de3f38a:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:29f00e57e98bfaed3c77e7de76cf24d091a8f7995a3d3945601f0cb16de3f38a"
        occurred_at: "2026-09-19T23:54:30.917Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609192353-V24DRJ"
        task_revision: 3
      -
        command_digest: "sha256:31e40008b062d5f1b509d969b0d0e09c7bcec8699f9c997980a397ff2427d1bf"
        id: "kernel_work_item_materialization_required:sha256:183ce8e0aeb0a6bbad773a99896d792af41ac2a881498a2bb12a501e4d8a6af5:sha256:d15366d50b299af7a44e43cd65e1df9c8bc353eceb8c6932e2e10ab4fc689cbd:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:183ce8e0aeb0a6bbad773a99896d792af41ac2a881498a2bb12a501e4d8a6af5:sha256:d15366d50b299af7a44e43cd65e1df9c8bc353eceb8c6932e2e10ab4fc689cbd"
        occurred_at: "2026-09-19T23:54:39.773Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609192353-V24DRJ"
        task_revision: 4
      -
        command_digest: "sha256:016df346f3aac8f9b441a49afc2f7aad4e42df461cc0387a8afe943c2d2d4c77"
        id: "kernel_work_item_claim_required:sha256:33f2728c7d4ea3db04dc5c537e077dedd100b7fddce8afd526c3573ee6530c22:sha256:d15366d50b299af7a44e43cd65e1df9c8bc353eceb8c6932e2e10ab4fc689cbd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:33f2728c7d4ea3db04dc5c537e077dedd100b7fddce8afd526c3573ee6530c22:sha256:d15366d50b299af7a44e43cd65e1df9c8bc353eceb8c6932e2e10ab4fc689cbd"
        occurred_at: "2026-09-19T23:54:43.883Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609192353-V24DRJ"
        task_revision: 5
      -
        command_digest: "sha256:e7a8e090d49d3e81da00db6db353c24fcf2ed101a5d293ac611e632f53dedae0"
        id: "kernel_work_item_execution_required:sha256:72527de3bde5ad45ea82759bd5684b5066c8742d1bf15d308a3c3c658072f034:sha256:d15366d50b299af7a44e43cd65e1df9c8bc353eceb8c6932e2e10ab4fc689cbd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:72527de3bde5ad45ea82759bd5684b5066c8742d1bf15d308a3c3c658072f034:sha256:d15366d50b299af7a44e43cd65e1df9c8bc353eceb8c6932e2e10ab4fc689cbd"
        occurred_at: "2026-09-19T23:55:20.527Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609192353-V24DRJ"
        task_revision: 6
      -
        command_digest: "sha256:b3214bcbf9df2e26dc51f2bb43dc8bbe598780ac00183b32731d8213f43d990e"
        id: "sha256:960511a57a52bd433121df30dbd897c6bd1f53b933e9676f1c0c8a748cbefc72:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:960511a57a52bd433121df30dbd897c6bd1f53b933e9676f1c0c8a748cbefc72"
        occurred_at: "2026-09-20T00:18:11.888Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609192353-V24DRJ"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Fix canonical final-validation recovery loops before 0.7.10 release

Productize two defects observed while integrating PR #5976: managed task/review artifact commits must not invalidate an otherwise unchanged verified implementation identity, and evaluator compatibility recording must project canonical task state without a runtime-only patch. Add focused regression coverage for the exact FINAL_VALIDATION -> evaluator -> pre-merge closure path. Preserve fail-closed source/tree/authority checks. This is release-blocking for 0.7.10.

## Scope

- In scope: Productize two defects observed while integrating PR #5976: managed task/review artifact commits must not invalidate an otherwise unchanged verified implementation identity, and evaluator compatibility recording must project canonical task state without a runtime-only patch. Add focused regression coverage for the exact FINAL_VALIDATION -> evaluator -> pre-merge closure path. Preserve fail-closed source/tree/authority checks. This is release-blocking for 0.7.10.
- Out of scope: unrelated refactors not required for "Fix canonical final-validation recovery loops before 0.7.10 release".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Fix canonical final-validation recovery loops before 0.7.10 release". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix canonical final-validation recovery loops before 0.7.10 release". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
