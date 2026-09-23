---
id: "202609231152-HP97AA"
title: "Allow explicit USER rejection of an approved blocked canonical plan"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 17
origin:
  system: "manual"
depends_on: []
tags:
  - "authority-recovery"
  - "pre-0.7.12"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts packages/agentplane/src/commands/task/kernel-runtime-context.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-23T12:06:13.675Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-23T12:06:33.958Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-23T12:06:13.675Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "106b90ee0acbc3db8d0646a8824392caf9fc8701"
  review_identity_digest: "sha256:d4263248ca43a7fa9465cc5e09363fa5bbf2695617127fdafc7e08dbda7b7b0d"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609231152-HP97AA/83c858718bd16ed974b5cecfddcf5ef89c88ad61797c1ea597849fa7ebc953c4/quality-report.json"
  findings:
    - "Pass: reject_plan alone bypasses the lineage replacement guard, while the kernel reducer retains the exact approved-plan, ACTIVE, blocked-work, manual USER, and rejection-evidence conditions."
    - "Pass: capture_intent and propose_plan still throw before rejection, and propose_plan remains allowed only in PLANNING with a REJECTED current plan."
    - "Pass: the regression tests invoke the same exported guard used by createKernelRuntime.input, and all four AgentPlane-observed native checks passed against commit 106b90ee0acbc3db8d0646a8824392caf9fc8701."
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
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "network_read"
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
    external_effects: []
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
    authority_violations:
      - "repository_effect:tests"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
      - "packages/agentplane/src/commands/task/plan-reject.command.test.ts"
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
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:26485d693e8a72f8e84def46b13b595170e712892cdf6c7072f663211b0c7b2c"
      escalation_reasons: []
      execution_groups:
        - "core"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
          - "packages/agentplane/src/commands/task/plan-reject.command.test.ts"
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
  hash: "106b90ee0acbc3db8d0646a8824392caf9fc8701"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-09-23T12:06:33.958Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-09-23T12:06:35.013Z"
doc_updated_by: "SUPERVISOR"
description: "Fix the unreachable canonical replanning route: task plan reject currently treats reject_plan as planning but rejects it whenever USER authority lineage exists. Preserve USER authority and existing blocked implementation evidence, allow only the exact manual USER rejection path, and add a regression test that exercises the real runtime guard."
sections:
  Summary: |-
    Allow explicit USER rejection of an approved blocked canonical plan

    Fix the unreachable canonical replanning route: task plan reject currently treats reject_plan as planning but rejects it whenever USER authority lineage exists. Preserve USER authority and existing blocked implementation evidence, allow only the exact manual USER rejection path, and add a regression test that exercises the real runtime guard.
  Scope: |-
    - In scope: Fix the unreachable canonical replanning route: task plan reject currently treats reject_plan as planning but rejects it whenever USER authority lineage exists. Preserve USER authority and existing blocked implementation evidence, allow only the exact manual USER rejection path, and add a regression test that exercises the real runtime guard.
    - Out of scope: unrelated refactors not required for "Allow explicit USER rejection of an approved blocked canonical plan".
  Plan: "1. Execute approved WorkItem repair-approved-plan-rejection-route."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow explicit USER rejection of an approved blocked canonical plan". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow explicit USER rejection of an approved blocked canonical plan". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-23T12:06:33.958Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:668b26c89f2c5309417bc9c1b8e0c2bbe6e6a0ef115cd36c28c5071deaccc286, input_digest=sha256:d898c3faa200e733002c31f7aef2261de23daed3df041fdae94ac9792d3966e8

    Details:

    Check: affected_unit_integration
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts packages/agentplane/src/commands/task/kernel-runtime-context.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: bun run format:changed
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: bun run hotspots:check
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts packages/agentplane/src/commands/task/kernel-runtime-context.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: bun run format:changed
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: bun run hotspots:check
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check critical_paths (5/5)

    Check: task_outcome
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts packages/agentplane/src/commands/task/kernel-runtime-context.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: bun run format:changed
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: bun run hotspots:check
    Result: pass
    Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609231152-HP97AA Verification Contract check task_outcome (5/5)

    NativeTaskIdentityRef:
    - plan_digest: sha256:d46c4a8d16199b3f926fbe1e7bc6603d0f0240d81365b1c876c75c3e94e0fb73
    - policy_digest: sha256:1508520334b86880f4c7ebdff3696edff99bcc2f3bd0e31747a3b7da58bf1dd6
    - capability_digest: sha256:44668150af015035b4f9295eeb1e83a605e3c89b183ce28b4421a381c9bdb75f
    - checks_digest: sha256:46be63a181b477f7e54d121bc1d553426d324512c08aeefb0501b8cbfeb9d704
    - identity_digest: sha256:eace5f6ad0428049916fd7ba2cd7f5e659d2d540ecc7284878fc7c64dd880828

    DecisionContextRef:
    - operator_action: provider_action
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
  agentplane.kernel_operational_projection:
    digest: "sha256:8dc54b4e26a5f9e32883612ae90b6e0cd875e93704be0249237287e002784f8b"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609231152-HP97AA/83c858718bd16ed974b5cecfddcf5ef89c88ad61797c1ea597849fa7ebc953c4/quality-report.json"
    findings:
      - "Pass: reject_plan alone bypasses the lineage replacement guard, while the kernel reducer retains the exact approved-plan, ACTIVE, blocked-work, manual USER, and rejection-evidence conditions."
      - "Pass: capture_intent and propose_plan still throw before rejection, and propose_plan remains allowed only in PLANNING with a REJECTED current plan."
      - "Pass: the regression tests invoke the same exported guard used by createKernelRuntime.input, and all four AgentPlane-observed native checks passed against commit 106b90ee0acbc3db8d0646a8824392caf9fc8701."
    implementation_commit: "106b90ee0acbc3db8d0646a8824392caf9fc8701"
    implementation_tree: "646c69dd5ceec4731a267af9b1414ffcad046b5a"
    projected_at: "2026-09-23T12:06:13.675Z"
    review_identity_digest: "sha256:d4263248ca43a7fa9465cc5e09363fa5bbf2695617127fdafc7e08dbda7b7b0d"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:9f2be166b983bb94d4d3c5d93c011e21de5cc117f158303865f8e5e250e0ff02"
    work_order_id: "sha256:4e57d0eae4ea2a61174ca57e0fd53b7e596a41303db0fe1d41fcb38f79799629"
  task_execution_context:
    base_ref: "main"
    base_sha: "4d25a67cc233872b57c12b7fbaa6ceb84ed7d939"
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
              - "repository.read"
              - "repository.write"
              - "test.execute"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d40cd2e94159f19b85ab40260480c35184481a3dc0e8f221df1e00a874bb843d"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d46c4a8d16199b3f926fbe1e7bc6603d0f0240d81365b1c876c75c3e94e0fb73"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:2b55eee9f1f474f77733dc89663b787ab1f4e9a280582e7c6586ce39a377b2f2"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
              - "packages/agentplane/src/commands/task/plan-reject.command.test.ts"
            task_id: "202609231152-HP97AA"
            validation_requirements:
              - "bun run format:changed"
              - "bun run hotspots:check"
              - "bun run typecheck"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository.read"
              - "repository.write"
              - "test.execute"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:807d09661e468082ea7c740333c50a09568452db74842072d2d1b518d6a52b1b"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d46c4a8d16199b3f926fbe1e7bc6603d0f0240d81365b1c876c75c3e94e0fb73"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2b55eee9f1f474f77733dc89663b787ab1f4e9a280582e7c6586ce39a377b2f2"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:d40cd2e94159f19b85ab40260480c35184481a3dc0e8f221df1e00a874bb843d"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a8181ce1d8676e01504d23df03ae87ee62ebba94748e49b1ae2df2c7bc2fb277"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
              - "packages/agentplane/src/commands/task/plan-reject.command.test.ts"
            task_id: "202609231152-HP97AA"
            validation_requirements:
              - "bun run format:changed"
              - "bun run hotspots:check"
              - "bun run typecheck"
              - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
              - "packages/agentplane/src/commands/task/plan-reject.command.test.ts"
            evidence_digest: "sha256:85925c6ffdd822f1d4ea3b519af67e6f1d9ed71ab2537c2302b6254a3db4cddf"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:2b55eee9f1f474f77733dc89663b787ab1f4e9a280582e7c6586ce39a377b2f2"
        digest: "sha256:d46c4a8d16199b3f926fbe1e7bc6603d0f0240d81365b1c876c75c3e94e0fb73"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:694c0a348c1f80bdb50199d13e97ed1b648d6caffdf69701abb499e9b4b2c65a"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository.read"
                - "repository.write"
                - "test.execute"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
                - "packages/agentplane/src/commands/task/plan-reject.command.test.ts"
            expected_outputs:
              - "reachable-explicit-user-rejection"
              - "runtime-guard-regression-test"
            id: "repair-approved-plan-rejection-route"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:9f2be166b983bb94d4d3c5d93c011e21de5cc117f158303865f8e5e250e0ff02"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:223721dd9f43c432b5f2f424934c8e3669360095e52cd76fab43d7087a908ce0"
          environment_digest: "sha256:6a058226afe961d7a0780f984f1fcdd1e43fc3a5cb4f6ffd06012436607142b0"
          implementation_identity: "sha256:a8181ce1d8676e01504d23df03ae87ee62ebba94748e49b1ae2df2c7bc2fb277"
          toolchain_digest: "sha256:05be61b1f35f582d4b8d0806aa8c20112386ae7bbf6e913dcec99f19ffa199fb"
        observed_at: "2026-09-23T12:06:21.916Z"
        status: "PASSED"
      id: "202609231152-HP97AA"
      intent_digest: "sha256:1438f120c51563328c56e7d39ff7844efdebf29917dad8885d3492cdaaaec31e"
      migration_receipts: []
      mutation_receipts:
        capture:202609231152-HP97AA:
          after_revision: 1
          aggregate_digest: "sha256:8a8bde98cbd3b0eeab90c0ac1af4e9ce33ab012e46587d40592dd036eeba0988"
          before_revision: 0
          command_digest: "sha256:a51d863a783df6a7b13adee6bd2d3ee791b3ddaacafa00ebe3e49c26ce3752d9"
          effect_ids: []
          event_digests:
            - "sha256:3b3a74e7a3d973bed1634c05a4b1093781e3b9090c23ec014d581d920eb412ae"
          mutation_id: "capture:202609231152-HP97AA"
        final-validation:sha256:9f2be166b983bb94d4d3c5d93c011e21de5cc117f158303865f8e5e250e0ff02:11:
          after_revision: 12
          aggregate_digest: "sha256:05b6096329f5146bc4f883b7d7c73d7bf208035685d2357fc058f6537969331e"
          before_revision: 11
          command_digest: "sha256:09f293963c82b51f417d2d9f916735bad4cab6ff54b4eac0a942732f66dbafda"
          effect_ids: []
          event_digests:
            - "sha256:83cc78153d60f90d1581831ce691297f11ec5522409e2f0649a18ad7f81c7fc3"
          mutation_id: "final-validation:sha256:9f2be166b983bb94d4d3c5d93c011e21de5cc117f158303865f8e5e250e0ff02:11"
        kernel_task_completion_required:sha256:0f76c52cb93b485dbf75568b2fb7367cccabdc9832499318397c78750c981850:sha256:a8181ce1d8676e01504d23df03ae87ee62ebba94748e49b1ae2df2c7bc2fb277:
          after_revision: 13
          aggregate_digest: "sha256:1be50d3628426eafaaf33a787a3e0640ba15e8cca48fbb7bf699d7cf97705c30"
          before_revision: 12
          command_digest: "sha256:49472fc00d5c6e9867b74dfd490c7fce693177aafed4f5d69d103afd14e99cdf"
          effect_ids: []
          event_digests:
            - "sha256:219fd14e70ca2f0dac749d4ada996edf32b168039a641a22e36165fcf5c0ae79"
          mutation_id: "kernel_task_completion_required:sha256:0f76c52cb93b485dbf75568b2fb7367cccabdc9832499318397c78750c981850:sha256:a8181ce1d8676e01504d23df03ae87ee62ebba94748e49b1ae2df2c7bc2fb277"
        kernel_work_item_claim_required:sha256:3e5f4293fe980b7198cd14e00255ce5378848fd47f95edde00e985a57d13d0bd:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:
          after_revision: 5
          aggregate_digest: "sha256:600744a74889b702b9d5dd32a28e3f30460f83d1aab2327f4f8d95ddd5b28844"
          before_revision: 4
          command_digest: "sha256:902882246f3f37accccefb994986d575d2229e693e1f650fe00f456f0287cd29"
          effect_ids: []
          event_digests:
            - "sha256:3f276f1f66f3e9dcbe120282eb9faa5c4ad169fa5dd39a8730e77fedddf7d9b3"
          mutation_id: "kernel_work_item_claim_required:sha256:3e5f4293fe980b7198cd14e00255ce5378848fd47f95edde00e985a57d13d0bd:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        kernel_work_item_execution_required:sha256:27feb96d0237a15e379ef183304cc0e2c35b42bb022c3885529192f4d3bf3dba:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:
          after_revision: 6
          aggregate_digest: "sha256:63f9aa3a16bde4b985f69593a05943ca370cdde84763f9e278b9879a6569324c"
          before_revision: 5
          command_digest: "sha256:38651d69079cf1c3181a48da47b428633965be7c9ecccd6961b395212618d354"
          effect_ids: []
          event_digests:
            - "sha256:e960769e448e33cf6cbd5d187e80de3c52c1d48c49c1053000fc92d82ad1c518"
          mutation_id: "kernel_work_item_execution_required:sha256:27feb96d0237a15e379ef183304cc0e2c35b42bb022c3885529192f4d3bf3dba:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        kernel_work_item_inspection_required:sha256:259208de37dab03adee138df2392516c681e0bebecbc93ecd19b73eadc4d60f9:sha256:a8181ce1d8676e01504d23df03ae87ee62ebba94748e49b1ae2df2c7bc2fb277:
          after_revision: 9
          aggregate_digest: "sha256:7064ef561c51ac02d1f1ada7a465c5ef8c63afe14e2feef510a3812940e0c60a"
          before_revision: 8
          command_digest: "sha256:d4390816ac95070c277aec90b8fb02937cb2bc65a0c855b2a1640f5abe59debd"
          effect_ids: []
          event_digests:
            - "sha256:fd527bdcd675dfa1975e46cf5ba66c703f55e5a9ef8c6399fdd608d3a6e64c61"
          mutation_id: "kernel_work_item_inspection_required:sha256:259208de37dab03adee138df2392516c681e0bebecbc93ecd19b73eadc4d60f9:sha256:a8181ce1d8676e01504d23df03ae87ee62ebba94748e49b1ae2df2c7bc2fb277"
        kernel_work_item_materialization_required:sha256:0f0b5dfb3936205465316537ce7b2dfd2902931d13e1731c830c3baa9cb042d5:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:
          after_revision: 4
          aggregate_digest: "sha256:116b493a22bc97096100eb5da205c0d6fa255d7277711ecedd4f40dc00031377"
          before_revision: 3
          command_digest: "sha256:811aae63b216483a5e6ecfeed3177cb642bd2e65b834423250c8615e5c6ef376"
          effect_ids: []
          event_digests:
            - "sha256:c4f79514f92ae9866693a713a0b8a8f5d9d6fdf992c95ffefc1599287c289840"
          mutation_id: "kernel_work_item_materialization_required:sha256:0f0b5dfb3936205465316537ce7b2dfd2902931d13e1731c830c3baa9cb042d5:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        result:sha256:4e57d0eae4ea2a61174ca57e0fd53b7e596a41303db0fe1d41fcb38f79799629:
          after_revision: 8
          aggregate_digest: "sha256:445f86568b4b5af68ad23dbca591b19c3392d74ca4f72cae12d318fcf772e31d"
          before_revision: 7
          command_digest: "sha256:3e6588890b330eb854e8832c2edc17f434bb44a57094f2a6874fd625b78f6c12"
          effect_ids: []
          event_digests:
            - "sha256:d417408c8db54147b9b26b51f681e22acf2b5ab47f2d976078e1e3a5346ab1a1"
          mutation_id: "result:sha256:4e57d0eae4ea2a61174ca57e0fd53b7e596a41303db0fe1d41fcb38f79799629"
        result:sha256:8b514c3f71a35555ca488ba828d7351f2a3c5d8090d86d727904f47cd69972ce:
          after_revision: 2
          aggregate_digest: "sha256:88e21f5f08444e1c108702781f448921e5fd04c67c74fa483b358351b65647df"
          before_revision: 1
          command_digest: "sha256:864b3e015f77528610d24404c2903638fe3ad9930681d7914bbf841611992d4c"
          effect_ids: []
          event_digests:
            - "sha256:225ae439e9ad5ade7a2fc4fb9d69f1243f086ca33db5e1dfd564ae69fd294d84"
          mutation_id: "result:sha256:8b514c3f71a35555ca488ba828d7351f2a3c5d8090d86d727904f47cd69972ce"
        sha256:3d9ad9f41794a8940e2cb7d4ca902116c459e42a8b4f540d6939f7607c950580:
          after_revision: 3
          aggregate_digest: "sha256:7d3f2714e6f62ea3ecdddd834f25bccdec3ca06190fc574aaa5c7dbb08166708"
          before_revision: 2
          command_digest: "sha256:37c22f8d787dc6b7f21ebaf22ffa9bd725945f7373f6c9410febe6f646453378"
          effect_ids: []
          event_digests:
            - "sha256:50a686e0f7a75545761b03af9df5411a18f30e11a8eee9eaf97552f314d01471"
          mutation_id: "sha256:3d9ad9f41794a8940e2cb7d4ca902116c459e42a8b4f540d6939f7607c950580"
        sha256:f4ef7b6db2d6975e267806100c7dd9413a1eeefd1f21bc67b409a18001914f59:
          after_revision: 7
          aggregate_digest: "sha256:52eedf1908b954707236113639e7922e255420a5104e9a60d80ea66c099430da"
          before_revision: 6
          command_digest: "sha256:9cca8536ea4347d3d93132536ffd6967f7ea4a4bb458ad578faaad74d929527a"
          effect_ids: []
          event_digests:
            - "sha256:7be76e2b004a48ffe8bcd6f7916e54a99b6444e380df88b523354179f0222e16"
          mutation_id: "sha256:f4ef7b6db2d6975e267806100c7dd9413a1eeefd1f21bc67b409a18001914f59"
        validation-resolution:sha256:653c4d8c8f0e0abfabb6049c2631622d72ff5bc97ae6fbe6254dd63ebdde5688:
          after_revision: 11
          aggregate_digest: "sha256:be288150e9c129c9ef95b0f9157de2646b003d69a9bcbbc0ed5fed0e378424f2"
          before_revision: 10
          command_digest: "sha256:5fb384133254832a7463a37549c84e4e9466af3689514a5ef3d051de27917374"
          effect_ids: []
          event_digests:
            - "sha256:b4759472dabf657f57055ef4ecc075fdeba3589d617ecb601d347867745ab20b"
          mutation_id: "validation-resolution:sha256:653c4d8c8f0e0abfabb6049c2631622d72ff5bc97ae6fbe6254dd63ebdde5688"
        validation:sha256:83c858718bd16ed974b5cecfddcf5ef89c88ad61797c1ea597849fa7ebc953c4:
          after_revision: 10
          aggregate_digest: "sha256:5f57f18131593a3014fced13c7519793b35db0f9a01b3df63086e74b759b2859"
          before_revision: 9
          command_digest: "sha256:e8a430d26fd152316524b53448f8d4cdf45917c24661023bf8b0c68b432c94da"
          effect_ids: []
          event_digests:
            - "sha256:74ae7c54b26156ec165f173d2298cf08701b1d499b194c97e6d0bd6b68812655"
          mutation_id: "validation:sha256:83c858718bd16ed974b5cecfddcf5ef89c88ad61797c1ea597849fa7ebc953c4"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "COMPLETED"
      work_items:
        repair-approved-plan-rejection-route:
          attempt: 1
          claim_id: "sha256:8eb8e6496983299f353c65cc06f240c9dcf5be73a0de2e20f12499cd410a0fd7"
          definition:
            contract_digest: "sha256:694c0a348c1f80bdb50199d13e97ed1b648d6caffdf69701abb499e9b4b2c65a"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository.read"
                - "repository.write"
                - "test.execute"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
                - "packages/agentplane/src/commands/task/plan-reject.command.test.ts"
            expected_outputs:
              - "reachable-explicit-user-rejection"
              - "runtime-guard-regression-test"
            id: "repair-approved-plan-rejection-route"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:79096b4216c1757705694a5a22b40b79fefc2ccb4153c8548afd819a1c6aaf37"
              id: "reachable-explicit-user-rejection"
              kind: "source_change"
              plan_revision: 1
              repository_fingerprint: "sha256:a8181ce1d8676e01504d23df03ae87ee62ebba94748e49b1ae2df2c7bc2fb277"
              task_id: "202609231152-HP97AA"
              work_item_id: "repair-approved-plan-rejection-route"
            -
              attempt: 1
              digest: "sha256:e79d7de86de15d670b6eac05cdf4562998a681b00cf963b5caca69a8b8dc1cb5"
              id: "runtime-guard-regression-test"
              kind: "test_change"
              plan_revision: 1
              repository_fingerprint: "sha256:a8181ce1d8676e01504d23df03ae87ee62ebba94748e49b1ae2df2c7bc2fb277"
              task_id: "202609231152-HP97AA"
              work_item_id: "repair-approved-plan-rejection-route"
          result_digest: "sha256:0db34489f3a69d39f90fd9d4e5865d54b969a42a617059b6a5a50b0bb709e851"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:3fb81b60494321087f05dbb60db31b523cad731497661f6d1a5081bd7897664e"
              - "sha256:d4263248ca43a7fa9465cc5e09363fa5bbf2695617127fdafc7e08dbda7b7b0d"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:223721dd9f43c432b5f2f424934c8e3669360095e52cd76fab43d7087a908ce0"
              environment_digest: "sha256:e178b3e3e456cd12a11b5f1ae9def2e98a7a0eb66dfc13c80bfc607a6609b60f"
              implementation_identity: "sha256:0db34489f3a69d39f90fd9d4e5865d54b969a42a617059b6a5a50b0bb709e851"
              toolchain_digest: "sha256:2ed0aa02d9a22d48eeb418f30f139ab31dd44db476e35a34e1aee6839e3530c2"
            observed_at: "2026-09-23T12:06:13.675Z"
            status: "PASSED"
    digest: "sha256:9530bc8fa801ee56e9aa91765f4d345ec2557c7dd81b276a767d2dd69de6182c"
    documents:
      contracts:
        sha256:694c0a348c1f80bdb50199d13e97ed1b648d6caffdf69701abb499e9b4b2c65a:
          acceptance_criteria:
            - "task plan reject reaches the kernel reducer for an approved ACTIVE plan with blocked work and existing USER authority lineage."
            - "capture_intent and propose_plan remain forbidden from replacing canonical USER authority except for the existing post-rejection replacement-plan route."
            - "A regression test exercises the real runtime input guard instead of mocking it away."
          objective: "Allow the exact manual USER reject_plan command to pass the planning authority guard when the kernel reducer permits approved blocked-plan replanning, without allowing capture_intent or propose_plan to replace canonical USER authority."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts"
            - "bun run typecheck"
            - "bun run format:changed"
            - "bun run hotspots:check"
      intent:
        context: "Fix the unreachable canonical replanning route: task plan reject currently treats reject_plan as planning but rejects it whenever USER authority lineage exists. Preserve USER authority and existing blocked implementation evidence, allow only the exact manual USER rejection path, and add a regression test that exercises the real runtime guard."
        objective: "Allow explicit USER rejection of an approved blocked canonical plan"
    events:
      -
        command_digest: "sha256:a51d863a783df6a7b13adee6bd2d3ee791b3ddaacafa00ebe3e49c26ce3752d9"
        id: "capture:202609231152-HP97AA:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609231152-HP97AA"
        occurred_at: "2026-09-23T11:52:57.266Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609231152-HP97AA"
        task_revision: 1
      -
        command_digest: "sha256:864b3e015f77528610d24404c2903638fe3ad9930681d7914bbf841611992d4c"
        id: "result:sha256:8b514c3f71a35555ca488ba828d7351f2a3c5d8090d86d727904f47cd69972ce:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:8b514c3f71a35555ca488ba828d7351f2a3c5d8090d86d727904f47cd69972ce"
        occurred_at: "2026-09-23T11:54:48.221Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609231152-HP97AA"
        task_revision: 2
      -
        command_digest: "sha256:37c22f8d787dc6b7f21ebaf22ffa9bd725945f7373f6c9410febe6f646453378"
        id: "sha256:3d9ad9f41794a8940e2cb7d4ca902116c459e42a8b4f540d6939f7607c950580:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:3d9ad9f41794a8940e2cb7d4ca902116c459e42a8b4f540d6939f7607c950580"
        occurred_at: "2026-09-23T11:58:39.721Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609231152-HP97AA"
        task_revision: 3
      -
        command_digest: "sha256:811aae63b216483a5e6ecfeed3177cb642bd2e65b834423250c8615e5c6ef376"
        id: "kernel_work_item_materialization_required:sha256:0f0b5dfb3936205465316537ce7b2dfd2902931d13e1731c830c3baa9cb042d5:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:0f0b5dfb3936205465316537ce7b2dfd2902931d13e1731c830c3baa9cb042d5:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        occurred_at: "2026-09-23T11:58:50.055Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609231152-HP97AA"
        task_revision: 4
      -
        command_digest: "sha256:902882246f3f37accccefb994986d575d2229e693e1f650fe00f456f0287cd29"
        id: "kernel_work_item_claim_required:sha256:3e5f4293fe980b7198cd14e00255ce5378848fd47f95edde00e985a57d13d0bd:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:3e5f4293fe980b7198cd14e00255ce5378848fd47f95edde00e985a57d13d0bd:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        occurred_at: "2026-09-23T11:58:53.781Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609231152-HP97AA"
        task_revision: 5
      -
        command_digest: "sha256:38651d69079cf1c3181a48da47b428633965be7c9ecccd6961b395212618d354"
        id: "kernel_work_item_execution_required:sha256:27feb96d0237a15e379ef183304cc0e2c35b42bb022c3885529192f4d3bf3dba:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:27feb96d0237a15e379ef183304cc0e2c35b42bb022c3885529192f4d3bf3dba:sha256:84d59b3bcc5b2cd40f5981849fa1290a403f7ef239b5e0d8a661f5576196981f"
        occurred_at: "2026-09-23T11:59:16.131Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609231152-HP97AA"
        task_revision: 6
      -
        command_digest: "sha256:9cca8536ea4347d3d93132536ffd6967f7ea4a4bb458ad578faaad74d929527a"
        id: "sha256:f4ef7b6db2d6975e267806100c7dd9413a1eeefd1f21bc67b409a18001914f59:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:f4ef7b6db2d6975e267806100c7dd9413a1eeefd1f21bc67b409a18001914f59"
        occurred_at: "2026-09-23T12:04:52.447Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609231152-HP97AA"
        task_revision: 7
      -
        command_digest: "sha256:3e6588890b330eb854e8832c2edc17f434bb44a57094f2a6874fd625b78f6c12"
        id: "result:sha256:4e57d0eae4ea2a61174ca57e0fd53b7e596a41303db0fe1d41fcb38f79799629:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:4e57d0eae4ea2a61174ca57e0fd53b7e596a41303db0fe1d41fcb38f79799629"
        occurred_at: "2026-09-23T12:04:56.724Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609231152-HP97AA"
        task_revision: 8
      -
        command_digest: "sha256:d4390816ac95070c277aec90b8fb02937cb2bc65a0c855b2a1640f5abe59debd"
        id: "kernel_work_item_inspection_required:sha256:259208de37dab03adee138df2392516c681e0bebecbc93ecd19b73eadc4d60f9:sha256:a8181ce1d8676e01504d23df03ae87ee62ebba94748e49b1ae2df2c7bc2fb277:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:259208de37dab03adee138df2392516c681e0bebecbc93ecd19b73eadc4d60f9:sha256:a8181ce1d8676e01504d23df03ae87ee62ebba94748e49b1ae2df2c7bc2fb277"
        occurred_at: "2026-09-23T12:05:00.060Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609231152-HP97AA"
        task_revision: 9
      -
        command_digest: "sha256:e8a430d26fd152316524b53448f8d4cdf45917c24661023bf8b0c68b432c94da"
        id: "validation:sha256:83c858718bd16ed974b5cecfddcf5ef89c88ad61797c1ea597849fa7ebc953c4:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:83c858718bd16ed974b5cecfddcf5ef89c88ad61797c1ea597849fa7ebc953c4"
        occurred_at: "2026-09-23T12:06:16.844Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609231152-HP97AA"
        task_revision: 10
      -
        command_digest: "sha256:5fb384133254832a7463a37549c84e4e9466af3689514a5ef3d051de27917374"
        id: "validation-resolution:sha256:653c4d8c8f0e0abfabb6049c2631622d72ff5bc97ae6fbe6254dd63ebdde5688:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:653c4d8c8f0e0abfabb6049c2631622d72ff5bc97ae6fbe6254dd63ebdde5688"
        occurred_at: "2026-09-23T12:06:18.773Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609231152-HP97AA"
        task_revision: 11
      -
        command_digest: "sha256:09f293963c82b51f417d2d9f916735bad4cab6ff54b4eac0a942732f66dbafda"
        id: "final-validation:sha256:9f2be166b983bb94d4d3c5d93c011e21de5cc117f158303865f8e5e250e0ff02:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:9f2be166b983bb94d4d3c5d93c011e21de5cc117f158303865f8e5e250e0ff02:11"
        occurred_at: "2026-09-23T12:06:28.996Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202609231152-HP97AA"
        task_revision: 12
      -
        command_digest: "sha256:49472fc00d5c6e9867b74dfd490c7fce693177aafed4f5d69d103afd14e99cdf"
        id: "kernel_task_completion_required:sha256:0f76c52cb93b485dbf75568b2fb7367cccabdc9832499318397c78750c981850:sha256:a8181ce1d8676e01504d23df03ae87ee62ebba94748e49b1ae2df2c7bc2fb277:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:0f76c52cb93b485dbf75568b2fb7367cccabdc9832499318397c78750c981850:sha256:a8181ce1d8676e01504d23df03ae87ee62ebba94748e49b1ae2df2c7bc2fb277"
        occurred_at: "2026-09-23T12:07:20.687Z"
        payload_digest: "sha256:ae743eab051bd6a1e4873e5dd9f9c4f11e55aba5a3ec2b0a285930130dc72fbd"
        task_id: "202609231152-HP97AA"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Allow explicit USER rejection of an approved blocked canonical plan

Fix the unreachable canonical replanning route: task plan reject currently treats reject_plan as planning but rejects it whenever USER authority lineage exists. Preserve USER authority and existing blocked implementation evidence, allow only the exact manual USER rejection path, and add a regression test that exercises the real runtime guard.

## Scope

- In scope: Fix the unreachable canonical replanning route: task plan reject currently treats reject_plan as planning but rejects it whenever USER authority lineage exists. Preserve USER authority and existing blocked implementation evidence, allow only the exact manual USER rejection path, and add a regression test that exercises the real runtime guard.
- Out of scope: unrelated refactors not required for "Allow explicit USER rejection of an approved blocked canonical plan".

## Plan

1. Execute approved WorkItem repair-approved-plan-rejection-route.

## Verify Steps

PLANNER fallback scaffold for "Allow explicit USER rejection of an approved blocked canonical plan". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow explicit USER rejection of an approved blocked canonical plan". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-23T12:06:33.958Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:668b26c89f2c5309417bc9c1b8e0c2bbe6e6a0ef115cd36c28c5071deaccc286, input_digest=sha256:d898c3faa200e733002c31f7aef2261de23daed3df041fdae94ac9792d3966e8

Details:

Check: affected_unit_integration
Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts packages/agentplane/src/commands/task/kernel-runtime-context.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609231152-HP97AA Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609231152-HP97AA Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609231152-HP97AA Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: bun run format:changed
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609231152-HP97AA Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: bun run hotspots:check
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609231152-HP97AA Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts packages/agentplane/src/commands/task/kernel-runtime-context.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609231152-HP97AA Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609231152-HP97AA Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609231152-HP97AA Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: bun run format:changed
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609231152-HP97AA Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: bun run hotspots:check
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609231152-HP97AA Verification Contract check critical_paths (5/5)

Check: task_outcome
Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts packages/agentplane/src/commands/task/kernel-runtime-context.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609231152-HP97AA Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-reject.command.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609231152-HP97AA Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609231152-HP97AA Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: bun run format:changed
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609231152-HP97AA Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: bun run hotspots:check
Result: pass
Evidence: .agentplane/tasks/202609231152-HP97AA/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609231152-HP97AA Verification Contract check task_outcome (5/5)

NativeTaskIdentityRef:
- plan_digest: sha256:d46c4a8d16199b3f926fbe1e7bc6603d0f0240d81365b1c876c75c3e94e0fb73
- policy_digest: sha256:1508520334b86880f4c7ebdff3696edff99bcc2f3bd0e31747a3b7da58bf1dd6
- capability_digest: sha256:44668150af015035b4f9295eeb1e83a605e3c89b183ce28b4421a381c9bdb75f
- checks_digest: sha256:46be63a181b477f7e54d121bc1d553426d324512c08aeefb0501b8cbfeb9d704
- identity_digest: sha256:eace5f6ad0428049916fd7ba2cd7f5e659d2d540ecc7284878fc7c64dd880828

DecisionContextRef:
- operator_action: provider_action
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
