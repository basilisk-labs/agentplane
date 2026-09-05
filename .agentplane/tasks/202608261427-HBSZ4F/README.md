---
id: "202608261427-HBSZ4F"
title: "Recover no-PR task branch publication after task-artifact-only divergence"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-publication"
  - "release-blocker"
  - "v0.7.8"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
  - "merge"
  - "external_system"
blueprint_request: "quality.regression"
verify:
  - "bun run ci:local:full"
  - "bunx vitest run packages/agentplane/src/commands/pr"
  - "bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-26T14:34:23.988Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:e9f5e759e42ec1b3833260a1b688254785cd5e33684f419fdb11080f9e4a5f11"
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
    - "reversibility_recovery_required"
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
      - "packages/agentplane/src/commands/pr/branch-publication.test.ts"
      - "packages/agentplane/src/commands/pr/branch-publication.ts"
      - "packages/agentplane/src/commands/pr/open.ts"
      - "packages/agentplane/src/commands/shared/task-local-freshness.ts"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The change alters task-branch publication behavior and therefore requires isolated review and hosted integration."
      - "The guarded replacement performs a network write only after exact provider, repository, object, path, and lease checks succeed."
      - "The task-local freshness helper is read/reused; it should be modified only if its existing contract cannot express the required current-Task artifact boundary."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/pr/branch-publication.test.ts"
      - "packages/agentplane/src/commands/pr/branch-publication.ts"
      - "packages/agentplane/src/commands/pr/open.ts"
      - "packages/agentplane/src/commands/shared/task-local-freshness.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/pr/branch-publication.test.ts"
      - "packages/agentplane/src/commands/pr/branch-publication.ts"
      - "packages/agentplane/src/commands/pr/open.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - "packages/agentplane/src/commands/pr/branch-publication.test.ts"
          - "packages/agentplane/src/commands/pr/branch-publication.ts"
          - "packages/agentplane/src/commands/pr/open.ts"
          - "packages/agentplane/src/commands/shared/task-local-freshness.ts"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:b3f29e22b64c564c12bedebe4e64eb635e2b0a5429cc36fe3718577d26d94f41"
      escalation_reasons:
        - "central_component:packages/agentplane/src/commands/shared/task-local-freshness.ts"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/pr/branch-publication.test.ts"
          - "packages/agentplane/src/commands/pr/branch-publication.ts"
          - "packages/agentplane/src/commands/pr/open.ts"
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
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
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
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "aba7bf30353d4f9f3aac8a2ba9d0a391a5a1b126"
  message: "🚧 HBSZ4F task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: aba7bf30353d. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-26T14:34:34.252Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-26T14:48:00.581Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: aba7bf30353d. CLI accepted one state-bound external-agent semantic result."
    commit: "aba7bf30353d4f9f3aac8a2ba9d0a391a5a1b126"
doc_version: 3
doc_updated_at: "2026-08-26T14:48:00.581Z"
doc_updated_by: "SUPERVISOR"
description: "Release blocker for BXQZ97 and AgentPlane 0.7.8. Symptom: AgentPlane pr open reproducibly fails twice with non-fast-forward when the remote task branch has no PR and local and remote heads diverge only because separate successful verification runs recorded different AgentPlane-owned task evidence commits; source trees are identical. Violated invariant: a clean verified task must have a normal effectively-once publication route when an observed orphan remote branch differs only in the same task's generated artifacts. Root cause: branch publication permits exact-head reuse and guarded replacement for an existing OPEN PR, but intentionally rejects every divergent no-PR branch. Temporary recovery: preserve both exact heads and do not force-push, delete the remote branch, open a PR manually, or edit task state. Permanent fix: add one fail-closed guarded no-PR replacement path that requires exact remote-head lease, same repository identity, provider-proven absence of a matching PR, and a diff confined to the current task's artifact paths; retain refusal for source differences, provider ambiguity, identity mismatch, missing objects, or races. Regression tests must prove success for task-artifact-only divergence and refusal for source divergence, unavailable provider state, mismatched repository, and lease races. Integrate normally, then resume BXQZ97."
sections:
  Summary: |-
    Recover no-PR task branch publication after task-artifact-only divergence

    Release blocker for BXQZ97 and AgentPlane 0.7.8. Symptom: AgentPlane pr open reproducibly fails twice with non-fast-forward when the remote task branch has no PR and local and remote heads diverge only because separate successful verification runs recorded different AgentPlane-owned task evidence commits; source trees are identical. Violated invariant: a clean verified task must have a normal effectively-once publication route when an observed orphan remote branch differs only in the same task's generated artifacts. Root cause: branch publication permits exact-head reuse and guarded replacement for an existing OPEN PR, but intentionally rejects every divergent no-PR branch. Temporary recovery: preserve both exact heads and do not force-push, delete the remote branch, open a PR manually, or edit task state. Permanent fix: add one fail-closed guarded no-PR replacement path that requires exact remote-head lease, same repository identity, provider-proven absence of a matching PR, and a diff confined to the current task's artifact paths; retain refusal for source differences, provider ambiguity, identity mismatch, missing objects, or races. Regression tests must prove success for task-artifact-only divergence and refusal for source divergence, unavailable provider state, mismatched repository, and lease races. Integrate normally, then resume BXQZ97.
  Scope: |-
    - In scope: Release blocker for BXQZ97 and AgentPlane 0.7.8. Symptom: AgentPlane pr open reproducibly fails twice with non-fast-forward when the remote task branch has no PR and local and remote heads diverge only because separate successful verification runs recorded different AgentPlane-owned task evidence commits; source trees are identical. Violated invariant: a clean verified task must have a normal effectively-once publication route when an observed orphan remote branch differs only in the same task's generated artifacts. Root cause: branch publication permits exact-head reuse and guarded replacement for an existing OPEN PR, but intentionally rejects every divergent no-PR branch. Temporary recovery: preserve both exact heads and do not force-push, delete the remote branch, open a PR manually, or edit task state. Permanent fix: add one fail-closed guarded no-PR replacement path that requires exact remote-head lease, same repository identity, provider-proven absence of a matching PR, and a diff confined to the current task's artifact paths; retain refusal for source differences, provider ambiguity, identity mismatch, missing objects, or races. Regression tests must prove success for task-artifact-only divergence and refusal for source divergence, unavailable provider state, mismatched repository, and lease races. Integrate normally, then resume BXQZ97.
    - Out of scope: unrelated refactors not required for "Recover no-PR task branch publication after task-artifact-only divergence".
  Plan: "Prepared a bounded branch_pr plan for fail-closed publication recovery when an orphan remote task branch diverges only in the current Task's generated artifacts."
  Verify Steps: |-
    PLANNER fallback scaffold for "Recover no-PR task branch publication after task-artifact-only divergence". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Recover no-PR task branch publication after task-artifact-only divergence". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    actor: "HOST:codex:USER"
    approval_evidence_digest: "sha256:e9f5e759e42ec1b3833260a1b688254785cd5e33684f419fdb11080f9e4a5f11"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:eb99fc494c3b962e340ff87de629edc93bafdb74f8bcd7882f7b2048ca5b217c"
    digest: "sha256:b2272d9442a04e3d9d5d392f7671a3425e83c6fc8047b55101a3933ae060b63c"
    grant_id: "d0dcdb57-4286-4e3b-97f5-a8c12acc373f"
    issued_at: "2026-08-26T14:34:23.988Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:d6ae1465de8f7bb0d17c69fe296fe3b92fbea925572d764d95ecfe7450409c13"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:1a8e009a74a6a60da0c9acf5ab642363ce87f6e0c2cfb72131207c1038c3823b"
    status: "active"
    task_id: "202608261427-HBSZ4F"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-26T14:34:23.988Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:c391a413af4dc6784042075a0ed06b884a875772818d75533dffe3e69ba84ebc"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-08-26T14:32:36.929Z"
      digest: "sha256:c391a413af4dc6784042075a0ed06b884a875772818d75533dffe3e69ba84ebc"
      proposal:
        assumptions:
          - "Provider state not_found is authoritative only for the matching repository, head branch, and base branch queried by the existing provider adapter."
          - "Current-Task artifact-only divergence is defined by the existing configured workflow directory and task-index path contract; no generic generated-path allowlist will be added."
          - "The ordinary non-force push remains the first publication attempt, and the guarded recovery path executes only after that attempt fails before the external write completes."
        planning_baseline:
          captured_at: "2026-08-26T14:28:01.042Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:332ac73185583d347fa8b5b07e8facf08be75681bbeb25e8f4036633e2d23438"
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
            - ".agentplane/tasks/202608261249-BXQZ97/README.md"
            - ".agentplane/tasks/202608261249-BXQZ97/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608261427-HBSZ4F/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "79bc13ff33358c49e216901f59c8fbc0a17987d2"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608261427-HBSZ4F"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts"
              id: "check-branch-publication-unit"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/commands/pr"
              id: "check-pr-suite"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "check-full-ci"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
          criteria:
            -
              check_ids:
                - "check-branch-publication-unit"
              description: "The exact no-PR task-artifact-only divergence is recoverable with a repository-matched, provider-proven, ref-scoped observed lease."
              id: "TOP-AC1"
              required: true
            -
              check_ids:
                - "check-branch-publication-unit"
                - "check-pr-suite"
              description: "Source divergence, unavailable or ambiguous provider evidence, repository mismatch, missing objects, and lease races remain fail-closed."
              id: "TOP-AC2"
              required: true
            -
              check_ids:
                - "check-pr-suite"
                - "check-full-ci"
              description: "The bounded change introduces no unexpected PR-command or repository-wide regression."
              id: "TOP-AC3"
              required: true
          evidence_fingerprint: "sha256:332ac73185583d347fa8b5b07e8facf08be75681bbeb25e8f4036633e2d23438"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-branch-publication-unit"
                  description: "After the ordinary push fails, replacement requires origin tracking for the same branch, identical fetch/push repository identity, provider state not_found for the matching branch/base, resolvable distinct local and remote object IDs, and a diff confined to the current Task artifact paths."
                  id: "WI1-AC1"
                  required: true
                -
                  check_ids:
                    - "check-branch-publication-unit"
                  description: "The write uses an exact ref-scoped force-with-lease bound to the observed remote head and retains the original error if any guard or the lease fails."
                  id: "WI1-AC2"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 120000
                optional_sources:
                  - "packages/agentplane/src/commands/pr/internal/change-request-provider.ts"
                required_sources:
                  - "packages/agentplane/src/commands/pr/branch-publication.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/shared/task-local-freshness.ts"
                symbol_hints:
                  - "pushTaskBranchUpstreamIfConfigured"
                  - "observeExistingChangeRequestByBranch"
                  - "isTaskLocalOnlyAdvance"
              depends_on: []
              expected_outputs:
                - "A boolean guarded recovery path that succeeds only when the matching PR is provider-proven absent and local/remote divergence is current-Task-artifact-only"
                - "cmdPrOpen supplies task identity and configured artifact-path context without changing normal PR creation behavior"
                - "All ambiguous, mismatched, missing-object, source-divergent, and raced states retain the original publication error"
              id: "WI-1-guarded-no-pr-publication"
              objective: "Add and wire one fail-closed orphan-branch replacement path that reuses existing repository identity, provider observation, task-local diff, exact-object, and force-with-lease primitives."
              optional: false
              priority: 100
              required_inputs:
                - "Current branch-publication exact-head and OPEN-PR lease paths"
                - "Current Task identity and configured workflow/task paths from cmdPrOpen"
                - "Existing isTaskLocalOnlyAdvance contract"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/pr/branch-publication.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/pr/open.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/task-local-freshness.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/pr/branch-publication.ts"
                - "packages/agentplane/src/commands/pr/open.ts"
                - "packages/agentplane/src/commands/shared/task-local-freshness.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts"
                    id: "check-branch-publication-unit"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                criteria:
                  -
                    check_ids:
                      - "check-branch-publication-unit"
                    description: "Focused branch-publication tests prove every prerequisite for the guarded orphan-branch replacement path."
                    id: "WI1-AC1"
                    required: true
                  -
                    check_ids:
                      - "check-branch-publication-unit"
                    description: "Focused branch-publication tests prove exact ref-scoped lease use and fail-closed error preservation."
                    id: "WI1-AC2"
                    required: true
                evidence_fingerprint: "sha256:332ac73185583d347fa8b5b07e8facf08be75681bbeb25e8f4036633e2d23438"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-branch-publication-unit"
                  description: "The focused test file proves the orphan artifact-only branch is replaced and its tracking ref reaches the exact local head."
                  id: "WI2-AC1"
                  required: true
                -
                  check_ids:
                    - "check-branch-publication-unit"
                  description: "Each specified uncertainty or mismatch preserves the remote head and rejects publication."
                  id: "WI2-AC2"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 140000
                optional_sources:
                  - "packages/testkit/src/cli-core-pr-flow.ts"
                required_sources:
                  - "packages/agentplane/src/commands/pr/branch-publication.test.ts"
                symbol_hints:
                  - "installGithubPushTransport"
                  - "installFakeGhPrApi"
              depends_on:
                - "WI-1-guarded-no-pr-publication"
              expected_outputs:
                - "Success coverage for current-Task-artifact-only divergence with provider-proven no PR"
                - "Refusal coverage for source divergence, unavailable or ambiguous provider state, repository mismatch, missing object state, and remote lease race"
                - "Assertions that refusal cases do not issue an unguarded or successful rewrite"
              id: "WI-2-regression-matrix"
              objective: "Add deterministic regression fixtures for the exact orphan-branch success case and every required fail-closed boundary."
              optional: false
              priority: 90
              required_inputs:
                - "Guarded publication contract from WI-1"
                - "Existing fake GitHub provider and Git transport fixtures"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/pr/branch-publication.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/pr/branch-publication.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts"
                    id: "check-branch-publication-unit"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                criteria:
                  -
                    check_ids:
                      - "check-branch-publication-unit"
                    description: "The focused regression matrix proves successful artifact-only replacement and tracking-ref convergence."
                    id: "WI2-AC1"
                    required: true
                  -
                    check_ids:
                      - "check-branch-publication-unit"
                    description: "The focused regression matrix proves each required refusal preserves the remote head."
                    id: "WI2-AC2"
                    required: true
                evidence_fingerprint: "sha256:332ac73185583d347fa8b5b07e8facf08be75681bbeb25e8f4036633e2d23438"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-branch-publication-unit"
                    - "check-pr-suite"
                    - "check-full-ci"
                  description: "All three Task-declared deterministic commands pass on the final implementation checkout."
                  id: "WI3-AC1"
                  required: true
                -
                  check_ids:
                    - "check-full-ci"
                  description: "The final diff remains within approved roots and any open edge is recorded as a finding rather than hidden."
                  id: "WI3-AC2"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/commands/pr/branch-publication.ts"
                  - "packages/agentplane/src/commands/pr/branch-publication.test.ts"
                  - "packages/agentplane/src/commands/pr/open.ts"
                symbol_hints: []
              depends_on:
                - "WI-2-regression-matrix"
              expected_outputs:
                - "Passing focused branch-publication test evidence"
                - "Passing PR command suite evidence"
                - "Passing full local CI evidence"
                - "Final scope comparison and explicit residual findings"
              id: "WI-3-release-blocker-validation"
              objective: "Run the declared focused, PR-command, and full local regression checks and report exact evidence and residual gaps without performing lifecycle transitions."
              optional: false
              priority: 80
              required_inputs:
                - "Completed bounded implementation and regression matrix"
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "task-worktree-202608261427-HBSZ4F"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/commands/shared/task-local-freshness.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts"
                    id: "check-branch-publication-unit"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/pr"
                    id: "check-pr-suite"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "check-full-ci"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "check-branch-publication-unit"
                      - "check-pr-suite"
                      - "check-full-ci"
                    description: "All Task-declared checks pass with supervisor-observable command evidence."
                    id: "WI3-AC1"
                    required: true
                  -
                    check_ids:
                      - "check-full-ci"
                    description: "Full CI and final diff inspection cover the bounded scope and residual-findings requirement."
                    id: "WI3-AC2"
                    required: true
                evidence_fingerprint: "sha256:332ac73185583d347fa8b5b07e8facf08be75681bbeb25e8f4036633e2d23438"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608261427-HBSZ4F"
    event_cursor: 0
    final_validation: null
    id: "202608261427-HBSZ4F"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bunx vitest run packages/agentplane/src/commands/pr"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts"
          id: "legacy-3"
          required: true
      captured_at: "2026-08-26T14:27:10.140Z"
      constraints: []
      request: |-
        Recover no-PR task branch publication after task-artifact-only divergence

        Release blocker for BXQZ97 and AgentPlane 0.7.8. Symptom: AgentPlane pr open reproducibly fails twice with non-fast-forward when the remote task branch has no PR and local and remote heads diverge only because separate successful verification runs recorded different AgentPlane-owned task evidence commits; source trees are identical. Violated invariant: a clean verified task must have a normal effectively-once publication route when an observed orphan remote branch differs only in the same task's generated artifacts. Root cause: branch publication permits exact-head reuse and guarded replacement for an existing OPEN PR, but intentionally rejects every divergent no-PR branch. Temporary recovery: preserve both exact heads and do not force-push, delete the remote branch, open a PR manually, or edit task state. Permanent fix: add one fail-closed guarded no-PR replacement path that requires exact remote-head lease, same repository identity, provider-proven absence of a matching PR, and a diff confined to the current task's artifact paths; retain refusal for source differences, provider ambiguity, identity mismatch, missing objects, or races. Regression tests must prove success for task-artifact-only divergence and refusal for source divergence, unavailable provider state, mismatched repository, and lease races. Integrate normally, then resume BXQZ97.
      task_id: "202608261427-HBSZ4F"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-26T14:34:23.988Z"
    work_items:
      WI-1-guarded-no-pr-publication:
        attempt: 0
        claim_id: null
        id: "WI-1-guarded-no-pr-publication"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      WI-2-regression-matrix:
        attempt: 0
        claim_id: null
        id: "WI-2-regression-matrix"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      WI-3-release-blocker-validation:
        attempt: 0
        claim_id: null
        id: "WI-3-release-blocker-validation"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  implementation_commit:
    hash: "aba7bf30353d4f9f3aac8a2ba9d0a391a5a1b126"
  task_execution_context:
    base_ref: "main"
    base_sha: "79bc13ff33358c49e216901f59c8fbc0a17987d2"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "79bc13ff33358c49e216901f59c8fbc0a17987d2"
    version: 1
id_source: "generated"
---
## Summary

Recover no-PR task branch publication after task-artifact-only divergence

Release blocker for BXQZ97 and AgentPlane 0.7.8. Symptom: AgentPlane pr open reproducibly fails twice with non-fast-forward when the remote task branch has no PR and local and remote heads diverge only because separate successful verification runs recorded different AgentPlane-owned task evidence commits; source trees are identical. Violated invariant: a clean verified task must have a normal effectively-once publication route when an observed orphan remote branch differs only in the same task's generated artifacts. Root cause: branch publication permits exact-head reuse and guarded replacement for an existing OPEN PR, but intentionally rejects every divergent no-PR branch. Temporary recovery: preserve both exact heads and do not force-push, delete the remote branch, open a PR manually, or edit task state. Permanent fix: add one fail-closed guarded no-PR replacement path that requires exact remote-head lease, same repository identity, provider-proven absence of a matching PR, and a diff confined to the current task's artifact paths; retain refusal for source differences, provider ambiguity, identity mismatch, missing objects, or races. Regression tests must prove success for task-artifact-only divergence and refusal for source divergence, unavailable provider state, mismatched repository, and lease races. Integrate normally, then resume BXQZ97.

## Scope

- In scope: Release blocker for BXQZ97 and AgentPlane 0.7.8. Symptom: AgentPlane pr open reproducibly fails twice with non-fast-forward when the remote task branch has no PR and local and remote heads diverge only because separate successful verification runs recorded different AgentPlane-owned task evidence commits; source trees are identical. Violated invariant: a clean verified task must have a normal effectively-once publication route when an observed orphan remote branch differs only in the same task's generated artifacts. Root cause: branch publication permits exact-head reuse and guarded replacement for an existing OPEN PR, but intentionally rejects every divergent no-PR branch. Temporary recovery: preserve both exact heads and do not force-push, delete the remote branch, open a PR manually, or edit task state. Permanent fix: add one fail-closed guarded no-PR replacement path that requires exact remote-head lease, same repository identity, provider-proven absence of a matching PR, and a diff confined to the current task's artifact paths; retain refusal for source differences, provider ambiguity, identity mismatch, missing objects, or races. Regression tests must prove success for task-artifact-only divergence and refusal for source divergence, unavailable provider state, mismatched repository, and lease races. Integrate normally, then resume BXQZ97.
- Out of scope: unrelated refactors not required for "Recover no-PR task branch publication after task-artifact-only divergence".

## Plan

Prepared a bounded branch_pr plan for fail-closed publication recovery when an orphan remote task branch diverges only in the current Task's generated artifacts.

## Verify Steps

PLANNER fallback scaffold for "Recover no-PR task branch publication after task-artifact-only divergence". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Recover no-PR task branch publication after task-artifact-only divergence". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
