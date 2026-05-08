---
id: "202605081720-DTKG82"
title: "Install external blueprints and packs"
status: "TODO"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-08T17:21:08.134Z"
doc_updated_by: "ORCHESTRATOR"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
