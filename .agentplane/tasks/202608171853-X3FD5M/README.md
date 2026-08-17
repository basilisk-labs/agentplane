---
id: "202608171853-X3FD5M"
title: "Harden autonomous authority recovery and Hermes dialog approvals"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
  - "publish"
  - "security"
blueprint_request: "code.branch_pr"
verify:
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-17T18:58:58.778Z"
  updated_by: "USER"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-17T19:56:39.103Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-17T19:57:54.943Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 8 typed finding(s)."
  evaluated_sha: "03b46b67e67b48caa0d1409d9afb18cd29c08f98"
  blueprint_digest: "da565bb5e104231271b6b8452fb59a1e21b3bb6a73d019e01b9ea3b3827565c8"
  evidence_refs:
    - ".agentplane/tasks/202608171853-X3FD5M/quality/20260817-195650566-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608171853-X3FD5M/quality/20260817-195650566-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608171853-X3FD5M/quality/objects/sha256/378bd3dc79aefb1303b015296c66a7a1d0597c19f2b6a9486e28dc0d4f2284b5.md"
    - ".agentplane/tasks/202608171853-X3FD5M/quality/20260817-195650566-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608171853-X3FD5M/quality/20260817-195650566-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608171853-X3FD5M/quality/20260817-195650566-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608171853-X3FD5M/README.md"
    - ".agentplane/tasks/202608171853-X3FD5M/quality/objects/sha256/e85d7eb326984a00e40c8c99e6560b5f701066c97aedbca6427e15836c0c8744.patch"
    - ".agentplane/tasks/202608171853-X3FD5M/quality/objects/sha256/e9e31d2efa649e6f0d266de1b94713942425971a911088ecef5607b037e22d98.json"
    - ".agentplane/tasks/202608171853-X3FD5M/verification/20260817195639103-8dbdf9e6dc29c2aa.json"
    - ".agentplane/tasks/202608171853-X3FD5M/quality/objects/sha256/d23e2ba91c6f8ade44113f76fba3d404cfff656145d05f891c1f8b3d8fd81b37.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The packet contract now carries an exact signed-receipt request and receipt-backed argv for plan and side-effect approval; provider merge remains explicit with argv=null and cannot be converted into a generic side-effect grant."
    - "Receipt validation is bound to issuer trust, Ed25519 signature, task and authority reference, state fingerprint, operation digest, scope digest, TTL, expiry, and single-use evidence digest. Negative tests cover the required forged, untrusted, stale, wrong-scope, expired, excessive-TTL, and replay cases."
    - "GitHub protection lookup distinguishes confirmed unprotected state from provider unavailability and raises canonical E_HANDOFF on unavailable state, preventing accidental local integration."
    - "Supervisor replacement refresh and legacy stale-failure recovery have dedicated regression tests, and bunx declarations are safely normalized to bun x with downstream process-contract coverage."
    - "Published config and workflow schemas are synchronized, and the Hermes recipe defines authenticated dialogue capture, bridge signing, exact argv execution, fresh-packet replay behavior, audit identity, and the policy/all boundary."
    - "Supervisor verification is recorded for implementation 03b46b67e, the full fast suite reports 565 passing files and 4161 passing tests with one expected skip, and an independent focused rerun passed 88 tests across six changed security and recovery surfaces."
    - "Residual risk: End-to-end behavior depends on the follow-on Hermes plugin consuming operator_action.approval_receipt exactly and requesting a fresh packet after every accepted receipt."
    - "Residual risk: Provider merge remains intentionally outside the generic receipt-backed side-effect command and requires a dedicated operator/provider executor implementation."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_security_boundary"
    - "observed_effect_schema"
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
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
      - "source_code"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
    writable_roots: []
  declaration:
    external_effects:
      - "network_read"
      - "publish"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "security_boundary"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations:
      - "repository_effect:documentation"
      - "repository_effect:schema"
      - "repository_effect:tests"
    changed_components:
      - "docs"
      - "packages/agentplane"
      - "packages/core"
      - "packages/spec"
      - "schemas"
    changed_paths:
      - "docs/recipes/hermes-agentplane.mdx"
      - "packages/agentplane/src/commands/pr/branch-publication.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
      - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
      - "packages/agentplane/src/commands/shared/declared-check.test.ts"
      - "packages/agentplane/src/commands/shared/declared-check.ts"
      - "packages/agentplane/src/commands/shared/pr-meta.test.ts"
      - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
      - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.ts"
      - "packages/agentplane/src/commands/task/authority-grant.command.test.ts"
      - "packages/agentplane/src/commands/task/authority-grant.command.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
      - "packages/agentplane/src/commands/task/plan-approve.command.ts"
      - "packages/agentplane/src/commands/task/plan.ts"
      - "packages/agentplane/src/commands/task/user-approval-receipt.test.ts"
      - "packages/agentplane/src/commands/task/user-approval-receipt.ts"
      - "packages/core/schemas/config.schema.json"
      - "packages/core/schemas/workflow.schema.json"
      - "packages/core/src/config/config.test.ts"
      - "packages/core/src/config/schema.impl.ts"
      - "packages/core/src/runner/supervisor-execution-episode.test.ts"
      - "packages/core/src/runner/supervisor-execution-episode.ts"
      - "packages/spec/schemas/config.schema.json"
      - "packages/spec/schemas/workflow.schema.json"
      - "schemas/config.schema.json"
      - "schemas/workflow.schema.json"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
      - "schema"
      - "source_code"
      - "tests"
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
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_security_boundary"
    - "observed_effect_schema"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "security_boundary"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:a154edb26036c6a10471dab336cbfdcacc2845492a89babea795475b023d339f"
      escalation_reasons:
        - "central_path:packages/agentplane/src/commands/shared/declared-check.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/declared-check.ts"
        - "central_path:packages/agentplane/src/commands/shared/pr-meta.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/side-effect-authority.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
        - "central_path:packages/core/schemas/config.schema.json"
        - "central_path:packages/core/schemas/workflow.schema.json"
        - "central_path:packages/core/src/config/config.test.ts"
        - "central_path:packages/core/src/config/schema.impl.ts"
        - "central_path:packages/core/src/runner/supervisor-execution-episode.test.ts"
        - "central_path:packages/core/src/runner/supervisor-execution-episode.ts"
        - "central_path:schemas/config.schema.json"
        - "central_path:schemas/workflow.schema.json"
        - "effect_release_metadata"
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
        changed_components:
          - "docs"
          - "packages/agentplane"
          - "packages/core"
          - "packages/spec"
          - "schemas"
        changed_files:
          - "docs/recipes/hermes-agentplane.mdx"
          - "packages/agentplane/src/commands/pr/branch-publication.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.test.ts"
          - "packages/agentplane/src/commands/pr/integrate/internal/github-protection.ts"
          - "packages/agentplane/src/commands/shared/declared-check.test.ts"
          - "packages/agentplane/src/commands/shared/declared-check.ts"
          - "packages/agentplane/src/commands/shared/pr-meta.test.ts"
          - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
          - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.ts"
          - "packages/agentplane/src/commands/task/authority-grant.command.test.ts"
          - "packages/agentplane/src/commands/task/authority-grant.command.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-episode.ts"
          - "packages/agentplane/src/commands/task/plan-approve.command.ts"
          - "packages/agentplane/src/commands/task/plan.ts"
          - "packages/agentplane/src/commands/task/user-approval-receipt.test.ts"
          - "packages/agentplane/src/commands/task/user-approval-receipt.ts"
          - "packages/core/schemas/config.schema.json"
          - "packages/core/schemas/workflow.schema.json"
          - "packages/core/src/config/config.test.ts"
          - "packages/core/src/config/schema.impl.ts"
          - "packages/core/src/runner/supervisor-execution-episode.test.ts"
          - "packages/core/src/runner/supervisor-execution-episode.ts"
          - "packages/spec/schemas/config.schema.json"
          - "packages/spec/schemas/workflow.schema.json"
          - "schemas/config.schema.json"
          - "schemas/workflow.schema.json"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "schema"
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
        - "docs_contract"
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
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:documentation"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "03b46b67e67b48caa0d1409d9afb18cd29c08f98"
  message: "🚧 X3FD5M task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: d473e56bdfbe. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 590e2564fe9a. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 03b46b67e67b. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-17T18:59:24.930Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-17T19:13:23.539Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: d473e56bdfbe. CLI accepted one state-bound external-agent semantic result."
    commit: "d473e56bdfbe84ce2aa9b58fae0fcef04ea649e7"
  -
    type: "status"
    at: "2026-08-17T19:24:46.382Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 590e2564fe9a. CLI accepted one state-bound external-agent semantic result."
    commit: "590e2564fe9a80830c8e676cd907891c9e31eb03"
  -
    type: "verify"
    at: "2026-08-17T19:25:21.439Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-17T19:55:31.191Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 03b46b67e67b. CLI accepted one state-bound external-agent semantic result."
    commit: "03b46b67e67b48caa0d1409d9afb18cd29c08f98"
  -
    type: "verify"
    at: "2026-08-17T19:56:39.103Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
doc_version: 3
doc_updated_at: "2026-08-17T19:56:41.780Z"
doc_updated_by: "SUPERVISOR"
description: "Recover the AgentPlane authority release after an unavailable GitHub protection lookup selected a local merge; fail closed on unavailable provider protection, repair supervisor replay/concurrency regressions, and define a verifiable Hermes-to-AgentPlane user approval receipt so the user approves in dialogue while the integration layer executes exact state-bound commands. Preserve mandatory primary plan approval and operator-owned provider merge semantics."
sections:
  Summary: |-
    Harden autonomous authority recovery and Hermes dialog approvals

    Recover the AgentPlane authority release after an unavailable GitHub protection lookup selected a local merge; fail closed on unavailable provider protection, repair supervisor replay/concurrency regressions, and define a verifiable Hermes-to-AgentPlane user approval receipt so the user approves in dialogue while the integration layer executes exact state-bound commands. Preserve mandatory primary plan approval and operator-owned provider merge semantics.
  Scope: |-
    - In scope: Recover the AgentPlane authority release after an unavailable GitHub protection lookup selected a local merge; fail closed on unavailable provider protection, repair supervisor replay/concurrency regressions, and define a verifiable Hermes-to-AgentPlane user approval receipt so the user approves in dialogue while the integration layer executes exact state-bound commands. Preserve mandatory primary plan approval and operator-owned provider merge semantics.
    - Out of scope: unrelated refactors not required for "Harden autonomous authority recovery and Hermes dialog approvals".
  Plan: "Plan a fail-closed recovery release that preserves mandatory primary plan approval, lets a user approve protected boundaries in Hermes dialogue without typing terminal commands, and repairs the replay regressions exposed by full-fast verification."
  Verify Steps: |-
    PLANNER fallback scaffold for "Harden autonomous authority recovery and Hermes dialog approvals". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Harden autonomous authority recovery and Hermes dialog approvals". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-17T19:25:21.439Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d3ea9d1b0233fc005c39c29e6fb1eb6ed23070236ccc66392cc78b2f652d61bc, input_digest=sha256:9280e810c8ba98b5427c3b03965b8e3d2c2c4b2527ee2a2b9eb019ce1d3c8503

    Details:

    Check: affected_unit_integration
    Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608171853-X3FD5M Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608171853-X3FD5M Verification Contract check critical_paths

    Check: full_regression
    Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608171853-X3FD5M Verification Contract check full_regression

    Check: hosted_integration
    Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608171853-X3FD5M Verification Contract check hosted_integration

    Check: real_e2e
    Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608171853-X3FD5M Verification Contract check real_e2e

    Check: task_outcome
    Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608171853-X3FD5M Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608171853-X3FD5M-harden-autonomous-authority-recovery-and-hermes/.agentplane/tasks/202608171853-X3FD5M/blueprint/resolved-snapshot.json
    - old_digest: da565bb5e104231271b6b8452fb59a1e21b3bb6a73d019e01b9ea3b3827565c8
    - current_digest: da565bb5e104231271b6b8452fb59a1e21b3bb6a73d019e01b9ea3b3827565c8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608171853-X3FD5M

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608171853-X3FD5M
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-17T19:56:39.103Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d3ea9d1b0233fc005c39c29e6fb1eb6ed23070236ccc66392cc78b2f652d61bc, input_digest=sha256:c3d1e48e96dffea04ac9fc8ec263f8636390b1d779b761ca12aecd89780656c3

    Details:

    Check: affected_unit_integration
    Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608171853-X3FD5M Verification Contract check affected_unit_integration

    Check: critical_paths
    Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608171853-X3FD5M Verification Contract check critical_paths

    Check: docs_contract
    Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608171853-X3FD5M Verification Contract check docs_contract

    Check: full_regression
    Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608171853-X3FD5M Verification Contract check full_regression

    Check: hosted_integration
    Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608171853-X3FD5M Verification Contract check hosted_integration

    Check: real_e2e
    Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608171853-X3FD5M Verification Contract check real_e2e

    Check: task_outcome
    Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
    Scope: branch_pr task 202608171853-X3FD5M Verification Contract check task_outcome

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608171853-X3FD5M-harden-autonomous-authority-recovery-and-hermes/.agentplane/tasks/202608171853-X3FD5M/blueprint/resolved-snapshot.json
    - old_digest: da565bb5e104231271b6b8452fb59a1e21b3bb6a73d019e01b9ea3b3827565c8
    - current_digest: da565bb5e104231271b6b8452fb59a1e21b3bb6a73d019e01b9ea3b3827565c8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608171853-X3FD5M

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608171853-X3FD5M
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
  workflow_route_baseline:
    start_head_sha: "e22f17ffad89f8fe9c3e41abc9c483c2c5fc2c78"
    version: 1
id_source: "generated"
---
## Summary

Harden autonomous authority recovery and Hermes dialog approvals

Recover the AgentPlane authority release after an unavailable GitHub protection lookup selected a local merge; fail closed on unavailable provider protection, repair supervisor replay/concurrency regressions, and define a verifiable Hermes-to-AgentPlane user approval receipt so the user approves in dialogue while the integration layer executes exact state-bound commands. Preserve mandatory primary plan approval and operator-owned provider merge semantics.

## Scope

- In scope: Recover the AgentPlane authority release after an unavailable GitHub protection lookup selected a local merge; fail closed on unavailable provider protection, repair supervisor replay/concurrency regressions, and define a verifiable Hermes-to-AgentPlane user approval receipt so the user approves in dialogue while the integration layer executes exact state-bound commands. Preserve mandatory primary plan approval and operator-owned provider merge semantics.
- Out of scope: unrelated refactors not required for "Harden autonomous authority recovery and Hermes dialog approvals".

## Plan

Plan a fail-closed recovery release that preserves mandatory primary plan approval, lets a user approve protected boundaries in Hermes dialogue without typing terminal commands, and repairs the replay regressions exposed by full-fast verification.

## Verify Steps

PLANNER fallback scaffold for "Harden autonomous authority recovery and Hermes dialog approvals". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Harden autonomous authority recovery and Hermes dialog approvals". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-17T19:25:21.439Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d3ea9d1b0233fc005c39c29e6fb1eb6ed23070236ccc66392cc78b2f652d61bc, input_digest=sha256:9280e810c8ba98b5427c3b03965b8e3d2c2c4b2527ee2a2b9eb019ce1d3c8503

Details:

Check: affected_unit_integration
Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
Scope: branch_pr task 202608171853-X3FD5M Verification Contract check affected_unit_integration

Check: critical_paths
Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
Scope: branch_pr task 202608171853-X3FD5M Verification Contract check critical_paths

Check: full_regression
Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
Scope: branch_pr task 202608171853-X3FD5M Verification Contract check full_regression

Check: hosted_integration
Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
Scope: branch_pr task 202608171853-X3FD5M Verification Contract check hosted_integration

Check: real_e2e
Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
Scope: branch_pr task 202608171853-X3FD5M Verification Contract check real_e2e

Check: task_outcome
Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
Scope: branch_pr task 202608171853-X3FD5M Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608171853-X3FD5M-harden-autonomous-authority-recovery-and-hermes/.agentplane/tasks/202608171853-X3FD5M/blueprint/resolved-snapshot.json
- old_digest: da565bb5e104231271b6b8452fb59a1e21b3bb6a73d019e01b9ea3b3827565c8
- current_digest: da565bb5e104231271b6b8452fb59a1e21b3bb6a73d019e01b9ea3b3827565c8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608171853-X3FD5M

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608171853-X3FD5M
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-17T19:56:39.103Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d3ea9d1b0233fc005c39c29e6fb1eb6ed23070236ccc66392cc78b2f652d61bc, input_digest=sha256:c3d1e48e96dffea04ac9fc8ec263f8636390b1d779b761ca12aecd89780656c3

Details:

Check: affected_unit_integration
Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
Scope: branch_pr task 202608171853-X3FD5M Verification Contract check affected_unit_integration

Check: critical_paths
Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
Scope: branch_pr task 202608171853-X3FD5M Verification Contract check critical_paths

Check: docs_contract
Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
Scope: branch_pr task 202608171853-X3FD5M Verification Contract check docs_contract

Check: full_regression
Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
Scope: branch_pr task 202608171853-X3FD5M Verification Contract check full_regression

Check: hosted_integration
Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
Scope: branch_pr task 202608171853-X3FD5M Verification Contract check hosted_integration

Check: real_e2e
Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
Scope: branch_pr task 202608171853-X3FD5M Verification Contract check real_e2e

Check: task_outcome
Command: bun run typecheck && bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-replay-security.test.ts packages/agentplane/src/runner/usecases/task-run-active-claim-concurrency.test.ts packages/agentplane/src/commands/task/authority-grant.command.test.ts && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608171853-X3FD5M/supervision/declared-checks.json#checks
Scope: branch_pr task 202608171853-X3FD5M Verification Contract check task_outcome

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608171853-X3FD5M-harden-autonomous-authority-recovery-and-hermes/.agentplane/tasks/202608171853-X3FD5M/blueprint/resolved-snapshot.json
- old_digest: da565bb5e104231271b6b8452fb59a1e21b3bb6a73d019e01b9ea3b3827565c8
- current_digest: da565bb5e104231271b6b8452fb59a1e21b3bb6a73d019e01b9ea3b3827565c8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608171853-X3FD5M

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608171853-X3FD5M
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
