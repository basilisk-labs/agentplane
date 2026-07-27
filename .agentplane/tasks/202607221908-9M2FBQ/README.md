---
id: "202607221908-9M2FBQ"
title: "Qualify the AgentPlane 0.7.0-alpha.2 milestone"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202607221848-0ZAB1F"
  - "202607221848-1HWR0R"
  - "202607221848-ABG7SD"
  - "202607221848-ER5H6N"
  - "202607221848-T9B3PS"
  - "202607221848-VBV9B1"
  - "202607221848-VC4VVS"
  - "202607221849-8YYZ9X"
  - "202607221849-NWVCAG"
  - "202607221849-TBTX8X"
  - "202607221907-DK2CJF"
  - "202607242158-QV09NA"
  - "202607252215-SNV847"
  - "202607260532-9M7RNH"
tags:
  - "milestone-0-7-0-alpha-2"
  - "quality"
  - "release-gate"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run ci:contract"
  - "bun run lifecycle:invariants"
  - "bun run schemas:check"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-07-27T20:09:47.043Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-27T20:10:45.464Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-27T20:10:45.464Z"
doc_updated_by: "TESTER"
description: "Run the executable fan-in gate for 0.7.0-alpha.2, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified."
sections:
  Summary: |-
    Qualify the AgentPlane 0.7.0-alpha.2 milestone

    Run the executable fan-in gate for 0.7.0-alpha.2, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified.
  Scope: |-
    - In scope: enforce complete dependency fan-in for the 0.7.0-alpha.2 slice, rerun its contract/lifecycle/schema/type/test/benchmark gates, compare frozen success/rework/safety controls, record residual risks, and issue an evidence-backed publish-or-do-not-publish decision.
    - Out of scope: adding architecture or implementation behavior; any defect becomes a bounded rework/follow-up task.
  Plan: |-
    1. Confirm every declared 0.7.0-alpha.2 dependency is DONE at the reviewed main SHA.
    2. Run the milestone-specific deterministic and semantic quality gates.
    3. Compare safety, compatibility, success/rework, and orchestration metrics to the frozen baseline.
    4. Record blockers and require rework before qualification.
    5. Decide whether an optional 0.7.0-alpha.2 prerelease materially helps external integration testing; qualification may complete without publication.
  Verify Steps: |-
    1. Resolve the dependency closure from this gate. Expected: every required leaf for 0.7.0-alpha.2 is an ancestor and has merged verification/evaluator/hosted-close evidence.
    2. Run `bun run test:critical`, `bun run schemas:check`, `bun run lifecycle:invariants`, `bun run ci:contract`. Expected: all milestone checks pass on one reviewed SHA.
    3. Compare golden metrics and residual risks. Expected: no verified-success or safety regression is hidden by token/latency improvements.
    4. Record a publish decision. Expected: publication is optional, explicit, and never substitutes for unfinished dependencies.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Do not mutate product state during qualification beyond evidence artifacts.
    - If a prerelease was not published, revert only the gate evidence through its task branch.
    - If a prerelease was published, preserve it and route fixes through a new prerelease version; never overwrite the tag/package.
  Findings: ""
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T20:11:09.209Z"
        authorityDigest: "sha256:92e9d7e05d2ae1ce402d5bd92f519942d6de16931eb8616e90340dccab62f5ef"
        digest: "sha256:c05ab9ca527235d399d88398a7a5642a13e51678fa9856f83c16f779b0247316"
        operationDigest: "sha256:55b70e0cdaee69d655beb68619c566245aea9c6c89cbbba904476c68163cef45"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:33df9125a48875c4bbde39a49778a388b9aa8dedcd3520f41a2bcc089ac6b31a"
    grants:
      -
        actor: "USER"
        digest: "sha256:92e9d7e05d2ae1ce402d5bd92f519942d6de16931eb8616e90340dccab62f5ef"
        expiresAt: "2026-07-27T20:26:09.209Z"
        id: "authority-5dd1b1ec-a3ca-4b7d-8a31-bef3874e1f3a"
        issuedAt: "2026-07-27T20:11:09.209Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:55b70e0cdaee69d655beb68619c566245aea9c6c89cbbba904476c68163cef45"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:33df9125a48875c4bbde39a49778a388b9aa8dedcd3520f41a2bcc089ac6b31a"
        stateScopeDigest: "sha256:9d327bf28a02a298fefa111cd8f237da01fc6e0db640d167a030272452ee3a16"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "56e0d620fad82ca93bb9a2f6deddbd48c87c1a55"
    version: 1
id_source: "generated"
---
## Summary

Qualify the AgentPlane 0.7.0-alpha.2 milestone

Run the executable fan-in gate for 0.7.0-alpha.2, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified.

## Scope

- In scope: enforce complete dependency fan-in for the 0.7.0-alpha.2 slice, rerun its contract/lifecycle/schema/type/test/benchmark gates, compare frozen success/rework/safety controls, record residual risks, and issue an evidence-backed publish-or-do-not-publish decision.
- Out of scope: adding architecture or implementation behavior; any defect becomes a bounded rework/follow-up task.

## Plan

1. Confirm every declared 0.7.0-alpha.2 dependency is DONE at the reviewed main SHA.
2. Run the milestone-specific deterministic and semantic quality gates.
3. Compare safety, compatibility, success/rework, and orchestration metrics to the frozen baseline.
4. Record blockers and require rework before qualification.
5. Decide whether an optional 0.7.0-alpha.2 prerelease materially helps external integration testing; qualification may complete without publication.

## Verify Steps

1. Resolve the dependency closure from this gate. Expected: every required leaf for 0.7.0-alpha.2 is an ancestor and has merged verification/evaluator/hosted-close evidence.
2. Run `bun run test:critical`, `bun run schemas:check`, `bun run lifecycle:invariants`, `bun run ci:contract`. Expected: all milestone checks pass on one reviewed SHA.
3. Compare golden metrics and residual risks. Expected: no verified-success or safety regression is hidden by token/latency improvements.
4. Record a publish decision. Expected: publication is optional, explicit, and never substitutes for unfinished dependencies.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Do not mutate product state during qualification beyond evidence artifacts.
- If a prerelease was not published, revert only the gate evidence through its task branch.
- If a prerelease was published, preserve it and route fixes through a new prerelease version; never overwrite the tag/package.

## Findings
