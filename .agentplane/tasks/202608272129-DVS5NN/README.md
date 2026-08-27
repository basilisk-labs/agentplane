---
id: "202608272129-DVS5NN"
title: "Resolve protected integration handoffs from their owning checkout"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202608271649-DVNTRR"
tags:
  - "code"
  - "release-blocker"
  - "tests"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:full"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-27T21:37:08.002Z"
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
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
      - "packages/agentplane/src/commands/pr/flow-status.ts"
      - "packages/agentplane/src/commands/shared/route-decision.ts"
      - "packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
      - "packages/agentplane/src/commands/shared/task-handoff-reader.ts"
      - "packages/agentplane/src/commands/task/handoff-show.command.ts"
      - "packages/agentplane/src/commands/task/handoff.shared.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "All external actions and formal lifecycle transitions remain owned by AgentPlane."
      - "Repair a reproduced integration-route regression with isolated read-only ownership resolution and positive/negative recovery tests."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
      - "packages/agentplane/src/commands/pr/flow-status.ts"
      - "packages/agentplane/src/commands/shared/route-decision.ts"
      - "packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
      - "packages/agentplane/src/commands/shared/task-handoff-reader.ts"
      - "packages/agentplane/src/commands/task/handoff-show.command.ts"
      - "packages/agentplane/src/commands/task/handoff.shared.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
          - "packages/agentplane/src/commands/pr/flow-status.ts"
          - "packages/agentplane/src/commands/shared/route-decision.ts"
          - "packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
          - "packages/agentplane/src/commands/shared/task-handoff-reader.ts"
          - "packages/agentplane/src/commands/task/handoff-show.command.ts"
          - "packages/agentplane/src/commands/task/handoff.shared.ts"
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
      digest: "sha256:26d309d7023f5ec9709eceb59ddf53e4d0c5d5b12d22790dbbc57e0a7f816a83"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/route-decision.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-handoff-reader.ts"
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
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-27T21:37:58.045Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-27T21:37:58.045Z"
doc_updated_by: "CODER"
description: "Repair the reproduced protected-integration handoff reader/owner mismatch on main db908ae90dd32609c6d12454fe87166a08e6ec4e. The focused integration diagnostic has 12 passing and 3 failing tests; run-cli.core.pr-conflict-rework.test.ts:842 fails because the expected legacy adoption route is unavailable. Confirm the exact route and cause before changing behavior. The integration writer persists the handoff on the base checkout, while task route hydration redirects readers to the task worktree. Real task handoff show from a worktree also failed to find the base-owned INTEGRATOR artifact. Cover one complete scenario: persisted protected-base handoff, task-worktree route/show/resume reads, explicit legacy adoption where applicable, repeat read/recovery, and the next transition. Use existing task execution ownership and base resolution. Reject wrong task, branch, head, base, PR identity, malformed or ambiguous evidence. Preserve direct and worktree-local handoff behavior. Keep read-only probes non-mutating. Do not copy or rewrite lifecycle artifacts, introduce a new state store, relax authority or exact-identity guards, change required CI, alter release/Core order, or implement AP-CORE-013. Scope the smallest necessary shared handoff reader, route/PR-flow consumers, and regression tests through a structured plan. The other two diagnostic failures, incident verification target and provider-neutral error wording, are separate causes and are out of scope. Run focused positive/negative/replay tests and full mandatory CI. The user authorized autonomous refactoring and supported exact operator approvals; release publication remains separate."
sections:
  Summary: |-
    Resolve protected integration handoffs from their owning checkout

    Repair the reproduced protected-integration handoff reader/owner mismatch on main db908ae90dd32609c6d12454fe87166a08e6ec4e. The focused integration diagnostic has 12 passing and 3 failing tests; run-cli.core.pr-conflict-rework.test.ts:842 fails because the expected legacy adoption route is unavailable. Confirm the exact route and cause before changing behavior. The integration writer persists the handoff on the base checkout, while task route hydration redirects readers to the task worktree. Real task handoff show from a worktree also failed to find the base-owned INTEGRATOR artifact. Cover one complete scenario: persisted protected-base handoff, task-worktree route/show/resume reads, explicit legacy adoption where applicable, repeat read/recovery, and the next transition. Use existing task execution ownership and base resolution. Reject wrong task, branch, head, base, PR identity, malformed or ambiguous evidence. Preserve direct and worktree-local handoff behavior. Keep read-only probes non-mutating. Do not copy or rewrite lifecycle artifacts, introduce a new state store, relax authority or exact-identity guards, change required CI, alter release/Core order, or implement AP-CORE-013. Scope the smallest necessary shared handoff reader, route/PR-flow consumers, and regression tests through a structured plan. The other two diagnostic failures, incident verification target and provider-neutral error wording, are separate causes and are out of scope. Run focused positive/negative/replay tests and full mandatory CI. The user authorized autonomous refactoring and supported exact operator approvals; release publication remains separate.
  Scope: |-
    - In scope: Repair the reproduced protected-integration handoff reader/owner mismatch on main db908ae90dd32609c6d12454fe87166a08e6ec4e. The focused integration diagnostic has 12 passing and 3 failing tests; run-cli.core.pr-conflict-rework.test.ts:842 fails because the expected legacy adoption route is unavailable. Confirm the exact route and cause before changing behavior. The integration writer persists the handoff on the base checkout, while task route hydration redirects readers to the task worktree. Real task handoff show from a worktree also failed to find the base-owned INTEGRATOR artifact. Cover one complete scenario: persisted protected-base handoff, task-worktree route/show/resume reads, explicit legacy adoption where applicable, repeat read/recovery, and the next transition. Use existing task execution ownership and base resolution. Reject wrong task, branch, head, base, PR identity, malformed or ambiguous evidence. Preserve direct and worktree-local handoff behavior. Keep read-only probes non-mutating. Do not copy or rewrite lifecycle artifacts, introduce a new state store, relax authority or exact-identity guards, change required CI, alter release/Core order, or implement AP-CORE-013. Scope the smallest necessary shared handoff reader, route/PR-flow consumers, and regression tests through a structured plan. The other two diagnostic failures, incident verification target and provider-neutral error wording, are separate causes and are out of scope. Run focused positive/negative/replay tests and full mandatory CI. The user authorized autonomous refactoring and supported exact operator approvals; release publication remains separate.
    - Out of scope: unrelated refactors not required for "Resolve protected integration handoffs from their owning checkout".
  Plan: "Confirm the missing base-owned protected handoff in the failing route, then implement a bounded read-only ownership-aware reader using existing task execution and base-checkout resolution. Wire route/PR-flow and task handoff show/resume consumers to that reader. Keep the existing writer and artifact format unchanged. Preserve valid local/direct handoffs. Validate exact task identity and preserve downstream branch, HEAD, base, PR and adoption-token guards. Refuse malformed, mismatched, or ambiguous protected evidence. Cover persisted external-effect recovery, repeated reads, explicit legacy adoption and the following transition without mutating either checkout. Run the focused handoff and conflict suites, full CI, lint/format and diff check. Return blocked if the cause or required scope differs materially."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:f5d15092e0d6f945c4e77d19b5f5db622dce50d0a53b3ab044a476858c80e760"
    grant_id: "8f672506-569a-454e-b6e0-fb6bbea002a4"
    issued_at: "2026-08-27T21:37:08.002Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:fd556db58392680ccb9422d01c483303effa306a11aa83d63d55e320b303e9f3"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608272129-DVS5NN"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-27T21:37:08.002Z"
        approved_by: "USER"
        approved_digest: "sha256:d4e602f5637f6025a37079f35f393e6a449494dc25e974efaabeab4ec7dfb009"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-27T21:32:57.895Z"
      digest: "sha256:d4e602f5637f6025a37079f35f393e6a449494dc25e974efaabeab4ec7dfb009"
      proposal:
        assumptions:
          - "One reader/owner mismatch is the bounded cause; implementation must confirm it with the actual failing route before changing behavior."
          - "The existing protected integration writer remains the owner on the base checkout; no state-store migration is needed."
          - "Read-only handoff resolution can be implemented using existing task/base identity; any material authority or ownership redesign requires scope review."
        planning_baseline:
          captured_at: "2026-08-27T21:30:11.713Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:6824d104908d2bdddace4f310347d160c8b89adb71e38b2b6e49f553d141f2a2"
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
            - ".agentplane/tasks/202608250007-P5BWP0/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608251038-42AC0D/README.md"
            - ".agentplane/tasks/202608251053-QAZ236/README.md"
            - ".agentplane/tasks/202608251706-V287W1/README.md"
            - ".agentplane/tasks/202608251735-ZJ7YZE/README.md"
            - ".agentplane/tasks/202608252233-JR4T47/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608262032-MAJQ5E/README.md"
            - ".agentplane/tasks/202608270848-0RAFH9/README.md"
            - ".agentplane/tasks/202608270848-37XB2K/README.md"
            - ".agentplane/tasks/202608270848-N28TBB/README.md"
            - ".agentplane/tasks/202608270848-V32542/README.md"
            - ".agentplane/tasks/202608271350-HVGQPQ/README.md"
            - ".agentplane/tasks/202608272129-DVS5NN/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "db908ae90dd32609c6d12454fe87166a08e6ec4e"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608272129-DVS5NN"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-ci"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "diff-check"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "The reproduced legacy adoption scenario succeeds through the existing explicit authority boundary after a base-owned protected handoff is read from task-worktree route/show/resume contexts. A fresh route diagnostic identifies the original missing evidence. Ordinary direct and worktree-local handoffs remain readable."
              id: "owner-readback"
              required: true
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "Regression tests reject wrong task, branch, head, base and PR identities and malformed or ambiguous protected evidence. Repeated reads and recovery after the persisted external effect preserve both checkout HEADs, tracked/untracked state, and handoff bytes. The next adoption/route transition uses the existing exact-token guards and no self-issued approval."
              id: "identity-and-recovery"
              required: true
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/task-handoff-reader.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts --pool=forks --maxWorkers=1. All existing and added scenarios pass without skips or timeout increases. Run scoped lint/format and full mandatory CI. No writer/state store/schema/authority/policy/CI/release/roadmap change. Record the two unrelated diagnostic failures as deferred, not solved."
              id: "bounded-verification"
              required: true
          evidence_fingerprint: "sha256:6824d104908d2bdddace4f310347d160c8b89adb71e38b2b6e49f553d141f2a2"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "The reproduced legacy adoption scenario succeeds through the existing explicit authority boundary after a base-owned protected handoff is read from task-worktree route/show/resume contexts. A fresh route diagnostic identifies the original missing evidence. Ordinary direct and worktree-local handoffs remain readable."
                  id: "owner-readback"
                  required: true
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "Regression tests reject wrong task, branch, head, base and PR identities and malformed or ambiguous protected evidence. Repeated reads and recovery after the persisted external effect preserve both checkout HEADs, tracked/untracked state, and handoff bytes. The next adoption/route transition uses the existing exact-token guards and no self-issued approval."
                  id: "identity-and-recovery"
                  required: true
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/task-handoff-reader.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts --pool=forks --maxWorkers=1. All existing and added scenarios pass without skips or timeout increases. Run scoped lint/format and full mandatory CI. No writer/state store/schema/authority/policy/CI/release/roadmap change. Record the two unrelated diagnostic failures as deferred, not solved."
                  id: "bounded-verification"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
                  - "packages/agentplane/src/commands/pr/conflict-rework-route-eligibility.ts"
                required_sources:
                  - "packages/agentplane/src/commands/shared/task-handoff.ts"
                  - "packages/agentplane/src/commands/pr/integrate/internal/protected-base-handoff.ts"
                  - "packages/agentplane/src/commands/shared/route-decision.ts"
                  - "packages/agentplane/src/commands/task/handoff.shared.ts"
                  - "packages/agentplane/src/commands/task/handoff-show.command.ts"
                  - "packages/agentplane/src/commands/pr/flow-status.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
                symbol_hints:
                  - "resolveTaskHandoffPaths"
                  - "resolvePrFlowStatus"
                  - "loadTaskCommandContext"
                  - "buildTaskResumeContext"
              depends_on: []
              expected_outputs:
                - "artifact:handoff-readback-report"
              id: "repair-protected-handoff-readback"
              objective: "Confirm the missing base-owned protected handoff in the failing route, then implement a bounded read-only ownership-aware reader using existing task execution and base-checkout resolution. Wire route/PR-flow and task handoff show/resume consumers to that reader. Keep the existing writer and artifact format unchanged. Preserve valid local/direct handoffs. Validate exact task identity and preserve downstream branch, HEAD, base, PR and adoption-token guards. Refuse malformed, mismatched, or ambiguous protected evidence. Cover persisted external-effect recovery, repeated reads, explicit legacy adoption and the following transition without mutating either checkout. Run the focused handoff and conflict suites, full CI, lint/format and diff check. Return blocked if the cause or required scope differs materially."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/task-handoff-reader.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/route-decision.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/handoff.shared.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/handoff-show.command.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/pr/flow-status.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/shared/task-handoff-reader.ts"
                - "packages/agentplane/src/commands/shared/task-handoff-reader.test.ts"
                - "packages/agentplane/src/commands/shared/route-decision.ts"
                - "packages/agentplane/src/commands/task/handoff.shared.ts"
                - "packages/agentplane/src/commands/task/handoff-show.command.ts"
                - "packages/agentplane/src/commands/pr/flow-status.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-ci"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "diff-check"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "The reproduced legacy adoption scenario succeeds through the existing explicit authority boundary after a base-owned protected handoff is read from task-worktree route/show/resume contexts. A fresh route diagnostic identifies the original missing evidence. Ordinary direct and worktree-local handoffs remain readable."
                    id: "owner-readback"
                    required: true
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "Regression tests reject wrong task, branch, head, base and PR identities and malformed or ambiguous protected evidence. Repeated reads and recovery after the persisted external effect preserve both checkout HEADs, tracked/untracked state, and handoff bytes. The next adoption/route transition uses the existing exact-token guards and no self-issued approval."
                    id: "identity-and-recovery"
                    required: true
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/task-handoff-reader.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts --pool=forks --maxWorkers=1. All existing and added scenarios pass without skips or timeout increases. Run scoped lint/format and full mandatory CI. No writer/state store/schema/authority/policy/CI/release/roadmap change. Record the two unrelated diagnostic failures as deferred, not solved."
                    id: "bounded-verification"
                    required: true
                evidence_fingerprint: "sha256:6824d104908d2bdddace4f310347d160c8b89adb71e38b2b6e49f553d141f2a2"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608272129-DVS5NN"
    event_cursor: 0
    final_validation: null
    id: "202608272129-DVS5NN"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "git diff --check"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-27T21:29:51.777Z"
      constraints: []
      request: |-
        Resolve protected integration handoffs from their owning checkout

        Repair the reproduced protected-integration handoff reader/owner mismatch on main db908ae90dd32609c6d12454fe87166a08e6ec4e. The focused integration diagnostic has 12 passing and 3 failing tests; run-cli.core.pr-conflict-rework.test.ts:842 fails because the expected legacy adoption route is unavailable. Confirm the exact route and cause before changing behavior. The integration writer persists the handoff on the base checkout, while task route hydration redirects readers to the task worktree. Real task handoff show from a worktree also failed to find the base-owned INTEGRATOR artifact. Cover one complete scenario: persisted protected-base handoff, task-worktree route/show/resume reads, explicit legacy adoption where applicable, repeat read/recovery, and the next transition. Use existing task execution ownership and base resolution. Reject wrong task, branch, head, base, PR identity, malformed or ambiguous evidence. Preserve direct and worktree-local handoff behavior. Keep read-only probes non-mutating. Do not copy or rewrite lifecycle artifacts, introduce a new state store, relax authority or exact-identity guards, change required CI, alter release/Core order, or implement AP-CORE-013. Scope the smallest necessary shared handoff reader, route/PR-flow consumers, and regression tests through a structured plan. The other two diagnostic failures, incident verification target and provider-neutral error wording, are separate causes and are out of scope. Run focused positive/negative/replay tests and full mandatory CI. The user authorized autonomous refactoring and supported exact operator approvals; release publication remains separate.
      task_id: "202608272129-DVS5NN"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-27T21:37:08.002Z"
    work_items:
      repair-protected-handoff-readback:
        attempt: 0
        claim_id: null
        id: "repair-protected-handoff-readback"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "db908ae90dd32609c6d12454fe87166a08e6ec4e"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "db908ae90dd32609c6d12454fe87166a08e6ec4e"
    version: 1
id_source: "generated"
---
## Summary

Resolve protected integration handoffs from their owning checkout

Repair the reproduced protected-integration handoff reader/owner mismatch on main db908ae90dd32609c6d12454fe87166a08e6ec4e. The focused integration diagnostic has 12 passing and 3 failing tests; run-cli.core.pr-conflict-rework.test.ts:842 fails because the expected legacy adoption route is unavailable. Confirm the exact route and cause before changing behavior. The integration writer persists the handoff on the base checkout, while task route hydration redirects readers to the task worktree. Real task handoff show from a worktree also failed to find the base-owned INTEGRATOR artifact. Cover one complete scenario: persisted protected-base handoff, task-worktree route/show/resume reads, explicit legacy adoption where applicable, repeat read/recovery, and the next transition. Use existing task execution ownership and base resolution. Reject wrong task, branch, head, base, PR identity, malformed or ambiguous evidence. Preserve direct and worktree-local handoff behavior. Keep read-only probes non-mutating. Do not copy or rewrite lifecycle artifacts, introduce a new state store, relax authority or exact-identity guards, change required CI, alter release/Core order, or implement AP-CORE-013. Scope the smallest necessary shared handoff reader, route/PR-flow consumers, and regression tests through a structured plan. The other two diagnostic failures, incident verification target and provider-neutral error wording, are separate causes and are out of scope. Run focused positive/negative/replay tests and full mandatory CI. The user authorized autonomous refactoring and supported exact operator approvals; release publication remains separate.

## Scope

- In scope: Repair the reproduced protected-integration handoff reader/owner mismatch on main db908ae90dd32609c6d12454fe87166a08e6ec4e. The focused integration diagnostic has 12 passing and 3 failing tests; run-cli.core.pr-conflict-rework.test.ts:842 fails because the expected legacy adoption route is unavailable. Confirm the exact route and cause before changing behavior. The integration writer persists the handoff on the base checkout, while task route hydration redirects readers to the task worktree. Real task handoff show from a worktree also failed to find the base-owned INTEGRATOR artifact. Cover one complete scenario: persisted protected-base handoff, task-worktree route/show/resume reads, explicit legacy adoption where applicable, repeat read/recovery, and the next transition. Use existing task execution ownership and base resolution. Reject wrong task, branch, head, base, PR identity, malformed or ambiguous evidence. Preserve direct and worktree-local handoff behavior. Keep read-only probes non-mutating. Do not copy or rewrite lifecycle artifacts, introduce a new state store, relax authority or exact-identity guards, change required CI, alter release/Core order, or implement AP-CORE-013. Scope the smallest necessary shared handoff reader, route/PR-flow consumers, and regression tests through a structured plan. The other two diagnostic failures, incident verification target and provider-neutral error wording, are separate causes and are out of scope. Run focused positive/negative/replay tests and full mandatory CI. The user authorized autonomous refactoring and supported exact operator approvals; release publication remains separate.
- Out of scope: unrelated refactors not required for "Resolve protected integration handoffs from their owning checkout".

## Plan

Confirm the missing base-owned protected handoff in the failing route, then implement a bounded read-only ownership-aware reader using existing task execution and base-checkout resolution. Wire route/PR-flow and task handoff show/resume consumers to that reader. Keep the existing writer and artifact format unchanged. Preserve valid local/direct handoffs. Validate exact task identity and preserve downstream branch, HEAD, base, PR and adoption-token guards. Refuse malformed, mismatched, or ambiguous protected evidence. Cover persisted external-effect recovery, repeated reads, explicit legacy adoption and the following transition without mutating either checkout. Run the focused handoff and conflict suites, full CI, lint/format and diff check. Return blocked if the cause or required scope differs materially.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
