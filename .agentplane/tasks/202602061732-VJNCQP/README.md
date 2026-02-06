---
id: "202602061732-VJNCQP"
title: "P0.2: stageAllowlist must stage deletes/renames"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "git"
  - "workflow"
  - "cli"
  - "guard"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T17:50:10.054Z"
  updated_by: "CODER"
  note: "Approved: stageAllowlist uses git add -A; add deletion regression test."
verification:
  state: "ok"
  updated_at: "2026-02-06T17:51:37.099Z"
  updated_by: "TESTER"
  note: "bun run test:cli:core passed; added lifecycle regression test covering deletion staging under allowlist."
commit:
  hash: "45d27fa683ac84352d13056e44893c6407531f79"
  message: "✨ VJNCQP stage allowlist with git add -A"
comments:
  -
    author: "CODER"
    body: "Start: Switch stageAllowlist to git add -A and add regression test for deleted file staging."
  -
    author: "CODER"
    body: "Verified: stageAllowlist now uses git add -A -- <paths...> for deterministic staging of deletes/renames; added CLI lifecycle regression test for deletion staging; bun run test:cli:core passed."
doc_version: 2
doc_updated_at: "2026-02-06T17:53:21.320Z"
doc_updated_by: "CODER"
description: "Update stageAllowlist to use git add -A -- <paths...> so deletes/renames are staged correctly under allowlist."
id_source: "generated"
---
## Summary

Fix stageAllowlist to stage deletions/renames reliably by using git add -A -- <paths...>.

## Scope

packages/agentplane/src/commands/guard/index.ts: stageAllowlist.

## Plan

1) Switch stageAllowlist to git add -A.\n2) Add CLI lifecycle regression test covering deleted file staging under allowlist.\n3) Run bun run test:cli:core.

## Risks

Risk: -A stages all changes under each allowed pathspec; expected and desired for prefix allowlists.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T17:51:37.099Z — VERIFY — ok

By: TESTER

Note: bun run test:cli:core passed; added lifecycle regression test covering deletion staging under allowlist.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit for this task.

## Verify Steps

- bun run test:cli:core\n- bun run test:agentplane
