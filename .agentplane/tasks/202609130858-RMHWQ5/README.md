---
id: "202609130858-RMHWQ5"
title: "Add an explicit USER-approved supervisor budget epoch for unknown token telemetry"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 17
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
    - "agent_preferred_branch_pr"
    - "effect_schema"
    - "effect_security_boundary"
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
      - "schema"
      - "security_boundary"
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
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/runner/supervisor-execution-episode.ts"
      - "packages/core/src/schemas/index.ts"
      - "scripts/lib/test-route-registry.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Migrated approved WorkItem scope for a legacy rootless execution contract."
      - "USER-approved blocked-result scope extension: repository_effects=schema,tests"
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/runner/supervisor-execution-episode.ts"
      - "packages/core/src/schemas/index.ts"
      - "scripts/lib/test-route-registry.mjs"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
      - "packages/core"
      - "scripts"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
      - "packages/agentplane/src/cli/run-cli/command-catalog.ts"
      - "packages/agentplane/src/cli/run-cli/command-catalog/task-supervisor.ts"
      - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.test.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
      - "packages/agentplane/src/commands/task/scope-extend-legacy-compat.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.ts"
      - "packages/agentplane/src/commands/task/supervisor-budget-epoch.command.ts"
      - "packages/core/src/runner/supervisor-execution-episode.ts"
      - "packages/core/src/schemas/index.ts"
      - "scripts/lib/test-route-registry.mjs"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_schema"
    - "effect_security_boundary"
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
          - "packages/core/src/runner/supervisor-execution-episode.ts"
          - "packages/core/src/schemas/index.ts"
          - "scripts/lib/test-route-registry.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:1afc189b495def1c1563dcff8b45ac3a57b55725ca36893ef3397f5037d6fea9"
      escalation_reasons:
        - "central_component:packages/core/src/runner/supervisor-execution-episode.ts"
        - "central_component:packages/core/src/schemas/index.ts"
        - "central_component:scripts/lib/test-route-registry.mjs"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-catalog.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-catalog/task-supervisor.ts"
        - "central_path:packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
        - "central_path:packages/core/src/runner/supervisor-execution-episode.ts"
        - "central_path:packages/core/src/schemas/index.ts"
        - "central_path:scripts/lib/test-route-registry.mjs"
        - "effect_schema"
        - "effect_security_boundary"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
          - "packages/core"
          - "scripts"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
          - "packages/agentplane/src/cli/run-cli/command-catalog.ts"
          - "packages/agentplane/src/cli/run-cli/command-catalog/task-supervisor.ts"
          - "packages/agentplane/src/cli/run-cli/command-loaders/task.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.test.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-default-budget.test.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
          - "packages/agentplane/src/commands/task/scope-extend-legacy-compat.test.ts"
          - "packages/agentplane/src/commands/task/scope-extend.ts"
          - "packages/agentplane/src/commands/task/supervisor-budget-epoch.command.ts"
          - "packages/core/src/runner/supervisor-execution-episode.ts"
          - "packages/core/src/schemas/index.ts"
          - "scripts/lib/test-route-registry.mjs"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "schema"
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
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "ee342a5ddee6ab220c45d270e09921a5abbd2614"
  message: "🚧 RMHWQ5 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: d14eb0228be0. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The preserved implementation and its regression coverage require the execution contract to authorize schema and test effects before recovery can continue. Recommended action: Approve the exact schema and tests repository effects, then recover the preserved implementation and rerun verification. Requested scope: roots=unchanged; repository effects=schema,tests; request digest=sha256:389372f45f1c39e726832ce3c0b5c4f74b2711a235e238540e9e0817d4c44fda. Agentplane receipt: external-agent-blocker/tr_95c1827821194781dba4c05955addab8/sha256:9ae18c14dab95db76420c60e73b615b90119723fc2a3b35c57320ccf9ad50138/sha256:389372f45f1c39e726832ce3c0b5c4f74b2711a235e238540e9e0817d4c44fda."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: ; repository effects: schema, tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: acdefe5e2777. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: ee342a5ddee6. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-13T09:03:04.009Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-13T09:55:20.827Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: d14eb0228be0. CLI accepted one state-bound external-agent semantic result."
    commit: "d14eb0228be0d507fe296883a8eef2b7d4447de8"
  -
    type: "status"
    at: "2026-09-13T10:08:18.536Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The preserved implementation and its regression coverage require the execution contract to authorize schema and test effects before recovery can continue. Recommended action: Approve the exact schema and tests repository effects, then recover the preserved implementation and rerun verification. Requested scope: roots=unchanged; repository effects=schema,tests; request digest=sha256:389372f45f1c39e726832ce3c0b5c4f74b2711a235e238540e9e0817d4c44fda. Agentplane receipt: external-agent-blocker/tr_95c1827821194781dba4c05955addab8/sha256:9ae18c14dab95db76420c60e73b615b90119723fc2a3b35c57320ccf9ad50138/sha256:389372f45f1c39e726832ce3c0b5c4f74b2711a235e238540e9e0817d4c44fda."
  -
    type: "status"
    at: "2026-09-13T10:41:26.463Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: acdefe5e2777. CLI accepted one state-bound external-agent semantic result."
    commit: "acdefe5e2777725e94470b2842688e1c8f825cf0"
  -
    type: "status"
    at: "2026-09-13T10:47:29.308Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: ee342a5ddee6. CLI accepted one state-bound external-agent semantic result."
    commit: "ee342a5ddee6ab220c45d270e09921a5abbd2614"
doc_version: 3
doc_updated_at: "2026-09-13T10:47:29.308Z"
doc_updated_by: "SUPERVISOR"
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
  agentplane.scope_extension_request:
    applied_at: "2026-09-13T10:15:05.865Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:9ae18c14dab95db76420c60e73b615b90119723fc2a3b35c57320ccf9ad50138"
    kind: "task_scope_extension_request"
    request:
      rationale: "The approved budget-epoch repair changes its durable schema and adds focused regression coverage."
      repository_effects:
        - "schema"
        - "tests"
      schema_version: 1
      scope_roots: []
    request_digest: "sha256:389372f45f1c39e726832ce3c0b5c4f74b2711a235e238540e9e0817d4c44fda"
    schema_version: 1
    status: "applied"
    transition_id: "tr_95c1827821194781dba4c05955addab8"
    work_item_id: "budget-epoch-repair"
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
    event_cursor: 14
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
    revision: 17
    schema_version: 1
    updated_at: "2026-09-13T10:47:29.308Z"
    work_items:
      budget-epoch-repair:
        attempt: 1
        claim_id: null
        id: "budget-epoch-repair"
        last_failure:
          cause_refs:
            - "c-authorized-epoch"
            - "c-preserve-unknown"
            - "c-fail-closed"
            - "c-release-safe"
          code: "validation_failed"
          kind: "validation"
          message: "Implemented durable USER-authorized supervisor token budget epochs, including an explicit token-limit disable mode for transports without attributable telemetry, and repaired the legacy scope-extension recovery path required to complete this task."
          retryable: true
        output_manifests:
          -
            digest: "sha256:fdf0cf13c282828b6f7d642970c188d5856ae0beafb0f19a6b9051c772ab068e"
            id: "Durable budget epoch state that preserves lifetime unknown usage"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609130858-RMHWQ5"
              work_item_id: "budget-epoch-repair"
            provenance:
              - "sha256:0e2cbdbf92568408e95716cf7b9d4e26524550b4c3a3e9305d587077ef4b3ea5"
              - ".agentplane/tasks/202609130858-RMHWQ5/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:d6c46297dcb41de6c8203f2fb43fd0ff585ceb0b90e63947fa141ac54a170f1f"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:acdf60d2ff6c80b7b4d67e0b25a1b02b360bfa3dd0b65b5f047f379767f5b9a7"
            id: "State-bound USER-only operator authorization path"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609130858-RMHWQ5"
              work_item_id: "budget-epoch-repair"
            provenance:
              - "sha256:0e2cbdbf92568408e95716cf7b9d4e26524550b4c3a3e9305d587077ef4b3ea5"
              - ".agentplane/tasks/202609130858-RMHWQ5/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:d6c46297dcb41de6c8203f2fb43fd0ff585ceb0b90e63947fa141ac54a170f1f"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:996ea2c07c0a1d9906fddb5c52859b55fd3446ed3e0a4b4634671f60277f3dc7"
            id: "Focused core and CLI regression coverage"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609130858-RMHWQ5"
              work_item_id: "budget-epoch-repair"
            provenance:
              - "sha256:0e2cbdbf92568408e95716cf7b9d4e26524550b4c3a3e9305d587077ef4b3ea5"
              - ".agentplane/tasks/202609130858-RMHWQ5/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:d6c46297dcb41de6c8203f2fb43fd0ff585ceb0b90e63947fa141ac54a170f1f"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "REWORK_READY"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609130858-RMHWQ5/supervision/declared-checks.json"
              check_id: "focused-core"
              command_identity: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.test.ts"
              detail: "Declared check failed: bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
              exit_code: 0
              observed_at: "2026-09-13T10:41:30.372Z"
              repository_snapshot_digest: "sha256:d6c46297dcb41de6c8203f2fb43fd0ff585ceb0b90e63947fa141ac54a170f1f"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609130858-RMHWQ5/supervision/declared-checks.json"
              check_id: "focused-cli"
              command_identity: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
              detail: "Declared check failed: bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
              exit_code: 1
              observed_at: "2026-09-13T10:41:30.372Z"
              repository_snapshot_digest: "sha256:d6c46297dcb41de6c8203f2fb43fd0ff585ceb0b90e63947fa141ac54a170f1f"
              status: "failed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609130858-RMHWQ5/supervision/declared-checks.json"
              check_id: "typecheck"
              command_identity: "bun run typecheck"
              detail: "Declared validation command bun run typecheck was not observed by AgentPlane."
              exit_code: null
              observed_at: "2026-09-13T10:41:30.372Z"
              repository_snapshot_digest: "sha256:d6c46297dcb41de6c8203f2fb43fd0ff585ceb0b90e63947fa141ac54a170f1f"
              status: "unsupported"
            -
              artifact_refs:
                - ".agentplane/tasks/202609130858-RMHWQ5/supervision/declared-checks.json"
              check_id: "critical"
              command_identity: "bun run test:critical"
              detail: "Declared validation command bun run test:critical was not observed by AgentPlane."
              exit_code: null
              observed_at: "2026-09-13T10:41:30.372Z"
              repository_snapshot_digest: "sha256:d6c46297dcb41de6c8203f2fb43fd0ff585ceb0b90e63947fa141ac54a170f1f"
              status: "unsupported"
            -
              artifact_refs:
                - ".agentplane/tasks/202609130858-RMHWQ5/supervision/declared-checks.json"
              check_id: "full-ci"
              command_identity: "bun run ci:local:full"
              detail: "Declared validation command bun run ci:local:full was not observed by AgentPlane."
              exit_code: null
              observed_at: "2026-09-13T10:41:30.372Z"
              repository_snapshot_digest: "sha256:d6c46297dcb41de6c8203f2fb43fd0ff585ceb0b90e63947fa141ac54a170f1f"
              status: "unsupported"
          schema_version: 1
          stale_evidence: []
          status: "blocked"
          unsatisfied_criteria:
            - "c-authorized-epoch"
            - "c-preserve-unknown"
            - "c-fail-closed"
            - "c-release-safe"
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-13T10:41:30.378Z"
        from: "READY"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:508e8b57cc11161aa5ffd03d1bfdf3c3a03d32d04ec0a56a80e03c4b244623a0"
        entity: "work_item"
        id: "event_eb8bdbf7579f5dd6295a7bb5"
        mutation_id: "external-result:work-order-202609130858-RMHWQ5-executor-f76ce492284cb11a93eaf99f"
        plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
        task_revision: 14
        work_item_id: "budget-epoch-repair"
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
      compatibility:sha256:38c1caf69b85fe9747733842340e65ae9b48bc4804600429142358adba5b3105:
        aggregate_digest: "sha256:a0d6c651d897a4a830c857f34d3a035fd7acbdd3a5d38f2fe359a5f1a30a41de"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T10:08:18.536Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_8a4aabfbc0fbfd05fbf26b28"
          mutation_id: "compatibility:sha256:38c1caf69b85fe9747733842340e65ae9b48bc4804600429142358adba5b3105"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:38c1caf69b85fe9747733842340e65ae9b48bc4804600429142358adba5b3105"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
      compatibility:sha256:3afd89dca4c879e1df97feaf06072a26bb1b9a497eeae7b7664f9ef8e7f7f373:
        aggregate_digest: "sha256:6b8c7c72a2513417bdd36817a4fb3ac67820e7e220c8635e8befd0fc683dd898"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T10:47:29.308Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4bc1637680b3e879b7aa8782"
          mutation_id: "compatibility:sha256:3afd89dca4c879e1df97feaf06072a26bb1b9a497eeae7b7664f9ef8e7f7f373"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 16
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3afd89dca4c879e1df97feaf06072a26bb1b9a497eeae7b7664f9ef8e7f7f373"
        next_revision: 17
        previous_revision: 16
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
      compatibility:sha256:49d7c9d9288ec67890dd94a22aca7a476ec6e2707fe568d8987f933cd6e052d8:
        aggregate_digest: "sha256:eb8628e01281e2f0adb8be5cad55d023f0cd2cd00de7924ecfe5abe2ff92ed0a"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T09:55:20.827Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c1915fd30ef59249d0f12ac3"
          mutation_id: "compatibility:sha256:49d7c9d9288ec67890dd94a22aca7a476ec6e2707fe568d8987f933cd6e052d8"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:49d7c9d9288ec67890dd94a22aca7a476ec6e2707fe568d8987f933cd6e052d8"
        next_revision: 8
        previous_revision: 7
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
      compatibility:sha256:608fa09e08d013a9539f1c372fddb1eaafedcd7d466a31855a1069f1c7f6375d:
        aggregate_digest: "sha256:cca75214e28e81c35fef901194d791908863aaa84caf8fae957f79c4ffd2bceb"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T09:55:20.827Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_be0a8dcb719d3829490f303a"
          mutation_id: "compatibility:sha256:608fa09e08d013a9539f1c372fddb1eaafedcd7d466a31855a1069f1c7f6375d"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:608fa09e08d013a9539f1c372fddb1eaafedcd7d466a31855a1069f1c7f6375d"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
      compatibility:sha256:70c8f9fe41ce0e4d969aacf07784d5cb9138a1b37fd12b313cdadbc3e947118d:
        aggregate_digest: "sha256:e0c7c9770a4d998097348a67765a106453d6c1a0de145ce3dafafa7e6c97677b"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T10:41:26.463Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_bd0d9976087703c088b71df8"
          mutation_id: "compatibility:sha256:70c8f9fe41ce0e4d969aacf07784d5cb9138a1b37fd12b313cdadbc3e947118d"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 13
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:70c8f9fe41ce0e4d969aacf07784d5cb9138a1b37fd12b313cdadbc3e947118d"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
      compatibility:sha256:72573ae801bd822e9ec21ceffc597fa52607636a9dc802d61d9e5d3c3766d2ee:
        aggregate_digest: "sha256:244796d1847f626a80270c89d6de33bb356a0a2770e224149aadc6881123b17d"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T10:08:18.536Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_cb84c05e2dcb7664542c23c8"
          mutation_id: "compatibility:sha256:72573ae801bd822e9ec21ceffc597fa52607636a9dc802d61d9e5d3c3766d2ee"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 10
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:72573ae801bd822e9ec21ceffc597fa52607636a9dc802d61d9e5d3c3766d2ee"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
      compatibility:sha256:747bd6d15fddf308acd74c05b0d78fdc60b08d85e314bda6ce93355a63e3ea76:
        aggregate_digest: "sha256:24ee8badd785fce4771e66e08ee5caea5383bf861f7ceb88fb554071627320d5"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T10:47:29.308Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4a17e162e00d7fde87d1ec2c"
          mutation_id: "compatibility:sha256:747bd6d15fddf308acd74c05b0d78fdc60b08d85e314bda6ce93355a63e3ea76"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 15
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:747bd6d15fddf308acd74c05b0d78fdc60b08d85e314bda6ce93355a63e3ea76"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
      compatibility:sha256:9140dafec235afa6872e8faa8ceeaeac326383ea86a09fdee99a3095dac3cfd3:
        aggregate_digest: "sha256:6dfaecd9dd0cc85bf17c7515bac05d1a4103ce956556c710404e6dbc48b5feb8"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T10:08:18.536Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_1e582e70097621a4ac14342e"
          mutation_id: "compatibility:sha256:9140dafec235afa6872e8faa8ceeaeac326383ea86a09fdee99a3095dac3cfd3"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 9
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:9140dafec235afa6872e8faa8ceeaeac326383ea86a09fdee99a3095dac3cfd3"
        next_revision: 10
        previous_revision: 9
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
      compatibility:sha256:df27a90fa9d5ca0ede6b9192ab51667faf57cfdebaed1fe5d92977f382af54de:
        aggregate_digest: "sha256:aecb02841437c32ea9a52760f12eb732ce8925f33fa5223d689714496cd2948a"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T10:41:26.463Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_580b3350c43eb99204252094"
          mutation_id: "compatibility:sha256:df27a90fa9d5ca0ede6b9192ab51667faf57cfdebaed1fe5d92977f382af54de"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:df27a90fa9d5ca0ede6b9192ab51667faf57cfdebaed1fe5d92977f382af54de"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
      external-result:work-order-202609130858-RMHWQ5-executor-f76ce492284cb11a93eaf99f:
        aggregate_digest: "sha256:2b3394817d5c31d51bebd12ffc8b47ef0d2d91ae1ffd640abbc966285f446240"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T10:41:30.378Z"
          cause_refs:
            - "semantic-result:sha256:508e8b57cc11161aa5ffd03d1bfdf3c3a03d32d04ec0a56a80e03c4b244623a0"
          entity: "work_item"
          from: "READY"
          id: "event_eb8bdbf7579f5dd6295a7bb5"
          mutation_id: "external-result:work-order-202609130858-RMHWQ5-executor-f76ce492284cb11a93eaf99f"
          plan_digest: "sha256:3b2ab083f74f5f1d1ff6d3c474e99753a1139bdcb65f1105aa2d8b8c816083b8"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609130858-RMHWQ5"
          task_revision: 14
          to: "REWORK_READY"
          work_item_id: "budget-epoch-repair"
        mutation_id: "external-result:work-order-202609130858-RMHWQ5-executor-f76ce492284cb11a93eaf99f"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609130858-RMHWQ5"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "ee342a5ddee6ab220c45d270e09921a5abbd2614"
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
