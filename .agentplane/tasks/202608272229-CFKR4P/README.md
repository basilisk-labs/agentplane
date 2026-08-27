---
id: "202608272229-CFKR4P"
title: "Keep verification and review on the same semantic commit"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-27T22:32:19.301Z"
  updated_by: "USER"
  note: "Operator action under the user-authorized autonomous refactoring exception. Fresh plan sha256:824cd4fe3071eaa1b996c270fe96d2c82e446efeb7ea50af3713408465581342 and route sha256:d6f96ea39d71c019a4a014c470367719af35e9bca8ea376dbd7de93e53027366 reviewed. Four bounded verifier/test paths only; preserve all checks and authority guards; no release publication authority."
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
      - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
      - "packages/agentplane/src/commands/task/verify-record-execute.ts"
      - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
      - "packages/agentplane/src/commands/task/verify-record.unit.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Formal transitions and external effects remain owned by AgentPlane."
      - "Repair a reproduced required integration path with exact semantic-target continuity and real-Git regressions."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
      - "packages/agentplane/src/commands/task/verify-record-execute.ts"
      - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
      - "packages/agentplane/src/commands/task/verify-record.unit.test.ts"
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
          - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
          - "packages/agentplane/src/commands/task/verify-record-execute.ts"
          - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
          - "packages/agentplane/src/commands/task/verify-record.unit.test.ts"
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
      digest: "sha256:b76e799eb347ae8152269c5085cf19c95393b452d1b6603080d6fc63b0461701"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/quality-review-target.test.ts"
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
events:
  -
    type: "status"
    at: "2026-08-27T22:32:38.116Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-27T22:32:38.116Z"
doc_updated_by: "CODER"
description: "On exact main 9ab453ac00d41ea0a58cdd02e84bd0456233b151, run-cli.core.pr-flow.integrate-merge.test.ts test 'integrate promotes structured external incident candidates into the incident registry' fails at prepareHostedIntegrateFixture -> recordVerificationOk -> evaluator with missing observed changed file .agentplane/policy/incidents.md. The neighboring finish-only incident scenario passes. Diagnose the complete implementation -> pre-merge closure/policy commit -> verification -> evaluator -> integration/replay chain. Current verify-record-execute pins the review resolver head to the recorded implementation, while evaluator resolves current HEAD; prove the cause with real-Git controls before changing this. Retain the existing semantic-target resolver, frozen execution base, unchanged lifecycle-only identity, and exact evaluated diff/authority guards. Fix the smallest product/fixture scope justified by the proof. Cover a reviewable post-implementation policy change, lifecycle-only metadata, repeat verification and stale evidence. Replace any internal-call expectation only with behavior-backed coverage. Do not omit incidents from observed evidence, relax checks, add skips/timeouts, rewrite artifacts, change actual policy or CI, create a new verification architecture or implement AP-CORE-013. Preserve full mandatory CI and release 0.7.8 -> Core order. Keep provider-neutral wording as a separate cause. Two existing changes DVS5NN and AD3030 have priority for integration; planning and bounded diagnosis may proceed while their checks run. User authorized autonomous refactoring and supported operator approvals; release publication is separate."
sections:
  Summary: |-
    Keep verification and review on the same semantic commit

    On exact main 9ab453ac00d41ea0a58cdd02e84bd0456233b151, run-cli.core.pr-flow.integrate-merge.test.ts test 'integrate promotes structured external incident candidates into the incident registry' fails at prepareHostedIntegrateFixture -> recordVerificationOk -> evaluator with missing observed changed file .agentplane/policy/incidents.md. The neighboring finish-only incident scenario passes. Diagnose the complete implementation -> pre-merge closure/policy commit -> verification -> evaluator -> integration/replay chain. Current verify-record-execute pins the review resolver head to the recorded implementation, while evaluator resolves current HEAD; prove the cause with real-Git controls before changing this. Retain the existing semantic-target resolver, frozen execution base, unchanged lifecycle-only identity, and exact evaluated diff/authority guards. Fix the smallest product/fixture scope justified by the proof. Cover a reviewable post-implementation policy change, lifecycle-only metadata, repeat verification and stale evidence. Replace any internal-call expectation only with behavior-backed coverage. Do not omit incidents from observed evidence, relax checks, add skips/timeouts, rewrite artifacts, change actual policy or CI, create a new verification architecture or implement AP-CORE-013. Preserve full mandatory CI and release 0.7.8 -> Core order. Keep provider-neutral wording as a separate cause. Two existing changes DVS5NN and AD3030 have priority for integration; planning and bounded diagnosis may proceed while their checks run. User authorized autonomous refactoring and supported operator approvals; release publication is separate.
  Scope: |-
    - In scope: On exact main 9ab453ac00d41ea0a58cdd02e84bd0456233b151, run-cli.core.pr-flow.integrate-merge.test.ts test 'integrate promotes structured external incident candidates into the incident registry' fails at prepareHostedIntegrateFixture -> recordVerificationOk -> evaluator with missing observed changed file .agentplane/policy/incidents.md. The neighboring finish-only incident scenario passes. Diagnose the complete implementation -> pre-merge closure/policy commit -> verification -> evaluator -> integration/replay chain. Current verify-record-execute pins the review resolver head to the recorded implementation, while evaluator resolves current HEAD; prove the cause with real-Git controls before changing this. Retain the existing semantic-target resolver, frozen execution base, unchanged lifecycle-only identity, and exact evaluated diff/authority guards. Fix the smallest product/fixture scope justified by the proof. Cover a reviewable post-implementation policy change, lifecycle-only metadata, repeat verification and stale evidence. Replace any internal-call expectation only with behavior-backed coverage. Do not omit incidents from observed evidence, relax checks, add skips/timeouts, rewrite artifacts, change actual policy or CI, create a new verification architecture or implement AP-CORE-013. Preserve full mandatory CI and release 0.7.8 -> Core order. Keep provider-neutral wording as a separate cause. Two existing changes DVS5NN and AD3030 have priority for integration; planning and bounded diagnosis may proceed while their checks run. User authorized autonomous refactoring and supported operator approvals; release publication is separate.
    - Out of scope: unrelated refactors not required for "Keep verification and review on the same semantic commit".
  Plan: "One bounded work item repairs the reproduced verification/evaluator target disagreement, with real-Git positive/lifecycle/replay controls and unchanged integration protection."
  Verify Steps: |-
    1. Reproduce the exact integrate incident failure on the recorded base before editing. Expected: evaluator refuses an observed contract missing the committed policy diff; the neighboring finish-only control passes.
    2. Run `node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.tasks.incidents.test.ts --pool=forks --maxWorkers=1`. Expected: every selected test passes. A real-Git regression proves verification and evaluator agree on a reviewable post-implementation commit, retain the original target for lifecycle-only drift, and preserve repeat verification, frozen-base diff coverage and stale-evidence rejection.
    3. Run `bun run ci:local:full`. Expected: all mandatory checks pass without added skips, weakened checks or longer timeouts. Do not equate local task checks with hosted or release qualification.
    4. Run `git diff --check`. Expected: no whitespace errors. Review the change against the approved bounded plan: no actual policy, CI, lifecycle artifact or new architecture changes.
    5. Record the proved cause, evidence and separate provider-neutral wording remainder in Findings through the supported operator or semantic-result route. Expected: no unsupported integration, closure or release claims.
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
    digest: "sha256:81c6d062467b5fdb54ba3fd4dbf58998ecfbd057ffdd096f17464a8a63cc29df"
    grant_id: "5244b0d6-8ae2-48ef-863e-3aa864142d0b"
    issued_at: "2026-08-27T22:32:19.301Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:7ab9f8939093996aa613f5dff4bdb229d37bda1e95fb348e19bfbaff80b8516b"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608272229-CFKR4P"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-27T22:32:19.301Z"
        approved_by: "USER"
        approved_digest: "sha256:824cd4fe3071eaa1b996c270fe96d2c82e446efeb7ea50af3713408465581342"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-27T22:31:53.675Z"
      digest: "sha256:824cd4fe3071eaa1b996c270fe96d2c82e446efeb7ea50af3713408465581342"
      proposal:
        assumptions:
          - "The existing semantic-target resolver is correct; the verified mismatch is in its inputs at verification versus evaluation."
          - "The current incident integration test remains the end-to-end contract; no weakening or fixture artifact rewriting is permitted."
          - "The four-file bound can express the proof and minimal wiring correction; broader changes require a new scope decision."
        planning_baseline:
          captured_at: "2026-08-27T22:30:22.885Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:7f664f68da86a96ea330621c7def81de093c300b776c45a3140d0b1fda780add"
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
            - ".agentplane/tasks/202608251706-V287W1/README.md"
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
            - ".agentplane/tasks/202608272229-CFKR4P/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "9ab453ac00d41ea0a58cdd02e84bd0456233b151"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:2"
        schema_version: 1
        task_id: "202608272229-CFKR4P"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-ci"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "diff-check"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "A real-Git regression reproduces recorded implementation followed by a reviewable policy commit. Verification observes the complete frozen-base diff and targets the same semantic commit as evaluator preparation. The existing integrate incident-promotion scenario passes without weakening its evaluator guard."
              id: "semantic-target-agreement"
              required: true
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "Lifecycle-only task evidence retains the prior reviewed implementation. Repeated verification remains valid without hiding new semantic changes. Existing stale/non-ancestor and unrelated-task guards remain intact, and negative controls prove no false completion or missing observed path is accepted."
              id: "lifecycle-and-replay"
              required: true
            -
              check_ids:
                - "full-ci"
                - "diff-check"
              description: "Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.tasks.incidents.test.ts --pool=forks --maxWorkers=1. All selected tests and full mandatory CI pass. Change only the smallest necessary verifier wiring and regression tests. Do not alter the resolver policy, frozen execution base, task artifacts, CI, actual policy, timeouts or release/Core graph. Report proved cause and separate wording residual through semantic Findings; do not claim hosted integration prematurely."
              id: "bounded-proof"
              required: true
          evidence_fingerprint: "sha256:7f664f68da86a96ea330621c7def81de093c300b776c45a3140d0b1fda780add"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "A real-Git regression reproduces recorded implementation followed by a reviewable policy commit. Verification observes the complete frozen-base diff and targets the same semantic commit as evaluator preparation. The existing integrate incident-promotion scenario passes without weakening its evaluator guard."
                  id: "semantic-target-agreement"
                  required: true
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "Lifecycle-only task evidence retains the prior reviewed implementation. Repeated verification remains valid without hiding new semantic changes. Existing stale/non-ancestor and unrelated-task guards remain intact, and negative controls prove no false completion or missing observed path is accepted."
                  id: "lifecycle-and-replay"
                  required: true
                -
                  check_ids:
                    - "full-ci"
                    - "diff-check"
                  description: "Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.tasks.incidents.test.ts --pool=forks --maxWorkers=1. All selected tests and full mandatory CI pass. Change only the smallest necessary verifier wiring and regression tests. Do not alter the resolver policy, frozen execution base, task artifacts, CI, actual policy, timeouts or release/Core graph. Report proved cause and separate wording residual through semantic Findings; do not claim hosted integration prematurely."
                  id: "bounded-proof"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "packages/agentplane/src/commands/evaluator/evaluator-diff-evidence.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/verify-record-execute.ts"
                  - "packages/agentplane/src/commands/task/verify-record.unit.test.ts"
                  - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
                  - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
                  - "packages/agentplane/src/commands/shared/quality-review-target.ts"
                  - "packages/agentplane/src/commands/task/verify-record-observed-changes.ts"
                  - "packages/agentplane/src/commands/evaluator/evaluator-qualification-review.ts"
                  - "packages/testkit/src/cli-harness.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts"
                symbol_hints:
                  - "resolveQualityReviewTargetSha"
                  - "recordedTaskImplementationCommitSha"
                  - "resolveEvaluatorReviewTarget"
                  - "resolveObservedVerificationChangedPaths"
              depends_on: []
              expected_outputs:
                - "artifact:verification-target-report"
              id: "align-verification-review-target"
              objective: "Prove the existing verifier/evaluator target mismatch with a real-Git regression before editing product code. Cover a recorded implementation, lifecycle-only evidence and a later reviewable policy commit. Make verification resolve the same current semantic target as evaluator preparation using the existing resolver and recorded implementation as a continuity anchor, not a cap that hides later semantic work. Preserve frozen-base diff observation and exact authority/stale evidence guards. Update the pinned-head internal-call test only after behavioral proof. Run the task-specific focused suites, lint/format, full CI and diff checks. Keep the provider-neutral wording failure separate. Return a blocker if the fix requires broader production scope or a new verification model. Prioritize pending DVS5NN and AD3030 integrations at safe boundaries."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/verify-record-execute.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/verify-record.unit.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/verify-record-execute.ts"
                - "packages/agentplane/src/commands/task/verify-record.unit.test.ts"
                - "packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts"
                - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-ci"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "diff-check"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "A real-Git regression reproduces recorded implementation followed by a reviewable policy commit. Verification observes the complete frozen-base diff and targets the same semantic commit as evaluator preparation. The existing integrate incident-promotion scenario passes without weakening its evaluator guard."
                    id: "semantic-target-agreement"
                    required: true
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "Lifecycle-only task evidence retains the prior reviewed implementation. Repeated verification remains valid without hiding new semantic changes. Existing stale/non-ancestor and unrelated-task guards remain intact, and negative controls prove no false completion or missing observed path is accepted."
                    id: "lifecycle-and-replay"
                    required: true
                  -
                    check_ids:
                      - "full-ci"
                      - "diff-check"
                    description: "Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.tasks.incidents.test.ts --pool=forks --maxWorkers=1. All selected tests and full mandatory CI pass. Change only the smallest necessary verifier wiring and regression tests. Do not alter the resolver policy, frozen execution base, task artifacts, CI, actual policy, timeouts or release/Core graph. Report proved cause and separate wording residual through semantic Findings; do not claim hosted integration prematurely."
                    id: "bounded-proof"
                    required: true
                evidence_fingerprint: "sha256:7f664f68da86a96ea330621c7def81de093c300b776c45a3140d0b1fda780add"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608272229-CFKR4P"
    event_cursor: 0
    final_validation: null
    id: "202608272229-CFKR4P"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "git diff --check"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-27T22:30:20.524Z"
      constraints: []
      request: |-
        Keep verification and review on the same semantic commit

        On exact main 9ab453ac00d41ea0a58cdd02e84bd0456233b151, run-cli.core.pr-flow.integrate-merge.test.ts test 'integrate promotes structured external incident candidates into the incident registry' fails at prepareHostedIntegrateFixture -> recordVerificationOk -> evaluator with missing observed changed file .agentplane/policy/incidents.md. The neighboring finish-only incident scenario passes. Diagnose the complete implementation -> pre-merge closure/policy commit -> verification -> evaluator -> integration/replay chain. Current verify-record-execute pins the review resolver head to the recorded implementation, while evaluator resolves current HEAD; prove the cause with real-Git controls before changing this. Retain the existing semantic-target resolver, frozen execution base, unchanged lifecycle-only identity, and exact evaluated diff/authority guards. Fix the smallest product/fixture scope justified by the proof. Cover a reviewable post-implementation policy change, lifecycle-only metadata, repeat verification and stale evidence. Replace any internal-call expectation only with behavior-backed coverage. Do not omit incidents from observed evidence, relax checks, add skips/timeouts, rewrite artifacts, change actual policy or CI, create a new verification architecture or implement AP-CORE-013. Preserve full mandatory CI and release 0.7.8 -> Core order. Keep provider-neutral wording as a separate cause. Two existing changes DVS5NN and AD3030 have priority for integration; planning and bounded diagnosis may proceed while their checks run. User authorized autonomous refactoring and supported operator approvals; release publication is separate.
      task_id: "202608272229-CFKR4P"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 3
    schema_version: 1
    updated_at: "2026-08-27T22:32:19.301Z"
    work_items:
      align-verification-review-target:
        attempt: 0
        claim_id: null
        id: "align-verification-review-target"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "9ab453ac00d41ea0a58cdd02e84bd0456233b151"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "9ab453ac00d41ea0a58cdd02e84bd0456233b151"
    version: 1
id_source: "generated"
---
## Summary

Keep verification and review on the same semantic commit

On exact main 9ab453ac00d41ea0a58cdd02e84bd0456233b151, run-cli.core.pr-flow.integrate-merge.test.ts test 'integrate promotes structured external incident candidates into the incident registry' fails at prepareHostedIntegrateFixture -> recordVerificationOk -> evaluator with missing observed changed file .agentplane/policy/incidents.md. The neighboring finish-only incident scenario passes. Diagnose the complete implementation -> pre-merge closure/policy commit -> verification -> evaluator -> integration/replay chain. Current verify-record-execute pins the review resolver head to the recorded implementation, while evaluator resolves current HEAD; prove the cause with real-Git controls before changing this. Retain the existing semantic-target resolver, frozen execution base, unchanged lifecycle-only identity, and exact evaluated diff/authority guards. Fix the smallest product/fixture scope justified by the proof. Cover a reviewable post-implementation policy change, lifecycle-only metadata, repeat verification and stale evidence. Replace any internal-call expectation only with behavior-backed coverage. Do not omit incidents from observed evidence, relax checks, add skips/timeouts, rewrite artifacts, change actual policy or CI, create a new verification architecture or implement AP-CORE-013. Preserve full mandatory CI and release 0.7.8 -> Core order. Keep provider-neutral wording as a separate cause. Two existing changes DVS5NN and AD3030 have priority for integration; planning and bounded diagnosis may proceed while their checks run. User authorized autonomous refactoring and supported operator approvals; release publication is separate.

## Scope

- In scope: On exact main 9ab453ac00d41ea0a58cdd02e84bd0456233b151, run-cli.core.pr-flow.integrate-merge.test.ts test 'integrate promotes structured external incident candidates into the incident registry' fails at prepareHostedIntegrateFixture -> recordVerificationOk -> evaluator with missing observed changed file .agentplane/policy/incidents.md. The neighboring finish-only incident scenario passes. Diagnose the complete implementation -> pre-merge closure/policy commit -> verification -> evaluator -> integration/replay chain. Current verify-record-execute pins the review resolver head to the recorded implementation, while evaluator resolves current HEAD; prove the cause with real-Git controls before changing this. Retain the existing semantic-target resolver, frozen execution base, unchanged lifecycle-only identity, and exact evaluated diff/authority guards. Fix the smallest product/fixture scope justified by the proof. Cover a reviewable post-implementation policy change, lifecycle-only metadata, repeat verification and stale evidence. Replace any internal-call expectation only with behavior-backed coverage. Do not omit incidents from observed evidence, relax checks, add skips/timeouts, rewrite artifacts, change actual policy or CI, create a new verification architecture or implement AP-CORE-013. Preserve full mandatory CI and release 0.7.8 -> Core order. Keep provider-neutral wording as a separate cause. Two existing changes DVS5NN and AD3030 have priority for integration; planning and bounded diagnosis may proceed while their checks run. User authorized autonomous refactoring and supported operator approvals; release publication is separate.
- Out of scope: unrelated refactors not required for "Keep verification and review on the same semantic commit".

## Plan

One bounded work item repairs the reproduced verification/evaluator target disagreement, with real-Git positive/lifecycle/replay controls and unchanged integration protection.

## Verify Steps

1. Reproduce the exact integrate incident failure on the recorded base before editing. Expected: evaluator refuses an observed contract missing the committed policy diff; the neighboring finish-only control passes.
2. Run `node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/verify-record.durability.unit.test.ts packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.tasks.incidents.test.ts --pool=forks --maxWorkers=1`. Expected: every selected test passes. A real-Git regression proves verification and evaluator agree on a reviewable post-implementation commit, retain the original target for lifecycle-only drift, and preserve repeat verification, frozen-base diff coverage and stale-evidence rejection.
3. Run `bun run ci:local:full`. Expected: all mandatory checks pass without added skips, weakened checks or longer timeouts. Do not equate local task checks with hosted or release qualification.
4. Run `git diff --check`. Expected: no whitespace errors. Review the change against the approved bounded plan: no actual policy, CI, lifecycle artifact or new architecture changes.
5. Record the proved cause, evidence and separate provider-neutral wording remainder in Findings through the supported operator or semantic-result route. Expected: no unsupported integration, closure or release claims.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
