---
id: "202605081719-FBQEV5"
title: "Blueprint catalog contracts and cache"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprint"
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/blueprints*.test.ts packages/agentplane/src/blueprints/*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-08T17:21:04.539Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-08T19:45:16.910Z"
  updated_by: "CODER"
  note: "Verified: fixed Codex Review P1 path traversal findings by rejecting unsafe catalog manifest ids and blueprint definition ids before filesystem writes/deletes; focused blueprint CLI tests and agentplane typecheck passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing the primary batch worktree for blueprint catalog contracts/cache plus dependent install and init selection tasks, keeping scope to blueprint catalog files and tests."
events:
  -
    type: "status"
    at: "2026-05-08T17:23:48.834Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the primary batch worktree for blueprint catalog contracts/cache plus dependent install and init selection tasks, keeping scope to blueprint catalog files and tests."
  -
    type: "verify"
    at: "2026-05-08T18:13:35.111Z"
    author: "CODER"
    state: "ok"
    note: "Implemented external blueprint catalog refresh/list/info/install commands, pack expansion, explicit activation allowlist updates, focused CLI tests, generated CLI reference, and verified with typecheck, cli-core blueprint tests, real agentplane-blueprints smoke installs, docs:cli:check, hotspot check, policy routing, and doctor."
  -
    type: "verify"
    at: "2026-05-08T18:26:15.545Z"
    author: "CODER"
    state: "ok"
    note: "Extended implementation to init: explicit --blueprints selection installs cached blueprint catalog entries and packs during full-harness/non-interactive init, activates installed blueprint ids, updates preview/progress/docs, and verifies with focused init prompt/apply tests, cli-core blueprint init test, typecheck, build, docs:cli:check, real init smoke, hotspot check, routing check, and doctor."
  -
    type: "verify"
    at: "2026-05-08T18:41:27.934Z"
    author: "CODER"
    state: "ok"
    note: "Verified current PR head after publishing and documentation/task-artifact refresh commits: branch contains catalog commands, install/pack activation, full-harness init selection, documentation, generated CLI reference, and all focused checks previously passed on this head lineage."
  -
    type: "verify"
    at: "2026-05-08T19:19:20.944Z"
    author: "CODER"
    state: "ok"
    note: "Remote PR checks passed for #3487 at 5d090f5d2 after docs IA alignment; local pre-push docs-only gates passed."
  -
    type: "verify"
    at: "2026-05-08T19:28:12.236Z"
    author: "CODER"
    state: "ok"
    note: "Verified: final PR artifact head refresh after related task evidence commits; remote checks passed on PR #3487."
  -
    type: "verify"
    at: "2026-05-08T19:45:16.910Z"
    author: "CODER"
    state: "ok"
    note: "Verified: fixed Codex Review P1 path traversal findings by rejecting unsafe catalog manifest ids and blueprint definition ids before filesystem writes/deletes; focused blueprint CLI tests and agentplane typecheck passed."
doc_version: 3
doc_updated_at: "2026-05-08T19:45:16.922Z"
doc_updated_by: "CODER"
description: "Add AgentPlane core contracts and local cache primitives for external blueprint catalog indexes, individual catalog blueprints, and blueprint packs without activating project routes."
sections:
  Summary: |-
    Blueprint catalog contracts and cache
    
    Add AgentPlane core contracts and local cache primitives for external blueprint catalog indexes, individual catalog blueprints, and blueprint packs without activating project routes.
  Scope: |-
    - In scope: Add AgentPlane core contracts and local cache primitives for external blueprint catalog indexes, individual catalog blueprints, and blueprint packs without activating project routes.
    - Out of scope: unrelated refactors not required for "Blueprint catalog contracts and cache".
  Plan: "Epic: blueprint catalog contracts and cache. Scope: add core types, cache paths, index parsing, list/refresh/info command surface for external blueprint catalog metadata; keep activation out of this task. Batch worktree also includes dependent implementation tasks 202605081720-DTKG82 and 202605081720-JF941V because install and init selection depend on these primitives. Verification: focused blueprint/blueprints tests and typecheck."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/blueprints*.test.ts packages/agentplane/src/blueprints/*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-08T18:13:35.111Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented external blueprint catalog refresh/list/info/install commands, pack expansion, explicit activation allowlist updates, focused CLI tests, generated CLI reference, and verified with typecheck, cli-core blueprint tests, real agentplane-blueprints smoke installs, docs:cli:check, hotspot check, policy routing, and doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T17:23:48.858Z, excerpt_hash=sha256:71d0006a25ab23eef06cc33fe015d13a945280c60148b352ec6ff4f5132de3aa
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081719-FBQEV5-blueprint-catalog-install/.agentplane/tasks/202605081719-FBQEV5/blueprint/resolved-snapshot.json
    - old_digest: 0f9058138717dfad670c6e386b82650b06d8c332588c8acbe820fad2f2b82936
    - current_digest: 0f9058138717dfad670c6e386b82650b06d8c332588c8acbe820fad2f2b82936
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081719-FBQEV5
    
    ### 2026-05-08T18:26:15.545Z — VERIFY — ok
    
    By: CODER
    
    Note: Extended implementation to init: explicit --blueprints selection installs cached blueprint catalog entries and packs during full-harness/non-interactive init, activates installed blueprint ids, updates preview/progress/docs, and verifies with focused init prompt/apply tests, cli-core blueprint init test, typecheck, build, docs:cli:check, real init smoke, hotspot check, routing check, and doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T18:13:35.199Z, excerpt_hash=sha256:71d0006a25ab23eef06cc33fe015d13a945280c60148b352ec6ff4f5132de3aa
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081719-FBQEV5-blueprint-catalog-install/.agentplane/tasks/202605081719-FBQEV5/blueprint/resolved-snapshot.json
    - old_digest: 0f9058138717dfad670c6e386b82650b06d8c332588c8acbe820fad2f2b82936
    - current_digest: 0f9058138717dfad670c6e386b82650b06d8c332588c8acbe820fad2f2b82936
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081719-FBQEV5
    
    ### 2026-05-08T18:41:27.934Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified current PR head after publishing and documentation/task-artifact refresh commits: branch contains catalog commands, install/pack activation, full-harness init selection, documentation, generated CLI reference, and all focused checks previously passed on this head lineage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T18:26:15.576Z, excerpt_hash=sha256:71d0006a25ab23eef06cc33fe015d13a945280c60148b352ec6ff4f5132de3aa
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081719-FBQEV5-blueprint-catalog-install/.agentplane/tasks/202605081719-FBQEV5/blueprint/resolved-snapshot.json
    - old_digest: 0f9058138717dfad670c6e386b82650b06d8c332588c8acbe820fad2f2b82936
    - current_digest: 0f9058138717dfad670c6e386b82650b06d8c332588c8acbe820fad2f2b82936
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081719-FBQEV5
    
    ### 2026-05-08T19:19:20.944Z — VERIFY — ok
    
    By: CODER
    
    Note: Remote PR checks passed for #3487 at 5d090f5d2 after docs IA alignment; local pre-push docs-only gates passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T18:41:27.954Z, excerpt_hash=sha256:71d0006a25ab23eef06cc33fe015d13a945280c60148b352ec6ff4f5132de3aa
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081719-FBQEV5-blueprint-catalog-install/.agentplane/tasks/202605081719-FBQEV5/blueprint/resolved-snapshot.json
    - old_digest: 0f9058138717dfad670c6e386b82650b06d8c332588c8acbe820fad2f2b82936
    - current_digest: 0f9058138717dfad670c6e386b82650b06d8c332588c8acbe820fad2f2b82936
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081719-FBQEV5
    
    ### 2026-05-08T19:28:12.236Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: final PR artifact head refresh after related task evidence commits; remote checks passed on PR #3487.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T19:19:20.975Z, excerpt_hash=sha256:71d0006a25ab23eef06cc33fe015d13a945280c60148b352ec6ff4f5132de3aa
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081719-FBQEV5-blueprint-catalog-install/.agentplane/tasks/202605081719-FBQEV5/blueprint/resolved-snapshot.json
    - old_digest: 0f9058138717dfad670c6e386b82650b06d8c332588c8acbe820fad2f2b82936
    - current_digest: 0f9058138717dfad670c6e386b82650b06d8c332588c8acbe820fad2f2b82936
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081719-FBQEV5
    
    ### 2026-05-08T19:45:16.910Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: fixed Codex Review P1 path traversal findings by rejecting unsafe catalog manifest ids and blueprint definition ids before filesystem writes/deletes; focused blueprint CLI tests and agentplane typecheck passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T19:28:12.261Z, excerpt_hash=sha256:71d0006a25ab23eef06cc33fe015d13a945280c60148b352ec6ff4f5132de3aa
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081719-FBQEV5-blueprint-catalog-install/.agentplane/tasks/202605081719-FBQEV5/blueprint/resolved-snapshot.json
    - old_digest: 0f9058138717dfad670c6e386b82650b06d8c332588c8acbe820fad2f2b82936
    - current_digest: 0f9058138717dfad670c6e386b82650b06d8c332588c8acbe820fad2f2b82936
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081719-FBQEV5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
