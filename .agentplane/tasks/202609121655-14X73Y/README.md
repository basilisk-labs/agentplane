---
id: "202609121655-14X73Y"
title: "Fix exact WorkItem-only scope extension when the global contract is already satisfied"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "release-0.7.9"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-09-12T16:56:45.369Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:c70941e957f4049b97bbee70da0639c2abf6530cdd28938950ce16a46730dd60"
verification:
  state: "ok"
  updated_at: "2026-09-12T16:58:40.724Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
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
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The fix changes one task command and its focused regression tests."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.ts"
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
          - "packages/agentplane/src/commands/task/scope-extend.test.ts"
          - "packages/agentplane/src/commands/task/scope-extend.ts"
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
      digest: "sha256:3269d81a5d47eafd008f69443b824c701ecfd0be0e5c7ead89314df289174d0e"
      escalation_reasons: []
      execution_groups:
        - "core"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/task/scope-extend.test.ts"
          - "packages/agentplane/src/commands/task/scope-extend.ts"
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
  hash: "a974bdef9d52bba58b584dd6de411c18e311336c"
  message: "🚧 14X73Y task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: a974bdef9d52. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-12T16:56:50.728Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-12T16:58:17.153Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: a974bdef9d52. CLI accepted one state-bound external-agent semantic result."
    commit: "a974bdef9d52bba58b584dd6de411c18e311336c"
  -
    type: "verify"
    at: "2026-09-12T16:58:40.724Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
doc_version: 3
doc_updated_at: "2026-09-12T16:58:41.494Z"
doc_updated_by: "SUPERVISOR"
description: "Supersedes blocked task 202609121643-1PV2X7. Preserve exact pending work_item_id, require a real missing WorkItem root in a schedulable state, keep no-op and ambiguity rejection fail-closed, and include focused regression tests. This unblocks release task 202609121423-9WPTCW ST-03."
sections:
  Summary: |-
    Fix exact WorkItem-only scope extension when the global contract is already satisfied

    Supersedes blocked task 202609121643-1PV2X7. Preserve exact pending work_item_id, require a real missing WorkItem root in a schedulable state, keep no-op and ambiguity rejection fail-closed, and include focused regression tests. This unblocks release task 202609121423-9WPTCW ST-03.
  Scope: |-
    - In scope: Supersedes blocked task 202609121643-1PV2X7. Preserve exact pending work_item_id, require a real missing WorkItem root in a schedulable state, keep no-op and ambiguity rejection fail-closed, and include focused regression tests. This unblocks release task 202609121423-9WPTCW ST-03.
    - Out of scope: unrelated refactors not required for "Fix exact WorkItem-only scope extension when the global contract is already satisfied".
  Plan: "Proposed one bounded WorkItem with both implementation files and the tests repository effect declared from the start."
  Verify Steps: |-
    1. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts`. Expected: exact WorkItem-only scope deltas succeed while true no-op, mismatched target, missing target, unschedulable target, and ambiguity cases fail closed.
    2. Run `bun run typecheck`. Expected: the touched implementation type-checks.
    3. Confirm hosted integration for the exact PR head. Expected: required hosted checks succeed before merge.
    4. Compare the final diff against the approved scope. Expected: only the task scope-extension implementation and its focused regression tests change.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-12T16:58:40.724Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7fda73be16441aa35a08a8fcffbf016db679fc51e030745652a5a0ac9b5112ad, input_digest=sha256:0efd959a64fa59144d725b8032133855a3b3aa22504e3ccaef33b9ec4c15a164

    Details:

    Check: affected_unit_integration
    Command: bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609121655-14X73Y Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609121655-14X73Y Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609121655-14X73Y Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609121655-14X73Y Verification Contract check critical_paths (2/2)

    Check: task_outcome
    Command: bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609121655-14X73Y Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609121655-14X73Y Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609121655-14X73Y-fix-exact-workitem-only-scope-extension-when-the/.agentplane/tasks/202609121655-14X73Y/blueprint/resolved-snapshot.json
    - old_digest: 25515cb4ded9a32b13449f99348fa47b42cbe8ba06c1e30f6a32000bab6157fd
    - current_digest: 25515cb4ded9a32b13449f99348fa47b42cbe8ba06c1e30f6a32000bab6157fd
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609121655-14X73Y

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609121655-14X73Y
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
  agentplane.execution_grant:
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:c70941e957f4049b97bbee70da0639c2abf6530cdd28938950ce16a46730dd60"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:3f2905487f200c6b8e0b6bef9ea972b8fae41e8240e7c4fd22a83b2137790ab1"
    grant_id: "55450df2-e092-4a39-8f8a-c598c7d8849e"
    issued_at: "2026-09-12T16:56:45.369Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:664a283df9907618985d85f521fe6c87d90c42b80ff627735b6c43fd77aa38bc"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609121655-14X73Y"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-12T16:56:45.369Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:408730a0702f2c28471447c875a390aed6c8eaeb0b4f3367500a097172b904e8"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-12T16:56:18.016Z"
      digest: "sha256:408730a0702f2c28471447c875a390aed6c8eaeb0b4f3367500a097172b904e8"
      proposal:
        assumptions:
          - "Repository effects remain global; only scope roots can form a WorkItem-only delta."
        planning_baseline:
          captured_at: "2026-09-12T16:55:36.487Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:b96b9efaa02852d2453809f758dd505aa3db60881afc141169f4fd3c489d3d5d"
          dirty_paths:
            - ".agentplane/tasks/202609072121-9VEHKH/README.md"
            - ".agentplane/tasks/202609080727-BAWTEE/README.md"
            - ".agentplane/tasks/202609121424-3YAX44/README.md"
            - ".agentplane/tasks/202609121424-49XXT3/README.md"
            - ".agentplane/tasks/202609121424-4BC7B3/README.md"
            - ".agentplane/tasks/202609121424-T83XJA/README.md"
            - ".agentplane/tasks/202609121424-ZEJ656/README.md"
            - ".agentplane/tasks/202609121655-14X73Y/README.md"
            - "agentplane-roadmap-r2/AGENT-START.md"
            - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
            - "agentplane-roadmap-r2/README.md"
            - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
            - "agentplane-roadmap-r2/checksums.json"
            - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
            - "agentplane-roadmap-r2/coverage-map.json"
            - "agentplane-roadmap-r2/dependency-graph.json"
            - "agentplane-roadmap-r2/experiment-requirements.json"
            - "agentplane-roadmap-r2/releases/0.7.10.md"
            - "agentplane-roadmap-r2/releases/0.7.11.md"
            - "agentplane-roadmap-r2/releases/0.7.12.md"
            - "agentplane-roadmap-r2/releases/0.7.13.md"
            - "agentplane-roadmap-r2/releases/0.7.14.md"
            - "agentplane-roadmap-r2/releases/0.7.9.md"
            - "agentplane-roadmap-r2/source-evidence.json"
            - "agentplane-roadmap-r2/tasks.json"
            - "agentplane-roadmap-r2/tasks/BP-01.md"
            - "agentplane-roadmap-r2/tasks/BP-02.md"
            - "agentplane-roadmap-r2/tasks/BP-03.md"
            - "agentplane-roadmap-r2/tasks/BP-04.md"
            - "agentplane-roadmap-r2/tasks/BP-05.md"
            - "agentplane-roadmap-r2/tasks/BP-06.md"
            - "agentplane-roadmap-r2/tasks/BP-07.md"
            - "agentplane-roadmap-r2/tasks/BP-08.md"
            - "agentplane-roadmap-r2/tasks/BP-09.md"
            - "agentplane-roadmap-r2/tasks/BP-10.md"
            - "agentplane-roadmap-r2/tasks/BP-11.md"
            - "agentplane-roadmap-r2/tasks/BP-12.md"
            - "agentplane-roadmap-r2/tasks/BP-13.md"
            - "agentplane-roadmap-r2/tasks/BP-14.md"
            - "agentplane-roadmap-r2/tasks/BP-15.md"
            - "agentplane-roadmap-r2/tasks/BP-16.md"
            - "agentplane-roadmap-r2/tasks/BP-17.md"
            - "agentplane-roadmap-r2/tasks/BP-18.md"
            - "agentplane-roadmap-r2/tasks/BP-19.md"
            - "agentplane-roadmap-r2/tasks/BP-20.md"
            - "agentplane-roadmap-r2/tasks/BP-21.md"
            - "agentplane-roadmap-r2/tasks/BP-22.md"
            - "agentplane-roadmap-r2/tasks/BP-23.md"
            - "agentplane-roadmap-r2/tasks/BP-24.md"
            - "agentplane-roadmap-r2/tasks/BP-25.md"
            - "agentplane-roadmap-r2/tasks/BP-26.md"
            - "agentplane-roadmap-r2/tasks/BP-27.md"
            - "agentplane-roadmap-r2/tasks/BP-28.md"
            - "agentplane-roadmap-r2/tasks/BP-29.md"
            - "agentplane-roadmap-r2/tasks/BP-30.md"
            - "agentplane-roadmap-r2/tasks/BP-31.md"
            - "agentplane-roadmap-r2/tasks/EV-01.md"
            - "agentplane-roadmap-r2/tasks/EV-02.md"
            - "agentplane-roadmap-r2/tasks/EV-03.md"
            - "agentplane-roadmap-r2/tasks/EV-04.md"
            - "agentplane-roadmap-r2/tasks/EV-05.md"
            - "agentplane-roadmap-r2/tasks/EV-06.md"
            - "agentplane-roadmap-r2/tasks/EV-07.md"
            - "agentplane-roadmap-r2/tasks/EV-08.md"
            - "agentplane-roadmap-r2/tasks/EV-09.md"
            - "agentplane-roadmap-r2/tasks/EV-10.md"
            - "agentplane-roadmap-r2/tasks/EV-11.md"
            - "agentplane-roadmap-r2/tasks/EV-12.md"
            - "agentplane-roadmap-r2/tasks/EV-13.md"
            - "agentplane-roadmap-r2/tasks/LC-01.md"
            - "agentplane-roadmap-r2/tasks/LC-02.md"
            - "agentplane-roadmap-r2/tasks/LC-03.md"
            - "agentplane-roadmap-r2/tasks/LC-04.md"
            - "agentplane-roadmap-r2/tasks/LC-05.md"
            - "agentplane-roadmap-r2/tasks/LC-06.md"
            - "agentplane-roadmap-r2/tasks/LC-07.md"
            - "agentplane-roadmap-r2/tasks/LC-08.md"
            - "agentplane-roadmap-r2/tasks/LC-09.md"
            - "agentplane-roadmap-r2/tasks/LC-10.md"
            - "agentplane-roadmap-r2/tasks/LC-11.md"
            - "agentplane-roadmap-r2/tasks/LC-12.md"
            - "agentplane-roadmap-r2/tasks/LC-13.md"
            - "agentplane-roadmap-r2/tasks/LC-14.md"
            - "agentplane-roadmap-r2/tasks/LC-15.md"
            - "agentplane-roadmap-r2/tasks/LC-16.md"
            - "agentplane-roadmap-r2/tasks/LC-17.md"
            - "agentplane-roadmap-r2/tasks/LC-18.md"
            - "agentplane-roadmap-r2/tasks/LC-19.md"
            - "agentplane-roadmap-r2/tasks/LC-20.md"
            - "agentplane-roadmap-r2/tasks/LC-21.md"
            - "agentplane-roadmap-r2/tasks/LC-22.md"
            - "agentplane-roadmap-r2/tasks/LC-23.md"
            - "agentplane-roadmap-r2/tasks/PL-01.md"
            - "agentplane-roadmap-r2/tasks/PL-02.md"
            - "agentplane-roadmap-r2/tasks/PL-03.md"
            - "agentplane-roadmap-r2/tasks/PL-04.md"
            - "agentplane-roadmap-r2/tasks/PL-05.md"
            - "agentplane-roadmap-r2/tasks/PL-06.md"
            - "agentplane-roadmap-r2/tasks/PL-07.md"
            - "agentplane-roadmap-r2/tasks/PL-08.md"
            - "agentplane-roadmap-r2/tasks/PL-09.md"
            - "agentplane-roadmap-r2/tasks/PL-10.md"
            - "agentplane-roadmap-r2/tasks/PL-11.md"
            - "agentplane-roadmap-r2/tasks/PL-12.md"
            - "agentplane-roadmap-r2/tasks/RC-01.md"
            - "agentplane-roadmap-r2/tasks/RC-02.md"
            - "agentplane-roadmap-r2/tasks/RC-03.md"
            - "agentplane-roadmap-r2/tasks/RC-04.md"
            - "agentplane-roadmap-r2/tasks/RC-05.md"
            - "agentplane-roadmap-r2/tasks/RC-06.md"
            - "agentplane-roadmap-r2/tasks/RC-07.md"
            - "agentplane-roadmap-r2/tasks/RC-08.md"
            - "agentplane-roadmap-r2/tasks/RC-09.md"
            - "agentplane-roadmap-r2/tasks/RC-10.md"
            - "agentplane-roadmap-r2/tasks/RC-11.md"
            - "agentplane-roadmap-r2/tasks/RC-12.md"
            - "agentplane-roadmap-r2/tasks/RC-13.md"
            - "agentplane-roadmap-r2/tasks/RC-14.md"
            - "agentplane-roadmap-r2/tasks/RC-15.md"
            - "agentplane-roadmap-r2/tasks/RC-16.md"
            - "agentplane-roadmap-r2/tasks/RC-17.md"
            - "agentplane-roadmap-r2/tasks/RC-18.md"
            - "agentplane-roadmap-r2/tasks/ST-01.md"
            - "agentplane-roadmap-r2/tasks/ST-02.md"
            - "agentplane-roadmap-r2/tasks/ST-03.md"
            - "agentplane-roadmap-r2/tasks/ST-04.md"
            - "agentplane-roadmap-r2/tasks/ST-05.md"
            - "agentplane-roadmap-r2/tasks/ST-06.md"
            - "agentplane-roadmap-r2/tasks/ST-07.md"
            - "agentplane-roadmap-r2/tasks/ST-08.md"
            - "agentplane-roadmap-r2/tasks/ST-09.md"
            - "agentplane-roadmap-r2/tasks/ST-10.md"
            - "agentplane-roadmap-r2/tasks/ST-11.md"
            - "agentplane-roadmap-r2/tasks/ST-12.md"
            - "agentplane-roadmap-r2/tasks/ST-13.md"
            - "agentplane-roadmap-r2/tasks/ST-14.md"
            - "agentplane-roadmap-r2/tasks/ST-15.md"
            - "agentplane-roadmap-r2/tasks/ST-16.md"
            - "agentplane-roadmap-r2/tasks/ST-17.md"
            - "agentplane-roadmap-r2/tasks/ST-18.md"
            - "agentplane-roadmap-r2/tasks/ST-19.md"
            - "agentplane-roadmap-r2/tasks/ST-20.md"
            - "agentplane-roadmap-r2/tasks/ST-21.md"
            - "agentplane-roadmap-r2/validate_roadmap.py"
            - "agentplane-roadmap-r2/validation-report.json"
          git:
            kind: "commit"
            ref: null
            sha: "ab3a8e251ad17e8dae00fbe070767fb01f1fae57"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609121655-14X73Y"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts"
              id: "focused"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              id: "hosted"
              kind: "provider"
              required: true
              timeout_ms: 900000
          criteria:
            -
              check_ids:
                - "focused"
              description: "An unchanged global execution contract is accepted only when the exact pending work_item_id identifies a schedulable WorkItem missing a requested root, and that WorkItem is extended."
              id: "AC-01"
              required: true
            -
              check_ids:
                - "focused"
              description: "True no-op, missing target, mismatched target, ambiguous target, and unschedulable target cases fail closed."
              id: "AC-02"
              required: true
            -
              check_ids:
                - "typecheck"
                - "hosted"
              description: "The implementation type-checks and hosted integration succeeds."
              id: "AC-03"
              required: true
          evidence_fingerprint: "sha256:b96b9efaa02852d2453809f758dd505aa3db60881afc141169f4fd3c489d3d5d"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused"
                  description: "An unchanged global execution contract is accepted only when the exact pending work_item_id identifies a schedulable WorkItem missing a requested root, and that WorkItem is extended."
                  id: "AC-01"
                  required: true
                -
                  check_ids:
                    - "focused"
                  description: "True no-op, missing target, mismatched target, ambiguous target, and unschedulable target cases fail closed."
                  id: "AC-02"
                  required: true
                -
                  check_ids:
                    - "typecheck"
                    - "hosted"
                  description: "The implementation type-checks and hosted integration succeeds."
                  id: "AC-03"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 120000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/commands/task/scope-extend.ts"
                  - "packages/agentplane/src/commands/task/scope-extend.test.ts"
                symbol_hints:
                  - "extendBlockedTaskExecutionContract"
                  - "work_item_id"
              depends_on: []
              expected_outputs:
                - "Narrow source fix"
                - "Focused regression coverage"
              id: "WI-01"
              objective: "Implement the exact schedulable WorkItem scope-delta exception and focused fail-closed regression coverage."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/scope-extend.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/scope-extend.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/scope-extend.ts"
                - "packages/agentplane/src/commands/task/scope-extend.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts"
                    id: "focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    id: "hosted"
                    kind: "provider"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "focused"
                    description: "An unchanged global execution contract is accepted only when the exact pending work_item_id identifies a schedulable WorkItem missing a requested root, and that WorkItem is extended."
                    id: "AC-01"
                    required: true
                  -
                    check_ids:
                      - "focused"
                    description: "True no-op, missing target, mismatched target, ambiguous target, and unschedulable target cases fail closed."
                    id: "AC-02"
                    required: true
                  -
                    check_ids:
                      - "typecheck"
                      - "hosted"
                    description: "The implementation type-checks and hosted integration succeeds."
                    id: "AC-03"
                    required: true
                evidence_fingerprint: "sha256:b96b9efaa02852d2453809f758dd505aa3db60881afc141169f4fd3c489d3d5d"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609121655-14X73Y"
    event_cursor: 6
    final_validation: null
    id: "202609121655-14X73Y"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-2"
          required: true
      captured_at: "2026-09-12T16:55:32.370Z"
      constraints: []
      request: |-
        Fix exact WorkItem-only scope extension when the global contract is already satisfied

        Supersedes blocked task 202609121643-1PV2X7. Preserve exact pending work_item_id, require a real missing WorkItem root in a schedulable state, keep no-op and ambiguity rejection fail-closed, and include focused regression tests. This unblocks release task 202609121423-9WPTCW ST-03.
      task_id: "202609121655-14X73Y"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 9
    schema_version: 1
    updated_at: "2026-09-12T16:58:41.493Z"
    work_items:
      WI-01:
        attempt: 1
        claim_id: null
        id: "WI-01"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:3c8ee994bb9d99bf5c5dcf6087fa5b0ed1369a1018295998719898e34768bfb6"
            id: "Narrow source fix"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609121655-14X73Y"
              work_item_id: "WI-01"
            provenance:
              - "sha256:c16f008fc0a9b5f65fdae2cfa0e7bdf9f3ddefb93f8de275e678eed3217f253c"
              - ".agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:21aee4f89ff39788f020eef4bc2ae9bee0e25b4ce641fb15a078a3f379e25052"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:4dd3de15bb8725d51260fa16b7c286db854f10cb0aec051f49c031ce59a4c1d5"
            id: "Focused regression coverage"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609121655-14X73Y"
              work_item_id: "WI-01"
            provenance:
              - "sha256:c16f008fc0a9b5f65fdae2cfa0e7bdf9f3ddefb93f8de275e678eed3217f253c"
              - ".agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:21aee4f89ff39788f020eef4bc2ae9bee0e25b4ce641fb15a078a3f379e25052"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json"
              check_id: "focused"
              command_identity: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts"
              detail: "Observed by bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts."
              exit_code: 0
              observed_at: "2026-09-12T16:58:22.201Z"
              repository_snapshot_digest: "sha256:21aee4f89ff39788f020eef4bc2ae9bee0e25b4ce641fb15a078a3f379e25052"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json"
              check_id: "typecheck"
              command_identity: "bun run typecheck"
              detail: "Observed by bun run typecheck."
              exit_code: 0
              observed_at: "2026-09-12T16:58:22.201Z"
              repository_snapshot_digest: "sha256:21aee4f89ff39788f020eef4bc2ae9bee0e25b4ce641fb15a078a3f379e25052"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json"
              check_id: "hosted"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-12T16:58:22.201Z"
              repository_snapshot_digest: "sha256:21aee4f89ff39788f020eef4bc2ae9bee0e25b4ce641fb15a078a3f379e25052"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-12T16:58:22.206Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:9c9c4d6dd79843e01d030a4496020fb5115470f929fce7ade36b396f340454a6"
        entity: "work_item"
        id: "event_54437ee116de4a440e6514ed"
        mutation_id: "external-result:work-order-202609121655-14X73Y-executor-8bbba26d73ef0efd36b41852"
        plan_digest: "sha256:408730a0702f2c28471447c875a390aed6c8eaeb0b4f3367500a097172b904e8"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121655-14X73Y"
        task_revision: 7
        work_item_id: "WI-01"
    leases: []
    mutation_receipts:
      compatibility:sha256:056d70d1bb266c97a4e8e9e7c17d3c91e065ea83abe7e4cbce69d1cd1d8bbf48:
        aggregate_digest: "sha256:a95240e4f0fea709c99943d889f9816a901e01851beae94e21fbe93189e849c9"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T16:56:25.536Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_b077d80f785e26d673fef058"
          mutation_id: "compatibility:sha256:056d70d1bb266c97a4e8e9e7c17d3c91e065ea83abe7e4cbce69d1cd1d8bbf48"
          plan_digest: "sha256:408730a0702f2c28471447c875a390aed6c8eaeb0b4f3367500a097172b904e8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121655-14X73Y"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:056d70d1bb266c97a4e8e9e7c17d3c91e065ea83abe7e4cbce69d1cd1d8bbf48"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609121655-14X73Y"
      compatibility:sha256:26c4c33061a327b4ec12f20437c21e1852b0ce911f67d91bb05f34607b9823c5:
        aggregate_digest: "sha256:c11d13486748d4fc291b38c56dd2fa78e268b13072f88dc4182e3dd6b93f184a"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T16:56:50.728Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_7c9733a4ebf77c0445da4dc8"
          mutation_id: "compatibility:sha256:26c4c33061a327b4ec12f20437c21e1852b0ce911f67d91bb05f34607b9823c5"
          plan_digest: "sha256:408730a0702f2c28471447c875a390aed6c8eaeb0b4f3367500a097172b904e8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121655-14X73Y"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:26c4c33061a327b4ec12f20437c21e1852b0ce911f67d91bb05f34607b9823c5"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609121655-14X73Y"
      compatibility:sha256:612d50b2295b01a9a08e986bc3dec0eb695dac85df0a1ac1e6b2268d21b1a144:
        aggregate_digest: "sha256:6f300f77f86a806eecbb6d2e7ac5d7459544036caca408b33c5b22bbb10328c1"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T16:58:17.153Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_80dd2ab49142feab6648d26e"
          mutation_id: "compatibility:sha256:612d50b2295b01a9a08e986bc3dec0eb695dac85df0a1ac1e6b2268d21b1a144"
          plan_digest: "sha256:408730a0702f2c28471447c875a390aed6c8eaeb0b4f3367500a097172b904e8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121655-14X73Y"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:612d50b2295b01a9a08e986bc3dec0eb695dac85df0a1ac1e6b2268d21b1a144"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609121655-14X73Y"
      compatibility:sha256:e11bc67f6de6abe2f7f3636528fc5ddebc9482b8f966d87397227f3bcf6e0609:
        aggregate_digest: "sha256:0c38af19dc5c1aac152dfd74d01077f1a3b2ef3d3633e3334e848aed99bae39b"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T16:58:41.493Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_66454b79f22301c623a481af"
          mutation_id: "compatibility:sha256:e11bc67f6de6abe2f7f3636528fc5ddebc9482b8f966d87397227f3bcf6e0609"
          plan_digest: "sha256:408730a0702f2c28471447c875a390aed6c8eaeb0b4f3367500a097172b904e8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121655-14X73Y"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e11bc67f6de6abe2f7f3636528fc5ddebc9482b8f966d87397227f3bcf6e0609"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609121655-14X73Y"
      compatibility:sha256:ec9b126c0964079130542946c3ab5cf2c0f00511efb865f859d77939d6ef634d:
        aggregate_digest: "sha256:3b2d1c87c1a7d1920ccca9cc332d92be9190cba8674b7e841ed7737a183cd4ac"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T16:58:17.153Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b592f7d9ba25a33264659652"
          mutation_id: "compatibility:sha256:ec9b126c0964079130542946c3ab5cf2c0f00511efb865f859d77939d6ef634d"
          plan_digest: "sha256:408730a0702f2c28471447c875a390aed6c8eaeb0b4f3367500a097172b904e8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121655-14X73Y"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ec9b126c0964079130542946c3ab5cf2c0f00511efb865f859d77939d6ef634d"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609121655-14X73Y"
      compatibility:sha256:ffd6b338f5ea30175ffbe52d656691e18c9eb3142896baab5f4bb110b9baa0e6:
        aggregate_digest: "sha256:8498592bb1ad0bfcb32bf3094f73a1f31f31e7927fccae199c97f06b889cdd2d"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T16:56:25.535Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_37bde9b707f8986adc8d5b0f"
          mutation_id: "compatibility:sha256:ffd6b338f5ea30175ffbe52d656691e18c9eb3142896baab5f4bb110b9baa0e6"
          plan_digest: "sha256:408730a0702f2c28471447c875a390aed6c8eaeb0b4f3367500a097172b904e8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121655-14X73Y"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:ffd6b338f5ea30175ffbe52d656691e18c9eb3142896baab5f4bb110b9baa0e6"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609121655-14X73Y"
      external-result:work-order-202609121655-14X73Y-executor-8bbba26d73ef0efd36b41852:
        aggregate_digest: "sha256:ed8950c06b660a0bd45ec56c8495ee3b14330df97ba82eab1947e8a03809b803"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T16:58:22.206Z"
          cause_refs:
            - "semantic-result:sha256:9c9c4d6dd79843e01d030a4496020fb5115470f929fce7ade36b396f340454a6"
          entity: "work_item"
          from: "READY"
          id: "event_54437ee116de4a440e6514ed"
          mutation_id: "external-result:work-order-202609121655-14X73Y-executor-8bbba26d73ef0efd36b41852"
          plan_digest: "sha256:408730a0702f2c28471447c875a390aed6c8eaeb0b4f3367500a097172b904e8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121655-14X73Y"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "WI-01"
        mutation_id: "external-result:work-order-202609121655-14X73Y-executor-8bbba26d73ef0efd36b41852"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609121655-14X73Y"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "a974bdef9d52bba58b584dd6de411c18e311336c"
  task_execution_context:
    base_ref: "main"
    base_sha: "ab3a8e251ad17e8dae00fbe070767fb01f1fae57"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "ab3a8e251ad17e8dae00fbe070767fb01f1fae57"
    version: 1
id_source: "generated"
---
## Summary

Fix exact WorkItem-only scope extension when the global contract is already satisfied

Supersedes blocked task 202609121643-1PV2X7. Preserve exact pending work_item_id, require a real missing WorkItem root in a schedulable state, keep no-op and ambiguity rejection fail-closed, and include focused regression tests. This unblocks release task 202609121423-9WPTCW ST-03.

## Scope

- In scope: Supersedes blocked task 202609121643-1PV2X7. Preserve exact pending work_item_id, require a real missing WorkItem root in a schedulable state, keep no-op and ambiguity rejection fail-closed, and include focused regression tests. This unblocks release task 202609121423-9WPTCW ST-03.
- Out of scope: unrelated refactors not required for "Fix exact WorkItem-only scope extension when the global contract is already satisfied".

## Plan

Proposed one bounded WorkItem with both implementation files and the tests repository effect declared from the start.

## Verify Steps

1. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts`. Expected: exact WorkItem-only scope deltas succeed while true no-op, mismatched target, missing target, unschedulable target, and ambiguity cases fail closed.
2. Run `bun run typecheck`. Expected: the touched implementation type-checks.
3. Confirm hosted integration for the exact PR head. Expected: required hosted checks succeed before merge.
4. Compare the final diff against the approved scope. Expected: only the task scope-extension implementation and its focused regression tests change.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-12T16:58:40.724Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7fda73be16441aa35a08a8fcffbf016db679fc51e030745652a5a0ac9b5112ad, input_digest=sha256:0efd959a64fa59144d725b8032133855a3b3aa22504e3ccaef33b9ec4c15a164

Details:

Check: affected_unit_integration
Command: bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts
Result: pass
Evidence: .agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609121655-14X73Y Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609121655-14X73Y Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts
Result: pass
Evidence: .agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609121655-14X73Y Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609121655-14X73Y Verification Contract check critical_paths (2/2)

Check: task_outcome
Command: bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts
Result: pass
Evidence: .agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609121655-14X73Y Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609121655-14X73Y/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609121655-14X73Y Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609121655-14X73Y-fix-exact-workitem-only-scope-extension-when-the/.agentplane/tasks/202609121655-14X73Y/blueprint/resolved-snapshot.json
- old_digest: 25515cb4ded9a32b13449f99348fa47b42cbe8ba06c1e30f6a32000bab6157fd
- current_digest: 25515cb4ded9a32b13449f99348fa47b42cbe8ba06c1e30f6a32000bab6157fd
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609121655-14X73Y

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609121655-14X73Y
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
