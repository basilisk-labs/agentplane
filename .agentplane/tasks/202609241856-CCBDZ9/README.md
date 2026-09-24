---
id: "202609241856-CCBDZ9"
title: "Make canonical final validation execute only approved Plan verification commands"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 17
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "task-kernel"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:fast"
  - "bun run typecheck"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-24T19:08:39.725Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-24T19:19:19.731Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-24T19:08:39.725Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "ceb90233610621d4f3a26c2219a6f97dddb8cfde"
  review_identity_digest: "sha256:e0970ac9e5439e0407cebd2bcff3d9a331160a66095f966f571eb347842020a5"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609241856-CCBDZ9/9a155763035687f9394c213841951c4b329a0368233a04b7ad2c43d3b976d166/quality-report.json"
  findings:
    - "The canonical call site strips only legacy operational verify commands and continues to pass the approved Plan commands as explicit additional commands."
    - "The shared direct-task verification implementation is unchanged, preserving non-canonical task.verify behavior."
    - "The helper returns a copy and does not mutate the operational task."
    - "AgentPlane observed the focused test, typecheck, and ci:local:fast passing on commit ceb90233610621d4f3a26c2219a6f97dddb8cfde."
token_usage:
  agent_runs: 0
  cached_input_observed_agent_runs: 0
  cached_input_tokens: null
  input_tokens: null
  journal_digest: "sha256:09ede88e6880942c923dd48e61cc847c9392dd64ffb17545183180ac0dd393d7"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "no_supervised_agent_runs"
  updated_at: "2026-09-24T19:22:04.223Z"
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
      - "task.verify"
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
      - "packages/agentplane/src/commands/task"
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
      - "packages/agentplane/src/commands/task"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
      - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/task"
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
      digest: "sha256:b4d6aed37b572350ead5cbdd827fd5952dace30bcaeed0259429662f50264540"
      escalation_reasons: []
      execution_groups:
        - "core"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
          - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
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
commit:
  hash: "7b2eadba2ea59e750d8926d08ff632d2651c24ec"
  message: "✅ CCBDZ9 task: persist canonical completion"
comments:
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "verify"
    at: "2026-09-24T19:19:19.731Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
  -
    type: "status"
    at: "2026-09-24T19:22:04.223Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "7b2eadba2ea59e750d8926d08ff632d2651c24ec"
doc_version: 3
doc_updated_at: "2026-09-24T19:22:04.223Z"
doc_updated_by: "CODER"
description: "Fix runKernelFinalValidation so legacy operational task.verify commands cannot be merged into canonical final validation after a replacement Plan. Preserve legacy direct-task verification behavior outside the canonical Kernel route. Add regression coverage for divergent legacy and canonical commands."
sections:
  Summary: |-
    Make canonical final validation execute only approved Plan verification commands

    Fix runKernelFinalValidation so legacy operational task.verify commands cannot be merged into canonical final validation after a replacement Plan. Preserve legacy direct-task verification behavior outside the canonical Kernel route. Add regression coverage for divergent legacy and canonical commands.
  Scope: |-
    - In scope: Fix runKernelFinalValidation so legacy operational task.verify commands cannot be merged into canonical final validation after a replacement Plan. Preserve legacy direct-task verification behavior outside the canonical Kernel route. Add regression coverage for divergent legacy and canonical commands.
    - Out of scope: unrelated refactors not required for "Make canonical final validation execute only approved Plan verification commands".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run ci:local:fast`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-24T19:19:19.731Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0b94509903b4f56e7d5a72868ff6c90553b9ef6b7f6c36e3efa763910190fd8f, input_digest=sha256:5ead6eb8d90efb8bf2f7f21353e544baf56bff7e69220c1464460f1bc23c5600

    Details:

    Check: affected_unit_integration
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:fast
    Result: pass
    Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:fast
    Result: pass
    Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check critical_paths (3/3)

    Check: task_outcome
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:fast
    Result: pass
    Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check task_outcome (3/3)

    NativeTaskIdentityRef:
    - plan_digest: sha256:bf96272eb2a1ad43958b628e80d29619ff5df04272e0352fde4b8a05fb0a45e4
    - policy_digest: sha256:1150ba6caefe9e829c30b3520b9246ed1ec7ebbeedbe788c63cf7989015dbb46
    - capability_digest: sha256:f2f93935a83dceb80a450ec264e504489c4c1c9b33e401664f08190ae0c1aa23
    - checks_digest: sha256:5c219b4f3373e9bee1d5ed2c43412e3cb6b40c765642746f92a7b396eea1b7ef
    - identity_digest: sha256:90989774fa7b999aad28a281893eafac856f035675d9002408ddc60dee1b65ff

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609241856-CCBDZ9
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
  agentplane.kernel_operational_projection:
    digest: "sha256:0193d19b177532fe9034f8ad6032c75d006337fedd7e23081c6ad6db4ffa6064"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609241856-CCBDZ9/9a155763035687f9394c213841951c4b329a0368233a04b7ad2c43d3b976d166/quality-report.json"
    findings:
      - "The canonical call site strips only legacy operational verify commands and continues to pass the approved Plan commands as explicit additional commands."
      - "The shared direct-task verification implementation is unchanged, preserving non-canonical task.verify behavior."
      - "The helper returns a copy and does not mutate the operational task."
      - "AgentPlane observed the focused test, typecheck, and ci:local:fast passing on commit ceb90233610621d4f3a26c2219a6f97dddb8cfde."
    implementation_commit: "ceb90233610621d4f3a26c2219a6f97dddb8cfde"
    implementation_tree: "23fe21fa16ea937cfe8392ef3ffb3b7d15ab4452"
    projected_at: "2026-09-24T19:08:39.725Z"
    review_identity_digest: "sha256:e0970ac9e5439e0407cebd2bcff3d9a331160a66095f966f571eb347842020a5"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:680df403f52c992a3e62540c9eae951a31d10fcfc8482752cee20e64ff44ca7b"
    work_order_id: "sha256:85d7586be04149ecd68ca87542702cb9f4b8cc2a2877e7d99294dc32c0510e34"
  implementation_commit:
    hash: "ceb90233610621d4f3a26c2219a6f97dddb8cfde"
    message: "🚧 CCBDZ9 task: apply canonical agent result"
  task_execution_context:
    base_ref: "main"
    base_sha: "9a9ccf33a80c42e7a2643caaaf2f490e588384d0"
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
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:c5aafd1604e3a96f1c2d8bbd93679134d8c5482a3942e0290786c85304663143"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:bf96272eb2a1ad43958b628e80d29619ff5df04272e0352fde4b8a05fb0a45e4"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:452b1803dc898dbb83e03088a04ebe839011f5c5bfbc08137df3d2e79456f03b"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609241856-CCBDZ9"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3145af832c9657811956c611b2dba7f567e89078260c2385a09303a2fb16b5ee"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:bf96272eb2a1ad43958b628e80d29619ff5df04272e0352fde4b8a05fb0a45e4"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:452b1803dc898dbb83e03088a04ebe839011f5c5bfbc08137df3d2e79456f03b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:c5aafd1604e3a96f1c2d8bbd93679134d8c5482a3942e0290786c85304663143"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609241856-CCBDZ9"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
            evidence_digest: "sha256:cf22f5beb58e22ece54b2c52204714df7d6f82343fadaf522d3abfbae8399b6e"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:452b1803dc898dbb83e03088a04ebe839011f5c5bfbc08137df3d2e79456f03b"
        digest: "sha256:bf96272eb2a1ad43958b628e80d29619ff5df04272e0352fde4b8a05fb0a45e4"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:58871799fc4e4230d0fe08f852d1d9604f1343c39c0d1baa22cd9afd680cf9de"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "canonical-command-ownership"
              - "divergent-command-regression"
            id: "canonical-final-validation-commands"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:680df403f52c992a3e62540c9eae951a31d10fcfc8482752cee20e64ff44ca7b"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:97f17c99ead89dd35db6867484521c754c8f4998fca01e0f577e149833323fad"
          environment_digest: "sha256:41fad4335a209b416abcf1b1ce1e76413d116a61d537bbaedebca3811d66954c"
          implementation_identity: "sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
          toolchain_digest: "sha256:ffb35acb41428422799e4cefc57db8bf03e44c4327bc9976a403943738f026e6"
        observed_at: "2026-09-24T19:08:48.031Z"
        status: "PASSED"
      id: "202609241856-CCBDZ9"
      intent_digest: "sha256:5a12b5634a0e89f2eacc248636e2ed15e621def6b5afcf9ae2529b7acff74ca5"
      migration_receipts: []
      mutation_receipts:
        capture:202609241856-CCBDZ9:
          after_revision: 1
          aggregate_digest: "sha256:f0de3f8920e88e61685df1f7baa0dd3e49f174839d602d892d102678adb2a549"
          before_revision: 0
          command_digest: "sha256:6babd9b04ffe0eacacca42e438010228810c06b823fe9d103100db62c758ee6d"
          effect_ids: []
          event_digests:
            - "sha256:532e61e2e14f083f80602b4e3b48d01b5ababaaf4cabc304400b98f9dbad5482"
          mutation_id: "capture:202609241856-CCBDZ9"
        final-validation:sha256:680df403f52c992a3e62540c9eae951a31d10fcfc8482752cee20e64ff44ca7b:11:
          after_revision: 12
          aggregate_digest: "sha256:c51e007136a80b86e14ed1449371b07b924559b860dc71da0a739f8ef2bf7544"
          before_revision: 11
          command_digest: "sha256:53319b2db6b94e0c7f925d1d104b4e621fd50722a937d5b09999c70bf5bfbd5c"
          effect_ids: []
          event_digests:
            - "sha256:18461e45cc3dc87422a42129fbe90f029a889f3df2739fc01ba192572afb81ba"
          mutation_id: "final-validation:sha256:680df403f52c992a3e62540c9eae951a31d10fcfc8482752cee20e64ff44ca7b:11"
        kernel_task_completion_required:sha256:518a2dfff4de8bfd3750f7d6183b5d58a12bc5bc3f97697ef7a6ff1b78da72f8:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:
          after_revision: 13
          aggregate_digest: "sha256:c7e0be5e77dfc6e5aa417d02e15b17f944e9cd925890f8ca939ab003c800ec2b"
          before_revision: 12
          command_digest: "sha256:02dfdc2ecea9c93e8e63f6e6cef22b9ae1e568f8ecc9ff485d23abf81427c00f"
          effect_ids: []
          event_digests:
            - "sha256:85781119c1f89951d833f17a6037a90533e2603a2b978070fb00ebcd79d08c85"
          mutation_id: "kernel_task_completion_required:sha256:518a2dfff4de8bfd3750f7d6183b5d58a12bc5bc3f97697ef7a6ff1b78da72f8:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        kernel_work_item_claim_required:sha256:4b148752e7387122e09d0200b4cc0a113fb00df2f51355487e48ffd02d389482:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1:
          after_revision: 5
          aggregate_digest: "sha256:6f8da34f3465d2caa66cbdd08882ae637a96e2d49bee2a436aaa869af4d82c28"
          before_revision: 4
          command_digest: "sha256:cd27eec62b91e5c1f745de780bb5761c99916b3fa5b5002b4777e3684bb5a314"
          effect_ids: []
          event_digests:
            - "sha256:6fa62258cf4e35431ae611642b25f060b13eee53010f0d43b26d6d7c2ce20f35"
          mutation_id: "kernel_work_item_claim_required:sha256:4b148752e7387122e09d0200b4cc0a113fb00df2f51355487e48ffd02d389482:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
        kernel_work_item_execution_required:sha256:9461846532691ea9d7b79bb3125d40e4526f961d5364e44379144d7377c9a2b6:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1:
          after_revision: 6
          aggregate_digest: "sha256:78914ab8f8471689b0cca2dfe9e740bd3979a6dd08869f82c24797e68b86b2a1"
          before_revision: 5
          command_digest: "sha256:d26bb0d50bd4ab17026430d57a8e630f65c2111ac5146a693fe341fea6961a80"
          effect_ids: []
          event_digests:
            - "sha256:f81684b63703f96d63867252fa2728350fdbc85db831257cd05388b48ece8e01"
          mutation_id: "kernel_work_item_execution_required:sha256:9461846532691ea9d7b79bb3125d40e4526f961d5364e44379144d7377c9a2b6:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
        kernel_work_item_inspection_required:sha256:462f8ab3e01cb984d0f78c84067eca3169aa5d74b7e2b2a99ef2d7c69e902736:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:
          after_revision: 9
          aggregate_digest: "sha256:20227ec780fb35f0ffa9e10f4624322fd5689b0d4a00915759e04976faca0010"
          before_revision: 8
          command_digest: "sha256:8dc911721c527a144bb5899019cc5c3c3a0c2f8f44adf8d0b1d51da958af9367"
          effect_ids: []
          event_digests:
            - "sha256:d97bc53d77d6b31559c0030936f62e78889991c126b054b72fb71538d4901a6d"
          mutation_id: "kernel_work_item_inspection_required:sha256:462f8ab3e01cb984d0f78c84067eca3169aa5d74b7e2b2a99ef2d7c69e902736:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        kernel_work_item_materialization_required:sha256:40f6f0c269c29b1ae5f0356c3a800a6ff36db33650579d6a3ec77cceb51ce44a:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1:
          after_revision: 4
          aggregate_digest: "sha256:5f30332994f42e4cfe8a70550f17b8c0d07e4a6dc08e41d6e1eeaea08707bab4"
          before_revision: 3
          command_digest: "sha256:f5d7b6dc3c2be7bf3ba7fe2946d61a8bc84487b3b511a4563a1ec52e445f1020"
          effect_ids: []
          event_digests:
            - "sha256:87912d696d6fbb9fd0a36c7ec9b57fa1a1744d02840a18e33baa87582b587e99"
          mutation_id: "kernel_work_item_materialization_required:sha256:40f6f0c269c29b1ae5f0356c3a800a6ff36db33650579d6a3ec77cceb51ce44a:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
        result:sha256:1f966ae8faa4f3fa42691aa8554a9d1346e6ca56635b18c6e91aa13df55d2b02:
          after_revision: 2
          aggregate_digest: "sha256:831fbab0cc27cb5e5b40aaf490fe4da615416e5e4aa97a4c59ef9bc6717d3c67"
          before_revision: 1
          command_digest: "sha256:9bfc27b3f3c7c0339c23f2fb45f1b0aa9e61e43ee7a97ebce6d6712c4894c16a"
          effect_ids: []
          event_digests:
            - "sha256:6b5fc51a4edc721792cd67b60b3ef50f1103e503beabdd3742befe6024d1af1f"
          mutation_id: "result:sha256:1f966ae8faa4f3fa42691aa8554a9d1346e6ca56635b18c6e91aa13df55d2b02"
        result:sha256:85d7586be04149ecd68ca87542702cb9f4b8cc2a2877e7d99294dc32c0510e34:
          after_revision: 8
          aggregate_digest: "sha256:d85636fc825f58bef042a4c8285411debc4c1c74a8dc2e512258dd58222580c3"
          before_revision: 7
          command_digest: "sha256:f6d8608d7c892ebd2fa8d8c79b90b1eee56f2b06e96ba23dfb1e56b09d110201"
          effect_ids: []
          event_digests:
            - "sha256:568f64dbcb3c2976d9ad2cb2219a4515125f6655f311d21b7ca0ac8ad46be2fb"
          mutation_id: "result:sha256:85d7586be04149ecd68ca87542702cb9f4b8cc2a2877e7d99294dc32c0510e34"
        sha256:09d0fb777df7ad381af3ce4544cc71e1c62bf38c59d55664c1dc96bdaa895b26:
          after_revision: 3
          aggregate_digest: "sha256:e26dfa25bd2e91fccbd58b5458b0d3c08306c72c2f3398286df7f3b7967b17fb"
          before_revision: 2
          command_digest: "sha256:a33d3206ea72e0526f32c67dd5b3c0fb9877a11774982ed66262ded1a6cad9dc"
          effect_ids: []
          event_digests:
            - "sha256:65bf645bd5b098bcdc9ff04268fb49adb720107d45cc9e36f367220258e367cb"
          mutation_id: "sha256:09d0fb777df7ad381af3ce4544cc71e1c62bf38c59d55664c1dc96bdaa895b26"
        sha256:5f746d261fd92e57c15e5a57f6fc455075818111712d03977b71a584dc922556:
          after_revision: 7
          aggregate_digest: "sha256:36507dae430c07611877bd1c7598d7c2c53aabb311437130fccc27c64cadb396"
          before_revision: 6
          command_digest: "sha256:d5f132a0425345c2936d5137e476d16ee33f1fff0c0156c01971153b40539805"
          effect_ids: []
          event_digests:
            - "sha256:740030f5d2ad9aab0b599d440c70b4fded83f7db75fef06120a8f69f51401535"
          mutation_id: "sha256:5f746d261fd92e57c15e5a57f6fc455075818111712d03977b71a584dc922556"
        validation-resolution:sha256:9da6e29160bbecff48e7ab793a00b540cc5fdb9189fbb056a77c9a64691edad8:
          after_revision: 11
          aggregate_digest: "sha256:3160aa789d5553ff2ef7142abc8510131797f07be02cd062bbc1c365fed9efab"
          before_revision: 10
          command_digest: "sha256:83808f9871a9b04d91c2a7b28cad02d1abeda7080bdfaa532fdfa43030463b4a"
          effect_ids: []
          event_digests:
            - "sha256:6d327f6beb6ab26938f186bc4be3c807af7bb4d8aa824db8dc88815c7adcfc55"
          mutation_id: "validation-resolution:sha256:9da6e29160bbecff48e7ab793a00b540cc5fdb9189fbb056a77c9a64691edad8"
        validation:sha256:9a155763035687f9394c213841951c4b329a0368233a04b7ad2c43d3b976d166:
          after_revision: 10
          aggregate_digest: "sha256:fbe7a131a04320353d52140fac944b1d4ad720f13325036bd8debd67a8c60c39"
          before_revision: 9
          command_digest: "sha256:f4b8fb1b73df0ab2d3deea068157096d4599f348534a13366cc66a6414f90332"
          effect_ids: []
          event_digests:
            - "sha256:5816e7a1e8cbec3ef3f67fd7440316fb5541132e212901aea9376b7c1aa35f41"
          mutation_id: "validation:sha256:9a155763035687f9394c213841951c4b329a0368233a04b7ad2c43d3b976d166"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "COMPLETED"
      work_items:
        canonical-final-validation-commands:
          attempt: 1
          claim_id: "sha256:db2295b3bf2e8c2ccb7f52c91dab50793f1f565c57d358371ff6ed3fa2f87bbf"
          definition:
            contract_digest: "sha256:58871799fc4e4230d0fe08f852d1d9604f1343c39c0d1baa22cd9afd680cf9de"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "canonical-command-ownership"
              - "divergent-command-regression"
            id: "canonical-final-validation-commands"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:3b461e73d17c4df605e1e52811444bf66cabfcf1b1b940111df6693496591b0c"
              id: "canonical-command-ownership"
              kind: "source"
              plan_revision: 1
              repository_fingerprint: "sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
              task_id: "202609241856-CCBDZ9"
              work_item_id: "canonical-final-validation-commands"
            -
              attempt: 1
              digest: "sha256:7b124b8a833cc2a17c7e82418ac99e64363a418d1262e5a5d1fa887b8e1433a6"
              id: "divergent-command-regression"
              kind: "test"
              plan_revision: 1
              repository_fingerprint: "sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
              task_id: "202609241856-CCBDZ9"
              work_item_id: "canonical-final-validation-commands"
          result_digest: "sha256:e55e215988f4b28a21581fc8ac35f3e7d82be94485fccb992b6eedcfe09e7f28"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:b9674cf91b7c09f11fe1bb8cf408dac9fcd3dd0a38216d3c6f5aa0cf1e04ff83"
              - "sha256:e0970ac9e5439e0407cebd2bcff3d9a331160a66095f966f571eb347842020a5"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:97f17c99ead89dd35db6867484521c754c8f4998fca01e0f577e149833323fad"
              environment_digest: "sha256:50009222a0ffbcd96ffd1e70dc3be44082a52c023b2f57ff43710a85ed2a0d12"
              implementation_identity: "sha256:e55e215988f4b28a21581fc8ac35f3e7d82be94485fccb992b6eedcfe09e7f28"
              toolchain_digest: "sha256:a0ee42b1cba7905d88b1510be74b48ec1d0ac21b6f282a81bfde91979f9179ad"
            observed_at: "2026-09-24T19:08:39.725Z"
            status: "PASSED"
    digest: "sha256:742dd32fb41d0d1f6d66d34e5219375bb27fa06a0b0de25f074ff1c4184c399b"
    documents:
      contracts:
        sha256:58871799fc4e4230d0fe08f852d1d9604f1343c39c0d1baa22cd9afd680cf9de:
          acceptance_criteria:
            - "A stale or divergent operational task.verify command is not executed by canonical final validation."
            - "Every verification command from the approved canonical Plan is still executed and bound into final validation evidence."
            - "Direct-task verification continues to include task.verify when invoked outside canonical final validation."
            - "Regression coverage proves divergent legacy and canonical command ownership."
          objective: "Make canonical final validation execute only the verification commands in the currently approved canonical Plan while preserving legacy direct-task verification behavior outside this route."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
            - "bun run typecheck"
            - "bun run ci:local:fast"
      intent:
        context: "Fix runKernelFinalValidation so legacy operational task.verify commands cannot be merged into canonical final validation after a replacement Plan. Preserve legacy direct-task verification behavior outside the canonical Kernel route. Add regression coverage for divergent legacy and canonical commands."
        objective: "Make canonical final validation execute only approved Plan verification commands"
    events:
      -
        command_digest: "sha256:6babd9b04ffe0eacacca42e438010228810c06b823fe9d103100db62c758ee6d"
        id: "capture:202609241856-CCBDZ9:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609241856-CCBDZ9"
        occurred_at: "2026-09-24T18:57:01.291Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609241856-CCBDZ9"
        task_revision: 1
      -
        command_digest: "sha256:9bfc27b3f3c7c0339c23f2fb45f1b0aa9e61e43ee7a97ebce6d6712c4894c16a"
        id: "result:sha256:1f966ae8faa4f3fa42691aa8554a9d1346e6ca56635b18c6e91aa13df55d2b02:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:1f966ae8faa4f3fa42691aa8554a9d1346e6ca56635b18c6e91aa13df55d2b02"
        occurred_at: "2026-09-24T18:57:54.365Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609241856-CCBDZ9"
        task_revision: 2
      -
        command_digest: "sha256:a33d3206ea72e0526f32c67dd5b3c0fb9877a11774982ed66262ded1a6cad9dc"
        id: "sha256:09d0fb777df7ad381af3ce4544cc71e1c62bf38c59d55664c1dc96bdaa895b26:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:09d0fb777df7ad381af3ce4544cc71e1c62bf38c59d55664c1dc96bdaa895b26"
        occurred_at: "2026-09-24T18:57:57.643Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609241856-CCBDZ9"
        task_revision: 3
      -
        command_digest: "sha256:f5d7b6dc3c2be7bf3ba7fe2946d61a8bc84487b3b511a4563a1ec52e445f1020"
        id: "kernel_work_item_materialization_required:sha256:40f6f0c269c29b1ae5f0356c3a800a6ff36db33650579d6a3ec77cceb51ce44a:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:40f6f0c269c29b1ae5f0356c3a800a6ff36db33650579d6a3ec77cceb51ce44a:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
        occurred_at: "2026-09-24T18:58:00.736Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609241856-CCBDZ9"
        task_revision: 4
      -
        command_digest: "sha256:cd27eec62b91e5c1f745de780bb5761c99916b3fa5b5002b4777e3684bb5a314"
        id: "kernel_work_item_claim_required:sha256:4b148752e7387122e09d0200b4cc0a113fb00df2f51355487e48ffd02d389482:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:4b148752e7387122e09d0200b4cc0a113fb00df2f51355487e48ffd02d389482:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
        occurred_at: "2026-09-24T18:58:04.952Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609241856-CCBDZ9"
        task_revision: 5
      -
        command_digest: "sha256:d26bb0d50bd4ab17026430d57a8e630f65c2111ac5146a693fe341fea6961a80"
        id: "kernel_work_item_execution_required:sha256:9461846532691ea9d7b79bb3125d40e4526f961d5364e44379144d7377c9a2b6:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9461846532691ea9d7b79bb3125d40e4526f961d5364e44379144d7377c9a2b6:sha256:e0aaa01032487bc5bf1c27fe1205b1b30886a66d6fa2a390534f5c940c5292f1"
        occurred_at: "2026-09-24T18:58:52.572Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609241856-CCBDZ9"
        task_revision: 6
      -
        command_digest: "sha256:d5f132a0425345c2936d5137e476d16ee33f1fff0c0156c01971153b40539805"
        id: "sha256:5f746d261fd92e57c15e5a57f6fc455075818111712d03977b71a584dc922556:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:5f746d261fd92e57c15e5a57f6fc455075818111712d03977b71a584dc922556"
        occurred_at: "2026-09-24T19:01:09.769Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609241856-CCBDZ9"
        task_revision: 7
      -
        command_digest: "sha256:f6d8608d7c892ebd2fa8d8c79b90b1eee56f2b06e96ba23dfb1e56b09d110201"
        id: "result:sha256:85d7586be04149ecd68ca87542702cb9f4b8cc2a2877e7d99294dc32c0510e34:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:85d7586be04149ecd68ca87542702cb9f4b8cc2a2877e7d99294dc32c0510e34"
        occurred_at: "2026-09-24T19:01:14.222Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609241856-CCBDZ9"
        task_revision: 8
      -
        command_digest: "sha256:8dc911721c527a144bb5899019cc5c3c3a0c2f8f44adf8d0b1d51da958af9367"
        id: "kernel_work_item_inspection_required:sha256:462f8ab3e01cb984d0f78c84067eca3169aa5d74b7e2b2a99ef2d7c69e902736:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:462f8ab3e01cb984d0f78c84067eca3169aa5d74b7e2b2a99ef2d7c69e902736:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        occurred_at: "2026-09-24T19:01:17.703Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609241856-CCBDZ9"
        task_revision: 9
      -
        command_digest: "sha256:f4b8fb1b73df0ab2d3deea068157096d4599f348534a13366cc66a6414f90332"
        id: "validation:sha256:9a155763035687f9394c213841951c4b329a0368233a04b7ad2c43d3b976d166:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:9a155763035687f9394c213841951c4b329a0368233a04b7ad2c43d3b976d166"
        occurred_at: "2026-09-24T19:08:42.786Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609241856-CCBDZ9"
        task_revision: 10
      -
        command_digest: "sha256:83808f9871a9b04d91c2a7b28cad02d1abeda7080bdfaa532fdfa43030463b4a"
        id: "validation-resolution:sha256:9da6e29160bbecff48e7ab793a00b540cc5fdb9189fbb056a77c9a64691edad8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:9da6e29160bbecff48e7ab793a00b540cc5fdb9189fbb056a77c9a64691edad8"
        occurred_at: "2026-09-24T19:08:44.752Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609241856-CCBDZ9"
        task_revision: 11
      -
        command_digest: "sha256:53319b2db6b94e0c7f925d1d104b4e621fd50722a937d5b09999c70bf5bfbd5c"
        id: "final-validation:sha256:680df403f52c992a3e62540c9eae951a31d10fcfc8482752cee20e64ff44ca7b:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:680df403f52c992a3e62540c9eae951a31d10fcfc8482752cee20e64ff44ca7b:11"
        occurred_at: "2026-09-24T19:19:14.956Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202609241856-CCBDZ9"
        task_revision: 12
      -
        command_digest: "sha256:02dfdc2ecea9c93e8e63f6e6cef22b9ae1e568f8ecc9ff485d23abf81427c00f"
        id: "kernel_task_completion_required:sha256:518a2dfff4de8bfd3750f7d6183b5d58a12bc5bc3f97697ef7a6ff1b78da72f8:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:518a2dfff4de8bfd3750f7d6183b5d58a12bc5bc3f97697ef7a6ff1b78da72f8:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        occurred_at: "2026-09-24T19:19:32.705Z"
        payload_digest: "sha256:ae743eab051bd6a1e4873e5dd9f9c4f11e55aba5a3ec2b0a285930130dc72fbd"
        task_id: "202609241856-CCBDZ9"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Make canonical final validation execute only approved Plan verification commands

Fix runKernelFinalValidation so legacy operational task.verify commands cannot be merged into canonical final validation after a replacement Plan. Preserve legacy direct-task verification behavior outside the canonical Kernel route. Add regression coverage for divergent legacy and canonical commands.

## Scope

- In scope: Fix runKernelFinalValidation so legacy operational task.verify commands cannot be merged into canonical final validation after a replacement Plan. Preserve legacy direct-task verification behavior outside the canonical Kernel route. Add regression coverage for divergent legacy and canonical commands.
- Out of scope: unrelated refactors not required for "Make canonical final validation execute only approved Plan verification commands".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run ci:local:fast`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-24T19:19:19.731Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0b94509903b4f56e7d5a72868ff6c90553b9ef6b7f6c36e3efa763910190fd8f, input_digest=sha256:5ead6eb8d90efb8bf2f7f21353e544baf56bff7e69220c1464460f1bc23c5600

Details:

Check: affected_unit_integration
Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:fast
Result: pass
Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:fast
Result: pass
Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check critical_paths (3/3)

Check: task_outcome
Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:fast
Result: pass
Evidence: .agentplane/tasks/202609241856-CCBDZ9/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609241856-CCBDZ9 Verification Contract check task_outcome (3/3)

NativeTaskIdentityRef:
- plan_digest: sha256:bf96272eb2a1ad43958b628e80d29619ff5df04272e0352fde4b8a05fb0a45e4
- policy_digest: sha256:1150ba6caefe9e829c30b3520b9246ed1ec7ebbeedbe788c63cf7989015dbb46
- capability_digest: sha256:f2f93935a83dceb80a450ec264e504489c4c1c9b33e401664f08190ae0c1aa23
- checks_digest: sha256:5c219b4f3373e9bee1d5ed2c43412e3cb6b40c765642746f92a7b396eea1b7ef
- identity_digest: sha256:90989774fa7b999aad28a281893eafac856f035675d9002408ddc60dee1b65ff

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609241856-CCBDZ9
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

## Token Usage

- State: `unavailable`
- Completeness: `0/0` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:09ede88e6880942c923dd48e61cc847c9392dd64ffb17545183180ac0dd393d7`
- Unavailable reason: `no_supervised_agent_runs`
- Updated at: `2026-09-24T19:22:04.223Z`
