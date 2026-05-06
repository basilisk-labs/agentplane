---
id: "202605060915-RKCVW1"
title: "Expose blueprint context manifest in runner bundle"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605060915-N3MJJ1"
tags:
  - "blueprints"
  - "code"
  - "context"
  - "runner"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T10:04:48.784Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T10:06:34.117Z"
  updated_by: "CODER"
  note: "Verified: runner prepare now writes a dedicated context-manifest.json artifact and surfaces its path in runner outputs."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing explicit runner context manifest artifact in the runner/context epic branch; dependency N3MJJ1 is verified and committed in this stacked branch."
events:
  -
    type: "status"
    at: "2026-05-06T10:04:49.001Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing explicit runner context manifest artifact in the runner/context epic branch; dependency N3MJJ1 is verified and committed in this stacked branch."
  -
    type: "verify"
    at: "2026-05-06T10:06:34.117Z"
    author: "CODER"
    state: "ok"
    note: "Verified: runner prepare now writes a dedicated context-manifest.json artifact and surfaces its path in runner outputs."
doc_version: 3
doc_updated_at: "2026-05-06T10:06:34.123Z"
doc_updated_by: "CODER"
description: "Add context manifest entries explaining why policy modules, recipes, files, and tool profiles are available under the selected blueprint."
sections:
  Summary: |-
    Expose blueprint context manifest in runner bundle
    
    Add context manifest entries explaining why policy modules, recipes, files, and tool profiles are available under the selected blueprint.
  Scope: |-
    - In scope: Add context manifest entries explaining why policy modules, recipes, files, and tool profiles are available under the selected blueprint.
    - Out of scope: unrelated refactors not required for "Expose blueprint context manifest in runner bundle".
  Plan: "Expose the blueprint context manifest as a first-class runner artifact. Add a named context_manifest_path under the run directory, write the manifest during runner prepare, and surface the path in dry-run/show outputs while keeping the manifest embedded in bundle.json."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T10:06:34.117Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: runner prepare now writes a dedicated context-manifest.json artifact and surfaces its path in runner outputs.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:04:49.001Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-N3MJJ1-blueprint-runner-context/.agentplane/tasks/202605060915-RKCVW1/blueprint/resolved-snapshot.json
    - old_digest: b9f01066ae639befbc1493f5bc17bab1542cf00e204f5a27ff920484a96a5a7a
    - current_digest: b9f01066ae639befbc1493f5bc17bab1542cf00e204f5a27ff920484a96a5a7a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605060915-RKCVW1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/task-run-paths.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts; Result: pass; Evidence: 7 tests passed. Command: bun run typecheck; Result: pass. Command: bunx prettier --check touched runner files; Result: pass. Command: bunx eslint touched runner files; Result: pass. Command: git diff --check; Result: pass.
      Impact: Runner consumers can inspect why context was loaded through a dedicated manifest file instead of parsing the full bundle.
      Resolution: Added context_manifest_path, writes context-manifest.json from blueprint.contextManifest, and exposes the path in dry-run/show surfaces.
id_source: "generated"
---
