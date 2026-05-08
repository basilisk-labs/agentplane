---
id: "202605081720-JF941V"
title: "Advanced init blueprint selection"
status: "TODO"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-08T17:21:14.854Z"
doc_updated_by: "ORCHESTRATOR"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
