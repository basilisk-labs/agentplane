---
id: "202609121424-3YAX44"
title: "Add the 0.7.9 marginal-cost and paired production benchmark harness for ST-14 through ST-16"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 17
origin:
  system: "manual"
depends_on:
  - "202609121423-9WPTCW"
  - "202609121424-T83XJA"
tags:
  - "code"
  - "release-0.7.9"
  - "roadmap-st-14-16"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
verify:
  - "node --test scripts/bench/paired-production-driver.test.mjs"
  - "node --test scripts/bench/paired-result-report.test.mjs"
  - "node --test scripts/bench/task-marginal-cost.test.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-13T07:44:10.401Z"
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
      - "scripts/bench"
      - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The existing task is branch_pr and the new claim gate requires hosted integration before release qualification."
      - "The implementation and all required checks use offline fixtures and do not execute paid provider calls."
      - "The task changes benchmark contracts and adds deterministic regression tests, so it requires source_code and tests authority."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "scripts/bench"
      - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
  observed:
    authority_violations: []
    changed_components:
      - "scripts"
    changed_paths:
      - "scripts/bench/paired-production-driver.mjs"
      - "scripts/bench/paired-production-driver.test.mjs"
      - "scripts/bench/paired-result-report.mjs"
      - "scripts/bench/paired-result-report.test.mjs"
      - "scripts/bench/task-marginal-cost.test.mjs"
      - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "verification-record"
        result: "pass"
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
          - "scripts/bench"
          - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
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
      digest: "sha256:bcc0ae60806f9caa539f1726df48e27cb68e727ec6761fcfcdd9ded65b45c2e0"
      escalation_reasons:
        - "central_component:scripts/lib/agent-efficiency-repository-snapshot.mjs"
        - "central_path:scripts/lib/agent-efficiency-repository-snapshot.mjs"
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
          - "scripts/bench/paired-result-report.mjs"
          - "scripts/bench/paired-result-report.test.mjs"
          - "scripts/bench/task-marginal-cost.test.mjs"
          - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
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
commit:
  hash: "9e32b1b8a9c75d1b20541637d2cdb3c9d7ec3b0a"
  message: "🚧 3YAX44 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed at 0cc76b3c323da62a9c18eb946438e49e5d6c204a after focused checks and full local CI passed."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 31a8959fee6a. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: e2bedfbf83b7. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 9e32b1b8a9c7. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-13T08:00:01.265Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-09-13T08:39:05.585Z"
    author: "CODER"
    state: "ok"
    note: "Verified committed implementation 0cc76b3c323d; all selected local checks passed and no paid provider call was executed."
  -
    type: "status"
    at: "2026-09-13T08:39:37.088Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed at 0cc76b3c323da62a9c18eb946438e49e5d6c204a after focused checks and full local CI passed."
    commit: "0cc76b3c323da62a9c18eb946438e49e5d6c204a"
  -
    type: "status"
    at: "2026-09-13T15:25:33.924Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 31a8959fee6a. CLI accepted one state-bound external-agent semantic result."
    commit: "31a8959fee6aa84f518efb530adf85a04279d07b"
  -
    type: "status"
    at: "2026-09-13T15:26:58.772Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: e2bedfbf83b7. CLI accepted one state-bound external-agent semantic result."
    commit: "e2bedfbf83b765e5a31831bbb2b2b2e40f312287"
  -
    type: "status"
    at: "2026-09-13T15:28:57.195Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 9e32b1b8a9c7. CLI accepted one state-bound external-agent semantic result."
    commit: "9e32b1b8a9c75d1b20541637d2cdb3c9d7ec3b0a"
doc_version: 3
doc_updated_at: "2026-09-13T15:28:57.195Z"
doc_updated_by: "SUPERVISOR"
description: "Source contract: agentplane-roadmap-r2 cards ST-14, ST-15, and ST-16. Measure marginal Git and artifact cost in the existing fixture harness, add one production-path paired driver using current isolation and evidence utilities, and report all-attempt cost per independently verified success with paired outcomes, success and violation rates, stage distributions, coverage, and uncertainty. Enforce matched target tree, product artifacts, model, effort, authority, checks, retries, runtime profile, verifier, and raw cost. Managed and external modes remain stratified. Unknown charges prevent a complete numeric claim; all-failed arms yield no finite success score. Do not execute paid calls in this task and do not reinterpret historical baselines. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/bench/task-marginal-cost.test.mjs; node --test scripts/bench/paired-production-driver.test.mjs; node --test scripts/bench/paired-result-report.test.mjs; existing benchmark replay checks and relevant release critical checks."
sections:
  Summary: |-
    Add the 0.7.9 marginal-cost and paired production benchmark harness for ST-14 through ST-16

    Source contract: agentplane-roadmap-r2 cards ST-14, ST-15, and ST-16. Measure marginal Git and artifact cost in the existing fixture harness, add one production-path paired driver using current isolation and evidence utilities, and report all-attempt cost per independently verified success with paired outcomes, success and violation rates, stage distributions, coverage, and uncertainty. Enforce matched target tree, product artifacts, model, effort, authority, checks, retries, runtime profile, verifier, and raw cost. Managed and external modes remain stratified. Unknown charges prevent a complete numeric claim; all-failed arms yield no finite success score. Do not execute paid calls in this task and do not reinterpret historical baselines. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/bench/task-marginal-cost.test.mjs; node --test scripts/bench/paired-production-driver.test.mjs; node --test scripts/bench/paired-result-report.test.mjs; existing benchmark replay checks and relevant release critical checks.
  Scope: |-
    - In scope: Source contract: agentplane-roadmap-r2 cards ST-14, ST-15, and ST-16. Measure marginal Git and artifact cost in the existing fixture harness, add one production-path paired driver using current isolation and evidence utilities, and report all-attempt cost per independently verified success with paired outcomes, success and violation rates, stage distributions, coverage, and uncertainty. Enforce matched target tree, product artifacts, model, effort, authority, checks, retries, runtime profile, verifier, and raw cost. Managed and external modes remain stratified. Unknown charges prevent a complete numeric claim; all-failed arms yield no finite success score. Do not execute paid calls in this task and do not reinterpret historical baselines. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/bench/task-marginal-cost.test.mjs; node --test scripts/bench/paired-production-driver.test.mjs; node --test scripts/bench/paired-result-report.test.mjs; existing benchmark replay checks and relevant release critical checks.
    - Out of scope: unrelated refactors not required for "Add the 0.7.9 marginal-cost and paired production benchmark harness for ST-14 through ST-16".
  Plan: "Defined three dependency-ordered WorkItems for marginal task cost, a provider-free paired production driver, and fail-closed cost-per-verified-result reporting."
  Verify Steps: |-
    1. Run `node --test scripts/bench/task-marginal-cost.test.mjs`. Expected: marginal task-path, Git-object, commit, write, tool, and control-plane metrics are reproducible and duplicate blobs are counted once.
    2. Run `node --test scripts/bench/paired-production-driver.test.mjs`. Expected: the offline three-arm driver uses production entrypoints and rejects mismatched target, product, runtime, authority, verifier, retry, or cost identity.
    3. Run `node --test scripts/bench/paired-result-report.test.mjs`. Expected: all-attempt cost, paired outcomes, coverage, uncertainty, and separate gates fail closed for unknown charge or all-failed arms.
    4. Run `bun run bench:agent-efficiency:replay:check`. Expected: existing immutable replay evidence remains valid.
    5. Run `bun run test:agent-efficiency:qualification`. Expected: the established qualification suite passes with nonzero discovery.
    6. Run `bun run bench:agent-efficiency:check`. Expected: historical baseline validation remains unchanged.
    7. Run `bun run typecheck`. Expected: repository TypeScript contracts remain valid.
    8. Compare the final diff with ST-14, ST-15, and ST-16. Expected: no paid provider call, historical-baseline rewrite, or committed agentplane-roadmap-r2 path.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-13T08:39:05.585Z — VERIFY — ok

    By: CODER

    Note: Verified committed implementation 0cc76b3c323d; all selected local checks passed and no paid provider call was executed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:93df6d7884039c4c5baee54698f9ffe9df351e6c3477958323f36c6d3dd52777, input_digest=sha256:a5f0583db996c2964a542bca9f7470e2bdab80266bd2dd9d761ccea8a8388633

    Details:

    Check: affected_unit_integration
    Command: node --test scripts/bench/task-marginal-cost.test.mjs scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs
    Result: pass
    Evidence: 13 focused tests passed on committed HEAD 0cc76b3c323da62a9c18eb946438e49e5d6c204a.
    Scope: ST-14 marginal cost, ST-15 paired driver, and ST-16 fail-closed report contracts.

    Check: critical_paths
    Command: bun run bench:agent-efficiency:replay:check && bun run test:agent-efficiency:qualification && bun run bench:agent-efficiency:check && bun run typecheck
    Result: pass
    Evidence: RF-04 replay 50 runs and 70 outcomes passed; qualification 61 tests passed; baseline 10 scenarios passed; TypeScript build passed.
    Scope: immutable benchmark, qualification, historical baseline, and type contracts.

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: full local CI passed on 0cc76b3c323d, including core, runtime, CLI, docs/schema, docs site, workflow lint, Windows-critical 98 tests, and significant coverage 101 tests.
    Scope: repository full local regression selected by the persisted verification contract.

    Check: task_outcome
    Command: git show --name-status 0cc76b3c323d^..0cc76b3c323d && git status --short
    Result: pass
    Evidence: task worktree is clean; the two task commits contain only the canonical 3YAX44 task artifacts and scoped scripts; agentplane-roadmap-r2 is absent; no paid provider call was executed.
    Scope: approved task outcome and source-only roadmap exclusion.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609121424-3YAX44-add-the-0-7-9-marginal-cost-and-paired-productio/.agentplane/tasks/202609121424-3YAX44/blueprint/resolved-snapshot.json
    - old_digest: fa5bda7326628d77818e5607d9c82965c639b2adaac875c2abf479a7f619d50f
    - current_digest: fa5bda7326628d77818e5607d9c82965c639b2adaac875c2abf479a7f619d50f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609121424-3YAX44

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

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
    digest: "sha256:b9f289de5c1423517cc4c36451b0c4706599737d79ad1d73460e63119622f868"
    grant_id: "5ecddcf0-7fe8-419a-adee-b4605b9ea44d"
    issued_at: "2026-09-13T07:44:10.401Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:a9c412fcb180ff74b6df56a1c14d5730619aaed9befde95bc4b08ef2de578d68"
    plan_revision: 4
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609121424-3YAX44"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-13T07:44:10.401Z"
        approved_by: "USER"
        approved_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-09-13T04:43:16.453Z"
      digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
      proposal:
        assumptions:
          - "Offline fake-provider records use the same production driver contract and independent oracle path but incur no paid calls."
          - "Historical RF-04 baseline artifacts remain immutable inputs and are never relabeled as current 0.7.9 efficiency evidence."
          - "A complete efficiency claim requires observed raw cost for every attempt in every compared arm."
        planning_baseline:
          captured_at: "2026-09-13T04:40:29.566Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:b8a926f1542322a3c4a2702de09d84a994e7795ee9680c1ff69e062b66495463"
          dirty_paths:
            - ".agentplane/tasks/202609072121-9VEHKH/README.md"
            - ".agentplane/tasks/202609080727-BAWTEE/README.md"
            - ".agentplane/tasks/202609121424-3YAX44/README.md"
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
          task_history_cursor: "task-revision:2"
        schema_version: 1
        task_id: "202609121424-3YAX44"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node --test scripts/bench/task-marginal-cost.test.mjs"
              id: "check-marginal-cost"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "node --test scripts/bench/paired-production-driver.test.mjs"
              id: "check-paired-driver"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "node --test scripts/bench/paired-result-report.test.mjs"
              id: "check-paired-report"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run bench:agent-efficiency:replay:check"
              id: "check-replay"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run test:agent-efficiency:qualification"
              id: "check-qualification"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run bench:agent-efficiency:check"
              id: "check-baseline"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
          criteria:
            -
              check_ids:
                - "check-marginal-cost"
              description: "A before-and-after fixture measurement excludes preexisting tasks and separately reports new task-path bytes, filesystem writes, unique Git blob bytes, duplicate paths, service-only commits, meaningful commits, tool calls, and control-plane calls; identical blobs at multiple paths count once as stored payload and timestamp-only changes are identified explicitly."
              id: "c-marginal-cost"
              required: true
            -
              check_ids:
                - "check-paired-driver"
              description: "One production-path driver reuses current disposable-repository, task-entrypoint, evidence, and oracle utilities for minimal-agent, previous-release, and candidate arms; it runs in offline fake-provider mode and enforces matched target tree, product artifacts, model, effort, authority, checks, retry policy, runtime profile, verifier, and raw cost while keeping managed and external transports stratified."
              id: "c-paired-driver"
              required: true
            -
              check_ids:
                - "check-paired-report"
              description: "The report includes every attempt cost in cost per independently verified success, pairs only equivalent successful outcomes, reports success and violation rates, stage distributions, coverage, and uncertainty, keeps safety, activation, and efficiency gates separate, rejects a complete numeric claim when any required charge is unknown, and emits no finite success score for an all-failed arm."
              id: "c-paired-report"
              required: true
            -
              check_ids:
                - "check-replay"
                - "check-qualification"
                - "check-baseline"
                - "check-typecheck"
              description: "The implementation preserves I01-I12 and C01-C08, performs no paid calls, does not reinterpret historical RF-04 baselines, and passes the existing replay, qualification, baseline, and type checks."
              id: "c-regression"
              required: true
          evidence_fingerprint: "sha256:b8a926f1542322a3c4a2702de09d84a994e7795ee9680c1ff69e062b66495463"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-marginal-cost"
                  description: "A before-and-after fixture measurement excludes preexisting tasks and separately reports new task-path bytes, filesystem writes, unique Git blob bytes, duplicate paths, service-only commits, meaningful commits, tool calls, and control-plane calls; identical blobs at multiple paths count once as stored payload and timestamp-only changes are identified explicitly."
                  id: "c-marginal-cost"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 220000
                optional_sources:
                  - "Existing repository snapshot and task cost rollup tests"
                required_sources:
                  - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
                  - "scripts/bench/run-agent-efficiency-codex-replay.mjs"
                symbol_hints:
                  - "measureRepositoryEfficiency"
                  - "rollupTaskCostFromSupervisorJournal"
                  - "snapshotFixtureEffects"
              depends_on: []
              expected_outputs:
                - "marginal task cost measurement"
                - "duplicate object and timestamp-only regressions"
              id: "ST-14"
              objective: "Extend the existing Git and artifact snapshot boundary with reproducible marginal cost measurements for one new fixture task."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/lib/agent-efficiency-repository-snapshot.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench/task-marginal-cost.test.mjs"
              risk: "medium"
              scope_roots:
                - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
                - "scripts/bench/task-marginal-cost.test.mjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node --test scripts/bench/task-marginal-cost.test.mjs"
                    id: "check-marginal-cost"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                criteria:
                  -
                    check_ids:
                      - "check-marginal-cost"
                    description: "A before-and-after fixture measurement excludes preexisting tasks and separately reports new task-path bytes, filesystem writes, unique Git blob bytes, duplicate paths, service-only commits, meaningful commits, tool calls, and control-plane calls; identical blobs at multiple paths count once as stored payload and timestamp-only changes are identified explicitly."
                    id: "c-marginal-cost"
                    required: true
                evidence_fingerprint: "sha256:b8a926f1542322a3c4a2702de09d84a994e7795ee9680c1ff69e062b66495463"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-paired-driver"
                  description: "One production-path driver reuses current disposable-repository, task-entrypoint, evidence, and oracle utilities for minimal-agent, previous-release, and candidate arms; it runs in offline fake-provider mode and enforces matched target tree, product artifacts, model, effort, authority, checks, retry policy, runtime profile, verifier, and raw cost while keeping managed and external transports stratified."
                  id: "c-paired-driver"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 420000
                optional_sources:
                  - "Existing agent-efficiency candidate and replay qualification tests"
                required_sources:
                  - "scripts/bench/capture-agent-efficiency-candidate.mjs"
                  - "scripts/bench/run-agent-efficiency-codex-replay.mjs"
                  - "scripts/bench/internal/agent-efficiency-driver-contract.mjs"
                  - "scripts/bench/internal/agent-efficiency-fixture-effects.mjs"
                  - "scripts/lib/agent-efficiency-replay.mjs"
                symbol_hints:
                  - "withDisposableCandidateRepository"
                  - "runCandidateCaptureJobs"
                  - "createCandidateHarnessManifest"
                  - "readReplayDriverContract"
                  - "runReplayDriver"
              depends_on:
                - "ST-14"
              expected_outputs:
                - "paired production campaign contract"
                - "offline three-arm driver regression"
              id: "ST-15"
              objective: "Add a provider-free paired production driver for minimal-agent, previous-release, and candidate arms by composing the existing RF-04 isolation and evidence contracts."
              optional: false
              priority: 90
              required_inputs:
                - "marginal task cost measurement"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
              risk: "high"
              scope_roots:
                - "scripts/bench/capture-agent-efficiency-candidate.mjs"
                - "scripts/bench/run-agent-efficiency-codex-replay.mjs"
                - "scripts/bench/internal/agent-efficiency-driver-contract.mjs"
                - "scripts/bench/paired-production-driver.mjs"
                - "scripts/bench/paired-production-driver.test.mjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node --test scripts/bench/paired-production-driver.test.mjs"
                    id: "check-paired-driver"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "check-paired-driver"
                    description: "One production-path driver reuses current disposable-repository, task-entrypoint, evidence, and oracle utilities for minimal-agent, previous-release, and candidate arms; it runs in offline fake-provider mode and enforces matched target tree, product artifacts, model, effort, authority, checks, retry policy, runtime profile, verifier, and raw cost while keeping managed and external transports stratified."
                    id: "c-paired-driver"
                    required: true
                evidence_fingerprint: "sha256:b8a926f1542322a3c4a2702de09d84a994e7795ee9680c1ff69e062b66495463"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-paired-report"
                  description: "The report includes every attempt cost in cost per independently verified success, pairs only equivalent successful outcomes, reports success and violation rates, stage distributions, coverage, and uncertainty, keeps safety, activation, and efficiency gates separate, rejects a complete numeric claim when any required charge is unknown, and emits no finite success score for an all-failed arm."
                  id: "c-paired-report"
                  required: true
                -
                  check_ids:
                    - "check-replay"
                    - "check-qualification"
                    - "check-baseline"
                    - "check-typecheck"
                  description: "The implementation preserves I01-I12 and C01-C08, performs no paid calls, does not reinterpret historical RF-04 baselines, and passes the existing replay, qualification, baseline, and type checks."
                  id: "c-regression"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 360000
                optional_sources:
                  - "Existing qualification packet RF-04 comparison and paired latency gates"
                required_sources:
                  - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
                  - "scripts/bench/capture-agent-efficiency-candidate.mjs"
                  - "scripts/bench/paired-production-driver.mjs"
                symbol_hints:
                  - "buildCandidateMeasurement"
                  - "blockingCandidateFailureIds"
                  - "runtime_profile"
                  - "paired_comparison"
              depends_on:
                - "ST-15"
              expected_outputs:
                - "paired cost-per-verified-result report"
                - "fail-closed claim gate regression"
              id: "ST-16"
              objective: "Build the paired cost-per-verified-result report and separate safety, activation, and efficiency claim gates from all-attempt campaign evidence."
              optional: false
              priority: 80
              required_inputs:
                - "paired production campaign contract"
                - "marginal task cost measurement"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/lib/agent-efficiency-repository-snapshot.mjs"
              risk: "high"
              scope_roots:
                - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
                - "scripts/bench/capture-agent-efficiency-candidate.mjs"
                - "scripts/bench/paired-result-report.mjs"
                - "scripts/bench/paired-result-report.test.mjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node --test scripts/bench/paired-result-report.test.mjs"
                    id: "check-paired-report"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run bench:agent-efficiency:replay:check"
                    id: "check-replay"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run test:agent-efficiency:qualification"
                    id: "check-qualification"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run bench:agent-efficiency:check"
                    id: "check-baseline"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "check-typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "check-paired-report"
                    description: "The report includes every attempt cost in cost per independently verified success, pairs only equivalent successful outcomes, reports success and violation rates, stage distributions, coverage, and uncertainty, keeps safety, activation, and efficiency gates separate, rejects a complete numeric claim when any required charge is unknown, and emits no finite success score for an all-failed arm."
                    id: "c-paired-report"
                    required: true
                  -
                    check_ids:
                      - "check-replay"
                      - "check-qualification"
                      - "check-baseline"
                      - "check-typecheck"
                    description: "The implementation preserves I01-I12 and C01-C08, performs no paid calls, does not reinterpret historical RF-04 baselines, and passes the existing replay, qualification, baseline, and type checks."
                    id: "c-regression"
                    required: true
                evidence_fingerprint: "sha256:b8a926f1542322a3c4a2702de09d84a994e7795ee9680c1ff69e062b66495463"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609121424-3YAX44"
    event_cursor: 12
    final_validation: null
    id: "202609121424-3YAX44"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "node --test scripts/bench/paired-production-driver.test.mjs"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "node --test scripts/bench/paired-result-report.test.mjs"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "node --test scripts/bench/task-marginal-cost.test.mjs"
          id: "legacy-3"
          required: true
      captured_at: "2026-09-12T14:24:49.603Z"
      constraints: []
      request: |-
        Add the 0.7.9 marginal-cost and paired production benchmark harness for ST-14 through ST-16

        Source contract: agentplane-roadmap-r2 cards ST-14, ST-15, and ST-16. Measure marginal Git and artifact cost in the existing fixture harness, add one production-path paired driver using current isolation and evidence utilities, and report all-attempt cost per independently verified success with paired outcomes, success and violation rates, stage distributions, coverage, and uncertainty. Enforce matched target tree, product artifacts, model, effort, authority, checks, retries, runtime profile, verifier, and raw cost. Managed and external modes remain stratified. Unknown charges prevent a complete numeric claim; all-failed arms yield no finite success score. Do not execute paid calls in this task and do not reinterpret historical baselines. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/bench/task-marginal-cost.test.mjs; node --test scripts/bench/paired-production-driver.test.mjs; node --test scripts/bench/paired-result-report.test.mjs; existing benchmark replay checks and relevant release critical checks.
      task_id: "202609121424-3YAX44"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 17
    schema_version: 1
    updated_at: "2026-09-13T15:28:57.195Z"
    work_items:
      ST-14:
        attempt: 1
        claim_id: null
        id: "ST-14"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:bafb088cd1cc61ce99073b7f595dea50d3a9e3a57672dfea085f066299b799a0"
            id: "marginal task cost measurement"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609121424-3YAX44"
              work_item_id: "ST-14"
            provenance:
              - "sha256:3779dbbff23e3acc6c0ebf4c333d84018f46e345428d6de8851bcced23bd4b01"
              - ".agentplane/tasks/202609121424-3YAX44/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:cfc4d546527d49a3b575fbc30ee070464836c8353094a513820df4d571b44d77"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:dc15752dc03058549fb7b127f2b1675b9210d8c0476602f48b9c97af7adfc372"
            id: "duplicate object and timestamp-only regressions"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609121424-3YAX44"
              work_item_id: "ST-14"
            provenance:
              - "sha256:3779dbbff23e3acc6c0ebf4c333d84018f46e345428d6de8851bcced23bd4b01"
              - ".agentplane/tasks/202609121424-3YAX44/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:cfc4d546527d49a3b575fbc30ee070464836c8353094a513820df4d571b44d77"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-3YAX44/supervision/declared-checks.json"
              check_id: "check-marginal-cost"
              command_identity: "node --test scripts/bench/task-marginal-cost.test.mjs"
              detail: "Observed by node --test scripts/bench/task-marginal-cost.test.mjs."
              exit_code: 0
              observed_at: "2026-09-13T15:25:37.552Z"
              repository_snapshot_digest: "sha256:cfc4d546527d49a3b575fbc30ee070464836c8353094a513820df4d571b44d77"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      ST-15:
        attempt: 1
        claim_id: null
        id: "ST-15"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:193be3fcdff2e3694d13a389eda04077bc5e500f11db2f4671c90353c356c78e"
            id: "paired production campaign contract"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609121424-3YAX44"
              work_item_id: "ST-15"
            provenance:
              - "sha256:6ec5724c09fed4e52141eaab6b4924530774477e6821cebcf6a55618e5e86c73"
              - ".agentplane/tasks/202609121424-3YAX44/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:3302a479e80ab3db0e0a9b569fa086583d605ec04d62e9b01dee5b358551b18d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:4c67e345088c13e3fb3d344d953ae014bca5305ad6da1a8f2d62fb75ac2df21e"
            id: "offline three-arm driver regression"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609121424-3YAX44"
              work_item_id: "ST-15"
            provenance:
              - "sha256:6ec5724c09fed4e52141eaab6b4924530774477e6821cebcf6a55618e5e86c73"
              - ".agentplane/tasks/202609121424-3YAX44/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:3302a479e80ab3db0e0a9b569fa086583d605ec04d62e9b01dee5b358551b18d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609121424-3YAX44/supervision/declared-checks.json"
              check_id: "check-paired-driver"
              command_identity: "node --test scripts/bench/paired-production-driver.test.mjs"
              detail: "Observed by node --test scripts/bench/paired-production-driver.test.mjs."
              exit_code: 0
              observed_at: "2026-09-13T15:27:03.341Z"
              repository_snapshot_digest: "sha256:3302a479e80ab3db0e0a9b569fa086583d605ec04d62e9b01dee5b358551b18d"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      ST-16:
        attempt: 0
        claim_id: null
        id: "ST-16"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-13T15:25:37.558Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:c952a57bfbfc7414eaafaebe1eea717d25e1d0a25ca0c1bf0c420921df60f763"
        entity: "work_item"
        id: "event_4575c94d945d9151068a114d"
        mutation_id: "external-result:work-order-202609121424-3YAX44-executor-1821446152c6606af75ac3f3"
        plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-3YAX44"
        task_revision: 11
        work_item_id: "ST-14"
      -
        at: "2026-09-13T15:27:03.347Z"
        from: "PLANNED"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:32104bc61e556cc767da0edf0210b36aaedc47406f3b5e9b47d5aadd8fdda539"
        entity: "work_item"
        id: "event_21eaffafe13347426d18ab52"
        mutation_id: "external-result:work-order-202609121424-3YAX44-executor-7aa3e62c02ceff5a823e8e9b"
        plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121424-3YAX44"
        task_revision: 14
        work_item_id: "ST-15"
    leases: []
    mutation_receipts:
      compatibility:sha256:1f8fac2be4dad107e0cbc4274218a0480e1f1a723652140750520eb929b0b1a3:
        aggregate_digest: "sha256:dc500d4c103c1875ea2a6afe809e6db840c862018eb45093c863db216bffdcc9"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T15:26:58.772Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_729ea241d0b96946e024f932"
          mutation_id: "compatibility:sha256:1f8fac2be4dad107e0cbc4274218a0480e1f1a723652140750520eb929b0b1a3"
          plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-3YAX44"
          task_revision: 13
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:1f8fac2be4dad107e0cbc4274218a0480e1f1a723652140750520eb929b0b1a3"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609121424-3YAX44"
      compatibility:sha256:27a51187955ea33305213044c9521658c38ea49bf44edc96eba39be37edb48d6:
        aggregate_digest: "sha256:7195e706fc0a98a24f8f6aa59414bac91c9bd75c11539449d8be07931722ee22"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T15:28:57.195Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_d7695de6f06a953393560c72"
          mutation_id: "compatibility:sha256:27a51187955ea33305213044c9521658c38ea49bf44edc96eba39be37edb48d6"
          plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-3YAX44"
          task_revision: 15
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:27a51187955ea33305213044c9521658c38ea49bf44edc96eba39be37edb48d6"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609121424-3YAX44"
      compatibility:sha256:4bf895105e92d6d504c3a3efa9d7a986c5129e8f7940f5c329acf23f736d0cd9:
        aggregate_digest: "sha256:7c99995fff61ba6b75c5f7c805d07a7f88882f7b983267b5addf79f9959e922e"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T07:44:00.323Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_efbe5ceacf74baa3cdc6ab5c"
          mutation_id: "compatibility:sha256:4bf895105e92d6d504c3a3efa9d7a986c5129e8f7940f5c329acf23f736d0cd9"
          plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-3YAX44"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4bf895105e92d6d504c3a3efa9d7a986c5129e8f7940f5c329acf23f736d0cd9"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609121424-3YAX44"
      compatibility:sha256:5fefc34b4e8690517fbd27e61bc9c5de04ce5fa83f73cfc156b7e0cff5c65fbd:
        aggregate_digest: "sha256:788d44d0e128b36ab404b70b281c76b65364e7fd92d595a39bbc2a6a090a4f64"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T07:44:00.321Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_d56d9189c83f4845fb3dce9d"
          mutation_id: "compatibility:sha256:5fefc34b4e8690517fbd27e61bc9c5de04ce5fa83f73cfc156b7e0cff5c65fbd"
          plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-3YAX44"
          task_revision: 3
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:5fefc34b4e8690517fbd27e61bc9c5de04ce5fa83f73cfc156b7e0cff5c65fbd"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609121424-3YAX44"
      compatibility:sha256:95392f210af96a6b0278c3b51bb6a0df5ffd4e5a87a71cd426cff3234b73f35f:
        aggregate_digest: "sha256:c2a98507c8ca69d910091f2fd92cb25b563f753c96810f5a44f79d9ea79572c3"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T08:39:06.621Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_ae5119cd6d9593e1a77a1b89"
          mutation_id: "compatibility:sha256:95392f210af96a6b0278c3b51bb6a0df5ffd4e5a87a71cd426cff3234b73f35f"
          plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-3YAX44"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:95392f210af96a6b0278c3b51bb6a0df5ffd4e5a87a71cd426cff3234b73f35f"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609121424-3YAX44"
      compatibility:sha256:ab837acc30c1a607a62285c071acf87e8c23569d75516a0fd9055d4798c9d1f7:
        aggregate_digest: "sha256:d0f3dc13709c33cc92a117d5cb65da1e966fcf19d02da21341dbba2b992a62d4"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T08:39:37.088Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f998ddda131922ce6a9b33a4"
          mutation_id: "compatibility:sha256:ab837acc30c1a607a62285c071acf87e8c23569d75516a0fd9055d4798c9d1f7"
          plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-3YAX44"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ab837acc30c1a607a62285c071acf87e8c23569d75516a0fd9055d4798c9d1f7"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609121424-3YAX44"
      compatibility:sha256:bd2182a988abfc2929ce17b735f2cd540c8ff0eb15664a40bc9defefe60da644:
        aggregate_digest: "sha256:eab8d04826f5d338e825c99fc221ce6bbce9019ada5b0b307ab699aee68817c0"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T15:25:33.924Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_09aba2a437064c05361fda9e"
          mutation_id: "compatibility:sha256:bd2182a988abfc2929ce17b735f2cd540c8ff0eb15664a40bc9defefe60da644"
          plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-3YAX44"
          task_revision: 10
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:bd2182a988abfc2929ce17b735f2cd540c8ff0eb15664a40bc9defefe60da644"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609121424-3YAX44"
      compatibility:sha256:c867d6c6ce8a6b7ed803af21fc965b64ff02de39eaf6f0314ad9a5d7e5ebaef1:
        aggregate_digest: "sha256:3c299a20193cc1f42239f72b0690b733766e4c545ffbbdc3cb69bcdc23cfe9ce"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T15:25:33.924Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_09e4396b6abb6041bf145d04"
          mutation_id: "compatibility:sha256:c867d6c6ce8a6b7ed803af21fc965b64ff02de39eaf6f0314ad9a5d7e5ebaef1"
          plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-3YAX44"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:c867d6c6ce8a6b7ed803af21fc965b64ff02de39eaf6f0314ad9a5d7e5ebaef1"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609121424-3YAX44"
      compatibility:sha256:ce6742adf71b03722e7947357e27b84574182c6b373394d5bc3a09c1571aae83:
        aggregate_digest: "sha256:03a6f22b3ff07d239a5cbebc6dd6b2243dbc720d9039ca24f534731078cbc29f"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T15:28:57.195Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4a8b3e43a518286b9edc08f6"
          mutation_id: "compatibility:sha256:ce6742adf71b03722e7947357e27b84574182c6b373394d5bc3a09c1571aae83"
          plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-3YAX44"
          task_revision: 16
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ce6742adf71b03722e7947357e27b84574182c6b373394d5bc3a09c1571aae83"
        next_revision: 17
        previous_revision: 16
        schema_version: 1
        task_id: "202609121424-3YAX44"
      compatibility:sha256:d5ebe07ccc4cf2430d6ac75278cbe5e2259f78e57df1a0155e2292904d292062:
        aggregate_digest: "sha256:b9ba930018aee1650e7fbc82108e5fca638c8c257cce28bf5f5ef7d7e8ce91e8"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T08:00:01.265Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_2fe63e437f5d0f8862c05b5f"
          mutation_id: "compatibility:sha256:d5ebe07ccc4cf2430d6ac75278cbe5e2259f78e57df1a0155e2292904d292062"
          plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-3YAX44"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d5ebe07ccc4cf2430d6ac75278cbe5e2259f78e57df1a0155e2292904d292062"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609121424-3YAX44"
      compatibility:sha256:d743f97fa4e985e329e53cb72e7e85671811e14a1c441bec464c5853c0b9bde3:
        aggregate_digest: "sha256:32df74cde6778f64d2f33599ac26ce7ef2ea84843f2bdb4f316ea57afa762d07"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T07:44:00.323Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_1e87516664df108318bcef60"
          mutation_id: "compatibility:sha256:d743f97fa4e985e329e53cb72e7e85671811e14a1c441bec464c5853c0b9bde3"
          plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-3YAX44"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d743f97fa4e985e329e53cb72e7e85671811e14a1c441bec464c5853c0b9bde3"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609121424-3YAX44"
      compatibility:sha256:d784f07d26fc3601de9637ba6025bf0b92f1069e2db84f6e73ec020f21f9198a:
        aggregate_digest: "sha256:ac92042c9681854c858adb3926dec702a42bb7e10aaa22a51895252495e0b146"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T15:26:58.772Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_caa61118a72b29f30499f8fb"
          mutation_id: "compatibility:sha256:d784f07d26fc3601de9637ba6025bf0b92f1069e2db84f6e73ec020f21f9198a"
          plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-3YAX44"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d784f07d26fc3601de9637ba6025bf0b92f1069e2db84f6e73ec020f21f9198a"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609121424-3YAX44"
      external-result:work-order-202609121424-3YAX44-executor-1821446152c6606af75ac3f3:
        aggregate_digest: "sha256:fbd45e5d88a29bbfcd4fbfe386903e4acb99a24e766c22e35cfdc51a20108de0"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T15:25:37.558Z"
          cause_refs:
            - "semantic-result:sha256:c952a57bfbfc7414eaafaebe1eea717d25e1d0a25ca0c1bf0c420921df60f763"
          entity: "work_item"
          from: "READY"
          id: "event_4575c94d945d9151068a114d"
          mutation_id: "external-result:work-order-202609121424-3YAX44-executor-1821446152c6606af75ac3f3"
          plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-3YAX44"
          task_revision: 11
          to: "COMPLETED"
          work_item_id: "ST-14"
        mutation_id: "external-result:work-order-202609121424-3YAX44-executor-1821446152c6606af75ac3f3"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609121424-3YAX44"
      external-result:work-order-202609121424-3YAX44-executor-7aa3e62c02ceff5a823e8e9b:
        aggregate_digest: "sha256:0238e43af0ddc74351d928ec9553fc770272e5f99814551995505088c5da2726"
        event:
          actor_id: "agentplane"
          at: "2026-09-13T15:27:03.347Z"
          cause_refs:
            - "semantic-result:sha256:32104bc61e556cc767da0edf0210b36aaedc47406f3b5e9b47d5aadd8fdda539"
          entity: "work_item"
          from: "PLANNED"
          id: "event_21eaffafe13347426d18ab52"
          mutation_id: "external-result:work-order-202609121424-3YAX44-executor-7aa3e62c02ceff5a823e8e9b"
          plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121424-3YAX44"
          task_revision: 14
          to: "COMPLETED"
          work_item_id: "ST-15"
        mutation_id: "external-result:work-order-202609121424-3YAX44-executor-7aa3e62c02ceff5a823e8e9b"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609121424-3YAX44"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "9e32b1b8a9c75d1b20541637d2cdb3c9d7ec3b0a"
  task_execution_context:
    base_ref: "main"
    base_sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_planning_base_recovery:
    branch: "task/202609121424-3YAX44/add-the-0-7-9-marginal-cost-and-paired-productio"
    from_sha: "f3c1991ddd92943775b6b4b4688009afc3d523bc"
    observed_head: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
    plan_digest: "sha256:9058c9f56183fcc658d347a916f3b9ee21711fabb6fc2f5125c6b3ed3f32004c"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    revision: 5
    schema_version: 1
    state: "applied"
    target_sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
    task_id: "202609121424-3YAX44"
    token: "sha256:4a386631bbcf45de72e7dc108405063c5891d8c26f1cfd01da862b603216f239"
    worktree: "/Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609121424-3YAX44-add-the-0-7-9-marginal-cost-and-paired-productio"
  workflow_route_baseline:
    start_head_sha: "d03a5e786db57136bf7f6c4661b148bcf97cfaf1"
    version: 1
id_source: "generated"
---
## Summary

Add the 0.7.9 marginal-cost and paired production benchmark harness for ST-14 through ST-16

Source contract: agentplane-roadmap-r2 cards ST-14, ST-15, and ST-16. Measure marginal Git and artifact cost in the existing fixture harness, add one production-path paired driver using current isolation and evidence utilities, and report all-attempt cost per independently verified success with paired outcomes, success and violation rates, stage distributions, coverage, and uncertainty. Enforce matched target tree, product artifacts, model, effort, authority, checks, retries, runtime profile, verifier, and raw cost. Managed and external modes remain stratified. Unknown charges prevent a complete numeric claim; all-failed arms yield no finite success score. Do not execute paid calls in this task and do not reinterpret historical baselines. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/bench/task-marginal-cost.test.mjs; node --test scripts/bench/paired-production-driver.test.mjs; node --test scripts/bench/paired-result-report.test.mjs; existing benchmark replay checks and relevant release critical checks.

## Scope

- In scope: Source contract: agentplane-roadmap-r2 cards ST-14, ST-15, and ST-16. Measure marginal Git and artifact cost in the existing fixture harness, add one production-path paired driver using current isolation and evidence utilities, and report all-attempt cost per independently verified success with paired outcomes, success and violation rates, stage distributions, coverage, and uncertainty. Enforce matched target tree, product artifacts, model, effort, authority, checks, retries, runtime profile, verifier, and raw cost. Managed and external modes remain stratified. Unknown charges prevent a complete numeric claim; all-failed arms yield no finite success score. Do not execute paid calls in this task and do not reinterpret historical baselines. Preserve I01-I12 and C01-C08. The roadmap directory is source-only and must never be committed. Required checks: node --test scripts/bench/task-marginal-cost.test.mjs; node --test scripts/bench/paired-production-driver.test.mjs; node --test scripts/bench/paired-result-report.test.mjs; existing benchmark replay checks and relevant release critical checks.
- Out of scope: unrelated refactors not required for "Add the 0.7.9 marginal-cost and paired production benchmark harness for ST-14 through ST-16".

## Plan

Defined three dependency-ordered WorkItems for marginal task cost, a provider-free paired production driver, and fail-closed cost-per-verified-result reporting.

## Verify Steps

1. Run `node --test scripts/bench/task-marginal-cost.test.mjs`. Expected: marginal task-path, Git-object, commit, write, tool, and control-plane metrics are reproducible and duplicate blobs are counted once.
2. Run `node --test scripts/bench/paired-production-driver.test.mjs`. Expected: the offline three-arm driver uses production entrypoints and rejects mismatched target, product, runtime, authority, verifier, retry, or cost identity.
3. Run `node --test scripts/bench/paired-result-report.test.mjs`. Expected: all-attempt cost, paired outcomes, coverage, uncertainty, and separate gates fail closed for unknown charge or all-failed arms.
4. Run `bun run bench:agent-efficiency:replay:check`. Expected: existing immutable replay evidence remains valid.
5. Run `bun run test:agent-efficiency:qualification`. Expected: the established qualification suite passes with nonzero discovery.
6. Run `bun run bench:agent-efficiency:check`. Expected: historical baseline validation remains unchanged.
7. Run `bun run typecheck`. Expected: repository TypeScript contracts remain valid.
8. Compare the final diff with ST-14, ST-15, and ST-16. Expected: no paid provider call, historical-baseline rewrite, or committed agentplane-roadmap-r2 path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-13T08:39:05.585Z — VERIFY — ok

By: CODER

Note: Verified committed implementation 0cc76b3c323d; all selected local checks passed and no paid provider call was executed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:93df6d7884039c4c5baee54698f9ffe9df351e6c3477958323f36c6d3dd52777, input_digest=sha256:a5f0583db996c2964a542bca9f7470e2bdab80266bd2dd9d761ccea8a8388633

Details:

Check: affected_unit_integration
Command: node --test scripts/bench/task-marginal-cost.test.mjs scripts/bench/paired-production-driver.test.mjs scripts/bench/paired-result-report.test.mjs
Result: pass
Evidence: 13 focused tests passed on committed HEAD 0cc76b3c323da62a9c18eb946438e49e5d6c204a.
Scope: ST-14 marginal cost, ST-15 paired driver, and ST-16 fail-closed report contracts.

Check: critical_paths
Command: bun run bench:agent-efficiency:replay:check && bun run test:agent-efficiency:qualification && bun run bench:agent-efficiency:check && bun run typecheck
Result: pass
Evidence: RF-04 replay 50 runs and 70 outcomes passed; qualification 61 tests passed; baseline 10 scenarios passed; TypeScript build passed.
Scope: immutable benchmark, qualification, historical baseline, and type contracts.

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: full local CI passed on 0cc76b3c323d, including core, runtime, CLI, docs/schema, docs site, workflow lint, Windows-critical 98 tests, and significant coverage 101 tests.
Scope: repository full local regression selected by the persisted verification contract.

Check: task_outcome
Command: git show --name-status 0cc76b3c323d^..0cc76b3c323d && git status --short
Result: pass
Evidence: task worktree is clean; the two task commits contain only the canonical 3YAX44 task artifacts and scoped scripts; agentplane-roadmap-r2 is absent; no paid provider call was executed.
Scope: approved task outcome and source-only roadmap exclusion.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609121424-3YAX44-add-the-0-7-9-marginal-cost-and-paired-productio/.agentplane/tasks/202609121424-3YAX44/blueprint/resolved-snapshot.json
- old_digest: fa5bda7326628d77818e5607d9c82965c639b2adaac875c2abf479a7f619d50f
- current_digest: fa5bda7326628d77818e5607d9c82965c639b2adaac875c2abf479a7f619d50f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609121424-3YAX44

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
