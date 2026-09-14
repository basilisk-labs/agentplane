---
id: "202609140050-8QDRVN"
title: "Recover an external-agent result rejected during supervisor application"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "backend"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun test packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-14T00:54:23.210Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:2263a9a1bbb55ab2beb5356ffe3db7253e073eaf0e54cdfef19e2f14060d973d"
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
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The change is isolated to supervisor recovery and one focused CLI regression suite."
      - "The repository policy requires branch_pr for implementation changes."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
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
      digest: "sha256:40592272378d6b4b3db740ba8c6ea5d48abd074044f1d9fa57a29097f49b8947"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
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
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-09-14T00:54:28.801Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-14T00:54:28.801Z"
doc_updated_by: "CODER"
description: "When a durable result_received external-agent result is rejected by deterministic supervisor application validation, fail the owning semantic operation without applying the result, retire the exchange, and require the existing exact-key --replacement route. Preserve single-use result integrity and effect-in-doubt behavior. Add focused regression coverage for an implementation result that changes Git history outside the permitted workspace effect."
sections:
  Summary: |-
    Recover an external-agent result rejected during supervisor application

    When a durable result_received external-agent result is rejected by deterministic supervisor application validation, fail the owning semantic operation without applying the result, retire the exchange, and require the existing exact-key --replacement route. Preserve single-use result integrity and effect-in-doubt behavior. Add focused regression coverage for an implementation result that changes Git history outside the permitted workspace effect.
  Scope: |-
    - In scope: When a durable result_received external-agent result is rejected by deterministic supervisor application validation, fail the owning semantic operation without applying the result, retire the exchange, and require the existing exact-key --replacement route. Preserve single-use result integrity and effect-in-doubt behavior. Add focused regression coverage for an implementation result that changes Git history outside the permitted workspace effect.
    - Out of scope: unrelated refactors not required for "Recover an external-agent result rejected during supervisor application".
  Plan: "Plan the narrow supervisor recovery and its regression coverage."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts`. Expected: the focused supervisor recovery suite passes, including a result rejected for an unauthorized Git history change.
    2. Confirm the rejected exchange is retired, the owning journal operation is failed, and plain advance requires the existing exact-key `--replacement` route.
    3. Confirm the result is not applied and existing accepted-result replay and effect-in-doubt cases still pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex:USER"
    approval_evidence_digest: "sha256:2263a9a1bbb55ab2beb5356ffe3db7253e073eaf0e54cdfef19e2f14060d973d"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:23bd737ebef71e0b12af56fa1b3f2a69509ebe13d1c2cdc6a83e916f19e41f36"
    grant_id: "82f68dfd-d9f5-48fe-aa3e-af465a30440d"
    issued_at: "2026-09-14T00:54:23.210Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:9c5a6f4d683eaf8b5bc7ec7c687fd48c79201dd47cec1885a7495893d42cb359"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609140050-8QDRVN"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-14T00:54:23.210Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-14T00:52:42.874Z"
      digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
      proposal:
        assumptions:
          - "Deterministic application validation errors are safe to classify as a failed semantic operation because the application code validates the external workspace effect before persisting semantic lifecycle state."
        planning_baseline:
          captured_at: "2026-09-14T00:51:04.225Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:131534aad9499ccd4363fca77a61d41fe5e9e598b847e6460fa7ca313f20643f"
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
            - ".agentplane/tasks/202609140050-8QDRVN/README.md"
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
            sha: "9792878934b2c4d068e98056cef3c2c691451a90"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609140050-8QDRVN"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun test packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
              id: "focused-recovery-tests"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
          criteria:
            -
              check_ids:
                - "focused-recovery-tests"
              description: "A deterministic supervisor application rejection fails the owning operation, retires the rejected exchange, and instructs the operator to request exactly one replacement without applying the semantic result."
              id: "rejected-result-recovery"
              required: true
            -
              check_ids:
                - "focused-recovery-tests"
              description: "Single-use result integrity, accepted-result replay, and effect-in-doubt recovery behavior remain unchanged."
              id: "recovery-invariants"
              required: true
          evidence_fingerprint: "sha256:131534aad9499ccd4363fca77a61d41fe5e9e598b847e6460fa7ca313f20643f"
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
                  description: "A deterministic supervisor application rejection fails the owning operation, retires the rejected exchange, and instructs the operator to request exactly one replacement without applying the semantic result."
                  id: "rejected-result-recovery"
                  required: true
                -
                  check_ids:
                    - "focused-recovery-tests"
                  description: "Single-use result integrity, accepted-result replay, and effect-in-doubt recovery behavior remain unchanged."
                  id: "recovery-invariants"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 262144
                optional_sources:
                  - "packages/core/src/schemas/supervisor-execution-episode.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-result-application.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                symbol_hints:
                  - "acceptExternalAgentResult"
                  - "recoverPendingExternalAgentResult"
                  - "completeSupervisorExecutionEpisode"
              depends_on: []
              expected_outputs:
                - "Rejected-result recovery implementation"
                - "Focused regression test"
              id: "recover-rejected-result"
              objective: "Add a fail-closed recovery transition for a durable external-agent result that deterministic supervisor application rejects, and cover the Git-history rejection case."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun test packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                    id: "focused-recovery-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "focused-recovery-tests"
                    description: "A deterministic supervisor application rejection fails the owning operation, retires the rejected exchange, and instructs the operator to request exactly one replacement without applying the semantic result."
                    id: "rejected-result-recovery"
                    required: true
                  -
                    check_ids:
                      - "focused-recovery-tests"
                    description: "Single-use result integrity, accepted-result replay, and effect-in-doubt recovery behavior remain unchanged."
                    id: "recovery-invariants"
                    required: true
                evidence_fingerprint: "sha256:131534aad9499ccd4363fca77a61d41fe5e9e598b847e6460fa7ca313f20643f"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609140050-8QDRVN"
    event_cursor: 3
    final_validation: null
    id: "202609140050-8QDRVN"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun test packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          id: "legacy-1"
          required: true
      captured_at: "2026-09-14T00:50:59.467Z"
      constraints: []
      request: |-
        Recover an external-agent result rejected during supervisor application

        When a durable result_received external-agent result is rejected by deterministic supervisor application validation, fail the owning semantic operation without applying the result, retire the exchange, and require the existing exact-key --replacement route. Preserve single-use result integrity and effect-in-doubt behavior. Add focused regression coverage for an implementation result that changes Git history outside the permitted workspace effect.
      task_id: "202609140050-8QDRVN"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 5
    schema_version: 1
    updated_at: "2026-09-14T00:54:28.801Z"
    work_items:
      recover-rejected-result:
        attempt: 0
        claim_id: null
        id: "recover-rejected-result"
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
      compatibility:sha256:10c932162df279b024730d8bcb8e49408961f9a6f3ceec200acd8cba8fb17b34:
        aggregate_digest: "sha256:838e1419190cf1de63ac695fd62c49ba31f769bcba122c8149607cb10302ac88"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T00:54:00.218Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_9b83fba375816b0a58084f30"
          mutation_id: "compatibility:sha256:10c932162df279b024730d8bcb8e49408961f9a6f3ceec200acd8cba8fb17b34"
          plan_digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:10c932162df279b024730d8bcb8e49408961f9a6f3ceec200acd8cba8fb17b34"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:6dc3924e9b235917f951d93d77769cbbada95478bf9d2ff04fd80270e9644782:
        aggregate_digest: "sha256:bc2589877f9a86a792ce145cc9877d78fce10df4c33cac54af74d905f4140c8b"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T00:54:00.219Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_e92153b945f01263c73fbe71"
          mutation_id: "compatibility:sha256:6dc3924e9b235917f951d93d77769cbbada95478bf9d2ff04fd80270e9644782"
          plan_digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6dc3924e9b235917f951d93d77769cbbada95478bf9d2ff04fd80270e9644782"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609140050-8QDRVN"
      compatibility:sha256:b346a1da1924a7ac995583f02e935cdab360920ebbfefa88ae3c2df231c14168:
        aggregate_digest: "sha256:2749e05bd99c5add0ba126a66d4d798eaf13256d77e8c207cd8c459703601f28"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T00:54:28.801Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_e89184e95a3e003f669ca765"
          mutation_id: "compatibility:sha256:b346a1da1924a7ac995583f02e935cdab360920ebbfefa88ae3c2df231c14168"
          plan_digest: "sha256:b1f9a370dfc2ba83b67ff36e113372b45259029b135ef5a83ec645b6f9f4c6fa"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140050-8QDRVN"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b346a1da1924a7ac995583f02e935cdab360920ebbfefa88ae3c2df231c14168"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609140050-8QDRVN"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "9792878934b2c4d068e98056cef3c2c691451a90"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "9792878934b2c4d068e98056cef3c2c691451a90"
    version: 1
id_source: "generated"
---
## Summary

Recover an external-agent result rejected during supervisor application

When a durable result_received external-agent result is rejected by deterministic supervisor application validation, fail the owning semantic operation without applying the result, retire the exchange, and require the existing exact-key --replacement route. Preserve single-use result integrity and effect-in-doubt behavior. Add focused regression coverage for an implementation result that changes Git history outside the permitted workspace effect.

## Scope

- In scope: When a durable result_received external-agent result is rejected by deterministic supervisor application validation, fail the owning semantic operation without applying the result, retire the exchange, and require the existing exact-key --replacement route. Preserve single-use result integrity and effect-in-doubt behavior. Add focused regression coverage for an implementation result that changes Git history outside the permitted workspace effect.
- Out of scope: unrelated refactors not required for "Recover an external-agent result rejected during supervisor application".

## Plan

Plan the narrow supervisor recovery and its regression coverage.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts`. Expected: the focused supervisor recovery suite passes, including a result rejected for an unauthorized Git history change.
2. Confirm the rejected exchange is retired, the owning journal operation is failed, and plain advance requires the existing exact-key `--replacement` route.
3. Confirm the result is not applied and existing accepted-result replay and effect-in-doubt cases still pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
