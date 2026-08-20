---
id: "202608200903-J459C2"
title: "Make task execution authority local and direct execution workspace-safe"
status: "BLOCKED"
priority: "high"
owner: "CODER"
revision: 28
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "architecture"
  - "lifecycle"
  - "routing"
  - "multi-agent"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bun run ci:local:fast"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-20T14:24:35.433Z"
  updated_by: "USER"
  note: "User explicitly approved plan J459C2 in chat on 2026-08-20; one AgentPlane-managed working branch for AP-0001 through AP-1004."
verification:
  state: "blocked_external"
  updated_at: "2026-08-20T20:03:19.312Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Declared check failed: bun run ci:local:fast"
  attempts: 6
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
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
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - ".agentplane/policy"
      - "AGENTS.md"
      - "docs"
      - "packages/agentplane"
      - "packages/core"
      - "scripts/baselines"
      - "scripts/checks"
  declaration:
    external_effects: []
    implementation_uncertainty: "material"
    preferred_mode: "branch_pr"
    rationale:
      - "One isolated branch_pr worktree is required because the change is cross-cutting and security-sensitive, while publication and provider effects remain separate lifecycle boundaries."
      - "The approved roadmap changes central lifecycle authority, persisted task compatibility, verification identity, workspace allocation, integration serialization, and managed-runner capability enforcement across source, tests, schemas, policy, and documentation."
      - "USER-approved blocked-result scope extension: roots=scripts/baselines; repository_effects=public_api,repository_write,tests"
      - "USER-approved blocked-result scope extension: roots=scripts/checks; repository_effects=public_api,repository_write,source_code,tests"
    repository_effects:
      - "documentation"
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
      - ".agentplane/policy"
      - "AGENTS.md"
      - "docs"
      - "packages/agentplane"
      - "packages/core"
      - "scripts/baselines"
      - "scripts/checks"
  observed:
    authority_violations:
      - "verification:recorded-check-2:fail"
    changed_components:
      - "docs"
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - "docs/adr/0014-task-execution-authority.md"
      - "docs/adr/0015-task-workspace-isolation.md"
      - "docs/adr/0016-serialized-direct-integration.md"
      - "docs/adr/README.md"
      - "docs/developer/task-execution-authority.mdx"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
      - "packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.command.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-diff-evidence.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-evidence-compaction.test.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-execution-base.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-qualification-review.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-support.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-test-helpers.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-verification-contract.test.ts"
      - "packages/agentplane/src/commands/integrate-queue-direct.ts"
      - "packages/agentplane/src/commands/integrate-queue-lane.ts"
      - "packages/agentplane/src/commands/integrate-queue-reservation.ts"
      - "packages/agentplane/src/commands/integrate-queue.command.ts"
      - "packages/agentplane/src/commands/pr/flow-status.ts"
      - "packages/agentplane/src/commands/pr/integrate/queue-state-types.ts"
      - "packages/agentplane/src/commands/pr/integrate/queue-state.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/queue-state.ts"
      - "packages/agentplane/src/commands/pr/internal/sync.ts"
      - "packages/agentplane/src/commands/pr/open.ts"
      - "packages/agentplane/src/commands/provider-ops-results.test.ts"
      - "packages/agentplane/src/commands/shared/declared-check.test.ts"
      - "packages/agentplane/src/commands/shared/declared-check.ts"
      - "packages/agentplane/src/commands/shared/post-commit-pr-artifacts.ts"
      - "packages/agentplane/src/commands/shared/route-cleanup-probe.ts"
      - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
      - "packages/agentplane/src/commands/shared/route-decision-verification-blocker.ts"
      - "packages/agentplane/src/commands/shared/route-decision-verification.ts"
      - "packages/agentplane/src/commands/shared/route-decision.ts"
      - "packages/agentplane/src/commands/shared/route-gate-priority.ts"
      - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
      - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
      - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
      - "packages/agentplane/src/commands/shared/task-verification-input.test.ts"
      - "packages/agentplane/src/commands/shared/task-verification-input.ts"
      - "packages/agentplane/src/commands/shared/task-verification-record-parser.ts"
      - "packages/agentplane/src/commands/shared/task-verification-records.ts"
      - "packages/agentplane/src/commands/shared/task-verification-records.v2.test.ts"
      - "packages/agentplane/src/commands/task/begin.command.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor.ts"
      - "packages/agentplane/src/commands/task/complete.command.ts"
      - "packages/agentplane/src/commands/task/direct-task-supervisor-operation.ts"
      - "packages/agentplane/src/commands/task/direct-task-supervisor.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-supervisor.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/finish-blueprint-evidence.ts"
      - "packages/agentplane/src/commands/task/finish-close.ts"
      - "packages/agentplane/src/commands/task/finish-closeout-journal.test.ts"
      - "packages/agentplane/src/commands/task/finish-closeout-journal.testkit.ts"
      - "packages/agentplane/src/commands/task/finish-closeout-journal.ts"
      - "packages/agentplane/src/commands/task/finish-command.ts"
      - "packages/agentplane/src/commands/task/finish-execute-close.ts"
      - "packages/agentplane/src/commands/task/finish-execute.ts"
      - "packages/agentplane/src/commands/task/finish-plan.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/finish-types.ts"
      - "packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts"
      - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
      - "packages/agentplane/src/commands/task/finish.validation.unit.test.ts"
      - "packages/agentplane/src/commands/task/handoff.shared.ts"
      - "packages/agentplane/src/commands/task/mutation-parity.unit.test.ts"
      - "packages/agentplane/src/commands/task/new.spec.ts"
      - "packages/agentplane/src/commands/task/new.ts"
      - "packages/agentplane/src/commands/task/run.command.ts"
      - "packages/agentplane/src/commands/task/shared/transitions.ts"
      - "packages/agentplane/src/commands/task/start-ready.ts"
      - "packages/agentplane/src/commands/task/start.ts"
      - "packages/agentplane/src/commands/task/start.unit.test.ts"
      - "packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts"
      - "packages/agentplane/src/commands/task/task-execution-contract-observation.ts"
      - "packages/agentplane/src/commands/task/verify-record-execute.ts"
      - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
      - "packages/agentplane/src/commands/task/verify-record-references.ts"
      - "packages/agentplane/src/commands/task/verify-record.testkit.ts"
      - "packages/agentplane/src/commands/task/verify-record.unit.test.ts"
      - "packages/agentplane/src/runner/context/task-context.ts"
      - "packages/agentplane/src/runner/usecases/agent-work-order.ts"
      - "packages/agentplane/src/runner/usecases/task-run-authority.capabilities.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-authority.ts"
      - "packages/agentplane/src/runner/usecases/task-run-options.ts"
      - "packages/agentplane/src/runner/usecases/task-run.ts"
      - "packages/agentplane/src/runtime/task-execution-context/architecture-guard.test.ts"
      - "packages/agentplane/src/runtime/task-execution-context/index.ts"
      - "packages/agentplane/src/runtime/task-execution-context/resolve.test.ts"
      - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
      - "packages/agentplane/src/runtime/task-execution-context/types.ts"
      - "packages/agentplane/src/runtime/task-routing/index.ts"
      - "packages/agentplane/src/runtime/task-routing/resolve.ts"
      - "packages/agentplane/src/runtime/workspace-allocation/allocate.test.ts"
      - "packages/agentplane/src/runtime/workspace-allocation/allocate.ts"
      - "packages/agentplane/src/runtime/workspace-allocation/index.ts"
      - "packages/agentplane/src/runtime/workspace-allocation/lease.ts"
      - "packages/agentplane/src/runtime/workspace-allocation/types.ts"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "fail"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
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
          - ".agentplane/policy"
          - "AGENTS.md"
          - "docs"
          - "packages/agentplane"
          - "packages/core"
          - "scripts/baselines"
          - "scripts/checks"
        evidence_requirements:
          - "hosted_integration"
          - "implementation_risk_validation"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "material"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:bfccb645b4c6caf9ca00d3f59448ff4aa36d360c15dc50e9347c55dfa0a8a593"
      escalation_reasons:
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/declared-check.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/declared-check.ts"
        - "central_path:packages/agentplane/src/commands/shared/post-commit-pr-artifacts.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-cleanup-probe.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-blockers.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-verification-blocker.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-verification.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-gate-priority.ts"
        - "central_path:packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/side-effect-authority.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-verification-input-types.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-verification-input.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-verification-input.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-verification-record-parser.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-verification-records.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-verification-records.v2.test.ts"
        - "central_path:packages/agentplane/src/runtime/task-routing/index.ts"
        - "central_path:packages/agentplane/src/runtime/task-routing/resolve.ts"
        - "central_path:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "effect_public_api"
        - "effect_schema"
        - "effect_security_boundary"
        - "external_effect_requires_real_e2e"
        - "material_implementation_uncertainty"
        - "reversibility_recovery_required"
        - "unknown_path:scripts/baselines/v0.7-compatibility-candidate.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "docs"
          - "packages/agentplane"
          - "scripts"
        changed_files:
          - "docs/adr/0014-task-execution-authority.md"
          - "docs/adr/0015-task-workspace-isolation.md"
          - "docs/adr/0016-serialized-direct-integration.md"
          - "docs/adr/README.md"
          - "docs/developer/task-execution-authority.mdx"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
          - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
          - "packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.command.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-diff-evidence.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-evidence-compaction.test.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-execution-base.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-qualification-review.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-support.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-test-helpers.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-verification-contract.test.ts"
          - "packages/agentplane/src/commands/integrate-queue-direct.ts"
          - "packages/agentplane/src/commands/integrate-queue-lane.ts"
          - "packages/agentplane/src/commands/integrate-queue-reservation.ts"
          - "packages/agentplane/src/commands/integrate-queue.command.ts"
          - "packages/agentplane/src/commands/pr/flow-status.ts"
          - "packages/agentplane/src/commands/pr/integrate/queue-state-types.ts"
          - "packages/agentplane/src/commands/pr/integrate/queue-state.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/queue-state.ts"
          - "packages/agentplane/src/commands/pr/internal/sync.ts"
          - "packages/agentplane/src/commands/pr/open.ts"
          - "packages/agentplane/src/commands/provider-ops-results.test.ts"
          - "packages/agentplane/src/commands/shared/declared-check.test.ts"
          - "packages/agentplane/src/commands/shared/declared-check.ts"
          - "packages/agentplane/src/commands/shared/post-commit-pr-artifacts.ts"
          - "packages/agentplane/src/commands/shared/route-cleanup-probe.ts"
          - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
          - "packages/agentplane/src/commands/shared/route-decision-verification-blocker.ts"
          - "packages/agentplane/src/commands/shared/route-decision-verification.ts"
          - "packages/agentplane/src/commands/shared/route-decision.ts"
          - "packages/agentplane/src/commands/shared/route-gate-priority.ts"
          - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
          - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
          - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
          - "packages/agentplane/src/commands/shared/task-verification-input.test.ts"
          - "packages/agentplane/src/commands/shared/task-verification-input.ts"
          - "packages/agentplane/src/commands/shared/task-verification-record-parser.ts"
          - "packages/agentplane/src/commands/shared/task-verification-records.ts"
          - "packages/agentplane/src/commands/shared/task-verification-records.v2.test.ts"
          - "packages/agentplane/src/commands/task/begin.command.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor.ts"
          - "packages/agentplane/src/commands/task/complete.command.ts"
          - "packages/agentplane/src/commands/task/direct-task-supervisor-operation.ts"
          - "packages/agentplane/src/commands/task/direct-task-supervisor.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-supervisor.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/finish-blueprint-evidence.ts"
          - "packages/agentplane/src/commands/task/finish-close.ts"
          - "packages/agentplane/src/commands/task/finish-closeout-journal.test.ts"
          - "packages/agentplane/src/commands/task/finish-closeout-journal.testkit.ts"
          - "packages/agentplane/src/commands/task/finish-closeout-journal.ts"
          - "packages/agentplane/src/commands/task/finish-command.ts"
          - "packages/agentplane/src/commands/task/finish-execute-close.ts"
          - "packages/agentplane/src/commands/task/finish-execute.ts"
          - "packages/agentplane/src/commands/task/finish-plan.ts"
          - "packages/agentplane/src/commands/task/finish-shared.ts"
          - "packages/agentplane/src/commands/task/finish-types.ts"
          - "packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts"
          - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
          - "packages/agentplane/src/commands/task/finish.validation.unit.test.ts"
          - "packages/agentplane/src/commands/task/handoff.shared.ts"
          - "packages/agentplane/src/commands/task/mutation-parity.unit.test.ts"
          - "packages/agentplane/src/commands/task/new.spec.ts"
          - "packages/agentplane/src/commands/task/new.ts"
          - "packages/agentplane/src/commands/task/run.command.ts"
          - "packages/agentplane/src/commands/task/shared/transitions.ts"
          - "packages/agentplane/src/commands/task/start-ready.ts"
          - "packages/agentplane/src/commands/task/start.ts"
          - "packages/agentplane/src/commands/task/start.unit.test.ts"
          - "packages/agentplane/src/commands/task/task-execution-contract-observation.test.ts"
          - "packages/agentplane/src/commands/task/task-execution-contract-observation.ts"
          - "packages/agentplane/src/commands/task/verify-record-execute.ts"
          - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
          - "packages/agentplane/src/commands/task/verify-record-references.ts"
          - "packages/agentplane/src/commands/task/verify-record.testkit.ts"
          - "packages/agentplane/src/commands/task/verify-record.unit.test.ts"
          - "packages/agentplane/src/runner/context/task-context.ts"
          - "packages/agentplane/src/runner/usecases/agent-work-order.ts"
          - "packages/agentplane/src/runner/usecases/task-run-authority.capabilities.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-authority.ts"
          - "packages/agentplane/src/runner/usecases/task-run-options.ts"
          - "packages/agentplane/src/runner/usecases/task-run.ts"
          - "packages/agentplane/src/runtime/task-execution-context/architecture-guard.test.ts"
          - "packages/agentplane/src/runtime/task-execution-context/index.ts"
          - "packages/agentplane/src/runtime/task-execution-context/resolve.test.ts"
          - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
          - "packages/agentplane/src/runtime/task-execution-context/types.ts"
          - "packages/agentplane/src/runtime/task-routing/index.ts"
          - "packages/agentplane/src/runtime/task-routing/resolve.ts"
          - "packages/agentplane/src/runtime/workspace-allocation/allocate.test.ts"
          - "packages/agentplane/src/runtime/workspace-allocation/allocate.ts"
          - "packages/agentplane/src/runtime/workspace-allocation/index.ts"
          - "packages/agentplane/src/runtime/workspace-allocation/lease.ts"
          - "packages/agentplane/src/runtime/workspace-allocation/types.ts"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
        external_effects: []
        repository_effects:
          - "documentation"
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
      - "implementation_risk_validation"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
      - "verification_recovery:recorded-check-2"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 4af5cc08ac71. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The scoped implementation rework is complete, but the compatibility ratchet cannot pass until its reviewed candidate is regenerated outside the current writable roots. Recommended action: Approve a monotonic scope extension for scripts/baselines, regenerate the candidate with the canonical capture command, inspect the exact delta, and rerun full verification. Requested scope: roots=scripts/baselines; repository effects=public_api,repository_write,tests; request digest=sha256:584bb8d7bcfaf3d1a2ca0021fd0e6c3a4afc27308847dc4de6138e331e6da831. Agentplane receipt: external-agent-blocker/tr_d94fc4f5cd6d2c434dda06bacd31a3a2/sha256:c19c894801889b25eed38b41ee4fe321ee0b4e2ca026010c81dbcc832d3b7f50/sha256:584bb8d7bcfaf3d1a2ca0021fd0e6c3a4afc27308847dc4de6138e331e6da831."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: scripts/baselines; repository effects: public_api, repository_write, tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 343f8f2cc460. CLI accepted one state-bound external-agent semantic result."
  -
    author: "USER"
    body: "Resume after the approved compatibility scope extension; continue bounded compatibility provenance and verification rework."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The regenerated candidate is current, but exact source-task provenance cannot be qualified within the present scope because the ratchet enforces its reviewed inventories in scripts/checks. Recommended action: Approve scripts/checks, add J459C2 to the exact cumulative and CLI provenance inventories without weakening any digest or delta assertion, correct the candidate attribution, and rerun the ratchet and full CI. Requested scope: roots=scripts/checks; repository effects=public_api,repository_write,source_code,tests; request digest=sha256:eb3d382bc71aba5cb34061656c6efd92eb3e0e55116e1211e41ae0eb00f8452c. Agentplane receipt: external-agent-blocker/tr_4627b827ccc36adfbf85d7ebbda87cdd/sha256:248e58ed2093667fb317822248a204ab36ec1f382cb8bf1f3258c37438e39209/sha256:eb3d382bc71aba5cb34061656c6efd92eb3e0e55116e1211e41ae0eb00f8452c."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: scripts/checks; repository effects: public_api, repository_write, source_code, tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: dbd6c6314f05. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Operator recovery: the deterministic hotspot and oversized-test blockers were resolved; ci:local:fast passed with ok=true."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 800556be3abb. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-20T15:49:58.075Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-20T17:32:38.608Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    commit: "3e09cc43f711a7c8d7596eb211b2ecb1594d1bcc"
  -
    type: "verify"
    at: "2026-08-20T17:34:16.087Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check could not run: ap doctor"
  -
    type: "status"
    at: "2026-08-20T17:37:11.274Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    commit: "8ef07fb44120b40ada07c915f4b381b08a9c052a"
  -
    type: "verify"
    at: "2026-08-20T17:44:05.963Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:fast"
  -
    type: "status"
    at: "2026-08-20T17:46:46.740Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 4af5cc08ac71. CLI accepted one state-bound external-agent semantic result."
    commit: "4af5cc08ac71b4a79c5536b95bcc810699cc5dd7"
  -
    type: "verify"
    at: "2026-08-20T17:54:08.176Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Compatibility candidate is stale and requires an approved scripts/baselines scope extension."
  -
    type: "status"
    at: "2026-08-20T17:54:59.739Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The scoped implementation rework is complete, but the compatibility ratchet cannot pass until its reviewed candidate is regenerated outside the current writable roots. Recommended action: Approve a monotonic scope extension for scripts/baselines, regenerate the candidate with the canonical capture command, inspect the exact delta, and rerun full verification. Requested scope: roots=scripts/baselines; repository effects=public_api,repository_write,tests; request digest=sha256:584bb8d7bcfaf3d1a2ca0021fd0e6c3a4afc27308847dc4de6138e331e6da831. Agentplane receipt: external-agent-blocker/tr_d94fc4f5cd6d2c434dda06bacd31a3a2/sha256:c19c894801889b25eed38b41ee4fe321ee0b4e2ca026010c81dbcc832d3b7f50/sha256:584bb8d7bcfaf3d1a2ca0021fd0e6c3a4afc27308847dc4de6138e331e6da831."
  -
    type: "status"
    at: "2026-08-20T17:58:47.852Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 343f8f2cc460. CLI accepted one state-bound external-agent semantic result."
    commit: "343f8f2cc4606b01b7b3dc5fa2c22d1383de5abf"
  -
    type: "verify"
    at: "2026-08-20T18:05:48.824Z"
    author: "TESTER"
    state: "blocked_external"
    note: "Compatibility provenance enforcement requires a bounded scripts/checks scope extension; full-fast also exposed parallel cloud-backend failures for focused diagnosis."
  -
    type: "status"
    at: "2026-08-20T18:06:17.963Z"
    author: "USER"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume after the approved compatibility scope extension; continue bounded compatibility provenance and verification rework."
  -
    type: "status"
    at: "2026-08-20T18:07:05.919Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The regenerated candidate is current, but exact source-task provenance cannot be qualified within the present scope because the ratchet enforces its reviewed inventories in scripts/checks. Recommended action: Approve scripts/checks, add J459C2 to the exact cumulative and CLI provenance inventories without weakening any digest or delta assertion, correct the candidate attribution, and rerun the ratchet and full CI. Requested scope: roots=scripts/checks; repository effects=public_api,repository_write,source_code,tests; request digest=sha256:eb3d382bc71aba5cb34061656c6efd92eb3e0e55116e1211e41ae0eb00f8452c. Agentplane receipt: external-agent-blocker/tr_4627b827ccc36adfbf85d7ebbda87cdd/sha256:248e58ed2093667fb317822248a204ab36ec1f382cb8bf1f3258c37438e39209/sha256:eb3d382bc71aba5cb34061656c6efd92eb3e0e55116e1211e41ae0eb00f8452c."
  -
    type: "status"
    at: "2026-08-20T18:48:09.099Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: dbd6c6314f05. CLI accepted one state-bound external-agent semantic result."
    commit: "dbd6c6314f054b0c52b1566b3001879a39547253"
  -
    type: "verify"
    at: "2026-08-20T19:07:59.191Z"
    author: "SUPERVISOR"
    state: "blocked_external"
    note: "Rework: Declared check failed: bun run ci:local:fast"
  -
    type: "status"
    at: "2026-08-20T19:36:02.643Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Operator recovery: the deterministic hotspot and oversized-test blockers were resolved; ci:local:fast passed with ok=true."
  -
    type: "status"
    at: "2026-08-20T19:37:28.220Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 800556be3abb. CLI accepted one state-bound external-agent semantic result."
    commit: "800556be3abbe1800f28ca8de31ed17640563906"
  -
    type: "verify"
    at: "2026-08-20T20:03:19.312Z"
    author: "SUPERVISOR"
    state: "blocked_external"
    note: "Rework: Declared check failed: bun run ci:local:fast"
doc_version: 3
doc_updated_at: "2026-08-20T20:03:21.116Z"
doc_updated_by: "SUPERVISOR"
description: "Implement the complete approved AP-0001 through AP-1004 roadmap in one AgentPlane-managed working branch. Introduce TaskExecutionContext and TaskCommandContext as lifecycle authority; separate WorkspaceAllocationContext and private leases from route selection; make auto the default route and retire user-facing repository route; load authoritative task state in two phases; bind verification identity v4 and finish to the frozen task base identity; extend the existing serialized integration queue for direct isolated workspaces; enforce managed-runner side-effect capabilities and deterministic direct-to-branch_pr escalation; remove legacy runtime semantics; add architecture guards, migration, ADRs, and all ten acceptance scenarios. Preserve the reconciled NMAHN5 commit already present on the local base. Use base_ref plus base_sha, reject mixed batch contexts, keep absolute paths out of semantic digests, use idempotent closeout journaling rather than pretending Git and filesystem writes are atomic, and do not create a second competing integration queue."
sections:
  Summary: |-
    Make task execution authority local and direct execution workspace-safe

    Implement the complete approved AP-0001 through AP-1004 roadmap in one AgentPlane-managed working branch. Introduce TaskExecutionContext and TaskCommandContext as lifecycle authority; separate WorkspaceAllocationContext and private leases from route selection; make auto the default route and retire user-facing repository route; load authoritative task state in two phases; bind verification identity v4 and finish to the frozen task base identity; extend the existing serialized integration queue for direct isolated workspaces; enforce managed-runner side-effect capabilities and deterministic direct-to-branch_pr escalation; remove legacy runtime semantics; add architecture guards, migration, ADRs, and all ten acceptance scenarios. Preserve the reconciled NMAHN5 commit already present on the local base. Use base_ref plus base_sha, reject mixed batch contexts, keep absolute paths out of semantic digests, use idempotent closeout journaling rather than pretending Git and filesystem writes are atomic, and do not create a second competing integration queue.
  Scope: |-
    - In scope: Implement the complete approved AP-0001 through AP-1004 roadmap in one AgentPlane-managed working branch. Introduce TaskExecutionContext and TaskCommandContext as lifecycle authority; separate WorkspaceAllocationContext and private leases from route selection; make auto the default route and retire user-facing repository route; load authoritative task state in two phases; bind verification identity v4 and finish to the frozen task base identity; extend the existing serialized integration queue for direct isolated workspaces; enforce managed-runner side-effect capabilities and deterministic direct-to-branch_pr escalation; remove legacy runtime semantics; add architecture guards, migration, ADRs, and all ten acceptance scenarios. Preserve the reconciled NMAHN5 commit already present on the local base. Use base_ref plus base_sha, reject mixed batch contexts, keep absolute paths out of semantic digests, use idempotent closeout journaling rather than pretending Git and filesystem writes are atomic, and do not create a second competing integration queue.
    - Out of scope: unrelated refactors not required for "Make task execution authority local and direct execution workspace-safe".
  Plan: |-
    1. Establish test-first regression coverage for repository-direct/task-branch_pr finish, risk-driven route escalation, custom workflow_dir, frozen base identity, and parallel direct isolation; keep every published commit green rather than merging red tests.
    2. Add TaskExecutionContext and TaskCommandContext with one resolver. Bind selected route, route provenance, compatible task batch, authoritative task source, base_ref, and immutable base_sha without mutating CommandContext; retain only a deprecated compatibility wrapper and add static guards against lifecycle reads of repository workflow_mode.
    3. Make auto the creation default, remove user-facing repository route, normalize legacy records on read, unify create/new routing, and preserve branch_pr as the repository safety floor.
    4. Implement two-phase authoritative task loading and migrate route oracle, task run, PR lifecycle, quality/evaluator, verification, and finish callers to TaskCommandContext. Reject mixed-mode or mixed-base batches.
    5. Add WorkspaceAllocationContext and a route-independent allocator. Default automated direct and branch_pr execution to isolated worktrees; keep base checkout behind a single-writer lease. Persist leases and absolute paths only in private Git-common runtime state, preserve reachable implementation commits, and fail closed during cleanup.
    6. Introduce verification input identity v4 using TaskExecutionContext, base_ref plus base_sha, route/task digests, and workspace-neutral inputs. Migrate callers to assessment-first diagnostics with exact invalidation reasons and explicit v3 audit-only compatibility.
    7. Rebuild finish around the loaded task context and an idempotent CAS-backed closeout journal with prepared, task_state_written, close_commit_written, completed, and recovery_required phases. Route verification, close-tail selection, base validation, and direct-lock cleanup exclusively through selected_mode.
    8. Generalize the existing serialized integration queue for direct implementation candidates instead of creating a competing queue. Recheck base identity, conflicts, semantic equivalence, and verification freshness before integration; preserve explicit conflict_rework and parallel A/B/C coverage.
    9. Enforce declared capabilities before managed-runner invocation, retain post-run observation as defense in depth, and implement evidence-preserving direct-to-branch_pr escalation without unnecessary executor replay. Do not claim arbitrary shell execution is sandboxed.
    10. Delete migrated legacy runtime semantics, add read-time migration and architecture guards, record ADRs for task authority, workspace isolation, and serialized integration, then run focused suites, typecheck, policy routing, doctor, full local CI, independent evaluator review, and all ten end-to-end acceptance cases. Stop for any scope outside the declared roots, verification-contract weakening, destructive migration, credentials, deployment, publication, or provider action; require fresh approval at those boundaries.
  Verify Steps: |-
    PLANNER fallback scaffold for "Make task execution authority local and direct execution workspace-safe". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Make task execution authority local and direct execution workspace-safe". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-20T17:34:16.087Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check could not run: ap doctor
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:e95916a498450aa86dfb1a92de95e8cd0aa419e0d42ae99cfe78e38450442c5b

    Details:

    Command: ap doctor
    Result: fail
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608200903-J459C2 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
    - old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608200903-J459C2

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608200903-J459C2
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-20T17:44:05.963Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:fast
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:249cb163508c1bac1d16e89383875b6ff4fe27636a5abdfc261aa7eb12883b7a

    Details:

    Command: ap doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608200903-J459C2 declared verification

    Command: bun run ci:local:fast
    Result: fail
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608200903-J459C2 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
    - old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608200903-J459C2

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608200903-J459C2
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-20T17:54:08.176Z — VERIFY — needs_rework

    By: TESTER

    Note: Compatibility candidate is stale and requires an approved scripts/baselines scope extension.
    Attempts: 3

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:20f0a5eb9dfdf544213f233633de78de77605f7a49f36ae91b0416353cd0be3c

    Details:

    Check: full_regression
    Command: bun run ci:local:fast
    Result: fail
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608200903-J459C2 compatibility ratchet

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
    - old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608200903-J459C2

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608200903-J459C2
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-20T18:05:48.824Z — VERIFY — blocked_external

    By: TESTER

    Note: Compatibility provenance enforcement requires a bounded scripts/checks scope extension; full-fast also exposed parallel cloud-backend failures for focused diagnosis.
    Attempts: 4

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:27a80bcfa9e4b730df9ad5086add2e92e317e7ef942c8c66bcdaddcf1c0ded67

    Details:

    Check: full_regression
    Command: bun run ci:local:fast
    Result: fail
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608200903-J459C2 compatibility and full regression

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
    - old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608200903-J459C2

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608200903-J459C2
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-20T19:07:59.191Z — VERIFY — blocked_external

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:fast
    Attempts: 5

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:a3618abf609425382fa25c55af7e31dfdc19551280b8995dba4ac3b607ad191a

    Details:

    Command: ap doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608200903-J459C2 declared verification

    Command: bun run ci:local:fast
    Result: fail
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608200903-J459C2 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
    - old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608200903-J459C2

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608200903-J459C2
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-20T20:03:19.312Z — VERIFY — blocked_external

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:fast
    Attempts: 6

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:acf2ef6088d1e222485ae4ec08654d8c23fd2ca5c1e5b44f0fd9bd50e4883561

    Details:

    Command: ap doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608200903-J459C2 declared verification

    Command: bun run ci:local:fast
    Result: fail
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608200903-J459C2 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
    - old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608200903-J459C2

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608200903-J459C2
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
  agentplane.scope_extension_request:
    applied_at: "2026-08-20T18:07:27.984Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:248e58ed2093667fb317822248a204ab36ec1f382cb8bf1f3258c37438e39209"
    kind: "task_scope_extension_request"
    request:
      rationale: "The ratchet intentionally hard-codes reviewed source-task inventories. Updating those exact inventories is required to preserve provenance for the intentional CLI topology change; no assertion or immutable baseline anchor will be relaxed."
      repository_effects:
        - "public_api"
        - "repository_write"
        - "source_code"
        - "tests"
      schema_version: 1
      scope_roots:
        - "scripts/checks"
    request_digest: "sha256:eb3d382bc71aba5cb34061656c6efd92eb3e0e55116e1211e41ae0eb00f8452c"
    schema_version: 1
    status: "applied"
    transition_id: "tr_4627b827ccc36adfbf85d7ebbda87cdd"
  implementation_commit:
    hash: "800556be3abbe1800f28ca8de31ed17640563906"
  task_execution_context:
    base_ref: "main"
    base_sha: "292b232b3160b22c47c6cc206fade625e9377fed"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "292b232b3160b22c47c6cc206fade625e9377fed"
    version: 1
id_source: "generated"
---
## Summary

Make task execution authority local and direct execution workspace-safe

Implement the complete approved AP-0001 through AP-1004 roadmap in one AgentPlane-managed working branch. Introduce TaskExecutionContext and TaskCommandContext as lifecycle authority; separate WorkspaceAllocationContext and private leases from route selection; make auto the default route and retire user-facing repository route; load authoritative task state in two phases; bind verification identity v4 and finish to the frozen task base identity; extend the existing serialized integration queue for direct isolated workspaces; enforce managed-runner side-effect capabilities and deterministic direct-to-branch_pr escalation; remove legacy runtime semantics; add architecture guards, migration, ADRs, and all ten acceptance scenarios. Preserve the reconciled NMAHN5 commit already present on the local base. Use base_ref plus base_sha, reject mixed batch contexts, keep absolute paths out of semantic digests, use idempotent closeout journaling rather than pretending Git and filesystem writes are atomic, and do not create a second competing integration queue.

## Scope

- In scope: Implement the complete approved AP-0001 through AP-1004 roadmap in one AgentPlane-managed working branch. Introduce TaskExecutionContext and TaskCommandContext as lifecycle authority; separate WorkspaceAllocationContext and private leases from route selection; make auto the default route and retire user-facing repository route; load authoritative task state in two phases; bind verification identity v4 and finish to the frozen task base identity; extend the existing serialized integration queue for direct isolated workspaces; enforce managed-runner side-effect capabilities and deterministic direct-to-branch_pr escalation; remove legacy runtime semantics; add architecture guards, migration, ADRs, and all ten acceptance scenarios. Preserve the reconciled NMAHN5 commit already present on the local base. Use base_ref plus base_sha, reject mixed batch contexts, keep absolute paths out of semantic digests, use idempotent closeout journaling rather than pretending Git and filesystem writes are atomic, and do not create a second competing integration queue.
- Out of scope: unrelated refactors not required for "Make task execution authority local and direct execution workspace-safe".

## Plan

1. Establish test-first regression coverage for repository-direct/task-branch_pr finish, risk-driven route escalation, custom workflow_dir, frozen base identity, and parallel direct isolation; keep every published commit green rather than merging red tests.
2. Add TaskExecutionContext and TaskCommandContext with one resolver. Bind selected route, route provenance, compatible task batch, authoritative task source, base_ref, and immutable base_sha without mutating CommandContext; retain only a deprecated compatibility wrapper and add static guards against lifecycle reads of repository workflow_mode.
3. Make auto the creation default, remove user-facing repository route, normalize legacy records on read, unify create/new routing, and preserve branch_pr as the repository safety floor.
4. Implement two-phase authoritative task loading and migrate route oracle, task run, PR lifecycle, quality/evaluator, verification, and finish callers to TaskCommandContext. Reject mixed-mode or mixed-base batches.
5. Add WorkspaceAllocationContext and a route-independent allocator. Default automated direct and branch_pr execution to isolated worktrees; keep base checkout behind a single-writer lease. Persist leases and absolute paths only in private Git-common runtime state, preserve reachable implementation commits, and fail closed during cleanup.
6. Introduce verification input identity v4 using TaskExecutionContext, base_ref plus base_sha, route/task digests, and workspace-neutral inputs. Migrate callers to assessment-first diagnostics with exact invalidation reasons and explicit v3 audit-only compatibility.
7. Rebuild finish around the loaded task context and an idempotent CAS-backed closeout journal with prepared, task_state_written, close_commit_written, completed, and recovery_required phases. Route verification, close-tail selection, base validation, and direct-lock cleanup exclusively through selected_mode.
8. Generalize the existing serialized integration queue for direct implementation candidates instead of creating a competing queue. Recheck base identity, conflicts, semantic equivalence, and verification freshness before integration; preserve explicit conflict_rework and parallel A/B/C coverage.
9. Enforce declared capabilities before managed-runner invocation, retain post-run observation as defense in depth, and implement evidence-preserving direct-to-branch_pr escalation without unnecessary executor replay. Do not claim arbitrary shell execution is sandboxed.
10. Delete migrated legacy runtime semantics, add read-time migration and architecture guards, record ADRs for task authority, workspace isolation, and serialized integration, then run focused suites, typecheck, policy routing, doctor, full local CI, independent evaluator review, and all ten end-to-end acceptance cases. Stop for any scope outside the declared roots, verification-contract weakening, destructive migration, credentials, deployment, publication, or provider action; require fresh approval at those boundaries.

## Verify Steps

PLANNER fallback scaffold for "Make task execution authority local and direct execution workspace-safe". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Make task execution authority local and direct execution workspace-safe". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-20T17:34:16.087Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check could not run: ap doctor
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:e95916a498450aa86dfb1a92de95e8cd0aa419e0d42ae99cfe78e38450442c5b

Details:

Command: ap doctor
Result: fail
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608200903-J459C2 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
- old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608200903-J459C2

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608200903-J459C2
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-20T17:44:05.963Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:fast
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:249cb163508c1bac1d16e89383875b6ff4fe27636a5abdfc261aa7eb12883b7a

Details:

Command: ap doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608200903-J459C2 declared verification

Command: bun run ci:local:fast
Result: fail
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608200903-J459C2 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
- old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608200903-J459C2

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608200903-J459C2
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-20T17:54:08.176Z — VERIFY — needs_rework

By: TESTER

Note: Compatibility candidate is stale and requires an approved scripts/baselines scope extension.
Attempts: 3

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:20f0a5eb9dfdf544213f233633de78de77605f7a49f36ae91b0416353cd0be3c

Details:

Check: full_regression
Command: bun run ci:local:fast
Result: fail
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608200903-J459C2 compatibility ratchet

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
- old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608200903-J459C2

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608200903-J459C2
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-20T18:05:48.824Z — VERIFY — blocked_external

By: TESTER

Note: Compatibility provenance enforcement requires a bounded scripts/checks scope extension; full-fast also exposed parallel cloud-backend failures for focused diagnosis.
Attempts: 4

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:27a80bcfa9e4b730df9ad5086add2e92e317e7ef942c8c66bcdaddcf1c0ded67

Details:

Check: full_regression
Command: bun run ci:local:fast
Result: fail
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608200903-J459C2 compatibility and full regression

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
- old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608200903-J459C2

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608200903-J459C2
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-20T19:07:59.191Z — VERIFY — blocked_external

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:fast
Attempts: 5

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:a3618abf609425382fa25c55af7e31dfdc19551280b8995dba4ac3b607ad191a

Details:

Command: ap doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608200903-J459C2 declared verification

Command: bun run ci:local:fast
Result: fail
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608200903-J459C2 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
- old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608200903-J459C2

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608200903-J459C2
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-20T20:03:19.312Z — VERIFY — blocked_external

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:fast
Attempts: 6

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:acf2ef6088d1e222485ae4ec08654d8c23fd2ca5c1e5b44f0fd9bd50e4883561

Details:

Command: ap doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608200903-J459C2 declared verification

Command: bun run ci:local:fast
Result: fail
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608200903-J459C2 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
- old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608200903-J459C2

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608200903-J459C2
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
