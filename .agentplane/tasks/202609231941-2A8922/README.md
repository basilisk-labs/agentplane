---
id: "202609231941-2A8922"
title: "Decouple hook runner from mutable checkouts"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 19
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "reliability"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
verify:
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-23T19:59:39.109Z"
  updated_by: "USER"
  note: null
verification:
  state: "ok"
  updated_at: "2026-09-23T21:28:31.406Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
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
    allowed_capabilities: []
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
    allowed_resources: []
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
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects:
      - "network_read"
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
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-10"
        result: "pass"
      -
        id: "recorded-check-11"
        result: "pass"
      -
        id: "recorded-check-12"
        result: "pass"
      -
        id: "recorded-check-13"
        result: "pass"
      -
        id: "recorded-check-14"
        result: "pass"
      -
        id: "recorded-check-15"
        result: "pass"
      -
        id: "recorded-check-16"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-5"
        result: "pass"
      -
        id: "recorded-check-6"
        result: "pass"
      -
        id: "recorded-check-7"
        result: "pass"
      -
        id: "recorded-check-8"
        result: "pass"
      -
        id: "recorded-check-9"
        result: "pass"
      -
        id: "verification-record"
        result: "pass"
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
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects:
          - "network_read"
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:e9a61d7e62039e1a5e7b9917ae01c1105a0566f4c1f8295be4843a01346f36f4"
      escalation_reasons: []
      execution_groups:
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
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-09-23T21:28:31.406Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-09-23T21:28:32.853Z"
doc_updated_by: "SUPERVISOR"
description: "Resolve issues #5941 and #5942 by making explicit hook runner recovery authoritative, rejecting unsafe mutable installed-runner coupling, and adding clean-consumer hook execution coverage."
sections:
  Summary: |-
    Decouple hook runner from mutable checkouts

    Resolve issues #5941 and #5942 by making explicit hook runner recovery authoritative, rejecting unsafe mutable installed-runner coupling, and adding clean-consumer hook execution coverage.
  Scope: |-
    - In scope: Resolve issues #5941 and #5942 by making explicit hook runner recovery authoritative, rejecting unsafe mutable installed-runner coupling, and adding clean-consumer hook execution coverage.
    - Out of scope: unrelated refactors not required for "Decouple hook runner from mutable checkouts".
  Plan: "1. Execute approved WorkItem decouple-hook-runner."
  Verify Steps: |-
    PLANNER fallback scaffold for "Decouple hook runner from mutable checkouts". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Decouple hook runner from mutable checkouts". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-23T21:28:31.406Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:4cc9f8591fd903fa9d5861c77e3c4e306ef9f4b728b98c672bc163d4977bb7bf, input_digest=sha256:e426de78fd5a4be961fa9e1b8ce63b33b794d8e9fe478894a5ceb8b1838d90cb

    Details:

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: bun test packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/cli/verify-global-install-script.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:fast
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: bun test packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/cli/verify-global-install-script.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:fast
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check critical_paths (4/4)

    Check: real_e2e
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check real_e2e (1/4)

    Check: real_e2e
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check real_e2e (2/4)

    Check: real_e2e
    Command: bun test packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/cli/verify-global-install-script.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check real_e2e (3/4)

    Check: real_e2e
    Command: bun run ci:local:fast
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check real_e2e (4/4)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: bun test packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/cli/verify-global-install-script.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:fast
    Result: pass
    Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609231941-2A8922 Verification Contract check task_outcome (4/4)

    NativeTaskIdentityRef:
    - plan_digest: sha256:2bd2be6806f15fffa0c307c85e81751466d880400c7de0a93c248c9c4eb144c9
    - policy_digest: sha256:1508520334b86880f4c7ebdff3696edff99bcc2f3bd0e31747a3b7da58bf1dd6
    - capability_digest: sha256:4a4812ed24300f9131c50f5884b6197b1a5d9a7a0abe2151da30aa90de4b8727
    - checks_digest: sha256:af499e9bbde70bdd747973f76031575646c4376aec168d187b8fee1189606047
    - identity_digest: sha256:529048aacbfd97340ed0a355ce19ffb481cfac9b5a01b091fbd4b15160f841ff

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  task_execution_context:
    base_ref: "main"
    base_sha: "0ab610897caaee7a44b28d18a02fbb2b24b5484b"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities: []
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:e2a91c6e6fe314b31022d5967e7e3b994f94ce415f904b366fbb47a9feffb4ee"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:2bd2be6806f15fffa0c307c85e81751466d880400c7de0a93c248c9c4eb144c9"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:68f221b7717acdbfbe042473c8fe52154c71350865b5c0a0583dd90ff38f4062"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
            repository_fingerprint: "sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots: []
            task_id: "202609231941-2A8922"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:68f221b7717acdbfbe042473c8fe52154c71350865b5c0a0583dd90ff38f4062"
        digest: "sha256:2bd2be6806f15fffa0c307c85e81751466d880400c7de0a93c248c9c4eb144c9"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:6684e26f7f96352314ab41d4e6972ea916cd355c79058585c265e8346ad44897"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects:
                - "network_read"
              repository_effects:
                - "repository_write"
                - "source_code"
              resources: []
              scope_roots: []
            expected_outputs:
              - "immutable-global-install"
              - "explicit-hook-recovery"
              - "verification-evidence"
            id: "decouple-hook-runner"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:6a0c5e3777704c3e532886748d4ef68569cecd572e7a6e573af935cd20a56692"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:0507c5498953d7d66dd9063587510a57dc6380b3b03194322187d3d5ea4be876"
          environment_digest: "sha256:af234293b60c2ab68f78971ba2a84387bb3ac8e632267b89f265445b20514825"
          implementation_identity: "sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
          toolchain_digest: "sha256:1fdb7b1f98d6d6944bda5a42483dccbb625fa53d9958f81cd98762ddfdf8bfe0"
        observed_at: "2026-09-23T21:17:43.007Z"
        status: "PASSED"
      id: "202609231941-2A8922"
      intent_digest: "sha256:1ffc29d9aaa8b0c4984a913af0a4625eb1b9d8b32d4b6e675bde7b74135d4669"
      migration_receipts: []
      mutation_receipts:
        capture:202609231941-2A8922:
          after_revision: 1
          aggregate_digest: "sha256:e58af975585ca37e30b9e9b2203ab56334c5bf7bccd2f3f2915471b5746841a8"
          before_revision: 0
          command_digest: "sha256:b2ad06a1abfb0f60ec7cf8689005d775a71b8e1df2df401931a80fdd1cfc74b3"
          effect_ids: []
          event_digests:
            - "sha256:328259067fa9ad05a422c0b93b7887f7360fb7be6b0f254ba116a8ae14127514"
          mutation_id: "capture:202609231941-2A8922"
        final-validation:sha256:6a0c5e3777704c3e532886748d4ef68569cecd572e7a6e573af935cd20a56692:16:
          after_revision: 17
          aggregate_digest: "sha256:081c5ba470f9c5c250acb630444ed161392adc052c77b2d8c09ecb0504428654"
          before_revision: 16
          command_digest: "sha256:8de92acad5a82b312f81807f061dc3a0c5619d60559014a0c3efa4ef3c1dfd54"
          effect_ids: []
          event_digests:
            - "sha256:f797fd9623c031de4936c3664aac1dac25435696cc06adb6a6c0f8c1e9b31c36"
          mutation_id: "final-validation:sha256:6a0c5e3777704c3e532886748d4ef68569cecd572e7a6e573af935cd20a56692:16"
        kernel_work_item_claim_required:sha256:d9f2f0b7bb11771b6993c2b946d3d4102e75f20015f847ad39ae5149677b029f:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71:
          after_revision: 5
          aggregate_digest: "sha256:f674e98f4cf2e6b4433a482de9cee66514ebe13d6ad5638fc7f19b568392b602"
          before_revision: 4
          command_digest: "sha256:e20b29b2cd800c6a9b7a203b8c0756e840e49a93db3e7882a675b8b301bb3172"
          effect_ids: []
          event_digests:
            - "sha256:0878f09fe4c80eafb0db34ccacece1176b440a6b719e400d06ce410f3bdc6a9a"
          mutation_id: "kernel_work_item_claim_required:sha256:d9f2f0b7bb11771b6993c2b946d3d4102e75f20015f847ad39ae5149677b029f:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
        kernel_work_item_execution_required:sha256:7cdc8cbb16559686863350ecbbe6a0d1a1bc059a31cd78fc704d66198ae23fc3:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71:
          after_revision: 6
          aggregate_digest: "sha256:345dd833b2ef094d0610cd9151bd81203cc5bc49609d0388258c456c77ce3b96"
          before_revision: 5
          command_digest: "sha256:6fb6954bd906da7bcf258996404554aa3444310484fd167baab5b4de07b9812b"
          effect_ids: []
          event_digests:
            - "sha256:517c4d486c57ceeb295b28bfa74a504adfc3692c72ea3e60ed8d7dce67d61f9c"
          mutation_id: "kernel_work_item_execution_required:sha256:7cdc8cbb16559686863350ecbbe6a0d1a1bc059a31cd78fc704d66198ae23fc3:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
        kernel_work_item_execution_required:sha256:b9e2a9c84c2c44075f866b19b8b8ee15bac6f167473cf674d3d3997d324aaa8f:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71:
          after_revision: 12
          aggregate_digest: "sha256:5878f657216d1668405c0b78569c4baa1280c755de1873b37ce1cac0795d400f"
          before_revision: 11
          command_digest: "sha256:f922c7706e38f1ad8cc890c8ea41a2ace8a680e2e9c4898ccb694c2d8958342e"
          effect_ids: []
          event_digests:
            - "sha256:895ef51b0e05f8acc54e1bbc5fe45311f294c401af3c8307ec799b95017424f7"
          mutation_id: "kernel_work_item_execution_required:sha256:b9e2a9c84c2c44075f866b19b8b8ee15bac6f167473cf674d3d3997d324aaa8f:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
        kernel_work_item_inspection_required:sha256:739effedc1cda946ee87de2e5a22911e535b8d98128d79676f1bd88cd1dd4e86:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71:
          after_revision: 14
          aggregate_digest: "sha256:601ba1d36d075594f3473575403528889b3f147336fc17138f678e3c67456efc"
          before_revision: 13
          command_digest: "sha256:bac44ea8e21d8ba2589bd5c5b721d6a4d39bb69518b0cff295e2ed6292611e04"
          effect_ids: []
          event_digests:
            - "sha256:270b8cada84ea7db3cbf5f5cbd557f8f73b1672f85cdf3af7f42c79960d5895e"
          mutation_id: "kernel_work_item_inspection_required:sha256:739effedc1cda946ee87de2e5a22911e535b8d98128d79676f1bd88cd1dd4e86:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
        kernel_work_item_inspection_required:sha256:75115a987dd227234fe352843b2990a521653c1a3ff000da9f2a1184d0133998:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71:
          after_revision: 8
          aggregate_digest: "sha256:11302044333fa092da28691c2e64d980c7638ce1ff0e10718cfab817e3dbfad6"
          before_revision: 7
          command_digest: "sha256:d5cd003f55c5b4394e1ea77f14d694940a0aa46d28595aada5fadbaad5139c4f"
          effect_ids: []
          event_digests:
            - "sha256:6603179b2ec487bd368c2c4f55b895dd8283c35a9602dfdf8db30e60604376f3"
          mutation_id: "kernel_work_item_inspection_required:sha256:75115a987dd227234fe352843b2990a521653c1a3ff000da9f2a1184d0133998:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
        kernel_work_item_materialization_required:sha256:a3708f74c72d996943b553354fe73111c0bfbf3dba30774e8b3a37e8063b2ae7:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71:
          after_revision: 4
          aggregate_digest: "sha256:c5ea8f3c1b37b6e0d1543fde6fabc49b82c846d831bc506927576ac603af07f2"
          before_revision: 3
          command_digest: "sha256:4f800385292cdb36697e25a0129d8038afc418e2819cadca184dad90615b5f78"
          effect_ids: []
          event_digests:
            - "sha256:710c019ff5d5d6d88402e1e4c0ac0b47b041a9048fa4ca20998eaa74f1d37daf"
          mutation_id: "kernel_work_item_materialization_required:sha256:a3708f74c72d996943b553354fe73111c0bfbf3dba30774e8b3a37e8063b2ae7:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
        kernel_work_item_rework_claim_required:sha256:7ba52b83d8c79404833784093f09943f36dcf996a7334b50fabc87d6084b84b9:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71:
          after_revision: 11
          aggregate_digest: "sha256:5c150af11f4652d368d36585d6890f335512f778e231527d9b767c3c657d6af2"
          before_revision: 10
          command_digest: "sha256:4341aa85b1bb9fdae6cb5cb96b4183cbbed068ed96c88b3630186036a2e8aefb"
          effect_ids: []
          event_digests:
            - "sha256:dd39842d3fd2013fdc44461ee0fcaebc11e50ea848b3ee5602f8778da078fd1a"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:7ba52b83d8c79404833784093f09943f36dcf996a7334b50fabc87d6084b84b9:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
        plan:sha256:2bd2be6806f15fffa0c307c85e81751466d880400c7de0a93c248c9c4eb144c9:
          after_revision: 2
          aggregate_digest: "sha256:c570990299c7aeae6bc3c86bad6043be8f3a924456adc1d7e1c2328421e78019"
          before_revision: 1
          command_digest: "sha256:242a3ea51a145e7f8339e78d11c44fbd7b4a06c429b32103fbdde82cd404c851"
          effect_ids: []
          event_digests:
            - "sha256:253b770cfa3cf45ea542ca91bd29c7ff6461ba2545e08f79ec78e7130b8c35b2"
          mutation_id: "plan:sha256:2bd2be6806f15fffa0c307c85e81751466d880400c7de0a93c248c9c4eb144c9"
        result:sha256:6a785624eeb62abae8f257e146b0118b723c815ad8cecf1fbfe6987e06e38f82:
          after_revision: 13
          aggregate_digest: "sha256:ac1a9354b513bb5662225153ee6e55085d2076fba98d6c0e5601e71b1d1630c2"
          before_revision: 12
          command_digest: "sha256:602639ea2de6450b82147206b7581253ad6fe47c1022a0b66ced559b67097d58"
          effect_ids: []
          event_digests:
            - "sha256:a7086ac43553b1a259581c62005e8edf05637a2ea62893cfa3a8359044c7505f"
          mutation_id: "result:sha256:6a785624eeb62abae8f257e146b0118b723c815ad8cecf1fbfe6987e06e38f82"
        result:sha256:c0397fd322820e5fd654068ec8ddd56b320994a35f0bafef79806c90d141f910:
          after_revision: 7
          aggregate_digest: "sha256:f117683726cd5ddae846d251deea607399e113559fe1b112890dfdedfd285a01"
          before_revision: 6
          command_digest: "sha256:a8919514fe2415fb0f9e84994638e5f66f63d4062687cf962533dc8c6bd2620f"
          effect_ids: []
          event_digests:
            - "sha256:ee45841ff416c505a58219dae63a4c9c6bca165f87fab7c6d037643818193ddf"
          mutation_id: "result:sha256:c0397fd322820e5fd654068ec8ddd56b320994a35f0bafef79806c90d141f910"
        sha256:a53777e313aa455dbc628519fedc99c0d1f25f2d757d6eaa9d503240924578a0:
          after_revision: 3
          aggregate_digest: "sha256:f8fd96c7f414f836689e5f0f89ce5b010d7b1944ecb2df4b5dcd4ef924f21889"
          before_revision: 2
          command_digest: "sha256:63c638e8eba1d35c136809a65d422c545a84c78f4b4d563aaebf752d0dab8574"
          effect_ids: []
          event_digests:
            - "sha256:798bdeeb2f3e0d08bb880cdff80dd4f47d39994967027155fa9d0e99f0b94c68"
          mutation_id: "sha256:a53777e313aa455dbc628519fedc99c0d1f25f2d757d6eaa9d503240924578a0"
        validation-resolution:sha256:034f5b57cb437ec6323611a18ddc90106a70feba6be1292170080905223b3916:
          after_revision: 16
          aggregate_digest: "sha256:1183c0229557475bf32964ad636183ab706bbddde55c9fcd76fcce407897bafb"
          before_revision: 15
          command_digest: "sha256:65db75a79e8a5307fbdf11e8f48739748bdd3e6a88cf97db867f621dc150469b"
          effect_ids: []
          event_digests:
            - "sha256:b71c04b18f82f0266228587524a2b8d11571216f51a44a80d257084153851b19"
          mutation_id: "validation-resolution:sha256:034f5b57cb437ec6323611a18ddc90106a70feba6be1292170080905223b3916"
        validation-resolution:sha256:70546654ec0b7489ddf0b756c91ac33dcf50647fd398cf5f0a4e432a0324de34:
          after_revision: 10
          aggregate_digest: "sha256:3578049a07bd6cc8e276f1a0933b1c89d417c28055238ea3d630c2c9a53af66d"
          before_revision: 9
          command_digest: "sha256:5fc3a82415cd4b8d32ed759bc08acafb7769c3f6b7b5b54f71bd91ac0b1f533e"
          effect_ids: []
          event_digests:
            - "sha256:e28127693c8ee74eb492dfe98ac4b71ba2f335f4a30f654c6098cdfe80617c95"
          mutation_id: "validation-resolution:sha256:70546654ec0b7489ddf0b756c91ac33dcf50647fd398cf5f0a4e432a0324de34"
        validation:sha256:457967d84170d9a0979bc85dd51109be3dcc30fae85457691ed324bc9e344e5d:
          after_revision: 15
          aggregate_digest: "sha256:d9d6161c26270b533c416138cb684a79a7858dc5d70fd9856e5de55ce7387f9c"
          before_revision: 14
          command_digest: "sha256:874e45df8ae9c4ab6d1fd08b55562fcdff4479a976de4db54bf7565f3c1e88e0"
          effect_ids: []
          event_digests:
            - "sha256:a1e8a3a557f1431d895cb72ec1b3b3d92c8802a4f78c4a3440bf93b584dc10a0"
          mutation_id: "validation:sha256:457967d84170d9a0979bc85dd51109be3dcc30fae85457691ed324bc9e344e5d"
        validation:sha256:c0397fd322820e5fd654068ec8ddd56b320994a35f0bafef79806c90d141f910:
          after_revision: 9
          aggregate_digest: "sha256:a216a8f8e88e2367eb969bec05ce4fa9505c7250124430aed35442e1aaac0e37"
          before_revision: 8
          command_digest: "sha256:b48cd4ab8feb93dbdc8b0841e5a8dceff8456318fc0d70750af4d865d9850b10"
          effect_ids: []
          event_digests:
            - "sha256:47d14039909e3e0b0a94c1e7f15b658aaeb7783827c3fd1543b4a88737993a7b"
          mutation_id: "validation:sha256:c0397fd322820e5fd654068ec8ddd56b320994a35f0bafef79806c90d141f910"
      plan_history: []
      revision: 17
      schema_version: 1
      state: "FINAL_VALIDATION"
      work_items:
        decouple-hook-runner:
          attempt: 2
          claim_id: "sha256:196b42783fd85c918711de7a6a1a9129bf3fc3446743cee150858f2e80b6d19a"
          definition:
            contract_digest: "sha256:6684e26f7f96352314ab41d4e6972ea916cd355c79058585c265e8346ad44897"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects:
                - "network_read"
              repository_effects:
                - "repository_write"
                - "source_code"
              resources: []
              scope_roots: []
            expected_outputs:
              - "immutable-global-install"
              - "explicit-hook-recovery"
              - "verification-evidence"
            id: "decouple-hook-runner"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:09d1a4a3ae9883e545aa3f48f6bb508823f231e770608bfb493eda49b3cbeaee"
              id: "immutable-global-install"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
              task_id: "202609231941-2A8922"
              work_item_id: "decouple-hook-runner"
            -
              attempt: 2
              digest: "sha256:43d6420c54bb5273da2490a356ae7f4ab84faf701a36bab95459380efd7acfc9"
              id: "explicit-hook-recovery"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
              task_id: "202609231941-2A8922"
              work_item_id: "decouple-hook-runner"
            -
              attempt: 2
              digest: "sha256:bc91a9ecc069f5d835e90c29b91006eba71fcf7ceb12c66bbd182f4ebee64402"
              id: "verification-evidence"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
              task_id: "202609231941-2A8922"
              work_item_id: "decouple-hook-runner"
          result_digest: "sha256:d254bfcb189e948c1f6a72b6fe5a9de203a7e603978e16713130b9792cd3b0d1"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:4ce830b6fd67f7b1f5b09f6f464e9f4fd6e03ecc46ced408ffc0f051ad848d39"
              - "sha256:c973792d2c38c6010583ba38748835ab537aaf4b0573c6fd9f4608805bec71c0"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:0507c5498953d7d66dd9063587510a57dc6380b3b03194322187d3d5ea4be876"
              environment_digest: "sha256:0b6e8928feb34f8dd6cd4f1c7e96adabddd63bffafd5bafbcb41c2186d27e8d8"
              implementation_identity: "sha256:d254bfcb189e948c1f6a72b6fe5a9de203a7e603978e16713130b9792cd3b0d1"
              toolchain_digest: "sha256:a0ee42b1cba7905d88b1510be74b48ec1d0ac21b6f282a81bfde91979f9179ad"
            observed_at: "2026-09-23T21:17:29.917Z"
            status: "PASSED"
    digest: "sha256:492bd5b8c66b5149459e9a458379c5b24c457f1074423df69381e3b2326e26da"
    documents:
      contracts:
        sha256:6684e26f7f96352314ab41d4e6972ea916cd355c79058585c265e8346ad44897:
          acceptance_criteria:
            - "An explicit AGENTPLANE_HOOK_RUNNER bypasses an incomplete repository-local runtime."
            - "The reinstall helper installs immutable copies of agentplane, core, and recipes and verification rejects checkout-coupled packages."
            - "Focused tests and an isolated tarball install pass."
          objective: "Decouple hook execution and the global CLI installation from mutable framework checkouts."
          role: "EXECUTOR"
          verification_commands:
            - "bun test packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/cli/verify-global-install-script.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts"
            - "bun run typecheck"
            - "bun run ci:local:fast"
      intent:
        context: "Resolve issues #5941 and #5942 by making explicit hook runner recovery authoritative, rejecting unsafe mutable installed-runner coupling, and adding clean-consumer hook execution coverage."
        objective: "Decouple hook runner from mutable checkouts"
    events:
      -
        command_digest: "sha256:b2ad06a1abfb0f60ec7cf8689005d775a71b8e1df2df401931a80fdd1cfc74b3"
        id: "capture:202609231941-2A8922:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609231941-2A8922"
        occurred_at: "2026-09-23T19:41:09.814Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609231941-2A8922"
        task_revision: 1
      -
        command_digest: "sha256:242a3ea51a145e7f8339e78d11c44fbd7b4a06c429b32103fbdde82cd404c851"
        id: "plan:sha256:2bd2be6806f15fffa0c307c85e81751466d880400c7de0a93c248c9c4eb144c9:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:2bd2be6806f15fffa0c307c85e81751466d880400c7de0a93c248c9c4eb144c9"
        occurred_at: "2026-09-23T19:59:34.826Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609231941-2A8922"
        task_revision: 2
      -
        command_digest: "sha256:63c638e8eba1d35c136809a65d422c545a84c78f4b4d563aaebf752d0dab8574"
        id: "sha256:a53777e313aa455dbc628519fedc99c0d1f25f2d757d6eaa9d503240924578a0:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:a53777e313aa455dbc628519fedc99c0d1f25f2d757d6eaa9d503240924578a0"
        occurred_at: "2026-09-23T19:59:37.859Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609231941-2A8922"
        task_revision: 3
      -
        command_digest: "sha256:4f800385292cdb36697e25a0129d8038afc418e2819cadca184dad90615b5f78"
        id: "kernel_work_item_materialization_required:sha256:a3708f74c72d996943b553354fe73111c0bfbf3dba30774e8b3a37e8063b2ae7:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a3708f74c72d996943b553354fe73111c0bfbf3dba30774e8b3a37e8063b2ae7:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
        occurred_at: "2026-09-23T19:59:49.832Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609231941-2A8922"
        task_revision: 4
      -
        command_digest: "sha256:e20b29b2cd800c6a9b7a203b8c0756e840e49a93db3e7882a675b8b301bb3172"
        id: "kernel_work_item_claim_required:sha256:d9f2f0b7bb11771b6993c2b946d3d4102e75f20015f847ad39ae5149677b029f:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d9f2f0b7bb11771b6993c2b946d3d4102e75f20015f847ad39ae5149677b029f:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
        occurred_at: "2026-09-23T19:59:55.412Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609231941-2A8922"
        task_revision: 5
      -
        command_digest: "sha256:6fb6954bd906da7bcf258996404554aa3444310484fd167baab5b4de07b9812b"
        id: "kernel_work_item_execution_required:sha256:7cdc8cbb16559686863350ecbbe6a0d1a1bc059a31cd78fc704d66198ae23fc3:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:7cdc8cbb16559686863350ecbbe6a0d1a1bc059a31cd78fc704d66198ae23fc3:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
        occurred_at: "2026-09-23T19:59:59.689Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609231941-2A8922"
        task_revision: 6
      -
        command_digest: "sha256:a8919514fe2415fb0f9e84994638e5f66f63d4062687cf962533dc8c6bd2620f"
        id: "result:sha256:c0397fd322820e5fd654068ec8ddd56b320994a35f0bafef79806c90d141f910:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:c0397fd322820e5fd654068ec8ddd56b320994a35f0bafef79806c90d141f910"
        occurred_at: "2026-09-23T21:00:11.326Z"
        payload_digest: "sha256:4d33d381c06e42c6da8e5b3ba4bfcb01dc326b6164f963fcbbda3c37ecb417bc"
        task_id: "202609231941-2A8922"
        task_revision: 7
      -
        command_digest: "sha256:d5cd003f55c5b4394e1ea77f14d694940a0aa46d28595aada5fadbaad5139c4f"
        id: "kernel_work_item_inspection_required:sha256:75115a987dd227234fe352843b2990a521653c1a3ff000da9f2a1184d0133998:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:75115a987dd227234fe352843b2990a521653c1a3ff000da9f2a1184d0133998:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
        occurred_at: "2026-09-23T21:00:16.878Z"
        payload_digest: "sha256:c53cf778255870672bee6c6fb158f072e8ec07580e66553e9f5a5fd1dab69ca6"
        task_id: "202609231941-2A8922"
        task_revision: 8
      -
        command_digest: "sha256:b48cd4ab8feb93dbdc8b0841e5a8dceff8456318fc0d70750af4d865d9850b10"
        id: "validation:sha256:c0397fd322820e5fd654068ec8ddd56b320994a35f0bafef79806c90d141f910:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:c0397fd322820e5fd654068ec8ddd56b320994a35f0bafef79806c90d141f910"
        occurred_at: "2026-09-23T21:00:37.569Z"
        payload_digest: "sha256:c3ec1d876d2c54764448fecc1ac255346cc37cd5fa74a6f67d1107af9be1a803"
        task_id: "202609231941-2A8922"
        task_revision: 9
      -
        command_digest: "sha256:5fc3a82415cd4b8d32ed759bc08acafb7769c3f6b7b5b54f71bd91ac0b1f533e"
        id: "validation-resolution:sha256:70546654ec0b7489ddf0b756c91ac33dcf50647fd398cf5f0a4e432a0324de34:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:70546654ec0b7489ddf0b756c91ac33dcf50647fd398cf5f0a4e432a0324de34"
        occurred_at: "2026-09-23T21:00:40.999Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202609231941-2A8922"
        task_revision: 10
      -
        command_digest: "sha256:4341aa85b1bb9fdae6cb5cb96b4183cbbed068ed96c88b3630186036a2e8aefb"
        id: "kernel_work_item_rework_claim_required:sha256:7ba52b83d8c79404833784093f09943f36dcf996a7334b50fabc87d6084b84b9:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:7ba52b83d8c79404833784093f09943f36dcf996a7334b50fabc87d6084b84b9:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
        occurred_at: "2026-09-23T21:00:47.353Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609231941-2A8922"
        task_revision: 11
      -
        command_digest: "sha256:f922c7706e38f1ad8cc890c8ea41a2ace8a680e2e9c4898ccb694c2d8958342e"
        id: "kernel_work_item_execution_required:sha256:b9e2a9c84c2c44075f866b19b8b8ee15bac6f167473cf674d3d3997d324aaa8f:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b9e2a9c84c2c44075f866b19b8b8ee15bac6f167473cf674d3d3997d324aaa8f:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
        occurred_at: "2026-09-23T21:00:53.814Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609231941-2A8922"
        task_revision: 12
      -
        command_digest: "sha256:602639ea2de6450b82147206b7581253ad6fe47c1022a0b66ced559b67097d58"
        id: "result:sha256:6a785624eeb62abae8f257e146b0118b723c815ad8cecf1fbfe6987e06e38f82:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:6a785624eeb62abae8f257e146b0118b723c815ad8cecf1fbfe6987e06e38f82"
        occurred_at: "2026-09-23T21:03:25.665Z"
        payload_digest: "sha256:2214120ad1a5e1c4b7674bdbd2a4b5a1cbcf9ebfe37aea8b8ccadb27d3eee601"
        task_id: "202609231941-2A8922"
        task_revision: 13
      -
        command_digest: "sha256:bac44ea8e21d8ba2589bd5c5b721d6a4d39bb69518b0cff295e2ed6292611e04"
        id: "kernel_work_item_inspection_required:sha256:739effedc1cda946ee87de2e5a22911e535b8d98128d79676f1bd88cd1dd4e86:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:739effedc1cda946ee87de2e5a22911e535b8d98128d79676f1bd88cd1dd4e86:sha256:d9cb3f5875c7d0574ae7c3a6a3004b5d6b668c0fdc3fe50d02498b9278185c71"
        occurred_at: "2026-09-23T21:03:32.690Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202609231941-2A8922"
        task_revision: 14
      -
        command_digest: "sha256:874e45df8ae9c4ab6d1fd08b55562fcdff4479a976de4db54bf7565f3c1e88e0"
        id: "validation:sha256:457967d84170d9a0979bc85dd51109be3dcc30fae85457691ed324bc9e344e5d:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:457967d84170d9a0979bc85dd51109be3dcc30fae85457691ed324bc9e344e5d"
        occurred_at: "2026-09-23T21:17:36.120Z"
        payload_digest: "sha256:43a52746fe1d98579ff85ddb184591f7f78f601544ff0fc20900514e17962df9"
        task_id: "202609231941-2A8922"
        task_revision: 15
      -
        command_digest: "sha256:65db75a79e8a5307fbdf11e8f48739748bdd3e6a88cf97db867f621dc150469b"
        id: "validation-resolution:sha256:034f5b57cb437ec6323611a18ddc90106a70feba6be1292170080905223b3916:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:034f5b57cb437ec6323611a18ddc90106a70feba6be1292170080905223b3916"
        occurred_at: "2026-09-23T21:17:38.849Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609231941-2A8922"
        task_revision: 16
      -
        command_digest: "sha256:8de92acad5a82b312f81807f061dc3a0c5619d60559014a0c3efa4ef3c1dfd54"
        id: "final-validation:sha256:6a0c5e3777704c3e532886748d4ef68569cecd572e7a6e573af935cd20a56692:16:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:6a0c5e3777704c3e532886748d4ef68569cecd572e7a6e573af935cd20a56692:16"
        occurred_at: "2026-09-23T21:28:24.873Z"
        payload_digest: "sha256:337e06d84312b19d1e0f727462ad460e979740ceb05e415258cb18f2a428dcb8"
        task_id: "202609231941-2A8922"
        task_revision: 17
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Decouple hook runner from mutable checkouts

Resolve issues #5941 and #5942 by making explicit hook runner recovery authoritative, rejecting unsafe mutable installed-runner coupling, and adding clean-consumer hook execution coverage.

## Scope

- In scope: Resolve issues #5941 and #5942 by making explicit hook runner recovery authoritative, rejecting unsafe mutable installed-runner coupling, and adding clean-consumer hook execution coverage.
- Out of scope: unrelated refactors not required for "Decouple hook runner from mutable checkouts".

## Plan

1. Execute approved WorkItem decouple-hook-runner.

## Verify Steps

PLANNER fallback scaffold for "Decouple hook runner from mutable checkouts". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Decouple hook runner from mutable checkouts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-23T21:28:31.406Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:4cc9f8591fd903fa9d5861c77e3c4e306ef9f4b728b98c672bc163d4977bb7bf, input_digest=sha256:e426de78fd5a4be961fa9e1b8ce63b33b794d8e9fe478894a5ceb8b1838d90cb

Details:

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609231941-2A8922 Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609231941-2A8922 Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: bun test packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/cli/verify-global-install-script.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609231941-2A8922 Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:fast
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609231941-2A8922 Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609231941-2A8922 Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609231941-2A8922 Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: bun test packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/cli/verify-global-install-script.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609231941-2A8922 Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:fast
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609231941-2A8922 Verification Contract check critical_paths (4/4)

Check: real_e2e
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609231941-2A8922 Verification Contract check real_e2e (1/4)

Check: real_e2e
Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609231941-2A8922 Verification Contract check real_e2e (2/4)

Check: real_e2e
Command: bun test packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/cli/verify-global-install-script.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609231941-2A8922 Verification Contract check real_e2e (3/4)

Check: real_e2e
Command: bun run ci:local:fast
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609231941-2A8922 Verification Contract check real_e2e (4/4)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609231941-2A8922 Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609231941-2A8922 Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: bun test packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts packages/agentplane/src/cli/verify-global-install-script.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609231941-2A8922 Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:fast
Result: pass
Evidence: .agentplane/tasks/202609231941-2A8922/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609231941-2A8922 Verification Contract check task_outcome (4/4)

NativeTaskIdentityRef:
- plan_digest: sha256:2bd2be6806f15fffa0c307c85e81751466d880400c7de0a93c248c9c4eb144c9
- policy_digest: sha256:1508520334b86880f4c7ebdff3696edff99bcc2f3bd0e31747a3b7da58bf1dd6
- capability_digest: sha256:4a4812ed24300f9131c50f5884b6197b1a5d9a7a0abe2151da30aa90de4b8727
- checks_digest: sha256:af499e9bbde70bdd747973f76031575646c4376aec168d187b8fee1189606047
- identity_digest: sha256:529048aacbfd97340ed0a355ce19ffb481cfac9b5a01b091fbd4b15160f841ff

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
