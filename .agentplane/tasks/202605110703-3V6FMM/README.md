---
id: "202605110703-3V6FMM"
title: "Fix ACR projection checkout collision"
result_summary: "Merged via PR #3575."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "acr"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-11T07:03:55.565Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-11T07:12:07.838Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts --reporter dot; Result: pass, 2 files / 33 tests. Command: bunx eslint touched finish files; Result: pass. Command: bunx prettier --check touched finish files; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Command: bun run hotspots:check; Result: pass, oversized baseline OK."
  attempts: 0
commit:
  hash: "38baaeffc4facc1431b4c5329927badb8025621c"
  message: "🚧 3V6FMM task: Fix ACR projection checkout collision [202605110703-3V6FMM]"
comments:
  -
    author: "CODER"
    body: "Start: tracing branch_pr finish and hosted close ACR refresh so local base checkout no longer creates untracked acr.json files that block fast-forward pulls."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3575 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-11T07:04:02.692Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tracing branch_pr finish and hosted close ACR refresh so local base checkout no longer creates untracked acr.json files that block fast-forward pulls."
  -
    type: "verify"
    at: "2026-05-11T07:12:07.838Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts --reporter dot; Result: pass, 2 files / 33 tests. Command: bunx eslint touched finish files; Result: pass. Command: bunx prettier --check touched finish files; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Command: bun run hotspots:check; Result: pass, oversized baseline OK."
  -
    type: "status"
    at: "2026-05-11T07:24:08.869Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3575 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-11T07:24:08.876Z"
doc_updated_by: "INTEGRATOR"
description: "Prevent automatic ACR refresh during branch_pr finish/hosted-close from leaving local untracked acr.json files that later block fast-forward pulls after hosted close commits track the same path."
sections:
  Summary: |-
    Fix ACR projection checkout collision
    
    Prevent automatic ACR refresh during branch_pr finish/hosted-close from leaving local untracked acr.json files that later block fast-forward pulls after hosted close commits track the same path.
  Scope: |-
    - In scope: Prevent automatic ACR refresh during branch_pr finish/hosted-close from leaving local untracked acr.json files that later block fast-forward pulls after hosted close commits track the same path.
    - Out of scope: unrelated refactors not required for "Fix ACR projection checkout collision".
  Plan: |-
    1. Trace automatic ACR refresh during finish, hosted close, and integrate paths to identify why branch_pr base checkout creates untracked task ACR files before remote hosted close commits land.
    2. Adjust branch_pr close/finish behavior so generated ACR artifacts are either committed in the local close tail or skipped when a hosted close route owns the tracked artifact, avoiding untracked-overwrite fast-forward failures.
    3. Add focused regression coverage for the collision case.
    4. Run targeted tests plus formatting/build gates required by the task.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-11T07:12:07.838Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts --reporter dot; Result: pass, 2 files / 33 tests. Command: bunx eslint touched finish files; Result: pass. Command: bunx prettier --check touched finish files; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Command: bun run hotspots:check; Result: pass, oversized baseline OK.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-11T07:04:02.701Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605110703-3V6FMM-acr-checkout-collision/.agentplane/tasks/202605110703-3V6FMM/blueprint/resolved-snapshot.json
    - old_digest: 94f3ade92cd1c41ea8d34d87ccc2a43ce6b118d6e007c0d7bcbe06bbb9d86e7c
    - current_digest: 94f3ade92cd1c41ea8d34d87ccc2a43ce6b118d6e007c0d7bcbe06bbb9d86e7c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605110703-3V6FMM
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
