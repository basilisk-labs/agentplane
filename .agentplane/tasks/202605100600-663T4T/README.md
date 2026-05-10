---
id: "202605100600-663T4T"
title: "Audit v0.5 readiness and fix blockers"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "recipes"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-10T06:01:21.719Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: auditing v0.5 readiness and fixing blueprint storage so external blueprint packages cache in the user AgentPlane home while project .agentplane/blueprints keeps initialized definitions."
events:
  -
    type: "status"
    at: "2026-05-10T06:18:09.484Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: auditing v0.5 readiness and fixing blueprint storage so external blueprint packages cache in the user AgentPlane home while project .agentplane/blueprints keeps initialized definitions."
doc_version: 3
doc_updated_at: "2026-05-10T06:18:09.611Z"
doc_updated_by: "CODER"
description: "Run release-readiness audit for v0.5, verify legacy and new behavior, especially ap init in empty and existing projects plus local/remote recipe and blueprint installation paths; fix blocking code issues found during the audit."
sections:
  Summary: |-
    Audit v0.5 readiness and fix blockers
    
    Run release-readiness audit for v0.5, verify legacy and new behavior, especially ap init in empty and existing projects plus local/remote recipe and blueprint installation paths; fix blocking code issues found during the audit.
  Scope: |-
    - In scope: Run release-readiness audit for v0.5, verify legacy and new behavior, especially ap init in empty and existing projects plus local/remote recipe and blueprint installation paths; fix blocking code issues found during the audit.
    - Out of scope: unrelated refactors not required for "Audit v0.5 readiness and fix blockers".
  Plan: "Audit plan: version target v0.5.0; primary evidence covers init in empty and existing repositories, recipe remote install/list and project install behavior, blueprint catalog/list/install/validate behavior, release gates, and old/new CLI regression checks. Fix blockers found inside the touched code/test/docs surface, then record command evidence and residual gaps in Findings."
  Verify Steps: |-
    1. Run release and policy gates: bun run release:check, node .agentplane/policy/check-routing.mjs, ap doctor. Expected: all pass or any failure is fixed before release.
    2. Run focused regression tests for init, recipes, blueprints, release, and task lifecycle. Expected: empty-project init, existing-code init, remote recipe listing/install, project recipe install, remote blueprint listing/install, project blueprint validation, and legacy CLI flows are covered.
    3. Run packaged CLI smoke tests in temporary empty and existing-code directories. Expected: ap initializes both shapes and can install/list recipes and blueprints without relying on repo-only paths.
    4. Inspect docs/code drift for v0.5, recipes, blueprints, init, and legacy naming. Expected: stale or misleading release blockers are fixed or listed with rationale in Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
