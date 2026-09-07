---
id: "202609071219-QV0SX9"
title: "Use simple technical English in task prompts and remove redundant prompt context"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "process-mechanism-repair"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-07T13:03:04.818Z"
  updated_by: "HOST:local:USER"
  note: "host_user_decision=sha256:ee0369e1e1369eedf4614ac785371d252dcf6f9d6d827933528cff0f98ffbe33"
verification:
  state: "pending"
  updated_at: "2026-09-07T13:27:26.459Z"
  updated_by: "USER"
  note: "Invalidated by USER-approved execution scope extension."
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
      digest: "sha256:15d3b02898921fd2b4913a257395c62306f87644a2969550ece357145c9afa20"
      escalation_reasons: []
      execution_groups:
        - "core"
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
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The existing parity test requires the installed PLANNER profile to match its bundled source. Recommended action: Extend scope by the one installed PLANNER profile. Restore the verified implementation backup after the scope is granted. Requested scope: roots=.agentplane/agents/PLANNER.json; repository effects=unchanged; request digest=sha256:7627edfd120838d8be763be22677dee5bf88712470cc162032b96737706bb406. Agentplane receipt: external-agent-blocker/tr_100e9e98242dc4d87b5adbcdbb467872/sha256:b651e953acd4e742fbdae1ee9aecb6fb9f36fd65a128dee63ded3a51a60799b5/sha256:7627edfd120838d8be763be22677dee5bf88712470cc162032b96737706bb406."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: .agentplane/agents/PLANNER.json; repository effects: unchanged."
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
doc_version: 3
doc_updated_at: "2026-09-07T13:27:19.676Z"
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
    PLANNER fallback scaffold for "Use simple technical English in task prompts and remove redundant prompt context". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Use simple technical English in task prompts and remove redundant prompt context". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
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
    event_cursor: 5
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
    revision: 7
    schema_version: 1
    updated_at: "2026-09-07T13:27:19.676Z"
    work_items:
      prompt-language-and-compaction:
        attempt: 0
        claim_id: null
        id: "prompt-language-and-compaction"
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
    pending_effects: []
    retry_budgets: []
    schema_version: 1
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

PLANNER fallback scaffold for "Use simple technical English in task prompts and remove redundant prompt context". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Use simple technical English in task prompts and remove redundant prompt context". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
