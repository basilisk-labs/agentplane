---
id: "202611011211-VKPT8K"
title: "Publish exact native quarantine artifacts without resuming historical Tasks"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 48
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "publish"
  - "security"
verify:
  - "bun run ci:local:full"
  - "bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-11-02T12:03:07.980Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-11-02T17:27:23.948Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-11-02T10:41:45.039Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "931f5364bc9a5900372e0d0eb169205257fe0238"
  review_identity_digest: "sha256:dd4ee20cb5b151c65bd39ae585d31da749a96ecb0d80d61001b64e4c9903b8a1"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202611011211-VKPT8K/1539da59fe4f67b8c5bfca1b84c50915e0fa4fab8949fec764f0d564b31dc64e/quality-report.json"
  findings:
    - "Reviewed all seven approved source files at frozen931f5364bc9a5900372e0d0eb169205257fe0238 against canonical83408fc, including coordinator/PR integration and all new realGit/nativequarantine fixture coverage. The native latest repository evidence covers only the subsequent two-file BOM fix; review deliberately includes the entire implementation."
    - "Authority is limited to canonical ops/ops, approved Plan/current authority, exact per-foreignTask roots, required effects/capability; FS adoption additionally binds the live issued claim, attempt, contract and WorkOrder roots. Existing repository_policy approval remains supported."
    - "The shared classifier recomputes the genuine revision-split/native BLOCKED projection and exact raw source backup from immutable ancestor Git base, validates all native marker/source/mapping/repository/backend/output identities and rejects byte drift including BOM, unsafe paths/links, extras and non-native afterimages."
    - "Before/after-stage and committed-Git proof checks retain existing commit-intent/unknown-effect protections. The branch guard retains normal ownership, batch/import and scoped cleanup behavior; deletion/rename is never admitted by quarantine proof."
    - "Authenticated native validation independently records fullCI exit0 and the declared five-file70-test suite exit0 under the corrected outside-framework case-sensitive TMPDIR, unchanged commands and acceptance timeouts. Old FAILED/interrupted runs and diagnostic evidence are retained."
    - "Independent review report: /Users/densmirnov/Github/agentplane/.agentplane/tmp/sb-recovery-20261102-resume/private/pub-independent-review-983.json; raw digest sha256:2743edc5e222154c2e2bf477e83ca866ca408a51503d12e4a29991381c7e8ce2. No implementation, test, policy, Task history, credential or runtime guard was modified during inspection."
token_usage:
  agent_runs: 0
  cached_input_observed_agent_runs: 0
  cached_input_tokens: null
  input_tokens: null
  journal_digest: "sha256:207c8944461836ad8943cf9083a79304d8a74c29f970c3f408503766581a80e6"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "no_supervised_agent_runs"
  updated_at: "2026-11-02T17:31:02.477Z"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_security_boundary"
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
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    allowed_resources: []
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
    writable_roots:
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
      - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
      - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
      - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
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
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
          - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
          - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
          - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:5815d5370a0be53a2b255097d7af81353ce3dcaa1d6e3d53574d965719776aaf"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
        - "central_path:packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
        - "effect_release_metadata"
        - "effect_security_boundary"
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
          - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
          - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
          - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
          - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
          - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
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
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "d256f6b3d6ee84a39526cb7cc3b402b98126af57"
  message: "🧩 VKPT8K task: refresh task artifacts after commit"
comments:
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "verify"
    at: "2026-11-02T17:27:23.948Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
  -
    type: "status"
    at: "2026-11-02T17:31:02.477Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "d256f6b3d6ee84a39526cb7cc3b402b98126af57"
doc_version: 3
doc_updated_at: "2026-11-02T17:31:02.477Z"
doc_updated_by: "CODER"
description: "Implement the explicitly USER-approved seven-file native quarantine publication admission. Reuse one shared read-only proof classifier in canonical dirty-baseline adoption and branch PR foreign-task ownership. Require approved exact per-foreignTask directory scope and security-boundary/repository-write authority. Bind source bytes to the exact Git comparison base, logical repository/backend identity, genuine native revision-split mapping, exact quarantineAfterimage and exact content-addressed raw source backup. Admit only README and that backup. Refuse arbitrary broad scope, forged or altered marker/body/backup, wrong base/source/repository, extra/deleted/renamed/linked/missing/unstable foreign artifacts and unproven history. Preserve existing Task/batch/import/cleanup rules. Historical Tasks stay BLOCKED; never run old WorkItems or assign DONE/PASS/CANCELLED or classify unknown effects. Verify actual byte/Git/coordinator/publication integration and negative cases, full mandatory CI and independent EVALUATOR, protected canonical PR/merge and current CLI qualification before actual Factory publication. Preserve all existing branches, worktrees, archives, runtime data, credentials and guards. No new public CLI/schema/dependencies or runtime effects."
sections:
  Summary: |-
    Publish exact native quarantine artifacts without resuming historical Tasks

    Implement the explicitly USER-approved seven-file native quarantine publication admission. Reuse one shared read-only proof classifier in canonical dirty-baseline adoption and branch PR foreign-task ownership. Require approved exact per-foreignTask directory scope and security-boundary/repository-write authority. Bind source bytes to the exact Git comparison base, logical repository/backend identity, genuine native revision-split mapping, exact quarantineAfterimage and exact content-addressed raw source backup. Admit only README and that backup. Refuse arbitrary broad scope, forged or altered marker/body/backup, wrong base/source/repository, extra/deleted/renamed/linked/missing/unstable foreign artifacts and unproven history. Preserve existing Task/batch/import/cleanup rules. Historical Tasks stay BLOCKED; never run old WorkItems or assign DONE/PASS/CANCELLED or classify unknown effects. Verify actual byte/Git/coordinator/publication integration and negative cases, full mandatory CI and independent EVALUATOR, protected canonical PR/merge and current CLI qualification before actual Factory publication. Preserve all existing branches, worktrees, archives, runtime data, credentials and guards. No new public CLI/schema/dependencies or runtime effects.
  Scope: |-
    - In scope: Implement the explicitly USER-approved seven-file native quarantine publication admission. Reuse one shared read-only proof classifier in canonical dirty-baseline adoption and branch PR foreign-task ownership. Require approved exact per-foreignTask directory scope and security-boundary/repository-write authority. Bind source bytes to the exact Git comparison base, logical repository/backend identity, genuine native revision-split mapping, exact quarantineAfterimage and exact content-addressed raw source backup. Admit only README and that backup. Refuse arbitrary broad scope, forged or altered marker/body/backup, wrong base/source/repository, extra/deleted/renamed/linked/missing/unstable foreign artifacts and unproven history. Preserve existing Task/batch/import/cleanup rules. Historical Tasks stay BLOCKED; never run old WorkItems or assign DONE/PASS/CANCELLED or classify unknown effects. Verify actual byte/Git/coordinator/publication integration and negative cases, full mandatory CI and independent EVALUATOR, protected canonical PR/merge and current CLI qualification before actual Factory publication. Preserve all existing branches, worktrees, archives, runtime data, credentials and guards. No new public CLI/schema/dependencies or runtime effects.
    - Out of scope: unrelated refactors not required for "Publish exact native quarantine artifacts without resuming historical Tasks".
  Plan: |-
    1. Execute approved WorkItem native-quarantine-artifact-publication.
    2. Execute approved WorkItem final-correction-57d57d503193.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-11-02T17:27:23.948Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2b5ce73659a020a9c5c38ae5befff4302742ddd3fd6e2718fddb34c16c052c5a, input_digest=sha256:6b2208f016504143f01996246ecc1f689c5a21e1b1f6d990b30ef576ee41f835

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202611011211-VKPT8K Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202611011211-VKPT8K Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202611011211-VKPT8K Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202611011211-VKPT8K Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202611011211-VKPT8K Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202611011211-VKPT8K Verification Contract check real_e2e (1/2)

    Check: real_e2e
    Command: bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202611011211-VKPT8K Verification Contract check real_e2e (2/2)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202611011211-VKPT8K Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202611011211-VKPT8K Verification Contract check task_outcome (2/2)

    NativeTaskIdentityRef:
    - plan_digest: sha256:f12d546663a6097f15bc296a9bdaba0420b994e2741ecc8747aad08d2a7ff990
    - policy_digest: sha256:987929940f3820e61292591e8ce12a537c18ae14094a524cdad5978e41cebd01
    - capability_digest: sha256:2582d02cc390d6b5ca7e9401744ee758a81fafe76f29969c97146b6b0b921110
    - checks_digest: sha256:9386559caf72ebcc723dbd2e8faf134ee002f3d4418915afcf5a6efca92a2c71
    - identity_digest: sha256:8ad91f922c2e13bbbacf5290db9ad0194bf45be124b1440c70f5fd4687480ae4

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202611011211-VKPT8K
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
    digest: "sha256:4ce473b3d7d8ae07747bbd247e156168dddc34df675438f55e01dbc778a0f162"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202611011211-VKPT8K/1539da59fe4f67b8c5bfca1b84c50915e0fa4fab8949fec764f0d564b31dc64e/quality-report.json"
    findings:
      - "Reviewed all seven approved source files at frozen931f5364bc9a5900372e0d0eb169205257fe0238 against canonical83408fc, including coordinator/PR integration and all new realGit/nativequarantine fixture coverage. The native latest repository evidence covers only the subsequent two-file BOM fix; review deliberately includes the entire implementation."
      - "Authority is limited to canonical ops/ops, approved Plan/current authority, exact per-foreignTask roots, required effects/capability; FS adoption additionally binds the live issued claim, attempt, contract and WorkOrder roots. Existing repository_policy approval remains supported."
      - "The shared classifier recomputes the genuine revision-split/native BLOCKED projection and exact raw source backup from immutable ancestor Git base, validates all native marker/source/mapping/repository/backend/output identities and rejects byte drift including BOM, unsafe paths/links, extras and non-native afterimages."
      - "Before/after-stage and committed-Git proof checks retain existing commit-intent/unknown-effect protections. The branch guard retains normal ownership, batch/import and scoped cleanup behavior; deletion/rename is never admitted by quarantine proof."
      - "Authenticated native validation independently records fullCI exit0 and the declared five-file70-test suite exit0 under the corrected outside-framework case-sensitive TMPDIR, unchanged commands and acceptance timeouts. Old FAILED/interrupted runs and diagnostic evidence are retained."
      - "Independent review report: /Users/densmirnov/Github/agentplane/.agentplane/tmp/sb-recovery-20261102-resume/private/pub-independent-review-983.json; raw digest sha256:2743edc5e222154c2e2bf477e83ca866ca408a51503d12e4a29991381c7e8ce2. No implementation, test, policy, Task history, credential or runtime guard was modified during inspection."
    implementation_commit: "931f5364bc9a5900372e0d0eb169205257fe0238"
    implementation_tree: "00f8dfd3a09fa25d23c9541af38393c6f527160d"
    projected_at: "2026-11-02T10:41:45.039Z"
    review_identity_digest: "sha256:dd4ee20cb5b151c65bd39ae585d31da749a96ecb0d80d61001b64e4c9903b8a1"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:2a699a8ed3fb0a262c621fdd4eab8c272c8cb849f2c280ba64c706a83158ca8e"
    work_order_id: "sha256:645e240eaf82ef1f29e70fbecd23dcee716ca1cfc17babe2b19dd46fcd660ff6"
  implementation_commit:
    hash: "931f5364bc9a5900372e0d0eb169205257fe0238"
    message: "🚧 VKPT8K task: apply canonical agent result"
  task_execution_context:
    base_ref: "main"
    base_sha: "83408fc11bb53298034ecca47b23ff1f28d054dd"
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
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:e190f073bef6fd2bc208fe1ee170d277baceefa15693ecb4f9f58bd165c920f8"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:5db81e73cfc30a84dd9691b527d55a189065f179b2fd35bb9209adfe45b0a66a"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:c860bcef9aa171f312ee439de5ae185ee09c86b57084416f4654c1d816d1483d"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            task_id: "202611011211-VKPT8K"
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
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:d2e26432e182546dcad83ef2d7dc601c09d2683054586584debe976b98039bbe"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:5db81e73cfc30a84dd9691b527d55a189065f179b2fd35bb9209adfe45b0a66a"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c860bcef9aa171f312ee439de5ae185ee09c86b57084416f4654c1d816d1483d"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:e190f073bef6fd2bc208fe1ee170d277baceefa15693ecb4f9f58bd165c920f8"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            task_id: "202611011211-VKPT8K"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:4a4dcf8bda64b44597c06419976345f14809148bd546996276d3e33dcbbc04a9"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:9f9e08394772dacc159fa96ef993d233e52722b787777b9592a1556e2ba21242"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:5db81e73cfc30a84dd9691b527d55a189065f179b2fd35bb9209adfe45b0a66a"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c860bcef9aa171f312ee439de5ae185ee09c86b57084416f4654c1d816d1483d"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:d2e26432e182546dcad83ef2d7dc601c09d2683054586584debe976b98039bbe"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:c0292b38f32290a90f52b1be2d85aaed324fd433a1fbf10588ec3c9cc8bd3885"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            task_id: "202611011211-VKPT8K"
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
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            evidence_digest: "sha256:93909a5a99b7cbcd7f3023dfb9323b442bec8b24d52ab820226a7d2a869cfd31"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:278c972293b95ce8a1cfcedbe176933e11eebc0e03c25654df9bdd525a656266"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:5db81e73cfc30a84dd9691b527d55a189065f179b2fd35bb9209adfe45b0a66a"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c860bcef9aa171f312ee439de5ae185ee09c86b57084416f4654c1d816d1483d"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:9f9e08394772dacc159fa96ef993d233e52722b787777b9592a1556e2ba21242"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            task_id: "202611011211-VKPT8K"
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
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
            evidence_digest: "sha256:4b65917090b88a87e043a054ade24c7be6814663b2acb6b12e0709fbd040d568"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:c0292b38f32290a90f52b1be2d85aaed324fd433a1fbf10588ec3c9cc8bd3885"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:4958b34cbadc41ab22e17a72393b4ddbab1e7d037e9135e01597f10a5f720900"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:f12d546663a6097f15bc296a9bdaba0420b994e2741ecc8747aad08d2a7ff990"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:c860bcef9aa171f312ee439de5ae185ee09c86b57084416f4654c1d816d1483d"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:278c972293b95ce8a1cfcedbe176933e11eebc0e03c25654df9bdd525a656266"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
              - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
              - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            task_id: "202611011211-VKPT8K"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "real_e2e"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:b9038b1d6d6c5590494bc9808b6d482f1d427724a5301eaafa541625fd45c52e"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:edbe258d149edd42426ed48ea7c8e5276f84de585fadd68387e6e600ca70a62d"
        digest: "sha256:f12d546663a6097f15bc296a9bdaba0420b994e2741ecc8747aad08d2a7ff990"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:9d51fb53d4b9379ae22acd31f5162186dcf6b8cbece3d0de3630973a1d1182df"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
            expected_outputs:
              - "native-quarantine-publication-source"
              - "native-quarantine-publication-coverage"
            id: "native-quarantine-artifact-publication"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:5192f85e1b08f35605a1e60e7a37db51eb0fc5a3cf5fd382be66b56f26ba9388"
            depends_on:
              - "native-quarantine-artifact-publication"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            expected_outputs:
              - "final-correction-57d57d503193-evidence"
            id: "final-correction-57d57d503193"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:2a699a8ed3fb0a262c621fdd4eab8c272c8cb849f2c280ba64c706a83158ca8e"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:95b9199f9ebd0b8b5e08264e9146fce14da0bfe2265b19321854e4016ab27463"
          environment_digest: "sha256:566347fb070e106b93959670b3530c8592e24ead37cff0b826691706be4055c1"
          implementation_identity: "sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
          toolchain_digest: "sha256:61e6dd981194a2b8f41475f0271edf6eb504b2ff1ac14a1c4bf264ad6cc80edb"
        observed_at: "2026-11-02T17:04:07.543Z"
        status: "PASSED"
      id: "202611011211-VKPT8K"
      intent_digest: "sha256:998e4f6b692c3c0c740726474960326f2fad56ebc1dc4fbaa0fd256575a515a7"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:f12d546663a6097f15bc296a9bdaba0420b994e2741ecc8747aad08d2a7ff990:
          after_revision: 33
          aggregate_digest: "sha256:610f65c4678ef0e05565e774f2ca2ec8f1a5a0f525b0eadeaa839071e044749a"
          before_revision: 32
          command_digest: "sha256:95d5818ebfa90fa0e4f0a8208aaf9ab4801e38876456e99d842aed8a38efb2fe"
          effect_ids: []
          event_digests:
            - "sha256:844c75d0d5e8e55e3f74a8c752263f737d5bfafa86922c92194ff11776947910"
          mutation_id: "amend:sha256:f12d546663a6097f15bc296a9bdaba0420b994e2741ecc8747aad08d2a7ff990"
        capture:202611011211-VKPT8K:
          after_revision: 1
          aggregate_digest: "sha256:bad1f35a175c550a9d14c60bdbd5970b5569bfa57e6a82231a143c1f8c4c6097"
          before_revision: 0
          command_digest: "sha256:6c476412f48b6faa3a5dd7f31a456022e88488325eec9a779c98a1fa569999ce"
          effect_ids: []
          event_digests:
            - "sha256:32bbecb2653afd7cbaea6278febcd18b904cb91f2886b5912583e340caff39a7"
          mutation_id: "capture:202611011211-VKPT8K"
        final-validation:sha256:2a699a8ed3fb0a262c621fdd4eab8c272c8cb849f2c280ba64c706a83158ca8e:40:
          after_revision: 41
          aggregate_digest: "sha256:7b15987ce8cd584b71db009ccf1942b054071e61bbc25128f5cc738e80d60d3b"
          before_revision: 40
          command_digest: "sha256:0ca2861b045c458828644b20f78c461940f9a7a368cfb4a4bef46f90c3332309"
          effect_ids: []
          event_digests:
            - "sha256:89952701b5f139f774de84f3c1e54e80fc81b17ecdb8addf892e9f9b63ecb563"
          mutation_id: "final-validation:sha256:2a699a8ed3fb0a262c621fdd4eab8c272c8cb849f2c280ba64c706a83158ca8e:40"
        final-validation:sha256:57d57d503193ea316be9af555ea8cf78e6dc0e71ed0e64be1d2a7916b83099fb:31:
          after_revision: 32
          aggregate_digest: "sha256:fdf8a031a6b4937d3195097786ee38a59fcf3d1fd4806a47259f2f59c12c2957"
          before_revision: 31
          command_digest: "sha256:633b58bf86deacde644763a203261f530b9774f03a0fb9907eb8f96b220260c3"
          effect_ids: []
          event_digests:
            - "sha256:8e7a0836928609a05a8b10f3fe13d4c2af2a85c535a4c91318b88ea11811646f"
          mutation_id: "final-validation:sha256:57d57d503193ea316be9af555ea8cf78e6dc0e71ed0e64be1d2a7916b83099fb:31"
        kernel_task_completion_required:sha256:7caff1a08d0f7dee428b2671ac694b9443132d83a8d60468af44ac79a535a120:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:
          after_revision: 42
          aggregate_digest: "sha256:7ed59be0837b2969da127b31f56624082bb1f291f38798f74521f1f851e706fe"
          before_revision: 41
          command_digest: "sha256:9a2a59f38850c2b4ec0800e15b7210180ad7e4553bfd7b17acc6183824f3c8fc"
          effect_ids: []
          event_digests:
            - "sha256:b7bb7af1d0eec1a944fffd496bd7b0be50efab8b87f2ebb9393a0f43009fa111"
          mutation_id: "kernel_task_completion_required:sha256:7caff1a08d0f7dee428b2671ac694b9443132d83a8d60468af44ac79a535a120:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        kernel_work_item_claim_required:sha256:1f7be30635ee3415ae6145c836976895046e84331a065b89565269dc236266e7:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:
          after_revision: 5
          aggregate_digest: "sha256:1fe64624cf7a782107ca40633a3f16c14402bc1e4ee247a7e7efffe5b549fa99"
          before_revision: 4
          command_digest: "sha256:47f3fb29abcb89eac9ce27425c9ff66e08df853b3bca7f62682d115806975e76"
          effect_ids: []
          event_digests:
            - "sha256:3adb0068c74fb6d1515e9938d5e8521607025aaf021b1e1c3d5dab26677968bc"
          mutation_id: "kernel_work_item_claim_required:sha256:1f7be30635ee3415ae6145c836976895046e84331a065b89565269dc236266e7:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        kernel_work_item_claim_required:sha256:73bd4412903c5ca8c0cbe7f6728cbfce9ec2cc63aaf1681bd77dfae7382cebe5:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:
          after_revision: 35
          aggregate_digest: "sha256:363706533daf4b293e3518abb761272f0080b2664e4fdda3c658bbc1010d9b0d"
          before_revision: 34
          command_digest: "sha256:80f61a76861e05f8cbc244746711e89a29f42b416401387b801d383ff0e35389"
          effect_ids: []
          event_digests:
            - "sha256:e85527f52866547b495d70fc5a84ac772bb14a1de42bc80e5c7f81cbd2ff535d"
          mutation_id: "kernel_work_item_claim_required:sha256:73bd4412903c5ca8c0cbe7f6728cbfce9ec2cc63aaf1681bd77dfae7382cebe5:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        kernel_work_item_execution_required:sha256:2578a1f45ad72a3c7f613e61b584278d52a993467005c1edca6a9e4eacbb6a02:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:
          after_revision: 21
          aggregate_digest: "sha256:1ea4a7fc02844140a5f32f992e38c4c5b8840da0c5b77f5d24c80b8d5744e829"
          before_revision: 20
          command_digest: "sha256:9bd345b6f69d630bd5f88b5222bf2c56da21eb4c91301a3ead04c4f50da3374d"
          effect_ids: []
          event_digests:
            - "sha256:c76b0cff125d5ae3cc28b3957b6d0b458b757a92a97908a78224ff1951778307"
          mutation_id: "kernel_work_item_execution_required:sha256:2578a1f45ad72a3c7f613e61b584278d52a993467005c1edca6a9e4eacbb6a02:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        kernel_work_item_execution_required:sha256:4ab7532f20f0cfa7a94b9eaf6b959a5b73df2f8e6660f50cdca7f0e53c86de7c:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62:
          after_revision: 7
          aggregate_digest: "sha256:4377eab85bed6f390759526c38063c8fae9ff6d79172082868ce2eb0b76668f9"
          before_revision: 6
          command_digest: "sha256:30cf2b443ff8372f75a2c766d07911fcfa993a6c198518229cecca4323ab06da"
          effect_ids: []
          event_digests:
            - "sha256:25dd4d6f25d770359febedd3489debd6f449d5fa640cde61466c0aab226083fd"
          mutation_id: "kernel_work_item_execution_required:sha256:4ab7532f20f0cfa7a94b9eaf6b959a5b73df2f8e6660f50cdca7f0e53c86de7c:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62"
        kernel_work_item_execution_required:sha256:522204d5288b20f34eda5ef746bb9e79fe7001041245425c5ce91e9d53118c33:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:
          after_revision: 36
          aggregate_digest: "sha256:979d1009555e23c36a0780148f8f69fd51919a0b86adb5656e7f83bed20e23d0"
          before_revision: 35
          command_digest: "sha256:d98f2d9cc0cf6a8e596fbf4faadeeca3b435af824f401d20fba5f000bf2e86fb"
          effect_ids: []
          event_digests:
            - "sha256:408a0b9b83a467fb535f2f1be5a25ec1fe3d77884ed661bd853062745e31a6f1"
          mutation_id: "kernel_work_item_execution_required:sha256:522204d5288b20f34eda5ef746bb9e79fe7001041245425c5ce91e9d53118c33:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        kernel_work_item_execution_required:sha256:b66a60c97e524d87cbc7dc9609f10b0f3b6d6d1952b8c1c8e19d62ac5865cc1a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:
          after_revision: 27
          aggregate_digest: "sha256:b473ce6d0082b00a7b51f564286f0fd62ae28912526c94460642c0cca74c7014"
          before_revision: 26
          command_digest: "sha256:4eb4a4ac62bb487f9cb735ea76e671f29b6dd1beb6ab040c7b9fb3c8289f7135"
          effect_ids: []
          event_digests:
            - "sha256:e0e289cd26089d503aefc0f0cc0c18a8f260ea1341ff96de9c12ad4d6d584ca4"
          mutation_id: "kernel_work_item_execution_required:sha256:b66a60c97e524d87cbc7dc9609f10b0f3b6d6d1952b8c1c8e19d62ac5865cc1a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        kernel_work_item_execution_required:sha256:d5c6d1bf242d7c3fc3e165ed9e0775c68c27565c38b49b2526071099020e5218:sha256:c0292b38f32290a90f52b1be2d85aaed324fd433a1fbf10588ec3c9cc8bd3885:
          after_revision: 14
          aggregate_digest: "sha256:08cc895e62ebd7a2902aade4e0cd2de9b042cd7fa3cf7a94a88116ce4f1abd37"
          before_revision: 13
          command_digest: "sha256:8d8c927d1fce41da809ed55f8f371c6860c6d8d1f9531c7dcf4a23ff725cd24b"
          effect_ids: []
          event_digests:
            - "sha256:6a0eac40d4e94f61fb9760806fe00847c278246308ab63d287f7d8612644027a"
          mutation_id: "kernel_work_item_execution_required:sha256:d5c6d1bf242d7c3fc3e165ed9e0775c68c27565c38b49b2526071099020e5218:sha256:c0292b38f32290a90f52b1be2d85aaed324fd433a1fbf10588ec3c9cc8bd3885"
        kernel_work_item_inspection_required:sha256:0f8a6e81a51d3e59f8676dd60821e01dde93b8d02094c42b6ea694e0f9de8009:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:
          after_revision: 38
          aggregate_digest: "sha256:27617055a2a376f1518dc63fac2638b3fa26a8aa763a124d196d14809ad58aed"
          before_revision: 37
          command_digest: "sha256:189c8468fbb439b17de577f2fa850e27dc2b6287106a330ac18abcfc9a929850"
          effect_ids: []
          event_digests:
            - "sha256:070c2f4171c850c3241973f5bca1e426c8b25981122cc64435bdad67b25e5ecf"
          mutation_id: "kernel_work_item_inspection_required:sha256:0f8a6e81a51d3e59f8676dd60821e01dde93b8d02094c42b6ea694e0f9de8009:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        kernel_work_item_inspection_required:sha256:5bf5849c2c7247d51790cfd332554d49b09b185a414e1383fdc48aa8f153e333:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:
          after_revision: 29
          aggregate_digest: "sha256:bf7bc524f35abbd0c6c579a910b3ceb9f3e7cd63d112d6436c54604063514993"
          before_revision: 28
          command_digest: "sha256:a76509630810a98ed58b296e763d24adeb9a7af8d75d88c6d5fc728e364b959a"
          effect_ids: []
          event_digests:
            - "sha256:07f981a4aa200f4408aa0554572425377317e9dc48dfb1d514662976303f9c7f"
          mutation_id: "kernel_work_item_inspection_required:sha256:5bf5849c2c7247d51790cfd332554d49b09b185a414e1383fdc48aa8f153e333:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        kernel_work_item_inspection_required:sha256:5c5c940c5339adcacebf4d366328f754c310416445f19eea00d5c93d65fca10b:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:
          after_revision: 17
          aggregate_digest: "sha256:0e6a2872e0d5d4296acf7b20d78c875e4a0c1cef3162c450cdf2d8591097c3d7"
          before_revision: 16
          command_digest: "sha256:20a12626b468e2d031ccf5d1bd5dd09e3c1b8c2128f93f893a1e22d54bd5cb87"
          effect_ids: []
          event_digests:
            - "sha256:701bb945cbb3e6166e015f2593a0fd16d2368f08e5e550aaa4c683663d2159f7"
          mutation_id: "kernel_work_item_inspection_required:sha256:5c5c940c5339adcacebf4d366328f754c310416445f19eea00d5c93d65fca10b:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        kernel_work_item_inspection_required:sha256:752fceeb1409d775cd583301f6869f00fb2fb8f3e8f4331d01d425c6f6a6f75a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:
          after_revision: 23
          aggregate_digest: "sha256:074da7c35c11bf80440187d44f4630180b0f15cae1e6f5e1cff714c23ae4cd3d"
          before_revision: 22
          command_digest: "sha256:5703db67ca6fb1ca7d1c84806a9dc1e5e4a495332f1c02c2b2436b81b7548e41"
          effect_ids: []
          event_digests:
            - "sha256:1cf0501c1d04f316711498d550d53a8670dba5ddaf7e3b06068667d5fdee08b2"
          mutation_id: "kernel_work_item_inspection_required:sha256:752fceeb1409d775cd583301f6869f00fb2fb8f3e8f4331d01d425c6f6a6f75a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        kernel_work_item_inspection_required:sha256:c8f0ce25e50ea59fc795da8b31477f2b48baabef6c6c786e69c313a129cd1c69:sha256:c0292b38f32290a90f52b1be2d85aaed324fd433a1fbf10588ec3c9cc8bd3885:
          after_revision: 10
          aggregate_digest: "sha256:7af884c0b0a8c7c6a44b748bc0e6b7ca0c9694dd89f21ccec37a35781c0a7d8f"
          before_revision: 9
          command_digest: "sha256:0ea6598d57a6afce6cb580514d77f74d87625a7a5ff6c4702f5bb9db8dd5f52e"
          effect_ids: []
          event_digests:
            - "sha256:8fb2a5b906375ee2cf929b8d1130260f1c03234056e5334a333e9c46554807f2"
          mutation_id: "kernel_work_item_inspection_required:sha256:c8f0ce25e50ea59fc795da8b31477f2b48baabef6c6c786e69c313a129cd1c69:sha256:c0292b38f32290a90f52b1be2d85aaed324fd433a1fbf10588ec3c9cc8bd3885"
        kernel_work_item_materialization_required:sha256:e2f178a86f1fab76fe59a798ab734c2d3f1e283753f4916ffedea8a4d0998afd:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:
          after_revision: 4
          aggregate_digest: "sha256:00c771d97077081b5508972f42be837d06750dc7bc7232796882bdd67d1be361"
          before_revision: 3
          command_digest: "sha256:9ee3e907a267cc9ef35d8df2bd8bec3c177ae2b294cf874c96a670efd83fd05d"
          effect_ids: []
          event_digests:
            - "sha256:c2e4a9eba4a74ebb24a7e12e5f92d211d4d231a6c0d8671780429b9a22ff113a"
          mutation_id: "kernel_work_item_materialization_required:sha256:e2f178a86f1fab76fe59a798ab734c2d3f1e283753f4916ffedea8a4d0998afd:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        kernel_work_item_rework_claim_required:sha256:4a1eb7cbd6cdfce64d46c82902db7cd76a3add6c1362fcac3120027e5055b47a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:
          after_revision: 26
          aggregate_digest: "sha256:aafe7f4525588b5c7cdc0722216964a6d73a76c9313d75f3d84867106d1c26ea"
          before_revision: 25
          command_digest: "sha256:bf03029f09694fe09a4d0c53899d4fed4a33b7a329305292c375c5441a0daaca"
          effect_ids: []
          event_digests:
            - "sha256:d6b5d8a89bb2c95d189bf1b7b2497dc4ccad3b118e70b0e1bcaced2bd9004993"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:4a1eb7cbd6cdfce64d46c82902db7cd76a3add6c1362fcac3120027e5055b47a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        kernel_work_item_rework_claim_required:sha256:7e8f515a3a9707ede6ef5a957fb920b0f29d8549d49e47e2711fb1b53edda0c7:sha256:c0292b38f32290a90f52b1be2d85aaed324fd433a1fbf10588ec3c9cc8bd3885:
          after_revision: 13
          aggregate_digest: "sha256:683b5ddaf4fd8d66aa1435cf43677d605a2ddb5126c5d63857b455dcf6434fb2"
          before_revision: 12
          command_digest: "sha256:05ccb091f05c51655d95c8760d0cc2f105f8b12c7c6b5ce31737599f75100017"
          effect_ids: []
          event_digests:
            - "sha256:9417d452bfc5c100f036f58adf523d4f72d29aa3b5f906b6770c00f5543f7ca9"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:7e8f515a3a9707ede6ef5a957fb920b0f29d8549d49e47e2711fb1b53edda0c7:sha256:c0292b38f32290a90f52b1be2d85aaed324fd433a1fbf10588ec3c9cc8bd3885"
        kernel_work_item_rework_claim_required:sha256:856181bb0efa63948489234358c7c5ee712b1fe31cb72701c4010f6d77280b9a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:
          after_revision: 20
          aggregate_digest: "sha256:5e2372c6b753ae65d9113731afb1ff19b38c6f0ac03f09fe2ee418ebbdeb22c3"
          before_revision: 19
          command_digest: "sha256:01fe0fcb97aa872d12ccde5ff3c378c40dbcfa2ad5b07396a4ce9de5a16674da"
          effect_ids: []
          event_digests:
            - "sha256:078b538878445afbb868d1bdc77e6e96010cfa1fe3cf33bb589027dfe64a7f30"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:856181bb0efa63948489234358c7c5ee712b1fe31cb72701c4010f6d77280b9a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        result:sha256:445b99203ea4c6c9dc122670d5e62016a66b7414b67438d6885a7a821401d686:
          after_revision: 9
          aggregate_digest: "sha256:a1d897b13badde3cea34af7741316e07e0da22e56091db25d3b4cbecb16bac77"
          before_revision: 8
          command_digest: "sha256:d967bbe601248aa3f9180183a7398d434163da333d2be9c5f10948619ae1ae24"
          effect_ids: []
          event_digests:
            - "sha256:ac04dc0416b428cb266c33744871e173b4cf02c1c220ca97412917f0d5f4dbc9"
          mutation_id: "result:sha256:445b99203ea4c6c9dc122670d5e62016a66b7414b67438d6885a7a821401d686"
        result:sha256:4a327f9a38850e4c56c840c28af94570aa9902863f05d3209ad8897f51432b03:
          after_revision: 37
          aggregate_digest: "sha256:a147544d335b4bdba15479df333a2024a5fbbf6525d9b52077555fa482e685b4"
          before_revision: 36
          command_digest: "sha256:2852ff1249720e7d38278b4ef145fd2be43cd051907af229f2c7bb0359bac7b1"
          effect_ids: []
          event_digests:
            - "sha256:0ac4f517dadd3f252572835f79dbc189763b5fe6174b36d58fb76537ca1bc708"
          mutation_id: "result:sha256:4a327f9a38850e4c56c840c28af94570aa9902863f05d3209ad8897f51432b03"
        result:sha256:645e240eaf82ef1f29e70fbecd23dcee716ca1cfc17babe2b19dd46fcd660ff6:
          after_revision: 16
          aggregate_digest: "sha256:3610e102afe947735128e1b4e7c9858b76bad15fa0b3e9f7a2ab37288306341a"
          before_revision: 15
          command_digest: "sha256:b2c53ee1eda3b149d006f4632f2fd1376fad04688aca7d0d6d978edc4a7c7209"
          effect_ids: []
          event_digests:
            - "sha256:5b08308a855b8ec1c4e3b17139a5a20333eb5111b3fd5c416e4549df4d84cff8"
          mutation_id: "result:sha256:645e240eaf82ef1f29e70fbecd23dcee716ca1cfc17babe2b19dd46fcd660ff6"
        result:sha256:826b5ef23af5d9c9b60aa569e1d9c2e056ad17c69c57d5633f79af28f1e09e00:
          after_revision: 28
          aggregate_digest: "sha256:5e2183023b613d45fa0d3c14139e7a831b80d590af4d41e9d0bdb7c7eb71730b"
          before_revision: 27
          command_digest: "sha256:8ffff14d5e5cc7cabb4afd3a1c7f1bf0e49a86922382a2d82bdba3e659b04c35"
          effect_ids: []
          event_digests:
            - "sha256:4c54af84c47b7c0020246205405b5f39fa31110ef670514d058de07303323ea4"
          mutation_id: "result:sha256:826b5ef23af5d9c9b60aa569e1d9c2e056ad17c69c57d5633f79af28f1e09e00"
        result:sha256:ced3d89c2112e1959e87e63cb71d258f1648b2c95849bbe6070befc8994b1ee6:
          after_revision: 2
          aggregate_digest: "sha256:fcd19b4f1cacd8657a69b33d002ad6744d41e54610e1007f4f90cde25bbefc60"
          before_revision: 1
          command_digest: "sha256:9a9f840f5d83b2f82c70f136f7db629e71541a5adb7d866eb7a36f6c72e94a6b"
          effect_ids: []
          event_digests:
            - "sha256:771cf9831d7691dc56c2174ebbe637fb23eec4c71b7d2cf1494da9f66fce0a0a"
          mutation_id: "result:sha256:ced3d89c2112e1959e87e63cb71d258f1648b2c95849bbe6070befc8994b1ee6"
        result:sha256:e5187b39a6c8afeb67ace0bcebf350d501f6c2c9e9f7494dbe9a65c68d1dc8af:
          after_revision: 22
          aggregate_digest: "sha256:4c560c00ac530733d6d15b2c1deb1a7806c0c8c9b0d5d75218162e3fc95b7594"
          before_revision: 21
          command_digest: "sha256:6a43fef27512f228463475d7b83b4b9fd3433983247fc6f44a64648d582ed878"
          effect_ids: []
          event_digests:
            - "sha256:38e04fc3afecd3e97780cede24db354a1c24b39960ba3af0a2619d1bfc4d3a68"
          mutation_id: "result:sha256:e5187b39a6c8afeb67ace0bcebf350d501f6c2c9e9f7494dbe9a65c68d1dc8af"
        sha256:05f901722e8afc74de69c79d74e39fd7dd546544440eb858159dae100dbf051e:
          after_revision: 8
          aggregate_digest: "sha256:4bc2a901b206354c73b3ddfbe4a258c282356984dc123cb773592028ae956d74"
          before_revision: 7
          command_digest: "sha256:c5c16e9cfd65430292f4ac1678e9488024ee0cb3ccce7653cf992b9da263c640"
          effect_ids: []
          event_digests:
            - "sha256:d70005d4c326330d2621fd5b9dca713500f77763f4c9003401a4b07fb430f9d1"
          mutation_id: "sha256:05f901722e8afc74de69c79d74e39fd7dd546544440eb858159dae100dbf051e"
        sha256:417833e50f85951113796e92bd248cec2137ddc541ff1bcc0a2d546f81d4879b:
          after_revision: 3
          aggregate_digest: "sha256:4b7aedb4c073597ffcddb8ada39812f361f50c5759664dbf33d0db07bb8d7f69"
          before_revision: 2
          command_digest: "sha256:650f6a2530570e9f8d86a94dc99c915c0cd691b5bb4a89017566995c8f787325"
          effect_ids: []
          event_digests:
            - "sha256:f05f5570b9bcb69e8e32205514d0a647fb9269878542af3d8dd723e92cb8ebe1"
          mutation_id: "sha256:417833e50f85951113796e92bd248cec2137ddc541ff1bcc0a2d546f81d4879b"
        sha256:c38e56f926975bfd106355f0b36a6246174c226e670b26a975bcf907513bc6e6:
          after_revision: 6
          aggregate_digest: "sha256:7dd900468b5d33c547f28001307f726920e47829072a147f2e4603e8e0cfd127"
          before_revision: 5
          command_digest: "sha256:4e99888be69bdd062c66613d24ebfed2c1efb631a2c5632a15b494757d31e694"
          effect_ids: []
          event_digests:
            - "sha256:03ad3d8d52738710fe14e933694a9695227b87e31dd8cb6b1cae02f77d7c37fb"
          mutation_id: "sha256:c38e56f926975bfd106355f0b36a6246174c226e670b26a975bcf907513bc6e6"
        sha256:cca49502f089eb022fa64082b745c95718f6e6825e699996fc43cbdd36a82d63:
          after_revision: 15
          aggregate_digest: "sha256:cd18e6549e88bbe7a83bede63947107f1e0d79d503fa3f7dca1f3a289c749e5c"
          before_revision: 14
          command_digest: "sha256:857c93900e94360fb70da1e011b534cd4bcadd6f467cbaf7f871891fa78c9981"
          effect_ids: []
          event_digests:
            - "sha256:a9369831206638d73ac3fff5bcc6f70710a59a99ef1a03cb3d116546e686b45a"
          mutation_id: "sha256:cca49502f089eb022fa64082b745c95718f6e6825e699996fc43cbdd36a82d63"
        sha256:faafa4c887ff39fc258f32e40dd1defccf50ac6807be36b8a61b3b3e98ab4174:
          after_revision: 34
          aggregate_digest: "sha256:bd92359016ef2397a9fddd14986228a2e6f61fa3b56e75c70fb154e7416da995"
          before_revision: 33
          command_digest: "sha256:f41b08f24b6252562981e93a768c9240d8e9da43c89107dca6ed4b2a9bcfc01d"
          effect_ids: []
          event_digests:
            - "sha256:a4c16473ad5569b71a2ece417c741be29b6b203b06c10af37c962ccd1c68bddb"
          mutation_id: "sha256:faafa4c887ff39fc258f32e40dd1defccf50ac6807be36b8a61b3b3e98ab4174"
        validation-resolution:sha256:0ea46e4b81108f466ac49401b0d72896503de1116fce0af06c899d5bb3848ff6:
          after_revision: 19
          aggregate_digest: "sha256:7c8c039f9a18404ae86b802d6b847213fc18250345192672534792edb6395ea2"
          before_revision: 18
          command_digest: "sha256:01c79c6b9d58cb4a5e582c2c948a2dacedc692dad2b8ea9d5112138f67debafd"
          effect_ids: []
          event_digests:
            - "sha256:b745738f9630222fdecff8d616acd596ed88f6a6a1e459388cc18804ed61467b"
          mutation_id: "validation-resolution:sha256:0ea46e4b81108f466ac49401b0d72896503de1116fce0af06c899d5bb3848ff6"
        validation-resolution:sha256:135a3486db34e1ca7064fe79352ec229ad17ca03a28c0e55d60d849681a7a431:
          after_revision: 40
          aggregate_digest: "sha256:b8a351cccea1437c032a297b22a649d4d0d5135f3d8a9d0363cb26344cb35dfd"
          before_revision: 39
          command_digest: "sha256:833028b2bd7210f0ec2ae473a86bb0e7f5fbf2d4b010cc4a18cc39ef19838e2a"
          effect_ids: []
          event_digests:
            - "sha256:cba888a6ed84966509fc3f4e8749a995a56a68b2781bb0f1006659a1bb609910"
          mutation_id: "validation-resolution:sha256:135a3486db34e1ca7064fe79352ec229ad17ca03a28c0e55d60d849681a7a431"
        validation-resolution:sha256:38ed4b85c853f4cc94f61aba2d9f10f6aa37c0e4be8243ba11479a5cd9be644a:
          after_revision: 25
          aggregate_digest: "sha256:6ffa1843a795f90ad550135c7d457de42dbaa6e7097e871d5047de22c9e560f2"
          before_revision: 24
          command_digest: "sha256:be0585ebc00163f1017de43ef1464b7eb796708669b892b3734ab55fbeba54ac"
          effect_ids: []
          event_digests:
            - "sha256:9392715b517f0dfc6a9c21ee0da1002c01666bef71b43cd5aed9328f6f6e032a"
          mutation_id: "validation-resolution:sha256:38ed4b85c853f4cc94f61aba2d9f10f6aa37c0e4be8243ba11479a5cd9be644a"
        validation-resolution:sha256:60f9d06fcc682bc4965a8d3d3a4439d80feb74c402991197bbac84b380a3f012:
          after_revision: 31
          aggregate_digest: "sha256:1b54891b3d5d35b59a71eaa3c8f0d6010e089dcad56683cd9475504943a4cc8b"
          before_revision: 30
          command_digest: "sha256:123e4344394c29b93ef67efd7c6838163344606244362020f8dd76e92ce0a2b7"
          effect_ids: []
          event_digests:
            - "sha256:e666d26d60247dfa186448dd768fb1ce91486a90d9656e6c951976c78473a525"
          mutation_id: "validation-resolution:sha256:60f9d06fcc682bc4965a8d3d3a4439d80feb74c402991197bbac84b380a3f012"
        validation-resolution:sha256:ca10fe56cef12c92364bc229be814eaba29499e468420bdde5076f6c932f7c97:
          after_revision: 12
          aggregate_digest: "sha256:d931e610b22a9424804fd6df2568072980ef831540bcf3a1fc9febd3c67c49b8"
          before_revision: 11
          command_digest: "sha256:21fb886a9fba4a94abce63f5e6b552ccb20543f486b23a4111b2d07ac3c5e894"
          effect_ids: []
          event_digests:
            - "sha256:ee99b01e31fc41cda6eed5584b55c19a6194838091d0668fd37fe51f96c9eeee"
          mutation_id: "validation-resolution:sha256:ca10fe56cef12c92364bc229be814eaba29499e468420bdde5076f6c932f7c97"
        validation:sha256:1539da59fe4f67b8c5bfca1b84c50915e0fa4fab8949fec764f0d564b31dc64e:
          after_revision: 30
          aggregate_digest: "sha256:4ae342773239ff3846e54b10b1e611c48470771c374ded2918021a14ba3dd4f1"
          before_revision: 29
          command_digest: "sha256:06ada0f0e5ca9e173bc6f1de53e359492bc8a0cf2bf139e0a5e432e2f95ca47c"
          effect_ids: []
          event_digests:
            - "sha256:2e11759d3d566d99343ad35378c4b4e931e28647fad612fd9766a250174713cf"
          mutation_id: "validation:sha256:1539da59fe4f67b8c5bfca1b84c50915e0fa4fab8949fec764f0d564b31dc64e"
        validation:sha256:445b99203ea4c6c9dc122670d5e62016a66b7414b67438d6885a7a821401d686:
          after_revision: 11
          aggregate_digest: "sha256:12032f3d7155015763be11edbb56abd83a9c714f826199ea3e343071a592a384"
          before_revision: 10
          command_digest: "sha256:166f1823de9ee5a4ebf26313feaf22a13826688581029445296c2195e289de91"
          effect_ids: []
          event_digests:
            - "sha256:267f59a7bbeef8ba2b5590cf86f047efa74197d075c9a6683d5c83c82e705da2"
          mutation_id: "validation:sha256:445b99203ea4c6c9dc122670d5e62016a66b7414b67438d6885a7a821401d686"
        validation:sha256:645e240eaf82ef1f29e70fbecd23dcee716ca1cfc17babe2b19dd46fcd660ff6:
          after_revision: 18
          aggregate_digest: "sha256:f84847723fa187512985d507143bc1904977e518878af88dde1403b030004023"
          before_revision: 17
          command_digest: "sha256:0c5ed5b489ef9ffe1ffb0806543798b1f1ef61c20bd2ded3283754714222cb0e"
          effect_ids: []
          event_digests:
            - "sha256:a4ca77d8efab4fe2d03412bf4e9f69cc31b834c95e3ea034804f2aa9df98269e"
          mutation_id: "validation:sha256:645e240eaf82ef1f29e70fbecd23dcee716ca1cfc17babe2b19dd46fcd660ff6"
        validation:sha256:a7cadee48e962cde96d7345ccf7daa213f74f9a015cc4f1538ac6784adfc1cfc:
          after_revision: 39
          aggregate_digest: "sha256:06b2fd38c7cb86bf53905dff94f47b5f09d5bbf0e027fe7eb6c70c1943ec7fa7"
          before_revision: 38
          command_digest: "sha256:f7b25ea76bfaeb8ff0e9c4c2a1473842775e9fa8bf35b185ce33cf71bce9e101"
          effect_ids: []
          event_digests:
            - "sha256:da423231ea22c59193427edf24b731b89c0925dd1dc2bf107364f3a3c3941811"
          mutation_id: "validation:sha256:a7cadee48e962cde96d7345ccf7daa213f74f9a015cc4f1538ac6784adfc1cfc"
        validation:sha256:e5187b39a6c8afeb67ace0bcebf350d501f6c2c9e9f7494dbe9a65c68d1dc8af:
          after_revision: 24
          aggregate_digest: "sha256:37c3860d5d69de1ea8aca0e8a5b757c7ee155f54ec56e9f849f9346881cd3777"
          before_revision: 23
          command_digest: "sha256:964e7081c0e023d16e92a93a0b2bec9a6de88ae6e4d69b7b439f6d96275be981"
          effect_ids: []
          event_digests:
            - "sha256:ac78d44ea35a568c438198da1404b2dab51f960c4441684ffa486b7f39c36f6d"
          mutation_id: "validation:sha256:e5187b39a6c8afeb67ace0bcebf350d501f6c2c9e9f7494dbe9a65c68d1dc8af"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:c860bcef9aa171f312ee439de5ae185ee09c86b57084416f4654c1d816d1483d"
          digest: "sha256:5db81e73cfc30a84dd9691b527d55a189065f179b2fd35bb9209adfe45b0a66a"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:9d51fb53d4b9379ae22acd31f5162186dcf6b8cbece3d0de3630973a1d1182df"
              depends_on: []
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "repository_write"
                  - "source_code"
                  - "tests"
                  - "security_boundary"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
                  - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
                  - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                  - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
                  - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
                  - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
              expected_outputs:
                - "native-quarantine-publication-source"
                - "native-quarantine-publication-coverage"
              id: "native-quarantine-artifact-publication"
              optional: false
              required_inputs: []
      revision: 42
      schema_version: 1
      state: "COMPLETED"
      work_items:
        final-correction-57d57d503193:
          attempt: 1
          claim_id: "sha256:3564c496415ef02ef807d46b80e0b74ffae41051a1fce78cdc4a2bef3a7e10d3"
          definition:
            contract_digest: "sha256:5192f85e1b08f35605a1e60e7a37db51eb0fc5a3cf5fd382be66b56f26ba9388"
            depends_on:
              - "native-quarantine-artifact-publication"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "security_boundary"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
            expected_outputs:
              - "final-correction-57d57d503193-evidence"
            id: "final-correction-57d57d503193"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:30e397a75ca100b87e313c5412b1fded72e96b328cd1eb44c79ffcc5c3fa2a3a"
              id: "final-correction-57d57d503193-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
              task_id: "202611011211-VKPT8K"
              work_item_id: "final-correction-57d57d503193"
          result_digest: "sha256:3fde8438914061f3c4b38feb0bc6f9ce37a707307af40ed8a2f8b4fc5f891490"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:215c0ad3ea7a65923a6dc9f0cf348316e978a8852173380fa98b2e69d8556cb7"
              - "sha256:ad578dae60b42f08b3d0b41eacb9bd3cfc47a3876ee4f45864535d54ed0f7107"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:95b9199f9ebd0b8b5e08264e9146fce14da0bfe2265b19321854e4016ab27463"
              environment_digest: "sha256:e28f9bae750c99eee89c78b001677d0f8ac25c14731e7d9b7039dab7d956cf3e"
              implementation_identity: "sha256:3fde8438914061f3c4b38feb0bc6f9ce37a707307af40ed8a2f8b4fc5f891490"
              toolchain_digest: "sha256:79c97f010525493ea43f11c752e7b0a85287dc2e01b32f06a32f107a66fe2786"
            observed_at: "2026-11-02T17:04:02.066Z"
            status: "PASSED"
        native-quarantine-artifact-publication:
          attempt: 4
          claim_id: "sha256:7bd5f96c6cb7b541e1974a75de78b052ba0933a67648730e5d46898d13231571"
          definition:
            contract_digest: "sha256:9d51fb53d4b9379ae22acd31f5162186dcf6b8cbece3d0de3630973a1d1182df"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.ts"
                - "packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts"
                - "packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.ts"
                - "packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts"
            expected_outputs:
              - "native-quarantine-publication-source"
              - "native-quarantine-publication-coverage"
            id: "native-quarantine-artifact-publication"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 4
              digest: "sha256:b63c99ab8c069bf43d8b6b5ee2a55e0388a52d34b78fa7777b196561f5c3ca2b"
              id: "native-quarantine-publication-source"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
              task_id: "202611011211-VKPT8K"
              work_item_id: "native-quarantine-artifact-publication"
            -
              attempt: 4
              digest: "sha256:0a5bbf82509e13c664fedd9a25a0d5bb37f95ac90f5eb2ede01b934f3e937790"
              id: "native-quarantine-publication-coverage"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
              task_id: "202611011211-VKPT8K"
              work_item_id: "native-quarantine-artifact-publication"
          result_digest: "sha256:9e181a1394617cf5313beac30257f998d04eb8c50ffb0a0f3c42dfab691fbf87"
          revision: 25
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:e5446de2e019a2d4093a98bfed61d03f674a59af4bc9028724771c6f77ca696e"
              - "sha256:dd4ee20cb5b151c65bd39ae585d31da749a96ecb0d80d61001b64e4c9903b8a1"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:95b9199f9ebd0b8b5e08264e9146fce14da0bfe2265b19321854e4016ab27463"
              environment_digest: "sha256:94355042d7f8e7c9a0557964d20a3df6ce97cb970447d02d76415ecb76a50a13"
              implementation_identity: "sha256:9e181a1394617cf5313beac30257f998d04eb8c50ffb0a0f3c42dfab691fbf87"
              toolchain_digest: "sha256:79c97f010525493ea43f11c752e7b0a85287dc2e01b32f06a32f107a66fe2786"
            observed_at: "2026-11-02T10:41:45.039Z"
            status: "PASSED"
    digest: "sha256:61903dd536277590fd65123c1de510010304dad2859faf448974d6f39bf574cc"
    documents:
      contracts:
        sha256:5192f85e1b08f35605a1e60e7a37db51eb0fc5a3cf5fd382be66b56f26ba9388:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:57d57d503193ea316be9af555ea8cf78e6dc0e71ed0e64be1d2a7916b83099fb. Read /Users/densmirnov/Github/agentplane/.git/agentplane/kernel/exchanges/202611011211-VKPT8K/25733bf13182ccee4050845d15923b3d3806e2dc1b08fee8b11e3683c91d7ac8/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
            - "bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
        sha256:9d51fb53d4b9379ae22acd31f5162186dcf6b8cbece3d0de3630973a1d1182df:
          acceptance_criteria:
            - "Reuse one shared read-only native quarantine artifact proof in canonical baseline adoption and branch task-artifact ownership. Keep normal own-Task, verified batch, canonical import and scoped volatile cleanup behavior unchanged."
            - "Admit only an approved operator Task with exact individual foreign Task directory roots and repository_write/security_boundary authority. Cross-check the issued WorkOrder for baseline adoption. Broad workflow/Task roots, unapproved or expired authority, foreign repository, unapproved Plan and missing native identity confer no admission."
            - "For each admitted foreign Task, bind the original README raw bytes to the exact Git base. Recompute native revision-split preview and mapping; authenticate marker repository/backend/task/source/mapping/output identities, exact quarantineAfterimage, BLOCKED outer status and exact content-addressed raw source backup. Preserve all historical WorkItems, genuine results and diagnostics inside the original bytes. Do not assign historical DONE/PASS/CANCELLED or execute historical work."
            - "Admit only that foreign README and expected backup. Refuse extras, deletion/rename, wrong or absent base source, changed or forged marker/body/backup/repo identity, unsafe symlink/hardlink/directory paths and source changes during read/stage/publication. Use existing stable contained read and native quarantine primitives. Do not create a generic foreign-artifact or dirty-baseline waiver."
            - "Canonical baseline adoption must include exact already dirty native quarantine outputs under approved foreign Task directory roots, even though those protected paths were excluded from normal source observation. Every adopted path must pass the same proof and current WorkOrder scope. Retain existing dirty-baseline/commit-intent/error/unknown-effect checks."
            - "Verify real Git and byte fixtures plus coordinator and PR guard integration. Preserve existing assertions and cover positive proof, exact scope, custom Task directories, wrong base/repository/source/mapping/marker/backup, additional files, history/deletion/rename, symlinks/hardlinks and retained beforeimages. Verify refusal leaves inputs unchanged."
            - "Complete both declared native mandatory commands and independent EVALUATOR. Publish through protected canonical PR/merge and qualify current main CLI before actual Factory publication. Source WorkItem has no Factory, host, credential, guard, external-write or destructive-Git authority. Preserve all old branches/worktrees/backups and genuine failures."
          objective: "Admit publication only for exact native BLOCKED quarantine afterimages and raw backups under explicitly approved per-Task scope and exact Git base. Preserve all other ownership and execution guards."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
            - "bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts"
      intent:
        context: "Implement the explicitly USER-approved seven-file native quarantine publication admission. Reuse one shared read-only proof classifier in canonical dirty-baseline adoption and branch PR foreign-task ownership. Require approved exact per-foreignTask directory scope and security-boundary/repository-write authority. Bind source bytes to the exact Git comparison base, logical repository/backend identity, genuine native revision-split mapping, exact quarantineAfterimage and exact content-addressed raw source backup. Admit only README and that backup. Refuse arbitrary broad scope, forged or altered marker/body/backup, wrong base/source/repository, extra/deleted/renamed/linked/missing/unstable foreign artifacts and unproven history. Preserve existing Task/batch/import/cleanup rules. Historical Tasks stay BLOCKED; never run old WorkItems or assign DONE/PASS/CANCELLED or classify unknown effects. Verify actual byte/Git/coordinator/publication integration and negative cases, full mandatory CI and independent EVALUATOR, protected canonical PR/merge and current CLI qualification before actual Factory publication. Preserve all existing branches, worktrees, archives, runtime data, credentials and guards. No new public CLI/schema/dependencies or runtime effects."
        objective: "Publish exact native quarantine artifacts without resuming historical Tasks"
    events:
      -
        command_digest: "sha256:6c476412f48b6faa3a5dd7f31a456022e88488325eec9a779c98a1fa569999ce"
        id: "capture:202611011211-VKPT8K:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202611011211-VKPT8K"
        occurred_at: "2026-11-01T12:12:20.327Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202611011211-VKPT8K"
        task_revision: 1
      -
        command_digest: "sha256:9a9f840f5d83b2f82c70f136f7db629e71541a5adb7d866eb7a36f6c72e94a6b"
        id: "result:sha256:ced3d89c2112e1959e87e63cb71d258f1648b2c95849bbe6070befc8994b1ee6:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:ced3d89c2112e1959e87e63cb71d258f1648b2c95849bbe6070befc8994b1ee6"
        occurred_at: "2026-11-01T12:16:28.918Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202611011211-VKPT8K"
        task_revision: 2
      -
        command_digest: "sha256:650f6a2530570e9f8d86a94dc99c915c0cd691b5bb4a89017566995c8f787325"
        id: "sha256:417833e50f85951113796e92bd248cec2137ddc541ff1bcc0a2d546f81d4879b:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:417833e50f85951113796e92bd248cec2137ddc541ff1bcc0a2d546f81d4879b"
        occurred_at: "2026-11-01T12:18:20.513Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202611011211-VKPT8K"
        task_revision: 3
      -
        command_digest: "sha256:9ee3e907a267cc9ef35d8df2bd8bec3c177ae2b294cf874c96a670efd83fd05d"
        id: "kernel_work_item_materialization_required:sha256:e2f178a86f1fab76fe59a798ab734c2d3f1e283753f4916ffedea8a4d0998afd:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:e2f178a86f1fab76fe59a798ab734c2d3f1e283753f4916ffedea8a4d0998afd:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        occurred_at: "2026-11-01T12:18:48.984Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202611011211-VKPT8K"
        task_revision: 4
      -
        command_digest: "sha256:47f3fb29abcb89eac9ce27425c9ff66e08df853b3bca7f62682d115806975e76"
        id: "kernel_work_item_claim_required:sha256:1f7be30635ee3415ae6145c836976895046e84331a065b89565269dc236266e7:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:1f7be30635ee3415ae6145c836976895046e84331a065b89565269dc236266e7:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        occurred_at: "2026-11-01T12:19:50.975Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202611011211-VKPT8K"
        task_revision: 5
      -
        command_digest: "sha256:4e99888be69bdd062c66613d24ebfed2c1efb631a2c5632a15b494757d31e694"
        id: "sha256:c38e56f926975bfd106355f0b36a6246174c226e670b26a975bcf907513bc6e6:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:c38e56f926975bfd106355f0b36a6246174c226e670b26a975bcf907513bc6e6"
        occurred_at: "2026-11-01T12:23:04.165Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202611011211-VKPT8K"
        task_revision: 6
      -
        command_digest: "sha256:30cf2b443ff8372f75a2c766d07911fcfa993a6c198518229cecca4323ab06da"
        id: "kernel_work_item_execution_required:sha256:4ab7532f20f0cfa7a94b9eaf6b959a5b73df2f8e6660f50cdca7f0e53c86de7c:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:4ab7532f20f0cfa7a94b9eaf6b959a5b73df2f8e6660f50cdca7f0e53c86de7c:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62"
        occurred_at: "2026-11-01T12:24:26.268Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202611011211-VKPT8K"
        task_revision: 7
      -
        command_digest: "sha256:c5c16e9cfd65430292f4ac1678e9488024ee0cb3ccce7653cf992b9da263c640"
        id: "sha256:05f901722e8afc74de69c79d74e39fd7dd546544440eb858159dae100dbf051e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:05f901722e8afc74de69c79d74e39fd7dd546544440eb858159dae100dbf051e"
        occurred_at: "2026-11-01T13:31:02.304Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202611011211-VKPT8K"
        task_revision: 8
      -
        command_digest: "sha256:d967bbe601248aa3f9180183a7398d434163da333d2be9c5f10948619ae1ae24"
        id: "result:sha256:445b99203ea4c6c9dc122670d5e62016a66b7414b67438d6885a7a821401d686:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:445b99203ea4c6c9dc122670d5e62016a66b7414b67438d6885a7a821401d686"
        occurred_at: "2026-11-01T13:31:15.704Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202611011211-VKPT8K"
        task_revision: 9
      -
        command_digest: "sha256:0ea6598d57a6afce6cb580514d77f74d87625a7a5ff6c4702f5bb9db8dd5f52e"
        id: "kernel_work_item_inspection_required:sha256:c8f0ce25e50ea59fc795da8b31477f2b48baabef6c6c786e69c313a129cd1c69:sha256:c0292b38f32290a90f52b1be2d85aaed324fd433a1fbf10588ec3c9cc8bd3885:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:c8f0ce25e50ea59fc795da8b31477f2b48baabef6c6c786e69c313a129cd1c69:sha256:c0292b38f32290a90f52b1be2d85aaed324fd433a1fbf10588ec3c9cc8bd3885"
        occurred_at: "2026-11-01T13:31:22.474Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202611011211-VKPT8K"
        task_revision: 10
      -
        command_digest: "sha256:166f1823de9ee5a4ebf26313feaf22a13826688581029445296c2195e289de91"
        id: "validation:sha256:445b99203ea4c6c9dc122670d5e62016a66b7414b67438d6885a7a821401d686:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:445b99203ea4c6c9dc122670d5e62016a66b7414b67438d6885a7a821401d686"
        occurred_at: "2026-11-01T14:36:20.570Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202611011211-VKPT8K"
        task_revision: 11
      -
        command_digest: "sha256:21fb886a9fba4a94abce63f5e6b552ccb20543f486b23a4111b2d07ac3c5e894"
        id: "validation-resolution:sha256:ca10fe56cef12c92364bc229be814eaba29499e468420bdde5076f6c932f7c97:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:ca10fe56cef12c92364bc229be814eaba29499e468420bdde5076f6c932f7c97"
        occurred_at: "2026-11-01T14:36:23.383Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202611011211-VKPT8K"
        task_revision: 12
      -
        command_digest: "sha256:05ccb091f05c51655d95c8760d0cc2f105f8b12c7c6b5ce31737599f75100017"
        id: "kernel_work_item_rework_claim_required:sha256:7e8f515a3a9707ede6ef5a957fb920b0f29d8549d49e47e2711fb1b53edda0c7:sha256:c0292b38f32290a90f52b1be2d85aaed324fd433a1fbf10588ec3c9cc8bd3885:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:7e8f515a3a9707ede6ef5a957fb920b0f29d8549d49e47e2711fb1b53edda0c7:sha256:c0292b38f32290a90f52b1be2d85aaed324fd433a1fbf10588ec3c9cc8bd3885"
        occurred_at: "2026-11-01T14:36:29.038Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202611011211-VKPT8K"
        task_revision: 13
      -
        command_digest: "sha256:8d8c927d1fce41da809ed55f8f371c6860c6d8d1f9531c7dcf4a23ff725cd24b"
        id: "kernel_work_item_execution_required:sha256:d5c6d1bf242d7c3fc3e165ed9e0775c68c27565c38b49b2526071099020e5218:sha256:c0292b38f32290a90f52b1be2d85aaed324fd433a1fbf10588ec3c9cc8bd3885:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:d5c6d1bf242d7c3fc3e165ed9e0775c68c27565c38b49b2526071099020e5218:sha256:c0292b38f32290a90f52b1be2d85aaed324fd433a1fbf10588ec3c9cc8bd3885"
        occurred_at: "2026-11-01T14:36:32.929Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202611011211-VKPT8K"
        task_revision: 14
      -
        command_digest: "sha256:857c93900e94360fb70da1e011b534cd4bcadd6f467cbaf7f871891fa78c9981"
        id: "sha256:cca49502f089eb022fa64082b745c95718f6e6825e699996fc43cbdd36a82d63:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:cca49502f089eb022fa64082b745c95718f6e6825e699996fc43cbdd36a82d63"
        occurred_at: "2026-11-01T15:00:06.612Z"
        payload_digest: "sha256:0dee17456bb2c2db11e3bbdf36423b089c9680a33f0bc1f46dbca0515ff60d9b"
        task_id: "202611011211-VKPT8K"
        task_revision: 15
      -
        command_digest: "sha256:b2c53ee1eda3b149d006f4632f2fd1376fad04688aca7d0d6d978edc4a7c7209"
        id: "result:sha256:645e240eaf82ef1f29e70fbecd23dcee716ca1cfc17babe2b19dd46fcd660ff6:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:645e240eaf82ef1f29e70fbecd23dcee716ca1cfc17babe2b19dd46fcd660ff6"
        occurred_at: "2026-11-01T15:01:04.134Z"
        payload_digest: "sha256:65ed57f35d56cd4d5fe4a04e740d17ef559994be45d975af0038865264a2e057"
        task_id: "202611011211-VKPT8K"
        task_revision: 16
      -
        command_digest: "sha256:20a12626b468e2d031ccf5d1bd5dd09e3c1b8c2128f93f893a1e22d54bd5cb87"
        id: "kernel_work_item_inspection_required:sha256:5c5c940c5339adcacebf4d366328f754c310416445f19eea00d5c93d65fca10b:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:5c5c940c5339adcacebf4d366328f754c310416445f19eea00d5c93d65fca10b:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        occurred_at: "2026-11-01T15:02:56.109Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202611011211-VKPT8K"
        task_revision: 17
      -
        command_digest: "sha256:0c5ed5b489ef9ffe1ffb0806543798b1f1ef61c20bd2ded3283754714222cb0e"
        id: "validation:sha256:645e240eaf82ef1f29e70fbecd23dcee716ca1cfc17babe2b19dd46fcd660ff6:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:645e240eaf82ef1f29e70fbecd23dcee716ca1cfc17babe2b19dd46fcd660ff6"
        occurred_at: "2026-11-01T16:02:05.791Z"
        payload_digest: "sha256:34fb2c7df7c3ffe366b6efd5f6512645a1724b637b6d1619a9bdf5f199c6773d"
        task_id: "202611011211-VKPT8K"
        task_revision: 18
      -
        command_digest: "sha256:01c79c6b9d58cb4a5e582c2c948a2dacedc692dad2b8ea9d5112138f67debafd"
        id: "validation-resolution:sha256:0ea46e4b81108f466ac49401b0d72896503de1116fce0af06c899d5bb3848ff6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:0ea46e4b81108f466ac49401b0d72896503de1116fce0af06c899d5bb3848ff6"
        occurred_at: "2026-11-01T16:02:07.476Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202611011211-VKPT8K"
        task_revision: 19
      -
        command_digest: "sha256:01fe0fcb97aa872d12ccde5ff3c378c40dbcfa2ad5b07396a4ce9de5a16674da"
        id: "kernel_work_item_rework_claim_required:sha256:856181bb0efa63948489234358c7c5ee712b1fe31cb72701c4010f6d77280b9a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:856181bb0efa63948489234358c7c5ee712b1fe31cb72701c4010f6d77280b9a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        occurred_at: "2026-11-01T16:02:10.795Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202611011211-VKPT8K"
        task_revision: 20
      -
        command_digest: "sha256:9bd345b6f69d630bd5f88b5222bf2c56da21eb4c91301a3ead04c4f50da3374d"
        id: "kernel_work_item_execution_required:sha256:2578a1f45ad72a3c7f613e61b584278d52a993467005c1edca6a9e4eacbb6a02:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:2578a1f45ad72a3c7f613e61b584278d52a993467005c1edca6a9e4eacbb6a02:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        occurred_at: "2026-11-01T16:02:13.609Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202611011211-VKPT8K"
        task_revision: 21
      -
        command_digest: "sha256:6a43fef27512f228463475d7b83b4b9fd3433983247fc6f44a64648d582ed878"
        id: "result:sha256:e5187b39a6c8afeb67ace0bcebf350d501f6c2c9e9f7494dbe9a65c68d1dc8af:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:e5187b39a6c8afeb67ace0bcebf350d501f6c2c9e9f7494dbe9a65c68d1dc8af"
        occurred_at: "2026-11-02T05:47:28.066Z"
        payload_digest: "sha256:0909349b0439b554db4b4450982b8c538fcc513bb5154268100b33efa83f8996"
        task_id: "202611011211-VKPT8K"
        task_revision: 22
      -
        command_digest: "sha256:5703db67ca6fb1ca7d1c84806a9dc1e5e4a495332f1c02c2b2436b81b7548e41"
        id: "kernel_work_item_inspection_required:sha256:752fceeb1409d775cd583301f6869f00fb2fb8f3e8f4331d01d425c6f6a6f75a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:752fceeb1409d775cd583301f6869f00fb2fb8f3e8f4331d01d425c6f6a6f75a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        occurred_at: "2026-11-02T05:47:35.347Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202611011211-VKPT8K"
        task_revision: 23
      -
        command_digest: "sha256:964e7081c0e023d16e92a93a0b2bec9a6de88ae6e4d69b7b439f6d96275be981"
        id: "validation:sha256:e5187b39a6c8afeb67ace0bcebf350d501f6c2c9e9f7494dbe9a65c68d1dc8af:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:e5187b39a6c8afeb67ace0bcebf350d501f6c2c9e9f7494dbe9a65c68d1dc8af"
        occurred_at: "2026-11-02T08:29:37.036Z"
        payload_digest: "sha256:4878ab2391d59246cd05275fa5f1dec131ae6cd0229e806e9863b1686acfa772"
        task_id: "202611011211-VKPT8K"
        task_revision: 24
      -
        command_digest: "sha256:be0585ebc00163f1017de43ef1464b7eb796708669b892b3734ab55fbeba54ac"
        id: "validation-resolution:sha256:38ed4b85c853f4cc94f61aba2d9f10f6aa37c0e4be8243ba11479a5cd9be644a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:38ed4b85c853f4cc94f61aba2d9f10f6aa37c0e4be8243ba11479a5cd9be644a"
        occurred_at: "2026-11-02T08:29:39.072Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202611011211-VKPT8K"
        task_revision: 25
      -
        command_digest: "sha256:bf03029f09694fe09a4d0c53899d4fed4a33b7a329305292c375c5441a0daaca"
        id: "kernel_work_item_rework_claim_required:sha256:4a1eb7cbd6cdfce64d46c82902db7cd76a3add6c1362fcac3120027e5055b47a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:4a1eb7cbd6cdfce64d46c82902db7cd76a3add6c1362fcac3120027e5055b47a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        occurred_at: "2026-11-02T08:29:43.015Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202611011211-VKPT8K"
        task_revision: 26
      -
        command_digest: "sha256:4eb4a4ac62bb487f9cb735ea76e671f29b6dd1beb6ab040c7b9fb3c8289f7135"
        id: "kernel_work_item_execution_required:sha256:b66a60c97e524d87cbc7dc9609f10b0f3b6d6d1952b8c1c8e19d62ac5865cc1a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b66a60c97e524d87cbc7dc9609f10b0f3b6d6d1952b8c1c8e19d62ac5865cc1a:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        occurred_at: "2026-11-02T08:29:45.954Z"
        payload_digest: "sha256:a6b9393b728eff7d50e5310deb6401fea9252fbd392b0fedbc3fb37467df9c63"
        task_id: "202611011211-VKPT8K"
        task_revision: 27
      -
        command_digest: "sha256:8ffff14d5e5cc7cabb4afd3a1c7f1bf0e49a86922382a2d82bdba3e659b04c35"
        id: "result:sha256:826b5ef23af5d9c9b60aa569e1d9c2e056ad17c69c57d5633f79af28f1e09e00:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:826b5ef23af5d9c9b60aa569e1d9c2e056ad17c69c57d5633f79af28f1e09e00"
        occurred_at: "2026-11-02T08:44:38.405Z"
        payload_digest: "sha256:ea8e8497ad55493a3f28b660d9b26e53c72ebf836c793a07a5b16e9ddcbd6e4d"
        task_id: "202611011211-VKPT8K"
        task_revision: 28
      -
        command_digest: "sha256:a76509630810a98ed58b296e763d24adeb9a7af8d75d88c6d5fc728e364b959a"
        id: "kernel_work_item_inspection_required:sha256:5bf5849c2c7247d51790cfd332554d49b09b185a414e1383fdc48aa8f153e333:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:5bf5849c2c7247d51790cfd332554d49b09b185a414e1383fdc48aa8f153e333:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        occurred_at: "2026-11-02T08:44:40.357Z"
        payload_digest: "sha256:be14b62c42657d443241819bd50e2af1d1abb7355782ab6d19d2d7f55871def7"
        task_id: "202611011211-VKPT8K"
        task_revision: 29
      -
        command_digest: "sha256:06ada0f0e5ca9e173bc6f1de53e359492bc8a0cf2bf139e0a5e432e2f95ca47c"
        id: "validation:sha256:1539da59fe4f67b8c5bfca1b84c50915e0fa4fab8949fec764f0d564b31dc64e:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:1539da59fe4f67b8c5bfca1b84c50915e0fa4fab8949fec764f0d564b31dc64e"
        occurred_at: "2026-11-02T10:41:47.123Z"
        payload_digest: "sha256:5690a2659cf380dde5dede34186eb58fae1a33ea1139477c9cf71c041a1ce7b4"
        task_id: "202611011211-VKPT8K"
        task_revision: 30
      -
        command_digest: "sha256:123e4344394c29b93ef67efd7c6838163344606244362020f8dd76e92ce0a2b7"
        id: "validation-resolution:sha256:60f9d06fcc682bc4965a8d3d3a4439d80feb74c402991197bbac84b380a3f012:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:60f9d06fcc682bc4965a8d3d3a4439d80feb74c402991197bbac84b380a3f012"
        occurred_at: "2026-11-02T10:41:48.445Z"
        payload_digest: "sha256:cac95643937fd25416f45c4356b26d3f20cb571c4937d94e0404190a032538aa"
        task_id: "202611011211-VKPT8K"
        task_revision: 31
      -
        command_digest: "sha256:633b58bf86deacde644763a203261f530b9774f03a0fb9907eb8f96b220260c3"
        id: "final-validation:sha256:57d57d503193ea316be9af555ea8cf78e6dc0e71ed0e64be1d2a7916b83099fb:31:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:57d57d503193ea316be9af555ea8cf78e6dc0e71ed0e64be1d2a7916b83099fb:31"
        occurred_at: "2026-11-02T11:47:09.221Z"
        payload_digest: "sha256:d41bafb6278773b05efb297d171a13b35dcef2910578d83d052ceb2aa1801de1"
        task_id: "202611011211-VKPT8K"
        task_revision: 32
      -
        command_digest: "sha256:95d5818ebfa90fa0e4f0a8208aaf9ab4801e38876456e99d842aed8a38efb2fe"
        id: "amend:sha256:f12d546663a6097f15bc296a9bdaba0420b994e2741ecc8747aad08d2a7ff990:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:f12d546663a6097f15bc296a9bdaba0420b994e2741ecc8747aad08d2a7ff990"
        occurred_at: "2026-11-02T11:56:55.722Z"
        payload_digest: "sha256:6080c23fc0e8e8eb99a101fb7d26d4b07486a390c7f0ba5c62094812df646d33"
        task_id: "202611011211-VKPT8K"
        task_revision: 33
      -
        command_digest: "sha256:f41b08f24b6252562981e93a768c9240d8e9da43c89107dca6ed4b2a9bcfc01d"
        id: "sha256:faafa4c887ff39fc258f32e40dd1defccf50ac6807be36b8a61b3b3e98ab4174:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:faafa4c887ff39fc258f32e40dd1defccf50ac6807be36b8a61b3b3e98ab4174"
        occurred_at: "2026-11-02T11:57:00.987Z"
        payload_digest: "sha256:b8d8ca47c0fa96b653190f50a748e7272ab3204b0b0588025e57d1bcf7c4374b"
        task_id: "202611011211-VKPT8K"
        task_revision: 34
      -
        command_digest: "sha256:80f61a76861e05f8cbc244746711e89a29f42b416401387b801d383ff0e35389"
        id: "kernel_work_item_claim_required:sha256:73bd4412903c5ca8c0cbe7f6728cbfce9ec2cc63aaf1681bd77dfae7382cebe5:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:73bd4412903c5ca8c0cbe7f6728cbfce9ec2cc63aaf1681bd77dfae7382cebe5:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        occurred_at: "2026-11-02T12:03:13.756Z"
        payload_digest: "sha256:83321e093d0911e15803219e1bae99ce3af4c42e0b036b7c46cb3b59f6111cef"
        task_id: "202611011211-VKPT8K"
        task_revision: 35
      -
        command_digest: "sha256:d98f2d9cc0cf6a8e596fbf4faadeeca3b435af824f401d20fba5f000bf2e86fb"
        id: "kernel_work_item_execution_required:sha256:522204d5288b20f34eda5ef746bb9e79fe7001041245425c5ce91e9d53118c33:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:522204d5288b20f34eda5ef746bb9e79fe7001041245425c5ce91e9d53118c33:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        occurred_at: "2026-11-02T12:03:26.418Z"
        payload_digest: "sha256:2084d650d60628b69a6d243d48c76aa0d22b9d65927a8ff32ce6527ccf564ad9"
        task_id: "202611011211-VKPT8K"
        task_revision: 36
      -
        command_digest: "sha256:2852ff1249720e7d38278b4ef145fd2be43cd051907af229f2c7bb0359bac7b1"
        id: "result:sha256:4a327f9a38850e4c56c840c28af94570aa9902863f05d3209ad8897f51432b03:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:4a327f9a38850e4c56c840c28af94570aa9902863f05d3209ad8897f51432b03"
        occurred_at: "2026-11-02T12:43:34.539Z"
        payload_digest: "sha256:f6a87bb6fd8b708e15e86afa1035432f3822c2278155cd294721be831cb24a4b"
        task_id: "202611011211-VKPT8K"
        task_revision: 37
      -
        command_digest: "sha256:189c8468fbb439b17de577f2fa850e27dc2b6287106a330ac18abcfc9a929850"
        id: "kernel_work_item_inspection_required:sha256:0f8a6e81a51d3e59f8676dd60821e01dde93b8d02094c42b6ea694e0f9de8009:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:0f8a6e81a51d3e59f8676dd60821e01dde93b8d02094c42b6ea694e0f9de8009:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        occurred_at: "2026-11-02T12:43:36.684Z"
        payload_digest: "sha256:3d6e5aa65da47bbe339aa7dc612be0526a101e886703c7d258cbf804ec6dc165"
        task_id: "202611011211-VKPT8K"
        task_revision: 38
      -
        command_digest: "sha256:f7b25ea76bfaeb8ff0e9c4c2a1473842775e9fa8bf35b185ce33cf71bce9e101"
        id: "validation:sha256:a7cadee48e962cde96d7345ccf7daa213f74f9a015cc4f1538ac6784adfc1cfc:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:a7cadee48e962cde96d7345ccf7daa213f74f9a015cc4f1538ac6784adfc1cfc"
        occurred_at: "2026-11-02T17:04:04.054Z"
        payload_digest: "sha256:cf390b165224978923ee3202be82e64980be85ffb4c0243f0bdde7f76e8a99b2"
        task_id: "202611011211-VKPT8K"
        task_revision: 39
      -
        command_digest: "sha256:833028b2bd7210f0ec2ae473a86bb0e7f5fbf2d4b010cc4a18cc39ef19838e2a"
        id: "validation-resolution:sha256:135a3486db34e1ca7064fe79352ec229ad17ca03a28c0e55d60d849681a7a431:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:135a3486db34e1ca7064fe79352ec229ad17ca03a28c0e55d60d849681a7a431"
        occurred_at: "2026-11-02T17:04:05.461Z"
        payload_digest: "sha256:8bb320edc47fdc8431f0d1f38079c0446516b64de9d5a93e99a8068d335efe7e"
        task_id: "202611011211-VKPT8K"
        task_revision: 40
      -
        command_digest: "sha256:0ca2861b045c458828644b20f78c461940f9a7a368cfb4a4bef46f90c3332309"
        id: "final-validation:sha256:2a699a8ed3fb0a262c621fdd4eab8c272c8cb849f2c280ba64c706a83158ca8e:40:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:2a699a8ed3fb0a262c621fdd4eab8c272c8cb849f2c280ba64c706a83158ca8e:40"
        occurred_at: "2026-11-02T17:27:23.041Z"
        payload_digest: "sha256:0d6dbc590a3aedc45986e5e494ee2e9265c0bb1fd8c955817593ae40bb0e99ff"
        task_id: "202611011211-VKPT8K"
        task_revision: 41
      -
        command_digest: "sha256:9a2a59f38850c2b4ec0800e15b7210180ad7e4553bfd7b17acc6183824f3c8fc"
        id: "kernel_task_completion_required:sha256:7caff1a08d0f7dee428b2671ac694b9443132d83a8d60468af44ac79a535a120:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:7caff1a08d0f7dee428b2671ac694b9443132d83a8d60468af44ac79a535a120:sha256:ba3c20bd8161a8415efbbc4e220b6b2cbb92b2cbb4e777e0a2cf9a6ab766ba86"
        occurred_at: "2026-11-02T17:28:38.112Z"
        payload_digest: "sha256:efc14d672416d83058d2fee3d83308db5cfd2c79e5c048b47673b36d0bfe2f1f"
        task_id: "202611011211-VKPT8K"
        task_revision: 42
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Publish exact native quarantine artifacts without resuming historical Tasks

Implement the explicitly USER-approved seven-file native quarantine publication admission. Reuse one shared read-only proof classifier in canonical dirty-baseline adoption and branch PR foreign-task ownership. Require approved exact per-foreignTask directory scope and security-boundary/repository-write authority. Bind source bytes to the exact Git comparison base, logical repository/backend identity, genuine native revision-split mapping, exact quarantineAfterimage and exact content-addressed raw source backup. Admit only README and that backup. Refuse arbitrary broad scope, forged or altered marker/body/backup, wrong base/source/repository, extra/deleted/renamed/linked/missing/unstable foreign artifacts and unproven history. Preserve existing Task/batch/import/cleanup rules. Historical Tasks stay BLOCKED; never run old WorkItems or assign DONE/PASS/CANCELLED or classify unknown effects. Verify actual byte/Git/coordinator/publication integration and negative cases, full mandatory CI and independent EVALUATOR, protected canonical PR/merge and current CLI qualification before actual Factory publication. Preserve all existing branches, worktrees, archives, runtime data, credentials and guards. No new public CLI/schema/dependencies or runtime effects.

## Scope

- In scope: Implement the explicitly USER-approved seven-file native quarantine publication admission. Reuse one shared read-only proof classifier in canonical dirty-baseline adoption and branch PR foreign-task ownership. Require approved exact per-foreignTask directory scope and security-boundary/repository-write authority. Bind source bytes to the exact Git comparison base, logical repository/backend identity, genuine native revision-split mapping, exact quarantineAfterimage and exact content-addressed raw source backup. Admit only README and that backup. Refuse arbitrary broad scope, forged or altered marker/body/backup, wrong base/source/repository, extra/deleted/renamed/linked/missing/unstable foreign artifacts and unproven history. Preserve existing Task/batch/import/cleanup rules. Historical Tasks stay BLOCKED; never run old WorkItems or assign DONE/PASS/CANCELLED or classify unknown effects. Verify actual byte/Git/coordinator/publication integration and negative cases, full mandatory CI and independent EVALUATOR, protected canonical PR/merge and current CLI qualification before actual Factory publication. Preserve all existing branches, worktrees, archives, runtime data, credentials and guards. No new public CLI/schema/dependencies or runtime effects.
- Out of scope: unrelated refactors not required for "Publish exact native quarantine artifacts without resuming historical Tasks".

## Plan

1. Execute approved WorkItem native-quarantine-artifact-publication.
2. Execute approved WorkItem final-correction-57d57d503193.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-11-02T17:27:23.948Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2b5ce73659a020a9c5c38ae5befff4302742ddd3fd6e2718fddb34c16c052c5a, input_digest=sha256:6b2208f016504143f01996246ecc1f689c5a21e1b1f6d990b30ef576ee41f835

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-1
Scope: branch_pr task 202611011211-VKPT8K Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts
Result: pass
Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-2
Scope: branch_pr task 202611011211-VKPT8K Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-1
Scope: branch_pr task 202611011211-VKPT8K Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts
Result: pass
Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-2
Scope: branch_pr task 202611011211-VKPT8K Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-1
Scope: branch_pr task 202611011211-VKPT8K Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-1
Scope: branch_pr task 202611011211-VKPT8K Verification Contract check real_e2e (1/2)

Check: real_e2e
Command: bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts
Result: pass
Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-2
Scope: branch_pr task 202611011211-VKPT8K Verification Contract check real_e2e (2/2)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-1
Scope: branch_pr task 202611011211-VKPT8K Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: bun run test:fast packages/agentplane/src/commands/shared/native-quarantine-artifact-proof.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator.test.ts packages/agentplane/src/commands/task/kernel-repository-coordinator-quarantine.test.ts packages/agentplane/src/commands/pr/internal/branch-task-artifact-ownership.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts
Result: pass
Evidence: .agentplane/tasks/202611011211-VKPT8K/supervision/declared-checks.json#check-2
Scope: branch_pr task 202611011211-VKPT8K Verification Contract check task_outcome (2/2)

NativeTaskIdentityRef:
- plan_digest: sha256:f12d546663a6097f15bc296a9bdaba0420b994e2741ecc8747aad08d2a7ff990
- policy_digest: sha256:987929940f3820e61292591e8ce12a537c18ae14094a524cdad5978e41cebd01
- capability_digest: sha256:2582d02cc390d6b5ca7e9401744ee758a81fafe76f29969c97146b6b0b921110
- checks_digest: sha256:9386559caf72ebcc723dbd2e8faf134ee002f3d4418915afcf5a6efca92a2c71
- identity_digest: sha256:8ad91f922c2e13bbbacf5290db9ad0194bf45be124b1440c70f5fd4687480ae4

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202611011211-VKPT8K
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
- Completeness: `0/0` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:207c8944461836ad8943cf9083a79304d8a74c29f970c3f408503766581a80e6`
- Unavailable reason: `no_supervised_agent_runs`
- Updated at: `2026-11-02T17:31:02.477Z`
