---
id: "202610252231-Y5Z4NW"
title: "Ratchet compatibility candidate for release versions"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 26
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run bench:compatibility:candidate:check"
  - "node --test scripts/lib/compatibility-incremental-package-delta.test.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-10-26T09:39:01.731Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-26T10:12:33.287Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-26T09:39:01.731Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "c55026626439480bbf335b924dd9944a902293e7"
  review_identity_digest: "sha256:0b1d81a0ea8e7d4e666faf48b3e8f01b1438619e33935772519ed826ad66bc96"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610252231-Y5Z4NW/ce3556eb86b76859ad9d3afe0a2ec562879bc22a455442f00aa994e29248a0fa/quality-report.json"
  findings:
    - "The v0.6.24 baseline and v0.7 candidate files are byte-identical to base cdc68137; the six-path incremental_package_delta remains an exact checker constant."
    - "Historical package hashes are checked after release-version normalization to the reviewed anchor; unrelated package drift and internal version mismatch remain rejected."
    - "Release mutation discovers one candidate, recaptures and validates it before staging, restores candidate bytes on validation failure, and rejects a symlink candidate."
    - "Native declared checks passed: six incremental-delta tests, current candidate checker, and six release mutation tests. The implementation diff has no whitespace errors."
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
      - "packages/agentplane/src/commands/release"
      - "scripts/bench"
      - "scripts/checks"
      - "scripts/lib"
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
      - "packages/agentplane/src/commands/release"
      - "scripts/bench"
      - "scripts/checks"
      - "scripts/lib"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - "packages/agentplane/src/commands/release/apply.pipeline/mutation.ts"
      - "packages/agentplane/src/commands/release/apply.version-mutation.test.ts"
      - "scripts/bench/capture-compatibility-candidate.mjs"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
      - "scripts/lib/compatibility-candidate-path.mjs"
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
          - "packages/agentplane/src/commands/release"
          - "scripts/bench"
          - "scripts/checks"
          - "scripts/lib"
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
      digest: "sha256:86768afbf38fbcfd1eaaf7c03c08d8ca7074d7aae60cbe852ebc62aff868d520"
      escalation_reasons:
        - "central_path:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "central_path:scripts/lib/compatibility-candidate-path.mjs"
        - "central_path:scripts/lib/compatibility-incremental-package-delta.mjs"
        - "central_path:scripts/lib/compatibility-incremental-package-delta.test.mjs"
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
          - "scripts"
        changed_files:
          - "packages/agentplane/src/commands/release/apply.pipeline/mutation.ts"
          - "packages/agentplane/src/commands/release/apply.version-mutation.test.ts"
          - "scripts/bench/capture-compatibility-candidate.mjs"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
          - "scripts/lib/compatibility-candidate-path.mjs"
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
  hash: "c55026626439480bbf335b924dd9944a902293e7"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-10-26T10:12:33.287Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-10-26T10:12:34.152Z"
doc_updated_by: "SUPERVISOR"
description: "Generic release ratchet with digest-sealed reviewed-version anchor, immutable historical Zod delta and v0.6.24 baseline, version-parity recapture in release mutation, and negative drift tests. Successor to non-executable 94ATB0/B4RATB plans."
sections:
  Summary: |-
    Ratchet compatibility candidate for release versions

    Generic release ratchet with digest-sealed reviewed-version anchor, immutable historical Zod delta and v0.6.24 baseline, version-parity recapture in release mutation, and negative drift tests. Successor to non-executable 94ATB0/B4RATB plans.
  Scope: |-
    - In scope: Generic release ratchet with digest-sealed reviewed-version anchor, immutable historical Zod delta and v0.6.24 baseline, version-parity recapture in release mutation, and negative drift tests. Successor to non-executable 94ATB0/B4RATB plans.
    - Out of scope: unrelated refactors not required for "Ratchet compatibility candidate for release versions".
  Plan: "1. Execute approved WorkItem ratchet-reviewed-release-compatibility-candidate."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `node --test scripts/lib/compatibility-incremental-package-delta.test.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run bench:compatibility:candidate:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-26T10:12:33.287Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67d28a0cde3da33045732473aaed1dff5479037497ce51bb1a37a1a8d249061d, input_digest=sha256:2b4bcca7cc3e9e7b6bce507dd03e0fb088767551cc6b6b24032a9801fbc3a859

    Details:

    Check: affected_unit_integration
    Command: node --test scripts/lib/compatibility-incremental-package-delta.test.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bun run bench:compatibility:candidate:check
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/commands/release/apply.version-mutation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: node --test scripts/lib/compatibility-incremental-package-delta.test.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bun run bench:compatibility:candidate:check
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: bunx vitest run packages/agentplane/src/commands/release/apply.version-mutation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check full_regression

    Check: real_e2e
    Command: node --test scripts/lib/compatibility-incremental-package-delta.test.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check real_e2e (1/4)

    Check: real_e2e
    Command: bun run bench:compatibility:candidate:check
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check real_e2e (2/4)

    Check: real_e2e
    Command: bunx vitest run packages/agentplane/src/commands/release/apply.version-mutation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check real_e2e (3/4)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check real_e2e (4/4)

    Check: task_outcome
    Command: node --test scripts/lib/compatibility-incremental-package-delta.test.mjs
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun run bench:compatibility:candidate:check
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: bunx vitest run packages/agentplane/src/commands/release/apply.version-mutation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check task_outcome (4/4)

    NativeTaskIdentityRef:
    - plan_digest: sha256:d6fdfecb90d7da838397ac13f772c37fc8bbbe1fa8f8d9e3dd299ae640fee0d9
    - policy_digest: sha256:26cbf60e57ff6118b5cdcfaa5b7bbd07e2f7c8f2e02112dc5e98fe4437e2fe64
    - capability_digest: sha256:9d4f8cb1398929141f948ef917855b028d8bbf512d22b539e9e8475efe48189f
    - checks_digest: sha256:d5cfcb18d7a716aaf5b139971fcd2cfab6823fb8369ca2f2356742927e15ed9d
    - identity_digest: sha256:79204a67066af41984d894e41a88b57a57e548900c91151ee2f6bf1a5bf940d5

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610252231-Y5Z4NW
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
    digest: "sha256:4ccd598bbf88706c23c024799eaae9d336b691dd1114afe5e53975d79417fdcc"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610252231-Y5Z4NW/ce3556eb86b76859ad9d3afe0a2ec562879bc22a455442f00aa994e29248a0fa/quality-report.json"
    findings:
      - "The v0.6.24 baseline and v0.7 candidate files are byte-identical to base cdc68137; the six-path incremental_package_delta remains an exact checker constant."
      - "Historical package hashes are checked after release-version normalization to the reviewed anchor; unrelated package drift and internal version mismatch remain rejected."
      - "Release mutation discovers one candidate, recaptures and validates it before staging, restores candidate bytes on validation failure, and rejects a symlink candidate."
      - "Native declared checks passed: six incremental-delta tests, current candidate checker, and six release mutation tests. The implementation diff has no whitespace errors."
    implementation_commit: "c55026626439480bbf335b924dd9944a902293e7"
    implementation_tree: "d721444af4110df56a3f1123fbb50fc081120ba7"
    projected_at: "2026-10-26T09:39:01.731Z"
    review_identity_digest: "sha256:0b1d81a0ea8e7d4e666faf48b3e8f01b1438619e33935772519ed826ad66bc96"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:850dc3981c73975b750ec869dca91a099eb478bc68bf4cddef9bff0aa5df95c4"
    work_order_id: "sha256:710e58912c9b58fba7e8ac550d8f65210e42094f26fbc581468bf0d0173e993b"
  task_execution_context:
    base_ref: "main"
    base_sha: "cdc68137f324840b306f26b78e7c5dc9587b51e6"
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
            digest: "sha256:53b0ceb33de491e06edca889a3c9be9ed6cf0f07a03e1ead2da3d272e70fcd8d"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:cc792d0c373118c178d7641a621b027b9ac8532438184eac10be71e71fbe87c9"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:6a32d0569fe2bf1ef77549118863a5d480fd03888b1a56c65ebb27e595d706ed"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/release"
              - "scripts/bench"
              - "scripts/checks"
              - "scripts/lib"
            task_id: "202610252231-Y5Z4NW"
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
            digest: "sha256:731a771f3e6be20ecc9399fe5e29e489878ce135b3c6b1fe1e860ebb10e414a0"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:cc792d0c373118c178d7641a621b027b9ac8532438184eac10be71e71fbe87c9"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6a32d0569fe2bf1ef77549118863a5d480fd03888b1a56c65ebb27e595d706ed"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:53b0ceb33de491e06edca889a3c9be9ed6cf0f07a03e1ead2da3d272e70fcd8d"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/release"
              - "scripts/bench"
              - "scripts/checks"
              - "scripts/lib"
            task_id: "202610252231-Y5Z4NW"
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
              - "packages/agentplane/src/commands/release/apply.pipeline/mutation.ts"
              - "packages/agentplane/src/commands/release/apply.version-mutation.test.ts"
              - "scripts/bench/capture-compatibility-candidate.mjs"
              - "scripts/checks/check-compatibility-contract-baseline.mjs"
              - "scripts/lib/compatibility-candidate-path.mjs"
              - "scripts/lib/compatibility-incremental-package-delta.mjs"
              - "scripts/lib/compatibility-incremental-package-delta.test.mjs"
            evidence_digest: "sha256:c4001f1cefc07cfc06b86ac6ee92f6194bf242e16693540aa9d362a3f6f6f473"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:642bf40ea11a495fe2ed18870d998c56547c588b0d39b0d59b719b82e361e8d8"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d6fdfecb90d7da838397ac13f772c37fc8bbbe1fa8f8d9e3dd299ae640fee0d9"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:6a32d0569fe2bf1ef77549118863a5d480fd03888b1a56c65ebb27e595d706ed"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:731a771f3e6be20ecc9399fe5e29e489878ce135b3c6b1fe1e860ebb10e414a0"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "recovery_required"
            scope_roots:
              - "packages/agentplane/src/commands/release"
              - "scripts/bench"
              - "scripts/checks"
              - "scripts/lib"
            task_id: "202610252231-Y5Z4NW"
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
            evidence_digest: "sha256:a7186aa92e8d1415dfea0b0dadab0496f152b328b5ab470b061d2b11aab0b3a4"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:541b9e069087076325d3320e75483b8e185797693bbc82054b0fb9ad622816a2"
        digest: "sha256:d6fdfecb90d7da838397ac13f772c37fc8bbbe1fa8f8d9e3dd299ae640fee0d9"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:fd886c74194d7678be383dfb4f8cf050da3023de6aff22a4d75891f40ab6bedd"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "release_metadata"
              resources: []
              scope_roots:
                - "scripts/lib"
                - "scripts/bench"
                - "scripts/checks"
                - "packages/agentplane/src/commands/release"
            expected_outputs:
              - "reviewed-version-anchor"
              - "normalized-historical-delta-check"
              - "candidate-version-ratchet"
              - "focused-negative-tests"
            id: "ratchet-reviewed-release-compatibility-candidate"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:7f2592ba526c35cd10b3e3d49756aa2bc156e99062c8b21290bd4fe1592f4f5d"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:7f733df0652d199548a8ed2d9db92b6f61e6de97210147619a71ed8daa60c1ed"
          environment_digest: "sha256:2eb2769624d17be6ae5dd1921959abd277b9230c579d664e600ba759147a9097"
          implementation_identity: "sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
          toolchain_digest: "sha256:5fe4c286a0bb4235658bb786f602098711e1c8e14131cbd101e9bfda3f1ac3de"
        observed_at: "2026-10-26T09:39:24.581Z"
        status: "PASSED"
      id: "202610252231-Y5Z4NW"
      intent_digest: "sha256:511b628ba939432bda4b9ce4b51c3c61c29ec6b2a8d0e58e887be88f67e8302b"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:d6fdfecb90d7da838397ac13f772c37fc8bbbe1fa8f8d9e3dd299ae640fee0d9:
          after_revision: 15
          aggregate_digest: "sha256:20d5fb5d4f4c05284b996571cc01014cd263d311400e4595f6fb8c1ea7a016b0"
          before_revision: 14
          command_digest: "sha256:c80817854b4fc478a7daeed877a55cc3ece87dc26c8ce1b139d5bd8841535d0e"
          effect_ids: []
          event_digests:
            - "sha256:0036154253710c8626e8b479f3e71dbae2aeb7c1d99dac709a366058a8e0c3dc"
          mutation_id: "amend:sha256:d6fdfecb90d7da838397ac13f772c37fc8bbbe1fa8f8d9e3dd299ae640fee0d9"
        capture:202610252231-Y5Z4NW:
          after_revision: 1
          aggregate_digest: "sha256:d9a48c69df5329b93cdb5d41a18e01b55623cb35f5ff3492f2e1e8feb07fc8f5"
          before_revision: 0
          command_digest: "sha256:64ab9ea29139ddf32a962e2bb65ede97dcc756270e18b80f7dca29b3617f6d0a"
          effect_ids: []
          event_digests:
            - "sha256:864c3bd342d9249fec3eeeeca6cebccfd27ae0b6ddcff6c400af85e5fa6d8cf1"
          mutation_id: "capture:202610252231-Y5Z4NW"
        final-validation:sha256:7f2592ba526c35cd10b3e3d49756aa2bc156e99062c8b21290bd4fe1592f4f5d:22:
          after_revision: 23
          aggregate_digest: "sha256:ba76721038d24272e204c93f897b988f0601ee4d7f4564e3f39a9db5a1d38ed4"
          before_revision: 22
          command_digest: "sha256:efdcedeae8217f684ef197a0e563532f17ebb01f8122f6e64ce66ee14aa84cee"
          effect_ids: []
          event_digests:
            - "sha256:642a227196fb72f51a1841413438eaa8b6c435aa11789e6b8df5d3b5fc506432"
          mutation_id: "final-validation:sha256:7f2592ba526c35cd10b3e3d49756aa2bc156e99062c8b21290bd4fe1592f4f5d:22"
        kernel_work_item_claim_required:sha256:7ecba997ad8a183e0fb7e2ad1ebc037f7e2380d9ed95f5518b3ecf7bb19804f6:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 5
          aggregate_digest: "sha256:be3d8319a48031c904a7c61e82d2b607bf2871e1bd41e164a1f121e5a6904706"
          before_revision: 4
          command_digest: "sha256:49d80bc1d7b907c73291a19be225bef4aac1191145679c03fb09dcd80455449a"
          effect_ids: []
          event_digests:
            - "sha256:3393d2d9cb9b5ff3f15eb77f3ee0f4bc01f0353921927e3e6bddd1551c16d080"
          mutation_id: "kernel_work_item_claim_required:sha256:7ecba997ad8a183e0fb7e2ad1ebc037f7e2380d9ed95f5518b3ecf7bb19804f6:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_claim_required:sha256:9bea7904d3cc42b92a981ab753801f103d4eaed745277267b78b89317e1cebea:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc:
          after_revision: 17
          aggregate_digest: "sha256:57acc24c6102eab4ec9af187969c56c154c4cf7a7077ff61593007f8ada3deb1"
          before_revision: 16
          command_digest: "sha256:225477246b51de0d962587a4894a226f9bbff593ef244a5fe14c2fb0b75e2bd6"
          effect_ids: []
          event_digests:
            - "sha256:d52b0cb64b473656c495a2aa52bffa7149f45101f19294458a24ec2c9b9a8439"
          mutation_id: "kernel_work_item_claim_required:sha256:9bea7904d3cc42b92a981ab753801f103d4eaed745277267b78b89317e1cebea:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
        kernel_work_item_execution_required:sha256:78d8fec66c05d12506458373a0c1c4b3540e10db7fcc8ca4fe63371a1aae9dc2:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc:
          after_revision: 18
          aggregate_digest: "sha256:b2bde2b08fac7e9b2a41e70202a0688ccbc2d1d1b202dda1d4f42b2903675b36"
          before_revision: 17
          command_digest: "sha256:eb6827b196ee09049eaf1608ebf828dee578377e6ebb1efbc15eec481daecdae"
          effect_ids: []
          event_digests:
            - "sha256:36682df0fef36b893966aa8d6af2d3c521a64a411e2d316b552b4ef696e4b8d7"
          mutation_id: "kernel_work_item_execution_required:sha256:78d8fec66c05d12506458373a0c1c4b3540e10db7fcc8ca4fe63371a1aae9dc2:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
        kernel_work_item_execution_required:sha256:a71bf660462f2157ce59048a49af959e65f02e0904956c88570b5d9d26810b73:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc:
          after_revision: 13
          aggregate_digest: "sha256:a2690ecfce58f30a5526ea6a4ae5898c4954afd4c35bd422bad33cb28901456d"
          before_revision: 12
          command_digest: "sha256:125aada82ddcd4c69f079ada37bade1f7d8df248a390d799b83977ce07930d17"
          effect_ids: []
          event_digests:
            - "sha256:253ffd3f4e8a4da50702fe0a9dc6b2257139ad9766555948557d04f02c399470"
          mutation_id: "kernel_work_item_execution_required:sha256:a71bf660462f2157ce59048a49af959e65f02e0904956c88570b5d9d26810b73:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
        kernel_work_item_execution_required:sha256:dca88cf32af17ec5e9d920137dfbfdfa688223e3f60ae1c986cfc9569a8261b8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 6
          aggregate_digest: "sha256:ca8c034e040ee8728a1ee8553ed466cb8cca2e53c68e15c608fe2438708295ac"
          before_revision: 5
          command_digest: "sha256:99ad3a8b8e3120f8cba9e4c76db31c76e0c387c38cea3e548700c5d27ff5e0a4"
          effect_ids: []
          event_digests:
            - "sha256:5669c94e8dfb4719c62c7b6e7a3a6da777eb3197f33568e7cc1aadb770f77fb9"
          mutation_id: "kernel_work_item_execution_required:sha256:dca88cf32af17ec5e9d920137dfbfdfa688223e3f60ae1c986cfc9569a8261b8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_inspection_required:sha256:96dc00a556958048d3308047c140f705e2bbb9e3176ae8a79864d50a386fa101:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc:
          after_revision: 9
          aggregate_digest: "sha256:17c2e249b9f9fa4f28962a9d7a0d8bc469d5d4411be0538480d410cb8098747a"
          before_revision: 8
          command_digest: "sha256:47a962a90d3b11994be5560fcb2bc63f4c7efd48aea1f63c0069de5d6db10bd2"
          effect_ids: []
          event_digests:
            - "sha256:577522a7ab5d2c4845b6f5a659e375b801b98852887853e5a5787e54b5fb79a2"
          mutation_id: "kernel_work_item_inspection_required:sha256:96dc00a556958048d3308047c140f705e2bbb9e3176ae8a79864d50a386fa101:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
        kernel_work_item_inspection_required:sha256:e60ced0d7116e1bfc7a9bff9b2d5a7a76d2e0208410db82424859f0f4917da3a:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc:
          after_revision: 20
          aggregate_digest: "sha256:3b75f5e9e448c2deed7e07458e7da1b29e01d1c95dea14ac11b7c22a5b8fd33a"
          before_revision: 19
          command_digest: "sha256:46a55c6ab9b8ca488004eb1a83643d29d5da70d627ba6272fa4d1ed3b0a735f5"
          effect_ids: []
          event_digests:
            - "sha256:e63854179ac593417caba4c10c738b29fb7567d7aa8aeca89088d5bb6615f2fa"
          mutation_id: "kernel_work_item_inspection_required:sha256:e60ced0d7116e1bfc7a9bff9b2d5a7a76d2e0208410db82424859f0f4917da3a:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
        kernel_work_item_materialization_required:sha256:4a5c0e09ba3df3f124c761da0f0c280b84db3d536159315489dbac950d60e2c8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:
          after_revision: 4
          aggregate_digest: "sha256:828bb713a668d7426af5af0a51f26eb03a9bfc0f438ac72c2f462f8bf0b72864"
          before_revision: 3
          command_digest: "sha256:d9fd2e7de9eaa2fadc9a2146719d93086edc9d7cac3921ae0f61039acc11a192"
          effect_ids: []
          event_digests:
            - "sha256:cfcefa41705bf92cabc4b10e4f526679cbca30896a970b4ea6573fc521e06ff7"
          mutation_id: "kernel_work_item_materialization_required:sha256:4a5c0e09ba3df3f124c761da0f0c280b84db3d536159315489dbac950d60e2c8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        kernel_work_item_rework_claim_required:sha256:0279374ee0ecba82da9c67346557197d912ad1c97c17cfbeabd2b6e6f342c406:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc:
          after_revision: 12
          aggregate_digest: "sha256:fc973dc8c79781706fa7fcb4ee4a76d58aadb8f6e1bdccf37231ff2e3a221c4f"
          before_revision: 11
          command_digest: "sha256:5db53ca66327e872807f01d6fbb37568169c6e229452ac93b42d50c9540dc692"
          effect_ids: []
          event_digests:
            - "sha256:1eed19c066a637060b9d5b23ca0fda8531ce6d56195fec154971281a98d8f492"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:0279374ee0ecba82da9c67346557197d912ad1c97c17cfbeabd2b6e6f342c406:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
        result:sha256:0d90bf91a73d465cc112aab9b6d877c19a3414c595894bcd11fb36abb02a1a16:
          after_revision: 2
          aggregate_digest: "sha256:0fa790eeebf3b5bec7e95a78421ed83f2b4e952b5944d7326098cdd537b1ae3a"
          before_revision: 1
          command_digest: "sha256:2aa9c73c038d3c30fdabaf254934d53cfa4f71a7c0f5fe68be14c37a54dee5b3"
          effect_ids: []
          event_digests:
            - "sha256:22c5914765ad88839e596849f1475a7b0fa92827dd4eba38adcc85557fe7f5c1"
          mutation_id: "result:sha256:0d90bf91a73d465cc112aab9b6d877c19a3414c595894bcd11fb36abb02a1a16"
        result:sha256:710e58912c9b58fba7e8ac550d8f65210e42094f26fbc581468bf0d0173e993b:
          after_revision: 8
          aggregate_digest: "sha256:4fb51dbd4d49448bbf61f989855d08cfc9c408e4aad4566493bff766b22c5268"
          before_revision: 7
          command_digest: "sha256:55c9262f8348c9211679978310de6d7f839eb702e6d6cf7eacd338fa020dead8"
          effect_ids: []
          event_digests:
            - "sha256:ac292f6fdadb46948da18569aef3d8c3be43a0488d83160a32393d7655d13e1d"
          mutation_id: "result:sha256:710e58912c9b58fba7e8ac550d8f65210e42094f26fbc581468bf0d0173e993b"
        result:sha256:bf1409936522beb0a24280f61c11e18fffeb56d9cf26ec0bfa25267fa46cd65e:
          after_revision: 19
          aggregate_digest: "sha256:44b897d3a69e1138d7064192b3130ccf7a721ae406c0e88245ea70e08d8457fd"
          before_revision: 18
          command_digest: "sha256:3d9fd6bec5b0cd27ed619231880154fe70d1a06ea89041480628c58f87ef0901"
          effect_ids: []
          event_digests:
            - "sha256:580b353c68a58f45cd3c62d232ceabec7628b32b2fbc635505e04a64c5ad4ae5"
          mutation_id: "result:sha256:bf1409936522beb0a24280f61c11e18fffeb56d9cf26ec0bfa25267fa46cd65e"
        semantic-stop:sha256:dc6e3bbb2b883c6e91920e180db83cf1d5f85180640a0fba1a8a2b0c3935b2b7:
          after_revision: 14
          aggregate_digest: "sha256:592353163e774c38b9af613d0ffe0d7b23a3d244bddf551031c375ad678eb0be"
          before_revision: 13
          command_digest: "sha256:1530a449b7cfec4dddc73f7257d8a906820437de6698d550d9e4523b965d87c4"
          effect_ids: []
          event_digests:
            - "sha256:245c5e187241919cdcc9519fa87f1858d4947b6a980957937219cdf636f3f044"
          mutation_id: "semantic-stop:sha256:dc6e3bbb2b883c6e91920e180db83cf1d5f85180640a0fba1a8a2b0c3935b2b7"
        sha256:9cfb6c86053659d5d44aa6a986476339d6b1478576f9ae7050736dfc22c7f079:
          after_revision: 16
          aggregate_digest: "sha256:86f12de48bb81ade35f4624e65e298a1035ca6b68b1279306042da41ba5ef0b5"
          before_revision: 15
          command_digest: "sha256:32576a3b1abb8c9d881cc67eabd78ba4ea8f2f58ac2cec59afc0729ea8e7bc88"
          effect_ids: []
          event_digests:
            - "sha256:e88db7a8d1d83e51b4f78791c12ba249d238e5d472af5a42427be9a49612b669"
          mutation_id: "sha256:9cfb6c86053659d5d44aa6a986476339d6b1478576f9ae7050736dfc22c7f079"
        sha256:b170e024d4968e124080d945b0621999740e490ed0b637e913b84850eb8064e3:
          after_revision: 3
          aggregate_digest: "sha256:775f5cac695bfc87592232ad8caa5714b7617716f4e8c50a8edc8b856543ebf0"
          before_revision: 2
          command_digest: "sha256:48ad7299f6f22936343da367674023ea34a88b8352e6d026def0ba3c46e2f048"
          effect_ids: []
          event_digests:
            - "sha256:c0fc0771625d5ad394bd5b9a228a0ebff5bfccde6d5393204c155c9c1f9a9a44"
          mutation_id: "sha256:b170e024d4968e124080d945b0621999740e490ed0b637e913b84850eb8064e3"
        sha256:bfbb5feea44796946eac3dd2bd4b27661b275f31370ee7642b2f4e5091866cd4:
          after_revision: 7
          aggregate_digest: "sha256:5376709366b20016c97992f019d8b86197d364a59ad234f2daf44c11eaf1a8d9"
          before_revision: 6
          command_digest: "sha256:2fc0f0fe7e5909ea4ee2efc35c428d3a49d00d6e823677349926f58d8083f9c9"
          effect_ids: []
          event_digests:
            - "sha256:ad9dfc14f6274f1a053a846642b92d54e64bbc901f0c37a26ceb4dd185dc7d4c"
          mutation_id: "sha256:bfbb5feea44796946eac3dd2bd4b27661b275f31370ee7642b2f4e5091866cd4"
        validation-resolution:sha256:b3c6b9f6ff91cf5d0d3e82d9beb95ce110c9cd72bb14cfbe48310521575616ef:
          after_revision: 22
          aggregate_digest: "sha256:46921aeba4e92c4766d46ba0ca30c0c39d368805bb8b7a77beb8d4cae7b85720"
          before_revision: 21
          command_digest: "sha256:2be24700f8541653590739da694706df18670c1bb0ab6aac9747d9c3b62d13de"
          effect_ids: []
          event_digests:
            - "sha256:98d238802515b511525406830d0d9f1e5fe1d3d72fd5eaa4463e5cfdd865d618"
          mutation_id: "validation-resolution:sha256:b3c6b9f6ff91cf5d0d3e82d9beb95ce110c9cd72bb14cfbe48310521575616ef"
        validation-resolution:sha256:ffbbd2c2ba7dbbe7a1e2971843fa8617b34ca7dff14086d6dbee74d57e42087d:
          after_revision: 11
          aggregate_digest: "sha256:bc38823107e5005d7480e757ba2aa7db91dfab0091c3d185c98daafdf88a2796"
          before_revision: 10
          command_digest: "sha256:d0fb4dc56a3f11c6a146aeeacb6fcd5baf3308eae603181afaefa0ebc18cd071"
          effect_ids: []
          event_digests:
            - "sha256:ac9f6e4257eb0d2372ae3b8b30356b07e431c8c496bceec60d219bbbc52a7ccc"
          mutation_id: "validation-resolution:sha256:ffbbd2c2ba7dbbe7a1e2971843fa8617b34ca7dff14086d6dbee74d57e42087d"
        validation:sha256:710e58912c9b58fba7e8ac550d8f65210e42094f26fbc581468bf0d0173e993b:
          after_revision: 10
          aggregate_digest: "sha256:39e7278bb83318d1e6518ed581a0a5a20371f7d4bf59ba4674c50ae98f58e4ef"
          before_revision: 9
          command_digest: "sha256:244616666e0e1a60f87a23b2b77ee7d7d483c3160c47281d6c66fc94c6d683db"
          effect_ids: []
          event_digests:
            - "sha256:4d4141280e5a2917675c557bfafff5e1e737883308ba2df192b47890ae169664"
          mutation_id: "validation:sha256:710e58912c9b58fba7e8ac550d8f65210e42094f26fbc581468bf0d0173e993b"
        validation:sha256:ce3556eb86b76859ad9d3afe0a2ec562879bc22a455442f00aa994e29248a0fa:
          after_revision: 21
          aggregate_digest: "sha256:5e5bd0d709238bf6b771e73f043888b7e6da650daf1e027a5177c59ef6e55234"
          before_revision: 20
          command_digest: "sha256:2b46430d424d5e9a7943d76e914813e650ae3558de245980091ee73694f94db9"
          effect_ids: []
          event_digests:
            - "sha256:4ee7e8fe7c9402049031fac0c955bfc2a9f185d263d21e6e2cd573137f9ec0c4"
          mutation_id: "validation:sha256:ce3556eb86b76859ad9d3afe0a2ec562879bc22a455442f00aa994e29248a0fa"
      plan_history:
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:6a32d0569fe2bf1ef77549118863a5d480fd03888b1a56c65ebb27e595d706ed"
          digest: "sha256:cc792d0c373118c178d7641a621b027b9ac8532438184eac10be71e71fbe87c9"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:0cee0d1d877a4250344f015df9760717071e1619b5b0cd4f88c0558f0954a187"
              depends_on: []
              execution_requirements:
                capabilities: []
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                  - "release_metadata"
                resources: []
                scope_roots:
                  - "scripts/lib"
                  - "scripts/bench"
                  - "scripts/checks"
                  - "packages/agentplane/src/commands/release"
              expected_outputs:
                - "reviewed-version-anchor"
                - "normalized-historical-delta-check"
                - "candidate-version-ratchet"
                - "focused-negative-tests"
              id: "ratchet-reviewed-release-compatibility-candidate"
              optional: false
              required_inputs: []
      revision: 23
      schema_version: 1
      state: "FINAL_VALIDATION"
      work_items:
        ratchet-reviewed-release-compatibility-candidate:
          attempt: 3
          claim_id: "sha256:2f22f33b5483440cd7473b224996635c0dda9c4da15256f0c68f74d8b9b9c3a8"
          definition:
            contract_digest: "sha256:fd886c74194d7678be383dfb4f8cf050da3023de6aff22a4d75891f40ab6bedd"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
                - "release_metadata"
              resources: []
              scope_roots:
                - "scripts/lib"
                - "scripts/bench"
                - "scripts/checks"
                - "packages/agentplane/src/commands/release"
            expected_outputs:
              - "reviewed-version-anchor"
              - "normalized-historical-delta-check"
              - "candidate-version-ratchet"
              - "focused-negative-tests"
            id: "ratchet-reviewed-release-compatibility-candidate"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 3
              digest: "sha256:6fc5d32de9fd02bc3f4ef4ddcfa881867e8f91b852ea509e8488a7a6479e11ce"
              id: "reviewed-version-anchor"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
              task_id: "202610252231-Y5Z4NW"
              work_item_id: "ratchet-reviewed-release-compatibility-candidate"
            -
              attempt: 3
              digest: "sha256:28cc4c9ef2b20aa8ea202b2d1a744201837b1de8cd2f0f01843c72b601c3ed2a"
              id: "normalized-historical-delta-check"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
              task_id: "202610252231-Y5Z4NW"
              work_item_id: "ratchet-reviewed-release-compatibility-candidate"
            -
              attempt: 3
              digest: "sha256:a084998e62605a34c2816efc85a515444a23f2d0f5c459a5749e9a290aff003a"
              id: "candidate-version-ratchet"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
              task_id: "202610252231-Y5Z4NW"
              work_item_id: "ratchet-reviewed-release-compatibility-candidate"
            -
              attempt: 3
              digest: "sha256:6e02ce31e02256a07095e2c67ab1e454d1538949490fbfcf1a558727495c9389"
              id: "focused-negative-tests"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
              task_id: "202610252231-Y5Z4NW"
              work_item_id: "ratchet-reviewed-release-compatibility-candidate"
          result_digest: "sha256:c49816c638a5248163bfc6bbfe3425be955c3d15bb6dff86b8a65ed1277eba9f"
          revision: 18
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:401024a69bf6a20269ef556cf682a04ec50278974a2d18b8e2caf0e9bc231190"
              - "sha256:0b1d81a0ea8e7d4e666faf48b3e8f01b1438619e33935772519ed826ad66bc96"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:7f733df0652d199548a8ed2d9db92b6f61e6de97210147619a71ed8daa60c1ed"
              environment_digest: "sha256:0a6a9142c4fc98b0b5457949b0590095e673d98dee7b253822208f9959dd32e3"
              implementation_identity: "sha256:c49816c638a5248163bfc6bbfe3425be955c3d15bb6dff86b8a65ed1277eba9f"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-26T09:39:01.731Z"
            status: "PASSED"
    digest: "sha256:e5b21ea7df8039fafb2ace6d3054bc3c04271e3d7e2e15fb9c3391d2bf7e5e50"
    documents:
      contracts:
        sha256:0cee0d1d877a4250344f015df9760717071e1619b5b0cd4f88c0558f0954a187:
          acceptance_criteria:
            - "Preserve the v0.6.24 baseline and incremental_package_delta object byte-for-byte."
            - "A release-only package version bump recaptures a stable digest-validated reviewed-version anchor and the candidate release_version_delta, and passes the compatibility checker after mutation."
            - "Unrelated package or dependency drift, non-parity internal versions, changed reviewed paths or hashes, tampered reviewed-version anchor, and changed candidate metadata are rejected."
            - "Release mutation stages the recaptured candidate with version metadata in one native release commit; there is no version-specific or Factory adapter."
            - "Focused tests pass; full CI runs sequentially once the heavy slot is available."
          objective: "Make release candidate version ratcheting generic and fail closed without modifying the immutable baseline or reviewed Zod delta."
          role: "EXECUTOR"
          verification_commands:
            - "node --test scripts/lib/compatibility-incremental-package-delta.test.mjs"
            - "bun run bench:compatibility:candidate:check"
            - "Focused release mutation tests covering candidate recapture and negative drift"
        sha256:fd886c74194d7678be383dfb4f8cf050da3023de6aff22a4d75891f40ab6bedd:
          acceptance_criteria:
            - "Preserve the v0.6.24 baseline and incremental_package_delta object byte-for-byte."
            - "A release-only package version bump recaptures a stable digest-validated reviewed-version anchor and the candidate release_version_delta, and passes the compatibility checker after mutation."
            - "Unrelated package or dependency drift, non-parity internal versions, changed reviewed paths or hashes, tampered reviewed-version anchor, and changed candidate metadata are rejected."
            - "Release mutation stages the recaptured candidate with version metadata in one native release commit; there is no version-specific or Factory adapter."
            - "Focused tests pass; full CI runs sequentially once the heavy slot is available."
          objective: "Make release candidate version ratcheting generic and fail closed without modifying the immutable baseline or reviewed Zod delta."
          role: "EXECUTOR"
          verification_commands:
            - "node --test scripts/lib/compatibility-incremental-package-delta.test.mjs"
            - "bun run bench:compatibility:candidate:check"
            - "bunx vitest run packages/agentplane/src/commands/release/apply.version-mutation.test.ts"
      intent:
        context: "Generic release ratchet with digest-sealed reviewed-version anchor, immutable historical Zod delta and v0.6.24 baseline, version-parity recapture in release mutation, and negative drift tests. Successor to non-executable 94ATB0/B4RATB plans."
        objective: "Ratchet compatibility candidate for release versions"
    events:
      -
        command_digest: "sha256:64ab9ea29139ddf32a962e2bb65ede97dcc756270e18b80f7dca29b3617f6d0a"
        id: "capture:202610252231-Y5Z4NW:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610252231-Y5Z4NW"
        occurred_at: "2026-10-25T22:31:26.115Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 1
      -
        command_digest: "sha256:2aa9c73c038d3c30fdabaf254934d53cfa4f71a7c0f5fe68be14c37a54dee5b3"
        id: "result:sha256:0d90bf91a73d465cc112aab9b6d877c19a3414c595894bcd11fb36abb02a1a16:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:0d90bf91a73d465cc112aab9b6d877c19a3414c595894bcd11fb36abb02a1a16"
        occurred_at: "2026-10-25T22:32:03.968Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 2
      -
        command_digest: "sha256:48ad7299f6f22936343da367674023ea34a88b8352e6d026def0ba3c46e2f048"
        id: "sha256:b170e024d4968e124080d945b0621999740e490ed0b637e913b84850eb8064e3:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:b170e024d4968e124080d945b0621999740e490ed0b637e913b84850eb8064e3"
        occurred_at: "2026-10-25T22:32:38.768Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 3
      -
        command_digest: "sha256:d9fd2e7de9eaa2fadc9a2146719d93086edc9d7cac3921ae0f61039acc11a192"
        id: "kernel_work_item_materialization_required:sha256:4a5c0e09ba3df3f124c761da0f0c280b84db3d536159315489dbac950d60e2c8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:4a5c0e09ba3df3f124c761da0f0c280b84db3d536159315489dbac950d60e2c8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-25T22:33:00.512Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 4
      -
        command_digest: "sha256:49d80bc1d7b907c73291a19be225bef4aac1191145679c03fb09dcd80455449a"
        id: "kernel_work_item_claim_required:sha256:7ecba997ad8a183e0fb7e2ad1ebc037f7e2380d9ed95f5518b3ecf7bb19804f6:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:7ecba997ad8a183e0fb7e2ad1ebc037f7e2380d9ed95f5518b3ecf7bb19804f6:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-25T22:33:18.950Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 5
      -
        command_digest: "sha256:99ad3a8b8e3120f8cba9e4c76db31c76e0c387c38cea3e548700c5d27ff5e0a4"
        id: "kernel_work_item_execution_required:sha256:dca88cf32af17ec5e9d920137dfbfdfa688223e3f60ae1c986cfc9569a8261b8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:dca88cf32af17ec5e9d920137dfbfdfa688223e3f60ae1c986cfc9569a8261b8:sha256:7073225ebbeca5f5e265bf7f3cac13115b3108d6278b95a4543ef7bb2eede312"
        occurred_at: "2026-10-25T22:33:50.618Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 6
      -
        command_digest: "sha256:2fc0f0fe7e5909ea4ee2efc35c428d3a49d00d6e823677349926f58d8083f9c9"
        id: "sha256:bfbb5feea44796946eac3dd2bd4b27661b275f31370ee7642b2f4e5091866cd4:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:bfbb5feea44796946eac3dd2bd4b27661b275f31370ee7642b2f4e5091866cd4"
        occurred_at: "2026-10-26T00:22:28.108Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 7
      -
        command_digest: "sha256:55c9262f8348c9211679978310de6d7f839eb702e6d6cf7eacd338fa020dead8"
        id: "result:sha256:710e58912c9b58fba7e8ac550d8f65210e42094f26fbc581468bf0d0173e993b:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:710e58912c9b58fba7e8ac550d8f65210e42094f26fbc581468bf0d0173e993b"
        occurred_at: "2026-10-26T01:46:55.656Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 8
      -
        command_digest: "sha256:47a962a90d3b11994be5560fcb2bc63f4c7efd48aea1f63c0069de5d6db10bd2"
        id: "kernel_work_item_inspection_required:sha256:96dc00a556958048d3308047c140f705e2bbb9e3176ae8a79864d50a386fa101:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:96dc00a556958048d3308047c140f705e2bbb9e3176ae8a79864d50a386fa101:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
        occurred_at: "2026-10-26T01:47:05.809Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 9
      -
        command_digest: "sha256:244616666e0e1a60f87a23b2b77ee7d7d483c3160c47281d6c66fc94c6d683db"
        id: "validation:sha256:710e58912c9b58fba7e8ac550d8f65210e42094f26fbc581468bf0d0173e993b:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:710e58912c9b58fba7e8ac550d8f65210e42094f26fbc581468bf0d0173e993b"
        occurred_at: "2026-10-26T01:47:29.673Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 10
      -
        command_digest: "sha256:d0fb4dc56a3f11c6a146aeeacb6fcd5baf3308eae603181afaefa0ebc18cd071"
        id: "validation-resolution:sha256:ffbbd2c2ba7dbbe7a1e2971843fa8617b34ca7dff14086d6dbee74d57e42087d:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:ffbbd2c2ba7dbbe7a1e2971843fa8617b34ca7dff14086d6dbee74d57e42087d"
        occurred_at: "2026-10-26T01:47:35.884Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 11
      -
        command_digest: "sha256:5db53ca66327e872807f01d6fbb37568169c6e229452ac93b42d50c9540dc692"
        id: "kernel_work_item_rework_claim_required:sha256:0279374ee0ecba82da9c67346557197d912ad1c97c17cfbeabd2b6e6f342c406:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:0279374ee0ecba82da9c67346557197d912ad1c97c17cfbeabd2b6e6f342c406:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
        occurred_at: "2026-10-26T01:47:48.125Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 12
      -
        command_digest: "sha256:125aada82ddcd4c69f079ada37bade1f7d8df248a390d799b83977ce07930d17"
        id: "kernel_work_item_execution_required:sha256:a71bf660462f2157ce59048a49af959e65f02e0904956c88570b5d9d26810b73:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:a71bf660462f2157ce59048a49af959e65f02e0904956c88570b5d9d26810b73:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
        occurred_at: "2026-10-26T01:47:58.806Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 13
      -
        command_digest: "sha256:1530a449b7cfec4dddc73f7257d8a906820437de6698d550d9e4523b965d87c4"
        id: "semantic-stop:sha256:dc6e3bbb2b883c6e91920e180db83cf1d5f85180640a0fba1a8a2b0c3935b2b7:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:dc6e3bbb2b883c6e91920e180db83cf1d5f85180640a0fba1a8a2b0c3935b2b7"
        occurred_at: "2026-10-26T02:21:46.730Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 14
      -
        command_digest: "sha256:c80817854b4fc478a7daeed877a55cc3ece87dc26c8ce1b139d5bd8841535d0e"
        id: "amend:sha256:d6fdfecb90d7da838397ac13f772c37fc8bbbe1fa8f8d9e3dd299ae640fee0d9:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:d6fdfecb90d7da838397ac13f772c37fc8bbbe1fa8f8d9e3dd299ae640fee0d9"
        occurred_at: "2026-10-26T08:41:59.246Z"
        payload_digest: "sha256:36be904ca7a7b0203be7b7ae9baf0f6b429970e74f83ac756501ba6bd5218510"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 15
      -
        command_digest: "sha256:32576a3b1abb8c9d881cc67eabd78ba4ea8f2f58ac2cec59afc0729ea8e7bc88"
        id: "sha256:9cfb6c86053659d5d44aa6a986476339d6b1478576f9ae7050736dfc22c7f079:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:9cfb6c86053659d5d44aa6a986476339d6b1478576f9ae7050736dfc22c7f079"
        occurred_at: "2026-10-26T08:42:13.560Z"
        payload_digest: "sha256:78dd6ac649c565c35490aeb70160706aa88aa733ec122055c0a70e463bd68bc9"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 16
      -
        command_digest: "sha256:225477246b51de0d962587a4894a226f9bbff593ef244a5fe14c2fb0b75e2bd6"
        id: "kernel_work_item_claim_required:sha256:9bea7904d3cc42b92a981ab753801f103d4eaed745277267b78b89317e1cebea:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:9bea7904d3cc42b92a981ab753801f103d4eaed745277267b78b89317e1cebea:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
        occurred_at: "2026-10-26T08:44:23.104Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 17
      -
        command_digest: "sha256:eb6827b196ee09049eaf1608ebf828dee578377e6ebb1efbc15eec481daecdae"
        id: "kernel_work_item_execution_required:sha256:78d8fec66c05d12506458373a0c1c4b3540e10db7fcc8ca4fe63371a1aae9dc2:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:78d8fec66c05d12506458373a0c1c4b3540e10db7fcc8ca4fe63371a1aae9dc2:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
        occurred_at: "2026-10-26T08:44:50.225Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 18
      -
        command_digest: "sha256:3d9fd6bec5b0cd27ed619231880154fe70d1a06ea89041480628c58f87ef0901"
        id: "result:sha256:bf1409936522beb0a24280f61c11e18fffeb56d9cf26ec0bfa25267fa46cd65e:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:bf1409936522beb0a24280f61c11e18fffeb56d9cf26ec0bfa25267fa46cd65e"
        occurred_at: "2026-10-26T09:35:27.474Z"
        payload_digest: "sha256:ebd1d26979c15ea9d35984c80958a5408912ed4f7fc2073ab72919b5d8d1e3ac"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 19
      -
        command_digest: "sha256:46a55c6ab9b8ca488004eb1a83643d29d5da70d627ba6272fa4d1ed3b0a735f5"
        id: "kernel_work_item_inspection_required:sha256:e60ced0d7116e1bfc7a9bff9b2d5a7a76d2e0208410db82424859f0f4917da3a:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:e60ced0d7116e1bfc7a9bff9b2d5a7a76d2e0208410db82424859f0f4917da3a:sha256:491f7bf44b5e88730ebd4f479bd31001e224395813b2aeb6a96ffef24bb005dc"
        occurred_at: "2026-10-26T09:35:35.795Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 20
      -
        command_digest: "sha256:2b46430d424d5e9a7943d76e914813e650ae3558de245980091ee73694f94db9"
        id: "validation:sha256:ce3556eb86b76859ad9d3afe0a2ec562879bc22a455442f00aa994e29248a0fa:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:ce3556eb86b76859ad9d3afe0a2ec562879bc22a455442f00aa994e29248a0fa"
        occurred_at: "2026-10-26T09:39:10.831Z"
        payload_digest: "sha256:c185f2c453834b528de9c7066dddaaadf15d9a34a224042caeb9dc9a69cb8b33"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 21
      -
        command_digest: "sha256:2be24700f8541653590739da694706df18670c1bb0ab6aac9747d9c3b62d13de"
        id: "validation-resolution:sha256:b3c6b9f6ff91cf5d0d3e82d9beb95ce110c9cd72bb14cfbe48310521575616ef:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:b3c6b9f6ff91cf5d0d3e82d9beb95ce110c9cd72bb14cfbe48310521575616ef"
        occurred_at: "2026-10-26T09:39:16.062Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 22
      -
        command_digest: "sha256:efdcedeae8217f684ef197a0e563532f17ebb01f8122f6e64ce66ee14aa84cee"
        id: "final-validation:sha256:7f2592ba526c35cd10b3e3d49756aa2bc156e99062c8b21290bd4fe1592f4f5d:22:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:7f2592ba526c35cd10b3e3d49756aa2bc156e99062c8b21290bd4fe1592f4f5d:22"
        occurred_at: "2026-10-26T10:12:30.582Z"
        payload_digest: "sha256:5170768b510890851661efb6a219fd27ba44980cb9649f091ee3ab630bdf2ecf"
        task_id: "202610252231-Y5Z4NW"
        task_revision: 23
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Ratchet compatibility candidate for release versions

Generic release ratchet with digest-sealed reviewed-version anchor, immutable historical Zod delta and v0.6.24 baseline, version-parity recapture in release mutation, and negative drift tests. Successor to non-executable 94ATB0/B4RATB plans.

## Scope

- In scope: Generic release ratchet with digest-sealed reviewed-version anchor, immutable historical Zod delta and v0.6.24 baseline, version-parity recapture in release mutation, and negative drift tests. Successor to non-executable 94ATB0/B4RATB plans.
- Out of scope: unrelated refactors not required for "Ratchet compatibility candidate for release versions".

## Plan

1. Execute approved WorkItem ratchet-reviewed-release-compatibility-candidate.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `node --test scripts/lib/compatibility-incremental-package-delta.test.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run bench:compatibility:candidate:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-26T10:12:33.287Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67d28a0cde3da33045732473aaed1dff5479037497ce51bb1a37a1a8d249061d, input_digest=sha256:2b4bcca7cc3e9e7b6bce507dd03e0fb088767551cc6b6b24032a9801fbc3a859

Details:

Check: affected_unit_integration
Command: node --test scripts/lib/compatibility-incremental-package-delta.test.mjs
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bun run bench:compatibility:candidate:check
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/commands/release/apply.version-mutation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: node --test scripts/lib/compatibility-incremental-package-delta.test.mjs
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bun run bench:compatibility:candidate:check
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: bunx vitest run packages/agentplane/src/commands/release/apply.version-mutation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check full_regression

Check: real_e2e
Command: node --test scripts/lib/compatibility-incremental-package-delta.test.mjs
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check real_e2e (1/4)

Check: real_e2e
Command: bun run bench:compatibility:candidate:check
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check real_e2e (2/4)

Check: real_e2e
Command: bunx vitest run packages/agentplane/src/commands/release/apply.version-mutation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check real_e2e (3/4)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check real_e2e (4/4)

Check: task_outcome
Command: node --test scripts/lib/compatibility-incremental-package-delta.test.mjs
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun run bench:compatibility:candidate:check
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: bunx vitest run packages/agentplane/src/commands/release/apply.version-mutation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610252231-Y5Z4NW/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610252231-Y5Z4NW Verification Contract check task_outcome (4/4)

NativeTaskIdentityRef:
- plan_digest: sha256:d6fdfecb90d7da838397ac13f772c37fc8bbbe1fa8f8d9e3dd299ae640fee0d9
- policy_digest: sha256:26cbf60e57ff6118b5cdcfaa5b7bbd07e2f7c8f2e02112dc5e98fe4437e2fe64
- capability_digest: sha256:9d4f8cb1398929141f948ef917855b028d8bbf512d22b539e9e8475efe48189f
- checks_digest: sha256:d5cfcb18d7a716aaf5b139971fcd2cfab6823fb8369ca2f2356742927e15ed9d
- identity_digest: sha256:79204a67066af41984d894e41a88b57a57e548900c91151ee2f6bf1a5bf940d5

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610252231-Y5Z4NW
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
