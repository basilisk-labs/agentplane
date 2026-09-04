---
id: "202609042327-PH5N6S"
title: "Run supervisor verification against the committed implementation without dirtying its checkout"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "regression"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-04T23:32:23.257Z"
  updated_by: "ORCHESTRATOR"
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
      - "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Reuse the existing supervisor artifact commit owner before verification; avoid parallel checkout infrastructure."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
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
      digest: "sha256:6a4c09c5183ae2a21f7880aff4837094e27744a741607043f4e9d254fd04edb0"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
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
  hash: "fa586d9c7d1eddcf5cc76f6ccdf53e9df7679231"
  message: "🚧 PH5N6S task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: fa586d9c7d1e. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-04T23:32:29.002Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-04T23:45:59.407Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: fa586d9c7d1e. CLI accepted one state-bound external-agent semantic result."
    commit: "fa586d9c7d1eddcf5cc76f6ccdf53e9df7679231"
doc_version: 3
doc_updated_at: "2026-09-04T23:45:59.407Z"
doc_updated_by: "SUPERVISOR"
description: "User-authorized blocking repair for Arkady Factory APTA3E. Supervisor writes implementation/task evidence before checks that require a clean exact commit, causing ci:local:full to refuse its own checkout. Reproduce through existing supervisor tests and fix ordering or reuse the canonical isolated verification mechanism. Preserve exact implementation identity, evidence durability, interruption recovery, authority and clean-worktree checks. Do not change Factory checks. Exclude unrelated lifecycle/approval work and workspace-base recovery, which will be a subsequent bounded slice. Coordinate source ownership with the remote AgentPlane Clean Core task."
sections:
  Summary: |-
    Run supervisor verification against the committed implementation without dirtying its checkout

    User-authorized blocking repair for Arkady Factory APTA3E. Supervisor writes implementation/task evidence before checks that require a clean exact commit, causing ci:local:full to refuse its own checkout. Reproduce through existing supervisor tests and fix ordering or reuse the canonical isolated verification mechanism. Preserve exact implementation identity, evidence durability, interruption recovery, authority and clean-worktree checks. Do not change Factory checks. Exclude unrelated lifecycle/approval work and workspace-base recovery, which will be a subsequent bounded slice. Coordinate source ownership with the remote AgentPlane Clean Core task.
  Scope: |-
    - In scope: User-authorized blocking repair for Arkady Factory APTA3E. Supervisor writes implementation/task evidence before checks that require a clean exact commit, causing ci:local:full to refuse its own checkout. Reproduce through existing supervisor tests and fix ordering or reuse the canonical isolated verification mechanism. Preserve exact implementation identity, evidence durability, interruption recovery, authority and clean-worktree checks. Do not change Factory checks. Exclude unrelated lifecycle/approval work and workspace-base recovery, which will be a subsequent bounded slice. Coordinate source ownership with the remote AgentPlane Clean Core task.
    - Out of scope: unrelated refactors not required for "Run supervisor verification against the committed implementation without dirtying its checkout".
  Plan: "Preserve committed implementation verification by publishing pending task artifacts through the canonical supervisor artifact owner before branch verification."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "ORCHESTRATOR"
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
    digest: "sha256:588429cd9fdbd724a7315a1c6adbc0037ba9ca1d32efb45b051b1db146ffb3dd"
    grant_id: "503e12f1-9f35-4f1d-af82-d4d703ce4d20"
    issued_at: "2026-09-04T23:32:23.257Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:3877aedf6c7cb749cf43824f62d933f60595cd8566e877d4af2b6f54af1b4401"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609042327-PH5N6S"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-04T23:32:23.257Z"
        approved_by: "ORCHESTRATOR"
        approved_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-09-04T23:32:16.167Z"
      digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
      proposal:
        assumptions:
          - "User explicitly authorized fixing the AgentPlane blockers."
          - "Preserve Factory tasks and original implementation provenance; changes to task execution context are a later slice."
          - "No overlap with published ZVX69C source diff."
        planning_baseline:
          captured_at: "2026-09-04T23:28:00.511Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:e62d0428f02d16a1c6111c30379045666e1071329c00279ae803c8270c327e40"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608241434-129F8R/README.md"
            - ".agentplane/tasks/202608241434-EH8E74/README.md"
            - ".agentplane/tasks/202608241434-KCC9K4/README.md"
            - ".agentplane/tasks/202608241434-QQNDGT/README.md"
            - ".agentplane/tasks/202608241434-SFPD91/README.md"
            - ".agentplane/tasks/202608241434-TA84WK/README.md"
            - ".agentplane/tasks/202608241434-WVYA5T/README.md"
            - ".agentplane/tasks/202608241435-40YZCE/README.md"
            - ".agentplane/tasks/202608241435-73DA89/README.md"
            - ".agentplane/tasks/202608241435-D001ET/README.md"
            - ".agentplane/tasks/202608241435-HTV4K2/README.md"
            - ".agentplane/tasks/202608241435-NDR0BX/README.md"
            - ".agentplane/tasks/202608241435-RJXGHQ/README.md"
            - ".agentplane/tasks/202608241435-W3DG6V/README.md"
            - ".agentplane/tasks/202608241435-YSW0E0/README.md"
            - ".agentplane/tasks/202608241436-2G9DA8/README.md"
            - ".agentplane/tasks/202608241436-63W678/README.md"
            - ".agentplane/tasks/202608241436-8PJKJP/README.md"
            - ".agentplane/tasks/202608241436-99B067/README.md"
            - ".agentplane/tasks/202608241436-A87Y59/README.md"
            - ".agentplane/tasks/202608241436-DHPR5E/README.md"
            - ".agentplane/tasks/202608241436-H60MCY/README.md"
            - ".agentplane/tasks/202608241436-TX6TRF/README.md"
            - ".agentplane/tasks/202608241436-W6A113/README.md"
            - ".agentplane/tasks/202608241437-5YZ0N8/README.md"
            - ".agentplane/tasks/202608241437-H5418M/README.md"
            - ".agentplane/tasks/202608241437-SH3CDX/README.md"
            - ".agentplane/tasks/202608241437-V8BA7Q/README.md"
            - ".agentplane/tasks/202608241437-XY3950/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608251038-42AC0D/README.md"
            - ".agentplane/tasks/202608251053-QAZ236/README.md"
            - ".agentplane/tasks/202608251735-ZJ7YZE/README.md"
            - ".agentplane/tasks/202608252233-JR4T47/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608262032-MAJQ5E/README.md"
            - ".agentplane/tasks/202608270848-0RAFH9/README.md"
            - ".agentplane/tasks/202608270848-37XB2K/README.md"
            - ".agentplane/tasks/202608270848-N28TBB/README.md"
            - ".agentplane/tasks/202608270848-V32542/README.md"
            - ".agentplane/tasks/202608271350-HVGQPQ/README.md"
            - ".agentplane/tasks/202608291005-33PHG4/README.md"
            - ".agentplane/tasks/202608291006-0AJG13/README.md"
            - ".agentplane/tasks/202608291953-8YA3HG/README.md"
            - ".agentplane/tasks/202608312248-WXP9JS/README.md"
            - ".agentplane/tasks/202609042327-PH5N6S/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "d345cdb14c53a98a85ece41ab472433f8e1fb32c"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609042327-PH5N6S"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts --maxWorkers=1"
              id: "regression"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
          criteria:
            -
              check_ids:
                - "regression"
                - "full"
              description: "Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed."
              id: "clean-verification"
              required: true
          evidence_fingerprint: "sha256:e62d0428f02d16a1c6111c30379045666e1071329c00279ae803c8270c327e40"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "regression"
                    - "full"
                  description: "Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed."
                  id: "clean-verification"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources:
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-artifact-commit.ts"
                symbol_hints:
                  - "recordDirectTaskVerification"
                  - "commitBranchSupervisorTaskArtifacts"
              depends_on: []
              expected_outputs:
                - "Canonical artifact commit before branch verification"
                - "Real Git regression covering clean checks and preservation"
              id: "clean-verification"
              objective: "Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.clean-verification.test.ts --maxWorkers=1"
                    id: "regression"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                criteria:
                  -
                    check_ids:
                      - "regression"
                      - "full"
                    description: "Branch implementation verification sees a clean committed checkout while its original implementation SHA remains authoritative; task evidence is durable and unrelated dirty data remains fail-closed."
                    id: "clean-verification"
                    required: true
                evidence_fingerprint: "sha256:e62d0428f02d16a1c6111c30379045666e1071329c00279ae803c8270c327e40"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609042327-PH5N6S"
    event_cursor: 3
    final_validation: null
    id: "202609042327-PH5N6S"
    intent:
      acceptance_criteria: []
      captured_at: "2026-09-04T23:27:36.382Z"
      constraints: []
      request: |-
        Run supervisor verification against the committed implementation without dirtying its checkout

        User-authorized blocking repair for Arkady Factory APTA3E. Supervisor writes implementation/task evidence before checks that require a clean exact commit, causing ci:local:full to refuse its own checkout. Reproduce through existing supervisor tests and fix ordering or reuse the canonical isolated verification mechanism. Preserve exact implementation identity, evidence durability, interruption recovery, authority and clean-worktree checks. Do not change Factory checks. Exclude unrelated lifecycle/approval work and workspace-base recovery, which will be a subsequent bounded slice. Coordinate source ownership with the remote AgentPlane Clean Core task.
      task_id: "202609042327-PH5N6S"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 6
    schema_version: 1
    updated_at: "2026-09-04T23:45:59.407Z"
    work_items:
      clean-verification:
        attempt: 0
        claim_id: null
        id: "clean-verification"
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
      compatibility:sha256:c04e97e16b156c55ca81f0e6a8f9423c3909aeaa8a8611b64b787949909472bc:
        aggregate_digest: "sha256:fb3864919f82e9ecbdd961323a65b122a3de3545d9a1b9cdae71f3cc5c34f155"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T23:45:59.407Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_013f90b0046fc81a38e4d93f"
          mutation_id: "compatibility:sha256:c04e97e16b156c55ca81f0e6a8f9423c3909aeaa8a8611b64b787949909472bc"
          plan_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042327-PH5N6S"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:c04e97e16b156c55ca81f0e6a8f9423c3909aeaa8a8611b64b787949909472bc"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609042327-PH5N6S"
      compatibility:sha256:d05987cb8ccf82b6dba8397b5fd6bf51aac292b9a9189fdf8f06823ad01052e7:
        aggregate_digest: "sha256:9413d9f90b079b51c72642047b923f508403a6162778a96c2f0907904d57931c"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T23:45:59.407Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_76aa596193036ea262c17996"
          mutation_id: "compatibility:sha256:d05987cb8ccf82b6dba8397b5fd6bf51aac292b9a9189fdf8f06823ad01052e7"
          plan_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042327-PH5N6S"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d05987cb8ccf82b6dba8397b5fd6bf51aac292b9a9189fdf8f06823ad01052e7"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609042327-PH5N6S"
      compatibility:sha256:e7a767ac3abef08a06ab5887d7e2329873b60b576105d114e640a0de204eae1c:
        aggregate_digest: "sha256:f59c6d41dffe63624a6ba07959f0a93d5a3c2d3dd7fa5e4484b562a0f16c2307"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T23:32:29.002Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_72104f9770548ca288c05d3a"
          mutation_id: "compatibility:sha256:e7a767ac3abef08a06ab5887d7e2329873b60b576105d114e640a0de204eae1c"
          plan_digest: "sha256:d3392e38765e3c24e7ec3dc5f3221c2043e03933fc3dcf141df1bcbb7303bdc3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042327-PH5N6S"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e7a767ac3abef08a06ab5887d7e2329873b60b576105d114e640a0de204eae1c"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609042327-PH5N6S"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "fa586d9c7d1eddcf5cc76f6ccdf53e9df7679231"
  task_execution_context:
    base_ref: "main"
    base_sha: "d345cdb14c53a98a85ece41ab472433f8e1fb32c"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "d345cdb14c53a98a85ece41ab472433f8e1fb32c"
    version: 1
id_source: "generated"
---
## Summary

Run supervisor verification against the committed implementation without dirtying its checkout

User-authorized blocking repair for Arkady Factory APTA3E. Supervisor writes implementation/task evidence before checks that require a clean exact commit, causing ci:local:full to refuse its own checkout. Reproduce through existing supervisor tests and fix ordering or reuse the canonical isolated verification mechanism. Preserve exact implementation identity, evidence durability, interruption recovery, authority and clean-worktree checks. Do not change Factory checks. Exclude unrelated lifecycle/approval work and workspace-base recovery, which will be a subsequent bounded slice. Coordinate source ownership with the remote AgentPlane Clean Core task.

## Scope

- In scope: User-authorized blocking repair for Arkady Factory APTA3E. Supervisor writes implementation/task evidence before checks that require a clean exact commit, causing ci:local:full to refuse its own checkout. Reproduce through existing supervisor tests and fix ordering or reuse the canonical isolated verification mechanism. Preserve exact implementation identity, evidence durability, interruption recovery, authority and clean-worktree checks. Do not change Factory checks. Exclude unrelated lifecycle/approval work and workspace-base recovery, which will be a subsequent bounded slice. Coordinate source ownership with the remote AgentPlane Clean Core task.
- Out of scope: unrelated refactors not required for "Run supervisor verification against the committed implementation without dirtying its checkout".

## Plan

Preserve committed implementation verification by publishing pending task artifacts through the canonical supervisor artifact owner before branch verification.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
