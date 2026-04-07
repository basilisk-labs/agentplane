---
id: "202604071954-90V7J2"
title: "Repair incident registry parsing, dedupe, and budget enforcement"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T19:58:58.977Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T20:21:05.808Z"
  updated_by: "CODER"
  note: "Refreshed verification after source commit and pr open. Checks: bun x vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun x eslint packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; node .agentplane/policy/check-routing.mjs. Evidence: current HEAD matches repaired incident registry parsing, dedupe, and budget guard."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: repair incident registry parsing and promotion so the shipped incidents.md layout dedupes correctly, allocates unique IDs, and stays within the policy line budget."
events:
  -
    type: "status"
    at: "2026-04-07T19:59:42.263Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair incident registry parsing and promotion so the shipped incidents.md layout dedupes correctly, allocates unique IDs, and stays within the policy line budget."
  -
    type: "verify"
    at: "2026-04-07T20:12:12.078Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; node .agentplane/policy/check-routing.mjs; bun x eslint packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts. Result: pass. Evidence: compact incidents registry parsing, duplicate-id prevention, budget guard, and repaired live incidents.md all verified in the task worktree."
  -
    type: "verify"
    at: "2026-04-07T20:21:05.808Z"
    author: "CODER"
    state: "ok"
    note: "Refreshed verification after source commit and pr open. Checks: bun x vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun x eslint packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; node .agentplane/policy/check-routing.mjs. Evidence: current HEAD matches repaired incident registry parsing, dedupe, and budget guard."
doc_version: 3
doc_updated_at: "2026-04-07T20:21:05.814Z"
doc_updated_by: "CODER"
description: "Make incidents collect and lifecycle promotion parse the current incidents.md layout correctly, allocate unique incident IDs, prevent duplicate appends, and keep the live registry/assets within policy line budget."
sections:
  Summary: |-
    Repair incident registry parsing, dedupe, and budget enforcement
    
    Make incidents collect and lifecycle promotion parse the current incidents.md layout correctly, allocate unique incident IDs, prevent duplicate appends, and keep the live registry/assets within policy line budget.
  Scope: |-
    - In scope: Make incidents collect and lifecycle promotion parse the current incidents.md layout correctly, allocate unique incident IDs, prevent duplicate appends, and keep the live registry/assets within policy line budget.
    - Out of scope: unrelated refactors not required for "Repair incident registry parsing, dedupe, and budget enforcement".
  Plan: "1. Make the incident registry parser understand the shipped compact incidents.md layout as well as the structured skeleton so existing entries participate in dedupe and ID allocation. 2. Prevent duplicate promotions by allocating IDs against the parsed live registry and by rejecting exact duplicate sourceTask/scope/failure/rule appends. 3. Add a budget-aware registry formatter/writer that can keep optional machine fields compact enough for the <=100-line policy budget, then repair the live incidents registry and asset mirror with focused regression coverage."
  Verify Steps: |-
    1. Run focused incidents tests. Expected: parser reads compact incidents.md entries and duplicate promotions do not reuse IDs.
    2. Run policy routing check. Expected: .agentplane/policy/incidents.md and the mirrored asset stay within budget and check-routing passes.
    3. Run focused lint on touched incidents files. Expected: incidents collection and registry writer paths lint cleanly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T20:12:12.078Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; node .agentplane/policy/check-routing.mjs; bun x eslint packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts. Result: pass. Evidence: compact incidents registry parsing, duplicate-id prevention, budget guard, and repaired live incidents.md all verified in the task worktree.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T19:59:42.273Z, excerpt_hash=sha256:db0f74e582f40e856d66f8d42db9bc579fd4066a1c4a262d05dc9ed4353d0b59
    
    ### 2026-04-07T20:21:05.808Z — VERIFY — ok
    
    By: CODER
    
    Note: Refreshed verification after source commit and pr open. Checks: bun x vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun x eslint packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; node .agentplane/policy/check-routing.mjs. Evidence: current HEAD matches repaired incident registry parsing, dedupe, and budget guard.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T20:12:12.081Z, excerpt_hash=sha256:db0f74e582f40e856d66f8d42db9bc579fd4066a1c4a262d05dc9ed4353d0b59
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Repair incident registry parsing, dedupe, and budget enforcement

Make incidents collect and lifecycle promotion parse the current incidents.md layout correctly, allocate unique incident IDs, prevent duplicate appends, and keep the live registry/assets within policy line budget.

## Scope

- In scope: Make incidents collect and lifecycle promotion parse the current incidents.md layout correctly, allocate unique incident IDs, prevent duplicate appends, and keep the live registry/assets within policy line budget.
- Out of scope: unrelated refactors not required for "Repair incident registry parsing, dedupe, and budget enforcement".

## Plan

1. Make the incident registry parser understand the shipped compact incidents.md layout as well as the structured skeleton so existing entries participate in dedupe and ID allocation. 2. Prevent duplicate promotions by allocating IDs against the parsed live registry and by rejecting exact duplicate sourceTask/scope/failure/rule appends. 3. Add a budget-aware registry formatter/writer that can keep optional machine fields compact enough for the <=100-line policy budget, then repair the live incidents registry and asset mirror with focused regression coverage.

## Verify Steps

1. Run focused incidents tests. Expected: parser reads compact incidents.md entries and duplicate promotions do not reuse IDs.
2. Run policy routing check. Expected: .agentplane/policy/incidents.md and the mirrored asset stay within budget and check-routing passes.
3. Run focused lint on touched incidents files. Expected: incidents collection and registry writer paths lint cleanly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T20:12:12.078Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; node .agentplane/policy/check-routing.mjs; bun x eslint packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts. Result: pass. Evidence: compact incidents registry parsing, duplicate-id prevention, budget guard, and repaired live incidents.md all verified in the task worktree.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T19:59:42.273Z, excerpt_hash=sha256:db0f74e582f40e856d66f8d42db9bc579fd4066a1c4a262d05dc9ed4353d0b59

### 2026-04-07T20:21:05.808Z — VERIFY — ok

By: CODER

Note: Refreshed verification after source commit and pr open. Checks: bun x vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; bun x eslint packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts; node .agentplane/policy/check-routing.mjs. Evidence: current HEAD matches repaired incident registry parsing, dedupe, and budget guard.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T20:12:12.081Z, excerpt_hash=sha256:db0f74e582f40e856d66f8d42db9bc579fd4066a1c4a262d05dc9ed4353d0b59

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
