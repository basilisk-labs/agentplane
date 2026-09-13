---
id: "202609130858-RMHWQ5"
title: "Add an explicit USER-approved supervisor budget epoch for unknown token telemetry"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release-blocker"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.test.ts"
  - "bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
  - "bun run typecheck"
  - "bun run test:critical"
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-09-13T09:02:51.969Z"
  updated_by: "USER"
  note: "User explicitly authorized the bounded budget-epoch repair in this conversation."
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
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
    forbidden_external_effects:
      - "network_read"
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
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
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
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:a2eaeec8aaf4ec9c55cde5ace24e63cb1b95f7b63900c56e65861d66047ba824"
      escalation_reasons:
        - "effect_security_boundary"
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
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-09-13T09:03:04.009Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-13T09:44:42.317Z"
doc_updated_by: "CODER"
description: "When a supervisor episode stops because prior paid work has unavailable or unallocatable provider token telemetry, preserve that historical usage as unknown and continue to block automatic paid dispatch. Add a narrow operator command that accepts an explicit USER authorization, records durable state-bound provenance, and opens a new independently capped token budget epoch without rewriting prior operations or treating unknown usage as zero. Reject stale authorization, non-telemetry stops, missing active USER authority, replay with different parameters, and caps that are absent or invalid. The repaired ST-14 task must be able to resume through this command. Do not weaken actual human_review verdicts or automatic fail-closed admission."
sections:
  Summary: |-
    Add an explicit USER-approved supervisor budget epoch for unknown token telemetry

    When a supervisor episode stops because prior paid work has unavailable or unallocatable provider token telemetry, preserve that historical usage as unknown and continue to block automatic paid dispatch. Add a narrow operator command that accepts an explicit USER authorization, records durable state-bound provenance, and opens a new independently capped token budget epoch without rewriting prior operations or treating unknown usage as zero. Reject stale authorization, non-telemetry stops, missing active USER authority, replay with different parameters, and caps that are absent or invalid. The repaired ST-14 task must be able to resume through this command. Do not weaken actual human_review verdicts or automatic fail-closed admission.
  Scope: |-
    - In scope: When a supervisor episode stops because prior paid work has unavailable or unallocatable provider token telemetry, preserve that historical usage as unknown and continue to block automatic paid dispatch. Add a narrow operator command that accepts an explicit USER authorization, records durable state-bound provenance, and opens a new independently capped token budget epoch without rewriting prior operations or treating unknown usage as zero. Reject stale authorization, non-telemetry stops, missing active USER authority, replay with different parameters, and caps that are absent or invalid. The repaired ST-14 task must be able to resume through this command. Do not weaken actual human_review verdicts or automatic fail-closed admission.
    - Out of scope: unrelated refactors not required for "Add an explicit USER-approved supervisor budget epoch for unknown token telemetry".
  Plan: "Planned one cohesive security-boundary repair with state-bound USER authorization and independent epoch accounting."
  Verify Steps: |-
    1. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.test.ts`. Require USER-bound epoch creation, independent caps, preserved lifetime unknown usage, deterministic replay, and unchanged journals on rejection.
    2. Run `bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts`. Require the operator command to reject stale fingerprints, non-telemetry stops, non-USER actors, invalid caps, and conflicting replay, and to resume the exact stopped task only after valid authorization across route drift.
    3. Run `bun run typecheck`. Require success.
    4. Run `bun run test:critical`. Require existing authority, human_review, telemetry, and supervisor fail-closed behavior to remain green.
    5. Run `bun run ci:local:full`. Require the full local CI route and generated artifacts to pass.
    6. Review `git diff` and `git status --short --untracked-files=all`. Require only planned implementation, tests, generated artifacts, and task-owned evidence; preserve unrelated main-checkout work and exclude `agentplane-roadmap-r2`.
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
    completion_contract_digest: "sha256:25a291aed22068eaf8fe8b085c55a1fae2b61af27fd6244858c24632e92424de"
    digest: "sha256:d552cb6f5f5a4dcbc94d22f90ce5b950e9e251fd6eff79131aadd68848ee56b1"
    grant_id: "7c589522-9ec8-463e-b3b9-f47a8d6ace3f"
    issued_at: "2026-09-13T09:02:51.969Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:0201b817e6858145cd5be2ffa5fd86e1846be4cfc19d8a4b7c6751823cbfe505"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:9b644c486d33091bbe6befad7b0516876292608284e309054704e3abce89f353"
    status: "active"
    task_id: "202609130858-RMHWQ5"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-13T09:02:51.969Z"
        approved_by: "USER"
        approved_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-09-13T09:01:53.549Z"
      digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
      proposal:
        assumptions:
          - "The existing side-effect authority mechanism or an equally state-bound USER receipt is reused instead of adding an unsigned permission store."
          - "Lifetime task cost reporting remains unchanged and includes all historical operations."
        planning_baseline:
          captured_at: "2026-09-13T08:59:06.839Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:0ad8ef9db00ea8cad90848b3a89e5ee947c06029862de584674d9a0513221d61"
          dirty_paths:
            - ".agentplane/tasks/202609072121-9VEHKH/README.md"
            - ".agentplane/tasks/202609080727-BAWTEE/README.md"
            - ".agentplane/tasks/202609121424-49XXT3/README.md"
            - ".agentplane/tasks/202609121424-4BC7B3/README.md"
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
            - ".agentplane/tasks/202609130858-RMHWQ5/README.md"
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
            - "packages/agentplane/src/adapters/task-backend/kernel-plan-rejection-recovery.ts"
            - "packages/agentplane/src/cli/run-cli.roadmap-plan-recovery.test.ts"
            - "packages/agentplane/src/commands/task/kernel-runtime-context.ts"
            - "packages/agentplane/src/commands/task/plan-rejection-recovery.ts"
            - "packages/agentplane/src/runner/adapters/codex-result-transport.ts"
            - "packages/agentplane/src/runner/adapters/codex.ts"
            - "packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
            - "packages/agentplane/src/runner/artifacts.ts"
            - "packages/agentplane/src/runner/context/roadmap-requirement-conservation.test.ts"
            - "packages/agentplane/src/runner/usecases/kernel-authority.test.ts"
            - "packages/agentplane/src/runner/usecases/kernel-authority.ts"
            - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
            - "packages/core/src/runner/agent-work-order.ts"
            - "packages/core/src/tasks/task-kernel/kernel.test.ts"
            - "packages/core/src/tasks/task-kernel/kernel.ts"
            - "scripts/lib/test-route-registry.mjs"
          git:
            kind: "commit"
            ref: null
            sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.test.ts"
              id: "focused-core"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
              id: "focused-cli"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run test:critical"
              id: "critical"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-ci"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
          criteria:
            -
              check_ids:
                - "focused-core"
                - "focused-cli"
              description: "A telemetry-only budget stop can continue only through an explicit state-bound USER authorization with positive finite input, output, and total token caps."
              id: "c-authorized-epoch"
              required: true
            -
              check_ids:
                - "focused-core"
                - "critical"
              description: "Historical unavailable or unallocatable usage remains unknown in lifetime reporting and is never converted to zero, while the new epoch admits only spend within its independent caps."
              id: "c-preserve-unknown"
              required: true
            -
              check_ids:
                - "focused-core"
                - "focused-cli"
                - "critical"
              description: "Stale authorization, non-telemetry stops, non-USER actors, invalid caps, conflicting replay, and actual human_review stops are rejected without changing the journal."
              id: "c-fail-closed"
              required: true
            -
              check_ids:
                - "typecheck"
                - "full-ci"
              description: "The complete local CI route passes and generated schema or CLI artifacts remain synchronized."
              id: "c-release-safe"
              required: true
          evidence_fingerprint: "sha256:0ad8ef9db00ea8cad90848b3a89e5ee947c06029862de584674d9a0513221d61"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused-core"
                    - "focused-cli"
                  description: "A telemetry-only budget stop can continue only through an explicit state-bound USER authorization with positive finite input, output, and total token caps."
                  id: "c-authorized-epoch"
                  required: true
                -
                  check_ids:
                    - "focused-core"
                    - "critical"
                  description: "Historical unavailable or unallocatable usage remains unknown in lifetime reporting and is never converted to zero, while the new epoch admits only spend within its independent caps."
                  id: "c-preserve-unknown"
                  required: true
                -
                  check_ids:
                    - "focused-core"
                    - "focused-cli"
                    - "critical"
                  description: "Stale authorization, non-telemetry stops, non-USER actors, invalid caps, conflicting replay, and actual human_review stops are rejected without changing the journal."
                  id: "c-fail-closed"
                  required: true
                -
                  check_ids:
                    - "typecheck"
                    - "full-ci"
                  description: "The complete local CI route passes and generated schema or CLI artifacts remain synchronized."
                  id: "c-release-safe"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 120000
                optional_sources:
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
                required_sources:
                  - "packages/core/src/runner/supervisor-execution-episode.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.ts"
                  - "packages/agentplane/src/commands/task/authority-grant.command.ts"
                symbol_hints:
                  - "exhaustedDimensions"
                  - "recoverSupervisorExecutionEpisodeAfterResolvedTokenTelemetry"
                  - "makeRunTaskAuthorityGrantHandler"
              depends_on: []
              expected_outputs:
                - "Durable budget epoch state that preserves lifetime unknown usage"
                - "State-bound USER-only operator authorization path"
                - "Focused core and CLI regression coverage"
              id: "budget-epoch-repair"
              objective: "Implement the durable USER-approved token budget epoch and its narrow operator command, then prove admission and replay behavior end to end."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner/supervisor-execution-episode.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
              risk: "high"
              scope_roots:
                - "packages/core/src/runner/supervisor-execution-episode.ts"
                - "packages/core/src/schemas/index.ts"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli"
                - "scripts/lib/test-route-registry.mjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.test.ts"
                    id: "focused-core"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
                    id: "focused-cli"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run test:critical"
                    id: "critical"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-ci"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "focused-core"
                      - "focused-cli"
                    description: "A telemetry-only budget stop can continue only through an explicit state-bound USER authorization with positive finite input, output, and total token caps."
                    id: "c-authorized-epoch"
                    required: true
                  -
                    check_ids:
                      - "focused-core"
                      - "critical"
                    description: "Historical unavailable or unallocatable usage remains unknown in lifetime reporting and is never converted to zero, while the new epoch admits only spend within its independent caps."
                    id: "c-preserve-unknown"
                    required: true
                  -
                    check_ids:
                      - "focused-core"
                      - "focused-cli"
                      - "critical"
                    description: "Stale authorization, non-telemetry stops, non-USER actors, invalid caps, conflicting replay, and actual human_review stops are rejected without changing the journal."
                    id: "c-fail-closed"
                    required: true
                  -
                    check_ids:
                      - "typecheck"
                      - "full-ci"
                    description: "The complete local CI route passes and generated schema or CLI artifacts remain synchronized."
                    id: "c-release-safe"
                    required: true
                evidence_fingerprint: "sha256:0ad8ef9db00ea8cad90848b3a89e5ee947c06029862de584674d9a0513221d61"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609130858-RMHWQ5"
    event_cursor: 5
    final_validation: null
    id: "202609130858-RMHWQ5"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run test:critical"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.test.ts"
          id: "legacy-4"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-5"
          required: true
      captured_at: "2026-09-13T08:59:00.060Z"
      constraints: []
      request: |-
        Add an explicit USER-approved supervisor budget epoch for unknown token telemetry

        When a supervisor episode stops because prior paid work has unavailable or unallocatable provider token telemetry, preserve that historical usage as unknown and continue to block automatic paid dispatch. Add a narrow operator command that accepts an explicit USER authorization, records durable state-bound provenance, and opens a new independently capped token budget epoch without rewriting prior operations or treating unknown usage as zero. Reject stale authorization, non-telemetry stops, missing active USER authority, replay with different parameters, and caps that are absent or invalid. The repaired ST-14 task must be able to resume through this command. Do not weaken actual human_review verdicts or automatic fail-closed admission.
      task_id: "202609130858-RMHWQ5"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 7
    schema_version: 1
    updated_at: "2026-09-13T09:44:42.315Z"
    work_items:
      budget-epoch-repair:
        attempt: 0
        claim_id: null
        id: "budget-epoch-repair"
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
      compatibility:sha256:19680a2c852d6c81dcbebebb67931ba2e11d8395df79a615903d0b5bfb1489b0:
        aggregate_digest: "sha256:2017a84c45212497953a3d6f411a7f51453af68f65952e2a4c8e9a507fe1a4fc"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T09:02:46.359Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_31e39602471f8947431848a8"
          mutation_id: "compatibility:sha256:19680a2c852d6c81dcbebebb67931ba2e11d8395df79a615903d0b5bfb1489b0"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:19680a2c852d6c81dcbebebb67931ba2e11d8395df79a615903d0b5bfb1489b0"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
      compatibility:sha256:2700840116a771d4bbbc6a4c08d88a40a67bc5ec2f935f9889b13532cfabbd9c:
        aggregate_digest: "sha256:673dcd439f27b34804b503f7697edf57634b270fddd5a7d73acc2a58439531d6"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T09:02:46.360Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_78ffe31595dcda6c8df497c1"
          mutation_id: "compatibility:sha256:2700840116a771d4bbbc6a4c08d88a40a67bc5ec2f935f9889b13532cfabbd9c"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2700840116a771d4bbbc6a4c08d88a40a67bc5ec2f935f9889b13532cfabbd9c"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
      compatibility:sha256:5a57962541a4ed90a85cb0e3ddc8e234902f070347a63e756b2329206295ea19:
        aggregate_digest: "sha256:9162091728279e80a85e5521e8e2a4e13e45423c39a4c0de6240660b167c2aca"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T09:03:04.009Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_0359bdd4598697db951c1718"
          mutation_id: "compatibility:sha256:5a57962541a4ed90a85cb0e3ddc8e234902f070347a63e756b2329206295ea19"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:5a57962541a4ed90a85cb0e3ddc8e234902f070347a63e756b2329206295ea19"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
      compatibility:sha256:b9a661cdb439fed484e24dc9728910458d98af7d05beb634144beebf5c6f7a44:
        aggregate_digest: "sha256:59b18ab50ab29de6a182aaca82f563e76e1404044cd247828ed81196d5997679"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T09:03:04.009Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_7a88e8166fd2379ecf66d1be"
          mutation_id: "compatibility:sha256:b9a661cdb439fed484e24dc9728910458d98af7d05beb634144beebf5c6f7a44"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b9a661cdb439fed484e24dc9728910458d98af7d05beb634144beebf5c6f7a44"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
      compatibility:sha256:dee20534b61ce42f288a62cacb27793e2ae5ae6115c9f2c6292beee91f81ce76:
        aggregate_digest: "sha256:3a5c2a33c8e9d9c8d932c1295bfdb03dbd56966e596bc13d6181652779b12755"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T09:44:42.315Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_dbfdcf9e1465c69ba0babd85"
          mutation_id: "compatibility:sha256:dee20534b61ce42f288a62cacb27793e2ae5ae6115c9f2c6292beee91f81ce76"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:dee20534b61ce42f288a62cacb27793e2ae5ae6115c9f2c6292beee91f81ce76"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
    version: 1
id_source: "generated"
---
## Summary

Add an explicit USER-approved supervisor budget epoch for unknown token telemetry

When a supervisor episode stops because prior paid work has unavailable or unallocatable provider token telemetry, preserve that historical usage as unknown and continue to block automatic paid dispatch. Add a narrow operator command that accepts an explicit USER authorization, records durable state-bound provenance, and opens a new independently capped token budget epoch without rewriting prior operations or treating unknown usage as zero. Reject stale authorization, non-telemetry stops, missing active USER authority, replay with different parameters, and caps that are absent or invalid. The repaired ST-14 task must be able to resume through this command. Do not weaken actual human_review verdicts or automatic fail-closed admission.

## Scope

- In scope: When a supervisor episode stops because prior paid work has unavailable or unallocatable provider token telemetry, preserve that historical usage as unknown and continue to block automatic paid dispatch. Add a narrow operator command that accepts an explicit USER authorization, records durable state-bound provenance, and opens a new independently capped token budget epoch without rewriting prior operations or treating unknown usage as zero. Reject stale authorization, non-telemetry stops, missing active USER authority, replay with different parameters, and caps that are absent or invalid. The repaired ST-14 task must be able to resume through this command. Do not weaken actual human_review verdicts or automatic fail-closed admission.
- Out of scope: unrelated refactors not required for "Add an explicit USER-approved supervisor budget epoch for unknown token telemetry".

## Plan

Planned one cohesive security-boundary repair with state-bound USER authorization and independent epoch accounting.

## Verify Steps

1. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.test.ts`. Require USER-bound epoch creation, independent caps, preserved lifetime unknown usage, deterministic replay, and unchanged journals on rejection.
2. Run `bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts`. Require the operator command to reject stale fingerprints, non-telemetry stops, non-USER actors, invalid caps, and conflicting replay, and to resume the exact stopped task only after valid authorization across route drift.
3. Run `bun run typecheck`. Require success.
4. Run `bun run test:critical`. Require existing authority, human_review, telemetry, and supervisor fail-closed behavior to remain green.
5. Run `bun run ci:local:full`. Require the full local CI route and generated artifacts to pass.
6. Review `git diff` and `git status --short --untracked-files=all`. Require only planned implementation, tests, generated artifacts, and task-owned evidence; preserve unrelated main-checkout work and exclude `agentplane-roadmap-r2`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
