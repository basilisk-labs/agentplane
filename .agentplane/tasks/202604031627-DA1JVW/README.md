---
id: "202604031627-DA1JVW"
title: "Auto-promote reusable external incidents from task findings"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "policy"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T16:28:22.848Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-03T16:40:24.330Z"
  updated_by: "CODER"
  note: "Verified: incidents promotion now accepts resolved external Findings marked with Fixability: external or IncidentExternal: true, first occurrences stay open but still surface through advice lookup, recurring equivalents stabilize on later entries, and the shipped policy/docs/help text matches that contract. Commands: bunx vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/command-guide.test.ts -u --hookTimeout 60000 --testTimeout 60000; bun run --filter=agentplane build; bun run docs:bootstrap:generate; node packages/agentplane/dist/cli.js docs cli --out docs/user/cli-reference.generated.mdx; node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run docs:bootstrap:check; bun run docs:cli:check; bun run docs:onboarding:check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: align incidents promotion with the intended external-incident memory model, make advice lookup useful for first and recurring analogous tasks, and keep the contract documented."
events:
  -
    type: "status"
    at: "2026-04-03T16:29:32.162Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align incidents promotion with the intended external-incident memory model, make advice lookup useful for first and recurring analogous tasks, and keep the contract documented."
  -
    type: "verify"
    at: "2026-04-03T16:40:24.330Z"
    author: "CODER"
    state: "ok"
    note: "Verified: incidents promotion now accepts resolved external Findings marked with Fixability: external or IncidentExternal: true, first occurrences stay open but still surface through advice lookup, recurring equivalents stabilize on later entries, and the shipped policy/docs/help text matches that contract. Commands: bunx vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/command-guide.test.ts -u --hookTimeout 60000 --testTimeout 60000; bun run --filter=agentplane build; bun run docs:bootstrap:generate; node packages/agentplane/dist/cli.js docs cli --out docs/user/cli-reference.generated.mdx; node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run docs:bootstrap:check; bun run docs:cli:check; bun run docs:onboarding:check."
doc_version: 3
doc_updated_at: "2026-04-03T16:40:24.353Z"
doc_updated_by: "CODER"
description: "Make finish/task workflows infer reusable external incident advice from resolved Findings blocks, keep incident states honest, and align advice lookup with scope/tag recurrence semantics."
sections:
  Summary: |-
    Auto-promote reusable external incidents from task findings
    
    Make finish/task workflows infer reusable external incident advice from resolved Findings blocks, keep incident states honest, and align advice lookup with scope/tag recurrence semantics.
  Scope: |-
    - In scope: Make finish/task workflows infer reusable external incident advice from resolved Findings blocks, keep incident states honest, and align advice lookup with scope/tag recurrence semantics.
    - Out of scope: unrelated refactors not required for "Auto-promote reusable external incidents from task findings".
  Plan: "1. Relax incident promotion so finish can infer reusable external incident advice from structured Findings blocks instead of requiring fully manual Incident* metadata. 2. Make registry state semantics honest: default new external incidents to open, surface open incidents in advice lookup, and stabilize only on recurrence. 3. Keep lookup centered on analogous scope/tags/title, add focused regression coverage, and sync docs/help for the updated incidents contract."
  Verify Steps: |-
    1. Run focused incidents runtime and CLI/task workflow tests covering auto-promotion, recurrence state, and advice lookup. Expected: new external findings promote deterministically and analogous tasks receive the expected advice.
    2. Run docs/policy routing validation for the updated incidents contract. Expected: routing and policy invariants remain valid after the contract changes.
    3. Build the agentplane package. Expected: the CLI/runtime compiles cleanly with no new type or bundling errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-03T16:40:24.330Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: incidents promotion now accepts resolved external Findings marked with Fixability: external or IncidentExternal: true, first occurrences stay open but still surface through advice lookup, recurring equivalents stabilize on later entries, and the shipped policy/docs/help text matches that contract. Commands: bunx vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/command-guide.test.ts -u --hookTimeout 60000 --testTimeout 60000; bun run --filter=agentplane build; bun run docs:bootstrap:generate; node packages/agentplane/dist/cli.js docs cli --out docs/user/cli-reference.generated.mdx; node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run docs:bootstrap:check; bun run docs:cli:check; bun run docs:onboarding:check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T16:29:32.173Z, excerpt_hash=sha256:bd7df8a7b0aba1fbc42051d40dead0841f8ba904897691a8cf58a4a520d8ca41
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Auto-promote reusable external incidents from task findings

Make finish/task workflows infer reusable external incident advice from resolved Findings blocks, keep incident states honest, and align advice lookup with scope/tag recurrence semantics.

## Scope

- In scope: Make finish/task workflows infer reusable external incident advice from resolved Findings blocks, keep incident states honest, and align advice lookup with scope/tag recurrence semantics.
- Out of scope: unrelated refactors not required for "Auto-promote reusable external incidents from task findings".

## Plan

1. Relax incident promotion so finish can infer reusable external incident advice from structured Findings blocks instead of requiring fully manual Incident* metadata. 2. Make registry state semantics honest: default new external incidents to open, surface open incidents in advice lookup, and stabilize only on recurrence. 3. Keep lookup centered on analogous scope/tags/title, add focused regression coverage, and sync docs/help for the updated incidents contract.

## Verify Steps

1. Run focused incidents runtime and CLI/task workflow tests covering auto-promotion, recurrence state, and advice lookup. Expected: new external findings promote deterministically and analogous tasks receive the expected advice.
2. Run docs/policy routing validation for the updated incidents contract. Expected: routing and policy invariants remain valid after the contract changes.
3. Build the agentplane package. Expected: the CLI/runtime compiles cleanly with no new type or bundling errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-03T16:40:24.330Z — VERIFY — ok

By: CODER

Note: Verified: incidents promotion now accepts resolved external Findings marked with Fixability: external or IncidentExternal: true, first occurrences stay open but still surface through advice lookup, recurring equivalents stabilize on later entries, and the shipped policy/docs/help text matches that contract. Commands: bunx vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/command-guide.test.ts -u --hookTimeout 60000 --testTimeout 60000; bun run --filter=agentplane build; bun run docs:bootstrap:generate; node packages/agentplane/dist/cli.js docs cli --out docs/user/cli-reference.generated.mdx; node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run docs:bootstrap:check; bun run docs:cli:check; bun run docs:onboarding:check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T16:29:32.173Z, excerpt_hash=sha256:bd7df8a7b0aba1fbc42051d40dead0841f8ba904897691a8cf58a4a520d8ca41

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
