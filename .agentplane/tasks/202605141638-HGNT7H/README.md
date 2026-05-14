---
id: "202605141638-HGNT7H"
title: "Define schema canonical source contract"
status: "DOING"
priority: "low"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-05-14T18:02:19.069Z"
  updated_by: "CODER"
  note: "Schema canonical contract verified: sync-schemas now enforces directory inventory and drift contract: runtime schemas render into root/spec/core, static context schemas sync spec->core, and recipe/workflow schemas are root-only public schemas. Checks: schemas:check passed; targeted eslint passed; policy routing passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Defining and enforcing the schema canonical source contract inside the approved v0.6 audit follow-up batch worktree."
events:
  -
    type: "status"
    at: "2026-05-14T17:36:40.582Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Defining and enforcing the schema canonical source contract inside the approved v0.6 audit follow-up batch worktree."
  -
    type: "verify"
    at: "2026-05-14T18:02:19.069Z"
    author: "CODER"
    state: "ok"
    note: "Schema canonical contract verified: sync-schemas now enforces directory inventory and drift contract: runtime schemas render into root/spec/core, static context schemas sync spec->core, and recipe/workflow schemas are root-only public schemas. Checks: schemas:check passed; targeted eslint passed; policy routing passed."
doc_version: 3
doc_updated_at: "2026-05-14T18:02:19.108Z"
doc_updated_by: "CODER"
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
    ### 2026-05-14T18:02:19.069Z — VERIFY — ok

    By: CODER

    Note: Schema canonical contract verified: sync-schemas now enforces directory inventory and drift contract: runtime schemas render into root/spec/core, static context schemas sync spec->core, and recipe/workflow schemas are root-only public schemas. Checks: schemas:check passed; targeted eslint passed; policy routing passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T17:36:40.582Z, excerpt_hash=sha256:af31554d99bdfb4909f9d4816191fdd8cde520b5b96e31d390e1194913c06616

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141638-78JKTQ-v06-audit-followups/.agentplane/tasks/202605141638-HGNT7H/blueprint/resolved-snapshot.json
    - old_digest: dd830de8bf1b63755521618f7ce1e6d12b67fdf27ddaba12f4e5c3492dde6af9
    - current_digest: dd830de8bf1b63755521618f7ce1e6d12b67fdf27ddaba12f4e5c3492dde6af9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141638-HGNT7H

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The contract is executable in scripts/generate/sync-schemas.mjs rather than only documented prose.
      Impact: Unexpected schema files or missing coverage now fail schemas:check instead of silently expanding the de facto canon.
      Resolution: Added inventory sets and static context schema drift checks to schema sync/check.
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
### 2026-05-14T18:02:19.069Z — VERIFY — ok

By: CODER

Note: Schema canonical contract verified: sync-schemas now enforces directory inventory and drift contract: runtime schemas render into root/spec/core, static context schemas sync spec->core, and recipe/workflow schemas are root-only public schemas. Checks: schemas:check passed; targeted eslint passed; policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T17:36:40.582Z, excerpt_hash=sha256:af31554d99bdfb4909f9d4816191fdd8cde520b5b96e31d390e1194913c06616

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141638-78JKTQ-v06-audit-followups/.agentplane/tasks/202605141638-HGNT7H/blueprint/resolved-snapshot.json
- old_digest: dd830de8bf1b63755521618f7ce1e6d12b67fdf27ddaba12f4e5c3492dde6af9
- current_digest: dd830de8bf1b63755521618f7ce1e6d12b67fdf27ddaba12f4e5c3492dde6af9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141638-HGNT7H

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The contract is executable in scripts/generate/sync-schemas.mjs rather than only documented prose.
  Impact: Unexpected schema files or missing coverage now fail schemas:check instead of silently expanding the de facto canon.
  Resolution: Added inventory sets and static context schema drift checks to schema sync/check.
