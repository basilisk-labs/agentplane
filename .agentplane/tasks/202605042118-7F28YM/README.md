---
id: "202605042118-7F28YM"
title: "Release v0.4.4 with Bun binaries"
result_summary: "Merged via PR #897."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T21:18:32.240Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T00:30:22.679Z"
  updated_by: "INTEGRATOR"
  note: "Release v0.4.4 published on npm, GitHub Release Bun assets, GHCR hosted publish step, Homebrew tap, Scoop bucket, and setup-agentplane. Publish run: https://github.com/basilisk-labs/agentplane/actions/runs/25351042144."
commit:
  hash: "a117e4b5bed136a753feb5b11d590518d3161f4a"
  message: "Merge pull request #897 from basilisk-labs/task/202605042118-7F28YM/bun-patch-release"
comments:
  -
    author: "CODER"
    body: "Start: implementing v0.4.4 release preparation with Bun single-file executables as the binary distribution channel for GitHub Release assets, install scripts, Homebrew, Scoop, and setup-agentplane."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #897 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-04T21:18:40.721Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing v0.4.4 release preparation with Bun single-file executables as the binary distribution channel for GitHub Release assets, install scripts, Homebrew, Scoop, and setup-agentplane."
  -
    type: "status"
    at: "2026-05-05T00:17:42.613Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #897 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
  -
    type: "verify"
    at: "2026-05-05T00:30:22.679Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Release v0.4.4 published on npm, GitHub Release Bun assets, GHCR hosted publish step, Homebrew tap, Scoop bucket, and setup-agentplane. Publish run: https://github.com/basilisk-labs/agentplane/actions/runs/25351042144."
doc_version: 3
doc_updated_at: "2026-05-05T00:30:22.682Z"
doc_updated_by: "INTEGRATOR"
description: "Prepare and publish the next patch release using Bun single-file executable assets as the binary distribution channel for all platforms and external installers."
sections:
  Summary: |-
    Release v0.4.4 with Bun binaries
    
    Prepare and publish the next patch release using Bun single-file executable assets as the binary distribution channel for all platforms and external installers.
  Scope: |-
    - In scope: Prepare and publish the next patch release using Bun single-file executable assets as the binary distribution channel for all platforms and external installers.
    - Out of scope: unrelated refactors not required for "Release v0.4.4 with Bun binaries".
  Plan: "Release plan: version=0.4.4, tag=v0.4.4, scope=patch release; switch binary distribution to Bun single-file executable assets for GitHub Release, install scripts, Homebrew, Scoop, setup-agentplane, and all platform installer metadata; keep npm package publish intact; verify release metadata/assets parity and published channels after workflow completion."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T00:30:22.679Z — VERIFY — ok
    
    By: INTEGRATOR
    
    Note: Release v0.4.4 published on npm, GitHub Release Bun assets, GHCR hosted publish step, Homebrew tap, Scoop bucket, and setup-agentplane. Publish run: https://github.com/basilisk-labs/agentplane/actions/runs/25351042144.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T00:17:42.619Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Release v0.4.4 with Bun binaries

Prepare and publish the next patch release using Bun single-file executable assets as the binary distribution channel for all platforms and external installers.

## Scope

- In scope: Prepare and publish the next patch release using Bun single-file executable assets as the binary distribution channel for all platforms and external installers.
- Out of scope: unrelated refactors not required for "Release v0.4.4 with Bun binaries".

## Plan

Release plan: version=0.4.4, tag=v0.4.4, scope=patch release; switch binary distribution to Bun single-file executable assets for GitHub Release, install scripts, Homebrew, Scoop, setup-agentplane, and all platform installer metadata; keep npm package publish intact; verify release metadata/assets parity and published channels after workflow completion.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T00:30:22.679Z — VERIFY — ok

By: INTEGRATOR

Note: Release v0.4.4 published on npm, GitHub Release Bun assets, GHCR hosted publish step, Homebrew tap, Scoop bucket, and setup-agentplane. Publish run: https://github.com/basilisk-labs/agentplane/actions/runs/25351042144.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T00:17:42.619Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
