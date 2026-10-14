---
id: "202610142156-4MGWZM"
title: "Bound GitHub CI aggregate job-output projection"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
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
  updated_at: "2026-10-14T22:02:56.803Z"
  updated_by: "agentplane:kernel-controller"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
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
      digest: "sha256:1ad3712f3ee76e85eaf8fef6eb162ea27fe4c3e6c64bb250d81621de2ef8f7fc"
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
commit: null
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
  Plan: "1. Execute approved WorkItem bound-aggregate-job-output."
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
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:eea9842b6b46410bd217c218e6dafba9f0ed00e16452d1c82fcca2a5754920ae"
        digest: "sha256:72af8e9bd86c4c6bc01e6ea4414edfe16149ad112643e192b9fd09970b431372"
        revision: 1
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
      effects: []
      final_validation: null
      id: "202610142156-4MGWZM"
      intent_digest: "sha256:aee900de50efbf56ccdb4a853cd9f62d28fb5d0fa948d56c53a66b20c5fb4fb5"
      migration_receipts: []
      mutation_receipts:
        capture:202610142156-4MGWZM:
          after_revision: 1
          aggregate_digest: "sha256:a17e16917f4ff5c79dccfbdf4bb6cabfeeeb72b1556115aeae6ef5b367a7f561"
          before_revision: 0
          command_digest: "sha256:b34b0b0eefacb198a08af28ed05f2076db305a418076bcb80b5ceb838c1ae201"
          effect_ids: []
          event_digests:
            - "sha256:8ef6cfc4b60898476c2351a4f2f26c21a27c9b4f25cdd2107a2ea85ca2bc2d65"
          mutation_id: "capture:202610142156-4MGWZM"
        kernel_work_item_claim_required:sha256:883c14cf06d78936d7bb663a8174c0a8ca93e35a76d2ab554ebd90c57b2b5d2d:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 5
          aggregate_digest: "sha256:6b1c15a9720985737c6bc7adb4237ba08d4dc8a760e35bd74be938889cbc098a"
          before_revision: 4
          command_digest: "sha256:e0473fd883f89a10fecf45a96313990476b87618861ee85d0d6675f4b1f89beb"
          effect_ids: []
          event_digests:
            - "sha256:99b3fab0fa9a5763b31b125f01ca65c6444d646ee1cfa13d4d21794c4e4973f7"
          mutation_id: "kernel_work_item_claim_required:sha256:883c14cf06d78936d7bb663a8174c0a8ca93e35a76d2ab554ebd90c57b2b5d2d:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_execution_required:sha256:148e1e35fd302c729c083172ab211681ab5080a8d3593bf9d75b27c5244f83c6:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 6
          aggregate_digest: "sha256:8deddf7dcbb7c3d67abfebf73d2e0ec9c1829c5fcfb52fd7af2eb4a7409a0f35"
          before_revision: 5
          command_digest: "sha256:cfccb9b5052819ee660b6e4dd0d74a04f76b7a50655b25ae7a16493a8e0dd534"
          effect_ids: []
          event_digests:
            - "sha256:dad9c1b117f7add346130a38fe0d6f631dfe5ab48539830b2028fe7d222a4463"
          mutation_id: "kernel_work_item_execution_required:sha256:148e1e35fd302c729c083172ab211681ab5080a8d3593bf9d75b27c5244f83c6:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        kernel_work_item_materialization_required:sha256:a0e1967383951a92eb115c91e60434c26a54e5891b866446b36df447559a4c9e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4:
          after_revision: 4
          aggregate_digest: "sha256:e740e4aed07a897d797353fa8b0760cb97c7b12cf478dd5609d39f3a16ca19ef"
          before_revision: 3
          command_digest: "sha256:d739e39acf7073fb5fc9e58eeb6c890fea5e693792631e7b83033cba96510026"
          effect_ids: []
          event_digests:
            - "sha256:cb909744c9d8ef4430e1a770f817c7bb921ad060eaf350233e81418c4952453b"
          mutation_id: "kernel_work_item_materialization_required:sha256:a0e1967383951a92eb115c91e60434c26a54e5891b866446b36df447559a4c9e:sha256:1eb056834198ae10506eeb8a85d3179673782e9e5cc5f0b078c276f1aed1f2d4"
        result:sha256:edac28efcfbe3122292aea05257b851f7d6910a697aa147cb2215a94215d2dc0:
          after_revision: 2
          aggregate_digest: "sha256:9e3a50b911b1c65e680b0b4e991f7998cf052496b85b1436e6616b075a1f3e2a"
          before_revision: 1
          command_digest: "sha256:bd9090bdf2087f520e9139491572fd8039b2828e8ef16d6063121a1c96b1405d"
          effect_ids: []
          event_digests:
            - "sha256:728ff138de93377506e73f1e3a0385954ac1c19384e34ebc61c3461dba436adb"
          mutation_id: "result:sha256:edac28efcfbe3122292aea05257b851f7d6910a697aa147cb2215a94215d2dc0"
        sha256:2201ae62e171a60840c1885e980d6627b2d747556e20ad35be0ff04dcb12da10:
          after_revision: 3
          aggregate_digest: "sha256:ede96821324dd93c3a8900a14364b272e400a76c476daab50f5224c0a56899b0"
          before_revision: 2
          command_digest: "sha256:d9065bb30dbdd4859b7632c35296e7c35318e22ab0a4af3c02f66791af4f94eb"
          effect_ids: []
          event_digests:
            - "sha256:04384127f20a51f3cbe850dd9895aa3afd8425a1c81ecdc3942529282466054c"
          mutation_id: "sha256:2201ae62e171a60840c1885e980d6627b2d747556e20ad35be0ff04dcb12da10"
      plan_history: []
      revision: 6
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
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:4081f2a77e416ec7ff0c5167b669606505d8e193de785447a5cd513a03c56247"
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
