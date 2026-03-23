---
id: "202603231310-4HT1BS"
title: "R13: Document runner and scenario execute contracts"
result_summary: "Aligned recipe runner docs and CLI reference with scenario execute and task run."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 8
depends_on:
  - "202603231310-Y9DZYE"
tags:
  - "docs"
  - "cli"
  - "runner"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T13:10:57.526Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved task graph for runner/scenario execute rollout"
verification:
  state: "ok"
  updated_at: "2026-03-23T15:18:55.887Z"
  updated_by: "REVIEWER"
  note: "Docs, generated CLI reference, and live help text now align on the shared runner contract: scenario run stays preview-only, scenario execute materializes a task and executes the runner, task run documents dry-run and execution. Checks: node .agentplane/policy/check-routing.mjs; agentplane doctor; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u; bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx."
commit:
  hash: "9fdf7ceba1e0c6bfd264a9ddea4be958d1b95e7c"
  message: "✅ 4HT1BS docs: done"
comments:
  -
    author: "DOCS"
    body: "Start: update runner and recipe execution documentation so scenario run remains preview-only, scenario execute reflects the live shared flow, and task run/scenario execute contracts match help text and implementation."
  -
    author: "DOCS"
    body: "Verified: align recipe runner docs, generated CLI reference, and task help text with the shared task/scenario execution contract."
events:
  -
    type: "status"
    at: "2026-03-23T15:07:37.627Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: update runner and recipe execution documentation so scenario run remains preview-only, scenario execute reflects the live shared flow, and task run/scenario execute contracts match help text and implementation."
  -
    type: "verify"
    at: "2026-03-23T15:18:55.887Z"
    author: "REVIEWER"
    state: "ok"
    note: "Docs, generated CLI reference, and live help text now align on the shared runner contract: scenario run stays preview-only, scenario execute materializes a task and executes the runner, task run documents dry-run and execution. Checks: node .agentplane/policy/check-routing.mjs; agentplane doctor; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u; bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx."
  -
    type: "status"
    at: "2026-03-23T15:19:09.307Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: align recipe runner docs, generated CLI reference, and task help text with the shared task/scenario execution contract."
doc_version: 3
doc_updated_at: "2026-03-23T15:19:13.489Z"
doc_updated_by: "DOCS"
description: "Update CLI reference, recipes docs, and architecture docs to reflect task run, scenario execute, and the preview-only scenario run split."
sections:
  Summary: |-
    R13: Document runner and scenario execute contracts
    
    Update CLI reference, recipes docs, and architecture docs to reflect task run, scenario execute, and the preview-only scenario run split.
  Scope: |-
    - In scope: Update CLI reference, recipes docs, and architecture docs to reflect task run, scenario execute, and the preview-only scenario run split.
    - Out of scope: unrelated refactors not required for "R13: Document runner and scenario execute contracts".
  Plan: |-
    1. Update CLI reference and user-facing docs for task run and scenario execute.
    2. Update recipes and architecture docs to explain the shared runner flow and preview-only scenario run.
    3. Refresh regression matrix or testing docs where command coverage changed.
  Verify Steps: |-
    1. Inspect user docs and CLI reference. Expected: task run and scenario execute are documented and scenario run is still described as preview-only.
    2. Run doc freshness or reference generation checks relevant to the changed docs. Expected: generated reference and docs stay in sync.
    3. Review architecture and recipe docs. Expected: they describe one shared runner flow instead of duplicated task/recipe execution logic.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T15:18:55.887Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Docs, generated CLI reference, and live help text now align on the shared runner contract: scenario run stays preview-only, scenario execute materializes a task and executes the runner, task run documents dry-run and execution. Checks: node .agentplane/policy/check-routing.mjs; agentplane doctor; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u; bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T15:07:37.628Z, excerpt_hash=sha256:2331d4ee766b87b77b31a575ee01b0b9180b68724704fa78db35841bdee9fe98
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

R13: Document runner and scenario execute contracts

Update CLI reference, recipes docs, and architecture docs to reflect task run, scenario execute, and the preview-only scenario run split.

## Scope

- In scope: Update CLI reference, recipes docs, and architecture docs to reflect task run, scenario execute, and the preview-only scenario run split.
- Out of scope: unrelated refactors not required for "R13: Document runner and scenario execute contracts".

## Plan

1. Update CLI reference and user-facing docs for task run and scenario execute.
2. Update recipes and architecture docs to explain the shared runner flow and preview-only scenario run.
3. Refresh regression matrix or testing docs where command coverage changed.

## Verify Steps

1. Inspect user docs and CLI reference. Expected: task run and scenario execute are documented and scenario run is still described as preview-only.
2. Run doc freshness or reference generation checks relevant to the changed docs. Expected: generated reference and docs stay in sync.
3. Review architecture and recipe docs. Expected: they describe one shared runner flow instead of duplicated task/recipe execution logic.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T15:18:55.887Z — VERIFY — ok

By: REVIEWER

Note: Docs, generated CLI reference, and live help text now align on the shared runner contract: scenario run stays preview-only, scenario execute materializes a task and executes the runner, task run documents dry-run and execution. Checks: node .agentplane/policy/check-routing.mjs; agentplane doctor; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u; bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T15:07:37.628Z, excerpt_hash=sha256:2331d4ee766b87b77b31a575ee01b0b9180b68724704fa78db35841bdee9fe98

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
