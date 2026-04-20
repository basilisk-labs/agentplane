---
id: "202604201717-96ZTA5"
title: "Update CI selectors after Epic L test split"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T17:18:09.440Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: repair CI routing references after Epic L split."
events:
  -
    type: "status"
    at: "2026-04-20T17:18:09.752Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair CI routing references after Epic L split."
doc_version: 3
doc_updated_at: "2026-04-20T17:18:09.761Z"
doc_updated_by: "CODER"
description: "Refresh local CI selection, significant coverage, and Vitest project references after Epic L removed aggregate test files."
sections:
  Summary: |-
    Update CI selectors after Epic L test split
    
    Refresh local CI selection, significant coverage, and Vitest project references after Epic L removed aggregate test files.
  Scope: |-
    - In scope: Refresh local CI selection, significant coverage, and Vitest project references after Epic L removed aggregate test files.
    - Out of scope: unrelated refactors not required for "Update CI selectors after Epic L test split".
  Plan: "Replace stale references to removed aggregate Epic L test files in local CI selection, Vitest project configuration, and significant coverage checks. Use the new split test filenames instead of legacy finish.unit, task-backend.redmine, run-cli.core.tasks, run-cli.core.tasks.query, and run-cli.core.pr-flow.integrate aggregate files. Verification: rg confirms no stale filenames remain; bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts; bun run coverage:significant; bun run typecheck; bun run lint:core; bun run format:check."
  Verify Steps: |-
    1. Review the requested outcome for "Update CI selectors after Epic L test split". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Update CI selectors after Epic L test split

Refresh local CI selection, significant coverage, and Vitest project references after Epic L removed aggregate test files.

## Scope

- In scope: Refresh local CI selection, significant coverage, and Vitest project references after Epic L removed aggregate test files.
- Out of scope: unrelated refactors not required for "Update CI selectors after Epic L test split".

## Plan

Replace stale references to removed aggregate Epic L test files in local CI selection, Vitest project configuration, and significant coverage checks. Use the new split test filenames instead of legacy finish.unit, task-backend.redmine, run-cli.core.tasks, run-cli.core.tasks.query, and run-cli.core.pr-flow.integrate aggregate files. Verification: rg confirms no stale filenames remain; bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts; bun run coverage:significant; bun run typecheck; bun run lint:core; bun run format:check.

## Verify Steps

1. Review the requested outcome for "Update CI selectors after Epic L test split". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
