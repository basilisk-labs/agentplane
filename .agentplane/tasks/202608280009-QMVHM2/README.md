---
id: "202608280009-QMVHM2"
title: "Recover interrupted verification-to-WorkItem completion without false DONE"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 20
origin:
  system: "manual"
depends_on: []
tags:
  - "integration-recovery"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-28T00:15:21.776Z"
  updated_by: "USER"
  note: "Operator approval under the user-authorized autonomous refactoring exception. Exact prepared plan f1268d36bbb2c0c541cf3a769f5cbe3ad4b141236b5b4fa60d40af1580da45a1; bounded integration-recovery contract only. No release publication, Core graph reorder, new protocol or mandatory-check weakening."
verification:
  state: "needs_rework"
  updated_at: "2026-08-28T05:02:20.795Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Declared check failed: bun run ci:local:full"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-28T04:30:28.296Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 6 typed finding(s)."
  evaluated_sha: "d600fac6c23a05c6d14ebfb3c49c93fd5d36cc72"
  blueprint_digest: "9f8313c431ef0435b9f5ea2458ec11f9f5ea1e66ec55c98afcb78fffe3c2d7e2"
  evidence_refs:
    - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/eeb6b4d935b7082e3a532d3520244220ada15bb93c7ca55a51e8d77134958539.md"
    - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608280009-QMVHM2/quality/20260828-042840647-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608280009-QMVHM2/README.md"
    - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/5379a6852a6d160cd1b996793dd260bf11f32c00c170218fea9dc0fff3a613e4.patch"
    - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/b2ffb42c3b91e00e03734e7dcf1aa3ef131732e1faccaedf4fa53f1310491c33.json"
    - ".agentplane/tasks/202608280009-QMVHM2/verification/20260828042822482-e20218a743e953fb.json"
    - ".agentplane/tasks/202608280009-QMVHM2/quality/objects/sha256/239c6f92bfea8b9963a7280e631c183681ae1af1934202231f1189ec01382189.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "All nine frozen evidence hashes match. The new verification record verification/20260828042822482-e20218a743e953fb.json reports successful mandatory checks and binds source 6d952d932d8635833a8320a44279df306a6a06b2, base e43acc5f72ba1f884966a16325d6dbc94fcb1f04, and updated Verify Steps digest a64bd7dbb74746d4ee85273b13f408d4c3085637a7306eaa738070743e9de038. The evaluator target d600fac6c23a05c6d14ebfb3c49c93fd5d36cc72 includes the documentation correction; git diff confirms no package source drift from the implementation."
    - "Verify Steps now specifies both interruption boundaries, fresh continuation, exactly-once replay, next task-level rework, changed or missing proof rejection, observed-contract mapping, and no false DONE. Findings records the proved causes, original implementation, historical versus current proof, and remaining DVS5NN/CFKR4P and hosted/release work. The prior documentation-only rework is resolved without expanding source scope or weakening required checks."
    - "Recovery checks the current approved plan and WorkItem state, exact implementation evidence and Git ancestry/path scope, preserved README contract, and the original validated exchange result digest. No-renames path proof rejects moving product source into managed artifacts. Existing historical exchanges remain immutable. Fresh checks run before canonical result projection. Task-level rework does not invent an already-completed WorkItem. Required-incomplete finish rejects before legacy DONE persistence, including force."
    - "The unchanged 7-file focused command was rerun during this evaluation: 63 tests passed in 43.08 seconds. Reviewed tests cover both interruption boundaries, repeat execution, the next rework transition, stale or missing evidence and divergent result rejection, frozen-base changes, source relocation, and whole-task equality after rejected finish. The actual source diff is unchanged from the prior reviewed patch."
    - "Current tracked state is clean. The remaining untracked files are the four newly prepared evaluator evidence artifacts owned by AgentPlane. No product, policy, CI, release, or other task scope was changed during evaluation."
    - "Residual risk: The post-review provider and closure gates must still execute through their current authority. No local test result substitutes for hosted integration or final 0.7.8 release qualification."
token_usage:
  agent_runs: 5
  input_tokens: null
  journal_digest: "sha256:9c0e47b517f9d8279889bb184236ce2c56dc8a36996d1620bb5b3b637f0ea1f5"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-28T04:30:38.201Z"
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
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Preserve canonical completion and stale-result guards without advancing the broader Core migration."
      - "Repair a reproduced blocker in the existing allowed integration route."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
  observed:
    authority_violations:
      - "verification:recorded-check-1:fail"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "fail"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
          - "packages/agentplane/src/commands/task/finish-shared.ts"
          - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
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
      digest: "sha256:b505daddc15b3ef77b51838f7c9514d03986fee7d6627a79793a4f18037aa829"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
          - "packages/agentplane/src/commands/task/finish-shared.ts"
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
      - "verification_recovery:recorded-check-1"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 6d952d932d86. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The evaluator requests only task documentation changes, but this episode permits source paths and explicitly protects .agentplane/tasks. No repository files were changed. A supported operator documentation transition is required. Recommended action: Use the supported operator documentation route to populate Verify Steps and Findings for QMVHM2, preserving implementation 6d952d932d8635833a8320a44279df306a6a06b2 and existing evidence. Do not widen the source scope or weaken checks. Then obtain a fresh supervisor packet and current verification/evaluation as required by the changed task document. Agentplane receipt: external-agent-blocker/tr_122e6aff5153db53896264cf27071709/sha256:594f02910384d5f5fd4f07de03fe8035586eadab8e36415c4d369a91f43c1075."
  -
    author: "CODER"
    body: "Resume: User approved the one-time operator documentation transition. | details: Verify Steps and Findings are populated in d600fac6c23a through supported task doc commands.; Source implementation and mandatory checks remain unchanged.; Return to the supervisor for fresh verification and evaluator review of the updated task input."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: df34180869c7. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-28T00:15:41.000Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-28T01:04:54.955Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 6d952d932d86. CLI accepted one state-bound external-agent semantic result."
    commit: "6d952d932d8635833a8320a44279df306a6a06b2"
  -
    type: "verify"
    at: "2026-08-28T01:13:04.735Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-28T01:16:16.156Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The evaluator requests only task documentation changes, but this episode permits source paths and explicitly protects .agentplane/tasks. No repository files were changed. A supported operator documentation transition is required. Recommended action: Use the supported operator documentation route to populate Verify Steps and Findings for QMVHM2, preserving implementation 6d952d932d8635833a8320a44279df306a6a06b2 and existing evidence. Do not widen the source scope or weaken checks. Then obtain a fresh supervisor packet and current verification/evaluation as required by the changed task document. Agentplane receipt: external-agent-blocker/tr_122e6aff5153db53896264cf27071709/sha256:594f02910384d5f5fd4f07de03fe8035586eadab8e36415c4d369a91f43c1075."
  -
    type: "status"
    at: "2026-08-28T04:19:49.217Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume: User approved the one-time operator documentation transition. | details: Verify Steps and Findings are populated in d600fac6c23a through supported task doc commands.; Source implementation and mandatory checks remain unchanged.; Return to the supervisor for fresh verification and evaluator review of the updated task input."
  -
    type: "verify"
    at: "2026-08-28T04:28:22.482Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  -
    type: "status"
    at: "2026-08-28T04:30:38.201Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "d0ed64e36dca61e1ce9326386fc7fc89db45eea1"
  -
    type: "status"
    at: "2026-08-28T04:55:22.270Z"
    author: "SUPERVISOR"
    from: "DONE"
    to: "DOING"
    note: "Implementation committed: df34180869c7. CLI accepted one state-bound external-agent semantic result."
    commit: "df34180869c7e276b1149894057ad5552ff48dff"
  -
    type: "verify"
    at: "2026-08-28T05:02:20.795Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
doc_version: 3
doc_updated_at: "2026-08-28T05:02:23.367Z"
doc_updated_by: "SUPERVISOR"
description: "Repair the reproduced integration blocker on main e43acc5f72ba1f884966a16325d6dbc94fcb1f04. DVS5NN accepted and committed the cleanup at b577984d8418b4cb7fed521c14b6ab00bf773a93, then completed full checks, but verification persistence rejected a docs_contract mapping added by observed base history. Result application stopped before WorkItem projection. Supported TESTER verification and EVALUATOR PASS did not complete the READY WorkItem. finish then wrote legacy DONE before rejecting required_work_item_incomplete. CFKR4P also completed full checks for a task-level null-WorkItem rework but result application failed because all WorkItems were already completed. Preserve one complete scenario: accepted semantic result, exact implementation and plan binding, current mandatory verification, interruption, supported restart, exactly-once WorkItem projection, and finish without false completion. Diagnose the smallest repair before planning. Prefer existing exchange, verification and runtime receipts; do not add a parallel state store or generic replay subsystem. Preserve stale result rejection, plan and commit identity, missing-evidence rejection, approval gates and mandatory checks. Do not implement AP-CORE-012, AP-CORE-013 or AP-CORE-015 ahead of the approved graph; limit the change to this demonstrated integration recovery and prevention contract. Include real-Git positive, interruption, repeat, changed-plan/head and incomplete-WorkItem negative regressions. Keep DVS5NN and CFKR4P source scopes unchanged. No release publication or CI weakening. The user authorized autonomous completion and supported operator approvals. Stop on any unsupported authority or materially larger architectural scope."
sections:
  Summary: |-
    Recover interrupted verification-to-WorkItem completion without false DONE

    Repair the reproduced integration blocker on main e43acc5f72ba1f884966a16325d6dbc94fcb1f04. DVS5NN accepted and committed the cleanup at b577984d8418b4cb7fed521c14b6ab00bf773a93, then completed full checks, but verification persistence rejected a docs_contract mapping added by observed base history. Result application stopped before WorkItem projection. Supported TESTER verification and EVALUATOR PASS did not complete the READY WorkItem. finish then wrote legacy DONE before rejecting required_work_item_incomplete. CFKR4P also completed full checks for a task-level null-WorkItem rework but result application failed because all WorkItems were already completed. Preserve one complete scenario: accepted semantic result, exact implementation and plan binding, current mandatory verification, interruption, supported restart, exactly-once WorkItem projection, and finish without false completion. Diagnose the smallest repair before planning. Prefer existing exchange, verification and runtime receipts; do not add a parallel state store or generic replay subsystem. Preserve stale result rejection, plan and commit identity, missing-evidence rejection, approval gates and mandatory checks. Do not implement AP-CORE-012, AP-CORE-013 or AP-CORE-015 ahead of the approved graph; limit the change to this demonstrated integration recovery and prevention contract. Include real-Git positive, interruption, repeat, changed-plan/head and incomplete-WorkItem negative regressions. Keep DVS5NN and CFKR4P source scopes unchanged. No release publication or CI weakening. The user authorized autonomous completion and supported operator approvals. Stop on any unsupported authority or materially larger architectural scope.
  Scope: |-
    - In scope: Repair the reproduced integration blocker on main e43acc5f72ba1f884966a16325d6dbc94fcb1f04. DVS5NN accepted and committed the cleanup at b577984d8418b4cb7fed521c14b6ab00bf773a93, then completed full checks, but verification persistence rejected a docs_contract mapping added by observed base history. Result application stopped before WorkItem projection. Supported TESTER verification and EVALUATOR PASS did not complete the READY WorkItem. finish then wrote legacy DONE before rejecting required_work_item_incomplete. CFKR4P also completed full checks for a task-level null-WorkItem rework but result application failed because all WorkItems were already completed. Preserve one complete scenario: accepted semantic result, exact implementation and plan binding, current mandatory verification, interruption, supported restart, exactly-once WorkItem projection, and finish without false completion. Diagnose the smallest repair before planning. Prefer existing exchange, verification and runtime receipts; do not add a parallel state store or generic replay subsystem. Preserve stale result rejection, plan and commit identity, missing-evidence rejection, approval gates and mandatory checks. Do not implement AP-CORE-012, AP-CORE-013 or AP-CORE-015 ahead of the approved graph; limit the change to this demonstrated integration recovery and prevention contract. Include real-Git positive, interruption, repeat, changed-plan/head and incomplete-WorkItem negative regressions. Keep DVS5NN and CFKR4P source scopes unchanged. No release publication or CI weakening. The user authorized autonomous completion and supported operator approvals. Stop on any unsupported authority or materially larger architectural scope.
    - Out of scope: unrelated refactors not required for "Recover interrupted verification-to-WorkItem completion without false DONE".
  Plan: "Repair one interrupted implementation-to-completion scenario within the existing CLI-owned exchange and verification model. First reproduce the orphaned READY WorkItem, null-WorkItem rework failure and partial legacy DONE using real-Git task fixtures. Preserve the original accepted result and exact plan/implementation identity during supported continuation; use existing exchange and runtime receipts rather than a new store. Align the observed verification contract before recording command coverage. Keep task-level rework separate from a selected WorkItem. Check canonical completion eligibility before persisting legacy DONE. Cover successful execution, interruption after commit and verification, repeat continuation, next transition, stale plan/head/result and missing-evidence rejection. Run focused tests, unchanged full CI and diff check. Stop with a bounded scope-extension or blocker if safe recovery requires a new public protocol, a Core migration, or unsupported historical artifact mutation. Keep release/Core order and the two existing task source scopes unchanged."
  Verify Steps: |-
    1. Run the focused recovery suite:
    ```bash
    bun x vitest run packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts packages/agentplane/src/commands/task/external-agent-exchange.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts --maxWorkers=1
    ```
    Expected: all 63 scoped tests pass. Cover ordinary completion, interruption before verification and before WorkItem projection, fresh continuation, exactly-once replay, and the next task-level rework when all required WorkItems are already complete.

    2. Check rejection cases in that suite. Changed plan revision, commands, scope, authority, task body, implementation receipt, source content, frozen base, missing evidence, and a divergent original result digest must not become successful recovery. Moving source into managed artifacts must not hide a product change.

    3. Check the preserved contracts. The observed frozen diff must contribute required checks before verification evidence is mapped. Required-incomplete finish, including a forced attempt, must leave the entire task unchanged and must not record false DONE.

    4. Run the unchanged mandatory commands `bun run ci:local:full` and `git diff --check`. Expected: both pass with no skipped mandatory checks or relaxed timeouts, structural limits, or baselines. Record verification through the supervisor for the current task document and exact implementation input.

    5. Obtain a fresh evaluator decision, then follow the authorized provider route through exact-head required checks, integration, and confirmed closure. Local verification does not prove hosted integration and does not replace final release `release:prepublish`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-28T01:13:04.735Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2fcdcf5e97e112cb401f675acb1c749b4de52684964dcaa8fb2f6ab46ffefd7e, input_digest=sha256:d6bb27f47586db4b35671910f83a1ce8058196dafa99b8a08071e4267d3b501c

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608280009-QMVHM2-recover-interrupted-verification-to-workitem-com/.agentplane/tasks/202608280009-QMVHM2/blueprint/resolved-snapshot.json
    - old_digest: 9f8313c431ef0435b9f5ea2458ec11f9f5ea1e66ec55c98afcb78fffe3c2d7e2
    - current_digest: 9f8313c431ef0435b9f5ea2458ec11f9f5ea1e66ec55c98afcb78fffe3c2d7e2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608280009-QMVHM2

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

    ### 2026-08-28T04:28:22.482Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a64bd7dbb74746d4ee85273b13f408d4c3085637a7306eaa738070743e9de038, input_digest=sha256:b54cd3fbfb4dbf611f269d534cdd1ac69d10d8a6b4e9e0311df88b6f511a731d

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608280009-QMVHM2-recover-interrupted-verification-to-workitem-com/.agentplane/tasks/202608280009-QMVHM2/blueprint/resolved-snapshot.json
    - old_digest: 9f8313c431ef0435b9f5ea2458ec11f9f5ea1e66ec55c98afcb78fffe3c2d7e2
    - current_digest: 9f8313c431ef0435b9f5ea2458ec11f9f5ea1e66ec55c98afcb78fffe3c2d7e2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608280009-QMVHM2

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608280009-QMVHM2
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-28T05:02:20.795Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a64bd7dbb74746d4ee85273b13f408d4c3085637a7306eaa738070743e9de038, input_digest=sha256:20ee0480e2646084b93a10bf643f67826a7821c39a9952782d0aa26b3d38a655

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280009-QMVHM2 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608280009-QMVHM2-recover-interrupted-verification-to-workitem-com/.agentplane/tasks/202608280009-QMVHM2/blueprint/resolved-snapshot.json
    - old_digest: 9f8313c431ef0435b9f5ea2458ec11f9f5ea1e66ec55c98afcb78fffe3c2d7e2
    - current_digest: 9f8313c431ef0435b9f5ea2458ec11f9f5ea1e66ec55c98afcb78fffe3c2d7e2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608280009-QMVHM2

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608280009-QMVHM2
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Implemented in source commit `6d952d932d8635833a8320a44279df306a6a06b2`, based on `e43acc5f72ba1f884966a16325d6dbc94fcb1f04`.

    Proved causes: verification evidence mapping could stop before canonical WorkItem projection; task-level rework could try to select a nonexistent WorkItem after verification was already successful; finish could persist legacy DONE before checking required WorkItem completion.

    The bounded repair uses existing exchanges, implementation receipts, the current approved plan, exact Git ancestry and path scope, and a preserved task contract. Recovery retains the original source commit and historical exchange bytes and reruns current checks. It adds no store, public protocol, or Core migration.

    Local evidence: 63 focused tests passed. The full mandatory CI passed locally and again through the supervisor. The first local full run failed the unchanged module-size limit; extracting the recovery helper fixed that failure without raising the limit. Typecheck, ESLint, formatting, Knip, hotspot checks, and diff checks passed. Supervisor record `verification/20260828011304735-23f23a1652815c0c.json` binds the source commit and frozen base above to all selected local checks. These are historical results for the previous task-document input. Updating Verify Steps requires fresh routed verification; do not treat the previous input as equivalent.

    Read-only probes of the existing DVS5NN and CFKR4P worktrees resolved their recorded implementation commits, respectively `b577984d8418b4cb7fed521c14b6ab00bf773a93` and `a87c4324423fc65c3c7ea3b83ccc797ccc6f4fc0`. The probes did not resume, integrate, or close either task.

    Remaining work: obtain current verification and evaluator acceptance for QMVHM2, publish through matching authority, pass exact-head hosted checks, integrate, and confirm closure. Then resume DVS5NN and CFKR4P through fresh supported routes. DVS5NN's partial legacy DONE is not delivery. Refresh the diagnostic remainder on exact main after integration; do not reuse the old failure count. Provider-neutral wording diagnostics remain separate. Final 0.7.8 qualification/publication and the approved subsequent Core graph remain separate; this repair neither qualifies a release nor reorders that graph.
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
    digest: "sha256:26d50c1dbb4b663cc62d9a1360c083c0572d662b154a24eecf77c68315bb89e3"
    grant_id: "c811bef5-c74c-4fb6-bf71-2d210148ad76"
    issued_at: "2026-08-28T00:15:21.776Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:74cf66127f5d85756a8507d8c24ad15708930ec63a027221d4ef592d1688ff8b"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608280009-QMVHM2"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-28T00:15:21.776Z"
        approved_by: "USER"
        approved_digest: "sha256:f1268d36bbb2c0c541cf3a769f5cbe3ad4b141236b5b4fa60d40af1580da45a1"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-28T00:14:54.191Z"
      digest: "sha256:f1268d36bbb2c0c541cf3a769f5cbe3ad4b141236b5b4fa60d40af1580da45a1"
      proposal:
        assumptions:
          - "Fresh semantic work and verification remain required when historical authority cannot be proven."
          - "No manual mutation of existing task, journal or exchange state is an implementation or recovery strategy."
          - "The fix remains a bounded compatibility repair; canonical Core migration tasks remain in their approved order."
        planning_baseline:
          captured_at: "2026-08-28T00:10:00.782Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:3583546dcdcf86aea188bb0149fb873d3d808449e3e5606b1ec456523b0a32f4"
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
            - ".agentplane/tasks/202608280009-QMVHM2/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "e43acc5f72ba1f884966a16325d6dbc94fcb1f04"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608280009-QMVHM2"
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
              description: "Resume an interrupted accepted implementation through the existing supervisor route only after proving the original result, approved plan, WorkItem, implementation and current required verification. Repeated resume records one WorkItem result. Reject changed plan, unrelated head, missing evidence and divergent result. Preserve historical artifacts."
              id: "exact-recovery"
              required: true
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "A task-level rework with no selected WorkItem and all required WorkItems already completed verifies the current implementation without inventing or re-completing a WorkItem. Missing or ambiguous real WorkItems still fail."
              id: "task-level-rework"
              required: true
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "A task whose required WorkItem is incomplete must fail completion before legacy DONE, success comments or closure proof is persisted. Successful completion remains replay-safe and retains current quality and authority gates."
              id: "no-false-done"
              required: true
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "Resolve and preserve the complete observed verification contract before mapping executed commands to required checks. A docs requirement discovered from the frozen task diff must not be omitted. A real check failure cannot become passed through recovery."
              id: "evidence-alignment"
              required: true
          evidence_fingerprint: "sha256:3583546dcdcf86aea188bb0149fb873d3d808449e3e5606b1ec456523b0a32f4"
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
                  description: "Resume an interrupted accepted implementation through the existing supervisor route only after proving the original result, approved plan, WorkItem, implementation and current required verification. Repeated resume records one WorkItem result. Reject changed plan, unrelated head, missing evidence and divergent result. Preserve historical artifacts."
                  id: "exact-recovery"
                  required: true
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "A task-level rework with no selected WorkItem and all required WorkItems already completed verifies the current implementation without inventing or re-completing a WorkItem. Missing or ambiguous real WorkItems still fail."
                  id: "task-level-rework"
                  required: true
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "A task whose required WorkItem is incomplete must fail completion before legacy DONE, success comments or closure proof is persisted. Successful completion remains replay-safe and retains current quality and authority gates."
                  id: "no-false-done"
                  required: true
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "Resolve and preserve the complete observed verification contract before mapping executed commands to required checks. A docs requirement discovered from the frozen task diff must not be omitted. A real check failure cannot become passed through recovery."
                  id: "evidence-alignment"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 200000
                optional_sources:
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                  - "packages/agentplane/src/commands/shared/quality-review-target.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                  - "packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                  - "packages/agentplane/src/commands/task/finish-shared.ts"
                  - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                symbol_hints:
                  - "applyExternalImplementationResult"
                  - "recordTaskCentricExternalResult"
                  - "completeTaskFromLegacyVerification"
              depends_on: []
              expected_outputs:
                - "source_patch:verification-result-recovery"
                - "verification_evidence:interruption-replay-negative-cases"
              id: "recover-verified-implementation"
              objective: "Repair one interrupted implementation-to-completion scenario within the existing CLI-owned exchange and verification model. First reproduce the orphaned READY WorkItem, null-WorkItem rework failure and partial legacy DONE using real-Git task fixtures. Preserve the original accepted result and exact plan/implementation identity during supported continuation; use existing exchange and runtime receipts rather than a new store. Align the observed verification contract before recording command coverage. Keep task-level rework separate from a selected WorkItem. Check canonical completion eligibility before persisting legacy DONE. Cover successful execution, interruption after commit and verification, repeat continuation, next transition, stale plan/head/result and missing-evidence rejection. Run focused tests, unchanged full CI and diff check. Stop with a bounded scope-extension or blocker if safe recovery requires a new public protocol, a Core migration, or unsupported historical artifact mutation. Keep release/Core order and the two existing task source scopes unchanged."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/direct-task-verification.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/finish-shared.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                - "packages/agentplane/src/commands/task/external-agent-exchange.test.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                - "packages/agentplane/src/commands/task/finish-shared.ts"
                - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
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
                    description: "Resume an interrupted accepted implementation through the existing supervisor route only after proving the original result, approved plan, WorkItem, implementation and current required verification. Repeated resume records one WorkItem result. Reject changed plan, unrelated head, missing evidence and divergent result. Preserve historical artifacts."
                    id: "exact-recovery"
                    required: true
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "A task-level rework with no selected WorkItem and all required WorkItems already completed verifies the current implementation without inventing or re-completing a WorkItem. Missing or ambiguous real WorkItems still fail."
                    id: "task-level-rework"
                    required: true
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "A task whose required WorkItem is incomplete must fail completion before legacy DONE, success comments or closure proof is persisted. Successful completion remains replay-safe and retains current quality and authority gates."
                    id: "no-false-done"
                    required: true
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "Resolve and preserve the complete observed verification contract before mapping executed commands to required checks. A docs requirement discovered from the frozen task diff must not be omitted. A real check failure cannot become passed through recovery."
                    id: "evidence-alignment"
                    required: true
                evidence_fingerprint: "sha256:3583546dcdcf86aea188bb0149fb873d3d808449e3e5606b1ec456523b0a32f4"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608280009-QMVHM2"
    event_cursor: 0
    final_validation:
      evidence:
        -
          artifact_refs:
            - "task-verification:202608280009-QMVHM2"
            - "git:6d952d932d8635833a8320a44279df306a6a06b2"
          check_id: "full-ci"
          command_identity: "bun run ci:local:full"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-08-28T04:28:22.482Z"
          repository_snapshot_digest: "sha256:f4871e0ce6e14c61da5bc696446773e3aa0e1b423058159dca5fee0675cb6116"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202608280009-QMVHM2"
            - "git:6d952d932d8635833a8320a44279df306a6a06b2"
          check_id: "diff-check"
          command_identity: "git diff --check"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-08-28T04:28:22.482Z"
          repository_snapshot_digest: "sha256:f4871e0ce6e14c61da5bc696446773e3aa0e1b423058159dca5fee0675cb6116"
          status: "passed"
      schema_version: 1
      stale_evidence: []
      status: "passed"
      unsatisfied_criteria: []
    id: "202608280009-QMVHM2"
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
      captured_at: "2026-08-28T00:09:47.847Z"
      constraints: []
      request: |-
        Recover interrupted verification-to-WorkItem completion without false DONE

        Repair the reproduced integration blocker on main e43acc5f72ba1f884966a16325d6dbc94fcb1f04. DVS5NN accepted and committed the cleanup at b577984d8418b4cb7fed521c14b6ab00bf773a93, then completed full checks, but verification persistence rejected a docs_contract mapping added by observed base history. Result application stopped before WorkItem projection. Supported TESTER verification and EVALUATOR PASS did not complete the READY WorkItem. finish then wrote legacy DONE before rejecting required_work_item_incomplete. CFKR4P also completed full checks for a task-level null-WorkItem rework but result application failed because all WorkItems were already completed. Preserve one complete scenario: accepted semantic result, exact implementation and plan binding, current mandatory verification, interruption, supported restart, exactly-once WorkItem projection, and finish without false completion. Diagnose the smallest repair before planning. Prefer existing exchange, verification and runtime receipts; do not add a parallel state store or generic replay subsystem. Preserve stale result rejection, plan and commit identity, missing-evidence rejection, approval gates and mandatory checks. Do not implement AP-CORE-012, AP-CORE-013 or AP-CORE-015 ahead of the approved graph; limit the change to this demonstrated integration recovery and prevention contract. Include real-Git positive, interruption, repeat, changed-plan/head and incomplete-WorkItem negative regressions. Keep DVS5NN and CFKR4P source scopes unchanged. No release publication or CI weakening. The user authorized autonomous completion and supported operator approvals. Stop on any unsupported authority or materially larger architectural scope.
      task_id: "202608280009-QMVHM2"
    lifecycle: "COMPLETED"
    plan_amendments: []
    plan_history: []
    revision: 17
    schema_version: 1
    updated_at: "2026-08-28T04:30:38.201Z"
    work_items:
      recover-verified-implementation:
        attempt: 1
        claim_id: null
        id: "recover-verified-implementation"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:323d0f8fd71d8aa92469b5d7599e93df7a94ba8fda8771187adb3f45be4d9d44"
            id: "source_patch:verification-result-recovery"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608280009-QMVHM2"
              work_item_id: "recover-verified-implementation"
            provenance:
              - "sha256:ea1a14320295718dad55032e6cde46227c0052ac884857e20269930e1013ec04"
              - ".agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:d36f300309142710b7c53f4e5d09879d152473e8022f2f425f83f678cbb40ddd"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:8d328bfb7bc9c8638eddfd51a12ae03824907a30112d9bb779686462c0041f30"
            id: "verification_evidence:interruption-replay-negative-cases"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608280009-QMVHM2"
              work_item_id: "recover-verified-implementation"
            provenance:
              - "sha256:ea1a14320295718dad55032e6cde46227c0052ac884857e20269930e1013ec04"
              - ".agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:d36f300309142710b7c53f4e5d09879d152473e8022f2f425f83f678cbb40ddd"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json"
              check_id: "full-ci"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-08-28T01:13:07.842Z"
              repository_snapshot_digest: "sha256:d36f300309142710b7c53f4e5d09879d152473e8022f2f425f83f678cbb40ddd"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json"
              check_id: "diff-check"
              command_identity: "git diff --check"
              detail: "Observed by git diff --check."
              exit_code: 0
              observed_at: "2026-08-28T01:13:07.842Z"
              repository_snapshot_digest: "sha256:d36f300309142710b7c53f4e5d09879d152473e8022f2f425f83f678cbb40ddd"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608280009-QMVHM2-executor-3401fa7372c9265dee75394a:
        aggregate_digest: "sha256:3ec5274876a9678c6e40a2fdc3f1dc7d2882f493bce7fc3b1712384cc7ae8e3d"
        event:
          actor_id: "agentplane"
          at: "2026-08-28T01:13:07.846Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_c90a519701e9e18361a0c378"
          mutation_id: "external-result:work-order-202608280009-QMVHM2-executor-3401fa7372c9265dee75394a"
          plan_digest: "sha256:f1268d36bbb2c0c541cf3a769f5cbe3ad4b141236b5b4fa60d40af1580da45a1"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608280009-QMVHM2"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "recover-verified-implementation"
        mutation_id: "external-result:work-order-202608280009-QMVHM2-executor-3401fa7372c9265dee75394a"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608280009-QMVHM2"
      legacy-finish:202608280009-QMVHM2:2026-08-28T04:28:22.482Z:6d952d932d8635833a8320a44279df306a6a06b2:
        aggregate_digest: "sha256:3e2e7e570b2e533791c032ad811fe7be4ef299c79c923cab5335f114fcfbb796"
        event:
          actor_id: "CODER"
          at: "2026-08-28T04:30:38.201Z"
          cause_refs:
            - "task-verification:202608280009-QMVHM2"
            - "git:6d952d932d8635833a8320a44279df306a6a06b2"
          entity: "task"
          from: "ACTIVE"
          id: "event_4de6961a0a69dc1f5e87949c"
          mutation_id: "legacy-finish:202608280009-QMVHM2:2026-08-28T04:28:22.482Z:6d952d932d8635833a8320a44279df306a6a06b2"
          plan_digest: "sha256:f1268d36bbb2c0c541cf3a769f5cbe3ad4b141236b5b4fa60d40af1580da45a1"
          plan_revision: 1
          repository_fingerprint: "sha256:f4871e0ce6e14c61da5bc696446773e3aa0e1b423058159dca5fee0675cb6116"
          schema_version: 1
          task_id: "202608280009-QMVHM2"
          task_revision: 8
          to: "COMPLETED"
          work_item_id: null
        mutation_id: "legacy-finish:202608280009-QMVHM2:2026-08-28T04:28:22.482Z:6d952d932d8635833a8320a44279df306a6a06b2"
        next_revision: 17
        previous_revision: 16
        schema_version: 1
        task_id: "202608280009-QMVHM2"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "e43acc5f72ba1f884966a16325d6dbc94fcb1f04"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "e43acc5f72ba1f884966a16325d6dbc94fcb1f04"
    version: 1
id_source: "generated"
---
## Summary

Recover interrupted verification-to-WorkItem completion without false DONE

Repair the reproduced integration blocker on main e43acc5f72ba1f884966a16325d6dbc94fcb1f04. DVS5NN accepted and committed the cleanup at b577984d8418b4cb7fed521c14b6ab00bf773a93, then completed full checks, but verification persistence rejected a docs_contract mapping added by observed base history. Result application stopped before WorkItem projection. Supported TESTER verification and EVALUATOR PASS did not complete the READY WorkItem. finish then wrote legacy DONE before rejecting required_work_item_incomplete. CFKR4P also completed full checks for a task-level null-WorkItem rework but result application failed because all WorkItems were already completed. Preserve one complete scenario: accepted semantic result, exact implementation and plan binding, current mandatory verification, interruption, supported restart, exactly-once WorkItem projection, and finish without false completion. Diagnose the smallest repair before planning. Prefer existing exchange, verification and runtime receipts; do not add a parallel state store or generic replay subsystem. Preserve stale result rejection, plan and commit identity, missing-evidence rejection, approval gates and mandatory checks. Do not implement AP-CORE-012, AP-CORE-013 or AP-CORE-015 ahead of the approved graph; limit the change to this demonstrated integration recovery and prevention contract. Include real-Git positive, interruption, repeat, changed-plan/head and incomplete-WorkItem negative regressions. Keep DVS5NN and CFKR4P source scopes unchanged. No release publication or CI weakening. The user authorized autonomous completion and supported operator approvals. Stop on any unsupported authority or materially larger architectural scope.

## Scope

- In scope: Repair the reproduced integration blocker on main e43acc5f72ba1f884966a16325d6dbc94fcb1f04. DVS5NN accepted and committed the cleanup at b577984d8418b4cb7fed521c14b6ab00bf773a93, then completed full checks, but verification persistence rejected a docs_contract mapping added by observed base history. Result application stopped before WorkItem projection. Supported TESTER verification and EVALUATOR PASS did not complete the READY WorkItem. finish then wrote legacy DONE before rejecting required_work_item_incomplete. CFKR4P also completed full checks for a task-level null-WorkItem rework but result application failed because all WorkItems were already completed. Preserve one complete scenario: accepted semantic result, exact implementation and plan binding, current mandatory verification, interruption, supported restart, exactly-once WorkItem projection, and finish without false completion. Diagnose the smallest repair before planning. Prefer existing exchange, verification and runtime receipts; do not add a parallel state store or generic replay subsystem. Preserve stale result rejection, plan and commit identity, missing-evidence rejection, approval gates and mandatory checks. Do not implement AP-CORE-012, AP-CORE-013 or AP-CORE-015 ahead of the approved graph; limit the change to this demonstrated integration recovery and prevention contract. Include real-Git positive, interruption, repeat, changed-plan/head and incomplete-WorkItem negative regressions. Keep DVS5NN and CFKR4P source scopes unchanged. No release publication or CI weakening. The user authorized autonomous completion and supported operator approvals. Stop on any unsupported authority or materially larger architectural scope.
- Out of scope: unrelated refactors not required for "Recover interrupted verification-to-WorkItem completion without false DONE".

## Plan

Repair one interrupted implementation-to-completion scenario within the existing CLI-owned exchange and verification model. First reproduce the orphaned READY WorkItem, null-WorkItem rework failure and partial legacy DONE using real-Git task fixtures. Preserve the original accepted result and exact plan/implementation identity during supported continuation; use existing exchange and runtime receipts rather than a new store. Align the observed verification contract before recording command coverage. Keep task-level rework separate from a selected WorkItem. Check canonical completion eligibility before persisting legacy DONE. Cover successful execution, interruption after commit and verification, repeat continuation, next transition, stale plan/head/result and missing-evidence rejection. Run focused tests, unchanged full CI and diff check. Stop with a bounded scope-extension or blocker if safe recovery requires a new public protocol, a Core migration, or unsupported historical artifact mutation. Keep release/Core order and the two existing task source scopes unchanged.

## Verify Steps

1. Run the focused recovery suite:
```bash
bun x vitest run packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts packages/agentplane/src/commands/task/external-agent-exchange.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts --maxWorkers=1
```
Expected: all 63 scoped tests pass. Cover ordinary completion, interruption before verification and before WorkItem projection, fresh continuation, exactly-once replay, and the next task-level rework when all required WorkItems are already complete.

2. Check rejection cases in that suite. Changed plan revision, commands, scope, authority, task body, implementation receipt, source content, frozen base, missing evidence, and a divergent original result digest must not become successful recovery. Moving source into managed artifacts must not hide a product change.

3. Check the preserved contracts. The observed frozen diff must contribute required checks before verification evidence is mapped. Required-incomplete finish, including a forced attempt, must leave the entire task unchanged and must not record false DONE.

4. Run the unchanged mandatory commands `bun run ci:local:full` and `git diff --check`. Expected: both pass with no skipped mandatory checks or relaxed timeouts, structural limits, or baselines. Record verification through the supervisor for the current task document and exact implementation input.

5. Obtain a fresh evaluator decision, then follow the authorized provider route through exact-head required checks, integration, and confirmed closure. Local verification does not prove hosted integration and does not replace final release `release:prepublish`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-28T01:13:04.735Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2fcdcf5e97e112cb401f675acb1c749b4de52684964dcaa8fb2f6ab46ffefd7e, input_digest=sha256:d6bb27f47586db4b35671910f83a1ce8058196dafa99b8a08071e4267d3b501c

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608280009-QMVHM2-recover-interrupted-verification-to-workitem-com/.agentplane/tasks/202608280009-QMVHM2/blueprint/resolved-snapshot.json
- old_digest: 9f8313c431ef0435b9f5ea2458ec11f9f5ea1e66ec55c98afcb78fffe3c2d7e2
- current_digest: 9f8313c431ef0435b9f5ea2458ec11f9f5ea1e66ec55c98afcb78fffe3c2d7e2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608280009-QMVHM2

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

### 2026-08-28T04:28:22.482Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a64bd7dbb74746d4ee85273b13f408d4c3085637a7306eaa738070743e9de038, input_digest=sha256:b54cd3fbfb4dbf611f269d534cdd1ac69d10d8a6b4e9e0311df88b6f511a731d

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280009-QMVHM2 Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608280009-QMVHM2-recover-interrupted-verification-to-workitem-com/.agentplane/tasks/202608280009-QMVHM2/blueprint/resolved-snapshot.json
- old_digest: 9f8313c431ef0435b9f5ea2458ec11f9f5ea1e66ec55c98afcb78fffe3c2d7e2
- current_digest: 9f8313c431ef0435b9f5ea2458ec11f9f5ea1e66ec55c98afcb78fffe3c2d7e2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608280009-QMVHM2

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608280009-QMVHM2
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-28T05:02:20.795Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a64bd7dbb74746d4ee85273b13f408d4c3085637a7306eaa738070743e9de038, input_digest=sha256:20ee0480e2646084b93a10bf643f67826a7821c39a9952782d0aa26b3d38a655

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608280009-QMVHM2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280009-QMVHM2 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608280009-QMVHM2-recover-interrupted-verification-to-workitem-com/.agentplane/tasks/202608280009-QMVHM2/blueprint/resolved-snapshot.json
- old_digest: 9f8313c431ef0435b9f5ea2458ec11f9f5ea1e66ec55c98afcb78fffe3c2d7e2
- current_digest: 9f8313c431ef0435b9f5ea2458ec11f9f5ea1e66ec55c98afcb78fffe3c2d7e2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608280009-QMVHM2

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608280009-QMVHM2
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

Implemented in source commit `6d952d932d8635833a8320a44279df306a6a06b2`, based on `e43acc5f72ba1f884966a16325d6dbc94fcb1f04`.

Proved causes: verification evidence mapping could stop before canonical WorkItem projection; task-level rework could try to select a nonexistent WorkItem after verification was already successful; finish could persist legacy DONE before checking required WorkItem completion.

The bounded repair uses existing exchanges, implementation receipts, the current approved plan, exact Git ancestry and path scope, and a preserved task contract. Recovery retains the original source commit and historical exchange bytes and reruns current checks. It adds no store, public protocol, or Core migration.

Local evidence: 63 focused tests passed. The full mandatory CI passed locally and again through the supervisor. The first local full run failed the unchanged module-size limit; extracting the recovery helper fixed that failure without raising the limit. Typecheck, ESLint, formatting, Knip, hotspot checks, and diff checks passed. Supervisor record `verification/20260828011304735-23f23a1652815c0c.json` binds the source commit and frozen base above to all selected local checks. These are historical results for the previous task-document input. Updating Verify Steps requires fresh routed verification; do not treat the previous input as equivalent.

Read-only probes of the existing DVS5NN and CFKR4P worktrees resolved their recorded implementation commits, respectively `b577984d8418b4cb7fed521c14b6ab00bf773a93` and `a87c4324423fc65c3c7ea3b83ccc797ccc6f4fc0`. The probes did not resume, integrate, or close either task.

Remaining work: obtain current verification and evaluator acceptance for QMVHM2, publish through matching authority, pass exact-head hosted checks, integrate, and confirm closure. Then resume DVS5NN and CFKR4P through fresh supported routes. DVS5NN's partial legacy DONE is not delivery. Refresh the diagnostic remainder on exact main after integration; do not reuse the old failure count. Provider-neutral wording diagnostics remain separate. Final 0.7.8 qualification/publication and the approved subsequent Core graph remain separate; this repair neither qualifies a release nor reorders that graph.

## Token Usage

- State: `unavailable`
- Completeness: `0/5` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:9c0e47b517f9d8279889bb184236ce2c56dc8a36996d1620bb5b3b637f0ea1f5`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-28T04:30:38.201Z`
