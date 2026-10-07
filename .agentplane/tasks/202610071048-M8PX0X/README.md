---
id: "202610071048-M8PX0X"
title: "Give native release CI verification its bounded release timeout"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
revision: 19
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release-0.7.13"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bun run format:check"
  - "bun x vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --maxWorkers=2"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-10-07T11:10:05.516Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-07T12:00:49.984Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-07T11:10:05.516Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "35aca2115fb1a781725e18cc6bd93de38d8af55d"
  review_identity_digest: "sha256:f62e97e7027c5dcb82e8ec5d129e7fc0e0de9f5a87226659cb274a0e83f2ad0e"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610071048-M8PX0X/8e7d17522f98a0920f77885160b1a73576931ea389ff9900f95c5be126e64b8d/quality-report.json"
  findings:
    - "Validated fresh manifest 98e0db7d1a9a97b0fac886b1b3c5d84d19342783fcbf6fcdfac110d05f207c6e and all 13 required blocks. Accepted result, repository evidence, native validation b153c01df63d5ce37534eeef347b8cbe27348fe6ccfdd64cd9190512f16b8734 and report 281293648b6094ccd6c689a7b1b4f28776e05a9fb05e709bb2527156bc4c4e38 digests verified. Exact result schema 42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc verified."
    - "Both current and committed source blobs match frozen inventory at 35aca2115fb1a781725e18cc6bd93de38d8af55d: production 88a10faa555bba0855e70ae56e8416393ee60f3157c9a0b25a5811166cad9e45; qualification tests ae3880d57ff2914c15ec7923453b45ef8c029688c71ee6c69cb321905321b5bc."
    - "Production diff adds exactly one release:ci-check entry at 150 * 60000. Default 30-minute and existing script budgets are unchanged. Explicit additional timeout precedence, minimum duplicate timeout, sequence deadline, process termination and evidence admission logic remain unchanged."
    - "Three new parameterized cases execute runDirectTaskVerification and inspect the captured command, argv, cwd, invocation count and timeout: 9000000ms for declared release:ci-check, 1000ms explicit override, 1800000ms unrelated release:check. Existing assertions remain intact."
    - "Native validation independently records all three assigned checks passed, including 46 tests across two files, formatting and diff. Prior author logs were retained with explicit provenance and their hashes verified; they are distinct from fresh native checks. No checks were rerun by this evaluator."
token_usage:
  agent_runs: 4
  cached_input_observed_agent_runs: 0
  cached_input_tokens: null
  input_tokens: null
  journal_digest: "sha256:f33e91d2915199aa2b65f068fa84eefac2c816aadb55747297ad2d3ad26e4d9b"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "external_host_turn_unallocatable"
  updated_at: "2026-10-07T12:19:28.859Z"
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
      - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
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
      - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
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
        id: "recorded-check-17"
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
          - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
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
      digest: "sha256:5486c4e17d39c0b846ae33e246fbd9ccaa13cdd15abeacdf3face72b09720fb3"
      escalation_reasons:
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
          - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
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
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "55b02e7fa77680af98935b24f5ddd3f42887a9df"
  message: "🧩 M8PX0X task: persist published PR identity"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "verify"
    at: "2026-10-07T12:00:49.984Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
  -
    type: "status"
    at: "2026-10-07T12:19:28.859Z"
    author: "ORCHESTRATOR"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "55b02e7fa77680af98935b24f5ddd3f42887a9df"
doc_version: 3
doc_updated_at: "2026-10-07T12:19:28.859Z"
doc_updated_by: "ORCHESTRATOR"
description: "Release 0.7.13 candidate qualification reached release:ci-check extras after contract, clone and package installation passed, but native direct verification killed its parent at the default 30-minute deadline. The bounded release suite needs the existing 150-minute release budget. Add only release:ci-check to the script-specific timeout map, matching release:prepublish. Preserve all commands, assertions, default timeout for unrelated scripts, and explicit timeout_ms precedence. Add focused tests of the actual verifier invocation for the declared command, a shorter explicit timeout, and unrelated command default. Do not bypass checks, import manual PASS evidence, increase global timeouts, or change process lifecycle behavior. Native evaluator, full verification and branch PR integration required; candidate is requalified afterward."
sections:
  Summary: |-
    Give native release CI verification its bounded release timeout

    Release 0.7.13 candidate qualification reached release:ci-check extras after contract, clone and package installation passed, but native direct verification killed its parent at the default 30-minute deadline. The bounded release suite needs the existing 150-minute release budget. Add only release:ci-check to the script-specific timeout map, matching release:prepublish. Preserve all commands, assertions, default timeout for unrelated scripts, and explicit timeout_ms precedence. Add focused tests of the actual verifier invocation for the declared command, a shorter explicit timeout, and unrelated command default. Do not bypass checks, import manual PASS evidence, increase global timeouts, or change process lifecycle behavior. Native evaluator, full verification and branch PR integration required; candidate is requalified afterward.
  Scope: |-
    - In scope: Release 0.7.13 candidate qualification reached release:ci-check extras after contract, clone and package installation passed, but native direct verification killed its parent at the default 30-minute deadline. The bounded release suite needs the existing 150-minute release budget. Add only release:ci-check to the script-specific timeout map, matching release:prepublish. Preserve all commands, assertions, default timeout for unrelated scripts, and explicit timeout_ms precedence. Add focused tests of the actual verifier invocation for the declared command, a shorter explicit timeout, and unrelated command default. Do not bypass checks, import manual PASS evidence, increase global timeouts, or change process lifecycle behavior. Native evaluator, full verification and branch PR integration required; candidate is requalified afterward.
    - Out of scope: unrelated refactors not required for "Give native release CI verification its bounded release timeout".
  Plan: "1. Execute approved WorkItem bound-release-ci-verification-timeout."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun x vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --maxWorkers=2`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-07T12:00:49.984Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:69360789831a5c3562cc2f7efef5913b49e28346b2707074b1bd045c2265e6f5, input_digest=sha256:c59221179ebef08309568d2a0c81f93b42f955aa9fec4120a85a2fb90d53fe6f

    Details:

    Check: affected_unit_integration
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bun x vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bun x vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check full_regression

    Check: real_e2e
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check real_e2e (1/4)

    Check: real_e2e
    Command: bun x vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check real_e2e (2/4)

    Check: real_e2e
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check real_e2e (3/4)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check real_e2e (4/4)

    Check: task_outcome
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun x vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610071048-M8PX0X Verification Contract check task_outcome (4/4)

    NativeTaskIdentityRef:
    - plan_digest: sha256:282ee0c206dd3a40eb62d6c55bfbb4d38d2fffebb480f02a4e34f211d6f9bd53
    - policy_digest: sha256:26cbf60e57ff6118b5cdcfaa5b7bbd07e2f7c8f2e02112dc5e98fe4437e2fe64
    - capability_digest: sha256:9183f8c09d398df216467456351aac1e287d23ada24c9ed32b1c508fc01d973d
    - checks_digest: sha256:325f15a9d81e17f91652f43d6bfcee14f447d74f1facc4510486ed38c27b94fb
    - identity_digest: sha256:29b6df948b7d57965ba484aa7e76c7bf7e491e2ed1553e9485bd2557beea32fc

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
    digest: "sha256:20f2c580ff4676673b3a219022f200e4081dcaa669b76ca23c0fc4dacff75060"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610071048-M8PX0X/8e7d17522f98a0920f77885160b1a73576931ea389ff9900f95c5be126e64b8d/quality-report.json"
    findings:
      - "Validated fresh manifest 98e0db7d1a9a97b0fac886b1b3c5d84d19342783fcbf6fcdfac110d05f207c6e and all 13 required blocks. Accepted result, repository evidence, native validation b153c01df63d5ce37534eeef347b8cbe27348fe6ccfdd64cd9190512f16b8734 and report 281293648b6094ccd6c689a7b1b4f28776e05a9fb05e709bb2527156bc4c4e38 digests verified. Exact result schema 42b9e36673a3cc9bf23e38c4d451a9668ffb475c35f74aeb00f272aa861dd9cc verified."
      - "Both current and committed source blobs match frozen inventory at 35aca2115fb1a781725e18cc6bd93de38d8af55d: production 88a10faa555bba0855e70ae56e8416393ee60f3157c9a0b25a5811166cad9e45; qualification tests ae3880d57ff2914c15ec7923453b45ef8c029688c71ee6c69cb321905321b5bc."
      - "Production diff adds exactly one release:ci-check entry at 150 * 60000. Default 30-minute and existing script budgets are unchanged. Explicit additional timeout precedence, minimum duplicate timeout, sequence deadline, process termination and evidence admission logic remain unchanged."
      - "Three new parameterized cases execute runDirectTaskVerification and inspect the captured command, argv, cwd, invocation count and timeout: 9000000ms for declared release:ci-check, 1000ms explicit override, 1800000ms unrelated release:check. Existing assertions remain intact."
      - "Native validation independently records all three assigned checks passed, including 46 tests across two files, formatting and diff. Prior author logs were retained with explicit provenance and their hashes verified; they are distinct from fresh native checks. No checks were rerun by this evaluator."
    implementation_commit: "35aca2115fb1a781725e18cc6bd93de38d8af55d"
    implementation_tree: "86ad6def0112577632efa00f49d40876fbdda8b6"
    projected_at: "2026-10-07T11:10:05.516Z"
    review_identity_digest: "sha256:f62e97e7027c5dcb82e8ec5d129e7fc0e0de9f5a87226659cb274a0e83f2ad0e"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:4e802c28762195096a83cc7df18c9cbda7dcc40bc67a3e6a6defbfa043851557"
    work_order_id: "sha256:031c562311f79bce655be9efc96977055e1fd67f5154c31c9fbb32973640f5cc"
  implementation_commit:
    hash: "35aca2115fb1a781725e18cc6bd93de38d8af55d"
    message: "🚧 M8PX0X task: apply canonical agent result"
  task_execution_context:
    base_ref: "main"
    base_sha: "c6c773f6c2a9bf830b544327fd1369f275ecd5c3"
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
            digest: "sha256:62650d258731c34930a1dcbd3b40c38a8178580c1633fa42ad029efa1ab1b4b7"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:282ee0c206dd3a40eb62d6c55bfbb4d38d2fffebb480f02a4e34f211d6f9bd53"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:e76a5eb10fdf7f47ad04c231eb19fc794ffdcb81aaae253a0e5c1cb0419e5edc"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:79ba04aef9e1897d57442f4a1de4423dab72adcf41049f1425a5ca5980f58c65"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
            task_id: "202610071048-M8PX0X"
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
            digest: "sha256:f8c9fa6ed06ba8f2a5a12162899180ce0bde5b6e19eab4cef1477c66176d5751"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:282ee0c206dd3a40eb62d6c55bfbb4d38d2fffebb480f02a4e34f211d6f9bd53"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:e76a5eb10fdf7f47ad04c231eb19fc794ffdcb81aaae253a0e5c1cb0419e5edc"
              kind: "USER"
              parent_authority_digest: "sha256:62650d258731c34930a1dcbd3b40c38a8178580c1633fa42ad029efa1ab1b4b7"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a28a585efb5a8dd2cbcce8fd1f854fb0d47986fcb1c2326d90cff9bfad88e64c"
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
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610071048-M8PX0X"
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
            evidence_digest: "sha256:ee1559b60ba47da53e5e33190da1a160710053d6bdf4da6afdc5be5e4d0910c9"
            kind: "authority_delta"
            previous_fingerprint: "sha256:79ba04aef9e1897d57442f4a1de4423dab72adcf41049f1425a5ca5980f58c65"
            repository_evidence_digest: "sha256:2aa6a0ce23929f876ab37022978f2e42327ca19f3233997d4c5cf42150d85229"
            request_digest: "sha256:3922a4406743eae4011cb4d05432a3d3d72e42338fc6ac7a1991fef69b4b1f06"
            request_task_revision: 5
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:54a101ad9e63c4848406193679cc6ce00f0f72e223a9ef7dba7bbf697c3ca09e"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:282ee0c206dd3a40eb62d6c55bfbb4d38d2fffebb480f02a4e34f211d6f9bd53"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:e76a5eb10fdf7f47ad04c231eb19fc794ffdcb81aaae253a0e5c1cb0419e5edc"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:f8c9fa6ed06ba8f2a5a12162899180ce0bde5b6e19eab4cef1477c66176d5751"
            repository_effects:
              - "documentation"
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50"
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
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/tsup.config.bundled_gb1x1suwt6t.mjs"
            task_id: "202610071048-M8PX0X"
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
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
            evidence_digest: "sha256:022ea0549365ab73b3bc59a701bbac9811ca8ac3205089744046fc9cb97d8fa0"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:a28a585efb5a8dd2cbcce8fd1f854fb0d47986fcb1c2326d90cff9bfad88e64c"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:e76a5eb10fdf7f47ad04c231eb19fc794ffdcb81aaae253a0e5c1cb0419e5edc"
        digest: "sha256:282ee0c206dd3a40eb62d6c55bfbb4d38d2fffebb480f02a4e34f211d6f9bd53"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:39e279df6eb6fd578e62cc7edd21bd2eca1d676ba9db7ec4e55e0db06429eb5d"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "release_metadata"
                - "repository_write"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
            expected_outputs:
              - "release-ci-timeout-evidence"
            id: "bound-release-ci-verification-timeout"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:4e802c28762195096a83cc7df18c9cbda7dcc40bc67a3e6a6defbfa043851557"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:e1f518ffcef694446f9c40c8b2c65efc085722b9d1c8dc260608f77c08fb4e89"
          environment_digest: "sha256:82016040096f79101efc7e7729d9ac6d634755778da3f9e90827ef35f2b6acb5"
          implementation_identity: "sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50"
          toolchain_digest: "sha256:313691ebe4d1a918e9105a7486ba41231b9353e221da58a8880056db9f5363ba"
        observed_at: "2026-10-07T11:10:37.970Z"
        status: "PASSED"
      id: "202610071048-M8PX0X"
      intent_digest: "sha256:66c6830253120a151aedd5c803965c663c7be3559b5a116be20a3751597082a1"
      migration_receipts: []
      mutation_receipts:
        capture:202610071048-M8PX0X:
          after_revision: 1
          aggregate_digest: "sha256:b2ab4eb4630879af11277550c4306b58ecc00955a903aa3db3472c0b0fc84eb4"
          before_revision: 0
          command_digest: "sha256:71147156c6cb9bef615c589b497f679123dac56e84a0585483a1456120037424"
          effect_ids: []
          event_digests:
            - "sha256:851b3bfb96227d0f68704503e1425063d22384a4946412f8d987e5db72372c26"
          mutation_id: "capture:202610071048-M8PX0X"
        final-validation:sha256:4e802c28762195096a83cc7df18c9cbda7dcc40bc67a3e6a6defbfa043851557:12:
          after_revision: 13
          aggregate_digest: "sha256:843c096b40123b6053ceec4c3f0ae1c70910114ea72bcefae296b100f5373952"
          before_revision: 12
          command_digest: "sha256:24a51cac27355cd9be057343412cb65b40dffe7b6c065944a804ad9f4a15fe2a"
          effect_ids: []
          event_digests:
            - "sha256:56f9d8278b242b9f8e90d65b22dc1e959904308eafdafe74545effe18abe17fd"
          mutation_id: "final-validation:sha256:4e802c28762195096a83cc7df18c9cbda7dcc40bc67a3e6a6defbfa043851557:12"
        kernel_task_completion_required:sha256:6017490213df6446bd7a208fe96e3683091a16f3736cad9b44ea23a35bc1a4d1:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50:
          after_revision: 14
          aggregate_digest: "sha256:76054c707bd0448093f9e2811531d83a5a2169d02da43610f6e68e1e8ef0040a"
          before_revision: 13
          command_digest: "sha256:28a2a0b827286f12c9dc98d57f3f5b210ca80a783d63c987042ace6c0c116c58"
          effect_ids: []
          event_digests:
            - "sha256:92d96692c9664a9721bb59497578a5b77605eaa564113139814cd01520c49309"
          mutation_id: "kernel_task_completion_required:sha256:6017490213df6446bd7a208fe96e3683091a16f3736cad9b44ea23a35bc1a4d1:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50"
        kernel_work_item_claim_required:sha256:35211320c2843e5ca02a6a39d179aa07a17d138212e6c5b2172c213ee4014032:sha256:79ba04aef9e1897d57442f4a1de4423dab72adcf41049f1425a5ca5980f58c65:
          after_revision: 5
          aggregate_digest: "sha256:e0ef3bfa802811dc0173585d0993e6f84ce25506d8bc5de58322e30d9061b07b"
          before_revision: 4
          command_digest: "sha256:cc1615a59ff654a1bf6d1d76d955e80953a1812271f3ed16b092c6a90f7bcf6b"
          effect_ids: []
          event_digests:
            - "sha256:b8f7c154b39ae334c83fc2fe002554ee0e514f2315b3f51a308a5ec5ae123d27"
          mutation_id: "kernel_work_item_claim_required:sha256:35211320c2843e5ca02a6a39d179aa07a17d138212e6c5b2172c213ee4014032:sha256:79ba04aef9e1897d57442f4a1de4423dab72adcf41049f1425a5ca5980f58c65"
        kernel_work_item_execution_required:sha256:96585f1ab600c893bf7b2d6c729a81d27302007768226396007a9a1e0bb1ce7e:sha256:a28a585efb5a8dd2cbcce8fd1f854fb0d47986fcb1c2326d90cff9bfad88e64c:
          after_revision: 7
          aggregate_digest: "sha256:47077397361c826f6f11a1d63e3a32bc80ec19124503858a1e8184a9a2c6d4b3"
          before_revision: 6
          command_digest: "sha256:4bd4304f479a5ebaa3c94f5a2f19336c5b1cd2f95d7ba95e51f5bdcbc7051e66"
          effect_ids: []
          event_digests:
            - "sha256:0cebfcadca6c22a4cd3372ac16fbf104bf20461e1fe5a877543f1cebc54d8f85"
          mutation_id: "kernel_work_item_execution_required:sha256:96585f1ab600c893bf7b2d6c729a81d27302007768226396007a9a1e0bb1ce7e:sha256:a28a585efb5a8dd2cbcce8fd1f854fb0d47986fcb1c2326d90cff9bfad88e64c"
        kernel_work_item_inspection_required:sha256:2c32c61bc4f1ef176202f25edf15dde2aed2bbc374621d349bb12ec2699e1011:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50:
          after_revision: 10
          aggregate_digest: "sha256:de92dc5818542fb845db86148827997105337dbcefdeca31d053be577f4805f9"
          before_revision: 9
          command_digest: "sha256:c748c578f44b71d7ae4778fbc3fd7cf271fc18871ee5d942dc1d030525fee1bd"
          effect_ids: []
          event_digests:
            - "sha256:290915ff228f70133185d4e52aef00719566f52cf3ae9a8bddf4604446c65f62"
          mutation_id: "kernel_work_item_inspection_required:sha256:2c32c61bc4f1ef176202f25edf15dde2aed2bbc374621d349bb12ec2699e1011:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50"
        kernel_work_item_materialization_required:sha256:50ce1553a61a1b87c59bbdb6df68f46400f6a722b3ed001f5dc4c23a8f60a50a:sha256:79ba04aef9e1897d57442f4a1de4423dab72adcf41049f1425a5ca5980f58c65:
          after_revision: 4
          aggregate_digest: "sha256:75388d430dd306b853817baa61a5f5d394a515c71a6052237eabc549b9d6471d"
          before_revision: 3
          command_digest: "sha256:2889c74009bb41a449353c7b9d13b5d7cea3abb0d7bde6c27d18c98f0ab5c20f"
          effect_ids: []
          event_digests:
            - "sha256:80795fe3b0ea054055d0be56b64b9a638205c585d4c8fdef5c7a456f1bab97fc"
          mutation_id: "kernel_work_item_materialization_required:sha256:50ce1553a61a1b87c59bbdb6df68f46400f6a722b3ed001f5dc4c23a8f60a50a:sha256:79ba04aef9e1897d57442f4a1de4423dab72adcf41049f1425a5ca5980f58c65"
        result:sha256:031c562311f79bce655be9efc96977055e1fd67f5154c31c9fbb32973640f5cc:
          after_revision: 9
          aggregate_digest: "sha256:eba2691470a5718fc099ba9539611af19195de85dcf23306035d4899fad76256"
          before_revision: 8
          command_digest: "sha256:8b81e21f2fd039da70c5a04b0011a7c0ab1137dbc37e545af97be8280b2a82a3"
          effect_ids: []
          event_digests:
            - "sha256:99d91ad497d2a203ed68a0ed84ff1c07dcc707c0cc62d174dafc1a28dd051cb0"
          mutation_id: "result:sha256:031c562311f79bce655be9efc96977055e1fd67f5154c31c9fbb32973640f5cc"
        result:sha256:82ba7836afc2c8bc4b15a415679e68415aac19808f27fcd73d35a53ef510cb1f:
          after_revision: 2
          aggregate_digest: "sha256:697345d0cd92ec563d6151d9c6b7c449b325ff33f6d8f128217a84e8cb107705"
          before_revision: 1
          command_digest: "sha256:e98b708cad38da259ee2ec6702e6c6fae0a056f52dbdb5b2db23f52bda79a0b6"
          effect_ids: []
          event_digests:
            - "sha256:bf8204a51b3394d6508de86aded040730bd91714e1a3526f754bde5a3e72cb70"
          mutation_id: "result:sha256:82ba7836afc2c8bc4b15a415679e68415aac19808f27fcd73d35a53ef510cb1f"
        sha256:562e1d52ddb176bba38bdedf196eab4a6c21a7c8ff9dad120b31fdb3c1ddf48e:
          after_revision: 6
          aggregate_digest: "sha256:3258474bb64aa1e658ef9b7e7c4a0d1852c476790199e46130e63021a477644d"
          before_revision: 5
          command_digest: "sha256:01ac031386980df6fa9868f9087d3ef95faa46be4a2514eb3654a3b757192ff0"
          effect_ids: []
          event_digests:
            - "sha256:3d3f58f553b02419266a42109a7cd33c416b24ab2436bda84e6f65aa95a4818c"
          mutation_id: "sha256:562e1d52ddb176bba38bdedf196eab4a6c21a7c8ff9dad120b31fdb3c1ddf48e"
        sha256:c7907d29642d5bf6faf6a383b8eee4023eb87918f7701c1fdf171bca3b2c5eee:
          after_revision: 8
          aggregate_digest: "sha256:a3fa9376380a385f1cee7163fa9ede3c0ba98e345707468e424896e7f5ba6e5c"
          before_revision: 7
          command_digest: "sha256:7cc3c4776a16d4ea7df0f55eb8b1e9ef1f5f98e62ae76ea4cde0b0bc86a62c6e"
          effect_ids: []
          event_digests:
            - "sha256:b2b23d950f1b7592d5c849e8a0eee6dbd385bca1c9f4eaee3c073b026cd722fa"
          mutation_id: "sha256:c7907d29642d5bf6faf6a383b8eee4023eb87918f7701c1fdf171bca3b2c5eee"
        sha256:e264eb75f8576ccf5d1a3bca86b244e0fb52d15c11f2c9f9f5086bed5e25fe43:
          after_revision: 3
          aggregate_digest: "sha256:08b9c63cf99ae8b57e99e5e3b558b191828674161ede6f34124536bcf7ba2fbe"
          before_revision: 2
          command_digest: "sha256:a12c7c719000bcdaca8db88331157a07d4a2a50eb7b79bf593182eac3d70c563"
          effect_ids: []
          event_digests:
            - "sha256:707ba7bb696851bf7746ee1c70a1f78e6c364d2883211f5e2753ff3268a204b0"
          mutation_id: "sha256:e264eb75f8576ccf5d1a3bca86b244e0fb52d15c11f2c9f9f5086bed5e25fe43"
        validation-resolution:sha256:13208d47aa99119bab2de4e0649c59c17e24f50d5fbba518cba91e6413f7aed8:
          after_revision: 12
          aggregate_digest: "sha256:25976a6c111a7813d0d275672dbdcf62544878e3a47d233da9cd999e3b283936"
          before_revision: 11
          command_digest: "sha256:63935883ac2ab9117f1abaa4b62376baedc527a79069f34e066f7f3659505705"
          effect_ids: []
          event_digests:
            - "sha256:9196923890eeb29b96b069cfe8cf243fc729cc5a264d701c84f6033b29b6f951"
          mutation_id: "validation-resolution:sha256:13208d47aa99119bab2de4e0649c59c17e24f50d5fbba518cba91e6413f7aed8"
        validation:sha256:8e7d17522f98a0920f77885160b1a73576931ea389ff9900f95c5be126e64b8d:
          after_revision: 11
          aggregate_digest: "sha256:4ad4df7bf0cc42a037df1e35ed5f764dc71327a45af110e1577b8421cb5b2cf1"
          before_revision: 10
          command_digest: "sha256:724ddbb02e98dc46dd80e62639e0162778ee9e75d29d6b732fb3509d51ec555a"
          effect_ids: []
          event_digests:
            - "sha256:87b5078c858a4a6e4fc7ce71bc3a218178cc8ab20f8508b45904b4aa146f6605"
          mutation_id: "validation:sha256:8e7d17522f98a0920f77885160b1a73576931ea389ff9900f95c5be126e64b8d"
      plan_history: []
      revision: 14
      schema_version: 1
      state: "COMPLETED"
      work_items:
        bound-release-ci-verification-timeout:
          attempt: 1
          claim_id: "sha256:4b44faafb7bf7060609d12a47557d9bfc962db396e0578a94be2bc7f7565f733"
          definition:
            contract_digest: "sha256:39e279df6eb6fd578e62cc7edd21bd2eca1d676ba9db7ec4e55e0db06429eb5d"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "release_metadata"
                - "repository_write"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
            expected_outputs:
              - "release-ci-timeout-evidence"
            id: "bound-release-ci-verification-timeout"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:281293648b6094ccd6c689a7b1b4f28776e05a9fb05e709bb2527156bc4c4e38"
              id: "release-ci-timeout-evidence"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50"
              task_id: "202610071048-M8PX0X"
              work_item_id: "bound-release-ci-verification-timeout"
          result_digest: "sha256:72d5a1bf4d1ebb2c572a6e976f4c1d7ebcc384295649e177f836f5b028d11d39"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:b153c01df63d5ce37534eeef347b8cbe27348fe6ccfdd64cd9190512f16b8734"
              - "sha256:f62e97e7027c5dcb82e8ec5d129e7fc0e0de9f5a87226659cb274a0e83f2ad0e"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:e1f518ffcef694446f9c40c8b2c65efc085722b9d1c8dc260608f77c08fb4e89"
              environment_digest: "sha256:c99994be1fd26f31026e97f29964e4ae9386996da85a5b1095d0364103c31d17"
              implementation_identity: "sha256:72d5a1bf4d1ebb2c572a6e976f4c1d7ebcc384295649e177f836f5b028d11d39"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-07T11:10:05.516Z"
            status: "PASSED"
    digest: "sha256:16a734f20c4d925dc3fa62eeefb02c11f2d9fea7485c72c62a377a977755fee0"
    documents:
      contracts:
        sha256:39e279df6eb6fd578e62cc7edd21bd2eca1d676ba9db7ec4e55e0db06429eb5d:
          acceptance_criteria:
            - "Add only release:ci-check to the script-specific timeout map with150*60000ms, matching release:prepublish. Preserve the30-minute default and all existing script budgets."
            - "Use the actual runDirectTaskVerification path with a captured process invocation to prove a declared bun run release:ci-check receives9000000ms and still executes the requested command. Do not test only the constant."
            - "Prove a shorter explicit additional_commands timeout_ms overrides the release script budget, and an unrelated supported declared command still receives1800000ms. Preserve sequence deadline and duplicate explicit-timeout semantics."
            - "Retain all existing assertions and mandatory checks. Do not alter global timeout configuration, process termination/orphan handling, command selection, baselines, scope enforcement or evidence admission."
            - "Return observed focused checks and exact source evidence. Independent EVALUATOR, native full verification and branch PR integration remain required before the release candidate is requalified; do not import manual PASS or infer publication/M05 approval."
          objective: "Give native release:ci-check the existing bounded150-minute release budget without changing other timeout or process semantics."
          role: "EXECUTOR"
          verification_commands:
            - "bun run format:check"
            - "bun x vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --maxWorkers=2"
            - "git diff --check"
      intent:
        context: "Release 0.7.13 candidate qualification reached release:ci-check extras after contract, clone and package installation passed, but native direct verification killed its parent at the default 30-minute deadline. The bounded release suite needs the existing 150-minute release budget. Add only release:ci-check to the script-specific timeout map, matching release:prepublish. Preserve all commands, assertions, default timeout for unrelated scripts, and explicit timeout_ms precedence. Add focused tests of the actual verifier invocation for the declared command, a shorter explicit timeout, and unrelated command default. Do not bypass checks, import manual PASS evidence, increase global timeouts, or change process lifecycle behavior. Native evaluator, full verification and branch PR integration required; candidate is requalified afterward."
        objective: "Give native release CI verification its bounded release timeout"
    events:
      -
        command_digest: "sha256:71147156c6cb9bef615c589b497f679123dac56e84a0585483a1456120037424"
        id: "capture:202610071048-M8PX0X:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610071048-M8PX0X"
        occurred_at: "2026-10-07T10:48:27.026Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610071048-M8PX0X"
        task_revision: 1
      -
        command_digest: "sha256:e98b708cad38da259ee2ec6702e6c6fae0a056f52dbdb5b2db23f52bda79a0b6"
        id: "result:sha256:82ba7836afc2c8bc4b15a415679e68415aac19808f27fcd73d35a53ef510cb1f:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:82ba7836afc2c8bc4b15a415679e68415aac19808f27fcd73d35a53ef510cb1f"
        occurred_at: "2026-10-07T10:50:44.386Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610071048-M8PX0X"
        task_revision: 2
      -
        command_digest: "sha256:a12c7c719000bcdaca8db88331157a07d4a2a50eb7b79bf593182eac3d70c563"
        id: "sha256:e264eb75f8576ccf5d1a3bca86b244e0fb52d15c11f2c9f9f5086bed5e25fe43:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:e264eb75f8576ccf5d1a3bca86b244e0fb52d15c11f2c9f9f5086bed5e25fe43"
        occurred_at: "2026-10-07T10:51:32.433Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610071048-M8PX0X"
        task_revision: 3
      -
        command_digest: "sha256:2889c74009bb41a449353c7b9d13b5d7cea3abb0d7bde6c27d18c98f0ab5c20f"
        id: "kernel_work_item_materialization_required:sha256:50ce1553a61a1b87c59bbdb6df68f46400f6a722b3ed001f5dc4c23a8f60a50a:sha256:79ba04aef9e1897d57442f4a1de4423dab72adcf41049f1425a5ca5980f58c65:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:50ce1553a61a1b87c59bbdb6df68f46400f6a722b3ed001f5dc4c23a8f60a50a:sha256:79ba04aef9e1897d57442f4a1de4423dab72adcf41049f1425a5ca5980f58c65"
        occurred_at: "2026-10-07T10:52:04.786Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610071048-M8PX0X"
        task_revision: 4
      -
        command_digest: "sha256:cc1615a59ff654a1bf6d1d76d955e80953a1812271f3ed16b092c6a90f7bcf6b"
        id: "kernel_work_item_claim_required:sha256:35211320c2843e5ca02a6a39d179aa07a17d138212e6c5b2172c213ee4014032:sha256:79ba04aef9e1897d57442f4a1de4423dab72adcf41049f1425a5ca5980f58c65:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:35211320c2843e5ca02a6a39d179aa07a17d138212e6c5b2172c213ee4014032:sha256:79ba04aef9e1897d57442f4a1de4423dab72adcf41049f1425a5ca5980f58c65"
        occurred_at: "2026-10-07T10:52:18.295Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610071048-M8PX0X"
        task_revision: 5
      -
        command_digest: "sha256:01ac031386980df6fa9868f9087d3ef95faa46be4a2514eb3654a3b757192ff0"
        id: "sha256:562e1d52ddb176bba38bdedf196eab4a6c21a7c8ff9dad120b31fdb3c1ddf48e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:562e1d52ddb176bba38bdedf196eab4a6c21a7c8ff9dad120b31fdb3c1ddf48e"
        occurred_at: "2026-10-07T10:54:28.260Z"
        payload_digest: "sha256:79c5178a91c92ee646f4ef39818732408af501267d2142cf84123ce682113114"
        task_id: "202610071048-M8PX0X"
        task_revision: 6
      -
        command_digest: "sha256:4bd4304f479a5ebaa3c94f5a2f19336c5b1cd2f95d7ba95e51f5bdcbc7051e66"
        id: "kernel_work_item_execution_required:sha256:96585f1ab600c893bf7b2d6c729a81d27302007768226396007a9a1e0bb1ce7e:sha256:a28a585efb5a8dd2cbcce8fd1f854fb0d47986fcb1c2326d90cff9bfad88e64c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:96585f1ab600c893bf7b2d6c729a81d27302007768226396007a9a1e0bb1ce7e:sha256:a28a585efb5a8dd2cbcce8fd1f854fb0d47986fcb1c2326d90cff9bfad88e64c"
        occurred_at: "2026-10-07T10:54:49.037Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202610071048-M8PX0X"
        task_revision: 7
      -
        command_digest: "sha256:7cc3c4776a16d4ea7df0f55eb8b1e9ef1f5f98e62ae76ea4cde0b0bc86a62c6e"
        id: "sha256:c7907d29642d5bf6faf6a383b8eee4023eb87918f7701c1fdf171bca3b2c5eee:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:c7907d29642d5bf6faf6a383b8eee4023eb87918f7701c1fdf171bca3b2c5eee"
        occurred_at: "2026-10-07T11:02:23.565Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202610071048-M8PX0X"
        task_revision: 8
      -
        command_digest: "sha256:8b81e21f2fd039da70c5a04b0011a7c0ab1137dbc37e545af97be8280b2a82a3"
        id: "result:sha256:031c562311f79bce655be9efc96977055e1fd67f5154c31c9fbb32973640f5cc:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:031c562311f79bce655be9efc96977055e1fd67f5154c31c9fbb32973640f5cc"
        occurred_at: "2026-10-07T11:05:17.944Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202610071048-M8PX0X"
        task_revision: 9
      -
        command_digest: "sha256:c748c578f44b71d7ae4778fbc3fd7cf271fc18871ee5d942dc1d030525fee1bd"
        id: "kernel_work_item_inspection_required:sha256:2c32c61bc4f1ef176202f25edf15dde2aed2bbc374621d349bb12ec2699e1011:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:2c32c61bc4f1ef176202f25edf15dde2aed2bbc374621d349bb12ec2699e1011:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50"
        occurred_at: "2026-10-07T11:05:30.809Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202610071048-M8PX0X"
        task_revision: 10
      -
        command_digest: "sha256:724ddbb02e98dc46dd80e62639e0162778ee9e75d29d6b732fb3509d51ec555a"
        id: "validation:sha256:8e7d17522f98a0920f77885160b1a73576931ea389ff9900f95c5be126e64b8d:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:8e7d17522f98a0920f77885160b1a73576931ea389ff9900f95c5be126e64b8d"
        occurred_at: "2026-10-07T11:10:18.920Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202610071048-M8PX0X"
        task_revision: 11
      -
        command_digest: "sha256:63935883ac2ab9117f1abaa4b62376baedc527a79069f34e066f7f3659505705"
        id: "validation-resolution:sha256:13208d47aa99119bab2de4e0649c59c17e24f50d5fbba518cba91e6413f7aed8:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:13208d47aa99119bab2de4e0649c59c17e24f50d5fbba518cba91e6413f7aed8"
        occurred_at: "2026-10-07T11:10:26.052Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610071048-M8PX0X"
        task_revision: 12
      -
        command_digest: "sha256:24a51cac27355cd9be057343412cb65b40dffe7b6c065944a804ad9f4a15fe2a"
        id: "final-validation:sha256:4e802c28762195096a83cc7df18c9cbda7dcc40bc67a3e6a6defbfa043851557:12:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:4e802c28762195096a83cc7df18c9cbda7dcc40bc67a3e6a6defbfa043851557:12"
        occurred_at: "2026-10-07T12:01:01.931Z"
        payload_digest: "sha256:c4638fb792606faa5c5415baa5a7d87aa3eb27ff86f5452698e903e04dcd9c4f"
        task_id: "202610071048-M8PX0X"
        task_revision: 13
      -
        command_digest: "sha256:28a2a0b827286f12c9dc98d57f3f5b210ca80a783d63c987042ace6c0c116c58"
        id: "kernel_task_completion_required:sha256:6017490213df6446bd7a208fe96e3683091a16f3736cad9b44ea23a35bc1a4d1:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:6017490213df6446bd7a208fe96e3683091a16f3736cad9b44ea23a35bc1a4d1:sha256:ea9bc1c73d05a8bb37384eaae7c234f483b976717368eab03d81ec82ff550a50"
        occurred_at: "2026-10-07T12:01:50.545Z"
        payload_digest: "sha256:a8a8d0bc0cff32f4b2ca75daea16cc595d9d90fca860399842cb49b39ecc57d1"
        task_id: "202610071048-M8PX0X"
        task_revision: 14
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Give native release CI verification its bounded release timeout

Release 0.7.13 candidate qualification reached release:ci-check extras after contract, clone and package installation passed, but native direct verification killed its parent at the default 30-minute deadline. The bounded release suite needs the existing 150-minute release budget. Add only release:ci-check to the script-specific timeout map, matching release:prepublish. Preserve all commands, assertions, default timeout for unrelated scripts, and explicit timeout_ms precedence. Add focused tests of the actual verifier invocation for the declared command, a shorter explicit timeout, and unrelated command default. Do not bypass checks, import manual PASS evidence, increase global timeouts, or change process lifecycle behavior. Native evaluator, full verification and branch PR integration required; candidate is requalified afterward.

## Scope

- In scope: Release 0.7.13 candidate qualification reached release:ci-check extras after contract, clone and package installation passed, but native direct verification killed its parent at the default 30-minute deadline. The bounded release suite needs the existing 150-minute release budget. Add only release:ci-check to the script-specific timeout map, matching release:prepublish. Preserve all commands, assertions, default timeout for unrelated scripts, and explicit timeout_ms precedence. Add focused tests of the actual verifier invocation for the declared command, a shorter explicit timeout, and unrelated command default. Do not bypass checks, import manual PASS evidence, increase global timeouts, or change process lifecycle behavior. Native evaluator, full verification and branch PR integration required; candidate is requalified afterward.
- Out of scope: unrelated refactors not required for "Give native release CI verification its bounded release timeout".

## Plan

1. Execute approved WorkItem bound-release-ci-verification-timeout.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun x vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --maxWorkers=2`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-07T12:00:49.984Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:69360789831a5c3562cc2f7efef5913b49e28346b2707074b1bd045c2265e6f5, input_digest=sha256:c59221179ebef08309568d2a0c81f93b42f955aa9fec4120a85a2fb90d53fe6f

Details:

Check: affected_unit_integration
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bun x vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bun x vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check full_regression

Check: real_e2e
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check real_e2e (1/4)

Check: real_e2e
Command: bun x vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check real_e2e (2/4)

Check: real_e2e
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check real_e2e (3/4)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check real_e2e (4/4)

Check: task_outcome
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun x vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610071048-M8PX0X/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610071048-M8PX0X Verification Contract check task_outcome (4/4)

NativeTaskIdentityRef:
- plan_digest: sha256:282ee0c206dd3a40eb62d6c55bfbb4d38d2fffebb480f02a4e34f211d6f9bd53
- policy_digest: sha256:26cbf60e57ff6118b5cdcfaa5b7bbd07e2f7c8f2e02112dc5e98fe4437e2fe64
- capability_digest: sha256:9183f8c09d398df216467456351aac1e287d23ada24c9ed32b1c508fc01d973d
- checks_digest: sha256:325f15a9d81e17f91652f43d6bfcee14f447d74f1facc4510486ed38c27b94fb
- identity_digest: sha256:29b6df948b7d57965ba484aa7e76c7bf7e491e2ed1553e9485bd2557beea32fc

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

## Token Usage

- State: `unavailable`
- Completeness: `0/4` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:f33e91d2915199aa2b65f068fa84eefac2c816aadb55747297ad2d3ad26e4d9b`
- Unavailable reason: `external_host_turn_unallocatable`
- Updated at: `2026-10-07T12:19:28.859Z`
