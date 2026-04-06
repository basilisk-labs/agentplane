---
id: "202604062024-33MZPB"
title: "Emit post-integrate bootstrap guidance for stale framework runtime"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T20:24:35.819Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T20:35:33.437Z"
  updated_by: "CODER"
  note: "Integrate now emits explicit bootstrap guidance when watched runtime paths change; targeted vitest and eslint passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement post-integrate bootstrap guidance and lock it with regression tests."
events:
  -
    type: "status"
    at: "2026-04-06T20:29:03.269Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement post-integrate bootstrap guidance and lock it with regression tests."
  -
    type: "verify"
    at: "2026-04-06T20:32:23.885Z"
    author: "CODER"
    state: "ok"
    note: "Targeted integrate-path tests passed; explicit post-integrate bootstrap guidance is emitted only for watched runtime diffs; repo-local runtime rebuilt with framework:dev:bootstrap."
  -
    type: "verify"
    at: "2026-04-06T20:35:33.437Z"
    author: "CODER"
    state: "ok"
    note: "Integrate now emits explicit bootstrap guidance when watched runtime paths change; targeted vitest and eslint passed."
doc_version: 3
doc_updated_at: "2026-04-06T20:35:33.456Z"
doc_updated_by: "CODER"
description: "When branch_pr integrate mutates watched runtime sources inside a framework checkout, print an explicit bootstrap follow-up so operators do not discover the stale repo-local build only on the next command."
sections:
  Summary: |-
    Emit post-integrate bootstrap guidance for stale framework runtime
    
    When branch_pr integrate mutates watched runtime sources inside a framework checkout, print an explicit bootstrap follow-up so operators do not discover the stale repo-local build only on the next command.
  Scope: |-
    - In scope: When branch_pr integrate mutates watched runtime sources inside a framework checkout, print an explicit bootstrap follow-up so operators do not discover the stale repo-local build only on the next command.
    - Out of scope: unrelated refactors not required for "Emit post-integrate bootstrap guidance for stale framework runtime".
  Plan: "1. Trace where integrate already knows that watched runtime sources changed but leaves the operator to discover stale-build drift only on the next command. 2. Emit explicit post-integrate bootstrap guidance when a framework checkout will require repo-local rebuild. 3. Keep the signal low-noise and lock it with command-level regression tests. 4. Verify with targeted tests plus one integrate-path check if needed."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts`. Expected: integrate warns only when watched runtime paths changed and stays silent for unrelated diffs.
    2. Run `bun x eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts`. Expected: lint exits 0.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    - `bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts` passed.
    - `bun x eslint packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts` passed.
    - `bun run framework:dev:bootstrap` passed and rebuilt the repo-local runtime after the source change.
    
    ### 2026-04-06T20:32:23.885Z — VERIFY — ok
    
    By: CODER
    
    Note: Targeted integrate-path tests passed; explicit post-integrate bootstrap guidance is emitted only for watched runtime diffs; repo-local runtime rebuilt with framework:dev:bootstrap.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T20:29:03.305Z, excerpt_hash=sha256:c9903c14486843e8cd1f9324a9b31bf3754073ffa63c8593541119ad781490ea
    
    ### 2026-04-06T20:35:33.437Z — VERIFY — ok
    
    By: CODER
    
    Note: Integrate now emits explicit bootstrap guidance when watched runtime paths change; targeted vitest and eslint passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T20:35:30.817Z, excerpt_hash=sha256:89818e8a8a31d4d7572a4bc0ecdd790e973bf7bcb9708920c5fee1cbe6364165
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Root cause: integrate already knew which paths changed, but it emitted no immediate bootstrap guidance after mutating watched runtime sources in a framework checkout.
    - Impact: operators only discovered repo-local stale-build drift on the next command, which turned a completed integrate into a delayed workflow failure.
    - Resolution: detect watched runtime path changes from the integrate diff and emit an explicit `bun run framework:dev:bootstrap` warning at the end of a successful non-quiet integrate.
id_source: "generated"
---
## Summary

Emit post-integrate bootstrap guidance for stale framework runtime

When branch_pr integrate mutates watched runtime sources inside a framework checkout, print an explicit bootstrap follow-up so operators do not discover the stale repo-local build only on the next command.

## Scope

- In scope: When branch_pr integrate mutates watched runtime sources inside a framework checkout, print an explicit bootstrap follow-up so operators do not discover the stale repo-local build only on the next command.
- Out of scope: unrelated refactors not required for "Emit post-integrate bootstrap guidance for stale framework runtime".

## Plan

1. Trace where integrate already knows that watched runtime sources changed but leaves the operator to discover stale-build drift only on the next command. 2. Emit explicit post-integrate bootstrap guidance when a framework checkout will require repo-local rebuild. 3. Keep the signal low-noise and lock it with command-level regression tests. 4. Verify with targeted tests plus one integrate-path check if needed.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts`. Expected: integrate warns only when watched runtime paths changed and stays silent for unrelated diffs.
2. Run `bun x eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts`. Expected: lint exits 0.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
- `bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts` passed.
- `bun x eslint packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts` passed.
- `bun run framework:dev:bootstrap` passed and rebuilt the repo-local runtime after the source change.

### 2026-04-06T20:32:23.885Z — VERIFY — ok

By: CODER

Note: Targeted integrate-path tests passed; explicit post-integrate bootstrap guidance is emitted only for watched runtime diffs; repo-local runtime rebuilt with framework:dev:bootstrap.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T20:29:03.305Z, excerpt_hash=sha256:c9903c14486843e8cd1f9324a9b31bf3754073ffa63c8593541119ad781490ea

### 2026-04-06T20:35:33.437Z — VERIFY — ok

By: CODER

Note: Integrate now emits explicit bootstrap guidance when watched runtime paths change; targeted vitest and eslint passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T20:35:30.817Z, excerpt_hash=sha256:89818e8a8a31d4d7572a4bc0ecdd790e973bf7bcb9708920c5fee1cbe6364165

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Root cause: integrate already knew which paths changed, but it emitted no immediate bootstrap guidance after mutating watched runtime sources in a framework checkout.
- Impact: operators only discovered repo-local stale-build drift on the next command, which turned a completed integrate into a delayed workflow failure.
- Resolution: detect watched runtime path changes from the integrate diff and emit an explicit `bun run framework:dev:bootstrap` warning at the end of a successful non-quiet integrate.
