---
id: "202604091444-9ZDH3E"
title: "Refresh branch_pr PR artifacts after plain git commits"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T14:45:44.338Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T15:14:15.092Z"
  updated_by: "CODER"
  note: |-
    Command: bun x prettier --check packages/agentplane/src/commands/pr/integrate/internal/prepare.ts && bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts && bun x eslint packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts
    Result: pass
    Evidence: Prettier matched, 12/12 tests passed, eslint exited 0 after CI formatting fix.
    Scope: current branch head after post-CI formatting for integrate stale-metadata repair.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce stale pr/meta after plain git commits and add a deterministic repair path."
events:
  -
    type: "status"
    at: "2026-04-09T14:45:49.958Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce stale pr/meta after plain git commits and add a deterministic repair path."
  -
    type: "verify"
    at: "2026-04-09T15:07:25.248Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts
      Result: pass
      Evidence: 12/12 tests passed, including stale PR metadata repair before integrate fails.
      Scope: branch_pr integrate preparation and PR artifact freshness repair.
      
      Command: bun x eslint packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts
      Result: pass
      Evidence: eslint exited 0.
      Scope: prepare repair path implementation and tests.
      
      Command: bun run framework:dev:bootstrap
      Result: pass
      Evidence: core + agentplane builds completed and runtime explain reported repo-local runtime ready.
      Scope: compile and runtime validity for the task branch.
  -
    type: "verify"
    at: "2026-04-09T15:14:15.092Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x prettier --check packages/agentplane/src/commands/pr/integrate/internal/prepare.ts && bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts && bun x eslint packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts
      Result: pass
      Evidence: Prettier matched, 12/12 tests passed, eslint exited 0 after CI formatting fix.
      Scope: current branch head after post-CI formatting for integrate stale-metadata repair.
doc_version: 3
doc_updated_at: "2026-04-09T15:14:15.100Z"
doc_updated_by: "CODER"
description: "Make branch_pr tooling recover when a normal git commit after pr update leaves pr/meta head_sha stale, so later push/integrate flows do not require a manual artifact refresh workaround."
sections:
  Summary: |-
    Refresh branch_pr PR artifacts after plain git commits
    
    Make branch_pr tooling recover when a normal git commit after pr update leaves pr/meta head_sha stale, so later push/integrate flows do not require a manual artifact refresh workaround.
  Scope: |-
    - In scope: Make branch_pr tooling recover when a normal git commit after pr update leaves pr/meta head_sha stale, so later push/integrate flows do not require a manual artifact refresh workaround.
    - Out of scope: unrelated refactors not required for "Refresh branch_pr PR artifacts after plain git commits".
  Plan: "1. Reproduce a branch_pr flow where pr/meta is fresh after pr update but becomes stale after a plain git commit on the task branch. 2. Add a deterministic repair path so generic git commits no longer leave head_sha drift that blocks push or integrate. 3. Cover the stale-after-commit path with regression tests and verify push/integrate ergonomics stay correct."
  Verify Steps: "1. Reproduce a branch_pr task branch where agentplane pr update writes fresh meta, then a plain git commit makes .agentplane/tasks/<task-id>/pr/meta.json stale. Expected: the new repair path restores a current head_sha without a manual extra refresh command. 2. Run focused tests for the repaired branch_pr commit path. Expected: push- and integrate-facing PR artifact freshness stays valid after generic commits. 3. Run relevant lint/tests. Expected: branch_pr PR artifact sync behavior remains deterministic and backward compatible."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T15:07:25.248Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts
    Result: pass
    Evidence: 12/12 tests passed, including stale PR metadata repair before integrate fails.
    Scope: branch_pr integrate preparation and PR artifact freshness repair.
    
    Command: bun x eslint packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts
    Result: pass
    Evidence: eslint exited 0.
    Scope: prepare repair path implementation and tests.
    
    Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: core + agentplane builds completed and runtime explain reported repo-local runtime ready.
    Scope: compile and runtime validity for the task branch.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T14:45:49.970Z, excerpt_hash=sha256:f48312edab89f3ffd8ad84dc45b20dec90e2e7d9632e05e1e63ebc6e4b4f16fc
    
    ### 2026-04-09T15:14:15.092Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x prettier --check packages/agentplane/src/commands/pr/integrate/internal/prepare.ts && bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts && bun x eslint packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts
    Result: pass
    Evidence: Prettier matched, 12/12 tests passed, eslint exited 0 after CI formatting fix.
    Scope: current branch head after post-CI formatting for integrate stale-metadata repair.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T15:07:25.252Z, excerpt_hash=sha256:f48312edab89f3ffd8ad84dc45b20dec90e2e7d9632e05e1e63ebc6e4b4f16fc
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refresh branch_pr PR artifacts after plain git commits

Make branch_pr tooling recover when a normal git commit after pr update leaves pr/meta head_sha stale, so later push/integrate flows do not require a manual artifact refresh workaround.

## Scope

- In scope: Make branch_pr tooling recover when a normal git commit after pr update leaves pr/meta head_sha stale, so later push/integrate flows do not require a manual artifact refresh workaround.
- Out of scope: unrelated refactors not required for "Refresh branch_pr PR artifacts after plain git commits".

## Plan

1. Reproduce a branch_pr flow where pr/meta is fresh after pr update but becomes stale after a plain git commit on the task branch. 2. Add a deterministic repair path so generic git commits no longer leave head_sha drift that blocks push or integrate. 3. Cover the stale-after-commit path with regression tests and verify push/integrate ergonomics stay correct.

## Verify Steps

1. Reproduce a branch_pr task branch where agentplane pr update writes fresh meta, then a plain git commit makes .agentplane/tasks/<task-id>/pr/meta.json stale. Expected: the new repair path restores a current head_sha without a manual extra refresh command. 2. Run focused tests for the repaired branch_pr commit path. Expected: push- and integrate-facing PR artifact freshness stays valid after generic commits. 3. Run relevant lint/tests. Expected: branch_pr PR artifact sync behavior remains deterministic and backward compatible.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T15:07:25.248Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts
Result: pass
Evidence: 12/12 tests passed, including stale PR metadata repair before integrate fails.
Scope: branch_pr integrate preparation and PR artifact freshness repair.

Command: bun x eslint packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts
Result: pass
Evidence: eslint exited 0.
Scope: prepare repair path implementation and tests.

Command: bun run framework:dev:bootstrap
Result: pass
Evidence: core + agentplane builds completed and runtime explain reported repo-local runtime ready.
Scope: compile and runtime validity for the task branch.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T14:45:49.970Z, excerpt_hash=sha256:f48312edab89f3ffd8ad84dc45b20dec90e2e7d9632e05e1e63ebc6e4b4f16fc

### 2026-04-09T15:14:15.092Z — VERIFY — ok

By: CODER

Note: Command: bun x prettier --check packages/agentplane/src/commands/pr/integrate/internal/prepare.ts && bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts && bun x eslint packages/agentplane/src/commands/pr/integrate/internal/prepare.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts
Result: pass
Evidence: Prettier matched, 12/12 tests passed, eslint exited 0 after CI formatting fix.
Scope: current branch head after post-CI formatting for integrate stale-metadata repair.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T15:07:25.252Z, excerpt_hash=sha256:f48312edab89f3ffd8ad84dc45b20dec90e2e7d9632e05e1e63ebc6e4b4f16fc

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
