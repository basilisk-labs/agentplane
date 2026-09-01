---
id: "202608312334-MPXQBK"
title: "Apply task-centric plan refinement before implementation commit qualification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "bootstrap"
  - "task-centric"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun vitest run packages/agentplane/src/commands/task/task-centric-external-result.test.ts packages/agentplane/src/commands/task/external-agent-implementation-authority.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-31T23:56:12.561Z"
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
    - "effect_external_write"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
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
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/task"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "External writes are limited to native pull-request delivery."
      - "The change affects lifecycle result admission and requires isolated regression coverage and hosted review."
    repository_effects:
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli"
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
    - "effect_external_write"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/task"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:0159d6234066b4eff34c0a2d702792ff148a8df233a290ec632b5706194a3708"
      escalation_reasons:
        - "external_effect_requires_real_e2e"
      execution_groups:
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
      requires_full_regression: false
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-31T23:43:03.998Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-31T23:56:13.965Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-31T23:56:13.965Z"
doc_updated_by: "CODER"
description: "Fix external-agent implementation result handling so a completed semantic result containing plan_refinement is recorded through the canonical task-centric adapter before implementation commit recovery, scope qualification, verification, or WorkItem result recording. A material refinement must return replan_required without requiring workspace changes or reassigning historical implementation diffs to the current WorkItem. Preserve stale-state, baseline, identity, and task-centric binding checks. Add focused regressions for result_received recovery and scope-expanding refinement. This bootstrap unblocks 202608291006-255K66."
sections:
  Summary: |-
    Apply task-centric plan refinement before implementation commit qualification

    Fix external-agent implementation result handling so a completed semantic result containing plan_refinement is recorded through the canonical task-centric adapter before implementation commit recovery, scope qualification, verification, or WorkItem result recording. A material refinement must return replan_required without requiring workspace changes or reassigning historical implementation diffs to the current WorkItem. Preserve stale-state, baseline, identity, and task-centric binding checks. Add focused regressions for result_received recovery and scope-expanding refinement. This bootstrap unblocks 202608291006-255K66.
  Scope: |-
    - In scope: Fix external-agent implementation result handling so a completed semantic result containing plan_refinement is recorded through the canonical task-centric adapter before implementation commit recovery, scope qualification, verification, or WorkItem result recording. A material refinement must return replan_required without requiring workspace changes or reassigning historical implementation diffs to the current WorkItem. Preserve stale-state, baseline, identity, and task-centric binding checks. Add focused regressions for result_received recovery and scope-expanding refinement. This bootstrap unblocks 202608291006-255K66.
    - Out of scope: unrelated refactors not required for "Apply task-centric plan refinement before implementation commit qualification".
  Plan: "One bounded compatibility WorkItem recovers only exact pre-A0F906 refinement exchanges and retains fail-closed behavior elsewhere."
  Verify Steps: |-
    PLANNER fallback scaffold for "Apply task-centric plan refinement before implementation commit qualification". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Apply task-centric plan refinement before implementation commit qualification". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    completion_contract_digest: "sha256:2bee65bfc3b0604ba82f49f73586220196bb36c23a1cccfd2206a0994481b365"
    digest: "sha256:17f56023612a9bc785d03057ab0714ff254f134aac9b83bd8741501b63360087"
    grant_id: "9776bffe-7a23-44ce-8b39-21b3cc11030e"
    issued_at: "2026-08-31T23:56:12.561Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:f2dcca8ea027aab6d6360e6be90ec44c53cb63e474fdc7221b83275c361aac21"
    plan_revision: 6
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:9225b51d473b5a4aeed46665e188e2d5cc0e89c91516d94b73596dc9b3c4e92e"
    status: "active"
    task_id: "202608312334-MPXQBK"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-31T23:56:12.561Z"
        approved_by: "USER"
        approved_digest: "sha256:da1b9d93d9217e30747da6cc11312b3e8fbedae4b16958626005099f34672989"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-31T23:56:05.092Z"
      digest: "sha256:da1b9d93d9217e30747da6cc11312b3e8fbedae4b16958626005099f34672989"
      proposal:
        assumptions:
          - "Recovery is limited to pre-A0F906 exchanges whose result is already immutably received."
          - "No task journal, exchange or evidence artifact is edited manually."
          - "New exchanges continue to require exact content snapshots."
        planning_baseline:
          captured_at: "2026-08-31T23:55:46.394Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:06a27a20b659d237fd25f1938d2f70bfbad278ac15e20715dbd0fba7e71104d1"
          dirty_paths:
            - ".agentplane/tasks/202608312334-MPXQBK/README.md"
            - ".agentplane/tasks/202608312334-MPXQBK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608312334-MPXQBK/pr/diffstat.txt"
            - ".agentplane/tasks/202608312334-MPXQBK/pr/github-body.md"
            - ".agentplane/tasks/202608312334-MPXQBK/pr/github-title.txt"
            - ".agentplane/tasks/202608312334-MPXQBK/pr/meta.json"
            - ".agentplane/tasks/202608312334-MPXQBK/pr/review.md"
          git:
            kind: "commit"
            ref: null
            sha: "1d98bf9e30d8c5c4f419bcf304f8d6379529411d"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:5"
        schema_version: 1
        task_id: "202608312334-MPXQBK"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun vitest run packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
              id: "focused-legacy-refinement-recovery"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-ci"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
          criteria:
            -
              check_ids:
                - "focused-legacy-refinement-recovery"
                - "full-ci"
              description: "Implement a fail-closed recovery path for pre-A0F906 pure plan-refinement exchanges that are already result_received, lack exchange.baseline.task_artifacts, and have unchanged supervisor-owned task metadata drift. Require the exact authoritative checkout, unchanged Git head and source baseline, matching task revision and state fingerprint, a bounded allowlist of README.md plus supervision/declared-checks.json and supervision/implementation-evidence.json, valid JSON schemas and exact task, commit, check and evidence relationships. Reject added, removed, malformed, foreign, mismatched or ambiguous artifacts. Preserve exact content-snapshot validation for new exchanges and preserve ordinary no-diff implementation rejection. Prove initial recovery, lost-response replay, tampering rejection and no WorkItem replay."
              id: "legacy-refinement-recovery"
              required: true
          evidence_fingerprint: "sha256:06a27a20b659d237fd25f1938d2f70bfbad278ac15e20715dbd0fba7e71104d1"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused-legacy-refinement-recovery"
                    - "full-ci"
                  description: "Implement a fail-closed recovery path for pre-A0F906 pure plan-refinement exchanges that are already result_received, lack exchange.baseline.task_artifacts, and have unchanged supervisor-owned task metadata drift. Require the exact authoritative checkout, unchanged Git head and source baseline, matching task revision and state fingerprint, a bounded allowlist of README.md plus supervision/declared-checks.json and supervision/implementation-evidence.json, valid JSON schemas and exact task, commit, check and evidence relationships. Reject added, removed, malformed, foreign, mismatched or ambiguous artifacts. Preserve exact content-snapshot validation for new exchanges and preserve ordinary no-diff implementation rejection. Prove initial recovery, lost-response replay, tampering rejection and no WorkItem replay."
                  id: "legacy-refinement-recovery"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 90000
                optional_sources:
                  - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-plan-refinement.ts"
                  - "packages/agentplane/src/commands/task/external-agent-task-artifact-baseline.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                symbol_hints:
                  - "applyExternalPlanRefinement"
                  - "captureExternalTaskArtifacts"
                  - "isExternalPlanRefinementApplied"
              depends_on: []
              expected_outputs:
                - "legacy-exchange-recovery-evidence"
              id: "legacy-refinement-recovery"
              objective: "Implement a fail-closed recovery path for pre-A0F906 pure plan-refinement exchanges that are already result_received, lack exchange.baseline.task_artifacts, and have unchanged supervisor-owned task metadata drift. Require the exact authoritative checkout, unchanged Git head and source baseline, matching task revision and state fingerprint, a bounded allowlist of README.md plus supervision/declared-checks.json and supervision/implementation-evidence.json, valid JSON schemas and exact task, commit, check and evidence relationships. Reject added, removed, malformed, foreign, mismatched or ambiguous artifacts. Preserve exact content-snapshot validation for new exchanges and preserve ordinary no-diff implementation rejection. Prove initial recovery, lost-response replay, tampering rejection and no WorkItem replay."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun vitest run packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                    id: "focused-legacy-refinement-recovery"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-ci"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "focused-legacy-refinement-recovery"
                      - "full-ci"
                    description: "Implement a fail-closed recovery path for pre-A0F906 pure plan-refinement exchanges that are already result_received, lack exchange.baseline.task_artifacts, and have unchanged supervisor-owned task metadata drift. Require the exact authoritative checkout, unchanged Git head and source baseline, matching task revision and state fingerprint, a bounded allowlist of README.md plus supervision/declared-checks.json and supervision/implementation-evidence.json, valid JSON schemas and exact task, commit, check and evidence relationships. Reject added, removed, malformed, foreign, mismatched or ambiguous artifacts. Preserve exact content-snapshot validation for new exchanges and preserve ordinary no-diff implementation rejection. Prove initial recovery, lost-response replay, tampering rejection and no WorkItem replay."
                    id: "legacy-refinement-recovery"
                    required: true
                evidence_fingerprint: "sha256:06a27a20b659d237fd25f1938d2f70bfbad278ac15e20715dbd0fba7e71104d1"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202608312334-MPXQBK"
    event_cursor: 0
    final_validation: null
    id: "202608312334-MPXQBK"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun vitest run packages/agentplane/src/commands/task/task-centric-external-result.test.ts packages/agentplane/src/commands/task/external-agent-implementation-authority.test.ts"
          id: "legacy-1"
          required: true
      captured_at: "2026-08-31T23:34:14.272Z"
      constraints: []
      request: |-
        Apply task-centric plan refinement before implementation commit qualification

        Fix external-agent implementation result handling so a completed semantic result containing plan_refinement is recorded through the canonical task-centric adapter before implementation commit recovery, scope qualification, verification, or WorkItem result recording. A material refinement must return replan_required without requiring workspace changes or reassigning historical implementation diffs to the current WorkItem. Preserve stale-state, baseline, identity, and task-centric binding checks. Add focused regressions for result_received recovery and scope-expanding refinement. This bootstrap unblocks 202608291006-255K66.
      task_id: "202608312334-MPXQBK"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-08-31T23:35:32.258Z"
          approved_by: "USER"
          approved_digest: "sha256:7ff4a54cd7e7bccd8fa90d158f3460b536b577335f88c55914c024a539b9441f"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-31T23:35:24.453Z"
        digest: "sha256:7ff4a54cd7e7bccd8fa90d158f3460b536b577335f88c55914c024a539b9441f"
        proposal:
          assumptions:
            - "The repair is isolated from 202608291006-255K66 and does not edit its journal, exchange, task artifacts or worktree."
            - "A pure refinement still requires the issued exchange baseline, task revision, repository identity and fingerprint to match."
            - "The ordinary completed implementation path retains commit, scope and verification qualification."
          planning_baseline:
            captured_at: "2026-08-31T23:34:20.492Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:94fc8be2eea817acbe5a53a22b19a69801e36e9b97307da1a6680d24cdb0295c"
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
              - ".agentplane/tasks/202608312248-WXP9JS/README.md"
              - ".agentplane/tasks/202608312334-MPXQBK/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "1d98bf9e30d8c5c4f419bcf304f8d6379529411d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202608312334-MPXQBK"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun vitest run packages/agentplane/src/commands/task/task-centric-external-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                id: "focused-refinement-recovery"
                kind: "deterministic"
                required: true
                timeout_ms: 600000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-ci"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
            criteria:
              -
                check_ids:
                  - "focused-refinement-recovery"
                  - "full-ci"
                description: "Record a completed task-centric plan refinement before implementation commit recovery or qualification. Preserve exchange identity, baseline and stale-state checks. A material refinement must return replan_required without requiring a workspace delta, recovering a historical implementation commit, executing WorkItem validation, or recording a WorkItem result. Preserve the ordinary no-change implementation rejection when no refinement exists. Add regressions for initial receipt and result_received replay, including a scope-expanding refinement that previously attempted to qualify the historical task commit."
                id: "refinement-before-qualification"
                required: true
            evidence_fingerprint: "sha256:94fc8be2eea817acbe5a53a22b19a69801e36e9b97307da1a6680d24cdb0295c"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-refinement-recovery"
                      - "full-ci"
                    description: "Record a completed task-centric plan refinement before implementation commit recovery or qualification. Preserve exchange identity, baseline and stale-state checks. A material refinement must return replan_required without requiring a workspace delta, recovering a historical implementation commit, executing WorkItem validation, or recording a WorkItem result. Preserve the ordinary no-change implementation rejection when no refinement exists. Add regressions for initial receipt and result_received replay, including a scope-expanding refinement that previously attempted to qualify the historical task commit."
                    id: "refinement-before-qualification"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 80000
                  optional_sources:
                    - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                    - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                    - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  symbol_hints:
                    - "applyExternalImplementationResult"
                    - "recordTaskCentricExternalResult"
                    - "resolveRecordedImplementationRecovery"
                depends_on: []
                expected_outputs:
                  - "refinement-recovery-evidence"
                id: "refinement-before-qualification"
                objective: "Record a completed task-centric plan refinement before implementation commit recovery or qualification. Preserve exchange identity, baseline and stale-state checks. A material refinement must return replan_required without requiring a workspace delta, recovering a historical implementation commit, executing WorkItem validation, or recording a WorkItem result. Preserve the ordinary no-change implementation rejection when no refinement exists. Add regressions for initial receipt and result_received replay, including a scope-expanding refinement that previously attempted to qualify the historical task commit."
                optional: false
                priority: 100
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun vitest run packages/agentplane/src/commands/task/task-centric-external-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                      id: "focused-refinement-recovery"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 600000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-ci"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "focused-refinement-recovery"
                        - "full-ci"
                      description: "Record a completed task-centric plan refinement before implementation commit recovery or qualification. Preserve exchange identity, baseline and stale-state checks. A material refinement must return replan_required without requiring a workspace delta, recovering a historical implementation commit, executing WorkItem validation, or recording a WorkItem result. Preserve the ordinary no-change implementation rejection when no refinement exists. Add regressions for initial receipt and result_received replay, including a scope-expanding refinement that previously attempted to qualify the historical task commit."
                      id: "refinement-before-qualification"
                      required: true
                  evidence_fingerprint: "sha256:94fc8be2eea817acbe5a53a22b19a69801e36e9b97307da1a6680d24cdb0295c"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202608312334-MPXQBK"
    revision: 6
    schema_version: 1
    updated_at: "2026-08-31T23:56:12.561Z"
    work_items:
      legacy-refinement-recovery:
        attempt: 0
        claim_id: null
        id: "legacy-refinement-recovery"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      plan-refinement:work-order-202608312334-MPXQBK-executor-c9b29bbb510370404d2b727f:
        aggregate_digest: "sha256:3bd3f482992ea4817f67976612fcfdb02dd7ddfb67b498dd3676527c5d7c84a1"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-31T23:55:44.631Z"
          cause_refs:
            - "outputs_changed"
            - "acceptance_changed"
            - "risk_changed"
            - "architecture_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_943fb97af4a9f94726ef0e6c"
          mutation_id: "plan-refinement:work-order-202608312334-MPXQBK-executor-c9b29bbb510370404d2b727f"
          plan_digest: "sha256:7ff4a54cd7e7bccd8fa90d158f3460b536b577335f88c55914c024a539b9441f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608312334-MPXQBK"
          task_revision: 4
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608312334-MPXQBK-executor-c9b29bbb510370404d2b727f"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202608312334-MPXQBK"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "1d98bf9e30d8c5c4f419bcf304f8d6379529411d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "1d98bf9e30d8c5c4f419bcf304f8d6379529411d"
    version: 1
id_source: "generated"
---
## Summary

Apply task-centric plan refinement before implementation commit qualification

Fix external-agent implementation result handling so a completed semantic result containing plan_refinement is recorded through the canonical task-centric adapter before implementation commit recovery, scope qualification, verification, or WorkItem result recording. A material refinement must return replan_required without requiring workspace changes or reassigning historical implementation diffs to the current WorkItem. Preserve stale-state, baseline, identity, and task-centric binding checks. Add focused regressions for result_received recovery and scope-expanding refinement. This bootstrap unblocks 202608291006-255K66.

## Scope

- In scope: Fix external-agent implementation result handling so a completed semantic result containing plan_refinement is recorded through the canonical task-centric adapter before implementation commit recovery, scope qualification, verification, or WorkItem result recording. A material refinement must return replan_required without requiring workspace changes or reassigning historical implementation diffs to the current WorkItem. Preserve stale-state, baseline, identity, and task-centric binding checks. Add focused regressions for result_received recovery and scope-expanding refinement. This bootstrap unblocks 202608291006-255K66.
- Out of scope: unrelated refactors not required for "Apply task-centric plan refinement before implementation commit qualification".

## Plan

One bounded compatibility WorkItem recovers only exact pre-A0F906 refinement exchanges and retains fail-closed behavior elsewhere.

## Verify Steps

PLANNER fallback scaffold for "Apply task-centric plan refinement before implementation commit qualification". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Apply task-centric plan refinement before implementation commit qualification". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
