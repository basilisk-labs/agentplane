---
id: "202609051208-1AM5Z9"
title: "Repair Factory 9F9RDQ task revision projection after plan approval"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "regression"
  - "factory-recovery"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/backends/task-backend.revision-cas.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-05T12:13:09.943Z"
  updated_by: "USER"
  note: "Denis explicitly approved the narrow AgentPlane projection fix and recovery of existing Factory 9F9RDQ in this conversation. No provider publication, global install, live deploy or broader refactor."
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
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
      - "packages/agentplane/src/commands/task/plan.ts"
      - "packages/agentplane/src/commands/task/plan.unit.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Use one isolated worktree and existing mutation/approval primitives. No global installation, AgentPlane-agent messages, provider writes or live deployment."
      - "User explicitly approved a narrow AgentPlane fix and recovery of existing Factory 9F9RDQ."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
      - "packages/agentplane/src/commands/task/plan.ts"
      - "packages/agentplane/src/commands/task/plan.unit.test.ts"
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
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
          - "packages/agentplane/src/commands/task/plan.ts"
          - "packages/agentplane/src/commands/task/plan.unit.test.ts"
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
      digest: "sha256:9b537af74b6ded003c6cee476e9a434477d5b398c6824b67da704ff91a6eae76"
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
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-09-05T12:13:31.789Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-05T12:13:31.789Z"
doc_updated_by: "CODER"
description: "User-authorized bounded AgentPlane recovery for Arkady Factory 202609051108-9F9RDQ. Reproduce plan refinement and approval followed by start-ready failing with outer task revision 15 and aggregate revision 14 (expected 16 observed 14). Fix only the canonical projection/mutation owner and nearest regression tests; preserve compare-and-swap rejection of concurrent or tampered writes, plan/WorkItem authority, completed implementation fee2132323a2c081c715a14f932d761d3906a7ab, pending full verification, and all Factory evidence. Recover existing 9F9RDQ using the tested CLI, not manual storage edits or replacement tasks. No messages to the AgentPlane agent, broad Clean Core refactor, migration, global installation, release, provider publication or live deployment."
sections:
  Summary: |-
    Repair Factory 9F9RDQ task revision projection after plan approval

    User-authorized bounded AgentPlane recovery for Arkady Factory 202609051108-9F9RDQ. Reproduce plan refinement and approval followed by start-ready failing with outer task revision 15 and aggregate revision 14 (expected 16 observed 14). Fix only the canonical projection/mutation owner and nearest regression tests; preserve compare-and-swap rejection of concurrent or tampered writes, plan/WorkItem authority, completed implementation fee2132323a2c081c715a14f932d761d3906a7ab, pending full verification, and all Factory evidence. Recover existing 9F9RDQ using the tested CLI, not manual storage edits or replacement tasks. No messages to the AgentPlane agent, broad Clean Core refactor, migration, global installation, release, provider publication or live deployment.
  Scope: |-
    - In scope: User-authorized bounded AgentPlane recovery for Arkady Factory 202609051108-9F9RDQ. Reproduce plan refinement and approval followed by start-ready failing with outer task revision 15 and aggregate revision 14 (expected 16 observed 14). Fix only the canonical projection/mutation owner and nearest regression tests; preserve compare-and-swap rejection of concurrent or tampered writes, plan/WorkItem authority, completed implementation fee2132323a2c081c715a14f932d761d3906a7ab, pending full verification, and all Factory evidence. Recover existing 9F9RDQ using the tested CLI, not manual storage edits or replacement tasks. No messages to the AgentPlane agent, broad Clean Core refactor, migration, global installation, release, provider publication or live deployment.
    - Out of scope: unrelated refactors not required for "Repair Factory 9F9RDQ task revision projection after plan approval".
  Plan: "One bounded approval-projection repair using the existing task mutation owner. Reproduce first, retain CAS, and validate the same command as explicit recovery of Factory 9F9RDQ."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run test:project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/backends/task-backend.revision-cas.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    digest: "sha256:8c7d9e80c9f3356be04ad60ae0bead503f76b39340d02044c71b73963b75362a"
    grant_id: "b1098b77-4cde-487a-90f1-292b8f99802c"
    issued_at: "2026-09-05T12:13:09.943Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:c4dea7eb0a2eff11cc4e8de048fc08afd34df8e804a57ba763d0fa42a9a9576c"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609051208-1AM5Z9"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-05T12:13:09.943Z"
        approved_by: "USER"
        approved_digest: "sha256:399048f76d80664aa716a0c72ab0df3e60fad694d4b5421e90dffb09e8b578aa"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-09-05T12:12:20.232Z"
      digest: "sha256:399048f76d80664aa716a0c72ab0df3e60fad694d4b5421e90dffb09e8b578aa"
      proposal:
        assumptions:
          - "The user's latest approval covers this narrow AgentPlane source fix and named Factory recovery, not release or integration into AgentPlane main."
          - "Factory implementation fee2132323a2c081c715a14f932d761d3906a7ab and its verification artifacts remain unchanged."
          - "Use the verified task-worktree runtime for recovery without a global CLI upgrade."
        planning_baseline:
          captured_at: "2026-09-05T12:09:07.446Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:88eb48cd603161648b1b57b13ac5f95006fea85a6e8bc420c8906f1790581d12"
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
            - ".agentplane/tasks/202608291005-33PHG4/README.md"
            - ".agentplane/tasks/202608291006-0AJG13/README.md"
            - ".agentplane/tasks/202608291953-8YA3HG/README.md"
            - ".agentplane/tasks/202608312248-WXP9JS/README.md"
            - ".agentplane/tasks/202609051208-1AM5Z9/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "d345cdb14c53a98a85ece41ab472433f8e1fb32c"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609051208-1AM5Z9"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/backends/task-backend.revision-cas.test.ts"
              id: "projection-cas"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
          criteria:
            -
              check_ids:
                - "projection-cas"
              description: "Plan approval persists matching outer/aggregate revisions and lifecycle through the canonical mutation owner. Existing approved split projection can be reapproved without weakening plan digest or concurrent-write checks."
              id: "atomic-approval"
              required: true
            -
              check_ids:
                - "projection-cas"
              description: "Approval and recovery preserve WorkItem runtime, current plan authority and pending verification; concurrent or stale approval remains rejected. No manual storage changes or Factory implementation changes."
              id: "preservation"
              required: true
          evidence_fingerprint: "sha256:88eb48cd603161648b1b57b13ac5f95006fea85a6e8bc420c8906f1790581d12"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "projection-cas"
                  description: "Plan approval persists matching outer/aggregate revisions and lifecycle through the canonical mutation owner. Existing approved split projection can be reapproved without weakening plan digest or concurrent-write checks."
                  id: "atomic-approval"
                  required: true
                -
                  check_ids:
                    - "projection-cas"
                  description: "Approval and recovery preserve WorkItem runtime, current plan authority and pending verification; concurrent or stale approval remains rejected. No manual storage changes or Factory implementation changes."
                  id: "preservation"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 60000
                optional_sources:
                  - "packages/agentplane/src/commands/shared/task-mutation.ts"
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-projection.ts"
                  - "packages/agentplane/src/backends/task-backend.revision-cas.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/plan.ts"
                  - "packages/agentplane/src/commands/task/plan.unit.test.ts"
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
                symbol_hints:
                  - "cmdTaskPlanApprove"
                  - "applyTaskMutation"
                  - "materializeApprovedWorkItems"
              depends_on: []
              expected_outputs:
                - "approval-projection-fix"
                - "approval-cas-regressions"
              id: "approval-projection"
              objective: "Fix approval projection atomicity and regressions so matching approved task revisions can advance through start-ready while stale/concurrent writes remain rejected."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/plan.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/plan.unit.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/plan.ts"
                - "packages/agentplane/src/commands/task/plan.unit.test.ts"
                - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/backends/task-backend.revision-cas.test.ts"
                    id: "projection-cas"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "projection-cas"
                    description: "Plan approval persists matching outer/aggregate revisions and lifecycle through the canonical mutation owner. Existing approved split projection can be reapproved without weakening plan digest or concurrent-write checks."
                    id: "atomic-approval"
                    required: true
                  -
                    check_ids:
                      - "projection-cas"
                    description: "Approval and recovery preserve WorkItem runtime, current plan authority and pending verification; concurrent or stale approval remains rejected. No manual storage changes or Factory implementation changes."
                    id: "preservation"
                    required: true
                evidence_fingerprint: "sha256:88eb48cd603161648b1b57b13ac5f95006fea85a6e8bc420c8906f1790581d12"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609051208-1AM5Z9"
    event_cursor: 1
    final_validation: null
    id: "202609051208-1AM5Z9"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run test:project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/backends/task-backend.revision-cas.test.ts"
          id: "legacy-1"
          required: true
      captured_at: "2026-09-05T12:08:34.048Z"
      constraints: []
      request: |-
        Repair Factory 9F9RDQ task revision projection after plan approval

        User-authorized bounded AgentPlane recovery for Arkady Factory 202609051108-9F9RDQ. Reproduce plan refinement and approval followed by start-ready failing with outer task revision 15 and aggregate revision 14 (expected 16 observed 14). Fix only the canonical projection/mutation owner and nearest regression tests; preserve compare-and-swap rejection of concurrent or tampered writes, plan/WorkItem authority, completed implementation fee2132323a2c081c715a14f932d761d3906a7ab, pending full verification, and all Factory evidence. Recover existing 9F9RDQ using the tested CLI, not manual storage edits or replacement tasks. No messages to the AgentPlane agent, broad Clean Core refactor, migration, global installation, release, provider publication or live deployment.
      task_id: "202609051208-1AM5Z9"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 4
    schema_version: 1
    updated_at: "2026-09-05T12:13:31.789Z"
    work_items:
      approval-projection:
        attempt: 0
        claim_id: null
        id: "approval-projection"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events: []
    leases: []
    mutation_receipts:
      compatibility:sha256:5af220cb61132c6f31e42443ff31cabafc4bfeb7e6b83274454da186d225f456:
        aggregate_digest: "sha256:c5529957a0b9a20e73e8706dd8cb4699209891b7b701600e88e913d275449ede"
        event:
          actor_id: "agentplane"
          at: "2026-09-05T12:13:31.789Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_83a5ff5b52538288857b8d58"
          mutation_id: "compatibility:sha256:5af220cb61132c6f31e42443ff31cabafc4bfeb7e6b83274454da186d225f456"
          plan_digest: "sha256:399048f76d80664aa716a0c72ab0df3e60fad694d4b5421e90dffb09e8b578aa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609051208-1AM5Z9"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:5af220cb61132c6f31e42443ff31cabafc4bfeb7e6b83274454da186d225f456"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609051208-1AM5Z9"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "d345cdb14c53a98a85ece41ab472433f8e1fb32c"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "d345cdb14c53a98a85ece41ab472433f8e1fb32c"
    version: 1
id_source: "generated"
---
## Summary

Repair Factory 9F9RDQ task revision projection after plan approval

User-authorized bounded AgentPlane recovery for Arkady Factory 202609051108-9F9RDQ. Reproduce plan refinement and approval followed by start-ready failing with outer task revision 15 and aggregate revision 14 (expected 16 observed 14). Fix only the canonical projection/mutation owner and nearest regression tests; preserve compare-and-swap rejection of concurrent or tampered writes, plan/WorkItem authority, completed implementation fee2132323a2c081c715a14f932d761d3906a7ab, pending full verification, and all Factory evidence. Recover existing 9F9RDQ using the tested CLI, not manual storage edits or replacement tasks. No messages to the AgentPlane agent, broad Clean Core refactor, migration, global installation, release, provider publication or live deployment.

## Scope

- In scope: User-authorized bounded AgentPlane recovery for Arkady Factory 202609051108-9F9RDQ. Reproduce plan refinement and approval followed by start-ready failing with outer task revision 15 and aggregate revision 14 (expected 16 observed 14). Fix only the canonical projection/mutation owner and nearest regression tests; preserve compare-and-swap rejection of concurrent or tampered writes, plan/WorkItem authority, completed implementation fee2132323a2c081c715a14f932d761d3906a7ab, pending full verification, and all Factory evidence. Recover existing 9F9RDQ using the tested CLI, not manual storage edits or replacement tasks. No messages to the AgentPlane agent, broad Clean Core refactor, migration, global installation, release, provider publication or live deployment.
- Out of scope: unrelated refactors not required for "Repair Factory 9F9RDQ task revision projection after plan approval".

## Plan

One bounded approval-projection repair using the existing task mutation owner. Reproduce first, retain CAS, and validate the same command as explicit recovery of Factory 9F9RDQ.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run test:project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/backends/task-backend.revision-cas.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
