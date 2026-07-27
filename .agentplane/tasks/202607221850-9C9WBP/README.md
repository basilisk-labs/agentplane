---
id: "202607221850-9C9WBP"
title: "Normalize runner task inputs into TaskEpisodeView"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 31
origin:
  system: "manual"
depends_on:
  - "202607221908-9M2FBQ"
tags:
  - "cognitive-load"
  - "context"
  - "milestone-beta1"
  - "refactor"
  - "rf-21"
  - "runner"
  - "v0.7"
  - "wave-supervisor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run guards:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-27T21:30:04.534Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-27T23:26:45.428Z"
  updated_by: "TESTER"
  note: "Rework review complete: CI failure is isolated to an unchanged cross-process test and did not reproduce locally."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-27T23:13:43.702Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "6f18f3796dd7d31d7c9697841a5b55fc2b5376a1"
  blueprint_digest: "cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073"
  evidence_refs:
    - ".agentplane/tasks/202607221850-9C9WBP/quality/20260727-231343569-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221850-9C9WBP/quality/20260727-231343569-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221850-9C9WBP/quality/20260727-231343569-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221850-9C9WBP/quality/20260727-231343569-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221850-9C9WBP/quality/20260727-231343569-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221850-9C9WBP/README.md"
    - ".agentplane/tasks/202607221850-9C9WBP/quality/20260727-231343569-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221850-9C9WBP/quality/20260727-231343569-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221850-9C9WBP/quality/20260727-231343569-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Reviewed task-context compaction: only the canonical BEGIN/END verification envelope is reclassified as optional; localized configured required sections and oversized semantic sections retain their structural validation behavior."
commit:
  hash: "d08a37317bdeb3884ad41e7cf12508db3af609d9"
  message: "🧩 9C9WBP task: refresh task artifacts after commit"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: TaskEpisodeView now carries the sole serialized task representation; focused checks and ci:contract passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-27T21:31:31.540Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-27T22:26:02.321Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: TaskEpisodeView now carries the sole serialized task representation; focused checks and ci:contract passed."
  -
    type: "verify"
    at: "2026-07-27T22:27:24.490Z"
    author: "TESTER"
    state: "ok"
    note: "Verified 5f48099a: TaskEpisodeView serializes one task view; required context fails or records an omission; localized schema headings retain priority. Passed focused vitest (47 tests), guards, typecheck, test:critical, and ci:contract."
  -
    type: "status"
    at: "2026-07-27T22:29:06.730Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-27T22:32:17.808Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-27T22:40:18.777Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Hosted verify-unit failed on 80955ecf: legacy partial RunnerTaskContext fixtures trigger TypeError through task?.metadata access in effect-operation and overlay prompt paths."
  -
    type: "verify"
    at: "2026-07-27T22:51:23.280Z"
    author: "TESTER"
    state: "ok"
    note: "Rework verified locally: task episode consumers tolerate incomplete legacy-shaped task inputs without restoring raw TaskData transport."
  -
    type: "verify"
    at: "2026-07-27T23:12:53.569Z"
    author: "TESTER"
    state: "ok"
    note: "Rework verified: CLI-managed verification history is bounded optional episode context, while structural semantic sections and TaskEpisodeView remain authoritative for agents."
  -
    type: "status"
    at: "2026-07-27T23:14:36.838Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-27T23:24:18.056Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Hosted Unit Tests failed on the PR merge commit: cross-process effect-operation test observed zero winners."
  -
    type: "verify"
    at: "2026-07-27T23:26:45.428Z"
    author: "TESTER"
    state: "ok"
    note: "Rework review complete: CI failure is isolated to an unchanged cross-process test and did not reproduce locally."
  -
    type: "status"
    at: "2026-07-27T23:27:41.993Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-27T23:27:41.994Z"
doc_updated_by: "CODER"
description: "RF-21: replace full TaskData plus duplicate projections with one authoritative role-specific episode view, required-section policy, relevant history, and compaction receipt."
sections:
  Summary: |-
    Normalize runner task inputs into TaskEpisodeView

    RF-21: replace full TaskData plus duplicate projections with one authoritative role-specific episode view, required-section policy, relevant history, and compaction receipt.
  Scope: |-
    - In scope: immutable identity/state metadata, semantic narrative, blueprint-selected required sections, recent relevant events/comments, explicit compaction and omission receipts, v1 compatibility, and serialized-byte ratchets.
    - Out of scope: knowledge retrieval or lifecycle commands.
  Plan: |-
    1. Measure duplicate task representations from the frozen baseline.
    2. Define TaskEpisodeView with one authoritative field per fact.
    3. Select required sections from schema/blueprint metadata and fail loudly when unavailable.
    4. Compact history with explicit coverage/omission receipts.
    5. Migrate runner/work-order serialization and ratchet duplicate bytes downward.
  Verify Steps: |-
    1. Serialize representative large tasks before and after migration. Expected: one authoritative task representation and a material reduction in duplicate bytes without lower verified success fixtures.
    2. Remove or truncate a required section. Expected: preparation fails or records an explicit omission; it never silently hides required context.
    3. Exercise non-English/custom headings through blueprint metadata. Expected: section priority is structural, not an English string heuristic.
    4. Run task-context/work-order tests, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-27T22:27:24.490Z — VERIFY — ok

    By: TESTER

    Note: Verified 5f48099a: TaskEpisodeView serializes one task view; required context fails or records an omission; localized schema headings retain priority. Passed focused vitest (47 tests), guards, typecheck, test:critical, and ci:contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T22:26:02.321Z, excerpt_hash=sha256:36ec1ea31702962a5ec511494e35cd6da4dafe7951dde09a685164bb9d8fb5d3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf12b-integration-lane.j4s9FS/.agentplane/worktrees/202607221850-9C9WBP-normalize-runner-task-inputs-into-taskepisodevie/.agentplane/tasks/202607221850-9C9WBP/blueprint/resolved-snapshot.json
    - old_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
    - current_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-9C9WBP

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221850-9C9WBP
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-27T22:40:18.777Z — VERIFY — needs_rework

    By: TESTER

    Note: Hosted verify-unit failed on 80955ecf: legacy partial RunnerTaskContext fixtures trigger TypeError through task?.metadata access in effect-operation and overlay prompt paths.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T22:32:17.809Z, excerpt_hash=sha256:36ec1ea31702962a5ec511494e35cd6da4dafe7951dde09a685164bb9d8fb5d3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf12b-integration-lane.j4s9FS/.agentplane/worktrees/202607221850-9C9WBP-normalize-runner-task-inputs-into-taskepisodevie/.agentplane/tasks/202607221850-9C9WBP/blueprint/resolved-snapshot.json
    - old_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
    - current_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-9C9WBP

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

    ### 2026-07-27T22:51:23.280Z — VERIFY — ok

    By: TESTER

    Note: Rework verified locally: task episode consumers tolerate incomplete legacy-shaped task inputs without restoring raw TaskData transport.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T22:40:19.605Z, excerpt_hash=sha256:36ec1ea31702962a5ec511494e35cd6da4dafe7951dde09a685164bb9d8fb5d3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf12b-integration-lane.j4s9FS/.agentplane/worktrees/202607221850-9C9WBP-normalize-runner-task-inputs-into-taskepisodevie/.agentplane/tasks/202607221850-9C9WBP/blueprint/resolved-snapshot.json
    - old_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
    - current_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-9C9WBP

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

    ### 2026-07-27T23:12:53.569Z — VERIFY — ok

    By: TESTER

    Note: Rework verified: CLI-managed verification history is bounded optional episode context, while structural semantic sections and TaskEpisodeView remain authoritative for agents.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T22:51:24.222Z, excerpt_hash=sha256:36ec1ea31702962a5ec511494e35cd6da4dafe7951dde09a685164bb9d8fb5d3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf12b-integration-lane.j4s9FS/.agentplane/worktrees/202607221850-9C9WBP-normalize-runner-task-inputs-into-taskepisodevie/.agentplane/tasks/202607221850-9C9WBP/blueprint/resolved-snapshot.json
    - old_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
    - current_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-9C9WBP

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

    ### 2026-07-27T23:24:18.056Z — VERIFY — needs_rework

    By: TESTER

    Note: Hosted Unit Tests failed on the PR merge commit: cross-process effect-operation test observed zero winners.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T23:14:36.839Z, excerpt_hash=sha256:36ec1ea31702962a5ec511494e35cd6da4dafe7951dde09a685164bb9d8fb5d3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf12b-integration-lane.j4s9FS/.agentplane/worktrees/202607221850-9C9WBP-normalize-runner-task-inputs-into-taskepisodevie/.agentplane/tasks/202607221850-9C9WBP/blueprint/resolved-snapshot.json
    - old_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
    - current_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-9C9WBP

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

    ### 2026-07-27T23:26:45.428Z — VERIFY — ok

    By: TESTER

    Note: Rework review complete: CI failure is isolated to an unchanged cross-process test and did not reproduce locally.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T23:24:18.960Z, excerpt_hash=sha256:36ec1ea31702962a5ec511494e35cd6da4dafe7951dde09a685164bb9d8fb5d3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf12b-integration-lane.j4s9FS/.agentplane/worktrees/202607221850-9C9WBP-normalize-runner-task-inputs-into-taskepisodevie/.agentplane/tasks/202607221850-9C9WBP/blueprint/resolved-snapshot.json
    - old_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
    - current_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-9C9WBP

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
    - Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
    - Restore the previous compatibility path behind an explicit feature/compatibility boundary.
    - Re-run lifecycle, focused, and type checks before resuming dependent work.
  Findings: |-
    - Observation: The current blueprint contract has no section-level role or heading metadata; TaskEpisodeView therefore reads the active task-document schema (tasks.doc.required_sections) as the structural authority.
      Impact: Required context is prioritized without English heading heuristics and localized/custom headings are covered, but a dedicated per-role section policy requires an explicit later blueprint/schema extension.
      Resolution: Keep RF-21 narrow: record the source as task_document_schema, enforce explicit omission or validation failure, and defer role-policy authoring to a follow-up context-policy task.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: task-context tests assert a >=30% serialized-byte reduction, explicit required-section receipts/errors, and non-English structural ordering; full contract exit=0.
      Impact: Runner no longer transports duplicate TaskData/document projections to the agent episode.
      Resolution: Accepted for PR quality and hosted verification.

    - Observation: GitHub verify-unit: 10 failures (effect-operation.test.ts and base-prompts.test.ts); all originate from dereferencing missing metadata on legacy/partial task views.
      Impact: RF-21 breaks compatibility for callers that provide a task identity or legacy shape without TaskEpisodeView.metadata.
      Resolution: Restore null-safe metadata access with target task-id fallback and add focused regression coverage before re-verification.

    - Observation: Focused runner tests, test:fast, test:critical, typecheck, guards, formatting, and ci:contract all passed after commit 7957097d079f122b9d3bcf797cded794cf400e82.
      Impact: The hosted verify-unit failure is addressed while preserving TaskEpisodeView as the only semantic runner task representation.
      Resolution: Publish the rework head, then rerun hosted PR verification and quality closure.

    - Observation: Focused runner tests (26), test:fast, test:critical, lint, typecheck, guards, and ci:contract passed after the Verification-marker regression fix.
      Impact: Long lifecycle evidence no longer blocks task-route or evaluator preparation, and it is not silently lost from the compact episode view.
      Resolution: Commit the verified rework, refresh evaluator quality evidence, publish the PR head, and wait for hosted checks.

    - Observation: GitHub run 30313548326 failed only packages/agentplane/src/runner/effect-operation.test.ts:203; focused scenario passed locally 12/12.
      Impact: PR cannot be integrated until the concurrent supervisor scenario is explained and hosted verification is green.
      Resolution: Reproduce against the merge commit, harden or repair the race, then rerun the required checks.

    - Observation: The focused independent-process race passed 12/12; the full fast suite was rerun locally; the test and effect-operation implementation are byte-identical to the tested main base.
      Impact: No task-context regression was found. The task may proceed only after a fresh hosted run confirms the transient failure does not recur.
      Resolution: Preserve the failure record, refresh the PR artifact, and rerun the existing hosted workflow once without changing production behavior.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T21:32:39.898Z"
        authorityDigest: "sha256:3230db9cf0ae6892ab43231e4b9294f8dc113b807ee5dc2b276dd55a09d41f7a"
        digest: "sha256:d4e666f4e0a3ebc84028ab3ddbfe3c901f66e5064fd5cea8209cb0613879d21c"
        operationDigest: "sha256:4c84cea2438da053d7cb31efda4bf136133b5acc196742ca9195d7606283b27a"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:91c022eb250fd03403a05af62f63b23bac1af3126bc3ee77d43926794d3b7a56"
      -
        actor: "USER"
        at: "2026-07-27T22:28:43.722Z"
        authorityDigest: "sha256:8f829da4df0a3ebffb7b9ee9d878692a12a337aa0281e35247135c8dc33d6284"
        digest: "sha256:fe66604f4a84a89366720c57e286cb737427cd590999dc084a50bbb2ffed8306"
        operationDigest: "sha256:5186ee0fc57f4e5d84b1b025c14384e0f01da9cfe1f99adc4a0bd39a5f0ef784"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:d4e666f4e0a3ebc84028ab3ddbfe3c901f66e5064fd5cea8209cb0613879d21c"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:6ab940c3036ca20bf0158664032283f06647480f6917ebc5b668cdda381c2f20"
      -
        actor: "USER"
        at: "2026-07-27T22:31:40.773Z"
        authorityDigest: "sha256:f53d24733478e67fce76223103dd030b30f9596f8bbc08e6facec3602a86300a"
        digest: "sha256:55e0f218690cffd1c25077a0cb5982c1eaa6a50f61a0e61f37ac9f52e719a230"
        operationDigest: "sha256:863388d2eacb228032294a54a2e6de0d0cf09dda3d5950cd8ad95464466dcd62"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:fe66604f4a84a89366720c57e286cb737427cd590999dc084a50bbb2ffed8306"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:3a5969e5e83cd36116c128f42f4915cfc8862eedf38c9b4e75ba06fb2007a0ec"
      -
        actor: "USER"
        at: "2026-07-27T22:32:37.285Z"
        authorityDigest: "sha256:8d587bf848e49ec7687e64d7a43ac0085d963b0f6371775d71bc6d9a434d3be5"
        digest: "sha256:d0d4844a02926ebce20740e128577024390fb8eaa436d1bd192f3d7455a92f62"
        operationDigest: "sha256:dd52853a5a51656fab06d0ee96b098b30835fdc0e82f796dd6b90df6ff88d8e2"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:55e0f218690cffd1c25077a0cb5982c1eaa6a50f61a0e61f37ac9f52e719a230"
        schemaVersion: 1
        sequence: 4
        stateFingerprintDigest: "sha256:8cf8bbdb20120a6a75c9078826e09ec3168daa0f4e7e660f4fe53d557a6db1ec"
      -
        actor: "USER"
        at: "2026-07-27T23:14:15.665Z"
        authorityDigest: "sha256:59ba8389b8be21185c3bb8d7a0f649d706154a36ecf074b6a0c8bb3f57ac9c69"
        digest: "sha256:d8ebcfb607e222b3b75a6e58ef951c544ce153d4d36eb23c049a765f5a35f130"
        operationDigest: "sha256:5186ee0fc57f4e5d84b1b025c14384e0f01da9cfe1f99adc4a0bd39a5f0ef784"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:d0d4844a02926ebce20740e128577024390fb8eaa436d1bd192f3d7455a92f62"
        schemaVersion: 1
        sequence: 5
        stateFingerprintDigest: "sha256:946fa37d776f5121f80a21b55ae5bf82b329c46b67086bb4376ea37c0da3e926"
      -
        actor: "USER"
        at: "2026-07-27T23:15:00.661Z"
        authorityDigest: "sha256:4cd38dcb66cd4d9dd257535596bba11266446964e3efd1b0e374714863b5b823"
        digest: "sha256:4b7a46b6a538c8b352604346aec2638f0a0b3cddbd16c58a01a828c8456f1bf9"
        operationDigest: "sha256:dd52853a5a51656fab06d0ee96b098b30835fdc0e82f796dd6b90df6ff88d8e2"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:d8ebcfb607e222b3b75a6e58ef951c544ce153d4d36eb23c049a765f5a35f130"
        schemaVersion: 1
        sequence: 6
        stateFingerprintDigest: "sha256:080dc7a636fe12a014f42776d29cd8962ed9bc8c8b017d576c9e27d1f6b75932"
      -
        actor: "USER"
        at: "2026-07-27T23:27:08.811Z"
        authorityDigest: "sha256:4cf55c369c13dad4d130e0c63aa69f340dfbfd9aaa61d057dbd8b5ac1e8412ca"
        digest: "sha256:c9050a1c8fd7379b3347c113b2a4778a962662427e569b16b4166786e17470de"
        operationDigest: "sha256:5186ee0fc57f4e5d84b1b025c14384e0f01da9cfe1f99adc4a0bd39a5f0ef784"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:4b7a46b6a538c8b352604346aec2638f0a0b3cddbd16c58a01a828c8456f1bf9"
        schemaVersion: 1
        sequence: 7
        stateFingerprintDigest: "sha256:c1e4bca06bdd7d28940e7b75eeb6109bab73bc59779b18d7b8e8531a002b1622"
      -
        actor: "USER"
        at: "2026-07-27T23:28:22.289Z"
        authorityDigest: "sha256:ee4209a8cec41285558a26537d0f0f1788f904ae1bfcc46cfdcd091889afacb6"
        digest: "sha256:2472bc302cd82e149e6a14634568d83b72a785d2c9dba321ddb56985cad68012"
        operationDigest: "sha256:2ae55af4475c43d56fdc782f15218378f13aa7f348fa6a037828cee88a014b0d"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:c9050a1c8fd7379b3347c113b2a4778a962662427e569b16b4166786e17470de"
        schemaVersion: 1
        sequence: 8
        stateFingerprintDigest: "sha256:b4dc3116978a81b9c7b7dd35626a4ee30715eeea6328f3fb5cb2b67b3ab18074"
      -
        actor: "USER"
        at: "2026-07-27T23:29:31.654Z"
        authorityDigest: "sha256:b17d72e489815686212b6e56ca8e81b3509f6889cb7cf771749954a6a6052e6d"
        digest: "sha256:f953be1c79ff9f6540f974e10dff25400eed62931762d0a95c7a532136905a8a"
        operationDigest: "sha256:dd52853a5a51656fab06d0ee96b098b30835fdc0e82f796dd6b90df6ff88d8e2"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:2472bc302cd82e149e6a14634568d83b72a785d2c9dba321ddb56985cad68012"
        schemaVersion: 1
        sequence: 9
        stateFingerprintDigest: "sha256:ea1b32bd34ed2f7b524cd9a1e953873e0f08781a5ef65ad1b511ffda2c146df5"
    grants:
      -
        actor: "USER"
        digest: "sha256:3230db9cf0ae6892ab43231e4b9294f8dc113b807ee5dc2b276dd55a09d41f7a"
        expiresAt: "2026-07-27T21:47:39.898Z"
        id: "authority-e06cf924-5c0b-455b-8177-3c43501c2df2"
        issuedAt: "2026-07-27T21:32:39.898Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:4c84cea2438da053d7cb31efda4bf136133b5acc196742ca9195d7606283b27a"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:91c022eb250fd03403a05af62f63b23bac1af3126bc3ee77d43926794d3b7a56"
        stateScopeDigest: "sha256:6662a1f9f6db9412153a019796259532ef6922a468912f5cfa73e17846816299"
      -
        actor: "USER"
        digest: "sha256:8f829da4df0a3ebffb7b9ee9d878692a12a337aa0281e35247135c8dc33d6284"
        expiresAt: "2026-07-27T22:43:43.722Z"
        id: "authority-55fda7b8-bb3e-4d3c-8f93-704e5e46b1eb"
        issuedAt: "2026-07-27T22:28:43.722Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:5186ee0fc57f4e5d84b1b025c14384e0f01da9cfe1f99adc4a0bd39a5f0ef784"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:6ab940c3036ca20bf0158664032283f06647480f6917ebc5b668cdda381c2f20"
        stateScopeDigest: "sha256:76401747d862797bbdcc4d453f0fbb546f5a5a830cd34207ccee0404d6c36522"
      -
        actor: "USER"
        digest: "sha256:f53d24733478e67fce76223103dd030b30f9596f8bbc08e6facec3602a86300a"
        expiresAt: "2026-07-27T22:46:40.773Z"
        id: "authority-7e0bd277-e84d-4f1a-91b1-5b67b90d5af1"
        issuedAt: "2026-07-27T22:31:40.773Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:863388d2eacb228032294a54a2e6de0d0cf09dda3d5950cd8ad95464466dcd62"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:3a5969e5e83cd36116c128f42f4915cfc8862eedf38c9b4e75ba06fb2007a0ec"
        stateScopeDigest: "sha256:ab034cca36ab7ec0cd70f3e7ae7a6d0404b2e348a3d74a9d0ea96373726608d3"
      -
        actor: "USER"
        digest: "sha256:8d587bf848e49ec7687e64d7a43ac0085d963b0f6371775d71bc6d9a434d3be5"
        expiresAt: "2026-07-27T22:47:37.285Z"
        id: "authority-16fb415c-9751-4c12-a174-481cb2fb9fd2"
        issuedAt: "2026-07-27T22:32:37.285Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:dd52853a5a51656fab06d0ee96b098b30835fdc0e82f796dd6b90df6ff88d8e2"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:8cf8bbdb20120a6a75c9078826e09ec3168daa0f4e7e660f4fe53d557a6db1ec"
        stateScopeDigest: "sha256:3b844348907b9eed5586479c568fd8d1a89ec1e099b265e714512f4899424b1d"
      -
        actor: "USER"
        digest: "sha256:59ba8389b8be21185c3bb8d7a0f649d706154a36ecf074b6a0c8bb3f57ac9c69"
        expiresAt: "2026-07-27T23:29:15.665Z"
        id: "authority-d47168b6-62a7-4ed9-ae74-799453ff0151"
        issuedAt: "2026-07-27T23:14:15.665Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:5186ee0fc57f4e5d84b1b025c14384e0f01da9cfe1f99adc4a0bd39a5f0ef784"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:946fa37d776f5121f80a21b55ae5bf82b329c46b67086bb4376ea37c0da3e926"
        stateScopeDigest: "sha256:9cce8f57beccc6f358eafd6af1db0287d9939c0e247f7cff0b1ebd7f89d8bf96"
      -
        actor: "USER"
        digest: "sha256:4cd38dcb66cd4d9dd257535596bba11266446964e3efd1b0e374714863b5b823"
        expiresAt: "2026-07-27T23:30:00.661Z"
        id: "authority-63ce6373-5efd-4c20-96bb-34be2a6a342a"
        issuedAt: "2026-07-27T23:15:00.661Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:dd52853a5a51656fab06d0ee96b098b30835fdc0e82f796dd6b90df6ff88d8e2"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:080dc7a636fe12a014f42776d29cd8962ed9bc8c8b017d576c9e27d1f6b75932"
        stateScopeDigest: "sha256:854f58b856c89cccbc061767ccacd705eb3dbf22430a3370f1189bb8f5c35647"
      -
        actor: "USER"
        digest: "sha256:4cf55c369c13dad4d130e0c63aa69f340dfbfd9aaa61d057dbd8b5ac1e8412ca"
        expiresAt: "2026-07-27T23:42:08.811Z"
        id: "authority-e7b20204-48fc-4ffd-a85e-233a9d9a4f9f"
        issuedAt: "2026-07-27T23:27:08.811Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:5186ee0fc57f4e5d84b1b025c14384e0f01da9cfe1f99adc4a0bd39a5f0ef784"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:c1e4bca06bdd7d28940e7b75eeb6109bab73bc59779b18d7b8e8531a002b1622"
        stateScopeDigest: "sha256:c84341e6f2e943c90b4394eafd77e176ce37de17119284e0380cc046fd2e3fd9"
      -
        actor: "USER"
        digest: "sha256:ee4209a8cec41285558a26537d0f0f1788f904ae1bfcc46cfdcd091889afacb6"
        expiresAt: "2026-07-27T23:43:22.289Z"
        id: "authority-b0eec313-d67b-494e-b2bf-9ae08f6759c6"
        issuedAt: "2026-07-27T23:28:22.289Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:2ae55af4475c43d56fdc782f15218378f13aa7f348fa6a037828cee88a014b0d"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:b4dc3116978a81b9c7b7dd35626a4ee30715eeea6328f3fb5cb2b67b3ab18074"
        stateScopeDigest: "sha256:a64f8362598d51ad860402f443a2b51b6b5a66d80f4b74eef5aaff804f8fb4ec"
      -
        actor: "USER"
        digest: "sha256:b17d72e489815686212b6e56ca8e81b3509f6889cb7cf771749954a6a6052e6d"
        expiresAt: "2026-07-27T23:44:31.654Z"
        id: "authority-e3030e60-e273-4d26-a3fb-73a1b41c9d4f"
        issuedAt: "2026-07-27T23:29:31.654Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:dd52853a5a51656fab06d0ee96b098b30835fdc0e82f796dd6b90df6ff88d8e2"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:ea1b32bd34ed2f7b524cd9a1e953873e0f08781a5ef65ad1b511ffda2c146df5"
        stateScopeDigest: "sha256:73cfa108b706125c3f40bbff4899bf89ad75197380e8a264e58f8560d3b4cb48"
    schemaVersion: 1
  implementation_commit:
    hash: "6f18f3796dd7d31d7c9697841a5b55fc2b5376a1"
    message: "🐛 9C9WBP runner: bound lifecycle verification context"
  workflow_route_baseline:
    start_head_sha: "9f99149a3920e2e49a6887d2dcd22460e10f672e"
    version: 1
id_source: "generated"
---
## Summary

Normalize runner task inputs into TaskEpisodeView

RF-21: replace full TaskData plus duplicate projections with one authoritative role-specific episode view, required-section policy, relevant history, and compaction receipt.

## Scope

- In scope: immutable identity/state metadata, semantic narrative, blueprint-selected required sections, recent relevant events/comments, explicit compaction and omission receipts, v1 compatibility, and serialized-byte ratchets.
- Out of scope: knowledge retrieval or lifecycle commands.

## Plan

1. Measure duplicate task representations from the frozen baseline.
2. Define TaskEpisodeView with one authoritative field per fact.
3. Select required sections from schema/blueprint metadata and fail loudly when unavailable.
4. Compact history with explicit coverage/omission receipts.
5. Migrate runner/work-order serialization and ratchet duplicate bytes downward.

## Verify Steps

1. Serialize representative large tasks before and after migration. Expected: one authoritative task representation and a material reduction in duplicate bytes without lower verified success fixtures.
2. Remove or truncate a required section. Expected: preparation fails or records an explicit omission; it never silently hides required context.
3. Exercise non-English/custom headings through blueprint metadata. Expected: section priority is structural, not an English string heuristic.
4. Run task-context/work-order tests, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-27T22:27:24.490Z — VERIFY — ok

By: TESTER

Note: Verified 5f48099a: TaskEpisodeView serializes one task view; required context fails or records an omission; localized schema headings retain priority. Passed focused vitest (47 tests), guards, typecheck, test:critical, and ci:contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T22:26:02.321Z, excerpt_hash=sha256:36ec1ea31702962a5ec511494e35cd6da4dafe7951dde09a685164bb9d8fb5d3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf12b-integration-lane.j4s9FS/.agentplane/worktrees/202607221850-9C9WBP-normalize-runner-task-inputs-into-taskepisodevie/.agentplane/tasks/202607221850-9C9WBP/blueprint/resolved-snapshot.json
- old_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
- current_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-9C9WBP

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221850-9C9WBP
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-27T22:40:18.777Z — VERIFY — needs_rework

By: TESTER

Note: Hosted verify-unit failed on 80955ecf: legacy partial RunnerTaskContext fixtures trigger TypeError through task?.metadata access in effect-operation and overlay prompt paths.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T22:32:17.809Z, excerpt_hash=sha256:36ec1ea31702962a5ec511494e35cd6da4dafe7951dde09a685164bb9d8fb5d3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf12b-integration-lane.j4s9FS/.agentplane/worktrees/202607221850-9C9WBP-normalize-runner-task-inputs-into-taskepisodevie/.agentplane/tasks/202607221850-9C9WBP/blueprint/resolved-snapshot.json
- old_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
- current_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-9C9WBP

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

### 2026-07-27T22:51:23.280Z — VERIFY — ok

By: TESTER

Note: Rework verified locally: task episode consumers tolerate incomplete legacy-shaped task inputs without restoring raw TaskData transport.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T22:40:19.605Z, excerpt_hash=sha256:36ec1ea31702962a5ec511494e35cd6da4dafe7951dde09a685164bb9d8fb5d3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf12b-integration-lane.j4s9FS/.agentplane/worktrees/202607221850-9C9WBP-normalize-runner-task-inputs-into-taskepisodevie/.agentplane/tasks/202607221850-9C9WBP/blueprint/resolved-snapshot.json
- old_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
- current_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-9C9WBP

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

### 2026-07-27T23:12:53.569Z — VERIFY — ok

By: TESTER

Note: Rework verified: CLI-managed verification history is bounded optional episode context, while structural semantic sections and TaskEpisodeView remain authoritative for agents.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T22:51:24.222Z, excerpt_hash=sha256:36ec1ea31702962a5ec511494e35cd6da4dafe7951dde09a685164bb9d8fb5d3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf12b-integration-lane.j4s9FS/.agentplane/worktrees/202607221850-9C9WBP-normalize-runner-task-inputs-into-taskepisodevie/.agentplane/tasks/202607221850-9C9WBP/blueprint/resolved-snapshot.json
- old_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
- current_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-9C9WBP

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

### 2026-07-27T23:24:18.056Z — VERIFY — needs_rework

By: TESTER

Note: Hosted Unit Tests failed on the PR merge commit: cross-process effect-operation test observed zero winners.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T23:14:36.839Z, excerpt_hash=sha256:36ec1ea31702962a5ec511494e35cd6da4dafe7951dde09a685164bb9d8fb5d3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf12b-integration-lane.j4s9FS/.agentplane/worktrees/202607221850-9C9WBP-normalize-runner-task-inputs-into-taskepisodevie/.agentplane/tasks/202607221850-9C9WBP/blueprint/resolved-snapshot.json
- old_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
- current_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-9C9WBP

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

### 2026-07-27T23:26:45.428Z — VERIFY — ok

By: TESTER

Note: Rework review complete: CI failure is isolated to an unchanged cross-process test and did not reproduce locally.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T23:24:18.960Z, excerpt_hash=sha256:36ec1ea31702962a5ec511494e35cd6da4dafe7951dde09a685164bb9d8fb5d3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf12b-integration-lane.j4s9FS/.agentplane/worktrees/202607221850-9C9WBP-normalize-runner-task-inputs-into-taskepisodevie/.agentplane/tasks/202607221850-9C9WBP/blueprint/resolved-snapshot.json
- old_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
- current_digest: cdd33e73504cc9ac7f4422ecaf4c5e410e7be5212752ce9f54b42c0fddd33073
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-9C9WBP

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

- Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
- Restore the previous compatibility path behind an explicit feature/compatibility boundary.
- Re-run lifecycle, focused, and type checks before resuming dependent work.

## Findings

- Observation: The current blueprint contract has no section-level role or heading metadata; TaskEpisodeView therefore reads the active task-document schema (tasks.doc.required_sections) as the structural authority.
  Impact: Required context is prioritized without English heading heuristics and localized/custom headings are covered, but a dedicated per-role section policy requires an explicit later blueprint/schema extension.
  Resolution: Keep RF-21 narrow: record the source as task_document_schema, enforce explicit omission or validation failure, and defer role-policy authoring to a follow-up context-policy task.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: task-context tests assert a >=30% serialized-byte reduction, explicit required-section receipts/errors, and non-English structural ordering; full contract exit=0.
  Impact: Runner no longer transports duplicate TaskData/document projections to the agent episode.
  Resolution: Accepted for PR quality and hosted verification.

- Observation: GitHub verify-unit: 10 failures (effect-operation.test.ts and base-prompts.test.ts); all originate from dereferencing missing metadata on legacy/partial task views.
  Impact: RF-21 breaks compatibility for callers that provide a task identity or legacy shape without TaskEpisodeView.metadata.
  Resolution: Restore null-safe metadata access with target task-id fallback and add focused regression coverage before re-verification.

- Observation: Focused runner tests, test:fast, test:critical, typecheck, guards, formatting, and ci:contract all passed after commit 7957097d079f122b9d3bcf797cded794cf400e82.
  Impact: The hosted verify-unit failure is addressed while preserving TaskEpisodeView as the only semantic runner task representation.
  Resolution: Publish the rework head, then rerun hosted PR verification and quality closure.

- Observation: Focused runner tests (26), test:fast, test:critical, lint, typecheck, guards, and ci:contract passed after the Verification-marker regression fix.
  Impact: Long lifecycle evidence no longer blocks task-route or evaluator preparation, and it is not silently lost from the compact episode view.
  Resolution: Commit the verified rework, refresh evaluator quality evidence, publish the PR head, and wait for hosted checks.

- Observation: GitHub run 30313548326 failed only packages/agentplane/src/runner/effect-operation.test.ts:203; focused scenario passed locally 12/12.
  Impact: PR cannot be integrated until the concurrent supervisor scenario is explained and hosted verification is green.
  Resolution: Reproduce against the merge commit, harden or repair the race, then rerun the required checks.

- Observation: The focused independent-process race passed 12/12; the full fast suite was rerun locally; the test and effect-operation implementation are byte-identical to the tested main base.
  Impact: No task-context regression was found. The task may proceed only after a fresh hosted run confirms the transient failure does not recur.
  Resolution: Preserve the failure record, refresh the PR artifact, and rerun the existing hosted workflow once without changing production behavior.
