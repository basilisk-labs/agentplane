---
id: "202605031256-758Q7Z"
title: "Remove config.json from managed repository state"
result_summary: "config.json removed from managed repository state."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202605031255-E1YFBV"
tags:
  - "code"
  - "config"
verify:
  - "agentplane doctor"
  - "bun test packages/core/src/config packages/agentplane/src/cli packages/agentplane/src/workflow-runtime"
  - "rg 'config.json' docs packages/spec packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T12:58:16.626Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T13:28:32.271Z"
  updated_by: "CODER"
  note: ".agentplane/config.json is deleted; saveConfig removes legacy config.json; doctor requires WORKFLOW.md; testkit writes WORKFLOW-backed config."
commit:
  hash: "c02111e054b00ac06e7277733a65e88cbb557391"
  message: "✅ GV0N4K close: Merged via PR #814. (202605031255-GV0N4K) [config,docs,workflow] (#817)"
comments:
  -
    author: "CODER"
    body: "Start: Removed .agentplane/config.json from managed repository state and adjusted doctor/testkit/docs surfaces."
  -
    author: "CODER"
    body: "Verified: managed config.json is removed and only explicit legacy import support remains."
events:
  -
    type: "status"
    at: "2026-05-03T13:28:31.903Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Removed .agentplane/config.json from managed repository state and adjusted doctor/testkit/docs surfaces."
  -
    type: "verify"
    at: "2026-05-03T13:28:32.271Z"
    author: "CODER"
    state: "ok"
    note: ".agentplane/config.json is deleted; saveConfig removes legacy config.json; doctor requires WORKFLOW.md; testkit writes WORKFLOW-backed config."
  -
    type: "status"
    at: "2026-05-03T13:40:48.166Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: managed config.json is removed and only explicit legacy import support remains."
doc_version: 3
doc_updated_at: "2026-05-03T13:40:48.166Z"
doc_updated_by: "CODER"
description: "Delete .agentplane/config.json as a generated/managed artifact for current repositories, migrate examples and docs to WORKFLOW.md v2, remove config.json schema expectations from setup output, and keep only legacy import/upgrade support where needed."
sections:
  Summary: |-
    Remove config.json from managed repository state

    Delete .agentplane/config.json as a generated/managed artifact for current repositories, migrate examples and docs to WORKFLOW.md v2, remove config.json schema expectations from setup output, and keep only legacy import/upgrade support where needed.
  Scope: |-
    - In scope: Delete .agentplane/config.json as a generated/managed artifact for current repositories, migrate examples and docs to WORKFLOW.md v2, remove config.json schema expectations from setup output, and keep only legacy import/upgrade support where needed.
    - Out of scope: unrelated refactors not required for "Remove config.json from managed repository state".
  Plan: "Remove config.json from managed current repository state. Migrate docs, examples, schemas, setup output, tests, and generated artifacts to WORKFLOW.md v2. Keep only explicit legacy import/upgrade support. Acceptance: fresh init does not create .agentplane/config.json and repository docs no longer present it as canonical."
  Verify Steps: |-
    1. Run `rg "config\.json" docs packages/spec packages/core packages/agentplane`. Expected: any matches are explicit legacy import/schema references, not current canonical config guidance.
    2. Run `bun test packages/core/src/config packages/agentplane/src/cli packages/agentplane/src/workflow-runtime`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T13:28:32.271Z — VERIFY — ok

    By: CODER

    Note: .agentplane/config.json is deleted; saveConfig removes legacy config.json; doctor requires WORKFLOW.md; testkit writes WORKFLOW-backed config.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:28:31.903Z, excerpt_hash=sha256:490bacaf83ca0bf66c46d1a6828dc8fd7c50d3dc6237ee12682d4f131751a8d9

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove config.json from managed repository state

Delete .agentplane/config.json as a generated/managed artifact for current repositories, migrate examples and docs to WORKFLOW.md v2, remove config.json schema expectations from setup output, and keep only legacy import/upgrade support where needed.

## Scope

- In scope: Delete .agentplane/config.json as a generated/managed artifact for current repositories, migrate examples and docs to WORKFLOW.md v2, remove config.json schema expectations from setup output, and keep only legacy import/upgrade support where needed.
- Out of scope: unrelated refactors not required for "Remove config.json from managed repository state".

## Plan

Remove config.json from managed current repository state. Migrate docs, examples, schemas, setup output, tests, and generated artifacts to WORKFLOW.md v2. Keep only explicit legacy import/upgrade support. Acceptance: fresh init does not create .agentplane/config.json and repository docs no longer present it as canonical.

## Verify Steps

1. Run `rg "config\.json" docs packages/spec packages/core packages/agentplane`. Expected: any matches are explicit legacy import/schema references, not current canonical config guidance.
2. Run `bun test packages/core/src/config packages/agentplane/src/cli packages/agentplane/src/workflow-runtime`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T13:28:32.271Z — VERIFY — ok

By: CODER

Note: .agentplane/config.json is deleted; saveConfig removes legacy config.json; doctor requires WORKFLOW.md; testkit writes WORKFLOW-backed config.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:28:31.903Z, excerpt_hash=sha256:490bacaf83ca0bf66c46d1a6828dc8fd7c50d3dc6237ee12682d4f131751a8d9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
