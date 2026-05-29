---
id: "202605291917-4RF08R"
title: "Expose provider-safe task projection fields"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T19:35:49.139Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T19:50:30.349Z"
  updated_by: "CODER"
  note: "Implemented provider-safe task projection helper and tests. Verified that projection emits only summary/count/presence/link metadata and excludes full plan, verification log, findings, raw evidence paths, and private payloads."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing provider-safe projection fields inside the shared sync contract branch, keeping sensitive task sections AgentPlane-owned."
events:
  -
    type: "status"
    at: "2026-05-29T19:36:42.813Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing provider-safe projection fields inside the shared sync contract branch, keeping sensitive task sections AgentPlane-owned."
  -
    type: "verify"
    at: "2026-05-29T19:50:30.349Z"
    author: "CODER"
    state: "ok"
    note: "Implemented provider-safe task projection helper and tests. Verified that projection emits only summary/count/presence/link metadata and excludes full plan, verification log, findings, raw evidence paths, and private payloads."
doc_version: 3
doc_updated_at: "2026-05-29T19:50:30.375Z"
doc_updated_by: "CODER"
description: "Add a core projection helper that derives provider-safe summary fields from task README, frontmatter, ACR, and verification state so cloud connectors can publish useful board fields without exporting full plans, findings, or raw evidence."
sections:
  Summary: |-
    Expose provider-safe task projection fields

    Add a core projection helper that derives provider-safe summary fields from task README, frontmatter, ACR, and verification state so cloud connectors can publish useful board fields without exporting full plans, findings, or raw evidence.
  Scope: |-
    - In scope: Add a core projection helper that derives provider-safe summary fields from task README, frontmatter, ACR, and verification state so cloud connectors can publish useful board fields without exporting full plans, findings, or raw evidence.
    - Out of scope: unrelated refactors not required for "Expose provider-safe task projection fields".
  Plan: |-
    1. Define provider-safe projection fields derived from task frontmatter, README sections, verification state, rollback presence, approval state, ACR metadata, and update timestamps.
    2. Implement a core helper/API that returns summary-level fields for cloud connectors while keeping full plan text, findings, raw evidence, and private logs AgentPlane-owned.
    3. Document the projection boundary and add tests for redaction, empty sections, stale ACR, and backwards-compatible tasks.
  Verify Steps: |-
    1. Run projection helper tests over tasks with full, partial, and empty README sections. Expected: only safe summary fields are emitted.
    2. Verify sensitive sections. Expected: full Plan, Verification log details, Findings, raw evidence, and private payloads are excluded or represented only by presence/count/link metadata.
    3. Run schema/docs checks. Expected: cloud-sync can consume the helper without re-parsing Markdown or inventing provider-specific README fields.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T19:50:30.349Z — VERIFY — ok

    By: CODER

    Note: Implemented provider-safe task projection helper and tests. Verified that projection emits only summary/count/presence/link metadata and excludes full plan, verification log, findings, raw evidence paths, and private payloads.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T19:36:42.813Z, excerpt_hash=sha256:6018dd1afcd76949257f0e8373720162539a3fa5ad6ff4e8afbc726551642cfb

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291916-5Q6T1E-task-sync-contract/.agentplane/tasks/202605291917-4RF08R/blueprint/resolved-snapshot.json
    - old_digest: 82a2bae36d891a939683e5e0f8c3fdcc1fe1bd757eb0050b22b650c7fa3b12fa
    - current_digest: 82a2bae36d891a939683e5e0f8c3fdcc1fe1bd757eb0050b22b650c7fa3b12fa
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605291917-4RF08R

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Expose provider-safe task projection fields

Add a core projection helper that derives provider-safe summary fields from task README, frontmatter, ACR, and verification state so cloud connectors can publish useful board fields without exporting full plans, findings, or raw evidence.

## Scope

- In scope: Add a core projection helper that derives provider-safe summary fields from task README, frontmatter, ACR, and verification state so cloud connectors can publish useful board fields without exporting full plans, findings, or raw evidence.
- Out of scope: unrelated refactors not required for "Expose provider-safe task projection fields".

## Plan

1. Define provider-safe projection fields derived from task frontmatter, README sections, verification state, rollback presence, approval state, ACR metadata, and update timestamps.
2. Implement a core helper/API that returns summary-level fields for cloud connectors while keeping full plan text, findings, raw evidence, and private logs AgentPlane-owned.
3. Document the projection boundary and add tests for redaction, empty sections, stale ACR, and backwards-compatible tasks.

## Verify Steps

1. Run projection helper tests over tasks with full, partial, and empty README sections. Expected: only safe summary fields are emitted.
2. Verify sensitive sections. Expected: full Plan, Verification log details, Findings, raw evidence, and private payloads are excluded or represented only by presence/count/link metadata.
3. Run schema/docs checks. Expected: cloud-sync can consume the helper without re-parsing Markdown or inventing provider-specific README fields.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T19:50:30.349Z — VERIFY — ok

By: CODER

Note: Implemented provider-safe task projection helper and tests. Verified that projection emits only summary/count/presence/link metadata and excludes full plan, verification log, findings, raw evidence paths, and private payloads.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T19:36:42.813Z, excerpt_hash=sha256:6018dd1afcd76949257f0e8373720162539a3fa5ad6ff4e8afbc726551642cfb

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605291916-5Q6T1E-task-sync-contract/.agentplane/tasks/202605291917-4RF08R/blueprint/resolved-snapshot.json
- old_digest: 82a2bae36d891a939683e5e0f8c3fdcc1fe1bd757eb0050b22b650c7fa3b12fa
- current_digest: 82a2bae36d891a939683e5e0f8c3fdcc1fe1bd757eb0050b22b650c7fa3b12fa
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605291917-4RF08R

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
