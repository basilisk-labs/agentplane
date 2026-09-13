---
id: "202609121424-49XXT3"
title: "Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on:
  - "202609121424-4BC7B3"
tags:
  - "release-0.7.9"
  - "publish"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "network"
  - "credentials"
  - "publish"
  - "merge"
  - "external_system"
blueprint_request: "release.strict"
verify:
  - "bun run release:check"
  - "bun run release:prepublish"
plan_approval:
  state: "approved"
  updated_at: "2026-09-13T22:53:42.760Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:4a965f2340adea8c7ef8ed6627f467899167ffc6dfbfce57d01b87ce15f4e597"
verification:
  state: "pending"
  updated_at: "2026-09-13T23:17:41.802Z"
  updated_by: "USER"
  note: "Invalidated by USER-approved execution scope extension."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_credentials"
    - "effect_external_write"
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
      - ".agentplane/.release"
      - ".agentplane/WORKFLOW.md"
      - ".agentplane/config.json"
      - ".agentplane/tasks/202609121424-49XXT3"
      - "docs/assets"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.9-evidence"
      - "docs/releases/v0.7.9.md"
      - "package.json"
      - "packages/agentplane"
      - "packages/core"
      - "packages/recipes"
      - "packages/spec"
      - "packages/testkit"
      - "scripts/baselines"
      - "website/static/img/social"
      - "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
      - "website/static/img/social/docs/releases/v0.7.9.png"
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
      - "Publishing npm packages, GitHub assets, setup tags, Homebrew, and Scoop requires authenticated external writes and independent readback."
      - "Stable release preparation changes canonical versions, generated release surfaces, release notes, and task evidence."
      - "The stable candidate must pass hosted branch protection before its exact merged main SHA can be published."
      - "USER-approved blocked-result scope extension: roots=.agentplane/WORKFLOW.md,.agentplane/config.json; repository_effects=release_metadata,repository_write"
      - "USER-approved blocked-result scope extension: roots=website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png,website/static/img/social/docs/releases/v0.7.9.png,website/static/img/social/manifest.json; repository_effects=documentation,release_metadata,repository_write"
      - "USER-approved blocked-result scope extension: roots=website/static/img/social; repository_effects=documentation,release_metadata,repository_write"
    repository_effects:
      - "documentation"
      - "release_metadata"
      - "repository_write"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - ".agentplane/.release"
      - ".agentplane/WORKFLOW.md"
      - ".agentplane/config.json"
      - ".agentplane/tasks/202609121424-49XXT3"
      - "docs/assets"
      - "docs/reference/generated-reference.mdx"
      - "docs/releases/v0.7.9-evidence"
      - "docs/releases/v0.7.9.md"
      - "package.json"
      - "packages/agentplane"
      - "packages/core"
      - "packages/recipes"
      - "packages/spec"
      - "packages/testkit"
      - "scripts/baselines"
      - "website/static/img/social"
      - "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
      - "website/static/img/social/docs/releases/v0.7.9.png"
      - "website/static/img/social/manifest.json"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_credentials"
    - "effect_external_write"
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - ".agentplane/.release"
          - ".agentplane/WORKFLOW.md"
          - ".agentplane/config.json"
          - ".agentplane/tasks/202609121424-49XXT3"
          - "docs/assets"
          - "docs/reference/generated-reference.mdx"
          - "docs/releases/v0.7.9-evidence"
          - "docs/releases/v0.7.9.md"
          - "package.json"
          - "packages/agentplane"
          - "packages/core"
          - "packages/recipes"
          - "packages/spec"
          - "packages/testkit"
          - "scripts/baselines"
          - "website/static/img/social"
          - "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
          - "website/static/img/social/docs/releases/v0.7.9.png"
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
          reversibility: "recovery_required"
      digest: "sha256:53556ad4f579278bc020a86699ad1c647a7fb45a164b87b118e8dd982e5ed9b7"
      escalation_reasons:
        - "central_component:package.json"
        - "effect_release_metadata"
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical stable version bump requires two release metadata files outside the issued writable roots. Recommended action: Approve the exact scope extension, request a fresh packet, and rerun the canonical version bump without excluding release surfaces. Requested scope: roots=.agentplane/WORKFLOW.md,.agentplane/config.json; repository effects=release_metadata,repository_write; request digest=sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923. Agentplane receipt: external-agent-blocker/tr_c6fd4ad79889a8a1540b287109085a52/sha256:b8cffe516cf04d094fc3f81064acd6d65e5e21afcb7e8823df89b26d72b398d2/sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: .agentplane/WORKFLOW.md, .agentplane/config.json; repository effects: release_metadata, repository_write."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The release range must be frozen by the operator-owned release plan before stable version mutation. Recommended action: Return control to the operator, run `agentplane release plan --patch`, then request a fresh semantic packet for candidate preparation. Agentplane receipt: external-agent-blocker/tr_070ee5381abe878f776b35e133be89c7/sha256:6c3de6fc00f1da0c6ab6ab13c60ccd481eec169b064796457d692775f3879ea1."
  -
    author: "CODER"
    body: "Start: Resume stable 0.7.9 candidate preparation after the operator-owned release plan was generated at .agentplane/.release/plan/2026-09-13T23-07-41-521Z."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The complete release check requires generated social assets for the new release documentation. Recommended action: Approve the exact generated asset roots, run `bun run docs:social:generate`, and rerun the complete release check. Requested scope: roots=website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png,website/static/img/social/docs/releases/v0.7.9.png,website/static/img/social/manifest.json; repository effects=documentation,release_metadata,repository_write; request digest=sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5. Agentplane receipt: external-agent-blocker/tr_9031fb2bd52327684141227d8dfc6ff7/sha256:0236d1160fbd9234951721268e8e8a51ed494cd0fbcda7c470c81c502bef612e/sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png, website/static/img/social/docs/releases/v0.7.9.png, website/static/img/social/manifest.json; repository effects: documentation, release_metadata, repository_write."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical social-image generator updates the complete generated social asset tree, not only the two new 0.7.9 images. Recommended action: Approve the generated social root, request a fresh packet, recreate the stable candidate, run `bun run docs:social:generate`, and rerun the complete release checks. Requested scope: roots=website/static/img/social; repository effects=documentation,release_metadata,repository_write; request digest=sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256. Agentplane receipt: external-agent-blocker/tr_a9b5612b125816493e821ae0bf34f942/sha256:ee0d8bdcc65ad45e20165f8e9f479296831a581cae9de2f8c710b3dba9301971/sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: website/static/img/social; repository effects: documentation, release_metadata, repository_write."
events:
  -
    type: "status"
    at: "2026-09-13T22:57:11.849Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-13T23:03:44.698Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical stable version bump requires two release metadata files outside the issued writable roots. Recommended action: Approve the exact scope extension, request a fresh packet, and rerun the canonical version bump without excluding release surfaces. Requested scope: roots=.agentplane/WORKFLOW.md,.agentplane/config.json; repository effects=release_metadata,repository_write; request digest=sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923. Agentplane receipt: external-agent-blocker/tr_c6fd4ad79889a8a1540b287109085a52/sha256:b8cffe516cf04d094fc3f81064acd6d65e5e21afcb7e8823df89b26d72b398d2/sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923."
  -
    type: "status"
    at: "2026-09-13T23:07:23.950Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The release range must be frozen by the operator-owned release plan before stable version mutation. Recommended action: Return control to the operator, run `agentplane release plan --patch`, then request a fresh semantic packet for candidate preparation. Agentplane receipt: external-agent-blocker/tr_070ee5381abe878f776b35e133be89c7/sha256:6c3de6fc00f1da0c6ab6ab13c60ccd481eec169b064796457d692775f3879ea1."
  -
    type: "status"
    at: "2026-09-13T23:08:20.260Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: Resume stable 0.7.9 candidate preparation after the operator-owned release plan was generated at .agentplane/.release/plan/2026-09-13T23-07-41-521Z."
  -
    type: "status"
    at: "2026-09-13T23:13:10.761Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The complete release check requires generated social assets for the new release documentation. Recommended action: Approve the exact generated asset roots, run `bun run docs:social:generate`, and rerun the complete release check. Requested scope: roots=website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png,website/static/img/social/docs/releases/v0.7.9.png,website/static/img/social/manifest.json; repository effects=documentation,release_metadata,repository_write; request digest=sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5. Agentplane receipt: external-agent-blocker/tr_9031fb2bd52327684141227d8dfc6ff7/sha256:0236d1160fbd9234951721268e8e8a51ed494cd0fbcda7c470c81c502bef612e/sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5."
  -
    type: "status"
    at: "2026-09-13T23:17:35.778Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The canonical social-image generator updates the complete generated social asset tree, not only the two new 0.7.9 images. Recommended action: Approve the generated social root, request a fresh packet, recreate the stable candidate, run `bun run docs:social:generate`, and rerun the complete release checks. Requested scope: roots=website/static/img/social; repository effects=documentation,release_metadata,repository_write; request digest=sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256. Agentplane receipt: external-agent-blocker/tr_a9b5612b125816493e821ae0bf34f942/sha256:ee0d8bdcc65ad45e20165f8e9f479296831a581cae9de2f8c710b3dba9301971/sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256."
doc_version: 3
doc_updated_at: "2026-09-13T23:17:35.778Z"
doc_updated_by: "SUPERVISOR"
description: "Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9."
sections:
  Summary: |-
    Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA

    Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.
  Scope: |-
    - In scope: Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.
    - Out of scope: unrelated refactors not required for "Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA".
  Plan: "Plan the stable 0.7.9 candidate, qualify and integrate its exact SHA, publish it through the protected release workflow, and verify every public distribution surface before opening the next beta."
  Verify Steps: |-
    1. Run `bun run release:check`. Expected: version parity, generated release surfaces, package manifests, and release policy checks pass for 0.7.9.
    2. Run `bun run release:prepublish`. Expected: the complete prepublish gate passes for the exact release candidate without skipped mandatory checks.
    3. Review `git diff --check`, the exact task diff, and `git status --short --untracked-files=all`. Expected: only approved release metadata, documentation, package version surfaces, baseline evidence, and AgentPlane task artifacts changed; `agentplane-roadmap-r2` and unrelated user work are not committed.
    4. Complete AgentPlane verification and hosted branch protection for the release-ready candidate. Expected: the accepted release commit is integrated into `main`, hosted checks are successful, and `origin/main` resolves to the exact qualified publish SHA.
    5. Publish v0.7.9 only through the AgentPlane release route after an exact fresh publish-authority grant. Expected: `.agentplane/.release/publish/publish-result.json` records `success=true`, an empty `failures` array, version 0.7.9, and the exact qualified main SHA.
    6. Independently read back the GitHub v0.7.9 tag and release. Expected: the tag resolves to the qualified publish SHA and every required release asset and checksum is present.
    7. Independently read back all npm package versions and install the published packages in clean temporary directories. Expected: every public AgentPlane package reports 0.7.9 and both `agentplane` and `ap` entrypoints execute successfully.
    8. Independently verify `setup-agentplane`, Homebrew, and Scoop distribution surfaces and perform their documented clean install smoke checks when the release route provides them. Expected: every required surface resolves to 0.7.9 and its expected checksum; any unavailable anonymous GHCR read is recorded separately without being misreported as success.
    9. Re-fetch the default branch and provider state after publication. Expected: `origin/main`, the canonical release evidence, the tag, registries, and distribution surfaces agree on the same released SHA and version.
    10. Complete the required post-publish evidence follow-up and start the next patch beta only through fresh AgentPlane-managed tasks and authority packets. Expected: no lifecycle or external action is inferred from prose, and any genuine provider or evidence boundary is reported explicitly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:4a965f2340adea8c7ef8ed6627f467899167ffc6dfbfce57d01b87ce15f4e597"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:92aaa2cf63af45c27a36f2f6c82eead85eab5b28d972a480640a6f0aca50254b"
    digest: "sha256:9d4208875231804513e373aa9c9e5b8e00f31de1fccee23b5e02544648b3406b"
    grant_id: "b99a0dac-f12b-4a83-a897-4e42770154be"
    issued_at: "2026-09-13T22:53:42.760Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:ecb53c93c168c8459d819f602aba8f0ca08fa4c980df540d2245457d0c181265"
    plan_revision: 4
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:8d5a54544e4a1d7553d87c6de56ca756dd710c5cedc564cd83eb3299fe02ad77"
    status: "active"
    task_id: "202609121424-49XXT3"
  agentplane.scope_extension_request:
    applied_at: "2026-09-13T23:17:41.802Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:ee0d8bdcc65ad45e20165f8e9f479296831a581cae9de2f8c710b3dba9301971"
    kind: "task_scope_extension_request"
    request:
      rationale: "The repository-owned generator rewrites the complete social asset set because the stable version is embedded in generated images. Partial output selection is not supported by the canonical command."
      repository_effects:
        - "documentation"
        - "release_metadata"
        - "repository_write"
      schema_version: 1
      scope_roots:
        - "website/static/img/social"
    request_digest: "sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256"
    schema_version: 1
    status: "applied"
    transition_id: "tr_a9b5612b125816493e821ae0bf34f942"
    work_item_id: "prepare_candidate"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-13T23:17:41.802Z"
        approved_by: "USER"
        approved_digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
        policy_facts:
          - "state_bound_scope_extension:sha256:9824cf9eafc67eae044d2e802462dd1e37dcb3f5bc35f7d41e65690ee5d99256"
        state: "approved"
      created_at: "2026-09-13T23:17:41.802Z"
      digest: "sha256:9ef83bad341e61625d2ba8e9adf09b88aa235b97a4b7094e623134ce86bdd9eb"
      proposal:
        assumptions:
          - "The integrated 0.7.9 stabilization tasks are complete because their protected PRs and hosted close evidence are present on synchronized main."
          - "The repository release tooling remains the owner of version expansion, publication, next-beta creation, and exact-SHA evidence."
        planning_baseline:
          captured_at: "2026-09-13T03:05:22.900Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
          dirty_paths:
            - ".agentplane/tasks/202609072121-9VEHKH/README.md"
            - ".agentplane/tasks/202609080727-BAWTEE/README.md"
            - ".agentplane/tasks/202609121424-3YAX44/README.md"
            - ".agentplane/tasks/202609121424-49XXT3/README.md"
            - ".agentplane/tasks/202609121424-4BC7B3/README.md"
            - ".agentplane/tasks/202609121424-ZEJ656/README.md"
            - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
            - "agentplane-roadmap-r2/AGENT-START.md"
            - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
            - "agentplane-roadmap-r2/README.md"
            - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
            - "agentplane-roadmap-r2/checksums.json"
            - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
            - "agentplane-roadmap-r2/coverage-map.json"
            - "agentplane-roadmap-r2/dependency-graph.json"
            - "agentplane-roadmap-r2/experiment-requirements.json"
            - "agentplane-roadmap-r2/releases/0.7.10.md"
            - "agentplane-roadmap-r2/releases/0.7.11.md"
            - "agentplane-roadmap-r2/releases/0.7.12.md"
            - "agentplane-roadmap-r2/releases/0.7.13.md"
            - "agentplane-roadmap-r2/releases/0.7.14.md"
            - "agentplane-roadmap-r2/releases/0.7.9.md"
            - "agentplane-roadmap-r2/source-evidence.json"
            - "agentplane-roadmap-r2/tasks.json"
            - "agentplane-roadmap-r2/tasks/BP-01.md"
            - "agentplane-roadmap-r2/tasks/BP-02.md"
            - "agentplane-roadmap-r2/tasks/BP-03.md"
            - "agentplane-roadmap-r2/tasks/BP-04.md"
            - "agentplane-roadmap-r2/tasks/BP-05.md"
            - "agentplane-roadmap-r2/tasks/BP-06.md"
            - "agentplane-roadmap-r2/tasks/BP-07.md"
            - "agentplane-roadmap-r2/tasks/BP-08.md"
            - "agentplane-roadmap-r2/tasks/BP-09.md"
            - "agentplane-roadmap-r2/tasks/BP-10.md"
            - "agentplane-roadmap-r2/tasks/BP-11.md"
            - "agentplane-roadmap-r2/tasks/BP-12.md"
            - "agentplane-roadmap-r2/tasks/BP-13.md"
            - "agentplane-roadmap-r2/tasks/BP-14.md"
            - "agentplane-roadmap-r2/tasks/BP-15.md"
            - "agentplane-roadmap-r2/tasks/BP-16.md"
            - "agentplane-roadmap-r2/tasks/BP-17.md"
            - "agentplane-roadmap-r2/tasks/BP-18.md"
            - "agentplane-roadmap-r2/tasks/BP-19.md"
            - "agentplane-roadmap-r2/tasks/BP-20.md"
            - "agentplane-roadmap-r2/tasks/BP-21.md"
            - "agentplane-roadmap-r2/tasks/BP-22.md"
            - "agentplane-roadmap-r2/tasks/BP-23.md"
            - "agentplane-roadmap-r2/tasks/BP-24.md"
            - "agentplane-roadmap-r2/tasks/BP-25.md"
            - "agentplane-roadmap-r2/tasks/BP-26.md"
            - "agentplane-roadmap-r2/tasks/BP-27.md"
            - "agentplane-roadmap-r2/tasks/BP-28.md"
            - "agentplane-roadmap-r2/tasks/BP-29.md"
            - "agentplane-roadmap-r2/tasks/BP-30.md"
            - "agentplane-roadmap-r2/tasks/BP-31.md"
            - "agentplane-roadmap-r2/tasks/EV-01.md"
            - "agentplane-roadmap-r2/tasks/EV-02.md"
            - "agentplane-roadmap-r2/tasks/EV-03.md"
            - "agentplane-roadmap-r2/tasks/EV-04.md"
            - "agentplane-roadmap-r2/tasks/EV-05.md"
            - "agentplane-roadmap-r2/tasks/EV-06.md"
            - "agentplane-roadmap-r2/tasks/EV-07.md"
            - "agentplane-roadmap-r2/tasks/EV-08.md"
            - "agentplane-roadmap-r2/tasks/EV-09.md"
            - "agentplane-roadmap-r2/tasks/EV-10.md"
            - "agentplane-roadmap-r2/tasks/EV-11.md"
            - "agentplane-roadmap-r2/tasks/EV-12.md"
            - "agentplane-roadmap-r2/tasks/EV-13.md"
            - "agentplane-roadmap-r2/tasks/LC-01.md"
            - "agentplane-roadmap-r2/tasks/LC-02.md"
            - "agentplane-roadmap-r2/tasks/LC-03.md"
            - "agentplane-roadmap-r2/tasks/LC-04.md"
            - "agentplane-roadmap-r2/tasks/LC-05.md"
            - "agentplane-roadmap-r2/tasks/LC-06.md"
            - "agentplane-roadmap-r2/tasks/LC-07.md"
            - "agentplane-roadmap-r2/tasks/LC-08.md"
            - "agentplane-roadmap-r2/tasks/LC-09.md"
            - "agentplane-roadmap-r2/tasks/LC-10.md"
            - "agentplane-roadmap-r2/tasks/LC-11.md"
            - "agentplane-roadmap-r2/tasks/LC-12.md"
            - "agentplane-roadmap-r2/tasks/LC-13.md"
            - "agentplane-roadmap-r2/tasks/LC-14.md"
            - "agentplane-roadmap-r2/tasks/LC-15.md"
            - "agentplane-roadmap-r2/tasks/LC-16.md"
            - "agentplane-roadmap-r2/tasks/LC-17.md"
            - "agentplane-roadmap-r2/tasks/LC-18.md"
            - "agentplane-roadmap-r2/tasks/LC-19.md"
            - "agentplane-roadmap-r2/tasks/LC-20.md"
            - "agentplane-roadmap-r2/tasks/LC-21.md"
            - "agentplane-roadmap-r2/tasks/LC-22.md"
            - "agentplane-roadmap-r2/tasks/LC-23.md"
            - "agentplane-roadmap-r2/tasks/PL-01.md"
            - "agentplane-roadmap-r2/tasks/PL-02.md"
            - "agentplane-roadmap-r2/tasks/PL-03.md"
            - "agentplane-roadmap-r2/tasks/PL-04.md"
            - "agentplane-roadmap-r2/tasks/PL-05.md"
            - "agentplane-roadmap-r2/tasks/PL-06.md"
            - "agentplane-roadmap-r2/tasks/PL-07.md"
            - "agentplane-roadmap-r2/tasks/PL-08.md"
            - "agentplane-roadmap-r2/tasks/PL-09.md"
            - "agentplane-roadmap-r2/tasks/PL-10.md"
            - "agentplane-roadmap-r2/tasks/PL-11.md"
            - "agentplane-roadmap-r2/tasks/PL-12.md"
            - "agentplane-roadmap-r2/tasks/RC-01.md"
            - "agentplane-roadmap-r2/tasks/RC-02.md"
            - "agentplane-roadmap-r2/tasks/RC-03.md"
            - "agentplane-roadmap-r2/tasks/RC-04.md"
            - "agentplane-roadmap-r2/tasks/RC-05.md"
            - "agentplane-roadmap-r2/tasks/RC-06.md"
            - "agentplane-roadmap-r2/tasks/RC-07.md"
            - "agentplane-roadmap-r2/tasks/RC-08.md"
            - "agentplane-roadmap-r2/tasks/RC-09.md"
            - "agentplane-roadmap-r2/tasks/RC-10.md"
            - "agentplane-roadmap-r2/tasks/RC-11.md"
            - "agentplane-roadmap-r2/tasks/RC-12.md"
            - "agentplane-roadmap-r2/tasks/RC-13.md"
            - "agentplane-roadmap-r2/tasks/RC-14.md"
            - "agentplane-roadmap-r2/tasks/RC-15.md"
            - "agentplane-roadmap-r2/tasks/RC-16.md"
            - "agentplane-roadmap-r2/tasks/RC-17.md"
            - "agentplane-roadmap-r2/tasks/RC-18.md"
            - "agentplane-roadmap-r2/tasks/ST-01.md"
            - "agentplane-roadmap-r2/tasks/ST-02.md"
            - "agentplane-roadmap-r2/tasks/ST-03.md"
            - "agentplane-roadmap-r2/tasks/ST-04.md"
            - "agentplane-roadmap-r2/tasks/ST-05.md"
            - "agentplane-roadmap-r2/tasks/ST-06.md"
            - "agentplane-roadmap-r2/tasks/ST-07.md"
            - "agentplane-roadmap-r2/tasks/ST-08.md"
            - "agentplane-roadmap-r2/tasks/ST-09.md"
            - "agentplane-roadmap-r2/tasks/ST-10.md"
            - "agentplane-roadmap-r2/tasks/ST-11.md"
            - "agentplane-roadmap-r2/tasks/ST-12.md"
            - "agentplane-roadmap-r2/tasks/ST-13.md"
            - "agentplane-roadmap-r2/tasks/ST-14.md"
            - "agentplane-roadmap-r2/tasks/ST-15.md"
            - "agentplane-roadmap-r2/tasks/ST-16.md"
            - "agentplane-roadmap-r2/tasks/ST-17.md"
            - "agentplane-roadmap-r2/tasks/ST-18.md"
            - "agentplane-roadmap-r2/tasks/ST-19.md"
            - "agentplane-roadmap-r2/tasks/ST-20.md"
            - "agentplane-roadmap-r2/tasks/ST-21.md"
            - "agentplane-roadmap-r2/validate_roadmap.py"
            - "agentplane-roadmap-r2/validation-report.json"
          git:
            kind: "commit"
            ref: null
            sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:2"
        schema_version: 1
        task_id: "202609121424-49XXT3"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run release:check"
              id: "release_check"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              command: "bun run release:prepublish"
              id: "release_prepublish"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              id: "scope_hygiene"
              kind: "structural"
              required: true
            -
              capability: "task.verify"
              id: "hosted_integration"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "publish_manifest"
              kind: "structural"
              required: true
            -
              capability: "task.verify"
              id: "github_release"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "registry_readback"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "installer_readback"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "default_branch_readback"
              kind: "provider"
              required: true
          criteria:
            -
              check_ids:
                - "release_check"
                - "release_prepublish"
                - "scope_hygiene"
              description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
              id: "candidate_exact"
              required: true
            -
              check_ids:
                - "release_check"
                - "release_prepublish"
                - "hosted_integration"
              description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
              id: "candidate_qualified"
              required: true
            -
              check_ids:
                - "publish_manifest"
                - "github_release"
              description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
              id: "publication_exact"
              required: true
            -
              check_ids:
                - "registry_readback"
                - "installer_readback"
                - "default_branch_readback"
              description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
              id: "distribution_verified"
              required: true
            -
              check_ids:
                - "scope_hygiene"
                - "default_branch_readback"
              description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
              id: "post_publish_complete"
              required: true
          evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "release_check"
                    - "release_prepublish"
                    - "scope_hygiene"
                  description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                  id: "candidate_exact"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 1000000
                optional_sources:
                  - "docs/releases/v0.7.8-evidence"
                required_sources:
                  - ".agentplane/policy/workflow.release.md"
                  - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  - "docs/releases/v0.7.8.md"
                symbol_hints:
                  - "release plan"
                  - "version parity"
                  - "release notes"
              depends_on: []
              expected_outputs:
                - "stable_candidate_diff"
                - "release_notes_and_evidence"
                - "exact_candidate_sha"
              id: "prepare_candidate"
              objective: "Freeze d03a5e786 as the release base and prepare stable 0.7.9 versions, internal pins, generated release surfaces, release notes, and evidence without semantic source changes."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "release-candidate-worktree"
                -
                  kind: "path"
                  mode: "write"
                  resource: ".agentplane/WORKFLOW.md"
                -
                  kind: "path"
                  mode: "write"
                  resource: ".agentplane/config.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
                -
                  kind: "path"
                  mode: "write"
                  resource: "website/static/img/social/docs/releases/v0.7.9.png"
                -
                  kind: "path"
                  mode: "write"
                  resource: "website/static/img/social/manifest.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "website/static/img/social"
              risk: "high"
              scope_roots:
                - ".agentplane/WORKFLOW.md"
                - ".agentplane/config.json"
                - ".agentplane/tasks/202609121424-49XXT3"
                - "docs/assets"
                - "docs/reference/generated-reference.mdx"
                - "docs/releases/v0.7.9-evidence"
                - "docs/releases/v0.7.9.md"
                - "package.json"
                - "packages"
                - "scripts/baselines"
                - "website/static/img/social"
                - "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
                - "website/static/img/social/docs/releases/v0.7.9.png"
                - "website/static/img/social/manifest.json"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:check"
                    id: "release_check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    command: "bun run release:prepublish"
                    id: "release_prepublish"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    id: "scope_hygiene"
                    kind: "structural"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                    id: "candidate_exact"
                    required: true
                evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "release_check"
                    - "release_prepublish"
                    - "hosted_integration"
                  description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                  id: "candidate_qualified"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 500000
                optional_sources: []
                required_sources:
                  - ".agentplane/tasks/202609121424-49XXT3/README.md"
                symbol_hints:
                  - "verification"
                  - "quality review"
                  - "hosted integration"
              depends_on:
                - "prepare_candidate"
              expected_outputs:
                - "independent_evaluator_verdict"
                - "green_hosted_candidate_checks"
                - "qualified_main_sha"
              id: "qualify_integrate"
              objective: "Qualify the exact release candidate, obtain independent review and hosted checks, and integrate it through the protected AgentPlane merge lane and hosted close."
              optional: false
              priority: 2
              required_inputs:
                - "exact_candidate_sha"
                - "release_notes_and_evidence"
              resource_claims:
                -
                  kind: "provider_queue"
                  mode: "exclusive"
                  resource: "integration-lane"
              risk: "high"
              scope_roots:
                - ".agentplane/tasks/202609121424-49XXT3"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run release:check"
                    id: "release_check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    command: "bun run release:prepublish"
                    id: "release_prepublish"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    id: "hosted_integration"
                    kind: "provider"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "publish_manifest"
                    - "github_release"
                  description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                  id: "publication_exact"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 500000
                optional_sources: []
                required_sources:
                  - ".agentplane/policy/workflow.release.md"
                  - ".agentplane/tasks/202609121424-49XXT3/README.md"
                symbol_hints:
                  - "publish-result.json"
                  - "release-ready"
              depends_on:
                - "qualify_integrate"
              expected_outputs:
                - "v0_7_9_github_release"
                - "published_npm_packages"
                - "exact_sha_publish_result"
              id: "publish_stable"
              objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release workflow and preserve canonical publication evidence."
              optional: false
              priority: 3
              required_inputs:
                - "qualified_main_sha"
              resource_claims:
                -
                  kind: "provider_queue"
                  mode: "exclusive"
                  resource: "release-v0.7.9"
              risk: "high"
              scope_roots:
                - ".agentplane/.release"
                - ".agentplane/tasks/202609121424-49XXT3"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "publish_manifest"
                    kind: "structural"
                    required: true
                  -
                    capability: "task.verify"
                    id: "github_release"
                    kind: "provider"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                    id: "publication_exact"
                    required: true
                evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "registry_readback"
                    - "installer_readback"
                    - "default_branch_readback"
                  description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                  id: "distribution_verified"
                  required: true
                -
                  check_ids:
                    - "scope_hygiene"
                    - "default_branch_readback"
                  description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                  id: "post_publish_complete"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 500000
                optional_sources:
                  - "public GHCR metadata"
                required_sources:
                  - ".agentplane/.release/publish/publish-result.json"
                  - ".agentplane/tasks/202609121424-49XXT3/README.md"
                symbol_hints:
                  - "agentplane"
                  - "ap"
                  - "Homebrew"
                  - "Scoop"
                  - "setup-agentplane"
              depends_on:
                - "publish_stable"
              expected_outputs:
                - "independent_distribution_readback"
                - "verified_cli_entrypoints"
                - "final_main_and_next_beta_evidence"
                - "residual_limitations"
              id: "verify_distribution"
              objective: "Independently verify all public 0.7.9 artifacts and installers, record limitations precisely, and complete the AgentPlane-managed post-publish evidence and next-beta follow-up."
              optional: false
              priority: 4
              required_inputs:
                - "exact_sha_publish_result"
                - "v0_7_9_github_release"
                - "published_npm_packages"
              resource_claims:
                -
                  kind: "provider_queue"
                  mode: "read"
                  resource: "release-readback-v0.7.9"
              risk: "high"
              scope_roots:
                - ".agentplane/.release"
                - ".agentplane/tasks/202609121424-49XXT3"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "registry_readback"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    id: "installer_readback"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    id: "default_branch_readback"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    id: "scope_hygiene"
                    kind: "structural"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                    id: "post_publish_complete"
                    required: true
                evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                schema_version: 1
      revision: 4
      schema_version: 1
      task_id: "202609121424-49XXT3"
    event_cursor: 15
    final_validation: null
    id: "202609121424-49XXT3"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run release:check"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run release:prepublish"
          id: "legacy-2"
          required: true
      captured_at: "2026-09-12T14:24:56.231Z"
      constraints: []
      request: |-
        Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA

        Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.
      task_id: "202609121424-49XXT3"
    lifecycle: "ACTIVE"
    plan_amendments:
      -
        actor_id: "external:EXECUTOR"
        created_at: "2026-09-13T23:01:21.946Z"
        digest: "sha256:24582bb56476c1224e61f81d96fb931933fa4d48bde7b85ad1d6778ed4b24cbc"
        id: "amendment_24582bb56476c1224e61f81d"
        plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
        plan_revision: 1
        refinement:
          acceptance_changed: false
          architecture_constraints_changed: false
          dependencies_changed: false
          description: "Replace the stale release base d03a5e786db57136bf7f6c4661b148bcf97cfaf1 with the current qualified main SHA ecfccc5ad0230fc1876a319be0af5cdb530c339f after required dependency 202609121424-4BC7B3 merged. Keep the existing scope, outputs, acceptance criteria, risk, external effects, dependency graph, and architecture constraints unchanged."
          external_effects_added: []
          operations:
            - "clarify"
          outputs_added: []
          risk_changed: false
          scope_roots_added: []
        schema_version: 1
    plan_history:
      -
        approval:
          approved_at: "2026-09-13T22:53:42.760Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-13T03:09:14.798Z"
        digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
        proposal:
          assumptions:
            - "The integrated 0.7.9 stabilization tasks are complete because their protected PRs and hosted close evidence are present on synchronized main."
            - "The repository release tooling remains the owner of version expansion, publication, next-beta creation, and exact-SHA evidence."
          planning_baseline:
            captured_at: "2026-09-13T03:05:22.900Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609121424-3YAX44/README.md"
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
              - ".agentplane/tasks/202609121424-4BC7B3/README.md"
              - ".agentplane/tasks/202609121424-ZEJ656/README.md"
              - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
              - "agentplane-roadmap-r2/AGENT-START.md"
              - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
              - "agentplane-roadmap-r2/README.md"
              - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
              - "agentplane-roadmap-r2/checksums.json"
              - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
              - "agentplane-roadmap-r2/coverage-map.json"
              - "agentplane-roadmap-r2/dependency-graph.json"
              - "agentplane-roadmap-r2/experiment-requirements.json"
              - "agentplane-roadmap-r2/releases/0.7.10.md"
              - "agentplane-roadmap-r2/releases/0.7.11.md"
              - "agentplane-roadmap-r2/releases/0.7.12.md"
              - "agentplane-roadmap-r2/releases/0.7.13.md"
              - "agentplane-roadmap-r2/releases/0.7.14.md"
              - "agentplane-roadmap-r2/releases/0.7.9.md"
              - "agentplane-roadmap-r2/source-evidence.json"
              - "agentplane-roadmap-r2/tasks.json"
              - "agentplane-roadmap-r2/tasks/BP-01.md"
              - "agentplane-roadmap-r2/tasks/BP-02.md"
              - "agentplane-roadmap-r2/tasks/BP-03.md"
              - "agentplane-roadmap-r2/tasks/BP-04.md"
              - "agentplane-roadmap-r2/tasks/BP-05.md"
              - "agentplane-roadmap-r2/tasks/BP-06.md"
              - "agentplane-roadmap-r2/tasks/BP-07.md"
              - "agentplane-roadmap-r2/tasks/BP-08.md"
              - "agentplane-roadmap-r2/tasks/BP-09.md"
              - "agentplane-roadmap-r2/tasks/BP-10.md"
              - "agentplane-roadmap-r2/tasks/BP-11.md"
              - "agentplane-roadmap-r2/tasks/BP-12.md"
              - "agentplane-roadmap-r2/tasks/BP-13.md"
              - "agentplane-roadmap-r2/tasks/BP-14.md"
              - "agentplane-roadmap-r2/tasks/BP-15.md"
              - "agentplane-roadmap-r2/tasks/BP-16.md"
              - "agentplane-roadmap-r2/tasks/BP-17.md"
              - "agentplane-roadmap-r2/tasks/BP-18.md"
              - "agentplane-roadmap-r2/tasks/BP-19.md"
              - "agentplane-roadmap-r2/tasks/BP-20.md"
              - "agentplane-roadmap-r2/tasks/BP-21.md"
              - "agentplane-roadmap-r2/tasks/BP-22.md"
              - "agentplane-roadmap-r2/tasks/BP-23.md"
              - "agentplane-roadmap-r2/tasks/BP-24.md"
              - "agentplane-roadmap-r2/tasks/BP-25.md"
              - "agentplane-roadmap-r2/tasks/BP-26.md"
              - "agentplane-roadmap-r2/tasks/BP-27.md"
              - "agentplane-roadmap-r2/tasks/BP-28.md"
              - "agentplane-roadmap-r2/tasks/BP-29.md"
              - "agentplane-roadmap-r2/tasks/BP-30.md"
              - "agentplane-roadmap-r2/tasks/BP-31.md"
              - "agentplane-roadmap-r2/tasks/EV-01.md"
              - "agentplane-roadmap-r2/tasks/EV-02.md"
              - "agentplane-roadmap-r2/tasks/EV-03.md"
              - "agentplane-roadmap-r2/tasks/EV-04.md"
              - "agentplane-roadmap-r2/tasks/EV-05.md"
              - "agentplane-roadmap-r2/tasks/EV-06.md"
              - "agentplane-roadmap-r2/tasks/EV-07.md"
              - "agentplane-roadmap-r2/tasks/EV-08.md"
              - "agentplane-roadmap-r2/tasks/EV-09.md"
              - "agentplane-roadmap-r2/tasks/EV-10.md"
              - "agentplane-roadmap-r2/tasks/EV-11.md"
              - "agentplane-roadmap-r2/tasks/EV-12.md"
              - "agentplane-roadmap-r2/tasks/EV-13.md"
              - "agentplane-roadmap-r2/tasks/LC-01.md"
              - "agentplane-roadmap-r2/tasks/LC-02.md"
              - "agentplane-roadmap-r2/tasks/LC-03.md"
              - "agentplane-roadmap-r2/tasks/LC-04.md"
              - "agentplane-roadmap-r2/tasks/LC-05.md"
              - "agentplane-roadmap-r2/tasks/LC-06.md"
              - "agentplane-roadmap-r2/tasks/LC-07.md"
              - "agentplane-roadmap-r2/tasks/LC-08.md"
              - "agentplane-roadmap-r2/tasks/LC-09.md"
              - "agentplane-roadmap-r2/tasks/LC-10.md"
              - "agentplane-roadmap-r2/tasks/LC-11.md"
              - "agentplane-roadmap-r2/tasks/LC-12.md"
              - "agentplane-roadmap-r2/tasks/LC-13.md"
              - "agentplane-roadmap-r2/tasks/LC-14.md"
              - "agentplane-roadmap-r2/tasks/LC-15.md"
              - "agentplane-roadmap-r2/tasks/LC-16.md"
              - "agentplane-roadmap-r2/tasks/LC-17.md"
              - "agentplane-roadmap-r2/tasks/LC-18.md"
              - "agentplane-roadmap-r2/tasks/LC-19.md"
              - "agentplane-roadmap-r2/tasks/LC-20.md"
              - "agentplane-roadmap-r2/tasks/LC-21.md"
              - "agentplane-roadmap-r2/tasks/LC-22.md"
              - "agentplane-roadmap-r2/tasks/LC-23.md"
              - "agentplane-roadmap-r2/tasks/PL-01.md"
              - "agentplane-roadmap-r2/tasks/PL-02.md"
              - "agentplane-roadmap-r2/tasks/PL-03.md"
              - "agentplane-roadmap-r2/tasks/PL-04.md"
              - "agentplane-roadmap-r2/tasks/PL-05.md"
              - "agentplane-roadmap-r2/tasks/PL-06.md"
              - "agentplane-roadmap-r2/tasks/PL-07.md"
              - "agentplane-roadmap-r2/tasks/PL-08.md"
              - "agentplane-roadmap-r2/tasks/PL-09.md"
              - "agentplane-roadmap-r2/tasks/PL-10.md"
              - "agentplane-roadmap-r2/tasks/PL-11.md"
              - "agentplane-roadmap-r2/tasks/PL-12.md"
              - "agentplane-roadmap-r2/tasks/RC-01.md"
              - "agentplane-roadmap-r2/tasks/RC-02.md"
              - "agentplane-roadmap-r2/tasks/RC-03.md"
              - "agentplane-roadmap-r2/tasks/RC-04.md"
              - "agentplane-roadmap-r2/tasks/RC-05.md"
              - "agentplane-roadmap-r2/tasks/RC-06.md"
              - "agentplane-roadmap-r2/tasks/RC-07.md"
              - "agentplane-roadmap-r2/tasks/RC-08.md"
              - "agentplane-roadmap-r2/tasks/RC-09.md"
              - "agentplane-roadmap-r2/tasks/RC-10.md"
              - "agentplane-roadmap-r2/tasks/RC-11.md"
              - "agentplane-roadmap-r2/tasks/RC-12.md"
              - "agentplane-roadmap-r2/tasks/RC-13.md"
              - "agentplane-roadmap-r2/tasks/RC-14.md"
              - "agentplane-roadmap-r2/tasks/RC-15.md"
              - "agentplane-roadmap-r2/tasks/RC-16.md"
              - "agentplane-roadmap-r2/tasks/RC-17.md"
              - "agentplane-roadmap-r2/tasks/RC-18.md"
              - "agentplane-roadmap-r2/tasks/ST-01.md"
              - "agentplane-roadmap-r2/tasks/ST-02.md"
              - "agentplane-roadmap-r2/tasks/ST-03.md"
              - "agentplane-roadmap-r2/tasks/ST-04.md"
              - "agentplane-roadmap-r2/tasks/ST-05.md"
              - "agentplane-roadmap-r2/tasks/ST-06.md"
              - "agentplane-roadmap-r2/tasks/ST-07.md"
              - "agentplane-roadmap-r2/tasks/ST-08.md"
              - "agentplane-roadmap-r2/tasks/ST-09.md"
              - "agentplane-roadmap-r2/tasks/ST-10.md"
              - "agentplane-roadmap-r2/tasks/ST-11.md"
              - "agentplane-roadmap-r2/tasks/ST-12.md"
              - "agentplane-roadmap-r2/tasks/ST-13.md"
              - "agentplane-roadmap-r2/tasks/ST-14.md"
              - "agentplane-roadmap-r2/tasks/ST-15.md"
              - "agentplane-roadmap-r2/tasks/ST-16.md"
              - "agentplane-roadmap-r2/tasks/ST-17.md"
              - "agentplane-roadmap-r2/tasks/ST-18.md"
              - "agentplane-roadmap-r2/tasks/ST-19.md"
              - "agentplane-roadmap-r2/tasks/ST-20.md"
              - "agentplane-roadmap-r2/tasks/ST-21.md"
              - "agentplane-roadmap-r2/validate_roadmap.py"
              - "agentplane-roadmap-r2/validation-report.json"
            git:
              kind: "commit"
              ref: null
              sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "release plan"
                    - "version parity"
                    - "release notes"
                depends_on: []
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Freeze d03a5e786 as the release base and prepare stable 0.7.9 versions, internal pins, generated release surfaces, release notes, and evidence without semantic source changes."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                risk: "high"
                scope_roots:
                  - "package.json"
                  - "packages"
                  - "docs/releases/v0.7.9.md"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/assets"
                  - "scripts/baselines"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "quality review"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact release candidate, obtain independent review and hosted checks, and integrate it through the protected AgentPlane merge lane and hosted close."
                optional: false
                priority: 2
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release workflow and preserve canonical publication evidence."
                optional: false
                priority: 3
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify all public 0.7.9 artifacts and installers, record limitations precisely, and complete the AgentPlane-managed post-publish evidence and next-beta follow-up."
                optional: false
                priority: 4
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-13T23:03:50.512Z"
          approved_by: "USER"
          approved_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          policy_facts:
            - "state_bound_scope_extension:sha256:64efd1a8d1aa81e24d3e15b4c4e3cb13243be7dad82ee30c939d18e544bb7923"
          state: "approved"
        created_at: "2026-09-13T23:03:50.512Z"
        digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
        proposal:
          assumptions:
            - "The integrated 0.7.9 stabilization tasks are complete because their protected PRs and hosted close evidence are present on synchronized main."
            - "The repository release tooling remains the owner of version expansion, publication, next-beta creation, and exact-SHA evidence."
          planning_baseline:
            captured_at: "2026-09-13T03:05:22.900Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609121424-3YAX44/README.md"
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
              - ".agentplane/tasks/202609121424-4BC7B3/README.md"
              - ".agentplane/tasks/202609121424-ZEJ656/README.md"
              - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
              - "agentplane-roadmap-r2/AGENT-START.md"
              - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
              - "agentplane-roadmap-r2/README.md"
              - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
              - "agentplane-roadmap-r2/checksums.json"
              - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
              - "agentplane-roadmap-r2/coverage-map.json"
              - "agentplane-roadmap-r2/dependency-graph.json"
              - "agentplane-roadmap-r2/experiment-requirements.json"
              - "agentplane-roadmap-r2/releases/0.7.10.md"
              - "agentplane-roadmap-r2/releases/0.7.11.md"
              - "agentplane-roadmap-r2/releases/0.7.12.md"
              - "agentplane-roadmap-r2/releases/0.7.13.md"
              - "agentplane-roadmap-r2/releases/0.7.14.md"
              - "agentplane-roadmap-r2/releases/0.7.9.md"
              - "agentplane-roadmap-r2/source-evidence.json"
              - "agentplane-roadmap-r2/tasks.json"
              - "agentplane-roadmap-r2/tasks/BP-01.md"
              - "agentplane-roadmap-r2/tasks/BP-02.md"
              - "agentplane-roadmap-r2/tasks/BP-03.md"
              - "agentplane-roadmap-r2/tasks/BP-04.md"
              - "agentplane-roadmap-r2/tasks/BP-05.md"
              - "agentplane-roadmap-r2/tasks/BP-06.md"
              - "agentplane-roadmap-r2/tasks/BP-07.md"
              - "agentplane-roadmap-r2/tasks/BP-08.md"
              - "agentplane-roadmap-r2/tasks/BP-09.md"
              - "agentplane-roadmap-r2/tasks/BP-10.md"
              - "agentplane-roadmap-r2/tasks/BP-11.md"
              - "agentplane-roadmap-r2/tasks/BP-12.md"
              - "agentplane-roadmap-r2/tasks/BP-13.md"
              - "agentplane-roadmap-r2/tasks/BP-14.md"
              - "agentplane-roadmap-r2/tasks/BP-15.md"
              - "agentplane-roadmap-r2/tasks/BP-16.md"
              - "agentplane-roadmap-r2/tasks/BP-17.md"
              - "agentplane-roadmap-r2/tasks/BP-18.md"
              - "agentplane-roadmap-r2/tasks/BP-19.md"
              - "agentplane-roadmap-r2/tasks/BP-20.md"
              - "agentplane-roadmap-r2/tasks/BP-21.md"
              - "agentplane-roadmap-r2/tasks/BP-22.md"
              - "agentplane-roadmap-r2/tasks/BP-23.md"
              - "agentplane-roadmap-r2/tasks/BP-24.md"
              - "agentplane-roadmap-r2/tasks/BP-25.md"
              - "agentplane-roadmap-r2/tasks/BP-26.md"
              - "agentplane-roadmap-r2/tasks/BP-27.md"
              - "agentplane-roadmap-r2/tasks/BP-28.md"
              - "agentplane-roadmap-r2/tasks/BP-29.md"
              - "agentplane-roadmap-r2/tasks/BP-30.md"
              - "agentplane-roadmap-r2/tasks/BP-31.md"
              - "agentplane-roadmap-r2/tasks/EV-01.md"
              - "agentplane-roadmap-r2/tasks/EV-02.md"
              - "agentplane-roadmap-r2/tasks/EV-03.md"
              - "agentplane-roadmap-r2/tasks/EV-04.md"
              - "agentplane-roadmap-r2/tasks/EV-05.md"
              - "agentplane-roadmap-r2/tasks/EV-06.md"
              - "agentplane-roadmap-r2/tasks/EV-07.md"
              - "agentplane-roadmap-r2/tasks/EV-08.md"
              - "agentplane-roadmap-r2/tasks/EV-09.md"
              - "agentplane-roadmap-r2/tasks/EV-10.md"
              - "agentplane-roadmap-r2/tasks/EV-11.md"
              - "agentplane-roadmap-r2/tasks/EV-12.md"
              - "agentplane-roadmap-r2/tasks/EV-13.md"
              - "agentplane-roadmap-r2/tasks/LC-01.md"
              - "agentplane-roadmap-r2/tasks/LC-02.md"
              - "agentplane-roadmap-r2/tasks/LC-03.md"
              - "agentplane-roadmap-r2/tasks/LC-04.md"
              - "agentplane-roadmap-r2/tasks/LC-05.md"
              - "agentplane-roadmap-r2/tasks/LC-06.md"
              - "agentplane-roadmap-r2/tasks/LC-07.md"
              - "agentplane-roadmap-r2/tasks/LC-08.md"
              - "agentplane-roadmap-r2/tasks/LC-09.md"
              - "agentplane-roadmap-r2/tasks/LC-10.md"
              - "agentplane-roadmap-r2/tasks/LC-11.md"
              - "agentplane-roadmap-r2/tasks/LC-12.md"
              - "agentplane-roadmap-r2/tasks/LC-13.md"
              - "agentplane-roadmap-r2/tasks/LC-14.md"
              - "agentplane-roadmap-r2/tasks/LC-15.md"
              - "agentplane-roadmap-r2/tasks/LC-16.md"
              - "agentplane-roadmap-r2/tasks/LC-17.md"
              - "agentplane-roadmap-r2/tasks/LC-18.md"
              - "agentplane-roadmap-r2/tasks/LC-19.md"
              - "agentplane-roadmap-r2/tasks/LC-20.md"
              - "agentplane-roadmap-r2/tasks/LC-21.md"
              - "agentplane-roadmap-r2/tasks/LC-22.md"
              - "agentplane-roadmap-r2/tasks/LC-23.md"
              - "agentplane-roadmap-r2/tasks/PL-01.md"
              - "agentplane-roadmap-r2/tasks/PL-02.md"
              - "agentplane-roadmap-r2/tasks/PL-03.md"
              - "agentplane-roadmap-r2/tasks/PL-04.md"
              - "agentplane-roadmap-r2/tasks/PL-05.md"
              - "agentplane-roadmap-r2/tasks/PL-06.md"
              - "agentplane-roadmap-r2/tasks/PL-07.md"
              - "agentplane-roadmap-r2/tasks/PL-08.md"
              - "agentplane-roadmap-r2/tasks/PL-09.md"
              - "agentplane-roadmap-r2/tasks/PL-10.md"
              - "agentplane-roadmap-r2/tasks/PL-11.md"
              - "agentplane-roadmap-r2/tasks/PL-12.md"
              - "agentplane-roadmap-r2/tasks/RC-01.md"
              - "agentplane-roadmap-r2/tasks/RC-02.md"
              - "agentplane-roadmap-r2/tasks/RC-03.md"
              - "agentplane-roadmap-r2/tasks/RC-04.md"
              - "agentplane-roadmap-r2/tasks/RC-05.md"
              - "agentplane-roadmap-r2/tasks/RC-06.md"
              - "agentplane-roadmap-r2/tasks/RC-07.md"
              - "agentplane-roadmap-r2/tasks/RC-08.md"
              - "agentplane-roadmap-r2/tasks/RC-09.md"
              - "agentplane-roadmap-r2/tasks/RC-10.md"
              - "agentplane-roadmap-r2/tasks/RC-11.md"
              - "agentplane-roadmap-r2/tasks/RC-12.md"
              - "agentplane-roadmap-r2/tasks/RC-13.md"
              - "agentplane-roadmap-r2/tasks/RC-14.md"
              - "agentplane-roadmap-r2/tasks/RC-15.md"
              - "agentplane-roadmap-r2/tasks/RC-16.md"
              - "agentplane-roadmap-r2/tasks/RC-17.md"
              - "agentplane-roadmap-r2/tasks/RC-18.md"
              - "agentplane-roadmap-r2/tasks/ST-01.md"
              - "agentplane-roadmap-r2/tasks/ST-02.md"
              - "agentplane-roadmap-r2/tasks/ST-03.md"
              - "agentplane-roadmap-r2/tasks/ST-04.md"
              - "agentplane-roadmap-r2/tasks/ST-05.md"
              - "agentplane-roadmap-r2/tasks/ST-06.md"
              - "agentplane-roadmap-r2/tasks/ST-07.md"
              - "agentplane-roadmap-r2/tasks/ST-08.md"
              - "agentplane-roadmap-r2/tasks/ST-09.md"
              - "agentplane-roadmap-r2/tasks/ST-10.md"
              - "agentplane-roadmap-r2/tasks/ST-11.md"
              - "agentplane-roadmap-r2/tasks/ST-12.md"
              - "agentplane-roadmap-r2/tasks/ST-13.md"
              - "agentplane-roadmap-r2/tasks/ST-14.md"
              - "agentplane-roadmap-r2/tasks/ST-15.md"
              - "agentplane-roadmap-r2/tasks/ST-16.md"
              - "agentplane-roadmap-r2/tasks/ST-17.md"
              - "agentplane-roadmap-r2/tasks/ST-18.md"
              - "agentplane-roadmap-r2/tasks/ST-19.md"
              - "agentplane-roadmap-r2/tasks/ST-20.md"
              - "agentplane-roadmap-r2/tasks/ST-21.md"
              - "agentplane-roadmap-r2/validate_roadmap.py"
              - "agentplane-roadmap-r2/validation-report.json"
            git:
              kind: "commit"
              ref: null
              sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "release plan"
                    - "version parity"
                    - "release notes"
                depends_on: []
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Freeze d03a5e786 as the release base and prepare stable 0.7.9 versions, internal pins, generated release surfaces, release notes, and evidence without semantic source changes."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/config.json"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "quality review"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact release candidate, obtain independent review and hosted checks, and integrate it through the protected AgentPlane merge lane and hosted close."
                optional: false
                priority: 2
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release workflow and preserve canonical publication evidence."
                optional: false
                priority: 3
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify all public 0.7.9 artifacts and installers, record limitations precisely, and complete the AgentPlane-managed post-publish evidence and next-beta follow-up."
                optional: false
                priority: 4
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609121424-49XXT3"
      -
        approval:
          approved_at: "2026-09-13T23:13:16.889Z"
          approved_by: "USER"
          approved_digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
          policy_facts:
            - "state_bound_scope_extension:sha256:ed9e16b8520f614aefebd119bbca5a10b7dd0a0058c67ef3c479aea3720f16b5"
          state: "approved"
        created_at: "2026-09-13T23:13:16.889Z"
        digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
        proposal:
          assumptions:
            - "The integrated 0.7.9 stabilization tasks are complete because their protected PRs and hosted close evidence are present on synchronized main."
            - "The repository release tooling remains the owner of version expansion, publication, next-beta creation, and exact-SHA evidence."
          planning_baseline:
            captured_at: "2026-09-13T03:05:22.900Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609121424-3YAX44/README.md"
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
              - ".agentplane/tasks/202609121424-4BC7B3/README.md"
              - ".agentplane/tasks/202609121424-ZEJ656/README.md"
              - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
              - "agentplane-roadmap-r2/AGENT-START.md"
              - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
              - "agentplane-roadmap-r2/README.md"
              - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
              - "agentplane-roadmap-r2/checksums.json"
              - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
              - "agentplane-roadmap-r2/coverage-map.json"
              - "agentplane-roadmap-r2/dependency-graph.json"
              - "agentplane-roadmap-r2/experiment-requirements.json"
              - "agentplane-roadmap-r2/releases/0.7.10.md"
              - "agentplane-roadmap-r2/releases/0.7.11.md"
              - "agentplane-roadmap-r2/releases/0.7.12.md"
              - "agentplane-roadmap-r2/releases/0.7.13.md"
              - "agentplane-roadmap-r2/releases/0.7.14.md"
              - "agentplane-roadmap-r2/releases/0.7.9.md"
              - "agentplane-roadmap-r2/source-evidence.json"
              - "agentplane-roadmap-r2/tasks.json"
              - "agentplane-roadmap-r2/tasks/BP-01.md"
              - "agentplane-roadmap-r2/tasks/BP-02.md"
              - "agentplane-roadmap-r2/tasks/BP-03.md"
              - "agentplane-roadmap-r2/tasks/BP-04.md"
              - "agentplane-roadmap-r2/tasks/BP-05.md"
              - "agentplane-roadmap-r2/tasks/BP-06.md"
              - "agentplane-roadmap-r2/tasks/BP-07.md"
              - "agentplane-roadmap-r2/tasks/BP-08.md"
              - "agentplane-roadmap-r2/tasks/BP-09.md"
              - "agentplane-roadmap-r2/tasks/BP-10.md"
              - "agentplane-roadmap-r2/tasks/BP-11.md"
              - "agentplane-roadmap-r2/tasks/BP-12.md"
              - "agentplane-roadmap-r2/tasks/BP-13.md"
              - "agentplane-roadmap-r2/tasks/BP-14.md"
              - "agentplane-roadmap-r2/tasks/BP-15.md"
              - "agentplane-roadmap-r2/tasks/BP-16.md"
              - "agentplane-roadmap-r2/tasks/BP-17.md"
              - "agentplane-roadmap-r2/tasks/BP-18.md"
              - "agentplane-roadmap-r2/tasks/BP-19.md"
              - "agentplane-roadmap-r2/tasks/BP-20.md"
              - "agentplane-roadmap-r2/tasks/BP-21.md"
              - "agentplane-roadmap-r2/tasks/BP-22.md"
              - "agentplane-roadmap-r2/tasks/BP-23.md"
              - "agentplane-roadmap-r2/tasks/BP-24.md"
              - "agentplane-roadmap-r2/tasks/BP-25.md"
              - "agentplane-roadmap-r2/tasks/BP-26.md"
              - "agentplane-roadmap-r2/tasks/BP-27.md"
              - "agentplane-roadmap-r2/tasks/BP-28.md"
              - "agentplane-roadmap-r2/tasks/BP-29.md"
              - "agentplane-roadmap-r2/tasks/BP-30.md"
              - "agentplane-roadmap-r2/tasks/BP-31.md"
              - "agentplane-roadmap-r2/tasks/EV-01.md"
              - "agentplane-roadmap-r2/tasks/EV-02.md"
              - "agentplane-roadmap-r2/tasks/EV-03.md"
              - "agentplane-roadmap-r2/tasks/EV-04.md"
              - "agentplane-roadmap-r2/tasks/EV-05.md"
              - "agentplane-roadmap-r2/tasks/EV-06.md"
              - "agentplane-roadmap-r2/tasks/EV-07.md"
              - "agentplane-roadmap-r2/tasks/EV-08.md"
              - "agentplane-roadmap-r2/tasks/EV-09.md"
              - "agentplane-roadmap-r2/tasks/EV-10.md"
              - "agentplane-roadmap-r2/tasks/EV-11.md"
              - "agentplane-roadmap-r2/tasks/EV-12.md"
              - "agentplane-roadmap-r2/tasks/EV-13.md"
              - "agentplane-roadmap-r2/tasks/LC-01.md"
              - "agentplane-roadmap-r2/tasks/LC-02.md"
              - "agentplane-roadmap-r2/tasks/LC-03.md"
              - "agentplane-roadmap-r2/tasks/LC-04.md"
              - "agentplane-roadmap-r2/tasks/LC-05.md"
              - "agentplane-roadmap-r2/tasks/LC-06.md"
              - "agentplane-roadmap-r2/tasks/LC-07.md"
              - "agentplane-roadmap-r2/tasks/LC-08.md"
              - "agentplane-roadmap-r2/tasks/LC-09.md"
              - "agentplane-roadmap-r2/tasks/LC-10.md"
              - "agentplane-roadmap-r2/tasks/LC-11.md"
              - "agentplane-roadmap-r2/tasks/LC-12.md"
              - "agentplane-roadmap-r2/tasks/LC-13.md"
              - "agentplane-roadmap-r2/tasks/LC-14.md"
              - "agentplane-roadmap-r2/tasks/LC-15.md"
              - "agentplane-roadmap-r2/tasks/LC-16.md"
              - "agentplane-roadmap-r2/tasks/LC-17.md"
              - "agentplane-roadmap-r2/tasks/LC-18.md"
              - "agentplane-roadmap-r2/tasks/LC-19.md"
              - "agentplane-roadmap-r2/tasks/LC-20.md"
              - "agentplane-roadmap-r2/tasks/LC-21.md"
              - "agentplane-roadmap-r2/tasks/LC-22.md"
              - "agentplane-roadmap-r2/tasks/LC-23.md"
              - "agentplane-roadmap-r2/tasks/PL-01.md"
              - "agentplane-roadmap-r2/tasks/PL-02.md"
              - "agentplane-roadmap-r2/tasks/PL-03.md"
              - "agentplane-roadmap-r2/tasks/PL-04.md"
              - "agentplane-roadmap-r2/tasks/PL-05.md"
              - "agentplane-roadmap-r2/tasks/PL-06.md"
              - "agentplane-roadmap-r2/tasks/PL-07.md"
              - "agentplane-roadmap-r2/tasks/PL-08.md"
              - "agentplane-roadmap-r2/tasks/PL-09.md"
              - "agentplane-roadmap-r2/tasks/PL-10.md"
              - "agentplane-roadmap-r2/tasks/PL-11.md"
              - "agentplane-roadmap-r2/tasks/PL-12.md"
              - "agentplane-roadmap-r2/tasks/RC-01.md"
              - "agentplane-roadmap-r2/tasks/RC-02.md"
              - "agentplane-roadmap-r2/tasks/RC-03.md"
              - "agentplane-roadmap-r2/tasks/RC-04.md"
              - "agentplane-roadmap-r2/tasks/RC-05.md"
              - "agentplane-roadmap-r2/tasks/RC-06.md"
              - "agentplane-roadmap-r2/tasks/RC-07.md"
              - "agentplane-roadmap-r2/tasks/RC-08.md"
              - "agentplane-roadmap-r2/tasks/RC-09.md"
              - "agentplane-roadmap-r2/tasks/RC-10.md"
              - "agentplane-roadmap-r2/tasks/RC-11.md"
              - "agentplane-roadmap-r2/tasks/RC-12.md"
              - "agentplane-roadmap-r2/tasks/RC-13.md"
              - "agentplane-roadmap-r2/tasks/RC-14.md"
              - "agentplane-roadmap-r2/tasks/RC-15.md"
              - "agentplane-roadmap-r2/tasks/RC-16.md"
              - "agentplane-roadmap-r2/tasks/RC-17.md"
              - "agentplane-roadmap-r2/tasks/RC-18.md"
              - "agentplane-roadmap-r2/tasks/ST-01.md"
              - "agentplane-roadmap-r2/tasks/ST-02.md"
              - "agentplane-roadmap-r2/tasks/ST-03.md"
              - "agentplane-roadmap-r2/tasks/ST-04.md"
              - "agentplane-roadmap-r2/tasks/ST-05.md"
              - "agentplane-roadmap-r2/tasks/ST-06.md"
              - "agentplane-roadmap-r2/tasks/ST-07.md"
              - "agentplane-roadmap-r2/tasks/ST-08.md"
              - "agentplane-roadmap-r2/tasks/ST-09.md"
              - "agentplane-roadmap-r2/tasks/ST-10.md"
              - "agentplane-roadmap-r2/tasks/ST-11.md"
              - "agentplane-roadmap-r2/tasks/ST-12.md"
              - "agentplane-roadmap-r2/tasks/ST-13.md"
              - "agentplane-roadmap-r2/tasks/ST-14.md"
              - "agentplane-roadmap-r2/tasks/ST-15.md"
              - "agentplane-roadmap-r2/tasks/ST-16.md"
              - "agentplane-roadmap-r2/tasks/ST-17.md"
              - "agentplane-roadmap-r2/tasks/ST-18.md"
              - "agentplane-roadmap-r2/tasks/ST-19.md"
              - "agentplane-roadmap-r2/tasks/ST-20.md"
              - "agentplane-roadmap-r2/tasks/ST-21.md"
              - "agentplane-roadmap-r2/validate_roadmap.py"
              - "agentplane-roadmap-r2/validation-report.json"
            git:
              kind: "commit"
              ref: null
              sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609121424-49XXT3"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run release:check"
                id: "release_check"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run release:prepublish"
                id: "release_prepublish"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                id: "scope_hygiene"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "hosted_integration"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "publish_manifest"
                kind: "structural"
                required: true
              -
                capability: "task.verify"
                id: "github_release"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "registry_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "installer_readback"
                kind: "provider"
                required: true
              -
                capability: "task.verify"
                id: "default_branch_readback"
                kind: "provider"
                required: true
            criteria:
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "scope_hygiene"
                description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                id: "candidate_exact"
                required: true
              -
                check_ids:
                  - "release_check"
                  - "release_prepublish"
                  - "hosted_integration"
                description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                id: "candidate_qualified"
                required: true
              -
                check_ids:
                  - "publish_manifest"
                  - "github_release"
                description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                id: "publication_exact"
                required: true
              -
                check_ids:
                  - "registry_readback"
                  - "installer_readback"
                  - "default_branch_readback"
                description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                id: "distribution_verified"
                required: true
              -
                check_ids:
                  - "scope_hygiene"
                  - "default_branch_readback"
                description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                id: "post_publish_complete"
                required: true
            evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "scope_hygiene"
                    description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                    id: "candidate_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 1000000
                  optional_sources:
                    - "docs/releases/v0.7.8-evidence"
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                    - "docs/releases/v0.7.8.md"
                  symbol_hints:
                    - "release plan"
                    - "version parity"
                    - "release notes"
                depends_on: []
                expected_outputs:
                  - "stable_candidate_diff"
                  - "release_notes_and_evidence"
                  - "exact_candidate_sha"
                id: "prepare_candidate"
                objective: "Freeze d03a5e786 as the release base and prepare stable 0.7.9 versions, internal pins, generated release surfaces, release notes, and evidence without semantic source changes."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "release-candidate-worktree"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/WORKFLOW.md"
                  -
                    kind: "path"
                    mode: "write"
                    resource: ".agentplane/config.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/docs/releases/v0.7.9.png"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "website/static/img/social/manifest.json"
                risk: "high"
                scope_roots:
                  - ".agentplane/WORKFLOW.md"
                  - ".agentplane/config.json"
                  - ".agentplane/tasks/202609121424-49XXT3"
                  - "docs/assets"
                  - "docs/reference/generated-reference.mdx"
                  - "docs/releases/v0.7.9-evidence"
                  - "docs/releases/v0.7.9.md"
                  - "package.json"
                  - "packages"
                  - "scripts/baselines"
                  - "website/static/img/social/docs/releases/v0.7.9-evidence/preparation.png"
                  - "website/static/img/social/docs/releases/v0.7.9.png"
                  - "website/static/img/social/manifest.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "scope_hygiene"
                      description: "The release candidate promotes every canonical 0.7.9-beta.1 version and internal pin to stable 0.7.9, adds complete release notes and evidence, and introduces no semantic source change."
                      id: "candidate_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "release_check"
                      - "release_prepublish"
                      - "hosted_integration"
                    description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                    id: "candidate_qualified"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "verification"
                    - "quality review"
                    - "hosted integration"
                depends_on:
                  - "prepare_candidate"
                expected_outputs:
                  - "independent_evaluator_verdict"
                  - "green_hosted_candidate_checks"
                  - "qualified_main_sha"
                id: "qualify_integrate"
                objective: "Qualify the exact release candidate, obtain independent review and hosted checks, and integrate it through the protected AgentPlane merge lane and hosted close."
                optional: false
                priority: 2
                required_inputs:
                  - "exact_candidate_sha"
                  - "release_notes_and_evidence"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-lane"
                risk: "high"
                scope_roots:
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run release:check"
                      id: "release_check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run release:prepublish"
                      id: "release_prepublish"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      id: "hosted_integration"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "release_check"
                        - "release_prepublish"
                        - "hosted_integration"
                      description: "The exact committed candidate passes local release gates, independent evaluation, hosted CI, protected integration, and hosted close."
                      id: "candidate_qualified"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "publish_manifest"
                      - "github_release"
                    description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                    id: "publication_exact"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources: []
                  required_sources:
                    - ".agentplane/policy/workflow.release.md"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "publish-result.json"
                    - "release-ready"
                depends_on:
                  - "qualify_integrate"
                expected_outputs:
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                  - "exact_sha_publish_result"
                id: "publish_stable"
                objective: "Publish v0.7.9 from the exact qualified main SHA through the protected release workflow and preserve canonical publication evidence."
                optional: false
                priority: 3
                required_inputs:
                  - "qualified_main_sha"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "release-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "publish_manifest"
                      kind: "structural"
                      required: true
                    -
                      capability: "task.verify"
                      id: "github_release"
                      kind: "provider"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "publish_manifest"
                        - "github_release"
                      description: "The protected publish workflow releases v0.7.9 from the exact qualified main SHA and writes publish-result.json with success=true and an empty failures array."
                      id: "publication_exact"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "registry_readback"
                      - "installer_readback"
                      - "default_branch_readback"
                    description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                    id: "distribution_verified"
                    required: true
                  -
                    check_ids:
                      - "scope_hygiene"
                      - "default_branch_readback"
                    description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                    id: "post_publish_complete"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 500000
                  optional_sources:
                    - "public GHCR metadata"
                  required_sources:
                    - ".agentplane/.release/publish/publish-result.json"
                    - ".agentplane/tasks/202609121424-49XXT3/README.md"
                  symbol_hints:
                    - "agentplane"
                    - "ap"
                    - "Homebrew"
                    - "Scoop"
                    - "setup-agentplane"
                depends_on:
                  - "publish_stable"
                expected_outputs:
                  - "independent_distribution_readback"
                  - "verified_cli_entrypoints"
                  - "final_main_and_next_beta_evidence"
                  - "residual_limitations"
                id: "verify_distribution"
                objective: "Independently verify all public 0.7.9 artifacts and installers, record limitations precisely, and complete the AgentPlane-managed post-publish evidence and next-beta follow-up."
                optional: false
                priority: 4
                required_inputs:
                  - "exact_sha_publish_result"
                  - "v0_7_9_github_release"
                  - "published_npm_packages"
                resource_claims:
                  -
                    kind: "provider_queue"
                    mode: "read"
                    resource: "release-readback-v0.7.9"
                risk: "high"
                scope_roots:
                  - ".agentplane/.release"
                  - ".agentplane/tasks/202609121424-49XXT3"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "registry_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "installer_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "default_branch_readback"
                      kind: "provider"
                      required: true
                    -
                      capability: "task.verify"
                      id: "scope_hygiene"
                      kind: "structural"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "registry_readback"
                        - "installer_readback"
                        - "default_branch_readback"
                      description: "Independent readback verifies package registries, assets and checksums, setup-agentplane, Homebrew, Scoop, both CLI entrypoints, and final default-branch state."
                      id: "distribution_verified"
                      required: true
                    -
                      check_ids:
                        - "scope_hygiene"
                        - "default_branch_readback"
                      description: "Post-publish evidence is committed through AgentPlane and the next patch beta opens only after public 0.7.9 proof; unrelated untracked paths remain preserved."
                      id: "post_publish_complete"
                      required: true
                  evidence_fingerprint: "sha256:08e623aa8e62234e358d889c3c8857772bad3fb84df87657f5ba597807e8cb08"
                  schema_version: 1
        revision: 3
        schema_version: 1
        task_id: "202609121424-49XXT3"
    revision: 18
    schema_version: 1
    updated_at: "2026-09-13T23:17:35.778Z"
    work_items:
      prepare_candidate:
        attempt: 0
        claim_id: null
        id: "prepare_candidate"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      publish_stable:
        attempt: 0
        claim_id: null
        id: "publish_stable"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      qualify_integrate:
        attempt: 0
        claim_id: null
        id: "qualify_integrate"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      verify_distribution:
        attempt: 0
        claim_id: null
        id: "verify_distribution"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-13T23:01:21.946Z"
        from: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
        to: "sha256:24582bb56476c1224e61f81d96fb931933fa4d48bde7b85ad1d6778ed4b24cbc"
        actor_id: "external:EXECUTOR"
        cause_refs: []
        entity: "plan"
        id: "event_09e51e2ff0846e81e8db19cd"
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-357f96ca071f158ceb929079"
        plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-49XXT3"
        task_revision: 6
        work_item_id: null
    leases: []
    mutation_receipts:
      compatibility:sha256:046ef3d623a69511cecc08b34cefc3449d060dba8558b29211086e726db3ceb3:
        aggregate_digest: "sha256:1e8ddc402af0dbaa4a8de58f965c314f73afd70122a1e21678777c6b79c14ead"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T22:53:16.170Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_426f27761a62ae0e06c0431f"
          mutation_id: "compatibility:sha256:046ef3d623a69511cecc08b34cefc3449d060dba8558b29211086e726db3ceb3"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 3
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:046ef3d623a69511cecc08b34cefc3449d060dba8558b29211086e726db3ceb3"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:04d84de5a28c9e18f8ad8128a4b2fe7726bd470a77062c7058a756ab9836b551:
        aggregate_digest: "sha256:ff42920bca0cea490f64a8a516c68709732b961ee50f1259fd57447b7453731e"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:13:10.761Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_7d58a4a2a85b9933836f03c6"
          mutation_id: "compatibility:sha256:04d84de5a28c9e18f8ad8128a4b2fe7726bd470a77062c7058a756ab9836b551"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 14
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:04d84de5a28c9e18f8ad8128a4b2fe7726bd470a77062c7058a756ab9836b551"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:0cafa24e14d99512972b84dcd3bca0a3022c8db6f75f43959a3fd354e55f8602:
        aggregate_digest: "sha256:e3239e63b31f6f03a8c3077e8ee8068b2124f0e0af71aa92879aa10f6190a001"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:07:23.950Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_80e479e56b0a3f441e45109d"
          mutation_id: "compatibility:sha256:0cafa24e14d99512972b84dcd3bca0a3022c8db6f75f43959a3fd354e55f8602"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 10
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:0cafa24e14d99512972b84dcd3bca0a3022c8db6f75f43959a3fd354e55f8602"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:105fee53b8a8af1b4d98c45ab682b297f43be70376c22b90b188aa52fd0df8cd:
        aggregate_digest: "sha256:cfb0091efde65e83f7084169ed081c00b03bbb27a4bcc2ee6b5691205ce72676"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T22:53:16.172Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_98bb6ebbe54c013e6aa8b1da"
          mutation_id: "compatibility:sha256:105fee53b8a8af1b4d98c45ab682b297f43be70376c22b90b188aa52fd0df8cd"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:105fee53b8a8af1b4d98c45ab682b297f43be70376c22b90b188aa52fd0df8cd"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:6ccf1e02c3feff59051a50a582b3058d6af2c7c50e16e050663ed5a6947b097e:
        aggregate_digest: "sha256:9926d4f6961e785dd78313a05d5bfe91f3b380065f2528f58042e8fd0e2a8cef"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:03:44.698Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_5282cc51086ee1d79f381a39"
          mutation_id: "compatibility:sha256:6ccf1e02c3feff59051a50a582b3058d6af2c7c50e16e050663ed5a6947b097e"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 7
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:6ccf1e02c3feff59051a50a582b3058d6af2c7c50e16e050663ed5a6947b097e"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:96f7310412316b0dba40ec2e3e025ff2aa898261d8b34987df9345eeb138d716:
        aggregate_digest: "sha256:70449a1ad5412a24658da1ba64eaebaab13b48c1a223d8d722f57a9a9ae2fab9"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:17:35.778Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b6cc5af0b3fe4dee524c89b8"
          mutation_id: "compatibility:sha256:96f7310412316b0dba40ec2e3e025ff2aa898261d8b34987df9345eeb138d716"
          plan_digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 15
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:96f7310412316b0dba40ec2e3e025ff2aa898261d8b34987df9345eeb138d716"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:a7d45aee995566076a18d8eb39dd713b1dc66734a91bf0a72b74c4ddc3a73ade:
        aggregate_digest: "sha256:408c1ec37701da5c9259625091e1645a362b912157473d9bd1011b301bd98fc2"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T22:57:11.849Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c753d15c8af88512ee0bcc2f"
          mutation_id: "compatibility:sha256:a7d45aee995566076a18d8eb39dd713b1dc66734a91bf0a72b74c4ddc3a73ade"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a7d45aee995566076a18d8eb39dd713b1dc66734a91bf0a72b74c4ddc3a73ade"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:ad5871f28271f26e7ad99b3a297cb86d985bc596cfef42a9365883cd1df3b8a9:
        aggregate_digest: "sha256:4d3b7338c297e8010911c7815bd1d61eb076864551a03eb5f23691aec0395c9c"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:17:35.778Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_abe1dabf124a0b7972868fe3"
          mutation_id: "compatibility:sha256:ad5871f28271f26e7ad99b3a297cb86d985bc596cfef42a9365883cd1df3b8a9"
          plan_digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 16
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:ad5871f28271f26e7ad99b3a297cb86d985bc596cfef42a9365883cd1df3b8a9"
        next_revision: 17
        previous_revision: 16
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:cc12436d82e1fc92fb5205c4a12aac03ea968defa3d06a8b39fa165b39ad67ee:
        aggregate_digest: "sha256:a3df4e024aad4766d649f76ad116f63cb5c8e88fef4597198b17d12c883f48f5"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:03:44.698Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_132744cdb786aba96bd255bd"
          mutation_id: "compatibility:sha256:cc12436d82e1fc92fb5205c4a12aac03ea968defa3d06a8b39fa165b39ad67ee"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:cc12436d82e1fc92fb5205c4a12aac03ea968defa3d06a8b39fa165b39ad67ee"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:d235f5333939dc9ff195fadd1180abfe75d12db918a97c634e63eae18a8599fd:
        aggregate_digest: "sha256:01e24eb53b8cc1114bb940ab244ad72ee0e9a69a5b653e9543e3799028a9225f"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:08:20.260Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_b665e5f518da35f40d00a0e7"
          mutation_id: "compatibility:sha256:d235f5333939dc9ff195fadd1180abfe75d12db918a97c634e63eae18a8599fd"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d235f5333939dc9ff195fadd1180abfe75d12db918a97c634e63eae18a8599fd"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:ded7f65036725d24b1ddeb3e97ae201bf892c6b86204984f783b076dc3583f88:
        aggregate_digest: "sha256:8a1a55678c4442eefb8e7d129f7fbebd00c567de025d4b46621049f566bb3e91"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:17:35.778Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_089e5af8b2d4f7c522d37bbd"
          mutation_id: "compatibility:sha256:ded7f65036725d24b1ddeb3e97ae201bf892c6b86204984f783b076dc3583f88"
          plan_digest: "sha256:29082d9365393fc1fc46fa8b1020d089d926673a2e63df4382683bd7717a7509"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 17
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ded7f65036725d24b1ddeb3e97ae201bf892c6b86204984f783b076dc3583f88"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:f943c80d309cd21e7572c292933d541957390452136eaf26b2e5b8360086820f:
        aggregate_digest: "sha256:59f999ba0cb5832a58f63e98a719e85f0cde09eac64c57fd478d6c088c9a1290"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:13:10.761Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_a6099804ca4faafa3f7b9ee8"
          mutation_id: "compatibility:sha256:f943c80d309cd21e7572c292933d541957390452136eaf26b2e5b8360086820f"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 12
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:f943c80d309cd21e7572c292933d541957390452136eaf26b2e5b8360086820f"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:fb084963bb1d968abf870aa3a833bd8e091f8cdd124fccb25b16de2c2c441b8e:
        aggregate_digest: "sha256:4a3caf0f179c302a281e9553368d69daca88e2485378533831128c532be4be3d"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:03:44.698Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_e0fcd4064689837a2222fb58"
          mutation_id: "compatibility:sha256:fb084963bb1d968abf870aa3a833bd8e091f8cdd124fccb25b16de2c2c441b8e"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 8
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:fb084963bb1d968abf870aa3a833bd8e091f8cdd124fccb25b16de2c2c441b8e"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609121424-49XXT3"
      compatibility:sha256:fbf69fdbd7c38fe36a003b2ea000b370cbc69d9f9d979cc0bef0854976737626:
        aggregate_digest: "sha256:c1c9463018af1be82dc24a0fa917c39ebf84eccdd7b49fcb452891080d2d7851"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T23:13:10.761Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_90bed59ee431c5e3a70d2a3e"
          mutation_id: "compatibility:sha256:fbf69fdbd7c38fe36a003b2ea000b370cbc69d9f9d979cc0bef0854976737626"
          plan_digest: "sha256:bbde63d3c4bfef9a5a3e4e703a3d291f1fc7284d518d2e4e12bb2fb896b6685b"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 13
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:fbf69fdbd7c38fe36a003b2ea000b370cbc69d9f9d979cc0bef0854976737626"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609121424-49XXT3"
      plan-refinement:work-order-202609121424-49XXT3-executor-357f96ca071f158ceb929079:
        aggregate_digest: "sha256:b31d2c603a5a552f448f5af1c0488402aedc0fc4cf5b392656c4c416a2f881bc"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-13T23:01:21.946Z"
          cause_refs: []
          entity: "plan"
          from: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          id: "event_09e51e2ff0846e81e8db19cd"
          mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-357f96ca071f158ceb929079"
          plan_digest: "sha256:b60009385881a9948ab9650dbcfdceb73d95c42fed33418aa4c5510198d4176e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-49XXT3"
          task_revision: 6
          to: "sha256:24582bb56476c1224e61f81d96fb931933fa4d48bde7b85ad1d6778ed4b24cbc"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121424-49XXT3-executor-357f96ca071f158ceb929079"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609121424-49XXT3"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "f3c1991ddd92943775b6b4b4688009afc3d523bc"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "ecfccc5ad0230fc1876a319be0af5cdb530c339f"
    version: 1
id_source: "generated"
---
## Summary

Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA

Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.

## Scope

- In scope: Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.
- Out of scope: unrelated refactors not required for "Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA".

## Plan

Plan the stable 0.7.9 candidate, qualify and integrate its exact SHA, publish it through the protected release workflow, and verify every public distribution surface before opening the next beta.

## Verify Steps

1. Run `bun run release:check`. Expected: version parity, generated release surfaces, package manifests, and release policy checks pass for 0.7.9.
2. Run `bun run release:prepublish`. Expected: the complete prepublish gate passes for the exact release candidate without skipped mandatory checks.
3. Review `git diff --check`, the exact task diff, and `git status --short --untracked-files=all`. Expected: only approved release metadata, documentation, package version surfaces, baseline evidence, and AgentPlane task artifacts changed; `agentplane-roadmap-r2` and unrelated user work are not committed.
4. Complete AgentPlane verification and hosted branch protection for the release-ready candidate. Expected: the accepted release commit is integrated into `main`, hosted checks are successful, and `origin/main` resolves to the exact qualified publish SHA.
5. Publish v0.7.9 only through the AgentPlane release route after an exact fresh publish-authority grant. Expected: `.agentplane/.release/publish/publish-result.json` records `success=true`, an empty `failures` array, version 0.7.9, and the exact qualified main SHA.
6. Independently read back the GitHub v0.7.9 tag and release. Expected: the tag resolves to the qualified publish SHA and every required release asset and checksum is present.
7. Independently read back all npm package versions and install the published packages in clean temporary directories. Expected: every public AgentPlane package reports 0.7.9 and both `agentplane` and `ap` entrypoints execute successfully.
8. Independently verify `setup-agentplane`, Homebrew, and Scoop distribution surfaces and perform their documented clean install smoke checks when the release route provides them. Expected: every required surface resolves to 0.7.9 and its expected checksum; any unavailable anonymous GHCR read is recorded separately without being misreported as success.
9. Re-fetch the default branch and provider state after publication. Expected: `origin/main`, the canonical release evidence, the tag, registries, and distribution surfaces agree on the same released SHA and version.
10. Complete the required post-publish evidence follow-up and start the next patch beta only through fresh AgentPlane-managed tasks and authority packets. Expected: no lifecycle or external action is inferred from prose, and any genuine provider or evidence boundary is reported explicitly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
