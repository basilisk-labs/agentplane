---
id: "202605081306-MACWWY"
title: "Ignore bin declaration files in knip baseline"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "knip"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-08T13:07:32.749Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-08T13:45:01.562Z"
  updated_by: "CODER"
  note: "Verified: knip ignores package bin declaration files and baseline was refreshed for reviewed current unused-code debt after removing stale declaration-file false positives. Commands: bun run knip:check -- --update-baseline; bun run knip:check (OK, total=572); bun run lint:core; bun run release:check; ap doctor."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove knip false-positive bin declaration files from the release-cleanup baseline."
events:
  -
    type: "status"
    at: "2026-05-08T13:10:00.775Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove knip false-positive bin declaration files from the release-cleanup baseline."
  -
    type: "verify"
    at: "2026-05-08T13:45:01.562Z"
    author: "CODER"
    state: "ok"
    note: "Verified: knip ignores package bin declaration files and baseline was refreshed for reviewed current unused-code debt after removing stale declaration-file false positives. Commands: bun run knip:check -- --update-baseline; bun run knip:check (OK, total=572); bun run lint:core; bun run release:check; ap doctor."
doc_version: 3
doc_updated_at: "2026-05-08T13:45:01.568Z"
doc_updated_by: "CODER"
description: "Teach knip baseline handling to ignore package bin declaration files that are required as sibling TypeScript declarations for JavaScript bin imports, then refresh the baseline."
sections:
  Summary: |-
    Ignore bin declaration files in knip baseline
    
    Teach knip baseline handling to ignore package bin declaration files that are required as sibling TypeScript declarations for JavaScript bin imports, then refresh the baseline.
  Scope: |-
    - In scope: Teach knip baseline handling to ignore package bin declaration files that are required as sibling TypeScript declarations for JavaScript bin imports, then refresh the baseline.
    - Out of scope: unrelated refactors not required for "Ignore bin declaration files in knip baseline".
  Plan: "Related batch task included in primary 202605081305-MRT9N7. 1. Add a knip ignore for package bin declaration files that are required as sibling declarations for JavaScript bin modules. 2. Refresh/check the knip baseline so false-positive file entries disappear without masking real unused exports/types. 3. Verify knip baseline check and lint."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-08T13:45:01.562Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: knip ignores package bin declaration files and baseline was refreshed for reviewed current unused-code debt after removing stale declaration-file false positives. Commands: bun run knip:check -- --update-baseline; bun run knip:check (OK, total=572); bun run lint:core; bun run release:check; ap doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T13:10:00.802Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081305-MRT9N7-release-cleanup/.agentplane/tasks/202605081306-MACWWY/blueprint/resolved-snapshot.json
    - old_digest: 35c083bafec3d5111d309e85957fe4f2eb5b94a13af0e47447000f2a9eb74ef3
    - current_digest: 35c083bafec3d5111d309e85957fe4f2eb5b94a13af0e47447000f2a9eb74ef3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081306-MACWWY
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
