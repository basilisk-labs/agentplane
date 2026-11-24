---
id: "202611241717-AH4MKJ"
title: "Verify only git-reported changed files in repo-local CLI dist freshness guard"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
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
        kernel_work_item_execution_required:sha256:7915204111fe55c023ec79f48dd9babf983e91157e86955e355cba02764816ac:sha256:6af207b42a2f6b1ec0497ce4fa867cbf0bc181d65b6a56352c9394e918645320:
          after_revision: 7
          aggregate_digest: "sha256:8253486dc760a051149386de64d38efb36e9f94dfe34776ed0d314a84e90dd31"
          before_revision: 6
          command_digest: "sha256:a0395db9611620a7b8e9c9cd056fc7f8984b4cc0015dfdfa748465fded693f3a"
          effect_ids: []
          event_digests:
            - "sha256:cbbe9803843b27718798292534bad54c1f68d70a7f7650385d924611ed1cab04"
          mutation_id: "kernel_work_item_execution_required:sha256:7915204111fe55c023ec79f48dd9babf983e91157e86955e355cba02764816ac:sha256:6af207b42a2f6b1ec0497ce4fa867cbf0bc181d65b6a56352c9394e918645320"
        kernel_work_item_materialization_required:sha256:813fa7d59700d242a7669647c32ebe0250ae7cb3310081a92adc9a7e8d576201:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f:
          after_revision: 4
          aggregate_digest: "sha256:bc5a90d73fd10d6bc5c165b127bf2a29962f3d402a6bd1c9cc8c66160e47cd74"
          before_revision: 3
          command_digest: "sha256:d14ff1d6c8c889627c2bf13526006ef03d4e0240eb04f8200507e20b75e1e5cd"
          effect_ids: []
          event_digests:
            - "sha256:a659f7231c796b3201aecf9fd9e99733e9baec9c667e7ce18b5e203850c457bc"
          mutation_id: "kernel_work_item_materialization_required:sha256:813fa7d59700d242a7669647c32ebe0250ae7cb3310081a92adc9a7e8d576201:sha256:f7be121efe4347a38da0597cfbd53cf62476c0f14706c4ca2bffbd308d0f248f"
        result:sha256:0f55156359cf3382f0fc360c78d628a755f72afc628b79901a48c28cf698c62d:
          after_revision: 2
          aggregate_digest: "sha256:5fba07c6bd2663ddd990bc89a4f2878b07b0ce6cbdc55e32aa77015899555526"
          before_revision: 1
          command_digest: "sha256:24fc58a14972e05bd219496764651add275839be936dda88e550d33ea54bc72a"
          effect_ids: []
          event_digests:
            - "sha256:d5bae5a62006bf1380fb8eefcdf44e4d14cb4ea1abe42af1af16f6c43d644d0c"
          mutation_id: "result:sha256:0f55156359cf3382f0fc360c78d628a755f72afc628b79901a48c28cf698c62d"
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
      plan_history: []
      revision: 7
      schema_version: 1
      state: "ACTIVE"
      work_items:
        incremental-dist-freshness:
          attempt: 1
          claim_id: "sha256:1cb65c2da24b817e561ca0851f2cbcb09851e6a2b9310d7902dbb7e92f1ec029"
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
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:96d3d9da65193e09b3fc430633e3d163fb41d394803355a3ee9f6e8065e34138"
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
