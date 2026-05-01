---
id: "202605011627-6B8QDR"
title: "Add setup-agentplane release path"
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
  updated_at: "2026-05-01T16:30:17.686Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T18:06:15.627Z"
  updated_by: "CODER"
  note: "setup-agentplane module renders a composite GitHub Action bundle and setup-agentplane-result.json from release-distribution.json; publish workflow uploads setup-agentplane-module evidence."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add setup-agentplane GitHub Action release module and workflow evidence."
events:
  -
    type: "status"
    at: "2026-05-01T17:57:05.068Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add setup-agentplane GitHub Action release module and workflow evidence."
  -
    type: "verify"
    at: "2026-05-01T18:06:15.627Z"
    author: "CODER"
    state: "ok"
    note: "setup-agentplane module renders a composite GitHub Action bundle and setup-agentplane-result.json from release-distribution.json; publish workflow uploads setup-agentplane-module evidence."
doc_version: 3
doc_updated_at: "2026-05-01T18:06:15.662Z"
doc_updated_by: "CODER"
description: "Add the release path and contract for a setup-agentplane GitHub Action so CI users can install exact AgentPlane versions from the release distribution manifest."
sections:
  Summary: |-
    Add setup-agentplane release path
    
    Add the release path and contract for a setup-agentplane GitHub Action so CI users can install exact AgentPlane versions from the release distribution manifest.
  Scope: |-
    - In scope: Add the release path and contract for a setup-agentplane GitHub Action so CI users can install exact AgentPlane versions from the release distribution manifest.
    - Out of scope: unrelated refactors not required for "Add setup-agentplane release path".
  Plan: "Plan: add the setup-agentplane GitHub Action release contract and scaffold so CI users can resolve exact AgentPlane versions from the release manifest. Keep external repository publication credentials-gated and observable. Verification: distribution check and workflow command check."
  Verify Steps: |-
    1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run workflows:command-check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T18:06:15.627Z — VERIFY — ok
    
    By: CODER
    
    Note: setup-agentplane module renders a composite GitHub Action bundle and setup-agentplane-result.json from release-distribution.json; publish workflow uploads setup-agentplane-module evidence.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T17:57:05.068Z, excerpt_hash=sha256:fef2300e08f7c4b9ce2fe68d00d1060c458c74174c417e3488a171d9279a6a1d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks: bun run release:setup-action:check; generated action.yml inspection; bun run release:distribution:check; bun run workflows:command-check; bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun run docs:scripts:check; bunx prettier --check touched files; bun run lint:core; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check.
      Impact: Next release will expose a setup-agentplane action bundle for exact-version CI installs and record missing SETUP_AGENTPLANE_TOKEN as explicit module status.
      Resolution: Generated action installs through the release install.sh asset so checksum verification stays in the shared release installer path.
id_source: "generated"
---
## Summary

Add setup-agentplane release path

Add the release path and contract for a setup-agentplane GitHub Action so CI users can install exact AgentPlane versions from the release distribution manifest.

## Scope

- In scope: Add the release path and contract for a setup-agentplane GitHub Action so CI users can install exact AgentPlane versions from the release distribution manifest.
- Out of scope: unrelated refactors not required for "Add setup-agentplane release path".

## Plan

Plan: add the setup-agentplane GitHub Action release contract and scaffold so CI users can resolve exact AgentPlane versions from the release manifest. Keep external repository publication credentials-gated and observable. Verification: distribution check and workflow command check.

## Verify Steps

1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run workflows:command-check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T18:06:15.627Z — VERIFY — ok

By: CODER

Note: setup-agentplane module renders a composite GitHub Action bundle and setup-agentplane-result.json from release-distribution.json; publish workflow uploads setup-agentplane-module evidence.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T17:57:05.068Z, excerpt_hash=sha256:fef2300e08f7c4b9ce2fe68d00d1060c458c74174c417e3488a171d9279a6a1d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Checks: bun run release:setup-action:check; generated action.yml inspection; bun run release:distribution:check; bun run workflows:command-check; bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun run docs:scripts:check; bunx prettier --check touched files; bun run lint:core; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check.
  Impact: Next release will expose a setup-agentplane action bundle for exact-version CI installs and record missing SETUP_AGENTPLANE_TOKEN as explicit module status.
  Resolution: Generated action installs through the release install.sh asset so checksum verification stays in the shared release installer path.
