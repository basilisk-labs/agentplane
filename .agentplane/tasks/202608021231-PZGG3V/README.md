---
id: "202608021231-PZGG3V"
title: "Unify the v0.7.1 task supervisor and external advance protocol"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "supervisor"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
  - "node scripts/qualification/check-v0.7.1-product-contract.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T13:20:21.380Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit:
  hash: "06582bde1138360f789c18399c86df20279bafee"
  message: "✨ PZGG3V task: unify supervisor frontends"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed at 06582bde1138360f789c18399c86df20279bafee. Local product, supervisor, lifecycle, recovery, critical, type, policy, and repository contract checks passed; independent verification remains with TESTER."
events:
  -
    type: "status"
    at: "2026-08-02T13:20:44.053Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-02T14:11:49.069Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed at 06582bde1138360f789c18399c86df20279bafee. Local product, supervisor, lifecycle, recovery, critical, type, policy, and repository contract checks passed; independent verification remains with TESTER."
doc_version: 3
doc_updated_at: "2026-08-02T14:11:49.069Z"
doc_updated_by: "CODER"
description: "Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding."
sections:
  Summary: |-
    Unify the v0.7.1 task supervisor and external advance protocol

    Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding.
  Scope: |-
    - In scope: Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding.
    - Out of scope: unrelated refactors not required for "Unify the v0.7.1 task supervisor and external advance protocol".
  Plan: |-
    1. Map the existing managed task-run and route-decision state machines, then define the smallest shared typed transition/projection boundary for managed and external frontends.
    2. Add `task advance <task-id> --agent-json` as the external frontend. It must emit one next action, current state fingerprint, bounded context references, explicit stop/authority state, and no shell choreography.
    3. Route managed `task run` and external `task advance` through the same transition semantics and evidence projection, including approval, evaluator rework, hosted wait, stale state, and recovery cases.
    4. Replace default onboarding/help guidance that promotes `task begin` and `task complete` with the canonical supervisor route while retaining compatibility commands outside the default path.
    5. Add focused contract, parity, packet-size, idempotency, and lifecycle/recovery tests; run critical CLI, typecheck, v0.7 qualification probes, workflow coverage, and ci:contract.
  Verify Steps: |-
    1. Run `node scripts/qualification/check-v0.7.1-product-contract.mjs`; require public `task advance --agent-json`, a valid packet no larger than 2048 bytes, no duplicated semantic fields, no Git/worktree/PR/verify/finish/integrate/cleanup choreography, and canonical onboarding.
    2. Run the focused v0.7 supervisor, lifecycle, and recovery suites; require managed and external frontends to produce equivalent typed transitions, state fingerprints, evidence outcomes, safe stops, and replay behavior.
    3. Exercise direct and branch_pr fixtures through planned, doing, approval-required, evaluator-rework, hosted-wait, done, blocked, stale-fingerprint, and effect-in-doubt states; require one deterministic next action and no hidden side effects from `--agent-json`.
    4. Run `bun run test:critical`, `bun run typecheck`, `bun run coverage:workflow-suite`, `bun run ci:contract`, task-state validation, doctor, and policy routing; require all maintained gates to pass.
    5. Run an independent EVALUATOR review against the exact implementation SHA before PR integration.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "db3c1a42c1bf3caeaf3dba6d019116925a25b99b"
    version: 1
id_source: "generated"
---
## Summary

Unify the v0.7.1 task supervisor and external advance protocol

Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding.

## Scope

- In scope: Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding.
- Out of scope: unrelated refactors not required for "Unify the v0.7.1 task supervisor and external advance protocol".

## Plan

1. Map the existing managed task-run and route-decision state machines, then define the smallest shared typed transition/projection boundary for managed and external frontends.
2. Add `task advance <task-id> --agent-json` as the external frontend. It must emit one next action, current state fingerprint, bounded context references, explicit stop/authority state, and no shell choreography.
3. Route managed `task run` and external `task advance` through the same transition semantics and evidence projection, including approval, evaluator rework, hosted wait, stale state, and recovery cases.
4. Replace default onboarding/help guidance that promotes `task begin` and `task complete` with the canonical supervisor route while retaining compatibility commands outside the default path.
5. Add focused contract, parity, packet-size, idempotency, and lifecycle/recovery tests; run critical CLI, typecheck, v0.7 qualification probes, workflow coverage, and ci:contract.

## Verify Steps

1. Run `node scripts/qualification/check-v0.7.1-product-contract.mjs`; require public `task advance --agent-json`, a valid packet no larger than 2048 bytes, no duplicated semantic fields, no Git/worktree/PR/verify/finish/integrate/cleanup choreography, and canonical onboarding.
2. Run the focused v0.7 supervisor, lifecycle, and recovery suites; require managed and external frontends to produce equivalent typed transitions, state fingerprints, evidence outcomes, safe stops, and replay behavior.
3. Exercise direct and branch_pr fixtures through planned, doing, approval-required, evaluator-rework, hosted-wait, done, blocked, stale-fingerprint, and effect-in-doubt states; require one deterministic next action and no hidden side effects from `--agent-json`.
4. Run `bun run test:critical`, `bun run typecheck`, `bun run coverage:workflow-suite`, `bun run ci:contract`, task-state validation, doctor, and policy routing; require all maintained gates to pass.
5. Run an independent EVALUATOR review against the exact implementation SHA before PR integration.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
