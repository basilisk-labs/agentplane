---
id: "202610252231-Y5Z4NW"
title: "Ratchet compatibility candidate for release versions"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run bench:compatibility:candidate:check"
  - "node --test scripts/lib/compatibility-incremental-package-delta.test.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-10-25T22:32:44.972Z"
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
    allowed_external_effects: []
    allowed_repository_effects:
      - "release_metadata"
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
      - "ci"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/release"
      - "scripts/bench"
      - "scripts/checks"
      - "scripts/lib"
  declaration:
    external_effects: []
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
      - "packages/agentplane/src/commands/release"
      - "scripts/bench"
      - "scripts/checks"
      - "scripts/lib"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - "packages/agentplane/src/commands/release"
          - "scripts/bench"
          - "scripts/checks"
          - "scripts/lib"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:6a2385b1cbd91e9631417ee8a3a8e176d03c30722fa084407a0e66c621f780b6"
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
doc_updated_at: "2026-10-25T22:31:26.223Z"
doc_updated_by: "CODER"
description: "Generic release ratchet with digest-sealed reviewed-version anchor, immutable historical Zod delta and v0.6.24 baseline, version-parity recapture in release mutation, and negative drift tests. Successor to non-executable 94ATB0/B4RATB plans."
sections:
  Summary: |-
    Ratchet compatibility candidate for release versions

    Generic release ratchet with digest-sealed reviewed-version anchor, immutable historical Zod delta and v0.6.24 baseline, version-parity recapture in release mutation, and negative drift tests. Successor to non-executable 94ATB0/B4RATB plans.
  Scope: |-
    - In scope: Generic release ratchet with digest-sealed reviewed-version anchor, immutable historical Zod delta and v0.6.24 baseline, version-parity recapture in release mutation, and negative drift tests. Successor to non-executable 94ATB0/B4RATB plans.
    - Out of scope: unrelated refactors not required for "Ratchet compatibility candidate for release versions".
  Plan: "1. Execute approved WorkItem ratchet-reviewed-release-compatibility-candidate."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `node --test scripts/lib/compatibility-incremental-package-delta.test.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run bench:compatibility:candidate:check`. Expected: it succeeds and confirms the requested outcome for this task.
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
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:53b0ceb33de491e06edca889a3c9be9ed6cf0f07a03e1ead2da3d272e70fcd8d"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:cc792d0c373118c178d7641a621b027b9ac8532438184eac10be71e71fbe87c9"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:6a32d0569fe2bf1ef77549118863a5d480fd03888b1a56c65ebb27e595d706ed"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/release"
              - "scripts/bench"
              - "scripts/checks"
              - "scripts/lib"
            task_id: "202610252231-Y5Z4NW"
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
            digest: "sha256:731a771f3e6be20ecc9399fe5e29e489878ce135b3c6b1fe1e860ebb10e414a0"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:cc792d0c373118c178d7641a621b027b9ac8532438184eac10be71e71fbe87c9"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6a32d0569fe2bf1ef77549118863a5d480fd03888b1a56c65ebb27e595d706ed"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:53b0ceb33de491e06edca889a3c9be9ed6cf0f07a03e1ead2da3d272e70fcd8d"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/release"
              - "scripts/bench"
              - "scripts/checks"
              - "scripts/lib"
            task_id: "202610252231-Y5Z4NW"
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
              - "packages/agentplane/src/commands/release/apply.pipeline/mutation.ts"
              - "packages/agentplane/src/commands/release/apply.version-mutation.test.ts"
              - "scripts/bench/capture-compatibility-candidate.mjs"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/lib/compatibility-candidate-path.mjs"
              - "scripts/lib/compatibility-incremental-package-delta.mjs"
              - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
            evidence_digest: "sha256:c4001f1cefc07cfc06b86ac6ee92f6194bf242e16693540aa9d362a3f6f6f473"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:6a32d0569fe2bf1ef77549118863a5d480fd03888b1a56c65ebb27e595d706ed"
        digest: "sha256:cc792d0c373118c178d7641a621b027b9ac8532438184eac10be71e71fbe87c9"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:0cee0d1d877a4250344f015df9760717071e1619b5b0cd4f88c0558f0954a187"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "release_metadata"
              resources: []
              scope_roots:
                - "scripts/lib"
                - "scripts/bench"
                - "scripts/checks"
                - "packages/agentplane/src/commands/release"
            expected_outputs:
              - "reviewed-version-anchor"
              - "normalized-historical-delta-check"
              - "candidate-version-ratchet"
              - "focused-negative-tests"
            id: "ratchet-reviewed-release-compatibility-candidate"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610252231-Y5Z4NW"
      intent_digest: "sha256:511b628ba939432bda4b9ce4b51c3c61c29ec6b2a8d0e58e887be88f67e8302b"
      migration_receipts: []
      mutation_receipts:
        capture:202610252231-Y5Z4NW:
          after_revision: 1
          aggregate_digest: "sha256:d9a48c69df5329b93cdb5d41a18e01b55623cb35f5ff3492f2e1e8feb07fc8f5"
          before_revision: 0
          command_digest: "sha256:64ab9ea29139ddf32a962e2bb65ede97dcc756270e18b80f7dca29b3617f6d0a"
          effect_ids: []
          event_digests:
            - "sha256:864c3bd342d9249fec3eeeeca6cebccfd27ae0b6ddcff6c400af85e5fa6d8cf1"
          mutation_id: "capture:202610252231-Y5Z4NW"
        kernel_work_item_claim_required:sha256:7ecba997ad8a183e0fb7e2ad1ebc037f7e2380d9ed95f5518b3ecf7bb19804f6:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 5
          aggregate_digest: "sha256:be3d8319a48031c904a7c61e82d2b607bf2871e1bd41e164a1f121e5a6904706"
          before_revision: 4
          command_digest: "sha256:49d80bc1d7b907c73291a19be225bef4aac1191145679c03fb09dcd80455449a"
          effect_ids: []
          event_digests:
            - "sha256:3393d2d9cb9b5ff3f15eb77f3ee0f4bc01f0353921927e3e6bddd1551c16d080"
          mutation_id: "kernel_work_item_claim_required:sha256:7ecba997ad8a183e0fb7e2ad1ebc037f7e2380d9ed95f5518b3ecf7bb19804f6:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_execution_required:sha256:dca88cf32af17ec5e9d920137dfbfdfa688223e3f60ae1c986cfc9569a8261b8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 6
          aggregate_digest: "sha256:ca8c034e040ee8728a1ee8553ed466cb8cca2e53c68e15c608fe2438708295ac"
          before_revision: 5
          command_digest: "sha256:99ad3a8b8e3120f8cba9e4c76db31c76e0c387c38cea3e548700c5d27ff5e0a4"
          effect_ids: []
          event_digests:
            - "sha256:5669c94e8dfb4719c62c7b6e7a3a6da777eb3197f33568e7cc1aadb770f77fb9"
          mutation_id: "kernel_work_item_execution_required:sha256:dca88cf32af17ec5e9d920137dfbfdfa688223e3f60ae1c986cfc9569a8261b8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_materialization_required:sha256:4a5c0e09ba3df3f124c761da0f0c280b84db3d536159315489dbac950d60e2c8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 4
          aggregate_digest: "sha256:828bb713a668d7426af5af0a51f26eb03a9bfc0f438ac72c2f462f8bf0b72864"
          before_revision: 3
          command_digest: "sha256:d9fd2e7de9eaa2fadc9a2146719d93086edc9d7cac3921ae0f61039acc11a192"
          effect_ids: []
          event_digests:
            - "sha256:cfcefa41705bf92cabc4b10e4f526679cbca30896a970b4ea6573fc521e06ff7"
          mutation_id: "kernel_work_item_materialization_required:sha256:4a5c0e09ba3df3f124c761da0f0c280b84db3d536159315489dbac950d60e2c8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        result:sha256:0d90bf91a73d465cc112aab9b6d877c19a3414c595894bcd11fb36abb02a1a16:
          after_revision: 2
          aggregate_digest: "sha256:0fa790eeebf3b5bec7e95a78421ed83f2b4e952b5944d7326098cdd537b1ae3a"
          before_revision: 1
          command_digest: "sha256:2aa9c73c038d3c30fdabaf254934d53cfa4f71a7c0f5fe68be14c37a54dee5b3"
          effect_ids: []
          event_digests:
            - "sha256:22c5914765ad88839e596849f1475a7b0fa92827dd4eba38adcc85557fe7f5c1"
          mutation_id: "result:sha256:0d90bf91a73d465cc112aab9b6d877c19a3414c595894bcd11fb36abb02a1a16"
        sha256:b170e024d4968e124080d945b0621999740e490ed0b637e913b84850eb8064e3:
          after_revision: 3
          aggregate_digest: "sha256:775f5cac695bfc87592232ad8caa5714b7617716f4e8c50a8edc8b856543ebf0"
          before_revision: 2
          command_digest: "sha256:48ad7299f6f22936343da367674023ea34a88b8352e6d026def0ba3c46e2f048"
          effect_ids: []
          event_digests:
            - "sha256:c0fc0771625d5ad394bd5b9a228a0ebff5bfccde6d5393204c155c9c1f9a9a44"
          mutation_id: "sha256:b170e024d4968e124080d945b0621999740e490ed0b637e913b84850eb8064e3"
        sha256:bfbb5feea44796946eac3dd2bd4b27661b275f31370ee7642b2f4e5091866cd4:
          after_revision: 7
          aggregate_digest: "sha256:5376709366b20016c97992f019d8b86197d364a59ad234f2daf44c11eaf1a8d9"
          before_revision: 6
          command_digest: "sha256:2fc0f0fe7e5909ea4ee2efc35c428d3a49d00d6e823677349926f58d8083f9c9"
          effect_ids: []
          event_digests:
            - "sha256:ad9dfc14f6274f1a053a846642b92d54e64bbc901f0c37a26ceb4dd185dc7d4c"
          mutation_id: "sha256:bfbb5feea44796946eac3dd2bd4b27661b275f31370ee7642b2f4e5091866cd4"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        ratchet-reviewed-release-compatibility-candidate:
          attempt: 1
          claim_id: "sha256:780f44d1eee710c3af54797c5b0615054800b0a64c9e62e6056a7311521b6a49"
          definition:
            contract_digest: "sha256:0cee0d1d877a4250344f015df9760717071e1619b5b0cd4f88c0558f0954a187"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "release_metadata"
              resources: []
              scope_roots:
                - "scripts/lib"
                - "scripts/bench"
                - "scripts/checks"
                - "packages/agentplane/src/commands/release"
            expected_outputs:
              - "reviewed-version-anchor"
              - "normalized-historical-delta-check"
              - "candidate-version-ratchet"
              - "focused-negative-tests"
            id: "ratchet-reviewed-release-compatibility-candidate"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:5f0fd20f43df0cae81f067ac83cda9fbdfd9191c6992935fd60d6fd9e7f96158"
    documents:
      contracts:
        sha256:0cee0d1d877a4250344f015df9760717071e1619b5b0cd4f88c0558f0954a187:
          acceptance_criteria:
            - "Preserve the v0.6.24 baseline and incremental_package_delta object byte-for-byte."
            - "A release-only package version bump recaptures a stable digest-validated reviewed-version anchor and the candidate release_version_delta, and passes the compatibility checker after mutation."
            - "Unrelated package or dependency drift, non-parity internal versions, changed reviewed paths or hashes, tampered reviewed-version anchor, and changed candidate metadata are rejected."
            - "Release mutation stages the recaptured candidate with version metadata in one native release commit; there is no version-specific or Factory adapter."
            - "Focused tests pass; full CI runs sequentially once the heavy slot is available."
          objective: "Make release candidate version ratcheting generic and fail closed without modifying the immutable baseline or reviewed Zod delta."
          role: "EXECUTOR"
          verification_commands:
            - "node --test scripts/lib/compatibility-incremental-package-delta.test.mjs"
            - "bun run bench:compatibility:candidate:check"
            - "Focused release mutation tests covering candidate recapture and negative drift"
      intent:
        context: "Generic release ratchet with digest-sealed reviewed-version anchor, immutable historical Zod delta and v0.6.24 baseline, version-parity recapture in release mutation, and negative drift tests. Successor to non-executable 94ATB0/B4RATB plans."
        objective: "Ratchet compatibility candidate for release versions"
    events:
      -
        command_digest: "sha256:64ab9ea29139ddf32a962e2bb65ede97dcc756270e18b80f7dca29b3617f6d0a"
        id: "capture:202610252231-Y5Z4NW:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610252231-Y5Z4NW"
        occurred_at: "2026-10-25T22:31:26.115Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 1
      -
        command_digest: "sha256:2aa9c73c038d3c30fdabaf254934d53cfa4f71a7c0f5fe68be14c37a54dee5b3"
        id: "result:sha256:0d90bf91a73d465cc112aab9b6d877c19a3414c595894bcd11fb36abb02a1a16:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:0d90bf91a73d465cc112aab9b6d877c19a3414c595894bcd11fb36abb02a1a16"
        occurred_at: "2026-10-25T22:32:03.968Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 2
      -
        command_digest: "sha256:48ad7299f6f22936343da367674023ea34a88b8352e6d026def0ba3c46e2f048"
        id: "sha256:b170e024d4968e124080d945b0621999740e490ed0b637e913b84850eb8064e3:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:b170e024d4968e124080d945b0621999740e490ed0b637e913b84850eb8064e3"
        occurred_at: "2026-10-25T22:32:38.768Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 3
      -
        command_digest: "sha256:d9fd2e7de9eaa2fadc9a2146719d93086edc9d7cac3921ae0f61039acc11a192"
        id: "kernel_work_item_materialization_required:sha256:4a5c0e09ba3df3f124c761da0f0c280b84db3d536159315489dbac950d60e2c8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:4a5c0e09ba3df3f124c761da0f0c280b84db3d536159315489dbac950d60e2c8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-25T22:33:00.512Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 4
      -
        command_digest: "sha256:49d80bc1d7b907c73291a19be225bef4aac1191145679c03fb09dcd80455449a"
        id: "kernel_work_item_claim_required:sha256:7ecba997ad8a183e0fb7e2ad1ebc037f7e2380d9ed95f5518b3ecf7bb19804f6:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7ecba997ad8a183e0fb7e2ad1ebc037f7e2380d9ed95f5518b3ecf7bb19804f6:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-25T22:33:18.950Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 5
      -
        command_digest: "sha256:99ad3a8b8e3120f8cba9e4c76db31c76e0c387c38cea3e548700c5d27ff5e0a4"
        id: "kernel_work_item_execution_required:sha256:dca88cf32af17ec5e9d920137dfbfdfa688223e3f60ae1c986cfc9569a8261b8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:dca88cf32af17ec5e9d920137dfbfdfa688223e3f60ae1c986cfc9569a8261b8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-25T22:33:50.618Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 6
      -
        command_digest: "sha256:2fc0f0fe7e5909ea4ee2efc35c428d3a49d00d6e823677349926f58d8083f9c9"
        id: "sha256:bfbb5feea44796946eac3dd2bd4b27661b275f31370ee7642b2f4e5091866cd4:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:bfbb5feea44796946eac3dd2bd4b27661b275f31370ee7642b2f4e5091866cd4"
        occurred_at: "2026-10-26T00:22:28.108Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Ratchet compatibility candidate for release versions

Generic release ratchet with digest-sealed reviewed-version anchor, immutable historical Zod delta and v0.6.24 baseline, version-parity recapture in release mutation, and negative drift tests. Successor to non-executable 94ATB0/B4RATB plans.

## Scope

- In scope: Generic release ratchet with digest-sealed reviewed-version anchor, immutable historical Zod delta and v0.6.24 baseline, version-parity recapture in release mutation, and negative drift tests. Successor to non-executable 94ATB0/B4RATB plans.
- Out of scope: unrelated refactors not required for "Ratchet compatibility candidate for release versions".

## Plan

1. Execute approved WorkItem ratchet-reviewed-release-compatibility-candidate.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `node --test scripts/lib/compatibility-incremental-package-delta.test.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run bench:compatibility:candidate:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
