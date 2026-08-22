---
id: "202608222024-HB7R71"
title: "Publish AgentPlane v0.7.8 from exact release-ready main d93e42cc"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 17
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "credentials"
  - "external_system"
  - "merge"
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "bun run release:prepublish"
plan_approval:
  state: "approved"
  updated_at: "2026-08-22T20:29:11.858Z"
  updated_by: "USER"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-08-22T20:44:36.809Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Declared check failed: bun run release:prepublish"
  attempts: 2
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_credentials"
    - "effect_external_write"
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_irreversible"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "documentation"
      - "release_metadata"
      - "repository_write"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "source_code"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "security_boundary"
    writable_roots:
      - ".agentplane/WORKFLOW.md"
      - "bun.lock"
      - "docs/assets/header.svg"
      - "docs/assets/readme-headers"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.8.md"
      - "package.json"
      - "packages/agentplane/package.json"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/recipes/src/index.ts"
      - "packages/spec/examples/acr.json"
      - "packages/testkit/package.json"
      - "website/static/img/social/docs/releases/v0.7.8.png"
      - "website/static/img/social/manifest.json"
  declaration:
    external_effects:
      - "credentials"
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Protected main and hosted publication require the branch_pr route and provider readback."
      - "Stable v0.7.8 package publication, Git tag, and GitHub Release are irreversible and must bind to one exact merged SHA."
      - "The candidate changes only managed version surfaces, release notes, and generated release documentation assets."
    repository_effects:
      - "documentation"
      - "release_metadata"
      - "repository_write"
    requirements_uncertainty: "bounded"
    reversibility: "irreversible"
    schema_version: 2
    scope_roots:
      - ".agentplane/WORKFLOW.md"
      - "bun.lock"
      - "docs/assets/header.svg"
      - "docs/assets/readme-headers"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.8.md"
      - "package.json"
      - "packages/agentplane/package.json"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
      - "packages/recipes/src/index.ts"
      - "packages/spec/examples/acr.json"
      - "packages/testkit/package.json"
      - "website/static/img/social/docs/releases/v0.7.8.png"
      - "website/static/img/social/manifest.json"
  observed:
    authority_violations:
      - "verification:recorded-check-1:fail"
    changed_components:
      - "docs"
      - "website"
    changed_paths:
      - "docs/assets/header.svg"
      - "docs/assets/readme-headers/adr.svg"
      - "docs/assets/readme-headers/agentplane-cli.svg"
      - "docs/assets/readme-headers/agentplane.svg"
      - "docs/assets/readme-headers/core.svg"
      - "docs/assets/readme-headers/docs.svg"
      - "docs/assets/readme-headers/humanizer.svg"
      - "docs/assets/readme-headers/recipes.svg"
      - "docs/assets/readme-headers/releases.svg"
      - "docs/assets/readme-headers/schemas.svg"
      - "docs/assets/readme-headers/scripts.svg"
      - "docs/assets/readme-headers/skills.svg"
      - "docs/assets/readme-headers/spec.svg"
      - "docs/assets/readme-headers/testkit.svg"
      - "docs/releases/v0.7.8.md"
      - "website/static/img/social/docs/releases/v0.7.8.png"
      - "website/static/img/social/manifest.json"
    external_effects: []
    repository_effects:
      - "documentation"
      - "release_metadata"
      - "repository_write"
    verification_results:
      -
        id: "recorded-check-1"
        result: "fail"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_credentials"
    - "effect_external_write"
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_irreversible"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "credentials"
      - "external_write"
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - ".agentplane/WORKFLOW.md"
          - "bun.lock"
          - "docs/assets/header.svg"
          - "docs/assets/readme-headers"
          - "docs/reference/generated-reference.mdx"
          - "docs/releases/v0.7.8.md"
          - "package.json"
          - "packages/agentplane/package.json"
          - "packages/core/package.json"
          - "packages/recipes/package.json"
          - "packages/recipes/src/index.ts"
          - "packages/spec/examples/acr.json"
          - "packages/testkit/package.json"
          - "website/static/img/social/docs/releases/v0.7.8.png"
          - "website/static/img/social/manifest.json"
        evidence_requirements:
          - "external_effect:credentials"
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "task_outcome"
        external_effects:
          - "credentials"
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "documentation"
          - "release_metadata"
          - "repository_write"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "irreversible"
      digest: "sha256:cc9b139c5bd5135b7d41173bcba690bb597c7b7d6759810f17d8b73b3047f50c"
      escalation_reasons:
        - "central_component:bun.lock"
        - "central_component:package.json"
        - "central_component:packages/core/package.json"
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
        - "reversibility_irreversible"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "docs"
          - "website"
        changed_files:
          - "docs/assets/header.svg"
          - "docs/assets/readme-headers/adr.svg"
          - "docs/assets/readme-headers/agentplane-cli.svg"
          - "docs/assets/readme-headers/agentplane.svg"
          - "docs/assets/readme-headers/core.svg"
          - "docs/assets/readme-headers/docs.svg"
          - "docs/assets/readme-headers/humanizer.svg"
          - "docs/assets/readme-headers/recipes.svg"
          - "docs/assets/readme-headers/releases.svg"
          - "docs/assets/readme-headers/schemas.svg"
          - "docs/assets/readme-headers/scripts.svg"
          - "docs/assets/readme-headers/skills.svg"
          - "docs/assets/readme-headers/spec.svg"
          - "docs/assets/readme-headers/testkit.svg"
          - "docs/releases/v0.7.8.md"
          - "website/static/img/social/docs/releases/v0.7.8.png"
          - "website/static/img/social/manifest.json"
        external_effects: []
        repository_effects:
          - "documentation"
          - "release_metadata"
          - "repository_write"
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: true
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "docs_contract"
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
      - "external_effect:credentials"
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:documentation"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "task_outcome"
      - "verification_recovery:recorded-check-1"
commit:
  hash: "d31e5d699c351c428b60d25f79eb96624b1542e6"
  message: "🚧 HB7R71 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: e3d5a67f9efb. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "External EXECUTOR returned failed: Generated README headers for the current prerelease version and reran the full prepublish gate. The gate now reaches release-ci-base and exposes a reproducible stale-test-fixture regression in the blueprint CLI suite."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: db52e0329e9e. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: d31e5d699c35. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-22T20:29:25.652Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-22T20:34:26.717Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: e3d5a67f9efb. CLI accepted one state-bound external-agent semantic result."
    commit: "e3d5a67f9efbbaa6449ae56811adf6bda475f8a9"
  -
    type: "verify"
    at: "2026-08-22T20:34:27.148Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run release:prepublish"
  -
    type: "status"
    at: "2026-08-22T20:34:31.910Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "comment"
    at: "2026-08-22T20:43:31.833Z"
    author: "SUPERVISOR"
    body: "External EXECUTOR returned failed: Generated README headers for the current prerelease version and reran the full prepublish gate. The gate now reaches release-ci-base and exposes a reproducible stale-test-fixture regression in the blueprint CLI suite."
  -
    type: "status"
    at: "2026-08-22T20:44:15.237Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: db52e0329e9e. CLI accepted one state-bound external-agent semantic result."
    commit: "db52e0329e9e4ff00f6e8bfbd96af638d1e76650"
  -
    type: "verify"
    at: "2026-08-22T20:44:36.809Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run release:prepublish"
  -
    type: "status"
    at: "2026-08-22T20:44:43.613Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-22T20:47:01.746Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: d31e5d699c35. CLI accepted one state-bound external-agent semantic result."
    commit: "d31e5d699c351c428b60d25f79eb96624b1542e6"
doc_version: 3
doc_updated_at: "2026-08-22T20:47:01.746Z"
doc_updated_by: "SUPERVISOR"
description: "Prepare, verify, merge, publish, and post-publish verify stable v0.7.8 from exact main d93e42ccaedd59e77fc17c495a01dc7cde049d0f after the mandatory incident gate closeout. Release-only scope: already-merged task-centric Core plus exactly one context.maximum_assimilation compatibility E2E. Do not add Knowledge Assimilation subsystem work, redesign context, or alter existing context contracts, prompts, extraction schemas, artifacts, provenance, or verification gates. Use only repository-owned candidate and hosted publish workflows; bind PR, Core CI release-ready artifact, publish-result, tag, GitHub Release, npm packages, and installed CLI readback to exact SHAs. Complete the repository-owned post-publish evidence follow-up and 0.7.9-beta.1 opening before capturing the final RepositorySnapshot."
sections:
  Summary: |-
    Publish AgentPlane v0.7.8 from exact release-ready main d93e42cc

    Prepare, verify, merge, publish, and post-publish verify stable v0.7.8 from exact main d93e42ccaedd59e77fc17c495a01dc7cde049d0f after the mandatory incident gate closeout. Release-only scope: already-merged task-centric Core plus exactly one context.maximum_assimilation compatibility E2E. Do not add Knowledge Assimilation subsystem work, redesign context, or alter existing context contracts, prompts, extraction schemas, artifacts, provenance, or verification gates. Use only repository-owned candidate and hosted publish workflows; bind PR, Core CI release-ready artifact, publish-result, tag, GitHub Release, npm packages, and installed CLI readback to exact SHAs. Complete the repository-owned post-publish evidence follow-up and 0.7.9-beta.1 opening before capturing the final RepositorySnapshot.
  Scope: |-
    - In scope: Prepare, verify, merge, publish, and post-publish verify stable v0.7.8 from exact main d93e42ccaedd59e77fc17c495a01dc7cde049d0f after the mandatory incident gate closeout. Release-only scope: already-merged task-centric Core plus exactly one context.maximum_assimilation compatibility E2E. Do not add Knowledge Assimilation subsystem work, redesign context, or alter existing context contracts, prompts, extraction schemas, artifacts, provenance, or verification gates. Use only repository-owned candidate and hosted publish workflows; bind PR, Core CI release-ready artifact, publish-result, tag, GitHub Release, npm packages, and installed CLI readback to exact SHAs. Complete the repository-owned post-publish evidence follow-up and 0.7.9-beta.1 opening before capturing the final RepositorySnapshot.
    - Out of scope: unrelated refactors not required for "Publish AgentPlane v0.7.8 from exact release-ready main d93e42cc".
  Plan: "Prepare and qualify one stable v0.7.8 release candidate from exact release-ready main d93e42cc, then require an exact-SHA hosted integration, publication, independent readback, and post-publish development-line closeout."
  Verify Steps: |-
    PLANNER fallback scaffold for "Publish AgentPlane v0.7.8 from exact release-ready main d93e42cc". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Publish AgentPlane v0.7.8 from exact release-ready main d93e42cc". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-22T20:34:27.148Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run release:prepublish
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:fcd1755205e6e62787ad1ef5191cb47a6299b20181792de6c6e911e39956a171, input_digest=sha256:9a8c161ae7121196ecc88a229ee16f02078ed04a8e61ee52df9a0157e7452945

    Details:

    Command: bun run release:prepublish
    Result: fail
    Evidence: .agentplane/tasks/202608222024-HB7R71/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608222024-HB7R71 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608222024-HB7R71-publish-agentplane-v0-7-8-from-exact-release-rea/.agentplane/tasks/202608222024-HB7R71/blueprint/resolved-snapshot.json
    - old_digest: 7c511ba53f16c946dc07d041c3e803e16d087380acfcff3115443eea0c6b99e8
    - current_digest: 7c511ba53f16c946dc07d041c3e803e16d087380acfcff3115443eea0c6b99e8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608222024-HB7R71

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

    ### 2026-08-22T20:44:36.809Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run release:prepublish
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:fcd1755205e6e62787ad1ef5191cb47a6299b20181792de6c6e911e39956a171, input_digest=sha256:00886876c21e7a306342fa91076a2f4e40616911f76daee1758095e066f19686

    Details:

    Command: bun run release:prepublish
    Result: fail
    Evidence: .agentplane/tasks/202608222024-HB7R71/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608222024-HB7R71 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608222024-HB7R71-publish-agentplane-v0-7-8-from-exact-release-rea/.agentplane/tasks/202608222024-HB7R71/blueprint/resolved-snapshot.json
    - old_digest: 7c511ba53f16c946dc07d041c3e803e16d087380acfcff3115443eea0c6b99e8
    - current_digest: 7c511ba53f16c946dc07d041c3e803e16d087380acfcff3115443eea0c6b99e8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608222024-HB7R71

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
  agentplane.execution_grant:
    actor: "USER"
    approval_evidence_digest: null
    approval_kind: "manual_operator"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:92aaa2cf63af45c27a36f2f6c82eead85eab5b28d972a480640a6f0aca50254b"
    digest: "sha256:323880bb07f2f99af078c04aad8a7d0f9fea18a713071d9a8c04959c39b772e0"
    grant_id: "547067dd-0a3d-4644-8c09-6652ee7e5f86"
    issued_at: "2026-08-22T20:29:11.858Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:c5781984c11f8f31b100638b536a3548d1f221e40dd1957add1bdf4f54f60cf4"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:fdb75a8aa89d70ef7caad69d5ee75144aae4c4bf7659261183bc0d679f00cab4"
    status: "active"
    task_id: "202608222024-HB7R71"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-22T20:29:11.858Z"
        approved_by: "USER"
        approved_digest: "sha256:6b8e75e5858c537d7b0ad0d227361b385f5ddc76fbf7dbf2ad126d74cfd3d00d"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-22T20:28:57.159Z"
      digest: "sha256:6b8e75e5858c537d7b0ad0d227361b385f5ddc76fbf7dbf2ad126d74cfd3d00d"
      proposal:
        assumptions:
          - "The release target remains stable 0.7.8; any version or tag change requires a new approved plan revision."
          - "The repository-owned hosted workflow is the only publication authority and will create the tag, GitHub Release, npm provenance, canonical publish-result, and post-publish evidence follow-up."
          - "After publication, the evidence follow-up must merge 0.7.9-beta.1 before the final RepositorySnapshot is used for the Knowledge Assimilation Task."
        planning_baseline:
          captured_at: "2026-08-22T20:25:00.405Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:4e132bdc5ba1d081c3e73a7f3c3bef6eaf26b850c0d04354fdcc85474d65cf75"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608222024-HB7R71/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608222024-HB7R71"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run release:prepublish"
              id: "check-release-prepublish"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
            -
              capability: "task.verify"
              id: "check-hosted-integration"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "check-hosted-publish"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "check-postpublish"
              kind: "provider"
              required: true
          criteria:
            -
              check_ids:
                - "check-release-prepublish"
              description: "The exact stable candidate passes the complete release prepublish gate without expanding the v0.7.8 scope."
              id: "candidate-qualified"
              required: true
            -
              check_ids:
                - "check-hosted-integration"
                - "check-hosted-publish"
                - "check-postpublish"
              description: "Hosted PR merge, release-ready artifact, publish-result, v0.7.8 tag and GitHub Release, all three npm packages, installed CLI smoke, and 0.7.9-beta.1 follow-up form one exact-SHA evidence chain."
              id: "publication-chain-complete"
              required: true
          evidence_fingerprint: "sha256:90581ceaf6ee5be56e13891199645cddf5459f6de43022c85271f2e57bb16bfd"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-release-fast"
                  description: "Release notes cover every material change in the regenerated v0.7.7..d93e42cc plan, use outcome-focused English, and state that Knowledge Assimilation remains follow-up scope."
                  id: "notes-cover-release-range"
                  required: true
                -
                  check_ids:
                    - "check-release-fast"
                  description: "The v0.7.8 social card, social manifest, and README headers are generated by repository tools and pass their release checks."
                  id: "artwork-generated"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 262144
                optional_sources:
                  - ".agentplane/.release/plan"
                required_sources:
                  - "docs/releases/TEMPLATE.md"
                  - "docs/releases/v0.7.7.md"
                  - "docs/developer/release-and-publishing.mdx"
                symbol_hints:
                  - "Release Notes"
                  - "context.maximum_assimilation"
                  - "TaskPlanRevision"
              depends_on: []
              expected_outputs:
                - "v0.7.8-release-notes-and-artwork"
              id: "author-v0-7-8-release-artifacts"
              objective: "Create complete English v0.7.8 release notes from the v0.7.7..d93e42cc release range and generate the matching social and README artwork, explicitly covering task-centric Core, the maximum-assimilation compatibility gate, and release-blocking regressions without adding implementation scope."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/releases/v0.7.8.md"
                -
                  kind: "path"
                  mode: "write"
                  resource: "website/static/img/social/docs/releases/v0.7.8.png"
              risk: "medium"
              scope_roots:
                - "docs/assets/header.svg"
                - "docs/assets/readme-headers"
                - "docs/releases/v0.7.8.md"
                - "website/static/img/social/docs/releases/v0.7.8.png"
                - "website/static/img/social/manifest.json"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:prepublish:fast"
                    id: "check-release-fast"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                criteria:
                  -
                    check_ids:
                      - "check-release-fast"
                    description: "Release notes are complete for the exact final baseline and retain the v0.7.8 scope boundary."
                    id: "notes-cover-release-range"
                    required: true
                  -
                    check_ids:
                      - "check-release-fast"
                    description: "Generated release artwork and manifests are current."
                    id: "artwork-generated"
                    required: true
                evidence_fingerprint: "sha256:79907d57a7c7b02318fde72600865221a492b0725933655668e218caaf20b3ef"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-release-parity"
                    - "check-release-prepublish"
                  description: "All managed release surfaces and internal dependency pins equal stable 0.7.8 and the regenerated release plan binds to d93e42ccaedd59e77fc17c495a01dc7cde049d0f."
                  id: "stable-version-parity"
                  required: true
                -
                  check_ids:
                    - "check-diff"
                    - "check-release-prepublish"
                  description: "The stable candidate contains only approved release metadata, notes, and generated documentation assets; no task-centric or context implementation path changes."
                  id: "candidate-scope-bounded"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 262144
                optional_sources:
                  - ".github/workflows/publish.yml"
                required_sources:
                  - "scripts/release/version-surfaces.json"
                  - "scripts/release/version-bump.mjs"
                  - "scripts/release/candidate-prepare.mjs"
                  - "docs/developer/release-and-publishing.mdx"
                symbol_hints:
                  - "release:version:bump"
                  - "release:prepublish"
                  - "release-ready"
              depends_on:
                - "author-v0-7-8-release-artifacts"
              expected_outputs:
                - "qualified-stable-v0.7.8-candidate"
              id: "freeze-and-qualify-v0-7-8"
              objective: "Regenerate the release plan from exact d93e42cc, freeze every managed semantic version surface and exact internal dependency pin at stable 0.7.8, refresh generated references and headers, prove npm version availability, and pass the complete release prepublish gate."
              optional: false
              priority: 2
              required_inputs:
                - "v0.7.8-release-notes-and-artwork"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "release-candidate-v0.7.8"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/package.json"
              risk: "high"
              scope_roots:
                - ".agentplane/WORKFLOW.md"
                - "bun.lock"
                - "docs/assets/header.svg"
                - "docs/assets/readme-headers"
                - "docs/reference/generated-reference.mdx"
                - "docs/releases/v0.7.8.md"
                - "package.json"
                - "packages/agentplane/package.json"
                - "packages/core/package.json"
                - "packages/recipes/package.json"
                - "packages/recipes/src/index.ts"
                - "packages/spec/examples/acr.json"
                - "packages/testkit/package.json"
                - "website/static/img/social/docs/releases/v0.7.8.png"
                - "website/static/img/social/manifest.json"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:parity"
                    id: "check-release-parity"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "check-diff"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run release:prepublish"
                    id: "check-release-prepublish"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "check-release-parity"
                      - "check-release-prepublish"
                    description: "Stable 0.7.8 parity and exact-baseline release plan are valid."
                    id: "stable-version-parity"
                    required: true
                  -
                    check_ids:
                      - "check-diff"
                      - "check-release-prepublish"
                    description: "The release diff stays within release metadata and generated documentation scope."
                    id: "candidate-scope-bounded"
                    required: true
                evidence_fingerprint: "sha256:1d6ccdc16f020e86856955fb06c9b111a6bc952f89ebc3c721d75589af17981d"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608222024-HB7R71"
    event_cursor: 0
    final_validation: null
    id: "202608222024-HB7R71"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run release:prepublish"
          id: "legacy-1"
          required: true
      captured_at: "2026-08-22T20:24:49.733Z"
      constraints: []
      request: |-
        Publish AgentPlane v0.7.8 from exact release-ready main d93e42cc

        Prepare, verify, merge, publish, and post-publish verify stable v0.7.8 from exact main d93e42ccaedd59e77fc17c495a01dc7cde049d0f after the mandatory incident gate closeout. Release-only scope: already-merged task-centric Core plus exactly one context.maximum_assimilation compatibility E2E. Do not add Knowledge Assimilation subsystem work, redesign context, or alter existing context contracts, prompts, extraction schemas, artifacts, provenance, or verification gates. Use only repository-owned candidate and hosted publish workflows; bind PR, Core CI release-ready artifact, publish-result, tag, GitHub Release, npm packages, and installed CLI readback to exact SHAs. Complete the repository-owned post-publish evidence follow-up and 0.7.9-beta.1 opening before capturing the final RepositorySnapshot.
      task_id: "202608222024-HB7R71"
    lifecycle: "PLANNING"
    plan_amendments: []
    plan_history: []
    revision: 14
    schema_version: 1
    updated_at: "2026-08-22T20:44:40.545Z"
    work_items:
      author-v0-7-8-release-artifacts:
        attempt: 1
        claim_id: null
        id: "author-v0-7-8-release-artifacts"
        last_failure:
          cause_refs:
            - "notes-cover-release-range"
            - "artwork-generated"
          code: "validation_failed"
          kind: "validation"
          message: "The uncommitted README header changes are intentional generated release artifacts for the current 0.7.8-beta.1 candidate and should be recorded by AgentPlane before the scoped test-fixture rework proceeds."
          retryable: true
        output_manifests:
          -
            digest: "sha256:885cb4c3ef6ae5099543f3688a979f9a1b80a4abbf82b01ad6c115cd2db39163"
            id: "v0.7.8-release-notes-and-artwork"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608222024-HB7R71"
              work_item_id: "author-v0-7-8-release-artifacts"
            provenance:
              - "sha256:a45f8d74dae44f1ff428ce030c230e1c3d2d82fe130c7d3a3c79d66314d7f54d"
              - ".agentplane/tasks/202608222024-HB7R71/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:7634acd76470dd0d02ae53dfbdaeccac3733c2c8b8fe53a9fe7839844b4da2c5"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "REWORK_READY"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608222024-HB7R71/supervision/declared-checks.json"
              check_id: "check-release-fast"
              command_identity: "bun run release:prepublish:fast"
              detail: "Declared validation command bun run release:prepublish:fast was not observed by AgentPlane."
              exit_code: null
              observed_at: "2026-08-22T20:44:40.520Z"
              repository_snapshot_digest: "sha256:7634acd76470dd0d02ae53dfbdaeccac3733c2c8b8fe53a9fe7839844b4da2c5"
              status: "unsupported"
          schema_version: 1
          stale_evidence: []
          status: "blocked"
          unsatisfied_criteria:
            - "notes-cover-release-range"
            - "artwork-generated"
      freeze-and-qualify-v0-7-8:
        attempt: 0
        claim_id: null
        id: "freeze-and-qualify-v0-7-8"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608222024-HB7R71-executor-eafa5aed31260d093f884084:
        aggregate_digest: "sha256:fc16281c7169064049b31f9e7b4c5a61039e1b6749076b96fb8322ad6685b8f1"
        event:
          actor_id: "agentplane"
          at: "2026-08-22T20:44:40.545Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_2cccebe5362cf0dabc413dca"
          mutation_id: "external-result:work-order-202608222024-HB7R71-executor-eafa5aed31260d093f884084"
          plan_digest: "sha256:6b8e75e5858c537d7b0ad0d227361b385f5ddc76fbf7dbf2ad126d74cfd3d00d"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608222024-HB7R71"
          task_revision: 13
          to: "REWORK_READY"
          work_item_id: "author-v0-7-8-release-artifacts"
        mutation_id: "external-result:work-order-202608222024-HB7R71-executor-eafa5aed31260d093f884084"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202608222024-HB7R71"
      plan-refinement:work-order-202608222024-HB7R71-executor-7dfaa484db20aad305a6a83e:
        aggregate_digest: "sha256:2bc9aba703a2844971392bf716061cc33203db59b0cabdf7dc71370d7f4f07cb"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-22T20:34:30.081Z"
          cause_refs:
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_5d1eb9ce06545ee57b6fc0df"
          mutation_id: "plan-refinement:work-order-202608222024-HB7R71-executor-7dfaa484db20aad305a6a83e"
          plan_digest: "sha256:6b8e75e5858c537d7b0ad0d227361b385f5ddc76fbf7dbf2ad126d74cfd3d00d"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608222024-HB7R71"
          task_revision: 7
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608222024-HB7R71-executor-7dfaa484db20aad305a6a83e"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608222024-HB7R71"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "d31e5d699c351c428b60d25f79eb96624b1542e6"
  task_execution_context:
    base_ref: "main"
    base_sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
    version: 1
id_source: "generated"
---
## Summary

Publish AgentPlane v0.7.8 from exact release-ready main d93e42cc

Prepare, verify, merge, publish, and post-publish verify stable v0.7.8 from exact main d93e42ccaedd59e77fc17c495a01dc7cde049d0f after the mandatory incident gate closeout. Release-only scope: already-merged task-centric Core plus exactly one context.maximum_assimilation compatibility E2E. Do not add Knowledge Assimilation subsystem work, redesign context, or alter existing context contracts, prompts, extraction schemas, artifacts, provenance, or verification gates. Use only repository-owned candidate and hosted publish workflows; bind PR, Core CI release-ready artifact, publish-result, tag, GitHub Release, npm packages, and installed CLI readback to exact SHAs. Complete the repository-owned post-publish evidence follow-up and 0.7.9-beta.1 opening before capturing the final RepositorySnapshot.

## Scope

- In scope: Prepare, verify, merge, publish, and post-publish verify stable v0.7.8 from exact main d93e42ccaedd59e77fc17c495a01dc7cde049d0f after the mandatory incident gate closeout. Release-only scope: already-merged task-centric Core plus exactly one context.maximum_assimilation compatibility E2E. Do not add Knowledge Assimilation subsystem work, redesign context, or alter existing context contracts, prompts, extraction schemas, artifacts, provenance, or verification gates. Use only repository-owned candidate and hosted publish workflows; bind PR, Core CI release-ready artifact, publish-result, tag, GitHub Release, npm packages, and installed CLI readback to exact SHAs. Complete the repository-owned post-publish evidence follow-up and 0.7.9-beta.1 opening before capturing the final RepositorySnapshot.
- Out of scope: unrelated refactors not required for "Publish AgentPlane v0.7.8 from exact release-ready main d93e42cc".

## Plan

Prepare and qualify one stable v0.7.8 release candidate from exact release-ready main d93e42cc, then require an exact-SHA hosted integration, publication, independent readback, and post-publish development-line closeout.

## Verify Steps

PLANNER fallback scaffold for "Publish AgentPlane v0.7.8 from exact release-ready main d93e42cc". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Publish AgentPlane v0.7.8 from exact release-ready main d93e42cc". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-22T20:34:27.148Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run release:prepublish
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:fcd1755205e6e62787ad1ef5191cb47a6299b20181792de6c6e911e39956a171, input_digest=sha256:9a8c161ae7121196ecc88a229ee16f02078ed04a8e61ee52df9a0157e7452945

Details:

Command: bun run release:prepublish
Result: fail
Evidence: .agentplane/tasks/202608222024-HB7R71/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608222024-HB7R71 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608222024-HB7R71-publish-agentplane-v0-7-8-from-exact-release-rea/.agentplane/tasks/202608222024-HB7R71/blueprint/resolved-snapshot.json
- old_digest: 7c511ba53f16c946dc07d041c3e803e16d087380acfcff3115443eea0c6b99e8
- current_digest: 7c511ba53f16c946dc07d041c3e803e16d087380acfcff3115443eea0c6b99e8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608222024-HB7R71

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

### 2026-08-22T20:44:36.809Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run release:prepublish
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:fcd1755205e6e62787ad1ef5191cb47a6299b20181792de6c6e911e39956a171, input_digest=sha256:00886876c21e7a306342fa91076a2f4e40616911f76daee1758095e066f19686

Details:

Command: bun run release:prepublish
Result: fail
Evidence: .agentplane/tasks/202608222024-HB7R71/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608222024-HB7R71 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608222024-HB7R71-publish-agentplane-v0-7-8-from-exact-release-rea/.agentplane/tasks/202608222024-HB7R71/blueprint/resolved-snapshot.json
- old_digest: 7c511ba53f16c946dc07d041c3e803e16d087380acfcff3115443eea0c6b99e8
- current_digest: 7c511ba53f16c946dc07d041c3e803e16d087380acfcff3115443eea0c6b99e8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608222024-HB7R71

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
