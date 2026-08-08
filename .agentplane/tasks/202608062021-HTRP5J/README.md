---
id: "202608062021-HTRP5J"
title: "Classify compatibility adapters for bounded 0.8 retirement"
result_summary: "pre-merge closure"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 24
origin:
  system: "manual"
depends_on:
  - "202608061850-BZT3D9"
tags:
  - "code"
  - "compatibility"
  - "governance"
  - "v0.7.5"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts"
  - "bun run test:critical"
  - "bun run typecheck"
  - "bun run docs:cli:check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T20:23:01.483Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-08T00:32:15.669Z"
  updated_by: "TESTER"
  note: "Doctor legacy now exposes retirement policy, scope, and removal blocker in both JSON and human output; all declared and repository contract checks pass."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-08T00:46:52.871Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "693ec073fd7fb4109a3f8b607dbdf630016dc688"
  blueprint_digest: "e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc"
  evidence_refs:
    - ".agentplane/tasks/202608062021-HTRP5J/quality/20260808-003229825-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608062021-HTRP5J/quality/20260808-003229825-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608062021-HTRP5J/quality/objects/sha256/e7be094539a72ab21ed41490cf4572a694bc38406af214bb7d3e6a0e2a0709c5.md"
    - ".agentplane/tasks/202608062021-HTRP5J/quality/20260808-003229825-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608062021-HTRP5J/quality/20260808-003229825-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608062021-HTRP5J/quality/20260808-003229825-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608062021-HTRP5J/README.md"
    - ".agentplane/tasks/202608062021-HTRP5J/quality/objects/sha256/e7d4df0bd24bf9d8996ee97794270995b741dd0209e23fbe149f5df56738ff7d.patch"
    - ".agentplane/tasks/202608062021-HTRP5J/quality/objects/sha256/ccd2e9ec6e96835bb72ff370de0e3bd0f7ec728cc3a88771d1290013a00cea81.json"
    - ".agentplane/tasks/202608062021-HTRP5J/verification/20260808003215669-2f43d83d7d3333e6.json"
    - ".agentplane/tasks/202608062021-HTRP5J/quality/objects/sha256/c260c6f4806adbe7f17218606ed3073ec5c734a41ae4ef0fc30f0e5487627cc3.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The implementation satisfies the bounded compatibility-retirement and reporting contract."
token_usage:
  agent_runs: 2
  input_tokens: 344979
  journal_digest: "sha256:bf906bbf2a05fe15e280679e88afb75da668322f2195a69318df0e1cbe157bb2"
  observed_agent_runs: 2
  observed_by: "agentplane"
  output_tokens: 4062
  reasoning_tokens: 948
  schema_version: 1
  source: "supervisor_journal"
  state: "observed"
  total_tokens: 349989
  unavailable_reason: null
  updated_at: "2026-08-08T00:47:37.214Z"
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "693ec073fd7fb4109a3f8b607dbdf630016dc688"
  message: "🐛 HTRP5J compatibility: expose retirement blockers"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: every compatibility adapter now has a validated scheduled-removal, support-window, zero-usage, archive-conversion, or permanent historical-reader policy; doctor legacy exposes policy counts and scopes."
  -
    author: "CODER"
    body: "Rebased the bounded compatibility-retirement implementation onto current main after the shared compatibility foundation merged; all declared verification steps now pass."
  -
    author: "CODER"
    body: "Refresh the implementation receipt to the current task-branch head before the final verification and quality gates."
  -
    author: "CODER"
    body: "Restore the semantic implementation receipt after confirming later commits contain only managed task evidence."
  -
    author: "CODER"
    body: "Address evaluator finding RCI-001 by exposing removal_blocker in human doctor output and covering both non-null and empty blocker cases."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-06T22:03:16.202Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-06T22:10:42.320Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: every compatibility adapter now has a validated scheduled-removal, support-window, zero-usage, archive-conversion, or permanent historical-reader policy; doctor legacy exposes policy counts and scopes."
  -
    type: "verify"
    at: "2026-08-06T22:10:57.205Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Legacy manifest schema v2, doctor report, targeted tests, typecheck, docs reference, lint, and runtime JSON inspection pass. Critical suite remains blocked by the shared compatibility-contract ratchet owned by 202608061850-BZT3D9; rebase after that foundation merges and rerun all Verify Steps."
  -
    type: "status"
    at: "2026-08-08T00:20:13.853Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rebased the bounded compatibility-retirement implementation onto current main after the shared compatibility foundation merged; all declared verification steps now pass."
  -
    type: "verify"
    at: "2026-08-08T00:20:54.918Z"
    author: "TESTER"
    state: "ok"
    note: "Bounded compatibility-retirement policy, doctor reporting, generated docs, type safety, critical behavior, and repository contracts pass on current main."
  -
    type: "status"
    at: "2026-08-08T00:22:08.067Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Refresh the implementation receipt to the current task-branch head before the final verification and quality gates."
  -
    type: "verify"
    at: "2026-08-08T00:22:10.789Z"
    author: "TESTER"
    state: "ok"
    note: "Bounded compatibility-retirement policy, doctor reporting, generated docs, type safety, critical behavior, and repository contracts pass on current main."
  -
    type: "verify"
    at: "2026-08-08T00:23:33.931Z"
    author: "TESTER"
    state: "ok"
    note: "Bounded compatibility-retirement policy, doctor reporting, generated docs, type safety, critical behavior, and repository contracts pass on current main."
  -
    type: "status"
    at: "2026-08-08T00:25:59.479Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Restore the semantic implementation receipt after confirming later commits contain only managed task evidence."
  -
    type: "verify"
    at: "2026-08-08T00:26:02.140Z"
    author: "TESTER"
    state: "ok"
    note: "Bounded compatibility-retirement policy, doctor reporting, generated docs, type safety, critical behavior, and repository contracts pass on current main."
  -
    type: "status"
    at: "2026-08-08T00:32:12.827Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Address evaluator finding RCI-001 by exposing removal_blocker in human doctor output and covering both non-null and empty blocker cases."
  -
    type: "verify"
    at: "2026-08-08T00:32:15.669Z"
    author: "TESTER"
    state: "ok"
    note: "Doctor legacy now exposes retirement policy, scope, and removal blocker in both JSON and human output; all declared and repository contract checks pass."
  -
    type: "status"
    at: "2026-08-08T00:47:37.214Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-08T00:47:37.224Z"
doc_updated_by: "CODER"
description: "Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5."
sections:
  Summary: |-
    Classify compatibility adapters for bounded 0.8 retirement

    Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5.
  Scope: |-
    - In scope: Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5.
    - Out of scope: unrelated refactors not required for "Classify compatibility adapters for bounded 0.8 retirement".
  Plan: "1. Audit every compatibility adapter in the retirement manifest and classify it as versioned removal, support-until, minimum zero-usage releases, archive conversion, or permanent historical reader. 2. Add schema validation that forbids an unbounded null retirement policy. 3. Surface the classification and remaining blocker through doctor legacy JSON and text output. 4. Where an existing clean boundary permits it, lazy-load historical readers only from upgrade, doctor, or archive paths; do not perform broad runtime extraction or delete safety/recovery contracts in this patch. 5. Document the 0.8 removal set and verify compatibility and critical suites."
  Verify Steps: |-
    - bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
    - bun run test:critical
    - bun run typecheck
    - bun run docs:cli:check
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-06T22:10:57.205Z — VERIFY — needs_rework

    By: TESTER

    Note: Legacy manifest schema v2, doctor report, targeted tests, typecheck, docs reference, lint, and runtime JSON inspection pass. Critical suite remains blocked by the shared compatibility-contract ratchet owned by 202608061850-BZT3D9; rebase after that foundation merges and rerun all Verify Steps.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T22:10:42.320Z, excerpt_hash=sha256:0808c51040237f79c1a808bd3980ac46b01d0d6d371abd836fbb241ce031c10f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-HTRP5J-classify-compatibility-adapters-for-bounded-0-8/.agentplane/tasks/202608062021-HTRP5J/blueprint/resolved-snapshot.json
    - old_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
    - current_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-HTRP5J

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-HTRP5J
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-08T00:20:54.918Z — VERIFY — ok

    By: TESTER

    Note: Bounded compatibility-retirement policy, doctor reporting, generated docs, type safety, critical behavior, and repository contracts pass on current main.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T00:20:13.853Z, excerpt_hash=sha256:0808c51040237f79c1a808bd3980ac46b01d0d6d371abd836fbb241ce031c10f

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
    Result: PASS — 1 test file, 4 tests.
    Evidence: Vitest completed with exit code 0 and validated manifest policy classification plus doctor legacy reporting.
    Scope: Targeted HTRP5J compatibility behavior.

    Command: bun run test:critical
    Result: PASS — all 12 critical-cli chunks, 84 tests.
    Evidence: Every chunk completed successfully after rebasing onto the merged compatibility foundation.
    Scope: Critical CLI and trust-boundary regression coverage.

    Command: bun run typecheck
    Result: PASS.
    Evidence: TypeScript build completed with exit code 0.
    Scope: Workspace type safety.

    Command: bun run docs:cli:check
    Result: PASS.
    Evidence: Generated CLI reference is up to date.
    Scope: User-facing command documentation.

    Command: bun run ci:contract
    Result: PASS.
    Evidence: Formatting, schemas, policy routing, compatibility ratchet, lifecycle invariants, lint, architecture, clone, Knip, and coverage threshold guards all completed with exit code 0.
    Scope: Repository-wide contract evidence.

    Residual risk: None identified in the approved HTRP5J scope.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-HTRP5J-classify-compatibility-adapters-for-bounded-0-8/.agentplane/tasks/202608062021-HTRP5J/blueprint/resolved-snapshot.json
    - old_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
    - current_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-HTRP5J

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

    ### 2026-08-08T00:22:10.789Z — VERIFY — ok

    By: TESTER

    Note: Bounded compatibility-retirement policy, doctor reporting, generated docs, type safety, critical behavior, and repository contracts pass on current main.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T00:22:08.067Z, excerpt_hash=sha256:0808c51040237f79c1a808bd3980ac46b01d0d6d371abd836fbb241ce031c10f

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
    Result: PASS — 1 test file, 4 tests.
    Evidence: Vitest completed with exit code 0 and validated manifest policy classification plus doctor legacy reporting.
    Scope: Targeted HTRP5J compatibility behavior.

    Command: bun run test:critical
    Result: PASS — all 12 critical-cli chunks, 84 tests.
    Evidence: Every chunk completed successfully after rebasing onto the merged compatibility foundation.
    Scope: Critical CLI and trust-boundary regression coverage.

    Command: bun run typecheck
    Result: PASS.
    Evidence: TypeScript build completed with exit code 0.
    Scope: Workspace type safety.

    Command: bun run docs:cli:check
    Result: PASS.
    Evidence: Generated CLI reference is up to date.
    Scope: User-facing command documentation.

    Command: bun run ci:contract
    Result: PASS.
    Evidence: Formatting, schemas, policy routing, compatibility ratchet, lifecycle invariants, lint, architecture, clone, Knip, and coverage threshold guards all completed with exit code 0.
    Scope: Repository-wide contract evidence.

    Residual risk: None identified in the approved HTRP5J scope.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-HTRP5J-classify-compatibility-adapters-for-bounded-0-8/.agentplane/tasks/202608062021-HTRP5J/blueprint/resolved-snapshot.json
    - old_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
    - current_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-HTRP5J

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-HTRP5J
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-08T00:23:33.931Z — VERIFY — ok

    By: TESTER

    Note: Bounded compatibility-retirement policy, doctor reporting, generated docs, type safety, critical behavior, and repository contracts pass on current main.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T00:22:12.067Z, excerpt_hash=sha256:0808c51040237f79c1a808bd3980ac46b01d0d6d371abd836fbb241ce031c10f

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
    Result: pass; 1 test file and 4 tests completed successfully.
    Evidence: Vitest exited with code 0 and validated manifest policy classification plus doctor legacy reporting.
    Scope: Targeted HTRP5J compatibility behavior.

    Command: bun run test:critical
    Result: pass; all 12 critical-cli chunks and 84 tests completed successfully.
    Evidence: Every chunk passed after rebasing onto the merged compatibility foundation.
    Scope: Critical CLI and trust-boundary regression coverage.

    Command: bun run typecheck
    Result: pass; TypeScript build completed successfully.
    Evidence: The command exited with code 0 and reported no type errors.
    Scope: Workspace type safety.

    Command: bun run docs:cli:check
    Result: pass; generated CLI reference is current.
    Evidence: The freshness checker reported docs/user/cli-reference.generated.mdx is up to date.
    Scope: User-facing command documentation.

    Command: bun run ci:contract
    Result: pass; all repository contract guards completed successfully.
    Evidence: Formatting, schemas, policy routing, compatibility ratchet, lifecycle invariants, lint, architecture, clone, Knip, and coverage thresholds exited with code 0.
    Scope: Repository-wide contract evidence.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-HTRP5J-classify-compatibility-adapters-for-bounded-0-8/.agentplane/tasks/202608062021-HTRP5J/blueprint/resolved-snapshot.json
    - old_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
    - current_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-HTRP5J

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-HTRP5J
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-08T00:26:02.140Z — VERIFY — ok

    By: TESTER

    Note: Bounded compatibility-retirement policy, doctor reporting, generated docs, type safety, critical behavior, and repository contracts pass on current main.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T00:25:59.479Z, excerpt_hash=sha256:0808c51040237f79c1a808bd3980ac46b01d0d6d371abd836fbb241ce031c10f

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
    Result: pass; 1 test file and 4 tests completed successfully.
    Evidence: Vitest exited with code 0 and validated manifest policy classification plus doctor legacy reporting.
    Scope: Targeted HTRP5J compatibility behavior.

    Command: bun run test:critical
    Result: pass; all 12 critical-cli chunks and 84 tests completed successfully.
    Evidence: Every chunk passed after rebasing onto the merged compatibility foundation.
    Scope: Critical CLI and trust-boundary regression coverage.

    Command: bun run typecheck
    Result: pass; TypeScript build completed successfully.
    Evidence: The command exited with code 0 and reported no type errors.
    Scope: Workspace type safety.

    Command: bun run docs:cli:check
    Result: pass; generated CLI reference is current.
    Evidence: The freshness checker reported docs/user/cli-reference.generated.mdx is up to date.
    Scope: User-facing command documentation.

    Command: bun run ci:contract
    Result: pass; all repository contract guards completed successfully.
    Evidence: Formatting, schemas, policy routing, compatibility ratchet, lifecycle invariants, lint, architecture, clone, Knip, and coverage thresholds exited with code 0.
    Scope: Repository-wide contract evidence.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-HTRP5J-classify-compatibility-adapters-for-bounded-0-8/.agentplane/tasks/202608062021-HTRP5J/blueprint/resolved-snapshot.json
    - old_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
    - current_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-HTRP5J

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

    ### 2026-08-08T00:32:15.669Z — VERIFY — ok

    By: TESTER

    Note: Doctor legacy now exposes retirement policy, scope, and removal blocker in both JSON and human output; all declared and repository contract checks pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T00:32:12.827Z, excerpt_hash=sha256:0808c51040237f79c1a808bd3980ac46b01d0d6d371abd836fbb241ce031c10f

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
    Result: pass; 1 test file and 4 tests completed successfully.
    Evidence: The human-output regression assertions cover both a non-null removal blocker and the none case; Vitest exited with code 0.
    Scope: HTRP5J doctor legacy classification and reporting.

    Command: bun run test:critical
    Result: pass; all 12 critical-cli chunks and 84 tests completed successfully.
    Evidence: Every critical chunk exited with code 0 after the evaluator-driven fix.
    Scope: Critical CLI and trust-boundary regression coverage.

    Command: bun run typecheck
    Result: pass; TypeScript build completed successfully.
    Evidence: The command exited with code 0 and reported no type errors.
    Scope: Workspace type safety.

    Command: bun run docs:cli:check
    Result: pass; generated CLI reference is current.
    Evidence: The freshness checker reported docs/user/cli-reference.generated.mdx is up to date.
    Scope: User-facing command documentation.

    Command: bun run ci:contract
    Result: pass; all repository contract guards completed successfully.
    Evidence: Formatting, schemas, policy routing, compatibility ratchet, lifecycle invariants, lint, architecture, clone, Knip, and coverage thresholds exited with code 0.
    Scope: Repository-wide contract evidence.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-HTRP5J-classify-compatibility-adapters-for-bounded-0-8/.agentplane/tasks/202608062021-HTRP5J/blueprint/resolved-snapshot.json
    - old_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
    - current_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-HTRP5J

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-HTRP5J
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
    - Observation: The first critical chunk rejects the pre-0.7.5 compatibility candidate before task-specific critical checks because shared CLI/prompt/package surfaces already drifted on main.
      Impact: This branch cannot receive final verification or publish its implementation head until BZT3D9 updates the reviewed candidate centrally.
      Resolution: Merge BZT3D9, rebase HTRP5J, rerun doctor legacy tests, critical, typecheck, and docs checks, then record pass.
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Classify compatibility adapters for bounded 0.8 retirement

Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5.

## Scope

- In scope: Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5.
- Out of scope: unrelated refactors not required for "Classify compatibility adapters for bounded 0.8 retirement".

## Plan

1. Audit every compatibility adapter in the retirement manifest and classify it as versioned removal, support-until, minimum zero-usage releases, archive conversion, or permanent historical reader. 2. Add schema validation that forbids an unbounded null retirement policy. 3. Surface the classification and remaining blocker through doctor legacy JSON and text output. 4. Where an existing clean boundary permits it, lazy-load historical readers only from upgrade, doctor, or archive paths; do not perform broad runtime extraction or delete safety/recovery contracts in this patch. 5. Document the 0.8 removal set and verify compatibility and critical suites.

## Verify Steps

- bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
- bun run test:critical
- bun run typecheck
- bun run docs:cli:check

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-06T22:10:57.205Z — VERIFY — needs_rework

By: TESTER

Note: Legacy manifest schema v2, doctor report, targeted tests, typecheck, docs reference, lint, and runtime JSON inspection pass. Critical suite remains blocked by the shared compatibility-contract ratchet owned by 202608061850-BZT3D9; rebase after that foundation merges and rerun all Verify Steps.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T22:10:42.320Z, excerpt_hash=sha256:0808c51040237f79c1a808bd3980ac46b01d0d6d371abd836fbb241ce031c10f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-HTRP5J-classify-compatibility-adapters-for-bounded-0-8/.agentplane/tasks/202608062021-HTRP5J/blueprint/resolved-snapshot.json
- old_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
- current_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-HTRP5J

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-HTRP5J
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-08T00:20:54.918Z — VERIFY — ok

By: TESTER

Note: Bounded compatibility-retirement policy, doctor reporting, generated docs, type safety, critical behavior, and repository contracts pass on current main.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T00:20:13.853Z, excerpt_hash=sha256:0808c51040237f79c1a808bd3980ac46b01d0d6d371abd836fbb241ce031c10f

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
Result: PASS — 1 test file, 4 tests.
Evidence: Vitest completed with exit code 0 and validated manifest policy classification plus doctor legacy reporting.
Scope: Targeted HTRP5J compatibility behavior.

Command: bun run test:critical
Result: PASS — all 12 critical-cli chunks, 84 tests.
Evidence: Every chunk completed successfully after rebasing onto the merged compatibility foundation.
Scope: Critical CLI and trust-boundary regression coverage.

Command: bun run typecheck
Result: PASS.
Evidence: TypeScript build completed with exit code 0.
Scope: Workspace type safety.

Command: bun run docs:cli:check
Result: PASS.
Evidence: Generated CLI reference is up to date.
Scope: User-facing command documentation.

Command: bun run ci:contract
Result: PASS.
Evidence: Formatting, schemas, policy routing, compatibility ratchet, lifecycle invariants, lint, architecture, clone, Knip, and coverage threshold guards all completed with exit code 0.
Scope: Repository-wide contract evidence.

Residual risk: None identified in the approved HTRP5J scope.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-HTRP5J-classify-compatibility-adapters-for-bounded-0-8/.agentplane/tasks/202608062021-HTRP5J/blueprint/resolved-snapshot.json
- old_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
- current_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-HTRP5J

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

### 2026-08-08T00:22:10.789Z — VERIFY — ok

By: TESTER

Note: Bounded compatibility-retirement policy, doctor reporting, generated docs, type safety, critical behavior, and repository contracts pass on current main.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T00:22:08.067Z, excerpt_hash=sha256:0808c51040237f79c1a808bd3980ac46b01d0d6d371abd836fbb241ce031c10f

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
Result: PASS — 1 test file, 4 tests.
Evidence: Vitest completed with exit code 0 and validated manifest policy classification plus doctor legacy reporting.
Scope: Targeted HTRP5J compatibility behavior.

Command: bun run test:critical
Result: PASS — all 12 critical-cli chunks, 84 tests.
Evidence: Every chunk completed successfully after rebasing onto the merged compatibility foundation.
Scope: Critical CLI and trust-boundary regression coverage.

Command: bun run typecheck
Result: PASS.
Evidence: TypeScript build completed with exit code 0.
Scope: Workspace type safety.

Command: bun run docs:cli:check
Result: PASS.
Evidence: Generated CLI reference is up to date.
Scope: User-facing command documentation.

Command: bun run ci:contract
Result: PASS.
Evidence: Formatting, schemas, policy routing, compatibility ratchet, lifecycle invariants, lint, architecture, clone, Knip, and coverage threshold guards all completed with exit code 0.
Scope: Repository-wide contract evidence.

Residual risk: None identified in the approved HTRP5J scope.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-HTRP5J-classify-compatibility-adapters-for-bounded-0-8/.agentplane/tasks/202608062021-HTRP5J/blueprint/resolved-snapshot.json
- old_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
- current_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-HTRP5J

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-HTRP5J
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-08T00:23:33.931Z — VERIFY — ok

By: TESTER

Note: Bounded compatibility-retirement policy, doctor reporting, generated docs, type safety, critical behavior, and repository contracts pass on current main.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T00:22:12.067Z, excerpt_hash=sha256:0808c51040237f79c1a808bd3980ac46b01d0d6d371abd836fbb241ce031c10f

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
Result: pass; 1 test file and 4 tests completed successfully.
Evidence: Vitest exited with code 0 and validated manifest policy classification plus doctor legacy reporting.
Scope: Targeted HTRP5J compatibility behavior.

Command: bun run test:critical
Result: pass; all 12 critical-cli chunks and 84 tests completed successfully.
Evidence: Every chunk passed after rebasing onto the merged compatibility foundation.
Scope: Critical CLI and trust-boundary regression coverage.

Command: bun run typecheck
Result: pass; TypeScript build completed successfully.
Evidence: The command exited with code 0 and reported no type errors.
Scope: Workspace type safety.

Command: bun run docs:cli:check
Result: pass; generated CLI reference is current.
Evidence: The freshness checker reported docs/user/cli-reference.generated.mdx is up to date.
Scope: User-facing command documentation.

Command: bun run ci:contract
Result: pass; all repository contract guards completed successfully.
Evidence: Formatting, schemas, policy routing, compatibility ratchet, lifecycle invariants, lint, architecture, clone, Knip, and coverage thresholds exited with code 0.
Scope: Repository-wide contract evidence.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-HTRP5J-classify-compatibility-adapters-for-bounded-0-8/.agentplane/tasks/202608062021-HTRP5J/blueprint/resolved-snapshot.json
- old_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
- current_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-HTRP5J

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-HTRP5J
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-08T00:26:02.140Z — VERIFY — ok

By: TESTER

Note: Bounded compatibility-retirement policy, doctor reporting, generated docs, type safety, critical behavior, and repository contracts pass on current main.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T00:25:59.479Z, excerpt_hash=sha256:0808c51040237f79c1a808bd3980ac46b01d0d6d371abd836fbb241ce031c10f

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
Result: pass; 1 test file and 4 tests completed successfully.
Evidence: Vitest exited with code 0 and validated manifest policy classification plus doctor legacy reporting.
Scope: Targeted HTRP5J compatibility behavior.

Command: bun run test:critical
Result: pass; all 12 critical-cli chunks and 84 tests completed successfully.
Evidence: Every chunk passed after rebasing onto the merged compatibility foundation.
Scope: Critical CLI and trust-boundary regression coverage.

Command: bun run typecheck
Result: pass; TypeScript build completed successfully.
Evidence: The command exited with code 0 and reported no type errors.
Scope: Workspace type safety.

Command: bun run docs:cli:check
Result: pass; generated CLI reference is current.
Evidence: The freshness checker reported docs/user/cli-reference.generated.mdx is up to date.
Scope: User-facing command documentation.

Command: bun run ci:contract
Result: pass; all repository contract guards completed successfully.
Evidence: Formatting, schemas, policy routing, compatibility ratchet, lifecycle invariants, lint, architecture, clone, Knip, and coverage thresholds exited with code 0.
Scope: Repository-wide contract evidence.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-HTRP5J-classify-compatibility-adapters-for-bounded-0-8/.agentplane/tasks/202608062021-HTRP5J/blueprint/resolved-snapshot.json
- old_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
- current_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-HTRP5J

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

### 2026-08-08T00:32:15.669Z — VERIFY — ok

By: TESTER

Note: Doctor legacy now exposes retirement policy, scope, and removal blocker in both JSON and human output; all declared and repository contract checks pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T00:32:12.827Z, excerpt_hash=sha256:0808c51040237f79c1a808bd3980ac46b01d0d6d371abd836fbb241ce031c10f

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
Result: pass; 1 test file and 4 tests completed successfully.
Evidence: The human-output regression assertions cover both a non-null removal blocker and the none case; Vitest exited with code 0.
Scope: HTRP5J doctor legacy classification and reporting.

Command: bun run test:critical
Result: pass; all 12 critical-cli chunks and 84 tests completed successfully.
Evidence: Every critical chunk exited with code 0 after the evaluator-driven fix.
Scope: Critical CLI and trust-boundary regression coverage.

Command: bun run typecheck
Result: pass; TypeScript build completed successfully.
Evidence: The command exited with code 0 and reported no type errors.
Scope: Workspace type safety.

Command: bun run docs:cli:check
Result: pass; generated CLI reference is current.
Evidence: The freshness checker reported docs/user/cli-reference.generated.mdx is up to date.
Scope: User-facing command documentation.

Command: bun run ci:contract
Result: pass; all repository contract guards completed successfully.
Evidence: Formatting, schemas, policy routing, compatibility ratchet, lifecycle invariants, lint, architecture, clone, Knip, and coverage thresholds exited with code 0.
Scope: Repository-wide contract evidence.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-HTRP5J-classify-compatibility-adapters-for-bounded-0-8/.agentplane/tasks/202608062021-HTRP5J/blueprint/resolved-snapshot.json
- old_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
- current_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-HTRP5J

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-HTRP5J
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

- Observation: The first critical chunk rejects the pre-0.7.5 compatibility candidate before task-specific critical checks because shared CLI/prompt/package surfaces already drifted on main.
  Impact: This branch cannot receive final verification or publish its implementation head until BZT3D9 updates the reviewed candidate centrally.
  Resolution: Merge BZT3D9, rebase HTRP5J, rerun doctor legacy tests, critical, typecheck, and docs checks, then record pass.

## Token Usage

- State: `observed`
- Completeness: `2/2` agent runs
- Input tokens: `344979`
- Output tokens: `4062`
- Reasoning tokens: `948`
- Total tokens: `349989`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:bf906bbf2a05fe15e280679e88afb75da668322f2195a69318df0e1cbe157bb2`
- Unavailable reason: `none`
- Updated at: `2026-08-08T00:47:37.214Z`
