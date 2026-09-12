---
id: "202609122236-JFNN6B"
title: "Simplify the test suite without weakening safety-critical coverage"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "test-suite"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run test:agent-efficiency:qualification"
  - "bun run test:critical"
  - "bun run test:project agentplane packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts --maxWorkers=2"
  - "bun run vitest:projects:check"
plan_approval:
  state: "approved"
  updated_at: "2026-09-12T22:42:24.477Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:ea81a88200dad920afcb822476f64a46d5897cf593ce4a41f9a16b0f8d1280fc"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "package.json"
      - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
      - "packages/agentplane/src/runtime/prompt-modules"
      - "scripts/README.md"
      - "scripts/checks/check-coverage-thresholds.mjs"
      - "scripts/lib/test-route-registry.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The listed roots exclude files modified by the active runner and supervisor refactors."
      - "The repository policy requires branch_pr for code changes."
      - "The task removes redundant implementation and test contracts while preserving the model-neutral compiler and safety-critical behaviors."
    repository_effects:
      - "ci"
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "package.json"
      - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
      - "packages/agentplane/src/runtime/prompt-modules"
      - "scripts/README.md"
      - "scripts/checks/check-coverage-thresholds.mjs"
      - "scripts/lib/test-route-registry.mjs"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
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
          - "package.json"
          - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
          - "packages/agentplane/src/runtime/prompt-modules"
          - "scripts/README.md"
          - "scripts/checks/check-coverage-thresholds.mjs"
          - "scripts/lib/test-route-registry.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "documentation"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:0b85a631c0ed5bfcd73ec9b68a1cedf07aa12cd4965de2d8ccca8adb674fb930"
      escalation_reasons:
        - "central_component:package.json"
        - "central_component:scripts/checks/check-coverage-thresholds.mjs"
        - "central_component:scripts/lib/test-route-registry.mjs"
        - "effect_ci"
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
      - "repository_effect:ci"
      - "repository_effect:documentation"
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
    at: "2026-09-12T22:42:33.281Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-12T22:42:33.281Z"
doc_updated_by: "CODER"
description: "Remove unused GPT-5.5/GPT-5.6 prompt diagnostic implementations and self-tests, retain the prompt module compiler and model-neutral behavioral contracts, remove the historical fixed-byte assertion while retaining semantic prompt assertions, remove the duplicate coverage-threshold configuration guard, and route agent-efficiency benchmark tests to a separate qualification suite instead of the normal critical CLI gate. Preserve exit-code, scope, symlink, protected-path, trust-boundary, task-centric, and context critical tests. Reduce critical suite process overhead only if the resulting suite passes repeatedly. Avoid files currently modified by tasks 202609080727-BAWTEE and 202609121424-T83XJA. Do not modify benchmark fixtures or semantic gateway implementation."
sections:
  Summary: |-
    Simplify the test suite without weakening safety-critical coverage

    Remove unused GPT-5.5/GPT-5.6 prompt diagnostic implementations and self-tests, retain the prompt module compiler and model-neutral behavioral contracts, remove the historical fixed-byte assertion while retaining semantic prompt assertions, remove the duplicate coverage-threshold configuration guard, and route agent-efficiency benchmark tests to a separate qualification suite instead of the normal critical CLI gate. Preserve exit-code, scope, symlink, protected-path, trust-boundary, task-centric, and context critical tests. Reduce critical suite process overhead only if the resulting suite passes repeatedly. Avoid files currently modified by tasks 202609080727-BAWTEE and 202609121424-T83XJA. Do not modify benchmark fixtures or semantic gateway implementation.
  Scope: |-
    - In scope: Remove unused GPT-5.5/GPT-5.6 prompt diagnostic implementations and self-tests, retain the prompt module compiler and model-neutral behavioral contracts, remove the historical fixed-byte assertion while retaining semantic prompt assertions, remove the duplicate coverage-threshold configuration guard, and route agent-efficiency benchmark tests to a separate qualification suite instead of the normal critical CLI gate. Preserve exit-code, scope, symlink, protected-path, trust-boundary, task-centric, and context critical tests. Reduce critical suite process overhead only if the resulting suite passes repeatedly. Avoid files currently modified by tasks 202609080727-BAWTEE and 202609121424-T83XJA. Do not modify benchmark fixtures or semantic gateway implementation.
    - Out of scope: unrelated refactors not required for "Simplify the test suite without weakening safety-critical coverage".
  Plan: "Prepared a bounded cleanup plan that separates qualification benchmarks from the critical safety route and avoids active refactor files."
  Verify Steps: |-
    1. Run `bun run vitest:projects:check`. Expected: the suite registry remains valid.
    2. Run `bun run test:critical` twice. Expected: the safety-critical route passes repeatedly without benchmark qualification files.
    3. Run `bun run test:agent-efficiency:qualification`. Expected: all five agent-efficiency benchmark contract files pass in the dedicated qualification route.
    4. Run `bun run test:project agentplane packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts --maxWorkers=2`. Expected: semantic prompt assertions and release CI route contracts pass.
    5. Review the final diff and repository status. Expected: no benchmark fixture, semantic gateway implementation, active refactor file, or unrelated user change is modified.
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
    approval_evidence_digest: "sha256:ea81a88200dad920afcb822476f64a46d5897cf593ce4a41f9a16b0f8d1280fc"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a84eaf11b1be994cc4b9d3acf4488077de494b803418609d314aec44f37dcc48"
    digest: "sha256:492df129315384053fdccfc8beb8a2f0784214e4f10fe25c61963da355a8724f"
    grant_id: "02a9c5e8-e4d9-4748-9e22-cd85b4b23193"
    issued_at: "2026-09-12T22:42:24.477Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:2b291f68cf366cd4c5032e4726a8dc47b044869a19d3ed4ebb4ff935f87404e9"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:7c13e051dee4c78de30961a10b3f8fb89f7cadf0286ec67ceee29a6567552d81"
    status: "active"
    task_id: "202609122236-JFNN6B"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-12T22:42:24.477Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:fc3fa0d62ac054df01a9b8836d07718a3949500c6c4fb435a9f8f5b8034a00ed"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-12T22:39:58.805Z"
      digest: "sha256:fc3fa0d62ac054df01a9b8836d07718a3949500c6c4fb435a9f8f5b8034a00ed"
      proposal:
        assumptions:
          - "The five run-cli.critical.agent-efficiency*.test.ts files remain release qualification coverage through the new dedicated suite."
          - "Historical release notes remain unchanged because they accurately describe released behavior."
        planning_baseline:
          captured_at: "2026-09-12T22:37:04.193Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:7ab24d05e79a87dfa1ae694d7fd3fff3dc871b4f7b1fab286040bf15b9dd4ae8"
          dirty_paths:
            - ".agentplane/tasks/202609072121-9VEHKH/README.md"
            - ".agentplane/tasks/202609080727-BAWTEE/README.md"
            - ".agentplane/tasks/202609121424-3YAX44/README.md"
            - ".agentplane/tasks/202609121424-49XXT3/README.md"
            - ".agentplane/tasks/202609121424-4BC7B3/README.md"
            - ".agentplane/tasks/202609121424-ZEJ656/README.md"
            - ".agentplane/tasks/202609122236-JFNN6B/README.md"
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
            sha: "58048a4e1ff97030d3fa86447c739397f0e0936b"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609122236-JFNN6B"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run vitest:projects:check"
              id: "check-projects"
              kind: "deterministic"
              required: true
              timeout_ms: 120000
            -
              capability: "task.verify"
              command: "bun run test:critical"
              id: "check-critical"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run test:agent-efficiency:qualification"
              id: "check-qualification"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run test:project agentplane packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts --maxWorkers=2"
              id: "check-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
          criteria:
            -
              check_ids:
                - "check-focused"
                - "check-projects"
              description: "Remove the unused GPT-5.5 and GPT-5.6 diagnostic implementations, their self-tests, barrel exports, and test-route references while keeping the prompt module compiler and model-neutral behavioral coverage."
              id: "criterion-dead-contracts"
              required: true
            -
              check_ids:
                - "check-focused"
              description: "Remove only the historical prompt byte baseline and retain assertions for instruction language, authority, stale-context behavior, valid result examples, and literal preservation."
              id: "criterion-semantic-assertions"
              required: true
            -
              check_ids:
                - "check-projects"
                - "check-focused"
              description: "Remove the duplicate coverage-threshold script and its package and generated documentation entries without changing the Vitest coverage thresholds."
              id: "criterion-coverage-guard"
              required: true
            -
              check_ids:
                - "check-critical"
                - "check-qualification"
                - "check-focused"
              description: "Keep exit-code, git-edge, protected-path, scope-leak, symlink-root, task-centric, trust-boundary, and context tests in critical-cli, and route all five agent-efficiency files to test:agent-efficiency:qualification."
              id: "criterion-route-split"
              required: true
            -
              check_ids:
                - "check-critical"
              description: "Change critical-cli chunking only when repeated critical-cli runs pass; otherwise retain chunkSize 1 and record the limitation."
              id: "criterion-process-safety"
              required: true
            -
              check_ids:
                - "check-projects"
                - "check-focused"
              description: "Do not modify benchmark fixtures, semantic gateway implementation, or files owned by tasks 202609080727-BAWTEE and 202609121424-T83XJA."
              id: "criterion-scope"
              required: true
          evidence_fingerprint: "sha256:7ab24d05e79a87dfa1ae694d7fd3fff3dc871b4f7b1fab286040bf15b9dd4ae8"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-focused"
                    - "check-projects"
                  description: "Remove the unused GPT-5.5 and GPT-5.6 diagnostic implementations, their self-tests, barrel exports, and test-route references while keeping the prompt module compiler and model-neutral behavioral coverage."
                  id: "criterion-dead-contracts"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                  description: "Remove only the historical prompt byte baseline and retain assertions for instruction language, authority, stale-context behavior, valid result examples, and literal preservation."
                  id: "criterion-semantic-assertions"
                  required: true
                -
                  check_ids:
                    - "check-projects"
                    - "check-focused"
                  description: "Remove the duplicate coverage-threshold script and its package and generated documentation entries without changing the Vitest coverage thresholds."
                  id: "criterion-coverage-guard"
                  required: true
                -
                  check_ids:
                    - "check-critical"
                    - "check-qualification"
                    - "check-focused"
                  description: "Keep exit-code, git-edge, protected-path, scope-leak, symlink-root, task-centric, trust-boundary, and context tests in critical-cli, and route all five agent-efficiency files to test:agent-efficiency:qualification."
                  id: "criterion-route-split"
                  required: true
                -
                  check_ids:
                    - "check-critical"
                  description: "Change critical-cli chunking only when repeated critical-cli runs pass; otherwise retain chunkSize 1 and record the limitation."
                  id: "criterion-process-safety"
                  required: true
                -
                  check_ids:
                    - "check-projects"
                    - "check-focused"
                  description: "Do not modify benchmark fixtures, semantic gateway implementation, or files owned by tasks 202609080727-BAWTEE and 202609121424-T83XJA."
                  id: "criterion-scope"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 120000
                optional_sources:
                  - "scripts/README.md"
                  - "vitest.config.ts"
                required_sources:
                  - "package.json"
                  - "scripts/lib/test-route-registry.mjs"
                  - "packages/agentplane/src/runtime/prompt-modules/index.ts"
                  - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
                  - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
                symbol_hints:
                  - "CRITICAL_CLI_SUITE"
                  - "VITEST_SUITES"
                  - "PROMPT_MODULES_TEST_FILES"
                  - "diagnoseGpt55PromptContract"
                  - "diagnoseGpt56PromptContract"
              depends_on: []
              expected_outputs:
                - "cleanup-diff"
              id: "work-item-cleanup"
              objective: "Remove redundant prompt and coverage contracts and split benchmark qualification from the critical safety route."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "package.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runtime/prompt-modules"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
              risk: "medium"
              scope_roots:
                - "package.json"
                - "scripts/README.md"
                - "scripts/checks/check-coverage-thresholds.mjs"
                - "scripts/lib/test-route-registry.mjs"
                - "packages/agentplane/src/commands/release/release-ci-contract.test.ts"
                - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
                - "packages/agentplane/src/runtime/prompt-modules"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run vitest:projects:check"
                    id: "check-projects"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run test:critical"
                    id: "check-critical"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run test:agent-efficiency:qualification"
                    id: "check-qualification"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts --maxWorkers=2"
                    id: "check-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                criteria:
                  -
                    check_ids:
                      - "check-focused"
                      - "check-projects"
                    description: "Remove the unused GPT-5.5 and GPT-5.6 diagnostic implementations, their self-tests, barrel exports, and test-route references while keeping the prompt module compiler and model-neutral behavioral coverage."
                    id: "criterion-dead-contracts"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                    description: "Remove only the historical prompt byte baseline and retain assertions for instruction language, authority, stale-context behavior, valid result examples, and literal preservation."
                    id: "criterion-semantic-assertions"
                    required: true
                  -
                    check_ids:
                      - "check-projects"
                      - "check-focused"
                    description: "Remove the duplicate coverage-threshold script and its package and generated documentation entries without changing the Vitest coverage thresholds."
                    id: "criterion-coverage-guard"
                    required: true
                  -
                    check_ids:
                      - "check-critical"
                      - "check-qualification"
                      - "check-focused"
                    description: "Keep exit-code, git-edge, protected-path, scope-leak, symlink-root, task-centric, trust-boundary, and context tests in critical-cli, and route all five agent-efficiency files to test:agent-efficiency:qualification."
                    id: "criterion-route-split"
                    required: true
                  -
                    check_ids:
                      - "check-critical"
                    description: "Change critical-cli chunking only when repeated critical-cli runs pass; otherwise retain chunkSize 1 and record the limitation."
                    id: "criterion-process-safety"
                    required: true
                  -
                    check_ids:
                      - "check-projects"
                      - "check-focused"
                    description: "Do not modify benchmark fixtures, semantic gateway implementation, or files owned by tasks 202609080727-BAWTEE and 202609121424-T83XJA."
                    id: "criterion-scope"
                    required: true
                evidence_fingerprint: "sha256:7ab24d05e79a87dfa1ae694d7fd3fff3dc871b4f7b1fab286040bf15b9dd4ae8"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-focused"
                    - "check-projects"
                  description: "Remove the unused GPT-5.5 and GPT-5.6 diagnostic implementations, their self-tests, barrel exports, and test-route references while keeping the prompt module compiler and model-neutral behavioral coverage."
                  id: "criterion-dead-contracts"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                  description: "Remove only the historical prompt byte baseline and retain assertions for instruction language, authority, stale-context behavior, valid result examples, and literal preservation."
                  id: "criterion-semantic-assertions"
                  required: true
                -
                  check_ids:
                    - "check-projects"
                    - "check-focused"
                  description: "Remove the duplicate coverage-threshold script and its package and generated documentation entries without changing the Vitest coverage thresholds."
                  id: "criterion-coverage-guard"
                  required: true
                -
                  check_ids:
                    - "check-critical"
                    - "check-qualification"
                    - "check-focused"
                  description: "Keep exit-code, git-edge, protected-path, scope-leak, symlink-root, task-centric, trust-boundary, and context tests in critical-cli, and route all five agent-efficiency files to test:agent-efficiency:qualification."
                  id: "criterion-route-split"
                  required: true
                -
                  check_ids:
                    - "check-critical"
                  description: "Change critical-cli chunking only when repeated critical-cli runs pass; otherwise retain chunkSize 1 and record the limitation."
                  id: "criterion-process-safety"
                  required: true
                -
                  check_ids:
                    - "check-projects"
                    - "check-focused"
                  description: "Do not modify benchmark fixtures, semantic gateway implementation, or files owned by tasks 202609080727-BAWTEE and 202609121424-T83XJA."
                  id: "criterion-scope"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 80000
                optional_sources:
                  - "Git diff"
                  - "Test timing output"
                required_sources:
                  - "Changed files"
                  - "Task Verify Steps"
                symbol_hints:
                  - "VITEST_SUITES"
                  - "critical-cli"
                  - "agent-efficiency-qualification"
              depends_on:
                - "work-item-cleanup"
              expected_outputs:
                - "validation-evidence"
              id: "work-item-validation"
              objective: "Verify route membership, focused contracts, repeated critical stability, and the final bounded diff."
              optional: false
              priority: 2
              required_inputs:
                - "cleanup-diff"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "read"
                  resource: "task worktree"
              risk: "low"
              scope_roots:
                - "package.json"
                - "scripts"
                - "packages/agentplane/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run vitest:projects:check"
                    id: "check-projects"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 120000
                  -
                    capability: "task.verify"
                    command: "bun run test:critical"
                    id: "check-critical"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run test:agent-efficiency:qualification"
                    id: "check-qualification"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run test:project agentplane packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts --maxWorkers=2"
                    id: "check-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                criteria:
                  -
                    check_ids:
                      - "check-focused"
                      - "check-projects"
                    description: "Remove the unused GPT-5.5 and GPT-5.6 diagnostic implementations, their self-tests, barrel exports, and test-route references while keeping the prompt module compiler and model-neutral behavioral coverage."
                    id: "criterion-dead-contracts"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                    description: "Remove only the historical prompt byte baseline and retain assertions for instruction language, authority, stale-context behavior, valid result examples, and literal preservation."
                    id: "criterion-semantic-assertions"
                    required: true
                  -
                    check_ids:
                      - "check-projects"
                      - "check-focused"
                    description: "Remove the duplicate coverage-threshold script and its package and generated documentation entries without changing the Vitest coverage thresholds."
                    id: "criterion-coverage-guard"
                    required: true
                  -
                    check_ids:
                      - "check-critical"
                      - "check-qualification"
                      - "check-focused"
                    description: "Keep exit-code, git-edge, protected-path, scope-leak, symlink-root, task-centric, trust-boundary, and context tests in critical-cli, and route all five agent-efficiency files to test:agent-efficiency:qualification."
                    id: "criterion-route-split"
                    required: true
                  -
                    check_ids:
                      - "check-critical"
                    description: "Change critical-cli chunking only when repeated critical-cli runs pass; otherwise retain chunkSize 1 and record the limitation."
                    id: "criterion-process-safety"
                    required: true
                  -
                    check_ids:
                      - "check-projects"
                      - "check-focused"
                    description: "Do not modify benchmark fixtures, semantic gateway implementation, or files owned by tasks 202609080727-BAWTEE and 202609121424-T83XJA."
                    id: "criterion-scope"
                    required: true
                evidence_fingerprint: "sha256:7ab24d05e79a87dfa1ae694d7fd3fff3dc871b4f7b1fab286040bf15b9dd4ae8"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609122236-JFNN6B"
    event_cursor: 3
    final_validation: null
    id: "202609122236-JFNN6B"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run test:agent-efficiency:qualification"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run test:critical"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run test:project agentplane packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts --maxWorkers=2"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun run vitest:projects:check"
          id: "legacy-4"
          required: true
      captured_at: "2026-09-12T22:36:12.825Z"
      constraints: []
      request: |-
        Simplify the test suite without weakening safety-critical coverage

        Remove unused GPT-5.5/GPT-5.6 prompt diagnostic implementations and self-tests, retain the prompt module compiler and model-neutral behavioral contracts, remove the historical fixed-byte assertion while retaining semantic prompt assertions, remove the duplicate coverage-threshold configuration guard, and route agent-efficiency benchmark tests to a separate qualification suite instead of the normal critical CLI gate. Preserve exit-code, scope, symlink, protected-path, trust-boundary, task-centric, and context critical tests. Reduce critical suite process overhead only if the resulting suite passes repeatedly. Avoid files currently modified by tasks 202609080727-BAWTEE and 202609121424-T83XJA. Do not modify benchmark fixtures or semantic gateway implementation.
      task_id: "202609122236-JFNN6B"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 5
    schema_version: 1
    updated_at: "2026-09-12T22:42:33.281Z"
    work_items:
      work-item-cleanup:
        attempt: 0
        claim_id: null
        id: "work-item-cleanup"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      work-item-validation:
        attempt: 0
        claim_id: null
        id: "work-item-validation"
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
      compatibility:sha256:49590b7a17ee04b84aa13cb1da694ef646ba3c9465a83393fc5913ebb54eaf4a:
        aggregate_digest: "sha256:1def4b693c6da6f982a85f214f4f0098bbbdf0249fe169c2a9382d07b96f753f"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T22:42:01.355Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_407f8bf66599d4e1ea8d5b2e"
          mutation_id: "compatibility:sha256:49590b7a17ee04b84aa13cb1da694ef646ba3c9465a83393fc5913ebb54eaf4a"
          plan_digest: "sha256:fc3fa0d62ac054df01a9b8836d07718a3949500c6c4fb435a9f8f5b8034a00ed"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609122236-JFNN6B"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:49590b7a17ee04b84aa13cb1da694ef646ba3c9465a83393fc5913ebb54eaf4a"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609122236-JFNN6B"
      compatibility:sha256:5194a55b4e6cb65da743fdb533d5b976fdca8ae5889486f57718daa83852df7c:
        aggregate_digest: "sha256:f39ee0ccb3f4034bc62c1675d3c6f0f8a5a8ef3d8f9a651f7f9e4de2ab306db4"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T22:42:01.357Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_e9d6886eb1bbd6ce2ffe2062"
          mutation_id: "compatibility:sha256:5194a55b4e6cb65da743fdb533d5b976fdca8ae5889486f57718daa83852df7c"
          plan_digest: "sha256:fc3fa0d62ac054df01a9b8836d07718a3949500c6c4fb435a9f8f5b8034a00ed"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609122236-JFNN6B"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:5194a55b4e6cb65da743fdb533d5b976fdca8ae5889486f57718daa83852df7c"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609122236-JFNN6B"
      compatibility:sha256:62f05cf87a88f31e8abbbd8b8ad1989bf076511d97296f6acf4661fc7ccd874c:
        aggregate_digest: "sha256:40a233adc03780f3d22c1b61ab22228ebcc9b387e2d76ed35f45ad17ae71775d"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T22:42:33.281Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_624942429640a796cef02924"
          mutation_id: "compatibility:sha256:62f05cf87a88f31e8abbbd8b8ad1989bf076511d97296f6acf4661fc7ccd874c"
          plan_digest: "sha256:fc3fa0d62ac054df01a9b8836d07718a3949500c6c4fb435a9f8f5b8034a00ed"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609122236-JFNN6B"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:62f05cf87a88f31e8abbbd8b8ad1989bf076511d97296f6acf4661fc7ccd874c"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609122236-JFNN6B"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "58048a4e1ff97030d3fa86447c739397f0e0936b"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "58048a4e1ff97030d3fa86447c739397f0e0936b"
    version: 1
id_source: "generated"
---
## Summary

Simplify the test suite without weakening safety-critical coverage

Remove unused GPT-5.5/GPT-5.6 prompt diagnostic implementations and self-tests, retain the prompt module compiler and model-neutral behavioral contracts, remove the historical fixed-byte assertion while retaining semantic prompt assertions, remove the duplicate coverage-threshold configuration guard, and route agent-efficiency benchmark tests to a separate qualification suite instead of the normal critical CLI gate. Preserve exit-code, scope, symlink, protected-path, trust-boundary, task-centric, and context critical tests. Reduce critical suite process overhead only if the resulting suite passes repeatedly. Avoid files currently modified by tasks 202609080727-BAWTEE and 202609121424-T83XJA. Do not modify benchmark fixtures or semantic gateway implementation.

## Scope

- In scope: Remove unused GPT-5.5/GPT-5.6 prompt diagnostic implementations and self-tests, retain the prompt module compiler and model-neutral behavioral contracts, remove the historical fixed-byte assertion while retaining semantic prompt assertions, remove the duplicate coverage-threshold configuration guard, and route agent-efficiency benchmark tests to a separate qualification suite instead of the normal critical CLI gate. Preserve exit-code, scope, symlink, protected-path, trust-boundary, task-centric, and context critical tests. Reduce critical suite process overhead only if the resulting suite passes repeatedly. Avoid files currently modified by tasks 202609080727-BAWTEE and 202609121424-T83XJA. Do not modify benchmark fixtures or semantic gateway implementation.
- Out of scope: unrelated refactors not required for "Simplify the test suite without weakening safety-critical coverage".

## Plan

Prepared a bounded cleanup plan that separates qualification benchmarks from the critical safety route and avoids active refactor files.

## Verify Steps

1. Run `bun run vitest:projects:check`. Expected: the suite registry remains valid.
2. Run `bun run test:critical` twice. Expected: the safety-critical route passes repeatedly without benchmark qualification files.
3. Run `bun run test:agent-efficiency:qualification`. Expected: all five agent-efficiency benchmark contract files pass in the dedicated qualification route.
4. Run `bun run test:project agentplane packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts --maxWorkers=2`. Expected: semantic prompt assertions and release CI route contracts pass.
5. Review the final diff and repository status. Expected: no benchmark fixture, semantic gateway implementation, active refactor file, or unrelated user change is modified.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
