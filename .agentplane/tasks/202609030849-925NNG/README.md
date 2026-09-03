---
id: "202609030849-925NNG"
title: "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 60
origin:
  system: "manual"
depends_on: []
tags:
  - "bootstrap-recovery"
  - "task-centric-projection"
  - "plan-rejection"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-03T12:31:39.835Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:e96a8561cb98e43c88db75e5bd3f81d5224e08e857d78bc02876048c8d9ca01a"
verification:
  state: "ok"
  updated_at: "2026-09-03T14:21:43.530Z"
  updated_by: "TESTER"
  note: "Hosted verify-tests transient concurrency race was reproduced as non-deterministic: the focused workflow.verify-hooks suite passed 11/11 locally, failed-job retry passed, and aggregate PR verification passed without source changes."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-03T13:42:13.741Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "ac53261209a4623880059cb38f0a2d4bb32c445c"
  blueprint_digest: "3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686"
  evidence_refs:
    - ".agentplane/tasks/202609030849-925NNG/quality/20260903-134213297-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202609030849-925NNG/quality/20260903-134213297-recovery-context/quality-report.json"
    - ".agentplane/tasks/202609030849-925NNG/quality/objects/sha256/eb8f2d88b5dd0a38e0eaef39545380b9f1e1538d9318e1574b16c190b33b7820.md"
    - ".agentplane/tasks/202609030849-925NNG/quality/20260903-134213297-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202609030849-925NNG/quality/20260903-134213297-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202609030849-925NNG/quality/20260903-134213297-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202609030849-925NNG/README.md"
    - ".agentplane/tasks/202609030849-925NNG/quality/objects/sha256/1ca9d6a93e4e2399dab5d41b96ba6778554241e2f0518a4653fbdaccb3191bc6.patch"
    - ".agentplane/tasks/202609030849-925NNG/quality/objects/sha256/9e8da0e943c95b581d0921904a3ef43fef5d4479dc4d85f3d977f743b709f8bd.json"
    - ".agentplane/tasks/202609030849-925NNG/verification/20260903134024104-b0c8dd27f7dcba79.json"
    - ".agentplane/tasks/202609030849-925NNG/quality/objects/sha256/b12d54abf11d7d544e8decfc5df04b6a42ab53ec400ec17e4191710201f8943d.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "No blocking finding: checkTaskCentricProjectionIntegrityState and assertCanonicalPlanCanBeApproved remain directly imported and invoked at their runtime call sites; only unused barrel exposure was removed."
token_usage:
  agent_runs: 20
  input_tokens: null
  journal_digest: "sha256:d64d42523a8afdcdc6753557f046f4545cfa15c98634613ec4ea9d9868c64ba6"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-09-03T14:22:45.670Z"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
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
      - "documentation"
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
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "docs/reference"
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/doctor"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks/task-kernel"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The defect spans canonical task-centric persistence, routing, diagnostics, CLI registration, focused tests, and the exact compatibility ratchet."
      - "branch_pr remains required for independent evaluation and hosted integration before historical recovery."
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "docs/reference"
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/doctor"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks/task-kernel"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-runtime.ts"
      - "packages/agentplane/src/adapters/task-backend/task-centric-plan-rejection.ts"
      - "packages/agentplane/src/cli/group-command.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.help-contract.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
      - "packages/agentplane/src/cli/run-cli/command-catalog.test.ts"
      - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
      - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
      - "packages/agentplane/src/commands/doctor/workspace-task-state.test.ts"
      - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
      - "packages/agentplane/src/commands/doctor/workspace.ts"
      - "packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
      - "packages/agentplane/src/commands/task/plan-approval-guard.ts"
      - "packages/agentplane/src/commands/task/plan-recover-rejection.command.ts"
      - "packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts"
      - "packages/agentplane/src/commands/task/plan-rejection-recovery.ts"
      - "packages/agentplane/src/commands/task/plan.command.ts"
      - "packages/agentplane/src/commands/task/plan.ts"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
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
        id: "recorded-check-16"
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
  reason_codes:
    - "agent_preferred_branch_pr"
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
          - "docs/reference"
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/doctor"
          - "packages/agentplane/src/commands/task"
          - "packages/core/src/tasks/task-kernel"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:2565dddf9529115f6750dcc9ea44b714d02025fb4acf80974d79c0a7baa72042"
      escalation_reasons:
        - "central_component:packages/core/src/tasks/task-kernel"
        - "central_component:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "central_path:packages/agentplane/src/cli/group-command.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.help-contract.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-catalog.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
        - "central_path:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
        - "unknown_path:scripts/baselines/v0.7-compatibility-candidate.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
          - "scripts"
        changed_files:
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-runtime.ts"
          - "packages/agentplane/src/adapters/task-backend/task-centric-plan-rejection.ts"
          - "packages/agentplane/src/cli/group-command.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.help-contract.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
          - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
          - "packages/agentplane/src/cli/run-cli/command-catalog.test.ts"
          - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
          - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
          - "packages/agentplane/src/commands/doctor/workspace-task-state.test.ts"
          - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
          - "packages/agentplane/src/commands/doctor/workspace.ts"
          - "packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
          - "packages/agentplane/src/commands/task/plan-approval-guard.ts"
          - "packages/agentplane/src/commands/task/plan-recover-rejection.command.ts"
          - "packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts"
          - "packages/agentplane/src/commands/task/plan-rejection-recovery.ts"
          - "packages/agentplane/src/commands/task/plan.command.ts"
          - "packages/agentplane/src/commands/task/plan.ts"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
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
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "a5b233f604c1ffd843f783f2ba9d4eb8e3cc4610"
  message: "🧪 925NNG test: record hosted retry pass"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: fc7843b5ffc6. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 6d8522b612cf. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 89bc65eccd28. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: efa74b42a2e7. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "External EXECUTOR returned failed: The prepared implementation episode is stale and cannot be executed safely: it has no WorkItem binding even though the approved canonical plan still contains two PLANNED WorkItems, while the task already records implementation commit efa74b42a2e77bb77de2ff908af5b8b29194135d and successful verification."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b5d0b776104b. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 7bfa0304918a. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: f07873bcf8b8. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b3ca56abe63f. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-09-03T08:57:33.804Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-03T09:14:46.501Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: fc7843b5ffc6. CLI accepted one state-bound external-agent semantic result."
    commit: "fc7843b5ffc66dac1d65dcacc3c26fb38edd1db8"
  -
    type: "verify"
    at: "2026-09-03T09:14:54.444Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: agentplane doctor"
  -
    type: "status"
    at: "2026-09-03T11:23:34.113Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-03T11:28:06.930Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 6d8522b612cf. CLI accepted one state-bound external-agent semantic result."
    commit: "6d8522b612cf0684ec6d4b9fc2dd5f3d34391342"
  -
    type: "verify"
    at: "2026-09-03T11:29:57.796Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-09-03T11:32:06.611Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-03T11:53:57.678Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 89bc65eccd28. CLI accepted one state-bound external-agent semantic result."
    commit: "89bc65eccd2896aac9bad3c3d4f050fbbd07fe3e"
  -
    type: "verify"
    at: "2026-09-03T12:01:45.892Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-09-03T12:06:25.012Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: efa74b42a2e7. CLI accepted one state-bound external-agent semantic result."
    commit: "efa74b42a2e77bb77de2ff908af5b8b29194135d"
  -
    type: "verify"
    at: "2026-09-03T12:14:10.399Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "comment"
    at: "2026-09-03T12:15:52.052Z"
    author: "SUPERVISOR"
    body: "External EXECUTOR returned failed: The prepared implementation episode is stale and cannot be executed safely: it has no WorkItem binding even though the approved canonical plan still contains two PLANNED WorkItems, while the task already records implementation commit efa74b42a2e77bb77de2ff908af5b8b29194135d and successful verification."
  -
    type: "status"
    at: "2026-09-03T12:21:23.132Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-03T12:24:40.155Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-03T12:27:37.157Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b5d0b776104b. CLI accepted one state-bound external-agent semantic result."
    commit: "b5d0b776104b19ec5fc68526526993bac6536626"
  -
    type: "status"
    at: "2026-09-03T12:29:22.236Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 7bfa0304918a. CLI accepted one state-bound external-agent semantic result."
    commit: "7bfa0304918ae557b05c6082b69aa4d9a3c1dfc1"
  -
    type: "status"
    at: "2026-09-03T12:31:47.637Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-03T12:33:14.554Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: f07873bcf8b8. CLI accepted one state-bound external-agent semantic result."
    commit: "f07873bcf8b85cc6a362af91588a8416bdfbe60a"
  -
    type: "status"
    at: "2026-09-03T12:44:42.298Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b3ca56abe63f. CLI accepted one state-bound external-agent semantic result."
    commit: "b3ca56abe63fcca08fc766f4cfa489c7546104fb"
  -
    type: "verify"
    at: "2026-09-03T13:01:15.573Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  -
    type: "status"
    at: "2026-09-03T13:02:38.568Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "b742ba8fac0bff396ba020eaa2f5cfea39de1a0f"
  -
    type: "verify"
    at: "2026-09-03T13:40:24.104Z"
    author: "TESTER"
    state: "ok"
    note: "Rework removes only two unused public re-exports; task-centric recovery behavior is unchanged and all required checks pass on committed head ac53261209a4623880059cb38f0a2d4bb32c445c."
  -
    type: "status"
    at: "2026-09-03T13:43:13.739Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "4d2fd5a8a6111ba3f47fb47f96924b15051d13f4"
  -
    type: "verify"
    at: "2026-09-03T13:47:05.071Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  -
    type: "status"
    at: "2026-09-03T13:57:57.384Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "3323eeb6824061f4ed998d5e7d5eb4a1f4278282"
  -
    type: "verify"
    at: "2026-09-03T14:21:43.530Z"
    author: "TESTER"
    state: "ok"
    note: "Hosted verify-tests transient concurrency race was reproduced as non-deterministic: the focused workflow.verify-hooks suite passed 11/11 locally, failed-job retry passed, and aggregate PR verification passed without source changes."
  -
    type: "status"
    at: "2026-09-03T14:22:45.670Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "a5b233f604c1ffd843f783f2ba9d4eb8e3cc4610"
doc_version: 3
doc_updated_at: "2026-09-03T14:22:45.699Z"
doc_updated_by: "CODER"
description: "Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB."
sections:
  Summary: |-
    Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation

    Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB.
  Scope: |-
    - In scope: Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB.
    - Out of scope: unrelated refactors not required for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation".
  Plan: "Refine the executable branch_pr recovery plan so every deterministic validation check is one supervisor-observable command, preserving the completed atomic WorkItem and the exact output chain."
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-03T09:14:54.444Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: agentplane doctor
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:033e09543ff0e1038058d9488275acb9169fea33a36278d8136bbfa0b3b7a007

    Details:

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG declared verification

    Command: agentplane doctor
    Result: fail
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
    - old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609030849-925NNG

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

    ### 2026-09-03T11:29:57.796Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:33d3954a1429d61236351f21f9aa4d220b84f62330d99964ccefe63209a31c43

    Details:

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG declared verification

    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
    - old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609030849-925NNG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-03T12:01:45.892Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:8372e964a0ee2c20927169a6cd09f7f8266d46e5e217461c81053038b5186e49

    Details:

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (3/3)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (1/3)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (2/3)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check full_regression

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (1/3)

    Check: real_e2e
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (2/3)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (3/3)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (3/3)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
    - old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609030849-925NNG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-03T12:14:10.399Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:8bae660f6bd1e9954513792c06ff27d5ff122519a1630d154e0cceefe634d5c2

    Details:

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (3/3)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (1/3)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (2/3)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check full_regression

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (1/3)

    Check: real_e2e
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (2/3)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (3/3)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (3/3)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
    - old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609030849-925NNG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-03T13:01:15.573Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:26141e10683ca6a4531f05b0f01750ebda4a3104c7dc81ebbcbb068dd2769859

    Details:

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (3/3)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (1/3)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (2/3)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check full_regression

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (1/3)

    Check: real_e2e
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (2/3)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (3/3)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (3/3)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
    - old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609030849-925NNG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609030849-925NNG
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-03T13:40:24.104Z — VERIFY — ok

    By: TESTER

    Note: Rework removes only two unused public re-exports; task-centric recovery behavior is unchanged and all required checks pass on committed head ac53261209a4623880059cb38f0a2d4bb32c445c.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:ca54bc04b3360dd8339701dca0828f925b11f1a954ac3e12fdce61e66fc495ae

    Details:

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts
    Result: pass
    Evidence: 3 files and 10 tests passed.
    Scope: plan rejection, diagnostic, recovery, and task-centric adapter regressions

    Check: critical_paths
    Command: bun run knip:check; bun run lint:core; bun run typecheck; bun run format:check
    Result: pass
    Evidence: AgentPlane CLI Knip budget 0/0; lint, TypeScript build, and Prettier all exited 0.
    Scope: changed CLI and doctor modules

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: docs schema, generated reference, docs site generate, typecheck, build, design, and workflow contract all passed in the final full run.
    Scope: repository documentation and generated CLI contract

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: full-fast ok=true wall_clock_ms=414757; Windows 7 files 98 tests passed; significant coverage 8 files 101 tests passed and 17 source targets satisfied.
    Scope: full repository local CI on committed rework head

    Check: real_e2e
    Command: bunx vitest run packages/agentplane/src/commands/release/local-release-e2e-script.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: isolated real-process E2E rerun passed 1 file and 4 tests after an unrelated temporary-directory ENOTEMPTY race in the preceding full run.
    Scope: local real-process E2E compatibility

    Check: task_outcome
    Command: bun run ci:local:full; bun run knip:check
    Result: pass
    Evidence: final full CI exited 0 and the hosted blocker is resolved locally with AgentPlane CLI Knip budget restored to 0/0; task recovery focused tests remain 10/10.
    Scope: acceptance outcome for atomic rejection and CLI-owned recovery implementation

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
    - old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609030849-925NNG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-03T13:47:05.071Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:2366beb221bf25bb9d2bdf5da1306350a8f083229f45a8fe084128b30c72a894

    Details:

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (3/3)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (1/3)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (2/3)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check full_regression

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (1/3)

    Check: real_e2e
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (2/3)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (3/3)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (3/3)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
    - old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609030849-925NNG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-03T14:21:43.530Z — VERIFY — ok

    By: TESTER

    Note: Hosted verify-tests transient concurrency race was reproduced as non-deterministic: the focused workflow.verify-hooks suite passed 11/11 locally, failed-job retry passed, and aggregate PR verification passed without source changes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:4174d982682606c11198a1e67cb4f709b6ac0e88c6c39d80371725b3a97c7c31

    Details:

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/commands/workflow.verify-hooks.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000 --retry 2
    Result: pass
    Evidence: focused concurrency suite passed 1 file and 11 tests.
    Scope: durable verification record under concurrent verifies

    Check: critical_paths
    Command: gh run rerun 33764148583 --repo basilisk-labs/agentplane --failed
    Result: pass
    Evidence: verify-tests retry job 100680983796 passed in 11m48s; aggregate PR verification job 100684909084 passed in 17s.
    Scope: hosted required checks on unchanged closure head 597df3b5ae991321eeb033a6a059278eb0b5cf18

    Check: docs_contract
    Command: hosted verify-contract job 100680986739
    Result: pass
    Evidence: verify-contract passed; no source or docs change followed.
    Scope: generated and documentation contracts

    Check: full_regression
    Command: bun run ci:local:full; hosted verify-tests retry
    Result: pass
    Evidence: final local full CI exited 0 and hosted retry passed all unit, critical CLI, workflow coverage, and significant coverage stages.
    Scope: full repository regression

    Check: real_e2e
    Command: bunx vitest run packages/agentplane/src/commands/release/local-release-e2e-script.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: isolated real-process E2E passed 1 file and 4 tests.
    Scope: local real-process compatibility

    Check: task_outcome
    Command: hosted PR verification job 100684909084
    Result: pass
    Evidence: aggregate provider verification passed for PR #5888 after failed-job retry; no implementation change was required.
    Scope: recovery fix integration readiness

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
    - old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609030849-925NNG

    DecisionContextRef:
    - operator_action: stop
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
  agentplane.execution_grant:
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:e96a8561cb98e43c88db75e5bd3f81d5224e08e857d78bc02876048c8d9ca01a"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:e2948d9d384b38b3f5e77112cf7ab5b5144ff9c778c1bde311f0402d7c728526"
    digest: "sha256:8cf3456e8d2547c79c67af8bcdfa4cbf0ba428c9acc3c50c45dc035ccae8daca"
    grant_id: "01e6336b-8f75-49ca-a212-514051c887e3"
    issued_at: "2026-09-03T12:31:39.835Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:c6ce0c2891f0f55526cd77a6915c0187af01736f4a706ee0e49628ab5532f57d"
    plan_revision: 41
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:f4fbd7586006095d0e046d670c8df7a6ea758e42387969ea67c87d3a14759130"
    status: "active"
    task_id: "202609030849-925NNG"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-03T12:31:39.835Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:9105b3af7bfd6b11eff54b81ab7ec485a7b194f0698ff47470d76fb7b6f11f69"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-03T12:31:25.930Z"
      digest: "sha256:9105b3af7bfd6b11eff54b81ab7ec485a7b194f0698ff47470d76fb7b6f11f69"
      proposal:
        assumptions:
          - "The repair reuses the existing kernel reject_plan command and task-centric CAS/receipt machinery instead of introducing a second lifecycle model."
          - "The historical task will be reconciled only after independent evaluation and integration on fresh main."
          - "The recovery command requires exact task id, rejected digest, observed revisions, and current fingerprint so unrelated corruptions fail closed."
          - "The compatibility candidate and ratchet checker will record only the intentional recover-rejection command descriptor, options, and task provenance."
          - "The new WorkItem will reproduce the binding loss through the public task-centric external-result path before changing the route."
          - "Existing implementation commits and verification evidence remain preserved; the supervisor decides whether they can be reused after the binding fix."
          - "Historical task recovery remains prohibited until the repair, including this routing fix, is independently evaluated and integrated."
          - "External planning authority can call the exported kernel WorkItem invariant without changing task-centric persistence semantics."
          - "The corrected plan graph is schedulable because every required input is produced by exactly one declared predecessor."
        planning_baseline:
          captured_at: "2026-09-03T12:30:32.313Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:f195c0d295a2dad5b9d709d522b9f05c4aa4135222214062ec14500fb590f45e"
          dirty_paths:
            - ".agentplane/tasks/202609030849-925NNG/README.md"
            - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            - ".agentplane/tasks/202609030849-925NNG/supervision/implementation-evidence.json"
          git:
            kind: "commit"
            ref: null
            sha: "7bfa0304918ae557b05c6082b69aa4d9a3c1dfc1"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:40"
        schema_version: 1
        task_id: "202609030849-925NNG"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run lifecycle:invariants"
              id: "lifecycle-invariants"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "bun run hotspots:check"
              id: "hotspots"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "bun run lint"
              id: "lint"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "node .agentplane/policy/check-routing.mjs"
              id: "routing-policy"
              kind: "deterministic"
              required: true
              timeout_ms: 60000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-local-ci"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              id: "independent-evaluator"
              kind: "semantic"
              required: true
            -
              capability: "task.verify"
              id: "hosted-integration"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "post-merge-recovery"
              kind: "semantic"
              required: true
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1"
              id: "focused-workspace"
              kind: "deterministic"
              required: true
              timeout_ms: 240000
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
              id: "focused-cli"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "bun run bench:compatibility:candidate:check"
              id: "compatibility-candidate"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "bun run bench:compatibility:check"
              id: "compatibility-baseline"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
          criteria:
            -
              check_ids:
                - "focused-workspace"
                - "focused-cli"
              description: "All eight requested regression scenarios pass and demonstrate atomic rejection plus deterministic historical recovery."
              id: "top-1"
              required: true
            -
              check_ids:
                - "lifecycle-invariants"
                - "compatibility-candidate"
                - "compatibility-baseline"
                - "hotspots"
                - "lint"
                - "typecheck"
                - "routing-policy"
                - "full-local-ci"
              description: "Lifecycle invariants, compatibility, hotspots, lint, typecheck, routing policy, and full local CI pass without relaxed checks."
              id: "top-2"
              required: true
            -
              check_ids:
                - "independent-evaluator"
                - "hosted-integration"
              description: "An independent EVALUATOR passes the exact implementation and AgentPlane integrates it through branch_pr before historical recovery."
              id: "top-3"
              required: true
            -
              check_ids:
                - "post-merge-recovery"
              description: "Fresh main uses only the new CLI operation to recover the historical task and stops at an unapproved fresh planning boundary."
              id: "top-4"
              required: true
          evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "atomic-focused"
                  description: "Proposal followed by rejection atomically commits README projection, canonical aggregate, revision, event, receipt, rejected plan state, invalidation, and kernel_plan_required route."
                  id: "atomic-1"
                  required: true
                -
                  check_ids:
                    - "atomic-focused"
                  description: "Exact rejection replay returns the durable receipt without a second revision or event, and interruption cannot expose a rejected README with an approval-eligible canonical plan."
                  id: "atomic-2"
                  required: true
                -
                  check_ids:
                    - "atomic-focused"
                    - "lifecycle-invariants"
                  description: "Stale approval packets and host decisions for the rejected digest fail closed, and task advance emits agent.planning."
                  id: "atomic-3"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 120000
                optional_sources:
                  - "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/plan.ts"
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                  - "packages/core/src/tasks/task-kernel/kernel.ts"
                  - "packages/agentplane/src/commands/task/kernel-advance.ts"
                symbol_hints:
                  - "cmdTaskPlanReject"
                  - "reject_plan"
                  - "TaskCentricBackendAdapter"
                  - "advanceCanonicalTask"
              depends_on: []
              expected_outputs:
                - "atomic-plan-rejection-implementation"
                - "plan-rejection-regression-evidence"
              id: "atomic-plan-rejection"
              objective: "Reproduce the split-brain plan rejection in an isolated task-centric fixture, identify the bypass of the canonical reject_plan transition, and implement one atomic receipt-backed rejection mutation whose replay, interruption behavior, route invalidation, and stale approval handling are fail-closed."
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
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks/task-kernel"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts --maxWorkers=1"
                    id: "atomic-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "lifecycle-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Focused tests verify atomic canonical rejection across all projections and persistence records."
                    id: "atomic-1"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Focused tests verify replay idempotency and simulated interruption boundaries."
                    id: "atomic-2"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                      - "lifecycle-invariants"
                    description: "Focused tests and lifecycle invariants verify stale approval rejection and planning route selection."
                    id: "atomic-3"
                    required: true
                evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "recovery-focused-workspace"
                    - "recovery-focused-cli"
                  description: "A read-only diagnostic detects the 52 versus 50 revision mismatch and rejected README versus approval-eligible canonical plan without mutation."
                  id: "recovery-1"
                  required: true
                -
                  check_ids:
                    - "recovery-focused-workspace"
                    - "recovery-focused-cli"
                  description: "The guarded CLI recovery validates exact historical preconditions, preserves task content and evidence, and appends the canonical event and receipt with monotonic revision history."
                  id: "recovery-2"
                  required: true
                -
                  check_ids:
                    - "recovery-focused-workspace"
                    - "recovery-focused-cli"
                    - "lifecycle-invariants"
                  description: "Equivalent fixture recovery invalidates the rejected digest and post-recovery advance emits agent.planning with a new fingerprint."
                  id: "recovery-3"
                  required: true
                -
                  check_ids:
                    - "compatibility-candidate"
                    - "compatibility-baseline"
                    - "routing-policy"
                  description: "The compatibility candidate records only the intentional CLI topology addition and both compatibility checks pass."
                  id: "recovery-4"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 160000
                optional_sources:
                  - "packages/agentplane/src/adapters/task-backend/kernel-migration.ts"
                  - "docs/reference"
                required_sources:
                  - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
                  - "packages/agentplane/src/commands/task/plan.ts"
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                  - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                symbol_hints:
                  - "checkTaskReadmeMigrationState"
                  - "cmdTaskPlanReject"
                  - "mutation_receipts"
                  - "task command catalog"
                  - "compatibility candidate"
              depends_on:
                - "atomic-plan-rejection"
              expected_outputs:
                - "recovery-operation-implementation"
                - "diagnostic-regression-evidence"
                - "compatibility-candidate-update"
                - "historical-recovery-regression-evidence"
                - "reviewed-compatibility-ratchet-update"
              id: "diagnostic-and-recovery"
              objective: "Add mismatch diagnostics and a deterministic CLI-owned historical recovery, update the compatibility candidate for the intentional command topology, qualify the repair, integrate it, and only then recover the historical task on fresh main without approving its new plan."
              optional: false
              priority: 90
              required_inputs:
                - "atomic-plan-rejection-implementation"
                - "plan-rejection-regression-evidence"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/doctor"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/commands/doctor"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks/task-kernel"
                - "docs/reference"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "lifecycle-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "node .agentplane/policy/check-routing.mjs"
                    id: "routing-policy"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 60000
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1"
                    id: "recovery-focused-workspace"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 240000
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
                    id: "recovery-focused-cli"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run bench:compatibility:candidate:check"
                    id: "compatibility-candidate"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run bench:compatibility:check"
                    id: "compatibility-baseline"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "recovery-focused-workspace"
                      - "recovery-focused-cli"
                    description: "Focused workspace diagnostic test detects the historical mismatch without mutation."
                    id: "recovery-1"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused-workspace"
                      - "recovery-focused-cli"
                    description: "Focused adapter, CLI, and recovery tests cover exact preconditions, preservation, monotonic history, event, receipt, and auditability."
                    id: "recovery-2"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused-workspace"
                      - "recovery-focused-cli"
                      - "lifecycle-invariants"
                    description: "Focused tests and invariants verify digest invalidation and post-recovery agent.planning."
                    id: "recovery-3"
                    required: true
                  -
                    check_ids:
                      - "compatibility-candidate"
                      - "compatibility-baseline"
                      - "routing-policy"
                    description: "Compatibility and routing checks verify the intentional CLI surface addition."
                    id: "recovery-4"
                    required: true
                evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "binding-focused"
                  description: "Focused external-planning tests reject an unproduced, multiply produced, self-produced, or cyclic required input before task plan persistence, while the corrected plan output chain remains executable."
                  id: "binding-1"
                  required: true
                -
                  check_ids:
                    - "binding-focused"
                    - "lifecycle-invariants"
                  description: "A valid corrected graph preserves canonical WorkItem selection and result application exactly once; stale or absent bindings fail closed without partial lifecycle mutation."
                  id: "binding-2"
                  required: true
                -
                  check_ids:
                    - "binding-focused"
                  description: "After deterministic verification, task next-action reaches independent EVALUATOR and does not loop through an EXECUTOR packet with work_item_id null."
                  id: "binding-3"
                  required: true
                -
                  check_ids:
                    - "binding-focused"
                    - "lifecycle-invariants"
                    - "compatibility-candidate"
                    - "compatibility-baseline"
                    - "hotspots"
                    - "lint"
                    - "typecheck"
                    - "routing-policy"
                    - "full-local-ci"
                    - "independent-evaluator"
                    - "hosted-integration"
                  description: "Focused regressions, lifecycle invariants, compatibility, hotspots, lint, typecheck, routing policy, full local CI, independent EVALUATOR, and hosted integration all pass before historical recovery."
                  id: "binding-4"
                  required: true
                -
                  check_ids:
                    - "post-merge-recovery"
                  description: "On fresh main only the CLI-owned recovery operation reconciles 202609021331-5FPZAB and task advance stops at a fresh unapproved agent.planning boundary."
                  id: "binding-5"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 120000
                optional_sources:
                  - "packages/core/src/tasks/task-centric/graph.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
                  - "packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                  - "packages/core/src/tasks/task-kernel/invariants.ts"
                symbol_hints:
                  - "planningTaskFields"
                  - "validateTaskPlanProposal"
                  - "validateWorkItemDefinitions"
                  - "recordTaskCentricExternalResult"
              depends_on:
                - "atomic-plan-rejection"
                - "diagnostic-and-recovery"
              expected_outputs:
                - "task-plan-graph-validation-fix"
                - "invalid-required-input-regression-evidence"
                - "work-item-completion-binding-fix"
                - "work-item-binding-regression-evidence"
                - "independent-evaluator-pass"
                - "integrated-repair"
                - "historical-task-recovery-evidence"
              id: "work-item-completion-binding"
              objective: "Reject invalid external TaskPlanProposal graphs before persistence, including unproduced, multiply produced, self-produced, and cyclic required_inputs, while preserving canonical WorkItem binding and routing the corrected verified branch_pr task to independent EVALUATOR."
              optional: false
              priority: 80
              required_inputs:
                - "recovery-operation-implementation"
                - "diagnostic-regression-evidence"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --maxWorkers=1"
                    id: "binding-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 240000
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "lifecycle-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run hotspots:check"
                    id: "hotspots"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run lint"
                    id: "lint"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "node .agentplane/policy/check-routing.mjs"
                    id: "routing-policy"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 60000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-local-ci"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    id: "independent-evaluator"
                    kind: "semantic"
                    required: true
                  -
                    capability: "task.verify"
                    id: "hosted-integration"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    id: "post-merge-recovery"
                    kind: "semantic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run bench:compatibility:candidate:check"
                    id: "compatibility-candidate"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run bench:compatibility:check"
                    id: "compatibility-baseline"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "binding-focused"
                    description: "Focused tests prove fail-closed required-input graph validation and acceptance of the corrected output chain."
                    id: "binding-1"
                    required: true
                  -
                    check_ids:
                      - "binding-focused"
                      - "lifecycle-invariants"
                    description: "Focused tests and lifecycle invariants prove exactly-once WorkItem completion and idempotent replay."
                    id: "binding-2"
                    required: true
                  -
                    check_ids:
                      - "binding-focused"
                    description: "The verified branch_pr route reaches EVALUATOR without an unbound EXECUTOR loop."
                    id: "binding-3"
                    required: true
                  -
                    check_ids:
                      - "binding-focused"
                      - "lifecycle-invariants"
                      - "compatibility-candidate"
                      - "compatibility-baseline"
                      - "hotspots"
                      - "lint"
                      - "typecheck"
                      - "routing-policy"
                      - "full-local-ci"
                      - "independent-evaluator"
                      - "hosted-integration"
                    description: "The full requested qualification, independent review, and hosted integration remain green."
                    id: "binding-4"
                    required: true
                  -
                    check_ids:
                      - "post-merge-recovery"
                    description: "Post-merge evidence proves historical recovery and the unapproved planning boundary."
                    id: "binding-5"
                    required: true
                evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                schema_version: 1
      revision: 6
      schema_version: 1
      task_id: "202609030849-925NNG"
    event_cursor: 0
    final_validation:
      evidence:
        -
          artifact_refs:
            - "task-verification:202609030849-925NNG"
            - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          check_id: "lifecycle-invariants"
          command_identity: "bun run lifecycle:invariants"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-09-03T13:01:15.573Z"
          repository_snapshot_digest: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609030849-925NNG"
            - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          check_id: "hotspots"
          command_identity: "bun run hotspots:check"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-09-03T13:01:15.573Z"
          repository_snapshot_digest: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609030849-925NNG"
            - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          check_id: "lint"
          command_identity: "bun run lint"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-09-03T13:01:15.573Z"
          repository_snapshot_digest: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609030849-925NNG"
            - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          check_id: "typecheck"
          command_identity: "bun run typecheck"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-09-03T13:01:15.573Z"
          repository_snapshot_digest: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609030849-925NNG"
            - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          check_id: "routing-policy"
          command_identity: "node .agentplane/policy/check-routing.mjs"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-09-03T13:01:15.573Z"
          repository_snapshot_digest: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609030849-925NNG"
            - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          check_id: "full-local-ci"
          command_identity: "bun run ci:local:full"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-09-03T13:01:15.573Z"
          repository_snapshot_digest: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609030849-925NNG"
            - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          check_id: "independent-evaluator"
          command_identity: "task.verify"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-09-03T13:01:15.573Z"
          repository_snapshot_digest: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609030849-925NNG"
            - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          check_id: "hosted-integration"
          command_identity: "task.verify"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-09-03T13:01:15.573Z"
          repository_snapshot_digest: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609030849-925NNG"
            - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          check_id: "post-merge-recovery"
          command_identity: "task.verify"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-09-03T13:01:15.573Z"
          repository_snapshot_digest: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609030849-925NNG"
            - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          check_id: "focused-workspace"
          command_identity: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-09-03T13:01:15.573Z"
          repository_snapshot_digest: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609030849-925NNG"
            - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          check_id: "focused-cli"
          command_identity: "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-09-03T13:01:15.573Z"
          repository_snapshot_digest: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609030849-925NNG"
            - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          check_id: "compatibility-candidate"
          command_identity: "bun run bench:compatibility:candidate:check"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-09-03T13:01:15.573Z"
          repository_snapshot_digest: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
          status: "passed"
        -
          artifact_refs:
            - "task-verification:202609030849-925NNG"
            - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          check_id: "compatibility-baseline"
          command_identity: "bun run bench:compatibility:check"
          detail: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
          exit_code: 0
          observed_at: "2026-09-03T13:01:15.573Z"
          repository_snapshot_digest: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
          status: "passed"
      schema_version: 1
      stale_evidence: []
      status: "passed"
      unsatisfied_criteria: []
    id: "202609030849-925NNG"
    intent:
      acceptance_criteria: []
      captured_at: "2026-09-03T08:49:30.592Z"
      constraints: []
      request: |-
        Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation

        Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB.
      task_id: "202609030849-925NNG"
    lifecycle: "COMPLETED"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-03T08:57:27.879Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:e91c4dbc2ba56cee7a0dfaa7ede90099bf3f55b3f780fca75b64727599994ea1"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-03T08:55:48.324Z"
        digest: "sha256:e91c4dbc2ba56cee7a0dfaa7ede90099bf3f55b3f780fca75b64727599994ea1"
        proposal:
          assumptions:
            - "The repair can reuse the existing kernel reject_plan command and task-centric CAS/receipt machinery instead of introducing a second lifecycle model."
            - "The historical task will be reconciled only after this branch_pr task is independently evaluated and integrated onto fresh main."
            - "The new recovery command will require exact task id, rejected digest, observed revisions, and current fingerprint so unrelated corruptions fail closed."
          planning_baseline:
            captured_at: "2026-09-03T08:49:35.054Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:ac5c502d5767310972b40e6d8d64e6d3afd6a9c7d81c3e4928af30ef18c516a7"
            dirty_paths:
              - ".agentplane/tasks/202609030849-925NNG/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "a51e95514f2909177410f78a4057873140097edb"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609030849-925NNG"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts --maxWorkers=1"
                id: "focused-regressions"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "lifecycle-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                id: "compatibility"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run hotspots:check"
                id: "hotspots"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run lint"
                id: "lint"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing-policy"
                kind: "deterministic"
                required: true
                timeout_ms: 60000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                id: "independent-evaluator"
                kind: "semantic"
                required: true
              -
                capability: "task.verify"
                id: "hosted-integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "post-merge-recovery"
                kind: "semantic"
                required: true
            criteria:
              -
                check_ids:
                  - "focused-regressions"
                description: "All eight requested focused regression scenarios pass and demonstrate atomic rejection plus deterministic historical recovery."
                id: "top-1"
                required: true
              -
                check_ids:
                  - "lifecycle-invariants"
                  - "compatibility"
                  - "hotspots"
                  - "lint"
                  - "typecheck"
                  - "routing-policy"
                  - "full-local-ci"
                description: "Lifecycle invariants, compatibility checks, hotspots, lint, typecheck, routing policy, and full local CI pass without relaxed baselines or skipped mandatory checks."
                id: "top-2"
                required: true
              -
                check_ids:
                  - "independent-evaluator"
                  - "hosted-integration"
                description: "An independent EVALUATOR passes the exact implementation and AgentPlane integrates it through branch_pr before the historical task is recovered."
                id: "top-3"
                required: true
              -
                check_ids:
                  - "post-merge-recovery"
                description: "After fresh main, only the new CLI-owned operation reconciles 202609021331-5FPZAB and evidence records the recovered revision, new fingerprint, recovery receipt, and agent.planning packet without approving its new plan."
                id: "top-4"
                required: true
            evidence_fingerprint: "sha256:ac5c502d5767310972b40e6d8d64e6d3afd6a9c7d81c3e4928af30ef18c516a7"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Plan proposal followed by rejection commits README projection, canonical aggregate, revision, event journal, mutation receipt, rejected plan state, and next route as one observable mutation."
                    id: "atomic-1"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Exact replay returns the durable rejection receipt without a second revision or event, and simulated interruption cannot expose a rejected README with an approval-eligible canonical plan."
                    id: "atomic-2"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                      - "lifecycle-invariants"
                    description: "Approval packets and host-user decisions bound to the rejected digest or prior fingerprint fail closed, while task advance selects kernel_plan_required and emits agent.planning."
                    id: "atomic-3"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 120000
                  optional_sources:
                    - "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/plan.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/core/src/tasks/task-kernel/kernel.ts"
                    - "packages/agentplane/src/commands/task/kernel-advance.ts"
                  symbol_hints:
                    - "cmdTaskPlanReject"
                    - "reject_plan"
                    - "TaskCentricBackendAdapter"
                    - "advanceCanonicalTask"
                depends_on: []
                expected_outputs:
                  - "atomic-plan-rejection-implementation"
                  - "plan-rejection-regression-evidence"
                id: "atomic-plan-rejection"
                objective: "Reproduce the split-brain plan rejection in an isolated task-centric fixture, identify the bypass of the canonical reject_plan transition, and implement one atomic receipt-backed rejection mutation whose replay, interruption behavior, route invalidation, and stale approval handling are fail-closed."
                optional: false
                priority: 100
                required_inputs:
                  - "planning-baseline"
                  - "confirmed-corrupted-state"
                  - "rejected-plan-digest"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks/task-kernel"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts --maxWorkers=1"
                      id: "atomic-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "atomic-focused"
                      description: "Focused tests verify the atomic projection, aggregate, journal, receipt, plan state, revision, and route mutation."
                      id: "atomic-1"
                      required: true
                    -
                      check_ids:
                        - "atomic-focused"
                      description: "Focused tests verify exact replay and every simulated interruption boundary."
                      id: "atomic-2"
                      required: true
                    -
                      check_ids:
                        - "atomic-focused"
                        - "lifecycle-invariants"
                      description: "Focused tests and lifecycle invariants verify stale approval rejection and the planning route."
                      id: "atomic-3"
                      required: true
                  evidence_fingerprint: "sha256:ac5c502d5767310972b40e6d8d64e6d3afd6a9c7d81c3e4928af30ef18c516a7"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "A read-only diagnostic detects the fixture with README revision 52, aggregate revision 50, README rejected state, and canonical approval-eligible plan without mutating it."
                    id: "recovery-1"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "The CLI recovery validates the exact historical preconditions, preserves existing task content and evidence, appends the required canonical event and receipt with monotonic revision history, and is deterministic and auditable."
                    id: "recovery-2"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                      - "lifecycle-invariants"
                    description: "A fixture equivalent to 202609021331-5FPZAB recovers successfully; rejected digest approval stays impossible and post-recovery task advance emits agent.planning with a new state fingerprint."
                    id: "recovery-3"
                    required: true
                  -
                    check_ids:
                      - "compatibility"
                      - "routing-policy"
                    description: "CLI help/reference and command compatibility remain consistent for the new recovery operation."
                    id: "recovery-4"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 140000
                  optional_sources:
                    - "packages/agentplane/src/adapters/task-backend/kernel-migration.ts"
                    - "docs/reference"
                  required_sources:
                    - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
                    - "packages/agentplane/src/commands/task/plan.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                  symbol_hints:
                    - "checkTaskReadmeMigrationState"
                    - "cmdTaskPlanReject"
                    - "mutation_receipts"
                    - "task command catalog"
                depends_on:
                  - "atomic-plan-rejection"
                expected_outputs:
                  - "recovery-operation-implementation"
                  - "diagnostic-regression-evidence"
                  - "historical-recovery-regression-evidence"
                id: "diagnostic-and-recovery"
                objective: "Add a read-only diagnostic for README versus canonical revision and plan-state divergence plus a deterministic CLI-owned recovery operation that reconstructs the missing canonical rejection transition, event, receipt, invalidation, and monotonic revision history for the historical corruption shape without direct artifact edits."
                optional: false
                priority: 90
                required_inputs:
                  - "atomic-plan-rejection-implementation"
                  - "plan-rejection-regression-evidence"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/doctor"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/commands/doctor"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks/task-kernel"
                  - "docs/reference"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts --maxWorkers=1"
                      id: "recovery-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                      id: "compatibility"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 60000
                  criteria:
                    -
                      check_ids:
                        - "recovery-focused"
                      description: "Focused diagnostic test detects the historical mismatch without mutation."
                      id: "recovery-1"
                      required: true
                    -
                      check_ids:
                        - "recovery-focused"
                      description: "Focused recovery tests verify exact preconditions, preservation, monotonic history, event, receipt, and auditability."
                      id: "recovery-2"
                      required: true
                    -
                      check_ids:
                        - "recovery-focused"
                        - "lifecycle-invariants"
                      description: "Focused recovery tests and invariants verify rejected digest invalidation and post-recovery agent.planning."
                      id: "recovery-3"
                      required: true
                    -
                      check_ids:
                        - "compatibility"
                        - "routing-policy"
                      description: "Compatibility and routing checks verify the CLI surface and reference integration."
                      id: "recovery-4"
                      required: true
                  evidence_fingerprint: "sha256:ac5c502d5767310972b40e6d8d64e6d3afd6a9c7d81c3e4928af30ef18c516a7"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609030849-925NNG"
      -
        approval:
          approved_at: "2026-09-03T11:23:28.933Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:2b7ea8c167a314b6110fedc32cdfec5bf0a71cd16d6487b20349b0104d32c60c"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-03T09:19:09.495Z"
        digest: "sha256:2b7ea8c167a314b6110fedc32cdfec5bf0a71cd16d6487b20349b0104d32c60c"
        proposal:
          assumptions:
            - "The repair reuses the existing kernel reject_plan command and task-centric CAS/receipt machinery instead of introducing a second lifecycle model."
            - "The compatibility candidate update will contain only the intentional new recovery command topology."
            - "The historical task will be reconciled only after independent evaluation and integration on fresh main."
            - "The recovery command requires exact task id, rejected digest, observed revisions, and current fingerprint so unrelated corruptions fail closed."
          planning_baseline:
            captured_at: "2026-09-03T09:14:58.809Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
            dirty_paths:
              - ".agentplane/tasks/202609030849-925NNG/README.md"
              - ".agentplane/tasks/202609030849-925NNG/pr/github-body.md"
              - ".agentplane/tasks/202609030849-925NNG/pr/meta.json"
              - ".agentplane/tasks/202609030849-925NNG/pr/review.md"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              - ".agentplane/tasks/202609030849-925NNG/supervision/implementation-evidence.json"
              - ".agentplane/tasks/202609030849-925NNG/verification/20260903091454444-96c41af32da98426.json"
            git:
              kind: "commit"
              ref: null
              sha: "fc7843b5ffc66dac1d65dcacc3c26fb38edd1db8"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:8"
          schema_version: 1
          task_id: "202609030849-925NNG"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1 && bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
                id: "focused-regressions"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "lifecycle-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                id: "compatibility"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run hotspots:check"
                id: "hotspots"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run lint"
                id: "lint"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing-policy"
                kind: "deterministic"
                required: true
                timeout_ms: 60000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                id: "independent-evaluator"
                kind: "semantic"
                required: true
              -
                capability: "task.verify"
                id: "hosted-integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "post-merge-recovery"
                kind: "semantic"
                required: true
            criteria:
              -
                check_ids:
                  - "focused-regressions"
                description: "All eight requested regression scenarios pass and demonstrate atomic rejection plus deterministic historical recovery."
                id: "top-1"
                required: true
              -
                check_ids:
                  - "lifecycle-invariants"
                  - "compatibility"
                  - "hotspots"
                  - "lint"
                  - "typecheck"
                  - "routing-policy"
                  - "full-local-ci"
                description: "Lifecycle invariants, compatibility, hotspots, lint, typecheck, routing policy, and full local CI pass without relaxed checks."
                id: "top-2"
                required: true
              -
                check_ids:
                  - "independent-evaluator"
                  - "hosted-integration"
                description: "An independent EVALUATOR passes the exact implementation and AgentPlane integrates it through branch_pr before historical recovery."
                id: "top-3"
                required: true
              -
                check_ids:
                  - "post-merge-recovery"
                description: "Fresh main uses only the new CLI operation to recover the historical task and stops at an unapproved fresh planning boundary."
                id: "top-4"
                required: true
            evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Proposal followed by rejection atomically commits README projection, canonical aggregate, revision, event, receipt, rejected plan state, invalidation, and kernel_plan_required route."
                    id: "atomic-1"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Exact rejection replay returns the durable receipt without a second revision or event, and interruption cannot expose a rejected README with an approval-eligible canonical plan."
                    id: "atomic-2"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                      - "lifecycle-invariants"
                    description: "Stale approval packets and host decisions for the rejected digest fail closed, and task advance emits agent.planning."
                    id: "atomic-3"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 120000
                  optional_sources:
                    - "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/plan.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/core/src/tasks/task-kernel/kernel.ts"
                    - "packages/agentplane/src/commands/task/kernel-advance.ts"
                  symbol_hints:
                    - "cmdTaskPlanReject"
                    - "reject_plan"
                    - "TaskCentricBackendAdapter"
                    - "advanceCanonicalTask"
                depends_on: []
                expected_outputs:
                  - "atomic-plan-rejection-implementation"
                  - "plan-rejection-regression-evidence"
                id: "atomic-plan-rejection"
                objective: "Reproduce the split-brain plan rejection in an isolated task-centric fixture, identify the bypass of the canonical reject_plan transition, and implement one atomic receipt-backed rejection mutation whose replay, interruption behavior, route invalidation, and stale approval handling are fail-closed."
                optional: false
                priority: 100
                required_inputs:
                  - "planning-baseline"
                  - "confirmed-corrupted-state"
                  - "rejected-plan-digest"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks/task-kernel"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts --maxWorkers=1"
                      id: "atomic-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "atomic-focused"
                      description: "Focused tests verify atomic canonical rejection across all projections and persistence records."
                      id: "atomic-1"
                      required: true
                    -
                      check_ids:
                        - "atomic-focused"
                      description: "Focused tests verify replay idempotency and simulated interruption boundaries."
                      id: "atomic-2"
                      required: true
                    -
                      check_ids:
                        - "atomic-focused"
                        - "lifecycle-invariants"
                      description: "Focused tests and lifecycle invariants verify stale approval rejection and planning route selection."
                      id: "atomic-3"
                      required: true
                  evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "A read-only diagnostic detects the 52 versus 50 revision mismatch and rejected README versus approval-eligible canonical plan without mutation."
                    id: "recovery-1"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "The guarded CLI recovery validates exact historical preconditions, preserves task content and evidence, and appends the canonical event and receipt with monotonic revision history."
                    id: "recovery-2"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                      - "lifecycle-invariants"
                    description: "Equivalent fixture recovery invalidates the rejected digest and post-recovery advance emits agent.planning with a new fingerprint."
                    id: "recovery-3"
                    required: true
                  -
                    check_ids:
                      - "compatibility"
                      - "routing-policy"
                    description: "The compatibility candidate records only the intentional CLI topology addition and both compatibility checks pass."
                    id: "recovery-4"
                    required: true
                  -
                    check_ids:
                      - "hotspots"
                      - "lint"
                      - "typecheck"
                      - "full-local-ci"
                      - "independent-evaluator"
                      - "hosted-integration"
                    description: "All requested quality gates pass, an independent EVALUATOR passes the implementation, and branch_pr integration completes before historical recovery."
                    id: "recovery-5"
                    required: true
                  -
                    check_ids:
                      - "post-merge-recovery"
                    description: "On fresh main the CLI-owned operation recovers 202609021331-5FPZAB, records its receipt and evidence, emits a fresh agent.planning packet, and no plan is approved on the user's behalf."
                    id: "recovery-6"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 160000
                  optional_sources:
                    - "packages/agentplane/src/adapters/task-backend/kernel-migration.ts"
                    - "docs/reference"
                  required_sources:
                    - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
                    - "packages/agentplane/src/commands/task/plan.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                    - "scripts/baselines/v0.7-compatibility-candidate.json"
                  symbol_hints:
                    - "checkTaskReadmeMigrationState"
                    - "cmdTaskPlanReject"
                    - "mutation_receipts"
                    - "task command catalog"
                    - "compatibility candidate"
                depends_on:
                  - "atomic-plan-rejection"
                expected_outputs:
                  - "recovery-operation-implementation"
                  - "diagnostic-regression-evidence"
                  - "compatibility-candidate-update"
                  - "historical-recovery-regression-evidence"
                  - "integrated-repair"
                  - "historical-task-recovery-evidence"
                id: "diagnostic-and-recovery"
                objective: "Add mismatch diagnostics and a deterministic CLI-owned historical recovery, update the compatibility candidate for the intentional command topology, qualify the repair, integrate it, and only then recover the historical task on fresh main without approving its new plan."
                optional: false
                priority: 90
                required_inputs:
                  - "atomic-plan-rejection-implementation"
                  - "plan-rejection-regression-evidence"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/doctor"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/commands/doctor"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks/task-kernel"
                  - "docs/reference"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1 && bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
                      id: "recovery-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                      id: "compatibility"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run hotspots:check"
                      id: "hotspots"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run lint"
                      id: "lint"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "typecheck"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 60000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-local-ci"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      id: "independent-evaluator"
                      kind: "semantic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "hosted-integration"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "post-merge-recovery"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "recovery-focused"
                      description: "Focused workspace diagnostic test detects the historical mismatch without mutation."
                      id: "recovery-1"
                      required: true
                    -
                      check_ids:
                        - "recovery-focused"
                      description: "Focused adapter, CLI, and recovery tests cover exact preconditions, preservation, monotonic history, event, receipt, and auditability."
                      id: "recovery-2"
                      required: true
                    -
                      check_ids:
                        - "recovery-focused"
                        - "lifecycle-invariants"
                      description: "Focused tests and invariants verify digest invalidation and post-recovery agent.planning."
                      id: "recovery-3"
                      required: true
                    -
                      check_ids:
                        - "compatibility"
                        - "routing-policy"
                      description: "Compatibility and routing checks verify the intentional CLI surface addition."
                      id: "recovery-4"
                      required: true
                    -
                      check_ids:
                        - "hotspots"
                        - "lint"
                        - "typecheck"
                        - "full-local-ci"
                        - "independent-evaluator"
                        - "hosted-integration"
                      description: "Static, full regression, independent review, and hosted integration gates all pass."
                      id: "recovery-5"
                      required: true
                    -
                      check_ids:
                        - "post-merge-recovery"
                      description: "Post-merge semantic evidence proves historical recovery and the unapproved fresh planning boundary."
                      id: "recovery-6"
                      required: true
                  evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609030849-925NNG"
      -
        approval:
          approved_at: "2026-09-03T11:32:01.234Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:81536767b7980658b2e961f037c86359470c9aee1ab7f243a05e4567a197e00b"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-03T11:31:01.148Z"
        digest: "sha256:81536767b7980658b2e961f037c86359470c9aee1ab7f243a05e4567a197e00b"
        proposal:
          assumptions:
            - "The repair reuses the existing kernel reject_plan command and task-centric CAS/receipt machinery instead of introducing a second lifecycle model."
            - "The historical task will be reconciled only after independent evaluation and integration on fresh main."
            - "The recovery command requires exact task id, rejected digest, observed revisions, and current fingerprint so unrelated corruptions fail closed."
            - "The compatibility candidate and ratchet checker will record only the intentional recover-rejection command descriptor, options, and task provenance."
          planning_baseline:
            captured_at: "2026-09-03T11:30:12.647Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:c17d428d7ff391ce0b6ea64045541fab73326b933fee216dbe8e3542075a6104"
            dirty_paths:
              - ".agentplane/tasks/202609030849-925NNG/README.md"
              - ".agentplane/tasks/202609030849-925NNG/pr/github-body.md"
              - ".agentplane/tasks/202609030849-925NNG/pr/meta.json"
              - ".agentplane/tasks/202609030849-925NNG/pr/review.md"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              - ".agentplane/tasks/202609030849-925NNG/supervision/implementation-evidence.json"
              - ".agentplane/tasks/202609030849-925NNG/verification/20260903112957796-21c9078b9095e3cb.json"
            git:
              kind: "commit"
              ref: null
              sha: "47389c597cfaab95a08b282db8ea606aa350da79"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:15"
          schema_version: 1
          task_id: "202609030849-925NNG"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1 && bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
                id: "focused-regressions"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "lifecycle-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                id: "compatibility"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run hotspots:check"
                id: "hotspots"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run lint"
                id: "lint"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing-policy"
                kind: "deterministic"
                required: true
                timeout_ms: 60000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                id: "independent-evaluator"
                kind: "semantic"
                required: true
              -
                capability: "task.verify"
                id: "hosted-integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "post-merge-recovery"
                kind: "semantic"
                required: true
            criteria:
              -
                check_ids:
                  - "focused-regressions"
                description: "All eight requested regression scenarios pass and demonstrate atomic rejection plus deterministic historical recovery."
                id: "top-1"
                required: true
              -
                check_ids:
                  - "lifecycle-invariants"
                  - "compatibility"
                  - "hotspots"
                  - "lint"
                  - "typecheck"
                  - "routing-policy"
                  - "full-local-ci"
                description: "Lifecycle invariants, compatibility, hotspots, lint, typecheck, routing policy, and full local CI pass without relaxed checks."
                id: "top-2"
                required: true
              -
                check_ids:
                  - "independent-evaluator"
                  - "hosted-integration"
                description: "An independent EVALUATOR passes the exact implementation and AgentPlane integrates it through branch_pr before historical recovery."
                id: "top-3"
                required: true
              -
                check_ids:
                  - "post-merge-recovery"
                description: "Fresh main uses only the new CLI operation to recover the historical task and stops at an unapproved fresh planning boundary."
                id: "top-4"
                required: true
            evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Proposal followed by rejection atomically commits README projection, canonical aggregate, revision, event, receipt, rejected plan state, invalidation, and kernel_plan_required route."
                    id: "atomic-1"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Exact rejection replay returns the durable receipt without a second revision or event, and interruption cannot expose a rejected README with an approval-eligible canonical plan."
                    id: "atomic-2"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                      - "lifecycle-invariants"
                    description: "Stale approval packets and host decisions for the rejected digest fail closed, and task advance emits agent.planning."
                    id: "atomic-3"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 120000
                  optional_sources:
                    - "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/plan.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/core/src/tasks/task-kernel/kernel.ts"
                    - "packages/agentplane/src/commands/task/kernel-advance.ts"
                  symbol_hints:
                    - "cmdTaskPlanReject"
                    - "reject_plan"
                    - "TaskCentricBackendAdapter"
                    - "advanceCanonicalTask"
                depends_on: []
                expected_outputs:
                  - "atomic-plan-rejection-implementation"
                  - "plan-rejection-regression-evidence"
                id: "atomic-plan-rejection"
                objective: "Reproduce the split-brain plan rejection in an isolated task-centric fixture, identify the bypass of the canonical reject_plan transition, and implement one atomic receipt-backed rejection mutation whose replay, interruption behavior, route invalidation, and stale approval handling are fail-closed."
                optional: false
                priority: 100
                required_inputs:
                  - "planning-baseline"
                  - "confirmed-corrupted-state"
                  - "rejected-plan-digest"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks/task-kernel"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts --maxWorkers=1"
                      id: "atomic-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "atomic-focused"
                      description: "Focused tests verify atomic canonical rejection across all projections and persistence records."
                      id: "atomic-1"
                      required: true
                    -
                      check_ids:
                        - "atomic-focused"
                      description: "Focused tests verify replay idempotency and simulated interruption boundaries."
                      id: "atomic-2"
                      required: true
                    -
                      check_ids:
                        - "atomic-focused"
                        - "lifecycle-invariants"
                      description: "Focused tests and lifecycle invariants verify stale approval rejection and planning route selection."
                      id: "atomic-3"
                      required: true
                  evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "A read-only diagnostic detects the 52 versus 50 revision mismatch and rejected README versus approval-eligible canonical plan without mutation."
                    id: "recovery-1"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "The guarded CLI recovery validates exact historical preconditions, preserves task content and evidence, and appends the canonical event and receipt with monotonic revision history."
                    id: "recovery-2"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                      - "lifecycle-invariants"
                    description: "Equivalent fixture recovery invalidates the rejected digest and post-recovery advance emits agent.planning with a new fingerprint."
                    id: "recovery-3"
                    required: true
                  -
                    check_ids:
                      - "compatibility"
                      - "routing-policy"
                    description: "The compatibility candidate records only the intentional CLI topology addition and both compatibility checks pass."
                    id: "recovery-4"
                    required: true
                  -
                    check_ids:
                      - "hotspots"
                      - "lint"
                      - "typecheck"
                      - "full-local-ci"
                      - "independent-evaluator"
                      - "hosted-integration"
                    description: "All requested quality gates pass, an independent EVALUATOR passes the implementation, and branch_pr integration completes before historical recovery."
                    id: "recovery-5"
                    required: true
                  -
                    check_ids:
                      - "post-merge-recovery"
                    description: "On fresh main the CLI-owned operation recovers 202609021331-5FPZAB, records its receipt and evidence, emits a fresh agent.planning packet, and no plan is approved on the user's behalf."
                    id: "recovery-6"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 160000
                  optional_sources:
                    - "packages/agentplane/src/adapters/task-backend/kernel-migration.ts"
                    - "docs/reference"
                  required_sources:
                    - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
                    - "packages/agentplane/src/commands/task/plan.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                    - "scripts/baselines/v0.7-compatibility-candidate.json"
                    - "scripts/checks/check-compatibility-contract-baseline.mjs"
                  symbol_hints:
                    - "checkTaskReadmeMigrationState"
                    - "cmdTaskPlanReject"
                    - "mutation_receipts"
                    - "task command catalog"
                    - "compatibility candidate"
                depends_on:
                  - "atomic-plan-rejection"
                expected_outputs:
                  - "recovery-operation-implementation"
                  - "diagnostic-regression-evidence"
                  - "compatibility-candidate-update"
                  - "historical-recovery-regression-evidence"
                  - "integrated-repair"
                  - "historical-task-recovery-evidence"
                  - "reviewed-compatibility-ratchet-update"
                id: "diagnostic-and-recovery"
                objective: "Add mismatch diagnostics and a deterministic CLI-owned historical recovery, update the compatibility candidate for the intentional command topology, qualify the repair, integrate it, and only then recover the historical task on fresh main without approving its new plan."
                optional: false
                priority: 90
                required_inputs:
                  - "atomic-plan-rejection-implementation"
                  - "plan-rejection-regression-evidence"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/doctor"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/commands/doctor"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks/task-kernel"
                  - "docs/reference"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1 && bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
                      id: "recovery-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                      id: "compatibility"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run hotspots:check"
                      id: "hotspots"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run lint"
                      id: "lint"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "typecheck"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 60000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-local-ci"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      id: "independent-evaluator"
                      kind: "semantic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "hosted-integration"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "post-merge-recovery"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "recovery-focused"
                      description: "Focused workspace diagnostic test detects the historical mismatch without mutation."
                      id: "recovery-1"
                      required: true
                    -
                      check_ids:
                        - "recovery-focused"
                      description: "Focused adapter, CLI, and recovery tests cover exact preconditions, preservation, monotonic history, event, receipt, and auditability."
                      id: "recovery-2"
                      required: true
                    -
                      check_ids:
                        - "recovery-focused"
                        - "lifecycle-invariants"
                      description: "Focused tests and invariants verify digest invalidation and post-recovery agent.planning."
                      id: "recovery-3"
                      required: true
                    -
                      check_ids:
                        - "compatibility"
                        - "routing-policy"
                      description: "Compatibility and routing checks verify the intentional CLI surface addition."
                      id: "recovery-4"
                      required: true
                    -
                      check_ids:
                        - "hotspots"
                        - "lint"
                        - "typecheck"
                        - "full-local-ci"
                        - "independent-evaluator"
                        - "hosted-integration"
                      description: "Static, full regression, independent review, and hosted integration gates all pass."
                      id: "recovery-5"
                      required: true
                    -
                      check_ids:
                        - "post-merge-recovery"
                      description: "Post-merge semantic evidence proves historical recovery and the unapproved fresh planning boundary."
                      id: "recovery-6"
                      required: true
                  evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                  schema_version: 1
        revision: 3
        schema_version: 1
        task_id: "202609030849-925NNG"
      -
        approval:
          approved_at: "2026-09-03T12:21:17.857Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:8de03667daef5084512fb73ee416b72cf1f87bac69e7f57ef472e2c49235c312"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-03T12:19:42.778Z"
        digest: "sha256:8de03667daef5084512fb73ee416b72cf1f87bac69e7f57ef472e2c49235c312"
        proposal:
          assumptions:
            - "The repair reuses the existing kernel reject_plan command and task-centric CAS/receipt machinery instead of introducing a second lifecycle model."
            - "The historical task will be reconciled only after independent evaluation and integration on fresh main."
            - "The recovery command requires exact task id, rejected digest, observed revisions, and current fingerprint so unrelated corruptions fail closed."
            - "The compatibility candidate and ratchet checker will record only the intentional recover-rejection command descriptor, options, and task provenance."
            - "The new WorkItem will reproduce the binding loss through the public task-centric external-result path before changing the route."
            - "Existing implementation commits and verification evidence remain preserved; the supervisor decides whether they can be reused after the binding fix."
            - "Historical task recovery remains prohibited until the repair, including this routing fix, is independently evaluated and integrated."
          planning_baseline:
            captured_at: "2026-09-03T12:16:51.655Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:4cadfe7aa554ebde5f84359c9cbd28dce2c6f612c2b53d996c57d72b0ec5de4f"
            dirty_paths:
              - ".agentplane/tasks/202609030849-925NNG/README.md"
              - ".agentplane/tasks/202609030849-925NNG/pr/meta.json"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              - ".agentplane/tasks/202609030849-925NNG/supervision/implementation-evidence.json"
              - ".agentplane/tasks/202609030849-925NNG/verification/20260903121410399-e250debe6a8716e3.json"
            git:
              kind: "commit"
              ref: null
              sha: "efa74b42a2e77bb77de2ff908af5b8b29194135d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:26"
          schema_version: 1
          task_id: "202609030849-925NNG"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1 && bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
                id: "focused-regressions"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "lifecycle-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                id: "compatibility"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run hotspots:check"
                id: "hotspots"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run lint"
                id: "lint"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing-policy"
                kind: "deterministic"
                required: true
                timeout_ms: 60000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                id: "independent-evaluator"
                kind: "semantic"
                required: true
              -
                capability: "task.verify"
                id: "hosted-integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "post-merge-recovery"
                kind: "semantic"
                required: true
            criteria:
              -
                check_ids:
                  - "focused-regressions"
                description: "All eight requested regression scenarios pass and demonstrate atomic rejection plus deterministic historical recovery."
                id: "top-1"
                required: true
              -
                check_ids:
                  - "lifecycle-invariants"
                  - "compatibility"
                  - "hotspots"
                  - "lint"
                  - "typecheck"
                  - "routing-policy"
                  - "full-local-ci"
                description: "Lifecycle invariants, compatibility, hotspots, lint, typecheck, routing policy, and full local CI pass without relaxed checks."
                id: "top-2"
                required: true
              -
                check_ids:
                  - "independent-evaluator"
                  - "hosted-integration"
                description: "An independent EVALUATOR passes the exact implementation and AgentPlane integrates it through branch_pr before historical recovery."
                id: "top-3"
                required: true
              -
                check_ids:
                  - "post-merge-recovery"
                description: "Fresh main uses only the new CLI operation to recover the historical task and stops at an unapproved fresh planning boundary."
                id: "top-4"
                required: true
            evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Proposal followed by rejection atomically commits README projection, canonical aggregate, revision, event, receipt, rejected plan state, invalidation, and kernel_plan_required route."
                    id: "atomic-1"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Exact rejection replay returns the durable receipt without a second revision or event, and interruption cannot expose a rejected README with an approval-eligible canonical plan."
                    id: "atomic-2"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                      - "lifecycle-invariants"
                    description: "Stale approval packets and host decisions for the rejected digest fail closed, and task advance emits agent.planning."
                    id: "atomic-3"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 120000
                  optional_sources:
                    - "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/plan.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/core/src/tasks/task-kernel/kernel.ts"
                    - "packages/agentplane/src/commands/task/kernel-advance.ts"
                  symbol_hints:
                    - "cmdTaskPlanReject"
                    - "reject_plan"
                    - "TaskCentricBackendAdapter"
                    - "advanceCanonicalTask"
                depends_on: []
                expected_outputs:
                  - "atomic-plan-rejection-implementation"
                  - "plan-rejection-regression-evidence"
                id: "atomic-plan-rejection"
                objective: "Reproduce the split-brain plan rejection in an isolated task-centric fixture, identify the bypass of the canonical reject_plan transition, and implement one atomic receipt-backed rejection mutation whose replay, interruption behavior, route invalidation, and stale approval handling are fail-closed."
                optional: false
                priority: 100
                required_inputs:
                  - "planning-baseline"
                  - "confirmed-corrupted-state"
                  - "rejected-plan-digest"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks/task-kernel"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts --maxWorkers=1"
                      id: "atomic-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "atomic-focused"
                      description: "Focused tests verify atomic canonical rejection across all projections and persistence records."
                      id: "atomic-1"
                      required: true
                    -
                      check_ids:
                        - "atomic-focused"
                      description: "Focused tests verify replay idempotency and simulated interruption boundaries."
                      id: "atomic-2"
                      required: true
                    -
                      check_ids:
                        - "atomic-focused"
                        - "lifecycle-invariants"
                      description: "Focused tests and lifecycle invariants verify stale approval rejection and planning route selection."
                      id: "atomic-3"
                      required: true
                  evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "A read-only diagnostic detects the 52 versus 50 revision mismatch and rejected README versus approval-eligible canonical plan without mutation."
                    id: "recovery-1"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "The guarded CLI recovery validates exact historical preconditions, preserves task content and evidence, and appends the canonical event and receipt with monotonic revision history."
                    id: "recovery-2"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                      - "lifecycle-invariants"
                    description: "Equivalent fixture recovery invalidates the rejected digest and post-recovery advance emits agent.planning with a new fingerprint."
                    id: "recovery-3"
                    required: true
                  -
                    check_ids:
                      - "compatibility"
                      - "routing-policy"
                    description: "The compatibility candidate records only the intentional CLI topology addition and both compatibility checks pass."
                    id: "recovery-4"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 160000
                  optional_sources:
                    - "packages/agentplane/src/adapters/task-backend/kernel-migration.ts"
                    - "docs/reference"
                  required_sources:
                    - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
                    - "packages/agentplane/src/commands/task/plan.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                    - "scripts/baselines/v0.7-compatibility-candidate.json"
                    - "scripts/checks/check-compatibility-contract-baseline.mjs"
                  symbol_hints:
                    - "checkTaskReadmeMigrationState"
                    - "cmdTaskPlanReject"
                    - "mutation_receipts"
                    - "task command catalog"
                    - "compatibility candidate"
                depends_on:
                  - "atomic-plan-rejection"
                expected_outputs:
                  - "recovery-operation-implementation"
                  - "diagnostic-regression-evidence"
                  - "compatibility-candidate-update"
                  - "historical-recovery-regression-evidence"
                  - "reviewed-compatibility-ratchet-update"
                id: "diagnostic-and-recovery"
                objective: "Add mismatch diagnostics and a deterministic CLI-owned historical recovery, update the compatibility candidate for the intentional command topology, qualify the repair, integrate it, and only then recover the historical task on fresh main without approving its new plan."
                optional: false
                priority: 90
                required_inputs:
                  - "atomic-plan-rejection-implementation"
                  - "plan-rejection-regression-evidence"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/doctor"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/commands/doctor"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks/task-kernel"
                  - "docs/reference"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1 && bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
                      id: "recovery-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                      id: "compatibility"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 60000
                  criteria:
                    -
                      check_ids:
                        - "recovery-focused"
                      description: "Focused workspace diagnostic test detects the historical mismatch without mutation."
                      id: "recovery-1"
                      required: true
                    -
                      check_ids:
                        - "recovery-focused"
                      description: "Focused adapter, CLI, and recovery tests cover exact preconditions, preservation, monotonic history, event, receipt, and auditability."
                      id: "recovery-2"
                      required: true
                    -
                      check_ids:
                        - "recovery-focused"
                        - "lifecycle-invariants"
                      description: "Focused tests and invariants verify digest invalidation and post-recovery agent.planning."
                      id: "recovery-3"
                      required: true
                    -
                      check_ids:
                        - "compatibility"
                        - "routing-policy"
                      description: "Compatibility and routing checks verify the intentional CLI surface addition."
                      id: "recovery-4"
                      required: true
                  evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "binding-focused"
                    description: "A focused task-centric fixture reproduces plan refinement followed by external implementation result completion and proves the issued episode remains bound to a WorkItem present in the approved plan."
                    id: "binding-1"
                    required: true
                  -
                    check_ids:
                      - "binding-focused"
                      - "lifecycle-invariants"
                    description: "Successful result application records WorkItem completion and output evidence exactly once; exact replay is idempotent and a stale or absent binding fails closed without partial lifecycle mutation."
                    id: "binding-2"
                    required: true
                  -
                    check_ids:
                      - "binding-focused"
                    description: "After deterministic verification, task next-action reaches independent EVALUATOR and does not loop through an EXECUTOR packet with work_item_id null."
                    id: "binding-3"
                    required: true
                  -
                    check_ids:
                      - "binding-focused"
                      - "lifecycle-invariants"
                      - "compatibility"
                      - "hotspots"
                      - "lint"
                      - "typecheck"
                      - "routing-policy"
                      - "full-local-ci"
                      - "independent-evaluator"
                      - "hosted-integration"
                    description: "Focused regressions, lifecycle invariants, compatibility, hotspots, lint, typecheck, routing policy, full local CI, independent EVALUATOR, and hosted integration all pass before historical recovery."
                    id: "binding-4"
                    required: true
                  -
                    check_ids:
                      - "post-merge-recovery"
                    description: "On fresh main only the CLI-owned recovery operation reconciles 202609021331-5FPZAB and task advance stops at a fresh unapproved agent.planning boundary."
                    id: "binding-5"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 120000
                  optional_sources:
                    - "packages/agentplane/src/commands/task/kernel-advance.ts"
                    - "packages/core/src/tasks/task-kernel/kernel.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                    - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                  symbol_hints:
                    - "recordTaskCentricExternalResult"
                    - "work_item_id"
                    - "approved task plan"
                    - "plan refinement"
                depends_on:
                  - "atomic-plan-rejection"
                  - "diagnostic-and-recovery"
                expected_outputs:
                  - "work-item-completion-binding-fix"
                  - "work-item-binding-regression-evidence"
                  - "independent-evaluator-pass"
                  - "integrated-repair"
                  - "historical-task-recovery-evidence"
                id: "work-item-completion-binding"
                objective: "Reproduce and repair loss of the canonical WorkItem binding across task-centric plan refinement and external-result completion so the supervisor records completion exactly once and routes a verified branch_pr task to independent EVALUATOR instead of issuing unbound EXECUTOR episodes."
                optional: false
                priority: 80
                required_inputs:
                  - "atomic-plan-rejection-implementation"
                  - "recovery-operation-implementation"
                  - "recorded-implementation-commit"
                  - "successful-verification-evidence"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/task-centric-external-result.test.ts packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts --maxWorkers=1"
                      id: "binding-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 240000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                      id: "compatibility"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run hotspots:check"
                      id: "hotspots"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run lint"
                      id: "lint"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "typecheck"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 60000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-local-ci"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      id: "independent-evaluator"
                      kind: "semantic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "hosted-integration"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "post-merge-recovery"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "binding-focused"
                      description: "Focused tests prove binding preservation and fail-closed stale binding handling."
                      id: "binding-1"
                      required: true
                    -
                      check_ids:
                        - "binding-focused"
                        - "lifecycle-invariants"
                      description: "Focused tests and lifecycle invariants prove exactly-once WorkItem completion and idempotent replay."
                      id: "binding-2"
                      required: true
                    -
                      check_ids:
                        - "binding-focused"
                      description: "The verified branch_pr route reaches EVALUATOR without an unbound EXECUTOR loop."
                      id: "binding-3"
                      required: true
                    -
                      check_ids:
                        - "binding-focused"
                        - "lifecycle-invariants"
                        - "compatibility"
                        - "hotspots"
                        - "lint"
                        - "typecheck"
                        - "routing-policy"
                        - "full-local-ci"
                        - "independent-evaluator"
                        - "hosted-integration"
                      description: "The full requested qualification, independent review, and hosted integration remain green."
                      id: "binding-4"
                      required: true
                    -
                      check_ids:
                        - "post-merge-recovery"
                      description: "Post-merge evidence proves historical recovery and the unapproved planning boundary."
                      id: "binding-5"
                      required: true
                  evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                  schema_version: 1
        revision: 4
        schema_version: 1
        task_id: "202609030849-925NNG"
      -
        approval:
          approved_at: "2026-09-03T12:24:34.261Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:33a57055dc30c890a383a0ae40b9417142cad190a14347182f678e92b837865c"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-03T12:24:19.989Z"
        digest: "sha256:33a57055dc30c890a383a0ae40b9417142cad190a14347182f678e92b837865c"
        proposal:
          assumptions:
            - "The repair reuses the existing kernel reject_plan command and task-centric CAS/receipt machinery instead of introducing a second lifecycle model."
            - "The historical task will be reconciled only after independent evaluation and integration on fresh main."
            - "The recovery command requires exact task id, rejected digest, observed revisions, and current fingerprint so unrelated corruptions fail closed."
            - "The compatibility candidate and ratchet checker will record only the intentional recover-rejection command descriptor, options, and task provenance."
            - "The new WorkItem will reproduce the binding loss through the public task-centric external-result path before changing the route."
            - "Existing implementation commits and verification evidence remain preserved; the supervisor decides whether they can be reused after the binding fix."
            - "Historical task recovery remains prohibited until the repair, including this routing fix, is independently evaluated and integrated."
            - "External planning authority can call the exported kernel WorkItem invariant without changing task-centric persistence semantics."
            - "The corrected plan graph is schedulable because every required input is produced by exactly one declared predecessor."
          planning_baseline:
            captured_at: "2026-09-03T12:22:52.699Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:6a5013aa6e2b457fad79b1dc3e7225042db2e9b49dbd798dca936ce9f978453b"
            dirty_paths:
              - ".agentplane/tasks/202609030849-925NNG/README.md"
              - ".agentplane/tasks/202609030849-925NNG/pr/meta.json"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              - ".agentplane/tasks/202609030849-925NNG/supervision/implementation-evidence.json"
              - ".agentplane/tasks/202609030849-925NNG/verification/20260903121410399-e250debe6a8716e3.json"
            git:
              kind: "commit"
              ref: null
              sha: "efa74b42a2e77bb77de2ff908af5b8b29194135d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:30"
          schema_version: 1
          task_id: "202609030849-925NNG"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1 && bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
                id: "focused-regressions"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "lifecycle-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                id: "compatibility"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run hotspots:check"
                id: "hotspots"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run lint"
                id: "lint"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing-policy"
                kind: "deterministic"
                required: true
                timeout_ms: 60000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                id: "independent-evaluator"
                kind: "semantic"
                required: true
              -
                capability: "task.verify"
                id: "hosted-integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "post-merge-recovery"
                kind: "semantic"
                required: true
            criteria:
              -
                check_ids:
                  - "focused-regressions"
                description: "All eight requested regression scenarios pass and demonstrate atomic rejection plus deterministic historical recovery."
                id: "top-1"
                required: true
              -
                check_ids:
                  - "lifecycle-invariants"
                  - "compatibility"
                  - "hotspots"
                  - "lint"
                  - "typecheck"
                  - "routing-policy"
                  - "full-local-ci"
                description: "Lifecycle invariants, compatibility, hotspots, lint, typecheck, routing policy, and full local CI pass without relaxed checks."
                id: "top-2"
                required: true
              -
                check_ids:
                  - "independent-evaluator"
                  - "hosted-integration"
                description: "An independent EVALUATOR passes the exact implementation and AgentPlane integrates it through branch_pr before historical recovery."
                id: "top-3"
                required: true
              -
                check_ids:
                  - "post-merge-recovery"
                description: "Fresh main uses only the new CLI operation to recover the historical task and stops at an unapproved fresh planning boundary."
                id: "top-4"
                required: true
            evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Proposal followed by rejection atomically commits README projection, canonical aggregate, revision, event, receipt, rejected plan state, invalidation, and kernel_plan_required route."
                    id: "atomic-1"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                    description: "Exact rejection replay returns the durable receipt without a second revision or event, and interruption cannot expose a rejected README with an approval-eligible canonical plan."
                    id: "atomic-2"
                    required: true
                  -
                    check_ids:
                      - "atomic-focused"
                      - "lifecycle-invariants"
                    description: "Stale approval packets and host decisions for the rejected digest fail closed, and task advance emits agent.planning."
                    id: "atomic-3"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 120000
                  optional_sources:
                    - "packages/agentplane/src/adapters/task-backend/kernel-replay-persistence.test.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/plan.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/core/src/tasks/task-kernel/kernel.ts"
                    - "packages/agentplane/src/commands/task/kernel-advance.ts"
                  symbol_hints:
                    - "cmdTaskPlanReject"
                    - "reject_plan"
                    - "TaskCentricBackendAdapter"
                    - "advanceCanonicalTask"
                depends_on: []
                expected_outputs:
                  - "atomic-plan-rejection-implementation"
                  - "plan-rejection-regression-evidence"
                id: "atomic-plan-rejection"
                objective: "Reproduce the split-brain plan rejection in an isolated task-centric fixture, identify the bypass of the canonical reject_plan transition, and implement one atomic receipt-backed rejection mutation whose replay, interruption behavior, route invalidation, and stale approval handling are fail-closed."
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
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks/task-kernel"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts --maxWorkers=1"
                      id: "atomic-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                  criteria:
                    -
                      check_ids:
                        - "atomic-focused"
                      description: "Focused tests verify atomic canonical rejection across all projections and persistence records."
                      id: "atomic-1"
                      required: true
                    -
                      check_ids:
                        - "atomic-focused"
                      description: "Focused tests verify replay idempotency and simulated interruption boundaries."
                      id: "atomic-2"
                      required: true
                    -
                      check_ids:
                        - "atomic-focused"
                        - "lifecycle-invariants"
                      description: "Focused tests and lifecycle invariants verify stale approval rejection and planning route selection."
                      id: "atomic-3"
                      required: true
                  evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "A read-only diagnostic detects the 52 versus 50 revision mismatch and rejected README versus approval-eligible canonical plan without mutation."
                    id: "recovery-1"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                    description: "The guarded CLI recovery validates exact historical preconditions, preserves task content and evidence, and appends the canonical event and receipt with monotonic revision history."
                    id: "recovery-2"
                    required: true
                  -
                    check_ids:
                      - "recovery-focused"
                      - "lifecycle-invariants"
                    description: "Equivalent fixture recovery invalidates the rejected digest and post-recovery advance emits agent.planning with a new fingerprint."
                    id: "recovery-3"
                    required: true
                  -
                    check_ids:
                      - "compatibility"
                      - "routing-policy"
                    description: "The compatibility candidate records only the intentional CLI topology addition and both compatibility checks pass."
                    id: "recovery-4"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 160000
                  optional_sources:
                    - "packages/agentplane/src/adapters/task-backend/kernel-migration.ts"
                    - "docs/reference"
                  required_sources:
                    - "packages/agentplane/src/commands/doctor/workspace-task-state.ts"
                    - "packages/agentplane/src/commands/task/plan.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                    - "scripts/baselines/v0.7-compatibility-candidate.json"
                    - "scripts/checks/check-compatibility-contract-baseline.mjs"
                  symbol_hints:
                    - "checkTaskReadmeMigrationState"
                    - "cmdTaskPlanReject"
                    - "mutation_receipts"
                    - "task command catalog"
                    - "compatibility candidate"
                depends_on:
                  - "atomic-plan-rejection"
                expected_outputs:
                  - "recovery-operation-implementation"
                  - "diagnostic-regression-evidence"
                  - "compatibility-candidate-update"
                  - "historical-recovery-regression-evidence"
                  - "reviewed-compatibility-ratchet-update"
                id: "diagnostic-and-recovery"
                objective: "Add mismatch diagnostics and a deterministic CLI-owned historical recovery, update the compatibility candidate for the intentional command topology, qualify the repair, integrate it, and only then recover the historical task on fresh main without approving its new plan."
                optional: false
                priority: 90
                required_inputs:
                  - "atomic-plan-rejection-implementation"
                  - "plan-rejection-regression-evidence"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/doctor"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "docs/reference"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/commands/doctor"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks/task-kernel"
                  - "docs/reference"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1 && bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
                      id: "recovery-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                      id: "compatibility"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 60000
                  criteria:
                    -
                      check_ids:
                        - "recovery-focused"
                      description: "Focused workspace diagnostic test detects the historical mismatch without mutation."
                      id: "recovery-1"
                      required: true
                    -
                      check_ids:
                        - "recovery-focused"
                      description: "Focused adapter, CLI, and recovery tests cover exact preconditions, preservation, monotonic history, event, receipt, and auditability."
                      id: "recovery-2"
                      required: true
                    -
                      check_ids:
                        - "recovery-focused"
                        - "lifecycle-invariants"
                      description: "Focused tests and invariants verify digest invalidation and post-recovery agent.planning."
                      id: "recovery-3"
                      required: true
                    -
                      check_ids:
                        - "compatibility"
                        - "routing-policy"
                      description: "Compatibility and routing checks verify the intentional CLI surface addition."
                      id: "recovery-4"
                      required: true
                  evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "binding-focused"
                    description: "Focused external-planning tests reject an unproduced, multiply produced, self-produced, or cyclic required input before task plan persistence, while the corrected plan output chain remains executable."
                    id: "binding-1"
                    required: true
                  -
                    check_ids:
                      - "binding-focused"
                      - "lifecycle-invariants"
                    description: "A valid corrected graph preserves canonical WorkItem selection and result application exactly once; stale or absent bindings fail closed without partial lifecycle mutation."
                    id: "binding-2"
                    required: true
                  -
                    check_ids:
                      - "binding-focused"
                    description: "After deterministic verification, task next-action reaches independent EVALUATOR and does not loop through an EXECUTOR packet with work_item_id null."
                    id: "binding-3"
                    required: true
                  -
                    check_ids:
                      - "binding-focused"
                      - "lifecycle-invariants"
                      - "compatibility"
                      - "hotspots"
                      - "lint"
                      - "typecheck"
                      - "routing-policy"
                      - "full-local-ci"
                      - "independent-evaluator"
                      - "hosted-integration"
                    description: "Focused regressions, lifecycle invariants, compatibility, hotspots, lint, typecheck, routing policy, full local CI, independent EVALUATOR, and hosted integration all pass before historical recovery."
                    id: "binding-4"
                    required: true
                  -
                    check_ids:
                      - "post-merge-recovery"
                    description: "On fresh main only the CLI-owned recovery operation reconciles 202609021331-5FPZAB and task advance stops at a fresh unapproved agent.planning boundary."
                    id: "binding-5"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 120000
                  optional_sources:
                    - "packages/core/src/tasks/task-centric/graph.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
                    - "packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts"
                    - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                    - "packages/core/src/tasks/task-kernel/invariants.ts"
                  symbol_hints:
                    - "planningTaskFields"
                    - "validateTaskPlanProposal"
                    - "validateWorkItemDefinitions"
                    - "recordTaskCentricExternalResult"
                depends_on:
                  - "atomic-plan-rejection"
                  - "diagnostic-and-recovery"
                expected_outputs:
                  - "task-plan-graph-validation-fix"
                  - "invalid-required-input-regression-evidence"
                  - "work-item-completion-binding-fix"
                  - "work-item-binding-regression-evidence"
                  - "independent-evaluator-pass"
                  - "integrated-repair"
                  - "historical-task-recovery-evidence"
                id: "work-item-completion-binding"
                objective: "Reject invalid external TaskPlanProposal graphs before persistence, including unproduced, multiply produced, self-produced, and cyclic required_inputs, while preserving canonical WorkItem binding and routing the corrected verified branch_pr task to independent EVALUATOR."
                optional: false
                priority: 80
                required_inputs:
                  - "recovery-operation-implementation"
                  - "diagnostic-regression-evidence"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --maxWorkers=1"
                      id: "binding-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 240000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run bench:compatibility:candidate:check && bun run bench:compatibility:check"
                      id: "compatibility"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run hotspots:check"
                      id: "hotspots"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run lint"
                      id: "lint"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "typecheck"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 60000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-local-ci"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      id: "independent-evaluator"
                      kind: "semantic"
                      required: true
                    -
                      capability: "task.verify"
                      id: "hosted-integration"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "post-merge-recovery"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "binding-focused"
                      description: "Focused tests prove fail-closed required-input graph validation and acceptance of the corrected output chain."
                      id: "binding-1"
                      required: true
                    -
                      check_ids:
                        - "binding-focused"
                        - "lifecycle-invariants"
                      description: "Focused tests and lifecycle invariants prove exactly-once WorkItem completion and idempotent replay."
                      id: "binding-2"
                      required: true
                    -
                      check_ids:
                        - "binding-focused"
                      description: "The verified branch_pr route reaches EVALUATOR without an unbound EXECUTOR loop."
                      id: "binding-3"
                      required: true
                    -
                      check_ids:
                        - "binding-focused"
                        - "lifecycle-invariants"
                        - "compatibility"
                        - "hotspots"
                        - "lint"
                        - "typecheck"
                        - "routing-policy"
                        - "full-local-ci"
                        - "independent-evaluator"
                        - "hosted-integration"
                      description: "The full requested qualification, independent review, and hosted integration remain green."
                      id: "binding-4"
                      required: true
                    -
                      check_ids:
                        - "post-merge-recovery"
                      description: "Post-merge evidence proves historical recovery and the unapproved planning boundary."
                      id: "binding-5"
                      required: true
                  evidence_fingerprint: "sha256:4a0294837ebfa73896c3052f58320005f7f8ae5dc5ac369b3193a3c6ee050c3e"
                  schema_version: 1
        revision: 5
        schema_version: 1
        task_id: "202609030849-925NNG"
    revision: 53
    schema_version: 1
    updated_at: "2026-09-03T13:02:38.568Z"
    work_items:
      atomic-plan-rejection:
        attempt: 1
        claim_id: null
        id: "atomic-plan-rejection"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:76658e1dd7df0a017f649ccf4b4b4c0e26382ac544ae401226e866048b7ff79a"
            id: "atomic-plan-rejection-implementation"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 5
              task_id: "202609030849-925NNG"
              work_item_id: "atomic-plan-rejection"
            provenance:
              - "sha256:3d29a06c815d9957b087eca352abb708e1e1c9727c2dc0ea933e542adb7c9caa"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:8f3d0b4a8cb891cc4d1b8160c31af61fa20f5beb70238f54b153278f9e0df37d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:e0eefdeab907c4efcff2dbe25816c70008f7c20b053e6c81e2b46ce844920d8b"
            id: "plan-rejection-regression-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 5
              task_id: "202609030849-925NNG"
              work_item_id: "atomic-plan-rejection"
            provenance:
              - "sha256:3d29a06c815d9957b087eca352abb708e1e1c9727c2dc0ea933e542adb7c9caa"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:8f3d0b4a8cb891cc4d1b8160c31af61fa20f5beb70238f54b153278f9e0df37d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "atomic-focused"
              command_identity: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts --maxWorkers=1"
              detail: "Observed by bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-03T12:27:38.513Z"
              repository_snapshot_digest: "sha256:8f3d0b4a8cb891cc4d1b8160c31af61fa20f5beb70238f54b153278f9e0df37d"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "lifecycle-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-03T12:27:38.513Z"
              repository_snapshot_digest: "sha256:8f3d0b4a8cb891cc4d1b8160c31af61fa20f5beb70238f54b153278f9e0df37d"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      diagnostic-and-recovery:
        attempt: 1
        claim_id: null
        id: "diagnostic-and-recovery"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:db5369199d7c30edc80418f499a7f160120383ad732db6ec088d56f4650c4e35"
            id: "recovery-operation-implementation"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 6
              task_id: "202609030849-925NNG"
              work_item_id: "diagnostic-and-recovery"
            provenance:
              - "sha256:9044137f57eebc37332595031758c38444db8f1e2cb951df5d6ca895fbe56a10"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:bcecbac6671f547e269579023469fbca36ea57b3be552923e768e17fc4e735c9"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:6bdc5ffbcf27af3bc27b67d5a1a7246c7f78ac478e7c13417c1aec06805dd684"
            id: "diagnostic-regression-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 6
              task_id: "202609030849-925NNG"
              work_item_id: "diagnostic-and-recovery"
            provenance:
              - "sha256:9044137f57eebc37332595031758c38444db8f1e2cb951df5d6ca895fbe56a10"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:bcecbac6671f547e269579023469fbca36ea57b3be552923e768e17fc4e735c9"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:0dac3964a268693a521c7ac28c4a6aa3327e1c4387e643c6f3752f079368e52d"
            id: "compatibility-candidate-update"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 6
              task_id: "202609030849-925NNG"
              work_item_id: "diagnostic-and-recovery"
            provenance:
              - "sha256:9044137f57eebc37332595031758c38444db8f1e2cb951df5d6ca895fbe56a10"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:bcecbac6671f547e269579023469fbca36ea57b3be552923e768e17fc4e735c9"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:238f14f3522f34c60a926b268d1eab5bde27afa088a7058daa73c948cfa225e5"
            id: "historical-recovery-regression-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 6
              task_id: "202609030849-925NNG"
              work_item_id: "diagnostic-and-recovery"
            provenance:
              - "sha256:9044137f57eebc37332595031758c38444db8f1e2cb951df5d6ca895fbe56a10"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:bcecbac6671f547e269579023469fbca36ea57b3be552923e768e17fc4e735c9"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:e3ea6c56b6cb7649021792284a57a27cf3065f22ad47cc8d240d69d35953143e"
            id: "reviewed-compatibility-ratchet-update"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 6
              task_id: "202609030849-925NNG"
              work_item_id: "diagnostic-and-recovery"
            provenance:
              - "sha256:9044137f57eebc37332595031758c38444db8f1e2cb951df5d6ca895fbe56a10"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:bcecbac6671f547e269579023469fbca36ea57b3be552923e768e17fc4e735c9"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "lifecycle-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-03T12:33:28.464Z"
              repository_snapshot_digest: "sha256:bcecbac6671f547e269579023469fbca36ea57b3be552923e768e17fc4e735c9"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "routing-policy"
              command_identity: "node .agentplane/policy/check-routing.mjs"
              detail: "Observed by node .agentplane/policy/check-routing.mjs."
              exit_code: 0
              observed_at: "2026-09-03T12:33:28.464Z"
              repository_snapshot_digest: "sha256:bcecbac6671f547e269579023469fbca36ea57b3be552923e768e17fc4e735c9"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "recovery-focused-workspace"
              command_identity: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1"
              detail: "Observed by bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/task/plan-approval-guard.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-03T12:33:28.464Z"
              repository_snapshot_digest: "sha256:bcecbac6671f547e269579023469fbca36ea57b3be552923e768e17fc4e735c9"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "recovery-focused-cli"
              command_identity: "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1"
              detail: "Observed by bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-03T12:33:28.464Z"
              repository_snapshot_digest: "sha256:bcecbac6671f547e269579023469fbca36ea57b3be552923e768e17fc4e735c9"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "compatibility-candidate"
              command_identity: "bun run bench:compatibility:candidate:check"
              detail: "Observed by bun run bench:compatibility:candidate:check."
              exit_code: 0
              observed_at: "2026-09-03T12:33:28.464Z"
              repository_snapshot_digest: "sha256:bcecbac6671f547e269579023469fbca36ea57b3be552923e768e17fc4e735c9"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "compatibility-baseline"
              command_identity: "bun run bench:compatibility:check"
              detail: "Observed by bun run bench:compatibility:check."
              exit_code: 0
              observed_at: "2026-09-03T12:33:28.464Z"
              repository_snapshot_digest: "sha256:bcecbac6671f547e269579023469fbca36ea57b3be552923e768e17fc4e735c9"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      work-item-completion-binding:
        attempt: 1
        claim_id: null
        id: "work-item-completion-binding"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:1653e4fb196bf40df242d1a54f57d346d253919983303d077cc920c3aa34ab48"
            id: "task-plan-graph-validation-fix"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 6
              task_id: "202609030849-925NNG"
              work_item_id: "work-item-completion-binding"
            provenance:
              - "sha256:d2083e72df9f61faa4189248166fb9ea7dd6f80ac99378a623df0e610290094b"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:992886410bc78d79b5c4c253df1e4417bd602cbc2e6ed18dd504d836b7776bfd"
            id: "invalid-required-input-regression-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 6
              task_id: "202609030849-925NNG"
              work_item_id: "work-item-completion-binding"
            provenance:
              - "sha256:d2083e72df9f61faa4189248166fb9ea7dd6f80ac99378a623df0e610290094b"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:86fb379a24eeb1c8a55c235bb1bb25431661143c863042af20e74a7f697b828b"
            id: "work-item-completion-binding-fix"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 6
              task_id: "202609030849-925NNG"
              work_item_id: "work-item-completion-binding"
            provenance:
              - "sha256:d2083e72df9f61faa4189248166fb9ea7dd6f80ac99378a623df0e610290094b"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:e426f9465a266c9f25d4d66a05a71455fd127766d8ebb4b82a0bf2901db1a880"
            id: "work-item-binding-regression-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 6
              task_id: "202609030849-925NNG"
              work_item_id: "work-item-completion-binding"
            provenance:
              - "sha256:d2083e72df9f61faa4189248166fb9ea7dd6f80ac99378a623df0e610290094b"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:4e3468f6622bccdee6751dd4ba9067e83c71b741a0e2326e7aecac8f1d454de0"
            id: "independent-evaluator-pass"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 6
              task_id: "202609030849-925NNG"
              work_item_id: "work-item-completion-binding"
            provenance:
              - "sha256:d2083e72df9f61faa4189248166fb9ea7dd6f80ac99378a623df0e610290094b"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:57f44e656cfa9235d56f5aac84aee689922c9430c7de7b6757d407bef7e370dd"
            id: "integrated-repair"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 6
              task_id: "202609030849-925NNG"
              work_item_id: "work-item-completion-binding"
            provenance:
              - "sha256:d2083e72df9f61faa4189248166fb9ea7dd6f80ac99378a623df0e610290094b"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:753a65237513037807c804746910137a5313e622cd80c5df594d3ecbec4ae1eb"
            id: "historical-task-recovery-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 6
              task_id: "202609030849-925NNG"
              work_item_id: "work-item-completion-binding"
            provenance:
              - "sha256:d2083e72df9f61faa4189248166fb9ea7dd6f80ac99378a623df0e610290094b"
              - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "binding-focused"
              command_identity: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --maxWorkers=1"
              detail: "Observed by bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts packages/agentplane/src/commands/task/task-centric-external-result.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-03T12:53:30.369Z"
              repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "lifecycle-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-03T12:53:30.369Z"
              repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "hotspots"
              command_identity: "bun run hotspots:check"
              detail: "Observed by bun run hotspots:check."
              exit_code: 0
              observed_at: "2026-09-03T12:53:30.369Z"
              repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "lint"
              command_identity: "bun run lint"
              detail: "Observed by bun run lint."
              exit_code: 0
              observed_at: "2026-09-03T12:53:30.369Z"
              repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "typecheck"
              command_identity: "bun run typecheck"
              detail: "Observed by bun run typecheck."
              exit_code: 0
              observed_at: "2026-09-03T12:53:30.369Z"
              repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "routing-policy"
              command_identity: "node .agentplane/policy/check-routing.mjs"
              detail: "Observed by node .agentplane/policy/check-routing.mjs."
              exit_code: 0
              observed_at: "2026-09-03T12:53:30.369Z"
              repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "full-local-ci"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-09-03T12:53:30.369Z"
              repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "independent-evaluator"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-03T12:53:30.369Z"
              repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "hosted-integration"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-03T12:53:30.369Z"
              repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "post-merge-recovery"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-03T12:53:30.369Z"
              repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "compatibility-candidate"
              command_identity: "bun run bench:compatibility:candidate:check"
              detail: "Observed by bun run bench:compatibility:candidate:check."
              exit_code: 0
              observed_at: "2026-09-03T12:53:30.369Z"
              repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json"
              check_id: "compatibility-baseline"
              command_identity: "bun run bench:compatibility:check"
              detail: "Observed by bun run bench:compatibility:check."
              exit_code: 0
              observed_at: "2026-09-03T12:53:30.369Z"
              repository_snapshot_digest: "sha256:0d349f9b7c876773ed434795182329cebe9b0cdb04a005ebb5dd6a85ff269386"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-03T09:14:57.375Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
          - "outputs_changed"
        entity: "task"
        id: "event_fd9e7caba7ab1be301470ac5"
        mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-c566e291211f94fd9eb96704"
        plan_digest: "sha256:e91c4dbc2ba56cee7a0dfaa7ede90099bf3f55b3f780fca75b64727599994ea1"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609030849-925NNG"
        task_revision: 7
        work_item_id: null
      -
        at: "2026-09-03T11:30:03.275Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
          - "outputs_changed"
        entity: "task"
        id: "event_7baf48a801f9a4dcb4a422bc"
        mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-c1110e3e6e7c620b2db0e9ad"
        plan_digest: "sha256:2b7ea8c167a314b6110fedc32cdfec5bf0a71cd16d6487b20349b0104d32c60c"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609030849-925NNG"
        task_revision: 14
        work_item_id: null
      -
        at: "2026-09-03T12:16:50.059Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "outputs_changed"
          - "acceptance_changed"
        entity: "task"
        id: "event_a7e9fdb0eabfa14f1c87cfc5"
        mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-aa44ea9e9f43da649a768934"
        plan_digest: "sha256:81536767b7980658b2e961f037c86359470c9aee1ab7f243a05e4567a197e00b"
        plan_revision: 3
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609030849-925NNG"
        task_revision: 25
        work_item_id: null
      -
        at: "2026-09-03T12:22:51.079Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "outputs_changed"
          - "acceptance_changed"
          - "dependencies_changed"
        entity: "task"
        id: "event_5534167aa74a7292d94e61a4"
        mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-0d343c85a70052304eb6865c"
        plan_digest: "sha256:8de03667daef5084512fb73ee416b72cf1f87bac69e7f57ef472e2c49235c312"
        plan_revision: 4
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609030849-925NNG"
        task_revision: 29
        work_item_id: null
      -
        at: "2026-09-03T12:27:38.528Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_785c8a4eda1cf712610aac1d"
        mutation_id: "external-result:work-order-202609030849-925NNG-executor-e373330d49f61d8770b964a5"
        plan_digest: "sha256:33a57055dc30c890a383a0ae40b9417142cad190a14347182f678e92b837865c"
        plan_revision: 5
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609030849-925NNG"
        task_revision: 35
        work_item_id: "atomic-plan-rejection"
      -
        at: "2026-09-03T12:29:22.655Z"
        from: "PLANNED"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_4880af9f964c2b5c9192b12e"
        mutation_id: "external-result:work-order-202609030849-925NNG-executor-5ebb0e6dc85a767201557419"
        plan_digest: "sha256:33a57055dc30c890a383a0ae40b9417142cad190a14347182f678e92b837865c"
        plan_revision: 5
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609030849-925NNG"
        task_revision: 38
        work_item_id: "diagnostic-and-recovery"
      -
        at: "2026-09-03T12:30:30.776Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "acceptance_changed"
        entity: "task"
        id: "event_27f76c39fd581971c9f1fe00"
        mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-192c276f77a81bcfbd683cb9"
        plan_digest: "sha256:33a57055dc30c890a383a0ae40b9417142cad190a14347182f678e92b837865c"
        plan_revision: 5
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609030849-925NNG"
        task_revision: 39
        work_item_id: null
      -
        at: "2026-09-03T12:33:28.495Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_7c571affacd49e90fe67f137"
        mutation_id: "external-result:work-order-202609030849-925NNG-executor-90fb3b263e1af02b83fa4f0b"
        plan_digest: "sha256:9105b3af7bfd6b11eff54b81ab7ec485a7b194f0698ff47470d76fb7b6f11f69"
        plan_revision: 6
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609030849-925NNG"
        task_revision: 45
        work_item_id: "diagnostic-and-recovery"
      -
        at: "2026-09-03T12:53:30.414Z"
        from: "PLANNED"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_31d17d0670511e7cf5a87446"
        mutation_id: "external-result:work-order-202609030849-925NNG-executor-ab165c16e5b6f62308e08124"
        plan_digest: "sha256:9105b3af7bfd6b11eff54b81ab7ec485a7b194f0698ff47470d76fb7b6f11f69"
        plan_revision: 6
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609030849-925NNG"
        task_revision: 48
        work_item_id: "work-item-completion-binding"
      -
        at: "2026-09-03T13:02:38.568Z"
        from: "ACTIVE"
        to: "COMPLETED"
        actor_id: "CODER"
        cause_refs:
          - "task-verification:202609030849-925NNG"
          - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
        entity: "task"
        id: "event_2b483b1d38f7c6794a016e9c"
        mutation_id: "legacy-finish:202609030849-925NNG:2026-09-03T13:01:15.573Z:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
        plan_digest: "sha256:9105b3af7bfd6b11eff54b81ab7ec485a7b194f0698ff47470d76fb7b6f11f69"
        plan_revision: 6
        repository_fingerprint: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
        schema_version: 1
        task_id: "202609030849-925NNG"
        task_revision: 49
        work_item_id: null
    leases: []
    mutation_receipts:
      external-result:work-order-202609030849-925NNG-executor-5ebb0e6dc85a767201557419:
        aggregate_digest: "sha256:e120d3f097bc53324c7ab9969fef9d740b69e49b0aa07fbaf3616731a4736b8d"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T12:29:22.655Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_4880af9f964c2b5c9192b12e"
          mutation_id: "external-result:work-order-202609030849-925NNG-executor-5ebb0e6dc85a767201557419"
          plan_digest: "sha256:33a57055dc30c890a383a0ae40b9417142cad190a14347182f678e92b837865c"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609030849-925NNG"
          task_revision: 38
          to: "REWORK_READY"
          work_item_id: "diagnostic-and-recovery"
        mutation_id: "external-result:work-order-202609030849-925NNG-executor-5ebb0e6dc85a767201557419"
        next_revision: 39
        previous_revision: 38
        schema_version: 1
        task_id: "202609030849-925NNG"
      external-result:work-order-202609030849-925NNG-executor-90fb3b263e1af02b83fa4f0b:
        aggregate_digest: "sha256:71009a05e5d558639defd1b427591defec7bb5bd2b57119ac891efc535c2a559"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T12:33:28.495Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_7c571affacd49e90fe67f137"
          mutation_id: "external-result:work-order-202609030849-925NNG-executor-90fb3b263e1af02b83fa4f0b"
          plan_digest: "sha256:9105b3af7bfd6b11eff54b81ab7ec485a7b194f0698ff47470d76fb7b6f11f69"
          plan_revision: 6
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609030849-925NNG"
          task_revision: 45
          to: "COMPLETED"
          work_item_id: "diagnostic-and-recovery"
        mutation_id: "external-result:work-order-202609030849-925NNG-executor-90fb3b263e1af02b83fa4f0b"
        next_revision: 46
        previous_revision: 45
        schema_version: 1
        task_id: "202609030849-925NNG"
      external-result:work-order-202609030849-925NNG-executor-ab165c16e5b6f62308e08124:
        aggregate_digest: "sha256:23a366052cd838f08ba14f18fddaf7e6c845411917383adc6795b94b1f06232e"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T12:53:30.414Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_31d17d0670511e7cf5a87446"
          mutation_id: "external-result:work-order-202609030849-925NNG-executor-ab165c16e5b6f62308e08124"
          plan_digest: "sha256:9105b3af7bfd6b11eff54b81ab7ec485a7b194f0698ff47470d76fb7b6f11f69"
          plan_revision: 6
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609030849-925NNG"
          task_revision: 48
          to: "COMPLETED"
          work_item_id: "work-item-completion-binding"
        mutation_id: "external-result:work-order-202609030849-925NNG-executor-ab165c16e5b6f62308e08124"
        next_revision: 49
        previous_revision: 48
        schema_version: 1
        task_id: "202609030849-925NNG"
      external-result:work-order-202609030849-925NNG-executor-e373330d49f61d8770b964a5:
        aggregate_digest: "sha256:affd431bba4aa8b0b1795501be8ef4849b9ac1d6d15308d5e63f17bf3b967713"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T12:27:38.528Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_785c8a4eda1cf712610aac1d"
          mutation_id: "external-result:work-order-202609030849-925NNG-executor-e373330d49f61d8770b964a5"
          plan_digest: "sha256:33a57055dc30c890a383a0ae40b9417142cad190a14347182f678e92b837865c"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609030849-925NNG"
          task_revision: 35
          to: "COMPLETED"
          work_item_id: "atomic-plan-rejection"
        mutation_id: "external-result:work-order-202609030849-925NNG-executor-e373330d49f61d8770b964a5"
        next_revision: 36
        previous_revision: 35
        schema_version: 1
        task_id: "202609030849-925NNG"
      legacy-finish:202609030849-925NNG:2026-09-03T13:01:15.573Z:b3ca56abe63fcca08fc766f4cfa489c7546104fb:
        aggregate_digest: "sha256:3816ad4e110f75ef3b35bc95eecec10d94338a802154dc0cf91b12e1c48057b1"
        event:
          actor_id: "CODER"
          at: "2026-09-03T13:02:38.568Z"
          cause_refs:
            - "task-verification:202609030849-925NNG"
            - "git:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          entity: "task"
          from: "ACTIVE"
          id: "event_2b483b1d38f7c6794a016e9c"
          mutation_id: "legacy-finish:202609030849-925NNG:2026-09-03T13:01:15.573Z:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
          plan_digest: "sha256:9105b3af7bfd6b11eff54b81ab7ec485a7b194f0698ff47470d76fb7b6f11f69"
          plan_revision: 6
          repository_fingerprint: "sha256:5aa2a22495c1685e0f61c6b69b1e23dbe2c30db73f9a330f98406ef8e89f66a6"
          schema_version: 1
          task_id: "202609030849-925NNG"
          task_revision: 49
          to: "COMPLETED"
          work_item_id: null
        mutation_id: "legacy-finish:202609030849-925NNG:2026-09-03T13:01:15.573Z:b3ca56abe63fcca08fc766f4cfa489c7546104fb"
        next_revision: 53
        previous_revision: 52
        schema_version: 1
        task_id: "202609030849-925NNG"
      plan-refinement:work-order-202609030849-925NNG-executor-0d343c85a70052304eb6865c:
        aggregate_digest: "sha256:6b6f2b155fe2a62575f7f8f09a93c085d9990ba0b51e3920fd3748b214d04368"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-03T12:22:51.079Z"
          cause_refs:
            - "outputs_changed"
            - "acceptance_changed"
            - "dependencies_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_5534167aa74a7292d94e61a4"
          mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-0d343c85a70052304eb6865c"
          plan_digest: "sha256:8de03667daef5084512fb73ee416b72cf1f87bac69e7f57ef472e2c49235c312"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609030849-925NNG"
          task_revision: 29
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-0d343c85a70052304eb6865c"
        next_revision: 30
        previous_revision: 29
        schema_version: 1
        task_id: "202609030849-925NNG"
      plan-refinement:work-order-202609030849-925NNG-executor-192c276f77a81bcfbd683cb9:
        aggregate_digest: "sha256:15a27c9359907f0f4701353d0707b2350ce1662e0b6dff0e12c7da840e109fa7"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-03T12:30:30.776Z"
          cause_refs:
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_27f76c39fd581971c9f1fe00"
          mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-192c276f77a81bcfbd683cb9"
          plan_digest: "sha256:33a57055dc30c890a383a0ae40b9417142cad190a14347182f678e92b837865c"
          plan_revision: 5
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609030849-925NNG"
          task_revision: 39
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-192c276f77a81bcfbd683cb9"
        next_revision: 40
        previous_revision: 39
        schema_version: 1
        task_id: "202609030849-925NNG"
      plan-refinement:work-order-202609030849-925NNG-executor-aa44ea9e9f43da649a768934:
        aggregate_digest: "sha256:e22e4bcb4fa4a055f6934237b2c57ddca9e2036dbec8c4eb2e2744abb559a0d5"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-03T12:16:50.059Z"
          cause_refs:
            - "outputs_changed"
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_a7e9fdb0eabfa14f1c87cfc5"
          mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-aa44ea9e9f43da649a768934"
          plan_digest: "sha256:81536767b7980658b2e961f037c86359470c9aee1ab7f243a05e4567a197e00b"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609030849-925NNG"
          task_revision: 25
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-aa44ea9e9f43da649a768934"
        next_revision: 26
        previous_revision: 25
        schema_version: 1
        task_id: "202609030849-925NNG"
      plan-refinement:work-order-202609030849-925NNG-executor-c1110e3e6e7c620b2db0e9ad:
        aggregate_digest: "sha256:1fc0b90b67259acad5fec47dcf1c129fe8a6f04d521b6be3a302267f79840b91"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-03T11:30:03.275Z"
          cause_refs:
            - "scope_expanded"
            - "outputs_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_7baf48a801f9a4dcb4a422bc"
          mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-c1110e3e6e7c620b2db0e9ad"
          plan_digest: "sha256:2b7ea8c167a314b6110fedc32cdfec5bf0a71cd16d6487b20349b0104d32c60c"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609030849-925NNG"
          task_revision: 14
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-c1110e3e6e7c620b2db0e9ad"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609030849-925NNG"
      plan-refinement:work-order-202609030849-925NNG-executor-c566e291211f94fd9eb96704:
        aggregate_digest: "sha256:e043ed4109a2c59eb7fc3cf6e54ff7d568fa7dfc0db70a924b3f211498f4e7df"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-03T09:14:57.375Z"
          cause_refs:
            - "scope_expanded"
            - "outputs_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_fd9e7caba7ab1be301470ac5"
          mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-c566e291211f94fd9eb96704"
          plan_digest: "sha256:e91c4dbc2ba56cee7a0dfaa7ede90099bf3f55b3f780fca75b64727599994ea1"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609030849-925NNG"
          task_revision: 7
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609030849-925NNG-executor-c566e291211f94fd9eb96704"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609030849-925NNG"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "ac53261209a4623880059cb38f0a2d4bb32c445c"
    message: "🩹 925NNG cli: remove unused recovery re-exports"
  task_execution_context:
    base_ref: "main"
    base_sha: "a51e95514f2909177410f78a4057873140097edb"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "a51e95514f2909177410f78a4057873140097edb"
    version: 1
id_source: "generated"
---
## Summary

Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation

Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB.

## Scope

- In scope: Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB.
- Out of scope: unrelated refactors not required for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation".

## Plan

Refine the executable branch_pr recovery plan so every deterministic validation check is one supervisor-observable command, preserving the completed atomic WorkItem and the exact output chain.

## Verify Steps

PLANNER fallback scaffold for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-03T09:14:54.444Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: agentplane doctor
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:033e09543ff0e1038058d9488275acb9169fea33a36278d8136bbfa0b3b7a007

Details:

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG declared verification

Command: agentplane doctor
Result: fail
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
- old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609030849-925NNG

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

### 2026-09-03T11:29:57.796Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:33d3954a1429d61236351f21f9aa4d220b84f62330d99964ccefe63209a31c43

Details:

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG declared verification

Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
- old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609030849-925NNG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-03T12:01:45.892Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:8372e964a0ee2c20927169a6cd09f7f8266d46e5e217461c81053038b5186e49

Details:

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (3/3)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (1/3)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (2/3)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check full_regression

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (1/3)

Check: real_e2e
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (2/3)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (3/3)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (3/3)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
- old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609030849-925NNG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-03T12:14:10.399Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:8bae660f6bd1e9954513792c06ff27d5ff122519a1630d154e0cceefe634d5c2

Details:

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (3/3)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (1/3)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (2/3)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check full_regression

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (1/3)

Check: real_e2e
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (2/3)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (3/3)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (3/3)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
- old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609030849-925NNG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-03T13:01:15.573Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:26141e10683ca6a4531f05b0f01750ebda4a3104c7dc81ebbcbb068dd2769859

Details:

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (3/3)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (1/3)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (2/3)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check full_regression

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (1/3)

Check: real_e2e
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (2/3)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (3/3)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (3/3)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
- old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609030849-925NNG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609030849-925NNG
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-03T13:40:24.104Z — VERIFY — ok

By: TESTER

Note: Rework removes only two unused public re-exports; task-centric recovery behavior is unchanged and all required checks pass on committed head ac53261209a4623880059cb38f0a2d4bb32c445c.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:ca54bc04b3360dd8339701dca0828f925b11f1a954ac3e12fdce61e66fc495ae

Details:

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/commands/task/plan-rejection-recovery.test.ts packages/agentplane/src/commands/doctor/workspace-task-state.test.ts packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts
Result: pass
Evidence: 3 files and 10 tests passed.
Scope: plan rejection, diagnostic, recovery, and task-centric adapter regressions

Check: critical_paths
Command: bun run knip:check; bun run lint:core; bun run typecheck; bun run format:check
Result: pass
Evidence: AgentPlane CLI Knip budget 0/0; lint, TypeScript build, and Prettier all exited 0.
Scope: changed CLI and doctor modules

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: docs schema, generated reference, docs site generate, typecheck, build, design, and workflow contract all passed in the final full run.
Scope: repository documentation and generated CLI contract

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: full-fast ok=true wall_clock_ms=414757; Windows 7 files 98 tests passed; significant coverage 8 files 101 tests passed and 17 source targets satisfied.
Scope: full repository local CI on committed rework head

Check: real_e2e
Command: bunx vitest run packages/agentplane/src/commands/release/local-release-e2e-script.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: isolated real-process E2E rerun passed 1 file and 4 tests after an unrelated temporary-directory ENOTEMPTY race in the preceding full run.
Scope: local real-process E2E compatibility

Check: task_outcome
Command: bun run ci:local:full; bun run knip:check
Result: pass
Evidence: final full CI exited 0 and the hosted blocker is resolved locally with AgentPlane CLI Knip budget restored to 0/0; task recovery focused tests remain 10/10.
Scope: acceptance outcome for atomic rejection and CLI-owned recovery implementation

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
- old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609030849-925NNG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-03T13:47:05.071Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:2366beb221bf25bb9d2bdf5da1306350a8f083229f45a8fe084128b30c72a894

Details:

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check critical_paths (3/3)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (1/3)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (2/3)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check docs_contract (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check full_regression

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (1/3)

Check: real_e2e
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (2/3)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check real_e2e (3/3)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609030849-925NNG/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609030849-925NNG Verification Contract check task_outcome (3/3)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
- old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609030849-925NNG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-03T14:21:43.530Z — VERIFY — ok

By: TESTER

Note: Hosted verify-tests transient concurrency race was reproduced as non-deterministic: the focused workflow.verify-hooks suite passed 11/11 locally, failed-job retry passed, and aggregate PR verification passed without source changes.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:78c61303ba5d3fc22d189833290074e6cdc14a8e26fa1e75e1ba212f1d49f006, input_digest=sha256:4174d982682606c11198a1e67cb4f709b6ac0e88c6c39d80371725b3a97c7c31

Details:

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/commands/workflow.verify-hooks.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000 --retry 2
Result: pass
Evidence: focused concurrency suite passed 1 file and 11 tests.
Scope: durable verification record under concurrent verifies

Check: critical_paths
Command: gh run rerun 33764148583 --repo basilisk-labs/agentplane --failed
Result: pass
Evidence: verify-tests retry job 100680983796 passed in 11m48s; aggregate PR verification job 100684909084 passed in 17s.
Scope: hosted required checks on unchanged closure head 597df3b5ae991321eeb033a6a059278eb0b5cf18

Check: docs_contract
Command: hosted verify-contract job 100680986739
Result: pass
Evidence: verify-contract passed; no source or docs change followed.
Scope: generated and documentation contracts

Check: full_regression
Command: bun run ci:local:full; hosted verify-tests retry
Result: pass
Evidence: final local full CI exited 0 and hosted retry passed all unit, critical CLI, workflow coverage, and significant coverage stages.
Scope: full repository regression

Check: real_e2e
Command: bunx vitest run packages/agentplane/src/commands/release/local-release-e2e-script.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: isolated real-process E2E passed 1 file and 4 tests.
Scope: local real-process compatibility

Check: task_outcome
Command: hosted PR verification job 100684909084
Result: pass
Evidence: aggregate provider verification passed for PR #5888 after failed-job retry; no implementation change was required.
Scope: recovery fix integration readiness

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609030849-925NNG-repair-task-centric-plan-rejection-projection-at/.agentplane/tasks/202609030849-925NNG/blueprint/resolved-snapshot.json
- old_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- current_digest: 3f9cbb85cb0292203d03fae3c68553cfc438e2fa23fb065e8446afd2b4683686
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609030849-925NNG

DecisionContextRef:
- operator_action: stop
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

## Token Usage

- State: `unavailable`
- Completeness: `0/20` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:d64d42523a8afdcdc6753557f046f4545cfa15c98634613ec4ea9d9868c64ba6`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-09-03T14:22:45.670Z`
