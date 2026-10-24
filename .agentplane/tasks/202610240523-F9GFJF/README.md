---
id: "202610240523-F9GFJF"
title: "Align PR lifecycle tests with ancestry-safe artifact refresh commits"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run lint"
  - "node node_modules/.bin/prettier --check packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
  - "node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-24T05:23:59.108Z"
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
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:cba261d9263138f97fdfe35abff42b19a5046d0ac295a694202f154530df363c"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
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
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-24T05:23:11.499Z"
doc_updated_by: "CODER"
description: "In 0.7.13 release CI retry8, run-cli.core.pr-flow.pr-lifecycle.test.ts has two stale HEAD assertions after pr open and pr update. Production pr/internal/auto-commit.ts intentionally preserves the existing implementation HEAD and creates a separate task artifact refresh commit because publication cannot be disproved from local refs or commit subject. Update only the affected test assertions, titles and commit/file expectations to prove ancestry-safe behavior: PR open keeps source change in parent and task artifacts in HEAD; PR update keeps change parent and task refresh HEAD. Audit adjacent PR lifecycle tests for the same stale assumption. Do not alter production commit behavior or weaken checks. Validate focused Vitest, formatting, lint, full local CI, independent review, hosted exact-head and guarded integration."
sections:
  Summary: |-
    Align PR lifecycle tests with ancestry-safe artifact refresh commits

    In 0.7.13 release CI retry8, run-cli.core.pr-flow.pr-lifecycle.test.ts has two stale HEAD assertions after pr open and pr update. Production pr/internal/auto-commit.ts intentionally preserves the existing implementation HEAD and creates a separate task artifact refresh commit because publication cannot be disproved from local refs or commit subject. Update only the affected test assertions, titles and commit/file expectations to prove ancestry-safe behavior: PR open keeps source change in parent and task artifacts in HEAD; PR update keeps change parent and task refresh HEAD. Audit adjacent PR lifecycle tests for the same stale assumption. Do not alter production commit behavior or weaken checks. Validate focused Vitest, formatting, lint, full local CI, independent review, hosted exact-head and guarded integration.
  Scope: |-
    - In scope: In 0.7.13 release CI retry8, run-cli.core.pr-flow.pr-lifecycle.test.ts has two stale HEAD assertions after pr open and pr update. Production pr/internal/auto-commit.ts intentionally preserves the existing implementation HEAD and creates a separate task artifact refresh commit because publication cannot be disproved from local refs or commit subject. Update only the affected test assertions, titles and commit/file expectations to prove ancestry-safe behavior: PR open keeps source change in parent and task artifacts in HEAD; PR update keeps change parent and task refresh HEAD. Audit adjacent PR lifecycle tests for the same stale assumption. Do not alter production commit behavior or weaken checks. Validate focused Vitest, formatting, lint, full local CI, independent review, hosted exact-head and guarded integration.
    - Out of scope: unrelated refactors not required for "Align PR lifecycle tests with ancestry-safe artifact refresh commits".
  Plan: "1. Execute approved WorkItem align-pr-lifecycle-ancestry-tests."
  Verify Steps: |-
    PLANNER fallback scaffold for "Align PR lifecycle tests with ancestry-safe artifact refresh commits". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Align PR lifecycle tests with ancestry-safe artifact refresh commits". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "14d3439a3daf5a9c17625e4f4667b839e33962d6"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
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
            digest: "sha256:cf6184e715b1e5b45ebfb9b070c82f079d1d2301975d079222f7a2f68b1e65c2"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:fec6437b5b8d358eb6b63d5802ae0615c5a82a5d8db16a4db38f06a00b3ad04f"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:fff1262980fe7d540a45ae13e2893480d92bc785a9e4f06e462d8314ec862486"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            task_id: "202610240523-F9GFJF"
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
            digest: "sha256:11c48697311f1ed7de9ce9d9bc404fc5f300a3899f805012eddcd10fa6e934dd"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:fec6437b5b8d358eb6b63d5802ae0615c5a82a5d8db16a4db38f06a00b3ad04f"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:fff1262980fe7d540a45ae13e2893480d92bc785a9e4f06e462d8314ec862486"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:cf6184e715b1e5b45ebfb9b070c82f079d1d2301975d079222f7a2f68b1e65c2"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:85b806f8df9ce7ba1d0845eaa7e65d7910c7a21716af7e586e7cd329d3ddb4e9"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            task_id: "202610240523-F9GFJF"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            evidence_digest: "sha256:591d3dbe8277d96a36da0a7abac77bcc033baee8d6c7004cca01ff950cf0b212"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:fff1262980fe7d540a45ae13e2893480d92bc785a9e4f06e462d8314ec862486"
        digest: "sha256:fec6437b5b8d358eb6b63d5802ae0615c5a82a5d8db16a4db38f06a00b3ad04f"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:d93742d473153feced8384ace9ce64804c4fb20b9ebc211cc8a0acad465e178c"
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
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            expected_outputs:
              - "ancestry-safe-lifecycle-regression"
            id: "align-pr-lifecycle-ancestry-tests"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610240523-F9GFJF"
      intent_digest: "sha256:9f63331b41f2da840c9fb01eb4f22516a6e0670cdd1215ff663b63b061811910"
      migration_receipts: []
      mutation_receipts:
        capture:202610240523-F9GFJF:
          after_revision: 1
          aggregate_digest: "sha256:5c28df2455e55a6a92a743f1d8c09ec42e81750d5950093ab576f1eecf6a2f5b"
          before_revision: 0
          command_digest: "sha256:d6ccc97017a18fc42aad7b557f910be9b286b9efa719b9fa5134344a02165013"
          effect_ids: []
          event_digests:
            - "sha256:24eec89da92916821a46c230a083405a94296999b8087289bcf5ab326e1973d4"
          mutation_id: "capture:202610240523-F9GFJF"
        kernel_work_item_claim_required:sha256:1b28785f5963399ca3db643f5cf8c236ede5685c984e582381c7ed6a69390cbc:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b:
          after_revision: 5
          aggregate_digest: "sha256:a0283ee045cb31cee27fa26200ea14bcc80c6602ff3e71b80566c1f2fe31b000"
          before_revision: 4
          command_digest: "sha256:ff139dcdd568192e317211927ec612f65e2323fa8d0c0d7a7db5e1fa831738fa"
          effect_ids: []
          event_digests:
            - "sha256:2acdf48cc2b60991c4042c9f54034068b6cee8cd1546ba3fda18a0a75f10be3f"
          mutation_id: "kernel_work_item_claim_required:sha256:1b28785f5963399ca3db643f5cf8c236ede5685c984e582381c7ed6a69390cbc:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        kernel_work_item_execution_required:sha256:14b93dfdc4e9dade6c28548fa717452bb9c89db80a6cc663e4124766386a71ca:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b:
          after_revision: 6
          aggregate_digest: "sha256:32e4e74ba997ff9f5f64a1ec3dd1879bd2caecfbaedb6a9039ba3be85b4c9640"
          before_revision: 5
          command_digest: "sha256:eae701f60ecf3bc5f9a4fa810f1a573b24d63d241a4266e67c48d299c5ba396f"
          effect_ids: []
          event_digests:
            - "sha256:5fd2e143de4eee002b5880fc95d9e3d9895eeb6cfbab57e8cbcfc28ee7bc2d8a"
          mutation_id: "kernel_work_item_execution_required:sha256:14b93dfdc4e9dade6c28548fa717452bb9c89db80a6cc663e4124766386a71ca:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        kernel_work_item_materialization_required:sha256:ee1f0e64bce8a3345634a03815fe99da7abd3e0e711041d1d00a33a9dd8e0a44:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b:
          after_revision: 4
          aggregate_digest: "sha256:15afefd3dbde94e91063a69a33eb6a2a90b6ae4bccb157ba3d09c15248121f4a"
          before_revision: 3
          command_digest: "sha256:d2356c3507f80dec2fb8749414e1410ae0db3faf3e27ac1df25998068a5fbad7"
          effect_ids: []
          event_digests:
            - "sha256:1cc9c9333372df11665deeb8f2b40e2e083ca7a31b26d9aeb8592d283670e9bd"
          mutation_id: "kernel_work_item_materialization_required:sha256:ee1f0e64bce8a3345634a03815fe99da7abd3e0e711041d1d00a33a9dd8e0a44:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        result:sha256:cbf14f9f7a19dc06f68ccea39c6d33fe54db6382d3580ff83cbe2ae667db2b91:
          after_revision: 2
          aggregate_digest: "sha256:602526651b264218df1f28c61527f71538f7057a813ea05d854b5c12800164f3"
          before_revision: 1
          command_digest: "sha256:9c33c0249ade99064ea25699ba48ebc9583f69e3db7b22258c1fe63b08bf827d"
          effect_ids: []
          event_digests:
            - "sha256:a26b8fc2b1f28df2c3910953881fe74e65d6134d7393923d551e90a3028a525e"
          mutation_id: "result:sha256:cbf14f9f7a19dc06f68ccea39c6d33fe54db6382d3580ff83cbe2ae667db2b91"
        sha256:27342cfbbd20b000133bae4e43aaef596d99688837336bdc570caed6916276e6:
          after_revision: 7
          aggregate_digest: "sha256:23e9dd7145b719c486aeef535b957910673479e28c23a3e28a8f5bc11590e16a"
          before_revision: 6
          command_digest: "sha256:3e8be6b34d718778134c1124f870312c46bb1d013639e77ecaf2717f31874417"
          effect_ids: []
          event_digests:
            - "sha256:11521e9274e05a515a2422c722f7bbf2823546d97395a07dd56469696bbcf350"
          mutation_id: "sha256:27342cfbbd20b000133bae4e43aaef596d99688837336bdc570caed6916276e6"
        sha256:32ccf258ed7bb724202b28da40b6615b2f4076987891a51d1f392cddb45d14ad:
          after_revision: 3
          aggregate_digest: "sha256:e50ce4d371b78f250f44febbbd951f32e7d1944bb8228b8d00e1d825d8209eae"
          before_revision: 2
          command_digest: "sha256:664340106b974a5bddd9b86c5b5622e34a48ecb03c9004003c8aa041da3b4c89"
          effect_ids: []
          event_digests:
            - "sha256:48cdae2972ee4ab416215fc1f17a00d6c808a46a302444b42b0da512f81f80a3"
          mutation_id: "sha256:32ccf258ed7bb724202b28da40b6615b2f4076987891a51d1f392cddb45d14ad"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        align-pr-lifecycle-ancestry-tests:
          attempt: 1
          claim_id: "sha256:e3c615cf99e8a2e8b26c238a5410574d38990483a57e5194a85b2d6ad7fba37d"
          definition:
            contract_digest: "sha256:d93742d473153feced8384ace9ce64804c4fb20b9ebc211cc8a0acad465e178c"
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
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            expected_outputs:
              - "ancestry-safe-lifecycle-regression"
            id: "align-pr-lifecycle-ancestry-tests"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:fbb66d4f6d2b803aa5f16873923bc327eb3c8903ed017573337ce68df527c6b6"
    documents:
      contracts:
        sha256:d93742d473153feced8384ace9ce64804c4fb20b9ebc211cc8a0acad465e178c:
          acceptance_criteria:
            - "PR open test expects an artifact-refresh HEAD above the original implementation commit, two task branch commits, source change in the parent, and task artifacts in refresh HEAD."
            - "PR update test expects an artifact-refresh HEAD above the original change commit and still verifies tracked task artifacts and clean status."
            - "Test names and descriptions reflect separate commits; adjacent PR lifecycle assertions are audited without unrelated changes."
            - "Focused Vitest, formatting, lint, and full local CI pass before PR publication."
          objective: "Assert the actual ancestry-safe PR open and update artifact-refresh commit behavior without modifying production code."
          role: "EXECUTOR"
          verification_commands:
            - "node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            - "node node_modules/.bin/prettier --check packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts"
            - "bun run lint"
      intent:
        context: "In 0.7.13 release CI retry8, run-cli.core.pr-flow.pr-lifecycle.test.ts has two stale HEAD assertions after pr open and pr update. Production pr/internal/auto-commit.ts intentionally preserves the existing implementation HEAD and creates a separate task artifact refresh commit because publication cannot be disproved from local refs or commit subject. Update only the affected test assertions, titles and commit/file expectations to prove ancestry-safe behavior: PR open keeps source change in parent and task artifacts in HEAD; PR update keeps change parent and task refresh HEAD. Audit adjacent PR lifecycle tests for the same stale assumption. Do not alter production commit behavior or weaken checks. Validate focused Vitest, formatting, lint, full local CI, independent review, hosted exact-head and guarded integration."
        objective: "Align PR lifecycle tests with ancestry-safe artifact refresh commits"
    events:
      -
        command_digest: "sha256:d6ccc97017a18fc42aad7b557f910be9b286b9efa719b9fa5134344a02165013"
        id: "capture:202610240523-F9GFJF:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610240523-F9GFJF"
        occurred_at: "2026-10-24T05:23:11.435Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610240523-F9GFJF"
        task_revision: 1
      -
        command_digest: "sha256:9c33c0249ade99064ea25699ba48ebc9583f69e3db7b22258c1fe63b08bf827d"
        id: "result:sha256:cbf14f9f7a19dc06f68ccea39c6d33fe54db6382d3580ff83cbe2ae667db2b91:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:cbf14f9f7a19dc06f68ccea39c6d33fe54db6382d3580ff83cbe2ae667db2b91"
        occurred_at: "2026-10-24T05:23:44.752Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610240523-F9GFJF"
        task_revision: 2
      -
        command_digest: "sha256:664340106b974a5bddd9b86c5b5622e34a48ecb03c9004003c8aa041da3b4c89"
        id: "sha256:32ccf258ed7bb724202b28da40b6615b2f4076987891a51d1f392cddb45d14ad:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:32ccf258ed7bb724202b28da40b6615b2f4076987891a51d1f392cddb45d14ad"
        occurred_at: "2026-10-24T05:23:52.863Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610240523-F9GFJF"
        task_revision: 3
      -
        command_digest: "sha256:d2356c3507f80dec2fb8749414e1410ae0db3faf3e27ac1df25998068a5fbad7"
        id: "kernel_work_item_materialization_required:sha256:ee1f0e64bce8a3345634a03815fe99da7abd3e0e711041d1d00a33a9dd8e0a44:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:ee1f0e64bce8a3345634a03815fe99da7abd3e0e711041d1d00a33a9dd8e0a44:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        occurred_at: "2026-10-24T05:24:01.757Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610240523-F9GFJF"
        task_revision: 4
      -
        command_digest: "sha256:ff139dcdd568192e317211927ec612f65e2323fa8d0c0d7a7db5e1fa831738fa"
        id: "kernel_work_item_claim_required:sha256:1b28785f5963399ca3db643f5cf8c236ede5685c984e582381c7ed6a69390cbc:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:1b28785f5963399ca3db643f5cf8c236ede5685c984e582381c7ed6a69390cbc:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        occurred_at: "2026-10-24T05:24:13.191Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610240523-F9GFJF"
        task_revision: 5
      -
        command_digest: "sha256:eae701f60ecf3bc5f9a4fa810f1a573b24d63d241a4266e67c48d299c5ba396f"
        id: "kernel_work_item_execution_required:sha256:14b93dfdc4e9dade6c28548fa717452bb9c89db80a6cc663e4124766386a71ca:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:14b93dfdc4e9dade6c28548fa717452bb9c89db80a6cc663e4124766386a71ca:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        occurred_at: "2026-10-24T05:24:42.684Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610240523-F9GFJF"
        task_revision: 6
      -
        command_digest: "sha256:3e8be6b34d718778134c1124f870312c46bb1d013639e77ecaf2717f31874417"
        id: "sha256:27342cfbbd20b000133bae4e43aaef596d99688837336bdc570caed6916276e6:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:27342cfbbd20b000133bae4e43aaef596d99688837336bdc570caed6916276e6"
        occurred_at: "2026-10-24T05:30:07.396Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610240523-F9GFJF"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Align PR lifecycle tests with ancestry-safe artifact refresh commits

In 0.7.13 release CI retry8, run-cli.core.pr-flow.pr-lifecycle.test.ts has two stale HEAD assertions after pr open and pr update. Production pr/internal/auto-commit.ts intentionally preserves the existing implementation HEAD and creates a separate task artifact refresh commit because publication cannot be disproved from local refs or commit subject. Update only the affected test assertions, titles and commit/file expectations to prove ancestry-safe behavior: PR open keeps source change in parent and task artifacts in HEAD; PR update keeps change parent and task refresh HEAD. Audit adjacent PR lifecycle tests for the same stale assumption. Do not alter production commit behavior or weaken checks. Validate focused Vitest, formatting, lint, full local CI, independent review, hosted exact-head and guarded integration.

## Scope

- In scope: In 0.7.13 release CI retry8, run-cli.core.pr-flow.pr-lifecycle.test.ts has two stale HEAD assertions after pr open and pr update. Production pr/internal/auto-commit.ts intentionally preserves the existing implementation HEAD and creates a separate task artifact refresh commit because publication cannot be disproved from local refs or commit subject. Update only the affected test assertions, titles and commit/file expectations to prove ancestry-safe behavior: PR open keeps source change in parent and task artifacts in HEAD; PR update keeps change parent and task refresh HEAD. Audit adjacent PR lifecycle tests for the same stale assumption. Do not alter production commit behavior or weaken checks. Validate focused Vitest, formatting, lint, full local CI, independent review, hosted exact-head and guarded integration.
- Out of scope: unrelated refactors not required for "Align PR lifecycle tests with ancestry-safe artifact refresh commits".

## Plan

1. Execute approved WorkItem align-pr-lifecycle-ancestry-tests.

## Verify Steps

PLANNER fallback scaffold for "Align PR lifecycle tests with ancestry-safe artifact refresh commits". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Align PR lifecycle tests with ancestry-safe artifact refresh commits". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
