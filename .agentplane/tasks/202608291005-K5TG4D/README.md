---
id: "202608291005-K5TG4D"
title: "Specify the clean Task kernel and migration oracle"
status: "TODO"
priority: "high"
owner: "PLANNER"
revision: 23
origin:
  system: "manual"
depends_on: []
tags:
  - "clean-core-rebuild"
  - "specification"
task_kind: "docs"
mutation_scope: "docs"
verify:
  - "bun run docs:ia:check"
  - "bun run format:check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-29T10:21:44.005Z"
  updated_by: "HOST:local:USER"
  note: "host_user_decision=sha256:5f50c786906823fb6caca5472ce58e4d2ef197717143beb0bf3470717eace5de"
verification:
  state: "ok"
  updated_at: "2026-08-29T17:30:23.681Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
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
      - "documentation"
      - "repository_write"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "source_code"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "documentation"
      - "repository_write"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations:
      - "verification:verification-record:fail"
    changed_components:
      - "docs"
    changed_paths:
      - "docs/adr/0017-clean-task-core-rebuild.md"
      - "docs/adr/README.md"
      - "docs/reference/clean-task-core-rebuild-spec.mdx"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
    verification_results:
      -
        id: "recorded-check-1"
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
        id: "verification-record"
        result: "fail"
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
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:f8350ed36e19591e59a8c2c94d4f2a1f3f3b1978657011fe8956fa86d458e9dd"
      escalation_reasons: []
      execution_groups:
        - "docs-schema"
        - "core"
      observed:
        changed_components:
          - "docs"
        changed_files:
          - "docs/adr/0017-clean-task-core-rebuild.md"
          - "docs/adr/README.md"
          - "docs/reference/clean-task-core-rebuild-spec.mdx"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:repository_write"
      - "task_outcome"
      - "verification_recovery:verification-record"
commit:
  hash: "034c1009b73a80a538405abfad43a33e69c9f4a0"
  message: "🚧 K5TG4D task: apply external agent result"
comments:
  -
    author: "PLANNER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 236f9d94d2bf. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: a11f7bc5dd26. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 346df0ede3da. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 034c1009b73a. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-29T10:21:54.163Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-29T10:28:25.932Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 236f9d94d2bf. CLI accepted one state-bound external-agent semantic result."
    commit: "236f9d94d2bffa18e4a391dbd5e2f01a0c96f0c4"
  -
    type: "verify"
    at: "2026-08-29T10:29:27.784Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-29T10:36:54.959Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: a11f7bc5dd26. CLI accepted one state-bound external-agent semantic result."
    commit: "a11f7bc5dd26ca540854e7e550e5930e3b69c734"
  -
    type: "verify"
    at: "2026-08-29T10:37:44.095Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "verify"
    at: "2026-08-29T10:40:04.712Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  -
    type: "verify"
    at: "2026-08-29T17:19:51.260Z"
    author: "USER"
    state: "needs_rework"
    note: "Recover the approved task-centric plan: four required WorkItems remain incomplete despite task-level docs and verification evidence."
  -
    type: "status"
    at: "2026-08-29T17:22:41.823Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 346df0ede3da. CLI accepted one state-bound external-agent semantic result."
    commit: "346df0ede3daf584bbdc929c828fc890f38a2fc0"
  -
    type: "verify"
    at: "2026-08-29T17:23:03.993Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-29T17:29:33.181Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 034c1009b73a. CLI accepted one state-bound external-agent semantic result."
    commit: "034c1009b73a80a538405abfad43a33e69c9f4a0"
  -
    type: "verify"
    at: "2026-08-29T17:30:23.681Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-29T17:30:27.696Z"
doc_updated_by: "SUPERVISOR"
description: "Produce the implementation specification, code ownership map, invariant catalog, compatibility boundary, replay corpus manifest, migration and rollback contract, and acceptance gates for the clean Task core rebuild. The specification must map every legacy AP-AUTH, AP-CORE, AP-RUNTIME, AP-DEPS, and AP-SCOPE item into the replacement milestones without losing traceability."
sections:
  Summary: |-
    Specify the clean Task kernel and migration oracle

    Produce the implementation specification, code ownership map, invariant catalog, compatibility boundary, replay corpus manifest, migration and rollback contract, and acceptance gates for the clean Task core rebuild. The specification must map every legacy AP-AUTH, AP-CORE, AP-RUNTIME, AP-DEPS, and AP-SCOPE item into the replacement milestones without losing traceability.
  Scope: |-
    - In scope: Produce the implementation specification, code ownership map, invariant catalog, compatibility boundary, replay corpus manifest, migration and rollback contract, and acceptance gates for the clean Task core rebuild. The specification must map every legacy AP-AUTH, AP-CORE, AP-RUNTIME, AP-DEPS, and AP-SCOPE item into the replacement milestones without losing traceability.
    - Out of scope: unrelated refactors not required for "Specify the clean Task kernel and migration oracle".
  Plan: "Prepare a decision ADR and implementation specification for a staged clean Task kernel rebuild. Start with a source-backed code map, define a pure canonical kernel, specify compatibility and replay migration, and finish with a complete legacy-task traceability matrix and executable gates."
  Verify Steps: |-
    1. Inspect docs/adr/0017-clean-task-core-rebuild.md and docs/reference/clean-task-core-rebuild-spec.mdx. Expected: they define the staged program, source-backed code map, pure kernel boundary, mandatory invariants, adapter contracts, deterministic migration and rollback, replay corpus, dual-run cutover, and milestone gates.
    2. Inspect the legacy roadmap traceability table. Expected: every AP-AUTH, AP-APPROVAL, AP-GRANT, AP-DEPS, AP-SCOPE, AP-RUNTIME, AP-CORE, AP-CTX, AP-KA, and old root task has exactly one Absorb or Retain disposition with replacement ownership.
    3. Inspect docs/adr/README.md. Expected: ADR 0017 is present in the canonical index and links to the decision record.
    4. Run bun run docs:ia:check. Expected: documentation IA, sidebar coverage, and current path references pass.
    5. Run bun run format:check. Expected: all matched files use Prettier formatting.
    6. Run git diff --check. Expected: no whitespace errors.
    7. Compare the delivered documents against Scope and record any residual implementation choices or graph exceptions in Findings. Expected: open edges are explicit and no legacy requirement is silently dropped.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-29T10:29:27.784Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2dcaeea2d8983813ad29a70c2e37f6ce823a3abfc112b006102615ba79bcde6f, input_digest=sha256:a53f9e6ff0146c6042b3e95347aa777d9db00c0b5468ddcc3c74c738662e766e

    Details:

    Check: docs_contract
    Command: bun run docs:ia:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (1/4)

    Check: docs_contract
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (2/4)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (3/4)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (4/4)

    Check: task_outcome
    Command: bun run docs:ia:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (4/4)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291005-K5TG4D-specify-the-clean-task-kernel-and-migration-orac/.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json
    - old_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
    - current_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291005-K5TG4D

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608291005-K5TG4D
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-29T10:37:44.095Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2dcaeea2d8983813ad29a70c2e37f6ce823a3abfc112b006102615ba79bcde6f, input_digest=sha256:69fb24dff619183c2e2f0edc1fa845f8c57da6a33037ac9a55dfcd2c77a229f4

    Details:

    Check: docs_contract
    Command: bun run docs:ia:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (1/4)

    Check: docs_contract
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (2/4)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (3/4)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (4/4)

    Check: task_outcome
    Command: bun run docs:ia:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (4/4)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291005-K5TG4D-specify-the-clean-task-kernel-and-migration-orac/.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json
    - old_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
    - current_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291005-K5TG4D

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608291005-K5TG4D
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-29T10:40:04.712Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:be2f267bdef19b7ce29cab2131cb3154cfd9b7c8ca67bc83fdf7de8e85fa4dad, input_digest=sha256:d0d87812171e5058d6f637298ff376f11e67ed89cfbb860ed5f43f073adf7c06

    Details:

    Check: docs_contract
    Command: bun run docs:ia:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (1/4)

    Check: docs_contract
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (2/4)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (3/4)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (4/4)

    Check: task_outcome
    Command: bun run docs:ia:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (4/4)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291005-K5TG4D-specify-the-clean-task-kernel-and-migration-orac/.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json
    - old_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
    - current_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291005-K5TG4D

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608291005-K5TG4D
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-29T17:19:51.260Z — VERIFY — needs_rework

    By: USER

    Note: Recover the approved task-centric plan: four required WorkItems remain incomplete despite task-level docs and verification evidence.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:be2f267bdef19b7ce29cab2131cb3154cfd9b7c8ca67bc83fdf7de8e85fa4dad, input_digest=sha256:ca294d3b771cd021781e2fa1d6d45d39ee418bde84975718918e04c8b1af724f

    Details:

    Complete inventory-and-map, kernel-contract, migration-oracle, and traceability-and-gates through fresh state-bound semantic episodes before pre-merge closure.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291005-K5TG4D-specify-the-clean-task-kernel-and-migration-orac/.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json
    - old_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
    - current_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291005-K5TG4D

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane finish 202608291005-K5TG4D --author PLANNER --body 'Verified: pre-merge closure packet is ready for the task PR.' --result 'pre-merge closure' --commit 84e3af962e1386afcbf12b32a37f5cd2bd5bfd78 --pre-merge-closure
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-08-29T17:23:03.993Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:be2f267bdef19b7ce29cab2131cb3154cfd9b7c8ca67bc83fdf7de8e85fa4dad, input_digest=sha256:1308ff6a6abb0bf0045d85b04f022df96056f0d63497c003b41a280eb8648342

    Details:

    Check: docs_contract
    Command: bun run docs:ia:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (1/4)

    Check: docs_contract
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (2/4)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (3/4)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (4/4)

    Check: task_outcome
    Command: bun run docs:ia:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (4/4)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291005-K5TG4D-specify-the-clean-task-kernel-and-migration-orac/.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json
    - old_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
    - current_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291005-K5TG4D

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608291005-K5TG4D
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-29T17:30:23.681Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:be2f267bdef19b7ce29cab2131cb3154cfd9b7c8ca67bc83fdf7de8e85fa4dad, input_digest=sha256:acabc852249143409738ae008be2deffb5b9442e1adaefe4feb26b12d31e8daa

    Details:

    Check: docs_contract
    Command: bun run docs:ia:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (1/4)

    Check: docs_contract
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (2/4)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (3/4)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (4/4)

    Check: task_outcome
    Command: bun run docs:ia:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun run format:check
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (4/4)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291005-K5TG4D-specify-the-clean-task-kernel-and-migration-orac/.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json
    - old_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
    - current_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291005-K5TG4D

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608291005-K5TG4D
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
    approval_evidence_digest: "sha256:5f50c786906823fb6caca5472ce58e4d2ef197717143beb0bf3470717eace5de"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:c16041dd9831e70f058eeaeeb9714afed884dbcb938e6734a0ee0f781506a2bf"
    digest: "sha256:0808d410a02268efccc871526ce240d7cb30d23822bc6ae8f58b08434b1ea1ab"
    grant_id: "8ea719ba-ad19-459f-8429-45f4885f12a5"
    issued_at: "2026-08-29T10:21:44.005Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:c7978a4480be46d5ad21c7c0d033c4864a3486a1516ab5403212f0f3cd284692"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:cb7685d3adca039a80ab47777b617bbe0f2f4eb9f1783679bd96c9955a6470a7"
    status: "active"
    task_id: "202608291005-K5TG4D"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-29T10:21:44.005Z"
        approved_by: "HOST:local:USER"
        approved_digest: "sha256:fca3574e5890b72574edaad0eb3366f67e12a7a9d94a7a2835ceca7cd90968de"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-08-29T10:08:18.221Z"
      digest: "sha256:fca3574e5890b72574edaad0eb3366f67e12a7a9d94a7a2835ceca7cd90968de"
      proposal:
        assumptions:
          - "The public CLI and repository task format remain compatibility surfaces during M0-M2."
          - "The new kernel is implemented in an isolated internal module and receives side effects only through adapters."
          - "The current release work is preserved but does not mutate this task worktree."
        planning_baseline:
          captured_at: "2026-08-29T10:06:41.874Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:cd2711b3a71c2316fdfd333b7c3a642d1614a31f8c5a802409b758f4de5572d6"
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
            - ".agentplane/tasks/202608291005-33PHG4/README.md"
            - ".agentplane/tasks/202608291005-K5TG4D/README.md"
            - ".agentplane/tasks/202608291006-0AJG13/README.md"
            - ".agentplane/tasks/202608291006-255K66/README.md"
            - ".agentplane/tasks/202608291006-2A6BJC/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608291005-K5TG4D"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run docs:ia:check"
              id: "docs-ia"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run format:check"
              id: "format"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "docs-ia"
                - "format"
              description: "The ADR and implementation specification together define the target kernel, code map, invariants, compatibility boundary, replay corpus, migration, rollback, cutover, and acceptance gates."
              id: "spec-complete"
              required: true
            -
              check_ids:
                - "docs-ia"
                - "format"
              description: "All legacy Clean Core task families are mapped without silently dropping scope."
              id: "legacy-mapped"
              required: true
            -
              check_ids:
                - "docs-ia"
                - "format"
              description: "Documentation structure and formatting checks pass."
              id: "docs-valid"
              required: true
          evidence_fingerprint: "sha256:cd2711b3a71c2316fdfd333b7c3a642d1614a31f8c5a802409b758f4de5572d6"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "docs-ia"
                    - "format"
                  description: "The code map names authoritative modules, adapter candidates, side-effect boundaries, test oracles, and legacy hotspots with source paths."
                  id: "map-complete"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 300000
                optional_sources:
                  - "packages/core/src"
                  - "packages/agentplane/src"
                  - "packages/testkit/src"
                required_sources:
                  - "AGENTS.md"
                  - ".agentplane/policy/dod.core.md"
                  - ".agentplane/policy/dod.docs.md"
                  - ".agentplane/tasks/202608241437-SH3CDX/README.md"
                  - ".agentplane/tasks/202608251038-42AC0D/README.md"
                  - "docs/adr/0003-refactor-sequencing.md"
                  - "docs/adr/0014-task-execution-authority.md"
                symbol_hints:
                  - "Task"
                  - "WorkItem"
                  - "ExecutionGrant"
                  - "next-action"
                  - "task advance"
              depends_on: []
              expected_outputs:
                - "artifact:code-map"
              id: "inventory-and-map"
              objective: "Inventory the current Task lifecycle, authority, persistence, projection, CLI, provider, migration, and test surfaces; produce a code ownership map and identify seams that can host a pure replacement kernel."
              optional: false
              priority: 1
              required_inputs:
                - "current repository source"
                - "legacy Clean Core task records"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/adr/0017-clean-task-core-rebuild.md"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
              risk: "low"
              scope_roots:
                - "docs/adr/0017-clean-task-core-rebuild.md"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run docs:ia:check"
                    id: "docs-ia"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run format:check"
                    id: "format"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "docs-ia"
                      - "format"
                    description: "The code map names authoritative modules, adapter candidates, side-effect boundaries, test oracles, and legacy hotspots with source paths."
                    id: "map-complete"
                    required: true
                evidence_fingerprint: "sha256:cd2711b3a71c2316fdfd333b7c3a642d1614a31f8c5a802409b758f4de5572d6"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "docs-ia"
                    - "format"
                  description: "The specification separates pure deterministic kernel logic from filesystem, Git, provider, process, projection, and compatibility effects and defines executable invariants."
                  id: "kernel-bounded"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 300000
                optional_sources:
                  - "packages/core/src"
                  - "packages/agentplane/src"
                  - "packages/testkit/src"
                required_sources:
                  - "AGENTS.md"
                  - ".agentplane/policy/dod.core.md"
                  - ".agentplane/policy/dod.docs.md"
                  - ".agentplane/tasks/202608241437-SH3CDX/README.md"
                  - ".agentplane/tasks/202608251038-42AC0D/README.md"
                  - "docs/adr/0003-refactor-sequencing.md"
                  - "docs/adr/0014-task-execution-authority.md"
                symbol_hints:
                  - "Task"
                  - "WorkItem"
                  - "ExecutionGrant"
                  - "next-action"
                  - "task advance"
              depends_on:
                - "inventory-and-map"
              expected_outputs:
                - "artifact:kernel-contract"
              id: "kernel-contract"
              objective: "Define the canonical Task and WorkItem kernel, state machine, typed commands and results, authority model, invariants, idempotency rules, and forbidden dependencies."
              optional: false
              priority: 2
              required_inputs:
                - "artifact:code-map"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/adr/0017-clean-task-core-rebuild.md"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
              risk: "medium"
              scope_roots:
                - "docs/adr/0017-clean-task-core-rebuild.md"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run docs:ia:check"
                    id: "docs-ia"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run format:check"
                    id: "format"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "docs-ia"
                      - "format"
                    description: "The specification separates pure deterministic kernel logic from filesystem, Git, provider, process, projection, and compatibility effects and defines executable invariants."
                    id: "kernel-bounded"
                    required: true
                evidence_fingerprint: "sha256:cd2711b3a71c2316fdfd333b7c3a642d1614a31f8c5a802409b758f4de5572d6"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "docs-ia"
                    - "format"
                  description: "The migration contract defines input classes, exact expected outputs, mismatch handling, rollback proof, cutover gates, and legacy deletion preconditions."
                  id: "migration-safe"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 300000
                optional_sources:
                  - "packages/core/src"
                  - "packages/agentplane/src"
                  - "packages/testkit/src"
                required_sources:
                  - "AGENTS.md"
                  - ".agentplane/policy/dod.core.md"
                  - ".agentplane/policy/dod.docs.md"
                  - ".agentplane/tasks/202608241437-SH3CDX/README.md"
                  - ".agentplane/tasks/202608251038-42AC0D/README.md"
                  - "docs/adr/0003-refactor-sequencing.md"
                  - "docs/adr/0014-task-execution-authority.md"
                symbol_hints:
                  - "Task"
                  - "WorkItem"
                  - "ExecutionGrant"
                  - "next-action"
                  - "task advance"
              depends_on:
                - "kernel-contract"
              expected_outputs:
                - "artifact:migration-oracle"
              id: "migration-oracle"
              objective: "Define compatibility adapters, one-time migration, replay corpus selection, equivalence checks, dual-run or shadow-read policy, rollback receipts, and fail-closed behavior for unknown layouts."
              optional: false
              priority: 3
              required_inputs:
                - "artifact:kernel-contract"
                - "artifact:code-map"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/adr/0017-clean-task-core-rebuild.md"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
              risk: "high"
              scope_roots:
                - "docs/adr/0017-clean-task-core-rebuild.md"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run docs:ia:check"
                    id: "docs-ia"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run format:check"
                    id: "format"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "docs-ia"
                      - "format"
                    description: "The migration contract defines input classes, exact expected outputs, mismatch handling, rollback proof, cutover gates, and legacy deletion preconditions."
                    id: "migration-safe"
                    required: true
                evidence_fingerprint: "sha256:cd2711b3a71c2316fdfd333b7c3a642d1614a31f8c5a802409b758f4de5572d6"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "docs-ia"
                    - "format"
                  description: "Every legacy roadmap item has exactly one disposition: absorbed by a replacement milestone, retained as an independent prerequisite, or explicitly rejected with rationale."
                  id: "traceability-complete"
                  required: true
                -
                  check_ids:
                    - "docs-ia"
                    - "format"
                  description: "Each replacement milestone has deterministic checks, migration evidence, stop conditions, and rollback criteria."
                  id: "gates-executable"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 300000
                optional_sources:
                  - "packages/core/src"
                  - "packages/agentplane/src"
                  - "packages/testkit/src"
                required_sources:
                  - "AGENTS.md"
                  - ".agentplane/policy/dod.core.md"
                  - ".agentplane/policy/dod.docs.md"
                  - ".agentplane/tasks/202608241437-SH3CDX/README.md"
                  - ".agentplane/tasks/202608251038-42AC0D/README.md"
                  - "docs/adr/0003-refactor-sequencing.md"
                  - "docs/adr/0014-task-execution-authority.md"
                symbol_hints:
                  - "Task"
                  - "WorkItem"
                  - "ExecutionGrant"
                  - "next-action"
                  - "task advance"
              depends_on:
                - "migration-oracle"
              expected_outputs:
                - "artifact:traceability-matrix"
                - "artifact:acceptance-gates"
              id: "traceability-and-gates"
              objective: "Map every AP-AUTH, AP-APPROVAL, AP-GRANT, AP-DEPS, AP-SCOPE, AP-RUNTIME, AP-CORE, and root roadmap task to replacement milestone M0-M3; define acceptance gates and explicit residual work."
              optional: false
              priority: 4
              required_inputs:
                - "artifact:kernel-contract"
                - "artifact:migration-oracle"
                - "legacy task records"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/adr/0017-clean-task-core-rebuild.md"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
              risk: "medium"
              scope_roots:
                - "docs/adr/0017-clean-task-core-rebuild.md"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run docs:ia:check"
                    id: "docs-ia"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run format:check"
                    id: "format"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "docs-ia"
                      - "format"
                    description: "Every legacy roadmap item has exactly one disposition: absorbed by a replacement milestone, retained as an independent prerequisite, or explicitly rejected with rationale."
                    id: "traceability-complete"
                    required: true
                  -
                    check_ids:
                      - "docs-ia"
                      - "format"
                    description: "Each replacement milestone has deterministic checks, migration evidence, stop conditions, and rollback criteria."
                    id: "gates-executable"
                    required: true
                evidence_fingerprint: "sha256:cd2711b3a71c2316fdfd333b7c3a642d1614a31f8c5a802409b758f4de5572d6"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608291005-K5TG4D"
    event_cursor: 1
    final_validation: null
    id: "202608291005-K5TG4D"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run docs:ia:check"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run format:check"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-29T10:05:43.981Z"
      constraints: []
      request: |-
        Specify the clean Task kernel and migration oracle

        Produce the implementation specification, code ownership map, invariant catalog, compatibility boundary, replay corpus manifest, migration and rollback contract, and acceptance gates for the clean Task core rebuild. The specification must map every legacy AP-AUTH, AP-CORE, AP-RUNTIME, AP-DEPS, and AP-SCOPE item into the replacement milestones without losing traceability.
      task_id: "202608291005-K5TG4D"
    lifecycle: "PLANNING"
    plan_amendments:
      -
        actor_id: "external:EXECUTOR"
        created_at: "2026-08-29T17:23:09.763Z"
        digest: "sha256:c8293a0cc6fcfa182c3b1a88888aa345765f4659d8cc827eb0be83f4c6459687"
        id: "amendment_c8293a0cc6fcfa182c3b1a88"
        plan_digest: "sha256:fca3574e5890b72574edaad0eb3366f67e12a7a9d94a7a2835ceca7cd90968de"
        plan_revision: 1
        refinement:
          acceptance_changed: false
          architecture_constraints_changed: false
          dependencies_changed: false
          description: "Clarify recovery execution: process the existing specification artifacts through inventory-and-map, kernel-contract, migration-oracle, and traceability-and-gates in dependency order. A WorkItem episode may reuse the already committed document output when its acceptance checks pass, but each completion must remain bound to that WorkItem."
          external_effects_added: []
          operations:
            - "clarify"
          outputs_added: []
          risk_changed: false
          scope_roots_added: []
        schema_version: 1
    plan_history: []
    revision: 23
    schema_version: 1
    updated_at: "2026-08-29T17:30:32.558Z"
    work_items:
      inventory-and-map:
        attempt: 0
        claim_id: null
        id: "inventory-and-map"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      kernel-contract:
        attempt: 0
        claim_id: null
        id: "kernel-contract"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      migration-oracle:
        attempt: 0
        claim_id: null
        id: "migration-oracle"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      traceability-and-gates:
        attempt: 0
        claim_id: null
        id: "traceability-and-gates"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_replan_required:
    reason_code: "dependencies_changed"
    schema_version: 1
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      plan-refinement:work-order-202608291005-K5TG4D-executor-09639596deab99c5e272bbfd:
        aggregate_digest: "sha256:e9d5a851b5a57b2f0ba3abfc5f1d385c6e01743e0cd97329c6f0a8a243a9594b"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-29T17:30:32.558Z"
          cause_refs:
            - "dependencies_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_5548d3ef32ba051e618eea65"
          mutation_id: "plan-refinement:work-order-202608291005-K5TG4D-executor-09639596deab99c5e272bbfd"
          plan_digest: "sha256:fca3574e5890b72574edaad0eb3366f67e12a7a9d94a7a2835ceca7cd90968de"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291005-K5TG4D"
          task_revision: 22
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608291005-K5TG4D-executor-09639596deab99c5e272bbfd"
        next_revision: 23
        previous_revision: 22
        schema_version: 1
        task_id: "202608291005-K5TG4D"
      plan-refinement:work-order-202608291005-K5TG4D-executor-da3d966bbf09c69b1603ad81:
        aggregate_digest: "sha256:c7f3c7b86e41e27ff8f2dfcb4e5ce37a9573a3f7cef2008230a4eb82486a0b72"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-29T17:23:09.763Z"
          cause_refs: []
          entity: "plan"
          from: "sha256:fca3574e5890b72574edaad0eb3366f67e12a7a9d94a7a2835ceca7cd90968de"
          id: "event_ae746bc38cc8223132399216"
          mutation_id: "plan-refinement:work-order-202608291005-K5TG4D-executor-da3d966bbf09c69b1603ad81"
          plan_digest: "sha256:fca3574e5890b72574edaad0eb3366f67e12a7a9d94a7a2835ceca7cd90968de"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291005-K5TG4D"
          task_revision: 18
          to: "sha256:c8293a0cc6fcfa182c3b1a88888aa345765f4659d8cc827eb0be83f4c6459687"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608291005-K5TG4D-executor-da3d966bbf09c69b1603ad81"
        next_revision: 19
        previous_revision: 18
        schema_version: 1
        task_id: "202608291005-K5TG4D"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "034c1009b73a80a538405abfad43a33e69c9f4a0"
  task_execution_context:
    base_ref: "main"
    base_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    version: 1
id_source: "generated"
---
## Summary

Specify the clean Task kernel and migration oracle

Produce the implementation specification, code ownership map, invariant catalog, compatibility boundary, replay corpus manifest, migration and rollback contract, and acceptance gates for the clean Task core rebuild. The specification must map every legacy AP-AUTH, AP-CORE, AP-RUNTIME, AP-DEPS, and AP-SCOPE item into the replacement milestones without losing traceability.

## Scope

- In scope: Produce the implementation specification, code ownership map, invariant catalog, compatibility boundary, replay corpus manifest, migration and rollback contract, and acceptance gates for the clean Task core rebuild. The specification must map every legacy AP-AUTH, AP-CORE, AP-RUNTIME, AP-DEPS, and AP-SCOPE item into the replacement milestones without losing traceability.
- Out of scope: unrelated refactors not required for "Specify the clean Task kernel and migration oracle".

## Plan

Prepare a decision ADR and implementation specification for a staged clean Task kernel rebuild. Start with a source-backed code map, define a pure canonical kernel, specify compatibility and replay migration, and finish with a complete legacy-task traceability matrix and executable gates.

## Verify Steps

1. Inspect docs/adr/0017-clean-task-core-rebuild.md and docs/reference/clean-task-core-rebuild-spec.mdx. Expected: they define the staged program, source-backed code map, pure kernel boundary, mandatory invariants, adapter contracts, deterministic migration and rollback, replay corpus, dual-run cutover, and milestone gates.
2. Inspect the legacy roadmap traceability table. Expected: every AP-AUTH, AP-APPROVAL, AP-GRANT, AP-DEPS, AP-SCOPE, AP-RUNTIME, AP-CORE, AP-CTX, AP-KA, and old root task has exactly one Absorb or Retain disposition with replacement ownership.
3. Inspect docs/adr/README.md. Expected: ADR 0017 is present in the canonical index and links to the decision record.
4. Run bun run docs:ia:check. Expected: documentation IA, sidebar coverage, and current path references pass.
5. Run bun run format:check. Expected: all matched files use Prettier formatting.
6. Run git diff --check. Expected: no whitespace errors.
7. Compare the delivered documents against Scope and record any residual implementation choices or graph exceptions in Findings. Expected: open edges are explicit and no legacy requirement is silently dropped.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-29T10:29:27.784Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2dcaeea2d8983813ad29a70c2e37f6ce823a3abfc112b006102615ba79bcde6f, input_digest=sha256:a53f9e6ff0146c6042b3e95347aa777d9db00c0b5468ddcc3c74c738662e766e

Details:

Check: docs_contract
Command: bun run docs:ia:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (1/4)

Check: docs_contract
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (2/4)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (3/4)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (4/4)

Check: task_outcome
Command: bun run docs:ia:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (4/4)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291005-K5TG4D-specify-the-clean-task-kernel-and-migration-orac/.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json
- old_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
- current_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291005-K5TG4D

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608291005-K5TG4D
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-29T10:37:44.095Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2dcaeea2d8983813ad29a70c2e37f6ce823a3abfc112b006102615ba79bcde6f, input_digest=sha256:69fb24dff619183c2e2f0edc1fa845f8c57da6a33037ac9a55dfcd2c77a229f4

Details:

Check: docs_contract
Command: bun run docs:ia:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (1/4)

Check: docs_contract
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (2/4)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (3/4)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (4/4)

Check: task_outcome
Command: bun run docs:ia:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (4/4)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291005-K5TG4D-specify-the-clean-task-kernel-and-migration-orac/.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json
- old_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
- current_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291005-K5TG4D

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608291005-K5TG4D
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-29T10:40:04.712Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:be2f267bdef19b7ce29cab2131cb3154cfd9b7c8ca67bc83fdf7de8e85fa4dad, input_digest=sha256:d0d87812171e5058d6f637298ff376f11e67ed89cfbb860ed5f43f073adf7c06

Details:

Check: docs_contract
Command: bun run docs:ia:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (1/4)

Check: docs_contract
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (2/4)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (3/4)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (4/4)

Check: task_outcome
Command: bun run docs:ia:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (4/4)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291005-K5TG4D-specify-the-clean-task-kernel-and-migration-orac/.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json
- old_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
- current_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291005-K5TG4D

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608291005-K5TG4D
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-29T17:19:51.260Z — VERIFY — needs_rework

By: USER

Note: Recover the approved task-centric plan: four required WorkItems remain incomplete despite task-level docs and verification evidence.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:be2f267bdef19b7ce29cab2131cb3154cfd9b7c8ca67bc83fdf7de8e85fa4dad, input_digest=sha256:ca294d3b771cd021781e2fa1d6d45d39ee418bde84975718918e04c8b1af724f

Details:

Complete inventory-and-map, kernel-contract, migration-oracle, and traceability-and-gates through fresh state-bound semantic episodes before pre-merge closure.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291005-K5TG4D-specify-the-clean-task-kernel-and-migration-orac/.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json
- old_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
- current_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291005-K5TG4D

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane finish 202608291005-K5TG4D --author PLANNER --body 'Verified: pre-merge closure packet is ready for the task PR.' --result 'pre-merge closure' --commit 84e3af962e1386afcbf12b32a37f5cd2bd5bfd78 --pre-merge-closure
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-08-29T17:23:03.993Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:be2f267bdef19b7ce29cab2131cb3154cfd9b7c8ca67bc83fdf7de8e85fa4dad, input_digest=sha256:1308ff6a6abb0bf0045d85b04f022df96056f0d63497c003b41a280eb8648342

Details:

Check: docs_contract
Command: bun run docs:ia:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (1/4)

Check: docs_contract
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (2/4)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (3/4)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (4/4)

Check: task_outcome
Command: bun run docs:ia:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (4/4)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291005-K5TG4D-specify-the-clean-task-kernel-and-migration-orac/.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json
- old_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
- current_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291005-K5TG4D

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608291005-K5TG4D
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-29T17:30:23.681Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:be2f267bdef19b7ce29cab2131cb3154cfd9b7c8ca67bc83fdf7de8e85fa4dad, input_digest=sha256:acabc852249143409738ae008be2deffb5b9442e1adaefe4feb26b12d31e8daa

Details:

Check: docs_contract
Command: bun run docs:ia:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (1/4)

Check: docs_contract
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (2/4)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (3/4)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check docs_contract (4/4)

Check: task_outcome
Command: bun run docs:ia:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun run format:check
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291005-K5TG4D/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291005-K5TG4D Verification Contract check task_outcome (4/4)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291005-K5TG4D-specify-the-clean-task-kernel-and-migration-orac/.agentplane/tasks/202608291005-K5TG4D/blueprint/resolved-snapshot.json
- old_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
- current_digest: efb79283a7132ec7f7eb621bee98b430d16fb8b40d605d39c2312d838d63f25c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291005-K5TG4D

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608291005-K5TG4D
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
