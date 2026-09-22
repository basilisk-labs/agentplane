---
id: "202609220826-DS03Q6"
title: "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 23
origin:
  system: "manual"
depends_on: []
tags:
  - "canonical-task"
  - "lifecycle"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bunx vitest run packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-22T10:26:48.120Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-22T10:26:48.120Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:95341fd5c857a32f8bb3cdccffa5ee942b2982a82805efffb4c36e757057ccd5"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-22T10:26:48.120Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "eaebef093d428e7301737f9f7c82cf65f54caa9f"
  review_identity_digest: "sha256:fcdcaa339c896053d69c58fbb57177e5b78433b9e39b6429a718d796aeffbb97"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609220826-DS03Q6/005b6f6b987da8276c0d79cc320fd5e033badab5b39fd476b647971579542258/quality-report.json"
  findings:
    - "PASS: canonical COMPLETED tasks skip only the redundant legacy task-state write during pre-merge closure; quality review, native identity, commit resolution, policy, dirty-path, and branch checks still execute before the close tail is finalized."
    - "PASS: legacy tasks and non-COMPLETED canonical tasks retain the existing writeFinishedTasks path."
    - "PASS: AgentPlane observed 19 focused tests, typecheck, and lint completing successfully for implementation commit eaebef093d428e7301737f9f7c82cf65f54caa9f."
    - "PASS: provider publication, hosted checks, merge, hosted close, and cleanup are not part of this semantic WorkItem."
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
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "network_read"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
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
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:5cce438a0252ecd96091bc582c42af2d777ee0f2a627b7930089252831afd436"
      escalation_reasons: []
      execution_groups:
        - "core"
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
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
      - "repository_effect:source_code"
      - "task_outcome"
commit:
  hash: "eaebef093d428e7301737f9f7c82cf65f54caa9f"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-22T08:26:25.460Z"
doc_updated_by: "CODER"
description: "Fix the 0.7.11 lifecycle deadlock where next-action routes task.pre_merge_close for a canonical COMPLETED task but finish rejects the legacy mutation. Preserve quality, verification, branch identity, and fail-closed checks; add focused regression coverage."
sections:
  Summary: |-
    Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation

    Fix the 0.7.11 lifecycle deadlock where next-action routes task.pre_merge_close for a canonical COMPLETED task but finish rejects the legacy mutation. Preserve quality, verification, branch identity, and fail-closed checks; add focused regression coverage.
  Scope: |-
    - In scope: Fix the 0.7.11 lifecycle deadlock where next-action routes task.pre_merge_close for a canonical COMPLETED task but finish rejects the legacy mutation. Preserve quality, verification, branch identity, and fail-closed checks; add focused regression coverage.
    - Out of scope: unrelated refactors not required for "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation".
  Plan: "1. Execute approved WorkItem fix-canonical-pre-merge-closure."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  agentplane.kernel_operational_projection:
    digest: "sha256:ad72e11b0cc4a76f5610d53d334ece50fb0fcb34f5a1b59c7848bbc2a0a64053"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609220826-DS03Q6/005b6f6b987da8276c0d79cc320fd5e033badab5b39fd476b647971579542258/quality-report.json"
    findings:
      - "PASS: canonical COMPLETED tasks skip only the redundant legacy task-state write during pre-merge closure; quality review, native identity, commit resolution, policy, dirty-path, and branch checks still execute before the close tail is finalized."
      - "PASS: legacy tasks and non-COMPLETED canonical tasks retain the existing writeFinishedTasks path."
      - "PASS: AgentPlane observed 19 focused tests, typecheck, and lint completing successfully for implementation commit eaebef093d428e7301737f9f7c82cf65f54caa9f."
      - "PASS: provider publication, hosted checks, merge, hosted close, and cleanup are not part of this semantic WorkItem."
    implementation_commit: "eaebef093d428e7301737f9f7c82cf65f54caa9f"
    implementation_tree: "e4a8a043678a69764d5aa25613a519f453798189"
    projected_at: "2026-09-22T10:26:48.120Z"
    review_identity_digest: "sha256:fcdcaa339c896053d69c58fbb57177e5b78433b9e39b6429a718d796aeffbb97"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:e63c86dfa865c7c9411b62938bdf41decafd30e6a35f0b5b2eb5381980cfd0ae"
    work_order_id: "sha256:4e070eb696403c4caab7fdf8b94e9befff766e43fa83ba034df407f9c9be5d99"
  task_execution_context:
    base_ref: "main"
    base_sha: "a2104636fe2522ebdcd79ce32e5ba59f23241a6f"
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
            digest: "sha256:2c849345f77df7a2932e5d743cf9b0854919ec9ffeb41c865ad75247356e60b4"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f3bea6a413ff289484d07ba2a4e2402c78299ee8d1981d0b0801caeab77aa3e5"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:0d28b53319fb37ac8b9591b8423a182e627ed28a13d402e680e502c019a22687"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "canonical-task-projection"
              - "pre-merge-closure"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609220826-DS03Q6"
            validation_requirements:
              - "bun run lint"
              - "bun run typecheck"
              - "bunx vitest run packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
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
            digest: "sha256:6d1a4ff4b1c7ec947facd9f9f8e653df56e9944598ca4454facdaa7cfd22de73"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f3bea6a413ff289484d07ba2a4e2402c78299ee8d1981d0b0801caeab77aa3e5"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:0d28b53319fb37ac8b9591b8423a182e627ed28a13d402e680e502c019a22687"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:2c849345f77df7a2932e5d743cf9b0854919ec9ffeb41c865ad75247356e60b4"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:73818c2e6411238254edd0bf288d3f4cad4cae2691e2d945146ae1e9faf4cb29"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "canonical-task-projection"
              - "pre-merge-closure"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609220826-DS03Q6"
            validation_requirements:
              - "bun run lint"
              - "bun run typecheck"
              - "bunx vitest run packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/finish-execute.ts"
              - "packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
            evidence_digest: "sha256:bc98d41d76c95ef9baa6143875a052e17c32fe594982248a3ae35db1e52889a7"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:112941ab12c7af4c3ea483897a650b1fd088b34f56229a88d3eb4d2e0d70725a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f3bea6a413ff289484d07ba2a4e2402c78299ee8d1981d0b0801caeab77aa3e5"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:0d28b53319fb37ac8b9591b8423a182e627ed28a13d402e680e502c019a22687"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:6d1a4ff4b1c7ec947facd9f9f8e653df56e9944598ca4454facdaa7cfd22de73"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:63f8514aab82733adf1334855dfba5049b8979ba72762f1e6f1006e4eba59264"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "canonical-task-projection"
              - "pre-merge-closure"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609220826-DS03Q6"
            validation_requirements:
              - "bun run lint"
              - "bun run typecheck"
              - "bunx vitest run packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/finish-execute.ts"
              - "packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
            evidence_digest: "sha256:bfd25e301e1b6cefe0a5b0165daffa36566dcb88e3b433979905a73ea354833e"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:73818c2e6411238254edd0bf288d3f4cad4cae2691e2d945146ae1e9faf4cb29"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:0d28b53319fb37ac8b9591b8423a182e627ed28a13d402e680e502c019a22687"
        digest: "sha256:f3bea6a413ff289484d07ba2a4e2402c78299ee8d1981d0b0801caeab77aa3e5"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:0c175d9e7506059cfdad8bab3834b5713a04f809a3af167fa55247767b2bbdcd"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "canonical-task-projection"
                - "pre-merge-closure"
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "canonical-pre-merge-closure-source"
              - "canonical-pre-merge-closure-tests"
            id: "fix-canonical-pre-merge-closure"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:e63c86dfa865c7c9411b62938bdf41decafd30e6a35f0b5b2eb5381980cfd0ae"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:86bfc8132fc5ee084c72506d4bff12b9f06c5fa0f7ea910db6f64c1ebd28b48c"
          environment_digest: "sha256:1c6d4166cfe266b8abdfc333b45f553b8ee6b418fb9a404cb1e1a9a20d81465a"
          implementation_identity: "sha256:63f8514aab82733adf1334855dfba5049b8979ba72762f1e6f1006e4eba59264"
          toolchain_digest: "sha256:ac2cb47bdea52215b85160651904ddaabe82182e541155dab4e4ca45f411bb51"
        observed_at: "2026-09-22T10:26:56.004Z"
        status: "PASSED"
      id: "202609220826-DS03Q6"
      intent_digest: "sha256:16e7516e59284e421b6e8ae3c72c59be7347cede372a785c75da93252271b2fe"
      migration_receipts: []
      mutation_receipts:
        capture:202609220826-DS03Q6:
          after_revision: 1
          aggregate_digest: "sha256:a3dd2978a8cf3476ea1b58af0ecde288f6b7a241e50afd75e182621bb1662cf0"
          before_revision: 0
          command_digest: "sha256:bdbd09bd8a257d86935036af45ce4ded60b59752c058604dadda736f7a8873c2"
          effect_ids: []
          event_digests:
            - "sha256:b9fc69dc490273cddd28e8e25edfd87b8902b5b6e8c46d996545f3c62b89f89d"
          mutation_id: "capture:202609220826-DS03Q6"
        final-validation:sha256:e63c86dfa865c7c9411b62938bdf41decafd30e6a35f0b5b2eb5381980cfd0ae:18:
          after_revision: 19
          aggregate_digest: "sha256:a0da236a08d19e59d7ea75f59a3b5c5dd922bf19aa265e5c546ab6c102bcb80d"
          before_revision: 18
          command_digest: "sha256:8b72b3103aed8cc0c48d3909c6c196a2a9b5b32306b14a7fa3a8c5ee39d5ba35"
          effect_ids: []
          event_digests:
            - "sha256:c85d404143a30f617e5cae04e327854c41f273bd5301f5ef936534fb34c38a59"
          mutation_id: "final-validation:sha256:e63c86dfa865c7c9411b62938bdf41decafd30e6a35f0b5b2eb5381980cfd0ae:18"
        kernel_task_completion_required:sha256:b62fd384ed35d67accaabc8e0079c2bfc919c3df52fd0aad9416ba9a378e542b:sha256:63f8514aab82733adf1334855dfba5049b8979ba72762f1e6f1006e4eba59264:
          after_revision: 20
          aggregate_digest: "sha256:2a4dc81992b55d110ca96c58a0e5e29641e96a45615adb7b925910a5aa273a2d"
          before_revision: 19
          command_digest: "sha256:d09890bf6148837d87f3fa7c23b94974de0b876e25def029c2d915551c9ef2e4"
          effect_ids: []
          event_digests:
            - "sha256:27b3ee3aa9a43766e5673e76de19a9ec2e4a05543afcfdfe64e360877f67f64f"
          mutation_id: "kernel_task_completion_required:sha256:b62fd384ed35d67accaabc8e0079c2bfc919c3df52fd0aad9416ba9a378e542b:sha256:63f8514aab82733adf1334855dfba5049b8979ba72762f1e6f1006e4eba59264"
        kernel_work_item_claim_required:sha256:01cdb39e6f3f95ba38b287b1261009539bf07c8282502c6b15598aa5a85adae9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 5
          aggregate_digest: "sha256:3fd1eb3c5caf8d572bcf9a710391b42258c6cacc78366035f9516efd5dd563c2"
          before_revision: 4
          command_digest: "sha256:ecc9961b33da2c7ea6d192d58c4d9f362145fa334f7f8e771315208551f30327"
          effect_ids: []
          event_digests:
            - "sha256:0e6b7b3615ecdf0be5b455b9fdcc4a72acf219da92adb383fac2cae909100278"
          mutation_id: "kernel_work_item_claim_required:sha256:01cdb39e6f3f95ba38b287b1261009539bf07c8282502c6b15598aa5a85adae9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_execution_required:sha256:06bbc46eee1cf31bb9fc59018ed719cebf159237e9124367c0073ac3d8f2ef41:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 6
          aggregate_digest: "sha256:98b4f62eff71f69d185378d84913c87afd1fedbd221967c0074e258ec4370444"
          before_revision: 5
          command_digest: "sha256:d7d176ce8a946fdefc802a98a8cb3ff3b438608bb3563df57a6f29f9e460223d"
          effect_ids: []
          event_digests:
            - "sha256:1509faace711969810a38fddcbcd11af41d25c06575ca27696538fdf8b14634e"
          mutation_id: "kernel_work_item_execution_required:sha256:06bbc46eee1cf31bb9fc59018ed719cebf159237e9124367c0073ac3d8f2ef41:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_execution_required:sha256:1bcdbec85a86458077ce43500a6be589131527efb26ba832b364af33c87e178f:sha256:73818c2e6411238254edd0bf288d3f4cad4cae2691e2d945146ae1e9faf4cb29:
          after_revision: 13
          aggregate_digest: "sha256:c9b4fa57de6a2ecac71ac3c0f45760e41df6e669ed640ecb122f6115b5804882"
          before_revision: 12
          command_digest: "sha256:bef68f74ec3cd63a9c73b79a35500a7e01b1ed07ed00103003d3a1801ef852ff"
          effect_ids: []
          event_digests:
            - "sha256:bc44915c3ea65e522e87f81195dcd638f1989dee76367051262f92d7b3aada2a"
          mutation_id: "kernel_work_item_execution_required:sha256:1bcdbec85a86458077ce43500a6be589131527efb26ba832b364af33c87e178f:sha256:73818c2e6411238254edd0bf288d3f4cad4cae2691e2d945146ae1e9faf4cb29"
        kernel_work_item_inspection_required:sha256:c778183e8bcc314c36258aaa53715572c43ffd0dcd843572cb5c0e70163c2060:sha256:73818c2e6411238254edd0bf288d3f4cad4cae2691e2d945146ae1e9faf4cb29:
          after_revision: 9
          aggregate_digest: "sha256:3b39771553fdd6c859b1b360dd1df3c911bfd094083a4ae3d75dcee65bf3914c"
          before_revision: 8
          command_digest: "sha256:af61831d93e65e5b7e2fe2c4f9c0e319070b6f5e1c3ee37b30ff35c138aa6aa3"
          effect_ids: []
          event_digests:
            - "sha256:7e0c0fb21ad3fc80a935a4804a823c5cbf8b84ac742b5361e901c17171a15477"
          mutation_id: "kernel_work_item_inspection_required:sha256:c778183e8bcc314c36258aaa53715572c43ffd0dcd843572cb5c0e70163c2060:sha256:73818c2e6411238254edd0bf288d3f4cad4cae2691e2d945146ae1e9faf4cb29"
        kernel_work_item_inspection_required:sha256:f48054923fda8952a12efe551d04f2e9335348da1a4981ad0812eef3ac345d3e:sha256:63f8514aab82733adf1334855dfba5049b8979ba72762f1e6f1006e4eba59264:
          after_revision: 16
          aggregate_digest: "sha256:ea9fab59556a843e43c022d5b7cfe9b15e1d5f8bf1507c3fdb735c36924b1e93"
          before_revision: 15
          command_digest: "sha256:634f609682949ec60db093174193576fda4ea1659c8acd691f9609fab6590e33"
          effect_ids: []
          event_digests:
            - "sha256:2ddf54a257ad5f4ade8ace621cb651698956b24e909383fd0fb6b117dfbb86ec"
          mutation_id: "kernel_work_item_inspection_required:sha256:f48054923fda8952a12efe551d04f2e9335348da1a4981ad0812eef3ac345d3e:sha256:63f8514aab82733adf1334855dfba5049b8979ba72762f1e6f1006e4eba59264"
        kernel_work_item_materialization_required:sha256:c3362d07adf6b94b02820d90afe6ffb7379b14f6f738afad2d769bde69fafe8c:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 4
          aggregate_digest: "sha256:4ee0f6c1a8998d3e5daa00b4d4559d0189856edec43990185c04d91859b123f6"
          before_revision: 3
          command_digest: "sha256:91e7856b85e92c1c7adf112a63ecc70a619aedaac6901ead7132e6b788dcee28"
          effect_ids: []
          event_digests:
            - "sha256:c91204381943dbde5afe49353ddc96c360bfd815f83acebed9b86194c19a7ebd"
          mutation_id: "kernel_work_item_materialization_required:sha256:c3362d07adf6b94b02820d90afe6ffb7379b14f6f738afad2d769bde69fafe8c:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_rework_claim_required:sha256:d42b38eaa89ea1bef7d74851691f987f4eb5f06803c048d0f2121b8e761e47ee:sha256:73818c2e6411238254edd0bf288d3f4cad4cae2691e2d945146ae1e9faf4cb29:
          after_revision: 12
          aggregate_digest: "sha256:56088c005853c191dbe049eca2f9b40b7b7e67ca36417bd6f9583e217107006f"
          before_revision: 11
          command_digest: "sha256:53f9dd433df1ba0e553b6fbffe30437917d4a8744e11f11c804bf147ffe13de5"
          effect_ids: []
          event_digests:
            - "sha256:afab7c5cf4cd110c40aed51f3351064c24908c883e678347478cbe242d298743"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:d42b38eaa89ea1bef7d74851691f987f4eb5f06803c048d0f2121b8e761e47ee:sha256:73818c2e6411238254edd0bf288d3f4cad4cae2691e2d945146ae1e9faf4cb29"
        result:sha256:4e070eb696403c4caab7fdf8b94e9befff766e43fa83ba034df407f9c9be5d99:
          after_revision: 15
          aggregate_digest: "sha256:e0c6cf67cd33f509b39e89cf3e2b4c72d7c5d388663432c7ecff363b31c92ed5"
          before_revision: 14
          command_digest: "sha256:a37ba4ca566c5f31c1691eeed193323ba63f37ba0cdf2e6d791434e45d570b35"
          effect_ids: []
          event_digests:
            - "sha256:25a6b5b5e03bdffe4b20214f6dd8caa91cf03cdb51b04ef497c0564849d73348"
          mutation_id: "result:sha256:4e070eb696403c4caab7fdf8b94e9befff766e43fa83ba034df407f9c9be5d99"
        result:sha256:b37765b0bb8866fffd206c0d4d526e44a6d587e783a0960e2bff8883d21756a1:
          after_revision: 8
          aggregate_digest: "sha256:df1b718e96ae3fdd7fd866e378556e6fecb6e24f01bac7521208e874ebe04a56"
          before_revision: 7
          command_digest: "sha256:07de0ea298903f7773b6ab4c13b0ad7d310ea82e04e25db6fc8a719f69a2b015"
          effect_ids: []
          event_digests:
            - "sha256:2ffafadea84d4f0a755d05c66ef834553bb2f5442ce59a65e6d7fbbe862d9a69"
          mutation_id: "result:sha256:b37765b0bb8866fffd206c0d4d526e44a6d587e783a0960e2bff8883d21756a1"
        result:sha256:fd493ed8af957f3ad6226fc9274ad728660f2c1f2614434dc23c5bf60e81b156:
          after_revision: 2
          aggregate_digest: "sha256:123921cf1a0ab9553afd9401f37f0259dbd20190f26aba748cd75c00eadf7d61"
          before_revision: 1
          command_digest: "sha256:c90a9f49e79411dcfeba2264718035b262d9e69d1609bf7e5370146ae5371e13"
          effect_ids: []
          event_digests:
            - "sha256:3cc7e663fc34193114ea2195772cea92a63a135148dfc6270a887ef49cdaeb77"
          mutation_id: "result:sha256:fd493ed8af957f3ad6226fc9274ad728660f2c1f2614434dc23c5bf60e81b156"
        sha256:104870c1126318bd2b1052be8aa065322a0c4390bd2b89ed12d748d1780e7292:
          after_revision: 7
          aggregate_digest: "sha256:e4d7a51c5f152fc9f38fe8d93c3807120fadf6d9571150f8086de3f7d323aaaf"
          before_revision: 6
          command_digest: "sha256:b3b9366bebb0e28ecf8ccedae227d22ba697e569a9531e29fa3a72a41e5e8350"
          effect_ids: []
          event_digests:
            - "sha256:e0e99af3c06ea2da65e10c04f18c7c55c6de39de7fe0d639d51c76358c6de9e9"
          mutation_id: "sha256:104870c1126318bd2b1052be8aa065322a0c4390bd2b89ed12d748d1780e7292"
        sha256:5c051cb7d333aea39c9749b0d5b832461abbb99fa0641c7b5ed8d373a7ac6ae0:
          after_revision: 3
          aggregate_digest: "sha256:7db3fd867a7df59ac9cec980c01386bf3fe843ad1e9458b2a10afb4171564007"
          before_revision: 2
          command_digest: "sha256:9ce3be6a1fbd00abcf31c62da119b965809d146a635c1b73b3626408f5857a9d"
          effect_ids: []
          event_digests:
            - "sha256:e798d66cec527f240cfbebb68933dfc62e5e2743611975816f9f4c8c24a26a9b"
          mutation_id: "sha256:5c051cb7d333aea39c9749b0d5b832461abbb99fa0641c7b5ed8d373a7ac6ae0"
        sha256:df9a6331afd33b606f6d9c37b22eeeae231c0e3cf6b4cb79d0ff2aa4b2106c24:
          after_revision: 14
          aggregate_digest: "sha256:62ee006a315f32eb663237dbc7a1c2d9b064c13d8a9dc5e4d638bef0c3df08e3"
          before_revision: 13
          command_digest: "sha256:6b309f2a009843880b933197fef52ed86b68a87501f8416e3688d1cb8c06031d"
          effect_ids: []
          event_digests:
            - "sha256:f7a92fbca2bbde188b9367fad65ff948d5bada38c68db229146091304c8922fd"
          mutation_id: "sha256:df9a6331afd33b606f6d9c37b22eeeae231c0e3cf6b4cb79d0ff2aa4b2106c24"
        validation-resolution:sha256:0dd6d302abb8614f45c94536a5dada1c0e300f8e570bcc857d112b972dbd8480:
          after_revision: 11
          aggregate_digest: "sha256:c0b07f60d757f317ea99fb04780d1f74d9a7cc8b83b44d8c8ebfd04f38744fef"
          before_revision: 10
          command_digest: "sha256:0e253e48749887aea5e32a6c063c72f9b23e09e2d15193a0c0e67dc95a6fada7"
          effect_ids: []
          event_digests:
            - "sha256:596cfc2855e3a9f0a1129eecf6aafa0410a10ef77acaed96081b2c7bb3261bf5"
          mutation_id: "validation-resolution:sha256:0dd6d302abb8614f45c94536a5dada1c0e300f8e570bcc857d112b972dbd8480"
        validation-resolution:sha256:80f741d4dae04d7c580dced966ac8c0e3963b21a569ed45b5e1bb71d9bf40218:
          after_revision: 18
          aggregate_digest: "sha256:d5fecaf3bc4aff65b56a370824d7b368a1bd96733a5418c366b57b23ad96a7fc"
          before_revision: 17
          command_digest: "sha256:70f4be48f93ba88af71439e1704341fb269cd065734de30dc6054712e2fba53e"
          effect_ids: []
          event_digests:
            - "sha256:582b30611f6f8483581bc808ee440c8edb9e1541f837311020cab60e1046b67d"
          mutation_id: "validation-resolution:sha256:80f741d4dae04d7c580dced966ac8c0e3963b21a569ed45b5e1bb71d9bf40218"
        validation:sha256:005b6f6b987da8276c0d79cc320fd5e033badab5b39fd476b647971579542258:
          after_revision: 17
          aggregate_digest: "sha256:9aa90beb72f512786f015f0f76f2931857925cd8ae119458d0e416197d68f036"
          before_revision: 16
          command_digest: "sha256:d7703d864b362737fdf41b84e997a5103f53a2db9de3203d238ab87cce736afa"
          effect_ids: []
          event_digests:
            - "sha256:c16d211519d4baad1afc39b8f3ec21cbfac9d416a1f345be623bfb3f214bcfa3"
          mutation_id: "validation:sha256:005b6f6b987da8276c0d79cc320fd5e033badab5b39fd476b647971579542258"
        validation:sha256:a1556ae9b9a4541e5546467f4931df5efbdea0f282ace7fbfa5158b6830331eb:
          after_revision: 10
          aggregate_digest: "sha256:9cf1623169ca2cf1e3efd1d059889ef25dec9571650e6ca4c869f66f078e7371"
          before_revision: 9
          command_digest: "sha256:b2176e07bc8d16833306e58f64c82fdd9cd84f8ae7a709e72fd1f31331ba7c88"
          effect_ids: []
          event_digests:
            - "sha256:a1b23e3b81880c63207ba17002cf4097ce0c1c300da9b1840edd765788bb45ae"
          mutation_id: "validation:sha256:a1556ae9b9a4541e5546467f4931df5efbdea0f282ace7fbfa5158b6830331eb"
      plan_history: []
      revision: 20
      schema_version: 1
      state: "COMPLETED"
      work_items:
        fix-canonical-pre-merge-closure:
          attempt: 2
          claim_id: "sha256:2dfa24570bb1d4562ea04b99f1d1baa9e711b59d0ac1e661cb4d12dd045ac587"
          definition:
            contract_digest: "sha256:0c175d9e7506059cfdad8bab3834b5713a04f809a3af167fa55247767b2bbdcd"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "canonical-task-projection"
                - "pre-merge-closure"
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "canonical-pre-merge-closure-source"
              - "canonical-pre-merge-closure-tests"
            id: "fix-canonical-pre-merge-closure"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:b92c1a9c439cc8a7394b3dab0ba35e7001165f2c3f3e5aa6f0fe5d150457599f"
              id: "canonical-pre-merge-closure-source"
              kind: "source"
              plan_revision: 1
              repository_fingerprint: "sha256:63f8514aab82733adf1334855dfba5049b8979ba72762f1e6f1006e4eba59264"
              task_id: "202609220826-DS03Q6"
              work_item_id: "fix-canonical-pre-merge-closure"
            -
              attempt: 2
              digest: "sha256:5f7c6a3433b0647a4fe0d50c6dcd1ab539953334d2fa942de9b80ec49e91c805"
              id: "canonical-pre-merge-closure-tests"
              kind: "tests"
              plan_revision: 1
              repository_fingerprint: "sha256:63f8514aab82733adf1334855dfba5049b8979ba72762f1e6f1006e4eba59264"
              task_id: "202609220826-DS03Q6"
              work_item_id: "fix-canonical-pre-merge-closure"
          result_digest: "sha256:a42760ac9ccd4445364b8f881bd0836b6da5a4f6eb66e6af2d4e21eb40bbe843"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:96cdd6a2fc6ffeeeb6223a0e772ba9a65c8a01ed668e5467d42b9b2548387cc9"
              - "sha256:fcdcaa339c896053d69c58fbb57177e5b78433b9e39b6429a718d796aeffbb97"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:86bfc8132fc5ee084c72506d4bff12b9f06c5fa0f7ea910db6f64c1ebd28b48c"
              environment_digest: "sha256:c86fde9aa958161fea4ce5d13e1bbf06370ecdb5b4d152662a94214cd9fbc616"
              implementation_identity: "sha256:a42760ac9ccd4445364b8f881bd0836b6da5a4f6eb66e6af2d4e21eb40bbe843"
              toolchain_digest: "sha256:a0ee42b1cba7905d88b1510be74b48ec1d0ac21b6f282a81bfde91979f9179ad"
            observed_at: "2026-09-22T10:26:48.120Z"
            status: "PASSED"
    digest: "sha256:cf605de9a8251dda2fe8d053e87af8c479a91d418e15bdd2b0595d2ba7ad29fe"
    documents:
      contracts:
        sha256:0c175d9e7506059cfdad8bab3834b5713a04f809a3af167fa55247767b2bbdcd:
          acceptance_criteria:
            - "A canonical COMPLETED task can record the pre-merge closure marker and required task artifacts through the routed finish operation."
            - "The operation preserves current verification, quality review, commit identity, branch checks, and canonical aggregate state."
            - "Legacy tasks retain their current finish behavior."
            - "The implementation remains fail-closed for stale review, invalid branch identity, missing authority, and semantic source drift."
            - "Provider publication, hosted checks, merge, hosted close, and cleanup remain outside the semantic WorkItem."
          objective: "Allow branch_pr pre-merge closure for an already completed canonical Task without attempting a forbidden legacy Task mutation."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
            - "bun run typecheck"
            - "bun run lint"
      intent:
        context: "Fix the 0.7.11 lifecycle deadlock where next-action routes task.pre_merge_close for a canonical COMPLETED task but finish rejects the legacy mutation. Preserve quality, verification, branch identity, and fail-closed checks; add focused regression coverage."
        objective: "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation"
    events:
      -
        command_digest: "sha256:bdbd09bd8a257d86935036af45ce4ded60b59752c058604dadda736f7a8873c2"
        id: "capture:202609220826-DS03Q6:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609220826-DS03Q6"
        occurred_at: "2026-09-22T08:26:25.401Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609220826-DS03Q6"
        task_revision: 1
      -
        command_digest: "sha256:c90a9f49e79411dcfeba2264718035b262d9e69d1609bf7e5370146ae5371e13"
        id: "result:sha256:fd493ed8af957f3ad6226fc9274ad728660f2c1f2614434dc23c5bf60e81b156:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:fd493ed8af957f3ad6226fc9274ad728660f2c1f2614434dc23c5bf60e81b156"
        occurred_at: "2026-09-22T08:27:36.078Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609220826-DS03Q6"
        task_revision: 2
      -
        command_digest: "sha256:9ce3be6a1fbd00abcf31c62da119b965809d146a635c1b73b3626408f5857a9d"
        id: "sha256:5c051cb7d333aea39c9749b0d5b832461abbb99fa0641c7b5ed8d373a7ac6ae0:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:5c051cb7d333aea39c9749b0d5b832461abbb99fa0641c7b5ed8d373a7ac6ae0"
        occurred_at: "2026-09-22T08:27:47.149Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609220826-DS03Q6"
        task_revision: 3
      -
        command_digest: "sha256:91e7856b85e92c1c7adf112a63ecc70a619aedaac6901ead7132e6b788dcee28"
        id: "kernel_work_item_materialization_required:sha256:c3362d07adf6b94b02820d90afe6ffb7379b14f6f738afad2d769bde69fafe8c:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:c3362d07adf6b94b02820d90afe6ffb7379b14f6f738afad2d769bde69fafe8c:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T08:27:56.203Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609220826-DS03Q6"
        task_revision: 4
      -
        command_digest: "sha256:ecc9961b33da2c7ea6d192d58c4d9f362145fa334f7f8e771315208551f30327"
        id: "kernel_work_item_claim_required:sha256:01cdb39e6f3f95ba38b287b1261009539bf07c8282502c6b15598aa5a85adae9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:01cdb39e6f3f95ba38b287b1261009539bf07c8282502c6b15598aa5a85adae9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T08:27:59.902Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609220826-DS03Q6"
        task_revision: 5
      -
        command_digest: "sha256:d7d176ce8a946fdefc802a98a8cb3ff3b438608bb3563df57a6f29f9e460223d"
        id: "kernel_work_item_execution_required:sha256:06bbc46eee1cf31bb9fc59018ed719cebf159237e9124367c0073ac3d8f2ef41:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:06bbc46eee1cf31bb9fc59018ed719cebf159237e9124367c0073ac3d8f2ef41:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T10:09:17.473Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609220826-DS03Q6"
        task_revision: 6
      -
        command_digest: "sha256:b3b9366bebb0e28ecf8ccedae227d22ba697e569a9531e29fa3a72a41e5e8350"
        id: "sha256:104870c1126318bd2b1052be8aa065322a0c4390bd2b89ed12d748d1780e7292:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:104870c1126318bd2b1052be8aa065322a0c4390bd2b89ed12d748d1780e7292"
        occurred_at: "2026-09-22T10:15:35.316Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609220826-DS03Q6"
        task_revision: 7
      -
        command_digest: "sha256:07de0ea298903f7773b6ab4c13b0ad7d310ea82e04e25db6fc8a719f69a2b015"
        id: "result:sha256:b37765b0bb8866fffd206c0d4d526e44a6d587e783a0960e2bff8883d21756a1:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:b37765b0bb8866fffd206c0d4d526e44a6d587e783a0960e2bff8883d21756a1"
        occurred_at: "2026-09-22T10:15:39.262Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609220826-DS03Q6"
        task_revision: 8
      -
        command_digest: "sha256:af61831d93e65e5b7e2fe2c4f9c0e319070b6f5e1c3ee37b30ff35c138aa6aa3"
        id: "kernel_work_item_inspection_required:sha256:c778183e8bcc314c36258aaa53715572c43ffd0dcd843572cb5c0e70163c2060:sha256:73818c2e6411238254edd0bf288d3f4cad4cae2691e2d945146ae1e9faf4cb29:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:c778183e8bcc314c36258aaa53715572c43ffd0dcd843572cb5c0e70163c2060:sha256:73818c2e6411238254edd0bf288d3f4cad4cae2691e2d945146ae1e9faf4cb29"
        occurred_at: "2026-09-22T10:15:42.405Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609220826-DS03Q6"
        task_revision: 9
      -
        command_digest: "sha256:b2176e07bc8d16833306e58f64c82fdd9cd84f8ae7a709e72fd1f31331ba7c88"
        id: "validation:sha256:a1556ae9b9a4541e5546467f4931df5efbdea0f282ace7fbfa5158b6830331eb:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:a1556ae9b9a4541e5546467f4931df5efbdea0f282ace7fbfa5158b6830331eb"
        occurred_at: "2026-09-22T10:18:52.613Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609220826-DS03Q6"
        task_revision: 10
      -
        command_digest: "sha256:0e253e48749887aea5e32a6c063c72f9b23e09e2d15193a0c0e67dc95a6fada7"
        id: "validation-resolution:sha256:0dd6d302abb8614f45c94536a5dada1c0e300f8e570bcc857d112b972dbd8480:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:0dd6d302abb8614f45c94536a5dada1c0e300f8e570bcc857d112b972dbd8480"
        occurred_at: "2026-09-22T10:18:54.482Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609220826-DS03Q6"
        task_revision: 11
      -
        command_digest: "sha256:53f9dd433df1ba0e553b6fbffe30437917d4a8744e11f11c804bf147ffe13de5"
        id: "kernel_work_item_rework_claim_required:sha256:d42b38eaa89ea1bef7d74851691f987f4eb5f06803c048d0f2121b8e761e47ee:sha256:73818c2e6411238254edd0bf288d3f4cad4cae2691e2d945146ae1e9faf4cb29:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:d42b38eaa89ea1bef7d74851691f987f4eb5f06803c048d0f2121b8e761e47ee:sha256:73818c2e6411238254edd0bf288d3f4cad4cae2691e2d945146ae1e9faf4cb29"
        occurred_at: "2026-09-22T10:18:58.383Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609220826-DS03Q6"
        task_revision: 12
      -
        command_digest: "sha256:bef68f74ec3cd63a9c73b79a35500a7e01b1ed07ed00103003d3a1801ef852ff"
        id: "kernel_work_item_execution_required:sha256:1bcdbec85a86458077ce43500a6be589131527efb26ba832b364af33c87e178f:sha256:73818c2e6411238254edd0bf288d3f4cad4cae2691e2d945146ae1e9faf4cb29:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:1bcdbec85a86458077ce43500a6be589131527efb26ba832b364af33c87e178f:sha256:73818c2e6411238254edd0bf288d3f4cad4cae2691e2d945146ae1e9faf4cb29"
        occurred_at: "2026-09-22T10:19:01.369Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609220826-DS03Q6"
        task_revision: 13
      -
        command_digest: "sha256:6b309f2a009843880b933197fef52ed86b68a87501f8416e3688d1cb8c06031d"
        id: "sha256:df9a6331afd33b606f6d9c37b22eeeae231c0e3cf6b4cb79d0ff2aa4b2106c24:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:df9a6331afd33b606f6d9c37b22eeeae231c0e3cf6b4cb79d0ff2aa4b2106c24"
        occurred_at: "2026-09-22T10:22:19.561Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202609220826-DS03Q6"
        task_revision: 14
      -
        command_digest: "sha256:a37ba4ca566c5f31c1691eeed193323ba63f37ba0cdf2e6d791434e45d570b35"
        id: "result:sha256:4e070eb696403c4caab7fdf8b94e9befff766e43fa83ba034df407f9c9be5d99:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:4e070eb696403c4caab7fdf8b94e9befff766e43fa83ba034df407f9c9be5d99"
        occurred_at: "2026-09-22T10:22:23.465Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202609220826-DS03Q6"
        task_revision: 15
      -
        command_digest: "sha256:634f609682949ec60db093174193576fda4ea1659c8acd691f9609fab6590e33"
        id: "kernel_work_item_inspection_required:sha256:f48054923fda8952a12efe551d04f2e9335348da1a4981ad0812eef3ac345d3e:sha256:63f8514aab82733adf1334855dfba5049b8979ba72762f1e6f1006e4eba59264:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f48054923fda8952a12efe551d04f2e9335348da1a4981ad0812eef3ac345d3e:sha256:63f8514aab82733adf1334855dfba5049b8979ba72762f1e6f1006e4eba59264"
        occurred_at: "2026-09-22T10:22:26.600Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609220826-DS03Q6"
        task_revision: 16
      -
        command_digest: "sha256:d7703d864b362737fdf41b84e997a5103f53a2db9de3203d238ab87cce736afa"
        id: "validation:sha256:005b6f6b987da8276c0d79cc320fd5e033badab5b39fd476b647971579542258:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:005b6f6b987da8276c0d79cc320fd5e033badab5b39fd476b647971579542258"
        occurred_at: "2026-09-22T10:26:51.063Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202609220826-DS03Q6"
        task_revision: 17
      -
        command_digest: "sha256:70f4be48f93ba88af71439e1704341fb269cd065734de30dc6054712e2fba53e"
        id: "validation-resolution:sha256:80f741d4dae04d7c580dced966ac8c0e3963b21a569ed45b5e1bb71d9bf40218:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:80f741d4dae04d7c580dced966ac8c0e3963b21a569ed45b5e1bb71d9bf40218"
        occurred_at: "2026-09-22T10:26:52.954Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202609220826-DS03Q6"
        task_revision: 18
      -
        command_digest: "sha256:8b72b3103aed8cc0c48d3909c6c196a2a9b5b32306b14a7fa3a8c5ee39d5ba35"
        id: "final-validation:sha256:e63c86dfa865c7c9411b62938bdf41decafd30e6a35f0b5b2eb5381980cfd0ae:18:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:e63c86dfa865c7c9411b62938bdf41decafd30e6a35f0b5b2eb5381980cfd0ae:18"
        occurred_at: "2026-09-22T10:28:08.568Z"
        payload_digest: "sha256:061b64c43e766deec68402b745cdbeebf06d7f074e836a20923db1df75ee5a64"
        task_id: "202609220826-DS03Q6"
        task_revision: 19
      -
        command_digest: "sha256:d09890bf6148837d87f3fa7c23b94974de0b876e25def029c2d915551c9ef2e4"
        id: "kernel_task_completion_required:sha256:b62fd384ed35d67accaabc8e0079c2bfc919c3df52fd0aad9416ba9a378e542b:sha256:63f8514aab82733adf1334855dfba5049b8979ba72762f1e6f1006e4eba59264:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:b62fd384ed35d67accaabc8e0079c2bfc919c3df52fd0aad9416ba9a378e542b:sha256:63f8514aab82733adf1334855dfba5049b8979ba72762f1e6f1006e4eba59264"
        occurred_at: "2026-09-22T10:28:51.864Z"
        payload_digest: "sha256:ec42a2bbe60c2ff7acf39a31bba461482945ff99db021c2bab72ffc67a06d4d1"
        task_id: "202609220826-DS03Q6"
        task_revision: 20
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation

Fix the 0.7.11 lifecycle deadlock where next-action routes task.pre_merge_close for a canonical COMPLETED task but finish rejects the legacy mutation. Preserve quality, verification, branch identity, and fail-closed checks; add focused regression coverage.

## Scope

- In scope: Fix the 0.7.11 lifecycle deadlock where next-action routes task.pre_merge_close for a canonical COMPLETED task but finish rejects the legacy mutation. Preserve quality, verification, branch identity, and fail-closed checks; add focused regression coverage.
- Out of scope: unrelated refactors not required for "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation".

## Plan

1. Execute approved WorkItem fix-canonical-pre-merge-closure.

## Verify Steps

PLANNER fallback scaffold for "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
