---
id: "202605010645-D8EM8Y"
title: "AP-07: Introduce unified test route registry"
result_summary: "Merged via PR #659."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605010645-WG423K"
tags:
  - "code"
verify:
  - "node scripts/check-vitest-projects.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T08:17:56.880Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after AP-06 closed on main and dependency is ready."
verification:
  state: "ok"
  updated_at: "2026-05-01T09:02:23.263Z"
  updated_by: "CODER"
  note: "Verified: unified test route registry drives Vitest projects, aggregate suites, local CI selector, and routing checks with 331 tests / 10 primary routes."
commit:
  hash: "b9e4fd4c9a6f59990086d0c836fdecce83d10c59"
  message: "Merge pull request #659 from basilisk-labs/task/202605010645-D8EM8Y/test-route-registry"
comments:
  -
    author: "CODER"
    body: "Start: route Vitest workspace projects, suite aggregation, local CI selection, and routing checks through one test route registry."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #659 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T08:18:15.548Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: route Vitest workspace projects, suite aggregation, local CI selection, and routing checks through one test route registry."
  -
    type: "verify"
    at: "2026-05-01T09:02:23.263Z"
    author: "CODER"
    state: "ok"
    note: "Verified: unified test route registry drives Vitest projects, aggregate suites, local CI selector, and routing checks with 331 tests / 10 primary routes."
  -
    type: "status"
    at: "2026-05-01T09:04:44.858Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #659 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T09:04:44.864Z"
doc_updated_by: "INTEGRATOR"
description: "Make Vitest workspace, aggregate suites, local CI selector, and routing checks consume one route registry."
sections:
  Summary: |-
    AP-07: Introduce unified test route registry
    
    Make Vitest workspace, aggregate suites, local CI selector, and routing checks consume one route registry.
  Scope: |-
    - In scope: Make Vitest workspace, aggregate suites, local CI selector, and routing checks consume one route registry.
    - Out of scope: unrelated refactors not required for "AP-07: Introduce unified test route registry".
  Plan: |-
    1. Implement the change for "AP-07: Introduce unified test route registry".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `node scripts/check-vitest-projects.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T09:02:23.263Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: unified test route registry drives Vitest projects, aggregate suites, local CI selector, and routing checks with 331 tests / 10 primary routes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T08:18:15.548Z, excerpt_hash=sha256:37af48df3918472f0736c1700b52cdb25dc1559fe4e62c97be8d3578c7258b97
    
    Details:
    
    Command: node scripts/check-vitest-projects.mjs; Result: pass; Evidence: vitest workspace projects OK; test routing OK (331 tests, 10 primary routes). Command: bunx vitest run packages/agentplane/src/cli/test-inventory.test.ts packages/agentplane/src/cli/test-routing-check.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts --testTimeout 60000 --hookTimeout 60000; Result: pass; Evidence: 4 files, 54 tests. Command: bun run test:project -- critical; Result: pass; Evidence: 5 files, 14 tests. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run workflows:lint; Result: pass. Command: bun run docs:scripts:check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

AP-07: Introduce unified test route registry

Make Vitest workspace, aggregate suites, local CI selector, and routing checks consume one route registry.

## Scope

- In scope: Make Vitest workspace, aggregate suites, local CI selector, and routing checks consume one route registry.
- Out of scope: unrelated refactors not required for "AP-07: Introduce unified test route registry".

## Plan

1. Implement the change for "AP-07: Introduce unified test route registry".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `node scripts/check-vitest-projects.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T09:02:23.263Z — VERIFY — ok

By: CODER

Note: Verified: unified test route registry drives Vitest projects, aggregate suites, local CI selector, and routing checks with 331 tests / 10 primary routes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T08:18:15.548Z, excerpt_hash=sha256:37af48df3918472f0736c1700b52cdb25dc1559fe4e62c97be8d3578c7258b97

Details:

Command: node scripts/check-vitest-projects.mjs; Result: pass; Evidence: vitest workspace projects OK; test routing OK (331 tests, 10 primary routes). Command: bunx vitest run packages/agentplane/src/cli/test-inventory.test.ts packages/agentplane/src/cli/test-routing-check.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts --testTimeout 60000 --hookTimeout 60000; Result: pass; Evidence: 4 files, 54 tests. Command: bun run test:project -- critical; Result: pass; Evidence: 5 files, 14 tests. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run workflows:lint; Result: pass. Command: bun run docs:scripts:check; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
