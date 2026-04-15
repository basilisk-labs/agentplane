---
id: "202604150716-0FJK7K"
title: "Fix exact-sha workflow-dispatch identity for release recovery"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-15T07:17:20.397Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T07:59:39.594Z"
  updated_by: "CODER"
  note: "Command: bun vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. Result: pass. Evidence: 10 targeted tests passed, including workflow_dispatch recovery alias and explicit run-id mismatch coverage. Scope: Core CI exact-sha artifact identity and release-ready source resolution for historical recovery."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Fix workflow-dispatch exact-SHA recovery so historical release candidates can mint and resolve release-ready artifacts by the requested commit instead of the dispatch branch head, then use that exact path to publish v0.3.11."
events:
  -
    type: "status"
    at: "2026-04-15T07:17:49.176Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix workflow-dispatch exact-SHA recovery so historical release candidates can mint and resolve release-ready artifacts by the requested commit instead of the dispatch branch head, then use that exact path to publish v0.3.11."
  -
    type: "verify"
    at: "2026-04-15T07:59:39.594Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. Result: pass. Evidence: 10 targeted tests passed, including workflow_dispatch recovery alias and explicit run-id mismatch coverage. Scope: Core CI exact-sha artifact identity and release-ready source resolution for historical recovery."
doc_version: 3
doc_updated_at: "2026-04-15T07:59:39.597Z"
doc_updated_by: "CODER"
description: "Workflow-dispatch Core CI currently checks out a historical SHA but still records GitHub run/head metadata and release-ready identity against the dispatch branch head, so release recovery for d95b2762... remains blocked. Align workflow, manifest, and resolver logic so exact-SHA recovery is real, then use it to publish v0.3.11."
sections:
  Summary: |-
    Fix exact-sha workflow-dispatch identity for release recovery
    
    Workflow-dispatch Core CI currently checks out a historical SHA but still records GitHub run/head metadata and release-ready identity against the dispatch branch head, so release recovery for d95b2762... remains blocked. Align workflow, manifest, and resolver logic so exact-SHA recovery is real, then use it to publish v0.3.11.
  Scope: |-
    - In scope: Workflow-dispatch Core CI currently checks out a historical SHA but still records GitHub run/head metadata and release-ready identity against the dispatch branch head, so release recovery for d95b2762... remains blocked. Align workflow, manifest, and resolver logic so exact-SHA recovery is real, then use it to publish v0.3.11.
    - Out of scope: unrelated refactors not required for "Fix exact-sha workflow-dispatch identity for release recovery".
  Plan: "1. Make workflow-dispatch Core CI carry the requested release SHA into release-ready identity instead of using the dispatch branch head. 2. Teach release-ready resolution/publish recovery to accept workflow-dispatch recovery runs for an exact historical SHA. 3. Verify against d95b2762f78815b60407a62f2227136c85cae5ee, then publish v0.3.11."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T07:59:39.594Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. Result: pass. Evidence: 10 targeted tests passed, including workflow_dispatch recovery alias and explicit run-id mismatch coverage. Scope: Core CI exact-sha artifact identity and release-ready source resolution for historical recovery.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T07:17:49.191Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix exact-sha workflow-dispatch identity for release recovery

Workflow-dispatch Core CI currently checks out a historical SHA but still records GitHub run/head metadata and release-ready identity against the dispatch branch head, so release recovery for d95b2762... remains blocked. Align workflow, manifest, and resolver logic so exact-SHA recovery is real, then use it to publish v0.3.11.

## Scope

- In scope: Workflow-dispatch Core CI currently checks out a historical SHA but still records GitHub run/head metadata and release-ready identity against the dispatch branch head, so release recovery for d95b2762... remains blocked. Align workflow, manifest, and resolver logic so exact-SHA recovery is real, then use it to publish v0.3.11.
- Out of scope: unrelated refactors not required for "Fix exact-sha workflow-dispatch identity for release recovery".

## Plan

1. Make workflow-dispatch Core CI carry the requested release SHA into release-ready identity instead of using the dispatch branch head. 2. Teach release-ready resolution/publish recovery to accept workflow-dispatch recovery runs for an exact historical SHA. 3. Verify against d95b2762f78815b60407a62f2227136c85cae5ee, then publish v0.3.11.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T07:59:39.594Z — VERIFY — ok

By: CODER

Note: Command: bun vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. Result: pass. Evidence: 10 targeted tests passed, including workflow_dispatch recovery alias and explicit run-id mismatch coverage. Scope: Core CI exact-sha artifact identity and release-ready source resolution for historical recovery.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T07:17:49.191Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
