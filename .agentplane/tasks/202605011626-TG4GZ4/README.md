---
id: "202605011626-TG4GZ4"
title: "Add Homebrew tap publication module"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  updated_at: "2026-05-01T16:29:08.550Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T17:13:07.600Z"
  updated_by: "CODER"
  note: "Homebrew tap module verified: release:homebrew:check passed; release:distribution:check passed; workflows:command-check passed; docs:scripts:check passed; publish workflow contract test passed; lint:core passed; targeted Prettier check passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add Homebrew tap publication rendering and credentials-gated release workflow evidence from release-distribution.json."
events:
  -
    type: "status"
    at: "2026-05-01T17:10:15.206Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add Homebrew tap publication rendering and credentials-gated release workflow evidence from release-distribution.json."
  -
    type: "verify"
    at: "2026-05-01T17:13:07.600Z"
    author: "CODER"
    state: "ok"
    note: "Homebrew tap module verified: release:homebrew:check passed; release:distribution:check passed; workflows:command-check passed; docs:scripts:check passed; publish workflow contract test passed; lint:core passed; targeted Prettier check passed."
doc_version: 3
doc_updated_at: "2026-05-01T17:13:07.603Z"
doc_updated_by: "CODER"
description: "Add a release module that can update an AgentPlane Homebrew tap formula from the published npm tarball, checksum, and release manifest without blocking unrelated channels."
sections:
  Summary: |-
    Add Homebrew tap publication module
    
    Add a release module that can update an AgentPlane Homebrew tap formula from the published npm tarball, checksum, and release manifest without blocking unrelated channels.
  Scope: |-
    - In scope: Add a release module that can update an AgentPlane Homebrew tap formula from the published npm tarball, checksum, and release manifest without blocking unrelated channels.
    - Out of scope: unrelated refactors not required for "Add Homebrew tap publication module".
  Plan: "Plan: add a Homebrew tap publication module that renders Formula/agentplane.rb from release-distribution.json, supports dry-run/check mode, and can open or update a tap PR when credentials are configured. Verification: distribution check and workflow command check."
  Verify Steps: |-
    1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run workflows:command-check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T17:13:07.600Z — VERIFY — ok
    
    By: CODER
    
    Note: Homebrew tap module verified: release:homebrew:check passed; release:distribution:check passed; workflows:command-check passed; docs:scripts:check passed; publish workflow contract test passed; lint:core passed; targeted Prettier check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T17:10:15.206Z, excerpt_hash=sha256:fef2300e08f7c4b9ce2fe68d00d1060c458c74174c417e3488a171d9279a6a1d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added scripts/render-homebrew-formula.mjs, release:homebrew:check, Homebrew formula rendering in publish.yml, and homebrew-module workflow artifact upload. The module records skipped_missing_credentials until HOMEBREW_TAP_TOKEN is configured.
      Impact: The next release can produce a Homebrew formula and channel evidence from release-distribution.json, even before tap credentials are installed.
      Resolution: Commit the Homebrew renderer, workflow wiring, scripts README update, and workflow contract test update.
id_source: "generated"
---
## Summary

Add Homebrew tap publication module

Add a release module that can update an AgentPlane Homebrew tap formula from the published npm tarball, checksum, and release manifest without blocking unrelated channels.

## Scope

- In scope: Add a release module that can update an AgentPlane Homebrew tap formula from the published npm tarball, checksum, and release manifest without blocking unrelated channels.
- Out of scope: unrelated refactors not required for "Add Homebrew tap publication module".

## Plan

Plan: add a Homebrew tap publication module that renders Formula/agentplane.rb from release-distribution.json, supports dry-run/check mode, and can open or update a tap PR when credentials are configured. Verification: distribution check and workflow command check.

## Verify Steps

1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run workflows:command-check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T17:13:07.600Z — VERIFY — ok

By: CODER

Note: Homebrew tap module verified: release:homebrew:check passed; release:distribution:check passed; workflows:command-check passed; docs:scripts:check passed; publish workflow contract test passed; lint:core passed; targeted Prettier check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T17:10:15.206Z, excerpt_hash=sha256:fef2300e08f7c4b9ce2fe68d00d1060c458c74174c417e3488a171d9279a6a1d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added scripts/render-homebrew-formula.mjs, release:homebrew:check, Homebrew formula rendering in publish.yml, and homebrew-module workflow artifact upload. The module records skipped_missing_credentials until HOMEBREW_TAP_TOKEN is configured.
  Impact: The next release can produce a Homebrew formula and channel evidence from release-distribution.json, even before tap credentials are installed.
  Resolution: Commit the Homebrew renderer, workflow wiring, scripts README update, and workflow contract test update.
