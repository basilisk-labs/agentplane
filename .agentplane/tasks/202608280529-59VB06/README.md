---
id: "202608280529-59VB06"
title: "Recover stale evaluator exchanges without accepting obsolete verdicts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 15
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
  updated_at: "2026-08-28T05:32:56.989Z"
  updated_by: "USER"
  note: "Operator action under the user authorization: all subsequent in-scope operations through release. Approve the bounded six-file stale evaluator recovery plan sha256:58812b3db6ab06361dbe577ea62bea6e3cfba5a562fcd105b79f6deaf2265059 as a proved required integration-path repair. Preserve exact freshness, immutable old results, all mandatory checks and release/Core order. No publication or architecture scope expansion."
verification:
  state: "ok"
  updated_at: "2026-08-28T15:36:21.983Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-28T15:40:19.801Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 6 typed finding(s)."
  evaluated_sha: "75c6a199cc4068e497fb786e831a9b2bb34a7376"
  blueprint_digest: "c6da13dce7ff585cef2ca9db077cf272e1120eb0b815bd1bec84512759061291"
  evidence_refs:
    - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/34b3e8375de5f18107ece3aea5f4b2af0c9ec6eec6bd7198fb9b886c82d91398.md"
    - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608280529-59VB06/quality/20260828-153633672-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608280529-59VB06/README.md"
    - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/85ab8a4388809a43346334532eaf5fea9f05ec0af3e6b17cced11cc3e28859fb.patch"
    - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/dffe78fab5abb3d7f0acea1c9b14f4cbfd56d68d836f90da49341774b928b834.json"
    - ".agentplane/tasks/202608280529-59VB06/verification/20260828153621983-c6c6865d6eab595e.json"
    - ".agentplane/tasks/202608280529-59VB06/quality/objects/sha256/24745007b98bd3eb7178a157f3cff4cd03ec4dd7de00613fbd465e1c9d85fc99.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Reviewed the complete four-file patch 85ab8a4388809a43346334532eaf5fea9f05ec0af3e6b17cced11cc3e28859fb and recovery/application call sites. Source at HEAD 909f892f213b7ca908fc14d16745b928f5cf1d7a is unchanged from evaluated implementation 75c6a199cc4068e497fb786e831a9b2bb34a7376. All changes remain within the approved six-file scope."
    - "Retirement requires an unapplied issued/result_received EVALUATOR quality_review exchange with changed exact fingerprint. The recovery revalidates the latest original intent and work-order digest under the existing supervisor lease, retires the exchange before the journal CAS, and preserves original result and evidence bytes. Already applied review uses existing idempotent closeout. No obsolete verdict is accepted or copied."
    - "Inspected real-Git cases for stale missing/returned results, tampered work order, competing owner, interruption after exchange retirement, interruption after review application, replacement and replay, and late retired-result rejection. Existing ordinary acceptance and concurrent-commit stale rejection paths remain unchanged. The implementation does not create preparation-artifact freshness equivalence or bypass incomplete WorkItem gates."
    - "Current Findings now contains the causal proof, red/green record, original implementation identity and remaining hosted boundaries. The required recover-stale-evaluator WorkItem remains COMPLETED with its preserved output manifest. This addresses the sole prior documentation defect without overwriting the earlier review."
    - "All nine frozen evidence hashes match. Verification record 20260828153621983-c6c6865d6eab595e.json is ok for implementation 75c6a199cc4068e497fb786e831a9b2bb34a7376 and unchanged Verify Steps e62b830b865b103d9e9ebc3046c670836db81e2157e23ae89899300c97bde172. The referenced preserved declared-checks records ci:local:full exit 0 in 526823ms and git diff --check exit 0. Only four framework-prepared quality artifacts are untracked."
    - "Residual risk: Exact published-head GitHub checks, protected integration, hosted close and final cleanup are still required. This review does not prove DVS5NN recovery or qualify release 0.7.8."
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
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A proved required integration path is blocked by an unrecoverable read-only exchange, not by a missing user approval."
      - "Use one task worktree and existing supervisor state transitions; do not widen policy, release or external authority."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
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
      digest: "sha256:8d9482d5e2305722d2b9bfcaa91278ed2b7c4e04becb7c4f00cdc1632c01d82a"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
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
  hash: "75c6a199cc4068e497fb786e831a9b2bb34a7376"
  message: "🚧 59VB06 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 75c6a199cc40. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. Documentation-only review requires a supported operator task-document update. The executor code scope excludes protected task documentation; source code and all evidence are preserved. Recommended action: Under the user's explicit authorization for all in-scope operations through release, use ap task doc set 202608280529-59VB06 --section Findings with the existing cause, red/green evidence, implementation 75c6a199cc4068e497fb786e831a9b2bb34a7376, recorded full verification 20260828060650926-cb1fbd290a69ab04.json and pending hosted boundaries. Recompute the route. Preserve every source file and the existing evaluator verdict; do not hand-edit task files or create a new implementation scope. Agentplane receipt: external-agent-blocker/tr_233c458501205f8fcf291a79f52d7455/sha256:066cdd34d5c491956c6906b37d9f55a8467621594bea82b91deb0c02dda56d46."
  -
    author: "ORCHESTRATOR"
    body: "Start: operator resolved the documentation-only blocker under the user authorization for all in-scope operations through release. Findings was populated through task doc set from existing evidence. Preserve source 75c6a199cc4068e497fb786e831a9b2bb34a7376, the recorded evaluator result and all checks; resume through a fresh semantic packet."
events:
  -
    type: "status"
    at: "2026-08-28T05:33:24.408Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-28T05:58:03.308Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 75c6a199cc40. CLI accepted one state-bound external-agent semantic result."
    commit: "75c6a199cc4068e497fb786e831a9b2bb34a7376"
  -
    type: "verify"
    at: "2026-08-28T06:06:50.926Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-28T06:09:02.271Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. Documentation-only review requires a supported operator task-document update. The executor code scope excludes protected task documentation; source code and all evidence are preserved. Recommended action: Under the user's explicit authorization for all in-scope operations through release, use ap task doc set 202608280529-59VB06 --section Findings with the existing cause, red/green evidence, implementation 75c6a199cc4068e497fb786e831a9b2bb34a7376, recorded full verification 20260828060650926-cb1fbd290a69ab04.json and pending hosted boundaries. Recompute the route. Preserve every source file and the existing evaluator verdict; do not hand-edit task files or create a new implementation scope. Agentplane receipt: external-agent-blocker/tr_233c458501205f8fcf291a79f52d7455/sha256:066cdd34d5c491956c6906b37d9f55a8467621594bea82b91deb0c02dda56d46."
  -
    type: "status"
    at: "2026-08-28T06:09:51.875Z"
    author: "ORCHESTRATOR"
    from: "BLOCKED"
    to: "DOING"
    note: "Start: operator resolved the documentation-only blocker under the user authorization for all in-scope operations through release. Findings was populated through task doc set from existing evidence. Preserve source 75c6a199cc4068e497fb786e831a9b2bb34a7376, the recorded evaluator result and all checks; resume through a fresh semantic packet."
  -
    type: "verify"
    at: "2026-08-28T15:36:21.983Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-28T15:36:23.872Z"
doc_updated_by: "ORCHESTRATOR"
description: "On integrated main 844eff36ba407436c26a3c63346b0dcc384ce2b5, continuation of DVS5NN PR #5862 is blocked by an issued quality_review exchange whose result is stale. The read-only evaluator prepared four task-owned evidence files while the legacy task was DONE, then exact result acceptance rejected the changed route fingerprint. Repeating task advance or task advance --replacement re-enters recoverPendingExternalAgentResult and rejects the same old result before replacement handling. The original result, frozen evidence and journal must remain intact. Reproduce the full sequence with real Git: evaluator issuance, preparation-owned artifacts, a genuine state change, stale result rejection, fresh packet recovery, retry and next transition. Separate framework-owned preparation changes from genuine task, plan, HEAD, provider or authority changes; do not weaken exact freshness or accept old verdicts for changed inputs. Use existing supervisor journal retirement and replacement mechanisms, with one owner and compare-and-swap guards. Preserve immutable historical results and required WorkItem completion. Prove ordinary evaluator acceptance, no-result and returned-result interruption recovery, repeated continuation, changed evidence rejection and no false DONE. Fix only the demonstrated bounded evaluator exchange/recovery cause. Do not modify task state or journals manually, create a new state store, bypass checks, change required CI, copy verdicts, or broaden release/Core architecture. DVS5NN and CFKR4P integration retain priority; CFKR4P full verification is running and must not be interrupted. This is a necessary authorized integration-path blocker, not new release scope. Release publication remains separately qualified. User has authorized all in-scope operations through release."
sections:
  Summary: |-
    Recover stale evaluator exchanges without accepting obsolete verdicts

    On integrated main 844eff36ba407436c26a3c63346b0dcc384ce2b5, continuation of DVS5NN PR #5862 is blocked by an issued quality_review exchange whose result is stale. The read-only evaluator prepared four task-owned evidence files while the legacy task was DONE, then exact result acceptance rejected the changed route fingerprint. Repeating task advance or task advance --replacement re-enters recoverPendingExternalAgentResult and rejects the same old result before replacement handling. The original result, frozen evidence and journal must remain intact. Reproduce the full sequence with real Git: evaluator issuance, preparation-owned artifacts, a genuine state change, stale result rejection, fresh packet recovery, retry and next transition. Separate framework-owned preparation changes from genuine task, plan, HEAD, provider or authority changes; do not weaken exact freshness or accept old verdicts for changed inputs. Use existing supervisor journal retirement and replacement mechanisms, with one owner and compare-and-swap guards. Preserve immutable historical results and required WorkItem completion. Prove ordinary evaluator acceptance, no-result and returned-result interruption recovery, repeated continuation, changed evidence rejection and no false DONE. Fix only the demonstrated bounded evaluator exchange/recovery cause. Do not modify task state or journals manually, create a new state store, bypass checks, change required CI, copy verdicts, or broaden release/Core architecture. DVS5NN and CFKR4P integration retain priority; CFKR4P full verification is running and must not be interrupted. This is a necessary authorized integration-path blocker, not new release scope. Release publication remains separately qualified. User has authorized all in-scope operations through release.
  Scope: |-
    - In scope: On integrated main 844eff36ba407436c26a3c63346b0dcc384ce2b5, continuation of DVS5NN PR #5862 is blocked by an issued quality_review exchange whose result is stale. The read-only evaluator prepared four task-owned evidence files while the legacy task was DONE, then exact result acceptance rejected the changed route fingerprint. Repeating task advance or task advance --replacement re-enters recoverPendingExternalAgentResult and rejects the same old result before replacement handling. The original result, frozen evidence and journal must remain intact. Reproduce the full sequence with real Git: evaluator issuance, preparation-owned artifacts, a genuine state change, stale result rejection, fresh packet recovery, retry and next transition. Separate framework-owned preparation changes from genuine task, plan, HEAD, provider or authority changes; do not weaken exact freshness or accept old verdicts for changed inputs. Use existing supervisor journal retirement and replacement mechanisms, with one owner and compare-and-swap guards. Preserve immutable historical results and required WorkItem completion. Prove ordinary evaluator acceptance, no-result and returned-result interruption recovery, repeated continuation, changed evidence rejection and no false DONE. Fix only the demonstrated bounded evaluator exchange/recovery cause. Do not modify task state or journals manually, create a new state store, bypass checks, change required CI, copy verdicts, or broaden release/Core architecture. DVS5NN and CFKR4P integration retain priority; CFKR4P full verification is running and must not be interrupted. This is a necessary authorized integration-path blocker, not new release scope. Release publication remains separately qualified. User has authorized all in-scope operations through release.
    - Out of scope: unrelated refactors not required for "Recover stale evaluator exchanges without accepting obsolete verdicts".
  Plan: "One bounded WorkItem repairs the stale evaluator exchange recovery loop. Prove the whole issue-return-reject-retire-replace-retry sequence using the existing journal; preserve exact freshness, original results and no-false-DONE guards."
  Verify Steps: |-
    1. Reproduce stale quality_review continuation on the recorded base with real Git. Expected: an old evaluator result is rejected after changed input, and the current bug repeats the rejection before replacement can run.
    2. Run the scoped evaluator and external-agent recovery tests. Expected: fresh acceptance, preparation-owned artifact classification, genuine state drift, no-result and returned-result interruption, replacement, repeated continuation and next transition are covered. Historical result/evidence bytes remain unchanged, only one supervisor owns the task, and changed task/plan/HEAD/evidence/provider/authority cannot inherit an old verdict.
    3. Run `bun run ci:local:full`. Expected: all mandatory local checks pass without weaker assertions, skips, timeouts, policy or CI changes. Also run `git diff --check`; expected: no whitespace errors.
    4. Review the complete diff against the approved six-file scope and the required WorkItem contract. Expected: no new state store, manual lifecycle edits, simulated USER decisions, copied verdicts or false DONE. Return a scoped blocker before editing outside that bound.
    5. Preserve the proved cause, red/green evidence and remaining hosted integration boundaries in the semantic result and task Findings through supported routes. Exact-head GitHub checks, protected integration and terminal closure are required before delivery. Local checks do not qualify release 0.7.8.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-28T06:06:50.926Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:e62b830b865b103d9e9ebc3046c670836db81e2157e23ae89899300c97bde172, input_digest=sha256:cbb277b1a0d54fbc6aa813390e84740a69249c762b03506d4b78890a9f86259a

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280529-59VB06 Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280529-59VB06 Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280529-59VB06 Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280529-59VB06 Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280529-59VB06 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280529-59VB06 Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280529-59VB06 Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608280529-59VB06-recover-stale-evaluator-exchanges-without-accept/.agentplane/tasks/202608280529-59VB06/blueprint/resolved-snapshot.json
    - old_digest: c6da13dce7ff585cef2ca9db077cf272e1120eb0b815bd1bec84512759061291
    - current_digest: c6da13dce7ff585cef2ca9db077cf272e1120eb0b815bd1bec84512759061291
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608280529-59VB06

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-28T15:36:21.983Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:e62b830b865b103d9e9ebc3046c670836db81e2157e23ae89899300c97bde172, input_digest=sha256:cbb277b1a0d54fbc6aa813390e84740a69249c762b03506d4b78890a9f86259a

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280529-59VB06 Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280529-59VB06 Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280529-59VB06 Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280529-59VB06 Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280529-59VB06 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608280529-59VB06 Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608280529-59VB06 Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608280529-59VB06-recover-stale-evaluator-exchanges-without-accept/.agentplane/tasks/202608280529-59VB06/blueprint/resolved-snapshot.json
    - old_digest: c6da13dce7ff585cef2ca9db077cf272e1120eb0b815bd1bec84512759061291
    - current_digest: c6da13dce7ff585cef2ca9db077cf272e1120eb0b815bd1bec84512759061291
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608280529-59VB06

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Cause: pending quality_review recovery attempted old result acceptance before replacement handling. The previous planning/implementation retirement paths did not cover stale evaluator exchanges. Two real-Git regression cases failed on base 844eff36ba407436c26a3c63346b0dcc384ce2b5 before the fix and passed afterward.

    Implementation: 75c6a199cc4068e497fb786e831a9b2bb34a7376 changes four approved source/test files. Recovery retains exact freshness and original work-order/intent digest checks, the existing lease and journal CAS. It preserves historical result and evidence bytes, retires only unapplied stale issued/result_received reviews, and uses existing replacement. Exchange-first retirement permits interrupted journal reconciliation. An already applied review resumes closeout without reapplication. No new state store, manual lifecycle edits, weaker checks or copied verdicts were introduced.

    Local evidence: four focused files passed 46 tests in 61.40s. Cases cover missing and returned results, genuine drift, tampered work orders, competing lease ownership, interruption after exchange retirement and after review application, replacement/replay and late old-result rejection. Existing ordinary acceptance and implementation recovery cases remain passing. Scoped lint/type/format, hotspots and git diff --check passed. Recorded full verification 20260828060650926-cb1fbd290a69ab04.json is ok for implementation 75c6a199cc4068e497fb786e831a9b2bb34a7376; ci:local:full exited 0 in 526823ms. All nine frozen evaluator evidence hashes matched.

    Review: the first EVALUATOR requested this documentation-only update. No runtime defect was identified and no source change is required for that finding. This update is an operator action under the user authorization for all in-scope operations through release; it does not overwrite the recorded evaluator result.

    Remaining boundaries: obtain fresh evaluation after documentation recovery, pass exact-head hosted checks, integrate through the protected queue, confirm hosted closure, and then retry DVS5NN through a fresh main-runtime route. Local evidence does not prove delivery of DVS5NN and does not qualify release 0.7.8. Preserve the release/Core order and remeasure remaining release failures on the final integrated main.
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
    digest: "sha256:9c249fe1055d19ebaa26037464f67c0504a86bce5dff482189865096c20b6fcb"
    grant_id: "00260e01-b0d4-4eb7-82ca-649c3b4ea858"
    issued_at: "2026-08-28T05:32:56.989Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:d206802bb86364ceaafc975a26ffc707fba334051ec8b89d684e6e280e7b8f87"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608280529-59VB06"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-28T05:32:56.989Z"
        approved_by: "USER"
        approved_digest: "sha256:58812b3db6ab06361dbe577ea62bea6e3cfba5a562fcd105b79f6deaf2265059"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-28T05:31:39.956Z"
      digest: "sha256:58812b3db6ab06361dbe577ea62bea6e3cfba5a562fcd105b79f6deaf2265059"
      proposal:
        assumptions:
          - "Use existing retired exchange and supervisor replacement contracts; do not introduce another journal or new authority primitive."
          - "The source repair fits the declared exchange/recovery files. If a route schema or artifact format must change, return a bounded scope request before editing."
          - "A required blocked PR integration path justifies this release-path repair; all independent Core work stays behind release."
        planning_baseline:
          captured_at: "2026-08-28T05:30:00.259Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:3598e8743db3337ee436995c3b83e0a75bc0207f755ce94e957180a61c79107d"
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
            - ".agentplane/tasks/202608280529-59VB06/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "844eff36ba407436c26a3c63346b0dcc384ce2b5"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608280529-59VB06"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              id: "mandatory-checks"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "mandatory-checks"
              description: "Reproduce the issued quality-review stale-result loop with real Git, including CLI-owned preparation artifacts and a genuinely changed task input. Preserve the original result and prepared evidence."
              id: "reproduce"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "A stale unapplied evaluator result is never accepted for changed input. The existing supervisor retires its intent safely and offers a fresh bounded packet; both no-result and returned-result interruption and repeated continuation preserve historical evidence and one owner."
              id: "recover"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "Ordinary fresh evaluator acceptance still works. Changed task, plan, HEAD, evidence, provider and authority remain guarded. Preparation-owned changes are classified explicitly, not treated as blanket freshness equivalence. Canonical incomplete WorkItems cannot become DONE."
              id: "guards"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "Run the focused evaluator/recovery and real-Git suites, unchanged full bun run ci:local:full, lint/type/format and git diff --check. Record the causal proof and remaining integration boundaries through semantic evidence. Exact-head hosted checks and closure remain required."
              id: "verify"
              required: true
          evidence_fingerprint: "sha256:3598e8743db3337ee436995c3b83e0a75bc0207f755ce94e957180a61c79107d"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Reproduce the issued quality-review stale-result loop with real Git, including CLI-owned preparation artifacts and a genuinely changed task input. Preserve the original result and prepared evidence."
                  id: "reproduce"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "A stale unapplied evaluator result is never accepted for changed input. The existing supervisor retires its intent safely and offers a fresh bounded packet; both no-result and returned-result interruption and repeated continuation preserve historical evidence and one owner."
                  id: "recover"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Ordinary fresh evaluator acceptance still works. Changed task, plan, HEAD, evidence, provider and authority remain guarded. Preparation-owned changes are classified explicitly, not treated as blanket freshness equivalence. Canonical incomplete WorkItems cannot become DONE."
                  id: "guards"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Run the focused evaluator/recovery and real-Git suites, unchanged full bun run ci:local:full, lint/type/format and git diff --check. Record the causal proof and remaining integration boundaries through semantic evidence. Exact-head hosted checks and closure remain required."
                  id: "verify"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
                  - "packages/agentplane/src/commands/task/advance.command.ts"
                  - "packages/agentplane/src/commands/task/finish-shared.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                  - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                symbol_hints:
                  - "recoverPendingExternalAgentResult"
                  - "assertReadOnlyReturnFresh"
                  - "retireSupervisorExecutionEpisodeIntentAfterStateDrift"
              depends_on: []
              expected_outputs:
                - "evaluator-recovery-proof"
              id: "recover-stale-evaluator"
              objective: "Reproduce and repair stale evaluator exchange continuation with existing journal retirement, preserved immutable evidence and exact freshness. Validate ordinary acceptance, preparation drift, genuine drift, interruption, replay and next transition."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "."
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-supervisor.ts"
                - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.ts"
                - "packages/agentplane/src/commands/task/external-agent-evaluator-recovery.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.evaluator-recovery.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "mandatory-checks"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Reproduce the issued quality-review stale-result loop with real Git, including CLI-owned preparation artifacts and a genuinely changed task input. Preserve the original result and prepared evidence."
                    id: "reproduce"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "A stale unapplied evaluator result is never accepted for changed input. The existing supervisor retires its intent safely and offers a fresh bounded packet; both no-result and returned-result interruption and repeated continuation preserve historical evidence and one owner."
                    id: "recover"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Ordinary fresh evaluator acceptance still works. Changed task, plan, HEAD, evidence, provider and authority remain guarded. Preparation-owned changes are classified explicitly, not treated as blanket freshness equivalence. Canonical incomplete WorkItems cannot become DONE."
                    id: "guards"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Run the focused evaluator/recovery and real-Git suites, unchanged full bun run ci:local:full, lint/type/format and git diff --check. Record the causal proof and remaining integration boundaries through semantic evidence. Exact-head hosted checks and closure remain required."
                    id: "verify"
                    required: true
                evidence_fingerprint: "sha256:3598e8743db3337ee436995c3b83e0a75bc0207f755ce94e957180a61c79107d"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608280529-59VB06"
    event_cursor: 0
    final_validation: null
    id: "202608280529-59VB06"
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
      captured_at: "2026-08-28T05:29:44.317Z"
      constraints: []
      request: |-
        Recover stale evaluator exchanges without accepting obsolete verdicts

        On integrated main 844eff36ba407436c26a3c63346b0dcc384ce2b5, continuation of DVS5NN PR #5862 is blocked by an issued quality_review exchange whose result is stale. The read-only evaluator prepared four task-owned evidence files while the legacy task was DONE, then exact result acceptance rejected the changed route fingerprint. Repeating task advance or task advance --replacement re-enters recoverPendingExternalAgentResult and rejects the same old result before replacement handling. The original result, frozen evidence and journal must remain intact. Reproduce the full sequence with real Git: evaluator issuance, preparation-owned artifacts, a genuine state change, stale result rejection, fresh packet recovery, retry and next transition. Separate framework-owned preparation changes from genuine task, plan, HEAD, provider or authority changes; do not weaken exact freshness or accept old verdicts for changed inputs. Use existing supervisor journal retirement and replacement mechanisms, with one owner and compare-and-swap guards. Preserve immutable historical results and required WorkItem completion. Prove ordinary evaluator acceptance, no-result and returned-result interruption recovery, repeated continuation, changed evidence rejection and no false DONE. Fix only the demonstrated bounded evaluator exchange/recovery cause. Do not modify task state or journals manually, create a new state store, bypass checks, change required CI, copy verdicts, or broaden release/Core architecture. DVS5NN and CFKR4P integration retain priority; CFKR4P full verification is running and must not be interrupted. This is a necessary authorized integration-path blocker, not new release scope. Release publication remains separately qualified. User has authorized all in-scope operations through release.
      task_id: "202608280529-59VB06"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 9
    schema_version: 1
    updated_at: "2026-08-28T06:06:54.526Z"
    work_items:
      recover-stale-evaluator:
        attempt: 1
        claim_id: null
        id: "recover-stale-evaluator"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:ad2ee89419275a1ff6b650eddeed47bae50226dcd32cf4909e1d01c895be3f9c"
            id: "evaluator-recovery-proof"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608280529-59VB06"
              work_item_id: "recover-stale-evaluator"
            provenance:
              - "sha256:ab3266fa596554f10760290fc63d30cf56cb2506667ff5a222491a5fa3ecba72"
              - ".agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:41a37d574f40a6e9c8a60a1bcba8e9561a81f614bd81e2b9544e8c40c5d16fd1"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json"
              check_id: "mandatory-checks"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-08-28T06:06:54.522Z"
              repository_snapshot_digest: "sha256:41a37d574f40a6e9c8a60a1bcba8e9561a81f614bd81e2b9544e8c40c5d16fd1"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608280529-59VB06-executor-0fe686768035cb44c907a97d:
        aggregate_digest: "sha256:9a18a9537846ef43aaec77ba08bf20eedcebb5fd1cfe6339728c46741dcba505"
        event:
          actor_id: "agentplane"
          at: "2026-08-28T06:06:54.526Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_54e85dbb991fb6b27795d295"
          mutation_id: "external-result:work-order-202608280529-59VB06-executor-0fe686768035cb44c907a97d"
          plan_digest: "sha256:58812b3db6ab06361dbe577ea62bea6e3cfba5a562fcd105b79f6deaf2265059"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608280529-59VB06"
          task_revision: 8
          to: "COMPLETED"
          work_item_id: "recover-stale-evaluator"
        mutation_id: "external-result:work-order-202608280529-59VB06-executor-0fe686768035cb44c907a97d"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202608280529-59VB06"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "75c6a199cc4068e497fb786e831a9b2bb34a7376"
  task_execution_context:
    base_ref: "main"
    base_sha: "844eff36ba407436c26a3c63346b0dcc384ce2b5"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "844eff36ba407436c26a3c63346b0dcc384ce2b5"
    version: 1
id_source: "generated"
---
## Summary

Recover stale evaluator exchanges without accepting obsolete verdicts

On integrated main 844eff36ba407436c26a3c63346b0dcc384ce2b5, continuation of DVS5NN PR #5862 is blocked by an issued quality_review exchange whose result is stale. The read-only evaluator prepared four task-owned evidence files while the legacy task was DONE, then exact result acceptance rejected the changed route fingerprint. Repeating task advance or task advance --replacement re-enters recoverPendingExternalAgentResult and rejects the same old result before replacement handling. The original result, frozen evidence and journal must remain intact. Reproduce the full sequence with real Git: evaluator issuance, preparation-owned artifacts, a genuine state change, stale result rejection, fresh packet recovery, retry and next transition. Separate framework-owned preparation changes from genuine task, plan, HEAD, provider or authority changes; do not weaken exact freshness or accept old verdicts for changed inputs. Use existing supervisor journal retirement and replacement mechanisms, with one owner and compare-and-swap guards. Preserve immutable historical results and required WorkItem completion. Prove ordinary evaluator acceptance, no-result and returned-result interruption recovery, repeated continuation, changed evidence rejection and no false DONE. Fix only the demonstrated bounded evaluator exchange/recovery cause. Do not modify task state or journals manually, create a new state store, bypass checks, change required CI, copy verdicts, or broaden release/Core architecture. DVS5NN and CFKR4P integration retain priority; CFKR4P full verification is running and must not be interrupted. This is a necessary authorized integration-path blocker, not new release scope. Release publication remains separately qualified. User has authorized all in-scope operations through release.

## Scope

- In scope: On integrated main 844eff36ba407436c26a3c63346b0dcc384ce2b5, continuation of DVS5NN PR #5862 is blocked by an issued quality_review exchange whose result is stale. The read-only evaluator prepared four task-owned evidence files while the legacy task was DONE, then exact result acceptance rejected the changed route fingerprint. Repeating task advance or task advance --replacement re-enters recoverPendingExternalAgentResult and rejects the same old result before replacement handling. The original result, frozen evidence and journal must remain intact. Reproduce the full sequence with real Git: evaluator issuance, preparation-owned artifacts, a genuine state change, stale result rejection, fresh packet recovery, retry and next transition. Separate framework-owned preparation changes from genuine task, plan, HEAD, provider or authority changes; do not weaken exact freshness or accept old verdicts for changed inputs. Use existing supervisor journal retirement and replacement mechanisms, with one owner and compare-and-swap guards. Preserve immutable historical results and required WorkItem completion. Prove ordinary evaluator acceptance, no-result and returned-result interruption recovery, repeated continuation, changed evidence rejection and no false DONE. Fix only the demonstrated bounded evaluator exchange/recovery cause. Do not modify task state or journals manually, create a new state store, bypass checks, change required CI, copy verdicts, or broaden release/Core architecture. DVS5NN and CFKR4P integration retain priority; CFKR4P full verification is running and must not be interrupted. This is a necessary authorized integration-path blocker, not new release scope. Release publication remains separately qualified. User has authorized all in-scope operations through release.
- Out of scope: unrelated refactors not required for "Recover stale evaluator exchanges without accepting obsolete verdicts".

## Plan

One bounded WorkItem repairs the stale evaluator exchange recovery loop. Prove the whole issue-return-reject-retire-replace-retry sequence using the existing journal; preserve exact freshness, original results and no-false-DONE guards.

## Verify Steps

1. Reproduce stale quality_review continuation on the recorded base with real Git. Expected: an old evaluator result is rejected after changed input, and the current bug repeats the rejection before replacement can run.
2. Run the scoped evaluator and external-agent recovery tests. Expected: fresh acceptance, preparation-owned artifact classification, genuine state drift, no-result and returned-result interruption, replacement, repeated continuation and next transition are covered. Historical result/evidence bytes remain unchanged, only one supervisor owns the task, and changed task/plan/HEAD/evidence/provider/authority cannot inherit an old verdict.
3. Run `bun run ci:local:full`. Expected: all mandatory local checks pass without weaker assertions, skips, timeouts, policy or CI changes. Also run `git diff --check`; expected: no whitespace errors.
4. Review the complete diff against the approved six-file scope and the required WorkItem contract. Expected: no new state store, manual lifecycle edits, simulated USER decisions, copied verdicts or false DONE. Return a scoped blocker before editing outside that bound.
5. Preserve the proved cause, red/green evidence and remaining hosted integration boundaries in the semantic result and task Findings through supported routes. Exact-head GitHub checks, protected integration and terminal closure are required before delivery. Local checks do not qualify release 0.7.8.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-28T06:06:50.926Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:e62b830b865b103d9e9ebc3046c670836db81e2157e23ae89899300c97bde172, input_digest=sha256:cbb277b1a0d54fbc6aa813390e84740a69249c762b03506d4b78890a9f86259a

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280529-59VB06 Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280529-59VB06 Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280529-59VB06 Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280529-59VB06 Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280529-59VB06 Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280529-59VB06 Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280529-59VB06 Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608280529-59VB06-recover-stale-evaluator-exchanges-without-accept/.agentplane/tasks/202608280529-59VB06/blueprint/resolved-snapshot.json
- old_digest: c6da13dce7ff585cef2ca9db077cf272e1120eb0b815bd1bec84512759061291
- current_digest: c6da13dce7ff585cef2ca9db077cf272e1120eb0b815bd1bec84512759061291
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608280529-59VB06

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-28T15:36:21.983Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:e62b830b865b103d9e9ebc3046c670836db81e2157e23ae89899300c97bde172, input_digest=sha256:cbb277b1a0d54fbc6aa813390e84740a69249c762b03506d4b78890a9f86259a

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280529-59VB06 Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280529-59VB06 Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280529-59VB06 Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280529-59VB06 Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280529-59VB06 Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608280529-59VB06 Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608280529-59VB06/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608280529-59VB06 Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608280529-59VB06-recover-stale-evaluator-exchanges-without-accept/.agentplane/tasks/202608280529-59VB06/blueprint/resolved-snapshot.json
- old_digest: c6da13dce7ff585cef2ca9db077cf272e1120eb0b815bd1bec84512759061291
- current_digest: c6da13dce7ff585cef2ca9db077cf272e1120eb0b815bd1bec84512759061291
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608280529-59VB06

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
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

Cause: pending quality_review recovery attempted old result acceptance before replacement handling. The previous planning/implementation retirement paths did not cover stale evaluator exchanges. Two real-Git regression cases failed on base 844eff36ba407436c26a3c63346b0dcc384ce2b5 before the fix and passed afterward.

Implementation: 75c6a199cc4068e497fb786e831a9b2bb34a7376 changes four approved source/test files. Recovery retains exact freshness and original work-order/intent digest checks, the existing lease and journal CAS. It preserves historical result and evidence bytes, retires only unapplied stale issued/result_received reviews, and uses existing replacement. Exchange-first retirement permits interrupted journal reconciliation. An already applied review resumes closeout without reapplication. No new state store, manual lifecycle edits, weaker checks or copied verdicts were introduced.

Local evidence: four focused files passed 46 tests in 61.40s. Cases cover missing and returned results, genuine drift, tampered work orders, competing lease ownership, interruption after exchange retirement and after review application, replacement/replay and late old-result rejection. Existing ordinary acceptance and implementation recovery cases remain passing. Scoped lint/type/format, hotspots and git diff --check passed. Recorded full verification 20260828060650926-cb1fbd290a69ab04.json is ok for implementation 75c6a199cc4068e497fb786e831a9b2bb34a7376; ci:local:full exited 0 in 526823ms. All nine frozen evaluator evidence hashes matched.

Review: the first EVALUATOR requested this documentation-only update. No runtime defect was identified and no source change is required for that finding. This update is an operator action under the user authorization for all in-scope operations through release; it does not overwrite the recorded evaluator result.

Remaining boundaries: obtain fresh evaluation after documentation recovery, pass exact-head hosted checks, integrate through the protected queue, confirm hosted closure, and then retry DVS5NN through a fresh main-runtime route. Local evidence does not prove delivery of DVS5NN and does not qualify release 0.7.8. Preserve the release/Core order and remeasure remaining release failures on the final integrated main.
