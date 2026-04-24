---
id: "202604241137-7JH02T"
title: "v0.3 hygiene H2: decide bin d.ts packaging treatment"
status: "DOING"
priority: "low"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604241136-H753HG"
tags:
  - "build"
  - "cleanup"
  - "v0.3"
verify:
  - "find packages/agentplane/bin -maxdepth 1 -name '*.d.ts' -print"
  - "npm pack --dry-run --ignore-scripts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T14:41:24.618Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T14:42:04.234Z"
  updated_by: "CODER"
  note: "Command: find packages/agentplane/bin -maxdepth 1 -name '*.d.ts' -print. Result: pass. Evidence: four local declaration files remain: runtime-watch, runtime-context, stale-dist-policy, framework-dev-contract. Scope: local bin declaration inventory. Command: npm pack --dry-run --ignore-scripts in packages/agentplane. Result: pass. Evidence: 46 tarball files, package size 355.2 kB, no bin/*.d.ts listed. Scope: publish artifact boundary. Additional check: bun run typecheck passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Evaluate the bin declaration files as a packaging hygiene task, keeping the decision bounded to publish output, local TypeScript needs, and documented verification evidence."
events:
  -
    type: "status"
    at: "2026-04-24T14:41:30.015Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Evaluate the bin declaration files as a packaging hygiene task, keeping the decision bounded to publish output, local TypeScript needs, and documented verification evidence."
  -
    type: "verify"
    at: "2026-04-24T14:42:04.234Z"
    author: "CODER"
    state: "ok"
    note: "Command: find packages/agentplane/bin -maxdepth 1 -name '*.d.ts' -print. Result: pass. Evidence: four local declaration files remain: runtime-watch, runtime-context, stale-dist-policy, framework-dev-contract. Scope: local bin declaration inventory. Command: npm pack --dry-run --ignore-scripts in packages/agentplane. Result: pass. Evidence: 46 tarball files, package size 355.2 kB, no bin/*.d.ts listed. Scope: publish artifact boundary. Additional check: bun run typecheck passed."
doc_version: 3
doc_updated_at: "2026-04-24T14:42:04.240Z"
doc_updated_by: "CODER"
description: "Evaluate moving bin declaration files or replacing them with JSDoc so package bin artifacts stay minimal without runtime regressions."
sections:
  Summary: |-
    v0.3 hygiene H2: decide bin d.ts packaging treatment

    Evaluate moving bin declaration files or replacing them with JSDoc so package bin artifacts stay minimal without runtime regressions.
  Scope: |-
    - In scope: Evaluate moving bin declaration files or replacing them with JSDoc so package bin artifacts stay minimal without runtime regressions.
    - Out of scope: unrelated refactors not required for "v0.3 hygiene H2: decide bin d.ts packaging treatment".
  Plan: |-
    1. Inspect bin runtime helper imports and TypeScript references to determine whether adjacent bin/*.d.ts files are publish artifacts or local type surfaces.
    2. Verify the package whitelist and npm pack dry-run still exclude bin/*.d.ts after A3.
    3. If declarations are still required for local TypeScript imports, keep them in repo and record the decision as task-local Findings instead of forcing a risky move.
    4. Record verification evidence and finish with a traceable no-runtime-change closeout.
  Verify Steps: |-
    1. Review the requested outcome for "v0.3 hygiene H2: decide bin d.ts packaging treatment". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T14:42:04.234Z — VERIFY — ok

    By: CODER

    Note: Command: find packages/agentplane/bin -maxdepth 1 -name '*.d.ts' -print. Result: pass. Evidence: four local declaration files remain: runtime-watch, runtime-context, stale-dist-policy, framework-dev-contract. Scope: local bin declaration inventory. Command: npm pack --dry-run --ignore-scripts in packages/agentplane. Result: pass. Evidence: 46 tarball files, package size 355.2 kB, no bin/*.d.ts listed. Scope: publish artifact boundary. Additional check: bun run typecheck passed.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T14:41:54.449Z, excerpt_hash=sha256:28730ab53a99ae7a0d3b061b6de607a66bcf5ec40ac4d923b72148213a265f2a

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The four packages/agentplane/bin/*.d.ts files remain in the repository, but packages/agentplane/package.json files[] already excludes them from the published tarball.
      Impact: Moving or deleting them during v0.3 freeze would not reduce npm package contents further and could break local TypeScript imports from src/**/*.ts into bin/*.js helper modules.
      Resolution: Keep the adjacent bin declarations in-repo for v0.3 and treat A3 package whitelist as the publish boundary; revisit only with a dedicated JS-helper type-resolution migration.
id_source: "generated"
---
## Summary

v0.3 hygiene H2: decide bin d.ts packaging treatment

Evaluate moving bin declaration files or replacing them with JSDoc so package bin artifacts stay minimal without runtime regressions.

## Scope

- In scope: Evaluate moving bin declaration files or replacing them with JSDoc so package bin artifacts stay minimal without runtime regressions.
- Out of scope: unrelated refactors not required for "v0.3 hygiene H2: decide bin d.ts packaging treatment".

## Plan

1. Inspect bin runtime helper imports and TypeScript references to determine whether adjacent bin/*.d.ts files are publish artifacts or local type surfaces.
2. Verify the package whitelist and npm pack dry-run still exclude bin/*.d.ts after A3.
3. If declarations are still required for local TypeScript imports, keep them in repo and record the decision as task-local Findings instead of forcing a risky move.
4. Record verification evidence and finish with a traceable no-runtime-change closeout.

## Verify Steps

1. Review the requested outcome for "v0.3 hygiene H2: decide bin d.ts packaging treatment". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T14:42:04.234Z — VERIFY — ok

By: CODER

Note: Command: find packages/agentplane/bin -maxdepth 1 -name '*.d.ts' -print. Result: pass. Evidence: four local declaration files remain: runtime-watch, runtime-context, stale-dist-policy, framework-dev-contract. Scope: local bin declaration inventory. Command: npm pack --dry-run --ignore-scripts in packages/agentplane. Result: pass. Evidence: 46 tarball files, package size 355.2 kB, no bin/*.d.ts listed. Scope: publish artifact boundary. Additional check: bun run typecheck passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T14:41:54.449Z, excerpt_hash=sha256:28730ab53a99ae7a0d3b061b6de607a66bcf5ec40ac4d923b72148213a265f2a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The four packages/agentplane/bin/*.d.ts files remain in the repository, but packages/agentplane/package.json files[] already excludes them from the published tarball.
  Impact: Moving or deleting them during v0.3 freeze would not reduce npm package contents further and could break local TypeScript imports from src/**/*.ts into bin/*.js helper modules.
  Resolution: Keep the adjacent bin declarations in-repo for v0.3 and treat A3 package whitelist as the publish boundary; revisit only with a dedicated JS-helper type-resolution migration.
