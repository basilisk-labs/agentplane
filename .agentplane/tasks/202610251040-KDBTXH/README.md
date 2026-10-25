---
id: "202610251040-KDBTXH"
title: "Keep historical compatibility package delta valid after later surface changes"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on: []
tags:
  - "compatibility"
  - "release"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run bench:compatibility:candidate:check"
  - "bun run bench:compatibility:check"
  - "bun run ci:local:full"
  - "node --test scripts/lib/compatibility-incremental-package-delta.test.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-10-25T11:27:42.227Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-25T12:04:26.200Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-25T11:27:22.227Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "fc893a0fc31d7faf2addbed38bf64117b3402785"
  review_identity_digest: "sha256:abc5ba3d76f3949f98108829631ec1617813c84a331839ae2dba3415f211f125"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610251040-KDBTXH/27ca01762c058374222ba8175976e3c9c75b472f4fc30b12601e36caf27c6659/quality-report.json"
  findings:
    - "The checker retains its exact hash-pinned PR #6905 incremental record and existing candidate, section, and source-task approval ratchets. No compatibility candidate JSON or released baseline changed."
    - "Both capture and contract-check routes use the same reconstruction. It validates complete manifest inventory, exact historical and current package-section digests, and exact allowed JSON paths without comparing archived full-surface hashes to later unrelated CLI/context state."
    - "Focused negatives reject package version, manifest inventory, from/to digest, allowed-path, and historical dependency drift. Native focused tests, candidate check, contract check, hotspots check, and full CI run-004 all passed at fc893a0fc31d7faf2addbed38bf64117b3402785."
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "scripts/bench/capture-compatibility-candidate.mjs"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/lib/compatibility-incremental-package-delta.mjs"
      - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "scripts/bench/capture-compatibility-candidate.mjs"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/lib/compatibility-incremental-package-delta.mjs"
      - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
  observed:
    authority_violations: []
    changed_components:
      - "scripts"
    changed_paths:
      - "scripts/bench/capture-compatibility-candidate.mjs"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/lib/compatibility-incremental-package-delta.mjs"
      - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
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
          - "scripts/bench/capture-compatibility-candidate.mjs"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
          - "scripts/lib/compatibility-incremental-package-delta.mjs"
          - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:332144c720564cacb0e3b540da295fc149cfd799d368fc099c028a9b6e51fc9e"
      escalation_reasons:
        - "central_component:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "central_component:scripts/lib/compatibility-incremental-package-delta.mjs"
        - "central_component:scripts/lib/compatibility-incremental-package-delta.test.mjs"
        - "central_path:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "central_path:scripts/lib/compatibility-incremental-package-delta.mjs"
        - "central_path:scripts/lib/compatibility-incremental-package-delta.test.mjs"
        - "effect_ci"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "scripts"
        changed_files:
          - "scripts/bench/capture-compatibility-candidate.mjs"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
          - "scripts/lib/compatibility-incremental-package-delta.mjs"
          - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
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
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "fc893a0fc31d7faf2addbed38bf64117b3402785"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-10-25T12:04:26.200Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-10-25T12:04:27.054Z"
doc_updated_by: "SUPERVISOR"
description: "For release 0.7.13, decouple immutable PR #6905 incremental Zod package history from later unrelated CLI/context full-surface changes. Preserve the exact reviewed PR #6905 record, its package-section from/to hashes, and six allowed manifest paths. Add a generic regression that accepts later unrelated surface drift but rejects package digest or path drift. Do not update the KB0 candidate JSON or weaken current candidate approval ratchets in this task."
sections:
  Summary: |-
    Keep historical compatibility package delta valid after later surface changes

    For release 0.7.13, decouple immutable PR #6905 incremental Zod package history from later unrelated CLI/context full-surface changes. Preserve the exact reviewed PR #6905 record, its package-section from/to hashes, and six allowed manifest paths. Add a generic regression that accepts later unrelated surface drift but rejects package digest or path drift. Do not update the KB0 candidate JSON or weaken current candidate approval ratchets in this task.
  Scope: |-
    - In scope: For release 0.7.13, decouple immutable PR #6905 incremental Zod package history from later unrelated CLI/context full-surface changes. Preserve the exact reviewed PR #6905 record, its package-section from/to hashes, and six allowed manifest paths. Add a generic regression that accepts later unrelated surface drift but rejects package digest or path drift. Do not update the KB0 candidate JSON or weaken current candidate approval ratchets in this task.
    - Out of scope: unrelated refactors not required for "Keep historical compatibility package delta valid after later surface changes".
  Plan: "1. Execute approved WorkItem validate-historical-package-delta."
  Verify Steps: |-
    PLANNER fallback scaffold for "Keep historical compatibility package delta valid after later surface changes". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Keep historical compatibility package delta valid after later surface changes". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-25T12:04:26.200Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:179fea070cfed53902be9a99c7dba30b65dc58ca1a1d9b77b20e3cf39d3c63b5, input_digest=sha256:5cfd95ed9c182c1d753f88faee6776464187c28eef69e6f173a85aae104ba7bf

    Details:

    Check: affected_unit_integration
    Command: node --test scripts/lib/compatibility-incremental-package-delta.test.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: bun run bench:compatibility:candidate:check
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run bench:compatibility:check
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: bun run hotspots:check
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: node --test scripts/lib/compatibility-incremental-package-delta.test.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: bun run bench:compatibility:candidate:check
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run bench:compatibility:check
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: bun run hotspots:check
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check critical_paths (5/5)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check full_regression

    Check: task_outcome
    Command: node --test scripts/lib/compatibility-incremental-package-delta.test.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: bun run bench:compatibility:candidate:check
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run bench:compatibility:check
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: bun run hotspots:check
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202610251040-KDBTXH Verification Contract check task_outcome (5/5)

    NativeTaskIdentityRef:
    - plan_digest: sha256:eca5840665eafea74c073c07e775fdeb495ffbc12b559dc92acedf0a439758c1
    - policy_digest: sha256:0a1c23b8d8d34f5109077402d56c9e1fcde960daddafaea20ba2824992dfef7f
    - capability_digest: sha256:29089b5a2364b286f957f6957f6d92631f4339211e822ec9e0fabf27ffb0143c
    - checks_digest: sha256:78c1dfd47760a9c044b9b5b7a7a7f6f1d545e41284b6de84c22331efd8ec5794
    - identity_digest: sha256:18ac921e4635ac5959654926ec9557c83d48edfeb30aa464e6de9760921e9258

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610251040-KDBTXH
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
    digest: "sha256:b8c8cba261f78de340095f1ce5da425e8fecd16d157de6f767c8ef3fc40697cd"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610251040-KDBTXH/27ca01762c058374222ba8175976e3c9c75b472f4fc30b12601e36caf27c6659/quality-report.json"
    findings:
      - "The checker retains its exact hash-pinned PR #6905 incremental record and existing candidate, section, and source-task approval ratchets. No compatibility candidate JSON or released baseline changed."
      - "Both capture and contract-check routes use the same reconstruction. It validates complete manifest inventory, exact historical and current package-section digests, and exact allowed JSON paths without comparing archived full-surface hashes to later unrelated CLI/context state."
      - "Focused negatives reject package version, manifest inventory, from/to digest, allowed-path, and historical dependency drift. Native focused tests, candidate check, contract check, hotspots check, and full CI run-004 all passed at fc893a0fc31d7faf2addbed38bf64117b3402785."
    implementation_commit: "fc893a0fc31d7faf2addbed38bf64117b3402785"
    implementation_tree: "da1bbca977525b3606cca3acc9172bc70a38e20f"
    projected_at: "2026-10-25T11:27:22.227Z"
    review_identity_digest: "sha256:abc5ba3d76f3949f98108829631ec1617813c84a331839ae2dba3415f211f125"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:dbfd0765218afae0e5dcfed730169d0193c61ee1a95f4653d12b574ebd87c516"
    work_order_id: "sha256:8686d8b24820232617a30f4103ad25be2f0ad249cbe883d5cad3a3459da0fc8d"
  task_execution_context:
    base_ref: "main"
    base_sha: "1b8097aecf1f07f1e3e7dec86dafb9618990c77a"
    repository_identity: "sha256:54ebc175d5062bd17583cc599ab63bc6327beb701cc820e49ae678de363898e0"
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
            digest: "sha256:c9590a7578f46d98012dfca001eb538b78a59356075f27d49c6f270ede89a7d6"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:eca5840665eafea74c073c07e775fdeb495ffbc12b559dc92acedf0a439758c1"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a54650dbc066449be606a1d88bf19773343b40524fb7268ed9a1a09e1f115ce0"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
            repository_identity: "sha256:54ebc175d5062bd17583cc599ab63bc6327beb701cc820e49ae678de363898e0"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "scripts/bench/capture-compatibility-candidate.mjs"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/lib/compatibility-incremental-package-delta.mjs"
              - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
            task_id: "202610251040-KDBTXH"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
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
            digest: "sha256:4b7ffaff7b6995e57a567b38267ea76da5350def6cd9e02089cceb72acb2e175"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:eca5840665eafea74c073c07e775fdeb495ffbc12b559dc92acedf0a439758c1"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:a54650dbc066449be606a1d88bf19773343b40524fb7268ed9a1a09e1f115ce0"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:c9590a7578f46d98012dfca001eb538b78a59356075f27d49c6f270ede89a7d6"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:eb618e83fba1b24c36eed2955aa6c98bad461deeba0c234b9f44e0070fe2a5cd"
            repository_identity: "sha256:54ebc175d5062bd17583cc599ab63bc6327beb701cc820e49ae678de363898e0"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "scripts/bench/capture-compatibility-candidate.mjs"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/lib/compatibility-incremental-package-delta.mjs"
              - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
            task_id: "202610251040-KDBTXH"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "scripts/bench/capture-compatibility-candidate.mjs"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/lib/compatibility-incremental-package-delta.mjs"
              - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
            evidence_digest: "sha256:939863adbe036c3a6fc6bd6f6b5349a41f5d7d05045ca583bfedbca0721ca54e"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:a54650dbc066449be606a1d88bf19773343b40524fb7268ed9a1a09e1f115ce0"
        digest: "sha256:eca5840665eafea74c073c07e775fdeb495ffbc12b559dc92acedf0a439758c1"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:cd75b02349d94dc20234251845670c8ef3752501f0f6e1e673cef510db33e567"
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
              resources: []
              scope_roots:
                - "scripts/lib/compatibility-incremental-package-delta.mjs"
                - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
                - "scripts/bench/capture-compatibility-candidate.mjs"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
            expected_outputs:
              - "shared-package-section-validator"
              - "capture-checker-adoption"
              - "unrelated-surface-and-package-drift-regressions"
              - "verification-evidence"
            id: "validate-historical-package-delta"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:dbfd0765218afae0e5dcfed730169d0193c61ee1a95f4653d12b574ebd87c516"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:51e49fd6eab973ef1bf45c6237ebf9471dfdc7bab42deca20522cad83b89198f"
          environment_digest: "sha256:211667f7d287fa19a1d1f0141d538fbbcf04a215c24a57594664ca664e3e903f"
          implementation_identity: "sha256:eb618e83fba1b24c36eed2955aa6c98bad461deeba0c234b9f44e0070fe2a5cd"
          toolchain_digest: "sha256:4d3b2dcba1aca901c95b72fac0d62c2b88bb53dd51e2976b655f2d8ba9a2d61f"
        observed_at: "2026-10-25T11:27:44.916Z"
        status: "PASSED"
      id: "202610251040-KDBTXH"
      intent_digest: "sha256:a5c6acc9b71af1df274081c75db0441c135dbc78413fced876c328417bd36357"
      migration_receipts: []
      mutation_receipts:
        capture:202610251040-KDBTXH:
          after_revision: 1
          aggregate_digest: "sha256:19838fbe433e58c704a5373fe84922cdab29cb607ab2a01d986ebe93c89370c9"
          before_revision: 0
          command_digest: "sha256:1246ca4c58a2413eb13396ca485a03aa0fa40f65be9641c55d16f55d3fe6981d"
          effect_ids: []
          event_digests:
            - "sha256:5cdb3cff52dc6f8734ec05e208dde52e13a12f7b48a964169aa65716064d5137"
          mutation_id: "capture:202610251040-KDBTXH"
        final-validation:sha256:dbfd0765218afae0e5dcfed730169d0193c61ee1a95f4653d12b574ebd87c516:11:
          after_revision: 12
          aggregate_digest: "sha256:e0c153f2024fa6d995ae77fca974b1a892ddb4c60358b096dafa95bc2276d1b8"
          before_revision: 11
          command_digest: "sha256:3c251570cbd272987bc1d3db00c0354943a510287c4d9da17abec7c9bfbfb6fa"
          effect_ids: []
          event_digests:
            - "sha256:8677f8c07667b1257a3d2032b138f6d027fb2bc1213647794a91e2043228a37a"
          mutation_id: "final-validation:sha256:dbfd0765218afae0e5dcfed730169d0193c61ee1a95f4653d12b574ebd87c516:11"
        kernel_task_completion_required:sha256:44a6b71fcfca850cd97d267b9012f2d098481699df006a4762f20269f48a95a8:sha256:eb618e83fba1b24c36eed2955aa6c98bad461deeba0c234b9f44e0070fe2a5cd:
          after_revision: 13
          aggregate_digest: "sha256:99d109abb638087cbd29c417c7e9bfc163c7a73ebf2e06eb193c1b9283821ea7"
          before_revision: 12
          command_digest: "sha256:da5400b2a43c541ef9eff2d90a5d0d44aa564997fa864c6c367441fd7ad47cd2"
          effect_ids: []
          event_digests:
            - "sha256:59fad4fa6e8c427d7ba981c42fc7efb1dcc51da43cb94d332184c598176c677b"
          mutation_id: "kernel_task_completion_required:sha256:44a6b71fcfca850cd97d267b9012f2d098481699df006a4762f20269f48a95a8:sha256:eb618e83fba1b24c36eed2955aa6c98bad461deeba0c234b9f44e0070fe2a5cd"
        kernel_work_item_claim_required:sha256:65eb1ec57d72991ca42050609782992a8b642c19545b1afc1b447ae7aa656158:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468:
          after_revision: 5
          aggregate_digest: "sha256:2d614cb2c8076d09fd714226264859e73c3a67964ea861ba836cb818b343f70b"
          before_revision: 4
          command_digest: "sha256:8a16ac5aa1b4fd3349afc9daba78099af0a589aece67563967ec25227f7fd9e2"
          effect_ids: []
          event_digests:
            - "sha256:c410dc42e212d1020b146849d1c0d49469cd8998ae64b50ebf2240af4eafcc31"
          mutation_id: "kernel_work_item_claim_required:sha256:65eb1ec57d72991ca42050609782992a8b642c19545b1afc1b447ae7aa656158:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
        kernel_work_item_execution_required:sha256:48f915465c845053d90bdd29ea3a440b323e44862bb24cf8374a9c21a637d12c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468:
          after_revision: 6
          aggregate_digest: "sha256:793a99fd547ec67f0b75155b4bced92c4c98602b8b509635decb671543541529"
          before_revision: 5
          command_digest: "sha256:32b6b9893b8de651657cef0ce3f137d0fee584cf09412ff3c379b5756018e3a2"
          effect_ids: []
          event_digests:
            - "sha256:5b6ed930e74d39f70e19d0838c534de0634a21d3e754465d0a11f6f321d7497d"
          mutation_id: "kernel_work_item_execution_required:sha256:48f915465c845053d90bdd29ea3a440b323e44862bb24cf8374a9c21a637d12c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
        kernel_work_item_inspection_required:sha256:f68b08c31cee3fcaba4ab3bbe14bc0aecba84807dd0d5da9bbbce0aae30e264c:sha256:eb618e83fba1b24c36eed2955aa6c98bad461deeba0c234b9f44e0070fe2a5cd:
          after_revision: 9
          aggregate_digest: "sha256:9b98ff165117a211728c329a19b3e3cef3fecd9d401fd005b172c0440dd191b6"
          before_revision: 8
          command_digest: "sha256:c176670d15f351b25348cca3602305877bdd90ad7c1d36127751eab9d4d9d30e"
          effect_ids: []
          event_digests:
            - "sha256:6956e92f5b8d7d721cf934d8567b6553dad719f1799c34baa68e2dd5ba4f2f7e"
          mutation_id: "kernel_work_item_inspection_required:sha256:f68b08c31cee3fcaba4ab3bbe14bc0aecba84807dd0d5da9bbbce0aae30e264c:sha256:eb618e83fba1b24c36eed2955aa6c98bad461deeba0c234b9f44e0070fe2a5cd"
        kernel_work_item_materialization_required:sha256:4d0a0003fed05caf6eed5d74cf51e56b7b28e91cb415a206727985a21085ef9c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468:
          after_revision: 4
          aggregate_digest: "sha256:569e0a7b93b89000b977c4c1818f4b6a52fda4087384502152461a17cd1743e9"
          before_revision: 3
          command_digest: "sha256:796a29460da8e9d035ad1f0a6fcb5a50986a997d8fdc1e259897c0bbd24b9a27"
          effect_ids: []
          event_digests:
            - "sha256:e961e3de2ec15ce4daf6d8451204cb25f90285a5e3460d611ad3e7481be4fe97"
          mutation_id: "kernel_work_item_materialization_required:sha256:4d0a0003fed05caf6eed5d74cf51e56b7b28e91cb415a206727985a21085ef9c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
        result:sha256:8686d8b24820232617a30f4103ad25be2f0ad249cbe883d5cad3a3459da0fc8d:
          after_revision: 8
          aggregate_digest: "sha256:6fee2939c01e7a90641f4e7a1725e0c3eabdd327f3ba7849dd541abd9e8f9590"
          before_revision: 7
          command_digest: "sha256:d5b63765c93f72262189da0f350571e27ee736ee8967379b35d7b6a4d9858eb9"
          effect_ids: []
          event_digests:
            - "sha256:f2b6f4bea396b77b6fa473c86dd806c5084ffa3e541c0366f3e40d1e12832b4d"
          mutation_id: "result:sha256:8686d8b24820232617a30f4103ad25be2f0ad249cbe883d5cad3a3459da0fc8d"
        result:sha256:dba53cd9b64b4e3dab5c191373e2749f17a11359a602b0dbee561588e6baafe8:
          after_revision: 2
          aggregate_digest: "sha256:94e369933eaf41e6180d8f28328144f61a32eaf13b12b6db89e038d1d42bd7d0"
          before_revision: 1
          command_digest: "sha256:10539bfd87cbbeef897ee397cddc47a593aa6df73fc06ae385a2cd778328a7c6"
          effect_ids: []
          event_digests:
            - "sha256:fed2fe57339cc3c9702ff6d2a3fe8e03a88690473f368a81fe82efc57f65ac78"
          mutation_id: "result:sha256:dba53cd9b64b4e3dab5c191373e2749f17a11359a602b0dbee561588e6baafe8"
        sha256:aceee2f668d2b60239b6e51ff99817ab725a91992bd08690707a2d99ecbf8a26:
          after_revision: 7
          aggregate_digest: "sha256:89bcec210317abdab1d572d2720da42d1a02e35144420b87d058dfd53a8535d9"
          before_revision: 6
          command_digest: "sha256:4bd59bf60d2559e47c4274fe9790cecf23957c4b695c7c588c4b61a9ff9d1930"
          effect_ids: []
          event_digests:
            - "sha256:347329fed4989fde7c515a0216702e525f981047514bf87b34cad1c24a552233"
          mutation_id: "sha256:aceee2f668d2b60239b6e51ff99817ab725a91992bd08690707a2d99ecbf8a26"
        sha256:fe5f49e3fa6d29a5a971b49afa151f7bc2c3f322cf7108a88d2efcd7138bfbb2:
          after_revision: 3
          aggregate_digest: "sha256:a2be9f7b807c9ef1998eb2008fca65a15ef38c024c3f57792c68f1c04c41aa4a"
          before_revision: 2
          command_digest: "sha256:df2953555311b9dcccc02f8eb3c92ed4e7f152f1090f368249c5e5c6336d9e58"
          effect_ids: []
          event_digests:
            - "sha256:32da59923c579cfb33aaa55799855f4688c3edb27485d533b24985c8ec9981d9"
          mutation_id: "sha256:fe5f49e3fa6d29a5a971b49afa151f7bc2c3f322cf7108a88d2efcd7138bfbb2"
        validation-resolution:sha256:c1be3ffe247c98846e7692ab0ed69b3e1ce550d312f1132c8fcf5b2deadcb67e:
          after_revision: 11
          aggregate_digest: "sha256:42ed780b476f58434fc865bfd9df535ff51455fa62c51d843a2a926a4f606c09"
          before_revision: 10
          command_digest: "sha256:d91440034ddbdf1655160dddd009bc3c5800971a7318c3766a93567e49e8b1b1"
          effect_ids: []
          event_digests:
            - "sha256:080318cdb8a986cc8d937ce4ab76aabfd51767b326a843971dc386b057924f65"
          mutation_id: "validation-resolution:sha256:c1be3ffe247c98846e7692ab0ed69b3e1ce550d312f1132c8fcf5b2deadcb67e"
        validation:sha256:27ca01762c058374222ba8175976e3c9c75b472f4fc30b12601e36caf27c6659:
          after_revision: 10
          aggregate_digest: "sha256:3ceafffae6655675c97bc9b35d8f40542697e83d2b6485a0e7891fea27835afe"
          before_revision: 9
          command_digest: "sha256:bf6d0a26a6cc46ac3340d0c8e75a9dc42b853382acb93e8c77c4c2c17693ea0a"
          effect_ids: []
          event_digests:
            - "sha256:9656d0eb8189b2960a8198ee25153aca14844264e521c3de59b4d75590977732"
          mutation_id: "validation:sha256:27ca01762c058374222ba8175976e3c9c75b472f4fc30b12601e36caf27c6659"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "COMPLETED"
      work_items:
        validate-historical-package-delta:
          attempt: 1
          claim_id: "sha256:7a795eb196d4c00a76b001807beb9fe9516d12e2a8ed35a87c784a1f0da17044"
          definition:
            contract_digest: "sha256:cd75b02349d94dc20234251845670c8ef3752501f0f6e1e673cef510db33e567"
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
              resources: []
              scope_roots:
                - "scripts/lib/compatibility-incremental-package-delta.mjs"
                - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
                - "scripts/bench/capture-compatibility-candidate.mjs"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
            expected_outputs:
              - "shared-package-section-validator"
              - "capture-checker-adoption"
              - "unrelated-surface-and-package-drift-regressions"
              - "verification-evidence"
            id: "validate-historical-package-delta"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:dbb0533d482373159f40881958691bcc1535a274979e0480f2e911cc0bdc31c9"
              id: "shared-package-section-validator"
              kind: "source"
              plan_revision: 1
              repository_fingerprint: "sha256:eb618e83fba1b24c36eed2955aa6c98bad461deeba0c234b9f44e0070fe2a5cd"
              task_id: "202610251040-KDBTXH"
              work_item_id: "validate-historical-package-delta"
            -
              attempt: 1
              digest: "sha256:0aa01628bcf73018cc256e44c80c990a0af1d0565490d44f5397f481df73d56a"
              id: "capture-checker-adoption"
              kind: "source"
              plan_revision: 1
              repository_fingerprint: "sha256:eb618e83fba1b24c36eed2955aa6c98bad461deeba0c234b9f44e0070fe2a5cd"
              task_id: "202610251040-KDBTXH"
              work_item_id: "validate-historical-package-delta"
            -
              attempt: 1
              digest: "sha256:3976462a3f597ebf6ea773481ee653d02d0418560a35f64fd74bd41ef4c35be0"
              id: "unrelated-surface-and-package-drift-regressions"
              kind: "tests"
              plan_revision: 1
              repository_fingerprint: "sha256:eb618e83fba1b24c36eed2955aa6c98bad461deeba0c234b9f44e0070fe2a5cd"
              task_id: "202610251040-KDBTXH"
              work_item_id: "validate-historical-package-delta"
            -
              attempt: 1
              digest: "sha256:d4d17a20eb712967ed81a8da714f62b9cda5a3890b9a43adf244b8eba2250445"
              id: "verification-evidence"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:eb618e83fba1b24c36eed2955aa6c98bad461deeba0c234b9f44e0070fe2a5cd"
              task_id: "202610251040-KDBTXH"
              work_item_id: "validate-historical-package-delta"
          result_digest: "sha256:978db2652e00bf692a32c823bbca266745e05d2fc32580b1e45fb6f404b139f1"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:e728ecaebbe0e7817d9255bbb8a96312dfe7c36eda9d7e36adbcccf10cb4fc90"
              - "sha256:abc5ba3d76f3949f98108829631ec1617813c84a331839ae2dba3415f211f125"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:51e49fd6eab973ef1bf45c6237ebf9471dfdc7bab42deca20522cad83b89198f"
              environment_digest: "sha256:5b0ed22e14dd25d70584d8d910f3d0c8bb2584e1bd0a6ed5a7a88fddea9f806c"
              implementation_identity: "sha256:978db2652e00bf692a32c823bbca266745e05d2fc32580b1e45fb6f404b139f1"
              toolchain_digest: "sha256:ae9b1f430f69f8222cf51f0882e83f5a81914ade7b73607adb8b06158650d837"
            observed_at: "2026-10-25T11:27:22.227Z"
            status: "PASSED"
    digest: "sha256:9b83436967c4d1d9f1a6c898b8bc555010b67e7e6f92173f494b6eadd2b4577a"
    documents:
      contracts:
        sha256:cd75b02349d94dc20234251845670c8ef3752501f0f6e1e673cef510db33e567:
          acceptance_criteria:
            - "Both candidate capture and contract checker accept an unchanged reviewed package delta when later non-package CLI/context sections change."
            - "Both routes reject a changed historical dependency, an unexpected manifest or package-section hash, or an unapproved package JSON path."
            - "The exact PR #6905 incremental record and current candidate/section/source-task approval ratchets remain unchanged."
            - "No KB0 candidate JSON update, released baseline mutation, or verification bypass occurs in this task."
          objective: "Extract shared validation for the reviewed incremental package delta. Keep PR #6905 history immutable and validate the three package-manifest dependency changes by section hashes and six allowed JSON paths while permitting later unrelated full-surface drift."
          role: "EXECUTOR"
          verification_commands:
            - "node --test scripts/lib/compatibility-incremental-package-delta.test.mjs"
            - "bun run bench:compatibility:candidate:check"
            - "bun run bench:compatibility:check"
            - "bun run hotspots:check"
            - "bun run ci:local:full"
      intent:
        context: "For release 0.7.13, decouple immutable PR #6905 incremental Zod package history from later unrelated CLI/context full-surface changes. Preserve the exact reviewed PR #6905 record, its package-section from/to hashes, and six allowed manifest paths. Add a generic regression that accepts later unrelated surface drift but rejects package digest or path drift. Do not update the KB0 candidate JSON or weaken current candidate approval ratchets in this task."
        objective: "Keep historical compatibility package delta valid after later surface changes"
    events:
      -
        command_digest: "sha256:1246ca4c58a2413eb13396ca485a03aa0fa40f65be9641c55d16f55d3fe6981d"
        id: "capture:202610251040-KDBTXH:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610251040-KDBTXH"
        occurred_at: "2026-10-25T10:40:57.761Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610251040-KDBTXH"
        task_revision: 1
      -
        command_digest: "sha256:10539bfd87cbbeef897ee397cddc47a593aa6df73fc06ae385a2cd778328a7c6"
        id: "result:sha256:dba53cd9b64b4e3dab5c191373e2749f17a11359a602b0dbee561588e6baafe8:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:dba53cd9b64b4e3dab5c191373e2749f17a11359a602b0dbee561588e6baafe8"
        occurred_at: "2026-10-25T10:41:58.886Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610251040-KDBTXH"
        task_revision: 2
      -
        command_digest: "sha256:df2953555311b9dcccc02f8eb3c92ed4e7f152f1090f368249c5e5c6336d9e58"
        id: "sha256:fe5f49e3fa6d29a5a971b49afa151f7bc2c3f322cf7108a88d2efcd7138bfbb2:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:fe5f49e3fa6d29a5a971b49afa151f7bc2c3f322cf7108a88d2efcd7138bfbb2"
        occurred_at: "2026-10-25T10:42:07.571Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610251040-KDBTXH"
        task_revision: 3
      -
        command_digest: "sha256:796a29460da8e9d035ad1f0a6fcb5a50986a997d8fdc1e259897c0bbd24b9a27"
        id: "kernel_work_item_materialization_required:sha256:4d0a0003fed05caf6eed5d74cf51e56b7b28e91cb415a206727985a21085ef9c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:4d0a0003fed05caf6eed5d74cf51e56b7b28e91cb415a206727985a21085ef9c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
        occurred_at: "2026-10-25T10:42:16.324Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610251040-KDBTXH"
        task_revision: 4
      -
        command_digest: "sha256:8a16ac5aa1b4fd3349afc9daba78099af0a589aece67563967ec25227f7fd9e2"
        id: "kernel_work_item_claim_required:sha256:65eb1ec57d72991ca42050609782992a8b642c19545b1afc1b447ae7aa656158:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:65eb1ec57d72991ca42050609782992a8b642c19545b1afc1b447ae7aa656158:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
        occurred_at: "2026-10-25T10:42:27.585Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610251040-KDBTXH"
        task_revision: 5
      -
        command_digest: "sha256:32b6b9893b8de651657cef0ce3f137d0fee584cf09412ff3c379b5756018e3a2"
        id: "kernel_work_item_execution_required:sha256:48f915465c845053d90bdd29ea3a440b323e44862bb24cf8374a9c21a637d12c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:48f915465c845053d90bdd29ea3a440b323e44862bb24cf8374a9c21a637d12c:sha256:17a5ba218d357bf7555fdc3a55bd1669d2a2a96885b3d2d028743f3b89355468"
        occurred_at: "2026-10-25T10:42:59.959Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610251040-KDBTXH"
        task_revision: 6
      -
        command_digest: "sha256:4bd59bf60d2559e47c4274fe9790cecf23957c4b695c7c588c4b61a9ff9d1930"
        id: "sha256:aceee2f668d2b60239b6e51ff99817ab725a91992bd08690707a2d99ecbf8a26:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:aceee2f668d2b60239b6e51ff99817ab725a91992bd08690707a2d99ecbf8a26"
        occurred_at: "2026-10-25T10:47:39.271Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610251040-KDBTXH"
        task_revision: 7
      -
        command_digest: "sha256:d5b63765c93f72262189da0f350571e27ee736ee8967379b35d7b6a4d9858eb9"
        id: "result:sha256:8686d8b24820232617a30f4103ad25be2f0ad249cbe883d5cad3a3459da0fc8d:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:8686d8b24820232617a30f4103ad25be2f0ad249cbe883d5cad3a3459da0fc8d"
        occurred_at: "2026-10-25T10:47:51.458Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610251040-KDBTXH"
        task_revision: 8
      -
        command_digest: "sha256:c176670d15f351b25348cca3602305877bdd90ad7c1d36127751eab9d4d9d30e"
        id: "kernel_work_item_inspection_required:sha256:f68b08c31cee3fcaba4ab3bbe14bc0aecba84807dd0d5da9bbbce0aae30e264c:sha256:eb618e83fba1b24c36eed2955aa6c98bad461deeba0c234b9f44e0070fe2a5cd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f68b08c31cee3fcaba4ab3bbe14bc0aecba84807dd0d5da9bbbce0aae30e264c:sha256:eb618e83fba1b24c36eed2955aa6c98bad461deeba0c234b9f44e0070fe2a5cd"
        occurred_at: "2026-10-25T10:48:00.565Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610251040-KDBTXH"
        task_revision: 9
      -
        command_digest: "sha256:bf6d0a26a6cc46ac3340d0c8e75a9dc42b853382acb93e8c77c4c2c17693ea0a"
        id: "validation:sha256:27ca01762c058374222ba8175976e3c9c75b472f4fc30b12601e36caf27c6659:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:27ca01762c058374222ba8175976e3c9c75b472f4fc30b12601e36caf27c6659"
        occurred_at: "2026-10-25T11:27:30.285Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610251040-KDBTXH"
        task_revision: 10
      -
        command_digest: "sha256:d91440034ddbdf1655160dddd009bc3c5800971a7318c3766a93567e49e8b1b1"
        id: "validation-resolution:sha256:c1be3ffe247c98846e7692ab0ed69b3e1ce550d312f1132c8fcf5b2deadcb67e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:c1be3ffe247c98846e7692ab0ed69b3e1ce550d312f1132c8fcf5b2deadcb67e"
        occurred_at: "2026-10-25T11:27:37.316Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610251040-KDBTXH"
        task_revision: 11
      -
        command_digest: "sha256:3c251570cbd272987bc1d3db00c0354943a510287c4d9da17abec7c9bfbfb6fa"
        id: "final-validation:sha256:dbfd0765218afae0e5dcfed730169d0193c61ee1a95f4653d12b574ebd87c516:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:dbfd0765218afae0e5dcfed730169d0193c61ee1a95f4653d12b574ebd87c516:11"
        occurred_at: "2026-10-25T12:04:21.996Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202610251040-KDBTXH"
        task_revision: 12
      -
        command_digest: "sha256:da5400b2a43c541ef9eff2d90a5d0d44aa564997fa864c6c367441fd7ad47cd2"
        id: "kernel_task_completion_required:sha256:44a6b71fcfca850cd97d267b9012f2d098481699df006a4762f20269f48a95a8:sha256:eb618e83fba1b24c36eed2955aa6c98bad461deeba0c234b9f44e0070fe2a5cd:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:44a6b71fcfca850cd97d267b9012f2d098481699df006a4762f20269f48a95a8:sha256:eb618e83fba1b24c36eed2955aa6c98bad461deeba0c234b9f44e0070fe2a5cd"
        occurred_at: "2026-10-25T12:23:05.048Z"
        payload_digest: "sha256:ae743eab051bd6a1e4873e5dd9f9c4f11e55aba5a3ec2b0a285930130dc72fbd"
        task_id: "202610251040-KDBTXH"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:54ebc175d5062bd17583cc599ab63bc6327beb701cc820e49ae678de363898e0"
    schema_version: 1
id_source: "generated"
---
## Summary

Keep historical compatibility package delta valid after later surface changes

For release 0.7.13, decouple immutable PR #6905 incremental Zod package history from later unrelated CLI/context full-surface changes. Preserve the exact reviewed PR #6905 record, its package-section from/to hashes, and six allowed manifest paths. Add a generic regression that accepts later unrelated surface drift but rejects package digest or path drift. Do not update the KB0 candidate JSON or weaken current candidate approval ratchets in this task.

## Scope

- In scope: For release 0.7.13, decouple immutable PR #6905 incremental Zod package history from later unrelated CLI/context full-surface changes. Preserve the exact reviewed PR #6905 record, its package-section from/to hashes, and six allowed manifest paths. Add a generic regression that accepts later unrelated surface drift but rejects package digest or path drift. Do not update the KB0 candidate JSON or weaken current candidate approval ratchets in this task.
- Out of scope: unrelated refactors not required for "Keep historical compatibility package delta valid after later surface changes".

## Plan

1. Execute approved WorkItem validate-historical-package-delta.

## Verify Steps

PLANNER fallback scaffold for "Keep historical compatibility package delta valid after later surface changes". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Keep historical compatibility package delta valid after later surface changes". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-25T12:04:26.200Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:179fea070cfed53902be9a99c7dba30b65dc58ca1a1d9b77b20e3cf39d3c63b5, input_digest=sha256:5cfd95ed9c182c1d753f88faee6776464187c28eef69e6f173a85aae104ba7bf

Details:

Check: affected_unit_integration
Command: node --test scripts/lib/compatibility-incremental-package-delta.test.mjs
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: bun run bench:compatibility:candidate:check
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run bench:compatibility:check
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: bun run hotspots:check
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: node --test scripts/lib/compatibility-incremental-package-delta.test.mjs
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: bun run bench:compatibility:candidate:check
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run bench:compatibility:check
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: bun run hotspots:check
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check critical_paths (5/5)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check full_regression

Check: task_outcome
Command: node --test scripts/lib/compatibility-incremental-package-delta.test.mjs
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: bun run bench:compatibility:candidate:check
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run bench:compatibility:check
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: bun run hotspots:check
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610251040-KDBTXH/supervision/declared-checks.json#check-5
Scope: branch_pr task 202610251040-KDBTXH Verification Contract check task_outcome (5/5)

NativeTaskIdentityRef:
- plan_digest: sha256:eca5840665eafea74c073c07e775fdeb495ffbc12b559dc92acedf0a439758c1
- policy_digest: sha256:0a1c23b8d8d34f5109077402d56c9e1fcde960daddafaea20ba2824992dfef7f
- capability_digest: sha256:29089b5a2364b286f957f6957f6d92631f4339211e822ec9e0fabf27ffb0143c
- checks_digest: sha256:78c1dfd47760a9c044b9b5b7a7a7f6f1d545e41284b6de84c22331efd8ec5794
- identity_digest: sha256:18ac921e4635ac5959654926ec9557c83d48edfeb30aa464e6de9760921e9258

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610251040-KDBTXH
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
