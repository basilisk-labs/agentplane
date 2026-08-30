---
id: "202608300559-3MDRBH"
title: "Preserve semantic conflict resolutions in evaluator target selection"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "verification"
  - "clean-core-rebuild"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run typecheck"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-30T06:04:07.990Z"
  updated_by: "USER"
  note: "Standing user approval: finish the clean-core refactor and all necessary in-scope bootstrap fixes without repeated confirmation. Approve plan sha256:77597494a805283885bca86072e69ea8e5a7dd0bf39da19904c3660a37253bf9."
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
      - "packages/agentplane/src/commands/shared/quality-review-merge.ts"
      - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
      - "packages/agentplane/src/commands/shared/quality-review-target.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The existing review target skips the current runtime conflict-resolution commit and reuses stale semantic evidence. The change strengthens exact implementation coverage and preserves isolated task ownership."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/shared/quality-review-merge.ts"
      - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
      - "packages/agentplane/src/commands/shared/quality-review-target.ts"
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
          - "packages/agentplane/src/commands/shared/quality-review-merge.ts"
          - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
          - "packages/agentplane/src/commands/shared/quality-review-target.ts"
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
      digest: "sha256:8d8743c3c71fc72e8f3547b296daeec1b295a2a4f18cc734c067548b609e19b1"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/quality-review-merge.ts"
        - "central_component:packages/agentplane/src/commands/shared/quality-review-target.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/quality-review-target.ts"
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
commit:
  hash: "ccc578931ad7b4527ab1d9734f899f6b354bd5e4"
  message: "🔧 3MDRBH verification: retain semantic merge review targets"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed through the routed dirty-worktree recovery after the supervisor commit was blocked by stale build. All 29 focused regression tests, typecheck, lint and diff checks passed. Continue fresh verification from this exact implementation; do not reuse old review evidence."
events:
  -
    type: "status"
    at: "2026-08-30T06:04:21.995Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-30T06:21:49.017Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed through the routed dirty-worktree recovery after the supervisor commit was blocked by stale build. All 29 focused regression tests, typecheck, lint and diff checks passed. Continue fresh verification from this exact implementation; do not reuse old review evidence."
    commit: "ccc578931ad7b4527ab1d9734f899f6b354bd5e4"
doc_version: 3
doc_updated_at: "2026-08-30T06:21:49.017Z"
doc_updated_by: "CODER"
description: "Fix the reproduced review-target defect that skips every base-sync merge when an older evaluated SHA exists. Distinguish a clean automatic base synchronization from a semantic conflict resolution, keep semantic merge changes inside the exact reviewed implementation identity, and add a regression using real Git merge parents. This bootstrap blocks fresh qualification of AP-RUNTIME-001 PR #5880 after resolution commit 26b69b0fe. Preserve evidence and task state; never hand-edit quality receipts or weaken freshness checks."
sections:
  Summary: |-
    Preserve semantic conflict resolutions in evaluator target selection

    Fix the reproduced review-target defect that skips every base-sync merge when an older evaluated SHA exists. Distinguish a clean automatic base synchronization from a semantic conflict resolution, keep semantic merge changes inside the exact reviewed implementation identity, and add a regression using real Git merge parents. This bootstrap blocks fresh qualification of AP-RUNTIME-001 PR #5880 after resolution commit 26b69b0fe. Preserve evidence and task state; never hand-edit quality receipts or weaken freshness checks.
  Scope: |-
    - In scope: Fix the reproduced review-target defect that skips every base-sync merge when an older evaluated SHA exists. Distinguish a clean automatic base synchronization from a semantic conflict resolution, keep semantic merge changes inside the exact reviewed implementation identity, and add a regression using real Git merge parents. This bootstrap blocks fresh qualification of AP-RUNTIME-001 PR #5880 after resolution commit 26b69b0fe. Preserve evidence and task state; never hand-edit quality receipts or weaken freshness checks.
    - Out of scope: unrelated refactors not required for "Preserve semantic conflict resolutions in evaluator target selection".
  Plan: "Fix the proven semantic-merge review-target omission in one bounded bootstrap WorkItem. Preserve clean-merge reuse and all current verification gates."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    digest: "sha256:ead391178eddfacedd4b353383acc639e2426daf1698ef05446b96e85b40df6e"
    grant_id: "2239f4d7-d870-421f-8489-22fe92635c8e"
    issued_at: "2026-08-30T06:04:07.990Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:0fb60465f041d421403640533cd503b1b46003c55314ae4c135f531825b4cf69"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608300559-3MDRBH"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-30T06:04:07.990Z"
        approved_by: "USER"
        approved_digest: "sha256:77597494a805283885bca86072e69ea8e5a7dd0bf39da19904c3660a37253bf9"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-30T06:03:27.580Z"
      digest: "sha256:77597494a805283885bca86072e69ea8e5a7dd0bf39da19904c3660a37253bf9"
      proposal:
        assumptions:
          - "The user has approved in-scope bootstrap fixes needed to finish the refactor."
          - "Do not alter approval transport, publish the release or hand-edit any Task evidence."
          - "Keep the three-file scope and test the defect before fixing it. Requalify the runtime Task only after the fix is delivered."
        planning_baseline:
          captured_at: "2026-08-30T06:01:07.412Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:32200dbeca535b00e31648ba936f2af4483bb849f9eb1a7de8be8ab8b44a074e"
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
            - ".agentplane/tasks/202608291006-255K66/README.md"
            - ".agentplane/tasks/202608300559-3MDRBH/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "cbc5d79d1510293de3b4c30b61679cdef85d0fdb"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608300559-3MDRBH"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "types"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "diff"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "types"
                - "diff"
              description: "Select a semantic merge resolution as the evaluator target even when an older reviewed commit exists. Preserve previous review reuse for proven clean base synchronization and managed lifecycle-only artifacts. Use read-only Git tree/diff/ancestry evidence without re-merging, modifying Git objects or consulting provider state. Treat unsupported or ambiguous parent history conservatively as requiring fresh review. Add real Git regression cases for conflicting edits resolved to new content or either parent, manual edits during a clean merge, clean base-only source changes and later managed artifacts. Do not modify runtime Task state, quality receipts or approval evidence."
              id: "merge-review-target"
              required: true
          evidence_fingerprint: "sha256:0c2010a4f2260007c570dfcd9d1da9d0af8fd6e8daa196da43d510b5af852f61"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "types"
                    - "diff"
                  description: "Select a semantic merge resolution as the evaluator target even when an older reviewed commit exists. Preserve previous review reuse for proven clean base synchronization and managed lifecycle-only artifacts. Use read-only Git tree/diff/ancestry evidence without re-merging, modifying Git objects or consulting provider state. Treat unsupported or ambiguous parent history conservatively as requiring fresh review. Add real Git regression cases for conflicting edits resolved to new content or either parent, manual edits during a clean merge, clean base-only source changes and later managed artifacts. Do not modify runtime Task state, quality receipts or approval evidence."
                  id: "merge-review-target"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 64000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "resolveQualityReviewTargetSha"
                  - "hasReviewableChangesAgainstMergeParent"
              depends_on: []
              expected_outputs:
                - "merge-review-target-implementation"
              id: "merge-review-target"
              objective: "Select a semantic merge resolution as the evaluator target even when an older reviewed commit exists. Preserve previous review reuse for proven clean base synchronization and managed lifecycle-only artifacts. Use read-only Git tree/diff/ancestry evidence without re-merging, modifying Git objects or consulting provider state. Treat unsupported or ambiguous parent history conservatively as requiring fresh review. Add real Git regression cases for conflicting edits resolved to new content or either parent, manual edits during a clean merge, clean base-only source changes and later managed artifacts. Do not modify runtime Task state, quality receipts or approval evidence."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/quality-review-target.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/quality-review-merge.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/shared/quality-review-target.ts"
                - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
                - "packages/agentplane/src/commands/shared/quality-review-merge.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "types"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "diff"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "types"
                      - "diff"
                    description: "Select a semantic merge resolution as the evaluator target even when an older reviewed commit exists. Preserve previous review reuse for proven clean base synchronization and managed lifecycle-only artifacts. Use read-only Git tree/diff/ancestry evidence without re-merging, modifying Git objects or consulting provider state. Treat unsupported or ambiguous parent history conservatively as requiring fresh review. Add real Git regression cases for conflicting edits resolved to new content or either parent, manual edits during a clean merge, clean base-only source changes and later managed artifacts. Do not modify runtime Task state, quality receipts or approval evidence."
                    id: "merge-review-target"
                    required: true
                evidence_fingerprint: "sha256:0c2010a4f2260007c570dfcd9d1da9d0af8fd6e8daa196da43d510b5af852f61"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608300559-3MDRBH"
    event_cursor: 0
    final_validation: null
    id: "202608300559-3MDRBH"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "git diff --check"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-30T05:59:57.874Z"
      constraints: []
      request: |-
        Preserve semantic conflict resolutions in evaluator target selection

        Fix the reproduced review-target defect that skips every base-sync merge when an older evaluated SHA exists. Distinguish a clean automatic base synchronization from a semantic conflict resolution, keep semantic merge changes inside the exact reviewed implementation identity, and add a regression using real Git merge parents. This bootstrap blocks fresh qualification of AP-RUNTIME-001 PR #5880 after resolution commit 26b69b0fe. Preserve evidence and task state; never hand-edit quality receipts or weaken freshness checks.
      task_id: "202608300559-3MDRBH"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-30T06:04:07.990Z"
    work_items:
      merge-review-target:
        attempt: 0
        claim_id: null
        id: "merge-review-target"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "cbc5d79d1510293de3b4c30b61679cdef85d0fdb"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "cbc5d79d1510293de3b4c30b61679cdef85d0fdb"
    version: 1
id_source: "generated"
---
## Summary

Preserve semantic conflict resolutions in evaluator target selection

Fix the reproduced review-target defect that skips every base-sync merge when an older evaluated SHA exists. Distinguish a clean automatic base synchronization from a semantic conflict resolution, keep semantic merge changes inside the exact reviewed implementation identity, and add a regression using real Git merge parents. This bootstrap blocks fresh qualification of AP-RUNTIME-001 PR #5880 after resolution commit 26b69b0fe. Preserve evidence and task state; never hand-edit quality receipts or weaken freshness checks.

## Scope

- In scope: Fix the reproduced review-target defect that skips every base-sync merge when an older evaluated SHA exists. Distinguish a clean automatic base synchronization from a semantic conflict resolution, keep semantic merge changes inside the exact reviewed implementation identity, and add a regression using real Git merge parents. This bootstrap blocks fresh qualification of AP-RUNTIME-001 PR #5880 after resolution commit 26b69b0fe. Preserve evidence and task state; never hand-edit quality receipts or weaken freshness checks.
- Out of scope: unrelated refactors not required for "Preserve semantic conflict resolutions in evaluator target selection".

## Plan

Fix the proven semantic-merge review-target omission in one bounded bootstrap WorkItem. Preserve clean-merge reuse and all current verification gates.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
