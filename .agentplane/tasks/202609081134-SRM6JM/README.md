---
id: "202609081134-SRM6JM"
title: "Reduce agent protocol overhead for small code changes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "performance"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-08T11:38:37.528Z"
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
    - "effect_schema"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
      - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner"
      - "packages/core/schemas"
      - "packages/core/src/runner"
      - "packages/core/src/tasks"
      - "packages/spec/schemas"
      - "schemas"
      - "scripts/baselines"
      - "scripts/bench"
      - "scripts/checks"
      - "scripts/lib"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/backends/task-backend.local-handoff.test.ts,packages/agentplane/src/backends/task-backend/local-backend-read.ts"
      - "Use an isolated checkout for protocol changes. Preserve existing admission guarantees and historical artifacts. The approved scope includes identity assembly and negative authority tests."
    repository_effects:
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
      - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner"
      - "packages/core/schemas"
      - "packages/core/src/runner"
      - "packages/core/src/tasks"
      - "packages/spec/schemas"
      - "schemas"
      - "scripts/baselines"
      - "scripts/bench"
      - "scripts/checks"
      - "scripts/lib"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
      - "packages/core"
      - "scripts"
    changed_paths:
      - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
      - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
      - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.protocol-cost.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.testkit.ts"
      - "packages/agentplane/src/commands/task/advance.command.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.ts"
      - "packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
      - "packages/agentplane/src/commands/task/external-agent-result-routing.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
      - "packages/agentplane/src/commands/task/kernel-exchange.ts"
      - "packages/core/src/runner/agent-semantic-result.test.ts"
      - "packages/core/src/runner/agent-semantic-result.ts"
      - "packages/core/src/runner/agent-work-order.test.ts"
      - "packages/core/src/runner/agent-work-order.ts"
      - "packages/core/src/tasks/task-artifact-schema.shared.ts"
      - "scripts/baselines/protocol-cost-SRM6JM-before-01.json"
      - "scripts/baselines/protocol-cost-SRM6JM-before-02.json"
      - "scripts/baselines/protocol-cost-SRM6JM-before-03.json"
      - "scripts/baselines/protocol-cost-SRM6JM-exchange-01.json"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
          - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/runner"
          - "packages/core/schemas"
          - "packages/core/src/runner"
          - "packages/core/src/tasks"
          - "packages/spec/schemas"
          - "schemas"
          - "scripts/baselines"
          - "scripts/bench"
          - "scripts/checks"
          - "scripts/lib"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "public_api"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:b73375fd1145fcab1549c71485287a3b4f8591a8d9218ed3267234c006542ccf"
      escalation_reasons:
        - "central_component:packages/core/schemas"
        - "central_component:packages/core/src/runner"
        - "central_component:packages/core/src/tasks"
        - "central_path:packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.protocol-cost.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.testkit.ts"
        - "central_path:packages/core/src/runner/agent-semantic-result.test.ts"
        - "central_path:packages/core/src/runner/agent-semantic-result.ts"
        - "central_path:packages/core/src/runner/agent-work-order.test.ts"
        - "central_path:packages/core/src/runner/agent-work-order.ts"
        - "central_path:packages/core/src/tasks/task-artifact-schema.shared.ts"
        - "effect_public_api"
        - "effect_schema"
        - "effect_security_boundary"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
        - "unknown_path:scripts/baselines/protocol-cost-SRM6JM-before-01.json"
        - "unknown_path:scripts/baselines/protocol-cost-SRM6JM-before-02.json"
        - "unknown_path:scripts/baselines/protocol-cost-SRM6JM-before-03.json"
        - "unknown_path:scripts/baselines/protocol-cost-SRM6JM-exchange-01.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
          - "packages/core"
          - "scripts"
        changed_files:
          - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
          - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
          - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.protocol-cost.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.testkit.ts"
          - "packages/agentplane/src/commands/task/advance.command.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.ts"
          - "packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
          - "packages/agentplane/src/commands/task/external-agent-result-routing.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
          - "packages/agentplane/src/commands/task/kernel-exchange.ts"
          - "packages/core/src/runner/agent-semantic-result.test.ts"
          - "packages/core/src/runner/agent-semantic-result.ts"
          - "packages/core/src/runner/agent-work-order.test.ts"
          - "packages/core/src/runner/agent-work-order.ts"
          - "packages/core/src/tasks/task-artifact-schema.shared.ts"
          - "scripts/baselines/protocol-cost-SRM6JM-before-01.json"
          - "scripts/baselines/protocol-cost-SRM6JM-before-02.json"
          - "scripts/baselines/protocol-cost-SRM6JM-before-03.json"
          - "scripts/baselines/protocol-cost-SRM6JM-exchange-01.json"
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
      - "hosted_integration"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The intended baseline files are preserved. CLI-owned acceptance cannot commit them because the task scan treats a schema-object-only directory as a task with a missing README. The user explicitly approved repairing this blocker and continuing. Recommended action: Apply the pending scope extension as USER, then issue a fresh repair episode. Requested scope: roots=packages/agentplane/src/backends/task-backend.local-handoff.test.ts,packages/agentplane/src/backends/task-backend/local-backend-read.ts; repository effects=unchanged; request digest=sha256:db3a36e16345db4c49dd300d9235abc949c08030af5e4112432621a64db978e0. Agentplane receipt: external-agent-blocker/tr_0862032d662671bc90e0f388392fe8cf/sha256:6bf44050cc513549c7ec3c153b32bc61ddd2480b10f6b527ba0ebd4b117bb8da/sha256:db3a36e16345db4c49dd300d9235abc949c08030af5e4112432621a64db978e0."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/backends/task-backend.local-handoff.test.ts, packages/agentplane/src/backends/task-backend/local-backend-read.ts; repository effects: unchanged."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 18464555cfce. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 443a5aafbab7. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-08T11:38:53.724Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-08T12:30:47.174Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The intended baseline files are preserved. CLI-owned acceptance cannot commit them because the task scan treats a schema-object-only directory as a task with a missing README. The user explicitly approved repairing this blocker and continuing. Recommended action: Apply the pending scope extension as USER, then issue a fresh repair episode. Requested scope: roots=packages/agentplane/src/backends/task-backend.local-handoff.test.ts,packages/agentplane/src/backends/task-backend/local-backend-read.ts; repository effects=unchanged; request digest=sha256:db3a36e16345db4c49dd300d9235abc949c08030af5e4112432621a64db978e0. Agentplane receipt: external-agent-blocker/tr_0862032d662671bc90e0f388392fe8cf/sha256:6bf44050cc513549c7ec3c153b32bc61ddd2480b10f6b527ba0ebd4b117bb8da/sha256:db3a36e16345db4c49dd300d9235abc949c08030af5e4112432621a64db978e0."
  -
    type: "status"
    at: "2026-09-08T12:36:05.160Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 18464555cfce. CLI accepted one state-bound external-agent semantic result."
    commit: "18464555cfce9c2578c1ed75bba1de25b56e8598"
  -
    type: "status"
    at: "2026-09-08T12:53:50.910Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 443a5aafbab7. CLI accepted one state-bound external-agent semantic result."
    commit: "443a5aafbab7af51de9b380ba49126c28f96c267"
doc_version: 3
doc_updated_at: "2026-09-08T12:53:50.910Z"
doc_updated_by: "SUPERVISOR"
description: "Implement the user-approved optimization plan in dependency order: establish a reproducible one-condition-change benchmark; issue compact role- and episode-specific result schemas; assemble CLI-owned result identity from the immutable issued episode; remove duplicated planning criteria and summaries; optimize measured repeated CLI preparation work; rerun performance and authority, stale-result, scope, recovery, and historical-exchange compatibility checks. Target at least 70 percent less required schema bytes and 50 percent less generated protocol payload on the small fixture. Report measured wall time separately from provider and user waiting. Preserve existing verification and authority guarantees. Reuse existing benchmark infrastructure. Do not publish, push, merge, change dependencies, or rewrite historical artifacts. Coordinate with active reliability task 202609080727-BAWTEE and avoid duplicating its changes. Paid provider comparison requires available explicitly authorized runtime; never represent fixture or byte measurements as observed provider-token savings."
sections:
  Summary: |-
    Reduce agent protocol overhead for small code changes

    Implement the user-approved optimization plan in dependency order: establish a reproducible one-condition-change benchmark; issue compact role- and episode-specific result schemas; assemble CLI-owned result identity from the immutable issued episode; remove duplicated planning criteria and summaries; optimize measured repeated CLI preparation work; rerun performance and authority, stale-result, scope, recovery, and historical-exchange compatibility checks. Target at least 70 percent less required schema bytes and 50 percent less generated protocol payload on the small fixture. Report measured wall time separately from provider and user waiting. Preserve existing verification and authority guarantees. Reuse existing benchmark infrastructure. Do not publish, push, merge, change dependencies, or rewrite historical artifacts. Coordinate with active reliability task 202609080727-BAWTEE and avoid duplicating its changes. Paid provider comparison requires available explicitly authorized runtime; never represent fixture or byte measurements as observed provider-token savings.
  Scope: |-
    - In scope: Implement the user-approved optimization plan in dependency order: establish a reproducible one-condition-change benchmark; issue compact role- and episode-specific result schemas; assemble CLI-owned result identity from the immutable issued episode; remove duplicated planning criteria and summaries; optimize measured repeated CLI preparation work; rerun performance and authority, stale-result, scope, recovery, and historical-exchange compatibility checks. Target at least 70 percent less required schema bytes and 50 percent less generated protocol payload on the small fixture. Report measured wall time separately from provider and user waiting. Preserve existing verification and authority guarantees. Reuse existing benchmark infrastructure. Do not publish, push, merge, change dependencies, or rewrite historical artifacts. Coordinate with active reliability task 202609080727-BAWTEE and avoid duplicating its changes. Paid provider comparison requires available explicitly authorized runtime; never represent fixture or byte measurements as observed provider-token savings.
    - Out of scope: unrelated refactors not required for "Reduce agent protocol overhead for small code changes".
  Plan: "Execute four sequential WorkItems: establish matched measurements, compact the result exchange, compact planning, then profile and qualify. Preserve immutable episode authority and historical exchanges. Stop before external publication."
  Verify Steps: |-
    PLANNER fallback scaffold for "Reduce agent protocol overhead for small code changes". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Reduce agent protocol overhead for small code changes". Expected: the visible result matches ## Summary and stays inside approved scope.
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
  agentplane.execution_grant:
    actor: "USER"
    approval_evidence_digest: null
    approval_kind: "manual_operator"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:4790f7c008d40156e1f3a1e6446c3a8825dd50a5966d7b428b15776e3e64eeee"
    digest: "sha256:b0df4f2fbee35d1fbf3d9ba75b95913fb25e5f9a0432b101a173e654543b2af9"
    grant_id: "1f684bed-a3d2-40a7-b432-eb043e77775e"
    issued_at: "2026-09-08T11:38:37.528Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:74669df26c181bcb9005db5d7cf5ce40013d7311a08a6d9bb6fd327f0b5a497e"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:286235e1c1a66f137f7b576d3f1dffbb5ddd7bff04538a12c18e10b8d5fea439"
    status: "active"
    task_id: "202609081134-SRM6JM"
  agentplane.scope_extension_request:
    applied_at: "2026-09-08T12:35:05.231Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:6bf44050cc513549c7ec3c153b32bc61ddd2480b10f6b527ba0ebd4b117bb8da"
    kind: "task_scope_extension_request"
    request:
      rationale: "The user explicitly approved the narrowly scoped blocker repair after reviewing its cause. Extend the existing task to fix artifact-only directory recognition and add regression tests."
      repository_effects: []
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
        - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
    request_digest: "sha256:db3a36e16345db4c49dd300d9235abc949c08030af5e4112432621a64db978e0"
    schema_version: 1
    status: "applied"
    transition_id: "tr_0862032d662671bc90e0f388392fe8cf"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-08T12:35:05.231Z"
        approved_by: "USER"
        approved_digest: "sha256:0d5bd41f20ecec14538c4c600a72dc82832ee6d6887f7651977b1f5ccbfd3f97"
        policy_facts:
          - "state_bound_scope_extension:sha256:db3a36e16345db4c49dd300d9235abc949c08030af5e4112432621a64db978e0"
        state: "approved"
      created_at: "2026-09-08T12:35:05.231Z"
      digest: "sha256:0d5bd41f20ecec14538c4c600a72dc82832ee6d6887f7651977b1f5ccbfd3f97"
      proposal:
        assumptions:
          - "No dependencies, policy, credentials, remote writes or historical evidence rewrites are required."
          - "Keep provider measurements explicitly unavailable until an authorized runtime exists."
        planning_baseline:
          captured_at: "2026-09-08T11:35:00.888Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:917082c627e2054c779388711331b46d805ca93e45c5a35f8c8a77b60f034120"
          dirty_paths:
            - ".agentplane/tasks/202609072121-9VEHKH/README.md"
            - ".agentplane/tasks/202609080727-BAWTEE/README.md"
            - ".agentplane/tasks/202609081134-SRM6JM/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "33e106d611fe92603cb836bdcd500a1c624d206b"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609081134-SRM6JM"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              id: "task-check"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "task-check"
              description: "The baseline is reproducible. Byte counts include all required schema references. Wall time, model time and provider token availability are separate. Existing historical baselines are unchanged."
              id: "baseline"
              required: true
            -
              check_ids:
                - "task-check"
              description: "Required schema bytes decrease by at least 70 percent on the matched fixture. Cross-role and invalid payloads fail closed. Historical exchanges retain their original interpretation. Identity assembly cannot rebind stale claims to a fresh episode."
              id: "compact-exchange"
              required: true
            -
              check_ids:
                - "task-check"
              description: "Generated protocol payload bytes decrease by at least 50 percent on the matched fixture. The normalized plan preserves all acceptance criteria, check relationships and authority limits. Existing stored plans remain readable."
              id: "compact-plan"
              required: true
            -
              check_ids:
                - "task-check"
              description: "Every performance claim has matched measurements. No model exchange exists solely for envelope assembly or redundant next-action discovery. Safety and recovery regression checks pass. Report unavailable provider-token and full model timing evidence explicitly without substituting byte estimates."
              id: "profile-and-qualify"
              required: true
          evidence_fingerprint: "sha256:917082c627e2054c779388711331b46d805ca93e45c5a35f8c8a77b60f034120"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "task-check"
                  description: "The baseline is reproducible. Byte counts include all required schema references. Wall time, model time and provider token availability are separate. Existing historical baselines are unchanged."
                  id: "baseline"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 40000
                optional_sources:
                  - "scripts/baselines/agent-efficiency-VN1FN4-comparison.md"
                  - ".agentplane/tasks/202609080727-BAWTEE/README.md"
                required_sources:
                  - "packages/core/src/runner/agent-semantic-result.ts"
                  - "packages/core/src/tasks/task-centric/schema.ts"
                  - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/advance.command.ts"
                symbol_hints: []
              depends_on: []
              expected_outputs:
                - "baseline-evidence"
              id: "baseline"
              objective: "Extend the existing benchmark infrastructure with one condition change and its nearest behavior test. Bind measurements to source SHA and runtime identity. Measure schema and agent payload bytes, semantic exchange counts, result retries, CLI preparation and admission time separately. Keep fixtures inside the task checkout. Preserve historical baseline files. Inspect BAWTEE overlap before implementation."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/schemas"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/spec/schemas"
                -
                  kind: "path"
                  mode: "write"
                  resource: "schemas"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/lib"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/backends/task-backend.local-handoff.test.ts"
                - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner"
                - "packages/core/schemas"
                - "packages/core/src/runner"
                - "packages/core/src/tasks"
                - "packages/spec/schemas"
                - "schemas"
                - "scripts/baselines"
                - "scripts/bench"
                - "scripts/checks"
                - "scripts/lib"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "task-check"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "task-check"
                    description: "The baseline is reproducible. Byte counts include all required schema references. Wall time, model time and provider token availability are separate. Existing historical baselines are unchanged."
                    id: "baseline"
                    required: true
                evidence_fingerprint: "sha256:917082c627e2054c779388711331b46d805ca93e45c5a35f8c8a77b60f034120"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "task-check"
                  description: "Required schema bytes decrease by at least 70 percent on the matched fixture. Cross-role and invalid payloads fail closed. Historical exchanges retain their original interpretation. Identity assembly cannot rebind stale claims to a fresh episode."
                  id: "compact-exchange"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 40000
                optional_sources:
                  - "scripts/baselines/agent-efficiency-VN1FN4-comparison.md"
                  - ".agentplane/tasks/202609080727-BAWTEE/README.md"
                required_sources:
                  - "packages/core/src/runner/agent-semantic-result.ts"
                  - "packages/core/src/tasks/task-centric/schema.ts"
                  - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/advance.command.ts"
                symbol_hints: []
              depends_on:
                - "baseline"
              expected_outputs:
                - "compact-exchange-evidence"
              id: "compact-exchange"
              objective: "Issue role- and episode-specific schemas with shared definitions and a small valid example. Accept a compact semantic payload and let the CLI assemble only known identity fields from the immutable issued exchange. Reuse BAWTEE primitives where available. Preserve both legacy and canonical admission checks and historical issued-exchange handling. Reject stale, cross-task, cross-role and forged results."
              optional: false
              priority: 2
              required_inputs:
                - "baseline-evidence"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/schemas"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/spec/schemas"
                -
                  kind: "path"
                  mode: "write"
                  resource: "schemas"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/lib"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks"
              risk: "medium"
              scope_roots:
                - "packages/core/src/runner"
                - "packages/core/src/tasks"
                - "packages/core/schemas"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/spec/schemas"
                - "schemas"
                - "scripts/bench"
                - "scripts/baselines"
                - "scripts/lib"
                - "scripts/checks"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "task-check"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "task-check"
                    description: "Required schema bytes decrease by at least 70 percent on the matched fixture. Cross-role and invalid payloads fail closed. Historical exchanges retain their original interpretation. Identity assembly cannot rebind stale claims to a fresh episode."
                    id: "compact-exchange"
                    required: true
                evidence_fingerprint: "sha256:917082c627e2054c779388711331b46d805ca93e45c5a35f8c8a77b60f034120"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "task-check"
                  description: "Generated protocol payload bytes decrease by at least 50 percent on the matched fixture. The normalized plan preserves all acceptance criteria, check relationships and authority limits. Existing stored plans remain readable."
                  id: "compact-plan"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 40000
                optional_sources:
                  - "scripts/baselines/agent-efficiency-VN1FN4-comparison.md"
                  - ".agentplane/tasks/202609080727-BAWTEE/README.md"
                required_sources:
                  - "packages/core/src/runner/agent-semantic-result.ts"
                  - "packages/core/src/tasks/task-centric/schema.ts"
                  - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/advance.command.ts"
                symbol_hints: []
              depends_on:
                - "compact-exchange"
              expected_outputs:
                - "compact-plan-evidence"
              id: "compact-plan"
              objective: "Remove repeated criterion text from the agent planning payload. Resolve check references against a single criterion definition. Derive unambiguous single-WorkItem structures in the CLI. Keep objectives, mutation scope, approval decisions and validation requirements explicit. Use a short summary without repeating the plan. Preserve complete normalized internal validation contracts."
              optional: false
              priority: 3
              required_inputs:
                - "compact-exchange-evidence"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/schemas"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/spec/schemas"
                -
                  kind: "path"
                  mode: "write"
                  resource: "schemas"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/lib"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks"
              risk: "medium"
              scope_roots:
                - "packages/core/src/runner"
                - "packages/core/src/tasks"
                - "packages/core/schemas"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/spec/schemas"
                - "schemas"
                - "scripts/bench"
                - "scripts/baselines"
                - "scripts/lib"
                - "scripts/checks"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "task-check"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "task-check"
                    description: "Generated protocol payload bytes decrease by at least 50 percent on the matched fixture. The normalized plan preserves all acceptance criteria, check relationships and authority limits. Existing stored plans remain readable."
                    id: "compact-plan"
                    required: true
                evidence_fingerprint: "sha256:917082c627e2054c779388711331b46d805ca93e45c5a35f8c8a77b60f034120"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "task-check"
                  description: "Every performance claim has matched measurements. No model exchange exists solely for envelope assembly or redundant next-action discovery. Safety and recovery regression checks pass. Report unavailable provider-token and full model timing evidence explicitly without substituting byte estimates."
                  id: "profile-and-qualify"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 40000
                optional_sources:
                  - "scripts/baselines/agent-efficiency-VN1FN4-comparison.md"
                  - ".agentplane/tasks/202609080727-BAWTEE/README.md"
                required_sources:
                  - "packages/core/src/runner/agent-semantic-result.ts"
                  - "packages/core/src/tasks/task-centric/schema.ts"
                  - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                  - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  - "packages/agentplane/src/commands/task/advance.command.ts"
                symbol_hints: []
              depends_on:
                - "compact-plan"
              expected_outputs:
                - "profile-and-qualify-evidence"
              id: "profile-and-qualify"
              objective: "Profile repeated context and route preparation. Reuse observations only within a single invocation while their inputs are unchanged. Invalidate affected observations after mutation. Ensure result admission returns the next actionable packet without redundant diagnostics. Repeat matched measurements after each optimization. Run existing authority, stale-result, scope, rework, interruption, recovery and historical-exchange tests. Run typecheck, schema parity and required affected checks. Report full-time comparison only for observed equivalent runs."
              optional: false
              priority: 4
              required_inputs:
                - "compact-plan-evidence"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/schemas"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/spec/schemas"
                -
                  kind: "path"
                  mode: "write"
                  resource: "schemas"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/lib"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks"
              risk: "medium"
              scope_roots:
                - "packages/core/src/runner"
                - "packages/core/src/tasks"
                - "packages/core/schemas"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/spec/schemas"
                - "schemas"
                - "scripts/bench"
                - "scripts/baselines"
                - "scripts/lib"
                - "scripts/checks"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "task-check"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "task-check"
                    description: "Every performance claim has matched measurements. No model exchange exists solely for envelope assembly or redundant next-action discovery. Safety and recovery regression checks pass. Report unavailable provider-token and full model timing evidence explicitly without substituting byte estimates."
                    id: "profile-and-qualify"
                    required: true
                evidence_fingerprint: "sha256:917082c627e2054c779388711331b46d805ca93e45c5a35f8c8a77b60f034120"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202609081134-SRM6JM"
    event_cursor: 9
    final_validation: null
    id: "202609081134-SRM6JM"
    intent:
      acceptance_criteria: []
      captured_at: "2026-09-08T11:34:56.267Z"
      constraints: []
      request: |-
        Reduce agent protocol overhead for small code changes

        Implement the user-approved optimization plan in dependency order: establish a reproducible one-condition-change benchmark; issue compact role- and episode-specific result schemas; assemble CLI-owned result identity from the immutable issued episode; remove duplicated planning criteria and summaries; optimize measured repeated CLI preparation work; rerun performance and authority, stale-result, scope, recovery, and historical-exchange compatibility checks. Target at least 70 percent less required schema bytes and 50 percent less generated protocol payload on the small fixture. Report measured wall time separately from provider and user waiting. Preserve existing verification and authority guarantees. Reuse existing benchmark infrastructure. Do not publish, push, merge, change dependencies, or rewrite historical artifacts. Coordinate with active reliability task 202609080727-BAWTEE and avoid duplicating its changes. Paid provider comparison requires available explicitly authorized runtime; never represent fixture or byte measurements as observed provider-token savings.
      task_id: "202609081134-SRM6JM"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-08T11:38:37.528Z"
          approved_by: "USER"
          approved_digest: "sha256:d0d90df7f577a73e3ca2cf14a03ce13010a2d9201f6b297954cb2073231f780b"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-09-08T11:36:41.473Z"
        digest: "sha256:d0d90df7f577a73e3ca2cf14a03ce13010a2d9201f6b297954cb2073231f780b"
        proposal:
          assumptions:
            - "No dependencies, policy, credentials, remote writes or historical evidence rewrites are required."
            - "Keep provider measurements explicitly unavailable until an authorized runtime exists."
          planning_baseline:
            captured_at: "2026-09-08T11:35:00.888Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:917082c627e2054c779388711331b46d805ca93e45c5a35f8c8a77b60f034120"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609081134-SRM6JM/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "33e106d611fe92603cb836bdcd500a1c624d206b"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609081134-SRM6JM"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "task-check"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "task-check"
                description: "The baseline is reproducible. Byte counts include all required schema references. Wall time, model time and provider token availability are separate. Existing historical baselines are unchanged."
                id: "baseline"
                required: true
              -
                check_ids:
                  - "task-check"
                description: "Required schema bytes decrease by at least 70 percent on the matched fixture. Cross-role and invalid payloads fail closed. Historical exchanges retain their original interpretation. Identity assembly cannot rebind stale claims to a fresh episode."
                id: "compact-exchange"
                required: true
              -
                check_ids:
                  - "task-check"
                description: "Generated protocol payload bytes decrease by at least 50 percent on the matched fixture. The normalized plan preserves all acceptance criteria, check relationships and authority limits. Existing stored plans remain readable."
                id: "compact-plan"
                required: true
              -
                check_ids:
                  - "task-check"
                description: "Every performance claim has matched measurements. No model exchange exists solely for envelope assembly or redundant next-action discovery. Safety and recovery regression checks pass. Report unavailable provider-token and full model timing evidence explicitly without substituting byte estimates."
                id: "profile-and-qualify"
                required: true
            evidence_fingerprint: "sha256:917082c627e2054c779388711331b46d805ca93e45c5a35f8c8a77b60f034120"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "task-check"
                    description: "The baseline is reproducible. Byte counts include all required schema references. Wall time, model time and provider token availability are separate. Existing historical baselines are unchanged."
                    id: "baseline"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 40000
                  optional_sources:
                    - "scripts/baselines/agent-efficiency-VN1FN4-comparison.md"
                    - ".agentplane/tasks/202609080727-BAWTEE/README.md"
                  required_sources:
                    - "packages/core/src/runner/agent-semantic-result.ts"
                    - "packages/core/src/tasks/task-centric/schema.ts"
                    - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                    - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                    - "packages/agentplane/src/commands/task/advance.command.ts"
                  symbol_hints: []
                depends_on: []
                expected_outputs:
                  - "baseline-evidence"
                id: "baseline"
                objective: "Extend the existing benchmark infrastructure with one condition change and its nearest behavior test. Bind measurements to source SHA and runtime identity. Measure schema and agent payload bytes, semantic exchange counts, result retries, CLI preparation and admission time separately. Keep fixtures inside the task checkout. Preserve historical baseline files. Inspect BAWTEE overlap before implementation."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/schemas"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/schemas"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/lib"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                risk: "medium"
                scope_roots:
                  - "packages/core/src/runner"
                  - "packages/core/src/tasks"
                  - "packages/core/schemas"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/spec/schemas"
                  - "schemas"
                  - "scripts/bench"
                  - "scripts/baselines"
                  - "scripts/lib"
                  - "scripts/checks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "task-check"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "task-check"
                      description: "The baseline is reproducible. Byte counts include all required schema references. Wall time, model time and provider token availability are separate. Existing historical baselines are unchanged."
                      id: "baseline"
                      required: true
                  evidence_fingerprint: "sha256:917082c627e2054c779388711331b46d805ca93e45c5a35f8c8a77b60f034120"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "task-check"
                    description: "Required schema bytes decrease by at least 70 percent on the matched fixture. Cross-role and invalid payloads fail closed. Historical exchanges retain their original interpretation. Identity assembly cannot rebind stale claims to a fresh episode."
                    id: "compact-exchange"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 40000
                  optional_sources:
                    - "scripts/baselines/agent-efficiency-VN1FN4-comparison.md"
                    - ".agentplane/tasks/202609080727-BAWTEE/README.md"
                  required_sources:
                    - "packages/core/src/runner/agent-semantic-result.ts"
                    - "packages/core/src/tasks/task-centric/schema.ts"
                    - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                    - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                    - "packages/agentplane/src/commands/task/advance.command.ts"
                  symbol_hints: []
                depends_on:
                  - "baseline"
                expected_outputs:
                  - "compact-exchange-evidence"
                id: "compact-exchange"
                objective: "Issue role- and episode-specific schemas with shared definitions and a small valid example. Accept a compact semantic payload and let the CLI assemble only known identity fields from the immutable issued exchange. Reuse BAWTEE primitives where available. Preserve both legacy and canonical admission checks and historical issued-exchange handling. Reject stale, cross-task, cross-role and forged results."
                optional: false
                priority: 2
                required_inputs:
                  - "baseline-evidence"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/schemas"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/schemas"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/lib"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                risk: "medium"
                scope_roots:
                  - "packages/core/src/runner"
                  - "packages/core/src/tasks"
                  - "packages/core/schemas"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/spec/schemas"
                  - "schemas"
                  - "scripts/bench"
                  - "scripts/baselines"
                  - "scripts/lib"
                  - "scripts/checks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "task-check"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "task-check"
                      description: "Required schema bytes decrease by at least 70 percent on the matched fixture. Cross-role and invalid payloads fail closed. Historical exchanges retain their original interpretation. Identity assembly cannot rebind stale claims to a fresh episode."
                      id: "compact-exchange"
                      required: true
                  evidence_fingerprint: "sha256:917082c627e2054c779388711331b46d805ca93e45c5a35f8c8a77b60f034120"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "task-check"
                    description: "Generated protocol payload bytes decrease by at least 50 percent on the matched fixture. The normalized plan preserves all acceptance criteria, check relationships and authority limits. Existing stored plans remain readable."
                    id: "compact-plan"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 40000
                  optional_sources:
                    - "scripts/baselines/agent-efficiency-VN1FN4-comparison.md"
                    - ".agentplane/tasks/202609080727-BAWTEE/README.md"
                  required_sources:
                    - "packages/core/src/runner/agent-semantic-result.ts"
                    - "packages/core/src/tasks/task-centric/schema.ts"
                    - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                    - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                    - "packages/agentplane/src/commands/task/advance.command.ts"
                  symbol_hints: []
                depends_on:
                  - "compact-exchange"
                expected_outputs:
                  - "compact-plan-evidence"
                id: "compact-plan"
                objective: "Remove repeated criterion text from the agent planning payload. Resolve check references against a single criterion definition. Derive unambiguous single-WorkItem structures in the CLI. Keep objectives, mutation scope, approval decisions and validation requirements explicit. Use a short summary without repeating the plan. Preserve complete normalized internal validation contracts."
                optional: false
                priority: 3
                required_inputs:
                  - "compact-exchange-evidence"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/schemas"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/schemas"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/lib"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                risk: "medium"
                scope_roots:
                  - "packages/core/src/runner"
                  - "packages/core/src/tasks"
                  - "packages/core/schemas"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/spec/schemas"
                  - "schemas"
                  - "scripts/bench"
                  - "scripts/baselines"
                  - "scripts/lib"
                  - "scripts/checks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "task-check"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "task-check"
                      description: "Generated protocol payload bytes decrease by at least 50 percent on the matched fixture. The normalized plan preserves all acceptance criteria, check relationships and authority limits. Existing stored plans remain readable."
                      id: "compact-plan"
                      required: true
                  evidence_fingerprint: "sha256:917082c627e2054c779388711331b46d805ca93e45c5a35f8c8a77b60f034120"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "task-check"
                    description: "Every performance claim has matched measurements. No model exchange exists solely for envelope assembly or redundant next-action discovery. Safety and recovery regression checks pass. Report unavailable provider-token and full model timing evidence explicitly without substituting byte estimates."
                    id: "profile-and-qualify"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 40000
                  optional_sources:
                    - "scripts/baselines/agent-efficiency-VN1FN4-comparison.md"
                    - ".agentplane/tasks/202609080727-BAWTEE/README.md"
                  required_sources:
                    - "packages/core/src/runner/agent-semantic-result.ts"
                    - "packages/core/src/tasks/task-centric/schema.ts"
                    - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                    - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                    - "packages/agentplane/src/commands/task/advance.command.ts"
                  symbol_hints: []
                depends_on:
                  - "compact-plan"
                expected_outputs:
                  - "profile-and-qualify-evidence"
                id: "profile-and-qualify"
                objective: "Profile repeated context and route preparation. Reuse observations only within a single invocation while their inputs are unchanged. Invalidate affected observations after mutation. Ensure result admission returns the next actionable packet without redundant diagnostics. Repeat matched measurements after each optimization. Run existing authority, stale-result, scope, rework, interruption, recovery and historical-exchange tests. Run typecheck, schema parity and required affected checks. Report full-time comparison only for observed equivalent runs."
                optional: false
                priority: 4
                required_inputs:
                  - "compact-plan-evidence"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/schemas"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/spec/schemas"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "schemas"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/bench"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/lib"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                risk: "medium"
                scope_roots:
                  - "packages/core/src/runner"
                  - "packages/core/src/tasks"
                  - "packages/core/schemas"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/runner"
                  - "packages/agentplane/src/cli"
                  - "packages/spec/schemas"
                  - "schemas"
                  - "scripts/bench"
                  - "scripts/baselines"
                  - "scripts/lib"
                  - "scripts/checks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "task-check"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "task-check"
                      description: "Every performance claim has matched measurements. No model exchange exists solely for envelope assembly or redundant next-action discovery. Safety and recovery regression checks pass. Report unavailable provider-token and full model timing evidence explicitly without substituting byte estimates."
                      id: "profile-and-qualify"
                      required: true
                  evidence_fingerprint: "sha256:917082c627e2054c779388711331b46d805ca93e45c5a35f8c8a77b60f034120"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609081134-SRM6JM"
    revision: 13
    schema_version: 1
    updated_at: "2026-09-08T12:53:53.931Z"
    work_items:
      baseline:
        attempt: 1
        claim_id: null
        id: "baseline"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:0ff33f4f07fd80e358d4b4168aeff6ea302315c090c5d458dc246de0707b4a12"
            id: "baseline-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609081134-SRM6JM"
              work_item_id: "baseline"
            provenance:
              - "sha256:61c2f35c5902e09523634d84fbca5666f7ca78efd4a5e6d05eb1a244d5dd808d"
              - ".agentplane/tasks/202609081134-SRM6JM/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:1b4ead9d20b26d60f27fbe89130bb3739a8464e51b19c65058898949d90d63bf"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609081134-SRM6JM/supervision/declared-checks.json"
              check_id: "task-check"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-08T12:36:08.248Z"
              repository_snapshot_digest: "sha256:1b4ead9d20b26d60f27fbe89130bb3739a8464e51b19c65058898949d90d63bf"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      compact-exchange:
        attempt: 1
        claim_id: null
        id: "compact-exchange"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:fe84c4313508da052ceaf3b16acfa86f4b8102818b5d89488af5aa7c9f2c4686"
            id: "compact-exchange-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609081134-SRM6JM"
              work_item_id: "compact-exchange"
            provenance:
              - "sha256:e140021a795486eb04ba3ec2dbe7071c24cc2e589e5987d12bc67280b7a05de4"
              - ".agentplane/tasks/202609081134-SRM6JM/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:27fd7609f21ec4651ccefed4d42f454a6f3a6de0bb3f125b12facf98010718ab"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609081134-SRM6JM/supervision/declared-checks.json"
              check_id: "task-check"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-08T12:53:53.922Z"
              repository_snapshot_digest: "sha256:27fd7609f21ec4651ccefed4d42f454a6f3a6de0bb3f125b12facf98010718ab"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      compact-plan:
        attempt: 0
        claim_id: null
        id: "compact-plan"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      profile-and-qualify:
        attempt: 0
        claim_id: null
        id: "profile-and-qualify"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-08T12:36:08.256Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:26b10c6dd3d80eedbddfa49fdd52688a1070592048b1b4908e3a5e11f42549c8"
        entity: "work_item"
        id: "event_6bbe2fc54927ead6be6931f0"
        mutation_id: "external-result:work-order-202609081134-SRM6JM-executor-d99cafa918a2682d5a5bb746"
        plan_digest: "sha256:0d5bd41f20ecec14538c4c600a72dc82832ee6d6887f7651977b1f5ccbfd3f97"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609081134-SRM6JM"
        task_revision: 9
        work_item_id: "baseline"
      -
        at: "2026-09-08T12:53:53.931Z"
        from: "PLANNED"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:37811be4e7c52308e6edd6a7ba48fc41ea48e88411cdc53b8a4d08ea6c1e7cf1"
        entity: "work_item"
        id: "event_3994406bcb51e9099ac57f72"
        mutation_id: "external-result:work-order-202609081134-SRM6JM-executor-0c479114a89e4d5d1e1056b2"
        plan_digest: "sha256:0d5bd41f20ecec14538c4c600a72dc82832ee6d6887f7651977b1f5ccbfd3f97"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609081134-SRM6JM"
        task_revision: 12
        work_item_id: "compact-exchange"
    leases: []
    mutation_receipts:
      compatibility:sha256:0bbaf829ec0396f3c910327ed4d2193f72d2a0f1f1c9e17015b841d896a050e1:
        aggregate_digest: "sha256:3eb380e0404aeaec93a37e49bbd9f09508c5d8efd1f4b90d677550ea3fde4af2"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T12:36:05.160Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_9fe5349d8376d553f335851e"
          mutation_id: "compatibility:sha256:0bbaf829ec0396f3c910327ed4d2193f72d2a0f1f1c9e17015b841d896a050e1"
          plan_digest: "sha256:0d5bd41f20ecec14538c4c600a72dc82832ee6d6887f7651977b1f5ccbfd3f97"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081134-SRM6JM"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:0bbaf829ec0396f3c910327ed4d2193f72d2a0f1f1c9e17015b841d896a050e1"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609081134-SRM6JM"
      compatibility:sha256:258797012983d0ad50e56ae0eea3327b3b04f03c6d010a143ea80914617dbe4d:
        aggregate_digest: "sha256:c2c709427de89e04dc19bb04431cb0f68d4f93daaf673df8f97d719d3e8ce609"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T12:30:47.174Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_dc5fb98f2936f4aeee403eb1"
          mutation_id: "compatibility:sha256:258797012983d0ad50e56ae0eea3327b3b04f03c6d010a143ea80914617dbe4d"
          plan_digest: "sha256:d0d90df7f577a73e3ca2cf14a03ce13010a2d9201f6b297954cb2073231f780b"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081134-SRM6JM"
          task_revision: 4
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:258797012983d0ad50e56ae0eea3327b3b04f03c6d010a143ea80914617dbe4d"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609081134-SRM6JM"
      compatibility:sha256:278e64a5dec2b518cb5e85d0f9a3011ad681016c6f0bdb6b707885b22ac1cc21:
        aggregate_digest: "sha256:0be65f64741347c17c45944da355d7f2a9001a8fbd37f8fb1ff5510d4f7fc2a1"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T11:38:53.724Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c13627ea7acf7d2faa1a06de"
          mutation_id: "compatibility:sha256:278e64a5dec2b518cb5e85d0f9a3011ad681016c6f0bdb6b707885b22ac1cc21"
          plan_digest: "sha256:d0d90df7f577a73e3ca2cf14a03ce13010a2d9201f6b297954cb2073231f780b"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081134-SRM6JM"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:278e64a5dec2b518cb5e85d0f9a3011ad681016c6f0bdb6b707885b22ac1cc21"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609081134-SRM6JM"
      compatibility:sha256:2d7259b2db2d505a902356bd610dcad3885162fcd582b831db1d1bd562036fc2:
        aggregate_digest: "sha256:ecedeae72d2ff2c7ce35470828b400917555b44d3881d0912285287fc49b99f7"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T12:36:05.160Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_e6bdc48e1537da8fdf9f5848"
          mutation_id: "compatibility:sha256:2d7259b2db2d505a902356bd610dcad3885162fcd582b831db1d1bd562036fc2"
          plan_digest: "sha256:0d5bd41f20ecec14538c4c600a72dc82832ee6d6887f7651977b1f5ccbfd3f97"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081134-SRM6JM"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2d7259b2db2d505a902356bd610dcad3885162fcd582b831db1d1bd562036fc2"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609081134-SRM6JM"
      compatibility:sha256:6d186f31489b5e7f15187fdc37c419740365a825da9e5089cf935fcd69fbc946:
        aggregate_digest: "sha256:7039bd9c1edc2cdf3897a20843f2bb428d8be3c42162514ed5c40c029a552e6a"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T11:36:41.477Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_b464c13a42c277bdadfc4b3b"
          mutation_id: "compatibility:sha256:6d186f31489b5e7f15187fdc37c419740365a825da9e5089cf935fcd69fbc946"
          plan_digest: "sha256:d0d90df7f577a73e3ca2cf14a03ce13010a2d9201f6b297954cb2073231f780b"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081134-SRM6JM"
          task_revision: 2
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6d186f31489b5e7f15187fdc37c419740365a825da9e5089cf935fcd69fbc946"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609081134-SRM6JM"
      compatibility:sha256:9b6964b87f25437c13a6b4b0219095d6df8ea7435c3a77f1acf3b9a6ad6c85f9:
        aggregate_digest: "sha256:9b1a0b7ed7eb66d90dc6bb7cf688da0f582e134fec6686890ae550268ce354c8"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T12:30:47.174Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_38ffecca5333a446805a4241"
          mutation_id: "compatibility:sha256:9b6964b87f25437c13a6b4b0219095d6df8ea7435c3a77f1acf3b9a6ad6c85f9"
          plan_digest: "sha256:d0d90df7f577a73e3ca2cf14a03ce13010a2d9201f6b297954cb2073231f780b"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081134-SRM6JM"
          task_revision: 5
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:9b6964b87f25437c13a6b4b0219095d6df8ea7435c3a77f1acf3b9a6ad6c85f9"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609081134-SRM6JM"
      compatibility:sha256:b2ccd4c290c62f76bfe8cbdda3ee5cdda533d72b72e1c5124b9dd9bda53a1641:
        aggregate_digest: "sha256:49017a8d6fc6683bd7964583118204ca33df1bf44c17950e47fb57a49f5cdd97"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T12:53:50.910Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_57483aa511add88af255d2ef"
          mutation_id: "compatibility:sha256:b2ccd4c290c62f76bfe8cbdda3ee5cdda533d72b72e1c5124b9dd9bda53a1641"
          plan_digest: "sha256:0d5bd41f20ecec14538c4c600a72dc82832ee6d6887f7651977b1f5ccbfd3f97"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081134-SRM6JM"
          task_revision: 10
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b2ccd4c290c62f76bfe8cbdda3ee5cdda533d72b72e1c5124b9dd9bda53a1641"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609081134-SRM6JM"
      compatibility:sha256:bc9f755a566326ee3951598742f61e9754964b3d4200e79cb0aa84acfae888c0:
        aggregate_digest: "sha256:60539ff2c1e9c6a2bbd3702d30be83bb688b4d534e251c8f77bc032ffbef2bbd"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T12:53:50.910Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3502022af9fae68b0db51ec5"
          mutation_id: "compatibility:sha256:bc9f755a566326ee3951598742f61e9754964b3d4200e79cb0aa84acfae888c0"
          plan_digest: "sha256:0d5bd41f20ecec14538c4c600a72dc82832ee6d6887f7651977b1f5ccbfd3f97"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081134-SRM6JM"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:bc9f755a566326ee3951598742f61e9754964b3d4200e79cb0aa84acfae888c0"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609081134-SRM6JM"
      compatibility:sha256:db12f5ae7215bdd69e42b6bd6b70871516017a632570a679afea51e4c6ddd04e:
        aggregate_digest: "sha256:dd572bf7ec996b005331625f28b3a7cfa7a8c9be41a7ca7de8a23e5015b364b8"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T12:30:47.174Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_9bab02f9752fc5a6328417f7"
          mutation_id: "compatibility:sha256:db12f5ae7215bdd69e42b6bd6b70871516017a632570a679afea51e4c6ddd04e"
          plan_digest: "sha256:d0d90df7f577a73e3ca2cf14a03ce13010a2d9201f6b297954cb2073231f780b"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081134-SRM6JM"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:db12f5ae7215bdd69e42b6bd6b70871516017a632570a679afea51e4c6ddd04e"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609081134-SRM6JM"
      external-result:work-order-202609081134-SRM6JM-executor-0c479114a89e4d5d1e1056b2:
        aggregate_digest: "sha256:0d8cd031a56f5899718837f20d7b370a742cb4b48e2ca6bb49f717b55d5ec5f1"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T12:53:53.931Z"
          cause_refs:
            - "semantic-result:sha256:37811be4e7c52308e6edd6a7ba48fc41ea48e88411cdc53b8a4d08ea6c1e7cf1"
          entity: "work_item"
          from: "PLANNED"
          id: "event_3994406bcb51e9099ac57f72"
          mutation_id: "external-result:work-order-202609081134-SRM6JM-executor-0c479114a89e4d5d1e1056b2"
          plan_digest: "sha256:0d5bd41f20ecec14538c4c600a72dc82832ee6d6887f7651977b1f5ccbfd3f97"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081134-SRM6JM"
          task_revision: 12
          to: "COMPLETED"
          work_item_id: "compact-exchange"
        mutation_id: "external-result:work-order-202609081134-SRM6JM-executor-0c479114a89e4d5d1e1056b2"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609081134-SRM6JM"
      external-result:work-order-202609081134-SRM6JM-executor-d99cafa918a2682d5a5bb746:
        aggregate_digest: "sha256:05712a37ed315f4da2e516109092e2edc356ec5ad45a18f48decd07cf6d88809"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T12:36:08.256Z"
          cause_refs:
            - "semantic-result:sha256:26b10c6dd3d80eedbddfa49fdd52688a1070592048b1b4908e3a5e11f42549c8"
          entity: "work_item"
          from: "READY"
          id: "event_6bbe2fc54927ead6be6931f0"
          mutation_id: "external-result:work-order-202609081134-SRM6JM-executor-d99cafa918a2682d5a5bb746"
          plan_digest: "sha256:0d5bd41f20ecec14538c4c600a72dc82832ee6d6887f7651977b1f5ccbfd3f97"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081134-SRM6JM"
          task_revision: 9
          to: "COMPLETED"
          work_item_id: "baseline"
        mutation_id: "external-result:work-order-202609081134-SRM6JM-executor-d99cafa918a2682d5a5bb746"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609081134-SRM6JM"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "443a5aafbab7af51de9b380ba49126c28f96c267"
  task_execution_context:
    base_ref: "main"
    base_sha: "33e106d611fe92603cb836bdcd500a1c624d206b"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "33e106d611fe92603cb836bdcd500a1c624d206b"
    version: 1
id_source: "generated"
---
## Summary

Reduce agent protocol overhead for small code changes

Implement the user-approved optimization plan in dependency order: establish a reproducible one-condition-change benchmark; issue compact role- and episode-specific result schemas; assemble CLI-owned result identity from the immutable issued episode; remove duplicated planning criteria and summaries; optimize measured repeated CLI preparation work; rerun performance and authority, stale-result, scope, recovery, and historical-exchange compatibility checks. Target at least 70 percent less required schema bytes and 50 percent less generated protocol payload on the small fixture. Report measured wall time separately from provider and user waiting. Preserve existing verification and authority guarantees. Reuse existing benchmark infrastructure. Do not publish, push, merge, change dependencies, or rewrite historical artifacts. Coordinate with active reliability task 202609080727-BAWTEE and avoid duplicating its changes. Paid provider comparison requires available explicitly authorized runtime; never represent fixture or byte measurements as observed provider-token savings.

## Scope

- In scope: Implement the user-approved optimization plan in dependency order: establish a reproducible one-condition-change benchmark; issue compact role- and episode-specific result schemas; assemble CLI-owned result identity from the immutable issued episode; remove duplicated planning criteria and summaries; optimize measured repeated CLI preparation work; rerun performance and authority, stale-result, scope, recovery, and historical-exchange compatibility checks. Target at least 70 percent less required schema bytes and 50 percent less generated protocol payload on the small fixture. Report measured wall time separately from provider and user waiting. Preserve existing verification and authority guarantees. Reuse existing benchmark infrastructure. Do not publish, push, merge, change dependencies, or rewrite historical artifacts. Coordinate with active reliability task 202609080727-BAWTEE and avoid duplicating its changes. Paid provider comparison requires available explicitly authorized runtime; never represent fixture or byte measurements as observed provider-token savings.
- Out of scope: unrelated refactors not required for "Reduce agent protocol overhead for small code changes".

## Plan

Execute four sequential WorkItems: establish matched measurements, compact the result exchange, compact planning, then profile and qualify. Preserve immutable episode authority and historical exchanges. Stop before external publication.

## Verify Steps

PLANNER fallback scaffold for "Reduce agent protocol overhead for small code changes". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Reduce agent protocol overhead for small code changes". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
