---
id: "202608280614-PCBY2N"
title: "Recover task-level evidence rework after completed WorkItems"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-28T11:08:02.340Z"
  updated_by: "USER"
  note: "The user explicitly approved plan PCBY2N in this conversation with the affirmative response Даа to the specific plan confirmation question. Approved plan digest sha256:d8e65a8610611bded141cdd7467e57ca78b7096dc84a7f3c824fd6efdbfabef3; observed route fingerprint sha256:0aada06bfe08e7c84f0a36ffa99fd1fbcc251de6550848f9768639e348c209a0. Four-file scope and mandatory verification remain unchanged."
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
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "This is a reproduced blocker of a required protected integration path, not a new Core architecture program."
      - "Use the existing implementation proof, journal, verification and evaluator route; keep unchanged-source recovery fail-closed."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
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
      digest: "sha256:394a618f2f939d290c66adb1fb00e07ddaf5057ac3429b2403d3c55f7ac0f99f"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
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
    at: "2026-08-28T11:08:27.484Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-28T11:08:27.484Z"
doc_updated_by: "CODER"
description: "Required integration-path repair after QMVHM2 and CFKR4P are integrated on main e3550efba441765882f2507cfaf659e9a76d2f0b. Task 202608280529-59VB06 has a completed implementation WorkItem and passed full verification. Its evaluator requested only task Findings. The operator populated Findings through supported task commands and resumed DOING. A fresh task-level implementation_rework WorkOrder has work_item_id=null, preserves the existing code, and returns a completed documentation-only result. Acceptance rejects it with Completed implementation result produced no supervisor-observed workspace change. The immutable result is now received and must not be rewritten. resolveRecordedImplementationRecovery matches the prior implementation exchange WorkItem id to the new null id, while evidence-only rework also requires the recorded implementation to equal current metadata HEAD. Reproduce and repair only this task-level no-change documentation/evidence rework path. Require the same approved plan, scope, exact recorded implementation and ancestry, all required WorkItems completed, a validated historical result and original effect evidence, no unapproved source drift, and unchanged verification requirements. Preserve current rework findings as current claims; preserve original claims for interrupted WorkItem recovery. Rerun mandatory checks through the existing supervisor and obtain fresh evaluation. Cover interruption, replay, changed plan/authority/HEAD rejection and no false DONE. Do not hand-edit task/journal/evidence, reuse checks across different inputs without supported proof, weaken checks, invent a source change, or introduce a new state store or architecture program. Preserve blocked task 59VB06 and DVS5NN, keep one integration owner, and integrate this bounded repair before retrying them. The user authorized all in-scope operations through release. Release/Core order is unchanged. Prepopulate task Findings with observed diagnosis and pending evidence before implementation so this repair does not repeat the same documentation gap."
sections:
  Summary: |-
    Recover task-level evidence rework after completed WorkItems

    Required integration-path repair after QMVHM2 and CFKR4P are integrated on main e3550efba441765882f2507cfaf659e9a76d2f0b. Task 202608280529-59VB06 has a completed implementation WorkItem and passed full verification. Its evaluator requested only task Findings. The operator populated Findings through supported task commands and resumed DOING. A fresh task-level implementation_rework WorkOrder has work_item_id=null, preserves the existing code, and returns a completed documentation-only result. Acceptance rejects it with Completed implementation result produced no supervisor-observed workspace change. The immutable result is now received and must not be rewritten. resolveRecordedImplementationRecovery matches the prior implementation exchange WorkItem id to the new null id, while evidence-only rework also requires the recorded implementation to equal current metadata HEAD. Reproduce and repair only this task-level no-change documentation/evidence rework path. Require the same approved plan, scope, exact recorded implementation and ancestry, all required WorkItems completed, a validated historical result and original effect evidence, no unapproved source drift, and unchanged verification requirements. Preserve current rework findings as current claims; preserve original claims for interrupted WorkItem recovery. Rerun mandatory checks through the existing supervisor and obtain fresh evaluation. Cover interruption, replay, changed plan/authority/HEAD rejection and no false DONE. Do not hand-edit task/journal/evidence, reuse checks across different inputs without supported proof, weaken checks, invent a source change, or introduce a new state store or architecture program. Preserve blocked task 59VB06 and DVS5NN, keep one integration owner, and integrate this bounded repair before retrying them. The user authorized all in-scope operations through release. Release/Core order is unchanged. Prepopulate task Findings with observed diagnosis and pending evidence before implementation so this repair does not repeat the same documentation gap.
  Scope: |-
    - In scope: Required integration-path repair after QMVHM2 and CFKR4P are integrated on main e3550efba441765882f2507cfaf659e9a76d2f0b. Task 202608280529-59VB06 has a completed implementation WorkItem and passed full verification. Its evaluator requested only task Findings. The operator populated Findings through supported task commands and resumed DOING. A fresh task-level implementation_rework WorkOrder has work_item_id=null, preserves the existing code, and returns a completed documentation-only result. Acceptance rejects it with Completed implementation result produced no supervisor-observed workspace change. The immutable result is now received and must not be rewritten. resolveRecordedImplementationRecovery matches the prior implementation exchange WorkItem id to the new null id, while evidence-only rework also requires the recorded implementation to equal current metadata HEAD. Reproduce and repair only this task-level no-change documentation/evidence rework path. Require the same approved plan, scope, exact recorded implementation and ancestry, all required WorkItems completed, a validated historical result and original effect evidence, no unapproved source drift, and unchanged verification requirements. Preserve current rework findings as current claims; preserve original claims for interrupted WorkItem recovery. Rerun mandatory checks through the existing supervisor and obtain fresh evaluation. Cover interruption, replay, changed plan/authority/HEAD rejection and no false DONE. Do not hand-edit task/journal/evidence, reuse checks across different inputs without supported proof, weaken checks, invent a source change, or introduce a new state store or architecture program. Preserve blocked task 59VB06 and DVS5NN, keep one integration owner, and integrate this bounded repair before retrying them. The user authorized all in-scope operations through release. Release/Core order is unchanged. Prepopulate task Findings with observed diagnosis and pending evidence before implementation so this repair does not repeat the same documentation gap.
    - Out of scope: unrelated refactors not required for "Recover task-level evidence rework after completed WorkItems".
  Plan: "Repair one task-level evidence-only rework path after completed WorkItems without manufacturing a source change. Preserve exact historical implementation proof and current rework claims; rerun the existing verification and evaluation route."
  Verify Steps: |-
    1. Reproduce the task-level evidence-only rework failure with real Git after required WorkItem completion, evaluator documentation rework and an operator Findings update.
    2. Verify approved unchanged-source recovery uses validated historical implementation proof and preserves current task-level claims. Verify interrupted WorkItem recovery preserves its original claims. Rerun mandatory checks and obtain fresh evaluation.
    3. Reject changed plan, scope, authority, source HEAD, verification contract, incomplete WorkItems and missing or tampered proof. Cover interruption, replay and absence of false completion.
    4. Run focused recovery and real-Git tests, bun run ci:local:full, and git diff --check. Enforce the existing runtime and test size limits.
    5. Review the four approved source paths against the plan. Evidence and remaining limitations are recorded in typed semantic output and supervisor verification artifacts. Require exact-head hosted checks, protected integration and confirmed closure before calling this delivered.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "Observed on main e3550efba441765882f2507cfaf659e9a76d2f0b: task 59VB06 completed its implementation WorkItem and full local verification. After evaluator documentation-only rework and a supported operator Findings update, a fresh task-level result with work_item_id=null was rejected for no supervisor-observed workspace change. The historical exchange belongs to a non-null WorkItem, and the older evidence-only fallback requires current metadata HEAD to equal the implementation commit. This is a required integration-path blocker, not a release or Core architecture expansion. Implementation and new verification are pending at this planning boundary. Current test, source and review evidence will be retained in typed semantic results and supervisor-owned verification artifacts. Preserve all blocked-task results and proof bytes. Hosted publication, integration, closure and release are not yet claimed."
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
    digest: "sha256:e0fddf99d28e8470facfbab809b4a7f9bdbd429ab4873d349c882baeed6cb003"
    grant_id: "42374c8e-9482-4cd5-b86e-f28ba6b21181"
    issued_at: "2026-08-28T11:08:02.340Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:8bc8509a6b6d92bc1d36ad6f32353e9b7b3a004a3d9c91b245a4b28baaafb575"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608280614-PCBY2N"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-28T11:08:02.340Z"
        approved_by: "USER"
        approved_digest: "sha256:d8e65a8610611bded141cdd7467e57ca78b7096dc84a7f3c824fd6efdbfabef3"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-28T06:16:14.138Z"
      digest: "sha256:d8e65a8610611bded141cdd7467e57ca78b7096dc84a7f3c824fd6efdbfabef3"
      proposal:
        assumptions:
          - "The scoped repair can use the existing implementation evidence and state machine without new schemas, authority primitives, or stores."
          - "No source edits are allowed in blocked 59VB06 or DVS5NN. Their received results must be preserved for later recovery with the integrated fix."
          - "All required tests and release/Core sequencing remain unchanged. Scope drift must be reported before editing outside the four declared files."
        planning_baseline:
          captured_at: "2026-08-28T06:15:05.383Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:a7741bd9b864320dd10fb88d4437c268a6b4e1e24fc46ce1d75dd174ba882e15"
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
            - ".agentplane/tasks/202608280614-PCBY2N/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "e3550efba441765882f2507cfaf659e9a76d2f0b"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608280614-PCBY2N"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              id: "mandatory-checks"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "mandatory-checks"
              description: "Reproduce with real Git the full structured WorkItem completion, evaluator documentation-only rework, supported operator Findings update, fresh null-WorkItem result and no-change acceptance failure."
              id: "reproduce"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "For approved task-level rework only, recover the same validated implementation effect after all required WorkItems completed. Keep current rework claims distinct from original interrupted WorkItem claims; rerun required checks and fresh evaluation without a fake source change."
              id: "recover"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "Reject changed scope, plan, authority, implementation/source HEAD, verification contract, missing or tampered historical proof and incomplete WorkItems. Preserve original result/evidence bytes, one-owner execution, interruption recovery, replay and no false DONE."
              id: "guards"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "Run focused real-Git and recovery tests, unchanged bun run ci:local:full and git diff --check. Respect runtime/test size limits. Record current evidence in semantic output and supervisor artifacts; require exact-head hosted checks, protected integration and closure before delivery."
              id: "verify"
              required: true
          evidence_fingerprint: "sha256:a7741bd9b864320dd10fb88d4437c268a6b4e1e24fc46ce1d75dd174ba882e15"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Reproduce with real Git the full structured WorkItem completion, evaluator documentation-only rework, supported operator Findings update, fresh null-WorkItem result and no-change acceptance failure."
                  id: "reproduce"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "For approved task-level rework only, recover the same validated implementation effect after all required WorkItems completed. Keep current rework claims distinct from original interrupted WorkItem claims; rerun required checks and fresh evaluation without a fake source change."
                  id: "recover"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Reject changed scope, plan, authority, implementation/source HEAD, verification contract, missing or tampered historical proof and incomplete WorkItems. Preserve original result/evidence bytes, one-owner execution, interruption recovery, replay and no false DONE."
                  id: "guards"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Run focused real-Git and recovery tests, unchanged bun run ci:local:full and git diff --check. Respect runtime/test size limits. Record current evidence in semantic output and supervisor artifacts; require exact-head hosted checks, protected integration and closure before delivery."
                  id: "verify"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                symbol_hints:
                  - "resolveRecordedImplementationRecovery"
                  - "recordedEvidenceOnlyReworkCommit"
                  - "applyExternalImplementationResult"
              depends_on: []
              expected_outputs:
                - "evidence-rework-proof"
              id: "recover-task-level-evidence-rework"
              objective: "Repair one task-level evidence-only rework path after completed WorkItems without manufacturing a source change. Preserve exact historical implementation proof and current rework claims; rerun the existing verification and evaluation route."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "."
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "mandatory-checks"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Reproduce with real Git the full structured WorkItem completion, evaluator documentation-only rework, supported operator Findings update, fresh null-WorkItem result and no-change acceptance failure."
                    id: "reproduce"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "For approved task-level rework only, recover the same validated implementation effect after all required WorkItems completed. Keep current rework claims distinct from original interrupted WorkItem claims; rerun required checks and fresh evaluation without a fake source change."
                    id: "recover"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Reject changed scope, plan, authority, implementation/source HEAD, verification contract, missing or tampered historical proof and incomplete WorkItems. Preserve original result/evidence bytes, one-owner execution, interruption recovery, replay and no false DONE."
                    id: "guards"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Run focused real-Git and recovery tests, unchanged bun run ci:local:full and git diff --check. Respect runtime/test size limits. Record current evidence in semantic output and supervisor artifacts; require exact-head hosted checks, protected integration and closure before delivery."
                    id: "verify"
                    required: true
                evidence_fingerprint: "sha256:a7741bd9b864320dd10fb88d4437c268a6b4e1e24fc46ce1d75dd174ba882e15"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608280614-PCBY2N"
    event_cursor: 0
    final_validation: null
    id: "202608280614-PCBY2N"
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
      captured_at: "2026-08-28T06:14:54.650Z"
      constraints: []
      request: |-
        Recover task-level evidence rework after completed WorkItems

        Required integration-path repair after QMVHM2 and CFKR4P are integrated on main e3550efba441765882f2507cfaf659e9a76d2f0b. Task 202608280529-59VB06 has a completed implementation WorkItem and passed full verification. Its evaluator requested only task Findings. The operator populated Findings through supported task commands and resumed DOING. A fresh task-level implementation_rework WorkOrder has work_item_id=null, preserves the existing code, and returns a completed documentation-only result. Acceptance rejects it with Completed implementation result produced no supervisor-observed workspace change. The immutable result is now received and must not be rewritten. resolveRecordedImplementationRecovery matches the prior implementation exchange WorkItem id to the new null id, while evidence-only rework also requires the recorded implementation to equal current metadata HEAD. Reproduce and repair only this task-level no-change documentation/evidence rework path. Require the same approved plan, scope, exact recorded implementation and ancestry, all required WorkItems completed, a validated historical result and original effect evidence, no unapproved source drift, and unchanged verification requirements. Preserve current rework findings as current claims; preserve original claims for interrupted WorkItem recovery. Rerun mandatory checks through the existing supervisor and obtain fresh evaluation. Cover interruption, replay, changed plan/authority/HEAD rejection and no false DONE. Do not hand-edit task/journal/evidence, reuse checks across different inputs without supported proof, weaken checks, invent a source change, or introduce a new state store or architecture program. Preserve blocked task 59VB06 and DVS5NN, keep one integration owner, and integrate this bounded repair before retrying them. The user authorized all in-scope operations through release. Release/Core order is unchanged. Prepopulate task Findings with observed diagnosis and pending evidence before implementation so this repair does not repeat the same documentation gap.
      task_id: "202608280614-PCBY2N"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-28T11:08:02.340Z"
    work_items:
      recover-task-level-evidence-rework:
        attempt: 0
        claim_id: null
        id: "recover-task-level-evidence-rework"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "e3550efba441765882f2507cfaf659e9a76d2f0b"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "e3550efba441765882f2507cfaf659e9a76d2f0b"
    version: 1
id_source: "generated"
---
## Summary

Recover task-level evidence rework after completed WorkItems

Required integration-path repair after QMVHM2 and CFKR4P are integrated on main e3550efba441765882f2507cfaf659e9a76d2f0b. Task 202608280529-59VB06 has a completed implementation WorkItem and passed full verification. Its evaluator requested only task Findings. The operator populated Findings through supported task commands and resumed DOING. A fresh task-level implementation_rework WorkOrder has work_item_id=null, preserves the existing code, and returns a completed documentation-only result. Acceptance rejects it with Completed implementation result produced no supervisor-observed workspace change. The immutable result is now received and must not be rewritten. resolveRecordedImplementationRecovery matches the prior implementation exchange WorkItem id to the new null id, while evidence-only rework also requires the recorded implementation to equal current metadata HEAD. Reproduce and repair only this task-level no-change documentation/evidence rework path. Require the same approved plan, scope, exact recorded implementation and ancestry, all required WorkItems completed, a validated historical result and original effect evidence, no unapproved source drift, and unchanged verification requirements. Preserve current rework findings as current claims; preserve original claims for interrupted WorkItem recovery. Rerun mandatory checks through the existing supervisor and obtain fresh evaluation. Cover interruption, replay, changed plan/authority/HEAD rejection and no false DONE. Do not hand-edit task/journal/evidence, reuse checks across different inputs without supported proof, weaken checks, invent a source change, or introduce a new state store or architecture program. Preserve blocked task 59VB06 and DVS5NN, keep one integration owner, and integrate this bounded repair before retrying them. The user authorized all in-scope operations through release. Release/Core order is unchanged. Prepopulate task Findings with observed diagnosis and pending evidence before implementation so this repair does not repeat the same documentation gap.

## Scope

- In scope: Required integration-path repair after QMVHM2 and CFKR4P are integrated on main e3550efba441765882f2507cfaf659e9a76d2f0b. Task 202608280529-59VB06 has a completed implementation WorkItem and passed full verification. Its evaluator requested only task Findings. The operator populated Findings through supported task commands and resumed DOING. A fresh task-level implementation_rework WorkOrder has work_item_id=null, preserves the existing code, and returns a completed documentation-only result. Acceptance rejects it with Completed implementation result produced no supervisor-observed workspace change. The immutable result is now received and must not be rewritten. resolveRecordedImplementationRecovery matches the prior implementation exchange WorkItem id to the new null id, while evidence-only rework also requires the recorded implementation to equal current metadata HEAD. Reproduce and repair only this task-level no-change documentation/evidence rework path. Require the same approved plan, scope, exact recorded implementation and ancestry, all required WorkItems completed, a validated historical result and original effect evidence, no unapproved source drift, and unchanged verification requirements. Preserve current rework findings as current claims; preserve original claims for interrupted WorkItem recovery. Rerun mandatory checks through the existing supervisor and obtain fresh evaluation. Cover interruption, replay, changed plan/authority/HEAD rejection and no false DONE. Do not hand-edit task/journal/evidence, reuse checks across different inputs without supported proof, weaken checks, invent a source change, or introduce a new state store or architecture program. Preserve blocked task 59VB06 and DVS5NN, keep one integration owner, and integrate this bounded repair before retrying them. The user authorized all in-scope operations through release. Release/Core order is unchanged. Prepopulate task Findings with observed diagnosis and pending evidence before implementation so this repair does not repeat the same documentation gap.
- Out of scope: unrelated refactors not required for "Recover task-level evidence rework after completed WorkItems".

## Plan

Repair one task-level evidence-only rework path after completed WorkItems without manufacturing a source change. Preserve exact historical implementation proof and current rework claims; rerun the existing verification and evaluation route.

## Verify Steps

1. Reproduce the task-level evidence-only rework failure with real Git after required WorkItem completion, evaluator documentation rework and an operator Findings update.
2. Verify approved unchanged-source recovery uses validated historical implementation proof and preserves current task-level claims. Verify interrupted WorkItem recovery preserves its original claims. Rerun mandatory checks and obtain fresh evaluation.
3. Reject changed plan, scope, authority, source HEAD, verification contract, incomplete WorkItems and missing or tampered proof. Cover interruption, replay and absence of false completion.
4. Run focused recovery and real-Git tests, bun run ci:local:full, and git diff --check. Enforce the existing runtime and test size limits.
5. Review the four approved source paths against the plan. Evidence and remaining limitations are recorded in typed semantic output and supervisor verification artifacts. Require exact-head hosted checks, protected integration and confirmed closure before calling this delivered.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Observed on main e3550efba441765882f2507cfaf659e9a76d2f0b: task 59VB06 completed its implementation WorkItem and full local verification. After evaluator documentation-only rework and a supported operator Findings update, a fresh task-level result with work_item_id=null was rejected for no supervisor-observed workspace change. The historical exchange belongs to a non-null WorkItem, and the older evidence-only fallback requires current metadata HEAD to equal the implementation commit. This is a required integration-path blocker, not a release or Core architecture expansion. Implementation and new verification are pending at this planning boundary. Current test, source and review evidence will be retained in typed semantic results and supervisor-owned verification artifacts. Preserve all blocked-task results and proof bytes. Hosted publication, integration, closure and release are not yet claimed.
