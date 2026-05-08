---
id: "202605081720-DTKG82"
title: "Install external blueprints and packs"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605081719-FBQEV5"
tags:
  - "blueprint"
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/blueprints*.test.ts packages/agentplane/src/cli/run-cli.core.blueprint*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-08T17:21:08.122Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-08T18:36:56.008Z"
  updated_by: "CODER"
  note: "Verified external blueprint and pack installation: focused cli-core blueprint tests cover catalog refresh, individual install without activation, pack install with activation, and full-harness init pack install; typecheck passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Completing the already implemented external blueprint install and pack expansion scope after the primary catalog primitives landed in this branch."
events:
  -
    type: "status"
    at: "2026-05-08T18:36:02.865Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Completing the already implemented external blueprint install and pack expansion scope after the primary catalog primitives landed in this branch."
  -
    type: "verify"
    at: "2026-05-08T18:36:56.008Z"
    author: "CODER"
    state: "ok"
    note: "Verified external blueprint and pack installation: focused cli-core blueprint tests cover catalog refresh, individual install without activation, pack install with activation, and full-harness init pack install; typecheck passed."
doc_version: 3
doc_updated_at: "2026-05-08T18:36:56.044Z"
doc_updated_by: "CODER"
description: "Add CLI install flow for cached or indexed blueprint catalog entries: install individual blueprints, expand packs into blueprint installs, vendor project-local route files, and write explicit allowlist trust config only after preview/confirmation."
sections:
  Summary: |-
    Install external blueprints and packs
    
    Add CLI install flow for cached or indexed blueprint catalog entries: install individual blueprints, expand packs into blueprint installs, vendor project-local route files, and write explicit allowlist trust config only after preview/confirmation.
  Scope: |-
    - In scope: Add CLI install flow for cached or indexed blueprint catalog entries: install individual blueprints, expand packs into blueprint installs, vendor project-local route files, and write explicit allowlist trust config only after preview/confirmation.
    - Out of scope: unrelated refactors not required for "Install external blueprints and packs".
  Plan: "Epic: install external blueprints and packs. Scope: add install command resolving an individual blueprint or pack, expand packs into blueprint installs, vendor route definitions into .agentplane/blueprints, and update explicit allowlist trust config after preview. Depends on 202605081719-FBQEV5. Verification: focused blueprints install tests and typecheck."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/blueprints*.test.ts packages/agentplane/src/cli/run-cli.core.blueprint*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-08T18:36:56.008Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified external blueprint and pack installation: focused cli-core blueprint tests cover catalog refresh, individual install without activation, pack install with activation, and full-harness init pack install; typecheck passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T18:36:02.889Z, excerpt_hash=sha256:3c5b5f27ba15cf25cde85da38586fcdd19ba8b5a5f4b0534302fb0cd9b09ef5f
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081719-FBQEV5-blueprint-catalog-install/.agentplane/tasks/202605081720-DTKG82/blueprint/resolved-snapshot.json
    - old_digest: d601ef319d3680875ee04110ed13e193e7227c51b4984bb5111b06ad212776de
    - current_digest: d601ef319d3680875ee04110ed13e193e7227c51b4984bb5111b06ad212776de
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081720-DTKG82
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
