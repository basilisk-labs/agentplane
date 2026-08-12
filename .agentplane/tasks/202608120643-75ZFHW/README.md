---
id: "202608120643-75ZFHW"
title: "Prevent worktree accumulation and clean obsolete task checkouts"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 17
origin:
  system: "manual"
depends_on:
  - "202608112232-3NC7Y4"
tags:
  - "cleanup"
  - "lifecycle"
  - "ux"
  - "worktree"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
  - "merge"
  - "network"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-12T06:44:53.943Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the previously agreed worktree/branch lifecycle step before final verification optimization."
verification:
  state: "ok"
  updated_at: "2026-08-12T08:16:03.575Z"
  updated_by: "TESTER"
  note: "Review fixes verified at 6db914eee."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-12T08:16:18.434Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 2 typed finding(s)."
  evaluated_sha: "6db914eeea2d767a7422368d3c3491e9f35a90bb"
  blueprint_digest: "576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5"
  evidence_refs:
    - ".agentplane/tasks/202608120643-75ZFHW/quality/20260812-081618124-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608120643-75ZFHW/quality/20260812-081618124-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608120643-75ZFHW/quality/objects/sha256/ebf9a9ac3e6eed9ec4da9575bcb19a09dd1e09732395747c20482d1e7c21a248.md"
    - ".agentplane/tasks/202608120643-75ZFHW/quality/20260812-081618124-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608120643-75ZFHW/quality/20260812-081618124-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608120643-75ZFHW/quality/20260812-081618124-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608120643-75ZFHW/README.md"
    - ".agentplane/tasks/202608120643-75ZFHW/quality/objects/sha256/cc663777e63822acc6b58cbc804d90eff29ebe9f198d4dc7ae9269fab2002ae4.patch"
    - ".agentplane/tasks/202608120643-75ZFHW/quality/objects/sha256/30d893e648464cfe76cf9a311b70df667ff8ac4f997ac2afc116dc143a1c0587.json"
    - ".agentplane/tasks/202608120643-75ZFHW/verification/20260812081603575-f9ed304aacd71b90.json"
    - ".agentplane/tasks/202608120643-75ZFHW/quality/objects/sha256/1ff932c7fd5c45ad498732c9c1003f19e0e7ce473a6e70fa96d5e33cde954e4e.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Remote deletion now precedes local branch/worktree removal, so a transient provider failure can be retried without reconstructing lost local state."
    - "Primary-worktree topology is independent of which checkout temporarily owns main, preserving parallel task worktrees without recursive creation."
token_usage:
  agent_runs: 1
  input_tokens: null
  journal_digest: "sha256:6ce45672f0a42f80738af2416150b21af6e71d8ca4258ab6fbf39920af2ce841"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "provider_token_telemetry_unavailable"
  updated_at: "2026-08-12T07:55:53.076Z"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_release_metadata"
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
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
      - "packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts"
      - "packages/agentplane/src/commands/branch/cleanup-merged.ts"
      - "packages/agentplane/src/commands/branch/work-start.ts"
      - "packages/agentplane/src/commands/doctor.run.ts"
      - "packages/agentplane/src/commands/doctor/branch-pr.ts"
      - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
      - "packages/agentplane/src/commands/shared/side-effect-authority.ts"
      - "packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-operation-projection.ts"
      - "packages/agentplane/src/commands/shared/worktree-topology.test.ts"
      - "packages/agentplane/src/commands/shared/worktree-topology.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-operations.ts"
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
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_release_metadata"
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
  source: "legacy_compatibility"
  verification:
    required_evidence:
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "5df631a0fcf90ec0c0fae0a30749a916726e36d2"
  message: "✅ 75ZFHW task: bind hosted-repair verification"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: e7e76d785557. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 33a325f05e8c. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation finalized at 2733cdf8a41d after the full-fast gate caught and the task fixed an oversized test-file regression."
  -
    author: "SUPERVISOR"
    body: "Implementation finalized at 5e7636a06 after aligning all hosted-close route readback contracts with the exact cleanup argv."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-12T06:44:59.708Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-12T07:29:22.527Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: e7e76d785557. CLI accepted one state-bound external-agent semantic result."
    commit: "e7e76d7855570667aca67e6e47bbca4822628cea"
  -
    type: "status"
    at: "2026-08-12T07:32:54.702Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 33a325f05e8c. CLI accepted one state-bound external-agent semantic result."
    commit: "33a325f05e8cedf0870d340c749cbe5e354e90f9"
  -
    type: "verify"
    at: "2026-08-12T07:34:54.508Z"
    author: "TESTER"
    state: "ok"
    note: "Implementation e7e76d785 passed focused worktree/cleanup/supervisor/authority/projection/CLI E2E coverage plus typecheck, build, lint, lifecycle invariants, policy routing, diff check, worktree prune dry-run, and real-repository cleanup readback."
  -
    type: "status"
    at: "2026-08-12T07:41:39.097Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation finalized at 2733cdf8a41d after the full-fast gate caught and the task fixed an oversized test-file regression."
    commit: "2733cdf8a41df54870f413421827d01117410693"
  -
    type: "verify"
    at: "2026-08-12T07:41:41.987Z"
    author: "TESTER"
    state: "ok"
    note: "Final implementation 2733cdf8a passed the full-fast local CI route plus focused lifecycle and realistic cleanup E2E coverage."
  -
    type: "status"
    at: "2026-08-12T07:51:07.192Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation finalized at 5e7636a06 after aligning all hosted-close route readback contracts with the exact cleanup argv."
    commit: "5e7636a065ee379db747190f8c67594b90487fa1"
  -
    type: "verify"
    at: "2026-08-12T07:51:12.037Z"
    author: "TESTER"
    state: "ok"
    note: "Final implementation 5e7636a06 passed the complete fast unit suite, the full-fast local CI route, and focused worktree/cleanup lifecycle tests."
  -
    type: "status"
    at: "2026-08-12T07:55:53.076Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
    commit: "5df631a0fcf90ec0c0fae0a30749a916726e36d2"
  -
    type: "verify"
    at: "2026-08-12T08:16:03.575Z"
    author: "TESTER"
    state: "ok"
    note: "Review fixes verified at 6db914eee."
doc_version: 3
doc_updated_at: "2026-08-12T08:16:18.460Z"
doc_updated_by: "CODER"
description: "Implement lifecycle-owned worktree hygiene before the verification optimization task. Preserve parallel development by allowing one authoritative worktree for each active branch_pr task, while preventing duplicate worktrees for the same task. Automatically finalize clean task worktrees and local task branches after hosted-close or proven merge, and make queue/supervisor progression own this cleanup without requiring the coding agent to infer it. Prevent recovery/control checkouts from recursively registering or restoring nested historical task worktrees. Add deterministic inventory/readback that classifies active, merged, dirty, recovery, detached, remote-only, and ambiguous refs; delete only provider-proven merged or explicitly obsolete clean state, preserving dirty, open-PR, active, blocked, stashed, release archive, and uniquely unassimilated work. Apply the command to the current repository, reconcile local and remote branches, and record before/after counts and retained reasons. Cover parallel active tasks, duplicate same-task worktree rejection, hosted-close cleanup, recovery non-resurrection, dirty preservation, and idempotent cleanup with focused and realistic E2E tests."
sections:
  Summary: |-
    Prevent worktree accumulation and clean obsolete task checkouts

    Implement lifecycle-owned worktree hygiene before the verification optimization task. Preserve parallel development by allowing one authoritative worktree for each active branch_pr task, while preventing duplicate worktrees for the same task. Automatically finalize clean task worktrees and local task branches after hosted-close or proven merge, and make queue/supervisor progression own this cleanup without requiring the coding agent to infer it. Prevent recovery/control checkouts from recursively registering or restoring nested historical task worktrees. Add deterministic inventory/readback that classifies active, merged, dirty, recovery, detached, remote-only, and ambiguous refs; delete only provider-proven merged or explicitly obsolete clean state, preserving dirty, open-PR, active, blocked, stashed, release archive, and uniquely unassimilated work. Apply the command to the current repository, reconcile local and remote branches, and record before/after counts and retained reasons. Cover parallel active tasks, duplicate same-task worktree rejection, hosted-close cleanup, recovery non-resurrection, dirty preservation, and idempotent cleanup with focused and realistic E2E tests.
  Scope: |-
    - In scope: Implement lifecycle-owned worktree hygiene before the verification optimization task. Preserve parallel development by allowing one authoritative worktree for each active branch_pr task, while preventing duplicate worktrees for the same task. Automatically finalize clean task worktrees and local task branches after hosted-close or proven merge, and make queue/supervisor progression own this cleanup without requiring the coding agent to infer it. Prevent recovery/control checkouts from recursively registering or restoring nested historical task worktrees. Add deterministic inventory/readback that classifies active, merged, dirty, recovery, detached, remote-only, and ambiguous refs; delete only provider-proven merged or explicitly obsolete clean state, preserving dirty, open-PR, active, blocked, stashed, release archive, and uniquely unassimilated work. Apply the command to the current repository, reconcile local and remote branches, and record before/after counts and retained reasons. Cover parallel active tasks, duplicate same-task worktree rejection, hosted-close cleanup, recovery non-resurrection, dirty preservation, and idempotent cleanup with focused and realistic E2E tests.
    - Out of scope: unrelated refactors not required for "Prevent worktree accumulation and clean obsolete task checkouts".
  Plan: |-
    1. Inventory the current local and hosted checkout graph. For every registered worktree and local or remote branch, record task id, task state, authoritative checkout, dirtiness, open/merged/closed PR state, ancestry to origin/main, stashes or archive refs, recovery/control provenance, and whether unique commits remain. Establish the pre-change baseline counts and retained-reason taxonomy.
    2. Define and implement the canonical invariant: any number of different active branch_pr tasks may run concurrently, but each task has exactly one authoritative task worktree; direct tasks need no dedicated worktree; merged or hosted-closed tasks own no task worktree or ordinary local task branch. Duplicate same-task worktree creation must fail with deterministic readback naming the authoritative checkout.
    3. Move cleanup into deterministic lifecycle ownership. After hosted-close or provider-proven merge, the foreground supervisor/queue progression must finalize the clean task worktree and local/remote task branch automatically and idempotently. The coding agent must not infer or manually advance the queue. A cleanup failure must preserve work, classify the blocker, and emit the exact safe retry or inspection command without rolling back a successful merge.
    4. Prevent worktree graph resurrection. Recovery, benchmark, integration, and control checkouts must be isolated from the primary repository worktree registry or explicitly marked non-authoritative; nested historical task worktrees must not be registered when a recovery base is created, resumed, copied, or removed. Add doctor/inventory detection for recursive recovery graphs and legacy duplicate registrations.
    5. Extend cleanup inventory/reporting to classify active, merged, dirty, detached, recovery, remote-only, open-PR, blocked, archived, and ambiguous refs. Automated deletion is allowed only for clean provider-proven merged/hosted-closed state or explicitly archived obsolete recovery state. Preserve dirty worktrees, active or blocked tasks, open PRs, stashes, release/archive refs, and unique unassimilated commits.
    6. Add focused unit/integration coverage plus realistic E2E scenarios: two different active tasks retain two independent worktrees; a second worktree for the same task is rejected; hosted-close removes a clean merged worktree/branch and is idempotent; cleanup preserves dirty/ambiguous state with actionable readback; recovery creation cannot re-register nested historical worktrees.
    7. Apply the deterministic inventory and cleanup to this repository. Reconcile origin/main and hosted PR truth, remove only proven obsolete worktrees and local/remote refs, retain every ambiguous or active item with a recorded reason, and report before/after counts. Verify git worktree integrity, branch recoverability, active task routing, stash preservation, remote branch state, and clean intended tracked state.
    8. Run focused lifecycle/cleanup tests, critical CLI E2E, typecheck, lint, schema/contract checks, and the full PR verification route. Record residual retained state and exact reasons rather than forcing deletion.
  Verify Steps: |-
    1. Run the worktree invariant matrix. Expected: different active branch_pr tasks can each own one worktree concurrently; a duplicate worktree for the same task is rejected with the authoritative checkout; direct tasks do not receive a mandatory worktree.
    2. Exercise hosted-close and queue progression on a merged task fixture. Expected: the supervisor advances the queue and removes the clean task worktree plus ordinary local/remote task refs exactly once; a second run is a no-op; merge success remains recorded if cleanup is blocked.
    3. Exercise dirty, blocked, open-PR, stashed, archived, detached, unique-commit, recovery, and ambiguous fixtures. Expected: no protected work is deleted; every retained item has a deterministic reason and safe next action.
    4. Create and resume recovery/control fixtures containing historical nested .agentplane/worktrees directories. Expected: no nested worktree becomes registered in the primary repository; doctor/inventory identifies any legacy recursive registration.
    5. Apply cleanup to the real repository after fetching hosted truth. Expected: before/after counts and every removed/retained ref are recorded; origin/main is current; only proven obsolete clean state is deleted; active tasks, open PRs, dirty state, stashes, release/archive refs, and unique commits are preserved.
    6. Run focused lifecycle/cleanup unit and integration tests, realistic CLI E2E, typecheck, lint, schema/contract checks, and full hosted PR verification. Expected: all pass on the exact reviewed SHA and final git worktree prune dry-run reports no stale registrations.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-12T07:34:54.508Z — VERIFY — ok

    By: TESTER

    Note: Implementation e7e76d785 passed focused worktree/cleanup/supervisor/authority/projection/CLI E2E coverage plus typecheck, build, lint, lifecycle invariants, policy routing, diff check, worktree prune dry-run, and real-repository cleanup readback.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:841c3068db6bc34da584a40a2dbfcf74ec7ab97e68fda59f50cc690ce3691db3, input_digest=sha256:cca91140d8edeca9b3f93e161a01edf10e1d6bd61e75ebe17496f31620afac19

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/worktree-topology.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts packages/agentplane/src/commands/shared/side-effect-authority.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts
    Result: pass
    Evidence: focused lifecycle and realistic CLI E2E suite exited 0.
    Scope: one worktree per task, parallel different tasks, recovery non-resurrection, batch retention, hosted-close cleanup, authority and projection.

    Command: bun run typecheck && bun run --filter=agentplane build
    Result: pass
    Evidence: TypeScript build and packaged CLI bundle completed successfully.
    Scope: changed AgentPlane implementation.

    Command: targeted eslint; bun run lifecycle:invariants; node .agentplane/policy/check-routing.mjs; git diff --check; git worktree prune --dry-run --verbose
    Result: pass
    Evidence: no lint, lifecycle, routing, whitespace, or stale-registration failures.
    Scope: changed files and repository lifecycle contract.

    Command: real repository cleanup inventory
    Result: pass
    Evidence: 69 to 28 worktrees and 83 to 44 local branches; 36 provider-proven merged task registrations removed in the recorded batch; active, dirty, recovery, ambiguous, and unique state retained.
    Scope: approved local/remote worktree hygiene.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608120643-75ZFHW-prevent-worktree-accumulation-and-clean-obsolete/.agentplane/tasks/202608120643-75ZFHW/blueprint/resolved-snapshot.json
    - old_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
    - current_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608120643-75ZFHW

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr open 202608120643-75ZFHW --author CODER
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-08-12T07:41:41.987Z — VERIFY — ok

    By: TESTER

    Note: Final implementation 2733cdf8a passed the full-fast local CI route plus focused lifecycle and realistic cleanup E2E coverage.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:841c3068db6bc34da584a40a2dbfcf74ec7ab97e68fda59f50cc690ce3691db3, input_digest=sha256:d4e4701b3a60b7dc79cc1258cb40a2e07ff3c2f23b2be03ff36f7a3a1d93c7b9

    Details:

    Command: AGENTPLANE_FAST_CHANGED_FILES=<origin/main..2733cdf8a paths> bun run ci:local:fast
    Result: pass
    Evidence: full-fast selector completed format, schemas, agent templates, policy routing, release parity, build, CLI cold-start, generated docs/inventories, onboarding, hotspot/baseline, Vitest routing, core lint, and remaining selected checks with exit code 0.
    Scope: final branch diff at 2733cdf8a.

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/worktree-topology.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts packages/agentplane/src/commands/shared/side-effect-authority.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/commands/branch/cleanup-merged.batch.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts
    Result: pass
    Evidence: focused lifecycle, batch-isolation, and realistic CLI E2E suites exited 0; targeted lint and typecheck passed.
    Scope: worktree ownership, recovery non-resurrection, hosted-close cleanup, batch retention, authority, projection, and topology diagnostics.

    Command: real repository cleanup inventory
    Result: pass
    Evidence: 69 to 28 worktrees and 83 to 44 local branches; 36 provider-proven merged task registrations removed in the recorded batch; active, dirty, recovery, ambiguous, and unique state retained.
    Scope: approved repository worktree hygiene.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608120643-75ZFHW-prevent-worktree-accumulation-and-clean-obsolete/.agentplane/tasks/202608120643-75ZFHW/blueprint/resolved-snapshot.json
    - old_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
    - current_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608120643-75ZFHW

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

    ### 2026-08-12T07:51:12.037Z — VERIFY — ok

    By: TESTER

    Note: Final implementation 5e7636a06 passed the complete fast unit suite, the full-fast local CI route, and focused worktree/cleanup lifecycle tests.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:841c3068db6bc34da584a40a2dbfcf74ec7ab97e68fda59f50cc690ce3691db3, input_digest=sha256:e51196b9681bd5f7fef1383c78318bbecf960ef853c498cbea84590f3bbc6dec

    Details:

    Command: bun run test:fast:ci
    Result: pass
    Evidence: complete agentplane/core/recipes/testkit unit suite passed locally after hosted contract repair; the three previously failing route-command assertions are included.
    Scope: final branch diff at 5e7636a06.

    Command: AGENTPLANE_FAST_CHANGED_FILES=<origin/main..2733cdf8a paths> bun run ci:local:fast
    Result: pass
    Evidence: full-fast selector completed format, schemas, agent templates, policy routing, release parity, build, CLI cold-start, generated docs/inventories, onboarding, hotspot/baseline, Vitest routing, core lint, and remaining selected checks with exit code 0.
    Scope: final implementation before route-contract assertion-only correction.

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/route-decision-next-action.test.ts packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts
    Result: pass
    Evidence: 25 exact projection, guidance, authority, and supervisor tests passed.
    Scope: explicit --yes and --delete-remote-branches contract propagation.

    Command: real repository cleanup inventory
    Result: pass
    Evidence: 69 to 28 worktrees and 83 to 44 local branches; 36 provider-proven merged task registrations removed in the recorded batch; protected state retained.
    Scope: approved repository worktree hygiene.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608120643-75ZFHW-prevent-worktree-accumulation-and-clean-obsolete/.agentplane/tasks/202608120643-75ZFHW/blueprint/resolved-snapshot.json
    - old_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
    - current_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608120643-75ZFHW

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

    ### 2026-08-12T08:16:03.575Z — VERIFY — ok

    By: TESTER

    Note: Review fixes verified at 6db914eee.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:841c3068db6bc34da584a40a2dbfcf74ec7ab97e68fda59f50cc690ce3691db3, input_digest=sha256:0a1cd91518439b4d82b0e4213d52564d591d9494e405b9dcaf7e038f34bbe709

    Details:

    Command: bunx vitest run worktree-topology cleanup-merged batch/targeted supervisor suites
    Result: pass
    Evidence: 4 files, 44 tests passed in 29.41s
    Scope: remote-delete retry ordering, primary checkout guards, nested topology diagnostics, hosted cleanup

    Command: bun run typecheck and targeted eslint
    Result: pass
    Evidence: both commands exited 0
    Scope: TypeScript and lint correctness for changed implementation and regression tests

    Command: bun run test:fast:ci
    Result: pass
    Evidence: 557 files passed; 4077 tests passed; 1 skipped; 207.12s
    Scope: core, agentplane, recipes, and testkit unit/integration regression suite

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608120643-75ZFHW-prevent-worktree-accumulation-and-clean-obsolete/.agentplane/tasks/202608120643-75ZFHW/blueprint/resolved-snapshot.json
    - old_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
    - current_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608120643-75ZFHW

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
  Findings: ""
extensions:
  implementation_commit:
    hash: "5e7636a065ee379db747190f8c67594b90487fa1"
    message: "🧹 75ZFHW cleanup: align exact route command contracts"
  workflow_route_baseline:
    start_head_sha: "4efbe19bb2aed31d9b6beb6f01288906b823d8bb"
    version: 1
id_source: "generated"
---
## Summary

Prevent worktree accumulation and clean obsolete task checkouts

Implement lifecycle-owned worktree hygiene before the verification optimization task. Preserve parallel development by allowing one authoritative worktree for each active branch_pr task, while preventing duplicate worktrees for the same task. Automatically finalize clean task worktrees and local task branches after hosted-close or proven merge, and make queue/supervisor progression own this cleanup without requiring the coding agent to infer it. Prevent recovery/control checkouts from recursively registering or restoring nested historical task worktrees. Add deterministic inventory/readback that classifies active, merged, dirty, recovery, detached, remote-only, and ambiguous refs; delete only provider-proven merged or explicitly obsolete clean state, preserving dirty, open-PR, active, blocked, stashed, release archive, and uniquely unassimilated work. Apply the command to the current repository, reconcile local and remote branches, and record before/after counts and retained reasons. Cover parallel active tasks, duplicate same-task worktree rejection, hosted-close cleanup, recovery non-resurrection, dirty preservation, and idempotent cleanup with focused and realistic E2E tests.

## Scope

- In scope: Implement lifecycle-owned worktree hygiene before the verification optimization task. Preserve parallel development by allowing one authoritative worktree for each active branch_pr task, while preventing duplicate worktrees for the same task. Automatically finalize clean task worktrees and local task branches after hosted-close or proven merge, and make queue/supervisor progression own this cleanup without requiring the coding agent to infer it. Prevent recovery/control checkouts from recursively registering or restoring nested historical task worktrees. Add deterministic inventory/readback that classifies active, merged, dirty, recovery, detached, remote-only, and ambiguous refs; delete only provider-proven merged or explicitly obsolete clean state, preserving dirty, open-PR, active, blocked, stashed, release archive, and uniquely unassimilated work. Apply the command to the current repository, reconcile local and remote branches, and record before/after counts and retained reasons. Cover parallel active tasks, duplicate same-task worktree rejection, hosted-close cleanup, recovery non-resurrection, dirty preservation, and idempotent cleanup with focused and realistic E2E tests.
- Out of scope: unrelated refactors not required for "Prevent worktree accumulation and clean obsolete task checkouts".

## Plan

1. Inventory the current local and hosted checkout graph. For every registered worktree and local or remote branch, record task id, task state, authoritative checkout, dirtiness, open/merged/closed PR state, ancestry to origin/main, stashes or archive refs, recovery/control provenance, and whether unique commits remain. Establish the pre-change baseline counts and retained-reason taxonomy.
2. Define and implement the canonical invariant: any number of different active branch_pr tasks may run concurrently, but each task has exactly one authoritative task worktree; direct tasks need no dedicated worktree; merged or hosted-closed tasks own no task worktree or ordinary local task branch. Duplicate same-task worktree creation must fail with deterministic readback naming the authoritative checkout.
3. Move cleanup into deterministic lifecycle ownership. After hosted-close or provider-proven merge, the foreground supervisor/queue progression must finalize the clean task worktree and local/remote task branch automatically and idempotently. The coding agent must not infer or manually advance the queue. A cleanup failure must preserve work, classify the blocker, and emit the exact safe retry or inspection command without rolling back a successful merge.
4. Prevent worktree graph resurrection. Recovery, benchmark, integration, and control checkouts must be isolated from the primary repository worktree registry or explicitly marked non-authoritative; nested historical task worktrees must not be registered when a recovery base is created, resumed, copied, or removed. Add doctor/inventory detection for recursive recovery graphs and legacy duplicate registrations.
5. Extend cleanup inventory/reporting to classify active, merged, dirty, detached, recovery, remote-only, open-PR, blocked, archived, and ambiguous refs. Automated deletion is allowed only for clean provider-proven merged/hosted-closed state or explicitly archived obsolete recovery state. Preserve dirty worktrees, active or blocked tasks, open PRs, stashes, release/archive refs, and unique unassimilated commits.
6. Add focused unit/integration coverage plus realistic E2E scenarios: two different active tasks retain two independent worktrees; a second worktree for the same task is rejected; hosted-close removes a clean merged worktree/branch and is idempotent; cleanup preserves dirty/ambiguous state with actionable readback; recovery creation cannot re-register nested historical worktrees.
7. Apply the deterministic inventory and cleanup to this repository. Reconcile origin/main and hosted PR truth, remove only proven obsolete worktrees and local/remote refs, retain every ambiguous or active item with a recorded reason, and report before/after counts. Verify git worktree integrity, branch recoverability, active task routing, stash preservation, remote branch state, and clean intended tracked state.
8. Run focused lifecycle/cleanup tests, critical CLI E2E, typecheck, lint, schema/contract checks, and the full PR verification route. Record residual retained state and exact reasons rather than forcing deletion.

## Verify Steps

1. Run the worktree invariant matrix. Expected: different active branch_pr tasks can each own one worktree concurrently; a duplicate worktree for the same task is rejected with the authoritative checkout; direct tasks do not receive a mandatory worktree.
2. Exercise hosted-close and queue progression on a merged task fixture. Expected: the supervisor advances the queue and removes the clean task worktree plus ordinary local/remote task refs exactly once; a second run is a no-op; merge success remains recorded if cleanup is blocked.
3. Exercise dirty, blocked, open-PR, stashed, archived, detached, unique-commit, recovery, and ambiguous fixtures. Expected: no protected work is deleted; every retained item has a deterministic reason and safe next action.
4. Create and resume recovery/control fixtures containing historical nested .agentplane/worktrees directories. Expected: no nested worktree becomes registered in the primary repository; doctor/inventory identifies any legacy recursive registration.
5. Apply cleanup to the real repository after fetching hosted truth. Expected: before/after counts and every removed/retained ref are recorded; origin/main is current; only proven obsolete clean state is deleted; active tasks, open PRs, dirty state, stashes, release/archive refs, and unique commits are preserved.
6. Run focused lifecycle/cleanup unit and integration tests, realistic CLI E2E, typecheck, lint, schema/contract checks, and full hosted PR verification. Expected: all pass on the exact reviewed SHA and final git worktree prune dry-run reports no stale registrations.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-12T07:34:54.508Z — VERIFY — ok

By: TESTER

Note: Implementation e7e76d785 passed focused worktree/cleanup/supervisor/authority/projection/CLI E2E coverage plus typecheck, build, lint, lifecycle invariants, policy routing, diff check, worktree prune dry-run, and real-repository cleanup readback.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:841c3068db6bc34da584a40a2dbfcf74ec7ab97e68fda59f50cc690ce3691db3, input_digest=sha256:cca91140d8edeca9b3f93e161a01edf10e1d6bd61e75ebe17496f31620afac19

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/worktree-topology.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts packages/agentplane/src/commands/shared/side-effect-authority.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts
Result: pass
Evidence: focused lifecycle and realistic CLI E2E suite exited 0.
Scope: one worktree per task, parallel different tasks, recovery non-resurrection, batch retention, hosted-close cleanup, authority and projection.

Command: bun run typecheck && bun run --filter=agentplane build
Result: pass
Evidence: TypeScript build and packaged CLI bundle completed successfully.
Scope: changed AgentPlane implementation.

Command: targeted eslint; bun run lifecycle:invariants; node .agentplane/policy/check-routing.mjs; git diff --check; git worktree prune --dry-run --verbose
Result: pass
Evidence: no lint, lifecycle, routing, whitespace, or stale-registration failures.
Scope: changed files and repository lifecycle contract.

Command: real repository cleanup inventory
Result: pass
Evidence: 69 to 28 worktrees and 83 to 44 local branches; 36 provider-proven merged task registrations removed in the recorded batch; active, dirty, recovery, ambiguous, and unique state retained.
Scope: approved local/remote worktree hygiene.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608120643-75ZFHW-prevent-worktree-accumulation-and-clean-obsolete/.agentplane/tasks/202608120643-75ZFHW/blueprint/resolved-snapshot.json
- old_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
- current_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608120643-75ZFHW

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr open 202608120643-75ZFHW --author CODER
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-08-12T07:41:41.987Z — VERIFY — ok

By: TESTER

Note: Final implementation 2733cdf8a passed the full-fast local CI route plus focused lifecycle and realistic cleanup E2E coverage.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:841c3068db6bc34da584a40a2dbfcf74ec7ab97e68fda59f50cc690ce3691db3, input_digest=sha256:d4e4701b3a60b7dc79cc1258cb40a2e07ff3c2f23b2be03ff36f7a3a1d93c7b9

Details:

Command: AGENTPLANE_FAST_CHANGED_FILES=<origin/main..2733cdf8a paths> bun run ci:local:fast
Result: pass
Evidence: full-fast selector completed format, schemas, agent templates, policy routing, release parity, build, CLI cold-start, generated docs/inventories, onboarding, hotspot/baseline, Vitest routing, core lint, and remaining selected checks with exit code 0.
Scope: final branch diff at 2733cdf8a.

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/worktree-topology.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts packages/agentplane/src/commands/shared/side-effect-authority.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts packages/agentplane/src/commands/branch/cleanup-merged.batch.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts
Result: pass
Evidence: focused lifecycle, batch-isolation, and realistic CLI E2E suites exited 0; targeted lint and typecheck passed.
Scope: worktree ownership, recovery non-resurrection, hosted-close cleanup, batch retention, authority, projection, and topology diagnostics.

Command: real repository cleanup inventory
Result: pass
Evidence: 69 to 28 worktrees and 83 to 44 local branches; 36 provider-proven merged task registrations removed in the recorded batch; active, dirty, recovery, ambiguous, and unique state retained.
Scope: approved repository worktree hygiene.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608120643-75ZFHW-prevent-worktree-accumulation-and-clean-obsolete/.agentplane/tasks/202608120643-75ZFHW/blueprint/resolved-snapshot.json
- old_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
- current_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608120643-75ZFHW

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

### 2026-08-12T07:51:12.037Z — VERIFY — ok

By: TESTER

Note: Final implementation 5e7636a06 passed the complete fast unit suite, the full-fast local CI route, and focused worktree/cleanup lifecycle tests.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:841c3068db6bc34da584a40a2dbfcf74ec7ab97e68fda59f50cc690ce3691db3, input_digest=sha256:e51196b9681bd5f7fef1383c78318bbecf960ef853c498cbea84590f3bbc6dec

Details:

Command: bun run test:fast:ci
Result: pass
Evidence: complete agentplane/core/recipes/testkit unit suite passed locally after hosted contract repair; the three previously failing route-command assertions are included.
Scope: final branch diff at 5e7636a06.

Command: AGENTPLANE_FAST_CHANGED_FILES=<origin/main..2733cdf8a paths> bun run ci:local:fast
Result: pass
Evidence: full-fast selector completed format, schemas, agent templates, policy routing, release parity, build, CLI cold-start, generated docs/inventories, onboarding, hotspot/baseline, Vitest routing, core lint, and remaining selected checks with exit code 0.
Scope: final implementation before route-contract assertion-only correction.

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/route-decision-next-action.test.ts packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/commands/shared/workflow-operation-projection.registry.test.ts packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts
Result: pass
Evidence: 25 exact projection, guidance, authority, and supervisor tests passed.
Scope: explicit --yes and --delete-remote-branches contract propagation.

Command: real repository cleanup inventory
Result: pass
Evidence: 69 to 28 worktrees and 83 to 44 local branches; 36 provider-proven merged task registrations removed in the recorded batch; protected state retained.
Scope: approved repository worktree hygiene.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608120643-75ZFHW-prevent-worktree-accumulation-and-clean-obsolete/.agentplane/tasks/202608120643-75ZFHW/blueprint/resolved-snapshot.json
- old_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
- current_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608120643-75ZFHW

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

### 2026-08-12T08:16:03.575Z — VERIFY — ok

By: TESTER

Note: Review fixes verified at 6db914eee.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:841c3068db6bc34da584a40a2dbfcf74ec7ab97e68fda59f50cc690ce3691db3, input_digest=sha256:0a1cd91518439b4d82b0e4213d52564d591d9494e405b9dcaf7e038f34bbe709

Details:

Command: bunx vitest run worktree-topology cleanup-merged batch/targeted supervisor suites
Result: pass
Evidence: 4 files, 44 tests passed in 29.41s
Scope: remote-delete retry ordering, primary checkout guards, nested topology diagnostics, hosted cleanup

Command: bun run typecheck and targeted eslint
Result: pass
Evidence: both commands exited 0
Scope: TypeScript and lint correctness for changed implementation and regression tests

Command: bun run test:fast:ci
Result: pass
Evidence: 557 files passed; 4077 tests passed; 1 skipped; 207.12s
Scope: core, agentplane, recipes, and testkit unit/integration regression suite

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608120643-75ZFHW-prevent-worktree-accumulation-and-clean-obsolete/.agentplane/tasks/202608120643-75ZFHW/blueprint/resolved-snapshot.json
- old_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
- current_digest: 576e053b67d4e020214f55a4b43bff4a26905e11552f05e46553404178f16fa5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608120643-75ZFHW

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

## Token Usage

- State: `unavailable`
- Completeness: `0/1` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:6ce45672f0a42f80738af2416150b21af6e71d8ca4258ab6fbf39920af2ce841`
- Unavailable reason: `provider_token_telemetry_unavailable`
- Updated at: `2026-08-12T07:55:53.076Z`
