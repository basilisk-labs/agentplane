---
id: "202610260157-ZDEE0D"
title: "Recover an approved plan when a required declared check cannot execute"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 26
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "verification"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-10-26T03:27:34.422Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-26T02:46:17.850Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:731de155276362896b92f88f54b4a1a30c0117f902411e2695474861f57967de"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-26T02:46:17.850Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "aa3f9d6689b55f76854c24ae2b9c93e22035910c"
  review_identity_digest: "sha256:d0e3c3597fbbb4e8c3cffcc2344c585969eb01de7ce5a347241a75b91cff2a85"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610260157-ZDEE0D/6e7d086ff974c37702dfd1cfc8f715cc94f246deaf46ad439f2dfaa88d0dbebb/quality-report.json"
  findings:
    - "The exact result:<WorkOrder> receipt binds accepted-result command digest, Plan digest/revision, task, WorkItem, result digest, and revision progression."
    - "The exact validation:<WorkOrder> receipt binds the FAILED native evidence and unavailable command; one-command/unchanged-contract and USER approval checks remain enforced."
    - "Active EXECUTING claims are rejected; correction resets only BLOCKED or REWORK_READY work for a new native attempt. Native focused checks passed."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_security_boundary"
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
      - "security_boundary"
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
    writable_roots:
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_security_boundary"
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
          - "packages/agentplane/src/commands/task"
          - "packages/core/src/tasks"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:6bea736418779b87fd6d2e6611a97e67ecb25473e5addbd3af9eb9831ea471ed"
      escalation_reasons:
        - "central_component:packages/core/src/tasks"
        - "effect_security_boundary"
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
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "aa3f9d6689b55f76854c24ae2b9c93e22035910c"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-26T01:57:30.855Z"
doc_updated_by: "CODER"
description: "Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters."
sections:
  Summary: |-
    Recover an approved plan when a required declared check cannot execute

    Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters.
  Scope: |-
    - In scope: Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters.
    - Out of scope: unrelated refactors not required for "Recover an approved plan when a required declared check cannot execute".
  Plan: |-
    1. Execute approved WorkItem recover-nonexecutable-required-check.
    2. Execute approved WorkItem split-required-check-recovery-test.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
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
  agentplane.kernel_operational_projection:
    digest: "sha256:a333ce303e2f387d5889d23af4095aeaa3a70e1f1f10d8040400b455e5715c91"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610260157-ZDEE0D/6e7d086ff974c37702dfd1cfc8f715cc94f246deaf46ad439f2dfaa88d0dbebb/quality-report.json"
    findings:
      - "The exact result:<WorkOrder> receipt binds accepted-result command digest, Plan digest/revision, task, WorkItem, result digest, and revision progression."
      - "The exact validation:<WorkOrder> receipt binds the FAILED native evidence and unavailable command; one-command/unchanged-contract and USER approval checks remain enforced."
      - "Active EXECUTING claims are rejected; correction resets only BLOCKED or REWORK_READY work for a new native attempt. Native focused checks passed."
    implementation_commit: "aa3f9d6689b55f76854c24ae2b9c93e22035910c"
    implementation_tree: "3c51c4044aec557d55d09f1faed1d7821bd23e99"
    projected_at: "2026-10-26T02:46:17.850Z"
    review_identity_digest: "sha256:d0e3c3597fbbb4e8c3cffcc2344c585969eb01de7ce5a347241a75b91cff2a85"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:731de155276362896b92f88f54b4a1a30c0117f902411e2695474861f57967de"
    work_order_id: "sha256:55d88461430063ce747496d6a1bc5618b2a06ff633fc41300e29bdf4c9275e86"
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
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:210a90f65fa26477906250effb48edc674fffb2d37e315ca9fd27792a735e3d6"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e3cf96165c32d1143c4778fd71b2be826a8a0367790358f71e9c926938e747eb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202610260157-ZDEE0D"
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
            digest: "sha256:338cb70c5303d5b310950ccd7ff6f03f4dc369a94aae93e1d8ea764af4330054"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e3cf96165c32d1143c4778fd71b2be826a8a0367790358f71e9c926938e747eb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:210a90f65fa26477906250effb48edc674fffb2d37e315ca9fd27792a735e3d6"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202610260157-ZDEE0D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/agentplane/src/commands/task/plan-set.command.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
            evidence_digest: "sha256:a2ed7ed02af58a001a49cfc2f4d1d51947350dbe0088aa4cda3e19f7d07897fd"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ad21f015f998c4eeb119c70be1b1bda0790d7ff740a038000f4d5eb2f117c38e"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e3cf96165c32d1143c4778fd71b2be826a8a0367790358f71e9c926938e747eb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:338cb70c5303d5b310950ccd7ff6f03f4dc369a94aae93e1d8ea764af4330054"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202610260157-ZDEE0D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-plan.ts"
              - "packages/core/src/tasks/task-kernel/kernel.test.ts"
              - "packages/core/src/tasks/task-kernel/kernel.ts"
              - "packages/core/src/tasks/task-kernel/model.ts"
            evidence_digest: "sha256:4ac1bab15de7a5bca56ab91e894493e290bd50a6acd04e93ed473b7ca1d05636"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:82fdb73409a77fd39e72a5f3f2578dd1273156b4ac3371fa9f29941e4cfe2db1"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:def09ed379532b29a2a47e2d47dd47d19d8a2e762f0fef65db1b7b82264ccabe"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:ad21f015f998c4eeb119c70be1b1bda0790d7ff740a038000f4d5eb2f117c38e"
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202610260157-ZDEE0D"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:f3605a6b0f1b5a6672cbbe818cf819ec5cdd611f8709e169a737ebb84da1d249"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:23955e7e5d13a89f7e7307075f9d3253f629a88d2f5c81c411a832ee1bd30930"
        digest: "sha256:def09ed379532b29a2a47e2d47dd47d19d8a2e762f0fef65db1b7b82264ccabe"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:e92abf9bc2108a26ceceae37ca16a7de484208da36dbe8b1e2d533f7263c2fce"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "proof-bound-check-replacement"
              - "retained-failure-and-rerun"
              - "negative-recovery-tests"
            id: "recover-nonexecutable-required-check"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:99eea3f0378f2a9492381fc101c4a85225e8f08c3fbed774eeb23f351c5678ec"
            depends_on:
              - "recover-nonexecutable-required-check"
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "hotspot-test-split-evidence"
            id: "split-required-check-recovery-test"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610260157-ZDEE0D"
      intent_digest: "sha256:0ba74aae27a9559d0728b44ed2c463c332c417af9febbaee8fd656a12508101a"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:def09ed379532b29a2a47e2d47dd47d19d8a2e762f0fef65db1b7b82264ccabe:
          after_revision: 19
          aggregate_digest: "sha256:5e519e85ffcbc256d1fd420c7fbc6b4e1ad103f70c36923efee06d14cc90b6e9"
          before_revision: 18
          command_digest: "sha256:31a69a7184084008d48a3c20c28f3329c016873dfb7f5faafb4284eb012b9f24"
          effect_ids: []
          event_digests:
            - "sha256:abe644a7d39950cfcfd4baec51ba1ee979524df31f4fdbd2201bc4a9ae0b1122"
          mutation_id: "amend:sha256:def09ed379532b29a2a47e2d47dd47d19d8a2e762f0fef65db1b7b82264ccabe"
        capture:202610260157-ZDEE0D:
          after_revision: 1
          aggregate_digest: "sha256:719b1550753da0920d99e1b58cce82860df7936f3e1a893df695e67fbccd7292"
          before_revision: 0
          command_digest: "sha256:500355ac118938f57c6495b6048b7a6548c1b18d9b4535e5f6bbd137782d115b"
          effect_ids: []
          event_digests:
            - "sha256:a455ebca0344421a476fac7b5b33f06850e1e810c4a450976a28757cc5cea011"
          mutation_id: "capture:202610260157-ZDEE0D"
        kernel_work_item_claim_required:sha256:ced6a448111ee84d94571f8bbe45864df62f733df5e108c445f684bfec4df793:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 5
          aggregate_digest: "sha256:eefd6d2eadaac5a7791ddeb01e1369d5a095bfb0afe51fcf6d5b58f7a41b8306"
          before_revision: 4
          command_digest: "sha256:9cef2d974f592e3d386358acdea59d2d862fb03be87b4e9a2a29ebe10331f0f7"
          effect_ids: []
          event_digests:
            - "sha256:10db915233dcd1907a899d57c7ed08018e594a9b0ddb5e2d62a21189a20bb746"
          mutation_id: "kernel_work_item_claim_required:sha256:ced6a448111ee84d94571f8bbe45864df62f733df5e108c445f684bfec4df793:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_claim_required:sha256:e3b0f5df6b2446e979b3520cbfcee0f46bc6d204b7a9ff37c4d7b368d07f6872:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501:
          after_revision: 21
          aggregate_digest: "sha256:dfcff2c84bc93915923028cbc209ac5aced5e5c40bb8660d96ce411717751ea3"
          before_revision: 20
          command_digest: "sha256:9ae868a9df8e3acaa7a91e8aa1318d600f313659f1c30bb0ec5b70214add5eb2"
          effect_ids: []
          event_digests:
            - "sha256:7f1781bf4f720e238cde02490d40ecc1cf7ea1745b120603c406232910918373"
          mutation_id: "kernel_work_item_claim_required:sha256:e3b0f5df6b2446e979b3520cbfcee0f46bc6d204b7a9ff37c4d7b368d07f6872:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
        kernel_work_item_execution_required:sha256:4bfb865f6e762760fed8908ad2f1151ac2ade4ce0a037bceefece21377da57f1:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 6
          aggregate_digest: "sha256:9804148a061addded49be02bda88bc5d0ff28440c1919f92ebba4d2c13352df9"
          before_revision: 5
          command_digest: "sha256:1d019c9f4efcf31ee5777e9c1d9f17f56e3eab77e8894c22003e0c25d747b357"
          effect_ids: []
          event_digests:
            - "sha256:cc796d8919ca6999eb2a10c910e607972b693320c54fbe7770548b769cd0d767"
          mutation_id: "kernel_work_item_execution_required:sha256:4bfb865f6e762760fed8908ad2f1151ac2ade4ce0a037bceefece21377da57f1:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_execution_required:sha256:6cba4d089abb1aa2ce0dcefe0376dfad770812c43c54b807f402e5dec7f91b3c:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501:
          after_revision: 22
          aggregate_digest: "sha256:f2a0c9b52474c90842b83a55eb05d687cb5e34f76416387d31db712ff3dc3494"
          before_revision: 21
          command_digest: "sha256:bd418a31f9e85cac43e0e28eaec580adec2f13775e39a2dd3a56597abfdca728"
          effect_ids: []
          event_digests:
            - "sha256:aa27887349edac25058122d9b7ef381258aae2bdddd58ad6e7879a6c9e8ae068"
          mutation_id: "kernel_work_item_execution_required:sha256:6cba4d089abb1aa2ce0dcefe0376dfad770812c43c54b807f402e5dec7f91b3c:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
        kernel_work_item_execution_required:sha256:73d8506d324ba4b8c7a5bf5270b92e5df336b20ee804dda0beb2cbef37cbc384:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:
          after_revision: 13
          aggregate_digest: "sha256:149de7329b22408a62e06d7fc92410c80692b7d0b599876665e7343d1eba377a"
          before_revision: 12
          command_digest: "sha256:83601970a07248715ac0f4eb3fbf48dcc9d39d86e86dafb52cf8989f3c4217ff"
          effect_ids: []
          event_digests:
            - "sha256:7ba97f49b0ddf8f0f81ca0b9bf76f2a4b2cca021bc8a0c184dc9dd23c4a33587"
          mutation_id: "kernel_work_item_execution_required:sha256:73d8506d324ba4b8c7a5bf5270b92e5df336b20ee804dda0beb2cbef37cbc384:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        kernel_work_item_inspection_required:sha256:7e833188d59d77de68e6665a437034568005d320c34e8bad00c29c3f05444477:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501:
          after_revision: 16
          aggregate_digest: "sha256:62682440206945bd063ed945817bee6ae09d3260d1a871aa6259d2b77f263692"
          before_revision: 15
          command_digest: "sha256:76bb05a043e30f740a3af13c4e4dbf33143fd4d79e809f4cccece59e7101e0aa"
          effect_ids: []
          event_digests:
            - "sha256:61b76281b9dca95762861a9991bacf66636829ff599c2fd1cc23eb3af2a3a849"
          mutation_id: "kernel_work_item_inspection_required:sha256:7e833188d59d77de68e6665a437034568005d320c34e8bad00c29c3f05444477:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
        kernel_work_item_inspection_required:sha256:8c001fc46a04dd49077fc301af021b7b472ebf36c587cc51841c76ca27c4caeb:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:
          after_revision: 9
          aggregate_digest: "sha256:fa6903fcbbd30d0a2fbe86f2343dc579e74e5cf8401032a47d581c054975fa1a"
          before_revision: 8
          command_digest: "sha256:3c5f7bb5e810e64065f3e2f0f422a64588b37e3a47ca7d19c8dff8c7da7b0f08"
          effect_ids: []
          event_digests:
            - "sha256:4c7299ab52cfedc1624a9bd9fb1b8c9d0b0d9553b8e76f512104da3178eeb1ae"
          mutation_id: "kernel_work_item_inspection_required:sha256:8c001fc46a04dd49077fc301af021b7b472ebf36c587cc51841c76ca27c4caeb:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        kernel_work_item_materialization_required:sha256:39725a9be52555b75bf6e2813c38e96f6b2c502a773a36dffa8bf3d03e296728:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 4
          aggregate_digest: "sha256:755c479fa8f5344619b39f65be2e5f03b67ba4cd306d74e050069363abf7d7b0"
          before_revision: 3
          command_digest: "sha256:58d50b36deb6af2c3ca3815e37cb0eada2b2d4a115592edf5f4e7f45dd61a0c3"
          effect_ids: []
          event_digests:
            - "sha256:d17b50039daa05e59734750cbd0a5898a961200ab44da9304bfccf19dca56d89"
          mutation_id: "kernel_work_item_materialization_required:sha256:39725a9be52555b75bf6e2813c38e96f6b2c502a773a36dffa8bf3d03e296728:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_rework_claim_required:sha256:ae25c2f63973da270d949f340de9c04abab9a77de0768c92a387258c7ed2a20e:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:
          after_revision: 12
          aggregate_digest: "sha256:ebefdcee68c313b5f059ffc13ef6caded9ed915085871d949e9cb140cb7263f4"
          before_revision: 11
          command_digest: "sha256:5ab198389f24236bb3d7b1a58b1b6936e7b28a08f49b0e72fc1de24e91878f10"
          effect_ids: []
          event_digests:
            - "sha256:472d7e86903fca8c07a78764151a5ffb201ba0557f84b3b35c30bfabb237b44b"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:ae25c2f63973da270d949f340de9c04abab9a77de0768c92a387258c7ed2a20e:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        result:sha256:55d88461430063ce747496d6a1bc5618b2a06ff633fc41300e29bdf4c9275e86:
          after_revision: 15
          aggregate_digest: "sha256:e9308068956dbcca1a8f02f356486f7b9e509a87999654fd39f6970dba8e76d2"
          before_revision: 14
          command_digest: "sha256:a24ff9b86046b4c0cd7613a3c5552edd8712d4e87db2363e85a9888eed9bab5c"
          effect_ids: []
          event_digests:
            - "sha256:994c86a01c6a9e2b5c387cb1ba759259100193d6cc50c078723b09f894068786"
          mutation_id: "result:sha256:55d88461430063ce747496d6a1bc5618b2a06ff633fc41300e29bdf4c9275e86"
        result:sha256:8e8a97ec72ac8c62380aed88857e6074ebad93443a33c206b8cbff4ba90a17af:
          after_revision: 2
          aggregate_digest: "sha256:10856582d725975c9411dab57c9548dce0fd3d3d448871bc7ad33d2ddf869fe8"
          before_revision: 1
          command_digest: "sha256:b578c75f9dc2f97f3700f637516c477afe67667e325c18ad59738bcc49c07331"
          effect_ids: []
          event_digests:
            - "sha256:a46dd5f64c2ccb8f316fcf3b6d9c5b6cd659fad1c7f615479d7ffa99ac1a2c2d"
          mutation_id: "result:sha256:8e8a97ec72ac8c62380aed88857e6074ebad93443a33c206b8cbff4ba90a17af"
        result:sha256:fe676a7b8f652075690cb3d440cc996cb9cefe4835c70d941be4d8ee7902f387:
          after_revision: 8
          aggregate_digest: "sha256:18272b90f55009a019739c3c935a5883fc98c9bb4601ca26d9fefdab7b410d6c"
          before_revision: 7
          command_digest: "sha256:33077b327eb1eb38138d804a18ac385a4bb404769eb029853991cd416030cfea"
          effect_ids: []
          event_digests:
            - "sha256:9f5e3451f598b6f255bc0b0d1961d37268954867dba6dd540630f10749155d06"
          mutation_id: "result:sha256:fe676a7b8f652075690cb3d440cc996cb9cefe4835c70d941be4d8ee7902f387"
        sha256:17dee68f79dd4b75b465f3d7de19e4037917f4de0ad4271a9d09e0650ea01842:
          after_revision: 20
          aggregate_digest: "sha256:9ccfbae90a3355319a9c4192aee9defc535077b2f7bc63ca4e6e1b0225bfc188"
          before_revision: 19
          command_digest: "sha256:f800179e349c4bcf22a03088f34ae1689cb38b56a132cd1a37e7a52d3a95a33d"
          effect_ids: []
          event_digests:
            - "sha256:c8ea5fd55824f873b4bb8e86214300ce4562a0f06c8d11960ba2aad0521f4e80"
          mutation_id: "sha256:17dee68f79dd4b75b465f3d7de19e4037917f4de0ad4271a9d09e0650ea01842"
        sha256:31a673b3565e0e2b9b3d111f5e16660b68a1bab47eac3ab1e4459742e8011b31:
          after_revision: 3
          aggregate_digest: "sha256:c6852dd4ef1437c9819b3eb764a76670978a810f9f4e814a7d98d103a89742e3"
          before_revision: 2
          command_digest: "sha256:48587b8b0ed6b3d2f70d2e5e92200fb604dcfff3e34bd4d82384cfc83f664de5"
          effect_ids: []
          event_digests:
            - "sha256:0852850b15021d8bb7ddc8b63cc9186110467457121672cb3f9a7f6d695b3603"
          mutation_id: "sha256:31a673b3565e0e2b9b3d111f5e16660b68a1bab47eac3ab1e4459742e8011b31"
        sha256:8853ebbcdd5c2dc2998c1b02ee3f738e2e82af2e94bb7624b1364d9961c0e60a:
          after_revision: 14
          aggregate_digest: "sha256:e82c4d4847cc8711a0a14102aad4ca73872fb630a23d0d51a33ddc46c0b6b2a2"
          before_revision: 13
          command_digest: "sha256:f4d7f021183683346afff31f36b16881f1f2157bc53a643163fc5687023f5528"
          effect_ids: []
          event_digests:
            - "sha256:51431cbe721b4a7f2b39779bc5f3df8aa5b932168716e45b165ccee257720c08"
          mutation_id: "sha256:8853ebbcdd5c2dc2998c1b02ee3f738e2e82af2e94bb7624b1364d9961c0e60a"
        sha256:b3264106e5949cd5f7ccc7615d00d2c195ba71cb38b3afd8d0a43037696a4a54:
          after_revision: 7
          aggregate_digest: "sha256:bf353ae187240c43e9bca5e48d70a9fd3e4e16fd9e7a118547d2cf2dca2ac5c5"
          before_revision: 6
          command_digest: "sha256:18d47e27b16ae746fdeba40e73c3df3d219d06551dabf5b7bf2813e5f15590e0"
          effect_ids: []
          event_digests:
            - "sha256:e24fac44cafa49791917fc3a7e80642eb4d63e0590dda51db43e33847ca06b40"
          mutation_id: "sha256:b3264106e5949cd5f7ccc7615d00d2c195ba71cb38b3afd8d0a43037696a4a54"
        validation-resolution:sha256:b658d433e800b58979cca1c376d5c9bce8d76e0215f673e3bb274994ff9295e4:
          after_revision: 11
          aggregate_digest: "sha256:381d52fe1dfe0a6f6e47287fb82acddce98b284120ad4cea07901264690361b8"
          before_revision: 10
          command_digest: "sha256:64a4f5b01a63f29504826375e7cebec091e00038d304e4ec6b1cb2f6c2123f03"
          effect_ids: []
          event_digests:
            - "sha256:7134ad30640c4a579688037759349c29537838ed9559ce4c722930b0cde5a060"
          mutation_id: "validation-resolution:sha256:b658d433e800b58979cca1c376d5c9bce8d76e0215f673e3bb274994ff9295e4"
        validation-resolution:sha256:fb549b3308ca86f6c5bd66e64ca55284c955e5ec6621d347bbbf9b2b100e3ff4:
          after_revision: 18
          aggregate_digest: "sha256:c93801ce4deba8f5111ea67296cb9a1a22ac960833865d2d5d598336245ff6e2"
          before_revision: 17
          command_digest: "sha256:4bac646b9d1883b595b036cf6a8f60a0a86b29667c2171a43d569047d8118a23"
          effect_ids: []
          event_digests:
            - "sha256:ee19ccef731513715979d26e4269b4d018bd0f8cf71f4ec6b92d6409a24599d2"
          mutation_id: "validation-resolution:sha256:fb549b3308ca86f6c5bd66e64ca55284c955e5ec6621d347bbbf9b2b100e3ff4"
        validation:sha256:6e7d086ff974c37702dfd1cfc8f715cc94f246deaf46ad439f2dfaa88d0dbebb:
          after_revision: 17
          aggregate_digest: "sha256:82bee1858742b0d064aa6c97cd4528e012c38926511842a008bea9ca695adf9b"
          before_revision: 16
          command_digest: "sha256:e79aa0fa2fda26672923e1c33f4bb47678e1dc16a819df4b7dda13d25d3ace0f"
          effect_ids: []
          event_digests:
            - "sha256:87599429e03024249db88c427f5e03f1f090c75c040c0fa8bf988e0bc9dc5655"
          mutation_id: "validation:sha256:6e7d086ff974c37702dfd1cfc8f715cc94f246deaf46ad439f2dfaa88d0dbebb"
        validation:sha256:9043790485f852e3fce491a07c3aad3716ab4e8fec3322230d9525f5736feafd:
          after_revision: 10
          aggregate_digest: "sha256:1796a103bae37297ac3a851554c27461085be1a29f3778a3a821334ba8d82981"
          before_revision: 9
          command_digest: "sha256:af584b3b13c775cf674fc24b8e612b1cd73744ee448c2a28d250a7159a9e1fb3"
          effect_ids: []
          event_digests:
            - "sha256:eaae4dadb0bf98cf788ea0adb8075383475e1505b7f1a0ac1b969fcf16ccc62d"
          mutation_id: "validation:sha256:9043790485f852e3fce491a07c3aad3716ab4e8fec3322230d9525f5736feafd"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:399699ba3380a1f786cb4c653a464cd8028319fc22eeaa77e548dac384020211"
          digest: "sha256:e3cf96165c32d1143c4778fd71b2be826a8a0367790358f71e9c926938e747eb"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:e92abf9bc2108a26ceceae37ca16a7de484208da36dbe8b1e2d533f7263c2fce"
              depends_on: []
              execution_requirements:
                capabilities: []
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/core/src/tasks"
                  - "packages/agentplane/src/commands/task"
              expected_outputs:
                - "proof-bound-check-replacement"
                - "retained-failure-and-rerun"
                - "negative-recovery-tests"
              id: "recover-nonexecutable-required-check"
              optional: false
              required_inputs: []
      revision: 22
      schema_version: 1
      state: "ACTIVE"
      work_items:
        recover-nonexecutable-required-check:
          attempt: 2
          claim_id: "sha256:43603b68b603cae383bec45f2c2451eb0410c47ccfd5fed65c30da879885df98"
          definition:
            contract_digest: "sha256:e92abf9bc2108a26ceceae37ca16a7de484208da36dbe8b1e2d533f7263c2fce"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "proof-bound-check-replacement"
              - "retained-failure-and-rerun"
              - "negative-recovery-tests"
            id: "recover-nonexecutable-required-check"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:ee27b69d0d39619be0bea92d8d46081d4f5342b594f29f07db79f0823f0d10c9"
              id: "proof-bound-check-replacement"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
              task_id: "202610260157-ZDEE0D"
              work_item_id: "recover-nonexecutable-required-check"
            -
              attempt: 2
              digest: "sha256:d25e81cb594fb3e6e91c281aeb50d508ed815d47eaff4aa76e9f9d5169a7f071"
              id: "retained-failure-and-rerun"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
              task_id: "202610260157-ZDEE0D"
              work_item_id: "recover-nonexecutable-required-check"
            -
              attempt: 2
              digest: "sha256:f7a0b1aa3b6f8abdd1d5e1d5eb6ea8ab9717b1123c8ea2a9500eb31bfbd14c58"
              id: "negative-recovery-tests"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
              task_id: "202610260157-ZDEE0D"
              work_item_id: "recover-nonexecutable-required-check"
          result_digest: "sha256:26d969fa0bb9593b6bb6cd24c75b709c28252160d863b6ee575c81eecc479902"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:354a53ef5fe9f83bea12ae5e01557365266e560b7ed614251ae63723f8321d51"
              - "sha256:d0e3c3597fbbb4e8c3cffcc2344c585969eb01de7ce5a347241a75b91cff2a85"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:88b89b5a2b1ad4e9e3e2bd7b409c25cbea4c61398109d28b652596cc94bdb5c7"
              environment_digest: "sha256:c8ede4956100f314dd254350e6fdba0d432cefdf0e3fe4b0d936d3c4e6ee8f22"
              implementation_identity: "sha256:26d969fa0bb9593b6bb6cd24c75b709c28252160d863b6ee575c81eecc479902"
              toolchain_digest: "sha256:41f556c967f03a69c0cef4ec75be7f8d38201f5dbd7892c6be1827991efef149"
            observed_at: "2026-10-26T02:46:17.850Z"
            status: "PASSED"
        split-required-check-recovery-test:
          attempt: 1
          claim_id: "sha256:0dbf899a06adb349eba99bf3526966d082c501ab7ec71091520215d868c08444"
          definition:
            contract_digest: "sha256:99eea3f0378f2a9492381fc101c4a85225e8f08c3fbed774eeb23f351c5678ec"
            depends_on:
              - "recover-nonexecutable-required-check"
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "hotspot-test-split-evidence"
            id: "split-required-check-recovery-test"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 4
          state: "EXECUTING"
          validation: null
    digest: "sha256:c329a1d5534c309f4781d06df0d0e383c7673367765838eac7c33f67cb800b0e"
    documents:
      contracts:
        sha256:99eea3f0378f2a9492381fc101c4a85225e8f08c3fbed774eeb23f351c5678ec:
          acceptance_criteria:
            - "Move the required-check correction regression cases to a dedicated test file and keep the existing kernel test file below the oversized-test threshold."
            - "Retain positive and negative proof, active-claim, wrong-plan, and receipt-key coverage."
            - "Preserve implementation and prior failed full-CI evidence; no scope or authority expansion."
          objective: "Split the new required-check recovery regression test from the existing oversized kernel test file without changing implementation behavior."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/required-check-correction.test.ts packages/agentplane/src/commands/task/kernel-plan-supplied-approval.test.ts --pool=forks --maxWorkers 2"
            - "bun run hotspots:check"
        sha256:e92abf9bc2108a26ceceae37ca16a7de484208da36dbe8b1e2d533f7263c2fce:
          acceptance_criteria:
            - "Admit a correction only for an exact prior native declared-check failure whose command could not execute; bind original Plan digest, WorkItem, command, failure evidence, and a USER operator decision to the replacement."
            - "Keep scope, outputs, acceptance criteria, all other checks, and execution authority unchanged; reject missing or mismatched proof, unrelated changes, replay, and attempts to replace an executable failed test."
            - "Preserve the original FAILED validation and old Plan in history; corrected Plan requires a new WorkItem attempt and native execution of the replacement command before success."
            - "Use a generic mechanism with no version-specific or Factory-specific behavior."
          objective: "Allow an operator to correct exactly one proven non-executable required check in an approved canonical Plan and rerun it without waiving failed verification."
          role: "EXECUTOR"
          verification_commands:
            - "bun run typecheck"
            - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/agentplane/src/commands/task/kernel-plan-supplied-approval.test.ts --pool=forks --maxWorkers 2"
      intent:
        context: "Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters."
        objective: "Recover an approved plan when a required declared check cannot execute"
    events:
      -
        command_digest: "sha256:500355ac118938f57c6495b6048b7a6548c1b18d9b4535e5f6bbd137782d115b"
        id: "capture:202610260157-ZDEE0D:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610260157-ZDEE0D"
        occurred_at: "2026-10-26T01:57:30.730Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610260157-ZDEE0D"
        task_revision: 1
      -
        command_digest: "sha256:b578c75f9dc2f97f3700f637516c477afe67667e325c18ad59738bcc49c07331"
        id: "result:sha256:8e8a97ec72ac8c62380aed88857e6074ebad93443a33c206b8cbff4ba90a17af:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:8e8a97ec72ac8c62380aed88857e6074ebad93443a33c206b8cbff4ba90a17af"
        occurred_at: "2026-10-26T01:58:19.403Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610260157-ZDEE0D"
        task_revision: 2
      -
        command_digest: "sha256:48587b8b0ed6b3d2f70d2e5e92200fb604dcfff3e34bd4d82384cfc83f664de5"
        id: "sha256:31a673b3565e0e2b9b3d111f5e16660b68a1bab47eac3ab1e4459742e8011b31:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:31a673b3565e0e2b9b3d111f5e16660b68a1bab47eac3ab1e4459742e8011b31"
        occurred_at: "2026-10-26T01:58:41.853Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610260157-ZDEE0D"
        task_revision: 3
      -
        command_digest: "sha256:58d50b36deb6af2c3ca3815e37cb0eada2b2d4a115592edf5f4e7f45dd61a0c3"
        id: "kernel_work_item_materialization_required:sha256:39725a9be52555b75bf6e2813c38e96f6b2c502a773a36dffa8bf3d03e296728:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:39725a9be52555b75bf6e2813c38e96f6b2c502a773a36dffa8bf3d03e296728:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-26T01:59:04.850Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610260157-ZDEE0D"
        task_revision: 4
      -
        command_digest: "sha256:9cef2d974f592e3d386358acdea59d2d862fb03be87b4e9a2a29ebe10331f0f7"
        id: "kernel_work_item_claim_required:sha256:ced6a448111ee84d94571f8bbe45864df62f733df5e108c445f684bfec4df793:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ced6a448111ee84d94571f8bbe45864df62f733df5e108c445f684bfec4df793:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-26T01:59:31.464Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610260157-ZDEE0D"
        task_revision: 5
      -
        command_digest: "sha256:1d019c9f4efcf31ee5777e9c1d9f17f56e3eab77e8894c22003e0c25d747b357"
        id: "kernel_work_item_execution_required:sha256:4bfb865f6e762760fed8908ad2f1151ac2ade4ce0a037bceefece21377da57f1:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4bfb865f6e762760fed8908ad2f1151ac2ade4ce0a037bceefece21377da57f1:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-26T02:00:11.177Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610260157-ZDEE0D"
        task_revision: 6
      -
        command_digest: "sha256:18d47e27b16ae746fdeba40e73c3df3d219d06551dabf5b7bf2813e5f15590e0"
        id: "sha256:b3264106e5949cd5f7ccc7615d00d2c195ba71cb38b3afd8d0a43037696a4a54:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:b3264106e5949cd5f7ccc7615d00d2c195ba71cb38b3afd8d0a43037696a4a54"
        occurred_at: "2026-10-26T02:38:22.523Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610260157-ZDEE0D"
        task_revision: 7
      -
        command_digest: "sha256:33077b327eb1eb38138d804a18ac385a4bb404769eb029853991cd416030cfea"
        id: "result:sha256:fe676a7b8f652075690cb3d440cc996cb9cefe4835c70d941be4d8ee7902f387:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:fe676a7b8f652075690cb3d440cc996cb9cefe4835c70d941be4d8ee7902f387"
        occurred_at: "2026-10-26T02:38:40.206Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610260157-ZDEE0D"
        task_revision: 8
      -
        command_digest: "sha256:3c5f7bb5e810e64065f3e2f0f422a64588b37e3a47ca7d19c8dff8c7da7b0f08"
        id: "kernel_work_item_inspection_required:sha256:8c001fc46a04dd49077fc301af021b7b472ebf36c587cc51841c76ca27c4caeb:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:8c001fc46a04dd49077fc301af021b7b472ebf36c587cc51841c76ca27c4caeb:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        occurred_at: "2026-10-26T02:38:52.745Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610260157-ZDEE0D"
        task_revision: 9
      -
        command_digest: "sha256:af584b3b13c775cf674fc24b8e612b1cd73744ee448c2a28d250a7159a9e1fb3"
        id: "validation:sha256:9043790485f852e3fce491a07c3aad3716ab4e8fec3322230d9525f5736feafd:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:9043790485f852e3fce491a07c3aad3716ab4e8fec3322230d9525f5736feafd"
        occurred_at: "2026-10-26T02:41:17.447Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610260157-ZDEE0D"
        task_revision: 10
      -
        command_digest: "sha256:64a4f5b01a63f29504826375e7cebec091e00038d304e4ec6b1cb2f6c2123f03"
        id: "validation-resolution:sha256:b658d433e800b58979cca1c376d5c9bce8d76e0215f673e3bb274994ff9295e4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:b658d433e800b58979cca1c376d5c9bce8d76e0215f673e3bb274994ff9295e4"
        occurred_at: "2026-10-26T02:41:25.540Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610260157-ZDEE0D"
        task_revision: 11
      -
        command_digest: "sha256:5ab198389f24236bb3d7b1a58b1b6936e7b28a08f49b0e72fc1de24e91878f10"
        id: "kernel_work_item_rework_claim_required:sha256:ae25c2f63973da270d949f340de9c04abab9a77de0768c92a387258c7ed2a20e:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:ae25c2f63973da270d949f340de9c04abab9a77de0768c92a387258c7ed2a20e:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        occurred_at: "2026-10-26T02:41:41.457Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610260157-ZDEE0D"
        task_revision: 12
      -
        command_digest: "sha256:83601970a07248715ac0f4eb3fbf48dcc9d39d86e86dafb52cf8989f3c4217ff"
        id: "kernel_work_item_execution_required:sha256:73d8506d324ba4b8c7a5bf5270b92e5df336b20ee804dda0beb2cbef37cbc384:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:73d8506d324ba4b8c7a5bf5270b92e5df336b20ee804dda0beb2cbef37cbc384:sha256:c50794b51983d8b20fe83635694ec8b13dbd4c58396bb4fa465954fb5835f758"
        occurred_at: "2026-10-26T02:41:52.488Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610260157-ZDEE0D"
        task_revision: 13
      -
        command_digest: "sha256:f4d7f021183683346afff31f36b16881f1f2157bc53a643163fc5687023f5528"
        id: "sha256:8853ebbcdd5c2dc2998c1b02ee3f738e2e82af2e94bb7624b1364d9961c0e60a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:8853ebbcdd5c2dc2998c1b02ee3f738e2e82af2e94bb7624b1364d9961c0e60a"
        occurred_at: "2026-10-26T02:44:58.726Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202610260157-ZDEE0D"
        task_revision: 14
      -
        command_digest: "sha256:a24ff9b86046b4c0cd7613a3c5552edd8712d4e87db2363e85a9888eed9bab5c"
        id: "result:sha256:55d88461430063ce747496d6a1bc5618b2a06ff633fc41300e29bdf4c9275e86:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:55d88461430063ce747496d6a1bc5618b2a06ff633fc41300e29bdf4c9275e86"
        occurred_at: "2026-10-26T02:45:11.665Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202610260157-ZDEE0D"
        task_revision: 15
      -
        command_digest: "sha256:76bb05a043e30f740a3af13c4e4dbf33143fd4d79e809f4cccece59e7101e0aa"
        id: "kernel_work_item_inspection_required:sha256:7e833188d59d77de68e6665a437034568005d320c34e8bad00c29c3f05444477:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:7e833188d59d77de68e6665a437034568005d320c34e8bad00c29c3f05444477:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
        occurred_at: "2026-10-26T02:45:21.751Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610260157-ZDEE0D"
        task_revision: 16
      -
        command_digest: "sha256:e79aa0fa2fda26672923e1c33f4bb47678e1dc16a819df4b7dda13d25d3ace0f"
        id: "validation:sha256:6e7d086ff974c37702dfd1cfc8f715cc94f246deaf46ad439f2dfaa88d0dbebb:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:6e7d086ff974c37702dfd1cfc8f715cc94f246deaf46ad439f2dfaa88d0dbebb"
        occurred_at: "2026-10-26T02:46:25.935Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202610260157-ZDEE0D"
        task_revision: 17
      -
        command_digest: "sha256:4bac646b9d1883b595b036cf6a8f60a0a86b29667c2171a43d569047d8118a23"
        id: "validation-resolution:sha256:fb549b3308ca86f6c5bd66e64ca55284c955e5ec6621d347bbbf9b2b100e3ff4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:fb549b3308ca86f6c5bd66e64ca55284c955e5ec6621d347bbbf9b2b100e3ff4"
        occurred_at: "2026-10-26T02:46:31.729Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610260157-ZDEE0D"
        task_revision: 18
      -
        command_digest: "sha256:31a69a7184084008d48a3c20c28f3329c016873dfb7f5faafb4284eb012b9f24"
        id: "amend:sha256:def09ed379532b29a2a47e2d47dd47d19d8a2e762f0fef65db1b7b82264ccabe:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:def09ed379532b29a2a47e2d47dd47d19d8a2e762f0fef65db1b7b82264ccabe"
        occurred_at: "2026-10-26T03:27:02.283Z"
        payload_digest: "sha256:9b35555a95e3db10926d6bf83c8a3fdeca4218efbd9c9de546b6be9c2e203914"
        task_id: "202610260157-ZDEE0D"
        task_revision: 19
      -
        command_digest: "sha256:f800179e349c4bcf22a03088f34ae1689cb38b56a132cd1a37e7a52d3a95a33d"
        id: "sha256:17dee68f79dd4b75b465f3d7de19e4037917f4de0ad4271a9d09e0650ea01842:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:17dee68f79dd4b75b465f3d7de19e4037917f4de0ad4271a9d09e0650ea01842"
        occurred_at: "2026-10-26T03:27:13.015Z"
        payload_digest: "sha256:881eb1d3f48c5092189b9c51aa93913d574c5e9406e4b901513a8741256569d1"
        task_id: "202610260157-ZDEE0D"
        task_revision: 20
      -
        command_digest: "sha256:9ae868a9df8e3acaa7a91e8aa1318d600f313659f1c30bb0ec5b70214add5eb2"
        id: "kernel_work_item_claim_required:sha256:e3b0f5df6b2446e979b3520cbfcee0f46bc6d204b7a9ff37c4d7b368d07f6872:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:e3b0f5df6b2446e979b3520cbfcee0f46bc6d204b7a9ff37c4d7b368d07f6872:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
        occurred_at: "2026-10-26T03:27:43.097Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202610260157-ZDEE0D"
        task_revision: 21
      -
        command_digest: "sha256:bd418a31f9e85cac43e0e28eaec580adec2f13775e39a2dd3a56597abfdca728"
        id: "kernel_work_item_execution_required:sha256:6cba4d089abb1aa2ce0dcefe0376dfad770812c43c54b807f402e5dec7f91b3c:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:6cba4d089abb1aa2ce0dcefe0376dfad770812c43c54b807f402e5dec7f91b3c:sha256:713b5db1f5b98872dfa50f1902ad9b532a2982eb8631229dfc7ce863ae5fd501"
        occurred_at: "2026-10-26T03:27:55.562Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202610260157-ZDEE0D"
        task_revision: 22
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Recover an approved plan when a required declared check cannot execute

Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters.

## Scope

- In scope: Add a generic, USER-attested correction route for a required verification command that native validation proved non-executable. Preserve the original FAILED receipt and exact old/new command audit evidence; reject unrelated contract, scope, or command changes; rerun the replacement check before completion. Do not silently waive verification or add release-specific adapters.
- Out of scope: unrelated refactors not required for "Recover an approved plan when a required declared check cannot execute".

## Plan

1. Execute approved WorkItem recover-nonexecutable-required-check.
2. Execute approved WorkItem split-required-check-recovery-test.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
