---
id: "202607221854-SDPFN0"
title: "Complete CommandSession capability migration"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 23
origin:
  system: "manual"
depends_on:
  - "202607221908-TZTE5V"
  - "202607221908-2NDXVB"
  - "202607221908-YD5J89"
  - "202607221908-RC1DX8"
  - "202607221908-7WV0A7"
tags:
  - "cli"
  - "command-session"
  - "migration"
  - "milestone-rc2"
  - "refactor"
  - "rf-24"
  - "v0.7"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run arch:check"
  - "bun run ci:contract"
  - "bun run guards:check"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T12:46:46.058Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T13:57:05.557Z"
  updated_by: "TESTER"
  note: "PASS: exact dependency closure, complete capability migration without RunDeps, focused/full/critical tests, typecheck, and ci:contract verified for 4f808df120a6."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-01T13:35:12.487Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "d89988611fbdd3efaba3c9054d122104e6717a2b"
  blueprint_digest: "06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62"
  evidence_refs:
    - ".agentplane/tasks/202607221854-SDPFN0/quality/20260801-133435251-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221854-SDPFN0/quality/20260801-133435251-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221854-SDPFN0/quality/20260801-133435251-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221854-SDPFN0/quality/20260801-133435251-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221854-SDPFN0/quality/20260801-133435251-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221854-SDPFN0/quality/20260801-133435251-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607221854-SDPFN0/README.md"
    - ".agentplane/tasks/202607221854-SDPFN0/quality/20260801-133435251-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221854-SDPFN0/quality/20260801-133435251-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221854-SDPFN0/verification/20260801133114119-25964763c8a28263.json"
    - ".agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json"
    - ".agentplane/tasks/202607221854-SDPFN0/quality/20260801-133435251-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The deterministic receipt validates four task IDs that are not the task's declared dependencies, so the required dependency closure is not proven."
commit:
  hash: "4f808df120a6d205d1cb27821aae048a61b8ecff"
  message: "♻️ SDPFN0 task: remove legacy RunDeps aggregate"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed and locally verified: CommandNeeds compatibility metadata removed, all catalog entries use explicit capabilities, and command catalog modules remain below the hotspot threshold."
  -
    author: "CODER"
    body: "Rework completed without implementation changes: corrected the deterministic dependency-closure receipt to the exact five depends_on IDs and added independent verification and passing quality artifact references for each slice."
  -
    author: "CODER"
    body: "Rework: removed the remaining RunDeps aggregate and replaced fake init dependencies with the exact project resolver capability. Full ci:contract passed."
events:
  -
    type: "status"
    at: "2026-08-01T12:47:37.404Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T13:22:41.038Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed and locally verified: CommandNeeds compatibility metadata removed, all catalog entries use explicit capabilities, and command catalog modules remain below the hotspot threshold."
  -
    type: "verify"
    at: "2026-08-01T13:23:37.323Z"
    author: "TESTER"
    state: "ok"
    note: "PASS at implementation d89988611fbd: all five dependency slices are DONE; explicit capability catalog and typed loaders verified; coarse CommandNeeds metadata absent; ci:contract, arch:check, guards:check, typecheck, critical CLI (77 tests), full agentplane suite (3206 tests), and focused catalog/session tests (34 tests) passed."
  -
    type: "verify"
    at: "2026-08-01T13:28:03.122Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: deterministic SHA-bound evidence refreshed after evaluator block; implementation unchanged at d89988611fbd."
  -
    type: "verify"
    at: "2026-08-01T13:31:14.119Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: current verification now includes parser-valid SHA-bound check records and frozen runtime evidence for d89988611fbd."
  -
    type: "status"
    at: "2026-08-01T13:37:20.490Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rework completed without implementation changes: corrected the deterministic dependency-closure receipt to the exact five depends_on IDs and added independent verification and passing quality artifact references for each slice."
  -
    type: "verify"
    at: "2026-08-01T13:37:45.505Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: evaluator-requested dependency evidence rework verified; exact declared closure and independent verification are proven; implementation remains d89988611fbd."
  -
    type: "status"
    at: "2026-08-01T13:50:35.949Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rework: removed the remaining RunDeps aggregate and replaced fake init dependencies with the exact project resolver capability. Full ci:contract passed."
  -
    type: "verify"
    at: "2026-08-01T13:57:05.557Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: exact dependency closure, complete capability migration without RunDeps, focused/full/critical tests, typecheck, and ci:contract verified for 4f808df120a6."
doc_version: 3
doc_updated_at: "2026-08-01T13:57:06.597Z"
doc_updated_by: "CODER"
description: "RF-24b fan-in: integrate the five independently verified command-family vertical slices, remove the coarse CommandNeeds compatibility layer, and prove every catalog entry has minimal typed capabilities."
sections:
  Summary: |-
    Complete CommandSession capability migration

    Integrate the five independently verified command-family vertical slices, remove the coarse CommandNeeds compatibility layer after zero consumers remain, and prove catalog-wide minimal capability and lazy preparation invariants.
  Scope: |-
    - In scope: integrate the separately verified project/config/help/docs, task/lifecycle/route, context/evaluator, runner/Hermes, and provider/release/ops capability slices; remove the coarse CommandNeeds adapter after zero consumers; validate catalog-wide requirement visibility and lazy preparation profiles.
    - Out of scope: implementing family-specific migrations inside this fan-in task.
  Plan: |-
    1. Confirm all five command-family slice tasks are DONE and based on compatible shared capability contracts.
    2. Integrate their catalog/session changes and resolve only cross-family type or registry conflicts.
    3. Remove the coarse CommandNeeds compatibility adapter when zero production consumers remain.
    4. Run catalog-wide capability, laziness, command snapshot, architecture, and preparation-profile checks.
    5. Record any residual compatibility adapter as a release blocker rather than widening this task.
  Verify Steps: |-
    1. Resolve this task's dependency closure. Expected: all five command-family vertical slices are DONE with independent verification.
    2. Inspect every command catalog entry and handler session type. Expected: granular requirements are explicit and no handler receives undeclared task/Git/provider capabilities.
    3. Search for active coarse CommandNeeds consumers and duplicate loader requirement metadata. Expected: none remain.
    4. Run command/help/JSON snapshots, preparation profiles, `bun run arch:check`, `bun run guards:check`, `bun run ci:contract`, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T13:23:37.323Z — VERIFY — ok

    By: TESTER

    Note: PASS at implementation d89988611fbd: all five dependency slices are DONE; explicit capability catalog and typed loaders verified; coarse CommandNeeds metadata absent; ci:contract, arch:check, guards:check, typecheck, critical CLI (77 tests), full agentplane suite (3206 tests), and focused catalog/session tests (34 tests) passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T13:22:41.038Z, excerpt_hash=sha256:8950afda9b85681264c0d254928c271ef6b37c584a02cf54252d1d22b1895326

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-SDPFN0-complete-commandsession-capability-migration/.agentplane/tasks/202607221854-SDPFN0/blueprint/resolved-snapshot.json
    - old_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
    - current_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221854-SDPFN0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221854-SDPFN0
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-01T13:28:03.122Z — VERIFY — ok

    By: TESTER

    Note: PASS: deterministic SHA-bound evidence refreshed after evaluator block; implementation unchanged at d89988611fbd.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T13:23:38.133Z, excerpt_hash=sha256:8950afda9b85681264c0d254928c271ef6b37c584a02cf54252d1d22b1895326

    Details:

    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json (sha256:7a279126460f054de891f39c6362dbfe4d12593c4177a6b910efbc24022513b7). Recorded checks: focused catalog/session 34/34; full agentplane 3206/3206; critical CLI 77/77; ci:contract; arch:check; guards:check; typecheck; hotspots:check; knip:check; zero CommandNeeds, legacy-command-needs, needs:, or loader RunDeps matches; no packages/scripts drift from implementation SHA.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-SDPFN0-complete-commandsession-capability-migration/.agentplane/tasks/202607221854-SDPFN0/blueprint/resolved-snapshot.json
    - old_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
    - current_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221854-SDPFN0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221854-SDPFN0
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-01T13:31:14.119Z — VERIFY — ok

    By: TESTER

    Note: PASS: current verification now includes parser-valid SHA-bound check records and frozen runtime evidence for d89988611fbd.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T13:28:04.024Z, excerpt_hash=sha256:8950afda9b85681264c0d254928c271ef6b37c584a02cf54252d1d22b1895326

    Details:

    Command: git diff --exit-code d89988611fbdd3efaba3c9054d122104e6717a2b..11f36a6f5dba1c16c2fbcd60a0b4df3bc9c111ac -- packages scripts
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: No implementation or script drift between the semantic implementation and verification heads.

    Command: rg -n 'CommandNeeds|legacy-command-needs|needs:' packages/agentplane/src/cli/run-cli/command-catalog packages/agentplane/src/cli/run-cli/command-loaders --glob '*.ts'
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Zero coarse CommandNeeds consumers or duplicate legacy requirement metadata; rg exit 1 means no matches.

    Command: rg -n 'RunDeps' packages/agentplane/src/cli/run-cli/command-loaders --glob '*.ts'
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Zero command loaders receive the former coarse dependency bundle; rg exit 1 means no matches.

    Command: bun run --filter=agentplane test -- src/cli/run-cli/command-catalog.test.ts src/cli/run-cli/command-catalog/kernel.test.ts src/cli/run-cli/registry.run.test.ts
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: 3 files and 34 tests cover catalog-wide absence, explicit capabilities, preparation profiles, conditional session selection, help graph, JSON dispatch, and lazy preparation.

    Command: bun run --filter=agentplane test
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Full AgentPlane package suite passed with 477 files and 3206 tests.

    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: All 12 critical CLI chunks and 77 tests passed.

    Command: bun run ci:contract
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Formatting, schemas, examples, generated docs, compatibility and efficiency baselines, hotspot limits, lifecycle, toolchain, guards, lint, logging, architecture, clone, Knip, and coverage threshold contracts passed.

    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Known violation count stayed zero and every dependency-cruiser slice passed.

    Command: bun run guards:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Shared guards and trust-boundary ratchet passed.

    Command: bun run --filter=agentplane typecheck
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: AgentPlane TypeScript build completed without diagnostics.

    Command: bun run hotspots:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Runtime and test hard limits passed after reducing project catalog from 716 to 409 lines and project loader from 614 to 562 lines.

    Command: bun run knip:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Unused-code baseline passed at 544 of 544 entries after removing CommandNeeds.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-SDPFN0-complete-commandsession-capability-migration/.agentplane/tasks/202607221854-SDPFN0/blueprint/resolved-snapshot.json
    - old_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
    - current_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221854-SDPFN0

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221854-SDPFN0
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-01T13:37:45.505Z — VERIFY — ok

    By: TESTER

    Note: PASS: evaluator-requested dependency evidence rework verified; exact declared closure and independent verification are proven; implementation remains d89988611fbd.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T13:37:20.490Z, excerpt_hash=sha256:8950afda9b85681264c0d254928c271ef6b37c584a02cf54252d1d22b1895326

    Details:

    Command: node dependency-closure exact-set and independent-verification assertion
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Receipt IDs exactly equal depends_on; all five exact task documents are DONE with verification.state=ok and quality_review.state=pass; cited verification and quality artifacts exist and record pass.

    Command: git diff --exit-code d89988611fbdd3efaba3c9054d122104e6717a2b..11f36a6f5dba1c16c2fbcd60a0b4df3bc9c111ac -- packages scripts
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: No implementation or script drift between the semantic implementation and verification heads.

    Command: rg -n 'CommandNeeds|legacy-command-needs|needs:' packages/agentplane/src/cli/run-cli/command-catalog packages/agentplane/src/cli/run-cli/command-loaders --glob '*.ts'
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Zero coarse CommandNeeds consumers or duplicate legacy requirement metadata; rg exit 1 means no matches.

    Command: rg -n 'RunDeps' packages/agentplane/src/cli/run-cli/command-loaders --glob '*.ts'
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Zero command loaders receive the former coarse dependency bundle; rg exit 1 means no matches.

    Command: bun run --filter=agentplane test -- src/cli/run-cli/command-catalog.test.ts src/cli/run-cli/command-catalog/kernel.test.ts src/cli/run-cli/registry.run.test.ts
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: 3 files and 34 tests cover catalog-wide absence, explicit capabilities, preparation profiles, conditional session selection, help graph, JSON dispatch, and lazy preparation.

    Command: bun run --filter=agentplane test
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Full AgentPlane package suite passed with 477 files and 3206 tests.

    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: All 12 critical CLI chunks and 77 tests passed.

    Command: bun run ci:contract
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Formatting, schemas, examples, generated docs, compatibility and efficiency baselines, hotspot limits, lifecycle, toolchain, guards, lint, logging, architecture, clone, Knip, and coverage threshold contracts passed.

    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Known violation count stayed zero and every dependency-cruiser slice passed.

    Command: bun run guards:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Shared guards and trust-boundary ratchet passed.

    Command: bun run --filter=agentplane typecheck
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: AgentPlane TypeScript build completed without diagnostics.

    Command: bun run hotspots:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Runtime and test hard limits passed after reducing project catalog from 716 to 409 lines and project loader from 614 to 562 lines.

    Command: bun run knip:check
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
    Scope: Unused-code baseline passed at 544 of 544 entries after removing CommandNeeds.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-SDPFN0-complete-commandsession-capability-migration/.agentplane/tasks/202607221854-SDPFN0/blueprint/resolved-snapshot.json
    - old_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
    - current_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221854-SDPFN0

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

    ### 2026-08-01T13:57:05.557Z — VERIFY — ok

    By: TESTER

    Note: PASS: exact dependency closure, complete capability migration without RunDeps, focused/full/critical tests, typecheck, and ci:contract verified for 4f808df120a6.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T13:50:35.949Z, excerpt_hash=sha256:8950afda9b85681264c0d254928c271ef6b37c584a02cf54252d1d22b1895326

    Details:

    Command: node dependency-closure exact-set and independent-verification assertion
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-4f808df120a6-checks.json
    Scope: Receipt IDs exactly equal depends_on; all five exact task documents are DONE with verification.state=ok and quality_review.state=pass; cited verification and quality artifacts exist and record pass.

    Command: git diff --exit-code 4f808df120a6d205d1cb27821aae048a61b8ecff..4e9d0ce80bda3624e59e2f8e8de986ff909c6de5 -- packages scripts
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-4f808df120a6-checks.json
    Scope: No implementation or script drift after the recorded semantic implementation commit.

    Command: rg -n 'CommandNeeds|legacy-command-needs|\bRunDeps\b' packages/agentplane/src --glob '*.ts'
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-4f808df120a6-checks.json
    Scope: Zero coarse CommandNeeds or RunDeps consumers remain; rg exit 1 means no matches.

    Command: bun run --filter=agentplane test -- src/cli/run-cli/command-catalog.test.ts src/cli/run-cli/commands/core.unit.test.ts src/cli/run-cli/command-catalog/command-session.test.ts
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-4f808df120a6-checks.json
    Scope: Focused catalog, session, and handler tests passed with 19 tests across the discovered files.

    Command: bun run --filter=agentplane test
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-4f808df120a6-checks.json
    Scope: Full AgentPlane package suite passed with 477 files and 3206 tests against implementation SHA 4f808df120a6.

    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-4f808df120a6-checks.json
    Scope: All 12 critical CLI chunks and 77 tests passed.

    Command: bun run ci:contract
    Result: pass
    Evidence: .agentplane/cache/verification/202607221854-SDPFN0-4f808df120a6-checks.json
    Scope: Full deterministic contract passed, including TypeScript 7.0.2 typecheck, architecture, guards, Knip, hotspot, compatibility, efficiency, and coverage gates.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-SDPFN0-complete-commandsession-capability-migration/.agentplane/tasks/202607221854-SDPFN0/blueprint/resolved-snapshot.json
    - old_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
    - current_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221854-SDPFN0

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
    - Revert the fan-in integration commit while leaving independently merged family slices intact.
    - Restore only the explicit coarse compatibility adapter if cross-family integration fails; do not revert family results wholesale.
    - Re-run catalog snapshots, architecture checks, and each family verification before retry.
  Findings: |-
    - Observation: Command catalog no longer exposes needs or compatibility metadata; conditional task normalize and Codex plugin install select minimal session profiles.
      Impact: CLI preparation is capability-authoritative and avoids unnecessary provider, Git, task, project, or config context for migrated commands.
      Resolution: Accepted. Residual risk is limited to hosted CI and evaluator semantic review.
extensions:
  workflow_route_baseline:
    start_head_sha: "395235931a6b78f8c0f1afb0060b136053e9c315"
    version: 1
id_source: "generated"
---
## Summary

Complete CommandSession capability migration

Integrate the five independently verified command-family vertical slices, remove the coarse CommandNeeds compatibility layer after zero consumers remain, and prove catalog-wide minimal capability and lazy preparation invariants.

## Scope

- In scope: integrate the separately verified project/config/help/docs, task/lifecycle/route, context/evaluator, runner/Hermes, and provider/release/ops capability slices; remove the coarse CommandNeeds adapter after zero consumers; validate catalog-wide requirement visibility and lazy preparation profiles.
- Out of scope: implementing family-specific migrations inside this fan-in task.

## Plan

1. Confirm all five command-family slice tasks are DONE and based on compatible shared capability contracts.
2. Integrate their catalog/session changes and resolve only cross-family type or registry conflicts.
3. Remove the coarse CommandNeeds compatibility adapter when zero production consumers remain.
4. Run catalog-wide capability, laziness, command snapshot, architecture, and preparation-profile checks.
5. Record any residual compatibility adapter as a release blocker rather than widening this task.

## Verify Steps

1. Resolve this task's dependency closure. Expected: all five command-family vertical slices are DONE with independent verification.
2. Inspect every command catalog entry and handler session type. Expected: granular requirements are explicit and no handler receives undeclared task/Git/provider capabilities.
3. Search for active coarse CommandNeeds consumers and duplicate loader requirement metadata. Expected: none remain.
4. Run command/help/JSON snapshots, preparation profiles, `bun run arch:check`, `bun run guards:check`, `bun run ci:contract`, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T13:23:37.323Z — VERIFY — ok

By: TESTER

Note: PASS at implementation d89988611fbd: all five dependency slices are DONE; explicit capability catalog and typed loaders verified; coarse CommandNeeds metadata absent; ci:contract, arch:check, guards:check, typecheck, critical CLI (77 tests), full agentplane suite (3206 tests), and focused catalog/session tests (34 tests) passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T13:22:41.038Z, excerpt_hash=sha256:8950afda9b85681264c0d254928c271ef6b37c584a02cf54252d1d22b1895326

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-SDPFN0-complete-commandsession-capability-migration/.agentplane/tasks/202607221854-SDPFN0/blueprint/resolved-snapshot.json
- old_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
- current_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-SDPFN0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221854-SDPFN0
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-01T13:28:03.122Z — VERIFY — ok

By: TESTER

Note: PASS: deterministic SHA-bound evidence refreshed after evaluator block; implementation unchanged at d89988611fbd.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T13:23:38.133Z, excerpt_hash=sha256:8950afda9b85681264c0d254928c271ef6b37c584a02cf54252d1d22b1895326

Details:

Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json (sha256:7a279126460f054de891f39c6362dbfe4d12593c4177a6b910efbc24022513b7). Recorded checks: focused catalog/session 34/34; full agentplane 3206/3206; critical CLI 77/77; ci:contract; arch:check; guards:check; typecheck; hotspots:check; knip:check; zero CommandNeeds, legacy-command-needs, needs:, or loader RunDeps matches; no packages/scripts drift from implementation SHA.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-SDPFN0-complete-commandsession-capability-migration/.agentplane/tasks/202607221854-SDPFN0/blueprint/resolved-snapshot.json
- old_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
- current_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-SDPFN0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221854-SDPFN0
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-01T13:31:14.119Z — VERIFY — ok

By: TESTER

Note: PASS: current verification now includes parser-valid SHA-bound check records and frozen runtime evidence for d89988611fbd.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T13:28:04.024Z, excerpt_hash=sha256:8950afda9b85681264c0d254928c271ef6b37c584a02cf54252d1d22b1895326

Details:

Command: git diff --exit-code d89988611fbdd3efaba3c9054d122104e6717a2b..11f36a6f5dba1c16c2fbcd60a0b4df3bc9c111ac -- packages scripts
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: No implementation or script drift between the semantic implementation and verification heads.

Command: rg -n 'CommandNeeds|legacy-command-needs|needs:' packages/agentplane/src/cli/run-cli/command-catalog packages/agentplane/src/cli/run-cli/command-loaders --glob '*.ts'
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Zero coarse CommandNeeds consumers or duplicate legacy requirement metadata; rg exit 1 means no matches.

Command: rg -n 'RunDeps' packages/agentplane/src/cli/run-cli/command-loaders --glob '*.ts'
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Zero command loaders receive the former coarse dependency bundle; rg exit 1 means no matches.

Command: bun run --filter=agentplane test -- src/cli/run-cli/command-catalog.test.ts src/cli/run-cli/command-catalog/kernel.test.ts src/cli/run-cli/registry.run.test.ts
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: 3 files and 34 tests cover catalog-wide absence, explicit capabilities, preparation profiles, conditional session selection, help graph, JSON dispatch, and lazy preparation.

Command: bun run --filter=agentplane test
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Full AgentPlane package suite passed with 477 files and 3206 tests.

Command: bun run test:critical
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: All 12 critical CLI chunks and 77 tests passed.

Command: bun run ci:contract
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Formatting, schemas, examples, generated docs, compatibility and efficiency baselines, hotspot limits, lifecycle, toolchain, guards, lint, logging, architecture, clone, Knip, and coverage threshold contracts passed.

Command: bun run arch:check
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Known violation count stayed zero and every dependency-cruiser slice passed.

Command: bun run guards:check
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Shared guards and trust-boundary ratchet passed.

Command: bun run --filter=agentplane typecheck
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: AgentPlane TypeScript build completed without diagnostics.

Command: bun run hotspots:check
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Runtime and test hard limits passed after reducing project catalog from 716 to 409 lines and project loader from 614 to 562 lines.

Command: bun run knip:check
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Unused-code baseline passed at 544 of 544 entries after removing CommandNeeds.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-SDPFN0-complete-commandsession-capability-migration/.agentplane/tasks/202607221854-SDPFN0/blueprint/resolved-snapshot.json
- old_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
- current_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-SDPFN0

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221854-SDPFN0
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-01T13:37:45.505Z — VERIFY — ok

By: TESTER

Note: PASS: evaluator-requested dependency evidence rework verified; exact declared closure and independent verification are proven; implementation remains d89988611fbd.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T13:37:20.490Z, excerpt_hash=sha256:8950afda9b85681264c0d254928c271ef6b37c584a02cf54252d1d22b1895326

Details:

Command: node dependency-closure exact-set and independent-verification assertion
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Receipt IDs exactly equal depends_on; all five exact task documents are DONE with verification.state=ok and quality_review.state=pass; cited verification and quality artifacts exist and record pass.

Command: git diff --exit-code d89988611fbdd3efaba3c9054d122104e6717a2b..11f36a6f5dba1c16c2fbcd60a0b4df3bc9c111ac -- packages scripts
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: No implementation or script drift between the semantic implementation and verification heads.

Command: rg -n 'CommandNeeds|legacy-command-needs|needs:' packages/agentplane/src/cli/run-cli/command-catalog packages/agentplane/src/cli/run-cli/command-loaders --glob '*.ts'
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Zero coarse CommandNeeds consumers or duplicate legacy requirement metadata; rg exit 1 means no matches.

Command: rg -n 'RunDeps' packages/agentplane/src/cli/run-cli/command-loaders --glob '*.ts'
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Zero command loaders receive the former coarse dependency bundle; rg exit 1 means no matches.

Command: bun run --filter=agentplane test -- src/cli/run-cli/command-catalog.test.ts src/cli/run-cli/command-catalog/kernel.test.ts src/cli/run-cli/registry.run.test.ts
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: 3 files and 34 tests cover catalog-wide absence, explicit capabilities, preparation profiles, conditional session selection, help graph, JSON dispatch, and lazy preparation.

Command: bun run --filter=agentplane test
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Full AgentPlane package suite passed with 477 files and 3206 tests.

Command: bun run test:critical
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: All 12 critical CLI chunks and 77 tests passed.

Command: bun run ci:contract
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Formatting, schemas, examples, generated docs, compatibility and efficiency baselines, hotspot limits, lifecycle, toolchain, guards, lint, logging, architecture, clone, Knip, and coverage threshold contracts passed.

Command: bun run arch:check
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Known violation count stayed zero and every dependency-cruiser slice passed.

Command: bun run guards:check
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Shared guards and trust-boundary ratchet passed.

Command: bun run --filter=agentplane typecheck
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: AgentPlane TypeScript build completed without diagnostics.

Command: bun run hotspots:check
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Runtime and test hard limits passed after reducing project catalog from 716 to 409 lines and project loader from 614 to 562 lines.

Command: bun run knip:check
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-d89988611fbd-checks.json
Scope: Unused-code baseline passed at 544 of 544 entries after removing CommandNeeds.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-SDPFN0-complete-commandsession-capability-migration/.agentplane/tasks/202607221854-SDPFN0/blueprint/resolved-snapshot.json
- old_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
- current_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-SDPFN0

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

### 2026-08-01T13:57:05.557Z — VERIFY — ok

By: TESTER

Note: PASS: exact dependency closure, complete capability migration without RunDeps, focused/full/critical tests, typecheck, and ci:contract verified for 4f808df120a6.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T13:50:35.949Z, excerpt_hash=sha256:8950afda9b85681264c0d254928c271ef6b37c584a02cf54252d1d22b1895326

Details:

Command: node dependency-closure exact-set and independent-verification assertion
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-4f808df120a6-checks.json
Scope: Receipt IDs exactly equal depends_on; all five exact task documents are DONE with verification.state=ok and quality_review.state=pass; cited verification and quality artifacts exist and record pass.

Command: git diff --exit-code 4f808df120a6d205d1cb27821aae048a61b8ecff..4e9d0ce80bda3624e59e2f8e8de986ff909c6de5 -- packages scripts
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-4f808df120a6-checks.json
Scope: No implementation or script drift after the recorded semantic implementation commit.

Command: rg -n 'CommandNeeds|legacy-command-needs|\bRunDeps\b' packages/agentplane/src --glob '*.ts'
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-4f808df120a6-checks.json
Scope: Zero coarse CommandNeeds or RunDeps consumers remain; rg exit 1 means no matches.

Command: bun run --filter=agentplane test -- src/cli/run-cli/command-catalog.test.ts src/cli/run-cli/commands/core.unit.test.ts src/cli/run-cli/command-catalog/command-session.test.ts
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-4f808df120a6-checks.json
Scope: Focused catalog, session, and handler tests passed with 19 tests across the discovered files.

Command: bun run --filter=agentplane test
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-4f808df120a6-checks.json
Scope: Full AgentPlane package suite passed with 477 files and 3206 tests against implementation SHA 4f808df120a6.

Command: bun run test:critical
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-4f808df120a6-checks.json
Scope: All 12 critical CLI chunks and 77 tests passed.

Command: bun run ci:contract
Result: pass
Evidence: .agentplane/cache/verification/202607221854-SDPFN0-4f808df120a6-checks.json
Scope: Full deterministic contract passed, including TypeScript 7.0.2 typecheck, architecture, guards, Knip, hotspot, compatibility, efficiency, and coverage gates.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221854-SDPFN0-complete-commandsession-capability-migration/.agentplane/tasks/202607221854-SDPFN0/blueprint/resolved-snapshot.json
- old_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
- current_digest: 06e4268a4cabba53cb9fddff0e6ada3a5298134a5f80219a92c0349d4fbc0c62
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221854-SDPFN0

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

- Revert the fan-in integration commit while leaving independently merged family slices intact.
- Restore only the explicit coarse compatibility adapter if cross-family integration fails; do not revert family results wholesale.
- Re-run catalog snapshots, architecture checks, and each family verification before retry.

## Findings

- Observation: Command catalog no longer exposes needs or compatibility metadata; conditional task normalize and Codex plugin install select minimal session profiles.
  Impact: CLI preparation is capability-authoritative and avoids unnecessary provider, Git, task, project, or config context for migrated commands.
  Resolution: Accepted. Residual risk is limited to hosted CI and evaluator semantic review.
