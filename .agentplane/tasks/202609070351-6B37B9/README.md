---
id: "202609070351-6B37B9"
title: "Sign macOS standalone release binaries before packaging"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test:project agentplane packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts"
  - "bun run workflows:lint"
plan_approval:
  state: "approved"
  updated_at: "2026-09-07T03:54:01.687Z"
  updated_by: "USER"
  note: "Relayed existing explicit user authorization for every action required to fix and verify the 0.7.8 release, including the explicit AGENTS permission override. Approves the bounded six-file macOS signing and verified distribution handoff repair; recovery preserves the qualified source SHA and immutable npm packages."
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
    allowed_external_effects: []
    allowed_repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
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
      - ".github/workflows/publish.yml"
      - "packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts"
      - "packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts"
      - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
      - "scripts/generate/generate-bun-cli-assets.mjs"
      - "scripts/generate/generate-release-distribution.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Keep signing and artifact handoff repair in one isolated native task worktree."
      - "Recovery publication and refreshing the existing release evidence PR remain separately authorized operator actions after this repair is integrated."
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - ".github/workflows/publish.yml"
      - "packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts"
      - "packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts"
      - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
      - "scripts/generate/generate-bun-cli-assets.mjs"
      - "scripts/generate/generate-release-distribution.mjs"
  observed:
    authority_violations: []
    changed_components:
      - ".github"
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - ".github/workflows/publish.yml"
      - "packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts"
      - "packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts"
      - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
      - "scripts/generate/generate-bun-cli-assets.mjs"
      - "scripts/generate/generate-release-distribution.mjs"
    external_effects: []
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
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
          - ".github/workflows/publish.yml"
          - "packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts"
          - "packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts"
          - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
          - "scripts/generate/generate-bun-cli-assets.mjs"
          - "scripts/generate/generate-release-distribution.mjs"
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
      digest: "sha256:77e2be9136ee270f7435b9d95aa321e752d8dc88417f478d6d27750b568c1590"
      escalation_reasons:
        - "central_component:.github/workflows/publish.yml"
        - "central_path:.github/workflows/publish.yml"
        - "effect_ci"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - ".github"
          - "packages/agentplane"
          - "scripts"
        changed_files:
          - ".github/workflows/publish.yml"
          - "packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts"
          - "packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts"
          - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
          - "scripts/generate/generate-bun-cli-assets.mjs"
          - "scripts/generate/generate-release-distribution.mjs"
        external_effects: []
        repository_effects:
          - "ci"
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
  hash: "7cfd6b281fc79d748e5dc871e7b4d2bdbdd4bcaf"
  message: "🚧 6B37B9 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 7cfd6b281fc7. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-07T03:54:12.257Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-07T04:03:33.435Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 7cfd6b281fc7. CLI accepted one state-bound external-agent semantic result."
    commit: "7cfd6b281fc79d748e5dc871e7b4d2bdbdd4bcaf"
doc_version: 3
doc_updated_at: "2026-09-07T04:03:33.435Z"
doc_updated_by: "SUPERVISOR"
description: "Post-publication verification of v0.7.8 found that the downloaded darwin-arm64 executable is terminated with SIGKILL and codesign reports an invalid signature. Ad-hoc signing the identical extracted binary makes it run as 0.7.8. Repair release asset generation so both Darwin binaries are signed and verified on macOS before archive checksums and distribution manifests are finalized. Generate and smoke release distribution assets in a macOS job, then consume those exact artifacts in the Ubuntu publisher while preserving exact historical release-ready SHA validation, npm skip guards, tag identity and canonical publication evidence. Keep source payload 81b3fe507426d82ea903d7a63fd6335b583d81b5 and npm versions unchanged for recovery. Add focused signing and workflow contract regressions; integrate this repair separately before regenerating published assets and refreshing existing release follow-up PR #5906."
sections:
  Summary: |-
    Sign macOS standalone release binaries before packaging

    Post-publication verification of v0.7.8 found that the downloaded darwin-arm64 executable is terminated with SIGKILL and codesign reports an invalid signature. Ad-hoc signing the identical extracted binary makes it run as 0.7.8. Repair release asset generation so both Darwin binaries are signed and verified on macOS before archive checksums and distribution manifests are finalized. Generate and smoke release distribution assets in a macOS job, then consume those exact artifacts in the Ubuntu publisher while preserving exact historical release-ready SHA validation, npm skip guards, tag identity and canonical publication evidence. Keep source payload 81b3fe507426d82ea903d7a63fd6335b583d81b5 and npm versions unchanged for recovery. Add focused signing and workflow contract regressions; integrate this repair separately before regenerating published assets and refreshing existing release follow-up PR #5906.
  Scope: |-
    - In scope: Post-publication verification of v0.7.8 found that the downloaded darwin-arm64 executable is terminated with SIGKILL and codesign reports an invalid signature. Ad-hoc signing the identical extracted binary makes it run as 0.7.8. Repair release asset generation so both Darwin binaries are signed and verified on macOS before archive checksums and distribution manifests are finalized. Generate and smoke release distribution assets in a macOS job, then consume those exact artifacts in the Ubuntu publisher while preserving exact historical release-ready SHA validation, npm skip guards, tag identity and canonical publication evidence. Keep source payload 81b3fe507426d82ea903d7a63fd6335b583d81b5 and npm versions unchanged for recovery. Add focused signing and workflow contract regressions; integrate this repair separately before regenerating published assets and refreshing existing release follow-up PR #5906.
    - Out of scope: unrelated refactors not required for "Sign macOS standalone release binaries before packaging".
  Plan: "Propose one bounded packaging and workflow repair: sign Darwin executables on macOS before hashing and publish the verified distribution artifact from Ubuntu."
  Verify Steps: |-
    1. Run `bun run test:project agentplane packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts`. Expected: signing order, failure propagation, portable synthetic checks and exact distribution artifact handoff regressions pass.
    2. Run `bun run workflows:lint`. Expected: workflow syntax and repository workflow contracts pass.
    3. Review the final diff. Expected: only the six approved source, workflow and test paths change. The historical release payload, npm versions, tag identity and publication guards remain unchanged.
    4. After integration, recover the same release SHA through the hosted publisher and independently verify both Darwin signatures, native macOS execution and all regenerated checksums before refreshing existing PR #5906. Actual publication remains outside this semantic repair.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "USER"
    approval_evidence_digest: null
    approval_kind: "manual_operator"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:529710c08d24e61c12f0e1588e695c6c6cd542b5c2f35c536ba7dfc9e66bbcdf"
    digest: "sha256:46d5d331975e4e57946a02ca1bae233aad01bdffadd1ecf2f2c7dc30a07ae2e4"
    grant_id: "626f552d-8b36-478a-9edb-0f1389c0de36"
    issued_at: "2026-09-07T03:54:01.687Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:76ac0d8add3d74ca686a5eabd491ec585d7e8bf1288e864ef7c5abe670b008ab"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:c6c9e697a522b2f54be36910d921e8bdba1d9082f7afd4982cdb0c6dfce545ac"
    status: "active"
    task_id: "202609070351-6B37B9"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-07T03:54:01.687Z"
        approved_by: "USER"
        approved_digest: "sha256:bea31431fd97fc321432455b51f603de42ef9dc3c01db4618aff4535278447a0"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-09-07T03:53:19.011Z"
      digest: "sha256:bea31431fd97fc321432455b51f603de42ef9dc3c01db4618aff4535278447a0"
      proposal:
        assumptions:
          - "Ad-hoc signing is sufficient for executable integrity; notarization and Developer ID identity are outside this defect."
          - "The recovery retains v0.7.8, exact source SHA 81b3fe507426d82ea903d7a63fd6335b583d81b5 and immutable npm packages. Repaired archive signatures and matching distribution checksums will be published only after this task integration."
        planning_baseline:
          captured_at: "2026-09-07T03:51:25.591Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:c3351dde06df76c267c8a6fdbdb9677acdf641326ece5960bda4d60a649760df"
          dirty_paths:
            - ".agentplane/tasks/202609070351-6B37B9/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "68b7b240362fe005e4ea5c63ee214c37fc545212"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609070351-6B37B9"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:project agentplane packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts"
              id: "release-assets-contract"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run workflows:lint"
              id: "workflow-lint"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
          criteria:
            -
              check_ids:
                - "release-assets-contract"
              description: "Real Darwin binaries receive ad-hoc signing and strict signature verification on macOS before archives and hashes are produced. Signing failures stop generation. Synthetic check mode remains portable and does not claim signed executables."
              id: "signed-darwin"
              required: true
            -
              check_ids:
                - "release-assets-contract"
                - "workflow-lint"
              description: "A macOS job builds signed release assets from the qualified historical source SHA with current approved packaging tools. The Ubuntu publish job consumes the exact run artifact, validates its SHA, version, tag and checksums, and retains Linux executable smoke, npm skip guards, tag identity and canonical publish-result checks."
              id: "qualified-artifact-handoff"
              required: true
          evidence_fingerprint: "sha256:52e2b1f3040ae41a98f5fa642e94df3ca0e408e66837799d9aecc7d86bf4e631"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "release-assets-contract"
                  description: "Real Darwin binaries receive ad-hoc signing and strict signature verification on macOS before archives and hashes are produced. Signing failures stop generation. Synthetic check mode remains portable and does not claim signed executables."
                  id: "signed-darwin"
                  required: true
                -
                  check_ids:
                    - "release-assets-contract"
                    - "workflow-lint"
                  description: "A macOS job builds signed release assets from the qualified historical source SHA with current approved packaging tools. The Ubuntu publish job consumes the exact run artifact, validates its SHA, version, tag and checksums, and retains Linux executable smoke, npm skip guards, tag identity and canonical publish-result checks."
                  id: "qualified-artifact-handoff"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 150000
                optional_sources:
                  - "scripts/smoke-bun-compiled-cli.mjs"
                  - "scripts/release/smoke-bun-compiled-cli.mjs"
                  - ".git/agentplane/external-agent/202609061750-Z0XXVD/publish-recovery-result/publish-result.json"
                required_sources:
                  - ".github/workflows/publish.yml"
                  - "scripts/generate/generate-bun-cli-assets.mjs"
                  - "scripts/generate/generate-release-distribution.mjs"
                  - "packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts"
                  - "packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts"
                  - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
                symbol_hints:
                  - "buildBinary"
                  - "archiveTarget"
                  - "generateBunAssets"
                  - "Generate release distribution assets"
                  - "Smoke Bun release assets"
              depends_on: []
              expected_outputs:
                - "Signed macOS asset packaging with qualified workflow artifact handoff and regression evidence"
              id: "sign-standalone-release-assets"
              objective: "Repair macOS standalone publication with the smallest coherent six-file change. Sign and verify both Darwin targets before archive hashing. Generate distribution assets in a macOS job and transfer the completed distribution artifact to the Ubuntu publishing job. Resolve the Bun generator relative to the executing packaging runtime so recovery can use repaired tooling without editing or replacing historical source files. Validate artifact identity and all declared hashes before consuming it. Preserve all source-readiness, npm, tag, package payload and release evidence guards. Extend the nearest tests to exercise successful signing, failure propagation, synthetic mode and cross-job artifact ownership. Do not publish, change versions, replace released assets, or update follow-up PR #5906 during this semantic episode."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: ".github/workflows/publish.yml"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/generate/generate-bun-cli-assets.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/generate/generate-release-distribution.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
              risk: "medium"
              scope_roots:
                - ".github/workflows/publish.yml"
                - "scripts/generate/generate-bun-cli-assets.mjs"
                - "scripts/generate/generate-release-distribution.mjs"
                - "packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts"
                - "packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts"
                - "packages/agentplane/src/commands/release/publish-workflow-contract.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts"
                    id: "release-assets-contract"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run workflows:lint"
                    id: "workflow-lint"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "release-assets-contract"
                    description: "Real Darwin binaries receive ad-hoc signing and strict signature verification on macOS before archives and hashes are produced. Signing failures stop generation. Synthetic check mode remains portable and does not claim signed executables."
                    id: "signed-darwin"
                    required: true
                  -
                    check_ids:
                      - "release-assets-contract"
                      - "workflow-lint"
                    description: "A macOS job builds signed release assets from the qualified historical source SHA with current approved packaging tools. The Ubuntu publish job consumes the exact run artifact, validates its SHA, version, tag and checksums, and retains Linux executable smoke, npm skip guards, tag identity and canonical publish-result checks."
                    id: "qualified-artifact-handoff"
                    required: true
                evidence_fingerprint: "sha256:52e2b1f3040ae41a98f5fa642e94df3ca0e408e66837799d9aecc7d86bf4e631"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609070351-6B37B9"
    event_cursor: 5
    final_validation: null
    id: "202609070351-6B37B9"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run test:project agentplane packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run workflows:lint"
          id: "legacy-2"
          required: true
      captured_at: "2026-09-07T03:51:12.263Z"
      constraints: []
      request: |-
        Sign macOS standalone release binaries before packaging

        Post-publication verification of v0.7.8 found that the downloaded darwin-arm64 executable is terminated with SIGKILL and codesign reports an invalid signature. Ad-hoc signing the identical extracted binary makes it run as 0.7.8. Repair release asset generation so both Darwin binaries are signed and verified on macOS before archive checksums and distribution manifests are finalized. Generate and smoke release distribution assets in a macOS job, then consume those exact artifacts in the Ubuntu publisher while preserving exact historical release-ready SHA validation, npm skip guards, tag identity and canonical publication evidence. Keep source payload 81b3fe507426d82ea903d7a63fd6335b583d81b5 and npm versions unchanged for recovery. Add focused signing and workflow contract regressions; integrate this repair separately before regenerating published assets and refreshing existing release follow-up PR #5906.
      task_id: "202609070351-6B37B9"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 7
    schema_version: 1
    updated_at: "2026-09-07T04:03:33.435Z"
    work_items:
      sign-standalone-release-assets:
        attempt: 0
        claim_id: null
        id: "sign-standalone-release-assets"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events: []
    leases: []
    mutation_receipts:
      compatibility:sha256:314087f672ea3aa5d6dccd06c23706fe199284af05033327768315ade0d94f0b:
        aggregate_digest: "sha256:fdef35a38d6723fe6a19173f0c7d2229f714931a4a2be51481e2373b5c0becac"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T03:53:39.627Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_29ed86a3b069b851a1d90dd5"
          mutation_id: "compatibility:sha256:314087f672ea3aa5d6dccd06c23706fe199284af05033327768315ade0d94f0b"
          plan_digest: "sha256:bea31431fd97fc321432455b51f603de42ef9dc3c01db4618aff4535278447a0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070351-6B37B9"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:314087f672ea3aa5d6dccd06c23706fe199284af05033327768315ade0d94f0b"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609070351-6B37B9"
      compatibility:sha256:3b955db3f557c3e0778c399707ec98a4e1d7d1ef30dbb86b480883f627244b0d:
        aggregate_digest: "sha256:39153be52155cd86ff8d1e3ae4003fa1d9b42a850d73c7bfa989df3fc0c61e92"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T03:54:12.257Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_cf4048e85d8c4bb03536cb00"
          mutation_id: "compatibility:sha256:3b955db3f557c3e0778c399707ec98a4e1d7d1ef30dbb86b480883f627244b0d"
          plan_digest: "sha256:bea31431fd97fc321432455b51f603de42ef9dc3c01db4618aff4535278447a0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070351-6B37B9"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3b955db3f557c3e0778c399707ec98a4e1d7d1ef30dbb86b480883f627244b0d"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609070351-6B37B9"
      compatibility:sha256:4ad581bad36e543b6a198e453b10f112cfb63fc0ecabda82e8a378667ab816ec:
        aggregate_digest: "sha256:908ab156c21318b7dd9bd7351af65aee191c13654d09f7f639e568ec10eb2d74"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T03:53:39.628Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_c22f99ff5f5758c0ed8f9eed"
          mutation_id: "compatibility:sha256:4ad581bad36e543b6a198e453b10f112cfb63fc0ecabda82e8a378667ab816ec"
          plan_digest: "sha256:bea31431fd97fc321432455b51f603de42ef9dc3c01db4618aff4535278447a0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070351-6B37B9"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4ad581bad36e543b6a198e453b10f112cfb63fc0ecabda82e8a378667ab816ec"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609070351-6B37B9"
      compatibility:sha256:a9f752d5a1d380a475e9f77ae0d85ebb59929f4c5a6cfb0924d5129746890e3e:
        aggregate_digest: "sha256:45dbcc6ed7940766d795cf5ec71c81f451eef9877543d139a3ec69a4349d7ba8"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T04:03:33.435Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_d5a467272d7af244526fb446"
          mutation_id: "compatibility:sha256:a9f752d5a1d380a475e9f77ae0d85ebb59929f4c5a6cfb0924d5129746890e3e"
          plan_digest: "sha256:bea31431fd97fc321432455b51f603de42ef9dc3c01db4618aff4535278447a0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070351-6B37B9"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a9f752d5a1d380a475e9f77ae0d85ebb59929f4c5a6cfb0924d5129746890e3e"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609070351-6B37B9"
      compatibility:sha256:ed658ff86fcfde89ce226b85cb9b5a8c09f28c5edaf42c008ddaf6fe588557c8:
        aggregate_digest: "sha256:a8b4446b76d2541c8f225681dda8737a2d28dc95c1a068aea83f650403dde495"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T04:03:33.435Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4b144f46c4bd2b6fd56880a5"
          mutation_id: "compatibility:sha256:ed658ff86fcfde89ce226b85cb9b5a8c09f28c5edaf42c008ddaf6fe588557c8"
          plan_digest: "sha256:bea31431fd97fc321432455b51f603de42ef9dc3c01db4618aff4535278447a0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609070351-6B37B9"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ed658ff86fcfde89ce226b85cb9b5a8c09f28c5edaf42c008ddaf6fe588557c8"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609070351-6B37B9"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "7cfd6b281fc79d748e5dc871e7b4d2bdbdd4bcaf"
  task_execution_context:
    base_ref: "main"
    base_sha: "68b7b240362fe005e4ea5c63ee214c37fc545212"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "68b7b240362fe005e4ea5c63ee214c37fc545212"
    version: 1
id_source: "generated"
---
## Summary

Sign macOS standalone release binaries before packaging

Post-publication verification of v0.7.8 found that the downloaded darwin-arm64 executable is terminated with SIGKILL and codesign reports an invalid signature. Ad-hoc signing the identical extracted binary makes it run as 0.7.8. Repair release asset generation so both Darwin binaries are signed and verified on macOS before archive checksums and distribution manifests are finalized. Generate and smoke release distribution assets in a macOS job, then consume those exact artifacts in the Ubuntu publisher while preserving exact historical release-ready SHA validation, npm skip guards, tag identity and canonical publication evidence. Keep source payload 81b3fe507426d82ea903d7a63fd6335b583d81b5 and npm versions unchanged for recovery. Add focused signing and workflow contract regressions; integrate this repair separately before regenerating published assets and refreshing existing release follow-up PR #5906.

## Scope

- In scope: Post-publication verification of v0.7.8 found that the downloaded darwin-arm64 executable is terminated with SIGKILL and codesign reports an invalid signature. Ad-hoc signing the identical extracted binary makes it run as 0.7.8. Repair release asset generation so both Darwin binaries are signed and verified on macOS before archive checksums and distribution manifests are finalized. Generate and smoke release distribution assets in a macOS job, then consume those exact artifacts in the Ubuntu publisher while preserving exact historical release-ready SHA validation, npm skip guards, tag identity and canonical publication evidence. Keep source payload 81b3fe507426d82ea903d7a63fd6335b583d81b5 and npm versions unchanged for recovery. Add focused signing and workflow contract regressions; integrate this repair separately before regenerating published assets and refreshing existing release follow-up PR #5906.
- Out of scope: unrelated refactors not required for "Sign macOS standalone release binaries before packaging".

## Plan

Propose one bounded packaging and workflow repair: sign Darwin executables on macOS before hashing and publish the verified distribution artifact from Ubuntu.

## Verify Steps

1. Run `bun run test:project agentplane packages/agentplane/src/commands/release/generate-bun-cli-assets-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts`. Expected: signing order, failure propagation, portable synthetic checks and exact distribution artifact handoff regressions pass.
2. Run `bun run workflows:lint`. Expected: workflow syntax and repository workflow contracts pass.
3. Review the final diff. Expected: only the six approved source, workflow and test paths change. The historical release payload, npm versions, tag identity and publication guards remain unchanged.
4. After integration, recover the same release SHA through the hosted publisher and independently verify both Darwin signatures, native macOS execution and all regenerated checksums before refreshing existing PR #5906. Actual publication remains outside this semantic repair.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
