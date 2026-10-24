---
id: "202610240307-FBQ713"
title: "Repair shared fake GitHub branch metadata for protected-base integration"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run lint"
  - "node node_modules/.bin/prettier --check packages/testkit/src/github-pr.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
  - "node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-10-24T03:23:16.047Z"
  updated_by: "agentplane:kernel-controller"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-10-24T04:02:41.281Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-10-24T03:22:56.521Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "1fac91e7f907a32ab7eaefbe51d03da4660dcfdd"
  review_identity_digest: "sha256:a3868a304f00b7265f2e9da792ba8b18485b40a5e1e731ddbfc377c418e77955"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202610240307-FBQ713/b29b383f0053c9825445d5da268538cac1b1dbc917ea5bd18e25c53d171183a3/quality-report.json"
  findings:
    - "Commit 1fac91e7f907a32ab7eaefbe51d03da4660dcfdd changes only the shared fake provider and the protected-main integration test outside native task records."
    - "The fake returns matching name and protected=true for the exact branch metadata route, retains the protection detail route, and leaves unprotected and unexpected-command behavior unchanged."
    - "The integration test asserts metadata before protection and still verifies E_HANDOFF without main mutation. Native declared checks passed: 8/8 Vitest, Prettier, and lint with zero errors. Independent read-only review found no actionable issue."
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
    allowed_capabilities:
      - "repository_write"
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    allowed_resources: []
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
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
      - "packages/testkit/src/github-pr.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
      - "packages/testkit/src/github-pr.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
      - "packages/testkit"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
      - "packages/testkit/src/github-pr.ts"
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
        id: "recorded-check-10"
        result: "pass"
      -
        id: "recorded-check-11"
        result: "pass"
      -
        id: "recorded-check-12"
        result: "pass"
      -
        id: "recorded-check-13"
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
        id: "recorded-check-5"
        result: "pass"
      -
        id: "recorded-check-6"
        result: "pass"
      -
        id: "recorded-check-7"
        result: "pass"
      -
        id: "recorded-check-8"
        result: "pass"
      -
        id: "recorded-check-9"
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
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
          - "packages/testkit/src/github-pr.ts"
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
      digest: "sha256:86dc4f3a7bb01a5a5a172a7f857061f552afd4cddfe04120632ff00392776f89"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
          - "packages/testkit"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
          - "packages/testkit/src/github-pr.ts"
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
  hash: "1fac91e7f907a32ab7eaefbe51d03da4660dcfdd"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-10-24T04:02:41.281Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-10-24T04:02:42.530Z"
doc_updated_by: "SUPERVISOR"
description: "The protected-base integration fixture installs installFakeGhPrLookup from packages/testkit/src/github-pr.ts. Production correctly reads repos/example/repo/branches/main before its protection detail; the fake currently returns [] for the first request, causing run-cli.core.pr-flow.integrate-validation.test.ts to fail in 0.7.13 release CI. Add the exact protected-branch metadata response ahead of the protection response, preserve unknown-command rejection and existing unprotected behavior, and assert the two-call protection observation in the focused integration test. Audit other protection fakes for actual call sites; leave unused or separate-contract helpers unchanged. Do not change production protection policy. Validate targeted Vitest, formatting, lint, and full local CI."
sections:
  Summary: |-
    Repair shared fake GitHub branch metadata for protected-base integration

    The protected-base integration fixture installs installFakeGhPrLookup from packages/testkit/src/github-pr.ts. Production correctly reads repos/example/repo/branches/main before its protection detail; the fake currently returns [] for the first request, causing run-cli.core.pr-flow.integrate-validation.test.ts to fail in 0.7.13 release CI. Add the exact protected-branch metadata response ahead of the protection response, preserve unknown-command rejection and existing unprotected behavior, and assert the two-call protection observation in the focused integration test. Audit other protection fakes for actual call sites; leave unused or separate-contract helpers unchanged. Do not change production protection policy. Validate targeted Vitest, formatting, lint, and full local CI.
  Scope: |-
    - In scope: The protected-base integration fixture installs installFakeGhPrLookup from packages/testkit/src/github-pr.ts. Production correctly reads repos/example/repo/branches/main before its protection detail; the fake currently returns [] for the first request, causing run-cli.core.pr-flow.integrate-validation.test.ts to fail in 0.7.13 release CI. Add the exact protected-branch metadata response ahead of the protection response, preserve unknown-command rejection and existing unprotected behavior, and assert the two-call protection observation in the focused integration test. Audit other protection fakes for actual call sites; leave unused or separate-contract helpers unchanged. Do not change production protection policy. Validate targeted Vitest, formatting, lint, and full local CI.
    - Out of scope: unrelated refactors not required for "Repair shared fake GitHub branch metadata for protected-base integration".
  Plan: "1. Execute approved WorkItem repair-protected-branch-fixture."
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair shared fake GitHub branch metadata for protected-base integration". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair shared fake GitHub branch metadata for protected-base integration". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-10-24T04:02:41.281Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:70635d2d1e446ec5dc1dc6e74ac3e2b0530e1dba008dc1b2b81825b9bd3f540a, input_digest=sha256:dd9d3fbc5886e6f65f04b50762d7efd4cf708c48f3079ea467a23ffd7d073bb1

    Details:

    Check: affected_unit_integration
    Command: node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610240307-FBQ713 Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: node node_modules/.bin/prettier --check packages/testkit/src/github-pr.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610240307-FBQ713 Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610240307-FBQ713 Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610240307-FBQ713 Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610240307-FBQ713 Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: node node_modules/.bin/prettier --check packages/testkit/src/github-pr.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610240307-FBQ713 Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610240307-FBQ713 Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610240307-FBQ713 Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610240307-FBQ713 Verification Contract check full_regression

    Check: task_outcome
    Command: node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202610240307-FBQ713 Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: node node_modules/.bin/prettier --check packages/testkit/src/github-pr.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202610240307-FBQ713 Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202610240307-FBQ713 Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202610240307-FBQ713 Verification Contract check task_outcome (4/4)

    NativeTaskIdentityRef:
    - plan_digest: sha256:d9c20c1e2d5d3330750520e222cc44d841694318f7eaa9c0bd075ec9a4765e4c
    - policy_digest: sha256:1150ba6caefe9e829c30b3520b9246ed1ec7ebbeedbe788c63cf7989015dbb46
    - capability_digest: sha256:5551c8e11ccfe6eaee9296c0fa0b7d81fc6eaab77d7e10e602e62d9ce0042dd6
    - checks_digest: sha256:e84c024ebff11bb4f757b7bfb538421dc28ddd8041cc80530f459abc36d648a2
    - identity_digest: sha256:1ebf28cbb4241db7ece72a91fbf097443d603a1ebc473fb48985aa3a1e5e86d6

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202610240307-FBQ713
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
  agentplane.kernel_operational_projection:
    digest: "sha256:1a7284a8aa4475125ee5c3bf4410a7de6c8d162a9376bca16a7e9e5a4376a950"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202610240307-FBQ713/b29b383f0053c9825445d5da268538cac1b1dbc917ea5bd18e25c53d171183a3/quality-report.json"
    findings:
      - "Commit 1fac91e7f907a32ab7eaefbe51d03da4660dcfdd changes only the shared fake provider and the protected-main integration test outside native task records."
      - "The fake returns matching name and protected=true for the exact branch metadata route, retains the protection detail route, and leaves unprotected and unexpected-command behavior unchanged."
      - "The integration test asserts metadata before protection and still verifies E_HANDOFF without main mutation. Native declared checks passed: 8/8 Vitest, Prettier, and lint with zero errors. Independent read-only review found no actionable issue."
    implementation_commit: "1fac91e7f907a32ab7eaefbe51d03da4660dcfdd"
    implementation_tree: "e56fee7f6209e3370b23e3466c138b29f8ad71bc"
    projected_at: "2026-10-24T03:22:56.521Z"
    review_identity_digest: "sha256:a3868a304f00b7265f2e9da792ba8b18485b40a5e1e731ddbfc377c418e77955"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:723be2604bb593e48457e57f0517f0cbf590b7b6657f440df7a427aea1555c19"
    work_order_id: "sha256:14bb2d80babfcdca71c81a11fb9c069368abec459fbb7d44b87dda4e7fb66824"
  task_execution_context:
    base_ref: "main"
    base_sha: "f60646cd285fda515d2d6f62d5578242ce213ff6"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:68696fbc6043eaf7146cf09a6ec53a905e98327d16d1493f022abf89081bb97c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d9c20c1e2d5d3330750520e222cc44d841694318f7eaa9c0bd075ec9a4765e4c"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:b4c3f87f2726a56e8168563c14dcd080800961e216bf57802c96924e598ea08e"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
              - "packages/testkit/src/github-pr.ts"
            task_id: "202610240307-FBQ713"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:c25629981e83bebf0beac294b1079e4243ba95559c54a69f59ecbf4db7ecd657"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d9c20c1e2d5d3330750520e222cc44d841694318f7eaa9c0bd075ec9a4765e4c"
            plan_revision: 1
            policy_digests:
              - "sha256:37492408e7e56de75241cc87a953f635dd9852af3cd93225899233274890938c"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:b4c3f87f2726a56e8168563c14dcd080800961e216bf57802c96924e598ea08e"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:68696fbc6043eaf7146cf09a6ec53a905e98327d16d1493f022abf89081bb97c"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
              - "packages/testkit/src/github-pr.ts"
            task_id: "202610240307-FBQ713"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "full_regression"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
              - "packages/testkit/src/github-pr.ts"
            evidence_digest: "sha256:9f1b02d3ce8f92135a748f49d3ed80c10e5389513e474b36a4500760ab5bd99a"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:b4c3f87f2726a56e8168563c14dcd080800961e216bf57802c96924e598ea08e"
        digest: "sha256:d9c20c1e2d5d3330750520e222cc44d841694318f7eaa9c0bd075ec9a4765e4c"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:5098726842df146af6bbee864ac65914ccc041da0db435d294a282ccc37f8bbd"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/testkit/src/github-pr.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
            expected_outputs:
              - "protected-branch-fixture"
              - "focused-regression-evidence"
            id: "repair-protected-branch-fixture"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:497bf691f261a2caf4c8c663f9c1419953291d0a2074d6421c610fca5a3e6557"
        identity:
          check_id: "canonical-final-contracts-v2"
          command_digest: "sha256:892e86d9a16cbf25c094883fb5b07cd7f9a5cc5d2274b4fc03686c4df8ac1e11"
          environment_digest: "sha256:7ff519191a4e4ab05b9ac05c4db517c0c974d6c2c16756651928cb40b11dde24"
          implementation_identity: "sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
          toolchain_digest: "sha256:cab11ff97c0da513b2eda227177606e96c4cfe38b6ea707a4237528d37c0cf54"
        observed_at: "2026-10-24T03:23:18.814Z"
        status: "PASSED"
      id: "202610240307-FBQ713"
      intent_digest: "sha256:3247323f69ad68480ca1887c976b5dba6ca2ea55905d90a1463b9d26a46e1f7a"
      migration_receipts: []
      mutation_receipts:
        capture:202610240307-FBQ713:
          after_revision: 1
          aggregate_digest: "sha256:8e8b787bb8a21a03f9d12f85190c0cece98faa66585028abfb387a0c1537cd2b"
          before_revision: 0
          command_digest: "sha256:0419986af5537978a905127145449a621a2f1438077e537625bf3b7f493b2753"
          effect_ids: []
          event_digests:
            - "sha256:1f9f7dec20f4f17e824d99c7e84f500356e11c6e6b0dad2cc04179838c346414"
          mutation_id: "capture:202610240307-FBQ713"
        final-validation:sha256:497bf691f261a2caf4c8c663f9c1419953291d0a2074d6421c610fca5a3e6557:11:
          after_revision: 12
          aggregate_digest: "sha256:6196bae6c3b17d37dd14cd9b5d1f5ab8421225e7a787d437937374100a0c6355"
          before_revision: 11
          command_digest: "sha256:19a1569c32bf78eed92cb5e6e084107473fcbea157e00aa6dc81fb9dd8d13c6c"
          effect_ids: []
          event_digests:
            - "sha256:6bd82457d4b5be8d2ae1ea6425a49fa07340c17614b26e0249e8f5a2cd63119a"
          mutation_id: "final-validation:sha256:497bf691f261a2caf4c8c663f9c1419953291d0a2074d6421c610fca5a3e6557:11"
        kernel_work_item_claim_required:sha256:8bf1c2f336b5875b85e2de2e65be03b85b220a0419485b941fec93442aaf12df:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039:
          after_revision: 5
          aggregate_digest: "sha256:bba4c0e672c802e70c649866a45c14cceff5c105d4e4097f703122e2bd42814e"
          before_revision: 4
          command_digest: "sha256:903baaac4cbd6d1b72e25d2f6fd518c0fc50c6c8390d75462bdca833281e526a"
          effect_ids: []
          event_digests:
            - "sha256:d1fb4a8b08dfe4874a90d78924b5c352d20d9c4e1a932aaedde8733aadf9d036"
          mutation_id: "kernel_work_item_claim_required:sha256:8bf1c2f336b5875b85e2de2e65be03b85b220a0419485b941fec93442aaf12df:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
        kernel_work_item_execution_required:sha256:b2e05e3f6f690d3783552df1a860ec31f2e3efb7b01ca64810bee3218552a266:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039:
          after_revision: 6
          aggregate_digest: "sha256:53a1c36f178a4c2162c4d2a32c979724eb44be47a9cc6f18377ba45dbe5a0a36"
          before_revision: 5
          command_digest: "sha256:19bea378db06ae8dc44cc66d5913893edb6309db7eee43a5a298f544486ed57e"
          effect_ids: []
          event_digests:
            - "sha256:24bd11cbb84cf187cb7de17701b35e7cc11fc5f72fa10e9a96b8a9b16fd88dec"
          mutation_id: "kernel_work_item_execution_required:sha256:b2e05e3f6f690d3783552df1a860ec31f2e3efb7b01ca64810bee3218552a266:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
        kernel_work_item_inspection_required:sha256:fcfd3c30c3544481722e63046e286fa28e0704fa97d5738757e1edd003199eeb:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b:
          after_revision: 9
          aggregate_digest: "sha256:6cde6030b3c57783e9c382531a788c04256f5203828eb6b8fbc69991ef8124aa"
          before_revision: 8
          command_digest: "sha256:eaa010e1ab49ae8d59ec53988f99481c4b48a64323c8a57b0b0e1833121aadf3"
          effect_ids: []
          event_digests:
            - "sha256:b1af1c21daf46091a893202be3375460fa4ec911dde7b90816853b68ea492c3f"
          mutation_id: "kernel_work_item_inspection_required:sha256:fcfd3c30c3544481722e63046e286fa28e0704fa97d5738757e1edd003199eeb:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        kernel_work_item_materialization_required:sha256:c64ea5a6408af9b8dcd6e611b4ca50e61ba40e051ca6dd092221cb83564d0389:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039:
          after_revision: 4
          aggregate_digest: "sha256:22a9b01254a2c20da4c75144efdb46c744c8b0f3d9027f9fad43639ebc4bb768"
          before_revision: 3
          command_digest: "sha256:d5708d836f84d080cc29b9bf1ec448a64c279337a5a9fd6decb9a789eb58f427"
          effect_ids: []
          event_digests:
            - "sha256:df161b51325b73e33e1fcf59c1b1b0755a4945dfa08169e7371cbd14796c6511"
          mutation_id: "kernel_work_item_materialization_required:sha256:c64ea5a6408af9b8dcd6e611b4ca50e61ba40e051ca6dd092221cb83564d0389:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
        result:sha256:14bb2d80babfcdca71c81a11fb9c069368abec459fbb7d44b87dda4e7fb66824:
          after_revision: 8
          aggregate_digest: "sha256:eb9dd81f7831b78d02df43b8806403696771f19c648d80c63ef65ff40c60b128"
          before_revision: 7
          command_digest: "sha256:c44a7b8e509cd51ac0524aedc93d9c6b4f683eaf722e027a8cf92036e70e6079"
          effect_ids: []
          event_digests:
            - "sha256:0a5d8b17cf9c833101ff701077126022cc5ffacdc5ca54b9c1359bf0a9b69978"
          mutation_id: "result:sha256:14bb2d80babfcdca71c81a11fb9c069368abec459fbb7d44b87dda4e7fb66824"
        result:sha256:cfc4516b7c60fcb5886926fd0b37485e1ffe6135745de8fec43fce2c9ec1fd46:
          after_revision: 2
          aggregate_digest: "sha256:edf253cf6d0f4f7f13954325e4a59180126c19b2ddf5139e856c4114e91647f7"
          before_revision: 1
          command_digest: "sha256:6ffd6e4b687859531d10c27864cdfa12413db3a08e6d071b481d90b94d48cb85"
          effect_ids: []
          event_digests:
            - "sha256:8161adf0bdfe5b1dc0d021c901f9bb664ceac11937feac265f89d91cc5c98978"
          mutation_id: "result:sha256:cfc4516b7c60fcb5886926fd0b37485e1ffe6135745de8fec43fce2c9ec1fd46"
        sha256:051a34c0d5cea29a4dd28dd4c98c9376d721fdf54343b65eb933e748fd3b8586:
          after_revision: 7
          aggregate_digest: "sha256:4385880f2b311c964a2dd901c091483761a359d4622fb48bb1b9c0ee4e1f5a85"
          before_revision: 6
          command_digest: "sha256:a983a310cc55ca9538be020450d9e6ceb7707b3f380e500030b4aac99f3e9079"
          effect_ids: []
          event_digests:
            - "sha256:9964169bb29cb6537ff4d44d067d986f2fe41c8a30a35d88858a129cebddccd0"
          mutation_id: "sha256:051a34c0d5cea29a4dd28dd4c98c9376d721fdf54343b65eb933e748fd3b8586"
        sha256:b7515100a7fb4f46b492cd7e2d8420fcab34cc49180418a5a8c204faadda1c4d:
          after_revision: 3
          aggregate_digest: "sha256:3983128097963d135c97abc829b3101347bb2230fa9f006dbc9561d0ea541a49"
          before_revision: 2
          command_digest: "sha256:f2b6732d492ed94d465347b9bda7614b58e23813913b1d04a997bd6cfec07cc2"
          effect_ids: []
          event_digests:
            - "sha256:afd3f52e209206e2616d18b938f8df05571cd8756f24fefc031aaedcc05b6c1a"
          mutation_id: "sha256:b7515100a7fb4f46b492cd7e2d8420fcab34cc49180418a5a8c204faadda1c4d"
        validation-resolution:sha256:4f410bf31b074ddc359d13a5cefc13f53307184cb58fb00aa94d720df8604d90:
          after_revision: 11
          aggregate_digest: "sha256:f12fa273d61dfe26fb2d97b802946c7b26388ef334077f9a28f83835fa67ed6a"
          before_revision: 10
          command_digest: "sha256:da2a43e82c90f08928d6153dbe24a0d9bb57136b40671e881e5c6be0a086d8ea"
          effect_ids: []
          event_digests:
            - "sha256:0239793679aba40037d036dc58d4322bb80a9c0c002d22e9f4a6267c09518796"
          mutation_id: "validation-resolution:sha256:4f410bf31b074ddc359d13a5cefc13f53307184cb58fb00aa94d720df8604d90"
        validation:sha256:b29b383f0053c9825445d5da268538cac1b1dbc917ea5bd18e25c53d171183a3:
          after_revision: 10
          aggregate_digest: "sha256:23477d096dbd3340a7859d2a074a9f15d6c291714acf756fa494ea84ebe3b422"
          before_revision: 9
          command_digest: "sha256:ecdf91b7c92fe53565b86ef9ea1738d37164b535c33c45dd5f1ac4cace2a2e0e"
          effect_ids: []
          event_digests:
            - "sha256:d03ad94f1949a8cc0cfb6a477b7c446376ec8ae2b4d173d8c159f697ae0fea14"
          mutation_id: "validation:sha256:b29b383f0053c9825445d5da268538cac1b1dbc917ea5bd18e25c53d171183a3"
      plan_history: []
      revision: 12
      schema_version: 1
      state: "FINAL_VALIDATION"
      work_items:
        repair-protected-branch-fixture:
          attempt: 1
          claim_id: "sha256:e9eb72b0f0cc9aea08a17fe53849195baca9f2dcd439c7f8978fe17382fb3c92"
          definition:
            contract_digest: "sha256:5098726842df146af6bbee864ac65914ccc041da0db435d294a282ccc37f8bbd"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/testkit/src/github-pr.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
            expected_outputs:
              - "protected-branch-fixture"
              - "focused-regression-evidence"
            id: "repair-protected-branch-fixture"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:34f4dd4aaa4966f85419a846860fd51c8134e40c82c25b078b42bdc64457646d"
              id: "protected-branch-fixture"
              kind: "source_file"
              plan_revision: 1
              repository_fingerprint: "sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
              task_id: "202610240307-FBQ713"
              work_item_id: "repair-protected-branch-fixture"
            -
              attempt: 1
              digest: "sha256:6adeb3177a4503a241b213a66b99900484b4f277e7d3f126a78053365bff221b"
              id: "focused-regression-evidence"
              kind: "test_file"
              plan_revision: 1
              repository_fingerprint: "sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
              task_id: "202610240307-FBQ713"
              work_item_id: "repair-protected-branch-fixture"
          result_digest: "sha256:a30c53488d6a264d71c08802a334a9d472344892414634e881ff26ea263df7cf"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:16e35127fd2930aa5c2de9a447a916911bd5bea0c4e366f4c626b3e1eb904eff"
              - "sha256:a3868a304f00b7265f2e9da792ba8b18485b40a5e1e731ddbfc377c418e77955"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:892e86d9a16cbf25c094883fb5b07cd7f9a5cc5d2274b4fc03686c4df8ac1e11"
              environment_digest: "sha256:5c919a6e630b6edc805c059e2c90f53f93f10099a1e8339d265d96a934427552"
              implementation_identity: "sha256:a30c53488d6a264d71c08802a334a9d472344892414634e881ff26ea263df7cf"
              toolchain_digest: "sha256:5a3b0e29e27baf58fa8f4697c8a875f35fc209aaa906b14d0f3f20bd67718381"
            observed_at: "2026-10-24T03:22:56.521Z"
            status: "PASSED"
    digest: "sha256:d7bafeb20c2e90f3e50c78b70dc0765aa08ce8d609ef28a237adf916581fb7c5"
    documents:
      contracts:
        sha256:5098726842df146af6bbee864ac65914ccc041da0db435d294a282ccc37f8bbd:
          acceptance_criteria:
            - "When protectedBranch=main, installFakeGhPrLookup returns {name:'main',protected:true} for the exact branch metadata endpoint and preserves the protection detail response."
            - "The protected-main integration test verifies the branch metadata and protection detail calls in order and reaches the hosted handoff; no production protection code changes."
            - "Unknown fake gh commands still fail, unprotected behavior remains unchanged, and no unused or separate-contract fixtures are modified."
            - "Focused tests, formatting, lint, and full local CI pass before PR publication."
          objective: "Make the active shared fake GitHub PR provider return exact protected branch metadata before protection details and prove the integration handoff uses both observations."
          role: "EXECUTOR"
          verification_commands:
            - "node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
            - "node node_modules/.bin/prettier --check packages/testkit/src/github-pr.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts"
            - "bun run lint"
      intent:
        context: "The protected-base integration fixture installs installFakeGhPrLookup from packages/testkit/src/github-pr.ts. Production correctly reads repos/example/repo/branches/main before its protection detail; the fake currently returns [] for the first request, causing run-cli.core.pr-flow.integrate-validation.test.ts to fail in 0.7.13 release CI. Add the exact protected-branch metadata response ahead of the protection response, preserve unknown-command rejection and existing unprotected behavior, and assert the two-call protection observation in the focused integration test. Audit other protection fakes for actual call sites; leave unused or separate-contract helpers unchanged. Do not change production protection policy. Validate targeted Vitest, formatting, lint, and full local CI."
        objective: "Repair shared fake GitHub branch metadata for protected-base integration"
    events:
      -
        command_digest: "sha256:0419986af5537978a905127145449a621a2f1438077e537625bf3b7f493b2753"
        id: "capture:202610240307-FBQ713:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202610240307-FBQ713"
        occurred_at: "2026-10-24T03:07:41.749Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202610240307-FBQ713"
        task_revision: 1
      -
        command_digest: "sha256:6ffd6e4b687859531d10c27864cdfa12413db3a08e6d071b481d90b94d48cb85"
        id: "result:sha256:cfc4516b7c60fcb5886926fd0b37485e1ffe6135745de8fec43fce2c9ec1fd46:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:cfc4516b7c60fcb5886926fd0b37485e1ffe6135745de8fec43fce2c9ec1fd46"
        occurred_at: "2026-10-24T03:08:25.054Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202610240307-FBQ713"
        task_revision: 2
      -
        command_digest: "sha256:f2b6732d492ed94d465347b9bda7614b58e23813913b1d04a997bd6cfec07cc2"
        id: "sha256:b7515100a7fb4f46b492cd7e2d8420fcab34cc49180418a5a8c204faadda1c4d:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:b7515100a7fb4f46b492cd7e2d8420fcab34cc49180418a5a8c204faadda1c4d"
        occurred_at: "2026-10-24T03:08:33.665Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202610240307-FBQ713"
        task_revision: 3
      -
        command_digest: "sha256:d5708d836f84d080cc29b9bf1ec448a64c279337a5a9fd6decb9a789eb58f427"
        id: "kernel_work_item_materialization_required:sha256:c64ea5a6408af9b8dcd6e611b4ca50e61ba40e051ca6dd092221cb83564d0389:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:c64ea5a6408af9b8dcd6e611b4ca50e61ba40e051ca6dd092221cb83564d0389:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
        occurred_at: "2026-10-24T03:08:42.661Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202610240307-FBQ713"
        task_revision: 4
      -
        command_digest: "sha256:903baaac4cbd6d1b72e25d2f6fd518c0fc50c6c8390d75462bdca833281e526a"
        id: "kernel_work_item_claim_required:sha256:8bf1c2f336b5875b85e2de2e65be03b85b220a0419485b941fec93442aaf12df:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:8bf1c2f336b5875b85e2de2e65be03b85b220a0419485b941fec93442aaf12df:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
        occurred_at: "2026-10-24T03:08:54.678Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202610240307-FBQ713"
        task_revision: 5
      -
        command_digest: "sha256:19bea378db06ae8dc44cc66d5913893edb6309db7eee43a5a298f544486ed57e"
        id: "kernel_work_item_execution_required:sha256:b2e05e3f6f690d3783552df1a860ec31f2e3efb7b01ca64810bee3218552a266:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b2e05e3f6f690d3783552df1a860ec31f2e3efb7b01ca64810bee3218552a266:sha256:7b025a2f9d81739475a5b5e1486577648a3b6b54a74310c841be10d0504f8039"
        occurred_at: "2026-10-24T03:09:24.713Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202610240307-FBQ713"
        task_revision: 6
      -
        command_digest: "sha256:a983a310cc55ca9538be020450d9e6ceb7707b3f380e500030b4aac99f3e9079"
        id: "sha256:051a34c0d5cea29a4dd28dd4c98c9376d721fdf54343b65eb933e748fd3b8586:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:051a34c0d5cea29a4dd28dd4c98c9376d721fdf54343b65eb933e748fd3b8586"
        occurred_at: "2026-10-24T03:18:21.611Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202610240307-FBQ713"
        task_revision: 7
      -
        command_digest: "sha256:c44a7b8e509cd51ac0524aedc93d9c6b4f683eaf722e027a8cf92036e70e6079"
        id: "result:sha256:14bb2d80babfcdca71c81a11fb9c069368abec459fbb7d44b87dda4e7fb66824:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:14bb2d80babfcdca71c81a11fb9c069368abec459fbb7d44b87dda4e7fb66824"
        occurred_at: "2026-10-24T03:19:02.276Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202610240307-FBQ713"
        task_revision: 8
      -
        command_digest: "sha256:eaa010e1ab49ae8d59ec53988f99481c4b48a64323c8a57b0b0e1833121aadf3"
        id: "kernel_work_item_inspection_required:sha256:fcfd3c30c3544481722e63046e286fa28e0704fa97d5738757e1edd003199eeb:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:fcfd3c30c3544481722e63046e286fa28e0704fa97d5738757e1edd003199eeb:sha256:629b6961f10968dd401fe6c9347845bd9d728fd457661fa800023fb492355c3b"
        occurred_at: "2026-10-24T03:19:09.884Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202610240307-FBQ713"
        task_revision: 9
      -
        command_digest: "sha256:ecdf91b7c92fe53565b86ef9ea1738d37164b535c33c45dd5f1ac4cace2a2e0e"
        id: "validation:sha256:b29b383f0053c9825445d5da268538cac1b1dbc917ea5bd18e25c53d171183a3:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:b29b383f0053c9825445d5da268538cac1b1dbc917ea5bd18e25c53d171183a3"
        occurred_at: "2026-10-24T03:23:04.764Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202610240307-FBQ713"
        task_revision: 10
      -
        command_digest: "sha256:da2a43e82c90f08928d6153dbe24a0d9bb57136b40671e881e5c6be0a086d8ea"
        id: "validation-resolution:sha256:4f410bf31b074ddc359d13a5cefc13f53307184cb58fb00aa94d720df8604d90:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:4f410bf31b074ddc359d13a5cefc13f53307184cb58fb00aa94d720df8604d90"
        occurred_at: "2026-10-24T03:23:10.681Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202610240307-FBQ713"
        task_revision: 11
      -
        command_digest: "sha256:19a1569c32bf78eed92cb5e6e084107473fcbea157e00aa6dc81fb9dd8d13c6c"
        id: "final-validation:sha256:497bf691f261a2caf4c8c663f9c1419953291d0a2074d6421c610fca5a3e6557:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:497bf691f261a2caf4c8c663f9c1419953291d0a2074d6421c610fca5a3e6557:11"
        occurred_at: "2026-10-24T04:02:38.339Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202610240307-FBQ713"
        task_revision: 12
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Repair shared fake GitHub branch metadata for protected-base integration

The protected-base integration fixture installs installFakeGhPrLookup from packages/testkit/src/github-pr.ts. Production correctly reads repos/example/repo/branches/main before its protection detail; the fake currently returns [] for the first request, causing run-cli.core.pr-flow.integrate-validation.test.ts to fail in 0.7.13 release CI. Add the exact protected-branch metadata response ahead of the protection response, preserve unknown-command rejection and existing unprotected behavior, and assert the two-call protection observation in the focused integration test. Audit other protection fakes for actual call sites; leave unused or separate-contract helpers unchanged. Do not change production protection policy. Validate targeted Vitest, formatting, lint, and full local CI.

## Scope

- In scope: The protected-base integration fixture installs installFakeGhPrLookup from packages/testkit/src/github-pr.ts. Production correctly reads repos/example/repo/branches/main before its protection detail; the fake currently returns [] for the first request, causing run-cli.core.pr-flow.integrate-validation.test.ts to fail in 0.7.13 release CI. Add the exact protected-branch metadata response ahead of the protection response, preserve unknown-command rejection and existing unprotected behavior, and assert the two-call protection observation in the focused integration test. Audit other protection fakes for actual call sites; leave unused or separate-contract helpers unchanged. Do not change production protection policy. Validate targeted Vitest, formatting, lint, and full local CI.
- Out of scope: unrelated refactors not required for "Repair shared fake GitHub branch metadata for protected-base integration".

## Plan

1. Execute approved WorkItem repair-protected-branch-fixture.

## Verify Steps

PLANNER fallback scaffold for "Repair shared fake GitHub branch metadata for protected-base integration". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair shared fake GitHub branch metadata for protected-base integration". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-10-24T04:02:41.281Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:70635d2d1e446ec5dc1dc6e74ac3e2b0530e1dba008dc1b2b81825b9bd3f540a, input_digest=sha256:dd9d3fbc5886e6f65f04b50762d7efd4cf708c48f3079ea467a23ffd7d073bb1

Details:

Check: affected_unit_integration
Command: node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610240307-FBQ713 Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: node node_modules/.bin/prettier --check packages/testkit/src/github-pr.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610240307-FBQ713 Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610240307-FBQ713 Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610240307-FBQ713 Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610240307-FBQ713 Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: node node_modules/.bin/prettier --check packages/testkit/src/github-pr.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610240307-FBQ713 Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610240307-FBQ713 Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610240307-FBQ713 Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610240307-FBQ713 Verification Contract check full_regression

Check: task_outcome
Command: node node_modules/.bin/vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-1
Scope: branch_pr task 202610240307-FBQ713 Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: node node_modules/.bin/prettier --check packages/testkit/src/github-pr.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts
Result: pass
Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-2
Scope: branch_pr task 202610240307-FBQ713 Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-3
Scope: branch_pr task 202610240307-FBQ713 Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202610240307-FBQ713/supervision/declared-checks.json#check-4
Scope: branch_pr task 202610240307-FBQ713 Verification Contract check task_outcome (4/4)

NativeTaskIdentityRef:
- plan_digest: sha256:d9c20c1e2d5d3330750520e222cc44d841694318f7eaa9c0bd075ec9a4765e4c
- policy_digest: sha256:1150ba6caefe9e829c30b3520b9246ed1ec7ebbeedbe788c63cf7989015dbb46
- capability_digest: sha256:5551c8e11ccfe6eaee9296c0fa0b7d81fc6eaab77d7e10e602e62d9ce0042dd6
- checks_digest: sha256:e84c024ebff11bb4f757b7bfb538421dc28ddd8041cc80530f459abc36d648a2
- identity_digest: sha256:1ebf28cbb4241db7ece72a91fbf097443d603a1ebc473fb48985aa3a1e5e86d6

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202610240307-FBQ713
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
