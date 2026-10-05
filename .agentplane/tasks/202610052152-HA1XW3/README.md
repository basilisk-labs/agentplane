---
id: "202610052152-HA1XW3"
title: "Repair native execution of approved read-only CLI and bounded Node heap checks"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bun run test:fast -- packages/agentplane/src/commands/shared/declared-check.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-05T21:54:53.275Z"
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
      - "packages/agentplane/src/commands/shared/declared-check.test.ts"
      - "packages/agentplane/src/commands/shared/declared-check.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
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
      - "packages/agentplane/src/commands/shared/declared-check.test.ts"
      - "packages/agentplane/src/commands/shared/declared-check.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
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
          - "packages/agentplane/src/commands/shared/declared-check.test.ts"
          - "packages/agentplane/src/commands/shared/declared-check.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
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
      digest: "sha256:4ecc59928ce69dfe637e81fdc97d9945956cd5201ab4dde3aa56f0c63934243a"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/declared-check.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/declared-check.ts"
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
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-05T21:52:09.527Z"
doc_updated_by: "CODER"
description: "Release recovery is blocked because native verification rejects ap config show although the executor passes it, and rejects an approved NODE_OPTIONS=--max-old-space-size=4096 bunx --no-install eslint command. Plan obligations correctly cannot be dropped. Preserve those checks and repair native argv execution: resolve exact ap/agentplane config show through the known repository CLI, and admit only a bounded numeric Node heap option without shell evaluation or arbitrary environment/Node options. Keep environment scoped per check, reject injected code, wrappers, unrelated variables and mutation commands. Add parser and real verification regressions, then independent review. No allowlist broadening or skipped checks."
sections:
  Summary: |-
    Repair native execution of approved read-only CLI and bounded Node heap checks

    Release recovery is blocked because native verification rejects ap config show although the executor passes it, and rejects an approved NODE_OPTIONS=--max-old-space-size=4096 bunx --no-install eslint command. Plan obligations correctly cannot be dropped. Preserve those checks and repair native argv execution: resolve exact ap/agentplane config show through the known repository CLI, and admit only a bounded numeric Node heap option without shell evaluation or arbitrary environment/Node options. Keep environment scoped per check, reject injected code, wrappers, unrelated variables and mutation commands. Add parser and real verification regressions, then independent review. No allowlist broadening or skipped checks.
  Scope: |-
    - In scope: Release recovery is blocked because native verification rejects ap config show although the executor passes it, and rejects an approved NODE_OPTIONS=--max-old-space-size=4096 bunx --no-install eslint command. Plan obligations correctly cannot be dropped. Preserve those checks and repair native argv execution: resolve exact ap/agentplane config show through the known repository CLI, and admit only a bounded numeric Node heap option without shell evaluation or arbitrary environment/Node options. Keep environment scoped per check, reject injected code, wrappers, unrelated variables and mutation commands. Add parser and real verification regressions, then independent review. No allowlist broadening or skipped checks.
    - Out of scope: unrelated refactors not required for "Repair native execution of approved read-only CLI and bounded Node heap checks".
  Plan: "1. Execute approved WorkItem repair-native-readonly-check-invocation."
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair native execution of approved read-only CLI and bounded Node heap checks". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair native execution of approved read-only CLI and bounded Node heap checks". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "65696d9032b77e80e31c6bca7668a5f32c99c443"
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
            digest: "sha256:eaee0b4b4c7589d553b748409b89214ccf913b98ed635c32b7dd7fa20f6c80a5"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:c307c2c2c7807b98950db9788dcd0d070ace2e5e468eed447c118bc3452a9fee"
            plan_revision: 1
            policy_digests:
              - "sha256:46ab96cb2da8e193a7f501a37237d84581adf7e67f1f87977fcafc07bc4ae1c6"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c7d334fd1aa463d000ca8b4cc174c33ba611e5edb4df0158fa3b4b84048bef7f"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/shared/declared-check.test.ts"
              - "packages/agentplane/src/commands/shared/declared-check.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
            task_id: "202610052152-HA1XW3"
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
        approval_evidence_digest: "sha256:c7d334fd1aa463d000ca8b4cc174c33ba611e5edb4df0158fa3b4b84048bef7f"
        digest: "sha256:c307c2c2c7807b98950db9788dcd0d070ace2e5e468eed447c118bc3452a9fee"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:c54467d910699d404c177a77627d94d5818d43c6613b861534d3d7c4642a2671"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared/declared-check.test.ts"
                - "packages/agentplane/src/commands/shared/declared-check.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
            expected_outputs:
              - "native-readonly-check-evidence"
            id: "repair-native-readonly-check-invocation"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610052152-HA1XW3"
      intent_digest: "sha256:bb0766e4a03f0b9b70ba03c0eeeb8c50c4991be1cea413c322874324f7ee5244"
      migration_receipts: []
      mutation_receipts:
        capture:202610052152-HA1XW3:
          after_revision: 1
          aggregate_digest: "sha256:274c58d82ef1e9ddaaa267c8bf59d02ed0515e302ec02833de8c9d75d4c72307"
          before_revision: 0
          command_digest: "sha256:4da53a511e7d4e1c1c750a19e112b1faf8138228c15e682e322fd2fe66397219"
          effect_ids: []
          event_digests:
            - "sha256:3796a505231af2752a4e87996b9011791987313fc191f2e4f7804ede499c7649"
          mutation_id: "capture:202610052152-HA1XW3"
        kernel_work_item_claim_required:sha256:ed0cd5d7c1dc8713fc27701a847a729ae5a5efd2966aa3aba6ed0d0eee7496d7:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82:
          after_revision: 5
          aggregate_digest: "sha256:551bcff8b2c48a9f0f10e8400b488208b5fe6c65097d3ed419a1b5076471c72c"
          before_revision: 4
          command_digest: "sha256:228f573f1f3396dc5e26dc1db7fd83c63c0e2da9c61a789b490be658ebc75e2d"
          effect_ids: []
          event_digests:
            - "sha256:56a8b94d380b4e017ed324d1997d7b84578edb5c9f6df7f2727c0b12d08fbb15"
          mutation_id: "kernel_work_item_claim_required:sha256:ed0cd5d7c1dc8713fc27701a847a729ae5a5efd2966aa3aba6ed0d0eee7496d7:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
        kernel_work_item_execution_required:sha256:5749fbcbbe10237a83ae3babb1292b681abe01cd0bfd36e833a8c8898b201ee4:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82:
          after_revision: 6
          aggregate_digest: "sha256:d4169cddb71d13fc446316626f116b9c7ffd16704815435a0cad321611f98b2e"
          before_revision: 5
          command_digest: "sha256:1407e99787b5aa19dc1d2d54dde94a59bda8cbc5fc58e13178b7e10d31564036"
          effect_ids: []
          event_digests:
            - "sha256:41d2fa6b1cf77db7e5cb105194095364ff41a80b82fe796c69a6bf7289d31d69"
          mutation_id: "kernel_work_item_execution_required:sha256:5749fbcbbe10237a83ae3babb1292b681abe01cd0bfd36e833a8c8898b201ee4:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
        kernel_work_item_materialization_required:sha256:5cde71af88da4fb09d831319481630acc7b3004b3fcc6d1d24acf0f6d3dd4f1c:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82:
          after_revision: 4
          aggregate_digest: "sha256:c6ba5d92adcae25cb676482656824751a5a74bfc755e89c5ab6890af0531c3b6"
          before_revision: 3
          command_digest: "sha256:f28548c88a6536ebb714cc06ec9b53fda88d8c7a9b4b36b7522f845b900296fd"
          effect_ids: []
          event_digests:
            - "sha256:659d1c5bdd434ef9d3ae113b3183679b1702b04f3111cd46dd9735b3f2603236"
          mutation_id: "kernel_work_item_materialization_required:sha256:5cde71af88da4fb09d831319481630acc7b3004b3fcc6d1d24acf0f6d3dd4f1c:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
        result:sha256:2a83f05e0d0a2e2cf569e3eba6c7ca83e18cdf16048f3321eec4759c048f1b58:
          after_revision: 2
          aggregate_digest: "sha256:1b7a9990c92abbffb0765b102b5a844f599ec8d2e4a575204a10c45f76f19654"
          before_revision: 1
          command_digest: "sha256:31d4cb29f286ec06890806e7b0db7b718fc929decb68d1c7cd396ec2d997e53a"
          effect_ids: []
          event_digests:
            - "sha256:2a7ff337450d6e1da40cfcbf610d864d1160d86292361350deadc76a35393c86"
          mutation_id: "result:sha256:2a83f05e0d0a2e2cf569e3eba6c7ca83e18cdf16048f3321eec4759c048f1b58"
        sha256:d7fa085f202cda71c5e8d5ef95d714234a7ff204baef40ac0243c907e53f0562:
          after_revision: 3
          aggregate_digest: "sha256:99c6045dc9ca988e8cc23041cd0791f38bda26b972e648ede7dbed49a1e7e7b4"
          before_revision: 2
          command_digest: "sha256:acf37a7b308b4d57ba225d4fe91e15577507a52dc17ad71cc820e71db7c8af3c"
          effect_ids: []
          event_digests:
            - "sha256:215f1b52af92acead3adc128f62107bb5188089ed0907b18fd106dd6d220a29a"
          mutation_id: "sha256:d7fa085f202cda71c5e8d5ef95d714234a7ff204baef40ac0243c907e53f0562"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        repair-native-readonly-check-invocation:
          attempt: 1
          claim_id: "sha256:931a89e938179bae39ba086b83d22fa9cbf4fe8864565fe7ba95365bee41b05e"
          definition:
            contract_digest: "sha256:c54467d910699d404c177a77627d94d5818d43c6613b861534d3d7c4642a2671"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared/declared-check.test.ts"
                - "packages/agentplane/src/commands/shared/declared-check.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
            expected_outputs:
              - "native-readonly-check-evidence"
            id: "repair-native-readonly-check-invocation"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:7da8021800ec650ddea46bcb56d78119905b7caa48ab1b8a7c2fd9b8298e762d"
    documents:
      contracts:
        sha256:c54467d910699d404c177a77627d94d5818d43c6613b861534d3d7c4642a2671:
          acceptance_criteria:
            - "Both exact ap config show and agentplane config show resolve to the known CLI using its existing launcher/runtime owner, not PATH lookup of the supplied alias. Reject added arguments/options and mutation commands through this exception; existing separately supported CLI checks retain their behavior."
            - "Admit only one NODE_OPTIONS assignment containing exactly --max-old-space-size=N with a decimal integer in a finite documented range including 4096 (256–8192 MiB). Validate after tokenization and before execution; reject duplicate assignments, extra Node flags, preload/eval/import options, unknown variables, wrappers, substitutions, redirections and malformed or out-of-range values. Preserve all existing underlying command restrictions."
            - "Pass the admitted heap value through an explicit child environment without shell evaluation or mutation of process.env. Scope it to its own parsed sequence segment; subsequent segments and unrelated checks inherit only their normal sanitized environment. Runtime/evidence binding reflects each effective command environment, including the admitted override."
            - "Parser tests cover aliases, the approved lint command, numeric bounds, malformed/injected variants, protected mutation commands and multi-segment isolation. Real native-verifier tests exercise readonly CLI execution and heap delivery plus negative rejection before subprocess effects. Preserve existing assertions, deadlines, check identities, failure classification and mandatory-check retention."
            - "Run focused declared-check and native-verification tests, plain targeted ESLint, typecheck and diff checks. Do not put inline environment prefixes into this WorkItem verification commands. Rebuild core and CLI bundles after typecheck if needed for a usable native runtime. Preserve every inherited baseline file, including pre-existing generated-looking files. Independent native EVALUATOR and final verification remain mandatory."
          objective: "Repair native declared-check parsing and argv execution for exact ap config show and agentplane config show through the known repository CLI, and for a single bounded NODE_OPTIONS=--max-old-space-size=<integer> prefix on an otherwise admitted check. Preserve the declared command and verification obligations, without shell evaluation, arbitrary environment variables, Node code-loading flags, wrappers, or mutation-command admission. Keep the change within the five authorized parser/verifier/test files."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:fast -- packages/agentplane/src/commands/shared/declared-check.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts"
            - "bunx --no-install eslint packages/agentplane/src/commands/shared/declared-check.test.ts packages/agentplane/src/commands/shared/declared-check.ts packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/direct-task-verification.ts"
            - "bun run typecheck"
            - "git diff --check"
      intent:
        context: "Release recovery is blocked because native verification rejects ap config show although the executor passes it, and rejects an approved NODE_OPTIONS=--max-old-space-size=4096 bunx --no-install eslint command. Plan obligations correctly cannot be dropped. Preserve those checks and repair native argv execution: resolve exact ap/agentplane config show through the known repository CLI, and admit only a bounded numeric Node heap option without shell evaluation or arbitrary environment/Node options. Keep environment scoped per check, reject injected code, wrappers, unrelated variables and mutation commands. Add parser and real verification regressions, then independent review. No allowlist broadening or skipped checks."
        objective: "Repair native execution of approved read-only CLI and bounded Node heap checks"
    events:
      -
        command_digest: "sha256:4da53a511e7d4e1c1c750a19e112b1faf8138228c15e682e322fd2fe66397219"
        id: "capture:202610052152-HA1XW3:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610052152-HA1XW3"
        occurred_at: "2026-10-05T21:52:09.462Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610052152-HA1XW3"
        task_revision: 1
      -
        command_digest: "sha256:31d4cb29f286ec06890806e7b0db7b718fc929decb68d1c7cd396ec2d997e53a"
        id: "result:sha256:2a83f05e0d0a2e2cf569e3eba6c7ca83e18cdf16048f3321eec4759c048f1b58:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:2a83f05e0d0a2e2cf569e3eba6c7ca83e18cdf16048f3321eec4759c048f1b58"
        occurred_at: "2026-10-05T21:54:36.988Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610052152-HA1XW3"
        task_revision: 2
      -
        command_digest: "sha256:acf37a7b308b4d57ba225d4fe91e15577507a52dc17ad71cc820e71db7c8af3c"
        id: "sha256:d7fa085f202cda71c5e8d5ef95d714234a7ff204baef40ac0243c907e53f0562:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:d7fa085f202cda71c5e8d5ef95d714234a7ff204baef40ac0243c907e53f0562"
        occurred_at: "2026-10-05T21:54:48.062Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610052152-HA1XW3"
        task_revision: 3
      -
        command_digest: "sha256:f28548c88a6536ebb714cc06ec9b53fda88d8c7a9b4b36b7522f845b900296fd"
        id: "kernel_work_item_materialization_required:sha256:5cde71af88da4fb09d831319481630acc7b3004b3fcc6d1d24acf0f6d3dd4f1c:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:5cde71af88da4fb09d831319481630acc7b3004b3fcc6d1d24acf0f6d3dd4f1c:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
        occurred_at: "2026-10-05T21:54:56.256Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610052152-HA1XW3"
        task_revision: 4
      -
        command_digest: "sha256:228f573f1f3396dc5e26dc1db7fd83c63c0e2da9c61a789b490be658ebc75e2d"
        id: "kernel_work_item_claim_required:sha256:ed0cd5d7c1dc8713fc27701a847a729ae5a5efd2966aa3aba6ed0d0eee7496d7:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ed0cd5d7c1dc8713fc27701a847a729ae5a5efd2966aa3aba6ed0d0eee7496d7:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
        occurred_at: "2026-10-05T21:55:10.257Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610052152-HA1XW3"
        task_revision: 5
      -
        command_digest: "sha256:1407e99787b5aa19dc1d2d54dde94a59bda8cbc5fc58e13178b7e10d31564036"
        id: "kernel_work_item_execution_required:sha256:5749fbcbbe10237a83ae3babb1292b681abe01cd0bfd36e833a8c8898b201ee4:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:5749fbcbbe10237a83ae3babb1292b681abe01cd0bfd36e833a8c8898b201ee4:sha256:6c9f4524087a57e56b7c7fac1fceb28ba47f8c5be72dd9d295e2a386f6f28d82"
        occurred_at: "2026-10-05T21:56:22.649Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610052152-HA1XW3"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Repair native execution of approved read-only CLI and bounded Node heap checks

Release recovery is blocked because native verification rejects ap config show although the executor passes it, and rejects an approved NODE_OPTIONS=--max-old-space-size=4096 bunx --no-install eslint command. Plan obligations correctly cannot be dropped. Preserve those checks and repair native argv execution: resolve exact ap/agentplane config show through the known repository CLI, and admit only a bounded numeric Node heap option without shell evaluation or arbitrary environment/Node options. Keep environment scoped per check, reject injected code, wrappers, unrelated variables and mutation commands. Add parser and real verification regressions, then independent review. No allowlist broadening or skipped checks.

## Scope

- In scope: Release recovery is blocked because native verification rejects ap config show although the executor passes it, and rejects an approved NODE_OPTIONS=--max-old-space-size=4096 bunx --no-install eslint command. Plan obligations correctly cannot be dropped. Preserve those checks and repair native argv execution: resolve exact ap/agentplane config show through the known repository CLI, and admit only a bounded numeric Node heap option without shell evaluation or arbitrary environment/Node options. Keep environment scoped per check, reject injected code, wrappers, unrelated variables and mutation commands. Add parser and real verification regressions, then independent review. No allowlist broadening or skipped checks.
- Out of scope: unrelated refactors not required for "Repair native execution of approved read-only CLI and bounded Node heap checks".

## Plan

1. Execute approved WorkItem repair-native-readonly-check-invocation.

## Verify Steps

PLANNER fallback scaffold for "Repair native execution of approved read-only CLI and bounded Node heap checks". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair native execution of approved read-only CLI and bounded Node heap checks". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
