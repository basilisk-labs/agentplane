---
id: "202605131649-61129E"
title: "Align public CLI docs with user command surface"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify:
  - "agentplane doctor"
  - "bun run docs:cli:check"
  - "bun run docs:ia:check"
  - "bun run docs:onboarding:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T16:50:12.353Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T17:17:04.604Z"
  updated_by: "CODER"
  note: "Verified docs/code alignment: docs:cli:check, docs:onboarding:check, docs:ia:check, check-routing, agentplane doctor, package build, and targeted docs-cli test passed. Generated CLI reference now contains cleanup merged and excludes group roots plus advanced/internal docs surface."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: align public CLI documentation with the actual user command surface, keeping developer-only and advanced commands out of the main public flow while preserving generated reference accuracy."
events:
  -
    type: "status"
    at: "2026-05-13T16:51:36.933Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align public CLI documentation with the actual user command surface, keeping developer-only and advanced commands out of the main public flow while preserving generated reference accuracy."
  -
    type: "verify"
    at: "2026-05-13T17:17:04.604Z"
    author: "CODER"
    state: "ok"
    note: "Verified docs/code alignment: docs:cli:check, docs:onboarding:check, docs:ia:check, check-routing, agentplane doctor, package build, and targeted docs-cli test passed. Generated CLI reference now contains cleanup merged and excludes group roots plus advanced/internal docs surface."
doc_version: 3
doc_updated_at: "2026-05-13T17:17:04.626Z"
doc_updated_by: "CODER"
description: "Separate public user command documentation from developer/advanced surfaces, remove stale command examples, and keep generated CLI reference focused on actionable user commands."
sections:
  Summary: |-
    Align public CLI docs with user command surface
    
    Separate public user command documentation from developer/advanced surfaces, remove stale command examples, and keep generated CLI reference focused on actionable user commands.
  Scope: |-
    - In scope: Separate public user command documentation from developer/advanced surfaces, remove stale command examples, and keep generated CLI reference focused on actionable user commands.
    - Out of scope: unrelated refactors not required for "Align public CLI docs with user command surface".
  Plan: |-
    1. Inspect CLI docs generator, website docs navigation, and command catalog surface metadata.
    2. Update generated CLI reference filtering so default public reference excludes group-only command roots while preserving actionable subcommands.
    3. Replace stale public examples: use cleanup merged/finalize instead of nonexistent work end, remove context status/list, and route dev/advanced/internal commands into explicit hidden/maintenance guidance.
    4. Regenerate generated docs and run focused docs/CLI verification plus routing and doctor.
  Verify Steps: |-
    1. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:onboarding:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run docs:ia:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T17:17:04.604Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified docs/code alignment: docs:cli:check, docs:onboarding:check, docs:ia:check, check-routing, agentplane doctor, package build, and targeted docs-cli test passed. Generated CLI reference now contains cleanup merged and excludes group roots plus advanced/internal docs surface.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:51:36.933Z, excerpt_hash=sha256:de5e186a3bd82f4d9d74fbbd65009163b725739ee36387bcbf6fc4cd8efec075
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131649-61129E-public-cli-docs-surface/.agentplane/tasks/202605131649-61129E/blueprint/resolved-snapshot.json
    - old_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
    - current_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131649-61129E
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Extra docs:site:build was attempted after installing website deps with --ignore-scripts; it failed during existing Docusaurus SSG for duplicate / route/default-export handling, outside this task's changed sidebar/docs contract. docs:site:typecheck passed.
      Impact: Required task verification is green; full Docusaurus production build remains a pre-existing website build issue not introduced by the CLI/docs-surface changes.
      Resolution: Recorded residual build issue explicitly; did not widen this task into website SSG repair.
id_source: "generated"
---
## Summary

Align public CLI docs with user command surface

Separate public user command documentation from developer/advanced surfaces, remove stale command examples, and keep generated CLI reference focused on actionable user commands.

## Scope

- In scope: Separate public user command documentation from developer/advanced surfaces, remove stale command examples, and keep generated CLI reference focused on actionable user commands.
- Out of scope: unrelated refactors not required for "Align public CLI docs with user command surface".

## Plan

1. Inspect CLI docs generator, website docs navigation, and command catalog surface metadata.
2. Update generated CLI reference filtering so default public reference excludes group-only command roots while preserving actionable subcommands.
3. Replace stale public examples: use cleanup merged/finalize instead of nonexistent work end, remove context status/list, and route dev/advanced/internal commands into explicit hidden/maintenance guidance.
4. Regenerate generated docs and run focused docs/CLI verification plus routing and doctor.

## Verify Steps

1. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:onboarding:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run docs:ia:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T17:17:04.604Z — VERIFY — ok

By: CODER

Note: Verified docs/code alignment: docs:cli:check, docs:onboarding:check, docs:ia:check, check-routing, agentplane doctor, package build, and targeted docs-cli test passed. Generated CLI reference now contains cleanup merged and excludes group roots plus advanced/internal docs surface.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:51:36.933Z, excerpt_hash=sha256:de5e186a3bd82f4d9d74fbbd65009163b725739ee36387bcbf6fc4cd8efec075

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131649-61129E-public-cli-docs-surface/.agentplane/tasks/202605131649-61129E/blueprint/resolved-snapshot.json
- old_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
- current_digest: a8880e511722d361a92cf2f3adf9983b11c9ce9ba6480eb83ac165b8653a305b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131649-61129E

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Extra docs:site:build was attempted after installing website deps with --ignore-scripts; it failed during existing Docusaurus SSG for duplicate / route/default-export handling, outside this task's changed sidebar/docs contract. docs:site:typecheck passed.
  Impact: Required task verification is green; full Docusaurus production build remains a pre-existing website build issue not introduced by the CLI/docs-surface changes.
  Resolution: Recorded residual build issue explicitly; did not widen this task into website SSG repair.
