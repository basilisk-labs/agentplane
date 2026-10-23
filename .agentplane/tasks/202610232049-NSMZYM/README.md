---
id: "202610232049-NSMZYM"
title: "Preserve linked-worktree observation context for canonical primary-stored tasks"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 19
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run format:check"
  - "bun run lint:core"
  - "bun x vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-23T21:14:43.084Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-23T22:00:32.662Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-23T21:14:22.629Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "dc12ebc188f10d41bd15037e7e1f0b530fa054d7"
  review_identity_digest: "sha256:2c6ae03fbed1b7dcfcce184bb7e356f14935d15ca9c4dcb5d1611bd55a2f8600"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610232049-NSMZYM/c6e8e90c7a6149e774d6cec3b3739e9ffa06ebb6b74d8caf9681c8b235073027/quality-report.json"
  findings:
    - "Native repository evidence binds the implementation to two changed source/test paths and commit dc12ebc188f10d41bd15037e7e1f0b530fa054d7."
    - "Native declared validation passed all three commands: focused Vitest 31/31, Prettier format, ESLint with 0 errors."
    - "The code requires a canonical task record in the linked checkout before preserving its observation root, so an older checkout without the task continues to route to primary."
    - "Explicit base resolution and task-branch owner routing precede or bypass the new fallback; existing test matrix passes. No Factory-specific condition or weakened assertion is present."
    - "Separate independent exact-commit reviewer reported PASS with no P0/P1 findings."
token_usage:
  agent_runs: 0
  cached_input_observed_agent_runs: 0
  cached_input_tokens: null
  input_tokens: null
  journal_digest: "sha256:09b89729054506d4922008e3cc0aab09b0d2286f51e826e04c8e2c4ae773c194"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "no_supervised_agent_runs"
  updated_at: "2026-10-23T22:05:17.925Z"
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
      - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.ts"
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
      - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
          - "packages/agentplane/src/commands/shared/task-backend.test.ts"
          - "packages/agentplane/src/commands/shared/task-backend.ts"
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
      digest: "sha256:0cadc6f697b0916272f2c1b3798b2bd37521e6dfc6900b98f5568af629915532"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-backend.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-backend.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-backend.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
          - "packages/agentplane/src/commands/shared/task-backend.ts"
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
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "6261daf29548b3567d9eeb7e5da1435f0ad1489d"
  message: "✅ NSMZYM task: preserve linked-worktree observation context for canonical..."
comments:
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "verify"
    at: "2026-10-23T22:00:32.662Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
  -
    type: "status"
    at: "2026-10-23T22:05:17.925Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "6261daf29548b3567d9eeb7e5da1435f0ad1489d"
doc_version: 3
doc_updated_at: "2026-10-23T22:05:17.925Z"
doc_updated_by: "CODER"
description: "Release 0.7.13 blocker: focused run-cli.core.kernel-transport.test.ts fails because resolveTaskCommandContext returns the primary checkout when a canonical Kernel task is stored there but invoked from a linked worktree without its own task branch. Keep canonical backend storage primary while preserving the invocation linked gitRoot and WorkOrder context. Preserve explicit-base routing and owner task-branch routing. Add focused regression coverage. Do not add Factory-specific behavior or weaken tests."
sections:
  Summary: |-
    Preserve linked-worktree observation context for canonical primary-stored tasks

    Release 0.7.13 blocker: focused run-cli.core.kernel-transport.test.ts fails because resolveTaskCommandContext returns the primary checkout when a canonical Kernel task is stored there but invoked from a linked worktree without its own task branch. Keep canonical backend storage primary while preserving the invocation linked gitRoot and WorkOrder context. Preserve explicit-base routing and owner task-branch routing. Add focused regression coverage. Do not add Factory-specific behavior or weaken tests.
  Scope: |-
    - In scope: Release 0.7.13 blocker: focused run-cli.core.kernel-transport.test.ts fails because resolveTaskCommandContext returns the primary checkout when a canonical Kernel task is stored there but invoked from a linked worktree without its own task branch. Keep canonical backend storage primary while preserving the invocation linked gitRoot and WorkOrder context. Preserve explicit-base routing and owner task-branch routing. Add focused regression coverage. Do not add Factory-specific behavior or weaken tests.
    - Out of scope: unrelated refactors not required for "Preserve linked-worktree observation context for canonical primary-stored tasks".
  Plan: "1. Execute approved WorkItem preserve-linked-observation-context."
  Verify Steps: |-
    PLANNER fallback scaffold for "Preserve linked-worktree observation context for canonical primary-stored tasks". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Preserve linked-worktree observation context for canonical primary-stored tasks". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-23T22:00:32.662Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d7fb42c23f89378e8317b73be46dc3973184fe4974c69bc1fae0250b95bda5b4, input_digest=sha256:aba1c02fa5d6b6fe260a90d96931eaf4f666057a59fc01f0a709f20330324225

    Details:

    Check: affected_unit_integration
    Command: bun x vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610232049-NSMZYM Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610232049-NSMZYM Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610232049-NSMZYM Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610232049-NSMZYM Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun x vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610232049-NSMZYM Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610232049-NSMZYM Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610232049-NSMZYM Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610232049-NSMZYM Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610232049-NSMZYM Verification Contract check full_regression

    Check: task_outcome
    Command: bun x vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610232049-NSMZYM Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610232049-NSMZYM Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610232049-NSMZYM Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610232049-NSMZYM Verification Contract check task_outcome (4/4)

    NativeTaskIdentityRef:
    - plan_digest: sha256:d9432018657291270ea8730bbf19da817627c83dac94b24d3b250f776ac2cebc
    - policy_digest: sha256:1150ba6caefe9e829c30b3520b9246ed1ec7ebbeedbe788c63cf7989015dbb46
    - capability_digest: sha256:b12b803e4385ff89b8eb92a6efcac159978af918fec3dd0a5b31bff4696091fd
    - checks_digest: sha256:a1f3ae385e76f5bf0af9bd9f650e5d1113aa366d55d86660f35f6699ef959283
    - identity_digest: sha256:06b505bcfde7651560def606a44c8de903676b3a5ab2584232cfbe53cd7b3776

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610232049-NSMZYM
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
    digest: "sha256:7b97a1250e6f2a5411ee0b457fa610ca6b92d11e50ea37c0bd2a04421f22c38e"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610232049-NSMZYM/c6e8e90c7a6149e774d6cec3b3739e9ffa06ebb6b74d8caf9681c8b235073027/quality-report.json"
    findings:
      - "Native repository evidence binds the implementation to two changed source/test paths and commit dc12ebc188f10d41bd15037e7e1f0b530fa054d7."
      - "Native declared validation passed all three commands: focused Vitest 31/31, Prettier format, ESLint with 0 errors."
      - "The code requires a canonical task record in the linked checkout before preserving its observation root, so an older checkout without the task continues to route to primary."
      - "Explicit base resolution and task-branch owner routing precede or bypass the new fallback; existing test matrix passes. No Factory-specific condition or weakened assertion is present."
      - "Separate independent exact-commit reviewer reported PASS with no P0/P1 findings."
    implementation_commit: "dc12ebc188f10d41bd15037e7e1f0b530fa054d7"
    implementation_tree: "43c52ff636382ac161e1958e69454eca6a81e473"
    projected_at: "2026-10-23T21:14:22.629Z"
    review_identity_digest: "sha256:2c6ae03fbed1b7dcfcce184bb7e356f14935d15ca9c4dcb5d1611bd55a2f8600"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:c51eede7e59d6163978bcd6846f0ceccafcaef1a5676e584b654db4b47861419"
    work_order_id: "sha256:cf946a5023b284dddab535fdbef8fc8bb6496ca433ed4608552e9068102a197a"
  implementation_commit:
    hash: "dc12ebc188f10d41bd15037e7e1f0b530fa054d7"
    message: "🚧 NSMZYM task: apply canonical agent result"
  task_execution_context:
    base_ref: "main"
    base_sha: "d26d3b9db612abacec93dcfe7ae1371816453236"
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
            digest: "sha256:9a1c4ffd4ca8e12f7fd62c893cb7c69a2b611493a286f0433f662415ce15f5eb"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d9432018657291270ea8730bbf19da817627c83dac94b24d3b250f776ac2cebc"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2e3c3b36a3350c2866d968969c712b47ddd754939479602cbd84c25874f13263"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/commands/shared/task-backend.test.ts"
              - "packages/agentplane/src/commands/shared/task-backend.ts"
            task_id: "202610232049-NSMZYM"
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
            digest: "sha256:298c830527769460c76942a5bfb534c980e1759757b017e16820719a27b2d79a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d9432018657291270ea8730bbf19da817627c83dac94b24d3b250f776ac2cebc"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2e3c3b36a3350c2866d968969c712b47ddd754939479602cbd84c25874f13263"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:9a1c4ffd4ca8e12f7fd62c893cb7c69a2b611493a286f0433f662415ce15f5eb"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/commands/shared/task-backend.test.ts"
              - "packages/agentplane/src/commands/shared/task-backend.ts"
            task_id: "202610232049-NSMZYM"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
              - "packages/agentplane/src/commands/shared/task-backend.ts"
            evidence_digest: "sha256:3efc27438c5d5100b1aec0532297d5d19d03078675a842ce19474b1af710dd11"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:2e3c3b36a3350c2866d968969c712b47ddd754939479602cbd84c25874f13263"
        digest: "sha256:d9432018657291270ea8730bbf19da817627c83dac94b24d3b250f776ac2cebc"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:95a578e6c7fc31b7acd6b623104401597749e5b3f1268f2170d68e81d26a2e07"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared/task-backend.ts"
                - "packages/agentplane/src/commands/shared/task-backend.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
            expected_outputs:
              - "linked-context-routing-fix"
              - "focused-regression-evidence"
            id: "preserve-linked-observation-context"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:c51eede7e59d6163978bcd6846f0ceccafcaef1a5676e584b654db4b47861419"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:9800e96eb15024201ae73045403f91e27f182293fdf4c72d58c428c3c0a1315f"
          environment_digest: "sha256:dec59dc19cadbebe451c6a7edcf1be6367299e05151d32f7a08c04a90c94e26d"
          implementation_identity: "sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
          toolchain_digest: "sha256:2b8b7b8b50df46cb034feced245b31af8ede803a9ca057c0f838f6b4bf148cd0"
        observed_at: "2026-10-23T21:14:45.281Z"
        status: "PASSED"
      id: "202610232049-NSMZYM"
      intent_digest: "sha256:92f9de4cd4054334ca6c819faf241d046dd9b56014eaf5b66a7bd65b34dcdf49"
      migration_receipts: []
      mutation_receipts:
        capture:202610232049-NSMZYM:
          after_revision: 1
          aggregate_digest: "sha256:41d56f794f787a02892026b51faed10ec6f81fcab94c91a5680a5d875c58127f"
          before_revision: 0
          command_digest: "sha256:0acf3d63391e2408973c012f89f207f3734d57a267eec6cfd0ab165d5b37da0a"
          effect_ids: []
          event_digests:
            - "sha256:9eb0d3569205e128fa44e80a49285275cd902f5f6773e1defe511d0872c1d008"
          mutation_id: "capture:202610232049-NSMZYM"
        final-validation:sha256:c51eede7e59d6163978bcd6846f0ceccafcaef1a5676e584b654db4b47861419:11:
          after_revision: 12
          aggregate_digest: "sha256:1d4077fa84a0f3e2e302d295665d1c3821e74f76d1ff01438f4f2388a2ab3344"
          before_revision: 11
          command_digest: "sha256:f621fee7a3474928d9772730645a81b17698db9274e27a9a61949f76aa879755"
          effect_ids: []
          event_digests:
            - "sha256:04a39839bf932ca848dce87bb790827dabf9162098e8fc5ef881c71537807727"
          mutation_id: "final-validation:sha256:c51eede7e59d6163978bcd6846f0ceccafcaef1a5676e584b654db4b47861419:11"
        kernel_task_completion_required:sha256:6cfe717193412d1437d9c0753fb5ed4dba79813c38df009aeff023998cbad66a:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55:
          after_revision: 13
          aggregate_digest: "sha256:301b71383a2d5965da1f397c7e14d29ae2aae2cf61f4ce014abac47dd8eaf1b5"
          before_revision: 12
          command_digest: "sha256:980fc4932958c208623eab1c7a94d232dcd4583c5d2455f0f032e10b4f715b8a"
          effect_ids: []
          event_digests:
            - "sha256:583acc9cfc9ff4b22197327a7e0afdf910aa5a841180309b81cf6899872412e1"
          mutation_id: "kernel_task_completion_required:sha256:6cfe717193412d1437d9c0753fb5ed4dba79813c38df009aeff023998cbad66a:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
        kernel_work_item_claim_required:sha256:95c2a98e099e49d5cdd2fe4ceb4830e31f4a21b60797a960799d4c19886081d6:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1:
          after_revision: 5
          aggregate_digest: "sha256:d1f3ff87ea81db237b19298cb586589141d1daf31aa2e6a22cba842f8d850b71"
          before_revision: 4
          command_digest: "sha256:136396eefc9f2f9669c8bafd95f95234f6ed9eb657e5a274f5b8e8b3c0fcd941"
          effect_ids: []
          event_digests:
            - "sha256:b98fdb1471a103ffce6c9d4b6e5658556cee214c896028f3bed64272849b7763"
          mutation_id: "kernel_work_item_claim_required:sha256:95c2a98e099e49d5cdd2fe4ceb4830e31f4a21b60797a960799d4c19886081d6:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
        kernel_work_item_execution_required:sha256:6865761db9be9c618b4cb8099c87f646390b5bca70d1948dae611751966dc8f5:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1:
          after_revision: 6
          aggregate_digest: "sha256:6a1fa4f272ea5c60288dba90b832c460b409201dba7ed2b17651afabf8bd1363"
          before_revision: 5
          command_digest: "sha256:4aff0e5530a925e89469196e46d4de325fb463034856497295f794767d69fe7c"
          effect_ids: []
          event_digests:
            - "sha256:913720320b7c03c5ee9b1defd05dd8ce75a77539d2362e27583d1835d82dcbc7"
          mutation_id: "kernel_work_item_execution_required:sha256:6865761db9be9c618b4cb8099c87f646390b5bca70d1948dae611751966dc8f5:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
        kernel_work_item_inspection_required:sha256:aee331e94150244f664745a20263b3cdc6f760b3f8877df88be34a62a7a3ffc1:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55:
          after_revision: 9
          aggregate_digest: "sha256:a1c6d888be5bbe2a25bc6c8738c0f912e3e3b693026b8afa9978ce163833d4d1"
          before_revision: 8
          command_digest: "sha256:766cf0f269cbea742f404f2f58d48f3b4977891e12ca3cb77cf3a0c1685e42c0"
          effect_ids: []
          event_digests:
            - "sha256:524cc814eb24c844d73015a45b21faa912e6188526f10b39d4b59eb67614d566"
          mutation_id: "kernel_work_item_inspection_required:sha256:aee331e94150244f664745a20263b3cdc6f760b3f8877df88be34a62a7a3ffc1:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
        kernel_work_item_materialization_required:sha256:20493347ef44fc07a7cb662f4354fa4cff193115100bb74cb9b2cfab8d2f9600:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1:
          after_revision: 4
          aggregate_digest: "sha256:3e1259bd493ed99b933fe12433f9eea5c7e2f8ef88e0256fc04b7725d9e97744"
          before_revision: 3
          command_digest: "sha256:c8f6d56d549b1b5095efeed007c3c8ade87c8f91621815cfda3cc7ae0c59db81"
          effect_ids: []
          event_digests:
            - "sha256:5d0b6faff110c986636c8d17a0f988ad6f82cbeeeb36e787f4cbbd0e301e2b71"
          mutation_id: "kernel_work_item_materialization_required:sha256:20493347ef44fc07a7cb662f4354fa4cff193115100bb74cb9b2cfab8d2f9600:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
        result:sha256:adb888154832b8a0f59d4a57b1687eda1d735057d41a31a9e3d2e4a58a4760a4:
          after_revision: 2
          aggregate_digest: "sha256:df8b696e5019a65c868eb4d846bd279aac83bc5a7f8bf7d5f1bfd9c86892d3a7"
          before_revision: 1
          command_digest: "sha256:4420268e7b7ec9bfe68f29ce33f4ab0094089ca6f2435a9e0258a0409237b236"
          effect_ids: []
          event_digests:
            - "sha256:86b56ca087fa0db1dae1ca73570495a5cf283573d36265b95fde0b5a822d0fb4"
          mutation_id: "result:sha256:adb888154832b8a0f59d4a57b1687eda1d735057d41a31a9e3d2e4a58a4760a4"
        result:sha256:cf946a5023b284dddab535fdbef8fc8bb6496ca433ed4608552e9068102a197a:
          after_revision: 8
          aggregate_digest: "sha256:3be8619d11816e21462ed609a77ca33c4ec98773119dac783d19af5d878bfc9f"
          before_revision: 7
          command_digest: "sha256:3960631c17b7d1607e64877aa1b15de97427084d7290333567d1b56eb68d7579"
          effect_ids: []
          event_digests:
            - "sha256:a7b66594a670f8cf1b8142c535e40ba7bbd8b42edee27a62cd25c82cd1728d51"
          mutation_id: "result:sha256:cf946a5023b284dddab535fdbef8fc8bb6496ca433ed4608552e9068102a197a"
        sha256:cc406219d37f6bd7a17da6f4409c8f0b10c766b6728c05950a3b76d325c122fc:
          after_revision: 3
          aggregate_digest: "sha256:1d1454a92627f23f1caee66ea0e0f205b3ed677752a6d5d4ff0264dfcb9c8f75"
          before_revision: 2
          command_digest: "sha256:22cbbf3f071c348469110426cf19bd261a8019b6e8d2d879a22cc4c431ee8466"
          effect_ids: []
          event_digests:
            - "sha256:8efdf420dca886f1b78629e635cd87a80593e1baf507323aaa90d627bb501b5a"
          mutation_id: "sha256:cc406219d37f6bd7a17da6f4409c8f0b10c766b6728c05950a3b76d325c122fc"
        sha256:d62296e8b533006cb6bb1f55d96837bac9ff3de97335980f58e100298e2a2feb:
          after_revision: 7
          aggregate_digest: "sha256:c0b39b95e92fa54047b3beb578d0111cb5012db8750e87da4a592f68acd4dac6"
          before_revision: 6
          command_digest: "sha256:5195ea16a9a2b6479e799130fe090eff7428071d909b6d29478a2dc529d94987"
          effect_ids: []
          event_digests:
            - "sha256:62088d7255a5de1651ef0b2437287f638d398ccd43a22350b42873e75f3fcccd"
          mutation_id: "sha256:d62296e8b533006cb6bb1f55d96837bac9ff3de97335980f58e100298e2a2feb"
        validation-resolution:sha256:98938e4b75505804ed2de2a960368826f58f9e0c88a1bc517c0e40b982408142:
          after_revision: 11
          aggregate_digest: "sha256:75824fcee663629e306c02ae47e1a4001603c7b8520c27e8095f2bda0d19063d"
          before_revision: 10
          command_digest: "sha256:946068a4c5004fc4c41d8cfafad277b1e65dd77b347e305a70538f1a9d769562"
          effect_ids: []
          event_digests:
            - "sha256:e4b704b51c46b88094a58f3177226893aa4c9bcfad629055341427887565f697"
          mutation_id: "validation-resolution:sha256:98938e4b75505804ed2de2a960368826f58f9e0c88a1bc517c0e40b982408142"
        validation:sha256:c6e8e90c7a6149e774d6cec3b3739e9ffa06ebb6b74d8caf9681c8b235073027:
          after_revision: 10
          aggregate_digest: "sha256:773579cdbcb08891355e264292f65ccca4c06c45855dfb93e7032280d4772f35"
          before_revision: 9
          command_digest: "sha256:e95b56d569d1fe1f1ff2e8a04e7fbd1a386ea6512391f37bba6bb92b0ca042c7"
          effect_ids: []
          event_digests:
            - "sha256:2e6a0b99ee93742e1136abab4eea9c2bbd79cb2f1c14f886b037aeb6b008ac0d"
          mutation_id: "validation:sha256:c6e8e90c7a6149e774d6cec3b3739e9ffa06ebb6b74d8caf9681c8b235073027"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "COMPLETED"
      work_items:
        preserve-linked-observation-context:
          attempt: 1
          claim_id: "sha256:2092cee141b653eac364eb78ceb1e362c808111e31467a431875b9aad816314c"
          definition:
            contract_digest: "sha256:95a578e6c7fc31b7acd6b623104401597749e5b3f1268f2170d68e81d26a2e07"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared/task-backend.ts"
                - "packages/agentplane/src/commands/shared/task-backend.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
            expected_outputs:
              - "linked-context-routing-fix"
              - "focused-regression-evidence"
            id: "preserve-linked-observation-context"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:2416e9dc0bd5c415a534e36bf7f0374ef6674fe125a43a5c89aaeb1dbd6e08e1"
              id: "linked-context-routing-fix"
              kind: "source_file"
              plan_revision: 1
              repository_fingerprint: "sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
              task_id: "202610232049-NSMZYM"
              work_item_id: "preserve-linked-observation-context"
            -
              attempt: 1
              digest: "sha256:d65a98b59d67d1b37f9a4683eddfbb90d6d29c64338c98c45a1a1f6606593841"
              id: "focused-regression-evidence"
              kind: "test_file"
              plan_revision: 1
              repository_fingerprint: "sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
              task_id: "202610232049-NSMZYM"
              work_item_id: "preserve-linked-observation-context"
          result_digest: "sha256:aea5c71f0990ac871d4a1df447efcfa110196542e7c91212e23a6ace5394a39d"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:d0c33607e31b5a72d1fe1d388610d233b4e4a862ea73d08f40298f261fce84da"
              - "sha256:2c6ae03fbed1b7dcfcce184bb7e356f14935d15ca9c4dcb5d1611bd55a2f8600"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:9800e96eb15024201ae73045403f91e27f182293fdf4c72d58c428c3c0a1315f"
              environment_digest: "sha256:eae6cb1bea7ce5ca91b12522b51a48de25326566ab933812cb4cabc6bc3557ca"
              implementation_identity: "sha256:aea5c71f0990ac871d4a1df447efcfa110196542e7c91212e23a6ace5394a39d"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-23T21:14:22.629Z"
            status: "PASSED"
    digest: "sha256:2f32092baa1b9ae213af9bf7f34e52eb3ac79eecdc763e9d1c3f772abd6eb880"
    documents:
      contracts:
        sha256:95a578e6c7fc31b7acd6b623104401597749e5b3f1268f2170d68e81d26a2e07:
          acceptance_criteria:
            - "The focused kernel transport test for linked-worktree observation and WorkOrder roots passes."
            - "Legacy primary-owner routing, explicit-base routing, and task-branch owner routing retain their existing behavior."
            - "No Factory-specific condition or weakened assertion is introduced."
            - "Native full regression and hosted PR checks pass before integration."
          objective: "Preserve the invocation linked-worktree gitRoot and WorkOrder observation context when a canonical Kernel task is stored in the primary checkout and no task-branch owner supersedes the caller. Keep canonical backend storage primary."
          role: "EXECUTOR"
          verification_commands:
            - "bun x vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
            - "bun run format:check"
            - "bun run lint:core"
      intent:
        context: "Release 0.7.13 blocker: focused run-cli.core.kernel-transport.test.ts fails because resolveTaskCommandContext returns the primary checkout when a canonical Kernel task is stored there but invoked from a linked worktree without its own task branch. Keep canonical backend storage primary while preserving the invocation linked gitRoot and WorkOrder context. Preserve explicit-base routing and owner task-branch routing. Add focused regression coverage. Do not add Factory-specific behavior or weaken tests."
        objective: "Preserve linked-worktree observation context for canonical primary-stored tasks"
    events:
      -
        command_digest: "sha256:0acf3d63391e2408973c012f89f207f3734d57a267eec6cfd0ab165d5b37da0a"
        id: "capture:202610232049-NSMZYM:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610232049-NSMZYM"
        occurred_at: "2026-10-23T20:49:53.824Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610232049-NSMZYM"
        task_revision: 1
      -
        command_digest: "sha256:4420268e7b7ec9bfe68f29ce33f4ab0094089ca6f2435a9e0258a0409237b236"
        id: "result:sha256:adb888154832b8a0f59d4a57b1687eda1d735057d41a31a9e3d2e4a58a4760a4:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:adb888154832b8a0f59d4a57b1687eda1d735057d41a31a9e3d2e4a58a4760a4"
        occurred_at: "2026-10-23T20:50:43.483Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610232049-NSMZYM"
        task_revision: 2
      -
        command_digest: "sha256:22cbbf3f071c348469110426cf19bd261a8019b6e8d2d879a22cc4c431ee8466"
        id: "sha256:cc406219d37f6bd7a17da6f4409c8f0b10c766b6728c05950a3b76d325c122fc:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:cc406219d37f6bd7a17da6f4409c8f0b10c766b6728c05950a3b76d325c122fc"
        occurred_at: "2026-10-23T20:50:52.942Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610232049-NSMZYM"
        task_revision: 3
      -
        command_digest: "sha256:c8f6d56d549b1b5095efeed007c3c8ade87c8f91621815cfda3cc7ae0c59db81"
        id: "kernel_work_item_materialization_required:sha256:20493347ef44fc07a7cb662f4354fa4cff193115100bb74cb9b2cfab8d2f9600:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:20493347ef44fc07a7cb662f4354fa4cff193115100bb74cb9b2cfab8d2f9600:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
        occurred_at: "2026-10-23T20:51:01.428Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610232049-NSMZYM"
        task_revision: 4
      -
        command_digest: "sha256:136396eefc9f2f9669c8bafd95f95234f6ed9eb657e5a274f5b8e8b3c0fcd941"
        id: "kernel_work_item_claim_required:sha256:95c2a98e099e49d5cdd2fe4ceb4830e31f4a21b60797a960799d4c19886081d6:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:95c2a98e099e49d5cdd2fe4ceb4830e31f4a21b60797a960799d4c19886081d6:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
        occurred_at: "2026-10-23T20:51:12.897Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610232049-NSMZYM"
        task_revision: 5
      -
        command_digest: "sha256:4aff0e5530a925e89469196e46d4de325fb463034856497295f794767d69fe7c"
        id: "kernel_work_item_execution_required:sha256:6865761db9be9c618b4cb8099c87f646390b5bca70d1948dae611751966dc8f5:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:6865761db9be9c618b4cb8099c87f646390b5bca70d1948dae611751966dc8f5:sha256:3db3c5446de8439fa733059a50c68293b02889b46450ffe05af926b872083cf1"
        occurred_at: "2026-10-23T20:51:43.072Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610232049-NSMZYM"
        task_revision: 6
      -
        command_digest: "sha256:5195ea16a9a2b6479e799130fe090eff7428071d909b6d29478a2dc529d94987"
        id: "sha256:d62296e8b533006cb6bb1f55d96837bac9ff3de97335980f58e100298e2a2feb:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:d62296e8b533006cb6bb1f55d96837bac9ff3de97335980f58e100298e2a2feb"
        occurred_at: "2026-10-23T21:06:51.481Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610232049-NSMZYM"
        task_revision: 7
      -
        command_digest: "sha256:3960631c17b7d1607e64877aa1b15de97427084d7290333567d1b56eb68d7579"
        id: "result:sha256:cf946a5023b284dddab535fdbef8fc8bb6496ca433ed4608552e9068102a197a:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:cf946a5023b284dddab535fdbef8fc8bb6496ca433ed4608552e9068102a197a"
        occurred_at: "2026-10-23T21:07:02.482Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610232049-NSMZYM"
        task_revision: 8
      -
        command_digest: "sha256:766cf0f269cbea742f404f2f58d48f3b4977891e12ca3cb77cf3a0c1685e42c0"
        id: "kernel_work_item_inspection_required:sha256:aee331e94150244f664745a20263b3cdc6f760b3f8877df88be34a62a7a3ffc1:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:aee331e94150244f664745a20263b3cdc6f760b3f8877df88be34a62a7a3ffc1:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
        occurred_at: "2026-10-23T21:07:11.086Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610232049-NSMZYM"
        task_revision: 9
      -
        command_digest: "sha256:e95b56d569d1fe1f1ff2e8a04e7fbd1a386ea6512391f37bba6bb92b0ca042c7"
        id: "validation:sha256:c6e8e90c7a6149e774d6cec3b3739e9ffa06ebb6b74d8caf9681c8b235073027:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:c6e8e90c7a6149e774d6cec3b3739e9ffa06ebb6b74d8caf9681c8b235073027"
        occurred_at: "2026-10-23T21:14:31.400Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610232049-NSMZYM"
        task_revision: 10
      -
        command_digest: "sha256:946068a4c5004fc4c41d8cfafad277b1e65dd77b347e305a70538f1a9d769562"
        id: "validation-resolution:sha256:98938e4b75505804ed2de2a960368826f58f9e0c88a1bc517c0e40b982408142:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:98938e4b75505804ed2de2a960368826f58f9e0c88a1bc517c0e40b982408142"
        occurred_at: "2026-10-23T21:14:36.910Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610232049-NSMZYM"
        task_revision: 11
      -
        command_digest: "sha256:f621fee7a3474928d9772730645a81b17698db9274e27a9a61949f76aa879755"
        id: "final-validation:sha256:c51eede7e59d6163978bcd6846f0ceccafcaef1a5676e584b654db4b47861419:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:c51eede7e59d6163978bcd6846f0ceccafcaef1a5676e584b654db4b47861419:11"
        occurred_at: "2026-10-23T22:00:29.089Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202610232049-NSMZYM"
        task_revision: 12
      -
        command_digest: "sha256:980fc4932958c208623eab1c7a94d232dcd4583c5d2455f0f032e10b4f715b8a"
        id: "kernel_task_completion_required:sha256:6cfe717193412d1437d9c0753fb5ed4dba79813c38df009aeff023998cbad66a:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:6cfe717193412d1437d9c0753fb5ed4dba79813c38df009aeff023998cbad66a:sha256:096e2a46cd046f4103dabc29b70528e4904b6afb6ac0e4be4eeea8eed5935b55"
        occurred_at: "2026-10-23T22:00:59.990Z"
        payload_digest: "sha256:ae743eab051bd6a1e4873e5dd9f9c4f11e55aba5a3ec2b0a285930130dc72fbd"
        task_id: "202610232049-NSMZYM"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Preserve linked-worktree observation context for canonical primary-stored tasks

Release 0.7.13 blocker: focused run-cli.core.kernel-transport.test.ts fails because resolveTaskCommandContext returns the primary checkout when a canonical Kernel task is stored there but invoked from a linked worktree without its own task branch. Keep canonical backend storage primary while preserving the invocation linked gitRoot and WorkOrder context. Preserve explicit-base routing and owner task-branch routing. Add focused regression coverage. Do not add Factory-specific behavior or weaken tests.

## Scope

- In scope: Release 0.7.13 blocker: focused run-cli.core.kernel-transport.test.ts fails because resolveTaskCommandContext returns the primary checkout when a canonical Kernel task is stored there but invoked from a linked worktree without its own task branch. Keep canonical backend storage primary while preserving the invocation linked gitRoot and WorkOrder context. Preserve explicit-base routing and owner task-branch routing. Add focused regression coverage. Do not add Factory-specific behavior or weaken tests.
- Out of scope: unrelated refactors not required for "Preserve linked-worktree observation context for canonical primary-stored tasks".

## Plan

1. Execute approved WorkItem preserve-linked-observation-context.

## Verify Steps

PLANNER fallback scaffold for "Preserve linked-worktree observation context for canonical primary-stored tasks". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Preserve linked-worktree observation context for canonical primary-stored tasks". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-23T22:00:32.662Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d7fb42c23f89378e8317b73be46dc3973184fe4974c69bc1fae0250b95bda5b4, input_digest=sha256:aba1c02fa5d6b6fe260a90d96931eaf4f666057a59fc01f0a709f20330324225

Details:

Check: affected_unit_integration
Command: bun x vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts
Result: pass
Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610232049-NSMZYM Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610232049-NSMZYM Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610232049-NSMZYM Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610232049-NSMZYM Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun x vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts
Result: pass
Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610232049-NSMZYM Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610232049-NSMZYM Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610232049-NSMZYM Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610232049-NSMZYM Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610232049-NSMZYM Verification Contract check full_regression

Check: task_outcome
Command: bun x vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts
Result: pass
Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610232049-NSMZYM Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610232049-NSMZYM Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610232049-NSMZYM Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610232049-NSMZYM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610232049-NSMZYM Verification Contract check task_outcome (4/4)

NativeTaskIdentityRef:
- plan_digest: sha256:d9432018657291270ea8730bbf19da817627c83dac94b24d3b250f776ac2cebc
- policy_digest: sha256:1150ba6caefe9e829c30b3520b9246ed1ec7ebbeedbe788c63cf7989015dbb46
- capability_digest: sha256:b12b803e4385ff89b8eb92a6efcac159978af918fec3dd0a5b31bff4696091fd
- checks_digest: sha256:a1f3ae385e76f5bf0af9bd9f650e5d1113aa366d55d86660f35f6699ef959283
- identity_digest: sha256:06b505bcfde7651560def606a44c8de903676b3a5ab2584232cfbe53cd7b3776

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610232049-NSMZYM
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
- Journal digest: `sha256:09b89729054506d4922008e3cc0aab09b0d2286f51e826e04c8e2c4ae773c194`
- Unavailable reason: `no_supervised_agent_runs`
- Updated at: `2026-10-23T22:05:17.925Z`
