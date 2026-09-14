---
id: "202609142255-KR5FPV"
title: "Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "network"
  - "merge"
  - "publish"
  - "external_system"
blueprint_request: "release.strict"
verify:
  - "bun run ci:local:full"
  - "bun run test:platform-critical"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-14T22:58:30.973Z"
  updated_by: "HOST:local:USER"
  note: "host_user_decision=sha256:093098e9e417da97bf378aec398625aed46300adeec16d4f272bf5890fb2f1a6"
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
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
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
      - ".agentplane/tasks/202609142255-KR5FPV"
      - "bun.lock"
      - "package.json"
      - "packages/agentplane/package.json"
      - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Publication must use the exact merged maintenance SHA for v0.6.30."
      - "The branch_pr route isolates the maintenance change and supplies hosted evidence."
      - "The change backports an existing guard from v0.7.8 instead of inventing a new mechanism."
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - ".agentplane/tasks/202609142255-KR5FPV"
      - "bun.lock"
      - "package.json"
      - "packages/agentplane/package.json"
      - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
      - "packages/core/package.json"
      - "packages/recipes/package.json"
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
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
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
          - ".agentplane/tasks/202609142255-KR5FPV"
          - "bun.lock"
          - "package.json"
          - "packages/agentplane/package.json"
          - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
          - "packages/core/package.json"
          - "packages/recipes/package.json"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:8d3a431d4e46918a9ba138af56ee1a14342e314b193df26292a4cad8c77563fa"
      escalation_reasons:
        - "central_component:bun.lock"
        - "central_component:package.json"
        - "central_component:packages/core/package.json"
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
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-09-14T22:58:33.303Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-14T22:58:33.303Z"
doc_updated_by: "CODER"
description: "On the authoritative codex/release-v0.6.27-reclaim-fix maintenance branch, retain the v0.6.29 pre-removal unlink defense and backport the v0.7.8 source-layout guard so a worktree node_modules junction is created only from a repository-local source outside every task worktree with valid direct dependency targets. Add focused regression coverage, qualify the exact release candidate, merge only into the 0.6 maintenance branch, publish 0.6.30, and verify exact-SHA distribution evidence. Do not modify main."
sections:
  Summary: |-
    Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30

    On the authoritative codex/release-v0.6.27-reclaim-fix maintenance branch, retain the v0.6.29 pre-removal unlink defense and backport the v0.7.8 source-layout guard so a worktree node_modules junction is created only from a repository-local source outside every task worktree with valid direct dependency targets. Add focused regression coverage, qualify the exact release candidate, merge only into the 0.6 maintenance branch, publish 0.6.30, and verify exact-SHA distribution evidence. Do not modify main.
  Scope: |-
    - In scope: On the authoritative codex/release-v0.6.27-reclaim-fix maintenance branch, retain the v0.6.29 pre-removal unlink defense and backport the v0.7.8 source-layout guard so a worktree node_modules junction is created only from a repository-local source outside every task worktree with valid direct dependency targets. Add focused regression coverage, qualify the exact release candidate, merge only into the 0.6 maintenance branch, publish 0.6.30, and verify exact-SHA distribution evidence. Do not modify main.
    - Out of scope: unrelated refactors not required for "Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30".
  Plan: "Backport the proven install-layout guard, verify it, and publish v0.6.30 from the maintenance branch."
  Verify Steps: |-
    1. Run `bun run test:platform-critical`. Expected: the install-layout guard rejects external and task-worktree-owned sources, accepts a valid repository-local layout, and the platform-critical suite passes.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: repository policy routing passes.
    3. Run `bun run ci:local:full`. Expected: the full local regression suite passes on the exact task head.
    4. Inspect the final diff. Expected: the v0.6.29 pre-removal unlink defense remains and no file on `main` changes.
    5. Verify hosted CI and the maintenance PR target. Expected: all required checks pass and the PR targets only `codex/release-v0.6.27-reclaim-fix`.
    6. Verify the v0.6.30 publication against the exact merged SHA. Expected: npm packages, CLI install smoke, tag, GitHub Release, distribution assets, and GHCR are confirmed or any credential-gated channel is explicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:local:USER"
    approval_evidence_digest: "sha256:093098e9e417da97bf378aec398625aed46300adeec16d4f272bf5890fb2f1a6"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:f1f6e94eaecd0be2b4c4294a149545adedf207442b33c4447176d177ef6e4ace"
    digest: "sha256:eff499b84b0e72a1c8fe77eb5438c5f2c9b45c13527ecd5e5ee0b54365b6d04b"
    grant_id: "69799c7e-e468-41b5-bf13-10c74193f88f"
    issued_at: "2026-09-14T22:58:30.973Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:cb534e806d9f9bf1320652df8a02b16ce0ee3872617109d1f0779ad74b5502ef"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:d4cb8691d9d51d1f8d5f6ac82dc1b103fa8f89092a25b1a426a9bb66cf9f8265"
    status: "active"
    task_id: "202609142255-KR5FPV"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-14T22:58:30.973Z"
        approved_by: "HOST:local:USER"
        approved_digest: "sha256:cb3b0df8355f15e5e1ccd768b58458bbb80b70b9b69abeecd6c23317b7a3d16f"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-14T22:56:58.707Z"
      digest: "sha256:cb3b0df8355f15e5e1ccd768b58458bbb80b70b9b69abeecd6c23317b7a3d16f"
      proposal:
        assumptions:
          - "The current user approval covers the corrected v0.6-only plan, merge, and v0.6.30 publication."
          - "The authoritative integration base remains codex/release-v0.6.27-reclaim-fix."
          - "main remains unchanged."
        planning_baseline:
          captured_at: "2026-09-14T22:55:39.777Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:e8c5f8a732f7329ef61b4ed77bdedf8ab1d6201f5e01f224c7f71fbceb366e37"
          dirty_paths:
            - ".agentplane/tasks/202609072121-9VEHKH/README.md"
            - ".agentplane/tasks/202609080727-BAWTEE/README.md"
            - ".agentplane/tasks/202609130146-7AZ4T4/README.md"
            - ".agentplane/tasks/202609130319-MHRRRF/README.md"
            - ".agentplane/tasks/202609130319-X96Z3Q/README.md"
            - ".agentplane/tasks/202609130320-EFMSMR/README.md"
            - ".agentplane/tasks/202609130320-EFMSMR/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
            - ".agentplane/tasks/202609130320-EFMSMR/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
            - ".agentplane/tasks/202609130320-EFMSMR/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
            - ".agentplane/tasks/202609130320-EFMSMR/supervision/declared-checks.json"
            - ".agentplane/tasks/202609130352-Q99M4K/README.md"
            - ".agentplane/tasks/202609130352-Q99M4K/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
            - ".agentplane/tasks/202609130352-Q99M4K/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
            - ".agentplane/tasks/202609130402-QWV6VX/README.md"
            - ".agentplane/tasks/202609130402-QWV6VX/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
            - ".agentplane/tasks/202609130402-QWV6VX/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
            - ".agentplane/tasks/202609130402-QWV6VX/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
            - ".agentplane/tasks/202609130402-QWV6VX/supervision/declared-checks.json"
            - ".agentplane/tasks/202609130414-G8VK36/README.md"
            - ".agentplane/tasks/202609130414-G8VK36/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
            - ".agentplane/tasks/202609130414-G8VK36/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
            - ".agentplane/tasks/202609130420-X9CKTH/README.md"
            - ".agentplane/tasks/202609130420-X9CKTH/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
            - ".agentplane/tasks/202609130420-X9CKTH/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
            - ".agentplane/tasks/202609130420-X9CKTH/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
            - ".agentplane/tasks/202609130420-X9CKTH/supervision/declared-checks.json"
            - ".agentplane/tasks/202609130428-9GY63X/README.md"
            - ".agentplane/tasks/202609130428-9GY63X/quality/objects/sha256/3d0cad2f206a825324ecfa99591f571cbef27cfcd4cc0826a14682c0726c697d.json"
            - ".agentplane/tasks/202609130428-9GY63X/quality/objects/sha256/5404e4f80074675cc911e313ac7ead8157492b68fa4c1a9bc85f094f038d9414.json"
            - ".agentplane/tasks/202609130428-9GY63X/quality/objects/sha256/78dd518372ace9dcbe508e9366b5020456fbc1d869ce4e6ce802a4dd9ecd357a.json"
            - ".agentplane/tasks/202609130428-9GY63X/supervision/declared-checks.json"
            - ".agentplane/tasks/202609141102-6MNB16/README.md"
            - ".agentplane/tasks/202609141102-6MNB16/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202609141710-V4WQXD/README.md"
            - ".agentplane/tasks/202609142255-KR5FPV/README.md"
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
            - "agentplane-roadmap-r2/tasks/LC-24.md"
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
            - "packages/agentplane/src/adapters/task-backend/kernel-plan-rejection-recovery.ts"
            - "packages/agentplane/src/cli/run-cli.roadmap-plan-recovery.test.ts"
          git:
            kind: "commit"
            ref: null
            sha: "a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609142255-KR5FPV"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:platform-critical"
              id: "check-platform"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "node .agentplane/policy/check-routing.mjs"
              id: "check-routing"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "check-full"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              id: "check-semantic-review"
              kind: "semantic"
              required: true
            -
              capability: "task.verify"
              id: "check-hosted"
              kind: "provider"
              required: true
            -
              capability: "task.verify"
              id: "check-release-provider"
              kind: "provider"
              required: true
          criteria:
            -
              check_ids:
                - "check-platform"
                - "check-semantic-review"
              description: "The v0.6 worktree materializer reuses node_modules only when the resolved install layout is inside the repository, outside every task worktree, and each declared direct dependency resolves to a repository-owned package target with package.json."
              id: "criterion-source-guard"
              required: true
            -
              check_ids:
                - "check-platform"
                - "check-semantic-review"
              description: "The existing v0.6.29 pre-removal unlink defense remains active for AgentPlane-owned worktree removal paths."
              id: "criterion-defense-depth"
              required: true
            -
              check_ids:
                - "check-platform"
                - "check-routing"
                - "check-full"
              description: "Regression tests reject external and task-worktree-owned layouts and accept a valid repository-local layout."
              id: "criterion-regression"
              required: true
            -
              check_ids:
                - "check-hosted"
              description: "Hosted CI passes for the final task head and the task PR merges only into codex/release-v0.6.27-reclaim-fix."
              id: "criterion-hosted"
              required: true
            -
              check_ids:
                - "check-release-provider"
              description: "AgentPlane v0.6.30 is published from the exact merged maintenance SHA and every claimed channel is verified from provider state."
              id: "criterion-release"
              required: true
          evidence_fingerprint: "sha256:e8c5f8a732f7329ef61b4ed77bdedf8ab1d6201f5e01f224c7f71fbceb366e37"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-platform"
                    - "check-semantic-review"
                  description: "The v0.6 worktree materializer reuses node_modules only when the resolved install layout is inside the repository, outside every task worktree, and each declared direct dependency resolves to a repository-owned package target with package.json."
                  id: "criterion-source-guard"
                  required: true
                -
                  check_ids:
                    - "check-platform"
                    - "check-semantic-review"
                  description: "The existing v0.6.29 pre-removal unlink defense remains active for AgentPlane-owned worktree removal paths."
                  id: "criterion-defense-depth"
                  required: true
                -
                  check_ids:
                    - "check-platform"
                    - "check-routing"
                    - "check-full"
                  description: "Regression tests reject external and task-worktree-owned layouts and accept a valid repository-local layout."
                  id: "criterion-regression"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "v0.7.8 versions of the same implementation and tests"
                required_sources:
                  - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                  - "packages/agentplane/src/commands/shared/worktree-install-layout-links.ts"
                symbol_hints:
                  - "isReusableWorkspaceInstallLayout"
                  - "linkDirectoryIntoWorktree"
                  - "unlinkWorktreeInstallLayout"
              depends_on: []
              expected_outputs:
                - "guard-implementation"
                - "guard-regression-evidence"
              id: "backport-install-layout-guard"
              objective: "Backport the v0.7.8 reusable install-layout guard and focused tests without removing the v0.6.29 pre-removal unlink defense."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                - "packages/agentplane/src/commands/branch/work-start.materialize.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:platform-critical"
                    id: "check-platform"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "node .agentplane/policy/check-routing.mjs"
                    id: "check-routing"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "check-full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    id: "check-semantic-review"
                    kind: "semantic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-platform"
                      - "check-semantic-review"
                    description: "The v0.6 worktree materializer reuses node_modules only when the resolved install layout is inside the repository, outside every task worktree, and each declared direct dependency resolves to a repository-owned package target with package.json."
                    id: "criterion-source-guard"
                    required: true
                  -
                    check_ids:
                      - "check-platform"
                      - "check-semantic-review"
                    description: "The existing v0.6.29 pre-removal unlink defense remains active for AgentPlane-owned worktree removal paths."
                    id: "criterion-defense-depth"
                    required: true
                  -
                    check_ids:
                      - "check-platform"
                      - "check-routing"
                      - "check-full"
                    description: "Regression tests reject external and task-worktree-owned layouts and accept a valid repository-local layout."
                    id: "criterion-regression"
                    required: true
                evidence_fingerprint: "sha256:e8c5f8a732f7329ef61b4ed77bdedf8ab1d6201f5e01f224c7f71fbceb366e37"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-hosted"
                  description: "Hosted CI passes for the final task head and the task PR merges only into codex/release-v0.6.27-reclaim-fix."
                  id: "criterion-hosted"
                  required: true
                -
                  check_ids:
                    - "check-release-provider"
                  description: "AgentPlane v0.6.30 is published from the exact merged maintenance SHA and every claimed channel is verified from provider state."
                  id: "criterion-release"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 140000
                optional_sources:
                  - "GitHub Actions run metadata"
                  - "npm registry metadata"
                  - "GitHub Release metadata"
                  - "GHCR metadata"
                required_sources: []
                symbol_hints:
                  - "v0.6.30"
                  - "codex/release-v0.6.27-reclaim-fix"
              depends_on:
                - "backport-install-layout-guard"
              expected_outputs:
                - "hosted-integration-evidence"
                - "exact-sha-release-evidence"
              id: "qualify-and-verify-release"
              objective: "Qualify the merged maintenance result and verify supervisor-owned v0.6.30 publication from exact provider evidence."
              optional: false
              priority: 2
              required_inputs:
                - "guard-implementation"
                - "guard-regression-evidence"
              resource_claims:
                -
                  kind: "provider_queue"
                  mode: "exclusive"
                  resource: "github-actions-release"
              risk: "high"
              scope_roots:
                - "package.json"
                - "packages/core/package.json"
                - "packages/recipes/package.json"
                - "packages/agentplane/package.json"
                - "bun.lock"
                - ".agentplane/tasks/202609142255-KR5FPV"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "check-hosted"
                    kind: "provider"
                    required: true
                  -
                    capability: "task.verify"
                    id: "check-release-provider"
                    kind: "provider"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-hosted"
                    description: "Hosted CI passes for the final task head and the task PR merges only into codex/release-v0.6.27-reclaim-fix."
                    id: "criterion-hosted"
                    required: true
                  -
                    check_ids:
                      - "check-release-provider"
                    description: "AgentPlane v0.6.30 is published from the exact merged maintenance SHA and every claimed channel is verified from provider state."
                    id: "criterion-release"
                    required: true
                evidence_fingerprint: "sha256:e8c5f8a732f7329ef61b4ed77bdedf8ab1d6201f5e01f224c7f71fbceb366e37"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609142255-KR5FPV"
    event_cursor: 3
    final_validation: null
    id: "202609142255-KR5FPV"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run test:platform-critical"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "node .agentplane/policy/check-routing.mjs"
          id: "legacy-3"
          required: true
      captured_at: "2026-09-14T22:55:34.143Z"
      constraints: []
      request: |-
        Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30

        On the authoritative codex/release-v0.6.27-reclaim-fix maintenance branch, retain the v0.6.29 pre-removal unlink defense and backport the v0.7.8 source-layout guard so a worktree node_modules junction is created only from a repository-local source outside every task worktree with valid direct dependency targets. Add focused regression coverage, qualify the exact release candidate, merge only into the 0.6 maintenance branch, publish 0.6.30, and verify exact-SHA distribution evidence. Do not modify main.
      task_id: "202609142255-KR5FPV"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 5
    schema_version: 1
    updated_at: "2026-09-14T22:58:33.303Z"
    work_items:
      backport-install-layout-guard:
        attempt: 0
        claim_id: null
        id: "backport-install-layout-guard"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      qualify-and-verify-release:
        attempt: 0
        claim_id: null
        id: "qualify-and-verify-release"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events: []
    leases: []
    mutation_receipts:
      compatibility:sha256:2f2c22ddd17a9bc3d8afb2e208eaeba3e5fe897d37259e2bf30b554ea7e207ba:
        aggregate_digest: "sha256:36512a86eb39a59588cec86e8844448f0e228ac5b3379a2bae1964c2854b39a6"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:58:07.240Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_4910c0fd5e63946aa16f1b81"
          mutation_id: "compatibility:sha256:2f2c22ddd17a9bc3d8afb2e208eaeba3e5fe897d37259e2bf30b554ea7e207ba"
          plan_digest: "sha256:cb3b0df8355f15e5e1ccd768b58458bbb80b70b9b69abeecd6c23317b7a3d16f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609142255-KR5FPV"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2f2c22ddd17a9bc3d8afb2e208eaeba3e5fe897d37259e2bf30b554ea7e207ba"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609142255-KR5FPV"
      compatibility:sha256:2fd8d6dc451e07d8136764b682616f8a0c6f4635d47a88151ed4456e024ca1e7:
        aggregate_digest: "sha256:c5f3ed6e367c5472154d14581a8c42d3e2c98edacea6abc3a3044c8f29a7b2c6"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:58:33.303Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_357cc649bc421b0cff44ca6c"
          mutation_id: "compatibility:sha256:2fd8d6dc451e07d8136764b682616f8a0c6f4635d47a88151ed4456e024ca1e7"
          plan_digest: "sha256:cb3b0df8355f15e5e1ccd768b58458bbb80b70b9b69abeecd6c23317b7a3d16f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609142255-KR5FPV"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2fd8d6dc451e07d8136764b682616f8a0c6f4635d47a88151ed4456e024ca1e7"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609142255-KR5FPV"
      compatibility:sha256:af6e3501a2fe5681f40092ac37dc387ec12b7b1748903dbc3d521f275e750f6e:
        aggregate_digest: "sha256:191571a3d48a194258718669ace7fcb476683e5f91f72dd13e895daae1f16399"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T22:58:07.237Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_995c3e600c77a7ac960693d5"
          mutation_id: "compatibility:sha256:af6e3501a2fe5681f40092ac37dc387ec12b7b1748903dbc3d521f275e750f6e"
          plan_digest: "sha256:cb3b0df8355f15e5e1ccd768b58458bbb80b70b9b69abeecd6c23317b7a3d16f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609142255-KR5FPV"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:af6e3501a2fe5681f40092ac37dc387ec12b7b1748903dbc3d521f275e750f6e"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609142255-KR5FPV"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "refs/remotes/origin/codex/release-v0.6.27-reclaim-fix"
    base_sha: "69d023b1de5450a63244e8443662021fba484f81"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "a3ccf6f1927bf5ab3a9cf6612dd7326d68d1f270"
    version: 1
id_source: "generated"
---
## Summary

Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30

On the authoritative codex/release-v0.6.27-reclaim-fix maintenance branch, retain the v0.6.29 pre-removal unlink defense and backport the v0.7.8 source-layout guard so a worktree node_modules junction is created only from a repository-local source outside every task worktree with valid direct dependency targets. Add focused regression coverage, qualify the exact release candidate, merge only into the 0.6 maintenance branch, publish 0.6.30, and verify exact-SHA distribution evidence. Do not modify main.

## Scope

- In scope: On the authoritative codex/release-v0.6.27-reclaim-fix maintenance branch, retain the v0.6.29 pre-removal unlink defense and backport the v0.7.8 source-layout guard so a worktree node_modules junction is created only from a repository-local source outside every task worktree with valid direct dependency targets. Add focused regression coverage, qualify the exact release candidate, merge only into the 0.6 maintenance branch, publish 0.6.30, and verify exact-SHA distribution evidence. Do not modify main.
- Out of scope: unrelated refactors not required for "Backport safe reusable node_modules guards to the 0.6 maintenance branch and publish AgentPlane 0.6.30".

## Plan

Backport the proven install-layout guard, verify it, and publish v0.6.30 from the maintenance branch.

## Verify Steps

1. Run `bun run test:platform-critical`. Expected: the install-layout guard rejects external and task-worktree-owned sources, accepts a valid repository-local layout, and the platform-critical suite passes.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: repository policy routing passes.
3. Run `bun run ci:local:full`. Expected: the full local regression suite passes on the exact task head.
4. Inspect the final diff. Expected: the v0.6.29 pre-removal unlink defense remains and no file on `main` changes.
5. Verify hosted CI and the maintenance PR target. Expected: all required checks pass and the PR targets only `codex/release-v0.6.27-reclaim-fix`.
6. Verify the v0.6.30 publication against the exact merged SHA. Expected: npm packages, CLI install smoke, tag, GitHub Release, distribution assets, and GHCR are confirmed or any credential-gated channel is explicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
