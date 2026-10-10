---
id: "202610092153-WZDW5D"
title: "Align full CI nested timeouts and lint memory budget for issue #6093"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 39
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-10-10T06:58:39.765Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-10T07:49:13.475Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-10T06:58:15.162Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "5be22c9ecf7ffa5154dae1c4ff103dbbaa3c7bcf"
  review_identity_digest: "sha256:50d740e8977e37ea0cca2597070ec18ff803a20e1148f900bfba2fc394841679"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610092153-WZDW5D/27cfc219f55df5c9ab89c57ca978a32bd0825200f84a0f128f5e91fcf5d023e7/quality-report.json"
  findings:
    - "Validated the context source, all 13 context block digests and byte lengths, all four required input digests, result schema and documentation content digest. HEAD and tree match the native repository evidence."
    - "Reviewed the exact five-file correction against adecd45b887f2c138fbbed706d57b23beed89d92 together with the cumulative resource-profile implementation. Deadline-skipped groups remain failed timeout results, carry launched=false, and no longer contribute to executed_groups. The original version-1 summary fields remain unchanged."
    - "Every actual group launch, including queued groups and build, reports the remaining absolute native deadline. Explicit shorter group and native budgets remain effective. The finite 60-minute group default, four-worker core default and 120-second core test/hook budgets preserve the selected checks. Native execution continues to enforce the whole-command outer limit."
    - "Lint memory selection preserves supported quoted, underscore and repeated Node heap options with last-option precedence, rejects ambiguous forms and conflicts, and checks documented host capacity requirements. Timeout-only test output is distinguished from assertions, while explicit mixed failure evidence and independent failed groups are retained."
    - "Native validation records all required checks passing: 9 resource tests, 7 qualification tests, formatting, and unchanged full CI with exit 0 in 3215661 milliseconds. This includes the significant coverage guard. The focused tests exercise sequential and queued deadlines, explicit budget precedence, heap selection, mixed classification and skipped launch accounting."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "repository_branch_pr_floor"
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
      - "ci"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "docs"
      - "packages/agentplane/src/commands/task"
      - "scripts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "ci"
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "docs"
      - "packages/agentplane/src/commands/task"
      - "scripts"
  observed:
    authority_violations: []
    changed_components:
      - "docs"
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - "docs/developer/testing-and-quality.mdx"
      - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "scripts/checks/run-local-ci-group.mjs"
      - "scripts/checks/run-local-ci.mjs"
      - "scripts/lib/local-ci-resource-profile.mjs"
      - "scripts/lib/local-ci-resource-profile.test.mjs"
      - "scripts/lib/verification-scheduler.d.ts"
      - "scripts/lib/verification-scheduler.mjs"
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
    - "effect_ci"
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
          - "docs"
          - "packages/agentplane/src/commands/task"
          - "scripts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "documentation"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:40e6211f87b43e323249cadc14228f1e6f334d4b3ce8b542fb97f5ba954cabea"
      escalation_reasons:
        - "central_path:scripts/checks/run-local-ci-group.mjs"
        - "central_path:scripts/checks/run-local-ci.mjs"
        - "central_path:scripts/lib/local-ci-resource-profile.mjs"
        - "central_path:scripts/lib/local-ci-resource-profile.test.mjs"
        - "central_path:scripts/lib/verification-scheduler.d.ts"
        - "central_path:scripts/lib/verification-scheduler.mjs"
        - "effect_ci"
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
          - "docs/developer/testing-and-quality.mdx"
          - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "scripts/checks/run-local-ci-group.mjs"
          - "scripts/checks/run-local-ci.mjs"
          - "scripts/lib/local-ci-resource-profile.mjs"
          - "scripts/lib/local-ci-resource-profile.test.mjs"
          - "scripts/lib/verification-scheduler.d.ts"
          - "scripts/lib/verification-scheduler.mjs"
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
      - "repository_effect:ci"
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "5be22c9ecf7ffa5154dae1c4ff103dbbaa3c7bcf"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-10-10T07:49:13.475Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-10-10T07:49:18.424Z"
doc_updated_by: "SUPERVISOR"
description: "Fix #6093: provide finite aligned full-validation budgets across native verifier and local CI groups, preserve explicit shorter overrides, distinguish OOM/timeout/assertion, document bounded memory prerequisites, and add focused tests without skipping checks."
sections:
  Summary: |-
    Align full CI nested timeouts and lint memory budget for issue #6093

    Fix #6093: provide finite aligned full-validation budgets across native verifier and local CI groups, preserve explicit shorter overrides, distinguish OOM/timeout/assertion, document bounded memory prerequisites, and add focused tests without skipping checks.
  Scope: |-
    - In scope: Fix #6093: provide finite aligned full-validation budgets across native verifier and local CI groups, preserve explicit shorter overrides, distinguish OOM/timeout/assertion, document bounded memory prerequisites, and add focused tests without skipping checks.
    - Out of scope: unrelated refactors not required for "Align full CI nested timeouts and lint memory budget for issue #6093".
  Plan: "1. Execute approved WorkItem align-full-ci-resource-profile."
  Verify Steps: |-
    PLANNER fallback scaffold for "Align full CI nested timeouts and lint memory budget for issue #6093". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Align full CI nested timeouts and lint memory budget for issue #6093". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-10T07:49:13.475Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:040e0178b06c7e29ffa46b4b29d70b681e8e40c003716c902b9bb20840b3845f, input_digest=sha256:efbe49bcee09f376cbefbe225e589a95b82f5c0ce3cca549af157c249f360be3

    Details:

    Check: affected_unit_integration
    Command: node --test scripts/lib/*resource*.test.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check affected_unit_integration (1/6)

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check affected_unit_integration (2/6)

    Check: affected_unit_integration
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check affected_unit_integration (3/6)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check affected_unit_integration (4/6)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check affected_unit_integration (5/6)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check affected_unit_integration (6/6)

    Check: critical_paths
    Command: node --test scripts/lib/*resource*.test.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check critical_paths (1/6)

    Check: critical_paths
    Command: bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check critical_paths (2/6)

    Check: critical_paths
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check critical_paths (3/6)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check critical_paths (4/6)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check critical_paths (5/6)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check critical_paths (6/6)

    Check: docs_contract
    Command: node --test scripts/lib/*resource*.test.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check docs_contract (1/6)

    Check: docs_contract
    Command: bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check docs_contract (2/6)

    Check: docs_contract
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check docs_contract (3/6)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check docs_contract (4/6)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check docs_contract (5/6)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check docs_contract (6/6)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check full_regression

    Check: task_outcome
    Command: node --test scripts/lib/*resource*.test.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check task_outcome (1/6)

    Check: task_outcome
    Command: bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check task_outcome (2/6)

    Check: task_outcome
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check task_outcome (3/6)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check task_outcome (4/6)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check task_outcome (5/6)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202610092153-WZDW5D Verification Contract check task_outcome (6/6)

    NativeTaskIdentityRef:
    - plan_digest: sha256:324d3b67f687d6761c3db9e91b4c9c8309519b1854ae8af0fc31734137d1e7fc
    - policy_digest: sha256:0a1c23b8d8d34f5109077402d56c9e1fcde960daddafaea20ba2824992dfef7f
    - capability_digest: sha256:586d9093f1d22f9ed6dbb5d5124043e446c804ca287675102012a2ae6e85360d
    - checks_digest: sha256:059a840c5edfd442fc261dc0e22b4615e3d47ffe2c318cecf916824738b3c558
    - identity_digest: sha256:d20679387d00cee0500deb39db8079e93999f8766acd9786456476296cbde16b

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
    digest: "sha256:fef942cd99f1ee946adc885bd430b67acf77d338ec80fd004e6ce4b259f026e9"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610092153-WZDW5D/27cfc219f55df5c9ab89c57ca978a32bd0825200f84a0f128f5e91fcf5d023e7/quality-report.json"
    findings:
      - "Validated the context source, all 13 context block digests and byte lengths, all four required input digests, result schema and documentation content digest. HEAD and tree match the native repository evidence."
      - "Reviewed the exact five-file correction against adecd45b887f2c138fbbed706d57b23beed89d92 together with the cumulative resource-profile implementation. Deadline-skipped groups remain failed timeout results, carry launched=false, and no longer contribute to executed_groups. The original version-1 summary fields remain unchanged."
      - "Every actual group launch, including queued groups and build, reports the remaining absolute native deadline. Explicit shorter group and native budgets remain effective. The finite 60-minute group default, four-worker core default and 120-second core test/hook budgets preserve the selected checks. Native execution continues to enforce the whole-command outer limit."
      - "Lint memory selection preserves supported quoted, underscore and repeated Node heap options with last-option precedence, rejects ambiguous forms and conflicts, and checks documented host capacity requirements. Timeout-only test output is distinguished from assertions, while explicit mixed failure evidence and independent failed groups are retained."
      - "Native validation records all required checks passing: 9 resource tests, 7 qualification tests, formatting, and unchanged full CI with exit 0 in 3215661 milliseconds. This includes the significant coverage guard. The focused tests exercise sequential and queued deadlines, explicit budget precedence, heap selection, mixed classification and skipped launch accounting."
    implementation_commit: "5be22c9ecf7ffa5154dae1c4ff103dbbaa3c7bcf"
    implementation_tree: "46290757551987e9b7e6a2ceb75751e706241a47"
    projected_at: "2026-10-10T06:58:15.162Z"
    review_identity_digest: "sha256:50d740e8977e37ea0cca2597070ec18ff803a20e1148f900bfba2fc394841679"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:afc085a948d06227efb448d0b0d22bf61d0a9c6eacd69d80d1d6b7d36c0413dc"
    work_order_id: "sha256:81116cf67fb0db482ce3b7ee9961872bdba227d2eacfca438c42e6d235376656"
  task_execution_context:
    base_ref: "task/202610081434-RDZE4P/resolve-open-consumer-lifecycle-defects-6054-and"
    base_sha: "f8df44c021e8cdfe38aa4eaedf9d8f86d441cad8"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:b64a0fe6152827675331d06bbbd170c6e0df6a7111fc9a5baab9acf2a8631890"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:324d3b67f687d6761c3db9e91b4c9c8309519b1854ae8af0fc31734137d1e7fc"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:75e9d917eaddb543cb709aa0d394b14f26fa4f61d2d62199c7cb96850f54327b"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs"
              - "packages/agentplane/src/commands/task"
              - "scripts"
            task_id: "202610092153-WZDW5D"
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
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:407e9d20c07a2b469eb6123daba39612833837d8f1e6c8fddee48bc80bae295f"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:324d3b67f687d6761c3db9e91b4c9c8309519b1854ae8af0fc31734137d1e7fc"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:75e9d917eaddb543cb709aa0d394b14f26fa4f61d2d62199c7cb96850f54327b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:b64a0fe6152827675331d06bbbd170c6e0df6a7111fc9a5baab9acf2a8631890"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f934294b499a8c3df10328e2e25f74e76812d0288e942049973480ba65438c0e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs"
              - "packages/agentplane/src/commands/task"
              - "scripts"
            task_id: "202610092153-WZDW5D"
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
              - "docs/developer/testing-and-quality.mdx"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "scripts/checks/run-local-ci-group.mjs"
              - "scripts/checks/run-local-ci.mjs"
              - "scripts/lib/local-ci-resource-profile.mjs"
              - "scripts/lib/local-ci-resource-profile.test.mjs"
              - "scripts/lib/verification-scheduler.d.ts"
              - "scripts/lib/verification-scheduler.mjs"
            evidence_digest: "sha256:e8ca7cec65efbdc7af58c8c67b31b1eb75a7838a607995dc94c828f81a30a0d5"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3ee8f2d9d01668ad13e080b8da84a3b246c18ae9dd3f0a89bc8e68045e8cec77"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:324d3b67f687d6761c3db9e91b4c9c8309519b1854ae8af0fc31734137d1e7fc"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:75e9d917eaddb543cb709aa0d394b14f26fa4f61d2d62199c7cb96850f54327b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:407e9d20c07a2b469eb6123daba39612833837d8f1e6c8fddee48bc80bae295f"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:0cd53aac038203b9c9a8767aa6b7a520130b1066376bb3d0b0f9cb03c0d26d7b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs"
              - "packages/agentplane/src/commands/task"
              - "scripts"
            task_id: "202610092153-WZDW5D"
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
              - "docs/developer/testing-and-quality.mdx"
              - "packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "scripts/checks/run-local-ci.mjs"
              - "scripts/lib/local-ci-resource-profile.mjs"
              - "scripts/lib/local-ci-resource-profile.test.mjs"
              - "scripts/lib/verification-scheduler.d.ts"
              - "scripts/lib/verification-scheduler.mjs"
            evidence_digest: "sha256:06adf532cb625c20b264d57b5a8ec30ed9f9ffff45c805479797aea85bc3c5cf"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:f934294b499a8c3df10328e2e25f74e76812d0288e942049973480ba65438c0e"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:6519fadc111abc3b71d8e1eb8a1deaf781686635d553cf0d1200337c8ff89466"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:324d3b67f687d6761c3db9e91b4c9c8309519b1854ae8af0fc31734137d1e7fc"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:75e9d917eaddb543cb709aa0d394b14f26fa4f61d2d62199c7cb96850f54327b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:3ee8f2d9d01668ad13e080b8da84a3b246c18ae9dd3f0a89bc8e68045e8cec77"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:dbbd6ed6331a0ab8ed796d31d114063b2fedcd93d908132f5d812fdec65617c0"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs"
              - "packages/agentplane/src/commands/task"
              - "scripts"
            task_id: "202610092153-WZDW5D"
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
              - "docs/developer/testing-and-quality.mdx"
              - "scripts/checks/run-local-ci-group.mjs"
              - "scripts/checks/run-local-ci.mjs"
              - "scripts/lib/local-ci-resource-profile.test.mjs"
              - "scripts/lib/verification-scheduler.d.ts"
              - "scripts/lib/verification-scheduler.mjs"
            evidence_digest: "sha256:ade08712892d58972a006fdb99c3563bb1ec44eef54235281df5fef6566da2f8"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:0cd53aac038203b9c9a8767aa6b7a520130b1066376bb3d0b0f9cb03c0d26d7b"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3d6ad816b09bd1f1de6cd4e72ce95cd113e32b4a45308ebee622fcf7cf02ca88"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:324d3b67f687d6761c3db9e91b4c9c8309519b1854ae8af0fc31734137d1e7fc"
            plan_revision: 1
            policy_digests:
              - "sha256:a91910e9592eefc136734171b90572e87ed161b2792c6aad955db92404621eed"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:75e9d917eaddb543cb709aa0d394b14f26fa4f61d2d62199c7cb96850f54327b"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:6519fadc111abc3b71d8e1eb8a1deaf781686635d553cf0d1200337c8ff89466"
            repository_effects:
              - "ci"
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:110106da7250adf8085794240964c73de05ad124a1f93534cd82d32459d353d1"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "docs"
              - "packages/agentplane/src/commands/task"
              - "scripts"
            task_id: "202610092153-WZDW5D"
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
              - "docs/developer/testing-and-quality.mdx"
              - "scripts/checks/run-local-ci.mjs"
              - "scripts/lib/local-ci-resource-profile.test.mjs"
              - "scripts/lib/verification-scheduler.d.ts"
              - "scripts/lib/verification-scheduler.mjs"
            evidence_digest: "sha256:285495536ed7e4960d16abd4e7c1883f9df1ffef680f3f443491421e3fe09733"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:dbbd6ed6331a0ab8ed796d31d114063b2fedcd93d908132f5d812fdec65617c0"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:75e9d917eaddb543cb709aa0d394b14f26fa4f61d2d62199c7cb96850f54327b"
        digest: "sha256:324d3b67f687d6761c3db9e91b4c9c8309519b1854ae8af0fc31734137d1e7fc"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:a46720f8ef971ce6ac706ea02a21f57389c5dade241eae5887930df4f3e12121"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "ci"
                - "documentation"
              resources: []
              scope_roots:
                - "scripts"
                - "packages/agentplane/src/commands/task"
                - "docs"
            expected_outputs:
              - "full-ci-resource-profile-evidence"
            id: "align-full-ci-resource-profile"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:afc085a948d06227efb448d0b0d22bf61d0a9c6eacd69d80d1d6b7d36c0413dc"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:61907f34c957d51b042a6a33f86617ef7498ea579f20dc62150568ab0e99c695"
          environment_digest: "sha256:8e5151f38be38747fe36018ff08dca7f07b29696d1b7645b3948722b68dd7705"
          implementation_identity: "sha256:110106da7250adf8085794240964c73de05ad124a1f93534cd82d32459d353d1"
          toolchain_digest: "sha256:dc14cf021cac194bac7a7718e0423d6b53d1ab1bc397648d95cbdb2753b86c38"
        observed_at: "2026-10-10T06:58:49.245Z"
        status: "PASSED"
      id: "202610092153-WZDW5D"
      intent_digest: "sha256:1b4bbec40e955c1585457c8ec67e6f39e9a9bd83fccf848b31b7a43d91f82cde"
      migration_receipts: []
      mutation_receipts:
        capture:202610092153-WZDW5D:
          after_revision: 1
          aggregate_digest: "sha256:fce050491d064fe18388897f659ff63d5ce873ad2f4e5d42b1026e3879a79914"
          before_revision: 0
          command_digest: "sha256:4ca9e066119b74186856b5a898ad944c15a72758cd5057a3ef3c989d61a9df81"
          effect_ids: []
          event_digests:
            - "sha256:6bad90be5a761ed253cf5d0cc35b354ceeac7d2ad8c4a86f3f1c4aa7c6823021"
          mutation_id: "capture:202610092153-WZDW5D"
        final-validation:sha256:afc085a948d06227efb448d0b0d22bf61d0a9c6eacd69d80d1d6b7d36c0413dc:32:
          after_revision: 33
          aggregate_digest: "sha256:0779a80a23f422626f5171966f41aa84dd9192a09df9a09deac03051c89b85e2"
          before_revision: 32
          command_digest: "sha256:e12a85860f58f16cf3bdb2bc0c80fe382dba4bdf3d7d4678ce6f6caec953a82d"
          effect_ids: []
          event_digests:
            - "sha256:029a8215cd928d484dc8ad4b3251d1029b70e8652e193b63af51c9b6204d3889"
          mutation_id: "final-validation:sha256:afc085a948d06227efb448d0b0d22bf61d0a9c6eacd69d80d1d6b7d36c0413dc:32"
        kernel_task_completion_required:sha256:e2443e224ebb7128669ce06fcbfba38ef210670e647512967ecc7a2a3c0875bb:sha256:110106da7250adf8085794240964c73de05ad124a1f93534cd82d32459d353d1:
          after_revision: 34
          aggregate_digest: "sha256:1b672222d52127dfb909e9ceab28afe8da9e4d963a52329672c09fc8dd2baca9"
          before_revision: 33
          command_digest: "sha256:324a0316a2fabd48b708d7e1ea9890a11e52400d9c2391b5e36be851cfd152fc"
          effect_ids: []
          event_digests:
            - "sha256:14531a37862b26d8727e287d950159a5a607b3aec0e1e549940f32b9c56009d5"
          mutation_id: "kernel_task_completion_required:sha256:e2443e224ebb7128669ce06fcbfba38ef210670e647512967ecc7a2a3c0875bb:sha256:110106da7250adf8085794240964c73de05ad124a1f93534cd82d32459d353d1"
        kernel_work_item_claim_required:sha256:155db50f1b2ef06d40f293d24ef8600e053de0e9e08fe303b5a49b6bdd0e30f3:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:
          after_revision: 5
          aggregate_digest: "sha256:18163e9bcaf5c76c52268ac7ba36624169c34c63cb94dd75b3b48578e7b3beb9"
          before_revision: 4
          command_digest: "sha256:c2a535e5ab5edc3607a58eb534f52708a0dd7856a3ea10535df5593aa3b71fe9"
          effect_ids: []
          event_digests:
            - "sha256:35ff4f82c6b09a964c2c3de203a3718cc78a33bf4a7ba97bb601a660528606f4"
          mutation_id: "kernel_work_item_claim_required:sha256:155db50f1b2ef06d40f293d24ef8600e053de0e9e08fe303b5a49b6bdd0e30f3:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        kernel_work_item_execution_required:sha256:48e189a3b6e7c204847127bf5641be35738b674c51a354dd560068161ef00ecb:sha256:0cd53aac038203b9c9a8767aa6b7a520130b1066376bb3d0b0f9cb03c0d26d7b:
          after_revision: 20
          aggregate_digest: "sha256:10cb07f2dbd61d348e02f4c2d2f749c840e59fab7cc8e13b818c00419b17198d"
          before_revision: 19
          command_digest: "sha256:ea004093ee817fe2ca739d045cdbf8ec86f760feaca65ee6878dd16d122d309b"
          effect_ids: []
          event_digests:
            - "sha256:57da1d9b3b00d8ca6c610d3705d85e21fd645bb7e46ef00e8989a0106e7c09b8"
          mutation_id: "kernel_work_item_execution_required:sha256:48e189a3b6e7c204847127bf5641be35738b674c51a354dd560068161ef00ecb:sha256:0cd53aac038203b9c9a8767aa6b7a520130b1066376bb3d0b0f9cb03c0d26d7b"
        kernel_work_item_execution_required:sha256:49c28a32ee15aab5f190a7d90c55b05da8ff00ad062cd5c737d9565b28203af3:sha256:dbbd6ed6331a0ab8ed796d31d114063b2fedcd93d908132f5d812fdec65617c0:
          after_revision: 27
          aggregate_digest: "sha256:b549d6b1b1ecb1e0b028099519d000ea22bb1b95f250b32e5132d8588bcb6814"
          before_revision: 26
          command_digest: "sha256:af5e2bc50b58996277d18faac35d6d89ccb70be4a0654315c96227730eb952ef"
          effect_ids: []
          event_digests:
            - "sha256:137b9e4be249bfc2a708b0f8afcfac20b9817466b9524974f623cef3941e694d"
          mutation_id: "kernel_work_item_execution_required:sha256:49c28a32ee15aab5f190a7d90c55b05da8ff00ad062cd5c737d9565b28203af3:sha256:dbbd6ed6331a0ab8ed796d31d114063b2fedcd93d908132f5d812fdec65617c0"
        kernel_work_item_execution_required:sha256:b2c09c7700198ebd31471fb8aa61bd1bfa6dff68163e5fd91e8f897bc616e184:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:
          after_revision: 6
          aggregate_digest: "sha256:01419f73ab68ab124e676946d71313a4f62eb77922adf7fab09e5e78d90fff79"
          before_revision: 5
          command_digest: "sha256:1532a434848b4c254289f3c01c97b3a5e62a55f015482f6bf03605c2b527a6f4"
          effect_ids: []
          event_digests:
            - "sha256:089b1ff335f120074cdf84eaa70417d0ff90fa6eb62937eeeb2a324fcd26ae0b"
          mutation_id: "kernel_work_item_execution_required:sha256:b2c09c7700198ebd31471fb8aa61bd1bfa6dff68163e5fd91e8f897bc616e184:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        kernel_work_item_execution_required:sha256:f7efa00cfdf103f7cba8be32302bc3b3a90f171fb44cd61fe19b088309df1df8:sha256:f934294b499a8c3df10328e2e25f74e76812d0288e942049973480ba65438c0e:
          after_revision: 13
          aggregate_digest: "sha256:d71ce70d6bc836cbf309026b8d07fb8cc1b7ad2480f82e97f3eca08fc9ca5b5c"
          before_revision: 12
          command_digest: "sha256:2217091f23b377bc9fdcfa68916cb901192c5e5134760f565971f3cd364a876a"
          effect_ids: []
          event_digests:
            - "sha256:7b8957b6bb53c0ac721fe510df113178dde3f9a38468c019f78667be327252ee"
          mutation_id: "kernel_work_item_execution_required:sha256:f7efa00cfdf103f7cba8be32302bc3b3a90f171fb44cd61fe19b088309df1df8:sha256:f934294b499a8c3df10328e2e25f74e76812d0288e942049973480ba65438c0e"
        kernel_work_item_inspection_required:sha256:371f2236c1f02fa1ff8628388d50e9e918b8515d2b75cdda6aeae554656455a5:sha256:110106da7250adf8085794240964c73de05ad124a1f93534cd82d32459d353d1:
          after_revision: 30
          aggregate_digest: "sha256:561105856585a92c908788a73cc57e550ad4b10ff9cbeb36f2929766e237383f"
          before_revision: 29
          command_digest: "sha256:911ad3107c7905c9c9a755f1d92ae1c234540a4d123c433cfb983fe75c8eca4f"
          effect_ids: []
          event_digests:
            - "sha256:036cff72c18a91ea857c4b86b940724d7882dd3c4bb8000eb5fbc6b15ca1fcb9"
          mutation_id: "kernel_work_item_inspection_required:sha256:371f2236c1f02fa1ff8628388d50e9e918b8515d2b75cdda6aeae554656455a5:sha256:110106da7250adf8085794240964c73de05ad124a1f93534cd82d32459d353d1"
        kernel_work_item_inspection_required:sha256:4febccd786839f78d5c627e9a79f6dc9cca517efaad9ef61d43e703459914799:sha256:f934294b499a8c3df10328e2e25f74e76812d0288e942049973480ba65438c0e:
          after_revision: 9
          aggregate_digest: "sha256:e90c731739d5a554d8435d9db5e99632eaa9d454ed67bc54f4ee4832ce249eae"
          before_revision: 8
          command_digest: "sha256:0318d628843495f3c7fef77075611d746e25f74c6e64e967caf1ab04a4b62f72"
          effect_ids: []
          event_digests:
            - "sha256:4482cb0235f8690ca8e26af84f4d52a898b7ef95660233fac5b09ab2846b6119"
          mutation_id: "kernel_work_item_inspection_required:sha256:4febccd786839f78d5c627e9a79f6dc9cca517efaad9ef61d43e703459914799:sha256:f934294b499a8c3df10328e2e25f74e76812d0288e942049973480ba65438c0e"
        kernel_work_item_inspection_required:sha256:57fdabbeffe9bbbc3ea8bc7db55533481bb2db724c6575682653d2cecf6d89a2:sha256:0cd53aac038203b9c9a8767aa6b7a520130b1066376bb3d0b0f9cb03c0d26d7b:
          after_revision: 16
          aggregate_digest: "sha256:8d9423ee5d3b0171e34e95f00a89dd3fa12012991f171c800ff9ff22f1ab5fd7"
          before_revision: 15
          command_digest: "sha256:efa50d29567ef9c3464831c394552d9b05034a3e1c9294923a2a7e0f958cd03f"
          effect_ids: []
          event_digests:
            - "sha256:8c6d74a2babfa543991bdf84c47becda3340bfdeba41c7b1d654f22530e6a6e3"
          mutation_id: "kernel_work_item_inspection_required:sha256:57fdabbeffe9bbbc3ea8bc7db55533481bb2db724c6575682653d2cecf6d89a2:sha256:0cd53aac038203b9c9a8767aa6b7a520130b1066376bb3d0b0f9cb03c0d26d7b"
        kernel_work_item_inspection_required:sha256:acff0ad05c0c69d94fa18fa7fa62b73a4383aadcc2de5c6ed13e58caea93dccf:sha256:dbbd6ed6331a0ab8ed796d31d114063b2fedcd93d908132f5d812fdec65617c0:
          after_revision: 23
          aggregate_digest: "sha256:667d359e36751c353837176fbfd307dc5c56199700b8b4a9ae84a3b0c5cc6e05"
          before_revision: 22
          command_digest: "sha256:4c8a14a9037230a83d3f851c5d7c51bf4447f5035af0b70cd5e16cf797abbbb3"
          effect_ids: []
          event_digests:
            - "sha256:06e037c14307193ce44ee976b9f69169bb03454b3d61173dda69d3387c0e46eb"
          mutation_id: "kernel_work_item_inspection_required:sha256:acff0ad05c0c69d94fa18fa7fa62b73a4383aadcc2de5c6ed13e58caea93dccf:sha256:dbbd6ed6331a0ab8ed796d31d114063b2fedcd93d908132f5d812fdec65617c0"
        kernel_work_item_materialization_required:sha256:e7832f7092b89420626471f251637c024fc84ccb2e9aa1e2d6fe6e1c7a04fcfc:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:
          after_revision: 4
          aggregate_digest: "sha256:a2f6a85f0b86f66370022654dd2d54c292c55c9128e9b4a443f8f28cdadac2da"
          before_revision: 3
          command_digest: "sha256:dcea20b8d1dea4998c5f479b186c352749f8e8d82effed634bf37adeb575e5a8"
          effect_ids: []
          event_digests:
            - "sha256:d33545cb096eeb8d7bc7b5359e60da8e3ec4a4aa30d7efd1283726663e82df2b"
          mutation_id: "kernel_work_item_materialization_required:sha256:e7832f7092b89420626471f251637c024fc84ccb2e9aa1e2d6fe6e1c7a04fcfc:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        kernel_work_item_rework_claim_required:sha256:2f2d2a4ca969dc303ea8f7a2a4e5b9731fe14b7cfc21c95e37c0d15a6d16a71f:sha256:0cd53aac038203b9c9a8767aa6b7a520130b1066376bb3d0b0f9cb03c0d26d7b:
          after_revision: 19
          aggregate_digest: "sha256:75e483d1fe16c2a609cf9e03f5d165ed9b9cc68d4ce25da8680bb7a5cb43c213"
          before_revision: 18
          command_digest: "sha256:eb3fdc61734c53d0bb99bb0452ea977fed32b6cdceb555572d9bf865dae50fdd"
          effect_ids: []
          event_digests:
            - "sha256:0c7dff57af4cef7cb4d6962d54d4c15d8321253c8c41e0f3ae93cf8e68617308"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:2f2d2a4ca969dc303ea8f7a2a4e5b9731fe14b7cfc21c95e37c0d15a6d16a71f:sha256:0cd53aac038203b9c9a8767aa6b7a520130b1066376bb3d0b0f9cb03c0d26d7b"
        kernel_work_item_rework_claim_required:sha256:82652063ebc83f6d23def4de39aabce6ce61ff3844ee34bc4519978fb5590a9e:sha256:f934294b499a8c3df10328e2e25f74e76812d0288e942049973480ba65438c0e:
          after_revision: 12
          aggregate_digest: "sha256:b7a7eb8f837d271b1f4b85de59186ed8d99b5bd90c5ed8e614d2c24adab52fe8"
          before_revision: 11
          command_digest: "sha256:a543c1bb25d055d27d07b787ea7368a0e63cd32725ed2e7b3bcea87bcf3632b9"
          effect_ids: []
          event_digests:
            - "sha256:3c523e187241d2fa7ea5cdbf7a0b3d2f36fb8cd0235802bf2c4bd0143b4cdf27"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:82652063ebc83f6d23def4de39aabce6ce61ff3844ee34bc4519978fb5590a9e:sha256:f934294b499a8c3df10328e2e25f74e76812d0288e942049973480ba65438c0e"
        kernel_work_item_rework_claim_required:sha256:90a42eb15e7fcac627d6d30b87828710f9e557c88c2e57caf257e033d1bdbfc5:sha256:dbbd6ed6331a0ab8ed796d31d114063b2fedcd93d908132f5d812fdec65617c0:
          after_revision: 26
          aggregate_digest: "sha256:714325ecef7ad5e22b2b56cd3484db414681e86ad0a2cb0653ca84288100278c"
          before_revision: 25
          command_digest: "sha256:eb6757ebc9cb690c337ec6b29fd79a458811478b2f668916e2d3f23b873c2ec8"
          effect_ids: []
          event_digests:
            - "sha256:29bc14534bef3ef292db1cb8260d5af7afcc9771a241d5ff848e71596090e89d"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:90a42eb15e7fcac627d6d30b87828710f9e557c88c2e57caf257e033d1bdbfc5:sha256:dbbd6ed6331a0ab8ed796d31d114063b2fedcd93d908132f5d812fdec65617c0"
        result:sha256:39e78e9ee948c02b1f05db35074b587042c0613855ebe8bbfc13a5e1bccf390b:
          after_revision: 2
          aggregate_digest: "sha256:f5c071f272fb462feb64a3afe598983c8a542434ca5f06cac2a19e81bc7c41af"
          before_revision: 1
          command_digest: "sha256:3a479fa700c46f60bd21c4d99416ce7544f433cc9fd8bf4de4ff61210c1139e5"
          effect_ids: []
          event_digests:
            - "sha256:1eb11936cdca2b656185511f1def43acc8de2c8b965bedc35851c7799cac9f07"
          mutation_id: "result:sha256:39e78e9ee948c02b1f05db35074b587042c0613855ebe8bbfc13a5e1bccf390b"
        result:sha256:81116cf67fb0db482ce3b7ee9961872bdba227d2eacfca438c42e6d235376656:
          after_revision: 29
          aggregate_digest: "sha256:beb88107cc761601019fc85d39c290a638aa4b7a63f46074aed641cd0bc41630"
          before_revision: 28
          command_digest: "sha256:9743caa1c2821565adac4dd3f2fe3679955305358924ea9953f30d05ba55063a"
          effect_ids: []
          event_digests:
            - "sha256:c85ec4f58eead9a741bb719c795ceef199803a5b6bb875d4789a0e157049d1ec"
          mutation_id: "result:sha256:81116cf67fb0db482ce3b7ee9961872bdba227d2eacfca438c42e6d235376656"
        result:sha256:9139e50e1c7cfa48bcb481783f5adaaa860dce27b7b34e13ed84be90638bc79a:
          after_revision: 15
          aggregate_digest: "sha256:ad0c860167235772f347b3ac89cc9116a104f365e539bde3c500baafd8f39df2"
          before_revision: 14
          command_digest: "sha256:299a762df0fdf67bab5d3659251bd881973341e5ee4ac16765c39a5ff22d456c"
          effect_ids: []
          event_digests:
            - "sha256:9a85c779fdd831439d24656f8e1f1da16d7f04b7b50e6f511b5bb6ed6ad6c73b"
          mutation_id: "result:sha256:9139e50e1c7cfa48bcb481783f5adaaa860dce27b7b34e13ed84be90638bc79a"
        result:sha256:e8839e098417d91e05ab16f328938f6b6ca73020dbd4fede5a35c321bd95fb2e:
          after_revision: 8
          aggregate_digest: "sha256:4c0ac18c14bd051e1a57266d7498c90fd7e62d123bb5f255d3f162c08bac8442"
          before_revision: 7
          command_digest: "sha256:ae1997776a651b4825cf64cdada6f73ee4a0b6529845cfa447beb782795eb310"
          effect_ids: []
          event_digests:
            - "sha256:9c9a7e0762bd62f8deb829c1cbee4a0d21dec0ffe0fec2842c294570e0335c1d"
          mutation_id: "result:sha256:e8839e098417d91e05ab16f328938f6b6ca73020dbd4fede5a35c321bd95fb2e"
        result:sha256:f9f2fa8109b13fdde1cd9906b564a2b1ec614b54c77cc1cb0d2a7e2caa74ed11:
          after_revision: 22
          aggregate_digest: "sha256:1a9a80d5cf3fc0e38a0a5a3510feeb6431cb45913a9fcfc3640f43fa3e90e5f3"
          before_revision: 21
          command_digest: "sha256:f61eb3e9c8a05ff30456e77e72ce7aa45ad382bc21e40af39dc3b3cf9085202d"
          effect_ids: []
          event_digests:
            - "sha256:5200290adbc567c529fbbd4c436d185c57af828eaca9c04eb92f34ccb0cdd2bf"
          mutation_id: "result:sha256:f9f2fa8109b13fdde1cd9906b564a2b1ec614b54c77cc1cb0d2a7e2caa74ed11"
        sha256:07cea4c9ef19a19cf34706b71bc67a8f23cd0dde4d88ef51328d7ae0ef74dc7b:
          after_revision: 3
          aggregate_digest: "sha256:8609ab490f72b0ff8192ee07724c8536385b112b33c058fa2fbf6b27f8f8ce9d"
          before_revision: 2
          command_digest: "sha256:7d0f4ac5f38c821dc420a0ee5a2a1558a61c6365b7f7aac307fd790d1a209bd6"
          effect_ids: []
          event_digests:
            - "sha256:d5c883c3250ffe5a5d99244e820fb883eff64c482baa171ef3984ba59527b734"
          mutation_id: "sha256:07cea4c9ef19a19cf34706b71bc67a8f23cd0dde4d88ef51328d7ae0ef74dc7b"
        sha256:39b1f579f9a26aa743517a27ce15df0073d69666837e09b59db376ab74feecff:
          after_revision: 21
          aggregate_digest: "sha256:56a01abbc0ad6985316efc7757362992873eb0ab82dea380687ffa3b7ea3b453"
          before_revision: 20
          command_digest: "sha256:c193993e0db6fd02c88c69bceaa5481cecb3ae115d55467d47b746315551308d"
          effect_ids: []
          event_digests:
            - "sha256:254b0711da49632937a0ffa48d4f24145a76578398b68d7854c0eacf3db9efe1"
          mutation_id: "sha256:39b1f579f9a26aa743517a27ce15df0073d69666837e09b59db376ab74feecff"
        sha256:6a072226705a7c092db1dd890bc015ba6bd7e51db727bf733c25265ebedb17f7:
          after_revision: 7
          aggregate_digest: "sha256:7a7aa602fe9a58e3daad5d38be3d280cfb5802e7e2888e981d6e2d101870373d"
          before_revision: 6
          command_digest: "sha256:12f0d9359eda0caea048653dfe7f0d9733a447d0c36feee5dd44dac50982a8c0"
          effect_ids: []
          event_digests:
            - "sha256:58e97ff9a6db5ff85cdb68a989c1ce18cc4841c99d2a537e4cc8715a7dcdf86a"
          mutation_id: "sha256:6a072226705a7c092db1dd890bc015ba6bd7e51db727bf733c25265ebedb17f7"
        sha256:704b6f95102a6fc25da59ec45e3181fad518e75fd024ce44d39a73a2c262ed4e:
          after_revision: 28
          aggregate_digest: "sha256:54065bd242cb63ab5b2ab9a52b727f359240255975fabd44b8f87f9064949d35"
          before_revision: 27
          command_digest: "sha256:25655806909532d8782877d2b11db4be6c773185b623a57aff778987ec7787ad"
          effect_ids: []
          event_digests:
            - "sha256:3b2ea9941470ccff4887437954289dab4b16b0a71e798e9616e11ec65242b991"
          mutation_id: "sha256:704b6f95102a6fc25da59ec45e3181fad518e75fd024ce44d39a73a2c262ed4e"
        sha256:e596db4478ee2a8fceeb4f78d9546995a8e6cd094a91105d7a4b3cb606fc7e89:
          after_revision: 14
          aggregate_digest: "sha256:3fd4d6b111c48a237a4795245c1e6cc8d02ce5ea72e55ec316b4aa807d83f9b5"
          before_revision: 13
          command_digest: "sha256:8a6e1aa4fa3145919587a4160a2af9feffe3041c86e60dd543f46bb230dbf3b1"
          effect_ids: []
          event_digests:
            - "sha256:a883f2ac93cf3f7996affa0c05cbfd6fc0022e5f5a6fd2ca8c5e8a61e1de934c"
          mutation_id: "sha256:e596db4478ee2a8fceeb4f78d9546995a8e6cd094a91105d7a4b3cb606fc7e89"
        validation-resolution:sha256:024f7f85380ef06e940c763824d05ce78ea84b223270e47297ae70d3a7b9477b:
          after_revision: 11
          aggregate_digest: "sha256:d2aa597eaefc1908dc95a15dd5caba40399635196b5868ba856dd0a66f1f6d3f"
          before_revision: 10
          command_digest: "sha256:45d380c37979f0704b3e20e910601009e31c2d75cfca8575d9ec86b6be09d3a5"
          effect_ids: []
          event_digests:
            - "sha256:3fbceac185581b8f3bea7438d5d84a3b380faeff4c5fc71c4f2023a8d9a6a872"
          mutation_id: "validation-resolution:sha256:024f7f85380ef06e940c763824d05ce78ea84b223270e47297ae70d3a7b9477b"
        validation-resolution:sha256:b36598b9619688b5b9e10c0ebec08aa67d1b5790e1b493e992f5711a63258fa1:
          after_revision: 18
          aggregate_digest: "sha256:44d799efb79dc52f646eb0d9357abc2ae12d2857bce6d3a3b7e04c6a844500f3"
          before_revision: 17
          command_digest: "sha256:e2c6a5654a77174eea0b1c39dda52dd9a3e27e8578b59afc1cf68682ea104610"
          effect_ids: []
          event_digests:
            - "sha256:bc98d6f80c6e9fa62adde2d07a46032b0f9eb19595046047377c8ab486af1816"
          mutation_id: "validation-resolution:sha256:b36598b9619688b5b9e10c0ebec08aa67d1b5790e1b493e992f5711a63258fa1"
        validation-resolution:sha256:cf9366850b94d444983a87b88d746d8deb1553c005f3121ef76c9169a404f8b1:
          after_revision: 32
          aggregate_digest: "sha256:5392320e0d0272f48eda4d3a5999c12bc99707b8a605664ba9e1e53278c78912"
          before_revision: 31
          command_digest: "sha256:5a9887ab72d713f16ca2d4672a7bf89257be9d1a94fd1c70c2a4fa884182644b"
          effect_ids: []
          event_digests:
            - "sha256:56d3da63f051c3caee90566be3ddc1abcf6cf915830344c6a6b38d95eb4e6be5"
          mutation_id: "validation-resolution:sha256:cf9366850b94d444983a87b88d746d8deb1553c005f3121ef76c9169a404f8b1"
        validation-resolution:sha256:e7412f111374c50a95aca26547dea8a3575c965cc086986f2a61d95f4813cc58:
          after_revision: 25
          aggregate_digest: "sha256:896a82b1e4dd87bc85f52dcf5fe5324f89c3e7b0503d5208b40ef14233a68469"
          before_revision: 24
          command_digest: "sha256:4f1c2be1db2aa785d8abf976b6eb92b23f64308dd2fefa26764ce84d4565ccaf"
          effect_ids: []
          event_digests:
            - "sha256:7e7a36fd5c6a31a2674dc808ebf49596ca7f7765b79e6a2498bc94d587bfb387"
          mutation_id: "validation-resolution:sha256:e7412f111374c50a95aca26547dea8a3575c965cc086986f2a61d95f4813cc58"
        validation:sha256:27cfc219f55df5c9ab89c57ca978a32bd0825200f84a0f128f5e91fcf5d023e7:
          after_revision: 31
          aggregate_digest: "sha256:f7a5d31abab1576184db3c980468d23d69c392d3132b94d90dab7e498de3a22c"
          before_revision: 30
          command_digest: "sha256:2575505d4e10732b297a71141291ac2335e1e220726031716bf93b33574269b3"
          effect_ids: []
          event_digests:
            - "sha256:b9ab6670607a5104bc4a9f257c22982163cef4412b33a10b942389fe110fb6a4"
          mutation_id: "validation:sha256:27cfc219f55df5c9ab89c57ca978a32bd0825200f84a0f128f5e91fcf5d023e7"
        validation:sha256:3a33f36130a6efa76bac63e808b54568266e0ccaaeadcd999bdcbbb07b439abe:
          after_revision: 10
          aggregate_digest: "sha256:63da672b1f2e79cc4f376a488d19ec73a52f4595e5d5d55235e37fe162409a38"
          before_revision: 9
          command_digest: "sha256:aa89b09e77d991a7274e6c4d8cf42d36783d623862d3bd26de1caba713fcd34a"
          effect_ids: []
          event_digests:
            - "sha256:77ea43741f811b9b00390ae9b648c06bc0ae5c5135cc48821b186348ba9679a2"
          mutation_id: "validation:sha256:3a33f36130a6efa76bac63e808b54568266e0ccaaeadcd999bdcbbb07b439abe"
        validation:sha256:9139e50e1c7cfa48bcb481783f5adaaa860dce27b7b34e13ed84be90638bc79a:
          after_revision: 17
          aggregate_digest: "sha256:5046bdf0fa306d34ac5e2e85282e985533360fc8f59c16e2b3bbc876772accfb"
          before_revision: 16
          command_digest: "sha256:f47ad9e771b4c4a37ed5682aa77bfb08561d0a2ae7aa76425648bfce1c57805a"
          effect_ids: []
          event_digests:
            - "sha256:89f54782680d21004addcfed951a5cecde28fdf32e640ba3b950df1c2ff831ea"
          mutation_id: "validation:sha256:9139e50e1c7cfa48bcb481783f5adaaa860dce27b7b34e13ed84be90638bc79a"
        validation:sha256:f9f2fa8109b13fdde1cd9906b564a2b1ec614b54c77cc1cb0d2a7e2caa74ed11:
          after_revision: 24
          aggregate_digest: "sha256:085d2bd30439e379b612d70676d48c702a4058426759bd192d7c3a382bdaa11a"
          before_revision: 23
          command_digest: "sha256:c65435efc4477d93d26a92e60c309842f24812afcdf1909478be9ae6a4e92013"
          effect_ids: []
          event_digests:
            - "sha256:cc92ea46217d520a407c27a1aae612a4ed80c139572d5c0a5c895cce847b1f54"
          mutation_id: "validation:sha256:f9f2fa8109b13fdde1cd9906b564a2b1ec614b54c77cc1cb0d2a7e2caa74ed11"
      plan_history: []
      revision: 34
      schema_version: 1
      state: "COMPLETED"
      work_items:
        align-full-ci-resource-profile:
          attempt: 4
          claim_id: "sha256:49eb69132433d50b0acab71c229fe443ae8694c41ab377ade0e66d13e3ce2403"
          definition:
            contract_digest: "sha256:a46720f8ef971ce6ac706ea02a21f57389c5dade241eae5887930df4f3e12121"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "ci"
                - "documentation"
              resources: []
              scope_roots:
                - "scripts"
                - "packages/agentplane/src/commands/task"
                - "docs"
            expected_outputs:
              - "full-ci-resource-profile-evidence"
            id: "align-full-ci-resource-profile"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 4
              digest: "sha256:df554dc9f24d50c709b947eab2c8031d4ef9b456afaf0a49aabd412b6cb50c9d"
              id: "full-ci-resource-profile-evidence"
              kind: "documentation"
              plan_revision: 1
              repository_fingerprint: "sha256:110106da7250adf8085794240964c73de05ad124a1f93534cd82d32459d353d1"
              task_id: "202610092153-WZDW5D"
              work_item_id: "align-full-ci-resource-profile"
          result_digest: "sha256:ae2f0113b355a3bfb86a074a1234dec251bce3e968279b2219e4768e0dbb8a2f"
          revision: 25
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:756a70d34f7950b1cdb060bcc2bb8a1fb972c82a6d6b760cb500eb80048ed2f6"
              - "sha256:50d740e8977e37ea0cca2597070ec18ff803a20e1148f900bfba2fc394841679"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:61907f34c957d51b042a6a33f86617ef7498ea579f20dc62150568ab0e99c695"
              environment_digest: "sha256:f046e3888825d89d35b43de888fe777317048c53188e23d3b2f207e65b3aa146"
              implementation_identity: "sha256:ae2f0113b355a3bfb86a074a1234dec251bce3e968279b2219e4768e0dbb8a2f"
              toolchain_digest: "sha256:97398f9060d1177dc7c1604a218cd6ba7b702d285fbdc8a1a0399f01b12330f3"
            observed_at: "2026-10-10T06:58:15.162Z"
            status: "PASSED"
    digest: "sha256:9935c8973c14cf78b817a8ff897fb218e4b32327094fb0d3fe7c6bd1eb38e983"
    documents:
      contracts:
        sha256:a46720f8ef971ce6ac706ea02a21f57389c5dade241eae5887930df4f3e12121:
          acceptance_criteria:
            - "Inspect the native full-check deadline, local scheduler group timeout, ESLint heap behavior, and existing user overrides before changing defaults."
            - "Make the default inner full-CI deadline sufficient for the observed legitimate workload while finite and below the native outer default; preserve explicit shorter user budgets and report effective limit provenance before launch."
            - "Provide a bounded lint memory profile or lower lint memory demand without assuming that every host can allocate a larger heap; document prerequisites and supported overrides."
            - "Report timeout, out-of-memory, and assertion failures distinctly while retaining mixed group failures and all verification selections."
            - "Add focused tests for deadline precedence, an execution longer than the former 15-minute default using a simulated clock or budget comparison, memory selection, and failure classification; run the unchanged full regression."
            - "Do not change required checks, success criteria, release metadata, or security boundaries."
          objective: "Implement and document finite, coherent full-CI group and lint-memory budgets for issue #6093, preserving all selected checks and explicit shorter user limits."
          role: "EXECUTOR"
          verification_commands:
            - "node --test scripts/lib/*resource*.test.mjs"
            - "bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts"
            - "bun run format:check"
            - "bun run ci:local:full"
      intent:
        context: "Fix #6093: provide finite aligned full-validation budgets across native verifier and local CI groups, preserve explicit shorter overrides, distinguish OOM/timeout/assertion, document bounded memory prerequisites, and add focused tests without skipping checks."
        objective: "Align full CI nested timeouts and lint memory budget for issue #6093"
    events:
      -
        command_digest: "sha256:4ca9e066119b74186856b5a898ad944c15a72758cd5057a3ef3c989d61a9df81"
        id: "capture:202610092153-WZDW5D:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610092153-WZDW5D"
        occurred_at: "2026-10-09T21:54:06.346Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610092153-WZDW5D"
        task_revision: 1
      -
        command_digest: "sha256:3a479fa700c46f60bd21c4d99416ce7544f433cc9fd8bf4de4ff61210c1139e5"
        id: "result:sha256:39e78e9ee948c02b1f05db35074b587042c0613855ebe8bbfc13a5e1bccf390b:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:39e78e9ee948c02b1f05db35074b587042c0613855ebe8bbfc13a5e1bccf390b"
        occurred_at: "2026-10-09T21:55:08.115Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610092153-WZDW5D"
        task_revision: 2
      -
        command_digest: "sha256:7d0f4ac5f38c821dc420a0ee5a2a1558a61c6365b7f7aac307fd790d1a209bd6"
        id: "sha256:07cea4c9ef19a19cf34706b71bc67a8f23cd0dde4d88ef51328d7ae0ef74dc7b:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:07cea4c9ef19a19cf34706b71bc67a8f23cd0dde4d88ef51328d7ae0ef74dc7b"
        occurred_at: "2026-10-09T21:55:17.899Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610092153-WZDW5D"
        task_revision: 3
      -
        command_digest: "sha256:dcea20b8d1dea4998c5f479b186c352749f8e8d82effed634bf37adeb575e5a8"
        id: "kernel_work_item_materialization_required:sha256:e7832f7092b89420626471f251637c024fc84ccb2e9aa1e2d6fe6e1c7a04fcfc:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:e7832f7092b89420626471f251637c024fc84ccb2e9aa1e2d6fe6e1c7a04fcfc:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        occurred_at: "2026-10-09T21:55:27.506Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610092153-WZDW5D"
        task_revision: 4
      -
        command_digest: "sha256:c2a535e5ab5edc3607a58eb534f52708a0dd7856a3ea10535df5593aa3b71fe9"
        id: "kernel_work_item_claim_required:sha256:155db50f1b2ef06d40f293d24ef8600e053de0e9e08fe303b5a49b6bdd0e30f3:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:155db50f1b2ef06d40f293d24ef8600e053de0e9e08fe303b5a49b6bdd0e30f3:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        occurred_at: "2026-10-09T21:55:40.534Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610092153-WZDW5D"
        task_revision: 5
      -
        command_digest: "sha256:1532a434848b4c254289f3c01c97b3a5e62a55f015482f6bf03605c2b527a6f4"
        id: "kernel_work_item_execution_required:sha256:b2c09c7700198ebd31471fb8aa61bd1bfa6dff68163e5fd91e8f897bc616e184:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b2c09c7700198ebd31471fb8aa61bd1bfa6dff68163e5fd91e8f897bc616e184:sha256:08aca76b5ea2fb336d34a8515562a0aaa95529c3833b319f3752c956038ead54"
        occurred_at: "2026-10-09T21:57:36.097Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610092153-WZDW5D"
        task_revision: 6
      -
        command_digest: "sha256:12f0d9359eda0caea048653dfe7f0d9733a447d0c36feee5dd44dac50982a8c0"
        id: "sha256:6a072226705a7c092db1dd890bc015ba6bd7e51db727bf733c25265ebedb17f7:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:6a072226705a7c092db1dd890bc015ba6bd7e51db727bf733c25265ebedb17f7"
        occurred_at: "2026-10-09T23:24:30.875Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610092153-WZDW5D"
        task_revision: 7
      -
        command_digest: "sha256:ae1997776a651b4825cf64cdada6f73ee4a0b6529845cfa447beb782795eb310"
        id: "result:sha256:e8839e098417d91e05ab16f328938f6b6ca73020dbd4fede5a35c321bd95fb2e:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:e8839e098417d91e05ab16f328938f6b6ca73020dbd4fede5a35c321bd95fb2e"
        occurred_at: "2026-10-09T23:24:45.176Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610092153-WZDW5D"
        task_revision: 8
      -
        command_digest: "sha256:0318d628843495f3c7fef77075611d746e25f74c6e64e967caf1ab04a4b62f72"
        id: "kernel_work_item_inspection_required:sha256:4febccd786839f78d5c627e9a79f6dc9cca517efaad9ef61d43e703459914799:sha256:f934294b499a8c3df10328e2e25f74e76812d0288e942049973480ba65438c0e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:4febccd786839f78d5c627e9a79f6dc9cca517efaad9ef61d43e703459914799:sha256:f934294b499a8c3df10328e2e25f74e76812d0288e942049973480ba65438c0e"
        occurred_at: "2026-10-09T23:24:55.487Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610092153-WZDW5D"
        task_revision: 9
      -
        command_digest: "sha256:aa89b09e77d991a7274e6c4d8cf42d36783d623862d3bd26de1caba713fcd34a"
        id: "validation:sha256:3a33f36130a6efa76bac63e808b54568266e0ccaaeadcd999bdcbbb07b439abe:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:3a33f36130a6efa76bac63e808b54568266e0ccaaeadcd999bdcbbb07b439abe"
        occurred_at: "2026-10-10T00:06:24.819Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610092153-WZDW5D"
        task_revision: 10
      -
        command_digest: "sha256:45d380c37979f0704b3e20e910601009e31c2d75cfca8575d9ec86b6be09d3a5"
        id: "validation-resolution:sha256:024f7f85380ef06e940c763824d05ce78ea84b223270e47297ae70d3a7b9477b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:024f7f85380ef06e940c763824d05ce78ea84b223270e47297ae70d3a7b9477b"
        occurred_at: "2026-10-10T00:06:31.479Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610092153-WZDW5D"
        task_revision: 11
      -
        command_digest: "sha256:a543c1bb25d055d27d07b787ea7368a0e63cd32725ed2e7b3bcea87bcf3632b9"
        id: "kernel_work_item_rework_claim_required:sha256:82652063ebc83f6d23def4de39aabce6ce61ff3844ee34bc4519978fb5590a9e:sha256:f934294b499a8c3df10328e2e25f74e76812d0288e942049973480ba65438c0e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:82652063ebc83f6d23def4de39aabce6ce61ff3844ee34bc4519978fb5590a9e:sha256:f934294b499a8c3df10328e2e25f74e76812d0288e942049973480ba65438c0e"
        occurred_at: "2026-10-10T00:06:45.495Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610092153-WZDW5D"
        task_revision: 12
      -
        command_digest: "sha256:2217091f23b377bc9fdcfa68916cb901192c5e5134760f565971f3cd364a876a"
        id: "kernel_work_item_execution_required:sha256:f7efa00cfdf103f7cba8be32302bc3b3a90f171fb44cd61fe19b088309df1df8:sha256:f934294b499a8c3df10328e2e25f74e76812d0288e942049973480ba65438c0e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:f7efa00cfdf103f7cba8be32302bc3b3a90f171fb44cd61fe19b088309df1df8:sha256:f934294b499a8c3df10328e2e25f74e76812d0288e942049973480ba65438c0e"
        occurred_at: "2026-10-10T00:06:54.610Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610092153-WZDW5D"
        task_revision: 13
      -
        command_digest: "sha256:8a6e1aa4fa3145919587a4160a2af9feffe3041c86e60dd543f46bb230dbf3b1"
        id: "sha256:e596db4478ee2a8fceeb4f78d9546995a8e6cd094a91105d7a4b3cb606fc7e89:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:e596db4478ee2a8fceeb4f78d9546995a8e6cd094a91105d7a4b3cb606fc7e89"
        occurred_at: "2026-10-10T00:49:00.921Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202610092153-WZDW5D"
        task_revision: 14
      -
        command_digest: "sha256:299a762df0fdf67bab5d3659251bd881973341e5ee4ac16765c39a5ff22d456c"
        id: "result:sha256:9139e50e1c7cfa48bcb481783f5adaaa860dce27b7b34e13ed84be90638bc79a:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:9139e50e1c7cfa48bcb481783f5adaaa860dce27b7b34e13ed84be90638bc79a"
        occurred_at: "2026-10-10T00:49:13.953Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202610092153-WZDW5D"
        task_revision: 15
      -
        command_digest: "sha256:efa50d29567ef9c3464831c394552d9b05034a3e1c9294923a2a7e0f958cd03f"
        id: "kernel_work_item_inspection_required:sha256:57fdabbeffe9bbbc3ea8bc7db55533481bb2db724c6575682653d2cecf6d89a2:sha256:0cd53aac038203b9c9a8767aa6b7a520130b1066376bb3d0b0f9cb03c0d26d7b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:57fdabbeffe9bbbc3ea8bc7db55533481bb2db724c6575682653d2cecf6d89a2:sha256:0cd53aac038203b9c9a8767aa6b7a520130b1066376bb3d0b0f9cb03c0d26d7b"
        occurred_at: "2026-10-10T00:49:23.217Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610092153-WZDW5D"
        task_revision: 16
      -
        command_digest: "sha256:f47ad9e771b4c4a37ed5682aa77bfb08561d0a2ae7aa76425648bfce1c57805a"
        id: "validation:sha256:9139e50e1c7cfa48bcb481783f5adaaa860dce27b7b34e13ed84be90638bc79a:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:9139e50e1c7cfa48bcb481783f5adaaa860dce27b7b34e13ed84be90638bc79a"
        occurred_at: "2026-10-10T01:31:46.233Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202610092153-WZDW5D"
        task_revision: 17
      -
        command_digest: "sha256:e2c6a5654a77174eea0b1c39dda52dd9a3e27e8578b59afc1cf68682ea104610"
        id: "validation-resolution:sha256:b36598b9619688b5b9e10c0ebec08aa67d1b5790e1b493e992f5711a63258fa1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:b36598b9619688b5b9e10c0ebec08aa67d1b5790e1b493e992f5711a63258fa1"
        occurred_at: "2026-10-10T01:31:53.716Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610092153-WZDW5D"
        task_revision: 18
      -
        command_digest: "sha256:eb3fdc61734c53d0bb99bb0452ea977fed32b6cdceb555572d9bf865dae50fdd"
        id: "kernel_work_item_rework_claim_required:sha256:2f2d2a4ca969dc303ea8f7a2a4e5b9731fe14b7cfc21c95e37c0d15a6d16a71f:sha256:0cd53aac038203b9c9a8767aa6b7a520130b1066376bb3d0b0f9cb03c0d26d7b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:2f2d2a4ca969dc303ea8f7a2a4e5b9731fe14b7cfc21c95e37c0d15a6d16a71f:sha256:0cd53aac038203b9c9a8767aa6b7a520130b1066376bb3d0b0f9cb03c0d26d7b"
        occurred_at: "2026-10-10T01:32:09.419Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202610092153-WZDW5D"
        task_revision: 19
      -
        command_digest: "sha256:ea004093ee817fe2ca739d045cdbf8ec86f760feaca65ee6878dd16d122d309b"
        id: "kernel_work_item_execution_required:sha256:48e189a3b6e7c204847127bf5641be35738b674c51a354dd560068161ef00ecb:sha256:0cd53aac038203b9c9a8767aa6b7a520130b1066376bb3d0b0f9cb03c0d26d7b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:48e189a3b6e7c204847127bf5641be35738b674c51a354dd560068161ef00ecb:sha256:0cd53aac038203b9c9a8767aa6b7a520130b1066376bb3d0b0f9cb03c0d26d7b"
        occurred_at: "2026-10-10T01:32:17.793Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202610092153-WZDW5D"
        task_revision: 20
      -
        command_digest: "sha256:c193993e0db6fd02c88c69bceaa5481cecb3ae115d55467d47b746315551308d"
        id: "sha256:39b1f579f9a26aa743517a27ce15df0073d69666837e09b59db376ab74feecff:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:39b1f579f9a26aa743517a27ce15df0073d69666837e09b59db376ab74feecff"
        occurred_at: "2026-10-10T03:16:42.017Z"
        payload_digest: "sha256:69dc0f4c08a537c2ac464283b4eadc2dbf095e184bb3517220c6ad77169ab37f"
        task_id: "202610092153-WZDW5D"
        task_revision: 21
      -
        command_digest: "sha256:f61eb3e9c8a05ff30456e77e72ce7aa45ad382bc21e40af39dc3b3cf9085202d"
        id: "result:sha256:f9f2fa8109b13fdde1cd9906b564a2b1ec614b54c77cc1cb0d2a7e2caa74ed11:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:f9f2fa8109b13fdde1cd9906b564a2b1ec614b54c77cc1cb0d2a7e2caa74ed11"
        occurred_at: "2026-10-10T03:16:55.031Z"
        payload_digest: "sha256:0909349b0439b554db4b4450982b8c538fcc513bb5154268100b33efa83f8996"
        task_id: "202610092153-WZDW5D"
        task_revision: 22
      -
        command_digest: "sha256:4c8a14a9037230a83d3f851c5d7c51bf4447f5035af0b70cd5e16cf797abbbb3"
        id: "kernel_work_item_inspection_required:sha256:acff0ad05c0c69d94fa18fa7fa62b73a4383aadcc2de5c6ed13e58caea93dccf:sha256:dbbd6ed6331a0ab8ed796d31d114063b2fedcd93d908132f5d812fdec65617c0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:acff0ad05c0c69d94fa18fa7fa62b73a4383aadcc2de5c6ed13e58caea93dccf:sha256:dbbd6ed6331a0ab8ed796d31d114063b2fedcd93d908132f5d812fdec65617c0"
        occurred_at: "2026-10-10T03:17:06.109Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202610092153-WZDW5D"
        task_revision: 23
      -
        command_digest: "sha256:c65435efc4477d93d26a92e60c309842f24812afcdf1909478be9ae6a4e92013"
        id: "validation:sha256:f9f2fa8109b13fdde1cd9906b564a2b1ec614b54c77cc1cb0d2a7e2caa74ed11:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:f9f2fa8109b13fdde1cd9906b564a2b1ec614b54c77cc1cb0d2a7e2caa74ed11"
        occurred_at: "2026-10-10T04:30:59.772Z"
        payload_digest: "sha256:4878ab2391d59246cd05275fa5f1dec131ae6cd0229e806e9863b1686acfa772"
        task_id: "202610092153-WZDW5D"
        task_revision: 24
      -
        command_digest: "sha256:4f1c2be1db2aa785d8abf976b6eb92b23f64308dd2fefa26764ce84d4565ccaf"
        id: "validation-resolution:sha256:e7412f111374c50a95aca26547dea8a3575c965cc086986f2a61d95f4813cc58:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:e7412f111374c50a95aca26547dea8a3575c965cc086986f2a61d95f4813cc58"
        occurred_at: "2026-10-10T04:31:22.112Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202610092153-WZDW5D"
        task_revision: 25
      -
        command_digest: "sha256:eb6757ebc9cb690c337ec6b29fd79a458811478b2f668916e2d3f23b873c2ec8"
        id: "kernel_work_item_rework_claim_required:sha256:90a42eb15e7fcac627d6d30b87828710f9e557c88c2e57caf257e033d1bdbfc5:sha256:dbbd6ed6331a0ab8ed796d31d114063b2fedcd93d908132f5d812fdec65617c0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:90a42eb15e7fcac627d6d30b87828710f9e557c88c2e57caf257e033d1bdbfc5:sha256:dbbd6ed6331a0ab8ed796d31d114063b2fedcd93d908132f5d812fdec65617c0"
        occurred_at: "2026-10-10T04:31:50.749Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202610092153-WZDW5D"
        task_revision: 26
      -
        command_digest: "sha256:af5e2bc50b58996277d18faac35d6d89ccb70be4a0654315c96227730eb952ef"
        id: "kernel_work_item_execution_required:sha256:49c28a32ee15aab5f190a7d90c55b05da8ff00ad062cd5c737d9565b28203af3:sha256:dbbd6ed6331a0ab8ed796d31d114063b2fedcd93d908132f5d812fdec65617c0:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:49c28a32ee15aab5f190a7d90c55b05da8ff00ad062cd5c737d9565b28203af3:sha256:dbbd6ed6331a0ab8ed796d31d114063b2fedcd93d908132f5d812fdec65617c0"
        occurred_at: "2026-10-10T04:32:09.602Z"
        payload_digest: "sha256:a6b9393b728eff7d50e5310deb6401fea9252fbd392b0fedbc3fb37467df9c63"
        task_id: "202610092153-WZDW5D"
        task_revision: 27
      -
        command_digest: "sha256:25655806909532d8782877d2b11db4be6c773185b623a57aff778987ec7787ad"
        id: "sha256:704b6f95102a6fc25da59ec45e3181fad518e75fd024ce44d39a73a2c262ed4e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:704b6f95102a6fc25da59ec45e3181fad518e75fd024ce44d39a73a2c262ed4e"
        occurred_at: "2026-10-10T05:59:05.128Z"
        payload_digest: "sha256:758d046bb700bfb388afb5f242615a0666d8c68a77abc7d727af5deb3ef3a0b2"
        task_id: "202610092153-WZDW5D"
        task_revision: 28
      -
        command_digest: "sha256:9743caa1c2821565adac4dd3f2fe3679955305358924ea9953f30d05ba55063a"
        id: "result:sha256:81116cf67fb0db482ce3b7ee9961872bdba227d2eacfca438c42e6d235376656:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:81116cf67fb0db482ce3b7ee9961872bdba227d2eacfca438c42e6d235376656"
        occurred_at: "2026-10-10T05:59:22.905Z"
        payload_digest: "sha256:26dd0f4b06a2bea56fb8527d7c16b2e90cf490d12c0d1654c88f5900a6ad8e4d"
        task_id: "202610092153-WZDW5D"
        task_revision: 29
      -
        command_digest: "sha256:911ad3107c7905c9c9a755f1d92ae1c234540a4d123c433cfb983fe75c8eca4f"
        id: "kernel_work_item_inspection_required:sha256:371f2236c1f02fa1ff8628388d50e9e918b8515d2b75cdda6aeae554656455a5:sha256:110106da7250adf8085794240964c73de05ad124a1f93534cd82d32459d353d1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:371f2236c1f02fa1ff8628388d50e9e918b8515d2b75cdda6aeae554656455a5:sha256:110106da7250adf8085794240964c73de05ad124a1f93534cd82d32459d353d1"
        occurred_at: "2026-10-10T05:59:36.523Z"
        payload_digest: "sha256:44c3de5777bf215ed1a66d03400a5882bd2b21bcf1a90ddddd59360976ed1d5b"
        task_id: "202610092153-WZDW5D"
        task_revision: 30
      -
        command_digest: "sha256:2575505d4e10732b297a71141291ac2335e1e220726031716bf93b33574269b3"
        id: "validation:sha256:27cfc219f55df5c9ab89c57ca978a32bd0825200f84a0f128f5e91fcf5d023e7:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:27cfc219f55df5c9ab89c57ca978a32bd0825200f84a0f128f5e91fcf5d023e7"
        occurred_at: "2026-10-10T06:58:24.831Z"
        payload_digest: "sha256:508ff4e990154e1dbf9852bacbf1c924f77c4110611ba32112cffdb03055fc3b"
        task_id: "202610092153-WZDW5D"
        task_revision: 31
      -
        command_digest: "sha256:5a9887ab72d713f16ca2d4672a7bf89257be9d1a94fd1c70c2a4fa884182644b"
        id: "validation-resolution:sha256:cf9366850b94d444983a87b88d746d8deb1553c005f3121ef76c9169a404f8b1:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:cf9366850b94d444983a87b88d746d8deb1553c005f3121ef76c9169a404f8b1"
        occurred_at: "2026-10-10T06:58:32.575Z"
        payload_digest: "sha256:49bdd090620950f51eadc2a68b5a833b4b57257079afebef6f5ba57461c9e6eb"
        task_id: "202610092153-WZDW5D"
        task_revision: 32
      -
        command_digest: "sha256:e12a85860f58f16cf3bdb2bc0c80fe382dba4bdf3d7d4678ce6f6caec953a82d"
        id: "final-validation:sha256:afc085a948d06227efb448d0b0d22bf61d0a9c6eacd69d80d1d6b7d36c0413dc:32:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:afc085a948d06227efb448d0b0d22bf61d0a9c6eacd69d80d1d6b7d36c0413dc:32"
        occurred_at: "2026-10-10T07:49:27.342Z"
        payload_digest: "sha256:ce0a4100402f787449a23611570a889ef520fb82bc4c0d37d517264b79d8bc88"
        task_id: "202610092153-WZDW5D"
        task_revision: 33
      -
        command_digest: "sha256:324a0316a2fabd48b708d7e1ea9890a11e52400d9c2391b5e36be851cfd152fc"
        id: "kernel_task_completion_required:sha256:e2443e224ebb7128669ce06fcbfba38ef210670e647512967ecc7a2a3c0875bb:sha256:110106da7250adf8085794240964c73de05ad124a1f93534cd82d32459d353d1:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:e2443e224ebb7128669ce06fcbfba38ef210670e647512967ecc7a2a3c0875bb:sha256:110106da7250adf8085794240964c73de05ad124a1f93534cd82d32459d353d1"
        occurred_at: "2026-10-10T08:42:56.753Z"
        payload_digest: "sha256:bf06dc6c71f55f934711c402beb819212825f73078a566b95446df8b483b156d"
        task_id: "202610092153-WZDW5D"
        task_revision: 34
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Align full CI nested timeouts and lint memory budget for issue #6093

Fix #6093: provide finite aligned full-validation budgets across native verifier and local CI groups, preserve explicit shorter overrides, distinguish OOM/timeout/assertion, document bounded memory prerequisites, and add focused tests without skipping checks.

## Scope

- In scope: Fix #6093: provide finite aligned full-validation budgets across native verifier and local CI groups, preserve explicit shorter overrides, distinguish OOM/timeout/assertion, document bounded memory prerequisites, and add focused tests without skipping checks.
- Out of scope: unrelated refactors not required for "Align full CI nested timeouts and lint memory budget for issue #6093".

## Plan

1. Execute approved WorkItem align-full-ci-resource-profile.

## Verify Steps

PLANNER fallback scaffold for "Align full CI nested timeouts and lint memory budget for issue #6093". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Align full CI nested timeouts and lint memory budget for issue #6093". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-10T07:49:13.475Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:040e0178b06c7e29ffa46b4b29d70b681e8e40c003716c902b9bb20840b3845f, input_digest=sha256:efbe49bcee09f376cbefbe225e589a95b82f5c0ce3cca549af157c249f360be3

Details:

Check: affected_unit_integration
Command: node --test scripts/lib/*resource*.test.mjs
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check affected_unit_integration (1/6)

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check affected_unit_integration (2/6)

Check: affected_unit_integration
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check affected_unit_integration (3/6)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check affected_unit_integration (4/6)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check affected_unit_integration (5/6)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-6
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check affected_unit_integration (6/6)

Check: critical_paths
Command: node --test scripts/lib/*resource*.test.mjs
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check critical_paths (1/6)

Check: critical_paths
Command: bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check critical_paths (2/6)

Check: critical_paths
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check critical_paths (3/6)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check critical_paths (4/6)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check critical_paths (5/6)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-6
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check critical_paths (6/6)

Check: docs_contract
Command: node --test scripts/lib/*resource*.test.mjs
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check docs_contract (1/6)

Check: docs_contract
Command: bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check docs_contract (2/6)

Check: docs_contract
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check docs_contract (3/6)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check docs_contract (4/6)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check docs_contract (5/6)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-6
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check docs_contract (6/6)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check full_regression

Check: task_outcome
Command: node --test scripts/lib/*resource*.test.mjs
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check task_outcome (1/6)

Check: task_outcome
Command: bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.qualification.test.ts
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check task_outcome (2/6)

Check: task_outcome
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check task_outcome (3/6)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check task_outcome (4/6)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check task_outcome (5/6)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202610092153-WZDW5D/supervision/declared-checks.json#check-6
Scope: branch_pr task 202610092153-WZDW5D Verification Contract check task_outcome (6/6)

NativeTaskIdentityRef:
- plan_digest: sha256:324d3b67f687d6761c3db9e91b4c9c8309519b1854ae8af0fc31734137d1e7fc
- policy_digest: sha256:0a1c23b8d8d34f5109077402d56c9e1fcde960daddafaea20ba2824992dfef7f
- capability_digest: sha256:586d9093f1d22f9ed6dbb5d5124043e446c804ca287675102012a2ae6e85360d
- checks_digest: sha256:059a840c5edfd442fc261dc0e22b4615e3d47ffe2c318cecf916824738b3c558
- identity_digest: sha256:d20679387d00cee0500deb39db8079e93999f8766acd9786456476296cbde16b

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
