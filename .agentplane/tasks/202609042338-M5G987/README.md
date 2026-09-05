---
id: "202609042338-M5G987"
title: "Repair atomic scope extension projection and accepted-result recovery"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recovery"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts --maxWorkers=1"
  - "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1"
  - "bun run format:check"
  - "bun run lint:core"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
  - "node packages/agentplane/bin/agentplane.js task lint"
  - "node packages/agentplane/bin/agentplane.js doctor"
  - "git diff --check"
  - "bun run ci:local:full"
plan_approval:
  state: "approved"
  updated_at: "2026-09-04T23:55:14.880Z"
  updated_by: "USER"
  note: "Explicit user decision in this conversation: да, confirming plan sha256:7f2dc1df72bcd0e3d9d46cde93b8be99c8a4cc3a6f6ba1aa06f96d6a3c6e2c64. Executed by assistant under user authorization."
verification:
  state: "pending"
  updated_at: "2026-09-05T00:37:41.309Z"
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
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
      - "packages/agentplane/src/commands/task/external-agent-blocked-result.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
      - "packages/agentplane/src/commands/task/plan.ts"
      - "packages/agentplane/src/commands/task/plan.unit.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.ts"
      - "packages/agentplane/src/commands/task/set-status.unit.test.ts"
      - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
      - "packages/agentplane/src/commands/task/update.ts"
      - "packages/agentplane/src/commands/task/update.unit.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Exclude PH5N6S Factory verification ordering and external-agent-implementation-authority.ts, release/version/publication/dependency changes, MPXQBK, provider expansion, and unrelated cleanup. Do not weaken generic revision or stale-result guards. Do not manually edit projections, accepted results, receipts or journals."
      - "Hosted writes and integration remain separate state-bound framework transitions."
      - "Repair the proven lifecycle persistence defect through existing scope-extension and transition/recovery owners."
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts,packages/agentplane/src/commands/task/external-agent-blocked-result.ts,packages/agentplane/src/commands/task/plan.ts,packages/agentplane/src/commands/task/plan.unit.test.ts,packages/agentplane/src/commands/task/update.ts,packages/agentplane/src/commands/task/update.unit.test.ts"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
      - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
      - "packages/agentplane/src/commands/task/external-agent-blocked-result.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
      - "packages/agentplane/src/commands/task/plan.ts"
      - "packages/agentplane/src/commands/task/plan.unit.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.ts"
      - "packages/agentplane/src/commands/task/set-status.unit.test.ts"
      - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
      - "packages/agentplane/src/commands/task/update.ts"
      - "packages/agentplane/src/commands/task/update.unit.test.ts"
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
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
          - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
          - "packages/agentplane/src/commands/task/external-agent-blocked-result.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
          - "packages/agentplane/src/commands/task/plan.ts"
          - "packages/agentplane/src/commands/task/plan.unit.test.ts"
          - "packages/agentplane/src/commands/task/scope-extend.test.ts"
          - "packages/agentplane/src/commands/task/scope-extend.ts"
          - "packages/agentplane/src/commands/task/set-status.unit.test.ts"
          - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
          - "packages/agentplane/src/commands/task/update.ts"
          - "packages/agentplane/src/commands/task/update.unit.test.ts"
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
      digest: "sha256:ad8708b8355628bd9dc5b84f1245a20561baf338190d17129f2055cf1705621e"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
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
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The user-authorized bootstrap repair restored the supported task start. The workspace changes are intentional M5G987 code, not foreign work. Preserve them and extend this existing WorkItem authority before implementation continues. Recommended action: Apply the exact bounded scope extension to the existing WorkItem and execution contract. Preserve bootstrap changes, the current plan, required outputs and existing verification. Continue through a fresh EXECUTOR packet; do not create a recovery task or discard changes. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts,packages/agentplane/src/commands/task/external-agent-blocked-result.ts,packages/agentplane/src/commands/task/plan.ts,packages/agentplane/src/commands/task/plan.unit.test.ts,packages/agentplane/src/commands/task/update.ts,packages/agentplane/src/commands/task/update.unit.test.ts; repository effects=unchanged; request digest=sha256:e6094c35ab965e5c8abf10b2631a2780bfe4abcb0c3169ba817d1757fa292df6. Agentplane receipt: external-agent-blocker/tr_21dfc517c24baeaea5d1d93dd2741ced/sha256:4870e39194cead3669646a07bf9d8031105d7c7df65552f4c842edf890bb9fd7/sha256:e6094c35ab965e5c8abf10b2631a2780bfe4abcb0c3169ba817d1757fa292df6."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts, packages/agentplane/src/commands/task/external-agent-blocked-result.ts, packages/agentplane/src/commands/task/plan.ts, packages/agentplane/src/commands/task/plan.unit.test.ts, packages/agentplane/src/commands/task/update.ts, packages/agentplane/src/commands/task/update.unit.test.ts; repository effects: unchanged."
events:
  -
    type: "status"
    at: "2026-09-05T00:35:18.330Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-05T00:37:34.323Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The user-authorized bootstrap repair restored the supported task start. The workspace changes are intentional M5G987 code, not foreign work. Preserve them and extend this existing WorkItem authority before implementation continues. Recommended action: Apply the exact bounded scope extension to the existing WorkItem and execution contract. Preserve bootstrap changes, the current plan, required outputs and existing verification. Continue through a fresh EXECUTOR packet; do not create a recovery task or discard changes. Requested scope: roots=packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts,packages/agentplane/src/commands/task/external-agent-blocked-result.ts,packages/agentplane/src/commands/task/plan.ts,packages/agentplane/src/commands/task/plan.unit.test.ts,packages/agentplane/src/commands/task/update.ts,packages/agentplane/src/commands/task/update.unit.test.ts; repository effects=unchanged; request digest=sha256:e6094c35ab965e5c8abf10b2631a2780bfe4abcb0c3169ba817d1757fa292df6. Agentplane receipt: external-agent-blocker/tr_21dfc517c24baeaea5d1d93dd2741ced/sha256:4870e39194cead3669646a07bf9d8031105d7c7df65552f4c842edf890bb9fd7/sha256:e6094c35ab965e5c8abf10b2631a2780bfe4abcb0c3169ba817d1757fa292df6."
doc_version: 3
doc_updated_at: "2026-09-05T00:37:34.323Z"
doc_updated_by: "SUPERVISOR"
description: "Blocking dependency of 202609041801-ZVX69C / PR 5897 after integrated XR979S. A supported task scope extend on pre-merge DONE rework with all required WorkItems completed persisted legacy DOING revision 37 but retained canonical BLOCKED revision 35. The next accepted EXECUTOR result was committed as 682089ad3 and remains result_received; task set-status refuses expected 38 observed 35. Repair scope extension at its canonical persistence owner so lifecycle, revision, plan authority and projections advance atomically. Provide narrow idempotent recovery for the already-applied scope-extension receipt and accepted implementation, without replacing results, weakening mismatch checks, fabricating product diffs, or manually editing task state. Reproduce the complete blocker, scope extension, implementation result and retry sequence; preserve unrelated and truly stale rejection. Return to ZVX69C after integration. Exclude Factory clean-check ordering/worktree recovery owned by PH5N6S, releases, versions, publication, dependencies and MPXQBK."
sections:
  Summary: |-
    Repair atomic scope extension projection and accepted-result recovery

    Blocking dependency of 202609041801-ZVX69C / PR 5897 after integrated XR979S. A supported task scope extend on pre-merge DONE rework with all required WorkItems completed persisted legacy DOING revision 37 but retained canonical BLOCKED revision 35. The next accepted EXECUTOR result was committed as 682089ad3 and remains result_received; task set-status refuses expected 38 observed 35. Repair scope extension at its canonical persistence owner so lifecycle, revision, plan authority and projections advance atomically. Provide narrow idempotent recovery for the already-applied scope-extension receipt and accepted implementation, without replacing results, weakening mismatch checks, fabricating product diffs, or manually editing task state. Reproduce the complete blocker, scope extension, implementation result and retry sequence; preserve unrelated and truly stale rejection. Return to ZVX69C after integration. Exclude Factory clean-check ordering/worktree recovery owned by PH5N6S, releases, versions, publication, dependencies and MPXQBK.
  Scope: |-
    - In scope: Blocking dependency of 202609041801-ZVX69C / PR 5897 after integrated XR979S. A supported task scope extend on pre-merge DONE rework with all required WorkItems completed persisted legacy DOING revision 37 but retained canonical BLOCKED revision 35. The next accepted EXECUTOR result was committed as 682089ad3 and remains result_received; task set-status refuses expected 38 observed 35. Repair scope extension at its canonical persistence owner so lifecycle, revision, plan authority and projections advance atomically. Provide narrow idempotent recovery for the already-applied scope-extension receipt and accepted implementation, without replacing results, weakening mismatch checks, fabricating product diffs, or manually editing task state. Reproduce the complete blocker, scope extension, implementation result and retry sequence; preserve unrelated and truly stale rejection. Return to ZVX69C after integration. Exclude Factory clean-check ordering/worktree recovery owned by PH5N6S, releases, versions, publication, dependencies and MPXQBK.
    - Out of scope: unrelated refactors not required for "Repair atomic scope extension projection and accepted-result recovery".
  Plan: |-
    Make supported scope extension persist the canonical lifecycle, revision, execution authority and compatibility projection atomically, including repository-effect-only changes and all-required-WorkItems-completed rework. Recover the already-applied scope-extension inconsistency only from matching immutable blocker/application receipts and implementation identity through the existing command owner. Preserve completed WorkItems and accepted results. Repeated recovery is idempotent. Reject unrelated or genuinely stale revisions, task/branch/base/plan mismatches, missing or altered receipts and unauthorized scope without partial mutation. Reproduce blocker -> scope extension -> accepted implementation -> interruption -> exact replay through existing CLI tests. Integrate this bounded repair, then resume ZVX69C at its original accepted result.

    Exclude PH5N6S Factory verification ordering and external-agent-implementation-authority.ts, release/version/publication/dependency changes, MPXQBK, provider expansion, and unrelated cleanup. Do not weaken generic revision or stale-result guards. Do not manually edit projections, accepted results, receipts or journals.

    Verify Steps:
    1. Run `bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts --maxWorkers=1`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    2. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    3. Run `bun run format:check`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    4. Run `bun run lint:core`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    5. Run `bun run typecheck`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    6. Run `node .agentplane/policy/check-routing.mjs`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    7. Run `node packages/agentplane/bin/agentplane.js task lint`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    8. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    9. Run `git diff --check`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    10. Run `bun run ci:local:full`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
  Verify Steps: |-
    1. Run `bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts --maxWorkers=1`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    2. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    3. Run `bun run format:check`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    4. Run `bun run lint:core`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    5. Run `bun run typecheck`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    6. Run `node .agentplane/policy/check-routing.mjs`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    7. Run `node packages/agentplane/bin/agentplane.js task lint`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    8. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    9. Run `git diff --check`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
    10. Run `bun run ci:local:full`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
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
    digest: "sha256:24091f3c102461008d5950c68576c57435bbe44f890a5cbf840909bb18917a14"
    grant_id: "372efeb1-8f55-4802-8510-8a2575f9fd28"
    issued_at: "2026-09-04T23:55:14.880Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:40e9c02238b45a117f40c19e14a5c88ad2721e46c556a7b2534f2f74d934381a"
    plan_revision: 4
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609042338-M5G987"
  agentplane.scope_extension_request:
    applied_at: "2026-09-05T00:37:41.309Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:4870e39194cead3669646a07bf9d8031105d7c7df65552f4c842edf890bb9fd7"
    kind: "task_scope_extension_request"
    request:
      rationale: "Close authority over the explicitly authorized startup bootstrap, the proven blocked-result metadata writer, and required existing branch-worktree lifecycle regression coverage. Preserve one WorkItem and exclusions."
      repository_effects: []
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
        - "packages/agentplane/src/commands/task/external-agent-blocked-result.ts"
        - "packages/agentplane/src/commands/task/plan.ts"
        - "packages/agentplane/src/commands/task/plan.unit.test.ts"
        - "packages/agentplane/src/commands/task/update.ts"
        - "packages/agentplane/src/commands/task/update.unit.test.ts"
    request_digest: "sha256:e6094c35ab965e5c8abf10b2631a2780bfe4abcb0c3169ba817d1757fa292df6"
    schema_version: 1
    status: "applied"
    transition_id: "tr_21dfc517c24baeaea5d1d93dd2741ced"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-05T00:37:41.309Z"
        approved_by: "USER"
        approved_digest: "sha256:88e57ccb897cdf26c577fa45b26b2d3e22b6a4e6431d84760f53f7d73ae31f4c"
        policy_facts:
          - "state_bound_scope_extension:sha256:e6094c35ab965e5c8abf10b2631a2780bfe4abcb0c3169ba817d1757fa292df6"
        state: "approved"
      created_at: "2026-09-05T00:37:41.309Z"
      digest: "sha256:88e57ccb897cdf26c577fa45b26b2d3e22b6a4e6431d84760f53f7d73ae31f4c"
      proposal:
        assumptions:
          - "ZVX69C remains suspended with its immutable accepted result until this repair is integrated."
          - "Exclude PH5N6S Factory verification ordering and external-agent-implementation-authority.ts, release/version/publication/dependency changes, MPXQBK, provider expansion, and unrelated cleanup. Do not weaken generic revision or stale-result guards. Do not manually edit projections, accepted results, receipts or journals."
          - "Use existing kernel and projection primitives. Restrict recovery to verifiable scope-extension evidence; do not normalize arbitrary divergence."
        planning_baseline:
          captured_at: "2026-09-04T23:38:32.096Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:227eecd0558a70d80f98de0e9a111a6d1f980175ffbbc967a4c5c2d75e417ce3"
          dirty_paths:
            - ".agentplane/tasks/202609042338-M5G987/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "d345cdb14c53a98a85ece41ab472433f8e1fb32c"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609042338-M5G987"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts --maxWorkers=1"
              id: "check-1"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1"
              id: "check-2"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run format:check"
              id: "check-3"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "check-4"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-5"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "node .agentplane/policy/check-routing.mjs"
              id: "check-6"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "node packages/agentplane/bin/agentplane.js task lint"
              id: "check-7"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "node packages/agentplane/bin/agentplane.js doctor"
              id: "check-8"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "check-9"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "check-10"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
          criteria:
            -
              check_ids:
                - "check-1"
                - "check-2"
                - "check-3"
                - "check-4"
                - "check-5"
                - "check-6"
                - "check-7"
                - "check-8"
                - "check-9"
                - "check-10"
              description: "Make supported scope extension persist the canonical lifecycle, revision, execution authority and compatibility projection atomically, including repository-effect-only changes and all-required-WorkItems-completed rework. Recover the already-applied scope-extension inconsistency only from matching immutable blocker/application receipts and implementation identity through the existing command owner. Preserve completed WorkItems and accepted results. Repeated recovery is idempotent. Reject unrelated or genuinely stale revisions, task/branch/base/plan mismatches, missing or altered receipts and unauthorized scope without partial mutation. Reproduce blocker -> scope extension -> accepted implementation -> interruption -> exact replay through existing CLI tests. Integrate this bounded repair, then resume ZVX69C at its original accepted result."
              id: "atomic-scope-recovery"
              required: true
          evidence_fingerprint: "sha256:227eecd0558a70d80f98de0e9a111a6d1f980175ffbbc967a4c5c2d75e417ce3"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-1"
                    - "check-2"
                    - "check-3"
                    - "check-4"
                    - "check-5"
                    - "check-6"
                    - "check-7"
                    - "check-8"
                    - "check-9"
                    - "check-10"
                  description: "Make supported scope extension persist the canonical lifecycle, revision, execution authority and compatibility projection atomically, including repository-effect-only changes and all-required-WorkItems-completed rework. Recover the already-applied scope-extension inconsistency only from matching immutable blocker/application receipts and implementation identity through the existing command owner. Preserve completed WorkItems and accepted results. Repeated recovery is idempotent. Reject unrelated or genuinely stale revisions, task/branch/base/plan mismatches, missing or altered receipts and unauthorized scope without partial mutation. Reproduce blocker -> scope extension -> accepted implementation -> interruption -> exact replay through existing CLI tests. Integrate this bounded repair, then resume ZVX69C at its original accepted result."
                  id: "atomic-scope-recovery"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 128000
                optional_sources: []
                required_sources:
                  - "task-document"
                  - "repository"
                symbol_hints:
                  - "applyApprovedTaskScopeExtension"
                  - "cmdTaskScopeExtend"
                  - "projectTaskCentricCompatibilityMutation"
                  - "applyTaskStatusTransitionCommand"
                  - "resolveRecordedImplementationRecovery"
              depends_on: []
              expected_outputs:
                - "atomic-scope-extension-implementation"
                - "receipt-bound-replay-regression-evidence"
              id: "atomic-scope-extension-recovery"
              objective: "Make supported scope extension persist the canonical lifecycle, revision, execution authority and compatibility projection atomically, including repository-effect-only changes and all-required-WorkItems-completed rework. Recover the already-applied scope-extension inconsistency only from matching immutable blocker/application receipts and implementation identity through the existing command owner. Preserve completed WorkItems and accepted results. Repeated recovery is idempotent. Reject unrelated or genuinely stale revisions, task/branch/base/plan mismatches, missing or altered receipts and unauthorized scope without partial mutation. Reproduce blocker -> scope extension -> accepted implementation -> interruption -> exact replay through existing CLI tests. Integrate this bounded repair, then resume ZVX69C at its original accepted result."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/scope-extend.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/scope-extend.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/set-status.unit.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-blocked-result.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/plan.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/plan.unit.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/update.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/update.unit.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                - "packages/agentplane/src/commands/task/external-agent-blocked-result.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                - "packages/agentplane/src/commands/task/plan.ts"
                - "packages/agentplane/src/commands/task/plan.unit.test.ts"
                - "packages/agentplane/src/commands/task/scope-extend.test.ts"
                - "packages/agentplane/src/commands/task/scope-extend.ts"
                - "packages/agentplane/src/commands/task/set-status.unit.test.ts"
                - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
                - "packages/agentplane/src/commands/task/update.ts"
                - "packages/agentplane/src/commands/task/update.unit.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts --maxWorkers=1"
                    id: "check-1"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1"
                    id: "check-2"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run format:check"
                    id: "check-3"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "check-4"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "check-5"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "node .agentplane/policy/check-routing.mjs"
                    id: "check-6"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "node packages/agentplane/bin/agentplane.js task lint"
                    id: "check-7"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "node packages/agentplane/bin/agentplane.js doctor"
                    id: "check-8"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "check-9"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "check-10"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                criteria:
                  -
                    check_ids:
                      - "check-1"
                      - "check-2"
                      - "check-3"
                      - "check-4"
                      - "check-5"
                      - "check-6"
                      - "check-7"
                      - "check-8"
                      - "check-9"
                      - "check-10"
                    description: "Make supported scope extension persist the canonical lifecycle, revision, execution authority and compatibility projection atomically, including repository-effect-only changes and all-required-WorkItems-completed rework. Recover the already-applied scope-extension inconsistency only from matching immutable blocker/application receipts and implementation identity through the existing command owner. Preserve completed WorkItems and accepted results. Repeated recovery is idempotent. Reject unrelated or genuinely stale revisions, task/branch/base/plan mismatches, missing or altered receipts and unauthorized scope without partial mutation. Reproduce blocker -> scope extension -> accepted implementation -> interruption -> exact replay through existing CLI tests. Integrate this bounded repair, then resume ZVX69C at its original accepted result."
                    id: "atomic-scope-recovery"
                    required: true
                evidence_fingerprint: "sha256:227eecd0558a70d80f98de0e9a111a6d1f980175ffbbc967a4c5c2d75e417ce3"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202609042338-M5G987"
    event_cursor: 4
    final_validation: null
    id: "202609042338-M5G987"
    intent:
      acceptance_criteria: []
      captured_at: "2026-09-04T23:38:20.713Z"
      constraints: []
      request: |-
        Repair atomic scope extension projection and accepted-result recovery

        Blocking dependency of 202609041801-ZVX69C / PR 5897 after integrated XR979S. A supported task scope extend on pre-merge DONE rework with all required WorkItems completed persisted legacy DOING revision 37 but retained canonical BLOCKED revision 35. The next accepted EXECUTOR result was committed as 682089ad3 and remains result_received; task set-status refuses expected 38 observed 35. Repair scope extension at its canonical persistence owner so lifecycle, revision, plan authority and projections advance atomically. Provide narrow idempotent recovery for the already-applied scope-extension receipt and accepted implementation, without replacing results, weakening mismatch checks, fabricating product diffs, or manually editing task state. Reproduce the complete blocker, scope extension, implementation result and retry sequence; preserve unrelated and truly stale rejection. Return to ZVX69C after integration. Exclude Factory clean-check ordering/worktree recovery owned by PH5N6S, releases, versions, publication, dependencies and MPXQBK.
      task_id: "202609042338-M5G987"
    lifecycle: "BLOCKED"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-04T23:55:14.880Z"
          approved_by: "USER"
          approved_digest: "sha256:7f2dc1df72bcd0e3d9d46cde93b8be99c8a4cc3a6f6ba1aa06f96d6a3c6e2c64"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-09-04T23:43:18.676Z"
        digest: "sha256:7f2dc1df72bcd0e3d9d46cde93b8be99c8a4cc3a6f6ba1aa06f96d6a3c6e2c64"
        proposal:
          assumptions:
            - "ZVX69C remains suspended with its immutable accepted result until this repair is integrated."
            - "Exclude PH5N6S Factory verification ordering and external-agent-implementation-authority.ts, release/version/publication/dependency changes, MPXQBK, provider expansion, and unrelated cleanup. Do not weaken generic revision or stale-result guards. Do not manually edit projections, accepted results, receipts or journals."
            - "Use existing kernel and projection primitives. Restrict recovery to verifiable scope-extension evidence; do not normalize arbitrary divergence."
          planning_baseline:
            captured_at: "2026-09-04T23:38:32.096Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:227eecd0558a70d80f98de0e9a111a6d1f980175ffbbc967a4c5c2d75e417ce3"
            dirty_paths:
              - ".agentplane/tasks/202609042338-M5G987/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "d345cdb14c53a98a85ece41ab472433f8e1fb32c"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609042338-M5G987"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts --maxWorkers=1"
                id: "check-1"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1"
                id: "check-2"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run format:check"
                id: "check-3"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run lint:core"
                id: "check-4"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "check-5"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "check-6"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "node packages/agentplane/bin/agentplane.js task lint"
                id: "check-7"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "node packages/agentplane/bin/agentplane.js doctor"
                id: "check-8"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "check-9"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "check-10"
                kind: "deterministic"
                required: true
                timeout_ms: 1800000
            criteria:
              -
                check_ids:
                  - "check-1"
                  - "check-2"
                  - "check-3"
                  - "check-4"
                  - "check-5"
                  - "check-6"
                  - "check-7"
                  - "check-8"
                  - "check-9"
                  - "check-10"
                description: "Make supported scope extension persist the canonical lifecycle, revision, execution authority and compatibility projection atomically, including repository-effect-only changes and all-required-WorkItems-completed rework. Recover the already-applied scope-extension inconsistency only from matching immutable blocker/application receipts and implementation identity through the existing command owner. Preserve completed WorkItems and accepted results. Repeated recovery is idempotent. Reject unrelated or genuinely stale revisions, task/branch/base/plan mismatches, missing or altered receipts and unauthorized scope without partial mutation. Reproduce blocker -> scope extension -> accepted implementation -> interruption -> exact replay through existing CLI tests. Integrate this bounded repair, then resume ZVX69C at its original accepted result."
                id: "atomic-scope-recovery"
                required: true
            evidence_fingerprint: "sha256:227eecd0558a70d80f98de0e9a111a6d1f980175ffbbc967a4c5c2d75e417ce3"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "check-1"
                      - "check-2"
                      - "check-3"
                      - "check-4"
                      - "check-5"
                      - "check-6"
                      - "check-7"
                      - "check-8"
                      - "check-9"
                      - "check-10"
                    description: "Make supported scope extension persist the canonical lifecycle, revision, execution authority and compatibility projection atomically, including repository-effect-only changes and all-required-WorkItems-completed rework. Recover the already-applied scope-extension inconsistency only from matching immutable blocker/application receipts and implementation identity through the existing command owner. Preserve completed WorkItems and accepted results. Repeated recovery is idempotent. Reject unrelated or genuinely stale revisions, task/branch/base/plan mismatches, missing or altered receipts and unauthorized scope without partial mutation. Reproduce blocker -> scope extension -> accepted implementation -> interruption -> exact replay through existing CLI tests. Integrate this bounded repair, then resume ZVX69C at its original accepted result."
                    id: "atomic-scope-recovery"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 128000
                  optional_sources: []
                  required_sources:
                    - "task-document"
                    - "repository"
                  symbol_hints:
                    - "applyApprovedTaskScopeExtension"
                    - "cmdTaskScopeExtend"
                    - "projectTaskCentricCompatibilityMutation"
                    - "applyTaskStatusTransitionCommand"
                    - "resolveRecordedImplementationRecovery"
                depends_on: []
                expected_outputs:
                  - "atomic-scope-extension-implementation"
                  - "receipt-bound-replay-regression-evidence"
                id: "atomic-scope-extension-recovery"
                objective: "Make supported scope extension persist the canonical lifecycle, revision, execution authority and compatibility projection atomically, including repository-effect-only changes and all-required-WorkItems-completed rework. Recover the already-applied scope-extension inconsistency only from matching immutable blocker/application receipts and implementation identity through the existing command owner. Preserve completed WorkItems and accepted results. Repeated recovery is idempotent. Reject unrelated or genuinely stale revisions, task/branch/base/plan mismatches, missing or altered receipts and unauthorized scope without partial mutation. Reproduce blocker -> scope extension -> accepted implementation -> interruption -> exact replay through existing CLI tests. Integrate this bounded repair, then resume ZVX69C at its original accepted result."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/scope-extend.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/scope-extend.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/set-status.unit.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                  - "packages/agentplane/src/commands/task/scope-extend.ts"
                  - "packages/agentplane/src/commands/task/scope-extend.test.ts"
                  - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
                  - "packages/agentplane/src/commands/task/set-status.unit.test.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts --maxWorkers=1"
                      id: "check-1"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1"
                      id: "check-2"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run format:check"
                      id: "check-3"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run lint:core"
                      id: "check-4"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "check-5"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "check-6"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "node packages/agentplane/bin/agentplane.js task lint"
                      id: "check-7"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "node packages/agentplane/bin/agentplane.js doctor"
                      id: "check-8"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "check-9"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "check-10"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1800000
                  criteria:
                    -
                      check_ids:
                        - "check-1"
                        - "check-2"
                        - "check-3"
                        - "check-4"
                        - "check-5"
                        - "check-6"
                        - "check-7"
                        - "check-8"
                        - "check-9"
                        - "check-10"
                      description: "Make supported scope extension persist the canonical lifecycle, revision, execution authority and compatibility projection atomically, including repository-effect-only changes and all-required-WorkItems-completed rework. Recover the already-applied scope-extension inconsistency only from matching immutable blocker/application receipts and implementation identity through the existing command owner. Preserve completed WorkItems and accepted results. Repeated recovery is idempotent. Reject unrelated or genuinely stale revisions, task/branch/base/plan mismatches, missing or altered receipts and unauthorized scope without partial mutation. Reproduce blocker -> scope extension -> accepted implementation -> interruption -> exact replay through existing CLI tests. Integrate this bounded repair, then resume ZVX69C at its original accepted result."
                      id: "atomic-scope-recovery"
                      required: true
                  evidence_fingerprint: "sha256:227eecd0558a70d80f98de0e9a111a6d1f980175ffbbc967a4c5c2d75e417ce3"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609042338-M5G987"
    revision: 8
    schema_version: 1
    updated_at: "2026-09-05T00:37:41.309Z"
    work_items:
      atomic-scope-extension-recovery:
        attempt: 0
        claim_id: null
        id: "atomic-scope-extension-recovery"
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
      compatibility:sha256:05815788cdd17ada4fd4acf8b80dbf5f9eb3598521f3848a678d35f32036634e:
        aggregate_digest: "sha256:2211b8fb6e45cbbdd9ad0df9fcb863cc0f975a1d47b9222cb6b6aafeb394f5f4"
        event:
          actor_id: "agentplane"
          at: "2026-09-05T00:37:34.323Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_fecf2a64dccb005d105190b5"
          mutation_id: "compatibility:sha256:05815788cdd17ada4fd4acf8b80dbf5f9eb3598521f3848a678d35f32036634e"
          plan_digest: "sha256:7f2dc1df72bcd0e3d9d46cde93b8be99c8a4cc3a6f6ba1aa06f96d6a3c6e2c64"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042338-M5G987"
          task_revision: 6
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:05815788cdd17ada4fd4acf8b80dbf5f9eb3598521f3848a678d35f32036634e"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609042338-M5G987"
      compatibility:sha256:388c140cbee4bf03873e43e44b389874463ca228f1bc8cbaa9f4dd3fff6a68cc:
        aggregate_digest: "sha256:f07444377b6afff2b173591c6a7c8d5b0eaea6c7189cfa520b7821797b9e07f4"
        event:
          actor_id: "agentplane"
          at: "2026-09-05T00:35:18.330Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_7082d26873da72b66d8a1ffa"
          mutation_id: "compatibility:sha256:388c140cbee4bf03873e43e44b389874463ca228f1bc8cbaa9f4dd3fff6a68cc"
          plan_digest: "sha256:7f2dc1df72bcd0e3d9d46cde93b8be99c8a4cc3a6f6ba1aa06f96d6a3c6e2c64"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042338-M5G987"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:388c140cbee4bf03873e43e44b389874463ca228f1bc8cbaa9f4dd3fff6a68cc"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609042338-M5G987"
      compatibility:sha256:876de88bdd5c268acbd49e7e3e522473c30b067b21f0eea17806c2c880163557:
        aggregate_digest: "sha256:7136f250a7683f0c3b9caa293eeeec64dc6493655b1abffd1e7ea17fd053f6a9"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T23:43:32.145Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_2f9ac674b4b1f2ce4d63fd28"
          mutation_id: "compatibility:sha256:876de88bdd5c268acbd49e7e3e522473c30b067b21f0eea17806c2c880163557"
          plan_digest: "sha256:7f2dc1df72bcd0e3d9d46cde93b8be99c8a4cc3a6f6ba1aa06f96d6a3c6e2c64"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042338-M5G987"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:876de88bdd5c268acbd49e7e3e522473c30b067b21f0eea17806c2c880163557"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609042338-M5G987"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "d345cdb14c53a98a85ece41ab472433f8e1fb32c"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "d345cdb14c53a98a85ece41ab472433f8e1fb32c"
    version: 1
id_source: "generated"
---
## Summary

Repair atomic scope extension projection and accepted-result recovery

Blocking dependency of 202609041801-ZVX69C / PR 5897 after integrated XR979S. A supported task scope extend on pre-merge DONE rework with all required WorkItems completed persisted legacy DOING revision 37 but retained canonical BLOCKED revision 35. The next accepted EXECUTOR result was committed as 682089ad3 and remains result_received; task set-status refuses expected 38 observed 35. Repair scope extension at its canonical persistence owner so lifecycle, revision, plan authority and projections advance atomically. Provide narrow idempotent recovery for the already-applied scope-extension receipt and accepted implementation, without replacing results, weakening mismatch checks, fabricating product diffs, or manually editing task state. Reproduce the complete blocker, scope extension, implementation result and retry sequence; preserve unrelated and truly stale rejection. Return to ZVX69C after integration. Exclude Factory clean-check ordering/worktree recovery owned by PH5N6S, releases, versions, publication, dependencies and MPXQBK.

## Scope

- In scope: Blocking dependency of 202609041801-ZVX69C / PR 5897 after integrated XR979S. A supported task scope extend on pre-merge DONE rework with all required WorkItems completed persisted legacy DOING revision 37 but retained canonical BLOCKED revision 35. The next accepted EXECUTOR result was committed as 682089ad3 and remains result_received; task set-status refuses expected 38 observed 35. Repair scope extension at its canonical persistence owner so lifecycle, revision, plan authority and projections advance atomically. Provide narrow idempotent recovery for the already-applied scope-extension receipt and accepted implementation, without replacing results, weakening mismatch checks, fabricating product diffs, or manually editing task state. Reproduce the complete blocker, scope extension, implementation result and retry sequence; preserve unrelated and truly stale rejection. Return to ZVX69C after integration. Exclude Factory clean-check ordering/worktree recovery owned by PH5N6S, releases, versions, publication, dependencies and MPXQBK.
- Out of scope: unrelated refactors not required for "Repair atomic scope extension projection and accepted-result recovery".

## Plan

Make supported scope extension persist the canonical lifecycle, revision, execution authority and compatibility projection atomically, including repository-effect-only changes and all-required-WorkItems-completed rework. Recover the already-applied scope-extension inconsistency only from matching immutable blocker/application receipts and implementation identity through the existing command owner. Preserve completed WorkItems and accepted results. Repeated recovery is idempotent. Reject unrelated or genuinely stale revisions, task/branch/base/plan mismatches, missing or altered receipts and unauthorized scope without partial mutation. Reproduce blocker -> scope extension -> accepted implementation -> interruption -> exact replay through existing CLI tests. Integrate this bounded repair, then resume ZVX69C at its original accepted result.

Exclude PH5N6S Factory verification ordering and external-agent-implementation-authority.ts, release/version/publication/dependency changes, MPXQBK, provider expansion, and unrelated cleanup. Do not weaken generic revision or stale-result guards. Do not manually edit projections, accepted results, receipts or journals.

Verify Steps:
1. Run `bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts --maxWorkers=1`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
2. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
3. Run `bun run format:check`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
4. Run `bun run lint:core`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
5. Run `bun run typecheck`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
6. Run `node .agentplane/policy/check-routing.mjs`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
7. Run `node packages/agentplane/bin/agentplane.js task lint`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
8. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
9. Run `git diff --check`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
10. Run `bun run ci:local:full`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.

## Verify Steps

1. Run `bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts --maxWorkers=1`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
2. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
3. Run `bun run format:check`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
4. Run `bun run lint:core`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
5. Run `bun run typecheck`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
6. Run `node .agentplane/policy/check-routing.mjs`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
7. Run `node packages/agentplane/bin/agentplane.js task lint`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
8. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
9. Run `git diff --check`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.
10. Run `bun run ci:local:full`. Expected: successful exit; regression checks preserve atomicity and stale rejection; doctor reports errors=0.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
