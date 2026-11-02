---
id: "202611011514-52DTSZ"
title: "Publish approved stale-admission retirement with exact compatibility delta"
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
  updated_at: "2026-11-01T15:24:05.108Z"
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
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
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
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
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
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
          - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
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
      digest: "sha256:ccea5abd6b0f64b673259ac0b0fd18557cab1701b5eb19f25b31bcca57cfd6d5"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
        - "central_component:packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
        - "central_component:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "central_component:scripts/checks/check-compatibility-contract-baseline.test.mjs"
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
doc_updated_at: "2026-11-01T15:14:22.264Z"
doc_updated_by: "CODER"
description: "Publish and qualify the already USER-approved native stale writable admission retirement and its exact three-file compatibility delta as one fresh canonical code Task. The original immutable WorkItem scope must include exactly the nine approved retirement implementation/test/catalog/loader files and three approved candidate/checker/test files. Import only those twelve exact source blobs from retained native implementation69816aefa9c5f6e78d7e1ba801a60271726128f4 (source owner AV4G8P later headcc4a9b9cadbd295eb217f1d05a494cd8fbaee7c8 changes only native Task evidence). Preserve original source-task provenance and immutable v0.6.24 compatibility anchor; other six compatibility section digests and existing assertions stay unchanged. Retain original AV4G8P Kernel, Plan, exchanges, real PASS/failure/timeout records, branch, worktree and open PR6965 without promotion or rewriting. No new feature, broader source scope or lifecycle/verification guard exception is approved. Require unchanged original three native mandatory commands, exact compatibility tests/ratchet/candidate freshness, independent EVALUATOR, protected canonical PR/merge and current CLI qualification before any actual Factory retirement. Preserve all old Task data, branches/worktrees, archives, runtime data, credentials and guards. Never run historical WorkItems, assign historical DONE/PASS/CANCELLED or classify unknown effects. Factory and runtime effects are outside this source WorkItem. Serialize full native checks with VKPT8K. Existing explicit all8 implementation/publication/deployment authorization and exact three-file compatibility approval cover this unchanged twelve-file source scope."
sections:
  Summary: |-
    Publish approved stale-admission retirement with exact compatibility delta

    Publish and qualify the already USER-approved native stale writable admission retirement and its exact three-file compatibility delta as one fresh canonical code Task. The original immutable WorkItem scope must include exactly the nine approved retirement implementation/test/catalog/loader files and three approved candidate/checker/test files. Import only those twelve exact source blobs from retained native implementation69816aefa9c5f6e78d7e1ba801a60271726128f4 (source owner AV4G8P later headcc4a9b9cadbd295eb217f1d05a494cd8fbaee7c8 changes only native Task evidence). Preserve original source-task provenance and immutable v0.6.24 compatibility anchor; other six compatibility section digests and existing assertions stay unchanged. Retain original AV4G8P Kernel, Plan, exchanges, real PASS/failure/timeout records, branch, worktree and open PR6965 without promotion or rewriting. No new feature, broader source scope or lifecycle/verification guard exception is approved. Require unchanged original three native mandatory commands, exact compatibility tests/ratchet/candidate freshness, independent EVALUATOR, protected canonical PR/merge and current CLI qualification before any actual Factory retirement. Preserve all old Task data, branches/worktrees, archives, runtime data, credentials and guards. Never run historical WorkItems, assign historical DONE/PASS/CANCELLED or classify unknown effects. Factory and runtime effects are outside this source WorkItem. Serialize full native checks with VKPT8K. Existing explicit all8 implementation/publication/deployment authorization and exact three-file compatibility approval cover this unchanged twelve-file source scope.
  Scope: |-
    - In scope: Publish and qualify the already USER-approved native stale writable admission retirement and its exact three-file compatibility delta as one fresh canonical code Task. The original immutable WorkItem scope must include exactly the nine approved retirement implementation/test/catalog/loader files and three approved candidate/checker/test files. Import only those twelve exact source blobs from retained native implementation69816aefa9c5f6e78d7e1ba801a60271726128f4 (source owner AV4G8P later headcc4a9b9cadbd295eb217f1d05a494cd8fbaee7c8 changes only native Task evidence). Preserve original source-task provenance and immutable v0.6.24 compatibility anchor; other six compatibility section digests and existing assertions stay unchanged. Retain original AV4G8P Kernel, Plan, exchanges, real PASS/failure/timeout records, branch, worktree and open PR6965 without promotion or rewriting. No new feature, broader source scope or lifecycle/verification guard exception is approved. Require unchanged original three native mandatory commands, exact compatibility tests/ratchet/candidate freshness, independent EVALUATOR, protected canonical PR/merge and current CLI qualification before any actual Factory retirement. Preserve all old Task data, branches/worktrees, archives, runtime data, credentials and guards. Never run historical WorkItems, assign historical DONE/PASS/CANCELLED or classify unknown effects. Factory and runtime effects are outside this source WorkItem. Serialize full native checks with VKPT8K. Existing explicit all8 implementation/publication/deployment authorization and exact three-file compatibility approval cover this unchanged twelve-file source scope.
    - Out of scope: unrelated refactors not required for "Publish approved stale-admission retirement with exact compatibility delta".
  Plan: "1. Execute approved WorkItem retirement-with-reviewed-compatibility."
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
            digest: "sha256:f559c6e52deb985c8402dd42690449ee73a40016fbba9673a94c87239c7bb248"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:23fbf6e74f0ba0e52da5d8c1a3b8cfd7453efaa5935a9af571a20b72dce0f82d"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:b043fadbf38664a4d8e3b8974fb748566cbbde2e4622496dfd444139a0d62dbd"
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
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
            task_id: "202611011514-52DTSZ"
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
            digest: "sha256:22ec645c334912b22470bae26987c4cbe780a410b349160d675ae21e70b5eec2"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:23fbf6e74f0ba0e52da5d8c1a3b8cfd7453efaa5935a9af571a20b72dce0f82d"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:b043fadbf38664a4d8e3b8974fb748566cbbde2e4622496dfd444139a0d62dbd"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:f559c6e52deb985c8402dd42690449ee73a40016fbba9673a94c87239c7bb248"
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
              - "scripts/baselines/v0.7-compatibility-candidate.json"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
            task_id: "202611011514-52DTSZ"
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
            evidence_digest: "sha256:44486b1eb5e0a64d8b291bccbb74d156a484c774302de11efa9a5fd9e8f25074"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:b043fadbf38664a4d8e3b8974fb748566cbbde2e4622496dfd444139a0d62dbd"
        digest: "sha256:23fbf6e74f0ba0e52da5d8c1a3b8cfd7453efaa5935a9af571a20b72dce0f82d"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:31843b3bd1a5cb2ef4b3067f8b846b437947abe448c785018ec21b19245f0911"
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
                - "release_metadata"
                - "security_boundary"
              resources: []
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
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
            expected_outputs:
              - "retirement-contract-source"
              - "retirement-contract-coverage"
            id: "retirement-with-reviewed-compatibility"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202611011514-52DTSZ"
      intent_digest: "sha256:a19db5fe23feb29fc6cefd949a31845fdd3c4bc4bb6b24a244ca22152b6f0ead"
      migration_receipts: []
      mutation_receipts:
        capture:202611011514-52DTSZ:
          after_revision: 1
          aggregate_digest: "sha256:62944e88c0d3b5f7a8ea7bbec814e0b1a1b438563d874cee9383ee9c7d4bc02d"
          before_revision: 0
          command_digest: "sha256:bef7800f4c5b92bc8cc7a536dfc46bb5e2ca2ca6d476e912edfd78f6046cc611"
          effect_ids: []
          event_digests:
            - "sha256:552081e507d68cdcf450f0e7bd81aecd0450e26d4368d76302230c2a32a51901"
          mutation_id: "capture:202611011514-52DTSZ"
        kernel_work_item_claim_required:sha256:21451ff2ea911db6128fd193e6bad3fba0caec3d8005f32daed678bc7dd2e3eb:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:
          after_revision: 5
          aggregate_digest: "sha256:5e29ed386a4df082b0f5acf16b7260707a0eea0ad81b525baa5c3f5e6a676fd3"
          before_revision: 4
          command_digest: "sha256:77d8bd060a07cb43ddc17ded500d3b57f8ca71d665e6157135200e2c8f121515"
          effect_ids: []
          event_digests:
            - "sha256:9b67f47f337fdb910636289f799207ced72cb60745deffc1e4abf6fe863a8f67"
          mutation_id: "kernel_work_item_claim_required:sha256:21451ff2ea911db6128fd193e6bad3fba0caec3d8005f32daed678bc7dd2e3eb:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        kernel_work_item_execution_required:sha256:be80f872c3e25ed71770915e0f4d8879000983e1bb998ae37a41260f53df63b7:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62:
          after_revision: 7
          aggregate_digest: "sha256:87f80045ee79af270b230fa6c0463e25855299e8bd8542eecda224c5f4ce17c3"
          before_revision: 6
          command_digest: "sha256:d0ddc6440d0bf596b05f9b5c9d5c2c8657732871bc84e5ef5a9ac2047b7bcaa7"
          effect_ids: []
          event_digests:
            - "sha256:7b677a1819554b545d814659930ecec528eb8869c009195df0881e1aabe2719d"
          mutation_id: "kernel_work_item_execution_required:sha256:be80f872c3e25ed71770915e0f4d8879000983e1bb998ae37a41260f53df63b7:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62"
        kernel_work_item_materialization_required:sha256:bdcd2d876c2fdac9e4fff68c2760bd4e61bbbff7fd52b85fdd9b0c5a9a3b5e20:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:
          after_revision: 4
          aggregate_digest: "sha256:731bc8e5eda9108984892584364a4e816b133c4532b5a90b8d328c121db05030"
          before_revision: 3
          command_digest: "sha256:192e2d11bbdf2e5716378bbf9f38537ec87419ff6011b538f01bc6bc1a878e63"
          effect_ids: []
          event_digests:
            - "sha256:f8df1e6fbeed9c523147892e7dd274fdfa670df4ea666859a36d126b1e6ae537"
          mutation_id: "kernel_work_item_materialization_required:sha256:bdcd2d876c2fdac9e4fff68c2760bd4e61bbbff7fd52b85fdd9b0c5a9a3b5e20:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        result:sha256:c2b0f725106107d464906d857b238d743b07e448372d9129dbc9023766bddd87:
          after_revision: 2
          aggregate_digest: "sha256:5aeb626efcb2f8045baff2753bb8732dff6e6b4f8bcba786b4f7cb41285f3a71"
          before_revision: 1
          command_digest: "sha256:2fab7f9a23f99fd772efbcf970a72a1fecdd39e167ed5b30b0997633862dace2"
          effect_ids: []
          event_digests:
            - "sha256:f8f1be29dc59940c372e4bd08e3d9df9c37b2ec347e5218f45f1450885369c04"
          mutation_id: "result:sha256:c2b0f725106107d464906d857b238d743b07e448372d9129dbc9023766bddd87"
        sha256:140f2475d3539caac933de340d3213a6e19b54a71489087a0f5ec4572b1a2f99:
          after_revision: 6
          aggregate_digest: "sha256:137e32a953a6039fd88a20b05a86d0a0890b6a6a5e77977f297cd533ee30757d"
          before_revision: 5
          command_digest: "sha256:9351074e5f692bbfd554a3712a080b512ca8ca03f0d9c8e889ff3442d6c36cce"
          effect_ids: []
          event_digests:
            - "sha256:553a2aeb017bf2f36a94ebac5c78d7437540a33cbfd760a793e0e6f6a1608d50"
          mutation_id: "sha256:140f2475d3539caac933de340d3213a6e19b54a71489087a0f5ec4572b1a2f99"
        sha256:6bd1880375e2fda024e083dd1ed1e15f9a4f0f7a96a29d1016175cf63b9274a7:
          after_revision: 3
          aggregate_digest: "sha256:5f6b3c1b2d37b44c80c3e2c044cf729c3f256379f4900a40a8bf4f4a1072d5f6"
          before_revision: 2
          command_digest: "sha256:94853d9c045332687983fb55217641e08c99ec657592a9aac2b34ca573d6dbaa"
          effect_ids: []
          event_digests:
            - "sha256:6413991901df7702bed636b4b35e2b03abd2433b6832df7edda10021c0e225e3"
          mutation_id: "sha256:6bd1880375e2fda024e083dd1ed1e15f9a4f0f7a96a29d1016175cf63b9274a7"
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        retirement-with-reviewed-compatibility:
          attempt: 1
          claim_id: "sha256:badb13e795a16e70ae2d2e3c5544b29a775eb05dc07c43b992f232f91eba4a8c"
          definition:
            contract_digest: "sha256:31843b3bd1a5cb2ef4b3067f8b846b437947abe448c785018ec21b19245f0911"
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
                - "release_metadata"
                - "security_boundary"
              resources: []
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
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "scripts/checks/check-compatibility-contract-baseline.test.mjs"
            expected_outputs:
              - "retirement-contract-source"
              - "retirement-contract-coverage"
            id: "retirement-with-reviewed-compatibility"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:803840e18f3e447372d0e6a546c7fde6183064df354bdf8287410b6972658c2f"
    documents:
      contracts:
        sha256:31843b3bd1a5cb2ef4b3067f8b846b437947abe448c785018ec21b19245f0911:
          acceptance_criteria:
            - "Start from canonical main83408fc11bb53298034ecca47b23ff1f28d054dd. Import exactly the twelve already approved source files from retained native implementation69816aefa9c5f6e78d7e1ba801a60271726128f4. Prove each imported file matches its source SHA256 in preflight911. Do not import foreign Task metadata, change source-task attribution or add functionality, dependencies, schemas, workflows, version tags or guard exceptions."
            - "Preserve the qualified retirement behavior: exact strict preview/apply bindings, missing original checkout, no live lease or external-effect authority, exact immutable beforeimages, exchange retirement before journal CAS, immutable receipt and crash/drift/concurrency refusal. Historical WorkItems, results and Task bytes are not executed or promoted. Unknown prior effects stay unassessed. Do not apply the command to Factory in this source WorkItem."
            - "Preserve the exact reviewed compatibility delta for task retire-admission and apply/request/yes. Keep the immutable v0.6.24 anchor, original assertions, original AV4G8P source provenance and all other six section digests unchanged. Run node --test scripts/checks/check-compatibility-contract-baseline.test.mjs, bun run bench:compatibility:check and bun run bench:compatibility:candidate:check on the resulting source and retain actual outcomes."
            - "Declare all twelve file roots in this original WorkItem contract. Keep the unchanged original three blocking native verification commands. Verify source boundaries, one-byte and stale-admission recovery guards, immutable diagnostics, strict negative cases and public Node CLI behavior using the existing tests. Never waive an observed failure, skip a mandatory check or increase acceptance timeouts."
            - "Retain original AV4G8P Kernel/Plan, worktree, branch, PR6965, genuine PASS and failed timeout records, exchanges and source beforeimages. Preserve every existing primary checkout file and unrelated user artifact. Native Task/protected metadata is modified only by AgentPlane."
            - "Return source-byte and coverage reports with honest verification bounds. The source WorkItem has no external-write, credential, Factory, deployment, runtime or destructive-Git authority. Serialize every full CI with VKPT8K and keep qualified canonical controller/runtime stable during verification and EVALUATOR."
            - "Complete fresh independent EVALUATOR, stable hosted checks, protected canonical PR/merge and current canonical CLI qualification through native lifecycle before actual Factory retirement or deployment. Source-task completion is not sb live acceptance. Preserve data, credentials, runtime guards, old archives and every old branch/worktree."
          objective: "Publish the exact already approved native retirement and reviewed compatibility sources in one immutable twelve-file WorkItem, preserving every existing guard and diagnostic."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
            - "bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
      intent:
        context: "Publish and qualify the already USER-approved native stale writable admission retirement and its exact three-file compatibility delta as one fresh canonical code Task. The original immutable WorkItem scope must include exactly the nine approved retirement implementation/test/catalog/loader files and three approved candidate/checker/test files. Import only those twelve exact source blobs from retained native implementation69816aefa9c5f6e78d7e1ba801a60271726128f4 (source owner AV4G8P later headcc4a9b9cadbd295eb217f1d05a494cd8fbaee7c8 changes only native Task evidence). Preserve original source-task provenance and immutable v0.6.24 compatibility anchor; other six compatibility section digests and existing assertions stay unchanged. Retain original AV4G8P Kernel, Plan, exchanges, real PASS/failure/timeout records, branch, worktree and open PR6965 without promotion or rewriting. No new feature, broader source scope or lifecycle/verification guard exception is approved. Require unchanged original three native mandatory commands, exact compatibility tests/ratchet/candidate freshness, independent EVALUATOR, protected canonical PR/merge and current CLI qualification before any actual Factory retirement. Preserve all old Task data, branches/worktrees, archives, runtime data, credentials and guards. Never run historical WorkItems, assign historical DONE/PASS/CANCELLED or classify unknown effects. Factory and runtime effects are outside this source WorkItem. Serialize full native checks with VKPT8K. Existing explicit all8 implementation/publication/deployment authorization and exact three-file compatibility approval cover this unchanged twelve-file source scope."
        objective: "Publish approved stale-admission retirement with exact compatibility delta"
    events:
      -
        command_digest: "sha256:bef7800f4c5b92bc8cc7a536dfc46bb5e2ca2ca6d476e912edfd78f6046cc611"
        id: "capture:202611011514-52DTSZ:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202611011514-52DTSZ"
        occurred_at: "2026-11-01T15:14:22.206Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202611011514-52DTSZ"
        task_revision: 1
      -
        command_digest: "sha256:2fab7f9a23f99fd772efbcf970a72a1fecdd39e167ed5b30b0997633862dace2"
        id: "result:sha256:c2b0f725106107d464906d857b238d743b07e448372d9129dbc9023766bddd87:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:c2b0f725106107d464906d857b238d743b07e448372d9129dbc9023766bddd87"
        occurred_at: "2026-11-01T15:19:11.743Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202611011514-52DTSZ"
        task_revision: 2
      -
        command_digest: "sha256:94853d9c045332687983fb55217641e08c99ec657592a9aac2b34ca573d6dbaa"
        id: "sha256:6bd1880375e2fda024e083dd1ed1e15f9a4f0f7a96a29d1016175cf63b9274a7:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:6bd1880375e2fda024e083dd1ed1e15f9a4f0f7a96a29d1016175cf63b9274a7"
        occurred_at: "2026-11-01T15:23:41.515Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202611011514-52DTSZ"
        task_revision: 3
      -
        command_digest: "sha256:192e2d11bbdf2e5716378bbf9f38537ec87419ff6011b538f01bc6bc1a878e63"
        id: "kernel_work_item_materialization_required:sha256:bdcd2d876c2fdac9e4fff68c2760bd4e61bbbff7fd52b85fdd9b0c5a9a3b5e20:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:bdcd2d876c2fdac9e4fff68c2760bd4e61bbbff7fd52b85fdd9b0c5a9a3b5e20:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        occurred_at: "2026-11-01T15:25:39.651Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202611011514-52DTSZ"
        task_revision: 4
      -
        command_digest: "sha256:77d8bd060a07cb43ddc17ded500d3b57f8ca71d665e6157135200e2c8f121515"
        id: "kernel_work_item_claim_required:sha256:21451ff2ea911db6128fd193e6bad3fba0caec3d8005f32daed678bc7dd2e3eb:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:21451ff2ea911db6128fd193e6bad3fba0caec3d8005f32daed678bc7dd2e3eb:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        occurred_at: "2026-11-01T15:27:48.699Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202611011514-52DTSZ"
        task_revision: 5
      -
        command_digest: "sha256:9351074e5f692bbfd554a3712a080b512ca8ca03f0d9c8e889ff3442d6c36cce"
        id: "sha256:140f2475d3539caac933de340d3213a6e19b54a71489087a0f5ec4572b1a2f99:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:140f2475d3539caac933de340d3213a6e19b54a71489087a0f5ec4572b1a2f99"
        occurred_at: "2026-11-01T15:38:17.561Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202611011514-52DTSZ"
        task_revision: 6
      -
        command_digest: "sha256:d0ddc6440d0bf596b05f9b5c9d5c2c8657732871bc84e5ef5a9ac2047b7bcaa7"
        id: "kernel_work_item_execution_required:sha256:be80f872c3e25ed71770915e0f4d8879000983e1bb998ae37a41260f53df63b7:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:be80f872c3e25ed71770915e0f4d8879000983e1bb998ae37a41260f53df63b7:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62"
        occurred_at: "2026-11-01T15:40:04.022Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202611011514-52DTSZ"
        task_revision: 7
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Publish approved stale-admission retirement with exact compatibility delta

Publish and qualify the already USER-approved native stale writable admission retirement and its exact three-file compatibility delta as one fresh canonical code Task. The original immutable WorkItem scope must include exactly the nine approved retirement implementation/test/catalog/loader files and three approved candidate/checker/test files. Import only those twelve exact source blobs from retained native implementation69816aefa9c5f6e78d7e1ba801a60271726128f4 (source owner AV4G8P later headcc4a9b9cadbd295eb217f1d05a494cd8fbaee7c8 changes only native Task evidence). Preserve original source-task provenance and immutable v0.6.24 compatibility anchor; other six compatibility section digests and existing assertions stay unchanged. Retain original AV4G8P Kernel, Plan, exchanges, real PASS/failure/timeout records, branch, worktree and open PR6965 without promotion or rewriting. No new feature, broader source scope or lifecycle/verification guard exception is approved. Require unchanged original three native mandatory commands, exact compatibility tests/ratchet/candidate freshness, independent EVALUATOR, protected canonical PR/merge and current CLI qualification before any actual Factory retirement. Preserve all old Task data, branches/worktrees, archives, runtime data, credentials and guards. Never run historical WorkItems, assign historical DONE/PASS/CANCELLED or classify unknown effects. Factory and runtime effects are outside this source WorkItem. Serialize full native checks with VKPT8K. Existing explicit all8 implementation/publication/deployment authorization and exact three-file compatibility approval cover this unchanged twelve-file source scope.

## Scope

- In scope: Publish and qualify the already USER-approved native stale writable admission retirement and its exact three-file compatibility delta as one fresh canonical code Task. The original immutable WorkItem scope must include exactly the nine approved retirement implementation/test/catalog/loader files and three approved candidate/checker/test files. Import only those twelve exact source blobs from retained native implementation69816aefa9c5f6e78d7e1ba801a60271726128f4 (source owner AV4G8P later headcc4a9b9cadbd295eb217f1d05a494cd8fbaee7c8 changes only native Task evidence). Preserve original source-task provenance and immutable v0.6.24 compatibility anchor; other six compatibility section digests and existing assertions stay unchanged. Retain original AV4G8P Kernel, Plan, exchanges, real PASS/failure/timeout records, branch, worktree and open PR6965 without promotion or rewriting. No new feature, broader source scope or lifecycle/verification guard exception is approved. Require unchanged original three native mandatory commands, exact compatibility tests/ratchet/candidate freshness, independent EVALUATOR, protected canonical PR/merge and current CLI qualification before any actual Factory retirement. Preserve all old Task data, branches/worktrees, archives, runtime data, credentials and guards. Never run historical WorkItems, assign historical DONE/PASS/CANCELLED or classify unknown effects. Factory and runtime effects are outside this source WorkItem. Serialize full native checks with VKPT8K. Existing explicit all8 implementation/publication/deployment authorization and exact three-file compatibility approval cover this unchanged twelve-file source scope.
- Out of scope: unrelated refactors not required for "Publish approved stale-admission retirement with exact compatibility delta".

## Plan

1. Execute approved WorkItem retirement-with-reviewed-compatibility.

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
