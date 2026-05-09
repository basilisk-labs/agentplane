---
id: "202605091906-JY4YSA"
title: "Support packaged blueprint catalogs"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T19:06:25.601Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T19:15:46.664Z"
  updated_by: "CODER"
  note: "Packaged blueprint catalog support verified."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing package-style blueprint catalog parsing and install support in the task worktree while preserving existing source catalog behavior."
events:
  -
    type: "status"
    at: "2026-05-09T19:07:04.212Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing package-style blueprint catalog parsing and install support in the task worktree while preserving existing source catalog behavior."
  -
    type: "verify"
    at: "2026-05-09T19:15:46.664Z"
    author: "CODER"
    state: "ok"
    note: "Packaged blueprint catalog support verified."
doc_version: 3
doc_updated_at: "2026-05-09T19:15:46.696Z"
doc_updated_by: "CODER"
description: "Teach AgentPlane CLI to consume recipes-like blueprint release indexes with versioned package tarballs and checksums while preserving existing source catalog compatibility."
sections:
  Summary: |-
    Support packaged blueprint catalogs
    
    Teach AgentPlane CLI to consume recipes-like blueprint release indexes with versioned package tarballs and checksums while preserving existing source catalog compatibility.
  Scope: |-
    - In scope: Teach AgentPlane CLI to consume recipes-like blueprint release indexes with versioned package tarballs and checksums while preserving existing source catalog compatibility.
    - Out of scope: unrelated refactors not required for "Support packaged blueprint catalogs".
  Plan: "Add package-style blueprint catalog support while preserving source catalog compatibility: parse remote release indexes with versions/url/sha256, display package metadata in catalog list/info, install selected blueprint packages by downloading tarballs and verifying checksums, keep existing path-based catalog installs working, and cover behavior with focused CLI tests."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T19:15:46.664Z — VERIFY — ok
    
    By: CODER
    
    Note: Packaged blueprint catalog support verified.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T19:07:04.250Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bun vitest packages/agentplane/src/cli/run-cli.core.blueprint.test.ts. Result: pass. Evidence: 23 tests passed, including packaged blueprint install test. Scope: blueprint catalog refresh/install CLI behavior.
    
    Command: bun --filter agentplane typecheck. Result: pass. Evidence: agentplane typecheck exited with code 0. Scope: TypeScript signatures for AgentPlane package.
    
    Command: node .agentplane/policy/check-routing.mjs && ap doctor. Result: pass. Evidence: policy routing OK; doctor OK with errors=0 warnings=0. Scope: policy routing and repo-local runtime health.
    
    Command: published package E2E using AGENTPLANE_HOME inside worktree and index https://raw.githubusercontent.com/basilisk-labs/agentplane-blueprints/ed6021b/index.json. Result: pass. Evidence: catalog sees coding-twitter 0.1.1; install wrote coding.twitter and project-local blueprint-catalog provenance. Scope: release-index parsing, tarball checksum verification, archive extraction, install, and provenance copy.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091906-JY4YSA-packaged-blueprint-catalog/.agentplane/tasks/202605091906-JY4YSA/blueprint/resolved-snapshot.json
    - old_digest: 39ecd490d3342aec503d5dbb350e30eed2dfa3594cffe2712e1df396361825ed
    - current_digest: 39ecd490d3342aec503d5dbb350e30eed2dfa3594cffe2712e1df396361825ed
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091906-JY4YSA
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
