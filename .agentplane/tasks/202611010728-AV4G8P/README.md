---
id: "202611010728-AV4G8P"
title: "Retire stale writable semantic admissions before legacy quarantine"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "publish"
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts"
  - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-11-01T07:32:37.934Z"
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
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_security_boundary"
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
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    allowed_resources: []
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "schema"
      - "dependencies"
      - "ci"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
      - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
      - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
      - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
      - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_security_boundary"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
          - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
          - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:c6e97a9f3dd75cdea593a33203d85c21b47cd7940cb94153fe0b9029efa5f93e"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
        - "central_component:packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
        - "effect_public_api"
        - "effect_release_metadata"
        - "effect_security_boundary"
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
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-11-01T07:28:07.278Z"
doc_updated_by: "CODER"
description: "Implement a bounded public native operator recovery to revoke only stale writable external semantic admissions before revision-split quarantine. Initial approved application targets are Factory BPA49V,778NR2,G6MVKS,BCJRWK. Preserve exact Task/journal/WorkOrder/exchange/result beforeimages, old results and receipts; never execute old WorkItems or assign historical DONE/PASS/CANCELLED, and never classify an unknown effect applied/not_applied. Require exact current repository/source/policy/operation pins, missing original checkout and no external-effect authority or active execution lease. Use native retired exchange and journal CAS under the common execution fence, durable prepared/afterimage receipts and strict crash/duplicate/drift/tamper/concurrency refusal. Reuse existing native retirement primitives without weakening migration admission or runtime guards. Validate rollback cannot reactivate retired admission. No Factory application until this source task passes native mandatory checks, fresh independent EVALUATOR, protected canonical PR/merge and current CLI qualification. Keep existing branches/worktrees and all runtime data/credentials. User explicitly approved this extension and the all8 PR/merge/deploy outcome."
sections:
  Summary: |-
    Retire stale writable semantic admissions before legacy quarantine

    Implement a bounded public native operator recovery to revoke only stale writable external semantic admissions before revision-split quarantine. Initial approved application targets are Factory BPA49V,778NR2,G6MVKS,BCJRWK. Preserve exact Task/journal/WorkOrder/exchange/result beforeimages, old results and receipts; never execute old WorkItems or assign historical DONE/PASS/CANCELLED, and never classify an unknown effect applied/not_applied. Require exact current repository/source/policy/operation pins, missing original checkout and no external-effect authority or active execution lease. Use native retired exchange and journal CAS under the common execution fence, durable prepared/afterimage receipts and strict crash/duplicate/drift/tamper/concurrency refusal. Reuse existing native retirement primitives without weakening migration admission or runtime guards. Validate rollback cannot reactivate retired admission. No Factory application until this source task passes native mandatory checks, fresh independent EVALUATOR, protected canonical PR/merge and current CLI qualification. Keep existing branches/worktrees and all runtime data/credentials. User explicitly approved this extension and the all8 PR/merge/deploy outcome.
  Scope: |-
    - In scope: Implement a bounded public native operator recovery to revoke only stale writable external semantic admissions before revision-split quarantine. Initial approved application targets are Factory BPA49V,778NR2,G6MVKS,BCJRWK. Preserve exact Task/journal/WorkOrder/exchange/result beforeimages, old results and receipts; never execute old WorkItems or assign historical DONE/PASS/CANCELLED, and never classify an unknown effect applied/not_applied. Require exact current repository/source/policy/operation pins, missing original checkout and no external-effect authority or active execution lease. Use native retired exchange and journal CAS under the common execution fence, durable prepared/afterimage receipts and strict crash/duplicate/drift/tamper/concurrency refusal. Reuse existing native retirement primitives without weakening migration admission or runtime guards. Validate rollback cannot reactivate retired admission. No Factory application until this source task passes native mandatory checks, fresh independent EVALUATOR, protected canonical PR/merge and current CLI qualification. Keep existing branches/worktrees and all runtime data/credentials. User explicitly approved this extension and the all8 PR/merge/deploy outcome.
    - Out of scope: unrelated refactors not required for "Retire stale writable semantic admissions before legacy quarantine".
  Plan: "1. Execute approved WorkItem native-stale-admission-retirement."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    base_sha: "83408fc11bb53298034ecca47b23ff1f28d054dd"
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
            digest: "sha256:c8f2e7789d0822b36a2881aaf88af2c6b5e1c1645e622574cf7096b5c14bd57f"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:11ddab81d6756bb40ae2b7fa7f2dc8b31cf53c5b5fb160569978bcbc5637cebb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:0f48b50981361db07170678c2384aec2712a40ee4fc16d3c83e9fafabdcdbeb3"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
            task_id: "202611010728-AV4G8P"
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
            digest: "sha256:9785da4ff4aa52da822e9f8f1434c82c505c17ed61b0de304627fc833bf8b615"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:11ddab81d6756bb40ae2b7fa7f2dc8b31cf53c5b5fb160569978bcbc5637cebb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:0f48b50981361db07170678c2384aec2712a40ee4fc16d3c83e9fafabdcdbeb3"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:c8f2e7789d0822b36a2881aaf88af2c6b5e1c1645e622574cf7096b5c14bd57f"
            repository_effects:
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
            task_id: "202611010728-AV4G8P"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:688370f3e42a9d2b91a1ab81a85edec16263476f7b49a85711dcfdc39da1c2fc"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:0f48b50981361db07170678c2384aec2712a40ee4fc16d3c83e9fafabdcdbeb3"
        digest: "sha256:11ddab81d6756bb40ae2b7fa7f2dc8b31cf53c5b5fb160569978bcbc5637cebb"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:430513ee9535ee63ad9455b1e578b9a8eb23d72d81a4c2eee2bdd901e4aec36b"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "public_api"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
            expected_outputs:
              - "native-admission-retirement-source"
              - "native-admission-retirement-coverage"
            id: "native-stale-admission-retirement"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202611010728-AV4G8P"
      intent_digest: "sha256:20dbe443fff8e353e9c2493d23dac4360c54b2549bb5d04b787cab429afa4061"
      migration_receipts: []
      mutation_receipts:
        capture:202611010728-AV4G8P:
          after_revision: 1
          aggregate_digest: "sha256:c1c56c902adf824835f5d3847d301e049c2806df25c9bc13bc82bd71445ccf6b"
          before_revision: 0
          command_digest: "sha256:da2757c3061bd617c119fcc715565a2c65dced314edeeac4ab6d52645d1aef01"
          effect_ids: []
          event_digests:
            - "sha256:1ea0213614527ad9c883ce51316e0588748f8aa04eb92f7ec808020d7ba5df39"
          mutation_id: "capture:202611010728-AV4G8P"
        kernel_work_item_claim_required:sha256:7a8e85d7027fecdb0ebfb92aaf3a3d0b9485ff93405a9e6e5d9d5e1578338fc1:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:
          after_revision: 5
          aggregate_digest: "sha256:6234a17f2c4f88d2786c63c29972e3738e27914a2151ed72b1e1b6b80bf14a55"
          before_revision: 4
          command_digest: "sha256:cd33d2477067d3c35f9a03ed18028620f97329d20895f2cd0f102d337a8985cb"
          effect_ids: []
          event_digests:
            - "sha256:633c484bb1ba095105c2fbcbe9bfab0b02b9080fed58dd737edb341cf67126ef"
          mutation_id: "kernel_work_item_claim_required:sha256:7a8e85d7027fecdb0ebfb92aaf3a3d0b9485ff93405a9e6e5d9d5e1578338fc1:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        kernel_work_item_execution_required:sha256:2abf062cbb16c46f0bde155ac8d68a0ca1446869b079bbcb0df982168096b505:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62:
          after_revision: 7
          aggregate_digest: "sha256:5d47f207694253eb8559bb217d9a8b5f4a212198053c1810b4331c1fd415abd7"
          before_revision: 6
          command_digest: "sha256:918a56abd628d2f414c207ad96abdce73500a74a411288a619c97f0a223fa8ce"
          effect_ids: []
          event_digests:
            - "sha256:363bc754102f863a4d0c812ea4f73d879de256e80a42fc56a0f8600419f631ae"
          mutation_id: "kernel_work_item_execution_required:sha256:2abf062cbb16c46f0bde155ac8d68a0ca1446869b079bbcb0df982168096b505:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62"
        kernel_work_item_materialization_required:sha256:163c2bc55e4b61124d7040c1e80dc98aac99d3ce426e081779c97d048087e6b8:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:
          after_revision: 4
          aggregate_digest: "sha256:e595ce05218a0af239d81d0d292e5018f41bf874abb49472ab955cb705a94211"
          before_revision: 3
          command_digest: "sha256:73d5c40469108269df17371c79964526f2840b83b5de7e53df7f30f82d24d55b"
          effect_ids: []
          event_digests:
            - "sha256:9bae85917feacb8a01753af43c6857750473840c26ee23337dca68b30d4b94a9"
          mutation_id: "kernel_work_item_materialization_required:sha256:163c2bc55e4b61124d7040c1e80dc98aac99d3ce426e081779c97d048087e6b8:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        result:sha256:b08361acbe888c8123a97ee3479d11a96ad2305114707e466537ae9d3f290a3e:
          after_revision: 2
          aggregate_digest: "sha256:8459569805e5ce0637c142fd2ad3cc809530d5acd7012f352c500b4a1d4122a9"
          before_revision: 1
          command_digest: "sha256:5223333e60bd64f4ce9e98a35916a2573766293500e4c3e3a3d3053e642c7fa1"
          effect_ids: []
          event_digests:
            - "sha256:5b321fac888d460bc1870436a3cd510337f8abb53264a15213ec11278ffa666a"
          mutation_id: "result:sha256:b08361acbe888c8123a97ee3479d11a96ad2305114707e466537ae9d3f290a3e"
        sha256:becaed3eb4289dea29407a6e808fd690ac61a500ad309c4de9bb4696aef9b4e1:
          after_revision: 3
          aggregate_digest: "sha256:1acdc221751ffef1ec1ea3f3b83e62b8a0174a1612c21b194034d7bfd6bd35e5"
          before_revision: 2
          command_digest: "sha256:e666f345d4056f7d79842fd5c07ca8e66c1c2065de073366e5d1ae14b06b932f"
          effect_ids: []
          event_digests:
            - "sha256:31453e136284f03978b9cace11dc52f75af119733b262f3b40cfa3db1e8cf93e"
          mutation_id: "sha256:becaed3eb4289dea29407a6e808fd690ac61a500ad309c4de9bb4696aef9b4e1"
        sha256:d2b3cd8cc0fb281d6f56f50fa45fedec173153fa054d868120d8c2d0ce8f7c93:
          after_revision: 6
          aggregate_digest: "sha256:8f697024dbc9146aa2402d195396f603582485ba1377c13773de56ae800c4c1e"
          before_revision: 5
          command_digest: "sha256:d2efe53122df9af397b3403c6769536d5d78d71ad1af166d5eb2773c41d07f9c"
          effect_ids: []
          event_digests:
            - "sha256:dbb58b91d9619911323780d1c97103335ae092306cd3a5643da697efda8e91b7"
          mutation_id: "sha256:d2b3cd8cc0fb281d6f56f50fa45fedec173153fa054d868120d8c2d0ce8f7c93"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        native-stale-admission-retirement:
          attempt: 1
          claim_id: "sha256:547eb3f5e3ce5f091355d8fe832c4d5a059d46b09c36ab92b52fe2308458fe87"
          definition:
            contract_digest: "sha256:430513ee9535ee63ad9455b1e578b9a8eb23d72d81a4c2eee2bdd901e4aec36b"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "public_api"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
            expected_outputs:
              - "native-admission-retirement-source"
              - "native-admission-retirement-coverage"
            id: "native-stale-admission-retirement"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:9a5a231e4280aa4f52740f0c9de0cf3ef6015e56405545910a85e2cc80675588"
    documents:
      contracts:
        sha256:430513ee9535ee63ad9455b1e578b9a8eb23d72d81a4c2eee2bdd901e4aec36b:
          acceptance_criteria:
            - "Add one bounded public native operator preview/apply command for exact stale writable semantic admissions. Apply only when the caller confirms an exact native preview, the original checkout is absent, the Task is a genuine revision-split quarantine candidate, and repository/source/policy/operation/WorkOrder/exchange/result pins are fresh. Do not hardcode the four production Task IDs in source or tests."
            - "Require the original single latest EXECUTOR agent_episode intent, matching issued or result_received implementation(_rework) exchange and immutable WorkOrder identity. Refuse external-side-effect authority, effect_in_doubt, accepted/consumed or checkpointed exchanges, live owner checkouts and active execution leases. Keep all existing migration admission and runtime guards unchanged."
            - "Under the existing task execution fence, use the existing native state-drift intent retirement and journal CAS plus retired exchange acknowledgement. Revoke only future admission. Record unknown prior effects as unassessed; never use applied/not_applied for unknown effects or change historical Task/Plan/WorkItems/DONE/PASS/CANCELLED. Preserve genuine old results and WorkOrders."
            - "Write exact source, journal, WorkOrder, exchange and result-or-absence beforeimages in a protected contained native evidence directory before any mutation. Persist exact planned afterimages and a strict source/policy/operation-bound transaction identity. Interrupted replay must accept only the exact prepared before/afterimages, refuse foreign/partial/changed data, and reconcile once without replaying old work. Keep final receipts auditable and idempotent."
            - "Use stable no-follow contained reads and immutable native evidence writes. Reject traversal, directory or leaf symlinks, hard links, changed policy/source/owner/result/operation and active lease races. Support configured workflow/worktree directories and preserve unrelated paths."
            - "Verify real native quarantine admission and raw-byte rollback after retirement while the old exchange stays retired. Verify late returned results cannot be accepted, including the unanswered exchange case. Keep unknown outcome diagnostics and all exact beforeimages."
            - "Cover success and already-retired replay, no-result and genuine-result cases, every interruption boundary, no partial writes on refusal, tamper, foreign identity, external authority, source/policy/checkout drift, path safety and concurrent apply/active lease with meaningful unit/integration tests and the actual public CLI entrypoint. Preserve existing assertions, budgets and CI policy."
            - "Complete all three declared mandatory checks and fresh independent EVALUATOR on exact current source, then canonical protected PR/merge and current CLI qualification. Do not apply retirement or quarantine to actual Factory Tasks, run host effects, change credentials or claim SB deployment/live acceptance inside this source implementation episode. Preserve all old Tasks, source branches/worktrees, native journals/receipts, backups and user files."
          objective: "Implement and verify exact, recoverable native revocation of stale writable semantic admissions before legacy revision-split quarantine, preserving diagnostics and all guards."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
            - "bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
      intent:
        context: "Implement a bounded public native operator recovery to revoke only stale writable external semantic admissions before revision-split quarantine. Initial approved application targets are Factory BPA49V,778NR2,G6MVKS,BCJRWK. Preserve exact Task/journal/WorkOrder/exchange/result beforeimages, old results and receipts; never execute old WorkItems or assign historical DONE/PASS/CANCELLED, and never classify an unknown effect applied/not_applied. Require exact current repository/source/policy/operation pins, missing original checkout and no external-effect authority or active execution lease. Use native retired exchange and journal CAS under the common execution fence, durable prepared/afterimage receipts and strict crash/duplicate/drift/tamper/concurrency refusal. Reuse existing native retirement primitives without weakening migration admission or runtime guards. Validate rollback cannot reactivate retired admission. No Factory application until this source task passes native mandatory checks, fresh independent EVALUATOR, protected canonical PR/merge and current CLI qualification. Keep existing branches/worktrees and all runtime data/credentials. User explicitly approved this extension and the all8 PR/merge/deploy outcome."
        objective: "Retire stale writable semantic admissions before legacy quarantine"
    events:
      -
        command_digest: "sha256:da2757c3061bd617c119fcc715565a2c65dced314edeeac4ab6d52645d1aef01"
        id: "capture:202611010728-AV4G8P:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202611010728-AV4G8P"
        occurred_at: "2026-11-01T07:28:07.253Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202611010728-AV4G8P"
        task_revision: 1
      -
        command_digest: "sha256:5223333e60bd64f4ce9e98a35916a2573766293500e4c3e3a3d3053e642c7fa1"
        id: "result:sha256:b08361acbe888c8123a97ee3479d11a96ad2305114707e466537ae9d3f290a3e:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:b08361acbe888c8123a97ee3479d11a96ad2305114707e466537ae9d3f290a3e"
        occurred_at: "2026-11-01T07:31:35.597Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202611010728-AV4G8P"
        task_revision: 2
      -
        command_digest: "sha256:e666f345d4056f7d79842fd5c07ca8e66c1c2065de073366e5d1ae14b06b932f"
        id: "sha256:becaed3eb4289dea29407a6e808fd690ac61a500ad309c4de9bb4696aef9b4e1:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:becaed3eb4289dea29407a6e808fd690ac61a500ad309c4de9bb4696aef9b4e1"
        occurred_at: "2026-11-01T07:32:36.588Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202611010728-AV4G8P"
        task_revision: 3
      -
        command_digest: "sha256:73d5c40469108269df17371c79964526f2840b83b5de7e53df7f30f82d24d55b"
        id: "kernel_work_item_materialization_required:sha256:163c2bc55e4b61124d7040c1e80dc98aac99d3ce426e081779c97d048087e6b8:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:163c2bc55e4b61124d7040c1e80dc98aac99d3ce426e081779c97d048087e6b8:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        occurred_at: "2026-11-01T07:32:42.042Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202611010728-AV4G8P"
        task_revision: 4
      -
        command_digest: "sha256:cd33d2477067d3c35f9a03ed18028620f97329d20895f2cd0f102d337a8985cb"
        id: "kernel_work_item_claim_required:sha256:7a8e85d7027fecdb0ebfb92aaf3a3d0b9485ff93405a9e6e5d9d5e1578338fc1:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7a8e85d7027fecdb0ebfb92aaf3a3d0b9485ff93405a9e6e5d9d5e1578338fc1:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        occurred_at: "2026-11-01T07:32:47.587Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202611010728-AV4G8P"
        task_revision: 5
      -
        command_digest: "sha256:d2efe53122df9af397b3403c6769536d5d78d71ad1af166d5eb2773c41d07f9c"
        id: "sha256:d2b3cd8cc0fb281d6f56f50fa45fedec173153fa054d868120d8c2d0ce8f7c93:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:d2b3cd8cc0fb281d6f56f50fa45fedec173153fa054d868120d8c2d0ce8f7c93"
        occurred_at: "2026-11-01T07:36:52.192Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202611010728-AV4G8P"
        task_revision: 6
      -
        command_digest: "sha256:918a56abd628d2f414c207ad96abdce73500a74a411288a619c97f0a223fa8ce"
        id: "kernel_work_item_execution_required:sha256:2abf062cbb16c46f0bde155ac8d68a0ca1446869b079bbcb0df982168096b505:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:2abf062cbb16c46f0bde155ac8d68a0ca1446869b079bbcb0df982168096b505:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62"
        occurred_at: "2026-11-01T07:36:54.781Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202611010728-AV4G8P"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Retire stale writable semantic admissions before legacy quarantine

Implement a bounded public native operator recovery to revoke only stale writable external semantic admissions before revision-split quarantine. Initial approved application targets are Factory BPA49V,778NR2,G6MVKS,BCJRWK. Preserve exact Task/journal/WorkOrder/exchange/result beforeimages, old results and receipts; never execute old WorkItems or assign historical DONE/PASS/CANCELLED, and never classify an unknown effect applied/not_applied. Require exact current repository/source/policy/operation pins, missing original checkout and no external-effect authority or active execution lease. Use native retired exchange and journal CAS under the common execution fence, durable prepared/afterimage receipts and strict crash/duplicate/drift/tamper/concurrency refusal. Reuse existing native retirement primitives without weakening migration admission or runtime guards. Validate rollback cannot reactivate retired admission. No Factory application until this source task passes native mandatory checks, fresh independent EVALUATOR, protected canonical PR/merge and current CLI qualification. Keep existing branches/worktrees and all runtime data/credentials. User explicitly approved this extension and the all8 PR/merge/deploy outcome.

## Scope

- In scope: Implement a bounded public native operator recovery to revoke only stale writable external semantic admissions before revision-split quarantine. Initial approved application targets are Factory BPA49V,778NR2,G6MVKS,BCJRWK. Preserve exact Task/journal/WorkOrder/exchange/result beforeimages, old results and receipts; never execute old WorkItems or assign historical DONE/PASS/CANCELLED, and never classify an unknown effect applied/not_applied. Require exact current repository/source/policy/operation pins, missing original checkout and no external-effect authority or active execution lease. Use native retired exchange and journal CAS under the common execution fence, durable prepared/afterimage receipts and strict crash/duplicate/drift/tamper/concurrency refusal. Reuse existing native retirement primitives without weakening migration admission or runtime guards. Validate rollback cannot reactivate retired admission. No Factory application until this source task passes native mandatory checks, fresh independent EVALUATOR, protected canonical PR/merge and current CLI qualification. Keep existing branches/worktrees and all runtime data/credentials. User explicitly approved this extension and the all8 PR/merge/deploy outcome.
- Out of scope: unrelated refactors not required for "Retire stale writable semantic admissions before legacy quarantine".

## Plan

1. Execute approved WorkItem native-stale-admission-retirement.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
