---
id: "202605081752-A6GW7X"
title: "Add branch PR integration queue"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-08T17:52:37.238Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-08T18:21:32.639Z"
  updated_by: "CODER"
  note: "Command: bun run workflow:wait-remote-checks -- 3483 --repo basilisk-labs/agentplane; Result: pass; Evidence: required checks passed for PR #3483 after Core CI, Docs CI, Socket, release-ready, test, test-windows, and recovery-validate reported success."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement a serialized branch_pr integration queue in the dedicated task worktree, preserving existing protected-base handoff behavior and adding targeted queue verification."
events:
  -
    type: "status"
    at: "2026-05-08T17:58:39.357Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement a serialized branch_pr integration queue in the dedicated task worktree, preserving existing protected-base handoff behavior and adding targeted queue verification."
  -
    type: "verify"
    at: "2026-05-08T18:16:17.598Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/pr/integrate/queue-state.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts; Result: pass; Evidence: 3 files, 16 tests passed. Command: bun run --filter=agentplane typecheck; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Command: ap integrate queue list; Result: pass, queue command dispatch works. Command: node .agentplane/policy/check-routing.mjs and ap doctor; Result: pass."
  -
    type: "verify"
    at: "2026-05-08T18:21:32.639Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run workflow:wait-remote-checks -- 3483 --repo basilisk-labs/agentplane; Result: pass; Evidence: required checks passed for PR #3483 after Core CI, Docs CI, Socket, release-ready, test, test-windows, and recovery-validate reported success."
doc_version: 3
doc_updated_at: "2026-05-08T18:21:32.763Z"
doc_updated_by: "CODER"
description: "Add a serialized integration queue for branch_pr so multiple agents can finish PR work concurrently while only one verified task branch enters the main merge lane at a time."
sections:
  Summary: |-
    Add branch PR integration queue
    
    Add a serialized integration queue for branch_pr so multiple agents can finish PR work concurrently while only one verified task branch enters the main merge lane at a time.
  Scope: |-
    - In scope: Add a serialized integration queue for branch_pr so multiple agents can finish PR work concurrently while only one verified task branch enters the main merge lane at a time.
    - Out of scope: unrelated refactors not required for "Add branch PR integration queue".
  Plan: "Implement a serialized branch_pr integration queue. Scope: add a small queue domain/artifact layer, CLI surfaces to enqueue/list/claim/run one integration candidate, stale/lease/conflict handling around existing integrate behavior, targeted tests, and branch_pr policy documentation. Verification: targeted unit tests for queue behavior, routing check, and doctor."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-08T18:16:17.598Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/commands/pr/integrate/queue-state.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/cli/run-cli/command-catalog.test.ts; Result: pass; Evidence: 3 files, 16 tests passed. Command: bun run --filter=agentplane typecheck; Result: pass. Command: bun run --filter=agentplane build; Result: pass. Command: ap integrate queue list; Result: pass, queue command dispatch works. Command: node .agentplane/policy/check-routing.mjs and ap doctor; Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T17:58:39.377Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081752-A6GW7X-integration-queue/.agentplane/tasks/202605081752-A6GW7X/blueprint/resolved-snapshot.json
    - old_digest: 920866503f3eaa1fa05da2dfbda9605dda351f1028e35b4a557aedf46d5935dc
    - current_digest: 920866503f3eaa1fa05da2dfbda9605dda351f1028e35b4a557aedf46d5935dc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081752-A6GW7X
    
    ### 2026-05-08T18:21:32.639Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run workflow:wait-remote-checks -- 3483 --repo basilisk-labs/agentplane; Result: pass; Evidence: required checks passed for PR #3483 after Core CI, Docs CI, Socket, release-ready, test, test-windows, and recovery-validate reported success.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T18:16:17.620Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081752-A6GW7X-integration-queue/.agentplane/tasks/202605081752-A6GW7X/blueprint/resolved-snapshot.json
    - old_digest: 920866503f3eaa1fa05da2dfbda9605dda351f1028e35b4a557aedf46d5935dc
    - current_digest: 920866503f3eaa1fa05da2dfbda9605dda351f1028e35b4a557aedf46d5935dc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081752-A6GW7X
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
