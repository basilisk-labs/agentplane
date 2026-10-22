---
id: "202610221621-BJVFYG"
title: "Repair issue 6159 duplicate JSONL and safe reset from named main base"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/context/reindex-projection.test.ts packages/agentplane/src/commands/context/reindex.incremental.unit.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-22T16:23:44.402Z"
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
      - "packages/agentplane/src/commands/context/reindex.incremental.unit.test.ts"
      - "packages/agentplane/src/commands/context/show.ts"
      - "packages/agentplane/src/context/context-utils.ts"
      - "packages/agentplane/src/context/knowledge-ref.ts"
      - "packages/agentplane/src/context/reindex-projection.test.ts"
      - "packages/agentplane/src/context/reindex-projection.ts"
      - "packages/agentplane/src/context/reindex.ts"
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
      - "packages/agentplane/src/commands/context/reindex.incremental.unit.test.ts"
      - "packages/agentplane/src/commands/context/show.ts"
      - "packages/agentplane/src/context/context-utils.ts"
      - "packages/agentplane/src/context/knowledge-ref.ts"
      - "packages/agentplane/src/context/reindex-projection.test.ts"
      - "packages/agentplane/src/context/reindex-projection.ts"
      - "packages/agentplane/src/context/reindex.ts"
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
          - "packages/agentplane/src/commands/context/reindex.incremental.unit.test.ts"
          - "packages/agentplane/src/commands/context/show.ts"
          - "packages/agentplane/src/context/context-utils.ts"
          - "packages/agentplane/src/context/knowledge-ref.ts"
          - "packages/agentplane/src/context/reindex-projection.test.ts"
          - "packages/agentplane/src/context/reindex-projection.ts"
          - "packages/agentplane/src/context/reindex.ts"
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
      digest: "sha256:36d86a90c394c8ddf86164224d3db82ed36113686976486f9ad4098854b02b6f"
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
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-22T16:22:03.747Z"
doc_updated_by: "CODER"
description: "Current main and origin/main both resolve to 7860c880. Guarantee unique deterministic per-file JSONL references and matching context show/knowledge selection, and retain prior readable SQLite projection when reset or full rebuild fails. Reproduce issue #6159. Supersedes blocked XZQJTT, EQT9ZD, and R5SD8X; retain their histories. R5SD8X was blocked because its base_ref was a literal SHA rather than the named main branch."
sections:
  Summary: |-
    Repair issue 6159 duplicate JSONL and safe reset from named main base

    Current main and origin/main both resolve to 7860c880. Guarantee unique deterministic per-file JSONL references and matching context show/knowledge selection, and retain prior readable SQLite projection when reset or full rebuild fails. Reproduce issue #6159. Supersedes blocked XZQJTT, EQT9ZD, and R5SD8X; retain their histories. R5SD8X was blocked because its base_ref was a literal SHA rather than the named main branch.
  Scope: |-
    - In scope: Current main and origin/main both resolve to 7860c880. Guarantee unique deterministic per-file JSONL references and matching context show/knowledge selection, and retain prior readable SQLite projection when reset or full rebuild fails. Reproduce issue #6159. Supersedes blocked XZQJTT, EQT9ZD, and R5SD8X; retain their histories. R5SD8X was blocked because its base_ref was a literal SHA rather than the named main branch.
    - Out of scope: unrelated refactors not required for "Repair issue 6159 duplicate JSONL and safe reset from named main base".
  Plan: |-
    1. Execute approved WorkItem unique-jsonl-refs.
    2. Execute approved WorkItem failure-safe-rebuild.
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair issue 6159 duplicate JSONL and safe reset from named main base". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair issue 6159 duplicate JSONL and safe reset from named main base". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "7860c880ef6a8a2261bea584fe87afe17d947795"
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
            digest: "sha256:eee81b4047ce17d84c293172f5bd2eaa6648c1256addcef13f8a20e94b913042"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:ab290bb3c7efbb2c07de4926115923f0aab991fff141e30d000dac6d441206d9"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:d169f558b4ca95819f74aee9574bf6cf5e7cf2572a2dd4723896497c25d9e706"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a1848d28e5f9a957da4a2e86a0f3b2e69d2231edd248f9bfbc2f5e2a61da345f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/context/reindex.incremental.unit.test.ts"
              - "packages/agentplane/src/commands/context/show.ts"
              - "packages/agentplane/src/context/context-utils.ts"
              - "packages/agentplane/src/context/knowledge-ref.ts"
              - "packages/agentplane/src/context/reindex-projection.test.ts"
              - "packages/agentplane/src/context/reindex-projection.ts"
              - "packages/agentplane/src/context/reindex.ts"
            task_id: "202610221621-BJVFYG"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:d169f558b4ca95819f74aee9574bf6cf5e7cf2572a2dd4723896497c25d9e706"
        digest: "sha256:ab290bb3c7efbb2c07de4926115923f0aab991fff141e30d000dac6d441206d9"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:6f171f6b3f5d03c19571742e7962d31f9deb5fadbf702bec3f7f0a4bb26ed4d1"
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
                - "packages/agentplane/src/commands/context/reindex.incremental.unit.test.ts"
                - "packages/agentplane/src/commands/context/show.ts"
                - "packages/agentplane/src/context/context-utils.ts"
                - "packages/agentplane/src/context/knowledge-ref.ts"
                - "packages/agentplane/src/context/reindex-projection.test.ts"
                - "packages/agentplane/src/context/reindex-projection.ts"
            expected_outputs:
              - "unique-jsonl-ref-output"
            id: "unique-jsonl-refs"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:830b1068659da57c337617d6e00fc74a93287adc80457dac13d52247b3c5a0cc"
            depends_on:
              - "unique-jsonl-refs"
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
                - "packages/agentplane/src/commands/context/reindex.incremental.unit.test.ts"
                - "packages/agentplane/src/context/reindex.ts"
            expected_outputs:
              - "safe-reindex-output"
            id: "failure-safe-rebuild"
            optional: false
            required_inputs:
              - "unique-jsonl-ref-output"
      effects: []
      final_validation: null
      id: "202610221621-BJVFYG"
      intent_digest: "sha256:21b147f17d076ac8bad86505edb968fe0884c1d4c9f1d5ad461220299f123ed2"
      migration_receipts: []
      mutation_receipts:
        capture:202610221621-BJVFYG:
          after_revision: 1
          aggregate_digest: "sha256:6b335ecae103379db4bd9a064f4b5da80858a4e39dd239eab287f1a361ee20eb"
          before_revision: 0
          command_digest: "sha256:2b657d57902ad0e124441bb08d54b91eaede3e23aa0261a11be498a734917d12"
          effect_ids: []
          event_digests:
            - "sha256:5f2ae7e622f23ff3cfd8f0a7564e715ab42be64780d5984a307203cc4d3e9841"
          mutation_id: "capture:202610221621-BJVFYG"
        kernel_work_item_claim_required:sha256:83d9ff2f36897b21e5144ecfe537cd9786992dcfc25fcca0fdeb106259bac744:sha256:a1848d28e5f9a957da4a2e86a0f3b2e69d2231edd248f9bfbc2f5e2a61da345f:
          after_revision: 5
          aggregate_digest: "sha256:aaef8e04339ce34dd9d4f7400edbfced03809f5aa93a4d5306ac17108870bd51"
          before_revision: 4
          command_digest: "sha256:0d3a04f83b06c2d14d298319f783b871f1200987a2d50590142fe82496de1359"
          effect_ids: []
          event_digests:
            - "sha256:9e2e7c408d67d7661fd9a4f87dc1464fadb25497bff30114fe28d2f8d08c8e87"
          mutation_id: "kernel_work_item_claim_required:sha256:83d9ff2f36897b21e5144ecfe537cd9786992dcfc25fcca0fdeb106259bac744:sha256:a1848d28e5f9a957da4a2e86a0f3b2e69d2231edd248f9bfbc2f5e2a61da345f"
        kernel_work_item_execution_required:sha256:f2d2b837bea03962c425b8cadfd551282c18d2ffcef856118b24242ad054b0e4:sha256:a1848d28e5f9a957da4a2e86a0f3b2e69d2231edd248f9bfbc2f5e2a61da345f:
          after_revision: 6
          aggregate_digest: "sha256:fe5c09000db5b3ea0084296e25090fffb7b0b96a69051f70a5984a9d3fc4315d"
          before_revision: 5
          command_digest: "sha256:97dece8a01adaa3f6658c9cc39564d62ec2e7cdf782b6561263a61d24b99cdf0"
          effect_ids: []
          event_digests:
            - "sha256:7d805280057606fa94dc7f329f09a885f18c007ab9a8c998720fece235116276"
          mutation_id: "kernel_work_item_execution_required:sha256:f2d2b837bea03962c425b8cadfd551282c18d2ffcef856118b24242ad054b0e4:sha256:a1848d28e5f9a957da4a2e86a0f3b2e69d2231edd248f9bfbc2f5e2a61da345f"
        kernel_work_item_materialization_required:sha256:3e49608a1310ee2754b8852fb16af2839562d842398e3fc60b6babef830627ff:sha256:a1848d28e5f9a957da4a2e86a0f3b2e69d2231edd248f9bfbc2f5e2a61da345f:
          after_revision: 4
          aggregate_digest: "sha256:0a524bb823aceaae8d3a50b76d691090de7fb4cc7af8fe3d7b14c3e39a3e44a9"
          before_revision: 3
          command_digest: "sha256:bf18b00336cfccc5391359a637e83e4e7bb88674bd1ac3d874ccc2ce66ef64ef"
          effect_ids: []
          event_digests:
            - "sha256:72d5c61560471e8cce6663eadbb5036d9a6217643c62732398def84cf0b7b8be"
          mutation_id: "kernel_work_item_materialization_required:sha256:3e49608a1310ee2754b8852fb16af2839562d842398e3fc60b6babef830627ff:sha256:a1848d28e5f9a957da4a2e86a0f3b2e69d2231edd248f9bfbc2f5e2a61da345f"
        result:sha256:f984989c96a7817b04e82676b1116cbe35a83bd6f73f27d0384ca3bf4479b250:
          after_revision: 2
          aggregate_digest: "sha256:96b0d8d96b6be2e02277f98de419b870d01891c927fbac3f4f46556f0ef43eae"
          before_revision: 1
          command_digest: "sha256:6b25ba31a0f69cc352e71e277fd133193f5aeea758c6178fbc73d83736d280c9"
          effect_ids: []
          event_digests:
            - "sha256:d76b6c80188dca60ebadbbce3c4f9399a514a1088d850c2af19e12bf82b8fdf9"
          mutation_id: "result:sha256:f984989c96a7817b04e82676b1116cbe35a83bd6f73f27d0384ca3bf4479b250"
        sha256:9964026d9607f2cab3d4ccd220331eb866135e269628173b4ca21ff356aaac46:
          after_revision: 3
          aggregate_digest: "sha256:1b9ffb7f7a72ad0c7fe65a8a6e3b31ece8c35660712322c5f9f433620a16333b"
          before_revision: 2
          command_digest: "sha256:22870fe70a77fa910710dcdd88a444972f700f3a240e5d2fdbb38374a8caf73e"
          effect_ids: []
          event_digests:
            - "sha256:32d9ec0872b95535060c06b7074543df3bd89cecedd5bce8a10f01a27de601fd"
          mutation_id: "sha256:9964026d9607f2cab3d4ccd220331eb866135e269628173b4ca21ff356aaac46"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        failure-safe-rebuild:
          attempt: 0
          claim_id: null
          definition:
            contract_digest: "sha256:830b1068659da57c337617d6e00fc74a93287adc80457dac13d52247b3c5a0cc"
            depends_on:
              - "unique-jsonl-refs"
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
                - "packages/agentplane/src/commands/context/reindex.incremental.unit.test.ts"
                - "packages/agentplane/src/context/reindex.ts"
            expected_outputs:
              - "safe-reindex-output"
            id: "failure-safe-rebuild"
            optional: false
            required_inputs:
              - "unique-jsonl-ref-output"
          output_manifests: []
          result_digest: null
          revision: 1
          state: "PLANNED"
          validation: null
        unique-jsonl-refs:
          attempt: 1
          claim_id: "sha256:834b45c7f3dba419ba1bcc23b30a45103a5aa7af2daf8b097945a7a194ef0de5"
          definition:
            contract_digest: "sha256:6f171f6b3f5d03c19571742e7962d31f9deb5fadbf702bec3f7f0a4bb26ed4d1"
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
                - "packages/agentplane/src/commands/context/reindex.incremental.unit.test.ts"
                - "packages/agentplane/src/commands/context/show.ts"
                - "packages/agentplane/src/context/context-utils.ts"
                - "packages/agentplane/src/context/knowledge-ref.ts"
                - "packages/agentplane/src/context/reindex-projection.test.ts"
                - "packages/agentplane/src/context/reindex-projection.ts"
            expected_outputs:
              - "unique-jsonl-ref-output"
            id: "unique-jsonl-refs"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:8820bb083da31085d34b34521698e96d79c49f23a5fe1c6733d0733d2309adf0"
    documents:
      contracts:
        sha256:6f171f6b3f5d03c19571742e7962d31f9deb5fadbf702bec3f7f0a4bb26ed4d1:
          acceptance_criteria:
            - "Two or more rows with the same id, including ids that already end in a suffix and id-less rows, produce distinct deterministic projection paths and remain individually searchable."
            - "Each projected selector resolves to the corresponding row through context show and knowledge resolution; malformed/blank lines preserve physical source-line evidence."
            - "No changes outside the authorized seven roots."
          objective: "Use one per-file JSONL identity allocation contract for projection, context show, and knowledge resolution; preserve the first identity and assign deterministic noncolliding suffixes to duplicates and parsed-row-index fallbacks."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/context/reindex-projection.test.ts packages/agentplane/src/commands/context/reindex.incremental.unit.test.ts"
        sha256:830b1068659da57c337617d6e00fc74a93287adc80457dac13d52247b3c5a0cc:
          acceptance_criteria:
            - "The issue reproduction succeeds with includeRaw and returns searchable duplicate-id rows."
            - "A forced reset/full-rebuild failure leaves the prior working index readable with its prior rows and metadata."
            - "Successful reset and incremental behavior remain correct; focused tests pass."
          objective: "Make reset and full rebuild preserve a previously readable SQLite projection when row construction, database writing, or validation fails, while successful reset still replaces the projection."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/context/reindex-projection.test.ts packages/agentplane/src/commands/context/reindex.incremental.unit.test.ts"
      intent:
        context: "Current main and origin/main both resolve to 7860c880. Guarantee unique deterministic per-file JSONL references and matching context show/knowledge selection, and retain prior readable SQLite projection when reset or full rebuild fails. Reproduce issue #6159. Supersedes blocked XZQJTT, EQT9ZD, and R5SD8X; retain their histories. R5SD8X was blocked because its base_ref was a literal SHA rather than the named main branch."
        objective: "Repair issue 6159 duplicate JSONL and safe reset from named main base"
    events:
      -
        command_digest: "sha256:2b657d57902ad0e124441bb08d54b91eaede3e23aa0261a11be498a734917d12"
        id: "capture:202610221621-BJVFYG:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610221621-BJVFYG"
        occurred_at: "2026-10-22T16:22:03.542Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610221621-BJVFYG"
        task_revision: 1
      -
        command_digest: "sha256:6b25ba31a0f69cc352e71e277fd133193f5aeea758c6178fbc73d83736d280c9"
        id: "result:sha256:f984989c96a7817b04e82676b1116cbe35a83bd6f73f27d0384ca3bf4479b250:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:f984989c96a7817b04e82676b1116cbe35a83bd6f73f27d0384ca3bf4479b250"
        occurred_at: "2026-10-22T16:22:54.157Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610221621-BJVFYG"
        task_revision: 2
      -
        command_digest: "sha256:22870fe70a77fa910710dcdd88a444972f700f3a240e5d2fdbb38374a8caf73e"
        id: "sha256:9964026d9607f2cab3d4ccd220331eb866135e269628173b4ca21ff356aaac46:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:9964026d9607f2cab3d4ccd220331eb866135e269628173b4ca21ff356aaac46"
        occurred_at: "2026-10-22T16:23:28.212Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610221621-BJVFYG"
        task_revision: 3
      -
        command_digest: "sha256:bf18b00336cfccc5391359a637e83e4e7bb88674bd1ac3d874ccc2ce66ef64ef"
        id: "kernel_work_item_materialization_required:sha256:3e49608a1310ee2754b8852fb16af2839562d842398e3fc60b6babef830627ff:sha256:a1848d28e5f9a957da4a2e86a0f3b2e69d2231edd248f9bfbc2f5e2a61da345f:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:3e49608a1310ee2754b8852fb16af2839562d842398e3fc60b6babef830627ff:sha256:a1848d28e5f9a957da4a2e86a0f3b2e69d2231edd248f9bfbc2f5e2a61da345f"
        occurred_at: "2026-10-22T16:23:53.735Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610221621-BJVFYG"
        task_revision: 4
      -
        command_digest: "sha256:0d3a04f83b06c2d14d298319f783b871f1200987a2d50590142fe82496de1359"
        id: "kernel_work_item_claim_required:sha256:83d9ff2f36897b21e5144ecfe537cd9786992dcfc25fcca0fdeb106259bac744:sha256:a1848d28e5f9a957da4a2e86a0f3b2e69d2231edd248f9bfbc2f5e2a61da345f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:83d9ff2f36897b21e5144ecfe537cd9786992dcfc25fcca0fdeb106259bac744:sha256:a1848d28e5f9a957da4a2e86a0f3b2e69d2231edd248f9bfbc2f5e2a61da345f"
        occurred_at: "2026-10-22T16:24:31.788Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610221621-BJVFYG"
        task_revision: 5
      -
        command_digest: "sha256:97dece8a01adaa3f6658c9cc39564d62ec2e7cdf782b6561263a61d24b99cdf0"
        id: "kernel_work_item_execution_required:sha256:f2d2b837bea03962c425b8cadfd551282c18d2ffcef856118b24242ad054b0e4:sha256:a1848d28e5f9a957da4a2e86a0f3b2e69d2231edd248f9bfbc2f5e2a61da345f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:f2d2b837bea03962c425b8cadfd551282c18d2ffcef856118b24242ad054b0e4:sha256:a1848d28e5f9a957da4a2e86a0f3b2e69d2231edd248f9bfbc2f5e2a61da345f"
        occurred_at: "2026-10-22T16:25:23.455Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610221621-BJVFYG"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Repair issue 6159 duplicate JSONL and safe reset from named main base

Current main and origin/main both resolve to 7860c880. Guarantee unique deterministic per-file JSONL references and matching context show/knowledge selection, and retain prior readable SQLite projection when reset or full rebuild fails. Reproduce issue #6159. Supersedes blocked XZQJTT, EQT9ZD, and R5SD8X; retain their histories. R5SD8X was blocked because its base_ref was a literal SHA rather than the named main branch.

## Scope

- In scope: Current main and origin/main both resolve to 7860c880. Guarantee unique deterministic per-file JSONL references and matching context show/knowledge selection, and retain prior readable SQLite projection when reset or full rebuild fails. Reproduce issue #6159. Supersedes blocked XZQJTT, EQT9ZD, and R5SD8X; retain their histories. R5SD8X was blocked because its base_ref was a literal SHA rather than the named main branch.
- Out of scope: unrelated refactors not required for "Repair issue 6159 duplicate JSONL and safe reset from named main base".

## Plan

1. Execute approved WorkItem unique-jsonl-refs.
2. Execute approved WorkItem failure-safe-rebuild.

## Verify Steps

PLANNER fallback scaffold for "Repair issue 6159 duplicate JSONL and safe reset from named main base". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair issue 6159 duplicate JSONL and safe reset from named main base". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
