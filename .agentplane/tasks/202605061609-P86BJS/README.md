---
id: "202605061609-P86BJS"
title: "Preview blueprint route during task creation"
result_summary: "Merged PR #987 with task new --show-blueprint route preview."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "cli"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T16:10:03.787Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T16:22:45.921Z"
  updated_by: "CODER"
  note: "Preview flag verified: task new keeps stdout as the generated id and emits resolved blueprint route details to stderr when --show-blueprint is passed."
commit:
  hash: "339bbacf062a38026e90b4778dffb4b8074dd58f"
  message: "Merge pull request #987 from basilisk-labs/task/202605061609-P86BJS/blueprint-task-new-preview"
comments:
  -
    author: "CODER"
    body: "Start: Implement opt-in blueprint route preview for task creation without changing default stdout id output."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #987 merged into main at 339bbacf062a38026e90b4778dffb4b8074dd58f after required hosted checks passed."
events:
  -
    type: "status"
    at: "2026-05-06T16:11:45.215Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement opt-in blueprint route preview for task creation without changing default stdout id output."
  -
    type: "verify"
    at: "2026-05-06T16:22:45.921Z"
    author: "CODER"
    state: "ok"
    note: "Preview flag verified: task new keeps stdout as the generated id and emits resolved blueprint route details to stderr when --show-blueprint is passed."
  -
    type: "status"
    at: "2026-05-06T16:28:59.776Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #987 merged into main at 339bbacf062a38026e90b4778dffb4b8074dd58f after required hosted checks passed."
doc_version: 3
doc_updated_at: "2026-05-06T16:28:59.777Z"
doc_updated_by: "INTEGRATOR"
description: "Add an opt-in task new flag that prints the resolved blueprint route after task creation without changing the default stdout task-id contract."
sections:
  Summary: |-
    Preview blueprint route during task creation
    
    Add an opt-in task new flag that prints the resolved blueprint route after task creation without changing the default stdout task-id contract.
  Scope: |-
    - In scope: Add an opt-in task new flag that prints the resolved blueprint route after task creation without changing the default stdout task-id contract.
    - Out of scope: unrelated refactors not required for "Preview blueprint route during task creation".
  Plan: "Primary batch task. Scope: add non-breaking task new --show-blueprint that keeps stdout as the generated task id and prints the resolved blueprint route/expected evidence to stderr after creation. Reuse the task blueprint summary helper from lifecycle surfaces. Include related docs task 202605061609-PD9A1Y in the same branch/worktree. Verification: focused task creation/listing tests, real command smoke for stdout/stderr contract, typecheck, docs:cli:check, doctor, routing, diff check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T16:22:45.921Z — VERIFY — ok
    
    By: CODER
    
    Note: Preview flag verified: task new keeps stdout as the generated id and emits resolved blueprint route details to stderr when --show-blueprint is passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T16:11:45.215Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605061609-P86BJS-blueprint-task-new-preview/.agentplane/tasks/202605061609-P86BJS/blueprint/resolved-snapshot.json
    - old_digest: 73486482511cfe94fcbd24a37c601dea01d59a770fdac1237b1552069143b595
    - current_digest: 73486482511cfe94fcbd24a37c601dea01d59a770fdac1237b1552069143b595
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605061609-P86BJS
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands: bun test packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts -t 'task new can preview'; bun test packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts -t 'task list'; bun test packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -t 'help task new'; bun run typecheck; bun run build; bun run lint:core; bun run docs:cli:check; node .agentplane/policy/check-routing.mjs; ap doctor; git diff --check; temp-repo smoke with node packages/agentplane/dist/cli.js task new --show-blueprint.
      Impact: stdout contract remained exactly one task id; stderr preview includes blueprint_id, version, workflow mode, route, selection reasons, required evidence, stop reasons, explain command, and snapshot command.
      Resolution: Full bun run lint was also attempted and failed only in unrelated website files under website/src; touched package/core lint passed with bun run lint:core.
id_source: "generated"
---
