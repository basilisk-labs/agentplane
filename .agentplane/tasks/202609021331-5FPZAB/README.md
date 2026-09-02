---
id: "202609021331-5FPZAB"
title: "Repair lifecycle projection integrity after M3 cutover"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 27
origin:
  system: "manual"
depends_on: []
tags:
  - "lifecycle"
  - "projection-integrity"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
verify:
  - "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
  - "bun run bench:compatibility:candidate:check"
  - "bun run lifecycle:invariants"
  - "bun run lint:core"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-09-02T15:55:33.170Z"
  updated_by: "USER"
  note: null
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
    - "effect_destructive_git"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
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
      - "public_api"
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
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/backends/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/branch"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks"
      - "scripts/checks"
      - "scripts/qualification"
  declaration:
    external_effects:
      - "destructive_git"
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Provider writes and task-branch cleanup are needed only for the normal branch_pr lifecycle; release publication and repository deletion remain excluded."
      - "The change alters central lifecycle routing, projection visibility, and merged-task cleanup semantics and therefore requires an isolated branch, exact-head hosted checks, and AgentPlane-owned integration."
    repository_effects:
      - "public_api"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/backends/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/branch"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks"
      - "scripts/checks"
      - "scripts/qualification"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
      - "packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts"
      - "packages/agentplane/src/commands/branch/cleanup-merged.ts"
      - "packages/agentplane/src/commands/shared/route-decision-workspace.ts"
      - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
      - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.test.ts"
      - "packages/agentplane/src/commands/shared/task-backend.ts"
      - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
      - "packages/agentplane/src/commands/shared/task-mutation.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-fingerprint.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/hosted-close.command.ts"
      - "packages/agentplane/src/commands/task/set-status.unit.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_destructive_git"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "destructive_git"
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
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/backends/task-backend"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/branch"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
          - "packages/core/src/tasks"
          - "scripts/checks"
          - "scripts/qualification"
        evidence_requirements:
          - "external_effect:destructive_git"
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "destructive_git"
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "public_api"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:c5988a9a6cb1299160a989e1e901b7fe5916a918b50e7a625548fc3ee973159d"
      escalation_reasons:
        - "central_component:packages/core/src/tasks"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-workspace.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-backend.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-backend.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-mutation.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/task-mutation.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-fingerprint.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
        - "effect_public_api"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
          - "packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts"
          - "packages/agentplane/src/commands/branch/cleanup-merged.ts"
          - "packages/agentplane/src/commands/shared/route-decision-workspace.ts"
          - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts"
          - "packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts"
          - "packages/agentplane/src/commands/shared/task-backend.test.ts"
          - "packages/agentplane/src/commands/shared/task-backend.ts"
          - "packages/agentplane/src/commands/shared/task-mutation.test.ts"
          - "packages/agentplane/src/commands/shared/task-mutation.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-fingerprint.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-fingerprint.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/finish-shared.ts"
          - "packages/agentplane/src/commands/task/hosted-close.command.ts"
          - "packages/agentplane/src/commands/task/set-status.unit.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
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
      - "external_effect:destructive_git"
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:public_api"
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
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 95337ac8dd30. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 9158b6afcb81. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 7837f2a7f866. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 03c4ae4d0358. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: f200d94de2ad. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-02T15:35:26.510Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-02T16:08:35.149Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-02T16:18:07.358Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 95337ac8dd30. CLI accepted one state-bound external-agent semantic result."
    commit: "95337ac8dd30a296add5decc8a258de9dab23082"
  -
    type: "status"
    at: "2026-09-02T16:30:22.928Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 9158b6afcb81. CLI accepted one state-bound external-agent semantic result."
    commit: "9158b6afcb81838310e6b1f6cad5eb58136a4e19"
  -
    type: "status"
    at: "2026-09-02T16:34:05.575Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 7837f2a7f866. CLI accepted one state-bound external-agent semantic result."
    commit: "7837f2a7f8668ed7d5fd1030e38c1575afb5bdb9"
  -
    type: "status"
    at: "2026-09-02T16:58:32.604Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 03c4ae4d0358. CLI accepted one state-bound external-agent semantic result."
    commit: "03c4ae4d035896ad6aa7f3775c2287313aa49614"
  -
    type: "status"
    at: "2026-09-02T17:13:21.093Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: f200d94de2ad. CLI accepted one state-bound external-agent semantic result."
    commit: "f200d94de2ad7e1049716f5b172cf467c8701f43"
doc_version: 3
doc_updated_at: "2026-09-02T17:13:21.093Z"
doc_updated_by: "SUPERVISOR"
description: "After M3 is integrated, repair the demonstrated lifecycle projection-integrity gaps without release work or MPXQBK. Deliver five sequential WorkItems: (1) authoritative-worktree task identity; (2) atomic lifecycle projection reconciliation after set-status, hosted close, and merge; (3) invalidation of stale WorkItem and route projections; (4) convergence of completed branch_pr cleanup; (5) an Arkady Factory stale-DONE end-to-end regression. Reuse existing code and tests before adding new code. Prefer deletion or consolidation over compatibility layers. Treat the current compatibility-import edges and line count as a measured baseline, not a hard cap; any necessary expansion must be explicit in the allowlist and covered by a focused regression so growth remains fail-closed. Keep all changes bounded to projection integrity and lifecycle cleanup. Do not include release/version/publish work or MPXQBK."
sections:
  Summary: |-
    Repair lifecycle projection integrity after M3 cutover

    After M3 is integrated, repair the demonstrated lifecycle projection-integrity gaps without release work or MPXQBK. Deliver five sequential WorkItems: (1) authoritative-worktree task identity; (2) atomic lifecycle projection reconciliation after set-status, hosted close, and merge; (3) invalidation of stale WorkItem and route projections; (4) convergence of completed branch_pr cleanup; (5) an Arkady Factory stale-DONE end-to-end regression. Reuse existing code and tests before adding new code. Prefer deletion or consolidation over compatibility layers. Treat the current compatibility-import edges and line count as a measured baseline, not a hard cap; any necessary expansion must be explicit in the allowlist and covered by a focused regression so growth remains fail-closed. Keep all changes bounded to projection integrity and lifecycle cleanup. Do not include release/version/publish work or MPXQBK.
  Scope: |-
    - In scope: After M3 is integrated, repair the demonstrated lifecycle projection-integrity gaps without release work or MPXQBK. Deliver five sequential WorkItems: (1) authoritative-worktree task identity; (2) atomic lifecycle projection reconciliation after set-status, hosted close, and merge; (3) invalidation of stale WorkItem and route projections; (4) convergence of completed branch_pr cleanup; (5) an Arkady Factory stale-DONE end-to-end regression. Reuse existing code and tests before adding new code. Prefer deletion or consolidation over compatibility layers. Treat the current compatibility-import edges and line count as a measured baseline, not a hard cap; any necessary expansion must be explicit in the allowlist and covered by a focused regression so growth remains fail-closed. Keep all changes bounded to projection integrity and lifecycle cleanup. Do not include release/version/publish work or MPXQBK.
    - Out of scope: unrelated refactors not required for "Repair lifecycle projection integrity after M3 cutover".
  Plan: "Rebuilt the five-stage plan so execution authority, WorkItem scopes and claims, exact predecessor outputs, and task-specific Verify Steps are consistent."
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts`. Expected: authoritative-worktree identity, atomic projection, stale invalidation, cleanup convergence, and Arkady Factory cases pass.
    2. Run `bun run bench:compatibility:candidate:check`. Expected: the compatibility baseline remains fail-closed; any increase is allowlisted and justified by a focused regression.
    3. Run `bun run lifecycle:invariants`. Expected: one canonical lifecycle owner and exact replay invariants pass.
    4. Run `bun run lint:core` and `bun run typecheck`. Expected: both pass.
    5. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy passes.
    6. Run `bun run ci:local:full` after focused checks are green. Expected: the complete local gate passes at the exact implementation SHA.
    7. Require exact-head hosted checks, EVALUATOR pass, AgentPlane-authorized merge, fresh-main readback, hosted close, and cleanup. Expected: all projections agree on terminal state and no clean merged task branch or worktree remains.
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
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:37b38a2b1a35a0f6539df0741b7e202623a7d4e9dd6d9481f15fc651ab9c7564"
    digest: "sha256:c9e2e09a030018e7c572b69303a12ac7b3df272fc7dd4409fe7df9a3b256c6ae"
    grant_id: "a1054e7d-20bf-413d-88d1-4574e2445ee1"
    issued_at: "2026-09-02T15:55:33.170Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:e0073a909c28832eb247724c1680badc8ef905e6a70abca813d192c85e8d499a"
    plan_revision: 10
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:fe0e5a0b1993fe8d8204c9ba194992241beaaaf08ccf9cd1fc1b83c66229424e"
    status: "active"
    task_id: "202609021331-5FPZAB"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-02T15:55:33.170Z"
        approved_by: "USER"
        approved_digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-09-02T15:51:14.303Z"
      digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
      proposal:
        assumptions:
          - "M3 is terminal on main at a51e95514f2909177410f78a4057873140097edb and remains immutable dependency provenance."
          - "Existing task-backend, kernel, workflow projection, hosted-close, and cleanup owners are reused; no parallel state store is added."
          - "The five WorkItems execute one at a time in dependency order, with exact predecessor output IDs as required inputs."
          - "Compatibility edges and LOC are measured baselines; any necessary increase updates the existing allowlist and adds a focused justification."
          - "MPXQBK and release, version, deployment, and stable-publication work remain excluded."
        planning_baseline:
          captured_at: "2026-09-02T15:48:04.479Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:42caed9b4dd1c02a3365e10723fc22422e87ec15d16e292948980546ee954a90"
          dirty_paths:
            - ".agentplane/tasks/202609021331-5FPZAB/README.md"
            - ".agentplane/tasks/202609021331-5FPZAB/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202609021331-5FPZAB/pr/diffstat.txt"
            - ".agentplane/tasks/202609021331-5FPZAB/pr/github-body.md"
            - ".agentplane/tasks/202609021331-5FPZAB/pr/github-title.txt"
            - ".agentplane/tasks/202609021331-5FPZAB/pr/meta.json"
            - ".agentplane/tasks/202609021331-5FPZAB/pr/review.md"
          git:
            kind: "commit"
            ref: null
            sha: "a51e95514f2909177410f78a4057873140097edb"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:9"
        schema_version: 1
        task_id: "202609021331-5FPZAB"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
              id: "focused"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run bench:compatibility:candidate:check"
              id: "compatibility"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run lifecycle:invariants"
              id: "lifecycle"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "lint-core"
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
              command: "node .agentplane/policy/check-routing.mjs"
              id: "routing"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
          criteria:
            -
              check_ids:
                - "focused"
                - "compatibility"
                - "lifecycle"
                - "lint-core"
                - "typecheck"
                - "routing"
                - "full"
              description: "All five sequential stages pass, exact-head hosted verification and evaluation pass, and fresh-main readback agrees on terminal Task, WorkItem, route, queue, branch, and worktree state."
              id: "projection-integrity-complete"
              required: true
          evidence_fingerprint: "sha256:42caed9b4dd1c02a3365e10723fc22422e87ec15d16e292948980546ee954a90"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused"
                  description: "One active branch_pr Task resolves to one authoritative checkout identity; ambiguous, stale, foreign, base-only, and missing identities fail closed."
                  id: "authoritative-worktree"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "findWorktreeForBranch"
                  - "resolveWorkflowWorkspace"
                  - "readTaskBackendBranchSnapshot"
              depends_on: []
              expected_outputs:
                - "authoritative-worktree-identity"
              id: "projection-authoritative-worktree"
              objective: "Bind active branch_pr Task identity, backend reads, route observations, and mutation paths to exactly one authoritative registered worktree. Reject base fallback, stale hints, duplicate same-task registrations, foreign branches, and missing registrations without redirecting state."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/branch"
                - "packages/agentplane/src/adapters/task-backend"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                    id: "focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                criteria:
                  -
                    check_ids:
                      - "focused"
                    description: "One active branch_pr Task resolves to one authoritative checkout identity; ambiguous, stale, foreign, base-only, and missing identities fail closed."
                    id: "authoritative-worktree"
                    required: true
                evidence_fingerprint: "sha256:42caed9b4dd1c02a3365e10723fc22422e87ec15d16e292948980546ee954a90"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused"
                    - "lifecycle"
                  description: "Set-status, merge, and hosted close produce one revision-consistent projection or fail without partial visibility; replay is idempotent."
                  id: "atomic-reconciliation"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 128000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "KernelTaskLifecycle"
                  - "KernelBackendAdapter"
                  - "cmdTaskSetStatus"
                  - "hosted close"
              depends_on:
                - "projection-authoritative-worktree"
              expected_outputs:
                - "atomic-lifecycle-reconciliation"
              id: "projection-atomic-reconciliation"
              objective: "Use existing kernel operations and receipts to reconcile canonical and supported compatibility projections atomically after set-status, provider-proven merge, and hosted close. Interruption exposes no partial status, WorkItem, route, or provider view, and exact replay creates no duplicate transition."
              optional: false
              priority: 1
              required_inputs:
                - "authoritative-worktree-identity"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                    id: "focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "lifecycle"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "focused"
                      - "lifecycle"
                    description: "Set-status, merge, and hosted close produce one revision-consistent projection or fail without partial visibility; replay is idempotent."
                    id: "atomic-reconciliation"
                    required: true
                evidence_fingerprint: "sha256:42caed9b4dd1c02a3365e10723fc22422e87ec15d16e292948980546ee954a90"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused"
                  description: "No WorkItem or route projection derived from an older canonical or repository identity remains eligible after relevant state changes."
                  id: "invalidate-stale"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 112000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "workflow-step-projections"
                  - "routeTaskNextAction"
                  - "stateFingerprint"
                  - "workItem"
              depends_on:
                - "projection-atomic-reconciliation"
              expected_outputs:
                - "stale-projection-invalidation"
              id: "projection-invalidation"
              objective: "Invalidate WorkItem summaries, route decisions, and compatibility views when canonical revision, plan binding, result receipt, repository identity, provider observation, or authoritative checkout changes, while preserving unchanged exact replay."
              optional: false
              priority: 2
              required_inputs:
                - "atomic-lifecycle-reconciliation"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
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
                  resource: "packages/core/src/tasks"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli"
                - "packages/core/src/tasks"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                    id: "focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                criteria:
                  -
                    check_ids:
                      - "focused"
                    description: "No WorkItem or route projection derived from an older canonical or repository identity remains eligible after relevant state changes."
                    id: "invalidate-stale"
                    required: true
                evidence_fingerprint: "sha256:42caed9b4dd1c02a3365e10723fc22422e87ec15d16e292948980546ee954a90"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused"
                  description: "A completed branch_pr Task converges to terminal projection and done queue state with no clean merged task checkout or branch; unsafe work is preserved."
                  id: "cleanup-converges"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 128000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "cleanupMerged"
                  - "resolveTargetedCleanupProof"
                  - "integration queue"
                  - "sync_hosted_close"
              depends_on:
                - "projection-invalidation"
              expected_outputs:
                - "completed-branch-pr-cleanup-convergence"
              id: "projection-cleanup-convergence"
              objective: "Make completed branch_pr cleanup converge from provider-proven merge or hosted-close truth after stale base synchronization. Normalize the queue, remove only clean proven task worktrees and task branches, tolerate replay, and preserve dirty, ambiguous, open, or unique work."
              optional: false
              priority: 3
              required_inputs:
                - "stale-projection-invalidation"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "provider_queue"
                  mode: "exclusive"
                  resource: "integration-queue"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/branch"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/cli"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                    id: "focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                criteria:
                  -
                    check_ids:
                      - "focused"
                    description: "A completed branch_pr Task converges to terminal projection and done queue state with no clean merged task checkout or branch; unsafe work is preserved."
                    id: "cleanup-converges"
                    required: true
                evidence_fingerprint: "sha256:42caed9b4dd1c02a3365e10723fc22422e87ec15d16e292948980546ee954a90"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused"
                    - "compatibility"
                    - "full"
                  description: "The real-Git case cannot leave DONE in only one projection; terminal identities agree, replay is idempotent, queue is done, and clean merged task refs are absent."
                  id: "arkady-e2e"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 144000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "runCli"
                  - "routeTaskNextAction"
                  - "cleanupMerged"
                  - "Arkady Factory"
              depends_on:
                - "projection-cleanup-convergence"
              expected_outputs:
                - "arkady-factory-stale-done-e2e"
              id: "projection-arkady-stale-done-e2e"
              objective: "Strengthen the existing real-Git public CLI harness with the Arkady Factory stale-DONE scenario from authoritative worktree through set-status, WorkItem completion, exact replay, provider merge, hosted close, base sync, queue normalization, and cleanup to one terminal readback."
              optional: false
              priority: 4
              required_inputs:
                - "completed-branch-pr-cleanup-convergence"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/branch"
                - "scripts/qualification"
                - "scripts/checks"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                    id: "focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run bench:compatibility:candidate:check"
                    id: "compatibility"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "focused"
                      - "compatibility"
                      - "full"
                    description: "The real-Git case cannot leave DONE in only one projection; terminal identities agree, replay is idempotent, queue is done, and clean merged task refs are absent."
                    id: "arkady-e2e"
                    required: true
                evidence_fingerprint: "sha256:42caed9b4dd1c02a3365e10723fc22422e87ec15d16e292948980546ee954a90"
                schema_version: 1
      revision: 3
      schema_version: 1
      task_id: "202609021331-5FPZAB"
    event_cursor: 4
    final_validation: null
    id: "202609021331-5FPZAB"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run lint:core"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "node .agentplane/policy/check-routing.mjs"
          id: "legacy-3"
          required: true
      captured_at: "2026-09-02T13:31:14.393Z"
      constraints: []
      request: |-
        Repair lifecycle projection integrity after M3 cutover

        After M3 is integrated, repair the demonstrated lifecycle projection-integrity gaps without release work or MPXQBK. Deliver five sequential WorkItems: (1) authoritative-worktree task identity; (2) atomic lifecycle projection reconciliation after set-status, hosted close, and merge; (3) invalidation of stale WorkItem and route projections; (4) convergence of completed branch_pr cleanup; (5) an Arkady Factory stale-DONE end-to-end regression. Reuse existing code and tests before adding new code. Prefer deletion or consolidation over compatibility layers. Treat the current compatibility-import edges and line count as a measured baseline, not a hard cap; any necessary expansion must be explicit in the allowlist and covered by a focused regression so growth remains fail-closed. Keep all changes bounded to projection integrity and lifecycle cleanup. Do not include release/version/publish work or MPXQBK.
      task_id: "202609021331-5FPZAB"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-02T15:35:15.678Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:d42b74be1088a02500f76fc08c8a3b4331ca0c32691bf2a322afebc06f17c76f"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-02T13:38:14.353Z"
        digest: "sha256:d42b74be1088a02500f76fc08c8a3b4331ca0c32691bf2a322afebc06f17c76f"
        proposal:
          assumptions:
            - "M3 task 202608291006-255K66 is terminal on main at merge commit a51e95514f2909177410f78a4057873140097edb and is a dependency baseline, not part of this task's mutable scope."
            - "Existing task backend, route oracle, worktree allocation, hosted-close, and cleanup code remain the only state owners; no new projection database or compatibility authority will be introduced."
            - "The five WorkItems execute strictly in dependency order with only one active at a time."
            - "Compatibility-import edges and LOC are measured baselines. Expansion is permitted only when necessary, represented in the existing allowlist, and paired with a focused fail-closed regression."
            - "MPXQBK, version changes, release qualification, and release publication are outside this task."
          planning_baseline:
            captured_at: "2026-09-02T13:31:18.743Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:48bc294c04fade35cb158bb360d0e38fca2816a7008533181ebd117f9f25aec0"
            dirty_paths:
              - ".agentplane/tasks/202609021331-5FPZAB/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "a51e95514f2909177410f78a4057873140097edb"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/workflow-step-projections-routing.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                id: "projection-focused"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "lifecycle-invariants"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run bench:compatibility:candidate:check"
                id: "compatibility-baseline"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run lint:core"
                id: "lint-core"
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
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-regression"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
            criteria:
              -
                check_ids:
                  - "projection-focused"
                  - "lifecycle-invariants"
                  - "compatibility-baseline"
                  - "lint-core"
                  - "typecheck"
                  - "routing"
                  - "full-regression"
                description: "All five sequential WorkItems pass: every lifecycle read and mutation resolves the authoritative task checkout, set-status/hosted-close/merge reconcile canonical and compatibility projections atomically, stale WorkItem and route views are invalidated, completed branch_pr cleanup converges idempotently, and the Arkady Factory stale-DONE regression finishes with one terminal task identity and no residual task branch or worktree."
                id: "projection-integrity-complete"
                required: true
            evidence_fingerprint: "sha256:48bc294c04fade35cb158bb360d0e38fca2816a7008533181ebd117f9f25aec0"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "authoritative-worktree-focused"
                    description: "An active branch_pr task has exactly one authoritative checkout identity. Base, stale hints, duplicate registrations, foreign branches, and missing registrations cannot silently redirect task reads or mutations."
                    id: "authoritative-worktree-acceptance"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "findWorktreeForBranch"
                    - "resolveWorkflowWorkspace"
                    - "readTaskBackendBranchSnapshot"
                depends_on: []
                expected_outputs:
                  - "authoritative-worktree identity implementation"
                  - "focused positive, duplicate, missing, and stale-hint regressions"
                id: "projection-authoritative-worktree"
                objective: "Make task identity resolution authoritative-worktree aware across task backend snapshots and workflow routing. Reuse the registered task branch/worktree evidence, reject ambiguous or duplicate same-task checkouts, and ensure reads and writes for an active branch_pr task bind to one task document and repository identity."
                optional: false
                priority: 0
                required_inputs:
                  - "M3 terminal main baseline"
                  - "existing worktree registry and task backend snapshot contracts"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/branch"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/git"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/branch"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/core/src/git"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
                      id: "authoritative-worktree-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "authoritative-worktree-focused"
                      description: "An active branch_pr task has exactly one authoritative checkout identity. Base, stale hints, duplicate registrations, foreign branches, and missing registrations cannot silently redirect task reads or mutations."
                      id: "authoritative-worktree-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:48bc294c04fade35cb158bb360d0e38fca2816a7008533181ebd117f9f25aec0"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "atomic-reconciliation-focused"
                      - "lifecycle-invariants"
                    description: "After set-status, provider merge, or hosted close, canonical and compatibility reads expose one revision-consistent status, WorkItem result, route, and provider identity. Injected interruption and exact replay cannot expose or duplicate a partial projection."
                    id: "atomic-reconciliation-acceptance"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 128000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "cmdTaskSetStatus"
                    - "reconcileHostedClose"
                depends_on:
                  - "projection-authoritative-worktree"
                expected_outputs:
                  - "atomic lifecycle reconciliation implementation"
                  - "set-status, merge, hosted-close, interruption, and replay regressions"
                id: "projection-atomic-reconciliation"
                objective: "Consolidate lifecycle projection reconciliation so set-status, provider-proven merge, and hosted close update the canonical task aggregate and all supported compatibility read projections as one admitted operation or fail without a partial visible state. Reuse kernel commands and existing mutation receipts instead of introducing another state store."
                optional: false
                priority: 1
                required_inputs:
                  - "authoritative-worktree identity implementation"
                  - "existing kernel lifecycle and provider reconciliation receipts"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts"
                      id: "atomic-reconciliation-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "atomic-reconciliation-focused"
                        - "lifecycle-invariants"
                      description: "After set-status, provider merge, or hosted close, canonical and compatibility reads expose one revision-consistent status, WorkItem result, route, and provider identity. Injected interruption and exact replay cannot expose or duplicate a partial projection."
                      id: "atomic-reconciliation-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:48bc294c04fade35cb158bb360d0e38fca2816a7008533181ebd117f9f25aec0"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "projection-invalidation-focused"
                    description: "No route or WorkItem projection derived from an older canonical revision or identity remains eligible after task, plan, result, checkout, repository, or provider state changes; unchanged exact replay remains idempotent."
                    id: "projection-invalidation-acceptance"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 112000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "buildWorkflowStepProjections"
                    - "routeTaskNextAction"
                    - "stateFingerprint"
                    - "workItem"
                depends_on:
                  - "projection-atomic-reconciliation"
                expected_outputs:
                  - "projection invalidation implementation"
                  - "stale revision, plan, WorkItem, repository, provider, and checkout regressions"
                id: "projection-invalidation"
                objective: "Invalidate stale WorkItem summaries, cached route decisions, and compatibility task views whenever the canonical revision, plan binding, WorkItem receipt, repository identity, provider observation, or authoritative checkout changes. Preserve exact replay while forcing fresh projection after any relevant identity change."
                optional: false
                priority: 2
                required_inputs:
                  - "atomic lifecycle reconciliation implementation"
                  - "existing route oracle and WorkItem projection contracts"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
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
                    resource: "packages/core/src/tasks"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/workflow-step-projections-routing.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                      id: "projection-invalidation-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                  criteria:
                    -
                      check_ids:
                        - "projection-invalidation-focused"
                      description: "No route or WorkItem projection derived from an older canonical revision or identity remains eligible after task, plan, result, checkout, repository, or provider state changes; unchanged exact replay remains idempotent."
                      id: "projection-invalidation-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:48bc294c04fade35cb158bb360d0e38fca2816a7008533181ebd117f9f25aec0"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "cleanup-convergence-focused"
                    description: "A completed branch_pr task converges to a synchronized terminal projection, done queue entry, and no ordinary clean task worktree or task branch. Repetition is a no-op, while dirty, ambiguous, open, or unassimilated work is never deleted."
                    id: "cleanup-convergence-acceptance"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 128000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "cleanupMerged"
                    - "resolveTargetedCleanupProof"
                    - "normalizeIntegrationQueueEntry"
                    - "sync_hosted_close"
                depends_on:
                  - "projection-invalidation"
                expected_outputs:
                  - "completed branch_pr cleanup convergence implementation"
                  - "provider merge, hosted close, stale base, replay, dirty, ambiguous, and unique-work regressions"
                id: "projection-cleanup-convergence"
                objective: "Make completed branch_pr cleanup converge from provider-proven merge or hosted-close truth even when the base projection was stale before synchronization. One exact cleanup route must normalize the integration queue, remove only clean proven task worktrees and task branches, tolerate replay, and preserve ambiguous, dirty, open, or unique work."
                optional: false
                priority: 3
                required_inputs:
                  - "projection invalidation implementation"
                  - "existing merged cleanup proof and integration queue contracts"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/branch"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/pr"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-queue"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/branch"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/pr"
                  - "packages/agentplane/src/cli"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts packages/agentplane/src/commands/branch/cleanup-merged.batch.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts"
                      id: "cleanup-convergence-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                  criteria:
                    -
                      check_ids:
                        - "cleanup-convergence-focused"
                      description: "A completed branch_pr task converges to a synchronized terminal projection, done queue entry, and no ordinary clean task worktree or task branch. Repetition is a no-op, while dirty, ambiguous, open, or unassimilated work is never deleted."
                      id: "cleanup-convergence-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:48bc294c04fade35cb158bb360d0e38fca2816a7008533181ebd117f9f25aec0"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "arkady-stale-done-e2e"
                      - "compatibility-baseline"
                      - "full-regression"
                    description: "The named real-Git scenario cannot leave DONE visible only in one projection. Public command readback agrees on the terminal task and WorkItem identities, exact replay is idempotent, queue state is done, and no clean merged task worktree or task branch remains."
                    id: "arkady-stale-done-acceptance"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 144000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "runCli"
                    - "routeTaskNextAction"
                    - "cleanupMerged"
                    - "Arkady Factory"
                depends_on:
                  - "projection-cleanup-convergence"
                expected_outputs:
                  - "Arkady Factory stale-DONE end-to-end regression"
                  - "exact terminal identity and cleanup evidence"
                  - "compatibility baseline evidence"
                id: "projection-arkady-stale-done-e2e"
                objective: "Strengthen the existing real-Git lifecycle harness with the Arkady Factory stale-DONE scenario. Reproduce an active task whose task worktree is authoritative while base and route projections are stale, then drive set-status, WorkItem completion, exact replay, provider merge, hosted close, base synchronization, queue normalization, and cleanup through public AgentPlane commands to one terminal readback."
                optional: false
                priority: 4
                required_inputs:
                  - "all preceding projection-integrity implementations"
                  - "existing real-Git CLI fixture and compatibility baseline guard"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/branch"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/branch"
                  - "scripts/qualification"
                  - "scripts/checks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts"
                      id: "arkady-stale-done-e2e"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run bench:compatibility:candidate:check"
                      id: "compatibility-baseline"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-regression"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "arkady-stale-done-e2e"
                        - "compatibility-baseline"
                        - "full-regression"
                      description: "The named real-Git scenario cannot leave DONE visible only in one projection. Public command readback agrees on the terminal task and WorkItem identities, exact replay is idempotent, queue state is done, and no clean merged task worktree or task branch remains."
                      id: "arkady-stale-done-acceptance"
                      required: true
                  evidence_fingerprint: "sha256:48bc294c04fade35cb158bb360d0e38fca2816a7008533181ebd117f9f25aec0"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      -
        approval:
          approved_at: null
          approved_by: null
          approved_digest: null
          policy_facts: []
          state: "pending"
        created_at: "2026-09-02T15:41:27.668Z"
        digest: "sha256:ccdf884cf6aa36cfec0dd4cc7f17e859f035dbe9c67426c1b21f4ee498cd89d6"
        proposal:
          assumptions:
            - "M3 is terminal on main at a51e95514f2909177410f78a4057873140097edb and is immutable dependency provenance."
            - "Existing task backend, kernel, route, hosted-close, and cleanup owners are reused; no parallel projection store is added."
            - "Only one WorkItem is active, and every required_inputs value is an exact predecessor expected_outputs ID."
            - "Compatibility edges and LOC remain a measured fail-closed baseline; necessary growth requires an allowlist update and focused regression."
            - "MPXQBK and all release/version/publication work remain excluded."
          planning_baseline:
            captured_at: "2026-09-02T15:37:51.584Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:14fc00de6c705c044afb2783e12cbbd47a79a7cd8918a9b6171ad8fdd8ad5b36"
            dirty_paths:
              - ".agentplane/tasks/202609021331-5FPZAB/README.md"
              - ".agentplane/tasks/202609021331-5FPZAB/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202609021331-5FPZAB/pr/diffstat.txt"
              - ".agentplane/tasks/202609021331-5FPZAB/pr/github-body.md"
              - ".agentplane/tasks/202609021331-5FPZAB/pr/github-title.txt"
              - ".agentplane/tasks/202609021331-5FPZAB/pr/meta.json"
              - ".agentplane/tasks/202609021331-5FPZAB/pr/review.md"
            git:
              kind: "commit"
              ref: null
              sha: "a51e95514f2909177410f78a4057873140097edb"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:5"
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                id: "focused"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run bench:compatibility:candidate:check"
                id: "compatibility"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "lifecycle"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run lint:core"
                id: "lint-core"
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
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
            criteria:
              -
                check_ids:
                  - "focused"
                  - "compatibility"
                  - "lifecycle"
                  - "lint-core"
                  - "typecheck"
                  - "routing"
                  - "full"
                description: "All five sequential WorkItems pass and public lifecycle readback converges on one authoritative task, WorkItem, route, provider, queue, branch, and worktree state."
                id: "projection-integrity-complete"
                required: true
            evidence_fingerprint: "sha256:14fc00de6c705c044afb2783e12cbbd47a79a7cd8918a9b6171ad8fdd8ad5b36"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "authoritative-focused"
                    description: "An active branch_pr Task has one authoritative checkout identity; ambiguous, stale, foreign, base-only, and missing identities fail closed."
                    id: "authoritative-worktree"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 96000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "findWorktreeForBranch"
                    - "resolveWorkflowWorkspace"
                    - "readTaskBackendBranchSnapshot"
                depends_on: []
                expected_outputs:
                  - "authoritative-worktree-identity"
                id: "projection-authoritative-worktree"
                objective: "Resolve active branch_pr Task identity from exactly one authoritative registered worktree and bind backend reads, route observations, and mutation paths to that identity. Reject base fallback, stale hints, duplicate same-task registrations, foreign branches, and missing registrations without redirecting state."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/branch"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/git"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/branch"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/core/src/git"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
                      id: "authoritative-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "authoritative-focused"
                      description: "An active branch_pr Task has one authoritative checkout identity; ambiguous, stale, foreign, base-only, and missing identities fail closed."
                      id: "authoritative-worktree"
                      required: true
                  evidence_fingerprint: "sha256:14fc00de6c705c044afb2783e12cbbd47a79a7cd8918a9b6171ad8fdd8ad5b36"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "atomic-focused"
                      - "lifecycle"
                    description: "Set-status, merge, and hosted close produce one revision-consistent projection or fail without partial visibility; replay is idempotent."
                    id: "atomic-reconciliation"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 128000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "KernelTaskLifecycle"
                    - "KernelBackendAdapter"
                    - "cmdTaskSetStatus"
                    - "reconcileHostedClose"
                depends_on:
                  - "projection-authoritative-worktree"
                expected_outputs:
                  - "atomic-lifecycle-reconciliation"
                id: "projection-atomic-reconciliation"
                objective: "Use existing kernel operations and receipts to reconcile canonical and supported compatibility projections atomically after set-status, provider-proven merge, and hosted close. An interruption exposes no partial status, WorkItem, route, or provider view, and exact replay creates no duplicate transition."
                optional: false
                priority: 1
                required_inputs:
                  - "authoritative-worktree-identity"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts"
                      id: "atomic-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                  criteria:
                    -
                      check_ids:
                        - "atomic-focused"
                        - "lifecycle"
                      description: "Set-status, merge, and hosted close produce one revision-consistent projection or fail without partial visibility; replay is idempotent."
                      id: "atomic-reconciliation"
                      required: true
                  evidence_fingerprint: "sha256:14fc00de6c705c044afb2783e12cbbd47a79a7cd8918a9b6171ad8fdd8ad5b36"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "invalidation-focused"
                    description: "No WorkItem or route projection derived from an older canonical or repository identity remains eligible after relevant state changes."
                    id: "invalidate-stale"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 112000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "buildWorkflowStepProjections"
                    - "routeTaskNextAction"
                    - "stateFingerprint"
                    - "workItem"
                depends_on:
                  - "projection-atomic-reconciliation"
                expected_outputs:
                  - "projection-invalidation"
                id: "projection-invalidation"
                objective: "Invalidate WorkItem summaries, route decisions, and compatibility views when canonical revision, plan binding, result receipt, repository identity, provider observation, or authoritative checkout changes, while preserving unchanged exact replay."
                optional: false
                priority: 2
                required_inputs:
                  - "atomic-lifecycle-reconciliation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
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
                    resource: "packages/core/src/tasks"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli"
                  - "packages/core/src/tasks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/workflow-step-projections-routing.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                      id: "invalidation-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                  criteria:
                    -
                      check_ids:
                        - "invalidation-focused"
                      description: "No WorkItem or route projection derived from an older canonical or repository identity remains eligible after relevant state changes."
                      id: "invalidate-stale"
                      required: true
                  evidence_fingerprint: "sha256:14fc00de6c705c044afb2783e12cbbd47a79a7cd8918a9b6171ad8fdd8ad5b36"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "cleanup-focused"
                    description: "A completed branch_pr task converges to terminal projection and done queue state with no clean merged task checkout or branch; unsafe work is preserved."
                    id: "cleanup-converges"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 128000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "cleanupMerged"
                    - "resolveTargetedCleanupProof"
                    - "normalizeIntegrationQueueEntry"
                    - "sync_hosted_close"
                depends_on:
                  - "projection-invalidation"
                expected_outputs:
                  - "completed-branch-pr-cleanup-convergence"
                id: "projection-cleanup-convergence"
                objective: "Make completed branch_pr cleanup converge from provider-proven merge or hosted-close truth after stale base synchronization. Normalize the queue, remove only clean proven task worktrees and task branches, tolerate replay, and preserve dirty, ambiguous, open, or unique work."
                optional: false
                priority: 3
                required_inputs:
                  - "projection-invalidation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/branch"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/pr"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "provider_queue"
                    mode: "exclusive"
                    resource: "integration-queue"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/branch"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/pr"
                  - "packages/agentplane/src/cli"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts packages/agentplane/src/commands/branch/cleanup-merged.batch.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts"
                      id: "cleanup-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                  criteria:
                    -
                      check_ids:
                        - "cleanup-focused"
                      description: "A completed branch_pr task converges to terminal projection and done queue state with no clean merged task checkout or branch; unsafe work is preserved."
                      id: "cleanup-converges"
                      required: true
                  evidence_fingerprint: "sha256:14fc00de6c705c044afb2783e12cbbd47a79a7cd8918a9b6171ad8fdd8ad5b36"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "arkady-focused"
                      - "compatibility"
                      - "full"
                    description: "The real-Git scenario cannot leave DONE visible in only one projection; terminal identities agree, replay is idempotent, queue is done, and clean merged task refs are absent."
                    id: "arkady-e2e"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 144000
                  optional_sources: []
                  required_sources:
                    - "repository"
                    - "task-document"
                  symbol_hints:
                    - "runCli"
                    - "routeTaskNextAction"
                    - "cleanupMerged"
                    - "Arkady Factory"
                depends_on:
                  - "projection-cleanup-convergence"
                expected_outputs:
                  - "arkady-factory-stale-done-e2e"
                id: "projection-arkady-stale-done-e2e"
                objective: "Strengthen the existing real-Git public CLI harness with the Arkady Factory stale-DONE scenario from authoritative worktree through set-status, WorkItem completion, exact replay, provider merge, hosted close, base sync, queue normalization, and cleanup to one terminal readback."
                optional: false
                priority: 4
                required_inputs:
                  - "completed-branch-pr-cleanup-convergence"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/branch"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/qualification"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "scripts/checks"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/branch"
                  - "scripts/qualification"
                  - "scripts/checks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts"
                      id: "arkady-focused"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run bench:compatibility:candidate:check"
                      id: "compatibility"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "arkady-focused"
                        - "compatibility"
                        - "full"
                      description: "The real-Git scenario cannot leave DONE visible in only one projection; terminal identities agree, replay is idempotent, queue is done, and clean merged task refs are absent."
                      id: "arkady-e2e"
                      required: true
                  evidence_fingerprint: "sha256:14fc00de6c705c044afb2783e12cbbd47a79a7cd8918a9b6171ad8fdd8ad5b36"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609021331-5FPZAB"
    revision: 27
    schema_version: 1
    updated_at: "2026-09-02T17:13:46.847Z"
    work_items:
      projection-arkady-stale-done-e2e:
        attempt: 0
        claim_id: null
        id: "projection-arkady-stale-done-e2e"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      projection-atomic-reconciliation:
        attempt: 2
        claim_id: null
        id: "projection-atomic-reconciliation"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:6846151541a4f9bdc25bdb93aa27cf663422b04c71c25d08579687555cccbb34"
            id: "atomic-lifecycle-reconciliation"
            kind: "semantic_output"
            producer:
              attempt: 2
              plan_revision: 3
              task_id: "202609021331-5FPZAB"
              work_item_id: "projection-atomic-reconciliation"
            provenance:
              - "sha256:100808a2880818c7ee9c3abd82d5e58295878412fe2624ec0676f4328d2fa4f3"
              - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:a376fae08f518a9638d95b6ff79f2e8d85d12a1a27c9752543ebbb25e41b409f"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 3
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
              check_id: "focused"
              command_identity: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
              detail: "Observed by bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts."
              exit_code: 0
              observed_at: "2026-09-02T16:34:31.704Z"
              repository_snapshot_digest: "sha256:a376fae08f518a9638d95b6ff79f2e8d85d12a1a27c9752543ebbb25e41b409f"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
              check_id: "lifecycle"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-02T16:34:31.704Z"
              repository_snapshot_digest: "sha256:a376fae08f518a9638d95b6ff79f2e8d85d12a1a27c9752543ebbb25e41b409f"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      projection-authoritative-worktree:
        attempt: 1
        claim_id: null
        id: "projection-authoritative-worktree"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:c49efe5aac14c9df28610ef4a0059d9db6874b43735343cadc3b2fbc329696ed"
            id: "authoritative-worktree-identity"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 3
              task_id: "202609021331-5FPZAB"
              work_item_id: "projection-authoritative-worktree"
            provenance:
              - "sha256:bedc3dfbfaa36f1a9a824d6427e2cd70e05547e62f61deda4eebb9f30342e2ef"
              - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:ac206209d47d9f3c4c8f8b93855f1645631506508f67603d135a4fe9ea914ed2"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
              check_id: "focused"
              command_identity: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
              detail: "Observed by bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts."
              exit_code: 0
              observed_at: "2026-09-02T16:18:32.199Z"
              repository_snapshot_digest: "sha256:ac206209d47d9f3c4c8f8b93855f1645631506508f67603d135a4fe9ea914ed2"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      projection-cleanup-convergence:
        attempt: 1
        claim_id: null
        id: "projection-cleanup-convergence"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:62732dd07fb18426657ae2b158d0159d5722a55bc90a51f3f5c77a32ee247384"
            id: "completed-branch-pr-cleanup-convergence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 3
              task_id: "202609021331-5FPZAB"
              work_item_id: "projection-cleanup-convergence"
            provenance:
              - "sha256:dd43d374613f766612b98f04fdcf7083432cd177899e3f20d3b9eb9898ce8a1c"
              - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:4f9faf9200eecbd9847669eb3288389e45532dcc593b284a2a9cd5ca8e0950d6"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
              check_id: "focused"
              command_identity: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
              detail: "Observed by bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts."
              exit_code: 0
              observed_at: "2026-09-02T17:13:46.836Z"
              repository_snapshot_digest: "sha256:4f9faf9200eecbd9847669eb3288389e45532dcc593b284a2a9cd5ca8e0950d6"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      projection-invalidation:
        attempt: 1
        claim_id: null
        id: "projection-invalidation"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:83ec8c4619875cba06b5bb6b96324a202702cc9a600e07a2a59404e89ec8d976"
            id: "stale-projection-invalidation"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 3
              task_id: "202609021331-5FPZAB"
              work_item_id: "projection-invalidation"
            provenance:
              - "sha256:b66bed34b0962445aa761e620c8e2d505d376daa9749e584b832a5bc125b6732"
              - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:ac6db454f7cba2a198037764d548d565c3414fe476f68229ed583aeadff94021"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
              check_id: "focused"
              command_identity: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
              detail: "Observed by bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts."
              exit_code: 0
              observed_at: "2026-09-02T16:58:57.669Z"
              repository_snapshot_digest: "sha256:ac6db454f7cba2a198037764d548d565c3414fe476f68229ed583aeadff94021"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      compatibility:sha256:17d4ac0dad16c93a4b89b37ce3098bca1d9d41590157b6db28d4223e243ba1e8:
        aggregate_digest: "sha256:3ce517808c80e373c58c261d1a181f3176c3a27fc532d1883f2811810bca73fb"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T16:34:05.575Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_33064d7ee2f3a97c7617f5dc"
          mutation_id: "compatibility:sha256:17d4ac0dad16c93a4b89b37ce3098bca1d9d41590157b6db28d4223e243ba1e8"
          plan_digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 18
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:17d4ac0dad16c93a4b89b37ce3098bca1d9d41590157b6db28d4223e243ba1e8"
        next_revision: 19
        previous_revision: 18
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      compatibility:sha256:3b14bf123960f633b9de9d1e11b610212c646c3f5737a5d74be0c2372e4ad482:
        aggregate_digest: "sha256:a2559e4c262fb50763d20119ad74089b39beb759b441c8d7f264900d9c88996a"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T17:13:21.093Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_41008b8915b6271d8b66f245"
          mutation_id: "compatibility:sha256:3b14bf123960f633b9de9d1e11b610212c646c3f5737a5d74be0c2372e4ad482"
          plan_digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 24
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3b14bf123960f633b9de9d1e11b610212c646c3f5737a5d74be0c2372e4ad482"
        next_revision: 25
        previous_revision: 24
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      compatibility:sha256:e0e6be405dda122f343c42e3db52e95d05a205691c83746c1e3ba8196688d0ed:
        aggregate_digest: "sha256:e7db0e6a825aad01eb4ce34eb7aa5956ff7562632b42fb2c77edee39fae79d97"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T16:58:32.604Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_a299b035320eed0f4a4c7b53"
          mutation_id: "compatibility:sha256:e0e6be405dda122f343c42e3db52e95d05a205691c83746c1e3ba8196688d0ed"
          plan_digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 21
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e0e6be405dda122f343c42e3db52e95d05a205691c83746c1e3ba8196688d0ed"
        next_revision: 22
        previous_revision: 21
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      compatibility:sha256:f7d4935568c356919525cfc5403ea00b1f8fba4af881dbf9ae801552807fd70e:
        aggregate_digest: "sha256:7ec8254baf12cb9da1121de0eda8ea0f2b51b3cd64333baae39ecb44aab18075"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T16:30:22.928Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_6a6b84dd9a351531ff8e1ee4"
          mutation_id: "compatibility:sha256:f7d4935568c356919525cfc5403ea00b1f8fba4af881dbf9ae801552807fd70e"
          plan_digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 15
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f7d4935568c356919525cfc5403ea00b1f8fba4af881dbf9ae801552807fd70e"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      external-result:work-order-202609021331-5FPZAB-executor-09ca8501bf35eb3bc698e184:
        aggregate_digest: "sha256:a2149e39dc99643063d9e27168da7a5f130d0a9ec82d9692dcd17b87147d44d7"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T16:58:57.681Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_fb38855e63cb04cdb917a4e2"
          mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-09ca8501bf35eb3bc698e184"
          plan_digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 23
          to: "COMPLETED"
          work_item_id: "projection-invalidation"
        mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-09ca8501bf35eb3bc698e184"
        next_revision: 24
        previous_revision: 23
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      external-result:work-order-202609021331-5FPZAB-executor-2029a4a1b07d032b3d2214aa:
        aggregate_digest: "sha256:9a9aee2034aa8c35ee787026fb372db21a446ff6d69421c6a6a67a4f8c006bf0"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T16:30:47.356Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_81a52bb09ee9e84dde9c789c"
          mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-2029a4a1b07d032b3d2214aa"
          plan_digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 17
          to: "REWORK_READY"
          work_item_id: "projection-atomic-reconciliation"
        mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-2029a4a1b07d032b3d2214aa"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      external-result:work-order-202609021331-5FPZAB-executor-31f3125231c54c0023432324:
        aggregate_digest: "sha256:601bf2d706912e877a6d68de12fdd49ed8972c934bfb262e834a551d66c223c6"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T16:18:32.209Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_1fb9dcacce56306ab0f71f20"
          mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-31f3125231c54c0023432324"
          plan_digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 14
          to: "COMPLETED"
          work_item_id: "projection-authoritative-worktree"
        mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-31f3125231c54c0023432324"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      external-result:work-order-202609021331-5FPZAB-executor-5c8bb03cec254489b2112765:
        aggregate_digest: "sha256:f669abd6993850d4700faa10de854637ed1662cf73a725447c60c27d7f7038e3"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T16:34:31.715Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_c16d4dea30bc7594c54a4436"
          mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-5c8bb03cec254489b2112765"
          plan_digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 20
          to: "COMPLETED"
          work_item_id: "projection-atomic-reconciliation"
        mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-5c8bb03cec254489b2112765"
        next_revision: 21
        previous_revision: 20
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      external-result:work-order-202609021331-5FPZAB-executor-f2d851cc6fdb7ea188fcf8f3:
        aggregate_digest: "sha256:6f410297d6fa79c82517c12627c55ab00350a0f07af8a07bf6ef6df669aa629c"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T17:13:46.847Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_cf42cb41d3b4c8f7554cfa6f"
          mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-f2d851cc6fdb7ea188fcf8f3"
          plan_digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 26
          to: "COMPLETED"
          work_item_id: "projection-cleanup-convergence"
        mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-f2d851cc6fdb7ea188fcf8f3"
        next_revision: 27
        previous_revision: 26
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      plan-refinement:work-order-202609021331-5FPZAB-executor-8ee49119abba4bbc913a762f:
        aggregate_digest: "sha256:5f838ac03a3fe36d22929d3bc6c6014b4aa43242f8e6c132d1d36134ae83c352"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-02T15:37:50.147Z"
          cause_refs:
            - "dependencies_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_a45b77a4f8e70574ba4a854b"
          mutation_id: "plan-refinement:work-order-202609021331-5FPZAB-executor-8ee49119abba4bbc913a762f"
          plan_digest: "sha256:d42b74be1088a02500f76fc08c8a3b4331ca0c32691bf2a322afebc06f17c76f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 4
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609021331-5FPZAB-executor-8ee49119abba4bbc913a762f"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609021331-5FPZAB"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "f200d94de2ad7e1049716f5b172cf467c8701f43"
  task_execution_context:
    base_ref: "main"
    base_sha: "a51e95514f2909177410f78a4057873140097edb"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "a51e95514f2909177410f78a4057873140097edb"
    version: 1
id_source: "generated"
---
## Summary

Repair lifecycle projection integrity after M3 cutover

After M3 is integrated, repair the demonstrated lifecycle projection-integrity gaps without release work or MPXQBK. Deliver five sequential WorkItems: (1) authoritative-worktree task identity; (2) atomic lifecycle projection reconciliation after set-status, hosted close, and merge; (3) invalidation of stale WorkItem and route projections; (4) convergence of completed branch_pr cleanup; (5) an Arkady Factory stale-DONE end-to-end regression. Reuse existing code and tests before adding new code. Prefer deletion or consolidation over compatibility layers. Treat the current compatibility-import edges and line count as a measured baseline, not a hard cap; any necessary expansion must be explicit in the allowlist and covered by a focused regression so growth remains fail-closed. Keep all changes bounded to projection integrity and lifecycle cleanup. Do not include release/version/publish work or MPXQBK.

## Scope

- In scope: After M3 is integrated, repair the demonstrated lifecycle projection-integrity gaps without release work or MPXQBK. Deliver five sequential WorkItems: (1) authoritative-worktree task identity; (2) atomic lifecycle projection reconciliation after set-status, hosted close, and merge; (3) invalidation of stale WorkItem and route projections; (4) convergence of completed branch_pr cleanup; (5) an Arkady Factory stale-DONE end-to-end regression. Reuse existing code and tests before adding new code. Prefer deletion or consolidation over compatibility layers. Treat the current compatibility-import edges and line count as a measured baseline, not a hard cap; any necessary expansion must be explicit in the allowlist and covered by a focused regression so growth remains fail-closed. Keep all changes bounded to projection integrity and lifecycle cleanup. Do not include release/version/publish work or MPXQBK.
- Out of scope: unrelated refactors not required for "Repair lifecycle projection integrity after M3 cutover".

## Plan

Rebuilt the five-stage plan so execution authority, WorkItem scopes and claims, exact predecessor outputs, and task-specific Verify Steps are consistent.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts`. Expected: authoritative-worktree identity, atomic projection, stale invalidation, cleanup convergence, and Arkady Factory cases pass.
2. Run `bun run bench:compatibility:candidate:check`. Expected: the compatibility baseline remains fail-closed; any increase is allowlisted and justified by a focused regression.
3. Run `bun run lifecycle:invariants`. Expected: one canonical lifecycle owner and exact replay invariants pass.
4. Run `bun run lint:core` and `bun run typecheck`. Expected: both pass.
5. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy passes.
6. Run `bun run ci:local:full` after focused checks are green. Expected: the complete local gate passes at the exact implementation SHA.
7. Require exact-head hosted checks, EVALUATOR pass, AgentPlane-authorized merge, fresh-main readback, hosted close, and cleanup. Expected: all projections agree on terminal state and no clean merged task branch or worktree remains.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
