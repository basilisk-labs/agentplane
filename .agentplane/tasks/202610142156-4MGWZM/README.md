---
id: "202610142156-4MGWZM"
title: "Bound GitHub CI aggregate job-output projection"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 26
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "fix"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test:project agentplane packages/agentplane/src/commands/release/github-ci-plan.test.ts packages/agentplane/src/commands/release/github-ci-aggregate.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts"
  - "bun run typecheck"
  - "npm run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-10-14T23:34:52.494Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-14T22:57:30.295Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:0da7217ab13af89a5323586bfb88ac582cc12ec8abe113e4bb7e2f16c1cd648a"
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-14T22:57:30.295Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "46261cd8cf4f33a26fc14894850b26b879e0816a"
  review_identity_digest: "sha256:e7b94586b74833dd906766ff17c8cd805cfae3917ee36d75d57da1299b2645b3"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610142156-4MGWZM/955af9484d0412853c6fe3a8f1e72c3919c31748f47c05c56ed56b56e0a83525/quality-report.json"
  findings:
    - "Read complete genuine EVALUATOR WorkOrder and all13 required context blocks; verified their canonical digests/byte sizes and all4 inputs including the pathless source report manifest."
    - "Exact production delta projects only schema_version/route/route_reason/expected_jobs/executing_jobs_count/changed_files_count; full planning, verification decisions, stdout, scalar outputs and full changed_files are preserved. Regression parses real producer outputs with1317 Unicode-inclusive paths and tests failure/missing/unplanned-job semantics."
    - "Native required checks all exit0: focused38tests, typecheck, ci:local:full. Recursively23 manifests/69 raw file links verified; four failed nested child commands are expected exit2/3 verification-contract fixtures, not failed product checks."
    - "Full parent stdout retains core771files/7055passed+1skipped; the unique conditional network packaging case is not_run. All25 capture stages closed,1867 knownPID/start pairs absent, ownAPFSX detached; source2/parent/index and72 immutable pins retained."
    - "Independent evidence report: /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/AP-CI-output-projection-successor-native-preparation-v3/EVAL955af-independent-review.v1.json"
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
      - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
      - "scripts/checks/plan-github-ci.mjs"
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
      - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
      - "packages/agentplane/src/runner/process-supervision.test.ts"
      - "scripts/checks/plan-github-ci.mjs"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
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
          - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
          - "packages/agentplane/src/runner/process-supervision.test.ts"
          - "scripts/checks/plan-github-ci.mjs"
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
      digest: "sha256:42a00893bdae5fa356532f4a81aa6bb97460070284df7c13b363a92c0c7e6668"
      escalation_reasons:
        - "central_component:scripts/checks/plan-github-ci.mjs"
        - "effect_ci"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components: []
        changed_files: []
        external_effects: []
        repository_effects: []
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
  hash: "46261cd8cf4f33a26fc14894850b26b879e0816a"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-10-14T21:56:24.276Z"
doc_updated_by: "CODER"
description: "Fix confirmed PR6147 CI output quota for 1316 paths: emit only six aggregate transport fields while preserving full verification/capability plan computation/stdout, full changed_files, required-job failure semantics and all floors. Add actual-producer large-input UTF16 regression. Preserve completed 1C3ZFG source25 and failures; no truncation/compression/skips/newmodule/deps/artifactlayer."
sections:
  Summary: |-
    Bound GitHub CI aggregate job-output projection

    Fix confirmed PR6147 CI output quota for 1316 paths: emit only six aggregate transport fields while preserving full verification/capability plan computation/stdout, full changed_files, required-job failure semantics and all floors. Add actual-producer large-input UTF16 regression. Preserve completed 1C3ZFG source25 and failures; no truncation/compression/skips/newmodule/deps/artifactlayer.
  Scope: |-
    - In scope: Fix confirmed PR6147 CI output quota for 1316 paths: emit only six aggregate transport fields while preserving full verification/capability plan computation/stdout, full changed_files, required-job failure semantics and all floors. Add actual-producer large-input UTF16 regression. Preserve completed 1C3ZFG source25 and failures; no truncation/compression/skips/newmodule/deps/artifactlayer.
    - Out of scope: unrelated refactors not required for "Bound GitHub CI aggregate job-output projection".
  Plan: |-
    1. Execute approved WorkItem bound-aggregate-job-output.
    2. Execute approved WorkItem final-correction-0a4dae5da69c.
  Verify Steps: |-
    PLANNER fallback scaffold for "Bound GitHub CI aggregate job-output projection". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Bound GitHub CI aggregate job-output projection". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.kernel_operational_projection:
    digest: "sha256:7bd71aec105c7d0172dba8d9bf839956f8d9c53e82ba68b4aec2dc11f87f4c1e"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610142156-4MGWZM/955af9484d0412853c6fe3a8f1e72c3919c31748f47c05c56ed56b56e0a83525/quality-report.json"
    findings:
      - "Read complete genuine EVALUATOR WorkOrder and all13 required context blocks; verified their canonical digests/byte sizes and all4 inputs including the pathless source report manifest."
      - "Exact production delta projects only schema_version/route/route_reason/expected_jobs/executing_jobs_count/changed_files_count; full planning, verification decisions, stdout, scalar outputs and full changed_files are preserved. Regression parses real producer outputs with1317 Unicode-inclusive paths and tests failure/missing/unplanned-job semantics."
      - "Native required checks all exit0: focused38tests, typecheck, ci:local:full. Recursively23 manifests/69 raw file links verified; four failed nested child commands are expected exit2/3 verification-contract fixtures, not failed product checks."
      - "Full parent stdout retains core771files/7055passed+1skipped; the unique conditional network packaging case is not_run. All25 capture stages closed,1867 knownPID/start pairs absent, ownAPFSX detached; source2/parent/index and72 immutable pins retained."
      - "Independent evidence report: /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/AP-CI-output-projection-successor-native-preparation-v3/EVAL955af-independent-review.v1.json"
    implementation_commit: "46261cd8cf4f33a26fc14894850b26b879e0816a"
    implementation_tree: "e1eb351540caff4fbd7f01591803731065209fe0"
    projected_at: "2026-10-14T22:57:30.295Z"
    review_identity_digest: "sha256:e7b94586b74833dd906766ff17c8cd805cfae3917ee36d75d57da1299b2645b3"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:0da7217ab13af89a5323586bfb88ac582cc12ec8abe113e4bb7e2f16c1cd648a"
    work_order_id: "sha256:f5cc3e5ad570d08d500e1eac352c601709f88710314e3477ed3c2712e5f2f418"
  task_execution_context:
    base_ref: "main"
    base_sha: "d886917970bc0724b419074b7d575d47d9c95c1b"
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
            digest: "sha256:2a01d4e6377d8db3a6531709725cadc36ce0be3af732e124fc0295881c333318"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:72af8e9bd86c4c6bc01e6ea4414edfe16149ad112643e192b9fd09970b431372"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eea9842b6b46410bd217c218e6dafba9f0ed00e16452d1c82fcca2a5754920ae"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              - "scripts/checks/plan-github-ci.mjs"
            task_id: "202610142156-4MGWZM"
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
            digest: "sha256:88c46b4918f3e0e38aa7fc3c753e50fd34b527bd634ccd720c28d887d9f34776"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:72af8e9bd86c4c6bc01e6ea4414edfe16149ad112643e192b9fd09970b431372"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eea9842b6b46410bd217c218e6dafba9f0ed00e16452d1c82fcca2a5754920ae"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:2a01d4e6377d8db3a6531709725cadc36ce0be3af732e124fc0295881c333318"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              - "scripts/checks/plan-github-ci.mjs"
            task_id: "202610142156-4MGWZM"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              - "scripts/checks/plan-github-ci.mjs"
            evidence_digest: "sha256:dd65bd94f6c3f029bb155b64e5e414559277232f7a85b154bea63f647c4680a0"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:66804f80294ee9b6bd0a597310d4f416b9629b0eb5e3056ffe4dce9b950e3b60"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:eea9842b6b46410bd217c218e6dafba9f0ed00e16452d1c82fcca2a5754920ae"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:88c46b4918f3e0e38aa7fc3c753e50fd34b527bd634ccd720c28d887d9f34776"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              - "scripts/checks/plan-github-ci.mjs"
            task_id: "202610142156-4MGWZM"
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
            evidence_digest: "sha256:49e6e52cda72d323c3c8da2ba6329f8dc6973c5337eabc07722585cc5eb58075"
            kind: "plan_amendment"
            previous_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:3515dda368589d79edbbe34a42f5707b2a923973f55754521d8ca39fc8d3a4dc"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be"
            plan_revision: 2
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:eea9842b6b46410bd217c218e6dafba9f0ed00e16452d1c82fcca2a5754920ae"
              kind: "USER"
              parent_authority_digest: "sha256:66804f80294ee9b6bd0a597310d4f416b9629b0eb5e3056ffe4dce9b950e3b60"
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "scripts/checks/plan-github-ci.mjs"
            task_id: "202610142156-4MGWZM"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths: []
            evidence_digest: "sha256:2d39680579930519b6403f7d45d7785f350aa595b4265ff7e7b7d1fd38e64c62"
            kind: "prospective_scope_request"
            previous_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
            request_digest: "sha256:5059b9f39acbf70679cedd141c5d7d49a564bd383273d484b87c958c96edff6f"
            scope_request:
              attempt: 1
              claim_id: "sha256:99c5e9268584faf9bcb04d61a929b805c6016bbcdecb73151b69b2f494423e51"
              contract_digest: "sha256:68eb2b60f624a21fd9a72ee172e7ea1cab2ddbacf4c64040f6d92adddd36df88"
              intake_after_digest: "sha256:cf40edfc56ef06016eb1c510a352427b4b8bfb6197d261e125a04bf8bffec900"
              intake_before_digest: "sha256:72891b3c1a2c16333475b26b2dec91f7f9faf0ca46c764b3762d795db132d181"
              parent_authority_digest: "sha256:66804f80294ee9b6bd0a597310d4f416b9629b0eb5e3056ffe4dce9b950e3b60"
              plan_digest: "sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be"
              plan_revision: 2
              record_digest: "sha256:bbc1a0acb35e3384bef4f6050d67382e778661b1ee39b738b09f92089821a057"
              repository_effects:
                - "repository_write"
                - "tests"
              repository_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
              result_authentication: "native_stop_receipt"
              result_digest: "sha256:bd5f30ba277b5020cdf6cfedc59289ebdc32fad2d07905f08332610dead1438b"
              scope_roots:
                - "packages/agentplane/src/runner/process-supervision.test.ts"
              stop_receipt_digest: "sha256:691de01a78fc2c618435ff1523a7e09151836f6bb2bca09ca756b6ee1e11b155"
              task_id: "202610142156-4MGWZM"
              task_revision: 17
              work_item_id: "final-correction-0a4dae5da69c"
              work_order_id: "sha256:6e00e978080124ac31e67eb1b2773310eae044bcb0f730565ac3ef4a3f1c68a2"
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:fa04861d04f886d3786dc353fd07a8da3c6be5a3ba93d33f847bbb269bc99d13"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2"
            plan_revision: 3
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:5ec9e64fd7f1fbb9c5729594785570b82a5c074c7d33070af68b767dda7d9751"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "ci"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              - "packages/agentplane/src/runner/process-supervision.test.ts"
              - "scripts/checks/plan-github-ci.mjs"
            task_id: "202610142156-4MGWZM"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:5ec9e64fd7f1fbb9c5729594785570b82a5c074c7d33070af68b767dda7d9751"
        digest: "sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2"
        revision: 3
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:3ca769abaa68e42581e9cfbfec896812b66075c58f6c26a8b950b55360bbcaf1"
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
                - "scripts/checks/plan-github-ci.mjs"
                - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
            expected_outputs:
              - "ci-output-projection-source-report"
            id: "bound-aggregate-job-output"
            optional: false
            required_inputs: []
          -
            contract_digest: "sha256:f0738f6694f1db209193811543186ed5b9aef27b1f37be23175a9b0500a7c135"
            depends_on:
              - "bound-aggregate-job-output"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "ci"
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
                - "scripts/checks/plan-github-ci.mjs"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
            expected_outputs:
              - "final-correction-0a4dae5da69c-evidence"
            id: "final-correction-0a4dae5da69c"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202610142156-4MGWZM"
      intent_digest: "sha256:aee900de50efbf56ccdb4a853cd9f62d28fb5d0fa948d56c53a66b20c5fb4fb5"
      migration_receipts: []
      mutation_receipts:
        amend:sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be:
          after_revision: 13
          aggregate_digest: "sha256:9875738b5234e3ecdd7b6b0e2de7bc2f7705a5ca164d36801a67f5108d7d1aad"
          before_revision: 12
          command_digest: "sha256:a3aef16bf9680d874d16147acaafe94bd522b9040a525cb0cabb0664c33deff3"
          effect_ids: []
          event_digests:
            - "sha256:e68a7c6d6538ea8c785a0fe0f2542a41afe9a99e8731d32b601f63e620305172"
          mutation_id: "amend:sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be"
        capture:202610142156-4MGWZM:
          after_revision: 1
          aggregate_digest: "sha256:a17e16917f4ff5c79dccfbdf4bb6cabfeeeb72b1556115aeae6ef5b367a7f561"
          before_revision: 0
          command_digest: "sha256:b34b0b0eefacb198a08af28ed05f2076db305a418076bcb80b5ceb838c1ae201"
          effect_ids: []
          event_digests:
            - "sha256:8ef6cfc4b60898476c2351a4f2f26c21a27c9b4f25cdd2107a2ea85ca2bc2d65"
          mutation_id: "capture:202610142156-4MGWZM"
        final-validation:sha256:0a4dae5da69ce35809c3f04ae1d6e9f447ce88ab2c2d4f781def1e0c60a81fa4:11:
          after_revision: 12
          aggregate_digest: "sha256:8c18e2a1b2940da7b3ced7a5b35a0ce76e8605a587b6efc5f825cb6c918fed20"
          before_revision: 11
          command_digest: "sha256:7abbd58b03354a15073c64c492d41a65f79923c5d5fd2095dd7922420fb515e3"
          effect_ids: []
          event_digests:
            - "sha256:2cb247b9b91c909e5603f897c1e9b3f2d03f01223db1bb61d6b38d9476a7d1ce"
          mutation_id: "final-validation:sha256:0a4dae5da69ce35809c3f04ae1d6e9f447ce88ab2c2d4f781def1e0c60a81fa4:11"
        kernel_work_item_claim_required:sha256:0982dd93aae7bcdcdd610e3843a070335c2157db7c4891b94a95becf3ffc3d57:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:
          after_revision: 15
          aggregate_digest: "sha256:9c1a58404aad347bfd64beb7a87a972312674afd31bf977027b5b831df02968d"
          before_revision: 14
          command_digest: "sha256:474cddeaebd951922d3e471c19410801ab101d6104170a9fc1fbde69dbd8444b"
          effect_ids: []
          event_digests:
            - "sha256:553161558f248e068c95be14973c4889ebfbc4540ef29e3e8cdd5a4a49b69dfe"
          mutation_id: "kernel_work_item_claim_required:sha256:0982dd93aae7bcdcdd610e3843a070335c2157db7c4891b94a95becf3ffc3d57:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        kernel_work_item_claim_required:sha256:6291e0d64e68b1dc765faed0ca4204ff379753752153a60485d75c1866ec78f1:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:
          after_revision: 21
          aggregate_digest: "sha256:6f2ba93678b431ec9abc4b832970d988fd0736adc254f391cabf4b0ebe262620"
          before_revision: 20
          command_digest: "sha256:0bdfb552b42b72883aefeda20f175f0e6a7dd104ba60056691b65255562cbcf4"
          effect_ids: []
          event_digests:
            - "sha256:79b9ecdb5d934731e48429fdec5c034b38279ca1e2f0abd771ee020058283035"
          mutation_id: "kernel_work_item_claim_required:sha256:6291e0d64e68b1dc765faed0ca4204ff379753752153a60485d75c1866ec78f1:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        kernel_work_item_claim_required:sha256:883c14cf06d78936d7bb663a8174c0a8ca93e35a76d2ab554ebd90c57b2b5d2d:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 5
          aggregate_digest: "sha256:6b1c15a9720985737c6bc7adb4237ba08d4dc8a760e35bd74be938889cbc098a"
          before_revision: 4
          command_digest: "sha256:e0473fd883f89a10fecf45a96313990476b87618861ee85d0d6675f4b1f89beb"
          effect_ids: []
          event_digests:
            - "sha256:99b3fab0fa9a5763b31b125f01ca65c6444d646ee1cfa13d4d21794c4e4973f7"
          mutation_id: "kernel_work_item_claim_required:sha256:883c14cf06d78936d7bb663a8174c0a8ca93e35a76d2ab554ebd90c57b2b5d2d:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:03ba5b7c855d71477f6734979957f48c25ad3ab025474c9cd808a41f202cd528:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:
          after_revision: 16
          aggregate_digest: "sha256:9ba59b6a2b985d8939128ae65fc4a5e3e2a2294db12a4337f2a2554afe5226c1"
          before_revision: 15
          command_digest: "sha256:cf550d4aa805dd673ea6d1d2a4fd2906f522bd55f6a779007267463dd075fd93"
          effect_ids: []
          event_digests:
            - "sha256:387fdfe3cf4f558e843308786fcdd2a0fbb375fa4c7d0cf76988af019143409f"
          mutation_id: "kernel_work_item_execution_required:sha256:03ba5b7c855d71477f6734979957f48c25ad3ab025474c9cd808a41f202cd528:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        kernel_work_item_execution_required:sha256:0dd5ccbcce47eb37a8450a14037b2f571fbb05ced2a9b3bfcda03e0607be3c9a:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:
          after_revision: 22
          aggregate_digest: "sha256:6844242cf9a27dfb886da2378cfea717b6a049f1c091f0cc8683aea031763fc4"
          before_revision: 21
          command_digest: "sha256:2db1f466e182f0405f8f1953b07d3441579b2e43609f2272f14cdd023315df75"
          effect_ids: []
          event_digests:
            - "sha256:f1dd3a8f4c1ce3b7e8a2a8a703173c235daf81045da64b6e4cb1adf2990656c4"
          mutation_id: "kernel_work_item_execution_required:sha256:0dd5ccbcce47eb37a8450a14037b2f571fbb05ced2a9b3bfcda03e0607be3c9a:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        kernel_work_item_execution_required:sha256:148e1e35fd302c729c083172ab211681ab5080a8d3593bf9d75b27c5244f83c6:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 6
          aggregate_digest: "sha256:8deddf7dcbb7c3d67abfebf73d2e0ec9c1829c5fcfb52fd7af2eb4a7409a0f35"
          before_revision: 5
          command_digest: "sha256:cfccb9b5052819ee660b6e4dd0d74a04f76b7a50655b25ae7a16493a8e0dd534"
          effect_ids: []
          event_digests:
            - "sha256:dad9c1b117f7add346130a38fe0d6f631dfe5ab48539830b2028fe7d222a4463"
          mutation_id: "kernel_work_item_execution_required:sha256:148e1e35fd302c729c083172ab211681ab5080a8d3593bf9d75b27c5244f83c6:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_inspection_required:sha256:b57e4455b95059ef2f54848f0e3b7c04c19e76d92e2d1f777056ff5146a4c7c8:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:
          after_revision: 9
          aggregate_digest: "sha256:5909f88a84e72c251a17d7d0d0a4cb4c051f7c6f3bee0717bfa2a66131a046ab"
          before_revision: 8
          command_digest: "sha256:489cace0517fbeacd7dd70bb4d6e1a2f563499705669c7a2e4cd5fcf97a53bf9"
          effect_ids: []
          event_digests:
            - "sha256:6a1eb21500a8421c7df0f7f541e401428638c1df06326c75c4104b3ffaf1a3d4"
          mutation_id: "kernel_work_item_inspection_required:sha256:b57e4455b95059ef2f54848f0e3b7c04c19e76d92e2d1f777056ff5146a4c7c8:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        kernel_work_item_materialization_required:sha256:a0e1967383951a92eb115c91e60434c26a54e5891b866446b36df447559a4c9e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 4
          aggregate_digest: "sha256:e740e4aed07a897d797353fa8b0760cb97c7b12cf478dd5609d39f3a16ca19ef"
          before_revision: 3
          command_digest: "sha256:d739e39acf7073fb5fc9e58eeb6c890fea5e693792631e7b83033cba96510026"
          effect_ids: []
          event_digests:
            - "sha256:cb909744c9d8ef4430e1a770f817c7bb921ad060eaf350233e81418c4952453b"
          mutation_id: "kernel_work_item_materialization_required:sha256:a0e1967383951a92eb115c91e60434c26a54e5891b866446b36df447559a4c9e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        plan:sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2:
          after_revision: 19
          aggregate_digest: "sha256:1c700b61af9e1e5b837b170fa6e5b3c24c6dc27882e3f2f2f95c726a518c8eb5"
          before_revision: 18
          command_digest: "sha256:29e81c5907a0c51c54de07f76f5d6b02f4d7a0114c74173c83826ef6ba226bd0"
          effect_ids: []
          event_digests:
            - "sha256:cd0d3b276f63071b9dc060698246ba90ebba7dc6a2bfb9e2480f516533fdbb7c"
          mutation_id: "plan:sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2"
        result:sha256:edac28efcfbe3122292aea05257b851f7d6910a697aa147cb2215a94215d2dc0:
          after_revision: 2
          aggregate_digest: "sha256:9e3a50b911b1c65e680b0b4e991f7998cf052496b85b1436e6616b075a1f3e2a"
          before_revision: 1
          command_digest: "sha256:bd9090bdf2087f520e9139491572fd8039b2828e8ef16d6063121a1c96b1405d"
          effect_ids: []
          event_digests:
            - "sha256:728ff138de93377506e73f1e3a0385954ac1c19384e34ebc61c3461dba436adb"
          mutation_id: "result:sha256:edac28efcfbe3122292aea05257b851f7d6910a697aa147cb2215a94215d2dc0"
        result:sha256:f5cc3e5ad570d08d500e1eac352c601709f88710314e3477ed3c2712e5f2f418:
          after_revision: 8
          aggregate_digest: "sha256:c45a4fd6cb1ccc6e4965c7c26502585f7d4076a99f77b5105e864b44750bbb30"
          before_revision: 7
          command_digest: "sha256:2884265fbdf61c59bf7ddfe67e3326fce57e20c487c5dd1f210b1fc541051ebc"
          effect_ids: []
          event_digests:
            - "sha256:423d98b0c70f538c22a594b28437a2a262760b9890f1f7c0cd098bc274e56218"
          mutation_id: "result:sha256:f5cc3e5ad570d08d500e1eac352c601709f88710314e3477ed3c2712e5f2f418"
        scope-request:sha256:5059b9f39acbf70679cedd141c5d7d49a564bd383273d484b87c958c96edff6f:
          after_revision: 18
          aggregate_digest: "sha256:d4f9a17e9b613373efde837af552229dff1a9050fae2c736bb712b60a4cda129"
          before_revision: 17
          command_digest: "sha256:b18bb74bb7b6b5c33ba691632823c0101a9252ce76b1a8f0642021ce0e11cde1"
          effect_ids: []
          event_digests:
            - "sha256:cb6cbd451516b34ff53bb855c27ee1c3712b85c11a920e98c0ea659c40a806d0"
          mutation_id: "scope-request:sha256:5059b9f39acbf70679cedd141c5d7d49a564bd383273d484b87c958c96edff6f"
        semantic-stop:sha256:6e00e978080124ac31e67eb1b2773310eae044bcb0f730565ac3ef4a3f1c68a2:
          after_revision: 17
          aggregate_digest: "sha256:76d08bf37dbc368ce041e62d1cc02eca9021f33ab6b37d73406f743747e77f24"
          before_revision: 16
          command_digest: "sha256:73549da6f3af2af92364f6bc16a58dc6f337e434aa55d4f0f402eb256628e9b0"
          effect_ids: []
          event_digests:
            - "sha256:1287f0557aa95eca80fdb84f7870947fd560cab690802cb816dd630aac2e7ba8"
          mutation_id: "semantic-stop:sha256:6e00e978080124ac31e67eb1b2773310eae044bcb0f730565ac3ef4a3f1c68a2"
        sha256:20df5a8e56a20edaed7fb9a0bf7041a412f9ea06dbe54eaf43fe4a0208dabafd:
          after_revision: 14
          aggregate_digest: "sha256:3c76a0c2047b753e0df45f0f060c4a014a2e93b12516ce430b01d3d82f517f19"
          before_revision: 13
          command_digest: "sha256:e7f670cdd33bb4709301f182074494b2b62e7fca018745474260863e43e1cab3"
          effect_ids: []
          event_digests:
            - "sha256:ab5d02f096aee9540b7b9fcdd4455e3ccbbfee3b5beddfdae8f10e5df882bb94"
          mutation_id: "sha256:20df5a8e56a20edaed7fb9a0bf7041a412f9ea06dbe54eaf43fe4a0208dabafd"
        sha256:2201ae62e171a60840c1885e980d6627b2d747556e20ad35be0ff04dcb12da10:
          after_revision: 3
          aggregate_digest: "sha256:ede96821324dd93c3a8900a14364b272e400a76c476daab50f5224c0a56899b0"
          before_revision: 2
          command_digest: "sha256:d9065bb30dbdd4859b7632c35296e7c35318e22ab0a4af3c02f66791af4f94eb"
          effect_ids: []
          event_digests:
            - "sha256:04384127f20a51f3cbe850dd9895aa3afd8425a1c81ecdc3942529282466054c"
          mutation_id: "sha256:2201ae62e171a60840c1885e980d6627b2d747556e20ad35be0ff04dcb12da10"
        sha256:8905c482a9dcb0068cfc497fbb106d79351d9aed12d9d1652fa1fd483bf08462:
          after_revision: 20
          aggregate_digest: "sha256:b23aceca85cb0c5f53f358b8b4e69a45943f41fe297e515d7bd11eb498aa1835"
          before_revision: 19
          command_digest: "sha256:71b9562d9806465ae3f1acf0550fc8251aa26c80037f518b93c54fff16ac0130"
          effect_ids: []
          event_digests:
            - "sha256:16409ba41df63abde4715b8964c848621dc958b23f6d5e986e38d9fde9a110d7"
          mutation_id: "sha256:8905c482a9dcb0068cfc497fbb106d79351d9aed12d9d1652fa1fd483bf08462"
        sha256:ffac4f7b6658024be303a4133f105dd91f2edd2efefeb7d0f32775a2f88b6d6e:
          after_revision: 7
          aggregate_digest: "sha256:532bea584b2bf60f953ca8402472ff76edd14240da4fbe0995476126d98e4e21"
          before_revision: 6
          command_digest: "sha256:82c1b998d8b59d77fe80c002f2b456266242c6d2bf973c73687ba439b985ed39"
          effect_ids: []
          event_digests:
            - "sha256:b5a5c6854d4c54ae1913adb4444b0c18e60f7b1dcc8f4a9518ae6a15fa549974"
          mutation_id: "sha256:ffac4f7b6658024be303a4133f105dd91f2edd2efefeb7d0f32775a2f88b6d6e"
        validation-resolution:sha256:a580719ed89e62992214fa2f42d925c5ba2392734fb346f6a29fd43f240239e9:
          after_revision: 11
          aggregate_digest: "sha256:218c9a58c26b7e217ae8effb5bddee50a67138c6bba950d72ae49c154ab0219b"
          before_revision: 10
          command_digest: "sha256:219ec72ba077d204b7f14fbe9b6b8ec05f6d365ef57c1d951821d17df5b7be65"
          effect_ids: []
          event_digests:
            - "sha256:cb1c6fedf70900ceed14934782fed0b0d28297d684ca4e3f432a95a37e814e15"
          mutation_id: "validation-resolution:sha256:a580719ed89e62992214fa2f42d925c5ba2392734fb346f6a29fd43f240239e9"
        validation:sha256:955af9484d0412853c6fe3a8f1e72c3919c31748f47c05c56ed56b56e0a83525:
          after_revision: 10
          aggregate_digest: "sha256:9a046a8182351f4ab880e3d099a38e51daacaf03ad142602768e103080ed981b"
          before_revision: 9
          command_digest: "sha256:ac0bd59b37912305f092d6700fff1cfc385da25735de633073ab35ee30b41c51"
          effect_ids: []
          event_digests:
            - "sha256:a2a9912f039ba598c53d1ee64c100facae5f270a2eccc19b8a2a4728a99f3d71"
          mutation_id: "validation:sha256:955af9484d0412853c6fe3a8f1e72c3919c31748f47c05c56ed56b56e0a83525"
      plan_history:
        -
          approval_actor_id: "agentplane:kernel-controller"
          approval_evidence_digest: "sha256:eea9842b6b46410bd217c218e6dafba9f0ed00e16452d1c82fcca2a5754920ae"
          digest: "sha256:72af8e9bd86c4c6bc01e6ea4414edfe16149ad112643e192b9fd09970b431372"
          revision: 1
          state: "SUPERSEDED"
          work_items:
            -
              contract_digest: "sha256:3ca769abaa68e42581e9cfbfec896812b66075c58f6c26a8b950b55360bbcaf1"
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
                  - "scripts/checks/plan-github-ci.mjs"
                  - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              expected_outputs:
                - "ci-output-projection-source-report"
              id: "bound-aggregate-job-output"
              optional: false
              required_inputs: []
        -
          approval_actor_id: "USER"
          approval_evidence_digest: "sha256:e5447becaea203eaeab407e6c581973116ff31e4a37f01c3222d8ea2e0de5447"
          digest: "sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be"
          revision: 2
          state: "REJECTED"
          work_items:
            -
              contract_digest: "sha256:3ca769abaa68e42581e9cfbfec896812b66075c58f6c26a8b950b55360bbcaf1"
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
                  - "scripts/checks/plan-github-ci.mjs"
                  - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
              expected_outputs:
                - "ci-output-projection-source-report"
              id: "bound-aggregate-job-output"
              optional: false
              required_inputs: []
            -
              contract_digest: "sha256:68eb2b60f624a21fd9a72ee172e7ea1cab2ddbacf4c64040f6d92adddd36df88"
              depends_on:
                - "bound-aggregate-job-output"
              execution_requirements:
                capabilities:
                  - "repository_write"
                external_effects: []
                repository_effects:
                  - "ci"
                  - "repository_write"
                  - "source_code"
                  - "tests"
                resources: []
                scope_roots:
                  - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
                  - "scripts/checks/plan-github-ci.mjs"
              expected_outputs:
                - "final-correction-0a4dae5da69c-evidence"
              id: "final-correction-0a4dae5da69c"
              optional: false
              required_inputs: []
      revision: 22
      schema_version: 1
      state: "ACTIVE"
      work_items:
        bound-aggregate-job-output:
          attempt: 1
          claim_id: "sha256:3fffbf861938bca1ba7e553836cd70ac082b5c14f093ad88179eebfd72b024e1"
          definition:
            contract_digest: "sha256:3ca769abaa68e42581e9cfbfec896812b66075c58f6c26a8b950b55360bbcaf1"
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
                - "scripts/checks/plan-github-ci.mjs"
                - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
            expected_outputs:
              - "ci-output-projection-source-report"
            id: "bound-aggregate-job-output"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:680076efff1b029b94d3ac8ed7325b1f2f9d9cda645406008b1f95f2dd49a66d"
              id: "ci-output-projection-source-report"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
              task_id: "202610142156-4MGWZM"
              work_item_id: "bound-aggregate-job-output"
          result_digest: "sha256:cb9a1d1b680aa1c33cb5bb1a353c0a285a7abbe204183aeffc5e50514e4a937d"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:ff38b23808d51a5c09aad64dc3a74d205186ad243789f86f38fa3cd742e0b49a"
              - "sha256:e7b94586b74833dd906766ff17c8cd805cfae3917ee36d75d57da1299b2645b3"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:68513a5ae785d56bc71bc246bdae97f1fc6a7ed54920833c28572236ab2fb61c"
              environment_digest: "sha256:0a6a273ee6d89b5e5b1770b5b9608ba1f565a4a545f93738a7aad2641dadb858"
              implementation_identity: "sha256:cb9a1d1b680aa1c33cb5bb1a353c0a285a7abbe204183aeffc5e50514e4a937d"
              toolchain_digest: "sha256:0bce0f5c0803bbf256cc4c5c3b66c80103a5a7e8d93978a73c3f3dcb04a01a7a"
            observed_at: "2026-10-14T22:57:30.295Z"
            status: "PASSED"
        final-correction-0a4dae5da69c:
          attempt: 2
          claim_id: "sha256:2975bf652a32721044c2f2706d9ee91ad7282b3f7eca31bdd1b8ce2727be6f6f"
          definition:
            contract_digest: "sha256:f0738f6694f1db209193811543186ed5b9aef27b1f37be23175a9b0500a7c135"
            depends_on:
              - "bound-aggregate-job-output"
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "ci"
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/release/github-ci-plan.test.ts"
                - "scripts/checks/plan-github-ci.mjs"
                - "packages/agentplane/src/runner/process-supervision.test.ts"
            expected_outputs:
              - "final-correction-0a4dae5da69c-evidence"
            id: "final-correction-0a4dae5da69c"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 9
          state: "EXECUTING"
          validation: null
    digest: "sha256:e646641ae36f31cde3e758c08bd4bc1a8b6e684bfd55bdfb599c52f401133369"
    documents:
      contracts:
        sha256:3ca769abaa68e42581e9cfbfec896812b66075c58f6c26a8b950b55360bbcaf1:
          acceptance_criteria:
            - "The aggregate JSON carries exactly the six consumed fields and preserves their values; full verification plan/capability/expected-job calculation, stdout plan, full changed_files and other scalar outputs remain unchanged."
            - "An actual-producer regression with at least1316 long nested lifecycle-artifact paths creates a full plan exceeding1MiB UTF16 while the sum of every declared GitHub job output name/value stays below1MiB after projection. Parse outputs rather than mirror the assignment; retain the complete changed_files list/count. Include Unicode/surrogate-pair filename coverage."
            - "The compact plan must preserve aggregate required-job failure semantics: all expected successes pass, a failed/missing required job fails, and unexpected non-skipped jobs still fail. Do not weaken verification/admission floors or expected jobs."
            - "Modify only the two approved paths on current canonical main; preserve every other source/config/lock and the completed original Task175/history/source25. Return actual source report/diff/preimages/check results only; native/EVAL/FULL/hosted acceptance remains separate."
            - "Run the exact mandatory verification commands via native verification after admitted source output. Obtain independent EVAL and native final checks before separately authorized exact-SHA publication/hosted CI/canonical integration. Do not claim local proof as hosted acceptance."
            - "Use isolated owned dependencies and bounded owned fixture/temp roots; no shared install/global configuration change. Serialize heavy checks with ROOT. Before FULL/commit/push/merge return the actual source diff and nearest regression evidence; do not invoke those lifecycle effects during source semantic execution."
          objective: "Fix confirmed GitHub CI quota failure described in /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/AP-current175-CI-output-quota-source-diagnosis-PREP.v1.json SHA2566c4b96593e887ad6b452cf0bfbf3e08528b866a710fe51740b0db40403653a6f. Only replace aggregatePlan transport in plan-github-ci.mjs with explicit schema_version,route,route_reason,expected_jobs,executing_jobs_count,changed_files_count projection. Keep full planner calculation, capability/contract decisions and stdout unchanged, and keep full changed_files for routed CI. Reuse existing test fixtures and nearest test module. No truncation, compression, new module, dependency, artifact layer or workflow change. Preserve completed Task1C3ZFG/source25/FINAL and all historical failures. Stop after source diff and focused evidence for ROOT/distinct review before source intake/commit/FULL/provider actions."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/release/github-ci-plan.test.ts packages/agentplane/src/commands/release/github-ci-aggregate.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts"
            - "bun run typecheck"
            - "npm run ci:local:full"
        sha256:68eb2b60f624a21fd9a72ee172e7ea1cab2ddbacf4c64040f6d92adddd36df88:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:0a4dae5da69ce35809c3f04ae1d6e9f447ce88ab2c2d4f781def1e0c60a81fa4. Read /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/canonical-ap-nine-integration-primary/.git/agentplane/kernel/exchanges/202610142156-4MGWZM/d9b8e5d2ea366eab8f5936a4e2479a1472529b4de671d2eea37048b11e1f1f54/final-validation.json before edits."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/release/github-ci-plan.test.ts packages/agentplane/src/commands/release/github-ci-aggregate.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts"
            - "bun run typecheck"
            - "npm run ci:local:full"
        sha256:f0738f6694f1db209193811543186ed5b9aef27b1f37be23175a9b0500a7c135:
          acceptance_criteria:
            - "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence."
            - "Run the unchanged required validation commands. Return implementation evidence for independent native review."
            - "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects."
          objective: "Repair the failed final validation evidenced by sha256:0a4dae5da69ce35809c3f04ae1d6e9f447ce88ab2c2d4f781def1e0c60a81fa4. Read /Users/densmirnov/.codex/visualizations/2026/10/10/01a123dc-e17e-7503-9026-a0aab475e8a3/ap-report-only-runtime/component-delivery/canonical-ap-nine-integration-primary/.git/agentplane/kernel/exchanges/202610142156-4MGWZM/d9b8e5d2ea366eab8f5936a4e2479a1472529b4de671d2eea37048b11e1f1f54/final-validation.json before edits. Correct only test readiness: write a ready marker after installing the SIGTERM handler, then wait through the existing before-recording-process-start boundary before timer commitment. Preserve 120ms wall/1000ms idle/zero grace and all six escalation assertions. No production code/API/timer changes. Historical EPERM causality remains UNKNOWN; diagnostic PASS is nonreproduction, not final qualification. Preserve all mandatory checks and completed CI work. Follow admitted request sha256:5059b9f39acbf70679cedd141c5d7d49a564bd383273d484b87c958c96edff6f and its native USER approval."
          role: "EXECUTOR"
          verification_commands:
            - "bun run test:project agentplane packages/agentplane/src/commands/release/github-ci-plan.test.ts packages/agentplane/src/commands/release/github-ci-aggregate.test.ts packages/agentplane/src/commands/release/ci-workflow-contract.test.ts"
            - "bun run typecheck"
            - "npm run ci:local:full"
      intent:
        context: "Fix confirmed PR6147 CI output quota for 1316 paths: emit only six aggregate transport fields while preserving full verification/capability plan computation/stdout, full changed_files, required-job failure semantics and all floors. Add actual-producer large-input UTF16 regression. Preserve completed 1C3ZFG source25 and failures; no truncation/compression/skips/newmodule/deps/artifactlayer."
        objective: "Bound GitHub CI aggregate job-output projection"
    events:
      -
        command_digest: "sha256:b34b0b0eefacb198a08af28ed05f2076db305a418076bcb80b5ceb838c1ae201"
        id: "capture:202610142156-4MGWZM:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610142156-4MGWZM"
        occurred_at: "2026-10-14T21:56:24.252Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610142156-4MGWZM"
        task_revision: 1
      -
        command_digest: "sha256:bd9090bdf2087f520e9139491572fd8039b2828e8ef16d6063121a1c96b1405d"
        id: "result:sha256:edac28efcfbe3122292aea05257b851f7d6910a697aa147cb2215a94215d2dc0:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:edac28efcfbe3122292aea05257b851f7d6910a697aa147cb2215a94215d2dc0"
        occurred_at: "2026-10-14T22:02:50.684Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610142156-4MGWZM"
        task_revision: 2
      -
        command_digest: "sha256:d9065bb30dbdd4859b7632c35296e7c35318e22ab0a4af3c02f66791af4f94eb"
        id: "sha256:2201ae62e171a60840c1885e980d6627b2d747556e20ad35be0ff04dcb12da10:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:2201ae62e171a60840c1885e980d6627b2d747556e20ad35be0ff04dcb12da10"
        occurred_at: "2026-10-14T22:02:54.389Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610142156-4MGWZM"
        task_revision: 3
      -
        command_digest: "sha256:d739e39acf7073fb5fc9e58eeb6c890fea5e693792631e7b83033cba96510026"
        id: "kernel_work_item_materialization_required:sha256:a0e1967383951a92eb115c91e60434c26a54e5891b866446b36df447559a4c9e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a0e1967383951a92eb115c91e60434c26a54e5891b866446b36df447559a4c9e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-14T22:02:58.127Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610142156-4MGWZM"
        task_revision: 4
      -
        command_digest: "sha256:e0473fd883f89a10fecf45a96313990476b87618861ee85d0d6675f4b1f89beb"
        id: "kernel_work_item_claim_required:sha256:883c14cf06d78936d7bb663a8174c0a8ca93e35a76d2ab554ebd90c57b2b5d2d:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:883c14cf06d78936d7bb663a8174c0a8ca93e35a76d2ab554ebd90c57b2b5d2d:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-14T22:03:02.620Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610142156-4MGWZM"
        task_revision: 5
      -
        command_digest: "sha256:cfccb9b5052819ee660b6e4dd0d74a04f76b7a50655b25ae7a16493a8e0dd534"
        id: "kernel_work_item_execution_required:sha256:148e1e35fd302c729c083172ab211681ab5080a8d3593bf9d75b27c5244f83c6:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:148e1e35fd302c729c083172ab211681ab5080a8d3593bf9d75b27c5244f83c6:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        occurred_at: "2026-10-14T22:03:55.084Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610142156-4MGWZM"
        task_revision: 6
      -
        command_digest: "sha256:82c1b998d8b59d77fe80c002f2b456266242c6d2bf973c73687ba439b985ed39"
        id: "sha256:ffac4f7b6658024be303a4133f105dd91f2edd2efefeb7d0f32775a2f88b6d6e:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:ffac4f7b6658024be303a4133f105dd91f2edd2efefeb7d0f32775a2f88b6d6e"
        occurred_at: "2026-10-14T22:29:06.897Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610142156-4MGWZM"
        task_revision: 7
      -
        command_digest: "sha256:2884265fbdf61c59bf7ddfe67e3326fce57e20c487c5dd1f210b1fc541051ebc"
        id: "result:sha256:f5cc3e5ad570d08d500e1eac352c601709f88710314e3477ed3c2712e5f2f418:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:f5cc3e5ad570d08d500e1eac352c601709f88710314e3477ed3c2712e5f2f418"
        occurred_at: "2026-10-14T22:29:09.558Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610142156-4MGWZM"
        task_revision: 8
      -
        command_digest: "sha256:489cace0517fbeacd7dd70bb4d6e1a2f563499705669c7a2e4cd5fcf97a53bf9"
        id: "kernel_work_item_inspection_required:sha256:b57e4455b95059ef2f54848f0e3b7c04c19e76d92e2d1f777056ff5146a4c7c8:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:b57e4455b95059ef2f54848f0e3b7c04c19e76d92e2d1f777056ff5146a4c7c8:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        occurred_at: "2026-10-14T22:29:11.619Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610142156-4MGWZM"
        task_revision: 9
      -
        command_digest: "sha256:ac0bd59b37912305f092d6700fff1cfc385da25735de633073ab35ee30b41c51"
        id: "validation:sha256:955af9484d0412853c6fe3a8f1e72c3919c31748f47c05c56ed56b56e0a83525:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:955af9484d0412853c6fe3a8f1e72c3919c31748f47c05c56ed56b56e0a83525"
        occurred_at: "2026-10-14T22:57:32.448Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610142156-4MGWZM"
        task_revision: 10
      -
        command_digest: "sha256:219ec72ba077d204b7f14fbe9b6b8ec05f6d365ef57c1d951821d17df5b7be65"
        id: "validation-resolution:sha256:a580719ed89e62992214fa2f42d925c5ba2392734fb346f6a29fd43f240239e9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:a580719ed89e62992214fa2f42d925c5ba2392734fb346f6a29fd43f240239e9"
        occurred_at: "2026-10-14T22:57:33.847Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610142156-4MGWZM"
        task_revision: 11
      -
        command_digest: "sha256:7abbd58b03354a15073c64c492d41a65f79923c5d5fd2095dd7922420fb515e3"
        id: "final-validation:sha256:0a4dae5da69ce35809c3f04ae1d6e9f447ce88ab2c2d4f781def1e0c60a81fa4:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:0a4dae5da69ce35809c3f04ae1d6e9f447ce88ab2c2d4f781def1e0c60a81fa4:11"
        occurred_at: "2026-10-14T23:14:21.587Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202610142156-4MGWZM"
        task_revision: 12
      -
        command_digest: "sha256:a3aef16bf9680d874d16147acaafe94bd522b9040a525cb0cabb0664c33deff3"
        id: "amend:sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be:plan_amended"
        kind: "plan_amended"
        mutation_id: "amend:sha256:5c81f433f42e2fd3f3e081b25f9f0ebc36d730065962ff546011b95ecafdf9be"
        occurred_at: "2026-10-14T23:34:28.663Z"
        payload_digest: "sha256:b15590955f1bf684e87c1de91d4294438c4366f8c657818652f9d8a39b168887"
        task_id: "202610142156-4MGWZM"
        task_revision: 13
      -
        command_digest: "sha256:e7f670cdd33bb4709301f182074494b2b62e7fca018745474260863e43e1cab3"
        id: "sha256:20df5a8e56a20edaed7fb9a0bf7041a412f9ea06dbe54eaf43fe4a0208dabafd:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:20df5a8e56a20edaed7fb9a0bf7041a412f9ea06dbe54eaf43fe4a0208dabafd"
        occurred_at: "2026-10-14T23:34:29.954Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202610142156-4MGWZM"
        task_revision: 14
      -
        command_digest: "sha256:474cddeaebd951922d3e471c19410801ab101d6104170a9fc1fbde69dbd8444b"
        id: "kernel_work_item_claim_required:sha256:0982dd93aae7bcdcdd610e3843a070335c2157db7c4891b94a95becf3ffc3d57:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:0982dd93aae7bcdcdd610e3843a070335c2157db7c4891b94a95becf3ffc3d57:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        occurred_at: "2026-10-14T23:34:53.864Z"
        payload_digest: "sha256:b2973cf58e1cfd8ba3008ad18e0038615b5d0e4b04fb94d5dc325539a2f4677e"
        task_id: "202610142156-4MGWZM"
        task_revision: 15
      -
        command_digest: "sha256:cf550d4aa805dd673ea6d1d2a4fd2906f522bd55f6a779007267463dd075fd93"
        id: "kernel_work_item_execution_required:sha256:03ba5b7c855d71477f6734979957f48c25ad3ab025474c9cd808a41f202cd528:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:03ba5b7c855d71477f6734979957f48c25ad3ab025474c9cd808a41f202cd528:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        occurred_at: "2026-10-14T23:34:55.881Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202610142156-4MGWZM"
        task_revision: 16
      -
        command_digest: "sha256:73549da6f3af2af92364f6bc16a58dc6f337e434aa55d4f0f402eb256628e9b0"
        id: "semantic-stop:sha256:6e00e978080124ac31e67eb1b2773310eae044bcb0f730565ac3ef4a3f1c68a2:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "semantic-stop:sha256:6e00e978080124ac31e67eb1b2773310eae044bcb0f730565ac3ef4a3f1c68a2"
        occurred_at: "2026-10-14T23:35:39.233Z"
        payload_digest: "sha256:18c24b895f9b723740f79d3ce53d2f40555e25f522d28ca92fde718a85ea00f0"
        task_id: "202610142156-4MGWZM"
        task_revision: 17
      -
        command_digest: "sha256:b18bb74bb7b6b5c33ba691632823c0101a9252ce76b1a8f0642021ce0e11cde1"
        id: "scope-request:sha256:5059b9f39acbf70679cedd141c5d7d49a564bd383273d484b87c958c96edff6f:authority_continued"
        kind: "authority_continued"
        mutation_id: "scope-request:sha256:5059b9f39acbf70679cedd141c5d7d49a564bd383273d484b87c958c96edff6f"
        occurred_at: "2026-10-14T23:36:22.523Z"
        payload_digest: "sha256:081d67c06e936b740a518fc54e272e93cef0237b5d5568bc81e75cbe0b73faa3"
        task_id: "202610142156-4MGWZM"
        task_revision: 18
      -
        command_digest: "sha256:29e81c5907a0c51c54de07f76f5d6b02f4d7a0114c74173c83826ef6ba226bd0"
        id: "plan:sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "plan:sha256:ace0b9e44ba2246722e06f2b308f580b6f2ddcc93619bb4dbe52a4ad440266b2"
        occurred_at: "2026-10-14T23:37:33.116Z"
        payload_digest: "sha256:8b2273723f09043e78db604be1df9899c57bc31eef7b3494ebda5b63893267c8"
        task_id: "202610142156-4MGWZM"
        task_revision: 19
      -
        command_digest: "sha256:71b9562d9806465ae3f1acf0550fc8251aa26c80037f518b93c54fff16ac0130"
        id: "sha256:8905c482a9dcb0068cfc497fbb106d79351d9aed12d9d1652fa1fd483bf08462:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:8905c482a9dcb0068cfc497fbb106d79351d9aed12d9d1652fa1fd483bf08462"
        occurred_at: "2026-10-14T23:37:52.128Z"
        payload_digest: "sha256:f732d91d0099a835ae963e335cda9be1bcde3c06bea10481ac2c1534f8ec58f1"
        task_id: "202610142156-4MGWZM"
        task_revision: 20
      -
        command_digest: "sha256:0bdfb552b42b72883aefeda20f175f0e6a7dd104ba60056691b65255562cbcf4"
        id: "kernel_work_item_claim_required:sha256:6291e0d64e68b1dc765faed0ca4204ff379753752153a60485d75c1866ec78f1:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:6291e0d64e68b1dc765faed0ca4204ff379753752153a60485d75c1866ec78f1:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        occurred_at: "2026-10-14T23:38:00.234Z"
        payload_digest: "sha256:f01e8fc394bd33bcaa4f4728fdd4472df9cb2403e0580ea0813ac40d4be16ed1"
        task_id: "202610142156-4MGWZM"
        task_revision: 21
      -
        command_digest: "sha256:2db1f466e182f0405f8f1953b07d3441579b2e43609f2272f14cdd023315df75"
        id: "kernel_work_item_execution_required:sha256:0dd5ccbcce47eb37a8450a14037b2f571fbb05ced2a9b3bfcda03e0607be3c9a:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:0dd5ccbcce47eb37a8450a14037b2f571fbb05ced2a9b3bfcda03e0607be3c9a:sha256:b0b4d356defafb1c1db9b365d02c920e6ee5c9c7a597e6bad1d314f08f041c8c"
        occurred_at: "2026-10-14T23:38:02.225Z"
        payload_digest: "sha256:7bec622588bd02de96323f081c201df5d478968500103ba2ec3e17f38e80db25"
        task_id: "202610142156-4MGWZM"
        task_revision: 22
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Bound GitHub CI aggregate job-output projection

Fix confirmed PR6147 CI output quota for 1316 paths: emit only six aggregate transport fields while preserving full verification/capability plan computation/stdout, full changed_files, required-job failure semantics and all floors. Add actual-producer large-input UTF16 regression. Preserve completed 1C3ZFG source25 and failures; no truncation/compression/skips/newmodule/deps/artifactlayer.

## Scope

- In scope: Fix confirmed PR6147 CI output quota for 1316 paths: emit only six aggregate transport fields while preserving full verification/capability plan computation/stdout, full changed_files, required-job failure semantics and all floors. Add actual-producer large-input UTF16 regression. Preserve completed 1C3ZFG source25 and failures; no truncation/compression/skips/newmodule/deps/artifactlayer.
- Out of scope: unrelated refactors not required for "Bound GitHub CI aggregate job-output projection".

## Plan

1. Execute approved WorkItem bound-aggregate-job-output.
2. Execute approved WorkItem final-correction-0a4dae5da69c.

## Verify Steps

PLANNER fallback scaffold for "Bound GitHub CI aggregate job-output projection". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Bound GitHub CI aggregate job-output projection". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
