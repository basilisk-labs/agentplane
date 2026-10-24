---
id: "202610241027-XK8HYS"
title: "Align branch work-start integration fixtures with frozen base and framework ownership"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "regression"
  - "release"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-24T10:29:58.215Z"
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
      - "."
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
      - "."
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
          - "."
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
      digest: "sha256:0b8851196ccfc740a062e7234aa038463719dba236350399820ef0e279687721"
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
doc_updated_at: "2026-10-24T10:28:20.058Z"
doc_updated_by: "CODER"
description: "Correct three pre-bump release CI assertions: an authenticated frozen task base remains valid after upstream advances; a consumer worktree receives no framework runtime; framework bootstrap fixtures declare real package ownership before expecting local runtime assets."
sections:
  Summary: |-
    Align branch work-start integration fixtures with frozen base and framework ownership

    Correct three pre-bump release CI assertions: an authenticated frozen task base remains valid after upstream advances; a consumer worktree receives no framework runtime; framework bootstrap fixtures declare real package ownership before expecting local runtime assets.
  Scope: |-
    - In scope: Correct three pre-bump release CI assertions: an authenticated frozen task base remains valid after upstream advances; a consumer worktree receives no framework runtime; framework bootstrap fixtures declare real package ownership before expecting local runtime assets.
    - Out of scope: unrelated refactors not required for "Align branch work-start integration fixtures with frozen base and framework ownership".
  Plan: "1. Execute approved WorkItem correct-work-start-fixtures."
  Verify Steps: |-
    PLANNER fallback scaffold for "Align branch work-start integration fixtures with frozen base and framework ownership". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Align branch work-start integration fixtures with frozen base and framework ownership". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "5a1c1dda6693966e934193a8ec05a3604648cf3e"
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
            digest: "sha256:1a9cf4c942540aad293ca08dea89e118946a27f28cabfa028cfc05e13538f43b"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:2e121b1823bc17d14a9ade5e82fffc32f28d61644962649108eefbd685f7e962"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:898a95c408f5b5a468049f9fa0035ebd02de6904252af467b3f1d15c24423daa"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "."
            task_id: "202610241027-XK8HYS"
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
        approval_evidence_digest: "sha256:898a95c408f5b5a468049f9fa0035ebd02de6904252af467b3f1d15c24423daa"
        digest: "sha256:2e121b1823bc17d14a9ade5e82fffc32f28d61644962649108eefbd685f7e962"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:7f1598b083f517e729fed3130d5ea738db3231b752837d092d2cdff9350dd110"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
            expected_outputs:
              - "work-start-fixtures-corrected"
            id: "correct-work-start-fixtures"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610241027-XK8HYS"
      intent_digest: "sha256:8f5175a2dee1b42e87ccfe15be144be1694f87c38e0687d998def2bee7ea0c21"
      migration_receipts: []
      mutation_receipts:
        capture:202610241027-XK8HYS:
          after_revision: 1
          aggregate_digest: "sha256:b8ce0320c1c2e4c58552c3e8f7485513ff4778b49c6c1e56c574e5a5b1492b83"
          before_revision: 0
          command_digest: "sha256:9af26ef6d61a1a9091bb8a37deab01613ff8fc18f6f93455ce1b8f6a2b3bebb7"
          effect_ids: []
          event_digests:
            - "sha256:74c22db0e8986308d6861289be46a0bec4d36b18aedf6c888663456e06d41a0f"
          mutation_id: "capture:202610241027-XK8HYS"
        kernel_work_item_claim_required:sha256:d4ac0e1e6888cf4260e5b11021902bbd27ad2ee2015a77e5a8c41d1e1b2e6c38:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d:
          after_revision: 5
          aggregate_digest: "sha256:a1581ca5b5fa288f794a09947f5605bc65dac62ec30cf2534e412f01f6e6f8fb"
          before_revision: 4
          command_digest: "sha256:e87d95763cc730c35a56ad10486b75c61bd252235fc44ac6e5fee9ff52a5262e"
          effect_ids: []
          event_digests:
            - "sha256:1152afd2df58437158ce7fa64493ded0912508e1b6ff4d31ddaa318616ae4495"
          mutation_id: "kernel_work_item_claim_required:sha256:d4ac0e1e6888cf4260e5b11021902bbd27ad2ee2015a77e5a8c41d1e1b2e6c38:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d"
        kernel_work_item_execution_required:sha256:79699089d75bbc21f8985a70a1b1214700c43266788e66aeb7cc4d04660ea871:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d:
          after_revision: 6
          aggregate_digest: "sha256:11df68c7f39d8fbef1c58065b59854dafc4ff2bbe25abf3546ce148a963cd3e7"
          before_revision: 5
          command_digest: "sha256:e42f607ef4d5599a8992b866177ead81c1a74e16cabf46c2df194d5f55a3248a"
          effect_ids: []
          event_digests:
            - "sha256:a006676c9a62faecaff9f4b78da7a76840a2d35b5e9a2677d9ccdc37050feedd"
          mutation_id: "kernel_work_item_execution_required:sha256:79699089d75bbc21f8985a70a1b1214700c43266788e66aeb7cc4d04660ea871:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d"
        kernel_work_item_materialization_required:sha256:444d6572ba606216106c5e419a9b75d382be69b2bd68b84aa2ac98c6339b4e4e:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d:
          after_revision: 4
          aggregate_digest: "sha256:0e12868601f286af018c1dee48dbe71df46979631de3150ffc84d6e6ad4b1942"
          before_revision: 3
          command_digest: "sha256:f41ecd0b1a4986709cd4de844a4354c6015d23fc997722ebf5f710e38d5ee160"
          effect_ids: []
          event_digests:
            - "sha256:fa3275996c8c801584d8e1509fc6332d8c6a2c4e63114a8a8d4b6d9e01ca23b1"
          mutation_id: "kernel_work_item_materialization_required:sha256:444d6572ba606216106c5e419a9b75d382be69b2bd68b84aa2ac98c6339b4e4e:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d"
        result:sha256:80f772144362653198e3c8e22bd7a86bfa936cd950ea4c47832e21c4b2c4e00e:
          after_revision: 2
          aggregate_digest: "sha256:bad7e007d0a1de182d069effab05f2c89be5d4af5b98c8a1c12e3578324901d4"
          before_revision: 1
          command_digest: "sha256:b92b975bdd856bc71fc18cd9c55fa868390f4c83f6377cb2fcf32b9862be643a"
          effect_ids: []
          event_digests:
            - "sha256:5dbd4cb420ae7604fd68913cf5efa91568e269fd8d16edb62665a33c81c54d7b"
          mutation_id: "result:sha256:80f772144362653198e3c8e22bd7a86bfa936cd950ea4c47832e21c4b2c4e00e"
        sha256:25d3cee8f72c54e3df582197ffb9e06c567dc4aebdc7d579f8f27a79bf780452:
          after_revision: 3
          aggregate_digest: "sha256:072bc33d2f0816ec181327276f6948fe102835ba450e5f25a7656436d3b8d8a8"
          before_revision: 2
          command_digest: "sha256:320c24a289c6fb275cd83c1c91b77878dd2a4343d3de7a1efd88aef63350f7d0"
          effect_ids: []
          event_digests:
            - "sha256:9435ae075ce20b8489c73146a0c15626a6b119775e0bfd7253ce3f2ee15fb1e4"
          mutation_id: "sha256:25d3cee8f72c54e3df582197ffb9e06c567dc4aebdc7d579f8f27a79bf780452"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        correct-work-start-fixtures:
          attempt: 1
          claim_id: "sha256:fbe46b7967027f9eb699cc8b2c05567b16abc6ab865be87d1806701fb082cb5c"
          definition:
            contract_digest: "sha256:7f1598b083f517e729fed3130d5ea738db3231b752837d092d2cdff9350dd110"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
            expected_outputs:
              - "work-start-fixtures-corrected"
            id: "correct-work-start-fixtures"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:1a75c2e76a01e950ed277428440d187a8438d47468d7716362b42d703af8c78d"
    documents:
      contracts:
        sha256:7f1598b083f517e729fed3130d5ea738db3231b752837d092d2cdff9350dd110:
          acceptance_criteria:
            - "The upstream-advanced task worktree succeeds from the exact admitted frozen SHA, and a separate existing legacy/no-auth test still rejects a stale base."
            - "A consumer worktree test asserts no foreign framework bin/dist injection."
            - "Framework bootstrap tests provide package manifests for owned packages and retain runnable runtime assertions."
            - "No production behavior, policy, or mandatory verification is weakened."
          objective: "Update only the two work-start integration test files to assert frozen-base SHA stability, consumer runtime isolation, and realistic framework package ownership fixtures."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
            - "bunx prettier --check packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
      intent:
        context: "Correct three pre-bump release CI assertions: an authenticated frozen task base remains valid after upstream advances; a consumer worktree receives no framework runtime; framework bootstrap fixtures declare real package ownership before expecting local runtime assets."
        objective: "Align branch work-start integration fixtures with frozen base and framework ownership"
    events:
      -
        command_digest: "sha256:9af26ef6d61a1a9091bb8a37deab01613ff8fc18f6f93455ce1b8f6a2b3bebb7"
        id: "capture:202610241027-XK8HYS:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610241027-XK8HYS"
        occurred_at: "2026-10-24T10:28:19.851Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610241027-XK8HYS"
        task_revision: 1
      -
        command_digest: "sha256:b92b975bdd856bc71fc18cd9c55fa868390f4c83f6377cb2fcf32b9862be643a"
        id: "result:sha256:80f772144362653198e3c8e22bd7a86bfa936cd950ea4c47832e21c4b2c4e00e:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:80f772144362653198e3c8e22bd7a86bfa936cd950ea4c47832e21c4b2c4e00e"
        occurred_at: "2026-10-24T10:29:16.622Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610241027-XK8HYS"
        task_revision: 2
      -
        command_digest: "sha256:320c24a289c6fb275cd83c1c91b77878dd2a4343d3de7a1efd88aef63350f7d0"
        id: "sha256:25d3cee8f72c54e3df582197ffb9e06c567dc4aebdc7d579f8f27a79bf780452:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:25d3cee8f72c54e3df582197ffb9e06c567dc4aebdc7d579f8f27a79bf780452"
        occurred_at: "2026-10-24T10:29:40.168Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610241027-XK8HYS"
        task_revision: 3
      -
        command_digest: "sha256:f41ecd0b1a4986709cd4de844a4354c6015d23fc997722ebf5f710e38d5ee160"
        id: "kernel_work_item_materialization_required:sha256:444d6572ba606216106c5e419a9b75d382be69b2bd68b84aa2ac98c6339b4e4e:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:444d6572ba606216106c5e419a9b75d382be69b2bd68b84aa2ac98c6339b4e4e:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d"
        occurred_at: "2026-10-24T10:30:09.027Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610241027-XK8HYS"
        task_revision: 4
      -
        command_digest: "sha256:e87d95763cc730c35a56ad10486b75c61bd252235fc44ac6e5fee9ff52a5262e"
        id: "kernel_work_item_claim_required:sha256:d4ac0e1e6888cf4260e5b11021902bbd27ad2ee2015a77e5a8c41d1e1b2e6c38:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d4ac0e1e6888cf4260e5b11021902bbd27ad2ee2015a77e5a8c41d1e1b2e6c38:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d"
        occurred_at: "2026-10-24T10:30:44.345Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610241027-XK8HYS"
        task_revision: 5
      -
        command_digest: "sha256:e42f607ef4d5599a8992b866177ead81c1a74e16cabf46c2df194d5f55a3248a"
        id: "kernel_work_item_execution_required:sha256:79699089d75bbc21f8985a70a1b1214700c43266788e66aeb7cc4d04660ea871:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:79699089d75bbc21f8985a70a1b1214700c43266788e66aeb7cc4d04660ea871:sha256:d8429f274adb80af80a0e1693549972de580aaf077ab83e582d81b05cd60404d"
        occurred_at: "2026-10-24T10:32:17.316Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610241027-XK8HYS"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Align branch work-start integration fixtures with frozen base and framework ownership

Correct three pre-bump release CI assertions: an authenticated frozen task base remains valid after upstream advances; a consumer worktree receives no framework runtime; framework bootstrap fixtures declare real package ownership before expecting local runtime assets.

## Scope

- In scope: Correct three pre-bump release CI assertions: an authenticated frozen task base remains valid after upstream advances; a consumer worktree receives no framework runtime; framework bootstrap fixtures declare real package ownership before expecting local runtime assets.
- Out of scope: unrelated refactors not required for "Align branch work-start integration fixtures with frozen base and framework ownership".

## Plan

1. Execute approved WorkItem correct-work-start-fixtures.

## Verify Steps

PLANNER fallback scaffold for "Align branch work-start integration fixtures with frozen base and framework ownership". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Align branch work-start integration fixtures with frozen base and framework ownership". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
