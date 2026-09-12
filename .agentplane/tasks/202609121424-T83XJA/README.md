---
id: "202609121424-T83XJA"
title: "Implement durable 0.7.9 usage, cost, and latency accounting for ST-08 through ST-13 and ST-17"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on:
  - "202609121423-9WPTCW"
tags:
  - "code"
  - "release-0.7.9"
  - "roadmap-st-08-13-17"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "node --test scripts/bench/task-cost-rollup.test.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-12T19:28:51.014Z"
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
    - "effect_ci"
    - "effect_public_api"
    - "effect_schema"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "ci"
      - "public_api"
      - "repository_write"
      - "schema"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/evaluator"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner"
      - "packages/core/src/runner"
      - "scripts/bench"
      - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
      - "scripts/lib/test-route-registry.mjs"
      - "scripts/lib/test-route-registry.test.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The implementation uses only fake or local provider fixtures and performs no paid or live provider calls."
      - "The task changes persisted supervisor and runner accounting contracts and therefore requires schema and public export compatibility review."
      - "The task touches central runner, evaluator, and lifecycle paths, so repository policy requires a branch PR and hosted integration evidence."
    repository_effects:
      - "ci"
      - "public_api"
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/evaluator"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner"
      - "packages/core/src/runner"
      - "scripts/bench"
      - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
      - "scripts/lib/test-route-registry.mjs"
      - "scripts/lib/test-route-registry.test.mjs"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
      - "packages/core"
    changed_paths:
      - "packages/agentplane/src/commands/evaluator/evaluator-episode.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"
      - "packages/agentplane/src/commands/evaluator/roadmap-failed-usage.test.ts"
      - "packages/agentplane/src/commands/evaluator/roadmap-telemetry-disposition.test.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
      - "packages/agentplane/src/runner/adapters/codex-result-transport.ts"
      - "packages/agentplane/src/runner/adapters/codex.ts"
      - "packages/agentplane/src/runner/adapters/roadmap-usage-durability.test.ts"
      - "packages/agentplane/src/runner/artifacts.ts"
      - "packages/core/src/runner/supervisor-execution-episode.test.ts"
      - "packages/core/src/runner/supervisor-execution-episode.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_public_api"
    - "effect_schema"
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
          - "packages/agentplane/src/commands/evaluator"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/runner"
          - "packages/core/src/runner"
          - "scripts/bench"
          - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
          - "scripts/lib/test-route-registry.mjs"
          - "scripts/lib/test-route-registry.test.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "public_api"
          - "repository_write"
          - "schema"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:a096c0b832e7a807b0f6258cd2edee5365762be171ab4dc0086096f2245ca224"
      escalation_reasons:
        - "central_component:packages/core/src/runner"
        - "central_component:scripts/lib/agent-efficiency-repository-snapshot.mjs"
        - "central_component:scripts/lib/test-route-registry.mjs"
        - "central_component:scripts/lib/test-route-registry.test.mjs"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
        - "central_path:packages/core/src/runner/supervisor-execution-episode.test.ts"
        - "central_path:packages/core/src/runner/supervisor-execution-episode.ts"
        - "effect_ci"
        - "effect_public_api"
        - "effect_schema"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
          - "packages/core"
        changed_files:
          - "packages/agentplane/src/commands/evaluator/evaluator-episode.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"
          - "packages/agentplane/src/commands/evaluator/roadmap-failed-usage.test.ts"
          - "packages/agentplane/src/commands/evaluator/roadmap-telemetry-disposition.test.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
          - "packages/agentplane/src/runner/adapters/codex-result-transport.ts"
          - "packages/agentplane/src/runner/adapters/codex.ts"
          - "packages/agentplane/src/runner/adapters/roadmap-usage-durability.test.ts"
          - "packages/agentplane/src/runner/artifacts.ts"
          - "packages/core/src/runner/supervisor-execution-episode.test.ts"
          - "packages/core/src/runner/supervisor-execution-episode.ts"
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
      - "repository_effect:ci"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "0a6612ae197108023d7d4927b0e0042167bc2a56"
  message: "🚧 T83XJA task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 1ba0189d7a23. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 0a6612ae1971. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-12T20:52:28.936Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-12T21:05:43.731Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 1ba0189d7a23. CLI accepted one state-bound external-agent semantic result."
    commit: "1ba0189d7a233f7364cf104b4227023cef4ad936"
  -
    type: "status"
    at: "2026-09-12T21:53:34.658Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 0a6612ae1971. CLI accepted one state-bound external-agent semantic result."
    commit: "0a6612ae197108023d7d4927b0e0042167bc2a56"
doc_version: 3
doc_updated_at: "2026-09-12T21:53:34.658Z"
doc_updated_by: "SUPERVISOR"
description: "Source contract: agentplane-roadmap-r2 cards ST-08, ST-09, ST-10, ST-11, ST-12, ST-13, and ST-17. Capture Codex usage durably before semantic-result validation, preserve evaluator charges on failure, connect managed observations to the existing journal, account for external episodes without trusting self-reported tokens, roll up task cost from source observations, partition lifecycle latency without double counting, and separate missing telemetry from semantic quality and further-spend admission. Missing usage is unknown, never zero. A valid saved verdict is reused, while unknown budget blocks additional paid dispatch. Preserve I01-I12 and C01-C08. Do not create a second accounting store or trust model-supplied usage. The roadmap directory is source-only and must never be committed. Required checks: the focused ST-08 through ST-13 and ST-17 test commands, related runner/evaluator/task critical suites, typecheck, schema/mirror checks."
sections:
  Summary: |-
    Implement durable 0.7.9 usage, cost, and latency accounting for ST-08 through ST-13 and ST-17

    Source contract: agentplane-roadmap-r2 cards ST-08, ST-09, ST-10, ST-11, ST-12, ST-13, and ST-17. Capture Codex usage durably before semantic-result validation, preserve evaluator charges on failure, connect managed observations to the existing journal, account for external episodes without trusting self-reported tokens, roll up task cost from source observations, partition lifecycle latency without double counting, and separate missing telemetry from semantic quality and further-spend admission. Missing usage is unknown, never zero. A valid saved verdict is reused, while unknown budget blocks additional paid dispatch. Preserve I01-I12 and C01-C08. Do not create a second accounting store or trust model-supplied usage. The roadmap directory is source-only and must never be committed. Required checks: the focused ST-08 through ST-13 and ST-17 test commands, related runner/evaluator/task critical suites, typecheck, schema/mirror checks.
  Scope: |-
    - In scope: Source contract: agentplane-roadmap-r2 cards ST-08, ST-09, ST-10, ST-11, ST-12, ST-13, and ST-17. Capture Codex usage durably before semantic-result validation, preserve evaluator charges on failure, connect managed observations to the existing journal, account for external episodes without trusting self-reported tokens, roll up task cost from source observations, partition lifecycle latency without double counting, and separate missing telemetry from semantic quality and further-spend admission. Missing usage is unknown, never zero. A valid saved verdict is reused, while unknown budget blocks additional paid dispatch. Preserve I01-I12 and C01-C08. Do not create a second accounting store or trust model-supplied usage. The roadmap directory is source-only and must never be committed. Required checks: the focused ST-08 through ST-13 and ST-17 test commands, related runner/evaluator/task critical suites, typecheck, schema/mirror checks.
    - Out of scope: unrelated refactors not required for "Implement durable 0.7.9 usage, cost, and latency accounting for ST-08 through ST-13 and ST-17".
  Plan: "Defined five dependency-ordered WorkItems for durable usage, accounting, cost rollup, latency, and spend admission."
  Verify Steps: |-
    1. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-usage-durability.test.ts`; require durable identity-bound provider usage before semantic validation, deduplication, and partial or unavailable coverage instead of implicit zero.
    2. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/evaluator/roadmap-failed-usage.test.ts`; require observed evaluator charges to survive timeout, nonzero exit, malformed results, and recovery.
    3. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-managed-accounting.test.ts`; require all managed roles and attempts to use the existing journal exactly once without classifying CLI operations as billable dispatches.
    4. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-external-accounting.test.ts`; require external role coverage, idempotent replay, rejection of model-supplied token claims, and explicit unavailable or unallocatable attribution.
    5. Run `node --test scripts/bench/task-cost-rollup.test.mjs`; require nonzero test discovery and exact reconciliation of unique observed, partial, unavailable, failed, role, and attempt records without adding cache or reasoning subsets twice.
    6. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-stage-timing.test.ts`; require monotonic parent and child stage spans, separate local, USER-wait, and external-wait time, no overlap double count, and no negative elapsed duration.
    7. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/evaluator/roadmap-telemetry-disposition.test.ts`; require saved valid verdict reuse, a hard stop before unproven further paid spend, and unchanged actual human_review semantics.
    8. Run `bun run typecheck`; require success.
    9. Run `bun run schemas:check`; require persisted and public schema mirrors to be current.
    10. Run `bun run artifacts:check`; require generated artifacts to be current.
    11. Run `bun run test:critical`; require existing authority, stale-state, recovery, evaluator, runner, and task negative cases to remain green.
    12. Run `bun run ci:local:full`; require the full local CI route to pass.
    13. Review `git diff` and `git status --short --untracked-files=all`; require no roadmap file, raw provider payload, secret, second accounting store, unrelated task artifact, generated drift, or unintended path in the task change.
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
    completion_contract_digest: "sha256:676901f27070cbac99891ad93cd79b5535c8a5ca2566c3d441d203597828c5e8"
    digest: "sha256:401c23b75d1e326742f3b2c7beb9c0f1785bd8fc9c095e326a2a7ec5e490038a"
    grant_id: "209681b5-ced4-42ff-bc89-7f295be57b89"
    issued_at: "2026-09-12T19:28:51.014Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:b8dc5b4c409746bb87538789f11cb96d47e03b3fbbca8cac32c8464a1baa6383"
    plan_revision: 4
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:e13ba8c0744eed7d60b25a07a3199dd41df0d148b1545b18b4b55b3ba6ce9144"
    status: "active"
    task_id: "202609121424-T83XJA"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-12T19:28:51.014Z"
        approved_by: "USER"
        approved_digest: "sha256:106b3c2da2bc74b7f6f834e120c1d7a3337e9bf54034809cf9f4af86f6d2ee92"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-09-12T19:27:44.199Z"
      digest: "sha256:106b3c2da2bc74b7f6f834e120c1d7a3337e9bf54034809cf9f4af86f6d2ee92"
      proposal:
        assumptions:
          - "Equivalent existing focused tests may be extended instead of adding a roadmap-named file only when they prove the same acceptance contract and execute a nonzero test count."
          - "Provider usage persistence retains only normalized counts and opaque identities; raw provider events, prompts, result payloads, and secrets remain outside canonical task text."
          - "Latency observations are diagnostic evidence and do not grant authority or change lifecycle outcomes."
        planning_baseline:
          captured_at: "2026-09-12T19:23:41.010Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:2834fa5919976a5edc26310212c8c3fe25822fe0124f2bf73bc95e91a94f66d3"
          dirty_paths:
            - ".agentplane/tasks/202609072121-9VEHKH/README.md"
            - ".agentplane/tasks/202609080727-BAWTEE/README.md"
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
            sha: "1f8b58d52ade59dd6185af72b00f70bb6194bdb0"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:2"
        schema_version: 1
        task_id: "202609121424-T83XJA"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-usage-durability.test.ts"
              id: "check-usage-durability"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/evaluator/roadmap-failed-usage.test.ts"
              id: "check-failed-usage"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-managed-accounting.test.ts"
              id: "check-managed-accounting"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-external-accounting.test.ts"
              id: "check-external-accounting"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "node --test scripts/bench/task-cost-rollup.test.mjs"
              id: "check-cost-rollup"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-stage-timing.test.ts"
              id: "check-stage-timing"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/evaluator/roadmap-telemetry-disposition.test.ts"
              id: "check-telemetry-disposition"
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
              command: "bun run ci:local:full"
              id: "check-full-ci"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
          criteria:
            -
              check_ids:
                - "check-usage-durability"
              description: "Provider-observed Codex usage is durably bound to dispatch, run, work-order, thread, and turn identity before semantic validation or result application can fail; malformed, duplicate, partial, and incomplete observations remain fail-closed and missing usage is never represented as zero."
              id: "c-durable-usage"
              required: true
            -
              check_ids:
                - "check-failed-usage"
                - "check-telemetry-disposition"
              description: "Evaluator success, timeout, nonzero exit, and malformed-result receipts retain every observed charge without changing verdict semantics; a saved valid verdict is reused, actual human_review still stops, and unknown finite-budget availability blocks further paid dispatch rather than replaying completed semantic work."
              id: "c-evaluator-usage"
              required: true
            -
              check_ids:
                - "check-managed-accounting"
                - "check-external-accounting"
              description: "Ordinary, kernel, and external PLANNER, CURATOR, EXECUTOR, and EVALUATOR attempts share the existing journal coverage model; replayed identities count once, formal CLI operations are not billable episodes, model-supplied token claims are ignored, and unattributable host turns stay explicitly unavailable or unallocatable."
              id: "c-managed-external"
              required: true
            -
              check_ids:
                - "check-cost-rollup"
              description: "A diagnostic task rollup reconciles unique source observations, including failures, into dispatched, observed, partial, unavailable, role, and attempt coverage; cached input and reasoning remain subsets and unknown portions prevent a complete numeric total."
              id: "c-task-rollup"
              required: true
            -
              check_ids:
                - "check-stage-timing"
              description: "Lifecycle timing uses bounded monotonic parent and child spans for preparation, semantic dispatch, first observed scoped mutation, native verification, review, provider or integration, verified state, closure, local work, USER wait, and external wait without overlap double-counting or negative elapsed durations."
              id: "c-stage-timing"
              required: true
            -
              check_ids:
                - "check-typecheck"
                - "check-schemas"
                - "check-artifacts"
                - "check-critical"
                - "check-full-ci"
              description: "The implementation preserves I01-I12 and C01-C08, stores no provider payloads or secrets in canonical task text, adds no second mutable aggregate, and passes type, schema, generated-artifact, critical, and full local CI checks."
              id: "c-regression"
              required: true
          evidence_fingerprint: "sha256:2834fa5919976a5edc26310212c8c3fe25822fe0124f2bf73bc95e91a94f66d3"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-usage-durability"
                  description: "Provider-observed Codex usage is durably bound to dispatch, run, work-order, thread, and turn identity before semantic validation or result application can fail; malformed, duplicate, partial, and incomplete observations remain fail-closed and missing usage is never represented as zero."
                  id: "c-durable-usage"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 240000
                optional_sources:
                  - "Existing runner artifact migration and recovery tests"
                required_sources:
                  - "packages/agentplane/src/runner/adapters/codex-result-transport.ts"
                  - "packages/agentplane/src/runner/adapters/codex.ts"
                  - "packages/agentplane/src/runner/artifacts.ts"
                  - "packages/agentplane/src/runner/types.ts"
                  - "packages/agentplane/src/runner/run-state-validation.ts"
                symbol_hints:
                  - "CodexProviderUsage"
                  - "createCodexResultEventCollector"
                  - "recordCodexProviderUsageForResult"
                  - "RunnerRunState"
              depends_on: []
              expected_outputs:
                - "durable provider-usage observation"
                - "usage durability regression coverage"
              id: "ST-08"
              objective: "Persist minimal provider usage observations at the Codex runner boundary before semantic parsing or result application."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/runner"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-usage-durability.test.ts"
                    id: "check-usage-durability"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                criteria:
                  -
                    check_ids:
                      - "check-usage-durability"
                    description: "Provider-observed Codex usage is durably bound to dispatch, run, work-order, thread, and turn identity before semantic validation or result application can fail; malformed, duplicate, partial, and incomplete observations remain fail-closed and missing usage is never represented as zero."
                    id: "c-durable-usage"
                    required: true
                evidence_fingerprint: "sha256:2834fa5919976a5edc26310212c8c3fe25822fe0124f2bf73bc95e91a94f66d3"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-failed-usage"
                    - "check-telemetry-disposition"
                  description: "Evaluator success, timeout, nonzero exit, and malformed-result receipts retain every observed charge without changing verdict semantics; a saved valid verdict is reused, actual human_review still stops, and unknown finite-budget availability blocks further paid dispatch rather than replaying completed semantic work."
                  id: "c-evaluator-usage"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 260000
                optional_sources:
                  - "Existing evaluator recovery, budget, and malformed-result tests"
                required_sources:
                  - "packages/agentplane/src/commands/evaluator/evaluator-episode.ts"
                  - "packages/agentplane/src/commands/evaluator/evaluator-execute-supervisor.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                  - "packages/core/src/runner/supervisor-execution-episode.ts"
                symbol_hints:
                  - "EvaluatorEpisodeReceipt"
                  - "completePersistedEvaluatorEpisode"
                  - "human_review"
                  - "budget_exhausted"
              depends_on:
                - "ST-08"
              expected_outputs:
                - "failure-safe evaluator usage receipt"
                - "distinct telemetry and spend-admission disposition"
              id: "ST-09-17"
              objective: "Preserve evaluator charges on every provider outcome and separate semantic verdict reuse from telemetry coverage and further-spend admission."
              optional: false
              priority: 90
              required_inputs:
                - "durable provider-usage observation"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/evaluator"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/evaluator"
                - "packages/agentplane/src/commands/shared"
                - "packages/core/src/runner"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/evaluator/roadmap-failed-usage.test.ts"
                    id: "check-failed-usage"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/evaluator/roadmap-telemetry-disposition.test.ts"
                    id: "check-telemetry-disposition"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                criteria:
                  -
                    check_ids:
                      - "check-failed-usage"
                      - "check-telemetry-disposition"
                    description: "Evaluator success, timeout, nonzero exit, and malformed-result receipts retain every observed charge without changing verdict semantics; a saved valid verdict is reused, actual human_review still stops, and unknown finite-budget availability blocks further paid dispatch rather than replaying completed semantic work."
                    id: "c-evaluator-usage"
                    required: true
                evidence_fingerprint: "sha256:2834fa5919976a5edc26310212c8c3fe25822fe0124f2bf73bc95e91a94f66d3"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-managed-accounting"
                    - "check-external-accounting"
                  description: "Ordinary, kernel, and external PLANNER, CURATOR, EXECUTOR, and EVALUATOR attempts share the existing journal coverage model; replayed identities count once, formal CLI operations are not billable episodes, model-supplied token claims are ignored, and unattributable host turns stay explicitly unavailable or unallocatable."
                  id: "c-managed-external"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 300000
                optional_sources:
                  - "Existing managed supervisor and external exchange replay tests"
                required_sources:
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                  - "packages/core/src/runner/supervisor-execution-episode.ts"
                  - "packages/agentplane/src/commands/task/kernel-run.ts"
                  - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                  - "packages/agentplane/src/commands/task/agent-action-packet.ts"
                symbol_hints:
                  - "SupervisorExecutionEpisodeJournal"
                  - "provider_usage"
                  - "completeSupervisorExecutionEpisode"
                  - "applyAcceptedExternalAgentResult"
              depends_on:
                - "ST-09-17"
              expected_outputs:
                - "managed role and attempt accounting"
                - "external exchange coverage accounting"
              id: "ST-10-11"
              objective: "Connect managed and external semantic attempts to the existing supervisor journal with trustworthy attribution or explicit unavailable coverage."
              optional: false
              priority: 80
              required_inputs:
                - "durable provider-usage observation"
                - "failure-safe evaluator usage receipt"
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
                  resource: "packages/core/src/runner"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/runner"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-managed-accounting.test.ts"
                    id: "check-managed-accounting"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-external-accounting.test.ts"
                    id: "check-external-accounting"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                criteria:
                  -
                    check_ids:
                      - "check-managed-accounting"
                      - "check-external-accounting"
                    description: "Ordinary, kernel, and external PLANNER, CURATOR, EXECUTOR, and EVALUATOR attempts share the existing journal coverage model; replayed identities count once, formal CLI operations are not billable episodes, model-supplied token claims are ignored, and unattributable host turns stay explicitly unavailable or unallocatable."
                    id: "c-managed-external"
                    required: true
                evidence_fingerprint: "sha256:2834fa5919976a5edc26310212c8c3fe25822fe0124f2bf73bc95e91a94f66d3"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-cost-rollup"
                  description: "A diagnostic task rollup reconciles unique source observations, including failures, into dispatched, observed, partial, unavailable, role, and attempt coverage; cached input and reasoning remain subsets and unknown portions prevent a complete numeric total."
                  id: "c-task-rollup"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 220000
                optional_sources:
                  - "Existing agent-efficiency baseline and replay source semantics"
                required_sources:
                  - "packages/core/src/runner/supervisor-execution-episode.ts"
                  - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
                symbol_hints:
                  - "token_usage"
                  - "provider_usage"
                  - "token_observed_agent_runs"
              depends_on:
                - "ST-10-11"
              expected_outputs:
                - "diagnostic task cost rollup"
                - "source-observation reconciliation tests"
              id: "ST-12"
              objective: "Derive a read-only task cost and coverage rollup from unique supervisor journal observations."
              optional: false
              priority: 70
              required_inputs:
                - "managed role and attempt accounting"
                - "external exchange coverage accounting"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/lib/agent-efficiency-repository-snapshot.mjs"
              risk: "medium"
              scope_roots:
                - "packages/core/src/runner"
                - "scripts/bench"
                - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node --test scripts/bench/task-cost-rollup.test.mjs"
                    id: "check-cost-rollup"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                criteria:
                  -
                    check_ids:
                      - "check-cost-rollup"
                    description: "A diagnostic task rollup reconciles unique source observations, including failures, into dispatched, observed, partial, unavailable, role, and attempt coverage; cached input and reasoning remain subsets and unknown portions prevent a complete numeric total."
                    id: "c-task-rollup"
                    required: true
                evidence_fingerprint: "sha256:2834fa5919976a5edc26310212c8c3fe25822fe0124f2bf73bc95e91a94f66d3"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-stage-timing"
                  description: "Lifecycle timing uses bounded monotonic parent and child spans for preparation, semantic dispatch, first observed scoped mutation, native verification, review, provider or integration, verified state, closure, local work, USER wait, and external wait without overlap double-counting or negative elapsed durations."
                  id: "c-stage-timing"
                  required: true
                -
                  check_ids:
                    - "check-typecheck"
                    - "check-schemas"
                    - "check-artifacts"
                    - "check-critical"
                    - "check-full-ci"
                  description: "The implementation preserves I01-I12 and C01-C08, stores no provider payloads or secrets in canonical task text, adds no second mutable aggregate, and passes type, schema, generated-artifact, critical, and full local CI checks."
                  id: "c-regression"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 300000
                optional_sources:
                  - "Existing monotonic wait and duration helpers"
                required_sources:
                  - "packages/agentplane/src/commands/task/advance.command.ts"
                  - "packages/agentplane/src/commands/task/direct-task-supervisor.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
                  - "packages/core/src/runner/supervisor-execution-episode.ts"
                symbol_hints:
                  - "started_at"
                  - "completed_at"
                  - "duration_ms"
                  - "performance.now"
              depends_on:
                - "ST-10-11"
              expected_outputs:
                - "lifecycle stage timing observations"
                - "clock and overlap regression coverage"
              id: "ST-13"
              objective: "Attach non-overlapping monotonic lifecycle spans to existing supervisor and task transition boundaries."
              optional: false
              priority: 60
              required_inputs:
                - "managed role and attempt accounting"
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
                  resource: "packages/core/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/lib/test-route-registry.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/lib/test-route-registry.test.mjs"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/core/src/runner"
                - "scripts/lib/test-route-registry.mjs"
                - "scripts/lib/test-route-registry.test.mjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-stage-timing.test.ts"
                    id: "check-stage-timing"
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
                    command: "bun run ci:local:full"
                    id: "check-full-ci"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                criteria:
                  -
                    check_ids:
                      - "check-stage-timing"
                    description: "Lifecycle timing uses bounded monotonic parent and child spans for preparation, semantic dispatch, first observed scoped mutation, native verification, review, provider or integration, verified state, closure, local work, USER wait, and external wait without overlap double-counting or negative elapsed durations."
                    id: "c-stage-timing"
                    required: true
                  -
                    check_ids:
                      - "check-typecheck"
                      - "check-schemas"
                      - "check-artifacts"
                      - "check-critical"
                      - "check-full-ci"
                    description: "The implementation preserves I01-I12 and C01-C08, stores no provider payloads or secrets in canonical task text, adds no second mutable aggregate, and passes type, schema, generated-artifact, critical, and full local CI checks."
                    id: "c-regression"
                    required: true
                evidence_fingerprint: "sha256:2834fa5919976a5edc26310212c8c3fe25822fe0124f2bf73bc95e91a94f66d3"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609121424-T83XJA"
    event_cursor: 8
    final_validation: null
    id: "202609121424-T83XJA"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "node --test scripts/bench/task-cost-rollup.test.mjs"
          id: "legacy-1"
          required: true
      captured_at: "2026-09-12T14:24:46.251Z"
      constraints: []
      request: |-
        Implement durable 0.7.9 usage, cost, and latency accounting for ST-08 through ST-13 and ST-17

        Source contract: agentplane-roadmap-r2 cards ST-08, ST-09, ST-10, ST-11, ST-12, ST-13, and ST-17. Capture Codex usage durably before semantic-result validation, preserve evaluator charges on failure, connect managed observations to the existing journal, account for external episodes without trusting self-reported tokens, roll up task cost from source observations, partition lifecycle latency without double counting, and separate missing telemetry from semantic quality and further-spend admission. Missing usage is unknown, never zero. A valid saved verdict is reused, while unknown budget blocks additional paid dispatch. Preserve I01-I12 and C01-C08. Do not create a second accounting store or trust model-supplied usage. The roadmap directory is source-only and must never be committed. Required checks: the focused ST-08 through ST-13 and ST-17 test commands, related runner/evaluator/task critical suites, typecheck, schema/mirror checks.
      task_id: "202609121424-T83XJA"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 13
    schema_version: 1
    updated_at: "2026-09-12T21:53:34.658Z"
    work_items:
      ST-08:
        attempt: 1
        claim_id: null
        id: "ST-08"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:182fbc00c51151eb7ac85f9fcff8935a6c25782312250e9add022fb7245af047"
            id: "durable provider-usage observation"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609121424-T83XJA"
              work_item_id: "ST-08"
            provenance:
              - "sha256:28f061181ae9451fab372946f441cccd023d4d67086b4b81fad0b253689258cf"
              - ".agentplane/tasks/202609121424-T83XJA/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0d61a3383351e2bf72788e9935ecef6c428817bd1e3ba3fb337c45adeee022ae"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:a97b1fa8d94360e2bf7289c54c758a48c45c3937868e85d8a17ae27b4f8d3367"
            id: "usage durability regression coverage"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609121424-T83XJA"
              work_item_id: "ST-08"
            provenance:
              - "sha256:28f061181ae9451fab372946f441cccd023d4d67086b4b81fad0b253689258cf"
              - ".agentplane/tasks/202609121424-T83XJA/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:0d61a3383351e2bf72788e9935ecef6c428817bd1e3ba3fb337c45adeee022ae"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-T83XJA/supervision/declared-checks.json"
              check_id: "check-usage-durability"
              command_identity: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-usage-durability.test.ts"
              detail: "Observed by bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-usage-durability.test.ts."
              exit_code: 0
              observed_at: "2026-09-12T21:05:51.409Z"
              repository_snapshot_digest: "sha256:0d61a3383351e2bf72788e9935ecef6c428817bd1e3ba3fb337c45adeee022ae"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      ST-09-17:
        attempt: 0
        claim_id: null
        id: "ST-09-17"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      ST-10-11:
        attempt: 0
        claim_id: null
        id: "ST-10-11"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      ST-12:
        attempt: 0
        claim_id: null
        id: "ST-12"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      ST-13:
        attempt: 0
        claim_id: null
        id: "ST-13"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-12T21:05:51.415Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:50c7572de2587690611abb903dca0395395e5408fe8a07a2e015de4bd4943408"
        entity: "work_item"
        id: "event_b05a355c24e95e362d9179ed"
        mutation_id: "external-result:work-order-202609121424-T83XJA-executor-884458ec85c3b7ccb98fa5d5"
        plan_digest: "sha256:106b3c2da2bc74b7f6f834e120c1d7a3337e9bf54034809cf9f4af86f6d2ee92"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-T83XJA"
        task_revision: 10
        work_item_id: "ST-08"
    leases: []
    mutation_receipts:
      compatibility:sha256:1d87dc53ea2b6bcc2dab3735027c416e17d4d12335c5d63beb0800076b6f22b4:
        aggregate_digest: "sha256:84c73bf03db834958805bfeba0ec0e8dfc2fca2a177528548b19097084c5e88a"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T21:53:34.658Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_550e1c8d468a3da5b833bdf9"
          mutation_id: "compatibility:sha256:1d87dc53ea2b6bcc2dab3735027c416e17d4d12335c5d63beb0800076b6f22b4"
          plan_digest: "sha256:106b3c2da2bc74b7f6f834e120c1d7a3337e9bf54034809cf9f4af86f6d2ee92"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-T83XJA"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:1d87dc53ea2b6bcc2dab3735027c416e17d4d12335c5d63beb0800076b6f22b4"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609121424-T83XJA"
      compatibility:sha256:21834f0498a19d86afa466d2078079b40226245f2f33156d9ee0043e54896245:
        aggregate_digest: "sha256:e79eb13b6c3a73bc99330327fdb487edc94f71debec244ae4cf2ffdc69d4568f"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T21:53:34.658Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c90efe1ed34679f346463b34"
          mutation_id: "compatibility:sha256:21834f0498a19d86afa466d2078079b40226245f2f33156d9ee0043e54896245"
          plan_digest: "sha256:106b3c2da2bc74b7f6f834e120c1d7a3337e9bf54034809cf9f4af86f6d2ee92"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-T83XJA"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:21834f0498a19d86afa466d2078079b40226245f2f33156d9ee0043e54896245"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609121424-T83XJA"
      compatibility:sha256:2a7abd5862669c621273d37579d7070cf2fabdf5d7a57c99e0ab60887590b969:
        aggregate_digest: "sha256:039f50fd762cbb7a9f5dd2a3fa92e4da14041bbd9c45ef6145844ee6a9ca199b"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T20:52:28.936Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_78bd65fec75b4bd897686f7c"
          mutation_id: "compatibility:sha256:2a7abd5862669c621273d37579d7070cf2fabdf5d7a57c99e0ab60887590b969"
          plan_digest: "sha256:106b3c2da2bc74b7f6f834e120c1d7a3337e9bf54034809cf9f4af86f6d2ee92"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-T83XJA"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:2a7abd5862669c621273d37579d7070cf2fabdf5d7a57c99e0ab60887590b969"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609121424-T83XJA"
      compatibility:sha256:49c3f02c8a83aded731aa3992628ba9d6c9603fe3b1eba55ace642314b7ef2a6:
        aggregate_digest: "sha256:4e6ce0a3677195cb06ce0f9e5114ff1c40a9e104d2f2076d68cbbf95a018afab"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T21:05:43.731Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_33c7dfc143b3629ec405bd2a"
          mutation_id: "compatibility:sha256:49c3f02c8a83aded731aa3992628ba9d6c9603fe3b1eba55ace642314b7ef2a6"
          plan_digest: "sha256:106b3c2da2bc74b7f6f834e120c1d7a3337e9bf54034809cf9f4af86f6d2ee92"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-T83XJA"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:49c3f02c8a83aded731aa3992628ba9d6c9603fe3b1eba55ace642314b7ef2a6"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609121424-T83XJA"
      compatibility:sha256:530f778b2eee33b90311d3541ba31e828d4794030c2220ee60b83f740f7c140a:
        aggregate_digest: "sha256:c75330106b1c9306ca1d897737f717f150a475c957a4d0c46c89a2b31e67618f"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T19:28:39.808Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_8a5afeaae9773bf7dd50ef53"
          mutation_id: "compatibility:sha256:530f778b2eee33b90311d3541ba31e828d4794030c2220ee60b83f740f7c140a"
          plan_digest: "sha256:106b3c2da2bc74b7f6f834e120c1d7a3337e9bf54034809cf9f4af86f6d2ee92"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-T83XJA"
          task_revision: 3
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:530f778b2eee33b90311d3541ba31e828d4794030c2220ee60b83f740f7c140a"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609121424-T83XJA"
      compatibility:sha256:a142cb7e9a87850293d82114cf1b8f81581ef826623b118d686407b4f0dd65b3:
        aggregate_digest: "sha256:31fb6f46940b58dd392bec69efd1ae24f3e279d9b176712116ec6c7e070b4d8e"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T19:28:39.812Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_484a885590a3245e276dcc3b"
          mutation_id: "compatibility:sha256:a142cb7e9a87850293d82114cf1b8f81581ef826623b118d686407b4f0dd65b3"
          plan_digest: "sha256:106b3c2da2bc74b7f6f834e120c1d7a3337e9bf54034809cf9f4af86f6d2ee92"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-T83XJA"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a142cb7e9a87850293d82114cf1b8f81581ef826623b118d686407b4f0dd65b3"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609121424-T83XJA"
      compatibility:sha256:d75e1378750895149a188c2f38782a52ee3f8f7cb2e8a5ba1423551701b958d8:
        aggregate_digest: "sha256:18b15077d91cdc62faae07ca85aa0b3a1b9c6c9a5dca0a12135af41dc173fc90"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T19:28:39.812Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_86841aed390be044100d9d68"
          mutation_id: "compatibility:sha256:d75e1378750895149a188c2f38782a52ee3f8f7cb2e8a5ba1423551701b958d8"
          plan_digest: "sha256:106b3c2da2bc74b7f6f834e120c1d7a3337e9bf54034809cf9f4af86f6d2ee92"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-T83XJA"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d75e1378750895149a188c2f38782a52ee3f8f7cb2e8a5ba1423551701b958d8"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609121424-T83XJA"
      compatibility:sha256:f8b5d4517e4d07b36165caab592c7815c8ea3834fc0369384f140d2bedb25638:
        aggregate_digest: "sha256:ca73a20338536d24653d415b2ec411bd208c8c9827460601bc2c235b6d113a7a"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T21:05:43.731Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_986b1d8a9fa87b270147e038"
          mutation_id: "compatibility:sha256:f8b5d4517e4d07b36165caab592c7815c8ea3834fc0369384f140d2bedb25638"
          plan_digest: "sha256:106b3c2da2bc74b7f6f834e120c1d7a3337e9bf54034809cf9f4af86f6d2ee92"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-T83XJA"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f8b5d4517e4d07b36165caab592c7815c8ea3834fc0369384f140d2bedb25638"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609121424-T83XJA"
      external-result:work-order-202609121424-T83XJA-executor-884458ec85c3b7ccb98fa5d5:
        aggregate_digest: "sha256:dc9cc3f8e83b95e4ce9f26dc17e700be9274607ca0376014c14c247b8c7c4269"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T21:05:51.415Z"
          cause_refs:
            - "semantic-result:sha256:50c7572de2587690611abb903dca0395395e5408fe8a07a2e015de4bd4943408"
          entity: "work_item"
          from: "READY"
          id: "event_b05a355c24e95e362d9179ed"
          mutation_id: "external-result:work-order-202609121424-T83XJA-executor-884458ec85c3b7ccb98fa5d5"
          plan_digest: "sha256:106b3c2da2bc74b7f6f834e120c1d7a3337e9bf54034809cf9f4af86f6d2ee92"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-T83XJA"
          task_revision: 10
          to: "COMPLETED"
          work_item_id: "ST-08"
        mutation_id: "external-result:work-order-202609121424-T83XJA-executor-884458ec85c3b7ccb98fa5d5"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609121424-T83XJA"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "0a6612ae197108023d7d4927b0e0042167bc2a56"
  task_execution_context:
    base_ref: "main"
    base_sha: "1f8b58d52ade59dd6185af72b00f70bb6194bdb0"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_planning_base_recovery:
    branch: "task/202609121424-T83XJA/implement-durable-0-7-9-usage-cost-and-latency-a"
    from_sha: "1f8b58d52ade59dd6185af72b00f70bb6194bdb0"
    observed_head: "1f8b58d52ade59dd6185af72b00f70bb6194bdb0"
    plan_digest: "sha256:106b3c2da2bc74b7f6f834e120c1d7a3337e9bf54034809cf9f4af86f6d2ee92"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    revision: 6
    schema_version: 1
    state: "applied"
    target_sha: "1f8b58d52ade59dd6185af72b00f70bb6194bdb0"
    task_id: "202609121424-T83XJA"
    token: "sha256:db898e1d5ff6aed032a9c40bb2a8fee359b816a8068c11461d47cf2ec7c45e3d"
    worktree: "/Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609121424-T83XJA-implement-durable-0-7-9-usage-cost-and-latency-a"
  workflow_route_baseline:
    start_head_sha: "1f8b58d52ade59dd6185af72b00f70bb6194bdb0"
    version: 1
id_source: "generated"
---
## Summary

Implement durable 0.7.9 usage, cost, and latency accounting for ST-08 through ST-13 and ST-17

Source contract: agentplane-roadmap-r2 cards ST-08, ST-09, ST-10, ST-11, ST-12, ST-13, and ST-17. Capture Codex usage durably before semantic-result validation, preserve evaluator charges on failure, connect managed observations to the existing journal, account for external episodes without trusting self-reported tokens, roll up task cost from source observations, partition lifecycle latency without double counting, and separate missing telemetry from semantic quality and further-spend admission. Missing usage is unknown, never zero. A valid saved verdict is reused, while unknown budget blocks additional paid dispatch. Preserve I01-I12 and C01-C08. Do not create a second accounting store or trust model-supplied usage. The roadmap directory is source-only and must never be committed. Required checks: the focused ST-08 through ST-13 and ST-17 test commands, related runner/evaluator/task critical suites, typecheck, schema/mirror checks.

## Scope

- In scope: Source contract: agentplane-roadmap-r2 cards ST-08, ST-09, ST-10, ST-11, ST-12, ST-13, and ST-17. Capture Codex usage durably before semantic-result validation, preserve evaluator charges on failure, connect managed observations to the existing journal, account for external episodes without trusting self-reported tokens, roll up task cost from source observations, partition lifecycle latency without double counting, and separate missing telemetry from semantic quality and further-spend admission. Missing usage is unknown, never zero. A valid saved verdict is reused, while unknown budget blocks additional paid dispatch. Preserve I01-I12 and C01-C08. Do not create a second accounting store or trust model-supplied usage. The roadmap directory is source-only and must never be committed. Required checks: the focused ST-08 through ST-13 and ST-17 test commands, related runner/evaluator/task critical suites, typecheck, schema/mirror checks.
- Out of scope: unrelated refactors not required for "Implement durable 0.7.9 usage, cost, and latency accounting for ST-08 through ST-13 and ST-17".

## Plan

Defined five dependency-ordered WorkItems for durable usage, accounting, cost rollup, latency, and spend admission.

## Verify Steps

1. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/runner/adapters/roadmap-usage-durability.test.ts`; require durable identity-bound provider usage before semantic validation, deduplication, and partial or unavailable coverage instead of implicit zero.
2. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/evaluator/roadmap-failed-usage.test.ts`; require observed evaluator charges to survive timeout, nonzero exit, malformed results, and recovery.
3. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/shared/roadmap-managed-accounting.test.ts`; require all managed roles and attempts to use the existing journal exactly once without classifying CLI operations as billable dispatches.
4. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-external-accounting.test.ts`; require external role coverage, idempotent replay, rejection of model-supplied token claims, and explicit unavailable or unallocatable attribution.
5. Run `node --test scripts/bench/task-cost-rollup.test.mjs`; require nonzero test discovery and exact reconciliation of unique observed, partial, unavailable, failed, role, and attempt records without adding cache or reasoning subsets twice.
6. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/task/roadmap-stage-timing.test.ts`; require monotonic parent and child stage spans, separate local, USER-wait, and external-wait time, no overlap double count, and no negative elapsed duration.
7. Run `bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/commands/evaluator/roadmap-telemetry-disposition.test.ts`; require saved valid verdict reuse, a hard stop before unproven further paid spend, and unchanged actual human_review semantics.
8. Run `bun run typecheck`; require success.
9. Run `bun run schemas:check`; require persisted and public schema mirrors to be current.
10. Run `bun run artifacts:check`; require generated artifacts to be current.
11. Run `bun run test:critical`; require existing authority, stale-state, recovery, evaluator, runner, and task negative cases to remain green.
12. Run `bun run ci:local:full`; require the full local CI route to pass.
13. Review `git diff` and `git status --short --untracked-files=all`; require no roadmap file, raw provider payload, secret, second accounting store, unrelated task artifact, generated drift, or unintended path in the task change.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
