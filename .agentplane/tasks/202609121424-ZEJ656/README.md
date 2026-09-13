---
id: "202609121424-ZEJ656"
title: "Conserve 0.7.9 semantic requirements and managed output parity for ST-06 and ST-07"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202609121423-9WPTCW"
tags:
  - "code"
  - "release-0.7.9"
  - "roadmap-st-06-07"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
  - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-requirement-conservation.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-13T03:14:07.445Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:cb105a4becf7e877714c51f3efcfe0a2915c32697a5913133abd77f5910b028b"
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
      - ".agentplane/tasks/202609121424-ZEJ656"
      - "packages/agentplane/src/runner/adapters"
      - "packages/agentplane/src/runner/artifacts.ts"
      - "packages/agentplane/src/runner/context"
      - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
      - "packages/core/src/runner/agent-work-order.ts"
      - "scripts/lib/test-route-registry.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Focused regression tests must prove required-field conservation, typed output parity, and fail-closed identity checks."
      - "Repository policy requires protected branch and pull request integration for code changes."
      - "The task changes semantic prompt projection and managed result transport behavior."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - ".agentplane/tasks/202609121424-ZEJ656"
      - "packages/agentplane/src/runner/adapters"
      - "packages/agentplane/src/runner/artifacts.ts"
      - "packages/agentplane/src/runner/context"
      - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
      - "packages/core/src/runner/agent-work-order.ts"
      - "scripts/lib/test-route-registry.mjs"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - "packages/agentplane/src/runner/context/roadmap-requirement-conservation.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
      - "scripts/lib/test-route-registry.mjs"
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
          - ".agentplane/tasks/202609121424-ZEJ656"
          - "packages/agentplane/src/runner/adapters"
          - "packages/agentplane/src/runner/artifacts.ts"
          - "packages/agentplane/src/runner/context"
          - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
          - "packages/core/src/runner/agent-work-order.ts"
          - "scripts/lib/test-route-registry.mjs"
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
      digest: "sha256:d0c7239c35e9792774320169408b4e971b43bea428c8660f4e78060f267e57ca"
      escalation_reasons:
        - "central_component:packages/core/src/runner/agent-work-order.ts"
        - "central_component:scripts/lib/test-route-registry.mjs"
        - "central_path:scripts/lib/test-route-registry.mjs"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
          - "scripts"
        changed_files:
          - "packages/agentplane/src/runner/context/roadmap-requirement-conservation.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
          - "scripts/lib/test-route-registry.mjs"
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
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 7fb34bf68c83. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-13T03:15:59.875Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-13T16:12:41.539Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 7fb34bf68c83. CLI accepted one state-bound external-agent semantic result."
    commit: "7fb34bf68c83721cf34d86f4bb6fd6893ea50ebd"
doc_version: 3
doc_updated_at: "2026-09-13T16:12:41.539Z"
doc_updated_by: "SUPERVISOR"
description: "Source contract: agentplane-roadmap-r2 cards ST-06 and ST-07. Preserve required objective, scope, outputs, checks, constraints, stop rules, WorkItem and WorkOrder identity across prompt compaction and role-specific projection. Repair managed semantic-result transport so completed, blocked, needs_context, and failed outcomes retain permitted typed fields without adapter loss. Do not add a second Plan or lifecycle format, and do not expose secrets. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: focused requirement-conservation and adapter output-parity tests with nonzero discovery, related transport/context critical suites, typecheck, schema/mirror checks."
sections:
  Summary: |-
    Conserve 0.7.9 semantic requirements and managed output parity for ST-06 and ST-07

    Source contract: agentplane-roadmap-r2 cards ST-06 and ST-07. Preserve required objective, scope, outputs, checks, constraints, stop rules, WorkItem and WorkOrder identity across prompt compaction and role-specific projection. Repair managed semantic-result transport so completed, blocked, needs_context, and failed outcomes retain permitted typed fields without adapter loss. Do not add a second Plan or lifecycle format, and do not expose secrets. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: focused requirement-conservation and adapter output-parity tests with nonzero discovery, related transport/context critical suites, typecheck, schema/mirror checks.
  Scope: |-
    - In scope: Source contract: agentplane-roadmap-r2 cards ST-06 and ST-07. Preserve required objective, scope, outputs, checks, constraints, stop rules, WorkItem and WorkOrder identity across prompt compaction and role-specific projection. Repair managed semantic-result transport so completed, blocked, needs_context, and failed outcomes retain permitted typed fields without adapter loss. Do not add a second Plan or lifecycle format, and do not expose secrets. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: focused requirement-conservation and adapter output-parity tests with nonzero discovery, related transport/context critical suites, typecheck, schema/mirror checks.
    - Out of scope: unrelated refactors not required for "Conserve 0.7.9 semantic requirements and managed output parity for ST-06 and ST-07".
  Plan: "Planned requirement conservation and managed semantic output parity as two bounded implementation work items."
  Verify Steps: |-
    1. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-requirement-conservation.test.ts`. Expected: mandatory objective, criteria, scope, checks, outputs, constraints, stop rules, WorkItem identity, and WorkOrder identity survive prompt projection; lifecycle authority is unchanged; budget overflow stops explicitly.
    2. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts`. Expected: supported PLANNER, EXECUTOR, EVALUATOR, and context-role fields survive real prepare/schema/JSONL/normalization/acceptance transport; wrong-work-order, stale, cross-role, and lifecycle-injection results fail closed.
    3. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context packages/agentplane/src/runner/adapters`. Expected: related context and transport suites pass with nonzero test discovery.
    4. Run `bun run typecheck`, `bun run check:schemas`, and `bun run check:agent-assets`. Expected: type, schema, and mirrored asset contracts remain synchronized.
    5. Review the final diff and hosted CI. Expected: changes stay inside the approved task scope, `agentplane-roadmap-r2/` remains untracked, all required checks pass, and any residual limitation is recorded in Findings.
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
    approval_evidence_digest: "sha256:cb105a4becf7e877714c51f3efcfe0a2915c32697a5913133abd77f5910b028b"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:b753feee76a35bb40f4eb7264e44d55d1432a8e562c1572a63d97db5446e64e8"
    grant_id: "da6bee5f-f2c8-468d-8d2d-4b5e26d659a4"
    issued_at: "2026-09-13T03:14:07.445Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:a97367ff75ecb65dd3eb94433e45100966c751e2be4a6d157fa5b5f70528efff"
    plan_revision: 4
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609121424-ZEJ656"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-13T03:14:07.445Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:e836cd4203509fd333b08434d284d133bf9c903d28fd4d3515a4a195c6e6768e"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-13T03:13:19.324Z"
      digest: "sha256:e836cd4203509fd333b08434d284d133bf9c903d28fd4d3515a4a195c6e6768e"
      proposal:
        assumptions:
          - "The current task-centric schema and role-specific semantic payload builders remain the canonical representations."
          - "The executor may replace proposed test file names with equivalent registered focused tests only when nonzero discovery is proven."
        planning_baseline:
          captured_at: "2026-09-13T03:11:41.977Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:628e42c9653eecb354284453aa12761715376c818a62c99ee3d6321d18505c18"
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
        task_id: "202609121424-ZEJ656"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-requirement-conservation.test.ts"
              id: "requirement_conservation"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
              id: "output_parity"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context packages/agentplane/src/runner/adapters"
              id: "related_context_transport"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run check:schemas && bun run check:agent-assets"
              id: "schema_mirrors"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
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
                - "requirement_conservation"
                - "related_context_transport"
              description: "Every mandatory objective, criterion, scope, check, output, constraint, stop rule, WorkItem identity, and WorkOrder identity retains a delivered prompt representation without granting lifecycle authority."
              id: "requirements_conserved"
              required: true
            -
              check_ids:
                - "output_parity"
                - "related_context_transport"
              description: "PLANNER, EXECUTOR, EVALUATOR, and supported context-role results preserve permitted typed fields through prepare, schema, JSONL, normalization, and acceptance while wrong-work-order, stale, cross-role, and lifecycle-injection results fail closed."
              id: "typed_outputs_preserved"
              required: true
            -
              check_ids:
                - "typecheck"
                - "schema_mirrors"
                - "scope_hygiene"
                - "hosted_integration"
              description: "Type checking, schema and mirror validation, registered nonzero test discovery, scope hygiene, hosted CI, and final task outcome all pass."
              id: "repository_contracts_green"
              required: true
          evidence_fingerprint: "sha256:628e42c9653eecb354284453aa12761715376c818a62c99ee3d6321d18505c18"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "requirement_conservation"
                    - "related_context_transport"
                  description: "Every mandatory objective, criterion, scope, check, output, constraint, stop rule, WorkItem identity, and WorkOrder identity retains a delivered prompt representation without granting lifecycle authority."
                  id: "requirements_conserved"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 800000
                optional_sources:
                  - "packages/core/src/tasks/task-centric/schema.ts"
                required_sources:
                  - ".agentplane/tasks/202609121424-ZEJ656/README.md"
                  - "packages/agentplane/src/runner/context/semantic-prompt-projection.ts"
                  - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
                symbol_hints:
                  - "semantic prompt projection"
                  - "mandatory requirements"
                  - "process choreography"
              depends_on: []
              expected_outputs:
                - "requirement_trace_contract"
                - "requirement_conservation_regressions"
              id: "conserve_requirements"
              objective: "Trace every mandatory task requirement into semantic prompt projection and replace only proven destructive filtering while keeping supervisor lifecycle authority unchanged."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner/context"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/runner/context"
                - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
                - "scripts/lib/test-route-registry.mjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-requirement-conservation.test.ts"
                    id: "requirement_conservation"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context packages/agentplane/src/runner/adapters"
                    id: "related_context_transport"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "requirement_conservation"
                      - "related_context_transport"
                    description: "Every mandatory objective, criterion, scope, check, output, constraint, stop rule, WorkItem identity, and WorkOrder identity retains a delivered prompt representation without granting lifecycle authority."
                    id: "requirements_conserved"
                    required: true
                evidence_fingerprint: "sha256:628e42c9653eecb354284453aa12761715376c818a62c99ee3d6321d18505c18"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "output_parity"
                    - "related_context_transport"
                  description: "PLANNER, EXECUTOR, EVALUATOR, and supported context-role results preserve permitted typed fields through prepare, schema, JSONL, normalization, and acceptance while wrong-work-order, stale, cross-role, and lifecycle-injection results fail closed."
                  id: "typed_outputs_preserved"
                  required: true
                -
                  check_ids:
                    - "typecheck"
                    - "schema_mirrors"
                    - "scope_hygiene"
                    - "hosted_integration"
                  description: "Type checking, schema and mirror validation, registered nonzero test discovery, scope hygiene, hosted CI, and final task outcome all pass."
                  id: "repository_contracts_green"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 1000000
                optional_sources:
                  - "packages/core/src/tasks/kernel-semantic.ts"
                required_sources:
                  - ".agentplane/tasks/202609121424-ZEJ656/README.md"
                  - "packages/agentplane/src/runner/adapters/codex-result-transport.ts"
                  - "packages/agentplane/src/runner/adapters/prepared-input.ts"
                  - "packages/agentplane/src/runner/artifacts.ts"
                  - "packages/core/src/runner/agent-work-order.ts"
                symbol_hints:
                  - "role schema"
                  - "WorkOrder identity"
                  - "semantic result normalization"
              depends_on:
                - "conserve_requirements"
              expected_outputs:
                - "managed_output_parity_contract"
                - "fail_closed_transport_regressions"
              id: "preserve_typed_results"
              objective: "Exercise the real managed output transport and reuse the existing role and phase schema builder to preserve permitted typed fields while rejecting stale identity, cross-role output, and lifecycle injection."
              optional: false
              priority: 2
              required_inputs:
                - "requirement_trace_contract"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "semantic-transport-worktree"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/runner/adapters"
                - "packages/agentplane/src/runner/artifacts.ts"
                - "packages/core/src/runner/agent-work-order.ts"
                - "scripts/lib/test-route-registry.mjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
                    id: "output_parity"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context packages/agentplane/src/runner/adapters"
                    id: "related_context_transport"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run check:schemas && bun run check:agent-assets"
                    id: "schema_mirrors"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
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
                      - "output_parity"
                      - "related_context_transport"
                    description: "PLANNER, EXECUTOR, EVALUATOR, and supported context-role results preserve permitted typed fields through prepare, schema, JSONL, normalization, and acceptance while wrong-work-order, stale, cross-role, and lifecycle-injection results fail closed."
                    id: "typed_outputs_preserved"
                    required: true
                  -
                    check_ids:
                      - "typecheck"
                      - "schema_mirrors"
                      - "scope_hygiene"
                      - "hosted_integration"
                    description: "Type checking, schema and mirror validation, registered nonzero test discovery, scope hygiene, hosted CI, and final task outcome all pass."
                    id: "repository_contracts_green"
                    required: true
                evidence_fingerprint: "sha256:628e42c9653eecb354284453aa12761715376c818a62c99ee3d6321d18505c18"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609121424-ZEJ656"
    event_cursor: 6
    final_validation: null
    id: "202609121424-ZEJ656"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-requirement-conservation.test.ts"
          id: "legacy-2"
          required: true
      captured_at: "2026-09-12T14:24:42.945Z"
      constraints: []
      request: |-
        Conserve 0.7.9 semantic requirements and managed output parity for ST-06 and ST-07

        Source contract: agentplane-roadmap-r2 cards ST-06 and ST-07. Preserve required objective, scope, outputs, checks, constraints, stop rules, WorkItem and WorkOrder identity across prompt compaction and role-specific projection. Repair managed semantic-result transport so completed, blocked, needs_context, and failed outcomes retain permitted typed fields without adapter loss. Do not add a second Plan or lifecycle format, and do not expose secrets. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: focused requirement-conservation and adapter output-parity tests with nonzero discovery, related transport/context critical suites, typecheck, schema/mirror checks.
      task_id: "202609121424-ZEJ656"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 10
    schema_version: 1
    updated_at: "2026-09-13T16:13:13.865Z"
    work_items:
      conserve_requirements:
        attempt: 1
        claim_id: null
        id: "conserve_requirements"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:4ea0886009a0f330ad65d1807d3fc66da84ea2df483555b3a81d2aa576121261"
            id: "requirement_trace_contract"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609121424-ZEJ656"
              work_item_id: "conserve_requirements"
            provenance:
              - "sha256:157921c7693a0fc448f94b01b09192a90012ae3ad16134c151d3ed797775badd"
              - ".agentplane/tasks/202609121424-ZEJ656/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:398e81211596fd3e091aa8df54e4bdd197603909209b917745c3d79fb71b41b7"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:febb4d8eba7d31729099d277e2425fecaf68e8fc9609e1163f1de1be736ffe12"
            id: "requirement_conservation_regressions"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609121424-ZEJ656"
              work_item_id: "conserve_requirements"
            provenance:
              - "sha256:157921c7693a0fc448f94b01b09192a90012ae3ad16134c151d3ed797775badd"
              - ".agentplane/tasks/202609121424-ZEJ656/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:398e81211596fd3e091aa8df54e4bdd197603909209b917745c3d79fb71b41b7"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-ZEJ656/supervision/declared-checks.json"
              check_id: "requirement_conservation"
              command_identity: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-requirement-conservation.test.ts"
              detail: "Observed by bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-requirement-conservation.test.ts."
              exit_code: 0
              observed_at: "2026-09-13T16:13:13.859Z"
              repository_snapshot_digest: "sha256:398e81211596fd3e091aa8df54e4bdd197603909209b917745c3d79fb71b41b7"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-ZEJ656/supervision/declared-checks.json"
              check_id: "related_context_transport"
              command_identity: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context packages/agentplane/src/runner/adapters"
              detail: "Observed by bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context packages/agentplane/src/runner/adapters."
              exit_code: 0
              observed_at: "2026-09-13T16:13:13.859Z"
              repository_snapshot_digest: "sha256:398e81211596fd3e091aa8df54e4bdd197603909209b917745c3d79fb71b41b7"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      preserve_typed_results:
        attempt: 0
        claim_id: null
        id: "preserve_typed_results"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-13T16:13:13.865Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:0ec2f7476fecf7688118541fe3e356ff9af50a6e4740bbeaa189aa16bb77a956"
        entity: "work_item"
        id: "event_be7fe6f0c3e44da7ca2dd262"
        mutation_id: "external-result:work-order-202609121424-ZEJ656-executor-c184d6d5c47df912b009505d"
        plan_digest: "sha256:e836cd4203509fd333b08434d284d133bf9c903d28fd4d3515a4a195c6e6768e"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-ZEJ656"
        task_revision: 9
        work_item_id: "conserve_requirements"
    leases: []
    mutation_receipts:
      compatibility:sha256:0ebea7e602d3a13fb1b5cac2af0b63da9614b3e798081a64f9e1faecc915efb2:
        aggregate_digest: "sha256:bd4e51789655b97c576c214acf1c774d91cf4b123c5ea497c5bd5d2fc3529a51"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T03:13:53.767Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_7a76a9712ade06b1eec400fb"
          mutation_id: "compatibility:sha256:0ebea7e602d3a13fb1b5cac2af0b63da9614b3e798081a64f9e1faecc915efb2"
          plan_digest: "sha256:e836cd4203509fd333b08434d284d133bf9c903d28fd4d3515a4a195c6e6768e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-ZEJ656"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:0ebea7e602d3a13fb1b5cac2af0b63da9614b3e798081a64f9e1faecc915efb2"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609121424-ZEJ656"
      compatibility:sha256:48b86f8b55fb4e281e019517fa4934af3479021fed67b59221fec748a745eea2:
        aggregate_digest: "sha256:a5579bb670f4dd97fc609fc48c2f965dba24784b1820d1713c0e8c6164f8d806"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T03:13:53.766Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_cf9e62c8075f61967653c174"
          mutation_id: "compatibility:sha256:48b86f8b55fb4e281e019517fa4934af3479021fed67b59221fec748a745eea2"
          plan_digest: "sha256:e836cd4203509fd333b08434d284d133bf9c903d28fd4d3515a4a195c6e6768e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-ZEJ656"
          task_revision: 3
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:48b86f8b55fb4e281e019517fa4934af3479021fed67b59221fec748a745eea2"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609121424-ZEJ656"
      compatibility:sha256:55df508e65c566fc8b85f4b490e6f5ed44967090e17a46eb950725eb32da9f5e:
        aggregate_digest: "sha256:38a896a07b87b6600095702cb11b11dd11b967d8b1ae3ba5e6bfa701f55fa0c6"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T03:15:59.875Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_af656c57ac62502a0b250708"
          mutation_id: "compatibility:sha256:55df508e65c566fc8b85f4b490e6f5ed44967090e17a46eb950725eb32da9f5e"
          plan_digest: "sha256:e836cd4203509fd333b08434d284d133bf9c903d28fd4d3515a4a195c6e6768e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-ZEJ656"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:55df508e65c566fc8b85f4b490e6f5ed44967090e17a46eb950725eb32da9f5e"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609121424-ZEJ656"
      compatibility:sha256:9a68bdab50b5d34a88feb2b86ad09f07852c0dac0471b221e640e60be67bd0a8:
        aggregate_digest: "sha256:e922861ff92e4742f20eb1b8b7deb275393c19005c5587aa8326ca7511c77662"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T03:13:53.767Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_f1a41ffa3879de71180fa54a"
          mutation_id: "compatibility:sha256:9a68bdab50b5d34a88feb2b86ad09f07852c0dac0471b221e640e60be67bd0a8"
          plan_digest: "sha256:e836cd4203509fd333b08434d284d133bf9c903d28fd4d3515a4a195c6e6768e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-ZEJ656"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:9a68bdab50b5d34a88feb2b86ad09f07852c0dac0471b221e640e60be67bd0a8"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609121424-ZEJ656"
      compatibility:sha256:ec02fec9f8f5bd38055ab6ecfa155948d24ff1c94baa4d14253044944e31e888:
        aggregate_digest: "sha256:7a6b46a85e3e473c1d42d6484480afcf2c2de99580d399df70a39fa41e0d62c8"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T16:12:41.539Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_8b7cefe85cd9d26626c468b9"
          mutation_id: "compatibility:sha256:ec02fec9f8f5bd38055ab6ecfa155948d24ff1c94baa4d14253044944e31e888"
          plan_digest: "sha256:e836cd4203509fd333b08434d284d133bf9c903d28fd4d3515a4a195c6e6768e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-ZEJ656"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ec02fec9f8f5bd38055ab6ecfa155948d24ff1c94baa4d14253044944e31e888"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609121424-ZEJ656"
      compatibility:sha256:f788e4bdba184c3d7428509eed6d4ca720bfabade2e7ba23c22f3028f7ffa666:
        aggregate_digest: "sha256:9d5d0deb8a5496b265d09926d6d28f36a492599045ad9c4fefdd74dec2bdc704"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T16:12:41.539Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_fd56d5b2764b8571b6b307ac"
          mutation_id: "compatibility:sha256:f788e4bdba184c3d7428509eed6d4ca720bfabade2e7ba23c22f3028f7ffa666"
          plan_digest: "sha256:e836cd4203509fd333b08434d284d133bf9c903d28fd4d3515a4a195c6e6768e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-ZEJ656"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f788e4bdba184c3d7428509eed6d4ca720bfabade2e7ba23c22f3028f7ffa666"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609121424-ZEJ656"
      external-result:work-order-202609121424-ZEJ656-executor-c184d6d5c47df912b009505d:
        aggregate_digest: "sha256:131b73ba447527905496ebe7dd7cc362bd197303be7f2aa37b947dad644d2e71"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T16:13:13.865Z"
          cause_refs:
            - "semantic-result:sha256:0ec2f7476fecf7688118541fe3e356ff9af50a6e4740bbeaa189aa16bb77a956"
          entity: "work_item"
          from: "READY"
          id: "event_be7fe6f0c3e44da7ca2dd262"
          mutation_id: "external-result:work-order-202609121424-ZEJ656-executor-c184d6d5c47df912b009505d"
          plan_digest: "sha256:e836cd4203509fd333b08434d284d133bf9c903d28fd4d3515a4a195c6e6768e"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-ZEJ656"
          task_revision: 9
          to: "COMPLETED"
          work_item_id: "conserve_requirements"
        mutation_id: "external-result:work-order-202609121424-ZEJ656-executor-c184d6d5c47df912b009505d"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609121424-ZEJ656"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "7fb34bf68c83721cf34d86f4bb6fd6893ea50ebd"
  task_execution_context:
    base_ref: "main"
    base_sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_planning_base_recovery:
    branch: "task/202609121424-ZEJ656/conserve-0-7-9-semantic-requirements-and-managed"
    from_sha: "f3c1991ddd92943775b6b4b4688009afc3d523bc"
    observed_head: "f3c1991ddd92943775b6b4b4688009afc3d523bc"
    plan_digest: "sha256:e836cd4203509fd333b08434d284d133bf9c903d28fd4d3515a4a195c6e6768e"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    revision: 5
    schema_version: 1
    state: "applied"
    target_sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
    task_id: "202609121424-ZEJ656"
    token: "sha256:5326e8759576c764663247f27f3451a037f494b229b448dcf0c57182943b9962"
    worktree: "/Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609121424-ZEJ656-conserve-0-7-9-semantic-requirements-and-managed"
  workflow_route_baseline:
    start_head_sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
    version: 1
id_source: "generated"
---
## Summary

Conserve 0.7.9 semantic requirements and managed output parity for ST-06 and ST-07

Source contract: agentplane-roadmap-r2 cards ST-06 and ST-07. Preserve required objective, scope, outputs, checks, constraints, stop rules, WorkItem and WorkOrder identity across prompt compaction and role-specific projection. Repair managed semantic-result transport so completed, blocked, needs_context, and failed outcomes retain permitted typed fields without adapter loss. Do not add a second Plan or lifecycle format, and do not expose secrets. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: focused requirement-conservation and adapter output-parity tests with nonzero discovery, related transport/context critical suites, typecheck, schema/mirror checks.

## Scope

- In scope: Source contract: agentplane-roadmap-r2 cards ST-06 and ST-07. Preserve required objective, scope, outputs, checks, constraints, stop rules, WorkItem and WorkOrder identity across prompt compaction and role-specific projection. Repair managed semantic-result transport so completed, blocked, needs_context, and failed outcomes retain permitted typed fields without adapter loss. Do not add a second Plan or lifecycle format, and do not expose secrets. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: focused requirement-conservation and adapter output-parity tests with nonzero discovery, related transport/context critical suites, typecheck, schema/mirror checks.
- Out of scope: unrelated refactors not required for "Conserve 0.7.9 semantic requirements and managed output parity for ST-06 and ST-07".

## Plan

Planned requirement conservation and managed semantic output parity as two bounded implementation work items.

## Verify Steps

1. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context/roadmap-requirement-conservation.test.ts`. Expected: mandatory objective, criteria, scope, checks, outputs, constraints, stop rules, WorkItem identity, and WorkOrder identity survive prompt projection; lifecycle authority is unchanged; budget overflow stops explicitly.
2. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts`. Expected: supported PLANNER, EXECUTOR, EVALUATOR, and context-role fields survive real prepare/schema/JSONL/normalization/acceptance transport; wrong-work-order, stale, cross-role, and lifecycle-injection results fail closed.
3. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/context packages/agentplane/src/runner/adapters`. Expected: related context and transport suites pass with nonzero test discovery.
4. Run `bun run typecheck`, `bun run check:schemas`, and `bun run check:agent-assets`. Expected: type, schema, and mirrored asset contracts remain synchronized.
5. Review the final diff and hosted CI. Expected: changes stay inside the approved task scope, `agentplane-roadmap-r2/` remains untracked, all required checks pass, and any residual limitation is recorded in Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
