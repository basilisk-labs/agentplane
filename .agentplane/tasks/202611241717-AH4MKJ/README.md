---
id: "202611241717-AH4MKJ"
title: "Verify only git-reported changed files in repo-local CLI dist freshness guard"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 46
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-11-24T17:57:50.614Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-11-24T18:11:06.452Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-11-24T17:57:50.614Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "539a837e7322b418409d268ce9535d609de00227"
  review_identity_digest: "sha256:9eced194258468b7692001cbf00e203b7fecd6e2de04ea607ae4762901bbd719"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202611241717-AH4MKJ/ea5c379dfbf043b978993777b1277ed2a62246e5c251a9b069fb7421d17e5f0d/quality-report.json"
  findings:
    - "criterion-1: Commit 539a837e7 changes only packages/agentplane/src/cli/dist-guard.test.ts (11 insertions, 11 deletions). The diff is a verbatim move of tamperRecordedHash to module scope. packages/agentplane/bin/dist-guard.js is unchanged from 1335841b0. Prior test cases and evidence are preserved."
    - "criterion-2: The evaluator ran `bun run lint:core`: 0 errors, 5 warnings in unrelated files. The evaluator ran `bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts`: 2 files, 22 tests passed."
    - "criterion-3: The correction adds no eslint-disable comments. It changes no ESLint config, package.json or bun.lock. Its only non-task-artifact path is the test file inside the approved writable roots."
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
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects: []
    allowed_repository_effects:
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/bin/dist-guard.js"
      - "packages/agentplane/src/cli/dist-guard.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "direct"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/bin/dist-guard.js"
      - "packages/agentplane/src/cli/dist-guard.test.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/bin/dist-guard.js"
      - "packages/agentplane/src/cli/dist-guard.test.ts"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/bin/dist-guard.js"
          - "packages/agentplane/src/cli/dist-guard.test.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:550be2bad2e2241c2d3a5c2f5b0746095427a7099b91a578c1082634a17ac70f"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/dist-guard.test.ts"
        - "central_path:packages/agentplane/src/cli/dist-guard.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/bin/dist-guard.js"
          - "packages/agentplane/src/cli/dist-guard.test.ts"
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
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "539a837e7322b418409d268ce9535d609de00227"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-11-24T18:11:06.452Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-11-24T18:11:07.207Z"
doc_updated_by: "SUPERVISOR"
description: "In the framework checkout every agentplane invocation runs bin/dist-guard.js isPackageBuildFresh. When git reports any changed watched path, it walks and SHA-256 hashes all ~1518 watched runtime files, adding about 300 ms to every CLI call. Compare only the git-reported changed files against the per-file hashes already recorded in dist/.build-manifest.json, fall back to the full snapshot only for ambiguous git output, and add regression tests. Supersedes 202611241658-HZ1TA6, whose intake scope omitted the test file."
sections:
  Summary: |-
    Verify only git-reported changed files in repo-local CLI dist freshness guard

    In the framework checkout every agentplane invocation runs bin/dist-guard.js isPackageBuildFresh. When git reports any changed watched path, it walks and SHA-256 hashes all ~1518 watched runtime files, adding about 300 ms to every CLI call. Compare only the git-reported changed files against the per-file hashes already recorded in dist/.build-manifest.json, fall back to the full snapshot only for ambiguous git output, and add regression tests. Supersedes 202611241658-HZ1TA6, whose intake scope omitted the test file.
  Scope: |-
    - In scope: In the framework checkout every agentplane invocation runs bin/dist-guard.js isPackageBuildFresh. When git reports any changed watched path, it walks and SHA-256 hashes all ~1518 watched runtime files, adding about 300 ms to every CLI call. Compare only the git-reported changed files against the per-file hashes already recorded in dist/.build-manifest.json, fall back to the full snapshot only for ambiguous git output, and add regression tests. Supersedes 202611241658-HZ1TA6, whose intake scope omitted the test file.
    - Out of scope: unrelated refactors not required for "Verify only git-reported changed files in repo-local CLI dist freshness guard".
  Plan: |-
    1. Execute approved WorkItem incremental-dist-freshness.
    2. Execute approved WorkItem final-correction-4313f6e3a2f7.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-11-24T18:11:06.452Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:576ca15861e25dd7e114cf834a3fc8b2f3b9b0f319d2c983d854200641a2a693, input_digest=sha256:2d469632f546eb69ca5207aebf1e32040155ed9d14a965c94cbb158b99bc9d9e

    Details:

    Check: affected_unit_integration
    Command: bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611241717-AH4MKJ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202611241717-AH4MKJ Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202611241717-AH4MKJ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202611241717-AH4MKJ Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611241717-AH4MKJ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202611241717-AH4MKJ Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202611241717-AH4MKJ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202611241717-AH4MKJ Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202611241717-AH4MKJ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202611241717-AH4MKJ Verification Contract check full_regression

    Check: task_outcome
    Command: bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202611241717-AH4MKJ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202611241717-AH4MKJ Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202611241717-AH4MKJ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202611241717-AH4MKJ Verification Contract check task_outcome (2/2)

    NativeTaskIdentityRef:
    - plan_digest: sha256:475a63b2e2364890dae18f72cd11d8650b25bdb1ab6c5cdb51511e755ec1499a
    - policy_digest: sha256:5969d69ad7383875e82dd5e860b3156e5ba4406cbcd617ffa342e6d388092dd1
    - capability_digest: sha256:2749d8ae7a2a89053b93d1e8d5255faa037c778d20706b3338d3cb71ede35436
    - checks_digest: sha256:61c286745c1a61dfdcb2558a6b859b8ae09022f629359775807b61afe44d3e7c
    - identity_digest: sha256:a046056d0c1321c0320978bb5e495f7f8ef542895f9de84d19b123d709aa5d94

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202611241717-AH4MKJ
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
    digest: "sha256:145538c21c3b2838b1a74cfbe71e2017f1e1802fd3b0bbd552219e20ac365cbf"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202611241717-AH4MKJ/ea5c379dfbf043b978993777b1277ed2a62246e5c251a9b069fb7421d17e5f0d/quality-report.json"
    findings:
      - "criterion-1: Commit 539a837e7 changes only packages/agentplane/src/cli/dist-guard.test.ts (11 insertions, 11 deletions). The diff is a verbatim move of tamperRecordedHash to module scope. packages/agentplane/bin/dist-guard.js is unchanged from 1335841b0. Prior test cases and evidence are preserved."
      - "criterion-2: The evaluator ran `bun run lint:core`: 0 errors, 5 warnings in unrelated files. The evaluator ran `bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts`: 2 files, 22 tests passed."
      - "criterion-3: The correction adds no eslint-disable comments. It changes no ESLint config, package.json or bun.lock. Its only non-task-artifact path is the test file inside the approved writable roots."
    implementation_commit: "539a837e7322b418409d268ce9535d609de00227"
    implementation_tree: "8b56f1f5ce8664d34edc31964a132c8752f923be"
    projected_at: "2026-11-24T17:57:50.614Z"
    review_identity_digest: "sha256:9eced194258468b7692001cbf00e203b7fecd6e2de04ea607ae4762901bbd719"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:a453f97bca7f9e6f73afc5a3be3f98c0a4a3102f4a6d8521f969cc2f3a67b5c5"
    work_order_id: "sha256:6b0f792ffb6f016f99b0e6fe0020d3b1df9e9184b86907c6bc59364231f86e4e"
  task_execution_context:
    base_ref: "main"
    base_sha: "0582344612d4d68bb6e3255637f0e086934ac19c"
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
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:720311f115130fbc64cf232201ee1180b3c54bc6906c91f958c00bb42ac667c0"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3e5f05f1c46b38fb94f5489d7776b833442e850d940a01017ed18591299944ae"
            plan_revision: 1
            policy_digests:
              - "sha256:2f720021015893194bf48bef73f3dc3103471a6bac82e3d567ce2497f786d700"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:051ac16fa51c171535f63b460b76a8297d841bf4a53b268e333f5437a943b471"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/bin/dist-guard.js"
              - "packages/agentplane/src/cli/dist-guard.test.ts"
            task_id: "202611241717-AH4MKJ"
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
            digest: "sha256:e7f0f35fb11b28068fb74cac634b665f7d01315280ed99fc78852b31c1bd6da1"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3e5f05f1c46b38fb94f5489d7776b833442e850d940a01017ed18591299944ae"
            plan_revision: 1
            policy_digests:
              - "sha256:2f720021015893194bf48bef73f3dc3103471a6bac82e3d567ce2497f786d700"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:051ac16fa51c171535f63b460b76a8297d841bf4a53b268e333f5437a943b471"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:720311f115130fbc64cf232201ee1180b3c54bc6906c91f958c00bb42ac667c0"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:6af207b42a2f6b1ec0497ce4fa867cbf0bc181d65b6a56352c9394e918645320"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/bin/dist-guard.js"
              - "packages/agentplane/src/cli/dist-guard.test.ts"
            task_id: "202611241717-AH4MKJ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:6ddce898e89a0bbafd72c67972d06e55486b27234505155c49bdff60e63b148b"
            kind: "worktree_preparation"
            previous_fingerprint: "sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:39e499a7bfad9773405a6c0e0bc27a58b6fd5db9a38a4854098548a6d08304c1"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3e5f05f1c46b38fb94f5489d7776b833442e850d940a01017ed18591299944ae"
            plan_revision: 1
            policy_digests:
              - "sha256:2f720021015893194bf48bef73f3dc3103471a6bac82e3d567ce2497f786d700"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:051ac16fa51c171535f63b460b76a8297d841bf4a53b268e333f5437a943b471"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:e7f0f35fb11b28068fb74cac634b665f7d01315280ed99fc78852b31c1bd6da1"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/bin/dist-guard.js"
              - "packages/agentplane/src/cli/dist-guard.test.ts"
            task_id: "202611241717-AH4MKJ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/bin/dist-guard.js"
              - "packages/agentplane/src/cli/dist-guard.test.ts"
            evidence_digest: "sha256:5339319b1a8486592e6c497168da391cd5d769d9c1d14f3f25f014e172fd3707"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:6af207b42a2f6b1ec0497ce4fa867cbf0bc181d65b6a56352c9394e918645320"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:98e95f226bc8b8487ecea4b19ea4abdb71f04c6edc3f9133126f81b8c451cac6"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3e5f05f1c46b38fb94f5489d7776b833442e850d940a01017ed18591299944ae"
            plan_revision: 1
            policy_digests:
              - "sha256:2f720021015893194bf48bef73f3dc3103471a6bac82e3d567ce2497f786d700"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:051ac16fa51c171535f63b460b76a8297d841bf4a53b268e333f5437a943b471"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:39e499a7bfad9773405a6c0e0bc27a58b6fd5db9a38a4854098548a6d08304c1"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/bin/dist-guard.js"
              - "packages/agentplane/src/cli/dist-guard.test.ts"
            task_id: "202611241717-AH4MKJ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/bin/dist-guard.js"
              - "packages/agentplane/src/cli/dist-guard.test.ts"
            evidence_digest: "sha256:8d2bf055bd45d3ac964468bb30f67d0f10cc4019f7070ab223f74233e4604ca5"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:efb3afd7125e0aac090c6abb9bfb71f28241bf549a9d97c70414913a65bc0b90"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:3e5f05f1c46b38fb94f5489d7776b833442e850d940a01017ed18591299944ae"
            plan_revision: 1
            policy_digests:
              - "sha256:2f720021015893194bf48bef73f3dc3103471a6bac82e3d567ce2497f786d700"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:051ac16fa51c171535f63b460b76a8297d841bf4a53b268e333f5437a943b471"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:98e95f226bc8b8487ecea4b19ea4abdb71f04c6edc3f9133126f81b8c451cac6"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/bin/dist-guard.js"
              - "packages/agentplane/src/cli/dist-guard.test.ts"
            task_id: "202611241717-AH4MKJ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/bin/dist-guard.js"
              - "packages/agentplane/src/cli/dist-guard.test.ts"
            evidence_digest: "sha256:1216c75f6397ab1f41ef45a259b3e203059bca213f302dad3f4b7e60b2ee83d3"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:66ec54c1237023ddc288c2fa2d370590c0ce0ce39659bff3d27aadd7d5f3c54f"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:475a63b2e2364890dae18f72cd11d8650b25bdb1ab6c5cdb51511e755ec1499a"
            plan_revision: 2
            policy_digests:
              - "sha256:2f720021015893194bf48bef73f3dc3103471a6bac82e3d567ce2497f786d700"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:051ac16fa51c171535f63b460b76a8297d841bf4a53b268e333f5437a943b471"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:efb3afd7125e0aac090c6abb9bfb71f28241bf549a9d97c70414913a65bc0b90"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/bin/dist-guard.js"
              - "packages/agentplane/src/cli/dist-guard.test.ts"
            task_id: "202611241717-AH4MKJ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            added_scope_roots: []
            changed_paths: []
            evidence_digest: "sha256:ab214216c1a98da488d46b4baf65875102400d4bfc5e2da3cb68e52d8142ab09"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:cd08a4be74061e95b4a044e46e83a2a0bc726bd984cea723df76611e6e8fec6a"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:475a63b2e2364890dae18f72cd11d8650b25bdb1ab6c5cdb51511e755ec1499a"
            plan_revision: 2
            policy_digests:
              - "sha256:2f720021015893194bf48bef73f3dc3103471a6bac82e3d567ce2497f786d700"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:051ac16fa51c171535f63b460b76a8297d841bf4a53b268e333f5437a943b471"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:66ec54c1237023ddc288c2fa2d370590c0ce0ce39659bff3d27aadd7d5f3c54f"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:88878855fa5de3ea8618c53e77d5951376d4602fe932fec9fa2f838e7108b009"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/bin/dist-guard.js"
              - "packages/agentplane/src/cli/dist-guard.test.ts"
            task_id: "202611241717-AH4MKJ"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/dist-guard.test.ts"
            evidence_digest: "sha256:df60a5a92021b38b634e2743623014c9465063f87f54781ec4ec6d79fe0e396e"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:e296d35b77725e873fcc4744d449740fb8b6394aecf76de7bfc193ff0c0c8852"
        digest: "sha256:475a63b2e2364890dae18f72cd11d8650b25bdb1ab6c5cdb51511e755ec1499a"
        revision: 2
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:26f8772782da37c494150c743ccd3c3bc2ee3db73aa9d170a18f771344ee4d75"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/bin/dist-guard.js"
                - "packages/agentplane/src/cli/dist-guard.test.ts"
            expected_outputs:
              - "packages/agentplane/bin/dist-guard.js"
              - "packages/agentplane/src/cli/dist-guard.test.ts"
            id: "incremental-dist-freshness"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:52be0c508c62d496e3b1a6124d1294d430b7ce8186ed7715bcbf5c7d8cd728a4"
            depends_on:
              - "incremental-dist-freshness"
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/bin/dist-guard.js"
                - "packages/agentplane/src/cli/dist-guard.test.ts"
            expected_outputs:
              - "final-correction-4313f6e3a2f7-evidence"
            id: "final-correction-4313f6e3a2f7"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:a453f97bca7f9e6f73afc5a3be3f98c0a4a3102f4a6d8521f969cc2f3a67b5c5"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:6e3341dcc3db2b77beb53e5272d538f51122938132edd60ee03386664c7d9efb"
          environment_digest: "sha256:d790c156c6e99faefc14bc313d6dc0b69ac0c4d9859aa30c2be9d18ee42e509a"
          implementation_identity: "sha256:88878855fa5de3ea8618c53e77d5951376d4602fe932fec9fa2f838e7108b009"
          toolchain_digest: "sha256:4f631fc3ec70480f65731bb541af1fe746c9d2dc11cbb83b37d52478f2005fcb"
        observed_at: "2026-11-24T17:57:57.057Z"
        status: "PASSED"
      id: "202611241717-AH4MKJ"
      intent_digest: "sha256:2a6ef0f51eed5d1b813ca62f5c967d519d21697fd07bbecff7ab05eb3ba56fac"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:475a63b2e2364890dae18f72cd11d8650b25bdb1ab6c5cdb51511e755ec1499a:
          after_revision: 29
          aggregate_digest: "sha256:68874713a6ecde54d1795f6bd3f54f6d14ede3c62adfc5397f19a8755002edfd"
          before_revision: 28
          command_digest: "sha256:a083447392e21702ae91a74e13e09cc8b4f6cdf042bab94f9b1bb8c8b74f8f7a"
          effect_ids: []
          event_digests:
            - "sha256:e5e653d76867bb8a32ca2c1d4054c6c938de60a59ab23a0dc0262ddac0201025"
          mutation_id: "amend:sha256:475a63b2e2364890dae18f72cd11d8650b25bdb1ab6c5cdb51511e755ec1499a"
        capture:202611241717-AH4MKJ:
          after_revision: 1
          aggregate_digest: "sha256:805f858d4d15d779e6937ed15214ac02888a3f6c1d23c6e2e9e3b8835d1690ea"
          before_revision: 0
          command_digest: "sha256:66147587c254912fd1e8f5501115cce1314d19c8079db88e04ebaa955bbd8871"
          effect_ids: []
          event_digests:
            - "sha256:926897b12ec97ec0da6fa6c39dbe9ee70248e81f3e83297657702a790a3f109b"
          mutation_id: "capture:202611241717-AH4MKJ"
        final-validation:sha256:4313f6e3a2f723c97974c03004aeaaee3bc7eed8cc1360cd1241487f2fee367a:27:
          after_revision: 28
          aggregate_digest: "sha256:53230d381d09264d74b73abf5913eee18bbdf9410c5894508095153fa71f4213"
          before_revision: 27
          command_digest: "sha256:7ccf50731d9c364d6b1af40cd4d8d69a0261a8ef8f88731b61d8f7eb11822863"
          effect_ids: []
          event_digests:
            - "sha256:f3005f97291cc6257884fd79226abd6144ccca88b1ed8e24648d09c4d90a9c16"
          mutation_id: "final-validation:sha256:4313f6e3a2f723c97974c03004aeaaee3bc7eed8cc1360cd1241487f2fee367a:27"
        final-validation:sha256:439f737420dbab244594ebadd133ce68e3f0d8d208f157bf4e5b2ed262c14dee:26:
          after_revision: 27
          aggregate_digest: "sha256:2f500a7d3fb0a6475f35a6386e7551bcc8a15e486270bd089dff111bf9a29187"
          before_revision: 26
          command_digest: "sha256:0af54ce8bfc8949c8cc30cec0c386dfbd5c2148379b962c1cc1656279f63da4c"
          effect_ids: []
          event_digests:
            - "sha256:303e737d7d25330ce53d9ba288b0664e543b57f676d3cd9408ecba10b70c1790"
          mutation_id: "final-validation:sha256:439f737420dbab244594ebadd133ce68e3f0d8d208f157bf4e5b2ed262c14dee:26"
        final-validation:sha256:a453f97bca7f9e6f73afc5a3be3f98c0a4a3102f4a6d8521f969cc2f3a67b5c5:37:
          after_revision: 38
          aggregate_digest: "sha256:4addfb4827159c4f327d6ad612802cffcf2175c03c2faabd94f559da5dd77422"
          before_revision: 37
          command_digest: "sha256:2cc86a32095e8f7a600957a2cab8f5fc0547012895b4c13ea272e34ee97ae9d2"
          effect_ids: []
          event_digests:
            - "sha256:d7b533b61d6494b7f407eafb4ea9ba8754075c576645a64f38970f3f3ff96b75"
          mutation_id: "final-validation:sha256:a453f97bca7f9e6f73afc5a3be3f98c0a4a3102f4a6d8521f969cc2f3a67b5c5:37"
        kernel_task_completion_required:sha256:3bd4cfb3f523d41a8e149b2b8f1c75c7ecae5739b48690abfec29d962495d35f:sha256:88878855fa5de3ea8618c53e77d5951376d4602fe932fec9fa2f838e7108b009:
          after_revision: 39
          aggregate_digest: "sha256:40c734960e440d9719817149e8cadf9c47a2b8aa6d4a6254dbcd796589db625f"
          before_revision: 38
          command_digest: "sha256:1fd2abdcd8fce1bbcc18b01a2b696930a0c4401c8cea5570b97a79f2cd731836"
          effect_ids: []
          event_digests:
            - "sha256:e77e8dc98f29086991685173eb8fa2410f8362acc854750cbe8e5bd061dac3e1"
          mutation_id: "kernel_task_completion_required:sha256:3bd4cfb3f523d41a8e149b2b8f1c75c7ecae5739b48690abfec29d962495d35f:sha256:88878855fa5de3ea8618c53e77d5951376d4602fe932fec9fa2f838e7108b009"
        kernel_work_item_claim_required:sha256:71383a08212881276bfca2d30eaca179db27415c1c22b0b6bf203722cf107323:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f:
          after_revision: 5
          aggregate_digest: "sha256:11753312495b56c332a29a38ba56f100c056a413e54c70321109fbcf0281bbd5"
          before_revision: 4
          command_digest: "sha256:74cdaaaffe96645fff897df63c1fa48a2af75d803bd7ca061ff3386451cff594"
          effect_ids: []
          event_digests:
            - "sha256:7c04cd0d17c292b7164e82497cba5a8cd431e788a70daa26f9aa23af2b830df0"
          mutation_id: "kernel_work_item_claim_required:sha256:71383a08212881276bfca2d30eaca179db27415c1c22b0b6bf203722cf107323:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f"
        kernel_work_item_claim_required:sha256:a19259e34c34d125997c5ab929a40b704c1b81dbb16dde5717f056789797c80d:sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac:
          after_revision: 31
          aggregate_digest: "sha256:61a7cecb4e9f5873c4ced3b08e782dc8a52ad16157a767d9755941147fe25040"
          before_revision: 30
          command_digest: "sha256:c017b6371652ff8bd15b64dd91af3ef425cbf4ca746ccec796e0608cd12e85fe"
          effect_ids: []
          event_digests:
            - "sha256:1eddcf891fcedbb01ba9c4d56b2a33883cb4f2f3133d2f7773b4234893dd9fc8"
          mutation_id: "kernel_work_item_claim_required:sha256:a19259e34c34d125997c5ab929a40b704c1b81dbb16dde5717f056789797c80d:sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac"
        kernel_work_item_execution_required:sha256:32b13ba8ac5f9cc9e4a1e08da7ac2750b789a27bafcd043950e30a3fda345416:sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e:
          after_revision: 14
          aggregate_digest: "sha256:44cb5d6a7474d8304489cdf95d2dae4759c0f53b3b6e31aed13b382273db23bc"
          before_revision: 13
          command_digest: "sha256:d3a543d85482f9b7ce2b4c59c7d76c4f1531674f9de3971a6d41a5e28379110d"
          effect_ids: []
          event_digests:
            - "sha256:f87077e76df999492f758cc774e86d27106957222a34d3214fdfe580f0942a8d"
          mutation_id: "kernel_work_item_execution_required:sha256:32b13ba8ac5f9cc9e4a1e08da7ac2750b789a27bafcd043950e30a3fda345416:sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e"
        kernel_work_item_execution_required:sha256:534b2f2203817064efae7f03b754b766e69075ab4685bb14b8182c849e2b90f5:sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac:
          after_revision: 32
          aggregate_digest: "sha256:4cf91631180811aad533bf30a6faa864272b8f903b7fe60a66862e2ebc3812a5"
          before_revision: 31
          command_digest: "sha256:153789a98a7ee3ce23f893c069caa125a12a42d2348bfc5fce29cdb182ca6b33"
          effect_ids: []
          event_digests:
            - "sha256:f707598aa71fed576c63c85df4629b18eb0461d0fcc32643b1d3d6eb6be9cdf9"
          mutation_id: "kernel_work_item_execution_required:sha256:534b2f2203817064efae7f03b754b766e69075ab4685bb14b8182c849e2b90f5:sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac"
        kernel_work_item_execution_required:sha256:7915204111fe55c023ec79f48dd9babf983e91157e86955e355cba02764816ac:sha256:6af207b42a2f6b1ec0497ce4fa867cbf0bc181d65b6a56352c9394e918645320:
          after_revision: 7
          aggregate_digest: "sha256:8253486dc760a051149386de64d38efb36e9f94dfe34776ed0d314a84e90dd31"
          before_revision: 6
          command_digest: "sha256:a0395db9611620a7b8e9c9cd056fc7f8984b4cc0015dfdfa748465fded693f3a"
          effect_ids: []
          event_digests:
            - "sha256:cbbe9803843b27718798292534bad54c1f68d70a7f7650385d924611ed1cab04"
          mutation_id: "kernel_work_item_execution_required:sha256:7915204111fe55c023ec79f48dd9babf983e91157e86955e355cba02764816ac:sha256:6af207b42a2f6b1ec0497ce4fa867cbf0bc181d65b6a56352c9394e918645320"
        kernel_work_item_execution_required:sha256:92d01ebeadfe4f0cb50e015cbd3434d9a86eecd02c280ca67b5d7775b693d20f:sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc:
          after_revision: 21
          aggregate_digest: "sha256:0efff07e2fb6333d357f539413105d0e7a679718419be7fa41aadc60fc66d8c1"
          before_revision: 20
          command_digest: "sha256:20f18673bd62306652af49c082799cb5c816fb1c4b2dbb9da83da51a9712db73"
          effect_ids: []
          event_digests:
            - "sha256:b893c8a5f15b3bb052a077aa169bc914da9e3a77cfd4b1123427830a34ea1da2"
          mutation_id: "kernel_work_item_execution_required:sha256:92d01ebeadfe4f0cb50e015cbd3434d9a86eecd02c280ca67b5d7775b693d20f:sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc"
        kernel_work_item_inspection_required:sha256:0a25c8d923c12b1fa34a5f270f1c2f5816db2fd32c923d9bc420906a9a53b983:sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e:
          after_revision: 10
          aggregate_digest: "sha256:5cf4b7e6a12c37c19e5607b80006a2dd44a24312e08c7e8d2164a1c0dafd0587"
          before_revision: 9
          command_digest: "sha256:0cdeb0ecf1d88d223965345a932354eb721b74538e732555415bc0960a7632b0"
          effect_ids: []
          event_digests:
            - "sha256:15882812b67e0e6afac9b8b0d0fe47f665d7d669349edc8aa96cdb2c52780c96"
          mutation_id: "kernel_work_item_inspection_required:sha256:0a25c8d923c12b1fa34a5f270f1c2f5816db2fd32c923d9bc420906a9a53b983:sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e"
        kernel_work_item_inspection_required:sha256:5082888750baf120c68269dd5a494b32647ce147d2195673c11a31c82b7f31f5:sha256:88878855fa5de3ea8618c53e77d5951376d4602fe932fec9fa2f838e7108b009:
          after_revision: 35
          aggregate_digest: "sha256:f9c5b9cb35d023eb075e1e44c28ce7810a100564d6f06f48617d08e0856a3e92"
          before_revision: 34
          command_digest: "sha256:14369a3e0e1fbcd9e25d1171f5f000b8ddbf217cf208d266c0d41184a5c9c33a"
          effect_ids: []
          event_digests:
            - "sha256:f1bf46707bdf180bdc9f698eac038cb805518f47cc805486ad503461524a2788"
          mutation_id: "kernel_work_item_inspection_required:sha256:5082888750baf120c68269dd5a494b32647ce147d2195673c11a31c82b7f31f5:sha256:88878855fa5de3ea8618c53e77d5951376d4602fe932fec9fa2f838e7108b009"
        kernel_work_item_inspection_required:sha256:67c4397946c6b6203d12ae069fe2406cbf8652c422258fa5bdf77523ded3fd1c:sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc:
          after_revision: 17
          aggregate_digest: "sha256:87215cf71f7d020786823f29bba4a198d231a0ac323333e4bbf09e13f1d0f037"
          before_revision: 16
          command_digest: "sha256:40717fb27233bd5c8385249d663a83cbac911c3b46892289384e86abb041d533"
          effect_ids: []
          event_digests:
            - "sha256:4189ee6685f002e96370a01305422f7ac91511c4b01af3f671987667e27c9b96"
          mutation_id: "kernel_work_item_inspection_required:sha256:67c4397946c6b6203d12ae069fe2406cbf8652c422258fa5bdf77523ded3fd1c:sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc"
        kernel_work_item_inspection_required:sha256:96f27df00384432182e625ff48c77dd79147cb2d27b0b0f1d2c14af581e5d003:sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac:
          after_revision: 24
          aggregate_digest: "sha256:7d21c7d7c22fad0cc1a3898b94f11a27d7d863a25329d62447a1cc2b4f8eb83f"
          before_revision: 23
          command_digest: "sha256:5c6b3b8e59947bc6c110129e6083e628f14f06d56a00388d91ff45a120e60093"
          effect_ids: []
          event_digests:
            - "sha256:239c94498646fc7ec2365ea61e4a6b672abcdfec94bef425ff67e2eca810e8fa"
          mutation_id: "kernel_work_item_inspection_required:sha256:96f27df00384432182e625ff48c77dd79147cb2d27b0b0f1d2c14af581e5d003:sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac"
        kernel_work_item_materialization_required:sha256:813fa7d59700d242a7669647c32ebe0250ae7cb3310081a92adc9a7e8d576201:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f:
          after_revision: 4
          aggregate_digest: "sha256:bc5a90d73fd10d6bc5c165b127bf2a29962f3d402a6bd1c9cc8c66160e47cd74"
          before_revision: 3
          command_digest: "sha256:d14ff1d6c8c889627c2bf13526006ef03d4e0240eb04f8200507e20b75e1e5cd"
          effect_ids: []
          event_digests:
            - "sha256:a659f7231c796b3201aecf9fd9e99733e9baec9c667e7ce18b5e203850c457bc"
          mutation_id: "kernel_work_item_materialization_required:sha256:813fa7d59700d242a7669647c32ebe0250ae7cb3310081a92adc9a7e8d576201:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f"
        kernel_work_item_rework_claim_required:sha256:a356594435042b2e6dabbdcb919425fceaf2437ba20ec1532ce048ddf467f480:sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc:
          after_revision: 20
          aggregate_digest: "sha256:eeb5a0255905c103430706ba6ba57b4396ae1e9cf2f79a962e6c83175aa7ffb3"
          before_revision: 19
          command_digest: "sha256:b467d6b4961c34470e10f00ec75fdf654a5c80bdbf81567cf9d5cbb788394767"
          effect_ids: []
          event_digests:
            - "sha256:e837b01a3b3251e277a3ee71e66662a61f195f51175ecb319b7823148a16ccf7"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:a356594435042b2e6dabbdcb919425fceaf2437ba20ec1532ce048ddf467f480:sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc"
        kernel_work_item_rework_claim_required:sha256:ddfbd7689b867b44526e21c36c0c4389c6b0c9c95b269567cb77cf7e18783ed1:sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e:
          after_revision: 13
          aggregate_digest: "sha256:9a9ee4dd25c351be169ba9858eb5190afdc1147d9392b2165bd186e6928b8b5f"
          before_revision: 12
          command_digest: "sha256:7ac90a0fe78e85b36f5260081affb5ca335a1bf013f93bb9c7c602052ac85a66"
          effect_ids: []
          event_digests:
            - "sha256:8a9850bd56e8fda850cdebdde1edc9c89a7717eeb93172f80dee892f2236fefc"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:ddfbd7689b867b44526e21c36c0c4389c6b0c9c95b269567cb77cf7e18783ed1:sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e"
        result:sha256:0f55156359cf3382f0fc360c78d628a755f72afc628b79901a48c28cf698c62d:
          after_revision: 2
          aggregate_digest: "sha256:5fba07c6bd2663ddd990bc89a4f2878b07b0ce6cbdc55e32aa77015899555526"
          before_revision: 1
          command_digest: "sha256:24fc58a14972e05bd219496764651add275839be936dda88e550d33ea54bc72a"
          effect_ids: []
          event_digests:
            - "sha256:d5bae5a62006bf1380fb8eefcdf44e4d14cb4ea1abe42af1af16f6c43d644d0c"
          mutation_id: "result:sha256:0f55156359cf3382f0fc360c78d628a755f72afc628b79901a48c28cf698c62d"
        result:sha256:2ceb23fc0e458b12641141cbeff2014dccf601097be897b08f649a43e2928f10:
          after_revision: 16
          aggregate_digest: "sha256:85c62d36d47e0a5374c499bc0d62d06ccf00efb44f0636ddbc4d07e3502f66f1"
          before_revision: 15
          command_digest: "sha256:071f47c735616148577edea040ef11151cd4b317647d5a9732c298c5dfc1fe94"
          effect_ids: []
          event_digests:
            - "sha256:2f733ab3647f47d08e3629fd82e79fd242d85fe47e201e7ca5e2c8adce9e177e"
          mutation_id: "result:sha256:2ceb23fc0e458b12641141cbeff2014dccf601097be897b08f649a43e2928f10"
        result:sha256:428a55891d6e8d10c26eaea072279f52b95f549b69beff2956eb2cf783d36f22:
          after_revision: 9
          aggregate_digest: "sha256:737fc014b44bd2f404caa45a2ec2c749d5a5ab8c88de1d757b67c88d4c9029dc"
          before_revision: 8
          command_digest: "sha256:261d79b6d7a93d51b4b9ffda644498daa80d679ec650b168e95836ebb47d766d"
          effect_ids: []
          event_digests:
            - "sha256:feaebc4d4a094b860bceea6101f72a9614bf82e7f0b279b269f4f9fc6d4002d0"
          mutation_id: "result:sha256:428a55891d6e8d10c26eaea072279f52b95f549b69beff2956eb2cf783d36f22"
        result:sha256:6b0f792ffb6f016f99b0e6fe0020d3b1df9e9184b86907c6bc59364231f86e4e:
          after_revision: 34
          aggregate_digest: "sha256:03c58dd62683db888eaad00352acf5f00b18912bbb12027bfca8394c88ab3100"
          before_revision: 33
          command_digest: "sha256:1fe9b44517046ab7d622c0e1d3ee91a7bb68f9f4cffe892df55866809648b017"
          effect_ids: []
          event_digests:
            - "sha256:970c6fa53b378a591c7dca01f385ddf8fbe61f8a120b1697f3bcb78372260027"
          mutation_id: "result:sha256:6b0f792ffb6f016f99b0e6fe0020d3b1df9e9184b86907c6bc59364231f86e4e"
        result:sha256:d6e559b839c76910118c53c301d0bff4ebbc8a519d0d243bcdffd7be74dccf62:
          after_revision: 23
          aggregate_digest: "sha256:be562a5b6ba71d14d4971147c47df6fcb613ed894dcfa443249bcbfc4b98e8a4"
          before_revision: 22
          command_digest: "sha256:f9a60d29eaa236e59c19138fdfd7175a419e7077d45b339e73b840fd14df23ee"
          effect_ids: []
          event_digests:
            - "sha256:247ba69628dbe75ba6cb7013b40d11556f9681f4a2bc4899540a08239d056832"
          mutation_id: "result:sha256:d6e559b839c76910118c53c301d0bff4ebbc8a519d0d243bcdffd7be74dccf62"
        sha256:18c99361fc0f1c0a2a839ce37b5b4aa414141c29ad2b6249ce1716869f6a606a:
          after_revision: 15
          aggregate_digest: "sha256:87c2a1479405909aa55de5a516748ad97fe6fdc721fca31cdb9ebd9586d67fc8"
          before_revision: 14
          command_digest: "sha256:2d5e5dfc7fb20acbfdfc68897d1226b30500b7c1d38717e4542af18736d53a24"
          effect_ids: []
          event_digests:
            - "sha256:b025edc22e309e3c86f0b5fdc2ad32aba3a0446ca717a3932ec79997768e0194"
          mutation_id: "sha256:18c99361fc0f1c0a2a839ce37b5b4aa414141c29ad2b6249ce1716869f6a606a"
        sha256:2ff0ec08a0d4dd6d4b0492249652fc1c2158163ede62e6bcf82bdc4ab7142a03:
          after_revision: 22
          aggregate_digest: "sha256:2cd289a196adc9bbecfed82e7116e22a31a7777dbc7baa57bfafff8b2fc8281f"
          before_revision: 21
          command_digest: "sha256:0c0d0a5d9deaf507a16ad9943eb4b55fcf491a7977342014d075646f9b9a35d0"
          effect_ids: []
          event_digests:
            - "sha256:0a2bcf78ad1b6e79d4861814062e5ca01da434969009cc9c193e510363e3eeca"
          mutation_id: "sha256:2ff0ec08a0d4dd6d4b0492249652fc1c2158163ede62e6bcf82bdc4ab7142a03"
        sha256:7ad10da6fe8131b4c517017cf1dc61e8c7a7e8cd38b2e166efef12ee6a754c7a:
          after_revision: 8
          aggregate_digest: "sha256:63cb38b7366329108f7a9162bab0950bfe5155192b82540699effb46c4df3704"
          before_revision: 7
          command_digest: "sha256:109c8d3cbbce414aac98e93ba123ba09d986d2d91902c6a6aaf472fe252068fb"
          effect_ids: []
          event_digests:
            - "sha256:186b6f6936fd414e6d04125bfdaa16d88e91184c73f6fc2419830c9055619e11"
          mutation_id: "sha256:7ad10da6fe8131b4c517017cf1dc61e8c7a7e8cd38b2e166efef12ee6a754c7a"
        sha256:82b088f7edd6c952e611c0921eddcbe7f9d80a37d4b929890cc966a1aa9f97ca:
          after_revision: 30
          aggregate_digest: "sha256:de4ac9940577cc05119a3ef2d81f26dc560ea43a7b225e671381bc7e7e038894"
          before_revision: 29
          command_digest: "sha256:de8686504e727144ba1738c1d992ba9c63b991ae4ebb33fbd8f7f562da6ac88f"
          effect_ids: []
          event_digests:
            - "sha256:0c0fe05e1ccc7cb5418bc6dc4abd34692adb808b32c8bf388d208ec16abfd8dc"
          mutation_id: "sha256:82b088f7edd6c952e611c0921eddcbe7f9d80a37d4b929890cc966a1aa9f97ca"
        sha256:ce97c3412bb81ae9a4b72e9fcb77edbae69d5a2c7ac8f5c00aa3b40a0c5ccc5f:
          after_revision: 33
          aggregate_digest: "sha256:1807a2089e44882fee7ce9e739940fcf2ef5aecd59db5618a8acb9b66709f62a"
          before_revision: 32
          command_digest: "sha256:2aadd5955d1b5563cb55e477334cff1b645cc3dbad11c1748f42f1534b50a57a"
          effect_ids: []
          event_digests:
            - "sha256:4c83036b7642217104bd4d9ed5e7fbae06be087390d0a65182b17635228e77a1"
          mutation_id: "sha256:ce97c3412bb81ae9a4b72e9fcb77edbae69d5a2c7ac8f5c00aa3b40a0c5ccc5f"
        sha256:d2bebf882843bb6bd2c8bb1ef8fb1a1108e77f8b91628d6540997ca596387896:
          after_revision: 3
          aggregate_digest: "sha256:ced2871678f1f21db62c8c53de79e2f3e10a0dd3a685496cd83f816e7f28df4f"
          before_revision: 2
          command_digest: "sha256:dbfa03bc50d172db7b76d4d16cd9de0d3ad432242e38313435bcc0277067a812"
          effect_ids: []
          event_digests:
            - "sha256:551403aeb9f4362ae63f7427627cb94b3abc2f7b099a20849ed1eea087919994"
          mutation_id: "sha256:d2bebf882843bb6bd2c8bb1ef8fb1a1108e77f8b91628d6540997ca596387896"
        sha256:fbc5d2b496260498b69578f2a79328204e99ccee8fe2896bf5d13eb1236fe924:
          after_revision: 6
          aggregate_digest: "sha256:9c89921df5375a6bbec24513318552bf524587d0e55c7b7878d442d81a2d0767"
          before_revision: 5
          command_digest: "sha256:ae706cae9c26d6e0e294d87b63eba877a38b72fc8fd16a07b07f5ac42d89fee7"
          effect_ids: []
          event_digests:
            - "sha256:d92e37be78e2bab0f347874874b8426d71d3688b3ccca660f30a0e5833afe6fe"
          mutation_id: "sha256:fbc5d2b496260498b69578f2a79328204e99ccee8fe2896bf5d13eb1236fe924"
        validation-resolution:sha256:1191921509fa22235b5c0a6f4ef3ebcd84793fdeb5a98f89e2beb3d4e2b73e76:
          after_revision: 26
          aggregate_digest: "sha256:42d77378baa87327535bc0ea1c2d12a445467167d41b2f7ebe55d36fc8c4dba6"
          before_revision: 25
          command_digest: "sha256:bc2bf8c3b5fdb6aecb2da61c5fe7e19a7f5b4ace548814f35855bbf509dea28a"
          effect_ids: []
          event_digests:
            - "sha256:91b0b15ea6aa3aa60120340ceb6436ef3b61fd9e225881b3cbe2417432e90abf"
          mutation_id: "validation-resolution:sha256:1191921509fa22235b5c0a6f4ef3ebcd84793fdeb5a98f89e2beb3d4e2b73e76"
        validation-resolution:sha256:e1705857784c33612804724e2fce32b87315c4e9a0c5f069f336e801154838ae:
          after_revision: 37
          aggregate_digest: "sha256:5f5c10054f0b9b65be2340a6490eb04f272167f5e5c72dd23bb8d984cd805947"
          before_revision: 36
          command_digest: "sha256:9b0d924fc7a535f20a0bab9c68037a4b17b11ca98a23d5aac7cc02750fbe764e"
          effect_ids: []
          event_digests:
            - "sha256:aacd0fb9d46232aa4aaf6b316496ba0b5530100daaf6b0e3bb107f0b4610cd5d"
          mutation_id: "validation-resolution:sha256:e1705857784c33612804724e2fce32b87315c4e9a0c5f069f336e801154838ae"
        validation-resolution:sha256:ee7b1b588636aa10e104e010d17ee621cc505fee065fcd10a95c90635e9a9863:
          after_revision: 12
          aggregate_digest: "sha256:f2c5f8ea8d1f8353cda41d0996d3b77c9ce1e30b4777a1106bfd797035864c70"
          before_revision: 11
          command_digest: "sha256:45bc2500d010378fe8f131cd69b2ed9a006efa8b8db050c702209bf5ccd4562b"
          effect_ids: []
          event_digests:
            - "sha256:0b6c161228f023cb758b3c9d1d5f6e5c5adb486174b7bea67a19e241923e609b"
          mutation_id: "validation-resolution:sha256:ee7b1b588636aa10e104e010d17ee621cc505fee065fcd10a95c90635e9a9863"
        validation-resolution:sha256:f30395844cce3064d48b67c24b2950ad64c82fc1df318485bb8b0f20e154ab97:
          after_revision: 19
          aggregate_digest: "sha256:ccf781fe8d12c65c5c0262675f5ce246636ee029efdd97bc6e3152f40316fa55"
          before_revision: 18
          command_digest: "sha256:464776dd07c7e18fb580d3643875ed9fb41ece63df5751b81d38ae83a282321e"
          effect_ids: []
          event_digests:
            - "sha256:5f6e23757224e84ae2b5789e7a266b7c60b0004aa5957b9f90c0fb81d6545648"
          mutation_id: "validation-resolution:sha256:f30395844cce3064d48b67c24b2950ad64c82fc1df318485bb8b0f20e154ab97"
        validation:sha256:0ca6559f0a2263f117ead7efcc4330807da508a1e6244d2b439762b4fc21c7b2:
          after_revision: 25
          aggregate_digest: "sha256:c90e99aefbe2e9024d09033f3d8e73a831eb8c7a09bd60d83e33d1a540fd1fc9"
          before_revision: 24
          command_digest: "sha256:95450d23fc4d0b3d8aff0e403f0d562d1bf899994d60f7f1c7814b6d612f67fd"
          effect_ids: []
          event_digests:
            - "sha256:746ea7ac30cdc9292ab13fe0eb766eec7f43327e5bbbbd1a7a32daacf4e2054d"
          mutation_id: "validation:sha256:0ca6559f0a2263f117ead7efcc4330807da508a1e6244d2b439762b4fc21c7b2"
        validation:sha256:588d54cd023526bba090b661885a6d6eb03891cf8b5b77713ca404c528fce16a:
          after_revision: 18
          aggregate_digest: "sha256:c37619613b7e44d417f1c58fd74ff35e120c0fa53b2d0f91d36fde291bdb7412"
          before_revision: 17
          command_digest: "sha256:c4ec94b195dcb2e7019223db334e700362f6ebb5e72e8e0feaf24711c659fc94"
          effect_ids: []
          event_digests:
            - "sha256:cf02a413c93093984947c8ad6d7098e727f46db37a46bab867f94fb1dd766de5"
          mutation_id: "validation:sha256:588d54cd023526bba090b661885a6d6eb03891cf8b5b77713ca404c528fce16a"
        validation:sha256:a059c754ee0980a636782a539c6aebed6df7ac93726f229786428de9f1f223eb:
          after_revision: 11
          aggregate_digest: "sha256:c26ccc9256690894852239665fa7295b7c5f58d5f00843e1f852094f4e69d808"
          before_revision: 10
          command_digest: "sha256:7c3506f2476038838af573e582346679698d4d231035cf142cc0cab4266396c4"
          effect_ids: []
          event_digests:
            - "sha256:bd07fbb17560e6bab8cad3fccf50f756326de789bb5004edeb62b9c91ad36049"
          mutation_id: "validation:sha256:a059c754ee0980a636782a539c6aebed6df7ac93726f229786428de9f1f223eb"
        validation:sha256:ea5c379dfbf043b978993777b1277ed2a62246e5c251a9b069fb7421d17e5f0d:
          after_revision: 36
          aggregate_digest: "sha256:c26a7e81bc855f0faf88aa33d5e5d3fb4b42db888dfb2aa75d8c5c5c45e244fb"
          before_revision: 35
          command_digest: "sha256:d59b6a226cb83363808768305224e84c944b921ea70200247d375984135193e8"
          effect_ids: []
          event_digests:
            - "sha256:cd7075b56b302a2fd127114540a95e25e39849e53ecdca3154f617f1a50c6543"
          mutation_id: "validation:sha256:ea5c379dfbf043b978993777b1277ed2a62246e5c251a9b069fb7421d17e5f0d"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:051ac16fa51c171535f63b460b76a8297d841bf4a53b268e333f5437a943b471"
          digest: "sha256:3e5f05f1c46b38fb94f5489d7776b833442e850d940a01017ed18591299944ae"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:26f8772782da37c494150c743ccd3c3bc2ee3db73aa9d170a18f771344ee4d75"
              depends_on: []
              execution_requirements:
                capabilities: []
                external_effects: []
                repository_effects:
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/bin/dist-guard.js"
                  - "packages/agentplane/src/cli/dist-guard.test.ts"
              expected_outputs:
                - "packages/agentplane/bin/dist-guard.js"
                - "packages/agentplane/src/cli/dist-guard.test.ts"
              id: "incremental-dist-freshness"
              optional: false
              required_inputs: []
      revision: 39
      schema_version: 1
      state: "COMPLETED"
      work_items:
        final-correction-4313f6e3a2f7:
          attempt: 1
          claim_id: "sha256:437abf4e05efa5a181b44cbfe61ee34e5c5315a66ba0ae4afd8d02936b38b79a"
          definition:
            contract_digest: "sha256:52be0c508c62d496e3b1a6124d1294d430b7ce8186ed7715bcbf5c7d8cd728a4"
            depends_on:
              - "incremental-dist-freshness"
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/bin/dist-guard.js"
                - "packages/agentplane/src/cli/dist-guard.test.ts"
            expected_outputs:
              - "final-correction-4313f6e3a2f7-evidence"
            id: "final-correction-4313f6e3a2f7"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:23753384772aa3f91e0cce44d659fc1341ad84914ecd861977fd845e224115d2"
              id: "final-correction-4313f6e3a2f7-evidence"
              kind: "report"
              plan_revision: 2
              repository_fingerprint: "sha256:88878855fa5de3ea8618c53e77d5951376d4602fe932fec9fa2f838e7108b009"
              task_id: "202611241717-AH4MKJ"
              work_item_id: "final-correction-4313f6e3a2f7"
          result_digest: "sha256:88016cb99c5b7b21d9643ef770086935a6a17d6f161f0322533312a1f1e4dac5"
          revision: 8
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:710fefd38479514cd388898c52fa56dbf770ffa9b21a7b7f9849a9d5abcb60f0"
              - "sha256:9eced194258468b7692001cbf00e203b7fecd6e2de04ea607ae4762901bbd719"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:6e3341dcc3db2b77beb53e5272d538f51122938132edd60ee03386664c7d9efb"
              environment_digest: "sha256:a3e6a852b415e83a6453842c2239c2708d2fd961764b6ca811d0cc267aeac60c"
              implementation_identity: "sha256:88016cb99c5b7b21d9643ef770086935a6a17d6f161f0322533312a1f1e4dac5"
              toolchain_digest: "sha256:c1e9259cc9f556b21a88bc4a170d7d2cbf4b1bcba52d26625ae1fa322f7a0b50"
            observed_at: "2026-11-24T17:57:50.614Z"
            status: "PASSED"
        incremental-dist-freshness:
          attempt: 3
          claim_id: "sha256:0e3d5585b3b6e859e389f913041d32b54293fb747234ba344eac39e89b17cc19"
          definition:
            contract_digest: "sha256:26f8772782da37c494150c743ccd3c3bc2ee3db73aa9d170a18f771344ee4d75"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/bin/dist-guard.js"
                - "packages/agentplane/src/cli/dist-guard.test.ts"
            expected_outputs:
              - "packages/agentplane/bin/dist-guard.js"
              - "packages/agentplane/src/cli/dist-guard.test.ts"
            id: "incremental-dist-freshness"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 3
              digest: "sha256:0daaa9c861b10023d88cdfbeb7b19f4c86f36563cb2408ea34b5be71aec7ab10"
              id: "packages/agentplane/bin/dist-guard.js"
              kind: "source_code"
              plan_revision: 1
              repository_fingerprint: "sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac"
              task_id: "202611241717-AH4MKJ"
              work_item_id: "incremental-dist-freshness"
            -
              attempt: 3
              digest: "sha256:743cc5430cc3ba2cf6788bc8d6075272bfa46749ed7368f46f20841c0d40eb57"
              id: "packages/agentplane/src/cli/dist-guard.test.ts"
              kind: "tests"
              plan_revision: 1
              repository_fingerprint: "sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac"
              task_id: "202611241717-AH4MKJ"
              work_item_id: "incremental-dist-freshness"
          result_digest: "sha256:28c7cd3af29fad828fd2a556e76447c955bdfe15a1ca104c88fb5b7e60b740b0"
          revision: 19
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:3b6f605cad39e831fdfcd2096c7377f8683ec733ec939c698ccbfaf86163c68e"
              - "sha256:caa1ebcf2c4c5c2c4174d1a1e2da44af9acc3fb887f0e7defd63725705117721"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:6e3341dcc3db2b77beb53e5272d538f51122938132edd60ee03386664c7d9efb"
              environment_digest: "sha256:a65d4b7bb681c6d185513f467ad2621bf9eeb9b1dc1399c8432c6ca7f03710f5"
              implementation_identity: "sha256:28c7cd3af29fad828fd2a556e76447c955bdfe15a1ca104c88fb5b7e60b740b0"
              toolchain_digest: "sha256:c1e9259cc9f556b21a88bc4a170d7d2cbf4b1bcba52d26625ae1fa322f7a0b50"
            observed_at: "2026-11-24T17:35:57.923Z"
            status: "PASSED"
    digest: "sha256:40ee575324661151ee4f374a37fe53aaaa2cf2935aa24234a864a79dd4a7fb95"
    documents:
      contracts:
        sha256:26f8772782da37c494150c743ccd3c3bc2ee3db73aa9d170a18f771344ee4d75:
          acceptance_criteria:
            - "A changed file whose content still matches the manifest sha256 yields ok=true without a full-tree snapshot."
            - "A changed, added, or deleted runtime-relevant file whose content differs from the manifest yields ok=false with reason watched_runtime_snapshot_changed and the package-relative path in changedPaths."
            - "Rename entries, paths outside the package, or failed git commands fall back to the existing full-snapshot comparison."
            - "All existing dist-guard and runtime-watch tests pass."
          objective: "When the git quick check reports changed watched paths and the manifest has a valid per-file snapshot, verify only those changed files by sha256 against the manifest instead of walking and hashing the full watched tree. Use the full snapshot only when git output is ambiguous or unavailable."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts"
        sha256:52be0c508c62d496e3b1a6124d1294d430b7ce8186ed7715bcbf5c7d8cd728a4:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:4313f6e3a2f723c97974c03004aeaaee3bc7eed8cc1360cd1241487f2fee367a. Read /Volumes/WorkspaceSSD/Projects/agentplane/.git/agentplane/kernel/exchanges/202611241717-AH4MKJ/8d5a9d3cc87e4a4c03833fdafbb7416bc8aea64e30e331164a51e1e6f315b9cc/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts"
      intent:
        context: "In the framework checkout every agentplane invocation runs bin/dist-guard.js isPackageBuildFresh. When git reports any changed watched path, it walks and SHA-256 hashes all ~1518 watched runtime files, adding about 300 ms to every CLI call. Compare only the git-reported changed files against the per-file hashes already recorded in dist/.build-manifest.json, fall back to the full snapshot only for ambiguous git output, and add regression tests. Supersedes 202611241658-HZ1TA6, whose intake scope omitted the test file."
        objective: "Verify only git-reported changed files in repo-local CLI dist freshness guard"
    events:
      -
        command_digest: "sha256:66147587c254912fd1e8f5501115cce1314d19c8079db88e04ebaa955bbd8871"
        id: "capture:202611241717-AH4MKJ:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202611241717-AH4MKJ"
        occurred_at: "2026-11-24T17:17:19.043Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202611241717-AH4MKJ"
        task_revision: 1
      -
        command_digest: "sha256:24fc58a14972e05bd219496764651add275839be936dda88e550d33ea54bc72a"
        id: "result:sha256:0f55156359cf3382f0fc360c78d628a755f72afc628b79901a48c28cf698c62d:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:0f55156359cf3382f0fc360c78d628a755f72afc628b79901a48c28cf698c62d"
        occurred_at: "2026-11-24T17:21:21.146Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202611241717-AH4MKJ"
        task_revision: 2
      -
        command_digest: "sha256:dbfa03bc50d172db7b76d4d16cd9de0d3ad432242e38313435bcc0277067a812"
        id: "sha256:d2bebf882843bb6bd2c8bb1ef8fb1a1108e77f8b91628d6540997ca596387896:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:d2bebf882843bb6bd2c8bb1ef8fb1a1108e77f8b91628d6540997ca596387896"
        occurred_at: "2026-11-24T17:21:25.790Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202611241717-AH4MKJ"
        task_revision: 3
      -
        command_digest: "sha256:d14ff1d6c8c889627c2bf13526006ef03d4e0240eb04f8200507e20b75e1e5cd"
        id: "kernel_work_item_materialization_required:sha256:813fa7d59700d242a7669647c32ebe0250ae7cb3310081a92adc9a7e8d576201:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:813fa7d59700d242a7669647c32ebe0250ae7cb3310081a92adc9a7e8d576201:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f"
        occurred_at: "2026-11-24T17:21:30.394Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202611241717-AH4MKJ"
        task_revision: 4
      -
        command_digest: "sha256:74cdaaaffe96645fff897df63c1fa48a2af75d803bd7ca061ff3386451cff594"
        id: "kernel_work_item_claim_required:sha256:71383a08212881276bfca2d30eaca179db27415c1c22b0b6bf203722cf107323:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:71383a08212881276bfca2d30eaca179db27415c1c22b0b6bf203722cf107323:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f"
        occurred_at: "2026-11-24T17:21:36.407Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202611241717-AH4MKJ"
        task_revision: 5
      -
        command_digest: "sha256:ae706cae9c26d6e0e294d87b63eba877a38b72fc8fd16a07b07f5ac42d89fee7"
        id: "sha256:fbc5d2b496260498b69578f2a79328204e99ccee8fe2896bf5d13eb1236fe924:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:fbc5d2b496260498b69578f2a79328204e99ccee8fe2896bf5d13eb1236fe924"
        occurred_at: "2026-11-24T17:21:56.612Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202611241717-AH4MKJ"
        task_revision: 6
      -
        command_digest: "sha256:a0395db9611620a7b8e9c9cd056fc7f8984b4cc0015dfdfa748465fded693f3a"
        id: "kernel_work_item_execution_required:sha256:7915204111fe55c023ec79f48dd9babf983e91157e86955e355cba02764816ac:sha256:6af207b42a2f6b1ec0497ce4fa867cbf0bc181d65b6a56352c9394e918645320:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:7915204111fe55c023ec79f48dd9babf983e91157e86955e355cba02764816ac:sha256:6af207b42a2f6b1ec0497ce4fa867cbf0bc181d65b6a56352c9394e918645320"
        occurred_at: "2026-11-24T17:21:59.715Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202611241717-AH4MKJ"
        task_revision: 7
      -
        command_digest: "sha256:109c8d3cbbce414aac98e93ba123ba09d986d2d91902c6a6aaf472fe252068fb"
        id: "sha256:7ad10da6fe8131b4c517017cf1dc61e8c7a7e8cd38b2e166efef12ee6a754c7a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:7ad10da6fe8131b4c517017cf1dc61e8c7a7e8cd38b2e166efef12ee6a754c7a"
        occurred_at: "2026-11-24T17:24:43.714Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202611241717-AH4MKJ"
        task_revision: 8
      -
        command_digest: "sha256:261d79b6d7a93d51b4b9ffda644498daa80d679ec650b168e95836ebb47d766d"
        id: "result:sha256:428a55891d6e8d10c26eaea072279f52b95f549b69beff2956eb2cf783d36f22:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:428a55891d6e8d10c26eaea072279f52b95f549b69beff2956eb2cf783d36f22"
        occurred_at: "2026-11-24T17:24:46.638Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202611241717-AH4MKJ"
        task_revision: 9
      -
        command_digest: "sha256:0cdeb0ecf1d88d223965345a932354eb721b74538e732555415bc0960a7632b0"
        id: "kernel_work_item_inspection_required:sha256:0a25c8d923c12b1fa34a5f270f1c2f5816db2fd32c923d9bc420906a9a53b983:sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:0a25c8d923c12b1fa34a5f270f1c2f5816db2fd32c923d9bc420906a9a53b983:sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e"
        occurred_at: "2026-11-24T17:24:48.839Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202611241717-AH4MKJ"
        task_revision: 10
      -
        command_digest: "sha256:7c3506f2476038838af573e582346679698d4d231035cf142cc0cab4266396c4"
        id: "validation:sha256:a059c754ee0980a636782a539c6aebed6df7ac93726f229786428de9f1f223eb:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:a059c754ee0980a636782a539c6aebed6df7ac93726f229786428de9f1f223eb"
        occurred_at: "2026-11-24T17:27:23.123Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202611241717-AH4MKJ"
        task_revision: 11
      -
        command_digest: "sha256:45bc2500d010378fe8f131cd69b2ed9a006efa8b8db050c702209bf5ccd4562b"
        id: "validation-resolution:sha256:ee7b1b588636aa10e104e010d17ee621cc505fee065fcd10a95c90635e9a9863:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:ee7b1b588636aa10e104e010d17ee621cc505fee065fcd10a95c90635e9a9863"
        occurred_at: "2026-11-24T17:27:24.677Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202611241717-AH4MKJ"
        task_revision: 12
      -
        command_digest: "sha256:7ac90a0fe78e85b36f5260081affb5ca335a1bf013f93bb9c7c602052ac85a66"
        id: "kernel_work_item_rework_claim_required:sha256:ddfbd7689b867b44526e21c36c0c4389c6b0c9c95b269567cb77cf7e18783ed1:sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:ddfbd7689b867b44526e21c36c0c4389c6b0c9c95b269567cb77cf7e18783ed1:sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e"
        occurred_at: "2026-11-24T17:27:27.703Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202611241717-AH4MKJ"
        task_revision: 13
      -
        command_digest: "sha256:d3a543d85482f9b7ce2b4c59c7d76c4f1531674f9de3971a6d41a5e28379110d"
        id: "kernel_work_item_execution_required:sha256:32b13ba8ac5f9cc9e4a1e08da7ac2750b789a27bafcd043950e30a3fda345416:sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:32b13ba8ac5f9cc9e4a1e08da7ac2750b789a27bafcd043950e30a3fda345416:sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e"
        occurred_at: "2026-11-24T17:27:30.021Z"
        payload_digest: "sha256:c6c94273b3414df5414172a3bf750380ac9df34b0ddf6a52920cd4c6bf1dafbd"
        task_id: "202611241717-AH4MKJ"
        task_revision: 14
      -
        command_digest: "sha256:2d5e5dfc7fb20acbfdfc68897d1226b30500b7c1d38717e4542af18736d53a24"
        id: "sha256:18c99361fc0f1c0a2a839ce37b5b4aa414141c29ad2b6249ce1716869f6a606a:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:18c99361fc0f1c0a2a839ce37b5b4aa414141c29ad2b6249ce1716869f6a606a"
        occurred_at: "2026-11-24T17:28:24.876Z"
        payload_digest: "sha256:0dee17456bb2c2db11e3bbdf36423b089c9680a33f0bc1f46dbca0515ff60d9b"
        task_id: "202611241717-AH4MKJ"
        task_revision: 15
      -
        command_digest: "sha256:071f47c735616148577edea040ef11151cd4b317647d5a9732c298c5dfc1fe94"
        id: "result:sha256:2ceb23fc0e458b12641141cbeff2014dccf601097be897b08f649a43e2928f10:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:2ceb23fc0e458b12641141cbeff2014dccf601097be897b08f649a43e2928f10"
        occurred_at: "2026-11-24T17:28:27.808Z"
        payload_digest: "sha256:65ed57f35d56cd4d5fe4a04e740d17ef559994be45d975af0038865264a2e057"
        task_id: "202611241717-AH4MKJ"
        task_revision: 16
      -
        command_digest: "sha256:40717fb27233bd5c8385249d663a83cbac911c3b46892289384e86abb041d533"
        id: "kernel_work_item_inspection_required:sha256:67c4397946c6b6203d12ae069fe2406cbf8652c422258fa5bdf77523ded3fd1c:sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:67c4397946c6b6203d12ae069fe2406cbf8652c422258fa5bdf77523ded3fd1c:sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc"
        occurred_at: "2026-11-24T17:28:30.022Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202611241717-AH4MKJ"
        task_revision: 17
      -
        command_digest: "sha256:c4ec94b195dcb2e7019223db334e700362f6ebb5e72e8e0feaf24711c659fc94"
        id: "validation:sha256:588d54cd023526bba090b661885a6d6eb03891cf8b5b77713ca404c528fce16a:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:588d54cd023526bba090b661885a6d6eb03891cf8b5b77713ca404c528fce16a"
        occurred_at: "2026-11-24T17:32:33.103Z"
        payload_digest: "sha256:34fb2c7df7c3ffe366b6efd5f6512645a1724b637b6d1619a9bdf5f199c6773d"
        task_id: "202611241717-AH4MKJ"
        task_revision: 18
      -
        command_digest: "sha256:464776dd07c7e18fb580d3643875ed9fb41ece63df5751b81d38ae83a282321e"
        id: "validation-resolution:sha256:f30395844cce3064d48b67c24b2950ad64c82fc1df318485bb8b0f20e154ab97:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:f30395844cce3064d48b67c24b2950ad64c82fc1df318485bb8b0f20e154ab97"
        occurred_at: "2026-11-24T17:32:34.682Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202611241717-AH4MKJ"
        task_revision: 19
      -
        command_digest: "sha256:b467d6b4961c34470e10f00ec75fdf654a5c80bdbf81567cf9d5cbb788394767"
        id: "kernel_work_item_rework_claim_required:sha256:a356594435042b2e6dabbdcb919425fceaf2437ba20ec1532ce048ddf467f480:sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:a356594435042b2e6dabbdcb919425fceaf2437ba20ec1532ce048ddf467f480:sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc"
        occurred_at: "2026-11-24T17:32:37.714Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202611241717-AH4MKJ"
        task_revision: 20
      -
        command_digest: "sha256:20f18673bd62306652af49c082799cb5c816fb1c4b2dbb9da83da51a9712db73"
        id: "kernel_work_item_execution_required:sha256:92d01ebeadfe4f0cb50e015cbd3434d9a86eecd02c280ca67b5d7775b693d20f:sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:92d01ebeadfe4f0cb50e015cbd3434d9a86eecd02c280ca67b5d7775b693d20f:sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc"
        occurred_at: "2026-11-24T17:32:40.010Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202611241717-AH4MKJ"
        task_revision: 21
      -
        command_digest: "sha256:0c0d0a5d9deaf507a16ad9943eb4b55fcf491a7977342014d075646f9b9a35d0"
        id: "sha256:2ff0ec08a0d4dd6d4b0492249652fc1c2158163ede62e6bcf82bdc4ab7142a03:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:2ff0ec08a0d4dd6d4b0492249652fc1c2158163ede62e6bcf82bdc4ab7142a03"
        occurred_at: "2026-11-24T17:33:13.997Z"
        payload_digest: "sha256:be3663b3e19de3c102755ce6c68afb0345ff05ad1ecd659f29a48e6a01df736c"
        task_id: "202611241717-AH4MKJ"
        task_revision: 22
      -
        command_digest: "sha256:f9a60d29eaa236e59c19138fdfd7175a419e7077d45b339e73b840fd14df23ee"
        id: "result:sha256:d6e559b839c76910118c53c301d0bff4ebbc8a519d0d243bcdffd7be74dccf62:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:d6e559b839c76910118c53c301d0bff4ebbc8a519d0d243bcdffd7be74dccf62"
        occurred_at: "2026-11-24T17:33:17.072Z"
        payload_digest: "sha256:8616b9f83d607f1119c194aad6af7084d8925066e7ba614d8401bb05a478712f"
        task_id: "202611241717-AH4MKJ"
        task_revision: 23
      -
        command_digest: "sha256:5c6b3b8e59947bc6c110129e6083e628f14f06d56a00388d91ff45a120e60093"
        id: "kernel_work_item_inspection_required:sha256:96f27df00384432182e625ff48c77dd79147cb2d27b0b0f1d2c14af581e5d003:sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:96f27df00384432182e625ff48c77dd79147cb2d27b0b0f1d2c14af581e5d003:sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac"
        occurred_at: "2026-11-24T17:33:19.418Z"
        payload_digest: "sha256:25fc799cbaea476a6a4f8cc85abc4fd5fad922d8757330254f9c97111bdb2c54"
        task_id: "202611241717-AH4MKJ"
        task_revision: 24
      -
        command_digest: "sha256:95450d23fc4d0b3d8aff0e403f0d562d1bf899994d60f7f1c7814b6d612f67fd"
        id: "validation:sha256:0ca6559f0a2263f117ead7efcc4330807da508a1e6244d2b439762b4fc21c7b2:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:0ca6559f0a2263f117ead7efcc4330807da508a1e6244d2b439762b4fc21c7b2"
        occurred_at: "2026-11-24T17:36:00.302Z"
        payload_digest: "sha256:b7dfeba2c66f92469d3a331d0dfa3fc1839e94463950c91888ac11bb0969c176"
        task_id: "202611241717-AH4MKJ"
        task_revision: 25
      -
        command_digest: "sha256:bc2bf8c3b5fdb6aecb2da61c5fe7e19a7f5b4ace548814f35855bbf509dea28a"
        id: "validation-resolution:sha256:1191921509fa22235b5c0a6f4ef3ebcd84793fdeb5a98f89e2beb3d4e2b73e76:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:1191921509fa22235b5c0a6f4ef3ebcd84793fdeb5a98f89e2beb3d4e2b73e76"
        occurred_at: "2026-11-24T17:36:01.862Z"
        payload_digest: "sha256:889e73562cf53a9c7dee2be452348c5ea0df14be85ac054a16b3e1f587a2ee0b"
        task_id: "202611241717-AH4MKJ"
        task_revision: 26
      -
        command_digest: "sha256:0af54ce8bfc8949c8cc30cec0c386dfbd5c2148379b962c1cc1656279f63da4c"
        id: "final-validation:sha256:439f737420dbab244594ebadd133ce68e3f0d8d208f157bf4e5b2ed262c14dee:26:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:439f737420dbab244594ebadd133ce68e3f0d8d208f157bf4e5b2ed262c14dee:26"
        occurred_at: "2026-11-24T17:38:15.194Z"
        payload_digest: "sha256:f40c41744efae91e24b755999b5d2f9e67da828ecaafd7273a47cb2ad04b20cf"
        task_id: "202611241717-AH4MKJ"
        task_revision: 27
      -
        command_digest: "sha256:7ccf50731d9c364d6b1af40cd4d8d69a0261a8ef8f88731b61d8f7eb11822863"
        id: "final-validation:sha256:4313f6e3a2f723c97974c03004aeaaee3bc7eed8cc1360cd1241487f2fee367a:27:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:4313f6e3a2f723c97974c03004aeaaee3bc7eed8cc1360cd1241487f2fee367a:27"
        occurred_at: "2026-11-24T17:45:08.164Z"
        payload_digest: "sha256:e9373e612bfcad8639d58ae3b4bdbac7ff86d82520e9bd4c3ae7504c4c747303"
        task_id: "202611241717-AH4MKJ"
        task_revision: 28
      -
        command_digest: "sha256:a083447392e21702ae91a74e13e09cc8b4f6cdf042bab94f9b1bb8c8b74f8f7a"
        id: "amend:sha256:475a63b2e2364890dae18f72cd11d8650b25bdb1ab6c5cdb51511e755ec1499a:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:475a63b2e2364890dae18f72cd11d8650b25bdb1ab6c5cdb51511e755ec1499a"
        occurred_at: "2026-11-24T17:53:39.882Z"
        payload_digest: "sha256:b217ff09bd299b8a40ee510b9e3a0b25a33179688a5ef188a2f38ac0c462f30a"
        task_id: "202611241717-AH4MKJ"
        task_revision: 29
      -
        command_digest: "sha256:de8686504e727144ba1738c1d992ba9c63b991ae4ebb33fbd8f7f562da6ac88f"
        id: "sha256:82b088f7edd6c952e611c0921eddcbe7f9d80a37d4b929890cc966a1aa9f97ca:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:82b088f7edd6c952e611c0921eddcbe7f9d80a37d4b929890cc966a1aa9f97ca"
        occurred_at: "2026-11-24T17:53:41.447Z"
        payload_digest: "sha256:d4a92440b02b7b741d34bf4343153c638a5d88f1b605a1aa1260bbd3f66d3c26"
        task_id: "202611241717-AH4MKJ"
        task_revision: 30
      -
        command_digest: "sha256:c017b6371652ff8bd15b64dd91af3ef425cbf4ca746ccec796e0608cd12e85fe"
        id: "kernel_work_item_claim_required:sha256:a19259e34c34d125997c5ab929a40b704c1b81dbb16dde5717f056789797c80d:sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:a19259e34c34d125997c5ab929a40b704c1b81dbb16dde5717f056789797c80d:sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac"
        occurred_at: "2026-11-24T17:53:50.549Z"
        payload_digest: "sha256:cac95643937fd25416f45c4356b26d3f20cb571c4937d94e0404190a032538aa"
        task_id: "202611241717-AH4MKJ"
        task_revision: 31
      -
        command_digest: "sha256:153789a98a7ee3ce23f893c069caa125a12a42d2348bfc5fce29cdb182ca6b33"
        id: "kernel_work_item_execution_required:sha256:534b2f2203817064efae7f03b754b766e69075ab4685bb14b8182c849e2b90f5:sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:534b2f2203817064efae7f03b754b766e69075ab4685bb14b8182c849e2b90f5:sha256:4150196e4e4907a5ff52d2069e2b34d9357d73ccb8715e2083067a0ae57655ac"
        occurred_at: "2026-11-24T17:53:52.920Z"
        payload_digest: "sha256:49bdd090620950f51eadc2a68b5a833b4b57257079afebef6f5ba57461c9e6eb"
        task_id: "202611241717-AH4MKJ"
        task_revision: 32
      -
        command_digest: "sha256:2aadd5955d1b5563cb55e477334cff1b645cc3dbad11c1748f42f1534b50a57a"
        id: "sha256:ce97c3412bb81ae9a4b72e9fcb77edbae69d5a2c7ac8f5c00aa3b40a0c5ccc5f:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:ce97c3412bb81ae9a4b72e9fcb77edbae69d5a2c7ac8f5c00aa3b40a0c5ccc5f"
        occurred_at: "2026-11-24T17:55:46.604Z"
        payload_digest: "sha256:797a4608a5a898fb6c9075f8e924209f716af73cbbb0f52cf8e21122982b5bef"
        task_id: "202611241717-AH4MKJ"
        task_revision: 33
      -
        command_digest: "sha256:1fe9b44517046ab7d622c0e1d3ee91a7bb68f9f4cffe892df55866809648b017"
        id: "result:sha256:6b0f792ffb6f016f99b0e6fe0020d3b1df9e9184b86907c6bc59364231f86e4e:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:6b0f792ffb6f016f99b0e6fe0020d3b1df9e9184b86907c6bc59364231f86e4e"
        occurred_at: "2026-11-24T17:55:49.649Z"
        payload_digest: "sha256:87a2accfb4af58aade2a14f2665620c69922a481b9343414ff19dcb61ea6f1f6"
        task_id: "202611241717-AH4MKJ"
        task_revision: 34
      -
        command_digest: "sha256:14369a3e0e1fbcd9e25d1171f5f000b8ddbf217cf208d266c0d41184a5c9c33a"
        id: "kernel_work_item_inspection_required:sha256:5082888750baf120c68269dd5a494b32647ce147d2195673c11a31c82b7f31f5:sha256:88878855fa5de3ea8618c53e77d5951376d4602fe932fec9fa2f838e7108b009:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:5082888750baf120c68269dd5a494b32647ce147d2195673c11a31c82b7f31f5:sha256:88878855fa5de3ea8618c53e77d5951376d4602fe932fec9fa2f838e7108b009"
        occurred_at: "2026-11-24T17:55:51.966Z"
        payload_digest: "sha256:83321e093d0911e15803219e1bae99ce3af4c42e0b036b7c46cb3b59f6111cef"
        task_id: "202611241717-AH4MKJ"
        task_revision: 35
      -
        command_digest: "sha256:d59b6a226cb83363808768305224e84c944b921ea70200247d375984135193e8"
        id: "validation:sha256:ea5c379dfbf043b978993777b1277ed2a62246e5c251a9b069fb7421d17e5f0d:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:ea5c379dfbf043b978993777b1277ed2a62246e5c251a9b069fb7421d17e5f0d"
        occurred_at: "2026-11-24T17:57:53.018Z"
        payload_digest: "sha256:5302aff418258f2167efa30adee521154da8f893518e69a04a05729b418af07c"
        task_id: "202611241717-AH4MKJ"
        task_revision: 36
      -
        command_digest: "sha256:9b0d924fc7a535f20a0bab9c68037a4b17b11ca98a23d5aac7cc02750fbe764e"
        id: "validation-resolution:sha256:e1705857784c33612804724e2fce32b87315c4e9a0c5f069f336e801154838ae:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:e1705857784c33612804724e2fce32b87315c4e9a0c5f069f336e801154838ae"
        occurred_at: "2026-11-24T17:57:54.607Z"
        payload_digest: "sha256:4b57ae96bbb30b8ddf86b349a9cf7ad9ef25bfaba3a6768eec3e07df7deebdc0"
        task_id: "202611241717-AH4MKJ"
        task_revision: 37
      -
        command_digest: "sha256:2cc86a32095e8f7a600957a2cab8f5fc0547012895b4c13ea272e34ee97ae9d2"
        id: "final-validation:sha256:a453f97bca7f9e6f73afc5a3be3f98c0a4a3102f4a6d8521f969cc2f3a67b5c5:37:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:a453f97bca7f9e6f73afc5a3be3f98c0a4a3102f4a6d8521f969cc2f3a67b5c5:37"
        occurred_at: "2026-11-24T18:11:05.419Z"
        payload_digest: "sha256:4934abf345b83f4b793d6d02f37a2b81bbbe4c89ee82a596ef689426f31535ea"
        task_id: "202611241717-AH4MKJ"
        task_revision: 38
      -
        command_digest: "sha256:1fd2abdcd8fce1bbcc18b01a2b696930a0c4401c8cea5570b97a79f2cd731836"
        id: "kernel_task_completion_required:sha256:3bd4cfb3f523d41a8e149b2b8f1c75c7ecae5739b48690abfec29d962495d35f:sha256:88878855fa5de3ea8618c53e77d5951376d4602fe932fec9fa2f838e7108b009:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:3bd4cfb3f523d41a8e149b2b8f1c75c7ecae5739b48690abfec29d962495d35f:sha256:88878855fa5de3ea8618c53e77d5951376d4602fe932fec9fa2f838e7108b009"
        occurred_at: "2026-11-24T20:34:59.205Z"
        payload_digest: "sha256:739a76f428b9c46f510ee172bc1ce2825906c00c226de5555edc67a60c55aceb"
        task_id: "202611241717-AH4MKJ"
        task_revision: 39
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Verify only git-reported changed files in repo-local CLI dist freshness guard

In the framework checkout every agentplane invocation runs bin/dist-guard.js isPackageBuildFresh. When git reports any changed watched path, it walks and SHA-256 hashes all ~1518 watched runtime files, adding about 300 ms to every CLI call. Compare only the git-reported changed files against the per-file hashes already recorded in dist/.build-manifest.json, fall back to the full snapshot only for ambiguous git output, and add regression tests. Supersedes 202611241658-HZ1TA6, whose intake scope omitted the test file.

## Scope

- In scope: In the framework checkout every agentplane invocation runs bin/dist-guard.js isPackageBuildFresh. When git reports any changed watched path, it walks and SHA-256 hashes all ~1518 watched runtime files, adding about 300 ms to every CLI call. Compare only the git-reported changed files against the per-file hashes already recorded in dist/.build-manifest.json, fall back to the full snapshot only for ambiguous git output, and add regression tests. Supersedes 202611241658-HZ1TA6, whose intake scope omitted the test file.
- Out of scope: unrelated refactors not required for "Verify only git-reported changed files in repo-local CLI dist freshness guard".

## Plan

1. Execute approved WorkItem incremental-dist-freshness.
2. Execute approved WorkItem final-correction-4313f6e3a2f7.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-11-24T18:11:06.452Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:576ca15861e25dd7e114cf834a3fc8b2f3b9b0f319d2c983d854200641a2a693, input_digest=sha256:2d469632f546eb69ca5207aebf1e32040155ed9d14a965c94cbb158b99bc9d9e

Details:

Check: affected_unit_integration
Command: bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts
Result: pass
Evidence: .agentplane/tasks/202611241717-AH4MKJ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202611241717-AH4MKJ Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202611241717-AH4MKJ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202611241717-AH4MKJ Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts
Result: pass
Evidence: .agentplane/tasks/202611241717-AH4MKJ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202611241717-AH4MKJ Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202611241717-AH4MKJ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202611241717-AH4MKJ Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202611241717-AH4MKJ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202611241717-AH4MKJ Verification Contract check full_regression

Check: task_outcome
Command: bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts
Result: pass
Evidence: .agentplane/tasks/202611241717-AH4MKJ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202611241717-AH4MKJ Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202611241717-AH4MKJ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202611241717-AH4MKJ Verification Contract check task_outcome (2/2)

NativeTaskIdentityRef:
- plan_digest: sha256:475a63b2e2364890dae18f72cd11d8650b25bdb1ab6c5cdb51511e755ec1499a
- policy_digest: sha256:5969d69ad7383875e82dd5e860b3156e5ba4406cbcd617ffa342e6d388092dd1
- capability_digest: sha256:2749d8ae7a2a89053b93d1e8d5255faa037c778d20706b3338d3cb71ede35436
- checks_digest: sha256:61c286745c1a61dfdcb2558a6b859b8ae09022f629359775807b61afe44d3e7c
- identity_digest: sha256:a046056d0c1321c0320978bb5e495f7f8ef542895f9de84d19b123d709aa5d94

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202611241717-AH4MKJ
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
