---
id: "202608311713-A0F906"
title: "Repair pure plan-refinement result recovery for M3 continuation"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-08-31T17:15:18.418Z"
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
    - "effect_external_write"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
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
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/task"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "External writes are limited to native code delivery. No deployment, credentials changes or release publication is requested."
      - "The repair changes lifecycle result admission and requires isolated tests and native hosted review."
    repository_effects:
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/task"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/task"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:0159d6234066b4eff34c0a2d702792ff148a8df233a290ec632b5706194a3708"
      escalation_reasons:
        - "external_effect_requires_real_e2e"
      execution_groups:
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
      requires_full_regression: false
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
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
    at: "2026-08-31T17:15:30.530Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-31T17:15:30.530Z"
doc_updated_by: "CODER"
description: "Bootstrap repair required by clean Task core refactoring task 202608291006-255K66. The native EXECUTOR packet explicitly permits result.plan_refinement, but a completed refinement-only result with no implementation changes is durably received and then rejected by applyExternalImplementationResult before TaskCentricBackendAdapter can record the refinement. task advance and task advance --replacement repeat the same no-workspace-change error. Implement a bounded native refinement-only path that preserves exact exchange identity, single-use result admission, baseline validation, plan-change classification, native task traceability and previous completed WorkItems. A refinement-only result must never claim completed implementation, trigger a fake commit, or complete the current WorkItem. Add regression coverage for initial receipt, lost response/replay, invalid or changed baseline, and retained ordinary completed-no-diff rejection. Do not edit any live task/exchange/journal records manually. After delivery, qualify recovery of the exact received M3 refinement and resume the canonical refactoring graph. No stable release publication is authorized by this repair."
sections:
  Summary: |-
    Repair pure plan-refinement result recovery for M3 continuation

    Bootstrap repair required by clean Task core refactoring task 202608291006-255K66. The native EXECUTOR packet explicitly permits result.plan_refinement, but a completed refinement-only result with no implementation changes is durably received and then rejected by applyExternalImplementationResult before TaskCentricBackendAdapter can record the refinement. task advance and task advance --replacement repeat the same no-workspace-change error. Implement a bounded native refinement-only path that preserves exact exchange identity, single-use result admission, baseline validation, plan-change classification, native task traceability and previous completed WorkItems. A refinement-only result must never claim completed implementation, trigger a fake commit, or complete the current WorkItem. Add regression coverage for initial receipt, lost response/replay, invalid or changed baseline, and retained ordinary completed-no-diff rejection. Do not edit any live task/exchange/journal records manually. After delivery, qualify recovery of the exact received M3 refinement and resume the canonical refactoring graph. No stable release publication is authorized by this repair.
  Scope: |-
    - In scope: Bootstrap repair required by clean Task core refactoring task 202608291006-255K66. The native EXECUTOR packet explicitly permits result.plan_refinement, but a completed refinement-only result with no implementation changes is durably received and then rejected by applyExternalImplementationResult before TaskCentricBackendAdapter can record the refinement. task advance and task advance --replacement repeat the same no-workspace-change error. Implement a bounded native refinement-only path that preserves exact exchange identity, single-use result admission, baseline validation, plan-change classification, native task traceability and previous completed WorkItems. A refinement-only result must never claim completed implementation, trigger a fake commit, or complete the current WorkItem. Add regression coverage for initial receipt, lost response/replay, invalid or changed baseline, and retained ordinary completed-no-diff rejection. Do not edit any live task/exchange/journal records manually. After delivery, qualify recovery of the exact received M3 refinement and resume the canonical refactoring graph. No stable release publication is authorized by this repair.
    - Out of scope: unrelated refactors not required for "Repair pure plan-refinement result recovery for M3 continuation".
  Plan: "One bounded bootstrap repair WorkItem with exact recovery and non-regression acceptance. Full CI and native hosted delivery remain required."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
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
    completion_contract_digest: "sha256:2bee65bfc3b0604ba82f49f73586220196bb36c23a1cccfd2206a0994481b365"
    digest: "sha256:8abead94d322a8e1901b8aa7ad12eb5a0b5d4d139f5c9b6e3ccc81e48750de1a"
    grant_id: "d3eaa22e-80c7-4fee-861b-60b4b999f90c"
    issued_at: "2026-08-31T17:15:18.418Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:5b2e471d1f987f40bf58fe111c397c7a7b7d98b9071228c421f85dd93bb95234"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:9225b51d473b5a4aeed46665e188e2d5cc0e89c91516d94b73596dc9b3c4e92e"
    status: "active"
    task_id: "202608311713-A0F906"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-31T17:15:18.418Z"
        approved_by: "USER"
        approved_digest: "sha256:8da4fa74be0069a851f6ba40054ce15a299d8bb4d6f6c279cd2f582ed115b829"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-31T17:15:01.956Z"
      digest: "sha256:8da4fa74be0069a851f6ba40054ce15a299d8bb4d6f6c279cd2f582ed115b829"
      proposal:
        assumptions:
          - "The repair is isolated from the active M3 task. No live journal or exchange record is edited manually."
          - "The original no-diff implementation guard remains enforced when no typed refinement exists."
          - "Hosted delivery is native supervisor-owned. Stable release publication is excluded. Parent M3 recovery follows only after repair delivery and fresh native routing."
        planning_baseline:
          captured_at: "2026-08-31T17:13:25.693Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:f198fe132db9581a6283b2b42ee7c380b25fb7f1fd2c459244a05ad75000a8b4"
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
            - ".agentplane/tasks/202608311713-A0F906/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "e16259bf9666e02c2099df5c5b21c43d8e90c1ca"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608311713-A0F906"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-ci"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
          criteria:
            -
              check_ids:
                - "full-ci"
              description: "Implement a native refinement-only external EXECUTOR result path. Preserve exact exchange identity, consumed-result immutability and baseline authority. Record the typed refinement before implementation persistence. A pure refinement must never create a fake implementation commit, complete the WorkItem, or repeat completed work. Preserve ordinary no-diff completed-result rejection. Cover initial receipt, replay/lost response, material versus local classification, stale or dirty baseline and completed WorkItem preservation in existing command and CLI test suites."
              id: "refinement-recovery"
              required: true
          evidence_fingerprint: "sha256:f198fe132db9581a6283b2b42ee7c380b25fb7f1fd2c459244a05ad75000a8b4"
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
                  description: "Implement a native refinement-only external EXECUTOR result path. Preserve exact exchange identity, consumed-result immutability and baseline authority. Record the typed refinement before implementation persistence. A pure refinement must never create a fake implementation commit, complete the WorkItem, or repeat completed work. Preserve ordinary no-diff completed-result rejection. Cover initial receipt, replay/lost response, material versus local classification, stale or dirty baseline and completed WorkItem preservation in existing command and CLI test suites."
                  id: "refinement-recovery"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 80000
                optional_sources:
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                symbol_hints:
                  - "applyExternalImplementationResult"
                  - "applyAcceptedExternalAgentResult"
                  - "recordPlanRefinement"
              depends_on: []
              expected_outputs:
                - "refinement-recovery-evidence"
              id: "repair-refinement-recovery"
              objective: "Implement a native refinement-only external EXECUTOR result path. Preserve exact exchange identity, consumed-result immutability and baseline authority. Record the typed refinement before implementation persistence. A pure refinement must never create a fake implementation commit, complete the WorkItem, or repeat completed work. Preserve ordinary no-diff completed-result rejection. Cover initial receipt, replay/lost response, material versus local classification, stale or dirty baseline and completed WorkItem preservation in existing command and CLI test suites."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-ci"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "full-ci"
                    description: "Implement a native refinement-only external EXECUTOR result path. Preserve exact exchange identity, consumed-result immutability and baseline authority. Record the typed refinement before implementation persistence. A pure refinement must never create a fake implementation commit, complete the WorkItem, or repeat completed work. Preserve ordinary no-diff completed-result rejection. Cover initial receipt, replay/lost response, material versus local classification, stale or dirty baseline and completed WorkItem preservation in existing command and CLI test suites."
                    id: "refinement-recovery"
                    required: true
                evidence_fingerprint: "sha256:f198fe132db9581a6283b2b42ee7c380b25fb7f1fd2c459244a05ad75000a8b4"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608311713-A0F906"
    event_cursor: 0
    final_validation: null
    id: "202608311713-A0F906"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
      captured_at: "2026-08-31T17:13:11.202Z"
      constraints: []
      request: |-
        Repair pure plan-refinement result recovery for M3 continuation

        Bootstrap repair required by clean Task core refactoring task 202608291006-255K66. The native EXECUTOR packet explicitly permits result.plan_refinement, but a completed refinement-only result with no implementation changes is durably received and then rejected by applyExternalImplementationResult before TaskCentricBackendAdapter can record the refinement. task advance and task advance --replacement repeat the same no-workspace-change error. Implement a bounded native refinement-only path that preserves exact exchange identity, single-use result admission, baseline validation, plan-change classification, native task traceability and previous completed WorkItems. A refinement-only result must never claim completed implementation, trigger a fake commit, or complete the current WorkItem. Add regression coverage for initial receipt, lost response/replay, invalid or changed baseline, and retained ordinary completed-no-diff rejection. Do not edit any live task/exchange/journal records manually. After delivery, qualify recovery of the exact received M3 refinement and resume the canonical refactoring graph. No stable release publication is authorized by this repair.
      task_id: "202608311713-A0F906"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-31T17:15:18.418Z"
    work_items:
      repair-refinement-recovery:
        attempt: 0
        claim_id: null
        id: "repair-refinement-recovery"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "e16259bf9666e02c2099df5c5b21c43d8e90c1ca"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "e16259bf9666e02c2099df5c5b21c43d8e90c1ca"
    version: 1
id_source: "generated"
---
## Summary

Repair pure plan-refinement result recovery for M3 continuation

Bootstrap repair required by clean Task core refactoring task 202608291006-255K66. The native EXECUTOR packet explicitly permits result.plan_refinement, but a completed refinement-only result with no implementation changes is durably received and then rejected by applyExternalImplementationResult before TaskCentricBackendAdapter can record the refinement. task advance and task advance --replacement repeat the same no-workspace-change error. Implement a bounded native refinement-only path that preserves exact exchange identity, single-use result admission, baseline validation, plan-change classification, native task traceability and previous completed WorkItems. A refinement-only result must never claim completed implementation, trigger a fake commit, or complete the current WorkItem. Add regression coverage for initial receipt, lost response/replay, invalid or changed baseline, and retained ordinary completed-no-diff rejection. Do not edit any live task/exchange/journal records manually. After delivery, qualify recovery of the exact received M3 refinement and resume the canonical refactoring graph. No stable release publication is authorized by this repair.

## Scope

- In scope: Bootstrap repair required by clean Task core refactoring task 202608291006-255K66. The native EXECUTOR packet explicitly permits result.plan_refinement, but a completed refinement-only result with no implementation changes is durably received and then rejected by applyExternalImplementationResult before TaskCentricBackendAdapter can record the refinement. task advance and task advance --replacement repeat the same no-workspace-change error. Implement a bounded native refinement-only path that preserves exact exchange identity, single-use result admission, baseline validation, plan-change classification, native task traceability and previous completed WorkItems. A refinement-only result must never claim completed implementation, trigger a fake commit, or complete the current WorkItem. Add regression coverage for initial receipt, lost response/replay, invalid or changed baseline, and retained ordinary completed-no-diff rejection. Do not edit any live task/exchange/journal records manually. After delivery, qualify recovery of the exact received M3 refinement and resume the canonical refactoring graph. No stable release publication is authorized by this repair.
- Out of scope: unrelated refactors not required for "Repair pure plan-refinement result recovery for M3 continuation".

## Plan

One bounded bootstrap repair WorkItem with exact recovery and non-regression acceptance. Full CI and native hosted delivery remain required.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
