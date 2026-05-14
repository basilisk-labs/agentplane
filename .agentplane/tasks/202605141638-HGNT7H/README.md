---
id: "202605141638-HGNT7H"
title: "Define schema canonical source contract"
status: "TODO"
priority: "low"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "schemas"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T16:41:06.597Z"
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
doc_updated_at: "2026-05-14T16:40:12.908Z"
doc_updated_by: "PLANNER"
description: "Resolve the three schema directory source-of-truth ambiguity across root schemas, packages/spec/schemas, and packages/core/schemas by documenting or enforcing a single generated/canonical flow, including recipe/workflow and context schema coverage."
sections:
  Summary: |-
    Define schema canonical source contract
    
    Resolve the three schema directory source-of-truth ambiguity across root schemas, packages/spec/schemas, and packages/core/schemas by documenting or enforcing a single generated/canonical flow, including recipe/workflow and context schema coverage.
  Scope: |-
    - In scope: Resolve the three schema directory source-of-truth ambiguity across root schemas, packages/spec/schemas, and packages/core/schemas by documenting or enforcing a single generated/canonical flow, including recipe/workflow and context schema coverage.
    - Out of scope: unrelated refactors not required for "Define schema canonical source contract".
  Plan: "Define and enforce schema source-of-truth. Scope: current schema directory inventory, decision for canonical/generated directories, sync/check updates if required, and tests or checks proving root/spec/core schema drift is intentional or impossible. Out of scope: unrelated schema shape changes."
  Verify Steps: "1. Inventory schemas in root, packages/spec/schemas, and packages/core/schemas and record the intended canonical/generated relationship. 2. Update sync/check logic or documentation so recipe/workflow/context schema coverage is explicit. 3. Run schema sync/check tests or scripts. 4. Run bun run lint:core -- changed schema tooling/docs files if applicable. 5. Run node .agentplane/policy/check-routing.mjs."
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

Define schema canonical source contract

Resolve the three schema directory source-of-truth ambiguity across root schemas, packages/spec/schemas, and packages/core/schemas by documenting or enforcing a single generated/canonical flow, including recipe/workflow and context schema coverage.

## Scope

- In scope: Resolve the three schema directory source-of-truth ambiguity across root schemas, packages/spec/schemas, and packages/core/schemas by documenting or enforcing a single generated/canonical flow, including recipe/workflow and context schema coverage.
- Out of scope: unrelated refactors not required for "Define schema canonical source contract".

## Plan

Define and enforce schema source-of-truth. Scope: current schema directory inventory, decision for canonical/generated directories, sync/check updates if required, and tests or checks proving root/spec/core schema drift is intentional or impossible. Out of scope: unrelated schema shape changes.

## Verify Steps

1. Inventory schemas in root, packages/spec/schemas, and packages/core/schemas and record the intended canonical/generated relationship. 2. Update sync/check logic or documentation so recipe/workflow/context schema coverage is explicit. 3. Run schema sync/check tests or scripts. 4. Run bun run lint:core -- changed schema tooling/docs files if applicable. 5. Run node .agentplane/policy/check-routing.mjs.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
