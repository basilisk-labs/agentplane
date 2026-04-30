---
id: "202604301955-HKY8NW"
title: "Add docs IA and path drift guard"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604301955-D7JQB7"
tags:
  - "code"
  - "docs-ia"
  - "tooling"
verify:
  - "bun run docs:ia:check"
  - "bun run docs:scripts:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T19:56:51.273Z"
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
    body: "Start: implement the approved docs IA/path drift guard in the task worktree, keep the change limited to the docs script surface, and verify with docs:ia:check plus docs script checks."
events:
  -
    type: "status"
    at: "2026-04-30T20:35:18.846Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved docs IA/path drift guard in the task worktree, keep the change limited to the docs script surface, and verify with docs:ia:check plus docs script checks."
doc_version: 3
doc_updated_at: "2026-04-30T20:35:18.846Z"
doc_updated_by: "CODER"
description: "Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist."
sections:
  Summary: |-
    Add docs IA and path drift guard
    
    Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist.
  Scope: |-
    - In scope: Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist.
    - Out of scope: unrelated refactors not required for "Add docs IA and path drift guard".
  Plan: "1. Add a docs IA check script that extracts sidebar doc IDs and docs/index.mdx links and reports mismatches. 2. Add path-reference validation for repository paths mentioned in markdown. 3. Wire the script into package.json and regenerate scripts/README.md. 4. Run bun run docs:ia:check and bun run docs:scripts:check."
  Verify Steps: |-
    1. Run `bun run docs:ia:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Add docs IA and path drift guard

Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist.

## Scope

- In scope: Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist.
- Out of scope: unrelated refactors not required for "Add docs IA and path drift guard".

## Plan

1. Add a docs IA check script that extracts sidebar doc IDs and docs/index.mdx links and reports mismatches. 2. Add path-reference validation for repository paths mentioned in markdown. 3. Wire the script into package.json and regenerate scripts/README.md. 4. Run bun run docs:ia:check and bun run docs:scripts:check.

## Verify Steps

1. Run `bun run docs:ia:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
