---
id: "202609220752-4MGBBP"
title: "Fix issue #5991 by cleaning owned Vitest temporary roots"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "cleanup"
  - "testing"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run typecheck"
  - "bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/testkit/src/index.test.ts packages/testkit/src/cli-harness/temp-root-cleanup.test.ts"
  - "git diff --check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-22T07:53:23.530Z"
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
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-22T07:52:12.741Z"
doc_updated_by: "CODER"
description: "Apply the reviewed and locally verified fix from commit 09c553088 onto current main. Own one marked temporary parent per Vitest worker, recover only safe stale roots, migrate close-message fixtures, and verify cleanup on success and failure. Dependency installation is environment setup, not a declared verification check."
sections:
  Summary: |-
    Fix issue #5991 by cleaning owned Vitest temporary roots

    Apply the reviewed and locally verified fix from commit 09c553088 onto current main. Own one marked temporary parent per Vitest worker, recover only safe stale roots, migrate close-message fixtures, and verify cleanup on success and failure. Dependency installation is environment setup, not a declared verification check.
  Scope: |-
    - In scope: Apply the reviewed and locally verified fix from commit 09c553088 onto current main. Own one marked temporary parent per Vitest worker, recover only safe stale roots, migrate close-message fixtures, and verify cleanup on success and failure. Dependency installation is environment setup, not a declared verification check.
    - Out of scope: unrelated refactors not required for "Fix issue #5991 by cleaning owned Vitest temporary roots".
  Plan: "1. Execute approved WorkItem owned-vitest-temp-lifecycle."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix issue #5991 by cleaning owned Vitest temporary roots". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix issue #5991 by cleaning owned Vitest temporary roots". Expected: the visible result matches ## Summary and stays inside approved scope.
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
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:67fe13f92ed2b67d202fa32020056a0bf985e361ad95772308ce27bd7e18ba96"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:c711f3ffec46af58a41f709962d1330ea77f4e5cb7c8d2dbf8848367f27d0f33"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:c30720da278a9f07919da7a0aa71fa1653cec04630f9ef22960f2d164afb151f"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "dependencies"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "node_modules"
              - "packages/agentplane/src/commands/guard/impl/close-message.test.ts"
              - "packages/testkit/src"
              - "vitest.config.ts"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "node_modules"
              - "packages/agentplane/src/commands/guard/impl/close-message.test.ts"
              - "packages/testkit/src"
              - "vitest.config.ts"
            task_id: "202609220752-4MGBBP"
            validation_requirements:
              - "bun run typecheck"
              - "bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/testkit/src/index.test.ts packages/testkit/src/cli-harness/temp-root-cleanup.test.ts"
              - "git diff --check"
              - "node .agentplane/policy/check-routing.mjs"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:c30720da278a9f07919da7a0aa71fa1653cec04630f9ef22960f2d164afb151f"
        digest: "sha256:c711f3ffec46af58a41f709962d1330ea77f4e5cb7c8d2dbf8848367f27d0f33"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:a7cb15aae11460095a9b75cb3cdac9b2a14075d8ff556d84f9b4ad59987fde93"
            depends_on: []
            execution_requirements:
              capabilities:
                - "task.verify"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "dependencies"
              resources:
                - "vitest.config.ts"
                - "packages/testkit/src"
                - "packages/agentplane/src/commands/guard/impl/close-message.test.ts"
                - "node_modules"
              scope_roots:
                - "vitest.config.ts"
                - "packages/testkit/src"
                - "packages/agentplane/src/commands/guard/impl/close-message.test.ts"
                - "node_modules"
            expected_outputs:
              - "owned-test-run-temp-root"
              - "safe-stale-root-recovery"
              - "migrated-close-message-fixtures"
              - "verification-evidence"
            id: "owned-vitest-temp-lifecycle"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609220752-4MGBBP"
      intent_digest: "sha256:967b97f7c6f65a337ebe5849e54dc9271e7c01782baff7c107c7d9d30b8a6df8"
      migration_receipts: []
      mutation_receipts:
        capture:202609220752-4MGBBP:
          after_revision: 1
          aggregate_digest: "sha256:74211aa3a4e56175f065a9b21ec91357df17a35f8838161e67aacaacbf9cbef6"
          before_revision: 0
          command_digest: "sha256:97e6230733e787c5bb522b7ea90ffac6945a0c84e60ba60635c8d86adef485e9"
          effect_ids: []
          event_digests:
            - "sha256:00648a7ec3965bb51af90cb94efc64ff10e55ca4a665fc0edbfc93872da7fc1b"
          mutation_id: "capture:202609220752-4MGBBP"
        kernel_work_item_claim_required:sha256:4376fd6d235c36cc71754ced8aa6fa9c5e0627cd2220f15745df81b287e6d830:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 5
          aggregate_digest: "sha256:a148e9181eaf4b9cf962e6fae74467cf144ef7e784717f388388467004675090"
          before_revision: 4
          command_digest: "sha256:257d4a59134dc38b7c235512c338360a468d91102ac1ec4da2927f6a91d93905"
          effect_ids: []
          event_digests:
            - "sha256:697e06383cd2b5352301ee11a487abb98876fb13921487ec69d05aaf4495fbb0"
          mutation_id: "kernel_work_item_claim_required:sha256:4376fd6d235c36cc71754ced8aa6fa9c5e0627cd2220f15745df81b287e6d830:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_execution_required:sha256:7fc049557b09535e8205b8e5ac6c7aae575ef29a5eb8069561e3f47a56e89f2c:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 6
          aggregate_digest: "sha256:0ef631b6960383e745788cc5a1698d5dcdbbbd43beeb75cd5240a2fe79a9e0ab"
          before_revision: 5
          command_digest: "sha256:e12d90f7f2a0d7d50cbc438811fe272d4f74861ed9aea7df0f38f23b15b0305c"
          effect_ids: []
          event_digests:
            - "sha256:ff2b7aee8f37443245fd42a071ab236a0af2ef8d3e74c4111697eadaf9428d03"
          mutation_id: "kernel_work_item_execution_required:sha256:7fc049557b09535e8205b8e5ac6c7aae575ef29a5eb8069561e3f47a56e89f2c:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_materialization_required:sha256:08263e487333ee3bf3a52ab3c474283f0c6f5af1d873056aa821f44d264797fb:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 4
          aggregate_digest: "sha256:882d2a2e25a2992b274fbca27e4c702c3acd78d4845b8e406b3a3f72e3550c48"
          before_revision: 3
          command_digest: "sha256:04609677f8fb10c934015f563e1f935d506396e3bbb0b54b958446ec60e783b8"
          effect_ids: []
          event_digests:
            - "sha256:da8c9af5defebb963a5fa7e8e2252e4d2171445926ebe41dc0850e739faf0233"
          mutation_id: "kernel_work_item_materialization_required:sha256:08263e487333ee3bf3a52ab3c474283f0c6f5af1d873056aa821f44d264797fb:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        result:sha256:2fb117f0b1047ef9f2d21958793d4c9798c2e1a7100a77ca1502328396867d5d:
          after_revision: 2
          aggregate_digest: "sha256:1149a3631a3810de671a11c6addb962772e73466feaffe2471fa1fe8c3b250ec"
          before_revision: 1
          command_digest: "sha256:edf847104998852c5cf51644543b34a5c8e080c0fda9ed7cbb824ac9b3b25b07"
          effect_ids: []
          event_digests:
            - "sha256:d880629816e31870ab53e9d6064afd1364104d62761f67e3f7743a6037f2f7cb"
          mutation_id: "result:sha256:2fb117f0b1047ef9f2d21958793d4c9798c2e1a7100a77ca1502328396867d5d"
        sha256:7cdce7c54e294e15091b291cae9fa0a035755acc72e9de386494b9f694d7b7d0:
          after_revision: 3
          aggregate_digest: "sha256:a27b09cb21318cd8ede2cdb064cf0c22301889409ed9dd17925cb43cf6bdf7f5"
          before_revision: 2
          command_digest: "sha256:9467ab4a90220d6e548adc1ade99b08c2850af403d79747fd25c34abea0e16da"
          effect_ids: []
          event_digests:
            - "sha256:137b2f041407abb3a121f52e7d757b0dbc38577b2e3360636ae676e39dfffbcd"
          mutation_id: "sha256:7cdce7c54e294e15091b291cae9fa0a035755acc72e9de386494b9f694d7b7d0"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        owned-vitest-temp-lifecycle:
          attempt: 1
          claim_id: "sha256:da49f2dfce91efbba73cb777348e01946bc31c32b42c0d7024240dbadeab679e"
          definition:
            contract_digest: "sha256:a7cb15aae11460095a9b75cb3cdac9b2a14075d8ff556d84f9b4ad59987fde93"
            depends_on: []
            execution_requirements:
              capabilities:
                - "task.verify"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "dependencies"
              resources:
                - "vitest.config.ts"
                - "packages/testkit/src"
                - "packages/agentplane/src/commands/guard/impl/close-message.test.ts"
                - "node_modules"
              scope_roots:
                - "vitest.config.ts"
                - "packages/testkit/src"
                - "packages/agentplane/src/commands/guard/impl/close-message.test.ts"
                - "node_modules"
            expected_outputs:
              - "owned-test-run-temp-root"
              - "safe-stale-root-recovery"
              - "migrated-close-message-fixtures"
              - "verification-evidence"
            id: "owned-vitest-temp-lifecycle"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:8b1f242511e9c0a9de48813e476cb9b8f8a53603cd5a4707dd5772bffc4de188"
    documents:
      contracts:
        sha256:a7cb15aae11460095a9b75cb3cdac9b2a14075d8ff556d84f9b4ad59987fde93:
          acceptance_criteria:
            - "Vitest workers own isolated marked temporary parents and remove them after success and failure."
            - "Recovery deletes only old marked roots with dead owners and preserves active, young, malformed, unmarked, symlinked, and unrelated paths."
            - "close-message.test.ts uses shared fixture lifecycle helpers and no raw mkdtemp root creation."
            - "Repeated focused runs leave no owned temporary residue."
            - "Dependency setup changes no lockfile or package manifest."
          objective: "Apply the reviewed ownership-aware Vitest temporary-root fix and verify cleanup behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/testkit/src/index.test.ts packages/testkit/src/cli-harness/temp-root-cleanup.test.ts"
            - "bun run typecheck"
            - "node .agentplane/policy/check-routing.mjs"
            - "git diff --check"
      intent:
        context: "Apply the reviewed and locally verified fix from commit 09c553088 onto current main. Own one marked temporary parent per Vitest worker, recover only safe stale roots, migrate close-message fixtures, and verify cleanup on success and failure. Dependency installation is environment setup, not a declared verification check."
        objective: "Fix issue #5991 by cleaning owned Vitest temporary roots"
    events:
      -
        command_digest: "sha256:97e6230733e787c5bb522b7ea90ffac6945a0c84e60ba60635c8d86adef485e9"
        id: "capture:202609220752-4MGBBP:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609220752-4MGBBP"
        occurred_at: "2026-09-22T07:52:12.715Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609220752-4MGBBP"
        task_revision: 1
      -
        command_digest: "sha256:edf847104998852c5cf51644543b34a5c8e080c0fda9ed7cbb824ac9b3b25b07"
        id: "result:sha256:2fb117f0b1047ef9f2d21958793d4c9798c2e1a7100a77ca1502328396867d5d:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:2fb117f0b1047ef9f2d21958793d4c9798c2e1a7100a77ca1502328396867d5d"
        occurred_at: "2026-09-22T07:53:12.130Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609220752-4MGBBP"
        task_revision: 2
      -
        command_digest: "sha256:9467ab4a90220d6e548adc1ade99b08c2850af403d79747fd25c34abea0e16da"
        id: "sha256:7cdce7c54e294e15091b291cae9fa0a035755acc72e9de386494b9f694d7b7d0:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:7cdce7c54e294e15091b291cae9fa0a035755acc72e9de386494b9f694d7b7d0"
        occurred_at: "2026-09-22T07:53:22.535Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609220752-4MGBBP"
        task_revision: 3
      -
        command_digest: "sha256:04609677f8fb10c934015f563e1f935d506396e3bbb0b54b958446ec60e783b8"
        id: "kernel_work_item_materialization_required:sha256:08263e487333ee3bf3a52ab3c474283f0c6f5af1d873056aa821f44d264797fb:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:08263e487333ee3bf3a52ab3c474283f0c6f5af1d873056aa821f44d264797fb:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T07:53:25.957Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609220752-4MGBBP"
        task_revision: 4
      -
        command_digest: "sha256:257d4a59134dc38b7c235512c338360a468d91102ac1ec4da2927f6a91d93905"
        id: "kernel_work_item_claim_required:sha256:4376fd6d235c36cc71754ced8aa6fa9c5e0627cd2220f15745df81b287e6d830:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:4376fd6d235c36cc71754ced8aa6fa9c5e0627cd2220f15745df81b287e6d830:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T07:53:30.030Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609220752-4MGBBP"
        task_revision: 5
      -
        command_digest: "sha256:e12d90f7f2a0d7d50cbc438811fe272d4f74861ed9aea7df0f38f23b15b0305c"
        id: "kernel_work_item_execution_required:sha256:7fc049557b09535e8205b8e5ac6c7aae575ef29a5eb8069561e3f47a56e89f2c:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:7fc049557b09535e8205b8e5ac6c7aae575ef29a5eb8069561e3f47a56e89f2c:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T07:55:45.268Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609220752-4MGBBP"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Fix issue #5991 by cleaning owned Vitest temporary roots

Apply the reviewed and locally verified fix from commit 09c553088 onto current main. Own one marked temporary parent per Vitest worker, recover only safe stale roots, migrate close-message fixtures, and verify cleanup on success and failure. Dependency installation is environment setup, not a declared verification check.

## Scope

- In scope: Apply the reviewed and locally verified fix from commit 09c553088 onto current main. Own one marked temporary parent per Vitest worker, recover only safe stale roots, migrate close-message fixtures, and verify cleanup on success and failure. Dependency installation is environment setup, not a declared verification check.
- Out of scope: unrelated refactors not required for "Fix issue #5991 by cleaning owned Vitest temporary roots".

## Plan

1. Execute approved WorkItem owned-vitest-temp-lifecycle.

## Verify Steps

PLANNER fallback scaffold for "Fix issue #5991 by cleaning owned Vitest temporary roots". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix issue #5991 by cleaning owned Vitest temporary roots". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
