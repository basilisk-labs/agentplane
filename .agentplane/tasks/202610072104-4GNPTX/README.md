---
id: "202610072104-4GNPTX"
title: "Align canonical CLI regression fixtures with current task contracts"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "v0.7.13"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bun run format:check"
  - "git diff --check"
  - "node node_modules/eslint/bin/eslint.js packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
  - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-10-07T22:48:09.496Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-07T23:38:22.078Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-07T22:48:09.496Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "a9d381763f1f155756f389c37a28a6cbdeb955dc"
  review_identity_digest: "sha256:b17c439394fbb6180b2020ad39e31fa0a7f6230924a48db8b62d1f09e427725c"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610072104-4GNPTX/b38ca07df9837e769bb89d78ac2c8474c94b4364904adf6434f3a8c338c96e97/quality-report.json"
  findings:
    - "Verified all 13 required context blocks against manifest e2a0a6e4911ae16b7b87fa826edccba8e1b3d04f4e5bc0ee0f05a234ec424458, the supplied result schema, and all four required input digests."
    - "Reviewed target a9d381763f1f155756f389c37a28a6cbdeb955dc against base 63343f7622ea8a7224d02c1f9437c833113a998c. Only the two approved test files changed outside native task metadata. Source SHA256 values match 3c18790c30e2de69a5ec7c7465e4df675e9a3d2fe171ddb764a44e2125e4014f and c93ca30acc90ad4382e730802f2f9e25ad7eaecff706c1b452c7163de4a4d2db."
    - "Adapter and lifecycle reads share the evolving canonical record and real backend task. Completion becomes visible only after the backend write. Public terminal result, persisted DONE/COMPLETED, clean task Git state and committed README assertions remain. The recovery spy isolates the pre-existing synthetic evidence prerequisite; it does not replace the completion write or Git assertions."
    - "Exact sorted routing reasons and persisted declaration effects/reversibility are asserted; auto, branch_pr, direct and frozen route assertions remain. No production edits, skips, relaxed deadlines or baseline changes were introduced."
    - "Native validation canonical digest 55575fb0c795ec8f10ad93200f34a7d21c926f02399efe26ac0633af9af0378d records all four approved checks passed, including both complete test files with 25 tests. Report 89468a0162809fd9d0faa1c0869c82bf0e9da33cfb7023f9077a00b4fa95c436 and its source/log hashes were verified, including retained failed attempts. Tests and checks were read, not rerun."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects: []
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    allowed_resources: []
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
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
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
      -
        id: "verification-record"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_release_metadata"
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
          - "packages/agentplane/src/cli"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:113d06021bfaf7874a5d674e669db791d5c6a73c9d29b3a2761ca0797a80fd72"
      escalation_reasons:
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
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
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "a9d381763f1f155756f389c37a28a6cbdeb955dc"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-10-07T23:38:22.078Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-10-07T23:38:23.954Z"
doc_updated_by: "SUPERVISOR"
description: "Repair stale CLI test fixtures exposed by v0.7.13 qualification. Candidate 7d0f69fd7a980eebed6a6c88accd94a622b9880e passed release:check and release CI chunks 1-50, then chunk51 failed two tests. The public completion runtime double lacks command and adapter.read required by the current native owner. The task-new fixture expects legacy routing reasons instead of persisted effect and reversibility reasons. Preserve all completion, committed README, clean Git, frozen route and isolation assertions. Use exact canonical reason assertions and validate their declaration inputs. Initial semantic repair is bounded to the two identified test files. The intake ceiling admits CLI test-fixture repair only; any additional observed fixture failures require a fresh bounded native Plan amendment and independent review. No production behavior changes, test skipping, baseline weakening, release version changes or paid measurements. Existing user authorization covers necessary release repairs, verification and main integration. Original candidate failure evidence remains at .git/agentplane/kernel/exchanges/202610070445-2MV36M/15d0b7ae94e8d1027115eae80b7a2e58455a0a3f15ecc261777d8575dab997bc/native-validation-b7be5bb97b573c1a3e9ab200538657887d48df2177fa157616a833a3f16c42ac.json."
sections:
  Summary: |-
    Align canonical CLI regression fixtures with current task contracts

    Repair stale CLI test fixtures exposed by v0.7.13 qualification. Candidate 7d0f69fd7a980eebed6a6c88accd94a622b9880e passed release:check and release CI chunks 1-50, then chunk51 failed two tests. The public completion runtime double lacks command and adapter.read required by the current native owner. The task-new fixture expects legacy routing reasons instead of persisted effect and reversibility reasons. Preserve all completion, committed README, clean Git, frozen route and isolation assertions. Use exact canonical reason assertions and validate their declaration inputs. Initial semantic repair is bounded to the two identified test files. The intake ceiling admits CLI test-fixture repair only; any additional observed fixture failures require a fresh bounded native Plan amendment and independent review. No production behavior changes, test skipping, baseline weakening, release version changes or paid measurements. Existing user authorization covers necessary release repairs, verification and main integration. Original candidate failure evidence remains at .git/agentplane/kernel/exchanges/202610070445-2MV36M/15d0b7ae94e8d1027115eae80b7a2e58455a0a3f15ecc261777d8575dab997bc/native-validation-b7be5bb97b573c1a3e9ab200538657887d48df2177fa157616a833a3f16c42ac.json.
  Scope: |-
    - In scope: Repair stale CLI test fixtures exposed by v0.7.13 qualification. Candidate 7d0f69fd7a980eebed6a6c88accd94a622b9880e passed release:check and release CI chunks 1-50, then chunk51 failed two tests. The public completion runtime double lacks command and adapter.read required by the current native owner. The task-new fixture expects legacy routing reasons instead of persisted effect and reversibility reasons. Preserve all completion, committed README, clean Git, frozen route and isolation assertions. Use exact canonical reason assertions and validate their declaration inputs. Initial semantic repair is bounded to the two identified test files. The intake ceiling admits CLI test-fixture repair only; any additional observed fixture failures require a fresh bounded native Plan amendment and independent review. No production behavior changes, test skipping, baseline weakening, release version changes or paid measurements. Existing user authorization covers necessary release repairs, verification and main integration. Original candidate failure evidence remains at .git/agentplane/kernel/exchanges/202610070445-2MV36M/15d0b7ae94e8d1027115eae80b7a2e58455a0a3f15ecc261777d8575dab997bc/native-validation-b7be5bb97b573c1a3e9ab200538657887d48df2177fa157616a833a3f16c42ac.json.
    - Out of scope: unrelated refactors not required for "Align canonical CLI regression fixtures with current task contracts".
  Plan: "1. Execute approved WorkItem align-canonical-cli-fixtures."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node node_modules/eslint/bin/eslint.js packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-07T23:38:22.078Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dac559ae0da21a742089a918517cc6b1ef560fc5836ff11fac5bed67e19f5fa5, input_digest=sha256:a12a442e8230a09676ed8753e59ee4129ce1e95438ba4f01a5abf0685c70b44d

    Details:

    Check: affected_unit_integration
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check critical_paths (5/5)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check full_regression

    Check: real_e2e
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check real_e2e (1/5)

    Check: real_e2e
    Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check real_e2e (2/5)

    Check: real_e2e
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check real_e2e (3/5)

    Check: real_e2e
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check real_e2e (4/5)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check real_e2e (5/5)

    Check: task_outcome
    Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610072104-4GNPTX Verification Contract check task_outcome (5/5)

    NativeTaskIdentityRef:
    - plan_digest: sha256:11e346d58f47774b6b1d2688d9b3b32bd6febbf44965062937be968ed06c2478
    - policy_digest: sha256:26cbf60e57ff6118b5cdcfaa5b7bbd07e2f7c8f2e02112dc5e98fe4437e2fe64
    - capability_digest: sha256:bdca61c59e7413eb9f439b7751700f7014dbc9760770d6004d12d88eb59aad64
    - checks_digest: sha256:ec3930ad8924c11a7828943bca325ab1a23e1c89df923bf5aedb2603825cd8e1
    - identity_digest: sha256:638ae5cd0129ac4100219c457d2e993e096ceb2a8c560b8932a80551ba577bac

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
    digest: "sha256:27c17093e07a45f86213e335cba06de1557a838e7fa7daea9809ad4fd134803b"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610072104-4GNPTX/b38ca07df9837e769bb89d78ac2c8474c94b4364904adf6434f3a8c338c96e97/quality-report.json"
    findings:
      - "Verified all 13 required context blocks against manifest e2a0a6e4911ae16b7b87fa826edccba8e1b3d04f4e5bc0ee0f05a234ec424458, the supplied result schema, and all four required input digests."
      - "Reviewed target a9d381763f1f155756f389c37a28a6cbdeb955dc against base 63343f7622ea8a7224d02c1f9437c833113a998c. Only the two approved test files changed outside native task metadata. Source SHA256 values match 3c18790c30e2de69a5ec7c7465e4df675e9a3d2fe171ddb764a44e2125e4014f and c93ca30acc90ad4382e730802f2f9e25ad7eaecff706c1b452c7163de4a4d2db."
      - "Adapter and lifecycle reads share the evolving canonical record and real backend task. Completion becomes visible only after the backend write. Public terminal result, persisted DONE/COMPLETED, clean task Git state and committed README assertions remain. The recovery spy isolates the pre-existing synthetic evidence prerequisite; it does not replace the completion write or Git assertions."
      - "Exact sorted routing reasons and persisted declaration effects/reversibility are asserted; auto, branch_pr, direct and frozen route assertions remain. No production edits, skips, relaxed deadlines or baseline changes were introduced."
      - "Native validation canonical digest 55575fb0c795ec8f10ad93200f34a7d21c926f02399efe26ac0633af9af0378d records all four approved checks passed, including both complete test files with 25 tests. Report 89468a0162809fd9d0faa1c0869c82bf0e9da33cfb7023f9077a00b4fa95c436 and its source/log hashes were verified, including retained failed attempts. Tests and checks were read, not rerun."
    implementation_commit: "a9d381763f1f155756f389c37a28a6cbdeb955dc"
    implementation_tree: "5c953419d38c4f99bb2887c19b1103006b5685a9"
    projected_at: "2026-10-07T22:48:09.496Z"
    review_identity_digest: "sha256:b17c439394fbb6180b2020ad39e31fa0a7f6230924a48db8b62d1f09e427725c"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:301c327df7b3d644736d6f8c888eb10ea8160677c87e39214f2eb63d3fe1b9c3"
    work_order_id: "sha256:6219c383170ccaf3c9eca1dc35befc820f3687579a7e7b0b3c540a33c6d57942"
  task_execution_context:
    base_ref: "main"
    base_sha: "63343f7622ea8a7224d02c1f9437c833113a998c"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b601137cc9a65b68219f55c7a86b9c1ad1c11df37802b5701da002c050637306"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:11e346d58f47774b6b1d2688d9b3b32bd6febbf44965062937be968ed06c2478"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:0b167c4a1d558913d477711edbe9821c9473726bfb189144b3f9c48a06f57dbf"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli"
            task_id: "202610072104-4GNPTX"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:5cbda6fe644357e396398d9182dbf7b590141d7c61adba6e4791328a83fbf830"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:11e346d58f47774b6b1d2688d9b3b32bd6febbf44965062937be968ed06c2478"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:0b167c4a1d558913d477711edbe9821c9473726bfb189144b3f9c48a06f57dbf"
              kind: "USER"
              parent_authority_digest: "sha256:b601137cc9a65b68219f55c7a86b9c1ad1c11df37802b5701da002c050637306"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d40036aad462f65bb2e07d1436e5ab090bc269a1a05642f395c2d2db7fc0b475"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - ".agentplane/tmp/60QH9J-hosted-contract.log"
              - ".agentplane/tmp/60QH9J-hosted-static.log"
              - ".agentplane/tmp/60QH9J-pre-fast-forward-schema.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609300615-DE9AE6.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609301727-VET3VW.json"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-retry.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-tests.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-lint-shards.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-build.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-coverage.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-anchor-build-debug.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-in-progress.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint-main-delta.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-memory-install.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-check.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-typecheck.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/integration-result.json"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610072104-4GNPTX"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            added_repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
            added_scope_roots:
              - ".agentplane/tmp/60QH9J-hosted-contract.log"
              - ".agentplane/tmp/60QH9J-hosted-static.log"
              - ".agentplane/tmp/60QH9J-pre-fast-forward-schema.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609300615-DE9AE6.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609301727-VET3VW.json"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-retry.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-tests.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-lint-shards.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-build.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-coverage.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-anchor-build-debug.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-in-progress.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint-main-delta.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-memory-install.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-check.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-typecheck.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/integration-result.json"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            changed_paths:
              - ".agentplane/tmp/60QH9J-hosted-contract.log"
              - ".agentplane/tmp/60QH9J-hosted-static.log"
              - ".agentplane/tmp/60QH9J-pre-fast-forward-schema.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609300615-DE9AE6.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609301727-VET3VW.json"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-retry.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-tests.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-lint-shards.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-build.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-coverage.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-anchor-build-debug.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-in-progress.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint-main-delta.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-memory-install.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-check.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-typecheck.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/integration-result.json"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            evidence_digest: "sha256:e4cdae8fd81ffc8921355dec1cdf3659e3fc4e89e84b6311466bcceafab47e63"
            kind: "authority_delta"
            previous_fingerprint: "sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e"
            repository_evidence_digest: "sha256:6978e582d23fd72eed66b940a95ca67b857bc5561c7e73f5dd9da7c811517a54"
            request_digest: "sha256:d623e190e8dcef2b686218fb2fd730be55e240d10439543d5d5ebce2d55c512f"
            request_task_revision: 5
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d94176081314b9d3d2df97ff82d328618979062f3374ea762f84378b2f6fa543"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:11e346d58f47774b6b1d2688d9b3b32bd6febbf44965062937be968ed06c2478"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:0b167c4a1d558913d477711edbe9821c9473726bfb189144b3f9c48a06f57dbf"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:5cbda6fe644357e396398d9182dbf7b590141d7c61adba6e4791328a83fbf830"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c1d227d72233187c80d3157a597a43afedfd7155549ee9a0a1aed31ff175dc7e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - ".agentplane/tmp/60QH9J-hosted-contract.log"
              - ".agentplane/tmp/60QH9J-hosted-static.log"
              - ".agentplane/tmp/60QH9J-pre-fast-forward-schema.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609300615-DE9AE6.json"
              - ".agentplane/tmp/K43XFE-pre-fast-forward/202609301727-VET3VW.json"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-retry.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-core-tests.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6042-lint-shards.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-build.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-coverage.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6044.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6045-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-anchor-build-debug.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-bootstrap.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-ci.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-in-progress.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint-main-delta.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-lint.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-memory-install.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-original-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-check.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-replay-fixed.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-review-body.md"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-reviewed.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048-typecheck.log"
              - ".agentplane/tmp/pr-integration-MP3J6N/6048.patch"
              - ".agentplane/tmp/pr-integration-MP3J6N/integration-result.json"
              - "packages/agentplane/src/cli"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610072104-4GNPTX"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              - "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
            evidence_digest: "sha256:722ff4a048834a3a6b7226caa25a78fa5eed84c5f465303c3cdd199ab2a35b0c"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:d40036aad462f65bb2e07d1436e5ab090bc269a1a05642f395c2d2db7fc0b475"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:0b167c4a1d558913d477711edbe9821c9473726bfb189144b3f9c48a06f57dbf"
        digest: "sha256:11e346d58f47774b6b1d2688d9b3b32bd6febbf44965062937be968ed06c2478"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:7481d456a83654ac646d0b8a9eb1f84ea01f88497dd17e55290b6f969a0e2962"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
            expected_outputs:
              - "canonical-cli-fixture-evidence"
            id: "align-canonical-cli-fixtures"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:301c327df7b3d644736d6f8c888eb10ea8160677c87e39214f2eb63d3fe1b9c3"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:8f29a271ec1d3ebf542f33f5622b48afdf635ab4bc40811898fb67ba5a5b4916"
          environment_digest: "sha256:417d26fb0415721121813fee352d3e198992edf2046bf16cba0bc4915344fd4a"
          implementation_identity: "sha256:c1d227d72233187c80d3157a597a43afedfd7155549ee9a0a1aed31ff175dc7e"
          toolchain_digest: "sha256:77dec09df202180973a360fc246d1ff875bfae3d73bf0edccc3650c00c6cfdd6"
        observed_at: "2026-10-07T22:48:38.395Z"
        status: "PASSED"
      id: "202610072104-4GNPTX"
      intent_digest: "sha256:3cf143a871286e464e90ffd0f6351ac642afb732b317581f11ad94afd37d8dc0"
      migration_receipts: []
      mutation_receipts:
        capture:202610072104-4GNPTX:
          after_revision: 1
          aggregate_digest: "sha256:e157a87b45b0ad83c0443f30a4996aa034ecc2752e6d21ee23f34e6b4f3e1684"
          before_revision: 0
          command_digest: "sha256:878f5c1b152da9062d071071588d14a665de72c26dba79e59ba47e4deadd973a"
          effect_ids: []
          event_digests:
            - "sha256:97136c30e56fc8c0f2e539b15c0f5b6a967475584e121156b88c5285a056aa27"
          mutation_id: "capture:202610072104-4GNPTX"
        final-validation:sha256:301c327df7b3d644736d6f8c888eb10ea8160677c87e39214f2eb63d3fe1b9c3:12:
          after_revision: 13
          aggregate_digest: "sha256:51733536e6651e4957ba6e2a05919ce785c47961f1432900bae14c3558cdae54"
          before_revision: 12
          command_digest: "sha256:e686ee93939f76e515b634f9e0701abb1f230926c961225e3f7137c900b45ecc"
          effect_ids: []
          event_digests:
            - "sha256:11b714fc302d14330f6fed79d9001e515221338503c7fa54f211bbe1edc2b38d"
          mutation_id: "final-validation:sha256:301c327df7b3d644736d6f8c888eb10ea8160677c87e39214f2eb63d3fe1b9c3:12"
        kernel_task_completion_required:sha256:5e1841e99c8edcb3d5efee59abd462cdba8208276a73e857883c7c229e18f275:sha256:c1d227d72233187c80d3157a597a43afedfd7155549ee9a0a1aed31ff175dc7e:
          after_revision: 14
          aggregate_digest: "sha256:5bea40ea8b2d5a1cd8f98ab3b5e21c6adc0a26eb67b56dc18d1d5ff1514c84bb"
          before_revision: 13
          command_digest: "sha256:7198d0991cf46b9cc3c8b9721495fdad312744301c77c137a34825ec07aad7bd"
          effect_ids: []
          event_digests:
            - "sha256:9ce38d06769b6cb64a3f0db2f39a9764df75cebdc9a7825cc631d5e14f1f41e9"
          mutation_id: "kernel_task_completion_required:sha256:5e1841e99c8edcb3d5efee59abd462cdba8208276a73e857883c7c229e18f275:sha256:c1d227d72233187c80d3157a597a43afedfd7155549ee9a0a1aed31ff175dc7e"
        kernel_work_item_claim_required:sha256:88b5899ecfee46976c28b1b025d48ec76ebe92c7db8e3add2a4b41e1205d6437:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e:
          after_revision: 5
          aggregate_digest: "sha256:93574c7a4f8bcc57ef4dfc1f21bb004499d05267944eefd8c1b3cfe031cd7e4d"
          before_revision: 4
          command_digest: "sha256:0cd3aabec43361584029c605a0f4616952f55c839384dfe15a605f48a8fce235"
          effect_ids: []
          event_digests:
            - "sha256:2f6accc7e1b0a9b2d54696a46a80c79852bf900fc2e8613ad70c2085cf619fd2"
          mutation_id: "kernel_work_item_claim_required:sha256:88b5899ecfee46976c28b1b025d48ec76ebe92c7db8e3add2a4b41e1205d6437:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e"
        kernel_work_item_execution_required:sha256:c37cdf2ee343649d09a04c33378bfe2e98d271569539b5f52ee5ae78aeb65389:sha256:d40036aad462f65bb2e07d1436e5ab090bc269a1a05642f395c2d2db7fc0b475:
          after_revision: 7
          aggregate_digest: "sha256:5f899ae4820634ca23b2fa0e7c1afead9672c659eeb077eaab82bea99d1f5e04"
          before_revision: 6
          command_digest: "sha256:06c7305e9c34addecdf0002b9335ac9ae4fcbbdc40f836331a5ca27536a6f84f"
          effect_ids: []
          event_digests:
            - "sha256:5193127adb950df05fef733c3f657c93c76831fbdb75be615629436183f61648"
          mutation_id: "kernel_work_item_execution_required:sha256:c37cdf2ee343649d09a04c33378bfe2e98d271569539b5f52ee5ae78aeb65389:sha256:d40036aad462f65bb2e07d1436e5ab090bc269a1a05642f395c2d2db7fc0b475"
        kernel_work_item_inspection_required:sha256:7b3d6bda36e9bb9c2513234c14781f54f7e6ae9098244e5ffa67bb7d2d055b60:sha256:c1d227d72233187c80d3157a597a43afedfd7155549ee9a0a1aed31ff175dc7e:
          after_revision: 10
          aggregate_digest: "sha256:a2f77dae2ab2bb784ba1f056a5b82a598372a0a45d3efe300d571007d938471d"
          before_revision: 9
          command_digest: "sha256:6fe6ca382c51f46ef0bf09b4dfe0e8808392824e74918319cc71e72c955a0020"
          effect_ids: []
          event_digests:
            - "sha256:f8eeb09343d6a872b4421134df0cca6f29f14f7929f472040bf8e2ed942f2d29"
          mutation_id: "kernel_work_item_inspection_required:sha256:7b3d6bda36e9bb9c2513234c14781f54f7e6ae9098244e5ffa67bb7d2d055b60:sha256:c1d227d72233187c80d3157a597a43afedfd7155549ee9a0a1aed31ff175dc7e"
        kernel_work_item_materialization_required:sha256:20257b213c205234d1179a08f57e9b8542c96e25fec8f4214429affac7ba707b:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e:
          after_revision: 4
          aggregate_digest: "sha256:540a206c878bb1ced51916631e559ff8973860879f95f35ab0e07ac0f2129c05"
          before_revision: 3
          command_digest: "sha256:de37e176c2710e4e8ed83262bf9e91387aea48647cf1b27fd6035bf781e8b870"
          effect_ids: []
          event_digests:
            - "sha256:ad84616a1f06047b1a3c5ed1fa62b4afa61e81da56a519c8a6fcfddb81d570e1"
          mutation_id: "kernel_work_item_materialization_required:sha256:20257b213c205234d1179a08f57e9b8542c96e25fec8f4214429affac7ba707b:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e"
        result:sha256:6219c383170ccaf3c9eca1dc35befc820f3687579a7e7b0b3c540a33c6d57942:
          after_revision: 9
          aggregate_digest: "sha256:cfe756b2d0ef87919b2157bf27b2a108a09a358e057d372c64d38b621fab3012"
          before_revision: 8
          command_digest: "sha256:24533551f2a8834fb1125a61b8e03a25a6c2da6ec07b225b27277302b68b80dc"
          effect_ids: []
          event_digests:
            - "sha256:639463dfb29694c29eacc0a7a629d986427648615cfb7f7aab5d1891fd27eeb2"
          mutation_id: "result:sha256:6219c383170ccaf3c9eca1dc35befc820f3687579a7e7b0b3c540a33c6d57942"
        result:sha256:fa6e7a5163155c011900b6c21ca6bfb5b5c2f205a6a067660319eb6871797720:
          after_revision: 2
          aggregate_digest: "sha256:8a1b7d7f6f97ae332df1d2b4c97dbf63a0ee2596cace28d2d7c67391a0f674f2"
          before_revision: 1
          command_digest: "sha256:0d8a40e5d98aee6ef1c2b16e7acbcb598d24e992aded80b2fde8a89df187d3c5"
          effect_ids: []
          event_digests:
            - "sha256:2c6765ab34dc7245dd65dfef76e8fb58fee3d26f998210f1b26d02df3428d41d"
          mutation_id: "result:sha256:fa6e7a5163155c011900b6c21ca6bfb5b5c2f205a6a067660319eb6871797720"
        sha256:058e010aa8c77ab369b8e956720952766981ff49060d232d9d9a880ba7084900:
          after_revision: 8
          aggregate_digest: "sha256:893ea016d4ba6ee96101ba02bed5871b1360c3f2511da40f979edfd286fc61be"
          before_revision: 7
          command_digest: "sha256:f86e3837cc5fa2c07bcde509dc9d5acbad4472bbafa54422cfad890c802cb9ab"
          effect_ids: []
          event_digests:
            - "sha256:696abec4eeaff5f64c4313cd1cc5cb00d5414797cb0afc89d8737910ce3b1489"
          mutation_id: "sha256:058e010aa8c77ab369b8e956720952766981ff49060d232d9d9a880ba7084900"
        sha256:1d009621a82cef74f64effb84bcb0002dde7da2323369cc22eb3121629fd1f7e:
          after_revision: 3
          aggregate_digest: "sha256:c43b0a64e687e5c9b6b6590713ccb2f04f10a12ea8a54eb4f8892c176d32db19"
          before_revision: 2
          command_digest: "sha256:57b976f15b74b0216ab620773ca463eff21246a8886471a44acf8de5d008de02"
          effect_ids: []
          event_digests:
            - "sha256:4c582b455fb6f4a49a08d80c734eff418a43364db620e01c1d3b780f33766fd8"
          mutation_id: "sha256:1d009621a82cef74f64effb84bcb0002dde7da2323369cc22eb3121629fd1f7e"
        sha256:95768aa2ef1bf48ad1cc1d00d845aa0260bc11c3090bb5f73da01a823cfad3f4:
          after_revision: 6
          aggregate_digest: "sha256:b2e6a511b6ead4b5fcd1a0dddcbe6eba31b033a11fde883cbf524e5c646efb3a"
          before_revision: 5
          command_digest: "sha256:5b053f716f244568a29446c1e8c21d0ec61f7910090ad858a53c0fa1768a96d8"
          effect_ids: []
          event_digests:
            - "sha256:ddf87d0e4a5984b235032efddd8591064d3618ea8da492c792f8732ee9527f38"
          mutation_id: "sha256:95768aa2ef1bf48ad1cc1d00d845aa0260bc11c3090bb5f73da01a823cfad3f4"
        validation-resolution:sha256:0e5d482febd7d520162b9d461270654e4f8fc15259a5a0c33df393069cb976a0:
          after_revision: 12
          aggregate_digest: "sha256:fe75f899f373bc9c6fc52e09ff93583c60dec14bec6cce2a36310f70dba042cd"
          before_revision: 11
          command_digest: "sha256:f240893955de6ff88460c1d0b0e9ffdc3c3605758a14593e07a6c440c89e6817"
          effect_ids: []
          event_digests:
            - "sha256:c9284ba4ce0e09a73c5c950dd26c7ab2e362b0b56e872433b4415740829ee32d"
          mutation_id: "validation-resolution:sha256:0e5d482febd7d520162b9d461270654e4f8fc15259a5a0c33df393069cb976a0"
        validation:sha256:b38ca07df9837e769bb89d78ac2c8474c94b4364904adf6434f3a8c338c96e97:
          after_revision: 11
          aggregate_digest: "sha256:60e3a05bbdd4cc0df3ef14de388b31c3c6283b2c242d01a3605b6e3797320083"
          before_revision: 10
          command_digest: "sha256:c848d01c65b8867039818fe91b8d0ad9ba2f5490670eb1051c5d3f5c07219db6"
          effect_ids: []
          event_digests:
            - "sha256:22663ff58de9de0e311171f3599bdeec8aa6ec145b45ef9b1ced55251972b8ff"
          mutation_id: "validation:sha256:b38ca07df9837e769bb89d78ac2c8474c94b4364904adf6434f3a8c338c96e97"
      plan_history: []
      revision: 14
      schema_version: 1
      state: "COMPLETED"
      work_items:
        align-canonical-cli-fixtures:
          attempt: 1
          claim_id: "sha256:906ae007b60f165d48e2bb98f1f33334fabd910cb7befb841376802f2afee561"
          definition:
            contract_digest: "sha256:7481d456a83654ac646d0b8a9eb1f84ea01f88497dd17e55290b6f969a0e2962"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
            expected_outputs:
              - "canonical-cli-fixture-evidence"
            id: "align-canonical-cli-fixtures"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:89468a0162809fd9d0faa1c0869c82bf0e9da33cfb7023f9077a00b4fa95c436"
              id: "canonical-cli-fixture-evidence"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:c1d227d72233187c80d3157a597a43afedfd7155549ee9a0a1aed31ff175dc7e"
              task_id: "202610072104-4GNPTX"
              work_item_id: "align-canonical-cli-fixtures"
          result_digest: "sha256:1d8d19345114876efa0988cb07e6a9766e3c25db539d4b40a50d90e63b3bae6b"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:55575fb0c795ec8f10ad93200f34a7d21c926f02399efe26ac0633af9af0378d"
              - "sha256:b17c439394fbb6180b2020ad39e31fa0a7f6230924a48db8b62d1f09e427725c"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:8f29a271ec1d3ebf542f33f5622b48afdf635ab4bc40811898fb67ba5a5b4916"
              environment_digest: "sha256:be45e4a42f6078474ed305e5766b00e5d8e7d4ef88978dd99164e9e56d50f037"
              implementation_identity: "sha256:1d8d19345114876efa0988cb07e6a9766e3c25db539d4b40a50d90e63b3bae6b"
              toolchain_digest: "sha256:97398f9060d1177dc7c1604a218cd6ba7b702d285fbdc8a1a0399f01b12330f3"
            observed_at: "2026-10-07T22:48:09.496Z"
            status: "PASSED"
    digest: "sha256:99453b7787f6820a981351254e575940b6346e21a6065a362b343b0e76ab9bb1"
    documents:
      contracts:
        sha256:7481d456a83654ac646d0b8a9eb1f84ea01f88497dd17e55290b6f969a0e2962:
          acceptance_criteria:
            - "Supply runtime.command and adapter.read in the public completion fixture. Adapter and lifecycle reads must observe the same evolving canonical record; adapter reads must not consume the lifecycle mock sequence. Preserve the actual public completion route and coherent pre-completion and completed state."
            - "Preserve assertions for terminal kernel_task_completed, persisted DONE and COMPLETED state, clean task Git state and committed README status. Do not bypass the planning checkout boundary or replace persistence with a fabricated success."
            - "Assert the exact sorted canonical reasons effect_publish, effect_release_metadata and reversibility_recovery_required. Assert the persisted declaration inputs that justify those reasons. Preserve auto requested mode, branch_pr selected mode, direct repository mode and frozen route."
            - "Change only the two declared test files. Do not change production code, skip tests, weaken baselines or reduce existing assertions. Additional observed fixture failures require a fresh bounded native Plan amendment and independent review; the wider intake ceiling is not current edit authority."
            - "Run both complete test files and targeted ESLint with NODE_OPTIONS=--max-old-space-size=4096, existing 2 workers and 60000 ms test/hook limits. Run formatting and diff checks. Retain commands, logs, source hashes and any failures in a digest-bound report."
            - "Independent EVALUATOR, native full verification and hosted integration remain required. Parent owns lifecycle and candidate requalification. Preserve prior release failure evidence; no version changes, paid measurements, M05 disposition or publication claims."
          objective: "Align the two observed stale CLI fixtures with current canonical runtime and routing contracts without changing production behavior."
          role: "EXECUTOR"
          verification_commands:
            - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000"
            - "node node_modules/eslint/bin/eslint.js packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts"
            - "bun run format:check"
            - "git diff --check"
      intent:
        context: "Repair stale CLI test fixtures exposed by v0.7.13 qualification. Candidate 7d0f69fd7a980eebed6a6c88accd94a622b9880e passed release:check and release CI chunks 1-50, then chunk51 failed two tests. The public completion runtime double lacks command and adapter.read required by the current native owner. The task-new fixture expects legacy routing reasons instead of persisted effect and reversibility reasons. Preserve all completion, committed README, clean Git, frozen route and isolation assertions. Use exact canonical reason assertions and validate their declaration inputs. Initial semantic repair is bounded to the two identified test files. The intake ceiling admits CLI test-fixture repair only; any additional observed fixture failures require a fresh bounded native Plan amendment and independent review. No production behavior changes, test skipping, baseline weakening, release version changes or paid measurements. Existing user authorization covers necessary release repairs, verification and main integration. Original candidate failure evidence remains at .git/agentplane/kernel/exchanges/202610070445-2MV36M/15d0b7ae94e8d1027115eae80b7a2e58455a0a3f15ecc261777d8575dab997bc/native-validation-b7be5bb97b573c1a3e9ab200538657887d48df2177fa157616a833a3f16c42ac.json."
        objective: "Align canonical CLI regression fixtures with current task contracts"
    events:
      -
        command_digest: "sha256:878f5c1b152da9062d071071588d14a665de72c26dba79e59ba47e4deadd973a"
        id: "capture:202610072104-4GNPTX:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610072104-4GNPTX"
        occurred_at: "2026-10-07T21:04:42.024Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610072104-4GNPTX"
        task_revision: 1
      -
        command_digest: "sha256:0d8a40e5d98aee6ef1c2b16e7acbcb598d24e992aded80b2fde8a89df187d3c5"
        id: "result:sha256:fa6e7a5163155c011900b6c21ca6bfb5b5c2f205a6a067660319eb6871797720:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:fa6e7a5163155c011900b6c21ca6bfb5b5c2f205a6a067660319eb6871797720"
        occurred_at: "2026-10-07T21:06:59.851Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610072104-4GNPTX"
        task_revision: 2
      -
        command_digest: "sha256:57b976f15b74b0216ab620773ca463eff21246a8886471a44acf8de5d008de02"
        id: "sha256:1d009621a82cef74f64effb84bcb0002dde7da2323369cc22eb3121629fd1f7e:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:1d009621a82cef74f64effb84bcb0002dde7da2323369cc22eb3121629fd1f7e"
        occurred_at: "2026-10-07T21:07:38.838Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610072104-4GNPTX"
        task_revision: 3
      -
        command_digest: "sha256:de37e176c2710e4e8ed83262bf9e91387aea48647cf1b27fd6035bf781e8b870"
        id: "kernel_work_item_materialization_required:sha256:20257b213c205234d1179a08f57e9b8542c96e25fec8f4214429affac7ba707b:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:20257b213c205234d1179a08f57e9b8542c96e25fec8f4214429affac7ba707b:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e"
        occurred_at: "2026-10-07T21:08:26.746Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610072104-4GNPTX"
        task_revision: 4
      -
        command_digest: "sha256:0cd3aabec43361584029c605a0f4616952f55c839384dfe15a605f48a8fce235"
        id: "kernel_work_item_claim_required:sha256:88b5899ecfee46976c28b1b025d48ec76ebe92c7db8e3add2a4b41e1205d6437:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:88b5899ecfee46976c28b1b025d48ec76ebe92c7db8e3add2a4b41e1205d6437:sha256:9cc8009509b10336db76717c47f93952a2bc85cd4c79d80e6a4bf14a1aabfb8e"
        occurred_at: "2026-10-07T21:08:59.005Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610072104-4GNPTX"
        task_revision: 5
      -
        command_digest: "sha256:5b053f716f244568a29446c1e8c21d0ec61f7910090ad858a53c0fa1768a96d8"
        id: "sha256:95768aa2ef1bf48ad1cc1d00d845aa0260bc11c3090bb5f73da01a823cfad3f4:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:95768aa2ef1bf48ad1cc1d00d845aa0260bc11c3090bb5f73da01a823cfad3f4"
        occurred_at: "2026-10-07T21:15:40.328Z"
        payload_digest: "sha256:79c5178a91c92ee646f4ef39818732408af501267d2142cf84123ce682113114"
        task_id: "202610072104-4GNPTX"
        task_revision: 6
      -
        command_digest: "sha256:06c7305e9c34addecdf0002b9335ac9ae4fcbbdc40f836331a5ca27536a6f84f"
        id: "kernel_work_item_execution_required:sha256:c37cdf2ee343649d09a04c33378bfe2e98d271569539b5f52ee5ae78aeb65389:sha256:d40036aad462f65bb2e07d1436e5ab090bc269a1a05642f395c2d2db7fc0b475:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c37cdf2ee343649d09a04c33378bfe2e98d271569539b5f52ee5ae78aeb65389:sha256:d40036aad462f65bb2e07d1436e5ab090bc269a1a05642f395c2d2db7fc0b475"
        occurred_at: "2026-10-07T21:16:12.759Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610072104-4GNPTX"
        task_revision: 7
      -
        command_digest: "sha256:f86e3837cc5fa2c07bcde509dc9d5acbad4472bbafa54422cfad890c802cb9ab"
        id: "sha256:058e010aa8c77ab369b8e956720952766981ff49060d232d9d9a880ba7084900:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:058e010aa8c77ab369b8e956720952766981ff49060d232d9d9a880ba7084900"
        occurred_at: "2026-10-07T21:30:30.445Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202610072104-4GNPTX"
        task_revision: 8
      -
        command_digest: "sha256:24533551f2a8834fb1125a61b8e03a25a6c2da6ec07b225b27277302b68b80dc"
        id: "result:sha256:6219c383170ccaf3c9eca1dc35befc820f3687579a7e7b0b3c540a33c6d57942:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:6219c383170ccaf3c9eca1dc35befc820f3687579a7e7b0b3c540a33c6d57942"
        occurred_at: "2026-10-07T21:31:30.042Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202610072104-4GNPTX"
        task_revision: 9
      -
        command_digest: "sha256:6fe6ca382c51f46ef0bf09b4dfe0e8808392824e74918319cc71e72c955a0020"
        id: "kernel_work_item_inspection_required:sha256:7b3d6bda36e9bb9c2513234c14781f54f7e6ae9098244e5ffa67bb7d2d055b60:sha256:c1d227d72233187c80d3157a597a43afedfd7155549ee9a0a1aed31ff175dc7e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:7b3d6bda36e9bb9c2513234c14781f54f7e6ae9098244e5ffa67bb7d2d055b60:sha256:c1d227d72233187c80d3157a597a43afedfd7155549ee9a0a1aed31ff175dc7e"
        occurred_at: "2026-10-07T21:32:00.952Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610072104-4GNPTX"
        task_revision: 10
      -
        command_digest: "sha256:c848d01c65b8867039818fe91b8d0ad9ba2f5490670eb1051c5d3f5c07219db6"
        id: "validation:sha256:b38ca07df9837e769bb89d78ac2c8474c94b4364904adf6434f3a8c338c96e97:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:b38ca07df9837e769bb89d78ac2c8474c94b4364904adf6434f3a8c338c96e97"
        occurred_at: "2026-10-07T22:48:19.851Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202610072104-4GNPTX"
        task_revision: 11
      -
        command_digest: "sha256:f240893955de6ff88460c1d0b0e9ffdc3c3605758a14593e07a6c440c89e6817"
        id: "validation-resolution:sha256:0e5d482febd7d520162b9d461270654e4f8fc15259a5a0c33df393069cb976a0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:0e5d482febd7d520162b9d461270654e4f8fc15259a5a0c33df393069cb976a0"
        occurred_at: "2026-10-07T22:48:26.416Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610072104-4GNPTX"
        task_revision: 12
      -
        command_digest: "sha256:e686ee93939f76e515b634f9e0701abb1f230926c961225e3f7137c900b45ecc"
        id: "final-validation:sha256:301c327df7b3d644736d6f8c888eb10ea8160677c87e39214f2eb63d3fe1b9c3:12:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:301c327df7b3d644736d6f8c888eb10ea8160677c87e39214f2eb63d3fe1b9c3:12"
        occurred_at: "2026-10-07T23:38:30.240Z"
        payload_digest: "sha256:c4638fb792606faa5c5415baa5a7d87aa3eb27ff86f5452698e903e04dcd9c4f"
        task_id: "202610072104-4GNPTX"
        task_revision: 13
      -
        command_digest: "sha256:7198d0991cf46b9cc3c8b9721495fdad312744301c77c137a34825ec07aad7bd"
        id: "kernel_task_completion_required:sha256:5e1841e99c8edcb3d5efee59abd462cdba8208276a73e857883c7c229e18f275:sha256:c1d227d72233187c80d3157a597a43afedfd7155549ee9a0a1aed31ff175dc7e:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:5e1841e99c8edcb3d5efee59abd462cdba8208276a73e857883c7c229e18f275:sha256:c1d227d72233187c80d3157a597a43afedfd7155549ee9a0a1aed31ff175dc7e"
        occurred_at: "2026-10-07T23:39:12.291Z"
        payload_digest: "sha256:a8a8d0bc0cff32f4b2ca75daea16cc595d9d90fca860399842cb49b39ecc57d1"
        task_id: "202610072104-4GNPTX"
        task_revision: 14
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Align canonical CLI regression fixtures with current task contracts

Repair stale CLI test fixtures exposed by v0.7.13 qualification. Candidate 7d0f69fd7a980eebed6a6c88accd94a622b9880e passed release:check and release CI chunks 1-50, then chunk51 failed two tests. The public completion runtime double lacks command and adapter.read required by the current native owner. The task-new fixture expects legacy routing reasons instead of persisted effect and reversibility reasons. Preserve all completion, committed README, clean Git, frozen route and isolation assertions. Use exact canonical reason assertions and validate their declaration inputs. Initial semantic repair is bounded to the two identified test files. The intake ceiling admits CLI test-fixture repair only; any additional observed fixture failures require a fresh bounded native Plan amendment and independent review. No production behavior changes, test skipping, baseline weakening, release version changes or paid measurements. Existing user authorization covers necessary release repairs, verification and main integration. Original candidate failure evidence remains at .git/agentplane/kernel/exchanges/202610070445-2MV36M/15d0b7ae94e8d1027115eae80b7a2e58455a0a3f15ecc261777d8575dab997bc/native-validation-b7be5bb97b573c1a3e9ab200538657887d48df2177fa157616a833a3f16c42ac.json.

## Scope

- In scope: Repair stale CLI test fixtures exposed by v0.7.13 qualification. Candidate 7d0f69fd7a980eebed6a6c88accd94a622b9880e passed release:check and release CI chunks 1-50, then chunk51 failed two tests. The public completion runtime double lacks command and adapter.read required by the current native owner. The task-new fixture expects legacy routing reasons instead of persisted effect and reversibility reasons. Preserve all completion, committed README, clean Git, frozen route and isolation assertions. Use exact canonical reason assertions and validate their declaration inputs. Initial semantic repair is bounded to the two identified test files. The intake ceiling admits CLI test-fixture repair only; any additional observed fixture failures require a fresh bounded native Plan amendment and independent review. No production behavior changes, test skipping, baseline weakening, release version changes or paid measurements. Existing user authorization covers necessary release repairs, verification and main integration. Original candidate failure evidence remains at .git/agentplane/kernel/exchanges/202610070445-2MV36M/15d0b7ae94e8d1027115eae80b7a2e58455a0a3f15ecc261777d8575dab997bc/native-validation-b7be5bb97b573c1a3e9ab200538657887d48df2177fa157616a833a3f16c42ac.json.
- Out of scope: unrelated refactors not required for "Align canonical CLI regression fixtures with current task contracts".

## Plan

1. Execute approved WorkItem align-canonical-cli-fixtures.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node node_modules/eslint/bin/eslint.js packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-07T23:38:22.078Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:dac559ae0da21a742089a918517cc6b1ef560fc5836ff11fac5bed67e19f5fa5, input_digest=sha256:a12a442e8230a09676ed8753e59ee4129ce1e95438ba4f01a5abf0685c70b44d

Details:

Check: affected_unit_integration
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check critical_paths (5/5)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check full_regression

Check: real_e2e
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check real_e2e (1/5)

Check: real_e2e
Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check real_e2e (2/5)

Check: real_e2e
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check real_e2e (3/5)

Check: real_e2e
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check real_e2e (4/5)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check real_e2e (5/5)

Check: task_outcome
Command: node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts --pool=forks --maxWorkers 2 --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: node node_modules/eslint/bin/eslint.js packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610072104-4GNPTX/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610072104-4GNPTX Verification Contract check task_outcome (5/5)

NativeTaskIdentityRef:
- plan_digest: sha256:11e346d58f47774b6b1d2688d9b3b32bd6febbf44965062937be968ed06c2478
- policy_digest: sha256:26cbf60e57ff6118b5cdcfaa5b7bbd07e2f7c8f2e02112dc5e98fe4437e2fe64
- capability_digest: sha256:bdca61c59e7413eb9f439b7751700f7014dbc9760770d6004d12d88eb59aad64
- checks_digest: sha256:ec3930ad8924c11a7828943bca325ab1a23e1c89df923bf5aedb2603825cd8e1
- identity_digest: sha256:638ae5cd0129ac4100219c457d2e993e096ceb2a8c560b8932a80551ba577bac

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
