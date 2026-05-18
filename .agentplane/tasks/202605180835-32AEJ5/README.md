---
id: "202605180835-32AEJ5"
title: "Fix v0.6.2 ACR example version drift"
result_summary: "Merged via PR #3867."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T08:35:45.458Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T09:01:59.224Z"
  updated_by: "DEUS"
  note: "Hosted publish confirmed for v0.6.2."
commit:
  hash: "38d20e02646371b587820adb328039c615323f47"
  message: "Merge pull request #3867 from basilisk-labs/task/202605180835-32AEJ5/fix-acr-example-v0-6-2"
comments:
  -
    author: "CODER"
    body: "Start: Fix release-blocking ACR example version drift for v0.6.2 publish validation."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3867 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-18T08:35:57.892Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix release-blocking ACR example version drift for v0.6.2 publish validation."
  -
    type: "verify"
    at: "2026-05-18T08:44:37.812Z"
    author: "CODER"
    state: "ok"
    note: "Fixed ACR example version drift by aligning packages/spec/examples/acr.json producer and toolchain versions to 0.6.2. Local checks passed: bun run release:acr-example:check and bun run release:check. Hosted PR #3867 was green on head e3a3fcc1d before final metadata push."
  -
    type: "status"
    at: "2026-05-18T08:51:19.912Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3867 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-18T09:01:59.224Z"
doc_updated_by: "DEUS"
description: "Fix the release-blocking ACR example version drift so v0.6.2 publish validation can pass. Scope is limited to packages/spec/examples/acr.json producer/toolchain version alignment with package version 0.6.2."
sections:
  Summary: |-
    Fix v0.6.2 ACR example version drift

    Fix the release-blocking ACR example version drift so v0.6.2 publish validation can pass. Scope is limited to packages/spec/examples/acr.json producer/toolchain version alignment with package version 0.6.2.
  Scope: |-
    - In scope: Fix the release-blocking ACR example version drift so v0.6.2 publish validation can pass. Scope is limited to packages/spec/examples/acr.json producer/toolchain version alignment with package version 0.6.2.
    - Out of scope: unrelated refactors not required for "Fix v0.6.2 ACR example version drift".
  Plan: "Plan: update packages/spec/examples/acr.json so producer.version and agent.toolchain[agentplane].version match the v0.6.2 package version; run the ACR example release check and full release:check locally; publish a branch_pr PR and wait for hosted checks before merge."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix v0.6.2 ACR example version drift". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix v0.6.2 ACR example version drift". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - State: ok
    - Note: Hosted publish confirmed for v0.6.2.
    - Details:
      - release_sha: 38d20e02646371b587820adb328039c615323f47
      - version: 0.6.2
      - tag: v0.6.2
      - @agentplaneorg/core: published_in_run
      - @agentplaneorg/recipes: published_in_run
      - agentplane: published_in_run
      - npm_smoke: pass
      - github_release: created
      - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.2
      - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/26023548479
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix v0.6.2 ACR example version drift

Fix the release-blocking ACR example version drift so v0.6.2 publish validation can pass. Scope is limited to packages/spec/examples/acr.json producer/toolchain version alignment with package version 0.6.2.

## Scope

- In scope: Fix the release-blocking ACR example version drift so v0.6.2 publish validation can pass. Scope is limited to packages/spec/examples/acr.json producer/toolchain version alignment with package version 0.6.2.
- Out of scope: unrelated refactors not required for "Fix v0.6.2 ACR example version drift".

## Plan

Plan: update packages/spec/examples/acr.json so producer.version and agent.toolchain[agentplane].version match the v0.6.2 package version; run the ACR example release check and full release:check locally; publish a branch_pr PR and wait for hosted checks before merge.

## Verify Steps

PLANNER fallback scaffold for "Fix v0.6.2 ACR example version drift". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix v0.6.2 ACR example version drift". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- State: ok
- Note: Hosted publish confirmed for v0.6.2.
- Details:
  - release_sha: 38d20e02646371b587820adb328039c615323f47
  - version: 0.6.2
  - tag: v0.6.2
  - @agentplaneorg/core: published_in_run
  - @agentplaneorg/recipes: published_in_run
  - agentplane: published_in_run
  - npm_smoke: pass
  - github_release: created
  - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.2
  - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/26023548479
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings