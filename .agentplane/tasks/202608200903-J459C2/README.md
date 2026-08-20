---
id: "202608200903-J459C2"
title: "Make task execution authority local and direct execution workspace-safe"
result_summary: "pre-merge closure"
status: "BLOCKED"
priority: "high"
owner: "CODER"
revision: 61
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
  state: "needs_rework"
  updated_at: "2026-08-20T22:15:16.257Z"
  updated_by: "USER"
  note: "Exact-head hosted CI run 32422225125 failed required verify-static and verify-contract checks: 13 unused AgentPlane CLI exports exceed the zero Knip budget; four documentation social images are missing and the generated manifest is stale. Reopen implementation for bounded remediation."
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-20T21:58:43.143Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 4 typed finding(s)."
  evaluated_sha: "bf575676346cab8e27c40c30fb0378ddedaf913b"
  blueprint_digest: "f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518"
  evidence_refs:
    - ".agentplane/tasks/202608200903-J459C2/quality/20260820-215727699-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608200903-J459C2/quality/20260820-215727699-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608200903-J459C2/quality/objects/sha256/45ec249fe21e51ec372d25efff3021531912c9ab9d63b734e1bae40cf270bec0.md"
    - ".agentplane/tasks/202608200903-J459C2/quality/20260820-215727699-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608200903-J459C2/quality/20260820-215727699-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608200903-J459C2/quality/20260820-215727699-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608200903-J459C2/README.md"
    - ".agentplane/tasks/202608200903-J459C2/quality/objects/sha256/d2c2c36c120feed7b0eaa3c759db712715a31e3fd08c3bfc177b82d9d157c4a1.patch"
    - ".agentplane/tasks/202608200903-J459C2/quality/objects/sha256/53fa3e81582cdf8b26a097dee34f53e2d2a88704c8dc302da2277040a82890e8.json"
    - ".agentplane/tasks/202608200903-J459C2/verification/20260820215715353-4b437de31b81b8de.json"
    - ".agentplane/tasks/202608200903-J459C2/quality/objects/sha256/a266df3b865d99cb62af6a582bb17bb986f2ecaa45fdbe0c03341b3c6bd67d02.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "No unresolved implementation finding in the scoped execution-context plumbing change."
    - "The finish call site supplies plan.execution and the verification gate requires and forwards it to hasAcceptedVerificationRecord."
    - "Regression coverage asserts the exact execution context reaches the verification target, while the full supervisor check set passes for implementation SHA bf5756763."
    - "Residual risk: Hosted provider checks must pass for the exact published pre-merge head."
token_usage:
  agent_runs: 17
  input_tokens: null
  journal_digest: "sha256:3cb1d7f11e08ba57fd2266af684c0126cdf54f8152e734c7877724cd38c893fb"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-20T21:58:58.992Z"
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
      - "verification:verification-record:fail"
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
      - "packages/agentplane/src/commands/task/finish-execute-commit.ts"
      - "packages/agentplane/src/commands/task/finish-execute.ts"
      - "packages/agentplane/src/commands/task/finish-plan.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/finish-types.ts"
      - "packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts"
      - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
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
      - "scripts/checks/run-local-ci.mjs"
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
        id: "verification-record"
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
      digest: "sha256:d073033b175d7bffccbc74964ab576051e34104a3669f81e142daf2a469ddeea"
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
        - "central_path:scripts/checks/run-local-ci.mjs"
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
          - "packages/agentplane/src/commands/task/finish-execute-commit.ts"
          - "packages/agentplane/src/commands/task/finish-execute.ts"
          - "packages/agentplane/src/commands/task/finish-plan.ts"
          - "packages/agentplane/src/commands/task/finish-shared.ts"
          - "packages/agentplane/src/commands/task/finish-types.ts"
          - "packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts"
          - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
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
          - "scripts/checks/run-local-ci.mjs"
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
      - "verification_recovery:verification-record"
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
  -
    author: "CODER"
    body: "Operator recovery: full-fast reproduced a cross-group cloud-test race; core passes 574/574 in isolation. Stabilize the full-fast scheduler so core does not overlap another Vitest group."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 811850d00776. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Operator recovery: ambient AGENTPLANE_CLOUD_PROVIDER deterministically reproduces the exact 5-file/9-test declared-check failure. Sanitize all cloud overrides in local CI child environments and restore the original group scheduler."
  -
    author: "CODER"
    body: "Resume after recorded verification rework. The blocker is locally actionable and in approved scope: sanitize AGENTPLANE_CLOUD_* from the local CI child environment, remove the ineffective two-wave scheduler workaround, and rerun the declared verification contract."
  -
    author: "CODER"
    body: "Bind the current implementation head for interrupted verification recovery; known rework remains the AGENTPLANE_CLOUD_* CI environment leak."
  -
    author: "CODER"
    body: "Resume after the completed verification-rework operation. Implement the confirmed local-CI environment sanitization and remove the ineffective scheduler workaround."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 04fba6883822. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The evaluator rework is limited to the protected canonical task document and cannot be applied inside this implementation episode's writable roots. Recommended action: Use agentplane task doc set for Verify Steps and Findings with the evaluator-requested task-specific content, record the resulting task artifact commit through AgentPlane, then rerun verification and quality review. Agentplane receipt: external-agent-blocker/tr_dbb14e746b8de31317dc8dc798b3dd9a/sha256:94350d11702831ba366de4d803f2423b6b7a63d03228e1e3efa939531b576803."
  -
    author: "CODER"
    body: "Resolve quality rework: replace fallback verification with task-specific acceptance and record final findings."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 08f0b1161f6d. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: bf575676346c. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. Hosted CI exposed two scoped findings: 13 unused AgentPlane CLI exports and four missing documentation social images with a stale manifest. The code cleanup is inside the current authority, but the required generated website assets are not. Recommended action: Approve website scope, remove only the newly unused AgentPlane CLI exports without widening the Knip baseline, regenerate the four social images and manifest, then run the focused contracts and full task verification. Requested scope: roots=website; repository effects=documentation,repository_write; request digest=sha256:5bca2cd0e74052da35f1f4e671c1edc7c17fffd09aa6f31f4cdac9fae6564673. Agentplane receipt: external-agent-blocker/tr_dac0473f16b6ada2a5ee7894f215b1ed/sha256:e53b99dbae48300d982e439e7c1a07c8a7ac14a0b19b8abba52fba6dd90b8b62/sha256:5bca2cd0e74052da35f1f4e671c1edc7c17fffd09aa6f31f4cdac9fae6564673."
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
  -
    type: "status"
    at: "2026-08-20T20:04:58.230Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Operator recovery: full-fast reproduced a cross-group cloud-test race; core passes 574/574 in isolation. Stabilize the full-fast scheduler so core does not overlap another Vitest group."
  -
    type: "status"
    at: "2026-08-20T20:14:02.992Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 811850d00776. CLI accepted one state-bound external-agent semantic result."
    commit: "811850d00776e5d7a28e960e89660de3e0f7278f"
  -
    type: "status"
    at: "2026-08-20T20:26:46.631Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Operator recovery: ambient AGENTPLANE_CLOUD_PROVIDER deterministically reproduces the exact 5-file/9-test declared-check failure. Sanitize all cloud overrides in local CI child environments and restore the original group scheduler."
  -
    type: "verify"
    at: "2026-08-20T20:29:46.554Z"
    author: "TESTER"
    state: "blocked_external"
    note: "Full regression is non-hermetic: the declared-check environment leaks AGENTPLANE_CLOUD_* into cloud backend tests, causing deterministic cloud_projection_adoption_required failures. Sanitize cloud override variables in the local CI launcher, then rerun the full contract."
  -
    type: "status"
    at: "2026-08-20T20:30:11.569Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume after recorded verification rework. The blocker is locally actionable and in approved scope: sanitize AGENTPLANE_CLOUD_* from the local CI child environment, remove the ineffective two-wave scheduler workaround, and rerun the declared verification contract."
  -
    type: "status"
    at: "2026-08-20T20:32:34.152Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Bind the current implementation head for interrupted verification recovery; known rework remains the AGENTPLANE_CLOUD_* CI environment leak."
    commit: "811850d00776e5d7a28e960e89660de3e0f7278f"
  -
    type: "verify"
    at: "2026-08-20T20:40:29.256Z"
    author: "SUPERVISOR"
    state: "blocked_external"
    note: "Rework: Declared check failed: bun run ci:local:fast"
  -
    type: "status"
    at: "2026-08-20T20:40:59.860Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume after the completed verification-rework operation. Implement the confirmed local-CI environment sanitization and remove the ineffective scheduler workaround."
  -
    type: "status"
    at: "2026-08-20T20:50:03.510Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 04fba6883822. CLI accepted one state-bound external-agent semantic result."
    commit: "04fba6883822aac4eb0de48f8db40196dfff5353"
  -
    type: "verify"
    at: "2026-08-20T20:56:24.530Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-20T20:58:52.434Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The evaluator rework is limited to the protected canonical task document and cannot be applied inside this implementation episode's writable roots. Recommended action: Use agentplane task doc set for Verify Steps and Findings with the evaluator-requested task-specific content, record the resulting task artifact commit through AgentPlane, then rerun verification and quality review. Agentplane receipt: external-agent-blocker/tr_dbb14e746b8de31317dc8dc798b3dd9a/sha256:94350d11702831ba366de4d803f2423b6b7a63d03228e1e3efa939531b576803."
  -
    type: "status"
    at: "2026-08-20T20:59:55.604Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Resolve quality rework: replace fallback verification with task-specific acceptance and record final findings."
  -
    type: "verify"
    at: "2026-08-20T21:06:35.044Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  -
    type: "verify"
    at: "2026-08-20T21:11:53.489Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Pre-merge finish fails after evaluator and task-document commits because implementation commit normalization stops after one task-artifact layer; resolve the complete task-only first-parent tail to the verified code commit and add regression coverage."
  -
    type: "status"
    at: "2026-08-20T21:15:23.148Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 08f0b1161f6d. CLI accepted one state-bound external-agent semantic result."
    commit: "08f0b1161f6d5c53f75f63b8562bd9f76ed9e235"
  -
    type: "verify"
    at: "2026-08-20T21:24:46.131Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "verify"
    at: "2026-08-20T21:29:32.773Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Finish resolves the verified implementation SHA correctly but validates the v4 record through the legacy workflow-mode identity because assertQualityReviewBeforeFinish omits plan.execution. Pass the frozen TaskExecutionContext into verification assessment and add regression coverage."
  -
    type: "status"
    at: "2026-08-20T21:31:51.994Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: bf575676346c. CLI accepted one state-bound external-agent semantic result."
    commit: "bf575676346cab8e27c40c30fb0378ddedaf913b"
  -
    type: "verify"
    at: "2026-08-20T21:57:15.353Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  -
    type: "status"
    at: "2026-08-20T21:58:58.992Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "afa10019f6843124492b8d1552e9dac6136baed7"
  -
    type: "verify"
    at: "2026-08-20T22:15:16.257Z"
    author: "USER"
    state: "needs_rework"
    note: "Exact-head hosted CI run 32422225125 failed required verify-static and verify-contract checks: 13 unused AgentPlane CLI exports exceed the zero Knip budget; four documentation social images are missing and the generated manifest is stale. Reopen implementation for bounded remediation."
  -
    type: "status"
    at: "2026-08-20T22:16:30.214Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. Hosted CI exposed two scoped findings: 13 unused AgentPlane CLI exports and four missing documentation social images with a stale manifest. The code cleanup is inside the current authority, but the required generated website assets are not. Recommended action: Approve website scope, remove only the newly unused AgentPlane CLI exports without widening the Knip baseline, regenerate the four social images and manifest, then run the focused contracts and full task verification. Requested scope: roots=website; repository effects=documentation,repository_write; request digest=sha256:5bca2cd0e74052da35f1f4e671c1edc7c17fffd09aa6f31f4cdac9fae6564673. Agentplane receipt: external-agent-blocker/tr_dac0473f16b6ada2a5ee7894f215b1ed/sha256:e53b99dbae48300d982e439e7c1a07c8a7ac14a0b19b8abba52fba6dd90b8b62/sha256:5bca2cd0e74052da35f1f4e671c1edc7c17fffd09aa6f31f4cdac9fae6564673."
doc_version: 3
doc_updated_at: "2026-08-20T22:16:30.275Z"
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
    1. Run focused task-authority and route tests. Expected: TaskExecutionContext and TaskCommandContext own selected_mode, route provenance, authoritative task source, base_ref, and frozen base_sha; repository workflow_mode is not read as runtime authority.
    2. Run focused workspace-allocation and batch-context tests. Expected: automated direct and branch_pr work receive isolated leases, base checkout remains single-writer, private paths stay outside semantic digests, and mixed route/base batches fail closed.
    3. Run focused verification and finish tests. Expected: verification identity v4 is workspace-neutral and bound to frozen task/base identity; v3 is audit-only; closeout journal recovery is idempotent across prepared, task_state_written, close_commit_written, completed, and recovery_required phases.
    4. Run focused integration-queue and managed-runner tests. Expected: the existing serialized queue handles direct candidates, rechecks base/conflicts/equivalence/freshness, preserves conflict_rework, rejects undeclared capabilities before invocation, and escalates direct to branch_pr without unnecessary executor replay.
    5. Exercise the ten end-to-end acceptance scenarios: repository-direct finish, task branch_pr finish, risk-driven escalation, custom workflow_dir, frozen base identity, parallel direct isolation, mixed-context rejection, workspace-neutral verification identity, interrupted closeout recovery, and serialized parallel A/B/C integration.
    6. Run node --check scripts/checks/run-local-ci.mjs, bunx prettier --check scripts/checks/run-local-ci.mjs, bunx eslint scripts/checks/run-local-ci.mjs, and git diff --check. Expected: the CI hermeticity rework is syntactically and structurally clean.
    7. Run AGENTPLANE_CLOUD_PROVIDER=ambient-provider bun run ci:local:fast. Expected: all five verification groups execute and verification_metrics reports ok=true, proving cloud fixture identity is not overridden by the parent environment.
    8. Run ap doctor, bun run ci:local:fast, bun run typecheck, and node .agentplane/policy/check-routing.mjs. Expected: every declared local check passes without weakening the verification contract.
    9. Perform independent EVALUATOR review against the frozen diff and acceptance evidence. Expected: verdict pass with no unresolved implementation finding.
    10. Publish the exact task head, require hosted checks for that SHA, integrate through the AgentPlane queue, and verify provider readback plus main ancestry before closure.
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

    ### 2026-08-20T20:29:46.554Z — VERIFY — blocked_external

    By: TESTER

    Note: Full regression is non-hermetic: the declared-check environment leaks AGENTPLANE_CLOUD_* into cloud backend tests, causing deterministic cloud_projection_adoption_required failures. Sanitize cloud override variables in the local CI launcher, then rerun the full contract.
    Attempts: 7

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:b97f65b537b239a05d6fc3d436a93a2aca2006f8d6c0eddd445cad0f104d40f1

    Details:

    Reproduced with AGENTPLANE_CLOUD_PROVIDER=ambient-provider against task-backend.revision-cas.test.ts and task-backend.cloud-start-refresh.test.ts; failures match the declared-check stale cloud projection errors. The previously added two-wave scheduler does not resolve the failure and should be reverted.

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

    ### 2026-08-20T20:40:29.256Z — VERIFY — blocked_external

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:fast
    Attempts: 8

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:60d552d274e6bd7a0569ea6c86bdfb3ace81b57063f3bfd1c7eaf114ee47e7f0

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

    ### 2026-08-20T20:56:24.530Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:23076ccac1304e12a31e349d9430425d8a74e135a46cfa8803bf6e185d03aa4a

    Details:

    Check: affected_unit_integration
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check critical_paths

    Check: docs_contract
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check docs_contract

    Check: full_regression
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check full_regression

    Check: hosted_integration
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check hosted_integration

    Check: real_e2e
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check real_e2e

    Check: task_outcome
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check task_outcome

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

    ### 2026-08-20T21:06:35.044Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:519f32059d4ea6a20364503c6ebd1b3550335d14b6c9668dc1d923f0468810ef, input_digest=sha256:17c22c6395a0a6343ba00d1e49186131432d189cd74a23e5d2bec0b8b4488ef1

    Details:

    Check: affected_unit_integration
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check critical_paths

    Check: docs_contract
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check docs_contract

    Check: full_regression
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check full_regression

    Check: hosted_integration
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check hosted_integration

    Check: real_e2e
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check real_e2e

    Check: task_outcome
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check task_outcome

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

    ### 2026-08-20T21:11:53.489Z — VERIFY — needs_rework

    By: TESTER

    Note: Pre-merge finish fails after evaluator and task-document commits because implementation commit normalization stops after one task-artifact layer; resolve the complete task-only first-parent tail to the verified code commit and add regression coverage.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:519f32059d4ea6a20364503c6ebd1b3550335d14b6c9668dc1d923f0468810ef, input_digest=sha256:3e031f00507de35eb31d32dcded2f73084f581a5b8fec39946eb256e6fc2f5d8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
    - old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608200903-J459C2

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane finish 202608200903-J459C2 --author CODER --body 'Verified: pre-merge closure packet is ready for the task PR.' --result 'pre-merge closure' --commit 8af0fd9f6cbdd5e5c390e6dbbfa9c3de2d4b06aa --pre-merge-closure
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-08-20T21:24:46.131Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:519f32059d4ea6a20364503c6ebd1b3550335d14b6c9668dc1d923f0468810ef, input_digest=sha256:97ccbdb907c263464b637bb01e9f421ada39bc5fda33032c3513326c034f3056

    Details:

    Check: affected_unit_integration
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check critical_paths

    Check: docs_contract
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check docs_contract

    Check: full_regression
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check full_regression

    Check: hosted_integration
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check hosted_integration

    Check: real_e2e
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check real_e2e

    Check: task_outcome
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check task_outcome

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

    ### 2026-08-20T21:29:32.773Z — VERIFY — needs_rework

    By: TESTER

    Note: Finish resolves the verified implementation SHA correctly but validates the v4 record through the legacy workflow-mode identity because assertQualityReviewBeforeFinish omits plan.execution. Pass the frozen TaskExecutionContext into verification assessment and add regression coverage.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:519f32059d4ea6a20364503c6ebd1b3550335d14b6c9668dc1d923f0468810ef, input_digest=sha256:1bd87f412a08fc544bc46e86cd6b758fd753f29fedb6501c8a7029f2cb606e2a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
    - old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608200903-J459C2

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane finish 202608200903-J459C2 --author CODER --body 'Verified: pre-merge closure packet is ready for the task PR.' --result 'pre-merge closure' --commit 28b3eb2b9911525fd63bc5e6431bd10317087ce6 --pre-merge-closure
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-08-20T21:57:15.353Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:519f32059d4ea6a20364503c6ebd1b3550335d14b6c9668dc1d923f0468810ef, input_digest=sha256:797e017e9ee8fd55df294c314eb46fa2e80fa9d1009101181befae3e76b1f6cb

    Details:

    Check: affected_unit_integration
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check critical_paths

    Check: docs_contract
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check docs_contract

    Check: full_regression
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check full_regression

    Check: hosted_integration
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check hosted_integration

    Check: real_e2e
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check real_e2e

    Check: task_outcome
    Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608200903-J459C2 Verification Contract check task_outcome

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

    ### 2026-08-20T22:15:16.257Z — VERIFY — needs_rework

    By: USER

    Note: Exact-head hosted CI run 32422225125 failed required verify-static and verify-contract checks: 13 unused AgentPlane CLI exports exceed the zero Knip budget; four documentation social images are missing and the generated manifest is stale. Reopen implementation for bounded remediation.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:519f32059d4ea6a20364503c6ebd1b3550335d14b6c9668dc1d923f0468810ef, input_digest=sha256:5715b3389d2cddf8e29bc75c1a1168686e91a5d343f579feb607e4897edd5961

    Details:

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
  Findings: |-
    - Confirmed root cause: the local CI launcher inherited AGENTPLANE_CLOUD_* overrides from the supervisor environment, so cloud backend tests preferred ambient provider identity over fixture settings and reported stale projection/adoption errors.
    - Resolution: scripts/checks/run-local-ci.mjs now removes endpoint, token, project id, provider, remote-create policy, and auto-push cloud overrides before constructing child environments. The ineffective two-wave scheduler workaround was removed and the original concurrency-2 scheduler restored.
    - Direct proof: AGENTPLANE_CLOUD_PROVIDER=ambient-provider bun run ci:local:fast passed all five groups with ok=true in 393741 ms. Supervisor-owned declared verification independently passed all required checks; its full-fast run reported ok=true in 365468 ms.
    - The approved AP-0001 through AP-1004 implementation, migration guards, ADRs, focused regression coverage, verification identity v4, workspace allocation, closeout recovery, serialized integration, and managed-runner capability enforcement are present in the committed task diff.
    - No residual local implementation blocker remains. Hosted checks, exact-SHA publication, queued integration, provider merge readback, and final main ancestry verification remain lifecycle steps owned by AgentPlane.
extensions:
  agentplane.scope_extension_request:
    blocker_state_fingerprint: "sha256:e53b99dbae48300d982e439e7c1a07c8a7ac14a0b19b8abba52fba6dd90b8b62"
    kind: "task_scope_extension_request"
    request:
      rationale: "The exact PR head cannot pass its required docs-site contract until repository-owned generated social assets and their manifest are updated alongside the task's new documentation pages."
      repository_effects:
        - "documentation"
        - "repository_write"
      schema_version: 1
      scope_roots:
        - "website"
    request_digest: "sha256:5bca2cd0e74052da35f1f4e671c1edc7c17fffd09aa6f31f4cdac9fae6564673"
    schema_version: 1
    status: "pending"
    transition_id: "tr_dac0473f16b6ada2a5ee7894f215b1ed"
  implementation_commit:
    hash: "bf575676346cab8e27c40c30fb0378ddedaf913b"
    message: "🚧 J459C2 task: apply external agent result"
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

1. Run focused task-authority and route tests. Expected: TaskExecutionContext and TaskCommandContext own selected_mode, route provenance, authoritative task source, base_ref, and frozen base_sha; repository workflow_mode is not read as runtime authority.
2. Run focused workspace-allocation and batch-context tests. Expected: automated direct and branch_pr work receive isolated leases, base checkout remains single-writer, private paths stay outside semantic digests, and mixed route/base batches fail closed.
3. Run focused verification and finish tests. Expected: verification identity v4 is workspace-neutral and bound to frozen task/base identity; v3 is audit-only; closeout journal recovery is idempotent across prepared, task_state_written, close_commit_written, completed, and recovery_required phases.
4. Run focused integration-queue and managed-runner tests. Expected: the existing serialized queue handles direct candidates, rechecks base/conflicts/equivalence/freshness, preserves conflict_rework, rejects undeclared capabilities before invocation, and escalates direct to branch_pr without unnecessary executor replay.
5. Exercise the ten end-to-end acceptance scenarios: repository-direct finish, task branch_pr finish, risk-driven escalation, custom workflow_dir, frozen base identity, parallel direct isolation, mixed-context rejection, workspace-neutral verification identity, interrupted closeout recovery, and serialized parallel A/B/C integration.
6. Run node --check scripts/checks/run-local-ci.mjs, bunx prettier --check scripts/checks/run-local-ci.mjs, bunx eslint scripts/checks/run-local-ci.mjs, and git diff --check. Expected: the CI hermeticity rework is syntactically and structurally clean.
7. Run AGENTPLANE_CLOUD_PROVIDER=ambient-provider bun run ci:local:fast. Expected: all five verification groups execute and verification_metrics reports ok=true, proving cloud fixture identity is not overridden by the parent environment.
8. Run ap doctor, bun run ci:local:fast, bun run typecheck, and node .agentplane/policy/check-routing.mjs. Expected: every declared local check passes without weakening the verification contract.
9. Perform independent EVALUATOR review against the frozen diff and acceptance evidence. Expected: verdict pass with no unresolved implementation finding.
10. Publish the exact task head, require hosted checks for that SHA, integrate through the AgentPlane queue, and verify provider readback plus main ancestry before closure.

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

### 2026-08-20T20:29:46.554Z — VERIFY — blocked_external

By: TESTER

Note: Full regression is non-hermetic: the declared-check environment leaks AGENTPLANE_CLOUD_* into cloud backend tests, causing deterministic cloud_projection_adoption_required failures. Sanitize cloud override variables in the local CI launcher, then rerun the full contract.
Attempts: 7

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:b97f65b537b239a05d6fc3d436a93a2aca2006f8d6c0eddd445cad0f104d40f1

Details:

Reproduced with AGENTPLANE_CLOUD_PROVIDER=ambient-provider against task-backend.revision-cas.test.ts and task-backend.cloud-start-refresh.test.ts; failures match the declared-check stale cloud projection errors. The previously added two-wave scheduler does not resolve the failure and should be reverted.

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

### 2026-08-20T20:40:29.256Z — VERIFY — blocked_external

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:fast
Attempts: 8

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:60d552d274e6bd7a0569ea6c86bdfb3ace81b57063f3bfd1c7eaf114ee47e7f0

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

### 2026-08-20T20:56:24.530Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67879e381843d230e56183b99fda976f3987ed16bbb5a11e64c052645b4bc2ab, input_digest=sha256:23076ccac1304e12a31e349d9430425d8a74e135a46cfa8803bf6e185d03aa4a

Details:

Check: affected_unit_integration
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check affected_unit_integration

Check: critical_paths
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check critical_paths

Check: docs_contract
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check docs_contract

Check: full_regression
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check full_regression

Check: hosted_integration
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check hosted_integration

Check: real_e2e
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check real_e2e

Check: task_outcome
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check task_outcome

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

### 2026-08-20T21:06:35.044Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:519f32059d4ea6a20364503c6ebd1b3550335d14b6c9668dc1d923f0468810ef, input_digest=sha256:17c22c6395a0a6343ba00d1e49186131432d189cd74a23e5d2bec0b8b4488ef1

Details:

Check: affected_unit_integration
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check affected_unit_integration

Check: critical_paths
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check critical_paths

Check: docs_contract
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check docs_contract

Check: full_regression
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check full_regression

Check: hosted_integration
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check hosted_integration

Check: real_e2e
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check real_e2e

Check: task_outcome
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check task_outcome

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

### 2026-08-20T21:11:53.489Z — VERIFY — needs_rework

By: TESTER

Note: Pre-merge finish fails after evaluator and task-document commits because implementation commit normalization stops after one task-artifact layer; resolve the complete task-only first-parent tail to the verified code commit and add regression coverage.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:519f32059d4ea6a20364503c6ebd1b3550335d14b6c9668dc1d923f0468810ef, input_digest=sha256:3e031f00507de35eb31d32dcded2f73084f581a5b8fec39946eb256e6fc2f5d8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
- old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608200903-J459C2

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane finish 202608200903-J459C2 --author CODER --body 'Verified: pre-merge closure packet is ready for the task PR.' --result 'pre-merge closure' --commit 8af0fd9f6cbdd5e5c390e6dbbfa9c3de2d4b06aa --pre-merge-closure
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-08-20T21:24:46.131Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:519f32059d4ea6a20364503c6ebd1b3550335d14b6c9668dc1d923f0468810ef, input_digest=sha256:97ccbdb907c263464b637bb01e9f421ada39bc5fda33032c3513326c034f3056

Details:

Check: affected_unit_integration
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check affected_unit_integration

Check: critical_paths
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check critical_paths

Check: docs_contract
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check docs_contract

Check: full_regression
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check full_regression

Check: hosted_integration
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check hosted_integration

Check: real_e2e
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check real_e2e

Check: task_outcome
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check task_outcome

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

### 2026-08-20T21:29:32.773Z — VERIFY — needs_rework

By: TESTER

Note: Finish resolves the verified implementation SHA correctly but validates the v4 record through the legacy workflow-mode identity because assertQualityReviewBeforeFinish omits plan.execution. Pass the frozen TaskExecutionContext into verification assessment and add regression coverage.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:519f32059d4ea6a20364503c6ebd1b3550335d14b6c9668dc1d923f0468810ef, input_digest=sha256:1bd87f412a08fc544bc46e86cd6b758fd753f29fedb6501c8a7029f2cb606e2a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608200903-J459C2-make-task-execution-authority-local-and-direct-e/.agentplane/tasks/202608200903-J459C2/blueprint/resolved-snapshot.json
- old_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- current_digest: f25f42de93f6569db33d68ebc2964a5d415604675bcc5c9d35583cd4f7a5a518
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608200903-J459C2

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane finish 202608200903-J459C2 --author CODER --body 'Verified: pre-merge closure packet is ready for the task PR.' --result 'pre-merge closure' --commit 28b3eb2b9911525fd63bc5e6431bd10317087ce6 --pre-merge-closure
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-08-20T21:57:15.353Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:519f32059d4ea6a20364503c6ebd1b3550335d14b6c9668dc1d923f0468810ef, input_digest=sha256:797e017e9ee8fd55df294c314eb46fa2e80fa9d1009101181befae3e76b1f6cb

Details:

Check: affected_unit_integration
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check affected_unit_integration

Check: critical_paths
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check critical_paths

Check: docs_contract
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check docs_contract

Check: full_regression
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check full_regression

Check: hosted_integration
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check hosted_integration

Check: real_e2e
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check real_e2e

Check: task_outcome
Command: ap doctor && bun run ci:local:fast && bun run typecheck && node .agentplane/policy/check-routing.mjs && agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608200903-J459C2/supervision/declared-checks.json#checks
Scope: branch_pr task 202608200903-J459C2 Verification Contract check task_outcome

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

### 2026-08-20T22:15:16.257Z — VERIFY — needs_rework

By: USER

Note: Exact-head hosted CI run 32422225125 failed required verify-static and verify-contract checks: 13 unused AgentPlane CLI exports exceed the zero Knip budget; four documentation social images are missing and the generated manifest is stale. Reopen implementation for bounded remediation.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:519f32059d4ea6a20364503c6ebd1b3550335d14b6c9668dc1d923f0468810ef, input_digest=sha256:5715b3389d2cddf8e29bc75c1a1168686e91a5d343f579feb607e4897edd5961

Details:

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

- Confirmed root cause: the local CI launcher inherited AGENTPLANE_CLOUD_* overrides from the supervisor environment, so cloud backend tests preferred ambient provider identity over fixture settings and reported stale projection/adoption errors.
- Resolution: scripts/checks/run-local-ci.mjs now removes endpoint, token, project id, provider, remote-create policy, and auto-push cloud overrides before constructing child environments. The ineffective two-wave scheduler workaround was removed and the original concurrency-2 scheduler restored.
- Direct proof: AGENTPLANE_CLOUD_PROVIDER=ambient-provider bun run ci:local:fast passed all five groups with ok=true in 393741 ms. Supervisor-owned declared verification independently passed all required checks; its full-fast run reported ok=true in 365468 ms.
- The approved AP-0001 through AP-1004 implementation, migration guards, ADRs, focused regression coverage, verification identity v4, workspace allocation, closeout recovery, serialized integration, and managed-runner capability enforcement are present in the committed task diff.
- No residual local implementation blocker remains. Hosted checks, exact-SHA publication, queued integration, provider merge readback, and final main ancestry verification remain lifecycle steps owned by AgentPlane.

## Token Usage

- State: `unavailable`
- Completeness: `0/17` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:3cb1d7f11e08ba57fd2266af684c0126cdf54f8152e734c7877724cd38c893fb`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-20T21:58:58.992Z`
