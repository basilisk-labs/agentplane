---
id: "202609232231-BYSVV6"
title: "Reduce AgentPlane workspace disk usage while preserving canonical task history"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workspace"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-24T10:00:49.653Z"
  updated_by: "HOST:local:USER"
  note: "host_user_decision=sha256:7795a08ce57156adf8b72a5f731013c57c77007563944f2905f72a277c2b13b0"
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
    - "effect_public_api"
    - "material_implementation_uncertainty"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "public_api"
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
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "docs/user"
      - "packages/agentplane/src"
  declaration:
    external_effects: []
    implementation_uncertainty: "material"
    preferred_mode: "branch_pr"
    rationale:
      - "A read-only disk report and proof-gated cleanup guidance need a public operator route."
      - "Existing repository and provider lifecycle effects remain under supervisor ownership."
      - "The requested workspace behavior changes AgentPlane worktree creation and local task access."
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "docs/user"
      - "packages/agentplane/src"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/backends/task-backend.local.test.ts"
      - "packages/agentplane/src/backends/task-backend/load.ts"
      - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
      - "packages/agentplane/src/backends/task-backend/local-backend-write.ts"
      - "packages/agentplane/src/backends/task-backend/local-backend.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.compact-tasks.test.ts"
      - "packages/agentplane/src/commands/branch/work-start.compact-tasks.ts"
      - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
      - "packages/agentplane/src/commands/branch/work-start.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "material_implementation_uncertainty"
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
          - "docs/user"
          - "packages/agentplane/src"
        evidence_requirements:
          - "hosted_integration"
          - "implementation_risk_validation"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "material"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:0b666c01de6c6a7f2c4e6e64dffe15a0001ae90592458acebae2573473ec128a"
      escalation_reasons:
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
        - "effect_public_api"
        - "material_implementation_uncertainty"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/backends/task-backend.local.test.ts"
          - "packages/agentplane/src/backends/task-backend/load.ts"
          - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
          - "packages/agentplane/src/backends/task-backend/local-backend-write.ts"
          - "packages/agentplane/src/backends/task-backend/local-backend.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.compact-tasks.test.ts"
          - "packages/agentplane/src/commands/branch/work-start.compact-tasks.ts"
          - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
          - "packages/agentplane/src/commands/branch/work-start.ts"
        external_effects: []
        repository_effects:
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
        - "docs_contract"
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
      - "implementation_risk_validation"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "cbaa0c2344413686a0da2c746b318c777cd0a28f"
  message: "🚧 BYSVV6 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "External EXECUTOR returned failed: The workspace conflict cannot be resolved within this episode: no dedicated task worktree exists, and the issued checkout is the dirty main repository."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: cbaa0c234441. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-24T10:00:54.015Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "comment"
    at: "2026-09-24T10:04:01.356Z"
    author: "SUPERVISOR"
    body: "External EXECUTOR returned failed: The workspace conflict cannot be resolved within this episode: no dedicated task worktree exists, and the issued checkout is the dirty main repository."
  -
    type: "status"
    at: "2026-09-24T14:39:08.753Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: cbaa0c234441. CLI accepted one state-bound external-agent semantic result."
    commit: "cbaa0c2344413686a0da2c746b318c777cd0a28f"
doc_version: 3
doc_updated_at: "2026-09-24T14:39:08.753Z"
doc_updated_by: "SUPERVISOR"
description: "Avoid materializing completed .agentplane/tasks history in each new task worktree; keep authoritative access through the canonical task store. Add a size inventory and safe cleanup route for retained task worktrees and nested base repositories. Preserve dirty work, Git/provider/task evidence, and current task behavior. Verify focused tests and measured disk behavior."
sections:
  Summary: |-
    Reduce AgentPlane workspace disk usage while preserving canonical task history

    Avoid materializing completed .agentplane/tasks history in each new task worktree; keep authoritative access through the canonical task store. Add a size inventory and safe cleanup route for retained task worktrees and nested base repositories. Preserve dirty work, Git/provider/task evidence, and current task behavior. Verify focused tests and measured disk behavior.
  Scope: |-
    - In scope: Avoid materializing completed .agentplane/tasks history in each new task worktree; keep authoritative access through the canonical task store. Add a size inventory and safe cleanup route for retained task worktrees and nested base repositories. Preserve dirty work, Git/provider/task evidence, and current task behavior. Verify focused tests and measured disk behavior.
    - Out of scope: unrelated refactors not required for "Reduce AgentPlane workspace disk usage while preserving canonical task history".
  Plan: "Prepared a two-item plan for compact task worktrees and safe disk diagnostics."
  Verify Steps: |-
    1. In a fixture repository with completed and active task records, create a new task worktree. Confirm that completed task directories are absent from the new checkout, the current task remains writable there, and historical task reads match canonical bytes.
    2. Confirm that Git status and execution observation still detect tracked changes and reject out-of-scope writes. Confirm missing or unsafe canonical storage fails closed.
    3. Inspect retained worktrees and nested repositories with the disk report. Confirm dirty, active, and provider-unproven entries are reported but not deleted.
    4. Measure fixture worktree disk use before and after the change with du. Record actual bytes and the scope of the measurement.
    5. Run focused history and cleanup tests, bun run typecheck, and bun run ci:local:fast. Review the final diff and report any skipped checks.
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
    approval_evidence_digest: "sha256:7795a08ce57156adf8b72a5f731013c57c77007563944f2905f72a277c2b13b0"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:b7e581ffa72ff7689290618c6f02dd6942eda104cc47fd75997e6515ac7002c6"
    digest: "sha256:143d5ffd28061f21004cd7e7cfe17076febdc8082645b0631de843015ccec8d3"
    grant_id: "6623bf31-0f15-43c6-ab06-1f018ae5af96"
    issued_at: "2026-09-24T10:00:49.653Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:478b0dd36dc6e18dc5de9ec25b446a841101a90a03fbf3ed30e63c5892c8a769"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:7746ee65687d09b82ef44350daabc14fbfdc4cf7d1a515491f063c908b63cc8a"
    status: "active"
    task_id: "202609232231-BYSVV6"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-24T10:00:49.653Z"
        approved_by: "HOST:local:USER"
        approved_digest: "sha256:f2ee045128dd9d0d747a2ad56be4dfda3ce812c46b7376071567ca825b7221db"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-23T22:36:01.837Z"
      digest: "sha256:f2ee045128dd9d0d747a2ad56be4dfda3ce812c46b7376071567ca825b7221db"
      proposal:
        assumptions:
          - "The canonical local task store is the primary checkout for a registered Git repository."
          - "Removal of existing nested repositories is an operator action after independent proof, not an implementation WorkItem."
        planning_baseline:
          captured_at: "2026-09-23T22:31:19.624Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:c6fe0d6c0062a55ce021cd242d5b644309fbb52250f58d04f1c38e219d846481"
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
            - ".agentplane/tasks/202609231422-NM8G22/README.md"
            - ".agentplane/tasks/202609232231-BYSVV6/README.md"
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
            sha: "424e8f72ee1c0bf8c510d236cb3022fe1833169e"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609232231-BYSVV6"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/backends/task-backend.local.test.ts --pool=forks --maxWorkers=1"
              id: "history-tests"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts --pool=forks --maxWorkers=1"
              id: "cleanup-tests"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:fast"
              id: "critical-tests"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              id: "disk-measure"
              kind: "semantic"
              required: true
            -
              capability: "task.verify"
              id: "scope-review"
              kind: "semantic"
              required: true
          criteria:
            -
              check_ids:
                - "history-tests"
                - "disk-measure"
                - "typecheck"
              description: "A new task worktree contains its writable task record without materializing completed task history. Historical task reads and listings resolve through the canonical local store without changing task identity or bytes."
              id: "history-access"
              required: true
            -
              check_ids:
                - "history-tests"
                - "critical-tests"
              description: "New worktrees preserve branch, task write, Git status, and repository observation contracts. Missing or unsafe canonical storage fails closed."
              id: "worktree-safety"
              required: true
            -
              check_ids:
                - "cleanup-tests"
                - "disk-measure"
              description: "An operator can inspect sizes and ownership of retained worktrees and nested repositories. The cleanup route retains dirty, active, or unproven candidates and uses existing provider and task closure proof before deletion."
              id: "disk-diagnostics"
              required: true
            -
              check_ids:
                - "scope-review"
                - "typecheck"
              description: "Changes stay within task storage, worktree creation, disk diagnostics, their tests, and required user documentation. Unrelated dirty work remains untouched."
              id: "scope"
              required: true
          evidence_fingerprint: "sha256:c6fe0d6c0062a55ce021cd242d5b644309fbb52250f58d04f1c38e219d846481"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "history-tests"
                    - "disk-measure"
                    - "typecheck"
                  description: "A new task worktree contains its writable task record without materializing completed task history. Historical task reads and listings resolve through the canonical local store without changing task identity or bytes."
                  id: "history-access"
                  required: true
                -
                  check_ids:
                    - "history-tests"
                    - "critical-tests"
                  description: "New worktrees preserve branch, task write, Git status, and repository observation contracts. Missing or unsafe canonical storage fails closed."
                  id: "worktree-safety"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 220000
                optional_sources:
                  - "packages/agentplane/src/runtime/workspace-allocation"
                  - "packages/agentplane/src/backends/task-backend/local-backend-read.ts"
                required_sources:
                  - "packages/agentplane/src/commands/branch/work-start.ts"
                  - "packages/agentplane/src/commands/branch/work-start.materialize.ts"
                  - "packages/agentplane/src/backends/task-backend/local-backend.ts"
                  - "packages/agentplane/src/commands/shared/task-backend.ts"
                symbol_hints:
                  - "cmdWorkStart"
                  - "LocalBackend"
                  - "resolveTaskOwnerCommandContext"
              depends_on: []
              expected_outputs:
                - "Compact worktree behavior"
                - "Canonical historical read behavior"
                - "Focused regression evidence"
              id: "compact-task-worktree"
              objective: "Create task worktrees without checking out completed task history. Preserve authoritative historical reads through the canonical local task store and keep current task writes local."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/backends/task-backend.local.test.ts --pool=forks --maxWorkers=1"
                    id: "history-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:fast"
                    id: "critical-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    id: "disk-measure"
                    kind: "semantic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "history-tests"
                      - "disk-measure"
                      - "typecheck"
                    description: "A new task worktree contains its writable task record without materializing completed task history. Historical task reads and listings resolve through the canonical local store without changing task identity or bytes."
                    id: "history-access"
                    required: true
                  -
                    check_ids:
                      - "history-tests"
                      - "critical-tests"
                    description: "New worktrees preserve branch, task write, Git status, and repository observation contracts. Missing or unsafe canonical storage fails closed."
                    id: "worktree-safety"
                    required: true
                evidence_fingerprint: "sha256:c6fe0d6c0062a55ce021cd242d5b644309fbb52250f58d04f1c38e219d846481"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "cleanup-tests"
                    - "disk-measure"
                  description: "An operator can inspect sizes and ownership of retained worktrees and nested repositories. The cleanup route retains dirty, active, or unproven candidates and uses existing provider and task closure proof before deletion."
                  id: "disk-diagnostics"
                  required: true
                -
                  check_ids:
                    - "scope-review"
                    - "typecheck"
                  description: "Changes stay within task storage, worktree creation, disk diagnostics, their tests, and required user documentation. Unrelated dirty work remains untouched."
                  id: "scope"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 220000
                optional_sources:
                  - "docs/user"
                  - "packages/agentplane/src/cli"
                required_sources:
                  - "packages/agentplane/src/commands/branch/cleanup-merged.ts"
                  - "packages/agentplane/src/commands/branch/cleanup-merged-proof.ts"
                  - "packages/agentplane/src/commands/doctor"
                symbol_hints:
                  - "cmdCleanupMerged"
                  - "CleanupCandidate"
                  - "doctor"
              depends_on:
                - "compact-task-worktree"
              expected_outputs:
                - "Read-only size and ownership report"
                - "Proof-gated cleanup behavior"
                - "Operator guidance and focused regression evidence"
              id: "disk-inventory-and-cleanup-guard"
              objective: "Expose an operator disk inventory and safe cleanup classification for registered worktrees and nested repositories. Preserve existing closure and provider proof before any deletion."
              optional: false
              priority: 2
              required_inputs:
                - "Compact worktree behavior"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/user"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src"
                - "docs/user"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts --pool=forks --maxWorkers=1"
                    id: "cleanup-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    id: "disk-measure"
                    kind: "semantic"
                    required: true
                  -
                    capability: "task.verify"
                    id: "scope-review"
                    kind: "semantic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "cleanup-tests"
                      - "disk-measure"
                    description: "An operator can inspect sizes and ownership of retained worktrees and nested repositories. The cleanup route retains dirty, active, or unproven candidates and uses existing provider and task closure proof before deletion."
                    id: "disk-diagnostics"
                    required: true
                  -
                    check_ids:
                      - "scope-review"
                      - "typecheck"
                    description: "Changes stay within task storage, worktree creation, disk diagnostics, their tests, and required user documentation. Unrelated dirty work remains untouched."
                    id: "scope"
                    required: true
                evidence_fingerprint: "sha256:c6fe0d6c0062a55ce021cd242d5b644309fbb52250f58d04f1c38e219d846481"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609232231-BYSVV6"
    event_cursor: 6
    final_validation: null
    id: "202609232231-BYSVV6"
    intent:
      acceptance_criteria: []
      captured_at: "2026-09-23T22:31:13.895Z"
      constraints: []
      request: |-
        Reduce AgentPlane workspace disk usage while preserving canonical task history

        Avoid materializing completed .agentplane/tasks history in each new task worktree; keep authoritative access through the canonical task store. Add a size inventory and safe cleanup route for retained task worktrees and nested base repositories. Preserve dirty work, Git/provider/task evidence, and current task behavior. Verify focused tests and measured disk behavior.
      task_id: "202609232231-BYSVV6"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 8
    schema_version: 1
    updated_at: "2026-09-24T14:39:08.753Z"
    work_items:
      compact-task-worktree:
        attempt: 0
        claim_id: null
        id: "compact-task-worktree"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      disk-inventory-and-cleanup-guard:
        attempt: 0
        claim_id: null
        id: "disk-inventory-and-cleanup-guard"
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
      compatibility:sha256:39f51a0ee2b8d85aabc90e90680381ab55dce5afeb28bc3d6cea3f4724c2858d:
        aggregate_digest: "sha256:b9167e320951adaac495b28d329d4fe582aaa2f70cae335e21cb0eb3280871dc"
        event:
          actor_id: "agentplane"
          at: "2026-09-24T10:00:25.365Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_61a5ce028f5968ec21014e18"
          mutation_id: "compatibility:sha256:39f51a0ee2b8d85aabc90e90680381ab55dce5afeb28bc3d6cea3f4724c2858d"
          plan_digest: "sha256:f2ee045128dd9d0d747a2ad56be4dfda3ce812c46b7376071567ca825b7221db"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609232231-BYSVV6"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:39f51a0ee2b8d85aabc90e90680381ab55dce5afeb28bc3d6cea3f4724c2858d"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609232231-BYSVV6"
      compatibility:sha256:5932ab84ab97f62b4aca6740e6b86ea94837e32c45b498055f446eed5a50daa1:
        aggregate_digest: "sha256:358ede45877f3e3b0288aa98eb726756cda94c93117be27c1ecfff53e56333ef"
        event:
          actor_id: "agentplane"
          at: "2026-09-24T10:00:54.015Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_5f5babea3036112ba93ffd88"
          mutation_id: "compatibility:sha256:5932ab84ab97f62b4aca6740e6b86ea94837e32c45b498055f446eed5a50daa1"
          plan_digest: "sha256:f2ee045128dd9d0d747a2ad56be4dfda3ce812c46b7376071567ca825b7221db"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609232231-BYSVV6"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:5932ab84ab97f62b4aca6740e6b86ea94837e32c45b498055f446eed5a50daa1"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609232231-BYSVV6"
      compatibility:sha256:5ad7041185360dcfa2aca49835627b94e0548224a0b603bb63f79daf02c5cf30:
        aggregate_digest: "sha256:12b9bc92af337741ad7ac8176cea4776760bf8b413c5d314fa8cf04ab8dba2d9"
        event:
          actor_id: "agentplane"
          at: "2026-09-24T14:39:08.753Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_9a724115ffce257d72a04f5a"
          mutation_id: "compatibility:sha256:5ad7041185360dcfa2aca49835627b94e0548224a0b603bb63f79daf02c5cf30"
          plan_digest: "sha256:f2ee045128dd9d0d747a2ad56be4dfda3ce812c46b7376071567ca825b7221db"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609232231-BYSVV6"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:5ad7041185360dcfa2aca49835627b94e0548224a0b603bb63f79daf02c5cf30"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609232231-BYSVV6"
      compatibility:sha256:81fc7f91f44ab72d7ac7b2ec3df7fd8a402220091061fe82823983c04c4cf9b8:
        aggregate_digest: "sha256:0aeff65841c3cfb67567cf7e395fc044df5bb4ae6cea93f4a326028fda185761"
        event:
          actor_id: "agentplane"
          at: "2026-09-24T10:00:25.364Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_375eaccc95080fa04f662ff3"
          mutation_id: "compatibility:sha256:81fc7f91f44ab72d7ac7b2ec3df7fd8a402220091061fe82823983c04c4cf9b8"
          plan_digest: "sha256:f2ee045128dd9d0d747a2ad56be4dfda3ce812c46b7376071567ca825b7221db"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609232231-BYSVV6"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:81fc7f91f44ab72d7ac7b2ec3df7fd8a402220091061fe82823983c04c4cf9b8"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609232231-BYSVV6"
      compatibility:sha256:872c79d7d518c90949518ac249ebe9b2ca5862b14d14c41fa02f2fc5047adb95:
        aggregate_digest: "sha256:bec5a56da7680cdd687c1d1def255bb9c2e7fdca13c43ee5ede97c515e600151"
        event:
          actor_id: "agentplane"
          at: "2026-09-24T10:04:01.356Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_1a407efc19e59851c5e70318"
          mutation_id: "compatibility:sha256:872c79d7d518c90949518ac249ebe9b2ca5862b14d14c41fa02f2fc5047adb95"
          plan_digest: "sha256:f2ee045128dd9d0d747a2ad56be4dfda3ce812c46b7376071567ca825b7221db"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609232231-BYSVV6"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:872c79d7d518c90949518ac249ebe9b2ca5862b14d14c41fa02f2fc5047adb95"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609232231-BYSVV6"
      compatibility:sha256:af99f5c4b2a7910770e9a55bcbdc5f69f9b0fece1e022b6f6c19983554e0a063:
        aggregate_digest: "sha256:ffee89e8a5a3867fd8f3012df82778dfca4134c0ced147555265e95e6bd0d88a"
        event:
          actor_id: "agentplane"
          at: "2026-09-24T14:39:08.753Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4e3ed5121b2975887556c06e"
          mutation_id: "compatibility:sha256:af99f5c4b2a7910770e9a55bcbdc5f69f9b0fece1e022b6f6c19983554e0a063"
          plan_digest: "sha256:f2ee045128dd9d0d747a2ad56be4dfda3ce812c46b7376071567ca825b7221db"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609232231-BYSVV6"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:af99f5c4b2a7910770e9a55bcbdc5f69f9b0fece1e022b6f6c19983554e0a063"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609232231-BYSVV6"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "cbaa0c2344413686a0da2c746b318c777cd0a28f"
  task_execution_context:
    base_ref: "origin/main"
    base_sha: "97c2c3dfca1b8a4a6a6f616e4b05341cb0d89927"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "424e8f72ee1c0bf8c510d236cb3022fe1833169e"
    version: 1
id_source: "generated"
---
## Summary

Reduce AgentPlane workspace disk usage while preserving canonical task history

Avoid materializing completed .agentplane/tasks history in each new task worktree; keep authoritative access through the canonical task store. Add a size inventory and safe cleanup route for retained task worktrees and nested base repositories. Preserve dirty work, Git/provider/task evidence, and current task behavior. Verify focused tests and measured disk behavior.

## Scope

- In scope: Avoid materializing completed .agentplane/tasks history in each new task worktree; keep authoritative access through the canonical task store. Add a size inventory and safe cleanup route for retained task worktrees and nested base repositories. Preserve dirty work, Git/provider/task evidence, and current task behavior. Verify focused tests and measured disk behavior.
- Out of scope: unrelated refactors not required for "Reduce AgentPlane workspace disk usage while preserving canonical task history".

## Plan

Prepared a two-item plan for compact task worktrees and safe disk diagnostics.

## Verify Steps

1. In a fixture repository with completed and active task records, create a new task worktree. Confirm that completed task directories are absent from the new checkout, the current task remains writable there, and historical task reads match canonical bytes.
2. Confirm that Git status and execution observation still detect tracked changes and reject out-of-scope writes. Confirm missing or unsafe canonical storage fails closed.
3. Inspect retained worktrees and nested repositories with the disk report. Confirm dirty, active, and provider-unproven entries are reported but not deleted.
4. Measure fixture worktree disk use before and after the change with du. Record actual bytes and the scope of the measurement.
5. Run focused history and cleanup tests, bun run typecheck, and bun run ci:local:fast. Review the final diff and report any skipped checks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
