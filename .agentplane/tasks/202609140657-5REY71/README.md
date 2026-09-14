---
id: "202609140657-5REY71"
title: "Add supervisor-owned base synchronization before semantic work on stale branch_pr candidates"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "process-mechanism-repair"
  - "supervisor-lifecycle"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:unit -- packages/agentplane/src/commands/task"
plan_approval:
  state: "approved"
  updated_at: "2026-09-14T07:01:21.064Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:e09aba7b31d998b26302c69d89a1af8b673aeec0904bda7ffaa007044629802b"
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
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "public_api"
      - "release_metadata"
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
      - "schema"
      - "dependencies"
      - "ci"
      - "security_boundary"
    writable_roots:
      - ".agentplane/tasks/202609140657-5REY71"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/branch"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Task artifacts provide mutation traceability."
      - "The synchronization operation creates Git history and therefore requires exact identity checks, recovery-safe failure handling, and regression coverage."
      - "The workflow route and supervisor operation contract are implementation code and observable CLI behavior."
    repository_effects:
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - ".agentplane/tasks/202609140657-5REY71"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/branch"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_release_metadata"
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
          - ".agentplane/tasks/202609140657-5REY71"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/branch"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:040ac1de64129344db27b6c2141db97030fd8dcf539af1f888502a4aa00786f5"
      escalation_reasons:
        - "effect_public_api"
        - "effect_release_metadata"
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
      - "hosted_integration"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
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
    at: "2026-09-14T07:01:27.069Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-14T07:01:27.069Z"
doc_updated_by: "CODER"
description: "Implement a deterministic AgentPlane lifecycle route for an already-started branch_pr task whose approved WorkItem requires its preserved candidate branch to adopt an exact newer qualified base before semantic edits. The supervisor must own the Git or provider synchronization, bind it to exact branch/head/base identities, preserve existing candidate commits and unrelated work, fail closed on conflict or stale identity, and issue the next semantic packet only after verified base ancestry. An external semantic executor must never be asked to rebase, merge, cherry-pick, commit, force-push, or rewrite Git history. Cover the release-task failure demonstrated by task 202609121424-49XXT3, then integrate the fix through protected branch_pr workflow so that release 0.7.9 can resume."
sections:
  Summary: |-
    Add supervisor-owned base synchronization before semantic work on stale branch_pr candidates

    Implement a deterministic AgentPlane lifecycle route for an already-started branch_pr task whose approved WorkItem requires its preserved candidate branch to adopt an exact newer qualified base before semantic edits. The supervisor must own the Git or provider synchronization, bind it to exact branch/head/base identities, preserve existing candidate commits and unrelated work, fail closed on conflict or stale identity, and issue the next semantic packet only after verified base ancestry. An external semantic executor must never be asked to rebase, merge, cherry-pick, commit, force-push, or rewrite Git history. Cover the release-task failure demonstrated by task 202609121424-49XXT3, then integrate the fix through protected branch_pr workflow so that release 0.7.9 can resume.
  Scope: |-
    - In scope: Implement a deterministic AgentPlane lifecycle route for an already-started branch_pr task whose approved WorkItem requires its preserved candidate branch to adopt an exact newer qualified base before semantic edits. The supervisor must own the Git or provider synchronization, bind it to exact branch/head/base identities, preserve existing candidate commits and unrelated work, fail closed on conflict or stale identity, and issue the next semantic packet only after verified base ancestry. An external semantic executor must never be asked to rebase, merge, cherry-pick, commit, force-push, or rewrite Git history. Cover the release-task failure demonstrated by task 202609121424-49XXT3, then integrate the fix through protected branch_pr workflow so that release 0.7.9 can resume.
    - Out of scope: unrelated refactors not required for "Add supervisor-owned base synchronization before semantic work on stale branch_pr candidates".
  Plan: "Add one exact-identity branch base synchronization lifecycle operation before incomplete branch_pr work reaches a semantic executor."
  Verify Steps: |-
    1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/workflow-step-projections-routing.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000. Expected: stale-base routing emits the lifecycle operation before semantic work and existing routes remain stable.
    2. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000. Expected: exact-identity synchronization, fail-closed boundaries, receipts, and convergence pass.
    3. Run bun run typecheck. Expected: TypeScript build passes.
    4. Run bun run lint:core. Expected: core lint passes.
    5. Run bun run ci:local:full. Expected: the complete local gate passes.
    6. Review git diff --check, the exact task diff, and git status --short --untracked-files=all. Expected: only approved lifecycle code, tests, and task artifacts changed; unrelated base work and agentplane-roadmap-r2 are absent.
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
    approval_evidence_digest: "sha256:e09aba7b31d998b26302c69d89a1af8b673aeec0904bda7ffaa007044629802b"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:096cec9ebf8edb749eb650ec9f1689af09f0a7b7c5dc99297ed7e6ffcc4fd75a"
    digest: "sha256:2f4837f409733b2951467bde0634b29103744110a9caa72745d49286f398093b"
    grant_id: "f112c5a7-4eb6-4a31-aa85-41f2e76c51c3"
    issued_at: "2026-09-14T07:01:21.064Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:7d7bfeaf24f84924f7ee0daae32ca06821d606f4fd3f5e09b5705c49adcacab2"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:25033c9b6182a5b3e07c0f6daf271eb7e86f38a58053bd55fdcf427711821ffe"
    status: "active"
    task_id: "202609140657-5REY71"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-14T07:01:21.064Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:05d9e037f315e3dad580662875f670e39118537f5689e20277c16450ce222b81"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-14T06:59:36.929Z"
      digest: "sha256:05d9e037f315e3dad580662875f670e39118537f5689e20277c16450ce222b81"
      proposal:
        assumptions:
          - "A merge commit is acceptable because the operation must preserve existing candidate commits and must not rewrite history."
          - "The exact configured base head is available locally before the operation is emitted."
          - "The task worktree must be clean before synchronization."
        planning_baseline:
          captured_at: "2026-09-14T06:57:33.673Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:9c62768843d235439b07a5799664b73a827b00d0d143d001f23cd14e232a5830"
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
            - ".agentplane/tasks/202609140657-5REY71/README.md"
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
            sha: "40368f0ae58774c8cdd80fddb22cb6daacbae8f4"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609140657-5REY71"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/workflow-step-projections-routing.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              id: "focused_route_tests"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
              id: "focused_supervisor_tests"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "lint_core"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full_ci"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
            -
              capability: "task.verify"
              id: "diff_hygiene"
              kind: "structural"
              required: true
          criteria:
            -
              check_ids:
                - "focused_route_tests"
                - "focused_supervisor_tests"
              description: "An already-started branch_pr task with incomplete required work and a clean task branch that does not contain the current exact base emits a supervisor-owned synchronization cli_operation before any agent_episode."
              id: "route_before_semantic"
              required: true
            -
              check_ids:
                - "focused_supervisor_tests"
                - "typecheck"
                - "lint_core"
              description: "The operation binds task id, task branch, expected task head, base branch, and expected base head; it preserves candidate commits, rejects dirty, stale, conflicting, unavailable, or ambiguous state before unsafe mutation, and never force-pushes or rewrites existing commits."
              id: "exact_safe_sync"
              required: true
            -
              check_ids:
                - "focused_route_tests"
                - "focused_supervisor_tests"
              description: "After success the supervisor records an operation receipt, verifies that the new task head contains both exact input heads, recomputes the route, and issues semantic work only from the synchronized head; repeated routing is idempotent."
              id: "verified_convergence"
              required: true
            -
              check_ids:
                - "focused_route_tests"
                - "focused_supervisor_tests"
                - "full_ci"
              description: "Existing provider update-branch, conflict recovery, clean current-base tasks, and normal branch_pr implementation routes retain their behavior."
              id: "regression_safe"
              required: true
            -
              check_ids:
                - "diff_hygiene"
              description: "The diff contains only the lifecycle route, synchronization implementation, tests, and task artifacts; unrelated base-checkout work and agentplane-roadmap-r2 remain uncommitted."
              id: "scope_hygiene"
              required: true
          evidence_fingerprint: "sha256:9c62768843d235439b07a5799664b73a827b00d0d143d001f23cd14e232a5830"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused_route_tests"
                    - "focused_supervisor_tests"
                  description: "An already-started branch_pr task with incomplete required work and a clean task branch that does not contain the current exact base emits a supervisor-owned synchronization cli_operation before any agent_episode."
                  id: "route_before_semantic"
                  required: true
                -
                  check_ids:
                    - "focused_supervisor_tests"
                    - "typecheck"
                    - "lint_core"
                  description: "The operation binds task id, task branch, expected task head, base branch, and expected base head; it preserves candidate commits, rejects dirty, stale, conflicting, unavailable, or ambiguous state before unsafe mutation, and never force-pushes or rewrites existing commits."
                  id: "exact_safe_sync"
                  required: true
                -
                  check_ids:
                    - "focused_route_tests"
                    - "focused_supervisor_tests"
                  description: "After success the supervisor records an operation receipt, verifies that the new task head contains both exact input heads, recomputes the route, and issues semantic work only from the synchronized head; repeated routing is idempotent."
                  id: "verified_convergence"
                  required: true
                -
                  check_ids:
                    - "focused_route_tests"
                    - "focused_supervisor_tests"
                    - "full_ci"
                  description: "Existing provider update-branch, conflict recovery, clean current-base tasks, and normal branch_pr implementation routes retain their behavior."
                  id: "regression_safe"
                  required: true
                -
                  check_ids:
                    - "diff_hygiene"
                  description: "The diff contains only the lifecycle route, synchronization implementation, tests, and task artifacts; unrelated base-checkout work and agentplane-roadmap-r2 remain uncommitted."
                  id: "scope_hygiene"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 1000000
                optional_sources:
                  - "packages/agentplane/src/commands/pr/provider-update-branch.ts"
                  - "packages/agentplane/src/commands/pr/provider-update-branch-local.ts"
                  - "packages/agentplane/src/commands/guard/impl/commit.ts"
                required_sources:
                  - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor.ts"
                symbol_hints:
                  - "branchStep"
                  - "branchImplementationStep"
                  - "providerUpdateBranchStep"
                  - "executeBranchWorkflowOperation"
                  - "WorkflowOperation"
              depends_on: []
              expected_outputs:
                - "branch_base_sync_workflow_step"
                - "branch_base_sync_supervisor_operation"
                - "route_and_operation_regression_tests"
              id: "implement_branch_base_sync"
              objective: "Add the exact-identity supervisor-owned branch base synchronization route and operation, then cover successful convergence and all fail-closed boundaries without changing unrelated lifecycle behavior."
              optional: false
              priority: 1
              required_inputs: []
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
                  resource: "packages/agentplane/src/commands/branch"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/branch"
                - "packages/agentplane/src/cli"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/workflow-step-projections-routing.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
                    id: "focused_route_tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000"
                    id: "focused_supervisor_tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "lint_core"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full_ci"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                  -
                    capability: "task.verify"
                    id: "diff_hygiene"
                    kind: "structural"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "focused_route_tests"
                      - "focused_supervisor_tests"
                    description: "An already-started branch_pr task with incomplete required work and a clean task branch that does not contain the current exact base emits a supervisor-owned synchronization cli_operation before any agent_episode."
                    id: "route_before_semantic"
                    required: true
                  -
                    check_ids:
                      - "focused_supervisor_tests"
                      - "typecheck"
                      - "lint_core"
                    description: "The operation binds task id, task branch, expected task head, base branch, and expected base head; it preserves candidate commits, rejects dirty, stale, conflicting, unavailable, or ambiguous state before unsafe mutation, and never force-pushes or rewrites existing commits."
                    id: "exact_safe_sync"
                    required: true
                  -
                    check_ids:
                      - "focused_route_tests"
                      - "focused_supervisor_tests"
                    description: "After success the supervisor records an operation receipt, verifies that the new task head contains both exact input heads, recomputes the route, and issues semantic work only from the synchronized head; repeated routing is idempotent."
                    id: "verified_convergence"
                    required: true
                  -
                    check_ids:
                      - "focused_route_tests"
                      - "focused_supervisor_tests"
                      - "full_ci"
                    description: "Existing provider update-branch, conflict recovery, clean current-base tasks, and normal branch_pr implementation routes retain their behavior."
                    id: "regression_safe"
                    required: true
                  -
                    check_ids:
                      - "diff_hygiene"
                    description: "The diff contains only the lifecycle route, synchronization implementation, tests, and task artifacts; unrelated base-checkout work and agentplane-roadmap-r2 remain uncommitted."
                    id: "scope_hygiene"
                    required: true
                evidence_fingerprint: "sha256:9c62768843d235439b07a5799664b73a827b00d0d143d001f23cd14e232a5830"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609140657-5REY71"
    event_cursor: 3
    final_validation: null
    id: "202609140657-5REY71"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run test:unit -- packages/agentplane/src/commands/task"
          id: "legacy-1"
          required: true
      captured_at: "2026-09-14T06:57:27.240Z"
      constraints: []
      request: |-
        Add supervisor-owned base synchronization before semantic work on stale branch_pr candidates

        Implement a deterministic AgentPlane lifecycle route for an already-started branch_pr task whose approved WorkItem requires its preserved candidate branch to adopt an exact newer qualified base before semantic edits. The supervisor must own the Git or provider synchronization, bind it to exact branch/head/base identities, preserve existing candidate commits and unrelated work, fail closed on conflict or stale identity, and issue the next semantic packet only after verified base ancestry. An external semantic executor must never be asked to rebase, merge, cherry-pick, commit, force-push, or rewrite Git history. Cover the release-task failure demonstrated by task 202609121424-49XXT3, then integrate the fix through protected branch_pr workflow so that release 0.7.9 can resume.
      task_id: "202609140657-5REY71"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 5
    schema_version: 1
    updated_at: "2026-09-14T07:01:27.069Z"
    work_items:
      implement_branch_base_sync:
        attempt: 0
        claim_id: null
        id: "implement_branch_base_sync"
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
      compatibility:sha256:20bb0bdc7d0cf7eb787521d5a30c7f0f8f5b55701101b9f17be94151773121c6:
        aggregate_digest: "sha256:56ffcc81710fc65cdf1ec93424008fb17611386df1d77857d7cf57171125ea03"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T07:01:05.520Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_c3c9cf633c2fd2938dacce47"
          mutation_id: "compatibility:sha256:20bb0bdc7d0cf7eb787521d5a30c7f0f8f5b55701101b9f17be94151773121c6"
          plan_digest: "sha256:05d9e037f315e3dad580662875f670e39118537f5689e20277c16450ce222b81"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140657-5REY71"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:20bb0bdc7d0cf7eb787521d5a30c7f0f8f5b55701101b9f17be94151773121c6"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609140657-5REY71"
      compatibility:sha256:6a6a572118fac838bac7f1791d704da0d6996982bcedb011bb3ce66795c0786a:
        aggregate_digest: "sha256:4cb4d881a697e476343609f3f24ae6d5b10c1d578c32be4793b25dd7081175bc"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T07:01:27.069Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_83ce3cec3e884116c9471395"
          mutation_id: "compatibility:sha256:6a6a572118fac838bac7f1791d704da0d6996982bcedb011bb3ce66795c0786a"
          plan_digest: "sha256:05d9e037f315e3dad580662875f670e39118537f5689e20277c16450ce222b81"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140657-5REY71"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6a6a572118fac838bac7f1791d704da0d6996982bcedb011bb3ce66795c0786a"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609140657-5REY71"
      compatibility:sha256:88f8e8c7a13e6da1188c3ed029f45d09e383c9902a2a25e6bc81c2020d14ddbb:
        aggregate_digest: "sha256:387b99e6f91459273644f1d60c24b93e4239cb799ca6a9518340b6dbe71218e3"
        event:
          actor_id: "agentplane"
          at: "2026-09-14T07:01:05.519Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_dcbc84acd89c463c0b3c4891"
          mutation_id: "compatibility:sha256:88f8e8c7a13e6da1188c3ed029f45d09e383c9902a2a25e6bc81c2020d14ddbb"
          plan_digest: "sha256:05d9e037f315e3dad580662875f670e39118537f5689e20277c16450ce222b81"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609140657-5REY71"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:88f8e8c7a13e6da1188c3ed029f45d09e383c9902a2a25e6bc81c2020d14ddbb"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609140657-5REY71"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "40368f0ae58774c8cdd80fddb22cb6daacbae8f4"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "40368f0ae58774c8cdd80fddb22cb6daacbae8f4"
    version: 1
id_source: "generated"
---
## Summary

Add supervisor-owned base synchronization before semantic work on stale branch_pr candidates

Implement a deterministic AgentPlane lifecycle route for an already-started branch_pr task whose approved WorkItem requires its preserved candidate branch to adopt an exact newer qualified base before semantic edits. The supervisor must own the Git or provider synchronization, bind it to exact branch/head/base identities, preserve existing candidate commits and unrelated work, fail closed on conflict or stale identity, and issue the next semantic packet only after verified base ancestry. An external semantic executor must never be asked to rebase, merge, cherry-pick, commit, force-push, or rewrite Git history. Cover the release-task failure demonstrated by task 202609121424-49XXT3, then integrate the fix through protected branch_pr workflow so that release 0.7.9 can resume.

## Scope

- In scope: Implement a deterministic AgentPlane lifecycle route for an already-started branch_pr task whose approved WorkItem requires its preserved candidate branch to adopt an exact newer qualified base before semantic edits. The supervisor must own the Git or provider synchronization, bind it to exact branch/head/base identities, preserve existing candidate commits and unrelated work, fail closed on conflict or stale identity, and issue the next semantic packet only after verified base ancestry. An external semantic executor must never be asked to rebase, merge, cherry-pick, commit, force-push, or rewrite Git history. Cover the release-task failure demonstrated by task 202609121424-49XXT3, then integrate the fix through protected branch_pr workflow so that release 0.7.9 can resume.
- Out of scope: unrelated refactors not required for "Add supervisor-owned base synchronization before semantic work on stale branch_pr candidates".

## Plan

Add one exact-identity branch base synchronization lifecycle operation before incomplete branch_pr work reaches a semantic executor.

## Verify Steps

1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/shared/workflow-step-projections.test.ts packages/agentplane/src/commands/shared/workflow-step-projections-routing.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000. Expected: stale-base routing emits the lifecycle operation before semantic work and existing routes remain stable.
2. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts --pool=forks --maxWorkers=1 --testTimeout=120000 --hookTimeout=120000. Expected: exact-identity synchronization, fail-closed boundaries, receipts, and convergence pass.
3. Run bun run typecheck. Expected: TypeScript build passes.
4. Run bun run lint:core. Expected: core lint passes.
5. Run bun run ci:local:full. Expected: the complete local gate passes.
6. Review git diff --check, the exact task diff, and git status --short --untracked-files=all. Expected: only approved lifecycle code, tests, and task artifacts changed; unrelated base work and agentplane-roadmap-r2 are absent.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
