---
id: "202605061515-2W42MM"
title: "Expose blueprint discoverability in CLI"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "cli"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T15:16:36.121Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T15:25:29.806Z"
  updated_by: "CODER"
  note: "Verified: blueprint examples command, quickstart hint, CLI docs generation, targeted tests, typecheck, doctor, routing, release gate, and diff check passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement blueprint discoverability surfaces, docs examples, and prerelease release-version validation in the approved batch worktree."
events:
  -
    type: "status"
    at: "2026-05-06T15:17:10.889Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement blueprint discoverability surfaces, docs examples, and prerelease release-version validation in the approved batch worktree."
  -
    type: "verify"
    at: "2026-05-06T15:25:29.806Z"
    author: "CODER"
    state: "ok"
    note: "Verified: blueprint examples command, quickstart hint, CLI docs generation, targeted tests, typecheck, doctor, routing, release gate, and diff check passed."
doc_version: 3
doc_updated_at: "2026-05-06T15:25:29.828Z"
doc_updated_by: "CODER"
description: "Make blueprint commands easier to find from quickstart, task surfaces, and examples without changing blueprint execution semantics."
sections:
  Summary: |-
    Expose blueprint discoverability in CLI
    
    Make blueprint commands easier to find from quickstart, task surfaces, and examples without changing blueprint execution semantics.
  Scope: |-
    - In scope: Make blueprint commands easier to find from quickstart, task surfaces, and examples without changing blueprint execution semantics.
    - Out of scope: unrelated refactors not required for "Expose blueprint discoverability in CLI".
  Plan: "Primary batch branch for blueprint usability after 0.5 rc1. Scope: expose blueprint discovery in quickstart/help/task inspection surfaces; add a concrete examples command or equivalent visible examples; keep route selection semantics unchanged. Batch includes docs task 202605061515-EPEVHQ and release-gate task 202605061515-WJWM2W. Verification: targeted blueprint/CLI tests, release version/parity checks for prerelease, doctor, typecheck, diff check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T15:25:29.806Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: blueprint examples command, quickstart hint, CLI docs generation, targeted tests, typecheck, doctor, routing, release gate, and diff check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T15:17:10.889Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605061515-2W42MM-blueprint-discoverability/.agentplane/tasks/202605061515-2W42MM/blueprint/resolved-snapshot.json
    - old_digest: 30aa560f36ac204e8a2f5a40fb216dac8b44b844c39595878399b10ab4c1dc25
    - current_digest: 30aa560f36ac204e8a2f5a40fb216dac8b44b844c39595878399b10ab4c1dc25
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605061515-2W42MM
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
