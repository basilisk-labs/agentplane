---
id: "202609071219-QV0SX9"
title: "Use simple technical English in task prompts and remove redundant prompt context"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 22
origin:
  system: "manual"
depends_on: []
tags:
  - "process-mechanism-repair"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-09-07T13:03:04.818Z"
  updated_by: "HOST:local:USER"
  note: "host_user_decision=sha256:ee0369e1e1369eedf4614ac785371d252dcf6f9d6d827933528cff0f98ffbe33"
verification:
  state: "ok"
  updated_at: "2026-09-07T14:13:28.349Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
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
      - ".agentplane/agents/PLANNER.json"
      - "packages/agentplane/assets/agents/PLANNER.json"
      - "packages/agentplane/src/agents/agents-template.test.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.ts"
      - "packages/agentplane/src/runner/context/base-prompts.test.ts"
      - "packages/agentplane/src/runner/context/semantic-prompt-projection.ts"
      - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Apply the repository branch_pr floor to a bounded prompt implementation with regression tests."
      - "USER-approved blocked-result scope extension: roots=.agentplane/agents/PLANNER.json"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - ".agentplane/agents/PLANNER.json"
      - "packages/agentplane/assets/agents/PLANNER.json"
      - "packages/agentplane/src/agents/agents-template.test.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.ts"
      - "packages/agentplane/src/runner/context/base-prompts.test.ts"
      - "packages/agentplane/src/runner/context/semantic-prompt-projection.ts"
      - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
  observed:
    authority_violations: []
    changed_components:
      - ".agentplane"
      - "packages/agentplane"
    changed_paths:
      - ".agentplane/agents/PLANNER.json"
      - "packages/agentplane/assets/agents/PLANNER.json"
      - "packages/agentplane/src/agents/agents-template.test.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.ts"
      - "packages/agentplane/src/runner/context/base-prompts.test.ts"
      - "packages/agentplane/src/runner/context/semantic-prompt-projection.ts"
      - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
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
          - ".agentplane/agents/PLANNER.json"
          - "packages/agentplane/assets/agents/PLANNER.json"
          - "packages/agentplane/src/agents/agents-template.test.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.ts"
          - "packages/agentplane/src/runner/context/base-prompts.test.ts"
          - "packages/agentplane/src/runner/context/semantic-prompt-projection.ts"
          - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
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
      digest: "sha256:a7c05d44e9eb8ff3926a934360639469a1512b87ad71679ed6a2e20a2b8bfc34"
      escalation_reasons:
        - "unknown_path:.agentplane/agents/PLANNER.json"
        - "unknown_path:packages/agentplane/assets/agents/PLANNER.json"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - ".agentplane"
          - "packages/agentplane"
        changed_files:
          - ".agentplane/agents/PLANNER.json"
          - "packages/agentplane/assets/agents/PLANNER.json"
          - "packages/agentplane/src/agents/agents-template.test.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.ts"
          - "packages/agentplane/src/runner/context/base-prompts.test.ts"
          - "packages/agentplane/src/runner/context/semantic-prompt-projection.ts"
          - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
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
  hash: "b847aa915f64886905be06ccfb30e37544f35d25"
  message: "🚧 QV0SX9 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The existing parity test requires the installed PLANNER profile to match its bundled source. Recommended action: Extend scope by the one installed PLANNER profile. Restore the verified implementation backup after the scope is granted. Requested scope: roots=.agentplane/agents/PLANNER.json; repository effects=unchanged; request digest=sha256:7627edfd120838d8be763be22677dee5bf88712470cc162032b96737706bb406. Agentplane receipt: external-agent-blocker/tr_100e9e98242dc4d87b5adbcdbb467872/sha256:b651e953acd4e742fbdae1ee9aecb6fb9f36fd65a128dee63ded3a51a60799b5/sha256:7627edfd120838d8be763be22677dee5bf88712470cc162032b96737706bb406."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: .agentplane/agents/PLANNER.json; repository effects: unchanged."
  -
    author: "CODER"
    body: "Progress: recorded the authorized nine-file implementation commit. All 108 focused tests, typecheck, formatting and diff checks passed. Recover this exact commit for supervisor verification; no duplicate implementation changes are needed."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: cdaf72b1fa42. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 4e57fd16b874. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b847aa915f64. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-07T13:03:10.049Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-07T13:27:19.676Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The existing parity test requires the installed PLANNER profile to match its bundled source. Recommended action: Extend scope by the one installed PLANNER profile. Restore the verified implementation backup after the scope is granted. Requested scope: roots=.agentplane/agents/PLANNER.json; repository effects=unchanged; request digest=sha256:7627edfd120838d8be763be22677dee5bf88712470cc162032b96737706bb406. Agentplane receipt: external-agent-blocker/tr_100e9e98242dc4d87b5adbcdbb467872/sha256:b651e953acd4e742fbdae1ee9aecb6fb9f36fd65a128dee63ded3a51a60799b5/sha256:7627edfd120838d8be763be22677dee5bf88712470cc162032b96737706bb406."
  -
    type: "status"
    at: "2026-09-07T13:36:09.060Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Progress: recorded the authorized nine-file implementation commit. All 108 focused tests, typecheck, formatting and diff checks passed. Recover this exact commit for supervisor verification; no duplicate implementation changes are needed."
    commit: "707becb8ee4fa4423e41b7b6eb170e8a60c6c51b"
  -
    type: "status"
    at: "2026-09-07T13:40:13.101Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: cdaf72b1fa42. CLI accepted one state-bound external-agent semantic result."
    commit: "cdaf72b1fa42660466fe8dd986ff87b2bd093f88"
  -
    type: "verify"
    at: "2026-09-07T13:44:37.275Z"
    author: "TESTER"
    state: "needs_rework"
    note: "CI found unsafe JSON.parse any access in agents-template.test.ts. Fix the fixture type and rerun full verification; hosted static check failed on PR #5912."
  -
    type: "status"
    at: "2026-09-07T13:45:58.593Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 4e57fd16b874. CLI accepted one state-bound external-agent semantic result."
    commit: "4e57fd16b87422e1d88b96e7cce2aa85ac8d3c0e"
  -
    type: "verify"
    at: "2026-09-07T13:53:48.547Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-09-07T13:55:41.528Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b847aa915f64. CLI accepted one state-bound external-agent semantic result."
    commit: "b847aa915f64886905be06ccfb30e37544f35d25"
  -
    type: "verify"
    at: "2026-09-07T14:03:52.599Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "verify"
    at: "2026-09-07T14:13:28.349Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
doc_version: 3
doc_updated_at: "2026-09-07T14:13:29.526Z"
doc_updated_by: "SUPERVISOR"
description: "Deliver the existing simple technical English rules to external-agent and managed-runner episodes. Align the PLANNER profile with one user Task and internal WorkItems. Rewrite framework-owned instructions as explicit single-action sentences. Remove repeated prompt instructions and replace verbose result examples with concise schema-valid examples for every supported status. Preserve authority, protected paths, stop rules, typed schemas, exact user input, identifiers, evidence, approval gates, and all outcome branches. Add focused regression tests for both prompt routes, semantic coverage, example validity, and prompt-size reduction. Do not change release versions or publish. Measure rendered prompt size; do not claim token savings without a tokenizer measurement."
sections:
  Summary: |-
    Use simple technical English in task prompts and remove redundant prompt context

    Deliver the existing simple technical English rules to external-agent and managed-runner episodes. Align the PLANNER profile with one user Task and internal WorkItems. Rewrite framework-owned instructions as explicit single-action sentences. Remove repeated prompt instructions and replace verbose result examples with concise schema-valid examples for every supported status. Preserve authority, protected paths, stop rules, typed schemas, exact user input, identifiers, evidence, approval gates, and all outcome branches. Add focused regression tests for both prompt routes, semantic coverage, example validity, and prompt-size reduction. Do not change release versions or publish. Measure rendered prompt size; do not claim token savings without a tokenizer measurement.
  Scope: |-
    - In scope: Deliver the existing simple technical English rules to external-agent and managed-runner episodes. Align the PLANNER profile with one user Task and internal WorkItems. Rewrite framework-owned instructions as explicit single-action sentences. Remove repeated prompt instructions and replace verbose result examples with concise schema-valid examples for every supported status. Preserve authority, protected paths, stop rules, typed schemas, exact user input, identifiers, evidence, approval gates, and all outcome branches. Add focused regression tests for both prompt routes, semantic coverage, example validity, and prompt-size reduction. Do not change release versions or publish. Measure rendered prompt size; do not claim token savings without a tokenizer measurement.
    - Out of scope: unrelated refactors not required for "Use simple technical English in task prompts and remove redundant prompt context".
  Plan: |-
    Implement one WorkItem: prompt-language-and-compaction.
    1. Reuse the existing gateway language rules in the semantic projection. Keep lifecycle instructions excluded. Add equivalent language guidance to the external-agent instruction path.
    2. Align the bundled PLANNER profile with TaskPlanProposal and internal WorkItems. Split compound framework instructions into explicit sentences.
    3. Remove duplicate runner prose only when the same constraint remains explicit elsewhere in the final prompt. Keep all authority and stop conditions.
    4. Replace verbose runner result examples with concise schema-valid examples for completed, blocked, needs_context, and failed. Keep test fixtures unchanged unless their existing contract requires an update.
    5. Extend the nearest tests for both prompt routes, exact literal preservation, effective authority, result parsing, and prompt byte reduction.
    Validation: run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2. Run bun run typecheck. Run bunx prettier --check on changed files. Record before/after UTF-8 prompt bytes using fixed fixtures. AgentPlane owns formal verification persistence.
    Scope: the eight files listed in the WorkItem. Reuse existing primitives. Do not change schemas, gateway policy files, security enforcement, release metadata, or external systems. Do not minify or abbreviate schema keys in this change.
    Risk: compaction could omit a constraint or a required example field. Regression tests must compare retained semantic contracts and parse every status example.
    Rollback: revert only this WorkItem's implementation diff.
    External writes, commits, publication, and hosted integration require their own explicit operator authority.
  Verify Steps: |-
    1. Run the four declared focused test files. Expected: language rules reach every external episode and managed continuation; literals, effective authority, stop conditions, and four valid result statuses remain covered.
    2. Run bun run typecheck and Prettier on the nine changed files. Expected: no type or formatting errors.
    3. Run bun run ci:local:full as required by the repository verification floor. Expected: all required verification groups pass.
    4. Compare fixed prompt fixtures with the pre-change baseline. Expected: EXECUTOR remains below 8590 bytes and EVALUATOR remains below 9196 bytes. Final measured sizes are 7823 and 8429 bytes. Report bytes only.
    5. Confirm installed and bundled PLANNER profiles are identical and use TaskPlanProposal with internal WorkItems. Inspect the final diff for unrelated changes.
    6. Before merge, require passing hosted checks for the exact PR head and record any remaining limitations.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-07T13:44:37.275Z — VERIFY — needs_rework

    By: TESTER

    Note: CI found unsafe JSON.parse any access in agents-template.test.ts. Fix the fixture type and rerun full verification; hosted static check failed on PR #5912.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6a1b4018be21ed5150e62c6860d7575e5769d7f72a2c1ea083fd2fd97132cc7f, input_digest=sha256:1179a09e335f96b75612c284e6f93ef56d9bcbe5d69cf80b9dbac698a47a5ec1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609071219-QV0SX9-use-simple-technical-english-in-task-prompts-and/.agentplane/tasks/202609071219-QV0SX9/blueprint/resolved-snapshot.json
    - old_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
    - current_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609071219-QV0SX9

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609071219-QV0SX9
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-07T13:53:48.547Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6a1b4018be21ed5150e62c6860d7575e5769d7f72a2c1ea083fd2fd97132cc7f, input_digest=sha256:50371e453165236ffbfba85159868a6e8c985951d0b85bff33d89781886953dd

    Details:

    Command: bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609071219-QV0SX9 declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609071219-QV0SX9 declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609071219-QV0SX9 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609071219-QV0SX9-use-simple-technical-english-in-task-prompts-and/.agentplane/tasks/202609071219-QV0SX9/blueprint/resolved-snapshot.json
    - old_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
    - current_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609071219-QV0SX9

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609071219-QV0SX9
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-07T14:03:52.599Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6a1b4018be21ed5150e62c6860d7575e5769d7f72a2c1ea083fd2fd97132cc7f, input_digest=sha256:4360bfb80c3409aba726ec46afc3dde1bff093e23c7707abf7807cd44a296a69

    Details:

    Check: affected_unit_integration
    Command: bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check critical_paths (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check full_regression

    Check: task_outcome
    Command: bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check task_outcome (3/3)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609071219-QV0SX9-use-simple-technical-english-in-task-prompts-and/.agentplane/tasks/202609071219-QV0SX9/blueprint/resolved-snapshot.json
    - old_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
    - current_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609071219-QV0SX9

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609071219-QV0SX9
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-07T14:13:28.349Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:55f75ddd2e03c3936c282d4ccf587b528d0586fbb1384034b0bdb1150cf608b7, input_digest=sha256:e6c49fc52a70094cc935c1a184f595810ed52cf6ebd6d4ca62315f4634578bde

    Details:

    Check: affected_unit_integration
    Command: bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check critical_paths (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check full_regression

    Check: task_outcome
    Command: bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check task_outcome (3/3)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609071219-QV0SX9-use-simple-technical-english-in-task-prompts-and/.agentplane/tasks/202609071219-QV0SX9/blueprint/resolved-snapshot.json
    - old_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
    - current_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609071219-QV0SX9

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609071219-QV0SX9
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
    actor: "HOST:local:USER"
    approval_evidence_digest: "sha256:ee0369e1e1369eedf4614ac785371d252dcf6f9d6d827933528cff0f98ffbe33"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:daadb4c49270e8113abf639ffa80637998a1f5ee878099c00b70cb568f354d4e"
    grant_id: "36ceae76-32f9-4995-8d90-3044ec7a247e"
    issued_at: "2026-09-07T13:03:04.818Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:fca7610f37a175ac8b9efedb5d893e0225dafb4160b67f839a348a064459e507"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609071219-QV0SX9"
  agentplane.scope_extension_request:
    applied_at: "2026-09-07T13:27:26.459Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:b651e953acd4e742fbdae1ee9aecb6fb9f36fd65a128dee63ded3a51a60799b5"
    kind: "task_scope_extension_request"
    request:
      rationale: "Synchronize the installed PLANNER profile with the bundled source as required by the existing parity test."
      repository_effects: []
      schema_version: 1
      scope_roots:
        - ".agentplane/agents/PLANNER.json"
    request_digest: "sha256:7627edfd120838d8be763be22677dee5bf88712470cc162032b96737706bb406"
    schema_version: 1
    status: "applied"
    transition_id: "tr_100e9e98242dc4d87b5adbcdbb467872"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-07T13:27:26.459Z"
        approved_by: "USER"
        approved_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
        policy_facts:
          - "state_bound_scope_extension:sha256:7627edfd120838d8be763be22677dee5bf88712470cc162032b96737706bb406"
        state: "approved"
      created_at: "2026-09-07T13:27:26.459Z"
      digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
      proposal:
        assumptions:
          - "One owner and one verification boundary suffice."
          - "The existing gateway language policy can be reused without modifying protected policy assets."
          - "Validation uses the supported task.verify capability; no undeclared deterministic Task command binding is fabricated."
        planning_baseline:
          captured_at: "2026-09-07T12:19:48.419Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:014ced2a5c6361621cd8424c306f49b384dce29fd89579ddd7d92330b8d3615f"
          dirty_paths:
            - ".agentplane/tasks/202609071219-QV0SX9/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "ca07204eed841a1aa245e3bb8d14832d7ea3ac30"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609071219-QV0SX9"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              id: "task-outcome"
              kind: "semantic"
              required: true
          criteria:
            -
              check_ids:
                - "task-outcome"
              description: "External-agent instructions and managed-runner prompts include the existing simple technical English rules. Each generated sentence expresses one action or constraint. Commands, paths, identifiers, user input, and evidence remain unchanged."
              id: "prompt-1"
              required: true
            -
              check_ids:
                - "task-outcome"
              description: "The PLANNER profile requests one TaskPlanProposal for one user Task with internal WorkItems. It grants no task lifecycle mutation authority."
              id: "prompt-2"
              required: true
            -
              check_ids:
                - "task-outcome"
              description: "The managed prompt retains effective writable roots, protected paths, network authority, declared tools, missing-context handling, and all stop conditions after removing duplicate prose."
              id: "prompt-3"
              required: true
            -
              check_ids:
                - "task-outcome"
              description: "All four result examples pass the production result parser. Examples contain no unrelated legacy or release claims. Required status fields and the current work_order_id remain present."
              id: "prompt-4"
              required: true
            -
              check_ids:
                - "task-outcome"
              description: "Rendered UTF-8 prompt bytes decrease for representative fixed runner fixtures against the pre-change baseline. Report measured bytes and semantic coverage. Do not infer token savings from byte counts."
              id: "prompt-5"
              required: true
            -
              check_ids:
                - "task-outcome"
              description: "Focused tests, typecheck, and formatting checks pass. Final diff contains only approved prompt and regression-test changes."
              id: "prompt-6"
              required: true
          evidence_fingerprint: "sha256:014ced2a5c6361621cd8424c306f49b384dce29fd89579ddd7d92330b8d3615f"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "task-outcome"
                  description: "External-agent instructions and managed-runner prompts include the existing simple technical English rules. Each generated sentence expresses one action or constraint. Commands, paths, identifiers, user input, and evidence remain unchanged."
                  id: "prompt-1"
                  required: true
                -
                  check_ids:
                    - "task-outcome"
                  description: "The PLANNER profile requests one TaskPlanProposal for one user Task with internal WorkItems. It grants no task lifecycle mutation authority."
                  id: "prompt-2"
                  required: true
                -
                  check_ids:
                    - "task-outcome"
                  description: "The managed prompt retains effective writable roots, protected paths, network authority, declared tools, missing-context handling, and all stop conditions after removing duplicate prose."
                  id: "prompt-3"
                  required: true
                -
                  check_ids:
                    - "task-outcome"
                  description: "All four result examples pass the production result parser. Examples contain no unrelated legacy or release claims. Required status fields and the current work_order_id remain present."
                  id: "prompt-4"
                  required: true
                -
                  check_ids:
                    - "task-outcome"
                  description: "Rendered UTF-8 prompt bytes decrease for representative fixed runner fixtures against the pre-change baseline. Report measured bytes and semantic coverage. Do not infer token savings from byte counts."
                  id: "prompt-5"
                  required: true
                -
                  check_ids:
                    - "task-outcome"
                  description: "Focused tests, typecheck, and formatting checks pass. Final diff contains only approved prompt and regression-test changes."
                  id: "prompt-6"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources:
                  - "packages/agentplane/assets/AGENTS.md"
                  - "packages/core/src/runner/agent-semantic-result.ts"
                required_sources:
                  - "packages/agentplane/src/runner/context/semantic-prompt-projection.ts"
                  - "packages/agentplane/src/runner/context/base-prompts.test.ts"
                  - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
                  - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
                  - "packages/agentplane/src/commands/task/agent-action-packet.ts"
                  - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
                  - "packages/agentplane/assets/agents/PLANNER.json"
                  - "packages/agentplane/src/agents/agents-template.test.ts"
                symbol_hints:
                  - "projectRunnerPromptsForSemanticEpisode"
                  - "renderTaskRunnerBootstrap"
                  - "semanticInstruction"
              depends_on: []
              expected_outputs:
                - "prompt-language-implementation"
                - "prompt-regression-evidence"
                - "prompt-size-comparison"
              id: "prompt-language-and-compaction"
              objective: |-
                Implement one WorkItem: prompt-language-and-compaction.
                1. Reuse the existing gateway language rules in the semantic projection. Keep lifecycle instructions excluded. Add equivalent language guidance to the external-agent instruction path.
                2. Align the bundled PLANNER profile with TaskPlanProposal and internal WorkItems. Split compound framework instructions into explicit sentences.
                3. Remove duplicate runner prose only when the same constraint remains explicit elsewhere in the final prompt. Keep all authority and stop conditions.
                4. Replace verbose runner result examples with concise schema-valid examples for completed, blocked, needs_context, and failed. Keep test fixtures unchanged unless their existing contract requires an update.
                5. Extend the nearest tests for both prompt routes, exact literal preservation, effective authority, result parsing, and prompt byte reduction.
                Validation: run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2. Run bun run typecheck. Run bunx prettier --check on changed files. Record before/after UTF-8 prompt bytes using fixed fixtures. AgentPlane owns formal verification persistence.
                Scope: the eight files listed in the WorkItem. Reuse existing primitives. Do not change schemas, gateway policy files, security enforcement, release metadata, or external systems. Do not minify or abbreviate schema keys in this change.
                Risk: compaction could omit a constraint or a required example field. Regression tests must compare retained semantic contracts and parse every status example.
                Rollback: revert only this WorkItem's implementation diff.
                External writes, commits, publication, and hosted integration require their own explicit operator authority.
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner/context/semantic-prompt-projection.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner/context/base-prompts.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/agent-action-packet.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/assets/agents/PLANNER.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/agents/agents-template.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: ".agentplane/agents/PLANNER.json"
              risk: "medium"
              scope_roots:
                - ".agentplane/agents/PLANNER.json"
                - "packages/agentplane/assets/agents/PLANNER.json"
                - "packages/agentplane/src/agents/agents-template.test.ts"
                - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
                - "packages/agentplane/src/commands/task/agent-action-packet.ts"
                - "packages/agentplane/src/runner/context/base-prompts.test.ts"
                - "packages/agentplane/src/runner/context/semantic-prompt-projection.ts"
                - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
                - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "task-outcome"
                    kind: "semantic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "task-outcome"
                    description: "External-agent instructions and managed-runner prompts include the existing simple technical English rules. Each generated sentence expresses one action or constraint. Commands, paths, identifiers, user input, and evidence remain unchanged."
                    id: "prompt-1"
                    required: true
                  -
                    check_ids:
                      - "task-outcome"
                    description: "The PLANNER profile requests one TaskPlanProposal for one user Task with internal WorkItems. It grants no task lifecycle mutation authority."
                    id: "prompt-2"
                    required: true
                  -
                    check_ids:
                      - "task-outcome"
                    description: "The managed prompt retains effective writable roots, protected paths, network authority, declared tools, missing-context handling, and all stop conditions after removing duplicate prose."
                    id: "prompt-3"
                    required: true
                  -
                    check_ids:
                      - "task-outcome"
                    description: "All four result examples pass the production result parser. Examples contain no unrelated legacy or release claims. Required status fields and the current work_order_id remain present."
                    id: "prompt-4"
                    required: true
                  -
                    check_ids:
                      - "task-outcome"
                    description: "Rendered UTF-8 prompt bytes decrease for representative fixed runner fixtures against the pre-change baseline. Report measured bytes and semantic coverage. Do not infer token savings from byte counts."
                    id: "prompt-5"
                    required: true
                  -
                    check_ids:
                      - "task-outcome"
                    description: "Focused tests, typecheck, and formatting checks pass. Final diff contains only approved prompt and regression-test changes."
                    id: "prompt-6"
                    required: true
                evidence_fingerprint: "sha256:014ced2a5c6361621cd8424c306f49b384dce29fd89579ddd7d92330b8d3615f"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202609071219-QV0SX9"
    event_cursor: 19
    final_validation: null
    id: "202609071219-QV0SX9"
    intent:
      acceptance_criteria: []
      captured_at: "2026-09-07T12:19:42.855Z"
      constraints: []
      request: |-
        Use simple technical English in task prompts and remove redundant prompt context

        Deliver the existing simple technical English rules to external-agent and managed-runner episodes. Align the PLANNER profile with one user Task and internal WorkItems. Rewrite framework-owned instructions as explicit single-action sentences. Remove repeated prompt instructions and replace verbose result examples with concise schema-valid examples for every supported status. Preserve authority, protected paths, stop rules, typed schemas, exact user input, identifiers, evidence, approval gates, and all outcome branches. Add focused regression tests for both prompt routes, semantic coverage, example validity, and prompt-size reduction. Do not change release versions or publish. Measure rendered prompt size; do not claim token savings without a tokenizer measurement.
      task_id: "202609071219-QV0SX9"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-07T13:03:04.818Z"
          approved_by: "HOST:local:USER"
          approved_digest: "sha256:5616b01d5b975af1c5bd390b7f9a41530722e988ba44010122d0f799c7ef579b"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-07T12:21:57.751Z"
        digest: "sha256:5616b01d5b975af1c5bd390b7f9a41530722e988ba44010122d0f799c7ef579b"
        proposal:
          assumptions:
            - "One owner and one verification boundary suffice."
            - "The existing gateway language policy can be reused without modifying protected policy assets."
            - "Validation uses the supported task.verify capability; no undeclared deterministic Task command binding is fabricated."
          planning_baseline:
            captured_at: "2026-09-07T12:19:48.419Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:014ced2a5c6361621cd8424c306f49b384dce29fd89579ddd7d92330b8d3615f"
            dirty_paths:
              - ".agentplane/tasks/202609071219-QV0SX9/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "ca07204eed841a1aa245e3bb8d14832d7ea3ac30"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "task-outcome"
                kind: "semantic"
                required: true
            criteria:
              -
                check_ids:
                  - "task-outcome"
                description: "External-agent instructions and managed-runner prompts include the existing simple technical English rules. Each generated sentence expresses one action or constraint. Commands, paths, identifiers, user input, and evidence remain unchanged."
                id: "prompt-1"
                required: true
              -
                check_ids:
                  - "task-outcome"
                description: "The PLANNER profile requests one TaskPlanProposal for one user Task with internal WorkItems. It grants no task lifecycle mutation authority."
                id: "prompt-2"
                required: true
              -
                check_ids:
                  - "task-outcome"
                description: "The managed prompt retains effective writable roots, protected paths, network authority, declared tools, missing-context handling, and all stop conditions after removing duplicate prose."
                id: "prompt-3"
                required: true
              -
                check_ids:
                  - "task-outcome"
                description: "All four result examples pass the production result parser. Examples contain no unrelated legacy or release claims. Required status fields and the current work_order_id remain present."
                id: "prompt-4"
                required: true
              -
                check_ids:
                  - "task-outcome"
                description: "Rendered UTF-8 prompt bytes decrease for representative fixed runner fixtures against the pre-change baseline. Report measured bytes and semantic coverage. Do not infer token savings from byte counts."
                id: "prompt-5"
                required: true
              -
                check_ids:
                  - "task-outcome"
                description: "Focused tests, typecheck, and formatting checks pass. Final diff contains only approved prompt and regression-test changes."
                id: "prompt-6"
                required: true
            evidence_fingerprint: "sha256:014ced2a5c6361621cd8424c306f49b384dce29fd89579ddd7d92330b8d3615f"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "task-outcome"
                    description: "External-agent instructions and managed-runner prompts include the existing simple technical English rules. Each generated sentence expresses one action or constraint. Commands, paths, identifiers, user input, and evidence remain unchanged."
                    id: "prompt-1"
                    required: true
                  -
                    check_ids:
                      - "task-outcome"
                    description: "The PLANNER profile requests one TaskPlanProposal for one user Task with internal WorkItems. It grants no task lifecycle mutation authority."
                    id: "prompt-2"
                    required: true
                  -
                    check_ids:
                      - "task-outcome"
                    description: "The managed prompt retains effective writable roots, protected paths, network authority, declared tools, missing-context handling, and all stop conditions after removing duplicate prose."
                    id: "prompt-3"
                    required: true
                  -
                    check_ids:
                      - "task-outcome"
                    description: "All four result examples pass the production result parser. Examples contain no unrelated legacy or release claims. Required status fields and the current work_order_id remain present."
                    id: "prompt-4"
                    required: true
                  -
                    check_ids:
                      - "task-outcome"
                    description: "Rendered UTF-8 prompt bytes decrease for representative fixed runner fixtures against the pre-change baseline. Report measured bytes and semantic coverage. Do not infer token savings from byte counts."
                    id: "prompt-5"
                    required: true
                  -
                    check_ids:
                      - "task-outcome"
                    description: "Focused tests, typecheck, and formatting checks pass. Final diff contains only approved prompt and regression-test changes."
                    id: "prompt-6"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 100000
                  optional_sources:
                    - "packages/agentplane/assets/AGENTS.md"
                    - "packages/core/src/runner/agent-semantic-result.ts"
                  required_sources:
                    - "packages/agentplane/src/runner/context/semantic-prompt-projection.ts"
                    - "packages/agentplane/src/runner/context/base-prompts.test.ts"
                    - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
                    - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
                    - "packages/agentplane/src/commands/task/agent-action-packet.ts"
                    - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
                    - "packages/agentplane/assets/agents/PLANNER.json"
                    - "packages/agentplane/src/agents/agents-template.test.ts"
                  symbol_hints:
                    - "projectRunnerPromptsForSemanticEpisode"
                    - "renderTaskRunnerBootstrap"
                    - "semanticInstruction"
                depends_on: []
                expected_outputs:
                  - "prompt-language-implementation"
                  - "prompt-regression-evidence"
                  - "prompt-size-comparison"
                id: "prompt-language-and-compaction"
                objective: |-
                  Implement one WorkItem: prompt-language-and-compaction.
                  1. Reuse the existing gateway language rules in the semantic projection. Keep lifecycle instructions excluded. Add equivalent language guidance to the external-agent instruction path.
                  2. Align the bundled PLANNER profile with TaskPlanProposal and internal WorkItems. Split compound framework instructions into explicit sentences.
                  3. Remove duplicate runner prose only when the same constraint remains explicit elsewhere in the final prompt. Keep all authority and stop conditions.
                  4. Replace verbose runner result examples with concise schema-valid examples for completed, blocked, needs_context, and failed. Keep test fixtures unchanged unless their existing contract requires an update.
                  5. Extend the nearest tests for both prompt routes, exact literal preservation, effective authority, result parsing, and prompt byte reduction.
                  Validation: run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2. Run bun run typecheck. Run bunx prettier --check on changed files. Record before/after UTF-8 prompt bytes using fixed fixtures. AgentPlane owns formal verification persistence.
                  Scope: the eight files listed in the WorkItem. Reuse existing primitives. Do not change schemas, gateway policy files, security enforcement, release metadata, or external systems. Do not minify or abbreviate schema keys in this change.
                  Risk: compaction could omit a constraint or a required example field. Regression tests must compare retained semantic contracts and parse every status example.
                  Rollback: revert only this WorkItem's implementation diff.
                  External writes, commits, publication, and hosted integration require their own explicit operator authority.
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner/context/semantic-prompt-projection.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner/context/base-prompts.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/agent-action-packet.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/assets/agents/PLANNER.json"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/agents/agents-template.test.ts"
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/runner/context/semantic-prompt-projection.ts"
                  - "packages/agentplane/src/runner/context/base-prompts.test.ts"
                  - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
                  - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
                  - "packages/agentplane/src/commands/task/agent-action-packet.ts"
                  - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
                  - "packages/agentplane/assets/agents/PLANNER.json"
                  - "packages/agentplane/src/agents/agents-template.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "task-outcome"
                      kind: "semantic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "task-outcome"
                      description: "External-agent instructions and managed-runner prompts include the existing simple technical English rules. Each generated sentence expresses one action or constraint. Commands, paths, identifiers, user input, and evidence remain unchanged."
                      id: "prompt-1"
                      required: true
                    -
                      check_ids:
                        - "task-outcome"
                      description: "The PLANNER profile requests one TaskPlanProposal for one user Task with internal WorkItems. It grants no task lifecycle mutation authority."
                      id: "prompt-2"
                      required: true
                    -
                      check_ids:
                        - "task-outcome"
                      description: "The managed prompt retains effective writable roots, protected paths, network authority, declared tools, missing-context handling, and all stop conditions after removing duplicate prose."
                      id: "prompt-3"
                      required: true
                    -
                      check_ids:
                        - "task-outcome"
                      description: "All four result examples pass the production result parser. Examples contain no unrelated legacy or release claims. Required status fields and the current work_order_id remain present."
                      id: "prompt-4"
                      required: true
                    -
                      check_ids:
                        - "task-outcome"
                      description: "Rendered UTF-8 prompt bytes decrease for representative fixed runner fixtures against the pre-change baseline. Report measured bytes and semantic coverage. Do not infer token savings from byte counts."
                      id: "prompt-5"
                      required: true
                    -
                      check_ids:
                        - "task-outcome"
                      description: "Focused tests, typecheck, and formatting checks pass. Final diff contains only approved prompt and regression-test changes."
                      id: "prompt-6"
                      required: true
                  evidence_fingerprint: "sha256:014ced2a5c6361621cd8424c306f49b384dce29fd89579ddd7d92330b8d3615f"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609071219-QV0SX9"
    revision: 22
    schema_version: 1
    updated_at: "2026-09-07T14:13:29.524Z"
    work_items:
      prompt-language-and-compaction:
        attempt: 1
        claim_id: null
        id: "prompt-language-and-compaction"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:562aa86b6046b5652534a9849a4819cb6b3b4d2a6f5b53101e65edd7162a52ea"
            id: "prompt-language-implementation"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609071219-QV0SX9"
              work_item_id: "prompt-language-and-compaction"
            provenance:
              - "sha256:e02e0a2835173dfb0b1be63e07e0cf14bbabf318a450d0173c65b38b54698a89"
              - ".agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:885647a9c0953aada417789a460e87ccf2fe61e24c2331a26a38284ac2ce0cd5"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:2ac655471f63a776cac617193aa0cd15c4809de9f2d693b3e41884f62aa34b6e"
            id: "prompt-regression-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609071219-QV0SX9"
              work_item_id: "prompt-language-and-compaction"
            provenance:
              - "sha256:e02e0a2835173dfb0b1be63e07e0cf14bbabf318a450d0173c65b38b54698a89"
              - ".agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:885647a9c0953aada417789a460e87ccf2fe61e24c2331a26a38284ac2ce0cd5"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:ee0b4f4b3a32d38134c1d5d7674ea1488f85dddfde5f630981501b25dd042ec7"
            id: "prompt-size-comparison"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609071219-QV0SX9"
              work_item_id: "prompt-language-and-compaction"
            provenance:
              - "sha256:e02e0a2835173dfb0b1be63e07e0cf14bbabf318a450d0173c65b38b54698a89"
              - ".agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:885647a9c0953aada417789a460e87ccf2fe61e24c2331a26a38284ac2ce0cd5"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json"
              check_id: "task-outcome"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-09-07T13:40:14.456Z"
              repository_snapshot_digest: "sha256:885647a9c0953aada417789a460e87ccf2fe61e24c2331a26a38284ac2ce0cd5"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-07T13:40:14.462Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:acc65ba5af330b5b68a826145c46c37105acf33ad56e064b7333c61e14e053dd"
        entity: "work_item"
        id: "event_c60a867c3fa9785c96e510d8"
        mutation_id: "external-result:work-order-202609071219-QV0SX9-executor-748d82211264210e37c31543"
        plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609071219-QV0SX9"
        task_revision: 11
        work_item_id: "prompt-language-and-compaction"
    leases: []
    mutation_receipts:
      compatibility:sha256:07c015e6d01a1040d5ab57eef94a789007b6160a44b4b0d867a517c89ab62e17:
        aggregate_digest: "sha256:51b2a8d2d4ef010dc84e9a84ef003c232974b8aa3ad6c9dcd18c6475996e5887"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:36:09.060Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_06f45aeb1c45d327ebd60e41"
          mutation_id: "compatibility:sha256:07c015e6d01a1040d5ab57eef94a789007b6160a44b4b0d867a517c89ab62e17"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:07c015e6d01a1040d5ab57eef94a789007b6160a44b4b0d867a517c89ab62e17"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:423f40c1992f332ed35a56ba44d716b9c9fdb2d1db10cd1b659c53ae66c63919:
        aggregate_digest: "sha256:c48926a87aa6707db474cf79cb4da27a544823814a1e252d9736627c42267d0b"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:40:13.101Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_d888eec68d26923f28515e0f"
          mutation_id: "compatibility:sha256:423f40c1992f332ed35a56ba44d716b9c9fdb2d1db10cd1b659c53ae66c63919"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 10
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:423f40c1992f332ed35a56ba44d716b9c9fdb2d1db10cd1b659c53ae66c63919"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:4bb96a8aa1cc90158dec0518aaaa32222ae33203b412cc54285d6bb836229b8c:
        aggregate_digest: "sha256:43105a3ad34e9263d5ddc9de6fa4bb717a6521017ab4931d46c200c05ab9052c"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T14:13:29.524Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_21c5f74795d1bc5412e055e0"
          mutation_id: "compatibility:sha256:4bb96a8aa1cc90158dec0518aaaa32222ae33203b412cc54285d6bb836229b8c"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 21
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4bb96a8aa1cc90158dec0518aaaa32222ae33203b412cc54285d6bb836229b8c"
        next_revision: 22
        previous_revision: 21
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:60e107a98b9cd1cbd591190abea982d9345035b45ba1b66107d4292d39941aba:
        aggregate_digest: "sha256:fbed11a06020bfd27cfb40474d6c7208a35d55c4173b2eefd13e5e3fe91e6959"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T14:03:54.102Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_40497348abc0b4cd9e27bf90"
          mutation_id: "compatibility:sha256:60e107a98b9cd1cbd591190abea982d9345035b45ba1b66107d4292d39941aba"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 19
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:60e107a98b9cd1cbd591190abea982d9345035b45ba1b66107d4292d39941aba"
        next_revision: 20
        previous_revision: 19
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:78e57ff859b0015e93d469f733ba698a6a8519a0c58da80e48bf5d14de5cc4f8:
        aggregate_digest: "sha256:faec5c6f6bc1d43e34aacdbb6a89e862b25ed71e01028048592076bf20d37a47"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T14:04:49.409Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_75957e3cab7bb4d47437c045"
          mutation_id: "compatibility:sha256:78e57ff859b0015e93d469f733ba698a6a8519a0c58da80e48bf5d14de5cc4f8"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 20
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:78e57ff859b0015e93d469f733ba698a6a8519a0c58da80e48bf5d14de5cc4f8"
        next_revision: 21
        previous_revision: 20
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:81b0d0042b77e674113abb0c586d4c9b24985ac98156020dce99bee1b46720c5:
        aggregate_digest: "sha256:14052f76601368d57401bd8b5acfa54f076ead902cb8cdf07bbb622bad49092f"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:27:19.676Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_6c6de344ab09835bdfdfacbb"
          mutation_id: "compatibility:sha256:81b0d0042b77e674113abb0c586d4c9b24985ac98156020dce99bee1b46720c5"
          plan_digest: "sha256:5616b01d5b975af1c5bd390b7f9a41530722e988ba44010122d0f799c7ef579b"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 5
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:81b0d0042b77e674113abb0c586d4c9b24985ac98156020dce99bee1b46720c5"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:856614b71f42e145a5e0af4dd224cc586ff3072e69eef549437b07dea21508a8:
        aggregate_digest: "sha256:74d55f66211a74979ddc3319ab4c9b88c1bb09a5520518f5e890defb2dc0c65a"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:40:13.101Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_62e0fbc575c468a7e5fd9d38"
          mutation_id: "compatibility:sha256:856614b71f42e145a5e0af4dd224cc586ff3072e69eef549437b07dea21508a8"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:856614b71f42e145a5e0af4dd224cc586ff3072e69eef549437b07dea21508a8"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:899d9ea724d1105d2780eef13a1b125d7b90309533208013fdf824bda33d8ba4:
        aggregate_digest: "sha256:7ab3426e82febc564bcc6cce37ade9b60755006e4a453a073f774a8018eebc62"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:45:58.593Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4fefbcf998f96333473618c1"
          mutation_id: "compatibility:sha256:899d9ea724d1105d2780eef13a1b125d7b90309533208013fdf824bda33d8ba4"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 14
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:899d9ea724d1105d2780eef13a1b125d7b90309533208013fdf824bda33d8ba4"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:89bf0ef67cb3d927585993f390f90be291509d4bee2b98d669d5e24197219283:
        aggregate_digest: "sha256:7dc57ede9fd2afef1a871ce2907bed271432e65dafd0608066089fd99d8db72a"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T12:21:57.754Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_1c2142c4bf215acc588483c2"
          mutation_id: "compatibility:sha256:89bf0ef67cb3d927585993f390f90be291509d4bee2b98d669d5e24197219283"
          plan_digest: "sha256:5616b01d5b975af1c5bd390b7f9a41530722e988ba44010122d0f799c7ef579b"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 2
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:89bf0ef67cb3d927585993f390f90be291509d4bee2b98d669d5e24197219283"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:92600ec04fd123b7bae2a989ea5a40c7ecd5e245068213bfcbd69669c1f595a7:
        aggregate_digest: "sha256:8b7a06ffaa4465f4fca2890d2bc5e5d5a6e831a29d74c5321f964fa53e9d5081"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:53:49.663Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_550fcf597bed583510343191"
          mutation_id: "compatibility:sha256:92600ec04fd123b7bae2a989ea5a40c7ecd5e245068213bfcbd69669c1f595a7"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 16
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:92600ec04fd123b7bae2a989ea5a40c7ecd5e245068213bfcbd69669c1f595a7"
        next_revision: 17
        previous_revision: 16
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:94b53a77fc42742421acbda53bbf61bdf7db38d42b1fa5886ad33aa65ece50cf:
        aggregate_digest: "sha256:99b181af2f9ccb93ad784bb105b76a4045194f3609003114c03bc4a64085541e"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:45:58.593Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_420a4acb57a8e1e7da8e7911"
          mutation_id: "compatibility:sha256:94b53a77fc42742421acbda53bbf61bdf7db38d42b1fa5886ad33aa65ece50cf"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 15
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:94b53a77fc42742421acbda53bbf61bdf7db38d42b1fa5886ad33aa65ece50cf"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:a269f60e4899798dac8c80ece49908247b3b1977c9f30f53fd607667d31f46cb:
        aggregate_digest: "sha256:5ea99406757dfda9f763de1621acc69b4ec77d280b0192216cabf284a1fca0a3"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:44:11.575Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_e8675428751216e87206cd40"
          mutation_id: "compatibility:sha256:a269f60e4899798dac8c80ece49908247b3b1977c9f30f53fd607667d31f46cb"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a269f60e4899798dac8c80ece49908247b3b1977c9f30f53fd607667d31f46cb"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:a2c97a0cae9fe59a2601ea60f03af4bc18d43b415e41490ef569c306fa8d96a7:
        aggregate_digest: "sha256:2029b015cbb0174df71642e8c63b5ca6a4834512d62910fb69ae26c968c74cd3"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:03:10.049Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_51470db717e0c4847e225cbf"
          mutation_id: "compatibility:sha256:a2c97a0cae9fe59a2601ea60f03af4bc18d43b415e41490ef569c306fa8d96a7"
          plan_digest: "sha256:5616b01d5b975af1c5bd390b7f9a41530722e988ba44010122d0f799c7ef579b"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a2c97a0cae9fe59a2601ea60f03af4bc18d43b415e41490ef569c306fa8d96a7"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:a6294080eadc57ac59f28a365ef1901e1e4513f49dbc17edec4df8895fe4796c:
        aggregate_digest: "sha256:abf335eb5aeba9b1039bd6dffa39e1c533482c21c0a6eec69088baf52e4af544"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:27:19.676Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_30dfd24cdc9a4711e68924a5"
          mutation_id: "compatibility:sha256:a6294080eadc57ac59f28a365ef1901e1e4513f49dbc17edec4df8895fe4796c"
          plan_digest: "sha256:5616b01d5b975af1c5bd390b7f9a41530722e988ba44010122d0f799c7ef579b"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 4
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:a6294080eadc57ac59f28a365ef1901e1e4513f49dbc17edec4df8895fe4796c"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:b88a4ab4e8458ce0755f4bb40eb5fd3f183f368de33cf67c9583a21ea5a11a92:
        aggregate_digest: "sha256:f433c81981d640fabd95dbf07921e49f5b093ef4e1bbbcf71d3468e962eff4ce"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:44:38.256Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_cbb9890d4521faae3dbfd987"
          mutation_id: "compatibility:sha256:b88a4ab4e8458ce0755f4bb40eb5fd3f183f368de33cf67c9583a21ea5a11a92"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 13
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b88a4ab4e8458ce0755f4bb40eb5fd3f183f368de33cf67c9583a21ea5a11a92"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:bed9d42e55e676c44338e8cdba8bba34109ab475572a33ba25af03afbc4a1d9e:
        aggregate_digest: "sha256:c55ca8c5138be50737f33d0fb7cdc43a37ca7e94d052a0a3bc2184b9bf8bab93"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:27:19.676Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_a714636ba7a9d4bd6e29378a"
          mutation_id: "compatibility:sha256:bed9d42e55e676c44338e8cdba8bba34109ab475572a33ba25af03afbc4a1d9e"
          plan_digest: "sha256:5616b01d5b975af1c5bd390b7f9a41530722e988ba44010122d0f799c7ef579b"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:bed9d42e55e676c44338e8cdba8bba34109ab475572a33ba25af03afbc4a1d9e"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:c5e136d306717b8baa78a79c5988337aad2a981f9c4d2bb9425e1ae7881aada1:
        aggregate_digest: "sha256:b9ea9d54a2a0a95c548ad3d7add7ec69ad07363f6a7a0e18f8ee4b53baa5bb2e"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:55:41.528Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_1842e143d816373b1d75277f"
          mutation_id: "compatibility:sha256:c5e136d306717b8baa78a79c5988337aad2a981f9c4d2bb9425e1ae7881aada1"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 18
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:c5e136d306717b8baa78a79c5988337aad2a981f9c4d2bb9425e1ae7881aada1"
        next_revision: 19
        previous_revision: 18
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:d6dec8b23a2b0f40b5b80415107050c8602c8f672d5ea820b47d5213794388d6:
        aggregate_digest: "sha256:190ad5b017b540d120ab2c3486b9e327c83a37f08fa90e4ebc9b96fb3d12241c"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:55:41.528Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b715272336b039b8f3c2e940"
          mutation_id: "compatibility:sha256:d6dec8b23a2b0f40b5b80415107050c8602c8f672d5ea820b47d5213794388d6"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 17
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d6dec8b23a2b0f40b5b80415107050c8602c8f672d5ea820b47d5213794388d6"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      compatibility:sha256:f9099264a939533a9f2d7b2413548554027e431e700efc66521da38dcc300689:
        aggregate_digest: "sha256:eb1c22f896741989c8cf11d8d88d2262c17f02794b4dcc5cceaf592b8c6756d4"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:36:09.060Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_0ddf6e1626dcae8e2e038960"
          mutation_id: "compatibility:sha256:f9099264a939533a9f2d7b2413548554027e431e700efc66521da38dcc300689"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f9099264a939533a9f2d7b2413548554027e431e700efc66521da38dcc300689"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609071219-QV0SX9"
      external-result:work-order-202609071219-QV0SX9-executor-748d82211264210e37c31543:
        aggregate_digest: "sha256:21efbe23036a9fe55bf32cca1b7f096a941076c5b14917ea0ee43244c78ae64d"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T13:40:14.462Z"
          cause_refs:
            - "semantic-result:sha256:acc65ba5af330b5b68a826145c46c37105acf33ad56e064b7333c61e14e053dd"
          entity: "work_item"
          from: "READY"
          id: "event_c60a867c3fa9785c96e510d8"
          mutation_id: "external-result:work-order-202609071219-QV0SX9-executor-748d82211264210e37c31543"
          plan_digest: "sha256:371d72418b49a68883836ccf43d01034ab7100ac028a08d5f0f1422b552261d4"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071219-QV0SX9"
          task_revision: 11
          to: "COMPLETED"
          work_item_id: "prompt-language-and-compaction"
        mutation_id: "external-result:work-order-202609071219-QV0SX9-executor-748d82211264210e37c31543"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609071219-QV0SX9"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "b847aa915f64886905be06ccfb30e37544f35d25"
  task_execution_context:
    base_ref: "main"
    base_sha: "ca07204eed841a1aa245e3bb8d14832d7ea3ac30"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "ca07204eed841a1aa245e3bb8d14832d7ea3ac30"
    version: 1
id_source: "generated"
---
## Summary

Use simple technical English in task prompts and remove redundant prompt context

Deliver the existing simple technical English rules to external-agent and managed-runner episodes. Align the PLANNER profile with one user Task and internal WorkItems. Rewrite framework-owned instructions as explicit single-action sentences. Remove repeated prompt instructions and replace verbose result examples with concise schema-valid examples for every supported status. Preserve authority, protected paths, stop rules, typed schemas, exact user input, identifiers, evidence, approval gates, and all outcome branches. Add focused regression tests for both prompt routes, semantic coverage, example validity, and prompt-size reduction. Do not change release versions or publish. Measure rendered prompt size; do not claim token savings without a tokenizer measurement.

## Scope

- In scope: Deliver the existing simple technical English rules to external-agent and managed-runner episodes. Align the PLANNER profile with one user Task and internal WorkItems. Rewrite framework-owned instructions as explicit single-action sentences. Remove repeated prompt instructions and replace verbose result examples with concise schema-valid examples for every supported status. Preserve authority, protected paths, stop rules, typed schemas, exact user input, identifiers, evidence, approval gates, and all outcome branches. Add focused regression tests for both prompt routes, semantic coverage, example validity, and prompt-size reduction. Do not change release versions or publish. Measure rendered prompt size; do not claim token savings without a tokenizer measurement.
- Out of scope: unrelated refactors not required for "Use simple technical English in task prompts and remove redundant prompt context".

## Plan

Implement one WorkItem: prompt-language-and-compaction.
1. Reuse the existing gateway language rules in the semantic projection. Keep lifecycle instructions excluded. Add equivalent language guidance to the external-agent instruction path.
2. Align the bundled PLANNER profile with TaskPlanProposal and internal WorkItems. Split compound framework instructions into explicit sentences.
3. Remove duplicate runner prose only when the same constraint remains explicit elsewhere in the final prompt. Keep all authority and stop conditions.
4. Replace verbose runner result examples with concise schema-valid examples for completed, blocked, needs_context, and failed. Keep test fixtures unchanged unless their existing contract requires an update.
5. Extend the nearest tests for both prompt routes, exact literal preservation, effective authority, result parsing, and prompt byte reduction.
Validation: run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2. Run bun run typecheck. Run bunx prettier --check on changed files. Record before/after UTF-8 prompt bytes using fixed fixtures. AgentPlane owns formal verification persistence.
Scope: the eight files listed in the WorkItem. Reuse existing primitives. Do not change schemas, gateway policy files, security enforcement, release metadata, or external systems. Do not minify or abbreviate schema keys in this change.
Risk: compaction could omit a constraint or a required example field. Regression tests must compare retained semantic contracts and parse every status example.
Rollback: revert only this WorkItem's implementation diff.
External writes, commits, publication, and hosted integration require their own explicit operator authority.

## Verify Steps

1. Run the four declared focused test files. Expected: language rules reach every external episode and managed continuation; literals, effective authority, stop conditions, and four valid result statuses remain covered.
2. Run bun run typecheck and Prettier on the nine changed files. Expected: no type or formatting errors.
3. Run bun run ci:local:full as required by the repository verification floor. Expected: all required verification groups pass.
4. Compare fixed prompt fixtures with the pre-change baseline. Expected: EXECUTOR remains below 8590 bytes and EVALUATOR remains below 9196 bytes. Final measured sizes are 7823 and 8429 bytes. Report bytes only.
5. Confirm installed and bundled PLANNER profiles are identical and use TaskPlanProposal with internal WorkItems. Inspect the final diff for unrelated changes.
6. Before merge, require passing hosted checks for the exact PR head and record any remaining limitations.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-07T13:44:37.275Z — VERIFY — needs_rework

By: TESTER

Note: CI found unsafe JSON.parse any access in agents-template.test.ts. Fix the fixture type and rerun full verification; hosted static check failed on PR #5912.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6a1b4018be21ed5150e62c6860d7575e5769d7f72a2c1ea083fd2fd97132cc7f, input_digest=sha256:1179a09e335f96b75612c284e6f93ef56d9bcbe5d69cf80b9dbac698a47a5ec1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609071219-QV0SX9-use-simple-technical-english-in-task-prompts-and/.agentplane/tasks/202609071219-QV0SX9/blueprint/resolved-snapshot.json
- old_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
- current_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609071219-QV0SX9

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609071219-QV0SX9
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-07T13:53:48.547Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6a1b4018be21ed5150e62c6860d7575e5769d7f72a2c1ea083fd2fd97132cc7f, input_digest=sha256:50371e453165236ffbfba85159868a6e8c985951d0b85bff33d89781886953dd

Details:

Command: bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609071219-QV0SX9 declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609071219-QV0SX9 declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609071219-QV0SX9 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609071219-QV0SX9-use-simple-technical-english-in-task-prompts-and/.agentplane/tasks/202609071219-QV0SX9/blueprint/resolved-snapshot.json
- old_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
- current_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609071219-QV0SX9

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609071219-QV0SX9
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-07T14:03:52.599Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6a1b4018be21ed5150e62c6860d7575e5769d7f72a2c1ea083fd2fd97132cc7f, input_digest=sha256:4360bfb80c3409aba726ec46afc3dde1bff093e23c7707abf7807cd44a296a69

Details:

Check: affected_unit_integration
Command: bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check critical_paths (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check full_regression

Check: task_outcome
Command: bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check task_outcome (3/3)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609071219-QV0SX9-use-simple-technical-english-in-task-prompts-and/.agentplane/tasks/202609071219-QV0SX9/blueprint/resolved-snapshot.json
- old_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
- current_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609071219-QV0SX9

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609071219-QV0SX9
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-07T14:13:28.349Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:55f75ddd2e03c3936c282d4ccf587b528d0586fbb1384034b0bdb1150cf608b7, input_digest=sha256:e6c49fc52a70094cc935c1a184f595810ed52cf6ebd6d4ca62315f4634578bde

Details:

Check: affected_unit_integration
Command: bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check critical_paths (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check full_regression

Check: task_outcome
Command: bunx --no-install vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/agents/agents-template.test.ts --maxWorkers=2
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609071219-QV0SX9/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609071219-QV0SX9 Verification Contract check task_outcome (3/3)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609071219-QV0SX9-use-simple-technical-english-in-task-prompts-and/.agentplane/tasks/202609071219-QV0SX9/blueprint/resolved-snapshot.json
- old_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
- current_digest: 2611f865d57b5165360ba834a74dff796a879976579f0787903f49c675260909
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609071219-QV0SX9

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609071219-QV0SX9
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
