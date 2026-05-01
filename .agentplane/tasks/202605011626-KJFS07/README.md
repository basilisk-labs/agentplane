---
id: "202605011626-KJFS07"
title: "Add Scoop bucket publication module"
result_summary: "Merged via PR #719."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605011626-HXH0R5"
tags:
  - "code"
  - "release"
verify:
  - "bun run release:distribution:check"
  - "bun run workflows:command-check"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T16:29:32.319Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T17:22:11.081Z"
  updated_by: "CODER"
  note: "Scoop bucket module renders agentplane.json and scoop-result.json from release-distribution.json; publish workflow uploads scoop-module artifact and contract test covers the route."
commit:
  hash: "3bffd65a076178e7b344a8c67f85f51804548174"
  message: "Merge pull request #719 from basilisk-labs/task/202605011626-KJFS07/scoop-bucket-publication"
comments:
  -
    author: "CODER"
    body: "Start: add Scoop bucket manifest rendering and credentials-gated release workflow evidence from release-distribution.json."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #719 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T17:17:21.033Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add Scoop bucket manifest rendering and credentials-gated release workflow evidence from release-distribution.json."
  -
    type: "verify"
    at: "2026-05-01T17:22:11.081Z"
    author: "CODER"
    state: "ok"
    note: "Scoop bucket module renders agentplane.json and scoop-result.json from release-distribution.json; publish workflow uploads scoop-module artifact and contract test covers the route."
  -
    type: "status"
    at: "2026-05-01T17:25:07.552Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #719 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T17:25:07.558Z"
doc_updated_by: "INTEGRATOR"
description: "Add a release module that can update an AgentPlane Scoop manifest from the published npm tarball, checksum, and release manifest while keeping Windows publication recoverable."
sections:
  Summary: |-
    Add Scoop bucket publication module
    
    Add a release module that can update an AgentPlane Scoop manifest from the published npm tarball, checksum, and release manifest while keeping Windows publication recoverable.
  Scope: |-
    - In scope: Add a release module that can update an AgentPlane Scoop manifest from the published npm tarball, checksum, and release manifest while keeping Windows publication recoverable.
    - Out of scope: unrelated refactors not required for "Add Scoop bucket publication module".
  Plan: "Plan: add a Scoop bucket publication module that renders agentplane.json from release-distribution.json, supports dry-run/check mode, and can open or update a bucket PR when credentials are configured. Verification: distribution check and workflow command check."
  Verify Steps: |-
    1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run workflows:command-check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T17:22:11.081Z — VERIFY — ok
    
    By: CODER
    
    Note: Scoop bucket module renders agentplane.json and scoop-result.json from release-distribution.json; publish workflow uploads scoop-module artifact and contract test covers the route.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T17:17:21.033Z, excerpt_hash=sha256:fef2300e08f7c4b9ce2fe68d00d1060c458c74174c417e3488a171d9279a6a1d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks: bun run release:scoop:check; bun run release:distribution:check; bun run workflows:command-check; bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun run docs:scripts:check; bun run lint:core; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check.
      Impact: Next release will expose Scoop bucket evidence in the publish job and fail less opaquely when SCOOP_BUCKET_TOKEN is missing.
      Resolution: Scoop publication remains credentials-gated; missing credentials are represented as skipped_missing_credentials until the bucket token is configured.
id_source: "generated"
---
## Summary

Add Scoop bucket publication module

Add a release module that can update an AgentPlane Scoop manifest from the published npm tarball, checksum, and release manifest while keeping Windows publication recoverable.

## Scope

- In scope: Add a release module that can update an AgentPlane Scoop manifest from the published npm tarball, checksum, and release manifest while keeping Windows publication recoverable.
- Out of scope: unrelated refactors not required for "Add Scoop bucket publication module".

## Plan

Plan: add a Scoop bucket publication module that renders agentplane.json from release-distribution.json, supports dry-run/check mode, and can open or update a bucket PR when credentials are configured. Verification: distribution check and workflow command check.

## Verify Steps

1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run workflows:command-check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T17:22:11.081Z — VERIFY — ok

By: CODER

Note: Scoop bucket module renders agentplane.json and scoop-result.json from release-distribution.json; publish workflow uploads scoop-module artifact and contract test covers the route.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T17:17:21.033Z, excerpt_hash=sha256:fef2300e08f7c4b9ce2fe68d00d1060c458c74174c417e3488a171d9279a6a1d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Checks: bun run release:scoop:check; bun run release:distribution:check; bun run workflows:command-check; bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun run docs:scripts:check; bun run lint:core; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check.
  Impact: Next release will expose Scoop bucket evidence in the publish job and fail less opaquely when SCOOP_BUCKET_TOKEN is missing.
  Resolution: Scoop publication remains credentials-gated; missing credentials are represented as skipped_missing_credentials until the bucket token is configured.
