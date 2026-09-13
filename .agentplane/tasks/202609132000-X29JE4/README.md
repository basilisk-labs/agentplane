---
id: "202609132000-X29JE4"
title: "Remove supervisor spend limits and retain informational usage telemetry"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
  - "bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-09-13T20:08:40.022Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:b1271743d2a1ba63a8e25079b1025333a26da3b85ea486ee4014f60daa67e151"
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
    - "effect_schema"
    - "effect_security_boundary"
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
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands"
      - "packages/agentplane/src/runner"
      - "packages/core/src/runner"
      - "packages/core/src/schemas"
      - "scripts/baselines"
      - "scripts/bench"
      - "scripts/checks"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The change affects admission and safety behavior and therefore requires isolated branch review and full regression."
      - "The persisted supervisor journal must retain a cold reader for existing records while new execution ignores legacy spend limits."
      - "The public budget-epoch command and benchmark spend field must be removed consistently with generated compatibility evidence."
      - "The user explicitly requested removal of active token, monetary, time, file, diff, agent-run, and routine episode limits."
    repository_effects:
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands"
      - "packages/agentplane/src/runner"
      - "packages/core/src/runner"
      - "packages/core/src/schemas"
      - "scripts/baselines"
      - "scripts/bench"
      - "scripts/checks"
  observed:
    authority_violations: []
    changed_components:
      - "scripts"
    changed_paths:
      - "scripts/bench/paired-production-driver.mjs"
      - "scripts/bench/paired-production-driver.test.mjs"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
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
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands"
          - "packages/agentplane/src/runner"
          - "packages/core/src/runner"
          - "packages/core/src/schemas"
          - "scripts/baselines"
          - "scripts/bench"
          - "scripts/checks"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "public_api"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:aa3d57cc9e3d34372369aab260ad3f1be5dcc4b6ffccdd66e0bb3b17ce86dbe2"
      escalation_reasons:
        - "central_component:packages/core/src/runner"
        - "central_component:packages/core/src/schemas"
        - "effect_public_api"
        - "effect_schema"
        - "effect_security_boundary"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "scripts"
        changed_files:
          - "scripts/bench/paired-production-driver.mjs"
          - "scripts/bench/paired-production-driver.test.mjs"
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
      - "hosted_integration"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "42018380f7785ef4b04cf85520e022b8b8612fad"
  message: "🚧 X29JE4 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 42018380f778. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-13T20:08:45.519Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-13T20:12:38.723Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 42018380f778. CLI accepted one state-bound external-agent semantic result."
    commit: "42018380f7785ef4b04cf85520e022b8b8612fad"
doc_version: 3
doc_updated_at: "2026-09-13T20:12:38.723Z"
doc_updated_by: "SUPERVISOR"
description: "Remove active supervisor token, monetary, wall-time, changed-file, diff-line, agent-run, and routine episode budget enforcement. Remove the task supervisor budget-epoch command and token-budget renewal path. Keep provider token usage as informational evaluation telemetry. Retain only a high internal orchestrator anomaly fuse that pauses resumably on a probable tight loop. Detect cycles from repeated canonical semantic state and exhausted recovery strategies, and return a concrete diagnostic without treating the task as budget-exhausted. Preserve cold decoding of existing persisted journals without continuing legacy spend enforcement. Do not change release or publication state."
sections:
  Summary: |-
    Remove supervisor spend limits and retain informational usage telemetry

    Remove active supervisor token, monetary, wall-time, changed-file, diff-line, agent-run, and routine episode budget enforcement. Remove the task supervisor budget-epoch command and token-budget renewal path. Keep provider token usage as informational evaluation telemetry. Retain only a high internal orchestrator anomaly fuse that pauses resumably on a probable tight loop. Detect cycles from repeated canonical semantic state and exhausted recovery strategies, and return a concrete diagnostic without treating the task as budget-exhausted. Preserve cold decoding of existing persisted journals without continuing legacy spend enforcement. Do not change release or publication state.
  Scope: |-
    - In scope: Remove active supervisor token, monetary, wall-time, changed-file, diff-line, agent-run, and routine episode budget enforcement. Remove the task supervisor budget-epoch command and token-budget renewal path. Keep provider token usage as informational evaluation telemetry. Retain only a high internal orchestrator anomaly fuse that pauses resumably on a probable tight loop. Detect cycles from repeated canonical semantic state and exhausted recovery strategies, and return a concrete diagnostic without treating the task as budget-exhausted. Preserve cold decoding of existing persisted journals without continuing legacy spend enforcement. Do not change release or publication state.
    - Out of scope: unrelated refactors not required for "Remove supervisor spend limits and retain informational usage telemetry".
  Plan: "Planned removal of active spend and resource limits while retaining informational usage telemetry, legacy decoding, and a resumable internal anomaly fuse."
  Verify Steps: |-
    1. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts`. Expected: active resource limits are absent, usage remains informational, cycle recovery exhausts applicable strategies, and the anomaly fuse pauses resumably.
    2. Run the focused CLI tests that replace the removed budget-epoch route. Expected: the command is absent and legacy journals remain cold-readable without active spend enforcement.
    3. Run `node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs`. Expected: `maximum_authorized_spend` is absent while cost evidence and live authority remain intact.
    4. Run `node scripts/checks/check-compatibility-contract-baseline.mjs`. Expected: current compatibility evidence matches the removed command and schema surface.
    5. Run `bun run typecheck`. Expected: it succeeds.
    6. Run `bun run test:critical`. Expected: it succeeds.
    7. Review the final scoped diff. Expected: no release or publication state changed and unrelated work remains untouched.
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
    approval_evidence_digest: "sha256:b1271743d2a1ba63a8e25079b1025333a26da3b85ea486ee4014f60daa67e151"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:4790f7c008d40156e1f3a1e6446c3a8825dd50a5966d7b428b15776e3e64eeee"
    digest: "sha256:138818b8d73d3e7f53d49b8bb257b9555378fc121353e337b251dd775ce83c9f"
    grant_id: "82cfdf78-c366-4529-ae89-a471649e78df"
    issued_at: "2026-09-13T20:08:40.022Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:b956fc08d133cf2d94a0693a8efdedf8fd4d374438473f8f07436cff0767a5a9"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:286235e1c1a66f137f7b576d3f1dffbb5ddd7bff04538a12c18e10b8d5fea439"
    status: "active"
    task_id: "202609132000-X29JE4"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-13T20:08:40.022Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:c21ca9fb024d6c041175d789cd83b530decf10ee5907fff6d70dcdecc07325d9"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-13T20:06:01.918Z"
      digest: "sha256:c21ca9fb024d6c041175d789cd83b530decf10ee5907fff6d70dcdecc07325d9"
      proposal:
        assumptions:
          - "Existing persisted budget fields remain readable only for compatibility and do not influence new execution admission."
          - "Live external execution retains the existing explicit authority check even though numeric spend admission is removed."
          - "The internal anomaly fuse is not a user-visible task budget and cannot consume token or monetary telemetry as an input."
        planning_baseline:
          captured_at: "2026-09-13T20:00:44.550Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:a7c50d309fe3e028a66923a21abf5ab51f98fb7091a3ccc2453ef84b458a9616"
          dirty_paths:
            - ".agentplane/tasks/202609072121-9VEHKH/README.md"
            - ".agentplane/tasks/202609080727-BAWTEE/README.md"
            - ".agentplane/tasks/202609121424-49XXT3/README.md"
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
            - ".agentplane/tasks/202609132000-X29JE4/README.md"
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
          git:
            kind: "commit"
            ref: null
            sha: "58dbda0d5f88c8a83802c5aee3a9380d001dd4b2"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609132000-X29JE4"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
              id: "supervisor-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
              id: "cli-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs"
              id: "benchmark-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "node scripts/checks/check-compatibility-contract-baseline.mjs"
              id: "compatibility"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run test:critical"
              id: "critical"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              id: "diff-review"
              kind: "semantic"
              required: true
          criteria:
            -
              check_ids:
                - "supervisor-focused"
              description: "Provider token usage remains durably recorded and reported but never denies, pauses, retries, or changes routing for a task."
              id: "telemetry-only"
              required: true
            -
              check_ids:
                - "supervisor-focused"
              description: "Active supervisor execution no longer enforces token, monetary, wall-time, changed-file, diff-line, agent-run, or routine episode budgets."
              id: "remove-resource-limits"
              required: true
            -
              check_ids:
                - "supervisor-focused"
              description: "Only an internal high anomaly fuse can pause orchestration, and repeated canonical semantic state stops only after applicable recovery strategies are exhausted with a concrete resumable diagnostic."
              id: "anomaly-cycle-stop"
              required: true
            -
              check_ids:
                - "cli-focused"
              description: "The task supervisor budget-epoch command, renewal path, token-budget epoch state, and active compatibility exposure are removed while old journals remain cold-readable."
              id: "remove-budget-epoch"
              required: true
            -
              check_ids:
                - "benchmark-focused"
              description: "Paired campaigns retain observed and unknown cost evidence without requiring or enforcing a numeric maximum authorized spend; live execution still requires external authority."
              id: "informational-campaign-cost"
              required: true
            -
              check_ids:
                - "diff-review"
              description: "Release state, publication state, unrelated task work, and unrelated dirty paths remain unchanged."
              id: "scope-integrity"
              required: true
          evidence_fingerprint: "sha256:a7c50d309fe3e028a66923a21abf5ab51f98fb7091a3ccc2453ef84b458a9616"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "supervisor-focused"
                  description: "Provider token usage remains durably recorded and reported but never denies, pauses, retries, or changes routing for a task."
                  id: "telemetry-only"
                  required: true
                -
                  check_ids:
                    - "supervisor-focused"
                  description: "Active supervisor execution no longer enforces token, monetary, wall-time, changed-file, diff-line, agent-run, or routine episode budgets."
                  id: "remove-resource-limits"
                  required: true
                -
                  check_ids:
                    - "supervisor-focused"
                  description: "Only an internal high anomaly fuse can pause orchestration, and repeated canonical semantic state stops only after applicable recovery strategies are exhausted with a concrete resumable diagnostic."
                  id: "anomaly-cycle-stop"
                  required: true
                -
                  check_ids:
                    - "cli-focused"
                  description: "The task supervisor budget-epoch command, renewal path, token-budget epoch state, and active compatibility exposure are removed while old journals remain cold-readable."
                  id: "remove-budget-epoch"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "packages/core/src/runner/supervisor-execution-episode.test.ts"
                required_sources:
                  - "packages/core/src/runner/supervisor-execution-episode.ts"
                  - "packages/core/src/runner/supervisor-execution-episode-migration.ts"
                  - "packages/core/src/schemas/index.ts"
                symbol_hints:
                  - "SupervisorExecutionBudget"
                  - "exhaustedDimensions"
                  - "authorizeSupervisorTokenBudgetEpoch"
                  - "migrateSupervisorExecutionEpisodeJournal"
              depends_on: []
              expected_outputs:
                - "journal-contract-output"
              id: "journal-contract"
              objective: "Separate informational usage and legacy decoding from active execution admission in the canonical supervisor journal contract."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner"
              risk: "high"
              scope_roots:
                - "packages/core/src/runner"
                - "packages/core/src/schemas"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
                    id: "supervisor-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
                    id: "cli-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "supervisor-focused"
                    description: "Provider token usage remains durably recorded and reported but never denies, pauses, retries, or changes routing for a task."
                    id: "telemetry-only"
                    required: true
                  -
                    check_ids:
                      - "supervisor-focused"
                    description: "Active supervisor execution no longer enforces token, monetary, wall-time, changed-file, diff-line, agent-run, or routine episode budgets."
                    id: "remove-resource-limits"
                    required: true
                  -
                    check_ids:
                      - "supervisor-focused"
                    description: "Only an internal high anomaly fuse can pause orchestration, and repeated canonical semantic state stops only after applicable recovery strategies are exhausted with a concrete resumable diagnostic."
                    id: "anomaly-cycle-stop"
                    required: true
                  -
                    check_ids:
                      - "cli-focused"
                    description: "The task supervisor budget-epoch command, renewal path, token-budget epoch state, and active compatibility exposure are removed while old journals remain cold-readable."
                    id: "remove-budget-epoch"
                    required: true
                evidence_fingerprint: "sha256:a7c50d309fe3e028a66923a21abf5ab51f98fb7091a3ccc2453ef84b458a9616"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "supervisor-focused"
                  description: "Provider token usage remains durably recorded and reported but never denies, pauses, retries, or changes routing for a task."
                  id: "telemetry-only"
                  required: true
                -
                  check_ids:
                    - "supervisor-focused"
                  description: "Active supervisor execution no longer enforces token, monetary, wall-time, changed-file, diff-line, agent-run, or routine episode budgets."
                  id: "remove-resource-limits"
                  required: true
                -
                  check_ids:
                    - "supervisor-focused"
                  description: "Only an internal high anomaly fuse can pause orchestration, and repeated canonical semantic state stops only after applicable recovery strategies are exhausted with a concrete resumable diagnostic."
                  id: "anomaly-cycle-stop"
                  required: true
                -
                  check_ids:
                    - "cli-focused"
                  description: "The task supervisor budget-epoch command, renewal path, token-budget epoch state, and active compatibility exposure are removed while old journals remain cold-readable."
                  id: "remove-budget-epoch"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 240000
                optional_sources:
                  - "packages/agentplane/src/commands/task/branch-task-supervisor.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                  - "packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts"
                required_sources:
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-budget-renewal.ts"
                  - "packages/agentplane/src/commands/task/supervisor-budget-epoch.command.ts"
                  - "packages/agentplane/src/commands/task/advance.command.ts"
                symbol_hints:
                  - "DEFAULT_SUPERVISOR_EXECUTION_BUDGET"
                  - "continueSupervisorExecutionEpisodeAfterRenewableBudget"
                  - "taskSupervisorBudgetEpochSpec"
                  - "budget_exhausted"
              depends_on:
                - "journal-contract"
              expected_outputs:
                - "runtime-and-cli-output"
              id: "runtime-and-cli"
              objective: "Remove budget-based stops and budget-epoch CLI wiring while adding canonical cycle recovery and a resumable internal anomaly diagnostic."
              optional: false
              priority: 2
              required_inputs:
                - "journal-contract-output"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/runner"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
                    id: "supervisor-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
                    id: "cli-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run test:critical"
                    id: "critical"
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
                criteria:
                  -
                    check_ids:
                      - "supervisor-focused"
                    description: "Provider token usage remains durably recorded and reported but never denies, pauses, retries, or changes routing for a task."
                    id: "telemetry-only"
                    required: true
                  -
                    check_ids:
                      - "supervisor-focused"
                    description: "Active supervisor execution no longer enforces token, monetary, wall-time, changed-file, diff-line, agent-run, or routine episode budgets."
                    id: "remove-resource-limits"
                    required: true
                  -
                    check_ids:
                      - "supervisor-focused"
                    description: "Only an internal high anomaly fuse can pause orchestration, and repeated canonical semantic state stops only after applicable recovery strategies are exhausted with a concrete resumable diagnostic."
                    id: "anomaly-cycle-stop"
                    required: true
                  -
                    check_ids:
                      - "cli-focused"
                    description: "The task supervisor budget-epoch command, renewal path, token-budget epoch state, and active compatibility exposure are removed while old journals remain cold-readable."
                    id: "remove-budget-epoch"
                    required: true
                evidence_fingerprint: "sha256:a7c50d309fe3e028a66923a21abf5ab51f98fb7091a3ccc2453ef84b458a9616"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "benchmark-focused"
                  description: "Paired campaigns retain observed and unknown cost evidence without requiring or enforcing a numeric maximum authorized spend; live execution still requires external authority."
                  id: "informational-campaign-cost"
                  required: true
                -
                  check_ids:
                    - "diff-review"
                  description: "Release state, publication state, unrelated task work, and unrelated dirty paths remain unchanged."
                  id: "scope-integrity"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 160000
                optional_sources:
                  - "scripts/bench/paired-result-report.test.mjs"
                required_sources:
                  - "scripts/bench/paired-production-driver.mjs"
                  - "scripts/bench/paired-production-driver.test.mjs"
                  - "scripts/bench/paired-result-report.mjs"
                symbol_hints:
                  - "maximum_authorized_spend"
                  - "AGENTPLANE_PAIRED_MAXIMUM_AUTHORIZED_SPEND"
                  - "assertLiveAuthority"
                  - "raw_cost"
              depends_on: []
              expected_outputs:
                - "campaign-contract-output"
              id: "campaign-contract"
              objective: "Make benchmark cost evidence informational and remove the numeric maximum-spend contract without weakening live external authority."
              optional: false
              priority: 2
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
              risk: "medium"
              scope_roots:
                - "scripts/bench"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs"
                    id: "benchmark-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run test:critical"
                    id: "critical"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    id: "diff-review"
                    kind: "semantic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "benchmark-focused"
                    description: "Paired campaigns retain observed and unknown cost evidence without requiring or enforcing a numeric maximum authorized spend; live execution still requires external authority."
                    id: "informational-campaign-cost"
                    required: true
                  -
                    check_ids:
                      - "diff-review"
                    description: "Release state, publication state, unrelated task work, and unrelated dirty paths remain unchanged."
                    id: "scope-integrity"
                    required: true
                evidence_fingerprint: "sha256:a7c50d309fe3e028a66923a21abf5ab51f98fb7091a3ccc2453ef84b458a9616"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "supervisor-focused"
                  description: "Provider token usage remains durably recorded and reported but never denies, pauses, retries, or changes routing for a task."
                  id: "telemetry-only"
                  required: true
                -
                  check_ids:
                    - "supervisor-focused"
                  description: "Active supervisor execution no longer enforces token, monetary, wall-time, changed-file, diff-line, agent-run, or routine episode budgets."
                  id: "remove-resource-limits"
                  required: true
                -
                  check_ids:
                    - "supervisor-focused"
                  description: "Only an internal high anomaly fuse can pause orchestration, and repeated canonical semantic state stops only after applicable recovery strategies are exhausted with a concrete resumable diagnostic."
                  id: "anomaly-cycle-stop"
                  required: true
                -
                  check_ids:
                    - "cli-focused"
                  description: "The task supervisor budget-epoch command, renewal path, token-budget epoch state, and active compatibility exposure are removed while old journals remain cold-readable."
                  id: "remove-budget-epoch"
                  required: true
                -
                  check_ids:
                    - "benchmark-focused"
                  description: "Paired campaigns retain observed and unknown cost evidence without requiring or enforcing a numeric maximum authorized spend; live execution still requires external authority."
                  id: "informational-campaign-cost"
                  required: true
                -
                  check_ids:
                    - "diff-review"
                  description: "Release state, publication state, unrelated task work, and unrelated dirty paths remain unchanged."
                  id: "scope-integrity"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 220000
                optional_sources:
                  - "scripts/lib/test-route-registry.mjs"
                  - "packages/core/src/runner/supervisor-execution-episode.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                  - "scripts/checks/check-compatibility-contract-baseline.mjs"
                symbol_hints:
                  - "budget_exhausted"
                  - "usage_attribution"
                  - "progress_digest"
                  - "compatibility candidate"
              depends_on:
                - "journal-contract"
                - "runtime-and-cli"
                - "campaign-contract"
              expected_outputs:
                - "compatibility-and-regression-output"
              id: "compatibility-and-regression"
              objective: "Update focused tests and generated compatibility evidence and verify that usage telemetry remains observable without acting as admission policy."
              optional: false
              priority: 3
              required_inputs:
                - "journal-contract-output"
                - "runtime-and-cli-output"
                - "campaign-contract-output"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "repository verification"
              risk: "high"
              scope_roots:
                - "packages/core/src/runner"
                - "packages/agentplane/src"
                - "scripts/baselines"
                - "scripts/checks"
                - "scripts/bench"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
                    id: "supervisor-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
                    id: "cli-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs"
                    id: "benchmark-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "node scripts/checks/check-compatibility-contract-baseline.mjs"
                    id: "compatibility"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run test:critical"
                    id: "critical"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    id: "diff-review"
                    kind: "semantic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "supervisor-focused"
                    description: "Provider token usage remains durably recorded and reported but never denies, pauses, retries, or changes routing for a task."
                    id: "telemetry-only"
                    required: true
                  -
                    check_ids:
                      - "supervisor-focused"
                    description: "Active supervisor execution no longer enforces token, monetary, wall-time, changed-file, diff-line, agent-run, or routine episode budgets."
                    id: "remove-resource-limits"
                    required: true
                  -
                    check_ids:
                      - "supervisor-focused"
                    description: "Only an internal high anomaly fuse can pause orchestration, and repeated canonical semantic state stops only after applicable recovery strategies are exhausted with a concrete resumable diagnostic."
                    id: "anomaly-cycle-stop"
                    required: true
                  -
                    check_ids:
                      - "cli-focused"
                    description: "The task supervisor budget-epoch command, renewal path, token-budget epoch state, and active compatibility exposure are removed while old journals remain cold-readable."
                    id: "remove-budget-epoch"
                    required: true
                  -
                    check_ids:
                      - "benchmark-focused"
                    description: "Paired campaigns retain observed and unknown cost evidence without requiring or enforcing a numeric maximum authorized spend; live execution still requires external authority."
                    id: "informational-campaign-cost"
                    required: true
                  -
                    check_ids:
                      - "diff-review"
                    description: "Release state, publication state, unrelated task work, and unrelated dirty paths remain unchanged."
                    id: "scope-integrity"
                    required: true
                evidence_fingerprint: "sha256:a7c50d309fe3e028a66923a21abf5ab51f98fb7091a3ccc2453ef84b458a9616"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609132000-X29JE4"
    event_cursor: 5
    final_validation: null
    id: "202609132000-X29JE4"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run test:critical"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-supervisor-budget-epoch.test.ts"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-4"
          required: true
      captured_at: "2026-09-13T20:00:38.418Z"
      constraints: []
      request: |-
        Remove supervisor spend limits and retain informational usage telemetry

        Remove active supervisor token, monetary, wall-time, changed-file, diff-line, agent-run, and routine episode budget enforcement. Remove the task supervisor budget-epoch command and token-budget renewal path. Keep provider token usage as informational evaluation telemetry. Retain only a high internal orchestrator anomaly fuse that pauses resumably on a probable tight loop. Detect cycles from repeated canonical semantic state and exhausted recovery strategies, and return a concrete diagnostic without treating the task as budget-exhausted. Preserve cold decoding of existing persisted journals without continuing legacy spend enforcement. Do not change release or publication state.
      task_id: "202609132000-X29JE4"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 7
    schema_version: 1
    updated_at: "2026-09-13T20:12:38.723Z"
    work_items:
      campaign-contract:
        attempt: 0
        claim_id: null
        id: "campaign-contract"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      compatibility-and-regression:
        attempt: 0
        claim_id: null
        id: "compatibility-and-regression"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      journal-contract:
        attempt: 0
        claim_id: null
        id: "journal-contract"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      runtime-and-cli:
        attempt: 0
        claim_id: null
        id: "runtime-and-cli"
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
      compatibility:sha256:0cb8a88a987a412aa563166a81ada75c02cc7fad5f9bbe62a84e52bb3b6472ce:
        aggregate_digest: "sha256:5c80282f70a8750f5a43d7aff16871615d1bdd192660d380e0b8127994fbf89f"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T20:08:19.629Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_bb594ba695de4ad9835c748f"
          mutation_id: "compatibility:sha256:0cb8a88a987a412aa563166a81ada75c02cc7fad5f9bbe62a84e52bb3b6472ce"
          plan_digest: "sha256:c21ca9fb024d6c041175d789cd83b530decf10ee5907fff6d70dcdecc07325d9"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609132000-X29JE4"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:0cb8a88a987a412aa563166a81ada75c02cc7fad5f9bbe62a84e52bb3b6472ce"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609132000-X29JE4"
      compatibility:sha256:2e1f6c5cb90ecce08ce2cd458c9a13e20a6982384b61d4ffb70eff58327a32bc:
        aggregate_digest: "sha256:e75d66aa8dc05d09d937f7706aa0fe3365cb83c893eaf8ecd8d14de3551c157e"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T20:08:45.519Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b7e2d089a59ba4169013edb9"
          mutation_id: "compatibility:sha256:2e1f6c5cb90ecce08ce2cd458c9a13e20a6982384b61d4ffb70eff58327a32bc"
          plan_digest: "sha256:c21ca9fb024d6c041175d789cd83b530decf10ee5907fff6d70dcdecc07325d9"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609132000-X29JE4"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2e1f6c5cb90ecce08ce2cd458c9a13e20a6982384b61d4ffb70eff58327a32bc"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609132000-X29JE4"
      compatibility:sha256:3d5bb0e5203ed9f3149937056911c0406018c18f3756f029daa555b03d877d9b:
        aggregate_digest: "sha256:6558dde16ac7b5378f7d6bdcff2d23239eddad92e40316051088230b5743fee6"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T20:08:19.631Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_e68f8d7fcc19f832400a69fe"
          mutation_id: "compatibility:sha256:3d5bb0e5203ed9f3149937056911c0406018c18f3756f029daa555b03d877d9b"
          plan_digest: "sha256:c21ca9fb024d6c041175d789cd83b530decf10ee5907fff6d70dcdecc07325d9"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609132000-X29JE4"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3d5bb0e5203ed9f3149937056911c0406018c18f3756f029daa555b03d877d9b"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609132000-X29JE4"
      compatibility:sha256:b2b2616674397ebbb14b51a7c8afd54db1af4030b52976505f37ce8a5ace4fba:
        aggregate_digest: "sha256:ebf62cefc83d21db92e4865f5617903e7d78ff00c020b7f1050e183979122415"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T20:12:38.723Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_58ea475f389874e8bfc30b17"
          mutation_id: "compatibility:sha256:b2b2616674397ebbb14b51a7c8afd54db1af4030b52976505f37ce8a5ace4fba"
          plan_digest: "sha256:c21ca9fb024d6c041175d789cd83b530decf10ee5907fff6d70dcdecc07325d9"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609132000-X29JE4"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b2b2616674397ebbb14b51a7c8afd54db1af4030b52976505f37ce8a5ace4fba"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609132000-X29JE4"
      compatibility:sha256:fe61b4ec75461aac095d90735238d3bd03db00c50ef0e3a32f53decc95548150:
        aggregate_digest: "sha256:b0bfa92328ebd433ea7fd6005ffab2b1d58ccebc7b02986b595106954f5c7f2c"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T20:12:38.723Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f2af51a40bdfc47dc76428b1"
          mutation_id: "compatibility:sha256:fe61b4ec75461aac095d90735238d3bd03db00c50ef0e3a32f53decc95548150"
          plan_digest: "sha256:c21ca9fb024d6c041175d789cd83b530decf10ee5907fff6d70dcdecc07325d9"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609132000-X29JE4"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:fe61b4ec75461aac095d90735238d3bd03db00c50ef0e3a32f53decc95548150"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609132000-X29JE4"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "42018380f7785ef4b04cf85520e022b8b8612fad"
  task_execution_context:
    base_ref: "main"
    base_sha: "58dbda0d5f88c8a83802c5aee3a9380d001dd4b2"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "58dbda0d5f88c8a83802c5aee3a9380d001dd4b2"
    version: 1
id_source: "generated"
---
## Summary

Remove supervisor spend limits and retain informational usage telemetry

Remove active supervisor token, monetary, wall-time, changed-file, diff-line, agent-run, and routine episode budget enforcement. Remove the task supervisor budget-epoch command and token-budget renewal path. Keep provider token usage as informational evaluation telemetry. Retain only a high internal orchestrator anomaly fuse that pauses resumably on a probable tight loop. Detect cycles from repeated canonical semantic state and exhausted recovery strategies, and return a concrete diagnostic without treating the task as budget-exhausted. Preserve cold decoding of existing persisted journals without continuing legacy spend enforcement. Do not change release or publication state.

## Scope

- In scope: Remove active supervisor token, monetary, wall-time, changed-file, diff-line, agent-run, and routine episode budget enforcement. Remove the task supervisor budget-epoch command and token-budget renewal path. Keep provider token usage as informational evaluation telemetry. Retain only a high internal orchestrator anomaly fuse that pauses resumably on a probable tight loop. Detect cycles from repeated canonical semantic state and exhausted recovery strategies, and return a concrete diagnostic without treating the task as budget-exhausted. Preserve cold decoding of existing persisted journals without continuing legacy spend enforcement. Do not change release or publication state.
- Out of scope: unrelated refactors not required for "Remove supervisor spend limits and retain informational usage telemetry".

## Plan

Planned removal of active spend and resource limits while retaining informational usage telemetry, legacy decoding, and a resumable internal anomaly fuse.

## Verify Steps

1. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts`. Expected: active resource limits are absent, usage remains informational, cycle recovery exhausts applicable strategies, and the anomaly fuse pauses resumably.
2. Run the focused CLI tests that replace the removed budget-epoch route. Expected: the command is absent and legacy journals remain cold-readable without active spend enforcement.
3. Run `node --test scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs`. Expected: `maximum_authorized_spend` is absent while cost evidence and live authority remain intact.
4. Run `node scripts/checks/check-compatibility-contract-baseline.mjs`. Expected: current compatibility evidence matches the removed command and schema surface.
5. Run `bun run typecheck`. Expected: it succeeds.
6. Run `bun run test:critical`. Expected: it succeeds.
7. Review the final scoped diff. Expected: no release or publication state changed and unrelated work remains untouched.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
