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
  state: "ok"
  updated_at: "2026-05-10T07:00:30.280Z"
  updated_by: "CODER"
  note: "Verified v0.5 readiness fixes: release:check passed; typecheck passed; docs:cli:check and docs:recipes:check passed; doctor and routing policy passed; focused init/blueprint tests passed (64); recipe tests passed (24); task lifecycle test passed (12); release/ACR/blueprint/task-run tests passed (30); packaged CLI smoke passed for empty and existing-code projects with HTTP blueprint catalog refresh, AGENTPLANE_HOME blueprint-catalog cache, project .agentplane/blueprints materialization, and no project .agentplane/blueprint-catalog."
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
  -
    type: "verify"
    at: "2026-05-10T07:00:30.280Z"
    author: "CODER"
    state: "ok"
    note: "Verified v0.5 readiness fixes: release:check passed; typecheck passed; docs:cli:check and docs:recipes:check passed; doctor and routing policy passed; focused init/blueprint tests passed (64); recipe tests passed (24); task lifecycle test passed (12); release/ACR/blueprint/task-run tests passed (30); packaged CLI smoke passed for empty and existing-code projects with HTTP blueprint catalog refresh, AGENTPLANE_HOME blueprint-catalog cache, project .agentplane/blueprints materialization, and no project .agentplane/blueprint-catalog."
doc_version: 3
doc_updated_at: "2026-05-10T07:00:30.289Z"
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
    ### 2026-05-10T07:00:30.280Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified v0.5 readiness fixes: release:check passed; typecheck passed; docs:cli:check and docs:recipes:check passed; doctor and routing policy passed; focused init/blueprint tests passed (64); recipe tests passed (24); task lifecycle test passed (12); release/ACR/blueprint/task-run tests passed (30); packaged CLI smoke passed for empty and existing-code projects with HTTP blueprint catalog refresh, AGENTPLANE_HOME blueprint-catalog cache, project .agentplane/blueprints materialization, and no project .agentplane/blueprint-catalog.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-10T06:18:09.611Z, excerpt_hash=sha256:baf7ca17217dbd3a03c42a38f42c2509173467c9667876883f956990f0e7e1e9
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605100600-663T4T-v05-readiness/.agentplane/tasks/202605100600-663T4T/blueprint/resolved-snapshot.json
    - old_digest: 1db5b0a6ded52485e89ed1b0363ab2cc32fd8dcf18c1a66736b1949928d5e1d4
    - current_digest: 1db5b0a6ded52485e89ed1b0363ab2cc32fd8dcf18c1a66736b1949928d5e1d4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605100600-663T4T
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Blueprint installs now cache packages in AGENTPLANE_HOME/blueprint-catalog and project init only materializes selected blueprints/trust config under .agentplane/blueprints. Init also treats legacy .agentplane/config.json as an overwrite conflict while WORKFLOW.md remains canonical.
      Impact: Fixes user-reported file-placement confusion and removes the stale release gate that checked the old ACR command file instead of the ACR generator.
      Resolution: Commits: a71f8ead0, 427139ac9, b1a462dfd.
id_source: "generated"
---
