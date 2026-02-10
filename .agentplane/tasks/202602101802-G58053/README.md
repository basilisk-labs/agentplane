---
id: "202602101802-G58053"
title: "Docs user: commands guide + generated CLI reference refresh"
result_summary: "Commands guide and generated CLI reference match the current CLI."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on:
  - "202602101802-G52CH8"
tags:
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "f30e8a3a8868b3174decf0c5f23708d538c22355"
  message: "📝 G58053 docs: refresh commands guide and regenerate CLI reference"
comments:
  -
    author: "DOCS"
    body: "Start: Align commands guide with current CLI and regenerate generated CLI reference."
  -
    author: "DOCS"
    body: "Verified: Updated commands guide and regenerated the generated CLI reference to match the current registry/spec."
events:
  -
    type: "status"
    at: "2026-02-10T18:26:27.077Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Align commands guide with current CLI and regenerate generated CLI reference."
  -
    type: "status"
    at: "2026-02-10T18:29:10.082Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: Updated commands guide and regenerated the generated CLI reference to match the current registry/spec."
doc_version: 2
doc_updated_at: "2026-02-10T18:29:10.082Z"
doc_updated_by: "DOCS"
description: "Align commands guide with current CLI and regenerate docs/user/cli-reference.generated.mdx via agentplane docs tooling."
id_source: "generated"
---
## Summary


## Scope

In-scope: docs/user/commands.mdx, docs/user/cli-reference.generated.mdx (regenerated).

## Plan

1. Update docs/user/commands.mdx to include current backend sync and task export commands and remove stale wording.
2. Regenerate docs/user/cli-reference.generated.mdx via `agentplane docs cli --out docs/user/cli-reference.generated.mdx`.
3. Sanity-check that the generated file includes new/updated commands and options.

## Risks


## Verify Steps

- Run `agentplane docs cli --out docs/user/cli-reference.generated.mdx` and ensure it updates the file.
- Confirm docs/user/commands.mdx examples use existing commands (`agentplane backend sync`, `agentplane task export`).

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commits for this task and regenerate the CLI reference from the previous revision if needed.

## Context

The generated CLI reference is the authoritative, up-to-date command surface. The practical commands page should focus on common workflows and link to the generated reference.
