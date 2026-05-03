---
id: "202605031642-2FVS9C"
title: "Add DCO sign-off identity support"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T16:42:58.455Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T17:01:49.660Z"
  updated_by: "CODER"
  note: "Command: bun run framework:dev:bootstrap. Result: pass. Evidence: core, agentplane, and testkit built; repo-local runtime resolved 0.4.2. Scope: rebuilt CLI after DCO/config changes. Command: bun x vitest run focused DCO/commit tests. Result: pass, 27 passed. Scope: DCO helper, commit paths, close commits, commit-msg enforcement. Command: bunx eslint touched TS files. Result: pass. Scope: changed implementation/tests. Command: bun run schemas:check; bun run spec:examples:check; bun run docs:cli:check; bun run format:check; bun run typecheck; node .agentplane/policy/check-routing.mjs; git diff --check. Result: pass. Scope: generated schemas/docs, formatting, type safety, policy routing."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement repository-managed DCO sign-off support for AgentPlane-created commits and commit-msg guidance using Denis Smirnov <densmirnov@me.com>; keep tasks.json deletion out of scope."
events:
  -
    type: "status"
    at: "2026-05-03T16:43:32.098Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement repository-managed DCO sign-off support for AgentPlane-created commits and commit-msg guidance using Denis Smirnov <densmirnov@me.com>; keep tasks.json deletion out of scope."
  -
    type: "verify"
    at: "2026-05-03T17:01:49.660Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run framework:dev:bootstrap. Result: pass. Evidence: core, agentplane, and testkit built; repo-local runtime resolved 0.4.2. Scope: rebuilt CLI after DCO/config changes. Command: bun x vitest run focused DCO/commit tests. Result: pass, 27 passed. Scope: DCO helper, commit paths, close commits, commit-msg enforcement. Command: bunx eslint touched TS files. Result: pass. Scope: changed implementation/tests. Command: bun run schemas:check; bun run spec:examples:check; bun run docs:cli:check; bun run format:check; bun run typecheck; node .agentplane/policy/check-routing.mjs; git diff --check. Result: pass. Scope: generated schemas/docs, formatting, type safety, policy routing."
doc_version: 3
doc_updated_at: "2026-05-03T17:01:49.682Z"
doc_updated_by: "CODER"
description: "Implement repository-managed DCO sign-off behavior using Denis Smirnov <densmirnov@me.com> as the configured sign-off identity, update commit/hook behavior and docs, and keep tasks.json removal out of scope as a separate migration risk."
sections:
  Summary: |-
    Add DCO sign-off identity support
    
    Implement repository-managed DCO sign-off behavior using Denis Smirnov <densmirnov@me.com> as the configured sign-off identity, update commit/hook behavior and docs, and keep tasks.json removal out of scope as a separate migration risk.
  Scope: |-
    - In scope: Implement repository-managed DCO sign-off behavior using Denis Smirnov <densmirnov@me.com> as the configured sign-off identity, update commit/hook behavior and docs, and keep tasks.json removal out of scope as a separate migration risk.
    - Out of scope: unrelated refactors not required for "Add DCO sign-off identity support".
  Plan: |-
    1. Inspect existing commit/hook/config surfaces for commit identity and trailer handling.
    2. Add a repository-managed DCO sign-off contract using Denis Smirnov <densmirnov@me.com> as the configured sign-off identity; keep cryptographic commit signing out of scope unless explicitly requested separately.
    3. Ensure AgentPlane-created commits append/validate a single canonical Signed-off-by trailer and that manual commits through commit-msg get actionable guidance.
    4. Update user/developer docs and generated CLI reference or specs as required by the changed command surface.
    5. Verify with targeted commit/hook tests, lint for touched files, policy routing, doctor, and PR/hosted checks.
    6. Do not delete .agentplane/tasks.json in this task; record it as a separate tracked-file/export migration risk if deletion is desired.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T17:01:49.660Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run framework:dev:bootstrap. Result: pass. Evidence: core, agentplane, and testkit built; repo-local runtime resolved 0.4.2. Scope: rebuilt CLI after DCO/config changes. Command: bun x vitest run focused DCO/commit tests. Result: pass, 27 passed. Scope: DCO helper, commit paths, close commits, commit-msg enforcement. Command: bunx eslint touched TS files. Result: pass. Scope: changed implementation/tests. Command: bun run schemas:check; bun run spec:examples:check; bun run docs:cli:check; bun run format:check; bun run typecheck; node .agentplane/policy/check-routing.mjs; git diff --check. Result: pass. Scope: generated schemas/docs, formatting, type safety, policy routing.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T16:43:32.098Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: agentplane doctor returned OK but reported an unrelated warning: DONE task 202605031624-H1PV7F has a README on disk missing from the git index.
      Impact: This warning predates and is outside the DCO implementation scope; adding that archived task README here would widen the PR beyond approved scope.
      Resolution: Leave 202605031624-H1PV7F archive cleanup for a separate task; no DCO code or docs checks failed.
id_source: "generated"
---
## Summary

Add DCO sign-off identity support

Implement repository-managed DCO sign-off behavior using Denis Smirnov <densmirnov@me.com> as the configured sign-off identity, update commit/hook behavior and docs, and keep tasks.json removal out of scope as a separate migration risk.

## Scope

- In scope: Implement repository-managed DCO sign-off behavior using Denis Smirnov <densmirnov@me.com> as the configured sign-off identity, update commit/hook behavior and docs, and keep tasks.json removal out of scope as a separate migration risk.
- Out of scope: unrelated refactors not required for "Add DCO sign-off identity support".

## Plan

1. Inspect existing commit/hook/config surfaces for commit identity and trailer handling.
2. Add a repository-managed DCO sign-off contract using Denis Smirnov <densmirnov@me.com> as the configured sign-off identity; keep cryptographic commit signing out of scope unless explicitly requested separately.
3. Ensure AgentPlane-created commits append/validate a single canonical Signed-off-by trailer and that manual commits through commit-msg get actionable guidance.
4. Update user/developer docs and generated CLI reference or specs as required by the changed command surface.
5. Verify with targeted commit/hook tests, lint for touched files, policy routing, doctor, and PR/hosted checks.
6. Do not delete .agentplane/tasks.json in this task; record it as a separate tracked-file/export migration risk if deletion is desired.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T17:01:49.660Z — VERIFY — ok

By: CODER

Note: Command: bun run framework:dev:bootstrap. Result: pass. Evidence: core, agentplane, and testkit built; repo-local runtime resolved 0.4.2. Scope: rebuilt CLI after DCO/config changes. Command: bun x vitest run focused DCO/commit tests. Result: pass, 27 passed. Scope: DCO helper, commit paths, close commits, commit-msg enforcement. Command: bunx eslint touched TS files. Result: pass. Scope: changed implementation/tests. Command: bun run schemas:check; bun run spec:examples:check; bun run docs:cli:check; bun run format:check; bun run typecheck; node .agentplane/policy/check-routing.mjs; git diff --check. Result: pass. Scope: generated schemas/docs, formatting, type safety, policy routing.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T16:43:32.098Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: agentplane doctor returned OK but reported an unrelated warning: DONE task 202605031624-H1PV7F has a README on disk missing from the git index.
  Impact: This warning predates and is outside the DCO implementation scope; adding that archived task README here would widen the PR beyond approved scope.
  Resolution: Leave 202605031624-H1PV7F archive cleanup for a separate task; no DCO code or docs checks failed.
