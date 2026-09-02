---
id: "202609021331-5FPZAB"
title: "Repair lifecycle projection integrity after M3 cutover"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 46
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
  updated_at: "2026-09-02T22:10:17.708Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:a383991ecbddcbb48af693affcf9acadb206588ed2838cf5c776df298fdecbb8"
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
      - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
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
      - "packages/agentplane/src/commands/shared/workflow-step-projections-routing.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/finish-shared.ts"
      - "packages/agentplane/src/commands/task/finish-task-store.testkit.ts"
      - "packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts"
      - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
      - "packages/agentplane/src/commands/task/finish.validation.unit.test.ts"
      - "packages/agentplane/src/commands/task/hosted-close.command.ts"
      - "packages/agentplane/src/commands/task/plan.unit.test.ts"
      - "packages/agentplane/src/commands/task/set-status.unit.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
      - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
      - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
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
      digest: "sha256:9f67ba99c1bb64d9a625a1b5afedf83616125ebd40966625bd2c905b8bb57e38"
      escalation_reasons:
        - "central_component:packages/core/src/tasks"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
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
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-projections-routing.test.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
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
          - "packages/agentplane/src/commands/shared/workflow-step-projections-routing.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/finish-shared.ts"
          - "packages/agentplane/src/commands/task/finish-task-store.testkit.ts"
          - "packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts"
          - "packages/agentplane/src/commands/task/finish.state.unit.test.ts"
          - "packages/agentplane/src/commands/task/finish.validation.unit.test.ts"
          - "packages/agentplane/src/commands/task/hosted-close.command.ts"
          - "packages/agentplane/src/commands/task/plan.unit.test.ts"
          - "packages/agentplane/src/commands/task/set-status.unit.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
          - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
          - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
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
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 939f62acc667. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: dd283c655fa4. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: f5fb814c2426. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 171c76d47189. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 143095a470a5. CLI accepted one state-bound external-agent semantic result."
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
  -
    type: "status"
    at: "2026-09-02T17:41:09.611Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 939f62acc667. CLI accepted one state-bound external-agent semantic result."
    commit: "939f62acc66741fe6b864ad83210eb209db658c3"
  -
    type: "status"
    at: "2026-09-02T22:10:23.470Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-02T22:12:48.406Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: dd283c655fa4. CLI accepted one state-bound external-agent semantic result."
    commit: "dd283c655fa457aeccc0453f666f42b5f15d16c0"
  -
    type: "status"
    at: "2026-09-02T22:21:09.945Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: f5fb814c2426. CLI accepted one state-bound external-agent semantic result."
    commit: "f5fb814c2426c10c2ad99e2a1c58b51117226686"
  -
    type: "status"
    at: "2026-09-02T22:24:45.081Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 171c76d47189. CLI accepted one state-bound external-agent semantic result."
    commit: "171c76d47189b2fd2f05ba4bb653fc47ecdeccf5"
  -
    type: "status"
    at: "2026-09-02T22:29:43.891Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 143095a470a5. CLI accepted one state-bound external-agent semantic result."
    commit: "143095a470a5f341d8d580bfdb839f3056feb5e1"
doc_version: 3
doc_updated_at: "2026-09-02T22:29:43.891Z"
doc_updated_by: "SUPERVISOR"
description: "After M3 is integrated, repair the demonstrated lifecycle projection-integrity gaps without release work or MPXQBK. Deliver five sequential WorkItems: (1) authoritative-worktree task identity; (2) atomic lifecycle projection reconciliation after set-status, hosted close, and merge; (3) invalidation of stale WorkItem and route projections; (4) convergence of completed branch_pr cleanup; (5) an Arkady Factory stale-DONE end-to-end regression. Reuse existing code and tests before adding new code. Prefer deletion or consolidation over compatibility layers. Treat the current compatibility-import edges and line count as a measured baseline, not a hard cap; any necessary expansion must be explicit in the allowlist and covered by a focused regression so growth remains fail-closed. Keep all changes bounded to projection integrity and lifecycle cleanup. Do not include release/version/publish work or MPXQBK."
sections:
  Summary: |-
    Repair lifecycle projection integrity after M3 cutover

    After M3 is integrated, repair the demonstrated lifecycle projection-integrity gaps without release work or MPXQBK. Deliver five sequential WorkItems: (1) authoritative-worktree task identity; (2) atomic lifecycle projection reconciliation after set-status, hosted close, and merge; (3) invalidation of stale WorkItem and route projections; (4) convergence of completed branch_pr cleanup; (5) an Arkady Factory stale-DONE end-to-end regression. Reuse existing code and tests before adding new code. Prefer deletion or consolidation over compatibility layers. Treat the current compatibility-import edges and line count as a measured baseline, not a hard cap; any necessary expansion must be explicit in the allowlist and covered by a focused regression so growth remains fail-closed. Keep all changes bounded to projection integrity and lifecycle cleanup. Do not include release/version/publish work or MPXQBK.
  Scope: |-
    - In scope: After M3 is integrated, repair the demonstrated lifecycle projection-integrity gaps without release work or MPXQBK. Deliver five sequential WorkItems: (1) authoritative-worktree task identity; (2) atomic lifecycle projection reconciliation after set-status, hosted close, and merge; (3) invalidation of stale WorkItem and route projections; (4) convergence of completed branch_pr cleanup; (5) an Arkady Factory stale-DONE end-to-end regression. Reuse existing code and tests before adding new code. Prefer deletion or consolidation over compatibility layers. Treat the current compatibility-import edges and line count as a measured baseline, not a hard cap; any necessary expansion must be explicit in the allowlist and covered by a focused regression so growth remains fail-closed. Keep all changes bounded to projection integrity and lifecycle cleanup. Do not include release/version/publish work or MPXQBK.
    - Out of scope: unrelated refactors not required for "Repair lifecycle projection integrity after M3 cutover".
  Plan: "Rebuilt the approved five-stage plan with the same strict order and task-specific checks, adding commands/task only to the fifth WorkItem resource claim so its full-CI rework is authorized."
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
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:a383991ecbddcbb48af693affcf9acadb206588ed2838cf5c776df298fdecbb8"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:37b38a2b1a35a0f6539df0741b7e202623a7d4e9dd6d9481f15fc651ab9c7564"
    digest: "sha256:e71b2a0f41c92196ed9fbd3f5051b341ab4a0a7abe61dfde7a35835ed7cfef88"
    grant_id: "83d2b403-71a5-456e-a47d-c6c3a9bc9325"
    issued_at: "2026-09-02T22:10:17.708Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:65505221f766a797e2c07412f13b0820ccf94e2c34aececa097f8a197180019f"
    plan_revision: 32
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:fe0e5a0b1993fe8d8204c9ba194992241beaaaf08ccf9cd1fc1b83c66229424e"
    status: "active"
    task_id: "202609021331-5FPZAB"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-02T22:10:17.708Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:8f09961c6fb81eb30a102705168a252b920e1d1412db49b677e7bd5683686081"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-02T17:51:48.788Z"
      digest: "sha256:8f09961c6fb81eb30a102705168a252b920e1d1412db49b677e7bd5683686081"
      proposal:
        assumptions:
          - "M3 is terminal on main at a51e95514f2909177410f78a4057873140097edb and is immutable dependency provenance."
          - "Existing task backend, kernel, route, hosted-close, and cleanup owners are reused; no parallel projection store is added."
          - "Only one WorkItem is active, and every required_inputs value is an exact predecessor expected_outputs ID."
          - "Compatibility edges and LOC remain a measured fail-closed baseline; necessary growth requires an allowlist update and focused regression."
          - "MPXQBK and all release/version/publication work remain excluded."
        planning_baseline:
          captured_at: "2026-09-02T17:49:37.581Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:2f7436364f04d4a27d97241bc901f0a75c40f2ca9d21c3e0e6301f362f50022f"
          dirty_paths:
            - ".agentplane/tasks/202609021331-5FPZAB/README.md"
            - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
            - ".agentplane/tasks/202609021331-5FPZAB/supervision/implementation-evidence.json"
          git:
            kind: "commit"
            ref: null
            sha: "939f62acc66741fe6b864ad83210eb209db658c3"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:31"
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
          evidence_fingerprint: "sha256:2f7436364f04d4a27d97241bc901f0a75c40f2ca9d21c3e0e6301f362f50022f"
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
                evidence_fingerprint: "sha256:2f7436364f04d4a27d97241bc901f0a75c40f2ca9d21c3e0e6301f362f50022f"
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
                evidence_fingerprint: "sha256:2f7436364f04d4a27d97241bc901f0a75c40f2ca9d21c3e0e6301f362f50022f"
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
                evidence_fingerprint: "sha256:2f7436364f04d4a27d97241bc901f0a75c40f2ca9d21c3e0e6301f362f50022f"
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
                evidence_fingerprint: "sha256:2f7436364f04d4a27d97241bc901f0a75c40f2ca9d21c3e0e6301f362f50022f"
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
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/branch"
                - "scripts/qualification"
                - "scripts/checks"
                - "packages/agentplane/src/commands/task"
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
                evidence_fingerprint: "sha256:2f7436364f04d4a27d97241bc901f0a75c40f2ca9d21c3e0e6301f362f50022f"
                schema_version: 1
      revision: 4
      schema_version: 1
      task_id: "202609021331-5FPZAB"
    event_cursor: 11
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
      -
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
    revision: 46
    schema_version: 1
    updated_at: "2026-09-02T22:30:11.619Z"
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
        attempt: 1
        claim_id: null
        id: "projection-atomic-reconciliation"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:bd577887b7c9f870750a5516ac050b69137d8d3e0edb9ad1f814927da8d55590"
            id: "atomic-lifecycle-reconciliation"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 4
              task_id: "202609021331-5FPZAB"
              work_item_id: "projection-atomic-reconciliation"
            provenance:
              - "sha256:57b11ee59294a676b19172fe9ced508370d4dca13b12be90dfa56ddf4a4ea887"
              - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:10d4032592d12dac5092ff961cae0000df60f635868ed1b15939eaaa4eeb5216"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
              check_id: "atomic-focused"
              command_identity: "bunx vitest run packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts"
              detail: "Observed by bunx vitest run packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts."
              exit_code: 0
              observed_at: "2026-09-02T22:21:17.711Z"
              repository_snapshot_digest: "sha256:10d4032592d12dac5092ff961cae0000df60f635868ed1b15939eaaa4eeb5216"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
              check_id: "lifecycle"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-02T22:21:17.711Z"
              repository_snapshot_digest: "sha256:10d4032592d12dac5092ff961cae0000df60f635868ed1b15939eaaa4eeb5216"
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
            digest: "sha256:9fcb15d2498bf0b8a3d514332f05d2bc4a0eb1061dc360e8b766ac9a4067a992"
            id: "authoritative-worktree-identity"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 4
              task_id: "202609021331-5FPZAB"
              work_item_id: "projection-authoritative-worktree"
            provenance:
              - "sha256:c2c68c97d8111c2e05a95662ff190e9fad83b3d768e8e364ddbfdbe8aba30b21"
              - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:6f0c3969cac3a9aac919d98d755102f1c31152d6c569950b5b0b6b56cc8b9cd4"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
              check_id: "authoritative-focused"
              command_identity: "bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
              detail: "Observed by bunx vitest run packages/agentplane/src/commands/shared/task-backend-branch-snapshot.unit.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts."
              exit_code: 0
              observed_at: "2026-09-02T22:12:50.352Z"
              repository_snapshot_digest: "sha256:6f0c3969cac3a9aac919d98d755102f1c31152d6c569950b5b0b6b56cc8b9cd4"
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
            digest: "sha256:bd0289dd9029dfff07bc9eed5909c021bad419ee715fa2e782018addb1dea95b"
            id: "completed-branch-pr-cleanup-convergence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 4
              task_id: "202609021331-5FPZAB"
              work_item_id: "projection-cleanup-convergence"
            provenance:
              - "sha256:3a8802d540e6b1665d2ad402e461d030280eda6b6235506b9e744d78704ce106"
              - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5af20b79d48fb87ea2ced25445922a4b1707bd7ed040c381109aa93d1d688d8b"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
              check_id: "cleanup-focused"
              command_identity: "bunx vitest run packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts packages/agentplane/src/commands/branch/cleanup-merged.batch.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts"
              detail: "Observed by bunx vitest run packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-reconciliation.test.ts packages/agentplane/src/commands/branch/cleanup-merged.batch.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts."
              exit_code: 0
              observed_at: "2026-09-02T22:30:11.603Z"
              repository_snapshot_digest: "sha256:5af20b79d48fb87ea2ced25445922a4b1707bd7ed040c381109aa93d1d688d8b"
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
            digest: "sha256:aee1dc3cae34f5951e4efab02ac770cd8e1456da2df58ccfe6bd260b18b96a09"
            id: "projection-invalidation"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 4
              task_id: "202609021331-5FPZAB"
              work_item_id: "projection-invalidation"
            provenance:
              - "sha256:d9cf05ed3893ec1861c5fde6c8ab621ae823c694c6033d385f9f27ab7396b6bc"
              - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:52b95e90179b3ebe14f5701f8e34b7bce40ab0b20e97fd0d140735af56c69a9b"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609021331-5FPZAB/supervision/declared-checks.json"
              check_id: "invalidation-focused"
              command_identity: "bunx vitest run packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/workflow-step-projections-routing.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
              detail: "Observed by bunx vitest run packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/workflow-step-projections-routing.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts."
              exit_code: 0
              observed_at: "2026-09-02T22:24:57.375Z"
              repository_snapshot_digest: "sha256:52b95e90179b3ebe14f5701f8e34b7bce40ab0b20e97fd0d140735af56c69a9b"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      compatibility:sha256:11d1a8000dbf3c03f2b99ed1f885b99bf234d6430ca2fd66eb9c5022ad471665:
        aggregate_digest: "sha256:340e5ce29c243196c8af22e2120e15c8bf13888ee3cbcba6209f351b9a417b71"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T22:21:09.945Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_a8cd034ef62587067966af14"
          mutation_id: "compatibility:sha256:11d1a8000dbf3c03f2b99ed1f885b99bf234d6430ca2fd66eb9c5022ad471665"
          plan_digest: "sha256:8f09961c6fb81eb30a102705168a252b920e1d1412db49b677e7bd5683686081"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 37
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:11d1a8000dbf3c03f2b99ed1f885b99bf234d6430ca2fd66eb9c5022ad471665"
        next_revision: 38
        previous_revision: 37
        schema_version: 1
        task_id: "202609021331-5FPZAB"
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
      compatibility:sha256:3c8d217b4b732f33969bc1fcf12d0ec80060604dbe5053bcd9c66b05ad81a4b2:
        aggregate_digest: "sha256:fac68f56d86b5ec306db3a5beb6d747498290ee99050ffb1b8d27d45e4f35741"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T22:29:43.891Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_e6038605e8927339ceaee6d0"
          mutation_id: "compatibility:sha256:3c8d217b4b732f33969bc1fcf12d0ec80060604dbe5053bcd9c66b05ad81a4b2"
          plan_digest: "sha256:8f09961c6fb81eb30a102705168a252b920e1d1412db49b677e7bd5683686081"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 43
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3c8d217b4b732f33969bc1fcf12d0ec80060604dbe5053bcd9c66b05ad81a4b2"
        next_revision: 44
        previous_revision: 43
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      compatibility:sha256:48583ada1d903e52c43f82f4f093400e4328b0e35d0364ea22dd59b39438e306:
        aggregate_digest: "sha256:5d5e716ed986742431964433041cdfff1217f7f34fa4a09a8d5d67725b05548d"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T22:24:45.081Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_ee114261dc70c2eb906fac78"
          mutation_id: "compatibility:sha256:48583ada1d903e52c43f82f4f093400e4328b0e35d0364ea22dd59b39438e306"
          plan_digest: "sha256:8f09961c6fb81eb30a102705168a252b920e1d1412db49b677e7bd5683686081"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 40
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:48583ada1d903e52c43f82f4f093400e4328b0e35d0364ea22dd59b39438e306"
        next_revision: 41
        previous_revision: 40
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      compatibility:sha256:6732ec2792083f727b9c58a43b968e5c8ced2ff91545a671b6a26db6a764a7f9:
        aggregate_digest: "sha256:eb4e60f7d34e294fa030aec57fa70b42cec5675a2068f0eea52084ce81799247"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T17:41:09.611Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_a6225491e48fe0bcd3d3a5b2"
          mutation_id: "compatibility:sha256:6732ec2792083f727b9c58a43b968e5c8ced2ff91545a671b6a26db6a764a7f9"
          plan_digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 27
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6732ec2792083f727b9c58a43b968e5c8ced2ff91545a671b6a26db6a764a7f9"
        next_revision: 28
        previous_revision: 27
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      compatibility:sha256:8ff361cca4826e66dad6a4e3b61bc863c9873ff3a2798ecd7f9ea9eb77b2a67d:
        aggregate_digest: "sha256:bd66dae2377aebb7ec2e50deec0798d35e4f52086b68fedf730e8cb3b2ead428"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T22:12:48.406Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_72da23b350f690ce99ead83b"
          mutation_id: "compatibility:sha256:8ff361cca4826e66dad6a4e3b61bc863c9873ff3a2798ecd7f9ea9eb77b2a67d"
          plan_digest: "sha256:8f09961c6fb81eb30a102705168a252b920e1d1412db49b677e7bd5683686081"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 34
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8ff361cca4826e66dad6a4e3b61bc863c9873ff3a2798ecd7f9ea9eb77b2a67d"
        next_revision: 35
        previous_revision: 34
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      compatibility:sha256:c60fa63b906e963430b806232af1040e1de571e1fcffd33b6e286b99ac5b098c:
        aggregate_digest: "sha256:c309ff203c9f21faa3fdd0e935b3b29d5567937b8ffb68fcdbf5d6a63bb07e93"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T17:51:48.802Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "PLANNING"
          id: "event_5441decb5bff45607d53839b"
          mutation_id: "compatibility:sha256:c60fa63b906e963430b806232af1040e1de571e1fcffd33b6e286b99ac5b098c"
          plan_digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 31
          to: "PLANNING"
          work_item_id: null
        mutation_id: "compatibility:sha256:c60fa63b906e963430b806232af1040e1de571e1fcffd33b6e286b99ac5b098c"
        next_revision: 32
        previous_revision: 31
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
      compatibility:sha256:efbce705b5372fed1b1b4e61c33841675e43684defbee8350c11c917ddd53efe:
        aggregate_digest: "sha256:c69175afcb8e024cbdbc63b5d7f1487715017cfdb38c57f073b5751dd4d450cb"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T22:10:23.470Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_bf93befb3719ac492b90e3b6"
          mutation_id: "compatibility:sha256:efbce705b5372fed1b1b4e61c33841675e43684defbee8350c11c917ddd53efe"
          plan_digest: "sha256:8f09961c6fb81eb30a102705168a252b920e1d1412db49b677e7bd5683686081"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 33
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:efbce705b5372fed1b1b4e61c33841675e43684defbee8350c11c917ddd53efe"
        next_revision: 34
        previous_revision: 33
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
      external-result:work-order-202609021331-5FPZAB-executor-22173fbd8ca4e9c18a6e3798:
        aggregate_digest: "sha256:f9f307af8e36cda4a565f1551e0fd1744122efa1131a2a1273834f336eb49391"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T22:24:57.391Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_509562d8d0fa0a270ef3d9ed"
          mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-22173fbd8ca4e9c18a6e3798"
          plan_digest: "sha256:8f09961c6fb81eb30a102705168a252b920e1d1412db49b677e7bd5683686081"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 42
          to: "COMPLETED"
          work_item_id: "projection-invalidation"
        mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-22173fbd8ca4e9c18a6e3798"
        next_revision: 43
        previous_revision: 42
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
      external-result:work-order-202609021331-5FPZAB-executor-85a9e371afce1c746b5ec049:
        aggregate_digest: "sha256:3cbe116134ca101c1f0bf8e857cea8cfe13bfd677a3b1f80a41c853f1aa1d4b5"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T22:30:11.619Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_52faa8f7ef2cfcebfa295d12"
          mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-85a9e371afce1c746b5ec049"
          plan_digest: "sha256:8f09961c6fb81eb30a102705168a252b920e1d1412db49b677e7bd5683686081"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 45
          to: "COMPLETED"
          work_item_id: "projection-cleanup-convergence"
        mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-85a9e371afce1c746b5ec049"
        next_revision: 46
        previous_revision: 45
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      external-result:work-order-202609021331-5FPZAB-executor-9d5a47386f7c9c4fccfa310e:
        aggregate_digest: "sha256:968bb5e9b4e80fdd008ec62cf9af0f1c8759e74d872901bfc300673b4ce2f500"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T22:21:17.733Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_29081a889111db8a3ae0483b"
          mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-9d5a47386f7c9c4fccfa310e"
          plan_digest: "sha256:8f09961c6fb81eb30a102705168a252b920e1d1412db49b677e7bd5683686081"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 39
          to: "COMPLETED"
          work_item_id: "projection-atomic-reconciliation"
        mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-9d5a47386f7c9c4fccfa310e"
        next_revision: 40
        previous_revision: 39
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      external-result:work-order-202609021331-5FPZAB-executor-c246e5214a27e8c3ea7b1b69:
        aggregate_digest: "sha256:28f9829f4a9afcfef0ab72aaeedfc02988e489036fac03c92447283f7385e2e7"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T22:12:50.366Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_8c9248dfc5a9c186e4046448"
          mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-c246e5214a27e8c3ea7b1b69"
          plan_digest: "sha256:8f09961c6fb81eb30a102705168a252b920e1d1412db49b677e7bd5683686081"
          plan_revision: 4
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 36
          to: "COMPLETED"
          work_item_id: "projection-authoritative-worktree"
        mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-c246e5214a27e8c3ea7b1b69"
        next_revision: 37
        previous_revision: 36
        schema_version: 1
        task_id: "202609021331-5FPZAB"
      external-result:work-order-202609021331-5FPZAB-executor-d207fe0aea14861acab00c67:
        aggregate_digest: "sha256:9e9d46861f2dff11da99affb35e53d973822d3c67addf80a1e79286b7c6ce53f"
        event:
          actor_id: "agentplane"
          at: "2026-09-02T17:48:34.108Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_5baf51c4fddccda111690bb4"
          mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-d207fe0aea14861acab00c67"
          plan_digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 29
          to: "REWORK_READY"
          work_item_id: "projection-arkady-stale-done-e2e"
        mutation_id: "external-result:work-order-202609021331-5FPZAB-executor-d207fe0aea14861acab00c67"
        next_revision: 30
        previous_revision: 29
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
      plan-refinement:work-order-202609021331-5FPZAB-executor-99bd47da8bb107f81acc154a:
        aggregate_digest: "sha256:6a31d9813179a049edef9d12c17327760f8e30a4c81f2640debd3dbbeae7d446"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-02T17:49:35.971Z"
          cause_refs:
            - "scope_expanded"
          entity: "task"
          from: "ACTIVE"
          id: "event_a7f0a1465a27fcc99fe5a2ff"
          mutation_id: "plan-refinement:work-order-202609021331-5FPZAB-executor-99bd47da8bb107f81acc154a"
          plan_digest: "sha256:25d085d2b4013021071e23ef14c242cd8763341785991dd6e51436a1a47090dd"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609021331-5FPZAB"
          task_revision: 30
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609021331-5FPZAB-executor-99bd47da8bb107f81acc154a"
        next_revision: 31
        previous_revision: 30
        schema_version: 1
        task_id: "202609021331-5FPZAB"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "143095a470a5f341d8d580bfdb839f3056feb5e1"
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

Rebuilt the approved five-stage plan with the same strict order and task-specific checks, adding commands/task only to the fifth WorkItem resource claim so its full-CI rework is authorized.

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
