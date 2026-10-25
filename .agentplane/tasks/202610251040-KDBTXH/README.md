---
id: "202610251040-KDBTXH"
title: "Keep historical compatibility package delta valid after later surface changes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "compatibility"
  - "release"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run bench:compatibility:candidate:check"
  - "bun run bench:compatibility:check"
  - "bun run ci:local:full"
  - "node --test scripts/lib/compatibility-incremental-package-delta.test.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-10-25T10:42:13.473Z"
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
    - "effect_ci"
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
      - "ci"
      - "repository_write"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "scripts/bench/capture-compatibility-candidate.mjs"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/lib/compatibility-incremental-package-delta.mjs"
      - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "scripts/bench/capture-compatibility-candidate.mjs"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/lib/compatibility-incremental-package-delta.mjs"
      - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
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
          - "scripts/bench/capture-compatibility-candidate.mjs"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
          - "scripts/lib/compatibility-incremental-package-delta.mjs"
          - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:735893b3ec29fbea32a0d68b43f3314b52ecd68315c9d7d9c571b6d8d3894109"
      escalation_reasons:
        - "central_component:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "central_component:scripts/lib/compatibility-incremental-package-delta.mjs"
        - "central_component:scripts/lib/compatibility-incremental-package-delta.test.mjs"
        - "effect_ci"
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
      - "repository_effect:ci"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-25T10:40:57.819Z"
doc_updated_by: "CODER"
description: "For release 0.7.13, decouple immutable PR #6905 incremental Zod package history from later unrelated CLI/context full-surface changes. Preserve the exact reviewed PR #6905 record, its package-section from/to hashes, and six allowed manifest paths. Add a generic regression that accepts later unrelated surface drift but rejects package digest or path drift. Do not update the KB0 candidate JSON or weaken current candidate approval ratchets in this task."
sections:
  Summary: |-
    Keep historical compatibility package delta valid after later surface changes

    For release 0.7.13, decouple immutable PR #6905 incremental Zod package history from later unrelated CLI/context full-surface changes. Preserve the exact reviewed PR #6905 record, its package-section from/to hashes, and six allowed manifest paths. Add a generic regression that accepts later unrelated surface drift but rejects package digest or path drift. Do not update the KB0 candidate JSON or weaken current candidate approval ratchets in this task.
  Scope: |-
    - In scope: For release 0.7.13, decouple immutable PR #6905 incremental Zod package history from later unrelated CLI/context full-surface changes. Preserve the exact reviewed PR #6905 record, its package-section from/to hashes, and six allowed manifest paths. Add a generic regression that accepts later unrelated surface drift but rejects package digest or path drift. Do not update the KB0 candidate JSON or weaken current candidate approval ratchets in this task.
    - Out of scope: unrelated refactors not required for "Keep historical compatibility package delta valid after later surface changes".
  Plan: "1. Execute approved WorkItem validate-historical-package-delta."
  Verify Steps: |-
    PLANNER fallback scaffold for "Keep historical compatibility package delta valid after later surface changes". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Keep historical compatibility package delta valid after later surface changes". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "1b8097aecf1f07f1e3e7dec86dafb9618990c77a"
    repository_identity: "sha256:54ebc175d5062bd17583cc599ab63bc6327beb701cc820e49ae678de363898e0"
    schema_version: 1
    source: "explicit"
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
            digest: "sha256:c9590a7578f46d98012dfca001eb538b78a59356075f27d49c6f270ede89a7d6"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:eca5840665eafea74c073c07e775fdeb495ffbc12b559dc92acedf0a439758c1"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a54650dbc066449be606a1d88bf19773343b40524fb7268ed9a1a09e1f115ce0"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
            repository_identity: "sha256:54ebc175d5062bd17583cc599ab63bc6327beb701cc820e49ae678de363898e0"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "scripts/bench/capture-compatibility-candidate.mjs"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/lib/compatibility-incremental-package-delta.mjs"
              - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
            task_id: "202610251040-KDBTXH"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:a54650dbc066449be606a1d88bf19773343b40524fb7268ed9a1a09e1f115ce0"
        digest: "sha256:eca5840665eafea74c073c07e775fdeb495ffbc12b559dc92acedf0a439758c1"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:cd75b02349d94dc20234251845670c8ef3752501f0f6e1e673cef510db33e567"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "ci"
              resources: []
              scope_roots:
                - "scripts/lib/compatibility-incremental-package-delta.mjs"
                - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
                - "scripts/bench/capture-compatibility-candidate.mjs"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
            expected_outputs:
              - "shared-package-section-validator"
              - "capture-checker-adoption"
              - "unrelated-surface-and-package-drift-regressions"
              - "verification-evidence"
            id: "validate-historical-package-delta"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610251040-KDBTXH"
      intent_digest: "sha256:a5c6acc9b71af1df274081c75db0441c135dbc78413fced876c328417bd36357"
      migration_receipts: []
      mutation_receipts:
        capture:202610251040-KDBTXH:
          after_revision: 1
          aggregate_digest: "sha256:19838fbe433e58c704a5373fe84922cdab29cb607ab2a01d986ebe93c89370c9"
          before_revision: 0
          command_digest: "sha256:1246ca4c58a2413eb13396ca485a03aa0fa40f65be9641c55d16f55d3fe6981d"
          effect_ids: []
          event_digests:
            - "sha256:5cdb3cff52dc6f8734ec05e208dde52e13a12f7b48a964169aa65716064d5137"
          mutation_id: "capture:202610251040-KDBTXH"
        kernel_work_item_claim_required:sha256:65eb1ec57d72991ca42050609782992a8b642c19545b1afc1b447ae7aa656158:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468:
          after_revision: 5
          aggregate_digest: "sha256:2d614cb2c8076d09fd714226264859e73c3a67964ea861ba836cb818b343f70b"
          before_revision: 4
          command_digest: "sha256:8a16ac5aa1b4fd3349afc9daba78099af0a589aece67563967ec25227f7fd9e2"
          effect_ids: []
          event_digests:
            - "sha256:c410dc42e212d1020b146849d1c0d49469cd8998ae64b50ebf2240af4eafcc31"
          mutation_id: "kernel_work_item_claim_required:sha256:65eb1ec57d72991ca42050609782992a8b642c19545b1afc1b447ae7aa656158:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
        kernel_work_item_execution_required:sha256:48f915465c845053d90bdd29ea3a440b323e44862bb24cf8374a9c21a637d12c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468:
          after_revision: 6
          aggregate_digest: "sha256:793a99fd547ec67f0b75155b4bced92c4c98602b8b509635decb671543541529"
          before_revision: 5
          command_digest: "sha256:32b6b9893b8de651657cef0ce3f137d0fee584cf09412ff3c379b5756018e3a2"
          effect_ids: []
          event_digests:
            - "sha256:5b6ed930e74d39f70e19d0838c534de0634a21d3e754465d0a11f6f321d7497d"
          mutation_id: "kernel_work_item_execution_required:sha256:48f915465c845053d90bdd29ea3a440b323e44862bb24cf8374a9c21a637d12c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
        kernel_work_item_materialization_required:sha256:4d0a0003fed05caf6eed5d74cf51e56b7b28e91cb415a206727985a21085ef9c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468:
          after_revision: 4
          aggregate_digest: "sha256:569e0a7b93b89000b977c4c1818f4b6a52fda4087384502152461a17cd1743e9"
          before_revision: 3
          command_digest: "sha256:796a29460da8e9d035ad1f0a6fcb5a50986a997d8fdc1e259897c0bbd24b9a27"
          effect_ids: []
          event_digests:
            - "sha256:e961e3de2ec15ce4daf6d8451204cb25f90285a5e3460d611ad3e7481be4fe97"
          mutation_id: "kernel_work_item_materialization_required:sha256:4d0a0003fed05caf6eed5d74cf51e56b7b28e91cb415a206727985a21085ef9c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
        result:sha256:dba53cd9b64b4e3dab5c191373e2749f17a11359a602b0dbee561588e6baafe8:
          after_revision: 2
          aggregate_digest: "sha256:94e369933eaf41e6180d8f28328144f61a32eaf13b12b6db89e038d1d42bd7d0"
          before_revision: 1
          command_digest: "sha256:10539bfd87cbbeef897ee397cddc47a593aa6df73fc06ae385a2cd778328a7c6"
          effect_ids: []
          event_digests:
            - "sha256:fed2fe57339cc3c9702ff6d2a3fe8e03a88690473f368a81fe82efc57f65ac78"
          mutation_id: "result:sha256:dba53cd9b64b4e3dab5c191373e2749f17a11359a602b0dbee561588e6baafe8"
        sha256:fe5f49e3fa6d29a5a971b49afa151f7bc2c3f322cf7108a88d2efcd7138bfbb2:
          after_revision: 3
          aggregate_digest: "sha256:a2be9f7b807c9ef1998eb2008fca65a15ef38c024c3f57792c68f1c04c41aa4a"
          before_revision: 2
          command_digest: "sha256:df2953555311b9dcccc02f8eb3c92ed4e7f152f1090f368249c5e5c6336d9e58"
          effect_ids: []
          event_digests:
            - "sha256:32da59923c579cfb33aaa55799855f4688c3edb27485d533b24985c8ec9981d9"
          mutation_id: "sha256:fe5f49e3fa6d29a5a971b49afa151f7bc2c3f322cf7108a88d2efcd7138bfbb2"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        validate-historical-package-delta:
          attempt: 1
          claim_id: "sha256:7a795eb196d4c00a76b001807beb9fe9516d12e2a8ed35a87c784a1f0da17044"
          definition:
            contract_digest: "sha256:cd75b02349d94dc20234251845670c8ef3752501f0f6e1e673cef510db33e567"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "ci"
              resources: []
              scope_roots:
                - "scripts/lib/compatibility-incremental-package-delta.mjs"
                - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
                - "scripts/bench/capture-compatibility-candidate.mjs"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
            expected_outputs:
              - "shared-package-section-validator"
              - "capture-checker-adoption"
              - "unrelated-surface-and-package-drift-regressions"
              - "verification-evidence"
            id: "validate-historical-package-delta"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:1aa4d3e982153e0cd2c5bf8036fc54df1cec97cfcb6ccb4fef9bf6c82f9ef7f8"
    documents:
      contracts:
        sha256:cd75b02349d94dc20234251845670c8ef3752501f0f6e1e673cef510db33e567:
          acceptance_criteria:
            - "Both candidate capture and contract checker accept an unchanged reviewed package delta when later non-package CLI/context sections change."
            - "Both routes reject a changed historical dependency, an unexpected manifest or package-section hash, or an unapproved package JSON path."
            - "The exact PR #6905 incremental record and current candidate/section/source-task approval ratchets remain unchanged."
            - "No KB0 candidate JSON update, released baseline mutation, or verification bypass occurs in this task."
          objective: "Extract shared validation for the reviewed incremental package delta. Keep PR #6905 history immutable and validate the three package-manifest dependency changes by section hashes and six allowed JSON paths while permitting later unrelated full-surface drift."
          role: "EXECUTOR"
          verification_commands:
            - "node --test scripts/lib/compatibility-incremental-package-delta.test.mjs"
            - "bun run bench:compatibility:candidate:check"
            - "bun run bench:compatibility:check"
            - "bun run hotspots:check"
            - "bun run ci:local:full"
      intent:
        context: "For release 0.7.13, decouple immutable PR #6905 incremental Zod package history from later unrelated CLI/context full-surface changes. Preserve the exact reviewed PR #6905 record, its package-section from/to hashes, and six allowed manifest paths. Add a generic regression that accepts later unrelated surface drift but rejects package digest or path drift. Do not update the KB0 candidate JSON or weaken current candidate approval ratchets in this task."
        objective: "Keep historical compatibility package delta valid after later surface changes"
    events:
      -
        command_digest: "sha256:1246ca4c58a2413eb13396ca485a03aa0fa40f65be9641c55d16f55d3fe6981d"
        id: "capture:202610251040-KDBTXH:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610251040-KDBTXH"
        occurred_at: "2026-10-25T10:40:57.761Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610251040-KDBTXH"
        task_revision: 1
      -
        command_digest: "sha256:10539bfd87cbbeef897ee397cddc47a593aa6df73fc06ae385a2cd778328a7c6"
        id: "result:sha256:dba53cd9b64b4e3dab5c191373e2749f17a11359a602b0dbee561588e6baafe8:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:dba53cd9b64b4e3dab5c191373e2749f17a11359a602b0dbee561588e6baafe8"
        occurred_at: "2026-10-25T10:41:58.886Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610251040-KDBTXH"
        task_revision: 2
      -
        command_digest: "sha256:df2953555311b9dcccc02f8eb3c92ed4e7f152f1090f368249c5e5c6336d9e58"
        id: "sha256:fe5f49e3fa6d29a5a971b49afa151f7bc2c3f322cf7108a88d2efcd7138bfbb2:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:fe5f49e3fa6d29a5a971b49afa151f7bc2c3f322cf7108a88d2efcd7138bfbb2"
        occurred_at: "2026-10-25T10:42:07.571Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610251040-KDBTXH"
        task_revision: 3
      -
        command_digest: "sha256:796a29460da8e9d035ad1f0a6fcb5a50986a997d8fdc1e259897c0bbd24b9a27"
        id: "kernel_work_item_materialization_required:sha256:4d0a0003fed05caf6eed5d74cf51e56b7b28e91cb415a206727985a21085ef9c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:4d0a0003fed05caf6eed5d74cf51e56b7b28e91cb415a206727985a21085ef9c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
        occurred_at: "2026-10-25T10:42:16.324Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610251040-KDBTXH"
        task_revision: 4
      -
        command_digest: "sha256:8a16ac5aa1b4fd3349afc9daba78099af0a589aece67563967ec25227f7fd9e2"
        id: "kernel_work_item_claim_required:sha256:65eb1ec57d72991ca42050609782992a8b642c19545b1afc1b447ae7aa656158:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:65eb1ec57d72991ca42050609782992a8b642c19545b1afc1b447ae7aa656158:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
        occurred_at: "2026-10-25T10:42:27.585Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610251040-KDBTXH"
        task_revision: 5
      -
        command_digest: "sha256:32b6b9893b8de651657cef0ce3f137d0fee584cf09412ff3c379b5756018e3a2"
        id: "kernel_work_item_execution_required:sha256:48f915465c845053d90bdd29ea3a440b323e44862bb24cf8374a9c21a637d12c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:48f915465c845053d90bdd29ea3a440b323e44862bb24cf8374a9c21a637d12c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
        occurred_at: "2026-10-25T10:42:59.959Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610251040-KDBTXH"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:54ebc175d5062bd17583cc599ab63bc6327beb701cc820e49ae678de363898e0"
    schema_version: 1
id_source: "generated"
---
## Summary

Keep historical compatibility package delta valid after later surface changes

For release 0.7.13, decouple immutable PR #6905 incremental Zod package history from later unrelated CLI/context full-surface changes. Preserve the exact reviewed PR #6905 record, its package-section from/to hashes, and six allowed manifest paths. Add a generic regression that accepts later unrelated surface drift but rejects package digest or path drift. Do not update the KB0 candidate JSON or weaken current candidate approval ratchets in this task.

## Scope

- In scope: For release 0.7.13, decouple immutable PR #6905 incremental Zod package history from later unrelated CLI/context full-surface changes. Preserve the exact reviewed PR #6905 record, its package-section from/to hashes, and six allowed manifest paths. Add a generic regression that accepts later unrelated surface drift but rejects package digest or path drift. Do not update the KB0 candidate JSON or weaken current candidate approval ratchets in this task.
- Out of scope: unrelated refactors not required for "Keep historical compatibility package delta valid after later surface changes".

## Plan

1. Execute approved WorkItem validate-historical-package-delta.

## Verify Steps

PLANNER fallback scaffold for "Keep historical compatibility package delta valid after later surface changes". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Keep historical compatibility package delta valid after later surface changes". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
