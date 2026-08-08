---
id: "202608061646-BYY8A1"
title: "Qualify and publish AgentPlane 0.7.5 supervisor-first UX patch"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 15
origin:
  system: "manual"
depends_on:
  - "202608061646-30TKV4"
  - "202608061742-G2ZA4T"
  - "202608061925-KANFC0"
  - "202608062021-Z0X584"
  - "202608062021-V2EESE"
  - "202608062021-MCY8ZC"
  - "202608062021-HTRP5J"
  - "202608062023-V3WHE9"
tags:
  - "docs"
  - "quality"
  - "release"
  - "v0.7.5"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "merge"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=1200000 bun run ci:local:full"
  - "bun run ci:release-extras"
  - "bun run e2e:v0.7.1:gate"
  - "bun run bench:compatibility:check && bun run bench:agent-efficiency:check && bun run bench:agent-efficiency:replay:check"
  - "npm view agentplane version && npm view @agentplaneorg/core version && npm view @agentplaneorg/recipes version && npm view @agentplaneorg/spec version && npm view @agentplaneorg/testkit version"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T20:24:08.665Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit:
  hash: "d6dd00111035c5aff69c88d495d2f3503d597f90"
  message: "🚧 BYY8A1 task: apply external agent result"
comments:
  -
    author: "DOCS"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: d6dd00111035. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-08T03:44:44.256Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-08T03:48:21.200Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: d6dd00111035. CLI accepted one state-bound external-agent semantic result."
doc_version: 3
doc_updated_at: "2026-08-08T03:48:21.200Z"
doc_updated_by: "SUPERVISOR"
description: "Publish one cumulative 0.7.5 patch after routing, task UX, init, Windows file identity, supervisor-first guidance, semantic prompt projection, external protocol polish, bounded compatibility governance, and safe evidence retention all pass local, hosted, Windows, direct, branch_pr, managed, external, interruption/recovery, token-efficiency, package, migration, and post-release qualification."
sections:
  Summary: |-
    Qualify and publish AgentPlane 0.7.5 UX routing patch

    Document the explainable auto-routing and simplified task UX, run focused and full release qualification including compatibility and efficiency checks, publish v0.7.5 through the protected branch_pr release route, and verify npm plus GitHub release truth.
  Scope: |-
    - In scope: Document the explainable auto-routing and simplified task UX, run focused and full release qualification including compatibility and efficiency checks, publish v0.7.5 through the protected branch_pr release route, and verify npm plus GitHub release truth.
    - Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane 0.7.5 UX routing patch".
  Plan: "1. Integrate every 0.7.5 dependency in serialized protected-main order and update the cumulative compatibility candidate only after the final code surface is stable. 2. Version all packages and write release notes covering automatic task routing, user-first task/init UX, exact Windows README identities, supervisor-first agent guidance, semantic-only provider prompts, protocol polish, legacy classification, evidence retention, and the RF-04 advisory sample-count caveat. 3. On one clean release SHA run full local CI, release extras, package/install/migration checks, Windows coverage, direct and branch_pr, managed and external protocols, stale state, interruption, effect-in-doubt, evaluator rework, hosted waits, cleanup races, exact compiled-prompt choreography gates, and init/new-user copy-paste flows. 4. Run the bounded 50 replay runs and 55 provider episodes once for the cumulative candidate, compare tokens, verified success, scope violations, golden mismatches, rework, setup, first mutation, and time-to-verified, and repair every blocking defect before release rather than publishing successive patches. 5. Obtain evaluator pass, merge through protected main, publish v0.7.5, and prove the GitHub release, tag, main SHA, and all npm package versions from hosted surfaces. 6. Delete temporary recovery and obsolete merged branches only after publication proof."
  Verify Steps: |-
    - AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=1200000 bun run ci:local:full
    - bun run ci:release-extras
    - bun run e2e:v0.7.1:gate
    - bun run bench:compatibility:check && bun run bench:agent-efficiency:check && bun run bench:agent-efficiency:replay:check
    - npm view agentplane version && npm view @agentplaneorg/core version && npm view @agentplaneorg/recipes version && npm view @agentplaneorg/spec version && npm view @agentplaneorg/testkit version
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Do not publish unless all gates pass. Before publication, abandon the candidate branch. After publication, fix forward in a new patch; npm versions and Git tags are immutable."
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "4a2895659e677071caaa9b56cadf35df8e261e82"
    version: 1
id_source: "generated"
---
## Summary

Qualify and publish AgentPlane 0.7.5 UX routing patch

Document the explainable auto-routing and simplified task UX, run focused and full release qualification including compatibility and efficiency checks, publish v0.7.5 through the protected branch_pr release route, and verify npm plus GitHub release truth.

## Scope

- In scope: Document the explainable auto-routing and simplified task UX, run focused and full release qualification including compatibility and efficiency checks, publish v0.7.5 through the protected branch_pr release route, and verify npm plus GitHub release truth.
- Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane 0.7.5 UX routing patch".

## Plan

1. Integrate every 0.7.5 dependency in serialized protected-main order and update the cumulative compatibility candidate only after the final code surface is stable. 2. Version all packages and write release notes covering automatic task routing, user-first task/init UX, exact Windows README identities, supervisor-first agent guidance, semantic-only provider prompts, protocol polish, legacy classification, evidence retention, and the RF-04 advisory sample-count caveat. 3. On one clean release SHA run full local CI, release extras, package/install/migration checks, Windows coverage, direct and branch_pr, managed and external protocols, stale state, interruption, effect-in-doubt, evaluator rework, hosted waits, cleanup races, exact compiled-prompt choreography gates, and init/new-user copy-paste flows. 4. Run the bounded 50 replay runs and 55 provider episodes once for the cumulative candidate, compare tokens, verified success, scope violations, golden mismatches, rework, setup, first mutation, and time-to-verified, and repair every blocking defect before release rather than publishing successive patches. 5. Obtain evaluator pass, merge through protected main, publish v0.7.5, and prove the GitHub release, tag, main SHA, and all npm package versions from hosted surfaces. 6. Delete temporary recovery and obsolete merged branches only after publication proof.

## Verify Steps

- AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=1200000 bun run ci:local:full
- bun run ci:release-extras
- bun run e2e:v0.7.1:gate
- bun run bench:compatibility:check && bun run bench:agent-efficiency:check && bun run bench:agent-efficiency:replay:check
- npm view agentplane version && npm view @agentplaneorg/core version && npm view @agentplaneorg/recipes version && npm view @agentplaneorg/spec version && npm view @agentplaneorg/testkit version

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Do not publish unless all gates pass. Before publication, abandon the candidate branch. After publication, fix forward in a new patch; npm versions and Git tags are immutable.

## Findings
