---
id: "202608241454-4JK4MP"
title: "Allow replacement after a rejected external-agent result"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "external-agent"
  - "release-blocker"
  - "task-centric"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:full"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --pool=forks --maxWorkers 1"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-24T15:03:31.838Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:76fe0070631f4f225c9d7f54c3618779dcc4162b4591455559b57eb9bcee2605"
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
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
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
      digest: "sha256:ce4aeccc091cbd17496410f6edf0465bac81d8231d84c7e56d2df6a8addde45a"
      escalation_reasons:
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
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
  hash: "5ffe76ac41f2454776e630a3caeb4ab359dbc52a"
  message: "🚧 4JK4MP task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 5ffe76ac41f2. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-24T15:04:18.458Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-24T15:36:15.171Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 5ffe76ac41f2. CLI accepted one state-bound external-agent semantic result."
    commit: "5ffe76ac41f2454776e630a3caeb4ab359dbc52a"
doc_version: 3
doc_updated_at: "2026-08-24T15:36:15.171Z"
doc_updated_by: "SUPERVISOR"
description: "Fix the external-agent supervisor so a schema-valid result that is durably recorded but later rejected by pre-apply implementation-authority validation does not permanently lock the exchange or replay the same failure. Preserve immutable accepted/consumed result semantics and effect-in-doubt safety. Add a regression for completed implementation with no workspace change followed by a corrected replacement exchange, plus conflicting replay coverage. This is a v0.7.8 release blocker discovered by task 202608241434-NCQYZ4; it must remain a separate code Task and merge before a fresh release attempt."
sections:
  Summary: |-
    Allow replacement after a rejected external-agent result

    Fix the external-agent supervisor so a schema-valid result that is durably recorded but later rejected by pre-apply implementation-authority validation does not permanently lock the exchange or replay the same failure. Preserve immutable accepted/consumed result semantics and effect-in-doubt safety. Add a regression for completed implementation with no workspace change followed by a corrected replacement exchange, plus conflicting replay coverage. This is a v0.7.8 release blocker discovered by task 202608241434-NCQYZ4; it must remain a separate code Task and merge before a fresh release attempt.
  Scope: |-
    - In scope: Fix the external-agent supervisor so a schema-valid result that is durably recorded but later rejected by pre-apply implementation-authority validation does not permanently lock the exchange or replay the same failure. Preserve immutable accepted/consumed result semantics and effect-in-doubt safety. Add a regression for completed implementation with no workspace change followed by a corrected replacement exchange, plus conflicting replay coverage. This is a v0.7.8 release blocker discovered by task 202608241434-NCQYZ4; it must remain a separate code Task and merge before a fresh release attempt.
    - Out of scope: unrelated refactors not required for "Allow replacement after a rejected external-agent result".
  Plan: "Make pre-apply external-agent result rejection recoverable without weakening immutable accepted or consumed result semantics. The supervisor must retire or replace only a result rejected before any workspace, Git, task, provider, or completion effect, emit a fresh exchange for the corrected result, and remain fail-closed for effect-in-doubt cases. Add focused regressions for a completed implementation result with no supervisor-observed workspace change followed by a corrected replacement, conflicting replay, and effect-in-doubt preservation. Validate the focused suite, full local CI, and diff hygiene."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --pool=forks --maxWorkers 1`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
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
  agentplane.execution_grant:
    actor: "HOST:codex:USER"
    approval_evidence_digest: "sha256:76fe0070631f4f225c9d7f54c3618779dcc4162b4591455559b57eb9bcee2605"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:fba971ef6a121384c40c5fc93d8592325723d6d58911d7f1df7633db663de72c"
    digest: "sha256:41252622201e50a621c087324d219d3e279929874d8392138e4dcf7f8783c0ab"
    grant_id: "4bb9fc82-8e9d-48b1-a5cc-17a1d76b73d2"
    issued_at: "2026-08-24T15:03:31.838Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:c2671f2b38334925bdba49ce6ca5bb48a508cfc2d240dceaccc13e9386a1d5ae"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:f2597e379e84d7b1cabc5d1fe65f4cdc98cc2387e3b61c1b60d7ce1c79cf0131"
    status: "active"
    task_id: "202608241454-4JK4MP"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-24T15:03:31.838Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:59b6caaf421ce23da09ad85699015e1b17e62d55c0be652a5a7bf4740d1e7e91"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-08-24T14:58:21.773Z"
      digest: "sha256:59b6caaf421ce23da09ad85699015e1b17e62d55c0be652a5a7bf4740d1e7e91"
      proposal:
        assumptions:
          - "A rejected result may be replaced only when the supervisor can classify the failure as occurring before all supervisor-owned effects."
          - "Existing effect markers and repository observations are sufficient to distinguish provably pre-apply rejection from effect-in-doubt; if they are not, implementation must fail closed rather than broaden recovery."
        planning_baseline:
          captured_at: "2026-08-24T14:54:50.714Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:004ab839b2e5f2a8d6708f8635e720445c2dfbe16f3c3eee3a9939b5f839cacd"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608241434-129F8R/README.md"
            - ".agentplane/tasks/202608241434-EH8E74/README.md"
            - ".agentplane/tasks/202608241434-KCC9K4/README.md"
            - ".agentplane/tasks/202608241434-QQNDGT/README.md"
            - ".agentplane/tasks/202608241434-SFPD91/README.md"
            - ".agentplane/tasks/202608241434-TA84WK/README.md"
            - ".agentplane/tasks/202608241434-WVYA5T/README.md"
            - ".agentplane/tasks/202608241435-40YZCE/README.md"
            - ".agentplane/tasks/202608241435-73DA89/README.md"
            - ".agentplane/tasks/202608241435-D001ET/README.md"
            - ".agentplane/tasks/202608241435-HTV4K2/README.md"
            - ".agentplane/tasks/202608241435-NDR0BX/README.md"
            - ".agentplane/tasks/202608241435-RJXGHQ/README.md"
            - ".agentplane/tasks/202608241435-W3DG6V/README.md"
            - ".agentplane/tasks/202608241435-YSW0E0/README.md"
            - ".agentplane/tasks/202608241436-2G9DA8/README.md"
            - ".agentplane/tasks/202608241436-63W678/README.md"
            - ".agentplane/tasks/202608241436-8PJKJP/README.md"
            - ".agentplane/tasks/202608241436-99B067/README.md"
            - ".agentplane/tasks/202608241436-A87Y59/README.md"
            - ".agentplane/tasks/202608241436-DHPR5E/README.md"
            - ".agentplane/tasks/202608241436-H60MCY/README.md"
            - ".agentplane/tasks/202608241436-TX6TRF/README.md"
            - ".agentplane/tasks/202608241436-W6A113/README.md"
            - ".agentplane/tasks/202608241437-5YZ0N8/README.md"
            - ".agentplane/tasks/202608241437-H5418M/README.md"
            - ".agentplane/tasks/202608241437-SH3CDX/README.md"
            - ".agentplane/tasks/202608241437-V8BA7Q/README.md"
            - ".agentplane/tasks/202608241437-XY3950/README.md"
            - ".agentplane/tasks/202608241454-4JK4MP/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "a788399c9ccc27ae290ddbfd6244fcb3196cf643"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608241454-4JK4MP"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --pool=forks --maxWorkers 1"
              id: "check-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "check-full"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "check-diff"
              kind: "deterministic"
              required: true
              timeout_ms: 60000
          criteria:
            -
              check_ids:
                - "check-focused"
                - "check-full"
                - "check-diff"
              description: "The release task can recover from a no-workspace-change result rejection by receiving a fresh exchange, while accepted, consumed, and effect-in-doubt results retain their current safety guarantees."
              id: "criterion-release-blocker-removed"
              required: true
          evidence_fingerprint: "sha256:b5087dca49c13345dda4ee7361c23d83be12caa9f2161b66aea68eac2c1834f0"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-focused"
                  description: "After a schema-valid implementation result is rejected before any apply effect because no supervisor-observed workspace change exists, AgentPlane permits a fresh exchange and accepts a corrected result instead of replaying or digest-conflicting forever."
                  id: "criterion-corrected-result"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                    - "check-full"
                  description: "Accepted or consumed results remain immutable, and a conflicting replay is rejected without duplicating effects."
                  id: "criterion-immutable-terminal-result"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                    - "check-full"
                  description: "A result whose repository, task, provider, or completion effect may have begun is never auto-retired or re-applied and remains fail-closed for explicit recovery."
                  id: "criterion-effect-in-doubt"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                    - "check-full"
                    - "check-diff"
                  description: "Focused external-agent recovery tests and the full local CI suite pass, and changed files have no whitespace errors."
                  id: "criterion-regression-free"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 262144
                optional_sources:
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                symbol_hints:
                  - "applyAcceptedExternalAgentResult"
                  - "acceptExternalAgentResult"
                  - "recoverExternalAgentExchange"
                  - "result_received"
                  - "effect_in_doubt"
              depends_on: []
              expected_outputs:
                - "recoverable-pre-apply-exchange-rejection"
                - "external-agent-result-recovery-regressions"
              id: "recover-rejected-exchange"
              objective: "Allow a corrected result after a provably pre-apply external-agent rejection while preserving immutable accepted and consumed results and effect-in-doubt safety."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --pool=forks --maxWorkers 1"
                    id: "check-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "check-full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "check-diff"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 60000
                criteria:
                  -
                    check_ids:
                      - "check-focused"
                    description: "After a schema-valid implementation result is rejected before any apply effect because no supervisor-observed workspace change exists, AgentPlane permits a fresh exchange and accepts a corrected result instead of replaying or digest-conflicting forever."
                    id: "criterion-corrected-result"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                      - "check-full"
                    description: "Accepted or consumed results remain immutable, and a conflicting replay is rejected without duplicating effects."
                    id: "criterion-immutable-terminal-result"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                      - "check-full"
                    description: "A result whose repository, task, provider, or completion effect may have begun is never auto-retired or re-applied and remains fail-closed for explicit recovery."
                    id: "criterion-effect-in-doubt"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                      - "check-full"
                      - "check-diff"
                    description: "Focused external-agent recovery tests and the full local CI suite pass, and changed files have no whitespace errors."
                    id: "criterion-regression-free"
                    required: true
                evidence_fingerprint: "sha256:4951417dbffc38c87b1f93da1bbc6bd093ab8e1c3638a3b7dd158e1236eb4177"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608241454-4JK4MP"
    event_cursor: 0
    final_validation: null
    id: "202608241454-4JK4MP"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --pool=forks --maxWorkers 1"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "git diff --check"
          id: "legacy-3"
          required: true
      captured_at: "2026-08-24T14:54:35.747Z"
      constraints: []
      request: |-
        Allow replacement after a rejected external-agent result

        Fix the external-agent supervisor so a schema-valid result that is durably recorded but later rejected by pre-apply implementation-authority validation does not permanently lock the exchange or replay the same failure. Preserve immutable accepted/consumed result semantics and effect-in-doubt safety. Add a regression for completed implementation with no workspace change followed by a corrected replacement exchange, plus conflicting replay coverage. This is a v0.7.8 release blocker discovered by task 202608241434-NCQYZ4; it must remain a separate code Task and merge before a fresh release attempt.
      task_id: "202608241454-4JK4MP"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-24T15:03:31.838Z"
    work_items:
      recover-rejected-exchange:
        attempt: 0
        claim_id: null
        id: "recover-rejected-exchange"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  implementation_commit:
    hash: "5ffe76ac41f2454776e630a3caeb4ab359dbc52a"
  task_execution_context:
    base_ref: "main"
    base_sha: "a788399c9ccc27ae290ddbfd6244fcb3196cf643"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "a788399c9ccc27ae290ddbfd6244fcb3196cf643"
    version: 1
id_source: "generated"
---
## Summary

Allow replacement after a rejected external-agent result

Fix the external-agent supervisor so a schema-valid result that is durably recorded but later rejected by pre-apply implementation-authority validation does not permanently lock the exchange or replay the same failure. Preserve immutable accepted/consumed result semantics and effect-in-doubt safety. Add a regression for completed implementation with no workspace change followed by a corrected replacement exchange, plus conflicting replay coverage. This is a v0.7.8 release blocker discovered by task 202608241434-NCQYZ4; it must remain a separate code Task and merge before a fresh release attempt.

## Scope

- In scope: Fix the external-agent supervisor so a schema-valid result that is durably recorded but later rejected by pre-apply implementation-authority validation does not permanently lock the exchange or replay the same failure. Preserve immutable accepted/consumed result semantics and effect-in-doubt safety. Add a regression for completed implementation with no workspace change followed by a corrected replacement exchange, plus conflicting replay coverage. This is a v0.7.8 release blocker discovered by task 202608241434-NCQYZ4; it must remain a separate code Task and merge before a fresh release attempt.
- Out of scope: unrelated refactors not required for "Allow replacement after a rejected external-agent result".

## Plan

Make pre-apply external-agent result rejection recoverable without weakening immutable accepted or consumed result semantics. The supervisor must retire or replace only a result rejected before any workspace, Git, task, provider, or completion effect, emit a fresh exchange for the corrected result, and remain fail-closed for effect-in-doubt cases. Add focused regressions for a completed implementation result with no supervisor-observed workspace change followed by a corrected replacement, conflicting replay, and effect-in-doubt preservation. Validate the focused suite, full local CI, and diff hygiene.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --pool=forks --maxWorkers 1`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
