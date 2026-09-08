---
id: "202609081927-P1MJV7"
title: "Reduce redundant recovery episodes and exchange data"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "performance"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-08T19:30:53.659Z"
  updated_by: "USER"
  note: null
verification:
  state: "pending"
  updated_at: "2026-09-08T19:43:15.429Z"
  updated_by: "USER"
  note: "Invalidated by USER-approved execution scope extension."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
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
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/branch"
      - "packages/agentplane/src/commands/evaluator"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner"
      - "packages/core/schemas"
      - "packages/core/src/runner"
      - "packages/core/src/tasks"
      - "packages/spec/schemas"
      - "schemas"
      - "scripts/baselines"
      - "scripts/bench"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "USER approved all three proposed optimizations and their state, retention, and evidence guards."
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/commands/branch; repository_effects=source_code,tests"
      - "Use an isolated checkout based on merged PR 5923. Keep lifecycle ownership and verification authority in the CLI."
    repository_effects:
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/branch"
      - "packages/agentplane/src/commands/evaluator"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner"
      - "packages/core/schemas"
      - "packages/core/src/runner"
      - "packages/core/src/tasks"
      - "packages/spec/schemas"
      - "schemas"
      - "scripts/baselines"
      - "scripts/bench"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/branch"
          - "packages/agentplane/src/commands/evaluator"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/runner"
          - "packages/core/schemas"
          - "packages/core/src/runner"
          - "packages/core/src/tasks"
          - "packages/spec/schemas"
          - "schemas"
          - "scripts/baselines"
          - "scripts/bench"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "public_api"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:bc2879ad4a78c293b620fe8eb0b80a30e3bba339004c86c778d53910a7c5558a"
      escalation_reasons:
        - "central_component:packages/core/schemas"
        - "central_component:packages/core/src/runner"
        - "central_component:packages/core/src/tasks"
        - "effect_public_api"
        - "effect_schema"
        - "effect_security_boundary"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
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
      - "hosted_integration"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "PLANNER"
    body: "Planning returned blocked: Planning snapshot predates the merged prerequisite PR 5923. The base checkout must advance to the already-fetched main before freezing a plan."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. USER requested automatic post-merge worktree cleanup in addition to the three approved optimizations. The task checkout also needs reconciliation to merged prerequisite PR 5923. Recommended action: Grant the USER-requested cleanup scope and fast-forward the unmodified task checkout to base main before issuing a fresh implementation packet. Requested scope: roots=packages/agentplane/src/commands/branch; repository effects=source_code,tests; request digest=sha256:b46c06d9486aa372a98db32a7bd246a64f8f947b27095a56c1f9a692f3c5cbaa. Agentplane receipt: external-agent-blocker/tr_4b32ff99bad1fb38731fbd3d2d1f29fd/sha256:2ee53ffb0f8ce33a54689a067e49700830183d5cdc1fdbfbb4f6678f23dab97a/sha256:b46c06d9486aa372a98db32a7bd246a64f8f947b27095a56c1f9a692f3c5cbaa."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/commands/branch; repository effects: source_code, tests."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The added USER request requires the branch cleanup implementation and its tests. Requested scope: roots=packages/agentplane/src/commands/branch; repository effects=source_code,tests; request digest=sha256:22cd81fba8f20aa547a0f67e270689aec4382b1b37dc03c6fbf7ca013ab16c65. Agentplane receipt: external-agent-blocker/tr_9f3424827f0fced23b814230b3bda09e/sha256:16eb6e765612cbebd6df63f7dad3f3ea3a503dab88c8b4cc3d7edba568966e35/sha256:22cd81fba8f20aa547a0f67e270689aec4382b1b37dc03c6fbf7ca013ab16c65."
  -
    author: "CODER"
    body: "Resumed: USER-approved branch cleanup scope is already present in the execution contract. The task checkout is synchronized with merged prerequisite 7563d84a4 and disk space is restored. Continue all approved optimizations."
events:
  -
    type: "comment"
    at: "2026-09-08T19:28:33.161Z"
    author: "PLANNER"
    body: "Planning returned blocked: Planning snapshot predates the merged prerequisite PR 5923. The base checkout must advance to the already-fetched main before freezing a plan."
  -
    type: "status"
    at: "2026-09-08T19:30:59.976Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-08T19:42:22.484Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. USER requested automatic post-merge worktree cleanup in addition to the three approved optimizations. The task checkout also needs reconciliation to merged prerequisite PR 5923. Recommended action: Grant the USER-requested cleanup scope and fast-forward the unmodified task checkout to base main before issuing a fresh implementation packet. Requested scope: roots=packages/agentplane/src/commands/branch; repository effects=source_code,tests; request digest=sha256:b46c06d9486aa372a98db32a7bd246a64f8f947b27095a56c1f9a692f3c5cbaa. Agentplane receipt: external-agent-blocker/tr_4b32ff99bad1fb38731fbd3d2d1f29fd/sha256:2ee53ffb0f8ce33a54689a067e49700830183d5cdc1fdbfbb4f6678f23dab97a/sha256:b46c06d9486aa372a98db32a7bd246a64f8f947b27095a56c1f9a692f3c5cbaa."
  -
    type: "status"
    at: "2026-09-08T19:43:46.844Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The added USER request requires the branch cleanup implementation and its tests. Requested scope: roots=packages/agentplane/src/commands/branch; repository effects=source_code,tests; request digest=sha256:22cd81fba8f20aa547a0f67e270689aec4382b1b37dc03c6fbf7ca013ab16c65. Agentplane receipt: external-agent-blocker/tr_9f3424827f0fced23b814230b3bda09e/sha256:16eb6e765612cbebd6df63f7dad3f3ea3a503dab88c8b4cc3d7edba568966e35/sha256:22cd81fba8f20aa547a0f67e270689aec4382b1b37dc03c6fbf7ca013ab16c65."
  -
    type: "status"
    at: "2026-09-08T19:45:24.055Z"
    author: "CODER"
    from: "BLOCKED"
    to: "DOING"
    note: "Resumed: USER-approved branch cleanup scope is already present in the execution contract. The task checkout is synchronized with merged prerequisite 7563d84a4 and disk space is restored. Continue all approved optimizations."
doc_version: 3
doc_updated_at: "2026-09-08T19:45:24.055Z"
doc_updated_by: "CODER"
description: "Implement the three USER-approved follow-up optimizations: classify confirmed verification infrastructure failures and resume CLI-owned checks without a new implementation episode or artificial file change; deliver only required or changed context blocks when retention is explicitly confirmed in the same live session, with full context after restart or loss; reuse the existing verified content-addressed evidence store for external result schemas while preserving historical exchanges. Preserve authority, state freshness, independent review, and negative failure behavior. Add focused regression and measurement coverage and run required local verification. Preserve unrelated tasks and do not push, publish, or merge without separate approval."
sections:
  Summary: |-
    Reduce redundant recovery episodes and exchange data

    Implement the three USER-approved follow-up optimizations: classify confirmed verification infrastructure failures and resume CLI-owned checks without a new implementation episode or artificial file change; deliver only required or changed context blocks when retention is explicitly confirmed in the same live session, with full context after restart or loss; reuse the existing verified content-addressed evidence store for external result schemas while preserving historical exchanges. Preserve authority, state freshness, independent review, and negative failure behavior. Add focused regression and measurement coverage and run required local verification. Preserve unrelated tasks and do not push, publish, or merge without separate approval.
  Scope: |-
    - In scope: Implement the three USER-approved follow-up optimizations: classify confirmed verification infrastructure failures and resume CLI-owned checks without a new implementation episode or artificial file change; deliver only required or changed context blocks when retention is explicitly confirmed in the same live session, with full context after restart or loss; reuse the existing verified content-addressed evidence store for external result schemas while preserving historical exchanges. Preserve authority, state freshness, independent review, and negative failure behavior. Add focused regression and measurement coverage and run required local verification. Preserve unrelated tasks and do not push, publish, or merge without separate approval.
    - Out of scope: unrelated refactors not required for "Reduce redundant recovery episodes and exchange data".
  Plan: "Implement the approved three optimizations as one qualified protocol change."
  Verify Steps: |-
    1. Run focused regression tests for infrastructure verification retry, stale or changed source rejection, unknown and code failure routing, and bounded attempts. Require no extra implementation episode or artificial file edits after confirmed environment repair.
    2. Run context tests for required and optional selection, acknowledged retention, same-session changes, restart, context loss, role and authority changes. Measure delivered bytes separately from provider tokens.
    3. Run schema object tests for deduplication, historic exchanges, missing or altered objects, symlinks, and interrupted publication. Measure unique objects and bytes.
    4. Run bun run typecheck, affected ESLint and Prettier checks, schema parity, and bun run ci:local:full. Require passing results and preserve failure evidence.
    5. Review the final diff and git status. Preserve unrelated task work and historical artifacts. Stop before external publication or merge.
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
    completion_contract_digest: "sha256:4790f7c008d40156e1f3a1e6446c3a8825dd50a5966d7b428b15776e3e64eeee"
    digest: "sha256:eda3a506f7f36987ba3ca740646b02370f0e4ea844b9dfe63a3a03ccfa0bf2d5"
    grant_id: "0afd691c-a0e7-409a-9459-aa062c36e4f2"
    issued_at: "2026-09-08T19:30:53.659Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:a42a16cd08beb39299d12e318207864cc0de7abeb5b4c758c3b6825ad2afd543"
    plan_revision: 4
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:286235e1c1a66f137f7b576d3f1dffbb5ddd7bff04538a12c18e10b8d5fea439"
    status: "active"
    task_id: "202609081927-P1MJV7"
  agentplane.scope_extension_request:
    blocker_state_fingerprint: "sha256:16eb6e765612cbebd6df63f7dad3f3ea3a503dab88c8b4cc3d7edba568966e35"
    kind: "task_scope_extension_request"
    request:
      rationale: "USER explicitly requested automatic cleanup after merge while retaining the original three optimizations."
      repository_effects:
        - "source_code"
        - "tests"
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src/commands/branch"
    request_digest: "sha256:22cd81fba8f20aa547a0f67e270689aec4382b1b37dc03c6fbf7ca013ab16c65"
    schema_version: 1
    status: "pending"
    transition_id: "tr_9f3424827f0fced23b814230b3bda09e"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-08T19:43:15.429Z"
        approved_by: "USER"
        approved_digest: "sha256:c2b04c05fadf49d11863665c2d8774e984a7199d4a901ce3a9f5b074a6356e08"
        policy_facts:
          - "state_bound_scope_extension:sha256:b46c06d9486aa372a98db32a7bd246a64f8f947b27095a56c1f9a692f3c5cbaa"
        state: "approved"
      created_at: "2026-09-08T19:43:15.429Z"
      digest: "sha256:c2b04c05fadf49d11863665c2d8774e984a7199d4a901ce3a9f5b074a6356e08"
      proposal:
        assumptions:
          - "Implement as one cohesive WorkItem to avoid repeating task-wide verification for three related transport changes."
          - "Reuse existing runner session and evidence primitives. Never infer retained model context solely from files or digests."
          - "No dependency, policy, or CI configuration changes are planned."
        planning_baseline:
          captured_at: "2026-09-08T19:29:02.657Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:0fc438ad4bad00d2b88336eb6cefe060e57bbafa2f344cbd67f7fe83ee5694a9"
          dirty_paths:
            - ".agentplane/tasks/202609072121-9VEHKH/README.md"
            - ".agentplane/tasks/202609080727-BAWTEE/README.md"
            - ".agentplane/tasks/202609081927-P1MJV7/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "7563d84a4ef51282c9e89e6176915143aaa30a00"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:2"
        schema_version: 1
        task_id: "202609081927-P1MJV7"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              id: "task-check"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "task-check"
              description: "Confirmed infrastructure verification failures resume bounded CLI verification without a new implementation episode or artificial source or report edits. Unknown and code failures retain fail-closed rework behavior."
              id: "accept-1"
              required: true
            -
              check_ids:
                - "task-check"
              description: "Context delivery uses only required and explicitly selected optional blocks. Unchanged blocks may be omitted only for acknowledged retention in the same live session. Restart, context loss, changed authority, and role isolation force sufficient fresh context."
              id: "accept-2"
              required: true
            -
              check_ids:
                - "task-check"
              description: "New external exchanges reuse verified schema objects. Historical exchanges retain original bytes and paths. Missing, tampered, symlinked, and interrupted object publication fail safely."
              id: "accept-3"
              required: true
            -
              check_ids:
                - "task-check"
              description: "Focused regression and quantitative fixture checks pass. Record episode count, delivered context bytes, schema object count, and stored bytes separately from unmeasured provider tokens and latency."
              id: "accept-4"
              required: true
            -
              check_ids:
                - "task-check"
              description: "Type checking, affected lint and formatting, schema parity, and full local CI pass. Preserve unrelated tasks and historical evidence. Do not publish or merge."
              id: "accept-5"
              required: true
          evidence_fingerprint: "sha256:0fc438ad4bad00d2b88336eb6cefe060e57bbafa2f344cbd67f7fe83ee5694a9"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "task-check"
                  description: "Confirmed infrastructure verification failures resume bounded CLI verification without a new implementation episode or artificial source or report edits. Unknown and code failures retain fail-closed rework behavior."
                  id: "accept-1"
                  required: true
                -
                  check_ids:
                    - "task-check"
                  description: "Context delivery uses only required and explicitly selected optional blocks. Unchanged blocks may be omitted only for acknowledged retention in the same live session. Restart, context loss, changed authority, and role isolation force sufficient fresh context."
                  id: "accept-2"
                  required: true
                -
                  check_ids:
                    - "task-check"
                  description: "New external exchanges reuse verified schema objects. Historical exchanges retain original bytes and paths. Missing, tampered, symlinked, and interrupted object publication fail safely."
                  id: "accept-3"
                  required: true
                -
                  check_ids:
                    - "task-check"
                  description: "Focused regression and quantitative fixture checks pass. Record episode count, delivered context bytes, schema object count, and stored bytes separately from unmeasured provider tokens and latency."
                  id: "accept-4"
                  required: true
                -
                  check_ids:
                    - "task-check"
                  description: "Type checking, affected lint and formatting, schema parity, and full local CI pass. Preserve unrelated tasks and historical evidence. Do not publish or merge."
                  id: "accept-5"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
                  - "packages/agentplane/src/runner/context/work-order-context.ts"
                  - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                symbol_hints:
                  - "executeBranchVerificationEpisode"
                  - "resolveWorkOrderContextBlocks"
                  - "persistExternalAgentExchangeArtifacts"
              depends_on: []
              expected_outputs:
                - "qualified implementation"
                - "regression tests"
                - "measurement evidence"
              id: "reduce-redundant-protocol-work"
              objective: "Implement infrastructure verification recovery, acknowledged context delivery, and verified external schema deduplication in this order. Extend nearest tests and measure each saving. Preserve independent review and existing admission checks."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "exclusive"
                  resource: "task-worktree"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/branch"
                - "packages/agentplane/src/commands/evaluator"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner"
                - "packages/core/schemas"
                - "packages/core/src/runner"
                - "packages/core/src/tasks"
                - "packages/spec/schemas"
                - "schemas"
                - "scripts/baselines"
                - "scripts/bench"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "task-check"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "task-check"
                    description: "Confirmed infrastructure verification failures resume bounded CLI verification without a new implementation episode or artificial source or report edits. Unknown and code failures retain fail-closed rework behavior."
                    id: "accept-1"
                    required: true
                  -
                    check_ids:
                      - "task-check"
                    description: "Context delivery uses only required and explicitly selected optional blocks. Unchanged blocks may be omitted only for acknowledged retention in the same live session. Restart, context loss, changed authority, and role isolation force sufficient fresh context."
                    id: "accept-2"
                    required: true
                  -
                    check_ids:
                      - "task-check"
                    description: "New external exchanges reuse verified schema objects. Historical exchanges retain original bytes and paths. Missing, tampered, symlinked, and interrupted object publication fail safely."
                    id: "accept-3"
                    required: true
                  -
                    check_ids:
                      - "task-check"
                    description: "Focused regression and quantitative fixture checks pass. Record episode count, delivered context bytes, schema object count, and stored bytes separately from unmeasured provider tokens and latency."
                    id: "accept-4"
                    required: true
                  -
                    check_ids:
                      - "task-check"
                    description: "Type checking, affected lint and formatting, schema parity, and full local CI pass. Preserve unrelated tasks and historical evidence. Do not publish or merge."
                    id: "accept-5"
                    required: true
                evidence_fingerprint: "sha256:0fc438ad4bad00d2b88336eb6cefe060e57bbafa2f344cbd67f7fe83ee5694a9"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202609081927-P1MJV7"
    event_cursor: 10
    final_validation: null
    id: "202609081927-P1MJV7"
    intent:
      acceptance_criteria: []
      captured_at: "2026-09-08T19:28:33.161Z"
      constraints: []
      request: |-
        Reduce redundant recovery episodes and exchange data

        Implement the three USER-approved follow-up optimizations: classify confirmed verification infrastructure failures and resume CLI-owned checks without a new implementation episode or artificial file change; deliver only required or changed context blocks when retention is explicitly confirmed in the same live session, with full context after restart or loss; reuse the existing verified content-addressed evidence store for external result schemas while preserving historical exchanges. Preserve authority, state freshness, independent review, and negative failure behavior. Add focused regression and measurement coverage and run required local verification. Preserve unrelated tasks and do not push, publish, or merge without separate approval.
      task_id: "202609081927-P1MJV7"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-08T19:30:53.659Z"
          approved_by: "USER"
          approved_digest: "sha256:c5f7410749c6cbb6f72976d8643c7635a80674017f8b27a00079965423242376"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-09-08T19:30:25.323Z"
        digest: "sha256:c5f7410749c6cbb6f72976d8643c7635a80674017f8b27a00079965423242376"
        proposal:
          assumptions:
            - "Implement as one cohesive WorkItem to avoid repeating task-wide verification for three related transport changes."
            - "Reuse existing runner session and evidence primitives. Never infer retained model context solely from files or digests."
            - "No dependency, policy, or CI configuration changes are planned."
          planning_baseline:
            captured_at: "2026-09-08T19:29:02.657Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:0fc438ad4bad00d2b88336eb6cefe060e57bbafa2f344cbd67f7fe83ee5694a9"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609081927-P1MJV7/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "7563d84a4ef51282c9e89e6176915143aaa30a00"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:2"
          schema_version: 1
          task_id: "202609081927-P1MJV7"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "task-check"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "task-check"
                description: "Confirmed infrastructure verification failures resume bounded CLI verification without a new implementation episode or artificial source or report edits. Unknown and code failures retain fail-closed rework behavior."
                id: "accept-1"
                required: true
              -
                check_ids:
                  - "task-check"
                description: "Context delivery uses only required and explicitly selected optional blocks. Unchanged blocks may be omitted only for acknowledged retention in the same live session. Restart, context loss, changed authority, and role isolation force sufficient fresh context."
                id: "accept-2"
                required: true
              -
                check_ids:
                  - "task-check"
                description: "New external exchanges reuse verified schema objects. Historical exchanges retain original bytes and paths. Missing, tampered, symlinked, and interrupted object publication fail safely."
                id: "accept-3"
                required: true
              -
                check_ids:
                  - "task-check"
                description: "Focused regression and quantitative fixture checks pass. Record episode count, delivered context bytes, schema object count, and stored bytes separately from unmeasured provider tokens and latency."
                id: "accept-4"
                required: true
              -
                check_ids:
                  - "task-check"
                description: "Type checking, affected lint and formatting, schema parity, and full local CI pass. Preserve unrelated tasks and historical evidence. Do not publish or merge."
                id: "accept-5"
                required: true
            evidence_fingerprint: "sha256:0fc438ad4bad00d2b88336eb6cefe060e57bbafa2f344cbd67f7fe83ee5694a9"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "task-check"
                    description: "Confirmed infrastructure verification failures resume bounded CLI verification without a new implementation episode or artificial source or report edits. Unknown and code failures retain fail-closed rework behavior."
                    id: "accept-1"
                    required: true
                  -
                    check_ids:
                      - "task-check"
                    description: "Context delivery uses only required and explicitly selected optional blocks. Unchanged blocks may be omitted only for acknowledged retention in the same live session. Restart, context loss, changed authority, and role isolation force sufficient fresh context."
                    id: "accept-2"
                    required: true
                  -
                    check_ids:
                      - "task-check"
                    description: "New external exchanges reuse verified schema objects. Historical exchanges retain original bytes and paths. Missing, tampered, symlinked, and interrupted object publication fail safely."
                    id: "accept-3"
                    required: true
                  -
                    check_ids:
                      - "task-check"
                    description: "Focused regression and quantitative fixture checks pass. Record episode count, delivered context bytes, schema object count, and stored bytes separately from unmeasured provider tokens and latency."
                    id: "accept-4"
                    required: true
                  -
                    check_ids:
                      - "task-check"
                    description: "Type checking, affected lint and formatting, schema parity, and full local CI pass. Preserve unrelated tasks and historical evidence. Do not publish or merge."
                    id: "accept-5"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 100000
                  optional_sources: []
                  required_sources:
                    - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
                    - "packages/agentplane/src/runner/context/work-order-context.ts"
                    - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                  symbol_hints:
                    - "executeBranchVerificationEpisode"
                    - "resolveWorkOrderContextBlocks"
                    - "persistExternalAgentExchangeArtifacts"
                depends_on: []
                expected_outputs:
                  - "qualified implementation"
                  - "regression tests"
                  - "measurement evidence"
                id: "reduce-redundant-protocol-work"
                objective: "Implement infrastructure verification recovery, acknowledged context delivery, and verified external schema deduplication in this order. Extend nearest tests and measure each saving. Preserve independent review and existing admission checks."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "exclusive"
                    resource: "task-worktree"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/evaluator"
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/runner"
                  - "packages/core/src/tasks"
                  - "packages/core/schemas"
                  - "packages/spec/schemas"
                  - "schemas"
                  - "scripts/bench"
                  - "scripts/baselines"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "task-check"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "task-check"
                      description: "Confirmed infrastructure verification failures resume bounded CLI verification without a new implementation episode or artificial source or report edits. Unknown and code failures retain fail-closed rework behavior."
                      id: "accept-1"
                      required: true
                    -
                      check_ids:
                        - "task-check"
                      description: "Context delivery uses only required and explicitly selected optional blocks. Unchanged blocks may be omitted only for acknowledged retention in the same live session. Restart, context loss, changed authority, and role isolation force sufficient fresh context."
                      id: "accept-2"
                      required: true
                    -
                      check_ids:
                        - "task-check"
                      description: "New external exchanges reuse verified schema objects. Historical exchanges retain original bytes and paths. Missing, tampered, symlinked, and interrupted object publication fail safely."
                      id: "accept-3"
                      required: true
                    -
                      check_ids:
                        - "task-check"
                      description: "Focused regression and quantitative fixture checks pass. Record episode count, delivered context bytes, schema object count, and stored bytes separately from unmeasured provider tokens and latency."
                      id: "accept-4"
                      required: true
                    -
                      check_ids:
                        - "task-check"
                      description: "Type checking, affected lint and formatting, schema parity, and full local CI pass. Preserve unrelated tasks and historical evidence. Do not publish or merge."
                      id: "accept-5"
                      required: true
                  evidence_fingerprint: "sha256:0fc438ad4bad00d2b88336eb6cefe060e57bbafa2f344cbd67f7fe83ee5694a9"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609081927-P1MJV7"
    revision: 13
    schema_version: 1
    updated_at: "2026-09-08T19:45:24.055Z"
    work_items:
      reduce-redundant-protocol-work:
        attempt: 0
        claim_id: null
        id: "reduce-redundant-protocol-work"
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
      compatibility:sha256:208c1e784545b5c70fd5d361ca37e2545c55d148762f07c82c724351a158dbba:
        aggregate_digest: "sha256:d2ba15c20ef10c7e2bb38db9a7fbd176d75f4e719a9184c54454a5ddd517fb0a"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T19:45:24.055Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_4d39c197bc42309bab7743cc"
          mutation_id: "compatibility:sha256:208c1e784545b5c70fd5d361ca37e2545c55d148762f07c82c724351a158dbba"
          plan_digest: "sha256:c2b04c05fadf49d11863665c2d8774e984a7199d4a901ce3a9f5b074a6356e08"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081927-P1MJV7"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:208c1e784545b5c70fd5d361ca37e2545c55d148762f07c82c724351a158dbba"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609081927-P1MJV7"
      compatibility:sha256:36a2682b4ab0e2b8ee75a9c765219190c416e90f9b243ad48d690c8ce022ecd5:
        aggregate_digest: "sha256:76b38e548023fb385f0db91cda15bea7a38d8729f2468d86a8db649bfe50a9e2"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T19:30:53.339Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_4e7954aab78d1c1553556cd6"
          mutation_id: "compatibility:sha256:36a2682b4ab0e2b8ee75a9c765219190c416e90f9b243ad48d690c8ce022ecd5"
          plan_digest: "sha256:c5f7410749c6cbb6f72976d8643c7635a80674017f8b27a00079965423242376"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081927-P1MJV7"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:36a2682b4ab0e2b8ee75a9c765219190c416e90f9b243ad48d690c8ce022ecd5"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609081927-P1MJV7"
      compatibility:sha256:500911d00e8b0365ef2f2a05bd95108d7f05912c4705b90de69c251095e7f7a4:
        aggregate_digest: "sha256:02ba42420e221650563ee6d598159ebb5315762156b7d63c73fa1528f15551ee"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T19:43:46.844Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_69fb95ec12e62e5a213dc62c"
          mutation_id: "compatibility:sha256:500911d00e8b0365ef2f2a05bd95108d7f05912c4705b90de69c251095e7f7a4"
          plan_digest: "sha256:c2b04c05fadf49d11863665c2d8774e984a7199d4a901ce3a9f5b074a6356e08"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081927-P1MJV7"
          task_revision: 10
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:500911d00e8b0365ef2f2a05bd95108d7f05912c4705b90de69c251095e7f7a4"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609081927-P1MJV7"
      compatibility:sha256:56aee1c372734e0d5f7b0f5f626e513fcb1132fc6c7a86a8963a4212a9fc3613:
        aggregate_digest: "sha256:d0ebcce500648f9f6c652012389a3dbe022b926179113c5e0789e35c1e1a918c"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T19:42:22.484Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_a372987d7314202354567b58"
          mutation_id: "compatibility:sha256:56aee1c372734e0d5f7b0f5f626e513fcb1132fc6c7a86a8963a4212a9fc3613"
          plan_digest: "sha256:c5f7410749c6cbb6f72976d8643c7635a80674017f8b27a00079965423242376"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081927-P1MJV7"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:56aee1c372734e0d5f7b0f5f626e513fcb1132fc6c7a86a8963a4212a9fc3613"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609081927-P1MJV7"
      compatibility:sha256:611903fea03f103795e725315d752353901379c231be32340e54e054a1995a6e:
        aggregate_digest: "sha256:fd3ad9dba6c8ea653a3b527c0cf1f3aba00284199ff3dde30df1bbde27cb47a6"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T19:42:22.484Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_cc96796219526abaf78ed554"
          mutation_id: "compatibility:sha256:611903fea03f103795e725315d752353901379c231be32340e54e054a1995a6e"
          plan_digest: "sha256:c5f7410749c6cbb6f72976d8643c7635a80674017f8b27a00079965423242376"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081927-P1MJV7"
          task_revision: 8
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:611903fea03f103795e725315d752353901379c231be32340e54e054a1995a6e"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609081927-P1MJV7"
      compatibility:sha256:61773081e0094e63803facbc0691f6c864048a574653f7db22e7ce7ac7516c46:
        aggregate_digest: "sha256:7ca2e128f99ea46f3559b5afd24845ef748264124cc7056e531a206035246df1"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T19:42:22.484Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_71d5be7f42eaf262d6e7d0c8"
          mutation_id: "compatibility:sha256:61773081e0094e63803facbc0691f6c864048a574653f7db22e7ce7ac7516c46"
          plan_digest: "sha256:c5f7410749c6cbb6f72976d8643c7635a80674017f8b27a00079965423242376"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081927-P1MJV7"
          task_revision: 6
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:61773081e0094e63803facbc0691f6c864048a574653f7db22e7ce7ac7516c46"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609081927-P1MJV7"
      compatibility:sha256:6aed368168f9faa9156d05750e292437ab76ef6f3fc044fa41c608cc98e9e1d9:
        aggregate_digest: "sha256:2cbd19867912b1b71882d263f7bb8e35b2361e6f14524f0143efe082d2cca82d"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T19:43:46.844Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_18e0b1dcb9e860e8b86f71af"
          mutation_id: "compatibility:sha256:6aed368168f9faa9156d05750e292437ab76ef6f3fc044fa41c608cc98e9e1d9"
          plan_digest: "sha256:c2b04c05fadf49d11863665c2d8774e984a7199d4a901ce3a9f5b074a6356e08"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081927-P1MJV7"
          task_revision: 11
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:6aed368168f9faa9156d05750e292437ab76ef6f3fc044fa41c608cc98e9e1d9"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609081927-P1MJV7"
      compatibility:sha256:825ac1d30f65396a0e7bda9c2d01bdf3fe675b187f48137e4193c765b29233fb:
        aggregate_digest: "sha256:cf0d0b0f86ec47b4a8ad4deea5afa5e01e1867c6e7511abae6e7f9957e2e6d3f"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T19:42:22.484Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_b44695acb3ef2882b2ea7423"
          mutation_id: "compatibility:sha256:825ac1d30f65396a0e7bda9c2d01bdf3fe675b187f48137e4193c765b29233fb"
          plan_digest: "sha256:c5f7410749c6cbb6f72976d8643c7635a80674017f8b27a00079965423242376"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081927-P1MJV7"
          task_revision: 7
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:825ac1d30f65396a0e7bda9c2d01bdf3fe675b187f48137e4193c765b29233fb"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609081927-P1MJV7"
      compatibility:sha256:a2cfb3d561b2130a4d7e4543d3dc1a5fbd31adc666c2776dbbeb10f81aea30b8:
        aggregate_digest: "sha256:28c9e0cdd2efdf839216ebdb3a34305095a40c67d350412e7e89d12c6f28e3ea"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T19:30:53.338Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_3717a01c41c1f77aa3b0fa35"
          mutation_id: "compatibility:sha256:a2cfb3d561b2130a4d7e4543d3dc1a5fbd31adc666c2776dbbeb10f81aea30b8"
          plan_digest: "sha256:c5f7410749c6cbb6f72976d8643c7635a80674017f8b27a00079965423242376"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081927-P1MJV7"
          task_revision: 3
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:a2cfb3d561b2130a4d7e4543d3dc1a5fbd31adc666c2776dbbeb10f81aea30b8"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609081927-P1MJV7"
      compatibility:sha256:b807aaa6c06e5b4800808aa634dd43201a4c0534f7a4f030b5e54912ceb4c425:
        aggregate_digest: "sha256:2bf4b160b1549847c92e0e6e999593a3810e1dad53fc00e374ebfd9ee21c15b8"
        event:
          actor_id: "agentplane"
          at: "2026-09-08T19:30:59.976Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_2848feddc218d07a130719af"
          mutation_id: "compatibility:sha256:b807aaa6c06e5b4800808aa634dd43201a4c0534f7a4f030b5e54912ceb4c425"
          plan_digest: "sha256:c5f7410749c6cbb6f72976d8643c7635a80674017f8b27a00079965423242376"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609081927-P1MJV7"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b807aaa6c06e5b4800808aa634dd43201a4c0534f7a4f030b5e54912ceb4c425"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609081927-P1MJV7"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "33e106d611fe92603cb836bdcd500a1c624d206b"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "33e106d611fe92603cb836bdcd500a1c624d206b"
    version: 1
id_source: "generated"
---
## Summary

Reduce redundant recovery episodes and exchange data

Implement the three USER-approved follow-up optimizations: classify confirmed verification infrastructure failures and resume CLI-owned checks without a new implementation episode or artificial file change; deliver only required or changed context blocks when retention is explicitly confirmed in the same live session, with full context after restart or loss; reuse the existing verified content-addressed evidence store for external result schemas while preserving historical exchanges. Preserve authority, state freshness, independent review, and negative failure behavior. Add focused regression and measurement coverage and run required local verification. Preserve unrelated tasks and do not push, publish, or merge without separate approval.

## Scope

- In scope: Implement the three USER-approved follow-up optimizations: classify confirmed verification infrastructure failures and resume CLI-owned checks without a new implementation episode or artificial file change; deliver only required or changed context blocks when retention is explicitly confirmed in the same live session, with full context after restart or loss; reuse the existing verified content-addressed evidence store for external result schemas while preserving historical exchanges. Preserve authority, state freshness, independent review, and negative failure behavior. Add focused regression and measurement coverage and run required local verification. Preserve unrelated tasks and do not push, publish, or merge without separate approval.
- Out of scope: unrelated refactors not required for "Reduce redundant recovery episodes and exchange data".

## Plan

Implement the approved three optimizations as one qualified protocol change.

## Verify Steps

1. Run focused regression tests for infrastructure verification retry, stale or changed source rejection, unknown and code failure routing, and bounded attempts. Require no extra implementation episode or artificial file edits after confirmed environment repair.
2. Run context tests for required and optional selection, acknowledged retention, same-session changes, restart, context loss, role and authority changes. Measure delivered bytes separately from provider tokens.
3. Run schema object tests for deduplication, historic exchanges, missing or altered objects, symlinks, and interrupted publication. Measure unique objects and bytes.
4. Run bun run typecheck, affected ESLint and Prettier checks, schema parity, and bun run ci:local:full. Require passing results and preserve failure evidence.
5. Review the final diff and git status. Preserve unrelated task work and historical artifacts. Stop before external publication or merge.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
