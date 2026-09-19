---
id: "202609191809-7KFNQT"
title: "Replace versioned README header generation with one static shared image"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "release-0.7.10"
  - "static-header"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
  - "network"
verify:
  - "bun run docs:scripts:check"
  - "bun run docs:scripts:generate"
  - "bun run format:check"
  - "bun run release:check"
  - "bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
  - "git diff --check"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:5f13b419848d3a6d8b1f0301e15b922c4537bc3c735c32ce87bf818a4ef23787"
      escalation_reasons:
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "task_outcome"
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-19T18:09:05.336Z"
doc_updated_by: "CODER"
description: "Use one version-independent docs/assets/header.svg for all 13 current README surfaces; remove visible version text from that shared image; delete the per-surface SVG variants and their generator; remove the associated package scripts and release gate; regenerate scripts/README.md; preserve generic direct-task verification sequence coverage with neutral fixture names; keep historical docs/releases/** records unchanged. This replaces blocked task 202609191755-BXKBCP whose final shell-style absence check was incompatible with AgentPlane's argv-only verification runner."
sections:
  Summary: |-
    Replace versioned README header generation with one static shared image

    Use one version-independent docs/assets/header.svg for all 13 current README surfaces; remove visible version text from that shared image; delete the per-surface SVG variants and their generator; remove the associated package scripts and release gate; regenerate scripts/README.md; preserve generic direct-task verification sequence coverage with neutral fixture names; keep historical docs/releases/** records unchanged. This replaces blocked task 202609191755-BXKBCP whose final shell-style absence check was incompatible with AgentPlane's argv-only verification runner.
  Scope: |-
    - In scope: Use one version-independent docs/assets/header.svg for all 13 current README surfaces; remove visible version text from that shared image; delete the per-surface SVG variants and their generator; remove the associated package scripts and release gate; regenerate scripts/README.md; preserve generic direct-task verification sequence coverage with neutral fixture names; keep historical docs/releases/** records unchanged. This replaces blocked task 202609191755-BXKBCP whose final shell-style absence check was incompatible with AgentPlane's argv-only verification runner.
    - Out of scope: unrelated refactors not required for "Replace versioned README header generation with one static shared image".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Replace versioned README header generation with one static shared image". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Replace versioned README header generation with one static shared image". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    base_sha: "ef8068df34a264d6eccc51190b4f6e3c43d27ab8"
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
              - "git_read"
              - "repository_read"
              - "run_checks"
              - "workspace_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:cb62e52c0e46249e8a5729af5133658dd8774ac2c04ea7e00fedb211053bb17d"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:65eda291cfa5cf158d6f2f644283c668c9d33fb63aed42af24217d2fd5426649"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:273b2ffe7f23dcaf80fd2579c9f32c0cb5c2b228d388c872a9c5841a253ed8af"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "documentation"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "README.md"
              - "docs/README.md"
              - "docs/adr/README.md"
              - "docs/assets/header.svg"
              - "docs/assets/readme-headers"
              - "docs/releases/README.md"
              - "package.json"
              - "packages/agentplane/README.md"
              - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "packages/core/README.md"
              - "packages/recipes/README.md"
              - "packages/spec/README.md"
              - "packages/testkit/README.md"
              - "schemas/README.md"
              - "scripts/README.md"
              - "scripts/generate/generate-readme-header.mjs"
              - "scripts/generate/generate-scripts-readme.mjs"
              - "skills/README.md"
              - "skills/humanizer/README.md"
            task_id: "202609191809-7KFNQT"
            validation_requirements:
              - "bun run docs:scripts:check"
              - "bun run docs:scripts:generate"
              - "bun run format:check"
              - "bun run release:check"
              - "bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
              - "git diff --check"
            work_item_id: null
          observation: null
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:273b2ffe7f23dcaf80fd2579c9f32c0cb5c2b228d388c872a9c5841a253ed8af"
        digest: "sha256:65eda291cfa5cf158d6f2f644283c668c9d33fb63aed42af24217d2fd5426649"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:6f881a8288600b1eaf9efdb68ef3d817de7635538868059a536d98cfbfb32c40"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "workspace_write"
                - "run_checks"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "documentation"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "README.md"
                - "package.json"
                - "docs/assets/header.svg"
                - "docs/assets/readme-headers"
                - "docs/README.md"
                - "docs/adr/README.md"
                - "docs/releases/README.md"
                - "packages/agentplane/README.md"
                - "packages/core/README.md"
                - "packages/recipes/README.md"
                - "packages/spec/README.md"
                - "packages/testkit/README.md"
                - "scripts/README.md"
                - "scripts/generate/generate-readme-header.mjs"
                - "scripts/generate/generate-scripts-readme.mjs"
                - "schemas/README.md"
                - "skills/README.md"
                - "skills/humanizer/README.md"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
            expected_outputs:
              - "implementation-and-verification"
            id: "static-header-migration"
            optional: false
            required_inputs: []
      effects: []
      final_validation: null
      id: "202609191809-7KFNQT"
      intent_digest: "sha256:5d930a37a7bc53e4d4895a6e41659a2e514d01b3d74949b6543a01056b21c5f9"
      migration_receipts: []
      mutation_receipts:
        capture:202609191809-7KFNQT:
          after_revision: 1
          aggregate_digest: "sha256:cbff1d93b64dc7c3eaeb1dab5a049af747fa6181e5e0bd7dafeda70449365bda"
          before_revision: 0
          command_digest: "sha256:11305e951ea749e097417236dcf9797b1769ec8d21b0e36a0c06d309862f6442"
          effect_ids: []
          event_digests:
            - "sha256:dcff199bd0e88865fb1ab185779913b339cb57eb69005f5eb47371d931b375db"
          mutation_id: "capture:202609191809-7KFNQT"
        kernel_work_item_claim_required:sha256:408f0acb67cb6372f6a6dda1a4c97b73013c65a589c7774fc198480dffade973:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5:
          after_revision: 5
          aggregate_digest: "sha256:53a04ae09e4e1de75696aaabdc4f452316b4aef513851f736bffbd441e75f485"
          before_revision: 4
          command_digest: "sha256:b84435d9679b8e2a2d40a8d76c569fbd8433844d2e9f48bff1fa33a75184e0da"
          effect_ids: []
          event_digests:
            - "sha256:61a5bf50f654f91b62e2e337f4756871df72b13320a8c6bcb0c306a4805cab85"
          mutation_id: "kernel_work_item_claim_required:sha256:408f0acb67cb6372f6a6dda1a4c97b73013c65a589c7774fc198480dffade973:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
        kernel_work_item_execution_required:sha256:207c2777ed9ee4e47a1c23c3f6598880dbff5f050abb882821bee5a5a3897d8e:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5:
          after_revision: 6
          aggregate_digest: "sha256:53a5acd76ffbbdcdcf6728944048294af2964d799e6cb97d562115f9894ccb84"
          before_revision: 5
          command_digest: "sha256:63db308cdfe1dc9aa3b6074051d1e502da62bb100b34b2e7691599e2f2768cf4"
          effect_ids: []
          event_digests:
            - "sha256:1ce2b52ed2cc32f4c9cd8d639baa7da19136d330d765dae67e0e9086ff49f1cd"
          mutation_id: "kernel_work_item_execution_required:sha256:207c2777ed9ee4e47a1c23c3f6598880dbff5f050abb882821bee5a5a3897d8e:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
        kernel_work_item_materialization_required:sha256:83dff6faba0b9368a223a13a6b4077459417123b6729a441f61d332b6e41cb19:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5:
          after_revision: 4
          aggregate_digest: "sha256:b000d13f58d8e74569b6ad3ac43c0dd9e8b9592216e7bdafefeadb3496fb8735"
          before_revision: 3
          command_digest: "sha256:5ea802f3f6c333fcd27bfd249945cdfab2a12f03b206eefd673558625861a26a"
          effect_ids: []
          event_digests:
            - "sha256:467d0f7a08aacbaf747f5a42143399e9d512dff82470bbeb7a48f4f8d9b22af2"
          mutation_id: "kernel_work_item_materialization_required:sha256:83dff6faba0b9368a223a13a6b4077459417123b6729a441f61d332b6e41cb19:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
        result:sha256:8c4bea51973321ff2e16e6fcffc485a28b2e99b7968e5becf594d4029e447db4:
          after_revision: 2
          aggregate_digest: "sha256:ca581e30b4ccd2595631c0022b18057fc9224410f97445cf1248481c581925cf"
          before_revision: 1
          command_digest: "sha256:a1f6df12f6fb64a21771ac3c098d623a75ab7b7bc494257a6dffbcfb1f890596"
          effect_ids: []
          event_digests:
            - "sha256:f100fdf26cf343cf86947f963e02892cdcf707fb323b52d56b1d1d7406d43627"
          mutation_id: "result:sha256:8c4bea51973321ff2e16e6fcffc485a28b2e99b7968e5becf594d4029e447db4"
        sha256:ddda3960e08ef86d7eb306743c0184675a50fc0037126c99404e3b0125be84de:
          after_revision: 3
          aggregate_digest: "sha256:17576b4775ae9978d806353e5b18d3baab327eb54c4cf0c2e2e2eedd8aa0b10d"
          before_revision: 2
          command_digest: "sha256:dceafe89d2fe0191d0de3bcdfcf3f18314dbfc681cdccc22602c00c8621c6247"
          effect_ids: []
          event_digests:
            - "sha256:e8baf56ce90d95b63f75e78e4188620073b366993b4165ea4d2b3df48886564a"
          mutation_id: "sha256:ddda3960e08ef86d7eb306743c0184675a50fc0037126c99404e3b0125be84de"
      plan_history: []
      revision: 6
      schema_version: 1
      state: "ACTIVE"
      work_items:
        static-header-migration:
          attempt: 1
          claim_id: "sha256:f2405a8b57bb3d0aa0b5d18baa30c411becfd19d0d95473b715eb528c45d5435"
          definition:
            contract_digest: "sha256:6f881a8288600b1eaf9efdb68ef3d817de7635538868059a536d98cfbfb32c40"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "git_read"
                - "workspace_write"
                - "run_checks"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "documentation"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "README.md"
                - "package.json"
                - "docs/assets/header.svg"
                - "docs/assets/readme-headers"
                - "docs/README.md"
                - "docs/adr/README.md"
                - "docs/releases/README.md"
                - "packages/agentplane/README.md"
                - "packages/core/README.md"
                - "packages/recipes/README.md"
                - "packages/spec/README.md"
                - "packages/testkit/README.md"
                - "scripts/README.md"
                - "scripts/generate/generate-readme-header.mjs"
                - "scripts/generate/generate-scripts-readme.mjs"
                - "schemas/README.md"
                - "skills/README.md"
                - "skills/humanizer/README.md"
                - "packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
            expected_outputs:
              - "implementation-and-verification"
            id: "static-header-migration"
            optional: false
            required_inputs: []
          output_manifests: []
          result_digest: null
          revision: 3
          state: "EXECUTING"
          validation: null
    digest: "sha256:6a739e592d892aa6ca6d40f59fa8a0fd5c5a0e691ca4d3d6d0ebc6e242b9f98a"
    documents:
      contracts:
        sha256:6f881a8288600b1eaf9efdb68ef3d817de7635538868059a536d98cfbfb32c40:
          acceptance_criteria:
            - "All 13 current README surfaces reference the shared versionless SVG through correct paths."
            - "Per-surface SVGs, the header generator, associated package scripts, and release gate are removed."
            - "scripts/README.md is regenerated and generic sequence coverage uses neutral fixtures."
            - "Historical records under docs/releases/** are unchanged and all declared checks pass."
          objective: "Replace all 13 current README header references with docs/assets/header.svg; remove visible version text from the shared SVG; delete per-surface SVGs and their generator; remove associated package scripts and the release:check dependency; regenerate scripts/README.md; replace retired script names in the generic sequence test with neutral fixtures; leave docs/releases/** historical records unchanged."
          role: "EXECUTOR"
          verification_commands:
            - "bun test ./packages/agentplane/src/commands/task/direct-task-verification.sequence.cases.ts"
            - "bun run docs:scripts:generate"
            - "bun run docs:scripts:check"
            - "bun run format:check"
            - "bun run release:check"
            - "git diff --check"
      intent:
        context: "Use one version-independent docs/assets/header.svg for all 13 current README surfaces; remove visible version text from that shared image; delete the per-surface SVG variants and their generator; remove the associated package scripts and release gate; regenerate scripts/README.md; preserve generic direct-task verification sequence coverage with neutral fixture names; keep historical docs/releases/** records unchanged. This replaces blocked task 202609191755-BXKBCP whose final shell-style absence check was incompatible with AgentPlane's argv-only verification runner."
        objective: "Replace versioned README header generation with one static shared image"
    events:
      -
        command_digest: "sha256:11305e951ea749e097417236dcf9797b1769ec8d21b0e36a0c06d309862f6442"
        id: "capture:202609191809-7KFNQT:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609191809-7KFNQT"
        occurred_at: "2026-09-19T18:09:05.311Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609191809-7KFNQT"
        task_revision: 1
      -
        command_digest: "sha256:a1f6df12f6fb64a21771ac3c098d623a75ab7b7bc494257a6dffbcfb1f890596"
        id: "result:sha256:8c4bea51973321ff2e16e6fcffc485a28b2e99b7968e5becf594d4029e447db4:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:8c4bea51973321ff2e16e6fcffc485a28b2e99b7968e5becf594d4029e447db4"
        occurred_at: "2026-09-19T18:09:56.889Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609191809-7KFNQT"
        task_revision: 2
      -
        command_digest: "sha256:dceafe89d2fe0191d0de3bcdfcf3f18314dbfc681cdccc22602c00c8621c6247"
        id: "sha256:ddda3960e08ef86d7eb306743c0184675a50fc0037126c99404e3b0125be84de:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:ddda3960e08ef86d7eb306743c0184675a50fc0037126c99404e3b0125be84de"
        occurred_at: "2026-09-19T18:10:07.322Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609191809-7KFNQT"
        task_revision: 3
      -
        command_digest: "sha256:5ea802f3f6c333fcd27bfd249945cdfab2a12f03b206eefd673558625861a26a"
        id: "kernel_work_item_materialization_required:sha256:83dff6faba0b9368a223a13a6b4077459417123b6729a441f61d332b6e41cb19:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:83dff6faba0b9368a223a13a6b4077459417123b6729a441f61d332b6e41cb19:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
        occurred_at: "2026-09-19T18:10:15.755Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609191809-7KFNQT"
        task_revision: 4
      -
        command_digest: "sha256:b84435d9679b8e2a2d40a8d76c569fbd8433844d2e9f48bff1fa33a75184e0da"
        id: "kernel_work_item_claim_required:sha256:408f0acb67cb6372f6a6dda1a4c97b73013c65a589c7774fc198480dffade973:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:408f0acb67cb6372f6a6dda1a4c97b73013c65a589c7774fc198480dffade973:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
        occurred_at: "2026-09-19T18:10:19.684Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609191809-7KFNQT"
        task_revision: 5
      -
        command_digest: "sha256:63db308cdfe1dc9aa3b6074051d1e502da62bb100b34b2e7691599e2f2768cf4"
        id: "kernel_work_item_execution_required:sha256:207c2777ed9ee4e47a1c23c3f6598880dbff5f050abb882821bee5a5a3897d8e:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:207c2777ed9ee4e47a1c23c3f6598880dbff5f050abb882821bee5a5a3897d8e:sha256:f5146102b858273f2d717d93bd5e43589935b23c1160319ad43c295b80c15bb5"
        occurred_at: "2026-09-19T18:10:43.280Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609191809-7KFNQT"
        task_revision: 6
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Replace versioned README header generation with one static shared image

Use one version-independent docs/assets/header.svg for all 13 current README surfaces; remove visible version text from that shared image; delete the per-surface SVG variants and their generator; remove the associated package scripts and release gate; regenerate scripts/README.md; preserve generic direct-task verification sequence coverage with neutral fixture names; keep historical docs/releases/** records unchanged. This replaces blocked task 202609191755-BXKBCP whose final shell-style absence check was incompatible with AgentPlane's argv-only verification runner.

## Scope

- In scope: Use one version-independent docs/assets/header.svg for all 13 current README surfaces; remove visible version text from that shared image; delete the per-surface SVG variants and their generator; remove the associated package scripts and release gate; regenerate scripts/README.md; preserve generic direct-task verification sequence coverage with neutral fixture names; keep historical docs/releases/** records unchanged. This replaces blocked task 202609191755-BXKBCP whose final shell-style absence check was incompatible with AgentPlane's argv-only verification runner.
- Out of scope: unrelated refactors not required for "Replace versioned README header generation with one static shared image".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Replace versioned README header generation with one static shared image". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Replace versioned README header generation with one static shared image". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
