---
id: "202609141440-VFA9C1"
title: "Repair managed usage observation and branch-pr finish guard regressions"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release-blocker"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:full"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-14T15:15:09.639Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:ce787dbf298e6a9ac7146f33a7bfd0971e383a7b36d309a0c588743e14d1a67f"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
      - "packages/agentplane/src/commands/task/finish-command.ts"
      - "packages/agentplane/src/runner/adapters/custom.test.ts"
      - "packages/agentplane/src/runner/adapters/custom.ts"
  declaration:
    external_effects:
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The branch_pr route isolates the release blocker and requires hosted verification before integration."
      - "The managed usage repair must preserve fail-closed observation identity and duplicate detection."
      - "The repair changes two production control paths and their nearest regression tests."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
      - "packages/agentplane/src/commands/task/finish-command.ts"
      - "packages/agentplane/src/runner/adapters/custom.test.ts"
      - "packages/agentplane/src/runner/adapters/custom.ts"
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
    - "reversibility_recovery_required"
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
          - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
          - "packages/agentplane/src/commands/task/finish-command.ts"
          - "packages/agentplane/src/runner/adapters/custom.test.ts"
          - "packages/agentplane/src/runner/adapters/custom.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:90bf5b84d12192d37dae7e915625df487471d196a0060f0407ca9599ef1fd29c"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
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
      - "external_effect:network_read"
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
    at: "2026-09-14T15:15:16.341Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-14T15:15:16.341Z"
doc_updated_by: "CODER"
description: "Repair two reproducible qualified-main regressions blocking the AgentPlane 0.7.9 prepublish gate. Managed custom runner episodes must durably record an unavailable provider-usage observation when token telemetry is not exposed, without weakening fail-closed accounting. Branch-pr finish from a task branch must reach the intended E_GIT base-checkout guard instead of an earlier E_VALIDATION failure. Add focused regression coverage, run the implicated release-ci-base chunk and complete local CI, integrate through hosted CI, then unblock release task 202609121424-49XXT3. Preserve unrelated user work and never commit agentplane-roadmap-r2."
sections:
  Summary: |-
    Repair managed usage observation and branch-pr finish guard regressions

    Repair two reproducible qualified-main regressions blocking the AgentPlane 0.7.9 prepublish gate. Managed custom runner episodes must durably record an unavailable provider-usage observation when token telemetry is not exposed, without weakening fail-closed accounting. Branch-pr finish from a task branch must reach the intended E_GIT base-checkout guard instead of an earlier E_VALIDATION failure. Add focused regression coverage, run the implicated release-ci-base chunk and complete local CI, integrate through hosted CI, then unblock release task 202609121424-49XXT3. Preserve unrelated user work and never commit agentplane-roadmap-r2.
  Scope: |-
    - In scope: Repair two reproducible qualified-main regressions blocking the AgentPlane 0.7.9 prepublish gate. Managed custom runner episodes must durably record an unavailable provider-usage observation when token telemetry is not exposed, without weakening fail-closed accounting. Branch-pr finish from a task branch must reach the intended E_GIT base-checkout guard instead of an earlier E_VALIDATION failure. Add focused regression coverage, run the implicated release-ci-base chunk and complete local CI, integrate through hosted CI, then unblock release task 202609121424-49XXT3. Preserve unrelated user work and never commit agentplane-roadmap-r2.
    - Out of scope: unrelated refactors not required for "Repair managed usage observation and branch-pr finish guard regressions".
  Plan: "Prepared a bounded repair plan for both release-blocking regressions."
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts`. Expected: managed custom and Hermes results each persist exactly one state-bound `unavailable` provider-usage observation, and branch-pr finish from a task branch returns the intended `E_GIT` checkout guard before reconciliation validation.
    2. Run `bun run ci:local:full`. Expected: the complete local CI suite passes on the exact repair commit.
    3. Review `git diff --check`, the final diff, and `git status --short --untracked-files=all`. Expected: changes remain limited to the five approved source and test paths, with no unrelated tracked changes.
    4. Complete hosted integration through the AgentPlane route. Expected: required hosted checks pass on the exact repair commit and the repair reaches qualified `main` before release task `202609121424-49XXT3` resumes.
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
    approval_evidence_digest: "sha256:ce787dbf298e6a9ac7146f33a7bfd0971e383a7b36d309a0c588743e14d1a67f"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:59e45a5765142a99068af6bb7d14d571e116bddf1edf2e8f3ef7194d769a20f3"
    digest: "sha256:adb371646d9ba2db46b9a6933c859b8ee6decefd96ffb995eb65dbc732b410f3"
    grant_id: "643ba404-4290-4a9c-81ce-d7059266c843"
    issued_at: "2026-09-14T15:15:09.639Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:ee512e0f6c19d3a74a1a2f1caeb6adba6e0c5641a056ae475e28bd4033b7cb4d"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:f6019e225d5c1dc83ebd0d599fd2bd160e240afaa9c21ab7a463b818f3d23b44"
    status: "active"
    task_id: "202609141440-VFA9C1"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-14T15:15:09.639Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:f7741223c0c9b53ff1f36aff040f8acd2f05849ba6e4e3fa640d1adbc2f5200c"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-14T14:43:14.835Z"
      digest: "sha256:f7741223c0c9b53ff1f36aff040f8acd2f05849ba6e4e3fa640d1adbc2f5200c"
      proposal:
        assumptions:
          - "The custom and Hermes adapters do not expose provider token telemetry, so unavailable is the truthful accounting state."
          - "The existing reconciliation check remains required after the branch checkout precondition passes."
          - "Qualified main ed89f946b3058cf290df7a76bec23ab4dcc1fa92 is the repair baseline."
        planning_baseline:
          captured_at: "2026-09-14T14:40:10.492Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:94e1ecfcd1edfb79817134a898e8bd0fe6e6b6aa987f3b41785dea45efb55567"
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
            - ".agentplane/tasks/202609141440-VFA9C1/README.md"
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
            sha: "ed89f946b3058cf290df7a76bec23ab4dcc1fa92"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609141440-VFA9C1"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
              id: "focused_regressions"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full_local_ci"
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
          criteria:
            -
              check_ids:
                - "focused_regressions"
                - "scope_hygiene"
              description: "Every managed custom or Hermes runner result durably records exactly one state-bound unavailable provider-usage observation when token telemetry is not exposed, and canonical accounting consumes it without weakening identity or duplicate checks."
              id: "managed_usage_durable"
              required: true
            -
              check_ids:
                - "focused_regressions"
                - "scope_hygiene"
              description: "A branch_pr finish invoked from a task branch returns the intended E_GIT base-checkout guard before reconciliation validation, while valid base-checkout and pre-merge closure behavior remains unchanged."
              id: "finish_guard_ordered"
              required: true
            -
              check_ids:
                - "focused_regressions"
                - "full_local_ci"
                - "scope_hygiene"
                - "hosted_integration"
              description: "The focused regressions, complete local CI, and hosted integration pass on the exact repair commit without unrelated changes."
              id: "release_blocker_qualified"
              required: true
          evidence_fingerprint: "sha256:94e1ecfcd1edfb79817134a898e8bd0fe6e6b6aa987f3b41785dea45efb55567"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused_regressions"
                    - "scope_hygiene"
                  description: "Every managed custom or Hermes runner result durably records exactly one state-bound unavailable provider-usage observation when token telemetry is not exposed, and canonical accounting consumes it without weakening identity or duplicate checks."
                  id: "managed_usage_durable"
                  required: true
                -
                  check_ids:
                    - "focused_regressions"
                    - "scope_hygiene"
                  description: "A branch_pr finish invoked from a task branch returns the intended E_GIT base-checkout guard before reconciliation validation, while valid base-checkout and pre-merge closure behavior remains unchanged."
                  id: "finish_guard_ordered"
                  required: true
                -
                  check_ids:
                    - "focused_regressions"
                    - "full_local_ci"
                    - "scope_hygiene"
                    - "hosted_integration"
                  description: "The focused regressions, complete local CI, and hosted integration pass on the exact repair commit without unrelated changes."
                  id: "release_blocker_qualified"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 1000000
                optional_sources:
                  - "packages/agentplane/src/runner/adapters/custom.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
                required_sources:
                  - ".agentplane/tasks/202609141440-VFA9C1/README.md"
                  - "packages/agentplane/src/runner/artifacts.ts"
                  - "packages/agentplane/src/runner/adapters/codex.ts"
                  - "packages/agentplane/src/runner/adapters/custom.ts"
                  - "packages/agentplane/src/commands/task/kernel-run.ts"
                  - "packages/agentplane/src/commands/task/finish-command.ts"
                symbol_hints:
                  - "appendRunnerProviderUsageObservation"
                  - "readManagedProviderAccounting"
                  - "CustomRunnerAdapter.execute"
                  - "ensureFinishRunsOnBaseBranch"
                  - "ensureReconciledBeforeMutation"
              depends_on: []
              expected_outputs:
                - "managed_usage_observation_repair"
                - "finish_guard_order_repair"
                - "focused_and_full_verification"
              id: "repair_release_blocking_regressions"
              objective: "Emit a durable unavailable usage observation for managed custom runners through the existing runner event contract. Restore branch_pr finish guard ordering so the checkout error precedes reconciliation validation. Add or adjust only the nearest regression assertions."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "task-worktree"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/runner/adapters/custom.ts"
                - "packages/agentplane/src/runner/adapters/custom.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
                - "packages/agentplane/src/commands/task/finish-command.ts"
                - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
                    id: "focused_regressions"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full_local_ci"
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
                criteria:
                  -
                    check_ids:
                      - "focused_regressions"
                      - "scope_hygiene"
                    description: "Every managed custom or Hermes runner result durably records exactly one state-bound unavailable provider-usage observation when token telemetry is not exposed, and canonical accounting consumes it without weakening identity or duplicate checks."
                    id: "managed_usage_durable"
                    required: true
                  -
                    check_ids:
                      - "focused_regressions"
                      - "scope_hygiene"
                    description: "A branch_pr finish invoked from a task branch returns the intended E_GIT base-checkout guard before reconciliation validation, while valid base-checkout and pre-merge closure behavior remains unchanged."
                    id: "finish_guard_ordered"
                    required: true
                  -
                    check_ids:
                      - "focused_regressions"
                      - "full_local_ci"
                      - "scope_hygiene"
                      - "hosted_integration"
                    description: "The focused regressions, complete local CI, and hosted integration pass on the exact repair commit without unrelated changes."
                    id: "release_blocker_qualified"
                    required: true
                evidence_fingerprint: "sha256:94e1ecfcd1edfb79817134a898e8bd0fe6e6b6aa987f3b41785dea45efb55567"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609141440-VFA9C1"
    event_cursor: 3
    final_validation: null
    id: "202609141440-VFA9C1"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bunx vitest run packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts"
          id: "legacy-2"
          required: true
      captured_at: "2026-09-14T14:40:02.072Z"
      constraints: []
      request: |-
        Repair managed usage observation and branch-pr finish guard regressions

        Repair two reproducible qualified-main regressions blocking the AgentPlane 0.7.9 prepublish gate. Managed custom runner episodes must durably record an unavailable provider-usage observation when token telemetry is not exposed, without weakening fail-closed accounting. Branch-pr finish from a task branch must reach the intended E_GIT base-checkout guard instead of an earlier E_VALIDATION failure. Add focused regression coverage, run the implicated release-ci-base chunk and complete local CI, integrate through hosted CI, then unblock release task 202609121424-49XXT3. Preserve unrelated user work and never commit agentplane-roadmap-r2.
      task_id: "202609141440-VFA9C1"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 5
    schema_version: 1
    updated_at: "2026-09-14T15:15:16.341Z"
    work_items:
      repair_release_blocking_regressions:
        attempt: 0
        claim_id: null
        id: "repair_release_blocking_regressions"
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
      compatibility:sha256:5ecaef3fba77685920c90bdc97f1eb798673f3fe357d9bde992e0fa067280a07:
        aggregate_digest: "sha256:d10115ef5f3967fefbfcae9eb2baa2ace177359519db02c32be754f1eac9136d"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T15:15:16.341Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_e7881d5457b85eca58eb13ce"
          mutation_id: "compatibility:sha256:5ecaef3fba77685920c90bdc97f1eb798673f3fe357d9bde992e0fa067280a07"
          plan_digest: "sha256:f7741223c0c9b53ff1f36aff040f8acd2f05849ba6e4e3fa640d1adbc2f5200c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609141440-VFA9C1"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:5ecaef3fba77685920c90bdc97f1eb798673f3fe357d9bde992e0fa067280a07"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609141440-VFA9C1"
      compatibility:sha256:608e0f893ab7c2bd9eb53fafe659fc69334972f2e25ada343b33063b4c89f234:
        aggregate_digest: "sha256:22f8eac0bcf75177dde3b78dcfe00b4a94196e0fcf34d04bb4945c7aedde00df"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T14:59:31.266Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_c0a7c01398060ba7e511d047"
          mutation_id: "compatibility:sha256:608e0f893ab7c2bd9eb53fafe659fc69334972f2e25ada343b33063b4c89f234"
          plan_digest: "sha256:f7741223c0c9b53ff1f36aff040f8acd2f05849ba6e4e3fa640d1adbc2f5200c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609141440-VFA9C1"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:608e0f893ab7c2bd9eb53fafe659fc69334972f2e25ada343b33063b4c89f234"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609141440-VFA9C1"
      compatibility:sha256:b24be80f57bfdeaa1ef7bfabc6a41006cbbd83e06c6fdffb8421e653c2ff34d1:
        aggregate_digest: "sha256:0a0c7a190345353511656151b7946fb7bb5684a29e4a20761723104df4a59c36"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T14:59:31.264Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_609156ceaa1af28c8b99fa9d"
          mutation_id: "compatibility:sha256:b24be80f57bfdeaa1ef7bfabc6a41006cbbd83e06c6fdffb8421e653c2ff34d1"
          plan_digest: "sha256:f7741223c0c9b53ff1f36aff040f8acd2f05849ba6e4e3fa640d1adbc2f5200c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609141440-VFA9C1"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:b24be80f57bfdeaa1ef7bfabc6a41006cbbd83e06c6fdffb8421e653c2ff34d1"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609141440-VFA9C1"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "ed89f946b3058cf290df7a76bec23ab4dcc1fa92"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "ed89f946b3058cf290df7a76bec23ab4dcc1fa92"
    version: 1
id_source: "generated"
---
## Summary

Repair managed usage observation and branch-pr finish guard regressions

Repair two reproducible qualified-main regressions blocking the AgentPlane 0.7.9 prepublish gate. Managed custom runner episodes must durably record an unavailable provider-usage observation when token telemetry is not exposed, without weakening fail-closed accounting. Branch-pr finish from a task branch must reach the intended E_GIT base-checkout guard instead of an earlier E_VALIDATION failure. Add focused regression coverage, run the implicated release-ci-base chunk and complete local CI, integrate through hosted CI, then unblock release task 202609121424-49XXT3. Preserve unrelated user work and never commit agentplane-roadmap-r2.

## Scope

- In scope: Repair two reproducible qualified-main regressions blocking the AgentPlane 0.7.9 prepublish gate. Managed custom runner episodes must durably record an unavailable provider-usage observation when token telemetry is not exposed, without weakening fail-closed accounting. Branch-pr finish from a task branch must reach the intended E_GIT base-checkout guard instead of an earlier E_VALIDATION failure. Add focused regression coverage, run the implicated release-ci-base chunk and complete local CI, integrate through hosted CI, then unblock release task 202609121424-49XXT3. Preserve unrelated user work and never commit agentplane-roadmap-r2.
- Out of scope: unrelated refactors not required for "Repair managed usage observation and branch-pr finish guard regressions".

## Plan

Prepared a bounded repair plan for both release-blocking regressions.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-branch-pr.test.ts`. Expected: managed custom and Hermes results each persist exactly one state-bound `unavailable` provider-usage observation, and branch-pr finish from a task branch returns the intended `E_GIT` checkout guard before reconciliation validation.
2. Run `bun run ci:local:full`. Expected: the complete local CI suite passes on the exact repair commit.
3. Review `git diff --check`, the final diff, and `git status --short --untracked-files=all`. Expected: changes remain limited to the five approved source and test paths, with no unrelated tracked changes.
4. Complete hosted integration through the AgentPlane route. Expected: required hosted checks pass on the exact repair commit and the repair reaches qualified `main` before release task `202609121424-49XXT3` resumes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
