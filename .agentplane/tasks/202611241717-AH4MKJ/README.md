---
id: "202611241717-AH4MKJ"
title: "Verify only git-reported changed files in repo-local CLI dist freshness guard"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 22
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
  updated_at: "2026-11-24T17:21:28.487Z"
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
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
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
      digest: "sha256:c6c0bfaa2281f16ba2e1769edf65d2b7a6e632774535930f76677369890f72fa"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/dist-guard.test.ts"
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
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-11-24T17:17:19.062Z"
doc_updated_by: "CODER"
description: "In the framework checkout every agentplane invocation runs bin/dist-guard.js isPackageBuildFresh. When git reports any changed watched path, it walks and SHA-256 hashes all ~1518 watched runtime files, adding about 300 ms to every CLI call. Compare only the git-reported changed files against the per-file hashes already recorded in dist/.build-manifest.json, fall back to the full snapshot only for ambiguous git output, and add regression tests. Supersedes 202611241658-HZ1TA6, whose intake scope omitted the test file."
sections:
  Summary: |-
    Verify only git-reported changed files in repo-local CLI dist freshness guard

    In the framework checkout every agentplane invocation runs bin/dist-guard.js isPackageBuildFresh. When git reports any changed watched path, it walks and SHA-256 hashes all ~1518 watched runtime files, adding about 300 ms to every CLI call. Compare only the git-reported changed files against the per-file hashes already recorded in dist/.build-manifest.json, fall back to the full snapshot only for ambiguous git output, and add regression tests. Supersedes 202611241658-HZ1TA6, whose intake scope omitted the test file.
  Scope: |-
    - In scope: In the framework checkout every agentplane invocation runs bin/dist-guard.js isPackageBuildFresh. When git reports any changed watched path, it walks and SHA-256 hashes all ~1518 watched runtime files, adding about 300 ms to every CLI call. Compare only the git-reported changed files against the per-file hashes already recorded in dist/.build-manifest.json, fall back to the full snapshot only for ambiguous git output, and add regression tests. Supersedes 202611241658-HZ1TA6, whose intake scope omitted the test file.
    - Out of scope: unrelated refactors not required for "Verify only git-reported changed files in repo-local CLI dist freshness guard".
  Plan: "1. Execute approved WorkItem incremental-dist-freshness."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:051ac16fa51c171535f63b460b76a8297d841bf4a53b268e333f5437a943b471"
        digest: "sha256:3e5f05f1c46b38fb94f5489d7776b833442e850d940a01017ed18591299944ae"
        revision: 1
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
      effects: []
      final_validation: null
      id: "202611241717-AH4MKJ"
      intent_digest: "sha256:2a6ef0f51eed5d1b813ca62f5c967d519d21697fd07bbecff7ab05eb3ba56fac"
      migration_receipts: []
      mutation_receipts:
        capture:202611241717-AH4MKJ:
          after_revision: 1
          aggregate_digest: "sha256:805f858d4d15d779e6937ed15214ac02888a3f6c1d23c6e2e9e3b8835d1690ea"
          before_revision: 0
          command_digest: "sha256:66147587c254912fd1e8f5501115cce1314d19c8079db88e04ebaa955bbd8871"
          effect_ids: []
          event_digests:
            - "sha256:926897b12ec97ec0da6fa6c39dbe9ee70248e81f3e83297657702a790a3f109b"
          mutation_id: "capture:202611241717-AH4MKJ"
        kernel_work_item_claim_required:sha256:71383a08212881276bfca2d30eaca179db27415c1c22b0b6bf203722cf107323:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f:
          after_revision: 5
          aggregate_digest: "sha256:11753312495b56c332a29a38ba56f100c056a413e54c70321109fbcf0281bbd5"
          before_revision: 4
          command_digest: "sha256:74cdaaaffe96645fff897df63c1fa48a2af75d803bd7ca061ff3386451cff594"
          effect_ids: []
          event_digests:
            - "sha256:7c04cd0d17c292b7164e82497cba5a8cd431e788a70daa26f9aa23af2b830df0"
          mutation_id: "kernel_work_item_claim_required:sha256:71383a08212881276bfca2d30eaca179db27415c1c22b0b6bf203722cf107323:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f"
        kernel_work_item_execution_required:sha256:32b13ba8ac5f9cc9e4a1e08da7ac2750b789a27bafcd043950e30a3fda345416:sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e:
          after_revision: 14
          aggregate_digest: "sha256:44cb5d6a7474d8304489cdf95d2dae4759c0f53b3b6e31aed13b382273db23bc"
          before_revision: 13
          command_digest: "sha256:d3a543d85482f9b7ce2b4c59c7d76c4f1531674f9de3971a6d41a5e28379110d"
          effect_ids: []
          event_digests:
            - "sha256:f87077e76df999492f758cc774e86d27106957222a34d3214fdfe580f0942a8d"
          mutation_id: "kernel_work_item_execution_required:sha256:32b13ba8ac5f9cc9e4a1e08da7ac2750b789a27bafcd043950e30a3fda345416:sha256:d121d3a83c6a35b89e410dd54dff6021a3eb642dabd4c172ee96aa1c28ad962e"
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
        kernel_work_item_inspection_required:sha256:67c4397946c6b6203d12ae069fe2406cbf8652c422258fa5bdf77523ded3fd1c:sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc:
          after_revision: 17
          aggregate_digest: "sha256:87215cf71f7d020786823f29bba4a198d231a0ac323333e4bbf09e13f1d0f037"
          before_revision: 16
          command_digest: "sha256:40717fb27233bd5c8385249d663a83cbac911c3b46892289384e86abb041d533"
          effect_ids: []
          event_digests:
            - "sha256:4189ee6685f002e96370a01305422f7ac91511c4b01af3f671987667e27c9b96"
          mutation_id: "kernel_work_item_inspection_required:sha256:67c4397946c6b6203d12ae069fe2406cbf8652c422258fa5bdf77523ded3fd1c:sha256:afa4a8ac83ae743969efe634d1bc2f1d35bfe1cc59bafe83c5d017b7c4a791cc"
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
        sha256:18c99361fc0f1c0a2a839ce37b5b4aa414141c29ad2b6249ce1716869f6a606a:
          after_revision: 15
          aggregate_digest: "sha256:87c2a1479405909aa55de5a516748ad97fe6fdc721fca31cdb9ebd9586d67fc8"
          before_revision: 14
          command_digest: "sha256:2d5e5dfc7fb20acbfdfc68897d1226b30500b7c1d38717e4542af18736d53a24"
          effect_ids: []
          event_digests:
            - "sha256:b025edc22e309e3c86f0b5fdc2ad32aba3a0446ca717a3932ec79997768e0194"
          mutation_id: "sha256:18c99361fc0f1c0a2a839ce37b5b4aa414141c29ad2b6249ce1716869f6a606a"
        sha256:7ad10da6fe8131b4c517017cf1dc61e8c7a7e8cd38b2e166efef12ee6a754c7a:
          after_revision: 8
          aggregate_digest: "sha256:63cb38b7366329108f7a9162bab0950bfe5155192b82540699effb46c4df3704"
          before_revision: 7
          command_digest: "sha256:109c8d3cbbce414aac98e93ba123ba09d986d2d91902c6a6aaf472fe252068fb"
          effect_ids: []
          event_digests:
            - "sha256:186b6f6936fd414e6d04125bfdaa16d88e91184c73f6fc2419830c9055619e11"
          mutation_id: "sha256:7ad10da6fe8131b4c517017cf1dc61e8c7a7e8cd38b2e166efef12ee6a754c7a"
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
      plan_history: []
      revision: 21
      schema_version: 1
      state: "ACTIVE"
      work_items:
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
          output_manifests: []
          result_digest: null
          revision: 15
          state: "EXECUTING"
          validation: null
    digest: "sha256:68d69c061edc22c7ae4e3fecbd5492f54da1e1dbaf8dca850ae60d22ca858c30"
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

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run --config vitest.workspace.ts --project agentplane packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/runtime-watch.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
