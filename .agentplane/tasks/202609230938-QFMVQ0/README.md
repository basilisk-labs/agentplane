---
id: "202609230938-QFMVQ0"
title: "Recover the same AgentPlane task after a planner result fails instead of requiring a new top-level task"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "recovery"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run typecheck"
  - "bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-advance*.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-09-23T09:57:23.499Z"
  updated_by: "USER"
  note: "User approved the exact prepared plan in the current Codex task."
verification:
  state: "pending"
  updated_at: "2026-09-23T10:06:43.160Z"
  updated_by: "USER"
  note: "Invalidated by USER-approved execution scope extension."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
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
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "No provider or lifecycle publication effect is required."
      - "The fix belongs to the task supervisor recovery route and its nearest CLI regression tests."
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/commands/shared"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
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
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
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
      digest: "sha256:d6fed30dd808cd7717aa62370a71d0f55f520100005555c351df438223850af3"
      escalation_reasons: []
      execution_groups:
        - "core"
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
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The root cause is in shared route classification outside the issued writable roots: local main and origin/main are compared as distinct branch names, so the dirty base checkout is misclassified as the task worktree. Recommended action: Approve the same task's scope extension, then resume it; do not create a new top-level task. Requested scope: roots=packages/agentplane/src/commands/shared; repository effects=unchanged; request digest=sha256:5ee71020ccb405c47a33e7b29214e72964a1f0ea3ace1a78797ce0e3ab9da04b. Agentplane receipt: external-agent-blocker/tr_ed87b05c9721de195e40a52c3deaf8e8/sha256:fc2b55ca0a3a57809b2cb398206a5203a70067268a2bd21f0e162b8157bb636f/sha256:5ee71020ccb405c47a33e7b29214e72964a1f0ea3ace1a78797ce0e3ab9da04b."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/commands/shared; repository effects: unchanged."
events:
  -
    type: "status"
    at: "2026-09-23T09:57:24.928Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-23T10:06:36.170Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The root cause is in shared route classification outside the issued writable roots: local main and origin/main are compared as distinct branch names, so the dirty base checkout is misclassified as the task worktree. Recommended action: Approve the same task's scope extension, then resume it; do not create a new top-level task. Requested scope: roots=packages/agentplane/src/commands/shared; repository effects=unchanged; request digest=sha256:5ee71020ccb405c47a33e7b29214e72964a1f0ea3ace1a78797ce0e3ab9da04b. Agentplane receipt: external-agent-blocker/tr_ed87b05c9721de195e40a52c3deaf8e8/sha256:fc2b55ca0a3a57809b2cb398206a5203a70067268a2bd21f0e162b8157bb636f/sha256:5ee71020ccb405c47a33e7b29214e72964a1f0ea3ace1a78797ce0e3ab9da04b."
doc_version: 3
doc_updated_at: "2026-09-23T10:06:36.170Z"
doc_updated_by: "SUPERVISOR"
description: "Reproduce the failure path reported for task 202609230716-YVCJN6, identify why a malformed or rejected planning result becomes terminal or disappears, and make task advance return a bounded retry or replanning route for the same task while preserving task identity and authority."
sections:
  Summary: |-
    Recover the same AgentPlane task after a planner result fails instead of requiring a new top-level task

    Reproduce the failure path reported for task 202609230716-YVCJN6, identify why a malformed or rejected planning result becomes terminal or disappears, and make task advance return a bounded retry or replanning route for the same task while preserving task identity and authority.
  Scope: |-
    - In scope: Reproduce the failure path reported for task 202609230716-YVCJN6, identify why a malformed or rejected planning result becomes terminal or disappears, and make task advance return a bounded retry or replanning route for the same task while preserving task identity and authority.
    - Out of scope: unrelated refactors not required for "Recover the same AgentPlane task after a planner result fails instead of requiring a new top-level task".
  Plan: "Make planner failure recovery an explicit same-task route and verify task identity, authority, and bounded retry behavior."
  Verify Steps: |-
    1. Run `bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-advance*.test.ts`. Expected: same-task planner recovery and existing task advance tests pass.
    2. Run `bun run typecheck`. Expected: TypeScript validation passes.
    3. Run `git diff --check`. Expected: the task diff has no whitespace errors.
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
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:4bf578ef157963c97a425950259f5c1b9402a1cb1130772700db576dbb495295"
    grant_id: "0f4b15c1-4143-4916-be29-0b26ba6cf951"
    issued_at: "2026-09-23T09:57:23.499Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:a2dfea7c7968082ea26d5ebc1284c6d4376d2e50cb4e0f8bdcc825b2688c86eb"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609230938-QFMVQ0"
  agentplane.scope_extension_request:
    applied_at: "2026-09-23T10:06:43.160Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:fc2b55ca0a3a57809b2cb398206a5203a70067268a2bd21f0e162b8157bb636f"
    kind: "task_scope_extension_request"
    request:
      rationale: "The reproduced defect originates in route-decision-workspace.ts, where main and origin/main are not normalized before checkout-role and task-branch inference."
      repository_effects: []
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src/commands/shared"
    request_digest: "sha256:5ee71020ccb405c47a33e7b29214e72964a1f0ea3ace1a78797ce0e3ab9da04b"
    schema_version: 1
    status: "applied"
    transition_id: "tr_ed87b05c9721de195e40a52c3deaf8e8"
    work_item_id: "repair-planner-failure-recovery"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-23T10:06:43.160Z"
        approved_by: "USER"
        approved_digest: "sha256:1714a0a03a1dbd53760311c4aeb103b172c0e5f67080fa9e5770a5e6a2b4ae1a"
        policy_facts:
          - "state_bound_scope_extension:sha256:5ee71020ccb405c47a33e7b29214e72964a1f0ea3ace1a78797ce0e3ab9da04b"
        state: "approved"
      created_at: "2026-09-23T10:06:43.160Z"
      digest: "sha256:1714a0a03a1dbd53760311c4aeb103b172c0e5f67080fa9e5770a5e6a2b4ae1a"
      proposal:
        assumptions:
          - "The intended recovery unit is the existing task and a new semantic operation, not a new task."
          - "The change must not auto-retry effects whose outcome may be in doubt."
        planning_baseline:
          captured_at: "2026-09-23T09:38:27.190Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:073f6e1363851210aff33585d5852c763b6d5e03bcc927e4de6fbe0b84b35022"
          dirty_paths:
            - ".agentplane/lifecycle-fix-base/"
            - ".agentplane/release-0.7.11-base/"
            - ".agentplane/remove-submodules-base/"
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
            - ".agentplane/tasks/202609142255-KR5FPV/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202609150645-36M6D6/README.md"
            - ".agentplane/tasks/202609150646-NSR3B1/README.md"
            - ".agentplane/tasks/202609150646-NSR3B1/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202609162049-DRKV7Q/README.md"
            - ".agentplane/tasks/202609162049-DRKV7Q/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202609162058-4MNQ78/README.md"
            - ".agentplane/tasks/202609162219-FR0HZS/README.md"
            - ".agentplane/tasks/202609162249-H09ET6/README.md"
            - ".agentplane/tasks/202609210357-NSF466/README.md"
            - ".agentplane/tasks/202609220644-MDH6FN/README.md"
            - ".agentplane/tasks/202609220644-MDH6FN/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202609220649-YTTC8A/README.md"
            - ".agentplane/tasks/202609220654-5TGJ6N/README.md"
            - ".agentplane/tasks/202609222149-1ZH55X/README.md"
            - ".agentplane/tasks/202609222149-1ZH55X/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202609222220-BVX6N3/README.md"
            - ".agentplane/tasks/202609230938-QFMVQ0/README.md"
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
            sha: "23349822cd0e2ebb2f7402a32d72a56b1a832cc1"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609230938-QFMVQ0"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-advance*.test.ts"
              id: "focused-recovery-tests"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "diff-check"
              kind: "deterministic"
              required: true
              timeout_ms: 30000
          criteria:
            -
              check_ids:
                - "focused-recovery-tests"
              description: "A failed or rejected planner result produces a bounded recovery route for the same task ID instead of requiring a new top-level task."
              id: "same-task-recovery"
              required: true
            -
              check_ids:
                - "focused-recovery-tests"
                - "typecheck"
              description: "Recovery preserves task identity, current authority, and prior task state while retiring or replacing only the failed semantic operation."
              id: "identity-and-authority"
              required: true
            -
              check_ids:
                - "focused-recovery-tests"
                - "typecheck"
                - "diff-check"
              description: "Existing task advance and planner rejection behavior remains valid and the final diff is clean."
              id: "no-regression"
              required: true
          evidence_fingerprint: "sha256:073f6e1363851210aff33585d5852c763b6d5e03bcc927e4de6fbe0b84b35022"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused-recovery-tests"
                  description: "A failed or rejected planner result produces a bounded recovery route for the same task ID instead of requiring a new top-level task."
                  id: "same-task-recovery"
                  required: true
                -
                  check_ids:
                    - "focused-recovery-tests"
                    - "typecheck"
                  description: "Recovery preserves task identity, current authority, and prior task state while retiring or replacing only the failed semantic operation."
                  id: "identity-and-authority"
                  required: true
                -
                  check_ids:
                    - "focused-recovery-tests"
                    - "typecheck"
                    - "diff-check"
                  description: "Existing task advance and planner rejection behavior remains valid and the final diff is clean."
                  id: "no-regression"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                  - "packages/agentplane/src/commands/task/ordinary-advance-step.ts"
                symbol_hints:
                  - "recordIssuedExternalAgentEpisode"
                  - "preparePersistedSupervisorReplacementAfterFailure"
                  - "failRejectedExternalAgentResult"
              depends_on: []
              expected_outputs:
                - "same-task-recovery-contract"
                - "planner-failure-regression-tests"
              id: "repair-planner-failure-recovery"
              objective: "Reproduce the planner failure route on current origin/main, identify the exact state transition that presents same-task recovery as terminal loss, implement the smallest structured same-task recovery response, and add regression coverage."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-advance*.test.ts"
                    id: "focused-recovery-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "diff-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 30000
                criteria:
                  -
                    check_ids:
                      - "focused-recovery-tests"
                    description: "A failed or rejected planner result produces a bounded recovery route for the same task ID instead of requiring a new top-level task."
                    id: "same-task-recovery"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery-tests"
                      - "typecheck"
                    description: "Recovery preserves task identity, current authority, and prior task state while retiring or replacing only the failed semantic operation."
                    id: "identity-and-authority"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery-tests"
                      - "typecheck"
                      - "diff-check"
                    description: "Existing task advance and planner rejection behavior remains valid and the final diff is clean."
                    id: "no-regression"
                    required: true
                evidence_fingerprint: "sha256:073f6e1363851210aff33585d5852c763b6d5e03bcc927e4de6fbe0b84b35022"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202609230938-QFMVQ0"
    event_cursor: 6
    final_validation: null
    id: "202609230938-QFMVQ0"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-advance*.test.ts"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "git diff --check"
          id: "legacy-3"
          required: true
      captured_at: "2026-09-23T09:38:19.495Z"
      constraints: []
      request: |-
        Recover the same AgentPlane task after a planner result fails instead of requiring a new top-level task

        Reproduce the failure path reported for task 202609230716-YVCJN6, identify why a malformed or rejected planning result becomes terminal or disappears, and make task advance return a bounded retry or replanning route for the same task while preserving task identity and authority.
      task_id: "202609230938-QFMVQ0"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-23T09:57:23.499Z"
          approved_by: "USER"
          approved_digest: "sha256:b13ba825701aa641b711154af3335b075321ea467e3a3276856d50c451513af3"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-09-23T09:43:25.801Z"
        digest: "sha256:b13ba825701aa641b711154af3335b075321ea467e3a3276856d50c451513af3"
        proposal:
          assumptions:
            - "The intended recovery unit is the existing task and a new semantic operation, not a new task."
            - "The change must not auto-retry effects whose outcome may be in doubt."
          planning_baseline:
            captured_at: "2026-09-23T09:38:27.190Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:073f6e1363851210aff33585d5852c763b6d5e03bcc927e4de6fbe0b84b35022"
            dirty_paths:
              - ".agentplane/lifecycle-fix-base/"
              - ".agentplane/release-0.7.11-base/"
              - ".agentplane/remove-submodules-base/"
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
              - ".agentplane/tasks/202609142255-KR5FPV/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202609150645-36M6D6/README.md"
              - ".agentplane/tasks/202609150646-NSR3B1/README.md"
              - ".agentplane/tasks/202609150646-NSR3B1/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202609162049-DRKV7Q/README.md"
              - ".agentplane/tasks/202609162049-DRKV7Q/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202609162058-4MNQ78/README.md"
              - ".agentplane/tasks/202609162219-FR0HZS/README.md"
              - ".agentplane/tasks/202609162249-H09ET6/README.md"
              - ".agentplane/tasks/202609210357-NSF466/README.md"
              - ".agentplane/tasks/202609220644-MDH6FN/README.md"
              - ".agentplane/tasks/202609220644-MDH6FN/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202609220649-YTTC8A/README.md"
              - ".agentplane/tasks/202609220654-5TGJ6N/README.md"
              - ".agentplane/tasks/202609222149-1ZH55X/README.md"
              - ".agentplane/tasks/202609222149-1ZH55X/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202609222220-BVX6N3/README.md"
              - ".agentplane/tasks/202609230938-QFMVQ0/README.md"
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
              sha: "23349822cd0e2ebb2f7402a32d72a56b1a832cc1"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609230938-QFMVQ0"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-advance*.test.ts"
                id: "focused-recovery-tests"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 120000
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "diff-check"
                kind: "deterministic"
                required: true
                timeout_ms: 30000
            criteria:
              -
                check_ids:
                  - "focused-recovery-tests"
                description: "A failed or rejected planner result produces a bounded recovery route for the same task ID instead of requiring a new top-level task."
                id: "same-task-recovery"
                required: true
              -
                check_ids:
                  - "focused-recovery-tests"
                  - "typecheck"
                description: "Recovery preserves task identity, current authority, and prior task state while retiring or replacing only the failed semantic operation."
                id: "identity-and-authority"
                required: true
              -
                check_ids:
                  - "focused-recovery-tests"
                  - "typecheck"
                  - "diff-check"
                description: "Existing task advance and planner rejection behavior remains valid and the final diff is clean."
                id: "no-regression"
                required: true
            evidence_fingerprint: "sha256:073f6e1363851210aff33585d5852c763b6d5e03bcc927e4de6fbe0b84b35022"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-recovery-tests"
                    description: "A failed or rejected planner result produces a bounded recovery route for the same task ID instead of requiring a new top-level task."
                    id: "same-task-recovery"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery-tests"
                      - "typecheck"
                    description: "Recovery preserves task identity, current authority, and prior task state while retiring or replacing only the failed semantic operation."
                    id: "identity-and-authority"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery-tests"
                      - "typecheck"
                      - "diff-check"
                    description: "Existing task advance and planner rejection behavior remains valid and the final diff is clean."
                    id: "no-regression"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 180000
                  optional_sources:
                    - "packages/agentplane/src/commands/task/external-agent-planning-authority.ts"
                    - "packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
                    - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                    - "packages/agentplane/src/commands/task/ordinary-advance-step.ts"
                  symbol_hints:
                    - "recordIssuedExternalAgentEpisode"
                    - "preparePersistedSupervisorReplacementAfterFailure"
                    - "failRejectedExternalAgentResult"
                depends_on: []
                expected_outputs:
                  - "same-task-recovery-contract"
                  - "planner-failure-regression-tests"
                id: "repair-planner-failure-recovery"
                objective: "Reproduce the planner failure route on current origin/main, identify the exact state transition that presents same-task recovery as terminal loss, implement the smallest structured same-task recovery response, and add regression coverage."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-advance*.test.ts"
                      id: "focused-recovery-tests"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "typecheck"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 120000
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "diff-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 30000
                  criteria:
                    -
                      check_ids:
                        - "focused-recovery-tests"
                      description: "A failed or rejected planner result produces a bounded recovery route for the same task ID instead of requiring a new top-level task."
                      id: "same-task-recovery"
                      required: true
                    -
                      check_ids:
                        - "focused-recovery-tests"
                        - "typecheck"
                      description: "Recovery preserves task identity, current authority, and prior task state while retiring or replacing only the failed semantic operation."
                      id: "identity-and-authority"
                      required: true
                    -
                      check_ids:
                        - "focused-recovery-tests"
                        - "typecheck"
                        - "diff-check"
                      description: "Existing task advance and planner rejection behavior remains valid and the final diff is clean."
                      id: "no-regression"
                      required: true
                  evidence_fingerprint: "sha256:073f6e1363851210aff33585d5852c763b6d5e03bcc927e4de6fbe0b84b35022"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609230938-QFMVQ0"
    revision: 8
    schema_version: 1
    updated_at: "2026-09-23T10:06:36.170Z"
    work_items:
      repair-planner-failure-recovery:
        attempt: 0
        claim_id: null
        id: "repair-planner-failure-recovery"
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
      compatibility:sha256:2edeb9e26b0edc56428417f4f5a5695a358c95bf63b6413f2299f25999f39098:
        aggregate_digest: "sha256:91f6b569244f836c78ec5c1a5d54ed7e0ebf1dbd54cb7d718e5cb3437aacb865"
        event:
          actor_id: "agentplane"
          at: "2026-09-23T09:57:23.092Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_9ce3636d9faa067607cba5f4"
          mutation_id: "compatibility:sha256:2edeb9e26b0edc56428417f4f5a5695a358c95bf63b6413f2299f25999f39098"
          plan_digest: "sha256:b13ba825701aa641b711154af3335b075321ea467e3a3276856d50c451513af3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609230938-QFMVQ0"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2edeb9e26b0edc56428417f4f5a5695a358c95bf63b6413f2299f25999f39098"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609230938-QFMVQ0"
      compatibility:sha256:966b7f63e9b56c25b760829bf197a03f550719afe138d64d9944ce433f729d53:
        aggregate_digest: "sha256:4b7bb70e9bc4811790f5e073e18e1c774f8504e31b6843ea8c902c8e9986f5ce"
        event:
          actor_id: "agentplane"
          at: "2026-09-23T09:57:24.928Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_e6fccaa6e0c9b3325d333de4"
          mutation_id: "compatibility:sha256:966b7f63e9b56c25b760829bf197a03f550719afe138d64d9944ce433f729d53"
          plan_digest: "sha256:b13ba825701aa641b711154af3335b075321ea467e3a3276856d50c451513af3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609230938-QFMVQ0"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:966b7f63e9b56c25b760829bf197a03f550719afe138d64d9944ce433f729d53"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609230938-QFMVQ0"
      compatibility:sha256:a3ad7a92db4f857dcb0f39ed3da522ed750d95f84bbd3ce658f9f35d0d8b961d:
        aggregate_digest: "sha256:7c46564acdba9f3bf5b858f1d468453ab845ee83cd6e8f80fb67f022729936ae"
        event:
          actor_id: "agentplane"
          at: "2026-09-23T10:06:36.170Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f79727775d2f91a71feb9713"
          mutation_id: "compatibility:sha256:a3ad7a92db4f857dcb0f39ed3da522ed750d95f84bbd3ce658f9f35d0d8b961d"
          plan_digest: "sha256:b13ba825701aa641b711154af3335b075321ea467e3a3276856d50c451513af3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609230938-QFMVQ0"
          task_revision: 5
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:a3ad7a92db4f857dcb0f39ed3da522ed750d95f84bbd3ce658f9f35d0d8b961d"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609230938-QFMVQ0"
      compatibility:sha256:d6f2d6d85fdd5f92aa917c25ddca2dcb1d4831df0fdcb60a7ed336828dc7fce0:
        aggregate_digest: "sha256:9d0b90acb85fba73c12e4338393545b56a2e8181e4fcb84724dad61be06eb8d3"
        event:
          actor_id: "agentplane"
          at: "2026-09-23T10:06:36.170Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_51d007556a561a93344ac6a0"
          mutation_id: "compatibility:sha256:d6f2d6d85fdd5f92aa917c25ddca2dcb1d4831df0fdcb60a7ed336828dc7fce0"
          plan_digest: "sha256:b13ba825701aa641b711154af3335b075321ea467e3a3276856d50c451513af3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609230938-QFMVQ0"
          task_revision: 6
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:d6f2d6d85fdd5f92aa917c25ddca2dcb1d4831df0fdcb60a7ed336828dc7fce0"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609230938-QFMVQ0"
      compatibility:sha256:e651f787d5b867219127b1cb7aa68eb5542956b078fed60ba8d0571e94bcfa41:
        aggregate_digest: "sha256:1b0755f20c9a0f36a94636e40eff433b4cc5d86fd4cd50e95ddc0571988690bd"
        event:
          actor_id: "agentplane"
          at: "2026-09-23T09:57:23.090Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_8e012573a6db72d062760a4c"
          mutation_id: "compatibility:sha256:e651f787d5b867219127b1cb7aa68eb5542956b078fed60ba8d0571e94bcfa41"
          plan_digest: "sha256:b13ba825701aa641b711154af3335b075321ea467e3a3276856d50c451513af3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609230938-QFMVQ0"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:e651f787d5b867219127b1cb7aa68eb5542956b078fed60ba8d0571e94bcfa41"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609230938-QFMVQ0"
      compatibility:sha256:f7664cc2fbdd9a24ee5df826d24ce165881a4a33b02b1bb086da128ccb4a77ff:
        aggregate_digest: "sha256:006c3179fb4156975fa3593f386b7fe72ac5991601bec697ff3bc694441fe72e"
        event:
          actor_id: "agentplane"
          at: "2026-09-23T10:06:36.170Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_b4f66ada9f31b4ce5b5da6df"
          mutation_id: "compatibility:sha256:f7664cc2fbdd9a24ee5df826d24ce165881a4a33b02b1bb086da128ccb4a77ff"
          plan_digest: "sha256:b13ba825701aa641b711154af3335b075321ea467e3a3276856d50c451513af3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609230938-QFMVQ0"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f7664cc2fbdd9a24ee5df826d24ce165881a4a33b02b1bb086da128ccb4a77ff"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609230938-QFMVQ0"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "origin/main"
    base_sha: "bae0396bdbadf0a240cfae0a43102138f1bbcbca"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "23349822cd0e2ebb2f7402a32d72a56b1a832cc1"
    version: 1
id_source: "generated"
---
## Summary

Recover the same AgentPlane task after a planner result fails instead of requiring a new top-level task

Reproduce the failure path reported for task 202609230716-YVCJN6, identify why a malformed or rejected planning result becomes terminal or disappears, and make task advance return a bounded retry or replanning route for the same task while preserving task identity and authority.

## Scope

- In scope: Reproduce the failure path reported for task 202609230716-YVCJN6, identify why a malformed or rejected planning result becomes terminal or disappears, and make task advance return a bounded retry or replanning route for the same task while preserving task identity and authority.
- Out of scope: unrelated refactors not required for "Recover the same AgentPlane task after a planner result fails instead of requiring a new top-level task".

## Plan

Make planner failure recovery an explicit same-task route and verify task identity, authority, and bounded retry behavior.

## Verify Steps

1. Run `bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/cli/run-cli.core.task-advance*.test.ts`. Expected: same-task planner recovery and existing task advance tests pass.
2. Run `bun run typecheck`. Expected: TypeScript validation passes.
3. Run `git diff --check`. Expected: the task diff has no whitespace errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
