---
id: "202609192051-QAHTFD"
title: "Productize release-blocking AgentPlane controller fixes for 0.7.10"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "release-0.7.10"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
  - "publish"
verify:
  - "bun test packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts"
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
doc_updated_at: "2026-09-19T20:51:13.882Z"
doc_updated_by: "CODER"
description: "Integrate and regression-test the temporary runtime fixes required to complete branch_pr publication: canonical task worktree recovery, hook-retry staging refresh, rewritten managed-artifact commit identity, canonical pre-merge evidence compatibility, hosted-close closure basis, and exact-HEAD release qualification. Preserve fail-closed authority and scope checks. Then take the change through PR integration as the final prerequisite for release 0.7.10."
sections:
  Summary: |-
    Productize release-blocking AgentPlane controller fixes for 0.7.10

    Integrate and regression-test the temporary runtime fixes required to complete branch_pr publication: canonical task worktree recovery, hook-retry staging refresh, rewritten managed-artifact commit identity, canonical pre-merge evidence compatibility, hosted-close closure basis, and exact-HEAD release qualification. Preserve fail-closed authority and scope checks. Then take the change through PR integration as the final prerequisite for release 0.7.10.
  Scope: |-
    - In scope: Integrate and regression-test the temporary runtime fixes required to complete branch_pr publication: canonical task worktree recovery, hook-retry staging refresh, rewritten managed-artifact commit identity, canonical pre-merge evidence compatibility, hosted-close closure basis, and exact-HEAD release qualification. Preserve fail-closed authority and scope checks. Then take the change through PR integration as the final prerequisite for release 0.7.10.
    - Out of scope: unrelated refactors not required for "Productize release-blocking AgentPlane controller fixes for 0.7.10".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Productize release-blocking AgentPlane controller fixes for 0.7.10". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Productize release-blocking AgentPlane controller fixes for 0.7.10". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "a843b955ca9cbab2dd7389b4dbcb5e503e580def"
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
              - "git_read"
              - "process_execute"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:1864948537758be31bcfeb0d3a4639ef61c9f2c9f06efafafd694a1eb013c8b9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f1465aec1c3d4f4f46ef4a06348cd2f30981bb8c18fa652aee51096386c2117f"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:6acd3ec1d5db01c3f86881f0392006e8ed39e56b6f058823299dc3ade3145412"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "current task worktree"
              - "existing Bun test infrastructure"
              - "existing repository verification scripts"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands"
            task_id: "202609192051-QAHTFD"
            validation_requirements:
              - "bun test packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "process_execute"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:31d62f3e7a257770230712468223c1da28862b03ec84c736fcc27de7c132b784"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f1465aec1c3d4f4f46ef4a06348cd2f30981bb8c18fa652aee51096386c2117f"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6acd3ec1d5db01c3f86881f0392006e8ed39e56b6f058823299dc3ade3145412"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:1864948537758be31bcfeb0d3a4639ef61c9f2c9f06efafafd694a1eb013c8b9"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "current task worktree"
              - "existing Bun test infrastructure"
              - "existing repository verification scripts"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands"
            task_id: "202609192051-QAHTFD"
            validation_requirements:
              - "bun test packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/pr/integrate/internal/prepare.ts"
              - "packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.ts"
              - "packages/agentplane/src/commands/shared/quality-review-target.ts"
              - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/hosted-close-premerge.ts"
              - "packages/agentplane/src/commands/task/kernel-advance.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            evidence_digest: "sha256:4b618eee828034e36f97099d4307938e589b44e9c64485be53c624510a617513"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:6acd3ec1d5db01c3f86881f0392006e8ed39e56b6f058823299dc3ade3145412"
        digest: "sha256:f1465aec1c3d4f4f46ef4a06348cd2f30981bb8c18fa652aee51096386c2117f"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:9249e1d5483a77cb448de9cf7be85f829ec1cad7494fb868880b8d7eb1579461"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
              resources:
                - "current task worktree"
              scope_roots:
                - "packages/agentplane/src/commands"
            expected_outputs:
              - "controller-source-changes"
            id: "controller-fixes"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:f18794129726c30366878580330bf371287c4a4a3e3d32549a63c605fd166475"
            depends_on:
              - "controller-fixes"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "process_execute"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "tests"
              resources:
                - "existing Bun test infrastructure"
              scope_roots:
                - "packages/agentplane/src/commands"
            expected_outputs:
              - "focused-regression-coverage"
            id: "regression-tests"
            optional: false
            required_inputs:
              - "controller-source-changes"
          -
            contract_digest: "sha256:7668b680d809731090ef8e4212cac3f1af27e338bf2d91fadc294bfe558c4473"
            depends_on:
              - "regression-tests"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "process_execute"
              external_effects: []
              repository_effects: []
              resources:
                - "existing repository verification scripts"
              scope_roots:
                - "packages/agentplane/src/commands"
            expected_outputs:
              - "verification-evidence"
              - "scope-review"
            id: "verification"
            optional: false
            required_inputs:
              - "controller-source-changes"
              - "focused-regression-coverage"
      effects: []
      final_validation: null
      id: "202609192051-QAHTFD"
      intent_digest: "sha256:c352f3dfcc7948d95588efa011cd21100e4a7df4839e792c786430d0dc704856"
      migration_receipts: []
      mutation_receipts:
        capture:202609192051-QAHTFD:
          after_revision: 1
          aggregate_digest: "sha256:5a1b47509c91942f37fd0586963d79a5e1c96a4ea04afb359c2fce34249db1f3"
          before_revision: 0
          command_digest: "sha256:94ca7a8b7165ea03454a02488b0d163ace9487699fc1d45444cab6ebf2de6be0"
          effect_ids: []
          event_digests:
            - "sha256:e07b0b2401de2519245b18a408d2f5042e73451a9eacac2d7fa67c607dc27294"
          mutation_id: "capture:202609192051-QAHTFD"
        kernel_work_item_claim_required:sha256:6c2d1ea9127894b4037129e4e53300c45265779c5f6f6bdce8007a50296eb1b4:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e:
          after_revision: 5
          aggregate_digest: "sha256:e7044fe9b94efc6d37c1a1309911205f3a53d558550c7b8c10f9f5d4941c18cc"
          before_revision: 4
          command_digest: "sha256:b236289404ad72d8426263c87210777b43494fc1cadc563412848b729355b6da"
          effect_ids: []
          event_digests:
            - "sha256:bd700f0bb88a8e0c6f4831dd1cd82effd3277277129021d8d84c6f03882d9866"
          mutation_id: "kernel_work_item_claim_required:sha256:6c2d1ea9127894b4037129e4e53300c45265779c5f6f6bdce8007a50296eb1b4:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
        kernel_work_item_execution_required:sha256:431944b0db893c4ca407281476300b6493c127692ceefa9d7cee538b4c02b2e7:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d:
          after_revision: 13
          aggregate_digest: "sha256:6ef56994508969c8565cbc5b6e61597d7bbb5d4022399b824ce4ced9e79b399d"
          before_revision: 12
          command_digest: "sha256:2c0f6a1eb460cb1ed6d48d85f459752189b0df62a78c568180a5dddee4c96bca"
          effect_ids: []
          event_digests:
            - "sha256:3b6cfcb07ff2af49b8a929989197091ad4766d6815ef5c43d12ca2745c996dd5"
          mutation_id: "kernel_work_item_execution_required:sha256:431944b0db893c4ca407281476300b6493c127692ceefa9d7cee538b4c02b2e7:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
        kernel_work_item_execution_required:sha256:98b58c0eb8d7b4494fae053ba222ad9ccfe8722cb7fbe5ce1f6286a37b8fcfa5:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e:
          after_revision: 6
          aggregate_digest: "sha256:069a6d212ed83a614fae71a44532a4e0a9059f9a7450adb67c3820b8b3dc1c77"
          before_revision: 5
          command_digest: "sha256:1283b6d126e8cce0c5be5e1c2f7658982a72534e54b1fef3341c58847adbf6ab"
          effect_ids: []
          event_digests:
            - "sha256:69ae0c58f3be9faefcbb481fe723f0db721d3aff41d6e12edf410d5d0943ffe1"
          mutation_id: "kernel_work_item_execution_required:sha256:98b58c0eb8d7b4494fae053ba222ad9ccfe8722cb7fbe5ce1f6286a37b8fcfa5:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
        kernel_work_item_inspection_required:sha256:861f644cef9e43f993b74902b76e473f81cd6bb3f52c4e9dbbd685d589ca744c:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d:
          after_revision: 9
          aggregate_digest: "sha256:656829bf3e62f90cbd83b1ac3ffd3ac46588e62b13c3514b8b84e44bb6a75358"
          before_revision: 8
          command_digest: "sha256:660cb1fd2d47f1c8476e10bc8bf0529547af836b7053406853675d1fd3d1968c"
          effect_ids: []
          event_digests:
            - "sha256:ef2f2b65874a088fe19f315ff05d372696923a9aa7f940057c87da8c024fe4ed"
          mutation_id: "kernel_work_item_inspection_required:sha256:861f644cef9e43f993b74902b76e473f81cd6bb3f52c4e9dbbd685d589ca744c:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
        kernel_work_item_materialization_required:sha256:0ed3cc37cc1521bc0412e871132dad935af51d4348967ae968109df3abac82e8:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e:
          after_revision: 4
          aggregate_digest: "sha256:5593673a82d4ba03cce811d55371d9945ac24852aa9e2dc13df5cec136fa9d39"
          before_revision: 3
          command_digest: "sha256:56514e67b901b129c564c0711b2850c1f2c0950f85266976bfef2005f7e18eaf"
          effect_ids: []
          event_digests:
            - "sha256:2d2120634f33152edf09402d72cbf231a07d65f41c2791dfb00fb62b4771689e"
          mutation_id: "kernel_work_item_materialization_required:sha256:0ed3cc37cc1521bc0412e871132dad935af51d4348967ae968109df3abac82e8:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
        kernel_work_item_rework_claim_required:sha256:a7f00db3ae589ab810b44cd3c81dade00673d03ea28bffe50dca08e87ac2b92b:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d:
          after_revision: 12
          aggregate_digest: "sha256:0d55f3aa6fc25a9d082f4840961790ff806d9a3fa0749ccacdc110eca79da6e4"
          before_revision: 11
          command_digest: "sha256:2ffa621b4a6281cf954dfb737a11eec024e14a154b339a272ab6624d9245b680"
          effect_ids: []
          event_digests:
            - "sha256:129d8c520a37aab0c7ede5c2e6c55199459b7b1999301393008be3f3a5578fca"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:a7f00db3ae589ab810b44cd3c81dade00673d03ea28bffe50dca08e87ac2b92b:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
        result:sha256:124278beb02475d8ee10dc04b382691fd8eeae2068b9e313f07deef5617de013:
          after_revision: 8
          aggregate_digest: "sha256:577a7353faae631232fa6a4ad2803ba97d8b09274c7216f0088323444120b8e1"
          before_revision: 7
          command_digest: "sha256:5c3bd147fcab0ff0952f7025b32340f3e9241f1e4a3610613bc045fa6b419c9a"
          effect_ids: []
          event_digests:
            - "sha256:f53bd8857a24caf7034f8143595288dacf8949724f56d4af8e0d97a412faf174"
          mutation_id: "result:sha256:124278beb02475d8ee10dc04b382691fd8eeae2068b9e313f07deef5617de013"
        result:sha256:f6fe470c6e87de0edf67fab97f602ab54cb8d70e30d2695eeb6ecbbb8ac6466f:
          after_revision: 2
          aggregate_digest: "sha256:8b1b86ee93abc2ffaab6d7cf59c083fe6df27d12ed3c2336eb11ea19f950a1df"
          before_revision: 1
          command_digest: "sha256:05a35f0a03c67b31df67f3076b8bf8bd8448dd14733bf4d2f4a521a1e5b35476"
          effect_ids: []
          event_digests:
            - "sha256:5008e0d5704cf2c1c8c9b21d5123c7678d86d48057c7b42f6ab27448b4951c32"
          mutation_id: "result:sha256:f6fe470c6e87de0edf67fab97f602ab54cb8d70e30d2695eeb6ecbbb8ac6466f"
        sha256:692857c81e25e0a8dc7ef2b224c3a111844c3206a82cc4987a447baa5baf5700:
          after_revision: 7
          aggregate_digest: "sha256:f16215a58097fa62281ed09c5bf6f7538f9263f80dc9b9ac3719ea9a6c10df43"
          before_revision: 6
          command_digest: "sha256:3c406b8c87fba4d27f6c80a16af29d720000d9857f70f8802d4c5d195074563c"
          effect_ids: []
          event_digests:
            - "sha256:97e5552ed5865d013562ae2a67321990d89e31b5d4a02d657279c97041ce681b"
          mutation_id: "sha256:692857c81e25e0a8dc7ef2b224c3a111844c3206a82cc4987a447baa5baf5700"
        sha256:cc3091081ec0684f8ebc90860556ddebe9856959d8b43af4c82b0078f1636399:
          after_revision: 3
          aggregate_digest: "sha256:8eaaa6b3f2e85c969e1296c1d64313e38b0baa5c7ce2f91644cde3c1cd7b07d1"
          before_revision: 2
          command_digest: "sha256:e5cdabc76be05c9fd3ffe9807ddf61714db51587603e9f24a5e9bc44bb4e55e9"
          effect_ids: []
          event_digests:
            - "sha256:e577d7336e14f1a0b3784bf4d2dfe31dc98674844a9d6855463abfc31e7a3424"
          mutation_id: "sha256:cc3091081ec0684f8ebc90860556ddebe9856959d8b43af4c82b0078f1636399"
        validation-resolution:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c:
          after_revision: 11
          aggregate_digest: "sha256:034d53aed544e141ee8e9f85c4d6403f391022759412d2ff265a75a61c088399"
          before_revision: 10
          command_digest: "sha256:f843237369f99e7b9864c5cd691cf5c31883525746ddbfbebcf77de1383e595b"
          effect_ids: []
          event_digests:
            - "sha256:29dda1fb5616b5ac8c17e53d412f6ca58341442ca62aaf06950bd1bf8bafc20f"
          mutation_id: "validation-resolution:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c"
        validation:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c:
          after_revision: 10
          aggregate_digest: "sha256:79e422642270f04a34dc3c92394fc14e5e1527ced3ec37156ca04866f0a2011c"
          before_revision: 9
          command_digest: "sha256:81c95a3915263e6ca33a1a78070ed6293bd3d6e620a3c34271e35650f61c3349"
          effect_ids: []
          event_digests:
            - "sha256:38a5898db80451c9629d7e6d31ebd922163556cda25a60c6d1932a40b20c0474"
          mutation_id: "validation:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "ACTIVE"
      work_items:
        controller-fixes:
          attempt: 2
          claim_id: "sha256:421c794019b93cfaf421ee46f19bc963f11c207d0983781e3627557ab96eb676"
          definition:
            contract_digest: "sha256:9249e1d5483a77cb448de9cf7be85f829ec1cad7494fb868880b8d7eb1579461"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
              resources:
                - "current task worktree"
              scope_roots:
                - "packages/agentplane/src/commands"
            expected_outputs:
              - "controller-source-changes"
            id: "controller-fixes"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 9
          state: "EXECUTING"
          validation: null
        regression-tests:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:f18794129726c30366878580330bf371287c4a4a3e3d32549a63c605fd166475"
            depends_on:
              - "controller-fixes"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "process_execute"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "tests"
              resources:
                - "existing Bun test infrastructure"
              scope_roots:
                - "packages/agentplane/src/commands"
            expected_outputs:
              - "focused-regression-coverage"
            id: "regression-tests"
            optional: false
            required_inputs:
              - "controller-source-changes"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        verification:
          state: "PLANNED"
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:7668b680d809731090ef8e4212cac3f1af27e338bf2d91fadc294bfe558c4473"
            depends_on:
              - "regression-tests"
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "process_execute"
              external_effects: []
              repository_effects: []
              resources:
                - "existing repository verification scripts"
              scope_roots:
                - "packages/agentplane/src/commands"
            expected_outputs:
              - "verification-evidence"
              - "scope-review"
            id: "verification"
            optional: false
            required_inputs:
              - "controller-source-changes"
              - "focused-regression-coverage"
          output_manifests: []
          result_digest: null
          revision: 1
          validation: null
    digest: "sha256:871a0631f82435381b9852ced425a25bb3c596e1f18780db1d53568e0d7be06c"
    documents:
      contracts:
        sha256:7668b680d809731090ef8e4212cac3f1af27e338bf2d91fadc294bfe558c4473:
          acceptance_criteria:
            - "Focused tests pass"
            - "All AgentPlane-assigned verification passes"
            - "Final git status contains no unintended files"
          objective: "Run focused tests, assigned broader checks, and inspect the final diff for unintended changes."
          role: "EVALUATOR"
          verification_commands:
            - "bun test packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts"
        sha256:9249e1d5483a77cb448de9cf7be85f829ec1cad7494fb868880b8d7eb1579461:
          acceptance_criteria:
            - "Only the six identified controller contracts change"
            - "No authorization or verification gate is disabled"
            - "Configuration-aware paths replace hard-coded task paths where applicable"
          objective: "Reconcile the proven temporary runtime fixes with current main while preserving fail-closed authority and scope checks."
          role: "EXECUTOR"
          verification_commands: []
        sha256:f18794129726c30366878580330bf371287c4a4a3e3d32549a63c605fd166475:
          acceptance_criteria:
            - "Each changed behavior has a failing-before and passing-after regression"
            - "Tests use existing fixtures and infrastructure"
          objective: "Add focused regressions for every release blocker fixed in the controller."
          role: "EXECUTOR"
          verification_commands:
            - "bun test packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/shared/canonical-pre-merge-evidence.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-advance.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts"
      intent:
        context: "Integrate and regression-test the temporary runtime fixes required to complete branch_pr publication: canonical task worktree recovery, hook-retry staging refresh, rewritten managed-artifact commit identity, canonical pre-merge evidence compatibility, hosted-close closure basis, and exact-HEAD release qualification. Preserve fail-closed authority and scope checks. Then take the change through PR integration as the final prerequisite for release 0.7.10."
        objective: "Productize release-blocking AgentPlane controller fixes for 0.7.10"
    events:
      -
        command_digest: "sha256:94ca7a8b7165ea03454a02488b0d163ace9487699fc1d45444cab6ebf2de6be0"
        id: "capture:202609192051-QAHTFD:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609192051-QAHTFD"
        occurred_at: "2026-09-19T20:51:13.815Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609192051-QAHTFD"
        task_revision: 1
      -
        command_digest: "sha256:05a35f0a03c67b31df67f3076b8bf8bd8448dd14733bf4d2f4a521a1e5b35476"
        id: "result:sha256:f6fe470c6e87de0edf67fab97f602ab54cb8d70e30d2695eeb6ecbbb8ac6466f:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:f6fe470c6e87de0edf67fab97f602ab54cb8d70e30d2695eeb6ecbbb8ac6466f"
        occurred_at: "2026-09-19T20:52:20.974Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609192051-QAHTFD"
        task_revision: 2
      -
        command_digest: "sha256:e5cdabc76be05c9fd3ffe9807ddf61714db51587603e9f24a5e9bc44bb4e55e9"
        id: "sha256:cc3091081ec0684f8ebc90860556ddebe9856959d8b43af4c82b0078f1636399:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:cc3091081ec0684f8ebc90860556ddebe9856959d8b43af4c82b0078f1636399"
        occurred_at: "2026-09-19T20:52:30.855Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609192051-QAHTFD"
        task_revision: 3
      -
        command_digest: "sha256:56514e67b901b129c564c0711b2850c1f2c0950f85266976bfef2005f7e18eaf"
        id: "kernel_work_item_materialization_required:sha256:0ed3cc37cc1521bc0412e871132dad935af51d4348967ae968109df3abac82e8:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:0ed3cc37cc1521bc0412e871132dad935af51d4348967ae968109df3abac82e8:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
        occurred_at: "2026-09-19T20:52:37.433Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609192051-QAHTFD"
        task_revision: 4
      -
        command_digest: "sha256:b236289404ad72d8426263c87210777b43494fc1cadc563412848b729355b6da"
        id: "kernel_work_item_claim_required:sha256:6c2d1ea9127894b4037129e4e53300c45265779c5f6f6bdce8007a50296eb1b4:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6c2d1ea9127894b4037129e4e53300c45265779c5f6f6bdce8007a50296eb1b4:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
        occurred_at: "2026-09-19T20:52:40.967Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609192051-QAHTFD"
        task_revision: 5
      -
        command_digest: "sha256:1283b6d126e8cce0c5be5e1c2f7658982a72534e54b1fef3341c58847adbf6ab"
        id: "kernel_work_item_execution_required:sha256:98b58c0eb8d7b4494fae053ba222ad9ccfe8722cb7fbe5ce1f6286a37b8fcfa5:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:98b58c0eb8d7b4494fae053ba222ad9ccfe8722cb7fbe5ce1f6286a37b8fcfa5:sha256:5c2731ac3fddc19ede47b31e42998369364f7c06e6f7196c11a62f640cfa051e"
        occurred_at: "2026-09-19T20:52:59.958Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609192051-QAHTFD"
        task_revision: 6
      -
        command_digest: "sha256:3c406b8c87fba4d27f6c80a16af29d720000d9857f70f8802d4c5d195074563c"
        id: "sha256:692857c81e25e0a8dc7ef2b224c3a111844c3206a82cc4987a447baa5baf5700:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:692857c81e25e0a8dc7ef2b224c3a111844c3206a82cc4987a447baa5baf5700"
        occurred_at: "2026-09-19T20:58:23.063Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609192051-QAHTFD"
        task_revision: 7
      -
        command_digest: "sha256:5c3bd147fcab0ff0952f7025b32340f3e9241f1e4a3610613bc045fa6b419c9a"
        id: "result:sha256:124278beb02475d8ee10dc04b382691fd8eeae2068b9e313f07deef5617de013:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:124278beb02475d8ee10dc04b382691fd8eeae2068b9e313f07deef5617de013"
        occurred_at: "2026-09-19T20:59:05.747Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609192051-QAHTFD"
        task_revision: 8
      -
        command_digest: "sha256:660cb1fd2d47f1c8476e10bc8bf0529547af836b7053406853675d1fd3d1968c"
        id: "kernel_work_item_inspection_required:sha256:861f644cef9e43f993b74902b76e473f81cd6bb3f52c4e9dbbd685d589ca744c:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:861f644cef9e43f993b74902b76e473f81cd6bb3f52c4e9dbbd685d589ca744c:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
        occurred_at: "2026-09-19T20:59:08.725Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609192051-QAHTFD"
        task_revision: 9
      -
        command_digest: "sha256:81c95a3915263e6ca33a1a78070ed6293bd3d6e620a3c34271e35650f61c3349"
        id: "validation:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c"
        occurred_at: "2026-09-19T21:02:15.758Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609192051-QAHTFD"
        task_revision: 10
      -
        command_digest: "sha256:f843237369f99e7b9864c5cd691cf5c31883525746ddbfbebcf77de1383e595b"
        id: "validation-resolution:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:855cf8565914c673ad0f87a2173b3de7f0d4a131c4871c8dc0be8f909051ab5c"
        occurred_at: "2026-09-19T21:02:17.702Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609192051-QAHTFD"
        task_revision: 11
      -
        command_digest: "sha256:2ffa621b4a6281cf954dfb737a11eec024e14a154b339a272ab6624d9245b680"
        id: "kernel_work_item_rework_claim_required:sha256:a7f00db3ae589ab810b44cd3c81dade00673d03ea28bffe50dca08e87ac2b92b:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:a7f00db3ae589ab810b44cd3c81dade00673d03ea28bffe50dca08e87ac2b92b:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
        occurred_at: "2026-09-19T21:02:21.527Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609192051-QAHTFD"
        task_revision: 12
      -
        command_digest: "sha256:2c0f6a1eb460cb1ed6d48d85f459752189b0df62a78c568180a5dddee4c96bca"
        id: "kernel_work_item_execution_required:sha256:431944b0db893c4ca407281476300b6493c127692ceefa9d7cee538b4c02b2e7:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:431944b0db893c4ca407281476300b6493c127692ceefa9d7cee538b4c02b2e7:sha256:24fd36f79a5fcccbd0cbe007e6bb38746a1e353f6397a79954f87dcb1a2b611d"
        occurred_at: "2026-09-19T21:02:25.319Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609192051-QAHTFD"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Productize release-blocking AgentPlane controller fixes for 0.7.10

Integrate and regression-test the temporary runtime fixes required to complete branch_pr publication: canonical task worktree recovery, hook-retry staging refresh, rewritten managed-artifact commit identity, canonical pre-merge evidence compatibility, hosted-close closure basis, and exact-HEAD release qualification. Preserve fail-closed authority and scope checks. Then take the change through PR integration as the final prerequisite for release 0.7.10.

## Scope

- In scope: Integrate and regression-test the temporary runtime fixes required to complete branch_pr publication: canonical task worktree recovery, hook-retry staging refresh, rewritten managed-artifact commit identity, canonical pre-merge evidence compatibility, hosted-close closure basis, and exact-HEAD release qualification. Preserve fail-closed authority and scope checks. Then take the change through PR integration as the final prerequisite for release 0.7.10.
- Out of scope: unrelated refactors not required for "Productize release-blocking AgentPlane controller fixes for 0.7.10".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Productize release-blocking AgentPlane controller fixes for 0.7.10". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Productize release-blocking AgentPlane controller fixes for 0.7.10". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
