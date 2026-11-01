---
id: "202611010728-AV4G8P"
title: "Retire stale writable semantic admissions before legacy quarantine"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 30
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
  - "bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts"
  - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-11-01T09:44:53.883Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-11-01T10:07:34.127Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-11-01T09:44:53.883Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "cd9042a69dfdedcbea7e34104f31a9694aa36e59"
  review_identity_digest: "sha256:169b3174761825be1de229cc614b5301236b82c17047104f696903fbdb238adc"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202611010728-AV4G8P/48c952e0eedd2f5850d3459c67184e6c4cf68bb53206e60cc0551e8370c47de7/quality-report.json"
  findings:
    - "Reviewed all nine source paths and the fresh14-block context plus native implementation, repository and validation inputs. Exact source/report digests match767 and the native evaluator target. The previous root-link finding is closed by explicit root lstat refusal before stable reads, lease acquisition and evidence publication; four regressions failed before the fix and pass after it, preserving target inventory and bytes."
    - "The operator authenticates the exact native revision-split source, original single EXECUTOR intent, WorkOrder/exchange/result identity, repository and policy. Missing original owner and no active lease/external-effect/accepted or checkpointed exchange are required. Historical fingerprint-v1 records are authenticated in the bounded retirement reader; the normal invocation validators and migration/runtime guards remain unchanged."
    - "The existing native execution fence covers exact protected beforeimages, prepared afterimages, retired exchange first, journal CAS second and an immutable final receipt. Replay only recognizes exact admitted partial states. Old Tasks, Plans, WorkItems, WorkOrders and genuine results are preserved; prior effects remain unassessed and no historical DONE/PASS/CANCELLED is assigned."
    - "Public CLI tests cover issued and genuine-result cases, late-result refusal, real native quarantine and raw-byte rollback without reactivating admission, configured directories, interruption/replay, tamper/drift, unknown partial state, active lease and concurrent apply. Existing assertions are preserved or increased; no test or CI/policy budget was weakened."
    - "Retained native validation768 actually passed all three mandatory commands: full ci:local:full (runtime/docs-schema/core/CLI), focused40 tests and publicCLI22 tests. The earlier lint and root-link review failures remain retained. No actual Factory retirement/quarantine, host effect or credential change occurred in this source episode."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
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
      - "public_api"
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
      - "schema"
      - "dependencies"
      - "ci"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
      - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
      - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
      - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
      - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
      - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
      - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
      - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
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
    - "effect_public_api"
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
          - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
          - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
          - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:public_api"
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
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:b931bb2614ba57fd119e1435ea1b069ca03fa0e95c8b6fe7f7613ad42b86f4fd"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
        - "central_component:packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
        - "effect_public_api"
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
          - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
          - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
          - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
          - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
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
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "cd9042a69dfdedcbea7e34104f31a9694aa36e59"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-11-01T10:07:34.127Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-11-01T10:07:34.931Z"
doc_updated_by: "SUPERVISOR"
description: "Implement a bounded public native operator recovery to revoke only stale writable external semantic admissions before revision-split quarantine. Initial approved application targets are Factory BPA49V,778NR2,G6MVKS,BCJRWK. Preserve exact Task/journal/WorkOrder/exchange/result beforeimages, old results and receipts; never execute old WorkItems or assign historical DONE/PASS/CANCELLED, and never classify an unknown effect applied/not_applied. Require exact current repository/source/policy/operation pins, missing original checkout and no external-effect authority or active execution lease. Use native retired exchange and journal CAS under the common execution fence, durable prepared/afterimage receipts and strict crash/duplicate/drift/tamper/concurrency refusal. Reuse existing native retirement primitives without weakening migration admission or runtime guards. Validate rollback cannot reactivate retired admission. No Factory application until this source task passes native mandatory checks, fresh independent EVALUATOR, protected canonical PR/merge and current CLI qualification. Keep existing branches/worktrees and all runtime data/credentials. User explicitly approved this extension and the all8 PR/merge/deploy outcome."
sections:
  Summary: |-
    Retire stale writable semantic admissions before legacy quarantine

    Implement a bounded public native operator recovery to revoke only stale writable external semantic admissions before revision-split quarantine. Initial approved application targets are Factory BPA49V,778NR2,G6MVKS,BCJRWK. Preserve exact Task/journal/WorkOrder/exchange/result beforeimages, old results and receipts; never execute old WorkItems or assign historical DONE/PASS/CANCELLED, and never classify an unknown effect applied/not_applied. Require exact current repository/source/policy/operation pins, missing original checkout and no external-effect authority or active execution lease. Use native retired exchange and journal CAS under the common execution fence, durable prepared/afterimage receipts and strict crash/duplicate/drift/tamper/concurrency refusal. Reuse existing native retirement primitives without weakening migration admission or runtime guards. Validate rollback cannot reactivate retired admission. No Factory application until this source task passes native mandatory checks, fresh independent EVALUATOR, protected canonical PR/merge and current CLI qualification. Keep existing branches/worktrees and all runtime data/credentials. User explicitly approved this extension and the all8 PR/merge/deploy outcome.
  Scope: |-
    - In scope: Implement a bounded public native operator recovery to revoke only stale writable external semantic admissions before revision-split quarantine. Initial approved application targets are Factory BPA49V,778NR2,G6MVKS,BCJRWK. Preserve exact Task/journal/WorkOrder/exchange/result beforeimages, old results and receipts; never execute old WorkItems or assign historical DONE/PASS/CANCELLED, and never classify an unknown effect applied/not_applied. Require exact current repository/source/policy/operation pins, missing original checkout and no external-effect authority or active execution lease. Use native retired exchange and journal CAS under the common execution fence, durable prepared/afterimage receipts and strict crash/duplicate/drift/tamper/concurrency refusal. Reuse existing native retirement primitives without weakening migration admission or runtime guards. Validate rollback cannot reactivate retired admission. No Factory application until this source task passes native mandatory checks, fresh independent EVALUATOR, protected canonical PR/merge and current CLI qualification. Keep existing branches/worktrees and all runtime data/credentials. User explicitly approved this extension and the all8 PR/merge/deploy outcome.
    - Out of scope: unrelated refactors not required for "Retire stale writable semantic admissions before legacy quarantine".
  Plan: "1. Execute approved WorkItem native-stale-admission-retirement."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-11-01T10:07:34.127Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:bf26ec4fd7f1c36de7b8ad2363d46f73a847ae76872f1b50951ebaa5856adc19, input_digest=sha256:d2e3ec0d2583f1004c7a9a6eb4230f573fccbf4aa71c8a581bef0d43db3cc31f

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202611010728-AV4G8P Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202611010728-AV4G8P Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202611010728-AV4G8P Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202611010728-AV4G8P Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202611010728-AV4G8P Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202611010728-AV4G8P Verification Contract check critical_paths (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202611010728-AV4G8P Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202611010728-AV4G8P Verification Contract check real_e2e (1/3)

    Check: real_e2e
    Command: bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202611010728-AV4G8P Verification Contract check real_e2e (2/3)

    Check: real_e2e
    Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202611010728-AV4G8P Verification Contract check real_e2e (3/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202611010728-AV4G8P Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202611010728-AV4G8P Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202611010728-AV4G8P Verification Contract check task_outcome (3/3)

    NativeTaskIdentityRef:
    - plan_digest: sha256:11ddab81d6756bb40ae2b7fa7f2dc8b31cf53c5b5fb160569978bcbc5637cebb
    - policy_digest: sha256:afcda1f51a320f9f13fd7af39ac9bf6788c0495770b3cb3a798b7b65aedd2593
    - capability_digest: sha256:b838864bcbcaf2b8a840126c7ca52120e5a1135148807ff1d4ee58dbf6938086
    - checks_digest: sha256:8ba2d268a0e379f5ff0530453b005c9f432b3558341888589dbd97038221176c
    - identity_digest: sha256:a3b77fed3a8f9997ae79b28b2568a1e6027d3abf36c2db13bc694448d7206192

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202611010728-AV4G8P
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
    digest: "sha256:948f0da7e755f48d81533305ce865be6fbb3d2fd7c3091526cf957c4ab76cbad"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202611010728-AV4G8P/48c952e0eedd2f5850d3459c67184e6c4cf68bb53206e60cc0551e8370c47de7/quality-report.json"
    findings:
      - "Reviewed all nine source paths and the fresh14-block context plus native implementation, repository and validation inputs. Exact source/report digests match767 and the native evaluator target. The previous root-link finding is closed by explicit root lstat refusal before stable reads, lease acquisition and evidence publication; four regressions failed before the fix and pass after it, preserving target inventory and bytes."
      - "The operator authenticates the exact native revision-split source, original single EXECUTOR intent, WorkOrder/exchange/result identity, repository and policy. Missing original owner and no active lease/external-effect/accepted or checkpointed exchange are required. Historical fingerprint-v1 records are authenticated in the bounded retirement reader; the normal invocation validators and migration/runtime guards remain unchanged."
      - "The existing native execution fence covers exact protected beforeimages, prepared afterimages, retired exchange first, journal CAS second and an immutable final receipt. Replay only recognizes exact admitted partial states. Old Tasks, Plans, WorkItems, WorkOrders and genuine results are preserved; prior effects remain unassessed and no historical DONE/PASS/CANCELLED is assigned."
      - "Public CLI tests cover issued and genuine-result cases, late-result refusal, real native quarantine and raw-byte rollback without reactivating admission, configured directories, interruption/replay, tamper/drift, unknown partial state, active lease and concurrent apply. Existing assertions are preserved or increased; no test or CI/policy budget was weakened."
      - "Retained native validation768 actually passed all three mandatory commands: full ci:local:full (runtime/docs-schema/core/CLI), focused40 tests and publicCLI22 tests. The earlier lint and root-link review failures remain retained. No actual Factory retirement/quarantine, host effect or credential change occurred in this source episode."
    implementation_commit: "cd9042a69dfdedcbea7e34104f31a9694aa36e59"
    implementation_tree: "f82ed976dbdea6438c3b3eb3812bed7a2c83b0d0"
    projected_at: "2026-11-01T09:44:53.883Z"
    review_identity_digest: "sha256:169b3174761825be1de229cc614b5301236b82c17047104f696903fbdb238adc"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:30bca17d0f6c4a72883a24d9c85f7963ab881ea9d1c3c90b29ee7f0e1b46841e"
    work_order_id: "sha256:e4b814b745b851e17eba253007d75c7995c5e2e8c523fb12482a30e9250f651d"
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
            digest: "sha256:c8f2e7789d0822b36a2881aaf88af2c6b5e1c1645e622574cf7096b5c14bd57f"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:11ddab81d6756bb40ae2b7fa7f2dc8b31cf53c5b5fb160569978bcbc5637cebb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:0f48b50981361db07170678c2384aec2712a40ee4fc16d3c83e9fafabdcdbeb3"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "public_api"
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
              - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
            task_id: "202611010728-AV4G8P"
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
            digest: "sha256:9785da4ff4aa52da822e9f8f1434c82c505c17ed61b0de304627fc833bf8b615"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:11ddab81d6756bb40ae2b7fa7f2dc8b31cf53c5b5fb160569978bcbc5637cebb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:0f48b50981361db07170678c2384aec2712a40ee4fc16d3c83e9fafabdcdbeb3"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:c8f2e7789d0822b36a2881aaf88af2c6b5e1c1645e622574cf7096b5c14bd57f"
            repository_effects:
              - "public_api"
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
              - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
            task_id: "202611010728-AV4G8P"
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
            evidence_digest: "sha256:688370f3e42a9d2b91a1ab81a85edec16263476f7b49a85711dcfdc39da1c2fc"
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
            digest: "sha256:0acbad22b7c0a3ec0a89b678e93f457adea468c58a7c689101c61a01fdc6e702"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:11ddab81d6756bb40ae2b7fa7f2dc8b31cf53c5b5fb160569978bcbc5637cebb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:0f48b50981361db07170678c2384aec2712a40ee4fc16d3c83e9fafabdcdbeb3"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:9785da4ff4aa52da822e9f8f1434c82c505c17ed61b0de304627fc833bf8b615"
            repository_effects:
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f42c80bab9ab0bf23a7f0cb5e04072a1b1f897226c7ac2843d0a742b59501bc2"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
            task_id: "202611010728-AV4G8P"
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
              - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
            evidence_digest: "sha256:c37805f0cb4b1b3bbeb7dc3531e97fa3f7fc22bfade688b99df04082bdb3e129"
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
            digest: "sha256:df1bd3cd6a7f075e456d820612b80dcd0e49da835ad66483577d8157ff881401"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:11ddab81d6756bb40ae2b7fa7f2dc8b31cf53c5b5fb160569978bcbc5637cebb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:0f48b50981361db07170678c2384aec2712a40ee4fc16d3c83e9fafabdcdbeb3"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:0acbad22b7c0a3ec0a89b678e93f457adea468c58a7c689101c61a01fdc6e702"
            repository_effects:
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:80fba7e82218cef323437c7767eed7c817455585c0c2a9f52bf727ac10cb5176"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
            task_id: "202611010728-AV4G8P"
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
              - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
            evidence_digest: "sha256:31b76542e72d4a66738093fdc24745232aabf44bf46b49921b4e3d5d0e40add7"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:f42c80bab9ab0bf23a7f0cb5e04072a1b1f897226c7ac2843d0a742b59501bc2"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:135d1268cbe6f70cc7fddcf2ab86434175fca1c9f517817ec69a73f7bd1460eb"
            expires_at: null
            external_effects:
              - "network_read"
            plan_digest: "sha256:11ddab81d6756bb40ae2b7fa7f2dc8b31cf53c5b5fb160569978bcbc5637cebb"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:0f48b50981361db07170678c2384aec2712a40ee4fc16d3c83e9fafabdcdbeb3"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:df1bd3cd6a7f075e456d820612b80dcd0e49da835ad66483577d8157ff881401"
            repository_effects:
              - "public_api"
              - "release_metadata"
              - "repository_write"
              - "security_boundary"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7f37237c859830b57f1668ca8f7bdd82482ba41a5cde9ec6c37dbb3dac8936e6"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
              - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
              - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
            task_id: "202611010728-AV4G8P"
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
              - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
              - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
            evidence_digest: "sha256:8f20880945dd4766cfac1735f206785d04b8591f1166a1b73893b0f46c971546"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:80fba7e82218cef323437c7767eed7c817455585c0c2a9f52bf727ac10cb5176"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:0f48b50981361db07170678c2384aec2712a40ee4fc16d3c83e9fafabdcdbeb3"
        digest: "sha256:11ddab81d6756bb40ae2b7fa7f2dc8b31cf53c5b5fb160569978bcbc5637cebb"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:430513ee9535ee63ad9455b1e578b9a8eb23d72d81a4c2eee2bdd901e4aec36b"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "public_api"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
            expected_outputs:
              - "native-admission-retirement-source"
              - "native-admission-retirement-coverage"
            id: "native-stale-admission-retirement"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:09b856f86aa918c809f5f763b4c0db5068af5b34b53b2af959f9254b302c7751"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:c48eb89b3e6a3d51df88185cda0fd4c7f37e7ca94584b8566cb112d8824bf0e2"
          environment_digest: "sha256:d7ebc641ec5d226525e9fafa255b5b88093c4124b643f58675f10bd2c1707dcb"
          implementation_identity: "sha256:7f37237c859830b57f1668ca8f7bdd82482ba41a5cde9ec6c37dbb3dac8936e6"
          toolchain_digest: "sha256:faa94f4704251a0ff003cdbc75a97e92e3c24d4023ad357cfeee08b3fded3efc"
        observed_at: "2026-11-01T09:44:59.210Z"
        status: "PASSED"
      id: "202611010728-AV4G8P"
      intent_digest: "sha256:20dbe443fff8e353e9c2493d23dac4360c54b2549bb5d04b787cab429afa4061"
      migration_receipts: []
      mutation_receipts:
        capture:202611010728-AV4G8P:
          after_revision: 1
          aggregate_digest: "sha256:c1c56c902adf824835f5d3847d301e049c2806df25c9bc13bc82bd71445ccf6b"
          before_revision: 0
          command_digest: "sha256:da2757c3061bd617c119fcc715565a2c65dced314edeeac4ab6d52645d1aef01"
          effect_ids: []
          event_digests:
            - "sha256:1ea0213614527ad9c883ce51316e0588748f8aa04eb92f7ec808020d7ba5df39"
          mutation_id: "capture:202611010728-AV4G8P"
        final-validation:sha256:09b856f86aa918c809f5f763b4c0db5068af5b34b53b2af959f9254b302c7751:26:
          after_revision: 27
          aggregate_digest: "sha256:0fc0c1ec5b8fa0e3cc3806d5a1ab56657689a9cee85bf5e9fad1763628a0dfbf"
          before_revision: 26
          command_digest: "sha256:643a47be95a5c9bca9c7561df4e0eeeae39f63dc9dac9dd46d22e93d3a0504b8"
          effect_ids: []
          event_digests:
            - "sha256:88bfb8db0fc66a74c5ac072a3ffda60c92376e2c7ff75e9b4c69ba84832be635"
          mutation_id: "final-validation:sha256:09b856f86aa918c809f5f763b4c0db5068af5b34b53b2af959f9254b302c7751:26"
        kernel_work_item_claim_required:sha256:7a8e85d7027fecdb0ebfb92aaf3a3d0b9485ff93405a9e6e5d9d5e1578338fc1:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:
          after_revision: 5
          aggregate_digest: "sha256:6234a17f2c4f88d2786c63c29972e3738e27914a2151ed72b1e1b6b80bf14a55"
          before_revision: 4
          command_digest: "sha256:cd33d2477067d3c35f9a03ed18028620f97329d20895f2cd0f102d337a8985cb"
          effect_ids: []
          event_digests:
            - "sha256:633c484bb1ba095105c2fbcbe9bfab0b02b9080fed58dd737edb341cf67126ef"
          mutation_id: "kernel_work_item_claim_required:sha256:7a8e85d7027fecdb0ebfb92aaf3a3d0b9485ff93405a9e6e5d9d5e1578338fc1:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        kernel_work_item_execution_required:sha256:2abf062cbb16c46f0bde155ac8d68a0ca1446869b079bbcb0df982168096b505:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62:
          after_revision: 7
          aggregate_digest: "sha256:5d47f207694253eb8559bb217d9a8b5f4a212198053c1810b4331c1fd415abd7"
          before_revision: 6
          command_digest: "sha256:918a56abd628d2f414c207ad96abdce73500a74a411288a619c97f0a223fa8ce"
          effect_ids: []
          event_digests:
            - "sha256:363bc754102f863a4d0c812ea4f73d879de256e80a42fc56a0f8600419f631ae"
          mutation_id: "kernel_work_item_execution_required:sha256:2abf062cbb16c46f0bde155ac8d68a0ca1446869b079bbcb0df982168096b505:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62"
        kernel_work_item_execution_required:sha256:43911d0a384f2a4c037a9d3b8af07513f3cd24b12d33ae6dc70019e616f87fda:sha256:80fba7e82218cef323437c7767eed7c817455585c0c2a9f52bf727ac10cb5176:
          after_revision: 21
          aggregate_digest: "sha256:1333e27a1af0d3d940da601c1048e052be4dab704d52d6a0821b9f56e243cf4b"
          before_revision: 20
          command_digest: "sha256:f2989dbf534503546f22391e2c55d9c0f54bbce11bf45c0770ea6778c41cfa72"
          effect_ids: []
          event_digests:
            - "sha256:e55cea0d53b789dc38de25e00d8ed3a8b67a21aaee084a4cc75239004e34a869"
          mutation_id: "kernel_work_item_execution_required:sha256:43911d0a384f2a4c037a9d3b8af07513f3cd24b12d33ae6dc70019e616f87fda:sha256:80fba7e82218cef323437c7767eed7c817455585c0c2a9f52bf727ac10cb5176"
        kernel_work_item_execution_required:sha256:8d342d098b7a017af6e070326ff721b7d4997722818dd73ca0bf8dbf4b52157c:sha256:f42c80bab9ab0bf23a7f0cb5e04072a1b1f897226c7ac2843d0a742b59501bc2:
          after_revision: 14
          aggregate_digest: "sha256:892be64d3d1906c1eab1f390e98acdb30603562f3410b2ef9ef95db6b6f43e57"
          before_revision: 13
          command_digest: "sha256:dff6e42199089b043842152f2c0dd02c939c1552cab2ad12f1c3546664d6843e"
          effect_ids: []
          event_digests:
            - "sha256:59fb1b1bf76dc9717dedd0204a51ade5e4c802fafe8440a09050db4442d4ebd4"
          mutation_id: "kernel_work_item_execution_required:sha256:8d342d098b7a017af6e070326ff721b7d4997722818dd73ca0bf8dbf4b52157c:sha256:f42c80bab9ab0bf23a7f0cb5e04072a1b1f897226c7ac2843d0a742b59501bc2"
        kernel_work_item_inspection_required:sha256:55601d5fa05612d398d3fba675dacda012c99fae34c490403a877a25514daf70:sha256:80fba7e82218cef323437c7767eed7c817455585c0c2a9f52bf727ac10cb5176:
          after_revision: 17
          aggregate_digest: "sha256:d9f3c6e8047aa256345fcb93ecb1ebf1de5ba17566683dec70eba6823837aa88"
          before_revision: 16
          command_digest: "sha256:35410eb5fe3f30ae2b6efa1c56a8ed9030be43e89a4e0e8aea2617271beb027b"
          effect_ids: []
          event_digests:
            - "sha256:9e9ade902f6c3d71c58fce93449dff3e30d7affd8eea56e2171481f8e7adebdc"
          mutation_id: "kernel_work_item_inspection_required:sha256:55601d5fa05612d398d3fba675dacda012c99fae34c490403a877a25514daf70:sha256:80fba7e82218cef323437c7767eed7c817455585c0c2a9f52bf727ac10cb5176"
        kernel_work_item_inspection_required:sha256:b8efd4490f76461abf05e28be092d1345764fd5ca83b0eb54f4e6332ebc11448:sha256:7f37237c859830b57f1668ca8f7bdd82482ba41a5cde9ec6c37dbb3dac8936e6:
          after_revision: 24
          aggregate_digest: "sha256:3ddb903ca82cc2199a1c0b52727223a3260541de1ee37468ed7194b56e0e8de3"
          before_revision: 23
          command_digest: "sha256:4e08aaa4401ac194b051068e78c7777782568d48762ce9f63a364755a635bb50"
          effect_ids: []
          event_digests:
            - "sha256:d433a79b3a981713d14e5cd153ed407409c7db7e2b5ce1eea881ea61fde7b69f"
          mutation_id: "kernel_work_item_inspection_required:sha256:b8efd4490f76461abf05e28be092d1345764fd5ca83b0eb54f4e6332ebc11448:sha256:7f37237c859830b57f1668ca8f7bdd82482ba41a5cde9ec6c37dbb3dac8936e6"
        kernel_work_item_inspection_required:sha256:bff1f53bed870ded04ac5bd041dd7c6450c661bdc08568067b137f935fe99521:sha256:f42c80bab9ab0bf23a7f0cb5e04072a1b1f897226c7ac2843d0a742b59501bc2:
          after_revision: 10
          aggregate_digest: "sha256:1e42b6500863cdb25462398f517819837e5cbbf42662a1500364e1c4d4a6cd9b"
          before_revision: 9
          command_digest: "sha256:dd1b90ed43e2e00c8dd0599e2fe2161a2ff80f10090ebee9acfd214d7f2d303a"
          effect_ids: []
          event_digests:
            - "sha256:b1d28d37a426ab0c535993460d3c9a771ff524275f524027f357f9c5ac669d6e"
          mutation_id: "kernel_work_item_inspection_required:sha256:bff1f53bed870ded04ac5bd041dd7c6450c661bdc08568067b137f935fe99521:sha256:f42c80bab9ab0bf23a7f0cb5e04072a1b1f897226c7ac2843d0a742b59501bc2"
        kernel_work_item_materialization_required:sha256:163c2bc55e4b61124d7040c1e80dc98aac99d3ce426e081779c97d048087e6b8:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:
          after_revision: 4
          aggregate_digest: "sha256:e595ce05218a0af239d81d0d292e5018f41bf874abb49472ab955cb705a94211"
          before_revision: 3
          command_digest: "sha256:73d5c40469108269df17371c79964526f2840b83b5de7e53df7f30f82d24d55b"
          effect_ids: []
          event_digests:
            - "sha256:9bae85917feacb8a01753af43c6857750473840c26ee23337dca68b30d4b94a9"
          mutation_id: "kernel_work_item_materialization_required:sha256:163c2bc55e4b61124d7040c1e80dc98aac99d3ce426e081779c97d048087e6b8:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        kernel_work_item_rework_claim_required:sha256:86ab6a3586b14ea07cd607eb7b4e25c03e5f2f401442299bde0c71e68b01251b:sha256:80fba7e82218cef323437c7767eed7c817455585c0c2a9f52bf727ac10cb5176:
          after_revision: 20
          aggregate_digest: "sha256:b047a40d20161582e1df16b717bdd5d351846ba46edf38178a0a2c23ec52ab81"
          before_revision: 19
          command_digest: "sha256:c623833e9d0835f3c9a9ea7865bab8de7d6421e824fa6f17c14b3e1b13494e3a"
          effect_ids: []
          event_digests:
            - "sha256:9e61648e8687b8a714980f62fd0ba71202d1194a9f82a9c2a8a8eecadd78ef4f"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:86ab6a3586b14ea07cd607eb7b4e25c03e5f2f401442299bde0c71e68b01251b:sha256:80fba7e82218cef323437c7767eed7c817455585c0c2a9f52bf727ac10cb5176"
        kernel_work_item_rework_claim_required:sha256:e87d760e5614d1de6965b60bcb32b5a49f5656652e3a404fc911baf668ab7cb3:sha256:f42c80bab9ab0bf23a7f0cb5e04072a1b1f897226c7ac2843d0a742b59501bc2:
          after_revision: 13
          aggregate_digest: "sha256:2fc58fb45721f8826080f02051b0ed29176b339b220e26f58e5560281690268d"
          before_revision: 12
          command_digest: "sha256:acc3ed8dffd4700a53588f1d9f9641e8442650da85bd3c9b683b33a878e9c4fa"
          effect_ids: []
          event_digests:
            - "sha256:ecb767987fc1660d44d2f8f1b6511b87ee3144469579b8411172a7f33dc5a6d3"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:e87d760e5614d1de6965b60bcb32b5a49f5656652e3a404fc911baf668ab7cb3:sha256:f42c80bab9ab0bf23a7f0cb5e04072a1b1f897226c7ac2843d0a742b59501bc2"
        result:sha256:678f87d25259bd854e7594f572c6f8d77cfaa0b7e40368a8dfe8f0b15f5eb32a:
          after_revision: 16
          aggregate_digest: "sha256:51c6cea2208dd155024f11da1aa8f925677b163fa1dbccc0e3d2edea3daa5741"
          before_revision: 15
          command_digest: "sha256:55a8bf00c44b32cc6df9eb7d41e4f7e734a6ab9fa841c88022e7a1cd2880c98b"
          effect_ids: []
          event_digests:
            - "sha256:ae4b8b92e95951aff6d3893027f37a32cbdf3bbaeb4eaedfffac75548b30fa6f"
          mutation_id: "result:sha256:678f87d25259bd854e7594f572c6f8d77cfaa0b7e40368a8dfe8f0b15f5eb32a"
        result:sha256:b08361acbe888c8123a97ee3479d11a96ad2305114707e466537ae9d3f290a3e:
          after_revision: 2
          aggregate_digest: "sha256:8459569805e5ce0637c142fd2ad3cc809530d5acd7012f352c500b4a1d4122a9"
          before_revision: 1
          command_digest: "sha256:5223333e60bd64f4ce9e98a35916a2573766293500e4c3e3a3d3053e642c7fa1"
          effect_ids: []
          event_digests:
            - "sha256:5b321fac888d460bc1870436a3cd510337f8abb53264a15213ec11278ffa666a"
          mutation_id: "result:sha256:b08361acbe888c8123a97ee3479d11a96ad2305114707e466537ae9d3f290a3e"
        result:sha256:e4b814b745b851e17eba253007d75c7995c5e2e8c523fb12482a30e9250f651d:
          after_revision: 23
          aggregate_digest: "sha256:a316e6c8933259701f75d758c28b626dea3343ed38d9bb7b907ea276a8542f67"
          before_revision: 22
          command_digest: "sha256:94a39cc8e94dae1bc19746777d867bd5feb91a6f5831f0ee2e7b4ebbb349d14d"
          effect_ids: []
          event_digests:
            - "sha256:1b6a2632c1072851eb0bb6a76b3712ddebe3b82c75d3ffbaf57e7622d93b3439"
          mutation_id: "result:sha256:e4b814b745b851e17eba253007d75c7995c5e2e8c523fb12482a30e9250f651d"
        result:sha256:f40c02511b2d155d6b895b088a82f69bf7bd0aadae953fdfacad75ba760e8c04:
          after_revision: 9
          aggregate_digest: "sha256:e1ec5e96480f4f0eae57fffb553bf876fd0508cde108de37f44bb565954c09d0"
          before_revision: 8
          command_digest: "sha256:0cc012f55803032967acb820ce082741006fe645321399f0eb20d92428fb30a6"
          effect_ids: []
          event_digests:
            - "sha256:7c8ff0f82a6e68d0046d7592111a0f8a981b11b5faabb457f12be4e935d337a6"
          mutation_id: "result:sha256:f40c02511b2d155d6b895b088a82f69bf7bd0aadae953fdfacad75ba760e8c04"
        sha256:1c5570af862f4aecaf0496f2fffbbf300f8823069a94e2d1632e1b745d0712cb:
          after_revision: 22
          aggregate_digest: "sha256:79696e8abe2a5233bc56def5ea7c8f5e15529238c22e72fe826058108d9ee3a5"
          before_revision: 21
          command_digest: "sha256:10b511efead41abd843e176f6d8c02b9c6cb4cb09ff39e9b517f8d71d56b9bd6"
          effect_ids: []
          event_digests:
            - "sha256:150caa1fd2189e204e9d8c3d39a0310fabcb8d02f36ef8be32a77db1447dae0c"
          mutation_id: "sha256:1c5570af862f4aecaf0496f2fffbbf300f8823069a94e2d1632e1b745d0712cb"
        sha256:6df8f2458bc8142fbe84700dbfb5c74bc6f06f25393d4e21df92952586c4e917:
          after_revision: 8
          aggregate_digest: "sha256:2533c30e861334976e2fa06edc8a890fefc1bed3e2f0b55049ba033167cb18d3"
          before_revision: 7
          command_digest: "sha256:10112c9a2abd4cd0da0b4ce83e9c4f91d6e38daae179e53b401bff0b26b8e2cb"
          effect_ids: []
          event_digests:
            - "sha256:14cbdadd91897abd3c9d628a038379340108c4c9cce7d3aceb747fcfe79c3959"
          mutation_id: "sha256:6df8f2458bc8142fbe84700dbfb5c74bc6f06f25393d4e21df92952586c4e917"
        sha256:becaed3eb4289dea29407a6e808fd690ac61a500ad309c4de9bb4696aef9b4e1:
          after_revision: 3
          aggregate_digest: "sha256:1acdc221751ffef1ec1ea3f3b83e62b8a0174a1612c21b194034d7bfd6bd35e5"
          before_revision: 2
          command_digest: "sha256:e666f345d4056f7d79842fd5c07ca8e66c1c2065de073366e5d1ae14b06b932f"
          effect_ids: []
          event_digests:
            - "sha256:31453e136284f03978b9cace11dc52f75af119733b262f3b40cfa3db1e8cf93e"
          mutation_id: "sha256:becaed3eb4289dea29407a6e808fd690ac61a500ad309c4de9bb4696aef9b4e1"
        sha256:c859c37582c20038266c46d00022dd1d70e126439ff6a8c2a587b1aefd1209c7:
          after_revision: 15
          aggregate_digest: "sha256:24fa03eb6d68cb22451457368b35b990de14a0593569e22903b942b9b8f0c4b4"
          before_revision: 14
          command_digest: "sha256:d17bf48dd5d418996dc2c65a0dc96ba3cfb20e1522de0307969ac4d274478099"
          effect_ids: []
          event_digests:
            - "sha256:645dc7ce2418fcbbe752ca10d91e135a0cce111a7f4ab0c70503590dd710b66d"
          mutation_id: "sha256:c859c37582c20038266c46d00022dd1d70e126439ff6a8c2a587b1aefd1209c7"
        sha256:d2b3cd8cc0fb281d6f56f50fa45fedec173153fa054d868120d8c2d0ce8f7c93:
          after_revision: 6
          aggregate_digest: "sha256:8f697024dbc9146aa2402d195396f603582485ba1377c13773de56ae800c4c1e"
          before_revision: 5
          command_digest: "sha256:d2efe53122df9af397b3403c6769536d5d78d71ad1af166d5eb2773c41d07f9c"
          effect_ids: []
          event_digests:
            - "sha256:dbb58b91d9619911323780d1c97103335ae092306cd3a5643da697efda8e91b7"
          mutation_id: "sha256:d2b3cd8cc0fb281d6f56f50fa45fedec173153fa054d868120d8c2d0ce8f7c93"
        validation-resolution:sha256:467525ef7dfa4895abd9eed0b33fee3212d4aecc7ec77019a851af0859cb4658:
          after_revision: 12
          aggregate_digest: "sha256:04bcce6e2e1882aef59654750e831ef174cdd6bb5133ae928e5037cf31b45432"
          before_revision: 11
          command_digest: "sha256:2415347ded6e8abf6c2174beb61b7c4e96d7e546bf07d62e664661815ccfcfdc"
          effect_ids: []
          event_digests:
            - "sha256:3d91c3c01ab672fd756d4a1ea9d7a67821b50dd3466c391bfb7a865d0f8bbad7"
          mutation_id: "validation-resolution:sha256:467525ef7dfa4895abd9eed0b33fee3212d4aecc7ec77019a851af0859cb4658"
        validation-resolution:sha256:a58c04681c1c89ed9a589f04d1a7278d31e5be823e548633a618ab41c871ff1c:
          after_revision: 19
          aggregate_digest: "sha256:6a67ec2fcb0fd3bc8cc486766e61db5cb91a858e24ac96c537bf2292404718bd"
          before_revision: 18
          command_digest: "sha256:5fb1fc28e0daa974ecd8be3d4c7946e522e24abd9b5cb41202ada1f25092f8ce"
          effect_ids: []
          event_digests:
            - "sha256:159f1de8fd873ecfb406c560d0578dc17fb2e2d57b7291be7f7fc506094d6041"
          mutation_id: "validation-resolution:sha256:a58c04681c1c89ed9a589f04d1a7278d31e5be823e548633a618ab41c871ff1c"
        validation-resolution:sha256:fd19ff51bbfc720a79a440f883cf706931716fe2072116aa37dedf45c41b2174:
          after_revision: 26
          aggregate_digest: "sha256:490f033709818bd05f2afb0378dabf75956557bdc0a8d7677313669ef44e770e"
          before_revision: 25
          command_digest: "sha256:35f5caca53af2a6f2aa36669814c3003d40684c2b730deb1dd403ff1a550594b"
          effect_ids: []
          event_digests:
            - "sha256:026b28af2ead3c75e8b5fbe7a492551fbc65947033e63a0dc7e375397824416d"
          mutation_id: "validation-resolution:sha256:fd19ff51bbfc720a79a440f883cf706931716fe2072116aa37dedf45c41b2174"
        validation:sha256:48c952e0eedd2f5850d3459c67184e6c4cf68bb53206e60cc0551e8370c47de7:
          after_revision: 25
          aggregate_digest: "sha256:8ef1c0db440be517b809cea6c952a661996d57de11bd284c16f7d3e336d10c00"
          before_revision: 24
          command_digest: "sha256:5395a3994f0f7072299941d96b064f4ac62fb7dbb42dacc77636c73a6a846aa6"
          effect_ids: []
          event_digests:
            - "sha256:bb20dee35186906db21b241838bc7a31441d4bd8d0becb2c07b7a6de53b25e75"
          mutation_id: "validation:sha256:48c952e0eedd2f5850d3459c67184e6c4cf68bb53206e60cc0551e8370c47de7"
        validation:sha256:bab94b7fa99b62f81d86c56d7008038a710cbbafa9762377a9aa5a1f07cb35cf:
          after_revision: 18
          aggregate_digest: "sha256:a60291254c041aed4e888b7316f8f9740ed3905db13527def5552bedd6fd45f2"
          before_revision: 17
          command_digest: "sha256:6abe08f96027c9d723a262683c3be646c30331eaa0ef2e3095697884ce3f573e"
          effect_ids: []
          event_digests:
            - "sha256:71bbff918191acacca6e6e95538b77c70bf9e73abbea6b1bdb7f2f0518365a47"
          mutation_id: "validation:sha256:bab94b7fa99b62f81d86c56d7008038a710cbbafa9762377a9aa5a1f07cb35cf"
        validation:sha256:f40c02511b2d155d6b895b088a82f69bf7bd0aadae953fdfacad75ba760e8c04:
          after_revision: 11
          aggregate_digest: "sha256:f5f36b89e4b987f46c1848773afb9122cde642af64edb4789d682c434e70c436"
          before_revision: 10
          command_digest: "sha256:ecac27faf5b6570dd2a2dba6052b2e5b95a31f53fe546c7e868bb2c0ad0d7c11"
          effect_ids: []
          event_digests:
            - "sha256:98f015d28df0d22d08473a420703f09bcb093a3449059b5a2d98fbd602b95e7c"
          mutation_id: "validation:sha256:f40c02511b2d155d6b895b088a82f69bf7bd0aadae953fdfacad75ba760e8c04"
      plan_history: []
      revision: 27
      schema_version: 1
      state: "FINAL_VALIDATION"
      work_items:
        native-stale-admission-retirement:
          attempt: 3
          claim_id: "sha256:91f16bdb04f9cdf3b4d54a162473a2187dfe577886a943c27129075d4362f332"
          definition:
            contract_digest: "sha256:430513ee9535ee63ad9455b1e578b9a8eb23d72d81a4c2eee2bdd901e4aec36b"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "public_api"
                - "security_boundary"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/stale-admission-retirement.command.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement-evidence.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement-validation.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement.test.ts"
                - "packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
                - "packages/agentplane/src/cli/run-cli/command-catalog/task.ts"
                - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
            expected_outputs:
              - "native-admission-retirement-source"
              - "native-admission-retirement-coverage"
            id: "native-stale-admission-retirement"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 3
              digest: "sha256:6da76619950aeab775f929a111ee8f81110b7c2a78c5442e6d0afd4c3a2c2a9b"
              id: "native-admission-retirement-source"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:7f37237c859830b57f1668ca8f7bdd82482ba41a5cde9ec6c37dbb3dac8936e6"
              task_id: "202611010728-AV4G8P"
              work_item_id: "native-stale-admission-retirement"
            -
              attempt: 3
              digest: "sha256:45df52da58d3bfc2c33c9fe8311687a82687bc412cfd554513bd83f1495bc49b"
              id: "native-admission-retirement-coverage"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:7f37237c859830b57f1668ca8f7bdd82482ba41a5cde9ec6c37dbb3dac8936e6"
              task_id: "202611010728-AV4G8P"
              work_item_id: "native-stale-admission-retirement"
          result_digest: "sha256:d6c5d02d1b831d7b9ecf2c051d0bb266df0d2dc0e71cd5c7f216a1ba4652169c"
          revision: 19
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:48f60329e3247133700c2743c017169a08db2cce5cb5b77adba67b8a12a80256"
              - "sha256:169b3174761825be1de229cc614b5301236b82c17047104f696903fbdb238adc"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:c48eb89b3e6a3d51df88185cda0fd4c7f37e7ca94584b8566cb112d8824bf0e2"
              environment_digest: "sha256:893106cef5246f929ca650908dc12252cb149fd79df1ec71f7173ad4d698438b"
              implementation_identity: "sha256:d6c5d02d1b831d7b9ecf2c051d0bb266df0d2dc0e71cd5c7f216a1ba4652169c"
              toolchain_digest: "sha256:d2c612397df84c985d305c9e00234d88e65624eefb509b6cf6045ed92e3f5918"
            observed_at: "2026-11-01T09:44:53.883Z"
            status: "PASSED"
    digest: "sha256:54a83f601c2a64374c37bc621bca421c62fa5ae81f85acaf51797918d682977d"
    documents:
      contracts:
        sha256:430513ee9535ee63ad9455b1e578b9a8eb23d72d81a4c2eee2bdd901e4aec36b:
          acceptance_criteria:
            - "Add one bounded public native operator preview/apply command for exact stale writable semantic admissions. Apply only when the caller confirms an exact native preview, the original checkout is absent, the Task is a genuine revision-split quarantine candidate, and repository/source/policy/operation/WorkOrder/exchange/result pins are fresh. Do not hardcode the four production Task IDs in source or tests."
            - "Require the original single latest EXECUTOR agent_episode intent, matching issued or result_received implementation(_rework) exchange and immutable WorkOrder identity. Refuse external-side-effect authority, effect_in_doubt, accepted/consumed or checkpointed exchanges, live owner checkouts and active execution leases. Keep all existing migration admission and runtime guards unchanged."
            - "Under the existing task execution fence, use the existing native state-drift intent retirement and journal CAS plus retired exchange acknowledgement. Revoke only future admission. Record unknown prior effects as unassessed; never use applied/not_applied for unknown effects or change historical Task/Plan/WorkItems/DONE/PASS/CANCELLED. Preserve genuine old results and WorkOrders."
            - "Write exact source, journal, WorkOrder, exchange and result-or-absence beforeimages in a protected contained native evidence directory before any mutation. Persist exact planned afterimages and a strict source/policy/operation-bound transaction identity. Interrupted replay must accept only the exact prepared before/afterimages, refuse foreign/partial/changed data, and reconcile once without replaying old work. Keep final receipts auditable and idempotent."
            - "Use stable no-follow contained reads and immutable native evidence writes. Reject traversal, directory or leaf symlinks, hard links, changed policy/source/owner/result/operation and active lease races. Support configured workflow/worktree directories and preserve unrelated paths."
            - "Verify real native quarantine admission and raw-byte rollback after retirement while the old exchange stays retired. Verify late returned results cannot be accepted, including the unanswered exchange case. Keep unknown outcome diagnostics and all exact beforeimages."
            - "Cover success and already-retired replay, no-result and genuine-result cases, every interruption boundary, no partial writes on refusal, tamper, foreign identity, external authority, source/policy/checkout drift, path safety and concurrent apply/active lease with meaningful unit/integration tests and the actual public CLI entrypoint. Preserve existing assertions, budgets and CI policy."
            - "Complete all three declared mandatory checks and fresh independent EVALUATOR on exact current source, then canonical protected PR/merge and current CLI qualification. Do not apply retirement or quarantine to actual Factory Tasks, run host effects, change credentials or claim SB deployment/live acceptance inside this source implementation episode. Preserve all old Tasks, source branches/worktrees, native journals/receipts, backups and user files."
          objective: "Implement and verify exact, recoverable native revocation of stale writable semantic admissions before legacy revision-split quarantine, preserving diagnostics and all guards."
          role: "EXECUTOR"
          verification_commands:
            - "bun run ci:local:full"
            - "bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts"
            - "bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts"
      intent:
        context: "Implement a bounded public native operator recovery to revoke only stale writable external semantic admissions before revision-split quarantine. Initial approved application targets are Factory BPA49V,778NR2,G6MVKS,BCJRWK. Preserve exact Task/journal/WorkOrder/exchange/result beforeimages, old results and receipts; never execute old WorkItems or assign historical DONE/PASS/CANCELLED, and never classify an unknown effect applied/not_applied. Require exact current repository/source/policy/operation pins, missing original checkout and no external-effect authority or active execution lease. Use native retired exchange and journal CAS under the common execution fence, durable prepared/afterimage receipts and strict crash/duplicate/drift/tamper/concurrency refusal. Reuse existing native retirement primitives without weakening migration admission or runtime guards. Validate rollback cannot reactivate retired admission. No Factory application until this source task passes native mandatory checks, fresh independent EVALUATOR, protected canonical PR/merge and current CLI qualification. Keep existing branches/worktrees and all runtime data/credentials. User explicitly approved this extension and the all8 PR/merge/deploy outcome."
        objective: "Retire stale writable semantic admissions before legacy quarantine"
    events:
      -
        command_digest: "sha256:da2757c3061bd617c119fcc715565a2c65dced314edeeac4ab6d52645d1aef01"
        id: "capture:202611010728-AV4G8P:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202611010728-AV4G8P"
        occurred_at: "2026-11-01T07:28:07.253Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202611010728-AV4G8P"
        task_revision: 1
      -
        command_digest: "sha256:5223333e60bd64f4ce9e98a35916a2573766293500e4c3e3a3d3053e642c7fa1"
        id: "result:sha256:b08361acbe888c8123a97ee3479d11a96ad2305114707e466537ae9d3f290a3e:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:b08361acbe888c8123a97ee3479d11a96ad2305114707e466537ae9d3f290a3e"
        occurred_at: "2026-11-01T07:31:35.597Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202611010728-AV4G8P"
        task_revision: 2
      -
        command_digest: "sha256:e666f345d4056f7d79842fd5c07ca8e66c1c2065de073366e5d1ae14b06b932f"
        id: "sha256:becaed3eb4289dea29407a6e808fd690ac61a500ad309c4de9bb4696aef9b4e1:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:becaed3eb4289dea29407a6e808fd690ac61a500ad309c4de9bb4696aef9b4e1"
        occurred_at: "2026-11-01T07:32:36.588Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202611010728-AV4G8P"
        task_revision: 3
      -
        command_digest: "sha256:73d5c40469108269df17371c79964526f2840b83b5de7e53df7f30f82d24d55b"
        id: "kernel_work_item_materialization_required:sha256:163c2bc55e4b61124d7040c1e80dc98aac99d3ce426e081779c97d048087e6b8:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:163c2bc55e4b61124d7040c1e80dc98aac99d3ce426e081779c97d048087e6b8:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        occurred_at: "2026-11-01T07:32:42.042Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202611010728-AV4G8P"
        task_revision: 4
      -
        command_digest: "sha256:cd33d2477067d3c35f9a03ed18028620f97329d20895f2cd0f102d337a8985cb"
        id: "kernel_work_item_claim_required:sha256:7a8e85d7027fecdb0ebfb92aaf3a3d0b9485ff93405a9e6e5d9d5e1578338fc1:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7a8e85d7027fecdb0ebfb92aaf3a3d0b9485ff93405a9e6e5d9d5e1578338fc1:sha256:b2dafc80f5179630c3fa1d9a943accc292707158c63e54f8ec906677ff1ca1a0"
        occurred_at: "2026-11-01T07:32:47.587Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202611010728-AV4G8P"
        task_revision: 5
      -
        command_digest: "sha256:d2efe53122df9af397b3403c6769536d5d78d71ad1af166d5eb2773c41d07f9c"
        id: "sha256:d2b3cd8cc0fb281d6f56f50fa45fedec173153fa054d868120d8c2d0ce8f7c93:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:d2b3cd8cc0fb281d6f56f50fa45fedec173153fa054d868120d8c2d0ce8f7c93"
        occurred_at: "2026-11-01T07:36:52.192Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202611010728-AV4G8P"
        task_revision: 6
      -
        command_digest: "sha256:918a56abd628d2f414c207ad96abdce73500a74a411288a619c97f0a223fa8ce"
        id: "kernel_work_item_execution_required:sha256:2abf062cbb16c46f0bde155ac8d68a0ca1446869b079bbcb0df982168096b505:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:2abf062cbb16c46f0bde155ac8d68a0ca1446869b079bbcb0df982168096b505:sha256:2b205b191e8c1c0b1baaf4db603ccb12880bf9c83f2d07e57c4596252a199e62"
        occurred_at: "2026-11-01T07:36:54.781Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202611010728-AV4G8P"
        task_revision: 7
      -
        command_digest: "sha256:10112c9a2abd4cd0da0b4ce83e9c4f91d6e38daae179e53b401bff0b26b8e2cb"
        id: "sha256:6df8f2458bc8142fbe84700dbfb5c74bc6f06f25393d4e21df92952586c4e917:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:6df8f2458bc8142fbe84700dbfb5c74bc6f06f25393d4e21df92952586c4e917"
        occurred_at: "2026-11-01T08:22:44.361Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202611010728-AV4G8P"
        task_revision: 8
      -
        command_digest: "sha256:0cc012f55803032967acb820ce082741006fe645321399f0eb20d92428fb30a6"
        id: "result:sha256:f40c02511b2d155d6b895b088a82f69bf7bd0aadae953fdfacad75ba760e8c04:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:f40c02511b2d155d6b895b088a82f69bf7bd0aadae953fdfacad75ba760e8c04"
        occurred_at: "2026-11-01T08:22:46.932Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202611010728-AV4G8P"
        task_revision: 9
      -
        command_digest: "sha256:dd1b90ed43e2e00c8dd0599e2fe2161a2ff80f10090ebee9acfd214d7f2d303a"
        id: "kernel_work_item_inspection_required:sha256:bff1f53bed870ded04ac5bd041dd7c6450c661bdc08568067b137f935fe99521:sha256:f42c80bab9ab0bf23a7f0cb5e04072a1b1f897226c7ac2843d0a742b59501bc2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:bff1f53bed870ded04ac5bd041dd7c6450c661bdc08568067b137f935fe99521:sha256:f42c80bab9ab0bf23a7f0cb5e04072a1b1f897226c7ac2843d0a742b59501bc2"
        occurred_at: "2026-11-01T08:22:48.941Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202611010728-AV4G8P"
        task_revision: 10
      -
        command_digest: "sha256:ecac27faf5b6570dd2a2dba6052b2e5b95a31f53fe546c7e868bb2c0ad0d7c11"
        id: "validation:sha256:f40c02511b2d155d6b895b088a82f69bf7bd0aadae953fdfacad75ba760e8c04:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:f40c02511b2d155d6b895b088a82f69bf7bd0aadae953fdfacad75ba760e8c04"
        occurred_at: "2026-11-01T08:26:52.620Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202611010728-AV4G8P"
        task_revision: 11
      -
        command_digest: "sha256:2415347ded6e8abf6c2174beb61b7c4e96d7e546bf07d62e664661815ccfcfdc"
        id: "validation-resolution:sha256:467525ef7dfa4895abd9eed0b33fee3212d4aecc7ec77019a851af0859cb4658:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:467525ef7dfa4895abd9eed0b33fee3212d4aecc7ec77019a851af0859cb4658"
        occurred_at: "2026-11-01T08:26:54.911Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202611010728-AV4G8P"
        task_revision: 12
      -
        command_digest: "sha256:acc3ed8dffd4700a53588f1d9f9641e8442650da85bd3c9b683b33a878e9c4fa"
        id: "kernel_work_item_rework_claim_required:sha256:e87d760e5614d1de6965b60bcb32b5a49f5656652e3a404fc911baf668ab7cb3:sha256:f42c80bab9ab0bf23a7f0cb5e04072a1b1f897226c7ac2843d0a742b59501bc2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:e87d760e5614d1de6965b60bcb32b5a49f5656652e3a404fc911baf668ab7cb3:sha256:f42c80bab9ab0bf23a7f0cb5e04072a1b1f897226c7ac2843d0a742b59501bc2"
        occurred_at: "2026-11-01T08:26:59.060Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202611010728-AV4G8P"
        task_revision: 13
      -
        command_digest: "sha256:dff6e42199089b043842152f2c0dd02c939c1552cab2ad12f1c3546664d6843e"
        id: "kernel_work_item_execution_required:sha256:8d342d098b7a017af6e070326ff721b7d4997722818dd73ca0bf8dbf4b52157c:sha256:f42c80bab9ab0bf23a7f0cb5e04072a1b1f897226c7ac2843d0a742b59501bc2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:8d342d098b7a017af6e070326ff721b7d4997722818dd73ca0bf8dbf4b52157c:sha256:f42c80bab9ab0bf23a7f0cb5e04072a1b1f897226c7ac2843d0a742b59501bc2"
        occurred_at: "2026-11-01T08:27:02.450Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202611010728-AV4G8P"
        task_revision: 14
      -
        command_digest: "sha256:d17bf48dd5d418996dc2c65a0dc96ba3cfb20e1522de0307969ac4d274478099"
        id: "sha256:c859c37582c20038266c46d00022dd1d70e126439ff6a8c2a587b1aefd1209c7:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:c859c37582c20038266c46d00022dd1d70e126439ff6a8c2a587b1aefd1209c7"
        occurred_at: "2026-11-01T08:41:30.255Z"
        payload_digest: "sha256:0dee17456bb2c2db11e3bbdf36423b089c9680a33f0bc1f46dbca0515ff60d9b"
        task_id: "202611010728-AV4G8P"
        task_revision: 15
      -
        command_digest: "sha256:55a8bf00c44b32cc6df9eb7d41e4f7e734a6ab9fa841c88022e7a1cd2880c98b"
        id: "result:sha256:678f87d25259bd854e7594f572c6f8d77cfaa0b7e40368a8dfe8f0b15f5eb32a:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:678f87d25259bd854e7594f572c6f8d77cfaa0b7e40368a8dfe8f0b15f5eb32a"
        occurred_at: "2026-11-01T08:41:32.808Z"
        payload_digest: "sha256:65ed57f35d56cd4d5fe4a04e740d17ef559994be45d975af0038865264a2e057"
        task_id: "202611010728-AV4G8P"
        task_revision: 16
      -
        command_digest: "sha256:35410eb5fe3f30ae2b6efa1c56a8ed9030be43e89a4e0e8aea2617271beb027b"
        id: "kernel_work_item_inspection_required:sha256:55601d5fa05612d398d3fba675dacda012c99fae34c490403a877a25514daf70:sha256:80fba7e82218cef323437c7767eed7c817455585c0c2a9f52bf727ac10cb5176:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:55601d5fa05612d398d3fba675dacda012c99fae34c490403a877a25514daf70:sha256:80fba7e82218cef323437c7767eed7c817455585c0c2a9f52bf727ac10cb5176"
        occurred_at: "2026-11-01T08:41:34.802Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202611010728-AV4G8P"
        task_revision: 17
      -
        command_digest: "sha256:6abe08f96027c9d723a262683c3be646c30331eaa0ef2e3095697884ce3f573e"
        id: "validation:sha256:bab94b7fa99b62f81d86c56d7008038a710cbbafa9762377a9aa5a1f07cb35cf:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:bab94b7fa99b62f81d86c56d7008038a710cbbafa9762377a9aa5a1f07cb35cf"
        occurred_at: "2026-11-01T09:16:21.871Z"
        payload_digest: "sha256:34fb2c7df7c3ffe366b6efd5f6512645a1724b637b6d1619a9bdf5f199c6773d"
        task_id: "202611010728-AV4G8P"
        task_revision: 18
      -
        command_digest: "sha256:5fb1fc28e0daa974ecd8be3d4c7946e522e24abd9b5cb41202ada1f25092f8ce"
        id: "validation-resolution:sha256:a58c04681c1c89ed9a589f04d1a7278d31e5be823e548633a618ab41c871ff1c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:a58c04681c1c89ed9a589f04d1a7278d31e5be823e548633a618ab41c871ff1c"
        occurred_at: "2026-11-01T09:16:23.206Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202611010728-AV4G8P"
        task_revision: 19
      -
        command_digest: "sha256:c623833e9d0835f3c9a9ea7865bab8de7d6421e824fa6f17c14b3e1b13494e3a"
        id: "kernel_work_item_rework_claim_required:sha256:86ab6a3586b14ea07cd607eb7b4e25c03e5f2f401442299bde0c71e68b01251b:sha256:80fba7e82218cef323437c7767eed7c817455585c0c2a9f52bf727ac10cb5176:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:86ab6a3586b14ea07cd607eb7b4e25c03e5f2f401442299bde0c71e68b01251b:sha256:80fba7e82218cef323437c7767eed7c817455585c0c2a9f52bf727ac10cb5176"
        occurred_at: "2026-11-01T09:16:25.797Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202611010728-AV4G8P"
        task_revision: 20
      -
        command_digest: "sha256:f2989dbf534503546f22391e2c55d9c0f54bbce11bf45c0770ea6778c41cfa72"
        id: "kernel_work_item_execution_required:sha256:43911d0a384f2a4c037a9d3b8af07513f3cd24b12d33ae6dc70019e616f87fda:sha256:80fba7e82218cef323437c7767eed7c817455585c0c2a9f52bf727ac10cb5176:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:43911d0a384f2a4c037a9d3b8af07513f3cd24b12d33ae6dc70019e616f87fda:sha256:80fba7e82218cef323437c7767eed7c817455585c0c2a9f52bf727ac10cb5176"
        occurred_at: "2026-11-01T09:16:27.716Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202611010728-AV4G8P"
        task_revision: 21
      -
        command_digest: "sha256:10b511efead41abd843e176f6d8c02b9c6cb4cb09ff39e9b517f8d71d56b9bd6"
        id: "sha256:1c5570af862f4aecaf0496f2fffbbf300f8823069a94e2d1632e1b745d0712cb:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:1c5570af862f4aecaf0496f2fffbbf300f8823069a94e2d1632e1b745d0712cb"
        occurred_at: "2026-11-01T09:20:18.581Z"
        payload_digest: "sha256:be3663b3e19de3c102755ce6c68afb0345ff05ad1ecd659f29a48e6a01df736c"
        task_id: "202611010728-AV4G8P"
        task_revision: 22
      -
        command_digest: "sha256:94a39cc8e94dae1bc19746777d867bd5feb91a6f5831f0ee2e7b4ebbb349d14d"
        id: "result:sha256:e4b814b745b851e17eba253007d75c7995c5e2e8c523fb12482a30e9250f651d:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:e4b814b745b851e17eba253007d75c7995c5e2e8c523fb12482a30e9250f651d"
        occurred_at: "2026-11-01T09:20:21.148Z"
        payload_digest: "sha256:8616b9f83d607f1119c194aad6af7084d8925066e7ba614d8401bb05a478712f"
        task_id: "202611010728-AV4G8P"
        task_revision: 23
      -
        command_digest: "sha256:4e08aaa4401ac194b051068e78c7777782568d48762ce9f63a364755a635bb50"
        id: "kernel_work_item_inspection_required:sha256:b8efd4490f76461abf05e28be092d1345764fd5ca83b0eb54f4e6332ebc11448:sha256:7f37237c859830b57f1668ca8f7bdd82482ba41a5cde9ec6c37dbb3dac8936e6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:b8efd4490f76461abf05e28be092d1345764fd5ca83b0eb54f4e6332ebc11448:sha256:7f37237c859830b57f1668ca8f7bdd82482ba41a5cde9ec6c37dbb3dac8936e6"
        occurred_at: "2026-11-01T09:20:23.128Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202611010728-AV4G8P"
        task_revision: 24
      -
        command_digest: "sha256:5395a3994f0f7072299941d96b064f4ac62fb7dbb42dacc77636c73a6a846aa6"
        id: "validation:sha256:48c952e0eedd2f5850d3459c67184e6c4cf68bb53206e60cc0551e8370c47de7:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:48c952e0eedd2f5850d3459c67184e6c4cf68bb53206e60cc0551e8370c47de7"
        occurred_at: "2026-11-01T09:44:55.838Z"
        payload_digest: "sha256:b7dfeba2c66f92469d3a331d0dfa3fc1839e94463950c91888ac11bb0969c176"
        task_id: "202611010728-AV4G8P"
        task_revision: 25
      -
        command_digest: "sha256:35f5caca53af2a6f2aa36669814c3003d40684c2b730deb1dd403ff1a550594b"
        id: "validation-resolution:sha256:fd19ff51bbfc720a79a440f883cf706931716fe2072116aa37dedf45c41b2174:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:fd19ff51bbfc720a79a440f883cf706931716fe2072116aa37dedf45c41b2174"
        occurred_at: "2026-11-01T09:44:57.159Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202611010728-AV4G8P"
        task_revision: 26
      -
        command_digest: "sha256:643a47be95a5c9bca9c7561df4e0eeeae39f63dc9dac9dd46d22e93d3a0504b8"
        id: "final-validation:sha256:09b856f86aa918c809f5f763b4c0db5068af5b34b53b2af959f9254b302c7751:26:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:09b856f86aa918c809f5f763b4c0db5068af5b34b53b2af959f9254b302c7751:26"
        occurred_at: "2026-11-01T10:07:33.299Z"
        payload_digest: "sha256:f40c41744efae91e24b755999b5d2f9e67da828ecaafd7273a47cb2ad04b20cf"
        task_id: "202611010728-AV4G8P"
        task_revision: 27
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Retire stale writable semantic admissions before legacy quarantine

Implement a bounded public native operator recovery to revoke only stale writable external semantic admissions before revision-split quarantine. Initial approved application targets are Factory BPA49V,778NR2,G6MVKS,BCJRWK. Preserve exact Task/journal/WorkOrder/exchange/result beforeimages, old results and receipts; never execute old WorkItems or assign historical DONE/PASS/CANCELLED, and never classify an unknown effect applied/not_applied. Require exact current repository/source/policy/operation pins, missing original checkout and no external-effect authority or active execution lease. Use native retired exchange and journal CAS under the common execution fence, durable prepared/afterimage receipts and strict crash/duplicate/drift/tamper/concurrency refusal. Reuse existing native retirement primitives without weakening migration admission or runtime guards. Validate rollback cannot reactivate retired admission. No Factory application until this source task passes native mandatory checks, fresh independent EVALUATOR, protected canonical PR/merge and current CLI qualification. Keep existing branches/worktrees and all runtime data/credentials. User explicitly approved this extension and the all8 PR/merge/deploy outcome.

## Scope

- In scope: Implement a bounded public native operator recovery to revoke only stale writable external semantic admissions before revision-split quarantine. Initial approved application targets are Factory BPA49V,778NR2,G6MVKS,BCJRWK. Preserve exact Task/journal/WorkOrder/exchange/result beforeimages, old results and receipts; never execute old WorkItems or assign historical DONE/PASS/CANCELLED, and never classify an unknown effect applied/not_applied. Require exact current repository/source/policy/operation pins, missing original checkout and no external-effect authority or active execution lease. Use native retired exchange and journal CAS under the common execution fence, durable prepared/afterimage receipts and strict crash/duplicate/drift/tamper/concurrency refusal. Reuse existing native retirement primitives without weakening migration admission or runtime guards. Validate rollback cannot reactivate retired admission. No Factory application until this source task passes native mandatory checks, fresh independent EVALUATOR, protected canonical PR/merge and current CLI qualification. Keep existing branches/worktrees and all runtime data/credentials. User explicitly approved this extension and the all8 PR/merge/deploy outcome.
- Out of scope: unrelated refactors not required for "Retire stale writable semantic admissions before legacy quarantine".

## Plan

1. Execute approved WorkItem native-stale-admission-retirement.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-11-01T10:07:34.127Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:bf26ec4fd7f1c36de7b8ad2363d46f73a847ae76872f1b50951ebaa5856adc19, input_digest=sha256:d2e3ec0d2583f1004c7a9a6eb4230f573fccbf4aa71c8a581bef0d43db3cc31f

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-1
Scope: branch_pr task 202611010728-AV4G8P Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts
Result: pass
Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-2
Scope: branch_pr task 202611010728-AV4G8P Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts
Result: pass
Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-3
Scope: branch_pr task 202611010728-AV4G8P Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-1
Scope: branch_pr task 202611010728-AV4G8P Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts
Result: pass
Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-2
Scope: branch_pr task 202611010728-AV4G8P Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts
Result: pass
Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-3
Scope: branch_pr task 202611010728-AV4G8P Verification Contract check critical_paths (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-1
Scope: branch_pr task 202611010728-AV4G8P Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-1
Scope: branch_pr task 202611010728-AV4G8P Verification Contract check real_e2e (1/3)

Check: real_e2e
Command: bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts
Result: pass
Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-2
Scope: branch_pr task 202611010728-AV4G8P Verification Contract check real_e2e (2/3)

Check: real_e2e
Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts
Result: pass
Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-3
Scope: branch_pr task 202611010728-AV4G8P Verification Contract check real_e2e (3/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-1
Scope: branch_pr task 202611010728-AV4G8P Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run test:fast packages/agentplane/src/commands/task/stale-admission-retirement.test.ts packages/agentplane/src/commands/task/stale-admission-retirement-recovery.test.ts packages/agentplane/src/commands/task/kernel-migration-admission.test.ts packages/agentplane/src/commands/task/kernel-migrate.quarantine.test.ts packages/agentplane/src/commands/task/external-agent-supervisor-recovery.test.ts
Result: pass
Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-2
Scope: branch_pr task 202611010728-AV4G8P Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run test:project cli-core packages/agentplane/src/cli/run-cli.core.stale-admission-retirement.test.ts
Result: pass
Evidence: .agentplane/tasks/202611010728-AV4G8P/supervision/declared-checks.json#check-3
Scope: branch_pr task 202611010728-AV4G8P Verification Contract check task_outcome (3/3)

NativeTaskIdentityRef:
- plan_digest: sha256:11ddab81d6756bb40ae2b7fa7f2dc8b31cf53c5b5fb160569978bcbc5637cebb
- policy_digest: sha256:afcda1f51a320f9f13fd7af39ac9bf6788c0495770b3cb3a798b7b65aedd2593
- capability_digest: sha256:b838864bcbcaf2b8a840126c7ca52120e5a1135148807ff1d4ee58dbf6938086
- checks_digest: sha256:8ba2d268a0e379f5ff0530453b005c9f432b3558341888589dbd97038221176c
- identity_digest: sha256:a3b77fed3a8f9997ae79b28b2568a1e6027d3abf36c2db13bc694448d7206192

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202611010728-AV4G8P
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
