---
id: "202605081720-JF941V"
title: "Advanced init blueprint selection"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605081720-DTKG82"
tags:
  - "blueprint"
  - "code"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/cli/run-cli.core.init*.test.ts packages/agentplane/src/commands/blueprints*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-08T17:21:14.846Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-08T18:37:11.744Z"
  updated_by: "CODER"
  note: "Verified advanced init blueprint selection: --blueprints accepts cached blueprint/pack refs, full-harness prompt step lists cached entries, init installs and activates selected pack contents, focused init prompt/apply tests and cli-core blueprint init test passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Completing advanced init blueprint selection for cached catalog entries and packs after the install flow was implemented in this branch."
events:
  -
    type: "status"
    at: "2026-05-08T18:37:05.288Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Completing advanced init blueprint selection for cached catalog entries and packs after the install flow was implemented in this branch."
  -
    type: "verify"
    at: "2026-05-08T18:37:11.744Z"
    author: "CODER"
    state: "ok"
    note: "Verified advanced init blueprint selection: --blueprints accepts cached blueprint/pack refs, full-harness prompt step lists cached entries, init installs and activates selected pack contents, focused init prompt/apply tests and cli-core blueprint init test passed."
doc_version: 3
doc_updated_at: "2026-05-08T18:37:11.766Z"
doc_updated_by: "CODER"
description: "Extend full-harness/advanced init to list cached blueprint catalog entries, let users select individual blueprints and packs, preview pack expansion, and vendor selected blueprints during initialization."
sections:
  Summary: |-
    Advanced init blueprint selection
    
    Extend full-harness/advanced init to list cached blueprint catalog entries, let users select individual blueprints and packs, preview pack expansion, and vendor selected blueprints during initialization.
  Scope: |-
    - In scope: Extend full-harness/advanced init to list cached blueprint catalog entries, let users select individual blueprints and packs, preview pack expansion, and vendor selected blueprints during initialization.
    - Out of scope: unrelated refactors not required for "Advanced init blueprint selection".
  Plan: "Epic: advanced init blueprint selection. Scope: extend full-harness init to list cached individual blueprints and packs, accept explicit selections, preview pack expansion, and install selected external blueprints during init. Depends on 202605081720-DTKG82. Verification: init tests, blueprints tests, typecheck."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/run-cli.core.init*.test.ts packages/agentplane/src/commands/blueprints*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-08T18:37:11.744Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified advanced init blueprint selection: --blueprints accepts cached blueprint/pack refs, full-harness prompt step lists cached entries, init installs and activates selected pack contents, focused init prompt/apply tests and cli-core blueprint init test passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T18:37:05.310Z, excerpt_hash=sha256:bba20a0ec249444aaa143e1e826ef21bdc98fa33ee6f8d31a44a656d651cb4c9
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081719-FBQEV5-blueprint-catalog-install/.agentplane/tasks/202605081720-JF941V/blueprint/resolved-snapshot.json
    - old_digest: 002ae52cdc0860278630e59c1077c8c27ecc4cba65eb65e94519d2640aa84a7b
    - current_digest: 002ae52cdc0860278630e59c1077c8c27ecc4cba65eb65e94519d2640aa84a7b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081720-JF941V
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
