---
id: "202604091444-NS0RG8"
title: "Repair legacy lefthook installs during framework bootstrap"
result_summary: "Merged via PR #193."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hooks"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T14:45:54.891Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T15:14:15.086Z"
  updated_by: "CODER"
  note: |-
    Command: bun x prettier --check packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts scripts/bootstrap-framework-dev.mjs && bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts && bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
    Result: pass
    Evidence: Prettier matched, bootstrap tests passed, eslint exited 0 after CI formatting fix.
    Scope: current branch head after post-CI formatting for legacy lefthook bootstrap repair.
commit:
  hash: "9210627d6a31587cea2ce817dc026caaa673ff2e"
  message: "hooks/workflow: Repair legacy lefthook installs during framework bootstrap (NS0RG8) (#193)"
comments:
  -
    author: "CODER"
    body: "Start: reproduce stale lefthook-managed git hooks and repair them through bootstrap-managed hook installation."
  -
    author: "INTEGRATOR"
    body: "Verified: hosted checks passed, PR #193 was squash-merged, and the merged commit is recorded on main."
events:
  -
    type: "status"
    at: "2026-04-09T14:45:59.766Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce stale lefthook-managed git hooks and repair them through bootstrap-managed hook installation."
  -
    type: "verify"
    at: "2026-04-09T15:07:25.299Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
      Result: pass
      Evidence: 7/7 tests passed, including legacy lefthook repair coverage.
      Scope: framework bootstrap and hook repair flow.
      
      Command: bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
      Result: pass
      Evidence: eslint exited 0.
      Scope: bootstrap script and regression tests.
      
      Command: bun run framework:dev:bootstrap
      Result: pass
      Evidence: core + agentplane builds completed, legacy hooks repaired, and runtime explain reported repo-local runtime ready.
      Scope: end-to-end bootstrap behavior in a framework worktree.
  -
    type: "verify"
    at: "2026-04-09T15:14:15.086Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x prettier --check packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts scripts/bootstrap-framework-dev.mjs && bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts && bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
      Result: pass
      Evidence: Prettier matched, bootstrap tests passed, eslint exited 0 after CI formatting fix.
      Scope: current branch head after post-CI formatting for legacy lefthook bootstrap repair.
  -
    type: "status"
    at: "2026-04-09T15:26:39.760Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: hosted checks passed, PR #193 was squash-merged, and the merged commit is recorded on main."
doc_version: 3
doc_updated_at: "2026-04-09T15:26:39.760Z"
doc_updated_by: "INTEGRATOR"
description: "Make framework bootstrap or managed hook flow detect and replace stale lefthook-generated git hooks so task worktrees do not silently skip pre-commit or pre-push when agentplane-managed hooks are expected."
sections:
  Summary: |-
    Repair legacy lefthook installs during framework bootstrap
    
    Make framework bootstrap or managed hook flow detect and replace stale lefthook-generated git hooks so task worktrees do not silently skip pre-commit or pre-push when agentplane-managed hooks are expected.
  Scope: |-
    - In scope: Make framework bootstrap or managed hook flow detect and replace stale lefthook-generated git hooks so task worktrees do not silently skip pre-commit or pre-push when agentplane-managed hooks are expected.
    - Out of scope: unrelated refactors not required for "Repair legacy lefthook installs during framework bootstrap".
  Plan: |-
    1. Implement the change for "Repair legacy lefthook installs during framework bootstrap".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: "1. Reproduce a checkout with legacy lefthook-generated git hooks. Expected: the improved bootstrap or hook repair path detects and replaces them with agentplane-managed hooks. 2. Run focused hook/bootstrap tests. Expected: fresh worktrees end with deterministic managed hooks instead of external lefthook shims. 3. Run relevant lint/tests. Expected: hook install and bootstrap flows remain valid for existing managed-checkout users."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T15:07:25.299Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
    Result: pass
    Evidence: 7/7 tests passed, including legacy lefthook repair coverage.
    Scope: framework bootstrap and hook repair flow.
    
    Command: bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
    Result: pass
    Evidence: eslint exited 0.
    Scope: bootstrap script and regression tests.
    
    Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: core + agentplane builds completed, legacy hooks repaired, and runtime explain reported repo-local runtime ready.
    Scope: end-to-end bootstrap behavior in a framework worktree.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T14:45:59.777Z, excerpt_hash=sha256:f5d756b3ef5d6d1add52d6667119e6a026231f801820620cd4e45ae291d99b4a
    
    ### 2026-04-09T15:14:15.086Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x prettier --check packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts scripts/bootstrap-framework-dev.mjs && bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts && bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
    Result: pass
    Evidence: Prettier matched, bootstrap tests passed, eslint exited 0 after CI formatting fix.
    Scope: current branch head after post-CI formatting for legacy lefthook bootstrap repair.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T15:07:25.303Z, excerpt_hash=sha256:f5d756b3ef5d6d1add52d6667119e6a026231f801820620cd4e45ae291d99b4a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Repair legacy lefthook installs during framework bootstrap

Make framework bootstrap or managed hook flow detect and replace stale lefthook-generated git hooks so task worktrees do not silently skip pre-commit or pre-push when agentplane-managed hooks are expected.

## Scope

- In scope: Make framework bootstrap or managed hook flow detect and replace stale lefthook-generated git hooks so task worktrees do not silently skip pre-commit or pre-push when agentplane-managed hooks are expected.
- Out of scope: unrelated refactors not required for "Repair legacy lefthook installs during framework bootstrap".

## Plan

1. Implement the change for "Repair legacy lefthook installs during framework bootstrap".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Reproduce a checkout with legacy lefthook-generated git hooks. Expected: the improved bootstrap or hook repair path detects and replaces them with agentplane-managed hooks. 2. Run focused hook/bootstrap tests. Expected: fresh worktrees end with deterministic managed hooks instead of external lefthook shims. 3. Run relevant lint/tests. Expected: hook install and bootstrap flows remain valid for existing managed-checkout users.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T15:07:25.299Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
Result: pass
Evidence: 7/7 tests passed, including legacy lefthook repair coverage.
Scope: framework bootstrap and hook repair flow.

Command: bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
Result: pass
Evidence: eslint exited 0.
Scope: bootstrap script and regression tests.

Command: bun run framework:dev:bootstrap
Result: pass
Evidence: core + agentplane builds completed, legacy hooks repaired, and runtime explain reported repo-local runtime ready.
Scope: end-to-end bootstrap behavior in a framework worktree.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T14:45:59.777Z, excerpt_hash=sha256:f5d756b3ef5d6d1add52d6667119e6a026231f801820620cd4e45ae291d99b4a

### 2026-04-09T15:14:15.086Z — VERIFY — ok

By: CODER

Note: Command: bun x prettier --check packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts scripts/bootstrap-framework-dev.mjs && bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts && bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
Result: pass
Evidence: Prettier matched, bootstrap tests passed, eslint exited 0 after CI formatting fix.
Scope: current branch head after post-CI formatting for legacy lefthook bootstrap repair.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T15:07:25.303Z, excerpt_hash=sha256:f5d756b3ef5d6d1add52d6667119e6a026231f801820620cd4e45ae291d99b4a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
