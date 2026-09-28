---
id: "202609281457-R0XP40"
title: "Fix release candidate preparation order before 0.7.12 publication"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-28T15:34:46.910Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-28T17:06:56.354Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-28T15:34:16.688Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "054771d7822e484c4eeb4ed6a89a7d93c715b639"
  review_identity_digest: "sha256:983d5998d67d9419ccea32fb02fc3dd407e4d984727a692bb7b8b32ba526cfd6"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609281457-R0XP40/6111e5c6ea673b274daa0621f107cf0bf7e26a3141db2e88c9c18ca23236a982/quality-report.json"
  findings:
    - "Validated canonical digests for the accepted implementation result, repository evidence and native validation. Recomputed the declared two-file patch digest from commit 054771d7822e484c4eeb4ed6a89a7d93c715b639 and its parent; it matches."
    - "Native validation records 24 passing release CI contract tests, ESLint exit 0 and typecheck exit 0."
    - "Source inspection confirms no version generator runs before native candidate. Requested-version mismatch and malformed version metadata stop before registry and candidate. The selected plan directory is explicit, so a later unrelated latest plan cannot silently change the selected candidate."
    - "Only the two declared implementation/test paths changed; task and PR artifacts were written by the controller."
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
    allowed_capabilities:
      - "repository_write"
      - "task.verify"
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
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
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "docs/releases"
      - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
      - "scripts/release/candidate-prepare.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "docs/releases"
      - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
      - "scripts/release/candidate-prepare.mjs"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
      - "scripts/release/candidate-prepare.mjs"
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
          - "docs/releases"
          - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
          - "scripts/release/candidate-prepare.mjs"
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
          reversibility: "reversible"
      digest: "sha256:b3e62a3d0edf90ccf815a81da3c98306bfe652dfacad8aa3d511e182cb6c0dd4"
      escalation_reasons:
        - "central_component:scripts/release/candidate-prepare.mjs"
        - "central_path:scripts/release/candidate-prepare.mjs"
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
          - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
          - "scripts/release/candidate-prepare.mjs"
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
  hash: "054771d7822e484c4eeb4ed6a89a7d93c715b639"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-09-28T17:06:56.354Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-09-28T17:06:57.198Z"
doc_updated_by: "SUPERVISOR"
description: "User-authorized release blocker repair. The candidate wrapper currently runs release plan, then version:bump --write, then release candidate. Native release candidate correctly requires a clean tracked tree and plan.prevVersion; the wrapper violates both preconditions. Reproduce with a focused regression test. Preserve native candidate ownership of version mutation, exact requested target validation, registry availability checks, task registry and incident gates, protected-branch publication, and all required prepublish checks. Do not weaken native preflight or publish locally. Coordinate integration after feature task 202609261720-KKE9ZN. Do not delete any GitHub repository."
sections:
  Summary: |-
    Fix release candidate preparation order before 0.7.12 publication

    User-authorized release blocker repair. The candidate wrapper currently runs release plan, then version:bump --write, then release candidate. Native release candidate correctly requires a clean tracked tree and plan.prevVersion; the wrapper violates both preconditions. Reproduce with a focused regression test. Preserve native candidate ownership of version mutation, exact requested target validation, registry availability checks, task registry and incident gates, protected-branch publication, and all required prepublish checks. Do not weaken native preflight or publish locally. Coordinate integration after feature task 202609261720-KKE9ZN. Do not delete any GitHub repository.
  Scope: |-
    - In scope: User-authorized release blocker repair. The candidate wrapper currently runs release plan, then version:bump --write, then release candidate. Native release candidate correctly requires a clean tracked tree and plan.prevVersion; the wrapper violates both preconditions. Reproduce with a focused regression test. Preserve native candidate ownership of version mutation, exact requested target validation, registry availability checks, task registry and incident gates, protected-branch publication, and all required prepublish checks. Do not weaken native preflight or publish locally. Coordinate integration after feature task 202609261720-KKE9ZN. Do not delete any GitHub repository.
    - Out of scope: unrelated refactors not required for "Fix release candidate preparation order before 0.7.12 publication".
  Plan: "1. Execute approved WorkItem RC-01."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-28T17:06:56.354Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c10ae2c6003ea7e2499b9dac10caf992fe31e3cdc88f0184c73f8f6559d36e30, input_digest=sha256:28edbc398e6f71a78d6420d8dd18a0ae70fffb7c9f143e0bc59d6e4fa319bb62

    Details:

    Check: affected_unit_integration
    Command: bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check affected_unit_integration (1/6)

    Check: affected_unit_integration
    Command: bunx eslint scripts/release/candidate-prepare.mjs packages/agentplane/src/commands/release/release-ci-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check affected_unit_integration (2/6)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check affected_unit_integration (3/6)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check affected_unit_integration (4/6)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check affected_unit_integration (5/6)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check affected_unit_integration (6/6)

    Check: critical_paths
    Command: bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check critical_paths (1/6)

    Check: critical_paths
    Command: bunx eslint scripts/release/candidate-prepare.mjs packages/agentplane/src/commands/release/release-ci-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check critical_paths (2/6)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check critical_paths (3/6)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check critical_paths (4/6)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check critical_paths (5/6)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check critical_paths (6/6)

    Check: docs_contract
    Command: bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check docs_contract (1/6)

    Check: docs_contract
    Command: bunx eslint scripts/release/candidate-prepare.mjs packages/agentplane/src/commands/release/release-ci-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check docs_contract (2/6)

    Check: docs_contract
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check docs_contract (3/6)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check docs_contract (4/6)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check docs_contract (5/6)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check docs_contract (6/6)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check task_outcome (1/6)

    Check: task_outcome
    Command: bunx eslint scripts/release/candidate-prepare.mjs packages/agentplane/src/commands/release/release-ci-contract.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check task_outcome (2/6)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check task_outcome (3/6)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check task_outcome (4/6)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check task_outcome (5/6)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202609281457-R0XP40 Verification Contract check task_outcome (6/6)

    NativeTaskIdentityRef:
    - plan_digest: sha256:79ee3cdeb87a823a6377803c9059ccf3b7490d373e0be95cf1b76708c0740816
    - policy_digest: sha256:1150ba6caefe9e829c30b3520b9246ed1ec7ebbeedbe788c63cf7989015dbb46
    - capability_digest: sha256:01c3b99194c48be1e014a87d37b0940dd7aff9e7f608847dfafae14f9252117c
    - checks_digest: sha256:c524077109815429ec1826d89e688fb01f4ae569a2e15e6feecb3562d35bed42
    - identity_digest: sha256:b1e22282fc69f998afbdaf62876c0e3140ff8efd646f1e93c54a6ad74670c82f

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
    digest: "sha256:7058e395bf4c231b19d268dbd33453e40a77d25b8fd32ed78f0ebdc6f4214809"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609281457-R0XP40/6111e5c6ea673b274daa0621f107cf0bf7e26a3141db2e88c9c18ca23236a982/quality-report.json"
    findings:
      - "Validated canonical digests for the accepted implementation result, repository evidence and native validation. Recomputed the declared two-file patch digest from commit 054771d7822e484c4eeb4ed6a89a7d93c715b639 and its parent; it matches."
      - "Native validation records 24 passing release CI contract tests, ESLint exit 0 and typecheck exit 0."
      - "Source inspection confirms no version generator runs before native candidate. Requested-version mismatch and malformed version metadata stop before registry and candidate. The selected plan directory is explicit, so a later unrelated latest plan cannot silently change the selected candidate."
      - "Only the two declared implementation/test paths changed; task and PR artifacts were written by the controller."
    implementation_commit: "054771d7822e484c4eeb4ed6a89a7d93c715b639"
    implementation_tree: "28498feac3acd7db66c3793b271cfb7832e38756"
    projected_at: "2026-09-28T15:34:16.688Z"
    review_identity_digest: "sha256:983d5998d67d9419ccea32fb02fc3dd407e4d984727a692bb7b8b32ba526cfd6"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:e213038d140a7b4dc40967f3fc7fb6a49430212cac19fce59665ae75aa746381"
    work_order_id: "sha256:6af13b533083ae882e64256721e5ffd772660b74965932400dc006c52244a421"
  task_execution_context:
    base_ref: "main"
    base_sha: "81fc89167d9d7655bd29664849af6fa2eb4bb054"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:23c50a568d45b7d8b0e2b5239b7fe10a7af133943f295c45f56f57dc98fafeec"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:79ee3cdeb87a823a6377803c9059ccf3b7490d373e0be95cf1b76708c0740816"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:1dead8667830388ace6c8691ef9cb3c9274c9b23a3acfdc0bc82d0539393e507"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/releases"
              - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
              - "scripts/release/candidate-prepare.mjs"
            task_id: "202609281457-R0XP40"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a0765553348b893c82880cb5c45a027c1b8462f37a89bd65607110e0829325a8"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:79ee3cdeb87a823a6377803c9059ccf3b7490d373e0be95cf1b76708c0740816"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:1dead8667830388ace6c8691ef9cb3c9274c9b23a3acfdc0bc82d0539393e507"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:23c50a568d45b7d8b0e2b5239b7fe10a7af133943f295c45f56f57dc98fafeec"
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e8a92939990672bc6338736f02f6d04dca1d2167e28253ad37f5cd0bcd08e32c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs/releases"
              - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
              - "scripts/release/candidate-prepare.mjs"
            task_id: "202609281457-R0XP40"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "docs_contract"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
              - "scripts/release/candidate-prepare.mjs"
            evidence_digest: "sha256:f9126122965ce3d4e19e136b0890613060e6a7099c123fd6fe95353f01b39bb8"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:1dead8667830388ace6c8691ef9cb3c9274c9b23a3acfdc0bc82d0539393e507"
        digest: "sha256:79ee3cdeb87a823a6377803c9059ccf3b7490d373e0be95cf1b76708c0740816"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:99d3e6236c3e59f527d2ab49259a32d78dce6bfad7699cde035d2c4d07a852a4"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "scripts/release/candidate-prepare.mjs"
                - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
            expected_outputs:
              - "candidate-wrapper-repair"
            id: "RC-01"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:e213038d140a7b4dc40967f3fc7fb6a49430212cac19fce59665ae75aa746381"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:a1645a5a99c5d41cc560cb90130a050f037a9b36586caf3a1a2190bec9491960"
          environment_digest: "sha256:8adaaef512c4d884f7ee42c63c89db4f80cbd78850b11910318ece63b5ed51ec"
          implementation_identity: "sha256:e8a92939990672bc6338736f02f6d04dca1d2167e28253ad37f5cd0bcd08e32c"
          toolchain_digest: "sha256:70de5860a7e562cbed551ed294c7db07eec11b6479e13a91c4e60f24e2932040"
        observed_at: "2026-09-28T16:28:15.712Z"
        status: "PASSED"
      id: "202609281457-R0XP40"
      intent_digest: "sha256:57ddaf3c1bfcb5b5ba2f98b5b93f57d36503a7a526e5483d31f90199dbce22b7"
      migration_receipts: []
      mutation_receipts:
        capture:202609281457-R0XP40:
          after_revision: 1
          aggregate_digest: "sha256:b0b0da6b07486718175e343b1fd627e95441d4b11a83b76a7be6454fec70c504"
          before_revision: 0
          command_digest: "sha256:99b02188eefc435b34f27628736304262729cafc57575e0607239e62054af97a"
          effect_ids: []
          event_digests:
            - "sha256:59119943e93917fb7d6bc079332105d03a8ead5dd76db524cd6de739cc8d7ddf"
          mutation_id: "capture:202609281457-R0XP40"
        final-validation:sha256:e213038d140a7b4dc40967f3fc7fb6a49430212cac19fce59665ae75aa746381:11:
          after_revision: 12
          aggregate_digest: "sha256:80617906f1dc2c9bfeea45dc24f7c4c2949c29a9bfbf6030fee3196b54c15c96"
          before_revision: 11
          command_digest: "sha256:53d736c3f51dcfec5e63ee3ac4fdd97c0a1fb50d429b5cdaf25751d7c771048e"
          effect_ids: []
          event_digests:
            - "sha256:2da52c088848ff23e5c525b041bdc9aa5668f05253a1cdc4bca4ab34a9fcf3fa"
          mutation_id: "final-validation:sha256:e213038d140a7b4dc40967f3fc7fb6a49430212cac19fce59665ae75aa746381:11"
        kernel_task_completion_required:sha256:e4c5dbf6827f41112d42301a379ac6dfce6ba61e89283ca41aa02b6a813a3a6d:sha256:e8a92939990672bc6338736f02f6d04dca1d2167e28253ad37f5cd0bcd08e32c:
          after_revision: 13
          aggregate_digest: "sha256:f910b597609a3e4e9d61706a7d0fafff03e055360816a5f9b343309d28e2d441"
          before_revision: 12
          command_digest: "sha256:b3c77344af08f24f345a36d026e3b336a8081e2b7500ac4106fded96ac8c1572"
          effect_ids: []
          event_digests:
            - "sha256:c8f98cd1236ec275466a8e0387b580b18b0dd22ad8f965246fc78c841abb85e1"
          mutation_id: "kernel_task_completion_required:sha256:e4c5dbf6827f41112d42301a379ac6dfce6ba61e89283ca41aa02b6a813a3a6d:sha256:e8a92939990672bc6338736f02f6d04dca1d2167e28253ad37f5cd0bcd08e32c"
        kernel_work_item_claim_required:sha256:a6bec60c9d2ec47eb8020fcc808e0e9749ec666320c01f39376b7b8267a46bd0:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606:
          after_revision: 5
          aggregate_digest: "sha256:e1aa66e0a430fd0041aaa3189eb3d084f798f9278a1f91288508a73b7a6b62b4"
          before_revision: 4
          command_digest: "sha256:feea386976030eb390cc639f0f7518d559942033a98485a4f73c4963676fc0f4"
          effect_ids: []
          event_digests:
            - "sha256:a99f30b32a31bd4d8da46f094d311366a230aa6460cfac70df307e6868fc5271"
          mutation_id: "kernel_work_item_claim_required:sha256:a6bec60c9d2ec47eb8020fcc808e0e9749ec666320c01f39376b7b8267a46bd0:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
        kernel_work_item_execution_required:sha256:3a01fbe1f09a49e5aed358bf8eae1e5b6da0a4715f76be504e65b380840dcfb7:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606:
          after_revision: 6
          aggregate_digest: "sha256:205f7f53ae566e4ed23056db9323793cc0040629f6f252f8a6f7da9c94e05108"
          before_revision: 5
          command_digest: "sha256:539a2d7e163584558e463d9097bec851e0338d6c8131fb74dfc4347512139b70"
          effect_ids: []
          event_digests:
            - "sha256:53bdaa36a7d44cd753b76653f3edac19b2855e8f40f4d37b2910aa9adc30c291"
          mutation_id: "kernel_work_item_execution_required:sha256:3a01fbe1f09a49e5aed358bf8eae1e5b6da0a4715f76be504e65b380840dcfb7:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
        kernel_work_item_inspection_required:sha256:55eb70cf11f8055e9391d16d109cffe3d7f5abe16989cfd08bf47465bbe51c45:sha256:e8a92939990672bc6338736f02f6d04dca1d2167e28253ad37f5cd0bcd08e32c:
          after_revision: 9
          aggregate_digest: "sha256:0f07dbd496c36fd0049dc340193f4826a6e8d83d86e1a5f73f1be3f79645f7d9"
          before_revision: 8
          command_digest: "sha256:e3e9fee0ee5f89e986afdb0ae7453590e771540f8b53db8417ea8950219dd6d6"
          effect_ids: []
          event_digests:
            - "sha256:1591d252011b51ff238c0e945f16d72df831f10e0e3c3d3340533fe5b3499691"
          mutation_id: "kernel_work_item_inspection_required:sha256:55eb70cf11f8055e9391d16d109cffe3d7f5abe16989cfd08bf47465bbe51c45:sha256:e8a92939990672bc6338736f02f6d04dca1d2167e28253ad37f5cd0bcd08e32c"
        kernel_work_item_materialization_required:sha256:b5740ae9f0bc83aa0321d59325a7f989845012c1dc11792306c660b584e33297:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606:
          after_revision: 4
          aggregate_digest: "sha256:837fd7fc730004231016912dc7083f4b835a71b99ffa953beb27ad825626fd9b"
          before_revision: 3
          command_digest: "sha256:10297d451f44b80cb7b33196f8b6456a83bc65cf3d70a155e6196f8075a296ff"
          effect_ids: []
          event_digests:
            - "sha256:dc6ff24d2670ab8784b2b19eec98bae13653469b23483903e7e3c6a275e88b67"
          mutation_id: "kernel_work_item_materialization_required:sha256:b5740ae9f0bc83aa0321d59325a7f989845012c1dc11792306c660b584e33297:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
        result:sha256:6af13b533083ae882e64256721e5ffd772660b74965932400dc006c52244a421:
          after_revision: 8
          aggregate_digest: "sha256:92ba3ed030c0d4e84130a5625ab2ab7a0a5fc203dc21dac2abc9e5cca1480c7f"
          before_revision: 7
          command_digest: "sha256:33c4cc5266511036c89bf61b5a97b29bbcd57e76e6b4c7f024e04b2bc1c38294"
          effect_ids: []
          event_digests:
            - "sha256:83b8f3461cd7ab963a90f487d64d4f3c1acb86a276b66e1d00f45266a408eeeb"
          mutation_id: "result:sha256:6af13b533083ae882e64256721e5ffd772660b74965932400dc006c52244a421"
        result:sha256:7690c5b6ead2a9a0bb9334224837751742998ce8f224cae87ded824cfffc0229:
          after_revision: 2
          aggregate_digest: "sha256:d049b50bf0909757fe4f88dc004158012d6913c20f9c33b467a81628220235ce"
          before_revision: 1
          command_digest: "sha256:43d984ab36e66df249c1bf16208be14814bfaeef4aaa6442b94f05c41b87e897"
          effect_ids: []
          event_digests:
            - "sha256:4a79b6a2ccb15a1fa57120ef8809548b347ba0b27485a1d94890fb1955d2df35"
          mutation_id: "result:sha256:7690c5b6ead2a9a0bb9334224837751742998ce8f224cae87ded824cfffc0229"
        sha256:a83d4e4ab319140b397cc5576544ae7cbc40343ca90d4c80feacaecdd0ef428b:
          after_revision: 7
          aggregate_digest: "sha256:3a6e2b0839c72013e94bd94436e98ccf63364ad163fa03fa29bd5fac02f97eca"
          before_revision: 6
          command_digest: "sha256:ad0f061f3265889cb4d2fad86bd0befed2e1eb0964814557ae621f3b0e979ef6"
          effect_ids: []
          event_digests:
            - "sha256:f264f61ab6be297875096759cb51aab9cd332304afca40175c69a24e2add2688"
          mutation_id: "sha256:a83d4e4ab319140b397cc5576544ae7cbc40343ca90d4c80feacaecdd0ef428b"
        sha256:da201a6fda57a5b3454af3402c442184bdf228b7e3bfc541f176b42094db2ad3:
          after_revision: 3
          aggregate_digest: "sha256:33d8f5abb76ab52a5694f55c5eb2f6843eec99db636e923d774cabff3df1c045"
          before_revision: 2
          command_digest: "sha256:1c99ec908ccbcf602fdb44947950e26693d812c3a6c55e881f51de9122232acd"
          effect_ids: []
          event_digests:
            - "sha256:202a30098bac5cb541cfe9eb466a0ca945d2bd8798dad5e166b2d355c289e6f8"
          mutation_id: "sha256:da201a6fda57a5b3454af3402c442184bdf228b7e3bfc541f176b42094db2ad3"
        validation-resolution:sha256:68c72712a17e523150020f1364a8b4f06cb4d74cf77541c287e8d97fef6b5289:
          after_revision: 11
          aggregate_digest: "sha256:11f1dcca01dd5b623f02068322053b3aefeee46ade8ab3576d59117053081fac"
          before_revision: 10
          command_digest: "sha256:e91232dc2edb5d96436bc00ac2b59f67177864cbb07ce63e1cca3e28d12f0833"
          effect_ids: []
          event_digests:
            - "sha256:9b2e2bd1afd79b21273f74ede054e745663b37a9a99aa4d10914d919e82882a2"
          mutation_id: "validation-resolution:sha256:68c72712a17e523150020f1364a8b4f06cb4d74cf77541c287e8d97fef6b5289"
        validation:sha256:6111e5c6ea673b274daa0621f107cf0bf7e26a3141db2e88c9c18ca23236a982:
          after_revision: 10
          aggregate_digest: "sha256:b3f088f54c126b26c887d72a5de9c567191506190dcb526a6115ee2338ec354b"
          before_revision: 9
          command_digest: "sha256:6e5787c7bfeb125bd306aad3834c0ed4c431c31a46f133575d8e27ecf8306cb3"
          effect_ids: []
          event_digests:
            - "sha256:c2a87612bf5c9673440a0b6c80fa8b15f4f52f0e60de4ba8f33507d2c6160c1d"
          mutation_id: "validation:sha256:6111e5c6ea673b274daa0621f107cf0bf7e26a3141db2e88c9c18ca23236a982"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "COMPLETED"
      work_items:
        RC-01:
          attempt: 1
          claim_id: "sha256:51d26e9a4c5c3f12d972e01dbf4511a3db86882b85714e0492a6e0ffb00723b4"
          definition:
            contract_digest: "sha256:99d3e6236c3e59f527d2ab49259a32d78dce6bfad7699cde035d2c4d07a852a4"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "scripts/release/candidate-prepare.mjs"
                - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
            expected_outputs:
              - "candidate-wrapper-repair"
            id: "RC-01"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:606d6e4d1441d548bf793a8a0dd7c43d2c00438cfc1b86deb4a87b547274fe60"
              id: "candidate-wrapper-repair"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:e8a92939990672bc6338736f02f6d04dca1d2167e28253ad37f5cd0bcd08e32c"
              task_id: "202609281457-R0XP40"
              work_item_id: "RC-01"
          result_digest: "sha256:de549f87cec1f205c5c109b871346d07f6fcf276220ba2fab476ea091cf3077b"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:531431dc88858c986563e5fd097046c31e3cdc2676ad460885887c7ee2da85bc"
              - "sha256:983d5998d67d9419ccea32fb02fc3dd407e4d984727a692bb7b8b32ba526cfd6"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:a1645a5a99c5d41cc560cb90130a050f037a9b36586caf3a1a2190bec9491960"
              environment_digest: "sha256:fa76574346ade6c39d7b4f7ebbb2e5d41321d878a914dd02ca9ce157725aed7b"
              implementation_identity: "sha256:de549f87cec1f205c5c109b871346d07f6fcf276220ba2fab476ea091cf3077b"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-09-28T15:34:16.688Z"
            status: "PASSED"
    digest: "sha256:e2981426682e443b477ca5c2af096ecb1857a316737c9873611a8e75653c20fd"
    documents:
      contracts:
        sha256:99d3e6236c3e59f527d2ab49259a32d78dce6bfad7699cde035d2c4d07a852a4:
          acceptance_criteria:
            - "A regression test fails on the original wrapper because it changes version or tracked state before invoking native release candidate."
            - "The repaired wrapper invokes native candidate from the original clean version baseline and does not independently bump versions first."
            - "Explicit target mismatch, malformed planning output, invalid bump selection and push without --yes fail before candidate mutation. Dry-run and JSON inspection do not run commands."
            - "Registry, incident and prepublish checks are retained and existing release CI contract tests pass."
            - "Only the two authorized code/test paths change. No production publication or provider evidence is simulated."
          objective: "Repair scripts/release/candidate-prepare.mjs so the native release candidate command receives a clean tracked tree at the original release-plan version. Keep native ownership of version changes and commits. Validate an explicit --version against the actual planned next version before candidate mutation. Preserve task registry, incidents, registry availability and prepublish gates. Preserve --write dry-run behavior and --push --yes approval semantics. Add focused behavioral regression tests in the existing release CI contract test file. Use controlled local fixtures only. Do not run actual release lifecycle or network publication during this semantic episode. Return source and test evidence. Do not modify native preflight guards or GitHub repositories."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts"
            - "bunx eslint scripts/release/candidate-prepare.mjs packages/agentplane/src/commands/release/release-ci-contract.test.ts"
            - "bun run typecheck"
      intent:
        context: "User-authorized release blocker repair. The candidate wrapper currently runs release plan, then version:bump --write, then release candidate. Native release candidate correctly requires a clean tracked tree and plan.prevVersion; the wrapper violates both preconditions. Reproduce with a focused regression test. Preserve native candidate ownership of version mutation, exact requested target validation, registry availability checks, task registry and incident gates, protected-branch publication, and all required prepublish checks. Do not weaken native preflight or publish locally. Coordinate integration after feature task 202609261720-KKE9ZN. Do not delete any GitHub repository."
        objective: "Fix release candidate preparation order before 0.7.12 publication"
    events:
      -
        command_digest: "sha256:99b02188eefc435b34f27628736304262729cafc57575e0607239e62054af97a"
        id: "capture:202609281457-R0XP40:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609281457-R0XP40"
        occurred_at: "2026-09-28T14:57:56.632Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609281457-R0XP40"
        task_revision: 1
      -
        command_digest: "sha256:43d984ab36e66df249c1bf16208be14814bfaeef4aaa6442b94f05c41b87e897"
        id: "result:sha256:7690c5b6ead2a9a0bb9334224837751742998ce8f224cae87ded824cfffc0229:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:7690c5b6ead2a9a0bb9334224837751742998ce8f224cae87ded824cfffc0229"
        occurred_at: "2026-09-28T14:59:30.063Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609281457-R0XP40"
        task_revision: 2
      -
        command_digest: "sha256:1c99ec908ccbcf602fdb44947950e26693d812c3a6c55e881f51de9122232acd"
        id: "sha256:da201a6fda57a5b3454af3402c442184bdf228b7e3bfc541f176b42094db2ad3:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:da201a6fda57a5b3454af3402c442184bdf228b7e3bfc541f176b42094db2ad3"
        occurred_at: "2026-09-28T14:59:44.548Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609281457-R0XP40"
        task_revision: 3
      -
        command_digest: "sha256:10297d451f44b80cb7b33196f8b6456a83bc65cf3d70a155e6196f8075a296ff"
        id: "kernel_work_item_materialization_required:sha256:b5740ae9f0bc83aa0321d59325a7f989845012c1dc11792306c660b584e33297:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:b5740ae9f0bc83aa0321d59325a7f989845012c1dc11792306c660b584e33297:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
        occurred_at: "2026-09-28T14:59:59.854Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609281457-R0XP40"
        task_revision: 4
      -
        command_digest: "sha256:feea386976030eb390cc639f0f7518d559942033a98485a4f73c4963676fc0f4"
        id: "kernel_work_item_claim_required:sha256:a6bec60c9d2ec47eb8020fcc808e0e9749ec666320c01f39376b7b8267a46bd0:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a6bec60c9d2ec47eb8020fcc808e0e9749ec666320c01f39376b7b8267a46bd0:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
        occurred_at: "2026-09-28T15:00:18.944Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609281457-R0XP40"
        task_revision: 5
      -
        command_digest: "sha256:539a2d7e163584558e463d9097bec851e0338d6c8131fb74dfc4347512139b70"
        id: "kernel_work_item_execution_required:sha256:3a01fbe1f09a49e5aed358bf8eae1e5b6da0a4715f76be504e65b380840dcfb7:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:3a01fbe1f09a49e5aed358bf8eae1e5b6da0a4715f76be504e65b380840dcfb7:sha256:e0f8716dc8279f4bb521239b724c1d709411a6ff9798fb4406deb807ff5a1606"
        occurred_at: "2026-09-28T15:01:11.014Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609281457-R0XP40"
        task_revision: 6
      -
        command_digest: "sha256:ad0f061f3265889cb4d2fad86bd0befed2e1eb0964814557ae621f3b0e979ef6"
        id: "sha256:a83d4e4ab319140b397cc5576544ae7cbc40343ca90d4c80feacaecdd0ef428b:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:a83d4e4ab319140b397cc5576544ae7cbc40343ca90d4c80feacaecdd0ef428b"
        occurred_at: "2026-09-28T15:07:21.220Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609281457-R0XP40"
        task_revision: 7
      -
        command_digest: "sha256:33c4cc5266511036c89bf61b5a97b29bbcd57e76e6b4c7f024e04b2bc1c38294"
        id: "result:sha256:6af13b533083ae882e64256721e5ffd772660b74965932400dc006c52244a421:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:6af13b533083ae882e64256721e5ffd772660b74965932400dc006c52244a421"
        occurred_at: "2026-09-28T15:07:35.050Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609281457-R0XP40"
        task_revision: 8
      -
        command_digest: "sha256:e3e9fee0ee5f89e986afdb0ae7453590e771540f8b53db8417ea8950219dd6d6"
        id: "kernel_work_item_inspection_required:sha256:55eb70cf11f8055e9391d16d109cffe3d7f5abe16989cfd08bf47465bbe51c45:sha256:e8a92939990672bc6338736f02f6d04dca1d2167e28253ad37f5cd0bcd08e32c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:55eb70cf11f8055e9391d16d109cffe3d7f5abe16989cfd08bf47465bbe51c45:sha256:e8a92939990672bc6338736f02f6d04dca1d2167e28253ad37f5cd0bcd08e32c"
        occurred_at: "2026-09-28T15:07:47.974Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609281457-R0XP40"
        task_revision: 9
      -
        command_digest: "sha256:6e5787c7bfeb125bd306aad3834c0ed4c431c31a46f133575d8e27ecf8306cb3"
        id: "validation:sha256:6111e5c6ea673b274daa0621f107cf0bf7e26a3141db2e88c9c18ca23236a982:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:6111e5c6ea673b274daa0621f107cf0bf7e26a3141db2e88c9c18ca23236a982"
        occurred_at: "2026-09-28T15:34:28.355Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609281457-R0XP40"
        task_revision: 10
      -
        command_digest: "sha256:e91232dc2edb5d96436bc00ac2b59f67177864cbb07ce63e1cca3e28d12f0833"
        id: "validation-resolution:sha256:68c72712a17e523150020f1364a8b4f06cb4d74cf77541c287e8d97fef6b5289:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:68c72712a17e523150020f1364a8b4f06cb4d74cf77541c287e8d97fef6b5289"
        occurred_at: "2026-09-28T15:34:36.261Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609281457-R0XP40"
        task_revision: 11
      -
        command_digest: "sha256:53d736c3f51dcfec5e63ee3ac4fdd97c0a1fb50d429b5cdaf25751d7c771048e"
        id: "final-validation:sha256:e213038d140a7b4dc40967f3fc7fb6a49430212cac19fce59665ae75aa746381:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:e213038d140a7b4dc40967f3fc7fb6a49430212cac19fce59665ae75aa746381:11"
        occurred_at: "2026-09-28T17:07:01.575Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202609281457-R0XP40"
        task_revision: 12
      -
        command_digest: "sha256:b3c77344af08f24f345a36d026e3b336a8081e2b7500ac4106fded96ac8c1572"
        id: "kernel_task_completion_required:sha256:e4c5dbf6827f41112d42301a379ac6dfce6ba61e89283ca41aa02b6a813a3a6d:sha256:e8a92939990672bc6338736f02f6d04dca1d2167e28253ad37f5cd0bcd08e32c:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:e4c5dbf6827f41112d42301a379ac6dfce6ba61e89283ca41aa02b6a813a3a6d:sha256:e8a92939990672bc6338736f02f6d04dca1d2167e28253ad37f5cd0bcd08e32c"
        occurred_at: "2026-09-28T17:10:46.006Z"
        payload_digest: "sha256:ae743eab051bd6a1e4873e5dd9f9c4f11e55aba5a3ec2b0a285930130dc72fbd"
        task_id: "202609281457-R0XP40"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Fix release candidate preparation order before 0.7.12 publication

User-authorized release blocker repair. The candidate wrapper currently runs release plan, then version:bump --write, then release candidate. Native release candidate correctly requires a clean tracked tree and plan.prevVersion; the wrapper violates both preconditions. Reproduce with a focused regression test. Preserve native candidate ownership of version mutation, exact requested target validation, registry availability checks, task registry and incident gates, protected-branch publication, and all required prepublish checks. Do not weaken native preflight or publish locally. Coordinate integration after feature task 202609261720-KKE9ZN. Do not delete any GitHub repository.

## Scope

- In scope: User-authorized release blocker repair. The candidate wrapper currently runs release plan, then version:bump --write, then release candidate. Native release candidate correctly requires a clean tracked tree and plan.prevVersion; the wrapper violates both preconditions. Reproduce with a focused regression test. Preserve native candidate ownership of version mutation, exact requested target validation, registry availability checks, task registry and incident gates, protected-branch publication, and all required prepublish checks. Do not weaken native preflight or publish locally. Coordinate integration after feature task 202609261720-KKE9ZN. Do not delete any GitHub repository.
- Out of scope: unrelated refactors not required for "Fix release candidate preparation order before 0.7.12 publication".

## Plan

1. Execute approved WorkItem RC-01.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-28T17:06:56.354Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:c10ae2c6003ea7e2499b9dac10caf992fe31e3cdc88f0184c73f8f6559d36e30, input_digest=sha256:28edbc398e6f71a78d6420d8dd18a0ae70fffb7c9f143e0bc59d6e4fa319bb62

Details:

Check: affected_unit_integration
Command: bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check affected_unit_integration (1/6)

Check: affected_unit_integration
Command: bunx eslint scripts/release/candidate-prepare.mjs packages/agentplane/src/commands/release/release-ci-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check affected_unit_integration (2/6)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check affected_unit_integration (3/6)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check affected_unit_integration (4/6)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check affected_unit_integration (5/6)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-6
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check affected_unit_integration (6/6)

Check: critical_paths
Command: bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check critical_paths (1/6)

Check: critical_paths
Command: bunx eslint scripts/release/candidate-prepare.mjs packages/agentplane/src/commands/release/release-ci-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check critical_paths (2/6)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check critical_paths (3/6)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check critical_paths (4/6)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check critical_paths (5/6)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-6
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check critical_paths (6/6)

Check: docs_contract
Command: bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check docs_contract (1/6)

Check: docs_contract
Command: bunx eslint scripts/release/candidate-prepare.mjs packages/agentplane/src/commands/release/release-ci-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check docs_contract (2/6)

Check: docs_contract
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check docs_contract (3/6)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check docs_contract (4/6)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check docs_contract (5/6)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-6
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check docs_contract (6/6)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-6
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check full_regression

Check: task_outcome
Command: bun run test -- packages/agentplane/src/commands/release/release-ci-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check task_outcome (1/6)

Check: task_outcome
Command: bunx eslint scripts/release/candidate-prepare.mjs packages/agentplane/src/commands/release/release-ci-contract.test.ts
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check task_outcome (2/6)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check task_outcome (3/6)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check task_outcome (4/6)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check task_outcome (5/6)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609281457-R0XP40/supervision/declared-checks.json#check-6
Scope: branch_pr task 202609281457-R0XP40 Verification Contract check task_outcome (6/6)

NativeTaskIdentityRef:
- plan_digest: sha256:79ee3cdeb87a823a6377803c9059ccf3b7490d373e0be95cf1b76708c0740816
- policy_digest: sha256:1150ba6caefe9e829c30b3520b9246ed1ec7ebbeedbe788c63cf7989015dbb46
- capability_digest: sha256:01c3b99194c48be1e014a87d37b0940dd7aff9e7f608847dfafae14f9252117c
- checks_digest: sha256:c524077109815429ec1826d89e688fb01f4ae569a2e15e6feecb3562d35bed42
- identity_digest: sha256:b1e22282fc69f998afbdaf62876c0e3140ff8efd646f1e93c54a6ad74670c82f

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
