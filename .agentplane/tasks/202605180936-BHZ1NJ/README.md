---
id: "202605180936-BHZ1NJ"
title: "Add context assimilation blueprint gates"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprint"
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T09:36:24.155Z"
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
    author: "CODER"
    body: "Start: implement context assimilation blueprint gates and minimal initial wiki scaffold in the dedicated branch_pr worktree, keeping scope limited to context commands, blueprint/docs/tests, and task evidence."
events:
  -
    type: "status"
    at: "2026-05-18T09:36:40.789Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement context assimilation blueprint gates and minimal initial wiki scaffold in the dedicated branch_pr worktree, keeping scope limited to context commands, blueprint/docs/tests, and task evidence."
doc_version: 3
doc_updated_at: "2026-05-18T09:43:41.825Z"
doc_updated_by: "CODER"
description: "Implement a stricter context assimilation blueprint/lifecycle contract and change context init so the starter wiki contains only AGENTS.md and index.md until first ingest creates project-specific folders."
sections:
  Summary: |-
    Add context assimilation blueprint gates

    Implement a stricter context assimilation blueprint/lifecycle contract and change context init so the starter wiki contains only AGENTS.md and index.md until first ingest creates project-specific folders.
  Scope: |-
    - In scope: Implement a stricter context assimilation blueprint/lifecycle contract and change context init so the starter wiki contains only AGENTS.md and index.md until first ingest creates project-specific folders.
    - Out of scope: unrelated refactors not required for "Add context assimilation blueprint gates".
  Plan: "1. Inspect existing blueprint/context command architecture and tests. 2. Add or wire a first-class context.assimilation blueprint/lifecycle contract so tasks expose required source-set, allowed/forbidden outputs, required gates, and stop rules. 3. Change context init adaptive/wiki/codebase/research starter behavior so context/wiki starts with only AGENTS.md and index.md; move internal starter folders/pages to first ingest/learn scaffolding. 4. Update docs/tests to capture the new initialization and assimilation expectations. 5. Run targeted context/blueprint tests, routing check, and relevant schema/artifact checks."
  Verify Steps: |-
    1. `bunx vitest run packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts --hookTimeout 60000 --testTimeout 60000`
       Expected: context init/ingest and blueprint lifecycle tests pass.
    2. `bun run lint:core -- packages/agentplane/src/commands/context/init.ts packages/agentplane/src/context/ingest.ts packages/agentplane/src/context/ingest-task.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/blueprints/builtins.ts packages/agentplane/src/blueprints/validate.test.ts`
       Expected: touched TypeScript files pass targeted lint.
    3. `bun run schemas:check`
       Expected: generated schema mirrors remain synchronized.
    4. `node .agentplane/policy/check-routing.mjs`
       Expected: policy routing remains valid.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add context assimilation blueprint gates

Implement a stricter context assimilation blueprint/lifecycle contract and change context init so the starter wiki contains only AGENTS.md and index.md until first ingest creates project-specific folders.

## Scope

- In scope: Implement a stricter context assimilation blueprint/lifecycle contract and change context init so the starter wiki contains only AGENTS.md and index.md until first ingest creates project-specific folders.
- Out of scope: unrelated refactors not required for "Add context assimilation blueprint gates".

## Plan

1. Inspect existing blueprint/context command architecture and tests. 2. Add or wire a first-class context.assimilation blueprint/lifecycle contract so tasks expose required source-set, allowed/forbidden outputs, required gates, and stop rules. 3. Change context init adaptive/wiki/codebase/research starter behavior so context/wiki starts with only AGENTS.md and index.md; move internal starter folders/pages to first ingest/learn scaffolding. 4. Update docs/tests to capture the new initialization and assimilation expectations. 5. Run targeted context/blueprint tests, routing check, and relevant schema/artifact checks.

## Verify Steps

1. `bunx vitest run packages/agentplane/src/blueprints/validate.test.ts packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts --hookTimeout 60000 --testTimeout 60000`
   Expected: context init/ingest and blueprint lifecycle tests pass.
2. `bun run lint:core -- packages/agentplane/src/commands/context/init.ts packages/agentplane/src/context/ingest.ts packages/agentplane/src/context/ingest-task.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/blueprints/builtins.ts packages/agentplane/src/blueprints/validate.test.ts`
   Expected: touched TypeScript files pass targeted lint.
3. `bun run schemas:check`
   Expected: generated schema mirrors remain synchronized.
4. `node .agentplane/policy/check-routing.mjs`
   Expected: policy routing remains valid.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
