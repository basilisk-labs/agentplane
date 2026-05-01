---
id: "202605012125-PXYEPC"
title: "Automate external distribution repo publishing"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T21:26:03.962Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T21:31:43.594Z"
  updated_by: "CODER"
  note: "External distribution publishing automation verified."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add automated external distribution repo publication for release modules."
events:
  -
    type: "status"
    at: "2026-05-01T21:26:16.509Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add automated external distribution repo publication for release modules."
  -
    type: "verify"
    at: "2026-05-01T21:31:43.594Z"
    author: "CODER"
    state: "ok"
    note: "External distribution publishing automation verified."
doc_version: 3
doc_updated_at: "2026-05-01T21:31:43.601Z"
doc_updated_by: "CODER"
description: "Publish Homebrew, Scoop, and setup-agentplane outputs to their external repositories from the release workflow when credentials are configured."
sections:
  Summary: |-
    Automate external distribution repo publishing
    
    Publish Homebrew, Scoop, and setup-agentplane outputs to their external repositories from the release workflow when credentials are configured.
  Scope: |-
    - In scope: Publish Homebrew, Scoop, and setup-agentplane outputs to their external repositories from the release workflow when credentials are configured.
    - Out of scope: unrelated refactors not required for "Automate external distribution repo publishing".
  Plan: |-
    1. Inspect generated external distribution artifacts and current publish workflow boundaries.
    2. Add a reusable script that publishes generated files into an external repo branch and opens or updates a PR with the configured token.
    3. Wire Homebrew, Scoop, and setup-agentplane modules into publish.yml after artifact rendering, preserving skipped behavior when credentials are absent.
    4. Add workflow/script contract tests for token usage, target paths, and evidence output.
    5. Run targeted release workflow tests plus lint/routing/doctor and merge through branch_pr.
  Verify Steps: |-
    1. Review the requested outcome for "Automate external distribution repo publishing". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T21:31:43.594Z — VERIFY — ok
    
    By: CODER
    
    Note: External distribution publishing automation verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T21:26:16.509Z, excerpt_hash=sha256:17a734080f808ebbaa3cb657f3f59cb50c25ab7a76376dcfe3778d43c1e33493
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added publish-external-distribution script, wired Homebrew/Scoop/setup-agentplane PR publication steps after GitHub Release creation, and covered workflow/script contracts. Checks: bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts; node scripts/publish-external-distribution.mjs --help; git diff --check; node .agentplane/policy/check-routing.mjs; bun run workflows:command-check; bun run lint:core; agentplane doctor.
      Impact: Future release publish jobs can open/update external distribution PRs when HOMEBREW_TAP_TOKEN, SCOOP_BUCKET_TOKEN, and SETUP_AGENTPLANE_TOKEN are configured, while preserving skipped_missing_credentials evidence when they are absent.
      Resolution: Ready for branch_pr integration.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Automate external distribution repo publishing

Publish Homebrew, Scoop, and setup-agentplane outputs to their external repositories from the release workflow when credentials are configured.

## Scope

- In scope: Publish Homebrew, Scoop, and setup-agentplane outputs to their external repositories from the release workflow when credentials are configured.
- Out of scope: unrelated refactors not required for "Automate external distribution repo publishing".

## Plan

1. Inspect generated external distribution artifacts and current publish workflow boundaries.
2. Add a reusable script that publishes generated files into an external repo branch and opens or updates a PR with the configured token.
3. Wire Homebrew, Scoop, and setup-agentplane modules into publish.yml after artifact rendering, preserving skipped behavior when credentials are absent.
4. Add workflow/script contract tests for token usage, target paths, and evidence output.
5. Run targeted release workflow tests plus lint/routing/doctor and merge through branch_pr.

## Verify Steps

1. Review the requested outcome for "Automate external distribution repo publishing". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T21:31:43.594Z — VERIFY — ok

By: CODER

Note: External distribution publishing automation verified.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T21:26:16.509Z, excerpt_hash=sha256:17a734080f808ebbaa3cb657f3f59cb50c25ab7a76376dcfe3778d43c1e33493

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added publish-external-distribution script, wired Homebrew/Scoop/setup-agentplane PR publication steps after GitHub Release creation, and covered workflow/script contracts. Checks: bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts; node scripts/publish-external-distribution.mjs --help; git diff --check; node .agentplane/policy/check-routing.mjs; bun run workflows:command-check; bun run lint:core; agentplane doctor.
  Impact: Future release publish jobs can open/update external distribution PRs when HOMEBREW_TAP_TOKEN, SCOOP_BUCKET_TOKEN, and SETUP_AGENTPLANE_TOKEN are configured, while preserving skipped_missing_credentials evidence when they are absent.
  Resolution: Ready for branch_pr integration.
  Promotion: incident-candidate
  Fixability: external
