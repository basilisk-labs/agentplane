---
id: "202609121423-9WPTCW"
title: "Implement the 0.7.9 baseline inventory and lifecycle characterization for ST-01 through ST-05 and ST-21"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release-0.7.9"
  - "roadmap-st-01-05-21"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "node --test scripts/checks/architecture-inventory.test.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-12T14:30:49.837Z"
  updated_by: "HOST:codex-local:USER"
  note: "host_user_decision=sha256:995683c8e5097bf5d247700fa0527e961ecee710e330d6fbce93f070989ddb64"
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
      - "documentation"
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
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/backends/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "scripts/baselines"
      - "scripts/checks"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A branch PR is required by repository policy and provides hosted integration evidence."
      - "The task adds a reproducible inventory and characterization coverage without changing production lifecycle behavior."
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/backends/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "scripts/baselines"
      - "scripts/checks"
  observed:
    authority_violations: []
    changed_components:
      - "scripts"
    changed_paths:
      - "scripts/baselines/architecture-inventory.json"
      - "scripts/checks/architecture-inventory.mjs"
      - "scripts/checks/architecture-inventory.test.mjs"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
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
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/backends/task-backend"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
          - "scripts/baselines"
          - "scripts/checks"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:703b29e1cc59dc22f508eef7daa988f15efc7d7f17539fe60529cc8ccae7cc92"
      escalation_reasons:
        - "central_path:scripts/checks/architecture-inventory.mjs"
        - "central_path:scripts/checks/architecture-inventory.test.mjs"
        - "unknown_path:scripts/baselines/architecture-inventory.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "scripts"
        changed_files:
          - "scripts/baselines/architecture-inventory.json"
          - "scripts/checks/architecture-inventory.mjs"
          - "scripts/checks/architecture-inventory.test.mjs"
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
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "920a6d95418455d87c02e00ad387395c0b91ca13"
  message: "🚧 9WPTCW task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 920a6d954184. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-12T14:30:55.182Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-12T14:34:45.208Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 920a6d954184. CLI accepted one state-bound external-agent semantic result."
    commit: "920a6d95418455d87c02e00ad387395c0b91ca13"
doc_version: 3
doc_updated_at: "2026-09-12T14:34:45.208Z"
doc_updated_by: "SUPERVISOR"
description: "Source contract: agentplane-roadmap-r2 cards ST-01, ST-02, ST-03, ST-04, ST-05, and ST-21. Reproduce a source-bound lifecycle and Blueprint consumer/writer inventory, freeze ordinary direct and branch-PR completion, rework versus infrastructure retry, admission/crash/context-role invariants, and local/remote-backend serialization, staleness, conflict, and unsupported-format behavior. Preserve I01-I12 and C01-C08. Do not introduce a new runtime registry, sync subsystem, provider access, or lifecycle format. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/checks/architecture-inventory.test.mjs; focused AgentPlane characterization tests for direct, branch, rework, recovery, and backend round trips with nonzero discovery; relevant critical suites, typecheck, schema and mirror checks."
sections:
  Summary: |-
    Implement the 0.7.9 baseline inventory and lifecycle characterization for ST-01 through ST-05 and ST-21

    Source contract: agentplane-roadmap-r2 cards ST-01, ST-02, ST-03, ST-04, ST-05, and ST-21. Reproduce a source-bound lifecycle and Blueprint consumer/writer inventory, freeze ordinary direct and branch-PR completion, rework versus infrastructure retry, admission/crash/context-role invariants, and local/remote-backend serialization, staleness, conflict, and unsupported-format behavior. Preserve I01-I12 and C01-C08. Do not introduce a new runtime registry, sync subsystem, provider access, or lifecycle format. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/checks/architecture-inventory.test.mjs; focused AgentPlane characterization tests for direct, branch, rework, recovery, and backend round trips with nonzero discovery; relevant critical suites, typecheck, schema and mirror checks.
  Scope: |-
    - In scope: Source contract: agentplane-roadmap-r2 cards ST-01, ST-02, ST-03, ST-04, ST-05, and ST-21. Reproduce a source-bound lifecycle and Blueprint consumer/writer inventory, freeze ordinary direct and branch-PR completion, rework versus infrastructure retry, admission/crash/context-role invariants, and local/remote-backend serialization, staleness, conflict, and unsupported-format behavior. Preserve I01-I12 and C01-C08. Do not introduce a new runtime registry, sync subsystem, provider access, or lifecycle format. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/checks/architecture-inventory.test.mjs; focused AgentPlane characterization tests for direct, branch, rework, recovery, and backend round trips with nonzero discovery; relevant critical suites, typecheck, schema and mirror checks.
    - Out of scope: unrelated refactors not required for "Implement the 0.7.9 baseline inventory and lifecycle characterization for ST-01 through ST-05 and ST-21".
  Plan: "Defined six dependency-ordered WorkItems for the 0.7.9 inventory and lifecycle characterization scope."
  Verify Steps: |-
    1. Run `node --test scripts/checks/architecture-inventory.test.mjs`; require a nonzero passing test count and a reproducible inventory for the same clean SHA.
    2. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-direct.test.ts`; require direct success, forged-result rejection, independent review, and idempotent terminal replay.
    3. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-branch.test.ts`; require exact hosted identities, distinct USER/provider waits, and fail-closed wrong-head and moved-base cases.
    4. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts`; require zero new EXECUTOR dispatches for infrastructure retry and trusted SUPERVISOR rework evidence.
    5. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-recovery.test.ts`; require exact admission identity and reuse of accepted semantic results across crash boundaries.
    6. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-backend-roundtrip.test.ts`; require Plan, authority, and verification round trips plus stale, conflict, field-loss, and unsupported-format rejection.
    7. Run `bun run typecheck`, `bun run schemas:check`, `bun run artifacts:check`, `bun run test:critical`, and `bun run test:backend-critical`; require all checks to pass without weakening existing negative cases.
    8. Review the final diff and `git status --short --untracked-files=all`; require no roadmap file, unrelated task artifact, secret, generated drift, or unintended path in the task change.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex-local:USER"
    approval_evidence_digest: "sha256:995683c8e5097bf5d247700fa0527e961ecee710e330d6fbce93f070989ddb64"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:e2948d9d384b38b3f5e77112cf7ab5b5144ff9c778c1bde311f0402d7c728526"
    digest: "sha256:5d634d2b7fd37c50cb57741dd46e3a75adce5bf4cac0c6e188ca9135f27de0e3"
    grant_id: "9a27a1f0-c13b-4e65-8bab-a2269b73d87b"
    issued_at: "2026-09-12T14:30:49.837Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:07fbc17de0087c851d201aca4f5a3a1b967cb54e9a732d49a1acc2a121adca41"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:6e76757dba9c7537b20c4800346e6402974496d133d0326d575800b5e907aaba"
    status: "active"
    task_id: "202609121423-9WPTCW"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-12T14:30:49.837Z"
        approved_by: "HOST:codex-local:USER"
        approved_digest: "sha256:ae5b71eb9074bffca3ca705501e2d78bdd0fbc90b257e5d157332c9845bbbbdf"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-12T14:29:21.071Z"
      digest: "sha256:ae5b71eb9074bffca3ca705501e2d78bdd0fbc90b257e5d157332c9845bbbbdf"
      proposal:
        assumptions:
          - "Equivalent existing focused tests may be extended instead of adding the proposed roadmap-named file when they prove the same acceptance contract and execute a nonzero test count."
        planning_baseline:
          captured_at: "2026-09-12T14:25:17.811Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:11acace7198d63cabb2ce43f045ba44280347f7dbc2e66de3420434b095ebce0"
          dirty_paths:
            - ".agentplane/tasks/202609072121-9VEHKH/README.md"
            - ".agentplane/tasks/202609080727-BAWTEE/README.md"
            - ".agentplane/tasks/202609121423-9WPTCW/README.md"
            - ".agentplane/tasks/202609121424-3YAX44/README.md"
            - ".agentplane/tasks/202609121424-49XXT3/README.md"
            - ".agentplane/tasks/202609121424-4BC7B3/README.md"
            - ".agentplane/tasks/202609121424-T83XJA/README.md"
            - ".agentplane/tasks/202609121424-ZEJ656/README.md"
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
            sha: "f3c1991ddd92943775b6b4b4688009afc3d523bc"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609121423-9WPTCW"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node --test scripts/checks/architecture-inventory.test.mjs"
              id: "check-inventory"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-direct.test.ts"
              id: "check-direct"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-branch.test.ts"
              id: "check-branch"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts"
              id: "check-rework"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-recovery.test.ts"
              id: "check-recovery"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-backend-roundtrip.test.ts"
              id: "check-backend"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run schemas:check"
              id: "check-schemas"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run artifacts:check"
              id: "check-artifacts"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run test:critical"
              id: "check-critical"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run test:backend-critical"
              id: "check-backend-critical"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
          criteria:
            -
              check_ids:
                - "check-inventory"
              description: "A clean SHA reproduces a source-bound inventory of lifecycle writers, Blueprint producers and consumers, public exports, project-local definitions, Recipe extensions, generated mirrors, backend entrypoints, and TaskCentricOrchestrator; unknown semantics are explicit blockers."
              id: "c-inventory"
              required: true
            -
              check_ids:
                - "check-direct"
              description: "The production direct route fixture records dispatch, accepted outputs, native checks, independent evaluation, final tree, and idempotent terminal replay; a forged unchecked result cannot finish."
              id: "c-direct"
              required: true
            -
              check_ids:
                - "check-branch"
              description: "The branch_pr fixture binds implementation, provider, hosted-check, merge, and base identities; USER and provider waits remain distinct; wrong-head checks and moved-base integration are rejected."
              id: "c-branch"
              required: true
            -
              check_ids:
                - "check-rework"
              description: "Infrastructure-only verification retry causes no new EXECUTOR dispatch, semantic rework advances only when implementation must change, and forged non-SUPERVISOR event receipts are rejected."
              id: "c-rework"
              required: true
            -
              check_ids:
                - "check-recovery"
              description: "Outstanding WorkOrders, context roles, claims, saved results, native checks, effect-in-doubt, and receipt-boundary restarts preserve exact identity and never regenerate accepted semantic work."
              id: "c-recovery"
              required: true
            -
              check_ids:
                - "check-backend"
              description: "Supported local and fake remote backend ports preserve Plan, authority, and verification fields; stale replicas, revision conflicts, field loss, and unsupported formats fail closed before mutation."
              id: "c-backend"
              required: true
            -
              check_ids:
                - "check-typecheck"
                - "check-schemas"
                - "check-artifacts"
                - "check-critical"
                - "check-backend-critical"
              description: "The changed scope passes type, schema, artifact, critical CLI, and backend-critical verification without weakening existing negative or release-stage behavior."
              id: "c-regression"
              required: true
          evidence_fingerprint: "sha256:11acace7198d63cabb2ce43f045ba44280347f7dbc2e66de3420434b095ebce0"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-inventory"
                  description: "A clean SHA reproduces a source-bound inventory of lifecycle writers, Blueprint producers and consumers, public exports, project-local definitions, Recipe extensions, generated mirrors, backend entrypoints, and TaskCentricOrchestrator; unknown semantics are explicit blockers."
                  id: "c-inventory"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "Existing architecture and generated-artifact checks"
                required_sources:
                  - "packages/agentplane/src/commands/task/run.command.ts"
                  - "packages/agentplane/src/commands/task/advance.command.ts"
                  - "packages/agentplane/src/blueprints/index.ts"
                  - "packages/recipes/src/manifest-contracts.ts"
                  - "packages/core/src/tasks/task-centric/index.ts"
                  - "packages/core/src/tasks/task-centric/orchestrator.ts"
                  - "packages/agentplane/src/commands/shared/task-verification-input-types.ts"
                symbol_hints:
                  - "runCanonicalTask"
                  - "TaskCentricOrchestrator"
                  - "BlueprintSnapshotRef"
              depends_on: []
              expected_outputs:
                - "inventory-ledger"
                - "inventory-test"
              id: "ST-01"
              objective: "Create the reproducible architecture inventory and its deterministic test."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/baselines"
              risk: "low"
              scope_roots:
                - "scripts/checks"
                - "scripts/baselines"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node --test scripts/checks/architecture-inventory.test.mjs"
                    id: "check-inventory"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                criteria:
                  -
                    check_ids:
                      - "check-inventory"
                    description: "A clean SHA reproduces a source-bound inventory of lifecycle writers, Blueprint producers and consumers, public exports, project-local definitions, Recipe extensions, generated mirrors, backend entrypoints, and TaskCentricOrchestrator; unknown semantics are explicit blockers."
                    id: "c-inventory"
                    required: true
                evidence_fingerprint: "sha256:11acace7198d63cabb2ce43f045ba44280347f7dbc2e66de3420434b095ebce0"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-direct"
                  description: "The production direct route fixture records dispatch, accepted outputs, native checks, independent evaluation, final tree, and idempotent terminal replay; a forged unchecked result cannot finish."
                  id: "c-direct"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "Existing direct supervisor and CLI core tests"
                required_sources:
                  - "packages/agentplane/src/commands/task/direct-task-supervisor.ts"
                  - "packages/agentplane/src/commands/task/advance.command.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                symbol_hints:
                  - "runCli"
                  - "directTaskSupervisor"
              depends_on:
                - "ST-01"
              expected_outputs:
                - "direct-characterization"
              id: "ST-02"
              objective: "Characterize ordinary direct completion through production CLI dispatch and local fake semantic execution."
              optional: false
              priority: 90
              required_inputs:
                - "inventory-ledger"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.roadmap-direct.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-direct.test.ts"
                    id: "check-direct"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                criteria:
                  -
                    check_ids:
                      - "check-direct"
                    description: "The production direct route fixture records dispatch, accepted outputs, native checks, independent evaluation, final tree, and idempotent terminal replay; a forged unchecked result cannot finish."
                    id: "c-direct"
                    required: true
                evidence_fingerprint: "sha256:11acace7198d63cabb2ce43f045ba44280347f7dbc2e66de3420434b095ebce0"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-branch"
                  description: "The branch_pr fixture binds implementation, provider, hosted-check, merge, and base identities; USER and provider waits remain distinct; wrong-head checks and moved-base integration are rejected."
                  id: "c-branch"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 220000
                optional_sources:
                  - "Existing hosted provider fixtures"
                required_sources:
                  - "packages/agentplane/src/commands/task/branch-task-supervisor.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                  - "packages/agentplane/src/commands/task/advance.command.ts"
                  - "packages/agentplane/src/commands/shared/route-decision.ts"
                symbol_hints:
                  - "branchTaskSupervisor"
                  - "routeDecision"
              depends_on:
                - "ST-01"
              expected_outputs:
                - "branch-characterization"
              id: "ST-03"
              objective: "Characterize branch_pr and hosted completion with real local use cases and stubbed provider responses."
              optional: false
              priority: 90
              required_inputs:
                - "inventory-ledger"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.roadmap-branch.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-branch.test.ts"
                    id: "check-branch"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                criteria:
                  -
                    check_ids:
                      - "check-branch"
                    description: "The branch_pr fixture binds implementation, provider, hosted-check, merge, and base identities; USER and provider waits remain distinct; wrong-head checks and moved-base integration are rejected."
                    id: "c-branch"
                    required: true
                evidence_fingerprint: "sha256:11acace7198d63cabb2ce43f045ba44280347f7dbc2e66de3420434b095ebce0"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-rework"
                  description: "Infrastructure-only verification retry causes no new EXECUTOR dispatch, semantic rework advances only when implementation must change, and forged non-SUPERVISOR event receipts are rejected."
                  id: "c-rework"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 160000
                optional_sources:
                  - "Existing verification rework tests"
                required_sources:
                  - "packages/agentplane/src/commands/shared/route-decision-verification.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                symbol_hints:
                  - "needs_rework"
                  - "SUPERVISOR"
              depends_on:
                - "ST-02"
                - "ST-03"
              expected_outputs:
                - "rework-characterization"
              id: "ST-04"
              objective: "Freeze the distinction between semantic rework and infrastructure-only verification retry."
              optional: false
              priority: 80
              required_inputs:
                - "direct-characterization"
                - "branch-characterization"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts"
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts"
                    id: "check-rework"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                criteria:
                  -
                    check_ids:
                      - "check-rework"
                    description: "Infrastructure-only verification retry causes no new EXECUTOR dispatch, semantic rework advances only when implementation must change, and forged non-SUPERVISOR event receipts are rejected."
                    id: "c-rework"
                    required: true
                evidence_fingerprint: "sha256:11acace7198d63cabb2ce43f045ba44280347f7dbc2e66de3420434b095ebce0"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-recovery"
                  description: "Outstanding WorkOrders, context roles, claims, saved results, native checks, effect-in-doubt, and receipt-boundary restarts preserve exact identity and never regenerate accepted semantic work."
                  id: "c-recovery"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 240000
                optional_sources:
                  - "Existing fault-injection and recovery tests"
                required_sources:
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                  - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                  - "packages/agentplane/src/commands/task/run.command.ts"
                  - "packages/agentplane/src/commands/task/advance.command.ts"
                symbol_hints:
                  - "effect_in_doubt"
                  - "external WorkOrder"
                  - "CURATOR"
              depends_on:
                - "ST-01"
              expected_outputs:
                - "recovery-characterization"
              id: "ST-05"
              objective: "Freeze admission, crash recovery, and context-role behavior at every durable receipt boundary."
              optional: false
              priority: 90
              required_inputs:
                - "inventory-ledger"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.roadmap-recovery.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-recovery.test.ts"
                    id: "check-recovery"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                criteria:
                  -
                    check_ids:
                      - "check-recovery"
                    description: "Outstanding WorkOrders, context roles, claims, saved results, native checks, effect-in-doubt, and receipt-boundary restarts preserve exact identity and never regenerate accepted semantic work."
                    id: "c-recovery"
                    required: true
                evidence_fingerprint: "sha256:11acace7198d63cabb2ce43f045ba44280347f7dbc2e66de3420434b095ebce0"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-backend"
                  description: "Supported local and fake remote backend ports preserve Plan, authority, and verification fields; stale replicas, revision conflicts, field loss, and unsupported formats fail closed before mutation."
                  id: "c-backend"
                  required: true
                -
                  check_ids:
                    - "check-typecheck"
                    - "check-schemas"
                    - "check-artifacts"
                    - "check-critical"
                    - "check-backend-critical"
                  description: "The changed scope passes type, schema, artifact, critical CLI, and backend-critical verification without weakening existing negative or release-stage behavior."
                  id: "c-regression"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 240000
                optional_sources:
                  - "Existing backend critical tests and local fake adapters"
                required_sources:
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/commands/shared/task-mutation.ts"
                symbol_hints:
                  - "revision conflict"
                  - "replica staleness"
                  - "format negotiation"
              depends_on:
                - "ST-01"
              expected_outputs:
                - "backend-characterization"
              id: "ST-21"
              objective: "Characterize task backend persistence and projection round trips with local fakes for remote ports."
              optional: false
              priority: 85
              required_inputs:
                - "inventory-ledger"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/roadmap-backend-roundtrip.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/commands/shared"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-backend-roundtrip.test.ts"
                    id: "check-backend"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "check-typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run schemas:check"
                    id: "check-schemas"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run artifacts:check"
                    id: "check-artifacts"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run test:critical"
                    id: "check-critical"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run test:backend-critical"
                    id: "check-backend-critical"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "check-backend"
                    description: "Supported local and fake remote backend ports preserve Plan, authority, and verification fields; stale replicas, revision conflicts, field loss, and unsupported formats fail closed before mutation."
                    id: "c-backend"
                    required: true
                  -
                    check_ids:
                      - "check-typecheck"
                      - "check-schemas"
                      - "check-artifacts"
                      - "check-critical"
                      - "check-backend-critical"
                    description: "The changed scope passes type, schema, artifact, critical CLI, and backend-critical verification without weakening existing negative or release-stage behavior."
                    id: "c-regression"
                    required: true
                evidence_fingerprint: "sha256:11acace7198d63cabb2ce43f045ba44280347f7dbc2e66de3420434b095ebce0"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609121423-9WPTCW"
    event_cursor: 5
    final_validation: null
    id: "202609121423-9WPTCW"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "node --test scripts/checks/architecture-inventory.test.mjs"
          id: "legacy-1"
          required: true
      captured_at: "2026-09-12T14:23:50.548Z"
      constraints: []
      request: |-
        Implement the 0.7.9 baseline inventory and lifecycle characterization for ST-01 through ST-05 and ST-21

        Source contract: agentplane-roadmap-r2 cards ST-01, ST-02, ST-03, ST-04, ST-05, and ST-21. Reproduce a source-bound lifecycle and Blueprint consumer/writer inventory, freeze ordinary direct and branch-PR completion, rework versus infrastructure retry, admission/crash/context-role invariants, and local/remote-backend serialization, staleness, conflict, and unsupported-format behavior. Preserve I01-I12 and C01-C08. Do not introduce a new runtime registry, sync subsystem, provider access, or lifecycle format. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/checks/architecture-inventory.test.mjs; focused AgentPlane characterization tests for direct, branch, rework, recovery, and backend round trips with nonzero discovery; relevant critical suites, typecheck, schema and mirror checks.
      task_id: "202609121423-9WPTCW"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 7
    schema_version: 1
    updated_at: "2026-09-12T14:34:45.208Z"
    work_items:
      ST-01:
        attempt: 0
        claim_id: null
        id: "ST-01"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      ST-02:
        attempt: 0
        claim_id: null
        id: "ST-02"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      ST-03:
        attempt: 0
        claim_id: null
        id: "ST-03"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      ST-04:
        attempt: 0
        claim_id: null
        id: "ST-04"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      ST-05:
        attempt: 0
        claim_id: null
        id: "ST-05"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      ST-21:
        attempt: 0
        claim_id: null
        id: "ST-21"
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
      compatibility:sha256:6860b683156ec753d5c0d9f8036dc7a969283ca388a3e7e0f5e3ef0aa16db55d:
        aggregate_digest: "sha256:9c8c649f643582b73e660dd822ee83009b2d6cef5dfd2999c81635675da9d714"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T14:30:55.182Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c8da842f24035b0f0e8ce30c"
          mutation_id: "compatibility:sha256:6860b683156ec753d5c0d9f8036dc7a969283ca388a3e7e0f5e3ef0aa16db55d"
          plan_digest: "sha256:ae5b71eb9074bffca3ca705501e2d78bdd0fbc90b257e5d157332c9845bbbbdf"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121423-9WPTCW"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6860b683156ec753d5c0d9f8036dc7a969283ca388a3e7e0f5e3ef0aa16db55d"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609121423-9WPTCW"
      compatibility:sha256:71b7344157552560446ca2ef247f6fd0c01346b37954097fb00da7b586d9a706:
        aggregate_digest: "sha256:446fe2596378848deb2f543acf9757b4639821ec42584cf4c0b8e2d72726587e"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T14:30:39.990Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_4e5a880da2fcb7032b803045"
          mutation_id: "compatibility:sha256:71b7344157552560446ca2ef247f6fd0c01346b37954097fb00da7b586d9a706"
          plan_digest: "sha256:ae5b71eb9074bffca3ca705501e2d78bdd0fbc90b257e5d157332c9845bbbbdf"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121423-9WPTCW"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:71b7344157552560446ca2ef247f6fd0c01346b37954097fb00da7b586d9a706"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609121423-9WPTCW"
      compatibility:sha256:c2bc0ee92f5c5b428bc973b41522c98e84afaf3c19de2be56b159c424de69f79:
        aggregate_digest: "sha256:9a7068d889c50698ba98e878f5f45491fa73eab4b7036fd9082b8130d0cf2254"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T14:30:39.993Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_25b9d6f08ede9315209f4d9a"
          mutation_id: "compatibility:sha256:c2bc0ee92f5c5b428bc973b41522c98e84afaf3c19de2be56b159c424de69f79"
          plan_digest: "sha256:ae5b71eb9074bffca3ca705501e2d78bdd0fbc90b257e5d157332c9845bbbbdf"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121423-9WPTCW"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:c2bc0ee92f5c5b428bc973b41522c98e84afaf3c19de2be56b159c424de69f79"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609121423-9WPTCW"
      compatibility:sha256:cd41ab14f729cef097810b149c9ad15d17514c48a909bac33d1bd4280eeb66fb:
        aggregate_digest: "sha256:98a5e8e87730b36aab2f748a867ebd5580433ba5aa6f4d0952d5f541a0027145"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T14:34:45.208Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_ea7fe4d3a1b20b34c23c342f"
          mutation_id: "compatibility:sha256:cd41ab14f729cef097810b149c9ad15d17514c48a909bac33d1bd4280eeb66fb"
          plan_digest: "sha256:ae5b71eb9074bffca3ca705501e2d78bdd0fbc90b257e5d157332c9845bbbbdf"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121423-9WPTCW"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:cd41ab14f729cef097810b149c9ad15d17514c48a909bac33d1bd4280eeb66fb"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609121423-9WPTCW"
      compatibility:sha256:fec9aec4a5a80fb9104dbf30edc652dd9866fc7e58c753d6e25ad91420992eb5:
        aggregate_digest: "sha256:50fc66b03e7932389264cf3a3317ffa2176eb58bcf1d89762ea63a5703452e54"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T14:34:45.208Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f2d5c657f3902f1781f5d1f9"
          mutation_id: "compatibility:sha256:fec9aec4a5a80fb9104dbf30edc652dd9866fc7e58c753d6e25ad91420992eb5"
          plan_digest: "sha256:ae5b71eb9074bffca3ca705501e2d78bdd0fbc90b257e5d157332c9845bbbbdf"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121423-9WPTCW"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:fec9aec4a5a80fb9104dbf30edc652dd9866fc7e58c753d6e25ad91420992eb5"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609121423-9WPTCW"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "920a6d95418455d87c02e00ad387395c0b91ca13"
  task_execution_context:
    base_ref: "main"
    base_sha: "f3c1991ddd92943775b6b4b4688009afc3d523bc"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "f3c1991ddd92943775b6b4b4688009afc3d523bc"
    version: 1
id_source: "generated"
---
## Summary

Implement the 0.7.9 baseline inventory and lifecycle characterization for ST-01 through ST-05 and ST-21

Source contract: agentplane-roadmap-r2 cards ST-01, ST-02, ST-03, ST-04, ST-05, and ST-21. Reproduce a source-bound lifecycle and Blueprint consumer/writer inventory, freeze ordinary direct and branch-PR completion, rework versus infrastructure retry, admission/crash/context-role invariants, and local/remote-backend serialization, staleness, conflict, and unsupported-format behavior. Preserve I01-I12 and C01-C08. Do not introduce a new runtime registry, sync subsystem, provider access, or lifecycle format. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/checks/architecture-inventory.test.mjs; focused AgentPlane characterization tests for direct, branch, rework, recovery, and backend round trips with nonzero discovery; relevant critical suites, typecheck, schema and mirror checks.

## Scope

- In scope: Source contract: agentplane-roadmap-r2 cards ST-01, ST-02, ST-03, ST-04, ST-05, and ST-21. Reproduce a source-bound lifecycle and Blueprint consumer/writer inventory, freeze ordinary direct and branch-PR completion, rework versus infrastructure retry, admission/crash/context-role invariants, and local/remote-backend serialization, staleness, conflict, and unsupported-format behavior. Preserve I01-I12 and C01-C08. Do not introduce a new runtime registry, sync subsystem, provider access, or lifecycle format. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/checks/architecture-inventory.test.mjs; focused AgentPlane characterization tests for direct, branch, rework, recovery, and backend round trips with nonzero discovery; relevant critical suites, typecheck, schema and mirror checks.
- Out of scope: unrelated refactors not required for "Implement the 0.7.9 baseline inventory and lifecycle characterization for ST-01 through ST-05 and ST-21".

## Plan

Defined six dependency-ordered WorkItems for the 0.7.9 inventory and lifecycle characterization scope.

## Verify Steps

1. Run `node --test scripts/checks/architecture-inventory.test.mjs`; require a nonzero passing test count and a reproducible inventory for the same clean SHA.
2. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-direct.test.ts`; require direct success, forged-result rejection, independent review, and idempotent terminal replay.
3. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-branch.test.ts`; require exact hosted identities, distinct USER/provider waits, and fail-closed wrong-head and moved-base cases.
4. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts`; require zero new EXECUTOR dispatches for infrastructure retry and trusted SUPERVISOR rework evidence.
5. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.roadmap-recovery.test.ts`; require exact admission identity and reuse of accepted semantic results across crash boundaries.
6. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-backend-roundtrip.test.ts`; require Plan, authority, and verification round trips plus stale, conflict, field-loss, and unsupported-format rejection.
7. Run `bun run typecheck`, `bun run schemas:check`, `bun run artifacts:check`, `bun run test:critical`, and `bun run test:backend-critical`; require all checks to pass without weakening existing negative cases.
8. Review the final diff and `git status --short --untracked-files=all`; require no roadmap file, unrelated task artifact, secret, generated drift, or unintended path in the task change.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
