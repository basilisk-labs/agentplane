---
id: "202610102335-4WQ91M"
title: "Use the actual merged target for hosted task closure"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "release-repair"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test:project agentplane packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts --maxWorkers=2"
  - "bun run typecheck"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-10-10T23:38:19.166Z"
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
      - ".github/workflows/task-hosted-close.yml"
      - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
      - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
      - "scripts/workflow/prepare-hosted-task-closure.mjs"
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
      - ".github/workflows/task-hosted-close.yml"
      - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
      - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
      - "scripts/workflow/prepare-hosted-task-closure.mjs"
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
          - ".github/workflows/task-hosted-close.yml"
          - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
          - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
          - "scripts/workflow/prepare-hosted-task-closure.mjs"
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
      digest: "sha256:df0ad7fa2810213b328ce0d595882435b52026bbc52e002d03386ed06299798c"
      escalation_reasons:
        - "central_component:.github/workflows/task-hosted-close.yml"
        - "central_component:packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
        - "central_component:scripts/workflow/prepare-hosted-task-closure.mjs"
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
doc_updated_at: "2026-10-10T23:35:39.326Z"
doc_updated_by: "CODER"
description: "Actual hosted run38086990752 for PR6120 merged into agentplane/J8P9K9-integration failed because the privileged workflow checked out main and could not find the task README. Prepare a generic minimal correction using authenticated actual merged PR base metadata, preserving pull_request_target trust, canonical Task Kernel ownership, existing closure idempotency and foreign repository/ref rejection. Never fabricate GitHub events or execute untrusted PR head content. Plan only initially; no workflow dispatch, consumer repair or publication."
sections:
  Summary: |-
    Use the actual merged target for hosted task closure

    Actual hosted run38086990752 for PR6120 merged into agentplane/J8P9K9-integration failed because the privileged workflow checked out main and could not find the task README. Prepare a generic minimal correction using authenticated actual merged PR base metadata, preserving pull_request_target trust, canonical Task Kernel ownership, existing closure idempotency and foreign repository/ref rejection. Never fabricate GitHub events or execute untrusted PR head content. Plan only initially; no workflow dispatch, consumer repair or publication.
  Scope: |-
    - In scope: Actual hosted run38086990752 for PR6120 merged into agentplane/J8P9K9-integration failed because the privileged workflow checked out main and could not find the task README. Prepare a generic minimal correction using authenticated actual merged PR base metadata, preserving pull_request_target trust, canonical Task Kernel ownership, existing closure idempotency and foreign repository/ref rejection. Never fabricate GitHub events or execute untrusted PR head content. Plan only initially; no workflow dispatch, consumer repair or publication.
    - Out of scope: unrelated refactors not required for "Use the actual merged target for hosted task closure".
  Plan: "1. Execute approved WorkItem repair-hosted-close-target."
  Verify Steps: |-
    PLANNER fallback scaffold for "Use the actual merged target for hosted task closure". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Use the actual merged target for hosted task closure". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_ref: "agentplane/J8P9K9-integration"
    base_sha: "743ce58d0c7f8568adb5adf102a5fe78d27ac797"
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
            digest: "sha256:e69bdcffacee61d225f59ac48dcf0416426d4f270bdcea0a367be93d4680ae03"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:092dbe8d9bd5532ebb46b548d1cf125ee836c4d89a3dd6cee162110758ccd4fc"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:7abf88047f526fd264239ec110a7a1597bc3a06e0b12ba8820c33697eeb5eacc"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - ".github/workflows/task-hosted-close.yml"
              - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
              - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
              - "scripts/workflow/prepare-hosted-task-closure.mjs"
            task_id: "202610102335-4WQ91M"
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
        approval_evidence_digest: "sha256:7abf88047f526fd264239ec110a7a1597bc3a06e0b12ba8820c33697eeb5eacc"
        digest: "sha256:092dbe8d9bd5532ebb46b548d1cf125ee836c4d89a3dd6cee162110758ccd4fc"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:d398e3fc4b54a06139a6e1b7b23f495db746080f2f0e160f9075c18ecfe6278a"
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
                - ".github/workflows/task-hosted-close.yml"
                - "scripts/workflow/prepare-hosted-task-closure.mjs"
                - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
                - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
            expected_outputs:
              - "hosted-close-target-report"
            id: "repair-hosted-close-target"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610102335-4WQ91M"
      intent_digest: "sha256:a19ba852963666e5630c987bbb8c486a5865e159086f2e3c5e566b7db24d159e"
      migration_receipts: []
      mutation_receipts:
        capture:202610102335-4WQ91M:
          after_revision: 1
          aggregate_digest: "sha256:11378ded2736c9bf51f46e472e76c0f8a257b3ba3f5d06f02a25bb386445c927"
          before_revision: 0
          command_digest: "sha256:37c2d89fc3c06e07138f24b33f6a85372daa8b0e6d52257697f9fadd085db332"
          effect_ids: []
          event_digests:
            - "sha256:3472548b20db383b637aa67c5ab0976f90cf21133b9168eb24632e1354dd530d"
          mutation_id: "capture:202610102335-4WQ91M"
        kernel_work_item_claim_required:sha256:aa557f9332c5287fef510cf3cd1c049a207f816df9ed1d0a38f6aedd06449f8b:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:
          after_revision: 5
          aggregate_digest: "sha256:573d98a110f3dc2dc64d6488052cf93f819c3ac4d437761ea99a5a036f07ac84"
          before_revision: 4
          command_digest: "sha256:d3b602752c46cb25e2cfbcd0ff8acbbf2fc187092e556dd20b64483eac2499d8"
          effect_ids: []
          event_digests:
            - "sha256:b8db557d7fcd779b84f71aa1908be63011ec5bdc24717f85fbda0d9c357c5b73"
          mutation_id: "kernel_work_item_claim_required:sha256:aa557f9332c5287fef510cf3cd1c049a207f816df9ed1d0a38f6aedd06449f8b:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        kernel_work_item_execution_required:sha256:517067b17c33b4dfb681ac23ef27e74871c3794560f8d4cc0bf07deffd79f508:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:
          after_revision: 6
          aggregate_digest: "sha256:22bb6d825325a7d6d15ad538f247b73e6f217bedb721202bc49e86013f8df835"
          before_revision: 5
          command_digest: "sha256:233195e0e8ecfdefa071bbb523826306d8adb063052dedba3debfbe6be8f07f2"
          effect_ids: []
          event_digests:
            - "sha256:8f45ba96a8cab2dfbc2f1d097db43ba9a280fab79046f6e0840d6b1ab8a125e9"
          mutation_id: "kernel_work_item_execution_required:sha256:517067b17c33b4dfb681ac23ef27e74871c3794560f8d4cc0bf07deffd79f508:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        kernel_work_item_materialization_required:sha256:a03c9e8ab57c947b81675c93637d57a79011e3cdac7696fe1a26fee7ed14ca99:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:
          after_revision: 4
          aggregate_digest: "sha256:298ecdd180a4d21396d1c788108ff5d6786a784949ccc0de71aa481e784ee0b2"
          before_revision: 3
          command_digest: "sha256:0aa0ff2b46966973db329bdb1a1d6166a68afa61278749ffc2cfbf45ddf6da04"
          effect_ids: []
          event_digests:
            - "sha256:0fc30cc8c9083c57a50aefbe4f8a9d47aa075219341e2681053430af10140710"
          mutation_id: "kernel_work_item_materialization_required:sha256:a03c9e8ab57c947b81675c93637d57a79011e3cdac7696fe1a26fee7ed14ca99:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        result:sha256:5a15671807661891a08abe0a049aeed040fac471c871a1600fe7e867140e82f9:
          after_revision: 2
          aggregate_digest: "sha256:0bcabfe3417b1c7c1b7690cdcc79b802d18f3d378bdcbc071550e3f54534bd4b"
          before_revision: 1
          command_digest: "sha256:a14841f79c47664b216771e788809beca2a34eff39772ad62a4a2e6627de43f5"
          effect_ids: []
          event_digests:
            - "sha256:ee24218018bc9a517174a3f6841282edf9fd4744eb375a9be88fafbaa621e22d"
          mutation_id: "result:sha256:5a15671807661891a08abe0a049aeed040fac471c871a1600fe7e867140e82f9"
        sha256:3cebb6fad31f46443af7f529076054199c6534817d88a9aa1ad9fc278505b39e:
          after_revision: 3
          aggregate_digest: "sha256:0f1a09bd763bb1ab8797d50f85ad87188c4e6d0f93c5c3b091e63db052c91127"
          before_revision: 2
          command_digest: "sha256:55530ad2fca71fca4caef6a5c35b2e11fb2717d91bbaedfb43ee14c3b9b4cefc"
          effect_ids: []
          event_digests:
            - "sha256:a9529e35b72a8cf17a8019d36d8c82344356322c93013aa8776b7081386472a8"
          mutation_id: "sha256:3cebb6fad31f46443af7f529076054199c6534817d88a9aa1ad9fc278505b39e"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        repair-hosted-close-target:
          attempt: 1
          claim_id: "sha256:edfbb15aef9d62c233240ae54fd3c0ef3329fbe77f09a70c7fef8cabdb4204b1"
          definition:
            contract_digest: "sha256:d398e3fc4b54a06139a6e1b7b23f495db746080f2f0e160f9075c18ecfe6278a"
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
                - ".github/workflows/task-hosted-close.yml"
                - "scripts/workflow/prepare-hosted-task-closure.mjs"
                - "packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts"
                - "packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts"
            expected_outputs:
              - "hosted-close-target-report"
            id: "repair-hosted-close-target"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:66a3c1271e7b6fbf9a897d44d9f15548b115f5c7199baf470d8157d220d32d1e"
    documents:
      contracts:
        sha256:d398e3fc4b54a06139a6e1b7b23f495db746080f2f0e160f9075c18ecfe6278a:
          acceptance_criteria:
            - "Reproduce the actual non-main target mismatch with a bounded fixture: a merged task PR targets an assembly branch containing its task artifacts while main lacks them. The workflow must select the authenticated merged target before task lookup; retain the original hosted failure as evidence."
            - "Use the actual merged PR base repository/ref and merge identity. Fail closed on missing, malformed, foreign or ambiguous target metadata; do not silently substitute main. Preserve named branch handling and deterministic closure metadata."
            - "Preserve pull_request_target trust: never check out or execute an untrusted pull-request head, never interpolate unvalidated event strings as shell code, and keep privileged execution tied to reviewed repository/base content. Preserve existing permissions and normal checks; no fake event or dispatch."
            - "Preserve canonical Task Kernel ownership (hosted-close remains a no-op for canonical tasks), legacy closure idempotency, existing branch/PR readback and normal merge requirements. No consumer state repair, historical review inheritance or task completion fabrication."
            - "Run the declared focused tests, typecheck and diff check. Include main and non-main targets, malformed or absent refs and repository mismatch rejection. Change only the four admitted roots; report any additional dependency before edits."
          objective: "Select and authenticate the actual merged target for generic hosted task closure without executing untrusted PR head code or weakening native ownership."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts --maxWorkers=2"
            - "bun run typecheck"
            - "git diff --check"
      intent:
        context: "Actual hosted run38086990752 for PR6120 merged into agentplane/J8P9K9-integration failed because the privileged workflow checked out main and could not find the task README. Prepare a generic minimal correction using authenticated actual merged PR base metadata, preserving pull_request_target trust, canonical Task Kernel ownership, existing closure idempotency and foreign repository/ref rejection. Never fabricate GitHub events or execute untrusted PR head content. Plan only initially; no workflow dispatch, consumer repair or publication."
        objective: "Use the actual merged target for hosted task closure"
    events:
      -
        command_digest: "sha256:37c2d89fc3c06e07138f24b33f6a85372daa8b0e6d52257697f9fadd085db332"
        id: "capture:202610102335-4WQ91M:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610102335-4WQ91M"
        occurred_at: "2026-10-10T23:35:38.987Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610102335-4WQ91M"
        task_revision: 1
      -
        command_digest: "sha256:a14841f79c47664b216771e788809beca2a34eff39772ad62a4a2e6627de43f5"
        id: "result:sha256:5a15671807661891a08abe0a049aeed040fac471c871a1600fe7e867140e82f9:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:5a15671807661891a08abe0a049aeed040fac471c871a1600fe7e867140e82f9"
        occurred_at: "2026-10-10T23:37:32.606Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610102335-4WQ91M"
        task_revision: 2
      -
        command_digest: "sha256:55530ad2fca71fca4caef6a5c35b2e11fb2717d91bbaedfb43ee14c3b9b4cefc"
        id: "sha256:3cebb6fad31f46443af7f529076054199c6534817d88a9aa1ad9fc278505b39e:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:3cebb6fad31f46443af7f529076054199c6534817d88a9aa1ad9fc278505b39e"
        occurred_at: "2026-10-10T23:37:59.848Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610102335-4WQ91M"
        task_revision: 3
      -
        command_digest: "sha256:0aa0ff2b46966973db329bdb1a1d6166a68afa61278749ffc2cfbf45ddf6da04"
        id: "kernel_work_item_materialization_required:sha256:a03c9e8ab57c947b81675c93637d57a79011e3cdac7696fe1a26fee7ed14ca99:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a03c9e8ab57c947b81675c93637d57a79011e3cdac7696fe1a26fee7ed14ca99:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        occurred_at: "2026-10-10T23:38:29.278Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610102335-4WQ91M"
        task_revision: 4
      -
        command_digest: "sha256:d3b602752c46cb25e2cfbcd0ff8acbbf2fc187092e556dd20b64483eac2499d8"
        id: "kernel_work_item_claim_required:sha256:aa557f9332c5287fef510cf3cd1c049a207f816df9ed1d0a38f6aedd06449f8b:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:aa557f9332c5287fef510cf3cd1c049a207f816df9ed1d0a38f6aedd06449f8b:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        occurred_at: "2026-10-10T23:38:43.605Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610102335-4WQ91M"
        task_revision: 5
      -
        command_digest: "sha256:233195e0e8ecfdefa071bbb523826306d8adb063052dedba3debfbe6be8f07f2"
        id: "kernel_work_item_execution_required:sha256:517067b17c33b4dfb681ac23ef27e74871c3794560f8d4cc0bf07deffd79f508:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:517067b17c33b4dfb681ac23ef27e74871c3794560f8d4cc0bf07deffd79f508:sha256:28fead7e1aac81db3ec2e02640f5f5b25f02c6c174398777d0dc6aed713a143b"
        occurred_at: "2026-10-10T23:41:05.405Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610102335-4WQ91M"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Use the actual merged target for hosted task closure

Actual hosted run38086990752 for PR6120 merged into agentplane/J8P9K9-integration failed because the privileged workflow checked out main and could not find the task README. Prepare a generic minimal correction using authenticated actual merged PR base metadata, preserving pull_request_target trust, canonical Task Kernel ownership, existing closure idempotency and foreign repository/ref rejection. Never fabricate GitHub events or execute untrusted PR head content. Plan only initially; no workflow dispatch, consumer repair or publication.

## Scope

- In scope: Actual hosted run38086990752 for PR6120 merged into agentplane/J8P9K9-integration failed because the privileged workflow checked out main and could not find the task README. Prepare a generic minimal correction using authenticated actual merged PR base metadata, preserving pull_request_target trust, canonical Task Kernel ownership, existing closure idempotency and foreign repository/ref rejection. Never fabricate GitHub events or execute untrusted PR head content. Plan only initially; no workflow dispatch, consumer repair or publication.
- Out of scope: unrelated refactors not required for "Use the actual merged target for hosted task closure".

## Plan

1. Execute approved WorkItem repair-hosted-close-target.

## Verify Steps

PLANNER fallback scaffold for "Use the actual merged target for hosted task closure". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Use the actual merged target for hosted task closure". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
