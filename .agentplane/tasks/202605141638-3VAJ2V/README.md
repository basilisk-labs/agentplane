---
id: "202605141638-3VAJ2V"
title: "Finish shared guard and sleep deduplication"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T16:41:03.645Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-14T16:39:53.027Z"
doc_updated_by: "PLANNER"
description: "Migrate remaining local isRecord and sleep copies to canonical shared helpers where appropriate, then add a lint or check guard that prevents new local isRecord definitions in packages/agentplane/src except approved canonical guard modules."
sections:
  Summary: |-
    Finish shared guard and sleep deduplication
    
    Migrate remaining local isRecord and sleep copies to canonical shared helpers where appropriate, then add a lint or check guard that prevents new local isRecord definitions in packages/agentplane/src except approved canonical guard modules.
  Scope: |-
    - In scope: Migrate remaining local isRecord and sleep copies to canonical shared helpers where appropriate, then add a lint or check guard that prevents new local isRecord definitions in packages/agentplane/src except approved canonical guard modules.
    - Out of scope: unrelated refactors not required for "Finish shared guard and sleep deduplication".
  Plan: "Finish utility dedup governance. Scope: migrate remaining local isRecord definitions in packages/agentplane/src where canonical imports are straightforward, replace integrate queue local sleep with shared concurrency helper, and add a lint/check guard against new local isRecord copies except approved canonical modules. Out of scope: packages/core and packages/recipes canonical guard design changes."
  Verify Steps: "1. Run a guard command that counts local isRecord definitions in packages/agentplane/src and fails on newly introduced non-canonical copies. 2. Run targeted tests or typecheck covering migrated modules. 3. Run bun run lint:core -- changed guard/refactor files. 4. Run node .agentplane/policy/check-routing.mjs. 5. Document any intentionally retained local guard wrappers in task Findings."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Finish shared guard and sleep deduplication

Migrate remaining local isRecord and sleep copies to canonical shared helpers where appropriate, then add a lint or check guard that prevents new local isRecord definitions in packages/agentplane/src except approved canonical guard modules.

## Scope

- In scope: Migrate remaining local isRecord and sleep copies to canonical shared helpers where appropriate, then add a lint or check guard that prevents new local isRecord definitions in packages/agentplane/src except approved canonical guard modules.
- Out of scope: unrelated refactors not required for "Finish shared guard and sleep deduplication".

## Plan

Finish utility dedup governance. Scope: migrate remaining local isRecord definitions in packages/agentplane/src where canonical imports are straightforward, replace integrate queue local sleep with shared concurrency helper, and add a lint/check guard against new local isRecord copies except approved canonical modules. Out of scope: packages/core and packages/recipes canonical guard design changes.

## Verify Steps

1. Run a guard command that counts local isRecord definitions in packages/agentplane/src and fails on newly introduced non-canonical copies. 2. Run targeted tests or typecheck covering migrated modules. 3. Run bun run lint:core -- changed guard/refactor files. 4. Run node .agentplane/policy/check-routing.mjs. 5. Document any intentionally retained local guard wrappers in task Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
