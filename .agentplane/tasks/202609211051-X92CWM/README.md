---
id: "202609211051-X92CWM"
title: "Repair the demonstrated 0.7.11 release blockers without weakening gates: project canonical plan approval for branch-PR routing, fix replay-benchmark lint, prove fail-closed lifecycle repair and fresh branch worktree bootstrap in the release-critical scenario, then pass full CI and LC-24 gates."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 72
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bun run clone:check"
  - "bun run knip:check"
  - "bun run package:install-smoke"
  - "bun run test:fast"
  - "bun run test:release:critical"
  - "bun run vitest:projects:check"
  - "node scripts/checks/check-post-convergence-test-topology.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-21T12:49:36.138Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-21T13:05:44.690Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-21T12:49:36.138Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "3a6c32e19b16587609278620419ea1680e936e65"
  review_identity_digest: "sha256:79996b8ba4c2d09f78e81cb727dcc5c28dd4a26a110720b0d76c0e71938581b8"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609211051-X92CWM/ceaa3ba7cfca376c4044d3d7bdfeccb054d77da9628c0334f5a86e204965c14f/quality-report.json"
  findings:
    - "Canonical approval now projects the approved compatibility fields from the committed Kernel record, and branch worktree routing resolves registered checkouts by parsed task identity with an explicit fail-closed ambiguity error."
    - "The release-critical public CLI test proves approval projection, title-slug branch worktree preparation, deterministic validation rework before evaluation, repaired evaluation, and terminal completion."
    - "The four targeted runtime modules are 452, 529, 592, and 534 lines; all extracted helpers are also below 600 lines, and the hotspot gate passes without an exception."
    - "All 14 AgentPlane-observed checks passed at implementation commit 3a6c32e19b16587609278620419ea1680e936e65, including focused tests, test:fast, release-critical, package installation smoke, Knip, and ci:local:full."
    - "The final rework removes only the unused RequiredWorkItemRoute compatibility re-export; internal return typing and behavior are unchanged, and the CLI Knip budget returns to 0/0."
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
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
    preferred_mode: "direct"
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
      - "repository_effect:documentation"
      - "repository_effect:tests"
    changed_components:
      - "artifacts"
      - "docs"
      - "packages/agentplane"
      - "packages/core"
      - "scripts"
      - "website"
    changed_paths:
      - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
      - "docs/reference/clean-task-core-rebuild-spec.mdx"
      - "docs/user/cli-reference.generated.mdx"
      - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
      - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
      - "packages/agentplane/src/commands/task/kernel-inspection.ts"
      - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
      - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
      - "packages/agentplane/src/commands/task/migration-apply.ts"
      - "packages/agentplane/src/commands/task/plan-approve.command.ts"
      - "packages/core/src/tasks/task-centric/task-centric.test.ts"
      - "scripts/bench/paired-m03-local-replay.mjs"
      - "scripts/checks/check-post-convergence-test-topology.mjs"
      - "scripts/checks/post-convergence-test-topology.json"
      - "website/static/llms-full.txt"
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
        id: "recorded-check-17"
        result: "pass"
      -
        id: "recorded-check-18"
        result: "pass"
      -
        id: "recorded-check-19"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-20"
        result: "pass"
      -
        id: "recorded-check-21"
        result: "pass"
      -
        id: "recorded-check-22"
        result: "pass"
      -
        id: "recorded-check-23"
        result: "pass"
      -
        id: "recorded-check-24"
        result: "pass"
      -
        id: "recorded-check-25"
        result: "pass"
      -
        id: "recorded-check-26"
        result: "pass"
      -
        id: "recorded-check-27"
        result: "pass"
      -
        id: "recorded-check-28"
        result: "pass"
      -
        id: "recorded-check-29"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-30"
        result: "pass"
      -
        id: "recorded-check-31"
        result: "pass"
      -
        id: "recorded-check-32"
        result: "pass"
      -
        id: "recorded-check-33"
        result: "pass"
      -
        id: "recorded-check-34"
        result: "pass"
      -
        id: "recorded-check-35"
        result: "pass"
      -
        id: "recorded-check-36"
        result: "pass"
      -
        id: "recorded-check-37"
        result: "pass"
      -
        id: "recorded-check-38"
        result: "pass"
      -
        id: "recorded-check-39"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-40"
        result: "pass"
      -
        id: "recorded-check-41"
        result: "pass"
      -
        id: "recorded-check-42"
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
      -
        id: "verification-record"
        result: "pass"
  reason_codes:
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
          - "repository_effect:documentation"
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
      digest: "sha256:09a4bb2c87df74c2f197e191927544b5a09169bb25a9da9b150be4668d9ef4ec"
      escalation_reasons:
        - "central_path:packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/semantic-result-admission.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-factory.ts"
        - "central_path:packages/core/src/tasks/task-centric/task-centric.test.ts"
        - "central_path:scripts/checks/check-post-convergence-test-topology.mjs"
        - "central_path:scripts/checks/post-convergence-test-topology.json"
        - "unknown_path:artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
        - "unknown_path:scripts/checks/post-convergence-test-topology.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "artifacts"
          - "docs"
          - "packages/agentplane"
          - "packages/core"
          - "scripts"
          - "website"
        changed_files:
          - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
          - "docs/reference/clean-task-core-rebuild-spec.mdx"
          - "docs/user/cli-reference.generated.mdx"
          - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
          - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
          - "packages/agentplane/src/commands/task/kernel-inspection.ts"
          - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
          - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
          - "packages/agentplane/src/commands/task/migration-apply.ts"
          - "packages/agentplane/src/commands/task/plan-approve.command.ts"
          - "packages/core/src/tasks/task-centric/task-centric.test.ts"
          - "scripts/bench/paired-m03-local-replay.mjs"
          - "scripts/checks/check-post-convergence-test-topology.mjs"
          - "scripts/checks/post-convergence-test-topology.json"
          - "website/static/llms-full.txt"
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
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "3a6c32e19b16587609278620419ea1680e936e65"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-09-21T13:05:44.690Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-09-21T13:05:46.301Z"
doc_updated_by: "SUPERVISOR"
description: "Repair the demonstrated 0.7.11 release blockers without weakening gates: project canonical plan approval for branch-PR routing, fix replay-benchmark lint, prove fail-closed lifecycle repair and fresh branch worktree bootstrap in the release-critical scenario, then pass full CI and LC-24 gates."
sections:
  Summary: |-
    Repair the demonstrated 0.7.11 release blockers without weakening gates: project canonical plan approval for branch-PR routing, fix replay-benchmark lint, prove fail-closed lifecycle repair and fresh branch worktree bootstrap in the release-critical scenario, then pass full CI and LC-24 gates.

    Repair the demonstrated 0.7.11 release blockers without weakening gates: project canonical plan approval for branch-PR routing, fix replay-benchmark lint, prove fail-closed lifecycle repair and fresh branch worktree bootstrap in the release-critical scenario, then pass full CI and LC-24 gates.
  Scope: |-
    - In scope: Repair the demonstrated 0.7.11 release blockers without weakening gates: project canonical plan approval for branch-PR routing, fix replay-benchmark lint, prove fail-closed lifecycle repair and fresh branch worktree bootstrap in the release-critical scenario, then pass full CI and LC-24 gates.
    - Out of scope: unrelated refactors not required for "Repair the demonstrated 0.7.11 release blockers without weakening gates: project canonical plan approval for branch-PR routing, fix replay-benchmark lint, prove fail-closed lifecycle repair and fresh branch worktree bootstrap in the release-critical scenario, then pass full CI and LC-24 gates.".
  Plan: "1. Execute approved WorkItem release-blocker-repair."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node scripts/checks/check-post-convergence-test-topology.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run test:release:critical`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `bun run package:install-smoke`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Run `bun run vitest:projects:check`. Expected: it succeeds and confirms the requested outcome for this task.
    7. Run `bun run clone:check`. Expected: it succeeds and confirms the requested outcome for this task.
    8. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
    9. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    10. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-21T13:05:44.690Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c19153f27af77771842332fb914fc0bd1810379451dc94574ced302269c5a225, input_digest=sha256:b9b77f33a39a94907e3a6858327c136592504d6c988e61179795470ce6f3480d

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (1/14)

    Check: affected_unit_integration
    Command: bun run clone:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (2/14)

    Check: affected_unit_integration
    Command: bun run knip:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (3/14)

    Check: affected_unit_integration
    Command: bun run package:install-smoke
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (4/14)

    Check: affected_unit_integration
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (5/14)

    Check: affected_unit_integration
    Command: bun run test:release:critical
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (6/14)

    Check: affected_unit_integration
    Command: bun run vitest:projects:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (7/14)

    Check: affected_unit_integration
    Command: node scripts/checks/check-post-convergence-test-topology.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (8/14)

    Check: affected_unit_integration
    Command: bun run hotspots:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-9
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (9/14)

    Check: affected_unit_integration
    Command: bun run docs:cli:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-10
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (10/14)

    Check: affected_unit_integration
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-11
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (11/14)

    Check: affected_unit_integration
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-12
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (12/14)

    Check: affected_unit_integration
    Command: node scripts/checks/check-trust-boundary-ratchet.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-13
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (13/14)

    Check: affected_unit_integration
    Command: bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-14
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (14/14)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (1/14)

    Check: critical_paths
    Command: bun run clone:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (2/14)

    Check: critical_paths
    Command: bun run knip:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (3/14)

    Check: critical_paths
    Command: bun run package:install-smoke
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (4/14)

    Check: critical_paths
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (5/14)

    Check: critical_paths
    Command: bun run test:release:critical
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (6/14)

    Check: critical_paths
    Command: bun run vitest:projects:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (7/14)

    Check: critical_paths
    Command: node scripts/checks/check-post-convergence-test-topology.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (8/14)

    Check: critical_paths
    Command: bun run hotspots:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-9
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (9/14)

    Check: critical_paths
    Command: bun run docs:cli:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-10
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (10/14)

    Check: critical_paths
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-11
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (11/14)

    Check: critical_paths
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-12
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (12/14)

    Check: critical_paths
    Command: node scripts/checks/check-trust-boundary-ratchet.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-13
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (13/14)

    Check: critical_paths
    Command: bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-14
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (14/14)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (1/14)

    Check: task_outcome
    Command: bun run clone:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (2/14)

    Check: task_outcome
    Command: bun run knip:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (3/14)

    Check: task_outcome
    Command: bun run package:install-smoke
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (4/14)

    Check: task_outcome
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (5/14)

    Check: task_outcome
    Command: bun run test:release:critical
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (6/14)

    Check: task_outcome
    Command: bun run vitest:projects:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (7/14)

    Check: task_outcome
    Command: node scripts/checks/check-post-convergence-test-topology.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (8/14)

    Check: task_outcome
    Command: bun run hotspots:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-9
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (9/14)

    Check: task_outcome
    Command: bun run docs:cli:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-10
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (10/14)

    Check: task_outcome
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-11
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (11/14)

    Check: task_outcome
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-12
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (12/14)

    Check: task_outcome
    Command: node scripts/checks/check-trust-boundary-ratchet.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-13
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (13/14)

    Check: task_outcome
    Command: bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000
    Result: pass
    Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-14
    Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (14/14)

    NativeTaskIdentityRef:
    - plan_digest: sha256:8dc6dddb6cc8a2ed24c14dbba2ebf605686eb51a621e5bf68a811d7f47f319f7
    - policy_digest: sha256:5969d69ad7383875e82dd5e860b3156e5ba4406cbcd617ffa342e6d388092dd1
    - capability_digest: sha256:44668150af015035b4f9295eeb1e83a605e3c89b183ce28b4421a381c9bdb75f
    - checks_digest: sha256:46be63a181b477f7e54d121bc1d553426d324512c08aeefb0501b8cbfeb9d704
    - identity_digest: sha256:852124ebdfe6a9d59e9b1cfa47a39d4445885b2afac74ea2058ab0e4af24e67a

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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.kernel_operational_projection:
    digest: "sha256:8deed31b7cb7dd0bc6adfb53f4c3dff1e694b0add312b0c2e4a51909b828238b"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609211051-X92CWM/ceaa3ba7cfca376c4044d3d7bdfeccb054d77da9628c0334f5a86e204965c14f/quality-report.json"
    findings:
      - "Canonical approval now projects the approved compatibility fields from the committed Kernel record, and branch worktree routing resolves registered checkouts by parsed task identity with an explicit fail-closed ambiguity error."
      - "The release-critical public CLI test proves approval projection, title-slug branch worktree preparation, deterministic validation rework before evaluation, repaired evaluation, and terminal completion."
      - "The four targeted runtime modules are 452, 529, 592, and 534 lines; all extracted helpers are also below 600 lines, and the hotspot gate passes without an exception."
      - "All 14 AgentPlane-observed checks passed at implementation commit 3a6c32e19b16587609278620419ea1680e936e65, including focused tests, test:fast, release-critical, package installation smoke, Knip, and ci:local:full."
      - "The final rework removes only the unused RequiredWorkItemRoute compatibility re-export; internal return typing and behavior are unchanged, and the CLI Knip budget returns to 0/0."
    implementation_commit: "3a6c32e19b16587609278620419ea1680e936e65"
    implementation_tree: "8cc1280d4f5e53768b8a790e531f3de04c22b8bc"
    projected_at: "2026-09-21T12:49:36.138Z"
    review_identity_digest: "sha256:79996b8ba4c2d09f78e81cb727dcc5c28dd4a26a110720b0d76c0e71938581b8"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:15a7f52c4b4cc6fc45c0fe296b3f978b9e96ea3b2d3e433ad486af87e0d33e92"
    work_order_id: "sha256:d04f951c28987ae2e7fe0c1b6b96e613e4ab4868b48ea07b22e2f7c6285f081c"
  task_execution_context:
    base_ref: "agentplane/release-0.7.11-repair-base"
    base_sha: "727063e8461775bd58b573772d6c9fb717e45a50"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a8fde5f2b72adfea2602fe47cb16a351f3d67023c86e1d0c967d13b536b6bd02"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:637284c63836cdf3f09843a3b224815b2e287cf15ed65cefba11f5331a69af87"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:83de433d61d0042487da80b0576cb2511e132947e9e702c7528d07544ceefb2e"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release-critical harness"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:61eda0c4f2a7dc9915c9bf7a86ceedd2b7a33801949e9f897396f3a9332ef955"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:637284c63836cdf3f09843a3b224815b2e287cf15ed65cefba11f5331a69af87"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:83de433d61d0042487da80b0576cb2511e132947e9e702c7528d07544ceefb2e"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:a8fde5f2b72adfea2602fe47cb16a351f3d67023c86e1d0c967d13b536b6bd02"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release-critical harness"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
            evidence_digest: "sha256:0b1c5f63ce783ca787739b9cae82ca8ecd5199061c1de258d1759ccac6e37844"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:ed3bf4fe26c859917f7cd381cd5417845b7ba1083a4d78987094e13bb098f531"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3e175a171a85d810095dfe57618171fd14ec34c521ab7e2db8987f5d668a28da"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:1c60fcbdf76d9feecff1e9f74997f9a1177d15e3ff3f789d477446d784573de8"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release-critical harness"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:460daf6ca73f15668c38609468caa5c8f9b9ff993788b2ef4e125ca9d88112c1"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3e175a171a85d810095dfe57618171fd14ec34c521ab7e2db8987f5d668a28da"
            plan_revision: 2
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:1c60fcbdf76d9feecff1e9f74997f9a1177d15e3ff3f789d477446d784573de8"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:ed3bf4fe26c859917f7cd381cd5417845b7ba1083a4d78987094e13bb098f531"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release-critical harness"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
            evidence_digest: "sha256:c4741b4271060b34ed9d5499129c90f5eb96e9467df5d7cb3d177a5775ac11e0"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:bdd1d596f7114528b58c30e0f145e5f8ae938e7e7c868bcfed1265914f319c74"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d3a4e0e65e7cbe323147f17c368f16c66accc7e4020e1ded9c695df1b693490d"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:6572c58d8ee74c6d47423805ac63eeb74295cb381c20a2e836d3221a40d2b514"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release-critical and trust-boundary harnesses"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/core/src/tasks/task-centric/task-centric.test.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
              - "scripts/checks/check-post-convergence-test-topology.mjs"
              - "scripts/checks/post-convergence-test-topology.json"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run format:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
              - "node scripts/checks/check-trust-boundary-ratchet.mjs"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:0c10e3efadc0934d8f2c01d40fc99dad614b87e822d78df6058dae3c4c410726"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d3a4e0e65e7cbe323147f17c368f16c66accc7e4020e1ded9c695df1b693490d"
            plan_revision: 3
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6572c58d8ee74c6d47423805ac63eeb74295cb381c20a2e836d3221a40d2b514"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:bdd1d596f7114528b58c30e0f145e5f8ae938e7e7c868bcfed1265914f319c74"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release-critical and trust-boundary harnesses"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/core/src/tasks/task-centric/task-centric.test.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
              - "scripts/checks/check-post-convergence-test-topology.mjs"
              - "scripts/checks/post-convergence-test-topology.json"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run format:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
              - "node scripts/checks/check-trust-boundary-ratchet.mjs"
            work_item_id: null
          observation:
            changed_paths:
              - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
              - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/core/src/tasks/task-centric/task-centric.test.ts"
              - "scripts/checks/check-post-convergence-test-topology.mjs"
              - "scripts/checks/post-convergence-test-topology.json"
            evidence_digest: "sha256:19e8bef1ae7be74b99b664641e3f4c4898d3f73c82f4f814a446a3f8efbf85d8"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:dff8154240647425c1686804e5988e25b1f85a881c3f79eee2497c82859290ce"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:857543c01910786e240efa8268cd7ab1b055d989e4dc1ddea5c2198ce097e428"
            plan_revision: 4
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:190e0b0102731d70e8c49ec314e748490bfa548c9b8887b94c725385e248fa1e"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release verification harnesses"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/core/src/tasks/task-centric/task-centric.test.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
              - "scripts/checks/check-post-convergence-test-topology.mjs"
              - "scripts/checks/post-convergence-test-topology.json"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run docs:cli:check"
              - "bun run docs:cli:generate"
              - "bun run format:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
              - "node scripts/checks/check-trust-boundary-ratchet.mjs"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:777a16789731fd8f75e5b78d643c935b56c7db49a0a7a483b631cc8723bb9a32"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:857543c01910786e240efa8268cd7ab1b055d989e4dc1ddea5c2198ce097e428"
            plan_revision: 4
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:190e0b0102731d70e8c49ec314e748490bfa548c9b8887b94c725385e248fa1e"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:dff8154240647425c1686804e5988e25b1f85a881c3f79eee2497c82859290ce"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release verification harnesses"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/core/src/tasks/task-centric/task-centric.test.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
              - "scripts/checks/check-post-convergence-test-topology.mjs"
              - "scripts/checks/post-convergence-test-topology.json"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run docs:cli:check"
              - "bun run docs:cli:generate"
              - "bun run format:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
              - "node scripts/checks/check-trust-boundary-ratchet.mjs"
            work_item_id: null
          observation:
            changed_paths:
              - "docs/user/cli-reference.generated.mdx"
            evidence_digest: "sha256:9eb5efe237ce94f4e2c0db198dba61da216b6ffe3aadc7609430959c37c67545"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:48e3542f5fa6fc8e253a14e5aefe88290abb2e93454c3dcd33c163862b29fc74"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:64a26fafe3ac32479a61a2670c2958ca4fe256b91132a07dbf219e81196df759"
            plan_revision: 5
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:6414988666811f8f10afeb52379f5a6c7e6c09b2ae6c5487b56f7a44e2583933"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release verification harnesses"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/core/src/tasks/task-centric/task-centric.test.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
              - "scripts/checks/check-post-convergence-test-topology.mjs"
              - "scripts/checks/post-convergence-test-topology.json"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run docs:cli:check"
              - "bun run format:check"
              - "bun run hotspots:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
              - "node scripts/checks/check-trust-boundary-ratchet.mjs"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:89ceb6afcd6d04b3a6fd56a6beab0ef9dec1c7ef7c0469effb7553fd5774f444"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:64a26fafe3ac32479a61a2670c2958ca4fe256b91132a07dbf219e81196df759"
            plan_revision: 5
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6414988666811f8f10afeb52379f5a6c7e6c09b2ae6c5487b56f7a44e2583933"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:48e3542f5fa6fc8e253a14e5aefe88290abb2e93454c3dcd33c163862b29fc74"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:8f8df17479f24b62da6379dd3b29cfa3fc87204a95f3cc431ff7652ad893af97"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release verification harnesses"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/core/src/tasks/task-centric/task-centric.test.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
              - "scripts/checks/check-post-convergence-test-topology.mjs"
              - "scripts/checks/post-convergence-test-topology.json"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run docs:cli:check"
              - "bun run format:check"
              - "bun run hotspots:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
              - "node scripts/checks/check-trust-boundary-ratchet.mjs"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
            evidence_digest: "sha256:9db195d506407f157c797612fcee34ff822f72cd7caf8ed9c230369c4ca4df32"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79"
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b51b95921268ebe407f4661faee7f7353bab1a4d3948309df27368a408647de9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:180764ab48776fd646f185676375d6db7f9c35d4342330149a2441a07ee99ed4"
            plan_revision: 6
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6414988666811f8f10afeb52379f5a6c7e6c09b2ae6c5487b56f7a44e2583933"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:89ceb6afcd6d04b3a6fd56a6beab0ef9dec1c7ef7c0469effb7553fd5774f444"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:8f8df17479f24b62da6379dd3b29cfa3fc87204a95f3cc431ff7652ad893af97"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release verification harnesses"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
              - "docs/reference/clean-task-core-rebuild-spec.mdx"
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/core/src/tasks/task-centric/task-centric.test.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
              - "scripts/checks/check-post-convergence-test-topology.mjs"
              - "scripts/checks/post-convergence-test-topology.json"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run docs:cli:check"
              - "bun run format:check"
              - "bun run hotspots:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
              - "node scripts/checks/check-trust-boundary-ratchet.mjs"
            work_item_id: null
          observation:
            added_scope_roots:
              - "docs/reference/clean-task-core-rebuild-spec.mdx"
            changed_paths: []
            evidence_digest: "sha256:696660e2f41e2c66376e0d5dacd7ebc3d2138abe1c6cc2098f5eca19d277eb95"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:8f8df17479f24b62da6379dd3b29cfa3fc87204a95f3cc431ff7652ad893af97"
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:43deb55b4bd701526e72d7f8f40ebc19dbb798867a6378f6d60675fbd18f8afc"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:180764ab48776fd646f185676375d6db7f9c35d4342330149a2441a07ee99ed4"
            plan_revision: 6
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6414988666811f8f10afeb52379f5a6c7e6c09b2ae6c5487b56f7a44e2583933"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:b51b95921268ebe407f4661faee7f7353bab1a4d3948309df27368a408647de9"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:cced7bc338920930e3ea9be82584686e9c507880a5696e0d619e154f0515c367"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release verification harnesses"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
              - "docs/reference/clean-task-core-rebuild-spec.mdx"
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/core/src/tasks/task-centric/task-centric.test.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
              - "scripts/checks/check-post-convergence-test-topology.mjs"
              - "scripts/checks/post-convergence-test-topology.json"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run docs:cli:check"
              - "bun run format:check"
              - "bun run hotspots:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
              - "node scripts/checks/check-trust-boundary-ratchet.mjs"
            work_item_id: null
          observation:
            changed_paths:
              - "docs/reference/clean-task-core-rebuild-spec.mdx"
            evidence_digest: "sha256:193aa9a489163108a1de40a6ffbb32e065f1cc08cefa94e1f54bfc4d69954a71"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:8f8df17479f24b62da6379dd3b29cfa3fc87204a95f3cc431ff7652ad893af97"
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:028089222f1cac7c42791dfd3a489a10466507a1380cd0d61a781b9d847c955e"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:8dc6dddb6cc8a2ed24c14dbba2ebf605686eb51a621e5bf68a811d7f47f319f7"
            plan_revision: 7
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6414988666811f8f10afeb52379f5a6c7e6c09b2ae6c5487b56f7a44e2583933"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:43deb55b4bd701526e72d7f8f40ebc19dbb798867a6378f6d60675fbd18f8afc"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:cced7bc338920930e3ea9be82584686e9c507880a5696e0d619e154f0515c367"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release verification harnesses"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
              - "docs/reference/clean-task-core-rebuild-spec.mdx"
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/core/src/tasks/task-centric/task-centric.test.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
              - "scripts/checks/check-post-convergence-test-topology.mjs"
              - "scripts/checks/post-convergence-test-topology.json"
              - "website/static/llms-full.txt"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run docs:cli:check"
              - "bun run format:check"
              - "bun run hotspots:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
              - "node scripts/checks/check-trust-boundary-ratchet.mjs"
            work_item_id: null
          observation:
            added_scope_roots:
              - "website/static/llms-full.txt"
            changed_paths: []
            evidence_digest: "sha256:5a71ce49832bc8d5e7fd95768a03370ec94ace9cdf51aa38ff3add5c41056711"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:cced7bc338920930e3ea9be82584686e9c507880a5696e0d619e154f0515c367"
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:5e355c83c162f94f844ea82eef31089438913e71e56cf1a001eabfb51af8bcec"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:8dc6dddb6cc8a2ed24c14dbba2ebf605686eb51a621e5bf68a811d7f47f319f7"
            plan_revision: 7
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6414988666811f8f10afeb52379f5a6c7e6c09b2ae6c5487b56f7a44e2583933"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:028089222f1cac7c42791dfd3a489a10466507a1380cd0d61a781b9d847c955e"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:02cd51ff5e463049bf81c547a7f0d271252d9477ebaf768ccaaeea15153c1579"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release verification harnesses"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
              - "docs/reference/clean-task-core-rebuild-spec.mdx"
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/core/src/tasks/task-centric/task-centric.test.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
              - "scripts/checks/check-post-convergence-test-topology.mjs"
              - "scripts/checks/post-convergence-test-topology.json"
              - "website/static/llms-full.txt"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run docs:cli:check"
              - "bun run format:check"
              - "bun run hotspots:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
              - "node scripts/checks/check-trust-boundary-ratchet.mjs"
            work_item_id: null
          observation:
            changed_paths:
              - "website/static/llms-full.txt"
            evidence_digest: "sha256:1e811e0e4897cd463ccb0e2e10737e2e4d87a20045b47728bbad9449fe4733db"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:cced7bc338920930e3ea9be82584686e9c507880a5696e0d619e154f0515c367"
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "local_process"
              - "repository_read"
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:5ba0c75b204a737d936e47bb43d7edde58377f167ce2153bf8cb59ff9ba9eb11"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:8dc6dddb6cc8a2ed24c14dbba2ebf605686eb51a621e5bf68a811d7f47f319f7"
            plan_revision: 7
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6414988666811f8f10afeb52379f5a6c7e6c09b2ae6c5487b56f7a44e2583933"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:5e355c83c162f94f844ea82eef31089438913e71e56cf1a001eabfb51af8bcec"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "Bun 1.4.2"
              - "Node 24"
              - "existing release verification harnesses"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
              - "docs/reference/clean-task-core-rebuild-spec.mdx"
              - "docs/user/cli-reference.generated.mdx"
              - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
              - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
              - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
              - "packages/agentplane/src/commands/task/kernel-inspection.ts"
              - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
              - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
              - "packages/agentplane/src/commands/task/migration-apply.ts"
              - "packages/agentplane/src/commands/task/plan-approve.command.ts"
              - "packages/core/src/tasks/task-centric/task-centric.test.ts"
              - "scripts/bench/paired-m03-local-replay.mjs"
              - "scripts/checks/check-post-convergence-test-topology.mjs"
              - "scripts/checks/post-convergence-test-topology.json"
              - "website/static/llms-full.txt"
            task_id: "202609211051-X92CWM"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run clone:check"
              - "bun run docs:cli:check"
              - "bun run format:check"
              - "bun run hotspots:check"
              - "bun run knip:check"
              - "bun run lint"
              - "bun run package:install-smoke"
              - "bun run test:fast"
              - "bun run test:release:critical"
              - "bun run vitest:projects:check"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              - "node scripts/checks/check-post-convergence-test-topology.mjs"
              - "node scripts/checks/check-trust-boundary-ratchet.mjs"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
            evidence_digest: "sha256:2888fe6a3f283e702ee290df301ddb4dc63d99fd7744dc55894c1efa3bcfae81"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:02cd51ff5e463049bf81c547a7f0d271252d9477ebaf768ccaaeea15153c1579"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:bdcd50c81254f7dfbdd4a762c1af77721e8c6d2dc676561d83a54d8b1176d42e"
        digest: "sha256:8dc6dddb6cc8a2ed24c14dbba2ebf605686eb51a621e5bf68a811d7f47f319f7"
        revision: 7
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:8dbeb320dd3beb5a966aa1dd56c3a576d5aa177b19d7124af7b7ee89fe3df44a"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "local_process"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources:
                - "Bun 1.4.2"
                - "Node 24"
                - "existing release verification harnesses"
              scope_roots:
                - "packages/agentplane/src/commands/task/plan-approve.command.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
                - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
                - "scripts/bench/paired-m03-local-replay.mjs"
                - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
                - "packages/core/src/tasks/task-centric/task-centric.test.ts"
                - "scripts/checks/check-post-convergence-test-topology.mjs"
                - "scripts/checks/post-convergence-test-topology.json"
                - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
                - "packages/agentplane/src/commands/task/migration-apply.ts"
                - "docs/user/cli-reference.generated.mdx"
                - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
                - "packages/agentplane/src/commands/task/kernel-inspection.ts"
                - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "website/static/llms-full.txt"
            expected_outputs:
              - "kernel-plan-routing-projection"
              - "release-critical-lifecycle-proof"
              - "lint-clean-replay-benchmark"
              - "full-release-validation"
            id: "release-blocker-repair"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:15a7f52c4b4cc6fc45c0fe296b3f978b9e96ea3b2d3e433ad486af87e0d33e92"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:95a447d4310ed277208da2fef849f63d456b52b652e5eff061c78778cd45be75"
          environment_digest: "sha256:55617c6eb54c71d58e02822e4e672779857cf747ec7b48271653cc1cb8644165"
          implementation_identity: "sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a"
          toolchain_digest: "sha256:bb229ac220bbc13150f17be8c6db51f787de3d0f51de773ccb0d9bff56e5e951"
        observed_at: "2026-09-21T12:49:46.222Z"
        status: "PASSED"
      id: "202609211051-X92CWM"
      intent_digest: "sha256:2e798fe6177e7d8f2e1a3165d3de47e36325eea96308143a2103c1eace669318"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:180764ab48776fd646f185676375d6db7f9c35d4342330149a2441a07ee99ed4:
          after_revision: 41
          aggregate_digest: "sha256:b6a2da47fce36900eae200fe4a4dfee5cecf3aae43a2319129b1bb8ab61b887a"
          before_revision: 40
          command_digest: "sha256:db0fabd1e47d387db42c881a43c791cd9573738e34278655e526b2843dc891a9"
          effect_ids: []
          event_digests:
            - "sha256:71847e6d69b4b419b973a593bca44ac5b7a728cca275e85cb37be1acd1395680"
          mutation_id: "amend:sha256:180764ab48776fd646f185676375d6db7f9c35d4342330149a2441a07ee99ed4"
        amend:sha256:8dc6dddb6cc8a2ed24c14dbba2ebf605686eb51a621e5bf68a811d7f47f319f7:
          after_revision: 47
          aggregate_digest: "sha256:6a75707237e657472dab70a04fe265f8f95f3e3418ff4df19e822e9bfc66f8d5"
          before_revision: 46
          command_digest: "sha256:5144b19635cb9a91661e9dcf525c7987593ad0d216b2e42646a4a81ae6021217"
          effect_ids: []
          event_digests:
            - "sha256:37266ae128355a595dd15c92c561e5392c1ec4a46294768964fef65572e6552c"
          mutation_id: "amend:sha256:8dc6dddb6cc8a2ed24c14dbba2ebf605686eb51a621e5bf68a811d7f47f319f7"
        capture:202609211051-X92CWM:
          after_revision: 1
          aggregate_digest: "sha256:a2c892641a4127c6eb6f721c93d2abf21b0ead83a55a3b26339ddf54688b658a"
          before_revision: 0
          command_digest: "sha256:58f3c3999f503585bf4b245664df8b62d8ae773087991ad0539a7ff0819d9c30"
          effect_ids: []
          event_digests:
            - "sha256:822d9c2f0df8fce9e99abfb0bbed277b41de38066c5105075ca51b21944142fa"
          mutation_id: "capture:202609211051-X92CWM"
        final-validation:sha256:15a7f52c4b4cc6fc45c0fe296b3f978b9e96ea3b2d3e433ad486af87e0d33e92:62:
          after_revision: 63
          aggregate_digest: "sha256:504cc5cc621d12bfb66429c3c0ad9f74998b0187664fda7db21ec4c62e9f89a0"
          before_revision: 62
          command_digest: "sha256:371ab6c21ad6a35d2e87d176f4cc2ec421a4376f540a5650f558a1e2515927b9"
          effect_ids: []
          event_digests:
            - "sha256:cc2aca022491137aaedcc5814494a48e0c810da086ace66e41f6fa5ea5569358"
          mutation_id: "final-validation:sha256:15a7f52c4b4cc6fc45c0fe296b3f978b9e96ea3b2d3e433ad486af87e0d33e92:62"
        kernel_task_completion_required:sha256:07131e1ac002fb090708a5e800d1fa7924173ab7aadcf84297be25c931d49702:sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a:
          after_revision: 64
          aggregate_digest: "sha256:985331721fcc1baddf9a50c22d750bcabc8e3c072cb56b0afa9e7ca3b2b907d2"
          before_revision: 63
          command_digest: "sha256:c2f161e09823a10c95efe966a6b6209ea50c39301e64f29acc751c211ad3ab25"
          effect_ids: []
          event_digests:
            - "sha256:b492bc6fe7dfa70d8d9473c37fec60020a9e745a6c38c96548b142ffae9be0df"
          mutation_id: "kernel_task_completion_required:sha256:07131e1ac002fb090708a5e800d1fa7924173ab7aadcf84297be25c931d49702:sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a"
        kernel_work_item_claim_required:sha256:0e77f44ab3014c0c2ad2680ec3b4f3eee8864dae6c9195e47dcfeca373992d01:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c:
          after_revision: 13
          aggregate_digest: "sha256:384b54598d3dd32d76740c7b1148c7cd7f278a89e8fc0b1ad43167585a4a7cab"
          before_revision: 12
          command_digest: "sha256:fae6c04ddf783885605ab4c1a36aaeb0730c4348e7a14b764845804a00e429bd"
          effect_ids: []
          event_digests:
            - "sha256:38469852af3620924f17c39df69254901745a7facfdd6ae2a45e4666d220874e"
          mutation_id: "kernel_work_item_claim_required:sha256:0e77f44ab3014c0c2ad2680ec3b4f3eee8864dae6c9195e47dcfeca373992d01:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c"
        kernel_work_item_claim_required:sha256:37f6d6d9454f13f64f7686b3e11963d2d9506ecd24054169e716ef7a24f41b9a:sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895:
          after_revision: 21
          aggregate_digest: "sha256:07abb2eddec37442da798934fcab0df14f7d34dfa18acc5790d96c20f11ba7e2"
          before_revision: 20
          command_digest: "sha256:3b224368e35c5e12d199f55163427aebf28fb2365298dbc8795d62aa575b956b"
          effect_ids: []
          event_digests:
            - "sha256:6f2650c02283107a2ac70299441c947ce1b54c55f01d20c399a0dad207f5e1b7"
          mutation_id: "kernel_work_item_claim_required:sha256:37f6d6d9454f13f64f7686b3e11963d2d9506ecd24054169e716ef7a24f41b9a:sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895"
        kernel_work_item_claim_required:sha256:45b66d262b5385fd84bb3763ddd599473377ef4bdf74cbc58e56792aba100421:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b:
          after_revision: 5
          aggregate_digest: "sha256:40372943965dc12dc34c7fd43149af080ea2063295b10b476cab37e9c42fa21d"
          before_revision: 4
          command_digest: "sha256:b02b9728fa4eed10fd2a28cc88c9876299d45be607bc765a0db7e48fcadefabc"
          effect_ids: []
          event_digests:
            - "sha256:1b353ff42a77f86d6ff2d75ab8decf6c52f675127a8cc1f52ce17869069c6d16"
          mutation_id: "kernel_work_item_claim_required:sha256:45b66d262b5385fd84bb3763ddd599473377ef4bdf74cbc58e56792aba100421:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b"
        kernel_work_item_claim_required:sha256:9351dc4aecbf5f45101f834a3e543bb963d16b9d20b576cdde1f6d5500a1745f:sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79:
          after_revision: 37
          aggregate_digest: "sha256:685d8fd7edb2bc3af9caaaafddab820f9868eac97d783c350293db2cd4cc415c"
          before_revision: 36
          command_digest: "sha256:91d5ac96d69cb88a091610795e29719976b11d9c9bb275675afa871bc5cb9e59"
          effect_ids: []
          event_digests:
            - "sha256:0278e7293aabd4086e866ff396de309791aa0d41c294096447904832b2d5dd67"
          mutation_id: "kernel_work_item_claim_required:sha256:9351dc4aecbf5f45101f834a3e543bb963d16b9d20b576cdde1f6d5500a1745f:sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79"
        kernel_work_item_claim_required:sha256:b4de59ff7fa0a2dde5ff7001e1e4cb5712c1b8d1b4e4aa5769bf90925c234689:sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976:
          after_revision: 29
          aggregate_digest: "sha256:1d4b8d4c6c22e29a5f261983854ec4e49fc6142d149c5bb8fdb6f5d1197242cf"
          before_revision: 28
          command_digest: "sha256:ec9f78fc2136a1b82c92936f7be48bbff2f6f74a3fff7b3f0fd4f850bae3a896"
          effect_ids: []
          event_digests:
            - "sha256:bf447f92679f1e7dfcb9d13d51c26f5c2e44ae39c41e34f40d7806633995b40d"
          mutation_id: "kernel_work_item_claim_required:sha256:b4de59ff7fa0a2dde5ff7001e1e4cb5712c1b8d1b4e4aa5769bf90925c234689:sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976"
        kernel_work_item_claim_required:sha256:c1b19dead7a654d01a6b2ad5bce97eaea1ba216f26e1afe17e1e0fcb2a2c3413:sha256:8f8df17479f24b62da6379dd3b29cfa3fc87204a95f3cc431ff7652ad893af97:
          after_revision: 43
          aggregate_digest: "sha256:4295612e2759d4827364b63ff9adb4f5dc2da53a94979c24b132c7c96df55b1b"
          before_revision: 42
          command_digest: "sha256:07557d5ebffea1f314caf73ddc56c6ae3cb5ab8993659ab8cd6315b3fdce992e"
          effect_ids: []
          event_digests:
            - "sha256:586389cdde4a81bdeefd821b9a58a9295427ccb85111085fadf60e042769f0ca"
          mutation_id: "kernel_work_item_claim_required:sha256:c1b19dead7a654d01a6b2ad5bce97eaea1ba216f26e1afe17e1e0fcb2a2c3413:sha256:8f8df17479f24b62da6379dd3b29cfa3fc87204a95f3cc431ff7652ad893af97"
        kernel_work_item_claim_required:sha256:fae87a515df6d172d655cca6e47ce6411fb6f886b63536ce08cebcfc8d84ab3c:sha256:cced7bc338920930e3ea9be82584686e9c507880a5696e0d619e154f0515c367:
          after_revision: 49
          aggregate_digest: "sha256:82f83dce4c8f47fd9e259ebd7c60e2ce410eeeecaace805fda5b455bb346ec62"
          before_revision: 48
          command_digest: "sha256:60114c7710b0a0612cd1120bfb44a7c3326fc705ec8e28cd87383fb401e3d056"
          effect_ids: []
          event_digests:
            - "sha256:9bfb3037cfc398a1d5dfa12912e8a47cd6e5faf3ef489eaf9acf93f32e87f248"
          mutation_id: "kernel_work_item_claim_required:sha256:fae87a515df6d172d655cca6e47ce6411fb6f886b63536ce08cebcfc8d84ab3c:sha256:cced7bc338920930e3ea9be82584686e9c507880a5696e0d619e154f0515c367"
        kernel_work_item_execution_required:sha256:4ba5b3551ca66313f3de1725662e3241ff37a3fab4fbea23864fed275347c71e:sha256:02cd51ff5e463049bf81c547a7f0d271252d9477ebaf768ccaaeea15153c1579:
          after_revision: 57
          aggregate_digest: "sha256:ee3be04ade342d90b34be550d0c91b440f195f522e7c7329d167dac083244bc1"
          before_revision: 56
          command_digest: "sha256:996f5bfba91100a4acbad824573cb18c307e337a68688335b6827eec46e6b534"
          effect_ids: []
          event_digests:
            - "sha256:b3c03f8e1780e55d401b196c364b66700c9b2acb6b85e8a4d16410d0733766a4"
          mutation_id: "kernel_work_item_execution_required:sha256:4ba5b3551ca66313f3de1725662e3241ff37a3fab4fbea23864fed275347c71e:sha256:02cd51ff5e463049bf81c547a7f0d271252d9477ebaf768ccaaeea15153c1579"
        kernel_work_item_execution_required:sha256:790b4550b5b5ae17440063706768b43efbcd3a666300ecc1b4b77b0816f29ea7:sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895:
          after_revision: 22
          aggregate_digest: "sha256:64eff5abf37ade80404271041dc42d77f79185bfb829396a1c61b20a00696282"
          before_revision: 21
          command_digest: "sha256:12049d26762210d7efcaea0765a86a983b8c019113392b612c4f01b91fb89165"
          effect_ids: []
          event_digests:
            - "sha256:2ee383eece4cab8fd2cd22d3590d17d9dbf55cb091666cbdef662247460a8ed5"
          mutation_id: "kernel_work_item_execution_required:sha256:790b4550b5b5ae17440063706768b43efbcd3a666300ecc1b4b77b0816f29ea7:sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895"
        kernel_work_item_execution_required:sha256:7deb0b26f114df6243e5ea3c980032bace649ca8a2502b85bd765b5fe4863344:sha256:8f8df17479f24b62da6379dd3b29cfa3fc87204a95f3cc431ff7652ad893af97:
          after_revision: 44
          aggregate_digest: "sha256:565e340d93b51b9590ed1e9b2a515257b65effa6011fc95aceca5ea9ff9b8d64"
          before_revision: 43
          command_digest: "sha256:b6c403577a4ae0eba336d3ff2c453dc661345314b30e62ed56814d3e79445f35"
          effect_ids: []
          event_digests:
            - "sha256:5444eb7595949ae37ce1755ebe3c206fb51d21896394c36534e5589f196edbd2"
          mutation_id: "kernel_work_item_execution_required:sha256:7deb0b26f114df6243e5ea3c980032bace649ca8a2502b85bd765b5fe4863344:sha256:8f8df17479f24b62da6379dd3b29cfa3fc87204a95f3cc431ff7652ad893af97"
        kernel_work_item_execution_required:sha256:80d1401fa9477a50b9c94d5cb6478864e291a5f640a0e27b54fd93bcf7424e6d:sha256:cced7bc338920930e3ea9be82584686e9c507880a5696e0d619e154f0515c367:
          after_revision: 50
          aggregate_digest: "sha256:9ed9a9be94bbe9854c11ba713e93fe3016f3d58064c6dbe941b35aec6d7f927a"
          before_revision: 49
          command_digest: "sha256:72064aa19cfac0d82265d230a709e1770de41f507d3974d4980292d493338cf9"
          effect_ids: []
          event_digests:
            - "sha256:dcfdfba25ff679d730b57fb202d8ac0826fab4418adbe052958b1d4183ac9534"
          mutation_id: "kernel_work_item_execution_required:sha256:80d1401fa9477a50b9c94d5cb6478864e291a5f640a0e27b54fd93bcf7424e6d:sha256:cced7bc338920930e3ea9be82584686e9c507880a5696e0d619e154f0515c367"
        kernel_work_item_execution_required:sha256:82dd6609cd62011bff24205e077bf13018fa20178307f8b1f25cf1f21b8f2635:sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976:
          after_revision: 30
          aggregate_digest: "sha256:6753ef171ff6cff41a95d59d717ed8d57f65fa844c05db14041273286569b5a3"
          before_revision: 29
          command_digest: "sha256:6da6cb681b35938d5a984e8e24bf079b2593812785a333f9721d4e19b9c80387"
          effect_ids: []
          event_digests:
            - "sha256:bc68c7bb14d7b3d1f7c372ac9cfd3bb40016c4ec4226f4c6421a7a9592fed232"
          mutation_id: "kernel_work_item_execution_required:sha256:82dd6609cd62011bff24205e077bf13018fa20178307f8b1f25cf1f21b8f2635:sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976"
        kernel_work_item_execution_required:sha256:9440d9b9225c1b709e7f1cf976065298e1b1032973ef55d105736aa3977c18c2:sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79:
          after_revision: 38
          aggregate_digest: "sha256:e153ed8c9221af664a636b0bfe5841c556c05187ed75b6d57864ba0d4e455f68"
          before_revision: 37
          command_digest: "sha256:da10fb5007ff7dc481a71824af8dd09f0d81432ce2487232954c27bd158d6777"
          effect_ids: []
          event_digests:
            - "sha256:258a0b1cdac117d949f1f7571b703812c346e250e749910f462a4d6696f07620"
          mutation_id: "kernel_work_item_execution_required:sha256:9440d9b9225c1b709e7f1cf976065298e1b1032973ef55d105736aa3977c18c2:sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79"
        kernel_work_item_execution_required:sha256:c414241481a96e42c37a60ac0fa04ecd40d62cc9a0f9e897a0a7e1c5f244e8ef:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c:
          after_revision: 14
          aggregate_digest: "sha256:306a9bd0bf4fa50631f860c5ac4571e78324ad281ab53f0ae962b04446956444"
          before_revision: 13
          command_digest: "sha256:7b227704b9df07e86d31b99c3f73a5b821f582d9386f90ec383ff48a554cc039"
          effect_ids: []
          event_digests:
            - "sha256:ae2bbb8422fc6119d9d5fe17598d050cf49f613d95f504afd412c7990a20f75f"
          mutation_id: "kernel_work_item_execution_required:sha256:c414241481a96e42c37a60ac0fa04ecd40d62cc9a0f9e897a0a7e1c5f244e8ef:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c"
        kernel_work_item_execution_required:sha256:c535b29ec6b0568661cd9562f13b3882b2f69b9646b978f456f234eae06c5a18:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c:
          after_revision: 7
          aggregate_digest: "sha256:dba853d0a75b13cb0dd94aa0b6e2e6d605912d42fdc1aa9aa42c60b713b19921"
          before_revision: 6
          command_digest: "sha256:55c7c218570ca40bd301fdd36cfe8b7e7c826fb432674fa38ba8f00e969a9817"
          effect_ids: []
          event_digests:
            - "sha256:04325cf6d6c9675d88f957795a4097e30d1f6a8848f4930246c7940680b8f155"
          mutation_id: "kernel_work_item_execution_required:sha256:c535b29ec6b0568661cd9562f13b3882b2f69b9646b978f456f234eae06c5a18:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c"
        kernel_work_item_inspection_required:sha256:297fbadc5048b4822085e4caf98d07667fba988c224da345130e1f7d16208176:sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a:
          after_revision: 60
          aggregate_digest: "sha256:15747ac0a2d6046ac5ecdc6d8b255b987a8b948dd6a755b9299373e8550f2b56"
          before_revision: 59
          command_digest: "sha256:804b8c70467a01b6a225de981729ac0d0857584c5bbce8797ac76c36933fa121"
          effect_ids: []
          event_digests:
            - "sha256:ea5c6196555bc748111a329aac0b341213d8e0677b57e67a00d07b35a71b0067"
          mutation_id: "kernel_work_item_inspection_required:sha256:297fbadc5048b4822085e4caf98d07667fba988c224da345130e1f7d16208176:sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a"
        kernel_work_item_inspection_required:sha256:bd1029cf44e6c8f765482b09502c674636628ea2911cec466eee1a05161d0d54:sha256:02cd51ff5e463049bf81c547a7f0d271252d9477ebaf768ccaaeea15153c1579:
          after_revision: 53
          aggregate_digest: "sha256:4e5a8cb77b886f82d6e157604b135a7a803601a266b5233cf1c90ec94b70b850"
          before_revision: 52
          command_digest: "sha256:2645bf33c6089e44038809a40c672c05c6c1a6ff9d1247103771c74c86403566"
          effect_ids: []
          event_digests:
            - "sha256:bc555336d27cf6039c53c52186b0eca60f9d32dc9a59d0bc27b1c53c95b0753a"
          mutation_id: "kernel_work_item_inspection_required:sha256:bd1029cf44e6c8f765482b09502c674636628ea2911cec466eee1a05161d0d54:sha256:02cd51ff5e463049bf81c547a7f0d271252d9477ebaf768ccaaeea15153c1579"
        kernel_work_item_materialization_required:sha256:04994db33b6ce04d639a69000c5557e328e0570700fa5dd14896367c6123c670:sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79:
          after_revision: 36
          aggregate_digest: "sha256:7a029c09596d59db656c2ed71fd1f930a6ee178ac50f60ad7f46f4488208da70"
          before_revision: 35
          command_digest: "sha256:49fca0e247ef6599e5054f103be89a89899e9d261cc7a526479936126d33c82f"
          effect_ids: []
          event_digests:
            - "sha256:17c5475723e6c19eec95818bb804b97daf56dabf147ec5184107d11917c64ba7"
          mutation_id: "kernel_work_item_materialization_required:sha256:04994db33b6ce04d639a69000c5557e328e0570700fa5dd14896367c6123c670:sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79"
        kernel_work_item_materialization_required:sha256:3b40aa2df4fae68b4c1848e736f96d29ec3512d3f835c9cb0e6d1152d7af6c70:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c:
          after_revision: 12
          aggregate_digest: "sha256:6758702a7133e37205baf2b794d846235a3468452a04d251355742909463e96e"
          before_revision: 11
          command_digest: "sha256:11108a8bc4a69d3ddc21678fcd1342857f8add1a4d40b59f1a1bed4382bfdc0e"
          effect_ids: []
          event_digests:
            - "sha256:595f8017183efc185aa3146aef8f55a0468978aedb1da837c357d43035234962"
          mutation_id: "kernel_work_item_materialization_required:sha256:3b40aa2df4fae68b4c1848e736f96d29ec3512d3f835c9cb0e6d1152d7af6c70:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c"
        kernel_work_item_materialization_required:sha256:40e39bf241069db12ed3c86ac150efd8f1b2961b78205624c70d95fe54fe8b59:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b:
          after_revision: 4
          aggregate_digest: "sha256:37b252057a61a25650a60f1ca794736101d11853a98098a75bb083d39b69b5df"
          before_revision: 3
          command_digest: "sha256:6df7cb6e37035bf0fe8b0c517c18b93bc35686ccc4d52c3ce12a9028c28c87ad"
          effect_ids: []
          event_digests:
            - "sha256:b9fbb4735438f6128d625123b9132863f11b1b8d22ab56806959c6a93c4e7240"
          mutation_id: "kernel_work_item_materialization_required:sha256:40e39bf241069db12ed3c86ac150efd8f1b2961b78205624c70d95fe54fe8b59:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b"
        kernel_work_item_materialization_required:sha256:5890b9c4cf71d59f6348c722b9dc845ea61793268458fb0e5f0167681f93dd80:sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976:
          after_revision: 28
          aggregate_digest: "sha256:eb38585f9c42506a7b605a8b1da7a85d615e6dc53fdbf930d75b591af93c8eca"
          before_revision: 27
          command_digest: "sha256:ff02196bc01c8c50d4d0a6dbf721e9e8555c7e32f039b0f84d10f31fdb16ddc4"
          effect_ids: []
          event_digests:
            - "sha256:beebeef2b1abd7ee17dd84bee50df4acb8a50e328b4b2201ce21681e1a6e209f"
          mutation_id: "kernel_work_item_materialization_required:sha256:5890b9c4cf71d59f6348c722b9dc845ea61793268458fb0e5f0167681f93dd80:sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976"
        kernel_work_item_materialization_required:sha256:6d657cac32a05949a226af57ee622c1b45c787277091d7d49c1d391ea219b2c3:sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895:
          after_revision: 20
          aggregate_digest: "sha256:709e968245f97a7400e2c68d6db1dfb568b17aba6b0aab65f6987934f35f668d"
          before_revision: 19
          command_digest: "sha256:401a03e995fac62545df300da934f2c821f624c4c566214d1f03bbe89d64e6e6"
          effect_ids: []
          event_digests:
            - "sha256:94d9b4473ce325698e0145329f59ddf13dc50eee7d0ebb09b0b1068323e23520"
          mutation_id: "kernel_work_item_materialization_required:sha256:6d657cac32a05949a226af57ee622c1b45c787277091d7d49c1d391ea219b2c3:sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895"
        kernel_work_item_rework_claim_required:sha256:6432a890dea4ddec4f1572e5019f42041ced528138025ef33b4453e64b993e63:sha256:02cd51ff5e463049bf81c547a7f0d271252d9477ebaf768ccaaeea15153c1579:
          after_revision: 56
          aggregate_digest: "sha256:28abd48367cf65fffa1063a9d7a2773064815d2166df2468e4d3d168c9161869"
          before_revision: 55
          command_digest: "sha256:b4b12c8b4f1a5ed5930586bf136fce07f6e11b5af0f8d5c35ac67a4ea5993bbf"
          effect_ids: []
          event_digests:
            - "sha256:033da340bacb395232bc6110d53aec75866cd3a365c1b3bba17ac25feed5b449"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:6432a890dea4ddec4f1572e5019f42041ced528138025ef33b4453e64b993e63:sha256:02cd51ff5e463049bf81c547a7f0d271252d9477ebaf768ccaaeea15153c1579"
        reject:sha256:00aa6afce0d3c94e72ed248ebeefdd431f9af77af4ad744ad0672b5eb9ffed21:
          after_revision: 17
          aggregate_digest: "sha256:5c7ae7e4acb9c114f6933e7396d505d8426265569dcf2e98d14e6014bf3c4111"
          before_revision: 16
          command_digest: "sha256:e4d0d49bad87dd78fdb83c9db4736323bbbd6a12c6c3dd6a838aa24928ac1335"
          effect_ids: []
          event_digests:
            - "sha256:2a6ab8e56514ce9aa9ce5cc6217c93a0031a2d5c0ffc26aa6d46d296b11aa238"
          mutation_id: "reject:sha256:00aa6afce0d3c94e72ed248ebeefdd431f9af77af4ad744ad0672b5eb9ffed21"
        reject:sha256:28263015794a1c6a38abdfffe131cea027294ef161e95d981b47814ccae65008:
          after_revision: 25
          aggregate_digest: "sha256:dfb8aa5e12db86bfbc7bd223f423f8831d625fbe78d54b841b075658555cd8de"
          before_revision: 24
          command_digest: "sha256:054b02355b9298060928f1e237107729eb524bfeacf57b8c4c0cf54af5d953ca"
          effect_ids: []
          event_digests:
            - "sha256:b61c8aaa21ff2c17ce407771bc57d8590546ba11ddbf3f5fd454e4c6cd5cdf8c"
          mutation_id: "reject:sha256:28263015794a1c6a38abdfffe131cea027294ef161e95d981b47814ccae65008"
        reject:sha256:395c0b567ff1a846169cc738497c0270da05e0a11cb22490e503bf7e5586751c:
          after_revision: 9
          aggregate_digest: "sha256:d231dda1901c19286b042fbd33fb20677e43e6f73e654e224238e7529cdfec7c"
          before_revision: 8
          command_digest: "sha256:5bdfa2d6798109838a64ce3d73a405829b3bcc78199a7dc8d014ea9f132d8af4"
          effect_ids: []
          event_digests:
            - "sha256:a89a6d0fcc07163c7c054d61312f987f2513e968e242c8d8c7b190fabc6ecfa4"
          mutation_id: "reject:sha256:395c0b567ff1a846169cc738497c0270da05e0a11cb22490e503bf7e5586751c"
        reject:sha256:c76b90df51671ff62047478288b997974e90cc7ac745bfd220a2f8c688a14094:
          after_revision: 33
          aggregate_digest: "sha256:56d1a3fd9d982665b15577430c68208d35b68f94cf4aed4c5569a12c50a4726b"
          before_revision: 32
          command_digest: "sha256:d593fc1a32e28d5e2beb533d3edbcc66739d376e3200776513c46e942cfdfda5"
          effect_ids: []
          event_digests:
            - "sha256:99bea73a5d53ca275be26f829c5f0f5356c604e6c916417cde626b127c89821e"
          mutation_id: "reject:sha256:c76b90df51671ff62047478288b997974e90cc7ac745bfd220a2f8c688a14094"
        result:sha256:1248b3946792131ece092d92f0c14c0ef053d3f537e12971e53e51f7b00c5669:
          after_revision: 18
          aggregate_digest: "sha256:2c064a2d59bfa3328eed8f65c1ee3fe221f093e057c6d31e3cc619b348ab8cb0"
          before_revision: 17
          command_digest: "sha256:f3da48b9ea3dccc82408a8e4e284778be9d7dfb524f3d62bb604279bb02d33f6"
          effect_ids: []
          event_digests:
            - "sha256:0d15aef6ebe3acad5b744213b2b4637a55a46192a63fed0383bc28cd829f5cf1"
          mutation_id: "result:sha256:1248b3946792131ece092d92f0c14c0ef053d3f537e12971e53e51f7b00c5669"
        result:sha256:15aca89ff03cbde63bf88fbceff62d34ab0a316c313c57adfe11a335d5c5e23a:
          after_revision: 2
          aggregate_digest: "sha256:64f0a5efeeeea8cb7a1c5c16a177ae1adb738a3a468841fed1073d7d8e6d650a"
          before_revision: 1
          command_digest: "sha256:b1ba7a0e52588532deff2f47d07af77e508ea34409097282b78781d58e41e0a4"
          effect_ids: []
          event_digests:
            - "sha256:b1cd73addf1e839c1ee7fc5a1f47049b924d9800156c6db4f691d4577ae17c37"
          mutation_id: "result:sha256:15aca89ff03cbde63bf88fbceff62d34ab0a316c313c57adfe11a335d5c5e23a"
        result:sha256:2af108be3034b14a5e671ba183a75ac56706e7cd1a8e74d4b534577c4289685a:
          after_revision: 26
          aggregate_digest: "sha256:535d525311d31e99d952f0d4e16161bfb8a822062b7c6be7364ebb457fea7c0b"
          before_revision: 25
          command_digest: "sha256:a66d8cc8527665afcf203574fefa072d2ce627819978207a0c9c314361a1beb8"
          effect_ids: []
          event_digests:
            - "sha256:f6dbad985f136bdce1c6035ae7d2a69bfae0b8de3ba28a8bf960ab68b29ca06b"
          mutation_id: "result:sha256:2af108be3034b14a5e671ba183a75ac56706e7cd1a8e74d4b534577c4289685a"
        result:sha256:2f8cc077510151c45ede1c9066bd6176c0f833d64eb2d33507eccc11526bf01d:
          after_revision: 10
          aggregate_digest: "sha256:b41f58bd382b839f4c5dd989f7f799be86c5d950d403ba997e2caaa369aef4c8"
          before_revision: 9
          command_digest: "sha256:44f8027711a1aca9e8fcfa5d5fa1b7abc6adc2fd26fa89cc2acb19aec9031738"
          effect_ids: []
          event_digests:
            - "sha256:167d4d43d636fce793945549f1e25dba5804084b144e4d9155d0f2114114fd9c"
          mutation_id: "result:sha256:2f8cc077510151c45ede1c9066bd6176c0f833d64eb2d33507eccc11526bf01d"
        result:sha256:6a5a9c5914dff3fb7a76f51cc9d610b76ed5cebdaf4ad7e643580044f1a16cbb:
          after_revision: 52
          aggregate_digest: "sha256:2ef66577b6cfc0135fbdc152a234ac6c02afe0b88e395e114f1f4102bb3670a7"
          before_revision: 51
          command_digest: "sha256:a13b6438b1ae1cd2ac28d37a4342caa12d0901f682f3b2444ff19bde2b04f411"
          effect_ids: []
          event_digests:
            - "sha256:5d0dcdaaf3cc94d22493ded112f7e64ae0faad60466712785155d388a7f6e85f"
          mutation_id: "result:sha256:6a5a9c5914dff3fb7a76f51cc9d610b76ed5cebdaf4ad7e643580044f1a16cbb"
        result:sha256:b2e138242d54b1a7bec7eb7cc8476ecfcee397a2dcf9ef9e1d9adf2ffebb5c73:
          after_revision: 34
          aggregate_digest: "sha256:42ddd69ca9a183041686c2db83a1b07f0cfe8f95a4347247440f2b2869255424"
          before_revision: 33
          command_digest: "sha256:bfa2c2bfe9656e5161cb2e7111a7b769bd670d4e1cbc246095b51f1567ed5370"
          effect_ids: []
          event_digests:
            - "sha256:316616d8b500cdf160757588d371badda7630d3c6e2b653f4d8290423dc1d97f"
          mutation_id: "result:sha256:b2e138242d54b1a7bec7eb7cc8476ecfcee397a2dcf9ef9e1d9adf2ffebb5c73"
        result:sha256:d04f951c28987ae2e7fe0c1b6b96e613e4ab4868b48ea07b22e2f7c6285f081c:
          after_revision: 59
          aggregate_digest: "sha256:8c110e8a5bf1fefd6729fccd42469c2ea5eb6c2608a9420cdd0e25202321cbef"
          before_revision: 58
          command_digest: "sha256:ff94ed410c7d5d866a5517e9c436f0cf34ab7ae911ef47c9114e90219b142b65"
          effect_ids: []
          event_digests:
            - "sha256:f3162cdab88cca68cb2811b79f638553b7bf1e272ec65585ceabddfea9e1c172"
          mutation_id: "result:sha256:d04f951c28987ae2e7fe0c1b6b96e613e4ab4868b48ea07b22e2f7c6285f081c"
        semantic-stop:sha256:14ec5642ea59f56badbbc59c712fd8d83c7fd503eaa5c26a8fa295ad3945b952:
          after_revision: 24
          aggregate_digest: "sha256:9adc370125ba845219fec8249cf4b212c02c66db58e84ad077ad15f957d61ff8"
          before_revision: 23
          command_digest: "sha256:f93df5c8acf502c3c82539f8b9d3522665e2eda4c670f74f7b0ccd06f63127ae"
          effect_ids: []
          event_digests:
            - "sha256:35c2a70cf6f44a43c56535433b28c5c90bd8adb084ecd8eb00d3a0363fae559d"
          mutation_id: "semantic-stop:sha256:14ec5642ea59f56badbbc59c712fd8d83c7fd503eaa5c26a8fa295ad3945b952"
        semantic-stop:sha256:277bff235b9d1f6075312fa9941153ca85a3ae4c7ce53934cad13bb2da5fa1ff:
          after_revision: 16
          aggregate_digest: "sha256:fe4c2b5dc7ec53479de8957a6d6f944ef773fa5c65ae0ed16586e73f38d26152"
          before_revision: 15
          command_digest: "sha256:c59b1eb9767938867aae97860ac77228af9279460438a65797fe654f32edcce4"
          effect_ids: []
          event_digests:
            - "sha256:baa6c33cc1f06fcbe038df48c2dddec7a2b29fc4b9112402eb900cf1e621dcae"
          mutation_id: "semantic-stop:sha256:277bff235b9d1f6075312fa9941153ca85a3ae4c7ce53934cad13bb2da5fa1ff"
        semantic-stop:sha256:363c6ee5e226370057b90a271766c1a253b4a76d8be0db1e88965529b948747b:
          after_revision: 40
          aggregate_digest: "sha256:0b75c860e34db0abc436c89969e5cf62f45f524a20c2543860f55ada2cf7140b"
          before_revision: 39
          command_digest: "sha256:54a6317a3603b0d8b378b3e8778f0b851ed7aa37fa0a7536f769206cd99f39a0"
          effect_ids: []
          event_digests:
            - "sha256:febeacfd05494180dc05e6c758d24c149dcb175558389488983a0e6d9241de38"
          mutation_id: "semantic-stop:sha256:363c6ee5e226370057b90a271766c1a253b4a76d8be0db1e88965529b948747b"
        semantic-stop:sha256:3edce7c2275bd7f2eb5ec363dd5c9b322b003a09c793b4f126770acf23a45eb1:
          after_revision: 32
          aggregate_digest: "sha256:05d785f2e7422477a83b87514a9e8a48301f1d5a0d919ddda8e675d0b607a5e7"
          before_revision: 31
          command_digest: "sha256:3ee7bedee71f852d4177c3275783a486718e794d98c3d04fcc828c6f53e3200b"
          effect_ids: []
          event_digests:
            - "sha256:2da040a17a652f6977eed75c6511358d6ba76efc1bcf13200a896aa4e7e0774f"
          mutation_id: "semantic-stop:sha256:3edce7c2275bd7f2eb5ec363dd5c9b322b003a09c793b4f126770acf23a45eb1"
        semantic-stop:sha256:6b522ae9348e65879a575d8ff671a1a96714fda0ad7c80ead29997b31c07ec2f:
          after_revision: 8
          aggregate_digest: "sha256:fc94ffbe3f31f96f61a7ac961d0d8a18d326b19be58f9d5011cf22d38c1f1082"
          before_revision: 7
          command_digest: "sha256:7833b2ef45c2a8aad3d6d3787adfd8859b6969476b89e530fa3d8d17308bfd82"
          effect_ids: []
          event_digests:
            - "sha256:6a43952cb4b5101b597fb1d6e0be5b2fdc0e0032cb00785bc3a3f00e2a2c862b"
          mutation_id: "semantic-stop:sha256:6b522ae9348e65879a575d8ff671a1a96714fda0ad7c80ead29997b31c07ec2f"
        semantic-stop:sha256:bf77b5742d3f02afd859214ddefbc05ca5752e539cc7e047b5ff37271bbe4a6d:
          after_revision: 46
          aggregate_digest: "sha256:0604674ca7e558be1574d6d7ee19c1b8b1358e3ea4157833a5893d8f72fd4377"
          before_revision: 45
          command_digest: "sha256:bc4e56d935047245b0a319c0f84ce14b41472826225c04b3cb28a144f05ee3a9"
          effect_ids: []
          event_digests:
            - "sha256:110a378a6a9ac519becc8e97bb3e9dbbe3d71bb6c9a045befb453ca0f09db69f"
          mutation_id: "semantic-stop:sha256:bf77b5742d3f02afd859214ddefbc05ca5752e539cc7e047b5ff37271bbe4a6d"
        sha256:253111d51aa3cd25570e98b3dadb4025b15c2351962876228ff3395ec3b02e2c:
          after_revision: 58
          aggregate_digest: "sha256:8791fb83d8f474646e990cc0606432a6288951abd721b9a3911c7e172497c722"
          before_revision: 57
          command_digest: "sha256:51aef0a1ae8d3478e3469132f0519a96412bed1101198b419245f14f69863cb8"
          effect_ids: []
          event_digests:
            - "sha256:5fb1ef7ae9decdd6b30bd2affb1f56eb5a4893255716815c7d6be5e383e80626"
          mutation_id: "sha256:253111d51aa3cd25570e98b3dadb4025b15c2351962876228ff3395ec3b02e2c"
        sha256:3a9f5a36924f2121a7580f67c25fcc07849889836e039869e9a9ff786cf26e48:
          after_revision: 39
          aggregate_digest: "sha256:74d727e02377805e32d0b81eee295fa0d5c51b324ab7af8bb5c02e38d05074a6"
          before_revision: 38
          command_digest: "sha256:105d447059dd84cf3b4ab617ea29a59af3768930be594de8ca41a29492d1613c"
          effect_ids: []
          event_digests:
            - "sha256:3bc5fc4bae8364c17f334f7236ec1a5365369b393e33f5ced112bf7b29f090ca"
          mutation_id: "sha256:3a9f5a36924f2121a7580f67c25fcc07849889836e039869e9a9ff786cf26e48"
        sha256:54ce011cd9c54360a84d97da4f69f8f6d1e8f538d9ea24a5dd354e42a7be230e:
          after_revision: 45
          aggregate_digest: "sha256:e95ad19c3d6e544304f342e2958a63e49259b0903050d84f9cbf5d9cae77ee04"
          before_revision: 44
          command_digest: "sha256:4b760fc534ca8285f5db554b64532cad0e94b92702d9ac5f1e76339522bc30a9"
          effect_ids: []
          event_digests:
            - "sha256:ae515431e4bd13ddafd829ebd4f3468cdd9ed3889f2c6b0b22202ef7fd32bd65"
          mutation_id: "sha256:54ce011cd9c54360a84d97da4f69f8f6d1e8f538d9ea24a5dd354e42a7be230e"
        sha256:561530afcd4966d93314a588d33cddc142973cd2597d2c2a3742925cf1fe588f:
          after_revision: 3
          aggregate_digest: "sha256:2ab5b1899b2cc0f9470a9803af9c1e31483920e247915e4e6846d5202c8671d6"
          before_revision: 2
          command_digest: "sha256:064eaaed6b4fcd8f33f07904dde15fee368a3bafae03af7b10b65e4482c30fba"
          effect_ids: []
          event_digests:
            - "sha256:53242cee5f48ea9962d8724c8a9cbe86d56e2c83ab2dbd66befbab34810dd0e0"
          mutation_id: "sha256:561530afcd4966d93314a588d33cddc142973cd2597d2c2a3742925cf1fe588f"
        sha256:8065fe1a1e26ad565b931674d88746ff675c01a4b9074bf14cf880cfc863041e:
          after_revision: 15
          aggregate_digest: "sha256:b8c4ae2147fcaeaff5685a5d304fcef295ccbf00c567ff23ce5dd2a6816e982f"
          before_revision: 14
          command_digest: "sha256:74378e4c95e93db7e1eadbacff53d50b8456a15243f3e703a690ee8a08454dd7"
          effect_ids: []
          event_digests:
            - "sha256:33feb99b13e12df30ecc7c4902200695cd1d913c9ce4c7efdeb101d33d700d3f"
          mutation_id: "sha256:8065fe1a1e26ad565b931674d88746ff675c01a4b9074bf14cf880cfc863041e"
        sha256:9a6f601e9e6c91c940f52aeeca2595a2b1fa5f34831d0ba07b6ae6df8ec2d8c4:
          after_revision: 11
          aggregate_digest: "sha256:aaed2f4a98b56cbb59bad649a6392a5a5aafe11ee525209b828b3d0e0e81f0b4"
          before_revision: 10
          command_digest: "sha256:0bd2ef113a8c01978ce54cfcc91645fe2dc3f76bd771822e3550a654d3323e20"
          effect_ids: []
          event_digests:
            - "sha256:13d3f88df5e09e7c09510887d8557a6197fe13e9a5fa7bfe30a8b3ecbc01f438"
          mutation_id: "sha256:9a6f601e9e6c91c940f52aeeca2595a2b1fa5f34831d0ba07b6ae6df8ec2d8c4"
        sha256:9c73c3d37098173a2fde36e09d449c4ac6441dfbcb0d66e06fa93c0039b878ae:
          after_revision: 51
          aggregate_digest: "sha256:4a8843bfaa54de47d6a9af014963c11ea0d21785c82bc463194232ca80750ef1"
          before_revision: 50
          command_digest: "sha256:7b501e1506601a6b8fae9f1f1ab68d6df85bee87ede423e630f1e4f1c744fa49"
          effect_ids: []
          event_digests:
            - "sha256:340516dc55dd6a48063264321fc19a2247337e54756587a5af0cac31fdfaf445"
          mutation_id: "sha256:9c73c3d37098173a2fde36e09d449c4ac6441dfbcb0d66e06fa93c0039b878ae"
        sha256:c3bd2e5adcbba63458f29c08dab13cc0405b0a7ac36fa5b83b19486b92aa1c1d:
          after_revision: 23
          aggregate_digest: "sha256:97d940731b86d9627add42619ab57bfc10189e7e00219a6c8fcd822960523778"
          before_revision: 22
          command_digest: "sha256:7d1c9a09ebd19249ef482b5aa12849d316dc6f88bb8936157d91f123f1c9444d"
          effect_ids: []
          event_digests:
            - "sha256:09134ff05254f0d94b0306c75ee1d12ec7d404eabf5ef26f5ec0ccbc5fb08441"
          mutation_id: "sha256:c3bd2e5adcbba63458f29c08dab13cc0405b0a7ac36fa5b83b19486b92aa1c1d"
        sha256:c49e5ec0e79565b43370a67840209b6790edf538e902b6037f7dbf87608469b2:
          after_revision: 48
          aggregate_digest: "sha256:d2de4cc0dcaa38841bc69ab7a3b3067191c8fc11b937d02ce46eeffd91097446"
          before_revision: 47
          command_digest: "sha256:1d774ec213b44ff8b83b702209a81a873f740300ef748bdea6c7dfdb09d3a5c6"
          effect_ids: []
          event_digests:
            - "sha256:564668a8930f7105761f7c590f22c3c30cd7d16127a9273af774c3d012046fb0"
          mutation_id: "sha256:c49e5ec0e79565b43370a67840209b6790edf538e902b6037f7dbf87608469b2"
        sha256:d40431ef024efb98c39d0d6189c362d8a602a2e745f6bcfee6dee4b7188c4895:
          after_revision: 27
          aggregate_digest: "sha256:655f71a72a8cad3e0cd4bf302473b06f4403aafb6672c40739cd1c3dcb6b588e"
          before_revision: 26
          command_digest: "sha256:eefcf7fb853ae0f5f8ceb61cb39f23e572bceb8c9e8ec005f05d4835f42796f1"
          effect_ids: []
          event_digests:
            - "sha256:7210b4db0154aa44e3d36381f8432f03907ab68f0cb865c66b986e6686a9f681"
          mutation_id: "sha256:d40431ef024efb98c39d0d6189c362d8a602a2e745f6bcfee6dee4b7188c4895"
        sha256:d4a2e3b9a3c79a85c3d4517a862531e6458c24586c0fee22eb250d3bab0c8399:
          after_revision: 42
          aggregate_digest: "sha256:c9fabaa71ab8b4c18b0c579688c62f017e1406efa175fda193650c1d2bbe13d9"
          before_revision: 41
          command_digest: "sha256:d8a8265b2c0d33a28eeda8563f36a39a68cf8b998cc4e2edabb4d01f84c8bebe"
          effect_ids: []
          event_digests:
            - "sha256:f06f6cf9b6ca3a4400b2a5c6d4aba9b001942fa035f54f0f20d9f120159189ae"
          mutation_id: "sha256:d4a2e3b9a3c79a85c3d4517a862531e6458c24586c0fee22eb250d3bab0c8399"
        sha256:e3657760e6fd1101b19df1d9154f57803f5c03d9518b0d423a8379ca78d1b500:
          after_revision: 6
          aggregate_digest: "sha256:3618996c8a1fcee9020eee663417002bf8542576219cc8434b60d3ac0dc72682"
          before_revision: 5
          command_digest: "sha256:5c25349f83886659fd908cdd293a2be23b1978940f9360eea8c650bc889c14c8"
          effect_ids: []
          event_digests:
            - "sha256:190757a090da20023c590b2a4802fa5f03f90f7a1742b235f5921776e2b48236"
          mutation_id: "sha256:e3657760e6fd1101b19df1d9154f57803f5c03d9518b0d423a8379ca78d1b500"
        sha256:e5c71c9acdc0bfe5463417ac1011a17c273adfd820487c662ade9604fed4b4e4:
          after_revision: 31
          aggregate_digest: "sha256:21dcf82fcee1d6cf8ee87ec6918304bee7242494075502eb5a5aaa0905890347"
          before_revision: 30
          command_digest: "sha256:4d4d48cf3c51ff8af97f98a0f4db22c8997c2fb8fa839158fdc6886c347084b2"
          effect_ids: []
          event_digests:
            - "sha256:d0b97efcb7df50cca6b77831c5e00b8352e7507ba524d1dcf85ab8d78c43631b"
          mutation_id: "sha256:e5c71c9acdc0bfe5463417ac1011a17c273adfd820487c662ade9604fed4b4e4"
        sha256:ed50c59f0e3372a167413cc717249d3682f9957098bf41d5fde8dbd80d583196:
          after_revision: 19
          aggregate_digest: "sha256:dfa5be19728b15ab11ab18d4831b37cc13e283cf351ea264d9f6b3f24a09d19a"
          before_revision: 18
          command_digest: "sha256:508918c7f15e8f4810eda2a69883b483d2fd7db92460d777140ac2972bf34466"
          effect_ids: []
          event_digests:
            - "sha256:c8ee252fa36c9d5eea36db38c391dde34c8bd48bf240a048e5c72277286bdea6"
          mutation_id: "sha256:ed50c59f0e3372a167413cc717249d3682f9957098bf41d5fde8dbd80d583196"
        sha256:f9122b2f2e7cd078f90bb77d35cc697de9958fdaa3b5aa6d1f961654362b1579:
          after_revision: 35
          aggregate_digest: "sha256:6a25cdee3d5b71c90b7f5e2af307d80f8abfef3cddcba9eeb0d7f91f1c86bd8f"
          before_revision: 34
          command_digest: "sha256:60a04243e3aba6a33ff0b6c38ee8d040d0c6d8be80e7cc95a52cdfbceddc6399"
          effect_ids: []
          event_digests:
            - "sha256:4f323d4747bfa39aa173bab65de30dcb867d4d2f7e414da4f574f114416a3a09"
          mutation_id: "sha256:f9122b2f2e7cd078f90bb77d35cc697de9958fdaa3b5aa6d1f961654362b1579"
        validation-resolution:sha256:2a4d0f7978490d7d0d689ecc45f9fb8b694d327f3e31aacd812ee53054761fd7:
          after_revision: 62
          aggregate_digest: "sha256:9d2c1e52349dd368092ecab5ce6095508e7ac6718b852672e32e3479d012de98"
          before_revision: 61
          command_digest: "sha256:00bfccf768bd9807f2e9bd38358c4a733786dc5d746925f11a0096394f34efd4"
          effect_ids: []
          event_digests:
            - "sha256:57e255c04e1434bd7991c980130ab8109b9707bc88d6319f6eeac9e29feaf6ee"
          mutation_id: "validation-resolution:sha256:2a4d0f7978490d7d0d689ecc45f9fb8b694d327f3e31aacd812ee53054761fd7"
        validation-resolution:sha256:d4e8c95729a65a94104b3bd874cd3e72399361eb7da97bd47d397ee91f1f4a0c:
          after_revision: 55
          aggregate_digest: "sha256:a10427161019be77c37315e2dec0c45ee038a7132d992e2352d42eb8304f9128"
          before_revision: 54
          command_digest: "sha256:47daf96602faa5c9f3751d3a7b4965785f8929f35add8d03537d263c4e46b9b4"
          effect_ids: []
          event_digests:
            - "sha256:757cd0ad7a53147831d4771bc789a258942e1c94bbc40fa79045174202cdd2a1"
          mutation_id: "validation-resolution:sha256:d4e8c95729a65a94104b3bd874cd3e72399361eb7da97bd47d397ee91f1f4a0c"
        validation:sha256:6a5a9c5914dff3fb7a76f51cc9d610b76ed5cebdaf4ad7e643580044f1a16cbb:
          after_revision: 54
          aggregate_digest: "sha256:0ab24c529fbab8ce0090852312f6b97c7c1f53b06fe2ad28679905ca57b46e60"
          before_revision: 53
          command_digest: "sha256:76fdbd5cb2ea30ca0391a6f899e4534a3b3a2cf9efb21313b2155372c485028b"
          effect_ids: []
          event_digests:
            - "sha256:9e0d7c99ab52c81c4abe99bbc7b0bf4a53a518f743441f5df93746af8112a412"
          mutation_id: "validation:sha256:6a5a9c5914dff3fb7a76f51cc9d610b76ed5cebdaf4ad7e643580044f1a16cbb"
        validation:sha256:ceaa3ba7cfca376c4044d3d7bdfeccb054d77da9628c0334f5a86e204965c14f:
          after_revision: 61
          aggregate_digest: "sha256:4a8fc8b892661a128e9fe0d805b0846503b8ab7c59eff31d7c7d2e67f93b823d"
          before_revision: 60
          command_digest: "sha256:4dfcd985a75ea0936ef7ee6897e7e75622db98f76c3c9d266986f9514bc0ca3d"
          effect_ids: []
          event_digests:
            - "sha256:711c59fc0ce89dd48e22f0d621bbc1b42bbd6532d37f3853d1e9ae89842b95ff"
          mutation_id: "validation:sha256:ceaa3ba7cfca376c4044d3d7bdfeccb054d77da9628c0334f5a86e204965c14f"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:83de433d61d0042487da80b0576cb2511e132947e9e702c7528d07544ceefb2e"
          digest: "sha256:637284c63836cdf3f09843a3b224815b2e287cf15ed65cefba11f5331a69af87"
          revision: 1
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:ea8ea2cf9c14eea61704d4d127528d541ca4e4d47f0f6a67c90210cd8daa81e0"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_read"
                  - "repository_write"
                  - "git_read"
                  - "local_process"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                resources:
                  - "Bun 1.4.2"
                  - "Node 24"
                  - "existing release-critical harness"
                scope_roots:
                  - "packages/agentplane/src/commands/task/plan-approve.command.ts"
                  - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
                  - "scripts/bench/paired-m03-local-replay.mjs"
              expected_outputs:
                - "kernel-plan-routing-projection"
                - "release-critical-lifecycle-proof"
                - "lint-clean-replay-benchmark"
                - "full-release-validation"
              id: "release-blocker-repair"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:1c60fcbdf76d9feecff1e9f74997f9a1177d15e3ff3f789d477446d784573de8"
          digest: "sha256:3e175a171a85d810095dfe57618171fd14ec34c521ab7e2db8987f5d668a28da"
          revision: 2
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:7b3c97bb7c65c057838b423544bdcdec2ddfa50971c81647c7b09bf3f66f4f40"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_read"
                  - "repository_write"
                  - "git_read"
                  - "local_process"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                resources:
                  - "Bun 1.4.2"
                  - "Node 24"
                  - "existing release-critical harness"
                scope_roots:
                  - "packages/agentplane/src/commands/task/plan-approve.command.ts"
                  - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
                  - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
                  - "scripts/bench/paired-m03-local-replay.mjs"
              expected_outputs:
                - "kernel-plan-routing-projection"
                - "release-critical-lifecycle-proof"
                - "lint-clean-replay-benchmark"
                - "full-release-validation"
              id: "release-blocker-repair"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:6572c58d8ee74c6d47423805ac63eeb74295cb381c20a2e836d3221a40d2b514"
          digest: "sha256:d3a4e0e65e7cbe323147f17c368f16c66accc7e4020e1ded9c695df1b693490d"
          revision: 3
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:3cfe779b74ab5093378dcfc76999549cb623b0de8c209f732cd6f82b31fecb7d"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_read"
                  - "repository_write"
                  - "git_read"
                  - "local_process"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                resources:
                  - "Bun 1.4.2"
                  - "Node 24"
                  - "existing release-critical and trust-boundary harnesses"
                scope_roots:
                  - "packages/agentplane/src/commands/task/plan-approve.command.ts"
                  - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
                  - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
                  - "scripts/bench/paired-m03-local-replay.mjs"
                  - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
                  - "packages/core/src/tasks/task-centric/task-centric.test.ts"
                  - "scripts/checks/check-post-convergence-test-topology.mjs"
                  - "scripts/checks/post-convergence-test-topology.json"
                  - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
                  - "packages/agentplane/src/commands/task/migration-apply.ts"
              expected_outputs:
                - "kernel-plan-routing-projection"
                - "release-critical-lifecycle-proof"
                - "lint-clean-replay-benchmark"
                - "full-release-validation"
              id: "release-blocker-repair"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:190e0b0102731d70e8c49ec314e748490bfa548c9b8887b94c725385e248fa1e"
          digest: "sha256:857543c01910786e240efa8268cd7ab1b055d989e4dc1ddea5c2198ce097e428"
          revision: 4
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:da49bdaa5f6dd3c1a684865989c160d2e6438ca3d50d5edff8ea85c00ca54de1"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_read"
                  - "repository_write"
                  - "git_read"
                  - "local_process"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources:
                  - "Bun 1.4.2"
                  - "Node 24"
                  - "existing release verification harnesses"
                scope_roots:
                  - "packages/agentplane/src/commands/task/plan-approve.command.ts"
                  - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
                  - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
                  - "scripts/bench/paired-m03-local-replay.mjs"
                  - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
                  - "packages/core/src/tasks/task-centric/task-centric.test.ts"
                  - "scripts/checks/check-post-convergence-test-topology.mjs"
                  - "scripts/checks/post-convergence-test-topology.json"
                  - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
                  - "packages/agentplane/src/commands/task/migration-apply.ts"
                  - "docs/user/cli-reference.generated.mdx"
              expected_outputs:
                - "kernel-plan-routing-projection"
                - "release-critical-lifecycle-proof"
                - "lint-clean-replay-benchmark"
                - "full-release-validation"
              id: "release-blocker-repair"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:6414988666811f8f10afeb52379f5a6c7e6c09b2ae6c5487b56f7a44e2583933"
          digest: "sha256:64a26fafe3ac32479a61a2670c2958ca4fe256b91132a07dbf219e81196df759"
          revision: 5
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:8dbeb320dd3beb5a966aa1dd56c3a576d5aa177b19d7124af7b7ee89fe3df44a"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_read"
                  - "repository_write"
                  - "git_read"
                  - "local_process"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources:
                  - "Bun 1.4.2"
                  - "Node 24"
                  - "existing release verification harnesses"
                scope_roots:
                  - "packages/agentplane/src/commands/task/plan-approve.command.ts"
                  - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
                  - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
                  - "scripts/bench/paired-m03-local-replay.mjs"
                  - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
                  - "packages/core/src/tasks/task-centric/task-centric.test.ts"
                  - "scripts/checks/check-post-convergence-test-topology.mjs"
                  - "scripts/checks/post-convergence-test-topology.json"
                  - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
                  - "packages/agentplane/src/commands/task/migration-apply.ts"
                  - "docs/user/cli-reference.generated.mdx"
                  - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
                  - "packages/agentplane/src/commands/task/kernel-inspection.ts"
                  - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
              expected_outputs:
                - "kernel-plan-routing-projection"
                - "release-critical-lifecycle-proof"
                - "lint-clean-replay-benchmark"
                - "full-release-validation"
              id: "release-blocker-repair"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:a08788e673a16dde60f028baa8de1e92718d538dcffea3a156bd7d00463c358e"
          digest: "sha256:180764ab48776fd646f185676375d6db7f9c35d4342330149a2441a07ee99ed4"
          revision: 6
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:8dbeb320dd3beb5a966aa1dd56c3a576d5aa177b19d7124af7b7ee89fe3df44a"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_read"
                  - "repository_write"
                  - "git_read"
                  - "local_process"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "documentation"
                resources:
                  - "Bun 1.4.2"
                  - "Node 24"
                  - "existing release verification harnesses"
                scope_roots:
                  - "packages/agentplane/src/commands/task/plan-approve.command.ts"
                  - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
                  - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
                  - "scripts/bench/paired-m03-local-replay.mjs"
                  - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
                  - "packages/core/src/tasks/task-centric/task-centric.test.ts"
                  - "scripts/checks/check-post-convergence-test-topology.mjs"
                  - "scripts/checks/post-convergence-test-topology.json"
                  - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
                  - "packages/agentplane/src/commands/task/migration-apply.ts"
                  - "docs/user/cli-reference.generated.mdx"
                  - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
                  - "packages/agentplane/src/commands/task/kernel-inspection.ts"
                  - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
              expected_outputs:
                - "kernel-plan-routing-projection"
                - "release-critical-lifecycle-proof"
                - "lint-clean-replay-benchmark"
                - "full-release-validation"
              id: "release-blocker-repair"
              optional: false
              required_inputs: []
      revision: 64
      schema_version: 1
      state: "COMPLETED"
      work_items:
        release-blocker-repair:
          attempt: 4
          claim_id: "sha256:e58e1a6a3fdfb3e6113b3da1fd148e43a315ca5cb29b8d499941919e3f3df94e"
          definition:
            contract_digest: "sha256:8dbeb320dd3beb5a966aa1dd56c3a576d5aa177b19d7124af7b7ee89fe3df44a"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "local_process"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "documentation"
              resources:
                - "Bun 1.4.2"
                - "Node 24"
                - "existing release verification harnesses"
              scope_roots:
                - "packages/agentplane/src/commands/task/plan-approve.command.ts"
                - "packages/agentplane/src/commands/task/kernel-worktree-routing.ts"
                - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
                - "scripts/bench/paired-m03-local-replay.mjs"
                - "artifacts/m03-0.7.10-vs-0.7.11-local-replay.json"
                - "packages/core/src/tasks/task-centric/task-centric.test.ts"
                - "scripts/checks/check-post-convergence-test-topology.mjs"
                - "scripts/checks/post-convergence-test-topology.json"
                - "packages/agentplane/src/commands/shared/semantic-result-admission.ts"
                - "packages/agentplane/src/commands/task/migration-apply.ts"
                - "docs/user/cli-reference.generated.mdx"
                - "packages/agentplane/src/commands/task/migration-apply-conversion.ts"
                - "packages/agentplane/src/commands/task/kernel-inspection.ts"
                - "packages/agentplane/src/commands/task/kernel-inspection-validation.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-factory-branch.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification-checks.ts"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "website/static/llms-full.txt"
            expected_outputs:
              - "kernel-plan-routing-projection"
              - "release-critical-lifecycle-proof"
              - "lint-clean-replay-benchmark"
              - "full-release-validation"
            id: "release-blocker-repair"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 4
              digest: "sha256:d0577768b9e2b11ea074585760f6b0496ba066cd9721c7787ffc1863cf6e9ca3"
              id: "kernel-plan-routing-projection"
              kind: "report"
              plan_revision: 7
              repository_fingerprint: "sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a"
              task_id: "202609211051-X92CWM"
              work_item_id: "release-blocker-repair"
            -
              attempt: 4
              digest: "sha256:3a65bcb063f026b3b0502e0dcb0efe2b08bcf03291d39e6f23a92a4a62ab3d8d"
              id: "release-critical-lifecycle-proof"
              kind: "report"
              plan_revision: 7
              repository_fingerprint: "sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a"
              task_id: "202609211051-X92CWM"
              work_item_id: "release-blocker-repair"
            -
              attempt: 4
              digest: "sha256:951e072ae247597160bbcdc9882076ac63ae0965e315a2de8955613308360d90"
              id: "lint-clean-replay-benchmark"
              kind: "report"
              plan_revision: 7
              repository_fingerprint: "sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a"
              task_id: "202609211051-X92CWM"
              work_item_id: "release-blocker-repair"
            -
              attempt: 4
              digest: "sha256:447d2becc090660ae28da63e2ba7fdc3725aa61d7519e2259f347cd3fab88510"
              id: "full-release-validation"
              kind: "report"
              plan_revision: 7
              repository_fingerprint: "sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a"
              task_id: "202609211051-X92CWM"
              work_item_id: "release-blocker-repair"
          result_digest: "sha256:0f46bd1d8f9c1c3d34b512d3087824b923f9710bba191e4a04e252421f86aa25"
          revision: 23
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:1d5fb6bb1488447b1f34c22c22e2ae5871226d8b11583e88fbcddd842cb1c88e"
              - "sha256:79996b8ba4c2d09f78e81cb727dcc5c28dd4a26a110720b0d76c0e71938581b8"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:95a447d4310ed277208da2fef849f63d456b52b652e5eff061c78778cd45be75"
              environment_digest: "sha256:39bfc6e69b0d5653ede61e79547e51b1b6024299ff9a39b352fc773a2317c195"
              implementation_identity: "sha256:0f46bd1d8f9c1c3d34b512d3087824b923f9710bba191e4a04e252421f86aa25"
              toolchain_digest: "sha256:be5cb70d3cd4075bbda82296e3267bee5f79fff23613c02c8510e010c1394cd8"
            observed_at: "2026-09-21T12:49:36.138Z"
            status: "PASSED"
    digest: "sha256:852bf2edaf017453e55af4a7854a604c09f9a19ab1f1edb3204a882c787645eb"
    documents:
      contracts:
        sha256:3cfe779b74ab5093378dcfc76999549cb623b0de8c209f732cd6f82b31fecb7d:
          acceptance_criteria:
            - "Canonical approval writes an approved compatibility projection and executable Plan summary while preserving the Kernel record unchanged as authority."
            - "Canonical routing resolves the sole registered worktree by task identity after successful workflow preparation."
            - "The release-critical scenario proves branch bootstrap and fail-closed deterministic repair."
            - "Replay benchmark lint and all repository formatting pass without behavior change."
            - "Durable semantic work orders use AgentWorkOrderV2 at both typed boundaries and the trust-boundary ratchet passes without baseline additions."
            - "The focused scenario, full local CI, and every LC-24 gate pass."
          objective: "Remove every demonstrated 0.7.11 release blocker without weakening gates or adding baseline debt."
          role: "EXECUTOR"
          verification_commands:
            - "bun run lint"
            - "bun run format:check"
            - "node scripts/checks/check-trust-boundary-ratchet.mjs"
            - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
            - "node scripts/checks/check-post-convergence-test-topology.mjs"
            - "bun run test:fast"
            - "bun run test:release:critical"
            - "bun run package:install-smoke"
            - "bun run vitest:projects:check"
            - "bun run clone:check"
            - "bun run knip:check"
            - "bun run ci:local:full"
        sha256:7b3c97bb7c65c057838b423544bdcdec2ddfa50971c81647c7b09bf3f66f4f40:
          acceptance_criteria:
            - "Canonical approval writes an approved compatibility projection and executable Plan summary while preserving the Kernel record unchanged as authority."
            - "After successful workflow preparation, canonical routing resolves the sole registered worktree by task identity even when its admitted workflow slug differs from the synthesized fallback branch."
            - "The release-critical scenario proves fresh branch-PR task bootstrap through the public CLI after canonical approval."
            - "The same scenario proves failed deterministic verification returns to EXECUTOR before EVALUATOR and repaired output reaches EVALUATOR and terminal completion."
            - "The replay benchmark passes lint without behavior change."
            - "The focused critical scenario, lint, full local CI, and every LC-24 gate pass."
          objective: "Restore admitted branch-PR bootstrap and pass all 0.7.11 release checks without introducing a second lifecycle authority or weakening a gate."
          role: "EXECUTOR"
          verification_commands:
            - "bun run lint"
            - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
            - "node scripts/checks/check-post-convergence-test-topology.mjs"
            - "bun run test:fast"
            - "bun run test:release:critical"
            - "bun run package:install-smoke"
            - "bun run vitest:projects:check"
            - "bun run clone:check"
            - "bun run knip:check"
            - "bun run ci:local:full"
        sha256:8dbeb320dd3beb5a966aa1dd56c3a576d5aa177b19d7124af7b7ee89fe3df44a:
          acceptance_criteria:
            - "Canonical approval, task-identity worktree routing, fail-closed repair, typed semantic boundaries, generated docs, and benchmark lint remain correct."
            - "migration-apply.ts, kernel-inspection.ts, workflow-step-factory.ts, and direct-task-verification.ts are each at or below 600 lines after coherent internal extraction."
            - "No hotspot exception, duplicate public implementation, or compatibility path is introduced."
            - "All nearest tests, hotspot check, full local CI, and every LC-24 gate pass."
          objective: "Remove every demonstrated 0.7.11 release blocker without weakening gates, changing behavior, or adding baseline debt."
          role: "EXECUTOR"
          verification_commands:
            - "bun run hotspots:check"
            - "bun run docs:cli:check"
            - "bun run lint"
            - "bun run format:check"
            - "node scripts/checks/check-trust-boundary-ratchet.mjs"
            - "bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
            - "node scripts/checks/check-post-convergence-test-topology.mjs"
            - "bun run test:fast"
            - "bun run test:release:critical"
            - "bun run package:install-smoke"
            - "bun run vitest:projects:check"
            - "bun run clone:check"
            - "bun run knip:check"
            - "bun run ci:local:full"
        sha256:da49bdaa5f6dd3c1a684865989c160d2e6438ca3d50d5edff8ea85c00ca54de1:
          acceptance_criteria:
            - "Canonical approval and task-identity worktree routing satisfy the public branch-PR lifecycle."
            - "The release-critical scenario proves branch bootstrap and fail-closed deterministic repair."
            - "Formatting, replay lint, topology, and typed trust boundaries pass without baseline additions."
            - "The generated CLI reference exactly matches the built command catalog."
            - "The focused scenario, full local CI, and every LC-24 gate pass."
          objective: "Remove every demonstrated 0.7.11 release blocker without weakening gates or adding baseline debt."
          role: "EXECUTOR"
          verification_commands:
            - "bun run docs:cli:generate"
            - "bun run docs:cli:check"
            - "bun run lint"
            - "bun run format:check"
            - "node scripts/checks/check-trust-boundary-ratchet.mjs"
            - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
            - "node scripts/checks/check-post-convergence-test-topology.mjs"
            - "bun run test:fast"
            - "bun run test:release:critical"
            - "bun run package:install-smoke"
            - "bun run vitest:projects:check"
            - "bun run clone:check"
            - "bun run knip:check"
            - "bun run ci:local:full"
        sha256:ea8ea2cf9c14eea61704d4d127528d541ca4e4d47f0f6a67c90210cd8daa81e0:
          acceptance_criteria:
            - "Canonical approval writes an approved compatibility projection and executable Plan summary while preserving the Kernel record unchanged as authority."
            - "The release-critical scenario proves fresh branch-PR task bootstrap through the public CLI after canonical approval."
            - "The same scenario proves failed deterministic verification returns to EXECUTOR before EVALUATOR and repaired output reaches EVALUATOR and terminal completion."
            - "The replay benchmark passes lint without behavior change."
            - "The focused critical scenario, lint, full local CI, and every LC-24 gate pass."
          objective: "Restore admitted branch-PR bootstrap and pass all 0.7.11 release checks without introducing a second lifecycle authority or weakening a gate."
          role: "EXECUTOR"
          verification_commands:
            - "bun run lint"
            - "bun x vitest --config vitest.config.ts run packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
            - "node scripts/checks/check-post-convergence-test-topology.mjs"
            - "bun run test:fast"
            - "bun run test:release:critical"
            - "bun run package:install-smoke"
            - "bun run vitest:projects:check"
            - "bun run clone:check"
            - "bun run knip:check"
            - "bun run ci:local:full"
      intent:
        context: "Repair the demonstrated 0.7.11 release blockers without weakening gates: project canonical plan approval for branch-PR routing, fix replay-benchmark lint, prove fail-closed lifecycle repair and fresh branch worktree bootstrap in the release-critical scenario, then pass full CI and LC-24 gates."
        objective: "Repair the demonstrated 0.7.11 release blockers without weakening gates: project canonical plan approval for branch-PR routing, fix replay-benchmark lint, prove fail-closed lifecycle repair and fresh branch worktree bootstrap in the release-critical scenario, then pass full CI and LC-24 gates."
    events:
      -
        command_digest: "sha256:58f3c3999f503585bf4b245664df8b62d8ae773087991ad0539a7ff0819d9c30"
        id: "capture:202609211051-X92CWM:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609211051-X92CWM"
        occurred_at: "2026-09-21T10:51:31.171Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609211051-X92CWM"
        task_revision: 1
      -
        command_digest: "sha256:b1ba7a0e52588532deff2f47d07af77e508ea34409097282b78781d58e41e0a4"
        id: "result:sha256:15aca89ff03cbde63bf88fbceff62d34ab0a316c313c57adfe11a335d5c5e23a:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:15aca89ff03cbde63bf88fbceff62d34ab0a316c313c57adfe11a335d5c5e23a"
        occurred_at: "2026-09-21T10:52:17.332Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609211051-X92CWM"
        task_revision: 2
      -
        command_digest: "sha256:064eaaed6b4fcd8f33f07904dde15fee368a3bafae03af7b10b65e4482c30fba"
        id: "sha256:561530afcd4966d93314a588d33cddc142973cd2597d2c2a3742925cf1fe588f:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:561530afcd4966d93314a588d33cddc142973cd2597d2c2a3742925cf1fe588f"
        occurred_at: "2026-09-21T10:52:21.684Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609211051-X92CWM"
        task_revision: 3
      -
        command_digest: "sha256:6df7cb6e37035bf0fe8b0c517c18b93bc35686ccc4d52c3ce12a9028c28c87ad"
        id: "kernel_work_item_materialization_required:sha256:40e39bf241069db12ed3c86ac150efd8f1b2961b78205624c70d95fe54fe8b59:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:40e39bf241069db12ed3c86ac150efd8f1b2961b78205624c70d95fe54fe8b59:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b"
        occurred_at: "2026-09-21T10:52:29.228Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609211051-X92CWM"
        task_revision: 4
      -
        command_digest: "sha256:b02b9728fa4eed10fd2a28cc88c9876299d45be607bc765a0db7e48fcadefabc"
        id: "kernel_work_item_claim_required:sha256:45b66d262b5385fd84bb3763ddd599473377ef4bdf74cbc58e56792aba100421:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:45b66d262b5385fd84bb3763ddd599473377ef4bdf74cbc58e56792aba100421:sha256:5d92830c70462e6a2fc4c7946273f997c3cb81aaaf7f2819fa7dd247b919756b"
        occurred_at: "2026-09-21T10:52:33.070Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609211051-X92CWM"
        task_revision: 5
      -
        command_digest: "sha256:5c25349f83886659fd908cdd293a2be23b1978940f9360eea8c650bc889c14c8"
        id: "sha256:e3657760e6fd1101b19df1d9154f57803f5c03d9518b0d423a8379ca78d1b500:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:e3657760e6fd1101b19df1d9154f57803f5c03d9518b0d423a8379ca78d1b500"
        occurred_at: "2026-09-21T10:52:54.374Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202609211051-X92CWM"
        task_revision: 6
      -
        command_digest: "sha256:55c7c218570ca40bd301fdd36cfe8b7e7c826fb432674fa38ba8f00e969a9817"
        id: "kernel_work_item_execution_required:sha256:c535b29ec6b0568661cd9562f13b3882b2f69b9646b978f456f234eae06c5a18:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c535b29ec6b0568661cd9562f13b3882b2f69b9646b978f456f234eae06c5a18:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c"
        occurred_at: "2026-09-21T10:52:58.469Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202609211051-X92CWM"
        task_revision: 7
      -
        command_digest: "sha256:7833b2ef45c2a8aad3d6d3787adfd8859b6969476b89e530fa3d8d17308bfd82"
        id: "semantic-stop:sha256:6b522ae9348e65879a575d8ff671a1a96714fda0ad7c80ead29997b31c07ec2f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:6b522ae9348e65879a575d8ff671a1a96714fda0ad7c80ead29997b31c07ec2f"
        occurred_at: "2026-09-21T10:55:58.728Z"
        payload_digest: "sha256:c53cf778255870672bee6c6fb158f072e8ec07580e66553e9f5a5fd1dab69ca6"
        task_id: "202609211051-X92CWM"
        task_revision: 8
      -
        command_digest: "sha256:5bdfa2d6798109838a64ce3d73a405829b3bcc78199a7dc8d014ea9f132d8af4"
        id: "reject:sha256:395c0b567ff1a846169cc738497c0270da05e0a11cb22490e503bf7e5586751c:plan_rejected"
        kind: "plan_rejected"
        mutation_id: "reject:sha256:395c0b567ff1a846169cc738497c0270da05e0a11cb22490e503bf7e5586751c"
        occurred_at: "2026-09-21T10:56:43.159Z"
        payload_digest: "sha256:210d720fd9db399de9062f585e29a3879d7f09345fd1beb4c471546bf153255a"
        task_id: "202609211051-X92CWM"
        task_revision: 9
      -
        command_digest: "sha256:44f8027711a1aca9e8fcfa5d5fa1b7abc6adc2fd26fa89cc2acb19aec9031738"
        id: "result:sha256:2f8cc077510151c45ede1c9066bd6176c0f833d64eb2d33507eccc11526bf01d:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:2f8cc077510151c45ede1c9066bd6176c0f833d64eb2d33507eccc11526bf01d"
        occurred_at: "2026-09-21T10:57:36.092Z"
        payload_digest: "sha256:a200efd88c358847aed34923407883595221c720840e41bd1412cae4e9432e62"
        task_id: "202609211051-X92CWM"
        task_revision: 10
      -
        command_digest: "sha256:0bd2ef113a8c01978ce54cfcc91645fe2dc3f76bd771822e3550a654d3323e20"
        id: "sha256:9a6f601e9e6c91c940f52aeeca2595a2b1fa5f34831d0ba07b6ae6df8ec2d8c4:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:9a6f601e9e6c91c940f52aeeca2595a2b1fa5f34831d0ba07b6ae6df8ec2d8c4"
        occurred_at: "2026-09-21T10:57:44.769Z"
        payload_digest: "sha256:40ea801a3b3d94ae0a4312f5d0eb788c21e80b2b0d9e7c74104b7be5a3c387f9"
        task_id: "202609211051-X92CWM"
        task_revision: 11
      -
        command_digest: "sha256:11108a8bc4a69d3ddc21678fcd1342857f8add1a4d40b59f1a1bed4382bfdc0e"
        id: "kernel_work_item_materialization_required:sha256:3b40aa2df4fae68b4c1848e736f96d29ec3512d3f835c9cb0e6d1152d7af6c70:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:3b40aa2df4fae68b4c1848e736f96d29ec3512d3f835c9cb0e6d1152d7af6c70:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c"
        occurred_at: "2026-09-21T10:57:48.323Z"
        payload_digest: "sha256:2de36150836e32010d7230d3b5cbfb766f7840f8151bede2763c002bb5ccfff3"
        task_id: "202609211051-X92CWM"
        task_revision: 12
      -
        command_digest: "sha256:fae6c04ddf783885605ab4c1a36aaeb0730c4348e7a14b764845804a00e429bd"
        id: "kernel_work_item_claim_required:sha256:0e77f44ab3014c0c2ad2680ec3b4f3eee8864dae6c9195e47dcfeca373992d01:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:0e77f44ab3014c0c2ad2680ec3b4f3eee8864dae6c9195e47dcfeca373992d01:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c"
        occurred_at: "2026-09-21T10:57:52.423Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609211051-X92CWM"
        task_revision: 13
      -
        command_digest: "sha256:7b227704b9df07e86d31b99c3f73a5b821f582d9386f90ec383ff48a554cc039"
        id: "kernel_work_item_execution_required:sha256:c414241481a96e42c37a60ac0fa04ecd40d62cc9a0f9e897a0a7e1c5f244e8ef:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c414241481a96e42c37a60ac0fa04ecd40d62cc9a0f9e897a0a7e1c5f244e8ef:sha256:2399e02108a9099fa85713d02150366e5cd19f2968c796a533d48e8580e8ff3c"
        occurred_at: "2026-09-21T10:57:55.532Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202609211051-X92CWM"
        task_revision: 14
      -
        command_digest: "sha256:74378e4c95e93db7e1eadbacff53d50b8456a15243f3e703a690ee8a08454dd7"
        id: "sha256:8065fe1a1e26ad565b931674d88746ff675c01a4b9074bf14cf880cfc863041e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:8065fe1a1e26ad565b931674d88746ff675c01a4b9074bf14cf880cfc863041e"
        occurred_at: "2026-09-21T11:19:09.314Z"
        payload_digest: "sha256:0dee17456bb2c2db11e3bbdf36423b089c9680a33f0bc1f46dbca0515ff60d9b"
        task_id: "202609211051-X92CWM"
        task_revision: 15
      -
        command_digest: "sha256:c59b1eb9767938867aae97860ac77228af9279460438a65797fe654f32edcce4"
        id: "semantic-stop:sha256:277bff235b9d1f6075312fa9941153ca85a3ae4c7ce53934cad13bb2da5fa1ff:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:277bff235b9d1f6075312fa9941153ca85a3ae4c7ce53934cad13bb2da5fa1ff"
        occurred_at: "2026-09-21T11:19:12.335Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609211051-X92CWM"
        task_revision: 16
      -
        command_digest: "sha256:e4d0d49bad87dd78fdb83c9db4736323bbbd6a12c6c3dd6a838aa24928ac1335"
        id: "reject:sha256:00aa6afce0d3c94e72ed248ebeefdd431f9af77af4ad744ad0672b5eb9ffed21:plan_rejected"
        kind: "plan_rejected"
        mutation_id: "reject:sha256:00aa6afce0d3c94e72ed248ebeefdd431f9af77af4ad744ad0672b5eb9ffed21"
        occurred_at: "2026-09-21T11:19:21.980Z"
        payload_digest: "sha256:cdec183f983813d0669858577231a65552081bcef49cb4545f7f948bc8f4bf45"
        task_id: "202609211051-X92CWM"
        task_revision: 17
      -
        command_digest: "sha256:f3da48b9ea3dccc82408a8e4e284778be9d7dfb524f3d62bb604279bb02d33f6"
        id: "result:sha256:1248b3946792131ece092d92f0c14c0ef053d3f537e12971e53e51f7b00c5669:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:1248b3946792131ece092d92f0c14c0ef053d3f537e12971e53e51f7b00c5669"
        occurred_at: "2026-09-21T11:20:07.931Z"
        payload_digest: "sha256:d4b73da3c7d294ae22cabc4cbe48c565e46b8a205dc7ed41f93d4c4bc63619ad"
        task_id: "202609211051-X92CWM"
        task_revision: 18
      -
        command_digest: "sha256:508918c7f15e8f4810eda2a69883b483d2fd7db92460d777140ac2972bf34466"
        id: "sha256:ed50c59f0e3372a167413cc717249d3682f9957098bf41d5fde8dbd80d583196:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:ed50c59f0e3372a167413cc717249d3682f9957098bf41d5fde8dbd80d583196"
        occurred_at: "2026-09-21T11:20:17.218Z"
        payload_digest: "sha256:29a96828de55bcceec3e897bc6be420ea631abcb7fef2623e631c4ddda9d04cd"
        task_id: "202609211051-X92CWM"
        task_revision: 19
      -
        command_digest: "sha256:401a03e995fac62545df300da934f2c821f624c4c566214d1f03bbe89d64e6e6"
        id: "kernel_work_item_materialization_required:sha256:6d657cac32a05949a226af57ee622c1b45c787277091d7d49c1d391ea219b2c3:sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:6d657cac32a05949a226af57ee622c1b45c787277091d7d49c1d391ea219b2c3:sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895"
        occurred_at: "2026-09-21T11:20:20.952Z"
        payload_digest: "sha256:b16f73cc82e4c855680ed567a693e4750708b1e944fc5a918974bebf15bb9c75"
        task_id: "202609211051-X92CWM"
        task_revision: 20
      -
        command_digest: "sha256:3b224368e35c5e12d199f55163427aebf28fb2365298dbc8795d62aa575b956b"
        id: "kernel_work_item_claim_required:sha256:37f6d6d9454f13f64f7686b3e11963d2d9506ecd24054169e716ef7a24f41b9a:sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:37f6d6d9454f13f64f7686b3e11963d2d9506ecd24054169e716ef7a24f41b9a:sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895"
        occurred_at: "2026-09-21T11:20:25.108Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202609211051-X92CWM"
        task_revision: 21
      -
        command_digest: "sha256:12049d26762210d7efcaea0765a86a983b8c019113392b612c4f01b91fb89165"
        id: "kernel_work_item_execution_required:sha256:790b4550b5b5ae17440063706768b43efbcd3a666300ecc1b4b77b0816f29ea7:sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:790b4550b5b5ae17440063706768b43efbcd3a666300ecc1b4b77b0816f29ea7:sha256:37ac4459c7980ba8acc963d59e7ed580e59900aa98c73b440cf5a170466e4895"
        occurred_at: "2026-09-21T11:20:28.284Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202609211051-X92CWM"
        task_revision: 22
      -
        command_digest: "sha256:7d1c9a09ebd19249ef482b5aa12849d316dc6f88bb8936157d91f123f1c9444d"
        id: "sha256:c3bd2e5adcbba63458f29c08dab13cc0405b0a7ac36fa5b83b19486b92aa1c1d:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:c3bd2e5adcbba63458f29c08dab13cc0405b0a7ac36fa5b83b19486b92aa1c1d"
        occurred_at: "2026-09-21T11:30:46.538Z"
        payload_digest: "sha256:d47dd98692456ecd8c2232ce09064ac5e2cff5d4b61aee0c39058ec1a5b2e91b"
        task_id: "202609211051-X92CWM"
        task_revision: 23
      -
        command_digest: "sha256:f93df5c8acf502c3c82539f8b9d3522665e2eda4c670f74f7b0ccd06f63127ae"
        id: "semantic-stop:sha256:14ec5642ea59f56badbbc59c712fd8d83c7fd503eaa5c26a8fa295ad3945b952:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:14ec5642ea59f56badbbc59c712fd8d83c7fd503eaa5c26a8fa295ad3945b952"
        occurred_at: "2026-09-21T11:30:49.592Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202609211051-X92CWM"
        task_revision: 24
      -
        command_digest: "sha256:054b02355b9298060928f1e237107729eb524bfeacf57b8c4c0cf54af5d953ca"
        id: "reject:sha256:28263015794a1c6a38abdfffe131cea027294ef161e95d981b47814ccae65008:plan_rejected"
        kind: "plan_rejected"
        mutation_id: "reject:sha256:28263015794a1c6a38abdfffe131cea027294ef161e95d981b47814ccae65008"
        occurred_at: "2026-09-21T11:30:53.045Z"
        payload_digest: "sha256:c6148b5c9353ce958eca12f7fa2b4a10510ecab5400bb8b70986a4fbef3bcb65"
        task_id: "202609211051-X92CWM"
        task_revision: 25
      -
        command_digest: "sha256:a66d8cc8527665afcf203574fefa072d2ce627819978207a0c9c314361a1beb8"
        id: "result:sha256:2af108be3034b14a5e671ba183a75ac56706e7cd1a8e74d4b534577c4289685a:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:2af108be3034b14a5e671ba183a75ac56706e7cd1a8e74d4b534577c4289685a"
        occurred_at: "2026-09-21T11:31:42.947Z"
        payload_digest: "sha256:e4ff96289145bd3ca9e923be1e4994d66f2534a20654d5d3cd8f84be48a72076"
        task_id: "202609211051-X92CWM"
        task_revision: 26
      -
        command_digest: "sha256:eefcf7fb853ae0f5f8ceb61cb39f23e572bceb8c9e8ec005f05d4835f42796f1"
        id: "sha256:d40431ef024efb98c39d0d6189c362d8a602a2e745f6bcfee6dee4b7188c4895:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:d40431ef024efb98c39d0d6189c362d8a602a2e745f6bcfee6dee4b7188c4895"
        occurred_at: "2026-09-21T11:31:47.640Z"
        payload_digest: "sha256:1d114bc2419842f74da075760cc88ee9d85e28e472d8a022d3ac5239eab5e084"
        task_id: "202609211051-X92CWM"
        task_revision: 27
      -
        command_digest: "sha256:ff02196bc01c8c50d4d0a6dbf721e9e8555c7e32f039b0f84d10f31fdb16ddc4"
        id: "kernel_work_item_materialization_required:sha256:5890b9c4cf71d59f6348c722b9dc845ea61793268458fb0e5f0167681f93dd80:sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:5890b9c4cf71d59f6348c722b9dc845ea61793268458fb0e5f0167681f93dd80:sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976"
        occurred_at: "2026-09-21T11:31:51.689Z"
        payload_digest: "sha256:0417e52a4b34ba2317eb18e585db5acf502c9f3c004e254a6d8850eae34204d2"
        task_id: "202609211051-X92CWM"
        task_revision: 28
      -
        command_digest: "sha256:ec9f78fc2136a1b82c92936f7be48bbff2f6f74a3fff7b3f0fd4f850bae3a896"
        id: "kernel_work_item_claim_required:sha256:b4de59ff7fa0a2dde5ff7001e1e4cb5712c1b8d1b4e4aa5769bf90925c234689:sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:b4de59ff7fa0a2dde5ff7001e1e4cb5712c1b8d1b4e4aa5769bf90925c234689:sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976"
        occurred_at: "2026-09-21T11:31:56.178Z"
        payload_digest: "sha256:be14b62c42657d443241819bd50e2af1d1abb7355782ab6d19d2d7f55871def7"
        task_id: "202609211051-X92CWM"
        task_revision: 29
      -
        command_digest: "sha256:6da6cb681b35938d5a984e8e24bf079b2593812785a333f9721d4e19b9c80387"
        id: "kernel_work_item_execution_required:sha256:82dd6609cd62011bff24205e077bf13018fa20178307f8b1f25cf1f21b8f2635:sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:82dd6609cd62011bff24205e077bf13018fa20178307f8b1f25cf1f21b8f2635:sha256:d628429b1fa919efad9740a7f9bc51a0ae7c681ded7370100ce5484fe5b87976"
        occurred_at: "2026-09-21T11:31:59.604Z"
        payload_digest: "sha256:44c3de5777bf215ed1a66d03400a5882bd2b21bcf1a90ddddd59360976ed1d5b"
        task_id: "202609211051-X92CWM"
        task_revision: 30
      -
        command_digest: "sha256:4d4d48cf3c51ff8af97f98a0f4db22c8997c2fb8fa839158fdc6886c347084b2"
        id: "sha256:e5c71c9acdc0bfe5463417ac1011a17c273adfd820487c662ade9604fed4b4e4:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:e5c71c9acdc0bfe5463417ac1011a17c273adfd820487c662ade9604fed4b4e4"
        occurred_at: "2026-09-21T11:40:09.581Z"
        payload_digest: "sha256:f8f92483994f2aeee36455a8aef37798ccb0aa0f98a768f9257fd5f3451c0f68"
        task_id: "202609211051-X92CWM"
        task_revision: 31
      -
        command_digest: "sha256:3ee7bedee71f852d4177c3275783a486718e794d98c3d04fcc828c6f53e3200b"
        id: "semantic-stop:sha256:3edce7c2275bd7f2eb5ec363dd5c9b322b003a09c793b4f126770acf23a45eb1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:3edce7c2275bd7f2eb5ec363dd5c9b322b003a09c793b4f126770acf23a45eb1"
        occurred_at: "2026-09-21T11:40:12.660Z"
        payload_digest: "sha256:49bdd090620950f51eadc2a68b5a833b4b57257079afebef6f5ba57461c9e6eb"
        task_id: "202609211051-X92CWM"
        task_revision: 32
      -
        command_digest: "sha256:d593fc1a32e28d5e2beb533d3edbcc66739d376e3200776513c46e942cfdfda5"
        id: "reject:sha256:c76b90df51671ff62047478288b997974e90cc7ac745bfd220a2f8c688a14094:plan_rejected"
        kind: "plan_rejected"
        mutation_id: "reject:sha256:c76b90df51671ff62047478288b997974e90cc7ac745bfd220a2f8c688a14094"
        occurred_at: "2026-09-21T11:40:16.149Z"
        payload_digest: "sha256:4ffd0822f8299b584a24a17c0c4b55ead56ef40a2b6c7fcb764ab7e323894cae"
        task_id: "202609211051-X92CWM"
        task_revision: 33
      -
        command_digest: "sha256:bfa2c2bfe9656e5161cb2e7111a7b769bd670d4e1cbc246095b51f1567ed5370"
        id: "result:sha256:b2e138242d54b1a7bec7eb7cc8476ecfcee397a2dcf9ef9e1d9adf2ffebb5c73:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:b2e138242d54b1a7bec7eb7cc8476ecfcee397a2dcf9ef9e1d9adf2ffebb5c73"
        occurred_at: "2026-09-21T11:41:07.563Z"
        payload_digest: "sha256:3d0a2ffeb796b4280e5d63396c89b496c2f440df5db0aeeb1f08076c655bafe5"
        task_id: "202609211051-X92CWM"
        task_revision: 34
      -
        command_digest: "sha256:60a04243e3aba6a33ff0b6c38ee8d040d0c6d8be80e7cc95a52cdfbceddc6399"
        id: "sha256:f9122b2f2e7cd078f90bb77d35cc697de9958fdaa3b5aa6d1f961654362b1579:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:f9122b2f2e7cd078f90bb77d35cc697de9958fdaa3b5aa6d1f961654362b1579"
        occurred_at: "2026-09-21T11:41:12.237Z"
        payload_digest: "sha256:935ee39d490f554fae27a336392179e9d75403e518aff7b08eb3ab5d7bb574e4"
        task_id: "202609211051-X92CWM"
        task_revision: 35
      -
        command_digest: "sha256:49fca0e247ef6599e5054f103be89a89899e9d261cc7a526479936126d33c82f"
        id: "kernel_work_item_materialization_required:sha256:04994db33b6ce04d639a69000c5557e328e0570700fa5dd14896367c6123c670:sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:04994db33b6ce04d639a69000c5557e328e0570700fa5dd14896367c6123c670:sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79"
        occurred_at: "2026-09-21T11:41:16.059Z"
        payload_digest: "sha256:f4405a7eb3d1efff912e2ec6d14ca5df1fdc413a2fff71c9ad4938eebed793d6"
        task_id: "202609211051-X92CWM"
        task_revision: 36
      -
        command_digest: "sha256:91d5ac96d69cb88a091610795e29719976b11d9c9bb275675afa871bc5cb9e59"
        id: "kernel_work_item_claim_required:sha256:9351dc4aecbf5f45101f834a3e543bb963d16b9d20b576cdde1f6d5500a1745f:sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:9351dc4aecbf5f45101f834a3e543bb963d16b9d20b576cdde1f6d5500a1745f:sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79"
        occurred_at: "2026-09-21T11:41:20.291Z"
        payload_digest: "sha256:4b57ae96bbb30b8ddf86b349a9cf7ad9ef25bfaba3a6768eec3e07df7deebdc0"
        task_id: "202609211051-X92CWM"
        task_revision: 37
      -
        command_digest: "sha256:da10fb5007ff7dc481a71824af8dd09f0d81432ce2487232954c27bd158d6777"
        id: "kernel_work_item_execution_required:sha256:9440d9b9225c1b709e7f1cf976065298e1b1032973ef55d105736aa3977c18c2:sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:9440d9b9225c1b709e7f1cf976065298e1b1032973ef55d105736aa3977c18c2:sha256:3001148eadd09bd318df883a4458f1b4deed8b7a58ff7d5bb1eb92d10a6c2b79"
        occurred_at: "2026-09-21T11:41:23.527Z"
        payload_digest: "sha256:3d6e5aa65da47bbe339aa7dc612be0526a101e886703c7d258cbf804ec6dc165"
        task_id: "202609211051-X92CWM"
        task_revision: 38
      -
        command_digest: "sha256:105d447059dd84cf3b4ab617ea29a59af3768930be594de8ca41a29492d1613c"
        id: "sha256:3a9f5a36924f2121a7580f67c25fcc07849889836e039869e9a9ff786cf26e48:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:3a9f5a36924f2121a7580f67c25fcc07849889836e039869e9a9ff786cf26e48"
        occurred_at: "2026-09-21T12:05:05.180Z"
        payload_digest: "sha256:ccfc3d6a41a895c4897d0031547f1cc8c36461950f21965445727e4fc380ad09"
        task_id: "202609211051-X92CWM"
        task_revision: 39
      -
        command_digest: "sha256:54a6317a3603b0d8b378b3e8778f0b851ed7aa37fa0a7536f769206cd99f39a0"
        id: "semantic-stop:sha256:363c6ee5e226370057b90a271766c1a253b4a76d8be0db1e88965529b948747b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:363c6ee5e226370057b90a271766c1a253b4a76d8be0db1e88965529b948747b"
        occurred_at: "2026-09-21T12:05:08.232Z"
        payload_digest: "sha256:8bb320edc47fdc8431f0d1f38079c0446516b64de9d5a93e99a8068d335efe7e"
        task_id: "202609211051-X92CWM"
        task_revision: 40
      -
        command_digest: "sha256:db0fabd1e47d387db42c881a43c791cd9573738e34278655e526b2843dc891a9"
        id: "amend:sha256:180764ab48776fd646f185676375d6db7f9c35d4342330149a2441a07ee99ed4:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:180764ab48776fd646f185676375d6db7f9c35d4342330149a2441a07ee99ed4"
        occurred_at: "2026-09-21T12:07:23.073Z"
        payload_digest: "sha256:1028c60ad1d7af5a4d12574e8b1cd79a13c06e15bb48fa3dac310c28ed6a6e4f"
        task_id: "202609211051-X92CWM"
        task_revision: 41
      -
        command_digest: "sha256:d8a8265b2c0d33a28eeda8563f36a39a68cf8b998cc4e2edabb4d01f84c8bebe"
        id: "sha256:d4a2e3b9a3c79a85c3d4517a862531e6458c24586c0fee22eb250d3bab0c8399:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:d4a2e3b9a3c79a85c3d4517a862531e6458c24586c0fee22eb250d3bab0c8399"
        occurred_at: "2026-09-21T12:07:25.119Z"
        payload_digest: "sha256:bc22c1e4d22a7f545c38c3a7bb4c7f40467d501da3b54b80b0c1d9ef24a482a1"
        task_id: "202609211051-X92CWM"
        task_revision: 42
      -
        command_digest: "sha256:07557d5ebffea1f314caf73ddc56c6ae3cb5ab8993659ab8cd6315b3fdce992e"
        id: "kernel_work_item_claim_required:sha256:c1b19dead7a654d01a6b2ad5bce97eaea1ba216f26e1afe17e1e0fcb2a2c3413:sha256:8f8df17479f24b62da6379dd3b29cfa3fc87204a95f3cc431ff7652ad893af97:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:c1b19dead7a654d01a6b2ad5bce97eaea1ba216f26e1afe17e1e0fcb2a2c3413:sha256:8f8df17479f24b62da6379dd3b29cfa3fc87204a95f3cc431ff7652ad893af97"
        occurred_at: "2026-09-21T12:07:37.036Z"
        payload_digest: "sha256:0bcd5e2250d1b29f52698da2f1f0735696491baf0d0977d6ec4841af151706da"
        task_id: "202609211051-X92CWM"
        task_revision: 43
      -
        command_digest: "sha256:b6c403577a4ae0eba336d3ff2c453dc661345314b30e62ed56814d3e79445f35"
        id: "kernel_work_item_execution_required:sha256:7deb0b26f114df6243e5ea3c980032bace649ca8a2502b85bd765b5fe4863344:sha256:8f8df17479f24b62da6379dd3b29cfa3fc87204a95f3cc431ff7652ad893af97:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:7deb0b26f114df6243e5ea3c980032bace649ca8a2502b85bd765b5fe4863344:sha256:8f8df17479f24b62da6379dd3b29cfa3fc87204a95f3cc431ff7652ad893af97"
        occurred_at: "2026-09-21T12:07:40.256Z"
        payload_digest: "sha256:2b8db6629fc3661083d28fd293ac8310cb672336c3c50ee40666eb183bba0e78"
        task_id: "202609211051-X92CWM"
        task_revision: 44
      -
        command_digest: "sha256:4b760fc534ca8285f5db554b64532cad0e94b92702d9ac5f1e76339522bc30a9"
        id: "sha256:54ce011cd9c54360a84d97da4f69f8f6d1e8f538d9ea24a5dd354e42a7be230e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:54ce011cd9c54360a84d97da4f69f8f6d1e8f538d9ea24a5dd354e42a7be230e"
        occurred_at: "2026-09-21T12:08:47.564Z"
        payload_digest: "sha256:f933b664c7a027baac48757c98ae459a9fe5aeed5ef8ad0a934908f5df46da00"
        task_id: "202609211051-X92CWM"
        task_revision: 45
      -
        command_digest: "sha256:bc4e56d935047245b0a319c0f84ce14b41472826225c04b3cb28a144f05ee3a9"
        id: "semantic-stop:sha256:bf77b5742d3f02afd859214ddefbc05ca5752e539cc7e047b5ff37271bbe4a6d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:bf77b5742d3f02afd859214ddefbc05ca5752e539cc7e047b5ff37271bbe4a6d"
        occurred_at: "2026-09-21T12:08:50.609Z"
        payload_digest: "sha256:3b47a4f72ab7ab9b3cfafc1174f8be60080d50a0014e4b0b04406f5a1b69f16d"
        task_id: "202609211051-X92CWM"
        task_revision: 46
      -
        command_digest: "sha256:5144b19635cb9a91661e9dcf525c7987593ad0d216b2e42646a4a81ae6021217"
        id: "amend:sha256:8dc6dddb6cc8a2ed24c14dbba2ebf605686eb51a621e5bf68a811d7f47f319f7:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:8dc6dddb6cc8a2ed24c14dbba2ebf605686eb51a621e5bf68a811d7f47f319f7"
        occurred_at: "2026-09-21T12:09:02.584Z"
        payload_digest: "sha256:b2ebcc7bf40308f15df56fc8911eb0f2197be892eaf74475e7c6570476531cda"
        task_id: "202609211051-X92CWM"
        task_revision: 47
      -
        command_digest: "sha256:1d774ec213b44ff8b83b702209a81a873f740300ef748bdea6c7dfdb09d3a5c6"
        id: "sha256:c49e5ec0e79565b43370a67840209b6790edf538e902b6037f7dbf87608469b2:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:c49e5ec0e79565b43370a67840209b6790edf538e902b6037f7dbf87608469b2"
        occurred_at: "2026-09-21T12:09:04.656Z"
        payload_digest: "sha256:52977953e66d29f73915ece2d7899debe7e1a28f7decf0e74129f71597823979"
        task_id: "202609211051-X92CWM"
        task_revision: 48
      -
        command_digest: "sha256:60114c7710b0a0612cd1120bfb44a7c3326fc705ec8e28cd87383fb401e3d056"
        id: "kernel_work_item_claim_required:sha256:fae87a515df6d172d655cca6e47ce6411fb6f886b63536ce08cebcfc8d84ab3c:sha256:cced7bc338920930e3ea9be82584686e9c507880a5696e0d619e154f0515c367:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:fae87a515df6d172d655cca6e47ce6411fb6f886b63536ce08cebcfc8d84ab3c:sha256:cced7bc338920930e3ea9be82584686e9c507880a5696e0d619e154f0515c367"
        occurred_at: "2026-09-21T12:09:10.374Z"
        payload_digest: "sha256:a8ab5da46010ff17fa02de04a8b9468b3acd2b6ed9c17e55d3b78a2c8782aa87"
        task_id: "202609211051-X92CWM"
        task_revision: 49
      -
        command_digest: "sha256:72064aa19cfac0d82265d230a709e1770de41f507d3974d4980292d493338cf9"
        id: "kernel_work_item_execution_required:sha256:80d1401fa9477a50b9c94d5cb6478864e291a5f640a0e27b54fd93bcf7424e6d:sha256:cced7bc338920930e3ea9be82584686e9c507880a5696e0d619e154f0515c367:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:80d1401fa9477a50b9c94d5cb6478864e291a5f640a0e27b54fd93bcf7424e6d:sha256:cced7bc338920930e3ea9be82584686e9c507880a5696e0d619e154f0515c367"
        occurred_at: "2026-09-21T12:09:13.667Z"
        payload_digest: "sha256:73adb8c182f05db4f2e6a5193e7e62702fd8c6989dbbc34809a9f59bc5dc8825"
        task_id: "202609211051-X92CWM"
        task_revision: 50
      -
        command_digest: "sha256:7b501e1506601a6b8fae9f1f1ab68d6df85bee87ede423e630f1e4f1c744fa49"
        id: "sha256:9c73c3d37098173a2fde36e09d449c4ac6441dfbcb0d66e06fa93c0039b878ae:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:9c73c3d37098173a2fde36e09d449c4ac6441dfbcb0d66e06fa93c0039b878ae"
        occurred_at: "2026-09-21T12:18:32.728Z"
        payload_digest: "sha256:3551244995323c5e202cce54880e5ed1c7a5a100f92e4a1984feda322fb37a69"
        task_id: "202609211051-X92CWM"
        task_revision: 51
      -
        command_digest: "sha256:a13b6438b1ae1cd2ac28d37a4342caa12d0901f682f3b2444ff19bde2b04f411"
        id: "result:sha256:6a5a9c5914dff3fb7a76f51cc9d610b76ed5cebdaf4ad7e643580044f1a16cbb:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:6a5a9c5914dff3fb7a76f51cc9d610b76ed5cebdaf4ad7e643580044f1a16cbb"
        occurred_at: "2026-09-21T12:18:37.024Z"
        payload_digest: "sha256:6fb5465756c2cf6fab4ec4d6fec4eb5114e0afc908a2e5b2732392d57dd77a84"
        task_id: "202609211051-X92CWM"
        task_revision: 52
      -
        command_digest: "sha256:2645bf33c6089e44038809a40c672c05c6c1a6ff9d1247103771c74c86403566"
        id: "kernel_work_item_inspection_required:sha256:bd1029cf44e6c8f765482b09502c674636628ea2911cec466eee1a05161d0d54:sha256:02cd51ff5e463049bf81c547a7f0d271252d9477ebaf768ccaaeea15153c1579:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:bd1029cf44e6c8f765482b09502c674636628ea2911cec466eee1a05161d0d54:sha256:02cd51ff5e463049bf81c547a7f0d271252d9477ebaf768ccaaeea15153c1579"
        occurred_at: "2026-09-21T12:18:40.482Z"
        payload_digest: "sha256:8cfb7d7a7bab1f0a496322b68afe9e57edc1e5dbd14af67ef3b6dfd2ea0d07e6"
        task_id: "202609211051-X92CWM"
        task_revision: 53
      -
        command_digest: "sha256:76fdbd5cb2ea30ca0391a6f899e4534a3b3a2cf9efb21313b2155372c485028b"
        id: "validation:sha256:6a5a9c5914dff3fb7a76f51cc9d610b76ed5cebdaf4ad7e643580044f1a16cbb:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:6a5a9c5914dff3fb7a76f51cc9d610b76ed5cebdaf4ad7e643580044f1a16cbb"
        occurred_at: "2026-09-21T12:26:58.592Z"
        payload_digest: "sha256:015f2b5eb22bc06dd75a2c4ffaa018fa3c1ac3c4a875695ee3ec1366c6930367"
        task_id: "202609211051-X92CWM"
        task_revision: 54
      -
        command_digest: "sha256:47daf96602faa5c9f3751d3a7b4965785f8929f35add8d03537d263c4e46b9b4"
        id: "validation-resolution:sha256:d4e8c95729a65a94104b3bd874cd3e72399361eb7da97bd47d397ee91f1f4a0c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:d4e8c95729a65a94104b3bd874cd3e72399361eb7da97bd47d397ee91f1f4a0c"
        occurred_at: "2026-09-21T12:27:00.918Z"
        payload_digest: "sha256:f45b55230035d9446470efeb8317eb2ab86b7e3cb37cbe75bd650d7ecfe3360e"
        task_id: "202609211051-X92CWM"
        task_revision: 55
      -
        command_digest: "sha256:b4b12c8b4f1a5ed5930586bf136fce07f6e11b5af0f8d5c35ac67a4ea5993bbf"
        id: "kernel_work_item_rework_claim_required:sha256:6432a890dea4ddec4f1572e5019f42041ced528138025ef33b4453e64b993e63:sha256:02cd51ff5e463049bf81c547a7f0d271252d9477ebaf768ccaaeea15153c1579:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:6432a890dea4ddec4f1572e5019f42041ced528138025ef33b4453e64b993e63:sha256:02cd51ff5e463049bf81c547a7f0d271252d9477ebaf768ccaaeea15153c1579"
        occurred_at: "2026-09-21T12:27:05.678Z"
        payload_digest: "sha256:e274569d39b1d1f5dd241564cd92011f0b7d71d10ebfc0456dafef2f8be24e09"
        task_id: "202609211051-X92CWM"
        task_revision: 56
      -
        command_digest: "sha256:996f5bfba91100a4acbad824573cb18c307e337a68688335b6827eec46e6b534"
        id: "kernel_work_item_execution_required:sha256:4ba5b3551ca66313f3de1725662e3241ff37a3fab4fbea23864fed275347c71e:sha256:02cd51ff5e463049bf81c547a7f0d271252d9477ebaf768ccaaeea15153c1579:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4ba5b3551ca66313f3de1725662e3241ff37a3fab4fbea23864fed275347c71e:sha256:02cd51ff5e463049bf81c547a7f0d271252d9477ebaf768ccaaeea15153c1579"
        occurred_at: "2026-09-21T12:27:09.316Z"
        payload_digest: "sha256:683c413683c848a8f021ba3cad0592d934438debd0bcd6265bfae229b6a2f64a"
        task_id: "202609211051-X92CWM"
        task_revision: 57
      -
        command_digest: "sha256:51aef0a1ae8d3478e3469132f0519a96412bed1101198b419245f14f69863cb8"
        id: "sha256:253111d51aa3cd25570e98b3dadb4025b15c2351962876228ff3395ec3b02e2c:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:253111d51aa3cd25570e98b3dadb4025b15c2351962876228ff3395ec3b02e2c"
        occurred_at: "2026-09-21T12:31:01.666Z"
        payload_digest: "sha256:39d425cf18273386ba7397dc1e9c5041b3c512ad002f60a70b6c06bdd62c9545"
        task_id: "202609211051-X92CWM"
        task_revision: 58
      -
        command_digest: "sha256:ff94ed410c7d5d866a5517e9c436f0cf34ab7ae911ef47c9114e90219b142b65"
        id: "result:sha256:d04f951c28987ae2e7fe0c1b6b96e613e4ab4868b48ea07b22e2f7c6285f081c:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:d04f951c28987ae2e7fe0c1b6b96e613e4ab4868b48ea07b22e2f7c6285f081c"
        occurred_at: "2026-09-21T12:31:06.162Z"
        payload_digest: "sha256:89c5a438f96ea2b80aa2e0f7a1548a9763fd44a92c64a9c53bb85025eca47861"
        task_id: "202609211051-X92CWM"
        task_revision: 59
      -
        command_digest: "sha256:804b8c70467a01b6a225de981729ac0d0857584c5bbce8797ac76c36933fa121"
        id: "kernel_work_item_inspection_required:sha256:297fbadc5048b4822085e4caf98d07667fba988c224da345130e1f7d16208176:sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:297fbadc5048b4822085e4caf98d07667fba988c224da345130e1f7d16208176:sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a"
        occurred_at: "2026-09-21T12:31:09.904Z"
        payload_digest: "sha256:9f79c6d7022277c85eea828a691b0b9848c36d9e103710ff7ad25cae72beede3"
        task_id: "202609211051-X92CWM"
        task_revision: 60
      -
        command_digest: "sha256:4dfcd985a75ea0936ef7ee6897e7e75622db98f76c3c9d266986f9514bc0ca3d"
        id: "validation:sha256:ceaa3ba7cfca376c4044d3d7bdfeccb054d77da9628c0334f5a86e204965c14f:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:ceaa3ba7cfca376c4044d3d7bdfeccb054d77da9628c0334f5a86e204965c14f"
        occurred_at: "2026-09-21T12:49:40.323Z"
        payload_digest: "sha256:44aed9ff8852ebbc33c5d63e82904c5a8b3b589aa30ffac5a23737b84b3ec954"
        task_id: "202609211051-X92CWM"
        task_revision: 61
      -
        command_digest: "sha256:00bfccf768bd9807f2e9bd38358c4a733786dc5d746925f11a0096394f34efd4"
        id: "validation-resolution:sha256:2a4d0f7978490d7d0d689ecc45f9fb8b694d327f3e31aacd812ee53054761fd7:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:2a4d0f7978490d7d0d689ecc45f9fb8b694d327f3e31aacd812ee53054761fd7"
        occurred_at: "2026-09-21T12:49:42.550Z"
        payload_digest: "sha256:549553d878c18efc3b207a18305754d1e32f11dc76540096754f12817ef67091"
        task_id: "202609211051-X92CWM"
        task_revision: 62
      -
        command_digest: "sha256:371ab6c21ad6a35d2e87d176f4cc2ec421a4376f540a5650f558a1e2515927b9"
        id: "final-validation:sha256:15a7f52c4b4cc6fc45c0fe296b3f978b9e96ea3b2d3e433ad486af87e0d33e92:62:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:15a7f52c4b4cc6fc45c0fe296b3f978b9e96ea3b2d3e433ad486af87e0d33e92:62"
        occurred_at: "2026-09-21T13:05:39.398Z"
        payload_digest: "sha256:6cc5ee26936b25e9b6052ea5ee3b0c46b9cba0fb1016e7198cc31e59e22fc183"
        task_id: "202609211051-X92CWM"
        task_revision: 63
      -
        command_digest: "sha256:c2f161e09823a10c95efe966a6b6209ea50c39301e64f29acc751c211ad3ab25"
        id: "kernel_task_completion_required:sha256:07131e1ac002fb090708a5e800d1fa7924173ab7aadcf84297be25c931d49702:sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:07131e1ac002fb090708a5e800d1fa7924173ab7aadcf84297be25c931d49702:sha256:2cfe0d2d19dbb8f884d2d572637923831c2e3f252f53ca16d303647774912e3a"
        occurred_at: "2026-09-21T13:07:02.600Z"
        payload_digest: "sha256:4349eb7d701753bfbf8c76d614b702b5e0e6534df4d7dd95a116e3e34086386d"
        task_id: "202609211051-X92CWM"
        task_revision: 64
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Repair the demonstrated 0.7.11 release blockers without weakening gates: project canonical plan approval for branch-PR routing, fix replay-benchmark lint, prove fail-closed lifecycle repair and fresh branch worktree bootstrap in the release-critical scenario, then pass full CI and LC-24 gates.

Repair the demonstrated 0.7.11 release blockers without weakening gates: project canonical plan approval for branch-PR routing, fix replay-benchmark lint, prove fail-closed lifecycle repair and fresh branch worktree bootstrap in the release-critical scenario, then pass full CI and LC-24 gates.

## Scope

- In scope: Repair the demonstrated 0.7.11 release blockers without weakening gates: project canonical plan approval for branch-PR routing, fix replay-benchmark lint, prove fail-closed lifecycle repair and fresh branch worktree bootstrap in the release-critical scenario, then pass full CI and LC-24 gates.
- Out of scope: unrelated refactors not required for "Repair the demonstrated 0.7.11 release blockers without weakening gates: project canonical plan approval for branch-PR routing, fix replay-benchmark lint, prove fail-closed lifecycle repair and fresh branch worktree bootstrap in the release-critical scenario, then pass full CI and LC-24 gates.".

## Plan

1. Execute approved WorkItem release-blocker-repair.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node scripts/checks/check-post-convergence-test-topology.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test:fast`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run test:release:critical`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `bun run package:install-smoke`. Expected: it succeeds and confirms the requested outcome for this task.
6. Run `bun run vitest:projects:check`. Expected: it succeeds and confirms the requested outcome for this task.
7. Run `bun run clone:check`. Expected: it succeeds and confirms the requested outcome for this task.
8. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
9. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
10. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-21T13:05:44.690Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c19153f27af77771842332fb914fc0bd1810379451dc94574ced302269c5a225, input_digest=sha256:b9b77f33a39a94907e3a6858327c136592504d6c988e61179795470ce6f3480d

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (1/14)

Check: affected_unit_integration
Command: bun run clone:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (2/14)

Check: affected_unit_integration
Command: bun run knip:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (3/14)

Check: affected_unit_integration
Command: bun run package:install-smoke
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (4/14)

Check: affected_unit_integration
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (5/14)

Check: affected_unit_integration
Command: bun run test:release:critical
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-6
Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (6/14)

Check: affected_unit_integration
Command: bun run vitest:projects:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-7
Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (7/14)

Check: affected_unit_integration
Command: node scripts/checks/check-post-convergence-test-topology.mjs
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-8
Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (8/14)

Check: affected_unit_integration
Command: bun run hotspots:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-9
Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (9/14)

Check: affected_unit_integration
Command: bun run docs:cli:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-10
Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (10/14)

Check: affected_unit_integration
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-11
Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (11/14)

Check: affected_unit_integration
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-12
Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (12/14)

Check: affected_unit_integration
Command: node scripts/checks/check-trust-boundary-ratchet.mjs
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-13
Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (13/14)

Check: affected_unit_integration
Command: bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-14
Scope: branch_pr task 202609211051-X92CWM Verification Contract check affected_unit_integration (14/14)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (1/14)

Check: critical_paths
Command: bun run clone:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (2/14)

Check: critical_paths
Command: bun run knip:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (3/14)

Check: critical_paths
Command: bun run package:install-smoke
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (4/14)

Check: critical_paths
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (5/14)

Check: critical_paths
Command: bun run test:release:critical
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-6
Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (6/14)

Check: critical_paths
Command: bun run vitest:projects:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-7
Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (7/14)

Check: critical_paths
Command: node scripts/checks/check-post-convergence-test-topology.mjs
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-8
Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (8/14)

Check: critical_paths
Command: bun run hotspots:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-9
Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (9/14)

Check: critical_paths
Command: bun run docs:cli:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-10
Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (10/14)

Check: critical_paths
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-11
Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (11/14)

Check: critical_paths
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-12
Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (12/14)

Check: critical_paths
Command: node scripts/checks/check-trust-boundary-ratchet.mjs
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-13
Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (13/14)

Check: critical_paths
Command: bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-14
Scope: branch_pr task 202609211051-X92CWM Verification Contract check critical_paths (14/14)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (1/14)

Check: task_outcome
Command: bun run clone:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (2/14)

Check: task_outcome
Command: bun run knip:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (3/14)

Check: task_outcome
Command: bun run package:install-smoke
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (4/14)

Check: task_outcome
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (5/14)

Check: task_outcome
Command: bun run test:release:critical
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-6
Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (6/14)

Check: task_outcome
Command: bun run vitest:projects:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-7
Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (7/14)

Check: task_outcome
Command: node scripts/checks/check-post-convergence-test-topology.mjs
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-8
Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (8/14)

Check: task_outcome
Command: bun run hotspots:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-9
Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (9/14)

Check: task_outcome
Command: bun run docs:cli:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-10
Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (10/14)

Check: task_outcome
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-11
Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (11/14)

Check: task_outcome
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-12
Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (12/14)

Check: task_outcome
Command: node scripts/checks/check-trust-boundary-ratchet.mjs
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-13
Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (13/14)

Check: task_outcome
Command: bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/task/roadmap-lifecycle-migration-apply.test.ts packages/agentplane/src/commands/task/kernel-inspection.test.ts packages/agentplane/src/commands/shared/workflow-step.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000
Result: pass
Evidence: .agentplane/tasks/202609211051-X92CWM/supervision/declared-checks.json#check-14
Scope: branch_pr task 202609211051-X92CWM Verification Contract check task_outcome (14/14)

NativeTaskIdentityRef:
- plan_digest: sha256:8dc6dddb6cc8a2ed24c14dbba2ebf605686eb51a621e5bf68a811d7f47f319f7
- policy_digest: sha256:5969d69ad7383875e82dd5e860b3156e5ba4406cbcd617ffa342e6d388092dd1
- capability_digest: sha256:44668150af015035b4f9295eeb1e83a605e3c89b183ce28b4421a381c9bdb75f
- checks_digest: sha256:46be63a181b477f7e54d121bc1d553426d324512c08aeefb0501b8cbfeb9d704
- identity_digest: sha256:852124ebdfe6a9d59e9b1cfa47a39d4445885b2afac74ea2058ab0e4af24e67a

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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
