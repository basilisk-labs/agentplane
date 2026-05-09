---
id: "202605091300-HAT904"
title: "Stabilize standalone asset tests in pre-push"
result_summary: "Merged PR 3499 to main with standalone release asset tests stabilized for full-fast pre-push load."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T13:00:18.861Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T13:02:49.977Z"
  updated_by: "CODER"
  note: "Standalone release asset test timeouts stabilized without changing coverage."
commit:
  hash: "fbc0ee5ac1b88bad387e24eb1c2ef33663709b89"
  message: "Merge pull request #3499 from basilisk-labs/codex/v05-cloud-pull-fetch-fix"
comments:
  -
    author: "CODER"
    body: "Start: Stabilize the standalone release asset tests by keeping coverage intact and giving heavy archive checks enough time under full-fast parallel pre-push load."
  -
    author: "INTEGRATOR"
    body: "Verified: PR 3499 merged to main after standalone asset suite timeout stabilization, full pre-push full-fast, and hosted checks completed successfully."
events:
  -
    type: "status"
    at: "2026-05-09T13:00:23.158Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Stabilize the standalone release asset tests by keeping coverage intact and giving heavy archive checks enough time under full-fast parallel pre-push load."
  -
    type: "verify"
    at: "2026-05-09T13:02:49.977Z"
    author: "CODER"
    state: "ok"
    note: "Standalone release asset test timeouts stabilized without changing coverage."
  -
    type: "status"
    at: "2026-05-09T13:22:23.670Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR 3499 merged to main after standalone asset suite timeout stabilization, full pre-push full-fast, and hosted checks completed successfully."
doc_version: 3
doc_updated_at: "2026-05-09T13:22:23.673Z"
doc_updated_by: "INTEGRATOR"
description: "Raise standalone release asset test timeouts to match full-fast parallel pre-push load after isolated runs pass but two archive smoke tests hit the current 90s limit."
sections:
  Summary: |-
    Stabilize standalone asset tests in pre-push
    
    Raise standalone release asset test timeouts to match full-fast parallel pre-push load after isolated runs pass but two archive smoke tests hit the current 90s limit.
  Scope: |-
    - In scope: Raise standalone release asset test timeouts to match full-fast parallel pre-push load after isolated runs pass but two archive smoke tests hit the current 90s limit.
    - Out of scope: unrelated refactors not required for "Stabilize standalone asset tests in pre-push".
  Plan: |-
    1. Raise only the per-test timeout for standalone archive generation/smoke tests that perform heavy packaging work under full-fast parallel load.
    2. Preserve assertions and implementation behavior; do not skip or weaken coverage.
    3. Verify isolated standalone suite and rerun pre-push/full-fast publication path.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T13:02:49.977Z — VERIFY — ok
    
    By: CODER
    
    Note: Standalone release asset test timeouts stabilized without changing coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T13:00:23.165Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass. Evidence: 5 tests passed; suite duration 30.61s after timeout constant update. Scope: standalone archive generation and smoke tests.
    Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: TypeScript project references.
    Command: bun run lint:core. Result: pass. Evidence: eslint exited 0. Scope: core lint surface.
    Command: git push -u origin codex/v05-cloud-pull-fetch-fix. Result: prior pre-push fail reproduced the issue. Evidence: full-fast timed out two standalone asset tests at 90s while isolated suite passed at 90.34s with 180s CLI cap. Scope: pre-push instability root cause.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605091300-HAT904/blueprint/resolved-snapshot.json
    - old_digest: 307a340979490e59107817ab9c125f81befc6d7a3b2081e3f831e82c4093475d
    - current_digest: 307a340979490e59107817ab9c125f81befc6d7a3b2081e3f831e82c4093475d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091300-HAT904
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
